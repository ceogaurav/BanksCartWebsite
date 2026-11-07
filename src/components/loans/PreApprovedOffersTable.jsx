import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const offers = [
  {
    bank: "State Bank of India",
    logo: "/logos/sbi.png",
    rate: "11.00% p.a. onwards",
    maxLoan: "Up to ₹20 Lakhs",
    tenure: "Up to 72 Months",
    fee: "1.50% or Min ₹1,000",
    slug: "sbi-bank",
  },
  {
    bank: "HDFC Bank",
    logo: "/logos/hdfc.png",
    rate: "10.50% p.a. onwards",
    maxLoan: "Up to ₹40 Lakhs",
    tenure: "Up to 72 Months",
    fee: "Up to 1.50% + GST",
    slug: "hdfc-bank",
  },
  {
    bank: "ICICI Bank",
    logo: "/logos/icici.png",
    rate: "10.75% p.a. onwards",
    maxLoan: "Up to ₹25 Lakhs",
    tenure: "Up to 72 Months",
    fee: "Up to 1.50% + GST",
    slug: "icici-bank",
  },
  {
    bank: "Axis Bank",
    logo: "/logos/axis.png",
    rate: "10.99% p.a. onwards",
    maxLoan: "Up to ₹15 Lakhs",
    tenure: "Up to 60 Months",
    fee: "1.00% – 2.00% + GST",
    slug: "axis-bank",
  },
  {
    bank: "Kotak Mahindra Bank",
    logo: "/logos/kotak.png",
    rate: "10.99% p.a. onwards",
    maxLoan: "Up to ₹35 Lakhs",
    tenure: "Up to 60 Months",
    fee: "Up to 2.00% + GST",
    slug: "kotak-bank",
  },
  {
    bank: "Bank of Baroda",
    logo: "/logos/bob.png",
    rate: "10.90% p.a. onwards",
    maxLoan: "Up to ₹10 Lakhs",
    tenure: "Up to 84 Months",
    fee: "2.00% or Min ₹1,000",
    slug: "bank-of-baroda",
  },
];

const PreApprovedOffersTable = ({ openApplyModal }) => (
  <section className="my-14 font-ibm">
    <div className="text-center max-w-3xl mx-auto mb-10">
      <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
        Fast Sanctions
      </span>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
        Instant Pre-Approved Personal Loan Rates by Bank
      </h2>
      <p className="text-slate-600 text-sm sm:text-base mt-2">
        Pre-qualified borrowers with high credit ratings (750+) can access lower interest margins and waived processing fees.
      </p>
    </div>

    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th scope="col" className="px-6 py-4 font-semibold w-1/4">
                Partner Bank
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-amber-400 w-1/5">
                Interest Rate
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-slate-200 w-1/5">
                Max Sanction Limit
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-slate-200 w-1/6">
                Max Tenure
              </th>
              <th scope="col" className="px-6 py-4 font-semibold text-right w-1/6">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {offers.map((offer, i) => (
              <tr key={offer.bank} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded bg-slate-50 border border-slate-100 p-1 flex items-center justify-center shrink-0">
                      <img
                        src={offer.logo}
                        alt={offer.bank}
                        className="max-h-6 max-w-full object-contain"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 block">{offer.bank}</span>
                      <span className="text-[11px] text-slate-500">Processing: {offer.fee}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-slate-900 tabular-nums">
                  {offer.rate}
                </td>
                <td className="px-6 py-4 font-medium text-slate-800 tabular-nums">
                  {offer.maxLoan}
                </td>
                <td className="px-6 py-4 text-slate-700 tabular-nums">
                  {offer.tenure}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      if (openApplyModal) openApplyModal(`Personal Loan - ${offer.bank}`);
                    }}
                    className="h-9 px-4 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold rounded-lg text-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Apply</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

export default PreApprovedOffersTable;
