import HomePage, { homeMetadata } from "@/components/pages/HomePage";

export const metadata = homeMetadata("us");

export default function Page() {
  return <HomePage region="us" />;
}
