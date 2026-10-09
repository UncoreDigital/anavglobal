# ANAV Global

Marketing site + admin panel for **ANAV Global** — outsourced bookkeeping, payroll, tax and management accounts for CPA firms and growing businesses across the USA, UK and India.

This replaces the Emergent-built site at anavglobal.com: a client-rendered React app titled "Emergent | Fullstack App", with a "Made with Emergent" badge, no server rendering (so nothing for search engines to read), a contact form that emailed submissions and stored nothing, and stock-photo testimonials.

Built by [Uncore Digital](https://uncoredigital.com/), on the same stack and conventions as ADSC (ADAS Globus Pro) and TaxElixir.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + CSS custom properties (`app/globals.css`) |
| Animation | framer-motion, variants in [`lib/motion.ts`](lib/motion.ts) |
| Scrolling | Lenis ([`SmoothScroll.tsx`](components/SmoothScroll.tsx)) |
| Database / Auth / Storage | Supabase |
| Rich text | TipTap |
| Validation | Zod (one schema shared by the form and the API route) |

Marketing pages are static / ISR (300 s) and also revalidate immediately whenever the admin saves. `/admin/*` is a client-rendered island behind Supabase Auth, `noindex`.

## Getting started

```bash
npm install
cp .env.example .env.local     # fill in the values
npm run dev                    # http://localhost:3000
```

The site runs without Supabase: the contact form returns a "not configured" message, the admin shows a setup panel, and every figure, contact detail and team member falls back to what the old site published.

> **Windows + Git Bash:** if `next build` fails with `PageNotFoundError: Cannot find module for page`, it is the `/d/…` vs `D:\…` drive-letter casing. Build from PowerShell, cmd or the VS Code terminal instead. Vercel is unaffected.

### Supabase setup

1. Create a Supabase project; copy the URL and anon key into `.env.local`.
2. **SQL Editor → New query**, run in order:
   - [`0001_init.sql`](supabase/migrations/0001_init.sql) — tables, row-level security, storage bucket, seeds (settings, the seven team members, the five old testimonials **unpublished**)
   - [`0002_seed_insights.sql`](supabase/migrations/0002_seed_insights.sql) — three articles as **drafts**
   - [`0003_lead_notification.sql`](supabase/migrations/0003_lead_notification.sql) — new-lead email (replace `<PROJECT_REF>` first; prerequisites are in the file header)
   - [`0004_regions.sql`](supabase/migrations/0004_regions.sql) — US / UK country sites: lead site, post "Show on", UK phone setting. The site works before this is run (forms retry without the column; posts show on both sites), so it can go in later.
   - [`0005_client_changes.sql`](supabase/migrations/0005_client_changes.sql) — client change list (October 2026): Saturday office hours → Closed, Niket Bhatt's LinkedIn link. Never overwrites a value already edited in the admin.
   - [`0006_seed_blog_tax.sql`](supabase/migrations/0006_seed_blog_tax.sql), [`0007_seed_blog_business.sql`](supabase/migrations/0007_seed_blog_business.sql), [`0008_seed_blog_bookkeeping.sql`](supabase/migrations/0008_seed_blog_bookkeeping.sql) — the client's 44 blog articles (U.S. tax for CPA firms and individuals, small business tax, tax planning, bookkeeping, industries), as **drafts** on the U.S. site. 0008's header has a one-statement "publish all" for after review.
3. **Authentication → Users → Add user** for each admin. There is no public sign-up.
4. Sign in at `/admin/login`.

All three migrations are idempotent and were tested twice-run against Postgres, along with the RLS rules (anon can submit a lead but not read one; drafts and unpublished rows are invisible to the public).

### Scripts

```bash
npm run dev         # dev server
npm run build       # production build
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
npm run assets      # rebuild logo, favicon, photo and OG assets from assets-src/
```

---

## The admin panel (`/admin`)

| Section | What the client can do |
|---|---|
| **Dashboard** | Unactioned / recent / total leads, latest enquiries, drafts and hidden testimonials waiting on them |
| **Leads** | Every contact-form enquiry: search, filter by status, set status, private notes, reply by email, delete, export CSV |
| **Insights** | Write, edit, publish and delete blog posts — rich text, cover image upload, SEO fields |
| **Team** | Add, edit, reorder, hide or remove people; upload headshots |
| **Testimonials** | Add, edit, publish/hide quotes (publishing asks for confirmation every time) |
| **Site Settings** | Headline figures, email, phones, WhatsApp, office hours, social links, booking link |

Every save revalidates the public site immediately ("Saved and live").

### New-lead emails

`contact form → POST /api/contact → insert into leads → Postgres trigger (pg_net) → lead-notification edge function → SMTP`. The email is fired by the database, not the API route, so a mail outage can never lose a lead. Setup steps are in the header of `0003_lead_notification.sql`; diagnostics are at the bottom of it.

---

## Country sites — USA / UK

Modelled on the flag dropdown at [unisonglobus.com](https://unisonglobus.com/): each country is a full parallel site.

| | US (default) | UK |
|---|---|---|
| URL | `/` — every existing URL unchanged | `/uk/…` |
| Services | the six from anavglobal.com ([`lib/services-data.ts`](lib/services-data.ts)) | four UK lines ([`lib/uk-services-data.ts`](lib/uk-services-data.ts)) |
| Home copy, engagement models, FAQs, CTA, software | [`lib/content.ts`](lib/content.ts) | [`lib/region-content.ts`](lib/region-content.ts) |
| Industries | 17: the six from anavglobal.com plus 11 the client added in October 2026 — hotels, convenience stores, cannabis, construction, rental property, trusts & exempt entities, law firms, medical, wholesale, drop shipping, bullion & jewelry ([`lib/industries-data.ts`](lib/industries-data.ts)) | the same six, UK wording and UK services ([`lib/uk-industries-data.ts`](lib/uk-industries-data.ts)); CPA Firms is **Accounting Practices** |
| Phone | US numbers | `phone_uk` from Admin → Site Settings (WhatsApp shown until set) |

- **The switcher** is in the top bar (md and up), at the top of the mobile menu, and in the footer. Choosing a country goes to the *same page* on the other site where there is one (`/about` ↔ `/uk/about`, US payroll ↔ UK payroll & CIS, CPA firms ↔ accounting practices) and the nearest sensible page where there is not — mapping in [`lib/regions.ts`](lib/regions.ts) → `switchHref`.
- **No automatic geo-IP redirect**: the brief was "default US", and IP redirects misroute travellers, VPN users and crawlers. (Unison loads one; it currently 404s.) If wanted later, it belongs in `middleware.ts` using Vercel's `x-vercel-ip-country` header — and only as a one-time suggestion, never a forced redirect.
- **SEO**: every page on both sites declares `hreflang` en-US / en-GB / x-default, UK titles carry "UK", and the sitemap lists both sites with alternates.
- **Admin**: Leads show which site an enquiry came from (badge, filter, CSV column, and "UK" in the email subject). Insights posts have a **Show on** setting — both sites, US only or UK only.
- **Adding a page to both sites**: build it as a component in `components/pages/` taking `region`, add a thin route file under `app/(marketing)/(us)/` and `app/(marketing)/uk/`, and add its path to `SHARED_PATHS` in `lib/regions.ts`.

**UK content provenance.** The client pointed us at [posaccounts.com/uk-accounting.php](https://posaccounts.com/uk-accounting.php). We took its four service lines, their scope-of-work and process steps (standard UK compliance terms — MTD, CT600, iXBRL, SA100, RTI, CIS) and its five engagement models; everything else is written fresh for ANAV, so the two domains do not carry duplicate copy. **None of POS Accounts' contact details** (London address, +44 number, email) are used — the UK site uses ANAV's Luton office.

## Where content lives

| Content | Source of truth |
|---|---|
| The six services | [`lib/services-data.ts`](lib/services-data.ts) |
| The industries | [`lib/industries-data.ts`](lib/industries-data.ts) (UK: [`lib/uk-industries-data.ts`](lib/uk-industries-data.ts)) |
| Hero, why-us, process, values, certifications, FAQs, engagement models, security | [`lib/content.ts`](lib/content.ts) |
| Brand, offices, navigation, feature flags | [`lib/site.ts`](lib/site.ts) |
| Figures, contact details, social links | Supabase `site_settings` (Admin → Site Settings) |
| Team | Supabase `team_members` (fallback: [`lib/team.ts`](lib/team.ts)) |
| Testimonials, blog posts | Supabase |

Nav, footer, sitemap and pages all render from the data files, so a service cannot exist without appearing everywhere, or drift from the page describing it.

**Every block is marked VERBATIM (carried over from the old site) or NEW (written for this build)** so the client only has to review what is new to them.

---

## ⚠️ Client decisions before launch

1. **Testimonials.** The five quotes on the old site carried Unsplash stock headshots — the signature of generated placeholder content. They are imported **unpublished**. Publish only quotes from real clients who agreed to be quoted; until one is published the section does not render.
2. **Engagement models** (`lib/content.ts`) are NEW. The old site promised "the right engagement model" without naming any. Confirm all four are offered.
3. **Security copy** (`lib/content.ts → security`) is deliberately modest. Add NDAs, device policies or certifications only if they are true.
4. **Canonical domain** — apex `anavglobal.com` (default) or `www`. Set `NEXT_PUBLIC_SITE_URL`; redirect the other at the host.
5. **Social links** — the old footer's icons all pointed at `#`. Add real URLs in Admin → Site Settings; icons appear only when set.
6. **Legal pages** are drafts pending legal review and say so on the page.
7. **The three articles** are drafts with fresh bodies (the old site had titles only, with bylines that are not ANAV staff). "Tax Planning Strategies for 2025" became a year-agnostic title.
8. **Claims kept from the old site** — "24/7 support", "decade+ of experience", "CPAs, EAs" on the team, "lower than hiring individual bookkeepers" — are the client's own and should be true.
9. **UK site** — confirm ANAV offers all four UK services as described, review the UK wording of the six industry pages, confirm the UK engagement models and their "Each model includes" list (defined SLAs, weekly reporting, account manager — these mirror POS Accounts' page and must be true of ANAV), add a **UK phone number** in Admin → Site Settings, and confirm the team is happy adapting POS Accounts' service structure.
10. **Vendor logos** (QuickBooks, Xero, Sage, Bill.com, ADP, Paychex, Gusto; tax software Drake, Lacerte, ProConnect, TurboTax, TaxCalc, BrightPay; the Wolters Kluwer and Thomson Reuters symbols beside CCH and UltraTax CS) are third-party trademarks, shown to identify software the team works in. Sources: `assets-src/software/`.
11. **Client change list, October 2026** — tracked in the client's sheet (status copy in `client-changes/`, not committed). Still open: **LinkedIn links** for six team members (Admin → Team), the **USA tax FAQs** the client is sending (for the Tax Preparation & Filing page), and confirmation that WhatsApp support is still "24/7". To review before publishing: the **44 blog drafts**, the **11 new industry pages** and the **tax forms list** on the US tax service page.

---

## Brand

**Palette** — sampled from the mark (`assets-src/brand/logo-master.png`): royal blue `#2C57E1` (primary), teal `#0EA09F`, green `#03CE7F` (accent — CTA fills only, with a navy label at 8.7:1; never text on white, where it is 2.1:1), mint `#C9F3F1` (surfaces), wordmark navy `#054698`. Contrast figures in `globals.css` are measured.

**Logo** — the supplied file is a 1024² square on opaque white. [`scripts/build-logo-assets.js`](scripts/build-logo-assets.js) cuts it apart: the mark is keyed with a border flood fill so its light mint stroke stays opaque on navy; the wordmark is keyed globally so its letter counters become transparent, and is also emitted in white. The header pairs the two horizontally (the old site's own arrangement), with the letterforms untouched. Edge pixels are un-premultiplied against white so there is no halo on dark backgrounds.

**Motif** — the "AV line" ([`components/brand/AvLine.tsx`](components/brand/AvLine.tsx)): the mark's light stroke, traced and extended into a rising chart line. It is the only decorative device on the site.

## Images

Team headshots are the client's own (from the old site), cropped 4:5 top-anchored and converted to WebP. Industry and page photography are the same Unsplash/Pexels frames the old site used, optimised locally (no hotlinking); the eleven industries added in October 2026 use Unsplash photos listed in [`assets-src/industries/SOURCES.md`](assets-src/industries/SOURCES.md).

## Responsive QA

A full responsive UI/UX audit (32 routes × 17 viewports, 279 interaction checks) and its fixes are recorded in [`docs/RESPONSIVE-AUDIT.md`](docs/RESPONSIVE-AUDIT.md).

## Redirects

The old SPA's likely paths (`/about-us`, `/contact-us`, `/privacy`, `/terms`, `/data-security`, `/blogs`) 308 to their equivalents — see `next.config.mjs`.
