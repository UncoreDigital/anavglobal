import HomePage, { homeMetadata } from "@/components/pages/HomePage";

export const metadata = homeMetadata("uk");

export default function Page() {
  return <HomePage region="uk" />;
}
