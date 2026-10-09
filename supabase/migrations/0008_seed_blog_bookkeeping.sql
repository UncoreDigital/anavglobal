-- ============================================================================
-- ANAV Global — blog articles from the client's change list (October 2026)
-- Part 3 of 3: business and bookkeeping education (point 11), and industry
-- bookkeeping articles (point 3: "more blogs about accounting and bookkeeping
-- topic with various industry"), which link to the new industry pages.
-- Run after 0007_seed_blog_business.sql. Safe to re-run.
--
-- Seeded as DRAFTS on the U.S. site, for review and publishing in
-- Admin → Insights.
--
-- Once the articles in parts 1–3 have been reviewed, they can be published in
-- one go — oldest date first, a day apart, so the blog lists them in a
-- sensible order — by running:
--
--   with batch as (
--     select id, row_number() over (order by created_at, slug) as n
--     from public.posts
--     where status = 'draft' and region = 'us'
--   )
--   update public.posts p
--   set status = 'published', published_at = now() - (batch.n * interval '1 day')
--   from batch where p.id = batch.id;
-- ============================================================================

insert into public.posts (slug, title, excerpt, category, author, status, content, meta_description, region)
values
(
  'why-every-small-business-needs-accurate-bookkeeping',
  $t$Why Every Small Business Needs Accurate Bookkeeping$t$,
  $e$Bookkeeping is not just for tax season. Accurate books are how you know whether the business is working — and what to do next.$e$,
  'Bookkeeping',
  'ANAV Global',
  'draft',
  $body$
<p>Bookkeeping is easy to put off. It does not win customers, and when the business is busy it feels like the least urgent task on the list. But accurate books are the foundation every other financial decision rests on — and the cost of not having them shows up eventually, usually at the worst possible moment.</p>

<h2>You can't manage what you can't see</h2>
<p>Without current books, you are running the business on instinct and a bank balance. A healthy balance can hide falling margins, slow-paying customers or rising costs. Accurate books show which products or clients are profitable, where money is going and whether this month is better or worse than last.</p>

<h2>Cash flow problems become visible early</h2>
<p>Most small businesses that fail are not unprofitable — they run out of cash. Up-to-date receivables and payables show when money is coming in and going out, so a gap can be spotted weeks ahead rather than on the day payroll is due.</p>

<h2>Taxes become simpler and cheaper</h2>
<p>When books are kept monthly, the tax return starts from reconciled numbers instead of a year's worth of statements and receipts. Deductions are captured as they happen rather than reconstructed from memory, estimated payments can be based on real profit, and preparation takes less time — which usually means it costs less too.</p>

<h2>Lenders and investors will ask</h2>
<p>Any loan application, line of credit, investment or sale of the business starts with financial statements. Businesses with clean, consistent books can answer quickly and with confidence. Businesses without them lose time — and sometimes the opportunity.</p>

<h2>Errors and fraud get caught</h2>
<p>Monthly reconciliation compares your records with what the bank actually processed. Duplicate payments, missing deposits, unauthorized charges and simple keying errors surface within weeks instead of years.</p>

<h2>You stay compliant</h2>
<p>Payroll, sales tax, contractor reporting and state filings all depend on accurate records. Missed obligations bring penalties, and they are much harder to fix when the underlying records are incomplete.</p>

<h2>What good bookkeeping looks like</h2>
<ul>
  <li>Every transaction recorded and categorized consistently.</li>
  <li>Bank and card accounts reconciled every month.</li>
  <li>Receivables and payables kept current.</li>
  <li>A month-end close with a profit and loss statement and balance sheet you can rely on.</li>
  <li>Business and personal finances kept separate.</li>
</ul>

<h2>The real cost of poor books</h2>
<p>Catching up a year of neglected books costs far more than keeping them current — and decisions made without them can cost more still. Accurate bookkeeping is not overhead; it is how the business knows where it stands.</p>

<p>If keeping up has become difficult, our <a href="/services/bookkeeping-accounting">bookkeeping and accounting</a> team can take over the day-to-day and deliver a clean month-end close.</p>
$body$,
  $m$Why accurate bookkeeping matters for every small business: visibility, cash flow, simpler taxes, financing, catching errors and staying compliant.$m$,
  'us'
),
(
  'cash-basis-vs-accrual-basis-accounting',
  $t$Cash Basis vs. Accrual Basis Accounting$t$,
  $e$The two methods record the same transactions at different times — and can tell very different stories about the same business. How each works and which fits yours.$e$,
  'Bookkeeping',
  'ANAV Global',
  'draft',
  $body$
<p>Every business has to decide <em>when</em> to record income and expenses. The two main methods — cash basis and accrual basis — record exactly the same transactions, but at different times. The choice affects your financial statements, your tax return and how well you understand your business.</p>

<h2>Cash basis</h2>
<p>Under the cash method, you record income when money is received and expenses when they are paid. An invoice sent in December but paid in January is January income. A bill received in December but paid in January is a January expense.</p>
<p><strong>Advantages:</strong> simple, intuitive and closely tied to your bank balance. It also gives some flexibility over the timing of taxable income at year end.</p>
<p><strong>Disadvantages:</strong> it can be misleading. A month with large collections from earlier work looks very profitable; a month spent doing work that will be paid later looks like a loss.</p>

<h2>Accrual basis</h2>
<p>Under the accrual method, you record income when it is earned and expenses when they are incurred, regardless of when cash moves. The December invoice is December income, even if it is paid in January; the December bill is a December expense.</p>
<p><strong>Advantages:</strong> it matches revenue with the costs of earning it, so each month's profit reflects the work actually done. It is required under generally accepted accounting principles (GAAP), and lenders and investors generally expect it.</p>
<p><strong>Disadvantages:</strong> it requires tracking receivables, payables and accruals, and profit can be high in a month when cash is tight.</p>

<h2>An example</h2>
<p>A consultant completes a $10,000 project in March and is paid in May. On the cash basis, March shows nothing and May shows $10,000. On the accrual basis, March shows $10,000 of income and an equal receivable; May simply records the collection. Both are correct — they answer different questions.</p>

<h2>What the tax rules allow</h2>
<p>Many small businesses can use the cash method for tax. Larger businesses — generally those whose average annual gross receipts exceed an inflation-adjusted threshold — and certain other businesses must use the accrual method. Businesses with inventory have additional rules, though smaller ones have simplified options. Changing method for tax purposes generally requires IRS consent through Form 3115.</p>

<h2>Which is right for you?</h2>
<ul>
  <li><strong>Cash basis</strong> often suits very small service businesses, freelancers and sole proprietors with simple finances.</li>
  <li><strong>Accrual basis</strong> suits businesses that invoice on terms, carry inventory, have significant payables, seek financing or want a true picture of monthly performance.</li>
</ul>
<p>Some businesses keep accrual-basis books for management and lenders while filing tax returns on the cash basis where the rules allow. Good accounting software can report both ways.</p>

<h2>Whatever you choose, be consistent</h2>
<p>Switching back and forth makes comparisons meaningless. Choose the method that fits the business, apply it consistently and revisit the decision as the business grows.</p>

<p>Our <a href="/services/bookkeeping-accounting">bookkeeping team</a> keeps books on the basis that suits each client, and can report on both bases where that helps.</p>
$body$,
  $m$Cash basis vs accrual basis accounting explained: how each records income and expenses, an example, tax rules and which suits your business.$m$,
  'us'
),
(
  'what-is-bank-reconciliation-and-why-does-it-matter',
  $t$What Is Bank Reconciliation and Why Does It Matter?$t$,
  $e$Reconciliation is the check that proves your books match reality. What it is, how it works step by step, and why it should happen every month.$e$,
  'Bookkeeping',
  'ANAV Global',
  'draft',
  $body$
<p>Bank reconciliation is one of the most important routines in bookkeeping, and one of the most often skipped. It is the process of matching the transactions in your accounting records with those on your bank statement, so you can be confident your books reflect what actually happened.</p>

<h2>Why the two don't match automatically</h2>
<p>Even with bank feeds, your books and your bank statement rarely agree on any given day. Common reasons include:</p>
<ul>
  <li><strong>Outstanding checks</strong> — recorded in your books but not yet cashed.</li>
  <li><strong>Deposits in transit</strong> — recorded in your books but not yet processed by the bank.</li>
  <li><strong>Bank fees and interest</strong> — on the statement but not yet recorded in your books.</li>
  <li><strong>Errors</strong> — a transaction entered twice, keyed with the wrong amount or missed altogether.</li>
  <li><strong>Unauthorized transactions</strong> — charges you did not make.</li>
</ul>

<h2>How a reconciliation works</h2>
<ol>
  <li><strong>Start with the statement balance</strong> at the end of the period.</li>
  <li><strong>Add deposits in transit</strong> and <strong>subtract outstanding checks</strong> to get the adjusted bank balance.</li>
  <li><strong>Start with your book balance</strong> for the same date.</li>
  <li><strong>Record anything on the statement not yet in your books</strong> — fees, interest, automatic payments.</li>
  <li><strong>Investigate and correct errors.</strong></li>
  <li><strong>Confirm the adjusted balances match.</strong> If they don't, keep looking until they do — a small unexplained difference can hide a larger problem.</li>
</ol>

<h2>Why it matters</h2>
<h3>Accurate financial statements</h3>
<p>Cash is the most important number on the balance sheet. If it is wrong, profit, expenses and everything else built on those transactions may be wrong too.</p>
<h3>Catching errors early</h3>
<p>Duplicate entries, missing invoices and miscategorized payments are easy to fix within the month and hard to reconstruct a year later.</p>
<h3>Spotting fraud</h3>
<p>Unauthorized charges, altered checks or payments to unfamiliar vendors stand out during reconciliation. Banks also have time limits for reporting some unauthorized transactions, so reviewing monthly matters.</p>
<h3>Knowing your real cash position</h3>
<p>Your bank balance includes checks that have not yet cleared. A reconciled book balance tells you how much cash you actually have available.</p>

<h2>How often?</h2>
<p>At least monthly, for every bank and credit card account, as soon as statements are available. Businesses with high transaction volumes or heavy cash handling — retail, restaurants, convenience stores — often reconcile weekly or even daily.</p>

<h2>Don't forget credit cards and other accounts</h2>
<p>The same process applies to credit cards, loans, payment processors and merchant accounts. Any account with a statement should be reconciled to it.</p>

<p>Monthly reconciliation of every account is the first step in our <a href="/services/bookkeeping-accounting">bookkeeping service</a>. If past months were never reconciled, our <a href="/services/cleanup-catch-up">cleanup team</a> can bring them up to date.</p>
$body$,
  $m$What bank reconciliation is, why books and bank statements differ, how to reconcile step by step, and why monthly reconciliation matters.$m$,
  'us'
),
(
  'profit-and-loss-statement-explained-for-business-owners',
  $t$Profit & Loss Statement Explained for Business Owners$t$,
  $e$The profit and loss statement shows whether your business made money over a period — and why. What each section means, in plain English.$e$,
  'Bookkeeping',
  'ANAV Global',
  'draft',
  $body$
<p>The profit and loss statement — also called the P&amp;L or income statement — is the report most business owners look at first. It shows how much the business earned, what it spent to earn it, and what was left over during a period such as a month, quarter or year.</p>

<h2>The basic structure</h2>
<p>Every P&amp;L follows the same logic, from top to bottom:</p>
<ol>
  <li><strong>Revenue</strong> — what the business earned from sales or services.</li>
  <li><strong>Cost of goods sold</strong> — the direct costs of producing what you sold.</li>
  <li><strong>Gross profit</strong> — revenue minus cost of goods sold.</li>
  <li><strong>Operating expenses</strong> — the costs of running the business.</li>
  <li><strong>Operating profit</strong> — gross profit minus operating expenses.</li>
  <li><strong>Other income and expenses</strong> — interest, one-off gains or losses.</li>
  <li><strong>Net profit</strong> — the bottom line.</li>
</ol>

<h2>Revenue</h2>
<p>Revenue (or sales, or income) is the value of goods and services you delivered. It may be split by product line, service or location. Refunds and discounts are usually shown as reductions. Sales tax collected from customers is not revenue — it belongs to the state.</p>

<h2>Cost of goods sold</h2>
<p>For product businesses, this is the cost of the products sold: materials, inventory, freight-in and direct production labor. Service businesses may show direct labor or subcontractor costs here. These costs rise and fall with sales.</p>

<h2>Gross profit and gross margin</h2>
<p>Gross profit shows what each sale contributes before overhead. Expressed as a percentage of revenue, it is your gross margin — one of the most important numbers in the business. If gross margin is falling, prices may be too low or direct costs too high.</p>

<h2>Operating expenses</h2>
<p>These are the costs of running the business regardless of sales volume: rent, salaries for non-production staff, software, insurance, marketing, professional fees, utilities and depreciation. They are sometimes called overhead.</p>

<h2>Net profit</h2>
<p>What remains after all expenses is net profit — or net loss. For pass-through businesses, it is broadly the starting point for the owner's taxable business income, though tax rules adjust it in various ways.</p>

<h2>What the P&amp;L doesn't show</h2>
<ul>
  <li><strong>Cash.</strong> A profitable P&amp;L does not mean money in the bank. See <a href="/blog/profit-vs-cash-flow-whats-the-difference">Profit vs. Cash Flow</a>.</li>
  <li><strong>What you own and owe.</strong> That is the balance sheet.</li>
  <li><strong>Owner draws and loan principal repayments,</strong> which are not expenses.</li>
</ul>

<h2>Making it useful</h2>
<p>A single P&amp;L tells you little. Compared with last month, the same month last year or your budget, it tells you a great deal. We cover how to read one critically in <a href="/blog/how-to-read-a-profit-and-loss-statement">How to Read a Profit &amp; Loss Statement</a>.</p>

<p>Our <a href="/services/management-accounts">management accounts</a> service delivers a monthly P&amp;L with commentary on what changed and why, so the numbers lead to decisions.</p>
$body$,
  $m$The profit and loss statement explained for business owners: revenue, cost of goods sold, gross margin, operating expenses, net profit and limits.$m$,
  'us'
),
(
  'balance-sheet-explained-in-simple-terms',
  $t$Balance Sheet Explained in Simple Terms$t$,
  $e$The balance sheet is a snapshot of what your business owns, what it owes and what is left for the owners. A plain-English guide to reading one.$e$,
  'Bookkeeping',
  'ANAV Global',
  'draft',
  $body$
<p>If the profit and loss statement is a video of the business's performance over a period, the balance sheet is a photograph taken on one day. It shows what the business owns, what it owes and what belongs to the owners at a specific moment.</p>

<h2>The equation behind it</h2>
<p>Every balance sheet rests on one equation:</p>
<p><strong>Assets = Liabilities + Equity</strong></p>
<p>Everything the business owns was paid for either with borrowed money (liabilities) or with owners' money and retained profits (equity). That is why the two sides always balance.</p>

<h2>Assets: what the business owns</h2>
<ul>
  <li><strong>Current assets</strong> — cash and items expected to turn into cash within a year: bank balances, accounts receivable (money customers owe you), inventory and prepaid expenses.</li>
  <li><strong>Fixed assets</strong> — longer-term items such as equipment, vehicles, furniture and buildings, shown net of accumulated depreciation.</li>
  <li><strong>Other assets</strong> — deposits, intangible assets and long-term investments.</li>
</ul>

<h2>Liabilities: what the business owes</h2>
<ul>
  <li><strong>Current liabilities</strong> — due within a year: accounts payable (bills you owe suppliers), credit card balances, payroll and sales taxes collected but not yet paid, and the current portion of loans.</li>
  <li><strong>Long-term liabilities</strong> — loans and other obligations due after more than a year.</li>
</ul>

<h2>Equity: what belongs to the owners</h2>
<p>Equity is what would be left if all assets were sold and all liabilities paid. It includes money owners invested, profits kept in the business over time, and reductions for owner draws or distributions. Its name changes with the type of business — owner's equity, partners' capital or shareholders' equity — but the idea is the same.</p>

<h2>What a balance sheet tells you</h2>
<ul>
  <li><strong>Can you pay your bills?</strong> Compare current assets with current liabilities. If current liabilities are larger, the business may struggle to meet short-term obligations.</li>
  <li><strong>How much do you rely on debt?</strong> Compare total liabilities with equity.</li>
  <li><strong>Are customers paying?</strong> Rising receivables relative to sales can mean collections are slipping.</li>
  <li><strong>Is the business building value?</strong> Growing equity over time means profits are being retained.</li>
</ul>

<h2>Why it is often ignored — and shouldn't be</h2>
<p>Many owners look only at the P&amp;L. But the balance sheet is where problems hide: unpaid sales tax, payroll liabilities, loans that were never recorded correctly, owner transactions mixed in with business ones. An accurate balance sheet is also a sign that the books themselves are reliable — every balance on it should be reconciled to a statement or schedule.</p>

<p>A reconciled balance sheet is part of every month-end close in our <a href="/services/bookkeeping-accounting">bookkeeping and accounting</a> service.</p>
$body$,
  $m$The balance sheet explained simply: assets, liabilities and equity, the accounting equation, what it tells you and why every balance should reconcile.$m$,
  'us'
),
(
  'profit-vs-cash-flow-whats-the-difference',
  $t$Profit vs. Cash Flow: What's the Difference?$t$,
  $e$A profitable business can still run out of cash. Why profit and cash flow differ, the most common gaps between them, and how to manage both.$e$,
  'Bookkeeping',
  'ANAV Global',
  'draft',
  $body$
<p>"We had a great year, so why is the bank account empty?" It is one of the most common questions business owners ask. The answer is that profit and cash flow measure different things — and a business needs both to survive.</p>

<h2>Profit measures performance</h2>
<p>Profit is revenue minus expenses for a period. On the accrual basis, revenue is recorded when it is earned and expenses when they are incurred, regardless of when money changes hands. Profit tells you whether the business model works.</p>

<h2>Cash flow measures money moving</h2>
<p>Cash flow is the actual money coming into and going out of the business. It tells you whether you can pay employees, suppliers and the tax bill when they fall due.</p>

<h2>Why they differ</h2>
<ul>
  <li><strong>Customers pay later.</strong> A sale on 60-day terms adds to profit today and to cash in two months.</li>
  <li><strong>Inventory ties up cash.</strong> Stock you buy is cash spent, but it only becomes an expense when it is sold.</li>
  <li><strong>Equipment purchases.</strong> Buying a $50,000 machine takes $50,000 of cash now, but the expense is spread over years through depreciation (or taken up front for tax — a separate question).</li>
  <li><strong>Loan repayments.</strong> The principal portion reduces cash but is not an expense.</li>
  <li><strong>Owner draws and distributions</strong> reduce cash but do not reduce profit.</li>
  <li><strong>Taxes on profit</strong> are often paid in a different period from when the profit was earned.</li>
</ul>

<h2>Profitable but cash-poor</h2>
<p>Fast-growing businesses are especially exposed: more sales mean more receivables and more inventory, which consume cash before they generate it. Many businesses that fail were profitable on paper.</p>

<h2>Cash-rich but unprofitable</h2>
<p>The reverse happens too. Customer deposits, delayed supplier payments or a new loan can fill the bank account while the business is losing money. Cash alone can hide an unprofitable business for a while.</p>

<h2>Managing both</h2>
<ul>
  <li><strong>Invoice promptly and follow up</strong> on overdue receivables.</li>
  <li><strong>Agree payment terms with suppliers</strong> that match how quickly you collect.</li>
  <li><strong>Keep inventory lean</strong> and track which items move slowly.</li>
  <li><strong>Plan large purchases</strong> and consider financing for long-lived assets.</li>
  <li><strong>Set aside cash for taxes</strong> as profit is earned.</li>
  <li><strong>Forecast cash</strong> for the next 13 weeks and update it regularly.</li>
</ul>

<h2>Read the right report</h2>
<p>The profit and loss statement shows profit. The statement of cash flows — together with the balance sheet — shows where the cash went. Reviewing them together each month gives a complete picture.</p>

<p>Our <a href="/services/management-accounts">management accounts</a> include cash flow forecasting alongside the monthly P&amp;L, so owners see both sides before decisions are made.</p>
$body$,
  $m$Profit vs cash flow: why a profitable business can run out of cash, the common gaps between them, and practical ways to manage both.$m$,
  'us'
),
(
  'how-to-read-a-profit-and-loss-statement',
  $t$How to Read a Profit & Loss Statement$t$,
  $e$Knowing what is on a P&L is one thing; reading it critically is another. Seven questions to ask every time you review your profit and loss statement.$e$,
  'Bookkeeping',
  'ANAV Global',
  'draft',
  $body$
<p>A profit and loss statement is only useful if you know how to read it. Most owners glance at the bottom line and move on. A few minutes of structured review each month tells you far more. Here is a practical approach, using seven questions.</p>

<h2>1. Is revenue moving in the right direction?</h2>
<p>Compare revenue with the previous month, the same month last year and your budget. Seasonal businesses should focus on year-over-year comparisons. If revenue is broken down by product, service or location, look at which lines are growing and which are shrinking.</p>

<h2>2. Is gross margin holding?</h2>
<p>Divide gross profit by revenue. A falling gross margin is an early warning: supplier prices may have risen, discounting may have crept in, or the sales mix may have shifted toward lower-margin products. Gross margin problems are rarely solved by selling more.</p>

<h2>3. How do expenses compare with revenue?</h2>
<p>Express each major expense as a percentage of revenue — payroll, rent, marketing, software. Percentages make it easy to compare periods even when revenue changes, and to spot costs growing faster than the business.</p>

<h2>4. What changed, and why?</h2>
<p>Scan for lines that moved significantly from the prior period. Every material change should have an explanation: a new hire, an annual insurance payment, a marketing campaign. If you can't explain it, investigate — it may be a coding error.</p>

<h2>5. Are there one-off items?</h2>
<p>A large one-time expense or gain can distort a month. Mentally set it aside to see the underlying trend — and make sure genuinely one-off items are not quietly recurring.</p>

<h2>6. Does the net profit make sense?</h2>
<p>Compare net profit with what you expected. If the business felt busy but profit is low, look back at margins and expenses. If profit is high but cash is low, compare with the balance sheet — receivables, inventory or loan repayments may explain it.</p>

<h2>7. Is the report reliable?</h2>
<p>A P&amp;L is only as good as the bookkeeping behind it. Signs of trouble include large "uncategorized" or "miscellaneous" balances, expenses that jump around from month to month, and accounts that have not been reconciled. Ask whether the period has been properly closed.</p>

<h2>Build a monthly routine</h2>
<ol>
  <li>Close the books and reconcile all accounts.</li>
  <li>Run the P&amp;L for the month and year to date, with comparisons.</li>
  <li>Review margins, expense ratios and major changes.</li>
  <li>Note two or three actions — and check on them next month.</li>
</ol>

<p>If the structure of a P&amp;L is new to you, start with <a href="/blog/profit-and-loss-statement-explained-for-business-owners">Profit &amp; Loss Statement Explained for Business Owners</a>. Our <a href="/services/management-accounts">management accounts</a> service includes a monthly P&amp;L with written commentary on what changed and why.</p>
$body$,
  $m$How to read a profit and loss statement: seven questions on revenue, gross margin, expense ratios, changes, one-offs, net profit and reliability.$m$,
  'us'
),
(
  'common-bookkeeping-mistakes-small-businesses-make',
  $t$Common Bookkeeping Mistakes Small Businesses Make$t$,
  $e$Most bookkeeping problems come from a handful of habits. The mistakes we see most often in small business books — and how to avoid each one.$e$,
  'Bookkeeping',
  'ANAV Global',
  'draft',
  $body$
<p>Small business bookkeeping problems rarely come from one big error. They build up from small habits repeated over months. These are the mistakes we see most often when new clients' books come to us — and how to avoid them.</p>

<h2>1. Mixing business and personal transactions</h2>
<p>Paying personal costs from the business account, or business costs from a personal card, blurs the numbers, loses deductions and can weaken liability protection. Use separate accounts and record owner draws and reimbursements properly.</p>

<h2>2. Not reconciling accounts</h2>
<p>Bank feeds are not reconciliation. Without monthly reconciliation, duplicates, missing transactions and errors go unnoticed and the cash balance in the books drifts away from reality.</p>

<h2>3. Letting the books fall behind</h2>
<p>Bookkeeping done in a rush at year end is less accurate and more expensive than bookkeeping done monthly. Receipts are lost, details are forgotten and opportunities to plan are gone.</p>

<h2>4. Miscategorizing transactions</h2>
<p>Coding everything to "miscellaneous," treating equipment purchases as expenses, recording loan repayments as expenses or owner draws as wages — each distorts profit and the tax return. A clear chart of accounts and consistent coding rules fix most of this.</p>

<h2>5. Recording sales tax as revenue</h2>
<p>Sales tax collected from customers belongs to the state. Recording it as income overstates revenue and makes it easy to spend money that is owed.</p>

<h2>6. Ignoring receivables</h2>
<p>Unpaid invoices that are never followed up are cash the business has earned but not received. Review the aged receivables report regularly and write off what genuinely will not be collected.</p>

<h2>7. Not keeping receipts and documentation</h2>
<p>Bank statements show that money was spent, not what it was for. Meals, travel, equipment and other deductible expenses need receipts and a business purpose to be defensible.</p>

<h2>8. Treating contractors and employees the same way</h2>
<p>Workers' classification determines payroll tax obligations. Collect a Form W-9 from each contractor before paying them, track payments, and issue 1099s by the January deadline.</p>

<h2>9. Forgetting about payroll liabilities</h2>
<p>Withheld income tax and payroll taxes must be deposited on schedule. Missed deposits bring penalties quickly, and the unpaid amounts can become a personal liability for owners.</p>

<h2>10. No month-end close</h2>
<p>Without a regular close — accounts reconciled, accruals posted, reports reviewed — there is never a point at which the numbers are known to be right.</p>

<h2>Fixing past mistakes</h2>
<p>If several of these sound familiar, the books can be cleaned up: accounts reconciled, transactions recategorized and balances corrected, period by period. Then a monthly routine keeps them clean.</p>

<p>Our <a href="/services/cleanup-catch-up">cleanup and catch-up</a> team fixes past periods, and our <a href="/services/bookkeeping-accounting">bookkeeping service</a> keeps the books right from then on.</p>
$body$,
  $m$The most common small business bookkeeping mistakes — mixing funds, skipping reconciliation, miscategorizing, sales tax, receivables, 1099s — and fixes.$m$,
  'us'
),
(
  'how-bookkeeping-affects-your-tax-return',
  $t$How Bookkeeping Affects Your Tax Return$t$,
  $e$Your business tax return is built from your books. How the quality of your bookkeeping shows up in your tax bill, your deductions and your audit risk.$e$,
  'Bookkeeping',
  'ANAV Global',
  'draft',
  $body$
<p>For a business, the tax return is not a separate exercise from bookkeeping — it is the final product of it. Every number on a business return starts in the books. That is why the quality of your bookkeeping shows up directly in how much tax you pay, how long preparation takes and how well your return would hold up to questions.</p>

<h2>Accurate income</h2>
<p>Revenue on the return should match what the business actually earned. Unreconciled books can double-count deposits — owner contributions, loan proceeds or transfers between accounts recorded as sales — and inflate taxable income. They can also miss income, creating a mismatch with the 1099-NEC and 1099-K forms the IRS receives about your business.</p>

<h2>Deductions captured — or lost</h2>
<p>Expenses that are not recorded, or are buried in personal accounts, never reach the return. Well-kept books capture deductible costs as they happen, categorized correctly: supplies separately from equipment, meals separately from travel, contractor payments separately from wages.</p>

<h2>Depreciation and fixed assets</h2>
<p>Equipment, vehicles and improvements are recovered through depreciation or expensing elections. A fixed-asset register — what was bought, when, for how much and when it was placed in service — is essential for claiming those deductions correctly and for calculating gain or loss when assets are sold.</p>

<h2>Inventory and cost of goods sold</h2>
<p>For product businesses, cost of goods sold is often the largest deduction. It depends on accurate purchases and a reliable year-end inventory count. Errors here move profit directly.</p>

<h2>Owner transactions</h2>
<p>Owner draws, distributions, contributions and loans are not income or expenses, but they matter for the return — for an S corporation shareholder's basis, for partners' capital accounts and for proving that money moving between the owner and the business was what it appears to be.</p>

<h2>Information returns</h2>
<p>Bookkeeping that tracks contractor payments makes January's 1099-NEC filings straightforward. Missing W-9s and incomplete payment records mean late filings and potential penalties.</p>

<h2>Estimated payments and planning</h2>
<p>Quarterly estimated tax and year-end planning depend on current profit figures. With books kept monthly, estimates reflect the year you are actually having.</p>

<h2>If the IRS asks</h2>
<p>A return backed by reconciled books, receipts and clear categorization is far easier to support in an examination. A return built from estimates and bank statements is not.</p>

<h2>Time and cost</h2>
<p>When books arrive clean, tax preparation focuses on tax decisions. When they arrive messy, the first weeks are spent on bookkeeping — at tax-season rates and under deadline pressure.</p>

<p>Because our team keeps the books and prepares the returns, every return starts from reconciled numbers. See our <a href="/services/bookkeeping-accounting">bookkeeping</a> and <a href="/services/tax-preparation-filing">tax preparation</a> services.</p>

<p><em>This article is general information, not tax advice.</em></p>
$body$,
  $m$How bookkeeping affects your business tax return: accurate income, captured deductions, depreciation, inventory, owner transactions, 1099s and audits.$m$,
  'us'
),
(
  'quickbooks-online-vs-quickbooks-desktop-whats-the-difference',
  $t$QuickBooks Online vs. QuickBooks Desktop: What's the Difference?$t$,
  $e$Cloud or installed software? How QuickBooks Online and QuickBooks Desktop compare on access, features, pricing and the future — and how to decide.$e$,
  'Bookkeeping',
  'ANAV Global',
  'draft',
  $body$
<p>QuickBooks is the most widely used accounting software for small businesses in the U.S., but it comes in two very different forms. QuickBooks Online runs in the cloud; QuickBooks Desktop is installed on a computer or server. Choosing between them — or deciding whether to move — depends on how your business works.</p>

<h2>QuickBooks Online</h2>
<p>QuickBooks Online is a subscription service accessed through a browser or mobile app. Data is stored in Intuit's cloud.</p>
<ul>
  <li><strong>Access anywhere</strong> — you, your team and your accountant can log in from any device at the same time.</li>
  <li><strong>Automatic updates</strong> — no installing new versions.</li>
  <li><strong>Bank feeds and integrations</strong> — a large marketplace of connected apps for payments, payroll, e-commerce, expense management and more.</li>
  <li><strong>Tiered plans</strong> — more users and features at higher tiers.</li>
</ul>
<p><strong>Limitations:</strong> some advanced features — complex inventory, detailed job costing, industry-specific reports — are only available in higher tiers or through add-on apps, and you need an internet connection.</p>

<h2>QuickBooks Desktop</h2>
<p>QuickBooks Desktop is installed locally or hosted on a server, with editions designed for different business sizes and industries.</p>
<ul>
  <li><strong>Depth of features</strong> — strong inventory, job costing and industry-specific editions for contractors, manufacturers, wholesalers, nonprofits and retailers.</li>
  <li><strong>Performance with large files</strong> — handles high transaction volumes well.</li>
  <li><strong>Works offline</strong> on the machine where it is installed.</li>
</ul>
<p><strong>Limitations:</strong> remote access requires hosting or remote-desktop tools, collaboration with an accountant typically involves file transfers or hosting, and fewer modern integrations are available.</p>

<h2>Where Intuit is heading</h2>
<p>Intuit has been moving customers toward the cloud. In 2024 it stopped selling most QuickBooks Desktop editions to new U.S. subscribers, while continuing QuickBooks Desktop Enterprise and allowing existing subscribers to keep renewing. Businesses on Desktop today should keep an eye on support timelines and plan any move rather than being forced into one.</p>

<h2>Which is right for you?</h2>
<ul>
  <li><strong>Choose Online</strong> if you want remote access, real-time collaboration with your accountant, app integrations and minimal IT maintenance — which describes most small businesses.</li>
  <li><strong>Consider Desktop Enterprise</strong> if you depend on advanced inventory, complex job costing or industry-specific features and have the IT setup to support it.</li>
</ul>

<h2>Moving from Desktop to Online</h2>
<p>Intuit provides conversion tools, but a successful migration needs planning: cleaning up the Desktop file first, choosing a conversion date, checking which data and reports carry over, mapping features that work differently, and reconciling balances after the move. Some history — certain reports, payroll detail, inventory methods — may not convert exactly.</p>

<p>Our team works in both QuickBooks Online and QuickBooks Desktop, and handles migrations from one to the other as part of our <a href="/services/bookkeeping-accounting">bookkeeping service</a>.</p>
$body$,
  $m$QuickBooks Online vs QuickBooks Desktop compared: access, features, integrations, Intuit's direction, which suits your business and how to migrate.$m$,
  'us'
),
(
  'bookkeeping-for-construction-companies-job-costing-retainage-wip',
  $t$Bookkeeping for Construction Companies: Job Costing, Retainage and WIP$t$,
  $e$Construction accounting has its own vocabulary and its own risks. How job costing, retainage and work-in-progress schedules keep contractors profitable — and bondable.$e$,
  'Industry Insights',
  'ANAV Global',
  'draft',
  $body$
<p>Construction companies can look profitable right up until a job closes and the true costs appear. Good construction bookkeeping prevents that surprise. It rests on three practices that general bookkeeping does not cover: job costing, retainage tracking and work-in-progress reporting.</p>

<h2>Job costing: every cost to a job</h2>
<p>Job costing assigns labor, materials, equipment and subcontractor costs to the specific job they belong to. Without it, you know whether the company made money but not which jobs did. With it, you can:</p>
<ul>
  <li>Compare actual costs with the estimate as the job progresses.</li>
  <li>Spot overruns while there is still time to act or issue a change order.</li>
  <li>Improve future bids using real cost data.</li>
</ul>
<p>The key is consistency: every bill, timesheet and purchase coded to a job and a cost code at the time it is entered, not reconstructed later.</p>

<h2>Retainage: earned but not yet received</h2>
<p>Many contracts hold back a percentage of each progress payment — retainage — until the project is complete. That money has been earned but not collected. It should be tracked separately as retainage receivable, by job, so it is billed and collected when due. Subcontractor retainage you hold works the same way in reverse, as retainage payable.</p>

<h2>Progress billing and change orders</h2>
<p>Progress billings should follow the schedule of values in the contract. Change orders need to be documented, approved and added to both the contract value and the budget, or the job will look over budget when it is not.</p>

<h2>The WIP schedule</h2>
<p>A work-in-progress schedule compares, for each open job, the contract value, estimated total cost, costs to date, percentage complete and amount billed. It reveals:</p>
<ul>
  <li><strong>Overbilling</strong> — billed ahead of work completed. Cash is in hand, but it is effectively owed back in work.</li>
  <li><strong>Underbilling</strong> — work completed but not yet billed. Often a sign of missed billing or cost overruns.</li>
</ul>
<p>Surety companies and lenders rely on WIP schedules when deciding bonding capacity and credit, so an accurate one directly affects how much work you can take on.</p>

<h2>Payroll and subcontractors</h2>
<p>Construction payroll often includes multiple job sites, union or prevailing-wage rates, and certified payroll reports on public projects. Subcontractors need W-9s before payment, current insurance certificates, and Form 1099-NEC at year end.</p>

<h2>Tax considerations</h2>
<p>How long-term contracts are reported for tax — percentage-of-completion or a simplified method available to smaller contractors — affects when income is taxed. Equipment depreciation and the classification of workers are other areas where construction businesses benefit from planning.</p>

<p>We set up and maintain job costing, retainage and WIP reporting for contractors. Learn more about our work with <a href="/industries/construction">construction firms</a>.</p>
$body$,
  $m$Bookkeeping for construction companies: job costing, retainage, progress billing, change orders, WIP schedules, certified payroll and subcontractors.$m$,
  'us'
),
(
  'trust-accounting-for-law-firms-iolta-three-way-reconciliation',
  $t$Trust Accounting for Law Firms: IOLTA and Three-Way Reconciliation Explained$t$,
  $e$Client money held in trust carries strict rules. How IOLTA accounts, client ledgers and three-way reconciliation work — and the mistakes that cause problems.$e$,
  'Industry Insights',
  'ANAV Global',
  'draft',
  $body$
<p>Law firms hold money that does not belong to them: client retainers, settlement funds and advances for costs. That money must be kept in trust and accounted for precisely. State bar rules govern how, and trust accounting errors are among the most common reasons lawyers face disciplinary action. Good trust accounting is not just bookkeeping — it is professional responsibility.</p>

<h2>What is an IOLTA account?</h2>
<p>An IOLTA (Interest on Lawyers' Trust Accounts) account is a pooled trust account for client funds that are small in amount or held for a short time. The interest goes to state programs that fund legal services, not to the firm or the client. Larger sums held for longer may belong in a separate interest-bearing trust account for the individual client.</p>

<h2>The core rules</h2>
<ul>
  <li><strong>No commingling.</strong> Client money and firm money stay separate. Operating expenses are never paid from the trust account, and firm money is not left in it beyond what is permitted to cover bank charges.</li>
  <li><strong>Earned fees come out promptly.</strong> Once a fee is earned and billed according to the engagement, it should be transferred to the operating account.</li>
  <li><strong>No negative client balances.</strong> You cannot disburse more for a client than you hold for that client, even if the overall account has funds.</li>
  <li><strong>Records are kept.</strong> Every deposit and disbursement is recorded with the client and matter it relates to, and records are retained for the period your state requires.</li>
</ul>

<h2>Three records, one reconciliation</h2>
<p>Trust accounting relies on three sets of records that must agree:</p>
<ol>
  <li><strong>The bank statement</strong> for the trust account.</li>
  <li><strong>The trust account journal</strong> — the firm's record of every transaction in the account.</li>
  <li><strong>The client ledgers</strong> — a separate running balance for each client.</li>
</ol>
<p>A <strong>three-way reconciliation</strong> confirms that the reconciled bank balance, the journal balance and the total of all client ledger balances are identical. Many states require it monthly. If the three don't agree, something is wrong — a deposit recorded to the wrong client, a disbursement missed, a bank error — and it must be resolved immediately.</p>

<h2>Common mistakes</h2>
<ul>
  <li>Paying a client cost from trust before the client's funds have cleared.</li>
  <li>Leaving earned fees in trust for long periods.</li>
  <li>Reconciling only the bank balance, not the client ledgers.</li>
  <li>Unidentified funds sitting in trust with no client assigned.</li>
</ul>

<h2>The operating side matters too</h2>
<p>Beyond trust, firms need clear reporting on billable time, realization, collections, case costs advanced on contingency matters and profitability by practice area or partner. Unbilled work and slow collections are the most common cash flow problems in legal practices.</p>

<p>We maintain trust ledgers, perform monthly three-way reconciliations and keep the operating books for legal practices. Learn more about our work with <a href="/industries/law-firms">law firms</a>.</p>

<p><em>Trust accounting rules vary by state. This article is general information, not legal or ethics advice — consult your state bar's rules.</em></p>
$body$,
  $m$Trust accounting for law firms explained: IOLTA accounts, no commingling, client ledgers, monthly three-way reconciliation and common mistakes.$m$,
  'us'
),
(
  'bookkeeping-for-rental-property-owners',
  $t$Bookkeeping for Rental Property Owners: Keeping Every Property's Numbers Clean$t$,
  $e$One rental or twenty, each property needs its own clean records. How landlords should track rent, expenses, deposits and depreciation — and why it matters at tax time.$e$,
  'Industry Insights',
  'ANAV Global',
  'draft',
  $body$
<p>Rental property can be a strong investment, but its paperwork grows quickly: rent from several tenants, repairs, property taxes, insurance, mortgage statements, management fees and security deposits. Good bookkeeping turns that into a clear picture of how each property performs — and a tax return that is straightforward to prepare.</p>

<h2>Track each property separately</h2>
<p>Record income and expenses by property, not just in total. Property-level reporting shows which properties are carrying the portfolio and which are dragging it down, and it maps directly onto how rental income is reported for tax, property by property.</p>

<h2>Keep rental money out of personal accounts</h2>
<p>A dedicated bank account for rental activity — or one per property or entity for larger portfolios — makes every transaction easy to identify and support.</p>

<h2>Security deposits are not income</h2>
<p>Deposits you expect to return to tenants are a liability, not income. Record them separately and track them by tenant. If part of a deposit is kept for unpaid rent or damage, that amount becomes income when it is applied. Some states also require deposits to be held in separate accounts.</p>

<h2>Repairs or improvements?</h2>
<p>Repairs that keep a property in working order — fixing a leak, repainting a room — are generally deductible in the year paid. Improvements that make the property better, restore it or adapt it to a new use — a new roof, a kitchen remodel — are generally capitalized and depreciated. The tax rules include several safe harbors that allow smaller expenditures to be deducted immediately. Recording the details of each job makes the classification defensible.</p>

<h2>Depreciation</h2>
<p>Residential rental buildings are depreciated over 27.5 years and commercial buildings over 39 years; land is not depreciated. Improvements, appliances and furniture have their own schedules. Keep a fixed-asset register for each property with purchase price, the allocation between land and building, improvements and dates placed in service. Depreciation also affects the tax when a property is sold, so accurate records matter for years.</p>

<h2>Property managers</h2>
<p>If a property manager collects rent and pays expenses, their monthly owner statements should be reconciled to your books and bank deposits. Record the gross rent and the fees and expenses separately rather than just the net payout.</p>

<h2>Records to keep</h2>
<ul>
  <li>Leases and rent rolls.</li>
  <li>Closing statements from purchases and refinancing.</li>
  <li>Invoices for repairs and improvements, with descriptions of the work.</li>
  <li>Mortgage interest statements, property tax bills and insurance policies.</li>
  <li>Mileage records for trips to properties.</li>
</ul>

<h2>Tax time</h2>
<p>Rental income and expenses are usually reported on Schedule E for individuals, or on a partnership or corporate return if the properties are held in an entity. Passive activity rules can limit the losses you deduct, depending on your income and involvement. Clean, property-level books make all of this far easier.</p>

<p>We keep property-by-property books, depreciation schedules and deposit records for landlords and investors. Learn more about our work with <a href="/industries/rental-property">rental property owners</a>.</p>

<p><em>This article is general information, not tax advice.</em></p>
$body$,
  $m$Bookkeeping for rental property owners: property-level tracking, security deposits, repairs vs improvements, depreciation, property managers and records.$m$,
  'us'
),
(
  'accounting-for-hotels-and-motels-numbers-that-matter',
  $t$Accounting for Hotels and Motels: The Numbers That Matter Most$t$,
  $e$Occupancy, ADR and RevPAR are only as reliable as the books behind them. How hotel and motel owners can get daily revenue, OTA payouts and lodging taxes right.$e$,
  'Industry Insights',
  'ANAV Global',
  'draft',
  $body$
<p>Hotels and motels generate revenue every night, from several channels, with taxes and commissions attached to much of it. Owners who can see their numbers clearly — by day, by channel and by property — make better decisions on pricing, staffing and investment. That starts with accounting built for how lodging businesses work.</p>

<h2>The key performance measures</h2>
<ul>
  <li><strong>Occupancy</strong> — rooms sold divided by rooms available.</li>
  <li><strong>ADR (average daily rate)</strong> — room revenue divided by rooms sold.</li>
  <li><strong>RevPAR (revenue per available room)</strong> — room revenue divided by rooms available, or occupancy multiplied by ADR.</li>
</ul>
<p>RevPAR is the single best measure of how well a property turns its rooms into revenue. But these numbers are only meaningful if room revenue is recorded accurately and consistently.</p>

<h2>Daily revenue reconciliation</h2>
<p>The night audit in your property management system (PMS) records the day's room revenue, taxes and payments. Card settlements, cash deposits and third-party payouts then arrive in the bank on different days. Reconciling the PMS to the bank every day — or at least every week — catches missed charges, settlement errors and discrepancies before they compound.</p>

<h2>Online travel agencies</h2>
<p>Bookings through online travel agencies (OTAs) come with commissions and different payment models. In some, the guest pays the hotel and the hotel pays commission later; in others, the OTA collects payment and remits a net amount. Recording gross room revenue and commission expense separately — rather than just the net deposit — keeps ADR and channel costs accurate and shows what each channel really costs.</p>

<h2>Lodging and occupancy taxes</h2>
<p>Room revenue is typically subject to state, county and city lodging taxes, sometimes with different rates and filing schedules. Taxes collected from guests are liabilities, not revenue. Tracking them separately and filing each return on time avoids penalties — and accurate records matter when an OTA collects and remits some of those taxes on your behalf.</p>

<h2>Payroll</h2>
<p>Housekeeping, front desk and maintenance staffing is usually the largest controllable cost. Hourly payroll, overtime and high turnover make accurate time records and labor-cost reporting — per occupied room, for example — essential.</p>

<h2>Industry-standard reporting</h2>
<p>Many hotels follow the Uniform System of Accounts for the Lodging Industry (USALI), which organizes revenue and expenses by department — rooms, food and beverage, other operated departments — and makes properties comparable with industry benchmarks. Franchise fees, loyalty program costs and reserves for furniture, fixtures and equipment (FF&amp;E) should be tracked explicitly.</p>

<h2>Tax considerations</h2>
<p>Hotel buildings and their furnishings involve significant depreciation. Owners often ask their tax advisers about cost segregation studies, which identify components that can be depreciated faster than the building itself.</p>

<p>We reconcile daily revenue, track OTA commissions and lodging taxes, and deliver monthly reporting for hotel and motel owners. Learn more about our work with <a href="/industries/hotels-motels">hotels and motels</a>.</p>
$body$,
  $m$Accounting for hotels and motels: occupancy, ADR and RevPAR, night audit reconciliation, OTA commissions, lodging taxes, payroll and USALI reporting.$m$,
  'us'
),
(
  'cannabis-accounting-and-section-280e',
  $t$Cannabis Accounting and Section 280E: What Owners Need to Know$t$,
  $e$Section 280E changes how licensed cannabis businesses are taxed, which makes inventory costing and clean books unusually important. What owners need to understand.$e$,
  'Industry Insights',
  'ANAV Global',
  'draft',
  $body$
<p>Licensed cannabis businesses operate legally under state law but face a federal tax rule that applies to almost no other legal industry: Section 280E of the Internal Revenue Code. Understanding it — and keeping books that are built around it — is essential for any cannabis operator.</p>

<h2>What Section 280E says</h2>
<p>Section 280E prohibits deductions and credits for any business that consists of trafficking in controlled substances listed on Schedule I or II of the Controlled Substances Act. Because cannabis has been on Schedule I, plant-touching businesses — cultivators, manufacturers and dispensaries — generally cannot deduct ordinary business expenses such as rent, advertising, administrative salaries or utilities on their federal returns.</p>
<p>What remains available is <strong>cost of goods sold</strong>, which reduces gross receipts before taxable income is calculated. As a result, cannabis businesses can owe federal tax even when they have little or no profit on their books.</p>

<h2>Why inventory costing matters so much</h2>
<p>Because cost of goods sold is often the main way to reduce taxable income, how costs are included in inventory is critical — and closely scrutinized. Courts have held that cannabis businesses are limited to the inventory costing rules of Section 471, which generally allow the direct and certain indirect costs of producing or acquiring inventory, rather than the broader capitalization rules other businesses use. Cultivators and manufacturers can typically include more production costs than retailers, whose cost of goods sold is largely the purchase price of products plus costs of getting them to the store.</p>

<h2>Separate activities</h2>
<p>Some cannabis businesses operate genuinely separate, non-trafficking activities — for example, selling unrelated merchandise or providing services. Expenses of a truly separate trade or business may be deductible. Courts examine these arrangements closely, so separation must be real: separate operations, records, staff time and economics.</p>

<h2>Federal rescheduling</h2>
<p>The federal government has been working through a process to move cannabis from Schedule I to Schedule III. Section 280E applies only to Schedule I and II substances, so rescheduling would end its application from the date the change takes effect — but it would not change returns for earlier years. Until the change is final and effective, cannabis businesses should plan, file and keep records on the basis that 280E applies, and check the current status with their tax adviser.</p>

<h2>The bookkeeping that supports it</h2>
<ul>
  <li><strong>Inventory records reconciled to your seed-to-sale tracking system</strong> and your point-of-sale data.</li>
  <li><strong>Cost accounting</strong> that clearly identifies production and inventory costs.</li>
  <li><strong>Daily cash reconciliation</strong> — cash-heavy operations need tight controls and clear deposit records.</li>
  <li><strong>State excise and sales taxes</strong> tracked and filed separately.</li>
  <li><strong>Documentation</strong> of how costs were allocated, prepared as if it will be examined.</li>
</ul>

<h2>State taxes are different</h2>
<p>Many states with legal cannabis programs do not follow Section 280E for state income tax, so state taxable income can differ significantly from federal. Each state's treatment needs to be checked.</p>

<p>We keep cannabis books reconciled to seed-to-sale and POS records, and prepare returns with 280E in mind. Learn more about our work with <a href="/industries/cannabis">cannabis businesses</a>.</p>

<p><em>This article is general information, not tax or legal advice. Federal and state rules for cannabis are changing — speak with a qualified professional about your business.</em></p>
$body$,
  $m$Cannabis accounting and Section 280E: what it disallows, why cost of goods sold and inventory costing matter, separate activities and rescheduling.$m$,
  'us'
),
(
  'bookkeeping-for-ecommerce-and-drop-shipping-businesses',
  $t$Bookkeeping for E-commerce and Drop-Shipping Businesses$t$,
  $e$Marketplace payouts, fees, refunds, ad spend and sales tax make online selling harder to account for than it looks. How to see your real profit on every order.$e$,
  'Industry Insights',
  'ANAV Global',
  'draft',
  $body$
<p>Selling online looks simple from the outside: list products, take orders, get paid. Behind the scenes, money moves through marketplaces, payment processors, suppliers and ad platforms, each with its own fees and timing. Without bookkeeping designed for that, many online sellers do not know their real profit — per order, per product or per channel.</p>

<h2>Record gross sales, not net payouts</h2>
<p>Platforms such as Shopify, Amazon, Etsy and PayPal deposit a net amount after deducting fees, refunds, chargebacks and sometimes advertising. Recording only the deposit understates revenue and hides costs. Instead, reconcile each payout to its settlement report and record gross sales, fees, refunds and adjustments separately.</p>

<h2>Match costs to sales</h2>
<ul>
  <li><strong>Inventory sellers</strong> need accurate cost of goods sold — purchases, freight-in and duties — and regular inventory counts.</li>
  <li><strong>Drop shippers</strong> hold no inventory, but each order has a supplier cost. Matching supplier charges to customer orders shows true gross margin and catches billing errors.</li>
</ul>

<h2>Track advertising carefully</h2>
<p>For many online businesses, advertising is the largest expense after product costs. Tracking ad spend by channel and calculating contribution margin after advertising shows which products and campaigns actually make money.</p>

<h2>Sales tax</h2>
<p>Since the Supreme Court's 2018 <em>Wayfair</em> decision, states can require out-of-state sellers to collect sales tax once they pass an economic nexus threshold — commonly measured by sales into the state. Marketplace facilitator laws require platforms like Amazon to collect and remit tax on marketplace sales in most states, but sales through your own website usually remain your responsibility. Tracking sales by state and by channel shows where you need to register and file. Sales tax collected is a liability, not revenue.</p>

<h2>Form 1099-K is not your income</h2>
<p>Payment platforms report gross payments on Form 1099-K once you pass the federal reporting threshold. That figure includes fees, refunds and sometimes sales tax, so it rarely equals your taxable income. Books that reconcile to the 1099-K — and explain the difference — avoid mismatches with the IRS.</p>

<h2>Multiple currencies and suppliers</h2>
<p>Paying overseas suppliers or selling internationally introduces exchange-rate differences and transaction fees. Record them consistently so margins are not distorted.</p>

<h2>A monthly routine</h2>
<ol>
  <li>Reconcile every payout to its settlement report.</li>
  <li>Match supplier costs to orders (or update inventory).</li>
  <li>Record refunds, chargebacks and fees by channel.</li>
  <li>Review sales by state for sales tax obligations.</li>
  <li>Review contribution margin by product and channel.</li>
</ol>

<p>We reconcile payouts across every channel and report real margins for online sellers. Learn more about our work with <a href="/industries/e-commerce">e-commerce</a> and <a href="/industries/drop-shipping">drop-shipping</a> businesses.</p>
$body$,
  $m$Bookkeeping for e-commerce and drop-shipping: gross vs net payouts, supplier costs, ad spend, sales tax nexus, Form 1099-K and a monthly routine.$m$,
  'us'
)
on conflict (slug) do nothing;
