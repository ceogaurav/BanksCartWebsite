import React from "react";

const icons = [
  (
    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 0v6m0-6c-4.418 0-8 1.79-8 4v2h16v-2c0-2.21-3.582-4-8-4z" /></svg>
  ),
  (
    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 10v6m8-8a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
  ),
  (
    <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a5 5 0 00-10 0v2a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2z" /></svg>
  ),
  (
    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" /></svg>
  ),
  (
    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>
  ),
];

const criteria = [
  { label: "Age", value: "18 - 60 years" },
  { label: "Salary (Salaried)", value: "₹15,000+ per month" },
  { label: "Income (Self-employed)", value: "₹5 lakh+ per annum" },
  { label: "Credit Score", value: "725+ preferred" },
  { label: "Employment Stability", value: "At least 6 Months with current employer/business" },
];

const EligibilityTable = () => (
  <section className="my-12 bg-gradient-to-br from-blue-50 via-white to-teal-50 rounded-2xl shadow-xl border border-blue-100 p-6 md:p-12">
    <h2 className="text-3xl font-extrabold mb-7 text-gray-900 text-center tracking-tight drop-shadow-sm">
      Eligibility Criteria
    </h2>
    <div className="overflow-x-auto animate-fadeIn">
      <table className="min-w-full bg-white rounded-2xl shadow-lg border border-blue-100">
        <thead>
          <tr>
            <th className="px-6 py-4 bg-gradient-to-r from-blue-100 to-teal-100 text-left text-sm font-bold text-gray-700 uppercase tracking-wider rounded-tl-2xl">Criteria</th>
            <th className="px-6 py-4 bg-gradient-to-r from-blue-100 to-teal-100 text-left text-sm font-bold text-gray-700 uppercase tracking-wider rounded-tr-2xl">Details</th>
          </tr>
        </thead>
        <tbody>
          {criteria.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? "bg-white" : "bg-blue-50/60"}>
              <td className="px-6 py-4 text-gray-800 font-semibold flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 shadow-inner mr-2">
                  {icons[i]}
                </span>
                {row.label}
              </td>
              <td className="px-6 py-4 text-gray-600 text-base">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <style>{`
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: none; }
      }
      .animate-fadeIn {
        animation: fadeIn 0.7s cubic-bezier(.4,0,.2,1) both;
      }
    `}</style>
  </section>
);

export default EligibilityTable;
