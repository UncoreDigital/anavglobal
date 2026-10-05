import type { Metadata } from "next";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import SettingsForm from "@/components/admin/SettingsForm";
import { createClient } from "@/lib/supabase/server";
import type { SiteSetting } from "@/lib/supabase/types";

export const metadata: Metadata = { title: "Site Settings" };
export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const supabase = createClient();
  const { data } = supabase
    ? await supabase.from("site_settings").select("*").order("group_name").order("sort_order")
    : { data: [] };
  const settings = (data ?? []) as SiteSetting[];

  return (
    <>
      <AdminPageHeader
        title="Site Settings"
        description="The figures, contact details and links the public site reads from. Edit here and the change appears everywhere it is used — no developer needed."
      />
      {settings.length === 0 ? (
        <p className="rounded-2xl border border-accent/50 bg-accent/5 p-6 text-[13.5px] leading-relaxed text-ink-muted [overflow-wrap:anywhere]">
          No settings rows found. Run <code className="rounded bg-white px-1.5 py-0.5">supabase/migrations/0001_init.sql</code>{" "}
          in the Supabase SQL editor to seed them.
        </p>
      ) : (
        <SettingsForm settings={settings} />
      )}
    </>
  );
}
