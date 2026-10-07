import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import CTA from "@/components/sections/CTA";
import IndustriesGrid from "@/components/sections/IndustriesGrid";
import Process from "@/components/sections/Process";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getIcon } from "@/lib/icons";
import { getRegionIndustry, getRegionService, regionContent } from "@/lib/region-content";
import { industryCounterpart, rhref, type Region } from "@/lib/regions";
import { pageMetadata } from "@/lib/seo";
import { contactFrom, getSettings } from "@/lib/settings";

export function industrySlugsFor(region: Region) {
  return regionContent[region].industries.map((i) => ({ slug: i.slug }));
}

export function industryMetadata(region: Region, slug: string) {
  const industry = getRegionIndustry(region, slug);
  if (!industry) return {};
  /* Every industry exists on both sites; CPA firms ↔ accounting practices differ in slug. */
  const other: Region = region === "us" ? "uk" : "us";
  return pageMetadata(region, `/industries/${industry.slug}`, {
    title: industry.metaTitle ?? `Accounting for ${industry.name}`,
    description: `${industry.description}. ${industry.intro}`,
    paths: { [other]: `/industries/${industryCounterpart(industry.slug, region)}` },
  });
}

export default async function IndustryDetailPage({ region, slug }: { region: Region; slug: string }) {
  const industry = getRegionIndustry(region, slug);
  if (!industry) notFound();

  const contact = contactFrom(await getSettings(), region);
  const r = (path: string) => rhref(region, path);
  const relevant = industry.services
    .map((s) => getRegionService(region, s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <PageBanner
        eyebrow="Industries We Serve"
        title={industry.name}
        lead={industry.description}
        image={industry.image}
        breadcrumbs={[{ name: "Industries", href: r("/industries") }, { name: industry.name }]}
        homeHref={r("/")}
      >
        <div className="mt-9">
          <Button href={r("/contact")} size="lg" className="h-auto min-h-[3.25rem] max-w-full whitespace-normal py-3 text-center">
            Talk to an industry specialist
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </PageBanner>

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <Reveal>
              <span className="eyebrow mb-4">Overview</span>
              <h2 className="text-[1.75rem] font-extrabold leading-tight sm:text-[2.2rem]">
                Accounting built around <span className="text-gradient-brand">how your industry works</span>
              </h2>
              <p className="mt-5 text-[16px] leading-[1.8] text-ink-muted">{industry.intro}</p>
            </Reveal>
            <Reveal className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-lift">
              <Image src={industry.image} alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-navy-deep/40 to-transparent" />
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            <Reveal className="rounded-3xl border border-border bg-slate-50 p-8 sm:p-10">
              <h3 className="flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                <AlertTriangle className="h-4 w-4 text-brand" aria-hidden="true" />
                Common challenges
              </h3>
              <ul className="mt-6 space-y-4">
                {industry.challenges.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-[15px] leading-relaxed text-navy-deep">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="relative overflow-hidden rounded-3xl bg-navy-deep p-8 text-white sm:p-10">
              <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-accent opacity-25 blur-[80px]" aria-hidden="true" />
              <div className="relative">
                <h3 className="flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.16em] text-accent-light">
                  <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                  How ANAV Global helps
                </h3>
                <ul className="mt-6 space-y-4">
                  {industry.help.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-[15px] leading-relaxed text-white/90">
                      <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-accent-light" aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-slate-50">
        <div className="container">
          <SectionHeading
            eyebrow="Recommended services"
            title="Recommended services for"
            accent={industry.name}
            align="center"
          />
          <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relevant.map((service) => {
              const Icon = getIcon(service.icon);
              return (
                <RevealItem key={service.slug}>
                  <Link
                    href={r(`/services/${service.slug}`)}
                    className="card-edge group flex h-full flex-col p-6 hover:-translate-y-1 hover:shadow-lift"
                  >
                    <span className="icon-plate">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 text-[16px] font-bold text-navy-deep">{service.title}</h3>
                    <p className="mt-2 flex-1 text-[13.5px] leading-[1.7] text-ink-muted">{service.summary}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold text-brand">
                      Learn more
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <Process className="section bg-white" />

      <section className="section bg-mint-light">
        <div className="container">
          <SectionHeading eyebrow="Other industries" title="More industries" accent="we serve" />
        </div>
        <IndustriesGrid region={region} heading={false} exclude={industry.slug} className="mt-12" />
      </section>

      <CTA contact={contact} />
    </>
  );
}
