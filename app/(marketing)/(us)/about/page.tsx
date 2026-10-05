import AboutPage, { aboutMetadata } from "@/components/pages/AboutPage";

export const metadata = aboutMetadata("us");

export default function Page() {
  return <AboutPage region="us" />;
}
