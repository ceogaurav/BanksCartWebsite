import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  Bike,
  CheckCircle2,
  Percent,
  Clock,
  ShieldCheck,
  Building,
  TrendingUp,
  HelpCircle,
  FileCheck2,
  Zap,
  Scale
} from 'lucide-react';

export default function BikeLoanEligibility() {
  const canonicalUrl = "https://www.bankscart.com/blog/Bike-Loan-Eligibility";
  const articleTitle = "Two-Wheeler & Bike Loan Eligibility: 2026 Instant Approval Guide";
  const articleDesc = "Complete 2026 guide to two-wheeler and superbike financing in India: minimum income criteria (₹12,000/mo), interest rates (starting 9.50%), EV subsidies, and 100% on-road funding.";

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
    "datePublished": "2026-01-27T09:00:00+05:30",
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
        "name": "Bike Loan Eligibility",
        "item": canonicalUrl
      }
    ]
  };

  const lenderTable = [
    { lender: "State Bank of India (Two-Wheeler Loan)", rate: "11.25% - 13.50%", fee: "1.00% (Min ₹1,000)", maxTenure: "5 Years", ltv: "Up to 85% of On-Road" },
    { lender: "HDFC Bank Two-Wheeler Finance", rate: "10.50% - 16.00%", fee: "Up to 2.50%", maxTenure: "4 Years", ltv: "Up to 100% for pre-approved" },
    { lender: "Bajaj Auto Finance", rate: "11.00% - 18.00%", fee: "1.50% - 3.00%", maxTenure: "4 Years", ltv: "Up to 95% on select models" },
    { lender: "TVS Credit Services", rate: "11.50% - 19.00%", fee: "2.00% - 3.50%", maxTenure: "3 Years", ltv: "Up to 90% of On-Road" },
    { lender: "Hero FinCorp", rate: "11.00% - 18.50%", fee: "2.00% - 3.00%", maxTenure: "3 Years", ltv: "Up to 95% of Ex-Showroom" }
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
        <Breadcrumb path={["Home", "Blog", "Bike Loan Eligibility"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Two-Wheeler Financing
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">11 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Two-Wheeler &amp; Bike Loan Eligibility: 2026 Instant Approval Guide
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Looking to purchase a commuter motorcycle, premium superbike, or high-tech electric scooter? Here is your complete guide to minimum salary rules, CIBIL thresholds, interest rates, and 100% on-road financing schemes.
          </p>

          <AuthorByline authorSlug="amit-khurana" />
        </header>

        {/* Section 1: Top Lenders Table */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Bike className="w-6 h-6 text-blue-700" />
            1. Verified 2026 Two-Wheeler Loan Rates Across Top Lenders
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="p-3 font-bold">Lender / NBFC</th>
                  <th className="p-3 font-bold">Interest Rate Range</th>
                  <th className="p-3 font-bold">Processing Fee</th>
                  <th className="p-3 font-bold">Max Tenure</th>
                  <th className="p-3 font-bold">LTV Limit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
                {lenderTable.map((l, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{l.lender}</td>
                    <td className="p-3 tabular-nums font-mono font-bold text-emerald-700">{l.rate}</td>
                    <td className="p-3 text-xs">{l.fee}</td>
                    <td className="p-3">{l.maxTenure}</td>
                    <td className="p-3 text-xs text-slate-600">{l.ltv}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Eligibility Criteria */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            2. Standard Eligibility Checklist
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Salaried Applicants</h3>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Min. Net Salary: ₹12,000/month (₹15,000 in metro cities).</li>
                <li>Age: 21 to 60 years.</li>
                <li>CIBIL Score: 650+ for instant sanction.</li>
                <li>Documents: 3 months salary slips, 6 months bank statement, PAN &amp; Aadhaar.</li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Self-Employed / Gig Workers</h3>
              <ul className="text-xs sm:text-sm text-slate-600 space-y-1.5 list-disc list-inside">
                <li>Min. Annual Income: ₹1.50 Lakhs reported in ITR.</li>
                <li>Business Stability: Minimum 1 year in same trade.</li>
                <li>Alternate Underwriting: UPI turnover statements accepted by specialized fintech lenders.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: EV Scooters */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Zap className="w-6 h-6 text-emerald-600" />
            3. Electric Two-Wheeler Financing &amp; Green Discounts
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            With the launch of the PM E-Drive scheme, commercial lenders offer targeted green vehicle loans for models like Ola S1, Ather 450X, TVS iQube, and Bajaj Chetak. Borrowers benefit from interest rate discounts up to <strong>0.50% p.a.</strong> and low zero-down-payment processing packages.
          </p>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Vehicle Finance Tool
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Estimate Your Monthly Two-Wheeler EMI
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Calculate exact monthly payments for your motorcycle or scooter and check pre-approved vehicle loans across 25+ lenders.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/car-loan-calculator"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Open EMI Calculator &rarr;
            </Link>
            <Link
              to="/blog/Car-Loan-Rates-2026"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Four-Wheeler Car Loan Rates
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Vehicle Hypothecation Notice</span>
          </div>
          <p>
            Two-wheeler loans are secured via hypothecation endorsement on the vehicle Registration Certificate (RC) issued by the regional RTO. BanksCart provides comparative analytics and does not lend directly.
          </p>
        </div>
      </article>
    </div>
  );
}
