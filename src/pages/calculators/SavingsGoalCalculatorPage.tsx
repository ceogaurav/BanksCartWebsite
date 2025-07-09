import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank, Landmark,
  HandCoins, CreditCard, Clock, Hourglass, PiggyBank as SavingsIcon, MinusCircle, Goal, CalendarCheck
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


// --- Main Savings Goal Calculator Page Component ---
interface SavingsGoalCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const SavingsGoalCalculatorPage: React.FC<SavingsGoalCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [savingsGoalAmount, setSavingsGoalAmount] = useState<number>(500000);
  const [currentSavings, setCurrentSavings] = useState<number>(50000);
  const [timeHorizon, setTimeHorizon] = useState<number>(5); // In years
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(7); // In percent

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for inputs
  const handleSavingsGoalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setSavingsGoalAmount(Number(value));
  };

  const handleCurrentSavingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setCurrentSavings(Number(value));
  };

  const handleTimeHorizonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeHorizon(Number(e.target.value));
  };

  const handleAnnualInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnualInterestRate(Number(e.target.value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Savings Goal Calculations
  const calculations = useMemo(() => {
    const FV_goal = savingsGoalAmount;
    const PV_current = currentSavings;
    const r_annual = annualInterestRate / 100; // as decimal
    const t_years = timeHorizon;

    let monthlySavings = 0;
    let totalInterestEarned = 0;
    let totalContributions = 0;

    // Calculate future value of current savings
    const FV_current_savings = PV_current * Math.pow(1 + r_annual, t_years);

    // Amount still needed from future monthly contributions
    const FV_needed_from_contributions = FV_goal - FV_current_savings;

    if (FV_needed_from_contributions <= 0) {
      // Goal already met or exceeded by current savings growing
      monthlySavings = 0;
      totalInterestEarned = FV_goal - PV_current; // Interest is just the difference if no new contributions
      totalContributions = 0;
    } else {
      const r_monthly = r_annual / 12;
      const n_months = t_years * 12;

      if (r_monthly === 0) {
        // Simple interest or no interest
        monthlySavings = FV_needed_from_contributions / n_months;
      } else {
        // Future value of ordinary annuity formula solved for PMT
        monthlySavings = (FV_needed_from_contributions * r_monthly) / (Math.pow(1 + r_monthly, n_months) - 1);
      }

      totalContributions = monthlySavings * n_months;
      totalInterestEarned = FV_goal - PV_current - totalContributions;
    }

    // Ensure values are not negative due to floating point inaccuracies or edge cases
    monthlySavings = Math.max(0, monthlySavings);
    totalInterestEarned = Math.max(0, totalInterestEarned);
    totalContributions = Math.round(totalContributions); // Round total contributions for display

    return {
      monthlySavings: Math.round(monthlySavings),
      totalInterestEarned: Math.round(totalInterestEarned),
      totalContributions: totalContributions,
      finalAmount: FV_goal // The goal amount itself
    };
  }, [savingsGoalAmount, currentSavings, timeHorizon, annualInterestRate]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Savings Goal Calculator?",
      answer: "A Savings Goal Calculator is a financial tool designed to help you determine how much money you need to save regularly (e.g., monthly) to reach a specific financial target within a set timeframe. It takes into account your desired goal amount, any existing savings, the time you have, and the interest rate your savings might earn, providing a clear roadmap to achieving your financial aspirations."
    },
    {
      question: "Why is setting savings goals important?",
      answer: "Setting savings goals provides motivation and direction for your financial efforts. It helps you prioritize spending, make informed financial decisions, and ensures you're actively working towards important life events like buying a home, funding education, or securing retirement, rather than just saving aimlessly."
    },
    {
      question: "What is 'Compound Interest' and why is it important for savings?",
      answer: "Compound interest is 'interest on interest' – it's earned not only on the initial principal but also on the accumulated interest from previous periods. It's incredibly powerful for savings because your money grows exponentially over time. The longer your money compounds and the higher the interest rate, the faster your savings will grow."
    },
    {
      question: "How does the interest rate affect my savings goal?",
      answer: "The interest rate significantly impacts how much you need to save. A higher interest rate means your money grows faster through compound interest, so you might need to save less each month to reach your goal. Conversely, a lower interest rate means you'll need to contribute more from your own pocket."
    },
    {
      question: "What if I already have some savings?",
      answer: "The calculator takes your 'Current Savings' into account. These existing savings will also grow with interest over your time horizon, reducing the amount you need to contribute monthly to reach your final goal. It gives you a head start!"
    },
    {
      question: "Can I use this for multiple savings goals?",
      answer: "While this calculator focuses on one goal at a time, you can use it individually for each of your goals (e.g., one calculation for a down payment, another for a vacation). For comprehensive multi-goal planning, a financial advisor can provide tailored strategies."
    },
    {
      question: "What if I can't meet the calculated monthly savings?",
      answer: "If the calculated monthly savings are too high, you have a few options:<ul><li><strong>Increase your time horizon:</strong> Give yourself more time to save.</li><li><strong>Reduce your savings goal:</strong> Make the goal more modest.</li><li><strong>Increase your income:</strong> Look for ways to earn more money.</li><li><strong>Reduce expenses:</strong> Cut back on discretionary spending to free up more cash for savings.</li></ul>"
    }
  ];

  const tipsForAchievingSavingsGoals = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Set SMART goals: Specific, Measurable, Achievable, Relevant, Time-bound." },
    { icon: <PiggyBank className="w-6 h-6 text-blue-500" />, text: "Automate your savings by setting up recurring transfers to a separate savings account." },
    { icon: <TrendingDown className="w-6 h-6 text-yellow-500" />, text: "Create a budget to identify areas where you can cut expenses and free up cash for savings." },
    { icon: <Lightbulb className="w-6 h-6 text-purple-500" />, text: "Review your progress regularly and adjust your plan as needed." },
    { icon: <Wallet className="w-6 h-6 text-orange-500" />, text: "Consider higher-yield savings accounts or low-risk investments for better returns." },
    { icon: <Clock className="w-6 h-6 text-red-500" />, text: "Start saving early to maximize the power of compound interest." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Personalized Savings Plans", description: "Access tailored strategies and products to help you achieve your unique savings goals." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Financial Advisory", description: "Connect with certified financial advisors for personalized guidance on savings and investment strategies." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "High-Yield Savings Products", description: "Explore various savings accounts and fixed deposits offering competitive interest rates." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Investment Opportunities", description: "Discover investment options aligned with your risk tolerance to grow your wealth faster." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-green-600 to-blue-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Achieve Your Dreams with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Savings Goal Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-green-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Set clear goals for how much to save over a set period.
            Plan your path to financial freedom and secure your future.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Savings & Investment Advisory"
                openApplyModal={openApplyModal}
                className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Savings Advice
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Savings Goal Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-green-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-blue-500" /> Plan Your Savings Goals
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Goal className="w-6 h-6 mr-2 text-green-600" /> Your Savings Details
              </h3>

              {/* Savings Goal Amount */}
              <motion.div variants={itemVariants}>
                <label htmlFor="savingsGoalAmount" className="block text-lg font-semibold text-gray-700 mb-2">
                  Savings Goal Amount: <span className="text-purple-600">{formatCurrency(savingsGoalAmount)}</span>
                </label>
                <input
                  type="range"
                  id="savingsGoalAmount"
                  min="100000"
                  max="10000000"
                  step="50000"
                  value={savingsGoalAmount}
                  onChange={handleSavingsGoalAmountChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(savingsGoalAmount)}
                  onChange={handleSavingsGoalAmountChange}
                  onBlur={(e) => setSavingsGoalAmount(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Current Savings */}
              <motion.div variants={itemVariants}>
                <label htmlFor="currentSavings" className="block text-lg font-semibold text-gray-700 mb-2">
                  Current Savings: <span className="text-teal-600">{formatCurrency(currentSavings)}</span>
                </label>
                <input
                  type="range"
                  id="currentSavings"
                  min="0"
                  max={savingsGoalAmount}
                  step="10000"
                  value={currentSavings}
                  onChange={handleCurrentSavingsChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(currentSavings)}
                  onChange={handleCurrentSavingsChange}
                  onBlur={(e) => setCurrentSavings(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Time Horizon */}
              <motion.div variants={itemVariants}>
                <label htmlFor="timeHorizon" className="block text-lg font-semibold text-gray-700 mb-2">
                  Time Horizon (Years): <span className="text-orange-600">{timeHorizon} Years</span>
                </label>
                <input
                  type="range"
                  id="timeHorizon"
                  min="1"
                  max="30"
                  step="1"
                  value={timeHorizon}
                  onChange={handleTimeHorizonChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="number"
                  value={timeHorizon}
                  onChange={handleTimeHorizonChange}
                  onBlur={(e) => setTimeHorizon(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  min="1"
                  max="30"
                />
              </motion.div>

              {/* Annual Interest Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="annualInterestRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Interest Rate (%): <span className="text-red-600">{annualInterestRate}%</span>
                </label>
                <input
                  type="range"
                  id="annualInterestRate"
                  min="0"
                  max="15"
                  step="0.1"
                  value={annualInterestRate}
                  onChange={handleAnnualInterestRateChange}
                  className="w-full h-2 bg-gradient-to-r from-red-300 to-red-500 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <input
                  type="number"
                  value={annualInterestRate}
                  onChange={handleAnnualInterestRateChange}
                  onBlur={(e) => setAnnualInterestRate(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-red-500 focus:border-red-500 transition-all"
                  step="0.1"
                />
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-green-500 to-blue-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">To Reach Your Goal of {formatCurrency(savingsGoalAmount)}</h3>
              <p className="text-xl text-green-100 mb-8">You need to save:</p>

              <motion.div
                key={calculations.monthlySavings} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
              >
                {formatCurrency(calculations.monthlySavings)} / Month
              </motion.div>

              <div className="w-full space-y-4 text-lg mt-8">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-green-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><SavingsIcon className="w-5 h-5" /> Total Contributions</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalContributions)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-green-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Total Interest Earned</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalInterestEarned)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-green-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><CalendarCheck className="w-5 h-5" /> Time Horizon</span>
                  <span className="font-bold text-white">{timeHorizon} Years</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-green-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Percent className="w-5 h-5" /> Annual Interest Rate</span>
                  <span className="font-bold text-white">{annualInterestRate}%</span>
                </motion.div>
              </div>

              {/* Message if goal already met */}
              {calculations.monthlySavings === 0 && calculations.totalInterestEarned > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center text-yellow-200 text-base"
                >
                  <CheckCircle className="inline-block w-5 h-5 mr-2" /> Your current savings are projected to meet or exceed your goal!
                </motion.div>
              )}
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Savings Goal Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Savings Goal Calculator is a practical financial tool designed to help you plan and achieve your financial aspirations. Whether you're saving for a down payment on a house, a child's education, a dream vacation, or retirement, this calculator provides a clear roadmap. By inputting your desired savings goal amount, any existing savings you have, the time you have to save, and an estimated annual interest rate your savings might earn, the calculator determines the precise monthly amount you need to set aside. This empowers you to create a realistic savings plan, track your progress, and stay motivated on your journey to financial success.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Savings Goal Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Savings Goal Amount:</strong> Start by defining the total amount of money you want to save. Be specific (e.g., ₹5,00,000 for a car down payment).</motion.li>
              <motion.li variants={itemVariants}><strong>Input Current Savings:</strong> If you've already started saving, enter the amount you currently have. This gives you a head start and reduces your future monthly contributions.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Time Horizon (Years):</strong> Specify how many years you have to reach your savings goal. The longer the time, the less you might need to save each month.</motion.li>
              <motion.li variants={itemVariants}><strong>Enter Annual Interest Rate (%):</strong> Estimate the annual interest rate your savings account or investment will earn. Even a small return can significantly boost your savings over time due to compounding.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Required Monthly Savings:</strong> The calculator will instantly display the monthly amount you need to save to hit your target. It also shows the total contributions you'll make and the total interest you're projected to earn.</motion.li>
              <motion.li variants={itemVariants}><strong>Adjust and Optimize:</strong> If the calculated monthly savings are too high, consider extending your time horizon, reducing your goal, or finding ways to increase your income or reduce expenses to free up more funds for saving.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Savings Goal Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Clarity and Direction:</strong> Transforms abstract financial dreams into concrete, actionable steps by showing you exactly what you need to do.</motion.li>
              <motion.li variants={itemVariants}><strong>Motivation and Accountability:</strong> Seeing the required monthly amount and the potential interest earned can keep you motivated and accountable to your savings plan.</motion.li>
              <motion.li variants={itemVariants}><strong>Optimized Planning:</strong> Helps you understand the interplay between time, interest rates, and contributions, allowing you to optimize your strategy for faster goal achievement.</motion.li>
              <motion.li variants={itemVariants}><strong>Realistic Expectations:</strong> Provides a realistic assessment of what it takes to reach your goals, helping you avoid disappointment and adjust your plan early if needed.</motion.li>
              <motion.li variants={itemVariants}><strong>Harness Compound Interest:</strong> Highlights the power of compounding, encouraging you to start saving early and consistently to maximize your returns.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Savings Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Savings Goal:</strong> A specific financial target you aim to achieve, such as a down payment, retirement fund, or education expenses.</motion.p>
              <motion.p variants={itemVariants}><strong>Current Savings:</strong> The amount of money you have already accumulated towards your savings goal.</motion.p>
              <motion.p variants={itemVariants}><strong>Time Horizon:</strong> The total duration (in years or months) you have set to reach your savings goal.</motion.p>
              <motion.p variants={itemVariants}><strong>Annual Interest Rate:</strong> The percentage rate at which your savings are expected to grow annually, typically through a savings account or investment.</motion.p>
              <motion.p variants={itemVariants}><strong>Monthly Savings (Contribution):</strong> The regular amount of money you need to set aside each month to reach your savings goal within the specified time and interest rate.</motion.p>
              <motion.p variants={itemVariants}><strong>Total Contributions:</strong> The sum of all your monthly savings payments over the entire time horizon.</motion.p>
              <motion.p variants={itemVariants}><strong>Total Interest Earned:</strong> The cumulative amount of interest your savings are projected to generate due to compounding over the time horizon.</motion.p>
              <motion.p variants={itemVariants}><strong>Compound Interest:</strong> Interest calculated on the initial principal and also on the accumulated interest of previous periods, leading to exponential growth.</motion.p>
              <motion.p variants={itemVariants}><strong>Financial Independence:</strong> The state of having sufficient passive income or accumulated wealth to cover one's living expenses without needing to work actively.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Achieving Your Savings Goals
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForAchievingSavingsGoals.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Savings Journey?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-green-50 to-blue-50 border border-green-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-green-600 to-blue-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Turn Your Savings Goals into Reality?
            </motion.h2>
            <motion.p
              className="text-lg text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart offers comprehensive financial tools, expert advice, and tailored savings and investment products
              to help you achieve your financial goals efficiently and effectively.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Savings Goal Planning"
                  openApplyModal={openApplyModal}
                  className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Explore Savings Solutions
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Explore Savings Solutions</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default SavingsGoalCalculatorPage;
