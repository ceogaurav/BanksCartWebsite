import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, BookOpen, ChevronRight, Landmark, CreditCard, ShieldCheck, TrendingUp, Calculator, FileText, ArrowUpRight, AlertCircle, HeartPulse } from 'lucide-react';

interface DirectoryLink {
  name: string;
  href: string;
  desc: string;
  badge?: string;
}

interface DirectoryCategory {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  colorClass: string;
  accentClass: string;
  links: DirectoryLink[];
}

const FinancialDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories: DirectoryCategory[] = [
    {
      id: "aadhar",
      title: "Aadhaar Card Services Hub",
      desc: "UIDAI registrations, status tracking, biometric security, and local Seva Kendras directories.",
      icon: <ShieldCheck className="w-5 h-5" />,
      colorClass: "from-slate-800 via-indigo-900 to-slate-900 text-indigo-400 border-indigo-500/20",
      accentClass: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      links: [
        { name: "Aadhaar Portal Overview", href: "/aadhar-card", desc: "Complete official UIDAI guide to dynamic identity services." },
        { name: "Address Validation Request", href: "/aadhar-card/aadhaar-address-validation-letter-request", desc: "Update your Aadhaar address online without traditional physical proof." },
        { name: "Authentication Logs Guide", href: "/aadhar-card/aadhaar-authentication", desc: "Biometric e-KYC structures and direct database queries overview." },
        { name: "Authentication History", href: "/aadhar-card/aadhaar-authentication-history", desc: "Audit past six months' verification logs and block credit leaks." },
        { name: "Download & Print Aadhaar", href: "/aadhar-card/aadhaar-card-download-print", desc: "Generate secure password-protected e-Aadhaar PDFs instantly." },
        { name: "NRI Aadhaar Card Guide", href: "/aadhar-card/aadhaar-card-for-non-resident-indian", desc: "Enrolment eligibility rules and overseas passport mapping guides." },
        { name: "Official Application Form", href: "/aadhar-card/aadhar-form", desc: "Direct official download links for physical center updates." },
        { name: "Latest Policy News Room", href: "/aadhar-card/news", desc: "UIDAI amendments, free updates windows, and biometric age slabs." },
        { name: "PDF Password Unlock Guide", href: "/aadhar-card/aadhaar-card-password", desc: "Unlocking downloaded e-Aadhaar files under name and birth year combinations." },
        { name: "All Online Services List", href: "/aadhar-card/aadhaar-card-services", desc: "Comprehensive categorized catalog of official digital portals." },
        { name: "Demographic Corrections", href: "/aadhar-card/aadhaar-card-update-correction", desc: "Changing name spellings, dates of birth, and genders physically." },
        { name: "Aadhaar Card Verification", href: "/aadhar-card/aadhaar-card-verification", desc: "Verify card authenticity, home states, and active mobile digits." },
        { name: "J&K Aadhaar Centers", href: "/aadhar-card/aadhaar-centre-in-jammu-and-kashmir", desc: "Municipal and post-office directory for Jammu & Kashmir." },
        { name: "Correction Form Blueprint", href: "/aadhar-card/aadhaar-correction-form", desc: "Step-by-step instructions to fill out correction sheets cleanly." },
        { name: "Paperless e-KYC & XML", href: "/aadhar-card/aadhaar-kyc", desc: "Generate offline XML files and secure QR codes for bank KYC." },
        { name: "Permanent Centers Guide", href: "/aadhar-card/aadhaar-card-enrolment-centre", desc: "Locate permanent bank-run and post-office update desks." },
        { name: "How to Fill Enrolment Form", href: "/aadhar-card/how-to-fill-aadhaar-enrolment-form", desc: "Prevent transcription rejects by using block capital rules." },
        { name: "Dedicated Seva Kendras (ASK)", href: "/aadhar-card/aadhaar-seva-kendra", desc: "Dedicated high-capacity computerized UIDAI-run corporate hubs." },
        { name: "Aadhaar Update History", href: "/aadhar-card/aadhaar-update-history", desc: "Auditing previous lifetime demographic revisions online." },
        { name: "Helpline Directories (1947)", href: "/aadhar-card/aadhar-card-customer-care-number", desc: "Regional support helpdesks, central emails, and RBI ombudsman links." },
        { name: "Digital Signature Validator", href: "/aadhar-card/aadhar-card-signature", desc: "Validating Adobe green checkmarks for official dossiers." },
        { name: "Kolkata Aadhaar Centers", href: "/aadhar-card/aadhar-card-centers-in-kolkata", desc: "UIDAI registered update points in Kolkata municipal wards." },
        { name: "Chennai Aadhaar Centers", href: "/aadhar-card/aadhaar-card-centers-in-chennai", desc: "Locker and update offices directory in Chennai." },
        { name: "Gurgaon Aadhaar Centers", href: "/aadhar-card/aadhaar-card-centers-in-gurgaon", desc: "Corporate-run update kiosks in Gurgaon city." },
        { name: "Guwahati Aadhaar Centers", href: "/aadhar-card/aadhaar-card-centers-in-guwahati", desc: "District and municipal Seva desks in Guwahati." },
        { name: "Noida Aadhaar Centers", href: "/aadhar-card/aadhar-card-centers-in-noida", desc: "Post office and bank branches update points in Noida." }
      ]
    },
    {
      id: "banking",
      title: "Scheduled & Private Banking Portals",
      desc: "Abhyudaya Co-Operative, Adani Finance portals, savings accounts, net banking, and branch timings.",
      icon: <Landmark className="w-5 h-5" />,
      colorClass: "from-emerald-950 via-teal-900 to-slate-950 text-emerald-400 border-emerald-500/20",
      accentClass: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      links: [
        { name: "Abhyudaya Bank Profile", href: "/abhyudaya-co-operative-bank", desc: "Complete multi-state Scheduled Co-operative banking profile." },
        { name: "Abhyudaya 24/7 Helpline", href: "/abhyudaya-co-operative-bank/customer-care", desc: "Toll-free board lines and hotlisting contact cards." },
        { name: "Education Loans Hub", href: "/abhyudaya-co-operative-bank/education-loan", desc: "Studies in India and abroad funding programs with post-study moratoriums." },
        { name: "High-Yield Fixed Deposits", href: "/abhyudaya-co-operative-bank/fixed-deposits", desc: "Book cumulative and non-cumulative deposits up to 7.25% p.a." },
        { name: "Grievance Redressal Matrix", href: "/abhyudaya-co-operative-bank/grievance-redressal-escalation-matrix", desc: "Level-by-level escalation to regional heads and RBI Ombudsman." },
        { name: "Personal Loans Desk", href: "/abhyudaya-co-operative-bank/personal-loan", desc: "Unsecured reducing balance multi-purpose credit lines up to ₹15 Lakhs." },
        { name: "Savings Accounts Tiers", href: "/abhyudaya-co-operative-bank/savings-account", desc: "High-yield digital accounts, MAB guidelines, and free RuPay cards." },
        { name: "Business & MSME Loans", href: "/abhyudaya-co-operative-bank/business-loan", desc: "Working capital Cash Credits and collateral-free Mudra backing." },
        { name: "Home Loans Mortgage", href: "/abhyudaya-co-operative-bank/home-loan", desc: "Floating housing finance up to 30 years with LTV up to 90%." },
        { name: "Mortgage Support Desk", href: "/abhyudaya-co-operative-bank/home-loan-customer-care", desc: "Interest certificates downloads and balance transfer queries." },
        { name: "Net Banking Security Guide", href: "/banking/abhyudaya-bank-net-banking", desc: "Access accounts, reset passwords, and transfer NEFT/IMPS securely." },
        { name: "Branch Working Hours", href: "/banking/abhyudaya-bank-timings", desc: "Opening schedules, cash transaction slots, and rotational lunch breaks." },
        { name: "Adani Capital SME Loans", href: "/business-loan/adani-capital", desc: "Unsecured micro retail capital and agro vehicle finance." },
        { name: "Adani Housing Finance", href: "/home-loan/adani-housing-finance", desc: "Affordable housing mortgages and flexible self-employed evaluation." },
        { name: "Accounts Payable (AP)", href: "/banking/accounts-payable", desc: "Complete corporate accounting and treasury cash flow guidelines." },
        { name: "Account to Account Money Transfer", href: "/money-transfer/account-to-account-money-transfer", desc: "Reconcile processing times and limits across IMPS, NEFT, and RTGS." },
        { name: "Apparel Export Promotion Council", href: "/promotion-councils/apparel-export-promotion-council-aepc", desc: "National textile export promotions, subventions, and exporter guide slabs." },
        { name: "Agarbatti Manufacturing Mudra", href: "/business-loan/agarbatti-making-business", desc: "Start micro Agarbatti trading with collateral-free Mudra credit up to ₹10 Lakhs." },
        { name: "Agriculture Crop Loan Guide", href: "/personal-loan/agriculture-loan", desc: "Subsidized farm cultivation credits and Kisan Credit Card (KCC) limits." },
        { name: "Agri-Business Startup Finance", href: "/business-loan/agriculture-business-plan", desc: "Detailed business blueprints for securing NABARD priority sector grants." },
        { name: "Agriculture Gold Loan Subsidies", href: "/gold-loan/agriculture", desc: "Pledge gold ornaments to receive rapid cultivation cash at flat 7.00% p.a." },
        { name: "Agri Crop Interest Rates Table", href: "/personal-loan/agriculture-loan-interest-rates", desc: "Compare prompt repayment subventions across public and private banks." }
      ]
    },
    {
      id: "loans-cibil",
      title: "Loans & CIBIL Bureau Insights",
      desc: "Free CIBIL checks, PAN validation guides, high-ticket personal credit lines, and eligibility builders.",
      icon: <TrendingUp className="w-5 h-5" />,
      colorClass: "from-blue-900 via-indigo-950 to-slate-950 text-blue-400 border-blue-500/20",
      accentClass: "bg-blue-500/10 text-blue-400 border-blue-500/30",
      links: [
        { name: "Check Free Credit Score", href: "/credit-score", desc: "Check credit scores across all 4 bureaus online with monthly updates." },
        { name: "Free CIBIL Report Portal", href: "/cibil-credit-report", desc: "Detailed credit audit log checking payment defaults." },
        { name: "CIBIL Check by PAN Card", href: "/cibil/how-to-check-cibil-score-by-pan-card", desc: "Skip security questions by using secure PAN database matches." },
        { name: "SBI CIBIL Score Metrics", href: "/cibil-report/cibil-score-sbi-loans", desc: "Uncover mandatory score tiers to secure cheapest SBI mortgages." },
        { name: "7 Steps to Improve CIBIL", href: "/credit-report/ways-to-improve-your-cibil-score", desc: "Practical credit repair blueprints to boost rating to 750+." },
        { name: "Personal Loan CIBIL Rules", href: "/credit-score/cibil-score-for-personal-loan", desc: "How score drops shift loan yields and boost reject probabilities." },
        { name: "Resolve CIBIL Dispute logs", href: "/cibil/how-to-resolve-cibil-dispute", desc: "Rectify wrong bureau records and clear duplicate account tags." },
        { name: "Personal Loans Overview", href: "/loans/personal", desc: "Compare best personal loans from 40+ banks entirely online." },
        { name: "Aadhaar Card Loan", href: "/personal-loan/aadhar-card-loan", desc: "Unsecured personal credits processed using biometric e-KYC profiles." },
        { name: "₹1 Crore Personal Loan", href: "/personal-loan/1-crore-personal-loan-plamt", desc: "Premium ultra-high-ticket credit lines for high-salary profiles." },
        { name: "₹30 Lakh Personal Loan", href: "/personal-loan/30-lakh-personal-loan-plamt", desc: "High-value unsecured credit comparing HDFC, ICICI, and SBI." },
        { name: "Pre-approved Loan Secrets", href: "/6-key-insights-know-pre-approved-personal-loans", desc: "Master instant pre-approved digital releases and prevent traps." },
        { name: "Low-Salary Home Loans", href: "/blogs/Low-Salary-Home-Loan-Guide", desc: "Co-borrower additions and state subsidies for low salary brackets." },
        { name: "Collateral-Free MSME Credit", href: "/blogs/MSME-Loan-Without-Collateral", desc: "Sovereign CGTMSE guarantees and Udyam paper concessions." },
        { name: "Startup Loan Blueprint", href: "/blogs/Startup-Loan-Blueprint", desc: "Secure initial debt financing for new ventures." },
        { name: "Aditya Birla Marriage Loan", href: "/personal-loan/aditya-birla-finance-limited-marriage-loan", desc: "Instant wedding funding up to ₹15 Lakhs under reducing interest rates." },
        { name: "Aditya Birla Securities Overdraft", href: "/loan-against-securities/mutual-funds/aditya-birla-finance", desc: "Secure instant overdraft limits by pledging mutual funds and shares." },
        { name: "Aditya Birla Personal Loan", href: "/aditya-birla/personal-loan", desc: "Flexible unsecured personal credit lines up to ₹50 Lakhs processed digitally." },
        { name: "Personal Loan Documents Check", href: "/aditya-birla/personal-loan-documents-required", desc: "Complete checklists of KYC, income, and bank statement proofs." },
        { name: "Aditya Birla Personal Loan EMI", href: "/aditya-birla/personal-loan-emi-calculator", desc: "Simulate EMI amounts and compile reducing interest amortizations." },
        { name: "Aditya Birla Foreclosure Policy", href: "/personal-loan/aditya-birla-finance-limited-personal-loan-foreclosure-charges", desc: "Track lock-in periods, pre-payment slabs, and interest saving rules." },
        { name: "Aditya Birla Home Loan mortgage", href: "/aditya-birla/home-loan", desc: "Housing mortgages with flexible LTV up to 90% and tenure up to 30 years." },
        { name: "Aditya Birla Home Loan Interest", href: "/aditya-birla/home-loan-interest-rates", desc: "Track floating interest matrices for salaried and self-employed applicants." },
        { name: "Loan Against Property (LAP)", href: "/aditya-birla/loan-against-property", desc: "High-value commercial and residential mortgage credits up to ₹10 Crores." }
      ]
    },
    {
      id: "wealth-insurance",
      title: "Wealth, Investments & Pension Portals",
      desc: "Aditya Birla Sun Life wealth boosters, pension annuities, term insurance, and sectoral mutual funds.",
      icon: <BookOpen className="w-5 h-5" />,
      colorClass: "from-amber-950 via-red-950 to-slate-950 text-amber-400 border-amber-500/20",
      accentClass: "bg-amber-500/10 text-amber-400 border-amber-500/30",
      links: [
        { name: "Aditya Birla Capital Overview", href: "/aditya-birla", desc: "Corporate NBFC profile mapping credit and insurance systems." },
        { name: "Aditya Birla SME Loans", href: "/aditya-birla/business-loan", desc: "Collateral-free commercial term credit up to ₹50 Lakhs." },
        { name: "Aditya Birla SME Loan Rates", href: "/aditya-birla/business-loan-interest-rate", desc: "Detailed factors influencing commercial baseline interest margins." },
        { name: "Empower Pension Single Premium", href: "/aditya-birla-sun-life-pension-plans/empower-pension-sp-plan", desc: "Deposit lump-sum single premium in high-yield market funds." },
        { name: "Empower Pension Regular Plan", href: "/aditya-birla-sun-life-pension-plans/absli-empower-pension-plan", desc: "Cultivate periodic regular savings habits to secure retirement." },
        { name: "ABSLI Wealth Max Single ULIP", href: "/absli-wealth-max-plan", desc: "Combine wealth generation with high-fidelity life cover in one premium." },
        { name: "Wealth Secure Regular ULIP", href: "/wealth-secure-plan", desc: "Dynamic assets allocator protects yields as policy maturity nears." },
        { name: "Protector Plus Term Cover", href: "/protector-plus", desc: "Highly affordable pure term protection shielding family liabilities." },
        { name: "Activ Health Wellness Shield", href: "/aditya-birla-activ-health", desc: "Earn up to 100% premium cash return through active lifestyle steps." },
        { name: "ABSL PSU Equity Mutual Fund", href: "/mutual-funds/aditya-birla-amc-launches-aditya-birla-sun-life-psu-equity-fund", desc: "High-yield open-ended sectoral mutual fund investing in gov giants." },
        { name: "Fixed Deposits Portal", href: "/investment/fixed-deposit", desc: "Guaranteed locked-in yields comparing top commercial banks." },
        { name: "Mutual Funds Portal", href: "/investment/mutual-funds", desc: "SIP & lump-sum direct mutual funds from leading asset managers." },
        { name: "ABSL Flexi Cap Fund Growth", href: "/mutual-funds/aditya-birla-sun-life-flexi-cap-fund-regular-plan-growth", desc: "Open-ended equity fund investing dynamically across all market caps." },
        { name: "ABSL Nifty Next 50 ETF NFO", href: "/mutual-funds/aditya-birla-sun-life-mf-launches-nfo-nifty-next-50-etf", desc: "Low-cost index exchange-traded fund tracking high-potential bluechips." },
        { name: "ABSL Midcap Fund Growth", href: "/mutual-funds/aditya-birla-sun-life-midcap-fund-regular-plan-growth", desc: "Focuses on high-yield mid-sized enterprise compounding over 5+ years." },
        { name: "ABSL Multi Cap Fund Growth", href: "/mutual-funds/aditya-birla-sun-life-multi-cap-fund-regular-plan-growth", desc: "Mandated 25% distribution across large, mid, and small cap sectors." },
        { name: "ABSL Bal Bhavishya Yojna NFO", href: "/mutual-funds/aditya-birla-sun-life-mutual-fund-announces-bal-bhavishya-yojna-nfo", desc: "Solution-oriented child savings plan with a 5-year lock-in period." },
        { name: "Birla Sun Life Mutual Fund Hub", href: "/mutual-funds/birla-sun-life-mutual-fund", desc: "Comprehensive portal listing direct SIP and lump-sum investment schemes." },
        { name: "ABSL PSU Equity Regular Growth", href: "/mutual-funds/aditya-birla-sun-life-psu-equity-fund-regular-plan-growth", desc: "Government sector monopolies fund offering solid high-dividend yields." },
        { name: "ABSL Small Cap Fund Growth", href: "/mutual-funds/aditya-birla-sun-life-small-cap-fund-regular-plan-growth", desc: "Aggressive small enterprise portfolio capturing economic expansions." },
        { name: "ABSL Pension Fund (NPS)", href: "/saving-schemes/aditya-birla-sun-life-pension-fund", desc: "Low-cost National Pension System fund manager under Section 80CCD." },
        { name: "ABSL Sun Life Pension Portal", href: "/aditya-birla-sun-life-pension-plans", desc: "Retirement annuity plans offering guaranteed regular income payouts." }
      ]
    },
    {
      id: "cards-tax",
      title: "Premium Cards & Taxation Portals",
      desc: "Adani co-branded airport lounge cards, family add-on limits, GST council logs, and Aaykar Setu app.",
      icon: <CreditCard className="w-5 h-5" />,
      colorClass: "from-indigo-950 via-purple-950 to-slate-950 text-indigo-400 border-indigo-500/20",
      accentClass: "bg-indigo-500/10 text-indigo-400 border-indigo-500/30",
      links: [
        { name: "Adani One ICICI Travel Card", href: "/icici-bank/adani-one-credit-cards", desc: "Earn massive flight reward multipliers and airport duty-free cashbacks." },
        { name: "Adani One Signature Travel Card", href: "/icici-bank/adani-one-signature-credit-card", desc: "HNW signature card offering unlimited luxury airport lounge access." },
        { name: "Aditya Birla AU Credit Card", href: "/au-small-finance-bank/aditya-birla-finance-au-credit-cards", desc: "Fuel rewards and lifestyle milestones co-branded with AU bank." },
        { name: "Add-On Credit Cards Guide", href: "/credit-card/add-on-card", desc: "Extend primary credit limit and card privileges to family free." },
        { name: "Credit Cards Finder Utility", href: "/credit-card-finder", desc: "Search and filter cards by spending categories and rewards." },
        { name: "37th GST Council Resolutions", href: "/tax/37th-gst-council-meeting", desc: "Hotel tariff rate cuts, diamond work reliefs, and exporter limits." },
        { name: "38th GST Council Resolutions", href: "/tax/38th-gst-council-meeting", desc: "Unified 28% lottery tax votes, long-term lease waivers, and late GSTR-1 cuts." },
        { name: "Aaykar Setu Mobile App", href: "/tax/aaykar-setu-income-tax-mobile-app", desc: "Official income tax app detail guides, TRP locator, and live chat desks." },
        { name: "Income Tax Portal Guide", href: "/resources/income-tax", desc: "Regime analysis, Form 16 guidelines, and filing timelines." },
        { name: "PPF Account Schemes", href: "/resources/ppf", desc: "Public Provident Fund interest rates compounding and EEE tax benefits." },
        { name: "Aditya Birla SBI Credit Cards", href: "/sbi-bank/adtiya-birla-sbi-cards", desc: "Earn double rewards on daily shopping co-branded with SBI." },
        { name: "Aditya Birla SBI Card Select", href: "/sbi-bank/aditya-birla-sbi-card-select", desc: "Elite lifestyle card offering Priority Pass lounge entries and welcome vouchers." },
        { name: "Advance Tax Guidelines", href: "/tax/advance-tax", desc: "Direct tax calendars, quarterly percentages, and delay penalties." },
        { name: "Pros & Cons of Credit Cards", href: "/credit-card/advantages-and-disadvantages-of-credit-card", desc: "Master interest-free cycles, credit utilization limits, and score building." }
      ]
    },
    {
      id: "tools",
      title: "EMI Calculators & Financial Tools",
      desc: "Simulate and calculate your home, personal, and car loan payments with detailed amortizations.",
      icon: <Calculator className="w-5 h-5" />,
      colorClass: "from-slate-800 via-slate-900 to-zinc-950 text-slate-400 border-slate-500/20",
      accentClass: "bg-slate-500/10 text-slate-400 border-slate-500/30",
      links: [
        { name: "Personal Loan EMI Calculator", href: "/personal-loan-emi-calculator", desc: "Compute monthly personal loan EMI and amortization tables instantly." },
        { name: "Home Loan EMI Calculator", href: "/home-loan-emi-calculator", desc: "Check long-term housing mortgage payments and interest splits." },
        { name: "Car Loan EMI Calculator", href: "/car-loan-emi-calculator", desc: "Simulate vehicle purchase EMI payouts and downpayment options." },
        { name: "Income Tax Calculator 2026", href: "/income-tax-calculator", desc: "Instantly compare tax structures under Old vs New regimes." },
        { name: "Comprehensive Mortgage Calculator", href: "/MortgageCalculatorPage", desc: "Advanced property evaluation tool including taxes and insurance." },
        { name: "National IFSC Finder", href: "/resources/ifsc-finder", desc: "Search active RBI IFSC and MICR codes for all banks instantly." },
        { name: "Live Gold Rates Checker", href: "/resources/gold-rates", desc: "Track 22K and 24K market gold rates across major cities in India." },
        { name: "National Pincodes Directory", href: "/resources/pincodes", desc: "Verify city zip codes and localized postal courier coverages." }
      ]
    },
    {
      id: "life-health-insurance",
      title: "Life & Health Protection Insurance",
      desc: "Aegon term plans, iMaximize ULIP savings, group cashless policies, and chronic disease heart & diabetic covers.",
      icon: <HeartPulse className="w-5 h-5" />,
      colorClass: "from-rose-950 via-slate-900 to-zinc-950 text-rose-450 border-rose-500/20",
      accentClass: "bg-rose-500/10 text-rose-400 border-rose-500/30",
      links: [
        { name: "Group Active Health Shield", href: "/group-active-health", desc: "Corporate cashless health covers up to 100% premium return rewards." },
        { name: "Group Activ Secure Shield", href: "/group-activ-secure", desc: "Fixed personal accident and critical illness payouts for corporate staffs." },
        { name: "Group Health Policy Guide", href: "/group-health-insurance", desc: "Customizable company health insurance including immediate pre-existing covers." },
        { name: "Asthma Medical Cover", href: "/health-insurance-asthma", desc: "Specialized cashless policies with zero waiting cycles for chronic asthma." },
        { name: "Diabetes Cashless Care", href: "/health-insurance-diabetes", desc: "Dedicated diabetic insurance protecting outpatient glucose monitoring costs." },
        { name: "High Blood Pressure Protection", href: "/health-insurance-high-blood-pressure", desc: "Shield cardiovascular diagnostic outgos and regular medicine bills." },
        { name: "High Cholesterol Health Cover", href: "/health-insurance-high-cholesterol", desc: "Cashless hospitalization shields covering lipid and heart therapies." },
        { name: "Insurance Login & Tracking", href: "/login-and-registration-process", desc: "Customer digital claims desk, cashless approvals, and certificate downloads." },
        { name: "Aegon Life Child Plans", href: "/aegon-life-child-plans", desc: "Double benefit child security plans covering academic milestones." },
        { name: "Aegon Support Helplines", href: "/aegon-life-customer-care", desc: "Toll-free desks, NRI helpdesks, and nominee death claims registers." },
        { name: "Aegon Life Easy Protect", href: "/life-easy-protect-insurance-plan", desc: "Highly affordable pure term protection designed for young earners." },
        { name: "Aegon Future Protect Term", href: "/future-protect-insurance-plan", desc: "Sizable sum assured payouts protecting family debts at cheap rates." },
        { name: "Aegon Future Protect Plus", href: "/future-protect-plus-insurance-plan", desc: "Pure life insurance shield offering 100% return of paid premiums." },
        { name: "Aegon Guaranteed Growth Saver", href: "/aegon-life-guaranteed-growth-insurance-plan", desc: "Non-linked savings endowment compounding tax-free maturities." },
        { name: "Aegon Life iGuarantee Plan", href: "/aegon-life-iguarantee-insurance", desc: "High-compounding annual growth returns guaranteed under lock-in terms." },
        { name: "Aegon iMaximize ULIP Regular", href: "/imaximize-insurance-plan", desc: "Invest regular premiums dynamically across market funds with zero allocation fees." },
        { name: "Aegon iMaximize Single ULIP", href: "/imaximize-single-premium-insurance-plan", desc: "Deposit single lump-sum in high-equity funds with instant life cover." },
        { name: "Aegon Retirement Pension Plans", href: "/pension-plans", desc: "Annuity programs guaranteeing post-retirement monthly cash payouts." },
        { name: "Aegon Rising Star Scholar", href: "/rising-star-insurance-plan", desc: "Child scholar investment ULIP offering premium waiver benefits." },
        { name: "Aegon Term Cover Catalog", href: "/term-insurance-plans", desc: "Pure term covers shielding home loans and lifestyle liabilities." }
      ]
    }
  ];

  // Search filtering logic
  const filteredCategories = categories.map(cat => {
    const filteredLinks = cat.links.filter(link => 
      link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.href.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...cat, links: filteredLinks };
  }).filter(cat => cat.links.length > 0);

  const getActiveCategories = () => {
    if (activeTab === 'all') return filteredCategories;
    return filteredCategories.filter(cat => cat.id === activeTab);
  };

  const totalPagesCount = categories.reduce((acc, cat) => acc + cat.links.length, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 font-sans relative overflow-hidden">
      
      {/* Decorative Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none"></div>

      {/* Decorative Radial Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Premium Dashboard Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider animate-pulse">
            <Sparkles className="w-4 h-4" />
            Interactive Control Hub
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
            Financial Directories
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed font-medium max-w-2xl mx-auto">
            Access over <span className="text-indigo-400 font-bold">{totalPagesCount}</span> highly detailed, content-rich financial portals. Navigate dynamically through verified loan parameters, interest slabs, and e-KYC databases.
          </p>
        </div>

        {/* Search and Category Tab Filters */}
        <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 rounded-3xl p-6 mb-12 shadow-2xl space-y-6">
          
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search through all registered financial services and indices instantly (e.g. 'Abhyudaya', 'Mudra', 'PAN')..."
              className="w-full pl-12 pr-6 py-4 bg-slate-950/70 border border-slate-800 focus:border-indigo-500/50 rounded-2xl outline-none text-slate-200 text-sm font-semibold tracking-wide shadow-inner focus:ring-2 focus:ring-indigo-500/15 transition-all"
            />
            {searchQuery && (
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-indigo-500/15 text-indigo-450 border border-indigo-500/30 rounded-lg px-2 py-0.5 text-[10px] font-bold">
                Matches Found: {getActiveCategories().reduce((acc, cat) => acc + cat.links.length, 0)}
              </span>
            )}
          </div>

          {/* Quick tab filters */}
          <div className="flex flex-wrap gap-2 border-t border-slate-800/60 pt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'all' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              All Categories ({totalPagesCount})
            </button>
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === cat.id ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {cat.icon}
                {cat.title.split(' ')[0]} ({cat.links.length})
              </button>
            ))}
          </div>

        </div>

        {/* Dynamic Categorized Links Grid */}
        <div className="space-y-12">
          {getActiveCategories().map((cat) => (
            <div key={cat.id} className="bg-slate-900/20 backdrop-blur-sm border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Category banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-850 pb-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-xl ${cat.accentClass} border`}>
                      {cat.icon}
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">{cat.title}</h2>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm font-medium">{cat.desc}</p>
                </div>
                <span className="self-start sm:self-center px-4 py-1.5 rounded-full bg-slate-950 text-slate-400 border border-slate-800 text-xs font-bold tracking-wider uppercase">
                  Active Pages: {cat.links.length}
                </span>
              </div>

              {/* Links list grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="group flex flex-col justify-between p-5 bg-slate-950/40 hover:bg-slate-950/80 border border-slate-900 hover:border-indigo-500/20 rounded-2xl hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-[80px] h-[80px] bg-indigo-500/5 rounded-bl-full transform translate-x-4 -translate-y-4 group-hover:scale-150 transition-transform duration-300"></div>
                    <div className="space-y-2 relative z-10">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-white group-hover:text-indigo-400 text-sm sm:text-base leading-snug tracking-tight transition-colors">
                          {link.name}
                        </h4>
                        <ArrowUpRight className="w-4 h-4 text-slate-650 group-hover:text-indigo-400 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0" />
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed font-sans font-medium line-clamp-2">
                        {link.desc}
                      </p>
                    </div>
                    <div className="pt-4 mt-auto flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-600 relative z-10 border-t border-slate-900/50">
                      <span className="font-mono text-slate-500 break-all">{link.href}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transform group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>

            </div>
          ))}

          {getActiveCategories().length === 0 && (
            <div className="bg-slate-900/30 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
              <div className="w-12 h-12 bg-slate-800 text-slate-400 rounded-full flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">No Registered Pages Match Your Search Query</h3>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                Try searching for broader terms like 'Aadhaar', 'FD', 'Pension', 'Abhyudaya', 'Credit Card', or check your spelling.
              </p>
              <button
                onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Clear Search & Filters
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default FinancialDirectory;
