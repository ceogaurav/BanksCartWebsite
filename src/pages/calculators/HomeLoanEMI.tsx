import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Home, Calculator, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import { calculateEMI, calculateTotalAmount, calculateTotalInterest, formatCurrency } from '../../utils/calculations';

const HomeLoanEMI: React.FC = () => {
  // Local immediate slider display values (for 60fps instant UI updates)
  const [displayPrincipal, setDisplayPrincipal] = useState(2500000);
  const [displayRate, setDisplayRate] = useState(8.5);
  const [displayTenure, setDisplayTenure] = useState(240); // 20 years

  // Debounced calculation state (minimum 150ms delay to eliminate INP latency bottlenecks)
  const [calcPrincipal, setCalcPrincipal] = useState(2500000);
  const [calcRate, setCalcRate] = useState(8.5);
  const [calcTenure, setCalcTenure] = useState(240);

  // Initial calculations
  const initialEmi = calculateEMI(2500000, 8.5, 240);
  const initialTotal = calculateTotalAmount(initialEmi, 240);
  const initialInterest = calculateTotalInterest(initialTotal, 2500000);

  const [emi, setEmi] = useState(initialEmi);
  const [totalAmount, setTotalAmount] = useState(initialTotal);
  const [totalInterest, setTotalInterest] = useState(initialInterest);
  const [taxBenefits, setTaxBenefits] = useState(() => ({
    principalRepayment: Math.min(150000, 2500000 * 0.1),
    interestDeduction: Math.min(200000, (initialInterest / 240) * 12),
    total: Math.min(150000, 2500000 * 0.1) + Math.min(200000, (initialInterest / 240) * 12)
  }));

  const [yearlySchedule, setYearlySchedule] = useState(() => {
    const schedule = [];
    let remainingPrincipal = 2500000;
    const monthlyRate = 8.5 / (12 * 100);
    const years = Math.ceil(240 / 12);
    for (let year = 1; year <= Math.min(10, years); year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      let month = 1;
      while (month <= 12 && remainingPrincipal > 0) {
        const interestPayment = remainingPrincipal * monthlyRate;
        const principalPayment = initialEmi - interestPayment;
        yearlyPrincipal += principalPayment;
        yearlyInterest += interestPayment;
        remainingPrincipal -= principalPayment;
        month++;
      }
      schedule.push({
        year,
        yearlyPrincipal,
        yearlyInterest,
        remainingPrincipal: Math.max(0, remainingPrincipal),
      });
    }
    return schedule;
  });

  // Timers for 150ms debouncing
  const principalTimer = useRef(null);
  const rateTimer = useRef(null);
  const tenureTimer = useRef(null);

  const handlePrincipalChange = useCallback((e) => {
    const val = Number(e.target.value);
    setDisplayPrincipal(val);
    if (principalTimer.current) clearTimeout(principalTimer.current);
    principalTimer.current = setTimeout(() => setCalcPrincipal(val), 150);
  }, []);

  const handleRateChange = useCallback((e) => {
    const val = Number(e.target.value);
    setDisplayRate(val);
    if (rateTimer.current) clearTimeout(rateTimer.current);
    rateTimer.current = setTimeout(() => setCalcRate(val), 150);
  }, []);

  const handleTenureChange = useCallback((e) => {
    const val = Number(e.target.value);
    setDisplayTenure(val);
    if (tenureTimer.current) clearTimeout(tenureTimer.current);
    tenureTimer.current = setTimeout(() => setCalcTenure(val), 150);
  }, []);

  useEffect(() => {
    return () => {
      if (principalTimer.current) clearTimeout(principalTimer.current);
      if (rateTimer.current) clearTimeout(rateTimer.current);
      if (tenureTimer.current) clearTimeout(tenureTimer.current);
    };
  }, []);

  // Offload recalculation and amortization schedule to an asynchronous microtask
  useEffect(() => {
    const runRecalculation = () => {
      const calculatedEmi = calculateEMI(calcPrincipal, calcRate, calcTenure);
      const calculatedTotal = calculateTotalAmount(calculatedEmi, calcTenure);
      const calculatedInterest = calculateTotalInterest(calculatedTotal, calcPrincipal);

      const principalRepayment = Math.min(150000, calcPrincipal * 0.1);
      const interestDeduction = Math.min(200000, (calculatedInterest / calcTenure) * 12);

      const schedule = [];
      let remPrincipal = calcPrincipal;
      const monthlyRate = calcRate / (12 * 100);
      const years = Math.ceil(calcTenure / 12);

      for (let yr = 1; yr <= Math.min(10, years); yr++) {
        let yrPrincipal = 0;
        let yrInterest = 0;
        let m = 1;
        while (m <= 12 && remPrincipal > 0) {
          const intPayment = remPrincipal * monthlyRate;
          const prPayment = calculatedEmi - intPayment;
          yrPrincipal += prPayment;
          yrInterest += intPayment;
          remPrincipal -= prPayment;
          m++;
        }
        schedule.push({
          year: yr,
          yearlyPrincipal: yrPrincipal,
          yearlyInterest: yrInterest,
          remainingPrincipal: Math.max(0, remPrincipal),
        });
      }

      setEmi(calculatedEmi);
      setTotalAmount(calculatedTotal);
      setTotalInterest(calculatedInterest);
      setTaxBenefits({
        principalRepayment,
        interestDeduction,
        total: principalRepayment + interestDeduction,
      });
      setYearlySchedule(schedule);
    };

    if (typeof queueMicrotask === 'function') {
      queueMicrotask(runRecalculation);
    } else {
      setTimeout(runRecalculation, 0);
    }
  }, [calcPrincipal, calcRate, calcTenure]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-4 rounded-full">
              <Home className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Home Loan EMI Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your home loan EMI, tax benefits, and plan your dream home purchase
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Input */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center space-x-3 mb-8">
              <div className="bg-primary-600 p-2 rounded-lg">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Home Loan Calculator</h2>
            </div>

            <div className="space-y-8">
              {/* Loan Amount */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700">Home Loan Amount</label>
                  <span className="text-lg font-bold text-primary-600">{formatCurrency(displayPrincipal)}</span>
                </div>
                <input
                  type="range"
                  min="500000"
                  max="50000000"
                  step="100000"
                  value={displayPrincipal}
                  onChange={handlePrincipalChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹5L</span>
                  <span>₹5Cr</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700">Interest Rate (per annum)</label>
                  <span className="text-lg font-bold text-primary-600">{displayRate}%</span>
                </div>
                <input
                  type="range"
                  min="6.5"
                  max="15"
                  step="0.1"
                  value={displayRate}
                  onChange={handleRateChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>6.5%</span>
                  <span>15%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700">Loan Tenure</label>
                  <span className="text-lg font-bold text-primary-600">
                    {Math.floor(displayTenure / 12)} years
                  </span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="360"
                  step="12"
                  value={displayTenure}
                  onChange={handleTenureChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>5 years</span>
                  <span>30 years</span>
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
                    <p className="text-xs text-gray-600 mb-1">Total Amount</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(totalAmount)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Total Interest</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(totalInterest)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tax Benefits */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-md font-semibold text-gray-900 mb-4">Annual Tax Benefits</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Principal (80C)</span>
                  <span className="text-sm font-semibold text-green-600">
                    {formatCurrency(taxBenefits.principalRepayment)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Interest (24B)</span>
                  <span className="text-sm font-semibold text-green-600">
                    {formatCurrency(taxBenefits.interestDeduction)}
                  </span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-gray-900">Total Deduction</span>
                    <span className="text-sm font-bold text-green-600">
                      {formatCurrency(taxBenefits.total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Breakdown Chart */}
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
                    {((calcPrincipal / totalAmount) * 100).toFixed(1)}%
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
                  style={{ width: `${(calcPrincipal / totalAmount) * 100}%` }}
                ></div>
                <div 
                  className="h-full bg-secondary-600"
                  style={{ width: `${(totalInterest / totalAmount) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Yearly Amortization Schedule */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Yearly Amortization Schedule (First 10 Years)
          </h3>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal Paid</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Paid</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {yearlySchedule.map((row) => (
                  <tr key={row.year} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.year}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.yearlyPrincipal)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.yearlyInterest)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(row.remainingPrincipal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Home Loan Information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Home Loan Benefits</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">Tax Benefits</p>
                  <p className="text-sm text-gray-600">Deductions under Section 80C and 24B</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">Lower Interest Rates</p>
                  <p className="text-sm text-gray-600">Secured loan with competitive rates</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">Long Tenure</p>
                  <p className="text-sm text-gray-600">Up to 30 years repayment period</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2"></div>
                <div>
                  <p className="font-semibold text-gray-900">High Loan Amount</p>
                  <p className="text-sm text-gray-600">Up to 90% of property value</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Eligibility Criteria</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-gray-900 mb-2">Age</p>
                <p className="text-sm text-gray-600">21-65 years at loan maturity</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Income</p>
                <p className="text-sm text-gray-600">Minimum ₹30,000 per month</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Credit Score</p>
                <p className="text-sm text-gray-600">750+ for best rates</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-2">Employment</p>
                <p className="text-sm text-gray-600">3+ years work experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLoanEMI;