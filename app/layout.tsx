import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/*
  Plus Jakarta Sans for headings: a geometric sans with round, open bowls that
  sits comfortably beside the wordmark's rounded letterforms without imitating
  them. Inter for body copy.
*/
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const title = `${site.name} — ${site.proposition}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "outsourced bookkeeping",
    "outsourced accounting",
    "CPA firm outsourcing",
    "payroll services",
    "tax preparation",
    "management accounts",
    "accounting services USA UK India",
    "QuickBooks ProAdvisor",
    "Xero advisor",
    "ANAV Global",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title,
    description: site.description,
    url: site.url,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
    images: [site.ogImage],
  },
  /*
    Google's favicon crawler wants a square whose edge is a multiple of 48px and
    also fetches /favicon.ico at the origin root, so both are covered.
  */
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/assets/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/assets/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/assets/icon-144.png", sizes: "144x144", type: "image/png" },
      { url: "/assets/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/assets/apple-touch-icon.png", sizes: "180x180" }],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#081530",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        {children}
        {/*
          Vercel Web Analytics. Only rendered on Vercel builds: elsewhere its
          script path 404s and logs a console error on every page view.
        */}
        {process.env.VERCEL && <Analytics />}
      </body>
    </html>
  );
}
