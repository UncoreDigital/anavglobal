import Image from "next/image";
import { BadgeCheck } from "lucide-react";
import AvLine from "@/components/brand/AvLine";
import PageBanner from "@/components/PageBanner";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import CTA from "@/components/sections/CTA";
import GlobalPresence from "@/components/sections/GlobalPresence";
import Stats from "@/components/sections/Stats";
import TeamSection from "@/components/sections/TeamSection";
import SectionHeading from "@/components/SectionHeading";
import { about, certifications, values } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { rhref, type Region } from "@/lib/regions";
import { pageMetadata } from "@/lib/seo";
import { contactFrom, getSettings } from "@/lib/settings";
import { getTeam } from "@/lib/team";

export function aboutMetadata(region: Region) {
  return pageMetadata(region, "/about", {
    title: "About Us",
    description:
      "For over a decade, ANAV Global has provided accounting and bookkeeping services to small and mid-sized businesses — combining the personal touch of a boutique firm with modern cloud accounting.",
  });
}

export default async function AboutPage({ region }: { region: Region }) {
  const [settings, team] = await Promise.all([getSettings(), getTeam()]);
  const contact = contactFrom(settings, region);

  return (
    <>
      <PageBanner
        eyebrow={about.eyebrow}
        title={about.title}
        accent={about.accent}
        lead={about.intro[0]}
        breadcrumbs={[{ name: "About Us" }]}
        homeHref={rhref(region, "/")}
      />

      {/* Our Story — VERBATIM */}
      <section className="section bg-white">
        <div className="container grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal className="relative">
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl shadow-lift">
              <Image
                src="/assets/photos/about-team.webp"
                alt="The ANAV Global team in a working session"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 left-6 right-6 rounded-2xl border border-border bg-white p-5 shadow-card sm:left-auto sm:w-80">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">Our mission</p>
              <p className="mt-2 text-[14px] leading-relaxed text-navy-deep">{about.intro[1]}</p>
            </div>
          </Reveal>

          <Reveal className="pt-8 lg:pt-0">
            <span className="eyebrow mb-4">Our Story</span>
            <h2 className="text-[1.8rem] font-extrabold leading-[1.15] sm:text-4xl">
              Big-firm caliber, <span className="text-gradient-brand">boutique-firm care</span>
            </h2>
            {about.story.map((p) => (
              <p key={p.slice(0, 24)} className="mt-5 text-[15.5px] leading-[1.8] text-ink-muted">
                {p}
              </p>
            ))}
            <ul className="mt-8 flex flex-wrap gap-3">
              {about.pillars.map((pillar) => (
                <li
                  key={pillar}
                  className="flex items-center gap-2 rounded-full border border-border bg-mint-light px-4 py-2 text-[13.5px] font-semibold text-navy-deep"
                >
                  <AvLine id={`pillar-${pillar}`} className="h-2.5 w-4" strokeWidth={2} />
                  {pillar}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="section-tight bg-slate-50">
        <div className="container">
          <Stats settings={settings} />
        </div>
      </section>

      {/* Our Core Values — VERBATIM */}
      <section className="section bg-white">
        <div className="container">
          <SectionHeading
            eyebrow="Our Core Values"
            title="The principles that"
            accent="guide everything we do"
            align="center"
          />
          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => {
              const Icon = getIcon(v.icon);
              return (
                <RevealItem key={v.title} className="card-edge p-7 text-center hover:-translate-y-1 hover:shadow-lift">
                  <span className="icon-plate mx-auto h-14 w-14">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[18px] font-bold text-navy-deep">{v.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">{v.body}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Certified & Qualified Professionals — VERBATIM */}
      <section className="section relative overflow-hidden bg-navy-deep">
        <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-brand opacity-30 blur-[120px]" aria-hidden="true" />
        <div className="container relative">
          <SectionHeading
            eyebrow="Credentials"
            title="Certified & Qualified"
            accent="Professionals"
            lead="Our team holds prestigious certifications and continuously updates their expertise to provide you with the best service"
            align="center"
            onDark
          />
          <RevealGroup className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certifications.map((c) => (
              <RevealItem
                key={c}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 transition-colors hover:border-accent-light/40"
              >
                <BadgeCheck className="h-5 w-5 shrink-0 text-accent-light" aria-hidden="true" />
                <span className="text-[14.5px] font-semibold text-white">{c}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <TeamSection members={team} variant="teaser" teamHref={rhref(region, "/team")} />
      <GlobalPresence region={region} />
      <CTA contact={contact} />
    </>
  );
}
