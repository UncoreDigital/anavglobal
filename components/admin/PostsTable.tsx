"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLink, Search, Star } from "lucide-react";
import type { Post } from "@/lib/supabase/types";
import { formatDate, readingTime } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function PostsTable({ posts }: { posts: Post[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (filter !== "all" && post.status !== filter) return false;
      if (!q) return true;
      return [post.title, post.excerpt, post.category].some((field) =>
        field.toLowerCase().includes(q)
      );
    });
  }, [posts, query, filter]);

  const counts = {
    all: posts.length,
    published: posts.filter((p) => p.status === "published").length,
    draft: posts.filter((p) => p.status === "draft").length,
  };

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts…"
            aria-label="Search posts"
            className="h-11 w-full rounded-lg border border-input bg-white pl-10 pr-4 text-[14px] transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <div className="flex gap-2">
          {(["all", "published", "draft"] as const).map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setFilter(status)}
              aria-pressed={filter === status}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold capitalize transition-colors",
                filter === status
                  ? "border-navy-deep bg-navy-deep text-white"
                  : "border-border bg-white text-ink-muted hover:border-brand/40 hover:text-navy-deep"
              )}
            >
              {status} <span className="ml-1 opacity-60">{counts[status]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-border bg-white">
        {filtered.length === 0 ? (
          <p className="p-12 text-center text-[14px] text-ink-muted">
            {posts.length === 0
              ? "No posts yet. Write the first one."
              : "Nothing matches that filter."}
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((post) => (
              <li key={post.id}>
                <div className="flex flex-wrap items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50 sm:px-6">
                  <Link href={`/admin/posts/${post.id}`} className="min-w-[10rem] flex-1">
                    <p className="flex items-center gap-2 truncate text-[14.5px] font-semibold text-navy-deep">
                      {post.is_featured && (
                        <Star
                          className="h-3.5 w-3.5 shrink-0 fill-accent text-accent"
                          aria-label="Featured"
                        />
                      )}
                      {post.title}
                    </p>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-ink-muted">
                      <span className="rounded bg-brand/10 px-1.5 py-0.5 font-medium text-brand">
                        {post.category}
                      </span>
                      {post.region && post.region !== "all" && (
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-bold text-slate-600">
                          {post.region === "uk" ? "UK only" : "US only"}
                        </span>
                      )}
                      <span>{readingTime(post.content)} min read</span>
                      <span>
                        {post.published_at
                          ? formatDate(post.published_at)
                          : `Updated ${formatDate(post.updated_at)}`}
                      </span>
                    </p>
                  </Link>

                  <div className="ml-auto flex shrink-0 items-center gap-3">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-1 text-[11.5px] font-semibold capitalize",
                        post.status === "published"
                          ? "bg-emerald/10 text-emerald"
                          : "bg-accent/15 text-accent-dark"
                      )}
                    >
                      {post.status}
                    </span>

                    {post.status === "published" && (
                      <a
                        href={`${post.region === "uk" ? "/uk" : ""}/blog/${post.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${post.title} on the live site`}
                        className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-brand/10 hover:text-brand"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
