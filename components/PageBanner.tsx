import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import AvLine from "@/components/brand/AvLine";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * Interior page hero.
 *
 * One component for every non-home page so the H1 scale, the breadcrumb and
 * the band height cannot drift between pages.
 *
 * Without a photo the band is navy-deep with the mark's two ends as glows —
 * blue top-left, green bottom-right — and the AV line drawn across the right.
 * With a photo, the image sits under a left-to-right ramp that holds ~0.9 navy
 * behind the copy (white text stays above 10:1) and opens to ~0.35 on the right
 * where there is no text and the photograph can be seen.
 */
export default function PageBanner({
  eyebrow,
  title,
  accent,
  lead,
  chips,
  breadcrumbs = [],
  image,
  imageAlt,
  children,
  homeHref = "/",
}: {
  /** Breadcrumb "Home" — the current country site's homepage. */
  homeHref?: string;
  eyebrow?: string;
  title: string;
  /** Trailing fragment of the title, in the on-dark gradient. */
  accent?: string;
  lead?: string;
  chips?: readonly string[];
  breadcrumbs?: { name: string; href?: string }[];
  image?: string;
  imageAlt?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep">
      {image && (
        <Image
          src={image}
          alt={imageAlt ?? ""}
          fill
          priority
          sizes="100vw"
          aria-hidden={imageAlt ? undefined : "true"}
          className="-z-10 object-cover object-right"
        />
      )}

      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: image
            ? "linear-gradient(100deg, hsl(var(--navy-deep) / 0.94) 0%, hsl(var(--navy-deep) / 0.88) 42%, hsl(var(--navy-deep) / 0.55) 72%, hsl(var(--navy-deep) / 0.36) 100%)"
            : "none",
        }}
        aria-hidden="true"
      />
      <div className={cn("absolute inset-0 -z-10 bg-grid", image ? "opacity-20" : "opacity-50")} aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-40 -top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-brand opacity-30 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-48 -right-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-accent opacity-20 blur-[120px]"
        aria-hidden="true"
      />
      {!image && (
        <AvLine
          id="banner-line"
          variant="trend"
          strokeWidth={2}
          glow
          className="pointer-events-none absolute bottom-10 right-0 -z-10 hidden h-40 w-[46%] opacity-60 lg:block"
        />
      )}

      <div className="container relative py-14 md:py-20">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-white/55">
              <li>
                <Link href={homeHref} className="transition-colors hover:text-accent-light">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.name} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  {crumb.href && i < breadcrumbs.length - 1 ? (
                    <Link href={crumb.href} className="transition-colors hover:text-accent-light">
                      {crumb.name}
                    </Link>
                  ) : (
                    <span className="text-white/85" aria-current="page">
                      {crumb.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <Reveal className="max-w-3xl">
          {eyebrow && <span className="eyebrow eyebrow-on-dark mb-4">{eyebrow}</span>}
          <h1 className="text-[2.1rem] font-extrabold leading-[1.1] text-white sm:text-[2.8rem] lg:text-[3.25rem]">
            {title}
            {accent && (
              <>
                {" "}
                <span className="text-gradient-on-dark">{accent}</span>
              </>
            )}
          </h1>
          {lead && <p className="mt-5 max-w-2xl text-[16px] leading-[1.75] text-white/75">{lead}</p>}

          {chips && chips.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-white/15 bg-white/[0.07] px-4 py-1.5 text-[12.5px] font-medium text-white/85 backdrop-blur"
                >
                  {chip}
                </li>
              ))}
            </ul>
          )}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
