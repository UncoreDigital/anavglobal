"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  Check,
  ChevronDown,
  Download,
  Globe2,
  Loader2,
  Mail,
  Phone,
  Search,
  Trash2,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import StatusPill, { LEAD_STATUSES } from "@/components/admin/StatusPill";
import Flag from "@/components/Flag";
import { createClient } from "@/lib/supabase/client";
import type { Lead, LeadStatus } from "@/lib/supabase/types";
import { cn, formatDate } from "@/lib/utils";

/**
 * Lead inbox.
 *
 * Rows expand in place rather than opening a detail route: the message and the
 * notes are the only fields that need room, and a page per lead would mean a
 * round trip to read two sentences and set a status.
 *
 * Status changes are optimistic and roll back on failure — the admin is
 * triaging a list, and a spinner per row would make that unusable. Notes are
 * private to the admin (anon has no SELECT on leads at all) and save on demand.
 */
export default function LeadsTable({ initialLeads, initialFilter }: { initialLeads: Lead[]; initialFilter?: string }) {
  const [leads, setLeads] = useState(initialLeads);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<LeadStatus | "all">(
    LEAD_STATUSES.includes(initialFilter as LeadStatus) ? (initialFilter as LeadStatus) : "all"
  );
  const [site, setSite] = useState<"all" | "us" | "uk">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [savedNote, setSavedNote] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((lead) => {
      if (filter !== "all" && lead.status !== filter) return false;
      if (site !== "all" && regionOf(lead) !== site) return false;
      if (!q) return true;
      return [lead.name, lead.email, lead.company, lead.message, lead.country, lead.notes]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q));
    });
  }, [leads, query, filter, site]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: leads.length };
    for (const status of LEAD_STATUSES) map[status] = leads.filter((l) => l.status === status).length;
    return map;
  }, [leads]);

  async function update(id: string, patch: Partial<Lead>) {
    const previous = leads;
    setLeads((current) => current.map((l) => (l.id === id ? { ...l, ...patch } : l)));
    setBusy(id);
    const { error } = await createClient().from("leads").update(patch).eq("id", id);
    setBusy(null);
    if (error) {
      setLeads(previous);
      alert("Could not update that lead. Please try again.");
      return false;
    }
    return true;
  }

  async function saveNote(id: string) {
    const note = (drafts[id] ?? "").trim();
    if (await update(id, { notes: note || null })) {
      setSavedNote(id);
      setTimeout(() => setSavedNote((current) => (current === id ? null : current)), 2000);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this lead permanently? This cannot be undone.")) return;
    const previous = leads;
    setLeads((current) => current.filter((l) => l.id !== id));
    setBusy(id);
    const { error } = await createClient().from("leads").delete().eq("id", id);
    setBusy(null);
    if (error) {
      setLeads(previous);
      alert("Could not delete that lead. Please try again.");
    }
  }

  /**
   * CSV of what is currently filtered, not the whole table — the admin has just
   * narrowed to what they want. Every field is quoted and internal quotes
   * doubled, so a message with a comma or line break cannot shift columns.
   */
  function exportCsv() {
    const headers = ["Date", "Site", "Name", "Email", "Phone", "Company", "Country", "Enquirer", "Services", "Message", "Status", "Notes", "Source page"];
    const escape = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const rows = filtered.map((l) =>
      [
        formatDate(l.created_at),
        regionOf(l).toUpperCase(),
        l.name,
        l.email,
        l.phone,
        l.company,
        l.country,
        l.enquirer_type,
        (l.services ?? []).join("; "),
        l.message,
        l.status,
        l.notes,
        l.source_page,
      ]
        .map(escape)
        .join(",")
    );
    const blob = new Blob(["﻿" + [headers.map(escape).join(","), ...rows].join("\r\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `anav-global-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, company, message…"
            aria-label="Search leads"
            className="h-11 w-full rounded-xl border border-input bg-white pl-10 pr-4 text-[14px] transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>
        <button
          type="button"
          onClick={exportCsv}
          disabled={filtered.length === 0}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl border border-border bg-white px-4 text-[13.5px] font-semibold text-navy-deep transition-colors hover:border-brand hover:text-brand disabled:opacity-50"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Export CSV ({filtered.length})
        </button>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {/* Which country site the enquiry came from (USA / UK switcher). */}
        <div className="mr-2 flex rounded-full border border-border bg-white p-0.5" role="group" aria-label="Filter by site">
          {(["all", "us", "uk"] as const).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setSite(r)}
              aria-pressed={site === r}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3 py-1 text-[12.5px] font-semibold transition-colors",
                site === r ? "bg-navy-deep text-white" : "text-ink-muted hover:text-navy-deep"
              )}
            >
              {r !== "all" && <Flag region={r} className="h-2.5 w-4" />}
              {r === "all" ? "All sites" : r === "us" ? "USA" : "UK"}
            </button>
          ))}
        </div>
        {(["all", ...LEAD_STATUSES] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            aria-pressed={filter === status}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold capitalize transition-colors",
              filter === status
                ? "border-navy-deep bg-navy-deep text-white"
                : "border-border bg-white text-ink-muted hover:border-brand/40 hover:text-navy-deep"
            )}
          >
            {status} <span className="ml-1 opacity-60">{counts[status] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-white">
        {filtered.length === 0 ? (
          <p className="p-12 text-center text-[14px] text-ink-muted">
            {leads.length === 0
              ? "No enquiries yet. They will appear here as soon as the contact form is used."
              : "Nothing matches that filter."}
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((lead) => {
              const isOpen = expanded === lead.id;
              const draft = drafts[lead.id] ?? lead.notes ?? "";
              return (
                <li key={lead.id} className={cn(busy === lead.id && "opacity-60", lead.status === "new" && "bg-accent/[0.03]")}>
                  <div className="flex flex-wrap items-start gap-4 px-5 py-4 sm:px-6">
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : lead.id)}
                      aria-expanded={isOpen}
                      className="flex min-w-[10rem] flex-1 items-start gap-3 text-left"
                    >
                      <ChevronDown
                        className={cn("mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform", isOpen && "rotate-180")}
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="flex items-center gap-2 truncate text-[14.5px] font-semibold text-navy-deep">
                          {lead.status === "new" && <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-label="New" />}
                          <span className="truncate">{lead.name}</span>
                          <span
                            className="inline-flex shrink-0 items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 text-[10.5px] font-bold text-slate-600"
                            title={regionOf(lead) === "uk" ? "Enquiry from the UK site" : "Enquiry from the US site"}
                          >
                            <Flag region={regionOf(lead)} className="h-2 w-3" />
                            {regionOf(lead) === "uk" ? "UK" : "US"}
                          </span>
                        </p>
                        <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-ink-muted [overflow-wrap:anywhere]">
                          <span className="inline-flex min-w-0 items-center gap-1.5 break-all">
                            <Mail className="h-3 w-3 shrink-0" aria-hidden="true" />
                            {lead.email}
                          </span>
                          {lead.company && (
                            <span className="inline-flex min-w-0 items-center gap-1.5 [overflow-wrap:anywhere]">
                              <Building2 className="h-3 w-3 shrink-0" aria-hidden="true" />
                              {lead.company}
                            </span>
                          )}
                          {lead.country && (
                            <span className="inline-flex items-center gap-1.5">
                              <Globe2 className="h-3 w-3" aria-hidden="true" />
                              {lead.country}
                            </span>
                          )}
                        </p>
                      </div>
                    </button>

                    {/* ml-auto + the button's min width: on phones these controls wrap below the name instead of squeezing it */}
                    <div className="ml-auto flex shrink-0 items-center gap-3">
                      <span className="hidden text-[12.5px] text-slate-400 sm:inline">{formatDate(lead.created_at)}</span>
                      <label className="sr-only" htmlFor={`status-${lead.id}`}>
                        Status for {lead.name}
                      </label>
                      <select
                        id={`status-${lead.id}`}
                        value={lead.status}
                        onChange={(e) => update(lead.id, { status: e.target.value as LeadStatus })}
                        className="h-8 rounded-lg border border-border bg-white px-2 text-[12.5px] font-semibold capitalize text-navy-deep focus:border-brand focus:outline-none"
                      >
                        {LEAD_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      {busy === lead.id ? (
                        <Loader2 className="h-4 w-4 animate-spin text-slate-400" aria-hidden="true" />
                      ) : (
                        <button
                          type="button"
                          onClick={() => remove(lead.id)}
                          aria-label={`Delete lead from ${lead.name}`}
                          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="border-t border-border bg-slate-50 px-5 py-5 sm:px-6">
                      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Detail label="Phone" icon={Phone}>
                          {lead.phone ? (
                            <a href={`tel:${lead.phone}`} className="text-brand hover:underline">
                              {lead.phone}
                            </a>
                          ) : (
                            "—"
                          )}
                        </Detail>
                        <Detail label="Enquirer" icon={UserRound}>
                          {lead.enquirer_type || "—"}
                        </Detail>
                        <Detail label="Status">
                          <StatusPill status={lead.status} />
                        </Detail>
                        <Detail label="Source page">{lead.source_page || "—"}</Detail>
                      </dl>

                      {lead.services?.length > 0 && (
                        <div className="mt-5">
                          <p className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-slate-400">Interested in</p>
                          <ul className="mt-2 flex flex-wrap gap-2">
                            {lead.services.map((service) => (
                              <li key={service} className="rounded-full bg-white px-3 py-1 text-[12px] text-navy-deep ring-1 ring-inset ring-border">
                                {service}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {lead.message && (
                        <div className="mt-5">
                          <p className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-slate-400">Message</p>
                          <p className="mt-2 whitespace-pre-wrap rounded-xl bg-white p-4 text-[13.5px] leading-relaxed text-ink-muted ring-1 ring-inset ring-border">
                            {lead.message}
                          </p>
                        </div>
                      )}

                      <div className="mt-5">
                        <label htmlFor={`notes-${lead.id}`} className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
                          Internal notes
                        </label>
                        <textarea
                          id={`notes-${lead.id}`}
                          value={draft}
                          onChange={(e) => setDrafts((d) => ({ ...d, [lead.id]: e.target.value }))}
                          rows={3}
                          placeholder="Call outcome, next step, who owns it… (never shown publicly)"
                          className="mt-2 w-full rounded-xl border border-input bg-white px-4 py-3 text-[13.5px] focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                        />
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <a
                          href={`mailto:${lead.email}?subject=${encodeURIComponent("Re: your enquiry to ANAV Global")}`}
                          className="inline-flex h-10 items-center gap-2 rounded-xl bg-navy-deep px-4 text-[13.5px] font-semibold text-white transition-colors hover:bg-navy"
                        >
                          <Mail className="h-4 w-4" aria-hidden="true" />
                          Reply by email
                        </a>
                        <button
                          type="button"
                          onClick={() => saveNote(lead.id)}
                          disabled={draft === (lead.notes ?? "")}
                          className="inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-white px-4 text-[13.5px] font-semibold text-navy-deep transition-colors hover:border-brand hover:text-brand disabled:opacity-50"
                        >
                          {savedNote === lead.id ? <Check className="h-4 w-4 text-emerald" aria-hidden="true" /> : null}
                          {savedNote === lead.id ? "Notes saved" : "Save notes"}
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

/**
 * The site an enquiry came from. Leads saved before supabase/migrations/
 * 0004_regions.sql have no `region`, so fall back to the page it was sent from.
 */
function regionOf(lead: Lead): "us" | "uk" {
  if (lead.region === "uk" || lead.region === "us") return lead.region;
  return lead.source_page?.startsWith("/uk") ? "uk" : "us";
}

function Detail({ label, icon: Icon, children }: { label: string; icon?: LucideIcon; children: React.ReactNode }) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
        {Icon && <Icon className="h-3 w-3" aria-hidden />}
        {label}
      </dt>
      <dd className="mt-1.5 break-words text-[13.5px] text-navy-deep">{children}</dd>
    </div>
  );
}
