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
  HelpCircle,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Gauge,
  Check
} from "lucide-react";

// Top Indian Pre-Owned Vehicle Lenders
const usedCarLenders = [
  {
    id: "sbi",
    name: "State Bank of India",
    fullName: "SBI Pre-Owned Car Loan",
    logo: "/logos/sbi.png",
    category: "psu",
    rate: "10.25% – 12.75%",
    minRate: 10.25,
    maxLoan: "Up to 80% – 85% of Valuation",
    tenure: "Up to 5 Years",
    processingFee: "0.50% (Min ₹1,000)",
    badge: "Lowest Interest Rate",
    featured: true,
    highlights: [
      "No prepayment penalty on floating rate loans",
      "Vehicle age up to 5 years at purchase (max 8 years at loan maturity)",
      "Transparent PSU sovereign terms with minimal processing overhead"
    ],
    applyTag: "Used Car Loan - State Bank of India"
  },
  {
    id: "hdfc",
    name: "HDFC Bank",
    fullName: "HDFC Bank Used Car Finance",
    logo: "/logos/hdfc.png",
    category: "private",
    rate: "10.75% – 14.50%",
    minRate: 10.75,
    maxLoan: "Up to 100% of Valuation",
    tenure: "Up to 7 Years",
    processingFee: "1.50% to 2.50% of Loan",
    badge: "Highest Valuation LTV",
    featured: true,
    highlights: [
      "Financing up to 100% of car valuation for select certified models",
      "Fast 30-minute digital approval for pre-approved salary holders",
      "End-to-end RTO ownership transfer assistance in 50+ metro cities"
    ],
    applyTag: "Used Car Loan - HDFC Bank"
  },
  {
    id: "tata",
    name: "Tata Capital",
    fullName: "Tata Capital Pre-Owned Car Loan",
    logo: "/logos/tata.png",
    category: "nbfc",
    rate: "10.75% – 15.00%",
    minRate: 10.75,
    maxLoan: "Up to ₹50 Lakhs",
    tenure: "Up to 5 Years",
    processingFee: "Up to 2.00% of Loan",
    badge: "Instant Approval",
    featured: true,
    highlights: [
      "Customized repayment tenures ranging from 12 to 60 months",
      "Quick sanction with minimal paper verification",
      "Coverage for certified second-hand multi-brand vehicles"
    ],
    applyTag: "Used Car Loan - Tata Capital"
  },
  {
    id: "icici",
    name: "ICICI Bank",
    fullName: "ICICI Bank Used Car Loan",
    logo: "/logos/icici.png",
    category: "private",
    rate: "10.50% – 13.90%",
    minRate: 10.50,
    maxLoan: "Up to 80% of Car Valuation",
    tenure: "Up to 5 Years",
    processingFee: "Up to ₹3,500 + GST",
    badge: "Fast Digital KYC",
    featured: false,
    highlights: [
      "Instant sanction letters issued through iMobile app",
      "Tie-ups with leading organized pre-owned car platforms (Spinny, Cars24)",
      "Flexible part-prepayment terms after 6 EMIs"
    ],
    applyTag: "Used Car Loan - ICICI Bank"
  },
  {
    id: "axis",
    name: "Axis Bank",
    fullName: "Axis Bank Used Auto Loan",
    logo: "/logos/axis.png",
    category: "private",
    rate: "11.25% – 15.80%",
    minRate: 11.25,
    maxLoan: "Up to 85% of Valuation",
    tenure: "Up to 5 Years",
    processingFee: "Up to 2.00% of Loan Amount",
    badge: "Flexible Terms",
    featured: false,
    highlights: [
      "Loan sanctions starting from ₹1,00,000 onwards",
      "Accepts vehicles up to 10 years old at final loan maturity",
      "Special rate concessions for priority banking customers"
    ],
    applyTag: "Used Car Loan - Axis Bank"
  },
  {
    id: "pnb",
    name: "Punjab National Bank",
    fullName: "PNB Pre-Owned Car Scheme",
    logo: "/logos/pnb.png",
    category: "psu",
    rate: "9.95% – 12.45%",
    minRate: 9.95,
    maxLoan: "Up to ₹25 Lakhs",
    tenure: "Up to 5 Years",
    processingFee: "0.50% (Max ₹1,500)",
    badge: "Lowest Processing Fee",
    featured: false,
    highlights: [
      "Sub-10% interest rate tier for high-CIBIL prime borrowers",
      "Minimal capping on administrative charges and documentation fees",
      "Extended branches network across semi-urban and rural districts"
    ],
    applyTag: "Used Car Loan - Punjab National Bank"
  },
  {
    id: "indusind",
    name: "IndusInd Bank",
    fullName: "IndusInd Used Car Loan",
    logo: "/logos/indusind.png",
    category: "private",
    rate: "11.00% – 16.00%",
    minRate: 11.00,
    maxLoan: "Up to 90% of Valuation",
    tenure: "Up to 5 Years",
    processingFee: "1.50% to 2.50%",
    badge: "High LTV",
    featured: false,
    highlights: [
      "Doorstep vehicle inspection and valuation service",
      "Accepts wide range of car manufacturers and imported brands",
      "Simplified surrogate income programs for self-employed individuals"
    ],
    applyTag: "Used Car Loan - IndusInd Bank"
  },
  {
    id: "mahindra",
    name: "Mahindra Finance",
    fullName: "Mahindra Finance Used Car Loan",
    logo: "/logos/mahindra.png",
    category: "nbfc",
    rate: "11.50% – 16.50%",
    minRate: 11.50,
    maxLoan: "Up to ₹30 Lakhs",
    tenure: "Up to 5 Years",
    processingFee: "Up to 3.00%",
    badge: "Tier-2/3 Specialist",
    featured: false,
    highlights: [
      "Pan-India presence with deep reach in Tier-2, Tier-3, and rural hubs",
      "Flexible income assessment criteria without formal ITR requirement",
      "Fast-track processing for utility vehicles, SUVs, and commercial sedans"
    ],
    applyTag: "Used Car Loan - Mahindra Finance"
  }
];

// FAQs for Used Car Loans
const usedCarFaqs = [
  {
    category: "general",
    question: "What is a used car loan and how does it work in India?",
    answer: "A used car loan (or pre-owned vehicle loan) is a secured retail loan extended by scheduled commercial banks and RBI-registered NBFCs to finance the purchase of a second-hand automobile. The lending institution conducts an independent valuation of the car and disburses up to 80% to 100% of this appraised value directly to the seller or certified dealership. The borrower repays the principal and interest through monthly EMIs over an agreed tenure, while the vehicle remains hypothecated to the lender until full repayment."
  },
  {
    category: "valuation",
    question: "How is the loan amount and valuation of a used car determined by banks?",
    answer: "Banks do not base the loan amount on the seller's asking price. Instead, an empaneled automobile surveyor or authorized valuation agency evaluates the vehicle based on its make, model, manufacturing year, mileage, engine health, accident history, and Insured Declared Value (IDV) on the current insurance policy. Banks typically sanction 70% to 85% of this surveyor's appraised market value (though select private lenders provide up to 100% for certified vehicles from partner dealerships like Spinny or Cars24)."
  },
  {
    category: "eligibility",
    question: "What is the maximum vehicle age allowed for used car financing?",
    answer: "Most banks stipulate that the car's age must not exceed 5 years at the time of purchase, and the combined age of the car plus the loan tenure must not exceed 8 to 10 years at loan maturity. For example, if you are purchasing a 4-year-old vehicle, the maximum loan tenure permitted would usually be 4 to 5 years (4 + 5 = 9 years total age at maturity)."
  },
  {
    category: "rates",
    question: "Why are used car loan interest rates higher than new car loan rates?",
    answer: "Used car loan interest rates typically range between 9.95% and 15.00% p.a., compared to 8.20%–9.40% for brand-new vehicles. Lenders charge a risk premium because pre-owned vehicles face faster mechanical depreciation, lack a full manufacturer warranty, have varied maintenance histories, and exhibit lower resale liquidation values in case of default."
  },
  {
    category: "rto",
    question: "What RTO forms and documents are required for used car loan hypothecation?",
    answer: "The key RTO documents required include: Form 29 (Notice of Transfer of Ownership), Form 30 (Application for Transfer of Ownership), Form 34 (Application for Making an Entry of an Agreement of Hire-Purchase/Lease/Hypothecation), original Registration Certificate (RC), valid Insurance Policy, valid Pollution Under Control (PUC) certificate, and Seller's NOC. Once the loan is sanctioned, the bank endorses its hypothecation onto the new smart-card RC issued in your name."
  },
  {
    category: "eligibility",
    question: "What is the minimum credit score and income needed for a used car loan?",
    answer: "A CIBIL or Experian credit score of 700 or higher is recommended for swift approval and competitive interest rates. Salaried individuals generally require a minimum net monthly income of ₹20,000 (₹15,000 with select PSU banks), while self-employed applicants need an annual declared net profit of at least ₹1.5 Lakhs supported by audited ITRs and 6 months of bank account statements."
  },
  {
    category: "foreclosure",
    question: "Can I prepay or foreclose my used car loan before tenure completion?",
    answer: "Yes. Under RBI regulatory guidelines, scheduled banks cannot levy prepayment penalties or foreclosure charges on floating-rate individual retail loans. However, fixed-rate used car loans or commercial/business applicant borrowings may attract a foreclosure fee ranging between 2% and 5% of the outstanding principal balance if closed before maturity."
  },
  {
    category: "insurance",
    question: "Is comprehensive motor insurance mandatory for a used car loan?",
    answer: "Yes, comprehensive bumper-to-bumper or third-party + own-damage insurance is legally mandatory throughout the entire loan tenure. The insurance policy must explicitly endorse the financier's hypothecation clause (naming the lending bank as the primary loss payee). Borrowers must renew this policy annually and furnish proof of cover to the lender."
  }
];

const UsedCarLoanPage = ({ openApplyModal, openEligibilityModal, openCibilModal }) => {
  // Page SEO Details
  const pageTitle = "Compare Used Car Loan Interest Rates in India (From 9.95% p.a.) | BanksCart";
  const pageDescription = "Compare top used car loan rates from SBI, HDFC, Tata Capital, PNB, and ICICI Bank. Calculate monthly EMI, check 100% on-valuation financing, RTO transfer norms, and apply online with zero brokerage.";
  const canonicalUrl = "https://www.bankscart.com/loans/used-car";

  // Calculator State
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(11.5);
  const [tenureYears, setTenureYears] = useState(4);
  const [downPayment, setDownPayment] = useState(100000);

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
    const months = tenureYears * 12;

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
  }, [loanAmount, downPayment, interestRate, tenureYears]);

  const { monthlyEmi, totalInterest, totalPayable, principalPortion } = calculateEMI();
  const interestPercentage = totalPayable > 0 ? Math.round((totalInterest / totalPayable) * 100) : 0;
  const principalPercentage = 100 - interestPercentage;

  // Filtered Lenders
  const filteredLenders = usedCarLenders.filter((lender) => {
    const matchesCat = lenderCategory === "all" || lender.category === lenderCategory;
    const matchesSearch =
      lender.name.toLowerCase().includes(lenderSearch.toLowerCase()) ||
      lender.fullName.toLowerCase().includes(lenderSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filtered FAQs
  const filteredFaqs = usedCarFaqs.filter((faq) => {
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
        "name": "Used Car Loan",
        "item": canonicalUrl
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "BanksCart Used Car Loan Comparison",
    "description": pageDescription,
    "url": canonicalUrl,
    "provider": {
      "@type": "Organization",
      "name": "BanksCart Financial Technologies Private Limited",
      "url": "https://www.bankscart.com"
    },
    "category": "Pre-Owned Auto Financing",
    "annualPercentageRate": {
      "@type": "QuantitativeValue",
      "minValue": "9.95",
      "maxValue": "16.50",
      "unitText": "%"
    },
    "amount": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "minValue": "100000",
      "maxValue": "7500000"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": usedCarFaqs.map((faq) => ({
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
        <meta name="keywords" content="used car loan, pre-owned car loan rates, second hand car loan india, used car emi calculator, sbi used car loan, hdfc pre owned car loan, rto hypothecation form 34" />
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
                <li className="text-white font-medium" aria-current="page">Used Car Loan</li>
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
                  <Car className="w-3.5 h-3.5 text-amber-400" />
                  <span>PRE-OWNED AUTO FINANCE &bull; VERIFIED BANK RATES</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Compare Used Car Loan Interest Rates in India (Starting at 9.95% p.a.)
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                  Finance up to 85%–100% of appraised vehicle valuation across top certified pre-owned hatchbacks, sedans, and SUVs. Compare live APRs, processing fee slabs, and flexible tenures up to 7 years with instant digital approval.
                </p>

                <div className="pt-2 flex flex-wrap gap-4 items-center">
                  {openApplyModal && (
                    <button
                      onClick={() => openApplyModal("Used Car Loan")}
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-lg transition-colors shadow-lg shadow-amber-500/20 inline-flex items-center"
                    >
                      Apply for Used Car Loan
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  )}
                  {openEligibilityModal && (
                    <button
                      onClick={() => openEligibilityModal("Used Car Loan")}
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

              {/* Fast Fact Pill in Hero */}
              <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Used Car Benchmark 2025
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Lowest Interest Rate:</span>
                    <span className="font-bold text-white font-mono text-sm">9.95% p.a.</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Max Financing (LTV):</span>
                    <span className="font-semibold text-white">Up to 85% – 100% Valuation</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Max Repayment Tenure:</span>
                    <span className="font-semibold text-white">Up to 7 Years (84 Mos)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Max Vehicle Age at Maturity:</span>
                    <span className="font-semibold text-white">Up to 8 – 10 Years</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">Processing Fees:</span>
                    <span className="font-semibold text-emerald-400">0.50% to 2.50%</span>
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
              <div className="text-2xl lg:text-3xl font-extrabold text-blue-700 font-mono">9.95%</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">Starting Rate</div>
              <div className="text-[11px] text-slate-500 mt-1">Special PSU & high-CIBIL rates</div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-md">
              <div className="text-2xl lg:text-3xl font-extrabold text-blue-700 font-mono">₹75 Lakhs</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">Max Loan Amount</div>
              <div className="text-[11px] text-slate-500 mt-1">Multi-brand & luxury certified cars</div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-md">
              <div className="text-2xl lg:text-3xl font-extrabold text-blue-700 font-mono">100%</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">Valuation Funding</div>
              <div className="text-[11px] text-slate-500 mt-1">Select private bank partnerships</div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-md">
              <div className="text-2xl lg:text-3xl font-extrabold text-blue-700 font-mono">2 Hours</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">Digital Approval</div>
              <div className="text-[11px] text-slate-500 mt-1">Paperless digital sanction letters</div>
            </div>
          </div>
        </section>

        {/* Main Content Body */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

          {/* Section 1: Interactive Used Car EMI Calculator */}
          <section id="calculator" className="bg-white rounded-2xl p-6 lg:p-10 border border-slate-200 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold uppercase tracking-wider">
                  <Gauge className="w-3.5 h-3.5" />
                  <span>Real-Time Valuation & EMI Simulation</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mt-2">
                  Used Car Loan EMI & Down Payment Calculator
                </h2>
              </div>
              <span className="text-xs text-slate-500">
                Formula: Reducing balance monthly compounding
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Sliders Area */}
              <div className="lg:col-span-7 space-y-6">
                {/* Vehicle Valuation / On-Road Estimate */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
                    <label htmlFor="vehicle-val">Car Valuation / Agreed Price:</label>
                    <span className="font-mono text-base font-bold text-blue-700">₹{loanAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <input
                    id="vehicle-val"
                    type="range"
                    min={100000}
                    max={5000000}
                    step={25000}
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>₹1,00,000</span>
                    <span>₹25,00,000</span>
                    <span>₹50,00,000</span>
                  </div>
                  {/* Quick Chips */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[300000, 500000, 800000, 1200000, 2000000].map((amt) => (
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
                        ₹{(amt / 100000).toFixed(amt % 100000 === 0 ? 0 : 1)}L
                      </button>
                    ))}
                  </div>
                </div>

                {/* Down Payment Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
                    <label htmlFor="down-pay">Your Down Payment (Own Contribution):</label>
                    <span className="font-mono text-base font-bold text-slate-800">₹{downPayment.toLocaleString("en-IN")}</span>
                  </div>
                  <input
                    id="down-pay"
                    type="range"
                    min={0}
                    max={Math.min(loanAmount * 0.5, 1500000)}
                    step={10000}
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>₹0 (100% LTV)</span>
                    <span>₹{Math.min(loanAmount * 0.5, 1500000).toLocaleString("en-IN")}</span>
                  </div>
                </div>

                {/* Interest Rate Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
                    <label htmlFor="interest-rate">Interest Rate (% p.a.):</label>
                    <span className="font-mono text-base font-bold text-blue-700">{interestRate}%</span>
                  </div>
                  <input
                    id="interest-rate"
                    type="range"
                    min={9.5}
                    max={17.0}
                    step={0.1}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>9.5%</span>
                    <span>13.0%</span>
                    <span>17.0%</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[9.95, 10.5, 11.25, 12.5, 14.0].map((r) => (
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

                {/* Tenure Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
                    <label htmlFor="tenure-years">Repayment Tenure:</label>
                    <span className="font-mono text-base font-bold text-blue-700">{tenureYears} Years ({tenureYears * 12} Months)</span>
                  </div>
                  <input
                    id="tenure-years"
                    type="range"
                    min={1}
                    max={7}
                    step={1}
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>1 Year</span>
                    <span>3 Years</span>
                    <span>5 Years</span>
                    <span>7 Years</span>
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
                  <p className="text-xs text-slate-500">Per month for {tenureYears * 12} installments</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-200 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Net Financed Amount:</span>
                    <span className="font-mono font-bold text-slate-900">₹{principalPortion.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Interest Payable:</span>
                    <span className="font-mono font-bold text-amber-700">₹{totalInterest.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Amount Payable:</span>
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
                    onClick={() => openApplyModal(`Used Car Loan - Financed ₹${principalPortion.toLocaleString("en-IN")} for ${tenureYears} Yrs`)}
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-lg transition-colors shadow-md shadow-amber-500/20 text-center block"
                  >
                    Apply with this Pre-Owned EMI
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
                  <span>Verified Indian Lenders</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mt-2">
                  Top Used Car Loan Interest Rates (2025 Matrix)
                </h2>
              </div>
              <p className="text-xs text-slate-500 max-w-sm md:text-right">
                Audited bi-weekly. Interest rates benchmarked against Repo-Linked Lending Rate (RLLR) and lender internal MCLR.
              </p>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { id: "all", label: "All Lenders" },
                  { id: "psu", label: "Public Sector (PSU)" },
                  { id: "private", label: "Private Banks" },
                  { id: "nbfc", label: "NBFCs & Specialists" }
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
                  placeholder="Search bank name..."
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
                              // Fallback initials
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm">{lender.fullName}</h3>
                          <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                            {lender.category === "psu" ? "Public Sector Bank" : lender.category === "private" ? "Private Commercial Bank" : "NBFC Specialist"}
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
                        Apply with Bank
                        <ChevronDown className="w-3 h-3 ml-1 -rotate-90" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Essential Pre-Owned Car Valuation & Certified Inspection Checklist */}
          <section className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 rounded text-xs font-semibold uppercase tracking-wider border border-amber-200">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Buyer Protection & Fair Valuation</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Used Car Valuation Rules & Surveyor Inspection Checklist
              </h2>
              <p className="text-sm text-slate-650 leading-relaxed max-w-3xl">
                Before releasing loan funds, every institutional bank mandates an independent vehicle valuation to confirm the car's true Insured Declared Value (IDV) and mechanical integrity:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h3 className="font-bold text-slate-900 text-base">Vehicle Age & Odometer Check</h3>
                <p className="text-xs text-slate-650 leading-relaxed">
                  Lenders check the original chassis manufacturing plate versus the RC registration year. Cars exceeding 1,20,000 km or 5 calendar years may face lowered LTV caps (60%–70% instead of 85%).
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h3 className="font-bold text-slate-900 text-base">Engine Compression & Flood Damage</h3>
                <p className="text-xs text-slate-650 leading-relaxed">
                  The surveyor tests OBD-II error codes, ECU flashing history, suspension play, and floorboard rust to verify the car has never experienced water subversion or total-loss insurance claims.
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h3 className="font-bold text-slate-900 text-base">Chassis & Apron Structural Integrity</h3>
                <p className="text-xs text-slate-650 leading-relaxed">
                  Surveyors check body pillar spot welds (A, B, and C pillars) and front radiator cross-members. Any signs of major structural repair or accidental unibody welding immediately disqualifies bank financing.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Step-by-Step RTO Ownership Transfer & Hypothecation Guide */}
          <section className="bg-slate-900 text-white rounded-2xl p-8 lg:p-10 shadow-xl space-y-8 border border-slate-800">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-300 text-xs font-semibold uppercase tracking-wider rounded-md border border-blue-500/20">
                <FileCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Statutory RTO Compliance</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                RTO Ownership Transfer (Form 29/30) & Hypothecation (Form 34)
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                When buying a pre-owned car with bank financing, ownership transfer and lender hypothecation must be executed simultaneously through your jurisdictional Regional Transport Office (RTO) or Parivahan portal:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-slate-200">
              <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2 backdrop-blur-sm">
                <span className="font-mono text-amber-400 font-bold text-xs">STEP 01</span>
                <h3 className="font-bold text-white text-sm">Form 29 & 30 Submission</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The original registered owner signs Form 29 (notice of transfer) and Form 30 (application for transfer). Accompanied by original RC and PAN card copy.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2 backdrop-blur-sm">
                <span className="font-mono text-amber-400 font-bold text-xs">STEP 02</span>
                <h3 className="font-bold text-white text-sm">Form 34 Hypothecation</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Signed by both borrower and lending bank to endorse the financier's lien on the vehicle under Section 51 of the Motor Vehicles Act 1988.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2 backdrop-blur-sm">
                <span className="font-mono text-amber-400 font-bold text-xs">STEP 03</span>
                <h3 className="font-bold text-white text-sm">RTO Verification & NOC</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  If the vehicle is moving across RTO state lines or districts, a Clearance Certificate (CC) or RTO Form 28 (NOC) is verified through Parivahan.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2 backdrop-blur-sm">
                <span className="font-mono text-amber-400 font-bold text-xs">STEP 04</span>
                <h3 className="font-bold text-white text-sm">Smart Card RC Issuance</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The RTO prints your new Smart Card RC bearing your name as registered owner and the bank's name under "Hypothecated To".
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Eligibility Criteria & Documentation Matrix */}
          <section className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm space-y-8">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                <span>Underwriting Standards</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Used Car Loan Eligibility & Required Documentation
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Salaried Profile */}
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-700" />
                  Salaried Borrowers Checklist
                </h3>
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Age Bracket:</span>
                    <span className="font-semibold text-slate-900">21 to 65 Years (at maturity)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Min Net Monthly Salary:</span>
                    <span className="font-semibold text-slate-900">₹20,000/month (₹15k with PSUs)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Job Stability:</span>
                    <span className="font-semibold text-slate-900">Min 1 year total (6 mos current employer)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Required KYC:</span>
                    <span className="font-semibold text-slate-900">PAN Card + Aadhaar / Passport</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Income Documents:</span>
                    <span className="font-semibold text-slate-900">Last 3 months salary slips + Form 16</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Banking Records:</span>
                    <span className="font-semibold text-slate-900">Latest 6 months salary account statement</span>
                  </div>
                </div>
              </div>

              {/* Self-Employed Profile */}
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  Self-Employed Professionals & MSMEs
                </h3>
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Age Bracket:</span>
                    <span className="font-semibold text-slate-900">25 to 65 Years</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Min Net Annual Income:</span>
                    <span className="font-semibold text-slate-900">₹1,50,000+ audited annual profit</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Business Vintage:</span>
                    <span className="font-semibold text-slate-900">Min 3 years continuous operational history</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Entity Proof:</span>
                    <span className="font-semibold text-slate-900">GST Registration, Udyam, or Shop & Est.</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Financial Filings:</span>
                    <span className="font-semibold text-slate-900">2 years ITR with Computation & P&L</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Banking Records:</span>
                    <span className="font-semibold text-slate-900">Latest 6 to 12 months primary current account</span>
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
                  Used Car Loan FAQs
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
                { id: "general", label: "Basics & Process" },
                { id: "valuation", label: "Valuation & LTV" },
                { id: "rates", label: "Interest & Fees" },
                { id: "rto", label: "RTO Transfer & Forms" },
                { id: "eligibility", label: "Eligibility & CIBIL" }
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
              Related Vehicle Lending & Bureau Solutions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <Link to="/loans/car" className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 text-slate-800 font-semibold flex items-center justify-between">
                <span>New Car Loan</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </Link>
              <Link to="/loans/two-wheeler" className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 text-slate-800 font-semibold flex items-center justify-between">
                <span>Two-Wheeler Loan</span>
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
              BanksCart Financial Technologies Private Limited (CIN: U67190DL2024PTC428910) is a digital lending service provider (LSP) and loan comparison platform. BanksCart does not grant loans, approve vehicle appraisals, or underwrite credit. All loan sanctions, interest rate slabs, LTV multiples, and RTO hypothecation procedures remain under the exclusive jurisdiction of the respective scheduled commercial banks and RBI-registered NBFCs.
            </p>
          </section>

        </main>
      </div>
    </>
  );
};

export default UsedCarLoanPage;
