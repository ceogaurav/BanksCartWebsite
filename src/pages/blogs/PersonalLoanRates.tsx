import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  Banknote,
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

export default function PersonalLoanRates() {
  const canonicalUrl = "https://www.bankscart.com/blog/Personal-Loan-Rates";
  const articleTitle = "Latest Personal Loan Interest Rates 2026: Compare Top 20 Banks in India";
  const articleDesc = "Comprehensive comparison of 2026 personal loan interest rates (starting 9.90% p.a.) across SBI, HDFC, ICICI, Axis, Kotak, and Bank of Baroda. Compare processing fees and CIBIL eligibility.";

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
    "datePublished": "2026-01-28T09:00:00+05:30",
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
        "name": "Personal Loan Interest Rates",
        "item": canonicalUrl
      }
    ]
  };

  const bankRates = [
    { bank: "State Bank of India (SBI)", rate: "10.30% - 15.10%", fee: "Nil - 1.50%", minSalary: "₹15,000" },
    { bank: "HDFC Bank", rate: "10.50% - 21.00%", fee: "Up to 2.50% (Min ₹1,999)", minSalary: "₹25,000" },
    { bank: "ICICI Bank", rate: "10.65% - 16.00%", fee: "Up to 2.25%", minSalary: "₹30,000" },
    { bank: "Axis Bank", rate: "10.65% - 22.00%", fee: "1.00% - 2.00%", minSalary: "₹15,000" },
    { bank: "Bank of Baroda", rate: "9.90% - 17.50%", fee: "1.00% - 2.00%", minSalary: "₹20,000" },
    { bank: "Kotak Mahindra Bank", rate: "10.99% - 24.00%", fee: "Up to 3.00%", minSalary: "₹25,000" },
    { bank: "Punjab National Bank (PNB)", rate: "10.40% - 16.90%", fee: "Up to 1.00%", minSalary: "₹15,000" },
    { bank: "IndusInd Bank", rate: "10.49% - 26.00%", fee: "Up to 3.00%", minSalary: "₹25,000" }
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
        <Breadcrumb path={["Home", "Blog", "Personal Loan Interest Rates"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Interest Rates Index
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">14 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Latest Personal Loan Interest Rates 2026: Compare Top 20 Banks in India
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Personal loan interest rates in India typically range from 9.90% to over 24% p.a. depending on your employer category, monthly take-home pay, and CIBIL credit score. Here is the verified benchmark table for 2026.
          </p>

          <AuthorByline authorSlug="raghav-singhal" />
        </header>

        {/* Section 1: Comparison Table */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Banknote className="w-6 h-6 text-blue-700" />
            1. Verified 2026 Personal Loan Rates Across Top Banks
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="p-3 font-bold">Bank / Lender</th>
                  <th className="p-3 font-bold">Interest Rate Range (p.a.)</th>
                  <th className="p-3 font-bold">Processing Fee</th>
                  <th className="p-3 font-bold">Min. Monthly Income</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
                {bankRates.map((b, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{b.bank}</td>
                    <td className="p-3 tabular-nums font-mono font-bold text-emerald-700">{b.rate}</td>
                    <td className="p-3 text-xs">{b.fee}</td>
                    <td className="p-3 tabular-nums font-mono">{b.minSalary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Factors Determining Your Rate */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-700" />
            2. How Banks Decide Your Exact Interest Rate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">CIBIL Score Tiering</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Borrowers with scores of 750 or above qualify for prime rates (10.30% - 12.00%). Scores between 650 and 700 are priced into higher risk tiers (16.00% - 22.00%).
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Employer Category</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Employees of Super Cat-A companies (TCS, Infosys, Reliance, Central Govt, PSUs) receive rate discounts of up to 150 basis points (1.50%) compared to non-listed private enterprises.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Instant Rate Comparison
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Compare Live Pre-Approved Loan Rates
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Check your personalized interest rate across 30+ leading Indian banks with instant eligibility evaluation and zero impact on your CIBIL credit score.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/loans/personal/overview"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Check Personal Loan Offers &rarr;
            </Link>
            <Link
              to="/calculators/loan/personal-loan-emi"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Calculate Monthly EMI
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Regulatory Notice & Banking Disclaimer</span>
          </div>
          <p>
            BanksCart is an independent digital loan marketplace. Interest rates, processing fees, and documentation guidelines are collated from public filings and bank schedules as of November 2026 and are subject to individual borrower credit evaluation and lending institution discretion.
          </p>
        </div>
      </article>
    </div>
  );
}
