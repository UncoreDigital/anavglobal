import type { Metadata } from "next";
import { localeAlternates, REGIONS, rhref, type Region } from "@/lib/regions";

/**
 * Page metadata for a country-site page.
 *
 * Every page that exists on both sites declares both versions to search
 * engines (hreflang en-US / en-GB, x-default → US), so the UK and US pages are
 * understood as one page in two markets rather than as duplicates. UK titles
 * carry "UK" so the two do not compete in results.
 */
export function pageMetadata(
  region: Region,
  base: string,
  { title, description, availableIn = REGIONS, paths, absoluteTitle = false }: {
    title: string;
    description: string;
    availableIn?: Region[];
    /** Per-region path, when the counterpart page's slug differs from `base`. */
    paths?: Partial<Record<Region, string>>;
    absoluteTitle?: boolean;
  }
): Metadata {
  const t = region === "uk" && !/\bUK\b/.test(title) ? `${title} — UK` : title;
  return {
    title: absoluteTitle ? { absolute: t } : t,
    description,
    alternates: localeAlternates(base, region, availableIn, paths),
    openGraph: { url: rhref(region, base), locale: region === "uk" ? "en_GB" : "en_US", title: t, description },
  };
}
