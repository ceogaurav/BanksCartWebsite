import React from 'react';
import LoanCalculator from '../components/calculators/LoanCalculator';

const LoanCalculatorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Loan Calculator</h1>
        <p className="text-lg text-gray-600 mb-8">
          Use this calculator to estimate your monthly loan payments, total interest, and total cost for any type of loan.
        </p>
        <LoanCalculator />
      </div>
    </div>
  );
};

export default LoanCalculatorPage;
