import React from "react";
import ApplyButton from "../common/ApplyButton";

const steps = [
  {
    step: "01",
    title: "Check Eligibility in 2 Minutes",
    desc: "Enter your primary mobile number, employment status, monthly income, and required loan amount.",
  },
  {
    step: "02",
    title: "Compare Personalized Bank Offers",
    desc: "View pre-qualified loan options from 15+ top banks & NBFCs with real-time interest rates and EMI estimates.",
  },
  {
    step: "03",
    title: "Complete Digital e-KYC Verification",
    desc: "Seamlessly authenticate your identity via Aadhaar OTP and upload salary slips or net-banking statements.",
  },
  {
    step: "04",
    title: "Instant Sanction & E-Mandate Setup",
    desc: "Receive digital sanction letter, review Key Fact Statement (KFS), and authorize automatic monthly repayments.",
  },
  {
    step: "05",
    title: "Direct Disbursal to Bank Account",
    desc: "Funds are credited directly to your verified savings bank account, often within hours of e-sign completion.",
  },
];

const ApplicationSteps = ({ openApplyModal }) => (
  <section className="my-14">
    <div className="text-center max-w-3xl mx-auto mb-10">
      <span className="inline-block bg-teal-50 text-teal-700 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
        Simple 5-Step Journey
      </span>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
        How to Apply for a Personal Loan on BanksCart
      </h2>
      <p className="text-gray-600 text-sm sm:text-base mt-2">
        A completely digital, paperless process designed for speed, security, and maximum approval certainty.
      </p>
    </div>

    <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid md:grid-cols-5 gap-6 relative z-10">
        {steps.map((item) => (
          <div
            key={item.step}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
          >
            <div>
              <div className="inline-block text-teal-400 font-extrabold text-2xl tracking-tighter mb-3 border-b border-teal-500/30 pb-1">
                {item.step}
              </div>
              <h3 className="font-bold text-base text-white mb-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-blue-100/80 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4">
        {openApplyModal ? (
          <ApplyButton
            loanType="Personal Loan"
            openApplyModal={openApplyModal}
            variant="primary"
            size="lg"
            className="w-full sm:w-auto bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-500 hover:to-emerald-500 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-teal-500/25 transition-all"
          >
            Start Your Loan Application
          </ApplyButton>
        ) : (
          <button
            onClick={() => {
              const el = document.getElementById("emi-calculator");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full sm:w-auto bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-500 hover:to-emerald-500 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-teal-500/25 transition-all"
          >
            Start Your Loan Application
          </button>
        )}
      </div>

      <div className="mt-6 text-center text-xs text-blue-200/70">
        🔒 256-Bit SSL Encrypted • Zero Hard Inquiries for Eligibility Checks • Free Service
      </div>
    </div>
  </section>
);

export default ApplicationSteps;
