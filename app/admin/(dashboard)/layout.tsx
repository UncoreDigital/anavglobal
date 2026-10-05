import AdminShell from "@/components/admin/AdminShell";
import { createClient } from "@/lib/supabase/server";

/**
 * Guarded route group. The redirect for an unauthenticated request happens in
 * middleware.ts, before this renders — this layout only reads the session to
 * label the sidebar. Force-dynamic, because a cached admin shell would show one
 * administrator's email (and lead count) to the next.
 */
export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };

  const newLeads =
    supabase && user
      ? ((await supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new")).count ?? 0)
      : 0;

  return (
    <AdminShell email={user?.email ?? null} newLeads={newLeads}>
      {children}
    </AdminShell>
  );
}
