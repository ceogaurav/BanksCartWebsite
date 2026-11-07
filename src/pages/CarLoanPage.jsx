import React, { useState, useRef, useEffect, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import {
  Car,
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
  Search,
  Users,
  Settings,
  Scale,
  BadgeCheck,
  FileCheck,
  Zap,
  HelpCircle
} from "lucide-react";

// Featured Top Indian Vehicle Lenders
const featuredCarLenders = [
  {
    id: "sbi",
    name: "State Bank of India",
    fullName: "SBI Auto Loan",
    logo: "/logos/sbi.png",
    category: "psu",
    rate: "8.90% – 9.10%",
    minRate: 8.90,
    maxLoan: "Up to 90% – 100% On-Road Price",
    tenure: "Up to 7 Years",
    processingFee: "0.25% to 0.50% or Min ₹1,000",
    badge: "Lowest Benchmark Rate",
    featured: true,
    highlights: [
      "Financing on on-road price including registration & insurance",
      "Zero prepayment penalty on floating rate car loans",
      "Special concession for green electric vehicles (EV)"
    ],
    applyTag: "Car Loan - State Bank of India"
  },
  {
    id: "hdfc",
    name: "HDFC Bank",
    fullName: "HDFC Bank Custom-fit Car Loan",
    logo: "/logos/hdfc.png",
    category: "private",
    rate: "8.95% – 9.40%",
    minRate: 8.95,
    maxLoan: "Up to 100% On-Road Price",
    tenure: "Up to 7 Years",
    processingFee: "0.50% or Min ₹3,500",
    badge: "Top Private Auto Lender",
    featured: true,
    highlights: [
      "Instant 30-minute digital approval for pre-approved customers",
      "Step-up EMI options starting lower during initial years",
      "Coverage for accessories, registration, and extended warranty"
    ],
    applyTag: "Car Loan - HDFC Bank"
  },
  {
    id: "canara",
    name: "Canara Bank",
    fullName: "Canara Car Loan",
    logo: "/logos/canara.png",
    category: "psu",
    rate: "8.20% – 9.40%",
    minRate: 8.20,
    maxLoan: "Up to 90% of Vehicle Cost",
    tenure: "Up to 7 Years",
    processingFee: "0.25% or Min ₹1,500",
    badge: "Lowest Starting Rate",
    featured: false,
    highlights: [
      "Industry-leading 8.20% entry interest rate",
      "Transparent sovereign PSU terms with no hidden overheads",
      "Flexible margin money requirement (10% to 15%)"
    ],
    applyTag: "Car Loan - Canara Bank"
  },
  {
    id: "icici",
    name: "ICICI Bank",
    fullName: "ICICI Bank Car Loan",
    logo: "/logos/icici.png",
    category: "private",
    rate: "9.10% – 9.25%",
    minRate: 9.10,
    maxLoan: "Up to 100% On-Road Price",
    tenure: "Up to 7 Years",
    processingFee: "Up to ₹3,500 + GST",
    badge: "Instant Approval",
    featured: false,
    highlights: [
      "Instant digital sanction on iMobile Pay application",
      "Exclusive manufacturer tie-ups across Maruti, Hyundai & Tata",
      "Minimal physical paperwork for salaried account holders"
    ],
    applyTag: "Car Loan - ICICI Bank"
  },
  {
    id: "axis",
    name: "Axis Bank",
    fullName: "Axis Bank Auto Loan",
    logo: "/logos/axis.png",
    category: "private",
    rate: "9.10% – 9.40%",
    minRate: 9.10,
    maxLoan: "Up to 100% On-Road Price",
    tenure: "Up to 7 Years",
    processingFee: "0.50% or Min ₹3,500",
    badge: "100% Financing Option",
    featured: false,
    highlights: [
      "Complete 100% on-road financing for select passenger car models",
      "Zero foreclosure charges after 24 months of on-time EMIs",
      "Express approval with doorstep document collection"
    ],
    applyTag: "Car Loan - Axis Bank"
  },
  {
    id: "bob",
    name: "Bank of Baroda",
    fullName: "Baroda Car Loan",
    logo: "/logos/bob.png",
    category: "psu",
    rate: "8.80% – 8.90%",
    minRate: 8.80,
    maxLoan: "Up to ₹1 Crore",
    tenure: "Up to 7 Years",
    processingFee: "0.25% to 0.50% or Min ₹1,000",
    badge: "PSU Reliability",
    featured: false,
    highlights: [
      "Competitively priced benchmark-linked interest spreads",
      "Zero foreclosure penalties on floating-rate individual loans",
      "Up to 90% financing for verified retail passenger vehicles"
    ],
    applyTag: "Car Loan - Bank of Baroda"
  }
];

// Complete 27-Bank Reference Library (Preserved from legacy page)
const allBanksTable = [
  { name: "Canara Bank", rate: "8.20% p.a. onwards", tenure: "Up to 7 years", category: "psu" },
  { name: "Union Bank of India", rate: "8.20% p.a. onwards", tenure: "Up to 7 years", category: "psu" },
  { name: "Bank of Maharashtra", rate: "8.20% p.a. onwards", tenure: "Up to 7 years", category: "psu" },
  { name: "Indian Bank", rate: "8.25% p.a. onwards", tenure: "Up to 7 years", category: "psu" },
  { name: "Punjab National Bank", rate: "8.35% p.a. (Floating) / 9.35% (Fixed)", tenure: "Up to 7 years", category: "psu" },
  { name: "Central Bank of India", rate: "8.35% p.a. onwards", tenure: "Up to 7 years", category: "psu" },
  { name: "UCO Bank", rate: "8.35% p.a. onwards", tenure: "Up to 7 years", category: "psu" },
  { name: "Bandhan Bank", rate: "8.47% p.a. onwards", tenure: "Up to 7 years", category: "private" },
  { name: "Indian Overseas Bank", rate: "8.60% p.a. onwards", tenure: "Up to 7 years", category: "psu" },
  { name: "IDBI Bank", rate: "8.65% (Floating) / 9.20% (Fixed)", tenure: "Up to 7 years", category: "psu" },
  { name: "Bank of India", rate: "8.75% p.a. onwards", tenure: "Up to 7 years", category: "psu" },
  { name: "South Indian Bank", rate: "8.75% p.a. onwards", tenure: "Up to 7 years", category: "private" },
  { name: "Karnataka Bank", rate: "8.80% p.a. onwards", tenure: "Up to 7 years", category: "private" },
  { name: "Bank of Baroda", rate: "8.80% (Fixed) / 8.90% (Floating)", tenure: "Up to 7 years", category: "psu" },
  { name: "State Bank of India", rate: "8.90% – 9.10% p.a. onwards", tenure: "Up to 7 years", category: "psu" },
  { name: "Federal Bank", rate: "9.00% p.a. onwards", tenure: "Up to 7 years", category: "private" },
  { name: "Equitas Small Finance Bank", rate: "9.00% p.a. onwards", tenure: "Up to 7 years", category: "private" },
  { name: "ICICI Bank", rate: "9.10% – 9.25% p.a. onwards", tenure: "Up to 7 years", category: "private" },
  { name: "Karur Vysya Bank", rate: "9.25% p.a. onwards", tenure: "Up to 7 years", category: "private" },
  { name: "HDFC Bank", rate: "8.95% – 9.40% p.a. onwards", tenure: "Up to 7 years", category: "private" },
  { name: "Axis Bank", rate: "9.10% – 9.40% p.a. onwards", tenure: "Up to 7 years", category: "private" },
  { name: "IDFC First Bank", rate: "9.99% p.a. onwards", tenure: "Up to 10 years", category: "private" },
  { name: "Tamilnad Mercantile Bank", rate: "10.25% p.a. onwards", tenure: "Up to 7 years", category: "private" },
  { name: "IndusInd Bank", rate: "8.00% p.a. onwards", tenure: "Up to 5 years", category: "private" },
  { name: "Kotak Mahindra Bank", rate: "8.90% – 9.50% p.a. onwards", tenure: "Up to 7 years", category: "private" },
  { name: "Jammu and Kashmir Bank", rate: "RLLR + 0.75% (Floating) / RLLR + 0.25% (Fixed)", tenure: "Up to 7 years", category: "private" },
  { name: "Yes Bank", rate: "8.99% – 9.60% p.a. onwards", tenure: "Up to 8 years", category: "private" }
];

// Helper formula for Monthly Reducing EMI
function calculateCarLoanEMI(principal, annualRate, tenureYears) {
  if (!principal || !annualRate || !tenureYears) return 0;
  const monthlyRate = annualRate / (12 * 100);
  const totalMonths = tenureYears * 12;
  return Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );
}

const CarLoanPage = ({ openApplyModal }) => {
  const pageTitle = "Car Loan Interest Rates 2026: Compare Top Banks & Apply Online | BanksCart";
  const pageDescription = "Compare car loan interest rates starting from 8.20% p.a. from SBI, HDFC, ICICI, Axis & more. Calculate vehicle EMI, check eligibility, and apply with up to 100% on-road financing.";
  const canonicalUrl = "https://www.bankscart.com/loans/car";

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
        "name": "Car Loan",
        "item": canonicalUrl
      }
    ]
  };

  const financialProductSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "Car Loans in India: Compare Low Interest Rates & Auto Financing",
    "description": pageDescription,
    "url": canonicalUrl,
    "provider": {
      "@type": "Organization",
      "name": "BanksCart",
      "url": "https://www.bankscart.com"
    },
    "annualPercentageRate": "8.20% - 10.50%",
    "feesAndCommissionsSpecification": "Processing fee ranging from 0.25% to 0.50% or flat ₹1,000 to ₹3,500 + GST. Financing available up to 100% on-road price."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are the current car loan interest rates in India for 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Car loan interest rates for 2026 start from 8.20% p.a. from public sector lenders like Canara Bank and Union Bank, and 8.90% to 9.25% from leading banks including SBI, HDFC Bank, ICICI Bank, and Bank of Baroda for borrowers with CIBIL scores of 700 and above."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get 100% financing on the on-road price of a new car?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Top lenders like HDFC Bank, ICICI Bank, and Axis Bank provide up to 100% financing on the on-road price (covering ex-showroom price, RTO registration, road tax, and insurance) for prime salaried applicants and select pre-approved customers."
        }
      },
      {
        "@type": "Question",
        "name": "What is hypothecation in a car loan, and how is it removed?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hypothecation means the vehicle is pledged to the lending bank as security until the entire loan is repaid. The bank's name is endorsed on your Vehicle Registration Certificate (RC) via RTO Form 34. Once your loan is closed, you obtain an NOC and Form 35 from the bank and submit them to your local RTO to remove the hypothecation."
        }
      },
      {
        "@type": "Question",
        "name": "What is the maximum tenure available for a car loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The standard tenure for a new car loan ranges between 1 and 7 years (12 to 84 months). Select lenders like IDFC First Bank and Yes Bank offer extended tenures up to 8 to 10 years for premium vehicle segments."
        }
      },
      {
        "@type": "Question",
        "name": "Can I prepay or foreclose my car loan before the tenure ends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Most banks permit car loan prepayment or foreclosure after an initial lock-in period (typically 6 to 12 months). Floating-rate loans for individuals attract zero foreclosure penalties per RBI directives, while fixed-rate auto loans may levy a charge of 2% to 5% on the outstanding balance."
        }
      }
    ]
  };

  // Calculator State
  const [calcAmount, setCalcAmount] = useState(600000); // ₹6 Lakhs default
  const [calcRate, setCalcRate] = useState(8.9); // 8.9% default
  const [calcTenure, setCalcTenure] = useState(5); // 5 years default
  const [calcFee, setCalcFee] = useState(0.5); // 0.5% fee default

  const emi = calculateCarLoanEMI(calcAmount, calcRate, calcTenure);
  const totalMonths = calcTenure * 12;
  const processingFeeAmount = Math.round((calcAmount * calcFee) / 100);
  const totalPayment = emi * totalMonths + processingFeeAmount;
  const totalInterest = totalPayment - calcAmount - processingFeeAmount;

  const principalPercent = totalPayment > 0 ? (calcAmount / totalPayment) * 100 : 70;
  const interestPercent = 100 - principalPercent;

  // Filter State
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchBank, setSearchBank] = useState("");
  const [showAllBanksList, setShowAllBanksList] = useState(false);

  const filteredFeatured = featuredCarLenders.filter((lender) => {
    const matchesFilter =
      selectedFilter === "all" ||
      (selectedFilter === "psu" && lender.category === "psu") ||
      (selectedFilter === "private" && lender.category === "private");

    const matchesSearch =
      lender.name.toLowerCase().includes(searchBank.toLowerCase()) ||
      lender.fullName.toLowerCase().includes(searchBank.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const filteredFullList = allBanksTable.filter((bank) =>
    bank.name.toLowerCase().includes(searchBank.toLowerCase())
  );

  // Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  // Presets
  const AMOUNT_PRESETS = [
    { label: "₹3 Lakhs", value: 300000 },
    { label: "₹5 Lakhs", value: 500000 },
    { label: "₹8 Lakhs", value: 800000 },
    { label: "₹12 Lakhs", value: 1200000 },
    { label: "₹20 Lakhs", value: 2000000 },
  ];

  const TENURE_PRESETS = [
    { label: "3 Years", value: 3 },
    { label: "4 Years", value: 4 },
    { label: "5 Years", value: 5 },
    { label: "7 Years", value: 7 },
  ];

  return (
    <main className="min-h-screen bg-slate-50 font-ibm text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      <Helmet>
        <html lang="en-IN" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content="car loan interest rates 2026, compare car loans india, auto loan emi calculator, sbi car loan, hdfc car loan, 100% on road car finance, new car loan, used car loan"
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
      <Breadcrumb path={["Home", "Loans", "Car Loan"]} />

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
            <span>New &amp; Pre-Owned Auto Finance • Up to 100% On-Road Funding • Zero Foreclosure Options</span>
          </div>

          {/* Primary H1 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Compare Car Loan Interest Rates &amp; <span className="text-amber-400">Apply Online in India</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed font-normal">
            Compare lowest car loan interest rates starting from <strong className="text-white font-semibold">8.20% p.a.</strong> across India&apos;s leading scheduled banks. Finance up to 100% of the on-road price with flexible repayment tenures up to 8 years and instant digital in-principle sanction.
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              type="button"
              onClick={() => openApplyModal && openApplyModal("Car Loan")}
              className="w-full sm:w-auto h-12 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold px-8 rounded-lg shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Apply for a Car Loan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("car-loan-emi-calculator");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto h-12 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-semibold px-7 rounded-lg transition-all hover:text-white hover:border-slate-600 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Calculate Car Loan EMI</span>
            </button>

            <a
              href="#comparison-table"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-slate-300 hover:text-amber-400 font-medium px-4 py-3 text-sm transition-colors cursor-pointer"
            >
              <span>Compare 27+ Banks</span>
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          {/* Financial Metric Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800">
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-3.5 border border-slate-700/60 text-left">
              <div className="text-xs text-slate-400 font-medium">Interest Rates</div>
              <div className="text-sm sm:text-base font-bold text-amber-400 tabular-nums">From 8.20% p.a.</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Canara &amp; Union Bank entry</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-3.5 border border-slate-700/60 text-left">
              <div className="text-xs text-slate-400 font-medium">Max Funding Cap</div>
              <div className="text-sm sm:text-base font-bold text-white tabular-nums">Up to 100% On-Road</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Ex-showroom + RTO + Insurance</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-3.5 border border-slate-700/60 text-left">
              <div className="text-xs text-slate-400 font-medium">Repayment Tenure</div>
              <div className="text-sm sm:text-base font-bold text-white tabular-nums">1 to 8 Years</div>
              <div className="text-[11px] text-slate-400 mt-0.5">12 to 96 monthly EMIs</div>
            </div>
            <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-3.5 border border-slate-700/60 text-left">
              <div className="text-xs text-slate-400 font-medium">Processing Fee</div>
              <div className="text-sm sm:text-base font-bold text-emerald-400 tabular-nums">₹1,000 – ₹3,500</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Select festive waivers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Page Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14">

        {/* ========================================================================= */}
        {/* 2. FEATURED AUTO LENDERS MATRIX */}
        {/* ========================================================================= */}
        <section id="compare-lenders" className="scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
              Verified Auto Lenders
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Compare Top Car Loan Interest Rates Across India
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Compare verified annual percentage rates (APR), on-road financing caps, and tenure flexibility for new &amp; used cars.
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
                  Featured Banks ({featuredCarLenders.length})
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
            {filteredFeatured.map((bank) => (
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
                      <span className="text-xs text-slate-500 font-medium block">Max Financing</span>
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
                      <span className="text-xs text-slate-500 font-medium block">Processing Fee</span>
                      <span className="text-sm font-bold text-slate-900 tabular-nums">
                        {bank.processingFee}
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
                    <span>Apply for Car Loan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. INTERACTIVE CAR LOAN EMI & AFFORDABILITY CALCULATOR */}
        {/* ========================================================================= */}
        <section id="car-loan-emi-calculator" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 md:p-10 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
              Interactive Repayment Estimator
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Car Loan EMI &amp; Affordability Calculator
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Estimate your monthly car installment, total interest payable, and processing charges based on real-time bank interest rates.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Controls */}
            <div className="lg:col-span-7 space-y-7">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="car-amount" className="text-slate-800 font-semibold text-sm sm:text-base">
                    Car Loan Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
                    <input
                      id="car-amount"
                      type="number"
                      min={50000}
                      max={10000000}
                      step={25000}
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(Math.max(0, Number(e.target.value)))}
                      className="w-44 pl-7 pr-3 py-1.5 border border-slate-300 rounded-lg text-right font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm sm:text-base tabular-nums"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={50000}
                  max={5000000}
                  step={25000}
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  aria-label="Car Loan Amount Slider"
                  className="w-full accent-slate-900 h-2 rounded-lg bg-slate-200 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1 tabular-nums">
                  <span>₹50,000</span>
                  <span>₹50 Lakhs (Max ₹1 Cr)</span>
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
                  <label htmlFor="car-rate" className="text-slate-800 font-semibold text-sm sm:text-base">
                    Interest Rate (% p.a.)
                  </label>
                  <div className="relative">
                    <input
                      id="car-rate"
                      type="number"
                      min={7.5}
                      max={16.0}
                      step={0.05}
                      value={calcRate}
                      onChange={(e) => setCalcRate(Math.max(0, Number(e.target.value)))}
                      className="w-24 px-3 py-1.5 border border-slate-300 rounded-lg text-right font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm sm:text-base tabular-nums"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={8.0}
                  max={14.0}
                  step={0.05}
                  value={calcRate}
                  onChange={(e) => setCalcRate(Number(e.target.value))}
                  aria-label="Car Loan Interest Rate Slider"
                  className="w-full accent-slate-900 h-2 rounded-lg bg-slate-200 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1 tabular-nums">
                  <span>8.20% (Lowest Benchmark)</span>
                  <span>14.00%</span>
                </div>
              </div>

              {/* Tenure in Years */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="car-tenure" className="text-slate-800 font-semibold text-sm sm:text-base">
                    Loan Tenure (Years)
                  </label>
                  <div className="relative">
                    <input
                      id="car-tenure"
                      type="number"
                      min={1}
                      max={8}
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
                  max={8}
                  step={1}
                  value={calcTenure}
                  onChange={(e) => setCalcTenure(Number(e.target.value))}
                  aria-label="Car Loan Tenure Slider"
                  className="w-full accent-slate-900 h-2 rounded-lg bg-slate-200 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1 tabular-nums">
                  <span>1 Year (12 Months)</span>
                  <span>8 Years (96 Months)</span>
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

              {/* Processing Fee Percentage */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label htmlFor="car-fee" className="text-slate-800 font-medium text-xs sm:text-sm">
                    Processing Fee Rate (%): <span className="font-bold text-slate-900 tabular-nums">{calcFee}%</span>
                  </label>
                  <span className="text-xs text-slate-500 tabular-nums">Est. ₹{processingFeeAmount.toLocaleString("en-IN")}</span>
                </div>
                <input
                  id="car-fee"
                  type="range"
                  min={0}
                  max={2.5}
                  step={0.1}
                  value={calcFee}
                  onChange={(e) => setCalcFee(Number(e.target.value))}
                  className="w-full accent-slate-900 h-1.5 rounded-lg bg-slate-200 cursor-pointer"
                />
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
                  <span className="text-slate-300">Car Loan Principal</span>
                  <span className="font-bold text-white tabular-nums">₹{calcAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-300">Total Interest Payable</span>
                  <span className="font-bold text-amber-400 tabular-nums">₹{Math.round(totalInterest).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-300">Estimated Processing Fee</span>
                  <span className="font-bold text-slate-300 tabular-nums">₹{processingFeeAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-slate-800 pt-2">
                  <span className="text-slate-200 font-semibold">Total Amount Repayable</span>
                  <span className="font-extrabold text-lg text-white tabular-nums">₹{Math.round(totalPayment).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="mt-6 pt-2">
                <button
                  type="button"
                  onClick={() => openApplyModal && openApplyModal(`Car Loan - ₹${calcAmount.toLocaleString("en-IN")}`)}
                  className="w-full h-12 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply with this Car Loan EMI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 text-center">
                <span className="text-[11px] text-slate-400">
                  * Computed on monthly reducing balance per standard scheduled commercial bank amortization schedules.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. COMPLETE 27-BANK COMPARISON TABLE (PRESERVED & UPGRADED) */}
        {/* ========================================================================= */}
        <section id="comparison-table" className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden scroll-mt-24">
          <div className="p-6 sm:p-8 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="inline-block bg-slate-200 text-slate-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider mb-2">
                Comprehensive Bank Directory
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                Car Loan Comparison: All 27 Scheduled Indian Banks
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Complete overview of interest rate benchmarks and maximum permissible tenures across public and private banks.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowAllBanksList(!showAllBanksList)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs transition-colors shrink-0 cursor-pointer"
            >
              {showAllBanksList ? "Show Top 10 Only" : `View All ${allBanksTable.length} Banks`}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold w-1/3">
                    Name of the Bank
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-amber-400 w-1/3">
                    Indicative Interest Rate (p.a.)
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-slate-300 w-1/6">
                    Max Tenure
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold text-right w-1/6">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {(showAllBanksList ? filteredFullList : filteredFullList.slice(0, 10)).map((bank, i) => (
                  <tr key={bank.name} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="px-6 py-4 font-bold text-slate-900">
                      {bank.name}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-800 tabular-nums">
                      {bank.rate}
                    </td>
                    <td className="px-6 py-4 text-slate-700 tabular-nums">
                      {bank.tenure}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => openApplyModal && openApplyModal(`Car Loan - ${bank.name}`)}
                        className="h-8 px-3.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold rounded-md text-xs transition-colors inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. TYPES OF CAR LOANS IN INDIA */}
        {/* ========================================================================= */}
        <section id="types-of-car-loans" className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
              Vehicle Categories
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Types of Car Financing Options
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Whether you are purchasing a showroom vehicle, a certified pre-owned car, or refinancing an existing car, explore tailored loan schemes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-900 flex items-center justify-center mb-3">
                  <Car className="w-5 h-5 text-slate-800" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">New Car Loan</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Financing for brand-new showroom passenger vehicles. Up to 100% on-road price funding available with repayment tenures up to 7–8 years.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-900 flex items-center justify-center mb-3">
                  <Clock className="w-5 h-5 text-slate-800" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Used Car Loan</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Financing up to 80%–85% of car valuation for certified second-hand vehicles up to 5–7 years of vehicle age with tenures up to 5 years.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-900 flex items-center justify-center mb-3">
                  <Wallet className="w-5 h-5 text-slate-800" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Loan Against Car</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pledge an existing hypothecation-free vehicle as collateral to raise emergency liquidity at interest rates much lower than unsecured loans.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-900 flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5 text-emerald-600" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">Green EV Car Loan</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Special 0.25%–0.50% concessional interest rates for electric vehicles with waived processing charges from SBI (Green Car Loan) and other lenders.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. KEY COMPONENTS OF VEHICLE FINANCING */}
        {/* ========================================================================= */}
        <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-slate-800">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block bg-slate-800 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-700">
                Borrower Fundamentals
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Key Components of an Auto Loan Agreement
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2">
                Understanding loan terms, margin money, and hypothecation ensures full transparency throughout your vehicle ownership journey.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700/80 space-y-2">
                <h3 className="font-bold text-amber-400 text-base">Down Payment</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The upfront equity amount paid directly to the automobile dealership. Higher down payments lower your monthly EMI and total interest outgo.
                </p>
              </div>

              <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700/80 space-y-2">
                <h3 className="font-bold text-amber-400 text-base">On-Road vs Ex-Showroom</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Ex-showroom is the factory cost. On-road price includes mandatory state road tax, lifetime RTO registration, FASTag, and comprehensive motor insurance.
                </p>
              </div>

              <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700/80 space-y-2">
                <h3 className="font-bold text-amber-400 text-base">Vehicle Hypothecation</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The vehicle serves as collateral. The lending bank&apos;s hypothecation is endorsed on your RTO Registration Certificate (RC) until full loan closure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. ELIGIBILITY CRITERIA & MANDATORY DOCUMENTS */}
        {/* ========================================================================= */}
        <section id="eligibility-criteria" className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden scroll-mt-24">
          <div className="p-6 sm:p-8 border-b border-slate-200 bg-slate-50">
            <div className="max-w-3xl">
              <span className="inline-block bg-slate-200 text-slate-800 text-xs font-semibold px-2.5 py-0.5 rounded uppercase tracking-wider mb-2">
                Approval Matrix
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                Car Loan Eligibility Benchmarks &amp; Documents Required
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Standard benchmarks for salaried employees, business owners, and self-employed professionals across Indian lenders.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 grid sm:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Eligibility Criteria</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                  <span><strong>Age Bracket:</strong> 18 to 75 years at loan maturity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                  <span><strong>Minimum Net Income:</strong> ₹20,000/month for salaried; annual ITR ₹3 Lakhs+ for self-employed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                  <span><strong>Employment Stability:</strong> At least 1 year total, minimum 6 months with current employer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                  <span><strong>Credit Score:</strong> CIBIL score of 700+ for standard approval; 750+ for lowest rate margins.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                <span>Mandatory Documents</span>
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                  <span><strong>Identity Proof:</strong> PAN Card (Mandatory), Aadhaar Card, Passport, or Driving License.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                  <span><strong>Address Proof:</strong> Aadhaar Card, Recent Utility Bill, or Registered Rental Agreement.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                  <span><strong>Income Proof:</strong> Last 3 months salary slips, Form 16, or 2 years ITR with CA computation.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                  <span><strong>Vehicle Quotation:</strong> Proforma invoice / sales quotation from authorized car dealer.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. RTO HYPOTHECATION ENDORSEMENT & REMOVAL GUIDE */}
        {/* ========================================================================= */}
        <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
                Legal &amp; Regulatory Process
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">
                How RTO Hypothecation Endorsement &amp; Removal Works
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm mt-1">
                Motor Vehicles Act compliance for registered hypothecation between the borrower, lending institution, and State RTO.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-blue-100 text-blue-900 rounded text-xs font-bold uppercase">
                  At Purchase: Form 34
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Hypothecation Addition</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  When buying a financed car, RTO Form 34 is signed by borrower and bank. The State RTO records the lender&apos;s legal lien on the Registration Certificate (RC), ensuring the vehicle cannot be sold without bank clearance.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-100 text-emerald-900 rounded text-xs font-bold uppercase">
                  At Loan Closure: Form 35 + NOC
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Hypothecation Removal (HPT)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  After paying your final EMI, the lender issues a No Objection Certificate (NOC) and signed Form 35. Submit these to your local RTO within 90 days to generate a clean, unencumbered RC in your sole name.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. FREQUENTLY ASKED QUESTIONS (ACCESSIBLE ACCORDION) */}
        {/* ========================================================================= */}
        <section id="faq" className="my-14 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
              Clear Guidance
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Frequently Asked Questions (FAQs) About Car Loans
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Everything you need to know about auto loan eligibility, interest calculations, down payments, and hypothecation.
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
              Explore Related Auto &amp; Personal Credit Solutions:
            </span>
            <Link to="/financial-directory" className="text-xs font-semibold text-slate-700 hover:text-slate-950 inline-flex items-center gap-1">
              Complete Financial Directory &rarr;
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              to="/loans/used-car"
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-950 hover:border-slate-300 font-medium transition-colors"
            >
              Used Car Loans
            </Link>
            <Link
              to="/loans/two-wheeler"
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-950 hover:border-slate-300 font-medium transition-colors"
            >
              Two-Wheeler Loans
            </Link>
            <Link
              to="/car-loan-emi-calculator"
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-950 hover:border-slate-300 font-medium transition-colors"
            >
              Dedicated Car Loan EMI Tool
            </Link>
            <Link
              to="/insurance/car"
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-950 hover:border-slate-300 font-medium transition-colors"
            >
              Comprehensive Car Insurance
            </Link>
            <Link
              to="/credit-score"
              className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-slate-700 hover:text-slate-950 hover:border-slate-300 font-medium transition-colors"
            >
              Check Free Credit Score for Auto Loan
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
};

export default CarLoanPage;
