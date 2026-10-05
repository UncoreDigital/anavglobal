import TeamPage, { teamMetadata } from "@/components/pages/TeamPage";

export const metadata = teamMetadata("uk");

export default function Page() {
  return <TeamPage region="uk" />;
}
