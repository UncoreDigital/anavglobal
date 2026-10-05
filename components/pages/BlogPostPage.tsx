import type { Metadata } from "next";
import { rhref, type Region } from "@/lib/regions";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { ArrowLeft, CalendarDays, Clock, User } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import PostCard from "@/components/PostCard";
import Reveal from "@/components/Reveal";
import CTA from "@/components/sections/CTA";
import { getPost, getPostSlugs, getRelatedPosts } from "@/lib/posts";
import { contactFrom, getSettings } from "@/lib/settings";
import { features, site } from "@/lib/site";
import { formatDate, readingTime } from "@/lib/utils";

export async function postSlugsFor(region: Region) {
  if (!features.insights) return [];
  const slugs = await getPostSlugs(region);
  return slugs.map((slug) => ({ slug }));
}

export async function postMetadata(region: Region, slug: string): Promise<Metadata> {
  const post = await getPost(slug, region);
  if (!post) return {};
  const path = rhref(region, `/blog/${post.slug}`);
  /* A post shown on both sites declares both URLs; a region-only post declares itself. */
  const both = !post.region || post.region === "all";
  const languages: Record<string, string> = both
    ? { "en-US": `/blog/${post.slug}`, "en-GB": `/uk/blog/${post.slug}`, "x-default": `/blog/${post.slug}` }
    : { [region === "uk" ? "en-GB" : "en-US"]: path };

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt;

  return {
    title,
    description,
    alternates: { canonical: path, languages },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${site.url}${path}`,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      authors: [post.author],
      images: post.cover_url ? [{ url: post.cover_url }] : undefined,
    },
  };
}

export default async function BlogPostPage({ region, slug }: { region: Region; slug: string }) {
  if (!features.insights) notFound();

  const post = await getPost(slug, region);
  if (!post) notFound();

  const [related, settings] = await Promise.all([getRelatedPosts(post, region), getSettings()]);
  const contact = contactFrom(settings, region);

  /*
    Post bodies are HTML from the admin editor. They are sanitised at render
    rather than only on save: a body written directly into the table must not
    be able to inject script into a visitor's page.
  */
  const clean = DOMPurify.sanitize(post.content, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel"],
  });

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden bg-navy-deep">
          <div className="absolute inset-0 -z-10 bg-grid opacity-50" aria-hidden="true" />
          <div className="absolute -left-40 -top-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-brand opacity-30 blur-[120px]" aria-hidden="true" />
          <div className="absolute -bottom-48 -right-24 -z-10 h-[26rem] w-[26rem] rounded-full bg-accent opacity-20 blur-[120px]" aria-hidden="true" />

          <div className="container relative py-14 md:py-20">
            <Link
              href={rhref(region, "/blog")}
              className="inline-flex items-center gap-2 text-[13px] text-white/60 transition-colors hover:text-accent-light"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              All insights
            </Link>

            <Reveal className="mt-6 max-w-3xl">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold text-accent-light">
                {post.category}
              </span>
              <h1 className="mt-5 text-[2rem] font-extrabold leading-[1.15] text-white sm:text-[2.6rem]">{post.title}</h1>
              {post.excerpt && <p className="mt-5 text-[16px] leading-[1.75] text-white/75">{post.excerpt}</p>}

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-white/60">
                <span className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5" aria-hidden="true" />
                  {post.author}
                </span>
                {post.published_at && (
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    {formatDate(post.published_at)}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {readingTime(post.content)} min read
                </span>
              </div>
            </Reveal>
          </div>
        </header>

        <div className="section bg-white">
          <div className="container">
            <div className="mx-auto max-w-[46rem]">
              {post.cover_url && (
                <Reveal className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={post.cover_url}
                    alt={post.cover_alt ?? ""}
                    fill
                    sizes="(min-width: 768px) 46rem, 100vw"
                    className="object-cover"
                    priority
                  />
                </Reveal>
              )}
              <div className="prose-anav" dangerouslySetInnerHTML={{ __html: clean }} />
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-tight bg-slate-50">
          <div className="container">
            <h2 className="text-xl font-extrabold text-navy-deep sm:text-2xl">Related reading</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <PostCard key={item.id} post={item} region={region} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA contact={contact} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.meta_description || post.excerpt,
          url: `${site.url}${rhref(region, `/blog/${post.slug}`)}`,
          datePublished: post.published_at ?? undefined,
          dateModified: post.updated_at,
          author: { "@type": "Organization", name: post.author },
          publisher: { "@id": `${site.url}/#organization` },
          image: post.cover_url ? [post.cover_url] : undefined,
          mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}${rhref(region, `/blog/${post.slug}`)}` },
        }}
      />
    </>
  );
}
