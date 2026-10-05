import BlogIndexPage, { blogMetadata } from "@/components/pages/BlogIndexPage";

export const metadata = blogMetadata("uk");

export default function Page() {
  return <BlogIndexPage region="uk" />;
}
