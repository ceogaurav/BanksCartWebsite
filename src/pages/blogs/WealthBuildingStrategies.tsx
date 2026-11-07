import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  TrendingUp,
  CheckCircle2,
  Percent,
  Clock,
  ShieldCheck,
  Building,
  HelpCircle,
  FileCheck2,
  PiggyBank,
  Wallet,
  Sparkles
} from 'lucide-react';

export default function WealthBuildingStrategies() {
  const canonicalUrl = "https://www.bankscart.com/blog/Wealth-Building-Strategies";
  const articleTitle = "How to Build Wealth in India: 10 Proven Financial Strategies (2026)";
  const articleDesc = "The complete personal finance blueprint: learn how to implement the 50/30/20 rule, step-up equity SIPs, build an emergency reserve, and create generational wealth.";

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "headline": articleTitle,
    "description": articleDesc,
    "image": "https://www.bankscart.com/assets/images/bankscart-logo.png",
    "author": {
      "@type": "Person",
      "name": "Priya Sharma",
      "jobTitle": "Senior Financial Analyst",
      "url": "https://www.bankscart.com/author/priya-sharma"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BanksCart",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.bankscart.com/assets/images/bankscart-logo.png"
      }
    },
    "datePublished": "2026-01-20T09:00:00+05:30",
    "dateModified": "2026-11-06T10:00:00+05:30"
  };

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
        "name": "Blog",
        "item": "https://www.bankscart.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Wealth Building Strategies",
        "item": canonicalUrl
      }
    ]
  };

  const strategies = [
    {
      num: "01",
      title: "Master the 50/30/20 Cashflow Blueprint",
      desc: "Allocate 50% of your take-home income to absolute Needs (rent, groceries, utilities, EMIs), 30% to Lifestyle Wants (dining, vacations), and automate a strict minimum 20% into investments on the day your salary credits."
    },
    {
      num: "02",
      title: "Supercharge Compounding with 'Step-Up' SIPs",
      desc: "A standard ₹10,000 monthly SIP @ 12% grows to ₹50 Lakhs in 15 years. Increasing your SIP contribution by just 10% every year as your salary rises almost doubles your corpus to ₹92 Lakhs over the same 15-year period!"
    },
    {
      num: "03",
      title: "Build an Unshakable Insurance Foundation First",
      desc: "Before investing heavily in equities, protect your family with a pure term life insurance policy worth 15x-20x your annual income, plus a ₹10L - ₹25L comprehensive super top-up health insurance cover."
    },
    {
      num: "04",
      title: "Maintain a 6-Month Liquid Emergency Reserve",
      desc: "Keep 6 months of mandatory household expenses and loan EMIs in a combination of high-yield savings accounts and sweep-in bank fixed deposits to avoid liquidating long-term equities during market corrections."
    },
    {
      num: "05",
      title: "Keep High-Interest Consumer Debt at Absolute Zero",
      desc: "Never roll over credit card balances (36%-45% APR) or borrow personal loans for vacations. Pay revolving debts in full to prevent interest compounding against your net worth."
    },
    {
      num: "06",
      title: "Diversify Across Core Asset Classes (Equity, Debt, Gold)",
      desc: "Allocate 60%-70% to broad equity index funds (Nifty 50, Nifty Next 50), 20%-25% to sovereign debt (PPF, EPF, FDs), and 5%-10% to Gold ETFs or Sovereign Gold Bonds as an inflation hedge."
    },
    {
      num: "07",
      title: "Optimize Capital Gains Taxes via Annual Harvesting",
      desc: "Take advantage of the ₹1.25 Lakhs annual LTCG exemption on equity mutual funds and shares by booking and immediately reinvesting profits every financial year."
    },
    {
      num: "08",
      title: "Avoid Premature Real Estate Debt Traps",
      desc: "Committing to an oversized 25-year mortgage in your twenties with 50%+ of your income going to interest restricts geographic career mobility. Rent flexibly until your net worth stabilizes."
    },
    {
      num: "09",
      title: "Invest Heavily in High-ROI Skills & Multiple Income Streams",
      desc: "Your primary earning engine is your human capital. Developing high-income technical or management capabilities and consulting side income boosts savings faster than any financial instrument."
    },
    {
      num: "10",
      title: "Execute a Registered Will & Complete All Nominee Records",
      desc: "Wealth preservation is incomplete without clear estate planning. Ensure all bank accounts, demat folios, mutual funds, and properties have registered first-order nominees."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pt-20 sm:pt-24 pb-16">
      <Helmet>
        <title>{`${articleTitle} | BanksCart`}</title>
        <meta name="description" content={articleDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(blogPostingSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Breadcrumb path={["Home", "Blog", "Wealth Building Strategies"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-emerald-700">
            <span className="bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Financial Independence Blueprint
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">18 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            How to Build Wealth in India: 10 Proven Financial Strategies (2026)
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Financial freedom is not about timing the market; it is about building disciplined, automated habits. Here are 10 actionable, mathematical wealth-building strategies tailored to Indian professionals.
          </p>

          <AuthorByline authorSlug="priya-sharma" />
        </header>

        {/* 10 Strategies Cards */}
        <div className="space-y-6">
          {strategies.map((item) => (
            <section
              key={item.num}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200 font-mono">
                  Principle #{item.num}
                </span>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {item.title}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {item.desc}
              </p>
            </section>
          ))}
        </div>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Personal Finance Engines
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Take Control of Your Financial Future
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Calculate your debt-to-income ratio, compare pre-approved home loan rates, and optimize your fixed deposits with BanksCart.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/cibil-credit-report"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Check Free Credit Score &rarr;
            </Link>
            <Link
              to="/blog/Investment-Plans-Guide"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Investment Plans Guide
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Financial Planning Disclaimer</span>
          </div>
          <p>
            Personal finance strategies mentioned are educational and do not constitute specific investment, tax, or legal advisory. Individuals should consider their risk appetite and consult a SEBI-registered investment advisor or Certified Financial Planner. BanksCart is an independent digital loan and fintech marketplace.
          </p>
        </div>
      </article>
    </div>
  );
}
