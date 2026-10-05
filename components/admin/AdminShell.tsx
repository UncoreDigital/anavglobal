"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  MessageSquareQuote,
  Settings,
  Users,
  X,
} from "lucide-react";
import AvLine from "@/components/brand/AvLine";
import Logo from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { features, site } from "@/lib/site";
import { createClient } from "@/lib/supabase/client";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { name: "Leads", href: "/admin/leads", icon: Mail },
  ...(features.insights ? [{ name: "Insights", href: "/admin/posts", icon: FileText }] : []),
  { name: "Team", href: "/admin/team", icon: Users },
  ...(features.testimonials ? [{ name: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote }] : []),
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminShell({
  children,
  email,
  newLeads = 0,
}: {
  children: React.ReactNode;
  email: string | null;
  newLeads?: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const aside = useRef<HTMLElement>(null);

  /* Mobile drawer only (the toggle exists below lg): trap focus, lock the page behind it. */
  useFocusTrap(aside, open);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  async function signOut() {
    await createClient().auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  const isActive = (href: string, exact?: boolean) => (exact ? pathname === href : pathname.startsWith(href));

  return (
    <div className="flex min-h-screen bg-slate-50">
      {open && (
        <div className="fixed inset-0 z-40 bg-navy-deep/50 lg:hidden" onClick={() => setOpen(false)} aria-hidden="true" />
      )}

      {/*
        Closed below lg, the drawer is also `invisible`: translating it off-screen
        alone left its links in the keyboard tab order. Visibility is part of the
        transition, so the slide-out still animates before it hides.
      */}
      <aside
        ref={aside}
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col overflow-hidden border-r border-white/10 bg-navy-deep transition-[transform,visibility] duration-300 lg:visible lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "visible translate-x-0" : "invisible -translate-x-full"
        )}
      >
        <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-brand opacity-25 blur-[90px]" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-accent opacity-15 blur-[90px]" aria-hidden="true" />

        <div className="relative flex items-start justify-between gap-3 border-b border-white/10 p-5">
          <Link href="/admin" className="min-w-0">
            <Logo size="sm" tone="dark" />
            <span className="mt-3 block text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/45">Admin Panel</span>
          </Link>
          <button type="button" onClick={() => setOpen(false)} className="-mr-2 -mt-2 rounded-lg p-3 text-white/60 lg:hidden" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="relative flex-1 space-y-1 overflow-y-auto p-3" aria-label="Admin">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                  active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className={cn("h-4 w-4", active && "text-accent-light")} aria-hidden="true" />
                {item.name}
                {item.href === "/admin/leads" && newLeads > 0 && (
                  <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-navy-deep">{newLeads}</span>
                )}
                {active && !(item.href === "/admin/leads" && newLeads > 0) && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="relative space-y-3 border-t border-white/10 p-4">
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-1 text-xs text-white/55 transition-colors hover:text-accent-light"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            View live site
          </Link>
          {email && (
            <p className="truncate px-1 text-xs text-white/45" title={email}>
              {email}
            </p>
          )}
          <Button variant="onDark" size="sm" className="w-full justify-start gap-2" onClick={signOut}>
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </Button>
          <a
            href={site.builtBy.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-1 text-[11px] text-white/40 transition-colors hover:text-white/70"
          >
            <AvLine id="admin-credit" className="h-2 w-3.5" strokeWidth={2} />
            Powered by {site.builtBy.name}
          </a>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center gap-4 border-b border-border bg-white px-5 lg:hidden">
          <button type="button" onClick={() => setOpen(true)} className="-ml-2.5 rounded-lg p-2.5 text-navy-deep" aria-label="Open menu" aria-expanded={open}>
            <Menu className="h-6 w-6" />
          </button>
          <Logo size="sm" tagline={false} />
          <span className="hidden text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted [@media(min-width:360px)]:inline">Admin</span>
        </header>

        <main className="flex-1 p-5 lg:p-9">{children}</main>
      </div>
    </div>
  );
}
