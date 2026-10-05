import TeamPage, { teamMetadata } from "@/components/pages/TeamPage";

export const metadata = teamMetadata("us");

export default function Page() {
  return <TeamPage region="us" />;
}
