import ContactPage, { contactMetadata } from "@/components/pages/ContactPage";

export const metadata = contactMetadata("uk");

export default function Page() {
  return <ContactPage region="uk" />;
}
