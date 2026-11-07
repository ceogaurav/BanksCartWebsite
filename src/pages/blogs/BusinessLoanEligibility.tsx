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
  DollarSign
} from 'lucide-react';

export default function BusinessLoanEligibility() {
  const canonicalUrl = "https://www.bankscart.com/blog/Business-Loan-Eligibility";
  const articleTitle = "How to Improve Business Loan Eligibility Fast: 8 SME Approval Fixes (2026)";
  const articleDesc = "The ultimate 2026 SME blueprint: 8 proven strategies to optimize Debt Service Coverage Ratio (DSCR > 1.25), reconcile GST turnover, register Udyam, and unlock loans up to ₹5 Crores.";

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
    "datePublished": "2026-01-19T09:00:00+05:30",
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
        "name": "Business Loan Eligibility",
        "item": canonicalUrl
      }
    ]
  };

  const fixes = [
    {
      num: "01",
      title: "Optimize Debt Service Coverage Ratio (DSCR > 1.25x)",
      desc: "Commercial lenders calculate DSCR = (Net Operating Income + Depreciation) ÷ (Total Annual Principal + Interest Repayments). If your DSCR is below 1.2x, banks will trim your sanction or reject. Prepay high-interest short-term debt before submitting final financial statements."
    },
    {
      num: "02",
      title: "Perfect Match Between GST Returns & Bank Account Credits",
      desc: "Credit underwriters run automated OCR reconciliation between your GSTR-3B filings and Current Account banking statements. Inconsistencies or unrecorded cash deposits raise red flags."
    },
    {
      num: "03",
      title: "Register on the Central Udyam MSME Portal",
      desc: "Having an official Udyam Registration Certificate classifies your enterprise under RBI's Priority Sector Lending (PSL) mandate, unlocking interest rate concessions of up to 1.00% to 1.50%."
    },
    {
      num: "04",
      title: "Protect the Promoters' Personal CIBIL Scores",
      desc: "For proprietary, partnership, and closely held private limited firms, lenders mandate that all directors and key partners maintain personal CIBIL scores of at least 700 to 720."
    },
    {
      num: "05",
      title: "Shorten Days Sales Outstanding (DSO) on Receivables",
      desc: "Large receivables aging beyond 90 or 180 days signal liquidity strain. Factoring your invoices through TReDS (Trade Receivables Discounting System) cleans up your balance sheet."
    },
    {
      num: "06",
      title: "Maintain a Healthy Debt-to-Equity Ratio Under 3:1",
      desc: "Lenders want to see promoter skin in the game. Injecting subordinate promoter debt or capitalizing retained earnings keeps your leverage ratios within standard banking tolerances."
    },
    {
      num: "07",
      title: "Zero Inward/Outward Cheque Bounces for 12 Consecutive Months",
      desc: "A single inward cheque return or NACH debit bounce on your primary current account triggers automated risk penalties in modern algorithmic banking scorecards."
    },
    {
      num: "08",
      title: "Apply Under Credit Guarantee Schemes (CGTMSE)",
      desc: "If lacking collateral, request your public or private sector lender to process your term loan or cash credit (CC/OD) limit under the CGTMSE framework, covering loans up to ₹5 Crores."
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
        <Breadcrumb path={["Home", "Blog", "Business Loan Eligibility"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              SME Commercial Finance
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">14 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            How to Improve Business Loan Eligibility Fast: 8 SME Approval Fixes (2026)
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Need working capital or an equipment term loan for your business? Discover how bank credit officers evaluate MSME financial statements, calculate DSCR, and how you can boost your sanction eligibility within 90 days.
          </p>

          <AuthorByline authorSlug="amit-khurana" />
        </header>

        {/* 8 Fixes */}
        <div className="space-y-6">
          {fixes.map((item) => (
            <section
              key={item.num}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200 font-mono">
                  SME Fix #{item.num}
                </span>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {item.title}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {item.desc}
              </p>
            </section>
          ))}
        </div>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            MSME Capital Solutions
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Unlock Working Capital & Equipment Loans
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Compare collateral-free business loans, overdraft limits (OD/CC), and machinery term loans across 30+ leading Indian banks and NBFCs.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/loans/business/overview"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Explore Business Loan Offers &rarr;
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
            <span>Commercial Underwriting Disclosure</span>
          </div>
          <p>
            Commercial loan sanctions, working capital assessment (Tandon/Chore committee norms), and margin requirements are subject to lending bank internal credit policies and RBI Priority Sector Lending guidelines. BanksCart is an independent digital loan comparison portal.
          </p>
        </div>
      </article>
    </div>
  );
}
