import FaqsPage, { faqsMetadata } from "@/components/pages/FaqsPage";

export const metadata = faqsMetadata("uk");

export default function Page() {
  return <FaqsPage region="uk" />;
}
