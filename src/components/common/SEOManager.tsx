import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Structure for SEO Metadata
interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
}

// Complete Mapping of all routes to highly-optimized financial SEO metadata
const SEO_MAP: Record<string, SEOMetadata> = {
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
    title: "BanksCart Blog: Finance Guides, Loan Tips & Credit Insights",
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

  // CIBIL Pages SEO Metadata
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
    keywords: "how to improve cibil score, increase credit score, boost credit rating, fix poor cibil score"
  },
  "/credit-score/cibil-score-for-personal-loan": {
    title: "Minimum CIBIL Score for Unsecured Personal Loans | BanksCart",
    description: "Understand the ideal CIBIL score required to get personal loan approvals from top Indian banks. Compare interest rates and approval slabs.",
    keywords: "cibil score for personal loan, minimum credit score for personal loan, unsecured loan eligibility"
  },
  "/cibil/how-to-resolve-cibil-dispute": {
    title: "How to Resolve CIBIL Dispute Online: Step-by-Step Guide | BanksCart",
    description: "Spot incorrect entries or fake loans on your credit report? Read our step-by-step guide to raise and resolve CIBIL disputes online in 30 days.",
    keywords: "resolve cibil dispute, correct credit report error, cibil dispute filing online, rectify credit score"
  },

  // Calculators (Generic/Specific)
  "/personal-loan-emi-calculator": {
    title: "Personal Loan EMI Calculator: Estimate Monthly EMI Instantly | BanksCart",
    description: "Calculate your Personal Loan EMI instantly with our interactive calculator. View detailed amortization table and interest break-up.",
    keywords: "personal loan emi calculator, calculate loan emi, monthly repayment table"
  },
  "/home-loan-emi-calculator": {
    title: "Home Loan EMI Calculator: Check Monthly Payments & Schedule | BanksCart",
    description: "Calculate your Home Loan EMI, total interest payable, and view yearly amortization breakdown. Plan your home purchase easily.",
    keywords: "home loan emi calculator, mortgage emi calculator, home loan monthly payment"
  },
  "/car-loan-emi-calculator": {
    title: "Car Loan EMI Calculator: Estimate Auto Loan EMI | BanksCart",
    description: "Estimate your car loan EMI instantly. Select loan amount, interest rate, and tenure to see monthly payment breakdown.",
    keywords: "car loan emi calculator, auto loan calculator, estimate vehicle emi"
  },
  "/income-tax-calculator": {
    title: "Income Tax Calculator FY 2025-26 & AY 2026-27: New vs Old Regime | BanksCart",
    description: "Calculate your income tax liability for FY 2025-26 (AY 2026-27) under both old and new tax regimes. Save tax with smart planning.",
    keywords: "income tax calculator, new tax regime, old vs new regime, tax planning tool"
  },
  "/ssy-calculator": {
    title: "Sukanya Samriddhi Yojana (SSY) Calculator 2026: Maturity Value | BanksCart",
    description: "Calculate Sukanya Samriddhi Yojana maturity value, yearly compound interest, and total tax savings instantly with our free government-aligned SSY calculator.",
    keywords: "ssy calculator 2026, sukanya samriddhi yojana calculator, girl child saving scheme calculator"
  },
  "/credit-card-finder": {
    title: "Best Credit Card Finder: Find Your Perfect Credit Card Online | BanksCart",
    description: "Find the best credit card suited for your lifestyle in just 2 minutes. Take our interactive Credit Card Finder quiz to compare rewards, cashback, travel and dining benefits.",
    keywords: "credit card finder, credit card selector quiz, best credit card, find credit card online"
  },


  // Loan Products
  "/plot-construction-loan": {
    title: "Plot & Construction Loans: Compare Rates & Apply Online | BanksCart",
    description: "Compare and apply for plot purchase and home construction loans. Get lowest interest rates, high LTV, and flexible tenures.",
    keywords: "plot loan, construction loan, home construction financing"
  },
  "/home-loan-compare": {
    title: "Compare Home Loan Interest Rates 2026: Top Banks | BanksCart",
    description: "Compare home loan interest rates, processing fees, and loan eligibility of top Indian banks side-by-side. Choose the best rate.",
    keywords: "compare home loans, best home loan rate, home loan comparisons"
  },
  "/loans": {
    title: "Best Bank Loans in India: Personal, Home, Business & Car Loans | BanksCart",
    description: "Explore and apply for various loan products from top Indian lenders. Compare personal, home, business, and vehicle loan interest rates.",
    keywords: "bank loans India, check loan rates, apply online"
  },
  "/insurance": {
    title: "Compare & Buy Best Insurance Plans Online | BanksCart",
    description: "Compare and buy health insurance, car insurance, and term life insurance plans from top insurance companies with maximum savings.",
    keywords: "compare insurance, buy health insurance online, car insurance quotes"
  },
  "/investment": {
    title: "High-Yield Investment Plans: FDs, Mutual Funds & Bonds | BanksCart",
    description: "Grow your wealth with high-yield investment options. Compare top bank Fixed Deposits, Mutual Funds, and corporate bonds.",
    keywords: "best investments, fixed deposit rates, buy mutual funds"
  },
  "/cards": {
    title: "Compare & Apply for Best Credit & Debit Cards Online | BanksCart",
    description: "Find the best credit cards and debit cards in India. Compare cashback, rewards, travel benefits, annual fees, and apply online.",
    keywords: "best credit cards, compare debit cards, cashback credit card"
  },
  "/loans/home": {
    title: "Home Loans: Apply Online at Lowest Interest Rates | BanksCart",
    description: "Apply for a home loan online starting at competitive interest rates. Check eligibility, required documents, and get quick approval.",
    keywords: "apply home loan, lowest home loan interest rate, mortgage rates"
  },
  "/loans/personal": {
    title: "Instant Personal Loans: Apply Online with Low Interest Rates | BanksCart",
    description: "Get instant personal loans up to ₹25 Lakhs with quick approval and minimal documentation. Check interest rates and apply online.",
    keywords: "instant personal loan, low interest personal loan, quick loan online"
  },
  "/loans/business": {
    title: "Collateral-Free Business Loans: Compare Rates & Apply | BanksCart",
    description: "Grow your business with collateral-free business loans up to ₹50 Lakhs. Compare interest rates, eligibility, and apply online.",
    keywords: "business loan online, collateral-free business loan, startup business loan"
  },
  "/loans/car": {
    title: "New Car Loans: Compare Low Interest Rates & Apply | BanksCart",
    description: "Apply for new car loans online with low interest rates, 100% on-road funding, and flexible repayment tenures up to 7 years.",
    keywords: "new car loan, auto loan rates, car finance online"
  },
  "/loans/used-car": {
    title: "Used Car Loans: Affordable Financing for Pre-Owned Cars | BanksCart",
    description: "Finance your pre-owned car with customized used car loans. Low interest rates, fast processing, and quick disbursal.",
    keywords: "used car loan, pre-owned car finance, second hand car loan"
  },
  "/loans/two-wheeler": {
    title: "Two-Wheeler & Bike Loans: Fast Approval & Low EMI | BanksCart",
    description: "Get affordable financing for your dream bike or scooter. Apply for two-wheeler loans online with quick approval and low EMIs.",
    keywords: "bike loan online, two wheeler loan, motorcycle finance"
  },
  "/loans/education": {
    title: "Education & Student Loans: High Studies Financing | BanksCart",
    description: "Finance your education in India or abroad with low-interest student loans. Enjoy moratorium periods and tax benefits under Sec 80E.",
    keywords: "education loan, student loan, higher studies funding"
  },

  // Investment/Cards/Score
  "/investment/fixed-deposit": {
    title: "Compare Top Bank Fixed Deposit (FD) Interest Rates 2026 | BanksCart",
    description: "Compare FD interest rates of top public, private, and small finance banks in India. Earn up to 8.5% interest on fixed deposits.",
    keywords: "fixed deposit rates, FD interest rates 2026, highest FD return"
  },
  "/investment/mutual-funds": {
    title: "Invest in Top Mutual Funds Online: Direct & Regular Plans | BanksCart",
    description: "Start investing in high-performing equity, debt, and hybrid mutual funds. Compare historical returns, expense ratios, and start a SIP.",
    keywords: "invest mutual funds online, start SIP, best equity mutual funds"
  },
  "/investment/more-plans": {
    title: "Best High-Return Investment & Saving Plans 2026 | BanksCart",
    description: "Discover top-performing investment plans, national saving schemes, NPS, and wealth creation strategies in India.",
    keywords: "investment plans, saving schemes, national pension scheme"
  },
  "/cards/credit": {
    title: "Best Credit Cards in India: Reward Points & Cashback | BanksCart",
    description: "Compare cashback, rewards, fuel, and travel credit cards from top Indian banks. Apply online and get premium benefits.",
    keywords: "best credit cards, cashback card, apply credit card online"
  },
  "/cards/debit": {
    title: "Compare Bank Debit Cards: Features, Offers & Limits | BanksCart",
    description: "Compare top debit cards in India. Explore merchant offers, daily withdrawal limits, domestic/international lounge access.",
    keywords: "bank debit cards, debit card offers, checkout debit cards"
  },
  "/credit-score": {
    title: "Check Free CIBIL Score Online in 1 Minute | BanksCart",
    description: "Check your CIBIL score online for free. Get detailed credit analysis, score improvement tips, and track your credit health.",
    keywords: "check free cibil score, check credit score online, credit score check"
  },
  "/expert-advice": {
    title: "Personalized Financial Planning & Expert Loan Advice | BanksCart",
    description: "Talk to our expert financial advisors for personalized advice on loans, investments, debt management, and financial planning.",
    keywords: "financial advisor, loan advice, free financial consultation"
  },
  "/insurance/health": {
    title: "Health Insurance Plans: Compare & Buy Mediclaim Policy | BanksCart",
    description: "Compare and buy family floater and individual health insurance plans. Get cashless hospitalization, tax benefits, and 0% GST options.",
    keywords: "health insurance, family mediclaim, buy health insurance online"
  },
  "/insurance/car": {
    title: "Car Insurance Online: Compare Third-Party & Comprehensive | BanksCart",
    description: "Compare and buy car insurance policies online. Save up to 75% on premiums with instant paperless policy renewal and cashless claims.",
    keywords: "car insurance online, compare motor insurance, renew car insurance"
  },
  "/insurance/term-life": {
    title: "Term Life Insurance: Secure Your Family's Financial Future | BanksCart",
    description: "Buy high-cover term life insurance plans at affordable premiums. Secure your family's future with tax-saving life covers.",
    keywords: "term life insurance, best term plan, secure family future"
  },
  "/resources/gold-rates": {
    title: "Daily Gold & Silver Rates in India: Gold Loan Interest | BanksCart",
    description: "Check today's live 22k & 24k gold rates in major Indian cities. Compare top bank gold loan interest rates and eligibility.",
    keywords: "today gold rate, 22k gold rate, gold loan interest rates"
  },
  "/resources/pincodes": {
    title: "All India Pincode Search: Find Post Office Pin Codes | BanksCart",
    description: "Find pin codes and post office details of any city or village across all districts in India with our fast pincode search tool.",
    keywords: "pincode search, find postal pin code, india post office finder"
  },
  "/become-partner": {
    title: "Become a BanksCart DSA Partner: Earn High Payouts | BanksCart",
    description: "Join the BanksCart DSA Partner program. Refer clients for loans and credit cards, and earn high, timely payouts with dedicated support.",
    keywords: "become DSA partner, loan referral program, bankscart partner"
  },
  "/resources/ppf": {
    title: "Public Provident Fund (PPF) Guide: Calculate PPF Interest | BanksCart",
    description: "Learn about PPF account rules, current interest rates, tax exemptions under Sec 80C, and calculate maturity value online.",
    keywords: "public provident fund, PPF interest rate, calculate PPF maturity"
  },
  "/resources/income-tax": {
    title: "Income Tax Guide: Rules, Slab Rates & Tax Planning | BanksCart",
    description: "Complete guide to Indian income tax laws, current slab rates for FY 2025-26, filing deadlines, and tax-saving investment ideas.",
    keywords: "income tax guide, income tax slab rates, tax saving investments"
  },

  // Static Blog Articles
  "/blogs/what-is-cibil-score": {
    title: "The Ultimate 2026 Guide to CIBIL Score Mastery: Improve Credit Fast | BanksCart",
    description: "Master your credit profile. Discover critical steps to quickly boost your CIBIL score, rectify errors, and negotiate premium loan rates.",
  },
  "/blogs/Sukanya-Samriddhi-Yojana-Guide": {
    title: "Sukanya Samriddhi Yojana (SSY) 2026: Rules, Benefits & Guide | BanksCart",
    description: "Read the ultimate 2026 guide on Sukanya Samriddhi Yojana. Learn about 8.2% interest rates, triple tax exemptions (EEE), eligibility, and withdrawal rules.",
    keywords: "sukanya samriddhi scheme rules, ssy eligibility 2026, beti bachao beti padhao scheme tax benefit"
  },

  "/blogs/Best-Credit-Cards": {
    title: "Best Credit Cards in India 2025: Rewards, Cashback & Fees | BanksCart",
    description: "Your ultimate guide to selecting the top credit cards tailored to your lifestyle—from maximum cashback to premium travel benefits.",
  },
  "/blogs/Business-Loan-Guide": {
    title: "The Ultimate 2025 Guide to Business Loan Options in India | BanksCart",
    description: "Unravel business financing. Compare collateral-free MSME loans, government subsidy schemes, and secure optimal rates for your enterprise.",
  },
  "/blogs/Fixed-Deposit-Guide": {
    title: "Fixed Deposit Interest Rates 2025: Best FD Plans in India | BanksCart",
    description: "Explore the highest fixed deposit interest rates across Indian banks. Learn how to ladder FDs to optimize returns safely.",
  },
  "/blogs/Home-Loan-Guide": {
    title: "Home Loan Interest Rates 2025: Best Banks & EMI Guide | BanksCart",
    description: "Get the best rate on your dream home. Step-by-step home loan guide detailing rates, processing charges, and required documents.",
  },
  "/blogs/Investment-Plans-Guide": {
    title: "Best High-Return Investment & Saving Plans in India | BanksCart",
    description: "Grow your savings. Compare best investment avenues in India including Mutual Funds, FDs, National Saving Schemes, and NPS.",
  },
  "/blogs/Loan-Eligibility-Tricks": {
    title: "How to Improve Loan Eligibility: 9 Hidden Tricks Banks Hide | BanksCart",
    description: "Unlock secret techniques to legally lower your FOIR, drop credit utilization in days, and maximize your loan approval odds.",
  },
  "/blogs/Secured-Unsecured-Guide": {
    title: "Secured vs Unsecured Loans: The Ultimate Decision Guide | BanksCart",
    description: "A comprehensive analysis of collateral requirements, interest rate differentials, risk profiles, and strategic borrowing options.",
  },
  "/blogs/Gold-Vs-Personal-Loan": {
    title: "Gold Loan vs Personal Loan: Which is Better for You? | BanksCart",
    description: "Compare gold loans and personal loans side-by-side on interest rates, processing time, repayment flexibility, and loan amounts.",
  },
  "/blogs/Health-Insurance-Blog": {
    title: "Best Health Insurance Plans in India 2025: Coverage & Tips | BanksCart",
    description: "Compare top health insurance/mediclaim policies. Understand cashless hospital networks, copay clauses, and tax exemptions.",
  },
  "/blogs/Car-Loan-Interest-Rates": {
    title: "Car Loan Interest Rates 2025 & EMI Calculation Hacks | BanksCart",
    description: "Check the lowest car loan interest rates. Get expert advice on negotiating dealer financing vs bank car loans.",
  },
  "/blogs/Card-Showdown": {
    title: "Debit Card vs Credit Card: The Ultimate Showdown | BanksCart",
    description: "Debit card vs credit card: which is better for daily spending, online security, credit building, and reward optimization?",
  },
  "/blogs/Tax-Saving-Guide": {
    title: "Best Ways to Save Tax in India: AY 2026-27 Updated Guide | BanksCart",
    description: "Maximize your tax savings under Section 80C, 80D, and the new tax regime. Smart legal hacks to keep more of your hard-earned money.",
  },
  "/blogs/EMI-Explained": {
    title: "What is EMI? How Loan Amortization Works Explained | BanksCart",
    description: "Learn how EMIs are calculated. Discover the massive interest-saving difference of the Reducing Balance method.",
  },
  "/blogs/Loan-Mistakes-To-Avoid": {
    title: "Top 10 Mistakes to Avoid When Taking a Loan in India | BanksCart",
    description: "Protect your finances. Learn about hidden charges, pre-closure clauses, and dangerous borrowing traps to bypass completely.",
  },
  "/blogs/Rising-Interest-Rates": {
    title: "Rising Interest Rates 2026: Impact on Your Loans & EMIs | BanksCart",
    description: "How central bank policy shifts affect your home and personal loans. Strategies to hedge against rising interest rates.",
  },
  "/blogs/Digital-Banks": {
    title: "Top Digital Banks & Neobanks in India: 2026 Review | BanksCart",
    description: "Explore the new age of paperless banking. Reviews of India's top neobanking platforms, virtual cards, and savings yields.",
  },
  "/blogs/Wealth-Building-Strategies": {
    title: "How to Build Wealth in India: 10 Proven Strategies (2026) | BanksCart",
    description: "A complete blueprint for systematic wealth creation. Discover passive income generators, mutual fund SIP rules, and asset allocation.",
  },
  "/blogs/Best-Personal-Loan-Apps": {
    title: "Best Personal Loan Apps in India 2026: Reviews & Rates | BanksCart",
    description: "The definitive guide to RBI-compliant digital lenders: Analyzing interest rates, understanding processing fees, and disbursal times.",
  },
  "/blogs/Loan-Vs-Card-Loan": {
    title: "Personal Loan vs Credit Card Loan: Which is Cheaper? | BanksCart",
    description: "Compare cash-in-hand personal loans against pre-approved loans on credit cards on interest rates, EMIs, and processing speed.",
  },
  "/blogs/No-CIBIL-Loan-Tricks": {
    title: "The No-CIBIL Code: Instant Loan Without a Credit Score | BanksCart",
    description: "Need emergency cash but have a low credit history? Learn how to legally secure instant loans without a traditional CIBIL score.",
  },
  "/blogs/Personal-Loan-Rates": {
    title: "Lowest Personal Loan Interest Rates in 2025: Top Banks | BanksCart",
    description: "Compare personal loan rates across public and private banks. Tips to qualify for prime lending rates starting under 10.5% p.a.",
  },
  "/blogs/Loan-Eligibility-Trick": {
    title: "10 Smart Ways to Reduce Your Personal Loan EMI Legally | BanksCart",
    description: "Save big on EMIs. Master balance transfers, rate renegotiations, and systematic part-payments to clear your debt faster.",
  },
  "/blogs/Personal-Loan-Balance-Transfer": {
    title: "Personal Loan Balance Transfer: Benefits & Step-by-Step | BanksCart",
    description: "Lower your monthly EMIs. Learn how to transfer your active high-interest loan to a new bank offering competitive rates.",
  },
  "/blogs/Home-Loan-Comparison": {
    title: "Home Loan Rates 2025 Comparison: SBI vs HDFC vs ICICI | BanksCart",
    description: "Side-by-side comparison of India's top home lenders. Check processing charges, LTV ratios, and floating vs fixed options.",
  },
  "/blogs/Low-Salary-Home-Loan-Guide": {
    title: "Low Salary Home Loan Guide: Eligibility Hacks & Tips | BanksCart",
    description: "Income under ₹25k? Discover co-borrower secrets, joint home loans, and smaller finance banks that support budget home purchases.",
  },
  "/blogs/Home-Loan-Mistakes": {
    title: "Top 10 Mistakes to Avoid When Applying for a Home Loan | BanksCart",
    description: "Avoid costly house purchase traps. Check property title validation, hidden builder tie-ups, and floating rate adjustments.",
  },
  "/blogs/PMAY": {
    title: "PMAY Subsidy 2026: Eligibility, Benefits & Latest News | BanksCart",
    description: "Complete guide on the Pradhan Mantri Awas Yojana housing subsidy. Learn how to claim up to ₹2.67 Lakh in credit interest subsidies.",
  },
  "/blogs/Rent-Vs-Buy-2026": {
    title: "Rent vs Buy: What Should You Choose in 2026? | BanksCart",
    description: "Is renting smarter than buying a house in major Indian metros? Let the data speak: comparative analysis of yields and home prices.",
  },
  "/blogs/Startup-Loan-Blueprint": {
    title: "Best Small Business Loans for Startups: 2026 Guide | BanksCart",
    description: "Secure funding for your new startup. Explore CGTMSE collateral-free startup loans, MUDRA loans, and venture debt options.",
  },
  "/blogs/MSME-Loan-Without-Collateral": {
    title: "MSME Loan Without Collateral: The Business Blueprint | BanksCart",
    description: "Grow your business. Explore credit schemes, government collateral-free programs, and top lender terms for MSMEs.",
  },
  "/blogs/Business-Loan-Eligibility": {
    title: "Improve Business Loan Eligibility Fast: 8 Smart Fixes | BanksCart",
    description: "Get approved for higher limits. Rapid fixes to optimize debt-service coverage ratios, bank statements, and tax credit history.",
  },
  "/blogs/Vehicle-Financing-Guide": {
    title: "Ultimate Car & Bike Financing Guide: Rate Secrets & Hacks | BanksCart",
    description: "Avoid dealer markups. Master the art of auto financing, compare new vs used vehicle rates, and discover peak EMI savings.",
  },
  "/blogs/Car-Loan-Rates-2026": {
    title: "Best Car Loan Interest Rates in India 2026: Compare | BanksCart",
    description: "Apply for a car loan online. Detailed analysis of zero-downpayment financing, processing fees, and top car loan interest rates.",
  },
  "/blogs/Used-Car-Loan-Guide": {
    title: "How to Buy a Used Car With a Loan: Buyer’s Guide | BanksCart",
    description: "Finance a pre-owned car. Navigate physical valuation certificates, transfer RTO hypothecation, and secure lowest rates.",
  },
  "/blogs/Bike-Loan-Eligibility": {
    title: "Bike Loan Eligibility Guide: Secure Low EMI Bike Loans | BanksCart",
    description: "Compare two-wheeler loans. Master credit eligibility limits, processing times, and downpayment requirements for top sports bikes.",
  },
  "/blogs/Car-Loan-100-Percent-Finance": {
    title: "Zero Down Payment Car Loans: Get 100% Funding Guide | BanksCart",
    description: "Blueprint to secure 100% on-road funding for your new car. Learn how banks assess eligibility for zero-downpayment car loans.",
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
    title: "Disclaimer & Terms | BanksCart",
    description: "Financial disclaimer regarding loan comparisons, mock calculators, and bank interest rates presented on BanksCart.",
  },
  "/intellectual-policy": {
    title: "Intellectual Property Policy | BanksCart",
    description: "Read about copyright compliance, trademarks, and protected content belonging to BanksCart.",
  },
  "/sitemap": {
    title: "Sitemap: Navigate All Pages & Calculators | BanksCart",
    description: "Sitemap containing all credit cards, personal loans, calculators, financial resources, and banking guides on BanksCart.",
  },
  "/credit-cards": {
    title: "Apply for Best Credit Cards Online | BanksCart",
    description: "Compare rewards, cashback, and travel benefits on premium credit cards. Quick digital application and approval.",
  }
};

export default function SEOManager() {
  const { pathname } = useLocation();
  
  // 1. Check for exact path match
  let meta = SEO_MAP[pathname];

  // 2. If no exact match, check for calculators (which all end in '-calculator' or contain 'calculator')
  if (!meta) {
    if (pathname.includes('calculator')) {
      const cleanName = pathname
        .replace('/', '')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
      meta = {
        title: `${cleanName}: Free Online Financial Planning Tool | BanksCart`,
        description: `Use the free online ${cleanName} to estimate monthly payments, interest charges, and plan your savings goals instantly on BanksCart.`,
      };
    }
  }

  // 2.5 Check for dynamic personal loan sub-paths
  if (!meta && pathname.startsWith('/loans/personal/')) {
    const subSlug = pathname.replace('/loans/personal/', '');
    const cleanName = subSlug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    meta = {
      title: `${cleanName}: Compare Interest Rates & Apply Online | BanksCart`,
      description: `Get details on ${cleanName}. Compare interest rates, processing fees, dynamic terms, and verify eligibility for paperless approvals.`,
      keywords: `${subSlug}, ${cleanName} online, apply ${subSlug}, cheap personal loan`
    };
  }

  // 3. Fallback to default if still not found
  if (!meta) {
    // Skip dynamic sanity blogs since BlogPost.tsx renders its own Helmet
    if (pathname.startsWith('/blog/')) {
      return null;
    }
    
    // Skip dynamic bank details page since BankDetails.tsx renders its own Helmet
    if (pathname.startsWith('/bank-details/')) {
      return null;
    }

    meta = {
      title: "BanksCart - Compare Loan Interest Rates & Apply Online",
      description: "Compare loan interest rates from top Indian banks. Find the best personal loan, home loan, and business loan rates. Apply online with instant eligibility check.",
    };
  }

  const currentUrl = `https://bankscart.com${pathname}`;

  // 4. Generate JSON-LD Schema dynamically
  const jsonLd = React.useMemo(() => {
    // A. For financial products and calculators
    if (pathname.startsWith('/loans/') || pathname.startsWith('/cards/') || pathname.startsWith('/ssy-calculator') || pathname.includes('calculator')) {
      const isCalculator = pathname.includes('calculator') || pathname.startsWith('/ssy-calculator');
      return {
        "@context": "https://schema.org",
        "@type": isCalculator ? "FinancialProduct" : "InvestmentOrDepositProduct",
        "name": meta?.title || "BanksCart Financial Product",
        "description": meta?.description || "",
        "url": currentUrl,
        "provider": {
          "@type": "Organization",
          "name": "BanksCart",
          "url": "https://bankscart.com"
        }
      };
    }

    // B. For static blog articles
    if (pathname.startsWith('/blogs/')) {
      return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `What is discussed in this guide about ${meta?.title || 'banking'}?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": meta?.description || ""
            }
          }
        ]
      };
    }

    // C. Default Organization Schema for homepage
    if (pathname === '/') {
      return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "BanksCart",
        "url": "https://bankscart.com",
        "logo": "https://bankscart.com/favicon-32x32.png",
        "description": meta?.description || "",
        "sameAs": [
          "https://twitter.com/bankscart",
          "https://facebook.com/bankscart"
        ]
      };
    }

    return null;
  }, [pathname, meta, currentUrl]);

  return (
    <Helmet>
      {/* Standard SEO */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}

      {/* OpenGraph (Facebook/LinkedIn) */}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://bankscart.com/favicon-32x32.png" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content="https://bankscart.com/favicon-32x32.png" />

      {/* Canonical Link */}
      <link rel="canonical" href={currentUrl} />

      {/* Dynamic JSON-LD Structured Data Schema */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
