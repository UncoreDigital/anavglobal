import ServicesPage, { servicesMetadata } from "@/components/pages/ServicesPage";

export const metadata = servicesMetadata("us");

export default function Page() {
  return <ServicesPage region="us" />;
}
