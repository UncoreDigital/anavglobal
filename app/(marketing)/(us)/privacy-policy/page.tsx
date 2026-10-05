import PrivacyPage, { privacyMetadata } from "@/components/pages/PrivacyPage";

export const metadata = privacyMetadata("us");

export default function Page() {
  return <PrivacyPage region="us" />;
}
