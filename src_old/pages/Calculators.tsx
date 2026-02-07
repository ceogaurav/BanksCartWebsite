import React, { useState } from 'react';
import { Calculator, PiggyBank, Receipt } from 'lucide-react';
import EMICalculator from '../components/calculators/EMICalculator';

const Calculators: React.FC = () => {
  const [activeCalculator, setActiveCalculator] = useState('emi');

  const calculators = [
    {
      id: 'emi',
      name: 'EMI Calculator',
      icon: Calculator,
      description: 'Calculate monthly EMI for loans',
    },
    {
      id: 'fd',
      name: 'FD Calculator',
      icon: PiggyBank,
      description: 'Calculate fixed deposit returns',
    },
    {
      id: 'tax',
      name: 'Tax Calculator',
      icon: Receipt,
      description: 'Calculate income tax liability',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Financial Calculators
          </h1>
          <p className="text-xl text-gray-600">
            Make informed financial decisions with our calculators
          </p>
        </div>

        {/* Calculator Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {calculators.map((calc) => {
              const Icon = calc.icon;
              return (
                <button
                  key={calc.id}
                  onClick={() => setActiveCalculator(calc.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                    activeCalculator === calc.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{calc.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Calculator Content */}
        <div>
          {activeCalculator === 'emi' && <EMICalculator />}
          {activeCalculator === 'fd' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">FD Calculator</h2>
              <p className="text-gray-600">FD Calculator coming soon...</p>
            </div>
          )}
          {activeCalculator === 'tax' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tax Calculator</h2>
              <p className="text-gray-600">Tax Calculator coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calculators;