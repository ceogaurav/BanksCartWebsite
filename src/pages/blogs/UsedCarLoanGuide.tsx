import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  Car,
  CheckCircle2,
  Percent,
  Clock,
  ShieldCheck,
  TrendingDown,
  Building,
  HelpCircle,
  FileCheck2,
  AlertTriangle,
  Scale
} from 'lucide-react';

export default function UsedCarLoanGuide() {
  const canonicalUrl = "https://www.bankscart.com/blog/Used-Car-Loan-Guide";
  const articleTitle = "How to Buy a Used Car With a Loan: The Complete Smart Buyer's Guide (2026)";
  const articleDesc = "Complete 2026 guide to pre-owned car loans in India: compare interest rates (11.5%+), bank valuation rules, RTO Form 29/30 transfer, and how to avoid dealer markups.";

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
        "name": "Used Car Loan Guide",
        "item": canonicalUrl
      }
    ]
  };

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
        <Breadcrumb path={["Home", "Blog", "Used Car Loan Guide"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Pre-Owned Vehicle Finance
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">14 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            How to Buy a Used Car With a Loan: The Complete Smart Buyer's Guide (2026)
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Buying a certified pre-owned vehicle offers tremendous value, but used car loans carry unique nuances: bank valuation surveys, vehicle age caps, RTO hypothecation transfers, and interest rate premiums. Here is your complete playbook.
          </p>

          <AuthorByline authorSlug="amit-khurana" />
        </header>

        {/* Section 1: Rate & Age Realities */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Percent className="w-6 h-6 text-blue-700" />
            1. Used Car Interest Rates &amp; Age Restrictions
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Because used cars depreciate faster and carry mechanical risk, lenders price used car loans at <strong>11.50% to 16.50% p.a.</strong>, approximately 250 to 400 basis points higher than new car financing:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Vehicle Age Caps</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Most banks (SBI, HDFC, ICICI) mandate that the car's age plus loan tenure cannot exceed <strong>8 to 10 years</strong> at maturity. A 5-year-old car can generally be financed for a maximum tenure of 3 to 5 years.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-base">Bank Valuation (IDV) Limit</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Banks do not finance the seller's asking price; an authorized bank surveyor conducts a physical valuation. The bank sanctions up to 75% to 85% of their appraised value.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: RTO Transfer Checklist */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-emerald-600" />
            2. Mandatory RTO &amp; Title Verification Checklist
          </h2>
          <ul className="space-y-2.5 text-sm text-slate-700 list-disc list-inside leading-relaxed">
            <li><strong>Form 29 &amp; Form 30:</strong> Duly signed notice of transfer of ownership.</li>
            <li><strong>Original Registration Certificate (RC):</strong> Verify chassis and engine number matching the physical vehicle.</li>
            <li><strong>Bank NOC &amp; Form 35:</strong> If the previous owner bought the car on loan, ensure they provide an original Bank NOC and Form 35 showing hypothecation removal.</li>
            <li><strong>Active Comprehensive Insurance:</strong> Valid third-party and own-damage policy transferred to the new owner.</li>
          </ul>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Vehicle Finance Tool
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Calculate Your Pre-Owned Car Loan EMI
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Compare used car financing rates across top commercial banks and calculate exact monthly outgo in seconds.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/car-loan-calculator"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Open Car Loan Calculator &rarr;
            </Link>
            <Link
              to="/blog/Car-Loan-Rates-2026"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Compare New Car Loan Rates
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Pre-Owned Vehicle Advisory</span>
          </div>
          <p>
            Prospective buyers must verify vehicle encumbrance records on the official Vahan citizen portal before paying token amounts. BanksCart operates strictly as an independent digital credit marketplace.
          </p>
        </div>
      </article>
    </div>
  );
}
