import type { Metadata } from "next";

/**
 * Admin tree metadata. `noindex, nofollow` at the layout level so every admin
 * route inherits it — including the login page, the one admin URL a crawler
 * can actually reach. robots.ts disallows /admin as well; both are cheap and
 * they fail independently.
 */
export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | ANAV Global Admin" },
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
