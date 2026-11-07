import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  Building2,
  CheckCircle2,
  Percent,
  Clock,
  ShieldCheck,
  Building,
  HelpCircle,
  FileCheck2,
  Home,
  Users
} from 'lucide-react';

export default function PMAY() {
  const canonicalUrl = "https://www.bankscart.com/blog/PMAY";
  const articleTitle = "Pradhan Mantri Awas Yojana (PMAY-U 2.0) 2026: Eligibility, Subsidy & Application Guide";
  const articleDesc = "Comprehensive guide to PMAY-U 2.0 and PMAY-Gramin: subsidy slabs up to ₹1.80 Lakhs, EWS/LIG/MIG income criteria, Interest Subsidy Scheme (ISS), and online status tracking.";

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
    "datePublished": "2026-01-12T09:00:00+05:30",
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
        "name": "PMAY Subsidy Guide",
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
        <Breadcrumb path={["Home", "Blog", "PMAY Subsidy Guide"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Government Housing Schemes
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">13 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Pradhan Mantri Awas Yojana (PMAY-U 2.0) 2026: Eligibility, Subsidy & Application Guide
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            The Government of India has extended and overhauled the flagship housing mission with PMAY-Urban 2.0, providing upfront interest subsidies and direct financial assistance for affordable home purchases and construction.
          </p>

          <AuthorByline authorSlug="amit-khurana" />
        </header>

        {/* Section 1: PMAY-U 2.0 Overview */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-6 h-6 text-blue-700" />
            1. What is PMAY-Urban 2.0?
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            PMAY-U 2.0 addresses the housing needs of 1 Crore urban poor and middle-class families with an outlay of ₹10 Lakh Crores over 5 years. Under the new <strong>Interest Subsidy Scheme (ISS)</strong>, eligible beneficiaries taking a home loan up to ₹25 Lakhs (for properties valued up to ₹35 Lakhs) receive an interest subsidy of <strong>4.0% p.a.</strong> on the first ₹8 Lakhs of loan principal.
          </p>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs sm:text-sm text-blue-900">
            <strong>Key Benefit:</strong> The total net present value (NPV) subsidy of up to <strong>₹1.80 Lakhs</strong> is credited directly into the borrower's home loan account, immediately reducing principal outstanding and lowering monthly EMIs.
          </div>
        </section>

        {/* Section 2: Income Categories */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-700" />
            2. Income Slabs & Eligibility Criteria
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="p-3 font-bold">Category</th>
                  <th className="p-3 font-bold">Annual Household Income</th>
                  <th className="p-3 font-bold">Max Property Carpet Area</th>
                  <th className="p-3 font-bold">Interest Subsidy Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">EWS (Economically Weaker Section)</td>
                  <td className="p-3 tabular-nums font-mono">Up to ₹3.00 Lakhs</td>
                  <td className="p-3">Up to 30 sq. meters</td>
                  <td className="p-3 tabular-nums font-mono font-bold text-emerald-700">4.0% (Up to ₹1.80L)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">LIG (Low Income Group)</td>
                  <td className="p-3 tabular-nums font-mono">₹3.01 Lakhs to ₹6.00 Lakhs</td>
                  <td className="p-3">Up to 60 sq. meters</td>
                  <td className="p-3 tabular-nums font-mono font-bold text-emerald-700">4.0% (Up to ₹1.80L)</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">MIG (Middle Income Group)</td>
                  <td className="p-3 tabular-nums font-mono">₹6.01 Lakhs to ₹9.00 Lakhs</td>
                  <td className="p-3">Up to 120 sq. meters</td>
                  <td className="p-3 tabular-nums font-mono font-bold text-emerald-700">Interest Subvention</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Essential Eligibility Rules */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            3. Mandatory Qualification Rules
          </h2>
          <ul className="space-y-3 text-sm text-slate-700 list-disc list-inside leading-relaxed">
            <li><strong>No Prior Pucca House:</strong> The beneficiary family (husband, wife, and unmarried children) must not own a pucca house anywhere in India.</li>
            <li><strong>Female Ownership Requirement:</strong> For EWS and LIG categories, an adult female member must be the sole or joint owner of the residential property.</li>
            <li><strong>Aadhaar Identification:</strong> All household members must provide verified Aadhaar numbers linked to their biometric KYC.</li>
            <li><strong>Direct Lender Application:</strong> You do not apply through private agents; your home loan lending bank or HFC uploads your application directly into the central PMAY MIS portal.</li>
          </ul>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Subsidized Home Loans
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Looking to Apply for a PMAY-Eligible Home Loan?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Compare public and private lenders offering PMAY-U 2.0 interest subvention and calculate your net monthly EMI after subsidy credit.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/loans/home/overview"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Check PMAY Lender Eligibility &rarr;
            </Link>
            <Link
              to="/home-loan-emi-calculator"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Calculate Post-Subsidy EMI
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Government Scheme Notice</span>
          </div>
          <p>
            Pradhan Mantri Awas Yojana is administered by the Ministry of Housing and Urban Affairs (MoHUA), Government of India. Subsidy disbursals are managed via Central Nodal Agencies (NHB, SBI, HUDCO). BanksCart is not an agency of the Government of India and charges zero processing fees for government scheme information.
          </p>
        </div>
      </article>
    </div>
  );
}
