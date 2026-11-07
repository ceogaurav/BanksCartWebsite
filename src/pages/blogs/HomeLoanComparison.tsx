import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  Scale,
  Building,
  CheckCircle2,
  Percent,
  Clock,
  ShieldCheck,
  TrendingDown,
  ArrowRight,
  HelpCircle,
  FileCheck2
} from 'lucide-react';

export default function HomeLoanComparison() {
  const canonicalUrl = "https://www.bankscart.com/blog/Home-Loan-Comparison";
  const articleTitle = "Home Loan Comparison 2026: SBI vs HDFC vs ICICI vs Axis Bank";
  const articleDesc = "Complete 2026 comparison of home loan interest rates, processing fees, loan-to-value ratios, and special concessions across India's top four mortgage lenders.";

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
    "datePublished": "2026-01-18T09:00:00+05:30",
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
        "name": "Home Loan Comparison",
        "item": canonicalUrl
      }
    ]
  };

  const bankComparison = [
    {
      bank: "State Bank of India (SBI)",
      rate: "8.50% - 9.25%",
      processingFee: "0.17% (Min ₹2,000, Max ₹10,000 + GST)",
      maxTenure: "30 Years",
      highlight: "Lowest benchmark spread for borrowers with CIBIL > 750; zero prepayment penalty on floating rate loans.",
      tag: "Best for Low Total Interest"
    },
    {
      bank: "HDFC Bank",
      rate: "8.70% - 9.40%",
      processingFee: "Up to 0.50% of loan amount (Min ₹3,000 + GST)",
      maxTenure: "30 Years",
      highlight: "Rapid digital pre-approval, doorstep service, and extensive pan-India builder tie-ups.",
      tag: "Best for Processing Speed"
    },
    {
      bank: "ICICI Bank",
      rate: "8.75% - 9.50%",
      processingFee: "0.50% - 1.00% (Min ₹3,000 + GST)",
      maxTenure: "30 Years",
      highlight: "Pre-approved sanctions for existing salary account holders; instant online sanction letter.",
      tag: "Best for Existing Salary Customers"
    },
    {
      bank: "Axis Bank",
      rate: "8.75% - 9.45%",
      processingFee: "Up to 1.00% (Min ₹10,000 + GST)",
      maxTenure: "30 Years",
      highlight: "Special Shubh Aarambh product with 12 EMI waivers upon consistent, on-time repayments.",
      tag: "Best for Long-Term Rewards"
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
        <Breadcrumb path={["Home", "Blog", "Home Loan Comparison"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Lender Comparison
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">11 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Home Loan Comparison 2026: SBI vs HDFC vs ICICI vs Axis Bank
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Choosing the right home loan lender can save you lakhs of rupees in interest and processing charges over a 20 to 30 year tenure. Here is an unbiased, side-by-side analysis of India's four largest mortgage providers.
          </p>

          <AuthorByline authorSlug="amit-khurana" />
        </header>

        {/* Master Comparison Table */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Scale className="w-6 h-6 text-blue-700" />
            1. 2026 Rate & Fee Matrix Across Top 4 Lenders
          </h2>
          <p className="text-sm text-slate-600">
            Interest rates shown are linked to RBI External Benchmark Lending Rates (EBLR/Repo Rate) for salaried borrowers with CIBIL score &ge; 750:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="p-3 font-bold">Lender</th>
                  <th className="p-3 font-bold">Interest Rate</th>
                  <th className="p-3 font-bold">Processing Fee</th>
                  <th className="p-3 font-bold">Max Tenure</th>
                  <th className="p-3 font-bold">Category Verdict</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
                {bankComparison.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{item.bank}</td>
                    <td className="p-3 tabular-nums font-mono font-bold text-emerald-700">{item.rate}</td>
                    <td className="p-3 text-xs">{item.processingFee}</td>
                    <td className="p-3">{item.maxTenure}</td>
                    <td className="p-3">
                      <span className="text-xs font-semibold bg-blue-50 text-blue-800 px-2.5 py-1 rounded-full border border-blue-200">
                        {item.tag}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Individual Breakdown Cards */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            2. Detailed Bank-by-Bank Analysis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bankComparison.map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-lg">{item.bank}</h3>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    {item.rate}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.highlight}
                </p>
                <div className="pt-2 text-xs text-slate-500 font-mono">
                  Processing Fee: {item.processingFee}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Crucial Factors to Compare */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            3. Four Things to Verify Before Signing
          </h2>
          <ul className="space-y-3 text-sm text-slate-700 list-disc list-inside leading-relaxed">
            <li><strong>Spread vs Benchmark:</strong> Understand that while the Repo Rate is set by RBI, each bank adds a credit spread. SBI historically offers the tightest spread for 750+ CIBIL scores.</li>
            <li><strong>Reset Frequency:</strong> Repo rate adjustments must be passed on to borrowers every quarter (3 months). Check whether your bank resets on the 1st of each month following an RBI policy update.</li>
            <li><strong>Prepayment Rules:</strong> Ensure 100% zero prepayment and foreclosure charges for individual floating-rate home loans, guaranteed under RBI circulars.</li>
            <li><strong>Legal & Valuation Fee Transparency:</strong> Verify whether upfront administrative valuation fees are capped or deducted automatically from your first tranche disbursement.</li>
          </ul>
        </section>

        {/* Financial Conversion Callout */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Compare & Save Lakhs
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Find the Best Mortgage Rate for Your Profile
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Compare actual quotes from SBI, HDFC, ICICI, Axis and 25+ other lenders. Check eligibility and calculate monthly savings in under 2 minutes.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/home-loan-compare"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Compare Home Loans Now &rarr;
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
            <span>Regulatory Notice & Banking Disclaimer</span>
          </div>
          <p>
            BanksCart is an independent digital loan comparison portal. Interest rates and processing fees mentioned are sourced from official bank schedules and regulatory filings as of November 2026 and are subject to change based on applicant CIBIL score, loan quantum, and property location.
          </p>
        </div>
      </article>
    </div>
  );
}
