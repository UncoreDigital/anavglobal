import { CalendarCheck, Clock, Headphones, Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import CountryCode from "@/components/CountryCode";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { regions, rhref, type Region } from "@/lib/regions";
import { pageMetadata } from "@/lib/seo";
import { contactFrom, getSettings } from "@/lib/settings";
import { offices, telHref, waHref } from "@/lib/site";

export function contactMetadata(region: Region) {
  return pageMetadata(region, "/contact", {
    title: "Contact Us",
    description:
      "Book a free consultation with ANAV Global. Call, email or WhatsApp our team — offices in the USA, UK and India. We reply within 24 hours.",
  });
}

export default async function ContactPage({ region }: { region: Region }) {
  const contact = contactFrom(await getSettings(), region);
  /* The current country's office leads. */
  const officeList = [...offices].sort((a, b) => Number(b.id === regions[region].officeId) - Number(a.id === regions[region].officeId));

  return (
    <>
      {/* VERBATIM: "Get In Touch — Let's Start a Conversation — Ready to transform your accounting?…" */}
      <PageBanner
        eyebrow="Get In Touch"
        title="Let's Start a"
        accent="Conversation"
        lead="Ready to transform your accounting? Get in touch with our team for a free consultation"
        breadcrumbs={[{ name: "Contact" }]}
        homeHref={rhref(region, "/")}
      />

      <section className="section bg-slate-50">
        <div className="container grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
          <Reveal className="rounded-3xl border border-border bg-white p-6 shadow-card sm:p-10">
            <h2 className="text-2xl font-extrabold">Send Us a Message</h2>
            <p className="mt-2 text-[14.5px] text-ink-muted">
              Fill out the form below and we&apos;ll get back to you within 24 hours
            </p>
            <div className="mt-8">
              <ContactForm region={region} />
            </div>
          </Reveal>

          <div className="space-y-5">
            {contact.bookingUrl && (
              <Reveal className="relative overflow-hidden rounded-3xl bg-navy-deep p-7 text-white">
                <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
                <div className="relative">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-accent-light">
                    <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-lg font-bold text-white">Prefer to pick a time?</h2>
                  <p className="mt-1.5 text-[14px] text-white/70">Book a free 30-minute consultation directly in our calendar.</p>
                  <Button href={contact.bookingUrl} external className="mt-5">
                    Book a call
                  </Button>
                </div>
              </Reveal>
            )}

            <Reveal className="rounded-3xl border border-border bg-white p-7">
              <ContactRow icon={<Mail className="h-5 w-5" />} title="Email Us">
                <a href={`mailto:${contact.email}`} className="break-all font-semibold text-brand hover:text-brand-dark">
                  {contact.email}
                </a>
              </ContactRow>

              {contact.phones.length > 0 && (
                <ContactRow icon={<Phone className="h-5 w-5" />} title="Call Us">
                  {contact.phones.map((p) => (
                    <a key={p} href={telHref(p)} className="flex items-center gap-2 font-semibold text-navy-deep hover:text-brand">
                      {p} <CountryCode code={regions[region].code} />
                    </a>
                  ))}
                </ContactRow>
              )}

              {contact.whatsapp.length > 0 && (
                <ContactRow
                  icon={
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                      <path d="M12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0 0 20.463 3.49 11.815 11.815 0 0 0 12.05 0Zm0 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 5.45 0 9.884 4.434 9.881 9.89-.003 5.45-4.437 9.884-9.885 9.884Z" />
                    </svg>
                  }
                  title="WhatsApp (India)"
                >
                  {contact.whatsapp.map((w) => (
                    <a
                      key={w}
                      href={waHref(w, "Hello ANAV Global, I would like to know more about your accounting services.")}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2 font-semibold text-navy-deep hover:text-brand"
                    >
                      {w} <CountryCode code="IN" />
                    </a>
                  ))}
                </ContactRow>
              )}

              {/* VERBATIM: "Business Hours / Office Hours". Day and time stack below 420px; above it the time never wraps. */}
              <ContactRow icon={<Clock className="h-5 w-5" />} title="Office Hours">
                <dl className="grid grid-cols-1 text-[14px] [@media(min-width:420px)]:grid-cols-[minmax(0,1fr)_max-content] [@media(min-width:420px)]:gap-x-4 [@media(min-width:420px)]:gap-y-1">
                  <dt className="text-ink-muted">Monday – Friday</dt>
                  <dd className="font-semibold text-navy-deep">{contact.hours.weekdays}</dd>
                  <dt className="text-ink-muted">Saturday</dt>
                  <dd className="font-semibold text-navy-deep">{contact.hours.saturday}</dd>
                  <dt className="text-ink-muted">Sunday</dt>
                  <dd className="font-semibold text-navy-deep">{contact.hours.sunday}</dd>
                </dl>
              </ContactRow>

              {/* VERBATIM: "Support — Email Support: 24/7, Phone Support: Business Hours, WhatsApp: 24/7" */}
              <ContactRow icon={<Headphones className="h-5 w-5" />} title="Support" last>
                <dl className="grid grid-cols-1 text-[14px] [@media(min-width:420px)]:grid-cols-[minmax(0,1fr)_max-content] [@media(min-width:420px)]:gap-x-4 [@media(min-width:420px)]:gap-y-1">
                  <dt className="text-ink-muted">Email Support</dt>
                  <dd className="font-semibold text-navy-deep">24/7</dd>
                  <dt className="text-ink-muted">Phone Support</dt>
                  <dd className="font-semibold text-navy-deep">Business Hours</dd>
                  <dt className="text-ink-muted">WhatsApp</dt>
                  <dd className="font-semibold text-navy-deep">24/7</dd>
                </dl>
              </ContactRow>
            </Reveal>
          </div>
        </div>
      </section>

      {/* VERBATIM: "Our Offices — USA • UK • India" */}
      <section className="section-tight bg-white">
        <div className="container">
          <Reveal className="text-center">
            <span className="eyebrow mb-3">Our Offices</span>
            <h2 className="text-[1.75rem] font-extrabold sm:text-3xl">USA • UK • India</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {officeList.map((office) => (
              <Reveal key={office.id} className="card-edge p-7 hover:shadow-card">
                <div className="flex items-center justify-between">
                  <CountryCode code={office.code} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand">{office.role}</span>
                </div>
                <h3 className="mt-4 text-[17px] font-bold text-navy-deep">{office.label}</h3>
                <p className="mt-2.5 flex gap-2.5 text-[14px] leading-relaxed text-ink-muted">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
                  {office.address}
                </p>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-[13px] font-semibold text-brand hover:text-brand-dark"
                >
                  Open in Google Maps →
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ContactRow({
  icon,
  title,
  children,
  last = false,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div className={last ? "flex gap-4 pt-5" : "flex gap-4 border-b border-border py-5 first:pt-0"}>
      <span className="icon-plate h-11 w-11">{icon}</span>
      <div className="min-w-0 space-y-1 text-[14.5px]">
        <h2 className="text-[12px] font-bold uppercase tracking-[0.14em] text-ink-muted">{title}</h2>
        {children}
      </div>
    </div>
  );
}
