import React, { useState } from 'react';

const MortgageCalculator: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(300000);
  const [interestRate, setInterestRate] = useState(4);
  const [loanTerm, setLoanTerm] = useState(30);
  const [downPayment, setDownPayment] = useState(60000);

  const principal = loanAmount - downPayment;
  const monthlyInterest = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;

  // Monthly payment formula
  const monthlyPayment = principal > 0 && interestRate > 0 && loanTerm > 0
    ? (principal * monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments)) /
      (Math.pow(1 + monthlyInterest, numberOfPayments) - 1)
    : 0;

  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - principal;

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-bold mb-4">Quick Mortgage Calculator</h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Home Price ($)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={loanAmount}
            min={0}
            onChange={e => setLoanAmount(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Down Payment ($)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={downPayment}
            min={0}
            max={loanAmount}
            onChange={e => setDownPayment(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={interestRate}
            min={0}
            step={0.01}
            onChange={e => setInterestRate(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Loan Term (years)</label>
          <input
            type="number"
            className="w-full border rounded px-3 py-2"
            value={loanTerm}
            min={1}
            max={40}
            onChange={e => setLoanTerm(Number(e.target.value))}
          />
        </div>
      </form>
      <div className="bg-white rounded p-4 shadow text-gray-800">
        <div className="mb-2"><strong>Loan Amount:</strong> ${principal.toLocaleString()}</div>
        <div className="mb-2"><strong>Monthly Payment:</strong> ${monthlyPayment ? monthlyPayment.toLocaleString(undefined, {maximumFractionDigits: 2}) : '0.00'}</div>
        <div className="mb-2"><strong>Total Interest Paid:</strong> ${totalInterest ? totalInterest.toLocaleString(undefined, {maximumFractionDigits: 2}) : '0.00'}</div>
        <div><strong>Total Cost of Loan:</strong> ${totalPayment ? totalPayment.toLocaleString(undefined, {maximumFractionDigits: 2}) : '0.00'}</div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
