import SiteChrome from "@/components/SiteChrome";

/** The UK site, under /uk. Content: lib/region-content.ts and lib/uk-services-data.ts. */
export default function UkLayout({ children }: { children: React.ReactNode }) {
  return <SiteChrome region="uk">{children}</SiteChrome>;
}
