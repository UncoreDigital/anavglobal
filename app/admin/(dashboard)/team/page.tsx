import type { Metadata } from "next";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import TeamManager from "@/components/admin/TeamManager";
import { createClient } from "@/lib/supabase/server";
import type { TeamMember } from "@/lib/supabase/types";

export const metadata: Metadata = { title: "Team" };
export const dynamic = "force-dynamic";

export default async function TeamAdminPage() {
  const supabase = createClient();
  const { data } = supabase ? await supabase.from("team_members").select("*").order("sort_order") : { data: [] };

  return (
    <>
      <AdminPageHeader
        title="Team"
        description="The people shown on the homepage, /about and /team. Add, edit, reorder or hide someone — changes go live immediately."
      />
      <TeamManager initial={(data ?? []) as TeamMember[]} />
    </>
  );
}
