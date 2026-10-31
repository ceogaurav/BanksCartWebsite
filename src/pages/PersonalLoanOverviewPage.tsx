import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ShieldCheck,
  Calculator,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Building2,
  FileText,
  BadgePercent,
  Check,
  Scale,
  TrendingDown,
  Info,
  HelpCircle,
  Layers,
  Award
} from 'lucide-react';

interface PersonalLoanOverviewPageProps {
  openApplyModal?: (loanType?: string) => void;
  openEligibilityModal?: (loanType?: string) => void;
  openCibilModal?: () => void;
}

interface BankOffer {
  name: string;
  rateRange: string;
  processingFee: string;
  maxAmount: string;
  maxTenure: string;
  highlight: string;
  bestFor: string;
}

const TOP_BANKS: BankOffer[] = [
  {
    name: "State Bank of India (SBI)",
    rateRange: "10.30% - 15.10% p.a.",
    processingFee: "Up to 1.50% (Min ₹1,000) + GST",
    maxAmount: "Up to ₹20 Lakhs",
    maxTenure: "Up to 72 Months",
    highlight: "Lowest processing fee concessions for salary package customers",
    bestFor: "PSU & Government Employees"
  },
  {
    name: "HDFC Bank",
    rateRange: "10.50% - 21.00% p.a.",
    processingFee: "Up to 2.50% (Min ₹1,999) + GST",
    maxAmount: "Up to ₹40 Lakhs",
    maxTenure: "Up to 72 Months",
    highlight: "Pre-approved 10-second instant disbursals for existing account holders",
    bestFor: "Tier-1 Corporate Salaried"
  },
  {
    name: "ICICI Bank",
    rateRange: "10.65% - 16.00% p.a.",
    processingFee: "Up to 2.50% + GST",
    maxAmount: "Up to ₹50 Lakhs",
    maxTenure: "Up to 72 Months",
    highlight: "100% paperless video-KYC and flexible pre-payment options",
    bestFor: "High-Ticket Borrowers"
  },
  {
    name: "Axis Bank",
    rateRange: "10.49% - 22.00% p.a.",
    processingFee: "Up to 2.00% + GST",
    maxAmount: "Up to ₹40 Lakhs",
    maxTenure: "Up to 60 Months",
    highlight: "Competitive reducing rates with quick digital verification",
    bestFor: "Competitive Balance Transfers"
  },
  {
    name: "Kotak Mahindra Bank",
    rateRange: "10.99% - 24.00% p.a.",
    processingFee: "Up to 3.00% + GST",
    maxAmount: "Up to ₹40 Lakhs",
    maxTenure: "Up to 72 Months",
    highlight: "Fast-track approval with transparent online tracking",
    bestFor: "Mid-Income Professionals"
  },
  {
    name: "Bank of Baroda",
    rateRange: "10.35% - 17.50% p.a.",
    processingFee: "1.00% - 2.00% + GST",
    maxAmount: "Up to ₹20 Lakhs",
    maxTenure: "Up to 60 Months",
    highlight: "Direct linkage to Baroda Repo Linked Lending Rate (BRLLR)",
    bestFor: "Low Floating Rates"
  },
  {
    name: "Punjab National Bank (PNB)",
    rateRange: "10.40% - 16.95% p.a.",
    processingFee: "Up to 1.00% + GST",
    maxAmount: "Up to ₹20 Lakhs",
    maxTenure: "Up to 60 Months",
    highlight: "Special interest concessions for public sector personnel",
    bestFor: "Public Sector & Defense"
  }
];

const FAQS = [
  {
    q: "What is the difference between a Reducing Balance Rate and a Flat Interest Rate?",
    a: "In a Flat Interest Rate loan, interest is calculated on the entire original principal amount throughout the tenure, which means your interest outgo remains high even as you repay the loan. In a Reducing Balance loan (which BanksCart recommends and top banks use), interest is recalculated every month solely on the remaining unpaid principal balance. For example, a 12% reducing rate on ₹5 Lakhs over 3 years costs ~₹98,350 in interest, whereas a 12% flat rate costs ₹1,80,000—costing you over ₹81,000 more!"
  },
  {
    q: "What is the minimum CIBIL credit score required for personal loan approval?",
    a: "Most leading Indian banks (like SBI, HDFC, and ICICI) prefer a CIBIL score of 720 and above to offer their lowest interest rates and waiver of administrative fees. Borrowers with scores between 650 and 719 can still secure approval from select banks and NBFCs, though they may face higher risk premiums (higher interest rates) or require a creditworthy co-applicant."
  },
  {
    q: "How much personal loan can I get based on my monthly salary?",
    a: "Lenders typically cap your loan eligibility using your Debt-to-Income (DTI) or Fixed Obligation to Income Ratio (FOIR). Generally, total monthly EMI commitments (including the proposed personal loan) should not exceed 40% to 50% of your net monthly take-home salary. As a general rule of thumb, eligible salaried individuals can secure personal loans equal to 10 to 25 times their net monthly salary."
  },
  {
    q: "Can I prepay or foreclose my personal loan early? Are there penalty charges?",
    a: "According to Reserve Bank of India (RBI) guidelines, banks and NBFCs cannot charge foreclosure or prepayment penalties on floating interest rate term loans sanctioned to individual borrowers. However, for fixed-rate personal loans, lenders may levy a foreclosure fee typically ranging from 2% to 4% + GST on the outstanding principal balance, often after a minimum lock-in period of 6 to 12 months."
  },
  {
    q: "Does checking my personal loan eligibility on BanksCart impact my credit score?",
    a: "No. Checking your loan options, comparing lender quotes, or evaluating your eligibility on BanksCart triggers only a 'Soft Inquiry'. Soft inquiries do not impact your CIBIL score in any way. A 'Hard Inquiry' is only conducted by a specific lender when you formally proceed with a final loan application."
  },
  {
    q: "Can self-employed individuals and business owners qualify for a personal loan?",
    a: "Yes. Self-employed individuals, doctors, chartered accountants, and business owners can qualify by submitting past 2 to 3 years' Income Tax Returns (ITR) with Computation of Income, CA-certified Profit & Loss statements and Balance Sheets, and active business vintage proof (GST registration or MSME Udyam registration)."
  },
  {
    q: "Are personal loan disbursements or deposits covered under DICGC insurance?",
    a: "No. Deposit Insurance and Credit Guarantee Corporation (DICGC) is an RBI subsidiary that specifically protects retail bank deposits (Savings Accounts, Fixed Deposits, Recurring Deposits) up to ₹5 Lakhs per depositor in the rare event of a bank failure. DICGC has zero connection with loan products or borrowings. Claims stating that personal loans carry DICGC insurance are factually incorrect."
  },
  {
    q: "What is the turnaround time for personal loan disbursal in India?",
    a: "Turnaround times depend on your borrower profile. Pre-approved personal loans for existing account holders with clean KYC can be disbursed within 10 seconds to a few hours online. For fresh applications requiring digital KYC, document upload, and bank statement analysis, disbursal typically takes between 24 and 48 business hours."
  }
];

export const PersonalLoanOverviewPage: React.FC<PersonalLoanOverviewPageProps> = ({
  openApplyModal,
  openEligibilityModal,
  openCibilModal
}) => {
  const navigate = useNavigate();

  // EMI Calculator States
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(10.5);
  const [tenureMonths, setTenureMonths] = useState<number>(36);

  // Eligibility Tab State: 'salaried' | 'selfEmployed'
  const [activeTab, setActiveTab] = useState<'salaried' | 'selfEmployed'>('salaried');

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // EMI Calculation Formula: E = [P * r * (1+r)^n] / [(1+r)^n - 1]
  const calculateEMI = (p: number, annualRate: number, n: number): number => {
    if (p <= 0 || n <= 0) return 0;
    const r = annualRate / (12 * 100);
    if (r === 0) return p / n;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const monthlyEmi = calculateEMI(loanAmount, interestRate, tenureMonths);
  const totalPayment = monthlyEmi * tenureMonths;
  const totalInterest = Math.max(0, totalPayment - loanAmount);
  const principalPercent = totalPayment > 0 ? Math.round((loanAmount / totalPayment) * 100) : 100;
  const interestPercent = totalPayment > 0 ? 100 - principalPercent : 0;

  const handleApplyClick = () => {
    if (openApplyModal) {
      openApplyModal('Personal Loan');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleEligibilityClick = () => {
    if (openEligibilityModal) {
      openEligibilityModal('Personal Loan');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCibilClick = () => {
    if (openCibilModal) {
      openCibilModal();
    } else {
      navigate('/credit-score');
    }
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('emi-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Structured Data Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.bankscart.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Loans",
        "item": "https://www.bankscart.com/loans"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Personal Loan Overview",
        "item": "https://www.bankscart.com/loans/personal/overview"
      }
    ]
  };

  const financialProductSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "Personal Loans in India",
    "description": "Compare personal loan interest rates, eligibility criteria, and EMIs from top banks and NBFCs in India on BanksCart.",
    "url": "https://www.bankscart.com/loans/personal/overview",
    "provider": {
      "@type": "Organization",
      "name": "BanksCart",
      "url": "https://www.bankscart.com"
    },
    "feesAndCommissionsSpecification": "Processing fee ranging from 0.50% to 2.50% + GST. Zero foreclosure fees on floating rate loans for individuals per RBI norms."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 font-sans pt-24 pb-24 selection:bg-blue-100 selection:text-blue-900">
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Personal Loans in India: Compare Rates & EMIs | BanksCart</title>
        <meta
          name="description"
          content="Explore personal loan eligibility, interest rates, fees and EMI calculations. Compare available options and understand repayment costs with BanksCart."
        />
        <link rel="canonical" href="https://www.bankscart.com/loans/personal/overview" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Personal Loans in India: Compare Rates & EMIs | BanksCart" />
        <meta
          property="og:description"
          content="Explore personal loan eligibility, interest rates, fees and EMI calculations. Compare available options and understand repayment costs with BanksCart."
        />
        <meta property="og:url" content="https://www.bankscart.com/loans/personal/overview" />
        <meta property="og:site_name" content="BanksCart" />
        <meta property="og:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Personal Loans in India: Compare Rates & EMIs | BanksCart" />
        <meta
          name="twitter:description"
          content="Explore personal loan eligibility, interest rates, fees and EMI calculations. Compare available options and understand repayment costs with BanksCart."
        />
        <meta name="twitter:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* Structured Data Scripts */}
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(financialProductSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Page Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* 1. Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="pt-2">
          <ol className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-slate-500 font-medium">
            <li>
              <Link to="/" className="text-slate-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">/</li>
            <li>
              <Link to="/loans" className="text-slate-600 hover:text-blue-600 transition-colors">
                Loans
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-400">/</li>
            <li aria-current="page" className="text-blue-700 font-semibold">
              Personal Loan Overview
            </li>
          </ol>
        </nav>

        {/* 2. Hero Header & Quick Summary */}
        <header className="relative bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 rounded-3xl text-white p-6 sm:p-10 lg:p-14 shadow-2xl overflow-hidden border border-blue-800/40">
          {/* Subtle Ambient Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-200 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Verified 2026 Lending Rates & Guidelines
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Personal Loans in India: Compare Interest Rates, Eligibility & EMIs
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              A personal loan is an unsecured credit facility designed to meet immediate cash needs without pledging gold, property, or investments. Whether consolidating high-interest debt, addressing medical emergencies, funding higher education, or financing major life milestones, BanksCart lets you compare verified offerings from India&apos;s leading banks and NBFCs, simulate monthly EMIs, and verify eligibility with zero impact on your CIBIL score.
            </p>

            {/* Key Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2 pb-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">Interest Rates</div>
                <div className="text-lg sm:text-2xl font-black text-amber-300 mt-1">From 10.25%</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Reducing balance p.a.</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">Loan Amounts</div>
                <div className="text-lg sm:text-2xl font-black text-white mt-1">Up to ₹50 Lakhs</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Subject to income criteria</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">Repayment Tenure</div>
                <div className="text-lg sm:text-2xl font-black text-white mt-1">12 - 72 Months</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Flexible monthly EMIs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">Collateral</div>
                <div className="text-lg sm:text-2xl font-black text-teal-300 mt-1">Zero Assets</div>
                <div className="text-[11px] text-slate-300 mt-0.5">100% unsecured credit</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={handleEligibilityClick}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <span>Check Your Eligibility</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={scrollToCalculator}
                className="bg-white/15 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-amber-300" />
                <span>Calculate Monthly EMI</span>
              </button>
              <button
                type="button"
                onClick={handleCibilClick}
                className="text-blue-200 hover:text-white px-4 py-3.5 text-xs sm:text-sm font-medium underline-offset-4 hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Free CIBIL Score Check</span>
              </button>
            </div>

            {/* Trust Badges Strip */}
            <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-4 sm:gap-8 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Paperless Aadhaar KYC
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Soft Credit Check (Zero Score Drop)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Partnered with RBI-Regulated Lenders
              </span>
            </div>
          </div>
        </header>

        {/* 3. Compare Top Personal Loan Lenders in India */}
        <section aria-labelledby="lender-comparison-heading" className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-blue-700 font-semibold text-xs tracking-wider uppercase">
              <Building2 className="w-4 h-4 text-blue-600" />
              Transparent Rate Comparison
            </div>
            <h2 id="lender-comparison-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Compare Personal Loan Interest Rates from Top Indian Lenders
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Interest rates vary significantly based on your monthly take-home income, credit bureau score, employment status (salaried vs. self-employed), and existing debt obligations. Review current verified baseline rate slabs, processing fees, and maximum borrowing limits below.
            </p>
          </div>

          {/* Responsive Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <caption className="sr-only">Personal loan interest rates and fees comparison across Indian banks</caption>
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] sm:text-xs tracking-wider">
                  <th scope="col" className="p-4 sm:p-5">Bank / Lender</th>
                  <th scope="col" className="p-4 sm:p-5">Interest Rate (p.a.)</th>
                  <th scope="col" className="p-4 sm:p-5">Processing Fee</th>
                  <th scope="col" className="p-4 sm:p-5">Max Loan Amount</th>
                  <th scope="col" className="p-4 sm:p-5">Max Tenure</th>
                  <th scope="col" className="p-4 sm:p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TOP_BANKS.map((bank, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900">
                      <div>{bank.name}</div>
                      <div className="text-[11px] font-normal text-slate-500 mt-0.5">{bank.bestFor}</div>
                    </td>
                    <td className="p-4 sm:p-5 font-bold text-blue-700 whitespace-nowrap">
                      {bank.rateRange}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600">
                      {bank.processingFee}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-700 font-semibold whitespace-nowrap">
                      {bank.maxAmount}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600 whitespace-nowrap">
                      {bank.maxTenure}
                    </td>
                    <td className="p-4 sm:p-5 text-right">
                      <button
                        type="button"
                        onClick={handleApplyClick}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        Check Offer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Financial Accuracy Note:</strong> The interest rates and processing fees listed above reflect typical starting ranges offered by respective lenders under reducing balance calculation models. Final terms, interest rate margins, and approved credit amounts depend strictly on individual credit underwriting, Debt-to-Income (DTI) ratio, CIBIL score, and lender policies. BanksCart does not charge any upfront application fee.
            </div>
          </div>
        </section>

        {/* 4. Key Features & Specifications */}
        <section aria-labelledby="key-features-heading" className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 id="key-features-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Key Features & Benefits of Personal Loans
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Understand the core specifications that define personal borrowing under Reserve Bank of India (RBI) regulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-800">100% Unsecured (No Collateral)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                You do not need to pledge property, mutual funds, or gold as security. Loan approval is based strictly on your monthly income reliability and credit repayment track record.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Flexible End-Use Freedom</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Unlike housing loans or auto loans that can only fund specified assets, personal loan funds can be utilized for medical treatment, home renovation, wedding costs, or credit card debt consolidation.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Swift Digital Disbursals</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Through digital KYC authentication (Aadhaar OTP) and Account Aggregator banking verification, pre-approved borrowers receive instant fund credits within hours.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <BadgePercent className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Reducing Balance Calculations</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Interest is computed on monthly reducing balances rather than flat initial principal, meaning your effective borrowing costs decrease steadily as principal is paid down.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Minimal Documentation</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                No physical paperwork stacks or branch visits required. Only your PAN, Aadhaar, past 3 months&apos; salary slips, and 6 months&apos; bank statements are needed online.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Flexible Sized Tenures</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Choose repayment tenures ranging from 12 months up to 72 months to customize an EMI schedule that comfortably fits inside your monthly household budget.
              </p>
            </div>
          </div>
        </section>

        {/* 5. Interactive EMI Calculator Section */}
        <section
          id="emi-calculator"
          aria-labelledby="calculator-heading"
          className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl border border-blue-900/50 space-y-8"
        >
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-amber-300 font-semibold text-xs tracking-wider uppercase">
              <Calculator className="w-4 h-4" />
              Real-Time Repayment Planner
            </div>
            <h2 id="calculator-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Personal Loan EMI Calculator
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Simulate monthly Equated Monthly Installments (EMIs), cumulative interest liabilities, and total repayment amounts based on current reducing interest rates.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Controls: Sliders and Inputs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Loan Amount Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label htmlFor="amount-slider" className="font-semibold text-slate-200">
                    Required Loan Amount
                  </label>
                  <div className="bg-white/10 px-3 py-1 rounded-lg border border-white/20 font-bold text-white text-base">
                    ₹{loanAmount.toLocaleString('en-IN')}
                  </div>
                </div>
                <input
                  id="amount-slider"
                  type="range"
                  min={50000}
                  max={5000000}
                  step={10000}
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>₹50,000</span>
                  <span>₹25 Lakhs</span>
                  <span>₹50 Lakhs</span>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[100000, 300000, 500000, 1000000, 2000000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setLoanAmount(preset)}
                      className={`text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        loanAmount === preset
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-white/10 hover:bg-white/20 text-slate-300'
                      }`}
                    >
                      ₹{(preset / 100000).toFixed(0)} Lakh{preset > 100000 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Rate Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label htmlFor="rate-slider" className="font-semibold text-slate-200">
                    Annual Interest Rate (% p.a.)
                  </label>
                  <div className="bg-white/10 px-3 py-1 rounded-lg border border-white/20 font-bold text-amber-300 text-base">
                    {interestRate.toFixed(2)}%
                  </div>
                </div>
                <input
                  id="rate-slider"
                  type="range"
                  min={8.5}
                  max={28.0}
                  step={0.25}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>8.5% (Prime)</span>
                  <span>14.0%</span>
                  <span>28.0% (Subprime)</span>
                </div>
              </div>

              {/* Tenure Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label htmlFor="tenure-slider" className="font-semibold text-slate-200">
                    Repayment Tenure (Months)
                  </label>
                  <div className="bg-white/10 px-3 py-1 rounded-lg border border-white/20 font-bold text-teal-300 text-base">
                    {tenureMonths} Months ({Math.round(tenureMonths / 12)} Yrs)
                  </div>
                </div>
                <input
                  id="tenure-slider"
                  type="range"
                  min={12}
                  max={84}
                  step={6}
                  value={tenureMonths}
                  onChange={(e) => setTenureMonths(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>12 Mos (1 Yr)</span>
                  <span>36 Mos (3 Yrs)</span>
                  <span>84 Mos (7 Yrs)</span>
                </div>
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 space-y-6">
              <div className="text-center pb-4 border-b border-white/10">
                <span className="text-xs uppercase font-semibold text-slate-300 tracking-wider">
                  Calculated Monthly EMI
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-300 mt-2">
                  ₹{monthlyEmi.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-300 mt-1">Per month for {tenureMonths} installments</div>
              </div>

              {/* Visual Split Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300 font-medium">
                  <span>Principal ({principalPercent}%)</span>
                  <span>Interest ({interestPercent}%)</span>
                </div>
                <div className="h-3 w-full bg-slate-700 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${principalPercent}%` }}
                    className="bg-blue-500 h-full transition-all duration-300"
                    title={`Principal: ${principalPercent}%`}
                  />
                  <div
                    style={{ width: `${interestPercent}%` }}
                    className="bg-amber-400 h-full transition-all duration-300"
                    title={`Interest: ${interestPercent}%`}
                  />
                </div>
              </div>

              {/* Financial Metrics Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-slate-200">
                  <span>Principal Borrowed</span>
                  <span className="font-bold text-white">₹{loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-slate-200">
                  <span>Total Interest Payable</span>
                  <span className="font-bold text-amber-300">₹{totalInterest.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 text-slate-200 font-semibold">
                  <span>Total Repayment (P + I)</span>
                  <span className="font-black text-white text-base">₹{totalPayment.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleApplyClick}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply for this Loan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-400 leading-tight">
                Standard amortization formula: E = [P × r × (1+r)ⁿ] / [(1+r)ⁿ – 1]. Actual EMI may vary based on exact sanction date and fee deductions.
              </p>
            </div>
          </div>
        </section>

        {/* 6. Eligibility Criteria Breakdown */}
        <section aria-labelledby="eligibility-criteria-heading" className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-blue-700 font-semibold text-xs tracking-wider uppercase">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Approval Requirements
            </div>
            <h2 id="eligibility-criteria-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Personal Loan Eligibility Criteria in India
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Lenders verify your repayment capability and risk tier before approving unsecured funds. Compare criteria for salaried employees versus self-employed individuals below.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex gap-2 border-b border-slate-200 pb-2">
            <button
              type="button"
              onClick={() => setActiveTab('salaried')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'salaried'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Salaried Employees
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('selfEmployed')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'selfEmployed'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Self-Employed / Business Owners
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <caption className="sr-only">Eligibility criteria for personal loans</caption>
              <thead>
                <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] sm:text-xs">
                  <th scope="col" className="p-4 sm:p-5 w-1/3">Parameter</th>
                  <th scope="col" className="p-4 sm:p-5">Detailed Requirement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {activeTab === 'salaried' ? (
                  <>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Age Bracket</td>
                      <td className="p-4 sm:p-5">21 years to 60 years at loan maturity</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Minimum Monthly Salary</td>
                      <td className="p-4 sm:p-5">
                        ₹15,000 for Non-Metro cities; ₹25,000+ for Tier-1 Metros (Mumbai, Delhi NCR, Bengaluru, Hyderabad)
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Employment Continuity</td>
                      <td className="p-4 sm:p-5">
                        Minimum 1 year total professional experience, with at least 6 months with current employer
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Preferred CIBIL Score</td>
                      <td className="p-4 sm:p-5">
                        720+ preferred for prime rate offers. Scores 650–719 considered with additional proofs or higher rate
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Debt-to-Income (DTI) Ratio</td>
                      <td className="p-4 sm:p-5">
                        Total monthly debt payments (including proposed personal loan) must be under 45% of net salary
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Employer Category</td>
                      <td className="p-4 sm:p-5">
                        Government / PSU, Listed Corporates, MNCs, or registered private limited firms
                      </td>
                    </tr>
                  </>
                ) : (
                  <>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Age Bracket</td>
                      <td className="p-4 sm:p-5">23 years to 65 years at loan maturity</td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Minimum Annual Income</td>
                      <td className="p-4 sm:p-5">
                        Minimum ₹2.5 Lakhs to ₹5.0 Lakhs net annual taxable profit as declared in audited ITRs
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Business Vintage</td>
                      <td className="p-4 sm:p-5">
                        Minimum 2 to 3 years of continuous operation in the same business or profession
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Preferred CIBIL Score</td>
                      <td className="p-4 sm:p-5">
                        720+ required for business owners, with flawless bank statement turnover
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Eligible Professions</td>
                      <td className="p-4 sm:p-5">
                        Doctors, Chartered Accountants, Architects, Consultants, Proprietors, Partners, and Directors
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="p-4 sm:p-5 font-bold text-slate-900">Banking Health</td>
                      <td className="p-4 sm:p-5">
                        Zero inward cheque/ECS bounces in current/savings bank statements over the past 6 months
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* 7. Documents Required Checklist */}
        <section aria-labelledby="documents-heading" className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-blue-700 font-semibold text-xs tracking-wider uppercase">
              <FileText className="w-4 h-4 text-blue-600" />
              Paperless Verification
            </div>
            <h2 id="documents-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Documents Commonly Required for Personal Loan Processing
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              With online Account Aggregator and DigiLocker integrations, you can submit verified documents digitally in under 3 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Salaried Checklist */}
            <div className="border border-slate-200 rounded-2xl p-6 space-y-4 bg-slate-50/50">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                <Building2 className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-800">For Salaried Applicants</h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Identity Proof:</strong> PAN Card (mandatory) + Aadhaar Card, Passport, or Voter ID</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Address Proof:</strong> Aadhaar Card, Passport, Utility Bill, or Registered Rental Agreement</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Income Proof:</strong> Latest 3 months&apos; salary slips + Form 16 / Income Tax return</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Bank Statements:</strong> Past 6 months&apos; bank statements reflecting active salary credits</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Employment Proof:</strong> Official Corporate Email ID or Company ID Card</span>
                </li>
              </ul>
            </div>

            {/* Self-Employed Checklist */}
            <div className="border border-slate-200 rounded-2xl p-6 space-y-4 bg-slate-50/50">
              <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                <Building2 className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-base text-slate-800">For Self-Employed Professionals</h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Identity & Address Proof:</strong> PAN Card, Aadhaar Card, Passport</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Business Proof:</strong> GST Certificate, Shop & Establishment Act, or MSME Udyam</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Financial Audits:</strong> Past 2-3 years ITR with CA-audited Profit & Loss and Balance Sheet</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Bank Statements:</strong> Past 6 to 12 months current and operative savings bank statements</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Professional Practice Proof:</strong> Medical council / ICAI / Bar Council certificates (for professionals)</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 8. Interest Rates, Reducing-Balance Math, and Fee Transparency */}
        <section aria-labelledby="fee-structure-heading" className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-blue-700 font-semibold text-xs tracking-wider uppercase">
              <TrendingDown className="w-4 h-4 text-blue-600" />
              Borrowing Cost Transparency
            </div>
            <h2 id="fee-structure-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Understanding Interest Models, APR & Schedule of Charges
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Borrowers often compare interest percentages without realizing that calculation methods (Reducing vs. Flat) and hidden administrative fees dictate true borrowing expenses.
            </p>
          </div>

          {/* Mathematical Comparison Box */}
          <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-teal-50 rounded-2xl p-6 sm:p-8 border border-blue-200/60 space-y-4">
            <h3 className="font-bold text-slate-900 text-lg flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-600" />
              The Math: Reducing Balance vs. Flat Rate Interest
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Consider a <strong>₹5,00,000 personal loan</strong> taken for a <strong>3-year tenure (36 months)</strong> at a quoted <strong>12.00% annual interest rate</strong>:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-white rounded-xl p-4 border border-blue-200 space-y-2">
                <div className="text-xs font-bold uppercase text-slate-500">Under Reducing Balance Model (BanksCart Standard)</div>
                <div className="text-lg font-black text-blue-700">Monthly EMI: ~₹16,607</div>
                <div className="text-xs text-slate-600">Total Interest Paid: <strong>₹97,858</strong></div>
                <div className="text-xs text-slate-600">Total Repayment: <strong>₹5,97,858</strong></div>
                <p className="text-[11px] text-emerald-700 font-medium pt-1">
                  Interest is recalculated monthly strictly on unpaid principal, saving you over ₹82,000!
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-rose-200 space-y-2">
                <div className="text-xs font-bold uppercase text-slate-500">Under Flat Rate Model (Traditional NBFCs)</div>
                <div className="text-lg font-black text-rose-700">Monthly EMI: ~₹18,889</div>
                <div className="text-xs text-slate-600">Total Interest Paid: <strong>₹1,80,000</strong></div>
                <div className="text-xs text-slate-600">Total Repayment: <strong>₹6,80,000</strong></div>
                <p className="text-[11px] text-rose-700 font-medium pt-1">
                  Interest is charged on the initial ₹5L continuously for 3 years. The effective APR is ~21.5%!
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Fees & Charges Table */}
          <div className="space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">Comprehensive Schedule of Associated Fees</h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <caption className="sr-only">Schedule of personal loan processing fees and charges</caption>
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] sm:text-xs">
                    <th scope="col" className="p-4 sm:p-5 w-1/3">Fee / Charge Name</th>
                    <th scope="col" className="p-4 sm:p-5">Standard Industry Range & Policy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 sm:p-5 font-bold text-slate-900">Processing Fee</td>
                    <td className="p-4 sm:p-5">
                      0.50% to 2.50% of sanctioned loan principal (Min ₹999 to ₹2,500) + 18% GST. Deducted upfront from disbursed amount.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 sm:p-5 font-bold text-slate-900">Prepayment / Foreclosure Charges</td>
                    <td className="p-4 sm:p-5">
                      <strong>NIL (Zero)</strong> for individual borrowers under floating interest rates per RBI circulars. For fixed rate loans: 2% to 4% + GST after 6-12 months.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 sm:p-5 font-bold text-slate-900">Part-Payment Fees</td>
                    <td className="p-4 sm:p-5">
                      NIL to 2% of the part-prepaid amount. Many lenders permit part-payments up to 25% of principal annually without charges.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 sm:p-5 font-bold text-slate-900">EMI Bounce Charges</td>
                    <td className="p-4 sm:p-5">
                      ₹350 to ₹750 per returned NACH debit/cheque + applicable bank penal charges.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 sm:p-5 font-bold text-slate-900">Late Payment Penal Interest</td>
                    <td className="p-4 sm:p-5">
                      Typically 2.00% to 3.00% per month on the overdue EMI component until cleared.
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 sm:p-5 font-bold text-slate-900">Goods and Services Tax (GST)</td>
                    <td className="p-4 sm:p-5">
                      18% GST applies strictly on processing charges, foreclosure fees, and penal penalties. GST is NOT levied on loan principal or standard interest payments.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 9. Benefits vs Limitations */}
        <section aria-labelledby="pros-cons-heading" className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 id="pros-cons-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Benefits and Limitations of Personal Loans
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Evaluate whether an unsecured personal loan matches your current cash requirements or if an alternative financing vehicle is preferable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Advantages */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-emerald-200/80 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Key Advantages
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Zero Asset Risk:</strong> Your house, gold, or investments remain untouched in case of financial distress.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Consolidate Costly Debts:</strong> Replace multiple credit card debts (charging 36%-42% p.a.) with one structured loan at 10.5%-14% p.a.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Rapid Emergency Access:</strong> Quick approval SLA times help bridge medical or urgent family requirements immediately.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Builds CIBIL History:</strong> Consistently clearing personal loan EMIs demonstrates repayment maturity, boosting future mortgage eligibility.</span>
                </li>
              </ul>
            </div>

            {/* Limitations */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-amber-200/80 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-amber-800 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                Key Limitations & Risks
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Higher Rates than Secured Credit:</strong> Unsecured loans carry higher rates than home loans (~8.5%) or gold loans (~9.0%).</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Stringent Credit Standards:</strong> Lenders reject applicants with recent DPD default flags or scores below 650 without collateral.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Impact of Missed EMIs:</strong> Late payments trigger steep late fees (up to 36% p.a. penal interest) and sharply degrade bureau ratings.</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span><strong>Risk of Over-Leveraging:</strong> Borrowing beyond your Debt-to-Income capacity (DTI &gt; 50%) can lead to a long-term debt spiral.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 10. Step-by-Step Application Process */}
        <section aria-labelledby="application-steps-heading" className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-blue-700 font-semibold text-xs tracking-wider uppercase">
              <ArrowRight className="w-4 h-4 text-blue-600" />
              End-to-End Application
            </div>
            <h2 id="application-steps-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Apply for a Personal Loan on BanksCart: Step-by-Step
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Follow our structured 6-step online process to secure best-in-market rates with zero branch visits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-slate-200 rounded-2xl p-5 space-y-2 bg-slate-50/50 relative">
              <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                1
              </span>
              <h3 className="font-bold text-base text-slate-800">Check Eligibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Provide your basic income, employer details, and city to view eligible pre-approved loan slabs with zero impact on credit scores.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 space-y-2 bg-slate-50/50 relative">
              <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                2
              </span>
              <h3 className="font-bold text-base text-slate-800">Compare Bank Offers</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Compare side-by-side interest rate quotes, processing fee slabs, and tenure options across 20+ RBI-licensed banks and NBFCs.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 space-y-2 bg-slate-50/50 relative">
              <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                3
              </span>
              <h3 className="font-bold text-base text-slate-800">Digital KYC Verification</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete identity verification online via Aadhaar OTP and DigiLocker integration without paper photocopies.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 space-y-2 bg-slate-50/50 relative">
              <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                4
              </span>
              <h3 className="font-bold text-base text-slate-800">Upload Income Documents</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Verify salary credits instantly via secure Account Aggregator OTP or upload past 3 months&apos; salary slips.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 space-y-2 bg-slate-50/50 relative">
              <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                5
              </span>
              <h3 className="font-bold text-base text-slate-800">Review Sanction Letter</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Review your digital sanction letter detailing exact reducing interest rate, repayment schedule, and loan agreement clauses.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 space-y-2 bg-slate-50/50 relative">
              <span className="w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                6
              </span>
              <h3 className="font-bold text-base text-slate-800">e-NACH Mandate & Disbursal</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Configure auto-debit through NetBanking/Debit Card and receive loan funds directly into your verified bank account.
              </p>
            </div>
          </div>

          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={handleApplyClick}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-xl shadow-md transition-all text-sm sm:text-base cursor-pointer"
            >
              Start Your Online Application
            </button>
          </div>
        </section>

        {/* 11. Frequently Asked Questions */}
        <section aria-labelledby="faqs-heading" className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-blue-700 font-semibold text-xs tracking-wider uppercase">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              Borrower FAQs
            </div>
            <h2 id="faqs-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions About Personal Loans
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Clear answers to genuine consumer queries regarding interest calculations, eligibility, pre-closures, and regulatory safety.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/40 hover:border-blue-200"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  aria-expanded={activeFaq === idx}
                  className="w-full flex justify-between items-center p-4 sm:p-5 text-left font-bold text-slate-800 text-sm sm:text-base cursor-pointer gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      activeFaq === idx ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="p-4 sm:p-5 text-xs sm:text-sm text-slate-600 border-t border-slate-200/80 bg-white leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 12. Internal Links: Explore More Financial Products */}
        <section aria-labelledby="internal-links-heading" className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 id="internal-links-heading" className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Explore More Financial Tools & Lending Guides on BanksCart
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Discover dedicated calculators, compare alternative borrowing instruments, or monitor your credit standing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/calculators"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="font-bold text-sm text-slate-800 group-hover:text-blue-600 flex items-center justify-between">
                <span>Personal Loan EMI Calculator</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Plan exact tenure milestones and generate comprehensive amortization tables.
              </p>
            </Link>

            <Link
              to="/credit-score"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="font-bold text-sm text-slate-800 group-hover:text-blue-600 flex items-center justify-between">
                <span>Free CIBIL Credit Score Check</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Check your bureau credit report with detailed factors and zero impact on score.
              </p>
            </Link>

            <Link
              to="/loans/home"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="font-bold text-sm text-slate-800 group-hover:text-blue-600 flex items-center justify-between">
                <span>Home Loans Comparison</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Compare secured home loan interest rates starting from 8.35% p.a.
              </p>
            </Link>

            <Link
              to="/loans/business"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="font-bold text-sm text-slate-800 group-hover:text-blue-600 flex items-center justify-between">
                <span>Business Loans for MSMEs</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Unsecured commercial capital and working capital lines for expanding enterprises.
              </p>
            </Link>

            <Link
              to="/cards/credit"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="font-bold text-sm text-slate-800 group-hover:text-blue-600 flex items-center justify-between">
                <span>Best Credit Cards in India</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                Compare lifetime-free, cashback, fuel surcharge waiver, and travel lounge cards.
              </p>
            </Link>

            <Link
              to="/blog/personal-loan-balance-transfer"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="font-bold text-sm text-slate-800 group-hover:text-blue-600 flex items-center justify-between">
                <span>Personal Loan Balance Transfer Guide</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                How to switch your high-interest personal loan to a cheaper lender and save on EMI.
              </p>
            </Link>
          </div>
        </section>

        {/* 13. Regulatory Disclaimer & Reviewer Transparency */}
        <footer className="border-t border-slate-200 pt-8 pb-4 space-y-4 text-xs text-slate-500 leading-relaxed">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-slate-600 pb-3 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span>Editorial & Financial Accuracy Review by <strong>BanksCart Research Team</strong></span>
            </div>
            <div>Last Updated & Rate Audit: October 2026</div>
          </div>

          <p>
            <strong>Regulatory & Financial Marketplace Disclaimer:</strong> BanksCart is an independent online lending marketplace and technology distributor, not an RBI-licensed commercial bank or Non-Banking Financial Company (NBFC). We partner with scheduled commercial banks and RBI-registered NBFCs to facilitate transparent loan comparisons and digital customer onboarding. Loan sanctions, approved interest rates, processing fee concessions, and disbursement timelines are at the sole discretion of the lending partners, determined strictly by the applicant&apos;s credit score, Debt-to-Income (DTI) ratio, monthly verifiable income, and underwriting audits. BanksCart does not promise or guarantee loan approval or specific interest rate brackets.
          </p>

          <p>
            <strong>DICGC Insurance Notice:</strong> The Deposit Insurance and Credit Guarantee Corporation (DICGC) scheme guarantees retail deposits (Savings Accounts, Fixed Deposits, Recurring Deposits) up to a statutory threshold of ₹5,00,000 per depositor per bank in the event of bank liquidation. DICGC insurance applies strictly to deposits and does NOT apply to personal loans, mortgages, credit cards, or borrowing facilities.
          </p>
        </footer>

      </div>
    </main>
  );
};

export default PersonalLoanOverviewPage;
