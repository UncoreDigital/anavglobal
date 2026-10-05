/**
 * Page copy that is not a service or an industry.
 *
 * Provenance is marked per block:
 *   VERBATIM — carried over unchanged from the Emergent build
 *   NEW      — written for this build; the client should review it
 *
 * Headline figures (500+ clients etc.) are NOT here — they live in Supabase
 * `site_settings` so the client can update them without a deploy. See
 * lib/settings.ts.
 */

/* VERBATIM headline and lead; chips NEW, drawn from claims the old site made. */
export const hero = {
  eyebrow: "Serving businesses across the USA, UK & India",
  headline: "Next-Gen Accounting for",
  headlineAccent: "CPAs & Business Owners",
  lead: "Streamline your finances with tech-driven outsourced bookkeeping. We help growing businesses simplify accounting, improve accuracy, and thrive.",
  primaryCta: { label: "Book a Free Consultation", href: "/contact" },
  secondaryCta: { label: "Explore Services", href: "/services" },
  chips: ["QuickBooks ProAdvisor & Xero certified", "24-hour turnaround on routine work", "Offices in USA, UK & India"],
};

/* NEW — the two audiences the old hero named, given a section each. */
export const audiences = [
  {
    id: "cpa",
    eyebrow: "For CPA & Accounting Firms",
    title: "An extension of your team, not another vendor",
    body: "Scale your capacity without scaling your payroll. Our accountants work inside your systems and to your standards, so your people review and advise while we handle production.",
    points: [
      "Bookkeeping, write-up and payroll across your client base",
      "Tax returns prepared to your review checklist",
      "Overnight turnaround across time zones",
      "Extra hands for busy season — without hiring",
    ],
    cta: { label: "Partner with us", href: "/industries/cpa-firms" },
  },
  {
    id: "business",
    eyebrow: "For Business Owners",
    title: "A complete finance team, at a fraction of the cost",
    body: "Get your evenings back. From daily bookkeeping to payroll, tax and monthly management reports, we keep your numbers accurate, current and useful.",
    points: [
      "Books reconciled and closed every month",
      "Payroll run accurately and on time",
      "Tax preparation and planning",
      "Monthly reports that explain your numbers",
    ],
    cta: { label: "See our services", href: "/services" },
  },
] as const;

/* VERBATIM — "Why Choose Us / Your Trusted Accounting Partner". */
export const whyUs = {
  eyebrow: "Why Choose Us",
  title: "Your Trusted",
  accent: "Accounting Partner",
  lead: "Experience, expertise, and dedication to your financial success",
  items: [
    {
      title: "Experienced Team",
      body: "Decade+ of experience with certified professionals including CPAs, EAs, and QuickBooks ProAdvisors",
      icon: "Award",
    },
    {
      title: "24/7 Support",
      body: "Round-the-clock availability ensuring your questions are answered and issues resolved promptly",
      icon: "Headphones",
    },
    {
      title: "Cost-Effective",
      body: "Professional services at competitive rates, lower than hiring individual bookkeepers",
      icon: "PiggyBank",
    },
    {
      title: "Cloud-Based Solutions",
      body: "Leverage latest technology for real-time access to your financial data anytime, anywhere",
      icon: "Cloud",
    },
    {
      title: "Customized Approach",
      body: "Tailored solutions designed specifically for your business needs and industry requirements",
      icon: "SlidersHorizontal",
    },
    {
      title: "Fast Turnaround",
      body: "24-hour turnaround for routine tasks, ensuring you always have up-to-date financial information",
      icon: "Zap",
    },
  ],
};

/* VERBATIM — "How It Works". */
export const process = [
  {
    title: "Discovery & Consultation",
    body: "We start with understanding your business needs, current challenges, and goals to define the right engagement model.",
    icon: "Search",
  },
  {
    title: "Onboarding",
    body: "Seamless onboarding process with dedicated team assignment and clear communication channels setup.",
    icon: "UserCheck",
  },
  {
    title: "Transition & Setup",
    body: "Smooth transition of your accounting data and systems with minimal disruption to your operations.",
    icon: "Database",
  },
  {
    title: "Ongoing Service Delivery",
    body: "Consistent, high-quality service delivery with regular reporting and proactive communication.",
    icon: "BarChart3",
  },
];

/* VERBATIM — "Our Service Delivery Process" (from the old services page). */
export const deliveryProcess = [
  { title: "Initial Consultation", body: "We discuss your needs and create a customized service plan" },
  { title: "Setup & Integration", body: "Seamless onboarding and system integration with your existing tools" },
  { title: "Regular Service Delivery", body: "Consistent execution with dedicated team support and regular updates" },
  { title: "Reporting & Analysis", body: "Detailed monthly reports with actionable insights for your business" },
];

/*
  NEW — engagement models. The old site's discovery step promises "the right
  engagement model" but never says what the models are. These four are the
  shapes this kind of engagement takes in practice. ⚠️ CLIENT TO CONFIRM that
  they offer all four, and rename to match how they sell.
*/
export const engagementModels = [
  {
    name: "Dedicated Accountant",
    body: "A named accountant — or a small team — working your hours inside your systems, as an extension of your staff.",
    bestFor: "CPA firms with steady monthly volume",
    icon: "UserCheck",
  },
  {
    name: "Monthly Managed Service",
    body: "A fixed monthly scope — bookkeeping, payroll, management accounts — delivered on an agreed calendar.",
    bestFor: "Business owners who want it handled",
    icon: "CalendarCheck",
  },
  {
    name: "Project & Catch-up",
    body: "Defined-scope work with a start and an end: cleanups, back-years, system migrations.",
    bestFor: "Books that are behind or changing systems",
    icon: "ClipboardList",
  },
  {
    name: "Seasonal Support",
    body: "Extra preparation and bookkeeping capacity for tax season and year end, scaled back afterwards.",
    bestFor: "Firms facing peak-season crunch",
    icon: "Layers",
  },
];

/* VERBATIM — the About page. */
export const about = {
  eyebrow: "About ANAV Global",
  title: "Your Partner in",
  accent: "Financial Excellence",
  intro: [
    "For over a decade, ANAV Global has been providing comprehensive accounting and bookkeeping services to small and mid-sized businesses across the United States and United Kingdom.",
    "Our mission is to streamline your financial operations through expert guidance, cutting-edge cloud technology, and a dedicated team committed to your success.",
  ],
  story: [
    "ANAV Global was founded with a simple yet powerful vision: to provide small and mid-sized businesses with access to the same caliber of accounting services that large corporations enjoy, at a fraction of the cost.",
    "What started as a small bookkeeping practice has grown into a comprehensive financial services firm serving over 500 clients across various industries. Our success is built on three pillars: expertise, technology, and genuine care for our clients' success.",
    "Today, we combine the personal touch of a boutique firm with the capabilities of modern cloud-based accounting technology. Our team of certified professionals works around the clock to ensure your financial records are accurate, compliant, and provide the insights you need to make informed business decisions.",
  ],
  pillars: ["Expertise", "Technology", "Genuine care"],
};

/* VERBATIM — "Our Core Values". */
export const values = [
  { title: "Accuracy", body: "Precision in every transaction and report", icon: "Target" },
  { title: "Integrity", body: "Honest, transparent, and ethical practices", icon: "ShieldCheck" },
  { title: "Partnership", body: "Your success is our success", icon: "Handshake" },
  { title: "Innovation", body: "Embracing technology for better solutions", icon: "Sparkles" },
];

/* VERBATIM — "Certified & Qualified Professionals". */
export const certifications = [
  "Certified Public Accountants (CPA)",
  "QuickBooks ProAdvisor Certified",
  "Sage Certified Consultants",
  "Xero Advisor Certified",
  "Enrolled Agents (EA)",
  "HMRC Tax Filing Experts",
];

/* VERBATIM — "Why Industry-Specific Expertise Matters". */
export const industryExpertise = [
  {
    title: "Industry Knowledge",
    body: "Deep understanding of industry-specific regulations, tax codes, and best practices",
    icon: "GraduationCap",
  },
  {
    title: "Optimized Processes",
    body: "Accounting workflows designed specifically for your industry's unique needs",
    icon: "Workflow",
  },
  {
    title: "Compliance Assurance",
    body: "Stay compliant with industry-specific regulations and reporting requirements",
    icon: "ShieldCheck",
  },
];

/*
  "Tools and Applications" — the six the old site listed, plus Sage (named in
  the certifications) and Gusto (common payroll stack). Vendor logos are
  third-party trademarks; Expensify has no local asset and renders as a
  typeset wordmark in an identical tile.
*/
export type SoftwareTool = { name: string; logo?: string };

export const software: SoftwareTool[] = [
  { name: "QuickBooks", logo: "/assets/software/quickbooks.webp" },
  { name: "Xero", logo: "/assets/software/xero.webp" },
  { name: "Sage", logo: "/assets/software/sage.webp" },
  { name: "Bill.com", logo: "/assets/software/bill-com.webp" },
  { name: "Expensify" },
  { name: "ADP", logo: "/assets/software/adp.webp" },
  { name: "Paychex", logo: "/assets/software/paychex.webp" },
  { name: "Gusto", logo: "/assets/software/gusto.webp" },
];

/*
  NEW — security. Kept to what follows directly from the delivery model the old
  site describes (cloud-based, working in the client's own systems). ⚠️ CLIENT
  TO CONFIRM before adding anything stronger — NDAs, device policies, or any
  certification wording. A security claim that is not true is a liability, not
  a selling point.
*/
export const security = [
  {
    title: "Your data stays in your systems",
    body: "We work inside your cloud accounting software. You own the file, and you can review or revoke our access at any time.",
    icon: "Lock",
  },
  {
    title: "Access only where it is needed",
    body: "Each engagement is staffed by a named team, and access is granted per person and per system — not shared logins.",
    icon: "KeyRound",
  },
  {
    title: "Confidentiality by default",
    body: "Client information is used only to deliver the work you engage us for, and never shared with third parties.",
    icon: "ShieldCheck",
  },
];

/* NEW — FAQs, answered from the old site's own claims. */
export const faqs = [
  {
    q: "Who do you work with?",
    a: "Two groups: CPA and accounting firms who want more capacity, and small and mid-sized businesses who want their finance function handled. We serve clients in the USA, the UK and India.",
  },
  {
    q: "Which accounting software do you use?",
    a: "Whatever you already use. Our team is certified on QuickBooks and Xero, works in Sage, and handles bill-pay, expense and payroll platforms including Bill.com, Expensify, ADP, Paychex and Gusto.",
  },
  {
    q: "How does getting started work?",
    a: "Four steps: a discovery call to understand your needs, onboarding with a dedicated team assigned, a careful transition of your data and systems, and then ongoing delivery with regular reporting.",
  },
  {
    q: "How quickly do you turn work around?",
    a: "Routine tasks are turned around within 24 hours. With offices in the USA, UK and India, work submitted at the end of your day is often done by the start of the next.",
  },
  {
    q: "Our books are months behind. Can you help?",
    a: "Yes. Cleanup and catch-up is a dedicated service — we reconcile period by period, correct errors and bring everything current, then keep it that way if you want us to.",
  },
  {
    q: "Do you work with CPA firms as an outsourcing partner?",
    a: "Yes — CPA firms are one of our core client groups. We prepare inside your systems and to your standards, and your team reviews and signs off.",
  },
  {
    q: "How do you keep our financial data secure?",
    a: "We work inside your own cloud accounting systems rather than copying data out, access is granted per person, and you can review or revoke it at any time.",
  },
  {
    q: "What does it cost?",
    a: "It depends on scope and volume, which is why the first conversation is a free consultation. Our services are priced to cost less than hiring an individual bookkeeper.",
  },
];

/* VERBATIM — closing band. */
export const ctaBand = {
  heading: "Ready to Transform Your Accounting?",
  body: "Get started with ANAV Global today and experience the difference professional accounting services can make",
  cta: { label: "Book a Free Consultation", href: "/contact" },
};

/* The contact form's service picker — the old form's options, verbatim. */
export const serviceInterests = [
  "Bookkeeping & Accounting",
  "Payroll Services",
  "Tax Preparation & Filing",
  "Management Accounts",
  "Business Advisory",
  "Cleanup & Catch-up",
];

/* NEW — lets the admin route an enquiry to the right office. */
export const countries = ["United States", "United Kingdom", "India", "Other"];

/* NEW — who is asking. */
export const enquirerTypes = ["CPA / accounting firm", "Business owner", "Other"];
