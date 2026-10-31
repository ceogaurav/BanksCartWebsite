import React, { useState, useMemo } from 'react';
import { IndianRupee, Percent, Calculator, ExternalLink } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export default function SSYCalculatorEmbed() {
  const [yearlyContribution, setYearlyContribution] = useState<number>(100000);
  const rate = 0.082; // 8.2% current interest rate

  const calculations = useMemo(() => {
    const P = yearlyContribution;
    let totalInvested = 0;
    let balance = 0;

    for (let year = 1; year <= 21; year++) {
      if (year <= 15) {
        balance += P;
        totalInvested += P;
      }
      const interest = balance * rate;
      balance += interest;
    }

    return {
      totalInvested,
      maturityAmount: Math.round(balance),
      interestEarned: Math.round(balance - totalInvested),
      maturityYear: new Date().getFullYear() + 21,
    };
  }, [yearlyContribution]);

  const chartData = {
    labels: ['Total Investment', 'Total Interest'],
    datasets: [
      {
        data: [calculations.totalInvested, calculations.interestEarned],
        backgroundColor: ['#f43f5e', '#10b981'],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-white p-4 sm:p-6 font-sans text-gray-800 antialiased min-h-screen flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between border-b pb-3 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
                Sukanya Samriddhi Yojana (SSY) Calculator
              </h1>
              <p className="text-xs text-gray-500">Government Rate: 8.2% p.a. (Compounded Annually)</p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full">
            EEE Tax Status
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-gray-700">Yearly Deposit (₹)</label>
                <span className="text-sm font-bold text-pink-600">
                  {formatCurrency(yearlyContribution)}
                </span>
              </div>
              <input
                type="range"
                min="250"
                max="150000"
                step="500"
                value={yearlyContribution}
                onChange={(e) => setYearlyContribution(Number(e.target.value))}
                className="w-full h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-600"
              />
              <div className="flex justify-between text-[11px] text-gray-400 mt-1">
                <span>Min: ₹250</span>
                <span>Max: ₹1.5 Lakh/yr</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mb-3">
              <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-500 block text-[11px]">Investment Period</span>
                <span className="font-bold text-gray-900">15 Years</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-500 block text-[11px]">Total Maturity</span>
                <span className="font-bold text-gray-900">21 Years ({calculations.maturityYear})</span>
              </div>
            </div>

            <div className="p-3 bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl border border-pink-100">
              <div className="text-[11px] text-rose-700 font-medium uppercase tracking-wider mb-0.5">
                Maturity Value at Age 21
              </div>
              <div className="text-2xl font-extrabold text-rose-600">
                {formatCurrency(calculations.maturityAmount)}
              </div>
              <div className="flex justify-between text-xs text-gray-600 mt-2 pt-2 border-t border-pink-200/60">
                <span>Total Deposited: <strong>{formatCurrency(calculations.totalInvested)}</strong></span>
                <span>Interest: <strong className="text-emerald-600">{formatCurrency(calculations.interestEarned)}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center p-2">
            <div className="w-36 h-36">
              <Doughnut
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                  plugins: { legend: { display: false } },
                  cutout: '70%',
                }}
              />
            </div>
            <div className="flex justify-center gap-4 text-xs mt-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="text-gray-600">Principal</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-gray-600">Interest</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>Updated for FY 2025-26</span>
        <a
          href="https://www.bankscart.com/ssy-calculator"
          target="_blank"
          rel="noopener"
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium"
        >
          Compare on BanksCart <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
