"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import Logo from "@/components/brand/Logo";
import CountrySwitcher from "@/components/CountrySwitcher";
import { Button } from "@/components/ui/Button";
import { EASE } from "@/lib/motion";
import { rhref, type Region } from "@/lib/regions";
import { navFor, site, telHref, type NavItem } from "@/lib/site";
import { useFocusTrap } from "@/lib/useFocusTrap";
import { cn } from "@/lib/utils";

/**
 * Sticky header with hover dropdowns and a mobile drawer.
 *
 * Dropdowns open on hover for pointer users and on click/keyboard for everyone
 * else — a hover-only menu is unreachable by keyboard, and a click-only menu
 * feels broken to mouse users. Both paths drive the same `open` state.
 *
 * Contact details arrive as props from the (server) site chrome, which reads
 * them from Admin → Site Settings. `region` picks the US or UK menu and makes
 * the logo and CTA point at that country's site.
 */
export default function Header({ phone, email, region }: { phone?: string; email: string; region: Region }) {
  const pathname = usePathname();
  const navItems = navFor(region);
  const home = rhref(region, "/");
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [drawer, setDrawer] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Route change closes everything — otherwise the drawer survives navigation. */
  useEffect(() => {
    setDrawer(false);
    setOpenDropdown(null);
  }, [pathname]);

  /* The drawer is a full-screen overlay; the page behind it must not scroll. */
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenDropdown(null);
      setDrawer(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Grace period so the menu does not vanish while the pointer crosses the gap. */
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  const isActive = (item: NavItem) =>
    pathname === item.href ||
    pathname.startsWith(`${item.href}/`) ||
    Boolean(item.dropdown?.some((sub) => pathname === sub.href));

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b transition-all duration-300",
          scrolled ? "border-border bg-white/90 shadow-soft backdrop-blur-md" : "border-transparent bg-white"
        )}
      >
        <div className="container flex h-[4.5rem] items-center justify-between gap-3 sm:gap-6 md:h-20">
          <Link href={home} className="shrink-0" aria-label={`${site.name} ${region === "uk" ? "UK " : ""}home`}>
            <Logo size="md" priority />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
            {navItems.map((item) => {
              const active = isActive(item);
              const open = openDropdown === item.name;
              /* Long lists (the US site's industries) drop the blurbs and go three across so the panel fits a laptop screen. */
              const dense = (item.dropdown?.length ?? 0) > 8;

              if (!item.dropdown) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative whitespace-nowrap rounded-lg px-3 py-2 text-[14px] font-semibold transition-colors",
                      active ? "text-brand" : "text-navy-deep hover:text-brand"
                    )}
                  >
                    {item.name}
                    {active && <ActiveRule />}
                  </Link>
                );
              }

              return (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    setOpenDropdown(item.name);
                  }}
                  onMouseLeave={scheduleClose}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-haspopup="true"
                    onClick={() => setOpenDropdown(open ? null : item.name)}
                    className={cn(
                      "relative flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-2 text-[14px] font-semibold transition-colors",
                      active || open ? "text-brand" : "text-navy-deep hover:text-brand"
                    )}
                  >
                    {item.name}
                    <ChevronDown
                      className={cn("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
                      aria-hidden="true"
                    />
                    {active && <ActiveRule />}
                  </button>

                  <AnimatePresence>
                    {open && (
                      /*
                        Centred under its trigger. The -50% shift lives in the
                        motion values, not a Tailwind translate class: motion
                        writes its own transform, which silently dropped the
                        class and left every panel starting at its trigger's
                        midpoint — harmless for narrow menus, but the wide
                        industries panel ran off a 1024px screen.
                      */
                      <motion.div
                        initial={{ opacity: 0, y: 8, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 4, x: "-50%" }}
                        transition={{ duration: 0.18, ease: EASE }}
                        onMouseEnter={cancelClose}
                        onMouseLeave={scheduleClose}
                        className={cn(
                          "absolute left-1/2 top-full z-50 pt-3",
                          dense ? "w-[46rem]" : item.dropdown.length > 4 ? "w-[34rem]" : "w-[24rem]"
                        )}
                      >
                        <div className="overflow-hidden rounded-2xl border border-border bg-white p-2 shadow-lift">
                          <div className={cn("grid gap-0.5", dense ? "grid-cols-3" : item.dropdown.length > 4 && "grid-cols-2")}>
                            {item.dropdown.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className={cn(
                                  "group relative block rounded-xl px-3.5 transition-colors hover:bg-mint-light",
                                  dense ? "py-2.5" : "py-3"
                                )}
                              >
                                <span className="flex items-center justify-between gap-3">
                                  <span className="text-[14px] font-semibold text-navy-deep transition-colors group-hover:text-brand">
                                    {sub.name}
                                  </span>
                                  <ArrowRight
                                    className="h-3.5 w-3.5 -translate-x-1 text-accent-dark opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
                                    aria-hidden="true"
                                  />
                                </span>
                                {sub.blurb && !dense && (
                                  <span className="mt-0.5 block text-[12.5px] leading-snug text-ink-muted">
                                    {sub.blurb}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                          <Link
                            href={item.href}
                            className="mt-1 flex items-center justify-between rounded-xl bg-slate-50 px-3.5 py-2.5 text-[13px] font-semibold text-brand transition-colors hover:bg-brand/5"
                          >
                            {item.name === "Company" ? "About ANAV Global" : `All ${item.name.toLowerCase()}`}
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {phone && (
              <a
                href={telHref(phone)}
                className="hidden items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-[14px] font-semibold text-navy-deep transition-colors hover:text-brand 2xl:flex"
              >
                <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
                {phone}
              </a>
            )}
            <Button href={rhref(region, "/contact")} size="md" className="hidden sm:inline-flex">
              Free Consultation
            </Button>
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="rounded-lg p-2.5 text-navy-deep lg:hidden"
              aria-label="Open menu"
              aria-expanded={drawer}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        open={drawer}
        onClose={() => setDrawer(false)}
        pathname={pathname}
        phone={phone}
        email={email}
        region={region}
        navItems={navItems}
      />
    </>
  );
}

function ActiveRule() {
  return (
    <span
      className="absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full"
      style={{ backgroundImage: "var(--gradient-brand)" }}
      aria-hidden="true"
    />
  );
}

function MobileDrawer({
  open,
  onClose,
  pathname,
  phone,
  email,
  region,
  navItems,
}: {
  open: boolean;
  onClose: () => void;
  pathname: string;
  phone?: string;
  email: string;
  region: Region;
  navItems: NavItem[];
}) {
  const home = rhref(region, "/");
  const [expanded, setExpanded] = useState<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useFocusTrap(panel, open, closeButton);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-navy-deep/60 backdrop-blur-sm lg:hidden"
            aria-hidden="true"
          />
          <motion.div
            ref={panel}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: EASE }}
            className="fixed inset-y-0 right-0 z-[70] flex w-[min(22rem,88vw)] flex-col bg-white lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-border px-5">
              <Logo size="sm" />
              <button ref={closeButton} type="button" onClick={onClose} className="rounded-lg p-3 text-navy-deep" aria-label="Close menu">
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-3 py-4" aria-label="Mobile">
              <CountrySwitcher variant="segmented" className="mx-0.5 mb-3" />
              <Link
                href={home}
                className={cn(
                  "block rounded-xl px-3.5 py-3 text-[15px] font-semibold transition-colors",
                  pathname === home ? "bg-brand/5 text-brand" : "text-navy-deep hover:bg-slate-50"
                )}
              >
                Home
              </Link>
              {navItems.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                if (!item.dropdown) {
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "block rounded-xl px-3.5 py-3 text-[15px] font-semibold transition-colors",
                        active ? "bg-brand/5 text-brand" : "text-navy-deep hover:bg-slate-50"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                }

                const isOpen = expanded === item.name;
                return (
                  <div key={item.name}>
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : item.name)}
                      aria-expanded={isOpen}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-[15px] font-semibold transition-colors",
                        active ? "text-brand" : "text-navy-deep hover:bg-slate-50"
                      )}
                    >
                      {item.name}
                      <ChevronDown
                        className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")}
                        aria-hidden="true"
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.24, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 space-y-0.5 border-l-2 border-accent/50 pb-2 pl-3">
                            <Link href={item.href} className="block rounded-lg px-3 py-2 text-[13.5px] font-semibold text-brand">
                              {item.name === "Company" ? "About ANAV Global" : `All ${item.name.toLowerCase()}`}
                            </Link>
                            {item.dropdown.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="block rounded-lg px-3 py-2 text-[13.5px] text-ink-muted transition-colors hover:bg-slate-50 hover:text-navy-deep"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            <div className="shrink-0 space-y-3 border-t border-border p-5">
              <Button href={rhref(region, "/contact")} size="lg" className="w-full">
                Book a Free Consultation
              </Button>
              <div className="flex flex-col items-center gap-2 text-[13.5px] font-semibold text-navy-deep">
                {phone && (
                  <a href={telHref(phone)} className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-brand" aria-hidden="true" />
                    {phone}
                  </a>
                )}
                <a href={`mailto:${email}`} className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-brand" aria-hidden="true" />
                  {email}
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
