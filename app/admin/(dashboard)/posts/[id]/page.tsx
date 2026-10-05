import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PostEditor from "@/components/admin/PostEditor";
import { createClient } from "@/lib/supabase/server";
import { features } from "@/lib/site";
import type { Post } from "@/lib/supabase/types";

export const metadata: Metadata = { title: "Edit post" };
export const dynamic = "force-dynamic";

/**
 * Editor route. "new" is handled here rather than as its own /posts/new page:
 * the two screens are identical apart from whether a row exists yet, and the
 * editor already branches on `post === null`.
 */
export default async function PostEditorPage({ params }: { params: { id: string } }) {
  if (!features.insights) notFound();

  if (params.id === "new") return <PostEditor post={null} />;

  const supabase = createClient();
  if (!supabase) notFound();

  const { data } = await supabase.from("posts").select("*").eq("id", params.id).maybeSingle();
  if (!data) notFound();

  return <PostEditor post={data as Post} />;
}
