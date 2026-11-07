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
  Coins,
  Scale,
  Sparkles
} from 'lucide-react';

interface InvestmentPlansGuideProps {
  openApplyModal?: () => void;
}

export default function InvestmentPlansGuide({ openApplyModal }: InvestmentPlansGuideProps) {
  const canonicalUrl = "https://www.bankscart.com/blog/Investment-Plans-Guide";
  const articleTitle = "Essential Investment Plans Guide: Mutual Funds, NPS, PPF & Stocks (2026)";
  const articleDesc = "The definitive 2026 guide to investing in India: compare Mutual Fund SIPs, National Pension System (NPS), Public Provident Fund (PPF), and sovereign gold bonds.";

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
    "datePublished": "2026-01-24T09:00:00+05:30",
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
        "name": "Investment Plans Guide",
        "item": canonicalUrl
      }
    ]
  };

  const investmentTable = [
    { instrument: "Equity Mutual Funds (SIP)", returns: "12% - 15% (Historical)", risk: "Moderate to High", taxStatus: "12.5% LTCG above ₹1.25L", bestFor: "Long-term wealth creation (7+ years)" },
    { instrument: "National Pension System (NPS)", returns: "9% - 12% (Blended)", risk: "Low to Moderate", taxStatus: "Extra ₹50,000 deduction (80CCD 1B)", bestFor: "Retirement corpus & pension annuities" },
    { instrument: "Public Provident Fund (PPF)", returns: "7.10% (Guaranteed)", risk: "Zero (Sovereign)", taxStatus: "100% Tax-Free (EEE)", bestFor: "Risk-averse long-term compounding (15 yrs)" },
    { instrument: "Bank Fixed Deposits", returns: "7.00% - 9.00%", risk: "Zero (DICGC up to ₹5L)", taxStatus: "Taxed at Slab Rate", bestFor: "Short to medium term liquidity (1-3 yrs)" },
    { instrument: "Sovereign Gold Bonds / Gold ETF", returns: "Historical Gold CAGR", risk: "Low (Market-linked)", taxStatus: "Capital gains indexation", bestFor: "Inflation hedge & portfolio diversification" }
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
        <Breadcrumb path={["Home", "Blog", "Investment Plans Guide"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Wealth &amp; Portfolio Planning
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">16 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Essential Investment Plans Guide: Mutual Funds, NPS, PPF &amp; Stocks (2026)
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Building multi-generational wealth requires a disciplined asset allocation framework. Here is an analytical comparison of India's leading investment avenues, tax efficiency under Union Budget rules, and portfolio rebalancing strategies.
          </p>

          <AuthorByline authorSlug="priya-sharma" />
        </header>

        {/* Section 1: Comparison Table */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Scale className="w-6 h-6 text-blue-700" />
            1. Core Investment Instruments Compared (2026)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="p-3 font-bold">Investment Option</th>
                  <th className="p-3 font-bold">Expected Returns</th>
                  <th className="p-3 font-bold">Risk Profile</th>
                  <th className="p-3 font-bold">Taxation Impact</th>
                  <th className="p-3 font-bold">Optimal Investment Horizon</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
                {investmentTable.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{item.instrument}</td>
                    <td className="p-3 tabular-nums font-mono font-bold text-emerald-700">{item.returns}</td>
                    <td className="p-3 text-xs">{item.risk}</td>
                    <td className="p-3 text-xs text-blue-900 font-medium">{item.taxStatus}</td>
                    <td className="p-3 text-xs text-slate-600">{item.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Core Asset Allocation */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-emerald-600" />
            2. The 3-Bucket Asset Allocation Strategy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">1. Emergency Bucket (10%)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                6 months of living expenses held in high-yield bank savings accounts and liquid fixed deposits for immediate access.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">2. Debt &amp; Safety (30%)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                PPF, EPF, and sovereign debt schemes providing guaranteed compound interest and insulation against market crashes.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">3. Growth Bucket (60%)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Diversified Nifty 50 Index funds, Flexicap funds, and NPS equity active choice to beat inflation by 5% to 7% annually.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Retirement &amp; Wealth
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Plan Your Long-Term Financial Freedom
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Calculate your future compounding returns with BanksCart's free financial tools and explore tax-saving investment strategies.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/blog/Tax-Saving-Guide"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Tax Saving Guide 2026 &rarr;
            </Link>
            <Link
              to="/blog/Wealth-Building-Strategies"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              10 Wealth Building Principles
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>SEBI / PFRDA Advisory Disclaimer</span>
          </div>
          <p>
            Mutual fund investments are subject to market risks; read all scheme-related documents carefully before investing. Historical yields are indicative and not guaranteed. BanksCart is an independent digital financial technology platform and does not offer portfolio management services.
          </p>
        </div>
      </article>
    </div>
  );
}
