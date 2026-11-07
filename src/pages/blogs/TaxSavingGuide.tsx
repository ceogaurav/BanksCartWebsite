import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  FileText,
  CheckCircle2,
  Percent,
  Clock,
  ShieldCheck,
  Building,
  TrendingUp,
  HelpCircle,
  FileCheck2,
  Scale,
  DollarSign
} from 'lucide-react';

export default function TaxSavingGuide() {
  const canonicalUrl = "https://www.bankscart.com/blog/Tax-Saving-Guide";
  const articleTitle = "Best Ways to Save Tax in India: Old vs. New Regime Analysis (2026)";
  const articleDesc = "Complete FY 2025-26 / AY 2026-27 tax planning guide: Old vs New Tax Regime slabs, Section 80C, 80D health insurance, NPS 80CCD(1B), and home loan interest 24(b).";

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
    "datePublished": "2026-01-16T09:00:00+05:30",
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
        "name": "Tax Saving Guide",
        "item": canonicalUrl
      }
    ]
  };

  const taxSlabs = [
    { incomeRange: "Up to ₹3,00,000", newRegime: "0% (Nil)", oldRegime: "0% (Nil)" },
    { incomeRange: "₹3,00,001 to ₹6,00,000", newRegime: "5% (Rebate u/s 87A)", oldRegime: "5% (Above ₹2.5L)" },
    { incomeRange: "₹6,00,001 to ₹7,00,000", newRegime: "5% (Effectively 0% with 87A rebate)", oldRegime: "20%" },
    { incomeRange: "₹7,00,001 to ₹9,00,000", newRegime: "10%", oldRegime: "20%" },
    { incomeRange: "₹9,00,001 to ₹12,00,000", newRegime: "15%", oldRegime: "20%" },
    { incomeRange: "₹12,00,001 to ₹15,00,000", newRegime: "20%", oldRegime: "30%" },
    { incomeRange: "Above ₹15,00,000", newRegime: "30%", oldRegime: "30%" }
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
        <Breadcrumb path={["Home", "Blog", "Tax Saving Guide"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Tax Strategy Masterclass
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">16 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Best Ways to Save Tax in India: Old vs. New Regime Analysis (2026)
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Which income tax regime saves you more money? We break down the mathematical breakeven between the simplified New Tax Regime and deduction-packed Old Tax Regime, detailing Section 80C, 80D, NPS, and home loan interest strategies.
          </p>

          <AuthorByline authorSlug="raghav-singhal" />
        </header>

        {/* Section 1: Slab Comparison */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Scale className="w-6 h-6 text-blue-700" />
            1. Income Tax Slab Comparison (FY 2025-26 / AY 2026-27)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="p-3 font-bold">Annual Taxable Income Slab</th>
                  <th className="p-3 font-bold text-emerald-800">New Tax Regime (Default)</th>
                  <th className="p-3 font-bold text-blue-800">Old Tax Regime (Optional)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
                {taxSlabs.map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{s.incomeRange}</td>
                    <td className="p-3 tabular-nums font-mono font-bold text-emerald-700 bg-emerald-50/20">{s.newRegime}</td>
                    <td className="p-3 tabular-nums font-mono text-slate-700">{s.oldRegime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: When Does Old Regime Win? */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-700" />
            2. The Mathematical Breakeven: When Does the Old Regime Win?
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            The New Regime offers lower tax rates and a standard deduction of <strong>₹75,000</strong> for salaried employees, but disallows almost all deductions.
          </p>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs sm:text-sm text-blue-950 space-y-2 leading-relaxed">
            <p><strong>The Golden Breakeven Threshold:</strong> For salaries between ₹10 Lakhs and ₹20 Lakhs, the <strong>Old Tax Regime becomes more beneficial ONLY IF your total deductions exceed ₹3,75,000 to ₹4,25,000 per year</strong>.</p>
            <p>You can easily cross this threshold if you combine: Standard Deduction (₹50k) + Sec 80C (₹1.5L) + Sec 24b Home Loan Interest (₹2L) + Sec 80CCD NPS (₹50k) + Sec 80D Health Insurance (₹25k) = <strong>₹4,75,000 in deductions</strong>!</p>
          </div>
        </section>

        {/* Section 3: Core Deductions Summary */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-emerald-600" />
            3. Master List of Top Tax-Saving Deductions (Old Regime)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Section 80C (Up to ₹1,50,000)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Covers Employee Provident Fund (EPF), Public Provident Fund (PPF), ELSS Mutual Funds, Sukanya Samriddhi Yojana (SSY), Life Insurance premiums, and Home Loan Principal repayment.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Section 80CCD(1B) - NPS (₹50,000)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Exclusive additional deduction over and above the ₹1.5L 80C limit for voluntary contributions to Tier-1 National Pension System accounts.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Section 80D - Medical Insurance (Up to ₹75,000)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Deduct up to ₹25,000 for self/family health cover + an additional ₹50,000 for senior citizen parents' medical insurance policies.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Section 24(b) - Home Loan Interest (₹2,00,000)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Direct deduction of up to ₹2 Lakhs per financial year on home loan interest paid for a self-occupied property.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Tax Optimization Tools
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Optimize Your Tax Liability Before March 31
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Compare tax-deductible home loans, health insurance policies, and ELSS investment plans with BanksCart's free financial engines.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/loans/home/overview"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Check Tax-Saver Home Loans &rarr;
            </Link>
            <Link
              to="/insurance/health"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Compare 80D Health Insurance
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Taxation Advisory Notice</span>
          </div>
          <p>
            Tax laws are governed by the Income Tax Act, 1961, and are subject to amendments introduced in the Union Budget. Individual taxpayers should evaluate employer declaration windows and consult a qualified Chartered Accountant before choosing between the Old and New Tax Regimes.
          </p>
        </div>
      </article>
    </div>
  );
}
