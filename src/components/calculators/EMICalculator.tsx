import React, { useState, useCallback } from 'react';
import { Calculator } from 'lucide-react';
import { calculateEMI, calculateTotalAmount, calculateTotalInterest, formatCurrency } from '../../utils/calculations';

const EMICalculator: React.FC = () => {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(60);

  const emi = calculateEMI(principal, rate, tenure);
  const totalAmount = calculateTotalAmount(emi, tenure);
  const totalInterest = calculateTotalInterest(totalAmount, principal);

  const handleSliderChange = useCallback((setter: React.Dispatch<React.SetStateAction<number>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(Number(e.target.value));
    }, []
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-primary-600 p-2 rounded-lg">
          <Calculator className="h-5 w-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">EMI Calculator</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Loan Amount: {formatCurrency(principal)}
            </label>
            <input
              type="range"
              min="50000"
              max="10000000"
              step="10000"
              value={principal}
              onChange={handleSliderChange(setPrincipal)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹50K</span>
              <span>₹1Cr</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Interest Rate: {rate}% per annum
            </label>
            <input
              type="range"
              min="5"
              max="30"
              step="0.1"
              value={rate}
              onChange={handleSliderChange(setRate)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5%</span>
              <span>30%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Loan Tenure: {Math.floor(tenure / 12)} years {tenure % 12} months
            </label>
            <input
              type="range"
              min="12"
              max="360"
              step="12"
              value={tenure}
              onChange={handleSliderChange(setTenure)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1 year</span>
              <span>30 years</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Summary</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Monthly EMI</span>
                <span className="text-2xl font-bold text-primary-600">{formatCurrency(emi)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Amount Payable</span>
                <span className="text-lg font-semibold text-gray-900">{formatCurrency(totalAmount)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Interest</span>
                <span className="text-lg font-semibold text-gray-900">{formatCurrency(totalInterest)}</span>
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
                  <span className="text-sm text-gray-600">Principal</span>
                </div>
                <span className="text-sm font-semibold">
                  {((principal / totalAmount) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-secondary-600 rounded"></div>
                  <span className="text-sm text-gray-600">Interest</span>
                </div>
                <span className="text-sm font-semibold">
                  {((totalInterest / totalAmount) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;