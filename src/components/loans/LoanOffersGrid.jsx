import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Shield, Zap, Sparkles, Building2 } from "lucide-react";

const personalLoanOffers = [
  {
    id: "hdfc",
    bank: "HDFC Bank",
    fullName: "HDFC Bank Personal Loan",
    logo: "/logos/hdfc.png",
    category: "private",
    interestRate: "10.50% – 21.00%",
    minRate: 10.50,
    maxAmount: "Up to ₹40 Lakhs",
    tenure: "12 - 72 Months",
    processingFee: "Up to 1.50% + GST",
    disbursalSpeed: "Instant (10 Seconds for Pre-approved)",
    badges: ["Most Popular", "Instant Disbursal"],
    featured: true,
    highlights: ["Minimal documentation for existing customers", "Zero foreclosure charges after 12 EMIs", "Special rates for corporate salaried"],
    applyTag: "Personal Loan - HDFC Bank"
  },
  {
    id: "sbi",
    bank: "State Bank of India",
    fullName: "SBI Xpress Credit Personal Loan",
    logo: "/logos/sbi.png",
    category: "psu",
    interestRate: "11.00% – 15.10%",
    minRate: 11.00,
    maxAmount: "Up to ₹20 Lakhs",
    tenure: "12 - 72 Months",
    processingFee: "1.50% or Min ₹1,000",
    disbursalSpeed: "24 to 48 Hours",
    badges: ["Lowest Benchmark", "PSU Reliability"],
    featured: false,
    highlights: ["Zero prepayment penalty on floating rates", "Concessional rates for defense & government staff", "Transparent sovereign banking terms"],
    applyTag: "Personal Loan - State Bank of India"
  },
  {
    id: "icici",
    bank: "ICICI Bank",
    fullName: "ICICI Bank Personal Loan",
    logo: "/logos/icici.png",
    category: "private",
    interestRate: "10.75% – 19.00%",
    minRate: 10.75,
    maxAmount: "Up to ₹25 Lakhs",
    tenure: "12 - 72 Months",
    processingFee: "Up to 1.50% + GST",
    disbursalSpeed: "3-Second Disbursal (Pre-approved)",
    badges: ["Fast Disbursal", "High Approval Rate"],
    featured: false,
    highlights: ["100% paperless digital onboarding", "Pre-approved limits on iMobile app", "Flexible part-payment options"],
    applyTag: "Personal Loan - ICICI Bank"
  },
  {
    id: "axis",
    bank: "Axis Bank",
    fullName: "Axis Bank 24x7 Personal Loan",
    logo: "/logos/axis.png",
    category: "private",
    interestRate: "10.99% – 21.00%",
    minRate: 10.99,
    maxAmount: "Up to ₹15 Lakhs",
    tenure: "12 - 60 Months",
    processingFee: "1.00% – 2.00% + GST",
    disbursalSpeed: "Same-Day Disbursal",
    badges: ["Zero Physical KYC", "Quick Sanction"],
    featured: false,
    highlights: ["End-to-end digital approval", "Convenient auto-debit facility", "Custom tenure from 1 to 5 years"],
    applyTag: "Personal Loan - Axis Bank"
  },
  {
    id: "bob",
    bank: "Bank of Baroda",
    fullName: "Bank of Baroda Baroda Yodha / Personal Loan",
    logo: "/logos/bob.png",
    category: "psu",
    interestRate: "10.90% – 18.25%",
    minRate: 10.90,
    maxAmount: "Up to ₹10 Lakhs",
    tenure: "12 - 84 Months",
    processingFee: "2.00% or Min ₹1,000",
    disbursalSpeed: "1 to 2 Business Days",
    badges: ["Long Tenure (7 Yrs)", "PSU Benchmark"],
    featured: false,
    highlights: ["Extended tenure up to 84 months", "Special scheme for pensioners & government employees", "Zero hidden annual maintenance fees"],
    applyTag: "Personal Loan - Bank of Baroda"
  },
  {
    id: "kotak",
    bank: "Kotak Mahindra Bank",
    fullName: "Kotak Mahindra Personal Loan",
    logo: "/logos/kotak.png",
    category: "private",
    interestRate: "10.99% – 16.99%",
    minRate: 10.99,
    maxAmount: "Up to ₹35 Lakhs",
    tenure: "12 - 60 Months",
    processingFee: "Up to 2.00% + GST",
    disbursalSpeed: "Within 2 Hours",
    badges: ["Instant e-Sign", "Low Cap Rate"],
    featured: false,
    highlights: ["Digital loan sanction via Aadhaar OTP", "Zero physical branch visit required", "Transparent Key Fact Statement (KFS) upfront"],
    applyTag: "Personal Loan - Kotak Mahindra Bank"
  }
];

const LoanOffersGrid = ({ openApplyModal, openEligibilityModal }) => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filteredOffers = personalLoanOffers.filter((offer) => {
    if (selectedFilter === "all") return true;
    if (selectedFilter === "psu") return offer.category === "psu";
    if (selectedFilter === "private") return offer.category === "private";
    if (selectedFilter === "instant") return offer.disbursalSpeed.toLowerCase().includes("instant") || offer.disbursalSpeed.toLowerCase().includes("second");
    return true;
  });

  return (
    <section id="offers-grid" className="my-14 scroll-mt-24 font-ibm">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
          Verified Lender Comparison
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
          Compare Top Personal Loan Interest Rates &amp; Processing Fees
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Compare verified interest rate spreads, borrowing limits, and processing charges across India&apos;s leading scheduled banks and NBFCs.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          <button
            type="button"
            onClick={() => setSelectedFilter("all")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedFilter === "all"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            All Lenders ({personalLoanOffers.length})
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter("psu")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedFilter === "psu"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Public Sector / PSU Banks
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter("private")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              selectedFilter === "private"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            Private Sector Banks
          </button>
          <button
            type="button"
            onClick={() => setSelectedFilter("instant")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              selectedFilter === "instant"
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>Instant Disbursal</span>
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredOffers.map((offer) => (
          <div
            key={offer.id}
            className={`relative bg-white rounded-xl p-6 shadow-sm border transition-all duration-200 hover:shadow-md flex flex-col justify-between ${
              offer.featured
                ? "border-amber-400/80 ring-1 ring-amber-300/40"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            {offer.featured && (
              <div className="absolute -top-3 left-6 bg-slate-900 text-amber-400 px-3 py-0.5 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Featured Pick</span>
              </div>
            )}

            <div>
              {/* Header: Logo & Bank Name */}
              <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 p-1 flex items-center justify-center shrink-0">
                    <img
                      src={offer.logo}
                      alt={offer.bank}
                      className="max-h-8 max-w-full object-contain"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950 text-base leading-snug">
                      {offer.bank}
                    </h3>
                    <span className="text-xs text-slate-500 block">
                      {offer.category === "psu" ? "Public Sector Bank" : "Scheduled Commercial Bank"}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full inline-block">
                    Verified
                  </span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {offer.badges.map((b) => (
                  <span
                    key={b}
                    className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200"
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* 3-Column Metric Box */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-100 mb-5 text-left">
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Interest Rate</span>
                  <span className="text-sm font-bold text-slate-900 tabular-nums">
                    {offer.interestRate}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Max Loan</span>
                  <span className="text-sm font-bold text-slate-900 tabular-nums">
                    {offer.maxAmount}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Tenure Range</span>
                  <span className="text-sm font-bold text-slate-900 tabular-nums">
                    {offer.tenure}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 font-medium block">Processing Fee</span>
                  <span className="text-sm font-bold text-slate-900 tabular-nums">
                    {offer.processingFee}
                  </span>
                </div>
              </div>

              {/* Key Bullet Features */}
              <ul className="space-y-1.5 mb-6 text-xs text-slate-600">
                {offer.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  if (openApplyModal) openApplyModal(offer.applyTag);
                }}
                className="w-full h-11 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <span>Apply Instantly</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {openEligibilityModal && (
                <button
                  type="button"
                  onClick={() => openEligibilityModal(offer.applyTag)}
                  className="w-full h-9 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-medium rounded-lg transition-colors text-xs cursor-pointer"
                >
                  Check Eligibility
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LoanOffersGrid;
