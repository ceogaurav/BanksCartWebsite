import React, { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import {
  Bike,
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
  Search,
  Users,
  Settings,
  Scale,
  BadgeCheck,
  FileCheck,
  Zap,
  HelpCircle,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Gauge,
  Check,
  BatteryCharging
} from "lucide-react";

// Top Two-Wheeler Lenders in India
const twoWheelerLenders = [
  {
    id: "sbi",
    name: "State Bank of India",
    fullName: "SBI Two-Wheeler Loan (Super Bike & Regular)",
    logo: "/logos/sbi.png",
    category: "psu",
    rate: "10.55% – 13.80%",
    minRate: 10.55,
    maxLoan: "Up to 85% – 90% On-Road Price",
    tenure: "Up to 5 Years (60 Mos)",
    processingFee: "1.00% to 2.00% + GST",
    badge: "Lowest Interest Rate",
    featured: true,
    highlights: [
      "Zero prepayment penalty on floating rate loans",
      "Special Superbike scheme for bikes above 500cc (up to ₹25 Lakhs)",
      "Low processing fees and transparent sovereign PSU terms"
    ],
    applyTag: "Two-Wheeler Loan - State Bank of India"
  },
  {
    id: "hdfc",
    name: "HDFC Bank",
    fullName: "HDFC Bank Two-Wheeler Finance",
    logo: "/logos/hdfc.png",
    category: "private",
    rate: "11.50% – 16.25%",
    minRate: 11.50,
    maxLoan: "Up to 100% On-Road Price",
    tenure: "Up to 4 Years (48 Mos)",
    processingFee: "Up to 2.50% of Loan",
    badge: "100% On-Road Funding",
    featured: true,
    highlights: [
      "Zero down payment option for pre-approved account holders",
      "Instant 10-minute digital approval at partner dealerships",
      "Includes accessories, registration, and comprehensive insurance"
    ],
    applyTag: "Two-Wheeler Loan - HDFC Bank"
  },
  {
    id: "tvs",
    name: "TVS Credit Services",
    fullName: "TVS Credit Two-Wheeler Loan",
    logo: "/logos/tvs.png",
    category: "captive",
    rate: "11.99% – 18.00%",
    minRate: 11.99,
    maxLoan: "Up to 95% of Vehicle Cost",
    tenure: "Up to 4 Years (48 Mos)",
    processingFee: "2.00% to 3.50%",
    badge: "Instant Showroom Sanction",
    featured: true,
    highlights: [
      "Pan-India presence across all authorized TVS and multi-brand dealers",
      "Minimal documentation with Aadhaar e-KYC instant approval",
      "Special financing options for first-time credit buyers"
    ],
    applyTag: "Two-Wheeler Loan - TVS Credit"
  },
  {
    id: "bajaj",
    name: "Bajaj Finserv",
    fullName: "Bajaj Two-Wheeler Finance",
    logo: "/logos/bajaj.png",
    category: "captive",
    rate: "11.99% – 17.50%",
    minRate: 11.99,
    maxLoan: "Up to 100% of On-Road Cost",
    tenure: "Up to 5 Years (60 Mos)",
    processingFee: "Up to 3.00%",
    badge: "Flexible EMI Tenures",
    featured: true,
    highlights: [
      "Doorstep paper collection and digital loan agreements",
      "No-cost EMI schemes on select commuter and EV models",
      "Exclusive financing for Bajaj Pulsar, Dominar, and Chetak EV"
    ],
    applyTag: "Two-Wheeler Loan - Bajaj Finserv"
  },
  {
    id: "herofin",
    name: "Hero FinCorp",
    fullName: "Hero FinCorp Two-Wheeler Loan",
    logo: "/logos/hero.png",
    category: "captive",
    rate: "12.50% – 18.50%",
    minRate: 12.50,
    maxLoan: "Up to 95% On-Road Price",
    tenure: "Up to 4 Years (48 Mos)",
    processingFee: "2.00% to 3.50%",
    badge: "Hero Captive Financier",
    featured: false,
    highlights: [
      "Exclusive finance packages across all Hero MotoCorp showrooms",
      "Tailored EMI schemes for rural and semi-urban customers",
      "Hassle-free loan disbursal within 24 hours of document submission"
    ],
    applyTag: "Two-Wheeler Loan - Hero FinCorp"
  },
  {
    id: "axis",
    name: "Axis Bank",
    fullName: "Axis Bank Two-Wheeler Loan",
    logo: "/logos/axis.png",
    category: "private",
    rate: "10.75% – 15.00%",
    minRate: 10.75,
    maxLoan: "Up to 100% of On-Road Price",
    tenure: "Up to 4 Years (48 Mos)",
    processingFee: "Up to 2.00% of Loan Amount",
    badge: "Fast Digital Sanction",
    featured: false,
    highlights: [
      "Loan amounts starting from ₹25,001 up to ₹10 Lakhs",
      "Special interest rate concession for existing Axis account holders",
      "Minimal physical verification for salaried professionals"
    ],
    applyTag: "Two-Wheeler Loan - Axis Bank"
  },
  {
    id: "pnb",
    name: "Punjab National Bank",
    fullName: "PNB Two-Wheeler Financing",
    logo: "/logos/pnb.png",
    category: "psu",
    rate: "11.15% – 13.50%",
    minRate: 11.15,
    maxLoan: "Up to ₹10 Lakhs",
    tenure: "Up to 5 Years (60 Mos)",
    processingFee: "0.50% to 1.00%",
    badge: "Low PSU Fees",
    featured: false,
    highlights: [
      "Sub-11.5% interest rate bands for government and PSU employees",
      "Low processing fees capped at nominal institutional rates",
      "Financing available for both regular bikes and electric scooters"
    ],
    applyTag: "Two-Wheeler Loan - Punjab National Bank"
  },
  {
    id: "jana",
    name: "Jana Small Finance Bank",
    fullName: "Jana SFB Two-Wheeler Loan",
    logo: "/logos/jana.png",
    category: "captive",
    rate: "14.00% – 20.00%",
    minRate: 14.00,
    maxLoan: "Up to ₹3.5 Lakhs",
    tenure: "Up to 3 Years (36 Mos)",
    processingFee: "Up to 4.00%",
    badge: "Deep Semi-Urban Reach",
    featured: false,
    highlights: [
      "Simplified surrogate income assessment for self-employed individuals",
      "No formal ITR required for loan amounts up to ₹1 Lakh",
      "Quick disbursal directly into dealer account"
    ],
    applyTag: "Two-Wheeler Loan - Jana Small Finance Bank"
  }
];

// FAQs for Two-Wheeler Loans
const twoWheelerFaqs = [
  {
    category: "general",
    question: "What is a two-wheeler loan and what vehicle types are covered?",
    answer: "A two-wheeler loan is a secured retail vehicle loan that provides funds to purchase motorcycles, automatic scooters, mopeds, electric two-wheelers (EVs), and premium superbikes. Banks and NBFCs typically finance 85% to 100% of the vehicle's on-road price (including registration, road tax, and comprehensive insurance), with repayment spread over 12 to 60 months in monthly EMIs."
  },
  {
    category: "ev",
    question: "Are electric scooters eligible for government subsidies and special EV loans?",
    answer: "Yes. Electric two-wheelers approved under the Government of India's PM E-DRIVE Scheme (and state-specific EV policies like Delhi, Maharashtra, and Tamil Nadu) receive upfront direct subsidies deducted from the ex-showroom invoice. Furthermore, EVs attract a concessional GST rate of 5% (versus 28% for internal combustion engine bikes), and select banks provide a 25 to 50 bps interest rate concession for green EV loans."
  },
  {
    category: "rates",
    question: "What interest rate can I expect on a two-wheeler loan in India?",
    answer: "Two-wheeler loan interest rates generally range from 10.50% to 18.50% p.a., depending on the lender type (PSU banks: 10.50%–13.50%, private banks: 11.50%–16.00%, NBFCs/dealership captives: 12.50%–19.00%), your CIBIL score (750+ yields the lowest rates), and your employment profile."
  },
  {
    category: "downpayment",
    question: "Is 100% on-road financing available for bikes and scooters?",
    answer: "Yes, leading private banks (such as HDFC Bank, ICICI Bank, and Axis Bank) and captive financiers offer up to 100% on-road funding for pre-approved customers, select high-demand scooter models, and salaried applicants with a 750+ credit score. For other applicants, a standard margin of 10% to 15% is required as a down payment at the showroom."
  },
  {
    category: "rto",
    question: "What is RTO Form 34 hypothecation on a two-wheeler registration?",
    answer: "Under Section 51 of the Motor Vehicles Act 1988, when a vehicle is financed through a loan, the lending institution holds a legal lien. Form 34 is submitted to the RTO to endorse this hypothecation onto your vehicle's Smart Card RC. Once all EMIs are paid in full, the lender issues a No Objection Certificate (NOC) and Form 35 to cancel the hypothecation and make you the unencumbered owner."
  },
  {
    category: "eligibility",
    question: "What are the minimum salary and age criteria for a two-wheeler loan?",
    answer: "Salaried individuals generally need a minimum net monthly income of ₹10,000 to ₹12,000 (₹7,000 to ₹8,000 in Tier-2/3 towns), while self-employed applicants need an annual income of at least ₹1.2 Lakhs. The minimum applicant age is 21 years at loan application, and the maximum age is 65 years at loan maturity."
  },
  {
    category: "superbikes",
    question: "Can I get a loan for premium bikes and superbikes (Royal Enfield, KTM, BMW, Harley)?",
    answer: "Yes. Major lenders like SBI, HDFC, and Axis offer dedicated 'Super Bike Loans' for motorcycles with engine displacement exceeding 350cc or 500cc. These loans feature higher sanction limits up to ₹20–₹25 Lakhs, extended repayment tenures up to 5 years, and competitive interest rates similar to passenger car loans."
  },
  {
    category: "foreclosure",
    question: "Can I foreclose or prepay my two-wheeler loan early?",
    answer: "Yes. As per RBI guidelines, floating-rate retail loans to individual borrowers cannot carry prepayment or foreclosure penalties. However, since many two-wheeler loans are issued on fixed-rate terms by NBFCs, a prepayment fee of 2% to 4% of the outstanding principal balance may apply if closed before the agreed tenure."
  }
];

const TwoWheelerLoanPage = ({ openApplyModal, openCibilModal, openEligibilityModal }) => {
  // Page SEO Details
  const pageTitle = "Compare Two-Wheeler Loan Interest Rates in India (From 10.50% p.a.) | BanksCart";
  const pageDescription = "Compare top two-wheeler and bike loan rates from SBI, HDFC Bank, TVS Credit, and Bajaj Finserv. Check 100% on-road financing, electric scooter subsidies, EMI calculator, and instant showroom approvals.";
  const canonicalUrl = "https://www.bankscart.com/loans/two-wheeler";

  // Calculator State
  const [loanAmount, setLoanAmount] = useState(85000);
  const [interestRate, setInterestRate] = useState(12.0);
  const [tenureMonths, setTenureMonths] = useState(36);
  const [downPayment, setDownPayment] = useState(15000);

  // Filter & Search State
  const [lenderCategory, setLenderCategory] = useState("all");
  const [lenderSearch, setLenderSearch] = useState("");
  const [faqCategory, setFaqCategory] = useState("all");
  const [faqSearch, setFaqSearch] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null);

  // EMI Calculation Logic
  const calculateEMI = useCallback(() => {
    const principal = Math.max(0, loanAmount - downPayment);
    const monthlyRate = interestRate / 12 / 100;
    const months = tenureMonths;

    if (principal <= 0 || monthlyRate <= 0 || months <= 0) {
      return { monthlyEmi: 0, totalInterest: 0, totalPayable: 0, principalPortion: 0 };
    }

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayable = emi * months;
    const totalInterest = totalPayable - principal;

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayable: Math.round(totalPayable),
      principalPortion: principal
    };
  }, [loanAmount, downPayment, interestRate, tenureMonths]);

  const { monthlyEmi, totalInterest, totalPayable, principalPortion } = calculateEMI();
  const interestPercentage = totalPayable > 0 ? Math.round((totalInterest / totalPayable) * 100) : 0;
  const principalPercentage = 100 - interestPercentage;

  // Filtered Lenders
  const filteredLenders = twoWheelerLenders.filter((lender) => {
    const matchesCat = lenderCategory === "all" || lender.category === lenderCategory;
    const matchesSearch =
      lender.name.toLowerCase().includes(lenderSearch.toLowerCase()) ||
      lender.fullName.toLowerCase().includes(lenderSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filtered FAQs
  const filteredFaqs = twoWheelerFaqs.filter((faq) => {
    const matchesCat = faqCategory === "all" || faq.category === faqCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // JSON-LD Schemas
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
        "name": "Two-Wheeler Loan",
        "item": canonicalUrl
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "BanksCart Two-Wheeler & Bike Loan Comparison",
    "description": pageDescription,
    "url": canonicalUrl,
    "provider": {
      "@type": "Organization",
      "name": "BanksCart Financial Technologies Private Limited",
      "url": "https://www.bankscart.com"
    },
    "category": "Motorcycle & Scooter Financing",
    "annualPercentageRate": {
      "@type": "QuantitativeValue",
      "minValue": "10.50",
      "maxValue": "20.00",
      "unitText": "%"
    },
    "amount": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "minValue": "20000",
      "maxValue": "2500000"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": twoWheelerFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="two wheeler loan, bike loan interest rates, scooter loan, electric bike loan, sbi two wheeler loan, hdfc bike loan, tvs credit, bajaj finserv two wheeler, bike emi calculator" />
        <link rel="canonical" href={canonicalUrl} />

        {/* OpenGraph */}
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

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(productSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-ibm antialiased">
        {/* Breadcrumb Navigation */}
        <div className="bg-slate-900 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav aria-label="Breadcrumb" className="text-xs text-slate-400">
              <ol className="flex items-center space-x-2">
                <li><Link to="/" className="hover:text-amber-400 transition-colors">Home</Link></li>
                <li className="text-slate-600">/</li>
                <li><Link to="/loans" className="hover:text-amber-400 transition-colors">Loans</Link></li>
                <li className="text-slate-600">/</li>
                <li className="text-white font-medium" aria-current="page">Two-Wheeler Loan</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Institutional Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-14 lg:py-18 overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-400/10 border border-amber-400/25 rounded-full text-amber-300 text-xs font-semibold tracking-wide">
                  <Bike className="w-3.5 h-3.5 text-amber-400" />
                  <span>TWO-WHEELER FINANCE &bull; VERIFIED BANK RATES</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Compare Two-Wheeler Loan Interest Rates in India (Starting at 10.50% p.a.)
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                  Finance up to 100% of the on-road price for commuter bikes, gearless scooters, electric vehicles (EVs), and premium superbikes. Compare live interest rates, low processing fees, and 15-minute showroom sanctions.
                </p>

                <div className="pt-2 flex flex-wrap gap-4 items-center">
                  {openApplyModal && (
                    <button
                      onClick={() => openApplyModal("Two-Wheeler Loan")}
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-lg transition-colors shadow-lg shadow-amber-500/20 inline-flex items-center"
                    >
                      Apply for Bike Loan
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  )}
                  {openEligibilityModal && (
                    <button
                      onClick={() => openEligibilityModal("Two-Wheeler Loan")}
                      className="px-6 py-3 bg-slate-800/90 hover:bg-slate-700 text-white font-medium text-sm rounded-lg border border-slate-700 transition-colors"
                    >
                      Check Eligibility (Zero Impact)
                    </button>
                  )}
                  {openCibilModal && (
                    <button
                      onClick={openCibilModal}
                      className="text-xs text-slate-300 hover:text-amber-400 underline underline-offset-4 transition-colors"
                    >
                      Check Free Credit Score
                    </button>
                  )}
                </div>
              </div>

              {/* Fast Facts Badge Card */}
              <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Two-Wheeler Benchmark 2025
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Lowest Interest Rate:</span>
                    <span className="font-bold text-white font-mono text-sm">10.50% p.a.</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Max On-Road Funding:</span>
                    <span className="font-semibold text-white">Up to 100% On-Road</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Repayment Tenure:</span>
                    <span className="font-semibold text-white">12 to 60 Months</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">EV Subsidies:</span>
                    <span className="font-semibold text-emerald-400">PM E-DRIVE + 5% GST</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">Sanction Turnaround:</span>
                    <span className="font-semibold text-white font-mono">15 to 30 Minutes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Trust Metric Cards */}
        <section className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-md">
              <div className="text-2xl lg:text-3xl font-extrabold text-blue-700 font-mono">10.50%</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">Starting APR</div>
              <div className="text-[11px] text-slate-500 mt-1">Sovereign PSU and prime tiers</div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-md">
              <div className="text-2xl lg:text-3xl font-extrabold text-blue-700 font-mono">100%</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">On-Road Funding</div>
              <div className="text-[11px] text-slate-500 mt-1">Includes RTO, tax & insurance</div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-md">
              <div className="text-2xl lg:text-3xl font-extrabold text-blue-700 font-mono">60 Months</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">Max Tenure</div>
              <div className="text-[11px] text-slate-500 mt-1">Comfortable, pocket-friendly EMIs</div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-md">
              <div className="text-2xl lg:text-3xl font-extrabold text-blue-700 font-mono">15 Mins</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">Instant Sanction</div>
              <div className="text-[11px] text-slate-500 mt-1">Paperless digital e-KYC flow</div>
            </div>
          </div>
        </section>

        {/* Main Content Body */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

          {/* Section 1: Interactive Two-Wheeler EMI Calculator */}
          <section id="calculator" className="bg-white rounded-2xl p-6 lg:p-10 border border-slate-200 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold uppercase tracking-wider">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>Two-Wheeler EMI & Down Payment Simulator</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mt-2">
                  Bike & Scooter Loan EMI Calculator
                </h2>
              </div>
              <span className="text-xs text-slate-500">
                Formula: Reducing balance monthly compounding
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Sliders Area */}
              <div className="lg:col-span-7 space-y-6">
                {/* On-Road Price Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
                    <label htmlFor="on-road-price">Vehicle On-Road Price:</label>
                    <span className="font-mono text-base font-bold text-blue-700">₹{loanAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <input
                    id="on-road-price"
                    type="range"
                    min={30000}
                    max={500000}
                    step={2500}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>₹30,000 (Moped/Commuter)</span>
                    <span>₹2,50,000 (Premium/EV)</span>
                    <span>₹5,00,000 (Superbike)</span>
                  </div>
                  {/* Quick Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[65000, 85000, 125000, 185000, 275000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setLoanAmount(amt)}
                        className={`text-xs px-2.5 py-1 rounded border font-mono transition-colors ${
                          loanAmount === amt
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        ₹{(amt / 1000).toFixed(0)}k
                      </button>
                    ))}
                  </div>
                </div>

                {/* Down Payment Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
                    <label htmlFor="bike-down-pay">Down Payment (Own Contribution):</label>
                    <span className="font-mono text-base font-bold text-slate-800">₹{downPayment.toLocaleString("en-IN")}</span>
                  </div>
                  <input
                    id="bike-down-pay"
                    type="range"
                    min={0}
                    max={Math.min(loanAmount * 0.6, 150000)}
                    step={2500}
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>₹0 (100% On-Road Funding)</span>
                    <span>₹{Math.min(loanAmount * 0.6, 150000).toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Interest Rate Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
                    <label htmlFor="bike-rate">Interest Rate (% p.a.):</label>
                    <span className="font-mono text-base font-bold text-blue-700">{interestRate}%</span>
                  </div>
                  <input
                    id="bike-rate"
                    type="range"
                    min={10.0}
                    max={20.0}
                    step={0.1}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>10.0%</span>
                    <span>15.0%</span>
                    <span>20.0%</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[10.5, 11.5, 12.0, 13.5, 15.0].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setInterestRate(r)}
                        className={`text-xs px-2.5 py-1 rounded border font-mono transition-colors ${
                          interestRate === r
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        {r}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tenure in Months */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
                    <label htmlFor="bike-tenure">Repayment Tenure:</label>
                    <span className="font-mono text-base font-bold text-blue-700">{tenureMonths} Months ({(tenureMonths / 12).toFixed(1)} Yrs)</span>
                  </div>
                  <input
                    id="bike-tenure"
                    type="range"
                    min={12}
                    max={60}
                    step={6}
                    value={tenureMonths}
                    onChange={(e) => setTenureMonths(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>12 Mos (1 Yr)</span>
                    <span>24 Mos</span>
                    <span>36 Mos (3 Yrs)</span>
                    <span>60 Mos (5 Yrs)</span>
                  </div>
                </div>
              </div>

              {/* Result Readout Card */}
              <div className="lg:col-span-5 bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 space-y-6">
                <div className="text-center space-y-1">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Calculated Monthly Installment (EMI)
                  </div>
                  <div className="text-4xl lg:text-5xl font-extrabold text-blue-700 font-mono tracking-tight">
                    ₹{monthlyEmi.toLocaleString("en-IN")}
                  </div>
                  <p className="text-xs text-slate-500">Per month for {tenureMonths} monthly installments</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-200 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Financed Loan Amount:</span>
                    <span className="font-mono font-bold text-slate-900">₹{principalPortion.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Interest Payable:</span>
                    <span className="font-mono font-bold text-amber-700">₹{totalInterest.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Repayment Amount:</span>
                    <span className="font-mono font-bold text-slate-900">₹{totalPayable.toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Visual Ratio Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden flex">
                    <div style={{ width: `${principalPercentage}%` }} className="bg-blue-600 h-full" />
                    <div style={{ width: `${interestPercentage}%` }} className="bg-amber-500 h-full" />
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" /> Principal ({principalPercentage}%)
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Interest ({interestPercentage}%)
                    </span>
                  </div>
                </div>

                {openApplyModal && (
                  <button
                    onClick={() => openApplyModal(`Two-Wheeler Loan - Financed ₹${principalPortion.toLocaleString("en-IN")} for ${tenureMonths} Mos`)}
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-lg transition-colors shadow-md shadow-amber-500/20 text-center block"
                  >
                    Apply with this Bike EMI
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* Section 2: Multi-Lender Comparison Table & Cards */}
          <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-md border border-blue-100">
                  <Award className="w-3.5 h-3.5" />
                  <span>Institutional Two-Wheeler Financiers</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mt-2">
                  Two-Wheeler Loan Interest Rates Across Banks & NBFCs
                </h2>
              </div>
              <p className="text-xs text-slate-500 max-w-sm md:text-right">
                Audited bi-weekly. Direct tie-ups across OEM dealer networks nationwide.
              </p>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { id: "all", label: "All Lenders" },
                  { id: "psu", label: "Public Sector (PSU)" },
                  { id: "private", label: "Private Banks" },
                  { id: "captive", label: "Captive Financiers & NBFCs" }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setLenderCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      lenderCategory === tab.id
                        ? "bg-blue-600 text-white font-semibold shadow-sm"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search lender name..."
                  value={lenderSearch}
                  onChange={(e) => setLenderSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg w-full sm:w-48 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Lenders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLenders.map((lender) => (
                <div
                  key={lender.id}
                  className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 p-1.5 flex items-center justify-center flex-shrink-0">
                          <img
                            src={lender.logo}
                            alt={lender.name}
                            className="w-full h-full object-contain"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm">{lender.fullName}</h3>
                          <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                            {lender.category === "psu" ? "Public Sector Bank" : lender.category === "private" ? "Private Commercial Bank" : "NBFC / OEM Captive"}
                          </span>
                        </div>
                      </div>
                      <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold rounded">
                        {lender.badge}
                      </span>
                    </div>

                    {/* Metrics Matrix */}
                    <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Interest Rate</span>
                        <span className="font-bold text-blue-700 font-mono">{lender.rate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Max Financing</span>
                        <span className="font-semibold text-slate-800">{lender.maxLoan}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Processing Fee</span>
                        <span className="font-medium text-slate-700 text-[11px]">{lender.processingFee}</span>
                      </div>
                    </div>

                    {/* Bullet Highlights */}
                    <ul className="space-y-1 text-xs text-slate-650">
                      {lender.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-400">Tenure: {lender.tenure}</span>
                    {openApplyModal && (
                      <button
                        onClick={() => openApplyModal(lender.applyTag)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors inline-flex items-center"
                      >
                        Apply with Lender
                        <ChevronDown className="w-3 h-3 ml-1 -rotate-90" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Electric Two-Wheeler (EV) Subsidies & PM E-DRIVE Blueprint */}
          <section className="bg-gradient-to-br from-emerald-950 via-slate-900 to-slate-900 text-white rounded-2xl p-8 lg:p-10 shadow-xl space-y-6 border border-emerald-900/40">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider rounded-md border border-emerald-500/30">
                <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                <span>Green Mobility & Clean Energy Savings</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                Electric Scooter (EV) Financing & PM E-DRIVE Subsidies
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                India’s transition to electric two-wheelers (Ola, Ather, TVS iQube, Bajaj Chetak) is supported by central government subsidies and priority bank credit programs:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-slate-200">
              <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2.5 backdrop-blur-sm">
                <h3 className="font-bold text-emerald-400 text-base">PM E-DRIVE Capital Subsidy</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Successor to FAME-II, the PM E-DRIVE scheme offers up to ₹10,000 direct subsidy on registered high-speed electric two-wheelers with advanced battery safety management (AIS-156).
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2.5 backdrop-blur-sm">
                <h3 className="font-bold text-emerald-400 text-base">5% Concessional GST Shield</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Electric two-wheelers are taxed at only 5% GST compared to 28% GST for petrol vehicles. This saves between ₹18,000 and ₹35,000 on the initial ex-showroom vehicle pricing.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2.5 backdrop-blur-sm">
                <h3 className="font-bold text-emerald-400 text-base">Running Cost: ₹0.25 vs ₹2.50/km</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Average electricity charging cost is approximately ₹0.20 to ₹0.30 per kilometer, generating monthly fuel savings of ₹2,500 to ₹4,000 that directly offsets your monthly EMI.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Four Two-Wheeler Market Categories */}
          <section className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold uppercase tracking-wider">
                <Bike className="w-3.5 h-3.5" />
                <span>Segment Guide</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Two-Wheeler Financing Across All Vehicle Categories
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-mono text-[11px] font-bold text-blue-700">100cc – 125cc</span>
                <h3 className="font-bold text-slate-900 text-sm">Commuter Motorcycles</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hero Splendor, Honda Shine, Bajaj Platina. Up to 100% funding with minimal monthly EMIs from ₹1,800/mo.
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-mono text-[11px] font-bold text-blue-700">110cc – 125cc</span>
                <h3 className="font-bold text-slate-900 text-sm">Gearless Scooters</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Honda Activa, TVS Jupiter, Suzuki Access. Ideal urban family mobility with easy zero down payment schemes.
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-mono text-[11px] font-bold text-emerald-700">Clean Tech</span>
                <h3 className="font-bold text-slate-900 text-sm">Electric Two-Wheelers</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ola S1 Pro, Ather 450X, TVS iQube. Eligible for green rate concessions and state government road tax waivers.
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-mono text-[11px] font-bold text-amber-700">350cc – 1000cc+</span>
                <h3 className="font-bold text-slate-900 text-sm">Premium & Superbikes</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Royal Enfield Classic/Hunter, KTM Duke, Triumph, BMW. Dedicated high-ticket loans up to ₹25 Lakhs.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Eligibility Criteria & Documents Table */}
          <section className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm space-y-8">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                <span>Eligibility & Checklist</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Two-Wheeler Loan Eligibility & Document Requirements
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Salaried Profile */}
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-700" />
                  Salaried Applicants
                </h3>
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Age:</span>
                    <span className="font-semibold text-slate-900">21 to 65 Years</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Min Monthly Salary:</span>
                    <span className="font-semibold text-slate-900">₹10,000/mo (₹7,500 in Tier-2/3)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Credit Score:</span>
                    <span className="font-semibold text-slate-900">650+ (750+ for 100% funding)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Identity Proof:</span>
                    <span className="font-semibold text-slate-900">Aadhaar Card, PAN Card, Driving License</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Address Proof:</span>
                    <span className="font-semibold text-slate-900">Electricity Bill, Voter ID, or Rental Agreement</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Income Documents:</span>
                    <span className="font-semibold text-slate-900">Last 3 months salary slips or bank statement</span>
                  </div>
                </div>
              </div>

              {/* Self-Employed Profile */}
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  Self-Employed & Small Business Owners
                </h3>
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Age:</span>
                    <span className="font-semibold text-slate-900">21 to 65 Years</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Min Annual Income:</span>
                    <span className="font-semibold text-slate-900">₹1,20,000+ per year</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Business Vintage:</span>
                    <span className="font-semibold text-slate-900">Min 1 year at current commercial location</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Identity & Residence:</span>
                    <span className="font-semibold text-slate-900">PAN, Aadhaar, Utility Bill</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Business Proof:</span>
                    <span className="font-semibold text-slate-900">GST Registration, Shop Act, or Udyam</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Bank Records:</span>
                    <span className="font-semibold text-slate-900">Latest 3 to 6 months savings/current bank statement</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Searchable FAQ Accordion */}
          <section className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 rounded text-xs font-semibold uppercase tracking-wider">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
                  <span>Frequently Answered Inquiries</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-2">
                  Two-Wheeler Loan FAQs
                </h2>
              </div>

              {/* FAQ Search Bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { id: "all", label: "All Questions" },
                { id: "general", label: "Basics" },
                { id: "ev", label: "EV Subsidies" },
                { id: "rates", label: "Interest & Fees" },
                { id: "downpayment", label: "100% Funding" },
                { id: "rto", label: "RTO Form 34/35" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setFaqCategory(tab.id)}
                  className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                    faqCategory === tab.id
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Accordion List */}
            <div className="space-y-3 pt-2">
              {filteredFaqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                    className="w-full text-left p-4.5 bg-slate-50/70 hover:bg-slate-50 flex items-center justify-between gap-4 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-sm">
                      {faq.question}
                    </span>
                    {expandedFaq === idx ? (
                      <ChevronUp className="w-4 h-4 text-blue-700 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === idx && (
                    <div className="p-4.5 bg-white border-t border-slate-100 text-xs sm:text-sm text-slate-650 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 7: Strategic Cross-Linking Directory */}
          <section className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Related Automotive & Credit Resources
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <Link to="/loans/car" className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 text-slate-800 font-semibold flex items-center justify-between">
                <span>New Car Loan</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </Link>
              <Link to="/loans/used-car" className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 text-slate-800 font-semibold flex items-center justify-between">
                <span>Used Car Loan</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </Link>
              <Link to="/credit-score" className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 text-slate-800 font-semibold flex items-center justify-between">
                <span>Free CIBIL Score</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </Link>
              <Link to="/loans/personal-loan" className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 text-slate-800 font-semibold flex items-center justify-between">
                <span>Personal Loan</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </Link>
            </div>
          </section>

          {/* Section 8: Statutory Non-Lender Disclosure */}
          <section className="p-5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-slate-700 leading-relaxed space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Statutory Marketplace Disclosure</span>
            </div>
            <p>
              BanksCart Financial Technologies Private Limited (CIN: U67190DL2024PTC428910) operates as a digital Lending Service Provider (LSP) and fintech marketplace. BanksCart is not a bank or registered non-banking financial institution. All vehicle loan underwriting, interest rate approvals, sanction letters, and RTO lien endorsements remain solely determined by the respective scheduled banks and RBI-registered NBFCs.
            </p>
          </section>

        </main>
      </div>
    </>
  );
};

export default TwoWheelerLoanPage;
