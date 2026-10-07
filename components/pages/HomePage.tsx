import Audiences from "@/components/sections/Audiences";
import CTA from "@/components/sections/CTA";
import EngagementModels from "@/components/sections/EngagementModels";
import FaqSection from "@/components/sections/FaqSection";
import GlobalPresence from "@/components/sections/GlobalPresence";
import Hero from "@/components/sections/Hero";
import IndustriesGrid from "@/components/sections/IndustriesGrid";
import Insights from "@/components/sections/Insights";
import Process from "@/components/sections/Process";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Software from "@/components/sections/Software";
import TeamSection from "@/components/sections/TeamSection";
import Testimonials from "@/components/sections/Testimonials";
import WhyUs from "@/components/sections/WhyUs";
import { getPosts } from "@/lib/posts";
import { regionContent } from "@/lib/region-content";
import { rhref, type Region } from "@/lib/regions";
import { pageMetadata } from "@/lib/seo";
import { contactFrom, figure, getSettings } from "@/lib/settings";
import { features } from "@/lib/site";
import { getTeam } from "@/lib/team";
import { getTestimonials } from "@/lib/testimonials";

export function homeMetadata(region: Region) {
  const { meta } = regionContent[region];
  return pageMetadata(region, "/", { title: meta.homeTitle, description: meta.homeDescription, absoluteTitle: true });
}

/**
 * Homepage for either country site. Section order follows the question a
 * visitor is answering:
 *   what is this → is it for me → what do they do → can I trust them →
 *   how would it work → who are they → what do others say → let's talk.
 */
export default async function HomePage({ region }: { region: Region }) {
  const content = regionContent[region];
  const [settings, team, testimonials, posts] = await Promise.all([
    getSettings(),
    getTeam(),
    features.testimonials ? getTestimonials() : Promise.resolve([]),
    features.insights ? getPosts(3, region) : Promise.resolve([]),
  ]);
  const contact = contactFrom(settings, region);

  return (
    <>
      <Hero clients={figure(settings.clients)} satisfaction={figure(settings.satisfaction)} region={region} />
      <Software tools={content.software} />
      <Audiences region={region} />
      <ServicesGrid region={region} />
      <WhyUs settings={settings} />
      <Process />
      <EngagementModels region={region} />
      <IndustriesGrid region={region} />
      <GlobalPresence region={region} />
      <TeamSection members={team} variant="teaser" className="bg-white" teamHref={rhref(region, "/team")} />
      <Testimonials items={testimonials} />
      <Insights posts={posts} region={region} />
      <FaqSection items={content.faqs.slice(0, 6)} contactHref={rhref(region, "/contact")} />
      <CTA contact={contact} />
    </>
  );
}
