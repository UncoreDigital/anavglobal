import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import AvLine from "@/components/brand/AvLine";
import { rhref, type Region } from "@/lib/regions";
import type { Post } from "@/lib/supabase/types";
import { formatDate, readingTime } from "@/lib/utils";

/** One post on the blog index, the homepage teaser and the related-posts rail. */
export default function PostCard({ post, region = "us" }: { post: Post; region?: Region }) {
  return (
    <Link
      href={rhref(region, `/blog/${post.slug}`)}
      className="card-edge group flex h-full flex-col overflow-hidden hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl bg-navy-deep">
        {post.cover_url ? (
          <Image
            src={post.cover_url}
            alt={post.cover_alt ?? ""}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          /* No cover: a branded plate rather than an empty grey box. */
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-grid opacity-60" />
            <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-brand opacity-40 blur-[60px]" />
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-accent opacity-30 blur-[60px]" />
            <AvLine id={`card-${post.id}`} variant="trend" strokeWidth={2.5} glow className="absolute inset-x-6 bottom-6 top-10" />
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11.5px] font-bold text-navy-deep backdrop-blur">
          {post.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-3 text-[12.5px] text-ink-muted">
          <span>{formatDate(post.published_at)}</span>
          <span className="h-1 w-1 rounded-full bg-slate-400" />
          <span className="inline-flex items-center gap-1">
            <Clock className="h-3 w-3" aria-hidden="true" />
            {readingTime(post.content)} min read
          </span>
        </p>
        <h3 className="mt-3 text-[18px] font-bold leading-snug text-navy-deep transition-colors group-hover:text-brand">
          {post.title}
        </h3>
        <p className="mt-2.5 line-clamp-3 flex-1 text-[14px] leading-[1.7] text-ink-muted">{post.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-brand">
          Read article
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
