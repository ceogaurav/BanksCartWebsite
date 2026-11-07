import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  Briefcase,
  CheckCircle2,
  Percent,
  Clock,
  ShieldCheck,
  Building,
  TrendingUp,
  HelpCircle,
  FileCheck2,
  Scale,
  Coins
} from 'lucide-react';

export default function BusinessLoanGuide() {
  const canonicalUrl = "https://www.bankscart.com/blog/Business-Loan-Guide";
  const articleTitle = "The Ultimate 2026 Guide to Business Loan Options for Small Businesses in India";
  const articleDesc = "Comprehensive 2026 guide to Indian business loans: compare working capital (CC/OD), machinery term loans, CGTMSE collateral-free limits up to ₹5 Cr, and Mudra loans up to ₹20 Lakhs.";

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
    "datePublished": "2026-01-11T09:00:00+05:30",
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
        "name": "Business Loan Guide 2026",
        "item": canonicalUrl
      }
    ]
  };

  const facilityTypes = [
    {
      type: "Cash Credit (CC) / Overdraft (OD)",
      tenure: "1 Year (Renewable)",
      rate: "9.50% - 14.00%",
      bestFor: "Day-to-day working capital, inventory purchases & vendor payments. Interest is charged only on utilized balance."
    },
    {
      type: "Machinery & Equipment Term Loan",
      tenure: "3 to 7 Years",
      rate: "10.00% - 15.00%",
      bestFor: "Capex, purchasing factory machinery or specialized equipment. The asset itself serves as primary hypothecated collateral."
    },
    {
      type: "CGTMSE Collateral-Free Term Loan",
      tenure: "Up to 5 Years",
      rate: "10.50% - 16.00%",
      bestFor: "Micro and small enterprises needing up to ₹5 Crores without pledging commercial or residential property."
    },
    {
      type: "Pradhan Mantri Mudra Yojana (PMMY)",
      tenure: "Up to 5 Years",
      rate: "8.50% - 12.00%",
      bestFor: "Micro-enterprises, small traders, and retailers requiring micro-finance across Shishu, Kishore, and Tarun categories up to ₹20 Lakhs."
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
        <Breadcrumb path={["Home", "Blog", "Business Loan Guide 2026"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              SME Commercial Finance Guide
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">18 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            The Ultimate 2026 Guide to Business Loan Options for Small Businesses in India
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Securing business credit is the catalyst for scaling your enterprise. From working capital lines and machinery finance to sovereign credit guarantee schemes like CGTMSE and Mudra, here is everything Indian business owners must know.
          </p>

          <AuthorByline authorSlug="amit-khurana" />
        </header>

        {/* Section 1: Types of Business Credit */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-blue-700" />
            1. Core Business Credit Facilities Explained
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="p-3 font-bold">Credit Facility</th>
                  <th className="p-3 font-bold">Tenure</th>
                  <th className="p-3 font-bold">Typical Interest Rate</th>
                  <th className="p-3 font-bold">Purpose &amp; Best Fit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
                {facilityTypes.map((fac, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{fac.type}</td>
                    <td className="p-3">{fac.tenure}</td>
                    <td className="p-3 tabular-nums font-mono font-bold text-emerald-700">{fac.rate}</td>
                    <td className="p-3 text-xs text-slate-600">{fac.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Mudra & CGTMSE Overview */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building className="w-6 h-6 text-blue-700" />
            2. Sovereign Collateral-Free Schemes: CGTMSE &amp; Mudra
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">CGTMSE Scheme (Up to ₹5 Crores)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Set up jointly by the Ministry of MSME and SIDBI, CGTMSE provides credit guarantee coverage up to 85% for micro-enterprises and 75% for small enterprises, allowing banks to lend without third-party physical collateral.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Mudra Yojana (Up to ₹20 Lakhs)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Expanded under recent Union Budget provisions: Shishu (loans up to ₹50,000), Kishore (₹50,000 to ₹5 Lakhs), and Tarun Plus (₹10 Lakhs to ₹20 Lakhs for established entrepreneurs).
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Essential Documents */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-emerald-600" />
            3. Standard Document Checklist for Commercial Sanction
          </h2>
          <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside leading-relaxed">
            <li><strong>KYC of Entity &amp; Promoters:</strong> PAN cards, Aadhaar, MOA/AOA or Partnership Deed, Certificate of Incorporation.</li>
            <li><strong>Udyam Registration:</strong> Verified MSME certificate from the central portal.</li>
            <li><strong>Banking Statements:</strong> 12 months current account bank statements for all active operational accounts.</li>
            <li><strong>GST Returns:</strong> 12 months GSTR-3B and GSTR-1 filings reconciled with bank credits.</li>
            <li><strong>Audited Financials:</strong> Balance sheet and P&amp;L accounts for the last 2-3 financial years certified by a Chartered Accountant.</li>
          </ul>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            MSME Capital Solutions
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Fund Your Business Growth Today
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Compare business loans, cash credit limits, and machinery finance across 30+ top commercial lenders in India.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/loans/business/overview"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Explore Business Loans &rarr;
            </Link>
            <Link
              to="/blog/MSME-Loan-Without-Collateral"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Collateral-Free CGTMSE Loans
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Commercial Lending Regulatory Notice</span>
          </div>
          <p>
            Business loan terms, assessment of working capital margins, and interest spreads are determined exclusively by the lending bank or financial institution in accordance with Reserve Bank of India lending norms. BanksCart operates strictly as an independent digital credit marketplace.
          </p>
        </div>
      </article>
    </div>
  );
}
