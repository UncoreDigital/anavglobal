import SiteChrome from "@/components/SiteChrome";

/** The US site — the default, at the root of the domain. */
export default function UsLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome region="us">{children}</SiteChrome>;
}
