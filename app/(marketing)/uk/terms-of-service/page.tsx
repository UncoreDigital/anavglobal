import TermsPage, { termsMetadata } from "@/components/pages/TermsPage";

export const metadata = termsMetadata("uk");

export default function Page() {
  return <TermsPage region="uk" />;
}
