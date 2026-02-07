import React, { useState, useCallback } from 'react';
import { Car, Calculator, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import { calculateEMI, calculateTotalAmount, calculateTotalInterest, formatCurrency } from '../../utils/calculations';

const CarLoanEMI: React.FC = () => {
  const [carPrice, setCarPrice] = useState(800000);
  const [downPayment, setDownPayment] = useState(160000);
  const [rate, setRate] = useState(9.5);
  const [tenure, setTenure] = useState(60); // 5 years

  const principal = carPrice - downPayment;
  const emi = calculateEMI(principal, rate, tenure);
  const totalAmount = calculateTotalAmount(emi, tenure);
  const totalInterest = calculateTotalInterest(totalAmount, principal);

  const handleSliderChange = useCallback((setter: React.Dispatch<React.SetStateAction<number>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(Number(e.target.value));
    }, []
  );

  // Calculate loan-to-value ratio
  const ltvRatio = ((principal / carPrice) * 100).toFixed(1);

  // Generate monthly amortization schedule for first year
  const generateMonthlySchedule = () => {
    const schedule = [];
    let remainingPrincipal = principal;
    const monthlyRate = rate / (12 * 100);

    for (let month = 1; month <= Math.min(12, tenure); month++) {
      const interestPayment = remainingPrincipal * monthlyRate;
      const principalPayment = emi - interestPayment;
      remainingPrincipal -= principalPayment;

      schedule.push({
        month,
        emi,
        principalPayment,
        interestPayment,
        remainingPrincipal: Math.max(0, remainingPrincipal),
      });
    }
    return schedule;
  };

  const monthlySchedule = generateMonthlySchedule();

  const carTypes = [
    { name: 'Hatchback', priceRange: '₹4-8 Lakh', rate: '8.5-11%' },
    { name: 'Sedan', priceRange: '₹8-15 Lakh', rate: '8.5-10.5%' },
    { name: 'SUV', priceRange: '₹10-25 Lakh', rate: '9-11%' },
    { name: 'Luxury', priceRange: '₹25L+', rate: '9.5-12%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 rounded-full">
              <Car className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Car Loan EMI Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your car loan EMI, down payment, and plan your dream car purchase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Input */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Car Loan Calculator</h2>
            </div>

            <div className="space-y-8">
              {/* Car Price */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700">Car Price (On-Road)</label>
                  <span className="text-lg font-bold text-primary-600">{formatCurrency(carPrice)}</span>
                </div>
                <input
                  type="range"
                  min="300000"
                  max="5000000"
                  step="50000"
                  value={carPrice}
                  onChange={handleSliderChange(setCarPrice)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹3L</span>
                  <span>₹50L</span>
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700">Down Payment</label>
                  <span className="text-lg font-bold text-primary-600">{formatCurrency(downPayment)}</span>
                </div>
                <input
                  type="range"
                  min={carPrice * 0.1}
                  max={carPrice * 0.5}
                  step="10000"
                  value={downPayment}
                  onChange={handleSliderChange(setDownPayment)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>10% ({formatCurrency(carPrice * 0.1)})</span>
                  <span>50% ({formatCurrency(carPrice * 0.5)})</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700">Interest Rate (per annum)</label>
                  <span className="text-lg font-bold text-primary-600">{rate}%</span>
                </div>
                <input
                  type="range"
                  min="7"
                  max="15"
                  step="0.1"
                  value={rate}
                  onChange={handleSliderChange(setRate)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>7%</span>
                  <span>15%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700">Loan Tenure</label>
                  <span className="text-lg font-bold text-primary-600">
                    {Math.floor(tenure / 12)} years {tenure % 12} months
                  </span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="84"
                  step="6"
                  value={tenure}
                  onChange={handleSliderChange(setTenure)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 year</span>
                  <span>7 years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Loan Summary
              </h3>
              
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Monthly EMI</p>
                  <p className="text-3xl font-bold text-primary-600">{formatCurrency(emi)}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Loan Amount</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(principal)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Total Interest</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(totalInterest)}</p>
                  </div>
                </div>

                <div className="text-center pt-2 border-t">
                  <p className="text-xs text-gray-600 mb-1">LTV Ratio</p>
                  <p className="text-lg font-semibold text-gray-900">{ltvRatio}%</p>
                </div>
              </div>
            </div>

            {/* Cost Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4">Cost Breakdown</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Car Price</span>
                  <span className="text-sm font-semibold">{formatCurrency(carPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Down Payment</span>
                  <span className="text-sm font-semibold text-green-600">-{formatCurrency(downPayment)}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-sm font-semibold text-gray-900">Loan Amount</span>
                  <span className="text-sm font-bold text-primary-600">{formatCurrency(principal)}</span>
                </div>
              </div>
            </div>

            {/* Payment Breakdown */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
                <PieChart className="h-4 w-4 mr-2" />
                Payment Breakdown
              </h4>
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
              
              {/* Visual Bar */}
              <div className="mt-4 h-4 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary-600 float-left"
                  style={{ width: `${(principal / totalAmount) * 100}%` }}
                ></div>
                <div 
                  className="h-full bg-secondary-600"
                  style={{ width: `${(totalInterest / totalAmount) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Car Types and Rates */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Car Loan Rates by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {carTypes.map((car, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-shadow">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{car.name}</h4>
                <p className="text-sm text-gray-600 mb-2">Price: {car.priceRange}</p>
                <p className="text-sm font-semibold text-primary-600">Rate: {car.rate}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Amortization Schedule */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Monthly Amortization Schedule (First 12 Months)
          </h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMI</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {monthlySchedule.map((row) => (
                  <tr key={row.month} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.month}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.emi)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.principalPayment)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.interestPayment)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.remainingPrincipal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Car Loan Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Car Loan Features</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">Quick Approval</p>
                  <p className="text-sm text-gray-600">Get approved within 24-48 hours</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">Competitive Rates</p>
                  <p className="text-sm text-gray-600">Starting from 7.5% per annum</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">Flexible Tenure</p>
                  <p className="text-sm text-gray-600">Up to 7 years repayment period</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">High Funding</p>
                  <p className="text-sm text-gray-600">Up to 90% of car value</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Eligibility Criteria</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Age</p>
                <p className="text-sm text-gray-600">21-65 years</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Income</p>
                <p className="text-sm text-gray-600">Minimum ₹25,000 per month</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Credit Score</p>
                <p className="text-sm text-gray-600">700+ for best rates</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Employment</p>
                <p className="text-sm text-gray-600">2+ years work experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarLoanEMI;