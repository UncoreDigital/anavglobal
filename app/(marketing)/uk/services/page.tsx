import ServicesPage, { servicesMetadata } from "@/components/pages/ServicesPage";

export const metadata = servicesMetadata("uk");

export default function Page() {
  return <ServicesPage region="uk" />;
}
