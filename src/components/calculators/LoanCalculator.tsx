import React, { useState } from 'react';

const LoanCalculator: React.FC = () => {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);

  const monthlyRate = rate / 100 / 12;
  const n = years * 12;
  const monthlyPayment = amount > 0 && rate > 0 && years > 0
    ? (amount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
    : 0;
  const totalPayment = monthlyPayment * n;
  const totalInterest = totalPayment - amount;

  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Loan Calculator</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Loan Amount ($)</label>
          <input type="number" className="w-full border rounded px-3 py-2" value={amount} min={0} onChange={e => setAmount(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
          <input type="number" className="w-full border rounded px-3 py-2" value={rate} min={0} step={0.01} onChange={e => setRate(Number(e.target.value))} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Loan Term (years)</label>
          <input type="number" className="w-full border rounded px-3 py-2" value={years} min={1} max={40} onChange={e => setYears(Number(e.target.value))} />
        </div>
      </form>
      <div className="bg-white rounded p-4 shadow text-gray-800">
        <div className="mb-2"><strong>Monthly Payment:</strong> ${monthlyPayment ? monthlyPayment.toLocaleString(undefined, {maximumFractionDigits: 2}) : '0.00'}</div>
        <div className="mb-2"><strong>Total Interest Paid:</strong> ${totalInterest ? totalInterest.toLocaleString(undefined, {maximumFractionDigits: 2}) : '0.00'}</div>
        <div><strong>Total Cost of Loan:</strong> ${totalPayment ? totalPayment.toLocaleString(undefined, {maximumFractionDigits: 2}) : '0.00'}</div>
      </div>
    </div>
  );
};

export default LoanCalculator;
