import { ArrowRight, MessageCircle } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import CTA from "@/components/sections/CTA";
import { Button } from "@/components/ui/Button";
import { regionContent } from "@/lib/region-content";
import { rhref, type Region } from "@/lib/regions";
import { pageMetadata } from "@/lib/seo";
import { contactFrom, getSettings } from "@/lib/settings";

export function faqsMetadata(region: Region) {
  return pageMetadata(region, "/faqs", {
    title: "FAQs",
    description:
      "Answers to the questions clients ask first — who we work with, which software we use, onboarding, turnaround, data security and pricing.",
  });
}

export default async function FaqsPage({ region }: { region: Region }) {
  const { faqs, services } = regionContent[region];
  const groups = [
    { id: "general", title: "General", items: faqs },
    ...services.map((s) => ({ id: s.slug, title: s.title, items: s.faqs })),
  ];
  const contact = contactFrom(await getSettings(), region);

  return (
    <>
      {/* One FAQPage for the whole URL, covering every group. */}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: groups.flatMap((g) =>
            g.items.map((item) => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            }))
          ),
        }}
      />

      <PageBanner
        eyebrow="FAQs"
        title="Frequently asked"
        accent="questions"
        lead="Straight answers to what clients ask before they get started. If yours is not here, ask us directly — we reply within 24 hours."
        breadcrumbs={[{ name: "FAQs" }]}
        homeHref={rhref(region, "/")}
      />

      <section className="section bg-white">
        <div className="container grid gap-12 lg:grid-cols-[17rem_1fr] lg:gap-16">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label="FAQ topics" className="rounded-2xl border border-border bg-slate-50 p-3">
              <p className="px-3 pb-2 pt-1 text-[11.5px] font-bold uppercase tracking-[0.16em] text-ink-muted">Topics</p>
              <ul>
                {groups.map((g) => (
                  <li key={g.id}>
                    <a
                      href={`#${g.id}`}
                      className="block rounded-lg px-3 py-2 text-[14px] font-medium text-navy-deep transition-colors hover:bg-white hover:text-brand"
                    >
                      {g.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-5 hidden rounded-2xl border border-border bg-white p-6 shadow-soft lg:block">
              <span className="icon-plate">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-4 text-[15px] font-bold text-navy-deep">Still have a question?</p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-muted">Talk it through with our team — no obligation.</p>
              <Button href={rhref(region, "/contact")} className="mt-5 w-full" size="md">
                Get In Touch
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </aside>

          <div className="space-y-14">
            {groups.map((g) => (
              <Reveal key={g.id} as="section">
                <div id={g.id} className="scroll-mt-28">
                  <h2 className="text-2xl font-extrabold">{g.title}</h2>
                  <FaqAccordion items={g.items} className="mt-6" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA contact={contact} />
    </>
  );
}
