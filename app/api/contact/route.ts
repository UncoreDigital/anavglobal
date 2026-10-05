import { NextResponse } from "next/server";
import { createStaticClient } from "@/lib/supabase/server";
import { contactSchema } from "@/lib/validation";

/**
 * Lead intake.
 *
 * Re-validates with the same schema the form uses — client-side validation is
 * a convenience for the visitor and no kind of guarantee here.
 *
 * Inserts through the anonymous client: the RLS policy on `leads` allows anon
 * INSERT and nothing else, which is exactly the capability this endpoint
 * needs. A signed-in admin testing the form goes through the same path.
 *
 * Notification email is not sent from here. A Postgres trigger fires the
 * lead-notification edge function on insert, so a mail outage can never cost
 * the row, and a lead inserted by anything else still produces an alert.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please check the form and try again." },
      { status: 400 }
    );
  }

  const { website, sourcePage, enquirerType, region, ...lead } = parsed.data;

  /*
    Honeypot hit. Returns 200 so the bot records a success and does not retry
    with the field cleared — a 400 just teaches it what to omit.
  */
  if (website) return NextResponse.json({ ok: true });

  const supabase = createStaticClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "The contact form is not configured yet. Please email us directly." },
      { status: 503 }
    );
  }

  const row = {
    name: lead.name,
    email: lead.email,
    company: lead.company || null,
    phone: lead.phone || null,
    country: lead.country || null,
    enquirer_type: enquirerType || null,
    services: lead.services ?? [],
    message: lead.message || null,
    source_page: sourcePage || null,
  };

  /*
    Tag the lead with the country site it came from (US / UK), as Unison tags
    its submissions. If supabase/migrations/0004_regions.sql has not been run
    yet the column does not exist; retry without it rather than losing the
    enquiry — the source page (/uk/…) still records where it came from.
  */
  let { error } = await supabase.from("leads").insert({ ...row, region });
  if (error && /region/i.test(error.message)) {
    ({ error } = await supabase.from("leads").insert(row));
  }

  if (error) {
    /* Logged for the operator; the visitor gets a generic message, not a database error. */
    console.error("[contact] insert failed:", error.message);
    return NextResponse.json(
      { error: "We could not submit that. Please try again or email us directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
