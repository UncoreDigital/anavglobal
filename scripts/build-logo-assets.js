/**
 * Derives every web logo asset from the client's master artwork.
 *
 *   node scripts/build-logo-assets.js
 *
 * Source of truth: assets-src/brand/logo-master.png — the 1024x1024 file the
 * Emergent build served (the "AV" mark over the ANAV GLOBAL wordmark, on an
 * opaque white field). Outputs are committed, so this only needs running when
 * new artwork arrives.
 *
 * ── Why the knockout is two different algorithms ─────────────────────────────
 * The mark has a light mint stroke (#C9F3F1) running through it. That is only
 * ~57 away from white in RGB distance, so a global white key — the approach the
 * ADAS build uses — turns the stroke semi-transparent, and on a navy band it
 * goes murky teal instead of reading as light. So the MARK is keyed with a
 * flood fill inward from the border: the stroke is fully enclosed by the blue
 * and green body, and the fill never reaches it.
 *
 * The WORDMARK needs the opposite. Its counters (the A's, the O, both holes in
 * the B) are enclosed white that *should* become transparent, and a flood fill
 * cannot reach them. The wordmark is navy ink with no light elements at all,
 * so a global key is safe there.
 *
 * Measured bounds in the master: mark y 183–753, wordmark y 817–878, with a
 * clean 60px gap between them. SPLIT sits in that gap.
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "assets-src", "brand", "logo-master.png");
const PUBLIC = path.join(ROOT, "public");
const OUT = path.join(PUBLIC, "assets");
const SPLIT = 790;

/* Navy-deep from app/globals.css — hsl(220 70% 11%). The favicon plate. */
const NAVY_DEEP = { r: 8, g: 21, b: 48 };

const HARD = 30; // <= this distance from white: fully transparent
const SOFT = 110; // >= this distance: fully opaque; a ramp in between, for anti-aliased edges

const dist = (data, i) =>
  Math.sqrt((255 - data[i]) ** 2 + (255 - data[i + 1]) ** 2 + (255 - data[i + 2]) ** 2);
const ramp = (d) => (d <= HARD ? 0 : Math.round(((d - HARD) / (SOFT - HARD)) * 255));

/*
  Un-premultiply an edge pixel against the white field it was anti-aliased on.
  Without this, a half-transparent edge pixel keeps its half-white colour and
  the mark wears a pale halo the moment it sits on navy. Solving
  observed = ink·a + white·(1−a) for ink recovers the true edge colour.
*/
function defringe(data, i) {
  const a = data[i + 3] / 255;
  if (a <= 0 || a >= 1) return;
  for (let k = 0; k < 3; k++) {
    data[i + k] = Math.max(0, Math.min(255, Math.round((data[i + k] - 255 * (1 - a)) / a)));
  }
}

async function rgba(buf) {
  return sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
}

/** Flood fill from every border pixel through near-white; enclosed light ink survives. */
function floodKey(data, w, h, ch) {
  const seen = new Uint8Array(w * h);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= w || y >= h) return;
    const p = y * w + x;
    if (seen[p]) return;
    seen[p] = 1;
    if (dist(data, p * ch) >= SOFT) return; // ink: stop here
    stack.push(p);
  };
  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }
  while (stack.length) {
    const p = stack.pop();
    const i = p * ch;
    data[i + 3] = Math.min(data[i + 3], ramp(dist(data, i)));
    defringe(data, i);
    const x = p % w;
    const y = (p - x) / w;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }
}

/** Key every near-white pixel. Only safe on artwork with no light ink. */
function globalKey(data, w, h, ch, tint) {
  for (let p = 0; p < w * h; p++) {
    const i = p * ch;
    const d = dist(data, i);
    if (d < SOFT) {
      data[i + 3] = ramp(d);
      defringe(data, i);
    }
    if (tint && data[i + 3] > 0) {
      data[i] = tint.r;
      data[i + 1] = tint.g;
      data[i + 2] = tint.b;
    }
  }
}

async function region(top, height) {
  const meta = await sharp(SRC).metadata();
  return sharp(SRC).extract({ left: 0, top, width: meta.width, height }).png().toBuffer();
}

async function toPng(data, info) {
  return sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
    .png()
    .toBuffer();
}

async function trimAlpha(buf) {
  return sharp(buf).trim({ threshold: 1 }).png().toBuffer();
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const meta = await sharp(SRC).metadata();

  /* ---- Mark: flood-keyed so the mint stroke stays opaque ---- */
  {
    const { data, info } = await rgba(await region(0, SPLIT));
    floodKey(data, info.width, info.height, info.channels);
    const mark = await trimAlpha(await toPng(data, info));
    await sharp(mark).resize({ width: 640 }).png({ compressionLevel: 9 }).toFile(path.join(OUT, "logo-mark-alpha.png"));
  }

  /* ---- Wordmark: globally keyed, in navy ink and in white ---- */
  const wordTop = SPLIT;
  const wordHeight = meta.height - SPLIT;
  for (const [name, tint] of [
    ["logo-wordmark-alpha.png", null],
    ["logo-wordmark-white-alpha.png", { r: 255, g: 255, b: 255 }],
  ]) {
    const { data, info } = await rgba(await region(wordTop, wordHeight));
    globalKey(data, info.width, info.height, info.channels, tint);
    const word = await trimAlpha(await toPng(data, info));
    await sharp(word).resize({ width: 900 }).png({ compressionLevel: 9 }).toFile(path.join(OUT, name));
  }

  /* ---- Stacked lockup, as drawn: mark over wordmark ---- */
  async function stacked(wordFile) {
    const mark = await sharp(path.join(OUT, "logo-mark-alpha.png")).resize({ width: 600 }).toBuffer();
    const markMeta = await sharp(mark).metadata();
    /* Same proportion as the master: wordmark ≈ 62% of the mark's width. */
    const word = await sharp(path.join(OUT, wordFile)).resize({ width: Math.round(600 * 0.623) }).toBuffer();
    const wordMeta = await sharp(word).metadata();
    const gap = Math.round(markMeta.height * 0.11);
    const W = markMeta.width;
    const H = markMeta.height + gap + wordMeta.height;
    return sharp({ create: { width: W, height: H, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
      .composite([
        { input: mark, left: 0, top: 0 },
        { input: word, left: Math.round((W - wordMeta.width) / 2), top: markMeta.height + gap },
      ])
      .png({ compressionLevel: 9 })
      .toBuffer();
  }

  const lockup = await stacked("logo-wordmark-alpha.png");
  fs.writeFileSync(path.join(OUT, "logo-alpha.png"), lockup);
  fs.writeFileSync(path.join(OUT, "logo-white-alpha.png"), await stacked("logo-wordmark-white-alpha.png"));

  /* Opaque version on white, with breathing room — for structured data, where
     Google renders the logo on its own surfaces and transparency is a gamble. */
  const lm = await sharp(lockup).metadata();
  const pad = Math.round(lm.width * 0.12);
  await sharp(lockup)
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .flatten({ background: "#ffffff" })
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT, "logo.png"));

  /*
    Favicons: the mark on a navy-deep plate, so it holds against dark browser
    chrome. Google's favicon crawler wants a square whose edge is a multiple of
    48px and also fetches /favicon.ico at the origin root — both are covered.
  */
  const markAlpha = path.join(OUT, "logo-mark-alpha.png");
  const SCALE = 0.8;
  const plate = async (size) => {
    let w = Math.round(size * SCALE);
    if ((size - w) % 2 !== 0) w -= 1; // even remainder => exact horizontal centring
    const mark = await sharp(markAlpha).resize({ width: w }).toBuffer();
    const { height: mh } = await sharp(mark).metadata();
    return sharp({ create: { width: size, height: size, channels: 4, background: { ...NAVY_DEEP, alpha: 1 } } })
      .composite([{ input: mark, left: (size - w) / 2, top: Math.round((size - mh) / 2) }])
      .png({ compressionLevel: 9 })
      .toBuffer();
  };

  const PNG_ICONS = [
    [48, "icon-48.png"],
    [96, "icon-96.png"],
    [144, "icon-144.png"],
    [192, "icon-192.png"],
    [180, "apple-touch-icon.png"],
    [512, "icon-512.png"],
  ];
  for (const [size, name] of PNG_ICONS) fs.writeFileSync(path.join(OUT, name), await plate(size));

  /* favicon.ico, PNG-in-ICO, written by hand because sharp has no ICO encoder. */
  const icoSizes = [16, 32, 48];
  const icoPngs = [];
  for (const size of icoSizes) icoPngs.push(await plate(size));
  const dir = Buffer.alloc(6 + 16 * icoPngs.length);
  dir.writeUInt16LE(0, 0);
  dir.writeUInt16LE(1, 2);
  dir.writeUInt16LE(icoPngs.length, 4);
  let offset = dir.length;
  icoPngs.forEach((png, i) => {
    const e = 6 + 16 * i;
    dir.writeUInt8(icoSizes[i] & 0xff, e);
    dir.writeUInt8(icoSizes[i] & 0xff, e + 1);
    dir.writeUInt8(0, e + 2);
    dir.writeUInt8(0, e + 3);
    dir.writeUInt16LE(1, e + 4);
    dir.writeUInt16LE(32, e + 6);
    dir.writeUInt32LE(png.length, e + 8);
    dir.writeUInt32LE(offset, e + 12);
    offset += png.length;
  });
  fs.writeFileSync(path.join(PUBLIC, "favicon.ico"), Buffer.concat([dir, ...icoPngs]));

  for (const f of fs.readdirSync(OUT).filter((f) => f.startsWith("logo") || f.startsWith("icon") || f.startsWith("apple"))) {
    const m = await sharp(path.join(OUT, f)).metadata();
    console.log(`${f.padEnd(34)} ${m.width}x${m.height}`);
  }
})();
