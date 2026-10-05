import LegalPage from "@/components/LegalPage";
import { rhref, type Region } from "@/lib/regions";
import { pageMetadata } from "@/lib/seo";
import { contactFrom, getSettings } from "@/lib/settings";
import { site } from "@/lib/site";

export function termsMetadata(region: Region) {
  return pageMetadata(region, "/terms-of-service", {
    title: "Terms of Service",
    description: "The terms that apply to your use of the ANAV Global website.",
  });
}

export default async function TermsPage({ region }: { region: Region }) {
  const contact = contactFrom(await getSettings(), region);

  return (
    <LegalPage title="Terms of Service" updated="October 2026" homeHref={rhref(region, "/")}>
      <p>
        These terms apply to your use of this website. By using it, you agree to them. Professional services provided
        by {site.name} are governed separately by the engagement letter agreed for each piece of work.
      </p>

      <h2>Information on this website</h2>
      <p>
        The content on this website — including articles in our Insights section — is general information. It is not
        accounting, tax, legal or financial advice for your specific situation, and you should not act on it without
        advice that takes your circumstances into account. Tax rules change; content reflects our understanding at the
        time it was published.
      </p>

      <h2>No client relationship</h2>
      <p>
        Using this website, or sending us an enquiry, does not by itself create a client relationship. That begins only
        once an engagement has been agreed in writing.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The {site.name} name, logo and the content of this website belong to {site.name} unless stated otherwise.
        Third-party product names and logos shown on this site belong to their respective owners and are used only to
        identify the software we work with; their use does not imply endorsement or partnership.
      </p>

      <h2>Links to other websites</h2>
      <p>We are not responsible for the content or privacy practices of websites we link to.</p>

      <h2>Liability</h2>
      <p>
        We work to keep this website accurate and available, but we do not guarantee that it will be error-free or
        uninterrupted, and to the extent permitted by law we are not liable for losses arising from its use.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms can be sent to <a href={`mailto:${contact.email}`}>{contact.email}</a>.
      </p>
    </LegalPage>
  );
}
