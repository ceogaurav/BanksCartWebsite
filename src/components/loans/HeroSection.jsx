import React from "react";
import ApplyButton from "../common/ApplyButton";
import { Link } from "react-router-dom";
import { ShieldCheck, ArrowRight, CheckCircle2, ChevronRight, Percent, Award, Clock } from "lucide-react";

/**
 * @param {object} props
 * @param {(loanType?: string) => void} [props.openApplyModal]
 * @param {(loanType?: string) => void} [props.openEligibilityModal]
 */
const HeroSection = ({ openApplyModal, openEligibilityModal }) => {
  return (
    <section className="relative overflow-hidden bg-slate-900 text-white pt-10 pb-16 px-4 md:px-8 border-b border-slate-800 font-ibm">
      {/* Subtle institutional ambient depth */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-slate-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Trust pill badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-800/90 border border-slate-700 rounded-lg text-xs font-semibold text-slate-200 mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>India&apos;s Independent Multi-Bank Loan Comparison • RBI-Regulated Lenders</span>
        </div>

        {/* Primary Heading (H1) */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
          Compare Personal Loan Interest Rates &amp; <span className="text-amber-400">Apply Online in India</span>
        </h1>

        {/* Subtitle with verified terms */}
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed font-normal">
          Compare lowest personal loan interest rates starting at <strong className="text-white font-semibold">10.25% p.a.</strong> across 30+ Indian scheduled banks &amp; NBFCs. Check your <strong className="text-white font-semibold">CIBIL cut-off score (720+)</strong>, compare processing fees (0.5%–2.5%), zero pre-closure charges, and instant paperless disbursal.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          {openApplyModal ? (
            <button
              type="button"
              onClick={() => openApplyModal("Personal Loan")}
              className="w-full sm:w-auto h-12 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold px-8 rounded-lg shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Apply for a Personal Loan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("emi-calculator");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full sm:w-auto h-12 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold px-8 rounded-lg shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Apply for a Personal Loan</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          {openEligibilityModal && (
            <button
              type="button"
              onClick={() => openEligibilityModal("Personal Loan")}
              className="w-full sm:w-auto h-12 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 font-semibold px-7 rounded-lg transition-all hover:text-white hover:border-slate-600 inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Check Free Eligibility</span>
            </button>
          )}

          <Link
            to="/loans/personal/overview"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-slate-300 hover:text-amber-400 font-medium px-4 py-3 text-sm transition-colors"
          >
            <span>Detailed Bank Guide</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Financial Metric Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-slate-800">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-3.5 border border-slate-700/60 text-left">
            <div className="text-xs text-slate-400 font-medium">Interest Rates</div>
            <div className="text-sm sm:text-base font-bold text-amber-400 tabular-nums">10.25% - 24% p.a.</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Reducing balance basis</div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-3.5 border border-slate-700/60 text-left">
            <div className="text-xs text-slate-400 font-medium">Max Loan Amount</div>
            <div className="text-sm sm:text-base font-bold text-white tabular-nums">Up to ₹50 Lakhs</div>
            <div className="text-[11px] text-slate-400 mt-0.5">High take-home limits</div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-3.5 border border-slate-700/60 text-left">
            <div className="text-xs text-slate-400 font-medium">Repayment Tenure</div>
            <div className="text-sm sm:text-base font-bold text-white tabular-nums">12 to 72 Months</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Flexible EMI tenures</div>
          </div>
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-3.5 border border-slate-700/60 text-left">
            <div className="text-xs text-slate-400 font-medium">Processing Fee</div>
            <div className="text-sm sm:text-base font-bold text-emerald-400 tabular-nums">0.5% - 2.5% + GST</div>
            <div className="text-[11px] text-slate-400 mt-0.5">0% foreclosure per RBI</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
