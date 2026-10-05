import BlogPostPage, { postMetadata, postSlugsFor } from "@/components/pages/BlogPostPage";

export function generateStaticParams() {
  return postSlugsFor("us");
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return postMetadata("us", params.slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  return <BlogPostPage region="us" slug={params.slug} />;
}
