/**
 * Country sites — modelled on unisonglobus.com's USA / UK switcher.
 *
 * Each region is a full parallel site under its own URL prefix. The US site is
 * the default and lives at the root, exactly as before; the UK site lives
 * under /uk. Picking a country in the header dropdown navigates to the same
 * page on the other site when there is one, and to that site's home when
 * there is not (see `switchHref`).
 *
 * What differs per region: the services and their pages, the industry pages,
 * the homepage copy, engagement models, FAQs, software list, the primary
 * phone/office, the blog posts shown, page titles and hreflang. What is shared: brand, team, about,
 * offices, admin. Content for each region lives in lib/region-content.ts.
 *
 * There is deliberately no automatic geo-IP redirect. The client asked for US
 * by default, and redirecting on IP misroutes travellers, VPN users and
 * crawlers (Googlebot crawls from the US). Unison's own redirect script 404s.
 */

export type Region = "us" | "uk";

export const REGIONS: Region[] = ["us", "uk"];
export const DEFAULT_REGION: Region = "us";

export const regions = {
  us: {
    id: "us" as const,
    /** URL prefix. Empty for the default region, so existing US URLs are unchanged. */
    prefix: "",
    /** Short label in the dropdown, as Unison shows it. */
    label: "USA",
    name: "United States",
    hreflang: "en-US",
    /** Value preselected in the contact form's country field. */
    country: "United States",
    /** `offices[].id` shown first on this site. */
    officeId: "us",
    /** Display country code, for the CountryCode chip. */
    code: "US",
  },
  uk: {
    id: "uk" as const,
    prefix: "/uk",
    label: "UK",
    name: "United Kingdom",
    hreflang: "en-GB",
    country: "United Kingdom",
    officeId: "uk",
    code: "UK",
  },
} as const;

export type RegionConfig = (typeof regions)[Region];

export function isRegion(value: unknown): value is Region {
  return value === "us" || value === "uk";
}

/**
 * Region-aware internal href. `rhref("uk", "/contact")` → "/uk/contact",
 * `rhref("uk", "/")` → "/uk", `rhref("us", "/contact")` → "/contact".
 * External, mailto, tel and in-page links pass through untouched.
 */
export function rhref(region: Region, path: string): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  const prefix = regions[region].prefix;
  if (!prefix) return path;
  if (path === "/" || path === "") return prefix;
  return `${prefix}${path.startsWith("/") ? path : `/${path}`}`;
}

/** The region a pathname belongs to, and the path with the region prefix removed. */
export function splitPath(pathname: string): { region: Region; base: string } {
  if (pathname === "/uk" || pathname.startsWith("/uk/")) {
    return { region: "uk", base: pathname.slice(3) || "/" };
  }
  return { region: "us", base: pathname || "/" };
}

/** Pages that exist, under the same path, on both sites. */
const SHARED_PATHS = [
  "/",
  "/services",
  "/industries",
  "/about",
  "/team",
  "/how-we-work",
  "/faqs",
  "/contact",
  "/blog",
  "/privacy-policy",
  "/terms-of-service",
];

/**
 * Service pages with a direct counterpart on the other site. Anything not
 * listed falls back to that site's services index — a visitor switching from
 * "Sales tax" in the US should land on UK services, not on the UK homepage.
 */
const SERVICE_EQUIVALENTS: Record<string, string> = {
  // US → UK
  "us:bookkeeping-accounting": "bookkeeping-vat",
  "us:payroll-services": "payroll-cis",
  "us:tax-preparation-filing": "self-assessment-personal-tax",
  "us:management-accounts": "bookkeeping-vat",
  // UK → US
  "uk:bookkeeping-vat": "bookkeeping-accounting",
  "uk:payroll-cis": "payroll-services",
  "uk:self-assessment-personal-tax": "tax-preparation-filing",
  "uk:year-end-accounts-corporation-tax": "tax-preparation-filing",
};

/**
 * Six industries are on both sites, under the same slugs, except the CPA-firms
 * page, which the UK site calls accounting practices. The US site has more
 * (hotels, cannabis, law firms…) with no UK page. Kept as a short list here,
 * rather than read from the data files, because the country switcher runs in
 * the browser and should not ship every industry's copy to do it.
 */
const SHARED_INDUSTRIES = ["startups-smes", "cpa-firms", "e-commerce", "restaurants-hospitality", "professional-services", "real-estate"];

const INDUSTRY_EQUIVALENTS: Record<string, string> = {
  "us:cpa-firms": "accounting-practices",
  "uk:accounting-practices": "cpa-firms",
};

/** The slug of an industry page's counterpart on the other site, or null when it has none. */
export function industryCounterpart(slug: string, from: Region): string | null {
  if (from === "us" && !SHARED_INDUSTRIES.includes(slug)) return null;
  return INDUSTRY_EQUIVALENTS[`${from}:${slug}`] ?? slug;
}

/** Where the country dropdown should take the visitor from `pathname`. */
export function switchHref(pathname: string, target: Region): string {
  const { region: from, base } = splitPath(pathname);
  if (from === target) return pathname;

  if (SHARED_PATHS.includes(base)) return rhref(target, base);

  const service = base.match(/^\/services\/([^/]+)$/);
  if (service) {
    const match = SERVICE_EQUIVALENTS[`${from}:${service[1]}`];
    return rhref(target, match ? `/services/${match}` : "/services");
  }

  /* Blog posts can be region-specific, so land on the other site's index. */
  if (base.startsWith("/blog/")) return rhref(target, "/blog");

  const industry = base.match(/^\/industries\/([^/]+)$/);
  if (industry) {
    const counterpart = industryCounterpart(industry[1], from);
    return rhref(target, counterpart ? `/industries/${counterpart}` : "/industries");
  }

  return rhref(target, "/");
}

/**
 * hreflang alternates for a page available on both sites (or one).
 * `x-default` points at the US page, matching "default US". `paths` gives a
 * region its own path when the counterpart page has a different slug.
 */
export function localeAlternates(
  base: string,
  region: Region,
  availableIn: Region[] = REGIONS,
  paths: Partial<Record<Region, string>> = {}
) {
  const pathIn = (r: Region) => rhref(r, paths[r] ?? base);
  const languages: Record<string, string> = {};
  for (const r of availableIn) languages[regions[r].hreflang] = pathIn(r);
  if (availableIn.includes("us")) languages["x-default"] = pathIn("us");
  return { canonical: pathIn(region), languages };
}
