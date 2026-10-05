"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Momentum scrolling for the marketing tree.
 *
 * Deliberately not mounted on /admin: an admin editing a long post wants the
 * scroll position to go exactly where the OS put it, and momentum on a form
 * screen reads as lag rather than polish.
 *
 * Disabled outright under prefers-reduced-motion — hijacking the scroll is the
 * single most disorienting thing on this page for anyone who has asked the
 * system for less movement.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      /*
        Touch devices are left on native scrolling. Lenis on mobile fights the
        browser's own overscroll and address-bar behaviour, and the result is
        worse than the native feel it replaces.
      */
      smoothWheel: true,
      syncTouch: false,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
