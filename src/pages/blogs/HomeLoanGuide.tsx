import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  Home,
  CheckCircle2,
  Percent,
  Clock,
  ShieldCheck,
  Building,
  TrendingUp,
  FileCheck2,
  HelpCircle,
  Scale
} from 'lucide-react';

export default function HomeLoanGuide() {
  const canonicalUrl = "https://www.bankscart.com/blog/Home-Loan-Guide";
  const articleTitle = "Home Loan Interest Rates 2026: Best Banks, Eligibility & EMI Guide";
  const articleDesc = "Complete 2026 guide to home loans in India: compare floating vs fixed interest rates (8.50%+), eligibility criteria, LTV caps, FOIR calculations, and tax benefits under Sec 24(b).";

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
      "name": "Amit Khurana",
      "jobTitle": "Senior Banking Advisor & Principal Reviewer",
      "url": "https://www.bankscart.com/author/amit-khurana"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BanksCart",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.bankscart.com/assets/images/bankscart-logo.png"
      }
    },
    "datePublished": "2026-01-05T09:00:00+05:30",
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
        "name": "Home Loan Guide 2026",
        "item": canonicalUrl
      }
    ]
  };

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
        <Breadcrumb path={["Home", "Blog", "Home Loan Guide 2026"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Mortgage Comprehensive Guide
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">18 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Home Loan Interest Rates 2026: Best Banks, Eligibility & EMI Guide
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Everything Indian homebuyers need to know about navigating the mortgage market: benchmark EBLR spreads, loan-to-value (LTV) limits, income tax deductions up to ₹2 Lakhs under Sec 24(b), and step-by-step documentation.
          </p>

          <AuthorByline authorSlug="amit-khurana" />
        </header>

        {/* Section 1: Floating vs Fixed Rates */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Percent className="w-6 h-6 text-blue-700" />
            1. Floating vs. Fixed Home Loan Rates in 2026
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            In India, over 95% of retail home loans are issued on <strong>floating interest rates</strong> linked directly to the RBI External Benchmark (Repo Rate). When the Reserve Bank of India cuts or hikes the Repo Rate, your home loan interest adjusts automatically at the quarterly reset date.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Floating Rates (Recommended)</h3>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Rates start lower: 8.50% to 9.25% p.a.</li>
                <li>Zero prepayment penalties for individual borrowers (RBI mandate).</li>
                <li>Direct benefit whenever RBI enters an easing monetary cycle.</li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Fixed Rates</h3>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Rates are significantly higher: 10.50% to 12.00% p.a.</li>
                <li>Protected from interest rate spikes during inflationary surges.</li>
                <li>Often carry heavy foreclosure charges upon refinancing.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: RBI Loan-to-Value (LTV) Limits */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Scale className="w-6 h-6 text-blue-700" />
            2. RBI Loan-to-Value (LTV) Caps Explained
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Under Reserve Bank of India prudential guidelines, lenders cannot finance 100% of property cost. LTV dictates the maximum percentage of property agreement value a bank can lend:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="p-3 font-bold">Property Agreement Value</th>
                  <th className="p-3 font-bold">Max Permissible LTV</th>
                  <th className="p-3 font-bold">Mandatory Borrower Down Payment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">Up to ₹30 Lakhs</td>
                  <td className="p-3 tabular-nums font-mono font-bold text-emerald-700">Up to 90%</td>
                  <td className="p-3 tabular-nums font-mono">10% minimum</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">₹30 Lakhs to ₹75 Lakhs</td>
                  <td className="p-3 tabular-nums font-mono font-bold text-emerald-700">Up to 80%</td>
                  <td className="p-3 tabular-nums font-mono">20% minimum</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">Above ₹75 Lakhs</td>
                  <td className="p-3 tabular-nums font-mono font-bold text-emerald-700">Up to 75%</td>
                  <td className="p-3 tabular-nums font-mono">25% minimum</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Tax Benefits */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building className="w-6 h-6 text-blue-700" />
            3. Tax Benefits on Home Loans in India
          </h2>
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Under the Old Tax Regime, homeowners can claim substantial tax deductions against home loan repayments:
            </p>
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2 text-xs sm:text-sm text-emerald-950">
              <p><strong>Section 24(b) - Interest Deduction:</strong> Deduct up to ₹2,00,000 annually on interest paid for a self-occupied residential property.</p>
              <p><strong>Section 80C - Principal Repayment:</strong> Deduct up to ₹1,50,000 annually towards principal repayment, stamp duty, and registration charges.</p>
              <p><strong>Joint Owners:</strong> If property and loan are held jointly with a co-borrowing spouse, each person can claim the full ₹2 Lakhs interest and ₹1.5 Lakhs principal deductions separately!</p>
            </div>
          </div>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Calculate Repayments
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Plan Your Home Loan with Precision
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Use our interactive home loan EMI calculator to view full 30-year amortization schedules and discover how prepayments can save you up to 8 years of tenure.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/home-loan-emi-calculator"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Open EMI Calculator &rarr;
            </Link>
            <Link
              to="/loans/home/overview"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Compare 30+ Home Loan Schemes
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Regulatory Notice & Tax Advisory Disclaimer</span>
          </div>
          <p>
            Tax laws are subject to changes announced in the Union Budget. Borrowers should consult their tax advisor or Chartered Accountant regarding applicability under the Old vs. New Tax Regime. BanksCart operates solely as an independent digital credit marketplace.
          </p>
        </div>
      </article>
    </div>
  );
}
