"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { EASE } from "@/lib/motion";
import type { PublicTestimonial } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

/**
 * Testimonial carousel — "What Our Clients Say / Real stories from businesses
 * we've helped succeed" (VERBATIM headings).
 *
 * Renders only testimonials published from Admin → Testimonials, and nothing
 * at all when there are none. No stock headshots: a monogram is drawn from the
 * person's own name. See lib/testimonials.ts for why nothing is published by
 * default.
 *
 * Autoplay stops permanently on the first manual interaction — a carousel that
 * resumes and slides away from what the reader just chose is worse than one
 * that never moved.
 */
export default function Testimonials({ items }: { items: PublicTestimonial[] }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [engaged, setEngaged] = useState(false);
  const count = items.length;

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setIndex((next + count) % count);
    },
    [count]
  );

  useEffect(() => {
    if (engaged || count < 2) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % count);
    }, 7000);
    return () => clearInterval(id);
  }, [engaged, count]);

  if (count === 0) return null;

  const interact = (fn: () => void) => {
    setEngaged(true);
    fn();
  };
  const active = items[index];
  const initials = active.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

  return (
    <section className="section bg-mint-light">
      <div className="container">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our"
          accent="Clients Say"
          lead="Real stories from businesses we've helped succeed"
          align="center"
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <Quote className="absolute -left-2 -top-7 h-16 w-16 text-brand/10 sm:-left-10" aria-hidden="true" />

          <div className="relative min-h-[18rem] sm:min-h-[15rem]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={active.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -32 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="rounded-3xl border border-border bg-white p-8 shadow-card sm:p-10"
              >
                {active.rating > 0 && (
                  <div className="mb-5 flex gap-1" aria-label={`${active.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn("h-4 w-4", i < active.rating ? "fill-accent text-accent" : "text-slate-200")}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                )}
                <p className="text-[16.5px] leading-[1.8] text-navy-deep sm:text-[17.5px]">“{active.quote}”</p>
                <footer className="mt-7 flex items-center gap-4 border-t border-border pt-6">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-extrabold text-white"
                    style={{ backgroundImage: "var(--gradient-brand)" }}
                    aria-hidden="true"
                  >
                    {initials}
                  </span>
                  <div>
                    <cite className="block text-[14.5px] font-bold not-italic text-navy-deep">{active.name}</cite>
                    <span className="text-[13px] text-ink-muted">
                      {[active.role, active.company].filter(Boolean).join(", ")}
                    </span>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {count > 1 && (
            <div className="mt-8 flex items-center justify-center gap-5">
              <button
                type="button"
                onClick={() => interact(() => go(index - 1, -1))}
                aria-label="Previous testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-navy-deep transition-colors hover:border-brand hover:text-brand"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              {/* 24px hit area per dot, so the row is tappable with a thumb. */}
              <div className="flex items-center" role="tablist" aria-label="Testimonials">
                {items.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Testimonial ${i + 1} of ${count}`}
                    onClick={() => interact(() => go(i, i > index ? 1 : -1))}
                    className="group flex h-6 items-center justify-center px-[10px]"
                  >
                    <span
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300",
                        i === index ? "w-8 bg-accent" : "w-1.5 bg-slate-200 group-hover:bg-slate-400"
                      )}
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => interact(() => go(index + 1, 1))}
                aria-label="Next testimonial"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-navy-deep transition-colors hover:border-brand hover:text-brand"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
