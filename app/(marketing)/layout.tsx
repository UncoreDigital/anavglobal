import JsonLd from "@/components/JsonLd";
import SmoothScroll from "@/components/SmoothScroll";
import { contactFrom, getSettings } from "@/lib/settings";
import { offices, site } from "@/lib/site";

/**
 * Public site shell, shared by both country sites.
 *
 * The chrome itself (top bar, header, footer) is per country and lives in
 * components/SiteChrome.tsx, rendered by the (us) and uk layouts below this.
 *
 * Revalidated every five minutes so an edit in the admin appears without a
 * rebuild, while pages stay static for everyone who is not the admin. Admin
 * saves also trigger an immediate revalidation — see app/api/revalidate.
 */
export const revalidate = 300;

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const contact = contactFrom(await getSettings(), "us");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AccountingService",
          "@id": `${site.url}/#organization`,
          name: site.name,
          url: site.url,
          logo: `${site.url}${site.logo}`,
          image: `${site.url}${site.ogImage}`,
          description: site.description,
          email: contact.email,
          telephone: contact.allPhones[0]?.number,
          areaServed: ["United States", "United Kingdom", "India"],
          address: offices.map((o) => ({
            "@type": "PostalAddress",
            streetAddress: o.street,
            addressLocality: o.locality,
            addressRegion: o.region,
            postalCode: o.postalCode,
            addressCountry: o.iso,
          })),
          sameAs: contact.social.map((s) => s.href),
        }}
      />
      <SmoothScroll />
      {children}
    </>
  );
}
