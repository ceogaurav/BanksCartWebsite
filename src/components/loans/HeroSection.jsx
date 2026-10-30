import React from "react";
import ApplyButton from "../common/ApplyButton";
import { Link } from "react-router-dom";

/**
 * @param {object} props
 * @param {(loanType?: string) => void} [props.openApplyModal]
 * @param {() => void} [props.openEligibilityModal]
 */
const HeroSection = ({ openApplyModal, openEligibilityModal }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white pt-10 pb-16 px-4 md:px-8 shadow-xl">
      {/* Decorative background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Trust badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-6 shadow-sm">
          <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span>India's Most Trusted Personal Loan Marketplace • RBI-Regulated Lenders</span>
        </div>

        {/* Primary Heading (H1) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
          Personal Loans in India: <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-200 to-cyan-200">Compare & Apply Online</span>
        </h1>

        {/* Subtitle with verified terms */}
        <p className="text-base sm:text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto mb-8 leading-relaxed font-normal">
          Get personal loans up to <strong className="text-white font-semibold">₹50 Lakhs</strong> with interest rates starting at <strong className="text-white font-semibold">10.25% p.a.</strong> Enjoy 100% digital paperwork, flexible tenures up to 72 months, and instant disbursal from top banks and NBFCs.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          {openApplyModal ? (
            <ApplyButton
              loanType="Personal Loan"
              openApplyModal={openApplyModal}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-slate-900 font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-teal-500/25 transition-all transform hover:-translate-y-0.5"
            >
              Apply for a Personal Loan
            </ApplyButton>
          ) : (
            <button
              onClick={() => {
                const el = document.getElementById("emi-calculator");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-slate-900 font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-teal-500/25 transition-all transform hover:-translate-y-0.5"
            >
              Apply for a Personal Loan
            </button>
          )}

          {openEligibilityModal && (
            <button
              type="button"
              onClick={openEligibilityModal}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-7 py-3.5 rounded-xl transition-all backdrop-blur-sm"
            >
              Check Free Eligibility
            </button>
          )}

          <Link
            to="/loans/personal/overview"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-cyan-300 hover:text-white font-medium px-4 py-3 text-sm underline-offset-4 hover:underline transition-colors"
          >
            <span>Detailed Bank Overview & Guide</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-4 border-t border-white/10">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="text-xs text-blue-200">Interest Rates</div>
            <div className="text-sm sm:text-base font-bold text-teal-300">10.25% - 24% p.a.</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="text-xs text-blue-200">Max Loan Amount</div>
            <div className="text-sm sm:text-base font-bold text-white">Up to ₹50 Lakhs</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="text-xs text-blue-200">Repayment Tenure</div>
            <div className="text-sm sm:text-base font-bold text-white">12 to 72 Months</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
            <div className="text-xs text-blue-200">Processing Fee</div>
            <div className="text-sm sm:text-base font-bold text-white">0.5% - 2.5% + GST</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
