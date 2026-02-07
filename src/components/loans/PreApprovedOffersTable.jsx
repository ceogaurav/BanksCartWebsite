import React from "react";
import { Link } from "react-router-dom";

const offers = [
  {
    bank: "HDFC Bank",
    logo: "/images/hdfc.png",
    rate: "10.5% p.a.",
    slug: "hdfc-bank",
  },
  {
    bank: "ICICI Bank",
    logo: "/images/icici.png",
    rate: "10.6% p.a.",
    slug: "icici-bank",
  },
  {
    bank: "Bajaj Finserv",
    logo: "/images/bajaj.png",
    rate: "10.5% p.a.",
    slug: "bajaj-finserv",
  },
  {
    bank: "Axis Bank",
    logo: "/images/axis.png",
    rate: "9.99% p.a.",
    slug: "axis-bank",
  },
];

const PreApprovedOffersTable = ({ openApplyModal }) => (
  <section className="my-12 rounded-xl bg-gradient-to-br from-blue-50 via-white to-teal-50 shadow-lg px-4 py-10 md:px-10 lg:px-20">
    <div className="flex flex-col items-center mb-6">
      <span className="inline-flex items-center gap-2 mb-1">
        <svg className="w-7 h-7 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M16 3v4M8 3v4" /></svg>
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Pre-approved Offers</h2>
      </span>
      <span className="block w-24 h-1 bg-gradient-to-r from-blue-300 via-teal-300 to-yellow-200 rounded-full mb-2" />
      <p className="text-gray-500 text-center max-w-xl text-base">Get the best pre-approved personal loan offers from top banks and NBFCs, with instant application and competitive rates.</p>
    </div>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white/90 rounded-2xl shadow-lg border border-blue-100">
        <thead>
          <tr>
            <th className="px-6 py-4 bg-blue-50 text-left text-xs font-bold text-gray-700 uppercase tracking-wider rounded-tl-2xl">Lender</th>
            <th className="px-6 py-4 bg-blue-50 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Interest Rate</th>
            <th className="px-6 py-4 bg-blue-50 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Apply</th>
            <th className="px-6 py-4 bg-blue-50 text-center text-xs font-bold text-gray-700 uppercase tracking-wider rounded-tr-2xl">More Info</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer, i) => (
            <tr key={offer.bank} className={
              `transition-all duration-150 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-teal-50 hover:shadow-md hover:scale-[1.01]`
            }>
              <td className="px-6 py-4 flex items-center gap-3 text-gray-700 font-semibold text-base">
                <img src={offer.logo} alt={offer.bank} className="h-9 w-9 rounded shadow border border-blue-100 bg-white" />
                {offer.bank}
              </td>
              <td className="px-6 py-4 text-gray-600 font-medium text-base">{offer.rate}</td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => openApplyModal(`Pre-approved Personal Loan - ${offer.bank}`)}
                  className="bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-5 py-2 rounded-lg font-bold shadow flex items-center gap-2 justify-center transition-all duration-150"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  Apply Now
                </button>
              </td>
              <td className="px-6 py-4 text-center">
                <Link to={`/bank-details/${offer.slug}`} className="text-blue-600 hover:underline font-semibold transition-colors duration-150">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export default PreApprovedOffersTable;
