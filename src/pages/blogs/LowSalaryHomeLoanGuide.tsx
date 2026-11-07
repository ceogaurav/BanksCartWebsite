import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  Home,
  CheckCircle2,
  AlertTriangle,
  Users,
  ShieldCheck,
  TrendingUp,
  Percent,
  Clock,
  Building,
  DollarSign,
  FileCheck2,
  HelpCircle,
  PiggyBank
} from 'lucide-react';

export default function LowSalaryHomeLoanGuide() {
  const canonicalUrl = "https://www.bankscart.com/blog/Low-Salary-Home-Loan-Guide";
  const articleTitle = "How to Get a Home Loan with a Low Salary in India: 2026 Approval Blueprint";
  const articleDesc = "Complete guide to securing a home loan on low salary (₹15,000 to ₹35,000/month). Learn co-applicant tricks, PMAY 2.0 subsidies, 30-year tenures, and top lenders.";

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
        "name": "Low Salary Home Loan Guide",
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
        <Breadcrumb path={["Home", "Blog", "Low Salary Home Loan Guide"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Mortgage Strategy
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">12 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            How to Get a Home Loan with a Low Salary in India: 2026 Blueprint
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Earning between ₹15,000 and ₹35,000 per month does not disqualify you from owning your dream home. Here is how banking underwriters evaluate lower-income files, optimize Fixed Obligation to Income Ratios (FOIR), and leverage government credit-linked subsidies.
          </p>

          <AuthorByline authorSlug="amit-khurana" />
        </header>

        {/* Section 1: Core Mathematical Barrier: FOIR */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-700" />
            1. Understanding FOIR: The Real Deciding Factor
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Banks do not look at your gross salary in isolation; they calculate your <strong>Fixed Obligation to Income Ratio (FOIR)</strong>. FOIR measures what percentage of your net take-home salary is committed to monthly debt payments (including existing credit cards, personal loans, and the proposed new home loan EMI).
          </p>
          <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 font-mono text-xs sm:text-sm text-slate-800">
            FOIR (%) = [(Total Existing Monthly EMIs + Proposed Home Loan EMI) ÷ Net Monthly Income] × 100
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            For individuals earning below ₹30,000/month, RBI credit norms cap FOIR at <strong>40% to 50%</strong>. For example, if you earn ₹25,000/month, lenders will cap your total monthly EMI across all loans at ₹10,000 to ₹12,500.
          </p>
        </section>

        {/* Section 2: 6 Proven Strategies */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            2. Six Proven Strategies to Boost Approval on Low Salary
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-blue-900 font-bold">
                <Users className="w-5 h-5 text-blue-700" />
                <h3>Add a Co-Borrower (Club Incomes)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Adding an earning spouse, parent, or sibling combines your monthly incomes. If you earn ₹25,000 and your spouse earns ₹20,000, your loan eligibility instantly shoots from ₹15 Lakhs to ₹30 Lakhs.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-blue-900 font-bold">
                <Clock className="w-5 h-5 text-blue-700" />
                <h3>Opt for Maximum Tenure (30 Years)</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Stretching your mortgage tenure from 15 to 30 years dramatically reduces the monthly EMI, pushing your FOIR well within the acceptable 40% threshold for immediate sanction.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-blue-900 font-bold">
                <Building className="w-5 h-5 text-blue-700" />
                <h3>Leverage PMAY-U 2.0 Interest Subsidy</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Under Pradhan Mantri Awas Yojana (Urban 2.0), Economically Weaker Section (EWS) and Low Income Group (LIG) families can receive up to ₹1.80 Lakhs in upfront interest subsidies.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 space-y-2">
              <div className="flex items-center gap-2 text-blue-900 font-bold">
                <FileCheck2 className="w-5 h-5 text-blue-700" />
                <h3>Close Existing Small Debts First</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Closing a ₹2,500 bike EMI or a ₹1,500 consumer durable loan frees up vital FOIR margin, allowing underwriters to grant an extra ₹2.5 to ₹4 Lakhs on your housing loan.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Bank Comparison Table */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            3. Best Lenders for Low-Salary Borrowers (2026)
          </h2>
          <p className="text-sm text-slate-600">
            Public sector banks and specialized housing finance companies (HFCs) offer targeted schemes for lower monthly income brackets:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="p-3 font-bold">Lender / Institution</th>
                  <th className="p-3 font-bold">Min. Monthly Income</th>
                  <th className="p-3 font-bold">Interest Rate Range</th>
                  <th className="p-3 font-bold">Max. Tenure</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">SBI (Arogya / Rural Home Loan)</td>
                  <td className="p-3 tabular-nums font-mono">₹15,000</td>
                  <td className="p-3 tabular-nums font-mono text-emerald-700 font-semibold">8.50% - 9.15%</td>
                  <td className="p-3">30 Years</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">PNB Housing (Roshni Scheme)</td>
                  <td className="p-3 tabular-nums font-mono">₹10,000</td>
                  <td className="p-3 tabular-nums font-mono text-emerald-700 font-semibold">8.75% - 9.80%</td>
                  <td className="p-3">30 Years</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">LIC Housing Finance (Griha Siddhi)</td>
                  <td className="p-3 tabular-nums font-mono">₹20,000</td>
                  <td className="p-3 tabular-nums font-mono text-emerald-700 font-semibold">8.50% - 9.25%</td>
                  <td className="p-3">30 Years</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">Aadhar Housing Finance</td>
                  <td className="p-3 tabular-nums font-mono">₹12,000</td>
                  <td className="p-3 tabular-nums font-mono text-emerald-700 font-semibold">9.50% - 11.50%</td>
                  <td className="p-3">25 Years</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Free Eligibility Assessment
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Check Your Home Loan Eligibility Across 30+ Banks
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Find out how much mortgage your salary qualifies for, compare subsidized schemes, and calculate exact monthly EMIs without affecting your CIBIL score.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/loans/home/overview"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Explore Home Loan Schemes &rarr;
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
            <span>Regulatory Notice & Lending Disclaimer</span>
          </div>
          <p>
            BanksCart is an authorized financial comparison and lead referral marketplace. BanksCart is not an RBI-licensed deposit-taking institution or lender. Loan sanctions, property legal technical verification, interest rate finalization, and disbursements remain the sole prerogative of partnering banks and NHB-registered housing finance institutions.
          </p>
        </div>
      </article>
    </div>
  );
}
