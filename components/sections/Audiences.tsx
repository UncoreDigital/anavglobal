import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, Store } from "lucide-react";
import AvLine from "@/components/brand/AvLine";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { regionContent } from "@/lib/region-content";
import { rhref, type Region } from "@/lib/regions";
import { cn } from "@/lib/utils";

/**
 * The two audiences the old hero named — "CPAs & Business Owners" — given a
 * card each, so a visitor self-selects in the first scroll instead of reading a
 * service list written for somebody else.
 *
 * The CPA card is the dark one on purpose: it is the higher-value relationship
 * and the one the reference builds (Virti Shah, ADAS) lead with.
 */
export default function Audiences({ region }: { region: Region }) {
  const { audiences, audiencesLead } = regionContent[region];
  return (
    <section className="section relative overflow-hidden bg-slate-50">
      <div className="absolute inset-0 bg-grid-light mask-fade-b" aria-hidden="true" />
      <div className="container relative">
        <SectionHeading
          eyebrow="Who We Serve"
          title="One team, built for"
          accent="two kinds of client"
          lead={audiencesLead}
          align="center"
        />

        <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-2">
          {audiences.map((a) => {
            const dark = a.id === "cpa";
            const Icon = dark ? Building2 : Store;
            return (
              <RevealItem
                key={a.id}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1 sm:p-10",
                  dark ? "bg-navy-deep text-white shadow-lift" : "border border-border bg-white shadow-card"
                )}
              >
                {dark && (
                  <>
                    <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
                    <div
                      className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand opacity-30 blur-[90px]"
                      aria-hidden="true"
                    />
                  </>
                )}
                <AvLine
                  id={`aud-${a.id}`}
                  variant="mark"
                  strokeWidth={2}
                  tone={dark ? "brand" : "brand"}
                  className="pointer-events-none absolute right-8 top-9 h-10 w-16 opacity-70"
                />

                <div className="relative">
                  <span
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-xl",
                      dark ? "bg-white/10 text-accent-light" : "icon-plate"
                    )}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p
                    className={cn(
                      "mt-6 text-[12px] font-bold uppercase tracking-[0.16em]",
                      dark ? "text-accent-light" : "text-brand"
                    )}
                  >
                    {a.eyebrow}
                  </p>
                  <h3 className={cn("mt-2 text-2xl font-extrabold sm:text-[1.7rem]", dark && "text-white")}>{a.title}</h3>
                  <p className={cn("mt-4 text-[15px] leading-[1.75]", dark ? "text-white/70" : "text-ink-muted")}>{a.body}</p>

                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {a.points.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-[14px]">
                        <CheckCircle2
                          className={cn("mt-0.5 h-4 w-4 shrink-0", dark ? "text-accent-light" : "text-emerald")}
                          aria-hidden="true"
                        />
                        <span className={dark ? "text-white/85" : "text-navy-deep"}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={rhref(region, a.cta.href)}
                  className={cn(
                    "relative mt-8 inline-flex w-fit items-center gap-2 text-[14.5px] font-bold transition-colors",
                    dark ? "text-accent-light hover:text-white" : "text-brand hover:text-brand-dark"
                  )}
                >
                  {a.cta.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
