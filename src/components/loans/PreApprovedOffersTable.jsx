import React from "react";
import { Link } from "react-router-dom";

const offers = [
  {
    bank: "State Bank of India",
    logo: "/images/sbi.png",
    rate: "10.30% p.a. onwards",
    maxLoan: "Up to ₹20 Lakhs",
    tenure: "Up to 72 months",
    slug: "sbi-bank",
  },
  {
    bank: "HDFC Bank",
    logo: "/images/hdfc.png",
    rate: "10.50% p.a. onwards",
    maxLoan: "Up to ₹40 Lakhs",
    tenure: "Up to 72 months",
    slug: "hdfc-bank",
  },
  {
    bank: "ICICI Bank",
    logo: "/images/icici.png",
    rate: "10.65% p.a. onwards",
    maxLoan: "Up to ₹50 Lakhs",
    tenure: "Up to 84 months",
    slug: "icici-bank",
  },
  {
    bank: "Axis Bank",
    logo: "/images/axis.png",
    rate: "10.49% p.a. onwards",
    maxLoan: "Up to ₹40 Lakhs",
    tenure: "Up to 84 months",
    slug: "axis-bank",
  },
  {
    bank: "Kotak Mahindra Bank",
    logo: "/images/kotak.png",
    rate: "10.99% p.a. onwards",
    maxLoan: "Up to ₹35 Lakhs",
    tenure: "Up to 60 months",
    slug: "kotak-bank",
  },
  {
    bank: "Bajaj Finserv",
    logo: "/images/bajaj.png",
    rate: "11.00% p.a. onwards",
    maxLoan: "Up to ₹40 Lakhs",
    tenure: "Up to 96 months",
    slug: "bajaj-finserv",
  },
];

const PreApprovedOffersTable = ({ openApplyModal }) => (
  <section className="my-14">
    <div className="text-center max-w-3xl mx-auto mb-10">
      <span className="inline-block bg-teal-50 text-teal-700 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
        Instant Approvals
      </span>
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
        Pre-Approved Personal Loan Rates & Terms
      </h2>
      <p className="text-gray-600 text-sm sm:text-base mt-2">
        Browse curated digital lending partner offers with quick pre-approvals and expedited verification.
      </p>
    </div>

    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden min-h-[420px]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-bold text-gray-900">
                Lending Partner
              </th>
              <th scope="col" className="px-6 py-4 font-bold text-teal-800">
                Starting Interest Rate
              </th>
              <th scope="col" className="px-6 py-4 font-bold text-blue-800">
                Max Loan Limit
              </th>
              <th scope="col" className="px-6 py-4 font-bold text-gray-700">
                Max Tenure
              </th>
              <th scope="col" className="px-6 py-4 font-bold text-gray-900 text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {offers.map((offer, i) => (
              <tr
                key={offer.bank}
                className={i % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
              >
                <td className="px-6 py-4 font-semibold text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-lg p-1.5 flex items-center justify-center shrink-0">
                      <img
                        src={offer.logo}
                        alt={offer.bank}
                        width="40"
                        height="40"
                        style={{ aspectRatio: "1/1" }}
                        className="max-h-full max-w-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <span className="font-bold">{offer.bank}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-teal-700 font-semibold">
                  {offer.rate}
                </td>
                <td className="px-6 py-4 text-gray-800 font-medium">
                  {offer.maxLoan}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {offer.tenure}
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    type="button"
                    onClick={() =>
                      openApplyModal &&
                      openApplyModal(`Pre-approved Personal Loan - ${offer.bank}`)
                    }
                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-xl text-xs sm:text-sm shadow-sm transition-all"
                  >
                    Apply Now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-slate-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <div>
          * Pre-approved offers are subject to KYC verification, credit score validation, and lender underwriting criteria.
        </div>
        <Link
          to="/loans/personal/overview"
          className="text-blue-600 hover:text-blue-800 font-semibold underline shrink-0 inline-flex items-center gap-1"
        >
          <span>Compare full mathematical details</span>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  </section>
);

export default PreApprovedOffersTable;
