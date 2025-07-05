import React, { useState, useCallback } from 'react';
import { Receipt } from 'lucide-react';
import { formatCurrency } from '../../utils/calculations';

// Simple tax calculation: slab-based (example for demonstration)
function calculateTax(income: number) {
  let tax = 0;
  if (income <= 250000) {
    tax = 0;
  } else if (income <= 500000) {
    tax = (income - 250000) * 0.05;
  } else if (income <= 1000000) {
    tax = 12500 + (income - 500000) * 0.2;
  } else {
    tax = 112500 + (income - 1000000) * 0.3;
  }
  return tax;
}

const TaxCalculator: React.FC = () => {
  const [income, setIncome] = useState(600000);

  const tax = calculateTax(income);
  const postTaxIncome = income - tax;

  const handleSliderChange = useCallback((setter: React.Dispatch<React.SetStateAction<number>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(Number(e.target.value));
    }, []
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-primary-600 p-2 rounded-lg">
          <Receipt className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Tax Calculator</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Annual Income: {formatCurrency(income)}
            </label>
            <input
              type="range"
              min="100000"
              max="3000000"
              step="10000"
              value={income}
              onChange={handleSliderChange(setIncome)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹1L</span>
              <span>₹30L</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Tax Payable</span>
                <span className="text-2xl font-bold text-primary-600">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Post-Tax Income</span>
                <span className="text-lg font-semibold text-gray-900">{formatCurrency(postTaxIncome)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Gross Income</span>
                <span className="text-lg font-semibold text-gray-900">{formatCurrency(income)}</span>
              </div>
            </div>
          </div>

          {/* Pie Chart Visualization */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-md font-semibold text-gray-900 mb-4">Breakdown</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-primary-600 rounded"></div>
                  <span className="text-sm text-gray-600">Post-Tax Income</span>
                </div>
                <span className="text-sm font-semibold">
                  {((postTaxIncome / income) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-secondary-600 rounded"></div>
                  <span className="text-sm text-gray-600">Tax</span>
                </div>
                <span className="text-sm font-semibold">
                  {((tax / income) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxCalculator;
