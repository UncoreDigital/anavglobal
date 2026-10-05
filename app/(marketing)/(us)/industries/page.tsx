import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import CTA from "@/components/sections/CTA";
import IndustriesGrid from "@/components/sections/IndustriesGrid";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { industryExpertise } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { industries } from "@/lib/industries-data";
import { contactFrom, getSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Industries We Serve",
  description:
    "Industry-specific accounting for startups and SMEs, CPA firms, e-commerce, restaurants and hospitality, professional services and real estate.",
  alternates: { canonical: "/industries" },
};

export default async function IndustriesPage() {
  const contact = contactFrom(await getSettings());

  return (
    <>
      {/* VERBATIM: "Industries We Serve — Every Industry — Industry-specific accounting expertise…" */}
      <PageBanner
        eyebrow="Industries We Serve"
        title="Accounting expertise for"
        accent="every industry"
        lead="Industry-specific accounting expertise tailored to your unique business needs"
        breadcrumbs={[{ name: "Industries" }]}
        chips={industries.map((i) => i.name)}
      />

      <IndustriesGrid heading={false} className="section bg-white" />

      <section className="section bg-mint-light">
        <div className="container">
          <SectionHeading
            eyebrow="Our approach"
            title="Why Industry-Specific"
            accent="Expertise Matters"
            lead="Every industry has unique accounting challenges and requirements"
            align="center"
          />
          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
            {industryExpertise.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <RevealItem key={item.title} className="card-edge p-8 text-center hover:-translate-y-1 hover:shadow-lift">
                  <span className="icon-plate mx-auto h-14 w-14">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 text-[18px] font-bold text-navy-deep">{item.title}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.7] text-ink-muted">{item.body}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <section className="section-tight bg-white">
        <div className="container">
          {/* VERBATIM: "Don't See Your Industry?" */}
          <Reveal className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-slate-50 p-8 sm:p-10 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-extrabold sm:text-[1.75rem]">Don&apos;t See Your Industry?</h2>
              <p className="mt-3 text-[15px] leading-[1.75] text-ink-muted">
                We work with businesses across many industries. Contact us to discuss how we can help your specific
                business needs.
              </p>
            </div>
            <Button href="/contact" size="lg" className="shrink-0">
              Contact Us Today
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>
        </div>
      </section>

      <CTA contact={contact} />
    </>
  );
}
