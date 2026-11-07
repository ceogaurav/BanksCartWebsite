import React, { useState, useRef, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import {
  Home,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Building2,
  Percent,
  Clock,
  Sparkles,
  FileCheck,
  TrendingDown,
  Info,
  Scale,
  Users,
  Award,
  Wallet,
  PhoneCall
} from "lucide-react";
import { homeLoanProducts } from "../data/homeLoanProducts";

// Bank Partners Catalog with Verified Rate Spread and Details
const housingLenders = [
  {
    id: "sbi",
    name: "State Bank of India",
    fullName: "SBI Regular Home Loan",
    logo: "/logos/sbi.png",
    category: "psu",
    rate: "8.00% – 9.70%",
    minRate: 8.00,
    maxLoan: "Up to ₹5 Crores",
    tenure: "Max 30 Years",
    ltv: "Up to 85% – 90%",
    processingFee: "0.35% or Min ₹2,000",
    badge: "Lowest Benchmark Rate",
    featured: true,
    highlights: [
      "Special 0.05% interest concession for women borrowers",
      "Overdraft facility available via SBI Maxgain scheme",
      "Zero prepayment penalty on floating rate loans"
    ],
    applyTag: "Home Loan - State Bank of India"
  },
  {
    id: "hdfc",
    name: "HDFC Bank",
    fullName: "HDFC Bank Housing Loan",
    logo: "/logos/hdfc.png",
    category: "private",
    rate: "8.50% – 9.65%",
    minRate: 8.50,
    maxLoan: "₹6 Cr – ₹10 Crores",
    tenure: "Max 30 Years",
    ltv: "Up to 80% – 85%",
    processingFee: "0.50% or Min ₹3,300",
    badge: "Top Private Lender",
    featured: true,
    highlights: [
      "Doorstep legal and property documentation assistance",
      "Digitally integrated in-principle sanction in 3 business days",
      "Flexible hybrid fixed-then-floating rate options"
    ],
    applyTag: "Home Loan - HDFC Bank"
  },
  {
    id: "bob",
    name: "Bank of Baroda",
    fullName: "Baroda Home Loan",
    logo: "/logos/bob.png",
    category: "psu",
    rate: "8.60% – 9.80%",
    minRate: 8.60,
    maxLoan: "Up to ₹5 Crores",
    tenure: "Max 30 Years",
    ltv: "Up to 80% – 85%",
    processingFee: "0.50% or Min ₹7,500",
    badge: "PSU Reliability",
    featured: false,
    highlights: [
      "Competitive BRLLR benchmark linked interest spread",
      "Top-up loan facility available for residential refurbishment",
      "Free accidental insurance coverage with select variants"
    ],
    applyTag: "Home Loan - Bank of Baroda"
  },
  {
    id: "kotak",
    name: "Kotak Mahindra Bank",
    fullName: "Kotak Mahindra Home Loan",
    logo: "/logos/kotak.png",
    category: "private",
    rate: "8.70% – 9.90%",
    minRate: 8.70,
    maxLoan: "Up to ₹5 Crores",
    tenure: "Max 30 Years",
    ltv: "Up to 80% – 85%",
    processingFee: "0.50% or Min ₹6,000",
    badge: "Fast Digital Sanction",
    featured: false,
    highlights: [
      "Express digital approval for pre-approved salary accounts",
      "Attractive balance transfer rates from existing bank loans",
      "Dedicated relationship manager for seamless registration"
    ],
    applyTag: "Home Loan - Kotak Mahindra Bank"
  },
  {
    id: "icici",
    name: "ICICI Bank",
    fullName: "ICICI Bank Home Loan",
    logo: "/logos/icici.png",
    category: "private",
    rate: "8.70% – 9.85%",
    minRate: 8.70,
    maxLoan: "Up to ₹5 Crores",
    tenure: "Max 30 Years",
    ltv: "Up to 80% – 85%",
    processingFee: "0.50% or Min ₹5,000",
    badge: "Popular Private Bank",
    featured: false,
    highlights: [
      "Pre-approved home loans for verified residential projects",
      "30-year amortization schedule with customizable step-up EMIs",
      "Instant sanction letter on iMobile Pay for existing customers"
    ],
    applyTag: "Home Loan - ICICI Bank"
  },
  {
    id: "axis",
    name: "Axis Bank",
    fullName: "Axis Bank Shubh Aarambh / Home Loan",
    logo: "/logos/axis.png",
    category: "private",
    rate: "8.75% – 9.90%",
    minRate: 8.75,
    maxLoan: "Up to ₹5 Crores",
    tenure: "Max 30 Years",
    ltv: "Up to 80% – 85%",
    processingFee: "0.50% or Min ₹10,000",
    badge: "EMI Waiver Benefit",
    featured: false,
    highlights: [
      "12 EMI waivers on regular repayments with Shubh Aarambh",
      "Financing available for both under-construction & ready flats",
      "Minimal branch documentation with door-step executive service"
    ],
    applyTag: "Home Loan - Axis Bank"
  },
  {
    id: "tata",
    name: "TATA Capital",
    fullName: "Tata Capital Housing Finance",
    logo: "/logos/tata.png",
    category: "hfc",
    rate: "8.75% – 10.00%",
    minRate: 8.75,
    maxLoan: "Up to ₹5 Crores",
    tenure: "Max 30 Years",
    ltv: "Up to 80% – 85%",
    processingFee: "0.50% or Min ₹5,000",
    badge: "Trusted HFC",
    featured: false,
    highlights: [
      "Tailored loan programs for self-employed non-professionals (SENP)",
      "Flexible property valuation benchmarks for independent floors",
      "PMAY subsidy assistance for first-time urban home buyers"
    ],
    applyTag: "Home Loan - TATA Capital"
  }
];

// Verified Customer Reviews
const customerStories = [
  {
    name: "Tushar Sahani",
    location: "Bengaluru, Karnataka",
    bank: "HDFC Bank (8.50% p.a.)",
    loanAmount: "₹65 Lakhs",
    quote: "Bankscart helped me compare HDFC and SBI quotes side-by-side. The doorstep documentation assistance was phenomenal, and my loan was sanctioned within 4 business days.",
    verified: true
  },
  {
    name: "Priya S. Nambiar",
    location: "Mumbai, Maharashtra",
    bank: "SBI Home Loan (8.00% p.a.)",
    loanAmount: "₹85 Lakhs",
    quote: "Got the lowest SBI rate with a 0.05% discount for women borrowers. The BanksCart advisor handled all the builder agreement checks and NOC submissions for me.",
    verified: true
  },
  {
    name: "Rahul Krishnamurthy",
    location: "Pune, Maharashtra",
    bank: "Balance Transfer to Kotak (8.70%)",
    loanAmount: "₹45 Lakhs",
    quote: "I transferred my existing home loan from an NBFC at 10.25% to Kotak at 8.70%. My monthly EMI dropped by ₹4,800 immediately, saving me over ₹11 Lakhs!",
    verified: true
  }
];

// Helper formula for Monthly Reducing EMI
function calculateHomeLoanEMI(principal, annualRate, tenureYears) {
  if (!principal || !annualRate || !tenureYears) return 0;
  const monthlyRate = annualRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  return Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
}

const HomeLoanPage = ({ openApplyModal }) => {
  const pageTitle = "Home Loan Interest Rates 2026: Compare Top Banks & Apply | BanksCart";
  const pageDescription = "Compare home loan interest rates starting from 8.00% p.a. from SBI, HDFC, ICICI & more. Check eligibility, calculate EMI, and apply online with BanksCart.";
  const canonicalUrl = "https://www.bankscart.com/loans/home-loan";

  // Structured Data Schemas (Preserved & Enhanced)
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
        "name": "Home Loan",
        "item": canonicalUrl
      }
    ]
  };

  const financialProductSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "Home Loans in India: Compare Lowest Rates & Housing Finance",
    "description": pageDescription,
    "url": canonicalUrl,
    "provider": {
      "@type": "Organization",
      "name": "BanksCart",
      "url": "https://www.bankscart.com"
    },
    "annualPercentageRate": "8.00% - 9.90%",
    "feesAndCommissionsSpecification": "Processing fee ranging from 0.25% to 0.50% + GST. Zero prepayment penalties on floating rate home loans per RBI guidelines."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the current home loan interest rates in India for 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Home loan interest rates for 2026 start from 8.00% p.a. from public sector lenders like State Bank of India (SBI) and Bank of Baroda, and 8.50% to 8.75% from leading private banks including HDFC Bank, ICICI Bank, and Kotak Mahindra Bank for borrowers with CIBIL scores of 750 and above."
        }
      },
      {
        "@type": "Question",
        "name": "What tax deductions can I claim on my home loan under Section 80C and Section 24(b)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Under Section 24(b) of the Income Tax Act, borrowers can claim up to ₹2,00,000 per financial year against interest paid on a self-occupied property. Under Section 80C, principal repayments qualify for deductions up to ₹1,50,000 annually. Joint applicants can claim these limits separately, enabling up to ₹7,00,000 in total deductions per household."
        }
      },
      {
        "@type": "Question",
        "name": "How does a home loan balance transfer work, and how much can I save?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A home loan balance transfer allows you to move your outstanding housing loan from your current lender to a new bank offering a lower interest rate. For example, refinancing a ₹50 Lakh loan from 9.50% to 8.50% saves approximately ₹3,200 per month on EMIs and up to ₹7.7 Lakhs in overall interest over 20 years. Per RBI rules, zero foreclosure penalties apply to floating-rate balance transfers."
        }
      },
      {
        "@type": "Question",
        "name": "What is the maximum Loan-to-Value (LTV) ratio allowed for home loans in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Per RBI directives, scheduled banks can finance up to 90% of property value for loans up to ₹30 Lakhs (minimum 10% down payment), up to 80% for loans between ₹30 Lakhs and ₹75 Lakhs (20% down payment), and up to 75% for loans exceeding ₹75 Lakhs (25% down payment)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum CIBIL score required for home loan approval?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most scheduled commercial banks require a minimum CIBIL credit score of 700. However, to qualify for the most competitive prime interest rate brackets (8.00% to 8.50% p.a.), banks prefer a score of 750 or higher. Scores below 700 may require a creditworthy co-applicant or higher down payment."
        }
      }
    ]
  };

  // Calculator State (housing tenure up to 30 years)
  const [calcAmount, setCalcAmount] = useState(5000000); // 50 Lakhs default
  const [calcTenure, setCalcTenure] = useState(20); // 20 years default
  const [calcRate, setCalcRate] = useState(8.5); // 8.5% default

  const emi = calculateHomeLoanEMI(calcAmount, calcRate, calcTenure);
  const totalPayment = emi * calcTenure * 12;
  const totalInterest = totalPayment - calcAmount;

  const principalPercent = totalPayment > 0 ? (calcAmount / totalPayment) * 100 : 60;
  const interestPercent = 100 - principalPercent;

  // Filter State for Lenders
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchBank, setSearchBank] = useState("");

  const filteredLenders = housingLenders.filter((lender) => {
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "psu" && lender.category === "psu") ||
      (selectedFilter === "private" && lender.category === "private") ||
      (selectedFilter === "hfc" && lender.category === "hfc");

    const matchesSearch =
      lender.name.toLowerCase().includes(searchBank.toLowerCase()) ||
      lender.fullName.toLowerCase().includes(searchBank.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // Preset Chips
  const AMOUNT_PRESETS = [
    { label: "₹30 Lakhs", value: 3000000 },
    { label: "₹50 Lakhs", value: 5000000 },
    { label: "₹75 Lakhs", value: 7500000 },
    { label: "₹1 Crore", value: 10000000 },
    { label: "₹2 Crores", value: 20000000 },
  ];

  const TENURE_PRESETS = [
    { label: "15 Years", value: 15 },
    { label: "20 Years", value: 20 },
    { label: "25 Years", value: 25 },
    { label: "30 Years", value: 30 },
  ];

  return (
    <main className="min-h-screen bg-slate-50 font-ibm text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      <Helmet>
        <html lang="en-IN" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="home loan interest rates 2026, compare home loans india, housing loan emi calculator, sbi home loan, hdfc home loan, pmay subsidy, home loan tax benefits 80c 24b, balance transfer"
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
      <Breadcrumb path={["Home", "Loans", "Home Loan"]} />

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
            <span>RBI-Regulated Housing Finance • Up to 30 Years Tenure • PMAY Subsidy Guidance</span>
          </div>

          {/* Primary H1 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Compare Home Loan Interest Rates &amp; <span className="text-amber-400">Housing Finance in India</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed font-normal">
            Compare lowest home loan interest rates starting at <strong className="text-white font-semibold">8.00% p.a.</strong> across top public &amp; private scheduled banks. Check RBI Loan-to-Value (LTV) limits, calculate EMI schedules, evaluate balance transfer savings, and claim tax deductions under Section 24(b) &amp; 80C.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              type="button"
              onClick={() => openApplyModal && openApplyModal("Home Loan")}
              className="w-full sm:w-auto h-12 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold px-8 rounded-lg shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Apply for a Home Loan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("home-loan-emi-calculator");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto h-12 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-semibold px-7 rounded-lg transition-all hover:text-white hover:border-slate-600 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Calculate Home Loan EMI</span>
            </button>

            <button
              type="button"
              onClick={() => openApplyModal && openApplyModal("Home Loan Balance Transfer")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-slate-300 hover:text-amber-400 font-medium px-4 py-3 text-sm transition-colors cursor-pointer"
            >
              <span>Transfer Existing Loan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Financial Metric Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-3.5 border border-slate-700/60 text-left">
              <div className="text-xs text-slate-400 font-medium">Interest Rates</div>
              <div className="text-sm sm:text-base font-bold text-amber-400 tabular-nums">From 8.00% p.a.</div>
              <div className="text-[11px] text-slate-400 mt-0.5">SBI &amp; HDFC Benchmark</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-3.5 border border-slate-700/60 text-left">
              <div className="text-xs text-slate-400 font-medium">Max Loan Amount</div>
              <div className="text-sm sm:text-base font-bold text-white tabular-nums">Up to ₹10 Crores</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Based on income &amp; property</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-3.5 border border-slate-700/60 text-left">
              <div className="text-xs text-slate-400 font-medium">Max Repayment Tenure</div>
              <div className="text-sm sm:text-base font-bold text-white tabular-nums">Up to 30 Years</div>
              <div className="text-[11px] text-slate-400 mt-0.5">360 monthly installments</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-3.5 border border-slate-700/60 text-left">
              <div className="text-xs text-slate-400 font-medium">Loan to Value (LTV)</div>
              <div className="text-sm sm:text-base font-bold text-emerald-400 tabular-nums">75% – 90% LTV</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Per RBI guidelines</div>
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
              Verified Housing Lenders
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Compare Home Loan Interest Rates from Top Indian Banks
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Verified benchmark rates, processing charges, and Loan-to-Value (LTV) limits for retail property buyers.
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
                  All Banks ({housingLenders.length})
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
                <button
                  type="button"
                  onClick={() => setSelectedFilter("hfc")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedFilter === "hfc"
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Housing Finance NBFCs
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
                  {/* Top Bar: Logo & Bank Name */}
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
                          {bank.category === "psu" ? "Public Sector Bank" : bank.category === "hfc" ? "Housing Finance Company" : "Scheduled Commercial Bank"}
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
                      <span className="text-xs text-slate-500 font-medium block">Max Tenure</span>
                      <span className="text-sm font-bold text-slate-900 tabular-nums">
                        {bank.tenure}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-500 font-medium block">Processing Fee</span>
                      <span className="text-sm font-bold text-slate-900 tabular-nums">
                        {bank.processingFee}
                      </span>
                    </div>
                  </div>

                  {/* Lender Highlights */}
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
                    <span>Apply for this Loan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE HOME LOAN EMI & AMORTIZATION CALCULATOR */}
        {/* ========================================================================= */}
        <section id="home-loan-emi-calculator" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 md:p-10 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
              Interactive Amortization
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Home Loan EMI Calculator (Up to 30 Years)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Plan your home purchase by calculating exact monthly installments, total interest outgo, and amortization breakdown.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-7">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="home-amount" className="text-slate-800 font-semibold text-sm sm:text-base">
                    Loan Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
                    <input
                      id="home-amount"
                      type="number"
                      min={500000}
                      max={100000000}
                      step={100000}
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(Math.max(0, Number(e.target.value)))}
                      className="w-44 pl-7 pr-3 py-1.5 border border-slate-300 rounded-lg text-right font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm sm:text-base tabular-nums"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={50000000}
                  step={100000}
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  aria-label="Home Loan Amount Slider"
                  className="w-full accent-slate-900 h-2 rounded-lg bg-slate-200 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1 tabular-nums">
                  <span>₹10 Lakhs</span>
                  <span>₹5 Crores (Max ₹10 Cr)</span>
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
                  <label htmlFor="home-rate" className="text-slate-800 font-semibold text-sm sm:text-base">
                    Interest Rate (% p.a.)
                  </label>
                  <div className="relative">
                    <input
                      id="home-rate"
                      type="number"
                      min={7.0}
                      max={14.0}
                      step={0.05}
                      value={calcRate}
                      onChange={(e) => setCalcRate(Math.max(0, Number(e.target.value)))}
                      className="w-24 px-3 py-1.5 border border-slate-300 rounded-lg text-right font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm sm:text-base tabular-nums"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={7.5}
                  max={12.0}
                  step={0.05}
                  value={calcRate}
                  onChange={(e) => setCalcRate(Number(e.target.value))}
                  aria-label="Home Loan Interest Rate Slider"
                  className="w-full accent-slate-900 h-2 rounded-lg bg-slate-200 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1 tabular-nums">
                  <span>7.50% (Lowest Benchmark)</span>
                  <span>12.00%</span>
                </div>
              </div>

              {/* Tenure in Years */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="home-tenure" className="text-slate-800 font-semibold text-sm sm:text-base">
                    Loan Tenure (Years)
                  </label>
                  <div className="relative">
                    <input
                      id="home-tenure"
                      type="number"
                      min={1}
                      max={30}
                      step={1}
                      value={calcTenure}
                      onChange={(e) => setCalcTenure(Math.max(1, Number(e.target.value)))}
                      className="w-24 px-3 py-1.5 border border-slate-300 rounded-lg text-right font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm sm:text-base tabular-nums"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={calcTenure}
                  onChange={(e) => setCalcTenure(Number(e.target.value))}
                  aria-label="Home Loan Tenure Slider"
                  className="w-full accent-slate-900 h-2 rounded-lg bg-slate-200 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1 tabular-nums">
                  <span>1 Year (12 Months)</span>
                  <span>30 Years (360 Months)</span>
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
                  <span className="text-slate-300">Sanctioned Principal</span>
                  <span className="font-bold text-white tabular-nums">₹{calcAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-300">Total Interest Payable</span>
                  <span className="font-bold text-amber-400 tabular-nums">₹{Math.round(totalInterest).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-slate-800 pt-2">
                  <span className="text-slate-200 font-semibold">Total Amount Repayable</span>
                  <span className="font-extrabold text-lg text-white tabular-nums">₹{Math.round(totalPayment).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="mt-6 pt-2">
                <button
                  type="button"
                  onClick={() => openApplyModal && openApplyModal(`Home Loan - ₹${calcAmount.toLocaleString("en-IN")}`)}
                  className="w-full h-12 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply with this Home Loan EMI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 text-center">
                <span className="text-[11px] text-slate-400">
                  * Computed on monthly reducing balance per standard scheduled bank amortization schedules.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. BALANCE TRANSFER & REFINANCING SAVINGS MODULE */}
        {/* ========================================================================= */}
        <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-slate-800">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-slate-800 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-700">
                Refinancing &amp; Liquidity
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Home Loan Balance Transfer: Save Up to ₹15–₹30 Lakhs on Interest
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2">
                If your existing home loan interest rate is above 9.25%, transfer your balance to a top bank starting at 8.00% p.a. and unlock extra top-up funding.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700/80">
                <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center mb-3">
                  <TrendingDown className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="font-bold text-white text-base mb-1">Lower Monthly EMI</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Even a 0.75% rate cut lowers your monthly burden significantly over a 15–25 year tenure.
                </p>
              </div>

              <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700/80">
                <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center mb-3">
                  <Wallet className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-bold text-white text-base mb-1">Top-Up Loan Facility</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Borrow up to ₹50 Lakhs extra at home loan interest rates for interiors, wedding, or business.
                </p>
              </div>

              <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700/80">
                <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-bold text-white text-base mb-1">Reduce Loan Tenure</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Keep your current EMI amount constant to pay off your home loan 3 to 5 years earlier.
                </p>
              </div>

              <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700/80">
                <div className="w-10 h-10 rounded-lg bg-slate-700 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="font-bold text-white text-base mb-1">0% Prepayment Fee</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  RBI mandates zero foreclosure charges on individual floating-rate home loan takeovers.
                </p>
              </div>
            </div>

            {/* Practical Balance Transfer Example Box */}
            <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-left">
                <div className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                  Real Illustration: ₹50 Lakhs Loan with 20 Years Remaining
                </div>
                <div className="text-xs text-slate-300">
                  Switching from <strong>9.50%</strong> to <strong>8.50%</strong> reduces EMI from ₹46,606 to ₹43,391/mo — <strong className="text-white">Saving ₹7,71,600</strong> in net interest.
                </div>
              </div>
              <button
                type="button"
                onClick={() => openApplyModal && openApplyModal("Home Loan Balance Transfer")}
                className="h-10 px-6 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold rounded-lg text-xs transition-colors shrink-0 inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <span>Check Transfer Savings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. TAX BENEFITS BLUEPRINT (SECTIONS 24b, 80C, 80EEA) */}
        {/* ========================================================================= */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
              Income Tax Optimization
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Tax Benefits on Home Loan Principal &amp; Interest
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Indian tax regulations offer substantial annual tax deductions for residential property owners servicing registered housing loans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-amber-400 rounded-md text-xs font-bold uppercase tracking-wider">
                Section 24(b)
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Interest Repayment Deduction: Up to ₹2,00,000 / Year
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Under Section 24(b) of the Income Tax Act, you can claim a deduction of up to ₹2,00,000 per financial year against interest paid on a home loan for a self-occupied residential property. For rented out properties, the entire interest can be claimed subject to standard set-off limits.
              </p>
              <div className="pt-2 border-t border-slate-200 text-xs text-slate-500 font-medium">
                Condition: Acquisition or construction must be completed within 5 years from end of financial year.
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 text-emerald-400 rounded-md text-xs font-bold uppercase tracking-wider">
                Section 80C
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Principal Repayment &amp; Stamp Duty: Up to ₹1,50,000 / Year
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The principal component of your home loan EMIs qualifies for tax deductions under Section 80C up to ₹1,50,000 per financial year. Additionally, stamp duty and registration fees paid during the purchase year can also be claimed within this overall ₹1.5L threshold.
              </p>
              <div className="pt-2 border-t border-slate-200 text-xs text-slate-500 font-medium">
                Condition: Property must not be sold within 5 years of possession to avoid deduction clawback.
              </div>
            </div>
          </div>

          {/* Joint Borrowers Double Benefit Highlight */}
          <div className="mt-6 p-5 bg-amber-50/70 border border-amber-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <strong className="text-xs font-bold text-amber-900 uppercase tracking-wide block">
                Joint Co-Borrowers Double Benefit
              </strong>
              <p className="text-xs text-amber-950">
                If you purchase the home jointly (e.g. husband and wife as co-owners and co-borrowers), both individuals can claim separate deductions — unlocking up to <strong>₹4 Lakhs on interest (24b)</strong> and <strong>₹3 Lakhs on principal (80C)</strong> for a total household tax shield of up to <strong>₹7 Lakhs annually</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. RBI LOAN-TO-VALUE (LTV) & ELIGIBILITY NORMS */}
        {/* ========================================================================= */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-slate-200 bg-slate-50">
            <div className="max-w-3xl">
              <span className="inline-block bg-slate-200 text-slate-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider mb-2">
                Regulatory Standards
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                RBI Loan-to-Value (LTV) Ratios &amp; Eligibility Guidelines
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                The Reserve Bank of India mandates statutory Loan-to-Value (LTV) caps to prevent over-leveraging and safeguard borrower capital.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold w-1/4">
                    Loan Amount Bracket
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-amber-400 w-1/4">
                    Maximum Bank Financing (LTV)
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-blue-300 w-1/4">
                    Borrower Down Payment
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-slate-300 w-1/4">
                    Applicable Benchmark
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                <tr>
                  <td className="px-6 py-4 font-bold text-slate-900 tabular-nums">Up to ₹30 Lakhs</td>
                  <td className="px-6 py-4 font-semibold text-emerald-700 tabular-nums">Up to 90% of Property Value</td>
                  <td className="px-6 py-4 text-slate-700 tabular-nums">Minimum 10% Own Contribution</td>
                  <td className="px-6 py-4 text-xs text-slate-600">Affordable housing tier per RBI</td>
                </tr>
                <tr className="bg-slate-50/50">
                  <td className="px-6 py-4 font-bold text-slate-900 tabular-nums">₹30 Lakhs to ₹75 Lakhs</td>
                  <td className="px-6 py-4 font-semibold text-slate-900 tabular-nums">Up to 80% of Property Value</td>
                  <td className="px-6 py-4 text-slate-700 tabular-nums">Minimum 20% Own Contribution</td>
                  <td className="px-6 py-4 text-xs text-slate-600">Standard mid-segment housing</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-slate-900 tabular-nums">Above ₹75 Lakhs</td>
                  <td className="px-6 py-4 font-semibold text-slate-900 tabular-nums">Up to 75% of Property Value</td>
                  <td className="px-6 py-4 text-slate-700 tabular-nums">Minimum 25% Own Contribution</td>
                  <td className="px-6 py-4 text-xs text-slate-600">Premium &amp; luxury residential</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Salaried vs Self Employed Snapshot */}
          <div className="p-6 bg-slate-50 border-t border-slate-200 grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Salaried Borrower Profile</span>
              </h4>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li>Age: 21 to 60 years (at maturity)</li>
                <li>Minimum Net Salary: ₹25,000/month (Metro) / ₹18,000 (Non-metro)</li>
                <li>Work Experience: Minimum 1 year total, 6 months in current job</li>
                <li>FOIR (Fixed Obligation to Income): Up to 50% – 60% of take-home pay</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Self-Employed Borrower Profile</span>
              </h4>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li>Age: 23 to 70 years (at maturity)</li>
                <li>Minimum Annual Turnover / ITR: Minimum ₹3.5 Lakhs profit</li>
                <li>Business Vintage: 3+ years of continuous operating history</li>
                <li>Bank Accounts: 12 months primary current/savings account statement</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. MANDATORY DOCUMENTATION CHECKLIST */}
        {/* ========================================================================= */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
              Clear Checklist
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Documents Required for Home Loan Approval &amp; Sanction
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Keep these KYC, financial, and property documents organized for smooth doorstep verification.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-slate-200 text-slate-900 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h3 className="font-bold text-slate-900 text-base">KYC Proofs</h3>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>PAN Card (Mandatory for all co-borrowers)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Aadhaar Card (for DigiLocker e-KYC)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Passport, Voter ID, or Driving License</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Recent passport-size color photographs</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-slate-200 text-slate-900 flex items-center justify-center font-bold text-sm">
                02
              </div>
              <h3 className="font-bold text-slate-900 text-base">Income Proofs</h3>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Last 3 months salary slips &amp; Form 16</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Latest 6 months bank statement showing salary credits</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>For Business: ITR with computation for last 2 years</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Audited Balance Sheet &amp; P&amp;L statement (CA certified)</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-slate-200 text-slate-900 flex items-center justify-center font-bold text-sm">
                03
              </div>
              <h3 className="font-bold text-slate-900 text-base">Property Documents</h3>
              <ul className="text-xs text-slate-600 space-y-2">
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Buyer-Builder Agreement / Registered Allotment Letter</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Title deed chain &amp; Encumbrance Certificate (13–30 yrs)</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Approved building sanction plan &amp; NOC from authority</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Payment receipts of advance down payment paid to seller</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. VERIFIED CUSTOMER REVIEWS */}
        {/* ========================================================================= */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
              Verified Homebuyer Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Trusted by Over 10,000+ Indian Homeowners
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Real stories from borrowers who compared rates and achieved seamless property ownership.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {customerStories.map((story) => (
              <div key={story.name} className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      {story.bank}
                    </span>
                    <span className="text-[11px] font-medium text-slate-500 tabular-nums">
                      Loan: {story.loanAmount}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <strong className="text-slate-900 block font-semibold">{story.name}</strong>
                    <span className="text-slate-500 text-[11px]">{story.location}</span>
                  </div>
                  <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">
                    ✓ Verified Customer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. FREQUENTLY ASKED QUESTIONS (ACCESSIBLE ACCORDION) */}
        {/* ========================================================================= */}
        <section id="faq" className="my-14">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
              Clear Guidance
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Frequently Asked Questions on Home Loans &amp; Balance Transfers
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Everything you need to know about housing loan interest rates, tax benefits, LTV limits, and refinancing.
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
        {/* 10. CROSS-LINK SILOS & INTERNAL FINANCIAL DIRECTORY */}
        {/* ========================================================================= */}
        <section className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Explore Related Lending &amp; Credit Solutions:
            </span>
            <Link to="/financial-directory" className="text-xs font-semibold text-slate-700 hover:text-slate-950 inline-flex items-center gap-1">
              Complete Financial Directory &rarr;
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              to="/personal-loan-emi-calculator"
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-950 hover:border-slate-300 font-medium transition-colors"
            >
              Loan EMI Calculator
            </Link>
            <Link
              to="/credit-score"
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-950 hover:border-slate-300 font-medium transition-colors"
            >
              Free CIBIL Score Check
            </Link>
            <Link
              to="/loans/personal-loan"
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-950 hover:border-slate-300 font-medium transition-colors"
            >
              Personal Loans (from 10.25%)
            </Link>
            <Link
              to="/home-loan-compare"
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-950 hover:border-slate-300 font-medium transition-colors"
            >
              Home Loan Compare Tool
            </Link>
            <Link
              to="/credit-score/credit-rectification-service"
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-950 hover:border-slate-300 font-medium transition-colors"
            >
              Credit Score Rectification
            </Link>
            <Link
              to="/plot-construction-loan"
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-950 hover:border-slate-300 font-medium transition-colors"
            >
              Plot &amp; Construction Loan
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
};

export default HomeLoanPage;
