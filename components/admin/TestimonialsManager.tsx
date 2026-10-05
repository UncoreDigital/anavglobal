"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, AlertTriangle, Eye, EyeOff, Loader2, Pencil, Plus, Star, Trash2 } from "lucide-react";
import Modal from "@/components/admin/Modal";
import { Button } from "@/components/ui/Button";
import { revalidatePublic } from "@/lib/admin";
import { createClient } from "@/lib/supabase/client";
import type { Testimonial } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

type Draft = {
  id?: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  published: boolean;
};

const EMPTY: Draft = { quote: "", name: "", role: "", company: "", rating: 5, published: false };

const PUBLISH_CHECK =
  "Before publishing: is this a real client, quoted accurately, who has agreed to appear on the website?\n\nPublishing an invented or unapproved review can breach consumer-protection rules.";

/**
 * Testimonials editor.
 *
 * The testimonials section on the website renders only published rows and
 * disappears entirely when there are none. Publishing asks for an explicit
 * confirmation every time — see lib/testimonials.ts for why the five quotes
 * carried over from the old site start hidden.
 */
export default function TestimonialsManager({ initial }: { initial: Testimonial[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sorted = [...items].sort((a, b) => a.sort_order - b.sort_order || a.created_at.localeCompare(b.created_at));
  const publishedCount = items.filter((t) => t.published).length;

  async function save() {
    if (!draft) return;
    if (draft.quote.trim().length < 10 || draft.name.trim().length < 2) {
      setError("A quote and the client's name are both required.");
      return;
    }
    const wasPublished = draft.id ? items.find((t) => t.id === draft.id)?.published : false;
    if (draft.published && !wasPublished && !confirm(PUBLISH_CHECK)) return;

    setSaving(true);
    setError(null);
    const payload = {
      quote: draft.quote.trim(),
      name: draft.name.trim(),
      role: draft.role.trim() || null,
      company: draft.company.trim() || null,
      rating: Math.min(5, Math.max(0, Math.round(draft.rating))),
      published: draft.published,
    };
    const supabase = createClient();
    const result = draft.id
      ? await supabase.from("testimonials").update(payload).eq("id", draft.id).select().single()
      : await supabase
          .from("testimonials")
          .insert({ ...payload, sort_order: (sorted.at(-1)?.sort_order ?? 0) + 1 })
          .select()
          .single();
    setSaving(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }
    const row = result.data as Testimonial;
    setItems((current) => (draft.id ? current.map((t) => (t.id === row.id ? row : t)) : [...current, row]));
    setDraft(null);
    await revalidatePublic("site");
    router.refresh();
  }

  async function togglePublished(t: Testimonial) {
    if (!t.published && !confirm(PUBLISH_CHECK)) return;
    const previous = items;
    setItems((current) => current.map((x) => (x.id === t.id ? { ...x, published: !t.published } : x)));
    const { error: e } = await createClient().from("testimonials").update({ published: !t.published }).eq("id", t.id);
    if (e) {
      setItems(previous);
      alert("Could not save that change. Please try again.");
      return;
    }
    await revalidatePublic("site");
  }

  async function remove(t: Testimonial) {
    if (!confirm(`Delete the testimonial from ${t.name}? This cannot be undone.`)) return;
    const previous = items;
    setItems((current) => current.filter((x) => x.id !== t.id));
    const { error: e } = await createClient().from("testimonials").delete().eq("id", t.id);
    if (e) {
      setItems(previous);
      alert("Could not delete. Please try again.");
      return;
    }
    await revalidatePublic("site");
  }

  return (
    <>
      <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-amber-300 bg-amber-50 p-5 sm:flex-row sm:items-start">
        <AlertTriangle className="h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
        <div className="text-[13.5px] leading-relaxed text-amber-900">
          <p className="font-semibold">Only publish quotes from real clients who have agreed to be quoted.</p>
          <p className="mt-1">
            The quotes imported from the previous website are hidden until confirmed — they were shown with stock photos
            and we could not verify them. Publish each one once you have confirmed it, edit it, or replace it.
          </p>
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="text-[13.5px] text-ink-muted">
          {publishedCount === 0
            ? "Nothing is published, so the testimonials section is hidden on the website."
            : `${publishedCount} published · shown as a carousel on the homepage.`}
        </p>
        <Button variant="navy" onClick={() => (setError(null), setDraft({ ...EMPTY }))}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add testimonial
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-white">
        {sorted.length === 0 ? (
          <p className="p-12 text-center text-[14px] text-ink-muted">No testimonials yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {sorted.map((t) => (
              <li key={t.id} className={cn("flex items-start gap-4 px-5 py-4 sm:px-6", !t.published && "bg-slate-50")}>
                <div className="min-w-0 flex-1">
                  <p className={cn("line-clamp-2 text-[14px] leading-relaxed", t.published ? "text-navy-deep" : "text-slate-500")}>
                    “{t.quote}”
                  </p>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-ink-muted">
                    <span className="font-semibold text-navy-deep">{t.name}</span>
                    {[t.role, t.company].filter(Boolean).join(", ")}
                    {t.rating > 0 && (
                      <span className="inline-flex items-center gap-0.5 text-accent-dark">
                        <Star className="h-3 w-3 fill-current" aria-hidden="true" />
                        {t.rating}
                      </span>
                    )}
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 text-[10.5px] font-bold uppercase",
                        t.published ? "bg-accent/15 text-emerald" : "bg-slate-200 text-slate-600"
                      )}
                    >
                      {t.published ? "Published" : "Hidden"}
                    </span>
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => togglePublished(t)}
                    title={t.published ? "Hide" : "Publish"}
                    aria-label={t.published ? `Hide testimonial from ${t.name}` : `Publish testimonial from ${t.name}`}
                    className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-navy-deep"
                  >
                    {t.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setError(null);
                      setDraft({
                        id: t.id,
                        quote: t.quote,
                        name: t.name,
                        role: t.role ?? "",
                        company: t.company ?? "",
                        rating: t.rating,
                        published: t.published,
                      });
                    }}
                    aria-label={`Edit testimonial from ${t.name}`}
                    className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-navy-deep"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(t)}
                    aria-label={`Delete testimonial from ${t.name}`}
                    className="rounded-md p-2 text-slate-400 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {draft && (
        <Modal
          title={draft.id ? "Edit testimonial" : "Add testimonial"}
          onClose={() => setDraft(null)}
          footer={
            <>
              <Button variant="ghost" onClick={() => setDraft(null)}>
                Cancel
              </Button>
              <Button variant="navy" onClick={save} disabled={saving}>
                {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                Save
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="quote" className="label">
                Quote
              </label>
              <textarea
                id="quote"
                value={draft.quote}
                onChange={(e) => setDraft({ ...draft, quote: e.target.value })}
                rows={5}
                maxLength={800}
                className="w-full rounded-lg border border-input bg-white px-3 py-2 text-[14px] leading-relaxed focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {(
                [
                  ["name", "Client name"],
                  ["role", "Role (optional)"],
                  ["company", "Company (optional)"],
                ] as const
              ).map(([key, label]) => (
                <div key={key}>
                  <label htmlFor={key} className="label">
                    {label}
                  </label>
                  <input
                    id={key}
                    value={draft[key]}
                    onChange={(e) => setDraft({ ...draft, [key]: e.target.value })}
                    className="field-sm"
                  />
                </div>
              ))}
            </div>
            <div>
              <span className="label">Star rating</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setDraft({ ...draft, rating: draft.rating === n ? 0 : n })}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    className="rounded p-1"
                  >
                    <Star className={cn("h-5 w-5", n <= draft.rating ? "fill-accent text-accent" : "text-slate-300")} />
                  </button>
                ))}
                <span className="ml-2 text-[12.5px] text-slate-400">Click the active star again to show no rating</span>
              </div>
            </div>
            <label className="flex items-center gap-2.5 text-[13.5px] text-navy-deep">
              <input
                type="checkbox"
                checked={draft.published}
                onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
                className="h-4 w-4 rounded border-input text-brand focus:ring-brand"
              />
              Publish on the website
            </label>
          </div>
          {error && (
            <p role="alert" className="mt-5 flex items-start gap-2 rounded-lg border border-destructive/25 bg-destructive/5 p-3 text-[13px] text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {error}
            </p>
          )}
        </Modal>
      )}
    </>
  );
}
