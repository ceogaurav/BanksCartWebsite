import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  Smartphone,
  CheckCircle2,
  Percent,
  Clock,
  ShieldCheck,
  Building,
  TrendingUp,
  HelpCircle,
  FileCheck2,
  Briefcase
} from 'lucide-react';

export default function DigitalBanks() {
  const canonicalUrl = "https://www.bankscart.com/blog/Digital-Banks";
  const articleTitle = "Top Digital Banks & Neobanks in India (2026 In-Depth Review)";
  const articleDesc = "Explore the best digital banks and neobanks in India: Jupiter, Fi Money, Niyo, and RazorpayX. Learn how RBI regulations, bank partnerships, and DICGC ₹5 Lakh deposit insurance keep your funds safe.";

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
    "datePublished": "2026-01-21T09:00:00+05:30",
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
        "name": "Digital Banks & Neobanks",
        "item": canonicalUrl
      }
    ]
  };

  const neobanks = [
    {
      name: "Jupiter Money",
      partnerBank: "Federal Bank",
      interestRate: "Up to 7.00% p.a. (via Pots/FDs)",
      bestFor: "Smart budgeting, automated salary accounts & high-yield mutual fund SIPs"
    },
    {
      name: "Fi Money",
      partnerBank: "Federal Bank",
      interestRate: "Up to 7.05% p.a. (via Multi-tier FDs)",
      bestFor: "Tech professionals, zero-commission US stock investing & spending analytics"
    },
    {
      name: "Niyo Global",
      partnerBank: "Equitas Small Finance Bank / DCB Bank",
      interestRate: "Up to 7.50% p.a.",
      bestFor: "Zero forex markup for international travel, students abroad & multi-currency spending"
    },
    {
      name: "RazorpayX",
      partnerBank: "RBL Bank / ICICI Bank",
      interestRate: "Current Account Suite",
      bestFor: "Startups, seamless vendor payouts, payroll automation & corporate credit cards"
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
        <Breadcrumb path={["Home", "Blog", "Digital Banks & Neobanks"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Digital Banking Trends
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">13 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Top Digital Banks & Neobanks in India (2026 In-Depth Review)
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Neobanks and digital-first accounts have revolutionized consumer finance in India with zero-balance flexibility, zero-forex debit cards, and AI-powered expense tracking. Here is how they operate legally under RBI mandates.
          </p>

          <AuthorByline authorSlug="neha-verma" />
        </header>

        {/* Section 1: Top Neobanks Table */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-blue-700" />
            1. Leading Indian Neobanks & Licensed Partner Banks
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="p-3 font-bold">Platform</th>
                  <th className="p-3 font-bold">Licensed Banking Partner</th>
                  <th className="p-3 font-bold">Max Interest Rate</th>
                  <th className="p-3 font-bold">Primary Strength</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
                {neobanks.map((nb, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{nb.name}</td>
                    <td className="p-3 text-xs font-semibold text-blue-900">{nb.partnerBank}</td>
                    <td className="p-3 tabular-nums font-mono font-bold text-emerald-700">{nb.interestRate}</td>
                    <td className="p-3 text-xs text-slate-600">{nb.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: How Money is Protected */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
            2. How Are Your Deposits Protected? DICGC Insurance
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            In India, neobanks do not hold direct banking licenses; they operate as technology front-ends partnered with RBI-scheduled commercial banks (e.g. Federal Bank, Equitas SFB). Because your money physically sits in an RBI-licensed bank account, it is legally protected by the <strong>Deposit Insurance and Credit Guarantee Corporation (DICGC)</strong> for up to <strong>₹5,00,000 per depositor</strong>.
          </p>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Savings & Fixed Deposits
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Looking for High-Yield Fixed Deposits?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Compare verified fixed deposit rates up to 8.50% p.a. across top Scheduled Commercial Banks and Small Finance Banks with 100% DICGC safety.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/blog/Fixed-Deposit-Guide"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Compare Best FD Interest Rates &rarr;
            </Link>
            <Link
              to="/cards/credit/overview"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Explore Zero-Forex Cards
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Neobanking Regulatory Notice</span>
          </div>
          <p>
            Neobanks featured operate in co-branding arrangements strictly adhering to Reserve Bank of India Master Directions on Outsourcing of Financial Services. All customer funds are held with insured RBI-scheduled partner banks. BanksCart provides comparative fintech information.
          </p>
        </div>
      </article>
    </div>
  );
}
