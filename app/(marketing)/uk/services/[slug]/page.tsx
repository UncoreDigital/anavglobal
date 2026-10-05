import ServiceDetailPage, { serviceMetadata, serviceSlugsFor } from "@/components/pages/ServiceDetailPage";

/* Only this site's services exist here; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugsFor("uk");
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  return serviceMetadata("uk", params.slug);
}

export default function Page({ params }: { params: { slug: string } }) {
  return <ServiceDetailPage region="uk" slug={params.slug} />;
}
