"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowDown, ArrowUp, Eye, EyeOff, ImagePlus, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import Modal from "@/components/admin/Modal";
import { Button } from "@/components/ui/Button";
import { revalidatePublic, uploadImage } from "@/lib/admin";
import { createClient } from "@/lib/supabase/client";
import type { TeamMember, TeamTier } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

type Draft = {
  id?: string;
  name: string;
  role: string;
  bio: string;
  photo_url: string;
  credentials: string;
  tier: TeamTier;
  linkedin_url: string;
  published: boolean;
};

const EMPTY: Draft = {
  name: "",
  role: "",
  bio: "",
  photo_url: "",
  credentials: "",
  tier: "management",
  linkedin_url: "",
  published: true,
};

const TIERS: { value: TeamTier; label: string; help: string }[] = [
  { value: "leadership", label: "Leadership", help: "Large cards, shown on the homepage, /about and /team" },
  { value: "management", label: "Management", help: "Smaller cards, shown on /team" },
];

/**
 * Team editor.
 *
 * Order is explicit (`sort_order`) and changed with the arrows, not by drag:
 * dragging is fiddly on a laptop trackpad and impossible to do accessibly in a
 * few lines. Hiding someone keeps their row — useful for a person on leave —
 * while deleting removes it.
 */
export default function TeamManager({ initial }: { initial: TeamMember[] }) {
  const router = useRouter();
  const [members, setMembers] = useState(initial);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const sorted = [...members].sort((a, b) => a.sort_order - b.sort_order || a.name.localeCompare(b.name));

  function edit(member?: TeamMember) {
    setError(null);
    setDraft(
      member
        ? {
            id: member.id,
            name: member.name,
            role: member.role,
            bio: member.bio,
            photo_url: member.photo_url ?? "",
            credentials: member.credentials.join(", "),
            tier: member.tier,
            linkedin_url: member.linkedin_url ?? "",
            published: member.published,
          }
        : { ...EMPTY }
    );
  }

  async function onPhoto(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !draft) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadImage(file, "team");
      setDraft((d) => (d ? { ...d, photo_url: url } : d));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed.");
    }
    setUploading(false);
  }

  async function save() {
    if (!draft) return;
    if (draft.name.trim().length < 2 || draft.role.trim().length < 2) {
      setError("Name and role are both required.");
      return;
    }
    if (draft.linkedin_url.trim() && !/^https:\/\/.+/i.test(draft.linkedin_url.trim())) {
      setError("The LinkedIn link must start with https://");
      return;
    }

    setSaving(true);
    setError(null);
    const payload = {
      name: draft.name.trim(),
      role: draft.role.trim(),
      bio: draft.bio.trim(),
      photo_url: draft.photo_url.trim() || null,
      credentials: draft.credentials
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean)
        .slice(0, 6),
      tier: draft.tier,
      linkedin_url: draft.linkedin_url.trim() || null,
      published: draft.published,
    };

    const supabase = createClient();
    const result = draft.id
      ? await supabase.from("team_members").update(payload).eq("id", draft.id).select().single()
      : await supabase
          .from("team_members")
          .insert({ ...payload, sort_order: (sorted.at(-1)?.sort_order ?? 0) + 1 })
          .select()
          .single();

    setSaving(false);
    if (result.error) {
      setError(result.error.message);
      return;
    }

    const row = result.data as TeamMember;
    setMembers((current) => (draft.id ? current.map((m) => (m.id === row.id ? row : m)) : [...current, row]));
    setDraft(null);
    await revalidatePublic("site");
    router.refresh();
  }

  async function patch(member: TeamMember, changes: Partial<TeamMember>) {
    const previous = members;
    setMembers((current) => current.map((m) => (m.id === member.id ? { ...m, ...changes } : m)));
    setBusy(member.id);
    const { error: e } = await createClient().from("team_members").update(changes).eq("id", member.id);
    setBusy(null);
    if (e) {
      setMembers(previous);
      alert("Could not save that change. Please try again.");
      return;
    }
    await revalidatePublic("site");
  }

  /** Swap sort_order with the neighbour. Two writes; the UI updates first and rolls back on failure. */
  async function move(member: TeamMember, direction: -1 | 1) {
    const index = sorted.findIndex((m) => m.id === member.id);
    const other = sorted[index + direction];
    if (!other) return;

    const previous = members;
    const a = member.sort_order === other.sort_order ? other.sort_order + direction : other.sort_order;
    const b = member.sort_order;
    setMembers((current) =>
      current.map((m) => (m.id === member.id ? { ...m, sort_order: a } : m.id === other.id ? { ...m, sort_order: b } : m))
    );
    setBusy(member.id);
    const supabase = createClient();
    const [r1, r2] = await Promise.all([
      supabase.from("team_members").update({ sort_order: a }).eq("id", member.id),
      supabase.from("team_members").update({ sort_order: b }).eq("id", other.id),
    ]);
    setBusy(null);
    if (r1.error || r2.error) {
      setMembers(previous);
      alert("Could not reorder. Please try again.");
      return;
    }
    await revalidatePublic("site");
  }

  async function remove(member: TeamMember) {
    if (!confirm(`Remove ${member.name} from the team permanently? To hide them temporarily, use the eye icon instead.`)) return;
    const previous = members;
    setMembers((current) => current.filter((m) => m.id !== member.id));
    const { error: e } = await createClient().from("team_members").delete().eq("id", member.id);
    if (e) {
      setMembers(previous);
      alert("Could not delete. Please try again.");
      return;
    }
    await revalidatePublic("site");
  }

  return (
    <>
      <div className="mb-5 flex justify-end">
        <Button variant="navy" onClick={() => edit()}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add team member
        </Button>
      </div>

      {TIERS.map((tier) => {
        const list = sorted.filter((m) => m.tier === tier.value);
        return (
          <section key={tier.value} className="mb-8">
            <div className="mb-3 flex items-baseline gap-3">
              <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">{tier.label}</h2>
              <p className="text-[12.5px] text-slate-400">{tier.help}</p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-white">
              {list.length === 0 ? (
                <p className="p-8 text-center text-[13.5px] text-ink-muted">Nobody in this group yet.</p>
              ) : (
                <ul className="divide-y divide-border">
                  {list.map((m, i) => (
                    <li key={m.id} className={cn("flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3 sm:px-5", busy === m.id && "opacity-60", !m.published && "bg-slate-50")}>
                      <div className="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        {m.photo_url && <Image src={m.photo_url} alt="" fill sizes="48px" className="object-cover object-top" unoptimized />}
                      </div>
                      {/* min width so that on phones the actions wrap below instead of squeezing the name to three letters */}
                      <div className="min-w-[8.5rem] flex-1">
                        <p className={cn("truncate text-[14.5px] font-semibold", m.published ? "text-navy-deep" : "text-slate-400")}>
                          {m.name}
                          {!m.published && (
                            <span className="ml-2 rounded bg-slate-200 px-1.5 py-0.5 text-[10.5px] font-bold uppercase text-slate-600">Hidden</span>
                          )}
                        </p>
                        <p className="truncate text-[12.5px] text-ink-muted">{m.role}</p>
                      </div>
                      <div className="ml-auto flex shrink-0 items-center gap-0.5">
                        <IconButton label="Move up" disabled={i === 0} onClick={() => move(m, -1)} icon={ArrowUp} />
                        <IconButton label="Move down" disabled={i === list.length - 1} onClick={() => move(m, 1)} icon={ArrowDown} />
                        <IconButton
                          label={m.published ? `Hide ${m.name}` : `Show ${m.name}`}
                          onClick={() => patch(m, { published: !m.published })}
                          icon={m.published ? Eye : EyeOff}
                        />
                        <IconButton label={`Edit ${m.name}`} onClick={() => edit(m)} icon={Pencil} />
                        <IconButton label={`Delete ${m.name}`} onClick={() => remove(m)} icon={Trash2} danger />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        );
      })}

      {draft && (
        <Modal
          title={draft.id ? `Edit ${draft.name || "team member"}` : "Add team member"}
          onClose={() => setDraft(null)}
          footer={
            <>
              <Button variant="ghost" onClick={() => setDraft(null)}>
                Cancel
              </Button>
              <Button variant="navy" onClick={save} disabled={saving || uploading}>
                {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                Save
              </Button>
            </>
          }
        >
          <div className="grid gap-6 sm:grid-cols-[9rem_1fr]">
            <div>
              <span className="label">Photo</span>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-border bg-slate-50">
                {draft.photo_url ? (
                  <>
                    <Image src={draft.photo_url} alt="" fill sizes="144px" className="object-cover object-top" unoptimized />
                    <button
                      type="button"
                      onClick={() => setDraft({ ...draft, photo_url: "" })}
                      aria-label="Remove photo"
                      className="absolute right-1.5 top-1.5 rounded-md bg-navy-deep/80 p-1 text-white hover:bg-destructive"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </>
                ) : (
                  <span className="flex h-full items-center justify-center text-slate-400">
                    <ImagePlus className="h-6 w-6" aria-hidden="true" />
                  </span>
                )}
              </div>
              <label className="mt-2 flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-white text-[12.5px] font-semibold text-navy-deep hover:border-brand hover:text-brand">
                {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />}
                {uploading ? "Uploading…" : "Upload"}
                <input type="file" accept="image/*" onChange={onPhoto} className="sr-only" />
              </label>
              <p className="mt-2 text-[11.5px] leading-snug text-slate-400">Portrait, 4:5, at least 720×900. Face in the top third.</p>
            </div>

            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
                <Field label="Role" value={draft.role} onChange={(v) => setDraft({ ...draft, role: v })} />
              </div>
              <div>
                <label htmlFor="tier" className="label">
                  Group
                </label>
                <select
                  id="tier"
                  value={draft.tier}
                  onChange={(e) => setDraft({ ...draft, tier: e.target.value as TeamTier })}
                  className="field-sm"
                >
                  {TIERS.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="bio" className="label">
                  Bio
                </label>
                <textarea
                  id="bio"
                  value={draft.bio}
                  onChange={(e) => setDraft({ ...draft, bio: e.target.value })}
                  rows={4}
                  maxLength={600}
                  className="w-full rounded-lg border border-input bg-white px-3 py-2 text-[13.5px] focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15"
                />
              </div>
              <Field
                label="Credentials (comma-separated, up to 6)"
                value={draft.credentials}
                onChange={(v) => setDraft({ ...draft, credentials: v })}
                placeholder="CA, Tax Expert"
              />
              <Field
                label="LinkedIn profile (optional)"
                value={draft.linkedin_url}
                onChange={(v) => setDraft({ ...draft, linkedin_url: v })}
                placeholder="https://www.linkedin.com/in/…"
              />
              <label className="flex items-center gap-2.5 text-[13.5px] text-navy-deep">
                <input
                  type="checkbox"
                  checked={draft.published}
                  onChange={(e) => setDraft({ ...draft, published: e.target.checked })}
                  className="h-4 w-4 rounded border-input text-brand focus:ring-brand"
                />
                Show on the website
              </label>
            </div>
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

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const id = label.toLowerCase().replace(/[^a-z]+/g, "-");
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <input id={id} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="field-sm" />
    </div>
  );
}

function IconButton({
  label,
  onClick,
  icon: Icon,
  disabled,
  danger,
}: {
  label: string;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string }>;
  disabled?: boolean;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      aria-label={label}
      className={cn(
        "rounded-md p-2 text-slate-400 transition-colors disabled:opacity-30",
        danger ? "hover:bg-destructive/10 hover:text-destructive" : "hover:bg-slate-100 hover:text-navy-deep"
      )}
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
