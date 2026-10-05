import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import CTA from "@/components/sections/CTA";
import DeliveryProcess from "@/components/sections/DeliveryProcess";
import EngagementModels from "@/components/sections/EngagementModels";
import Stats from "@/components/sections/Stats";
import { Button } from "@/components/ui/Button";
import { getIcon } from "@/lib/icons";
import { regionContent } from "@/lib/region-content";
import { rhref, type Region } from "@/lib/regions";
import { pageMetadata } from "@/lib/seo";
import { contactFrom, getSettings } from "@/lib/settings";
import { cn } from "@/lib/utils";

export function servicesMetadata(region: Region) {
  const { meta } = regionContent[region];
  return pageMetadata(region, "/services", { title: meta.servicesTitle, description: meta.servicesDescription });
}

export default async function ServicesPage({ region }: { region: Region }) {
  const { services, servicesBanner } = regionContent[region];
  const settings = await getSettings();
  const contact = contactFrom(settings, region);
  const r = (path: string) => rhref(region, path);

  return (
    <>
      {/* US: VERBATIM "Accounting Solutions — From bookkeeping to tax preparation…". UK: lib/region-content.ts. */}
      <PageBanner
        eyebrow={servicesBanner.eyebrow}
        title={servicesBanner.title}
        accent={servicesBanner.accent}
        lead={servicesBanner.lead}
        breadcrumbs={[{ name: "Services" }]}
        chips={services.map((s) => s.title)}
        homeHref={r("/")}
      />

      <section className="section bg-white">
        <div className="container space-y-6">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <Reveal key={service.slug}>
                <article
                  id={service.slug}
                  className={cn(
                    "card-edge grid scroll-mt-32 grid-cols-1 gap-8 p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14",
                    i % 2 === 1 && "bg-slate-50"
                  )}
                >
                  <div>
                    <div className="flex items-center gap-4">
                      <span className="icon-plate h-14 w-14">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="font-display text-[13px] font-bold uppercase tracking-[0.16em] text-slate-400">
                        Service {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h2 className="mt-6 text-2xl font-extrabold sm:text-[1.9rem]">{service.title}</h2>
                    <p className="mt-4 text-[15.5px] leading-[1.75] text-ink-muted">{service.description}</p>
                    <p className="mt-3 text-[15px] leading-[1.75] text-ink-muted">{service.overview[0]}</p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <Button
                        href={r(`/services/${service.slug}`)}
                        variant="navy"
                        className="h-auto min-h-11 whitespace-normal py-2.5 text-center"
                      >
                        Explore {service.title}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Button>
                      <Button
                        href={r(`/contact?service=${encodeURIComponent(service.title)}`)}
                        variant="outline"
                        className="h-auto min-h-11 whitespace-normal py-2.5 text-center"
                      >
                        Get a quote
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border bg-white p-6 sm:p-7">
                    {/* US: VERBATIM label from the old services page. UK: POS Accounts' "Scope of Work". */}
                    <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">
                      {region === "uk" ? "Scope of work" : "Key Features:"}
                    </p>
                    <ul className="mt-5 space-y-3.5">
                      {service.features.map((f) => (
                        <li key={f} className="flex items-start gap-3 text-[14.5px] text-navy-deep">
                          <CheckCircle2 className="mt-0.5 h-[18px] w-[18px] shrink-0 text-emerald" aria-hidden="true" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    {service.tools.length > 0 && (
                      <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
                        {service.tools.map((tool) => (
                          <span key={tool} className="rounded-full bg-slate-100 px-3 py-1 text-[12px] font-medium text-slate-600">
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                    {service.tagline && (
                      <p className="mt-5 border-t border-border pt-4 text-[13.5px] font-semibold text-accent-dark">{service.tagline}</p>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="section-tight bg-slate-50">
        <div className="container">
          {/* VERBATIM heading from the old services page. */}
          <Reveal className="mx-auto mb-10 max-w-2xl text-center">
            <span className="eyebrow mb-4">By the numbers</span>
            <h2 className="text-[1.8rem] font-extrabold sm:text-4xl">
              Why Choose <span className="text-gradient-brand">ANAV Global Services?</span>
            </h2>
          </Reveal>
          <Stats settings={settings} />
          <p className="mt-8 text-center text-[14px] text-ink-muted">
            Not sure which service you need?{" "}
            <Link href={r("/contact")} className="font-semibold text-brand hover:text-brand-dark">
              Tell us what is going on
            </Link>{" "}
            and we will recommend a starting point.
          </p>
        </div>
      </section>

      <DeliveryProcess />
      <EngagementModels region={region} />
      <CTA contact={contact} />
    </>
  );
}
