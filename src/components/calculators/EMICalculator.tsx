import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Calculator } from 'lucide-react';
import { calculateEMI, calculateTotalAmount, calculateTotalInterest, formatCurrency } from '../../utils/calculations';

const EMICalculator: React.FC = () => {
  // Local immediate slider display values (for 60fps instant UI updates)
  const [displayPrincipal, setDisplayPrincipal] = useState(500000);
  const [displayRate, setDisplayRate] = useState(12);
  const [displayTenure, setDisplayTenure] = useState(60);

  // Debounced calculation state (minimum 150ms delay to eliminate INP latency bottlenecks)
  const [calcPrincipal, setCalcPrincipal] = useState(500000);
  const [calcRate, setCalcRate] = useState(12);
  const [calcTenure, setCalcTenure] = useState(60);

  // Calculated results
  const [emi, setEmi] = useState(() => calculateEMI(500000, 12, 60));
  const [totalAmount, setTotalAmount] = useState(() => calculateTotalAmount(calculateEMI(500000, 12, 60), 60));
  const [totalInterest, setTotalInterest] = useState(() => calculateTotalInterest(calculateTotalAmount(calculateEMI(500000, 12, 60), 60), 500000));

  // Timers for 150ms debouncing
  const principalTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tenureTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePrincipalChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setDisplayPrincipal(val);
    if (principalTimer.current) clearTimeout(principalTimer.current);
    principalTimer.current = setTimeout(() => {
      setCalcPrincipal(val);
    }, 150);
  }, []);

  const handleRateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setDisplayRate(val);
    if (rateTimer.current) clearTimeout(rateTimer.current);
    rateTimer.current = setTimeout(() => {
      setCalcRate(val);
    }, 150);
  }, []);

  const handleTenureChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setDisplayTenure(val);
    if (tenureTimer.current) clearTimeout(tenureTimer.current);
    tenureTimer.current = setTimeout(() => {
      setCalcTenure(val);
    }, 150);
  }, []);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (principalTimer.current) clearTimeout(principalTimer.current);
      if (rateTimer.current) clearTimeout(rateTimer.current);
      if (tenureTimer.current) clearTimeout(tenureTimer.current);
    };
  }, []);

  // Offload recalculation to an asynchronous microtask
  useEffect(() => {
    const runCalculation = () => {
      const calculatedEmi = calculateEMI(calcPrincipal, calcRate, calcTenure);
      const calculatedTotal = calculateTotalAmount(calculatedEmi, calcTenure);
      const calculatedInterest = calculateTotalInterest(calculatedTotal, calcPrincipal);
      setEmi(calculatedEmi);
      setTotalAmount(calculatedTotal);
      setTotalInterest(calculatedInterest);
    };

    if (typeof queueMicrotask === 'function') {
      queueMicrotask(runCalculation);
    } else {
      setTimeout(runCalculation, 0);
    }
  }, [calcPrincipal, calcRate, calcTenure]);

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
              Loan Amount: {formatCurrency(displayPrincipal)}
            </label>
            <input
              type="range"
              min="50000"
              max="10000000"
              step="10000"
              value={displayPrincipal}
              onChange={handlePrincipalChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹50K</span>
              <span>₹1Cr</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Interest Rate: {displayRate}% per annum
            </label>
            <input
              type="range"
              min="5"
              max="30"
              step="0.1"
              value={displayRate}
              onChange={handleRateChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>5%</span>
              <span>30%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Loan Tenure: {Math.floor(displayTenure / 12)} years {displayTenure % 12} months
            </label>
            <input
              type="range"
              min="12"
              max="360"
              step="12"
              value={displayTenure}
              onChange={handleTenureChange}
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

          {/* Visualization */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="text-md font-semibold text-gray-900 mb-4">Breakdown</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-primary-600 rounded"></div>
                  <span className="text-sm text-gray-600">Principal</span>
                </div>
                <span className="text-sm font-semibold">
                  {totalAmount > 0 ? ((calcPrincipal / totalAmount) * 100).toFixed(1) : '0'}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-secondary-600 rounded"></div>
                  <span className="text-sm text-gray-600">Interest</span>
                </div>
                <span className="text-sm font-semibold">
                  {totalAmount > 0 ? ((totalInterest / totalAmount) * 100).toFixed(1) : '0'}%
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
