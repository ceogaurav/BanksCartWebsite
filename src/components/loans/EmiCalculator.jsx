import React, { useState } from "react";
import { Link } from "react-router-dom";

const minAmount = 50000;
const maxAmount = 5000000; // Realistic ₹50 Lakhs cap for personal loans in India
const minRate = 10.25;
const maxRate = 24.0;
const minTenure = 12;
const maxTenure = 72;

const PRESET_AMOUNTS = [
  { label: "₹1 Lakh", value: 100000 },
  { label: "₹3 Lakhs", value: 300000 },
  { label: "₹5 Lakhs", value: 500000 },
  { label: "₹10 Lakhs", value: 1000000 },
  { label: "₹25 Lakhs", value: 2500000 },
];

const PRESET_TENURES = [
  { label: "1 Year", value: 12 },
  { label: "2 Years", value: 24 },
  { label: "3 Years", value: 36 },
  { label: "5 Years", value: 60 },
];

function calculateEMI(P, r, n) {
  const monthlyRate = r / (12 * 100);
  if (monthlyRate === 0) return P / n;
  return (
    (P * monthlyRate * Math.pow(1 + monthlyRate, n)) /
    (Math.pow(1 + monthlyRate, n) - 1)
  );
}

const EmiCalculator = ({ openApplyModal }) => {
  const [amount, setAmount] = useState(300000);
  const [rate, setRate] = useState(10.5);
  const [tenure, setTenure] = useState(36);

  const emi = calculateEMI(amount, rate, tenure);
  const totalPayment = emi * tenure;
  const interestPayable = totalPayment - amount;

  return (
    <section id="emi-calculator" className="my-12 bg-white rounded-3xl shadow-xl border border-blue-100/80 p-6 sm:p-8 md:p-12 scroll-mt-24">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-block bg-teal-50 text-teal-700 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
          Interactive Repayment Estimator
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Calculate Your Personal Loan Monthly EMI
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mt-2">
          Estimate your monthly installments, total interest cost, and overall borrowing expense based on verified reducing-balance interest rates.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-7">
          {/* Loan Amount */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="loan-amount-input" className="text-gray-800 font-semibold text-sm sm:text-base">
                Loan Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                <input
                  id="loan-amount-input"
                  type="number"
                  min={minAmount}
                  max={maxAmount}
                  step={10000}
                  value={amount}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0) setAmount(val);
                  }}
                  className="w-36 pl-7 pr-3 py-1.5 border border-gray-300 rounded-lg text-right font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                />
              </div>
            </div>
            <input
              type="range"
              min={minAmount}
              max={maxAmount}
              step={10000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              aria-label="Loan Amount Slider"
              className="w-full accent-teal-600 h-2 rounded-lg bg-gray-200 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>₹50,000</span>
              <span>₹50,00,000</span>
            </div>
            {/* Quick chips */}
            <div className="flex flex-wrap gap-2 mt-3">
              {PRESET_AMOUNTS.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setAmount(preset.value)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                    amount === preset.value
                      ? "bg-teal-600 text-white shadow-sm"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="interest-rate-input" className="text-gray-800 font-semibold text-sm sm:text-base">
                Interest Rate (% p.a.)
              </label>
              <div className="relative">
                <input
                  id="interest-rate-input"
                  type="number"
                  min={minRate}
                  max={maxRate}
                  step={0.1}
                  value={rate}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0) setRate(val);
                  }}
                  className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-right font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                />
              </div>
            </div>
            <input
              type="range"
              min={minRate}
              max={maxRate}
              step={0.05}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              aria-label="Interest Rate Slider"
              className="w-full accent-teal-600 h-2 rounded-lg bg-gray-200 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{minRate}% (Best Bank Rate)</span>
              <span>{maxRate}%</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="tenure-input" className="text-gray-800 font-semibold text-sm sm:text-base">
                Loan Tenure (Months)
              </label>
              <div className="relative">
                <input
                  id="tenure-input"
                  type="number"
                  min={minTenure}
                  max={maxTenure}
                  step={1}
                  value={tenure}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0) setTenure(val);
                  }}
                  className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-right font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
                />
              </div>
            </div>
            <input
              type="range"
              min={minTenure}
              max={maxTenure}
              step={1}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              aria-label="Loan Tenure Slider"
              className="w-full accent-teal-600 h-2 rounded-lg bg-gray-200 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>12 Months (1 Year)</span>
              <span>72 Months (6 Years)</span>
            </div>
            {/* Quick tenure chips */}
            <div className="flex flex-wrap gap-2 mt-3">
              {PRESET_TENURES.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => setTenure(preset.value)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                    tenure === preset.value
                      ? "bg-teal-600 text-white shadow-sm"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-wider text-teal-300 font-semibold">
              Equated Monthly Instalment
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              ₹{Math.round(emi).toLocaleString("en-IN")}
              <span className="text-sm font-normal text-blue-200"> /month</span>
            </div>
          </div>

          <div className="space-y-3 border-t border-white/10 pt-4 text-sm">
            <div className="flex justify-between items-center py-1">
              <span className="text-blue-200">Principal Amount</span>
              <span className="font-bold text-white">₹{amount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-teal-300">Total Interest Payable</span>
              <span className="font-bold text-teal-300">₹{Math.round(interestPayable).toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-t border-white/10 pt-2">
              <span className="text-blue-200 font-medium">Total Amount Payable</span>
              <span className="font-extrabold text-lg text-white">₹{Math.round(totalPayment).toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="mt-6 pt-2">
            {openApplyModal ? (
              <button
                type="button"
                onClick={() => openApplyModal(`Personal Loan - ₹${amount.toLocaleString("en-IN")}`)}
                className="w-full bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-500 hover:to-emerald-500 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Apply for this Loan</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            ) : (
              <a
                href="#offers-grid"
                className="w-full bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-500 hover:to-emerald-500 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Compare Bank Offers</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            )}
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/loans/personal/overview"
              className="text-xs text-blue-300 hover:text-white underline inline-flex items-center gap-1"
            >
              <span>See full reducing-balance vs flat rate formulas</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmiCalculator;
