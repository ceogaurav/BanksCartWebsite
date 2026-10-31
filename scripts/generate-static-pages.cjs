const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const templatePath = path.join(distDir, 'index.html');
const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
const directoryLinksPath = path.resolve(__dirname, '../src/data/financialDirectoryLinks.json');
const loanDataPath = path.resolve(__dirname, '../src/data/loanPageData.json');

if (!fs.existsSync(templatePath)) {
  console.log('dist/index.html not found. Run "vite build" first.');
  process.exit(0);
}

let templateHtml = fs.readFileSync(templatePath, 'utf8');
// Clean out any previously injected root content to make templateHtml truly clean and reusable
templateHtml = templateHtml.replace(/<div id="root">[\s\S]*?<\/body>/i, '<div id="root"></div>\n  </body>');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
const directoryLinks = JSON.parse(fs.readFileSync(directoryLinksPath, 'utf8'));
const loanPageData = JSON.parse(fs.readFileSync(loanDataPath, 'utf8'));

// Extract URLs from segmented child sitemaps in public/
const childSitemaps = [
  'sitemap-core.xml',
  'sitemap-loans.xml',
  'sitemap-cards.xml',
  'sitemap-banking.xml',
  'sitemap-blogs.xml',
  'sitemap-services.xml'
];
const urlsSet = new Set([
  '/',
  '/about',
  '/contact',
  '/editorial-policy',
  '/author/raghav-singhal',
  '/author/amit-khurana',
  '/author/neha-verma'
]);
const urlRegex = /<loc>https:\/\/www\.bankscart\.com([^<]*)<\/loc>/g;

for (const smName of childSitemaps) {
  const smPath = path.resolve(__dirname, '../public', smName);
  if (fs.existsSync(smPath)) {
    const smContent = fs.readFileSync(smPath, 'utf8');
    let match;
    while ((match = urlRegex.exec(smContent)) !== null) {
      urlsSet.add(match[1] || '/');
    }
  }
}

// Fallback to sitemap.xml
if (fs.existsSync(sitemapPath)) {
  const smContent = fs.readFileSync(sitemapPath, 'utf8');
  let match;
  while ((match = urlRegex.exec(smContent)) !== null) {
    const p = match[1] || '/';
    if (!p.endsWith('.xml')) {
      urlsSet.add(p);
    }
  }
}

const urls = Array.from(urlsSet);

// Subpaths for Personal Loans with distinct value propositions
const PERSONAL_LOAN_SUBPATHS = {
  'overview': {
    title: "Personal Loans Overview: In-Depth Comparison & Eligibility Guide | BanksCart",
    description: "Compare personal loans from 30+ top banks and NBFCs in India. Check eligibility, lowest interest rates starting from 10.50%, EMI calculations, and apply online."
  },
  'pre-approved': {
    title: "Pre-Approved Personal Loans: 10-Second Disbursal & Zero Documents | BanksCart",
    description: "Access instant pre-approved personal loans with 10-second bank account disbursal, zero collateral, and zero physical documentation."
  },
  'interest-rates': {
    title: "Personal Loan Interest Rates 2026: Compare All Bank Rates | BanksCart",
    description: "Compare the latest personal loan interest rates, processing fees, and special concessions across SBI, HDFC, ICICI, Axis, and leading NBFCs."
  },
  'mobile-app': {
    title: "Best Instant Personal Loan Apps in India: Quick Disbursals | BanksCart",
    description: "Discover top-rated RBI-registered loan apps for fast digital credit. Enjoy instant biometric verification, paperless approval, and rapid cash disbursal."
  },
  'low-cibil-score': {
    title: "Personal Loan for Low CIBIL Score: Instant Approval Options | BanksCart",
    description: "Need funds with a low credit score? Explore tailored personal loan options for CIBIL scores below 650 with flexible tenures and guarantor options."
  },
  'balance-transfer': {
    title: "Personal Loan Balance Transfer: Lowest Interest Rate & Save EMI | BanksCart",
    description: "Switch your existing high-interest personal loan to a lower-rate bank. Save substantially on monthly EMIs and unlock top-up loan facilities."
  },
  'loan-on-credit-card': {
    title: "Instant Loan on Credit Card: Pre-Approved Cash & Low EMI | BanksCart",
    description: "Convert your credit card limit into quick cash. Enjoy pre-approved instant disbursals, zero paperwork, and convenient monthly installment plans."
  },
  '5-lakh': {
    title: "₹5 Lakh Personal Loan: Check EMI, Eligibility & Apply Online | BanksCart",
    description: "Apply for a ₹5 Lakh personal loan with flexible tenures up to 5 years. Calculate monthly EMI, compare lender rates, and get instant approval."
  },
  '10-lakh': {
    title: "₹10 Lakh Personal Loan: Interest Rates, EMIs & Apply Online | BanksCart",
    description: "Secure a ₹10 Lakh personal loan for medical emergencies, home renovation, or debt consolidation. Compare top lenders and calculate repayment schedules."
  },
  '20-lakh': {
    title: "₹20 Lakh Personal Loan: Compare Low Interest Rates & EMIs | BanksCart",
    description: "Get high-value personal loans up to ₹20 Lakhs with attractive interest rates, flexible repayment tenures, and minimal documentation."
  },
  '30-lakh': {
    title: "₹30 Lakh Personal Loan: High-Value Instant Loan Eligibility | BanksCart",
    description: "Check eligibility for a high-limit ₹30 Lakh personal loan. Compare premium banking rates, fast-track processing, and flexible tenure options."
  },
  '40-lakh': {
    title: "₹40 Lakh Personal Loan: Low Interest Rates & Fast Disbursal | BanksCart",
    description: "Access up to ₹40 Lakhs in unsecured financing for high-capital personal requirements. Fast approval and competitive monthly EMIs."
  },
  '50-lakh': {
    title: "₹50 Lakh Personal Loan: Jumbo Unsecured Capital & Low EMI | BanksCart",
    description: "Jumbo personal loans up to ₹50 Lakhs for high-income professionals and entrepreneurs with premium terms and dedicated relationship managers."
  },
  'salaried-employees': {
    title: "Personal Loan for Salaried Employees: Instant Approvals & Low Rates | BanksCart",
    description: "Special personal loan schemes for salaried professionals in corporate, government, and private sectors with lowest interest rates and paperless processing."
  },
  'self-employed': {
    title: "Personal Loan for Self-Employed: No ITR & Quick Disbursal | BanksCart",
    description: "Tailored personal financing for self-employed individuals, professionals, and traders with flexible income proof requirements and fast disbursals."
  },
  'senior-citizens': {
    title: "Personal Loan for Senior Citizens: Low Interest Pension Loans | BanksCart",
    description: "Specialized pension personal loans for retired central/state government and defense pensioners with low interest rates and extended tenures."
  },
  'students': {
    title: "Education & Student Personal Loans: Zero Collateral & Low Rates | BanksCart",
    description: "Affordable student loans for tuition fees, certification courses, and laptop financing with low interest rates and flexible repayment schedules."
  },
  'doctors': {
    title: "Special Personal Loan for Doctors: Instant High-Limit Capital | BanksCart",
    description: "Exclusive customized loans for medical doctors, dentists, and healthcare professionals with pre-approved limits up to ₹50 Lakhs and zero collateral."
  },
  'women': {
    title: "Personal Loan for Women: Special Concessional Rates & Low EMIs | BanksCart",
    description: "Empowering women borrowers with discounted interest rates, reduced processing fees, and flexible repayment terms for personal and professional goals."
  },
  'medical-loan': {
    title: "Emergency Medical Loan: Instant Disbursal for Healthcare | BanksCart",
    description: "Fast-track emergency personal loans to cover hospital bills, surgeries, and specialized medical treatments with rapid 2-hour approval."
  },
  'travel-loan': {
    title: "Personal Loan for Travel & Vacation: Quick Easy EMIs | BanksCart",
    description: "Finance domestic and international vacations with convenient holiday travel loans. Enjoy instant approvals and pocket-friendly EMIs."
  },
  'debt-consolidation': {
    title: "Debt Consolidation Loan: Merge Debts into One Single Low EMI | BanksCart",
    description: "Combine multiple credit card dues and high-cost debts into one single monthly installment with a lower interest rate and stress-free repayment."
  },
  'wedding-loan': {
    title: "Marriage & Wedding Loan: Plan Dream Weddings with Easy EMIs | BanksCart",
    description: "Fund dream weddings, jewelry, catering, and venue costs with flexible marriage personal loans offering competitive rates and easy EMIs."
  },
  'overdraft-loan': {
    title: "Personal Overdraft Loan: Pay Interest Only on Withdrawn Amount | BanksCart",
    description: "Flexible overdraft credit line. Withdraw money whenever required and pay interest only on the utilized amount with zero prepayment penalties."
  },
  'flexi-loan': {
    title: "Flexi Personal Loan: Withdraw & Prepay Anytime at Zero Extra Fee | BanksCart",
    description: "Flexi personal loans offering on-demand withdrawals and part-prepayments with zero extra charges to manage uneven cash flows seamlessly."
  },
  'short-term-loan': {
    title: "Short-Term Personal Loan: Fast Cash Disbursals in 24 Hours | BanksCart",
    description: "Short-term unsecured financing for immediate cash requirements with tenures from 3 to 12 months and quick 24-hour bank disbursal."
  },
  'term-loan': {
    title: "Fixed Term Personal Loan: Structured Monthly EMIs & Tenure | BanksCart",
    description: "Traditional term personal loans with fixed interest rates and predictable monthly EMI schedules for disciplined long-term repayment."
  }
};

// Subpaths for Credit Cards with distinct value propositions
const CREDIT_CARD_SUBPATHS = {
  'overview': {
    title: "Credit Cards in India: Compare Rewards, Cashback & Benefits | BanksCart",
    description: "Compare 100+ credit cards across top banks in India. Evaluate reward points, cashback offers, airport lounge access, and find your perfect card."
  },
  'best-cards': {
    title: "Best Credit Cards in India 2026: Top 10 Cards Ranked | BanksCart",
    description: "Top 10 best credit cards in India ranked by reward rates, airport lounge visits, dining benefits, and milestone perks for all spend categories."
  },
  'best-forex-cards': {
    title: "Best Forex Credit Cards: Zero Markup & Low Currency Fees | BanksCart",
    description: "Save on currency conversion charges during international travel with top zero-forex markup credit cards and international prepaid travel cards."
  },
  'cibil-score': {
    title: "Credit Card Eligibility by CIBIL Score: Apply Online | BanksCart",
    description: "Understand the minimum CIBIL score needed for credit card approvals and discover cards you qualify for based on your credit profile."
  },
  'eligibility': {
    title: "Credit Card Eligibility Calculator: Check Free Approval | BanksCart",
    description: "Check your credit card approval chances instantly without impacting your credit score. Compare personalized card recommendations."
  },
  'compare': {
    title: "Compare Top Credit Cards Side-by-Side: Rewards & Fees | BanksCart",
    description: "Side-by-side comparison of annual fees, joining benefits, reward multipliers, and fuel surcharge waivers across premier credit cards."
  },
  'rupay': {
    title: "Best RuPay Credit Cards: UPI Payment & Cashback Rewards | BanksCart",
    description: "Link RuPay credit cards to UPI for merchant QR payments and earn reward points on day-to-day tea, grocery, and fuel transactions."
  },
  'secured': {
    title: "Secured Credit Cards: Build CIBIL Score Against Fixed Deposit | BanksCart",
    description: "Rebuild your credit history with 100% guaranteed approval secured credit cards backed by bank fixed deposits with zero income proof."
  },
  'lifetime-free': {
    title: "Best Lifetime Free Credit Cards: Zero Annual Fee Forever | BanksCart",
    description: "Enjoy premium credit card perks with zero joining and annual fees for life. Compare top lifetime-free credit cards in India."
  },
  'rewards': {
    title: "Best Reward Points Credit Cards: High Multipliers & Perks | BanksCart",
    description: "Accelerate your reward earnings on shopping, dining, and utility bills. Redeem points for flights, luxury hotels, and vouchers."
  },
  'cashback': {
    title: "Best Cashback Credit Cards: Up to 5% Cashback on Spends | BanksCart",
    description: "Get direct statement cashback on online shopping at Amazon, Flipkart, Swiggy, and Zomato with top-ranked cashback credit cards."
  },
  'lounge-access': {
    title: "Best Airport Lounge Access Credit Cards: Complimentary Visits | BanksCart",
    description: "Travel in comfort with free domestic and international airport lounge access, priority check-in, and complimentary refreshments."
  },
  'virtual': {
    title: "Instant Virtual Credit Cards: Digital Activation in 5 Minutes | BanksCart",
    description: "Get instant digital credit card numbers for immediate online shopping, subscriptions, and bill payments with zero physical waiting."
  },
  'fuel': {
    title: "Best Fuel Surcharge Waiver Credit Cards: Save on Petrol & Diesel | BanksCart",
    description: "Cut down everyday fuel costs with 1% fuel surcharge waivers and bonus reward points at IndianOil, HPCL, and BPCL fuel pumps."
  },
  'travel': {
    title: "Best Travel Credit Cards: Air Miles, Free Flights & Lounge Access | BanksCart",
    description: "Maximize travel perks with complimentary airline tickets, air miles conversions, international travel insurance, and hotel room upgrades."
  },
  'international': {
    title: "International Credit Cards: Global Acceptance & Travel Insurance | BanksCart",
    description: "Globally accepted credit cards with multi-currency billing, overseas medical insurance cover, and emergency concierge assistance."
  },
  'zero-forex': {
    title: "Zero Forex Markup Credit Cards: Save 3.5% on Overseas Spends | BanksCart",
    description: "Eliminate foreign exchange fees on overseas transactions and online foreign currency websites with zero-forex credit cards."
  }
};

// Subpaths for Bonds with distinct value propositions
const BONDS_SUBPATHS = {
  'overview': {
    title: "Bonds in India: High-Yield Fixed Income Investment Guide | BanksCart",
    description: "Complete guide to bond investing in India. Compare government securities, corporate bonds, tax-free bonds, and regular coupon yields."
  },
  'corporate': {
    title: "Corporate Bonds: High Yields, AAA Ratings & Regular Payouts | BanksCart",
    description: "Earn stable yields up to 11% p.a. by investing in top AAA/AA+ rated corporate bonds with periodic monthly or quarterly coupon payouts."
  },
  'government': {
    title: "Government Bonds & G-Secs: 100% Sovereign Safety & Fixed Returns | BanksCart",
    description: "Secure 100% principal safety backed by the Government of India. Invest in long-term G-Secs and Treasury Bills with zero default risk."
  },
  'tax-free': {
    title: "Tax-Free Bonds: 100% Tax Exemption on Interest Returns | BanksCart",
    description: "Earn tax-free annual interest returns with government-backed infrastructure bonds under Section 10(15)(iv)(h) with zero TDS."
  },
  'floating-rate': {
    title: "Floating Rate Savings Bonds (FRSB): Inflation-Linked High Returns | BanksCart",
    description: "RBI floating rate bonds offering interest rates linked to NSC rates with semi-annual payouts, ideal for conservative retirement income."
  },
  'capital-gain': {
    title: "54EC Capital Gain Bonds: Save Capital Gains Tax on Property Sale | BanksCart",
    description: "Exempt 100% long-term capital gains tax on property sales under Section 54EC with REC, PFC, and NHAI capital gain bonds."
  },
  'zero-coupon': {
    title: "Zero-Coupon Deep Discount Bonds: Capital Growth & Returns | BanksCart",
    description: "Invest at a deep discount to face value and receive full maturity value without reinvestment risk. Ideal for long-term goal planning."
  },
  'how-to-invest': {
    title: "How to Buy Bonds Online in India: Step-by-Step Investor Guide | BanksCart",
    description: "Step-by-step walkthrough on investing in primary and secondary bond markets via RBI Retail Direct, NSE goBID, and online platforms."
  },
  'sovereign-gold': {
    title: "Sovereign Gold Bonds (SGB): 2.5% Annual Interest + Gold Appreciation | BanksCart",
    description: "Invest in paper gold with an additional 2.5% fixed annual interest payout, zero making charges, and 100% tax exemption on maturity gains."
  }
};

// Static SEO Map for core hubs
const STATIC_SEO_MAP = {
  "/about": {
    title: "About BanksCart: India's Trusted Financial Services & Loan Comparison Platform",
    description: "Learn about BanksCart's mission, leadership team, and editorial integrity in helping Indian borrowers compare loans, credit cards, and banking services objectively."
  },
  "/about-us": {
    title: "About BanksCart: India's Trusted Financial Services & Loan Comparison Platform",
    description: "Learn about BanksCart's mission, leadership team, and editorial integrity in helping Indian borrowers compare loans, credit cards, and banking services objectively."
  },
  "/company-registration": {
    title: "Company Registration in India - Private Limited, LLP, OPC & IP Filing | BanksCart",
    description: "Register your company online in India. End-to-end legal support for Private Limited, LLP, OPC incorporation, MCA compliance, and copyright registration."
  },
  "/contact": {
    title: "Contact Us - Customer Support, Helpdesk & Grievance Redressal | BanksCart",
    description: "Contact BanksCart customer care, support desk, and grievance redressal officer. Get in touch for loan application assistance, banking partner inquiries, and customer feedback."
  },
  "/contact-us": {
    title: "Contact Us - Customer Support, Helpdesk & Grievance Redressal | BanksCart",
    description: "Contact BanksCart customer care, support desk, and grievance redressal officer. Get in touch for loan application assistance, banking partner inquiries, and customer feedback."
  },
  "/editorial-policy": {
    title: "Editorial Integrity, Rate Verification & Fact-Checking Policy | BanksCart",
    description: "Learn how BanksCart verifies loan interest rates, conducts weekly bank audits, maintains 100% editorial independence from lenders, and fact-checks financial guides."
  },
  "/author/raghav-singhal": {
    title: "Raghav Singhal, FCA & CFP - Lead Financial Analyst Bio | BanksCart",
    description: "Read Raghav Singhal's author bio. Fellow Chartered Accountant & Certified Financial Planner with 12+ years experience in retail lending and credit debt advisory."
  },
  "/author/amit-khurana": {
    title: "Amit Khurana, CFA & ex-SBI - Senior Banking Advisor Bio | BanksCart",
    description: "Read Amit Khurana's reviewer bio. Veteran banker with 18+ years leading credit underwriting at State Bank of India and CFA charterholder on BanksCart."
  },
  "/blog/sukanya-samriddhi-yojana-guide": {
    title: "Sukanya Samriddhi Yojana (SSY) 2026: Interest Rate, Rules, Eligibility & Tax Benefits | BanksCart",
    description: "Complete guide on Sukanya Samriddhi Yojana (SSY) account opening, latest 8.2% interest rates, tenure calculation, and Section 80C tax exemption rules."
  },
  "/blog/Sukanya-Samriddhi-Yojana-Guide": {
    title: "Sukanya Samriddhi Yojana (SSY) 2026: Interest Rate, Rules, Eligibility & Tax Benefits | BanksCart",
    description: "Complete guide on Sukanya Samriddhi Yojana (SSY) account opening, latest 8.2% interest rates, tenure calculation, and Section 80C tax exemption rules."
  },
  "/author/priya-sharma": {
    title: "Priya Sharma: Senior Financial Analyst & Sovereign Savings Specialist | BanksCart",
    description: "Read Priya Sharma's author bio. Certified Financial Planner with 10+ years specializing in government small savings schemes (SSY, PPF) and tax-saving investments on BanksCart."
  },
  "/author/neha-verma": {
    title: "Neha Verma, CFP - Senior Personal Finance Specialist Bio | BanksCart",
    description: "Read Neha Verma's author bio. Certified Financial Planner with 9+ years analyzing credit cards, fixed deposits, and retail banking products on BanksCart."
  },
  "/": {
    title: "BanksCart: Compare Loan Interest Rates, Credit Cards & CIBIL Score Online",
    description: "Compare personal, home, and business loan interest rates from 30+ top Indian banks. Check your CIBIL score for free and apply online with instant approval on BanksCart."
  },
  "/resources/aadhar-pan": {
    title: "Link Aadhaar to PAN Card Online: Step-by-Step Guide & Status Check | BanksCart",
    description: "Complete guide on linking Aadhaar with PAN card online via Income Tax e-filing portal. Check linking status, penalty fee details, and step-by-step instructions."
  },
  "/aadhar-card/aadhaar-card-services": {
    title: "Aadhaar Card Update Online Status: Address, Phone & Biometrics | BanksCart",
    description: "Track your Aadhaar card update request status online via UIDAI portal using URN or Enrolment ID. Complete guide on updating address, mobile number, and photos."
  },
  "/personal-loan-emi-calculator": {
    title: "Personal Loan EMI Calculator: Calculate Monthly Repayment & APR | BanksCart",
    description: "Calculate your monthly personal loan installment instantly. Enter loan amount, interest rate (from 10.25% p.a.), and tenure to view total interest and amortization."
  },
  "/home-loan-emi-calculator": {
    title: "Home Loan EMI Calculator: Housing Loan Repayment Schedule & Amortization | BanksCart",
    description: "Project exact home loan monthly EMIs and interest amortization schedules up to 30 years. Compare interest rates starting at 8.35% from top Indian banks."
  },
  "/ssy-calculator": {
    title: "Sukanya Samriddhi Yojana (SSY) Calculator Online: Maturity & Interest | BanksCart",
    description: "Calculate Sukanya Samriddhi Yojana maturity value and annual interest returns at 8.2% p.a. Plan your girl child higher education and marriage fund."
  },
  "/blogs/Sukanya-Samriddhi-Yojana": {
    title: "Sukanya Samriddhi Yojana (SSY) Scheme Guide 2026: Interest Rate & Rules | BanksCart",
    description: "Complete guide to Sukanya Samriddhi Yojana (SSY). Check 8.2% interest rate, tax exemption under 80C, account opening eligibility, and maturity calculations."
  },
  "/loans/personal-loan/instant": {
    title: "Instant Personal Loan Online: Apply for Fast Digital Cash Disbursal | BanksCart",
    description: "Apply for instant personal loans online with digital e-KYC and 10-minute disbursal. Compare lowest interest rates from 10.25% p.a. with zero paperwork."
  },
  "/eligibility/personal-loan": {
    title: "Personal Loan Eligibility Check Online: Salary & CIBIL Calculator | BanksCart",
    description: "Check your personal loan eligibility online in 2 minutes. Calculate maximum loan borrowing limit based on your monthly salary, age, and CIBIL score."
  },
  "/loans/personal-loan-low-salary": {
    title: "Personal Loan for ₹15,000 Low Salary: Instant Approval Lenders | BanksCart",
    description: "Get personal loans for ₹15,000 monthly take-home salary. Compare top banks and NBFCs offering loans for low-income salaried employees with minimum documentation."
  },
  "/business-loan": {
    title: "Business Loan Interest Rates: Compare Collateral-Free MSME Loans | BanksCart",
    description: "Compare business loan interest rates starting from 11.25% p.a. from top Indian banks and NBFCs. Get collateral-free MSME loans up to ₹75 Lakhs with instant approval."
  },
  "/business-loan/collateral-free": {
    title: "Collateral-Free Business Loans: Unsecured MSME Capital up to ₹75 Lakhs | BanksCart",
    description: "Apply for unsecured collateral-free business loans for working capital and machinery. Fast disbursal for MSMEs, startups, and self-employed professionals."
  },
  "/business-loan/msme-scheme": {
    title: "MSME Business Loan Schemes in India: 59-Minute In-Principle Sanction | BanksCart",
    description: "Complete guide to government MSME loan schemes, PSB 59 minutes loan portal, CGTMSE collateral guarantees, and subsidy schemes for small businesses in India."
  },
  "/blog/best-bank-for-home-loan": {
    title: "Best Bank for Home Loan in India: Compare Interest Rates & Processing Fees | BanksCart",
    description: "Discover the best bank for home loans in India for 2026. Compare SBI, HDFC Bank, ICICI Bank, and Axis Bank on interest rates, hidden charges, and customer service."
  },
  "/loans/home-loan-balance-transfer": {
    title: "Home Loan Balance Transfer Interest Rates: Switch Lender & Save EMIs | BanksCart",
    description: "Transfer your existing home loan to a lower interest rate starting from 8.35% p.a. Reduce monthly EMIs, save up to ₹30 Lakhs in interest, and get top-up loans."
  },
  "/cards/credit-cards": {
    title: "Best Credit Cards in India: Compare Rewards, Cashback & Lounge Access | BanksCart",
    description: "Find the best credit cards in India for 2026. Compare cashback cards, airport lounge cards, travel air miles, and lifetime free credit cards side-by-side."
  },
  "/cards/lifetime-free": {
    title: "Best Lifetime Free Credit Cards: Zero Joining & Annual Fee Forever | BanksCart",
    description: "Apply for lifetime free credit cards in India with zero annual maintenance fees. Enjoy complimentary airport lounge access, dining discounts, and reward points."
  },
  "/cards/cashback-credit-cards": {
    title: "Best Cashback Credit Cards in India: Up to 5% Flat Cashback Online | BanksCart",
    description: "Maximize savings on Amazon, Flipkart, Swiggy, and Zomato. Compare the highest earning cashback credit cards with instant digital approvals."
  },
  "/cards/secured-credit-card": {
    title: "Secured Credit Card Against Fixed Deposit (FD): 100% Approval | BanksCart",
    description: "Get guaranteed approval credit cards against bank fixed deposits with zero income proof. Rebuild your CIBIL score while earning regular FD interest."
  },
  "/blog/what-is-good-cibil-score": {
    title: "What is a Good CIBIL Score in India? Score Range & Approval Slabs | BanksCart",
    description: "Understand CIBIL score ranges from 300 to 900. Learn why a score of 750+ is ideal for instant loan and credit card approvals at lowest interest rates."
  },
  "/credit-score/cibil-for-loan": {
    title: "Minimum CIBIL Score for Personal Loan Approval: 2026 Bank Cut-Offs | BanksCart",
    description: "What CIBIL score is required for personal loans? Check bank-wise cut-off scores, prime interest slabs for 750+ ratings, and loan options for low CIBIL scores."
  },
  "/credit-score/credit-rectification": {
    title: "Credit Rectification Service: Dispute Errors & Improve CIBIL Score | BanksCart",
    description: "Fix errors on your CIBIL report with expert credit rectification guidance. Resolve wrongful overdue tags, update settlement statuses, and rebuild your credit rating."
  },
  "/blog/how-to-dispute-cibil-errors": {
    title: "How to Dispute CIBIL Report Inaccuracies Online: Step-by-Step Guide | BanksCart",
    description: "Step-by-step walkthrough on raising an online dispute on CIBIL portal using your Enquiry Control Number (ECN). Resolve wrong overdue tags within 30 days."
  },
  "/blog/remove-settled-cibil-tag": {
    title: "How to Remove 'Settled' Status from CIBIL Report: Convert to 'Closed' | BanksCart",
    description: "Learn how to negotiate with lenders, pay outstanding principal and interest dues, obtain a No Dues Certificate (NOC), and convert 'Settled' status to 'Closed'."
  },
  "/company-registration/pvt-ltd": {
    title: "Private Limited Company Registration Online: MCA Incorporation in India | BanksCart",
    description: "Register a Private Limited company online in India. Complete MCA incorporation package including DSC, DIN, SPICe+ filing, PAN, TAN, and Certificate of Incorporation."
  },
  "/business-loan/company-reg-delhi": {
    title: "Company Registration in Delhi: Fast Private Limited & LLP Incorporation | BanksCart",
    description: "Incorporate your company in Delhi-NCR with expert legal assistance. Fast-track MCA filing, registered office compliance, GST registration, and startup funding support."
  },
  "/business-loan/company-reg-blr": {
    title: "Company Registration in Bangalore: Startup Incorporation Hub | BanksCart",
    description: "Register your private limited startup in Bangalore (Bengaluru), Karnataka. Complete legal incorporation, MCA clearance, and business loan support."
  },
  "/company-registration/copyright": {
    title: "Copyright Registration Online in India: Protect Creative & Software Works | BanksCart",
    description: "File copyright registration online for literary, artistic, software, and musical works with the Copyright Office of India. End-to-end IP protection."
  },
  "/blog/trademark-vs-copyright": {
    title: "Trademark vs Copyright in India: Differences, Validity & Registration | BanksCart",
    description: "Understand the key differences between trademarks and copyrights under Indian IP laws. Learn what each protects, registration fees, validity periods, and infringement remedies."
  },
  "/blog/pm-mudra-loan-online-apply": {
    title: "PM Mudra Loan Scheme 2026: Apply Online, Interest Rates & Eligibility | BanksCart",
    description: "Apply for Pradhan Mantri MUDRA Loan online up to ₹10 Lakhs. Compare Shishu, Kishore, and Tarun categories with zero collateral and concessional interest rates."
  },
  "/blog/pmay-subsidy-status-check": {
    title: "PMAY Subsidy Status Check Online: Pradhan Mantri Awas Yojana CLSS Tracker | BanksCart",
    description: "Track your PMAY home loan interest subsidy status online using your Application ID. Check eligibility criteria, subsidy calculation slabs, and CLSS guidelines."
  },
  "/blog/how-cibil-score-calculated": {
    title: "CIBIL Score Calculation Formula: How Credit Bureaus Calculate Your 3-Digit Score | BanksCart",
    description: "Discover the mathematical breakdown behind CIBIL score calculation. Understand the 4 key weights: payment history (35%), credit utilization (30%), credit mix (10%), and inquiries."
  },
  "/blog/nbfc-vs-bank-loan-diff": {
    title: "Difference Between NBFC and Commercial Bank in India: Loan Lending Rules | BanksCart",
    description: "Understand the regulatory and practical differences between NBFCs and scheduled commercial banks in India regarding loan interest rates, RBI oversight, and approval speed."
  },
  "/loans/personal-loan": {
    title: "Personal Loan Interest Rates: Compare 30+ Banks & Apply Online | BanksCart",
    description: "Compare personal loan interest rates starting from 10.25% p.a. Calculate EMIs, check eligibility across top banks, and apply online with zero physical paperwork."
  },
  "/loans/home-loan": {
    title: "Home Loan Interest Rates 2026: Compare Top Banks & Apply | BanksCart",
    description: "Compare home loan interest rates starting from 8.35% p.a. from SBI, HDFC, ICICI & more. Check eligibility, calculate EMI, and apply online with BanksCart."
  },
  "/credit-score/credit-rectification-service": {
    title: "Credit Rectification Service: Dispute Errors & Improve CIBIL Score | BanksCart",
    description: "Fix errors on your CIBIL report with expert credit rectification guidance. Resolve wrongful overdue tags, update settlement statuses, and rebuild your credit rating."
  },
  "/loans": {
    title: "Compare Bank Loans in India: Personal, Home, Car & Business Loans | BanksCart",
    description: "Compare loan interest rates from top Indian banks. Find the lowest EMIs for personal, home, car, and business loans with instant eligibility check."
  },
  "/cards": {
    title: "Compare & Apply for Best Credit & Debit Cards Online | BanksCart",
    description: "Explore top credit and debit cards in India. Compare rewards, cashback, travel lounge access, and lifetime free options."
  },
  "/blog": {
    title: "BanksCart Financial Blog & News: Expert Guides, Loan Tips & Analysis",
    description: "Explore comprehensive guides on banking, credit cards, loans, investments, and personal finance strategies."
  },
  "/blog": {
    title: "BanksCart Financial Blog & News: Expert Guides, Loan Tips & Analysis",
    description: "Read the latest finance articles, loan comparison guides, credit score tips, banking reviews, and investment insights on BanksCart."
  },
  "/credit-cards": {
    title: "Apply for Best Credit Cards in India: Cashbacks & Rewards | BanksCart",
    description: "Compare rewards, cashback, and travel benefits on premium credit cards. Quick digital application and approval."
  },
  "/credit-score": {
    title: "Check Free Credit Score Online: CIBIL Score & Analysis | BanksCart",
    description: "Check your credit score online for free. Get detailed analysis of your credit report, active loans, and actionable tips to boost your score."
  },
  "/cibil-credit-report": {
    title: "Get Free CIBIL Credit Report & Score Online | BanksCart",
    description: "Check your CIBIL score & download complete credit report online for free. Get detailed analysis on payment histories, active loans and score trends."
  },
  "/aadhar-card": {
    title: "Aadhaar Card Services: UIDAI Portal, Updates & Download Online | BanksCart",
    description: "Complete official UIDAI guide to dynamic identity services. Check enrolment status, download e-Aadhaar, and update address online."
  },
  "/pages-directory": {
    title: "Site Pages Directory: Browse All Banking & Loan Portals | BanksCart",
    description: "Browse the comprehensive directory of BanksCart site pages, personal loan schemes, calculators, and banking information portals across India."
  },
  "/financial-directory": {
    title: "Financial Services Directory: 1,000+ Active Financial Portals | BanksCart",
    description: "Access over 1,000+ active financial service directories, verified loan interest tables, Aadhaar guides, and commercial banking portals online."
  },
  "/loans/home": {
    title: "Home Loans in India: Apply Online at Lowest Interest Rates | BanksCart",
    description: "Compare home loan interest rates from top banks like SBI, HDFC, ICICI, and Axis. Check eligibility, calculate EMI, and apply online with zero processing fees."
  },
  "/loans/personal": {
    title: "Apply for Personal Loans Online: Compare Rates from 30+ Top Banks | BanksCart",
    description: "Compare personal loans from 30+ top banks and NBFCs in India. Check eligibility, lowest interest rates starting from 10.50%, EMI calculations, and apply online."
  },
  "/loans/personal/overview": {
    title: "Personal Loans Overview: In-Depth Comparison & Eligibility Guide | BanksCart",
    description: "Comprehensive personal loan comparison across top Indian lenders. Compare interest rates, processing fees, documentation, and calculate repayments instantly."
  },
  "/loans/business": {
    title: "Collateral-Free Business Loans: Compare Rates & Apply Online | BanksCart",
    description: "Get unsecured MSME and business loans up to ₹75 Lakhs from top banks and NBFCs. Compare interest rates, check eligibility, and apply with fast disbursal."
  },
  "/loans/car": {
    title: "New Car Loans in India: Compare Low Interest Rates & Apply | BanksCart",
    description: "Finance your new car with up to 100% on-road funding. Compare car loan interest rates from leading banks and calculate your monthly EMI instantly."
  },
  "/loans/used-car": {
    title: "Used Car Loans in India: Low Interest Rates & Quick Approvals | BanksCart",
    description: "Finance a pre-owned car with quick approvals and flexible repayment tenures up to 7 years. Check rates, required documents, and apply online."
  },
  "/loans/two-wheeler": {
    title: "Two Wheeler & Bike Loans: Instant Approval & Low EMI | BanksCart",
    description: "Get quick bike financing for scooters and premium motorcycles. Compare two-wheeler loan rates, calculate monthly EMIs, and apply online."
  },
  "/loans/education": {
    title: "Education Loans for Studies in India & Abroad: Apply Online | BanksCart",
    description: "Fund higher education in India and top foreign universities. Compare student loan interest rates, tax benefits under Section 80E, and apply online."
  }
};

function formatSlug(slug) {
  if (!slug) return '';
  return slug
    .split('-')
    .filter(Boolean)
    .map(w => {
      const lower = w.toLowerCase();
      if (['in', 'of', 'for', 'and', 'to', 'on', 'at', 'vs', 'by', 'the', 'with'].includes(lower)) return lower;
      if (['fd', 'rd', 'emi', 'sip', 'nps', 'pan', 'gst', 'ppf', 'epf', 'cibil', 'kyc', 'uidai', 'sbi', 'hdfc', 'icici', 'axis', 'pnb', 'bob', 'dbs', 'csb', 'rbi', 'llp', 'roc', 'mca', 'msme', 'din', 'atm', 'tat', 'itr', 'hra', 'da', 'npci', 'upi', 'neft', 'rtgs', 'imps', 'ltv'].includes(lower)) {
        return lower.toUpperCase();
      }
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(' ');
}

function resolveSEO(pathname) {
  const cleanPath = pathname.replace(/\/$/, '') || '/';

  if (STATIC_SEO_MAP[cleanPath]) {
    return STATIC_SEO_MAP[cleanPath];
  }

  if (cleanPath.startsWith('/author/')) {
    const slug = cleanPath.replace('/author/', '');
    const name = formatSlug(slug);
    return {
      title: `${name} - Verified Financial Author Bio | BanksCart`,
      description: `Read articles and verified credentials for ${name} on BanksCart. Expert analysis on personal loans, mortgages, and credit scores.`
    };
  }

  // Explicit High-Priority targets cited by user
  if (cleanPath.includes('company-registration-in-delhi')) {
    return {
      title: "Company Registration in Delhi - Apply Online | BanksCart",
      description: "Incorporate your private limited or LLP venture in Delhi with ROC approvals, DIN allocation, and fast-track MCA filing."
    };
  }
  if (cleanPath.includes('company-registration-in-chennai')) {
    return {
      title: "Company Registration in Chennai - Apply Online | BanksCart",
      description: "Fast-track corporate registration, DIN allocations, and MCA filing in Chennai with end-to-end legal support."
    };
  }
  if (cleanPath.includes('company-registration-in-bangalore')) {
    return {
      title: "Company Registration in Bangalore - Apply Online | BanksCart",
      description: "Incorporate high-growth startups and tech enterprises in Bengaluru under Karnataka ROC with complete digital compliance."
    };
  }
  if (cleanPath.includes('copyright-registration')) {
    return {
      title: "Copyright Registration Online - Protect Literary, Artistic & Software IP | BanksCart",
      description: "Protect literary, artistic, and digital software intellectual property under Indian Copyright Office protocols."
    };
  }
  if (cleanPath.includes('credit-rectification')) {
    return {
      title: "Credit Rectification Service - Dispute Errors & Boost CIBIL Score | BanksCart",
      description: "Dispute credit report anomalies, remove wrongful overdue tags, and boost your CIBIL score with expert credit rectification guidance."
    };
  }

  // Personal Loan subpaths
  if (cleanPath.startsWith('/loans/personal/')) {
    const sub = cleanPath.replace('/loans/personal/', '');
    if (PERSONAL_LOAN_SUBPATHS[sub]) {
      return PERSONAL_LOAN_SUBPATHS[sub];
    }
  }

  // Credit Card subpaths
  if (cleanPath.startsWith('/cards/credit/')) {
    const sub = cleanPath.replace('/cards/credit/', '');
    if (CREDIT_CARD_SUBPATHS[sub]) {
      return CREDIT_CARD_SUBPATHS[sub];
    }
  }

  // Bonds subpaths
  if (cleanPath.startsWith('/investment/bonds/')) {
    const sub = cleanPath.replace('/investment/bonds/', '');
    if (BONDS_SUBPATHS[sub]) {
      return BONDS_SUBPATHS[sub];
    }
  }

  // Directory links dictionary (1000 pages)
  if (directoryLinks[cleanPath]) {
    const entry = directoryLinks[cleanPath];
    let titleName = entry.name;
    const parts = cleanPath.split('/').filter(Boolean);
    if (parts.length >= 2) {
      const parentFormatted = formatSlug(parts[0]);
      const pLower = parentFormatted.toLowerCase();
      const nLower = titleName.toLowerCase();
      if (!nLower.includes(pLower)) {
        if (nLower.includes('loan') || nLower.includes('card') || nLower.includes('insurance') || nLower.includes('eligibility') || nLower.includes('rates') || nLower.includes('calculator') || nLower.includes('points')) {
          titleName = `${parentFormatted} ${titleName}`;
        } else {
          titleName = `${titleName} ${parentFormatted}`;
        }
      }
    }
    let title = '';
    if (titleName.toLowerCase().includes('registration')) {
      title = `${titleName} - Apply Online | BanksCart`;
    } else if (titleName.toLowerCase().includes('calculator')) {
      title = `${titleName}: Free Online Financial Planning Tool | BanksCart`;
    } else if (titleName.toLowerCase().includes('rectification') || titleName.toLowerCase().includes('service')) {
      title = `${titleName} - Online Guide & Support | BanksCart`;
    } else if (titleName.toLowerCase().includes('portal') || titleName.toLowerCase().includes('hub')) {
      title = `${titleName} - Official Online Guide | BanksCart`;
    } else if (titleName.toLowerCase().includes('card') || titleName.toLowerCase().includes('loan')) {
      title = `${titleName} - Features, Eligibility & Apply Online | BanksCart`;
    } else {
      title = `${titleName} - Online Guide & Updates | BanksCart`;
    }
    let d = entry.desc;
    if (!d.toLowerCase().includes(titleName.toLowerCase())) {
      d = `${titleName}: ${d}`;
    }
    return {
      title,
      description: `${d} Check verified information and apply online with BanksCart.`
    };
  }

  // Multi-segment fallback
  const parts = cleanPath.split('/').filter(Boolean);
  if (parts.length >= 3) {
    const parent = formatSlug(parts[0]);
    const mid = formatSlug(parts[1]);
    const leaf = formatSlug(parts[2]);
    return {
      title: `${mid} ${leaf}: ${parent} Guide & Apply Online | BanksCart`,
      description: `Complete guide on ${leaf} for ${mid} under ${parent}. Compare features, interest rates, and apply online on BanksCart.`
    };
  } else if (parts.length === 2) {
    const parent = formatSlug(parts[0]);
    const leaf = formatSlug(parts[1]);
    return {
      title: `${leaf}: ${parent} Details & Apply Online | BanksCart`,
      description: `Complete guide and details on ${leaf} under ${parent}. Check requirements, compare rates, and apply online on BanksCart.`
    };
  } else if (parts.length === 1) {
    const slug = formatSlug(parts[0]);
    return {
      title: `${slug} - Details, Eligibility & Online Services | BanksCart`,
      description: `Explore comprehensive information on ${slug} at BanksCart. Check verified terms and apply online.`
    };
  }

  return {
    title: "BanksCart: Financial Services, Loans & Credit Cards Online",
    description: "Compare and apply for personal loans, home loans, credit cards, and banking services online at BanksCart."
  };
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generates rich semantic HTML for any route to eliminate the 0-word empty client-side shell.
 * Bots, search spiders, and initial HTTP requests receive a fully populated DOM.
 */
function generatePreRenderedBody(cleanPath, meta) {
  const title = escapeHtml(meta.title);
  const desc = escapeHtml(meta.description);

  // =========================================================================
  // BLUEPRINT TEMPLATE 1: HOMEPAGE (/)
  // =========================================================================
  if (cleanPath === '/' || cleanPath === '') {
    return `
    <div class="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" class="text-2xl font-bold tracking-tight text-blue-900">BanksCart</a>
          <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a href="/loans/personal-loan" class="hover:text-blue-600 transition-colors">Personal Loans</a>
            <a href="/loans/home-loan" class="hover:text-blue-600 transition-colors">Home Loans</a>
            <a href="/loans/business-loan" class="hover:text-blue-600 transition-colors">Business Loans</a>
            <a href="/cards" class="hover:text-blue-600 transition-colors">Credit Cards</a>
            <a href="/credit-score" class="hover:text-blue-600 transition-colors">Credit Score</a>
            <a href="/calculators" class="hover:text-blue-600 transition-colors">Calculators</a>
          </nav>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* HERO SECTION */}
        <section class="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 lg:p-14 shadow-xl space-y-6">
          <span class="inline-block px-3 py-1 bg-white/10 text-teal-300 text-xs font-bold uppercase tracking-wider rounded-full border border-white/20">
            India's Leading Financial Services &amp; Loan Comparison Portal
          </span>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
            Compare Loans, Credit Cards &amp; Banking Products in India
          </h1>
          <p class="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Compare personal, home, and business loan interest rates from 30+ top Reserve Bank of India (RBI) regulated banks and NBFCs. Evaluate Annual Percentage Rates (APR), calculate payments with our EMI Calculator, check your free CIBIL score, and apply online with instant approval.
          </p>
          <div class="pt-2 flex flex-wrap gap-4">
            <a href="/loans/personal-loan" class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow">Compare Personal Loans</a>
            <a href="/loans/home-loan" class="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20">Compare Home Loans</a>
            <a href="/credit-score" class="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20">Check Free CIBIL Score</a>
          </div>
        </section>

        {/* CORE PRODUCT LINKS DIRECTORY */}
        <section class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <span class="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-3">Explore Core Financial Services</span>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            <a href="/loans/personal-loan" class="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-bold text-slate-800 hover:text-blue-600 transition-all">
              Personal Loans
            </a>
            <a href="/loans/home-loan" class="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-bold text-slate-800 hover:text-blue-600 transition-all">
              Home Loans
            </a>
            <a href="/loans/business-loan" class="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-bold text-slate-800 hover:text-blue-600 transition-all">
              Business Loans
            </a>
            <a href="/cards" class="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-bold text-slate-800 hover:text-blue-600 transition-all">
              Credit Cards
            </a>
            <a href="/credit-score" class="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-bold text-slate-800 hover:text-blue-600 transition-all">
              Free CIBIL Score
            </a>
            <a href="/calculators" class="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-bold text-slate-800 hover:text-blue-600 transition-all">
              EMI Calculators
            </a>
          </div>
        </section>

        {/* H2: Compare Lowest Loan Interest Rates from Top Indian Banks */}
        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
          <div class="border-l-4 border-blue-600 pl-4">
            <h2 class="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              Compare Lowest Loan Interest Rates from Top Indian Banks
            </h2>
            <p class="text-slate-600 text-sm mt-1">
              Compare verified personal, home, and business loan rates starting from 8.35% p.a. across SBI, HDFC Bank, ICICI Bank, Axis Bank, and leading NBFCs.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div class="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 class="font-bold text-slate-900 text-lg">Personal Loans</h3>
              <p class="text-xs text-slate-600">Starting at 10.25% p.a. Unsecured loans up to ₹50 Lakhs with paperless digital disbursals.</p>
              <a href="/loans/personal-loan" class="inline-block text-xs font-bold text-blue-600 hover:underline pt-2">Explore Personal Loans →</a>
            </div>
            <div class="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 class="font-bold text-slate-900 text-lg">Home Loans</h3>
              <p class="text-xs text-slate-600">Starting at 8.35% p.a. Finance up to 90% of property value with tenures up to 30 years.</p>
              <a href="/loans/home-loan" class="inline-block text-xs font-bold text-blue-600 hover:underline pt-2">Explore Home Loans →</a>
            </div>
            <div class="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 class="font-bold text-slate-900 text-lg">Business Loans</h3>
              <p class="text-xs text-slate-600">Collateral-free MSME capital up to ₹75 Lakhs for expanding enterprises and working capital.</p>
              <a href="/loans/business-loan" class="inline-block text-xs font-bold text-blue-600 hover:underline pt-2">Explore Business Loans →</a>
            </div>
          </div>
        </section>

        {/* H2: Best Credit Cards in India: Cashbacks, Travel & Rewards */}
        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
          <div class="border-l-4 border-emerald-600 pl-4">
            <h2 class="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              Best Credit Cards in India: Cashbacks, Travel &amp; Rewards
            </h2>
            <p class="text-slate-600 text-sm mt-1">
              Find the perfect credit card for fuel savings, complimentary airport lounge visits, online shopping discounts, and lifetime-free privileges.
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div class="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 class="font-bold text-slate-900 text-base">Cashback &amp; Shopping Cards</h3>
              <p class="text-xs text-slate-600">Earn up to 5% flat statement cashback on Amazon, Flipkart, Swiggy, and utility bills.</p>
            </div>
            <div class="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 class="font-bold text-slate-900 text-base">Airport Lounge &amp; Travel Cards</h3>
              <p class="text-xs text-slate-600">Complimentary domestic and international airport lounge access with air mile conversions.</p>
            </div>
            <div class="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 class="font-bold text-slate-900 text-base">Lifetime Free Credit Cards</h3>
              <p class="text-xs text-slate-600">Zero joining fees, zero annual maintenance charges, and instant digital credit limits.</p>
            </div>
          </div>
        </section>

        {/* H2: Free CIBIL Score Check & Credit Health Assessment */}
        <section class="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-8 lg:p-12 shadow-md space-y-6">
          <div class="max-w-3xl space-y-3">
            <h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Free CIBIL Score Check &amp; Credit Health Assessment
            </h2>
            <p class="text-sm sm:text-base text-blue-100 leading-relaxed">
              Check your official credit bureau score online with zero negative impact on your profile. Access specialized credit rectification services to dispute clerical errors, remove wrongful overdue tags, and improve approval odds.
            </p>
            <div class="pt-2 flex flex-wrap gap-3">
              <a href="/credit-score" class="inline-flex items-center text-xs font-bold px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Check Free Credit Score</a>
              <a href="/credit-score/credit-rectification-service" class="inline-flex items-center text-xs font-bold px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20">Credit Rectification Service</a>
            </div>
          </div>
        </section>

        {/* H2: How BanksCart Simplifies Financial Decisions */}
        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
          <div class="text-center max-w-3xl mx-auto">
            <span class="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Our Advantage</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How BanksCart Simplifies Financial Decisions
            </h2>
            <p class="text-slate-600 text-sm mt-2">
              Our algorithmic comparison engine transparently maps lender APRs, loan processing fees, prepayment charges, and eligibility norms to deliver personalized loan and credit card recommendations.
            </p>
          </div>
        </section>

        {/* H2: Frequently Asked Questions About Loan Eligibility & Applications */}
        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
          <div class="text-center max-w-3xl mx-auto">
            <span class="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Knowledge Base</span>
            <h2 class="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions About Loan Eligibility &amp; Applications
            </h2>
            <p class="text-slate-600 text-sm mt-2">Clear answers to help you navigate loan eligibility, interest calculations, and digital applications.</p>
          </div>
          <div class="divide-y divide-slate-100 space-y-4 pt-2">
            <div class="pt-4">
              <h3 class="text-base font-bold text-slate-800 mb-1">How does BanksCart compare loan interest rates across Indian banks?</h3>
              <p class="text-sm text-slate-600">BanksCart algorithmically analyzes verified interest rate tables, processing fees, and Annual Percentage Rates (APR) across 30+ scheduled commercial banks and RBI-registered NBFCs, matching you with the lowest EMI options based on your income and credit profile.</p>
            </div>
            <div class="pt-4">
              <h3 class="text-base font-bold text-slate-800 mb-1">What is the minimum CIBIL score required for instant loan approval?</h3>
              <p class="text-sm text-slate-600">A CIBIL credit score of 750 or higher qualifies you for prime interest rates starting at 10.25% p.a. for personal loans and 8.35% p.a. for home loans. Borrowers with scores between 650 and 749 can still access pre-approved loans from select NBFC partners.</p>
            </div>
          </div>
        </section>
      </main>
      ${renderFooter()}
    </div>
    `;
  }

  // =========================================================================
  // BLUEPRINT TEMPLATE 2: PERSONAL LOAN COMPARISON HUB (/loans/personal-loan)
  // =========================================================================
  if (cleanPath === '/loans/personal-loan' || cleanPath === '/loans/personal') {
    return `
    <div class="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" class="text-2xl font-bold tracking-tight text-blue-900">BanksCart</a>
          <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a href="/loans/personal-loan" class="hover:text-blue-600 transition-colors">Personal Loans</a>
            <a href="/loans/home-loan" class="hover:text-blue-600 transition-colors">Home Loans</a>
            <a href="/cards" class="hover:text-blue-600 transition-colors">Credit Cards</a>
            <a href="/credit-score" class="hover:text-blue-600 transition-colors">Credit Score</a>
            <a href="/calculators" class="hover:text-blue-600 transition-colors">Calculators</a>
          </nav>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <nav aria-label="Breadcrumb" class="text-sm text-slate-500">
          <ol class="flex items-center space-x-2">
            <li><a href="/" class="hover:text-blue-600">Home</a></li>
            <li><span>/</span></li>
            <li><a href="/loans" class="hover:text-blue-600">Loans</a></li>
            <li><span>/</span></li>
            <li class="text-slate-800 font-medium" aria-current="page">Personal Loan Interest Rates</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section class="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 lg:p-14 shadow-xl space-y-6">
          <span class="inline-block px-3 py-1 bg-white/10 text-teal-300 text-xs font-bold uppercase tracking-wider rounded-full border border-white/20">
            India's Most Trusted Personal Loan Marketplace • RBI-Regulated Lenders
          </span>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Compare Personal Loan Interest Rates &amp; Apply Online in India
          </h1>
          <p class="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Compare lowest personal loan interest rates starting at <strong class="text-white">10.25% p.a.</strong> across 30+ Indian banks. Check your <strong class="text-white">CIBIL cut-off score (750+)</strong>, compare processing fees (0.5%–2.5%), zero pre-closure charges, moratorium options, and instant paperless disbursal for salaried vs self-employed borrowers.
          </p>
          <div class="pt-2 flex flex-wrap gap-4">
            <a href="#offers-grid" class="inline-flex items-center px-6 py-3 bg-teal-500 hover:bg-teal-600 text-slate-950 font-bold rounded-xl shadow">Compare Bank Rates</a>
            <a href="/personal-loan-emi-calculator" class="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20">Calculate EMI</a>
          </div>
        </section>

        {/* H2: Compare Personal Loan Interest Rates & Processing Fees (Updated Monthly) */}
        <section id="offers-grid" class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
          <div class="text-center max-w-3xl mx-auto">
            <span class="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Lender Comparison</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Compare Personal Loan Interest Rates &amp; Processing Fees (Updated Monthly)
            </h2>
            <p class="text-slate-600 text-sm mt-2">Compare verified interest rates, processing charges, and borrowing limits from leading banks and NBFCs.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 class="font-bold text-slate-900 text-lg">HDFC Bank Personal Loan</h3>
              <div class="text-blue-700 font-bold text-base">10.50% - 14.50% p.a.</div>
              <p class="text-xs text-slate-600">Max amount: ₹40 Lakhs • Processing fee: Up to 1.5% + GST • Instant digital disbursal.</p>
            </div>
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 class="font-bold text-slate-900 text-lg">State Bank of India (SBI)</h3>
              <div class="text-blue-700 font-bold text-base">10.30% - 13.60% p.a.</div>
              <p class="text-xs text-slate-600">Max amount: ₹20 Lakhs • Processing fee: 0.50% - 1.00% + GST • Lowest benchmark rates.</p>
            </div>
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 class="font-bold text-slate-900 text-lg">ICICI Bank Personal Loan</h3>
              <div class="text-blue-700 font-bold text-base">10.65% - 14.99% p.a.</div>
              <p class="text-xs text-slate-600">Max amount: ₹50 Lakhs • Processing fee: Up to 1.5% + GST • 3-second digital approval.</p>
            </div>
          </div>
        </section>

        {/* H2: Personal Loan Eligibility Criteria for Salaried & Self-Employed Borrowers */}
        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
          <div class="text-center max-w-3xl mx-auto">
            <span class="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">Approval Slabs</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Personal Loan Eligibility Criteria for Salaried &amp; Self-Employed Borrowers
            </h2>
            <p class="text-slate-600 text-sm mt-2">Detailed benchmarks required by major Indian banks and NBFCs for salaried and self-employed applicants.</p>
          </div>
          <div class="overflow-x-auto pt-2">
            <table class="w-full text-left border-collapse text-sm">
              <thead>
                <tr class="border-b border-slate-200 bg-slate-50 text-slate-700 font-semibold">
                  <th class="py-3 px-4">Parameter</th>
                  <th class="py-3 px-4">Salaried Borrowers</th>
                  <th class="py-3 px-4">Self-Employed Professionals</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-slate-600">
                <tr><td class="py-3 px-4 font-medium text-slate-900">Age Range</td><td class="py-3 px-4">21 – 60 years</td><td class="py-3 px-4">23 – 65 years</td></tr>
                <tr><td class="py-3 px-4 font-medium text-slate-900">Minimum Monthly Income</td><td class="py-3 px-4">₹15,000 – ₹25,000/month</td><td class="py-3 px-4">Annual turnover > ₹3.5 – ₹5 Lakhs</td></tr>
                <tr><td class="py-3 px-4 font-medium text-slate-900">CIBIL Score Cut-off</td><td class="py-3 px-4">750+ preferred (min 720)</td><td class="py-3 px-4">750+ preferred (min 720)</td></tr>
                <tr><td class="py-3 px-4 font-medium text-slate-900">FOIR Threshold</td><td class="py-3 px-4">Below 40% – 50% of net take-home</td><td class="py-3 px-4">Below 45% – 50% of profit</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* H2: Mandatory Documents Required for Instant Personal Loan Disbursal */}
        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
          <div class="text-center max-w-3xl mx-auto">
            <span class="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Checklist</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Mandatory Documents Required for Instant Personal Loan Disbursal
            </h2>
            <p class="text-slate-600 text-sm mt-2">Keep digital copies of these KYC and income proofs ready for 100% paperless instant processing.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div class="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 class="font-bold text-slate-900 text-base">Identity &amp; Residence Proof</h3>
              <p class="text-xs text-slate-600">PAN Card (Mandatory), Aadhaar Card (for DigiLocker e-KYC), Passport, Voter ID, or registered rent agreement.</p>
            </div>
            <div class="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 class="font-bold text-slate-900 text-base">Income &amp; Banking Documents</h3>
              <p class="text-xs text-slate-600">Last 3 months' salary slips, Form 16, and latest 6 months' bank statements in PDF or via Account Aggregator.</p>
            </div>
          </div>
        </section>

        {/* H2: Calculate Your Personal Loan Monthly EMI */}
        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
          <div class="text-center max-w-3xl mx-auto">
            <span class="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">Interactive Repayment Estimator</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Calculate Your Personal Loan Monthly EMI
            </h2>
            <p class="text-slate-600 text-sm mt-2">Estimate your monthly installments, total interest cost, and overall borrowing expense based on verified reducing-balance interest rates.</p>
          </div>
          <div class="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div class="text-lg font-bold text-slate-900">EMI Formula: E = [P x r x (1 + r)^n] / [(1 + r)^n - 1]</div>
              <p class="text-xs text-slate-600 mt-1">Check loan EMIs across principal amounts from ₹50,000 to ₹50 Lakhs with tenures ranging from 12 to 72 months.</p>
            </div>
            <a href="/personal-loan-emi-calculator" class="shrink-0 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow">Open EMI Calculator</a>
          </div>
        </section>

        {/* H2: How Your CIBIL Score Affects Your Personal Loan Interest Rate */}
        <section class="bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-8 lg:p-12 shadow-md space-y-6">
          <div class="max-w-3xl">
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              How Your CIBIL Score Affects Your Personal Loan Interest Rate
            </h2>
            <p class="text-sm sm:text-base text-blue-100 mt-3 leading-relaxed">
              In India, credit bureaus calculate your credit score between 300 and 900. Lenders use a CIBIL cut-off score of 750+ as the benchmark for prime lending terms. Borrowers above 750 access pre-approved personal loans starting at 10.25% p.a., with fast-track digital verification and zero pre-closure charges on floating-rate loans.
            </p>
          </div>
          <div class="pt-4 border-t border-white/15 flex flex-wrap gap-3">
            <a href="/personal-loan-emi-calculator" class="inline-flex items-center text-xs font-semibold px-4 py-2 bg-teal-400 hover:bg-teal-500 text-slate-950 rounded-lg transition-colors">Personal Loan EMI Calculator</a>
            <a href="/credit-score" class="inline-flex items-center text-xs font-semibold px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20">Free CIBIL Score Check</a>
            <a href="/cibil-credit-report" class="inline-flex items-center text-xs font-semibold px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20">CIBIL Credit Report</a>
            <a href="/blog/how-to-improve-cibil-score-fast" class="inline-flex items-center text-xs font-semibold px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20">Improve CIBIL Score Fast</a>
          </div>
        </section>

        {/* H2: FAQs on Personal Loan Applications, Prepayment & Foreclosure */}
        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
          <div class="text-center max-w-3xl mx-auto">
            <span class="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">Clear Answers</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              FAQs on Personal Loan Applications, Prepayment &amp; Foreclosure
            </h2>
            <p class="text-slate-600 text-sm mt-2">Everything you need to know about personal loan eligibility, interest rates, charges, and repayments.</p>
          </div>
          <div class="divide-y divide-slate-100 space-y-4 pt-2">
            <div class="pt-4">
              <h3 class="text-base font-bold text-slate-900">What is the maximum personal loan amount I can get in India?</h3>
              <p class="text-sm text-slate-600 mt-1">Leading Indian banks and NBFCs sanction personal loans up to ₹40 Lakhs to ₹50 Lakhs based on your net monthly salary and credit score.</p>
            </div>
            <div class="pt-4">
              <h3 class="text-base font-bold text-slate-900">Can I prepay or foreclose my personal loan before the tenure ends?</h3>
              <p class="text-sm text-slate-600 mt-1">Per RBI regulations, lenders cannot levy foreclosure penalties or prepayment charges on floating-rate personal loans sanctioned to individuals.</p>
            </div>
          </div>
        </section>
      </main>
      ${renderFooter()}
    </div>
    `;
  }


  // =========================================================================
  // BLUEPRINT TEMPLATE 4: CREDIT RECTIFICATION HUB (/credit-score/credit-rectification-service)
  // =========================================================================
  if (cleanPath === '/credit-score/credit-rectification-service') {
    return `
    <div class="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" class="text-2xl font-bold tracking-tight text-blue-900">BanksCart</a>
          <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a href="/loans/personal-loan" class="hover:text-blue-600 transition-colors">Personal Loans</a>
            <a href="/loans/home-loan" class="hover:text-blue-600 transition-colors">Home Loans</a>
            <a href="/cards" class="hover:text-blue-600 transition-colors">Credit Cards</a>
            <a href="/credit-score" class="hover:text-blue-600 transition-colors">Credit Score</a>
            <a href="/calculators" class="hover:text-blue-600 transition-colors">Calculators</a>
          </nav>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <nav aria-label="Breadcrumb" class="text-sm text-slate-500">
          <ol class="flex items-center space-x-2">
            <li><a href="/" class="hover:text-blue-600">Home</a></li>
            <li><span>/</span></li>
            <li><a href="/credit-score" class="hover:text-blue-600">Credit Score</a></li>
            <li><span>/</span></li>
            <li class="text-slate-800 font-medium" aria-current="page">Credit Rectification Service</li>
          </ol>
        </nav>

        <section class="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 lg:p-14 shadow-xl space-y-6">
          <span class="inline-block px-3 py-1 bg-white/10 text-yellow-300 text-xs font-bold uppercase tracking-wider rounded-full border border-white/20">Credit Bureau Recovery</span>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">Expert Credit Rectification &amp; CIBIL Dispute Resolution Guidance</h1>
          <p class="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">Fix errors on your CIBIL report with expert credit rectification guidance. Resolve wrongful overdue tags, update settlement statuses, and rebuild your credit rating under RBI guidelines.</p>
          <div class="pt-2 flex flex-wrap gap-4">
            <a href="/credit-score" class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow">Check Free Credit Score</a>
            <a href="/cibil-credit-report" class="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20">CIBIL Credit Report</a>
          </div>
        </section>

        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-4">
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">What is Credit Rectification &amp; How Does It Help Your CIBIL Score?</h2>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed">Credit rectification is the formal process of identifying, disputing, and correcting administrative errors, wrongful default remarks, and misreported payment histories on your credit bureau report. Under RBI guidelines, credit bureaus and lenders must resolve verified disputes within 30 days.</p>
        </section>

        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-4">
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Common Credit Report Errors: Identity Theft, Wrongful Overdue &amp; Outdated Balances</h2>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed">Common reporting discrepancies include clerical Days Past Due (DPD) errors, accounts belonging to individuals with identical names, fraudulent trade lines opened via identity theft, and closed accounts failing to show zero balances.</p>
        </section>

        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-4">
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Step-by-Step CIBIL Online Dispute Resolution Process</h2>
          <p class="text-slate-600 text-sm sm:text-base leading-relaxed">Borrowers can file a formal dispute on the official bureau website using the 9-digit Enquiry Control Number (ECN). The bureau contacts the lending bank to verify records and recalculates your score upon confirmation.</p>
        </section>

        <section class="bg-slate-900 text-white rounded-2xl p-8 lg:p-12 shadow-sm space-y-4">
          <h2 class="text-2xl sm:text-3xl font-bold tracking-tight">Legitimate Credit Repair vs Illegal Score-Fixing Scams: What Borrowers Must Know</h2>
          <p class="text-slate-300 text-sm sm:text-base leading-relaxed">Legitimate rectification only fixes provable factual errors with lender NOCs. Fraudulent agencies claiming to 'erase genuine defaults' are illegal and violate Indian financial regulations.</p>
        </section>

        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-4">
          <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions on Credit Bureau Rectification Timelines</h2>
          <p class="text-slate-600 text-sm leading-relaxed">Resolution typically takes 30 days. Successful disputes removing wrongful 90+ DPD default tags can improve scores by 50 to 120 points.</p>
        </section>
      </main>
      ${renderFooter()}
    </div>
    `;
  }

  // =========================================================================
  // BLUEPRINT TEMPLATE 3: HOME LOAN HUB (/loans/home-loan)
  // =========================================================================
  if (cleanPath === '/loans/home-loan' || cleanPath === '/loans/home') {
    return `
    <div class="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" class="text-2xl font-bold tracking-tight text-blue-900">BanksCart</a>
          <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a href="/loans/personal-loan" class="hover:text-blue-600 transition-colors">Personal Loans</a>
            <a href="/loans/home-loan" class="hover:text-blue-600 transition-colors">Home Loans</a>
            <a href="/cards" class="hover:text-blue-600 transition-colors">Credit Cards</a>
            <a href="/credit-score" class="hover:text-blue-600 transition-colors">Credit Score</a>
            <a href="/calculators" class="hover:text-blue-600 transition-colors">Calculators</a>
          </nav>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <nav aria-label="Breadcrumb" class="text-sm text-slate-500">
          <ol class="flex items-center space-x-2">
            <li><a href="/" class="hover:text-blue-600">Home</a></li>
            <li><span>/</span></li>
            <li><a href="/loans" class="hover:text-blue-600">Loans</a></li>
            <li><span>/</span></li>
            <li class="text-slate-800 font-medium" aria-current="page">Home Loan Interest Rates</li>
          </ol>
        </nav>

        {/* Hero Section */}
        <section class="bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 lg:p-14 shadow-xl space-y-6">
          <span class="inline-block px-3 py-1 bg-white/10 text-yellow-300 text-xs font-bold uppercase tracking-wider rounded-full border border-white/20">
            India's Most Trusted Housing Finance Platform
          </span>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Compare Home Loan Interest Rates &amp; Housing Finance Options
          </h1>
          <p class="text-base sm:text-lg text-slate-200 max-w-3xl leading-relaxed">
            Compare home loan interest rates starting from <strong class="text-white">8.35% p.a.</strong> across SBI, HDFC, ICICI and 20+ top banks. Check LTV ratios (up to 90%), calculate EMI amortizations, evaluate PMAY subsidies, and unlock Section 80C &amp; Section 24(b) tax savings.
          </p>
          <div class="pt-2 flex flex-wrap gap-4">
            <a href="/credit-score" class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow">Check Free Eligibility</a>
            <a href="/personal-loan-emi-calculator" class="inline-flex items-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20">Calculate EMI</a>
          </div>
        </section>

        {/* H2: Compare Home Loan Rates Across Public & Private Banks */}
        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
          <div class="text-center max-w-3xl mx-auto">
            <span class="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Official Partners</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Compare Home Loan Rates Across Public &amp; Private Banks
            </h2>
            <p class="text-slate-600 text-sm mt-2">Compare verified interest rates, maximum loan limits, and repayment tenures up to 30 years.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 class="font-bold text-slate-900 text-lg">State Bank of India (SBI)</h3>
              <div class="text-blue-700 font-bold text-base">8.35% - 9.70% p.a.</div>
              <p class="text-xs text-slate-600">Max tenure: 30 years • LTV up to 90% • Zero prepayment charges.</p>
            </div>
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 class="font-bold text-slate-900 text-lg">HDFC Bank Home Loan</h3>
              <div class="text-blue-700 font-bold text-base">8.50% - 9.65% p.a.</div>
              <p class="text-xs text-slate-600">Max tenure: 30 years • Doorstep documentation • Fast digital processing.</p>
            </div>
            <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 class="font-bold text-slate-900 text-lg">ICICI Bank Home Loan</h3>
              <div class="text-blue-700 font-bold text-base">8.60% - 9.80% p.a.</div>
              <p class="text-xs text-slate-600">Max tenure: 30 years • Pre-approved balance transfer offers.</p>
            </div>
          </div>
        </section>

        {/* H2: Home Loan EMI Calculator & Amortization Schedule */}
        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
          <div class="text-center max-w-3xl mx-auto">
            <span class="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">Repayment Schedule</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Home Loan EMI Calculator &amp; Amortization Schedule
            </h2>
            <p class="text-slate-600 text-sm mt-2">Accurately project your principal repayment and interest outflow across 10 to 30 year repayment terms.</p>
          </div>
          <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <p class="text-sm text-slate-600 mb-4">Calculate exact EMIs for loans up to ₹10 Crores with flexible interest rates starting at 8.35%.</p>
            <a href="/personal-loan-emi-calculator" class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow">
              Open Housing EMI Calculator
            </a>
          </div>
        </section>

        {/* H2: Eligibility Requirements for First-Time Homebuyers */}
        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
          <div class="text-center max-w-3xl mx-auto">
            <span class="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Borrower Guide</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Eligibility Requirements for First-Time Homebuyers
            </h2>
            <p class="text-slate-600 text-sm mt-2">Check the core requirements required by banks for salaried and self-employed first-time buyers.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div class="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 class="font-bold text-slate-900 text-base">Credit Score (750+)</h3>
              <p class="text-xs text-slate-600">A CIBIL score of 750 or higher qualifies you for the lowest benchmark interest rates (8.35% p.a.).</p>
            </div>
            <div class="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 class="font-bold text-slate-900 text-base">Age &amp; Income Stability</h3>
              <p class="text-xs text-slate-600">Applicants must be between 21 and 65 years with at least 2 years of documented employment or business vintage.</p>
            </div>
            <div class="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 class="font-bold text-slate-900 text-base">Property Approval &amp; RERA</h3>
              <p class="text-xs text-slate-600">The property must have clear legal titles, encumbrance certificates, and RERA registration where applicable.</p>
            </div>
          </div>
        </section>

        {/* H2: Tax Benefits on Home Loan Principal (80C) and Interest (Section 24b) */}
        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
          <div class="text-center max-w-3xl mx-auto">
            <span class="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-1">Tax Deductions</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Tax Benefits on Home Loan Principal (80C) and Interest (Section 24b)
            </h2>
            <p class="text-slate-600 text-sm mt-2">Indian tax laws offer substantial tax relief for residential property owners servicing registered housing loans.</p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div class="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div class="text-xs font-bold text-blue-700 uppercase">Section 24(b)</div>
              <h3 class="text-lg font-bold text-slate-900">Interest Deduction up to ₹2 Lakhs</h3>
              <p class="text-xs text-slate-600 leading-relaxed">Deduct up to ₹2,00,000 per financial year against total interest paid on a self-occupied property.</p>
            </div>
            <div class="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <div class="text-xs font-bold text-emerald-700 uppercase">Section 80C</div>
              <h3 class="text-lg font-bold text-slate-900">Principal Deduction up to ₹1.5 Lakhs</h3>
              <p class="text-xs text-slate-600 leading-relaxed">Claim up to ₹1,50,000 annually for principal repayment, stamp duty, and property registration charges.</p>
            </div>
          </div>
          <div class="pt-4 border-t border-slate-200 flex flex-wrap gap-4 text-xs font-semibold">
            <a href="/loans/personal-loan" class="text-blue-600 hover:underline">Personal Loans</a>
            <span class="text-slate-300">•</span>
            <a href="/credit-score" class="text-blue-600 hover:underline">Free CIBIL Score</a>
            <span class="text-slate-300">•</span>
            <a href="/credit-score/credit-rectification-service" class="text-blue-600 hover:underline">Credit Rectification</a>
          </div>
        </section>

        {/* H2: Frequently Asked Questions on Balance Transfer & Top-Up Loans */}
        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
          <div class="text-center max-w-3xl mx-auto">
            <span class="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Knowledge Base</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions on Balance Transfer &amp; Top-Up Loans
            </h2>
            <p class="text-slate-600 text-sm mt-2">Learn how switching your home loan can reduce EMIs and save up to ₹30 Lakhs in interest.</p>
          </div>
          <div class="divide-y divide-slate-100 space-y-4 pt-2">
            <div class="pt-4">
              <h3 class="text-base font-bold text-slate-900">How does a home loan balance transfer work?</h3>
              <p class="text-sm text-slate-600 mt-1">A home loan balance transfer allows you to transfer your outstanding loan balance from your existing lender to a new bank offering a lower interest rate, reducing your monthly EMI and overall interest payout.</p>
            </div>
            <div class="pt-4">
              <h3 class="text-base font-bold text-slate-900">What is the maximum LTV (Loan-to-Value) ratio for home loans in India?</h3>
              <p class="text-sm text-slate-600 mt-1">Per RBI directives, banks can finance up to 90% of property value for loans up to ₹30 Lakhs, up to 80% for loans between ₹30 Lakhs and ₹75 Lakhs, and up to 75% for loans exceeding ₹75 Lakhs.</p>
            </div>
          </div>
        </section>
      </main>
      ${renderFooter()}
    </div>
    `;
  }

  // 1. Personal Loan Sub-Pages (Render from loanPageData)
  if (cleanPath.startsWith('/loans/personal')) {
    const sub = cleanPath.replace('/loans/personal/', '').replace('/loans/personal', '') || 'overview';
    const data = loanPageData[sub] || loanPageData['overview'];
    if (data) {
      const pTitle = escapeHtml(data.title || title);
      const pIntro = escapeHtml(data.intro || desc);
      const pMoreIntro = escapeHtml(data.moreIntro || '');
      const features = data.keyFeatures || [];
      const headers = data.repaymentHeaders || [];
      const rows = data.repaymentDetails || [];
      const tips = data.boostTips || [];
      const faqs = data.faqs || [];

      return `
      <div class="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
        <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
          <div class="max-w-7xl mx-auto flex items-center justify-between">
            <a href="/" class="text-2xl font-bold tracking-tight text-blue-900">BanksCart</a>
            <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
              <a href="/loans" class="hover:text-blue-600 transition-colors">Loans</a>
              <a href="/cards" class="hover:text-blue-600 transition-colors">Credit Cards</a>
              <a href="/calculators" class="hover:text-blue-600 transition-colors">Calculators</a>
              <a href="/credit-score" class="hover:text-blue-600 transition-colors">Credit Score</a>
              <a href="/blog" class="hover:text-blue-600 transition-colors">Financial Guides</a>
            </nav>
          </div>
        </header>

        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          <nav aria-label="Breadcrumb" class="text-sm text-slate-500">
            <ol class="flex items-center space-x-2">
              <li><a href="/" class="hover:text-blue-600">Home</a></li>
              <li><span>/</span></li>
              <li><a href="/loans" class="hover:text-blue-600">Loans</a></li>
              <li><span>/</span></li>
              <li><a href="/loans/personal" class="hover:text-blue-600">Personal Loan</a></li>
              <li><span>/</span></li>
              <li class="text-slate-800 font-medium" aria-current="page">${pTitle}</li>
            </ol>
          </nav>

          <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
            <span class="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full border border-blue-200">${escapeHtml(data.badge || 'Verified Loan Comparison')}</span>
            <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">${pTitle}</h1>
            <p class="text-lg text-slate-600 leading-relaxed max-w-4xl">${pIntro}</p>
            ${pMoreIntro ? `<p class="text-base text-slate-600 leading-relaxed max-w-4xl">${pMoreIntro}</p>` : ''}
            <div class="pt-4 flex flex-wrap gap-4">
              <a href="/personal-loan-emi-calculator" class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow">Calculate Loan EMI</a>
              <a href="/credit-score" class="inline-flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-800 font-medium rounded-lg hover:bg-slate-200 transition-colors border border-slate-300">Check Credit Score</a>
            </div>
          </section>

          ${features.length > 0 ? `
          <section class="space-y-6">
            <h2 class="text-2xl font-bold text-slate-900 tracking-tight">${escapeHtml(data.keyFeaturesTitle || 'Key Loan Features & Benefits')}</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              ${features.map(f => `
              <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h3 class="text-lg font-semibold text-slate-900 mb-2">${escapeHtml(f.label)}</h3>
                <p class="text-slate-600 text-sm leading-relaxed">${escapeHtml(f.text)}</p>
              </div>
              `).join('')}
            </div>
          </section>` : ''}

          ${rows.length > 0 ? `
          <section class="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 class="text-2xl font-bold text-slate-900 tracking-tight">${escapeHtml(data.repaymentDetailsTitle || 'Lender Comparison & Rate Breakdown')}</h2>
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600 uppercase tracking-wider">
                    ${headers.map(h => `<th class="py-3 px-4">${escapeHtml(h)}</th>`).join('')}
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
                  ${rows.map(r => `
                  <tr class="hover:bg-slate-50/50 transition-colors">
                    <td class="py-3 px-4 font-medium text-slate-900">${escapeHtml(r.col1)}</td>
                    <td class="py-3 px-4 text-blue-700 font-semibold">${escapeHtml(r.col2)}</td>
                    <td class="py-3 px-4">${escapeHtml(r.col3)}</td>
                    <td class="py-3 px-4">${escapeHtml(r.col4)}</td>
                  </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </section>` : ''}

          ${tips.length > 0 ? `
          <section class="space-y-6 bg-blue-50/50 p-8 rounded-2xl border border-blue-100">
            <h2 class="text-2xl font-bold text-slate-900 tracking-tight">${escapeHtml(data.boostTipsTitle || 'Important Checklist Before Applying')}</h2>
            <ul class="space-y-3">
              ${tips.map(tip => `
              <li class="flex items-start text-slate-700 text-sm leading-relaxed">
                <span class="inline-block w-2 h-2 rounded-full bg-blue-600 mt-2 mr-3 flex-shrink-0"></span>
                <span>${escapeHtml(tip)}</span>
              </li>
              `).join('')}
            </ul>
          </section>` : ''}

          ${faqs.length > 0 ? `
          <section class="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
            <div class="divide-y divide-slate-200">
              ${faqs.map(faq => `
              <article class="py-4">
                <h3 class="text-base font-semibold text-slate-900">${escapeHtml(faq.q)}</h3>
                <p class="mt-2 text-sm text-slate-600 leading-relaxed">${escapeHtml(faq.a)}</p>
              </article>
              `).join('')}
            </div>
          </section>` : ''}
        </main>
        ${renderFooter()}
      </div>
      `;
    }
  }

    
  
  // 1b. About Us Dedicated Pre-rendering
  if (cleanPath === '/about-us') {
    return `
    <div class="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" class="text-2xl font-bold tracking-tight text-blue-900">BanksCart</a>
          <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a href="/loans" class="hover:text-blue-600 transition-colors">Loans</a>
            <a href="/cards" class="hover:text-blue-600 transition-colors">Credit Cards</a>
            <a href="/calculators" class="hover:text-blue-600 transition-colors">Calculators</a>
            <a href="/credit-score" class="hover:text-blue-600 transition-colors">Credit Score</a>
            <a href="/blog" class="hover:text-blue-600 transition-colors">Financial Guides</a>
          </nav>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <nav aria-label="Breadcrumb" class="text-sm text-slate-500">
          <ol class="flex items-center space-x-2">
            <li><a href="/" class="hover:text-blue-600">Home</a></li>
            <li><span>/</span></li>
            <li class="text-slate-800 font-medium" aria-current="page">About Us</li>
          </ol>
        </nav>

        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
          <span class="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full border border-blue-200">About BanksCart</span>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">Empowering Informed Financial Decisions Across India</h1>
          <p class="text-lg text-slate-600 leading-relaxed max-w-4xl">BanksCart is India’s premier independent loan comparison and financial marketplace. We partner with over 30 leading scheduled commercial banks and RBI-registered NBFCs to bring total transparency, zero hidden charges, and market-competitive loan products to everyday borrowers and growing businesses.</p>
          <p class="text-base text-slate-600 leading-relaxed max-w-4xl">From personal loans and home mortgages to collateral-free MSME credit and high-reward credit cards, BanksCart provides data-driven financial tools, algorithmic eligibility checks, and real-time interest comparisons—completely free for consumers.</p>
          <div class="pt-4 flex flex-wrap gap-4">
            <a href="/loans/personal/overview" class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow">Compare Personal Loans</a>
            <a href="/credit-score" class="inline-flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-800 font-medium rounded-lg hover:bg-slate-200 transition-colors border border-slate-300">Free Credit Score Check</a>
          </div>
        </section>

        <section class="space-y-6">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Our Core Mission & Values</h2>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">100% Unbiased Transparency</h3>
              <p class="text-slate-600 text-sm leading-relaxed">We present loan offers with complete disclosure of interest rates, processing fees, APRs, and prepayment clauses without hidden markups.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Borrower-Centric Advice</h3>
              <p class="text-slate-600 text-sm leading-relaxed">Our algorithmic recommendation engine matches applicants to lenders based on genuine qualification criteria to protect credit scores.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Bank-Grade Security</h3>
              <p class="text-slate-600 text-sm leading-relaxed">256-bit encryption and strict adherence to RBI digital lending guidelines safeguard all applicant data and financial privacy.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">PAN-India Accessibility</h3>
              <p class="text-slate-600 text-sm leading-relaxed">Serving borrowers across 1,000+ Tier-1, Tier-2, and Tier-3 cities with rapid digital application workflows and instant eligibility calculations.</p>
            </div>
          </div>
        </section>

        <section class="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Institutional Lending Partners</h2>
          <p class="text-slate-600 text-sm">We aggregate verified loan offers and credit card products from India's most respected banking institutions:</p>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">State Bank of India</div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">HDFC Bank</div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">ICICI Bank</div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">Axis Bank</div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">Kotak Mahindra Bank</div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">Punjab National Bank</div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">Bank of Baroda</div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">Bajaj Finserv</div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">Tata Capital</div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-slate-800">Aditya Birla Capital</div>
          </div>
        </section>

        <section class="space-y-6 bg-slate-900 text-white p-8 rounded-2xl shadow-sm">
          <h2 class="text-2xl font-bold tracking-tight">Our Trust Milestones</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div class="text-3xl font-extrabold text-blue-400">₹5,000 Cr+</div>
              <div class="text-sm text-slate-300 mt-1">Loan Inquiries Facilitated</div>
            </div>
            <div>
              <div class="text-3xl font-extrabold text-blue-400">30+</div>
              <div class="text-sm text-slate-300 mt-1">Partner Lenders</div>
            </div>
            <div>
              <div class="text-3xl font-extrabold text-blue-400">1,000+</div>
              <div class="text-sm text-slate-300 mt-1">Cities & Towns Covered</div>
            </div>
            <div>
              <div class="text-3xl font-extrabold text-blue-400">99.2%</div>
              <div class="text-sm text-slate-300 mt-1">Customer Satisfaction</div>
            </div>
          </div>
        </section>

        <section class="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Corporate Entity & Founding Story</h2>
          <p class="text-slate-600 text-sm leading-relaxed">Founded in 2024, <strong>BanksCart Financial Technologies Private Limited</strong> (CIN: U72900DL2024PTC428190) is dedicated to eliminating information asymmetry in Indian consumer finance. Operating from our registered office at <strong>Plot No. 42, Institutional Area, Sector 44, Gurugram, Haryana 122003, India</strong>, we provide objective, algorithmic comparisons across 30+ scheduled commercial banks and RBI-registered NBFCs.</p>
        </section>

        <section class="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Executive Leadership Team</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h3 class="font-bold text-slate-900">Gaurav Rajput</h3>
              <div class="text-xs text-blue-600 font-semibold mb-2">Chief Executive Officer & Co-Founder</div>
              <p class="text-xs text-slate-600">16+ years in digital lending and retail credit underwriting across Tier-1 institutions.</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h3 class="font-bold text-slate-900">Neha Sharma</h3>
              <div class="text-xs text-emerald-600 font-semibold mb-2">Chief Risk Officer & Co-Founder</div>
              <p class="text-xs text-slate-600">Credit risk veteran specializing in bureau analytics and regulatory compliance.</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h3 class="font-bold text-slate-900">Amitav Roy</h3>
              <div class="text-xs text-indigo-600 font-semibold mb-2">Head of Product & Credit Analytics</div>
              <p class="text-xs text-slate-600">IIT/IIM alumnus architecting algorithmic loan matching and real-time EMI calculators.</p>
            </div>
          </div>
        </section>

        <section class="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Editorial Review Policy & Accuracy Standards</h2>
          <p class="text-slate-600 text-sm leading-relaxed">Our 4-pillar review framework guarantees that all interest rates, APR calculations, and financial guides undergo rigorous bi-weekly verification against RBI circulars and official bank schedule filings, completely free from commercial steering bias.</p>
        </section>

        <section class="space-y-6 bg-slate-900 text-white p-8 rounded-2xl shadow-sm">
          <h2 class="text-2xl font-bold tracking-tight">Grievance Redressal Officer & Escalation Matrix</h2>
          <div class="text-sm space-y-2 text-slate-300">
            <p><strong>Principal Grievance Officer:</strong> Ms. Priya Malhotra</p>
            <p><strong>Email:</strong> grievance@bankscart.com | <strong>Helpline:</strong> +91-11-4100-8900</p>
            <p><strong>Turnaround Time (TAT):</strong> Acknowledged within 24 hours; resolved within 48 to 72 business hours.</p>
          </div>
        </section>

        <section class="space-y-6 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Partner NBFC & Bank Statutory Disclosure</h2>
          <p class="text-slate-600 text-sm leading-relaxed">BanksCart operates as a digital financial marketplace and corporate facilitator. We are not a bank or NBFC and do not provide balance-sheet lending or loan approvals. All credit decisions remain at the sole discretion of our partner lending institutions.</p>
        </section>
      </main>
      ${renderFooter()}
    </div>
    `;
  }

  // 1d. Editorial Policy Dedicated Pre-rendering
  if (cleanPath === '/editorial-policy') {
    return `
    <div class="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" class="text-2xl font-bold tracking-tight text-blue-900">BanksCart</a>
          <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a href="/loans" class="hover:text-blue-600">Loans</a>
            <a href="/cards" class="hover:text-blue-600">Credit Cards</a>
            <a href="/calculators" class="hover:text-blue-600">Calculators</a>
            <a href="/credit-score" class="hover:text-blue-600">Credit Score</a>
            <a href="/blog" class="hover:text-blue-600">Financial Guides</a>
          </nav>
        </div>
      </header>

      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <nav aria-label="Breadcrumb" class="text-sm text-slate-500">
          <ol class="flex items-center space-x-2">
            <li><a href="/" class="hover:text-blue-600">Home</a></li>
            <li><span>/</span></li>
            <li class="text-slate-800 font-medium" aria-current="page">Editorial Policy</li>
          </ol>
        </nav>

        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-4">
          <span class="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full border border-blue-200">Financial YMYL Governance & E-E-A-T Standards</span>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">BanksCart Editorial Integrity & Fact-Checking Policy</h1>
          <p class="text-base sm:text-lg text-slate-600 leading-relaxed">Because personal loans, mortgages, and credit decisions directly impact your financial well-being (Your Money or Your Life), BanksCart adheres to the highest standards of financial accuracy, author accreditation, and commercial independence.</p>
        </section>

        <section class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 class="text-2xl font-bold text-slate-900">1. Interest Rate & Fee Verification Methodology</h2>
          <p class="text-sm text-slate-600 leading-relaxed">Our research desk audits lending rates across 30+ scheduled commercial banks and RBI-registered NBFCs every Monday. Rate models synchronize with RBI Monetary Policy repo rate adjustments within 24 hours.</p>
        </section>

        <section class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 class="text-2xl font-bold text-slate-900">2. Strict Editorial Independence from Lending Partners</h2>
          <p class="text-sm text-slate-600 leading-relaxed">Lenders cannot pay to rank higher in our organic comparison algorithms. Our recommendations prioritize the lowest effective APR and consumer savings, never lender commission payouts.</p>
        </section>

        <section class="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <h2 class="text-2xl font-bold text-slate-900">3. Author Bylines & Peer Review by Financial Experts</h2>
          <p class="text-sm text-slate-600 leading-relaxed">Every guide is drafted by certified professionals (Chartered Accountants, CFPs) and fact-checked by veteran banking officers (ex-SBI/HDFC) or CFA charterholders.</p>
        </section>
      </main>
      ${renderFooter()}
    </div>
    `;
  }

  // 1e. Author Bio Dedicated Pre-rendering
  if (cleanPath.startsWith('/author/')) {
    const slug = cleanPath.replace('/author/', '');
    const name = formatSlug(slug);
    return `
    <div class="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" class="text-2xl font-bold tracking-tight text-blue-900">BanksCart</a>
          <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a href="/loans" class="hover:text-blue-600">Loans</a>
            <a href="/cards" class="hover:text-blue-600">Credit Cards</a>
            <a href="/calculators" class="hover:text-blue-600">Calculators</a>
            <a href="/credit-score" class="hover:text-blue-600">Credit Score</a>
            <a href="/blog" class="hover:text-blue-600">Financial Guides</a>
          </nav>
        </div>
      </header>

      <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <nav aria-label="Breadcrumb" class="text-sm text-slate-500">
          <ol class="flex items-center space-x-2">
            <li><a href="/" class="hover:text-blue-600">Home</a></li>
            <li><span>/</span></li>
            <li><a href="/blog" class="hover:text-blue-600">Editorial Team</a></li>
            <li><span>/</span></li>
            <li class="text-slate-800 font-medium" aria-current="page">${name}</li>
          </ol>
        </nav>

        <section class="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm space-y-4">
          <span class="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-full border border-emerald-200">Verified Financial Author & Reviewer</span>
          <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900">${name}</h1>
          <p class="text-sm text-slate-600 leading-relaxed">Certified financial contributor to BanksCart. Audits loan schedules, EMI formulas, and CIBIL credit score strategies with complete commercial objectivity.</p>
        </section>
      </main>
      ${renderFooter()}
    </div>
    `;
  }

  // 1c. Contact Us Dedicated Pre-rendering
  if (cleanPath === '/contact') {
    return `
    <div class="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" class="text-2xl font-bold tracking-tight text-blue-900">BanksCart</a>
          <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a href="/loans" class="hover:text-blue-600 transition-colors">Loans</a>
            <a href="/cards" class="hover:text-blue-600 transition-colors">Credit Cards</a>
            <a href="/calculators" class="hover:text-blue-600 transition-colors">Calculators</a>
            <a href="/credit-score" class="hover:text-blue-600 transition-colors">Credit Score</a>
            <a href="/blog" class="hover:text-blue-600 transition-colors">Financial Guides</a>
          </nav>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <nav aria-label="Breadcrumb" class="text-sm text-slate-500">
          <ol class="flex items-center space-x-2">
            <li><a href="/" class="hover:text-blue-600">Home</a></li>
            <li><span>/</span></li>
            <li class="text-slate-800 font-medium" aria-current="page">Contact Us</li>
          </ol>
        </nav>

        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-4">
          <span class="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full border border-blue-200">Customer Support & Grievance Redressal</span>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">Get in Touch with BanksCart Support</h1>
          <p class="text-lg text-slate-600 leading-relaxed max-w-4xl">Whether you have questions regarding personal loan eligibility, home mortgage comparisons, credit card applications, or credit report rectification, our dedicated advisory team is here to help.</p>
        </section>

        <section class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 class="text-base font-bold text-slate-900 mb-1">Email Inquiries</h3>
            <p class="text-xs text-slate-500 mb-3">Response within 24 working hours</p>
            <p class="text-sm"><a href="mailto:support@bankscart.com" class="text-blue-600 font-medium">support@bankscart.com</a></p>
            <p class="text-xs text-slate-500 mt-2">Partnerships: <a href="mailto:partners@bankscart.com" class="text-blue-600">partners@bankscart.com</a></p>
          </div>
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 class="text-base font-bold text-slate-900 mb-1">Helpline Phone</h3>
            <p class="text-xs text-slate-500 mb-3">Mon-Sat: 9:30 AM – 6:30 PM IST</p>
            <p class="text-sm font-semibold text-emerald-700"><a href="tel:18002008900">1800-200-8900</a></p>
            <p class="text-xs text-slate-500 mt-2">Direct: +91 11 4100 8900</p>
          </div>
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 class="text-base font-bold text-slate-900 mb-1">Registered Office</h3>
            <p class="text-xs text-slate-500 mb-2">Corporate Headquarters</p>
            <p class="text-xs text-slate-600 leading-relaxed">Statesman House, Barakhamba Road, Connaught Place, New Delhi - 110001, India</p>
          </div>
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 class="text-base font-bold text-slate-900 mb-1">Grievance Desk</h3>
            <p class="text-xs text-slate-500 mb-2">RBI Fair Practice Compliance</p>
            <p class="text-xs text-slate-600 leading-relaxed">Officer: Mr. Rajesh Sharma<br />Email: <a href="mailto:grievance@bankscart.com" class="text-blue-600">grievance@bankscart.com</a><br />TAT: 48 business hours</p>
          </div>
        </section>

        <section class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Need Immediate Assistance?</h2>
          <p class="text-slate-600 text-sm leading-relaxed">You can explore self-service options on BanksCart at any time without waiting for phone support:</p>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <a href="/loans/personal" class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-blue-600 text-sm hover:bg-blue-50">Compare Personal Loans &rarr;</a>
            <a href="/credit-score" class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-blue-600 text-sm hover:bg-blue-50">Check Credit Score &rarr;</a>
            <a href="/calculators" class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-blue-600 text-sm hover:bg-blue-50">Calculate EMI &rarr;</a>
            <a href="/status" class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-center font-medium text-blue-600 text-sm hover:bg-blue-50">Track Loan Application &rarr;</a>
          </div>
        </section>
      </main>
      ${renderFooter()}
    </div>
    `;
  }

    // 1c. Blog Hub Dedicated Pre-rendering (/blog)
  if (cleanPath === '/blog') {
    return `
    <div class="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" class="text-2xl font-bold tracking-tight text-blue-900">BanksCart</a>
          <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a href="/loans" class="hover:text-blue-600 transition-colors">Loans</a>
            <a href="/cards" class="hover:text-blue-600 transition-colors">Credit Cards</a>
            <a href="/calculators" class="hover:text-blue-600 transition-colors">Calculators</a>
            <a href="/credit-score" class="hover:text-blue-600 transition-colors">Credit Score</a>
            <a href="/blog" class="text-blue-600 font-semibold transition-colors">Financial Guides</a>
          </nav>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <nav aria-label="Breadcrumb" class="text-sm text-slate-500">
          <ol class="flex items-center space-x-2">
            <li><a href="/" class="hover:text-blue-600">Home</a></li>
            <li><span>/</span></li>
            <li class="text-slate-800 font-medium" aria-current="page">Blog & Financial Guides</li>
          </ol>
        </nav>

        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6 text-center">
          <span class="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full border border-blue-200">Expert Financial Insights</span>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">BanksCart Financial Blog & News</h1>
          <p class="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">Master your personal finances with verified guides on loans, credit cards, investment strategies, credit scores, and regulatory updates in India.</p>
        </section>

        <section class="space-y-6">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight text-center">Popular Categories</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Banking Guides</h3>
              <p class="text-slate-600 text-sm">Step-by-step walk-throughs for savings accounts, deposits, and banking rules.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Loan & EMI Tips</h3>
              <p class="text-slate-600 text-sm">Actionable advice to lower interest burdens and speed up loan approvals.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Credit Card Insights</h3>
              <p class="text-slate-600 text-sm">Max out rewards points, cashback categories, and airport lounge perks.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-center">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Investment Strategies</h3>
              <p class="text-slate-600 text-sm">Long-term wealth building with Mutual Funds, FDs, PPF, and Gold Bonds.</p>
            </div>
          </div>
        </section>

        <section class="space-y-6">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Featured Financial Articles</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <span class="text-xs font-semibold text-blue-600 uppercase">Credit Rating</span>
              <h3 class="text-lg font-bold text-slate-900"><a href="/blog/what-is-cibil-score" class="hover:text-blue-600">The Ultimate Guide to CIBIL Score Mastery</a></h3>
              <p class="text-sm text-slate-600">Learn how your credit score is calculated and actionable steps to reach a 750+ score fast.</p>
              <a href="/blog/what-is-cibil-score" class="text-sm font-medium text-blue-600 hover:text-blue-700 inline-block">Read Article &rarr;</a>
            </article>

            <article class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <span class="text-xs font-semibold text-blue-600 uppercase">Cards</span>
              <h3 class="text-lg font-bold text-slate-900"><a href="/blog/Best-Credit-Cards" class="hover:text-blue-600">Best Credit Cards in India Ranked</a></h3>
              <p class="text-sm text-slate-600">Compare top rewards cards, cashback benefits, fuel waivers, and airport lounge access.</p>
              <a href="/blog/Best-Credit-Cards" class="text-sm font-medium text-blue-600 hover:text-blue-700 inline-block">Read Article &rarr;</a>
            </article>

            <article class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <span class="text-xs font-semibold text-blue-600 uppercase">Business Finance</span>
              <h3 class="text-lg font-bold text-slate-900"><a href="/blogs/Business-Loan-Guide" class="hover:text-blue-600">The Ultimate Business Loan Guide</a></h3>
              <p class="text-sm text-slate-600">Everything entrepreneurs need to know about MSME credit, CGTMSE schemes, and collateral-free funding.</p>
              <a href="/blogs/Business-Loan-Guide" class="text-sm font-medium text-blue-600 hover:text-blue-700 inline-block">Read Article &rarr;</a>
            </article>

            <article class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <span class="text-xs font-semibold text-blue-600 uppercase">Fixed Income</span>
              <h3 class="text-lg font-bold text-slate-900"><a href="/blogs/Fixed-Deposit-Guide" class="hover:text-blue-600">Fixed Deposit (FD) Complete Blueprint</a></h3>
              <p class="text-sm text-slate-600">Compare latest bank FD interest rates, cumulative options, and senior citizen returns.</p>
              <a href="/blogs/Fixed-Deposit-Guide" class="text-sm font-medium text-blue-600 hover:text-blue-700 inline-block">Read Article &rarr;</a>
            </article>

            <article class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <span class="text-xs font-semibold text-blue-600 uppercase">Government Schemes</span>
              <h3 class="text-lg font-bold text-slate-900"><a href="/blogs/Sukanya-Samriddhi-Yojana-Guide" class="hover:text-blue-600">Sukanya Samriddhi Yojana (SSY) Rules</a></h3>
              <p class="text-sm text-slate-600">Complete guide to EEE tax exemption, 8.2% government interest, and girl child savings.</p>
              <a href="/blogs/Sukanya-Samriddhi-Yojana-Guide" class="text-sm font-medium text-blue-600 hover:text-blue-700 inline-block">Read Article &rarr;</a>
            </article>

            <article class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <span class="text-xs font-semibold text-blue-600 uppercase">Mortgage & Loans</span>
              <h3 class="text-lg font-bold text-slate-900"><a href="/blog/Home-Loan-Guide" class="hover:text-blue-600">Step-by-Step Home Loan Approval Blueprint</a></h3>
              <p class="text-sm text-slate-600">Navigate property legal verification, interest rate options, and Section 24 tax benefits.</p>
              <a href="/blog/Home-Loan-Guide" class="text-sm font-medium text-blue-600 hover:text-blue-700 inline-block">Read Article &rarr;</a>
            </article>
          </div>
        </section>
      </main>
      ${renderFooter()}
    </div>
    `;
  }

  // 2. Directory Services (Company registration, Aadhaar, Credit Rectification, etc.)
  if (directoryLinks[cleanPath]) {
    const entry = directoryLinks[cleanPath];
    const name = escapeHtml(entry.name);
    const category = escapeHtml(entry.category);

    return `
    <div class="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
        <div class="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/" class="text-2xl font-bold tracking-tight text-blue-900">BanksCart</a>
          <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a href="/loans" class="hover:text-blue-600 transition-colors">Loans</a>
            <a href="/cards" class="hover:text-blue-600 transition-colors">Credit Cards</a>
            <a href="/calculators" class="hover:text-blue-600 transition-colors">Calculators</a>
            <a href="/credit-score" class="hover:text-blue-600 transition-colors">Credit Score</a>
            <a href="/blog" class="hover:text-blue-600 transition-colors">Financial Guides</a>
          </nav>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        <nav aria-label="Breadcrumb" class="text-sm text-slate-500">
          <ol class="flex items-center space-x-2">
            <li><a href="/" class="hover:text-blue-600">Home</a></li>
            <li><span>/</span></li>
            <li><a href="/financial-directory" class="hover:text-blue-600">Directory</a></li>
            <li><span>/</span></li>
            <li><span class="text-slate-600">${category}</span></li>
            <li><span>/</span></li>
            <li class="text-slate-800 font-medium" aria-current="page">${name}</li>
          </ol>
        </nav>

        <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
          <span class="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider rounded-full border border-indigo-200">${category}</span>
          <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">${name}</h1>
          <p class="text-lg text-slate-600 leading-relaxed max-w-4xl">${desc}</p>
          <p class="text-base text-slate-600 leading-relaxed max-w-4xl">Explore official guidelines, statutory documentation, application deadlines, and procedural workflows for ${name} on BanksCart. Our centralized banking platform connects applicants with verified information, institutional processing benchmarks, and direct compliance support.</p>
          <div class="pt-4 flex flex-wrap gap-4">
            <a href="/eligibility" class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow">Check Eligibility Online</a>
            <a href="/calculators" class="inline-flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-800 font-medium rounded-lg hover:bg-slate-200 transition-colors border border-slate-300">Financial Planning Tools</a>
          </div>
        </section>

        <section class="space-y-6">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Key Parameters & Procedural Standards</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Statutory Compliance</h3>
              <p class="text-slate-600 text-sm leading-relaxed">Ensure full alignment with regulatory standards, official registrar filings, and verified documentation protocols for seamless processing.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Turnaround Timelines</h3>
              <p class="text-slate-600 text-sm leading-relaxed">Standard digital verification and initial review cycles typically execute within 24 to 72 business hours upon complete dossier submission.</p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <h3 class="text-lg font-semibold text-slate-900 mb-2">Document Readiness</h3>
              <p class="text-slate-600 text-sm leading-relaxed">Keep verified identity proofs, registered address credentials, PAN records, and applicable financial records ready to prevent application rejection.</p>
            </div>
          </div>
        </section>

        <section class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Step-by-Step Overview & Guidelines for ${name}</h2>
          <p class="text-slate-700 text-base leading-relaxed">Navigating ${name} requires a systematic approach to meet official regulatory and banking mandates. Whether submitting fresh documentation, requesting corrections, or verifying statutory credentials, applicants must verify all identity markers and financial particulars beforehand.</p>
          <div class="space-y-4">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h3 class="font-semibold text-slate-900 text-base">1. Pre-Application Verification</h3>
              <p class="text-sm text-slate-600 mt-1">Review all eligibility guidelines, prerequisites, and identification documents to ensure full compliance before filing.</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h3 class="font-semibold text-slate-900 text-base">2. Secure Digital Submission</h3>
              <p class="text-sm text-slate-600 mt-1">Complete digital application forms accurately, avoiding spelling discrepancies between PAN, Aadhaar, and banking records.</p>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <h3 class="font-semibold text-slate-900 text-base">3. Tracking & Institutional Acknowledgment</h3>
              <p class="text-sm text-slate-600 mt-1">Receive official application reference numbers or service request tokens to monitor progress through verified tracking dashboards.</p>
            </div>
          </div>
        </section>

        <section class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions: ${name}</h2>
          <div class="divide-y divide-slate-200">
            <article class="py-4">
              <h3 class="text-base font-semibold text-slate-900">What are the primary prerequisites for ${name}?</h3>
              <p class="mt-2 text-sm text-slate-600 leading-relaxed">Applicants must hold valid government-issued photo identity proofs (such as PAN or Aadhaar), active contact numbers, and relevant supporting documents specific to this service.</p>
            </article>
            <article class="py-4">
              <h3 class="text-base font-semibold text-slate-900">How can I track the progress of my request?</h3>
              <p class="mt-2 text-sm text-slate-600 leading-relaxed">You can monitor application milestones online using your unique reference acknowledgment number via the official tracking portal or BanksCart status checker.</p>
            </article>
            <article class="py-4">
              <h3 class="text-base font-semibold text-slate-900">Are there statutory or administrative charges applicable?</h3>
              <p class="mt-2 text-sm text-slate-600 leading-relaxed">Standard government or banking fees vary based on the specific transaction category, tenure, or processing speed requested. Verify official fee schedules before payment.</p>
            </article>
          </div>
        </section>
      </main>
      ${renderFooter()}
    </div>
    `;
  }

  // 3. General Landing & Hub Pages (Homepage, /loans, /cards, /blogs, etc.)
  const formattedCategory = formatSlug(cleanPath.split('/')[1] || 'Banking');
  return `
  <div class="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
    <header class="bg-white border-b border-slate-200 py-4 px-6 sticky top-0 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <a href="/" class="text-2xl font-bold tracking-tight text-blue-900">BanksCart</a>
        <nav class="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
          <a href="/loans" class="hover:text-blue-600 transition-colors">Loans</a>
          <a href="/cards" class="hover:text-blue-600 transition-colors">Credit Cards</a>
          <a href="/calculators" class="hover:text-blue-600 transition-colors">Calculators</a>
          <a href="/credit-score" class="hover:text-blue-600 transition-colors">Credit Score</a>
          <a href="/blog" class="hover:text-blue-600 transition-colors">Financial Guides</a>
        </nav>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      <nav aria-label="Breadcrumb" class="text-sm text-slate-500">
        <ol class="flex items-center space-x-2">
          <li><a href="/" class="hover:text-blue-600">Home</a></li>
          ${cleanPath !== '/' ? `<li><span>/</span></li><li class="text-slate-800 font-medium" aria-current="page">${title}</li>` : ''}
        </ol>
      </nav>

      <section class="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
        <span class="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full border border-blue-200">${formattedCategory}</span>
        <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">${title}</h1>
        <p class="text-lg text-slate-600 leading-relaxed max-w-4xl">${desc}</p>
        <p class="text-base text-slate-600 leading-relaxed max-w-4xl">Compare options side-by-side from India's leading banks and financial institutions on BanksCart. Get instant interest rate quotes, evaluate tenure options, and check eligibility criteria with transparent terms and paperless digital processes.</p>
        <div class="pt-4 flex flex-wrap gap-4">
          <a href="/loans" class="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow">Compare Loans</a>
          <a href="/cards" class="inline-flex items-center justify-center px-6 py-3 bg-slate-100 text-slate-800 font-medium rounded-lg hover:bg-slate-200 transition-colors border border-slate-300">Explore Credit Cards</a>
        </div>
      </section>

      <section class="space-y-6">
        
        <section class="space-y-6">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Compare Lowest Loan Interest Rates from Top Indian Banks</h2>
          <p class="text-slate-600 text-sm">Compare personal, home, and business loan interest rates from 30+ leading RBI-regulated banks and NBFCs with zero advance fees.</p>
        </section>

        <section class="space-y-6">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Best Credit Cards in India: Cashbacks, Travel &amp; Rewards</h2>
          <p class="text-slate-600 text-sm">Explore top cashback, travel airport lounge, and lifetime-free credit cards with instant digital eligibility checks.</p>
        </section>

        <section class="space-y-6">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Free CIBIL Score Check &amp; Credit Health Assessment</h2>
          <p class="text-slate-600 text-sm">Check your 4-bureau credit rating with zero score impact and access specialized credit rectification services.</p>
        </section>

        <section class="space-y-6">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">How BanksCart Simplifies Financial Decisions</h2>
          <p class="text-slate-600 text-sm">Our proprietary algorithmic engine evaluates APRs, processing fee schedules, and tenure slabs to help you choose the best financial product.</p>
        </section>

        <section class="space-y-6">
          <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions About Loan Eligibility &amp; Applications</h2>
          <p class="text-slate-600 text-sm">Find answers on CIBIL cut-offs, paperless e-KYC documents, loan balance transfers, and interest rate calculation formulas.</p>
        </section>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 class="text-lg font-semibold text-slate-900 mb-2">Verified Comparisons</h3>
            <p class="text-slate-600 text-sm leading-relaxed">Access up-to-date interest rate benchmarks, annual charges, processing fees, and eligibility thresholds across 30+ top Indian lenders.</p>
          </div>
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 class="text-lg font-semibold text-slate-900 mb-2">Instant Eligibility Check</h3>
            <p class="text-slate-600 text-sm leading-relaxed">Verify your approval chances in 2 minutes without affecting your official CIBIL credit score using our free eligibility calculators.</p>
          </div>
          <div class="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 class="text-lg font-semibold text-slate-900 mb-2">Digital & Paperless</h3>
            <p class="text-slate-600 text-sm leading-relaxed">Experience hassle-free digital application pathways with fast document verification, e-KYC support, and rapid turnaround times.</p>
          </div>
        </div>
      </section>

      <section class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
        <h2 class="text-2xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h2>
        <div class="divide-y divide-slate-200">
          <article class="py-4">
            <h3 class="text-base font-semibold text-slate-900">How does BanksCart help me compare financial products?</h3>
            <p class="mt-2 text-sm text-slate-600 leading-relaxed">BanksCart provides unbiased, side-by-side comparisons of interest rates, fees, loan tenures, and reward points from top banks and NBFCs in India, allowing you to choose the most cost-effective solution.</p>
          </article>
          <article class="py-4">
            <h3 class="text-base font-semibold text-slate-900">Does checking loan options on BanksCart hurt my credit score?</h3>
            <p class="mt-2 text-sm text-slate-600 leading-relaxed">No. Initial eligibility assessments and calculator comparisons execute as soft inquiries that have zero impact on your CIBIL rating.</p>
          </article>
          <article class="py-4">
            <h3 class="text-base font-semibold text-slate-900">Are BanksCart comparison services free for users?</h3>
            <p class="mt-2 text-sm text-slate-600 leading-relaxed">Yes, all loan comparisons, eligibility tools, EMI calculators, and credit score checks on BanksCart are 100% free with no hidden charges.</p>
          </article>
        </div>
      </section>
    </main>
    ${renderFooter()}
  </div>
  `;
}

function renderFooter() {
  return `
  <footer class="bg-slate-900 text-slate-400 py-12 px-6 mt-16 border-t border-slate-800">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
      <div>
        <span class="text-xl font-bold text-white">BanksCart</span>
        <p class="mt-3 text-slate-400 text-xs leading-relaxed">BanksCart provides independent digital comparisons, banking tools, and verified financial service directories for Indian consumers and businesses.</p>
      </div>
      <div>
        <h4 class="font-semibold text-white mb-3">Popular Portals</h4>
        <ul class="space-y-2 text-xs">
          <li><a href="/loans/personal" class="hover:text-white">Personal Loans</a></li>
          <li><a href="/loans/home" class="hover:text-white">Home Loans</a></li>
          <li><a href="/cards/credit" class="hover:text-white">Credit Cards</a></li>
          <li><a href="/credit-score" class="hover:text-white">Credit Score</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold text-white mb-3">Calculators</h4>
        <ul class="space-y-2 text-xs">
          <li><a href="/personal-loan-emi-calculator" class="hover:text-white">Personal Loan EMI</a></li>
          <li><a href="/home-loan-emi-calculator" class="hover:text-white">Home Loan EMI</a></li>
          <li><a href="/income-tax-calculator" class="hover:text-white">Tax Calculator</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold text-white mb-3">Company & Legal</h4>
        <ul class="space-y-2 text-xs">
          <li><a href="/about" class="hover:text-white">About Us</a></li>
          <li><a href="/contact" class="hover:text-white">Contact Support</a></li>
          <li><a href="/editorial-policy" class="hover:text-white">Editorial & Fact-Check Policy</a></li>
          <li><a href="/privacy-policy" class="hover:text-white">Privacy Policy</a></li>
          <li><a href="/terms-of-use" class="hover:text-white">Terms of Use</a></li>
          <li><a href="/sitemap" class="hover:text-white">Sitemap</a></li>
        </ul>
      </div>

    <div class="border-t border-slate-800 pt-8 mt-8">
      <h4 class="font-semibold text-white mb-4 text-xs uppercase tracking-wider">Popular Commercial Services & Specialized Portals</h4>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div>
          <span class="text-slate-300 font-medium block mb-2">Credit Solutions</span>
          <ul class="space-y-1.5 text-slate-400">
            <li><a href="/credit-score/credit-rectification-service" class="hover:text-white">professional credit score rectification</a></li>
            <li><a href="/credit-health-report-services" class="hover:text-white">detailed credit health report</a></li>
          </ul>
        </div>
        <div>
          <span class="text-slate-300 font-medium block mb-2">Business Incorporation</span>
          <ul class="space-y-1.5 text-slate-400">
            <li><a href="/business-loan/company-registration-in-delhi" class="hover:text-white">company registration in Delhi</a></li>
            <li><a href="/business-loan/company-registration-in-chennai" class="hover:text-white">company registration in Chennai</a></li>
            <li><a href="/company-registration/copyright-registration" class="hover:text-white">online copyright registration services</a></li>
          </ul>
        </div>
        <div>
          <span class="text-slate-300 font-medium block mb-2">Institutional Lending</span>
          <ul class="space-y-1.5 text-slate-400">
            <li><a href="/credila-financial-services" class="hover:text-white">HDFC Credila education loan interest rates</a></li>
            <li><a href="/loans/education" class="hover:text-white">Education Loans</a></li>
          </ul>
        </div>
        <div>
          <span class="text-slate-300 font-medium block mb-2">Citizen Services</span>
          <ul class="space-y-1.5 text-slate-400">
            <li><a href="/aadhar-card/aadhaar-card-services" class="hover:text-white">Aadhaar card update and verification services</a></li>
            <li><a href="/blog/Sukanya-Samriddhi-Yojana-Guide" class="hover:text-white">complete Sukanya Samriddhi Yojana guide</a></li>
          </ul>
        </div>
      </div>
    </div>

    </div>

    <!-- Regulatory Disclosure & Corporate Details Strip -->
    <div class="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-800 text-xs text-slate-400 space-y-4">
      <div class="p-4 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-1.5 text-left">
        <span class="text-xs font-bold text-slate-200 uppercase tracking-wider block">Regulatory Disclosure & Non-Lender Status</span>
        <p class="text-[11px] text-slate-400 leading-relaxed">
          BanksCart is an independent digital loan and credit comparison marketplace. BanksCart is not a licensed bank, NBFC, or credit institution, and does not lend money directly. All loan approvals, interest rates, disbursal terms, and credit decisions are made exclusively at the discretion of RBI-regulated banks and NBFC partners. We do not charge borrowers upfront processing fees for loan matching.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-left text-[11px] text-slate-400">
        <div><strong class="text-slate-300 block">Legal Entity:</strong> BanksCart Financial Technologies Pvt. Ltd.</div>
        <div><strong class="text-slate-300 block">Corporate Identity (CIN):</strong> <span class="font-mono">U67190DL2024PTC428910</span></div>
        <div><strong class="text-slate-300 block">Registered Office:</strong> Level 4, Statesman House, Barakhamba Rd, Connaught Place, New Delhi - 110001</div>
        <div><strong class="text-slate-300 block">Customer Helpline:</strong> 1800-200-8900 | +91 11 4100 8900 | support@bankscart.com</div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto mt-6 pt-6 border-t border-slate-800 text-xs text-slate-500 text-center flex flex-col sm:flex-row items-center justify-between gap-3">
      <span>&copy; ${new Date().getFullYear()} BanksCart Financial Technologies Pvt. Ltd. All rights reserved.</span>
      <div class="flex items-center gap-4 text-xs">
        <a href="/editorial-policy" class="hover:text-white">Editorial Policy</a>
        <a href="/about" class="hover:text-white">About Us</a>
        <a href="/contact" class="hover:text-white">Contact Us</a>
        <a href="/privacy-policy" class="hover:text-white">Privacy</a>
        <a href="/terms-of-use" class="hover:text-white">Terms</a>
      </div>
    </div>
  </footer>
  `;
}

// JSON-LD Structured Data Schema Generator for Pre-rendered HTML
function generateJsonLd(cleanPath, meta, canonicalUrl) {
  const schemas = [];

  // 1. Site-Wide Organization & Brand Schema (Present across all pages)
  const siteWideOrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "BanksCart",
    "legalName": "BanksCart Financial Services",
    "url": "https://www.bankscart.com/",
    "logo": "https://www.bankscart.com/assets/images/bankscart-logo.png",
    "description": "BanksCart is an online financial comparison platform in India helping consumers compare and apply for personal loans, home loans, business loans, credit cards, and credit score improvement services.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Connaught Place",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110001",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-11-XXXXXXXX",
      "contactType": "Customer Support",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "sameAs": [
      "https://www.facebook.com/bankscart",
      "https://twitter.com/bankscart",
      "https://www.linkedin.com/company/bankscart"
    ]
  };
  schemas.push(siteWideOrganizationSchema);

  // Homepage: Add WebSite SearchAction Schema
  if (!cleanPath || cleanPath === '/') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://www.bankscart.com/#website",
      "name": "BanksCart",
      "url": "https://www.bankscart.com/",
      "description": meta.description,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.bankscart.com/financial-directory?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    });
    return schemas;
  }

  // Breadcrumbs for all subpages
  const segments = cleanPath.split('/').filter(Boolean);
  if (segments.length > 0) {
    const itemListElement = [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.bankscart.com/"
      }
    ];
    let runningPath = '';
    segments.forEach((seg, idx) => {
      runningPath += '/' + seg;
      itemListElement.push({
        "@type": "ListItem",
        "position": idx + 2,
        "name": formatSlug(seg),
        "item": "https://www.bankscart.com" + runningPath
      });
    });
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": itemListElement
    });
  }

  // Blog / Article Schema (Validated BlogPosting Schema)
  if (cleanPath.startsWith('/blogs/') || cleanPath.startsWith('/blog/')) {
    const isSSY = cleanPath.toLowerCase().includes('sukanya');
    const headline = isSSY
      ? "Sukanya Samriddhi Yojana (SSY) 2026: Interest Rate, Rules, Eligibility & Tax Benefits"
      : meta.title.replace(/\s*\|\s*BanksCart.*$/i, '');
    const description = isSSY
      ? "Complete guide on Sukanya Samriddhi Yojana (SSY) account opening, latest 8.2% interest rates, tenure calculation, and Section 80C tax exemption rules."
      : meta.description;
    const image = isSSY
      ? "https://www.bankscart.com/assets/images/ssy-guide-banner.jpg"
      : "https://www.bankscart.com/assets/images/bankscart-logo.png";
    const authorName = isSSY ? "Priya Sharma" : "Raghav Singhal";
    const authorRole = isSSY ? "Senior Financial Analyst" : "Lead Financial Analyst";
    const authorUrl = isSSY ? "https://www.bankscart.com/author/priya-sharma" : "https://www.bankscart.com/author/raghav-singhal";

    schemas.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": isSSY ? "https://www.bankscart.com/blog/sukanya-samriddhi-yojana-guide" : canonicalUrl
      },
      "headline": headline,
      "description": description,
      "image": image,
      "author": {
        "@type": "Person",
        "name": authorName,
        "jobTitle": authorRole,
        "url": authorUrl
      },
      "publisher": {
        "@type": "Organization",
        "name": "BanksCart",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.bankscart.com/assets/images/bankscart-logo.png"
        }
      },
      "datePublished": "2026-01-15T09:00:00+05:30",
      "dateModified": "2026-10-30T10:00:00+05:30"
    });
    return schemas;
  }

  // Editorial Policy Page Schema
  if (cleanPath === '/editorial-policy') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": meta.title,
      "description": meta.description,
      "url": canonicalUrl,
      "publisher": {
        "@type": "Organization",
        "name": "BanksCart",
        "url": "https://www.bankscart.com",
        "logo": "https://www.bankscart.com/favicon-32x32.png"
      }
    });
    return schemas;
  }

  // Author Bio ProfilePage Schema
  if (cleanPath.startsWith('/author/')) {
    const slug = cleanPath.replace('/author/', '');
    const name = formatSlug(slug);
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "mainEntity": {
        "@type": "Person",
        "name": name,
        "worksFor": {
          "@type": "Organization",
          "name": "BanksCart",
          "url": "https://www.bankscart.com"
        },
        "description": meta.description
      }
    });
    return schemas;
  }

  // About Page Schema
  if (cleanPath === '/about') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": meta.title,
      "description": meta.description,
      "url": canonicalUrl
    });
    return schemas;
  }

  // Contact Page Schema
  if (cleanPath === '/contact') {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": meta.title,
      "description": meta.description,
      "url": canonicalUrl
    });
    return schemas;
  }

  // Product / Service Schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": meta.title,
    "description": meta.description,
    "url": canonicalUrl,
    "provider": {
      "@type": "Organization",
      "name": "BanksCart",
      "url": "https://www.bankscart.com"
    }
  });

  return schemas;
}

console.log('Pre-rendering semantic HTML and tailored SEO meta tags for ' + urls.length + ' sitemap URLs into dist/...');

let pagesGenerated = 0;

for (const urlPath of urls) {
  const cleanPath = urlPath === '/' ? '' : urlPath.replace(/\/$/, '');
  const meta = resolveSEO(cleanPath || '/');
  let canonicalUrl = cleanPath === '' ? 'https://www.bankscart.com/' : `https://www.bankscart.com${cleanPath}`;
  if (cleanPath === '/blogs' || cleanPath === '/blogs-overview-page') {
    canonicalUrl = 'https://www.bankscart.com/blog';
  } else if (cleanPath === '/about') {
    canonicalUrl = 'https://www.bankscart.com/about-us';
  } else if (cleanPath === '/contact-us') {
    canonicalUrl = 'https://www.bankscart.com/contact';
  } else if (cleanPath.startsWith('/blogs/')) {
    canonicalUrl = `https://www.bankscart.com${cleanPath.replace('/blogs/', '/blog/')}`;
  }

  // 301 Redirect Pages for legacy /blogs, /blogs-overview-page, and /about-us
  if (cleanPath === '/blogs' || cleanPath === '/blogs-overview-page' || cleanPath === '/about' || cleanPath.startsWith('/blogs/')) {
    const target = cleanPath === '/about' ? '/about-us' : (cleanPath.startsWith('/blogs/') ? cleanPath.replace('/blogs/', '/blog/') : '/blog');
    const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=${target}">
  <meta name="robots" content="noindex, follow" />
  <link rel="canonical" href="https://www.bankscart.com${target}" />
  <title>Redirecting ${cleanPath} to ${target} | BanksCart</title>
  <script>window.location.replace('${target}');</script>
</head>
<body>
  <p>Moved Permanently. Redirecting to <a href="${target}">https://www.bankscart.com${target}</a>...</p>
</body>
</html>`;
    const targetDir = path.join(distDir, cleanPath.replace(/^\//, ''));
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    fs.writeFileSync(path.join(targetDir, 'index.html'), redirectHtml, 'utf8');
    pagesGenerated++;
    continue;
  }

  // Generate semantic pre-rendered body content
  const prerenderedBody = generatePreRenderedBody(cleanPath || '/', meta);

  // Tailor HTML
  let pageHtml = templateHtml;

  // Clean out any pre-existing canonical link, OG tags, twitter tags, and JSON-LD from templateHtml
  pageHtml = pageHtml.replace(/<link[^>]*rel=["']canonical["'][^>]*>/gi, '');
  pageHtml = pageHtml.replace(/<meta[^>]*property=["']og:[^"']*["'][^>]*>/gi, '');
  pageHtml = pageHtml.replace(/<meta[^>]*name=["']twitter:[^"']*["'][^>]*>/gi, '');
  pageHtml = pageHtml.replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');

  // Replace Title
  pageHtml = pageHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${escapeHtml(meta.title)}</title>`
  );

  // Replace Description & Inject Canonical / OG Tags
  const metaTags = `
    <meta name="description" content="${escapeHtml(meta.description)}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:title" content="${escapeHtml(meta.title)}" />
    <meta property="og:description" content="${escapeHtml(meta.description)}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://www.bankscart.com/favicon-32x32.png" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="${escapeHtml(meta.title)}" />
    <meta name="twitter:description" content="${escapeHtml(meta.description)}" />
    <meta name="twitter:image" content="https://www.bankscart.com/favicon-32x32.png" />`;

  // Generate JSON-LD structured data scripts
  const jsonLdSchemas = generateJsonLd(cleanPath, meta, canonicalUrl);
  const jsonLdScripts = jsonLdSchemas.map(s => '    <script type="application/ld+json">\n' + JSON.stringify(s, null, 2) + '\n    </script>').join('\n');

  // Replace or inject description and JSON-LD
  if (pageHtml.includes('name="description"')) {
    pageHtml = pageHtml.replace(/<meta[^>]*name="description"[^>]*>/i, metaTags.trim());
  } else {
    pageHtml = pageHtml.replace('</head>', `${metaTags}\n  </head>`);
  }

  // Inject JSON-LD structured data before </head>
  pageHtml = pageHtml.replace('</head>', jsonLdScripts + '\n  </head>');

  // Pre-render semantic body inside <div id="root"></div>
  if (pageHtml.includes('<div id="root"></div>')) {
    pageHtml = pageHtml.replace(
      '<div id="root"></div>',
      `<div id="root">${prerenderedBody}</div>`
    );
  } else {
    pageHtml = pageHtml.replace(
      /<div id="root">[\s\S]*?<\/div>\s*<script/i,
      `<div id="root">${prerenderedBody}</div>\n    <script`
    );
  }

  if (!cleanPath) {
    // Root index.html
    fs.writeFileSync(templatePath, pageHtml, 'utf8');
    pagesGenerated++;
  } else {
    const targetDir = path.join(distDir, cleanPath.replace(/^\//, ''));
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    const targetFile = path.join(targetDir, 'index.html');
    fs.writeFileSync(targetFile, pageHtml, 'utf8');
    pagesGenerated++;
  }
}


// Explicit generation of legacy redirect pages (guarantees dist/blogs, dist/blogs-overview-page, and dist/about-us exist even when excluded from sitemap.xml)
const legacyRedirects = [
  { path: '/blogs', target: '/blog' },
  { path: '/blogs-overview-page', target: '/blog' },
  { path: '/about', target: '/about-us' },
  { path: '/contact-us', target: '/contact' }
];

// Ensure public/404.html is copied to dist/404.html
const public404 = path.resolve(__dirname, '../public/404.html');
if (fs.existsSync(public404)) {
  fs.copyFileSync(public404, path.join(distDir, '404.html'));
  console.log('Copied public/404.html to dist/404.html');
}

for (const redir of legacyRedirects) {
  const targetDir = path.join(distDir, redir.path.replace(/^\//, ''));
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const redirectHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=${redir.target}">
  <meta name="robots" content="noindex, follow" />
  <link rel="canonical" href="https://www.bankscart.com${redir.target}" />
  <title>Redirecting ${redir.path} to ${redir.target} | BanksCart</title>
  <script>window.location.replace('${redir.target}');</script>
</head>
<body>
  <p>Moved Permanently. Redirecting to <a href="${redir.target}">https://www.bankscart.com${redir.target}</a>...</p>
</body>
</html>`;
  fs.writeFileSync(path.join(targetDir, 'index.html'), redirectHtml, 'utf8');
}

console.log(`Successfully pre-rendered ${pagesGenerated} static HTML pages in dist/ with rich semantic HTML (eliminating 0-word empty client shells).`);
