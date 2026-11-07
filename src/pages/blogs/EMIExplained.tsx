import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  Calculator,
  CheckCircle2,
  Percent,
  Clock,
  ShieldCheck,
  TrendingDown,
  Building,
  HelpCircle,
  FileCheck2,
  TrendingUp,
  Scale
} from 'lucide-react';

export default function EMIExplained() {
  const canonicalUrl = "https://www.bankscart.com/blog/EMI-Explained";
  const articleTitle = "What is EMI? Mathematical Calculations, Amortization & Impact (2026)";
  const articleDesc = "Master EMI fundamentals: understand the exact mathematical formula, how loan amortization shifts from interest-heavy to principal-heavy, and the reducing balance advantage.";

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
    "datePublished": "2026-01-14T09:00:00+05:30",
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
        "name": "What is EMI?",
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
        <Breadcrumb path={["Home", "Blog", "What is EMI?"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Financial Engineering
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">11 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            What is EMI? Mathematical Calculations, Amortization &amp; Impact (2026)
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Equated Monthly Installment (EMI) powers virtually every loan in modern India. Understand the algebraic formula behind your repayment schedule, why early payments are interest-heavy, and how reducing balance interest works.
          </p>

          <AuthorByline authorSlug="raghav-singhal" />
        </header>

        {/* Section 1: The Mathematical Formula */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Calculator className="w-6 h-6 text-blue-700" />
            1. The Mathematical Formula Behind EMI
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Banks calculate your fixed monthly payment using the universal compound interest amortization formula:
          </p>
          <div className="p-4 sm:p-6 bg-slate-900 text-white rounded-2xl font-mono text-center text-sm sm:text-base tracking-wider overflow-x-auto">
            EMI = [P × r × (1 + r)ⁿ] ÷ [(1 + r)ⁿ - 1]
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm text-slate-700 pt-2 font-mono">
            <div className="p-3 bg-slate-100 rounded-xl">
              <strong>P</strong> = Principal Loan Amount
            </div>
            <div className="p-3 bg-slate-100 rounded-xl">
              <strong>r</strong> = Monthly Interest Rate (Annual Rate ÷ 12 ÷ 100)
            </div>
            <div className="p-3 bg-slate-100 rounded-xl">
              <strong>n</strong> = Total Tenor in Months (Years × 12)
            </div>
          </div>
        </section>

        {/* Section 2: Amortization Secret */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <TrendingDown className="w-6 h-6 text-blue-700" />
            2. The Amortization Tilt: Why You Pay Interest First
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Although your EMI remains identical every month, the internal split between <strong>Principal</strong> and <strong>Interest</strong> shifts continuously:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-2">
              <h3 className="font-bold text-amber-950 text-base">First Half of Tenure (Years 1 to 10)</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Because outstanding principal is at its peak, over <strong>65% to 75%</strong> of every monthly EMI goes directly toward paying bank interest, and only 25% reduces loan principal.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
              <h3 className="font-bold text-emerald-950 text-base">Second Half of Tenure (Years 11 to 20)</h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                As the principal is whittled down, interest charges plummet. Now over <strong>75% to 85%</strong> of each EMI goes straight toward wiping out the remaining principal.
              </p>
            </div>
          </div>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs sm:text-sm text-blue-900 leading-relaxed">
            <strong>Strategic Takeaway:</strong> Making principal prepayments during the first 3 to 5 years delivers the highest return on investment, as it bypasses the most interest-heavy portion of the loan.
          </div>
        </section>

        {/* Section 3: Flat vs Reducing Balance */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Scale className="w-6 h-6 text-blue-700" />
            3. Flat Interest vs. Reducing Balance Interest
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="p-3 font-bold">Calculation Method</th>
                  <th className="p-3 font-bold">Interest Charged On</th>
                  <th className="p-3 font-bold">Effective APR</th>
                  <th className="p-3 font-bold">Lender Use</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">Reducing Balance</td>
                  <td className="p-3 text-xs">Only on remaining unpaid principal</td>
                  <td className="p-3 tabular-nums font-mono text-emerald-700 font-bold">True Nominal Rate (e.g. 10.5%)</td>
                  <td className="p-3 text-xs">All Banks (Home, Personal, Auto)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">Flat Rate</td>
                  <td className="p-3 text-xs">Entire initial loan amount for full tenure</td>
                  <td className="p-3 tabular-nums font-mono text-rose-700 font-bold">Almost 1.8x - 2.0x Higher</td>
                  <td className="p-3 text-xs">Deceptive DSA / informal dealers</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Interactive Financial Engine
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Calculate Your Exact Loan EMI in Seconds
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Use BanksCart's free interactive EMI calculator with full visual amortization schedules, principal-interest breakdowns, and prepayment simulators.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/calculators/loan/personal-loan-emi"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Open EMI Calculator &rarr;
            </Link>
            <Link
              to="/home-loan-emi-calculator"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Home Loan EMI Calculator
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Mathematical Disclosure & RBI Standards</span>
          </div>
          <p>
            All EMI formulas and calculations implemented on BanksCart follow standardized compound interest formulas mandated by the Reserve Bank of India and Indian Banks' Association (IBA).
          </p>
        </div>
      </article>
    </div>
  );
}
