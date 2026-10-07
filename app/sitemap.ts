import type { MetadataRoute } from "next";
import { getPosts, visibleIn } from "@/lib/posts";
import { regionContent } from "@/lib/region-content";
import { industryCounterpart, regions, rhref, type Region } from "@/lib/regions";
import { features, site } from "@/lib/site";

/**
 * Sitemap for both country sites.
 *
 * Routes are derived from the same data files the pages and the navigation
 * render from, so a service added to services-data.ts or uk-services-data.ts
 * is in the sitemap without anyone remembering to add it. Pages that exist on
 * both sites carry hreflang alternates (en-US / en-GB), matching the
 * <link rel="alternate"> tags on the pages themselves.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`;
  const both = (base: string) => ({
    languages: {
      [regions.us.hreflang]: abs(rhref("us", base)),
      [regions.uk.hreflang]: abs(rhref("uk", base)),
    },
  });

  const shared: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/industries", priority: 0.8, freq: "monthly" },
    { path: "/about", priority: 0.8, freq: "monthly" },
    { path: "/team", priority: 0.7, freq: "monthly" },
    { path: "/how-we-work", priority: 0.7, freq: "monthly" },
    { path: "/faqs", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.9, freq: "monthly" },
    { path: "/privacy-policy", priority: 0.2, freq: "yearly" },
    { path: "/terms-of-service", priority: 0.2, freq: "yearly" },
    ...(features.insights ? [{ path: "/blog", priority: 0.7, freq: "weekly" as const }] : []),
  ];

  const routes: MetadataRoute.Sitemap = [];

  for (const region of ["us", "uk"] as Region[]) {
    for (const r of shared) {
      routes.push({
        url: abs(rhref(region, r.path)),
        lastModified: now,
        changeFrequency: r.freq,
        priority: region === "us" ? r.priority : Math.max(0.2, r.priority - 0.05),
        alternates: both(r.path),
      });
    }
    for (const service of regionContent[region].services) {
      routes.push({
        url: abs(rhref(region, `/services/${service.slug}`)),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.85,
      });
    }
    /* Every industry exists on both sites; only CPA firms ↔ accounting practices changes slug. */
    const other: Region = region === "us" ? "uk" : "us";
    for (const { slug } of regionContent[region].industries) {
      routes.push({
        url: abs(rhref(region, `/industries/${slug}`)),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.75,
        alternates: {
          languages: {
            [regions[region].hreflang]: abs(rhref(region, `/industries/${slug}`)),
            [regions[other].hreflang]: abs(rhref(other, `/industries/${industryCounterpart(slug, region)}`)),
          },
        },
      });
    }
  }

  if (features.insights) {
    /* getPosts filters by region; fetch the US and UK lists and emit each post once per site it appears on. */
    const [usPosts, ukPosts] = await Promise.all([getPosts(undefined, "us"), getPosts(undefined, "uk")]);
    for (const post of usPosts) {
      routes.push({
        url: abs(`/blog/${post.slug}`),
        lastModified: new Date(post.updated_at),
        changeFrequency: "monthly",
        priority: 0.6,
        ...(visibleIn(post, "uk") ? { alternates: both(`/blog/${post.slug}`) } : {}),
      });
    }
    for (const post of ukPosts) {
      routes.push({
        url: abs(`/uk/blog/${post.slug}`),
        lastModified: new Date(post.updated_at),
        changeFrequency: "monthly",
        priority: 0.6,
        ...(visibleIn(post, "us") ? { alternates: both(`/blog/${post.slug}`) } : {}),
      });
    }
  }

  return routes;
}
