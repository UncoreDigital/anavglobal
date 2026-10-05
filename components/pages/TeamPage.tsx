import { BadgeCheck } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import CTA from "@/components/sections/CTA";
import TeamSection from "@/components/sections/TeamSection";
import { certifications } from "@/lib/content";
import { rhref, type Region } from "@/lib/regions";
import { pageMetadata } from "@/lib/seo";
import { contactFrom, getSettings } from "@/lib/settings";
import { site } from "@/lib/site";
import { getTeam } from "@/lib/team";

export function teamMetadata(region: Region) {
  return pageMetadata(region, "/team", {
    title: "Our Team",
    description:
      "Meet the ANAV Global team — certified accountants, tax specialists and managers dedicated to your financial success.",
  });
}

export default async function TeamPage({ region }: { region: Region }) {
  const [settings, team] = await Promise.all([getSettings(), getTeam()]);
  const contact = contactFrom(settings, region);

  return (
    <>
      <JsonLd
        data={team.map((m) => ({
          "@context": "https://schema.org",
          "@type": "Person",
          name: m.name,
          jobTitle: m.role,
          worksFor: { "@id": `${site.url}/#organization` },
          ...(m.photo_url ? { image: m.photo_url.startsWith("http") ? m.photo_url : `${site.url}${m.photo_url}` } : {}),
          ...(m.linkedin_url ? { sameAs: [m.linkedin_url] } : {}),
        }))}
      />

      {/* VERBATIM: "ANAV Global Team — Meet The Experts — Certified professionals…" */}
      <PageBanner
        eyebrow="ANAV Global Team"
        title="Meet The"
        accent="Experts"
        lead="Certified professionals dedicated to your financial success"
        breadcrumbs={[{ name: "About", href: rhref(region, "/about") }, { name: "Our Team" }]}
        homeHref={rhref(region, "/")}
      />

      <TeamSection members={team} variant="full" />

      <section className="section-tight bg-mint-light">
        <div className="container">
          <h2 className="text-center text-[1.6rem] font-extrabold sm:text-3xl">
            Certified & <span className="text-gradient-brand">Qualified Professionals</span>
          </h2>
          <RevealGroup className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-3">
            {certifications.map((c) => (
              <RevealItem
                key={c}
                className="flex items-center gap-2.5 rounded-full border border-border bg-white px-5 py-2.5 shadow-soft"
              >
                <BadgeCheck className="h-4 w-4 text-emerald" aria-hidden="true" />
                <span className="text-[14px] font-semibold text-navy-deep">{c}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <CTA contact={contact} heading="Work with a team that knows your numbers" />
    </>
  );
}
