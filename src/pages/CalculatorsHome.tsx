import React from 'react';
import { Link } from 'react-router-dom';

const CalculatorsHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">All Calculators</h1>
        <ul className="list-disc list-inside space-y-4 text-lg">
          <li>
            <Link className="text-blue-600 hover:underline" to="/mortgage-calculator">Mortgage Calculator</Link>
          </li>
          <li>
            <Link className="text-blue-600 hover:underline" to="/loan-calculator">Loan Calculator</Link>
          </li>
          <li>
            <Link className="text-blue-600 hover:underline" to="/emi-calculator">EMI Calculator</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CalculatorsHome;
