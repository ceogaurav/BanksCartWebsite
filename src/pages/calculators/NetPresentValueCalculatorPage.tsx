import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, TrendingUp as TrendingUpIcon,
  Timer, LineChart, Target, PiggyBank, Landmark
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


// --- Main Net Present Value (NPV) Calculator Page Component ---
interface NetPresentValueCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const NetPresentValueCalculatorPage: React.FC<NetPresentValueCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [initialInvestment, setInitialInvestment] = useState<number>(100000); // C0
  const [discountRate, setDiscountRate] = useState<number>(10); // r in %
  const [numberOfPeriods, setNumberOfPeriods] = useState<number>(5); // n
  const [cashFlows, setCashFlows] = useState<number[]>(Array(5).fill(30000)); // Ct

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for direct input fields (with formatting)
  const handleInitialInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setInitialInvestment(Number(value));
  };

  const handleDiscountRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountRate(Number(e.target.value));
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

  // Memoized NPV Calculation
  const calculations = useMemo(() => {
    const C0 = initialInvestment;
    const r = discountRate / 100; // as decimal

    let presentValueSum = 0;
    const individualPVs: { year: number; cashFlow: number; presentValue: number }[] = [];

    cashFlows.forEach((cf, index) => {
      const year = index + 1;
      const pv = cf / Math.pow(1 + r, year);
      presentValueSum += pv;
      individualPVs.push({ year, cashFlow: cf, presentValue: Math.round(pv) });
    });

    const npv = presentValueSum - C0;

    return {
      npv: Math.round(npv),
      presentValueSum: Math.round(presentValueSum),
      individualPVs: individualPVs,
    };
  }, [initialInvestment, discountRate, cashFlows]);

  // Determine NPV status for display
  const npvStatus = useMemo(() => {
    if (calculations.npv > 0) return { text: "Profitable (Accept Project)", color: "text-green-600" };
    if (calculations.npv < 0) return { text: "Not Profitable (Reject Project)", color: "text-red-600" };
    return { text: "Break-even (Indifferent)", color: "text-yellow-600" };
  }, [calculations.npv]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is Net Present Value (NPV)?",
      answer: "Net Present Value (NPV) is a financial metric used to assess the profitability of an investment or project. It calculates the difference between the present value of future cash inflows and the present value of cash outflows over a period of time. A positive NPV generally indicates a profitable project."
    },
    {
      question: "Why is NPV important for investment decisions?",
      answer: "NPV is crucial because it accounts for the time value of money, meaning a rupee today is worth more than a rupee in the future due to its potential earning capacity. It helps businesses and investors make rational decisions by comparing the current value of expected future returns with the initial investment cost."
    },
    {
      question: "What is a 'Discount Rate'?",
      answer: "The discount rate (often called the cost of capital or required rate of return) is the rate used to convert future cash flows into their present value. It reflects the risk of the investment and the return that could be earned on an alternative investment with similar risk. A higher discount rate implies higher risk or opportunity cost."
    },
    {
      question: "What are 'Cash Inflows' and 'Cash Outflows'?",
      answer: "Cash inflows are the money coming into the business from the project (e.g., sales revenue). Cash outflows are the money leaving the business (e.g., initial investment, operating expenses). NPV considers the net cash flow (inflows minus outflows) for each period."
    },
    {
      question: "What does a positive, negative, or zero NPV mean?",
      answer: "A positive NPV means the project is expected to generate more value than its cost, making it potentially profitable. A negative NPV suggests the project will result in a net loss and should be rejected. A zero NPV indicates the project is expected to break even, covering its costs and the required rate of return, making the investor indifferent."
    },
    {
      question: "How does inflation affect NPV calculations?",
      answer: "Inflation can be incorporated into NPV calculations by adjusting either the cash flows (using real cash flows) or the discount rate (using a nominal discount rate that includes inflation). Consistency is key: use either all real values or all nominal values."
    },
    {
      question: "What are the limitations of NPV?",
      answer: "Limitations include reliance on accurate cash flow and discount rate forecasts (which can be uncertain), not considering the size of the investment (a small project with high NPV vs. a large one with slightly lower NPV), and sometimes being difficult to explain to non-financial stakeholders compared to simpler metrics."
    }
  ];

  const tipsForUsingNPV = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Always use realistic and conservative estimates for cash flows and discount rates." },
    { icon: <Percent className="w-6 h-6 text-blue-500" />, text: "Consider sensitivity analysis by testing NPV with a range of discount rates and cash flow scenarios." },
    { icon: <Target className="w-6 h-6 text-yellow-500" />, text: "Compare NPV with other capital budgeting techniques like IRR (Internal Rate of Return) and Payback Period." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Ensure the discount rate accurately reflects the risk profile of the specific project." },
    { icon: <Briefcase className="w-6 h-6 text-purple-500" />, text: "For mutually exclusive projects, choose the one with the highest positive NPV." },
    { icon: <Coins className="w-6 h-6 text-red-500" />, text: "Remember that NPV is a forward-looking metric based on projections, not guarantees." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Comprehensive Financial Tools", description: "Access a wide array of calculators and resources for informed business and investment decisions." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Business Advisory", description: "Connect with financial experts for guidance on project evaluation, funding, and growth strategies." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Funding Solutions for Projects", description: "Explore various business loan and investment options to finance your profitable ventures." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Market & Industry Insights", description: "Gain access to valuable market data and trends to refine your project forecasts." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-blue-600 to-green-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Assess Project Profitability with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Net Present Value (NPV) Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Evaluate the financial viability of investments by discounting future cash flows to their present value.
            Make smarter investment decisions.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Project Financing Inquiry"
                openApplyModal={openApplyModal}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Explore Business Funding
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* NPV Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-blue-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 drop-shadow-md">
            <LineChart className="inline-block w-9 h-9 mr-3 text-green-500" /> Net Present Value (NPV) Analysis
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Briefcase className="w-6 h-6 mr-2 text-blue-600" /> Project Financials
              </h3>

              {/* Initial Investment */}
              <motion.div variants={itemVariants}>
                <label htmlFor="initialInvestment" className="block text-lg font-semibold text-gray-700 mb-2">
                  Initial Investment (Cash Outflow): <span className="text-purple-600">{formatCurrency(initialInvestment)}</span>
                </label>
                <input
                  type="range"
                  id="initialInvestment"
                  min="0"
                  max="10000000"
                  step="10000"
                  value={initialInvestment}
                  onChange={handleInitialInvestmentChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(initialInvestment)}
                  onChange={handleInitialInvestmentChange}
                  onBlur={(e) => setInitialInvestment(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Discount Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="discountRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Discount Rate (Expected Return %): <span className="text-teal-600">{discountRate}%</span>
                </label>
                <input
                  type="range"
                  id="discountRate"
                  min="1"
                  max="30"
                  step="0.5"
                  value={discountRate}
                  onChange={handleDiscountRateChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="number"
                  value={discountRate}
                  onChange={handleDiscountRateChange}
                  onBlur={(e) => setDiscountRate(Number(e.target.value))}
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
                <Coins className="w-5 h-5 mr-2 text-blue-600" /> Net Cash Flows (Per Period)
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
            <div className="p-6 bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Calculated Net Present Value</h3>
              <motion.div
                key={calculations.npv} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className={`text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg ${npvStatus.color}`}
              >
                {formatCurrency(calculations.npv)}
              </motion.div>
              <p className="text-xl text-blue-100 mb-8">{npvStatus.text}</p>

              <div className="w-full space-y-4 text-lg">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Initial Investment</span>
                  <span className="font-bold text-white">{formatCurrency(initialInvestment)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Percent className="w-5 h-5" /> Discount Rate</span>
                  <span className="font-bold text-white">{discountRate}%</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Timer className="w-5 h-5" /> Number of Periods</span>
                  <span className="font-bold text-white">{numberOfPeriods} Years</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Wallet className="w-5 h-5" /> Sum of Present Values of Inflows</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.presentValueSum)}</span>
                </motion.div>
              </div>

              {/* Individual Present Values */}
              <h4 className="text-xl font-bold text-white mt-8 mb-4">Present Value of Each Cash Flow:</h4>
              <div className="w-full space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                {calculations.individualPVs.map((pvItem, index) => (
                  <motion.div key={index} variants={itemVariants} className="flex justify-between items-center bg-blue-700/20 p-2 rounded-lg text-sm">
                    <span>Year {pvItem.year} (CF: {formatCurrency(cashFlows[index])})</span>
                    <span className="font-bold">{formatCurrency(pvItem.presentValue)}</span>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Net Present Value (NPV) Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Net Present Value (NPV) Calculator is a sophisticated financial tool used by businesses and investors to evaluate the profitability of a potential investment or project. It quantifies the value of all future cash flows (both inflows and outflows) associated with a project, discounted back to their present-day value. By comparing this sum to the initial investment, NPV helps determine if a project is expected to generate a positive return after accounting for the time value of money and the cost of capital. A positive NPV suggests that the project is financially attractive, while a negative NPV indicates it may not be worthwhile.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our NPV Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Initial Investment (Cash Outflow):</strong> Input the total upfront cost required to start the project or investment. This is typically a negative cash flow at time zero.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Discount Rate:</strong> Specify the annual discount rate, which represents your required rate of return or the cost of capital. This rate is used to bring future cash flows to their present value.</motion.li>
              <motion.li variants={itemVariants}><strong>Define Number of Cash Flow Periods:</strong> Determine the total number of years (or periods) over which you expect the project to generate cash flows. The calculator will dynamically create input fields for each period.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Net Cash Flows for Each Period:</strong> For each year, enter the expected net cash flow (cash inflows minus cash outflows for that specific period). This can be positive (inflow) or negative (outflow).</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your NPV:</strong> The calculator will instantly display the calculated Net Present Value. A positive NPV suggests the project is financially attractive, a negative NPV suggests it's not, and a zero NPV means it breaks even.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUpIcon className="w-8 h-8 mr-3 text-purple-500" /> Why Use an NPV Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Accounts for Time Value of Money:</strong> Unlike simpler methods, NPV correctly values money received at different points in time, providing a more accurate profitability assessment.</motion.li>
              <motion.li variants={itemVariants}><strong>Clear Investment Decision Rule:</strong> Provides a straightforward decision rule: accept projects with positive NPV, reject those with negative NPV. This simplifies complex investment choices.</motion.li>
              <motion.li variants={itemVariants}><strong>Maximizes Shareholder Wealth:</strong> By accepting projects with positive NPV, companies are theoretically increasing the wealth of their shareholders.</motion.li>
              <motion.li variants={itemVariants}><strong>Considers All Cash Flows:</strong> Takes into account all cash flows generated by a project over its entire life, offering a comprehensive view of its financial impact.</motion.li>
              <motion.li variants={itemVariants}><strong>Compares Projects Effectively:</strong> When evaluating multiple projects, NPV allows for a direct comparison of their absolute profitability, helping prioritize investments.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key NPV Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Net Present Value (NPV):</strong> The difference between the present value of cash inflows and the present value of cash outflows over a period of time. It's a measure of profitability.</motion.p>
              <motion.p variants={itemVariants}><strong>Initial Investment ($$C_0$$):</strong> The cash outflow incurred at the beginning of a project (time zero), representing the upfront cost.</motion.p>
              <motion.p variants={itemVariants}><strong>Cash Flow ($$C_t$$):</strong> The net amount of cash (inflows minus outflows) generated or consumed by a project in a specific period $$t$$.</motion.p>
              <motion.p variants={itemVariants}><strong>Discount Rate ($$r$$):</strong> The rate used to determine the present value of future cash flows. It reflects the cost of capital or the minimum acceptable rate of return for an investment given its risk.</motion.p>
              <motion.p variants={itemVariants}><strong>Time Value of Money:</strong> The concept that a sum of money is worth more now than the same sum will be at a future date due to its potential earning capacity. NPV explicitly incorporates this principle.</motion.p>
              <motion.p variants={itemVariants}><strong>Present Value:</strong> The current worth of a future sum of money or stream of cash flows, given a specified rate of return.</motion.p>
              <motion.p variants={itemVariants}><strong>Cost of Capital:</strong> The rate of return that a company must earn on an investment project to maintain its market value and attract new capital. Often used as the discount rate.</motion.p>
              <motion.p variants={itemVariants}><strong>Capital Budgeting:</strong> The process businesses use to evaluate potential major projects or investments. NPV is one of the primary tools used in capital budgeting.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Effective NPV Analysis
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForUsingNPV.map((tip, index) => (
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
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-green-50 border border-blue-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-blue-600 to-green-700 rounded-2xl shadow-xl"
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
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
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
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
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

export default NetPresentValueCalculatorPage;
