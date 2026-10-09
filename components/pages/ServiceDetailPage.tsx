import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Building2, CheckCircle2, Mail, Phone, Store } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import CTA from "@/components/sections/CTA";
import DeliveryProcess from "@/components/sections/DeliveryProcess";
import FaqSection from "@/components/sections/FaqSection";
import ServicesGrid from "@/components/sections/ServicesGrid";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ToolArt } from "@/components/sections/Software";
import { allSoftware } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { getRegionService, regionContent } from "@/lib/region-content";
import { regions, rhref, type Region } from "@/lib/regions";
import { pageMetadata } from "@/lib/seo";
import { contactFrom, getSettings } from "@/lib/settings";
import { site, telHref, waHref } from "@/lib/site";

export function serviceSlugsFor(region: Region) {
  return regionContent[region].services.map((s) => ({ slug: s.slug }));
}

export function serviceMetadata(region: Region, slug: string) {
  const service = getRegionService(region, slug);
  if (!service) return {};
  /* Service pages are country-specific, so each declares only itself. */
  return pageMetadata(region, `/services/${service.slug}`, {
    title: service.title,
    description: `${service.description} ${service.summary}.`,
    availableIn: [region],
  });
}

export default async function ServiceDetailPage({ region, slug }: { region: Region; slug: string }) {
  const service = getRegionService(region, slug);
  if (!service) notFound();

  const content = regionContent[region];
  const contact = contactFrom(await getSettings(), region);
  const Icon = getIcon(service.icon);
  const tools = service.tools
    .map((name) => allSoftware.find((t) => t.name === name))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));
  const r = (path: string) => rhref(region, path);
  const quoteHref = r(`/contact?service=${encodeURIComponent(service.title)}`);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.description,
          serviceType: service.title,
          provider: { "@id": `${site.url}/#organization` },
          areaServed: region === "uk" ? ["United Kingdom"] : ["United States"],
          url: `${site.url}${r(`/services/${service.slug}`)}`,
        }}
      />

      <PageBanner
        eyebrow={region === "uk" ? "UK Services" : "Our Services"}
        title={service.title}
        lead={service.description}
        chips={service.outcomes}
        breadcrumbs={[{ name: "Services", href: r("/services") }, { name: service.title }]}
        homeHref={r("/")}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <Button href={quoteHref} size="lg">
            Get a free consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </PageBanner>

      <section className="section bg-white">
        <div className="container grid grid-cols-1 gap-12 lg:grid-cols-[1fr_22rem] lg:gap-16">
          <div className="min-w-0">
            <Reveal>
              <span className="eyebrow mb-4">Overview</span>
              <h2 className="text-[1.75rem] font-extrabold leading-tight sm:text-[2.1rem]">
                What <span className="text-gradient-brand">{service.title.toLowerCase()}</span> with ANAV Global looks
                like
              </h2>
              {service.overview.map((p) => (
                <p key={p.slice(0, 24)} className="mt-5 text-[16px] leading-[1.8] text-ink-muted">
                  {p}
                </p>
              ))}
            </Reveal>

            <Reveal className="mt-10 rounded-2xl border border-border bg-mint-light p-7 sm:p-8">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">
                {region === "uk" ? "Scope of work" : "What's included"}
              </h3>
              <ul className="mt-5 grid gap-3.5 sm:grid-cols-2">
                {service.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[15px] font-medium text-navy-deep">
                    <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-emerald" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              {service.tagline && (
                <p className="mt-6 border-t border-accent/30 pt-4 text-[14.5px] font-semibold text-accent-dark">{service.tagline}</p>
              )}
            </Reveal>

            {service.returns && service.returns.length > 0 && (
              <Reveal className="mt-10">
                <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">Returns we prepare &amp; file</h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {service.returns.map((item) => (
                    <li key={item.form} className="flex gap-4 rounded-xl border border-border bg-white p-4 sm:p-5">
                      <span className="flex h-11 w-[4.5rem] shrink-0 items-center justify-center rounded-lg bg-navy-deep font-display text-[13px] font-extrabold text-accent-light">
                        {item.form}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] font-bold leading-snug text-navy-deep">{item.title}</span>
                        <span className="mt-1.5 block text-[13.5px] leading-[1.65] text-ink-muted">{item.detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {service.process && service.process.length > 0 && (
              <Reveal className="mt-10">
                <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">Our process</h3>
                <ol className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {service.process.map((step, i) => (
                    <li key={step} className="flex items-center gap-3 rounded-xl border border-border bg-white p-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy-deep font-display text-[13px] font-extrabold text-accent-light">
                        {i + 1}
                      </span>
                      <span className="text-[14px] font-semibold text-navy-deep">{step}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}

            <RevealGroup className="mt-10 grid gap-5 md:grid-cols-2">
              {[
                { ...content.forWho.cpa, body: service.forWho.cpa, Icon: Building2 },
                { ...content.forWho.business, body: service.forWho.business, Icon: Store },
              ].map(({ label, href, body, Icon: AudienceIcon }) => (
                <RevealItem key={label} className="card-edge flex flex-col p-7 hover:shadow-card">
                  <span className="icon-plate">
                    <AudienceIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[17px] font-bold text-navy-deep">{label}</h3>
                  <p className="mt-2.5 flex-1 text-[14.5px] leading-[1.75] text-ink-muted">{body}</p>
                  <Link href={r(href)} className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-brand hover:text-brand-dark">
                    {href === "/contact" ? "Talk to us" : "Learn more"}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>

            {tools.length > 0 && (
              <Reveal className="mt-10">
                <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">Platforms we work in</h3>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {tools.map((tool) => (
                    <li key={tool.name} className="flex h-14 items-center justify-center rounded-xl border border-border bg-white px-5">
                      <ToolArt tool={tool} small />
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Reveal className="relative overflow-hidden rounded-2xl bg-navy-deep p-7 text-white shadow-lift">
              <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand opacity-40 blur-[70px]" aria-hidden="true" />
              <div className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-accent-light">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-[19px] font-bold text-white">Talk to us about {service.title.toLowerCase()}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-white/70">
                  Free consultation, no obligation. We reply within 24 hours.
                </p>
                <Button href={quoteHref} className="mt-6 w-full">
                  Book a Free Consultation
                </Button>
                <div className="mt-6 space-y-2.5 border-t border-white/10 pt-6 text-[13.5px]">
                  {contact.phones[0] ? (
                    <a href={telHref(contact.phones[0])} className="flex items-center gap-2.5 text-white/80 hover:text-accent-light">
                      <Phone className="h-4 w-4 text-accent-light" aria-hidden="true" />
                      {contact.phones[0]}
                    </a>
                  ) : (
                    contact.whatsapp[0] && (
                      <a
                        href={waHref(contact.whatsapp[0])}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2.5 text-white/80 hover:text-accent-light"
                      >
                        <Phone className="h-4 w-4 text-accent-light" aria-hidden="true" />
                        WhatsApp {contact.whatsapp[0]}
                      </a>
                    )
                  )}
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-2.5 break-all text-white/80 hover:text-accent-light">
                    <Mail className="h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" />
                    {contact.email}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-5 rounded-2xl border border-border bg-white p-6">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">
                Other {region === "uk" ? "UK " : ""}services
              </h3>
              <ul className="mt-4 space-y-1">
                {content.services
                  .filter((s) => s.slug !== service.slug)
                  .map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={r(`/services/${s.slug}`)}
                        className="group flex items-center justify-between rounded-lg px-2 py-2 text-[14px] font-medium text-navy-deep transition-colors hover:bg-mint-light hover:text-brand"
                      >
                        {s.title}
                        <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
              </ul>
              {/* Point visitors on the wrong site at the right one. */}
              <p className="mt-4 border-t border-border pt-4 text-[12.5px] text-ink-muted">
                Looking for {region === "uk" ? "US" : "UK"} services?{" "}
                <Link href={rhref(region === "uk" ? "us" : "uk", "/services")} className="font-semibold text-brand hover:text-brand-dark">
                  Visit the {regions[region === "uk" ? "us" : "uk"].label} site
                </Link>
              </p>
            </Reveal>
          </aside>
        </div>
      </section>

      <DeliveryProcess className="section bg-slate-50" />
      <FaqSection items={service.faqs} title={service.title} accent="FAQs" className="section bg-white" contactHref={r("/contact")} />

      <section className="section bg-slate-50">
        <div className="container">
          <SectionHeading eyebrow="Explore more" title="Related" accent="services" />
        </div>
        <ServicesGrid region={region} heading={false} exclude={service.slug} className="mt-12" />
      </section>
      <CTA contact={contact} />
    </>
  );
}
