import PrivacyPage, { privacyMetadata } from "@/components/pages/PrivacyPage";

export const metadata = privacyMetadata("uk");

export default function Page() {
  return <PrivacyPage region="uk" />;
}
