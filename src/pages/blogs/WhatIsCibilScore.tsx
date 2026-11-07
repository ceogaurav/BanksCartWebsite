import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  ShieldCheck,
  CheckCircle2,
  Percent,
  Clock,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  FileCheck2,
  Scale,
  Award,
  Layers
} from 'lucide-react';

export default function WhatIsCibilScore() {
  const canonicalUrl = "https://www.bankscart.com/blog/what-is-cibil-score";
  const articleTitle = "What is CIBIL Score? Complete 2026 Guide to Calculation, Slabs & Improvement";
  const articleDesc = "The definitive guide to CIBIL score mastery: understand how bureaus calculate your 3-digit score, 5 algorithmic weights, score ranges (300-900), and proven steps to reach 750+.";

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
    "datePublished": "2026-01-08T09:00:00+05:30",
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
        "name": "What is CIBIL Score?",
        "item": canonicalUrl
      }
    ]
  };

  const scoreRanges = [
    { range: "300 - 549", category: "Poor", approval: "Extremely Unlikely", impact: "High risk of rejection; access limited to gold loans or secured credit." },
    { range: "550 - 649", category: "Fair / Average", approval: "Low to Moderate", impact: "High interest rates (18%-28%), higher down payment required." },
    { range: "650 - 749", category: "Good", approval: "Likely", impact: "Eligible for standard bank loans with normal documentation." },
    { range: "750 - 900", category: "Excellent", approval: "Pre-Approved / Instant", impact: "Lowest prime interest rates (8.5% home, 10.3% personal), waived processing fees." }
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
        <Breadcrumb path={["Home", "Blog", "What is CIBIL Score?"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Credit Score Mastery
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">16 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            What is CIBIL Score? Complete 2026 Guide to Calculation, Slabs & Improvement
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Your 3-digit CIBIL score is the single most decisive number in your financial life. Learn how TransUnion CIBIL algorithms evaluate your creditworthiness and how to optimize every factor to reach the coveted 750+ tier.
          </p>

          <AuthorByline
            authorSlug="raghav-singhal"
            reviewerSlug="amit-khurana"
            publishedDate="January 8, 2026"
            updatedDate="November 6, 2026"
            readTime="16 min read"
            showBioCard={true}
          />
        </header>

        {/* Section 1: The 5 Algorithmic Pillars */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-6 h-6 text-blue-700" />
            1. The Five Algorithmic Pillars of CIBIL Score
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            TransUnion CIBIL computes your score using historical data reported monthly by banks and financial institutions over a rolling 36-month timeline:
          </p>

          <div className="space-y-3 pt-2">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">1. Payment History (35% Weight)</h3>
                <p className="text-xs text-slate-600">On-time payment of credit card bills and loan EMIs. A single 30+ DPD delay can drop your score by 40-70 points.</p>
              </div>
              <span className="font-mono font-bold text-blue-700 text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-200">35%</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">2. Credit Utilization Ratio (CUR) (30% Weight)</h3>
                <p className="text-xs text-slate-600">Percentage of credit card limits utilized. Lenders recommend keeping usage below 30%.</p>
              </div>
              <span className="font-mono font-bold text-blue-700 text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-200">30%</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">3. Credit Vintage & Age (15% Weight)</h3>
                <p className="text-xs text-slate-600">Average age of active accounts. Older accounts reflect long-term stability and seasoned borrowing experience.</p>
              </div>
              <span className="font-mono font-bold text-blue-700 text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-200">15%</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">4. Credit Mix (10% Weight)</h3>
                <p className="text-xs text-slate-600">Healthy balance between secured debt (home/auto) and unsecured debt (personal loans/cards).</p>
              </div>
              <span className="font-mono font-bold text-blue-700 text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-200">10%</span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">5. Recent Hard Inquiries (10% Weight)</h3>
                <p className="text-xs text-slate-600">Too many formal loan applications in a short timeframe indicate credit desperation.</p>
              </div>
              <span className="font-mono font-bold text-blue-700 text-sm bg-blue-50 px-3 py-1 rounded-full border border-blue-200">10%</span>
            </div>
          </div>
        </section>

        {/* Section 2: Score Ranges Table */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-amber-600" />
            2. CIBIL Score Ranges and Loan Approval Impact
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="p-3 font-bold">Score Range</th>
                  <th className="p-3 font-bold">Category</th>
                  <th className="p-3 font-bold">Approval Likelihood</th>
                  <th className="p-3 font-bold">Financing Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
                {scoreRanges.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 tabular-nums font-mono font-bold text-slate-900">{item.range}</td>
                    <td className="p-3 font-semibold">{item.category}</td>
                    <td className="p-3 font-medium text-emerald-700">{item.approval}</td>
                    <td className="p-3 text-xs">{item.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Free Credit Bureau Check
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Check Your Free Official CIBIL Score Today
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Get your instant credit report with comprehensive factor analysis, dispute assistance, and zero reduction in your score.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/cibil-credit-report"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Get Free Credit Score & Report &rarr;
            </Link>
            <Link
              to="/loans/personal/overview"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Check Pre-Approved Loans
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Credit Information Companies (CIC) Notice</span>
          </div>
          <p>
            CIBIL is a registered trademark of TransUnion CIBIL Limited. BanksCart is an independent financial technology marketplace partnered with authorized credit bureaus to retrieve consumer credit reports under explicit user consent in accordance with the Credit Information Companies (Regulation) Act, 2005.
          </p>
        </div>
      </article>
    </div>
  );
}
