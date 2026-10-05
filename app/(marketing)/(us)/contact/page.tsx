import ContactPage, { contactMetadata } from "@/components/pages/ContactPage";

export const metadata = contactMetadata("us");

export default function Page() {
  return <ContactPage region="us" />;
}
