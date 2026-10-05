import ServiceDetailPage, { serviceMetadata, serviceSlugsFor } from "@/components/pages/ServiceDetailPage";

/* Only this site's services exist here; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugsFor("us");
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return serviceMetadata("us", params.slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ServiceDetailPage region="us" slug={params.slug} />;
}
