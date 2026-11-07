import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, TrendingDown, Percent, Info } from 'lucide-react';
import { personalLoanProducts } from '../../data/personalLoanProducts';
import { homeLoanProducts } from '../../data/homeLoanProducts';
import { businessLoanProducts } from '../../data/businessLoanProducts';

interface LoanComparisonSectionProps {
  openEligibilityModal?: (loanType?: string) => void;
  openApplyModal?: (loanType?: string) => void;
}

export default function LoanComparisonSection({
  openEligibilityModal,
  openApplyModal
}: LoanComparisonSectionProps) {
  const [activeCategory, setActiveCategory] = useState<'personal' | 'home' | 'business'>('personal');

  const getActiveProducts = () => {
    switch (activeCategory) {
      case 'personal':
        return personalLoanProducts.slice(0, 4);
      case 'home':
        return homeLoanProducts.slice(0, 4);
      case 'business':
        return businessLoanProducts.slice(0, 4);
      default:
        return personalLoanProducts.slice(0, 4);
    }
  };

  const getCategoryTitle = () => {
    switch (activeCategory) {
      case 'personal':
        return 'Personal Loan';
      case 'home':
        return 'Home Loan';
      case 'business':
        return 'Business Loan';
    }
  };

  const activeProducts = getActiveProducts();

  return (
    <section id="loan-comparison-matrix" className="py-16 sm:py-20 bg-slate-50 font-ibm border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded text-xs font-bold text-blue-900 uppercase tracking-wider mb-2">
              <span>Verified Rate Matrix</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Compare Multi-Bank Loan Offers
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1 max-w-2xl">
              Real-time interest rates, tenure limits, and processing charges from leading Indian scheduled commercial banks.
            </p>
          </div>

          {/* Category Switcher Tabs */}
          <div className="inline-flex p-1 bg-white border border-slate-200 rounded-lg shadow-sm">
            <button
              type="button"
              onClick={() => setActiveCategory('personal')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                activeCategory === 'personal'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Personal Loans
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('home')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                activeCategory === 'home'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Home Loans
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('business')}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-colors cursor-pointer ${
                activeCategory === 'business'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Business Loans
            </button>
          </div>
        </div>

        {/* Product Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeProducts.map((product, idx) => (
            <div
              key={product.id || idx}
              className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all duration-200 group relative"
            >
              {/* Highlight Tag for Top Offer */}
              {idx === 0 && (
                <span className="absolute -top-3 left-4 bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded shadow-sm">
                  Lowest Interest Rate
                </span>
              )}

              <div>
                {/* Bank Header */}
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                  <div className="w-11 h-11 rounded-lg bg-slate-50 border border-slate-100 p-1 flex items-center justify-center shrink-0">
                    <img
                      src={product.logo}
                      alt={product.name}
                      width="36"
                      height="36"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 leading-snug group-hover:text-blue-900 transition-colors">
                      {product.name}
                    </h3>
                    <span className="text-[11px] text-slate-500 font-medium">RBI Partner Bank</span>
                  </div>
                </div>

                {/* 3-Metric Specification Stack */}
                <div className="space-y-3 mb-6">
                  {/* Metric 1: Rate */}
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-500 font-medium">Interest Rate</span>
                    <span className="text-base font-bold text-slate-900 tabular-nums">
                      {product.interestRate}
                    </span>
                  </div>

                  {/* Metric 2: Max Amount */}
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-500 font-medium">Max Loan Amount</span>
                    <span className="text-xs font-semibold text-slate-800">
                      {product.maxLoanAmount}
                    </span>
                  </div>

                  {/* Metric 3: Tenure */}
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-500 font-medium">Loan Tenure</span>
                    <span className="text-xs font-semibold text-slate-800">
                      {product.loanTenure}
                    </span>
                  </div>

                  {/* Metric 4: Processing Fee */}
                  <div className="flex justify-between items-baseline pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-500">Processing Fee</span>
                    <span className="text-[11px] font-semibold text-slate-700">
                      {product.processingFee}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  onClick={() => openEligibilityModal ? openEligibilityModal(`${product.name}`) : null}
                  className="w-full py-2.5 px-3 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-semibold text-xs tracking-wide transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <span>Check Eligibility</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <Link
                  to="/resources/loan-rates"
                  className="w-full py-2 px-3 text-center text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors block border border-transparent hover:border-slate-200"
                >
                  View Details &amp; Fees
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Footer Link Strip */}
        <div className="mt-10 p-4 bg-white rounded-xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-700 shrink-0" />
            <span>
              Rates updated as of official commercial bank disclosures. Final APR depends on applicant credit score and lender policies.
            </span>
          </div>
          <Link
            to="/resources/loan-rates"
            className="font-bold text-blue-900 hover:underline shrink-0 flex items-center gap-1"
          >
            <span>Full Multi-Bank Rate Table</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </section>
  );
}
