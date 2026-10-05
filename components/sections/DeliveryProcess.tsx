import { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { deliveryProcess } from "@/lib/content";

/** "Our Service Delivery Process — Transparent, efficient, and designed for your success" (VERBATIM). */
export default function DeliveryProcess({ className = "section bg-white" }: { className?: string }) {
  return (
    <section className={className}>
      <div className="container">
        <SectionHeading
          eyebrow="Service Delivery"
          title="Our Service"
          accent="Delivery Process"
          lead="Transparent, efficient, and designed for your success"
          align="center"
        />
        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {deliveryProcess.map((step, i) => (
            <RevealItem key={step.title} className="card-edge relative overflow-hidden p-7 hover:-translate-y-1 hover:shadow-lift">
              <span className="font-display text-[3.25rem] font-extrabold leading-none text-gradient-brand opacity-90">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-[17px] font-bold text-navy-deep">{step.title}</h3>
              <p className="mt-2.5 text-[14px] leading-[1.7] text-ink-muted">{step.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
