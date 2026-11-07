import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator, PieChart, Info, CheckCircle2 } from "lucide-react";

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
  // Local immediate slider display values (for 60fps instant UI updates)
  const [displayAmount, setDisplayAmount] = useState(300000);
  const [displayRate, setDisplayRate] = useState(10.5);
  const [displayTenure, setDisplayTenure] = useState(36);

  // Debounced calculation state
  const [calcAmount, setCalcAmount] = useState(300000);
  const [calcRate, setCalcRate] = useState(10.5);
  const [calcTenure, setCalcTenure] = useState(36);

  // Asynchronous calculated results
  const [emi, setEmi] = useState(() => calculateEMI(300000, 10.5, 36));
  const [totalPayment, setTotalPayment] = useState(() => calculateEMI(300000, 10.5, 36) * 36);
  const [interestPayable, setInterestPayable] = useState(() => (calculateEMI(300000, 10.5, 36) * 36) - 300000);

  // Timers for debouncing
  const amountTimer = useRef(null);
  const rateTimer = useRef(null);
  const tenureTimer = useRef(null);

  const handleAmountChange = useCallback((val) => {
    setDisplayAmount(val);
    if (amountTimer.current) clearTimeout(amountTimer.current);
    amountTimer.current = setTimeout(() => {
      setCalcAmount(val);
    }, 100);
  }, []);

  const handleRateChange = useCallback((val) => {
    setDisplayRate(val);
    if (rateTimer.current) clearTimeout(rateTimer.current);
    rateTimer.current = setTimeout(() => {
      setCalcRate(val);
    }, 100);
  }, []);

  const handleTenureChange = useCallback((val) => {
    setDisplayTenure(val);
    if (tenureTimer.current) clearTimeout(tenureTimer.current);
    tenureTimer.current = setTimeout(() => {
      setCalcTenure(val);
    }, 100);
  }, []);

  useEffect(() => {
    return () => {
      if (amountTimer.current) clearTimeout(amountTimer.current);
      if (rateTimer.current) clearTimeout(rateTimer.current);
      if (tenureTimer.current) clearTimeout(tenureTimer.current);
    };
  }, []);

  useEffect(() => {
    const calculatedEmi = calculateEMI(calcAmount, calcRate, calcTenure);
    const total = calculatedEmi * calcTenure;
    setEmi(calculatedEmi);
    setTotalPayment(total);
    setInterestPayable(total - calcAmount);
  }, [calcAmount, calcRate, calcTenure]);

  const handlePresetAmount = (val) => {
    setDisplayAmount(val);
    setCalcAmount(val);
  };

  const handlePresetTenure = (val) => {
    setDisplayTenure(val);
    setCalcTenure(val);
  };

  const principalPercent = totalPayment > 0 ? (calcAmount / totalPayment) * 100 : 70;
  const interestPercent = 100 - principalPercent;

  return (
    <section id="emi-calculator" className="my-12 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 md:p-10 scroll-mt-24 font-ibm">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="inline-block bg-slate-100 text-slate-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2 border border-slate-200">
          Interactive Repayment Estimator
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
          Calculate Your Personal Loan Monthly EMI
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Estimate your monthly installments, total interest cost, and overall borrowing expense based on verified reducing-balance interest rates.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-7">
          {/* Loan Amount */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="loan-amount-input" className="text-slate-800 font-semibold text-sm sm:text-base">
                Loan Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
                <input
                  id="loan-amount-input"
                  type="number"
                  min={minAmount}
                  max={maxAmount}
                  step={10000}
                  value={displayAmount}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0) handleAmountChange(val);
                  }}
                  className="w-40 pl-7 pr-3 py-1.5 border border-slate-300 rounded-lg text-right font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm sm:text-base tabular-nums"
                />
              </div>
            </div>
            <input
              type="range"
              min={minAmount}
              max={maxAmount}
              step={10000}
              value={displayAmount}
              onChange={(e) => handleAmountChange(Number(e.target.value))}
              aria-label="Loan Amount Slider"
              className="w-full accent-slate-900 h-2 rounded-lg bg-slate-200 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1 tabular-nums">
              <span>₹50,000</span>
              <span>₹50,00,000 (50 Lakhs)</span>
            </div>
            {/* Quick chips */}
            <div className="flex flex-wrap gap-2 mt-3">
              {PRESET_AMOUNTS.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => handlePresetAmount(preset.value)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                    displayAmount === preset.value
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
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
              <label htmlFor="interest-rate-input" className="text-slate-800 font-semibold text-sm sm:text-base">
                Interest Rate (% p.a.)
              </label>
              <div className="relative">
                <input
                  id="interest-rate-input"
                  type="number"
                  min={minRate}
                  max={maxRate}
                  step={0.1}
                  value={displayRate}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0) handleRateChange(val);
                  }}
                  className="w-24 px-3 py-1.5 border border-slate-300 rounded-lg text-right font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm sm:text-base tabular-nums"
                />
              </div>
            </div>
            <input
              type="range"
              min={minRate}
              max={maxRate}
              step={0.05}
              value={displayRate}
              onChange={(e) => handleRateChange(Number(e.target.value))}
              aria-label="Interest Rate Slider"
              className="w-full accent-slate-900 h-2 rounded-lg bg-slate-200 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1 tabular-nums">
              <span>{minRate}% (Best Bank Rate)</span>
              <span>{maxRate}%</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label htmlFor="tenure-input" className="text-slate-800 font-semibold text-sm sm:text-base">
                Loan Tenure (Months)
              </label>
              <div className="relative">
                <input
                  id="tenure-input"
                  type="number"
                  min={minTenure}
                  max={maxTenure}
                  step={1}
                  value={displayTenure}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 0) handleTenureChange(val);
                  }}
                  className="w-24 px-3 py-1.5 border border-slate-300 rounded-lg text-right font-bold text-slate-900 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 text-sm sm:text-base tabular-nums"
                />
              </div>
            </div>
            <input
              type="range"
              min={minTenure}
              max={maxTenure}
              step={1}
              value={displayTenure}
              onChange={(e) => handleTenureChange(Number(e.target.value))}
              aria-label="Loan Tenure Slider"
              className="w-full accent-slate-900 h-2 rounded-lg bg-slate-200 cursor-pointer"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1 tabular-nums">
              <span>12 Months (1 Year)</span>
              <span>72 Months (6 Years)</span>
            </div>
            {/* Quick tenure chips */}
            <div className="flex flex-wrap gap-2 mt-3">
              {PRESET_TENURES.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => handlePresetTenure(preset.value)}
                  className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                    displayTenure === preset.value
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
              Equated Monthly Instalment (EMI)
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 mt-1 tabular-nums">
              ₹{Math.round(emi).toLocaleString("en-IN")}
              <span className="text-sm font-normal text-slate-300"> /month</span>
            </div>
          </div>

          {/* Visual Breakdown Bar */}
          <div className="mb-6">
            <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden flex">
              <div
                style={{ width: `${principalPercent}%` }}
                className="bg-blue-500 transition-all duration-300"
                title={`Principal: ${Math.round(principalPercent)}%`}
              />
              <div
                style={{ width: `${interestPercent}%` }}
                className="bg-amber-500 transition-all duration-300"
                title={`Interest: ${Math.round(interestPercent)}%`}
              />
            </div>
            <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                <span>Principal ({Math.round(principalPercent)}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                <span>Interest ({Math.round(interestPercent)}%)</span>
              </div>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-800 pt-4 text-sm">
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-300">Principal Amount</span>
              <span className="font-bold text-white tabular-nums">₹{calcAmount.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center py-1">
              <span className="text-slate-300">Total Interest Payable</span>
              <span className="font-bold text-amber-400 tabular-nums">₹{Math.round(interestPayable).toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center py-1 border-t border-slate-800 pt-2">
              <span className="text-slate-200 font-semibold">Total Amount Payable</span>
              <span className="font-extrabold text-lg text-white tabular-nums">₹{Math.round(totalPayment).toLocaleString("en-IN")}</span>
            </div>
          </div>

          <div className="mt-6 pt-2">
            {openApplyModal ? (
              <button
                type="button"
                onClick={() => openApplyModal(`Personal Loan - ₹${calcAmount.toLocaleString("en-IN")}`)}
                className="w-full h-12 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply for this Loan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <a
                href="#offers-grid"
                className="w-full h-12 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Compare Bank Offers</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            )}
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/loans/personal/overview"
              className="text-xs text-slate-400 hover:text-slate-200 underline inline-flex items-center gap-1 transition-colors"
            >
              <span>See full reducing-balance vs flat rate formulas</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmiCalculator;
