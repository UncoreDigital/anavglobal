import { ArrowRight, Mail, Phone } from "lucide-react";
import AvLine from "@/components/brand/AvLine";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { regionContent } from "@/lib/region-content";
import { rhref } from "@/lib/regions";
import type { Contact } from "@/lib/settings";
import { telHref, waHref } from "@/lib/site";

/**
 * The closing band — US: "Ready to Transform Your Accounting?" (VERBATIM);
 * UK: lib/region-content.ts. Heading and body can be overridden per page.
 *
 * A navy panel inset in white, rather than a full-bleed band, so it reads as a
 * distinct object before the (also navy) footer instead of merging into it.
 */
export default function CTA({ contact, heading, body }: { contact: Contact; heading?: string; body?: string }) {
  const region = contact.region;
  const band = regionContent[region].cta;
  const phone = contact.phones[0];
  /* The UK site has no phone until one is set in Admin → Site Settings; offer WhatsApp instead of a US number. */
  const whatsapp = !phone ? contact.whatsapp[0] : undefined;

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container">
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-navy-deep px-6 py-14 text-center sm:px-12 md:py-20">
          <div className="absolute inset-0 -z-10 bg-grid opacity-50" aria-hidden="true" />
          <div className="absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-brand opacity-40 blur-[110px]" aria-hidden="true" />
          <div className="absolute -bottom-32 -right-32 -z-10 h-96 w-96 rounded-full bg-accent opacity-30 blur-[110px]" aria-hidden="true" />
          <AvLine
            id="cta-line"
            variant="trend"
            strokeWidth={2}
            glow
            className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 w-full opacity-40"
          />

          <h2 className="mx-auto max-w-3xl text-[1.9rem] font-extrabold leading-[1.12] text-white sm:text-4xl lg:text-[2.75rem]">
            {heading ?? band.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.75] text-white/70">{body ?? band.body}</p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href={rhref(region, band.cta.href)} size="lg" className="h-auto min-h-[3.25rem] max-w-full whitespace-normal py-3 text-center">
              {band.cta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            {phone && (
              <Button href={telHref(phone)} size="lg" variant="onDark" className="h-auto min-h-[3.25rem] max-w-full whitespace-normal py-3 text-center">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {phone}
              </Button>
            )}
            {whatsapp && (
              <Button href={waHref(whatsapp)} size="lg" variant="onDark" className="h-auto min-h-[3.25rem] max-w-full whitespace-normal py-3 text-center">
                <Phone className="h-4 w-4" aria-hidden="true" />
                WhatsApp {whatsapp}
              </Button>
            )}
          </div>
          <a
            href={`mailto:${contact.email}`}
            className="mt-7 inline-flex items-center gap-2 text-[14px] text-white/60 transition-colors hover:text-accent-light"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {contact.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
