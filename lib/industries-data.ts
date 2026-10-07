/**
 * The six industries, for the US site — source of truth. The UK site's
 * adapted versions are in uk-industries-data.ts.
 *
 * Provenance:
 *   name, description, image  — from the Emergent build (images are the same
 *                               Unsplash / Pexels frames, optimised locally)
 *   intro, challenges, help,
 *   services                  — NEW, written for this build. Client to review.
 */

export type Industry = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  image: string;
  /** Page title, when "Accounting for {name}" reads badly. */
  metaTitle?: string;
  /** NEW */
  intro: string;
  /** NEW */
  challenges: string[];
  /** NEW */
  help: string[];
  /** Service slugs from the same site (services-data.ts or uk-services-data.ts). */
  services: string[];
};

export const industries: Industry[] = [
  {
    slug: "startups-smes",
    name: "Startups & SMEs",
    description: "Scalable accounting solutions for growing businesses",
    icon: "Rocket",
    image: "/assets/photos/startups-smes.webp",
    intro:
      "Growing businesses outgrow spreadsheets fast. We give you the finance function of a larger company — clean books, payroll, reporting and tax — sized to where you are now and ready for where you are going.",
    challenges: [
      "Founders spending hours on bookkeeping instead of the business",
      "No clear view of cash runway or margins",
      "Books not ready when investors or lenders ask",
      "Payroll and compliance growing faster than the team",
    ],
    help: [
      "Monthly bookkeeping and a reliable close from day one",
      "Cash flow forecasting and runway tracking",
      "Investor- and lender-ready financial statements",
      "Payroll set up properly as you hire",
      "Systems that scale — cloud accounting, bill-pay and expenses connected",
    ],
    services: ["bookkeeping-accounting", "management-accounts", "payroll-services", "business-advisory"],
  },
  {
    slug: "cpa-firms",
    name: "CPA Firms",
    description: "Reliable outsourcing partner for accounting firms",
    icon: "Building2",
    image: "/assets/photos/cpa-firms.webp",
    intro:
      "We work as an extension of your firm. Our accountants prepare inside your systems, to your standards, so your team can review, sign off and spend their time on clients and advisory instead of production.",
    challenges: [
      "Busy season capacity that local hiring cannot keep up with",
      "Senior staff tied up in write-up and preparation work",
      "Rising salary costs for experienced accountants",
      "Turning away work because there is nobody to do it",
    ],
    help: [
      "Bookkeeping and write-up across your client base",
      "Tax return preparation to your review checklist",
      "Payroll processing under your firm's oversight",
      "Cleanup and catch-up for new clients",
      "Overnight turnaround across time zones",
    ],
    services: ["bookkeeping-accounting", "tax-preparation-filing", "payroll-services", "cleanup-catch-up"],
  },
  {
    slug: "e-commerce",
    name: "E-commerce",
    description: "Specialized accounting for online retailers",
    icon: "ShoppingCart",
    image: "/assets/photos/e-commerce.webp",
    intro:
      "Marketplace payouts, payment processor fees, refunds and inventory make e-commerce books harder than they look. We reconcile every channel to the bank so your margins are real numbers, not estimates.",
    challenges: [
      "Payouts that net fees, refunds and chargebacks together",
      "Sales across several marketplaces and payment processors",
      "Inventory and cost of goods that never quite tie out",
      "Sales tax obligations in multiple places",
    ],
    help: [
      "Channel-by-channel payout reconciliation",
      "Accurate cost of goods and gross margin by channel",
      "Inventory accounting and month-end adjustments",
      "Monthly reporting on contribution margin and cash",
    ],
    services: ["bookkeeping-accounting", "management-accounts", "tax-preparation-filing"],
  },
  {
    slug: "restaurants-hospitality",
    name: "Restaurants & Hospitality",
    description: "Industry-specific accounting for food service",
    icon: "Utensils",
    image: "/assets/photos/restaurants-hospitality.webp",
    intro:
      "Thin margins and high volumes leave no room for messy books. We track prime costs, reconcile daily sales and run payroll for hourly and tipped staff, so you know where every location stands every week.",
    challenges: [
      "Daily sales from POS, delivery apps and card processors",
      "Food and labour costs that move week to week",
      "Hourly and tipped payroll with high turnover",
      "Multiple locations to compare and consolidate",
    ],
    help: [
      "Daily sales and deposit reconciliation",
      "Prime cost tracking — food, beverage and labour",
      "Payroll for hourly and tipped teams",
      "Location-by-location reporting and consolidation",
    ],
    services: ["bookkeeping-accounting", "payroll-services", "management-accounts"],
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    description: "Tailored solutions for consultants and agencies",
    icon: "Briefcase",
    image: "/assets/photos/professional-services.webp",
    intro:
      "For consultancies, agencies and practices, profit lives in utilisation and collections. We keep billing, receivables and project profitability visible so you can price, staff and grow with confidence.",
    challenges: [
      "Unbilled time and slow collections squeezing cash",
      "No clear picture of profitability by client or project",
      "Contractor and payroll costs mixed together",
      "Owners doing the books after billable hours",
    ],
    help: [
      "Receivables management and collections follow-up",
      "Client and project profitability reporting",
      "Contractor and payroll processing",
      "Monthly management accounts with commentary",
    ],
    services: ["bookkeeping-accounting", "management-accounts", "payroll-services", "business-advisory"],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    description: "Comprehensive accounting for property management",
    icon: "Home",
    image: "/assets/photos/real-estate.webp",
    intro:
      "Property portfolios generate a lot of small transactions across a lot of entities. We keep rents, deposits, expenses and owner statements reconciled property by property.",
    challenges: [
      "Rent rolls, deposits and expenses across many properties",
      "Several entities and owners to report to",
      "Capital expenditure versus repairs classification",
      "Year-end reporting for owners and lenders",
    ],
    help: [
      "Property-level bookkeeping and reconciliation",
      "Owner statements and portfolio reporting",
      "Entity-by-entity books and consolidation",
      "Tax-ready year-end packs",
    ],
    services: ["bookkeeping-accounting", "management-accounts", "tax-preparation-filing"],
  },
];
