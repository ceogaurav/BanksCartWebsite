import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import {
  Home,
  User,
  Briefcase,
  Car,
  Bike,
  GraduationCap,
  Coins,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Percent,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Search,
  HelpCircle,
  Building2,
  Lock,
  Clock,
  ChevronDown,
  Layers,
  FileText,
  BadgeCheck,
  ExternalLink,
  Award
} from "lucide-react";

// Loan Categories Directory Data
const loanCategories = [
  {
    id: "personal",
    title: "Personal Loan",
    category: "Unsecured Retail",
    rate: "From 10.49% p.a.",
    maxAmount: "Up to ₹40 Lakhs",
    tenure: "1 to 5 Years",
    description: "Multi-purpose personal financing for medical emergencies, home renovation, weddings, or debt consolidation with zero collateral.",
    icon: User,
    color: "text-blue-600",
    bg: "bg-blue-50",
    perks: [
      "Instant disbursal in 24 hours",
      "No physical collateral required",
      "Minimal paperless documentation"
    ],
    to: "/loans/personal-loan",
    tag: "Most Popular"
  },
  {
    id: "home",
    title: "Home Loan",
    category: "Secured Housing",
    rate: "From 8.35% p.a.",
    maxAmount: "Up to ₹10 Crores",
    tenure: "Up to 30 Years",
    description: "Finance your dream apartment, independent villa, or plot construction with competitive floating rates and PMAY interest subsidy support.",
    icon: Home,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    perks: [
      "Lowest market interest rates",
      "Flexible repayment up to 30 years",
      "Balance transfer with top-up available"
    ],
    to: "/loans/home-loan",
    tag: "Lowest Interest"
  },
  {
    id: "business",
    title: "Business Loan",
    category: "Commercial & MSME",
    rate: "From 11.25% p.a.",
    maxAmount: "Up to ₹75 Lakhs",
    tenure: "1 to 7 Years",
    description: "Empower your business expansion, working capital, inventory purchase, and machinery upgrades with tailored collateral-free MSME credit.",
    icon: Briefcase,
    color: "text-amber-600",
    bg: "bg-amber-50",
    perks: [
      "CGTMSE collateral-free support",
      "Quick sanction on GST turnover",
      "Flexible overdraft & term loan models"
    ],
    to: "/business-loan",
    tag: "MSME Scheme"
  },
  {
    id: "car",
    title: "New Car Loan",
    category: "Auto Financing",
    rate: "From 8.65% p.a.",
    maxAmount: "Up to 100% On-Road",
    tenure: "1 to 7 Years",
    description: "Drive home your brand-new sedan, SUV, or electric vehicle with up to 100% on-road funding and fast digital RTO hypothecation.",
    icon: Car,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    perks: [
      "Up to 100% on-road price funding",
      "Special EV green interest discounts",
      "Zero foreclosure after 12 months"
    ],
    to: "/loans/car",
    tag: "Fast Track"
  },
  {
    id: "used-car",
    title: "Used Car Loan",
    category: "Auto Financing",
    rate: "From 10.99% p.a.",
    maxAmount: "Up to 90% Valuation",
    tenure: "1 to 5 Years",
    description: "Get funding for certified pre-owned hatchbacks, luxury sedans, or SUVs with instant vehicle valuation and hassle-free RC transfer assistance.",
    icon: Car,
    color: "text-purple-600",
    bg: "bg-purple-50",
    perks: [
      "Covers up to 90% of vehicle value",
      "Instant multi-point digital valuation",
      "Doorstep document verification"
    ],
    to: "/loans/used-car",
    tag: "Pre-Owned"
  },
  {
    id: "two-wheeler",
    title: "Two-Wheeler Loan",
    category: "Auto Financing",
    rate: "From 9.99% p.a.",
    maxAmount: "Up to 100% Ex-Showroom",
    tenure: "1 to 4 Years",
    description: "Hit the road on your new motorcycle, commuter scooter, or electric bike with super-fast approvals and pocket-friendly monthly EMIs.",
    icon: Bike,
    color: "text-rose-600",
    bg: "bg-rose-50",
    perks: [
      "100% ex-showroom financing",
      "Approvals in under 30 minutes",
      "Low processing fees starting from ₹499"
    ],
    to: "/loans/two-wheeler",
    tag: "Instant"
  },
  {
    id: "education",
    title: "Education Loan",
    category: "Academic & Career",
    rate: "From 8.15% p.a.",
    maxAmount: "Up to ₹1.50 Crores",
    tenure: "Up to 15 Years",
    description: "Invest in higher education across premier colleges in India and overseas. Comprehensive financing covering tuition, living expenses, and travel.",
    icon: GraduationCap,
    color: "text-teal-600",
    bg: "bg-teal-50",
    perks: [
      "100% Section 80E tax deduction",
      "Moratorium during course + 1 year",
      "Collateral-free up to ₹50L for top institutes"
    ],
    to: "/loans/education",
    tag: "Tax Saver"
  },
  {
    id: "gold",
    title: "Gold Loan",
    category: "Secured Liquidity",
    rate: "From 8.75% p.a.",
    maxAmount: "Up to 75% Gold LTV",
    tenure: "3 to 36 Months",
    description: "Unlock the value of your gold jewelry for immediate cash requirements with same-day bank account disbursal and safe vault storage.",
    icon: Coins,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
    perks: [
      "Same-day disbursal in 30 minutes",
      "Zero CIBIL score dependency",
      "100% insured bank vault safety"
    ],
    to: "/gold-loan-emi-calculator",
    tag: "Instant Cash"
  }
];

// Top Bank Rate Comparison Table
const bankComparison = [
  {
    bank: "State Bank of India (SBI)",
    personal: "11.15% - 14.30%",
    home: "8.50% - 9.85%",
    car: "8.75% - 9.80%",
    business: "11.20% - 14.50%",
    education: "8.15% - 9.65%",
    minCibil: "700+"
  },
  {
    bank: "HDFC Bank",
    personal: "10.50% - 21.00%",
    home: "8.70% - 9.80%",
    car: "8.95% - 10.25%",
    business: "11.90% - 21.35%",
    education: "9.25% - 12.75%",
    minCibil: "720+"
  },
  {
    bank: "ICICI Bank",
    personal: "10.80% - 16.50%",
    home: "8.75% - 9.90%",
    car: "8.85% - 10.50%",
    business: "12.00% - 17.50%",
    education: "9.50% - 11.75%",
    minCibil: "720+"
  },
  {
    bank: "Axis Bank",
    personal: "10.75% - 22.00%",
    home: "8.75% - 10.05%",
    car: "9.00% - 10.80%",
    business: "12.50% - 20.00%",
    education: "9.75% - 13.00%",
    minCibil: "700+"
  },
  {
    bank: "Bank of Baroda",
    personal: "10.90% - 18.25%",
    home: "8.40% - 10.15%",
    car: "8.70% - 10.10%",
    business: "11.45% - 16.50%",
    education: "8.55% - 9.90%",
    minCibil: "701+"
  },
  {
    bank: "Kotak Mahindra Bank",
    personal: "10.99% - 24.00%",
    home: "8.70% - 9.65%",
    car: "8.90% - 10.50%",
    business: "12.50% - 22.00%",
    education: "10.25% - 13.50%",
    minCibil: "720+"
  },
  {
    bank: "Punjab National Bank (PNB)",
    personal: "11.40% - 15.65%",
    home: "8.45% - 10.25%",
    car: "8.75% - 9.90%",
    business: "11.55% - 15.90%",
    education: "8.75% - 10.25%",
    minCibil: "680+"
  }
];

// Universal EMI Calculator Presets
const calculatorPresets = {
  personal: { name: "Personal Loan", defaultAmount: 500000, minAmount: 50000, maxAmount: 4000000, defaultRate: 11.5, defaultTenure: 3, maxTenure: 5, unit: "Yr" },
  home: { name: "Home Loan", defaultAmount: 4000000, minAmount: 500000, maxAmount: 50000000, defaultRate: 8.75, defaultTenure: 20, maxTenure: 30, unit: "Yr" },
  business: { name: "Business Loan", defaultAmount: 1500000, minAmount: 100000, maxAmount: 7500000, defaultRate: 13.0, defaultTenure: 4, maxTenure: 7, unit: "Yr" },
  car: { name: "Car Loan", defaultAmount: 800000, minAmount: 100000, maxAmount: 5000000, defaultRate: 8.95, defaultTenure: 5, maxTenure: 7, unit: "Yr" },
  education: { name: "Education Loan", defaultAmount: 2000000, minAmount: 100000, maxAmount: 15000000, defaultRate: 9.25, defaultTenure: 10, maxTenure: 15, unit: "Yr" }
};

const LoansOverviewPage = () => {
  // Category Filter State
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Universal Calculator State
  const [activeCalcType, setActiveCalcType] = useState("personal");
  const currentPreset = calculatorPresets[activeCalcType];
  const [calcAmount, setCalcAmount] = useState(currentPreset.defaultAmount);
  const [calcRate, setCalcRate] = useState(currentPreset.defaultRate);
  const [calcTenure, setCalcTenure] = useState(currentPreset.defaultTenure);

  // Switch calculator preset handler
  const handleCalcTypeChange = (type) => {
    setActiveCalcType(type);
    const p = calculatorPresets[type];
    setCalcAmount(p.defaultAmount);
    setCalcRate(p.defaultRate);
    setCalcTenure(p.defaultTenure);
  };

  // Calculate Monthly EMI
  const { emi, totalInterest, totalPayable } = useMemo(() => {
    const p = parseFloat(calcAmount) || 0;
    const r = parseFloat(calcRate) || 0;
    const n = parseInt(calcTenure, 10) * 12;

    if (p <= 0 || r <= 0 || n <= 0) {
      return { emi: 0, totalInterest: 0, totalPayable: 0 };
    }

    const monthlyR = r / 12 / 100;
    const emiVal = (p * monthlyR * Math.pow(1 + monthlyR, n)) / (Math.pow(1 + monthlyR, n) - 1);
    const totalP = emiVal * n;
    const totalI = totalP - p;

    return {
      emi: Math.round(emiVal),
      totalInterest: Math.round(totalI),
      totalPayable: Math.round(totalP)
    };
  }, [calcAmount, calcRate, calcTenure]);

  // FAQ Search and Toggle
  const [faqSearch, setFaqSearch] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqs = [
    {
      q: "How does BanksCart help me secure the lowest loan interest rate?",
      a: "BanksCart aggregates live interest rates and underwriting policies from 30+ RBI-regulated public, private, and NBFC lenders. Instead of applying blind to multiple banks (which harms your credit score with hard inquiries), our comparison engine evaluates your income, CIBIL score, and debt-to-income ratio (FOIR) to match you with lenders offering pre-approved rates from 8.35% p.a."
    },
    {
      q: "Does comparing or checking loan eligibility on BanksCart impact my CIBIL score?",
      a: "No, absolutely not. All eligibility checks and rate comparisons on BanksCart are conducted via 'Soft Inquiries' (Consumer Disclosed Pulls). Soft inquiries never impact or reduce your credit score, regardless of how many loan products you explore."
    },
    {
      q: "What is the difference between a Fixed Interest Rate and a Floating Interest Rate?",
      a: "With a Fixed Interest Rate, your EMI amount remains constant throughout the entire loan tenure regardless of market conditions. With a Floating Interest Rate, the rate is linked to the RBI Repo Rate (EBLR/RLLR). When the RBI cuts interest rates, your floating rate decreases, saving you interest."
    },
    {
      q: "Can I get an unsecured personal or business loan with a CIBIL score below 680?",
      a: "While premier banks (like SBI and HDFC) prefer a 720+ CIBIL score for prime rates, BanksCart partners with specialized NBFCs and digital fintech lenders who approve subprime borrowers with scores between 600 and 680, subject to stable verifiable monthly salary or business banking cash flows."
    },
    {
      q: "How fast is loan approval and fund disbursal on BanksCart?",
      a: "For pre-approved personal loans and credit cards, disbursal can occur in as little as 2 hours to 24 hours via digital net banking verification. Secured products like Home Loans, Used Car Loans, and Education Loans typically take 3 to 7 business days due to legal title search, vehicle inspection, or university paperwork."
    },
    {
      q: "Can I prepay or foreclose my loan before the tenure ends?",
      a: "Yes. In accordance with Reserve Bank of India (RBI) mandates, banks cannot charge any foreclosure or prepayment penalties on floating-rate individual loans (such as home loans, personal loans, or education loans). For fixed-rate commercial loans, a modest fee of 2% to 4% may apply after the lock-in period."
    },
    {
      q: "What are the common fees associated with applying for a bank loan in India?",
      a: "Typical bank charges include: One-time processing fee (usually 0.5% to 2% of loan amount), statutory stamp duty and documentation charges, CIBIL bureau verification fee, and GST (18%) on the service charges. BanksCart does not charge borrowers any upfront matching fee."
    },
    {
      q: "What is the difference between secured and unsecured loans?",
      a: "Secured loans (Home, Car, Gold, Loan Against Property) require you to pledge an asset as collateral to the lender. They carry lower interest rates (8% to 11%) and higher sanction limits. Unsecured loans (Personal, Business, Instant Loans) require no physical collateral and are approved purely on credit score and repayment capability."
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  // Filtered Loan Directory
  const filteredLoans = useMemo(() => {
    if (selectedFilter === "all") return loanCategories;
    return loanCategories.filter((loan) => {
      if (selectedFilter === "retail") return loan.id === "personal" || loan.id === "home" || loan.id === "gold";
      if (selectedFilter === "auto") return loan.id === "car" || loan.id === "used-car" || loan.id === "two-wheeler";
      if (selectedFilter === "business") return loan.id === "business";
      if (selectedFilter === "education") return loan.id === "education";
      return true;
    });
  }, [selectedFilter]);

  // Structured Data JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.bankscart.com/" },
          { "@type": "ListItem", "position": 2, "name": "Loans", "item": "https://www.bankscart.com/loans" }
        ]
      },
      {
        "@type": "FinancialProduct",
        "name": "BanksCart Loan Comparison Marketplace",
        "description": "Compare bank loans in India: personal loans, home loans, car loans, business loans, and education loans from 30+ RBI-regulated lenders.",
        "brand": { "@type": "Brand", "name": "BanksCart" },
        "url": "https://www.bankscart.com/loans"
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-ibm">
      <Helmet>
        <title>Compare Bank Loans in India: Personal, Home, Car & Business Loans | BanksCart</title>
        <meta
          name="description"
          content="Compare loan interest rates from top Indian banks. Find the lowest EMIs for personal, home, car, and business loans with instant eligibility check."
        />
        <link rel="canonical" href="https://www.bankscart.com/loans" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb path={["Home", "Loans"]} />
        </div>
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white pt-12 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-[#1E3A8A]/60 border border-[#38BDF8]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#38BDF8] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Official Indian Lending Marketplace 2026
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Compare &amp; Apply for Top <span className="text-[#38BDF8]">Bank Loans in India</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Discover verified interest rates starting from 8.35% p.a. across 30+ leading Indian banks and NBFCs. Calculate exact EMIs, check pre-approved eligibility, and apply 100% digitally with zero impact on your CIBIL score.
            </p>
          </div>

          {/* 4 Trust Highlights Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">30+ Lenders</p>
                <p className="text-[10px] text-slate-400">RBI Regulated Banks</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
              <Percent className="w-5 h-5 text-[#38BDF8] flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">From 8.35% p.a.</p>
                <p className="text-[10px] text-slate-400">Lowest Market Rates</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">Instant Soft Pull</p>
                <p className="text-[10px] text-slate-400">Zero Score Impact</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
              <Lock className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">₹0 Matching Fee</p>
                <p className="text-[10px] text-slate-400">100% Free Marketplace</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== LOAN PRODUCT CATALOG DIRECTORY ==================== */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-1">
                <Layers className="w-3.5 h-3.5" />
                Comprehensive Retail &amp; Commercial Catalog
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                Explore Verified Loan Products ({filteredLoans.length} Categories)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Select a category to view loan caps, interest rates, and paperless eligibility criteria.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start md:self-auto overflow-x-auto scrollbar-none">
              {[
                { id: "all", label: "All Loans" },
                { id: "retail", label: "Personal & Home" },
                { id: "auto", label: "Vehicle Finance" },
                { id: "business", label: "MSME & Business" },
                { id: "education", label: "Education" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    selectedFilter === tab.id
                      ? "bg-[#1E3A8A] text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredLoans.map((loan) => {
              const Icon = loan.icon;
              return (
                <div
                  key={loan.id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 group"
                >
                  <div>
                    {/* Header: Icon + Category Badge */}
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-xl ${loan.bg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${loan.color}`} />
                      </div>
                      <span className="text-[10px] font-bold text-[#1E3A8A] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {loan.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors mb-1">
                      {loan.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mb-3">{loan.category}</p>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4 min-h-[48px]">
                      {loan.description}
                    </p>

                    {/* 3-Metric Financial Strip */}
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 mb-4 space-y-1.5 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-[11px]">Interest Rate:</span>
                        <span className="font-bold text-emerald-700">{loan.rate}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-[11px]">Max Limit:</span>
                        <span className="font-bold text-[#0F172A]">{loan.maxAmount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 text-[11px]">Tenure:</span>
                        <span className="font-bold text-slate-700">{loan.tenure}</span>
                      </div>
                    </div>

                    {/* Key Perks Checkmarks */}
                    <div className="space-y-1.5 text-xs text-slate-600 mb-6">
                      {loan.perks.map((perk, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom CTA */}
                  <Link
                    to={loan.to}
                    className="w-full py-2.5 bg-[#1E3A8A] hover:bg-blue-900 text-white rounded-xl text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 shadow-sm group-hover:bg-[#A16207]"
                  >
                    Compare &amp; Apply <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== UNIVERSAL QUICK EMI ESTIMATOR ==================== */}
      <section className="py-12 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl border border-slate-200 p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Sliders Area */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
                  <Calculator className="w-3.5 h-3.5" />
                  Universal Loan Calculator
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                  Calculate Exact EMIs Across Any Loan Category
                </h2>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Select your loan product to adjust realistic Indian market amounts, APRs, and tenures.
                </p>

                {/* Preset Type Buttons */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {Object.keys(calculatorPresets).map((type) => {
                    const preset = calculatorPresets[type];
                    const isActive = activeCalcType === type;
                    return (
                      <button
                        key={type}
                        onClick={() => handleCalcTypeChange(type)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          isActive
                            ? "bg-[#1E3A8A] text-white shadow-sm"
                            : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {preset.name}
                      </button>
                    );
                  })}
                </div>

                {/* Slider 1: Amount */}
                <div className="mt-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-slate-600">{currentPreset.name} Amount</span>
                    <span className="text-base font-bold text-[#0F172A] tabular-nums">
                      ₹{calcAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={currentPreset.minAmount}
                    max={currentPreset.maxAmount}
                    step={currentPreset.minAmount >= 500000 ? 50000 : 10000}
                    value={calcAmount}
                    onChange={(e) => setCalcAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>₹{(currentPreset.minAmount / 100000).toFixed(1)}L</span>
                    <span>₹{(currentPreset.maxAmount / 200000).toFixed(0)}L</span>
                    <span>₹{(currentPreset.maxAmount / 100000).toFixed(0)}L</span>
                  </div>
                </div>

                {/* Slider 2: Interest Rate */}
                <div className="mt-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-slate-600">Interest Rate (% p.a.)</span>
                    <span className="text-base font-bold text-[#1E3A8A] tabular-nums">{calcRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="7.5"
                    max="22.0"
                    step="0.05"
                    value={calcRate}
                    onChange={(e) => setCalcRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>7.5% (Prime)</span>
                    <span>12.0% (Average)</span>
                    <span>22.0% (Max)</span>
                  </div>
                </div>

                {/* Slider 3: Tenure */}
                <div className="mt-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-slate-600">Tenure</span>
                    <span className="text-base font-bold text-[#0F172A] tabular-nums">
                      {calcTenure} {currentPreset.unit} ({calcTenure * 12} Months)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max={currentPreset.maxTenure}
                    step="1"
                    value={calcTenure}
                    onChange={(e) => setCalcTenure(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                    <span>1 Year</span>
                    <span>{Math.round(currentPreset.maxTenure / 2)} Years</span>
                    <span>{currentPreset.maxTenure} Years</span>
                  </div>
                </div>
              </div>

              {/* Output Summary Card */}
              <div className="lg:col-span-5">
                <div className="bg-[#0F172A] text-white rounded-xl p-6 sm:p-7 shadow-lg relative overflow-hidden border border-slate-700">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                    Calculated Monthly EMI
                  </p>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
                      ₹{emi.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">/ month</span>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-700/80 space-y-2.5 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>Principal Amount:</span>
                      <span className="font-bold text-white tabular-nums">
                        ₹{calcAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Total Interest Payable:</span>
                      <span className="font-bold text-amber-400 tabular-nums">
                        ₹{totalInterest.toLocaleString("en-IN")}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-300">
                      <span>Total Repayment Amount:</span>
                      <span className="font-bold text-white tabular-nums">
                        ₹{totalPayable.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/loans/${activeCalcType === "personal" ? "personal-loan" : activeCalcType === "home" ? "home-loan" : activeCalcType === "business" ? "business-loan" : activeCalcType === "car" ? "car" : "education"}`}
                    className="mt-6 w-full py-2.5 bg-[#A16207] hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow"
                  >
                    Explore &amp; Apply for {currentPreset.name} <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== MULTI-BANK COMPARISON MATRIX ==================== */}
      <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
              <Building2 className="w-3.5 h-3.5" />
              Lending Directory Benchmark
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Compare Top Indian Banks Across All Loan Products
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Verified starting interest rates and minimum credit score benchmarks from India's premier public and private sector lenders.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                    <th className="p-4">Lender / Bank</th>
                    <th className="p-4">Personal Loan</th>
                    <th className="p-4">Home Loan</th>
                    <th className="p-4">Car Loan</th>
                    <th className="p-4">Business Loan</th>
                    <th className="p-4">Education Loan</th>
                    <th className="p-4">CIBIL Benchmark</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {bankComparison.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-4 font-bold text-[#0F172A] text-sm">{item.bank}</td>
                      <td className="p-4 font-semibold tabular-nums text-slate-800">{item.personal}</td>
                      <td className="p-4 font-bold tabular-nums text-emerald-700">{item.home}</td>
                      <td className="p-4 font-semibold tabular-nums text-slate-800">{item.car}</td>
                      <td className="p-4 font-semibold tabular-nums text-slate-800">{item.business}</td>
                      <td className="p-4 font-semibold tabular-nums text-slate-800">{item.education}</td>
                      <td className="p-4 font-bold text-[#1E3A8A]">{item.minCibil}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 4-STEP APPLICATION PROCESS ==================== */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
              <Clock className="w-3.5 h-3.5" />
              100% Digital Workflow
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
              How to Secure Your Loan on BanksCart in 4 Steps
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              From instant eligibility matching to direct bank account disbursal, enjoy a paperless loan experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Compare Lenders & Rates",
                desc: "Evaluate 30+ verified banks and NBFCs based on interest rates, processing fees, and tenure flexibility."
              },
              {
                step: "02",
                title: "Check Soft Eligibility",
                desc: "Provide basic income details to check pre-approved limits with zero impact on your CIBIL rating."
              },
              {
                step: "03",
                title: "Paperless Digital KYC",
                desc: "Complete instant Aadhaar OTP e-KYC and securely fetch digital bank statements via RBI Account Aggregator."
              },
              {
                step: "04",
                title: "Sanction & Disbursal",
                desc: "Receive the official bank sanction letter and get funds credited directly to your savings account in 24 hours."
              }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 relative hover:shadow-md transition-all group"
              >
                <span className="text-3xl font-extrabold text-slate-300 group-hover:text-[#1E3A8A] transition-colors tabular-nums block mb-2">
                  {item.step}
                </span>
                <h3 className="text-base font-bold text-[#0F172A] mb-2">{item.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HIGH-INTENT CALCULATORS & LINKS ==================== */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F8FAFC] p-6 sm:p-8 rounded-2xl border border-blue-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider">
                Loan Planning &amp; Analysis
              </span>
              <h3 className="text-xl font-bold text-[#0F172A]">
                Calculate Exact EMIs &amp; Compare Leading Credit Cards
              </h3>
              <p className="text-xs text-slate-500">
                Plan monthly loan cash flows with accurate reducing-balance interest formulas before applying.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="/personal-loan-emi-calculator"
                className="px-5 py-2.5 bg-[#1E3A8A] hover:bg-blue-900 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
              >
                Personal loan EMI calculator
              </a>
              <a
                href="/gold-loan-emi-calculator"
                className="px-5 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold rounded-xl transition-colors"
              >
                Gold Loan EMI Calculator
              </a>
              <a
                href="/blog/Best-Credit-Cards"
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors border border-slate-200"
              >
                Best credit cards in India
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SPECIALIZED INSTITUTIONAL HUBS ==================== */}
      <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
              <Building2 className="w-3.5 h-3.5" />
              Institutional &amp; Regional Credit
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Specialized Commercial &amp; Institutional Lending Solutions
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Explore dedicated institutional credit facilities, regional MSME financing, and credit score recovery solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <a
              href="/credila-financial-services"
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group block"
            >
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">
                Institutional Credit
              </span>
              <h3 className="font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors text-base mb-1">
                Credila Financial Services
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                HDFC Credila specialized education and premier institutional loans with customized tenures and tax advantages. Compare{" "}
                <span className="font-semibold text-blue-600 underline">
                  HDFC Credila education loan interest rates
                </span>
                .
              </p>
              <span className="text-xs text-blue-600 font-semibold mt-3 inline-block group-hover:underline">
                HDFC Credila education loan interest rates &rarr;
              </span>
            </a>

            <a
              href="/business-loan/company-registration-in-delhi"
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group block"
            >
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-2">
                Regional MSME
              </span>
              <h3 className="font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors text-base mb-1">
                Company Registration in Delhi
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fast-track corporate incorporation financing, priority MSME credit lines, and working capital in Delhi NCR.
              </p>
              <span className="text-xs text-blue-600 font-semibold mt-3 inline-block group-hover:underline">
                View Delhi Capital &rarr;
              </span>
            </a>

            <a
              href="/business-loan/company-registration-in-chennai"
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group block"
            >
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-2">
                Regional MSME
              </span>
              <h3 className="font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors text-base mb-1">
                Company Registration in Chennai
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Industrial commercial loans, seed models, and business setup funding for growing enterprises in Tamil Nadu.
              </p>
              <span className="text-xs text-blue-600 font-semibold mt-3 inline-block group-hover:underline">
                View Chennai Capital &rarr;
              </span>
            </a>

            <a
              href="/credit-score/credit-rectification-service"
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group block"
            >
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-2">
                Bureau Support
              </span>
              <h3 className="font-bold text-[#0F172A] group-hover:text-blue-600 transition-colors text-base mb-1">
                Credit Rectification Service
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dispute erroneous default tags on your CIBIL report and boost credit scores to unlock lower loan interest rates.
              </p>
              <span className="text-xs text-blue-600 font-semibold mt-3 inline-block group-hover:underline">
                Fix Credit Score &rarr;
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ==================== FAQ ACCORDION SECTION ==================== */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Frequently Asked Questions About Indian Loans
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Clear answers regarding eligibility, processing charges, interest rate benchmarks, and documentation.
            </p>

            <div className="mt-6 max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search loan questions..."
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none shadow-sm"
              />
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-bold text-sm text-[#0F172A] flex justify-between items-center gap-3 hover:bg-slate-100 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? "transform rotate-180 text-[#1E3A8A]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-200 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== REGULATORY DISCLOSURE ==================== */}
      <section className="py-12 bg-slate-100 text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-xs leading-relaxed space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Regulatory Disclosure &amp; Non-Lender Status</span>
            </div>
            <p>
              BanksCart is an independent digital loan and credit comparison marketplace. BanksCart is not a licensed bank, NBFC, or credit institution, and does not lend money directly. All loan approvals, interest rates, disbursal terms, and credit decisions are made exclusively at the discretion of RBI-regulated banks and NBFC partners. We do not charge borrowers upfront processing fees for loan matching.
            </p>
            <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
              <span>BanksCart Financial Technologies Pvt. Ltd. • CIN: U67190DL2024PTC428910</span>
              <a href="/editorial-policy" className="text-blue-600 font-semibold hover:underline flex items-center gap-1">
                Editorial &amp; Verification Standards <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoansOverviewPage;
