import React, { useState } from "react";

const minAmount = 50000;
const maxAmount = 50000000;
const minRate = 8;
const maxRate = 30;
const minTenure = 12;
const maxTenure = 60;

function calculateEMI(P, r, n) {
  const monthlyRate = r / (12 * 100);
  if (monthlyRate === 0) return P / n;
  return (
    (P * monthlyRate * Math.pow(1 + monthlyRate, n)) /
    (Math.pow(1 + monthlyRate, n) - 1)
  );
}

const EmiCalculator = () => {
  const [amount, setAmount] = useState(300000);
  const [rate, setRate] = useState(10.5);
  const [tenure, setTenure] = useState(36);

  const emi = calculateEMI(amount, rate, tenure);
  const totalPayment = emi * tenure;
  const interestPayable = totalPayment - amount;

  return (
    <section className="my-12 bg-gradient-to-br from-blue-50 via-white to-teal-50 rounded-2xl shadow-xl border border-blue-100 p-6 md:p-12">
      <h2 className="text-3xl font-extrabold mb-7 text-gray-900 text-center tracking-tight drop-shadow-sm">
        Personal Loan EMI Calculator
      </h2>
      <form className="grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-8">
          {/* Loan Amount */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Loan Amount (₹)</label>
            <input
              type="range"
              min={minAmount}
              max={maxAmount}
              step={10000}
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 rounded-lg bg-gray-200"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹{minAmount.toLocaleString()}</span>
              <span>₹{maxAmount.toLocaleString()}</span>
            </div>
            <input
              type="number"
              min={minAmount}
              max={maxAmount}
              step={10000}
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              className="mt-2 w-full border-2 border-teal-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 font-semibold text-lg shadow-sm"
            />
          </div>
          {/* Interest Rate */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Interest Rate (% p.a.)</label>
            <input
              type="range"
              min={minRate}
              max={maxRate}
              step={0.1}
              value={rate}
              onChange={e => setRate(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 rounded-lg bg-gray-200"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{minRate}%</span>
              <span>{maxRate}%</span>
            </div>
            <input
              type="number"
              min={minRate}
              max={maxRate}
              step={0.1}
              value={rate}
              onChange={e => setRate(Number(e.target.value))}
              className="mt-2 w-full border-2 border-teal-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 font-semibold text-lg shadow-sm"
            />
          </div>
          {/* Tenure */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Tenure (months)</label>
            <input
              type="range"
              min={minTenure}
              max={maxTenure}
              step={1}
              value={tenure}
              onChange={e => setTenure(Number(e.target.value))}
              className="w-full accent-teal-600 h-2 rounded-lg bg-gray-200"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{minTenure}</span>
              <span>{maxTenure}</span>
            </div>
            <input
              type="number"
              min={minTenure}
              max={maxTenure}
              step={1}
              value={tenure}
              onChange={e => setTenure(Number(e.target.value))}
              className="mt-2 w-full border-2 border-teal-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 font-semibold text-lg shadow-sm"
            />
          </div>
        </div>
        {/* Results */}
        <div className="bg-gradient-to-br from-teal-100 via-blue-50 to-white rounded-2xl p-8 flex flex-col justify-center items-center shadow-xl border border-teal-200 animate-fadeIn">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 10v6m8-8a8 8 0 11-16 0 8 8 0 0116 0z" /></svg>
            <div className="text-lg font-semibold text-gray-700">Monthly EMI</div>
          </div>
          <div className="text-4xl font-extrabold text-teal-700 mb-4 tracking-tight">₹{emi.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
          <div className="w-full grid grid-cols-2 gap-5 text-base text-gray-700">
            <div className="flex flex-col items-center bg-white/70 rounded-lg p-3 shadow-sm">
              <div className="font-semibold text-teal-600 flex items-center gap-1"><svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m0 0l-3-3m3 3l3-3" /></svg>Principal</div>
              <div className="font-bold">₹{amount.toLocaleString()}</div>
            </div>
            <div className="flex flex-col items-center bg-white/70 rounded-lg p-3 shadow-sm">
              <div className="font-semibold text-pink-600 flex items-center gap-1"><svg className="w-4 h-4 text-pink-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1v4h-1" /></svg>Interest</div>
              <div className="font-bold">₹{interestPayable.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
            <div className="flex flex-col items-center bg-white/70 rounded-lg p-3 shadow-sm col-span-2">
              <div className="font-semibold text-blue-600 flex items-center gap-1"><svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v8m0 0l-3-3m3 3l3-3" /></svg>Total Payment</div>
              <div className="font-bold">₹{totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
            </div>
            <div className="flex flex-col items-center bg-white/70 rounded-lg p-3 shadow-sm col-span-2">
              <div className="font-semibold text-gray-600 flex items-center gap-1"><svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10m-9 4h6" /></svg>Tenure</div>
              <div className="font-bold">{tenure} months</div>
            </div>
          </div>
        </div>
      </form>
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
};

export default EmiCalculator;
