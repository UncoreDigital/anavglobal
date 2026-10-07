import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getIcon } from "@/lib/icons";
import { regionContent } from "@/lib/region-content";
import { rhref, type Region } from "@/lib/regions";

/** "Industries We Serve / Every Industry" — VERBATIM headings, photo cards. */
export default function IndustriesGrid({
  region,
  heading = true,
  exclude,
  className = "section bg-white",
}: {
  region: Region;
  heading?: boolean;
  exclude?: string;
  className?: string;
}) {
  const { industries } = regionContent[region];
  const list = exclude ? industries.filter((i) => i.slug !== exclude) : industries;

  return (
    <section className={className}>
      <div className="container">
        {heading && (
          <SectionHeading
            eyebrow="Industries We Serve"
            title="Expertise across"
            accent="every industry"
            lead="Industry-specific accounting expertise tailored to your unique business needs"
            align="center"
          />
        )}

        <RevealGroup className={heading ? "mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-5 sm:grid-cols-2 lg:grid-cols-3"}>
          {list.map((industry) => {
            const Icon = getIcon(industry.icon);
            return (
              <RevealItem key={industry.slug}>
                <Link
                  href={rhref(region, `/industries/${industry.slug}`)}
                  className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-navy-deep shadow-card transition-shadow hover:shadow-lift"
                >
                  <Image
                    src={industry.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/55 to-navy-deep/5" />
                  <div
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{ backgroundImage: "var(--gradient-brand)" }}
                  />
                  <span className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all group-hover:bg-accent group-hover:text-navy-deep">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="absolute inset-x-6 bottom-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-accent-light backdrop-blur">
                      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-[19px] font-bold text-white">{industry.name}</h3>
                    <p className="mt-1 text-[13.5px] leading-snug text-white/75">{industry.description}</p>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
