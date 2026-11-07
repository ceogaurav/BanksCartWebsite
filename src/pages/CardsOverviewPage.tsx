import React, { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import {
  CreditCard,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Percent,
  Clock,
  Sparkles,
  Award,
  Search,
  Users,
  Zap,
  HelpCircle,
  AlertCircle,
  ExternalLink,
  Plane,
  Gift,
  Flame,
  Fuel,
  Building2,
  Check
} from "lucide-react";

interface CardsOverviewProps {
  openApplyModal?: (loanType?: string) => void;
  openEligibilityModal?: (loanType?: string) => void;
  openCibilModal?: () => void;
}

// 6 Top-Rated Indian Credit Cards
const topCards = [
  {
    id: "hdfc-infinia",
    name: "HDFC Bank Infinia Metal Edition",
    bank: "HDFC Bank",
    category: "Super-Premium & Travel",
    badge: "Most Rewarding Metal Card",
    joiningFee: "₹12,500 + GST",
    annualFee: "₹12,500 + GST (Waived on ₹10L spend)",
    rewards: "5 Reward Points per ₹150 (up to 33.3% return on SmartBuy)",
    lounge: "Unlimited Domestic & International Lounge Access (Primary + Add-on)",
    highlights: [
      "1:1 redemption ratio against flight & hotel bookings",
      "Club Marriott membership with dining privileges across Asia-Pacific",
      "Low 2% foreign currency markup fee"
    ],
    applyLink: "/cards/credit-cards"
  },
  {
    id: "sbi-cashback",
    name: "SBI Cashback Credit Card",
    bank: "State Bank of India",
    category: "Online Shopping & Cashback",
    badge: "Best Online Cashback",
    joiningFee: "₹999 + GST",
    annualFee: "₹999 + GST (Waived on ₹2L spend)",
    rewards: "5% Unlimited Cashback on all online transactions (No merchant lock-in)",
    lounge: "4 Complimentary Domestic Airport Lounge Visits per year",
    highlights: [
      "Direct statement credit for earned cashback each month",
      "1% cashback on offline retail purchases and utility bills",
      "1% fuel surcharge waiver across all Indian petrol pumps"
    ],
    applyLink: "/cards/cashback-credit-cards"
  },
  {
    id: "amazon-pay-icici",
    name: "Amazon Pay ICICI Bank Credit Card",
    bank: "ICICI Bank",
    category: "Lifetime Free & Everyday",
    badge: "Top Lifetime Free",
    joiningFee: "₹0 (Lifetime Free)",
    annualFee: "₹0 (Lifetime Free)",
    rewards: "5% Unlimited Cashback on Amazon India for Prime members",
    lounge: "Select merchant discounts & fuel surcharge waivers",
    highlights: [
      "Zero joining and zero annual maintenance fee forever",
      "2% cashback on 100+ partner merchants (Swiggy, Uber, Zomato)",
      "Cashback credited directly into Amazon Pay balance every billing cycle"
    ],
    applyLink: "/cards/lifetime-free"
  },
  {
    id: "axis-atlas",
    name: "Axis Bank Atlas Credit Card",
    bank: "Axis Bank",
    category: "Aviation & Miles Accelerator",
    badge: "Best Travel Miles",
    joiningFee: "₹5,000 + GST",
    annualFee: "₹5,000 + GST",
    rewards: "5 EDGE Miles per ₹100 spent on airline & hotel direct bookings",
    lounge: "Up to 18 Domestic & 12 International Lounges per year",
    highlights: [
      "Tiered milestone acceleration: Silver, Gold, and Platinum",
      "1:2 conversion ratio to leading airline miles (Singapore, Qatar, Turkish)",
      "Dedicated concierge desk and airport meet-and-greet services"
    ],
    applyLink: "/cards/credit-cards"
  },
  {
    id: "amex-plat-travel",
    name: "American Express Platinum Travel",
    bank: "American Express",
    category: "Milestone Rewards & Luxury",
    badge: "Best Milestone Card",
    joiningFee: "₹3,500 + GST",
    annualFee: "₹5,000 + GST",
    rewards: "Up to 48,000 Bonus Membership Rewards + ₹10,000 Taj Hotel Stay Voucher",
    lounge: "8 Complimentary Domestic Airport Lounge Visits per year",
    highlights: [
      "Exceptional customer dispute protection and fraud resolution",
      "Complimentary Taj, SeleQtions & Vivanta luxury holiday vouchers on ₹4L spend",
      "Priority assistance and access to premium dining programs"
    ],
    applyLink: "/cards/credit-cards"
  },
  {
    id: "tata-neu-infinity",
    name: "Tata Neu Infinity HDFC Bank Card",
    bank: "HDFC Bank",
    category: "Ecosystem Cashback & UPI",
    badge: "Top RuPay UPI Credit",
    joiningFee: "₹1,499 + GST",
    annualFee: "₹1,499 + GST (Waived on ₹3L spend)",
    rewards: "10% NeuCoins on Tata Neu ecosystem (BigBasket, Croma, Air India, Tata 1mg)",
    lounge: "8 Domestic + 4 International Lounge Visits per year",
    highlights: [
      "Available on RuPay network for linked merchant UPI scan-and-pay",
      "1 NeuCoin = ₹1 value usable across all Tata retail brands",
      "1.5% cashback on all non-Tata UPI and merchant expenditures"
    ],
    applyLink: "/cards/credit-cards"
  }
];

// FAQs for Cards Overview
const cardsFaqs = [
  {
    category: "basics",
    question: "What is the difference between a credit card and a debit card?",
    answer: "A debit card deducts money directly from your linked savings or current bank account in real time. A credit card extends a pre-approved revolving credit line provided by the bank, allowing you to make purchases now and pay later. Credit cards offer interest-free billing periods (up to 45–50 days), milestone reward points, complimentary airport lounge access, and help build your CIBIL score when repaid in full."
  },
  {
    category: "lifetime-free",
    question: "What does a 'Lifetime Free' credit card mean?",
    answer: "A Lifetime Free (LTF) credit card has ₹0 joining fee and ₹0 annual maintenance fee for the lifetime of the card, with no minimum annual spending conditions required to waive the fee. Popular Indian examples include the Amazon Pay ICICI Card and select IDFC FIRST Bank cards."
  },
  {
    category: "cibil",
    question: "How does using a credit card impact my CIBIL credit score?",
    answer: "Credit cards represent 30% to 35% of your credit scoring weightage. Making 100% on-time bill payments every month and keeping your Credit Utilization Ratio (CUR) below 30% of your total credit limit rapidly builds a 750+ CIBIL score. Conversely, paying only the Minimum Amount Due (MAD) or missing billing deadlines triggers severe credit rating downgrades."
  },
  {
    category: "interest",
    question: "How is credit card interest calculated if I don't pay the total bill?",
    answer: "If you pay anything less than the Total Amount Due, you forfeit the 50-day interest-free period. Interest (typically 3.0% to 3.75% per month, equivalent to 36% to 45% APR) is charged retrospectively from the exact transaction date on all past and new purchases until the balance is completely cleared to zero."
  },
  {
    category: "rupay",
    question: "What is a RuPay Credit Card and how does it work with UPI apps?",
    answer: "RuPay credit cards issued by Indian banks can be linked directly to your UPI apps (such as PhonePe, Google Pay, Paytm, or BHIM). This allows you to scan any merchant UPI QR code and pay using your credit card credit limit instead of your bank account balance, while continuing to earn reward points on merchant transactions."
  },
  {
    category: "lounge",
    question: "How does airport lounge access work on Indian credit cards in 2025/2026?",
    answer: "Most Indian banks (including HDFC, ICICI, and SBI Card) now implement spend-linked lounge access. To qualify for complimentary quarterly lounge visits, cardholders must meet a minimum spending threshold (typically ₹10,000 to ₹50,000) in the preceding calendar quarter, with the exception of super-premium cards (like HDFC Infinia or Axis Magnus) which offer unconditional access."
  },
  {
    category: "eligibility",
    question: "What are the basic eligibility criteria to apply for a credit card in India?",
    answer: "Applicants must generally be between 21 and 65 years of age, have a regular verifiable monthly income (typically ₹20,000/mo for salaried, or ₹3,00,000+ ITR for self-employed), and maintain a healthy credit score (700+). First-time borrowers with zero credit history can start with fixed-deposit backed credit cards."
  },
  {
    category: "security",
    question: "What security features protect my card from unauthorized transactions?",
    answer: "Under RBI security mandates, all Indian cards feature EMV chips, mandatory 2-Factor Authentication (OTP or 3D Secure) for online purchases, and dynamic tokenization. Cardholders can instantly enable/disable contactless tap-and-pay, toggle international transactions, and set transaction limits via their mobile banking app."
  }
];

const CardsOverviewPage: React.FC<CardsOverviewProps> = ({ openApplyModal, openEligibilityModal, openCibilModal }) => {
  const pageTitle = "Credit Cards & Debit Cards in India: Compare Top Bank Offers (2025) | BanksCart";
  const pageDescription = "Explore and compare 50+ credit cards and debit cards in India. Find lifetime free cards, 5% cashback, travel miles, airport lounge perks, and apply online with instant approval.";
  const canonicalUrl = "https://www.bankscart.com/cards";

  // Spend Forecaster State
  const [monthlySpend, setMonthlySpend] = useState<number>(45000);
  const [spendCategory, setSpendCategory] = useState<"shopping" | "travel" | "fuel">("shopping");

  // FAQs State
  const [faqCategory, setFaqCategory] = useState("all");
  const [faqSearch, setFaqSearch] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Rewards Forecaster Computation
  const estimatedAnnualRewards = useMemo(() => {
    let rate = 0.02; // 2% base
    if (spendCategory === "shopping") rate = 0.045; // 4.5% cashback
    if (spendCategory === "travel") rate = 0.055; // 5.5% travel value
    if (spendCategory === "fuel") rate = 0.025; // 2.5% fuel savings

    const annualSpend = monthlySpend * 12;
    const grossReturn = Math.round(annualSpend * rate);
    return {
      annualReturn: grossReturn,
      monthlyReturn: Math.round(grossReturn / 12),
      freeFlights: Math.floor(grossReturn / 6000)
    };
  }, [monthlySpend, spendCategory]);

  // Filtered FAQs
  const filteredFaqs = cardsFaqs.filter((faq) => {
    const matchesCat = faqCategory === "all" || faq.category === faqCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearch.toLowerCase());
    return matchesCat && matchesSearch;
  });

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
        "name": "Cards",
        "item": canonicalUrl
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "BanksCart Cards Marketplace & Comparison Portal",
    "description": pageDescription,
    "url": canonicalUrl,
    "provider": {
      "@type": "Organization",
      "name": "BanksCart Financial Technologies Private Limited",
      "url": "https://www.bankscart.com"
    },
    "category": "Credit & Payment Cards"
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": cardsFaqs.map((faq) => ({
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
        <meta name="keywords" content="credit cards india, best credit cards, lifetime free credit cards, cashback credit cards, hdfc infinia, sbi cashback card, rupay credit card upi, airport lounge credit cards" />
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
                <li className="text-white font-medium" aria-current="page">Cards</li>
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
                  <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                  <span>PAYMENT INTELLIGENCE &bull; 50+ CARDS COMPARED</span>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Compare Top Credit & Debit Cards in India (2025)
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                  Discover high-yield cashback cards, lifetime free maintenance, premium travel miles, and complimentary domestic & international airport lounge privileges. Compare fee structures, reward multipliers, and apply online with zero brokerage.
                </p>

                <div className="pt-2 flex flex-wrap gap-4 items-center">
                  <Link
                    to="/cards/credit-cards"
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-lg transition-colors shadow-lg shadow-amber-500/20 inline-flex items-center"
                  >
                    Compare All Credit Cards
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                  <Link
                    to="/cards/lifetime-free"
                    className="px-6 py-3 bg-slate-800/90 hover:bg-slate-700 text-white font-medium text-sm rounded-lg border border-slate-700 transition-colors"
                  >
                    Explore Lifetime Free Cards
                  </Link>
                  <Link
                    to="/credit-score"
                    className="text-xs text-slate-300 hover:text-amber-400 underline underline-offset-4 transition-colors"
                  >
                    Check Card Approval Odds (Free CIBIL)
                  </Link>
                </div>
              </div>

              {/* Fast Fact Pill in Hero */}
              <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Marketplace Overview 2025
                </div>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Total Cards Audited:</span>
                    <span className="font-bold text-white font-mono text-sm">50+ Premier Cards</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Lifetime Free Options:</span>
                    <span className="font-semibold text-emerald-400">₹0 Joining & Annual Fee</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">Max Online Cashback:</span>
                    <span className="font-semibold text-white">Up to 5% Across Merchants</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-slate-400">RuPay UPI Support:</span>
                    <span className="font-semibold text-white">Enabled across top banks</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-400">Lounge Privileges:</span>
                    <span className="font-semibold text-amber-400 font-mono">Domestic & International</span>
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
              <div className="text-2xl lg:text-3xl font-extrabold text-blue-700 font-mono">50+</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">Cards Cataloged</div>
              <div className="text-[11px] text-slate-500 mt-1">Tier-1 banking & NBFC issuers</div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-md">
              <div className="text-2xl lg:text-3xl font-extrabold text-blue-700 font-mono">₹0 Fee</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">Lifetime Free Cards</div>
              <div className="text-[11px] text-slate-500 mt-1">Zero annual maintenance charges</div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-md">
              <div className="text-2xl lg:text-3xl font-extrabold text-blue-700 font-mono">5% Cash</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">Max Spend Return</div>
              <div className="text-[11px] text-slate-500 mt-1">E-commerce, dining & utility perks</div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-md">
              <div className="text-2xl lg:text-3xl font-extrabold text-blue-700 font-mono">100% Free</div>
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mt-0.5">Comparison Platform</div>
              <div className="text-[11px] text-slate-500 mt-1">Zero brokerage or advisory fees</div>
            </div>
          </div>
        </section>

        {/* Main Content Body */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

          {/* Section 1: Strategic Card Category Silos */}
          <section className="space-y-6">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold uppercase tracking-wider">
                <Wallet className="w-3.5 h-3.5" />
                <span>Card Portfolios</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                Explore Card Categories Tailored to Your Lifestyle
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Silo 1: All Credit Cards */}
              <Link
                to="/cards/credit-cards"
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:border-blue-400 hover:shadow-md transition-all group block"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-100 block w-fit mb-2">
                  Comprehensive Directory
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors mb-1.5">
                  Compare All Credit Cards
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Multi-bank comparison across 30+ issuers including HDFC, SBI, ICICI, Axis, Amex, and IDFC FIRST with real-time fee filters and reward calculators.
                </p>
                <span className="text-xs font-bold text-blue-700 inline-flex items-center gap-1">
                  Browse 50+ Credit Cards <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              {/* Silo 2: Lifetime Free Cards */}
              <Link
                to="/cards/lifetime-free"
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:border-emerald-400 hover:shadow-md transition-all group block"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Gift className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 block w-fit mb-2">
                  Zero Annual Fee Forever
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mb-1.5">
                  Lifetime Free Credit Cards
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Zero joining fee and zero annual renewal maintenance forever. Enjoy Amazon Pay ICICI, IDFC FIRST, and select Federal Bank cards without spend quotas.
                </p>
                <span className="text-xs font-bold text-emerald-700 inline-flex items-center gap-1">
                  View Lifetime Free Cards <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              {/* Silo 3: Cashback Cards */}
              <Link
                to="/cards/cashback-credit-cards"
                className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:border-amber-400 hover:shadow-md transition-all group block"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-200 block w-fit mb-2">
                  High Cash Return
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-800 transition-colors mb-1.5">
                  Cashback Credit Cards
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Earn up to 5% direct statement cashback on online shopping, food delivery (Swiggy, Zomato), grocery, and utility bill payments every single month.
                </p>
                <span className="text-xs font-bold text-amber-800 inline-flex items-center gap-1">
                  View Cashback Cards <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            </div>
          </section>

          {/* Section 2: Interactive Spend & Annual Reward Forecaster */}
          <section className="bg-white rounded-2xl p-6 lg:p-10 border border-slate-200 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-blue-700 rounded text-xs font-semibold uppercase tracking-wider">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Rewards & Value Forecaster</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mt-2">
                  Estimate Your Annual Card Savings & Cashback
                </h2>
              </div>
              <span className="text-xs text-slate-500">
                Calculated on empirical card milestone return data
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Sliders Area */}
              <div className="lg:col-span-7 space-y-6">
                {/* Monthly Spend Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-slate-800">
                    <label htmlFor="spend-slider">Your Estimated Monthly Card Spend:</label>
                    <span className="font-mono text-base font-bold text-blue-700">₹{monthlySpend.toLocaleString("en-IN")}/mo</span>
                  </div>
                  <input
                    id="spend-slider"
                    type="range"
                    min={10000}
                    max={200000}
                    step={5000}
                    value={monthlySpend}
                    onChange={(e) => setMonthlySpend(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>₹10,000/mo</span>
                    <span>₹1,00,000/mo</span>
                    <span>₹2,00,000/mo</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[20000, 35000, 50000, 80000, 120000].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setMonthlySpend(amt)}
                        className={`text-xs px-2.5 py-1 rounded border font-mono transition-colors ${
                          monthlySpend === amt
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        ₹{(amt / 1000).toFixed(0)}k
                      </button>
                    ))}
                  </div>
                </div>

                {/* Primary Spend Preference */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-800">
                    Primary Spend Category:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      { id: "shopping", label: "Online Shopping", desc: "Amazon, Flipkart, Myntra, Quick-Commerce" },
                      { id: "travel", label: "Travel & Hotels", desc: "Flights, Hotel Stays, International Dining" },
                      { id: "fuel", label: "Fuel & Utilities", desc: "Petrol, Diesel, Electricity, Broadband Bills" }
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSpendCategory(cat.id as any)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          spendCategory === cat.id
                            ? "bg-blue-50 border-blue-400 text-blue-900 shadow-sm"
                            : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        <span className="font-bold text-xs block">{cat.label}</span>
                        <span className="text-[10px] text-slate-500 block leading-tight mt-1">{cat.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Readout Card */}
              <div className="lg:col-span-5 bg-[#F8FAFC] border border-slate-200 rounded-xl p-6 space-y-6">
                <div className="text-center space-y-1">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Projected Annual Reward Value
                  </div>
                  <div className="text-4xl lg:text-5xl font-extrabold text-emerald-700 font-mono tracking-tight">
                    ₹{estimatedAnnualRewards.annualReturn.toLocaleString("en-IN")}
                  </div>
                  <p className="text-xs text-slate-500">
                    Net cash-equivalent value on ₹{(monthlySpend * 12).toLocaleString("en-IN")} annual spend
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-200 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Monthly Value Back:</span>
                    <span className="font-mono font-bold text-slate-900">
                      ₹{estimatedAnnualRewards.monthlyReturn.toLocaleString("en-IN")}/month
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Air Miles Equivalent:</span>
                    <span className="font-mono font-bold text-blue-700">
                      ~{estimatedAnnualRewards.freeFlights} Free Domestic Flight{estimatedAnnualRewards.freeFlights > 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Annual Fee Waiver:</span>
                    <span className="font-semibold text-emerald-700">Eligible on most mid-tier cards</span>
                  </div>
                </div>

                <Link
                  to="/cards/credit-cards"
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-lg transition-colors shadow-md shadow-amber-500/20 text-center block"
                >
                  Find Cards with These Rewards
                </Link>
              </div>
            </div>
          </section>

          {/* Section 3: Top-Rated Credit Cards Showcase */}
          <section className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-md border border-blue-100">
                  <Award className="w-3.5 h-3.5" />
                  <span>Editorially Audited</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight mt-2">
                  Top 6 Credit Cards in India (2025 Rating)
                </h2>
              </div>
              <Link to="/cards/credit-cards" className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center gap-1">
                View All 50+ Cards <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topCards.map((card) => (
                <div
                  key={card.id}
                  className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-sm hover:border-blue-300 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                          {card.bank}
                        </span>
                        <h3 className="font-bold text-slate-900 text-sm leading-snug mt-0.5">
                          {card.name}
                        </h3>
                      </div>
                      <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 text-[9px] font-bold rounded flex-shrink-0">
                        {card.badge}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Annual Fee:</span>
                        <span className="font-semibold text-slate-800">{card.annualFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Rewards:</span>
                        <span className="font-semibold text-blue-700 leading-tight text-right max-w-[180px]">{card.rewards}</span>
                      </div>
                      <div className="flex justify-between pt-0.5 border-t border-slate-200/60">
                        <span className="text-slate-500">Lounge:</span>
                        <span className="font-medium text-slate-700 text-right max-w-[180px]">{card.lounge}</span>
                      </div>
                    </div>

                    <ul className="space-y-1 text-xs text-slate-650">
                      {card.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <Link
                      to={card.applyLink}
                      className="w-full py-2 bg-slate-900 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg transition-colors text-center block"
                    >
                      Compare Card Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: 5 Golden Rules of Smart Credit Card Usage */}
          <section className="bg-white rounded-2xl p-8 lg:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 text-amber-800 rounded text-xs font-semibold uppercase tracking-wider border border-amber-200">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Financial Discipline Blueprint</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                The 5 Golden Rules of Smart Credit Card Management
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-mono text-xs font-bold text-blue-700">RULE 01</span>
                <h3 className="font-bold text-slate-900 text-sm">30% Utilization Cap</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Never exceed 30% of your credit limit (e.g. ₹60,000 on a ₹2L card). High CUR depresses your CIBIL score.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-mono text-xs font-bold text-emerald-700">RULE 02</span>
                <h3 className="font-bold text-slate-900 text-sm">100% Full Payment</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Never settle for Minimum Amount Due (MAD). Clear 100% of the Total Amount Due to avoid 42% revolving APR.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-mono text-xs font-bold text-amber-700">RULE 03</span>
                <h3 className="font-bold text-slate-900 text-sm">50-Day Float Window</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Time high-ticket purchases right after your billing date to maximize the interest-free grace period.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-mono text-xs font-bold text-purple-700">RULE 04</span>
                <h3 className="font-bold text-slate-900 text-sm">Fee Waiver Tracking</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Track milestone spending targets (₹1L to ₹3L) so your annual card fee gets auto-reversed by the bank.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <span className="font-mono text-xs font-bold text-red-700">RULE 05</span>
                <h3 className="font-bold text-slate-900 text-sm">Zero ATM Cash Advance</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Never withdraw cash at ATMs using a credit card. Cash advances carry immediate interest with zero grace days.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Bureau Diagnostics & Card Eligibility Tools */}
          <section className="bg-slate-900 text-white rounded-2xl p-8 lg:p-10 shadow-xl space-y-6 border border-slate-800">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-300 text-xs font-semibold uppercase tracking-wider rounded-md border border-blue-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Credit Bureau Diagnostics</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
                Boost Your Card Approval Odds with Free Bureau Diagnostics
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Premium and lifetime free credit cards require a healthy credit standing. Check your score, audit credit utilization, and dispute bureau anomalies:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-slate-200">
              <Link
                to="/credit-score"
                className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2.5 backdrop-blur-sm hover:border-blue-400 transition-colors block"
              >
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">Official Bureau Check</span>
                <h3 className="font-bold text-white text-base">Free CIBIL Score Check</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Check your latest bureau rating with zero impact on your credit history. Get a breakdown of your score band and card pre-approvals.
                </p>
                <span className="text-xs font-bold text-blue-400 inline-flex items-center gap-1 mt-2">
                  Check Score Now <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              <Link
                to="/credit-health-report-services"
                className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2.5 backdrop-blur-sm hover:border-emerald-400 transition-colors block"
              >
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">Utilization Analysis</span>
                <h3 className="font-bold text-white text-base">Credit Health Report</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  In-depth diagnostic analyzing account age, payment consistency, and credit mix to qualify for high-limit metal cards.
                </p>
                <span className="text-xs font-bold text-emerald-400 inline-flex items-center gap-1 mt-2">
                  Analyze Health <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>

              <Link
                to="/credit-score/credit-rectification-service"
                className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-2.5 backdrop-blur-sm hover:border-amber-400 transition-colors block"
              >
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Dispute Settlement</span>
                <h3 className="font-bold text-white text-base">Credit Rectification Service</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Resolve incorrect overdue records, settle disputed card entries, and clear historical bureau bottlenecks.
                </p>
                <span className="text-xs font-bold text-amber-400 inline-flex items-center gap-1 mt-2">
                  Rectify Bureau Record <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
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
                  Credit & Debit Card FAQs
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
                { id: "basics", label: "Credit vs Debit" },
                { id: "lifetime-free", label: "Lifetime Free" },
                { id: "cibil", label: "CIBIL Score Impact" },
                { id: "interest", label: "Interest & APR" },
                { id: "rupay", label: "RuPay on UPI" },
                { id: "lounge", label: "Airport Lounge" }
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
              Explore Related Payment & Credit Solutions
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <Link to="/cards/credit-cards" className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 text-slate-800 font-semibold flex items-center justify-between">
                <span>All Credit Cards</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </Link>
              <Link to="/cards/lifetime-free" className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 text-slate-800 font-semibold flex items-center justify-between">
                <span>Lifetime Free</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </Link>
              <Link to="/cards/debit" className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 text-slate-800 font-semibold flex items-center justify-between">
                <span>Debit Cards</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </Link>
              <Link to="/credit-score" className="p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 text-slate-800 font-semibold flex items-center justify-between">
                <span>Free CIBIL Check</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </Link>
            </div>
          </section>

          {/* Section 8: Statutory Regulatory Disclosure */}
          <section className="p-5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-slate-700 leading-relaxed space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Regulatory Disclosure & Non-Lender Status</span>
            </div>
            <p>
              BanksCart Financial Technologies Private Limited (CIN: U67190DL2024PTC428910) is a digital financial comparison aggregator and marketing facilitator. BanksCart does not issue credit cards, sanction credit limits, or collect card payments directly. All credit card approvals, annual fee waivers, reward points crediting, and card issuance terms are determined solely by the respective partner banks and licensed card issuers.
            </p>
          </section>

        </main>
      </div>
    </>
  );
};

export default CardsOverviewPage;
