import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import TestimonialsManager from "@/components/admin/TestimonialsManager";
import { features } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";
import type { Testimonial } from "@/lib/supabase/types";

export const metadata: Metadata = { title: "Testimonials" };
export const dynamic = "force-dynamic";

export default async function TestimonialsAdminPage() {
  if (!features.testimonials) notFound();

  const supabase = createClient();
  const { data } = supabase ? await supabase.from("testimonials").select("*").order("sort_order") : { data: [] };

  return (
    <>
      <AdminPageHeader
        title="Testimonials"
        description="Client quotes for the homepage carousel. Only published quotes appear on the website."
      />
      <TestimonialsManager initial={(data ?? []) as Testimonial[]} />
    </>
  );
}
