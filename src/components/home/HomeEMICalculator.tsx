import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, ArrowRight, PieChart, ShieldCheck } from 'lucide-react';

interface HomeEMICalculatorProps {
  openApplyModal?: (loanType?: string) => void;
}

export default function HomeEMICalculator({ openApplyModal }: HomeEMICalculatorProps) {
  const [loanAmount, setLoanAmount] = useState<number>(1000000); // 10 Lakhs default
  const [interestRate, setInterestRate] = useState<number>(10.5); // 10.5% default
  const [tenureYears, setTenureYears] = useState<number>(5); // 5 Years default

  const calculations = useMemo(() => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    const numberOfMonths = tenureYears * 12;

    if (monthlyRate === 0) {
      const emi = principal / numberOfMonths;
      return {
        emi: Math.round(emi),
        totalInterest: 0,
        totalPayment: principal,
        principalRatio: 100,
        interestRatio: 0,
      };
    }

    const emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    const totalPayment = emi * numberOfMonths;
    const totalInterest = totalPayment - principal;

    const principalRatio = Math.round((principal / totalPayment) * 100);
    const interestRatio = 100 - principalRatio;

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      principalRatio,
      interestRatio,
    };
  }, [loanAmount, interestRate, tenureYears]);

  return (
    <section className="py-16 sm:py-20 bg-white font-ibm border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded text-xs font-bold text-amber-900 uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-amber-800" />
            <span>Interactive Financial Planning</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Calculate Your Monthly Loan EMI
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Plan your repayments with accurate mathematical precision. View instant principal vs interest distribution before applying.
          </p>
        </div>

        {/* Main Interactive Calculator Canvas */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* LEFT: Sliders & Controls */}
            <div className="lg:col-span-7 space-y-7">
              {/* Slider 1: Loan Amount */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="calculator-loan-amount" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Loan Amount
                  </label>
                  <span className="text-base sm:text-lg font-bold text-slate-900 tabular-nums bg-white px-3 py-1 rounded border border-slate-200 shadow-2xs">
                    ₹{loanAmount.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  id="calculator-loan-amount"
                  type="range"
                  min="100000"
                  max="10000000"
                  step="50000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900 focus:outline-none"
                  aria-label="Loan amount slider"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>₹1 Lakh</span>
                  <span>₹50 Lakhs</span>
                  <span>₹1 Crore</span>
                </div>
              </div>

              {/* Slider 2: Interest Rate */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="calculator-interest-rate" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Interest Rate (% p.a.)
                  </label>
                  <span className="text-base sm:text-lg font-bold text-slate-900 tabular-nums bg-white px-3 py-1 rounded border border-slate-200 shadow-2xs">
                    {interestRate}%
                  </span>
                </div>
                <input
                  id="calculator-interest-rate"
                  type="range"
                  min="8.0"
                  max="22.0"
                  step="0.25"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900 focus:outline-none"
                  aria-label="Interest rate slider"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>8.0%</span>
                  <span>14.0%</span>
                  <span>22.0%</span>
                </div>
              </div>

              {/* Slider 3: Loan Tenure */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="calculator-tenure-years" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Loan Tenure (Years)
                  </label>
                  <span className="text-base sm:text-lg font-bold text-slate-900 tabular-nums bg-white px-3 py-1 rounded border border-slate-200 shadow-2xs">
                    {tenureYears} Years ({tenureYears * 12} Mos)
                  </span>
                </div>
                <input
                  id="calculator-tenure-years"
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900 focus:outline-none"
                  aria-label="Loan tenure slider"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-medium">
                  <span>1 Year</span>
                  <span>15 Years</span>
                  <span>30 Years</span>
                </div>
              </div>
            </div>

            {/* RIGHT: Financial Outcome Summary Card */}
            <div className="lg:col-span-5 bg-white rounded-xl border border-slate-200 p-6 sm:p-7 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Estimated Monthly Repayment
              </span>

              {/* Monthly EMI Large Number Display */}
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 tabular-nums">
                ₹{calculations.emi.toLocaleString('en-IN')}
                <span className="text-sm font-semibold text-slate-500 font-normal"> / month</span>
              </div>

              {/* Breakdown Figures */}
              <div className="space-y-3 pt-4 border-t border-slate-100 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                    Principal Amount:
                  </span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    ₹{loanAmount.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-700" />
                    Total Interest:
                  </span>
                  <span className="font-bold text-amber-800 tabular-nums">
                    ₹{calculations.totalInterest.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-100 font-bold">
                  <span className="text-slate-800">Total Payable (P + I):</span>
                  <span className="text-slate-900 tabular-nums">
                    ₹{calculations.totalPayment.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Visual Proportion Bar */}
              <div className="mt-5 space-y-1.5">
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${calculations.principalRatio}%` }}
                    className="bg-slate-900 h-full transition-all duration-300"
                    title={`Principal: ${calculations.principalRatio}%`}
                  />
                  <div
                    style={{ width: `${calculations.interestRatio}%` }}
                    className="bg-amber-700 h-full transition-all duration-300"
                    title={`Interest: ${calculations.interestRatio}%`}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Principal: {calculations.principalRatio}%</span>
                  <span>Interest: {calculations.interestRatio}%</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-7 space-y-3">
                <button
                  type="button"
                  onClick={() => openApplyModal ? openApplyModal('Personal Loan') : null}
                  className="w-full py-3 px-4 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Apply for this Loan EMI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  to="/personal-loan-emi-calculator"
                  className="w-full py-2.5 px-4 text-center text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors block border border-slate-200"
                >
                  Open Full Amortization Schedule
                </Link>
              </div>

            </div>

          </div>

          {/* Quick Calculator Discovery Chips */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs">
            <span className="font-bold text-slate-700">More Financial Calculators:</span>
            <div className="flex flex-wrap gap-2">
              <Link to="/home-loan-emi-calculator" className="px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded font-medium text-slate-700 transition-colors">
                Home Loan EMI
              </Link>
              <Link to="/gold-loan-emi-calculator" className="px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded font-medium text-slate-700 transition-colors">
                Gold Loan Calculator
              </Link>
              <Link to="/calculators" className="px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded font-medium text-slate-700 transition-colors">
                All 18+ Calculators &rarr;
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
