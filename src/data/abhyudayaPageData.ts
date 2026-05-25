export interface BankFeature {
  label: string;
  text: string;
}

export interface BankFAQ {
  q: string;
  a: string;
}

export interface BankRateRow {
  parameter: string;
  value: string;
  details: string;
}

export interface AbhyudayaPageContent {
  title: string;
  badge: string;
  intro: string;
  moreIntro?: string;
  highlightsTitle: string;
  highlights: BankFeature[];
  ratesTitle?: string;
  ratesHeaders?: string[];
  ratesRows?: string[][];
  checklistTitle?: string;
  checklist?: string[];
  faqs: BankFAQ[];
}

export const ABHYUDAYA_PAGE_MAP: Record<string, AbhyudayaPageContent> = {
  "overview": {
    title: "Abhyudaya Co-Operative Bank: Premium Multi-State Banking Portal",
    badge: "Official Bank Profile",
    intro: "Abhyudaya Co-Operative Bank Ltd is one of the premier leading scheduled multi-state co-operative banks in India. Operating extensive branch networks across Maharashtra, Gujarat, and Karnataka, the bank delivers state-of-the-art retail banking, loan products, high-yield fixed deposits, and robust digital net banking architectures to over 20 lakh satisfied customers.",
    moreIntro: "At BanksCart, we compare Abhyudaya Bank's interest rates and borrowing eligibility slots to help you secure the cheapest personal, home, or business loans with fully optimized documentation steps. Established in 1964 and designated as a Scheduled Bank by the Reserve Bank of India in 1988, Abhyudaya operates with financial integrity, modern security frameworks, and a community-first approach.",
    highlightsTitle: "Why Choose Abhyudaya Co-Operative Bank?",
    highlights: [
      { label: "RBI Scheduled Status", text: "Enjoy unmatched safety under direct Reserve Bank of India guidelines and DICGC deposit insurances." },
      { label: "Harmonious Loan Slabs", text: "Access competitive interest rates on Personal, Business, Education, and Home Loans with minimal processing fees." },
      { label: "Premium Digital Suite", text: "Execute secure domestic money transfers and access accounts 24/7 via Mobile App and Net Banking portals." }
    ],
    ratesTitle: "Key Abhyudaya Financial Benchmarks",
    ratesHeaders: ["Financial Parameter", "Retail Rates Offered", "Key Terms & Eligibility"],
    ratesRows: [
      ["Savings Account Deposits", "3.00% - 3.50% p.a.", "Interest paid half-yearly, minimum balance of ₹1,000"],
      ["Fixed Deposit Slabs (1 Yr)", "6.75% - 7.25% p.a.", "Additional 0.50% p.a. yield for Senior Citizens"],
      ["Personal Loan Rates", "Starting at 12.50% p.a.", "Based on credit score, tenure up to 60 months"],
      ["Home Loan Base Rates", "Starting at 8.99% p.a.", "Floating baseline linked to Bank's lending rates"],
      ["Business Loan (MSME)", "Starting at 13.00% p.a.", "Collateral-free Mudra backing up to ₹10 Lakhs"]
    ],
    checklistTitle: "Core Services Available at Abhyudaya Bank",
    checklist: [
      "Retail Accounts: High-yield savings, competitive current accounts, and flexible recurring deposit programs.",
      "Borrower Portals: Instant approvals for retail customers seeking housing finance, vehicle upgrades, and educational pursuits.",
      "Digital Banking: Advanced IMPS, NEFT, RTGS transactions, and biometric utility integrations via mobile apps.",
      "SME & Agri Credit: Specialized funding lines designed to boost regional traders, micro enterprises, and agrarian communities."
    ],
    faqs: [
      { q: "Is Abhyudaya Bank a government bank or private bank?", a: "Abhyudaya Bank is a Scheduled Co-operative Bank, which means it is owned co-operatively by its members and depositors. It is fully regulated by the Reserve Bank of India (RBI)." },
      { q: "Are deposits in Abhyudaya Bank insured?", a: "Yes. All deposits in Abhyudaya Bank are insured up to ₹5 Lakhs per depositor under the Deposit Insurance and Credit Guarantee Corporation (DICGC) scheme, equivalent to commercial banks." },
      { q: "How can I register for Net Banking?", a: "You can download the Net Banking registration form online via BanksCart or the bank's portal, fill it out, and submit it to your home branch to receive your secure login credentials." },
      { q: "What is the minimum balance for a Savings Account?", a: "For a regular Savings Account with cheque book facility, the minimum average quarterly balance is ₹1,000 for metro/urban branches and ₹500 for semi-urban/rural branches." },
      { q: "How many branches does Abhyudaya Bank operate?", a: "The bank operates a modern network of over 111 fully computerized branches spread across Maharashtra, Gujarat, and Karnataka." }
    ]
  },
  "customer-care": {
    title: "Abhyudaya Bank Customer Care: Toll-Free Helpline Directories",
    badge: "24/7 Support Desk",
    intro: "Abhyudaya Co-Operative Bank provides dedicated multi-channel customer care helplines to resolve queries instantly. Whether you need to block a lost debit card, track a pending personal loan application, or resolve net banking disputes, the bank offers specialized support grids.",
    moreIntro: "At BanksCart, we compile all active toll-free numbers, local board lines, regional helpdesks, and email directories so you can bypass long waiting lines and get direct support.",
    highlightsTitle: "Core Customer Care Portals",
    highlights: [
      { label: "Toll-Free Support", text: "Reach out to the general support desk at 1800 22 3131 for immediate queries." },
      { label: "Debit Card Hotlisting", text: "Instantly block lost cards physically by calling the dedicated 24/7 helpline 022-2521 3131." },
      { label: "Digital Helpdesk", text: "Email custom queries or transaction screenshots directly to helpdesk@abhyudayabank.co.in." }
    ],
    ratesTitle: "Important Support Numbers Directory",
    ratesHeaders: ["Department Name", "Helpline Number", "Dedicated Email Address"],
    ratesRows: [
      ["General Toll-Free Support", "1800 22 3131", "secretarial@abhyudayabank.co.in"],
      ["Debit Card Operations / Blocking", "022-2528 4036 / 2521 3131", "cardops@abhyudayabank.co.in"],
      ["Net Banking Support Desk", "022-2411 5047", "netbanking@abhyudayabank.co.in"],
      ["IMPS / UPI Mobile Helpdesk", "022-2410 5099", "mobilebanking@abhyudayabank.co.in"],
      ["Central Office Board Line", "022-2414 0961", "admin@abhyudayabank.co.in"]
    ],
    checklistTitle: "Grievance Resolution Step-by-Step Flow",
    checklist: [
      "Step 1: Contact your local home branch manager physically or log a query on the official helpline.",
      "Step 2: If unresolved in 7 days, escalate the ticket to the Regional Manager quoting your service ID.",
      "Step 3: Submit unresolved cases to the Principal Nodal Officer at the Central Office in Mumbai.",
      "Step 4: If no response is received in 30 days, file an online appeal with the RBI Banking Ombudsman."
    ],
    faqs: [
      { q: "How can I instantly block my Abhyudaya Debit Card?", a: "You must immediately call the 24/7 card blocking hotline at 022-2521 3131 or send an SMS from your registered mobile to hotlist the card." },
      { q: "What should I do if my account is debited but ATM didn't dispense cash?", a: "File a dispute form at the nearest branch or mail cardops@abhyudayabank.co.in. The bank resolves ATM disputes and reverses the amount within 5 to 7 working days." },
      { q: "Are customer support services available on public holidays?", a: "Card blocking and basic phone banking are active 24/7. General grievance and retail loan desks operate during standard branch working hours." }
    ]
  },
  "education-loan": {
    title: "Abhyudaya Bank Education Loan: Career & Global Studies Funding",
    badge: "Academic Advancement",
    intro: "Empower your career aspirations with an Abhyudaya Bank Education Loan. Designed to fund professional degrees, technical certifications, and post-graduate studies, the bank offers flexible academic credit limits for studies in India and overseas.",
    moreIntro: "At BanksCart, we help students optimize their applications. With competitive reducing interest rates, customized co-borrower rules, and convenient post-study repayment moratorium slabs, we ensure you study without financial stress.",
    highlightsTitle: "Highlights of Abhyudaya Education Loans",
    highlights: [
      { label: "High Funding Caps", text: "Secure up to ₹10 Lakhs for studies inside India and up to ₹20 Lakhs for foreign universities." },
      { label: "Moratorium Period", text: "Repayment begins strictly 1 year after course completion or 6 months after securing job employment." },
      { label: "Concessional Schemes", text: "Special interest concessions of 0.50% p.a. for girl students and merit scholars." }
    ],
    ratesTitle: "Education Loan Rate Slabs & Details",
    ratesHeaders: ["Category", "Interest Rate (p.a.)", "Processing Fee Limit", "Max Repayment Tenure"],
    ratesRows: [
      ["Studies in India (Up to ₹4 L)", "11.50% p.a. (Unsecured)", "Nil", "Up to 7 Years after Moratorium"],
      ["Studies in India (Above ₹4 L)", "12.00% p.a. (Co-applicant)", "0.50% of Loan Amount", "Up to 10 Years after Moratorium"],
      ["Studies Abroad (Up to ₹20 L)", "12.50% p.a. (Collateral)", "Flat ₹5,000", "Up to 15 Years after Moratorium"]
    ],
    checklistTitle: "Mandatory Document Checklist for Students",
    checklist: [
      "Academic Certificates: Submit Marksheets of 10th, 12th, and graduation degree courses.",
      "Proof of Admission: Provide the official admission letter and fee structure prospectus from the college.",
      "Co-Applicant Financials: Submit co-borrower's PAN, Aadhaar, salary slips, and past 2 years' IT Returns.",
      "Collateral Documents: Provide original deeds or fixed deposits if seeking loans above ₹7.5 Lakhs."
    ],
    faqs: [
      { q: "Who can act as a co-borrower for an education loan?", a: "Parents, siblings, spouse, or father-in-law/mother-in-law can act as a co-borrower, subject to stable income proof." },
      { q: "Is collateral compulsory for all academic loans?", a: "No. Loans up to ₹4 Lakhs do not require collateral. Loans between ₹4 Lakhs and ₹7.5 Lakhs require a third-party guarantee, while loans above ₹7.5 Lakhs require tangible asset collateral." },
      { q: "What expenses are covered under the education loan?", a: "The loan covers college tuition fees, hostel/mess charges, examination fees, library deposits, purchase of books/laptop, and foreign travel passages." }
    ]
  },
  "fixed-deposits": {
    title: "Abhyudaya Bank Fixed Deposits: Safe Compositions & Yields",
    badge: "Wealth Insulator",
    intro: "Lock your savings in Abhyudaya Bank Fixed Deposits to earn guaranteed high-yield interest rates entirely unaffected by volatile stock market indices. Offering tenure options from 7 days up to 10 years, the bank caters to both short-term liquidity and long-term retirement planning.",
    moreIntro: "At BanksCart, we compare active FD interest rates to ensure your capital compounds optimally. Depositors can choose between Cumulative (Reinvestment) FDs, Non-Cumulative (Monthly/Quarterly payout) FDs, or tax-saving schemes.",
    highlightsTitle: "Highlights of Abhyudaya Fixed Deposits",
    highlights: [
      { label: "High Compounding Yields", text: "Earn up to 7.25% p.a. interest, compounding quarterly to maximize maturity totals." },
      { label: "Senior Citizen Bonus", text: "Senior citizens aged 60 and above qualify for an additional 0.50% p.a. interest yield." },
      { label: "Overdraft & Credit Facility", text: "Avail instant overdraft credit lines up to 90% of your FD value without breaking the deposit." }
    ],
    ratesTitle: "Active Fixed Deposit Interest Rates 2026",
    ratesHeaders: ["Tenure Slab", "Regular Interest Rate (p.a.)", "Senior Citizen Rate (p.a.)", "Compounding Type"],
    ratesRows: [
      ["7 Days to 45 Days", "4.00% p.a.", "4.50% p.a.", "Simple Interest at Maturity"],
      ["46 Days to 180 Days", "5.25% p.a.", "5.75% p.a.", "Simple Interest at Maturity"],
      ["181 Days to 364 Days", "6.25% p.a.", "6.75% p.a.", "Quarterly Compounding"],
      ["1 Year to 3 Years", "7.00% p.a.", "7.50% p.a.", "Quarterly Compounding"],
      ["3 Years to 10 Years", "6.75% p.a.", "7.25% p.a.", "Quarterly Compounding"]
    ],
    checklistTitle: "How to Book a Fixed Deposit Online",
    checklist: [
      "Active Account: Log in to your Abhyudaya Net Banking portal or Mobile Banking app.",
      "Select FD Variant: Navigate to 'Term Deposits', select either Cumulative or Non-Cumulative payout options.",
      "Enter Capital: Input deposit amount (minimum ₹1,000) and choose your tenure.",
      "Add Nomination: Provide nominee details physically or online to secure future claims."
    ],
    faqs: [
      { q: "Is there a penalty for premature withdrawal of FD?", a: "Yes. Premature withdrawal of fixed deposits attracts a standard penalty of 1.00% on the applicable interest rate for the period the deposit remained with the bank." },
      { q: "What is the Tax-Saving FD under Section 80C?", a: "Abhyudaya Bank offers a 5-year locked Tax-Saver FD. Deposits up to ₹1.5 Lakhs annually are 100% exempt from income tax, but premature withdrawal is strictly prohibited." },
      { q: "How is TDS calculated on FD interest?", a: "TDS is deducted at 10% if your interest income exceeds ₹40,000 annually (₹50,000 for senior citizens). Submit Form 15G/15H to prevent TDS deductions if total income is below tax slabs." }
    ]
  },
  "grievance-redressal-escalation-matrix": {
    title: "Abhyudaya Bank Grievance Redressal: Nodal Officer Matrices",
    badge: "Consumer Protection",
    intro: "Abhyudaya Co-Operative Bank is committed to delivering a transparent, fair, and professional banking experience. If you encounter service delays, unauthorized transactions, or unfair lending actions, the bank hosts an official multi-tier Grievance Redressal Escalation Matrix to resolve issues.",
    moreIntro: "At BanksCart, we simplify customer rights under the RBI Charter. We provide all active Nodal Officer contacts, regional grievance emails, and direct online links to escalate disputes swiftly.",
    highlightsTitle: "Redressal Escalation Levels",
    highlights: [
      { label: "Level 1: Branch Resolution", text: "Submit your written complaint physically to the Branch Manager or log it on the support helpline." },
      { label: "Level 2: Regional Escalation", text: "If unresolved in 7 days, escalate your query to the Regional Office in Mumbai or Navi Mumbai." },
      { label: "Level 3: Principal Nodal Officer", text: "Escalate unresolved Level 2 disputes directly to the central Principal Nodal Officer in Mumbai." }
    ],
    ratesTitle: "Escalation Desk Directories",
    ratesHeaders: ["Escalation Stage", "Officer / Department Name", "Direct Contact Info", "Resolution Turnaround SLA"],
    ratesRows: [
      ["Level 1 (Branch Desk)", "Branch Manager / Support Helpline", "1800 22 3131", "7 Working Days"],
      ["Level 2 (Regional)", "Area Regional Head / Manager", "022-2528 4036", "7 Working Days"],
      ["Level 3 (Central Office)", "Principal Nodal Officer, Mumbai", "nodalofficer@abhyudayabank.co.in", "7 Working Days"],
      ["Level 4 (Ombudsman)", "RBI Banking Ombudsman Office", "https://cms.rbi.org.in", "30 Days maximum"]
    ],
    checklistTitle: "How to draft an official Grievance Complaint",
    checklist: [
      "Quote Account Details: Clearly write your name, active account number, and home branch name.",
      "List Transaction IDs: Quote transaction dates, disputed amounts, and reference IDs.",
      "Attach Evidence: Provide clean copies of bank statements, ATM charge slips, or communication emails.",
      "Demand Resolution: Specify the desired rectifications (e.g., reversal of charges or clearing card locks)."
    ],
    faqs: [
      { q: "How long does the bank take to resolve a complaint?", a: "Branch level complaints are typically resolved in 3 to 7 working days. The maximum SLA for complex cases is 30 days, after which the user can approach the RBI." },
      { q: "What is the Banking Ombudsman?", a: "The Banking Ombudsman is an independent senior official appointed by the RBI to resolve customer complaints against banks for deficiency in banking services." },
      { q: "Is there any charge for filing complaints?", a: "No. Filing complaints with the bank's nodal desk or the RBI Banking Ombudsman is 100% free of cost." }
    ]
  },
  "personal-loan": {
    title: "Abhyudaya Bank Personal Loan: Instant Multi-Purpose Cash Slabs",
    badge: "Instant Liquidity",
    intro: "An Abhyudaya Bank Personal Loan is an unsecured multi-purpose credit facility designed to fund urgent financial requirements. Whether remodeling your home, managing wedding expenses, funding holiday travels, or clearing unexpected medical bills, you can access hassle-free funds with low reducing interest rates.",
    moreIntro: "At BanksCart, we optimize your personal application flow. We compare Abhyudaya Bank's personal loan criteria to help you secure the lowest EMI tags, fast digital underwriting, and flexible tenures without placing assets as security.",
    highlightsTitle: "Highlights of Abhyudaya Personal Loans",
    highlights: [
      { label: "High Loan Limits", text: "Secure personal funding up to ₹15 Lakhs based on salary brackets and business vintage." },
      { label: "Reducing Balances", text: "Enjoy fair interest calculations using monthly reducing structures, dropping total payable interest." },
      { label: "No Security Asset", text: "Unsecured personal loans require zero collateral, pledges, or property security." }
    ],
    ratesTitle: "Personal Loan Interest Rates & Parameters",
    ratesHeaders: ["Borrower Category", "Applicable Rate (p.a.)", "Processing Fee Range", "Max Tenure Slabs"],
    ratesRows: [
      ["Salaried Government Employees", "11.75% - 12.50% p.a.", "0.50% - 1.00%", "Up to 60 Months"],
      ["Private Corporate Employees", "12.50% - 14.50% p.a.", "1.00% - 1.50%", "Up to 60 Months"],
      ["Self-Employed Professionals", "13.00% - 15.50% p.a.", "1.50% - 2.00%", "Up to 36 Months"],
      ["Pensioners (Abhyudaya Account)", "11.00% - 11.50% p.a.", "Nil to Flat ₹500", "Up to 60 Months"]
    ],
    checklistTitle: "Mandatory Eligibility & Documentation Guide",
    checklist: [
      "Salaried Status: Applicant must have a minimum take-home salary of ₹15,000 per month.",
      "vintage proof: Minimum active work vintage of 1 year with private companies or 2 years in business.",
      "KYC dossier: Keep your Aadhaar, PAN card, and 3 passport size photos ready.",
      "Income proof: past 3 months' salary slips, 2 years' Form 16, and past 6 months' primary salary bank statements."
    ],
    faqs: [
      { q: "What is the maximum personal loan amount I can get?", a: "Abhyudaya Bank offers personal loans up to ₹15 Lakhs for salaried individuals, subject to a maximum EMI-to-salary ratio of 50% to 60%." },
      { q: "Can self-employed individuals apply?", a: "Yes. Self-employed traders, doctors, and professionals can apply by submitting past 2 years' audited financials and ITR copies." },
      { q: "Do I need a guarantor for an unsecured loan?", a: "Yes. The bank usually requires one or two personal co-guarantors (preferably salaried or with stable income) to secure the loan." }
    ]
  },
  "savings-account": {
    title: "Abhyudaya Bank Savings Account: High-Yield Digital Accounts",
    badge: "Smart Savings Hub",
    intro: "An Abhyudaya Bank Savings Account is a secure and feature-rich deposit portal designed to cultivate smart savings habits. With attractive daily balance interest yields, advanced digital banking, mobile payment access, and personal insurance benefits, it is the perfect account to manage daily cash flows.",
    moreIntro: "At BanksCart, we simplify account selections by analyzing active savings yields, minimum average balance (MAB) tiers, and transactional limits to help you make informed decisions.",
    highlightsTitle: "Savings Account Key Highlights",
    highlights: [
      { label: "Attractive Yields", text: "Earn up to 3.50% p.a. interest, calculated daily on active account balances and paid half-yearly." },
      { label: "RuPay Debit Card", text: "Access free Rupay or Visa Classic debit cards with high cash withdrawal and online POS limits." },
      { label: "Multi-State Access", text: "Transact seamlessly across all Abhyudaya branches and networked ATMs across India." }
    ],
    ratesTitle: "Savings Account Comparison Chart",
    ratesHeaders: ["Account Type", "Daily Balance Interest", "Cheque Book Facility", "Minimum Average Balance (MAB)"],
    ratesRows: [
      ["Regular Savings (Metro/Urban)", "3.50% p.a.", "Included (25 leaves free/yr)", "₹1,000 Average Balance"],
      ["Regular Savings (Rural/Semi-Urban)", "3.00% p.a.", "Included (25 leaves free/yr)", "₹500 Average Balance"],
      ["No-Frills / PMJDY Basic Savings", "3.00% p.a.", "Not Available", "Zero Balance (No MAB)"],
      ["Salary Premium Account", "3.50% p.a.", "Unlimited Free Cheques", "Zero Balance (With Salary Link)"]
    ],
    checklistTitle: "Mandatory KYC Documents for Account Opening",
    checklist: [
      "Proof of Identity: Submit a valid copy of your Aadhaar card or PAN card.",
      "Proof of Address: Provide Voter ID, Driving License, passport, or utility bills under 3 months old.",
      "Passport Photos: Keep 2 recent colored passport-sized photographs ready.",
      "Income proof (for Salary account): Submit your company ID card and latest salary slip copy."
    ],
    faqs: [
      { q: "Can I open a zero-balance account?", a: "Yes. Abhyudaya offers Basic Savings Bank Deposit Accounts (BSBDA) under RBI guidelines, which do not require a minimum balance but carry basic transactional caps." },
      { q: "How is savings interest calculated?", a: "Interest is calculated daily based on the end-of-day balances in your savings account and credited to the account half-yearly on 30th June and 31st December." },
      { q: "Is internet banking free?", a: "Yes. Access to internet banking, mobile banking apps, and e-statements is completely free of charge." }
    ]
  },
  "business-loan": {
    title: "Abhyudaya Bank Business Loan: Fueling MSME & Industrial Growth",
    badge: "Enterprise Capital",
    intro: "Scale your business operations, purchase bulk inventory, or fund machine upgrades with Abhyudaya Bank Business Loans. Designed specifically to fuel regional trade, small scale manufacturing, service startups, and agri-business expansions, the bank offers customized capital lines.",
    moreIntro: "At BanksCart, we optimize enterprise credit matches. We align your company vintage with Abhyudaya's working capital cash credit limits, term loans, and MUDRA collateral-free schemes to help you lock in low borrowing rates and quick clearances.",
    highlightsTitle: "Core Commercial Credit Pillars",
    highlights: [
      { label: "Working Capital Cash Credit", text: "Avail flexible overdraft limits linked directly to your active inventory levels and book debts." },
      { label: "Mudra Scheme Concessions", text: "Secure micro enterprise loans up to ₹10 Lakhs completely collateral-free under MUDRA schemes." },
      { label: "Structured Term Funding", text: "Finance commercial property or long-term machinery assets over extended repayment tenures." }
    ],
    ratesTitle: "Business Loan Slabs & Schemes",
    ratesHeaders: ["Loan Scheme Name", "Applicable Rate (p.a.)", "Required Collateral", "Best Use Case"],
    ratesRows: [
      ["Mudra Loan (Shishu / Kishore)", "Starting at 11.50% p.a.", "Collateral-Free (CGTMSE)", "Micro shop expansions, local merchants"],
      ["Working Capital Cash Credit", "12.50% - 14.50% p.a.", "Primary hypothecation of stock/debts", "Managing daily cash flows, raw materials"],
      ["Machinery Term Loan", "12.00% - 13.50% p.a.", "Hypothecation of machinery + Property", "Purchase of factory equipment and upgrades"],
      ["Commercial Property Loan", "Starting at 10.50% p.a.", "Mortgage of purchased property", "Buying new offices or warehouses"]
    ],
    checklistTitle: "Mandatory Corporate Document Checklist",
    checklist: [
      "Business Registrations: Provide GST registrations, MSME Udyam certificates, and Shop Act licenses.",
      "Audited Accounts: Keep past 3 years' audited balance sheets and profit & loss statements ready.",
      "Bank Statements: Past 12 months' business current account bank statement PDFs.",
      "Income tax returns (ITR): Past 3 fiscal years' ITR along with tax audit details."
    ],
    faqs: [
      { q: "What is the maximum Mudra loan amount available?", a: "Abhyudaya Bank offers Mudra loans up to ₹10 Lakhs under three brackets: Shishu (up to ₹50,000), Kishore (above ₹50,000 to ₹5 Lakhs), and Tarun (above ₹5 Lakhs to ₹10 Lakhs)." },
      { q: "Do I need a current account with Abhyudaya Bank?", a: "Yes. Working capital and cash credit limits require a fully active current account with the bank to monitor cash flows." },
      { q: "Is third-party guarantee required?", a: "Yes. For standard commercial loans, the bank usually requires a personal guarantee from directors or partners, alongside asset collaterals." }
    ]
  },
  "home-loan": {
    title: "Abhyudaya Bank Home Loan: Low-Interest Housing Finance Guide",
    badge: "Housing Finance",
    intro: "Step into your dream home with Abhyudaya Bank Home Loans. Offering highly competitive floating interest rates, high loan-to-value ratios, and extended repayment tenures, the bank supports purchasing fresh flats, constructing homes, or renovating existing properties.",
    moreIntro: "At BanksCart, we optimize your mortgage structure. We compare Abhyudaya Bank's floating base rates to help you secure the lowest monthly EMIs, maximum loan limits, and paperless KYC clearances, ensuring your home ownership dream comes true.",
    highlightsTitle: "Key Highlights of Abhyudaya Home Loans",
    highlights: [
      { label: "High Loan-to-Value (LTV)", text: "Secure housing finance covering up to 80% to 90% of the property value." },
      { label: "Extended Tenures", text: "Repay comfortably over structured long-term tenures extending up to 30 years." },
      { label: "Balance Transfer Facility", text: "Transfer your high-interest home loan from other banks to Abhyudaya at low rates." }
    ],
    ratesTitle: "Home Loan Rate Slabs & Details",
    ratesHeaders: ["Loan Slab Amount", "Interest Rate (p.a.)", "Processing Fee Range", "Max Repayment Tenure"],
    ratesRows: [
      ["Loans up to ₹30 Lakhs", "8.99% - 9.50% p.a.", "0.25% of loan amount (Max ₹10,000)", "Up to 30 Years"],
      ["Loans ₹30 Lakhs to ₹75 Lakhs", "9.25% - 9.75% p.a.", "0.50% of loan amount (Max ₹25,000)", "Up to 25 Years"],
      ["Loans above ₹75 Lakhs", "9.50% - 10.25% p.a.", "0.50% of loan amount (Max ₹50,000)", "Up to 20 Years"]
    ],
    checklistTitle: "Mandatory Document Checklist for Home Buyers",
    checklist: [
      "Property Documents: Signed Agreement to Sale, chain of title deeds, approved building plans, and NOC from builder.",
      "KYC Dossier: Keep Aadhaar, PAN card, and 3 passport size photos ready.",
      "Income proof (Salaried): Past 3 months' salary slips, Form 16, and past 6 months' salary bank statements.",
      "Income proof (Business): Past 3 years' audited balance sheets and ITR copies."
    ],
    faqs: [
      { q: "Can I get a home loan to buy a resale flat?", a: "Yes. Abhyudaya Bank finances the purchase of ready-to-move-in flats, resale properties, under-construction apartments, and plot construction." },
      { q: "What is the age limit for a home loan?", a: "The minimum applicant age is 21 years. The loan must be fully repaid before the primary applicant reaches 65 years of age (70 years for self-employed)." },
      { q: "Are there prepayment charges on home loans?", a: "No. Under RBI guidelines, the bank does not charge any prepayment or foreclosure fees on floating rate home loans." }
    ]
  },
  "home-loan-customer-care": {
    title: "Abhyudaya Home Loan Support: Dedicated Mortgage Helplines",
    badge: "Mortgage Support Desk",
    intro: "Managing property transactions requires timely updates. Abhyudaya Bank operates a dedicated Home Loan Customer Care desk to assist with interest certificate downloads, repayment schedule changes, or balance transfer queries.",
    moreIntro: "At BanksCart, we provide all active mortgage helpdesk contacts, regional office details, email boards, and escalation charts to resolve your home loan queries fast.",
    highlightsTitle: "Core Mortgage Support Portals",
    highlights: [
      { label: "Mortgage Helpline", text: "Call the central home loan desk at 022-2528 4036 for immediate loan queries." },
      { label: "Interest Certificates", text: "Download your annual provisional interest certificates online via net banking for tax filings." },
      { label: "Regional Loan Hubs", text: "Visit regional loan offices physically in major city hubs for personal attention." }
    ],
    faqs: [
      { q: "How can I obtain my home loan interest certificate for ITR filing?", a: "You can download it instantly from your Abhyudaya Net Banking portal or visit your home branch. This certificate details principal and interest components paid." },
      { q: "Can I negotiate my home loan interest rate with customer support?", a: "Rate changes depend on the bank's base lending rate. However, if your CIBIL score has improved significantly, you can submit an application to switch to a cheaper floating rate bracket." }
    ]
  },
  "net-banking": {
    title: "Abhyudaya Net Banking: Safe Digital Payments & Transfers",
    badge: "Secure Digital Portals",
    intro: "Abhyudaya Co-Operative Bank provides a secure and feature-rich Net Banking portal that brings a complete banking suite to your computer screen. Securely manage accounts, execute domestic money transfers, pay utility bills, and monitor investments 24/7.",
    moreIntro: "At BanksCart, we simplify digital payments. Our guide details secure net banking registrations, password reset procedures, IMPS limits, and security protocols to ensure your online banking is safe.",
    highlightsTitle: "Net Banking Key Highlights",
    highlights: [
      { label: "Secure Transactions", text: "Enjoy multi-layer security with dynamic transaction OTPs, custom security questions, and digital certificates." },
      { label: "Domestic Fund Transfers", text: "Execute instant funds transfers to any bank account in India via RTGS, NEFT, and 24/7 IMPS channels." },
      { label: "Online Bill Payments", text: "Pay electricity bills, credit card dues, mobile recharges, and local taxes via Bharat BillPay (BBPS)." }
    ],
    faqs: [
      { q: "How can I register for Abhyudaya Net Banking?", a: "Submit a filled Net Banking Registration Form to your home branch. The branch will activate services and mail your secure Login ID and Password." },
      { q: "What should I do if I forgot my Net Banking password?", a: "You can reset it online by clicking 'Forgot Password' on the login screen, entering your customer ID and registered mobile number, and completing OTP verification." },
      { q: "Are there any charges for IMPS transactions via Net Banking?", a: "The bank charges nominal transaction fees (ranging from ₹2.50 to ₹10) depending on the IMPS transaction slabs. NEFT and RTGS are completely free online." }
    ]
  },
  "timings": {
    title: "Abhyudaya Bank Timings: Branch Working Hours & Lunch Slabs",
    badge: "Branch Directories",
    intro: "Planning a visit to your local home branch requires precise branch timing details. Abhyudaya Bank branches follow a structured timing chart, offering customer service, cash deposits, and locker access across regular slots.",
    moreIntro: "At BanksCart, we detail branch opening hours, customer service timings, lunch break schedules, and weekend opening days, helping you plan visits and skip wait queues.",
    highlightsTitle: "Standard Branch Schedule Slabs",
    highlights: [
      { label: "Branch Opening Hours", text: "Standard branches open at 10:00 AM and close at 05:00 PM for retail customer visits." },
      { label: "Cash Transactions", text: "Cash deposits and withdrawals operate from 10:00 AM to 03:30 PM (except bank holidays)." },
      { label: "Lunch Break Schedule", text: "Standard lunch breaks range from 01:30 PM to 02:00 PM, managed on a rotational basis." }
    ],
    faqs: [
      { q: "Is Abhyudaya Bank open on Saturdays?", a: "The bank is open on the 1st, 3rd, and 5th Saturdays of the month. It is closed on the 2nd and 4th Saturdays under standard bank calendar rules." },
      { q: "What are the timings for locker access?", a: "Locker lockers are accessible during standard branch working hours, from 10:00 AM to 04:30 PM on working days." },
      { q: "Do timing slabs vary across rural branches?", a: "Select rural and semi-urban branches may open earlier (at 09:30 AM) or operate on single shift rotations. Check with your home branch to confirm." }
    ]
  }
};
