import LegalPage from "@/components/LegalPage";
import { rhref, type Region } from "@/lib/regions";
import { pageMetadata } from "@/lib/seo";
import { contactFrom, getSettings } from "@/lib/settings";
import { offices, site } from "@/lib/site";

export function privacyMetadata(region: Region) {
  return pageMetadata(region, "/privacy-policy", {
    title: "Privacy Policy",
    description: "How ANAV Global collects, uses and protects the information you share through this website.",
  });
}

export default async function PrivacyPage({ region }: { region: Region }) {
  const contact = contactFrom(await getSettings(), region);

  return (
    <LegalPage title="Privacy Policy" updated="October 2026" homeHref={rhref(region, "/")}>
      <p>
        This policy explains what information {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects through
        this website, why, and what you can ask us to do with it. It covers the website only; client engagements are
        governed by the engagement letter agreed for that work.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Information you send us.</strong> When you use the contact form we collect your name, email address
          and message, and — if you choose to give them — your phone number, company, country, the services you are
          interested in and whether you are a firm or a business owner. We also record which page you submitted from.
        </li>
        <li>
          <strong>Usage analytics.</strong> We use privacy-friendly analytics to count page views. It does not use
          cookies and does not identify you personally.
        </li>
      </ul>

      <h2>How we use it</h2>
      <p>
        We use the information you send only to respond to your enquiry, arrange a consultation and, if you become a
        client, set up your engagement. We do not sell it, rent it or share it with third parties for their own
        marketing.
      </p>

      <h2>Where it is stored</h2>
      <p>
        Enquiries are stored in a secured database operated by our hosting providers and are accessible only to
        authorised members of our team. Our team works across our offices in the {offices.map((o) => o.country).join(", ").replace(/, ([^,]*)$/, " and $1")}.
      </p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiries for as long as needed to respond and follow up, and delete enquiries that do not lead to an
        engagement when they are no longer needed.
      </p>

      <h2>WhatsApp and phone</h2>
      <p>
        If you contact us by WhatsApp or phone, that conversation is also subject to the privacy terms of the service
        you used.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us what information we hold about you, ask us to correct it, or ask us to delete it. Email{" "}
        <a href={`mailto:${contact.email}`}>{contact.email}</a> and we will respond promptly.
      </p>

      <h2>Changes</h2>
      <p>If we change this policy we will update the date at the top of this page.</p>
    </LegalPage>
  );
}
