import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  Car,
  Bike,
  CheckCircle2,
  Percent,
  Clock,
  ShieldCheck,
  TrendingDown,
  Building,
  HelpCircle,
  FileCheck2,
  Zap,
  Scale
} from 'lucide-react';

export default function VehicleFinancingGuide() {
  const canonicalUrl = "https://www.bankscart.com/blog/Vehicle-Financing-Guide";
  const articleTitle = "The Complete Vehicle Financing Guide: Four-Wheelers, Two-Wheelers & EVs (2026)";
  const articleDesc = "Master vehicle loans in India: comprehensive 2026 guide comparing new car, used car, and bike financing rates, RTO hypothecation removal, and electric vehicle incentives.";

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
    "datePublished": "2026-01-29T09:00:00+05:30",
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
        "name": "Vehicle Financing Guide",
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
        <Breadcrumb path={["Home", "Blog", "Vehicle Financing Guide"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-blue-700">
            <span className="bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
              Automotive Compendium
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">15 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            The Complete Vehicle Financing Guide: Four-Wheelers, Two-Wheelers &amp; EVs (2026)
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Whether purchasing a family SUV, an electric scooter, or a certified pre-owned car, automotive debt is structured differently from standard retail credit. Here is how interest margins, dealer markups, and RTO hypothecation work.
          </p>

          <AuthorByline authorSlug="amit-khurana" />
        </header>

        {/* Section 1: Vehicle Category Overview */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Scale className="w-6 h-6 text-blue-700" />
            1. Financing Landscape: Cars vs. Used Cars vs. Two-Wheelers
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-900 border-b border-slate-200">
                  <th className="p-3 font-bold">Vehicle Segment</th>
                  <th className="p-3 font-bold">Interest Rate Range</th>
                  <th className="p-3 font-bold">Typical Max Tenure</th>
                  <th className="p-3 font-bold">Financing LTV</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700 font-sans">
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">New Four-Wheeler (ICE)</td>
                  <td className="p-3 tabular-nums font-mono font-bold text-emerald-700">8.65% - 10.50%</td>
                  <td className="p-3">Up to 7 Years</td>
                  <td className="p-3">85% to 100% on-road</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">New Electric Car (EV)</td>
                  <td className="p-3 tabular-nums font-mono font-bold text-emerald-700">8.45% - 10.25%</td>
                  <td className="p-3">Up to 8 Years</td>
                  <td className="p-3">Up to 90% on-road</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">Certified Pre-Owned Car</td>
                  <td className="p-3 tabular-nums font-mono font-bold text-amber-700">11.50% - 16.50%</td>
                  <td className="p-3">Up to 5 Years</td>
                  <td className="p-3">75% to 85% of appraised IDV</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-900">Two-Wheeler / Scooter</td>
                  <td className="p-3 tabular-nums font-mono font-bold text-amber-700">10.50% - 18.00%</td>
                  <td className="p-3">Up to 4 Years</td>
                  <td className="p-3">Up to 95% on-road</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: RTO Hypothecation Removal */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-blue-700" />
            2. The Final Step: RTO Hypothecation (HP) Removal
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            When you finish paying off your vehicle loan, the car is still technically hypothecated to the bank in government records. To obtain a clean Registration Certificate (RC), follow these steps within 90 days:
          </p>
          <ol className="space-y-2.5 text-sm text-slate-700 list-decimal list-inside leading-relaxed">
            <li>Collect the original <strong>No Objection Certificate (NOC)</strong> and two signed copies of <strong>Form 35</strong> from the lending bank.</li>
            <li>Submit the NOC, Form 35, original RC, valid insurance copy, and PUC certificate to your local RTO or via the Parivahan Sewa portal.</li>
            <li>Pay the nominal government fee (₹200 to ₹500) to receive an updated smart card RC showing zero lien.</li>
          </ol>
        </section>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Vehicle Finance Tool
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Compare Live Auto Loan Rates Across 30+ Banks
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Calculate your monthly repayments, compare on-road financing terms, and check pre-approved vehicle loan limits.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/car-loan-calculator"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Open Vehicle Loan Calculator &rarr;
            </Link>
            <Link
              to="/blog/Car-Loan-Rates-2026"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Compare Car Loan Rates
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Motor Vehicles Act Disclaimer</span>
          </div>
          <p>
            Vehicle hypothecation, lien endorsements, and ownership transfers are regulated under the Motor Vehicles Act, 1988 and Central Motor Vehicles Rules (CMVR). BanksCart provides comparative analytics and does not lend directly.
          </p>
        </div>
      </article>
    </div>
  );
}
