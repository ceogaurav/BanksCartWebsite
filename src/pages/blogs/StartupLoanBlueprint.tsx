import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  Rocket,
  CheckCircle2,
  Percent,
  Clock,
  ShieldCheck,
  Building,
  TrendingUp,
  HelpCircle,
  FileCheck2,
  Sparkles,
  Award
} from 'lucide-react';

export default function StartupLoanBlueprint() {
  const canonicalUrl = "https://www.bankscart.com/blog/Startup-Loan-Blueprint";
  const articleTitle = "Startup Loan Blueprint: Government Schemes & Capital Options (2026)";
  const articleDesc = "Complete 2026 guide to startup loans in India: explore DPIIT recognition, Startup India Seed Fund (SISFS up to ₹50L), Credit Guarantee Scheme for Startups (CGSS), and Mudra loans.";

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
    "datePublished": "2026-01-20T09:00:00+05:30",
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
        "name": "Startup Loan Blueprint",
        "item": canonicalUrl
      }
    ]
  };

  const schemes = [
    {
      title: "Startup India Seed Fund Scheme (SISFS)",
      funding: "Up to ₹20 Lakhs grant / ₹50 Lakhs debt",
      nature: "Convertible debentures or debt via approved incubators",
      eligibility: "DPIIT-recognized startups incorporated within the last 2 years with a viable proof of concept."
    },
    {
      title: "Credit Guarantee Scheme for Startups (CGSS)",
      funding: "Up to ₹10 Crores collateral-free debt",
      nature: "Institutional credit guarantee for scheduled commercial banks & venture debt funds",
      eligibility: "DPIIT-recognized startups having audited revenue tracks or institutional venture backing."
    },
    {
      title: "Pradhan Mantri Mudra Yojana (PMMY)",
      funding: "Up to ₹20 Lakhs",
      nature: "Term loans and working capital overdrafts with zero collateral",
      eligibility: "Early-stage micro-enterprises, small manufacturing units, and service businesses."
    },
    {
      title: "Revenue-Based Financing (RBF)",
      funding: "₹10 Lakhs to ₹3 Crores",
      nature: "Non-dilutive growth capital repaid via a fixed percentage of monthly revenues",
      eligibility: "D2C brands, SaaS platforms, and digital startups with minimum ₹5 Lakhs monthly MRR."
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
        <Breadcrumb path={["Home", "Blog", "Startup Loan Blueprint"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Startup Financing Blueprint
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">14 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Startup Loan Blueprint: Government Schemes &amp; Capital Options (2026)
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Building a new venture in India? Learn how DPIIT recognition unlocks collateral-free government credit schemes, venture debt lines, and working capital solutions without diluting early-stage founder equity.
          </p>

          <AuthorByline authorSlug="amit-khurana" />
        </header>

        {/* Section 1: The 4 Core Programs */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Rocket className="w-6 h-6 text-blue-700" />
            1. Top Startup Financing Instruments in India (2026)
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {schemes.map((s, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base">{s.title}</h3>
                </div>
                <div className="text-xs font-bold text-emerald-700 font-mono">
                  Quantum: {s.funding}
                </div>
                <p className="text-xs text-slate-600">
                  <strong>Structure:</strong> {s.nature}
                </p>
                <p className="text-xs text-slate-600">
                  <strong>Criteria:</strong> {s.eligibility}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: DPIIT Benefits */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-600" />
            2. The Critical First Step: DPIIT Recognition
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            To qualify for sovereign seed funds and tax-exempt debt, your enterprise must obtain an official <strong>DPIIT Certificate of Recognition</strong> under the Ministry of Commerce and Industry:
          </p>
          <ul className="space-y-2 text-sm text-slate-700 list-disc list-inside leading-relaxed">
            <li><strong>Section 80-IAC Tax Exemption:</strong> 100% tax holiday on business profits for 3 consecutive years out of the first 10 years of incorporation.</li>
            <li><strong>Angel Tax Exemption:</strong> Complete immunity from Section 56(2)(viib) valuation inquiries on share issuance above fair market value.</li>
            <li><strong>Priority Government Procurement:</strong> Exemption from prior experience and turnover requirements in public sector tenders.</li>
          </ul>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Entrepreneur Capital Hub
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Fund Your Startup Without Collateral
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Compare non-dilutive credit lines, commercial working capital loans, and government-backed credit guarantee options on BanksCart.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/loans/business/overview"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Check Business Loan Options &rarr;
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
            <span>Government Framework Notice</span>
          </div>
          <p>
            Startup India Seed Fund Scheme (SISFS) and Credit Guarantee Scheme for Startups (CGSS) are governed by the Department for Promotion of Industry and Internal Trade (DPIIT). BanksCart is an independent digital loan marketplace and does not charge any upfront facilitation fees.
          </p>
        </div>
      </article>
    </div>
  );
}
