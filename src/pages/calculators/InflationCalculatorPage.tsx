import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank, Landmark,
  HandCoins, CreditCard, Clock, Hourglass, PiggyBank as SavingsIcon,
  Flame, TrendingDown as InflationDown, TrendingUp as ValueUp // Icons for inflation
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


// --- Main Inflation Calculator Page Component ---
interface InflationCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const InflationCalculatorPage: React.FC<InflationCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [currentAmount, setCurrentAmount] = useState<number>(100000); // INR
  const [inflationRate, setInflationRate] = useState<number>(5); // Annual percentage
  const [years, setYears] = useState<number>(10); // Number of years

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for inputs
  const handleCurrentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setCurrentAmount(Number(value));
  };
  const handleInflationRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInflationRate(Number(e.target.value));
  };
  const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYears(Number(e.target.value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Inflation Calculations
  const calculations = useMemo(() => {
    const inflationFactor = Math.pow(1 + inflationRate / 100, years);

    const futureValueNeeded = currentAmount * inflationFactor;
    const purchasingPowerOfCurrentAmountInFuture = currentAmount / inflationFactor;
    const totalInflationImpact = futureValueNeeded - currentAmount;

    return {
      futureValueNeeded: Math.round(futureValueNeeded),
      purchasingPowerOfCurrentAmountInFuture: Math.round(purchasingPowerOfCurrentAmountInFuture),
      totalInflationImpact: Math.round(totalInflationImpact),
    };
  }, [currentAmount, inflationRate, years]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is an Inflation Calculator?",
      answer: "An Inflation Calculator is a financial tool that helps you understand how the purchasing power of money changes over time due to inflation. It allows you to see what a certain amount of money today will be worth in the future, or how much more money you'll need in the future to buy the same goods and services that a specific amount buys today."
    },
    {
      question: "What is inflation and why is it important?",
      answer: "Inflation is the rate at which the general level of prices for goods and services is rising, and consequently, the purchasing power of currency is falling. It's important because it erodes the value of your savings and investments over time. Understanding inflation helps you make informed financial decisions, such as how much to save for retirement or how to invest to beat inflation."
    },
    {
      question: "How does inflation affect my money?",
      answer: "Inflation reduces the purchasing power of your money. For example, if the inflation rate is 5%, an item that costs ₹100 today will cost ₹105 next year. This means your ₹100 will only be able to buy about 95% of what it could buy today. Over many years, the cumulative effect of inflation can significantly diminish the value of your savings if they are not growing at a rate higher than inflation."
    },
    {
      question: "What is 'purchasing power'?",
      answer: "Purchasing power refers to the quantity of goods or services that can be bought with a specific amount of money. When inflation rises, purchasing power falls, meaning your money buys fewer goods and services. Conversely, deflation (a decrease in prices) would increase purchasing power."
    },
    {
      question: "What is a 'good' inflation rate?",
      answer: "Most central banks aim for a low, stable, and positive inflation rate, typically around 2-3% annually. This is considered healthy for economic growth, as it encourages spending and investment without causing rapid erosion of purchasing power. High inflation (hyperinflation) can destabilize an economy, while deflation can lead to economic stagnation."
    },
    {
      question: "How can I protect my savings from inflation?",
      answer: "To protect your savings from inflation, consider investments that typically offer returns higher than the inflation rate. These can include:<ul><li><strong>Equity Investments:</strong> Stocks have historically outperformed inflation over the long term.</li><li><strong>Real Estate:</strong> Property values and rental income can appreciate with inflation.</li><li><strong>Inflation-Indexed Bonds:</strong> Government bonds specifically designed to protect against inflation (e.g., Treasury Inflation-Protected Securities - TIPS in some countries).</li><li><strong>Diversified Mutual Funds/ETFs:</strong> Funds that invest across various asset classes.</li></ul>"
    },
    {
      question: "Does this calculator account for taxes or investment returns?",
      answer: "No, this calculator focuses purely on the effect of inflation on purchasing power. It does not account for taxes on your income or investments, nor does it factor in any returns your money might earn if invested. For a more comprehensive financial plan, you would need to consider these additional elements."
    }
  ];

  const tipsForInflationPlanning = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Invest your savings in assets that have a historical track record of outperforming inflation." },
    { icon: <PiggyBank className="w-6 h-6 text-blue-500" />, text: "Regularly review your financial plan and adjust your savings goals to account for inflation." },
    { icon: <Lightbulb className="w-6 h-6 text-yellow-500" />, text: "Consider inflation when planning for major future expenses like retirement, education, or a home purchase." },
    { icon: <TrendingUp className="w-6 h-6 text-purple-500" />, text: "Seek professional financial advice to create an investment strategy tailored to your inflation concerns." },
    { icon: <Wallet className="w-6 h-6 text-orange-500" />, text: "Maintain a diversified portfolio to mitigate risks associated with inflation and market volatility." },
    { icon: <Clock className="w-6 h-6 text-red-500" />, text: "Understand that even low, consistent inflation can significantly erode purchasing power over long periods." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Inflation-Adjusted Financial Planning", description: "Access tools and expert advice for financial planning that accounts for the real impact of inflation." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Diversified Investment Solutions", description: "Explore a range of investment products designed to help grow your wealth and beat inflation." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Expert Financial Advisory", description: "Connect with certified financial advisors who can help you build an inflation-resilient portfolio." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Long-Term Wealth Management", description: "Get support for long-term wealth creation strategies that protect and enhance your purchasing power." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-red-600 to-orange-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Uncover the True Cost of Time with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white">
              Inflation Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-red-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Calculate the effect of inflation on your purchasing power.
            Plan effectively for your financial future.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Inflation Impact Financial Planning"
                openApplyModal={openApplyModal}
                className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Financial Planning Advice
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Inflation Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-red-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-orange-500" /> Inflation Impact Analyzer
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Flame className="w-6 h-6 mr-2 text-red-600" /> Your Inflation Scenario
              </h3>

              {/* Current Amount */}
              <motion.div variants={itemVariants}>
                <label htmlFor="currentAmount" className="block text-lg font-semibold text-gray-700 mb-2">
                  Current Amount / Value Today: <span className="text-blue-600">{formatCurrency(currentAmount)}</span>
                </label>
                <input
                  type="range"
                  id="currentAmount"
                  min="1000"
                  max="10000000"
                  step="1000"
                  value={currentAmount}
                  onChange={handleCurrentAmountChange}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(currentAmount)}
                  onChange={handleCurrentAmountChange}
                  onBlur={(e) => setCurrentAmount(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Annual Inflation Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="inflationRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Inflation Rate (%): <span className="text-teal-600">{inflationRate}%</span>
                </label>
                <input
                  type="range"
                  id="inflationRate"
                  min="0"
                  max="15"
                  step="0.1"
                  value={inflationRate}
                  onChange={handleInflationRateChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="number"
                  value={inflationRate}
                  onChange={handleInflationRateChange}
                  onBlur={(e) => setInflationRate(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  step="0.1"
                />
              </motion.div>

              {/* Number of Years */}
              <motion.div variants={itemVariants}>
                <label htmlFor="years" className="block text-lg font-semibold text-gray-700 mb-2">
                  Number of Years: <span className="text-orange-600">{years} Years</span>
                </label>
                <input
                  type="range"
                  id="years"
                  min="1"
                  max="50"
                  step="1"
                  value={years}
                  onChange={handleYearsChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="number"
                  value={years}
                  onChange={handleYearsChange}
                  onBlur={(e) => setYears(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  min="1"
                  max="50"
                />
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-red-500 to-orange-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Inflation's Impact</h3>

              {/* Future Value Needed */}
              <p className="text-xl text-red-100 mb-4">Amount needed in {years} years to have today's purchasing power:</p>
              <motion.div
                key={calculations.futureValueNeeded} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white drop-shadow-lg"
              >
                {formatCurrency(calculations.futureValueNeeded)}
              </motion.div>

              <div className="w-full space-y-4 text-lg mt-8">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-red-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><DollarSign className="w-5 h-5" /> Current Amount</span>
                  <span className="font-bold text-white">{formatCurrency(currentAmount)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-red-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Percent className="w-5 h-5" /> Annual Inflation Rate</span>
                  <span className="font-bold text-white">{inflationRate}%</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-red-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Clock className="w-5 h-5" /> Number of Years</span>
                  <span className="font-bold text-white">{years} Years</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-red-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><InflationDown className="w-5 h-5" /> Purchasing Power in Future</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.purchasingPowerOfCurrentAmountInFuture)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-red-700/30 p-3 rounded-lg border-t border-red-500 pt-4 mt-4">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Total Inflation Impact</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalInflationImpact)}</span>
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

            .accent-pink-600::-webkit-slider-thumb { --tw-accent-color: #EC4899; }
            .accent-pink-600::-moz-range-thumb { --tw-accent-color: #EC4899; }

            .accent-gray-600::-webkit-slider-thumb { --tw-accent-color: #4B5563; }
            .accent-gray-600::-moz-range-thumb { --tw-accent-color: #4B5563; }

            input[type="range"]:active::-webkit-slider-thumb {
              cursor: grabbing;
            }
            input[type="range"]:active::-moz-range-thumb {
              cursor: grabbing;
            }
          `}</style>
        </motion.div>

        {/* Informational Sections */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg mt-6 space-y-10">
          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is an Inflation Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              An Inflation Calculator is a powerful financial tool designed to illustrate the often-overlooked impact of inflation on your money's purchasing power over time. While the numerical value of your money might remain constant, its ability to buy goods and services diminishes as prices rise. This calculator helps you visualize this erosion by showing you how much more money you'll need in the future to afford the same items that a given amount buys today, or conversely, what the real value of your current savings will be in the future. By providing a clear projection of inflation's effect, it empowers you to make more informed decisions about saving, investing, and financial planning for your long-term goals.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Inflation Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Current Amount / Value Today:</strong> Input the amount of money you want to analyze. This could be your current savings, a specific expense, or any value you want to see the future equivalent of.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Annual Inflation Rate (%):</strong> Provide the expected or historical annual inflation rate. This rate represents how quickly prices are rising. You can use average historical rates for your country or a projected rate.</motion.li>
              <motion.li variants={itemVariants}><strong>Choose Number of Years:</strong> Select the number of years into the future you wish to project the impact of inflation. This could be your retirement horizon, a child's college years, or any other significant timeframe.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Inflation's Impact:</strong> The calculator will instantly display two key results:
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li><strong>Future Value Needed:</strong> The amount of money you will need in the specified number of years to have the same purchasing power as your 'Current Amount' today.</li>
                  <li><strong>Purchasing Power in Future:</strong> What your 'Current Amount' today will actually be able to buy in the future, given the inflation rate.</li>
                  <li><strong>Total Inflation Impact:</strong> The difference between the 'Future Value Needed' and your 'Current Amount', representing the total value eroded by inflation.</li>
                </ul>
              </motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use an Inflation Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Realistic Financial Planning:</strong> Helps you set more realistic savings and investment goals by accounting for the future cost of living.</motion.li>
              <motion.li variants={itemVariants}><strong>Understand Purchasing Power Erosion:</strong> Clearly demonstrates how inflation silently diminishes the value of your money over time, motivating proactive financial strategies.</motion.li>
              <motion.li variants={itemVariants}><strong>Better Retirement Planning:</strong> Essential for estimating how much you'll truly need in retirement to maintain your desired lifestyle.</motion.li>
              <motion.li variants={itemVariants}><strong>Informed Investment Decisions:</strong> Encourages you to seek investments that can generate returns higher than the inflation rate to preserve and grow your wealth.</motion.li>
              <motion.li variants={itemVariants}><strong>Education Cost Projections:</strong> Useful for projecting future education expenses, ensuring you save adequately for your children's schooling.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Inflation Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Inflation:</strong> The rate at which the general level of prices for goods and services is rising, and subsequently, purchasing power is falling.</motion.p>
              <motion.p variants={itemVariants}><strong>Purchasing Power:</strong> The financial ability to buy products and services. Inflation reduces purchasing power.</motion.p>
              <motion.p variants={itemVariants}><strong>Annual Inflation Rate:</strong> The percentage increase in the average price level of goods and services over a year.</motion.p>
              <motion.p variants={itemVariants}><strong>Consumer Price Index (CPI):</strong> A measure that examines the weighted average of prices of a basket of consumer goods and services, used to gauge inflation.</motion.p>
              <motion.p variants={itemVariants}><strong>Deflation:</strong> The opposite of inflation; a general decline in prices for goods and services, typically associated with a contraction in the money supply and credit.</motion.p>
              <motion.p variants={itemVariants}><strong>Hyperinflation:</strong> Extremely rapid or out-of-control inflation, leading to a quick and drastic erosion of the real value of the local currency.</motion.p>
              <motion.p variants={itemVariants}><strong>Nominal Value:</strong> The face value of money or an asset, not adjusted for inflation.</motion.p>
              <motion.p variants={itemVariants}><strong>Real Value:</strong> The value of money or an asset after adjusting for inflation, reflecting its true purchasing power.</motion.p>
              <motion.p variants={itemVariants}><strong>Cost of Living:</strong> The amount of money needed to sustain a certain standard of living, including basic expenses such as housing, food, taxes, and healthcare. Inflation directly impacts the cost of living.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Planning Against Inflation
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForInflationPlanning.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Inflation-Resilient Planning?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-red-50 to-orange-50 border border-red-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-red-600 to-orange-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Secure Your Financial Future Against Inflation?
            </motion.h2>
            <motion.p
              className="text-lg text-red-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart provides comprehensive tools, expert advice, and tailored financial solutions
              to help you build an inflation-resilient portfolio and achieve your long-term goals.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Inflation-Proof Financial Planning"
                  openApplyModal={openApplyModal}
                  className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Get Personalized Advice
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Get Personalized Advice</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default InflationCalculatorPage;
