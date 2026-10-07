import IndustriesPage, { industriesMetadata } from "@/components/pages/IndustriesPage";

export const metadata = industriesMetadata("uk");

export default function Page() {
  return <IndustriesPage region="uk" />;
}
