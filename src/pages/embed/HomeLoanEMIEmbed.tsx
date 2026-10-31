import React, { useState, useMemo } from 'react';
import { Calculator, ExternalLink } from 'lucide-react';

const formatCurrency = (value: number) =>
  value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).replace('₹', '₹ ');

function calculateEMI(P: number, R: number, N: number) {
  const r = R / 12 / 100;
  const n = N * 12;
  if (r === 0) return P / n;
  return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export default function HomeLoanEMIEmbed() {
  const [amount, setAmount] = useState<number>(3500000);
  const [rate, setRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(20);

  const emi = useMemo(() => Math.round(calculateEMI(amount, rate, tenure)), [amount, rate, tenure]);
  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - amount;

  return (
    <div className="bg-white p-4 sm:p-6 font-sans text-gray-800 antialiased min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                Home Loan EMI Calculator
              </h1>
              <p className="text-xs text-gray-500">Real-time interest & monthly payment estimate</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
            All Indian Banks
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <label className="font-semibold text-gray-700">Loan Amount</label>
                <span className="font-bold text-blue-600">{formatCurrency(amount)}</span>
              </div>
              <input
                type="range"
                min="500000"
                max="20000000"
                step="50000"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <label className="font-semibold text-gray-700">Interest Rate (% p.a.)</label>
                <span className="font-bold text-blue-600">{rate}%</span>
              </div>
              <input
                type="range"
                min="6.5"
                max="14.0"
                step="0.05"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1 text-xs">
                <label className="font-semibold text-gray-700">Tenure (Years)</label>
                <span className="font-bold text-blue-600">{tenure} Yrs</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={tenure}
                onChange={(e) => setTenure(Number(e.target.value))}
                className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/60 p-5 rounded-2xl border border-blue-100 text-center">
            <span className="text-xs uppercase tracking-wider text-blue-600 font-semibold">Monthly EMI</span>
            <div className="text-3xl font-extrabold text-blue-900 mt-1 mb-4">
              {formatCurrency(emi)}
            </div>

            <div className="grid grid-cols-2 gap-3 text-left pt-3 border-t border-blue-200/60 text-xs">
              <div>
                <span className="text-gray-500 block">Total Interest</span>
                <span className="font-bold text-gray-800">{formatCurrency(totalInterest)}</span>
              </div>
              <div>
                <span className="text-gray-500 block">Total Payment</span>
                <span className="font-bold text-gray-800">{formatCurrency(totalPayment)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>Accurate Amortization Schedule</span>
        <a
          href="https://www.bankscart.com/home-loan-emi-calculator"
          target="_blank"
          rel="noopener"
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
        >
          Detailed Schedule on BanksCart <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
