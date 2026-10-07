# RESPONSIVE UI/UX AUDIT

**Project:** ANAV Global — marketing site + admin panel (Next.js 14 App Router, Tailwind CSS, framer-motion, Lenis, Supabase)
**Date:** 5 October 2026 · **Build audited:** production build (`next build && next start`), plus a dev build with temporary fixture pages for data-dependent components (removed afterwards)
**Method:** Headless Chrome (puppeteer-core) driving the real rendered app. Not source-reading alone.

| Scope | Coverage |
|---|---|
| Routes | 32: every public page (6 service + 6 industry detail pages individually), 404, admin login, and all 7 admin screens |
| Viewports | 17: the 12 requested (1920×1080 … 320×568) plus landscape 1366×1024, 1024×768, 932×430, 844×390, 568×320 |
| Automated measurements | 544 route × viewport runs: page-level `scrollWidth`, elements outside the viewport, text clipped by `overflow` ancestors, unclipped content spill, header element collisions, tap-target sizes, broken/distorted images, console errors, failed requests |
| Interaction tests | 265 checks: mobile drawer (open, lock, overlay, Escape, link-close, back/forward), desktop dropdowns (hover + keyboard), sticky header, anchor offsets, floating button vs. controls, contact-form validation and long input, FAQ accordion, skip link, admin sidebar drawer, admin modals at 6 widths, post editor at 320/390 |
| Data-dependent components | Testimonials carousel, blog cards, article body, admin lists with long names/emails — via temporary fixture pages |
| Visual review | Screen-by-screen contact sheets (as a user scrolls) at 390, 360 and 320, plus folds at 768, 1024, 1280 and 1366 |

**Not verified:** real iOS Safari / Android devices (Chromium emulation only: safe-area insets, URL-bar resizing, iOS input zoom), live Supabase data (fixtures used instead), browser zoom (approximated by the 320–568 px viewports, which are what 200–400% zoom produces on a desktop), the form's "Sending…" loading state (requires a configured backend).

---

## Executive Summary

Overall status: **FAIL** *(before fixes; see the post-fix verification at the end)*

Overall assessment:
The site is solid from 360 px to 1920 px: no page-level horizontal overflow at any of those widths, no header collisions, no broken images, working navigation, dropdowns and keyboard access. It fails at **320 px**, where every public page scrolls sideways and the hamburger is partly off-screen, and on **blog articles**, where a long unbroken string (a pasted URL) blows out the page on every phone and tablet. Smaller problems: the "Powered by Uncore Digital" credit is covered by the floating WhatsApp button, a clipped hero chip at 1024–1279 px, and several accessibility gaps in focus management.

Total issues:
- P0: 0
- P1: 4
- P2: 9
- P3: 5

---

# 1. CRITICAL ISSUES

### [P1] Every public page scrolls horizontally at 320 px; hamburger partly off-screen

Page: All 23 public pages (shared header)
Route: `/`, `/services/*`, `/industries/*`, `/about`, `/team`, `/how-we-work`, `/faqs`, `/contact`, `/blog`, legal pages

Viewport: 320 × 568

Problem: The header row (logo + hamburger) needs ~335 px. At 320 px the page gains a 15 px horizontal scroll, and the "Open menu" button sits at x = 295–335, so 15 px of it is outside the screen. Because the layout viewport is now wider than the device, the mobile drawer also opens 30 px off the right edge (measured `left 68 right 350` on a 320 screen).

Expected: Logo and menu button fit inside 320 px; no horizontal scroll.

Actual: `documentElement.scrollWidth` = 335 on a 320 viewport; drawer partially off-screen.

Impact: Small-phone users (iPhone SE 1st gen, older Androids, and anyone at high zoom) get a page that wobbles sideways and a menu button that is partly cut.

Likely cause: `components/brand/Logo.tsx` size `md` (40 px mark + 16 px wordmark + a `whitespace-nowrap` 9.5 px tagline at 0.235em tracking) plus the header's `gap-6`.

Recommended fix: Scale the `md` / `lg` logo down one step below the `sm` breakpoint and tighten the header gap on mobile. No change at ≥640 px.

---

### [P1] /services: service cards overflow and cut off text at 320 px

Page: Services index
Route: `/services`

Viewport: 320 × 568

Problem: Each service card is 301 px wide inside a 280 px container. Heading, paragraphs, the "Explore Bookkeeping & Accounting" button and the feature list run 30 px past the right edge of the screen.

Expected: Cards fit the container; long button labels wrap.

Actual: 30 px page overflow; text cut at the right edge.

Impact: The main services page is visibly broken on small phones.

Likely cause: The `Button` base class is `whitespace-nowrap`, so the long "Explore {service}" label cannot wrap. The card's single-column `grid` sizes its track to the button's min-content width.

Recommended fix: Let these two buttons wrap (`whitespace-normal`, auto height) and give the grid `grid-cols-1` (minmax(0, 1fr)) so a child can never widen the track.

---

### [P1] /contact: form and contact cards wider than the screen at 320 px

Page: Contact
Route: `/contact`

Viewport: 320 × 568

Problem: Both cards measure 323 px (x = 20–343) on a 320 screen; 23 px page overflow.

Expected: Cards fit the container.

Actual: Horizontal scroll; right edges of the form and the contact card cut off.

Impact: The primary conversion page breaks on small phones.

Likely cause: The two-column layout is `grid lg:grid-cols-[…]`; below `lg` the implicit track is min-content-sized, and the unbreakable `accounting@anavglobal.com` (205 px at 14.5 px) sets that minimum.

Recommended fix: `grid-cols-1` on the grid; allow the email address to break (`break-all`).

---

### [P1] Blog articles: a long unbroken string overflows the page on all phones and tablets

Page: Blog post
Route: `/blog/[slug]` (verified with a fixture article)

Viewport: 1024 × 1366 (20 px overflow), 768 × 1024 (152 px), 430 (490 px) … 320 × 568 (600 px)

Problem: A long URL or unbroken word in an article body extends past the article column and the viewport. On mobile Chrome then zooms the whole page out to fit, shrinking the header and all text.

Expected: Long strings wrap inside the article column.

Actual: Up to 600 px of horizontal overflow; page rendered zoomed-out.

Impact: Any article where the admin pastes a link as text (very common) breaks on every phone and tablet. The content comes from the CMS, so this cannot be prevented by careful writing.

Likely cause: `.prose-anav` in `app/globals.css` has no `overflow-wrap` rule.

Recommended fix: `overflow-wrap: anywhere` on `.prose-anav`.

---

# 2. RESPONSIVE ISSUES

### [P2] Hero proof chip clipped at the right edge on small desktops / large tablets

Page: Home
Route: `/`

Viewport: 1024 × 768, 1024 × 1366 (all widths 1024–1279)

Problem: The floating "500+ clients served | 99% client satisfaction" chip is offset `-right-8` (−32 px) from the hero panel. At `lg` the container padding is only 32 px, so the chip reaches the viewport edge and the hero section's `overflow-hidden` clips "satisfaction".

Expected: Chip fully visible.

Actual: Right end of the chip cut off (measured hero grid 1016 px wide in a 984 px column).

Impact: The headline proof point is visibly truncated on the most common laptop widths.

Likely cause: `components/sections/Hero.tsx`, chip class `sm:-right-8`.

Recommended fix: Keep the overlap inside the gutter at `lg` (`-right-2`), restoring `-right-8` from `xl`.

---

### [P2] Footer logo tagline clipped at 320 px

Page: Footer on all public pages; 404 page logo
Route: all public routes, any unknown route

Viewport: 320 × 568

Problem: The large footer lockup is 313 px wide in a 280 px column. "ACCOUNTING EXCELLENCE" runs to x = 333 and is clipped by the footer's `overflow-hidden`. Same on the 404 page.

Expected: Lockup fits.

Actual: Tagline cut off at the right edge.

Impact: Visible brand defect on small phones.

Likely cause: Same as the header P1: the `lg` logo size is not responsive.

Recommended fix: Covered by the responsive logo-size fix.

---

# 3. MOBILE ISSUES

### [P2] iOS Safari will zoom in when a form field is focused

Page: Contact form; admin forms
Route: `/contact`, `/admin/*`

Viewport: all phones (iOS)

Problem: Inputs, select and textarea use 14.5 px (`.field`) and 13.5 px (`.field-sm`) text. iOS Safari auto-zooms any focused field under 16 px and leaves the page zoomed, which often leaves the user panning sideways.

Expected: No zoom on focus.

Actual: **Not verified on a device.** This is deterministic iOS behaviour, identified from the computed styles.

Impact: Every iPhone user filling in the contact form gets a zoomed, sideways-panning page.

Likely cause: `.field` / `.field-sm` in `app/globals.css` and inline textarea classes.

Recommended fix: 16 px text for form controls below `sm`, and the current sizes from `sm` up. No change on desktop.

---

### [P3] Mobile navigation controls smaller than the 44 px comfortable touch size

Page: Header (public), mobile drawer, admin mobile header and sidebar
Route: all

Viewport: < 1024 px

Problem: Hamburger 40 × 40, drawer close 36 × 36, admin "Open menu" 32 × 32, admin sidebar close 28 × 28.

Expected: ≥ 44 × 44 for primary navigation controls (Apple HIG / WCAG 2.5.5 AAA). All pass the WCAG 2.5.8 AA 24 px minimum.

Actual: As listed.

Impact: Slightly harder to hit, especially the admin controls.

Recommended fix: Pad each to 44 × 44 without changing the icons.

---

### [P3] Text links under 24 px tall

Page: Footer (contact links, legal links), contact page rows, breadcrumbs, "Learn more" links, admin "View live site"
Route: most

Viewport: all

Problem: Links render 16–22 px tall.

Expected: Comfortable targets on touch screens.

Actual: Every one passes the WCAG 2.5.8 **spacing exception** (≥ 24 px centre-to-centre), so this is ergonomics, not a compliance failure.

Impact: Minor on touch screens.

Recommended fix: Optional. Add vertical padding to footer link lists on touch widths. Not changed in this pass.

---

# 4. HEADER / NAVIGATION ISSUES

### [P2] Mobile drawer does not move focus into itself or return it

Page: Public mobile menu
Route: all public routes

Viewport: all < 1024 px (tested 320, 360, 390, 430, 768, 844×390, 568×320)

Problem: After the drawer opens, focus stays on the (now covered) "Open menu" button. Tab moves through the page underneath. Closing does not return focus to the trigger.

Expected: Focus moves into the dialog, stays there while it is open, and returns to the trigger on close.

Actual: `document.activeElement` = "Open menu" button after opening.

Impact: Keyboard and screen-reader users lose their place, and can operate content hidden behind the overlay.

Recommended fix: A small focus-trap hook. Focus the close button on open, cycle Tab within the dialog, restore focus on close.

Everything else passed: hamburger visible, drawer opens, body scroll locked, overlay, tap-outside closes, Escape closes, link tap navigates and closes, scroll restored, back/forward work, every link reachable with "Services" expanded, CTA visible at 568 × 320. Desktop dropdowns passed 65/65 checks at 1024–1920: hover, in-viewport panels, keyboard Enter/Tab/Escape, visible focus ring, sticky header, active states.

---

# 5. SIDEBAR ISSUES

### [P2] Closed admin sidebar links remain in the keyboard tab order

Page: Admin shell
Route: `/admin/*`

Viewport: < 1024 px

Problem: The off-canvas `<aside>` is only translated off-screen (`-translate-x-full`). Its 9 links and buttons are still focusable, so keyboard users tab into invisible controls before reaching the page.

Expected: A closed drawer is not focusable.

Actual: Focus lands on off-screen links.

Impact: Confusing keyboard navigation in the admin on tablets and phones.

Recommended fix: `invisible` while closed below `lg` (with a visibility transition so the slide-out still animates).

---

### [P3] Admin mobile sidebar does not lock background scrolling

Page: Admin shell
Route: `/admin/*`

Viewport: 320–768 px

Problem: With the sidebar open, the page behind the overlay still scrolls.

Expected: Background locked, consistent with the public drawer.

Actual: `body.style.overflow` unchanged.

Impact: Minor. Content shifts under the overlay.

Recommended fix: Set `overflow: hidden` on `body` while open.

Everything else passed: sidebar fits at 320 (256 px wide), overlay tap closes, navigation closes it, sticky and non-overlapping at ≥ 1024, active route highlighted.

---

# 6. COMPONENT ISSUES

### [P2] "Powered by Uncore Digital" credit permanently covered by the floating WhatsApp button

Page: Footer, all public pages
Route: all public routes

Viewport: 1366, 1280, 1024 (both orientations), 768, 360, 320. Clear at 1920, 1440, 430, 414, 390, 375.

Problem: At the end of the page, where the user cannot scroll further, the fixed WhatsApp button sits on top of the footer credit link.

Expected: Nothing interactive is permanently under a floating control.

Actual: The credit is unclickable and partly hidden at those widths.

Impact: The required credit is obscured on the most common laptop and tablet widths.

Likely cause: Footer bottom bar puts the badge bottom-right (md+) or bottom-centre (mobile), the button's fixed position.

Recommended fix: Reserve the button's footprint in the footer bottom bar (right padding at md+, bottom padding below md).

---

### [P2] Admin mobile header squashes the wordmark at 320 px

Page: Admin shell (mobile header)
Route: `/admin/*`

Viewport: 320 × 568

Problem: The "ANAV GLOBAL" wordmark image renders at a 8.28:1 aspect ratio instead of 9.28:1. It is horizontally compressed because the flex row (menu + logo + "ADMIN" label) is too wide and the image shrinks.

Expected: Logo never distorted.

Actual: Visibly squashed wordmark.

Impact: Brand distortion.

Recommended fix: Logo images `shrink-0`; hide the "Admin" text label below 360 px.

---

### [P2] Admin team list: names truncated to three letters on phones

Page: Admin → Team
Route: `/admin/team`

Viewport: 430 → 320

Problem: Five icon buttons (up, down, show/hide, edit, delete) take ~160 px of the row, leaving names like "Bar…", "Nik…".

Expected: Names readable.

Actual: Truncated to 3–4 characters.

Impact: An admin on a phone cannot tell who they are reordering or deleting without the photo.

Recommended fix: Let the row wrap so the actions drop below the name when space runs out.

---

### [P3] Logo lockups spill their containers slightly

Page: Footer at 1024 px; admin sidebar at ≥ 1024 px
Route: all

Viewport: 1024 (footer), ≥ 1024 (admin)

Problem: Footer lockup 313 px in a 291 px column (runs into the 64 px gap, no overlap). Admin sidebar tagline 4 px wider than its box.

Expected / Actual: No visible clipping or overlap today, but no margin for error either.

Recommended fix: Covered by the responsive logo-size fix (slightly tighter tagline tracking at `sm`).

Passed: cards and grids collapse correctly at every width, images keep their aspect ratio with `object-cover` (no broken images anywhere), testimonials carousel handles a 380-character quote and a long name, blog cards handle long titles, the marquee clips intentionally, FAQ accordion works and keeps answers in the DOM.

---

# 7. FORM / TABLE / MODAL ISSUES

### [P2] Admin modals do not take focus or trap it

Page: Admin → Team and Testimonials editors
Route: `/admin/team`, `/admin/testimonials`

Viewport: all (tested 320, 360, 390, 768, 1024, 1440)

Problem: Opening the dialog leaves focus on the button behind it, and Tab can leave the dialog.

Expected: Focus into the dialog, trapped, restored on close.

Actual: `document.activeElement` outside the dialog.

Impact: Keyboard and screen-reader users are disoriented.

Recommended fix: The same focus-trap hook as the drawer.

Passed: the modal fits the viewport at every width, the body scrolls inside it, close and Save stay visible, Escape closes, the overlay works.

### [P2] Admin leads: long email addresses clipped on phones

Page: Admin → Leads
Route: `/admin/leads`

Viewport: 430 → 320

Problem: An unbroken email in the row's meta line extends past the card and is clipped by its `overflow-hidden`.

Expected: Long emails wrap.

Actual: Address cut off (308 px of content in a 53–163 px box).

Impact: The admin can't read the address they need to reply to.

Recommended fix: `break-all` on the email span.

Passed: the contact form shows inline errors at 320 and 390, focuses the first invalid field, takes long names/emails/unbroken words without overflow (other than the P1 grid issue at 320), and wraps the service chips and the "I am a…" segments correctly. The post editor toolbar wraps without overflow at 320 and 390. The leads list is a list rather than a `<table>`, so there is no table scrolling to contain.

---

# 8. ACCESSIBILITY ISSUES

Covered above:
- [P2] Mobile drawer focus management (§4)
- [P2] Admin modal focus management (§7)
- [P2] Off-screen admin sidebar links focusable (§5)
- [P3] Touch target sizes (§3)

Passed: the first Tab reveals "Skip to content". Focus rings are visible on nav, dropdown links and form fields. Every icon button has an `aria-label`. Form fields have labels. Decorative SVGs and images are `aria-hidden` / `alt=""`. Brand colour pairs were measured: text pairs are ≥ 4.9:1, and the green CTA with navy text is 8.7:1.

---

# 9. CONSOLE / RUNTIME ISSUES

### [P3] Vercel Analytics script 404s when not hosted on Vercel

Page: All pages
Route: all

Viewport: all

Problem: `/_vercel/insights/script.js` returns 404, followed by "Refused to execute script … MIME type text/html" on every page load.

Expected: No console errors.

Actual: One failed request and one console error per page view on any non-Vercel host. On Vercel the script exists and this does not occur.

Impact: Harmless to users, but noise in monitoring, and a wasted request if the client hosts elsewhere.

Recommended fix: Render `<Analytics />` only when the build runs on Vercel (`process.env.VERCEL`).

Not issues:
- `?_rsc` requests marked `ERR_ABORTED` are Next.js link prefetches cancelled by the test's rapid navigation.
- No uncaught exceptions, React errors or hydration warnings in any of the 544 runs or 265 interaction checks.

---

# 10. ROUTE-BY-ROUTE STATUS

| Route | Desktop | Tablet | Mobile | Overflow | Navigation | Sidebar | Status |
|------|---------|--------|--------|----------|------------|---------|--------|
| `/` | ⚠️ chip clipped 1024–1279; credit covered 1280/1366 | ⚠️ credit covered | ⚠️ 320 header | ❌ 320 | ⚠️ drawer focus | N/A | ❌ |
| `/services` | ⚠️ credit covered | ⚠️ credit covered | ❌ cards cut at 320 | ❌ 320 | ⚠️ drawer focus | N/A | ❌ |
| `/services/[slug]` ×6 | ⚠️ credit covered | ⚠️ credit covered | ⚠️ 320 header | ❌ 320 | ⚠️ drawer focus | N/A | ❌ |
| `/industries` | ⚠️ credit covered | ⚠️ credit covered | ⚠️ 320 header | ❌ 320 | ⚠️ drawer focus | N/A | ❌ |
| `/industries/[slug]` ×6 | ⚠️ credit covered | ⚠️ credit covered | ⚠️ 320 header | ❌ 320 | ⚠️ drawer focus | N/A | ❌ |
| `/about` | ⚠️ credit covered | ⚠️ credit covered | ⚠️ 320 header | ❌ 320 | ⚠️ drawer focus | N/A | ❌ |
| `/team` | ⚠️ credit covered | ⚠️ credit covered | ⚠️ 320 header | ❌ 320 | ⚠️ drawer focus | N/A | ❌ |
| `/how-we-work` | ⚠️ credit covered | ⚠️ credit covered | ⚠️ 320 header | ❌ 320 | ✅ anchor offset OK | N/A | ❌ |
| `/faqs` | ⚠️ credit covered | ⚠️ credit covered | ⚠️ 320 header | ❌ 320 | ✅ topic anchors OK | N/A | ❌ |
| `/contact` | ⚠️ credit covered | ⚠️ credit covered | ❌ cards cut at 320; ⚠️ iOS zoom | ❌ 320 | ⚠️ drawer focus | N/A | ❌ |
| `/blog` | ⚠️ credit covered | ⚠️ credit covered | ⚠️ 320 header | ❌ 320 | ⚠️ drawer focus | N/A | ❌ |
| `/blog/[slug]` (fixture) | ⚠️ long URL spills column | ❌ 20–152 px overflow | ❌ up to 600 px overflow | ❌ | ⚠️ drawer focus | N/A | ❌ |
| `/privacy-policy`, `/terms-of-service` | ⚠️ credit covered | ⚠️ credit covered | ⚠️ 320 header | ❌ 320 | ⚠️ drawer focus | N/A | ❌ |
| 404 | ✅ | ✅ | ⚠️ 320 logo clipped | ✅ | ✅ | N/A | ⚠️ |
| `/admin/login` | ✅ | ✅ | ✅ | ✅ | ✅ | N/A | ✅ |
| `/admin` | ✅ | ✅ | ⚠️ 320 squashed logo | ✅ | ✅ | ⚠️ focusable when closed; no scroll lock | ⚠️ |
| `/admin/leads` | ✅ | ✅ | ⚠️ long email clipped | ✅ | ✅ | ⚠️ | ⚠️ |
| `/admin/posts`, `/admin/posts/[id]` | ✅ | ✅ | ⚠️ 320 squashed logo | ✅ | ✅ | ⚠️ | ⚠️ |
| `/admin/team` | ✅ | ✅ | ⚠️ names truncated | ✅ | ⚠️ modal focus | ⚠️ | ⚠️ |
| `/admin/testimonials` | ✅ | ✅ | ⚠️ 320 squashed logo | ✅ | ⚠️ modal focus | ⚠️ | ⚠️ |
| `/admin/settings` | ✅ | ✅ | ⚠️ 320 squashed logo; iOS zoom | ✅ | ✅ | ⚠️ | ⚠️ |

---

# 11. VIEWPORT MATRIX

| Page | 1920 | 1440 | 1366 | 1280 | 1024 | 768 | 430 | 414 | 390 | 375 | 360 | 320 |
|------|------|------|------|------|------|------|------|------|------|------|------|------|
| Home | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| Services index | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| Service detail (×6) | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| Industries index | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| Industry detail (×6) | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| About / Team / How we work / FAQs | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| Contact | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| Blog index | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| Blog article (fixture) | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Legal pages | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ❌ |
| 404 | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ |
| Admin login | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Admin (dashboard, posts, settings, testimonials) | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |
| Admin team / leads (long content) | ✅ | ✅ | ✅ | ✅ | ✅ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ | ⚠️ |

(⚠️ at 1366–768 and 360 on public pages = footer credit covered by the floating button at page end; 1024 Home also = clipped hero chip. Admin ⚠️ below 1024 = sidebar focus/scroll-lock, plus the squashed logo at 320. Landscape 1366×1024, 1024×768, 932×430, 844×390 and 568×320 showed **no overflow** on any route; the drawer passed every check at 844×390 and 568×320.)

---

# 12. TOP 10 FIXES

1. [P1] Make the header/footer logo sizes responsive below `sm` and tighten the mobile header gap — removes the 320 px overflow on **all 23 public pages** and fixes the clipped footer tagline.
2. [P1] Add `overflow-wrap: anywhere` to `.prose-anav` — stops CMS content from breaking every blog article on phones and tablets.
3. [P1] `/services`: let the "Explore …" / "Get a quote" buttons wrap and use `grid-cols-1` on the card grid.
4. [P1] `/contact`: `grid-cols-1` on the layout grid and `break-all` on the email link.
5. [P2] Reserve space in the footer bottom bar for the floating WhatsApp button so "Powered by Uncore Digital" is never covered.
6. [P2] Focus management (move in, trap, restore) for the mobile drawer and the admin modals.
7. [P2] 16 px form-control text below `sm` to stop iOS Safari zooming on focus.
8. [P2] Keep the hero proof chip inside the gutter at `lg` (1024–1279 px).
9. [P2] Admin: hide the closed off-canvas sidebar from the tab order; stop the 320 px wordmark distortion; wrap long emails; let team rows wrap on phones.
10. [P3] 44 px mobile navigation controls, admin drawer scroll lock, and Vercel Analytics only on Vercel.

---

# 13. FINAL VERDICT

Is this production-ready from a responsive UI/UX perspective?

**NO — not as audited.** (See the post-fix verification below.)

1. 360–1920 px is clean: zero horizontal overflow across 31 routes and 16 viewports.
2. 320 px fails on every public page (P1). Small, but real devices and high-zoom users land there.
3. Blog articles will break on phones the first time an editor pastes a URL (P1). That is a matter of when, not if.
4. The two main conversion pages, /services and /contact, have content cut off at 320 px (P1).
5. Navigation is fundamentally sound: drawer, dropdowns, keyboard, sticky header, anchors, back/forward all pass.
6. The admin works at every width but has focus-management gaps, plus long-content and logo issues on phones (P2).
7. The required "Powered by Uncore Digital" credit is hidden by the floating button at common widths (P2).
8. No runtime errors, hydration problems or broken images anywhere. The only console noise is Vercel Analytics off-Vercel (P3).
9. Every issue found has a small, targeted fix. None needs a redesign.

---

# POST-FIX VERIFICATION

All recommended fixes were applied as targeted changes: no redesign, no colour or branding changes, no new features. The changed files:

| Fix | Files |
|---|---|
| Logo steps down one size below 640 px; logo images never shrink | `components/brand/Logo.tsx` |
| Header gap on mobile; 44 px menu/close buttons; drawer focus trap and focus return; `aria-expanded` | `components/Header.tsx`, new `lib/useFocusTrap.ts` |
| `/services` cards: `grid-cols-1`, wrapping buttons | `app/(marketing)/services/page.tsx` |
| `/contact`: `grid-cols-1`, email breaks, office hours stack below 420 px | `app/(marketing)/contact/page.tsx` |
| "I am a…" selector stacks below 360 px | `components/ContactForm.tsx` |
| Article bodies wrap long strings; form controls 16 px below 640 px (iOS zoom) | `app/globals.css` |
| Footer bar reserves the floating button's footprint | `components/Footer.tsx` |
| Hero chip stays inside the gutter at `lg` | `components/sections/Hero.tsx` |
| CTA band and industry banner buttons may wrap at 320 px | `components/sections/CTA.tsx`, `app/(marketing)/industries/[slug]/page.tsx` |
| Admin: closed drawer `invisible`, focus trap, scroll lock, 44 px controls, label hidden < 360 px | `components/admin/AdminShell.tsx` |
| Admin modals: focus trap and return | `components/admin/Modal.tsx` |
| Admin lists: rows wrap on phones; long emails/companies wrap | `components/admin/LeadsTable.tsx`, `TeamManager.tsx`, `PostsTable.tsx` |
| Admin "not configured" notices wrap env-var names | `components/admin/LoginForm.tsx`, `app/admin/(dashboard)/page.tsx`, `app/admin/(dashboard)/settings/page.tsx` |
| Vercel Analytics only on Vercel builds | `app/layout.tsx` |

Found **during** verification and fixed in the same pass:
- At exactly 320 px, the 16 px iOS rule made "accounting" too wide for a third-width segment → the selector now stacks below 360 px.
- Admin posts list squeezed titles on phones (same pattern as the team list).
- CTA band and industry-banner buttons ran into the panel padding at 320 px.
- Office hours wrapped word-by-word at 320–390 px.
- `min-[…]` Tailwind variants are disabled by this project's object-based `short` screen, so the first build silently dropped two fixes. They were replaced with `[@media(min-width:…)]` variants, and the emitted CSS was checked for each rule.

### Results (production build)

| Check | Before | After |
|---|---|---|
| Full sweep, 32 routes × 17 viewports (544 runs): page-level horizontal overflow | 23 routes at 320 px | **0** |
| Text clipped by containers / off-screen | 24 routes at 320 px + 1024 hero chip | **0** |
| Distorted images | admin wordmark at 320 px | **0** |
| Broken images · header collisions · failed requests | 0 · 0 · Vercel script on every page | **0 · 0 · 0** |
| Re-check after the late fixes: 32 routes × 320/360/390, 4 key pages × 17 viewports, `/contact` × 17 | — | **0 overflow, 0 clipped, 0 distorted** |
| Interaction checks (drawer, dropdowns, header, anchors, form, accordion, skip link, admin sidebar, modals, editor) | 226 / 265 | **279 / 279** (more checks added for the fixes) |
| "Powered by Uncore Digital" clear of the floating button at page end (13 widths) | covered at 6 widths | **clear at all 13** |
| Blog article with a long URL (fixture), 9 widths | up to 600 px overflow | **0** |
| Admin lists with long names/emails (fixture), 320–430 px | clipped / 3-letter names | **wrapped and readable** |
| Typecheck · lint · build | — | **clean · clean · 37/37 pages** |

### Remaining, accepted (P3 — no clipping, overlap or overflow)

1. At 1024–1279 px the footer logo lockup is 22 px wider than its grid column. It sits inside the 64 px column gap and touches nothing.
2. At 320 px the large headline figures ("500+", "50K+") run ~11 px into their cell padding. Not clipped.
3. Text links 16–22 px tall (footer, contact rows, breadcrumbs). They pass WCAG 2.5.8 via the spacing exception.
4. The floating WhatsApp button passes over content while scrolling, as any floating button does. Nothing is permanently covered.

### Still not verified
- Real iOS Safari / Android Chrome hardware. In particular, the iOS focus-zoom fix is applied by CSS but has not been observed on a device.
- Live Supabase data (verified with fixtures matching the schema).
- The form's "Sending…" state (needs a configured backend).

## Final status after fixes

Overall status: **PASS**

Total open issues: P0: 0 · P1: 0 · P2: 0 · P3: 4 (accepted, listed above)

**Production-ready from a responsive UI/UX perspective: YES**, with one condition: a quick check on one real iPhone and one Android phone before launch, to confirm the items Chromium emulation cannot (focus zoom, safe-area insets, URL-bar resizing).

---

# ADDENDUM — USA / UK COUNTRY SITES (5 October 2026)

The USA / UK switcher added the UK site (`/uk/…`) and touched the shared chrome (top bar, header, mobile menu, footer). It was re-verified with the same harness (run against the dev server, after a clean production build of all 51 pages):

| Check | Result |
|---|---|
| 22 routes (all 14 UK pages + the changed US pages + admin leads/editor) × 17 viewports = 374 runs | **0** page overflow, **0** clipped text, **0** distorted/broken images, **0** header collisions, **0** console errors |
| Interaction suite (drawer, dropdowns, header, anchors, form, accordion, skip link, admin sidebar, modals, editor) | **279 / 279** |
| Footer credit clear of the floating button at page end, 13 widths | **clear at all 13** |
| Switcher behaviour: default USA; page-to-page mapping both ways; Escape closes and returns focus; back button; mobile segmented control at 320/390; UK contact form defaults | **all pass** |

Also fixed while building it: the logo marquee used an odd number of copies (3), so its `-50%` loop restarted mid-copy and visibly jumped; it now always uses an even number, sized so half the track covers a 2000 px screen.

# ADDENDUM — UK INDUSTRIES (7 October 2026)

The UK site gained the Industries section: `/uk/industries` and six UK industry pages (CPA Firms is "Accounting Practices" at `/uk/industries/accounting-practices`), the Industries menu in the UK header, mobile menu and footer, and the industries grid on the UK homepage. Re-verified against a clean production build of all 60 pages:

| Check | Result |
|---|---|
| 12 routes (UK home, UK industries index + 6 pages, a UK service page, UK about, US CPA firms) × 17 viewports = 204 runs | **0** page overflow, **0** clipped text, **0** distorted/broken images, **0** header collisions, **0** console errors; remaining spill/target notes identical to the earlier accepted baseline |
| UK header dropdown (1440) and mobile menu (390) | all six UK industries listed, links stay on the UK site, no horizontal overflow in the menu |
| Country switch and SEO | CPA firms ↔ accounting practices both ways; every industry page declares its counterpart via hreflang; both sites' industries in the sitemap; wrong-site slugs 404 |
