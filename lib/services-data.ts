/**
 * The six service lines — source of truth.
 *
 * Nav, footer, the services index, every detail page and the sitemap render
 * from this array, so a service cannot exist without appearing everywhere it
 * should, and cannot drift from the page describing it.
 *
 * Provenance:
 *   title, description, features  — verbatim from the Emergent build
 *   summary, overview, forWho,
 *   outcomes, tools, faqs         — NEW, written for this build. Client to review.
 */

export type Service = {
  slug: string;
  title: string;
  /** NEW — one line for menus and cards. */
  summary: string;
  description: string;
  icon: string;
  features: string[];
  /** NEW — detail page body. */
  overview: string[];
  /** NEW */
  forWho: { cpa: string; business: string };
  /** NEW — short result chips on the detail banner. */
  outcomes: string[];
  tools: string[];
  /** NEW */
  faqs: { q: string; a: string }[];
  /** Step-by-step delivery process. UK services carry one (from the POS Accounts UK page). */
  process?: string[];
  /** One-line promise shown under "What's included". */
  tagline?: string;
  /** Tax forms prepared and filed, with what each covers (US tax service — client change list, October 2026). */
  returns?: { form: string; title: string; detail: string }[];
};

export const services: Service[] = [
  {
    slug: "bookkeeping-accounting",
    title: "Bookkeeping & Accounting",
    summary: "Daily transactions, reconciliations and a clean month-end close",
    description:
      "Comprehensive bookkeeping services including daily transactions, reconciliations, accounts payable/receivable management, and month-end closing.",
    icon: "BookOpen",
    features: [
      "Daily transaction recording",
      "Bank reconciliations",
      "Accounts Payable/Receivable",
      "Month-end closing",
      "Financial statements preparation",
    ],
    overview: [
      "Accurate books are the foundation every other financial decision rests on. We take over the day-to-day — coding transactions, reconciling every bank and card account, keeping payables and receivables current — so your ledger is right every day, not just at year end.",
      "Each month closes on a fixed checklist: reconciliations tied out, accruals and prepayments posted, and a set of financial statements you can hand to a lender, an investor or your tax preparer without a second pass.",
    ],
    forWho: {
      cpa: "Hand us the write-up work for your client base. We work inside your firm's own QuickBooks, Xero or Sage files, to your chart of accounts and your review checklist, so the output looks like your team prepared it.",
      business:
        "Stop spending evenings on the books. You get a dedicated accountant who knows your business, a monthly close you can rely on, and statements that actually explain where the money went.",
    },
    outcomes: ["Reconciled every month", "Audit-ready ledger", "Statements on a fixed date"],
    tools: ["QuickBooks", "Xero", "Sage", "Bill.com", "Expensify"],
    faqs: [
      {
        q: "Do I have to change accounting software?",
        a: "No. We work inside the system you already use — QuickBooks, Xero or Sage — and you keep full ownership of the file and its access.",
      },
      {
        q: "How do you get our bank and card data?",
        a: "Through the bank feeds already connected to your accounting software wherever possible, with statements uploaded for anything that does not feed. You stay in control of every connection.",
      },
      {
        q: "When will we receive the monthly financials?",
        a: "We agree a close calendar during onboarding. Once the month's documents are in, routine work turns around within 24 hours and the close follows the agreed date.",
      },
    ],
  },
  {
    slug: "payroll-services",
    title: "Payroll Services",
    summary: "Accurate, on-time payroll with filings and reconciliation handled",
    description:
      "Complete payroll processing, setup, and reconciliation services to ensure your employees are paid accurately and on time.",
    icon: "Wallet",
    features: [
      "Payroll processing",
      "Tax calculations & filings",
      "Direct deposit setup",
      "Payroll reconciliation",
      "Year-end reporting",
    ],
    overview: [
      "Payroll has no margin for error — a late or wrong pay run costs trust as well as penalties. We run every cycle against a checklist: hours and changes captured, deductions and taxes calculated, approvals collected, and payments released on schedule.",
      "After each run we reconcile payroll to the general ledger and the bank, so the liabilities on your balance sheet match what was actually withheld and remitted. At year end the reporting is already reconciled rather than reconstructed.",
    ],
    forWho: {
      cpa: "Offer payroll to your clients without building a payroll desk. We process inside ADP, Paychex, Gusto or QuickBooks Payroll under your firm's oversight.",
      business:
        "Pay your people correctly and on time, every time, without becoming a payroll expert. New hires, direct deposit and year-end forms are handled for you.",
    },
    outcomes: ["On-time every cycle", "Reconciled to the ledger", "Year-end ready"],
    tools: ["ADP", "Paychex", "Gusto", "QuickBooks"],
    faqs: [
      {
        q: "Which payroll providers do you work with?",
        a: "ADP, Paychex, Gusto and QuickBooks Payroll most often. If you use something else, tell us on the call — the provider is rarely the limiting factor.",
      },
      {
        q: "Can you set up payroll for a new business?",
        a: "Yes. Setup — employee records, pay schedules, direct deposit and tax settings — is part of the service.",
      },
      {
        q: "Who approves each pay run?",
        a: "You do. Nothing is released until the payroll register has been approved by the person you nominate.",
      },
    ],
  },
  {
    slug: "tax-preparation-filing",
    title: "Tax Preparation & Filing",
    summary: "Federal, state and corporate returns prepared to review-ready",
    description:
      "Expert tax preparation, filing services, and representation to maximize your deductions and ensure compliance.",
    icon: "FileText",
    features: [
      "Federal & state tax preparation",
      "Corporate tax returns",
      "Partnership returns",
      "Tax planning strategies",
      "IRS representation",
    ],
    overview: [
      "Tax work is only as good as the books underneath it. Because we usually keep those books too, returns start from reconciled numbers rather than a shoebox — and deductions are captured as the year happens instead of hunted for in April.",
      "Our tax team prepares individual, corporate and partnership returns, builds planning around your year-end position, and supports correspondence and representation where it is needed.",
    ],
    forWho: {
      cpa: "Add preparation capacity for busy season without adding headcount. Returns arrive prepared and documented to your workpaper standard, ready for your reviewer to sign off.",
      business:
        "Know your tax position before the deadline, not after it. We prepare and file your returns and plan ahead so there are no surprises.",
    },
    outcomes: ["Review-ready returns", "Deductions captured", "Deadlines met"],
    tools: ["Drake", "CCH Axcess", "Lacerte", "ProConnect", "TurboTax", "UltraTax CS"],
    returns: [
      {
        form: "1040",
        title: "Individual tax return preparation & filing",
        detail:
          "U.S. Individual Income Tax Return, with the schedules behind it — wages and 1099 income, self-employment (Schedule C), investments (Schedule D), rental income (Schedule E), itemized deductions and credits.",
      },
      {
        form: "1065",
        title: "Partnership tax return preparation & filing",
        detail:
          "U.S. Return of Partnership Income for partnerships and multi-member LLCs, including a Schedule K-1 for every partner and the capital account reconciliation behind it.",
      },
      {
        form: "1120-S",
        title: "S corporation tax return preparation & filing",
        detail:
          "U.S. Income Tax Return for an S Corporation, with shareholder K-1s, and a check that owner salaries and distributions are recorded correctly.",
      },
      {
        form: "1120",
        title: "C corporation tax return preparation & filing",
        detail:
          "U.S. Corporation Income Tax Return, including the book-to-tax reconciliation, depreciation schedules and estimated payments for the year ahead.",
      },
      {
        form: "1041",
        title: "Estate & trust income tax returns",
        detail:
          "U.S. Income Tax Return for Estates and Trusts — income and deductions at the fiduciary level, distributable net income, and K-1s for beneficiaries.",
      },
      {
        form: "4868",
        title: "Individual tax extension filing",
        detail:
          "An automatic six-month extension of time to file a Form 1040, filed by the April deadline — with an estimate of any tax due, because an extension to file is not an extension to pay.",
      },
      {
        form: "7004",
        title: "Business tax extension filing",
        detail:
          "Automatic extensions for partnership, S corporation, C corporation and trust returns, filed before each return's original due date.",
      },
      {
        form: "1040-ES",
        title: "Estimated tax calculation & payments",
        detail:
          "Quarterly estimated tax worked out for individuals and business owners, using the safe-harbor rules to avoid underpayment penalties, with payments scheduled ahead of each due date.",
      },
      {
        form: "State",
        title: "State tax return preparation & filing — all states",
        detail:
          "Individual, partnership and corporate returns in every state, including multi-state apportionment, composite returns and nonresident filings.",
      },
    ],
    faqs: [
      {
        q: "Do you prepare returns for CPA firms on their own software?",
        a: "Yes. For firm engagements we prepare inside your tax software and to your review checklist, and your reviewer signs off before anything is filed.",
      },
      {
        q: "Can you help with UK filings as well?",
        a: "Our team includes HMRC tax filing experts and we serve clients in the UK. Tell us which returns you need on the consultation call.",
      },
      {
        q: "When should we start tax planning?",
        a: "Before year end. Planning done in the last quarter still has options available; planning done after the year closes is mostly reporting.",
      },
    ],
  },
  {
    slug: "management-accounts",
    title: "Management Accounts",
    summary: "Monthly reporting and analysis you can actually make decisions on",
    description:
      "Monthly management accounts with detailed analysis to help you make informed business decisions.",
    icon: "TrendingUp",
    features: [
      "Monthly financial reports",
      "Budget vs actual analysis",
      "Cash flow forecasting",
      "KPI tracking",
      "Strategic recommendations",
    ],
    overview: [
      "Statutory accounts tell you what happened last year. Management accounts tell you what is happening now — in time to do something about it. Each month you get a concise pack: performance against budget, cash position and forecast, and the handful of KPIs that actually drive your business.",
      "Every pack comes with commentary, not just numbers: what moved, why it moved, and what we would look at next. It is the finance function a growing business needs, without hiring one.",
    ],
    forWho: {
      cpa: "Offer advisory-grade monthly reporting to your clients. We build the packs to your template; you lead the conversation.",
      business:
        "See your margins, cash runway and KPIs every month, with plain-English commentary on what changed and what to do about it.",
    },
    outcomes: ["Monthly reporting pack", "Cash forecast", "Budget vs actual"],
    tools: ["QuickBooks", "Xero", "Sage"],
    faqs: [
      {
        q: "What is in a management accounts pack?",
        a: "Typically a profit and loss against budget, balance sheet, cash flow and forecast, KPI dashboard and written commentary. We agree the contents with you during onboarding.",
      },
      {
        q: "We don't have a budget. Can you still help?",
        a: "Yes — building a first budget from your historical numbers is often where this service starts.",
      },
      {
        q: "How soon after month end do we get it?",
        a: "Once the month is closed. We agree a reporting date with you during onboarding and hold to it.",
      },
    ],
  },
  {
    slug: "business-advisory",
    title: "Business Advisory",
    summary: "Process, systems and growth advice from people who see the numbers",
    description:
      "Strategic business consulting to help streamline operations and drive growth through efficient processes.",
    icon: "Lightbulb",
    features: [
      "Business process optimization",
      "Financial planning",
      "Growth strategies",
      "System implementation",
      "Cloud solution integration",
    ],
    overview: [
      "Most finance problems are process problems in disguise: invoices that wait for approval, receipts that never reach the books, systems that do not talk to each other. We map how money actually moves through your business and fix the bottlenecks.",
      "That can mean moving to cloud accounting, connecting bill-pay and expense tools, or redesigning approval workflows — implemented and documented, not left as a slide deck.",
    ],
    forWho: {
      cpa: "Extend your advisory practice with implementation capacity — system set-ups, migrations and integrations delivered under your firm's name.",
      business:
        "Get the systems and processes of a much larger finance team: faster closes, fewer manual steps, and clear numbers to plan growth against.",
    },
    outcomes: ["Faster close", "Fewer manual steps", "Connected systems"],
    tools: ["QuickBooks", "Xero", "Sage", "Bill.com", "Expensify"],
    faqs: [
      {
        q: "Is advisory a separate engagement?",
        a: "It can be a one-off project or part of an ongoing engagement — many clients start with bookkeeping and add advisory once the numbers are reliable.",
      },
      {
        q: "Can you move us to cloud accounting?",
        a: "Yes. System selection, migration of historical data, integrations and training are all part of this service.",
      },
      {
        q: "Do you help with planning for growth or funding?",
        a: "We build the financial plan and forecasts that growth and funding conversations rely on.",
      },
    ],
  },
  {
    slug: "cleanup-catch-up",
    title: "Cleanup & Catch-up",
    summary: "Behind on the books? We bring them current and correct",
    description: "Get your books back on track with our comprehensive cleanup and catch-up services.",
    icon: "RefreshCw",
    features: [
      "Historical data cleanup",
      "Multi-period catch-up",
      "Error correction",
      "System migration",
      "Compliance restoration",
    ],
    overview: [
      "Months — or years — behind is more common than anyone admits, and it gets more expensive the longer it waits. We work through the backlog period by period: reconciling accounts, correcting misclassifications, and rebuilding the history your tax returns and lenders depend on.",
      "Once the books are current we can keep them that way, so the cleanup is the last one you need.",
    ],
    forWho: {
      cpa: "Take on the clients who arrive with a year of unreconciled books. We clear the backlog so your team can get straight to the return.",
      business:
        "Get caught up before a tax deadline, a funding round or a sale — without the stress of doing it yourself.",
    },
    outcomes: ["Backlog cleared", "Errors corrected", "Compliance restored"],
    tools: ["QuickBooks", "Xero", "Sage"],
    faqs: [
      {
        q: "How far behind is too far?",
        a: "There is no such thing. We have caught up multi-year backlogs; it is a question of scope and sequence, which we set out before we start.",
      },
      {
        q: "How long does a cleanup take?",
        a: "It depends on the number of periods and the volume of transactions. You get a scoped timeline after the initial review.",
      },
      {
        q: "Can you migrate us to new software at the same time?",
        a: "Yes — system migration is often the cleanest point to correct historical errors.",
      },
    ],
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
