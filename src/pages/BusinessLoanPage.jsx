import React, { useState, useRef, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import {
  Briefcase,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Wallet,
  Percent,
  Clock,
  Sparkles,
  FileText,
  Award,
  Info,
  Building,
  Layers,
  Landmark,
  Search,
  Users,
  Settings,
  Scale,
  BadgeCheck,
  FileCheck
} from "lucide-react";
import { businessLoanProducts } from "../data/businessLoanProducts";

// Verified MSME & Commercial Lenders
const extendedBusinessLenders = [
  {
    id: "sbi",
    name: "State Bank of India",
    fullName: "SBI SME / Business Loan",
    logo: "/logos/sbi.png",
    category: "psu",
    rate: "11.20% – 16.30%",
    minRate: 11.20,
    maxLoan: "Up to ₹20 Lakhs",
    tenure: "12 - 60 Months",
    turnoverReq: "Min ₹20 Lakhs / Year",
    processingFee: "Up to 2% + GST",
    badge: "Lowest Benchmark Rate",
    featured: true,
    highlights: [
      "Collateral-free financing under CGTMSE guarantee scheme",
      "Special concession for women-led MSME enterprises",
      "Simplified documentation for existing current account holders"
    ],
    applyTag: "Business Loan - State Bank of India"
  },
  {
    id: "hdfc",
    name: "HDFC Bank",
    fullName: "HDFC Bank Business Growth Loan",
    logo: "/logos/hdfc.png",
    category: "private",
    rate: "11.90% – 21.35%",
    minRate: 11.90,
    maxLoan: "Up to ₹50 Lakhs",
    tenure: "12 - 48 Months",
    turnoverReq: "Min ₹40 Lakhs / Year",
    processingFee: "Up to 2% + GST",
    badge: "Most Popular Private Lender",
    featured: true,
    highlights: [
      "100% paperless digital sanction in 48 business hours",
      "Overdraft (OD) and working capital line of credit available",
      "Zero collateral required for GST-compliant enterprises"
    ],
    applyTag: "Business Loan - HDFC Bank"
  },
  {
    id: "icici",
    name: "ICICI Bank",
    fullName: "ICICI Bank InstaBIZ / Business Loan",
    logo: "/logos/icici.png",
    category: "private",
    rate: "12.00% – 19.50%",
    minRate: 12.00,
    maxLoan: "Up to ₹40 Lakhs",
    tenure: "12 - 60 Months",
    turnoverReq: "Min ₹15 Lakhs / Year",
    processingFee: "Up to 2% + GST",
    badge: "Fast Disbursal",
    featured: false,
    highlights: [
      "Pre-approved credit limits accessible via InstaBIZ app",
      "Flexible collateral-free loans for traders and manufacturers",
      "Custom step-up EMI repayment aligned with seasonal cash flows"
    ],
    applyTag: "Business Loan - ICICI Bank"
  },
  {
    id: "bob",
    name: "Bank of Baroda",
    fullName: "Baroda MSME Loan / Mudra",
    logo: "/logos/bob.png",
    category: "psu",
    rate: "12.50% – 16.50%",
    minRate: 12.50,
    maxLoan: "Up to ₹20 Lakhs",
    tenure: "12 - 84 Months",
    turnoverReq: "Min ₹10 Lakhs / Year",
    processingFee: "Up to 2% + GST",
    badge: "Extended Tenure (7 Yrs)",
    featured: false,
    highlights: [
      "Tenure up to 7 years for capital expenditure & machinery",
      "Pradhan Mantri MUDRA Yojana (Tarun slab up to ₹10 Lakhs)",
      "Low processing charges for Udyam-registered enterprises"
    ],
    applyTag: "Business Loan - Bank of Baroda"
  },
  {
    id: "axis",
    name: "Axis Bank",
    fullName: "Axis Bank 24x7 Business Loan",
    logo: "/logos/axis.png",
    category: "private",
    rate: "14.25% – 18.50%",
    minRate: 14.25,
    maxLoan: "Up to ₹50 Lakhs",
    tenure: "12 - 60 Months",
    turnoverReq: "Min ₹30 Lakhs / Year",
    processingFee: "Up to 2% + GST",
    badge: "Instant Approval",
    featured: false,
    highlights: [
      "End-to-end digital approval for self-employed professionals",
      "Quick sanction for service providers, retailers & doctors",
      "Zero branch visits required for documentation"
    ],
    applyTag: "Business Loan - Axis Bank"
  },
  {
    id: "kotak",
    name: "Kotak Mahindra Bank",
    fullName: "Kotak Business Loan",
    logo: "/logos/kotak.png",
    category: "private",
    rate: "14.50% – 20.00%",
    minRate: 14.50,
    maxLoan: "Up to ₹75 Lakhs",
    tenure: "12 - 48 Months",
    turnoverReq: "Min ₹40 Lakhs / Year",
    processingFee: "Up to 2% + GST",
    badge: "High Loan Ceiling",
    featured: false,
    highlights: [
      "Substantial unsecured loan limits up to ₹75 Lakhs",
      "Transparent Key Fact Statement (KFS) disclosed upfront",
      "Dedicated relationship manager for corporate KYC"
    ],
    applyTag: "Business Loan - Kotak Mahindra Bank"
  }
];

// Helper formula for Monthly Reducing EMI
function calculateBusinessLoanEMI(principal, annualRate, tenureMonths) {
  if (!principal || !annualRate || !tenureMonths) return 0;
  const monthlyRate = annualRate / (12 * 100);
  return Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );
}

const BusinessLoanPage = ({ openApplyModal }) => {
  const pageTitle = "Collateral-Free Business Loans: Compare Rates & Apply Online | BanksCart";
  const pageDescription = "Get unsecured MSME and business loans up to ₹75 Lakhs from top banks and NBFCs. Compare interest rates, check eligibility, and apply with fast disbursal.";
  const canonicalUrl = "https://www.bankscart.com/loans/business-loan";

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
        "name": "Business Loan",
        "item": canonicalUrl
      }
    ]
  };

  const financialProductSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "Business Loans in India: Unsecured MSME & Commercial Finance",
    "description": pageDescription,
    "url": canonicalUrl,
    "provider": {
      "@type": "Organization",
      "name": "BanksCart",
      "url": "https://www.bankscart.com"
    },
    "annualPercentageRate": "11.20% - 22.50%",
    "feesAndCommissionsSpecification": "Processing fee ranging from 1.00% to 2.50% + GST. Unsecured collateral-free loans backed by CGTMSE schemes where applicable."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the maximum collateral-free business loan amount I can get in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Leading scheduled commercial banks and NBFCs offer unsecured, collateral-free business loans up to ₹50 Lakhs to ₹75 Lakhs based on annual business turnover, banking cash flow, and GST filings. Under the Government of India's CGTMSE scheme, eligible micro and small enterprises can access credit guarantees for loans up to ₹5 Crores without pledging collateral."
        }
      },
      {
        "@type": "Question",
        "name": "What are the typical interest rates for business loans in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Business loan interest rates start from 11.20% p.a. from public sector lenders like State Bank of India (SBI) and Bank of Baroda, and range between 11.90% and 21.35% p.a. from private banks like HDFC Bank and ICICI Bank depending on business vintage, annual turnover, and the borrower's credit rating."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum annual turnover required for business loan approval?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most scheduled banks require a minimum annual audited turnover between ₹15 Lakhs and ₹40 Lakhs. Select NBFCs and fintech lenders evaluate businesses with lower annual turnovers (₹10 Lakhs+) provided they demonstrate consistent 12-month bank inflows and active GST compliance."
        }
      },
      {
        "@type": "Question",
        "name": "What documents are required to apply for a business loan online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mandatory documents include: PAN card and Aadhaar of business promoters, business registration proof (GST certificate, Udyam MSME certificate, or Shop & Establishment license), last 12 months' operating current bank account statements, and last 2 years' Income Tax Returns (ITR) with computation of income, P&L, and balance sheet."
        }
      },
      {
        "@type": "Question",
        "name": "Can I claim tax benefits on interest paid on a business loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Interest paid on a business loan is fully tax-deductible as a legitimate business expense under Section 36(1)(iii) of the Income Tax Act. It reduces your net taxable business profit, lowering your overall commercial tax liability."
        }
      }
    ]
  };

  // Calculator State
  const [calcAmount, setCalcAmount] = useState(1000000); // ₹10 Lakhs default
  const [calcRate, setCalcRate] = useState(13.5); // 13.5% default
  const [calcTenure, setCalcTenure] = useState(36); // 36 months default

  const emi = calculateBusinessLoanEMI(calcAmount, calcRate, calcTenure);
  const totalPayment = emi * calcTenure;
  const totalInterest = totalPayment - calcAmount;

  const principalPercent = totalPayment > 0 ? (calcAmount / totalPayment) * 100 : 70;
  const interestPercent = 100 - principalPercent;

  // Filter State
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchBank, setSearchBank] = useState("");

  const filteredLenders = extendedBusinessLenders.filter((lender) => {
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "psu" && lender.category === "psu") ||
      (selectedFilter === "private" && lender.category === "private");

    const matchesSearch =
      lender.name.toLowerCase().includes(searchBank.toLowerCase()) ||
      lender.fullName.toLowerCase().includes(searchBank.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // Preset Chips
  const AMOUNT_PRESETS = [
    { label: "₹5 Lakhs", value: 500000 },
    { label: "₹10 Lakhs", value: 1000000 },
    { label: "₹25 Lakhs", value: 2500000 },
    { label: "₹50 Lakhs", value: 5000000 },
    { label: "₹75 Lakhs", value: 7500000 },
  ];

  const TENURE_PRESETS = [
    { label: "1 Year (12M)", value: 12 },
    { label: "2 Years (24M)", value: 24 },
    { label: "3 Years (36M)", value: 36 },
    { label: "4 Years (48M)", value: 48 },
    { label: "5 Years (60M)", value: 60 },
  ];

  return (
    <main className="min-h-screen bg-slate-50 font-ibm text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      <Helmet>
        <html lang="en-IN" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="business loan interest rates, collateral free business loans, msme loan scheme, cgtmse loan, unsecured business loans india, mudra loan, sbi business loan, hdfc business loan"
        />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* JSON-LD Schemas */}
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(financialProductSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Accessible Clickable Breadcrumb */}
      <Breadcrumb path={["Home", "Loans", "Business Loan"]} />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (MASTER DESIGN SYSTEM) */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-10 pb-16 px-4 md:px-8 border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-slate-800/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Trust Ribbon */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-800/90 border border-slate-700 rounded-lg text-xs font-semibold text-slate-200 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>MSME &amp; Enterprise Finance • CGTMSE Scheme Guidance • Unsecured Up to ₹75 Lakhs</span>
          </div>

          {/* Primary H1 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Compare Collateral-Free Business Loans &amp; <span className="text-amber-400">Apply Online in India</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed font-normal">
            Compare lowest business loan interest rates starting at <strong className="text-white font-semibold">11.20% p.a.</strong> across top scheduled commercial banks and NBFCs. Fast-track working capital, machinery financing, and expansion capital with zero asset hypothecation.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              type="button"
              onClick={() => openApplyModal && openApplyModal("Business Loan")}
              className="w-full sm:w-auto h-12 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold px-8 rounded-lg shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Apply for Business Loan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("business-loan-emi-calculator");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto h-12 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-semibold px-7 rounded-lg transition-all hover:text-white hover:border-slate-600 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Calculate Business EMI</span>
            </button>

            <a
              href="#cgtmse-scheme"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-slate-300 hover:text-amber-400 font-medium px-4 py-3 text-sm transition-colors cursor-pointer"
            >
              <span>Explore CGTMSE Scheme</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          {/* Financial Metric Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-3.5 border border-slate-700/60 text-left">
              <div className="text-xs text-slate-400 font-medium">Interest Rates</div>
              <div className="text-sm sm:text-base font-bold text-amber-400 tabular-nums">From 11.20% p.a.</div>
              <div className="text-[11px] text-slate-400 mt-0.5">SBI &amp; HDFC Benchmark</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-3.5 border border-slate-700/60 text-left">
              <div className="text-xs text-slate-400 font-medium">Max Unsecured Loan</div>
              <div className="text-sm sm:text-base font-bold text-white tabular-nums">Up to ₹75 Lakhs</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Zero collateral required</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-3.5 border border-slate-700/60 text-left">
              <div className="text-xs text-slate-400 font-medium">Repayment Tenure</div>
              <div className="text-sm sm:text-base font-bold text-white tabular-nums">12 to 60 Months</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Up to 7 yrs for machinery</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-3.5 border border-slate-700/60 text-left">
              <div className="text-xs text-slate-400 font-medium">Turnover Benchmark</div>
              <div className="text-sm sm:text-base font-bold text-emerald-400 tabular-nums">From ₹15L / Year</div>
              <div className="text-[11px] text-slate-400 mt-0.5">GST filing compliance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Page Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">

        {/* ========================================================================= */}
        {/* 2. MULTI-BANK RATE COMPARISON MATRIX */}
        {/* ========================================================================= */}
        <section id="compare-lenders" className="scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
              Commercial Lenders Matrix
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Compare Business Loan Rates Across Top Indian Banks
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Verified interest rate spreads, loan caps, and annual turnover benchmarks for micro, small, and medium enterprises.
            </p>

            {/* Filter Controls & Search */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedFilter("all")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedFilter === "all"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  All Lenders ({extendedBusinessLenders.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFilter("psu")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedFilter === "psu"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Public Sector Banks
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFilter("private")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedFilter === "private"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Private Sector Banks
                </button>
              </div>

              <div className="w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Filter by bank name..."
                  value={searchBank}
                  onChange={(e) => setSearchBank(e.target.value)}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLenders.map((bank) => (
              <div
                key={bank.id}
                className={`relative bg-white rounded-xl p-6 shadow-sm border transition-all duration-200 hover:shadow-md flex flex-col justify-between ${
                  bank.featured
                    ? "border-amber-400/80 ring-1 ring-amber-300/40"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                {bank.featured && (
                  <div className="absolute -top-3 left-6 bg-slate-900 text-amber-400 px-3 py-0.5 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{bank.badge}</span>
                  </div>
                )}

                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 p-1 flex items-center justify-center shrink-0">
                        <img
                          src={bank.logo}
                          alt={bank.name}
                          className="max-h-8 max-w-full object-contain"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-950 text-base leading-snug">
                          {bank.name}
                        </h3>
                        <span className="text-xs text-slate-500 block">
                          {bank.category === "psu" ? "Public Sector Bank" : "Scheduled Commercial Bank"}
                        </span>
                      </div>
                    </div>

                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-block">
                      Verified
                    </span>
                  </div>

                  {/* 4-Metric Grid */}
                  <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-100 mb-5 text-left">
                    <div>
                      <span className="text-xs text-slate-500 font-medium block">Interest Rate</span>
                      <span className="text-sm font-bold text-slate-900 tabular-nums">
                        {bank.rate}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-medium block">Max Loan Limit</span>
                      <span className="text-sm font-bold text-slate-900 tabular-nums">
                        {bank.maxLoan}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-medium block">Tenure Range</span>
                      <span className="text-sm font-bold text-slate-900 tabular-nums">
                        {bank.tenure}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-medium block">Turnover Req.</span>
                      <span className="text-sm font-bold text-slate-900 tabular-nums">
                        {bank.turnoverReq}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-1.5 mb-6 text-xs text-slate-600">
                    {bank.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Action */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => openApplyModal && openApplyModal(bank.applyTag)}
                    className="w-full h-11 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
                  >
                    <span>Apply Instantly</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE BUSINESS LOAN EMI CALCULATOR */}
        {/* ========================================================================= */}
        <section id="business-loan-emi-calculator" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 md:p-10 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
              Interactive Repayment Estimator
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Business Loan EMI &amp; Cash Flow Calculator
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Estimate your monthly repayment outflow based on reducing-balance interest rates before formal loan submission.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-7">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="biz-amount" className="text-slate-800 font-semibold text-sm sm:text-base">
                    Required Loan Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
                    <input
                      id="biz-amount"
                      type="number"
                      min={100000}
                      max={10000000}
                      step={50000}
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(Math.max(0, Number(e.target.value)))}
                      className="w-44 pl-7 pr-3 py-1.5 border border-slate-300 rounded-lg text-right font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm sm:text-base tabular-nums"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={100000}
                  max={7500000}
                  step={50000}
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  aria-label="Business Loan Amount Slider"
                  className="w-full accent-slate-900 h-2 rounded-lg bg-slate-200 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1 tabular-nums">
                  <span>₹1 Lakh</span>
                  <span>₹75 Lakhs (Unsecured Cap)</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {AMOUNT_PRESETS.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setCalcAmount(p.value)}
                      className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                        calcAmount === p.value
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="biz-rate" className="text-slate-800 font-semibold text-sm sm:text-base">
                    Interest Rate (% p.a.)
                  </label>
                  <div className="relative">
                    <input
                      id="biz-rate"
                      type="number"
                      min={10.0}
                      max={28.0}
                      step={0.1}
                      value={calcRate}
                      onChange={(e) => setCalcRate(Math.max(0, Number(e.target.value)))}
                      className="w-24 px-3 py-1.5 border border-slate-300 rounded-lg text-right font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm sm:text-base tabular-nums"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={11.0}
                  max={24.0}
                  step={0.1}
                  value={calcRate}
                  onChange={(e) => setCalcRate(Number(e.target.value))}
                  aria-label="Business Loan Interest Rate Slider"
                  className="w-full accent-slate-900 h-2 rounded-lg bg-slate-200 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1 tabular-nums">
                  <span>11.20% (Lowest Benchmark)</span>
                  <span>24.00%</span>
                </div>
              </div>

              {/* Tenure in Months */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="biz-tenure" className="text-slate-800 font-semibold text-sm sm:text-base">
                    Repayment Tenure (Months)
                  </label>
                  <div className="relative">
                    <input
                      id="biz-tenure"
                      type="number"
                      min={12}
                      max={60}
                      step={1}
                      value={calcTenure}
                      onChange={(e) => setCalcTenure(Math.max(12, Number(e.target.value)))}
                      className="w-24 px-3 py-1.5 border border-slate-300 rounded-lg text-right font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm sm:text-base tabular-nums"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={12}
                  max={60}
                  step={1}
                  value={calcTenure}
                  onChange={(e) => setCalcTenure(Number(e.target.value))}
                  aria-label="Business Loan Tenure Slider"
                  className="w-full accent-slate-900 h-2 rounded-lg bg-slate-200 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1 tabular-nums">
                  <span>12 Months (1 Year)</span>
                  <span>60 Months (5 Years)</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {TENURE_PRESETS.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setCalcTenure(t.value)}
                      className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                        calcTenure === t.value
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                  Estimated Monthly EMI
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 mt-1 tabular-nums">
                  ₹{emi.toLocaleString("en-IN")}
                  <span className="text-sm font-normal text-slate-300"> /month</span>
                </div>
              </div>

              {/* Progress Bar Split */}
              <div className="mb-6">
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${principalPercent}%` }}
                    className="bg-blue-500 transition-all duration-300"
                    title={`Principal: ${Math.round(principalPercent)}%`}
                  />
                  <div
                    style={{ width: `${interestPercent}%` }}
                    className="bg-amber-500 transition-all duration-300"
                    title={`Interest: ${Math.round(interestPercent)}%`}
                  />
                </div>
                <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                    <span>Principal ({Math.round(principalPercent)}%)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                    <span>Interest ({Math.round(interestPercent)}%)</span>
                  </div>
                </div>
              </div>

              {/* Breakdown Rows */}
              <div className="space-y-3 border-t border-slate-800 pt-4 text-sm">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-300">Loan Principal</span>
                  <span className="font-bold text-white tabular-nums">₹{calcAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-300">Total Interest Outgo</span>
                  <span className="font-bold text-amber-400 tabular-nums">₹{Math.round(totalInterest).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-slate-800 pt-2">
                  <span className="text-slate-200 font-semibold">Total Repayable Amount</span>
                  <span className="font-extrabold text-lg text-white tabular-nums">₹{Math.round(totalPayment).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="mt-6 pt-2">
                <button
                  type="button"
                  onClick={() => openApplyModal && openApplyModal(`Business Loan - ₹${calcAmount.toLocaleString("en-IN")}`)}
                  className="w-full h-12 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply with this Business EMI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 text-center">
                <span className="text-[11px] text-slate-400">
                  * Note: Interest paid is 100% tax-deductible as a business operating expense under Section 36(1)(iii).
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. MSME GOVERNMENT SCHEMES & CGTMSE COLLATERAL-FREE GUIDE */}
        {/* ========================================================================= */}
        <section id="cgtmse-scheme" className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 scroll-mt-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-slate-800 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-700">
                Government Backed Credit Schemes
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Government of India MSME Loan Guarantee Programs
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2">
                Small business owners and startups can access collateral-free credit lines under priority government-supported credit guarantee programs.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700/80 space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded text-xs font-bold uppercase tracking-wider">
                  CGTMSE Scheme
                </div>
                <h3 className="text-lg font-bold text-white">
                  Credit Guarantee Trust for Micro &amp; Small Enterprises
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Jointly set up by Ministry of MSME and SIDBI. Provides collateral-free credit guarantee coverage up to ₹5 Crores. Banks extend term loans and working capital facilities without requiring third-party guarantees or real estate mortgages.
                </p>
                <div className="pt-2 text-xs text-amber-400 font-semibold">
                  Coverage: 75% to 85% credit guarantee backed by the Government of India.
                </div>
              </div>

              <div className="bg-slate-800/80 rounded-xl p-6 border border-slate-700/80 space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-emerald-500/20 text-emerald-300 rounded text-xs font-bold uppercase tracking-wider">
                  Pradhan Mantri MUDRA Yojana
                </div>
                <h3 className="text-lg font-bold text-white">
                  MUDRA Scheme (Shishu, Kishore &amp; Tarun)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Tailored for non-corporate small businesses in manufacturing, trade, and service sectors. Divided into 3 tiers: <strong>Shishu</strong> (up to ₹50,000), <strong>Kishore</strong> (₹50,000 to ₹5 Lakhs), and <strong>Tarun</strong> (₹5 Lakhs to ₹10 Lakhs).
                </p>
                <div className="pt-2 text-xs text-emerald-400 font-semibold">
                  Zero processing fees for Shishu and Kishore loans across public sector banks.
                </div>
              </div>
            </div>

            <div className="p-5 bg-slate-800/60 rounded-xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-left">
                <div className="text-xs font-bold text-amber-400 uppercase tracking-wide">
                  Udyam MSME Registration Benefit
                </div>
                <p className="text-xs text-slate-300">
                  Enterprises with official 12-digit Udyam Registration receive 1% interest subvention, priority credit queuing, and statutory protection against buyer payment delays under the MSMED Act.
                </p>
              </div>
              <button
                type="button"
                onClick={() => openApplyModal && openApplyModal("Business Loan - MSME Scheme")}
                className="h-10 px-6 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold rounded-lg text-xs transition-colors shrink-0 inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Check MSME Eligibility</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. TYPES OF BUSINESS LOANS IN INDIA */}
        {/* ========================================================================= */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
              Commercial Facilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Types of Commercial Financing Available
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Select the financing structure that fits your operational cash cycle, asset expansion, or seasonal inventory surges.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-900 flex items-center justify-center mb-3">
                  <Briefcase className="w-5 h-5 text-slate-800" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Unsecured Term Loan</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Lump-sum disbursement with structured monthly EMIs over 1 to 5 years. Ideal for office expansion, retail outlet setup, or new product launch.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-900 flex items-center justify-center mb-3">
                  <Wallet className="w-5 h-5 text-slate-800" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Working Capital &amp; Overdraft</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Revolving credit limit linked to your business current account. Withdraw as needed and pay interest only on the utilized amount and duration.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-900 flex items-center justify-center mb-3">
                  <Settings className="w-5 h-5 text-slate-800" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Machinery &amp; Equipment Finance</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Funding for acquiring specialized manufacturing plant, diagnostic medical machinery, or commercial IT hardware with asset hypothecation.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-900 flex items-center justify-center mb-3">
                  <FileText className="w-5 h-5 text-slate-800" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Letter of Credit &amp; BG</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Trade finance instruments providing institutional guarantees to overseas or domestic suppliers, facilitating seamless vendor contracting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. ELIGIBILITY MATRIX & MANDATORY DOCUMENTS */}
        {/* ========================================================================= */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-200 bg-slate-50">
            <div className="max-w-3xl">
              <span className="inline-block bg-slate-200 text-slate-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider mb-2">
                Approval Matrix
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                Business Loan Eligibility Benchmarks &amp; Documents Required
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Standard institutional criteria evaluated by Indian scheduled commercial banks and credit bureaus.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold w-1/4">
                    Evaluation Parameter
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-amber-400 w-1/4">
                    Sole Proprietorship / Partnership
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-blue-300 w-1/4">
                    Private Limited Company / LLP
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-slate-300 w-1/4">
                    Regulatory Mandate
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr>
                  <td className="px-6 py-4 font-bold text-slate-900">Business Vintage</td>
                  <td className="px-6 py-4 font-medium text-slate-800">Minimum 2 to 3 years</td>
                  <td className="px-6 py-4 font-medium text-slate-800">Minimum 2 years operating track</td>
                  <td className="px-6 py-4 text-xs text-slate-600">Established commercial vintage</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="px-6 py-4 font-bold text-slate-900">Minimum Annual Turnover</td>
                  <td className="px-6 py-4 font-medium text-slate-800 tabular-nums">₹15 Lakhs to ₹30 Lakhs</td>
                  <td className="px-6 py-4 font-medium text-slate-800 tabular-nums">₹25 Lakhs to ₹50 Lakhs</td>
                  <td className="px-6 py-4 text-xs text-slate-600">Supported by 12M GST returns</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-slate-900">Credit Rating (CIBIL)</td>
                  <td className="px-6 py-4 font-medium text-slate-800 tabular-nums">700+ for key promoters</td>
                  <td className="px-6 py-4 font-medium text-slate-800 tabular-nums">720+ promoter / CMR Rank 1–3</td>
                  <td className="px-6 py-4 text-xs text-slate-600">Zero default on commercial credit</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="px-6 py-4 font-bold text-slate-900">Financial Profitability</td>
                  <td className="px-6 py-4 font-medium text-slate-800">Audited P&amp;L showing positive cash flow</td>
                  <td className="px-6 py-4 font-medium text-slate-800">2 consecutive years positive PAT</td>
                  <td className="px-6 py-4 text-xs text-slate-600">CA-certified computation sheets</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 3-Column Document Breakdown */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 grid sm:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>1. KYC of Promoters</span>
              </h4>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li>PAN Card of Proprietor / Partners / Directors</li>
                <li>Aadhaar Card for DigiLocker e-KYC</li>
                <li>Residence address proof of promoters</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>2. Entity Registration Proof</span>
              </h4>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li>GST Registration Certificate (GSTIN)</li>
                <li>Udyam MSME Registration Certificate</li>
                <li>Partnership Deed or Certificate of Incorporation (MCA)</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>3. Financial Statements</span>
              </h4>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li>Latest 12 months operating current bank statements</li>
                <li>Last 2 years Income Tax Returns (ITR) with CA audit</li>
                <li>GST-3B / GSTR-1 returns for last 4 quarters</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. PRESERVED CITY-SPECIFIC INCORPORATION CLUSTER */}
        {/* ========================================================================= */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
              Regional Corporate Incorporation
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
              City-Specific Corporate Entity Formation
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Forming a legally recognized corporate entity (Pvt Ltd or LLP) is a critical prerequisite to accessing priority MSME credit limits and institutional business loans. Explore fast-track digital incorporation in commercial hubs:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">Delhi NCR Hub</span>
                <h4 className="font-bold text-slate-950 text-base mb-2">National Capital Region Corporate Setup</h4>
                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  Fast-track Private Limited, LLP, and OPC formation in New Delhi. Get complete SPICe+ MCA filing, DIN allotment, and expedited PAN/TAN with <a href="/business-loan/company-registration-in-delhi" className="text-blue-700 font-semibold underline hover:text-blue-900">company registration in Delhi</a>.
                </p>
              </div>
              <a
                href="/business-loan/company-registration-in-delhi"
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline inline-flex items-center gap-1"
              >
                <span>Company Registration in Delhi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block mb-2">Tamil Nadu Hub</span>
                <h4 className="font-bold text-slate-950 text-base mb-2">Chennai Commercial &amp; Industrial Setup</h4>
                <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed">
                  Register manufacturing ventures, export entities, and technology startups in Chennai under Tamil Nadu ROC with complete legal filings and <a href="/business-loan/company-registration-in-chennai" className="text-blue-700 font-semibold underline hover:text-blue-900">company registration in Chennai</a>.
                </p>
              </div>
              <a
                href="/business-loan/company-registration-in-chennai"
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline inline-flex items-center gap-1"
              >
                <span>Company Registration in Chennai</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. FREQUENTLY ASKED QUESTIONS (ACCESSIBLE ACCORDION) */}
        {/* ========================================================================= */}
        <section id="faq" className="my-14">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
              Clear Guidance
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Frequently Asked Questions on Business &amp; MSME Loans
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Everything you need to know about collateral-free business loans, eligibility, interest rates, and CGTMSE schemes.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-3">
            {faqSchema.mainEntity.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={item.name}
                  className={`border rounded-xl bg-white shadow-sm transition-all duration-200 overflow-hidden ${
                    isOpen ? "border-slate-900 ring-1 ring-slate-900/10" : "border-slate-200"
                  }`}
                >
                  <button
                    type="button"
                    className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-slate-900 focus:outline-none cursor-pointer"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base pr-4">{item.name}</span>
                    <span className="shrink-0 text-slate-500">
                      {isOpen ? <ChevronUp className="w-5 h-5 text-slate-900" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-4 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                      {item.acceptedAnswer.text}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. CROSS-LINK SILOS & INTERNAL FINANCIAL DIRECTORY */}
        {/* ========================================================================= */}
        <section className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Explore Related Lending &amp; Enterprise Solutions:
            </span>
            <Link to="/financial-directory" className="text-xs font-semibold text-slate-700 hover:text-slate-950 inline-flex items-center gap-1">
              Complete Financial Directory &rarr;
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              to="/loans/personal-loan"
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-950 hover:border-slate-300 font-medium transition-colors"
            >
              Personal Loans (from 10.25%)
            </Link>
            <Link
              to="/loans/home-loan"
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-950 hover:border-slate-300 font-medium transition-colors"
            >
              Home Loans (from 8.00%)
            </Link>
            <Link
              to="/credit-score"
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-950 hover:border-slate-300 font-medium transition-colors"
            >
              Check Commercial CIBIL Score
            </Link>
            <Link
              to="/personal-loan-emi-calculator"
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-950 hover:border-slate-300 font-medium transition-colors"
            >
              EMI Calculator Tool
            </Link>
            <Link
              to="/company-registration"
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-950 hover:border-slate-300 font-medium transition-colors"
            >
              Private Limited Company Registration
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
};

export default BusinessLoanPage;
