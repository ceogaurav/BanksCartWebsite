import React from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Check Eligibility in 2 Minutes",
    desc: "Enter your primary mobile number, employment type, monthly take-home salary, and desired loan requirement.",
  },
  {
    step: "02",
    title: "Compare Personalized Bank Quotes",
    desc: "View pre-qualified loan options from 30+ top banks & NBFCs with real-time interest rates and EMI estimates.",
  },
  {
    step: "03",
    title: "Digital e-KYC Verification",
    desc: "Authenticate your identity via Aadhaar OTP and verify income securely via Account Aggregator or NetBanking.",
  },
  {
    step: "04",
    title: "Instant Sanction & E-Mandate",
    desc: "Review your digital sanction letter and Key Fact Statement (KFS), then authorize automatic monthly e-NACH repayments.",
  },
  {
    step: "05",
    title: "Direct Disbursal to Bank Account",
    desc: "Sanctioned funds are disbursed directly into your verified savings bank account via NEFT/RTGS within hours.",
  },
];

const ApplicationSteps = ({ openApplyModal }) => (
  <section className="my-14 font-ibm">
    <div className="text-center max-w-3xl mx-auto mb-10">
      <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
        Simple 5-Step Journey
      </span>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
        How to Apply for a Personal Loan on BanksCart
      </h2>
      <p className="text-slate-600 text-sm sm:text-base mt-2">
        A completely digital, paperless process designed for speed, security, and maximum approval certainty.
      </p>
    </div>

    <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 md:p-12 shadow-xl border border-slate-800 relative overflow-hidden">
      <div className="grid md:grid-cols-5 gap-6 relative z-10">
        {steps.map((item) => (
          <div
            key={item.step}
            className="bg-slate-800/70 border border-slate-700/80 rounded-xl p-5 flex flex-col justify-between transition-all duration-200 hover:border-slate-600 hover:bg-slate-800"
          >
            <div>
              <div className="inline-block text-amber-400 font-extrabold text-2xl tracking-tight mb-3 border-b border-amber-400/30 pb-1 tabular-nums">
                {item.step}
              </div>
              <h3 className="font-bold text-base text-white mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Zero upfront processing fees charged by BanksCart. 100% free loan comparison service.</span>
        </div>

        {openApplyModal && (
          <button
            type="button"
            onClick={() => openApplyModal("Personal Loan")}
            className="w-full sm:w-auto h-11 px-8 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-2 cursor-pointer text-sm shrink-0"
          >
            <span>Start Your Application</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  </section>
);

export default ApplicationSteps;
