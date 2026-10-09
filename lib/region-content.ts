import {
  audiences as usAudiences,
  ctaBand as usCta,
  engagementModels as usEngagementModels,
  enquirerTypes as usEnquirerTypes,
  faqs as usFaqs,
  hero as usHero,
  serviceInterests as usServiceInterests,
  software,
  taxSoftware,
  ukTaxSoftware,
  type SoftwareTool,
} from "@/lib/content";
import { industries as usIndustries, type Industry } from "@/lib/industries-data";
import type { Region } from "@/lib/regions";
import { services as usServices, type Service } from "@/lib/services-data";
import { ukIndustries } from "@/lib/uk-industries-data";
import { ukServices } from "@/lib/uk-services-data";

/**
 * Everything that changes between the US and UK sites, in one shape.
 *
 * US values are the existing copy (lib/content.ts, lib/services-data.ts),
 * unchanged. UK values are NEW: positioning and service structure adapted from
 * posaccounts.com/uk-accounting.php (as the client asked), prose written for
 * ANAV. Links are written as base paths ("/contact") and made region-aware by
 * the components with `rhref`.
 *
 * ⚠️ CLIENT TO CONFIRM for the UK: the engagement models and their "Each model
 * includes" list (SLAs, account manager) — these mirror POS Accounts' page and
 * must be true of ANAV before launch.
 */

type Cta = { label: string; href: string };

export type RegionContent = {
  meta: { homeTitle: string; homeDescription: string; servicesTitle: string; servicesDescription: string };
  hero: {
    eyebrow: string;
    headline: string;
    headlineAccent: string;
    lead: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    chips: string[];
    /** The illustrative month-end checklist in the hero panel. */
    panelSteps: { label: string; done: boolean }[];
  };
  audiences: {
    id: "cpa" | "business";
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
    cta: Cta;
  }[];
  audiencesLead: string;
  servicesHeading: { eyebrow: string; title: string; accent: string; lead: string };
  servicesBanner: { eyebrow: string; title: string; accent: string; lead: string };
  engagement: {
    title: string;
    accent: string;
    lead: string;
    models: { name: string; body: string; bestFor: string; icon: string }[];
    includes?: string[];
  };
  faqs: { q: string; a: string }[];
  cta: { heading: string; body: string; cta: Cta };
  software: SoftwareTool[];
  /** Labels and links for the two "who it's for" cards on service pages. */
  forWho: { cpa: Cta; business: Cta };
  serviceInterests: string[];
  enquirerTypes: string[];
  footerBlurb: string;
  services: Service[];
  industries: Industry[];
};

const us: RegionContent = {
  meta: {
    homeTitle: "ANAV Global — Next-Gen Accounting for CPAs & Business Owners",
    homeDescription:
      "ANAV Global is a trusted partner for outsourced bookkeeping, payroll, tax preparation and management accounts — serving CPA firms and growing businesses across the USA, UK and India.",
    servicesTitle: "Accounting Services",
    servicesDescription:
      "Bookkeeping, payroll, tax preparation, management accounts, business advisory and cleanup services for CPA firms and growing businesses.",
  },
  hero: {
    ...usHero,
    panelSteps: [
      { label: "Bank & card reconciliations", done: true },
      { label: "Accounts payable & receivable", done: true },
      { label: "Payroll reconciliation", done: true },
      { label: "Financial statements", done: false },
    ],
  },
  audiences: usAudiences.map((a) => ({ ...a, points: [...a.points], cta: { ...a.cta } })),
  audiencesLead:
    "Whether you run an accounting practice or a growing business, you get the same certified team, the same process and the same 24-hour turnaround.",
  servicesHeading: {
    eyebrow: "Our Services",
    title: "Comprehensive",
    accent: "Accounting Solutions",
    lead: "End-to-end financial services tailored for your business growth",
  },
  servicesBanner: {
    eyebrow: "Our Services",
    title: "Professional",
    accent: "Accounting Solutions",
    lead: "From bookkeeping to tax preparation, we provide end-to-end financial services designed to help your business thrive",
  },
  engagement: {
    title: "Work with us",
    accent: "the way that fits",
    lead: "Every business and every firm has a different gap to fill. We shape the engagement around yours during the discovery call.",
    models: usEngagementModels,
  },
  faqs: usFaqs,
  cta: usCta,
  software: [...software, ...taxSoftware],
  forWho: {
    cpa: { label: "For CPA & accounting firms", href: "/industries/cpa-firms" },
    business: { label: "For business owners", href: "/industries/startups-smes" },
  },
  serviceInterests: usServiceInterests,
  enquirerTypes: usEnquirerTypes,
  footerBlurb:
    "Your trusted partner for comprehensive accounting and bookkeeping services. Serving businesses across the USA, UK, and India.",
  services: usServices,
  industries: usIndustries,
};

const uk: RegionContent = {
  meta: {
    homeTitle: "ANAV Global UK — Outsourced Accounting for UK Practices & Businesses",
    homeDescription:
      "MTD-ready bookkeeping and VAT, year-end accounts and Corporation Tax, self-assessment and payroll for UK accounting practices and businesses — from ANAV Global's UK office.",
    servicesTitle: "UK Accounting Services",
    servicesDescription:
      "Bookkeeping & VAT, year-end accounts & Corporation Tax, self-assessment and payroll & CIS for UK accounting practices and businesses — MTD-ready and HMRC-aligned.",
  },
  hero: {
    eyebrow: "Serving UK accounting practices & businesses",
    headline: "Offshore accounting capacity for",
    headlineAccent: "UK practices & businesses",
    lead: "Making Tax Digital, rising compliance workloads and recruitment gaps are stretching UK firms. ANAV Global adds scalable, HMRC-aligned capacity that works inside your Xero, QuickBooks and Sage files.",
    primaryCta: { label: "Book a Free Consultation", href: "/contact" },
    secondaryCta: { label: "Explore UK Services", href: "/services" },
    chips: ["MTD-ready bookkeeping & VAT", "Year-end, CT600 & iXBRL", "UK office in Luton"],
    panelSteps: [
      { label: "Bank & control reconciliations", done: true },
      { label: "VAT return (MTD)", done: true },
      { label: "Payroll & RTI submission", done: true },
      { label: "Management accounts", done: false },
    ],
  },
  audiences: [
    {
      id: "cpa",
      eyebrow: "For UK Accounting Practices",
      title: "Capacity for your practice, without the recruitment",
      body: "Add trained, HMRC-aligned capacity that works inside your systems and to your standards — so your team reviews and advises while we handle preparation.",
      points: [
        "Bookkeeping, VAT and MTD submissions across your client base",
        "Year-end accounts, CT600 and iXBRL for partner review",
        "Self-assessment capacity for the January peak",
        "White-label delivery under your practice's name",
      ],
      cta: { label: "See UK services", href: "/services" },
    },
    {
      id: "business",
      eyebrow: "For UK Business Owners",
      title: "Your books, VAT and payroll — handled",
      body: "Stay compliant without building a finance team. We keep your records MTD-ready, file on time and explain your numbers in plain English.",
      points: [
        "MTD-compliant bookkeeping and VAT returns",
        "Payroll, RTI and auto-enrolment",
        "Year-end accounts and Corporation Tax",
        "Self-assessment for directors",
      ],
      cta: { label: "Talk to us", href: "/contact" },
    },
  ],
  audiencesLead:
    "Whether you run a UK accounting practice or a growing business, you get the same certified team, a defined process and a UK office to talk to.",
  servicesHeading: {
    eyebrow: "UK Services",
    title: "Outsourcing built for",
    accent: "UK compliance",
    lead: "MTD-ready bookkeeping, year-end accounts, self-assessment and payroll — aligned with HMRC standards.",
  },
  servicesBanner: {
    eyebrow: "UK Services",
    title: "Structured support for",
    accent: "UK practices & businesses",
    lead: "Making Tax Digital, rising compliance workloads and recruitment gaps are stretching UK firms. We add scalable, HMRC-aligned capacity that works inside your existing systems.",
  },
  engagement: {
    title: "Engagement models",
    accent: "for UK firms",
    lead: "From a dedicated team to cover for the self-assessment peak — choose the shape of support that matches your workload.",
    models: [
      {
        name: "Dedicated Team",
        body: "A named team working your hours inside your systems, as an extension of your practice.",
        bestFor: "Practices with steady monthly volume",
        icon: "UserCheck",
      },
      {
        name: "White-Label Delivery",
        body: "Work prepared to your templates and standards and delivered under your practice's name.",
        bestFor: "Practices that own the client relationship",
        icon: "ShieldCheck",
      },
      {
        name: "Flexible Hourly Support",
        body: "Capacity by the hour for overflow and ad-hoc work, without a long-term commitment.",
        bestFor: "Variable or unpredictable workloads",
        icon: "SlidersHorizontal",
      },
      {
        name: "Project-Based Engagement",
        body: "Defined-scope work with a start and an end: catch-ups, migrations, one-off year-ends.",
        bestFor: "Backlogs and one-off projects",
        icon: "ClipboardList",
      },
      {
        name: "Seasonal Tax Support",
        body: "Extra self-assessment and year-end capacity from autumn to January, scaled back afterwards.",
        bestFor: "The self-assessment peak",
        icon: "CalendarCheck",
      },
    ],
    includes: ["Defined SLAs", "Data security controls", "Weekly reporting", "Account manager oversight"],
  },
  faqs: [
    {
      q: "Do you work with UK accounting practices?",
      a: "Yes — UK practices are one of our core client groups. We work inside your Xero, QuickBooks or Sage files, to your standards, and can deliver white-label under your practice's name. Your team reviews and signs off.",
    },
    {
      q: "Are you set up for Making Tax Digital?",
      a: "Yes. Bookkeeping is kept in digital records and VAT returns are submitted through MTD-compatible software. We also support clients moving onto MTD for Income Tax.",
    },
    {
      q: "Which UK returns can you prepare?",
      a: "VAT returns, CT600 Corporation Tax returns with iXBRL-tagged accounts, SA100 self-assessment and partnership returns, RTI payroll submissions and monthly CIS returns.",
    },
    {
      q: "Can you help us through the January self-assessment peak?",
      a: "That is what our seasonal tax support model is for — extra preparation capacity from the autumn, scaled back once the deadline has passed.",
    },
    {
      q: "Who submits returns to HMRC?",
      a: "For practices, we prepare and you review and submit under your own agent credentials. For businesses we work with directly, the approval and submission arrangement is agreed at onboarding.",
    },
    {
      q: "Where is the work done?",
      a: "Client conversations are handled through our UK office in Luton; preparation is carried out by our delivery team in Ahmedabad, India, which is what makes overnight turnaround possible.",
    },
    {
      q: "How do you keep client data secure?",
      a: "We work inside your own cloud accounting systems rather than copying data out, access is granted per person, and you can review or revoke it at any time.",
    },
    {
      q: "What does it cost?",
      a: "It depends on scope and volume, and on the engagement model you choose — which is why the first conversation is a free consultation.",
    },
  ],
  cta: {
    heading: "Ready to add capacity before the next deadline?",
    body: "Talk to ANAV Global about bookkeeping, VAT, year-end and self-assessment support for your practice or business.",
    cta: { label: "Book a Free Consultation", href: "/contact" },
  },
  software: [...software.filter((t) => ["Xero", "QuickBooks", "Sage"].includes(t.name)), ...ukTaxSoftware],
  forWho: {
    cpa: { label: "For UK accounting practices", href: "/industries/accounting-practices" },
    business: { label: "For business owners", href: "/industries/startups-smes" },
  },
  serviceInterests: [...ukServices.map((s) => s.title), "Other"],
  enquirerTypes: ["Accounting practice", "Business owner", "Other"],
  footerBlurb:
    "Outsourced bookkeeping, VAT, year-end accounts, self-assessment and payroll for UK accounting practices and businesses — with offices in the UK, USA and India.",
  services: ukServices,
  industries: ukIndustries,
};

export const regionContent: Record<Region, RegionContent> = { us, uk };

export function getRegionService(region: Region, slug: string) {
  return regionContent[region].services.find((s) => s.slug === slug);
}

export function getRegionIndustry(region: Region, slug: string) {
  return regionContent[region].industries.find((i) => i.slug === slug);
}
