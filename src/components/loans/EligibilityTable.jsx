import React from "react";

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
    notes: "Salaried in confirmed permanent employment.",
  },
  {
    label: "Fixed Obligation to Income (FOIR)",
    salaried: "Below 40% – 50%",
    selfEmployed: "Below 45% – 50%",
    notes: "Total monthly debt obligations (including new EMI) should not exceed 50% of take-home pay.",
  },
];

const EligibilityTable = ({ openEligibilityModal }) => {
  return (
    <section className="my-14">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-block bg-teal-50 text-teal-700 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          Approval Slabs
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Personal Loan Eligibility Criteria for Salaried &amp; Self-Employed Borrowers
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          Detailed benchmarks required by major Indian banks and NBFCs for salaried and self-employed applicants.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[380px]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-4 font-bold text-gray-900 w-1/4">
                  Eligibility Factor
                </th>
                <th scope="col" className="px-6 py-4 font-bold text-teal-800 w-1/4">
                  Salaried Applicants
                </th>
                <th scope="col" className="px-6 py-4 font-bold text-blue-800 w-1/4">
                  Self-Employed Individuals
                </th>
                <th scope="col" className="px-6 py-4 font-bold text-gray-700 w-1/4">
                  Key Notes & Exceptions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {criteria.map((item, idx) => (
                <tr
                  key={item.label}
                  className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                >
                  <td className="px-6 py-4 font-semibold text-gray-900 align-top">
                    {item.label}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium align-top">
                    {item.salaried}
                  </td>
                  <td className="px-6 py-4 text-gray-700 font-medium align-top">
                    {item.selfEmployed}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-xs leading-relaxed align-top">
                    {item.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {openEligibilityModal && (
          <div className="p-4 sm:p-6 bg-gradient-to-r from-teal-50 to-blue-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700 text-center sm:text-left">
              <strong className="text-gray-900 font-semibold block">Not sure if you qualify?</strong>
              Check your personalized approval odds across 15+ partner lenders without impacting your CIBIL score.
            </div>
            <button
              type="button"
              onClick={openEligibilityModal}
              className="shrink-0 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-6 rounded-xl text-sm shadow-sm transition-all"
            >
              Check My Free Eligibility
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default EligibilityTable;
