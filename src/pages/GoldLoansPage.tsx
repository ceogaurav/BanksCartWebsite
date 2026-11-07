import React, { useState, useMemo, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import {
  Coins,
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
  Lock,
  Landmark
} from "lucide-react";

interface GoldLoansPageProps {
  openApplyModal?: (loanType?: string) => void;
  openEligibilityModal?: (loanType?: string) => void;
}

// Top Indian Gold Loan Lenders
const goldLenders = [
  {
    id: "sbi",
    name: "State Bank of India",
    fullName: "SBI Gold Loan & Realty Pledging",
    logo: "/logos/sbi.png",
    category: "psu",
    rate: "8.75% – 9.80%",
    minRate: 8.75,
    maxLoan: "Up to ₹50 Lakhs",
    tenure: "Up to 36 Months",
    processingFee: "0.25% of Loan (Min ₹250)",
    badge: "Lowest Interest Rate",
    featured: true,
    highlights: [
      "Sub-9% interest rate tier for bullet and EMI schemes",
      "Nominal processing charges with sovereign vault security",
      "Available across 24,000+ branches nationwide"
    ],
    applyTag: "Gold Loan - State Bank of India"
  },
  {
    id: "muthoot",
    name: "Muthoot Finance",
    fullName: "Muthoot Finance Gold Credit",
    logo: "/logos/muthoot.png",
    category: "nbfc",
    rate: "9.90% – 16.00%",
    minRate: 9.90,
    maxLoan: "Up to ₹10 Crores+",
    tenure: "Up to 36 Months",
    processingFee: "0.25% to 1.00%",
    badge: "Largest Gold Specialist",
    featured: true,
    highlights: [
      "Over 6,000 branches with instant 15-minute disbursal",
      "Flexible part-payments and online renewal via mobile app",
      "Bullet repayment options with zero monthly repayment pressure"
    ],
    applyTag: "Gold Loan - Muthoot Finance"
  },
  {
    id: "hdfc",
    name: "HDFC Bank",
    fullName: "HDFC Bank Sampoorna Gold Loan",
    logo: "/logos/hdfc.png",
    category: "private",
    rate: "9.30% – 16.00%",
    minRate: 9.30,
    maxLoan: "Up to ₹25 Lakhs",
    tenure: "Up to 24 Months",
    processingFee: "1.00% + GST",
    badge: "Fast Digital Sanction",
    featured: true,
    highlights: [
      "Instant 30-minute cash or direct bank transfer disbursal",
      "No income proof or CIBIL score prerequisite",
      "Pledged gold stored in triple-layered Swiss bank strongrooms"
    ],
    applyTag: "Gold Loan - HDFC Bank"
  },
  {
    id: "manappuram",
    name: "Manappuram Finance",
    fullName: "Manappuram Online Gold Loan (OGL)",
    logo: "/logos/manappuram.png",
    category: "nbfc",
    rate: "9.90% – 18.00%",
    minRate: 9.90,
    maxLoan: "Up to ₹1.5 Crores",
    tenure: "Up to 12 Months",
    processingFee: "₹10 to 1.50%",
    badge: "Doorstep & Online OGL",
    featured: true,
    highlights: [
      "24x7 online top-up and withdrawal via connected bank account",
      "Zero foreclosure penalties for bullet loan closures",
      "Doorstep gold evaluation available across major metropolitan hubs"
    ],
    applyTag: "Gold Loan - Manappuram Finance"
  },
  {
    id: "icici",
    name: "ICICI Bank",
    fullName: "ICICI Bank Instant Gold Loan",
    logo: "/logos/icici.png",
    category: "private",
    rate: "9.15% – 15.50%",
    minRate: 9.15,
    maxLoan: "Up to ₹1 Crore",
    tenure: "Up to 12 Months",
    processingFee: "1.00% + GST",
    badge: "30-Minute Disbursal",
    featured: false,
    highlights: [
      "Quick sanction letter and cash handover in under 30 minutes",
      "Multiple repayment options including monthly interest-only",
      "Complimentary BIS hallmarking assay report"
    ],
    applyTag: "Gold Loan - ICICI Bank"
  },
  {
    id: "canara",
    name: "Canara Bank",
    fullName: "Canara Swarna Gold Loan",
    logo: "/logos/canara.png",
    category: "psu",
    rate: "8.65% – 9.40%",
    minRate: 8.65,
    maxLoan: "Up to ₹35 Lakhs",
    tenure: "Up to 24 Months",
    processingFee: "0.25% (Max ₹1,000)",
    badge: "Lowest Benchmark APR",
    featured: false,
    highlights: [
      "Industry-leading 8.65% starting agricultural gold credit rate",
      "Capped documentation fees with transparent sovereign terms",
      "Special concession for women borrowers and self-help groups"
    ],
    applyTag: "Gold Loan - Canara Bank"
  },
  {
    id: "axis",
    name: "Axis Bank",
    fullName: "Axis Bank Gold Loan",
    logo: "/logos/axis.png",
    category: "private",
    rate: "9.25% – 14.50%",
    minRate: 9.25,
    maxLoan: "Up to ₹25 Lakhs",
    tenure: "Up to 36 Months",
    processingFee: "0.75% + GST",
    badge: "Flexible Tenures",
    featured: false,
    highlights: [
      "Loan limits starting from ₹25,001 up to ₹25 Lakhs",
      "Accepted gold ornaments from 18 to 22 Karat",
      "Zero hidden appraisal charges or storage fees"
    ],
    applyTag: "Gold Loan - Axis Bank"
  },
  {
    id: "federal",
    name: "Federal Bank",
    fullName: "Federal Bank Digi-Gold Loan",
    logo: "/logos/federal.png",
    category: "private",
    rate: "8.85% – 11.50%",
    minRate: 8.85,
    maxLoan: "Up to ₹1.5 Crores",
    tenure: "Up to 12 Months",
    processingFee: "0.50% to 1.00%",
    badge: "Competitive Rates",
    featured: false,
    highlights: [
      "Convenient doorstep evaluation and instant RTGS loan transfer",
      "Digital renewal and partial principal repayment via FedMobile",
      "Special bullet repayment schemes for trade and merchant cash flows"
    ],
    applyTag: "Gold Loan - Federal Bank"
  }
];

// FAQs for Gold Loans
const goldLoanFaqs = [
  {
    category: "general",
    question: "What is a gold loan and what is the maximum Loan-to-Value (LTV) allowed by RBI?",
    answer: "A gold loan is a secured loan where a borrower pledges gold jewelry, ornaments, or specially minted bank gold coins (up to 50 grams) as collateral to a bank or NBFC. Under official Reserve Bank of India (RBI) guidelines, the maximum Loan-to-Value (LTV) ratio is capped at 75% of the appraised market value of the gold. Any lender claiming to offer 85% to 90% LTV is in violation of RBI consumer protection norms."
  },
  {
    category: "valuation",
    question: "How is the per-gram gold loan amount calculated by banks and NBFCs?",
    answer: "The lending institution assesses the purity of your gold ornaments (typically 18K to 24K) using non-destructive karat meters or touchstones. The bank deducts the weight of precious stones, gems, or lac, taking only the net gold weight. The eligible loan amount is calculated as: Net Gold Weight (grams) × Daily Gold Price per Gram × Maximum LTV (75%)."
  },
  {
    category: "repayment",
    question: "What are the different repayment options available for gold loans?",
    answer: "Gold loans offer unmatched repayment flexibility compared to unsecured personal loans: 1) Bullet Repayment: No monthly payments; the entire principal and accumulated interest are paid together at the end of the loan tenure (6 to 12 months). 2) Monthly Interest-Only: You pay only the accrued interest each month, paying the principal in one lump-sum at maturity. 3) Regular Monthly EMI: Conventional reducing balance EMI covering both principal and interest. 4) Gold Overdraft (OD): An active credit line where interest is charged only on the funds actually utilized."
  },
  {
    category: "custody",
    question: "Is my pledged gold safe and insured with the bank?",
    answer: "Yes, 100%. Pledged gold ornaments are weighed and hallmarked in your presence, sealed in tamper-proof security bags with unique barcode tracking, and stored inside high-security fireproof bank vaults. Furthermore, all partner banks and NBFCs carry 100% comprehensive transit and burglary insurance on pledged gold at zero cost to the borrower, along with a legally binding Zero Weight Loss Guarantee upon full loan redemption."
  },
  {
    category: "cibil",
    question: "Do I need a high CIBIL score or salary slip to qualify for a gold loan?",
    answer: "No. Because gold loans are fully backed by high-liquidity physical gold collateral, lenders do not mandate high credit scores (even applicants with low CIBIL scores or no credit history are eligible) or formal salary slips / audited ITRs. As long as you are 18 years or older and provide valid identity and address KYC (Aadhaar, PAN, Voter ID), loans can be sanctioned immediately."
  },
  {
    category: "carat",
    question: "What types of gold ornaments are accepted, and can I pledge gold bullion or bars?",
    answer: "Banks and NBFCs accept gold ornaments, jewelry, and bangles between 18 Karat and 22 Karat (BIS 916), as well as 24 Karat gold coins minted by banks up to a maximum cumulative weight of 50 grams per customer. Raw gold bars, bullion bricks, raw nuggets, or gold-plated items are strictly not accepted under RBI regulations."
  },
  {
    category: "foreclosure",
    question: "Can I close my gold loan early, and are there prepayment charges?",
    answer: "Yes, you can close your gold loan at any time by clearing the outstanding interest and principal. Under RBI directions, banks and systemically important NBFCs do not charge prepayment or foreclosure penalties on floating-rate retail gold loans. Once paid, your original sealed gold packet is handed back to you over the counter against your acknowledgement receipt."
  },
  {
    category: "default",
    question: "What happens if I fail to repay my gold loan on the due date?",
    answer: "If you default or fail to service interest, lenders provide a grace period (typically 30 to 90 days) and send formal registered notices giving you multiple opportunities to renew or clear dues. Only if non-payment persists after extensive regulatory notices do lenders initiate a transparent public auction of the pledged ornaments to recover the outstanding balance. Any surplus funds remaining from the auction after recovering dues are legally refunded to the borrower."
  }
];

const GoldLoansPage: React.FC<GoldLoansPageProps> = ({ openApplyModal, openEligibilityModal }) => {
  // Page SEO Details
  const pageTitle = "Compare Gold Loan Interest Rates in India (From 8.75% p.a.) | BanksCart";
  const pageDescription = "Compare top gold loan interest rates from SBI, Muthoot, HDFC Bank, and Manappuram. Calculate per-gram gold rate, 75% RBI LTV limit, bullet repayment vs EMI, and apply online with zero brokerage.";
  const canonicalUrl = "https://www.bankscart.com/resources/gold-rates";

  // Calculator State
  const [calcMode, setCalcMode] = useState<"weight" | "amount">("weight");
  const [goldWeightGrams, setGoldWeightGrams] = useState<number>(40);
  const [loanAmount, setLoanAmount] = useState<number>(200000);
  const [carat, setCarat] = useState<number>(22);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [tenureMonths, setTenureMonths] = useState<number>(12);
  const [repaymentScheme, setRepaymentScheme] = useState<"emi" | "bullet" | "interest_only">("bullet");

  // Filter & Search State
  const [lenderCategory, setLenderCategory] = useState("all");
  const [lenderSearch, setLenderSearch] = useState("");
  const [faqCategory, setFaqCategory] = useState("all");
  const [faqSearch, setFaqSearch] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Live Market Gold Price Benchmarks (2025/2026 indicative benchmarks)
  const goldPricePerGram = useMemo(() => {
    switch (carat) {
      case 24: return 7800;
      case 22: return 7150; // BIS 916
      case 20: return 6500;
      case 18: return 5850;
      default: return 7150;
    }
  }, [carat]);

  // Max 75% LTV Cap under RBI Master Directions
  const maxLtvPerGram = Math.round(goldPricePerGram * 0.75);

  // Dynamic Principal Computation
  const calculatedPrincipal = useMemo(() => {
    if (calcMode === "weight") {
      return goldWeightGrams * maxLtvPerGram;
    }
    return loanAmount;
  }, [calcMode, goldWeightGrams, maxLtvPerGram, loanAmount]);

  const requiredGoldGrams = useMemo(() => {
    return Math.ceil(loanAmount / maxLtvPerGram);
  }, [loanAmount, maxLtvPerGram]);

  // EMI and Interest Calculations
  const { monthlyOutflow, totalInterest, totalPayable } = useMemo(() => {
    const P = calculatedPrincipal;
    const r = interestRate / 12 / 100;
    const n = tenureMonths;

    if (P <= 0 || r <= 0 || n <= 0) {
      return { monthlyOutflow: 0, totalInterest: 0, totalPayable: 0 };
    }

    if (repaymentScheme === "emi") {
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = emi * n;
      return {
        monthlyOutflow: Math.round(emi),
        totalInterest: Math.round(total - P),
        totalPayable: Math.round(total)
      };
    } else if (repaymentScheme === "interest_only") {
      const monthlyInt = Math.round(P * r);
      const interest = monthlyInt * n;
      return {
        monthlyOutflow: monthlyInt,
        totalInterest: interest,
        totalPayable: P + interest
      };
    } else {
      // Bullet Repayment: Simple monthly accrual, paid at final maturity
      const interest = Math.round(P * (interestRate / 100) * (n / 12));
      return {
        monthlyOutflow: 0,
        totalInterest: interest,
        totalPayable: P + interest
      };
    }
  }, [calculatedPrincipal, interestRate, tenureMonths, repaymentScheme]);

  // Filtered Lenders
  const filteredLenders = goldLenders.filter((lender) => {
    const matchesCat = lenderCategory === "all" || lender.category === lenderCategory;
    const matchesSearch =
      lender.name.toLowerCase().includes(lenderSearch.toLowerCase()) ||
      lender.fullName.toLowerCase().includes(lenderSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Filtered FAQs
  const filteredFaqs = goldLoanFaqs.filter((faq) => {
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
        "name": "Gold Loan",
        "item": canonicalUrl
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "BanksCart Gold Loan Comparison & Rates Hub",
    "description": pageDescription,
    "url": canonicalUrl,
    "provider": {
      "@type": "Organization",
      "name": "BanksCart Financial Technologies Private Limited",
      "url": "https://www.bankscart.com"
    },
    "category": "Secured Gold Lending",
    "annualPercentageRate": {
      "@type": "QuantitativeValue",
      "minValue": "8.75",
      "maxValue": "18.00",
      "unitText": "%"
    },
    "amount": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "minValue": "10000",
      "maxValue": "100000000"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": goldLoanFaqs.map((faq) => ({
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
        <meta name="keywords" content="gold loan, gold loan interest rate, sbi gold loan, muthoot finance, hdfc gold loan, gold loan per gram, gold loan emi calculator, rbi gold loan ltv 75 percent, manappuram gold loan" />
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
                <li className="text-white font-medium" aria-current="page">Gold Loan</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Institutional Hero Section */}
        <section className="relative bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-14 lg:py-18 overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:20px_20px]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-400/10 border border-amber-400/25 rounded-full text-amber-300 text-xs font-semibold tracking-wide">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  <span>SECURED GOLD LENDING &bull; VERIFIED BANK RATES</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Compare Gold Loan Interest Rates in India (Starting at 8.75% p.a.)
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                  Unlock instant liquidity by pledging your gold jewelry, ornaments, or bank coins under the statutory RBI 75% LTV framework. Enjoy zero income proof requirements, tamper-proof vault custody, and over-the-counter disbursals in under 30 minutes.
                </p>

                <div className="pt-2 flex flex-wrap gap-4 items-center">
                  {openApplyModal && (
                    <button
                      onClick={() => openApplyModal("Gold Loan")}
                      className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-lg transition-colors shadow-lg shadow-amber-500/20 inline-flex items-center"
                    >
                      Apply for Gold Loan
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  )}
                  {openEligibilityModal && (
                    <button
                      onClick={() => openEligibilityModal("Gold Loan")}
                      className="px-6 py-3 bg-slate-800/90 hover:bg-slate-700 text-white font-medium text-sm rounded-lg border border-slate-700 transition-colors"
                    >
                      Calculate Gold Loan Value
                    </button>
                  )}
                  <a
                    href="#calculator"
                    className="text-xs text-slate-300 hover:text-amber-400 underline underline-offset-4 transition-colors"
                  >
                    View Per-Gram Rate Calculator
                  </a>
                </div>
              </div>

              {/* Fast Fact Pill in Hero */}
              <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Gold Loan Directives 2025
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Lowest Interest Rate:</span>
                    <span className="font-bold text-white font-mono text-sm">8.75% p.a.</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Statutory RBI LTV Limit:</span>
                    <span className="font-semibold text-emerald-400">Max 75% of Gold Value</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Accepted Carat Purity:</span>
                    <span className="font-semibold text-white">18K, 20K, 22K (916), 24K</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Bullet Repayment:</span>
                    <span className="font-semibold text-white">Supported (6 to 12 Mos)</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">Disbursal Window:</span>
                    <span className="font-semibold text-amber-400 font-mono">15 to 30 Minutes</span>
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
              <div className="text-2xl lg:text-3xl font-extrabold text-blue-700 font-mono">8.75%</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">Starting Rate</div>
              <div className="text-[11px] text-slate-500 mt-1">Sovereign PSU gold credit</div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-md">
              <div className="text-2xl lg:text-3xl font-extrabold text-blue-700 font-mono">75% LTV</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">RBI Statutory Cap</div>
              <div className="text-[11px] text-slate-500 mt-1">Consumer safety compliance</div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-md">
              <div className="text-2xl lg:text-3xl font-extrabold text-blue-700 font-mono">100% Insured</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">Vault Protection</div>
              <div className="text-[11px] text-slate-500 mt-1">Zero weight loss guarantee</div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-md">
              <div className="text-2xl lg:text-3xl font-extrabold text-blue-700 font-mono">30 Mins</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">Cash Disbursal</div>
              <div className="text-[11px] text-slate-500 mt-1">No income proof required</div>
            </div>
          </div>
        </section>

        {/* Main Content Body */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

          {/* Section 1: Live Interactive Gold Valuation & EMI / Repayment Calculator */}
          <section id="calculator" className="bg-white rounded-2xl p-6 lg:p-10 border border-slate-200 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 rounded text-xs font-semibold uppercase tracking-wider border border-amber-200">
                  <Coins className="w-3.5 h-3.5 text-amber-600" />
                  <span>Live Per-Gram Valuation & Repayment Engine</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mt-2">
                  Gold Loan Value & EMI Calculator
                </h2>
              </div>

              {/* Mode Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                <button
                  type="button"
                  onClick={() => setCalcMode("weight")}
                  className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-colors ${
                    calcMode === "weight" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  By Gold Weight (Grams)
                </button>
                <button
                  type="button"
                  onClick={() => setCalcMode("amount")}
                  className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-colors ${
                    calcMode === "amount" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  By Desired Amount (₹)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Sliders Area */}
              <div className="lg:col-span-7 space-y-6">

                {/* Carat Purity Selector */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-800">
                    Select Gold Purity (Carat):
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { k: 24, label: "24K (Pure Gold)", rate: 7800 },
                      { k: 22, label: "22K (BIS 916)", rate: 7150 },
                      { k: 20, label: "20K (Jewelry)", rate: 6500 },
                      { k: 18, label: "18K (Studded)", rate: 5850 }
                    ].map((item) => (
                      <button
                        key={item.k}
                        type="button"
                        onClick={() => setCarat(item.k)}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          carat === item.k
                            ? "bg-amber-50 border-amber-400 text-amber-900 shadow-sm"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <span className="font-bold text-sm block font-mono">{item.k}K</span>
                        <span className="text-[10px] text-slate-500 block leading-tight mt-0.5">₹{item.rate}/g</span>
                      </button>
                    ))}
                  </div>
                  <div className="text-[11px] text-slate-500 flex justify-between pt-1">
                    <span>Benchmark Rate: <strong className="font-mono text-slate-700">₹{goldPricePerGram.toLocaleString("en-IN")}/g</strong></span>
                    <span>Max 75% RBI LTV: <strong className="font-mono text-emerald-700">₹{maxLtvPerGram.toLocaleString("en-IN")}/g</strong></span>
                  </div>
                </div>

                {/* Dynamic Slider (Weight or Amount) */}
                {calcMode === "weight" ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
                      <label htmlFor="gold-grams">Net Gold Weight (Ornaments):</label>
                      <span className="font-mono text-base font-bold text-amber-700">{goldWeightGrams} Grams</span>
                    </div>
                    <input
                      id="gold-grams"
                      type="range"
                      min={10}
                      max={300}
                      step={5}
                      value={goldWeightGrams}
                      onChange={(e) => setGoldWeightGrams(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                      <span>10 Grams</span>
                      <span>150 Grams</span>
                      <span>300 Grams</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {[15, 25, 50, 100, 200].map((g) => (
                        <button
                          key={g}
                          type="button"
                          onClick={() => setGoldWeightGrams(g)}
                          className={`text-xs px-2.5 py-1 rounded border font-mono transition-colors ${
                            goldWeightGrams === g
                              ? "bg-amber-500 text-slate-950 font-bold border-amber-500"
                              : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                          }`}
                        >
                          {g}g
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
                      <label htmlFor="gold-loan-amt">Desired Loan Amount:</label>
                      <span className="font-mono text-base font-bold text-blue-700">₹{loanAmount.toLocaleString("en-IN")}</span>
                    </div>
                    <input
                      id="gold-loan-amt"
                      type="range"
                      min={25000}
                      max={2500000}
                      step={25000}
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                      <span>₹25,000</span>
                      <span>₹12,50,000</span>
                      <span>₹25,00,000</span>
                    </div>
                    <div className="text-xs text-amber-800 font-medium bg-amber-50/80 p-2 rounded-lg border border-amber-200">
                      Required Net Gold Weight: <strong className="font-mono text-slate-900">{requiredGoldGrams} Grams</strong> of {carat}K Gold
                    </div>
                  </div>
                )}

                {/* Repayment Scheme Selector */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-800">
                    Repayment Scheme Structure:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: "bullet", label: "Bullet Repayment", desc: "Zero monthly EMI; pay all at maturity" },
                      { id: "interest_only", label: "Monthly Interest", desc: "Pay interest monthly; principal at end" },
                      { id: "emi", label: "Monthly EMI", desc: "Reducing principal & interest EMI" }
                    ].map((sch) => (
                      <button
                        key={sch.id}
                        type="button"
                        onClick={() => setRepaymentScheme(sch.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          repaymentScheme === sch.id
                            ? "bg-blue-50 border-blue-400 text-blue-900 shadow-sm"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <span className="font-bold text-xs block">{sch.label}</span>
                        <span className="text-[10px] text-slate-500 block leading-tight mt-1">{sch.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Interest Rate & Tenure */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Interest Rate:</span>
                      <span className="font-mono text-blue-700 font-bold">{interestRate}% p.a.</span>
                    </div>
                    <input
                      type="range"
                      min={8.5}
                      max={18.0}
                      step={0.1}
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Tenure:</span>
                      <span className="font-mono text-blue-700 font-bold">{tenureMonths} Months</span>
                    </div>
                    <input
                      type="range"
                      min={3}
                      max={36}
                      step={3}
                      value={tenureMonths}
                      onChange={(e) => setTenureMonths(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                  </div>
                </div>

              </div>

              {/* Result Readout Card */}
              <div className="lg:col-span-5 bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 space-y-6">
                <div className="text-center space-y-1">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Eligible Loan Sanction (Max 75% LTV)
                  </div>
                  <div className="text-4xl lg:text-5xl font-extrabold text-blue-700 font-mono tracking-tight">
                    ₹{calculatedPrincipal.toLocaleString("en-IN")}
                  </div>
                  <p className="text-xs text-slate-500">
                    Based on {calcMode === "weight" ? `${goldWeightGrams}g` : `${requiredGoldGrams}g`} of {carat}K Gold
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-200 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Monthly Payment:</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {repaymentScheme === "bullet" ? "₹0 (Paid at Maturity)" : `₹${monthlyOutflow.toLocaleString("en-IN")}/mo`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Interest Payable:</span>
                    <span className="font-mono font-bold text-amber-700">₹{totalInterest.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Repayment Amount:</span>
                    <span className="font-mono font-bold text-slate-900">₹{totalPayable.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200/60">
                    <span className="text-slate-500">Gross Gold Market Value:</span>
                    <span className="font-mono font-semibold text-slate-700">
                      ₹{Math.round(calculatedPrincipal / 0.75).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-800 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>No Credit Check & Zero Proof Needed</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 leading-snug">
                    Over-the-counter disbursal upon physical purity assay. Pledged ornaments insured up to 100% of value.
                  </p>
                </div>

                {openApplyModal && (
                  <button
                    onClick={() => openApplyModal(`Gold Loan - ₹${calculatedPrincipal.toLocaleString("en-IN")} (${repaymentScheme} scheme)`)}
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-lg transition-colors shadow-md shadow-amber-500/20 text-center block"
                  >
                    Apply for this Gold Loan
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
                  <span>Verified Indian Gold Financiers</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mt-2">
                  Top Gold Loan Interest Rates Across Banks & NBFCs
                </h2>
              </div>
              <p className="text-xs text-slate-500 max-w-sm md:text-right">
                Audited bi-weekly. All rates subject to 75% RBI Loan-to-Value regulatory guidelines.
              </p>
            </div>

            {/* Filter Tabs & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                {[
                  { id: "all", label: "All Lenders" },
                  { id: "psu", label: "Public Sector (PSU)" },
                  { id: "private", label: "Private Commercial" },
                  { id: "nbfc", label: "Gold NBFC Specialists" }
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
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm">{lender.fullName}</h3>
                          <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold">
                            {lender.category === "psu" ? "Public Sector Bank" : lender.category === "private" ? "Private Commercial Bank" : "Gold NBFC Specialist"}
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
                        <span className="text-slate-400 block text-[10px]">Max Loan</span>
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

          {/* Section 3: RBI 75% LTV Cap & Strongroom Safe Custody Protocols */}
          <section className="bg-slate-900 text-white rounded-2xl p-8 lg:p-10 shadow-xl space-y-6 border border-slate-800">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/10 text-amber-300 text-xs font-semibold uppercase tracking-wider rounded-md border border-amber-400/20">
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Regulatory Safety & Vault Custody</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                RBI 75% LTV Mandate & Bank-Grade Vault Protection
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Borrowing against gold requires absolute confidence that your precious heirlooms remain completely safeguarded. BanksCart partner institutions operate under strict Reserve Bank of India statutory safety directives:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-slate-200">
              <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2.5 backdrop-blur-sm">
                <h3 className="font-bold text-amber-400 text-base">RBI 75% LTV Ceiling</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Under the RBI Master Directions on Gold Lending, no regulated bank or NBFC can sanction more than 75% of the appraised gold value. This protects borrowers from rapid margin calls or involuntary auctions during temporary gold price dips.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2.5 backdrop-blur-sm">
                <h3 className="font-bold text-amber-400 text-base">Tamper-Proof Laser Pouch</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Your jewelry is weighed, tested, and sealed inside high-security tamper-evident pouches with unique serial numbers in your presence. The pouch is stored in strongrooms monitored 24x7 by biometric access and CCTV.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2.5 backdrop-blur-sm">
                <h3 className="font-bold text-amber-400 text-base">100% Free Transit Insurance</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All pledged jewelry is insured for 100% of its market value against theft, burglary, fire, and transit damage at zero cost to the borrower, backed by a statutory Zero Weight Loss Guarantee upon full loan redemption.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: Four Gold Loan Repayment Structures */}
          <section className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold uppercase tracking-wider">
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Flexible Repayment Models</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Gold Loan Repayment Options Tailored to Cash Flow
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-mono text-[11px] font-bold text-blue-700">Most Popular</span>
                <h3 className="font-bold text-slate-900 text-sm">Bullet Repayment</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Zero monthly payments. Principal and total accrued interest are paid in one single installment at the end of the 6, 9, or 12-month tenure.
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-mono text-[11px] font-bold text-emerald-700">Predictable</span>
                <h3 className="font-bold text-slate-900 text-sm">Monthly Interest-Only</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pay only the monthly interest charge every 30 days. The original principal amount is repaid in full upon maturity to retrieve your gold.
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-mono text-[11px] font-bold text-amber-700">Structured</span>
                <h3 className="font-bold text-slate-900 text-sm">Regular Monthly EMI</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Conventional reducing balance EMI where both principal and interest are paid down simultaneously over tenures from 12 to 36 months.
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-mono text-[11px] font-bold text-purple-700">Merchant Line</span>
                <h3 className="font-bold text-slate-900 text-sm">Gold Overdraft (OD)</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  A flexible revolving credit facility linked to your bank account. Withdraw and deposit funds at will, paying interest solely on utilized amounts.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Eligibility Criteria & Simple KYC */}
          <section className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                <span>Eligibility & Documents</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Gold Loan Eligibility & Minimal Documentation Requirements
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Eligibility Criteria */}
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-700" />
                  Borrower Eligibility Norms
                </h3>
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Age Bracket:</span>
                    <span className="font-semibold text-slate-900">18 to 70 Years</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Eligible Occupations:</span>
                    <span className="font-semibold text-slate-900">Salaried, Self-employed, Traders, Homemakers, Farmers</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Minimum CIBIL Score:</span>
                    <span className="font-semibold text-emerald-700">No CIBIL Cutoff (Secured Collateral)</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Minimum Income Proof:</span>
                    <span className="font-semibold text-emerald-700">Zero Income Slips / Form 16 Required</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Accepted Gold Ornaments:</span>
                    <span className="font-semibold text-slate-900">18K to 24K (BIS 916 Hallmarked or Unhallmarked)</span>
                  </div>
                </div>
              </div>

              {/* Required Documentation */}
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-700" />
                  Simple KYC Checklist
                </h3>
                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Identity Proof (Any 1):</span>
                    <span className="font-semibold text-slate-900">Aadhaar Card, PAN Card, Passport, Voter ID</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Address Proof (Any 1):</span>
                    <span className="font-semibold text-slate-900">Aadhaar Card, Utility Bill, Driving License</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Photographs:</span>
                    <span className="font-semibold text-slate-900">2 Passport-size color photographs</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="text-slate-500">Bank Account Details:</span>
                    <span className="font-semibold text-slate-900">Cancelled cheque or passbook for RTGS transfer</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Gold Custody Paperwork:</span>
                    <span className="font-semibold text-slate-900">Signed pledge form & assay evaluation voucher</span>
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
                  Gold Loan FAQs
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
                { id: "general", label: "Basics & 75% LTV" },
                { id: "valuation", label: "Per-Gram Math" },
                { id: "repayment", label: "Repayment Schemes" },
                { id: "custody", label: "Vault Custody & Safety" },
                { id: "cibil", label: "Credit Score & KYC" }
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
              Related Lending & Wealth Resources
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <Link to="/loans/personal-loan" className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 text-slate-800 font-semibold flex items-center justify-between">
                <span>Personal Loan</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </Link>
              <Link to="/loans/home-loan" className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 text-slate-800 font-semibold flex items-center justify-between">
                <span>Home Loan</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </Link>
              <Link to="/gold-loan-emi-calculator" className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 text-slate-800 font-semibold flex items-center justify-between">
                <span>Gold Loan Calculator</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </Link>
              <Link to="/credit-score" className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 text-slate-800 font-semibold flex items-center justify-between">
                <span>Free CIBIL Score</span>
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
              BanksCart Financial Technologies Private Limited (CIN: U67190DL2024PTC428910) operates as a digital Lending Service Provider (LSP) and fintech comparison facilitator. BanksCart does not store gold, assay ornaments, or grant loans directly. All gold appraisals, 75% LTV sanction limits, vault storage agreements, and redemption procedures are executed exclusively by partner Scheduled Commercial Banks and RBI-registered NBFCs.
            </p>
          </section>

        </main>
      </div>
    </>
  );
};

export default GoldLoansPage;
