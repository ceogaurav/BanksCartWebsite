import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  Heart,
  Award,
  ShieldCheck,
  HelpCircle,
  TrendingUp,
  Percent,
  Clock,
  Building,
  CheckCircle2,
  FileCheck2,
  Scale
} from 'lucide-react';

export default function SukanyaSamriddhiYojanaGuide() {
  const canonicalUrl = "https://www.bankscart.com/blog/sukanya-samriddhi-yojana-guide";
  const articleTitle = "Sukanya Samriddhi Yojana (SSY) 2026: Interest Rate, Rules & Tax Benefits";
  const articleDesc = "The ultimate handbook on Sukanya Samriddhi Yojana: 8.2% sovereign interest rate, Triple Tax Exemption (EEE), 21-year maturity, and girl child educational withdrawal rules.";

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
      "name": "Priya Sharma",
      "jobTitle": "Senior Financial Analyst",
      "url": "https://www.bankscart.com/author/priya-sharma"
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
        "name": "Sukanya Samriddhi Yojana Guide",
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
        <Breadcrumb path={["Home", "Blog", "Sukanya Samriddhi Yojana Guide"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-rose-700">
            <span className="bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
              Sovereign Savings Scheme
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">12 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Sukanya Samriddhi Yojana (SSY) 2026: Interest Rate, Rules &amp; Tax Benefits
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Sukanya Samriddhi Yojana remains the highest-yielding small savings scheme backed 100% by the Government of India. Offering an unmatched 8.2% compounded return and complete Triple Tax Exemption (EEE), here is how to secure your daughter's future.
          </p>

          <AuthorByline
            authorSlug="priya-sharma"
            reviewerSlug="amit-khurana"
            publishedDate="January 15, 2026"
            updatedDate="November 6, 2026"
            readTime="12 min read"
            showBioCard={true}
          />
        </header>

        {/* Section 1: Core Scheme Specs */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-6 h-6 text-rose-600" />
            1. SSY 2026 Key Highlights &amp; Specifications
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200">
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">Interest Rate</span>
              <p className="text-2xl font-black text-rose-950 font-mono mt-1">8.20% p.a.</p>
              <p className="text-xs text-slate-600 mt-1">Compounded annually, fixed quarterly by Ministry of Finance</p>
            </div>
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Tax Status</span>
              <p className="text-2xl font-black text-emerald-950 font-mono mt-1">Exempt-Exempt-Exempt</p>
              <p className="text-xs text-slate-600 mt-1">Sec 80C deduction, tax-free interest, and 100% tax-free maturity</p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200">
              <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">Deposit Limits</span>
              <p className="text-xl font-black text-blue-950 font-mono mt-1">₹250 to ₹1.50 Lakhs/yr</p>
              <p className="text-xs text-slate-600 mt-1">Mandatory deposit for 15 years from account opening date</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200">
              <span className="text-xs font-bold text-purple-800 uppercase tracking-wider">Account Maturity</span>
              <p className="text-xl font-black text-purple-950 font-mono mt-1">21 Years</p>
              <p className="text-xs text-slate-600 mt-1">Or upon marriage of the girl child after attaining age 18</p>
            </div>
          </div>
        </section>

        {/* Section 2: Account Opening Rules */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            2. Eligibility &amp; Account Opening Norms
          </h2>
          <ul className="space-y-2.5 text-sm text-slate-700 list-disc list-inside leading-relaxed">
            <li><strong>Age Requirement:</strong> Account can be opened anytime from birth up to the age of <strong>10 years</strong>.</li>
            <li><strong>Maximum 2 Accounts:</strong> A natural or legal guardian can open only one account per girl child and a maximum of two accounts for two daughters (exception allowed for triplets/twins).</li>
            <li><strong>Where to Open:</strong> Any authorized branch of India Post (Post Office) or scheduled commercial banks (SBI, PNB, BoB, HDFC, ICICI, Axis).</li>
            <li><strong>Documents:</strong> Birth certificate of the girl child, guardian's KYC (Aadhaar &amp; PAN), and passport-size photographs.</li>
          </ul>
        </section>

        {/* Section 3: Partial Withdrawal */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-700" />
            3. Partial Withdrawal Rules for Higher Education
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            To prevent premature fund depletion while supporting college fees, the government allows partial withdrawal of up to <strong>50% of the balance</strong> standing at the end of the preceding financial year. This is permissible once the girl turns 18 years old or passes the 10th standard, upon submitting confirmed college admission offer documents.
          </p>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Government Savings Schemes
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Plan Tax-Free Wealth for Your Family
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Explore government-backed small savings schemes, fixed deposits, and Section 80C tax optimization guides on BanksCart.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/blog/Fixed-Deposit-Guide"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Compare Best Fixed Deposits &rarr;
            </Link>
            <Link
              to="/blog/Tax-Saving-Guide"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Complete Tax Saving Guide
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Government Small Savings Disclosure</span>
          </div>
          <p>
            Sukanya Samriddhi Account rules are notified by the Department of Economic Affairs, Ministry of Finance, Government of India. Interest rates are reviewed and updated on a quarterly cycle. BanksCart provides financial literacy information and does not operate deposit facilities directly.
          </p>
        </div>
      </article>
    </div>
  );
}
