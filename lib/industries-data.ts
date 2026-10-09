/**
 * The industries, for the US site — source of truth. The first six are the
 * ones the old site listed; the rest were added at the client's request. The UK site's
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

  /*
    The eleven below were requested by the client (change list, October 2026,
    point 4). US site only. Copy NEW, written for this build — client to review.
    Photos: assets-src/industries/SOURCES.md.
  */
  {
    slug: "hotels-motels",
    name: "Hotels & Motels",
    description: "Accounting for owner-operated hotels, motels and inns",
    icon: "BedDouble",
    image: "/assets/photos/hotels-motels.webp",
    intro:
      "Hotels run on nightly revenue, thin labor margins and a long list of fees. We reconcile the night audit to the bank, keep occupancy taxes straight and give you the property-level numbers — occupancy, ADR and RevPAR — that show how the business is really doing.",
    challenges: [
      "Night audit, PMS and card deposits that never quite match",
      "Online travel agency commissions netted out of payouts",
      "Occupancy and lodging taxes owed to the state, county or city",
      "Housekeeping and front-desk payroll with high turnover",
    ],
    help: [
      "Daily revenue reconciliation from the PMS to the bank",
      "OTA payout and commission tracking",
      "Lodging and sales tax returns prepared on schedule",
      "Payroll for hourly and front-desk staff",
      "Monthly P&L with occupancy, ADR and RevPAR",
    ],
    services: ["bookkeeping-accounting", "payroll-services", "tax-preparation-filing", "management-accounts"],
  },
  {
    slug: "convenience-stores",
    name: "Convenience Stores",
    description: "Bookkeeping for c-stores and gas stations",
    icon: "Store",
    image: "/assets/photos/convenience-stores.webp",
    intro:
      "Convenience stores move thousands of small transactions a day across fuel, lottery, tobacco and grocery. We reconcile the register to the bank every day, track the categories that come with their own rules, and keep inventory and vendor bills under control.",
    challenges: [
      "Daily cash, card and EBT takings to reconcile",
      "Lottery, money orders and fuel settled on separate schedules",
      "Tobacco and fuel excise taxes on top of sales tax",
      "Vendor deliveries, rebates and scan-data incentives to track",
    ],
    help: [
      "Daily shift and register reconciliation",
      "Lottery, fuel and money order settlement tracking",
      "Sales and excise tax returns",
      "Vendor invoice and rebate management",
      "Inventory and margin reporting by category",
    ],
    services: ["bookkeeping-accounting", "payroll-services", "tax-preparation-filing", "management-accounts"],
  },
  {
    slug: "cannabis",
    name: "Cannabis",
    description: "Compliant accounting for licensed cannabis businesses",
    icon: "Leaf",
    image: "/assets/photos/cannabis.webp",
    intro:
      "Licensed cannabis businesses face federal tax rules no other legal industry does, on top of state licensing and cash-heavy operations. We keep books built for both — with cost of goods sold handled carefully, because while Section 280E applies it is often the main deduction available.",
    challenges: [
      "Section 280E limits on deducting ordinary business expenses",
      "Cash-heavy sales and limited access to banking",
      "State excise taxes and seed-to-sale tracking requirements",
      "Inventory costing that has to hold up to IRS scrutiny",
    ],
    help: [
      "Cost of goods sold calculated under the inventory rules 280E allows",
      "Daily cash reconciliation and deposit tracking",
      "State excise and sales tax returns",
      "Books reconciled to your seed-to-sale and POS records",
      "Federal and state tax returns prepared with 280E in mind",
    ],
    services: ["bookkeeping-accounting", "tax-preparation-filing", "management-accounts", "cleanup-catch-up"],
  },
  {
    slug: "construction",
    name: "Construction Firms",
    description: "Job costing and accounting for contractors",
    icon: "HardHat",
    image: "/assets/photos/construction.webp",
    intro:
      "In construction, a job can look profitable right up until it closes. We keep costs coded to every job, track retainage and change orders, and give you the work-in-progress picture your bonding company and lender ask for.",
    challenges: [
      "Labor, materials and subcontractor costs spread across many jobs",
      "Retainage, progress billing and change orders to track",
      "Certified payroll on prevailing-wage projects",
      "Subcontractor W-9s, insurance certificates and 1099s",
    ],
    help: [
      "Job costing set up and kept current",
      "Progress billing and retainage tracking",
      "Work-in-progress (WIP) schedules for sureties and lenders",
      "Payroll, including certified payroll reports",
      "1099s for subcontractors at year end",
    ],
    services: ["bookkeeping-accounting", "payroll-services", "management-accounts", "tax-preparation-filing"],
  },
  {
    slug: "rental-property",
    name: "Rental Property",
    description: "Bookkeeping and tax for landlords and property investors",
    icon: "KeyRound",
    image: "/assets/photos/rental-property.webp",
    intro:
      "Whether you own one rental or a portfolio, every property needs its own clean set of numbers. We track rent, expenses and security deposits property by property, keep depreciation schedules current and prepare Schedule E without a year-end scramble.",
    challenges: [
      "Rent, fees and expenses across several properties and accounts",
      "Security deposits that must be held and tracked separately",
      "Repairs versus improvements — and the depreciation that follows",
      "Property manager statements to reconcile every month",
    ],
    help: [
      "Property-by-property bookkeeping and reporting",
      "Security deposit tracking",
      "Depreciation schedules for buildings and improvements",
      "Reconciliation of property manager statements",
      "Schedule E and entity returns at tax time",
    ],
    services: ["bookkeeping-accounting", "tax-preparation-filing", "management-accounts"],
  },
  {
    slug: "trusts-exempt-entities",
    name: "Trusts & Exempt Entities",
    description: "Fiduciary and nonprofit accounting and returns",
    icon: "Landmark",
    image: "/assets/photos/trusts-exempt-entities.webp",
    intro:
      "Trusts, estates and tax-exempt organizations answer to beneficiaries, donors and regulators as well as the IRS. We keep fiduciary and fund accounting that separates what has to stay separate, and prepare the returns that go with it — Form 1041 for trusts and estates, the Form 990 series for exempt organizations.",
    challenges: [
      "Principal and income that must be accounted for separately",
      "K-1s for every beneficiary, on time",
      "Restricted and unrestricted funds for nonprofits",
      "Annual Form 990 filings that keep tax-exempt status in good standing",
    ],
    help: [
      "Fiduciary accounting for trusts and estates",
      "Form 1041 preparation with beneficiary K-1s",
      "Fund accounting and grant tracking for nonprofits",
      "Form 990, 990-EZ and 990-N filings",
      "Year-end reports for trustees and boards",
    ],
    services: ["bookkeeping-accounting", "tax-preparation-filing", "management-accounts"],
  },
  {
    slug: "law-firms",
    name: "Law Firms",
    description: "Trust accounting and bookkeeping for legal practices",
    icon: "Scale",
    image: "/assets/photos/law-firms.webp",
    intro:
      "A law firm's books carry a responsibility most businesses' do not: client money held in trust. We keep IOLTA and client trust ledgers reconciled to the penny, alongside the operating side — billing, collections and partner reporting.",
    challenges: [
      "Client trust funds that must never be commingled",
      "Three-way reconciliation required by state bar rules",
      "Case costs advanced on contingency matters",
      "Unbilled time and slow collections squeezing cash",
    ],
    help: [
      "Monthly three-way trust account reconciliation",
      "Client ledger and IOLTA record-keeping",
      "Tracking of advanced case costs",
      "Billing, receivables and collections support",
      "Partner and practice-area profitability reporting",
    ],
    services: ["bookkeeping-accounting", "payroll-services", "management-accounts", "tax-preparation-filing"],
  },
  {
    slug: "medical-urgent-care",
    name: "Medical & Urgent Care",
    description: "Accounting for practices, clinics and urgent care centers",
    icon: "Stethoscope",
    image: "/assets/photos/medical-urgent-care.webp",
    intro:
      "Healthcare revenue arrives late, in pieces, from many payers. We reconcile insurance deposits to what was billed, keep provider pay and overheads clear, and give each location a monthly picture of collections, costs and margins.",
    challenges: [
      "Insurance payments that arrive weeks after the visit",
      "Patient payments, copays and refunds across several systems",
      "Provider compensation tied to production",
      "Multiple locations sharing overheads",
    ],
    help: [
      "Deposit reconciliation against remittance advice (ERA/EOB)",
      "Accounts receivable and payer reporting",
      "Payroll for clinical and front-office staff",
      "Location-by-location P&L",
      "Tax returns for practice entities and owners",
    ],
    services: ["bookkeeping-accounting", "payroll-services", "management-accounts", "tax-preparation-filing"],
  },
  {
    slug: "wholesale-distribution",
    name: "Wholesale & Distribution",
    description: "Inventory-driven accounting for wholesalers",
    icon: "Warehouse",
    image: "/assets/photos/wholesale-distribution.webp",
    intro:
      "Wholesale margins are made or lost in inventory, freight and credit terms. We keep stock valued correctly, landed costs captured and receivables collected, so the margin on every product and customer is a real number.",
    challenges: [
      "Inventory valuation and shrinkage across locations",
      "Freight, duties and other landed costs",
      "Customers on net-30 or net-60 terms",
      "Resale certificates for tax-exempt sales",
    ],
    help: [
      "Purchase order, receiving and bill matching",
      "Landed cost and inventory valuation",
      "Receivables management and collections follow-up",
      "Sales tax and exemption certificate tracking",
      "Margin reporting by product and customer",
    ],
    services: ["bookkeeping-accounting", "management-accounts", "tax-preparation-filing", "payroll-services"],
  },
  {
    slug: "drop-shipping",
    name: "Drop Shipping",
    description: "Accounting for drop-shipping and online stores",
    icon: "Package",
    image: "/assets/photos/drop-shipping.webp",
    intro:
      "Drop shipping removes the warehouse, not the accounting. Supplier costs, platform payouts, ad spend and refunds all land in different places. We bring them together so you can see the real profit on every order.",
    challenges: [
      "Supplier charges that don't line up with customer orders",
      "Shopify, Amazon and PayPal payouts net of fees and refunds",
      "Sales tax where you reach economic nexus — and marketplace sales taxed differently",
      "Advertising spend that decides whether you make money",
    ],
    help: [
      "Order-level matching of sales to supplier costs",
      "Payout reconciliation for every sales channel",
      "Sales tax nexus monitoring",
      "Contribution margin after ad spend",
      "Year-end tax returns for the business and its owners",
    ],
    services: ["bookkeeping-accounting", "management-accounts", "tax-preparation-filing"],
  },
  {
    slug: "bullion-jewelry",
    name: "Bullion & Jewelry",
    description: "Accounting for precious-metal dealers and jewelers",
    icon: "Gem",
    image: "/assets/photos/bullion-jewelry.webp",
    intro:
      "When inventory is priced by the ounce and changes value every day, ordinary bookkeeping falls short. We track stock by item, weight and purity, account for consignment and memo goods, and keep the records large cash sales require.",
    challenges: [
      "High-value inventory whose value moves with metal prices",
      "Consignment and memo stock held for others",
      "Cash payments over $10,000 that must be reported on Form 8300",
      "State sales tax rules that treat bullion and jewelry differently",
    ],
    help: [
      "Inventory records by item, weight and purity",
      "Consignment and memo inventory tracking",
      "Form 8300 tracking for large cash transactions",
      "Sales tax treatment by product and state",
      "Monthly margin reporting",
    ],
    services: ["bookkeeping-accounting", "management-accounts", "tax-preparation-filing"],
  },
];
