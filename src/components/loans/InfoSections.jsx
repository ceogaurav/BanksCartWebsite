import React from "react";
import { Link } from "react-router-dom";

const tips = [
  {
    title: "Check Your Credit Score First",
    desc: "A CIBIL score of 720 or higher qualifies you for prime benchmark rates and expedited sanction.",
  },
  {
    title: "Limit Multiple Applications in Short Windows",
    desc: "Every hard inquiry temporarily reduces your score. Compare quotes on BanksCart with zero credit impact before applying.",
  },
  {
    title: "Keep FOIR Under 40% – 50%",
    desc: "Ensure your existing EMIs plus the proposed new EMI do not exceed half of your net monthly earnings.",
  },
  {
    title: "Verify Bank Statements & KYC Ahead of Time",
    desc: "Ensure salary credits reflect consistently in your primary operating bank account without recent un-cleared cheques.",
  },
];

const dosDonts = [
  {
    do: "Choose the shortest tenure you can comfortably afford to minimize total interest outflow.",
    dont: "Don’t borrow more than necessary simply because a higher pre-approved limit is available.",
  },
  {
    do: "Read the Key Fact Statement (KFS) detailing the Annual Percentage Rate (APR) and processing fees.",
    dont: "Don’t ignore foreclosure, part-prepayment lock-in terms, or bounce penalties in the sanction letter.",
  },
  {
    do: "Set up auto-debit (e-NACH mandate) to ensure you never miss an EMI due date.",
    dont: "Don’t submit incomplete or expired KYC documents that trigger manual verification delays.",
  },
];

const glossary = [
  {
    term: "Annual Percentage Rate (APR)",
    def: "The comprehensive annualized cost of borrowing, comprising the nominal interest rate, processing fee, and mandatory administrative charges.",
  },
  {
    term: "Reducing-Balance Interest",
    def: "A method where interest is computed solely on the remaining unpaid principal at the end of each monthly billing cycle, reducing your interest burden.",
  },
  {
    term: "Soft vs. Hard Credit Inquiry",
    def: "A soft inquiry checks your eligibility without affecting your credit rating. A hard inquiry is conducted upon final loan submission and is recorded on your credit report.",
  },
  {
    term: "Key Fact Statement (KFS)",
    def: "An RBI-mandated standardized document provided by lenders upfront, summarizing all fees, APR, repayment schedule, and grievance redressal channels.",
  },
];

const InfoSections = () => (
  <section className="my-14 space-y-10">
    {/* Tips for Approval */}
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
        <h3 className="text-xl font-bold text-gray-900">
          Top Strategies to Maximize Personal Loan Approval Odds
        </h3>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {tips.map((t) => (
          <div
            key={t.title}
            className="p-4 rounded-xl bg-slate-50 border border-gray-100 flex items-start gap-3"
          >
            <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              ✓
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">{t.title}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{t.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Do's and Don'ts */}
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
        <h3 className="text-xl font-bold text-gray-900">
          Personal Loan Application: Essential Do's & Don'ts
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-slate-50">
              <th className="px-5 py-3 font-bold text-emerald-800 w-1/2">
                What You Should Do (Recommended)
              </th>
              <th className="px-5 py-3 font-bold text-rose-800 w-1/2">
                What You Must Avoid (Critical Mistakes)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dosDonts.map((row, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                <td className="px-5 py-3 text-gray-700 text-xs sm:text-sm leading-relaxed align-top">
                  <span className="text-emerald-600 font-bold mr-1.5">✓</span>
                  {row.do}
                </td>
                <td className="px-5 py-3 text-gray-700 text-xs sm:text-sm leading-relaxed align-top">
                  <span className="text-rose-600 font-bold mr-1.5">✕</span>
                  {row.dont}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Financial Glossary */}
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
          <h3 className="text-xl font-bold text-gray-900">
            Personal Finance Glossary for Borrowers
          </h3>
        </div>
        <Link
          to="/loans/personal/overview"
          className="text-xs text-blue-600 hover:underline font-semibold"
        >
          Explore All Terms →
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {glossary.map((item) => (
          <div
            key={item.term}
            className="p-4 rounded-xl bg-slate-50/80 border border-gray-100"
          >
            <div className="font-bold text-gray-900 text-sm mb-1">
              {item.term}
            </div>
            <div className="text-xs text-gray-600 leading-relaxed">
              {item.def}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default InfoSections;
