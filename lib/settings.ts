import { createStaticClient } from "@/lib/supabase/server";
import type { Region } from "@/lib/regions";
import { site } from "@/lib/site";
import type { SiteSetting } from "@/lib/supabase/types";

/**
 * Headline figures, contact details and social links, read from Supabase
 * `site_settings`.
 *
 * These live in the database because they are the values most likely to change
 * without a developer present — a client count, a new phone number, the day a
 * LinkedIn page goes live. The admin edits one row and every surface that
 * prints it updates together.
 *
 * Read through the cookie-free client: these are fetched during static
 * generation, where there is no request scope for cookies(), and they are
 * public anyway.
 */

export type Settings = Record<string, string | null>;

/** Fallbacks used when Supabase is unreachable or a row is missing — the values the old site published. */
const FALLBACK: Settings = {
  clients: "500+",
  invoices: "50K+",
  experience: "10+",
  satisfaction: "99%",

  email: site.email,
  phone_primary: site.phones[0],
  phone_secondary: site.phones[1],
  /* No UK number was published on the old site. Set one in Admin → Site
     Settings and it appears across the UK site (supabase/migrations/0004). */
  phone_uk: null,
  whatsapp_primary: site.whatsapp[0],
  whatsapp_secondary: site.whatsapp[1],
  hours_weekdays: site.hours.weekdays,
  hours_saturday: site.hours.saturday,
  hours_sunday: site.hours.sunday,

  linkedin: null,
  facebook: null,
  x: null,
  instagram: null,

  /* Booking link for /contact. Null until the client supplies one. */
  booking_url: null,
};

export async function getSettings(): Promise<Settings> {
  const supabase = createStaticClient();
  if (!supabase) return FALLBACK;

  const { data, error } = await supabase.from("site_settings").select("key, value").order("sort_order");
  if (error || !data) return FALLBACK;

  const settings: Settings = { ...FALLBACK };
  for (const row of data as Pick<SiteSetting, "key" | "value">[]) {
    /*
      An empty string is a deliberate "clear this" from the admin, so it
      overrides the fallback: a figure renders as an em dash, a phone number or
      social link disappears. Only an absent row (or a NULL one, which only the
      seed writes) keeps the fallback. See SettingsForm.
    */
    if (row.value !== null) settings[row.key] = row.value;
  }
  return settings;
}

/**
 * The contact block every surface reads — TopBar, Header, Footer, /contact,
 * the CTA band and the WhatsApp button. One shape, so a surface cannot pick up
 * the phone number from settings and the email from lib/site.ts.
 *
 * `phones` are the region's own numbers — the US lines on the US site, the UK
 * line on the UK site (empty until one is set, in which case the UK site leads
 * with email and WhatsApp instead). `allPhones` lists every number with its
 * country, for the footer, which shows them on both sites as Unison does.
 */
export function contactFrom(settings: Settings, region: Region = "us") {
  const pick = (key: string) => {
    const v = settings[key];
    return v && v.trim() !== "" ? v.trim() : null;
  };
  const usPhones = [pick("phone_primary"), pick("phone_secondary")].filter(Boolean) as string[];
  const ukPhones = [pick("phone_uk")].filter(Boolean) as string[];
  return {
    region,
    email: pick("email") ?? site.email,
    phones: region === "uk" ? ukPhones : usPhones,
    allPhones: [
      ...(region === "uk" ? ukPhones.map((n) => ({ number: n, code: "UK" })) : []),
      ...usPhones.map((n) => ({ number: n, code: "US" })),
      ...(region === "uk" ? [] : ukPhones.map((n) => ({ number: n, code: "UK" }))),
    ],
    whatsapp: [pick("whatsapp_primary"), pick("whatsapp_secondary")].filter(Boolean) as string[],
    hours: {
      weekdays: pick("hours_weekdays") ?? site.hours.weekdays,
      saturday: pick("hours_saturday") ?? site.hours.saturday,
      sunday: pick("hours_sunday") ?? site.hours.sunday,
    },
    social: (
      [
        ["LinkedIn", pick("linkedin")],
        ["Facebook", pick("facebook")],
        ["X", pick("x")],
        ["Instagram", pick("instagram")],
      ] as const
    )
      .map(([name, href]) => ({ name, href: safeUrl(href) }))
      .filter((s): s is { name: (typeof s)["name"]; href: string } => Boolean(s.href)),
    bookingUrl: safeUrl(pick("booking_url")),
  };
}

export type Contact = ReturnType<typeof contactFrom>;

/**
 * Returns the URL only if it is a well-formed absolute https:// address.
 * An unset row, a pasted "linkedin.com/..." with no scheme, or a typo all
 * collapse to null, and the caller renders nothing — a missing icon rather
 * than a prominent link that 404s.
 */
export function safeUrl(value: string | null | undefined) {
  if (!value || value.trim() === "") return null;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

/**
 * Renders a figure for display. Never coerces: `Number("")` is 0 and that
 * would print "0+" where the client meant "not confirmed yet".
 */
export function figure(value: string | null | undefined) {
  if (value === null || value === undefined || value.trim() === "") return "—";
  return value;
}

/**
 * Splits a figure into its numeric part and its suffix, so CountUp can animate
 * the number while the "+" or "%" stays put. "50K+" splits as 50 / "K+".
 * Returns null for anything that does not start with digits — "TBC" renders
 * as text rather than animating from 0.
 */
export function splitFigure(value: string | null | undefined) {
  if (!value) return null;
  const match = value.trim().match(/^([\d,]+(?:\.\d+)?)\s*(.*)$/);
  if (!match) return null;
  const numeric = Number(match[1].replace(/,/g, ""));
  if (Number.isNaN(numeric)) return null;
  return { value: numeric, suffix: match[2] ?? "", raw: value.trim() };
}
