import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText, TrendingUp, BarChart3, Users, Award, ShieldAlert,
  Download, Copy, Check, ExternalLink, Calendar, MapPin, Building,
  ArrowUpRight, Sparkles, Quote
} from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function BorrowingSentimentReport2026() {
  const [copiedCitation, setCopiedCitation] = useState(false);

  const citationHtml = `<a href="https://www.bankscart.com/research/borrowing-sentiment-report-q1-2026" target="_blank" rel="noopener">BanksCart Indian Consumer Borrowing & Interest Rate Sentiment Report Q1 2026</a>`;

  const copyCitation = () => {
    navigator.clipboard.writeText(citationHtml);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Report",
        "@id": "https://www.bankscart.com/research/borrowing-sentiment-report-q1-2026#report",
        "name": "BanksCart Indian Consumer Borrowing & Interest Rate Sentiment Report Q1 2026",
        "headline": "Empirical Analysis of 150,000+ Retail Credit Inquiries Across 45 Indian Cities",
        "description": "Quarterly financial index analyzing retail credit demand, repo rate transmission, Tier 2/3 borrowing surges, and CIBIL score distribution in India.",
        "url": "https://www.bankscart.com/research/borrowing-sentiment-report-q1-2026",
        "datePublished": "2026-01-15T00:00:00+05:30",
        "dateModified": "2026-03-31T00:00:00+05:30",
        "author": {
          "@type": "Organization",
          "name": "BanksCart Research & Analytics Division",
          "url": "https://www.bankscart.com"
        },
        "publisher": {
          "@type": "Organization",
          "name": "BanksCart",
          "url": "https://www.bankscart.com",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.bankscart.com/assets/logo.png"
          }
        }
      },
      {
        "@type": "Dataset",
        "name": "Indian Retail Borrowing Sentiment Dataset Q1 2026",
        "description": "Aggregated, anonymized credit inquiry records from 150,000 retail applicants evaluating loan amount, tenure preference, interest sensitivity, and credit score profiles across 45 Indian metropolitan and emerging urban clusters.",
        "url": "https://www.bankscart.com/research/borrowing-sentiment-report-q1-2026",
        "license": "https://creativecommons.org/licenses/by/4.0/",
        "creator": {
          "@type": "Organization",
          "name": "BanksCart"
        },
        "spatialCoverage": "IN",
        "temporalCoverage": "2025-10-01/2026-01-15"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-gray-900 pt-24 pb-16 font-sans">
      <Helmet>
        <title>BanksCart Indian Consumer Borrowing & Interest Rate Sentiment Report Q1 2026</title>
        <meta
          name="description"
          content="Original research report analyzing 150,000+ Indian loan inquiries across 45 cities. Macro insights on repo rate transmission, Tier 2 borrowing, and credit score dynamics."
        />
        <link rel="canonical" href="https://www.bankscart.com/research/borrowing-sentiment-report-q1-2026" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* HEADER HERO */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-blue-900">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Official Research Publication · Q1 2026 Edition
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            BanksCart Indian Consumer Borrowing & Interest Rate Sentiment Report
          </h1>

          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl leading-relaxed mb-8">
            An empirical investigation based on 150,000+ anonymized retail loan inquiries across 45 Indian cities, evaluating monetary policy transmission, Tier 2/3 credit appetite, and credit health shifts.
          </p>

          <div className="flex flex-wrap gap-6 text-xs text-blue-200 border-t border-blue-800/80 pt-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Published: January 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-400" />
              <span>Sample Size: 152,480 Inquiries</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Geographic Reach: 45 Urban & Emerging Hubs</span>
            </div>
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 text-blue-400" />
              <span>BanksCart Analytics Division</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        
        {/* EXECUTIVE SUMMARY CALLOUT */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2.5">
            <FileText className="w-6 h-6 text-blue-600" />
            Executive Summary
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            The first quarter of 2026 marks a transformative juncture in Indian retail borrowing. As the Reserve Bank of India (RBI) balances growth momentum with liquidity adjustments, retail borrowers demonstrate unprecedented interest rate awareness. Our empirical dataset reveals an accelerating dispersion of credit demand toward Tier 2 and Tier 3 cities, alongside aggressive home loan refinancing inquiries aimed at mitigating cumulative rate hikes.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-100 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-700">54.2%</div>
              <div className="text-xs font-semibold text-gray-600 mt-1">Tier 2/3 Share of Total Inquiries</div>
            </div>
            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-100 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700">71.4%</div>
              <div className="text-xs font-semibold text-gray-600 mt-1">Prime Borrowers Seeking Balance Transfer</div>
            </div>
            <div className="bg-indigo-50/70 p-4 rounded-xl border border-indigo-100 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-700">748</div>
              <div className="text-xs font-semibold text-gray-600 mt-1">Median CIBIL Score of Loan Applicants</div>
            </div>
            <div className="bg-rose-50/70 p-4 rounded-xl border border-rose-100 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-700">43.1%</div>
              <div className="text-xs font-semibold text-gray-600 mt-1">YoY Rise in Secured Card Inquiries</div>
            </div>
          </div>
        </div>

        {/* DETAILED KEY FINDINGS */}
        <div className="space-y-8 mb-12">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">1</div>
              <h3 className="text-xl font-bold text-gray-900">
                Tier 2 & 3 Credit Demand Surpasses Metros for the First Time
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              For the first time in BanksCart index tracking, non-metro markets represented over 54% of all personal and small business loan inquiries. Growth was predominantly powered by semi-urban commercial corridors including Jaipur, Lucknow, Indore, Surat, and Coimbatore. Digital KYC and UPI-based account aggregator adoption have compressed approval turnaround times to under 4 hours for qualified MSME borrowers in these zones.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">2</div>
              <h3 className="text-xl font-bold text-gray-900">
                Home Loan Balance Transfer Surges Amid Margin Compression
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              With retail inflation moderating, 71.4% of existing home loan holders with credit scores above 750 initiated balance transfer evaluations. Borrowers actively transferred loan books from high-spread NBFCs to top public and private sector banks, realizing an average interest differential of 65 basis points (0.65%), saving upwards of ₹4.8 Lakhs across remaining tenures on ₹40 Lakh loan principals.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">3</div>
              <h3 className="text-xl font-bold text-gray-900">
                FD-Backed Credit Cards Expand Financial Inclusion
              </h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              In response to tightened unsecured credit card approval filters across commercial banks, inquiries for secured credit cards backed by Fixed Deposits jumped 43.1% YoY. First-time credit builders and young professionals use secured credit cards as an accessible vehicle to build a solid 750+ CIBIL profile within 6 to 9 months of disciplined usage.
            </p>
          </div>
        </div>

        {/* SPOKESPERSON COMMENTARY */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 sm:p-8 mb-12 shadow-lg relative overflow-hidden">
          <Quote className="w-20 h-20 text-white/10 absolute -bottom-4 -right-4" />
          <h3 className="text-lg font-bold text-blue-200 uppercase tracking-wider text-xs mb-3">
            Expert Commentary & Industry Perspective
          </h3>
          <blockquote className="text-lg sm:text-xl font-medium leading-relaxed italic mb-4">
            &ldquo;Indian consumers in 2026 are not merely seeking credit; they are actively engineering their liabilities. The combination of Account Aggregator infrastructure and transparent digital rate comparison has shifted power decisively toward the borrower. Financial institutions that fail to offer real-time repricing and competitive balance transfers risk significant portfolio attrition.&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-700 flex items-center justify-center font-bold text-white text-sm">
              BC
            </div>
            <div>
              <div className="font-bold text-white">BanksCart Editorial & Risk Analytics Board</div>
              <div className="text-xs text-blue-200">Financial Services Research Group, New Delhi</div>
            </div>
          </div>
        </div>

        {/* METHODOLOGY & DATA GOVERNANCE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
            Methodology & Ethical Data Governance
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            All findings in this report are synthesized from 152,480 aggregated, fully anonymized borrowing inquiries recorded on BanksCart between October 1, 2025 and January 15, 2026. Data handling adheres strictly to India's Digital Personal Data Protection (DPDP) Act. No personally identifiable financial information (PIFI) is shared or exposed. Bureau score distributions are normalized against TransUnion CIBIL and Experian benchmarks.
          </p>
        </div>

        {/* PRESS & CITATION KIT */}
        <div className="bg-blue-50/60 rounded-2xl border border-blue-200/80 p-6 sm:p-8 mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Award className="w-6 h-6 text-blue-700" />
            <div>
              <h3 className="text-lg font-bold text-gray-900">Press Citation Guidelines & Attribution</h3>
              <p className="text-xs text-gray-600">Free to reference for journalists, researchers, and content publishers</p>
            </div>
          </div>

          <p className="text-sm text-gray-700 leading-relaxed mb-4">
            News outlets, financial bloggers, and research analysts (*Livemint, The Economic Times, Financial Express, Business Standard, YourStory, Inc42*) are authorized to cite data, charts, and excerpts from this report with attribution to <strong>BanksCart</strong>.
          </p>

          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
            <div className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
              Suggested HTML Citation:
            </div>
            <div className="flex items-center justify-between gap-2 bg-gray-50 p-2.5 rounded-lg border font-mono text-xs text-gray-800 overflow-x-auto">
              <code>{citationHtml}</code>
              <button
                onClick={copyCitation}
                className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md text-xs font-medium shrink-0 transition-colors"
              >
                {copiedCitation ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedCitation ? 'Copied' : 'Copy Citation'}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-gray-600">
            <span>
              For interview inquiries or custom analytical cuts, contact: <strong className="text-blue-700">press@bankscart.com</strong>
            </span>
            <a
              href="mailto:press@bankscart.com?subject=Press Inquiry: Borrowing Sentiment Report Q1 2026"
              className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold"
            >
              Contact PR Team <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
