import type { Metadata } from "next";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import LeadsTable from "@/components/admin/LeadsTable";
import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/lib/supabase/types";

export const metadata: Metadata = { title: "Leads" };
export const dynamic = "force-dynamic";

export default async function LeadsPage({ searchParams }: { searchParams: { status?: string } }) {
  const supabase = createClient();

  /*
    Capped at 500. The table filters and searches client-side, which is what
    makes triage fast — past this point it needs server-side pagination rather
    than a bigger number here.
  */
  const { data } = supabase
    ? await supabase.from("leads").select("*").order("created_at", { ascending: false }).limit(500)
    : { data: [] };

  return (
    <>
      <AdminPageHeader
        title="Leads"
        description="Every enquiry submitted through the website. Set a status and keep notes as you work through them; export the current filter to CSV at any point."
      />
      <LeadsTable initialLeads={(data ?? []) as Lead[]} initialFilter={searchParams.status} />
    </>
  );
}
