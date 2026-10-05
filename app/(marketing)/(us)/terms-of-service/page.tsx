import TermsPage, { termsMetadata } from "@/components/pages/TermsPage";

export const metadata = termsMetadata("us");

export default function Page() {
  return <TermsPage region="us" />;
}
