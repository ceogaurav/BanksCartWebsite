// src/components/IncomeTaxPage/PPFCalculator.tsx
import React, { useState } from 'react';

// Define the props interface if your component receives any props
interface PPFCalculatorProps {
  // Example: You might pass a title or initial values
  // initialInvestment?: number;
}

const PPFCalculator: React.FC<PPFCalculatorProps> = () => {
  // Example state for a simple calculator
  const [investment, setInvestment] = useState<number>(0);
  const [years, setYears] = useState<number>(15);
  const [maturityAmount, setMaturityAmount] = useState<number>(0);

  // Example calculation logic (you'll replace this with actual PPF logic)
  const calculatePPF = () => {
    // This is a placeholder. Replace with actual PPF calculation formula.
    // PPF interest rate is usually compounded annually.
    // For simplicity, let's assume a fixed rate for this example.
    const annualInterestRate = 0.071; // Example: 7.1%
    let currentAmount = investment;

    for (let i = 0; i < years; i++) {
      currentAmount += currentAmount * annualInterestRate;
    }
    setMaturityAmount(currentAmount);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 max-w-md mx-auto my-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">PPF Calculator</h2>

      <div className="mb-4">
        <label htmlFor="investment" className="block text-sm font-medium text-gray-700 mb-1">
          Annual Investment (₹):
        </label>
        <input
          type="number"
          id="investment"
          className="form-input"
          value={investment}
          onChange={(e) => setInvestment(parseFloat(e.target.value) || 0)}
          min="0"
          step="1000"
          placeholder="e.g., 150000"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="years" className="block text-sm font-medium text-gray-700 mb-1">
          Number of Years:
        </label>
        <input
          type="number"
          id="years"
          className="form-input"
          value={years}
          onChange={(e) => setYears(parseInt(e.target.value) || 0)}
          min="1"
          max="50"
          placeholder="e.g., 15"
        />
      </div>

      <button
        onClick={calculatePPF}
        className="btn-primary-large w-full"
      >
        Calculate Maturity
      </button>

      {maturityAmount > 0 && (
        <div className="mt-8 text-center bg-primary-50 p-4 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-700">Estimated Maturity Amount:</h3>
          <p className="text-3xl font-extrabold text-primary-700 mt-2">
            ₹{maturityAmount.toFixed(2)}
          </p>
          <p className="text-xs text-gray-500 mt-1">*This is an estimate. Actual returns may vary.</p>
        </div>
      )}
    </div>
  );
};

export default PPFCalculator;
