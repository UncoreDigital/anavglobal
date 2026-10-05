"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * FAQ accordion.
 *
 * Single-open by default: with nineteen questions on /faqs, allowing everything
 * open at once produces a page the reader has to scroll past rather than read.
 * Pass `multiple` where the set is short enough to compare side by side.
 *
 * Answers stay in the DOM when collapsed (height animated to 0, not unmounted)
 * so browser find-in-page and crawlers still reach them.
 */
export default function FaqAccordion({
  items,
  multiple = false,
  defaultOpen,
  className,
}: {
  items: { q: string; a: string }[];
  multiple?: boolean;
  defaultOpen?: number;
  className?: string;
}) {
  const baseId = useId();
  const [open, setOpen] = useState<number[]>(defaultOpen === undefined ? [] : [defaultOpen]);

  const toggle = (i: number) => {
    setOpen((current) => {
      const isOpen = current.includes(i);
      if (multiple) return isOpen ? current.filter((x) => x !== i) : [...current, i];
      return isOpen ? [] : [i];
    });
  };

  return (
    <div className={cn("divide-y divide-border overflow-hidden rounded-xl border border-border bg-white", className)}>
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                aria-controls={`${baseId}-panel-${i}`}
                id={`${baseId}-trigger-${i}`}
                className="flex w-full items-start justify-between gap-5 px-6 py-5 text-left transition-colors hover:bg-slate-50"
              >
                <span
                  className={cn(
                    "text-[15px] font-semibold leading-snug transition-colors",
                    isOpen ? "text-brand" : "text-navy-deep"
                  )}
                >
                  {item.q}
                </span>
                <span
                  className={cn(
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                    isOpen
                      ? "rotate-45 border-accent bg-accent text-navy-deep"
                      : "border-border text-ink-muted"
                  )}
                  aria-hidden="true"
                >
                  <Plus className="h-3.5 w-3.5" />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="panel"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div
                    id={`${baseId}-panel-${i}`}
                    role="region"
                    aria-labelledby={`${baseId}-trigger-${i}`}
                    className="px-6 pb-6 pr-14 text-[14.5px] leading-[1.75] text-ink-muted"
                  >
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
