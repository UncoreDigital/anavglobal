import Image from "next/image";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * The ANAV Global lockup.
 *
 * The supplied artwork is a stacked square: the AV mark over the ANAV GLOBAL
 * wordmark. Square lockups are unreadable in a header bar — at 44px tall the
 * wordmark would be ~5px — so the header uses a horizontal arrangement of the
 * same two pieces, both cut from the artwork itself by
 * scripts/build-logo-assets.js. Nothing is re-typeset: the letterforms are the
 * client's. The old Emergent header did the same thing (mark beside the name,
 * "Accounting Excellence" underneath), so this is the arrangement the client
 * already uses, done with the real artwork.
 *
 * `variant="stacked"` renders the artwork as drawn, for the login screen, the
 * 404 page and anywhere there is room for it.
 *
 * `tone="dark"` swaps in the white wordmark. The mark itself needs no plate on
 * navy: its light stroke was keyed with a flood fill, so it stays opaque.
 */

/*
  `md` and `lg` step down one size below the `sm` breakpoint. At full size the
  header lockup plus the menu button needs ~335px, which pushed a 320px screen
  into horizontal scroll and clipped the footer tagline (responsive audit,
  October 2026). From 640px up the sizes are unchanged.

  The tagline grew from "Accounting Excellence" to "Accounting & Tax
  Excellence" (client change list, October 2026) — six more letters — so its
  letter-spacing is tighter than before. That keeps it within about a quarter
  of the wordmark's width, as the shorter tagline was, and keeps the 320px
  header clear of the menu button.
*/
const SIZES = {
  sm: { mark: "h-8", word: "h-[13px]", tag: "text-[7.5px] tracking-[0.12em]" },
  md: {
    mark: "h-9 sm:h-10",
    word: "h-[14px] sm:h-[16px]",
    tag: "text-[8px] tracking-[0.12em] sm:text-[9px] sm:tracking-[0.16em]",
  },
  lg: {
    mark: "h-11 sm:h-14",
    word: "h-[17px] sm:h-[22px]",
    tag: "text-[9px] tracking-[0.16em] sm:text-[11px] sm:tracking-[0.18em]",
  },
} as const;

export default function Logo({
  size = "md",
  tone = "light",
  variant = "horizontal",
  tagline = true,
  className,
  priority = false,
}: {
  size?: keyof typeof SIZES;
  tone?: "light" | "dark";
  variant?: "horizontal" | "stacked";
  tagline?: boolean;
  className?: string;
  priority?: boolean;
}) {
  if (variant === "stacked") {
    return (
      <Image
        src={tone === "dark" ? "/assets/logo-white-alpha.png" : "/assets/logo-alpha.png"}
        alt={site.name}
        width={600}
        height={452}
        priority={priority}
        className={cn("h-24 w-auto", className)}
      />
    );
  }

  const s = SIZES[size];
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/assets/logo-mark-alpha.png"
        alt=""
        width={640}
        height={396}
        priority={priority}
        className={cn(s.mark, "w-auto shrink-0")}
      />
      <span className="flex flex-col items-start">
        <Image
          src={tone === "dark" ? "/assets/logo-wordmark-white-alpha.png" : "/assets/logo-wordmark-alpha.png"}
          alt={site.name}
          width={900}
          height={97}
          priority={priority}
          className={cn(s.word, "w-auto shrink-0")}
        />
        {tagline && (
          <span
            className={cn(
              s.tag,
              "mt-[5px] whitespace-nowrap font-semibold uppercase leading-none",
              tone === "dark" ? "text-white/55" : "text-ink-muted"
            )}
          >
            {site.tagline}
          </span>
        )}
      </span>
    </span>
  );
}
