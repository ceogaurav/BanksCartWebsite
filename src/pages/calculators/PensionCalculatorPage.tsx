import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank, Landmark,
  HandCoins, CreditCard, Clock, Hourglass, PiggyBank as SavingsIcon,
  User, CalendarCheck, Briefcase as JobIcon, TrendingUp as GrowthIcon, Award as PensionAward // Icons for Pension
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


// --- Main Pension Calculator Page Component ---
interface PensionCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const PensionCalculatorPage: React.FC<PensionCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [currentAnnualSalary, setCurrentAnnualSalary] = useState<number>(800000); // INR
  const [currentAge, setCurrentAge] = useState<number>(30); // Years
  const [retirementAge, setRetirementAge] = useState<number>(60); // Years
  const [annualSalaryGrowthRate, setAnnualSalaryGrowthRate] = useState<number>(5); // %
  const [pensionPayoutPercentage, setPensionPayoutPercentage] = useState<number>(50); // % of final salary

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for inputs
  const handleCurrentAnnualSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setCurrentAnnualSalary(Number(value));
  };
  const handleCurrentAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentAge(Number(e.target.value));
  };
  const handleRetirementAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRetirementAge(Number(e.target.value));
  };
  const handleAnnualSalaryGrowthRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnualSalaryGrowthRate(Number(e.target.value));
  };
  const handlePensionPayoutPercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPensionPayoutPercentage(Number(e.target.value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Pension Calculations
  const calculations = useMemo(() => {
    const yearsUntilRetirement = retirementAge - currentAge;
    let finalAnnualSalary = currentAnnualSalary;

    if (yearsUntilRetirement > 0) {
      finalAnnualSalary = currentAnnualSalary * Math.pow(1 + annualSalaryGrowthRate / 100, yearsUntilRetirement);
    }

    const estimatedAnnualPension = finalAnnualSalary * (pensionPayoutPercentage / 100);
    const estimatedMonthlyPension = estimatedAnnualPension / 12;

    return {
      yearsUntilRetirement: Math.max(0, yearsUntilRetirement),
      finalAnnualSalary: Math.round(finalAnnualSalary),
      estimatedAnnualPension: Math.round(estimatedAnnualPension),
      estimatedMonthlyPension: Math.round(estimatedMonthlyPension),
    };
  }, [currentAnnualSalary, currentAge, retirementAge, annualSalaryGrowthRate, pensionPayoutPercentage]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Pension Calculator?",
      answer: "A Pension Calculator is a financial tool designed to estimate your potential pension payouts based on various inputs like your current salary, age, retirement age, and expected salary growth. It helps you project your future income in retirement, allowing for better financial planning and goal setting."
    },
    {
      question: "How does this calculator estimate pension payouts?",
      answer: "This calculator uses a simplified model, common in 'defined benefit' pension schemes, where your pension is a percentage of your final salary. It first projects your salary at retirement age, accounting for annual growth, and then applies the specified pension payout percentage to that projected final salary to estimate your annual and monthly pension."
    },
    {
      question: "What is 'Final Salary' in pension calculations?",
      answer: "Final Salary, in the context of many pension schemes, refers to your salary just before retirement, or an average of your salary over your last few years of service. It's a key component in calculating defined benefit pensions, where the payout is directly linked to your earnings history."
    },
    {
      question: "What is the difference between Defined Benefit and Defined Contribution pensions?",
      answer: "<ul><li><strong>Defined Benefit (DB) Pension:</strong> The employer guarantees a specific pension amount or formula (e.g., a percentage of final salary) upon retirement. The employer bears the investment risk.</li><li><strong>Defined Contribution (DC) Pension:</strong> The employer and/or employee contribute regularly to an individual account (e.g., EPF, NPS, 401k). The retirement income depends on the total contributions and investment performance. The employee bears the investment risk. This calculator primarily models a DB-like scenario.</li></ul>"
    },
    {
      question: "Why is early pension planning important?",
      answer: "Starting early allows your investments and contributions more time to grow through compounding. Even small, consistent contributions over a long period can accumulate into a substantial retirement corpus, significantly easing financial worries in your later years."
    },
    {
      question: "Does this calculator consider inflation?",
      answer: "This calculator projects your *nominal* future salary and pension. It does not explicitly adjust the *purchasing power* of that pension for future inflation. For a complete picture, you should also consider using an inflation calculator to understand what your estimated pension will be worth in today's money."
    },
    {
      question: "What is a 'Vesting Period'?",
      answer: "A vesting period is the amount of time an employee must work for an employer to become fully entitled to employer-provided benefits, such as pension contributions. If an employee leaves before the vesting period is complete, they may forfeit some or all of the employer's contributions to their pension."
    }
  ];

  const tipsForPensionPlanning = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Start saving and planning for retirement as early as possible to leverage compounding." },
    { icon: <PiggyBank className="w-6 h-6 text-blue-500" />, text: "Diversify your retirement investments across different asset classes to manage risk." },
    { icon: <Lightbulb className="w-6 h-6 text-yellow-500" />, text: "Regularly review your pension plan and adjust contributions or strategies as your life circumstances change." },
    { icon: <TrendingUp className="w-6 h-6 text-purple-500" />, text: "Factor in potential inflation when estimating your future retirement expenses and income needs." },
    { icon: <Wallet className="w-6 h-6 text-orange-500" />, text: "Understand the type of pension scheme you are part of (defined benefit vs. defined contribution) and its implications." },
    { icon: <Clock className="w-6 h-6 text-red-500" />, text: "Consider seeking professional financial advice for a personalized retirement plan." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Personalized Retirement Solutions", description: "Access tailored retirement planning tools and strategies to secure your future." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Diverse Investment Options", description: "Explore a wide range of investment products, including mutual funds and fixed deposits, for your retirement corpus." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Expert Financial Advisory", description: "Connect with certified financial advisors for unbiased guidance on pension planning and wealth management." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Comprehensive Financial Tools", description: "Utilize a full suite of financial calculators and resources to make informed decisions about your long-term goals." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-lime-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-emerald-600 to-lime-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Plan Your Golden Years with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white">
              Pension Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-emerald-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Estimate your future pension payouts based on your salary, age, and retirement age.
            Secure your financial future with confidence.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Retirement & Pension Planning"
                openApplyModal={openApplyModal}
                className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Retirement Planning Advice
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Pension Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-emerald-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-lime-600 to-emerald-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-lime-500" /> Pension Payout Estimator
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <JobIcon className="w-6 h-6 mr-2 text-emerald-600" /> Your Details
              </h3>

              {/* Current Annual Salary */}
              <motion.div variants={itemVariants}>
                <label htmlFor="currentAnnualSalary" className="block text-lg font-semibold text-gray-700 mb-2">
                  Current Annual Salary: <span className="text-blue-600">{formatCurrency(currentAnnualSalary)}</span>
                </label>
                <input
                  type="range"
                  id="currentAnnualSalary"
                  min="100000"
                  max="5000000"
                  step="50000"
                  value={currentAnnualSalary}
                  onChange={handleCurrentAnnualSalaryChange}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(currentAnnualSalary)}
                  onChange={handleCurrentAnnualSalaryChange}
                  onBlur={(e) => setCurrentAnnualSalary(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Current Age */}
              <motion.div variants={itemVariants}>
                <label htmlFor="currentAge" className="block text-lg font-semibold text-gray-700 mb-2">
                  Current Age: <span className="text-teal-600">{currentAge} Years</span>
                </label>
                <input
                  type="range"
                  id="currentAge"
                  min="18"
                  max="65"
                  step="1"
                  value={currentAge}
                  onChange={handleCurrentAgeChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="number"
                  value={currentAge}
                  onChange={handleCurrentAgeChange}
                  onBlur={(e) => setCurrentAge(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  min="18"
                  max="65"
                />
              </motion.div>

              {/* Retirement Age */}
              <motion.div variants={itemVariants}>
                <label htmlFor="retirementAge" className="block text-lg font-semibold text-gray-700 mb-2">
                  Desired Retirement Age: <span className="text-orange-600">{retirementAge} Years</span>
                </label>
                <input
                  type="range"
                  id="retirementAge"
                  min={currentAge + 1} // Ensure retirement age is after current age
                  max="70"
                  step="1"
                  value={retirementAge}
                  onChange={handleRetirementAgeChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="number"
                  value={retirementAge}
                  onChange={handleRetirementAgeChange}
                  onBlur={(e) => setRetirementAge(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  min={currentAge + 1}
                  max="70"
                />
              </motion.div>

              {/* Annual Salary Growth Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="annualSalaryGrowthRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Expected Annual Salary Growth Rate (%): <span className="text-purple-600">{annualSalaryGrowthRate}%</span>
                </label>
                <input
                  type="range"
                  id="annualSalaryGrowthRate"
                  min="0"
                  max="10"
                  step="0.1"
                  value={annualSalaryGrowthRate}
                  onChange={handleAnnualSalaryGrowthRateChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="number"
                  value={annualSalaryGrowthRate}
                  onChange={handleAnnualSalaryGrowthRateChange}
                  onBlur={(e) => setAnnualSalaryGrowthRate(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  step="0.1"
                />
              </motion.div>

              {/* Pension Payout Percentage */}
              <motion.div variants={itemVariants}>
                <label htmlFor="pensionPayoutPercentage" className="block text-lg font-semibold text-gray-700 mb-2">
                  Pension Payout (% of Final Salary): <span className="text-pink-600">{pensionPayoutPercentage}%</span>
                </label>
                <input
                  type="range"
                  id="pensionPayoutPercentage"
                  min="10"
                  max="100"
                  step="1"
                  value={pensionPayoutPercentage}
                  onChange={handlePensionPayoutPercentageChange}
                  className="w-full h-2 bg-gradient-to-r from-pink-300 to-pink-500 rounded-lg appearance-none cursor-pointer accent-pink-600"
                />
                <input
                  type="number"
                  value={pensionPayoutPercentage}
                  onChange={handlePensionPayoutPercentageChange}
                  onBlur={(e) => setPensionPayoutPercentage(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-pink-500 focus:border-pink-500 transition-all"
                  min="10"
                  max="100"
                />
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-emerald-500 to-lime-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Estimated Pension</h3>

              {/* Estimated Annual Pension */}
              <p className="text-xl text-emerald-100 mb-4">Estimated Annual Pension:</p>
              <motion.div
                key={calculations.estimatedAnnualPension} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white drop-shadow-lg"
              >
                {formatCurrency(calculations.estimatedAnnualPension)}
              </motion.div>

              {/* Estimated Monthly Pension */}
              <p className="text-xl text-emerald-100 mb-4 mt-8">Estimated Monthly Pension:</p>
              <motion.div
                key={calculations.estimatedMonthlyPension} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white drop-shadow-lg"
              >
                {formatCurrency(calculations.estimatedMonthlyPension)}
              </motion.div>

              <div className="w-full space-y-4 text-lg mt-8">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-emerald-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><User className="w-5 h-5" /> Current Age</span>
                  <span className="font-bold text-white">{currentAge} Years</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-emerald-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><CalendarCheck className="w-5 h-5" /> Retirement Age</span>
                  <span className="font-bold text-white">{retirementAge} Years</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-emerald-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Clock className="w-5 h-5" /> Years Until Retirement</span>
                  <span className="font-bold text-white">{calculations.yearsUntilRetirement} Years</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-emerald-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><DollarSign className="w-5 h-5" /> Projected Final Annual Salary</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.finalAnnualSalary)}</span>
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
          `}</style>
        </motion.div>

        {/* Informational Sections */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg mt-6 space-y-10">
          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Pension Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Pension Calculator is a vital financial planning tool designed to help you estimate the income you might receive from your pension once you retire. It takes into account key factors such as your current salary, age, desired retirement age, and expected salary growth to project your potential pension payouts. While actual pension amounts can vary based on specific scheme rules, contribution history, and investment performance, this calculator provides a valuable estimate, enabling you to set realistic retirement goals and adjust your savings strategy accordingly. It's an essential first step in visualizing your financial security in your golden years.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Pension Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Current Annual Salary:</strong> Input your current gross annual salary. This forms the base for projecting your future earnings.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Current Age:</strong> Provide your current age in years.</motion.li>
              <motion.li variants={itemVariants}><strong>Choose Desired Retirement Age:</strong> Specify the age at which you plan to retire and start receiving pension payouts.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Expected Annual Salary Growth Rate (%):</strong> Estimate the average percentage by which your salary is likely to increase each year until retirement. This helps in projecting your 'final salary'.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Pension Payout (% of Final Salary):</strong> This represents the percentage of your projected final salary that you expect to receive as an annual pension. This is a common feature in defined benefit pension plans or can be an aspirational target for your retirement income.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Estimated Pension:</strong> The calculator will instantly display your Estimated Annual Pension and Estimated Monthly Pension, along with your projected final annual salary at retirement. This gives you a clear picture of your potential retirement income.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Pension Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Realistic Retirement Planning:</strong> Helps you set achievable retirement goals by providing a tangible estimate of your future pension income.</motion.li>
              <motion.li variants={itemVariants}><strong>Identify Income Gaps:</strong> Allows you to compare your estimated pension with your desired retirement expenses, highlighting any potential income shortfalls.</motion.li>
              <motion.li variants={itemVariants}><strong>Motivate Savings:</strong> Seeing a projected pension can motivate you to save more or adjust your investment strategy to bridge any gaps.</motion.li>
              <motion.li variants={itemVariants}><strong>Informed Decision-Making:</strong> Provides crucial data for making decisions about career changes, early retirement, or supplementary retirement savings.</motion.li>
              <motion.li variants={itemVariants}><strong>Understand Long-Term Impact:</strong> Illustrates how factors like salary growth and retirement age significantly influence your final pension amount.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Pension Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Pension:</strong> A regular payment made during a person's retirement from an investment fund to which that person or their employer has contributed during their working life.</motion.p>
              <motion.p variants={itemVariants}><strong>Retirement Age:</strong> The age at which an individual chooses to stop full-time employment and begin receiving retirement benefits or pension payouts.</motion.p>
              <motion.p variants={itemVariants}><strong>Final Salary:</strong> The salary earned by an employee just before retirement, often used as a basis for calculating defined benefit pensions.</motion.p>
              <motion.p variants={itemVariants}><strong>Defined Benefit (DB) Pension:</strong> A type of pension plan where the employer guarantees a specific retirement benefit amount for each participant, typically based on a formula involving salary and years of service.</motion.p>
              <motion.p variants={itemVariants}><strong>Defined Contribution (DC) Pension:</strong> A type of retirement plan where contributions are made by the employee and/or employer into an individual account, and the final retirement benefit depends on the total contributions and investment performance (e.g., EPF, NPS, 401k).</motion.p>
              <motion.p variants={itemVariants}><strong>Vesting Period:</strong> The amount of time an employee must work for an employer to become fully entitled to employer-provided benefits, such as pension contributions.</motion.p>
              <motion.p variants={itemVariants}><strong>Compounding:</strong> The process where the earnings from an investment are reinvested to generate additional earnings, leading to exponential growth over time.</motion.p>
              <motion.p variants={itemVariants}><strong>Annuity:</strong> A financial product that pays out a fixed stream of payments to an individual over a specified period, often used as an income stream for retirees.</motion.p>
              <motion.p variants={itemVariants}><strong>Inflation:</strong> The rate at which the general level of prices for goods and services is rising, and consequently, the purchasing power of currency is falling.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Effective Pension Planning
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForPensionPlanning.map((tip, index) => (
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
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-emerald-50 to-lime-50 border border-emerald-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-emerald-600 to-lime-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Build Your Secure Retirement?
            </motion.h2>
            <motion.p
              className="text-lg text-emerald-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart provides comprehensive tools, expert advice, and tailored financial solutions
              to help you achieve your retirement dreams.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Retirement Planning & Advisory"
                  openApplyModal={openApplyModal}
                  className="bg-white text-emerald-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Get Personalized Retirement Advice
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Get Personalized Retirement Advice</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default PensionCalculatorPage;
