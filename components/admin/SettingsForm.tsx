"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { revalidatePublic } from "@/lib/admin";
import { createClient } from "@/lib/supabase/client";
import type { SiteSetting } from "@/lib/supabase/types";

/**
 * Site settings editor.
 *
 * Values are stored and sent as text, never coerced to numbers. The client
 * writes "500+" and "50K+"; parsing those would lose the suffix, and an empty
 * box would become 0 — which is how a site ends up advertising "0+ clients".
 *
 * An emptied box is saved as an empty string, which means "deliberately
 * blank": a figure renders as an em dash, a second phone number or a social
 * link disappears. (The email address and office hours fall back to the
 * published values instead — a blank email would leave nowhere to write to.)
 *
 * Writes only the rows that changed, so an accidental Save does not bump
 * updated_at on every row.
 */

const GROUPS: Record<string, { title: string; help: string; order: number }> = {
  stats: {
    title: "Headline figures",
    help: "Shown in the homepage hero, the figures band on the homepage, /services and /about. Type them exactly as they should read — “500+”, “50K+”, “99%”. Leave one empty and the site shows an em dash rather than a zero.",
    order: 1,
  },
  contact: {
    title: "Contact details",
    help: "Used in the top bar, header, footer, contact page, call-to-action bands and the floating WhatsApp button. Leave a phone or WhatsApp number empty to hide it.",
    order: 2,
  },
  social: {
    title: "Social profiles",
    help: "Full https:// links. Only profiles with a link are shown in the footer — leave a field empty to hide its icon.",
    order: 3,
  },
  booking: {
    title: "Online booking",
    help: "An https:// scheduling link (Calendly, Cal.com, HubSpot…). When set, the contact page shows a “Book a call” card.",
    order: 4,
  },
};

export default function SettingsForm({ settings }: { settings: SiteSetting[] }) {
  const router = useRouter();
  const initial = Object.fromEntries(settings.map((s) => [s.key, s.value ?? ""]));
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [stale, setStale] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dirty = settings.filter((s) => values[s.key] !== initial[s.key]);

  const groups = Object.entries(
    settings.reduce<Record<string, SiteSetting[]>>((acc, setting) => {
      (acc[setting.group_name] ??= []).push(setting);
      return acc;
    }, {})
  ).sort(([a], [b]) => (GROUPS[a]?.order ?? 99) - (GROUPS[b]?.order ?? 99));

  async function save() {
    if (dirty.length === 0) return;

    /* Links must be absolute https — the site silently drops anything else, so say so here. */
    const badLink = dirty.find((s) => {
      const v = values[s.key].trim();
      if (!v || !(s.group_name === "social" || s.group_name === "booking")) return false;
      try {
        return new URL(v).protocol !== "https:";
      } catch {
        return true;
      }
    });
    if (badLink) {
      setState("error");
      setError(`“${badLink.label}” must be a full https:// link, e.g. https://www.linkedin.com/company/…`);
      return;
    }

    setState("saving");
    setError(null);

    const { error: saveError } = await createClient()
      .from("site_settings")
      .upsert(
        dirty.map((setting) => ({ ...setting, value: values[setting.key].trim() })),
        { onConflict: "key" }
      );

    if (saveError) {
      setState("error");
      setError(saveError.message);
      return;
    }

    const fresh = await revalidatePublic("site");
    setState("saved");
    setStale(!fresh);
    router.refresh();
    setTimeout(() => setState("idle"), 2500);
  }

  return (
    <div className="max-w-3xl space-y-8">
      {groups.map(([group, items]) => (
        <section key={group} className="rounded-2xl border border-border bg-white p-6 sm:p-8">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">{GROUPS[group]?.title ?? group}</h2>
          {GROUPS[group] && <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">{GROUPS[group].help}</p>}

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {items.map((setting) => {
              const wide = setting.group_name === "social" || setting.group_name === "booking" || setting.key === "email";
              return (
                <div key={setting.key} className={wide ? "sm:col-span-2" : ""}>
                  <label htmlFor={setting.key} className="label">
                    {setting.label}
                  </label>
                  <input
                    id={setting.key}
                    type={setting.group_name === "social" || setting.group_name === "booking" ? "url" : "text"}
                    value={values[setting.key] ?? ""}
                    onChange={(e) => setValues((current) => ({ ...current, [setting.key]: e.target.value }))}
                    placeholder={
                      setting.group_name === "stats"
                        ? "Leave empty to show —"
                        : setting.group_name === "contact"
                          ? "Leave empty to hide"
                          : "https://"
                    }
                    className="field h-11"
                  />
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {error && (
        <p role="alert" className="flex items-start gap-2.5 rounded-xl border border-destructive/25 bg-destructive/5 p-4 text-[13.5px] text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      <div className="sticky bottom-0 flex items-center gap-4 border-t border-border bg-slate-50/95 py-4 backdrop-blur">
        <Button onClick={save} variant="navy" size="lg" disabled={dirty.length === 0 || state === "saving"}>
          {state === "saving" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Saving…
            </>
          ) : (
            <>
              <Save className="h-4 w-4" aria-hidden="true" />
              Save {dirty.length > 0 && `(${dirty.length})`}
            </>
          )}
        </Button>

        {state === "saved" && !stale && (
          <p className="flex items-center gap-2 text-[13.5px] font-semibold text-emerald">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Saved and live
          </p>
        )}
        {state === "saved" && stale && (
          <p className="flex items-start gap-2 text-[12.5px] font-medium text-amber-700">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Saved. The live pages could not be refreshed just now — they will update within five minutes.
          </p>
        )}
        {state === "idle" && dirty.length === 0 && <p className="text-[13px] text-slate-400">No unsaved changes.</p>}
      </div>
    </div>
  );
}
