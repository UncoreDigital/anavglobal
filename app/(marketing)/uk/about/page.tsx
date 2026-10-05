import AboutPage, { aboutMetadata } from "@/components/pages/AboutPage";

export const metadata = aboutMetadata("uk");

export default function Page() {
  return <AboutPage region="uk" />;
}
