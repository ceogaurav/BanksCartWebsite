import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, PiggyBank, Target, Calendar, DollarSign } from 'lucide-react';

const PPFCalculator = () => {
  const [monthlyInvestment, setMonthlyInvestment] = useState(12500);
  const [currentAge, setCurrentAge] = useState(30);
  const [results, setResults] = useState({
    totalInvestment: 0,
    maturityAmount: 0,
    totalInterest: 0,
    taxSaved: 0
  });

  const calculatePPF = () => {
    const annualInvestment = monthlyInvestment * 12;
    const years = 15;
    const interestRate = 0.071; // 7.1% current PPF rate
    const taxRate = 0.30; // 30% tax bracket
    
    let totalInvestment = annualInvestment * years;
    let maturityAmount = 0;
    
    // Calculate compound interest for PPF
    for (let year = 1; year <= years; year++) {
      maturityAmount += annualInvestment * Math.pow(1 + interestRate, years - year + 1);
    }
    
    const totalInterest = maturityAmount - totalInvestment;
    const taxSaved = totalInvestment * taxRate;
    
    setResults({
      totalInvestment,
      maturityAmount,
      totalInterest,
      taxSaved
    });
  };

  useEffect(() => {
    calculatePPF();
  }, [monthlyInvestment, currentAge]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const retirementAge = currentAge + 15;
  const yearlyBreakdown = [];
  let cumulativeInvestment = 0;
  let cumulativeAmount = 0;
  
  for (let year = 1; year <= 15; year++) {
    cumulativeInvestment += monthlyInvestment * 12;
    cumulativeAmount += (monthlyInvestment * 12) * Math.pow(1.071, 15 - year + 1);
    yearlyBreakdown.push({
      year,
      age: currentAge + year,
      investment: cumulativeInvestment,
      amount: cumulativeAmount
    });
  }

  return (
    <section id="ppf-calculator" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">PPF Calculator</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your Public Provident Fund returns and plan your retirement with tax-free growth
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Calculator Input */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Calculator className="h-6 w-6 mr-3 text-indigo-600" />
              PPF Investment Calculator
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Investment Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    min="500"
                    max="12500"
                    step="500"
                  />
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Range: ₹500 - ₹12,500 per month (₹6,000 - ₹1,50,000 annually)
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Current Age
                </label>
                <input
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  min="18"
                  max="65"
                />
              </div>

              {/* PPF Features */}
              <div className="bg-green-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-semibold text-green-800 mb-3">PPF Benefits</h4>
                <ul className="space-y-2 text-sm text-green-700">
                  <li>• Tax deduction under Section 80C</li>
                  <li>• Tax-free interest and maturity amount</li>
                  <li>• 15-year lock-in period</li>
                  <li>• Current interest rate: 7.1% p.a.</li>
                  <li>• Partial withdrawal after 7 years</li>
                  <li>• Loan facility available</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <PiggyBank className="h-8 w-8 text-blue-600" />
                  <span className="text-sm text-gray-600">Total Investment</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(results.totalInvestment)}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <Target className="h-8 w-8 text-green-600" />
                  <span className="text-sm text-gray-600">Maturity Value</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(results.maturityAmount)}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                  <span className="text-sm text-gray-600">Interest Earned</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(results.totalInterest)}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <DollarSign className="h-8 w-8 text-orange-600" />
                  <span className="text-sm text-gray-600">Tax Saved</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(results.taxSaved)}
                </div>
              </div>
            </div>

            {/* Maturity Details */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl shadow-xl">
              <h3 className="text-2xl font-bold mb-6 flex items-center">
                <Calendar className="h-6 w-6 mr-3" />
                Maturity Timeline
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <div className="text-sm opacity-90 mb-1">You'll be</div>
                  <div className="text-3xl font-bold">{retirementAge} years old</div>
                </div>
                <div>
                  <div className="text-sm opacity-90 mb-1">Annual Return</div>
                  <div className="text-3xl font-bold">7.1%</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white bg-opacity-20 rounded-xl">
                <div className="text-sm opacity-90 mb-2">Return on Investment</div>
                <div className="text-2xl font-bold">
                  {((results.maturityAmount / results.totalInvestment - 1) * 100).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Yearly Breakdown */}
        <div className="mt-12 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
            <h3 className="text-2xl font-bold">Year-wise PPF Growth</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Investment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Maturity Value</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {yearlyBreakdown.filter((_, index) => index % 3 === 0 || index === yearlyBreakdown.length - 1).map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.investment)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">{formatCurrency(row.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PPFCalculator;