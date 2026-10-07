import IndustryDetailPage, { industryMetadata, industrySlugsFor } from "@/components/pages/IndustryDetailPage";

/* Only this site's industries exist here; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return industrySlugsFor("uk");
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return industryMetadata("uk", params.slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  return <IndustryDetailPage region="uk" slug={params.slug} />;
}
