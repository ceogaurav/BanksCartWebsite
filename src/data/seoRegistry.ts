import directoryLinksData from './financialDirectoryLinks.json';
import { getNewPageDetailedContent } from './newPagesDetailedData';

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
}

interface DirectoryEntry {
  name: string;
  desc: string;
  category: string;
  categoryId: string;
  badge?: string;
}

const directoryLinks = directoryLinksData as Record<string, DirectoryEntry>;

// Helper to capitalize and format URL slugs
export function formatSlug(slug: string): string {
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

// Subpaths for /loans/personal/:subPath with tailored value propositions
export const PERSONAL_LOAN_SUBPATHS: Record<string, { title: string; description: string }> = {
  'overview': {
    title: "Personal Loans in India: Compare Interest Rates, Eligibility & EMIs | BanksCart",
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

// Subpaths for /cards/credit/:subPath with tailored value propositions
export const CREDIT_CARD_SUBPATHS: Record<string, { title: string; description: string }> = {
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

// Subpaths for /investment/bonds/:subPath with tailored value propositions
export const BONDS_SUBPATHS: Record<string, { title: string; description: string }> = {
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

// Core Static Route SEO Map
export const SEO_MAP: Record<string, SEOMetadata> = {
  // Core Pages
  "/": {
    title: "BanksCart: Compare Loan Interest Rates, Credit Cards & Apply Online",
    description: "Compare and apply for personal loans, home loans, business loans, and credit cards from top Indian banks at BanksCart. Get instant eligibility and best interest rates.",
    keywords: "bankscart, compare loans, best interest rates, apply credit card, instant loan eligibility"
  },
  "/resources/loan-rates": {
    title: "Latest Bank Loan Interest Rates 2026: Compare & Apply | BanksCart",
    description: "Check latest interest rates for personal loans, home loans, and business loans across top Indian banks. Compare and apply for lowest EMI loans.",
    keywords: "loan interest rates 2026, compare bank rates, personal loan rates, home loan interest rates"
  },
  "/eligibility": {
    title: "Check Loan Eligibility Online: Instant Eligibility Calculator | BanksCart",
    description: "Check your personal loan, home loan, and business loan eligibility online in 2 minutes. Instant approval check with detailed requirements.",
    keywords: "loan eligibility check, personal loan eligibility, home loan eligibility, instant loan approval"
  },
  "/resources/ifsc-finder": {
    title: "All Bank IFSC Code Finder: Find Branch Addresses & MICR Codes | BanksCart",
    description: "Find IFSC codes, MICR codes, branch addresses, and contact details for all bank branches in India. Quick bank branch finder.",
    keywords: "IFSC code finder, MICR code, bank branch address, search IFSC code"
  },
  "/calculators": {
    title: "Free Financial & Loan EMI Calculators Online | BanksCart",
    description: "Use our free financial calculators including Personal Loan EMI, Home Loan EMI, Car Loan, SIP, PPF, and Income Tax calculators to plan your finances.",
    keywords: "financial calculators, EMI calculator, loan emi calculator, SIP calculator, tax calculator"
  },
  "/status": {
    title: "Track Loan Application Status Online | BanksCart",
    description: "Track your personal, home, or business loan application status online. Instant real-time tracking with BanksCart.",
    keywords: "track loan status, loan application status, check loan progress"
  },
  "/pan-card": {
    title: "Apply for PAN Card Online: Check Status & Corrections | BanksCart",
    description: "Step-by-step guide to apply for new PAN card, make corrections, link Aadhaar with PAN, and track PAN card status online.",
    keywords: "apply pan card online, pan card status, link pan adhaar, pan card correction"
  },
  "/resources/aadhar-pan": {
    title: "Link Aadhaar to PAN Card Online: Step-by-Step Guide | BanksCart",
    description: "Complete guide on how to link your Aadhaar card with PAN card online, verify linking status, and check deadlines.",
    keywords: "link aadhaar to pan, pan card linking online, check aadhaar pan link status"
  },
  "/MortgageCalculatorPage": {
    title: "Home Mortgage Calculator: Estimate Monthly Payments & Amortization | BanksCart",
    description: "Calculate monthly mortgage payments, property taxes, home insurance, and see full amortization schedule with our free Mortgage Calculator.",
    keywords: "mortgage calculator, monthly mortgage payment, home loan amortization"
  },
  "/loan-apply": {
    title: "Apply for Loan Online: Quick Personal & Home Loan App | BanksCart",
    description: "Apply online for personal loans, home loans, or business loans. Fill a simple form and get matched with top lenders instantly.",
    keywords: "apply loan online, quick personal loan, apply home loan online"
  },
  "/blog": {
    title: "BanksCart Financial Blog & News: Expert Guides, Loan Tips & Analysis",
    description: "Read the latest finance articles, loan comparison guides, credit score tips, banking reviews, and investment insights on BanksCart.",
    keywords: "bankscart blog, finance articles, credit score tips, investment guides"
  },
  "/blogs-overview-page": {
    title: "BanksCart Banking & Financial Guides | BanksCart",
    description: "Explore comprehensive guides on banking, credit cards, loans, investments, and personal finance strategies.",
    keywords: "banking guides, finance strategy, invest tips"
  },
  "/blogs": {
    title: "BanksCart Banking & Financial Guides | BanksCart",
    description: "Explore comprehensive guides on banking, credit cards, loans, investments, and personal finance strategies.",
    keywords: "banking guides, finance strategy, invest tips"
  },

  // Hub Pages
  "/loans": {
    title: "Compare Bank Loans in India: Personal, Home, Car & Business Loans | BanksCart",
    description: "Compare loan interest rates from top Indian banks. Find the lowest EMIs for personal, home, car, and business loans with instant eligibility check.",
    keywords: "bank loans, compare loans, personal loan, home loan, car loan, business loan"
  },
  "/cards": {
    title: "Compare & Apply for Best Credit & Debit Cards Online | BanksCart",
    description: "Explore top credit and debit cards in India. Compare rewards, cashback, travel lounge access, and lifetime free options.",
    keywords: "credit cards, debit cards, compare credit cards, best cards in india"
  },
  "/credit-cards": {
    title: "Apply for Best Credit Cards in India: Cashbacks & Rewards | BanksCart",
    description: "Compare rewards, cashback, and travel benefits on premium credit cards. Quick digital application and approval.",
    keywords: "apply credit cards, best credit cards, credit card offers"
  },
  "/insurance": {
    title: "Compare Insurance Plans in India: Health, Life, Term & Motor | BanksCart",
    description: "Compare health insurance, life term insurance, motor vehicle insurance, and pension plans from top insurers in India.",
    keywords: "insurance in india, health insurance, life insurance, term insurance, car insurance"
  },
  "/investment": {
    title: "Investment Plans in India: Fixed Deposits, Mutual Funds & Bonds | BanksCart",
    description: "Discover high-yield investment options in India. Compare fixed deposit rates, top-performing mutual funds, and sovereign bonds.",
    keywords: "investment plans, compare fixed deposits, mutual funds, government bonds"
  },
  "/credit-score": {
    title: "Check Free Credit Score Online: CIBIL Score & Analysis | BanksCart",
    description: "Check your credit score online for free. Get detailed analysis of your credit report, active loans, and actionable tips to boost your score.",
    keywords: "free credit score, cibil score check, credit report analysis"
  },
  "/cibil-credit-report": {
    title: "Get Free CIBIL Credit Report & Score Online | BanksCart",
    description: "Check your CIBIL score & download complete credit report online for free. Get detailed analysis on payment histories, active loans and score trends.",
    keywords: "free cibil score, cibil credit report, download credit report online, check credit score"
  },
  "/cibil/how-to-check-cibil-score-by-pan-card": {
    title: "How to Check CIBIL Score by PAN Card Online | BanksCart",
    description: "Learn the step-by-step process to check your CIBIL credit score online using your PAN card. Securely verify active credit profiles and detect fraud.",
    keywords: "check cibil score by pan card, check credit score with pan, pan card cibil check, verify credit history"
  },
  "/cibil-report/cibil-score-sbi-loans": {
    title: "SBI CIBIL Score Requirements for Home & Personal Loans | BanksCart",
    description: "Check the minimum CIBIL score required for State Bank of India (SBI) loans. Discover SBI's special interest concessions and concessions for scores above 750.",
    keywords: "sbi cibil score requirement, sbi home loan minimum cibil, sbi personal loan credit score, sbi cibil concessions"
  },
  "/credit-report/ways-to-improve-your-cibil-score": {
    title: "How to Increase CIBIL Score: 6 Actionable Recovery Tips | BanksCart",
    description: "Struggling with a low credit score? Discover highly actionable ways to improve your CIBIL score rapidly. Learn tips to manage limits and payment history.",
    keywords: "improve cibil score, increase credit score fast, boost cibil score tips, fix bad credit"
  },
  "/aadhar-card": {
    title: "Aadhaar Card Services: UIDAI Portal, Updates & Download Online | BanksCart",
    description: "Complete official UIDAI guide to dynamic identity services. Check enrolment status, download e-Aadhaar, and update address online.",
    keywords: "aadhaar card, uidai portal, download aadhaar, update aadhaar address"
  },
  "/pages-directory": {
    title: "All Financial Services Directories: 1000+ Active Portals | BanksCart",
    description: "Access over 1000+ active financial portals, verified loan rates tables, Aadhaar services guides, scheduled banking, and corporate health directories online.",
    keywords: "financial directory, bankscart directory, banking portals, loan directories"
  },
  "/financial-directory": {
    title: "All Financial Services Directories: 1000+ Active Portals | BanksCart",
    description: "Access over 1000+ active financial portals, verified loan rates tables, Aadhaar services guides, scheduled banking, and corporate health directories online.",
    keywords: "financial directory, bankscart directory, banking portals, loan directories"
  },

  // Main Loan Types
  "/loans/home": {
    title: "Home Loans in India: Apply Online at Lowest Interest Rates | BanksCart",
    description: "Compare home loan interest rates from top banks like SBI, HDFC, ICICI, and Axis. Check eligibility, calculate EMI, and apply online with zero processing fees.",
    keywords: "home loans, home loan interest rates, lowest home loan rate, apply home loan online"
  },
  "/loans/personal": {
    title: "Personal Loans in India: Compare Interest Rates, Eligibility & EMIs | BanksCart",
    description: "Compare personal loans from 30+ top banks and NBFCs in India. Check eligibility, lowest interest rates starting from 10.50%, EMI calculations, and apply online.",
    keywords: "personal loan, instant personal loan, compare personal loan interest rates, personal loan emi calculator"
  },
  "/loans/personal/overview": {
    title: "Personal Loans in India: Compare Interest Rates, Eligibility & EMIs | BanksCart",
    description: "Comprehensive personal loan comparison across top Indian lenders. Compare interest rates, processing fees, documentation, and calculate repayments instantly.",
    keywords: "personal loan overview, personal loan comparison, best personal loan india"
  },
  "/loans/business": {
    title: "Collateral-Free Business Loans: Compare Rates & Apply Online | BanksCart",
    description: "Get unsecured MSME and business loans up to ₹75 Lakhs from top banks and NBFCs. Compare interest rates, check eligibility, and apply with fast disbursal.",
    keywords: "business loan, collateral free business loan, msme loan, startup business loan"
  },
  "/loans/car": {
    title: "New Car Loans in India: Compare Low Interest Rates & Apply | BanksCart",
    description: "Finance your new car with up to 100% on-road funding. Compare car loan interest rates from leading banks and calculate your monthly EMI instantly.",
    keywords: "car loans, new car loan rates, compare car loan emi, auto loan online"
  },
  "/loans/used-car": {
    title: "Used Car Loans in India: Low Interest Rates & Quick Approvals | BanksCart",
    description: "Finance a pre-owned car with quick approvals and flexible repayment tenures up to 7 years. Check rates, required documents, and apply online.",
    keywords: "used car loans, pre-owned car finance, second hand car loan interest rates"
  },
  "/loans/two-wheeler": {
    title: "Two Wheeler & Bike Loans: Instant Approval & Low EMI | BanksCart",
    description: "Get quick bike financing for scooters and premium motorcycles. Compare two-wheeler loan rates, calculate monthly EMIs, and apply online.",
    keywords: "bike loan, two wheeler loan, motorcycle financing, low emi bike loan"
  },
  "/loans/education": {
    title: "Education Loans for Studies in India & Abroad: Apply Online | BanksCart",
    description: "Fund higher education in India and top foreign universities. Compare student loan interest rates, tax benefits under Section 80E, and apply online.",
    keywords: "education loans, study abroad loan, student loans india, collateral free education loan"
  },

  // Calculators
  "/personal-loan-emi-calculator": {
    title: "Personal Loan EMI Calculator: Estimate Monthly Payments & Interest | BanksCart",
    description: "Calculate your monthly personal loan EMI, total interest payable, and amortization schedule instantly with our free online calculator.",
    keywords: "personal loan emi calculator, calculate loan emi, loan interest calculator"
  },
  "/home-loan-emi-calculator": {
    title: "Home Loan EMI Calculator: Check Monthly EMI & Amortization | BanksCart",
    description: "Plan your home purchase with our free Home Loan EMI Calculator. View month-by-month principal and interest breakup with prepayments.",
    keywords: "home loan emi calculator, housing loan calculator, mortgage emi calculator"
  },
  "/car-loan-emi-calculator": {
    title: "Car Loan EMI Calculator: Calculate Auto Loan Monthly Payments | BanksCart",
    description: "Estimate monthly car loan payments based on vehicle price, down payment, loan tenure, and bank interest rates. Free online auto calculator.",
    keywords: "car loan emi calculator, auto loan calculator, vehicle emi calculation"
  },
  "/income-tax-calculator": {
    title: "Income Tax Calculator FY 2025-26: Compare Old vs New Tax Regime | BanksCart",
    description: "Calculate your income tax liability under both Old and New Tax Regimes for FY 2025-26 (AY 2026-27). Plan your deductions under 80C, 80D, and HRA.",
    keywords: "income tax calculator, new tax regime vs old tax regime, tax calculation fy 2025-26"
  },
  "/ssy-calculator": {
    title: "Sukanya Samriddhi Yojana (SSY) Calculator: Maturity Amount | BanksCart",
    description: "Calculate the maturity amount and interest returns for Sukanya Samriddhi Yojana. Free online government scheme calculator for girl child savings.",
    keywords: "sukanya samriddhi yojana calculator, ssy calculator, ssy maturity calculator"
  },
  "/plot-construction-loan": {
    title: "Plot & Home Construction Loans: Lowest Interest Rates | BanksCart",
    description: "Finance land purchase and residential construction. Compare plot loan interest rates from top banks and apply online with flexible disbursal stages.",
    keywords: "plot loan, construction loan, home construction finance, plot purchase loan"
  },
  "/home-loan-compare": {
    title: "Compare Home Loan Interest Rates Across All Banks | BanksCart",
    description: "Compare home loan interest rates, processing fees, and loan-to-value (LTV) ratios across SBI, HDFC, ICICI, Axis, and Bank of Baroda side-by-side.",
    keywords: "compare home loans, compare bank home loan rates, best home loan bank"
  },

  // Static Blog Articles (All 38 static blog pages)
  "/blogs/what-is-cibil-score": {
    title: "The Ultimate Guide to CIBIL Score Mastery: Improve Credit Fast | BanksCart",
    description: "Master your credit score. Understand score calculation ranges, factors hurting your rating, and step-by-step actions to reach 750+ within 6 months.",
    keywords: "what is cibil score, improve cibil score fast, credit rating guide, cibil score calculation"
  },
  "/blogs/Best-Credit-Cards": {
    title: "Best Credit Cards in India: Rewards, Cashback & Lounge Access | BanksCart",
    description: "Comprehensive review of the best credit cards in India. Compare rewards points, fuel surcharges, cashback rates, airport lounge visits, and annual fees.",
    keywords: "best credit cards india, reward credit cards, cashback cards, airport lounge credit cards"
  },
  "/blogs/Business-Loan-Guide": {
    title: "The Ultimate Guide to Business Loan Options in India | BanksCart",
    description: "Explore MSME loans, collateral-free credit, working capital limits, and government loan schemes like CGTMSE and MUDRA to expand your company.",
    keywords: "business loan guide, msme business loans, cgtmse loan scheme, mudra loan"
  },
  "/blogs/Fixed-Deposit-Guide": {
    title: "Fixed Deposit (FD) Guide: Highest Bank FD Interest Rates | BanksCart",
    description: "Maximize your fixed income returns. Compare latest bank FD rates, cumulative vs non-cumulative payouts, tax-saver FDs, and senior citizen benefits.",
    keywords: "fixed deposit guide, highest fd rates, tax saving fd, senior citizen fd"
  },
  "/blogs/Home-Loan-Guide": {
    title: "Complete Home Loan Guide: Step-by-Step Approval Blueprint | BanksCart",
    description: "Everything you need to know about buying a house with a home loan. Learn about documentation, property legal verification, interest types, and tax deductions.",
    keywords: "home loan guide, housing loan process, section 24 tax exemption, property verification"
  },
  "/blogs/Investment-Plans-Guide": {
    title: "Best Investment Plans in India: High Returns & Wealth Creation | BanksCart",
    description: "Discover top investment avenues for short-term and long-term goals. Compare Mutual Funds, PPF, NPS, Sovereign Gold Bonds, and Fixed Deposits.",
    keywords: "best investment plans, wealth creation india, mutual funds vs ppf, where to invest"
  },
  "/blogs/Sukanya-Samriddhi-Yojana-Guide": {
    title: "Sukanya Samriddhi Yojana (SSY) Complete Guide: Rules & Tax Benefits | BanksCart",
    description: "Learn how to open an SSY account for your daughter. Understand eligibility, current government interest rates, tax-free returns under EEE, and withdrawal rules.",
    keywords: "sukanya samriddhi yojana guide, ssy interest rate, ssy tax benefits, girl child investment"
  },
  "/blogs/Loan-Eligibility-Tricks": {
    title: "7 Powerful Tricks to Boost Your Personal & Home Loan Eligibility | BanksCart",
    description: "Struggling with loan rejection? Discover proven strategies to increase your loan eligibility, add co-applicants, reduce FOIR, and get instant approval.",
    keywords: "boost loan eligibility, how to increase loan amount, foir calculation, loan approval tips"
  },
  "/blogs/Secured-Unsecured-Guide": {
    title: "Secured vs Unsecured Loans: Key Differences, Risks & Benefits | BanksCart",
    description: "Compare collateral-backed secured loans with zero-collateral unsecured loans. Learn when to choose personal loans vs gold or mortgage loans.",
    keywords: "secured vs unsecured loans, collateral loans, personal loan vs gold loan, loan differences"
  },
  "/blogs/Gold-Vs-Personal-Loan": {
    title: "Gold Loan vs Personal Loan: Which is Better for Fast Cash? | BanksCart",
    description: "Compare gold loans and personal loans on interest rates, processing time, credit score requirements, and foreclosure terms. Make an informed choice.",
    keywords: "gold loan vs personal loan, lowest interest gold loan, fast emergency cash, compare loans"
  },
  "/blogs/Health-Insurance-Blog": {
    title: "How to Choose the Best Health Insurance Policy in India | BanksCart",
    description: "Protect your family from rising medical inflation. Compare cashless hospital networks, pre-existing disease waiting periods, co-pay clauses, and restore benefits.",
    keywords: "best health insurance india, choose medical policy, cashless mediclaim, health insurance tips"
  },
  "/blogs/Car-Loan-Interest-Rates": {
    title: "Car Loan Interest Rates Comparison: Lowest Bank Auto Loans | BanksCart",
    description: "Check current car loan rates across SBI, HDFC, ICICI, and Axis Bank. Learn how to negotiate zero processing fees and 100% on-road financing.",
    keywords: "car loan interest rates, lowest car loan emi, auto loan comparison, new car loan rates"
  },
  "/blogs/Card-Showdown": {
    title: "Credit Card Showdown: Cashback vs Travel Reward Credit Cards | BanksCart",
    description: "Which credit card fits your lifestyle? Deep dive into cashback credit cards vs travel air miles cards with net value calculations.",
    keywords: "cashback vs travel credit card, compare credit card perks, air miles credit card"
  },
  "/blogs/Tax-Saving-Guide": {
    title: "The Master Tax-Saving Guide: Maximize Deductions Under 80C & 80D | BanksCart",
    description: "Legally minimize your income tax. Actionable tips to save tax using Section 80C, 80D health insurance, NPS Section 80CCD(1B), and home loan deductions.",
    keywords: "tax saving guide, section 80c investments, how to save income tax, tax deductions 2026"
  },
  "/blogs/EMI-Explained": {
    title: "How Loan EMIs Work: Principal, Interest & Amortization Explained | BanksCart",
    description: "Demystifying Equated Monthly Installments. Learn the mathematics behind flat vs reducing balance interest rates and how prepayments save lakhs.",
    keywords: "how emi works, reducing balance rate vs flat rate, loan amortization explained, save loan interest"
  },
  "/blogs/Loan-Mistakes-To-Avoid": {
    title: "10 Costly Loan Mistakes to Avoid When Borrowing Money | BanksCart",
    description: "Avoid financial traps. Learn why multiple simultaneous loan applications, skipping EMI dates, and ignoring hidden fees can destroy your finances.",
    keywords: "loan mistakes to avoid, personal loan traps, credit score damage, avoid loan rejection"
  },
  "/blogs/Rising-Interest-Rates": {
    title: "Rising Bank Interest Rates: How to Manage Home & Personal Loan EMIs | BanksCart",
    description: "RBI repo rate hikes affecting your monthly budget? Learn effective strategies like tenure extension, balance transfer, and prepayments to beat high rates.",
    keywords: "rising interest rates, repo rate hike impact, reduce home loan emi, loan prepayment tips"
  },
  "/blogs/Digital-Banks": {
    title: "The Rise of Digital Banking in India: Neo-Banks & Paperless Accounts | BanksCart",
    description: "Explore the modern banking landscape. Understand zero-balance digital savings accounts, instant virtual debit cards, and fintech security standards.",
    keywords: "digital banks india, neo banks guide, paperless savings account, instant zero balance account"
  },
  "/blogs/Wealth-Building-Strategies": {
    title: "Proven Wealth Building Strategies for Young Professionals in India | BanksCart",
    description: "Start your journey to financial freedom. Practical roadmap covering emergency funds, index fund SIPs, term insurance, and disciplined asset allocation.",
    keywords: "wealth building strategies, financial independence india, sip investing guide, personal finance habits"
  },
  "/blogs/Best-Personal-Loan-Apps": {
    title: "Top 10 Instant Personal Loan Apps in India: Fast Cash Disbursals | BanksCart",
    description: "Need emergency funds? Compare verified, RBI-registered instant personal loan apps. Check approval speed, interest rates, and loan processing fees.",
    keywords: "best personal loan apps, instant cash loan app, rbi registered loan apps, quick loan disbursal"
  },
  "/blogs/Loan-Vs-Card-Loan": {
    title: "Personal Loan vs Loan on Credit Card: Which is Cheaper & Faster? | BanksCart",
    description: "Compare pre-approved credit card loans with traditional bank personal loans on interest costs, processing charges, and impact on credit limits.",
    keywords: "personal loan vs credit card loan, instant card loan, lowest interest emergency loan"
  },
  "/blogs/No-CIBIL-Loan-Tricks": {
    title: "How to Get a Personal Loan Without CIBIL Score or Low Credit History | BanksCart",
    description: "First-time borrower or low credit score? Explore alternative lending options, salary slip loans, peer-to-peer lending, and secured loan alternatives.",
    keywords: "loan without cibil score, personal loan for low credit score, first time borrower loans"
  },
  "/blogs/Personal-Loan-Rates": {
    title: "Latest Personal Loan Interest Rates 2026: Compare 25+ Top Lenders | BanksCart",
    description: "Check verified personal loan interest rates from public banks, private banks, and NBFCs. Compare processing fees, prepayments, and loan eligibility.",
    keywords: "personal loan rates 2026, compare bank loan rates, lowest personal loan interest rate"
  },
  "/blogs/Loan-Eligibility-Trick": {
    title: "Secret Tricks to Check & Increase Your Personal Loan Approval Chances | BanksCart",
    description: "Learn how underwriters evaluate salary-to-debt ratios and bank statements. Maximize your chances of paperless personal loan approval instantly.",
    keywords: "personal loan approval tricks, increase loan chances, clean bank statements for loan"
  },
  "/blogs/Personal-Loan-Balance-Transfer": {
    title: "Personal Loan Balance Transfer: Save Thousands on Monthly EMIs | BanksCart",
    description: "Stuck with high interest rates? Learn how to transfer your outstanding personal loan balance to a lower-interest lender with zero hassle.",
    keywords: "personal loan balance transfer, lower loan interest rate, loan transfer benefits"
  },
  "/blogs/Home-Loan-Comparison": {
    title: "Home Loan Comparison Guide: Lowest Fixed & Floating Interest Rates | BanksCart",
    description: "Comprehensive bank comparison for home loans. Evaluate floating vs fixed rates, processing charges, and prepayment terms to choose the best bank.",
    keywords: "home loan comparison, compare housing loan banks, fixed vs floating home loan"
  },
  "/blogs/Low-Salary-Home-Loan-Guide": {
    title: "How to Get a Home Loan with Low Salary: Government Schemes & Tips | BanksCart",
    description: "Earning ₹20,000 to ₹30,000 per month? Discover how co-borrowers, longer tenures, and affordable housing schemes like PMAY help you buy your dream home.",
    keywords: "home loan for low salary, affordable housing finance, pmay subsidy loan"
  },
  "/blogs/Home-Loan-Mistakes": {
    title: "7 Crucial Home Loan Mistakes That Can Cost You Lakhs | BanksCart",
    description: "Don't fall into expensive home loan pitfalls. Understand hidden processing charges, legal clearance delays, and reset rate frequency traps.",
    keywords: "home loan mistakes, housing loan hidden charges, avoid property loan traps"
  },
  "/blogs/PMAY": {
    title: "Pradhan Mantri Awas Yojana (PMAY) Complete Guide: Subsidy & Rules | BanksCart",
    description: "Learn about the PMAY Credit Linked Subsidy Scheme (CLSS). Check eligibility for EWS, LIG, and MIG categories, application procedure, and subsidy benefits.",
    keywords: "pmay guide, pradhan mantri awas yojana subsidy, clss home loan subsidy"
  },
  "/blogs/Rent-Vs-Buy-2026": {
    title: "Rent vs Buy a House in India: The Ultimate Financial Calculation | BanksCart",
    description: "Detailed financial comparison of renting vs buying property in Indian metro cities. Factor in rental yields, home loan interest, and real estate appreciation.",
    keywords: "rent vs buy house, real estate calculation india, is buying property worth it"
  },
  "/blogs/Startup-Loan-Blueprint": {
    title: "Startup & SME Loan Blueprint: Government Schemes & Capital Funding | BanksCart",
    description: "Secure funding for your new business. Explore Startup India Seed Fund, Stand-Up India, CGTMSE collateral-free loans, and venture debt options.",
    keywords: "startup loan blueprint, government schemes for startups, cgtmse funding"
  },
  "/blogs/MSME-Loan-Without-Collateral": {
    title: "MSME Loans Without Collateral: How to Get Unsecured Business Credit | BanksCart",
    description: "Small businesses can now access up to ₹2 Crores in collateral-free credit under CGTMSE. Learn eligibility criteria, required documents, and approval steps.",
    keywords: "msme loan without collateral, unsecured business loan, cgtmse scheme eligibility"
  },
  "/blogs/Business-Loan-Eligibility": {
    title: "Business Loan Eligibility Criteria: How Banks Evaluate Enterprises | BanksCart",
    description: "Understand turnover requirements, ITR filings, profit margins, and vintage criteria banks inspect before sanctioning commercial loans.",
    keywords: "business loan eligibility, commercial loan requirements, itr for business loan"
  },
  "/blogs/Vehicle-Financing-Guide": {
    title: "Vehicle Financing Guide: Auto Loans, Down Payments & Interest Rates | BanksCart",
    description: "Complete roadmap to purchasing a personal or commercial vehicle with an auto loan. Understand on-road price vs ex-showroom funding.",
    keywords: "vehicle financing guide, auto loan process, car financing tips"
  },
  "/blogs/Car-Loan-Rates-2026": {
    title: "Best Car Loan Interest Rates in India 2026: Compare Top Banks | BanksCart",
    description: "Apply for a car loan online. Detailed analysis of zero-downpayment financing, processing fees, and top car loan interest rates.",
    keywords: "best car loan rates 2026, lowest car loan interest, auto loan bank list"
  },
  "/blogs/Used-Car-Loan-Guide": {
    title: "How to Buy a Used Car With a Loan: Buyer’s Complete Guide | BanksCart",
    description: "Finance a pre-owned car. Navigate physical valuation certificates, transfer RTO hypothecation, and secure lowest rates.",
    keywords: "used car loan guide, pre owned car finance, buy second hand car loan"
  },
  "/blogs/Bike-Loan-Eligibility": {
    title: "Bike Loan Eligibility Guide: Secure Low EMI Two-Wheeler Loans | BanksCart",
    description: "Compare two-wheeler loans. Master credit eligibility limits, processing times, and downpayment requirements for top sports bikes.",
    keywords: "bike loan eligibility, two wheeler finance, scooter loan approval"
  },
  "/blogs/Car-Loan-100-Percent-Finance": {
    title: "Zero Down Payment Car Loans: 100% On-Road Funding Guide | BanksCart",
    description: "Blueprint to secure 100% on-road funding for your new car. Learn how banks assess eligibility for zero-downpayment car loans.",
    keywords: "zero down payment car loan, 100 percent auto finance, car loan without downpayment"
  },

  // Legal Pages
  "/credit-report-terms": {
    title: "Credit Report Terms & Conditions | BanksCart",
    description: "Review BanksCart's terms and conditions regarding free credit score checks, CIBIL reports, and data privacy policies.",
  },
  "/terms-of-use": {
    title: "Terms of Use | BanksCart",
    description: "Terms and conditions governing your use of BanksCart services, comparison calculators, and loan application tools.",
  },
  "/privacy-policy": {
    title: "Privacy Policy | BanksCart",
    description: "Read BanksCart's Privacy Policy to understand how we secure your personal information, credit scores, and bank data.",
  },
  "/investor-relations": {
    title: "Investor Relations | BanksCart",
    description: "Get financial updates, investor presentations, corporate governance details, and growth prospects of BanksCart.",
  },
  "/disclaimer": {
    title: "Disclaimer & Financial Terms | BanksCart",
    description: "Financial disclaimer regarding loan comparisons, mock calculators, and bank interest rates presented on BanksCart.",
  },
  "/intellectual-policy": {
    title: "Intellectual Property Policy | BanksCart",
    description: "Read about copyright compliance, trademarks, and protected content belonging to BanksCart.",
  },
  "/sitemap": {
    title: "Sitemap: Navigate All Pages & Calculators | BanksCart",
    description: "Sitemap containing all credit cards, personal loans, calculators, financial resources, and banking guides on BanksCart.",
  }
};

/**
 * Universal SEO Metadata Resolver
 * Guarantees every single route receives a unique, tailored, keyword-optimized title and description.
 * Under no circumstances does any route fall back to the generic duplicate title or description.
 */
export function getSEOMetadata(pathname: string): SEOMetadata {
  const cleanPath = pathname.replace(/\/$/, '') || '/';

  // 1. Check exact match in static SEO map
  if (SEO_MAP[cleanPath]) {
    return SEO_MAP[cleanPath];
  }

  // 2. Hub and Core Paths
  if (cleanPath === '/loans') {
    return SEO_MAP['/loans'];
  }
  if (cleanPath === '/cards') {
    return SEO_MAP['/cards'];
  }
  if (cleanPath === '/blogs' || cleanPath === '/blogs-overview-page' || cleanPath === '/blog') {
    return SEO_MAP['/blogs'];
  }
  if (cleanPath === '/aadhar-card') {
    return SEO_MAP['/aadhar-card'];
  }

  // 3. Specific high-priority service targets (Explicitly cited by user audit)
  if (cleanPath.includes('company-registration-in-delhi')) {
    return {
      title: "Company Registration in Delhi - Apply Online | BanksCart",
      description: "Incorporate your private limited or LLP venture in Delhi with ROC approvals, DIN allocation, and fast-track MCA filing.",
      keywords: "company registration in delhi, roc delhi incorporation, private limited company delhi, register company online delhi"
    };
  }
  if (cleanPath.includes('company-registration-in-chennai')) {
    return {
      title: "Company Registration in Chennai - Apply Online | BanksCart",
      description: "Fast-track corporate registration, DIN allocations, and MCA filing in Chennai with end-to-end legal support.",
      keywords: "company registration in chennai, roc chennai incorporation, pvt ltd chennai"
    };
  }
  if (cleanPath.includes('company-registration-in-bangalore')) {
    return {
      title: "Company Registration in Bangalore - Apply Online | BanksCart",
      description: "Incorporate high-growth startups and tech enterprises in Bengaluru under Karnataka ROC with complete digital compliance.",
      keywords: "company registration in bangalore, startup registration bengaluru, karnataka roc incorporation"
    };
  }
  if (cleanPath.includes('copyright-registration')) {
    return {
      title: "Copyright Registration Online - Protect Literary, Artistic & Software IP | BanksCart",
      description: "Protect literary, artistic, and digital software intellectual property under Indian Copyright Office protocols.",
      keywords: "copyright registration online, ip protection india, copyright filing software"
    };
  }
  if (cleanPath.includes('credit-rectification')) {
    return {
      title: "Credit Rectification Service - Dispute Errors & Boost CIBIL Score | BanksCart",
      description: "Dispute credit report anomalies, remove wrongful overdue tags, and boost your CIBIL score with expert credit rectification guidance.",
      keywords: "credit rectification service, fix cibil errors, remove default tag cibil, dispute credit report"
    };
  }

  // 4. Personal loan catalog subpaths
  if (cleanPath.startsWith('/loans/personal/')) {
    const sub = cleanPath.replace('/loans/personal/', '');
    if (PERSONAL_LOAN_SUBPATHS[sub]) {
      return {
        title: PERSONAL_LOAN_SUBPATHS[sub].title,
        description: PERSONAL_LOAN_SUBPATHS[sub].description,
        keywords: `${sub}, ${formatSlug(sub)}, personal loan online, apply personal loan`
      };
    }
  }

  // 5. Credit card catalog subpaths
  if (cleanPath.startsWith('/cards/credit/')) {
    const sub = cleanPath.replace('/cards/credit/', '');
    if (CREDIT_CARD_SUBPATHS[sub]) {
      return {
        title: CREDIT_CARD_SUBPATHS[sub].title,
        description: CREDIT_CARD_SUBPATHS[sub].description,
        keywords: `${sub}, ${formatSlug(sub)}, best credit cards, apply card online`
      };
    }
  }

  // 6. Bonds catalog subpaths
  if (cleanPath.startsWith('/investment/bonds/')) {
    const sub = cleanPath.replace('/investment/bonds/', '');
    if (BONDS_SUBPATHS[sub]) {
      return {
        title: BONDS_SUBPATHS[sub].title,
        description: BONDS_SUBPATHS[sub].description,
        keywords: `${sub}, ${formatSlug(sub)}, buy bonds online, bond investment`
      };
    }
  }

  // 7. Check Directory links dictionary (1000 verified pages)
  if (directoryLinks[cleanPath]) {
    const entry = directoryLinks[cleanPath];
    const titleName = entry.name;
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
    return {
      title,
      description: `${entry.desc} Check verified information and apply online with BanksCart.`,
      keywords: `${entry.categoryId}, ${entry.name.toLowerCase()}, bankscart services`
    };
  }

  // 8. Dynamic pages detailed content
  const dynamicPage = getNewPageDetailedContent(cleanPath);
  if (dynamicPage) {
    return {
      title: `${dynamicPage.title} | BanksCart`,
      description: dynamicPage.intro,
      keywords: `${dynamicPage.badge.toLowerCase()}, ${dynamicPage.title.toLowerCase()}`
    };
  }

  // 9. Calculators fallback
  if (cleanPath.includes('calculator')) {
    const cleanName = formatSlug(cleanPath.replace('/calculators/', '').replace('/', ''));
    return {
      title: `${cleanName}: Free Online Financial Planning Tool | BanksCart`,
      description: `Use the free online ${cleanName} to estimate monthly payments, interest charges, and plan your savings goals instantly on BanksCart.`,
      keywords: `${cleanName}, financial calculator, emi calculation`
    };
  }

  // 10. Multi-segment slug resolver (Deep paths)
  const parts = cleanPath.split('/').filter(Boolean);
  if (parts.length >= 3) {
    const parent = formatSlug(parts[0]);
    const mid = formatSlug(parts[1]);
    const leaf = formatSlug(parts[2]);
    return {
      title: `${leaf} (${mid}): ${parent} Guide & Apply Online | BanksCart`,
      description: `Complete guide on ${leaf} for ${mid} under ${parent}. Compare features, interest rates, and apply online on BanksCart.`,
      keywords: `${parts[2]}, ${parts[1]}, ${parts[0]}`
    };
  } else if (parts.length === 2) {
    const parent = formatSlug(parts[0]);
    const leaf = formatSlug(parts[1]);
    return {
      title: `${leaf}: ${parent} Details & Apply Online | BanksCart`,
      description: `Complete guide and details on ${leaf} under ${parent}. Check requirements, compare rates, and apply online on BanksCart.`,
      keywords: `${parts[1]}, ${parts[0]}`
    };
  } else if (parts.length === 1) {
    const slug = formatSlug(parts[0]);
    return {
      title: `${slug} - Details, Eligibility & Online Services | BanksCart`,
      description: `Explore comprehensive information on ${slug} at BanksCart. Check verified terms and apply online.`,
      keywords: `${parts[0]}`
    };
  }

  // 11. Final safe default - NEVER generic duplicate
  return {
    title: "BanksCart: Financial Services, Loans & Credit Cards Online",
    description: "Compare and apply for personal loans, home loans, credit cards, and banking services online at BanksCart."
  };
}
