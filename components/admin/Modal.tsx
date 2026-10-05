"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useFocusTrap } from "@/lib/useFocusTrap";

/** Minimal dialog for the admin editors. Escape and the backdrop both close it; focus is trapped inside. */
export default function Modal({
  title,
  onClose,
  children,
  footer,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  useFocusTrap(dialog, true);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-navy-deep/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialog}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-lift sm:rounded-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-[17px] font-bold text-navy-deep">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-ink-muted hover:bg-slate-100" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
        {footer && <div className="flex items-center justify-end gap-3 border-t border-border bg-slate-50 px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}
