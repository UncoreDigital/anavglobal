import { ArrowRight, MessageCircle } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";

/**
 * FAQ block with FAQPage structured data. The answers stay in the DOM when
 * collapsed (see FaqAccordion), so what the JSON-LD claims is on the page
 * really is on the page.
 */
export default function FaqSection({
  items,
  title = "Questions clients",
  accent = "ask first",
  className = "section bg-slate-50",
  schema = true,
  contactHref = "/contact",
}: {
  items: { q: string; a: string }[];
  title?: string;
  accent?: string;
  className?: string;
  /** Emit FAQPage structured data. Google expects one FAQPage per URL, so turn off where the page emits its own. */
  schema?: boolean;
  /** Region-aware contact link (rhref(region, "/contact")). */
  contactHref?: string;
}) {
  return (
    <section className={className}>
      {schema && <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />}
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading eyebrow="FAQs" title={title} accent={accent} />
            <Reveal className="mt-8 rounded-2xl border border-border bg-white p-6 shadow-soft">
              <span className="icon-plate">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-4 text-[15px] font-bold text-navy-deep">Still have a question?</p>
              <p className="mt-1.5 text-[14px] leading-relaxed text-ink-muted">
                Book a free consultation and talk it through with our team — no obligation.
              </p>
              <Button href={contactHref} className="mt-5" size="md">
                Get In Touch
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Reveal>
          </div>
          <Reveal>
            <FaqAccordion items={items} defaultOpen={0} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
