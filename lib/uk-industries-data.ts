import type { Industry } from "@/lib/industries-data";

/**
 * The six industries, for the UK site.
 *
 * Provenance: the same six sectors, names and photography as the US site
 * (lib/industries-data.ts). The copy is adapted for the UK — VAT and Making Tax
 * Digital instead of sales tax, PAYE / tronc / CIS instead of tipped payroll,
 * "accounting practices" instead of CPA firms — and each industry recommends
 * UK services from uk-services-data.ts. NEW, written for this build. Client to
 * review alongside the UK services.
 *
 * Slugs match the US site so the country switcher lands on the same industry,
 * except CPA firms ↔ accounting practices (see INDUSTRY_EQUIVALENTS in
 * lib/regions.ts).
 */
export const ukIndustries: Industry[] = [
  {
    slug: "startups-smes",
    name: "Startups & SMEs",
    description: "Scalable accounting for growing UK businesses",
    icon: "Rocket",
    image: "/assets/photos/startups-smes.webp",
    intro:
      "Growing businesses outgrow spreadsheets fast. We give you the finance function of a larger company — clean books, VAT, payroll and year-end — sized to where you are now and ready for where you are going.",
    challenges: [
      "Founders spending evenings on bookkeeping instead of the business",
      "No clear view of cash runway or margins",
      "VAT registration and returns arriving faster than expected",
      "Accounts not ready when investors or lenders ask",
    ],
    help: [
      "Monthly bookkeeping and a reliable close from day one",
      "VAT returns kept MTD-compatible as you grow",
      "PAYE payroll and auto-enrolment set up properly as you hire",
      "Year-end accounts and corporation tax prepared on time",
      "Cloud systems that scale — Xero, QuickBooks or Sage, connected",
    ],
    services: ["bookkeeping-vat", "payroll-cis", "year-end-accounts-corporation-tax"],
  },
  {
    slug: "accounting-practices",
    name: "Accounting Practices",
    metaTitle: "Outsourcing for Accounting Practices",
    description: "Reliable outsourcing partner for UK accountancy firms",
    icon: "Building2",
    image: "/assets/photos/cpa-firms.webp",
    intro:
      "We work as an extension of your practice. Our accountants prepare inside your software, to your standards, so your team can review, sign off and spend their time on clients and advisory instead of production.",
    challenges: [
      "A January self-assessment peak that local hiring cannot cover",
      "Qualified staff tied up in bookkeeping and preparation work",
      "Rising salary costs for experienced accountants",
      "Turning away work because there is nobody to do it",
    ],
    help: [
      "Bookkeeping and VAT returns across your client base",
      "Year-end accounts and corporation tax computations to your review checklist",
      "Self-assessment returns prepared well ahead of 31 January",
      "Payroll and CIS processing under your practice's oversight",
      "Overnight turnaround from our team in India",
    ],
    services: [
      "bookkeeping-vat",
      "year-end-accounts-corporation-tax",
      "self-assessment-personal-tax",
      "payroll-cis",
    ],
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    description: "Specialised accounting for online retailers",
    icon: "ShoppingCart",
    image: "/assets/photos/e-commerce.webp",
    intro:
      "Marketplace payouts, payment processor fees, refunds and stock make e-commerce books harder than they look. We reconcile every channel to the bank so your margins are real numbers, not estimates.",
    challenges: [
      "Payouts that net fees, refunds and chargebacks together",
      "Sales across several marketplaces and payment processors",
      "Stock and cost of sales that never quite tie out",
      "VAT on UK, EU and marketplace sales",
    ],
    help: [
      "Channel-by-channel payout reconciliation",
      "Accurate cost of sales and gross margin by channel",
      "VAT returns that reflect marketplace and overseas sales",
      "Monthly reporting on contribution margin and cash",
    ],
    services: ["bookkeeping-vat", "year-end-accounts-corporation-tax"],
  },
  {
    slug: "restaurants-hospitality",
    name: "Restaurants & Hospitality",
    description: "Industry-specific accounting for food service",
    icon: "Utensils",
    image: "/assets/photos/restaurants-hospitality.webp",
    intro:
      "Thin margins and high volumes leave no room for messy books. We track prime costs, reconcile daily takings and run payroll for shift-based teams, so you know where every site stands every week.",
    challenges: [
      "Daily takings from EPOS, delivery apps and card terminals",
      "Food and labour costs that move week to week",
      "Shift payroll, tips and tronc with high staff turnover",
      "Several sites to compare and consolidate",
    ],
    help: [
      "Daily takings and deposit reconciliation",
      "Prime cost tracking — food, drink and labour",
      "Payroll for hourly and shift teams, including tips",
      "Site-by-site reporting and VAT returns",
    ],
    services: ["bookkeeping-vat", "payroll-cis", "year-end-accounts-corporation-tax"],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    description: "Tailored solutions for consultants and agencies",
    icon: "Briefcase",
    image: "/assets/photos/professional-services.webp",
    intro:
      "For consultancies, agencies and practices, profit lives in utilisation and collections. We keep billing, debtors and project profitability visible so you can price, staff and grow with confidence.",
    challenges: [
      "Unbilled time and slow-paying clients squeezing cash",
      "No clear picture of profitability by client or project",
      "Contractor and payroll costs mixed together",
      "Directors doing the books after billable hours",
    ],
    help: [
      "Debtor management and collections follow-up",
      "Client and project profitability reporting",
      "Contractor and PAYE payroll processing",
      "Directors' self-assessment returns alongside the company's accounts",
    ],
    services: [
      "bookkeeping-vat",
      "payroll-cis",
      "self-assessment-personal-tax",
      "year-end-accounts-corporation-tax",
    ],
  },
  {
    slug: "real-estate",
    name: "Property & Real Estate",
    description: "Accounting for landlords and property companies",
    icon: "Home",
    image: "/assets/photos/real-estate.webp",
    intro:
      "Property portfolios generate a lot of small transactions across a lot of owners and entities. We keep rents, deposits, expenses and landlord statements reconciled property by property.",
    challenges: [
      "Rents, deposits and expenses across many properties",
      "Several entities, owners and joint ownerships to report to",
      "Capital expenditure versus repairs classification",
      "Making Tax Digital quarterly updates for landlords",
    ],
    help: [
      "Property-level bookkeeping and reconciliation",
      "Landlord statements and portfolio reporting",
      "Digital records kept ready for MTD quarterly updates",
      "Self-assessment and year-end accounts for landlords and property companies",
    ],
    services: ["bookkeeping-vat", "self-assessment-personal-tax", "year-end-accounts-corporation-tax"],
  },
];
