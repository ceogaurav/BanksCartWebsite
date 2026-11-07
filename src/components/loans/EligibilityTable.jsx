import React from "react";
import { CheckCircle2, ArrowRight } from "lucide-react";

const criteria = [
  {
    label: "Age Range",
    salaried: "21 – 60 years",
    selfEmployed: "23 – 65 years",
    notes: "Must not exceed retirement age at loan maturity.",
  },
  {
    label: "Minimum Monthly Income",
    salaried: "₹15,000 – ₹25,000/month",
    selfEmployed: "Annual turnover / ITR > ₹3.5 – ₹5 Lakhs",
    notes: "Tier-1 cities (Mumbai, Bengaluru, Delhi-NCR) typically require higher minimum salary.",
  },
  {
    label: "Credit Score (CIBIL)",
    salaried: "720+ preferred",
    selfEmployed: "720+ preferred",
    notes: "Scores between 650–719 may be considered with higher interest rate or co-applicant.",
  },
  {
    label: "Employment Stability",
    salaried: "Minimum 1 year total, 6 months with current employer",
    selfEmployed: "Minimum 2–3 years of continuous business vintage",
    notes: "Salaried applicants should be in confirmed permanent employment.",
  },
  {
    label: "Fixed Obligation to Income (FOIR)",
    salaried: "Below 40% – 50%",
    selfEmployed: "Below 45% – 50%",
    notes: "Total monthly debt obligations (including new proposed EMI) must not exceed 50% of net take-home salary.",
  },
];

const EligibilityTable = ({ openEligibilityModal }) => {
  return (
    <section className="my-14 font-ibm">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
          Approval Slabs
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
          Personal Loan Eligibility Criteria: Salaried vs. Self-Employed
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Detailed benchmarks required by major Indian scheduled banks and NBFCs for prime rate approval.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold w-1/4">
                  Eligibility Factor
                </th>
                <th scope="col" className="px-6 py-4 font-semibold text-amber-400 w-1/4">
                  Salaried Applicants
                </th>
                <th scope="col" className="px-6 py-4 font-semibold text-blue-300 w-1/4">
                  Self-Employed Individuals
                </th>
                <th scope="col" className="px-6 py-4 font-semibold text-slate-300 w-1/4">
                  Key Notes &amp; Exceptions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {criteria.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                  <td className="px-6 py-4 font-bold text-slate-900">
                    {row.label}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-800 tabular-nums">
                    {row.salaried}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-800 tabular-nums">
                    {row.selfEmployed}
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-600 leading-relaxed">
                    {row.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {openEligibilityModal && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-600">
              Not sure about your eligibility? Check across 30+ lenders instantly with zero score impact.
            </span>
            <button
              type="button"
              onClick={() => openEligibilityModal("Personal Loan")}
              className="h-10 px-5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold rounded-lg text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Check Eligibility Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EligibilityTable;
