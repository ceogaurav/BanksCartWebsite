import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calendar, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  PiggyBank, Clock, Coins, LineChart, HandCoins, Repeat
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


// --- Main Investment Growth Calculator Page Component ---
interface InvestmentGrowthCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const InvestmentGrowthCalculatorPage: React.FC<InvestmentGrowthCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [initialInvestment, setInitialInvestment] = useState<number>(50000); // Initial Lump Sum
  const [monthlyContribution, setMonthlyContribution] = useState<number>(5000); // Monthly SIP
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(10.0); // Annual Interest Rate in %
  const [investmentTenure, setInvestmentTenure] = useState<number>(15); // Investment Tenure in Years

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for direct input fields (with formatting)
  const handleInitialInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setInitialInvestment(Number(value));
  };

  const handleMonthlyContributionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setMonthlyContribution(Number(value));
  };

  const handleAnnualInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnualInterestRate(Number(e.target.value));
  };

  const handleInvestmentTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestmentTenure(Number(e.target.value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Investment Growth Calculation
  const calculations = useMemo(() => {
    const P0 = initialInvestment; // Initial Principal
    const PMT = monthlyContribution; // Monthly Payment
    const r_annual = annualInterestRate / 100; // Annual interest rate as decimal
    const t_years = investmentTenure; // Number of years

    const r_monthly = r_annual / 12; // Monthly interest rate
    const n_months = t_years * 12; // Total number of months

    let futureValueOfLumpSum = P0;
    let futureValueOfContributions = 0;
    let totalInvestedAmount = P0 + (PMT * n_months);
    let totalInterestEarned = 0;
    let futureValue = 0;

    // Calculate Future Value of Initial Lump Sum
    if (P0 > 0 && r_annual > 0 && t_years > 0) {
      futureValueOfLumpSum = P0 * Math.pow((1 + r_annual), t_years);
    } else if (P0 > 0 && t_years > 0) { // If rate is 0, it's just principal
        futureValueOfLumpSum = P0;
    }


    // Calculate Future Value of Monthly Contributions (SIP)
    if (PMT > 0 && r_monthly > 0 && n_months > 0) {
      futureValueOfContributions = PMT * ((Math.pow(1 + r_monthly, n_months) - 1) / r_monthly);
    } else if (PMT > 0 && n_months > 0) { // If monthly rate is 0, it's just total contributions
        futureValueOfContributions = PMT * n_months;
    }

    futureValue = futureValueOfLumpSum + futureValueOfContributions;
    totalInterestEarned = futureValue - totalInvestedAmount;

    return {
      totalInvestedAmount: Math.round(totalInvestedAmount),
      totalInterestEarned: Math.round(totalInterestEarned),
      futureValue: Math.round(futureValue),
    };
  }, [initialInvestment, monthlyContribution, annualInterestRate, investmentTenure]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is an Investment Growth Calculator?",
      answer: "An Investment Growth Calculator is a financial tool that helps you project how your investments will grow over a specified period, considering both an initial lump sum and regular contributions (like SIPs) at a fixed rate of return. It shows you the future value of your money and the total interest earned."
    },
    {
      question: "How does this calculator differ from a Compound Interest Calculator?",
      answer: "While both use compounding, a Compound Interest Calculator typically focuses on a single lump-sum investment. An Investment Growth Calculator is more comprehensive, allowing you to include both an initial lump sum and ongoing regular contributions (like monthly SIPs), providing a more realistic projection for active investors."
    },
    {
      question: "What is a Systematic Investment Plan (SIP)?",
      answer: "A SIP is a method of investing a fixed amount regularly (e.g., monthly) into a mutual fund scheme. It helps in rupee cost averaging and instills investment discipline, making it a popular way to leverage compounding over time."
    },
    {
      question: "How does the investment tenure impact growth?",
      answer: "Time is a critical factor in investment growth, especially with compounding. The longer your investment tenure, the more time your money has to earn returns, and those returns can also start earning returns, leading to exponential growth."
    },
    {
      question: "Are the projected returns guaranteed?",
      answer: "The calculator provides projections based on a fixed rate of return. Actual investment returns are not guaranteed and can vary based on market conditions, the performance of the chosen investment vehicle, and inflation. It's an estimation tool for planning purposes."
    },
    {
      question: "What are some common investment options for growth?",
      answer: "Common options include Equity Mutual Funds (via SIPs or lump sum), Public Provident Fund (PPF), National Pension System (NPS), Unit-Linked Insurance Plans (ULIPs), and direct equity investments. Each carries different risk and return profiles."
    },
    {
      question: "How can I maximize my investment growth?",
      answer: "Start investing early, invest regularly (e.g., through SIPs), choose investments aligned with your risk appetite that offer competitive returns, and stay invested for the long term to fully benefit from compounding. Reinvesting returns also accelerates growth."
    }
  ];

  const tipsForMaximizingGrowth = [
    { icon: <Clock className="w-6 h-6 text-green-500" />, text: "Begin investing as early as possible to maximize compounding period." },
    { icon: <Repeat className="w-6 h-6 text-blue-500" />, text: "Maintain consistent monthly contributions (SIPs) regardless of market fluctuations." },
    { icon: <Percent className="w-6 h-6 text-yellow-500" />, text: "Reinvest all dividends and interest earned to boost compounded returns." },
    { icon: <Calendar className="w-6 h-6 text-purple-500" />, text: "Stay invested for the long term; compounding works best over decades." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Diversify your portfolio to manage risk while pursuing growth." },
    { icon: <HandCoins className="w-6 h-6 text-red-500" />, text: "Increase your monthly contributions as your income grows." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Wide Range of Products", description: "Access diverse investment options including Mutual Funds, FDs, and more." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Personalized Financial Planning", description: "Get tailored advice to build an investment portfolio aligned with your goals." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Expert Guidance", description: "Connect with certified financial advisors for strategic investment insights." },
    { icon: <Coins className="w-16 h-16 text-purple-400" />, title: "Seamless Digital Experience", description: "Invest and track your portfolio effortlessly through our intuitive online platform." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Project Your Wealth with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-lime-300">
              Investment Growth Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-indigo-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Calculate the future value of your investments over time, considering both lump sums and regular contributions, at a fixed rate of return.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Investment Planning Inquiry"
                openApplyModal={openApplyModal}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Start Your Investment Journey
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Investment Growth Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-indigo-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-md">
            <LineChart className="inline-block w-9 h-9 mr-3 text-blue-500" /> Investment Growth Projection
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <PiggyBank className="w-6 h-6 mr-2 text-indigo-600" /> Investment Parameters
              </h3>

              {/* Initial Investment */}
              <motion.div variants={itemVariants}>
                <label htmlFor="initialInvestment" className="block text-lg font-semibold text-gray-700 mb-2">
                  Initial Investment (Lump Sum): <span className="text-blue-600">{formatCurrency(initialInvestment)}</span>
                </label>
                <input
                  type="range"
                  id="initialInvestment"
                  min="0" // Can be 0 if only monthly contributions
                  max="5000000"
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

              {/* Monthly Contribution */}
              <motion.div variants={itemVariants}>
                <label htmlFor="monthlyContribution" className="block text-lg font-semibold text-gray-700 mb-2">
                  Monthly Contribution (SIP): <span className="text-purple-600">{formatCurrency(monthlyContribution)}</span>
                </label>
                <input
                  type="range"
                  id="monthlyContribution"
                  min="0" // Can be 0 if only lump sum
                  max="100000"
                  step="500"
                  value={monthlyContribution}
                  onChange={handleMonthlyContributionChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(monthlyContribution)}
                  onChange={handleMonthlyContributionChange}
                  onBlur={(e) => setMonthlyContribution(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Annual Interest Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="annualInterestRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Expected Annual Rate of Return: <span className="text-teal-600">{annualInterestRate.toFixed(2)}%</span>
                </label>
                <input
                  type="range"
                  id="annualInterestRate"
                  min="1"
                  max="20"
                  step="0.05"
                  value={annualInterestRate}
                  onChange={handleAnnualInterestRateChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="number"
                  value={annualInterestRate}
                  onChange={handleAnnualInterestRateChange}
                  onBlur={(e) => setAnnualInterestRate(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  step="0.01"
                />
              </motion.div>

              {/* Investment Tenure */}
              <motion.div variants={itemVariants}>
                <label htmlFor="investmentTenure" className="block text-lg font-semibold text-gray-700 mb-2">
                  Investment Tenure: <span className="text-orange-600">{investmentTenure} Years</span>
                </label>
                <input
                  type="range"
                  id="investmentTenure"
                  min="1"
                  max="40"
                  step="1"
                  value={investmentTenure}
                  onChange={handleInvestmentTenureChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="number"
                  value={investmentTenure}
                  onChange={handleInvestmentTenureChange}
                  onBlur={(e) => setInvestmentTenure(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  min="1"
                  max="40"
                />
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Projected Future Value</h3>
              <motion.div
                key={calculations.futureValue} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-lime-300 drop-shadow-lg"
              >
                {formatCurrency(calculations.futureValue)}
              </motion.div>
              <p className="text-xl text-indigo-100 mb-8">Total Value at End of Tenure</p>

              <div className="w-full space-y-4 text-lg">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Total Invested Amount</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalInvestedAmount)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Total Interest Earned</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalInterestEarned)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Wallet className="w-5 h-5" /> Initial Lump Sum</span>
                  <span className="font-bold text-white">{formatCurrency(initialInvestment)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Coins className="w-5 h-5" /> Monthly SIP</span>
                  <span className="font-bold text-white">{formatCurrency(monthlyContribution)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Percent className="w-5 h-5" /> Annual Rate</span>
                  <span className="font-bold text-white">{annualInterestRate.toFixed(2)}%</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Clock className="w-5 h-5" /> Investment Period</span>
                  <span className="font-bold text-white">{investmentTenure} Years</span>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is an Investment Growth Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              An Investment Growth Calculator is a dynamic financial tool that empowers individuals to project the potential future value of their investments. Unlike simpler calculators, this tool considers both an initial lump-sum investment and ongoing regular contributions, such as Systematic Investment Plans (SIPs). By inputting key variables like the initial principal, monthly contribution amount, expected annual rate of return, and the investment tenure, users can visualize the power of compounding and consistent investing. It's an indispensable resource for setting financial goals, planning for retirement, a child's education, or any long-term wealth creation objective.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Investment Growth Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Initial Investment (Lump Sum):</strong> Input any existing capital you wish to invest upfront. If you're starting with only regular contributions, you can set this to zero.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Monthly Contribution (SIP):</strong> Specify the fixed amount you plan to invest regularly, typically every month. This simulates a Systematic Investment Plan.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Expected Annual Rate of Return:</strong> Enter the anticipated average annual growth rate of your investments. This can be based on historical performance or conservative estimates for future returns.</motion.li>
              <motion.li variants={itemVariants}><strong>Define Investment Tenure:</strong> Choose the total number of years you plan to continue investing and allow your money to grow. Longer tenures significantly amplify the compounding effect.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Instant Projections:</strong> As you adjust any of these parameters, the calculator immediately displays the projected Future Value of your total investment, the cumulative Total Invested Amount (principal + contributions), and the impressive Total Interest Earned, showcasing the power of long-term wealth creation.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use an Investment Growth Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Goal-Oriented Planning:</strong> Helps you determine how much you need to invest and for how long to achieve specific financial milestones, such as a retirement corpus, a child's education fund, or a down payment for a house.</motion.li>
              <motion.li variants={itemVariants}><strong>Visualize Compounding:</strong> Provides a clear visual representation of how interest on interest works, motivating you to start investing early and maintain discipline for long-term wealth accumulation.</motion.li>
              <motion.li variants={itemVariants}><strong>Strategic Decision Making:</strong> Allows you to experiment with different investment amounts, contribution frequencies, and expected returns to formulate an optimal investment strategy tailored to your risk appetite and financial objectives.</motion.li>
              <motion.li variants={itemVariants}><strong>Motivation and Discipline:</strong> Seeing the potential future value of your investments can be a powerful motivator to stick to your investment plan and avoid premature withdrawals.</motion.li>
              <motion.li variants={itemVariants}><strong>Comparative Analysis:</strong> Use it to compare the potential growth of various investment avenues (e.g., mutual funds, fixed deposits) by plugging in their respective expected returns and tenures.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Investment Growth Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Initial Investment (Principal):</strong> The lump sum amount of money you invest at the beginning of the investment period.</motion.p>
              <motion.p variants={itemVariants}><strong>Monthly Contribution (SIP):</strong> A fixed amount of money you invest at regular intervals, typically monthly, simulating a Systematic Investment Plan.</motion.p>
              <motion.p variants={itemVariants}><strong>Annual Interest Rate (Rate of Return):</strong> The percentage at which your investment is expected to grow annually. This is a crucial factor influencing your wealth accumulation.</motion.p>
              <motion.p variants={itemVariants}><strong>Investment Tenure:</strong> The total duration, in years, for which your money remains invested and grows with the power of compounding.</motion.p>
              <motion.p variants={itemVariants}><strong>Future Value:</strong> The total projected worth of your investment at the end of the specified tenure, including both your invested capital and the accumulated interest/returns.</motion.p>
              <motion.p variants={itemVariants}><strong>Total Invested Amount:</strong> The sum of your initial lump-sum investment and all the monthly contributions made over the investment tenure.</motion.p>
              <motion.p variants={itemVariants}><strong>Total Interest Earned:</strong> The difference between the Future Value and the Total Invested Amount, representing the actual wealth generated through compounding.</motion.p>
              <motion.p variants={itemVariants}><strong>Compounding:</strong> The process where the interest earned on an investment is reinvested, allowing it to earn additional interest. This creates a snowball effect, accelerating wealth growth.</motion.p>
              <motion.p variants={itemVariants}><strong>Rupee Cost Averaging:</strong> A strategy often achieved through SIPs, where you invest a fixed amount regularly, buying more units when prices are low and fewer when prices are high, averaging out the cost over time.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Maximizing Investment Growth
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForMaximizingGrowth.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Investment Growth?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-indigo-600 to-blue-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to See Your Investments Soar?
            </motion.h2>
            <motion.p
              className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Start building your wealth with BanksCart. Explore tailored investment plans
              and harness the power of compounding for a secure and prosperous future.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Investment Growth Planning"
                  openApplyModal={openApplyModal}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Explore Investment Solutions
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Explore Investment Solutions</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default InvestmentGrowthCalculatorPage;
