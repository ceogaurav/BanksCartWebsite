import React, { useState } from 'react';
import { Calculator, TrendingUp, AlertTriangle } from 'lucide-react';

const TaxBrackets = () => {
  const [selectedRegime, setSelectedRegime] = useState('new');

  const oldRegimeBrackets = [
    { range: '₹0 - ₹2,50,000', rate: '0%', color: 'bg-green-100 text-green-800' },
    { range: '₹2,50,001 - ₹5,00,000', rate: '5%', color: 'bg-yellow-100 text-yellow-800' },
    { range: '₹5,00,001 - ₹10,00,000', rate: '20%', color: 'bg-orange-100 text-orange-800' },
    { range: '₹10,00,001 & above', rate: '30%', color: 'bg-red-100 text-red-800' }
  ];

  const newRegimeBrackets = [
    { range: '₹0 - ₹3,00,000', rate: '0%', color: 'bg-green-100 text-green-800' },
    { range: '₹3,00,001 - ₹6,00,000', rate: '5%', color: 'bg-yellow-100 text-yellow-800' },
    { range: '₹6,00,001 - ₹9,00,000', rate: '10%', color: 'bg-orange-100 text-orange-800' },
    { range: '₹9,00,001 - ₹12,00,000', rate: '15%', color: 'bg-red-100 text-red-800' },
    { range: '₹12,00,001 - ₹15,00,000', rate: '20%', color: 'bg-purple-100 text-purple-800' },
    { range: '₹15,00,001 & above', rate: '30%', color: 'bg-gray-100 text-gray-800' }
  ];

  const currentBrackets = selectedRegime === 'new' ? newRegimeBrackets : oldRegimeBrackets;

  return (
    <section id="tax-brackets" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Tax Brackets & Rates</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding tax slabs under both old and new tax regimes for FY 2024-25
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Regime Selector */}
          <div className="flex justify-center mb-12">
            <div className="bg-white p-2 rounded-full shadow-lg">
              <button
                onClick={() => setSelectedRegime('new')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedRegime === 'new' 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                New Tax Regime
              </button>
              <button
                onClick={() => setSelectedRegime('old')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedRegime === 'old' 
                    ? 'bg-indigo-600 text-white shadow-lg' 
                    : 'text-gray-600 hover:text-indigo-600'
                }`}
              >
                Old Tax Regime
              </button>
            </div>
          </div>

          {/* Tax Brackets Display */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold">
                  {selectedRegime === 'new' ? 'New Tax Regime' : 'Old Tax Regime'} (FY 2024-25)
                </h3>
                <Calculator className="h-8 w-8" />
              </div>
              <p className="text-indigo-100 mt-2">
                {selectedRegime === 'new' 
                  ? 'Higher basic exemption limit with limited deductions' 
                  : 'Lower basic exemption limit with extensive deductions available'
                }
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {currentBrackets.map((bracket, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`px-4 py-2 rounded-full font-semibold ${bracket.color}`}>
                        {bracket.rate}
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-900">
                          {bracket.range}
                        </div>
                        <div className="text-sm text-gray-600">
                          Income range for {bracket.rate} tax rate
                        </div>
                      </div>
                    </div>
                    <TrendingUp className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Additional Charges</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Health & Education Cess: 4% on income tax</li>
                <li>• Surcharge: 10% (₹50L-₹1Cr), 15% (₹1Cr-₹2Cr), 25% (₹2Cr-₹5Cr), 37% (above ₹5Cr)</li>
                <li>• Marginal Relief: Available for surcharge calculations</li>
              </ul>
            </div>

            <div className="bg-green-50 p-6 rounded-xl border border-green-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900">Tax Optimization Tips</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Compare both regimes before choosing</li>
                <li>• Consider your deduction eligibility</li>
                <li>• Plan investments for tax efficiency</li>
                <li>• Review regime choice annually</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaxBrackets;