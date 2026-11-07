import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, Clock, ShieldCheck, TrendingUp } from 'lucide-react';

export default function FinancialGuidesSection() {
  const guides = [
    {
      id: 'cibil-improvement',
      category: 'Credit Score',
      categoryColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      title: '7 Proven Ways to Improve Your CIBIL Score from 650 to 750+',
      description: 'Step-by-step strategies to eliminate credit report disputes, lower credit utilization ratio, and unlock prime loan interest rates.',
      readTime: '5 min read',
      link: '/credit-report/ways-to-improve-your-cibil-score',
    },
    {
      id: 'loan-vs-card',
      category: 'Borrowing Advice',
      categoryColor: 'bg-blue-50 text-blue-800 border-blue-200',
      title: 'Personal Loan vs Credit Card: Which is Better for Emergency Cash?',
      description: 'Comparing interest rate calculations, repayment tenures, processing charges, and impact on monthly cash flow for Indian borrowers.',
      readTime: '6 min read',
      link: '/blog/Personal-Loan-Vs-Credit-Card',
    },
    {
      id: 'home-loan-guide',
      category: 'Housing Finance',
      categoryColor: 'bg-amber-50 text-amber-800 border-amber-200',
      title: 'Complete Home Loan Guide: Interest Rates, Tax Deductions & Eligibility',
      description: 'Everything you need to know about Section 80C & 24(b) tax savings, floating vs fixed interest rates, and balance transfer savings.',
      readTime: '8 min read',
      link: '/blog/Home-Loan-Guide',
    },
    {
      id: 'best-credit-cards',
      category: 'Credit Cards',
      categoryColor: 'bg-purple-50 text-purple-800 border-purple-200',
      title: 'Best Credit Cards in India: Cashback, Lounge Access & Zero Annual Fees',
      description: 'Comprehensive review of leading bank cards in India offering maximum reward multipliers, fuel surcharge waivers, and airport lounge access.',
      readTime: '7 min read',
      link: '/blog/Best-Credit-Cards',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-slate-50 font-ibm border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5 text-blue-900" />
              <span>Financial Knowledge Base</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Educational Guides &amp; Borrowing Advice
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              Make informed borrowing decisions with research-backed articles prepared by certified financial analysts.
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-900 hover:text-blue-700 hover:underline shrink-0"
          >
            <span>View All Financial Articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map((guide) => (
            <article
              key={guide.id}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-200 group"
            >
              <div>
                {/* Meta Row */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${guide.categoryColor}`}>
                    {guide.category}
                  </span>
                  <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {guide.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 mb-2 leading-snug group-hover:text-blue-900 transition-colors">
                  <Link to={guide.link}>{guide.title}</Link>
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {guide.description}
                </p>
              </div>

              {/* Read Link */}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link
                  to={guide.link}
                  className="text-xs font-bold text-slate-900 group-hover:text-blue-900 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
