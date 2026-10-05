import { CheckCircle2 } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { regionContent } from "@/lib/region-content";
import type { Region } from "@/lib/regions";
import { cn } from "@/lib/utils";
import { getIcon } from "@/lib/icons";

/**
 * Engagement models per country site (lib/region-content.ts). "What would this
 * actually look like for us" is asked before "what does it cost", and
 * answering it up front removes a common reason to leave and think.
 */
export default function EngagementModels({ region }: { region: Region }) {
  const { title, accent, lead, models, includes } = regionContent[region].engagement;
  return (
    <section className="section relative overflow-hidden bg-navy-deep">
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[130px]"
        style={{ backgroundImage: "var(--gradient-brand)" }}
        aria-hidden="true"
      />

      <div className="container relative">
        <SectionHeading
          eyebrow="Engagement Models"
          title={title}
          accent={accent}
          lead={lead}
          align="center"
          onDark
        />

        <RevealGroup
          className={cn(
            "mt-14 grid gap-5 sm:grid-cols-2",
            models.length === 5 ? "lg:grid-cols-3 xl:grid-cols-5" : "lg:grid-cols-4"
          )}
        >
          {models.map((model) => {
            const Icon = getIcon(model.icon);
            return (
              <RevealItem
                key={model.name}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent-light/40 hover:bg-white/[0.07]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent-light transition-colors group-hover:border-accent-light/40 group-hover:bg-accent/10">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-[17px] font-bold leading-snug text-white">{model.name}</h3>
                <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-white/65">{model.body}</p>
                <p className="mt-5 border-t border-white/10 pt-4 text-[12.5px] font-semibold text-accent-light">
                  Best for: {model.bestFor}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {includes && includes.length > 0 && (
          <Reveal className="mt-8 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 sm:flex-row sm:justify-center sm:gap-8">
            <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-accent-light">Each model includes</p>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {includes.map((item) => (
                <li key={item} className="flex items-center gap-2 text-[14px] text-white/80">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
