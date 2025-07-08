import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { IndianRupee, Percent, Calendar, Calculator, TrendingUp, DollarSign } from 'lucide-react'; // Lucide icons

// --- Helper Functions ---
// Formats a number into INR currency format
const formatCurrency = (value: number | string): string => {
  if (typeof value === 'string') {
    value = parseFloat(value.replace(/,/g, '')); // Remove commas for parsing
  }
  if (isNaN(value) || value === null) {
    return '₹ 0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Formats a number to have commas for display in input fields
const formatNumberWithCommas = (value: number | string): string => {
  if (typeof value === 'number') {
    return value.toLocaleString('en-IN');
  }
  return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// --- Component Logic ---
const EMICalculator: React.FC = () => {
  // Input States
  const [principalAmount, setPrincipalAmount] = useState<number>(500000); // Principal Amount in INR
  const [interestRate, setInterestRate] = useState<number>(10.0); // Annual Interest Rate in %
  const [loanTenure, setLoanTenure] = useState<number>(5); // Loan Tenure
  const [isTenureInYears, setIsTenureInYears] = useState<boolean>(true); // Toggle for Years/Months

  // Handlers for direct input fields (with formatting)
  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, ''); // Remove commas for internal number conversion
    setPrincipalAmount(Number(value));
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(Number(e.target.value));
  };

  const handleLoanTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanTenure(Number(e.target.value));
  };

  // Memoized EMI Calculation
  const calculations = useMemo(() => {
    const P = principalAmount;
    const R = interestRate / 12 / 100; // Monthly Interest Rate
    const N = isTenureInYears ? loanTenure * 12 : loanTenure; // Total number of months

    let monthlyEMI = 0;
    let totalAmountPayable = 0;
    let totalInterestPayable = 0;

    if (P > 0 && R > 0 && N > 0) {
      monthlyEMI = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      totalAmountPayable = monthlyEMI * N;
      totalInterestPayable = totalAmountPayable - P;
    } else if (P > 0 && R === 0 && N > 0) { // Handle 0% interest rate
      monthlyEMI = P / N;
      totalAmountPayable = P;
      totalInterestPayable = 0;
    }

    return {
      monthlyEMI: Math.round(monthlyEMI),
      totalAmountPayable: Math.round(totalAmountPayable),
      totalInterestPayable: Math.round(totalInterestPayable),
    };
  }, [principalAmount, interestRate, loanTenure, isTenureInYears]);

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4 sm:p-6 font-inter">
      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full max-w-4xl border border-blue-100"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 drop-shadow-md">
          <Calculator className="inline-block w-9 h-9 mr-3 text-blue-500" /> Dynamic EMI Calculator
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Input Controls Section */}
          <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <DollarSign className="w-6 h-6 mr-2 text-green-600" /> Loan Details
            </h2>

            {/* Principal Amount */}
            <motion.div variants={itemVariants}>
              <label htmlFor="principal" className="block text-lg font-semibold text-gray-700 mb-2">
                Principal Amount: <span className="text-blue-600">{formatCurrency(principalAmount)}</span>
              </label>
              <input
                type="range"
                id="principal"
                min="10000"
                max="10000000"
                step="10000"
                value={principalAmount}
                onChange={handlePrincipalChange}
                className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer thumb-blue"
              />
              <input
                type="text"
                value={formatNumberWithCommas(principalAmount)}
                onChange={handlePrincipalChange}
                onBlur={(e) => setPrincipalAmount(Number(e.target.value.replace(/,/g, '')))}
                className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                inputMode="numeric"
              />
            </motion.div>

            {/* Interest Rate */}
            <motion.div variants={itemVariants}>
              <label htmlFor="interestRate" className="block text-lg font-semibold text-gray-700 mb-2">
                Annual Interest Rate: <span className="text-purple-600">{interestRate.toFixed(2)}%</span>
              </label>
              <input
                type="range"
                id="interestRate"
                min="1"
                max="30"
                step="0.05"
                value={interestRate}
                onChange={handleInterestRateChange}
                className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer thumb-purple"
              />
              <input
                type="number"
                value={interestRate}
                onChange={handleInterestRateChange}
                onBlur={(e) => setInterestRate(Number(e.target.value))}
                className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                step="0.01"
              />
            </motion.div>

            {/* Loan Tenure */}
            <motion.div variants={itemVariants}>
              <label htmlFor="loanTenure" className="block text-lg font-semibold text-gray-700 mb-2">
                Loan Tenure: <span className="text-teal-600">{loanTenure} {isTenureInYears ? 'Years' : 'Months'}</span>
              </label>
              <input
                type="range"
                id="loanTenure"
                min={isTenureInYears ? 1 : 12} // Min 1 year or 12 months
                max={isTenureInYears ? 30 : 360} // Max 30 years or 360 months
                step={isTenureInYears ? 1 : 1}
                value={loanTenure}
                onChange={handleLoanTenureChange}
                className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer thumb-teal"
              />
              <div className="flex items-center mt-3">
                <input
                  type="number"
                  value={loanTenure}
                  onChange={handleLoanTenureChange}
                  onBlur={(e) => setLoanTenure(Number(e.target.value))}
                  className="flex-grow p-3 border border-gray-300 rounded-l-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  min={isTenureInYears ? 1 : 12}
                  max={isTenureInYears ? 30 : 360}
                />
                <button
                  onClick={() => {
                    setIsTenureInYears(!isTenureInYears);
                    // Adjust loan tenure value when switching units to keep it reasonable
                    if (isTenureInYears) { // Was years, switching to months
                      setLoanTenure(prev => prev * 12);
                    } else { // Was months, switching to years
                      setLoanTenure(prev => Math.round(prev / 12));
                    }
                  }}
                  className="p-3 bg-blue-600 text-white rounded-r-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1"
                >
                  <Calendar className="w-5 h-5" /> {isTenureInYears ? 'Years' : 'Months'}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Results Display Section */}
          <div className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Your EMI Breakdown</h2>
            <motion.div
              key={calculations.monthlyEMI} // Key for re-animation on value change
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
              className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
            >
              {formatCurrency(calculations.monthlyEMI)}
            </motion.div>
            <p className="text-xl text-blue-100 mb-8">Monthly EMI</p>

            <div className="w-full space-y-4 text-lg">
              <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Principal Amount</span>
                <span className="font-bold text-white">{formatCurrency(principalAmount)}</span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                <span className="font-medium flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Total Interest Payable</span>
                <span className="font-bold text-white">{formatCurrency(calculations.totalInterestPayable)}</span>
              </motion.div>
              <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                <span className="font-medium flex items-center gap-2"><DollarSign className="w-5 h-5" /> Total Amount Payable</span>
                <span className="font-bold text-white">{formatCurrency(calculations.totalAmountPayable)}</span>
              </motion.div>
            </div>
          </div>
        </div>
        {/* Custom CSS for range input thumbs */}
        <style>{`
          input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #fff;
            cursor: grab;
            box-shadow: 0 0 0 4px var(--tw-accent-color); /* Dynamic accent color */
            transition: background 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          }

          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #fff;
            cursor: grab;
            box-shadow: 0 0 0 4px var(--tw-accent-color); /* Dynamic accent color */
            transition: background 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          }

          .thumb-blue::-webkit-slider-thumb { --tw-accent-color: #3B82F6; }
          .thumb-blue::-moz-range-thumb { --tw-accent-color: #3B82F6; }

          .thumb-purple::-webkit-slider-thumb { --tw-accent-color: #9333EA; }
          .thumb-purple::-moz-range-thumb { --tw-accent-color: #9333EA; }

          .thumb-teal::-webkit-slider-thumb { --tw-accent-color: #14B8A6; }
          .thumb-teal::-moz-range-thumb { --tw-accent-color: #14B8A6; }

          input[type="range"]:active::-webkit-slider-thumb {
            cursor: grabbing;
          }
          input[type="range"]:active::-moz-range-thumb {
            cursor: grabbing;
          }
        `}</style>
      </motion.div>
    </div>
  );
};

export default EMICalculator;
