import BlogPostPage, { postMetadata, postSlugsFor } from "@/components/pages/BlogPostPage";

export function generateStaticParams() {
  return postSlugsFor("uk");
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return postMetadata("uk", params.slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  return <BlogPostPage region="uk" slug={params.slug} />;
}
