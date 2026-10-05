import HowWeWorkPage, { howWeWorkMetadata } from "@/components/pages/HowWeWorkPage";

export const metadata = howWeWorkMetadata("us");

export default function Page() {
  return <HowWeWorkPage region="us" />;
}
