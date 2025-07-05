import React, { useState } from 'react';

// Utility for currency formatting
const formatCurrency = (value: number) =>
  value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

const quickAmounts = [25000, 50000, 100000, 500000, 1000000];
const quickTenures = [1, 2, 3, 5]; // in years

import FDLiveCharts, { FDChartProps } from './FDLiveCharts';

interface FDCalculatorProps {
  LiveChartsComponent?: React.ComponentType<FDChartProps>;
}

const FDCalculator: React.FC<FDCalculatorProps> = ({ LiveChartsComponent }) => {
  // State
  const [amount, setAmount] = useState(100000);
  const [tenure, setTenure] = useState(1); // in years
  const [tenureDays, setTenureDays] = useState(365); // for dual slider
  const [interestType, setInterestType] = useState<'cumulative' | 'monthly'>('cumulative');
  const [rate, setRate] = useState(7.25); // default rate

  // Calculation logic (simple compounding for demo)
  const n = interestType === 'cumulative' ? 1 : 12;
  const t = tenure;
  const r = rate / 100;
  const maturity = interestType === 'cumulative'
    ? amount * Math.pow(1 + r / n, n * t)
    : amount + (amount * r * t); // simplified for monthly payout
  const interest = maturity - amount;
  const effectiveYield = ((maturity / amount - 1) * 100).toFixed(2);
  const monthlyPayout = interestType === 'monthly' ? (interest / (t * 12)).toFixed(0) : null;

  return (
    <section id="fd-calculator" className="w-full bg-[#F0F9FF] py-16 px-2 md:px-0 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col gap-8 animate-fadeInUp">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E40AF] mb-2 font-inter">See Your Money Grow</h2>
          <p className="text-lg md:text-xl text-[#64748B] font-medium">Calculate exact returns on your investment with our smart FD calculator</p>
        </div>
        {/* Investment Amount */}
        <div>
          <label className="block text-lg font-semibold mb-2">Investment Amount</label>
          <div className="flex gap-2 mb-3">
            {quickAmounts.map((amt) => (
              <button
                key={amt}
                className={`px-4 py-2 rounded-lg font-poppins font-bold border transition-all ${amount === amt ? 'bg-gradient-to-r from-[#059669] to-[#10B981] text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'}`}
                onClick={() => setAmount(amt)}
              >
                {formatCurrency(amt)}
              </button>
            ))}
          </div>
          <input
            type="range"
            min={10000}
            max={5000000}
            step={1000}
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            className="w-full accent-[#059669]"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>₹10,000</span>
            <span>₹50,00,000</span>
          </div>
          <input
            type="text"
            value={formatCurrency(amount)}
            onChange={e => {
              const val = Number(e.target.value.replace(/[^\d]/g, ''));
              if (!isNaN(val)) setAmount(val);
            }}
            className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-200 text-lg font-poppins text-right focus:ring-2 focus:ring-[#059669]"
            aria-label="Investment Amount"
          />
        </div>
        {/* Investment Tenure */}
        <div>
          <label className="block text-lg font-semibold mb-2">Investment Tenure</label>
          <div className="flex gap-2 mb-3">
            {quickTenures.map((yr) => (
              <button
                key={yr}
                className={`px-4 py-2 rounded-lg font-poppins font-bold border transition-all ${tenure === yr ? 'bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'}`}
                onClick={() => { setTenure(yr); setTenureDays(yr * 365); }}
              >
                {yr}Y
              </button>
            ))}
          </div>
          <input
            type="range"
            min={7}
            max={3650}
            step={1}
            value={tenureDays}
            onChange={e => {
              setTenureDays(Number(e.target.value));
              setTenure(Number((Number(e.target.value) / 365).toFixed(2)));
            }}
            className="w-full accent-[#1E40AF]"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>7 days</span>
            <span>10 years</span>
          </div>
          <div className="mt-2 text-right text-lg font-poppins font-semibold text-[#1E40AF]">{tenure} years</div>
        </div>
        {/* Interest Type Selection */}
        <div>
          <label className="block text-lg font-semibold mb-2">Interest Type</label>
          <div className="flex gap-4 items-center">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-poppins font-bold border transition-all ${interestType === 'cumulative' ? 'bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-white' : 'bg-gray-100 text-gray-700 hover:bg-yellow-50'}`}
              onClick={() => setInterestType('cumulative')}
            >
              <span role="img" aria-label="Cumulative">📈</span> Cumulative
            </button>
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-poppins font-bold border transition-all ${interestType === 'monthly' ? 'bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] text-white' : 'bg-gray-100 text-gray-700 hover:bg-blue-50'}`}
              onClick={() => setInterestType('monthly')}
            >
              <span role="img" aria-label="Monthly">📅</span> Monthly Payout
            </button>
            <span className="ml-4 text-sm text-gray-500 animate-fadeIn">{interestType === 'cumulative' ? 'Interest paid at maturity for maximum growth.' : 'Interest paid out monthly for regular income.'}</span>
          </div>
        </div>
        {/* Results Panel */}
        <div className="grid md:grid-cols-2 gap-8 mt-6">
          <div className="flex flex-col gap-4 items-center justify-center">
            <div className="text-2xl font-bold text-[#059669] font-poppins">Maturity Amount</div>
            <div className="text-4xl md:text-5xl font-extrabold text-[#1E40AF] font-poppins animate-count">{formatCurrency(Math.round(maturity))}</div>
            <div className="text-lg text-gray-500">Interest Earned: <span className="text-[#059669] font-bold animate-grow">{formatCurrency(Math.round(interest))}</span></div>
            <div className="text-base text-gray-500">Effective Yield: <span className="text-[#D97706] font-bold animate-float">{effectiveYield}%</span></div>
            {monthlyPayout && (
              <div className="text-base text-gray-500">Monthly Payout: <span className="text-[#3B82F6] font-bold animate-float">{formatCurrency(Number(monthlyPayout))}</span></div>
            )}
          </div>
          <div className="flex flex-col gap-4 items-center justify-center w-full">
            {LiveChartsComponent ? (
              <LiveChartsComponent
                principal={amount}
                rate={rate}
                tenure={tenure}
                compounding={interestType === 'cumulative' ? 'yearly' : 'monthly'}
              />
            ) : (
              <>
                <div className="w-full h-40 bg-gradient-to-r from-[#F0F9FF] to-[#D1FAE5] rounded-2xl flex items-center justify-center text-gray-400 font-poppins">[Growth Chart Coming Soon]</div>
                <div className="w-full h-8 bg-gray-100 rounded-full mt-2 flex items-center">
                  <div className="h-8 rounded-full bg-gradient-to-r from-[#059669] to-[#10B981] animate-progress" style={{ width: `${(interest / maturity) * 100 + 30}%`, minWidth: 40 }}></div>
                  <span className="ml-4 text-sm text-gray-700 font-bold">Principal vs Interest</span>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 mt-8 justify-center">
          <button className="bg-gradient-to-r from-[#059669] to-[#10B981] text-white font-poppins text-lg px-8 py-3 rounded-xl font-bold shadow-lg transform transition hover:scale-105 hover:shadow-2xl">Invest This Amount</button>
          <button className="bg-white text-[#1E40AF] font-poppins text-lg px-8 py-3 rounded-xl font-bold shadow-lg border-2 border-[#1E40AF] hover:bg-blue-50 hover:scale-105 transition">Compare Other Options</button>
          <button className="bg-white text-[#059669] font-poppins text-lg px-8 py-3 rounded-xl font-bold shadow-lg border-2 border-[#059669] hover:bg-green-50 hover:scale-105 transition">Share Results</button>
        </div>
      </div>
    </section>
  );
};

export default FDCalculator;
