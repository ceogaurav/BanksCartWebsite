import React from "react";

const fees = [
  { charge: "Processing Fee", details: "Up to 2.5% of loan amount + GST" },
  { charge: "Prepayment/Foreclosure Charges", details: "2% - 5% of principal outstanding" },
  { charge: "Part-payment Charges", details: "Nil to 2% (varies by lender)" },
  { charge: "Late Payment/Penal Charges", details: "2% per month on overdue EMI" },
  { charge: "Loan Cancellation Fee", details: "₹1,000 - ₹3,000 + GST" },
  { charge: "EMI Bounce Charges", details: "₹300 - ₹750 per bounce" },
  { charge: "Stamp Duty & Other Charges", details: "As per state laws and lender policy" },
  { charge: "GST", details: "18% applicable on all fees and charges" },
];


const FeesChargesTable = () => (
  <section className="my-16">
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-2xl p-8 border border-blue-100">
      <h2 className="text-3xl font-extrabold mb-6 text-blue-900 text-center tracking-tight drop-shadow">Processing Fees and Charges</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-lg border border-blue-200">
          <thead>
            <tr>
              <th className="px-8 py-4 bg-blue-100 text-left text-sm font-bold text-blue-800 uppercase tracking-wider rounded-tl-xl border-b border-blue-200">Fee/Charge</th>
              <th className="px-8 py-4 bg-blue-100 text-left text-sm font-bold text-blue-800 uppercase tracking-wider rounded-tr-xl border-b border-blue-200">Details</th>
            </tr>
          </thead>
          <tbody>
            {fees.map((row, i) => (
              <tr
                key={row.charge}
                className={
                  (i % 2 === 0 ? "bg-white" : "bg-blue-50") +
                  " transition-colors hover:bg-blue-200/40 group"
                }
              >
                <td className="px-8 py-5 text-blue-900 font-semibold group-hover:text-blue-900 transition-colors border-b border-blue-100">
                  <span className="inline-flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" /></svg>
                    {row.charge}
                  </span>
                </td>
                <td className="px-8 py-5 text-blue-700 group-hover:text-blue-900 transition-colors border-b border-blue-100">{row.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6 text-xs text-blue-500 text-center italic">
        <span className="inline-flex items-center gap-1">
          <svg className="w-4 h-4 text-blue-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
          Charges may vary by lender. Please check with your provider for the latest details.
        </span>
      </div>
    </div>
  </section>
);

export default FeesChargesTable;
