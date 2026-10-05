"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import Flag from "@/components/Flag";
import { EASE } from "@/lib/motion";
import { REGIONS, regions, splitPath, switchHref, type Region } from "@/lib/regions";
import { cn } from "@/lib/utils";

/**
 * The USA / UK switcher — the equivalent of the flag dropdown on
 * unisonglobus.com.
 *
 * Three presentations of one control:
 *   dropdown   flag + "USA" + chevron, opening a small menu (top bar)
 *   segmented  two side-by-side buttons (mobile drawer)
 *   links      plain flag links (footer)
 *
 * Choosing a country goes to the same page on the other site when one exists
 * and to the nearest sensible page when it does not — see `switchHref` in
 * lib/regions.ts. The current region is read from the URL, so the control is
 * always right, including after browser back/forward.
 */
export default function CountrySwitcher({
  variant = "dropdown",
  tone = "dark",
  className,
}: {
  variant?: "dropdown" | "segmented" | "links";
  tone?: "dark" | "light";
  className?: string;
}) {
  const pathname = usePathname() ?? "/";
  const { region: current } = splitPath(pathname);

  if (variant === "segmented") {
    return (
      <div className={cn("grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1", className)} role="group" aria-label="Choose your country">
        {REGIONS.map((r) => (
          <Link
            key={r}
            href={switchHref(pathname, r)}
            aria-current={r === current ? "true" : undefined}
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-[13.5px] font-semibold transition-all",
              r === current ? "bg-white text-navy-deep shadow-soft" : "text-ink-muted hover:text-navy-deep"
            )}
          >
            <Flag region={r} />
            {regions[r].label}
          </Link>
        ))}
      </div>
    );
  }

  if (variant === "links") {
    return (
      <ul className={cn("flex items-center gap-2", className)} aria-label="Country sites">
        {REGIONS.map((r) => (
          <li key={r}>
            <Link
              href={switchHref(pathname, r)}
              aria-current={r === current ? "true" : undefined}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12.5px] font-semibold transition-colors",
                tone === "dark"
                  ? r === current
                    ? "border-accent-light/50 bg-white/10 text-white"
                    : "border-white/15 text-white/65 hover:border-white/35 hover:text-white"
                  : r === current
                    ? "border-brand/40 bg-brand/5 text-navy-deep"
                    : "border-border text-ink-muted hover:text-navy-deep"
              )}
            >
              <Flag region={r} />
              {regions[r].label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return <Dropdown current={current} pathname={pathname} tone={tone} className={className} />;
}

function Dropdown({
  current,
  pathname,
  tone,
  className,
}: {
  current: Region;
  pathname: string;
  tone: "dark" | "light";
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  /* Close on route change, outside click and Escape (returning focus to the button). */
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (root.current && !root.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={root} className={cn("relative z-[60]", className)}>
      <button
        ref={button}
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={`Country: ${regions[current].name}. Change country`}
        className={cn(
          "flex h-8 items-center gap-2 rounded-lg px-2.5 text-[12.5px] font-semibold transition-colors",
          tone === "dark" ? "text-white/85 hover:bg-white/10 hover:text-white" : "text-navy-deep hover:bg-slate-100"
        )}
      >
        <Flag region={current} />
        {regions[current].label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")} aria-hidden="true" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.16, ease: EASE }}
            className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-border bg-white p-1.5 shadow-lift"
          >
            <p className="px-3 pb-1.5 pt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-ink-muted">Choose your country</p>
            <ul>
              {REGIONS.map((r) => (
                <li key={r}>
                  <Link
                    href={switchHref(pathname, r)}
                    aria-current={r === current ? "true" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-semibold transition-colors",
                      r === current ? "bg-mint-light text-navy-deep" : "text-navy-deep hover:bg-slate-50"
                    )}
                  >
                    <Flag region={r} />
                    <span className="flex-1">{regions[r].name}</span>
                    {r === current && <Check className="h-4 w-4 text-emerald" aria-hidden="true" />}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
