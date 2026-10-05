/** @type {import('next').NextConfig} */

/*
  An unparseable value here throws while the config module is evaluated, which
  fails the build before Next has started. A malformed Supabase URL should cost
  remote image optimisation, not the deploy — the app already degrades
  gracefully when Supabase is unreachable.
*/
function hostFrom(value) {
  if (!value) return undefined;
  try {
    return new URL(value.trim()).hostname || undefined;
  } catch {
    console.warn(
      `[config] NEXT_PUBLIC_SUPABASE_URL is not a usable URL (received: ${JSON.stringify(value)}). ` +
        "Remote images from Supabase storage will not be optimised."
    );
    return undefined;
  }
}

const supabaseHost = hostFrom(process.env.NEXT_PUBLIC_SUPABASE_URL);

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }]
      : [],
  },
  async redirects() {
    /*
      The Emergent build was a single-page app with client-side routes. These
      are the paths it exposed, mapped onto their equivalents here so bookmarks
      and any indexed URLs survive the cutover.
    */
    return [
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/aboutus", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contactus", destination: "/contact", permanent: true },
      { source: "/blogs", destination: "/blog", permanent: true },
      { source: "/privacy", destination: "/privacy-policy", permanent: true },
      { source: "/terms", destination: "/terms-of-service", permanent: true },
      { source: "/data-security", destination: "/how-we-work#security", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          /*
            HSTS is deliberately absent. It is a host-level decision with a long,
            hard-to-reverse tail, and setting it from the app would apply it to
            preview domains too. Set it at the CDN once the production domain is
            confirmed to serve HTTPS everywhere.
          */
        ],
      },
    ];
  },
};

export default nextConfig;
