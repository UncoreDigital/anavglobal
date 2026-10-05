import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /*
        Disallow is a prefix match, so "/admin" covers everything below it.
        "/api/" keeps its slash so it cannot also match a future top-level route
        whose name merely starts with "api".
      */
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
