import { Clock, Mail, Phone } from "lucide-react";
import CountryCode from "@/components/CountryCode";
import CountrySwitcher from "@/components/CountrySwitcher";
import type { Contact } from "@/lib/settings";
import { telHref, waHref } from "@/lib/site";

/**
 * Utility strip above the header (md and up).
 *
 * Carries what a first-time visitor checks before reading anything — a number
 * to call, an inbox, where the firm is — and the USA / UK country dropdown,
 * the equivalent of the flag menu on unisonglobus.com. It lives here rather
 * than in the main nav because at 1024–1279px the nav already uses all but
 * ~20px of the bar (responsive audit); the strip has room at every width.
 *
 * On the UK site the phone is the UK line from Admin → Site Settings. Until
 * one is set, WhatsApp takes its place rather than a US number.
 *
 * Hidden below md — on a phone the switcher is at the top of the menu drawer
 * and in the footer, and the contact details are a tap away there too.
 */
export default function TopBar({ contact }: { contact: Contact }) {
  const phone = contact.phones[0];
  const whatsapp = contact.whatsapp[0];

  return (
    <div className="relative z-[55] hidden h-10 items-center border-b border-white/10 bg-navy-deep text-white md:flex">
      <div className="container flex items-center justify-between gap-6">
        <div className="flex min-w-0 items-center gap-6">
          {phone ? (
            <a
              href={telHref(phone)}
              className="flex shrink-0 items-center gap-2 text-[12.5px] text-white/75 transition-colors hover:text-accent-light"
            >
              <Phone className="h-3.5 w-3.5 text-accent-light" aria-hidden="true" />
              {phone}
            </a>
          ) : (
            whatsapp && (
              <a
                href={waHref(whatsapp)}
                target="_blank"
                rel="noreferrer"
                className="flex shrink-0 items-center gap-2 text-[12.5px] text-white/75 transition-colors hover:text-accent-light"
              >
                <Phone className="h-3.5 w-3.5 text-accent-light" aria-hidden="true" />
                WhatsApp {whatsapp}
              </a>
            )
          )}
          <a
            href={`mailto:${contact.email}`}
            className="flex min-w-0 items-center gap-2 text-[12.5px] text-white/75 transition-colors hover:text-accent-light"
          >
            <Mail className="h-3.5 w-3.5 shrink-0 text-accent-light" aria-hidden="true" />
            <span className="truncate">{contact.email}</span>
          </a>
          <span className="hidden items-center gap-2 text-[12.5px] text-white/60 xl:flex">
            <Clock className="h-3.5 w-3.5 text-accent-light" aria-hidden="true" />
            Mon–Fri {contact.hours.weekdays}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-4">
          <div className="hidden items-center gap-2 lg:flex" aria-label="Offices in the USA, UK and India">
            <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">Offices</span>
            <CountryCode code="US" tone="dark" />
            <CountryCode code="UK" tone="dark" />
            <CountryCode code="IN" tone="dark" />
          </div>
          <span className="hidden h-4 w-px bg-white/15 lg:block" aria-hidden="true" />
          <CountrySwitcher />
        </div>
      </div>
    </div>
  );
}
