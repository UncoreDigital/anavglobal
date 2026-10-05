import Image from "next/image";
import AvLine from "@/components/brand/AvLine";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import Stats from "@/components/sections/Stats";
import { whyUs } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import type { Settings } from "@/lib/settings";

/** "Why Choose Us" — VERBATIM copy, with the headline figures beneath. */
export default function WhyUs({ settings }: { settings: Settings }) {
  return (
    <section className="section relative overflow-hidden bg-white">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/assets/photos/about-office.webp"
                alt="An accountant reviewing financial reports"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/10 to-transparent" />
              <div className="absolute inset-x-6 bottom-6">
                <AvLine id="why-line" variant="mark" strokeWidth={3} tone="mint" className="h-8 w-14" />
                <p className="mt-4 max-w-xs font-display text-xl font-bold leading-snug text-white">
                  The caliber of a large firm, at a fraction of the cost.
                </p>
              </div>
            </div>
            <div
              className="absolute -bottom-5 -right-5 -z-10 h-40 w-40 rounded-3xl opacity-80"
              style={{ backgroundImage: "var(--gradient-brand)" }}
              aria-hidden="true"
            />
          </Reveal>

          <div>
            <SectionHeading eyebrow={whyUs.eyebrow} title={whyUs.title} accent={whyUs.accent} lead={whyUs.lead} />
            <RevealGroup className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {whyUs.items.map((item) => {
                const Icon = getIcon(item.icon);
                return (
                  <RevealItem key={item.title} className="flex gap-4">
                    <span className="icon-plate h-11 w-11">
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-[16px] font-bold text-navy-deep">{item.title}</h3>
                      <p className="mt-1.5 text-[13.5px] leading-[1.7] text-ink-muted">{item.body}</p>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>

        <div className="mt-16 lg:mt-20">
          <Stats settings={settings} />
        </div>
      </div>
    </section>
  );
}
