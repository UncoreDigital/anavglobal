import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { regionContent } from "@/lib/region-content";
import { rhref, type Region } from "@/lib/regions";

/**
 * The region's service lines as cards — six on the US site (VERBATIM headings
 * from the old site), four on the UK site (lib/uk-services-data.ts).
 */
export default function ServicesGrid({
  region,
  heading = true,
  exclude,
  className = "section bg-white",
}: {
  region: Region;
  heading?: boolean;
  /** Slug to leave out — the current page, on a service detail page. */
  exclude?: string;
  className?: string;
}) {
  const { services, servicesHeading } = regionContent[region];
  const list = exclude ? services.filter((s) => s.slug !== exclude) : services;
  /* Four cards (the UK set) sit 2×2 then 4-up; six (US) sit 3-up. Avoids an orphaned last card. */
  const cols = list.length === 4 ? "sm:grid-cols-2 xl:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className={className}>
      <div className="container">
        {heading && (
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow={servicesHeading.eyebrow}
              title={servicesHeading.title}
              accent={servicesHeading.accent}
              lead={servicesHeading.lead}
            />
            <Button href={rhref(region, "/services")} variant="outline" className="shrink-0">
              View All Services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        )}

        <RevealGroup className={cn(heading && "mt-14", "grid gap-5", cols)}>
          {list.map((service, i) => {
            const Icon = getIcon(service.icon);
            return (
              <RevealItem key={service.slug}>
                <Link
                  href={rhref(region, `/services/${service.slug}`)}
                  className="card-edge group flex h-full flex-col p-7 hover:-translate-y-1.5 hover:shadow-lift"
                >
                  <div className="flex items-start justify-between">
                    <span className="icon-plate transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="font-display text-[13px] font-bold text-slate-200 transition-colors group-hover:text-brand/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 text-[18px] font-bold text-navy-deep">{service.title}</h3>
                  <p className="mt-2.5 flex-1 text-[14px] leading-[1.7] text-ink-muted">{service.description}</p>
                  <ul className="mt-5 space-y-2 border-t border-border pt-5">
                    {service.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[13px] text-navy-deep">
                        <Check className="h-3.5 w-3.5 shrink-0 text-emerald" aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-brand">
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
  );
}
