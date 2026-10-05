import HowWeWorkPage, { howWeWorkMetadata } from "@/components/pages/HowWeWorkPage";

export const metadata = howWeWorkMetadata("uk");

export default function Page() {
  return <HowWeWorkPage region="uk" />;
}
