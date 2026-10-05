import BlogIndexPage, { blogMetadata } from "@/components/pages/BlogIndexPage";

export const metadata = blogMetadata("us");

export default function Page() {
  return <BlogIndexPage region="us" />;
}
