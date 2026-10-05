import { ArrowRight } from "lucide-react";
import PostCard from "@/components/PostCard";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { rhref, type Region } from "@/lib/regions";
import type { Post } from "@/lib/supabase/types";

/** "Latest Insights / From Our Blog" (VERBATIM). Hidden when nothing is published. */
export default function Insights({ posts, region }: { posts: Post[]; region: Region }) {
  if (posts.length === 0) return null;

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Latest Insights"
            title="From Our"
            accent="Blog"
            lead="Expert tips and insights on accounting, tax, and business growth"
          />
          <Button href={rhref(region, "/blog")} variant="outline" className="shrink-0">
            All insights
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
        <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <RevealItem key={post.id}>
              <PostCard post={post} region={region} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
