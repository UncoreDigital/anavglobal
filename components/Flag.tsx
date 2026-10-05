import type { Region } from "@/lib/regions";
import { cn } from "@/lib/utils";

/**
 * Small country flags for the region switcher.
 *
 * Inline SVG rather than emoji: Windows ships no flag glyphs, so 🇺🇸 / 🇬🇧
 * render as the bare letters "US" / "GB" for a large share of this audience.
 * No ids or clip-paths, so any number can render on one page (and in server
 * components) without colliding. At 20px the simplified Union Jack — red
 * diagonals centred rather than counterchanged — is indistinguishable from
 * the real thing.
 */
export default function Flag({ region, className }: { region: Region; className?: string }) {
  const classes = cn("inline-block h-[0.85rem] w-[1.35rem] shrink-0 overflow-hidden rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)]", className);

  if (region === "uk") {
    return (
      <svg viewBox="0 0 60 30" className={classes} aria-hidden="true" preserveAspectRatio="none">
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2.5" />
        <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 19 10" className={classes} aria-hidden="true" preserveAspectRatio="none">
      <rect width="19" height="10" fill="#B22234" />
      <path d="M0,1.154H19M0,2.692H19M0,4.231H19M0,5.769H19M0,7.308H19M0,8.846H19" stroke="#fff" strokeWidth="0.77" />
      <rect width="7.6" height="5.385" fill="#3C3B6E" />
      <g fill="#fff">
        {[1, 2.5, 4, 5.5].map((x) => [1, 2.3, 3.6, 4.6].map((y) => <circle key={`${x}-${y}`} cx={x + (y === 2.3 || y === 4.6 ? 0.75 : 0)} cy={y} r="0.32" />))}
      </g>
    </svg>
  );
}
