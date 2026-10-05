"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[contenteditable="true"],[tabindex]:not([tabindex="-1"])';

/**
 * Focus management for dialogs and drawers.
 *
 * While `active`: moves focus into `ref` (to `initial` if given, otherwise the
 * first focusable element), keeps Tab / Shift+Tab cycling inside it, and on
 * deactivation returns focus to whatever had it before — normally the button
 * that opened the dialog.
 *
 * Added after the responsive audit found focus left behind the overlay on the
 * mobile menu and the admin modals, so keyboard and screen-reader users could
 * operate content they could not see.
 */
export function useFocusTrap(ref: RefObject<HTMLElement>, active: boolean, initial?: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    if (!node) return;

    const previous = document.activeElement as HTMLElement | null;
    const items = () =>
      Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== "hidden"
      );

    (initial?.current ?? items()[0] ?? node).focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const list = items();
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      const current = document.activeElement as HTMLElement | null;

      if (!current || !node.contains(current)) {
        event.preventDefault();
        first.focus();
      } else if (event.shiftKey && current === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      if (previous && document.contains(previous)) previous.focus({ preventScroll: true });
    };
  }, [active, ref, initial]);
}
