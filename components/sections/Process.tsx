import { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { process } from "@/lib/content";
import { getIcon } from "@/lib/icons";

/**
 * "How It Works" — VERBATIM steps. The connecting rule is the brand gradient,
 * running left to right the way the mark does.
 */
export default function Process({ className = "section bg-mint-light" }: { className?: string }) {
  return (
    <section className={className}>
      <div className="container">
        <SectionHeading
          eyebrow="Our Process"
          title="How It"
          accent="Works"
          lead="Simple, effective steps to transform your accounting operations"
          align="center"
        />

        <div className="relative mt-16">
          <div
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-[3px] rounded-full opacity-60 lg:block"
            style={{ backgroundImage: "var(--gradient-brand)" }}
            aria-hidden="true"
          />
          <RevealGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {process.map((step, i) => {
              const Icon = getIcon(step.icon);
              return (
                <RevealItem key={step.title} className="relative text-center lg:px-2">
                  <span className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border-4 border-mint-light bg-white text-brand shadow-card">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                    <span className="absolute -right-2.5 -top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-navy-deep font-display text-[12px] font-extrabold text-accent-light">
                      {i + 1}
                    </span>
                  </span>
                  <h3 className="mt-6 text-[17px] font-bold text-navy-deep">{step.title}</h3>
                  <p className="mx-auto mt-2.5 max-w-xs text-[14px] leading-[1.7] text-ink-muted">{step.body}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
