import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TopBar from "@/components/TopBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import type { Region } from "@/lib/regions";
import { contactFrom, getSettings } from "@/lib/settings";

/**
 * The public site's chrome for one country site: top bar, header, footer and
 * the floating WhatsApp button.
 *
 * Rendered by app/(marketing)/(us)/layout.tsx and app/(marketing)/uk/layout.tsx.
 * Contact details are read once here and handed down, so the top bar, header,
 * footer and WhatsApp button can never disagree about the phone number.
 */
export default async function SiteChrome({ region, children }: { region: Region; children: React.ReactNode }) {
  const contact = contactFrom(await getSettings(), region);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy-deep focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <TopBar contact={contact} />
      <Header phone={contact.phones[0]} email={contact.email} region={region} />
      <main id="main">{children}</main>
      <Footer contact={contact} region={region} />
      <WhatsAppButton number={contact.whatsapp[0]} />
    </>
  );
}
