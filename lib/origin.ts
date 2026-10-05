/**
 * Normalises an origin supplied through the environment.
 *
 * This exists because a single mistyped environment variable used to take the
 * whole build down, with an error that pointed nowhere near the cause:
 *
 *     TypeError: Invalid URL
 *     > Build error occurred
 *     Error: Failed to collect page data for /_not-found
 *
 * `/_not-found` has nothing to do with it. The real problem is that
 * `metadataBase: new URL(site.url)` in app/layout.tsx throws when the value is
 * not a fully-qualified URL, and pasting a bare host into a Vercel environment
 * variable — `anavglobal.vercel.app` rather than `https://anavglobal.vercel.app`
 * — is one of the easiest mistakes to make in that UI.
 *
 * So: accept what people actually type. A bare host gets https:// prepended, a
 * trailing slash is dropped, and anything genuinely unparseable falls back to
 * the default with a warning naming the variable, rather than failing the
 * deploy.
 *
 * Deliberately not throwing even in development. A wrong canonical origin is a
 * bad SEO day; a failed deploy on a Friday is worse, and the warning is loud
 * enough to find.
 */
export function normaliseOrigin(
  value: string | undefined,
  fallback: string,
  varName = "NEXT_PUBLIC_SITE_URL",
  forbiddenHosts: readonly string[] = []
): string {
  const raw = value?.trim();
  if (!raw) return stripTrailingSlash(fallback);

  /* Bare host, or protocol-relative. Assume https — nothing here should be
     served over http, and Vercel issues certificates for every deployment. */
  const candidate = /^https?:\/\//i.test(raw)
    ? raw
    : `https://${raw.replace(/^\/\//, "")}`;

  try {
    const url = new URL(candidate);
    if (!url.hostname) throw new Error("no hostname");

    /*
      A parseable origin can still be the wrong one, and that failure is far
      more expensive than a typo because it is silent — the build succeeds, the
      pages render, and every canonical tag quietly hands the site to somebody
      else. See the note on `forbiddenHosts` at the call site in lib/site.ts.

      Matched as exact host or true subdomain, never as a substring:
      "example-pro.com" contains "example.com" as text but is a different
      registrable domain, and a substring test would blacklist the correct
      value.
    */
    if (isForbidden(url.hostname, forbiddenHosts)) {
      console.warn(
        `[config] ${varName} is set to ${url.origin}, which is a host this site must never ` +
          `claim as canonical — it belongs to a different property. Every canonical tag, the ` +
          `sitemap and the Organization @id would point there, telling search engines to index ` +
          `that site instead of this one. Falling back to ${fallback}. ` +
          `Set ${varName} to this site's own origin.`
      );
      return stripTrailingSlash(fallback);
    }

    return stripTrailingSlash(url.origin);
  } catch {
    console.warn(
      `[config] ${varName} is not a usable URL (received: ${JSON.stringify(raw)}). ` +
        `Falling back to ${fallback}. Set it to a full origin, e.g. https://example.com`
    );
    return stripTrailingSlash(fallback);
  }
}

function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

/** Exact host, or a subdomain of it. Never a substring match — see above. */
function isForbidden(hostname: string, forbidden: readonly string[]) {
  const host = hostname.toLowerCase();
  return forbidden.some((entry) => {
    const bad = entry.toLowerCase().replace(/^\.+/, "");
    return host === bad || host.endsWith(`.${bad}`);
  });
}
