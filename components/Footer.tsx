import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import AvLine from "@/components/brand/AvLine";
import Logo from "@/components/brand/Logo";
import CountryCode from "@/components/CountryCode";
import CountrySwitcher from "@/components/CountrySwitcher";
import { regionContent } from "@/lib/region-content";
import { regions, rhref, type Region } from "@/lib/regions";
import type { Contact } from "@/lib/settings";
import { footerNavFor, offices, site, telHref, waHref } from "@/lib/site";

const SOCIAL_ICONS = { LinkedIn: Linkedin, Facebook, X: Twitter, Instagram } as const;

export default function Footer({ contact, region }: { contact: Contact; region: Region }) {
  const columns = footerNavFor(region);
  /* The current country's office leads the row. */
  const officeList = [...offices].sort((a, b) => Number(b.id === regions[region].officeId) - Number(a.id === regions[region].officeId));

  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-40 top-0 h-[26rem] w-[26rem] rounded-full bg-accent opacity-[0.08] blur-[110px]"
        aria-hidden="true"
      />
      {/* The mark's sweep as a hairline across the top edge. */}
      <div className="absolute inset-x-0 top-0 h-[3px]" style={{ backgroundImage: "var(--gradient-brand)" }} aria-hidden="true" />

      <div className="container relative">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.2fr_2.6fr] lg:gap-16 lg:py-20">
          <div>
            <Link href={rhref(region, "/")} className="inline-flex" aria-label={`${site.name} home`}>
              <Logo size="lg" tone="dark" />
            </Link>

            {/* US: VERBATIM from the old footer. UK: NEW (lib/region-content.ts). */}
            <p className="mt-6 max-w-sm text-[14.5px] leading-relaxed text-white/65">{regionContent[region].footerBlurb}</p>

            <div className="mt-7 space-y-2.5">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2.5 text-[14px] text-white/80 transition-colors hover:text-accent-light"
              >
                <Mail className="h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" />
                {contact.email}
              </a>
              {contact.allPhones.map(({ number, code }) => (
                <a
                  key={number}
                  href={telHref(number)}
                  className="flex items-center gap-2.5 text-[14px] text-white/80 transition-colors hover:text-accent-light"
                >
                  <Phone className="h-4 w-4 shrink-0 text-accent-light" aria-hidden="true" />
                  {number}
                  <CountryCode code={code} tone="dark" />
                </a>
              ))}
              {contact.whatsapp.map((number) => (
                <a
                  key={number}
                  href={waHref(number)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 text-[14px] text-white/80 transition-colors hover:text-accent-light"
                >
                  <WhatsAppGlyph />
                  {number}
                  <CountryCode code="IN" tone="dark" />
                </a>
              ))}
            </div>

            {contact.social.length > 0 && (
              <ul className="mt-7 flex gap-2.5">
                {contact.social.map(({ name, href }) => {
                  const Icon = SOCIAL_ICONS[name];
                  return (
                    <li key={name}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={name}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white/75 transition-all hover:-translate-y-0.5 hover:border-accent-light/60 hover:bg-white/5 hover:text-accent-light"
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <div className={columns.length === 3 ? "grid gap-10 sm:grid-cols-3" : "grid gap-10 sm:grid-cols-2"}>
            {columns.map((column) => (
              <div key={column.heading}>
                <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] text-accent-light">{column.heading}</h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="text-[14px] text-white/70 transition-colors hover:text-white">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Country sites — Unison lists its country sites in the footer too. */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-accent-light">Our offices</p>
          <div className="flex items-center gap-3">
            <span className="text-[12.5px] text-white/50">Country site</span>
            <CountrySwitcher variant="links" />
          </div>
        </div>

        {/* Offices */}
        <div className="grid gap-8 pb-12 pt-8 sm:grid-cols-3">
          {officeList.map((office) => (
            <div key={office.id}>
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-accent-light">
                <CountryCode code={office.code} tone="dark" />
                {office.label}
              </p>
              <p className="mt-3 flex gap-2.5 text-[13.5px] leading-relaxed text-white/65">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/40" aria-hidden="true" />
                {office.address}
              </p>
            </div>
          ))}
        </div>

        {/*
          Bottom padding (mobile) and right padding (md–1439px) reserve the
          floating WhatsApp button's footprint, which otherwise sat on top of
          the credit link at the end of every page.
        */}
        <div className="relative flex flex-col items-center justify-between gap-4 border-t border-white/10 pb-24 pt-7 text-[13px] text-white/50 md:flex-row md:pb-7 md:pr-20 [@media(min-width:1440px)]:pr-0">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link href={rhref(region, "/privacy-policy")} className="transition-colors hover:text-white/85">
              Privacy Policy
            </Link>
            <Link href={rhref(region, "/terms-of-service")} className="transition-colors hover:text-white/85">
              Terms of Service
            </Link>
            <Link href={rhref(region, "/how-we-work#security")} className="transition-colors hover:text-white/85">
              Data Security
            </Link>
          </div>
          <a
            href={site.builtBy.url}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-[12.5px] text-white/60 transition-colors hover:border-accent-light/40 hover:text-white"
          >
            <AvLine id="footer-credit" className="h-2.5 w-4" strokeWidth={2} />
            Powered by <span className="font-semibold text-white/85 group-hover:text-white">{site.builtBy.name}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 shrink-0 text-accent-light" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}
