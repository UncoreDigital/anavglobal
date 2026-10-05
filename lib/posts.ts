import { createStaticClient } from "@/lib/supabase/server";
import type { Region } from "@/lib/regions";
import type { Post } from "@/lib/supabase/types";

/**
 * Published-content reads for the Insights blog.
 *
 * Every query here filters on the published state explicitly even though RLS
 * already does for anonymous readers. That redundancy is deliberate: an admin
 * session hitting the public route would otherwise be served drafts through
 * their own authenticated policy, and see a page no visitor can see.
 */

const PUBLISHED = "status.eq.published";

/**
 * No "published_at <= now" filter here, on purpose: the anon RLS policy in
 * 0001_init.sql already applies it, with the database's own clock, to the
 * second.
 *
 * Doing it here as well meant putting a timestamp in the query string, the URL
 * Next.js keys its Data Cache on. At full precision every render was a cache
 * miss. Rounded down to the minute, it hid every newly published post for the
 * rest of that minute — exactly when the admin's on-demand revalidation
 * re-renders the blog, so the page was regenerated and cached without the post
 * it had been asked to show. A query with no timestamp keeps a stable cache
 * key and leaves the timing to the policy.
 */
function publishedFilter<T extends { eq: Function; not: Function }>(query: T) {
  return (query as any).eq("status", "published").not("published_at", "is", null);
}

/**
 * Which site a post appears on. Posts carry a `region` of "all", "us" or "uk"
 * (Admin → Insights → "Show on"); a post without one — written before
 * supabase/migrations/0004_regions.sql was run — shows on both.
 *
 * Filtered here rather than in SQL so the blog keeps working on a database
 * that does not have the column yet. The blog is small enough that fetching
 * every published post and filtering is cheaper than a second round trip.
 */
export function visibleIn(post: Pick<Post, "region">, region: Region) {
  return !post.region || post.region === "all" || post.region === region;
}

async function publishedPosts(): Promise<Post[]> {
  const supabase = createStaticClient();
  if (!supabase) return [];
  const { data, error } = await publishedFilter(supabase.from("posts").select("*")).order("published_at", {
    ascending: false,
  });
  if (error || !data) return [];
  return data as Post[];
}

export async function getPosts(limit?: number, region: Region = "us"): Promise<Post[]> {
  const posts = (await publishedPosts()).filter((p) => visibleIn(p, region));
  return limit ? posts.slice(0, limit) : posts;
}

export async function getPost(slug: string, region: Region = "us"): Promise<Post | null> {
  const supabase = createStaticClient();
  if (!supabase) return null;

  const { data, error } = await publishedFilter(supabase.from("posts").select("*").eq("slug", slug)).maybeSingle();
  if (error || !data) return null;
  return visibleIn(data as Post, region) ? (data as Post) : null;
}

export async function getPostSlugs(region: Region = "us"): Promise<string[]> {
  return (await getPosts(undefined, region)).map((p) => p.slug);
}

/** Related posts: same category first, most recent, excluding the current one. */
export async function getRelatedPosts(post: Post, region: Region = "us", limit = 3): Promise<Post[]> {
  const others = (await getPosts(undefined, region)).filter((p) => p.id !== post.id);
  const same = others.filter((p) => p.category === post.category);
  return [...same, ...others.filter((p) => p.category !== post.category)].slice(0, limit);
}

export { PUBLISHED };
