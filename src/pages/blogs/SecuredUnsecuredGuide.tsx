import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  Scale,
  CheckCircle2,
  Percent,
  Clock,
  ShieldCheck,
  Building,
  TrendingUp,
  HelpCircle,
  FileCheck2,
  ShieldAlert,
  Coins
} from 'lucide-react';

export default function SecuredUnsecuredGuide() {
  const canonicalUrl = "https://www.bankscart.com/blog/Secured-Unsecured-Guide";
  const articleTitle = "Secured vs. Unsecured Loans: Complete Risk & Rate Guide (2026)";
  const articleDesc = "Detailed 2026 comparison between secured and unsecured loans in India: evaluate interest rate differentials (8.5% vs 11%+), collateral risks, loan limits, and CIBIL impact.";

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
      "name": "Raghav Singhal",
      "jobTitle": "Lead Financial Analyst & Debt Strategist",
      "url": "https://www.bankscart.com/author/raghav-singhal"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BanksCart",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.bankscart.com/assets/images/bankscart-logo.png"
      }
    },
    "datePublished": "2026-01-13T09:00:00+05:30",
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
        "name": "Secured vs Unsecured Loans",
        "item": canonicalUrl
      }
    ]
  };

  const comparisonData = [
    { factor: "Collateral Required", secured: "Yes (Property, Gold, FD, Securities)", unsecured: "None (Zero asset hypothecation)" },
    { factor: "Interest Rate Range", secured: "8.50% - 11.50% p.a.", unsecured: "10.50% - 24.00% p.a." },
    { factor: "Maximum Loan Amount", secured: "Up to ₹10+ Crores (Based on LTV)", unsecured: "Up to ₹40 - ₹50 Lakhs (Income-based)" },
    { factor: "Repayment Tenure", secured: "Up to 15 to 30 Years", unsecured: "1 to 5 Years (Rarely 7 Years)" },
    { factor: "Processing Speed", secured: "5 to 10 Days (Legal & Technical)", unsecured: "Instant to 24 Hours (Paperless)" },
    { factor: "Consequence of Default", secured: "Lender can auction pledged asset", unsecured: "Legal notice, arbitration & ruined CIBIL" }
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
        <Breadcrumb path={["Home", "Blog", "Secured vs Unsecured Loans"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Credit Structuring Guide
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">13 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Secured vs. Unsecured Loans: Complete Risk &amp; Rate Guide (2026)
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Understanding the structural trade-offs between pledging collateral versus borrowing on pure income reputation can save you lakhs in interest charges. Here is how Indian lenders evaluate secured vs unsecured risk.
          </p>

          <AuthorByline authorSlug="raghav-singhal" />
        </header>

        {/* Section 1: Comparison Table */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Scale className="w-6 h-6 text-blue-700" />
            1. Side-by-Side Structural Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="p-3 font-bold">Key Parameter</th>
                  <th className="p-3 font-bold text-emerald-800">Secured Loans</th>
                  <th className="p-3 font-bold text-blue-800">Unsecured Loans</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{row.factor}</td>
                    <td className="p-3 text-xs sm:text-sm text-emerald-900 bg-emerald-50/20">{row.secured}</td>
                    <td className="p-3 text-xs sm:text-sm text-slate-700">{row.unsecured}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: When to Pick Which */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            2. Strategic Decision Framework: Which Should You Choose?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-emerald-200 bg-emerald-50/40 space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-emerald-950 text-base">Choose a Secured Loan When:</h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                <li>You need large capital (₹20 Lakhs to ₹10 Crores) for housing, commercial capex, or education.</li>
                <li>You want the lowest possible interest rate (8.50% - 10.00% p.a.).</li>
                <li>You want comfortable multi-decade tenures (15 to 30 years) to minimize monthly EMI impact.</li>
                <li>Your CIBIL score is average (650-720); pledging collateral mitigates lender risk.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl border border-blue-200 bg-blue-50/40 space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-blue-950 text-base">Choose an Unsecured Loan When:</h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 list-disc list-inside">
                <li>You need emergency liquidity within 24 hours (medical, wedding, urgent travel).</li>
                <li>You do not own real estate or prefer not to risk personal assets.</li>
                <li>The borrowing ticket size is relatively small (₹50,000 to ₹10 Lakhs).</li>
                <li>You have a strong CIBIL score (&ge; 750) unlocking prime unsecured rates.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Compare Across Lenders
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Find the Optimal Financing Structure
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Compare both secured mortgage options and unsecured personal loans across 30+ top Indian banks with personalized pre-approval checks.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/loans/personal/overview"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Compare Personal Loans &rarr;
            </Link>
            <Link
              to="/loans/home/overview"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Explore Secured Home Loans
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Lending Risk Notice</span>
          </div>
          <p>
            Secured loans involve asset encumbrance under the SARFAESI Act, 2002. In the event of persistent default, the lender possesses legal rights to repossess and liquidate hypothecated security. BanksCart provides unbiased comparative credit analytics.
          </p>
        </div>
      </article>
    </div>
  );
}
