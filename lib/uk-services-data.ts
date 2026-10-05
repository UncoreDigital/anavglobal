import type { Service } from "@/lib/services-data";

/**
 * The UK service lines — source of truth for /uk/services and its detail pages.
 *
 * Provenance: the client pointed us at posaccounts.com/uk-accounting.php as the
 * reference for UK content. From it we took:
 *   - the four service lines and their names,
 *   - the "Scope of Work" items (→ `features`) and "Our Process" steps
 *     (→ `process`) — these are standard UK compliance terms (MTD, CT600,
 *     iXBRL, SA100, RTI, CIS),
 *   - the closing line of each section (→ `tagline`), lightly reworded.
 *
 * Everything else — summaries, descriptions, overviews, who-it's-for, FAQs —
 * is written fresh in ANAV's voice. That is deliberate: the same paragraphs on
 * two companies' domains get one of them treated as a duplicate by search
 * engines. POS Accounts' own contact details (London address, +44 number,
 * email) are NOT used anywhere; the UK site uses ANAV's Luton office.
 *
 * ⚠️ CLIENT TO CONFIRM: that ANAV offers each of these in the UK as described.
 */
export const ukServices: Service[] = [
  {
    slug: "bookkeeping-vat",
    title: "Bookkeeping & VAT",
    summary: "MTD-compliant bookkeeping, reconciliations and VAT returns",
    description:
      "Day-to-day bookkeeping in Xero, QuickBooks or Sage, reconciled every month and backed by VAT returns submitted through Making Tax Digital.",
    icon: "BookOpen",
    features: [
      "Transaction posting in Xero, QuickBooks and Sage",
      "Bank and control account reconciliations",
      "VAT return preparation",
      "MTD-compliant VAT submissions",
      "Management accounts",
      "Accruals and prepayments",
      "Year-end file preparation",
    ],
    process: [
      "Chart of accounts review",
      "MTD system set-up",
      "Agreed monthly close timetable",
      "VAT review and exception reporting",
      "Partner-level summary reports",
    ],
    tagline: "Clean, compliant and MTD-ready.",
    overview: [
      "Making Tax Digital has turned bookkeeping from a year-end clean-up into a quarterly obligation. We keep your — or your clients' — records current every month: transactions posted, bank and control accounts reconciled, accruals and prepayments in place, so each VAT quarter starts from figures you can trust.",
      "VAT returns are prepared from those reconciled books, reviewed for exceptions before anything is filed, and submitted through MTD-compatible software. Each month closes with a short partner-level summary rather than a ledger to read.",
    ],
    forWho: {
      cpa: "Hand over bookkeeping and VAT across your client base. We work inside your practice's Xero, QuickBooks or Sage files, to your chart of accounts, and send every return to your reviewers before submission.",
      business:
        "Keep your books and VAT on schedule without hiring. Your records stay MTD-compliant all year, and every return is checked before it goes to HMRC.",
    },
    outcomes: ["MTD-ready all year", "Reconciled every month", "VAT reviewed before filing"],
    tools: ["Xero", "QuickBooks", "Sage"],
    faqs: [
      {
        q: "Are your VAT submissions MTD-compliant?",
        a: "Yes. VAT returns are prepared from digital records and submitted through MTD-compatible software — the same Xero, QuickBooks or Sage file the records live in.",
      },
      {
        q: "Can you take over books that are behind?",
        a: "Yes. We bring the ledger up to date period by period and reconcile it before the next VAT return is due, so the catch-up and the compliance deadline are handled together.",
      },
      {
        q: "Who submits the VAT return to HMRC?",
        a: "That is agreed at onboarding. Practices usually review and submit under their own agent credentials; for businesses we work with directly, we agree the approval and submission arrangement with you first.",
      },
    ],
  },
  {
    slug: "year-end-accounts-corporation-tax",
    title: "Year-End Accounts & Corporation Tax",
    summary: "Statutory accounts, CT600 and iXBRL, prepared for partner review",
    description:
      "Year-end accounts and working papers prepared from the trial balance, with CT600 returns and iXBRL tagging ready for your review and filing.",
    icon: "CalendarCheck",
    features: [
      "Year-end accounts preparation",
      "Working papers file",
      "CT600 preparation",
      "iXBRL tagging",
      "Trial balance adjustments",
      "Directors' report support",
      "HMRC compliance checks",
    ],
    process: [
      "Trial balance review",
      "Adjustments and reconciliation",
      "Draft accounts preparation",
      "Internal quality check",
      "Partner review and delivery",
    ],
    tagline: "More year-end capacity, without overloading your team.",
    overview: [
      "Year-end is where most practices run out of hands. We start from the trial balance, post the adjustments it needs, and build a complete working-papers file alongside the draft accounts — so your reviewer can see how every figure was reached.",
      "The Corporation Tax return follows from the same file: CT600 prepared, accounts and computations tagged in iXBRL, and HMRC compliance checks completed. Every file passes an internal quality check before it reaches partner review.",
    ],
    forWho: {
      cpa: "Clear the year-end queue without temporary staff. Files arrive with working papers and a draft set of accounts, ready for partner review.",
      business:
        "Get your year-end accounts and Corporation Tax return prepared properly and on time, reviewed before anything is filed.",
    },
    outcomes: ["Review-ready files", "CT600 & iXBRL", "Quality-checked"],
    tools: ["Xero", "QuickBooks", "Sage"],
    faqs: [
      {
        q: "Do you prepare iXBRL-tagged accounts?",
        a: "Yes. Accounts and tax computations are tagged in iXBRL as part of preparing the CT600, so the return is ready to file once approved.",
      },
      {
        q: "What do you need from us?",
        a: "Usually the trial balance or access to the bookkeeping file, the prior-year accounts, and year-end information such as fixed asset additions, loans and director transactions. We send a checklist at the start of each job.",
      },
      {
        q: "Who files with Companies House and HMRC?",
        a: "We prepare everything in the required format. Filing is agreed per engagement — most practices file under their own credentials after review.",
      },
    ],
  },
  {
    slug: "self-assessment-personal-tax",
    title: "Self-Assessment & Personal Tax",
    summary: "SA100s, partnership returns and capital gains, ahead of the January peak",
    description:
      "Self-assessment and personal tax returns prepared to review-ready, with the extra capacity to get through the January peak.",
    icon: "FileText",
    features: [
      "SA100 preparation",
      "Partnership returns",
      "Capital gains calculations",
      "Rental income schedules",
      "Dividend and director tax planning support",
      "HMRC correspondence drafting",
    ],
    process: [
      "Document checklist issued",
      "Draft return preparation",
      "Compliance review",
      "Query resolution",
      "Final submission pack",
    ],
    tagline: "Peak-season support without hiring temporary staff.",
    overview: [
      "Self-assessment arrives all at once. We work through the client list from the autumn: checklists out early, returns drafted as records arrive, and every return compliance-reviewed before it reaches you.",
      "Beyond the SA100 we prepare partnership returns, capital gains computations and rental income schedules, support dividend and director planning, and draft replies to HMRC correspondence when queries come back.",
    ],
    forWho: {
      cpa: "Add self-assessment capacity for the January peak without temporary hires. Returns come back drafted, reviewed and packaged for your sign-off.",
      business:
        "Directors, landlords and sole traders get their returns prepared early and accurately, with nothing left to the last week of January.",
    },
    outcomes: ["Started early", "Review-ready returns", "Queries handled"],
    tools: [],
    faqs: [
      {
        q: "When should we start sending returns?",
        a: "As early as you can — we can begin as soon as a client's records for the tax year are in. Starting in the autumn is what keeps January manageable.",
      },
      {
        q: "Do you handle partnership and property income?",
        a: "Yes — partnership returns, rental income schedules and capital gains calculations are all part of this service.",
      },
      {
        q: "Can you help with HMRC enquiries?",
        a: "We draft replies to HMRC correspondence for your review. Representation itself stays with the practice or the taxpayer's appointed agent.",
      },
    ],
  },
  {
    slug: "payroll-cis",
    title: "Payroll & CIS",
    summary: "Monthly payroll, RTI, auto-enrolment and CIS returns",
    description:
      "Monthly payroll with RTI submissions, auto-enrolment pension support and CIS returns for construction clients — reconciled at year end.",
    icon: "Wallet",
    features: [
      "Monthly payroll processing",
      "RTI submissions",
      "Auto-enrolment pension support",
      "CIS return preparation",
      "P60 and P45 generation",
      "Year-end payroll reconciliation",
    ],
    process: [
      "Employee data verification",
      "Payroll calculation",
      "RTI submission",
      "Payslips and reports distributed",
      "Compliance review",
    ],
    tagline: "Every pay run on time, every submission reconciled.",
    overview: [
      "Each pay run follows the same checklist: starters, leavers and changes verified, pay and deductions calculated, payslips and reports issued, and the Full Payment Submission made to HMRC through RTI.",
      "We support auto-enrolment duties with your pension provider, prepare monthly CIS returns for construction clients, issue P45s and P60s, and reconcile payroll to the ledger at year end so the figures agree.",
    ],
    forWho: {
      cpa: "Offer payroll and CIS to your clients without building a payroll bureau. We process under your practice's oversight, in the software you already use.",
      business: "Pay your team correctly and on time, with RTI, pensions and CIS handled for you.",
    },
    outcomes: ["On time, every run", "RTI submitted", "Reconciled at year end"],
    tools: ["Xero", "QuickBooks", "Sage"],
    faqs: [
      {
        q: "Do you make the RTI submissions?",
        a: "Yes — the Full Payment Submission is made for each pay run once the payroll has been approved.",
      },
      {
        q: "Can you help with pension auto-enrolment?",
        a: "We support the ongoing duties — assessing staff, calculating contributions and preparing the data for your pension provider.",
      },
      {
        q: "Do you prepare CIS returns?",
        a: "Yes. Monthly CIS returns are prepared for contractors, along with deduction statements for subcontractors.",
      },
    ],
  },
];

export const ukServiceSlugs = ukServices.map((s) => s.slug);
