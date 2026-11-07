import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  Car,
  CheckCircle2,
  Percent,
  Clock,
  ShieldCheck,
  TrendingDown,
  Building,
  HelpCircle,
  FileCheck2,
  Calculator,
  Scale
} from 'lucide-react';

export default function CarLoanInterestRates() {
  const canonicalUrl = "https://www.bankscart.com/blog/Car-Loan-Interest-Rates";
  const articleTitle = "Understanding Car Loan Interest Rates: Fixed vs. Floating & EMI Guide (2026)";
  const articleDesc = "Complete 2026 guide to auto loan interest rates in India: compare fixed vs floating interest rates, advance vs arrears EMIs, processing fees, and calculate exact monthly outgo.";

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
    "datePublished": "2026-01-22T09:00:00+05:30",
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
        "name": "Car Loan Rates Guide",
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
        <Breadcrumb path={["Home", "Blog", "Car Loan Rates Guide"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Auto Financing Architecture
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">12 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Understanding Car Loan Interest Rates: Fixed vs. Floating &amp; EMI Guide (2026)
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Buying a new car? Before visiting the dealership, understand how auto loan interest is computed, the difference between fixed and floating repo-linked rates, and how Advance EMI structures affect total repayment cost.
          </p>

          <AuthorByline authorSlug="amit-khurana" />
        </header>

        {/* Section 1: Fixed vs Floating Car Loans */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Percent className="w-6 h-6 text-blue-700" />
            1. Fixed vs. Floating Interest Rates in Auto Finance
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Unlike home loans which are almost universally floating, Indian car loans are offered under both <strong>Fixed</strong> and <strong>Floating (EBLR)</strong> rate structures:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Fixed Interest Rates (Most Common)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Offered by most private banks (HDFC, ICICI, Axis) and captive auto financers. Your EMI stays strictly unchanged across the entire 3 to 7 year loan tenure, providing budget predictability.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Floating Interest Rates</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Promoted primarily by public sector giants like SBI, Bank of Baroda, and PNB. Linked directly to the RBI Repo Rate, floating loans adjust down whenever the central bank eases interest rates.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: EMI in Advance vs EMI in Arrears */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Scale className="w-6 h-6 text-blue-700" />
            2. Dealer Trick: "EMI in Advance" vs "EMI in Arrears"
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Car dealerships often pitch loans on an <strong>EMI in Advance</strong> basis to make quotes appear artificially cheaper:
          </p>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-xs sm:text-sm text-amber-950 space-y-2 leading-relaxed">
            <p><strong>EMI in Arrears (Standard):</strong> You pay your first EMI exactly 30 days after taking car delivery. The entire loan amount works for you.</p>
            <p><strong>EMI in Advance:</strong> The lender deducts the 1st EMI from your sanctioned loan before releasing funds to the dealer. You effectively receive less capital while paying interest on the full principal, inflating the true APR!</p>
          </div>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Vehicle Finance Tool
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Calculate Your Exact Car Loan EMI
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Use BanksCart's free interactive car loan calculator to estimate monthly payments, view total interest cost, and compare new vs used car loan rates.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/car-loan-calculator"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Open Car Loan Calculator &rarr;
            </Link>
            <Link
              to="/blog/Car-Loan-Rates-2026"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Compare Top Bank Car Rates
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Auto Finance Disclosure</span>
          </div>
          <p>
            Vehicle hypothecation, RTO registration endorsements, and interest rate margins are administered under the Motor Vehicles Act, 1988 and RBI guidelines. BanksCart is an independent digital loan comparison portal.
          </p>
        </div>
      </article>
    </div>
  );
}
