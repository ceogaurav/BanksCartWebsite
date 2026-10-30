import React from "react";

const documents = [
  {
    category: "Proof of Identity",
    salaried: "PAN Card (Mandatory), Aadhaar Card, Passport, or Voter ID",
    selfEmployed: "PAN Card (Mandatory), Aadhaar Card, Passport, or Voter ID",
  },
  {
    category: "Proof of Residence",
    salaried: "Aadhaar Card, Recent Utility Bill (Electricity/Water), or Valid Rent Agreement",
    selfEmployed: "Aadhaar Card, Recent Utility Bill, or Registered Office Lease Agreement",
  },
  {
    category: "Proof of Income",
    salaried: "Last 3 months' salary slips & Form 16",
    selfEmployed: "ITR with computation of income for last 2 assessment years (CA certified)",
  },
  {
    category: "Banking Statements",
    salaried: "Latest 6 months' salary bank account statement (PDF/NetBanking)",
    selfEmployed: "Latest 6 to 12 months' primary current/savings account statement",
  },
  {
    category: "Business Proof",
    salaried: "Current employee ID card & official corporate email verification",
    selfEmployed: "GST Registration Certificate, Shop & Establishment Certificate, or MSME Udyam",
  },
];

const DocumentsTable = () => (
  <section className="my-14">
    <div className="text-center max-w-3xl mx-auto mb-10">
      <span className="inline-block bg-blue-50 text-blue-700 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
        Checklist
      </span>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
        Documents Required for Personal Loan Application
      </h2>
      <p className="text-gray-600 text-sm sm:text-base mt-2">
        Keep digital copies of these KYC and income proofs ready for 100% paperless instant processing.
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-bold text-gray-900 w-1/4">
                Document Category
              </th>
              <th scope="col" className="px-6 py-4 font-bold text-teal-800 w-3/8">
                Salaried Applicants
              </th>
              <th scope="col" className="px-6 py-4 font-bold text-blue-800 w-3/8">
                Self-Employed Professionals & Traders
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {documents.map((row, i) => (
              <tr
                key={row.category}
                className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
              >
                <td className="px-6 py-4 font-semibold text-gray-900 align-top">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-teal-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>{row.category}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700 leading-relaxed align-top">
                  {row.salaried}
                </td>
                <td className="px-6 py-4 text-gray-700 leading-relaxed align-top">
                  {row.selfEmployed}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-slate-50 border-t border-gray-100 text-xs text-gray-500 text-center">
        💡 <strong>Pro Tip:</strong> Having your mobile number linked with your Aadhaar enables DigiLocker instant verification, speeding up disbursal to under 4 hours.
      </div>
    </div>
  </section>
);

export default DocumentsTable;
