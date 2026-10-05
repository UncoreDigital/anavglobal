import { Clock, Cloud, Users } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import CTA from "@/components/sections/CTA";
import DeliveryProcess from "@/components/sections/DeliveryProcess";
import EngagementModels from "@/components/sections/EngagementModels";
import FaqSection from "@/components/sections/FaqSection";
import Process from "@/components/sections/Process";
import Software from "@/components/sections/Software";
import SectionHeading from "@/components/SectionHeading";
import { security } from "@/lib/content";
import { regionContent } from "@/lib/region-content";
import { rhref, type Region } from "@/lib/regions";
import { pageMetadata } from "@/lib/seo";
import { getIcon } from "@/lib/icons";
import { contactFrom, getSettings } from "@/lib/settings";

export function howWeWorkMetadata(region: Region) {
  return pageMetadata(region, "/how-we-work", {
    title: "How We Work",
    description:
      "Onboarding, engagement models, the platforms we work in and how we keep your financial data secure.",
  });
}

const principles = [
  {
    title: "A dedicated team",
    body: "Onboarding assigns a dedicated team with clear communication channels — you always know who is working on your books.",
    Icon: Users,
  },
  {
    title: "Cloud-based, in your systems",
    body: "Real-time access to your financial data anytime, anywhere, in the software you already use.",
    Icon: Cloud,
  },
  {
    title: "24-hour turnaround",
    body: "Routine tasks turned around within 24 hours, so your financial information is always up to date.",
    Icon: Clock,
  },
];

export default async function HowWeWorkPage({ region }: { region: Region }) {
  const content = regionContent[region];
  const contact = contactFrom(await getSettings(), region);

  return (
    <>
      <PageBanner
        eyebrow="How We Work"
        title="Simple to start."
        accent="Built to last."
        lead="A clear onboarding process, an engagement model shaped around you, and a team that works inside your systems — with your data staying where it belongs."
        breadcrumbs={[{ name: "About", href: rhref(region, "/about") }, { name: "How We Work" }]}
        homeHref={rhref(region, "/")}
      />

      <section className="section-tight bg-white">
        <div className="container">
          <RevealGroup className="grid gap-5 md:grid-cols-3">
            {principles.map(({ title, body, Icon }) => (
              <RevealItem key={title} className="card-edge flex gap-5 p-7 hover:shadow-card">
                <span className="icon-plate">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-[17px] font-bold text-navy-deep">{title}</h2>
                  <p className="mt-2 text-[14px] leading-[1.7] text-ink-muted">{body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <Process />
      <DeliveryProcess />
      <EngagementModels region={region} />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
            <SectionHeading
              eyebrow="Tools and Applications"
              title="Seamlessly integrated with"
              accent="the platforms you already use"
              lead="QuickBooks ProAdvisor and Xero Advisor certified, with Sage certified consultants on the team. If you run something not listed here, tell us — the list is what we are asked for most, not the limit of what we work in."
            />
            <Reveal>
              <Software variant="grid" tools={content.software} />
            </Reveal>
          </div>
        </div>
      </section>

      <section id="security" className="section scroll-mt-28 bg-slate-50">
        <div className="container">
          <SectionHeading
            eyebrow="Data Security"
            title="Your data stays"
            accent="where it belongs"
            lead="Your financial records are among the most sensitive information you hold. Our delivery model is built so that you stay in control of them."
            align="center"
          />
          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
            {security.map((item) => {
              const Icon = getIcon(item.icon);
              return (
                <RevealItem key={item.title} className="card-edge p-8 hover:-translate-y-1 hover:shadow-lift">
                  <span className="icon-plate h-14 w-14">
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

      <FaqSection items={content.faqs} className="section bg-white" contactHref={rhref(region, "/contact")} />
      <CTA contact={contact} />
    </>
  );
}
