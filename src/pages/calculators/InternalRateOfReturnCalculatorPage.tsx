import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, TrendingUp as TrendingUpIcon,
  Timer, LineChart, Target, PiggyBank, HandCoins, Landmark
} from 'lucide-react'; // Lucide icons
import ApplyButton from '../../components/common/ApplyButton'; // Assuming this path is correct

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
    return value.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }
  return value.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Helper function to calculate NPV for a given rate
const calculateNPVForRate = (rate: number, initialInvestment: number, cashFlows: number[]): number => {
  let npv = -initialInvestment;
  cashFlows.forEach((cf, index) => {
    npv += cf / Math.pow(1 + rate, index + 1);
  });
  return npv;
};

// Function to find IRR using a simple iterative search (bisection method inspired)
const findIRR = (initialInvestment: number, cashFlows: number[]): number | null => {
  // Check for trivial or uncalculable cases
  const totalCashInflows = cashFlows.reduce((sum, cf) => sum + Math.max(0, cf), 0);
  const totalCashOutflows = initialInvestment + cashFlows.reduce((sum, cf) => sum + Math.abs(Math.min(0, cf)), 0);

  if (totalCashInflows <= initialInvestment && initialInvestment > 0) {
      // If total inflows don't even cover initial investment, IRR is likely negative or non-existent
      // Or if all cash flows are negative (after initial investment)
      if (cashFlows.every(cf => cf <= 0)) return null;
  }
  if (initialInvestment <= 0 && cashFlows.every(cf => cf >= 0)) {
      // If initial investment is an inflow and all subsequent are inflows, IRR is infinite or undefined
      return null;
  }
  if (initialInvestment === 0 && cashFlows.every(cf => cf === 0)) {
      return null; // Undefined if no cash flows
  }


  const precision = 0.00001; // 0.001%
  const maxIterations = 10000;
  let lowRate = -0.99; // -99% (to handle very low/negative returns)
  let highRate = 5.0; // 500% (to handle very high returns)

  for (let i = 0; i < maxIterations; i++) {
    const midRate = (lowRate + highRate) / 2;

    // Handle potential division by zero if midRate is -1
    if (Math.abs(midRate + 1) < 1e-9) { // if midRate is very close to -1
        lowRate = midRate + 1e-8; // Shift slightly to avoid -1
        continue;
    }

    const npv = calculateNPVForRate(midRate, initialInvestment, cashFlows);

    if (Math.abs(npv) < precision) {
      return midRate * 100; // Return as percentage
    }

    if (npv > 0) {
      lowRate = midRate;
    } else {
      highRate = midRate;
    }

    // If the interval becomes too small, return the current midRate
    if (highRate - lowRate < precision) {
        return midRate * 100;
    }
  }
  return null; // Could not converge within maxIterations
};

// --- Framer Motion Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1 // Stagger animation for direct children
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15
    }
  }
};

// --- FAQ Item Component ---
const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void }> = ({ question, answer, isOpen, onClick }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg border border-gray-200 mb-4 overflow-hidden"
      initial={false}
      animate={{
        backgroundColor: isOpen ? '#F3F4F6' : '#FFFFFF',
        borderColor: isOpen ? '#6366F1' : '#E5E7EB'
      }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
        onClick={onClick}
      >
        <div className="flex items-center">
          <Info className="w-6 h-6 mr-4 text-blue-500 flex-shrink-0" />
          <h3 className="text-xl font-semibold text-gray-800 pr-4">{question}</h3>
        </div>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-gray-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="px-6 pb-6 pt-2"
          >
            <p className="text-gray-700 leading-relaxed text-lg border-t border-gray-200 pt-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


// --- Main Internal Rate of Return (IRR) Calculator Page Component ---
interface InternalRateOfReturnCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const InternalRateOfReturnCalculatorPage: React.FC<InternalRateOfReturnCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [initialInvestment, setInitialInvestment] = useState<number>(100000); // C0
  const [requiredRateOfReturn, setRequiredRateOfReturn] = useState<number>(12); // Hurdle rate for comparison
  const [numberOfPeriods, setNumberOfPeriods] = useState<number>(5); // n
  const [cashFlows, setCashFlows] = useState<number[]>(Array(5).fill(30000)); // Ct

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for direct input fields (with formatting)
  const handleInitialInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setInitialInvestment(Number(value));
  };

  const handleRequiredRateOfReturnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRequiredRateOfReturn(Number(e.target.value));
  };

  const handleNumberOfPeriodsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumPeriods = Number(e.target.value);
    setNumberOfPeriods(newNumPeriods);
    // Adjust cashFlows array size when number of periods changes
    setCashFlows(prevCashFlows => {
      const newCashFlows = [...prevCashFlows];
      while (newCashFlows.length < newNumPeriods) {
        newCashFlows.push(30000); // Add default value for new periods
      }
      return newCashFlows.slice(0, newNumPeriods);
    });
  };

  const handleCashFlowChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setCashFlows(prevCashFlows => {
      const newCashFlows = [...prevCashFlows];
      newCashFlows[index] = Number(value);
      return newCashFlows;
    });
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized IRR Calculation
  const calculatedIRR = useMemo(() => {
    return findIRR(initialInvestment, cashFlows);
  }, [initialInvestment, cashFlows]);

  // Determine IRR status for display
  const irrStatus = useMemo(() => {
    if (calculatedIRR === null) return { text: "Cannot Calculate IRR (Invalid Cash Flows)", color: "text-gray-500" };
    if (calculatedIRR >= requiredRateOfReturn) return { text: "Accept Project (IRR ≥ Required Rate)", color: "text-green-600" };
    return { text: "Reject Project (IRR < Required Rate)", color: "text-red-600" };
  }, [calculatedIRR, requiredRateOfReturn]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is Internal Rate of Return (IRR)?",
      answer: "Internal Rate of Return (IRR) is a financial metric used to estimate the profitability of potential investments. It is the discount rate that makes the Net Present Value (NPV) of all cash flows from a particular project equal to zero. Essentially, it's the effective annual rate of return that an investment is expected to yield."
    },
    {
      question: "Why is IRR important for investment decisions?",
      answer: "IRR is a powerful tool because it provides a single percentage rate that can be compared directly to a company's required rate of return or cost of capital (often called the 'hurdle rate'). If the IRR is higher than the hurdle rate, the project is generally considered acceptable, indicating it's expected to be profitable."
    },
    {
      question: "How is IRR different from NPV?",
      answer: "Both NPV and IRR are capital budgeting tools that consider the time value of money. NPV gives you a monetary value (the net present value of the project), while IRR gives you a percentage rate of return. While they often lead to the same accept/reject decision, they can differ when comparing mutually exclusive projects or projects with non-conventional cash flows."
    },
    {
      question: "What is a 'Required Rate of Return' or 'Hurdle Rate'?",
      answer: "The Required Rate of Return (or Hurdle Rate) is the minimum acceptable rate of return that an investor or company expects to earn on an investment. It's often based on the cost of capital, the riskiness of the project, and market conditions. For a project to be considered viable, its IRR should ideally exceed this hurdle rate."
    },
    {
      question: "What does a higher IRR mean?",
      answer: "A higher IRR indicates a more desirable project, as it suggests a greater expected rate of return. When comparing multiple investment opportunities, all else being equal, the project with the highest IRR is generally preferred, provided it exceeds the required rate of return."
    },
    {
      question: "Can IRR be negative or zero?",
      answer: "Yes, IRR can be negative if the project is expected to result in a net loss. It can be zero if the project only recovers its initial investment without generating any additional return. A negative or zero IRR typically indicates an undesirable project."
    },
    {
      question: "What are the limitations of IRR?",
      answer: "Limitations include: 1) It can yield multiple IRRs for non-conventional cash flow patterns. 2) It assumes that intermediate cash flows are reinvested at the IRR, which may not be realistic. 3) It doesn't consider the scale of the project (a small project with high IRR vs. a large one with slightly lower IRR). 4) It may not be suitable for comparing mutually exclusive projects if they have different scales or cash flow patterns."
    }
  ];

  const tipsForUsingIRR = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Always compare the calculated IRR against your company's or personal required rate of return (hurdle rate)." },
    { icon: <Percent className="w-6 h-6 text-blue-500" />, text: "Use realistic estimates for cash flows and ensure they are net cash flows (inflows - outflows) for each period." },
    { icon: <Target className="w-6 h-6 text-yellow-500" />, text: "Be aware of the limitations of IRR, especially for projects with non-conventional cash flow patterns (multiple sign changes)." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Consider using IRR in conjunction with NPV for a more robust capital budgeting decision." },
    { icon: <Briefcase className="w-6 h-6 text-purple-500" />, text: "For mutually exclusive projects, NPV is often a more reliable decision criterion than IRR, especially if projects differ significantly in size or duration." },
    { icon: <Coins className="w-6 h-6 text-red-500" />, text: "Regularly review and update your required rate of return based on market conditions and risk profile." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Comprehensive Financial Tools", description: "Access a wide array of calculators and resources for informed business and investment decisions." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Business Advisory", description: "Connect with financial experts for guidance on project evaluation, funding, and growth strategies." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Funding Solutions for Projects", description: "Explore various business loan and investment options to finance your profitable ventures." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Market & Industry Insights", description: "Gain access to valuable market data and trends to refine your project forecasts." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Calculate Project Profitability with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Internal Rate of Return (IRR) Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-purple-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Assess the expected rate of return for potential investments or projects over time.
            Make data-driven capital budgeting decisions.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Project Financing Inquiry"
                openApplyModal={openApplyModal}
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Explore Business Funding
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* IRR Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-purple-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 drop-shadow-md">
            <LineChart className="inline-block w-9 h-9 mr-3 text-indigo-500" /> Internal Rate of Return (IRR) Analysis
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Briefcase className="w-6 h-6 mr-2 text-purple-600" /> Project Financials
              </h3>

              {/* Initial Investment */}
              <motion.div variants={itemVariants}>
                <label htmlFor="initialInvestment" className="block text-lg font-semibold text-gray-700 mb-2">
                  Initial Investment (Cash Outflow): <span className="text-blue-600">{formatCurrency(initialInvestment)}</span>
                </label>
                <input
                  type="range"
                  id="initialInvestment"
                  min="0"
                  max="10000000"
                  step="10000"
                  value={initialInvestment}
                  onChange={handleInitialInvestmentChange}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(initialInvestment)}
                  onChange={handleInitialInvestmentChange}
                  onBlur={(e) => setInitialInvestment(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Required Rate of Return */}
              <motion.div variants={itemVariants}>
                <label htmlFor="requiredRateOfReturn" className="block text-lg font-semibold text-gray-700 mb-2">
                  Required Rate of Return (Hurdle Rate %): <span className="text-teal-600">{requiredRateOfReturn}%</span>
                </label>
                <input
                  type="range"
                  id="requiredRateOfReturn"
                  min="1"
                  max="30"
                  step="0.5"
                  value={requiredRateOfReturn}
                  onChange={handleRequiredRateOfReturnChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="number"
                  value={requiredRateOfReturn}
                  onChange={handleRequiredRateOfReturnChange}
                  onBlur={(e) => setRequiredRateOfReturn(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  step="0.1"
                />
              </motion.div>

              {/* Number of Periods */}
              <motion.div variants={itemVariants}>
                <label htmlFor="numberOfPeriods" className="block text-lg font-semibold text-gray-700 mb-2">
                  Number of Cash Flow Periods: <span className="text-orange-600">{numberOfPeriods} Years</span>
                </label>
                <input
                  type="range"
                  id="numberOfPeriods"
                  min="1"
                  max="15"
                  step="1"
                  value={numberOfPeriods}
                  onChange={handleNumberOfPeriodsChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="number"
                  value={numberOfPeriods}
                  onChange={handleNumberOfPeriodsChange}
                  onBlur={(e) => setNumberOfPeriods(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  min="1"
                  max="15"
                />
              </motion.div>

              {/* Dynamic Cash Flow Inputs */}
              <h4 className="text-xl font-bold text-gray-800 mb-2 mt-6 flex items-center">
                <Coins className="w-5 h-5 mr-2 text-purple-600" /> Net Cash Flows (Per Period)
              </h4>
              {cashFlows.map((cf, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <label htmlFor={`cashFlow-${index}`} className="block text-base font-semibold text-gray-600 mb-1">
                    Year {index + 1} Cash Flow: <span className="text-indigo-500">{formatCurrency(cf)}</span>
                  </label>
                  <input
                    type="range"
                    id={`cashFlow-${index}`}
                    min="-100000" // Allow negative cash flows (outflows)
                    max="100000"
                    step="1000"
                    value={cf}
                    onChange={(e) => handleCashFlowChange(index, e)}
                    className="w-full h-2 bg-gradient-to-r from-indigo-300 to-indigo-500 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <input
                    type="text"
                    value={formatNumberWithCommas(cf)}
                    onChange={(e) => handleCashFlowChange(index, e)}
                    onBlur={(e) => handleCashFlowChange(index, e)}
                    className="mt-2 w-full p-2 border border-gray-300 rounded-lg text-gray-800 text-center text-base focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                    inputMode="numeric"
                  />
                </motion.div>
              ))}
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-purple-500 to-indigo-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Calculated Internal Rate of Return</h3>
              <motion.div
                key={calculatedIRR} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className={`text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg ${irrStatus.color}`}
              >
                {calculatedIRR !== null ? `${calculatedIRR.toFixed(2)}%` : 'N/A'}
              </motion.div>
              <p className="text-xl text-purple-100 mb-8">{irrStatus.text}</p>

              <div className="w-full space-y-4 text-lg">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-purple-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Initial Investment</span>
                  <span className="font-bold text-white">{formatCurrency(initialInvestment)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-purple-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Percent className="w-5 h-5" /> Required Rate of Return</span>
                  <span className="font-bold text-white">{requiredRateOfReturn}%</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-purple-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Timer className="w-5 h-5" /> Number of Periods</span>
                  <span className="font-bold text-white">{numberOfPeriods} Years</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-purple-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><HandCoins className="w-5 h-5" /> Total Cash Inflows (Sum of CFs)</span>
                  <span className="font-bold text-white">{formatCurrency(cashFlows.reduce((sum, cf) => sum + Math.max(0, cf), 0))}</span>
                </motion.div>
              </div>

              {/* Individual Cash Flows Summary */}
              <h4 className="text-xl font-bold text-white mt-8 mb-4">Cash Flow Summary:</h4>
              <div className="w-full space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                {cashFlows.map((cf, index) => (
                  <motion.div key={index} variants={itemVariants} className="flex justify-between items-center bg-purple-700/20 p-2 rounded-lg text-sm">
                    <span>Year {index + 1} Cash Flow:</span>
                    <span className="font-bold">{formatCurrency(cf)}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          {/* Custom CSS for range input thumbs and scrollbar */}
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

            .accent-blue-600::-webkit-slider-thumb { --tw-accent-color: #2563EB; }
            .accent-blue-600::-moz-range-thumb { --tw-accent-color: #2563EB; }

            .accent-purple-600::-webkit-slider-thumb { --tw-accent-color: #9333EA; }
            .accent-purple-600::-moz-range-thumb { --tw-accent-color: #9333EA; }

            .accent-teal-600::-webkit-slider-thumb { --tw-accent-color: #0D9488; }
            .accent-teal-600::-moz-range-thumb { --tw-accent-color: #0D9488; }

            .accent-orange-600::-webkit-slider-thumb { --tw-accent-color: #EA580C; }
            .accent-orange-600::-moz-range-thumb { --tw-accent-color: #EA580C; }

            .accent-red-600::-webkit-slider-thumb { --tw-accent-color: #DC2626; }
            .accent-red-600::-moz-range-thumb { --tw-accent-color: #DC2626; }

            .accent-green-600::-webkit-slider-thumb { --tw-accent-color: #16A34A; }
            .accent-green-600::-moz-range-thumb { --tw-accent-color: #16A34A; }

            .accent-yellow-600::-webkit-slider-thumb { --tw-accent-color: #CA8A04; }
            .accent-yellow-600::-moz-range-thumb { --tw-accent-color: #CA8A04; }

            .accent-indigo-600::-webkit-slider-thumb { --tw-accent-color: #4F46E5; }
            .accent-indigo-600::-moz-range-thumb { --tw-accent-color: #4F46E5; }

            input[type="range"]:active::-webkit-slider-thumb {
              cursor: grabbing;
            }
            input[type="range"]:active::-moz-range-thumb {
              cursor: grabbing;
            }

            /* Custom Scrollbar for Cash Flows */
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.1);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.3);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.5);
            }
          `}</style>
        </motion.div>

        {/* Informational Sections */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg mt-6 space-y-10">
          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is an Internal Rate of Return (IRR) Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              An Internal Rate of Return (IRR) Calculator is a vital financial tool used to evaluate the attractiveness of a project or investment. It determines the discount rate at which the Net Present Value (NPV) of all cash flows (both inflows and outflows) from a project equals zero. In simpler terms, it's the effective annual rate of return that an investment is projected to yield over its lifespan. This calculator helps businesses and investors decide whether a project is financially viable by comparing its calculated IRR to a predetermined 'hurdle rate' or required rate of return.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our IRR Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Initial Investment (Cash Outflow):</strong> Input the total upfront cost required to launch the project or investment. This is typically a negative cash flow occurring at the beginning (Year 0).</motion.li>
              <motion.li variants={itemVariants}><strong>Set Required Rate of Return (Hurdle Rate %):</strong> Specify the minimum acceptable rate of return you expect from this investment. This is your benchmark for deciding whether to accept or reject the project.</motion.li>
              <motion.li variants={itemVariants}><strong>Define Number of Cash Flow Periods:</strong> Determine the total number of years (or periods) over which you anticipate the project will generate cash flows. The calculator will dynamically create input fields for each period.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Net Cash Flows for Each Period:</strong> For each subsequent year, enter the expected net cash flow (cash inflows minus cash outflows for that specific period). These can be positive (inflow) or negative (outflow).</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Calculated IRR:</strong> The calculator will instantly display the Internal Rate of Return. Compare this IRR to your Required Rate of Return: if IRR is greater than or equal to the required rate, the project is generally considered acceptable. Otherwise, it may be rejected.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUpIcon className="w-8 h-8 mr-3 text-purple-500" /> Why Use an IRR Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Clear Profitability Indicator:</strong> Provides a single, intuitive percentage rate that represents the project's effective return, making it easy to understand and communicate.</motion.li>
              <motion.li variants={itemVariants}><strong>Decision-Making Criterion:</strong> Offers a straightforward rule for project acceptance: if IRR exceeds the hurdle rate, the project is financially attractive.</motion.li>
              <motion.li variants={itemVariants}><strong>Considers Time Value of Money:</strong> Accurately accounts for the fact that money today is worth more than the same amount in the future, providing a more realistic assessment than simpler methods.</motion.li>
              <motion.li variants={itemVariants}><strong>Compares Projects:</strong> Useful for comparing the relative attractiveness of different investment opportunities, especially when they have similar initial investments and risk profiles.</motion.li>
              <motion.li variants={itemVariants}><strong>Internal Benchmark:</strong> The IRR itself acts as an internal benchmark for the project's performance, independent of external market rates (though it's compared to them for decision-making).</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key IRR Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Internal Rate of Return (IRR):</strong> The discount rate that makes the Net Present Value (NPV) of all cash flows from a particular project equal to zero. It represents the project's expected rate of return.</motion.p>
              <motion.p variants={itemVariants}><strong>Initial Investment ($$C_0$$):</strong> The upfront cash outflow required to begin a project or investment. It's typically a negative value in cash flow analysis.</motion.p>
              <motion.p variants={itemVariants}><strong>Net Cash Flow ($$C_t$$):</strong> The cash inflow minus cash outflow for a specific period ($$t$$) of the project. Can be positive (inflow) or negative (outflow).</motion.p>
              <motion.p variants={itemVariants}><strong>Required Rate of Return (Hurdle Rate):</strong> The minimum acceptable rate of return that a company or investor expects to earn on an investment. If a project's IRR is below this rate, it's generally rejected.</motion.p>
              <motion.p variants={itemVariants}><strong>Net Present Value (NPV):</strong> The difference between the present value of cash inflows and the present value of cash outflows. At the IRR, NPV is exactly zero.</motion.p>
              <motion.p variants={itemVariants}><strong>Time Value of Money:</strong> The concept that a sum of money is worth more now than the same sum will be at a future date due to its potential earning capacity. Both IRR and NPV incorporate this principle.</motion.p>
              <motion.p variants={itemVariants}><strong>Capital Budgeting:</strong> The process businesses use to evaluate potential major projects or investments. IRR is one of the key methods used in this process.</motion.p>
              <motion.p variants={itemVariants}><strong>Discount Rate:</strong> The rate at which future cash flows are reduced to reflect their present value. In IRR calculation, the IRR itself is the discount rate that makes NPV zero.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Effective IRR Analysis
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForUsingIRR.map((tip, index) => (
                <motion.li key={index} variants={itemVariants} className="flex items-start gap-2">
                  {tip.icon}
                  <span>{tip.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          {/* Dynamic FAQ Section */}
          <motion.section id="faq-section" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Frequently Asked Questions (FAQs)
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQIndex === index}
                  onClick={() => toggleFAQ(index)}
                />
              ))}
            </div>
          </motion.section>

          {/* Why Use BanksCart Section */}
          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Business & Investment Needs?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100"
                  variants={cardVariants}
                >
                  {reason.icon}
                  <h3 className="text-xl font-bold text-gray-900 mt-4 mb-2">{reason.title}</h3>
                  <p className="text-gray-600">{reason.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Final Call to Action */}
          <motion.section
            className="text-center mt-12 p-8 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Make Smarter Investment Decisions?
            </motion.h2>
            <motion.p
              className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart offers comprehensive financial tools and expert advisory services
              to help you evaluate projects, secure funding, and achieve your business goals.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Business Investment Advisory"
                  openApplyModal={openApplyModal}
                  className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Connect with a Financial Advisor
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Connect with a Financial Advisor</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default InternalRateOfReturnCalculatorPage;
