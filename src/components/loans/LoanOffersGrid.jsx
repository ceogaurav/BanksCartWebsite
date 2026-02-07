import React from "react";

const offers = [
  {
    bank: "HDFC Bank",
    logo: "/images/hdfc.png",
    maxAmount: 20000000,
    tenure: "12-72 months",
    processingFee: "Up to 1%",
    interestRate: "10.5% - 13.99%",
    badges: ["10 Second Disbursal", "100% Digital Process"],
    color: "teal",
    featured: true,
  },
  {
    bank: "ICICI Bank",
    logo: "/images/icici.png",
    maxAmount: 50000000,
    tenure: "12-84 months",
    processingFee: "Up to 1%",
    interestRate: "10.5% - 13.99%",
    badges: ["Low Processing Fee", "100% Digital Process"],
    color: "green",
  },
  {
    bank: "Bajaj Finserv",
    logo: "/images/bajaj.png",
    maxAmount: 5000000,
    tenure: "12-96 months",
    processingFee: "Up to 2%",
    interestRate: "11% - 24%",
    badges: ["100% Digital Process"],
    color: "blue",
  },
  {
    bank: "Axis Bank",
    logo: "/images/axis.png",
    maxAmount: 4000000,
    tenure: "12-84 months",
    processingFee: "Up to 2%",
    interestRate: "9.99% - 14%",
    badges: ["10 Second Disbursal", "Low Processing Fee"],
    color: "orange",
  },
];

const badgeColors = {
  teal: "bg-gradient-to-r from-teal-200 to-teal-400 text-teal-900 shadow-sm",
  green: "bg-gradient-to-r from-green-200 to-green-400 text-green-900 shadow-sm",
  blue: "bg-gradient-to-r from-blue-200 to-blue-400 text-blue-900 shadow-sm",
  orange: "bg-gradient-to-r from-orange-200 to-orange-400 text-orange-900 shadow-sm",
};


const LoanOffersGrid = ({ openApplyModal }) => (
  <section className="my-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 py-10 px-2 rounded-2xl shadow-inner">
    <h2 className="text-3xl font-extrabold mb-6 text-gray-900 text-center tracking-tight drop-shadow-sm">
      Compare Personal Loan Offers
    </h2>
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {offers.map((offer, idx) => (
        <div
          key={offer.bank}
          className={`relative bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-${offer.color}-400 hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 p-7 flex flex-col items-center animate-fadeIn`}
          style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'backwards' }}
        >
          {offer.featured && (
            <div className="absolute -top-3 -left-3 bg-gradient-to-r from-yellow-400 to-yellow-300 text-yellow-900 px-3 py-1 rounded-tr-xl rounded-bl-xl text-xs font-bold shadow-md z-10">
              ★ Featured
            </div>
          )}
          <img src={offer.logo} alt={offer.bank} className="h-12 mb-4 drop-shadow-md" />
          <div className="font-extrabold text-xl text-gray-800 mb-2 tracking-wide text-center">{offer.bank}</div>
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {offer.badges.map((badge, i) => (
              <span
                key={badge}
                className={`px-3 py-1 rounded-full text-xs font-semibold shadow ${badgeColors[offer.color]} border border-white/60`}
              >
                {badge}
              </span>
            ))}
          </div>
          <div className="w-full text-sm text-gray-700 mb-3 space-y-1">
            <div className="flex justify-between"><span className="font-medium">Max Amount:</span> <span className="font-bold text-gray-900">₹{offer.maxAmount.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="font-medium">Tenure:</span> <span>{offer.tenure}</span></div>
            <div className="flex justify-between"><span className="font-medium">Processing Fee:</span> <span>{offer.processingFee}</span></div>
            <div className="flex justify-between"><span className="font-medium">Interest Rate:</span> <span>{offer.interestRate}</span></div>
          </div>
          <div className="flex gap-2 mt-auto w-full">
            <button
              onClick={() => openApplyModal(`Personal Loan - ${offer.bank}`)}
              className="flex-1 bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white py-2 rounded-lg font-bold shadow-md transition flex items-center justify-center gap-2 group"
            >
              <svg className="w-4 h-4 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              Apply Now
            </button>
            <a href="#" className="flex-1 text-blue-600 hover:underline text-center py-2 font-semibold rounded-lg bg-blue-50 hover:bg-blue-100 transition">Explore</a>
          </div>
        </div>
      ))}
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

export default LoanOffersGrid;
