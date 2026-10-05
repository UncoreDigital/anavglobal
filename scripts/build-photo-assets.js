/**
 * Optimises the photography into /public/assets and builds the social card.
 *
 *   node scripts/build-photo-assets.js
 *
 * Sources live in assets-src/:
 *   team/        the seven headshots the client supplied for the Emergent build
 *   industries/  the Unsplash / Pexels frames that build used (both licences
 *                allow commercial use without attribution)
 *
 * Outputs are committed, so this only needs running when a source changes.
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "assets-src");
const OUT = path.join(ROOT, "public", "assets");

const kb = (file) => `${Math.round(fs.statSync(file).size / 1024)} KB`;

/*
  Headshots: 4:5, anchored near the top. Every supplied portrait is a standing
  head-and-torso shot with the face in the upper third, so a centred crop cuts
  the top of the head off on the taller frames (Darshan is 9:16) while a
  top-anchored one keeps head and shoulders on all seven.
*/
async function team() {
  const dir = path.join(SRC, "team");
  const out = path.join(OUT, "team");
  fs.mkdirSync(out, { recursive: true });

  for (const file of fs.readdirSync(dir)) {
    const slug = file.replace(/\.(png|jpe?g)$/i, "");
    const meta = await sharp(path.join(dir, file)).metadata();
    const width = meta.width;
    const height = Math.min(Math.round(width * 1.25), meta.height);
    const top = Math.min(Math.round(meta.height * 0.035), meta.height - height);

    const dest = path.join(out, `${slug}.webp`);
    await sharp(path.join(dir, file))
      .extract({ left: 0, top, width, height })
      .resize({ width: 720, height: 900, fit: "cover" })
      .webp({ quality: 80 })
      .toFile(dest);
    console.log(`team/${slug}.webp`.padEnd(42), kb(dest));
  }
}

/* Industry and page photography: 3:2, 1400 wide — card headers and banners. */
async function photos() {
  const dir = path.join(SRC, "industries");
  const out = path.join(OUT, "photos");
  fs.mkdirSync(out, { recursive: true });

  for (const file of fs.readdirSync(dir)) {
    const slug = file.replace(/\.(png|jpe?g)$/i, "");
    const dest = path.join(out, `${slug}.webp`);
    await sharp(path.join(dir, file))
      .resize({ width: 1400, height: 933, fit: "cover", position: "attention" })
      .webp({ quality: 74 })
      .toFile(dest);
    console.log(`photos/${slug}.webp`.padEnd(42), kb(dest));
  }
}

/*
  Social card, 1200x630. Navy-deep field with the mark's own gradient glows and
  its light stroke drawn large behind the lockup. No live text: the card has
  to render identically wherever this script runs, and SVG text depends on
  whatever fonts that machine has. The wordmark comes from the artwork itself.
*/
async function og() {
  const W = 1200;
  const H = 630;
  const background = Buffer.from(`
    <svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
      <defs>
        <radialGradient id="g1" cx="0.12" cy="0.1" r="0.7">
          <stop offset="0" stop-color="#2C57E1" stop-opacity="0.55"/>
          <stop offset="1" stop-color="#2C57E1" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="g2" cx="0.95" cy="0.95" r="0.65">
          <stop offset="0" stop-color="#03CE7F" stop-opacity="0.45"/>
          <stop offset="1" stop-color="#03CE7F" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="line" x1="0" x2="1">
          <stop offset="0" stop-color="#2C57E1"/>
          <stop offset="0.5" stop-color="#0EA09F"/>
          <stop offset="1" stop-color="#03CE7F"/>
        </linearGradient>
        <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.05"/>
        </pattern>
      </defs>
      <rect width="${W}" height="${H}" fill="#081530"/>
      <rect width="${W}" height="${H}" fill="url(#grid)"/>
      <rect width="${W}" height="${H}" fill="url(#g1)"/>
      <rect width="${W}" height="${H}" fill="url(#g2)"/>
      <polyline points="-40,600 330,40 640,560 980,40 1260,520" fill="none"
        stroke="url(#line)" stroke-opacity="0.22" stroke-width="44" stroke-linejoin="round" stroke-linecap="round"/>
      <rect x="0" y="${H - 6}" width="${W}" height="6" fill="url(#line)"/>
    </svg>`);

  const lockup = await sharp(path.join(OUT, "logo-white-alpha.png")).resize({ height: 400 }).toBuffer();
  const lm = await sharp(lockup).metadata();

  const dest = path.join(OUT, "og.jpg");
  await sharp(background)
    .composite([{ input: lockup, left: Math.round((W - lm.width) / 2), top: Math.round((H - lm.height) / 2) - 6 }])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(dest);
  console.log("og.jpg".padEnd(42), kb(dest));
}

(async () => {
  await team();
  await photos();
  await og();
})();
