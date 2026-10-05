import Link from "next/link";
import { ArrowRight, FileText, Inbox, MessageSquareQuote, Settings, TrendingUp, Users } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatusPill from "@/components/admin/StatusPill";
import { features } from "@/lib/site";
import { createClient } from "@/lib/supabase/server";
import type { Lead } from "@/lib/supabase/types";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = createClient();

  if (!supabase) {
    return (
      <>
        <AdminPageHeader title="Dashboard" />
        <NotConfigured />
      </>
    );
  }

  /* head:true returns the count without the rows — the dashboard needs numbers, not tables. */
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const count = (q: PromiseLike<{ count: number | null }>) => q.then((r) => r.count ?? 0);

  const [totalLeads, newLeads, recentLeads, publishedPosts, draftPosts, teamCount, hiddenTestimonials, latest] =
    await Promise.all([
      count(supabase.from("leads").select("*", { count: "exact", head: true })),
      count(supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new")),
      count(supabase.from("leads").select("*", { count: "exact", head: true }).gte("created_at", sevenDaysAgo)),
      count(supabase.from("posts").select("*", { count: "exact", head: true }).eq("status", "published")),
      count(supabase.from("posts").select("*", { count: "exact", head: true }).eq("status", "draft")),
      count(supabase.from("team_members").select("*", { count: "exact", head: true }).eq("published", true)),
      count(supabase.from("testimonials").select("*", { count: "exact", head: true }).eq("published", false)),
      supabase
        .from("leads")
        .select("id, name, email, company, country, status, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
    ]);

  const stats = [
    { label: "Unactioned leads", value: newLeads, icon: Inbox, href: "/admin/leads?status=new", highlight: true },
    { label: "Leads, last 7 days", value: recentLeads, icon: TrendingUp, href: "/admin/leads" },
    { label: "Total leads", value: totalLeads, icon: TrendingUp, href: "/admin/leads" },
    ...(features.insights
      ? [{ label: "Published insights", value: publishedPosts, icon: FileText, href: "/admin/posts" }]
      : [{ label: "Team members shown", value: teamCount, icon: Users, href: "/admin/team" }]),
  ];

  const rows = (latest.data ?? []) as Pick<Lead, "id" | "name" | "email" | "company" | "country" | "status" | "created_at">[];

  const todo = [
    features.insights && draftPosts > 0
      ? {
          icon: FileText,
          text: `${draftPosts} draft ${draftPosts === 1 ? "article is" : "articles are"} waiting to be reviewed and published.`,
          href: "/admin/posts",
          cta: "Review drafts",
        }
      : null,
    features.testimonials && hiddenTestimonials > 0
      ? {
          icon: MessageSquareQuote,
          text: `${hiddenTestimonials} ${hiddenTestimonials === 1 ? "testimonial is" : "testimonials are"} hidden until confirmed as real, approved quotes.`,
          href: "/admin/testimonials",
          cta: "Review testimonials",
        }
      : null,
  ].filter(Boolean) as { icon: typeof FileText; text: string; href: string; cta: string }[];

  return (
    <>
      <AdminPageHeader title="Dashboard" description="Enquiries from the website, and what is waiting on you." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`group rounded-2xl border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-card ${
              "highlight" in stat && stat.highlight && stat.value > 0 ? "border-accent/60 bg-accent/[0.05]" : "border-border"
            }`}
          >
            <div className="flex items-start justify-between">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  "highlight" in stat && stat.highlight && stat.value > 0 ? "bg-accent/20 text-emerald" : "bg-brand/10 text-brand"
                }`}
              >
                <stat.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <ArrowRight
                className="h-4 w-4 text-slate-400 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                aria-hidden="true"
              />
            </div>
            <p className="mt-5 font-display text-3xl font-extrabold text-navy-deep">{stat.value}</p>
            <p className="mt-1 text-[13px] text-ink-muted">{stat.label}</p>
          </Link>
        ))}
      </div>

      {todo.length > 0 && (
        <div className="mt-6 space-y-3">
          {todo.map((t) => (
            <p key={t.href} className="flex flex-wrap items-center gap-2.5 rounded-2xl border border-border bg-white p-5 text-[13.5px] text-ink-muted">
              <t.icon className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
              {t.text}
              <Link href={t.href} className="font-semibold text-brand hover:text-brand-dark">
                {t.cta} →
              </Link>
            </p>
          ))}
        </div>
      )}

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-deep">Latest enquiries</h2>
          <Link href="/admin/leads" className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand hover:text-brand-dark">
            View all
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-white">
          {rows.length === 0 ? (
            <p className="p-10 text-center text-[14px] text-ink-muted">
              No enquiries yet. They will appear here as soon as the contact form is used.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {rows.map((lead) => (
                <li key={lead.id}>
                  <Link
                    href="/admin/leads"
                    className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 transition-colors hover:bg-slate-50"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[14.5px] font-semibold text-navy-deep">
                        {lead.name}
                        {lead.company && <span className="ml-2 font-normal text-ink-muted">· {lead.company}</span>}
                      </p>
                      <p className="mt-0.5 truncate text-[13px] text-ink-muted">
                        {lead.email}
                        {lead.country && ` · ${lead.country}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <StatusPill status={lead.status} />
                      <span className="text-[12.5px] text-slate-400">{formatDate(lead.created_at)}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

function NotConfigured() {
  return (
    <div className="rounded-2xl border border-accent/50 bg-accent/5 p-8">
      <h2 className="flex items-center gap-2.5 text-[15px] font-bold text-navy-deep">
        <Settings className="h-4 w-4 text-emerald" aria-hidden="true" />
        Supabase is not configured
      </h2>
      <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-ink-muted [overflow-wrap:anywhere]">
        Copy <code className="rounded bg-white px-1.5 py-0.5">.env.example</code> to{" "}
        <code className="rounded bg-white px-1.5 py-0.5">.env.local</code>, fill in the project URL and anon key, then run the
        migrations in <code className="rounded bg-white px-1.5 py-0.5">supabase/migrations</code> from the Supabase SQL editor.
      </p>
    </div>
  );
}
