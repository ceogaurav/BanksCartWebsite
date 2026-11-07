import React from "react";
import { Link } from "react-router-dom";
import { Info, ShieldAlert } from "lucide-react";

const fees = [
  {
    charge: "Loan Processing Fee",
    details: "0.50% to 2.50% of the sanctioned loan amount + 18% GST (often subject to minimum ₹1,000–₹1,500 depending on lender).",
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
    details: "Charged as per actual State Stamp Act guidelines (typically ₹200 to ₹1,000 depending on state).",
  },
  {
    charge: "Goods and Services Tax (GST)",
    details: "Mandatory 18% GST applicable on all processing fees, bounce charges, foreclosure charges, and service fees per Indian tax law.",
  },
];

const FeesChargesTable = () => (
  <section className="my-14 font-ibm">
    <div className="text-center max-w-3xl mx-auto mb-10">
      <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
        Regulatory Transparency
      </span>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
        Personal Loan Processing Fees &amp; Associated Charges
      </h2>
      <p className="text-slate-600 text-sm sm:text-base mt-2">
        A 100% transparent overview of standard institutional charges with zero hidden overheads.
      </p>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold w-1/3">
                Fee / Service Component
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-amber-400 w-2/3">
                Standard Industry Benchmark &amp; Regulatory Provisions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {fees.map((f, i) => (
              <tr key={f.charge} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                <td className="px-6 py-4 font-bold text-slate-900">
                  {f.charge}
                </td>
                <td className="px-6 py-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {f.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-slate-500 shrink-0" />
          <span>All fees are disclosed upfront in the Key Fact Statement (KFS) provided before loan sanction.</span>
        </div>
        <Link to="/loans/personal/overview" className="text-blue-700 hover:text-blue-900 font-semibold underline shrink-0">
          Read KFS Guidelines &rarr;
        </Link>
      </div>
    </div>
  </section>
);

export default FeesChargesTable;
