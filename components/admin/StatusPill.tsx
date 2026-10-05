import type { LeadStatus } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

/**
 * Lead status badge.
 *
 * Colours follow the palette's meaning: accent for "needs you" (new), brand blue
 * for in-progress, emerald for won — emerald is the trust/confirmation accent
 * everywhere else on the site and this is the one admin surface where it earns
 * the same reading.
 */
const styles: Record<LeadStatus, string> = {
  new: "bg-accent/15 text-accent-dark ring-accent/25",
  contacted: "bg-brand/10 text-brand ring-brand/20",
  qualified: "bg-sky/10 text-brand-dark ring-sky/25",
  won: "bg-emerald/10 text-emerald ring-emerald/25",
  lost: "bg-destructive/10 text-destructive ring-destructive/20",
  archived: "bg-slate-100 text-slate-600 ring-slate-200",
};

export default function StatusPill({
  status,
  className,
}: {
  status: LeadStatus | string;
  className?: string;
}) {
  const style = styles[status as LeadStatus] ?? styles.archived;
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-[11.5px] font-semibold capitalize ring-1 ring-inset",
        style,
        className
      )}
    >
      {status}
    </span>
  );
}

export const LEAD_STATUSES: LeadStatus[] = [
  "new",
  "contacted",
  "qualified",
  "won",
  "lost",
  "archived",
];
