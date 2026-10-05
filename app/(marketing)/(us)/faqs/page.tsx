import FaqsPage, { faqsMetadata } from "@/components/pages/FaqsPage";

export const metadata = faqsMetadata("us");

export default function Page() {
  return <FaqsPage region="us" />;
}
