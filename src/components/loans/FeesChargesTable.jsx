import React from "react";
import { Link } from "react-router-dom";

const fees = [
  {
    charge: "Loan Processing Fee",
    details: "0.50% to 2.50% of the sanctioned loan amount + 18% GST (often subject to minimum ₹1,000–₹1,500).",
  },
  {
    charge: "Prepayment / Foreclosure Charges",
    details: "Nil on floating-rate personal loans for individuals (per RBI guidelines). Fixed-rate loans may incur 2% to 4% + GST after completion of lock-in period (usually 6–12 months).",
  },
  {
    charge: "Part-Prepayment Fee",
    details: "Nil to 2% + GST depending on lender terms (typically allowed up to 25% of outstanding principal per financial year).",
  },
  {
    charge: "Late Payment / Penal Charges",
    details: "Reasonable penal charge per RBI Master Direction on Fair Practices Code (penal charges cannot be capitalized or compounded into interest). Typically ₹300–₹500 per default or 2% per month on overdue EMI.",
  },
  {
    charge: "NACH / EMI Bounce Fee",
    details: "₹400 to ₹750 per bounce incident levied by the lending institution, plus statutory bank charges.",
  },
  {
    charge: "Stamp Duty & Documentation",
    details: "Charged as per actual State Stamp Act guidelines (typically ₹200 to ₹1,000).",
  },
  {
    charge: "Goods and Services Tax (GST)",
    details: "Mandatory 18% GST applicable on all processing fees, bounce charges, foreclosure charges, and service fees.",
  },
];

const FeesChargesTable = () => (
  <section className="my-14">
    <div className="text-center max-w-3xl mx-auto mb-10">
      <span className="inline-block bg-teal-50 text-teal-700 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
        Transparency
      </span>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
        Personal Loan Processing Fees & Associated Charges
      </h2>
      <p className="text-gray-600 text-sm sm:text-base mt-2">
        A 100% transparent overview of standard institutional charges with no hidden overheads.
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-bold text-gray-900 w-1/3">
                Fee / Service Component
              </th>
              <th scope="col" className="px-6 py-4 font-bold text-teal-800 w-2/3">
                Standard Industry Benchmark & Regulatory Provisions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {fees.map((row, i) => (
              <tr
                key={row.charge}
                className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
              >
                <td className="px-6 py-4 font-semibold text-gray-900 align-top">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-500 shrink-0" />
                    <span>{row.charge}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700 leading-relaxed align-top">
                  {row.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 sm:p-5 bg-slate-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
        <div>
          Charges are indicative and subject to change per lender credit policy and RBI regulations.
        </div>
        <Link
          to="/loans/personal/overview"
          className="text-blue-600 hover:text-blue-800 font-semibold underline shrink-0 inline-flex items-center gap-1"
        >
          <span>Read detailed lender fee schedule</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  </section>
);

export default FeesChargesTable;
