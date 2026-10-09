import { normaliseOrigin } from "@/lib/origin";
import { regionContent } from "@/lib/region-content";
import { rhref, type Region } from "@/lib/regions";

/**
 * Single source of truth for brand, contact and navigation.
 *
 * Every value here was carried over from the Emergent build at anavglobal.com
 * (October 2026). Anything that build did not publish — and that we wrote
 * fresh — is marked NEW so the client can review only what is new to them.
 *
 * The contact values below are the *fallbacks*. Phone numbers, WhatsApp
 * numbers, the email address, office hours and social links can all be
 * overridden from Admin → Site Settings without a deploy; see lib/settings.ts.
 */

export const site = {
  name: "ANAV Global",
  legalName: "ANAV Global",

  /** The line under the wordmark in the old site's header. */
  tagline: "Accounting & Tax Excellence",

  /** The old hero, verbatim: "Next-Gen Accounting For CPAs & Business Owners". */
  proposition: "Next-Gen Accounting for CPAs & Business Owners",

  description:
    "ANAV Global is a trusted partner for outsourced bookkeeping, payroll, tax preparation and management accounts — serving CPA firms and growing businesses across the USA, UK and India.",

  /**
   * Canonical origin. Normalised rather than used raw: app/layout.tsx passes
   * this to `new URL()` for metadataBase, which throws on a bare host and takes
   * the whole build with it. See lib/origin.ts.
   *
   * ⚠️ CLIENT TO CONFIRM: apex (anavglobal.com) or www. The live site answers on
   * the apex, so that is the default. Whichever is chosen, the other should
   * redirect to it at the host level.
   */
  url: normaliseOrigin(process.env.NEXT_PUBLIC_SITE_URL, "https://anavglobal.com"),

  /** Lockup for structured data and social cards. The header uses the live-text lockup. */
  logo: "/assets/logo.png",
  logoMark: "/assets/logo-mark-alpha.png",
  ogImage: "/assets/og.jpg",

  /*
    Lower-case, no trailing whitespace. NOTE: this is what the site displays.
    Where a form submission is actually delivered is the NOTIFICATION_EMAIL
    secret on the lead-notification edge function — change both together.
  */
  email: "accounting@anavglobal.com",

  /** U.S. lines, as published. The old site wrote them "+1 (614)-427-1512". */
  phones: ["+1 (614) 427-1512", "+1 (614) 427-2151"],

  /** WhatsApp (India), as published. */
  whatsapp: ["+91 97246 12506", "+91 99097 04060"],

  hours: {
    weekdays: "9:00 AM – 6:00 PM",
    saturday: "Closed",
    sunday: "Closed",
  },

  /*
    The old footer rendered Facebook, Twitter and LinkedIn icons that all
    pointed at "#". There are no real profile URLs to carry over, so these
    start empty and the footer renders only the ones set in Admin → Site
    Settings. A social icon that goes nowhere is worse than no icon.
  */
  social: {
    linkedin: "",
    facebook: "",
    x: "",
    instagram: "",
  },

  builtBy: {
    name: "Uncore Digital",
    url: "https://uncoredigital.com/",
  },
} as const;

/** "tel:" href from a display number. */
export function telHref(display: string) {
  return `tel:${display.replace(/[^\d+]/g, "")}`;
}

/** wa.me link from a display number, optionally with a pre-filled message. */
export function waHref(display: string, text?: string) {
  const digits = display.replace(/\D/g, "");
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

/**
 * The three offices, as published.
 *
 * Country is carried as a two-letter display `code` (UK, not GB — that is what
 * a reader expects) plus the ISO `iso` for structured data, never as a flag emoji: Windows ships no
 * flag glyphs, so a regional-indicator pair falls back to bare letters, and a
 * large share of this audience is on Windows. See components/CountryCode.tsx.
 *
 * `role` is NEW — the old site labelled them only "USA Office" etc. India is
 * named openly as the delivery centre: it is the first question a CPA firm
 * asks, and the honest answer is the value proposition (overnight turnaround).
 */
export const offices = [
  {
    id: "us",
    country: "United States",
    code: "US",
    iso: "US",
    label: "USA Office",
    role: "Client Office",
    city: "Monmouth Junction, NJ",
    locality: "Monmouth Junction",
    region: "NJ",
    postalCode: "08852",
    street: "2 Degas Dr",
    address: "2 Degas Dr, Monmouth Junction, NJ 08852",
    timezone: "America/New_York",
    tzLabel: "ET",
  },
  {
    id: "uk",
    country: "United Kingdom",
    code: "UK",
    iso: "GB",
    label: "UK Office",
    role: "Client Office",
    city: "Luton, England",
    locality: "Luton",
    region: "England",
    postalCode: "LU2 7FL",
    street: "6 Verde Close",
    address: "6 Verde Close, Luton, England LU2 7FL",
    timezone: "Europe/London",
    tzLabel: "UK",
  },
  {
    id: "in",
    country: "India",
    code: "IN",
    iso: "IN",
    label: "India Office",
    role: "Delivery Centre",
    city: "Ahmedabad, Gujarat",
    locality: "Ahmedabad",
    region: "Gujarat",
    postalCode: "382421",
    street: "A-306 Shaligram Commercial Complex, Vaishnodevi Circle, Tragad",
    address: "A-306 Shaligram Commercial Complex, Vaishnodevi Circle, Tragad, Ahmedabad 382421",
    timezone: "Asia/Kolkata",
    tzLabel: "IST",
  },
] as const;

export type Office = (typeof offices)[number];

/**
 * Feature switches for work that is built but may not be wanted yet.
 * Off means genuinely unreachable — the routes 404 — not merely unlinked.
 */
export const features = {
  /** The Insights blog: nav link, /blog, /blog/[slug], the admin editor. */
  insights: true,
  /** Testimonials band. Renders only published rows, so it hides itself when there are none. */
  testimonials: true,
} as const;

export type NavItem = {
  name: string;
  href: string;
  dropdown?: { name: string; href: string; blurb?: string }[];
};

/*
  Navigation renders from the same data files the pages do, so a service
  cannot exist without appearing in the menu, and cannot drift from the page
  that describes it. Each country site gets its own menu: the UK site lists its
  own services and industries (lib/region-content.ts).
*/
export function navFor(region: Region): NavItem[] {
  const content = regionContent[region];
  const r = (path: string) => rhref(region, path);
  return [
    {
      name: "Services",
      href: r("/services"),
      dropdown: content.services.map((s) => ({ name: s.title, href: r(`/services/${s.slug}`), blurb: s.summary })),
    },
    {
      name: "Industries",
      href: r("/industries"),
      dropdown: content.industries.map((i) => ({ name: i.name, href: r(`/industries/${i.slug}`), blurb: i.description })),
    },
    {
      name: "Company",
      href: r("/about"),
      dropdown: [
        { name: "About ANAV Global", href: r("/about"), blurb: "Our story, mission and the values behind the work" },
        { name: "Our Team", href: r("/team"), blurb: "The people who will look after your books" },
        { name: "How We Work", href: r("/how-we-work"), blurb: "Onboarding, engagement models and data security" },
        { name: "FAQs", href: r("/faqs"), blurb: "Straight answers to what clients ask first" },
      ],
    },
    ...(features.insights ? [{ name: "Insights", href: r("/blog") }] : []),
    { name: "Contact", href: r("/contact") },
  ];
}

/** The US menu — used where no region is in play (the root 404 page). */
export const navItems: NavItem[] = navFor("us");

/** Footer columns — every link here must resolve to a real page. */
export function footerNavFor(region: Region) {
  const content = regionContent[region];
  const r = (path: string) => rhref(region, path);
  return [
    {
      heading: region === "uk" ? "UK Services" : "Services",
      links: content.services.map((s) => ({ name: s.title, href: r(`/services/${s.slug}`) })),
    },
    /* The US site has more industries than a footer column holds; list the first eight and link the rest. */
    {
      heading: "Industries",
      links: [
        ...content.industries.slice(0, 8).map((i) => ({ name: i.name, href: r(`/industries/${i.slug}`) })),
        ...(content.industries.length > 8 ? [{ name: "All industries", href: r("/industries") }] : []),
      ],
    },
    {
      heading: "Company",
      links: [
        { name: "About Us", href: r("/about") },
        { name: "Our Team", href: r("/team") },
        { name: "How We Work", href: r("/how-we-work") },
        { name: "FAQs", href: r("/faqs") },
        ...(features.insights ? [{ name: "Insights", href: r("/blog") }] : []),
        { name: "Contact Us", href: r("/contact") },
      ],
    },
  ];
}
