import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  PiggyBank,
  CheckCircle2,
  Percent,
  Clock,
  ShieldCheck,
  Building,
  TrendingUp,
  HelpCircle,
  FileCheck2,
  Calendar,
  Scale
} from 'lucide-react';

export default function FixedDepositGuide() {
  const canonicalUrl = "https://www.bankscart.com/blog/Fixed-Deposit-Guide";
  const articleTitle = "Fixed Deposit Interest Rates 2026: Best FD Plans in India Compared";
  const articleDesc = "Complete 2026 guide to fixed deposits in India: compare FD rates up to 9.00% across top public banks, private lenders, Small Finance Banks, and AAA-rated corporate NBFCs.";

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
      "name": "Neha Verma",
      "jobTitle": "Senior Personal Finance Specialist",
      "url": "https://www.bankscart.com/author/neha-verma"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BanksCart",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.bankscart.com/assets/images/bankscart-logo.png"
      }
    },
    "datePublished": "2026-01-15T09:00:00+05:30",
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
        "name": "Fixed Deposit Guide 2026",
        "item": canonicalUrl
      }
    ]
  };

  const fdComparison = [
    { bank: "Unity Small Finance Bank", generalRate: "9.00%", seniorRate: "9.50%", tenure: "1001 Days", category: "SFB (DICGC Insured)" },
    { bank: "Suryoday Small Finance Bank", generalRate: "8.65%", seniorRate: "9.15%", tenure: "2 Years 2 Months", category: "SFB (DICGC Insured)" },
    { bank: "Equitas Small Finance Bank", generalRate: "8.50%", seniorRate: "9.00%", tenure: "444 Days", category: "SFB (DICGC Insured)" },
    { bank: "Bajaj Finance Limited", generalRate: "8.60%", seniorRate: "8.85%", tenure: "42 Months", category: "AAA Corporate NBFC" },
    { bank: "State Bank of India (SBI Amrit Vrishti)", generalRate: "7.25%", seniorRate: "7.75%", tenure: "444 Days", category: "Public Sector Giant" },
    { bank: "HDFC Bank", generalRate: "7.25%", seniorRate: "7.75%", tenure: "35 Months", category: "Private Sector Bank" }
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
        <Breadcrumb path={["Home", "Blog", "Fixed Deposit Guide 2026"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Fixed Income Master Guide
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">14 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Fixed Deposit Interest Rates 2026: Best FD Plans in India Compared
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Looking for guaranteed, risk-free returns? Here is an authoritative comparison of fixed deposit interest rates across public banks, top private lenders, Small Finance Banks (yielding up to 9.00%), and DICGC safety insurance rules.
          </p>

          <AuthorByline authorSlug="neha-verma" />
        </header>

        {/* Section 1: Comparison Table */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <PiggyBank className="w-6 h-6 text-blue-700" />
            1. Highest Fixed Deposit Rates in India (2026)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="p-3 font-bold">Bank / Institution</th>
                  <th className="p-3 font-bold">General Public Rate</th>
                  <th className="p-3 font-bold">Senior Citizen Rate</th>
                  <th className="p-3 font-bold">Tenure Bucket</th>
                  <th className="p-3 font-bold">Security Classification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
                {fdComparison.map((f, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{f.bank}</td>
                    <td className="p-3 tabular-nums font-mono font-bold text-emerald-700">{f.generalRate}</td>
                    <td className="p-3 tabular-nums font-mono font-bold text-blue-800">{f.seniorRate}</td>
                    <td className="p-3 text-xs">{f.tenure}</td>
                    <td className="p-3 text-xs text-slate-600">{f.category}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: DICGC Guarantee */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            2. The DICGC ₹5,00,000 Safety Shield
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Every scheduled commercial bank and small finance bank licensed by the Reserve Bank of India is legally insured by the <strong>Deposit Insurance and Credit Guarantee Corporation (DICGC)</strong>.
          </p>
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-emerald-950 leading-relaxed">
            <strong>Key Protection:</strong> In the rare event of bank resolution or liquidation, principal and accrued interest up to <strong>₹5,00,000 per depositor per bank</strong> is guaranteed and repaid by the RBI subsidiary within 90 days.
          </div>
        </section>

        {/* Section 3: Tax Rules */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-blue-700" />
            3. Taxation on Fixed Deposit Returns
          </h2>
          <div className="space-y-2 text-sm text-slate-700 leading-relaxed">
            <p>
              Interest earned on fixed deposits is added to your total annual taxable income under "Income from Other Sources" and taxed at your applicable slab rate.
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-600">
              <li><strong>TDS Threshold:</strong> Banks deduct 10% TDS if total annual interest exceeds ₹40,000 (₹50,000 for senior citizens).</li>
              <li><strong>Form 15G / 15H:</strong> If your total taxable income is below the taxable threshold, submit Form 15G (below 60 yrs) or Form 15H (senior citizens) to prevent TDS deduction.</li>
              <li><strong>Section 80C Tax-Saver FDs:</strong> 5-year lock-in fixed deposits qualify for tax deduction up to ₹1.50 Lakhs under the Old Tax Regime.</li>
            </ul>
          </div>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Wealth &amp; Savings
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Plan Your Fixed-Income Portfolio
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Compare fixed deposit rates, calculate post-tax maturity returns, and explore tax-efficient mutual fund SIPs on BanksCart.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/blog/Investment-Plans-Guide"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Explore Investment Plans &rarr;
            </Link>
            <Link
              to="/blog/Tax-Saving-Guide"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Tax Saving Guide 2026
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Deposit Advisory Notice</span>
          </div>
          <p>
            Fixed deposit interest rates are subject to revision by individual banking institutions. Depositors should verify credit ratings (CRISIL, ICRA) for corporate NBFC deposits. BanksCart is an independent digital financial marketplace.
          </p>
        </div>
      </article>
    </div>
  );
}
