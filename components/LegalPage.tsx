import { AlertTriangle } from "lucide-react";
import PageBanner from "@/components/PageBanner";

/**
 * Shell for the legal pages.
 *
 * Both are DRAFTS. They accurately describe what this site does with the data
 * it collects, but they have not been reviewed by counsel — and a firm serving
 * clients in the US, the UK and India has three regimes to satisfy. The notice
 * says so on the page itself, so nobody mistakes the draft for the final.
 * Remove `draft` once a lawyer has signed off.
 */
export default function LegalPage({
  title,
  updated,
  draft = true,
  children,
  homeHref = "/",
}: {
  homeHref?: string;
  title: string;
  updated: string;
  draft?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageBanner eyebrow="Legal" title={title} lead={`Last updated ${updated}`} breadcrumbs={[{ name: title }]} homeHref={homeHref} />
      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-[46rem]">
            {draft && (
              <p className="mb-10 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-[13.5px] leading-relaxed text-amber-900">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                This page is a draft pending legal review. It describes how this website handles information, but it is
                not yet the final policy.
              </p>
            )}
            <div className="prose-anav">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
