import Image from "next/image";
import { ArrowRight, Linkedin } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import type { PublicTeamMember } from "@/lib/team";
import { cn } from "@/lib/utils";

/**
 * The team, from Admin → Team.
 *
 * `teaser` shows leadership only with a link to /team; `full` shows leadership
 * large and management in a second row. Both render nothing for an empty list,
 * so unpublishing everyone in the admin removes the section cleanly.
 */
export default function TeamSection({
  members,
  variant = "teaser",
  className,
  teamHref = "/team",
}: {
  /** Region-aware link to the full team page. */
  teamHref?: string;
  members: PublicTeamMember[];
  variant?: "teaser" | "full";
  className?: string;
}) {
  if (members.length === 0) return null;
  const leadership = members.filter((m) => m.tier === "leadership");
  const management = members.filter((m) => m.tier !== "leadership");

  return (
    <section className={cn("section bg-white", className)}>
      <div className="container">
        {variant === "teaser" ? (
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Our Team"
              title="Meet The"
              accent="Experts"
              lead="Certified professionals dedicated to your financial success"
            />
            <Button href={teamHref} variant="outline" className="shrink-0">
              Meet the whole team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        ) : (
          <SectionHeading
            eyebrow="Leadership"
            title="The people"
            accent="behind ANAV Global"
            lead="Certified professionals dedicated to your financial success"
            align="center"
          />
        )}

        <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leadership.map((m) => (
            <RevealItem key={m.name}>
              <PersonCard member={m} large={variant === "full"} />
            </RevealItem>
          ))}
        </RevealGroup>

        {variant === "full" && management.length > 0 && (
          <>
            <h3 className="mt-20 text-center text-[13px] font-bold uppercase tracking-[0.18em] text-brand">
              Management Team
            </h3>
            <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {management.map((m) => (
                <RevealItem key={m.name}>
                  <PersonCard member={m} />
                </RevealItem>
              ))}
            </RevealGroup>
          </>
        )}
      </div>
    </section>
  );
}

function PersonCard({ member, large = false }: { member: PublicTeamMember; large?: boolean }) {
  return (
    <article className="card-edge group flex h-full flex-col overflow-hidden hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[4/5] overflow-hidden rounded-t-2xl bg-slate-100">
        {member.photo_url ? (
          <Image
            src={member.photo_url}
            alt={`${member.name}, ${member.role}`}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <span
            className="flex h-full w-full items-center justify-center font-display text-5xl font-extrabold text-white"
            style={{ backgroundImage: "var(--gradient-brand)" }}
          >
            {member.name
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((w) => w[0])
              .join("")}
          </span>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-deep/40 to-transparent" />
        {member.credentials.length > 0 && (
          <ul className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {member.credentials.slice(0, 2).map((c) => (
              <li key={c} className="rounded-full bg-white/90 px-2.5 py-1 text-[10.5px] font-bold text-navy-deep backdrop-blur">
                {c}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className={cn("font-bold text-navy-deep", large ? "text-[19px]" : "text-[16px]")}>{member.name}</h3>
        <p className="mt-1 text-[13px] font-semibold text-brand">{member.role}</p>
        {large && member.bio && <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-ink-muted">{member.bio}</p>}
        {!large && member.bio && <p className="mt-2.5 text-[13px] leading-[1.65] text-ink-muted">{member.bio}</p>}
        {member.linkedin_url && (
          <a
            href={member.linkedin_url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="mt-4 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-ink-muted transition-colors hover:border-brand hover:text-brand"
          >
            <Linkedin className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </article>
  );
}
