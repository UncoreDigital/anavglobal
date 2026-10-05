"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Counts a figure up when it scrolls into view.
 *
 * Takes the already-split numeric value and suffix rather than a raw string, so
 * the "TBC" / em-dash cases never reach here — see splitFigure() in
 * lib/settings.ts. A counter that animates a non-number to zero is worse than
 * no counter.
 *
 * ── Why the initial state is the final value ────────────────────────────────
 * This used to start at 0, which meant the server-rendered HTML literally
 * contained "0+". Anyone who loaded the page saw "0+ clients served" until the
 * figure scrolled into view, and anyone without JavaScript saw it permanently.
 * That is precisely the failure lib/settings.ts guards against on the data side,
 * reintroduced by the animation.
 *
 * So it renders the real figure from the first paint. The wind-back to zero
 * happens in a layout effect, before the browser paints, and *only* when the
 * element is off-screen — so the reset is never visible. A counter already in
 * the viewport on load simply shows its value and never animates, which is the
 * right trade: a number the reader is already looking at should not jump to
 * zero to put on a show.
 *
 * Uses rAF rather than a spring because the value has to land exactly: a spring
 * settles asymptotically and can read "1,149" for a frame, which on a client
 * count is not acceptable.
 */
export default function CountUp({
  value,
  suffix = "",
  duration = 1600,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const [display, setDisplay] = useState(value);
  /* Whether we were able to hide the starting frame. If not, we never animate. */
  const [armed, setArmed] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const box = el.getBoundingClientRect();
    const offScreen = box.top > window.innerHeight || box.bottom < 0;
    if (!offScreen) return;

    setDisplay(0);
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!inView || !armed) return;

    let raf = 0;
    const start = performance.now();
    /* Same easing as the reveal variants, so the count feels part of the page. */
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(ease(t) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, armed, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
