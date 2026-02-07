import React from 'react';
import EMIcalculator from '../components/calculators/EMIcalculator';

const EMIcalculatorPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">EMI Calculator</h1>
        <p className="text-lg text-gray-600 mb-8">
          Use this calculator to estimate your monthly EMI, total interest, and total payment for your loan.
        </p>
        <EMIcalculator />
      </div>
    </div>
  );
};

export default EMIcalculatorPage;
