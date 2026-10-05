import { cn } from "@/lib/utils";

/**
 * Two-letter country marker.
 *
 * Stands in for the flag emoji the design originally called for. Windows ships
 * no flag glyphs — a regional-indicator pair falls back to the bare letters —
 * and this audience is overwhelmingly Windows, so a flag would have rendered as
 * two floating capitals on the majority of visits. Setting the code
 * deliberately, in a chip, makes that the design instead of a defect.
 */
export default function CountryCode({
  code,
  tone = "light",
  className,
}: {
  code: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex h-[1.15rem] min-w-[1.7rem] items-center justify-center rounded px-1 text-[10px] font-bold tracking-[0.06em] ring-1 ring-inset",
        tone === "dark"
          ? "bg-white/10 text-white/75 ring-white/15"
          : "bg-slate-100 text-slate-600 ring-slate-200",
        className
      )}
    >
      {code}
    </span>
  );
}
