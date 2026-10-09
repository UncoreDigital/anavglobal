-- ============================================================================
-- ANAV Global — blog articles from the client's change list (October 2026)
-- Part 2 of 3: small business tax (point 9) and tax planning (point 10).
-- Run after 0006_seed_blog_tax.sql. Safe to re-run: existing slugs are left
-- alone.
--
-- Seeded as DRAFTS on the U.S. site, for ANAV's tax team to review and publish
-- in Admin → Insights. Same brief as part 1: educate first, mention the
-- relevant service once.
--
-- "Year-End Tax Planning Strategies for Small Business Owners" is on the
-- client's list; the 0002 draft "…for Small Businesses" covered the same
-- ground more generally. Rather than publish two, the existing draft is
-- retitled and rewritten below — but only while it is still a draft, so a
-- version someone has already edited and published is never overwritten.
-- ============================================================================

insert into public.posts (slug, title, excerpt, category, author, status, content, meta_description, region)
values
(
  'llc-tax-filing-how-is-your-llc-taxed',
  $t$LLC Tax Filing: How Is Your LLC Taxed?$t$,
  $e$An LLC is a legal structure, not a tax category. How the IRS taxes your LLC by default, which forms you file, and the elections that can change it.$e$,
  'Small Business Tax',
  'ANAV Global',
  'draft',
  $body$
<p>Forming a limited liability company is one of the most common first steps for a new business. But many owners are surprised to learn that "LLC" is not a tax classification. The IRS decides how to tax an LLC based on how many owners it has — and on any elections the owners make.</p>

<h2>Single-member LLC: a "disregarded entity" by default</h2>
<p>An LLC with one owner is ignored for federal income tax purposes unless it chooses otherwise. The business does not file its own income tax return. Instead, its income and expenses are reported on the owner's return — on Schedule C for most businesses, Schedule E for rental activity, or Schedule F for farming.</p>
<p>The owner pays income tax on the profit and, for an active business, self-employment tax as well. The LLC still has its own legal identity, so it may still need an employer identification number (EIN), especially if it has employees, and it may have state filings and fees.</p>

<h2>Multi-member LLC: a partnership by default</h2>
<p>An LLC with two or more owners is taxed as a partnership unless it elects otherwise. It files Form 1065, a partnership information return, by the 15th day of the third month after its year end — March 15 for calendar-year businesses. The LLC itself usually pays no federal income tax. Instead, each member receives a Schedule K-1 showing their share of income, deductions and credits, which they report on their own returns.</p>
<p>Members who work in the business generally pay self-employment tax on their share of the profit. The allocation of profits and losses follows the operating agreement, which is why a well-drafted agreement matters for tax as well as legal reasons.</p>

<h2>Electing to be taxed as a corporation</h2>
<p>Any LLC can choose to be taxed as a corporation:</p>
<ul>
  <li><strong>As a C corporation</strong>, by filing Form 8832. The LLC then files Form 1120 and pays corporate income tax on its profit; owners are taxed again on dividends they receive.</li>
  <li><strong>As an S corporation</strong>, by filing Form 2553 (an LLC that qualifies can elect S status directly). The LLC files Form 1120-S, profits pass through to the owners, and owners who work in the business are paid a reasonable salary through payroll.</li>
</ul>
<p>The S corporation election is the most common one for profitable small businesses, because it can reduce self-employment tax. We cover when it makes sense in <a href="/blog/when-should-an-llc-consider-s-corporation-election">When Should an LLC Consider S Corporation Election?</a></p>

<h2>Don't forget the state</h2>
<p>States treat LLCs in their own ways. Some charge annual LLC fees or franchise taxes regardless of profit; some tax LLCs at the entity level; most require an annual report. These obligations exist even in a year when the business makes no money.</p>

<h2>Quick reference</h2>
<ul>
  <li><strong>One owner, no election:</strong> report on your Form 1040 (Schedule C, E or F).</li>
  <li><strong>Two or more owners, no election:</strong> Form 1065 and K-1s.</li>
  <li><strong>C corporation election:</strong> Form 1120.</li>
  <li><strong>S corporation election:</strong> Form 1120-S and K-1s, plus payroll for owner-employees.</li>
</ul>

<p>Whichever way your LLC is taxed, the return is only as good as the books behind it. Our team keeps LLC books current and prepares the returns that go with them — see <a href="/services/tax-preparation-filing">tax preparation and filing</a>.</p>

<p><em>This article is general information, not tax or legal advice. Speak with a qualified professional about your business.</em></p>
$body$,
  $m$How an LLC is taxed in the U.S.: single-member vs multi-member defaults, Forms 1040, 1065, 1120 and 1120-S, and electing corporate or S corp status.$m$,
  'us'
),
(
  'sole-proprietorship-vs-llc-tax-differences',
  $t$Sole Proprietorship vs. LLC: Understanding the Tax Differences$t$,
  $e$For federal tax, a single-member LLC and a sole proprietorship are often identical. The real differences are legal protection, state costs and flexibility. Here is how to compare them.$e$,
  'Small Business Tax',
  'ANAV Global',
  'draft',
  $body$
<p>Many people starting out on their own ask whether they should form an LLC or simply operate as a sole proprietor. The surprising answer for federal income tax is that, by default, there is often no difference at all. The reasons to choose one over the other lie elsewhere.</p>

<h2>How each is taxed by default</h2>
<p>A <strong>sole proprietorship</strong> is not a separate legal entity. You and the business are the same person for tax purposes, and you report business income and expenses on Schedule C of your Form 1040.</p>
<p>A <strong>single-member LLC</strong> is a separate legal entity, but by default the IRS disregards it for income tax. You still report the business on Schedule C, pay income tax on the profit and pay self-employment tax on your net earnings.</p>
<p>Same forms, same tax rates, same deductions. If you are comparing the two purely on federal income tax, they come out even.</p>

<h2>Where they differ</h2>

<h3>Liability protection</h3>
<p>This is the main reason people form an LLC. A properly formed and maintained LLC can separate your personal assets from the debts and liabilities of the business. A sole proprietor has no such separation. The protection depends on running the LLC as a genuinely separate business — its own bank account, its own contracts, no mixing of funds.</p>

<h3>State fees and filings</h3>
<p>Forming an LLC means a state filing fee, and many states charge annual fees, franchise taxes or report fees. In some states the annual cost is significant even for a small business. A sole proprietorship usually needs only local business licenses.</p>

<h3>Tax flexibility</h3>
<p>An LLC can elect to be taxed as an S corporation or C corporation as it grows. An S corporation election can reduce self-employment tax once profits are high enough, because owners are paid a salary and take the remaining profit as distributions. A sole proprietor would need to form an entity first to get the same option.</p>

<h3>Credibility and banking</h3>
<p>Clients, lenders and payment platforms sometimes treat an LLC as a more established business, and having a separate entity makes it easier to keep business finances apart from personal ones.</p>

<h2>Things that stay the same</h2>
<ul>
  <li>You pay self-employment tax on net earnings either way (unless an LLC elects S corporation status).</li>
  <li>You need to make quarterly estimated tax payments either way.</li>
  <li>Business deductions — home office, vehicle, equipment, health insurance for the self-employed — work the same way.</li>
  <li>Either can qualify for the qualified business income deduction.</li>
</ul>

<h2>How to decide</h2>
<p>If your work carries meaningful liability risk, or you expect profits to grow to a level where an S corporation election makes sense, an LLC is often worth the state costs. If you are testing an idea with modest income and little risk, a sole proprietorship keeps things simple — and you can form an LLC later.</p>

<p>We help owners at both stages keep clean books and file the right returns, and we can model when an S corporation election starts to pay off. See our <a href="/services/business-advisory">business advisory</a> service.</p>

<p><em>This article is general information, not tax or legal advice. Speak with a qualified professional about your business.</em></p>
$body$,
  $m$Sole proprietorship vs single-member LLC: identical federal tax by default, but different liability protection, state costs and S corp flexibility.$m$,
  'us'
),
(
  's-corporation-vs-llc-which-is-better-for-your-business',
  $t$S Corporation vs. LLC: Which Is Better for Your Business?$t$,
  $e$An LLC is a legal entity; an S corporation is a tax election. Understanding that difference is the key to choosing — and many businesses end up as both.$e$,
  'Small Business Tax',
  'ANAV Global',
  'draft',
  $body$
<p>"Should I be an S corp or an LLC?" is one of the most common questions small business owners ask. It is also slightly the wrong question, because the two are not alternatives in the way people assume. An LLC is a type of legal entity created under state law. An S corporation is a federal tax status. An LLC can elect to be taxed as an S corporation — and many do.</p>
<p>The real comparison is between an LLC taxed in its default way and a business taxed as an S corporation.</p>

<h2>Default LLC taxation</h2>
<p>A single-member LLC reports its profit on the owner's Schedule C; a multi-member LLC files a partnership return. Either way, owners who work in the business pay <strong>self-employment tax</strong> — Social Security and Medicare — on their entire share of the profit, in addition to income tax.</p>

<h2>S corporation taxation</h2>
<p>An S corporation also passes profit through to its owners, who pay income tax on it. The difference is how owners who work in the business are paid:</p>
<ul>
  <li>They receive a <strong>reasonable salary</strong> through payroll, on which Social Security and Medicare are paid.</li>
  <li>Remaining profit can be taken as <strong>distributions</strong>, which are not subject to self-employment or payroll tax.</li>
</ul>
<p>That split is where the potential saving comes from.</p>

<h2>The trade-offs</h2>
<ul>
  <li><strong>Payroll:</strong> an S corporation must run payroll for owner-employees, with withholding, payroll tax returns and W-2s.</li>
  <li><strong>Reasonable salary:</strong> the IRS expects owners to pay themselves a salary that reflects their role. Setting it too low is a common audit issue.</li>
  <li><strong>A separate return:</strong> Form 1120-S, due March 15 for calendar-year companies, plus K-1s for shareholders.</li>
  <li><strong>Eligibility rules:</strong> no more than 100 shareholders, generally U.S. individuals and certain trusts and estates, and only one class of stock.</li>
  <li><strong>Less flexibility:</strong> profits and losses must be allocated strictly by ownership percentage, unlike an LLC taxed as a partnership, where the operating agreement can allocate them differently.</li>
  <li><strong>State treatment:</strong> some states do not recognize S corporation status or impose their own entity-level taxes.</li>
</ul>

<h2>When default LLC taxation is better</h2>
<ul>
  <li>Profits are modest, so the self-employment tax saving would not cover payroll and accounting costs.</li>
  <li>Owners want special allocations of profit or losses among themselves.</li>
  <li>The business holds appreciating property, such as real estate, where partnership rules are more flexible.</li>
</ul>

<h2>When an S corporation election is better</h2>
<ul>
  <li>The business is consistently profitable, with profit comfortably above a reasonable salary for the owner.</li>
  <li>Owners are willing to run payroll and keep corporate formalities.</li>
  <li>The ownership is simple and fits the eligibility rules.</li>
</ul>

<h2>The answer for many businesses: both</h2>
<p>A common structure is an LLC for legal protection and administrative simplicity, taxed as an S corporation once profits justify it. The decision is not permanent in the early years, and it should be revisited as the business grows.</p>

<p>The numbers decide this question, not rules of thumb. Our <a href="/services/business-advisory">business advisory</a> team models the comparison using your actual profit, salary and state, so you can see the difference before you elect.</p>

<p><em>This article is general information, not tax or legal advice. Speak with a qualified professional about your business.</em></p>
$body$,
  $m$S corporation vs LLC explained: legal entity vs tax election, self-employment tax, reasonable salary, eligibility, trade-offs and when each fits.$m$,
  'us'
),
(
  'when-should-an-llc-consider-s-corporation-election',
  $t$When Should an LLC Consider S Corporation Election?$t$,
  $e$An S corporation election can cut self-employment tax — but only once profits are high enough to cover the extra costs. Signs it may be time, and how the election works.$e$,
  'Small Business Tax',
  'ANAV Global',
  'draft',
  $body$
<p>For a profitable LLC, electing to be taxed as an S corporation is one of the most effective ways to reduce tax. Elect too early, though, and the extra costs outweigh the savings. Timing is everything.</p>

<h2>How the saving works</h2>
<p>By default, LLC owners who work in the business pay self-employment tax on all of their profit. After an S corporation election, they pay themselves a reasonable salary — taxed through payroll — and can take the remaining profit as distributions, which are not subject to Social Security and Medicare tax. The saving is roughly the self-employment tax on the distribution portion.</p>

<h2>What it costs</h2>
<ul>
  <li><strong>Payroll</strong> — a payroll service, quarterly payroll tax returns, W-2s and state unemployment filings.</li>
  <li><strong>A separate tax return</strong> — Form 1120-S, with shareholder K-1s.</li>
  <li><strong>More bookkeeping discipline</strong> — clean separation of salary, distributions and reimbursements.</li>
  <li><strong>State costs</strong> — some states charge entity-level taxes or fees on S corporations.</li>
</ul>

<h2>Signs it may be time</h2>
<ul>
  <li>Your business has been <strong>consistently profitable</strong>, not just in one strong year.</li>
  <li>Net profit is <strong>comfortably above</strong> what would be a reasonable salary for your role. If a reasonable salary would absorb nearly all the profit, there is little left to save on.</li>
  <li>The estimated self-employment tax saving is <strong>clearly larger</strong> than the added payroll, accounting and state costs.</li>
  <li>You are prepared to <strong>run payroll</strong> on schedule and keep business and personal finances fully separate.</li>
  <li>The ownership is <strong>simple</strong> — eligible shareholders and no need for special profit allocations.</li>
</ul>
<p>There is no single profit figure at which the election always makes sense; it depends on the salary your role justifies, your state, and your other income. That is why it should be modeled with your own numbers.</p>

<h2>How and when to elect</h2>
<p>The election is made by filing Form 2553, signed by all shareholders. To take effect for a tax year, it must generally be filed no later than two months and 15 days after the start of that year — March 15 for a calendar-year business — or at any time during the previous year. A new business must file within two months and 15 days of when its tax year begins.</p>
<p>If the deadline was missed, relief for a late election is often available when there was reasonable cause and the business has acted consistently with S corporation status.</p>

<h2>Other things to consider</h2>
<ul>
  <li><strong>Qualified business income deduction:</strong> salary paid to you is not qualified business income, so the election can change the size of this deduction. Model both together.</li>
  <li><strong>Retirement contributions:</strong> many plan contributions are based on W-2 salary, so a lower salary can mean lower contributions.</li>
  <li><strong>Health insurance:</strong> premiums for owners of more than 2% are handled through payroll in a specific way.</li>
  <li><strong>State-level elections:</strong> many states let pass-through entities pay state tax at the entity level, which can restore a federal deduction. Ask whether yours does.</li>
</ul>

<p>If you are weighing the election, our <a href="/services/business-advisory">business advisory</a> team can compare your tax under both structures, recommend a reasonable salary and handle the filing and payroll set-up.</p>

<p><em>This article is general information, not tax or legal advice. Speak with a qualified professional about your business.</em></p>
$body$,
  $m$When an LLC should consider an S corporation election: how the saving works, the extra costs, signs it's time, and the Form 2553 deadline.$m$,
  'us'
),
(
  'what-is-a-reasonable-salary-for-an-s-corporation-owner',
  $t$What Is a Reasonable Salary for an S Corporation Owner?$t$,
  $e$S corporation owners who work in the business must pay themselves a reasonable salary. What "reasonable" means to the IRS, how to set it and how to document it.$e$,
  'Small Business Tax',
  'ANAV Global',
  'draft',
  $body$
<p>The main tax advantage of an S corporation is that profit taken as distributions is not subject to Social Security and Medicare tax. The main condition is that shareholders who work in the business must first be paid a reasonable salary through payroll. Getting that salary right is one of the most important decisions an S corporation owner makes.</p>

<h2>Why the IRS cares</h2>
<p>If owners could take all of their profit as distributions and pay themselves nothing, payroll taxes would disappear. So the IRS requires shareholder-employees to receive reasonable compensation for the services they provide before taking distributions. Courts have repeatedly reclassified "distributions" as wages where owners paid themselves too little, adding back payroll taxes, penalties and interest.</p>

<h2>What "reasonable" means</h2>
<p>There is no fixed formula or percentage. Reasonable compensation is generally what the business would have to pay someone else to do the same work. The IRS and courts look at factors such as:</p>
<ul>
  <li>The owner's training, experience and qualifications.</li>
  <li>Their duties and responsibilities, and the time they devote to the business.</li>
  <li>What comparable businesses pay for comparable services.</li>
  <li>The size and complexity of the business, and its gross receipts.</li>
  <li>The company's history of salaries, bonuses and distributions.</li>
  <li>Compensation agreements and the use of a formula to set pay.</li>
</ul>

<h2>Common approaches</h2>
<ul>
  <li><strong>Market approach:</strong> compare with salary data for similar roles in your area and industry.</li>
  <li><strong>Cost approach:</strong> break the owner's work into its roles — manager, salesperson, technician, bookkeeper — and add up what it would cost to hire for each.</li>
  <li><strong>Income approach:</strong> consider what return an outside investor would expect, with the remainder attributable to the owner's labor.</li>
</ul>
<p>Many owners use a combination, especially when they wear several hats.</p>

<h2>Red flags</h2>
<ul>
  <li>No salary at all while taking regular distributions.</li>
  <li>A salary far below what the owner's role would pay elsewhere.</li>
  <li>Distributions many times larger than salary year after year in a business driven mainly by the owner's personal services.</li>
</ul>

<h2>Document your reasoning</h2>
<p>Write down how the salary was set: the data you relied on, the roles you considered and the hours involved. Review it each year as the business changes. If the IRS ever asks, a documented, sensible method is far stronger than a number chosen to minimize tax.</p>

<h2>The balance to strike</h2>
<p>A salary that is too low invites scrutiny. A salary that is too high gives up the benefit of the election. The goal is a defensible figure in the reasonable range — and an honest look at whether the election still makes sense if that figure absorbs most of the profit.</p>

<p>Our team helps S corporation owners set and document a reasonable salary, run payroll for it and plan distributions around it. See our <a href="/services/payroll-services">payroll services</a>.</p>

<p><em>This article is general information, not tax advice. Speak with a qualified tax professional about your business.</em></p>
$body$,
  $m$What is reasonable compensation for an S corporation owner? IRS factors, market and cost approaches, red flags and how to document your salary.$m$,
  'us'
),
(
  'how-s-corporation-owners-can-plan-for-taxes',
  $t$How S Corporation Owners Can Plan for Taxes$t$,
  $e$Running an S corporation brings tax planning opportunities — and responsibilities. Salary, distributions, basis, estimated taxes, benefits and the year-end checklist.$e$,
  'Small Business Tax',
  'ANAV Global',
  'draft',
  $body$
<p>An S corporation can be a very tax-efficient way to run a profitable business, but only if the owner plans around how it works. Profit passes through to your personal return whether or not you take it out, and the choices you make during the year determine how much of the potential saving you keep.</p>

<h2>1. Set a reasonable salary — and actually run payroll</h2>
<p>Shareholders who work in the business need a reasonable salary paid through payroll, with withholding and payroll tax returns filed on time. Decide on the figure early in the year, review it if the business changes, and keep your reasoning on file. See <a href="/blog/what-is-a-reasonable-salary-for-an-s-corporation-owner">What Is a Reasonable Salary for an S Corporation Owner?</a></p>

<h2>2. Plan for tax on the profit you don't withdraw</h2>
<p>You are taxed on your share of the S corporation's profit even if it stays in the company's bank account. Payroll withholding on your salary rarely covers that tax. Make quarterly estimated payments — or increase withholding from your salary — so the year does not end with a large balance due and an underpayment penalty.</p>

<h2>3. Track your basis</h2>
<p>Your basis in the company — what you invested plus your share of profits, minus losses and distributions — determines whether distributions are tax-free and whether you can deduct losses. Distributions above basis are taxable as capital gains. Shareholders who receive distributions, claim losses, sell stock or receive loan repayments may need to file Form 7203 with their return, so basis needs to be tracked every year.</p>

<h2>4. Reimburse expenses the right way</h2>
<p>Paying personal expenses from the company account blurs your books and your basis. Instead, set up an accountable plan so the company reimburses you for legitimate business costs — a home office, mileage, a phone — with documentation. Reimbursements under an accountable plan are deductible to the company and not taxable to you.</p>

<h2>5. Handle health insurance correctly</h2>
<p>For shareholders who own more than 2%, health insurance premiums paid by the company are added to W-2 wages, and the shareholder can then generally deduct them as self-employed health insurance on their own return. Set this up through payroll before year end.</p>

<h2>6. Use retirement plans</h2>
<p>A 401(k) lets you contribute as an employee from your salary and have the company make employer contributions, all reducing taxable income. Because many contribution limits are based on W-2 pay, the salary decision and the retirement decision should be made together.</p>

<h2>7. Consider your state's pass-through entity tax</h2>
<p>Many states allow S corporations to elect to pay state income tax at the entity level. Because the company deducts that tax federally, the election can produce a federal saving for owners affected by the limit on deducting state and local taxes. Rules and deadlines vary by state.</p>

<h2>8. Review before December 31</h2>
<ul>
  <li>Project the year's profit with current books.</li>
  <li>Decide on any year-end bonus through payroll.</li>
  <li>Plan equipment purchases and retirement contributions.</li>
  <li>Check that estimated payments cover the projected tax.</li>
  <li>Confirm distributions are within basis.</li>
</ul>

<p>Planning works best with up-to-date books. Our <a href="/services/business-advisory">business advisory</a> and bookkeeping teams keep S corporation numbers current and review them with owners well before year end.</p>

<p><em>This article is general information, not tax advice. Speak with a qualified tax professional about your business.</em></p>
$body$,
  $m$Tax planning for S corporation owners: reasonable salary, estimated taxes on pass-through profit, basis and Form 7203, accountable plans and more.$m$,
  'us'
),
(
  'business-tax-deductions-every-small-business-owner-should-know',
  $t$Business Tax Deductions Every Small Business Owner Should Know$t$,
  $e$Ordinary and necessary business expenses reduce your taxable profit. The deductions small business owners use most — and the rules that come with them.$e$,
  'Small Business Tax',
  'ANAV Global',
  'draft',
  $body$
<p>The tax code allows businesses to deduct expenses that are "ordinary and necessary" for their trade — common in your industry and helpful for your business. That covers far more than many owners claim. Here are the deductions small businesses use most, and what to know about each.</p>

<h2>Home office</h2>
<p>If you use part of your home regularly and exclusively for business, you can deduct a share of rent or mortgage interest, utilities, insurance and repairs. The simplified method allows $5 per square foot for up to 300 square feet, without tracking actual costs. The space must genuinely be a place of business — a dining table used for work in the evenings does not qualify.</p>

<h2>Vehicles</h2>
<p>For a vehicle used in the business, you can deduct either the IRS standard mileage rate for business miles or the actual costs — fuel, insurance, repairs, depreciation — multiplied by the business-use percentage. Either way, you need a mileage log. Commuting between home and a regular workplace is not deductible.</p>

<h2>Equipment and depreciation</h2>
<p>Computers, machinery, furniture and vehicles are normally depreciated over several years, but two provisions let businesses deduct much more up front: Section 179 expensing and bonus depreciation, which was restored to 100% for qualifying property acquired after January 19, 2025. Whether to take the full deduction now or spread it out is a planning decision — sometimes a bigger deduction in a later, higher-income year is worth more.</p>

<h2>Meals and travel</h2>
<p>Business meals with clients, customers or employees are generally 50% deductible, with documentation of who attended and the business purpose. Entertainment — sporting events, concerts — is not deductible. Business travel away from your tax home, including flights, lodging and 50% of meals, is deductible when the trip is primarily for business.</p>

<h2>Health insurance and retirement</h2>
<p>Self-employed owners can generally deduct health insurance premiums for themselves and their families. Contributions to a SEP-IRA, SIMPLE IRA or solo 401(k) reduce taxable income while building savings — often the single largest deduction available to a profitable small business.</p>

<h2>Everyday operating costs</h2>
<ul>
  <li>Rent for business premises and equipment leases.</li>
  <li>Software, subscriptions, phone and internet (the business share).</li>
  <li>Advertising, websites and marketing.</li>
  <li>Professional fees — accountants, attorneys, consultants.</li>
  <li>Business insurance.</li>
  <li>Interest on business loans and credit cards.</li>
  <li>Wages, contractor payments and payroll taxes.</li>
  <li>Training and education that maintains or improves skills used in your current business.</li>
</ul>

<h2>Start-up costs</h2>
<p>Costs of investigating and setting up a business before it opens can be deducted up to $5,000 in the first year, with the rest amortized over 15 years. The immediate deduction is reduced when start-up costs exceed $50,000.</p>

<h2>The qualified business income deduction</h2>
<p>Owners of pass-through businesses — sole proprietorships, partnerships, S corporations and many LLCs — may be able to deduct up to 20% of their qualified business income on their personal return. Limits apply at higher incomes, especially for service businesses, but for many owners it is one of the largest deductions available.</p>

<h2>Records make deductions real</h2>
<p>Every deduction depends on records: receipts, invoices, mileage logs and a clear business purpose. A separate business bank account and card make that far easier. See <a href="/blog/how-to-keep-business-and-personal-expenses-separate">How to Keep Your Business and Personal Expenses Separate</a>.</p>

<p>Categorized books throughout the year are how deductions get captured rather than reconstructed. Our <a href="/services/bookkeeping-accounting">bookkeeping service</a> keeps every expense coded and documented, ready for tax time.</p>

<p><em>This article is general information, not tax advice. Rules and limits change — speak with a qualified tax professional about your business.</em></p>
$body$,
  $m$Business tax deductions small business owners should know: home office, vehicles, depreciation, meals, health insurance, retirement, QBI and more.$m$,
  'us'
),
(
  'how-to-keep-business-and-personal-expenses-separate',
  $t$How to Keep Your Business and Personal Expenses Separate$t$,
  $e$Mixing personal and business money is the most common bookkeeping problem in small businesses. Why it matters, and simple habits that keep them apart.$e$,
  'Small Business Tax',
  'ANAV Global',
  'draft',
  $body$
<p>When you start a business, it can feel natural to pay for everything from one account. Before long, though, the business's numbers and your personal spending are tangled together — and untangling them at tax time is slow, expensive and error-prone. Keeping them separate from the start is one of the most valuable habits a business owner can build.</p>

<h2>Why it matters</h2>
<ul>
  <li><strong>Accurate numbers.</strong> You cannot know whether the business is profitable if its records include your groceries.</li>
  <li><strong>Deductions you can defend.</strong> Business expenses need to be clearly business expenses. Mixed accounts make deductions easy to miss and harder to support if the IRS asks.</li>
  <li><strong>Liability protection.</strong> For an LLC or corporation, treating business money as personal money can weaken the legal separation that protects your personal assets.</li>
  <li><strong>Lower accounting costs.</strong> Clean accounts take far less time to reconcile and review.</li>
</ul>

<h2>Practical steps</h2>

<h3>1. Open dedicated business accounts</h3>
<p>Use a business checking account and a business credit card for business transactions only. If you have an LLC or corporation, open the accounts in the business's name using its EIN.</p>

<h3>2. Pay yourself properly</h3>
<p>Move money from the business to yourself in a consistent, recorded way rather than spending business funds directly:</p>
<ul>
  <li><strong>Sole proprietors and single-member LLCs:</strong> transfer an owner's draw to your personal account.</li>
  <li><strong>S corporations:</strong> pay a salary through payroll, then take distributions.</li>
  <li><strong>Partnerships:</strong> take recorded draws or guaranteed payments.</li>
</ul>

<h3>3. Reimburse, don't mix</h3>
<p>If you pay a business expense personally — it happens — record it and have the business reimburse you, with the receipt. Corporations should do this through an accountable plan.</p>

<h3>4. Handle mixed-use costs deliberately</h3>
<p>A phone, a car or a home office used for both business and personal purposes should be allocated on a reasonable basis — business-use percentage, mileage log or square footage — not paid entirely from one account or the other.</p>

<h3>5. Capture receipts as you go</h3>
<p>Photograph or forward receipts when you spend, and note the business purpose for meals and travel. Most accounting software can attach them directly to transactions.</p>

<h3>6. Reconcile monthly</h3>
<p>Reconciling every business account each month catches personal transactions that slipped through while they are still easy to fix.</p>

<h2>If things are already mixed</h2>
<p>Start the separation now, from a clean date, and then work backward to clean up the past. Personal transactions in business accounts can be reclassified as owner draws or contributions; business expenses paid personally can be recorded as owner contributions. It takes work, but it is far easier than doing it the week before a tax deadline.</p>

<p>If your accounts are already tangled, our <a href="/services/cleanup-catch-up">cleanup and catch-up</a> team can separate and reconcile past periods and set up clean bookkeeping going forward.</p>

<p><em>This article is general information, not tax or legal advice.</em></p>
$body$,
  $m$How to keep business and personal expenses separate: dedicated accounts, paying yourself correctly, reimbursements, mixed-use costs and cleanup.$m$,
  'us'
),
(
  'estimated-taxes-for-small-business-owners-complete-guide',
  $t$Estimated Taxes for Small Business Owners: A Complete Guide$t$,
  $e$Business owners pay tax during the year, not just at filing time. Who pays estimated tax, how to calculate it, the deadlines for individuals and corporations, and how to avoid penalties.$e$,
  'Small Business Tax',
  'ANAV Global',
  'draft',
  $body$
<p>A profitable business creates a tax bill throughout the year, and the IRS expects to be paid as the income is earned. For most small business owners, that means quarterly estimated tax payments. Getting them right protects your cash flow and avoids penalties.</p>

<h2>Who pays — and on what form</h2>
<ul>
  <li><strong>Sole proprietors and single-member LLC owners</strong> pay estimated income tax and self-employment tax on their business profit, using Form 1040-ES.</li>
  <li><strong>Partners and LLC members</strong> pay estimated tax personally on their share of partnership profit, also on Form 1040-ES. The partnership itself generally pays no federal income tax.</li>
  <li><strong>S corporation shareholders</strong> pay personally on their share of profit. Withholding from their salary may cover part of it.</li>
  <li><strong>C corporations</strong> pay their own estimated tax if they expect to owe $500 or more for the year.</li>
</ul>

<h2>Deadlines</h2>
<p>For individuals, including owners of pass-through businesses, payments are due on April 15, June 15, September 15 and January 15 of the following year. Calendar-year C corporations pay on the 15th day of the 4th, 6th, 9th and 12th months — April 15, June 15, September 15 and December 15. Weekend and holiday dates move to the next business day.</p>

<h2>How much to pay</h2>
<p>Individuals avoid the underpayment penalty if their withholding and estimated payments cover at least the smaller of 90% of this year's tax or 100% of last year's tax (110% if last year's adjusted gross income exceeded $150,000). Corporations have similar safe harbors, with tighter rules for large corporations.</p>
<p>Three practical methods:</p>
<ol>
  <li><strong>Prior-year method:</strong> divide last year's total tax (or 110% of it) by four. Simple and penalty-proof, though you may owe more at filing if profit grows.</li>
  <li><strong>Current-year projection:</strong> estimate this year's profit from your books and pay 90% of the projected tax. More accurate, but it depends on current books.</li>
  <li><strong>Annualized income method:</strong> for seasonal businesses, base each payment on income actually earned to date.</li>
</ol>

<h2>Remember self-employment tax</h2>
<p>For sole proprietors and partners, estimated payments need to cover self-employment tax — 15.3% of net self-employment earnings, up to the Social Security wage limit — as well as income tax. This is the piece new business owners most often underestimate.</p>

<h2>S corporation owners: use your salary</h2>
<p>Because withholding is treated as paid evenly through the year, increasing federal withholding from your S corporation salary — even late in the year — can cover the tax on your share of profit and avoid an underpayment penalty, without the need for separate quarterly payments.</p>

<h2>States too</h2>
<p>Most states with an income tax require estimated payments on similar schedules. If your business elects to pay state tax at the entity level, the entity may need to make its own estimated payments.</p>

<h2>Make it a habit</h2>
<ul>
  <li>Set aside a fixed percentage of revenue in a separate tax savings account.</li>
  <li>Review profit quarterly with current books, and adjust payments when the year changes direction.</li>
  <li>Pay electronically — through your IRS online account, Direct Pay or EFTPS — and keep confirmations.</li>
</ul>

<p>Quarterly estimates are only as accurate as the books behind them. Our <a href="/services/bookkeeping-accounting">bookkeeping</a> and <a href="/services/tax-preparation-filing">tax</a> teams keep business numbers current and recalculate estimates each quarter.</p>

<p><em>This article is general information, not tax advice. Speak with a qualified tax professional about your business.</em></p>
$body$,
  $m$A complete guide to estimated taxes for small business owners: who pays, Forms 1040-ES and 1120-W, deadlines, safe harbors and calculation methods.$m$,
  'us'
),
(
  'what-happens-if-your-business-hasnt-filed-tax-returns',
  $t$What Happens If Your Business Hasn't Filed Tax Returns?$t$,
  $e$Unfiled business returns bring penalties that grow quickly — sometimes even when no tax is owed. The consequences by entity type, and the way back to compliance.$e$,
  'Small Business Tax',
  'ANAV Global',
  'draft',
  $body$
<p>When a business falls behind on its tax returns, the consequences depend on what kind of business it is — and some of them catch owners by surprise. Partnerships and S corporations, for example, can face significant penalties even in years when they owe no tax at all.</p>

<h2>Partnerships and multi-member LLCs (Form 1065)</h2>
<p>A late partnership return carries a penalty calculated per partner, per month, for up to 12 months — a fixed dollar amount set each year. It applies even though the partnership itself usually owes no tax. For a business with several partners, a year-late return can cost thousands of dollars in penalties.</p>
<p>Small partnerships — generally ten or fewer partners who are individuals or estates, where each partner's share of every item is the same and every partner reported their share on time — may qualify for relief from this penalty on reasonable-cause grounds.</p>

<h2>S corporations (Form 1120-S)</h2>
<p>S corporations face a similar per-shareholder, per-month penalty for late returns, again regardless of whether tax is owed. Shareholders also cannot file accurate personal returns without their K-1s, so one late business return can cause problems on several individual returns.</p>

<h2>C corporations (Form 1120)</h2>
<p>C corporations face failure-to-file and failure-to-pay penalties based on the tax owed — 5% per month for late filing and 0.5% per month for late payment, each up to 25% — plus interest. The IRS can also assess tax based on the information it has.</p>

<h2>Sole proprietors and single-member LLCs</h2>
<p>The business is reported on the owner's personal return, so an unfiled business means an unfiled Form 1040, with individual penalties and interest on any income and self-employment tax owed.</p>

<h2>Payroll returns: the most serious risk</h2>
<p>If the business has employees, unfiled or unpaid payroll tax returns are the most urgent issue. Income tax and the employee share of Social Security and Medicare withheld from wages are held in trust for the government. If they are not paid, the IRS can hold responsible individuals — often owners and officers — personally liable for the full amount through the Trust Fund Recovery Penalty.</p>

<h2>Other consequences</h2>
<ul>
  <li>States charge their own penalties and may suspend or revoke the business's good standing.</li>
  <li>Lenders, investors and buyers will ask for filed returns, and gaps can stop a loan or a sale.</li>
  <li>Elections such as S corporation status can be harder to defend if returns are not filed consistently.</li>
</ul>

<h2>The way back</h2>
<ol>
  <li><strong>Prioritize payroll</strong> if there are unfiled or unpaid payroll returns.</li>
  <li><strong>Bring the books up to date</strong> for every missing year — returns cannot be accurate without them.</li>
  <li><strong>File the missing returns</strong>, most recent first, along with K-1s for owners.</li>
  <li><strong>Request penalty relief</strong> where the business qualifies for first-time abatement, small partnership relief or reasonable cause.</li>
  <li><strong>Arrange payment</strong> of any balance through an installment agreement if needed.</li>
  <li><strong>Put a system in place</strong> so deadlines are not missed again.</li>
</ol>

<p>Catching up starts with the books. Our <a href="/services/cleanup-catch-up">cleanup and catch-up</a> team reconstructs missing years, and our tax team prepares the overdue returns and penalty relief requests.</p>

<p><em>This article is general information, not tax or legal advice. Speak with a qualified professional about your business.</em></p>
$body$,
  $m$What happens if a business hasn't filed tax returns: penalties for partnerships, S corps and C corps, payroll tax risk, and how to get compliant.$m$,
  'us'
),
(
  'tax-planning-vs-tax-preparation-whats-the-difference',
  $t$Tax Planning vs. Tax Preparation: What's the Difference?$t$,
  $e$Tax preparation reports what already happened. Tax planning shapes what happens next. Why you need both — and why planning has to come first.$e$,
  'Tax Planning',
  'ANAV Global',
  'draft',
  $body$
<p>Many business owners think of tax as something that happens once a year, in the weeks before the filing deadline. That is tax preparation. Tax planning is something different — and it is where most of the opportunity to reduce tax actually lies.</p>

<h2>Tax preparation: recording the past</h2>
<p>Tax preparation is the process of completing and filing your returns for a year that has already ended. It involves gathering documents, applying the rules correctly, claiming the deductions and credits you are entitled to, and meeting deadlines. Good preparation is accurate, complete and on time.</p>
<p>But by the time a return is being prepared, most of the decisions that determine your tax have already been made. Preparation can capture what happened; it can rarely change it.</p>

<h2>Tax planning: shaping the future</h2>
<p>Tax planning looks ahead. It uses current numbers to make decisions during the year — while they can still affect the result. Typical planning questions include:</p>
<ul>
  <li>Is our business structure still the right one for our level of profit?</li>
  <li>How much should owners take as salary versus distributions?</li>
  <li>Should we buy that equipment this year or next?</li>
  <li>How much should we contribute to retirement plans, and which kind?</li>
  <li>Are our estimated payments on track for the year we are actually having?</li>
  <li>Should we accelerate expenses or defer income at year end?</li>
</ul>

<h2>Side by side</h2>
<ul>
  <li><strong>Timing:</strong> preparation happens after the year ends; planning happens during the year.</li>
  <li><strong>Focus:</strong> preparation is about compliance and accuracy; planning is about decisions and strategy.</li>
  <li><strong>Question answered:</strong> preparation asks "what do we owe?"; planning asks "how can we owe less, legally, next time?"</li>
  <li><strong>Inputs:</strong> preparation uses final, year-end records; planning uses current books and projections.</li>
</ul>

<h2>Why you need both</h2>
<p>Planning without accurate preparation leads to strategies that are never properly reported. Preparation without planning leads to returns that are correct but more expensive than they needed to be. The two work best as one continuous process: last year's return becomes the starting point for this year's plan, and this year's plan makes next year's return simpler.</p>

<h2>The foundation: current books</h2>
<p>Planning depends on knowing where the year stands. If the books are months behind, any projection is a guess. Monthly bookkeeping turns tax planning from a once-a-year scramble into a quick quarterly review.</p>

<h2>When to start</h2>
<p>The best time is early in the year, with a check-in each quarter and a detailed review in the fourth quarter, while there is still time to act. Read <a href="/blog/year-end-tax-planning-strategies-for-small-businesses">Year-End Tax Planning Strategies for Small Business Owners</a> for what that final review covers.</p>

<p>We combine both in one relationship: current books through the year, planning reviews before year end, and preparation that starts from numbers we already know. See our <a href="/services/tax-preparation-filing">tax preparation and planning</a> service.</p>

<p><em>This article is general information, not tax advice.</em></p>
$body$,
  $m$Tax planning vs tax preparation: how they differ in timing, focus and inputs, why you need both, and why planning must come first.$m$,
  'us'
),
(
  'tax-planning-mistakes-small-business-owners-should-avoid',
  $t$5 Tax Planning Mistakes Small Business Owners Should Avoid$t$,
  $e$Most expensive tax mistakes are not errors on the return — they are decisions made too late or not at all. Five to avoid, and what to do instead.$e$,
  'Tax Planning',
  'ANAV Global',
  'draft',
  $body$
<p>When small businesses overpay tax, it is rarely because of an error on the return. More often it is because of decisions that were made too late, or never made at all. These are five of the most common — and how to avoid them.</p>

<h2>1. Waiting until tax season to think about tax</h2>
<p>By the time returns are being prepared, the year is over. Retirement plan decisions, equipment timing, owner salary and year-end bonuses all have to happen during the year to count. Owners who only think about tax in March are left with reporting, not planning.</p>
<p><strong>Instead:</strong> schedule a planning review in the fourth quarter every year, and a lighter check-in each quarter.</p>

<h2>2. Planning from out-of-date books</h2>
<p>A tax projection is only as good as the numbers behind it. If the books are three months behind, planning is guesswork — and decisions based on guesses can make things worse, such as buying equipment for a deduction the business did not need.</p>
<p><strong>Instead:</strong> keep bookkeeping current monthly, so that by October you know with confidence where the year is heading.</p>

<h2>3. Ignoring estimated taxes</h2>
<p>A profitable year with no estimated payments ends with a large tax bill, an underpayment penalty and a cash-flow problem — often just when the business wants to invest its profit.</p>
<p><strong>Instead:</strong> set estimated payments at the start of the year using the safe-harbor rules, revisit them each quarter, and set aside cash for tax as revenue comes in.</p>

<h2>4. Staying in a structure the business has outgrown</h2>
<p>The sole proprietorship or default LLC that made sense in year one may be costing thousands in self-employment tax by year four. Conversely, some owners elect S corporation status too early and pay more in payroll and accounting costs than they save.</p>
<p><strong>Instead:</strong> review your entity and tax classification whenever profit changes significantly — with actual numbers, not rules of thumb.</p>

<h2>5. Losing deductions to poor records</h2>
<p>Business expenses paid from personal accounts, missing receipts, unlogged mileage and undocumented home office space are deductions that either go unclaimed or cannot be defended. Many owners underclaim legitimate expenses simply because they cannot find the evidence.</p>
<p><strong>Instead:</strong> separate business and personal finances, capture receipts as you spend, and keep a mileage log.</p>

<h2>A bonus mistake: forgetting the state</h2>
<p>Selling into other states, hiring remote employees or opening a location elsewhere can create state income tax, sales tax and payroll obligations. These often come to light years later, with penalties attached. Review your state footprint whenever the business expands.</p>

<h2>The common thread</h2>
<p>Every one of these mistakes comes down to timing and information. Current books and a regular planning rhythm prevent nearly all of them.</p>

<p>Our team keeps business books current and reviews tax positions with owners before year end, so planning decisions are made while they still count. See <a href="/blog/tax-planning-vs-tax-preparation-whats-the-difference">Tax Planning vs. Tax Preparation</a> for how the two fit together.</p>

<p><em>This article is general information, not tax advice.</em></p>
$body$,
  $m$Five tax planning mistakes small business owners should avoid: waiting until tax season, stale books, missed estimates, wrong structure and poor records.$m$,
  'us'
),
(
  'how-business-owners-can-prepare-for-the-next-tax-year',
  $t$How Business Owners Can Prepare for the Next Tax Year$t$,
  $e$The best time to make next year's taxes easier is right after this year's return is filed. A practical checklist for business owners.$e$,
  'Tax Planning',
  'ANAV Global',
  'draft',
  $body$
<p>Once a tax return is filed, most business owners want to forget about tax for a while. That is understandable — but the weeks after filing are the ideal time to set up the year ahead. A little preparation now makes next year's planning easier, its estimated payments more accurate and its return faster and cheaper to prepare.</p>

<h2>1. Learn from last year's return</h2>
<p>Review the return with your preparer. What drove the result? Were there surprises — a large balance due, a missed deduction, a late document? Which items took the longest to gather? Each answer points to something to change this year.</p>

<h2>2. Set this year's estimated payments</h2>
<p>Use last year's tax as a baseline and set quarterly payments accordingly. Put the four due dates in your calendar now, and plan to revisit the amounts after each quarter's books are closed.</p>

<h2>3. Get bookkeeping on a monthly rhythm</h2>
<p>Reconcile bank and card accounts every month, categorize transactions consistently and close each month on a fixed date. Current books are the foundation for every other item on this list.</p>

<h2>4. Separate business and personal finances</h2>
<p>If anything still runs through personal accounts, fix it now. Clean separation makes deductions easier to capture and defend, and it simplifies the year-end close.</p>

<h2>5. Organize your records</h2>
<ul>
  <li>Choose one place for receipts and invoices, digital if possible.</li>
  <li>Keep a mileage log if you use a vehicle for business.</li>
  <li>Collect W-9s from contractors before you pay them, so 1099s are easy in January.</li>
  <li>Keep a fixed-asset list as you buy equipment.</li>
</ul>

<h2>6. Review your structure and owner pay</h2>
<p>If profit has changed significantly, consider whether your entity or tax classification still fits. S corporation owners should confirm their salary is still reasonable for their role and the business's size.</p>

<h2>7. Plan big decisions in advance</h2>
<p>Expected equipment purchases, hiring, new locations, sales into new states or a change in ownership all have tax consequences. Discussing them before they happen gives you options; discussing them afterward only gives you reporting.</p>

<h2>8. Decide on retirement contributions</h2>
<p>Choose a retirement plan that fits the business and decide how much to contribute through the year rather than in a rush at the end. Some plans must be set up before year end to be used for that year.</p>

<h2>9. Keep up with law changes</h2>
<p>Tax rules change often. Recent legislation changed depreciation, the deduction for state and local taxes, and several individual deductions, with some provisions starting in different years. Ask your adviser which changes affect your business this year.</p>

<h2>10. Book a mid-year and a year-end review</h2>
<p>Put two dates in the calendar now: a mid-year check on where profit and tax are heading, and a fourth-quarter planning review while there is still time to act.</p>

<p>We work with business owners year-round — monthly bookkeeping, quarterly estimates, planning reviews and returns — so tax season is a formality rather than a scramble. See our <a href="/services/bookkeeping-accounting">bookkeeping and accounting</a> service.</p>

<p><em>This article is general information, not tax advice.</em></p>
$body$,
  $m$How business owners can prepare for the next tax year: review last year's return, set estimates, monthly bookkeeping, records, structure and planning.$m$,
  'us'
)
on conflict (slug) do nothing;

-- The year-end planning article: the existing 0002 draft, retitled to the
-- client's wording and rewritten — only while it is still a draft.
update public.posts
set
  title = $t$Year-End Tax Planning Strategies for Small Business Owners$t$,
  excerpt = $e$The last quarter of the year is when tax planning still has room to work. The decisions small business owners should review before December 31.$e$,
  category = 'Tax Planning',
  region = 'us',
  meta_description = $m$Year-end tax planning for small business owners: projections, timing, equipment and depreciation, retirement plans, owner pay, estimates and state taxes.$m$,
  content = $body$
<p>Once the year closes, most of what determines your tax bill is settled. The final quarter is when planning still has room to work — when decisions about timing, investment and owner pay can change the result. These are the areas worth reviewing before December 31.</p>

<h2>1. Start with a projection from current books</h2>
<p>Every year-end decision depends on knowing where the year is likely to land. Bring the books up to date through the most recent month, then project the remaining months. If the books are behind, catching up is step one — planning on incomplete numbers can point you in the wrong direction.</p>

<h2>2. Review the timing of income and expenses</h2>
<p>Businesses on the cash method have some flexibility at year end: paying deductible expenses before December 31 brings the deduction into this year, and invoicing later can push income into next year. The right direction depends on whether you expect next year's income — and tax rate — to be higher or lower. Model it rather than assuming.</p>

<h2>3. Plan equipment purchases deliberately</h2>
<p>Section 179 expensing and bonus depreciation, restored to 100% for qualifying property acquired after January 19, 2025, can make the timing of equipment purchases valuable. Property generally has to be placed in service — not just ordered — by year end. But buy what the business needs; a purchase made only for the deduction still costs money.</p>

<h2>4. Maximize retirement contributions</h2>
<p>Retirement plans are often the largest deduction available to a profitable small business. Some plans, such as a solo 401(k), need to be established by certain deadlines to be used for the year, while others, such as a SEP-IRA, can be set up and funded later. Check the deadlines for the plan that fits you now.</p>

<h2>5. Settle owner pay</h2>
<p>S corporation owners should confirm their salary is reasonable for the year and decide on any year-end bonus through payroll. Owners whose health insurance is paid by the company need it reported correctly on their W-2.</p>

<h2>6. True up estimated payments</h2>
<p>Compare estimated payments made so far with the projected tax. The fourth installment for individuals is due January 15; S corporation owners can also increase withholding from salary before year end to close a gap.</p>

<h2>7. Consider your state's pass-through entity tax</h2>
<p>In many states, partnerships and S corporations can elect to pay state income tax at the entity level, which can restore a federal deduction for owners. These elections and payments often have year-end deadlines.</p>

<h2>8. Tidy up the balance sheet</h2>
<ul>
  <li>Write off receivables that will not be collected (if you use the accrual method).</li>
  <li>Review inventory for obsolete or damaged stock.</li>
  <li>Make sure loans to and from owners are documented.</li>
  <li>Collect W-9s from every contractor so 1099s can be filed in January.</li>
</ul>

<h2>9. Look ahead to next year</h2>
<p>Year end is a natural point to ask whether your entity, owner pay and bookkeeping still fit the business. Changes such as an S corporation election need to be made by specific deadlines to take effect for the coming year.</p>

<p>Planning is only as good as the books it is built on. Our team keeps business books current through the year and reviews year-end options with owners in the fourth quarter. See our <a href="/services/tax-preparation-filing">tax preparation and planning</a> service.</p>

<p><em>This article is general information, not tax advice. Tax rules change and every situation is different — speak with a qualified tax professional before acting.</em></p>
$body$
where slug = 'year-end-tax-planning-strategies-for-small-businesses' and status = 'draft';
