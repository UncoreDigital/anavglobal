import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Plus } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import PostsTable from "@/components/admin/PostsTable";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/server";
import { features } from "@/lib/site";
import type { Post } from "@/lib/supabase/types";

export const metadata: Metadata = { title: "Insights" };
export const dynamic = "force-dynamic";

export default async function PostsPage() {
  if (!features.insights) notFound();

  const supabase = createClient();
  const { data } = supabase
    ? await supabase.from("posts").select("*").order("updated_at", { ascending: false })
    : { data: [] };

  return (
    <>
      <AdminPageHeader
        title="Insights"
        description="Everything on the blog, published and draft. Drafts are never visible on the public site."
        action={
          <Button href="/admin/posts/new" variant="navy">
            <Plus className="h-4 w-4" aria-hidden="true" />
            New post
          </Button>
        }
      />
      <PostsTable posts={(data ?? []) as Post[]} />
    </>
  );
}
