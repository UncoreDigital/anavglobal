-- ============================================================================
-- ANAV Global — blog articles from the client's change list (October 2026)
-- Part 1 of 3: U.S. tax for CPA firms (point 7) and for individuals (point 8).
-- Run after 0005_client_changes.sql (needs the posts.region column from 0004).
-- Safe to re-run: existing slugs are left alone.
--
-- Seeded as DRAFTS on the U.S. site. Tax content goes out under the firm's
-- name, so ANAV's tax team reviews each one in Admin → Insights and presses
-- Publish. Written to the client's brief: roughly 70% educational, 20%
-- problem-solving, 10% promotional — articles teach first and mention the
-- relevant service once, naturally, rather than ending on a sales pitch.
-- Figures that change every year (standard deduction, mileage rates, wage
-- bases) are deliberately left out so the articles do not date.
-- ============================================================================

insert into public.posts (slug, title, excerpt, category, author, status, content, meta_description, region)
values
(
  'us-tax-preparation-outsourcing-what-cpa-firms-should-know',
  $t$U.S. Tax Preparation Outsourcing: What CPA Firms Should Know Before Choosing a Partner$t$,
  $e$Outsourcing return preparation can add busy-season capacity without adding headcount — if you choose the partner carefully. Here is what to check first.$e$,
  'For CPA Firms',
  'ANAV Global',
  'draft',
  $body$
<p>Every busy season asks the same question of a growing CPA firm: how do you prepare more returns without hiring, training and paying for staff you only need for a few months a year? For many firms the answer is an outsourcing partner. Done well, it adds capacity, protects margins and frees your people for review and advisory work. Done badly, it adds rework, risk and stress. The difference is almost entirely in how the partner is chosen.</p>

<h2>1. Experience with the returns you actually prepare</h2>
<p>Ask which forms the partner prepares every season, not which ones they can do in principle. A team that handles a high volume of Form 1040s may have little real experience with partnership capital accounts on Form 1065, shareholder basis on Form 1120-S, or book-to-tax reconciliations on Form 1120. Ask for the mix of returns they prepared last season and who on their team does each type.</p>

<h2>2. Your software, not theirs</h2>
<p>The strongest arrangements work inside the firm's own tax software — Drake, CCH Axcess, Lacerte, ProConnect, UltraTax CS or whichever you use — through controlled remote access. That keeps client data in your systems, keeps your workpaper standards intact, and means nothing has to be re-keyed when the return comes back for review. Be cautious of any model that requires exporting client files to a separate platform.</p>

<h2>3. Data security you can verify</h2>
<p>Tax preparers are responsible for safeguarding taxpayer data, and your outsourcing partner becomes part of that responsibility. Ask to see the partner's written information security plan, how access is granted and removed per person, whether staff use firm-managed devices, and how multi-factor authentication is enforced. IRS Publication 4557 is a useful checklist for the conversation.</p>

<h2>4. Taxpayer consent rules</h2>
<p>Section 7216 of the Internal Revenue Code restricts how tax return information is used and disclosed. For individual returns, disclosing return information to a preparer located outside the United States requires the taxpayer's consent in the form the regulations set out, and there are specific rules on protecting Social Security numbers. A credible partner will raise this with you before you raise it with them, and will help you build consent into your engagement process.</p>

<h2>5. A review process that fits yours</h2>
<p>Outsourcing should hand you a return that is ready for your reviewer — not a first draft your senior staff has to rebuild. Ask how the partner documents its work: tie-outs, open-item lists, notes on judgment calls and questions for the client. The best partners prepare to your checklist and adapt to your reviewers' preferences after the first batch.</p>

<h2>6. Capacity when you need it most</h2>
<p>Every partner has spare capacity in July. What matters is March and April. Ask how many returns the team can turn around in peak weeks, how they staff for extensions in September and October, and what turnaround you can expect on a return once all documents are in.</p>

<h2>7. Communication and accountability</h2>
<p>You should know who is working on your returns, how to reach them and how quickly they respond. A named team lead, a shared tracker of every return and its status, and a regular check-in during busy season prevent most of the problems firms associate with outsourcing.</p>

<h2>Start with a pilot</h2>
<p>Before committing your whole season, send a small batch of returns of mixed complexity. Measure turnaround, review notes per return, and how quickly open items are resolved. A pilot tells you more than any sales conversation.</p>

<p>ANAV Global works as an extension of CPA firms, preparing individual, partnership, S corporation and C corporation returns inside the firm's own software and to its review checklist. If you are planning capacity for the next filing season, our <a href="/services/tax-preparation-filing">tax preparation team</a> can walk you through how a pilot would work for your firm.</p>
$body$,
  $m$What CPA firms should check before choosing a U.S. tax preparation outsourcing partner: experience, software, data security, Section 7216 and review.$m$,
  'us'
),
(
  'how-to-outsource-1040-1065-1120s-1120-tax-returns',
  $t$How to Outsource 1040, 1065, 1120S & 1120 Tax Returns Successfully$t$,
  $e$Each return type has its own pressure points. A practical workflow for outsourcing individual, partnership, S corporation and C corporation returns without losing control of quality.$e$,
  'For CPA Firms',
  'ANAV Global',
  'draft',
  $body$
<p>Outsourcing tax preparation is not one process — it is four. Individual, partnership, S corporation and C corporation returns each have different deadlines, different documents and different places where errors hide. Firms that outsource successfully build a shared workflow and then add return-specific checks on top of it.</p>

<h2>The shared workflow</h2>
<ol>
  <li><strong>Define the scope per return.</strong> Agree which schedules, states and supporting workpapers are included, and what stays with your team.</li>
  <li><strong>Standardize what goes in.</strong> A complete package — prior-year return, organizer, source documents, trial balance where relevant and engagement notes — is the single biggest factor in turnaround time.</li>
  <li><strong>Prepare in your software, to your checklist.</strong> The return should come back in the format your reviewers expect.</li>
  <li><strong>Track open items in one place.</strong> Missing documents and client questions should be visible to both teams, not buried in email.</li>
  <li><strong>Review, sign and file in-house.</strong> Your firm remains the preparer of record and keeps the client relationship.</li>
</ol>

<h2>Form 1040: volume and completeness</h2>
<p>Individual returns are high volume and document-heavy. The common delays are missing forms — a late brokerage 1099, a K-1 from a partnership, a dependent's information. Ask your partner to flag missing items in the first pass rather than waiting until the end, and to tie every K-1 and brokerage statement to the return. State returns, part-year residency and credits for taxes paid to other states deserve their own checklist line.</p>

<h2>Form 1065: capital accounts and K-1s</h2>
<p>Partnership returns are due by the 15th day of the third month after year end — March 15 for calendar-year partnerships — so they compete for attention with the start of individual season. Partners' capital accounts must be reported on the tax basis, and allocations must follow the partnership agreement. Make sure the partner has the agreement, prior-year capital account detail and any changes in ownership during the year. Ask whether Schedules K-2 and K-3 apply before you assume they do not.</p>

<h2>Form 1120-S: basis and reasonable compensation</h2>
<p>S corporation returns share the March deadline. The return itself is rarely the hard part; the hard part is what it feeds. Shareholders need accurate K-1s to compute their basis, which matters for distributions and losses, and shareholders may need to file Form 7203 with their own returns. Ask the preparer to flag distributions in excess of what basis appears to support, and to note whether officer compensation looks reasonable for the profit level.</p>

<h2>Form 1120: book-to-tax differences</h2>
<p>C corporation returns, due by the 15th day of the fourth month for calendar-year companies, turn on the reconciliation between book income and taxable income — depreciation differences, nondeductible expenses, accrued items and any net operating loss carryforwards. A clean trial balance and fixed-asset register are essential. Estimated tax payments for the following year are a natural add-on to the same engagement.</p>

<h2>Start small, then scale</h2>
<p>Begin with a batch of returns from each category you plan to outsource. Track review notes per return and categorize them: missing information, preparation errors, or preference differences. The first two should fall quickly; the third disappears once the partner learns your reviewers' preferences. Within a season, most firms know exactly which returns to send and which to keep.</p>

<p>ANAV Global prepares Forms 1040, 1065, 1120-S, 1120 and 1041, together with state returns and extensions, for CPA firms across the U.S. See how our <a href="/services/tax-preparation-filing">tax preparation and filing</a> service fits into a firm's review process.</p>
$body$,
  $m$A practical workflow for outsourcing Form 1040, 1065, 1120-S and 1120 preparation — what to send, what to check and how to scale.$m$,
  'us'
),
(
  'offshore-tax-preparation-vs-in-house-cost-quality-scalability',
  $t$Offshore Tax Preparation vs. In-House: Cost, Quality & Scalability$t$,
  $e$Hiring for busy season or using an offshore team? An honest comparison of cost, quality, scalability and risk — and why many firms end up with a hybrid.$e$,
  'For CPA Firms',
  'ANAV Global',
  'draft',
  $body$
<p>For most CPA firms, the question is no longer whether to add preparation capacity but how. Hiring in-house and working with an offshore team each have real strengths. Comparing them honestly — on cost, quality, scalability and risk — usually points to a combination rather than a choice.</p>

<h2>Cost</h2>
<p>The visible cost of an in-house preparer is salary. The full cost includes benefits, payroll taxes, recruiting, training, software seats, equipment and office space — and the months of the year when there is less work than people. Offshore preparation is typically priced per return or per dedicated team member, so the cost follows the work. For firms with a sharp busy-season peak, that difference is often the deciding factor.</p>
<p>The fair comparison is cost per <em>review-ready</em> return. A cheaper return that needs heavy rework is not cheaper.</p>

<h2>Quality</h2>
<p>Quality depends less on where a preparer sits than on three things: experience with the return types, clear standards, and a reliable review. In-house staff absorb your firm's preferences naturally. An offshore team has to be taught them — through checklists, sample returns and feedback on the first batches. Firms that invest that effort early see review notes fall quickly. Firms that send returns without guidance get generic work back.</p>
<p>In either model, the review stays with your firm. The partner signing the return should never be outsourced.</p>

<h2>Scalability</h2>
<p>This is where offshore preparation is strongest. Hiring for a twelve-week peak is slow and risky: by the time a new hire is productive, the season is half over. An established offshore team can add capacity quickly for March and April and again for extensions in September and October, without a long-term commitment. Time zones help too: work sent at the end of a U.S. business day can be prepared overnight.</p>

<h2>Risk — and how to manage it</h2>
<ul>
  <li><strong>Data security.</strong> Work inside your own software through controlled, per-person access, so client data stays in your systems.</li>
  <li><strong>Taxpayer consent.</strong> Section 7216 rules require consent before individual return information goes to a preparer outside the U.S. Build it into your engagement letters.</li>
  <li><strong>Communication.</strong> Insist on a named team lead, a shared status tracker and agreed response times.</li>
  <li><strong>Dependence.</strong> Keep in-house knowledge of every client; outsource production, not the relationship.</li>
</ul>

<h2>The hybrid model most firms land on</h2>
<p>In practice, many firms keep a core in-house team for complex returns, client contact and review, and use offshore preparation for the volume — standard individual returns, recurring business returns and the extension wave. The in-house team spends more of its time on higher-value work, and the firm grows without its busy season growing with it.</p>

<h2>A simple way to decide</h2>
<p>List last season's returns by type and complexity. Mark the ones your senior people should be preparing personally. The rest are candidates for outsourcing — and a pilot batch will tell you within weeks whether the economics and quality hold up for your firm.</p>

<p>ANAV Global provides offshore tax preparation for U.S. CPA firms, working inside the firm's software and to its review standards. If you are weighing the options for next season, our <a href="/industries/cpa-firms">team for CPA firms</a> can share how other practices have structured it.</p>
$body$,
  $m$Offshore vs in-house tax preparation for CPA firms: an honest comparison of cost, quality, scalability and risk, and why many choose a hybrid.$m$,
  'us'
),
(
  'common-tax-deductions-us-taxpayers-often-miss',
  $t$10 Common Tax Deductions U.S. Taxpayers Often Miss$t$,
  $e$Some of the most valuable deductions are the easiest to overlook — including several new ones that started in 2025. Ten worth checking before you file.$e$,
  'Individual Tax',
  'ANAV Global',
  'draft',
  $body$
<p>Most people know about the standard deduction and the mortgage interest deduction. Fewer realize how many other deductions are available — some of them even if you do not itemize. Here are ten that are regularly missed.</p>

<h2>1. Tips income (new for 2025–2028)</h2>
<p>Workers in occupations that customarily receive tips can deduct qualified tips — up to $25,000 a year — for tax years 2025 through 2028. The deduction phases out at higher incomes and is available whether or not you itemize. If you earn tips, make sure they are reported correctly so the deduction can be claimed.</p>

<h2>2. Overtime pay (new for 2025–2028)</h2>
<p>For the same years, the premium portion of qualified overtime pay — the "half" in time-and-a-half — can be deducted, up to $12,500 a year ($25,000 for married couples filing jointly), again subject to income limits. Check your pay statements and Form W-2 for the overtime amount.</p>

<h2>3. The additional deduction for seniors</h2>
<p>Taxpayers aged 65 or older can claim an additional deduction of up to $6,000 each for 2025 through 2028, on top of the existing extra standard deduction for age. It phases out at higher incomes, but many retirees qualify and do not realize it.</p>

<h2>4. Car loan interest on a new vehicle</h2>
<p>Interest on a loan taken out after 2024 to buy a new, U.S.-assembled vehicle for personal use may be deductible — up to $10,000 a year for 2025 through 2028, subject to income limits. Keep the loan statement showing interest paid.</p>

<h2>5. Student loan interest</h2>
<p>You can deduct up to $2,500 of student loan interest a year, even without itemizing, if your income is under the limit. The lender should send Form 1098-E, but if you paid a smaller amount you may need to request it.</p>

<h2>6. Contributions to a traditional IRA or HSA</h2>
<p>Deductible IRA contributions for a tax year can be made up to the filing deadline the following April. Health Savings Account contributions you make directly — rather than through payroll — are also deductible above the line. Both reduce taxable income and build savings.</p>

<h2>7. Self-employment deductions</h2>
<p>If you have freelance or business income, you can deduct half of your self-employment tax, health insurance premiums you pay for yourself and your family (if you are not eligible for an employer plan), and contributions to a SEP-IRA or solo 401(k). These are frequently missed by people with a side business.</p>

<h2>8. Home office for the self-employed</h2>
<p>If you are self-employed and use part of your home regularly and exclusively for business, you can deduct a share of home expenses — or use the simplified method of $5 per square foot, up to 300 square feet. (Employees generally cannot claim this deduction.)</p>

<h2>9. State and local taxes, if you itemize</h2>
<p>For 2025, the cap on deducting state and local income, sales and property taxes rose from $10,000 to $40,000, with a reduction for higher incomes. That change alone may make itemizing worthwhile again for people who stopped after 2017 — it is worth recalculating.</p>

<h2>10. Medical expenses above the threshold</h2>
<p>If you itemize, unreimbursed medical and dental expenses above 7.5% of your adjusted gross income are deductible. Insurance premiums you paid with after-tax money, prescriptions, travel for treatment and long-term care costs can add up faster than expected.</p>

<h2>Keep the records</h2>
<p>Every deduction depends on documentation: receipts, statements and forms that show what you paid and when. Keeping them organized during the year is the easiest way to make sure nothing is left on the table.</p>

<p>If you are not sure which of these apply to you, our <a href="/services/tax-preparation-filing">U.S. tax preparation team</a> reviews each return for the deductions and credits you are entitled to before it is filed.</p>

<p><em>This article is general information, not tax advice. Limits and income thresholds change, and eligibility depends on your circumstances — speak with a qualified tax professional before acting.</em></p>
$body$,
  $m$Ten tax deductions U.S. taxpayers often miss, including the new tips, overtime, senior and car loan interest deductions for 2025–2028.$m$,
  'us'
),
(
  'tax-refund-vs-tax-liability-whats-the-difference',
  $t$Tax Refund vs. Tax Liability: What's the Difference?$t$,
  $e$A big refund is not the same as a low tax bill. How your tax liability, your payments and your refund fit together — and what each one tells you.$e$,
  'Individual Tax',
  'ANAV Global',
  'draft',
  $body$
<p>"How much am I getting back?" is often the first question people ask about their tax return. It is an understandable question, but it can be misleading. Your refund says very little about how much tax you actually paid. To understand your return, you need to separate two ideas: your tax liability and your refund.</p>

<h2>What is tax liability?</h2>
<p>Your tax liability is the total income tax you owe for the year. It is calculated from your income, minus adjustments and deductions, which gives your taxable income. The tax on that income is worked out using the tax brackets for your filing status, and then reduced by any nonrefundable credits you qualify for. The result is your total tax for the year — the number that actually measures your tax cost.</p>

<h2>What is a tax refund?</h2>
<p>During the year, you pay toward that liability in advance: through withholding from your paycheck, estimated tax payments, or both. When you file your return, those payments are compared with your liability, and refundable credits are added on your side of the ledger.</p>
<ul>
  <li>If you paid <strong>more</strong> than your liability, the difference comes back to you as a refund.</li>
  <li>If you paid <strong>less</strong>, the difference is a balance due, payable by the filing deadline.</li>
</ul>
<p>In other words, a refund is not a gift from the IRS — it is your own money, returned because you overpaid during the year.</p>

<h2>A simple example</h2>
<p>Two people each have a tax liability of $8,000. The first had $10,000 withheld from her paychecks and receives a $2,000 refund. The second had $7,500 withheld and owes $500. Their tax cost is identical. The only difference is how much each paid in advance.</p>

<h2>Is a large refund good or bad?</h2>
<p>A large refund means you lent money to the government interest-free for up to a year. Some people like it as a form of forced saving. Others would rather have the money in each paycheck. A large balance due, on the other hand, can bring penalties and interest if you underpaid during the year by too much.</p>
<p>The aim for most people is to land reasonably close to zero — a modest refund or a small balance due.</p>

<h2>How to adjust</h2>
<ul>
  <li><strong>Employees:</strong> update your Form W-4 with your employer. The IRS Tax Withholding Estimator can help you work out the right figures, especially after a change such as marriage, a new child, a second job or a raise.</li>
  <li><strong>Self-employed and investors:</strong> review your quarterly estimated payments as income changes during the year.</li>
  <li><strong>Life changes:</strong> buying a home, starting a business or retiring all change both your liability and how much you should pay in advance.</li>
</ul>

<h2>What really lowers your tax</h2>
<p>Only reducing your liability lowers your tax — through deductions, credits, retirement contributions and good planning. Changing your withholding just changes the timing. That is why looking at your total tax, not just the refund, gives you the truest picture of how your year went.</p>

<p>When we prepare an individual return, we show you both numbers and explain what changed from last year, so you can plan withholding or estimated payments for the year ahead.</p>

<p><em>This article is general information, not tax advice. Speak with a qualified tax professional about your own situation.</em></p>
$body$,
  $m$Tax refund vs tax liability explained: what each number means, why a big refund isn't a lower tax bill, and how to adjust withholding.$m$,
  'us'
),
(
  'how-does-the-us-tax-filing-process-work',
  $t$How Does the U.S. Tax Filing Process Work? A Beginner's Guide$t$,
  $e$New to filing in the U.S.? A step-by-step guide to the tax year, the documents you need, how your tax is calculated and the deadlines that matter.$e$,
  'Individual Tax',
  'ANAV Global',
  'draft',
  $body$
<p>Filing a U.S. tax return for the first time can feel complicated, but the process follows the same steps every year. Once you understand the order, each piece makes more sense.</p>

<h2>1. The tax year and the deadline</h2>
<p>For individuals, the tax year is the calendar year. The return for a given year is due by April 15 of the following year, moving to the next business day if the 15th falls on a weekend or holiday. Most states with an income tax use the same date, though not all.</p>

<h2>2. Gather your documents</h2>
<p>Employers and financial institutions send information returns early in the year:</p>
<ul>
  <li><strong>Form W-2</strong> from each employer, showing wages and tax withheld.</li>
  <li><strong>Forms 1099</strong> for other income — 1099-NEC for freelance work, 1099-INT and 1099-DIV for interest and dividends, 1099-B for investment sales, 1099-R for retirement distributions.</li>
  <li><strong>Schedule K-1</strong> if you own part of a partnership, S corporation or trust. These often arrive later than other forms.</li>
  <li>Records of deductible expenses and credits: mortgage interest (Form 1098), student loan interest, childcare costs, charitable gifts and education expenses.</li>
</ul>

<h2>3. Choose your filing status</h2>
<p>Your filing status — single, married filing jointly, married filing separately, head of household, or qualifying surviving spouse — determines your tax brackets and standard deduction. It is based on your situation on December 31.</p>

<h2>4. How the tax is calculated</h2>
<ol>
  <li>Add up your <strong>total income</strong> from all sources.</li>
  <li>Subtract <strong>adjustments</strong> such as deductible IRA contributions or student loan interest to get your <strong>adjusted gross income (AGI)</strong>.</li>
  <li>Subtract either the <strong>standard deduction</strong> or your <strong>itemized deductions</strong>, whichever is larger, plus any other deductions you qualify for, to get your <strong>taxable income</strong>.</li>
  <li>Apply the tax brackets to calculate your <strong>tax</strong>.</li>
  <li>Subtract <strong>credits</strong>, such as the Child Tax Credit or education credits.</li>
  <li>Compare the result with what you have already <strong>paid</strong> through withholding and estimated payments. The difference is your refund or balance due.</li>
</ol>

<h2>5. File — and pay if you owe</h2>
<p>Most returns are filed electronically, which is faster and more accurate than paper. Refunds are usually issued faster when you choose direct deposit. If you owe, payment is due by the April deadline even if you are not ready to file.</p>

<h2>6. If you need more time</h2>
<p>Form 4868 gives an automatic six-month extension to file, to October 15. It does not extend the time to pay: you should estimate what you owe and pay it by April to avoid penalties and interest.</p>

<h2>7. Don't forget your state</h2>
<p>Most states have their own income tax return, and some cities do too. If you moved during the year or earned income in more than one state, you may need to file more than one state return.</p>

<h2>8. Keep your records</h2>
<p>Keep copies of your return and supporting documents for at least three years after filing — longer in some situations, such as when you have assets whose cost basis matters for a future sale.</p>

<p>If this is your first U.S. return, or your situation has become more complicated, our <a href="/services/tax-preparation-filing">tax preparation team</a> can prepare and file federal and state returns and explain each step along the way.</p>

<p><em>This article is general information, not tax advice. Speak with a qualified tax professional about your own situation.</em></p>
$body$,
  $m$A beginner's guide to the U.S. tax filing process: the tax year, documents you need, how tax is calculated, deadlines, extensions and state returns.$m$,
  'us'
),
(
  'what-happens-if-you-file-your-tax-return-late',
  $t$What Happens If You File Your Tax Return Late?$t$,
  $e$Missed the April deadline? What the penalties are, how interest works, why owing and not owing make a big difference — and what to do now.$e$,
  'Individual Tax',
  'ANAV Global',
  'draft',
  $body$
<p>Missing the tax filing deadline is more common than people think, and it is fixable. What happens next depends mostly on one question: do you owe tax, or are you due a refund?</p>

<h2>If you are due a refund</h2>
<p>There is generally no penalty for filing late if you do not owe tax. You simply receive your refund later. There is, however, a time limit: you usually have three years from the original due date to claim a refund. After that, the money is forfeited. If you think you are owed a refund for a past year, do not wait.</p>

<h2>If you owe tax</h2>
<p>Two separate penalties can apply, plus interest.</p>
<ul>
  <li><strong>Failure-to-file penalty:</strong> 5% of the unpaid tax for each month or part of a month the return is late, up to a maximum of 25%. If a return is more than 60 days late, a minimum penalty applies — a fixed amount set each year by the IRS, or the full tax owed if that is less.</li>
  <li><strong>Failure-to-pay penalty:</strong> 0.5% of the unpaid tax for each month or part of a month it remains unpaid, also up to 25%. In a month when both penalties apply, the filing penalty is reduced by the payment penalty.</li>
  <li><strong>Interest:</strong> charged on unpaid tax from the original due date until it is paid, and on penalties too. The rate is set quarterly and compounds daily.</li>
</ul>
<p>The failure-to-file penalty is ten times the failure-to-pay penalty. That is why, if you cannot pay, you should still file on time — or at least request an extension.</p>

<h2>What about an extension?</h2>
<p>Filing Form 4868 by the April deadline extends the time to file to October 15. It does not extend the time to pay. If you paid what you expected to owe by April, you avoid most penalties even if the return itself comes later.</p>

<h2>Can penalties be removed?</h2>
<p>Sometimes. The IRS offers first-time penalty abatement if you have a clean compliance history for the previous three years and have filed all required returns. Penalties can also be removed for reasonable cause — for example, a serious illness, a natural disaster, or the inability to obtain records despite reasonable efforts. Interest is generally not removed unless the underlying penalty is.</p>

<h2>What to do now</h2>
<ol>
  <li><strong>File as soon as possible.</strong> The filing penalty grows every month; stopping it is the single biggest saving.</li>
  <li><strong>Pay what you can.</strong> Every payment reduces the balance that penalties and interest are calculated on.</li>
  <li><strong>Set up a payment plan if needed.</strong> The IRS offers short-term and longer-term installment agreements, and the failure-to-pay rate is reduced while an agreement is in place for a return filed on time.</li>
  <li><strong>Ask about penalty relief</strong> once the return is filed.</li>
  <li><strong>Check your state.</strong> States have their own penalties and rules for late returns.</li>
</ol>

<p>If you have missed a deadline, our <a href="/services/tax-preparation-filing">tax preparation team</a> can prepare the late return, work out what is owed and help you request penalty relief where you qualify.</p>

<p><em>This article is general information, not tax advice. Penalty rules and amounts change — speak with a qualified tax professional about your situation.</em></p>
$body$,
  $m$What happens if you file your U.S. tax return late: failure-to-file and failure-to-pay penalties, interest, refunds, extensions and penalty relief.$m$,
  'us'
),
(
  'what-happens-if-you-havent-filed-tax-returns-for-several-years',
  $t$What Happens If You Haven't Filed Your Tax Return for Several Years?$t$,
  $e$Unfiled returns do not go away on their own, but they can be resolved. What the IRS can do, how far back you usually need to go, and the steps to get compliant.$e$,
  'Individual Tax',
  'ANAV Global',
  'draft',
  $body$
<p>Falling behind on tax returns often starts with a single missed year — a move, an illness, a complicated situation — and becomes harder to face each year after. The good news is that unfiled returns can almost always be resolved, and coming forward voluntarily puts you in a far better position than waiting for the IRS to act.</p>

<h2>What the IRS can do</h2>
<ul>
  <li><strong>Prepare a return for you.</strong> Using the W-2s and 1099s it has on file, the IRS can create a "substitute for return." It includes your income but typically none of the deductions, credits or favorable filing status you may be entitled to, so the tax it calculates is usually higher than you would actually owe.</li>
  <li><strong>Charge penalties and interest.</strong> Failure-to-file and failure-to-pay penalties, plus interest, accumulate on any tax owed.</li>
  <li><strong>Collect.</strong> Once tax is assessed, the IRS can file liens and levy wages or bank accounts if the balance is not paid or resolved.</li>
</ul>
<p>There is also no time limit on assessing tax for a year in which no return was filed. The usual three-year window for the IRS to assess additional tax only starts once a return is filed.</p>

<h2>Refunds you may be losing</h2>
<p>If you were due refunds for some of those years — common if tax was withheld from wages — you generally have only three years from the original due date to claim them. Older refunds are forfeited, and a refund for one year cannot be used to offset what you owe for another once the deadline passes.</p>

<h2>How many years do you need to file?</h2>
<p>In most cases, the IRS looks for the last six years of returns to consider a taxpayer back in good standing, although every situation is different and you may be asked for more. Starting with the most recent years and working back is usually the practical approach.</p>

<h2>Getting compliant, step by step</h2>
<ol>
  <li><strong>Request your records.</strong> Wage and income transcripts from your IRS online account show the W-2s and 1099s reported for each year.</li>
  <li><strong>Reconstruct what is missing.</strong> Bank statements, invoices and receipts can support deductions and business expenses.</li>
  <li><strong>Prepare and file the returns</strong> with every deduction and credit you are entitled to — often reducing the balance substantially compared with any substitute returns.</li>
  <li><strong>Arrange payment.</strong> Installment agreements are available for balances you cannot pay at once, and in cases of genuine hardship other options may apply.</li>
  <li><strong>Request penalty relief</strong> where you qualify for first-time abatement or reasonable cause.</li>
  <li><strong>Stay current.</strong> File the current year on time; ongoing compliance is usually a condition of any payment arrangement.</li>
</ol>

<h2>Don't forget the states</h2>
<p>If you lived or worked in a state with an income tax, those returns are unfiled too. States share information with the IRS and pursue unfiled returns on their own.</p>

<p>Bringing several years up to date is detailed work, and it is work we do regularly. Our <a href="/services/tax-preparation-filing">tax preparation team</a> can reconstruct missing years, prepare back returns and help you plan the way back to good standing.</p>

<p><em>This article is general information, not tax or legal advice. If you have concerns beyond unfiled returns, speak with a qualified tax professional or attorney.</em></p>
$body$,
  $m$Haven't filed U.S. tax returns for several years? What the IRS can do, refunds you may lose, how many years to file and the steps to get compliant.$m$,
  'us'
),
(
  'how-to-fix-an-incorrectly-filed-tax-return',
  $t$How to Fix an Incorrectly Filed Tax Return$t$,
  $e$Spotted a mistake after filing? Not every error needs an amended return. How to tell which kind you have — and the right way to correct it.$e$,
  'Individual Tax',
  'ANAV Global',
  'draft',
  $body$
<p>Realizing there is a mistake on a return you have already filed is unsettling, but it is common and usually straightforward to fix. The right response depends on what kind of mistake it is.</p>

<h2>Errors the IRS fixes for you</h2>
<p>Simple math errors are usually corrected automatically during processing. The IRS sends a notice explaining the change, and you do not need to file anything unless you disagree. Similarly, if you forgot to attach a form such as a W-2, the IRS will generally write to ask for it rather than requiring an amended return.</p>

<h2>Errors that need an amended return</h2>
<p>You should file an amended return — Form 1040-X for individuals — if you need to change:</p>
<ul>
  <li><strong>Income</strong> — a missing 1099, a late K-1, or income reported twice.</li>
  <li><strong>Deductions or credits</strong> — something claimed that should not have been, or something missed.</li>
  <li><strong>Filing status</strong> — for example, from single to head of household.</li>
  <li><strong>Dependents</strong> — adding or removing a dependent.</li>
</ul>

<h2>If the return hasn't been processed yet</h2>
<p>If you discover the mistake within days of filing, do not file a second original return. Wait until the first has been accepted and processed — and, if you are due a refund, until you have received it — and then file an amended return. Filing a duplicate original causes delays and confusion.</p>

<h2>If you receive an IRS notice</h2>
<p>Sometimes the IRS finds the error first, often by matching your return with W-2s and 1099s it received. A notice proposing changes — commonly a CP2000 — is not a bill and not an audit. Read it carefully, check it against your records and respond by the deadline, agreeing or explaining why you disagree. An amended return is usually not the right response to that kind of notice.</p>

<h2>Correcting a mistake in your favor</h2>
<p>Errors that cost you money are worth fixing too. If you missed a deduction or credit, an amended return can claim a refund — generally within three years of filing the original return or two years of paying the tax, whichever is later.</p>

<h2>Correcting a mistake that increases your tax</h2>
<p>File the amended return and pay the additional tax as soon as possible. Interest runs from the original due date, so the sooner the balance is paid, the less it costs. Correcting an error yourself before the IRS finds it also puts you in a better position on penalties.</p>

<h2>Don't forget the state return</h2>
<p>Most changes to a federal return affect your state return too. Many states require you to file an amended state return within a set period after you amend federally.</p>

<p>We explain how to file Form 1040-X, and when you need it, in <a href="/blog/amended-tax-return-when-do-you-need-to-file-form-1040-x">Amended Tax Return: When Do You Need to File Form 1040-X?</a> If you would rather have a professional review the original and prepare the correction, our tax team handles federal and state amendments.</p>

<p><em>This article is general information, not tax advice. Speak with a qualified tax professional about your situation.</em></p>
$body$,
  $m$How to fix a mistake on a filed U.S. tax return: which errors the IRS corrects, when to amend, how to respond to a notice and state returns.$m$,
  'us'
),
(
  'amended-tax-return-when-do-you-need-to-file-form-1040-x',
  $t$Amended Tax Return: When Do You Need to File Form 1040-X?$t$,
  $e$Form 1040-X corrects an individual return after it has been filed. When you need it, the time limits, how to file and what to expect afterward.$e$,
  'Individual Tax',
  'ANAV Global',
  'draft',
  $body$
<p>Form 1040-X, Amended U.S. Individual Income Tax Return, is how you correct an individual return after it has been filed. It is not needed for every mistake — but when it is needed, filing it promptly and correctly saves time, interest and frustration.</p>

<h2>When you need to file Form 1040-X</h2>
<ul>
  <li>You left out income, such as a 1099 that arrived after you filed.</li>
  <li>You received a corrected form — a revised 1099 or a K-1 that changed after filing.</li>
  <li>You claimed a deduction or credit you were not entitled to, or missed one you were.</li>
  <li>You used the wrong filing status.</li>
  <li>You need to add or remove a dependent.</li>
</ul>

<h2>When you don't</h2>
<ul>
  <li><strong>Math errors</strong> — the IRS normally corrects these during processing.</li>
  <li><strong>A missing attachment</strong> — the IRS will usually ask for it.</li>
  <li><strong>A notice proposing changes</strong> — respond to the notice itself rather than amending.</li>
</ul>

<h2>Time limits</h2>
<p>To claim a refund, you generally must file Form 1040-X within three years of the date you filed the original return, or within two years of the date you paid the tax, whichever is later. Returns filed early are treated as filed on the due date. If the amendment increases your tax, there is no reason to wait — interest is already running from the original due date.</p>

<h2>How to file</h2>
<ol>
  <li><strong>Wait for the original to process.</strong> If you are expecting a refund on the original return, wait until you receive it.</li>
  <li><strong>Prepare the amended figures.</strong> Form 1040-X shows the original amounts, the changes and the corrected amounts, with an explanation of each change.</li>
  <li><strong>Attach what changed.</strong> Include any new or corrected forms and schedules affected by the change.</li>
  <li><strong>File electronically if you can.</strong> Amended returns for recent tax years can be e-filed through tax software, which is faster and more reliable than paper.</li>
  <li><strong>Pay any additional tax</strong> when you file to limit interest.</li>
</ol>
<p>File a separate Form 1040-X for each year you need to correct.</p>

<h2>What happens next</h2>
<p>Amended returns take considerably longer to process than original returns — often several months. You can follow progress with the IRS "Where's My Amended Return?" tool, usually starting a few weeks after filing. If the amendment produces a refund, it is issued once processing is complete; interest may be added.</p>

<h2>Your state return</h2>
<p>A federal change often requires a state amendment too. States set their own deadlines for reporting federal changes, so check yours.</p>

<p>Not sure whether your situation calls for an amendment? Read <a href="/blog/how-to-fix-an-incorrectly-filed-tax-return">How to Fix an Incorrectly Filed Tax Return</a>, or ask our <a href="/services/tax-preparation-filing">tax preparation team</a> to review the original return and prepare the federal and state amendments.</p>

<p><em>This article is general information, not tax advice. Speak with a qualified tax professional about your situation.</em></p>
$body$,
  $m$When to file Form 1040-X to amend a U.S. tax return, when you don't need to, the time limits, how to e-file it and what happens next.$m$,
  'us'
),
(
  'federal-tax-vs-state-tax-what-us-taxpayers-need-to-know',
  $t$Federal Tax vs. State Tax: What U.S. Taxpayers Need to Know$t$,
  $e$Federal and state income taxes are separate systems with separate rules. Who taxes what, how residency works, and what changes when you move or work across state lines.$e$,
  'Individual Tax',
  'ANAV Global',
  'draft',
  $body$
<p>Most Americans file at least two income tax returns each year: one to the IRS and one to their state. The two are connected, but they are separate taxes with separate rules — and the differences matter more than many people expect.</p>

<h2>Federal income tax</h2>
<p>Federal income tax is administered by the IRS under one set of rules nationwide. It applies to your worldwide income, uses progressive tax brackets, and is the starting point for almost everything else on your return. Your federal adjusted gross income is the number most states begin with too.</p>

<h2>State income tax</h2>
<p>Each state decides whether and how to tax income. Most do, with their own brackets or flat rates, their own deductions and credits, and their own forms and deadlines. A handful of states — including Texas, Florida, Nevada and Washington — do not tax wage income at all. Some cities and counties levy their own income taxes on top of the state's.</p>
<p>States also decide how closely to follow federal law. When federal rules change, a state may adopt the change, adopt it later or not at all. That is why a deduction allowed on your federal return is not always allowed on your state return, and the other way around.</p>

<h2>Residency: who gets to tax you</h2>
<ul>
  <li><strong>Resident:</strong> your home state generally taxes all your income, wherever it was earned.</li>
  <li><strong>Nonresident:</strong> a state where you worked but did not live generally taxes only the income you earned there.</li>
  <li><strong>Part-year resident:</strong> if you moved during the year, each state taxes the income from the period you lived there.</li>
</ul>
<p>To avoid paying twice on the same income, your home state usually gives a credit for tax paid to another state. Some neighboring states also have reciprocal agreements, so commuters pay tax only where they live.</p>

<h2>Situations that need extra care</h2>
<ul>
  <li><strong>Moving states</strong> mid-year — two part-year returns, and clear evidence of when your residency changed.</li>
  <li><strong>Remote work</strong> for an employer in another state — some states tax income based on where the employer is located.</li>
  <li><strong>Rental property or a business</strong> in another state — a nonresident return may be required there.</li>
  <li><strong>Business owners</strong> with partnership or S corporation income from several states — each state may want a return.</li>
</ul>

<h2>Deadlines and payments</h2>
<p>Most state returns are due on the same day as the federal return, but not all, and state extension rules vary. Some states accept the federal extension automatically; others require their own form. As with federal tax, an extension to file does not extend the time to pay.</p>

<h2>The bottom line</h2>
<p>Getting your federal return right is only half the job. If you moved, work remotely across state lines, or own property or a business in another state, the state side deserves as much attention as the federal side.</p>

<p>Our <a href="/services/tax-preparation-filing">tax preparation service</a> covers federal returns and state returns in every state, including part-year, nonresident and multi-state filings.</p>

<p><em>This article is general information, not tax advice. State rules vary widely — speak with a qualified tax professional about your situation.</em></p>
$body$,
  $m$Federal vs state income tax explained: how residency works, multi-state filing, credits for taxes paid to other states, deadlines and extensions.$m$,
  'us'
),
(
  'how-estimated-taxes-work-for-self-employed-individuals',
  $t$How Estimated Taxes Work for Self-Employed Individuals$t$,
  $e$No employer means no withholding. Who has to pay estimated tax, when it is due, how much to pay and how to avoid underpayment penalties.$e$,
  'Individual Tax',
  'ANAV Global',
  'draft',
  $body$
<p>When you work for an employer, tax is withheld from every paycheck. When you work for yourself, nobody does that for you. The U.S. tax system is pay-as-you-go, so self-employed people pay their tax during the year through quarterly estimated payments.</p>

<h2>Who has to pay</h2>
<p>You generally need to make estimated payments if you expect to owe at least $1,000 in federal tax for the year after subtracting withholding and refundable credits. That commonly includes freelancers, independent contractors, sole proprietors, partners and S corporation shareholders, as well as people with significant investment or rental income.</p>

<h2>What you are paying for</h2>
<ul>
  <li><strong>Income tax</strong> on your business profit and other income.</li>
  <li><strong>Self-employment tax</strong> — Social Security and Medicare for people who work for themselves. It is 15.3% of net self-employment earnings (12.4% for Social Security up to an annual wage limit, plus 2.9% for Medicare), calculated on 92.35% of your net profit. You can deduct half of it when calculating your income tax.</li>
</ul>

<h2>When payments are due</h2>
<p>Federal estimated taxes are paid in four installments:</p>
<ul>
  <li><strong>April 15</strong> — for income earned January through March</li>
  <li><strong>June 15</strong> — for April and May</li>
  <li><strong>September 15</strong> — for June through August</li>
  <li><strong>January 15</strong> of the following year — for September through December</li>
</ul>
<p>If a date falls on a weekend or holiday, the deadline moves to the next business day. The periods are not equal, which surprises many people.</p>

<h2>How much to pay: the safe harbors</h2>
<p>You avoid the underpayment penalty if your payments during the year cover at least the smaller of:</p>
<ul>
  <li><strong>90% of this year's tax</strong>, or</li>
  <li><strong>100% of last year's tax</strong> — rising to 110% if your adjusted gross income last year was above $150,000 ($75,000 if married filing separately).</li>
</ul>
<p>The prior-year safe harbor is the simplest: divide last year's total tax by four and pay that each quarter. It works well when income is growing, because the penalty is avoided even if you owe more at filing.</p>

<h2>If your income is uneven</h2>
<p>If most of your income arrives late in the year, you may be able to use the annualized income method, which matches payments to when the income was actually earned. It takes more work but can avoid penalties for seasonal businesses.</p>

<h2>How to pay</h2>
<p>Payments can be made through your IRS online account, IRS Direct Pay, the Electronic Federal Tax Payment System (EFTPS), or by card through an approved processor. Keep confirmations. Most states with an income tax have their own estimated payment schedules too.</p>

<h2>A simple habit that helps</h2>
<p>Set aside a percentage of every payment you receive in a separate savings account for taxes. When each quarterly deadline arrives, the money is already there — and a profitable year never turns into an unaffordable tax bill.</p>

<p>Our tax team calculates quarterly estimates for self-employed clients each year and adjusts them as income changes, as part of our <a href="/services/tax-preparation-filing">tax preparation and filing</a> service.</p>

<p><em>This article is general information, not tax advice. Speak with a qualified tax professional about your situation.</em></p>
$body$,
  $m$How estimated taxes work for the self-employed: who must pay, quarterly due dates, self-employment tax, safe harbor rules and how to pay.$m$,
  'us'
),
(
  'tax-deductions-vs-tax-credits-whats-the-difference',
  $t$Tax Deductions vs. Tax Credits: What's the Difference?$t$,
  $e$Deductions and credits both lower your tax, but not in the same way — and a dollar of credit is usually worth far more than a dollar of deduction. Here is why.$e$,
  'Individual Tax',
  'ANAV Global',
  'draft',
  $body$
<p>Deductions and credits are the two main ways to reduce your tax bill. They are often mentioned together, but they work differently, and understanding the difference helps you see which tax breaks are worth the most to you.</p>

<h2>Tax deductions reduce your taxable income</h2>
<p>A deduction lowers the amount of income that is taxed. Its value depends on your tax bracket. If you are in the 22% bracket, a $1,000 deduction saves about $220 in federal tax. In the 12% bracket, the same deduction saves about $120.</p>
<p>Deductions come in three main forms:</p>
<ul>
  <li><strong>Adjustments to income</strong> ("above-the-line" deductions) — such as deductible IRA contributions, HSA contributions, student loan interest and half of self-employment tax. You get these whether or not you itemize.</li>
  <li><strong>The standard deduction</strong> — a fixed amount based on your filing status, adjusted each year for inflation.</li>
  <li><strong>Itemized deductions</strong> — mortgage interest, state and local taxes, charitable gifts and large medical expenses. You claim these instead of the standard deduction only if they add up to more.</li>
</ul>
<p>Some newer deductions — for qualified tips, overtime, seniors and certain car loan interest, available for 2025 through 2028 — can be claimed whether you itemize or not.</p>

<h2>Tax credits reduce your tax directly</h2>
<p>A credit reduces the tax itself, dollar for dollar. A $1,000 credit cuts your tax by $1,000 regardless of your bracket. That is why credits are generally more valuable than deductions of the same size.</p>
<p>Credits come in two kinds:</p>
<ul>
  <li><strong>Nonrefundable credits</strong> can reduce your tax to zero, but any excess is lost.</li>
  <li><strong>Refundable credits</strong> can reduce your tax below zero — the excess is paid to you as a refund. The Earned Income Tax Credit is fully refundable; the Child Tax Credit and the American Opportunity education credit are partly refundable.</li>
</ul>

<h2>A side-by-side example</h2>
<p>Suppose you are in the 22% bracket. A $2,000 deduction reduces your taxable income by $2,000 and your tax by about $440. A $2,000 credit reduces your tax by the full $2,000. Same number on paper, very different result.</p>

<h2>Common examples</h2>
<ul>
  <li><strong>Deductions:</strong> retirement contributions, student loan interest, mortgage interest, charitable gifts, business expenses for the self-employed.</li>
  <li><strong>Credits:</strong> Child Tax Credit, Child and Dependent Care Credit, education credits, Earned Income Tax Credit, Saver's Credit for retirement contributions by lower- and middle-income workers.</li>
</ul>

<h2>Why it matters for planning</h2>
<p>When you compare options — contributing to a retirement account, paying for education, buying a home — look at whether the benefit is a deduction or a credit and what it is really worth at your income level. Many credits phase out as income rises, and some deductions only help if you itemize.</p>

<p>When we prepare a return, we check eligibility for both deductions and credits and show what each is worth, so you can plan next year with real numbers. Learn more about our <a href="/services/tax-preparation-filing">tax preparation service</a>.</p>

<p><em>This article is general information, not tax advice. Eligibility and limits change each year — speak with a qualified tax professional about your situation.</em></p>
$body$,
  $m$Tax deductions vs tax credits: how each reduces your tax, refundable vs nonrefundable credits, worked examples and common examples of each.$m$,
  'us'
),
(
  'how-to-reduce-your-tax-liability-legally',
  $t$How to Reduce Your Tax Liability Legally$t$,
  $e$Paying less tax is not about loopholes. Practical, legitimate ways to lower your tax bill — from retirement savings and timing to the structure of your business.$e$,
  'Individual Tax',
  'ANAV Global',
  'draft',
  $body$
<p>There is an important line between tax avoidance — arranging your affairs to pay no more than the law requires — and tax evasion, which is illegal. Everything below sits firmly on the right side of that line. Most of it simply requires planning before the year ends rather than after.</p>

<h2>1. Use tax-advantaged retirement accounts</h2>
<p>Contributions to a traditional 401(k), 403(b) or deductible IRA reduce your taxable income now. If you are self-employed, a SEP-IRA or solo 401(k) can allow much larger contributions. Roth accounts work the other way — no deduction now, but qualified withdrawals later are tax-free — which can be the better choice when your current tax rate is low.</p>

<h2>2. Fund a Health Savings Account</h2>
<p>If you have a qualifying high-deductible health plan, HSA contributions are deductible, growth is tax-free, and withdrawals for medical expenses are tax-free too. Few accounts offer all three benefits.</p>

<h2>3. Claim every credit you qualify for</h2>
<p>Credits reduce tax dollar for dollar. Families should check the Child Tax Credit and the Child and Dependent Care Credit; students and parents of students should check education credits; lower- and middle-income savers may qualify for the Saver's Credit.</p>

<h2>4. Think about timing</h2>
<p>When you receive income and when you pay deductible expenses can affect which year they are taxed in. Self-employed people on the cash method have some flexibility at year end. If you expect a much higher or lower income next year, timing can make a meaningful difference.</p>

<h2>5. Hold investments for the long term</h2>
<p>Gains on investments held more than a year are taxed at lower long-term capital gains rates than gains on shorter holdings. Selling investments at a loss to offset gains — tax-loss harvesting — can also reduce tax, within the rules on repurchasing the same investment.</p>

<h2>6. Give strategically</h2>
<p>Donating appreciated stock instead of cash avoids tax on the gain. "Bunching" several years of gifts into one year can push itemized deductions above the standard deduction. People aged 70½ or older can give directly from an IRA through a qualified charitable distribution. And starting in 2026, people who take the standard deduction can also deduct cash gifts to charity, up to $1,000 ($2,000 for married couples filing jointly).</p>

<h2>7. Choose the right business structure</h2>
<p>For business owners, the entity you operate through — sole proprietorship, LLC, S corporation or C corporation — affects how much self-employment tax you pay and which deductions you can use, including the qualified business income deduction. The right choice changes as profits grow.</p>

<h2>8. Keep good records</h2>
<p>A deduction you cannot document is a deduction you may lose. Organized records turn legitimate expenses into actual savings and protect them if the IRS ever asks.</p>

<h2>9. Plan before December 31</h2>
<p>Most of these strategies only work if they happen during the tax year. A planning review in the fourth quarter — with your books current — gives you time to act.</p>

<p>If you would like a second set of eyes on your options, our tax team builds planning into the year rather than leaving it until filing season. Read more in <a href="/blog/tax-planning-vs-tax-preparation-whats-the-difference">Tax Planning vs. Tax Preparation</a>.</p>

<p><em>This article is general information, not tax advice. The right strategy depends on your circumstances — speak with a qualified tax professional before acting.</em></p>
$body$,
  $m$Legitimate ways to reduce your U.S. tax liability: retirement accounts, HSAs, credits, timing, capital gains, charitable giving and business structure.$m$,
  'us'
)
on conflict (slug) do nothing;
