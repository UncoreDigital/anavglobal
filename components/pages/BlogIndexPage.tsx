import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import AvLine from "@/components/brand/AvLine";
import PageBanner from "@/components/PageBanner";
import PostCard from "@/components/PostCard";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import CTA from "@/components/sections/CTA";
import { getPosts } from "@/lib/posts";
import { contactFrom, getSettings } from "@/lib/settings";
import { rhref, type Region } from "@/lib/regions";
import { pageMetadata } from "@/lib/seo";
import { features } from "@/lib/site";
import { formatDate, readingTime } from "@/lib/utils";

export function blogMetadata(region: Region) {
  return pageMetadata(region, "/blog", {
    title: "Insights — Accounting, Tax and Business Growth",
    description: "Expert tips and insights on accounting, tax, and business growth from the ANAV Global team.",
  });
}

export default async function BlogIndexPage({ region }: { region: Region }) {
  if (!features.insights) notFound();

  const [posts, settings] = await Promise.all([getPosts(undefined, region), getSettings()]);
  const contact = contactFrom(settings, region);
  const [featured, ...rest] = posts;

  return (
    <>
      {/* VERBATIM: "Latest Insights — From Our Blog — Expert tips and insights…" */}
      <PageBanner
        eyebrow="Latest Insights"
        title="From Our"
        accent="Blog"
        lead="Expert tips and insights on accounting, tax, and business growth"
        breadcrumbs={[{ name: "Insights" }]}
        homeHref={rhref(region, "/")}
      />

      <section className="section bg-white">
        <div className="container">
          {!featured ? (
            <Reveal className="mx-auto max-w-md rounded-2xl border border-dashed border-border bg-slate-50 p-12 text-center">
              <h2 className="text-lg font-bold text-navy-deep">New articles coming soon</h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">
                In the meantime, the FAQs cover most of what clients ask before getting started.
              </p>
              <Link
                href={rhref(region, "/faqs")}
                className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-brand hover:text-brand-dark"
              >
                Read the FAQs
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          ) : (
            <>
              <Reveal>
                <Link
                  href={rhref(region, `/blog/${featured.slug}`)}
                  className="card-edge group grid gap-8 overflow-hidden p-5 hover:shadow-lift md:grid-cols-2 md:p-7"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-navy-deep">
                    {featured.cover_url ? (
                      <Image
                        src={featured.cover_url}
                        alt={featured.cover_alt ?? ""}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        priority
                      />
                    ) : (
                      <div className="absolute inset-0" aria-hidden="true">
                        <div className="absolute inset-0 bg-grid opacity-60" />
                        <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-brand opacity-40 blur-[70px]" />
                        <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-accent opacity-30 blur-[70px]" />
                        <AvLine id="featured-cover" variant="trend" strokeWidth={3} glow className="absolute inset-x-8 bottom-8 top-14" />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12.5px] text-ink-muted">
                      <span className="rounded-full bg-brand/10 px-2.5 py-1 font-semibold text-brand">{featured.category}</span>
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                        {formatDate(featured.published_at)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {readingTime(featured.content)} min read
                      </span>
                    </div>
                    <h2 className="mt-4 text-2xl font-extrabold leading-tight text-navy-deep transition-colors group-hover:text-brand sm:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-[15px] leading-[1.75] text-ink-muted">{featured.excerpt}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-brand">
                      Read article
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>

              {rest.length > 0 && (
                <RevealGroup className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <RevealItem key={post.id}>
                      <PostCard post={post} region={region} />
                    </RevealItem>
                  ))}
                </RevealGroup>
              )}
            </>
          )}
        </div>
      </section>

      <CTA contact={contact} />
    </>
  );
}
