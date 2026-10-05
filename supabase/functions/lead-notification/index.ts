import nodemailer from "npm:nodemailer@6.9.7";

/**
 * New-lead notification.
 *
 * Fired by a Postgres trigger on INSERT into `public.leads` — see
 * supabase/migrations/0003_lead_notification.sql. The payload is
 * { type, table, schema, record }.
 *
 * ---------------------------------------------------------------------------
 * SECRETS — read from the environment, never committed.
 *
 *   supabase secrets set \
 *     SMTP_HOST=smtp.gmail.com \
 *     SMTP_PORT=465 \
 *     SMTP_USER=<mailbox that sends> \
 *     SMTP_PASS=<app password, not the account password> \
 *     NOTIFICATION_EMAIL=<who receives the alert> \
 *     WEBHOOK_SECRET=<same value stored in Vault>
 *
 * Nothing above belongs in this file. A committed mailbox credential is a
 * mailbox somebody else owns, and this repo is public.
 * ---------------------------------------------------------------------------
 */

const SMTP_HOST = Deno.env.get("SMTP_HOST") ?? "";
const SMTP_PORT = Number(Deno.env.get("SMTP_PORT") ?? "465");
const SMTP_USER = Deno.env.get("SMTP_USER") ?? "";
const SMTP_PASS = Deno.env.get("SMTP_PASS") ?? "";
const NOTIFICATION_EMAIL = Deno.env.get("NOTIFICATION_EMAIL") ?? "";

/**
 * Shared secret with the database trigger.
 *
 * Platform JWT verification is off for this function (see supabase/config.toml),
 * so this header *is* the authentication. Supabase's current key format
 * (`sb_publishable_…` / `sb_secret_…`) is not accepted in an
 * `Authorization: Bearer` header — the gateway rejects the call before the
 * function boots, and the failure leaves no trace in the invocation log. A
 * secret in our own header fails visibly instead.
 */
const WEBHOOK_SECRET = Deno.env.get("WEBHOOK_SECRET") ?? "";

const SITE_NAME = "ANAV Global";

/* Brand colours, from the ANAV mark. Inline because email clients drop <style>. */
const NAVY = "#081530";
const ACCENT = "#03CE7F";
const BLUE = "#2C57E1";
const SURFACE = "#F3FBFA";

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
});

/** Escape anything that came from a public form before it goes into email HTML. */
function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string): string {
  return `<p style="font-size:15px;margin:7px 0;"><strong style="color:${NAVY};">${label}:</strong> ${value}</p>`;
}

function buildLead(r: Record<string, unknown>) {
  const services = Array.isArray(r.services) ? (r.services as string[]) : [];

  const message = r.message
    ? `<div style="margin-top:20px;padding:16px;background:${SURFACE};border-left:3px solid ${ACCENT};">
         <strong style="color:${NAVY};">Message</strong>
         <p style="white-space:pre-wrap;margin:8px 0 0;font-size:15px;">${esc(r.message)}</p>
       </div>`
    : "";

  const inner = `
    ${row("Site", r.region === "uk" || String(r.source_page ?? "").startsWith("/uk") ? "UK (anavglobal.com/uk)" : "US")}
    ${row("Name", esc(r.name))}
    ${row("Email", `<a href="mailto:${esc(r.email)}" style="color:${BLUE};">${esc(r.email)}</a>`)}
    ${r.company ? row("Company", esc(r.company)) : ""}
    ${r.phone ? row("Phone", esc(r.phone)) : ""}
    ${r.country ? row("Country", esc(r.country)) : ""}
    ${r.enquirer_type ? row("Enquirer", esc(r.enquirer_type)) : ""}
    ${services.length ? row("Interested in", esc(services.join(", "))) : ""}
    ${r.source_page ? row("Submitted from", esc(r.source_page)) : ""}
    ${message}
    <p style="font-size:13px;margin-top:22px;color:#667;">Manage this in <strong>Admin → Leads</strong>.</p>`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;color:#333;max-width:640px;margin:0 auto;border:1px solid #dbe3ea;border-radius:10px;overflow:hidden;">
      <div style="background:${NAVY};padding:22px;text-align:center;border-bottom:4px solid ${ACCENT};">
        <h2 style="color:#ffffff;margin:0;font-size:19px;letter-spacing:.3px;">New Enquiry — <span style="color:${ACCENT};">ANAV Global</span></h2>
      </div>
      <div style="padding:26px;background:#ffffff;">${inner}</div>
      <div style="padding:14px;text-align:center;color:#8a97a8;font-size:12px;border-top:1px solid #eef2f6;">
        Received via the ${SITE_NAME} website
      </div>
    </div>`;

  return {
    subject: `New ${r.region === "uk" || String(r.source_page ?? "").startsWith("/uk") ? "UK " : ""}enquiry — ${esc(r.name)}${r.company ? ` (${esc(r.company)})` : ""}`,
    html,
  };
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  /*
    Authenticate before doing anything else. Without this the function is an
    open relay: anyone who learns the URL could post arbitrary JSON and have it
    emailed to the client, from the client's own mailbox.
  */
  if (!WEBHOOK_SECRET || req.headers.get("x-webhook-secret") !== WEBHOOK_SECRET) {
    console.warn("lead-notification: rejected a call with a missing or wrong secret");
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFICATION_EMAIL) {
      throw new Error(
        "Missing secrets. Set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and NOTIFICATION_EMAIL."
      );
    }

    const { table, record } = (await req.json()) as {
      table?: string;
      record?: Record<string, unknown>;
    };

    if (!record) {
      return new Response(JSON.stringify({ error: "No record in payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const built = buildLead(record);

    const info = await transporter.sendMail({
      from: `"${SITE_NAME} Website" <${SMTP_USER}>`,
      to: NOTIFICATION_EMAIL,
      /* So hitting Reply in the inbox answers the prospect, not the mailer. */
      replyTo: typeof record.email === "string" ? record.email : undefined,
      subject: built.subject,
      html: built.html,
    });

    console.log(`[${table ?? "leads"}] notified:`, record.email, info.messageId);

    return new Response(JSON.stringify({ success: true, messageId: info.messageId }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("lead-notification failed:", error);
    /*
      500 so the delivery is retried. The row is already committed by the time
      this runs, so a failed email never costs the lead itself — it only costs
      the alert, and that is worth retrying.
    */
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
