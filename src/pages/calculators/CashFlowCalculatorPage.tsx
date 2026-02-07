import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, TrendingUp as TrendingUpIcon,
  Timer, LineChart, Target, PiggyBank, HandCoins, ArrowRightLeft, ArrowUpCircle, ArrowDownCircle, Landmark
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


// --- Main Cash Flow Calculator Page Component ---
interface CashFlowCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const CashFlowCalculatorPage: React.FC<CashFlowCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [initialCashBalance, setInitialCashBalance] = useState<number>(100000);
  const [numberOfPeriods, setNumberOfPeriods] = useState<number>(3); // e.g., 3 months/quarters/years
  // Stores cash inflows and outflows for each period
  const [periodCashFlows, setPeriodCashFlows] = useState<{ inflow: number; outflow: number }[]>(
    Array(3).fill({ inflow: 50000, outflow: 30000 })
  );

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for direct input fields (with formatting)
  const handleInitialCashBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setInitialCashBalance(Number(value));
  };

  const handleNumberOfPeriodsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumPeriods = Number(e.target.value);
    setNumberOfPeriods(newNumPeriods);
    // Adjust periodCashFlows array size when number of periods changes
    setPeriodCashFlows(prevCashFlows => {
      const newCashFlows = [...prevCashFlows];
      while (newCashFlows.length < newNumPeriods) {
        newCashFlows.push({ inflow: 50000, outflow: 30000 }); // Add default values for new periods
      }
      return newCashFlows.slice(0, newNumPeriods);
    });
  };

  const handlePeriodCashFlowChange = (index: number, type: 'inflow' | 'outflow', e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setPeriodCashFlows(prevCashFlows => {
      const newCashFlows = [...prevCashFlows];
      newCashFlows[index] = {
        ...newCashFlows[index],
        [type]: Number(value),
      };
      return newCashFlows;
    });
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Cash Flow Calculations
  const calculations = useMemo(() => {
    let currentCumulativeBalance = initialCashBalance;
    const results: { period: number; inflow: number; outflow: number; netCashFlow: number; cumulativeCashFlow: number }[] = [];

    periodCashFlows.forEach((period, index) => {
      const net = period.inflow - period.outflow;
      currentCumulativeBalance += net;
      results.push({
        period: index + 1,
        inflow: period.inflow,
        outflow: period.outflow,
        netCashFlow: net,
        cumulativeCashFlow: currentCumulativeBalance,
      });
    });

    return {
      periodResults: results,
      finalCashBalance: currentCumulativeBalance,
    };
  }, [initialCashBalance, periodCashFlows]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Cash Flow Calculator?",
      answer: "A Cash Flow Calculator is a tool that helps individuals and businesses project their cash inflows (money coming in) and cash outflows (money going out) over a specific period. It helps determine the net cash flow for each period and the overall cumulative cash balance, providing insights into liquidity and financial health."
    },
    {
      question: "What are Cash Inflows?",
      answer: "Cash inflows are all the money received by a business or individual. For businesses, this includes revenue from sales, loan proceeds, investment income, etc. For individuals, it includes salary, freelance income, rent received, etc."
    },
    {
      question: "What are Cash Outflows?",
      answer: "Cash outflows are all the money paid out by a business or individual. For businesses, this includes operating expenses (rent, salaries), cost of goods sold, loan repayments, etc. For individuals, it includes household expenses, loan EMIs, utility bills, etc."
    },
    {
      question: "What is 'Net Cash Flow'?",
      answer: "Net Cash Flow for a period is the difference between total cash inflows and total cash outflows for that period. A positive net cash flow means more money came in than went out, while a negative net cash flow means more money went out than came in."
    },
    {
      question: "What is 'Cumulative Cash Flow'?",
      answer: "Cumulative Cash Flow is the running total of cash balance over time. It starts with the initial cash balance and adds or subtracts the net cash flow of each subsequent period, showing the cash position at the end of each period."
    },
    {
      question: "Why is cash flow management important?",
      answer: "Effective cash flow management is critical for survival and growth. It ensures a business or individual has enough liquidity to meet short-term obligations, avoid financial distress, and identify opportunities for investment or expansion."
    },
    {
      question: "Does this calculator account for non-cash items like depreciation?",
      answer: "No, this calculator focuses purely on cash movements (inflows and outflows). Non-cash items like depreciation are accounting entries that affect profitability but do not directly involve cash. For a full financial picture, a profit and loss statement and balance sheet are also needed."
    }
  ];

  const tipsForCashFlowManagement = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Forecast cash flows regularly to anticipate shortfalls or surpluses." },
    { icon: <TrendingUpIcon className="w-6 h-6 text-blue-500" />, text: "Accelerate cash inflows (e.g., offer early payment discounts to customers)." },
    { icon: <TrendingDown className="w-6 h-6 text-yellow-500" />, text: "Manage cash outflows carefully (e.g., negotiate better payment terms with suppliers)." },
    { icon: <BarChart className="w-6 h-6 text-purple-500" />, text: "Maintain an adequate cash reserve for unexpected expenses." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Separate personal and business finances for clearer cash flow tracking." },
    { icon: <HandCoins className="w-6 h-6 text-red-500" />, text: "Consider a line of credit as a backup for temporary cash deficits." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Comprehensive Financial Tools", description: "Access a wide array of calculators and resources for personal and business financial planning." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Financial Advisory", description: "Connect with financial experts for guidance on cash flow management, budgeting, and investment strategies." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Funding Solutions", description: "Explore various loan and credit options to manage liquidity and support growth." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Business Banking Solutions", description: "Discover tailored banking products to streamline your business's financial operations." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Manage Your Money with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Cash Flow Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-emerald-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Estimate cash inflows and outflows for businesses or investments.
            Gain clarity on your liquidity and financial health.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Cash Flow Management Inquiry"
                openApplyModal={openApplyModal}
                className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Financial Advisory
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Cash Flow Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-emerald-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600 drop-shadow-md">
            <ArrowRightLeft className="inline-block w-9 h-9 mr-3 text-teal-500" /> Cash Flow Projection
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Briefcase className="w-6 h-6 mr-2 text-emerald-600" /> Your Cash Flow Details
              </h3>

              {/* Initial Cash Balance */}
              <motion.div variants={itemVariants}>
                <label htmlFor="initialCashBalance" className="block text-lg font-semibold text-gray-700 mb-2">
                  Initial Cash Balance: <span className="text-blue-600">{formatCurrency(initialCashBalance)}</span>
                </label>
                <input
                  type="range"
                  id="initialCashBalance"
                  min="0"
                  max="5000000"
                  step="10000"
                  value={initialCashBalance}
                  onChange={handleInitialCashBalanceChange}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(initialCashBalance)}
                  onChange={handleInitialCashBalanceChange}
                  onBlur={(e) => setInitialCashBalance(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Number of Periods */}
              <motion.div variants={itemVariants}>
                <label htmlFor="numberOfPeriods" className="block text-lg font-semibold text-gray-700 mb-2">
                  Number of Periods (e.g., Months/Quarters/Years): <span className="text-purple-600">{numberOfPeriods}</span>
                </label>
                <input
                  type="range"
                  id="numberOfPeriods"
                  min="1"
                  max="12"
                  step="1"
                  value={numberOfPeriods}
                  onChange={handleNumberOfPeriodsChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="number"
                  value={numberOfPeriods}
                  onChange={handleNumberOfPeriodsChange}
                  onBlur={(e) => setNumberOfPeriods(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  min="1"
                  max="12"
                />
              </motion.div>

              {/* Dynamic Cash Flow Inputs for Each Period */}
              <h4 className="text-xl font-bold text-gray-800 mb-2 mt-6 flex items-center">
                <Coins className="w-5 h-5 mr-2 text-emerald-600" /> Cash Flows Per Period
              </h4>
              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                {periodCashFlows.map((period, index) => (
                  <motion.div key={index} variants={itemVariants} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <h5 className="font-semibold text-lg text-gray-800 mb-3">Period {index + 1}</h5>
                    <div className="mb-3">
                      <label htmlFor={`inflow-${index}`} className="block text-base font-medium text-gray-700 mb-1 flex items-center">
                        <ArrowUpCircle className="w-4 h-4 mr-2 text-green-500" /> Inflow: <span className="text-green-600 ml-2">{formatCurrency(period.inflow)}</span>
                      </label>
                      <input
                        type="range"
                        id={`inflow-${index}`}
                        min="0"
                        max="1000000"
                        step="1000"
                        value={period.inflow}
                        onChange={(e) => handlePeriodCashFlowChange(index, 'inflow', e)}
                        className="w-full h-2 bg-gradient-to-r from-green-300 to-green-500 rounded-lg appearance-none cursor-pointer accent-green-600"
                      />
                      <input
                        type="text"
                        value={formatNumberWithCommas(period.inflow)}
                        onChange={(e) => handlePeriodCashFlowChange(index, 'inflow', e)}
                        onBlur={(e) => handlePeriodCashFlowChange(index, 'inflow', e)}
                        className="mt-2 w-full p-2 border border-gray-300 rounded-lg text-gray-800 text-center text-base focus:ring-green-500 focus:border-green-500 transition-all"
                        inputMode="numeric"
                      />
                    </div>
                    <div>
                      <label htmlFor={`outflow-${index}`} className="block text-base font-medium text-gray-700 mb-1 flex items-center">
                        <ArrowDownCircle className="w-4 h-4 mr-2 text-red-500" /> Outflow: <span className="text-red-600 ml-2">{formatCurrency(period.outflow)}</span>
                      </label>
                      <input
                        type="range"
                        id={`outflow-${index}`}
                        min="0"
                        max="1000000"
                        step="1000"
                        value={period.outflow}
                        onChange={(e) => handlePeriodCashFlowChange(index, 'outflow', e)}
                        onBlur={(e) => handlePeriodCashFlowChange(index, 'outflow', e)}
                        className="w-full h-2 bg-gradient-to-r from-red-300 to-red-500 rounded-lg appearance-none cursor-pointer accent-red-600"
                      />
                      <input
                        type="text"
                        value={formatNumberWithCommas(period.outflow)}
                        onChange={(e) => handlePeriodCashFlowChange(index, 'outflow', e)}
                        onBlur={(e) => handlePeriodCashFlowChange(index, 'outflow', e)}
                        className="mt-2 w-full p-2 border border-gray-300 rounded-lg text-gray-800 text-center text-base focus:ring-red-500 focus:border-red-500 transition-all"
                        inputMode="numeric"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Projected Cash Balance</h3>
              <motion.div
                key={calculations.finalCashBalance} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className={`text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg ${calculations.finalCashBalance >= 0 ? 'text-yellow-300' : 'text-red-300'}`}
              >
                {formatCurrency(calculations.finalCashBalance)}
              </motion.div>
              <p className="text-xl text-emerald-100 mb-8">Final Cash Balance</p>

              <div className="w-full space-y-4 text-lg">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-emerald-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Initial Cash Balance</span>
                  <span className="font-bold text-white">{formatCurrency(initialCashBalance)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-emerald-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Timer className="w-5 h-5" /> Number of Periods</span>
                  <span className="font-bold text-white">{numberOfPeriods}</span>
                </motion.div>
              </div>

              {/* Detailed Period-by-Period Cash Flow */}
              <h4 className="text-xl font-bold text-white mt-8 mb-4">Period-by-Period Cash Flow:</h4>
              <div className="w-full space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                {calculations.periodResults.map((result, index) => (
                  <motion.div key={index} variants={itemVariants} className="bg-emerald-700/20 p-3 rounded-lg text-sm">
                    <p className="font-semibold text-base mb-1">Period {result.period}</p>
                    <div className="flex justify-between items-center text-xs">
                      <span>Inflow: {formatCurrency(result.inflow)}</span>
                      <span>Outflow: {formatCurrency(result.outflow)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm font-medium mt-1">
                      <span>Net CF: <span className={result.netCashFlow >= 0 ? 'text-green-300' : 'text-red-300'}>{formatCurrency(result.netCashFlow)}</span></span>
                      <span>Cumulative CF: <span className={result.cumulativeCashFlow >= 0 ? 'text-yellow-300' : 'text-red-300'}>{formatCurrency(result.cumulativeCashFlow)}</span></span>
                    </div>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Cash Flow Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Cash Flow Calculator is a fundamental financial tool that helps individuals and businesses track and project the movement of money. It allows you to input your starting cash balance and then define expected cash inflows (money coming in, like sales revenue or salary) and cash outflows (money going out, like expenses or loan payments) over a series of defined periods (e.g., months, quarters, years). The calculator then computes the net cash flow for each period and, crucially, the cumulative cash balance, providing a clear picture of your liquidity position over time. This helps in anticipating cash shortages or surpluses, enabling proactive financial management.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Cash Flow Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Initial Cash Balance:</strong> Input the amount of cash you have at the beginning of your projection period. This is your starting point.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Number of Periods:</strong> Define how many periods (e.g., 3 months, 6 quarters, 1 year) you want to project your cash flow for. The calculator will dynamically create input fields for each period.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Cash Inflows for Each Period:</strong> For each period, enter the total expected cash that will come into your accounts. This could be from sales, income, investments, or other sources.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Cash Outflows for Each Period:</strong> For each period, enter the total expected cash that will leave your accounts. This typically includes operating expenses, purchases, loan payments, and other expenditures.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Cash Flow Projection:</strong> The calculator will instantly display the net cash flow for each period and, most importantly, the cumulative cash balance at the end of each period, culminating in your final cash balance. This helps you identify trends and potential liquidity issues or opportunities.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUpIcon className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Cash Flow Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Ensure Liquidity:</strong> Helps you ensure you have enough cash on hand to meet your short-term financial obligations and avoid cash shortages.</motion.li>
              <motion.li variants={itemVariants}><strong>Identify Trends:</strong> Allows you to see patterns in your cash inflows and outflows, helping you understand peak periods and lean periods.</motion.li>
              <motion.li variants={itemVariants}><strong>Strategic Planning:</strong> Essential for business planning, budgeting, and making informed decisions about investments, expansions, or debt management.</motion.li>
              <motion.li variants={itemVariants}><strong>Risk Mitigation:</strong> Helps in identifying potential cash flow gaps in advance, allowing you to take corrective actions like seeking short-term financing or adjusting spending.</motion.li>
              <motion.li variants={itemVariants}><strong>Performance Measurement:</strong> Provides a clear metric of your financial performance, focusing on actual cash movements rather than just accounting profits.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Cash Flow Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Cash Flow:</strong> The movement of money into (inflows) and out of (outflows) a business or personal account.</motion.p>
              <motion.p variants={itemVariants}><strong>Cash Inflows:</strong> Money received from various sources, such as sales revenue, loan disbursements, investment returns, or salary.</motion.p>
              <motion.p variants={itemVariants}><strong>Cash Outflows:</strong> Money paid out for various purposes, such as operating expenses, purchases, loan repayments, or investments.</motion.p>
              <motion.p variants={itemVariants}><strong>Net Cash Flow:</strong>{` The difference between total cash inflows and total cash outflows over a specific period ($$ \\text{Cash Inflows} - \\text{Cash Outflows} $$).`}</motion.p>
              <motion.p variants={itemVariants}><strong>Cumulative Cash Flow:</strong> The running total of the cash balance, starting from an initial balance and adjusting for the net cash flow of each subsequent period.</motion.p>
              <motion.p variants={itemVariants}><strong>Liquidity:</strong> The ease with which an asset can be converted into cash. Good cash flow ensures high liquidity, meaning readily available cash.</motion.p>
              <motion.p variants={itemVariants}><strong>Operating Activities:</strong> Cash flows generated from a company's core business operations (e.g., sales, paying suppliers/employees).</motion.p>
              <motion.p variants={itemVariants}><strong>Investing Activities:</strong> Cash flows related to the purchase or sale of long-term assets or investments (e.g., buying property, selling shares).</motion.p>
              <motion.p variants={itemVariants}><strong>Financing Activities:</strong> Cash flows related to debt, equity, and dividends (e.g., taking a loan, issuing shares, paying dividends).</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Effective Cash Flow Management
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForCashFlowManagement.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Financial Needs?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Need Expert Cash Flow Management?
            </motion.h2>
            <motion.p
              className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart offers comprehensive financial tools and expert advisory services
              to help you optimize your cash flow, secure funding, and achieve financial stability.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Cash Flow Advisory"
                  openApplyModal={openApplyModal}
                  className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
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

export default CashFlowCalculatorPage;
