import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calendar, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  PiggyBank, Clock, Coins, Users, ShieldCheck, TrendingDown, Gavel
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


// --- Main Retirement Savings Calculator Page Component ---
interface RetirementSavingsCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const RetirementSavingsCalculatorPage: React.FC<RetirementSavingsCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [currentSavings, setCurrentSavings] = useState<number>(500000); // Existing retirement savings
  const [desiredMonthlyIncomeToday, setDesiredMonthlyIncomeToday] = useState<number>(50000); // Desired monthly income in today's value
  const [inflationRate, setInflationRate] = useState<number>(6.0); // Annual inflation rate
  const [expectedReturnBeforeRetirement, setExpectedReturnBeforeRetirement] = useState<number>(10.0); // Annual return during accumulation
  const [expectedReturnDuringRetirement, setExpectedReturnDuringRetirement] = useState<number>(7.0); // Annual return during withdrawal

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for direct input fields (with formatting)
  const handleCurrentAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentAge(Number(e.target.value));
  };

  const handleRetirementAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRetirementAge(Number(e.target.value));
  };

  const handleCurrentSavingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setCurrentSavings(Number(value));
  };

  const handleDesiredMonthlyIncomeTodayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setDesiredMonthlyIncomeToday(Number(value));
  };

  const handleInflationRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInflationRate(Number(e.target.value));
  };

  const handleExpectedReturnBeforeRetirementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpectedReturnBeforeRetirement(Number(e.target.value));
  };

  const handleExpectedReturnDuringRetirementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpectedReturnDuringRetirement(Number(e.target.value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Retirement Calculations
  const calculations = useMemo(() => {
    const currentAgeVal = currentAge;
    const retirementAgeVal = retirementAge;
    const yearsToRetirement = Math.max(0, retirementAgeVal - currentAgeVal);

    const P_current_savings = currentSavings;
    const desiredMonthlyIncomeTodayVal = desiredMonthlyIncomeToday;
    const inflationRateVal = inflationRate / 100;
    const r_before_retirement_annual = expectedReturnBeforeRetirement / 100;
    const r_after_retirement_annual = expectedReturnDuringRetirement / 100;

    // 1. Future Value of Desired Monthly Income (adjusted for inflation)
    const futureDesiredMonthlyIncome = desiredMonthlyIncomeTodayVal * Math.pow(1 + inflationRateVal, yearsToRetirement);

    // 2. Required Retirement Corpus (to sustain income for 25 years post-retirement)
    const postRetirementYears = 25; // Assuming 25 years of retirement
    const r_monthly_after = r_after_retirement_annual / 12;
    const n_months_post_retirement = postRetirementYears * 12;

    let requiredCorpus = 0;
    if (futureDesiredMonthlyIncome > 0 && n_months_post_retirement > 0) {
        if (r_monthly_after > 0) {
            // Present value of annuity formula
            requiredCorpus = (futureDesiredMonthlyIncome * (1 - Math.pow(1 + r_monthly_after, -n_months_post_retirement))) / r_monthly_after;
        } else {
            // If post-retirement return is 0, simply multiply income by months
            requiredCorpus = futureDesiredMonthlyIncome * n_months_post_retirement;
        }
    }

    // 3. Future Value of Current Savings
    const fvCurrentSavings = P_current_savings * Math.pow(1 + r_before_retirement_annual, yearsToRetirement);

    // 4. Corpus Gap (amount still needed from future savings)
    const corpusGap = Math.max(0, requiredCorpus - fvCurrentSavings);

    // 5. Required Monthly Savings (to fill the corpus gap)
    const r_monthly_before = r_before_retirement_annual / 12;
    const n_months_before_retirement = yearsToRetirement * 12;

    let requiredMonthlySavings = 0;
    if (corpusGap > 0 && n_months_before_retirement > 0) {
        if (r_monthly_before > 0) {
            // Future value of annuity formula, solved for PMT
            requiredMonthlySavings = corpusGap * r_monthly_before / (Math.pow(1 + r_monthly_before, n_months_before_retirement) - 1);
        } else {
            // If pre-retirement return is 0, simply divide gap by months
            requiredMonthlySavings = corpusGap / n_months_before_retirement;
        }
    }

    // 6. Total Invested by Retirement
    const totalInvestedByRetirement = P_current_savings + (requiredMonthlySavings * n_months_before_retirement);

    // 7. Total Interest Earned by Retirement
    const totalInterestEarnedByRetirement = Math.max(0, requiredCorpus - totalInvestedByRetirement);

    // 8. Post-Retirement Income Sustainability Check (Optional, but good for user insight)
    let actualMonthlyIncomeFromCorpus = 0;
    if (requiredCorpus > 0 && n_months_post_retirement > 0) {
        if (r_monthly_after > 0) {
            actualMonthlyIncomeFromCorpus = (requiredCorpus * r_monthly_after) / (1 - Math.pow(1 + r_monthly_after, -n_months_post_retirement));
        } else {
            actualMonthlyIncomeFromCorpus = requiredCorpus / n_months_post_retirement;
        }
    }


    return {
      yearsToRetirement: yearsToRetirement,
      futureDesiredMonthlyIncome: Math.round(futureDesiredMonthlyIncome),
      requiredCorpus: Math.round(requiredCorpus),
      fvCurrentSavings: Math.round(fvCurrentSavings),
      corpusGap: Math.round(corpusGap),
      requiredMonthlySavings: Math.round(requiredMonthlySavings),
      totalInvestedByRetirement: Math.round(totalInvestedByRetirement),
      totalInterestEarnedByRetirement: Math.round(totalInterestEarnedByRetirement),
      actualMonthlyIncomeFromCorpus: Math.round(actualMonthlyIncomeFromCorpus),
      postRetirementYearsSupported: postRetirementYears,
    };
  }, [currentAge, retirementAge, currentSavings, desiredMonthlyIncomeToday, inflationRate, expectedReturnBeforeRetirement, expectedReturnDuringRetirement]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Retirement Savings Calculator?",
      answer: "A Retirement Savings Calculator is a financial planning tool that helps you estimate how much money you need to save to achieve your desired lifestyle in retirement. It considers factors like your current age, retirement age, existing savings, desired retirement income, inflation, and expected investment returns."
    },
    {
      question: "Why is it important to start retirement planning early?",
      answer: "Starting early gives your investments more time to benefit from the power of compounding. Even small, consistent contributions over a longer period can accumulate into a significant retirement corpus due to 'interest on interest' effect."
    },
    {
      question: "How does inflation affect my retirement goal?",
      answer: "Inflation erodes the purchasing power of money over time. Your desired monthly income in retirement needs to be adjusted for future inflation to ensure it can cover your expenses effectively. The calculator factors this in to give you a realistic corpus target."
    },
    {
      question: "What is a 'retirement corpus'?",
      answer: "A retirement corpus is the total lump sum amount of money you need to accumulate by your retirement age to fund your expenses throughout your retirement years. It's the financial nest egg you build to ensure financial independence post-work."
    },
    {
      question: "What are the best investment options for retirement savings in India?",
      answer: "Popular options include Public Provident Fund (PPF), Employees' Provident Fund (EPF), National Pension System (NPS), Equity Mutual Funds (via SIPs), Debt Mutual Funds, Fixed Deposits, and real estate. The best mix depends on your risk appetite and financial goals."
    },
    {
      question: "Can I adjust my savings plan if I'm behind on my retirement goal?",
      answer: "Yes, if you find you're behind, you can increase your monthly contributions, consider investing in instruments with potentially higher (but riskier) returns, or extend your working years. The calculator helps you model these adjustments."
    },
    {
      question: "Is the expected rate of return guaranteed?",
      answer: "No, the expected rate of return is an assumption for calculation purposes. Actual returns on investments, especially market-linked ones, are not guaranteed and can fluctuate. It's advisable to use a realistic and conservative estimate."
    }
  ];

  const tipsForRetirementPlanning = [
    { icon: <Clock className="w-6 h-6 text-green-500" />, text: "Start saving for retirement as early as possible to leverage compounding." },
    { icon: <PiggyBank className="w-6 h-6 text-blue-500" />, text: "Automate your savings by setting up recurring transfers to your retirement accounts." },
    { icon: <Percent className="w-6 h-6 text-yellow-500" />, text: "Regularly review and adjust your investment portfolio based on your age and risk tolerance." },
    { icon: <Calendar className="w-6 h-6 text-purple-500" />, text: "Factor in inflation when estimating your future retirement expenses." },
    { icon: <ShieldCheck className="w-6 h-6 text-orange-500" />, text: "Consider diversifying your investments across different asset classes." },
    { icon: <Users className="w-6 h-6 text-red-500" />, text: "Consult a financial advisor to create a personalized retirement plan." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Comprehensive Financial Planning", description: "Access tools and experts for holistic retirement planning, beyond just calculations." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Diverse Investment Products", description: "Explore a wide range of retirement-focused investment options like NPS, Mutual Funds, and FDs." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Expert Advisory Services", description: "Connect with certified financial planners to build a robust retirement portfolio." },
    { icon: <Gavel className="w-16 h-16 text-purple-400" />, title: "Tax-Efficient Strategies", description: "Understand and implement tax-saving strategies for your retirement savings." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Secure Your Golden Years with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Retirement Savings Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Estimate how much you need to save monthly or annually to reach your retirement goal.
            Plan for a comfortable and financially independent future.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Retirement Planning Inquiry"
                openApplyModal={openApplyModal}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Start Retirement Planning
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Retirement Savings Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-blue-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-purple-500" /> Plan Your Retirement Savings
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <PiggyBank className="w-6 h-6 mr-2 text-blue-600" /> Your Retirement Vision
              </h3>

              {/* Current Age */}
              <motion.div variants={itemVariants}>
                <label htmlFor="currentAge" className="block text-lg font-semibold text-gray-700 mb-2">
                  Your Current Age: <span className="text-blue-600">{currentAge} Years</span>
                </label>
                <input
                  type="range"
                  id="currentAge"
                  min="18"
                  max="60"
                  step="1"
                  value={currentAge}
                  onChange={handleCurrentAgeChange}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="number"
                  value={currentAge}
                  onChange={handleCurrentAgeChange}
                  onBlur={(e) => setCurrentAge(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  min="18"
                  max="60"
                />
              </motion.div>

              {/* Retirement Age */}
              <motion.div variants={itemVariants}>
                <label htmlFor="retirementAge" className="block text-lg font-semibold text-gray-700 mb-2">
                  Desired Retirement Age: <span className="text-purple-600">{retirementAge} Years</span>
                </label>
                <input
                  type="range"
                  id="retirementAge"
                  min={currentAge + 5} // Must be at least 5 years after current age
                  max="75"
                  step="1"
                  value={retirementAge}
                  onChange={handleRetirementAgeChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="number"
                  value={retirementAge}
                  onChange={handleRetirementAgeChange}
                  onBlur={(e) => setRetirementAge(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  min={currentAge + 5}
                  max="75"
                />
              </motion.div>

              {/* Current Savings */}
              <motion.div variants={itemVariants}>
                <label htmlFor="currentSavings" className="block text-lg font-semibold text-gray-700 mb-2">
                  Current Retirement Savings: <span className="text-teal-600">{formatCurrency(currentSavings)}</span>
                </label>
                <input
                  type="range"
                  id="currentSavings"
                  min="0"
                  max="50000000" // Up to 5 Crore
                  step="100000"
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

              {/* Desired Monthly Income in Today's Value */}
              <motion.div variants={itemVariants}>
                <label htmlFor="desiredMonthlyIncomeToday" className="block text-lg font-semibold text-gray-700 mb-2">
                  Desired Monthly Income (Today's Value): <span className="text-orange-600">{formatCurrency(desiredMonthlyIncomeToday)}</span>
                </label>
                <input
                  type="range"
                  id="desiredMonthlyIncomeToday"
                  min="10000"
                  max="500000" // Up to 5 Lakh
                  step="5000"
                  value={desiredMonthlyIncomeToday}
                  onChange={handleDesiredMonthlyIncomeTodayChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(desiredMonthlyIncomeToday)}
                  onChange={handleDesiredMonthlyIncomeTodayChange}
                  onBlur={(e) => setDesiredMonthlyIncomeToday(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Inflation Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="inflationRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Expected Annual Inflation Rate: <span className="text-red-600">{inflationRate.toFixed(1)}%</span>
                </label>
                <input
                  type="range"
                  id="inflationRate"
                  min="2"
                  max="10"
                  step="0.1"
                  value={inflationRate}
                  onChange={handleInflationRateChange}
                  className="w-full h-2 bg-gradient-to-r from-red-300 to-red-500 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <input
                  type="number"
                  value={inflationRate}
                  onChange={handleInflationRateChange}
                  onBlur={(e) => setInflationRate(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-red-500 focus:border-red-500 transition-all"
                  step="0.1"
                />
              </motion.div>

              {/* Expected Return Before Retirement */}
              <motion.div variants={itemVariants}>
                <label htmlFor="expectedReturnBeforeRetirement" className="block text-lg font-semibold text-gray-700 mb-2">
                  Expected Return (Before Retirement): <span className="text-green-600">{expectedReturnBeforeRetirement.toFixed(1)}%</span>
                </label>
                <input
                  type="range"
                  id="expectedReturnBeforeRetirement"
                  min="5"
                  max="15"
                  step="0.1"
                  value={expectedReturnBeforeRetirement}
                  onChange={handleExpectedReturnBeforeRetirementChange}
                  className="w-full h-2 bg-gradient-to-r from-green-300 to-green-500 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <input
                  type="number"
                  value={expectedReturnBeforeRetirement}
                  onChange={handleExpectedReturnBeforeRetirementChange}
                  onBlur={(e) => setExpectedReturnBeforeRetirement(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-green-500 focus:border-green-500 transition-all"
                  step="0.1"
                />
              </motion.div>

              {/* Expected Return During Retirement */}
              <motion.div variants={itemVariants}>
                <label htmlFor="expectedReturnDuringRetirement" className="block text-lg font-semibold text-gray-700 mb-2">
                  Expected Return (During Retirement): <span className="text-yellow-600">{expectedReturnDuringRetirement.toFixed(1)}%</span>
                </label>
                <input
                  type="range"
                  id="expectedReturnDuringRetirement"
                  min="4"
                  max="10"
                  step="0.1"
                  value={expectedReturnDuringRetirement}
                  onChange={handleExpectedReturnDuringRetirementChange}
                  className="w-full h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-lg appearance-none cursor-pointer accent-yellow-600"
                />
                <input
                  type="number"
                  value={expectedReturnDuringRetirement}
                  onChange={handleExpectedReturnDuringRetirementChange}
                  onBlur={(e) => setExpectedReturnDuringRetirement(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                  step="0.1"
                />
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Retirement Plan</h3>
              <motion.div
                key={calculations.requiredMonthlySavings} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
              >
                {formatCurrency(calculations.requiredMonthlySavings)}
              </motion.div>
              <p className="text-xl text-blue-100 mb-8">Required Monthly Savings</p>

              <div className="w-full space-y-4 text-lg">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Projected Retirement Corpus</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.requiredCorpus)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Wallet className="w-5 h-5" /> Total Invested by Retirement</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalInvestedByRetirement)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Total Interest Earned</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalInterestEarnedByRetirement)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Clock className="w-5 h-5" /> Years to Retirement</span>
                  <span className="font-bold text-white">{calculations.yearsToRetirement} Years</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Coins className="w-5 h-5" /> Monthly Income (in Retirement)</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.actualMonthlyIncomeFromCorpus)}</span>
                </motion.div>
                 <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Calendar className="w-5 h-5" /> Corpus Supports for</span>
                  <span className="font-bold text-white">{calculations.postRetirementYearsSupported} Years</span>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Retirement Savings Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Retirement Savings Calculator is a sophisticated financial planning tool designed to help you project your financial needs for a comfortable retirement. It goes beyond simple calculations by factoring in crucial elements like your current age, desired retirement age, existing savings, the monthly income you'll need in retirement (adjusted for future inflation), and your expected investment returns both before and during retirement. This calculator is invaluable for understanding the gap between your current savings trajectory and your retirement goals, providing a clear estimate of the monthly or annual savings required to build your ideal retirement corpus. It empowers you to take control of your financial future and plan for your golden years with confidence.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Retirement Savings Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Your Current Age:</strong> Start by inputting your current age. This helps determine the number of years you have left to save.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Desired Retirement Age:</strong> Specify the age at which you plan to retire. The difference between your current and retirement age is your accumulation period.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Current Retirement Savings:</strong> Add the total amount you have already saved towards retirement in various instruments like EPF, PPF, mutual funds, etc.</motion.li>
              <motion.li variants={itemVariants}><strong>Define Desired Monthly Income (Today's Value):</strong> State the monthly income you believe you'll need in retirement, expressed in today's money. The calculator will adjust this for inflation.</motion.li>
              <motion.li variants={itemVariants}><strong>Estimate Inflation Rate:</strong> Provide an expected annual inflation rate. This is crucial for accurately projecting your future expenses and the required corpus.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Expected Return (Before Retirement):</strong> Input the average annual rate of return you anticipate on your investments during your working years.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Expected Return (During Retirement):</strong> Provide the average annual rate of return you expect your corpus to generate after you retire, as it will continue to be invested.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Plan:</strong> The calculator will instantly display your projected retirement corpus, the total amount you'll invest, the total interest earned, and, most importantly, the monthly savings required to achieve your goal. It also shows how many years your corpus can sustain your desired income.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Retirement Savings Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Set Realistic Goals:</strong> Helps you define a clear, achievable financial target for retirement, moving beyond vague aspirations to concrete numbers.</motion.li>
              <motion.li variants={itemVariants}><strong>Early Planning Advantage:</strong> Demonstrates the immense power of compounding over time, motivating you to start saving early and consistently to build a substantial corpus.</motion.li>
              <motion.li variants={itemVariants}><strong>Inflation Adjustment:</strong> Crucially factors in inflation, ensuring your projected retirement income will maintain its purchasing power in the future, providing a realistic financial outlook.</motion.li>
              <motion.li variants={itemVariants}><strong>Identify Savings Gap:</strong> Clearly shows the difference between your current savings trajectory and your desired retirement corpus, highlighting if and how much more you need to save.</motion.li>
              <motion.li variants={itemVariants}><strong>Informed Investment Decisions:</strong> Allows you to experiment with different investment returns to understand their impact on your savings goals, guiding you towards suitable investment strategies.</motion.li>
              <motion.li variants={itemVariants}><strong>Peace of Mind:</strong> Provides clarity and confidence about your financial future, reducing anxiety about retirement and empowering you to make proactive adjustments to your plan.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Retirement Savings Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Current Age:</strong> Your age today, used to determine the years remaining until retirement.</motion.p>
              <motion.p variants={itemVariants}><strong>Retirement Age:</strong> The age at which you plan to stop working and begin drawing from your retirement savings.</motion.p>
              <motion.p variants={itemVariants}><strong>Current Savings:</strong> The total amount of money you have already accumulated specifically for retirement.</motion.p>
              <motion.p variants={itemVariants}><strong>Desired Monthly Income (Today's Value):</strong> The amount of money you would need each month in retirement, expressed in current purchasing power. This is adjusted for inflation to a future value.</motion.p>
              <motion.p variants={itemVariants}><strong>Inflation Rate:</strong> The rate at which the cost of goods and services increases over time, reducing the purchasing power of money. Essential to factor into long-term planning.</motion.p>
              <motion.p variants={itemVariants}><strong>Expected Return (Before Retirement):</strong> The average annual growth rate you anticipate on your investments during your working years, while you are actively saving.</motion.p>
              <motion.p variants={itemVariants}><strong>Expected Return (During Retirement):</strong> The average annual growth rate you expect your retirement corpus to generate even after you retire, as it continues to be invested to provide income.</motion.p>
              <motion.p variants={itemVariants}><strong>Retirement Corpus:</strong> The total lump sum amount of money you need to accumulate by your retirement age to fund your desired lifestyle throughout your retirement years.</motion.p>
              <motion.p variants={itemVariants}><strong>Monthly/Annual Savings Required:</strong> The amount you need to save regularly (monthly or annually) from now until retirement to achieve your target corpus.</motion.p>
              <motion.p variants={itemVariants}><strong>Post-Retirement Years Supported:</strong> The estimated number of years your accumulated corpus can sustain your desired monthly income, based on the expected return during retirement and inflation.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Effective Retirement Planning
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForRetirementPlanning.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Retirement Planning?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Build Your Retirement Nest Egg?
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Start planning your retirement with BanksCart. Explore tailored investment solutions
              and expert guidance to ensure a secure and comfortable future.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Retirement Planning Solutions"
                  openApplyModal={openApplyModal}
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Get Expert Retirement Advice
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Get Expert Retirement Advice</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default RetirementSavingsCalculatorPage;
