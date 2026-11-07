import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import { 
  PiggyBank, 
  TrendingUp, 
  ShieldCheck, 
  Landmark, 
  FileCheck, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Scale, 
  Calculator,
  Building2
} from "lucide-react";

const investmentCategories = [
  {
    title: "Bank Fixed Deposits (FD)",
    description: "Lock in guaranteed returns up to 9.00% p.a. Backed by DICGC sovereign protection up to ₹5 Lakhs per bank.",
    badge: "Guaranteed Return",
    yieldHighlight: "Up to 9.00% p.a.",
    icon: PiggyBank,
    to: "/investment/fixed-deposit",
    actionLabel: "Compare Bank FDs"
  },
  {
    title: "Direct Mutual Funds",
    description: "Build long-term wealth with zero-commission direct mutual funds. Set up automated monthly SIPs starting from ₹100.",
    badge: "Zero Commission",
    yieldHighlight: "12% - 18% Target CAGR",
    icon: TrendingUp,
    to: "/investment/mutual-funds",
    actionLabel: "Explore Mutual Funds"
  },
  {
    title: "Government Bonds & G-Secs",
    description: "Invest directly in Central Government dated securities and T-Bills with zero default risk via RBI Retail Direct.",
    badge: "Sovereign Guarantee",
    yieldHighlight: "7.05% - 7.50% p.a.",
    icon: Landmark,
    to: "/investment/bonds/government",
    actionLabel: "Explore G-Secs"
  },
  {
    title: "Corporate Bonds & NCDs",
    description: "Earn 1.5% to 3.0% higher yields than regular FDs from CRISIL AAA-rated corporate houses and financial institutions.",
    badge: "High-Yield Debt",
    yieldHighlight: "8.25% - 9.50% p.a.",
    icon: Building2,
    to: "/investment/bonds/corporate",
    actionLabel: "View Corporate Bonds"
  },
  {
    title: "Sovereign Gold Bonds (SGB)",
    description: "Earn 2.50% annual interest on gold with 100% tax-free capital gains at maturity. Backed by the Reserve Bank of India.",
    badge: "Tax-Free Capital Gains",
    yieldHighlight: "2.5% + Gold Gains",
    icon: Sparkles,
    to: "/investment/bonds/sovereign-gold",
    actionLabel: "View Gold Bonds"
  },
  {
    title: "Tax-Saving Plans (Sec 80C)",
    description: "Save up to ₹46,800 in income tax with Section 80C compliant ELSS funds, tax-saving FDs, and national retirement schemes.",
    badge: "Tax Optimization",
    yieldHighlight: "Save up to ₹46,800 Tax",
    icon: FileCheck,
    to: "/investment/more-plans",
    actionLabel: "Compare Tax Plans"
  }
];

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://bankscart.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Investments",
      "item": "https://bankscart.com/investment"
    }
  ]
};

const InvestmentsOverviewPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 pt-20 sm:pt-24 pb-16 antialiased">
      <Helmet>
        <title>Best Investment Plans in India: FD, Mutual Funds, Bonds & SGB | BanksCart</title>
        <meta 
          name="description" 
          content="Explore and compare India's top investment options. Guaranteed bank fixed deposits, zero-commission mutual funds, Government G-Secs, and Sovereign Gold Bonds." 
        />
        <link rel="canonical" href="https://bankscart.com/investment" />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb path={["Home", "Investments"]} />

        {/* Hero Section: Institutional Trust Navy / Slate */}
        <section className="bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 rounded-2xl text-white p-6 sm:p-10 lg:p-12 shadow-lg border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 rounded-full px-3.5 py-1 text-xs font-semibold text-blue-200 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Wealth & Fixed Income Marketplace
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Grow Your Wealth with Verified Investments
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Compare India's leading investment avenues side-by-side. From guaranteed bank fixed deposits to direct mutual funds, government bonds, and gold securities.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> SEBI & RBI Regulated Avenues
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> DICGC Insured Bank FDs
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400" /> Zero Commission Direct Investing
              </span>
            </div>
          </div>
        </section>

        {/* 6 Core Investment Category Tiles Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Explore Investment Asset Classes
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Choose the asset class that matches your risk tolerance, liquidity horizon, and return goals:
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg whitespace-nowrap self-start sm:self-auto">
              Updated November 2026
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {investmentCategories.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center font-bold">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-blue-900 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{item.title}</h3>
                      <div className="text-xs font-bold text-emerald-700 font-mono mt-1">
                        {item.yieldHighlight}
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100">
                    <Link
                      to={item.to}
                      className="inline-flex items-center justify-between w-full p-2.5 rounded-xl bg-slate-50 hover:bg-[#1E3A8A] text-slate-800 hover:text-white font-semibold text-xs transition-colors group"
                    >
                      <span>{item.actionLabel}</span>
                      <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Standalone Sovereign Savings & Tax Exemption Section */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-6">
          <div>
            <span className="text-xs font-bold text-[#1E3A8A] uppercase tracking-wider block mb-1">
              Government Savings & Sovereign Schemes
            </span>
            <h3 className="text-2xl font-bold text-slate-900">
              Government Welfare Schemes & Tax Optimization
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Maximize sovereign security and triple tax-exempt (EEE) compounding through central government savings and retirement programs:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-base">Sukanya Samriddhi Yojana (SSY)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                High-interest sovereign savings scheme offering 8.2% p.a. guaranteed returns with Section 80C tax deduction and 100% tax-free maturity for girl children.
              </p>
              <Link
                to="/blog/Sukanya-Samriddhi-Yojana-Guide"
                className="text-xs font-bold text-[#1E3A8A] hover:underline inline-flex items-center gap-1 pt-1"
              >
                Complete Sukanya Samriddhi Guide &rarr;
              </Link>
            </div>

            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-base">Public Provident Fund (PPF) & NPS</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Build a secure retirement corpus with guaranteed government interest rates (7.1% p.a. for PPF) plus an additional ₹50,000 tax deduction under Section 80CCD(1B) for NPS.
              </p>
              <Link
                to="/investment/more-plans"
                className="text-xs font-bold text-[#1E3A8A] hover:underline inline-flex items-center gap-1 pt-1"
              >
                Compare Retirement & Tax Plans &rarr;
              </Link>
            </div>
          </div>
        </section>

        {/* Conversion CTA Banner: Clean & Functional */}
        <section className="bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="font-bold text-xl sm:text-2xl text-white">Need Guidance on Portfolio Allocation?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Compare pre-approved institutional fixed deposits, zero-commission mutual fund SIPs, and sovereign securities online.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/investment/fixed-deposit"
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl shadow transition-colors whitespace-nowrap text-xs sm:text-sm"
            >
              Compare Fixed Deposits &rarr;
            </Link>
            <Link
              to="/investment/mutual-funds"
              className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/20 transition-colors whitespace-nowrap text-xs sm:text-sm"
            >
              Start Mutual Fund SIP
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
};

export default InvestmentsOverviewPage;
