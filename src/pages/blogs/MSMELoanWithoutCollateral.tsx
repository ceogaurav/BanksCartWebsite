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
  Coins,
  Scale
} from 'lucide-react';

export default function MSMELoanWithoutCollateral() {
  const canonicalUrl = "https://www.bankscart.com/blog/MSME-Loan-Without-Collateral";
  const articleTitle = "MSME Loan Without Collateral: CGTMSE & Mudra Schemes Guide (2026)";
  const articleDesc = "Complete 2026 guide to collateral-free MSME business loans: discover how the CGTMSE guarantee covers up to ₹5 Crores, Mudra up to ₹20 Lakhs, eligibility rules, and approval steps.";

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
    "datePublished": "2026-01-17T09:00:00+05:30",
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
        "name": "Collateral-Free MSME Loan",
        "item": canonicalUrl
      }
    ]
  };

  const schemeComparison = [
    {
      scheme: "CGTMSE Scheme",
      maxAmount: "Up to ₹5.00 Crores",
      guaranteeCover: "Up to 85% for Micro, 75% for Small",
      interestRate: "10.00% - 14.50%",
      targetAudience: "Manufacturing & Service Micro/Small Enterprises"
    },
    {
      scheme: "PM Mudra Yojana (Tarun Plus)",
      maxAmount: "Up to ₹20.00 Lakhs",
      guaranteeCover: "Credit Guarantee Fund for Micro Units (CGFMU)",
      interestRate: "8.50% - 12.00%",
      targetAudience: "Micro-enterprises, small retail traders, artisans"
    },
    {
      scheme: "Stand-Up India",
      maxAmount: "₹10 Lakhs to ₹1.00 Crore",
      guaranteeCover: "National Credit Guarantee Trustee Company (NCGTC)",
      interestRate: "Base rate + 3% tenor premium",
      targetAudience: "Women and SC/ST greenfield enterprise promoters"
    },
    {
      scheme: "Fintech Cash-Flow Loans",
      maxAmount: "Up to ₹50.00 Lakhs",
      guaranteeCover: "Unsecured (Account Aggregator Underwriting)",
      interestRate: "14.00% - 24.00%",
      targetAudience: "Fast-growing digital D2C brands & service agencies"
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
        <Breadcrumb path={["Home", "Blog", "Collateral-Free MSME Loan"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Government MSME Schemes
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">14 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            MSME Loan Without Collateral: CGTMSE &amp; Mudra Schemes Guide (2026)
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Lack of commercial real estate collateral shouldn't throttle your business expansion. Discover how central government credit guarantee frameworks enable Indian banks to lend up to ₹5 Crores without asking for personal property deeds.
          </p>

          <AuthorByline authorSlug="amit-khurana" />
        </header>

        {/* Section 1: Comparison Table */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Coins className="w-6 h-6 text-blue-700" />
            1. Major Collateral-Free Schemes Compared (2026)
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="p-3 font-bold">Government Scheme</th>
                  <th className="p-3 font-bold">Max Loan Quantum</th>
                  <th className="p-3 font-bold">Sovereign Guarantee Cover</th>
                  <th className="p-3 font-bold">Typical Interest Rate</th>
                  <th className="p-3 font-bold">Target Borrowers</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
                {schemeComparison.map((s, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{s.scheme}</td>
                    <td className="p-3 tabular-nums font-mono font-bold text-slate-900">{s.maxAmount}</td>
                    <td className="p-3 text-xs">{s.guaranteeCover}</td>
                    <td className="p-3 tabular-nums font-mono font-bold text-emerald-700">{s.interestRate}</td>
                    <td className="p-3 text-xs text-slate-600">{s.targetAudience}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: How CGTMSE Works */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            2. How the CGTMSE Mechanism Protects the Bank
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Traditionally, banks demand 100% to 150% immovable property collateral before sanctioning commercial loans. Under <strong>CGTMSE (Credit Guarantee Fund Trust for Micro and Small Enterprises)</strong>, SIDBI and the Ministry of MSME step in as the institutional guarantor.
          </p>
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs sm:text-sm text-emerald-950 leading-relaxed">
            <strong>Key Benefit:</strong> If a borrower encounters business distress, the Trust pays up to 85% of the defaulted principal to the lending bank. In exchange, the borrower pays an annual guarantee fee (AGF) between 0.37% and 1.35% of the loan amount.
          </div>
        </section>

        {/* Section 3: Step-by-Step Application */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-700" />
            3. Step-by-Step Application Roadmap
          </h2>
          <ol className="space-y-3 text-sm text-slate-700 list-decimal list-inside leading-relaxed">
            <li><strong>Register Udyam:</strong> Secure your free Udyam Registration Certificate using business PAN and Aadhaar.</li>
            <li><strong>Prepare Detailed Project Report (DPR):</strong> Document business model, promoter profile, 3-year projected cashflows, and machinery quotation.</li>
            <li><strong>Login on Jan Samarth / PSB Loans:</strong> Submit your digital file to eligible Member Lending Institutions (MLIs) including SBI, BoB, PNB, and Union Bank.</li>
            <li><strong>Sanction &amp; Trust Coverage:</strong> Upon credit approval, the lender issues a sanction letter with CGTMSE coverage guarantee code.</li>
          </ol>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            MSME Capital Solutions
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Apply for Collateral-Free Business Credit
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Compare business loans, cash credit limits, and machinery finance across 30+ leading Indian banks and NBFCs with zero upfront fees.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/loans/business/overview"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Check Business Loan Eligibility &rarr;
            </Link>
            <Link
              to="/blog/Business-Loan-Eligibility"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Improve Loan Eligibility
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Statutory Scheme Disclaimer</span>
          </div>
          <p>
            CGTMSE and Mudra Yojana are administered under government trust frameworks. Sanction decision and guarantee fee application remain subject to individual lending bank credit committee approvals. BanksCart does not charge any upfront facilitation fees for government scheme applications.
          </p>
        </div>
      </article>
    </div>
  );
}
