import React from "react";
import { Link } from "react-router-dom";

const offers = [
  {
    bank: "HDFC Bank",
    logo: "/images/hdfc.png",
    maxAmount: 4000000,
    tenure: "12 - 72 months",
    processingFee: "Up to 1.5% + GST",
    interestRate: "10.50% - 14.50%",
    badges: ["Instant Digital Disbursal", "Top Corporate Rates"],
    featured: true,
    slug: "hdfc-bank",
  },
  {
    bank: "State Bank of India",
    logo: "/images/sbi.png",
    maxAmount: 2000000,
    tenure: "12 - 72 months",
    processingFee: "0.50% - 1.00% + GST",
    interestRate: "10.30% - 13.60%",
    badges: ["Lowest Benchmark Rates", "PSU Stability"],
    featured: false,
    slug: "sbi-bank",
  },
  {
    bank: "ICICI Bank",
    logo: "/images/icici.png",
    maxAmount: 5000000,
    tenure: "12 - 84 months",
    processingFee: "Up to 1.5% + GST",
    interestRate: "10.65% - 14.99%",
    badges: ["Pre-approved Offers", "3-Second Approval"],
    featured: false,
    slug: "icici-bank",
  },
  {
    bank: "Axis Bank",
    logo: "/images/axis.png",
    maxAmount: 4000000,
    tenure: "12 - 84 months",
    processingFee: "1.0% - 2.0% + GST",
    interestRate: "10.49% - 15.00%",
    badges: ["Quick Turnaround", "Flexible Repayment"],
    featured: false,
    slug: "axis-bank",
  },
  {
    bank: "Kotak Mahindra Bank",
    logo: "/images/kotak.png",
    maxAmount: 3500000,
    tenure: "12 - 60 months",
    processingFee: "Up to 2.0% + GST",
    interestRate: "10.99% - 16.99%",
    badges: ["100% Online KYC", "Zero Hidden Charges"],
    featured: false,
    slug: "kotak-bank",
  },
  {
    bank: "Bajaj Finserv",
    logo: "/images/bajaj.png",
    maxAmount: 4000000,
    tenure: "12 - 96 months",
    processingFee: "Up to 2.5% + GST",
    interestRate: "11.00% - 22.00%",
    badges: ["Flexi Loan Option", "High Loan Cap"],
    featured: false,
    slug: "bajaj-finserv",
  },
];

const LoanOffersGrid = ({ openApplyModal, openEligibilityModal }) => {
  return (
    <section id="offers-grid" className="my-14 scroll-mt-24">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-block bg-blue-50 text-blue-700 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          Lender Comparison
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Compare Personal Loan Interest Rates &amp; Processing Fees (Updated Monthly)
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          Compare verified interest rates, processing charges, and borrowing limits from leading banks and NBFCs.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 min-h-[580px]">
        {offers.map((offer) => (
          <div
            key={offer.bank}
            className={`relative bg-white rounded-2xl p-6 sm:p-7 shadow-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
              offer.featured
                ? "border-teal-400 ring-1 ring-teal-200"
                : "border-gray-200 hover:border-blue-300"
            }`}
          >
            {offer.featured && (
              <div className="absolute -top-3 left-6 bg-gradient-to-r from-teal-600 to-emerald-600 text-white px-3 py-0.5 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider">
                ★ Best Match
              </div>
            )}

            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-extrabold text-xl text-gray-900 tracking-tight">
                    {offer.bank}
                  </h3>
                  <div className="text-xs text-teal-700 font-semibold mt-0.5">
                    Starting at {offer.interestRate.split("-")[0].trim()} p.a.
                  </div>
                </div>
                <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-xl p-2 flex items-center justify-center shrink-0">
                  <img
                    src={offer.logo}
                    alt={`${offer.bank} logo`}
                    width="48"
                    height="48"
                    style={{ aspectRatio: "1/1" }}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {offer.badges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-800 border border-blue-100"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* Data Table */}
              <div className="space-y-2.5 text-xs sm:text-sm text-gray-600 border-t border-b border-gray-100 py-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Max Loan Amount</span>
                  <span className="font-bold text-gray-900">
                    ₹{offer.maxAmount.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Interest Rate Range</span>
                  <span className="font-semibold text-gray-800">
                    {offer.interestRate}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Processing Fee</span>
                  <span className="font-medium text-gray-800">
                    {offer.processingFee}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Tenure</span>
                  <span className="font-medium text-gray-800">{offer.tenure}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => openApplyModal && openApplyModal(`Personal Loan - ${offer.bank}`)}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 px-3 rounded-xl shadow-sm transition-colors text-sm flex items-center justify-center gap-1.5"
                >
                  <span>Apply Now</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>

                {openEligibilityModal && (
                  <button
                    type="button"
                    onClick={openEligibilityModal}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2.5 px-3 rounded-xl transition-colors text-xs sm:text-sm"
                  >
                    Eligibility
                  </button>
                )}
              </div>

              <div className="text-center">
                <Link
                  to="/loans/personal/overview"
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium hover:underline inline-flex items-center gap-1"
                >
                  <span>View comprehensive {offer.bank} breakdown</span>
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LoanOffersGrid;
