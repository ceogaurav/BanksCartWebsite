import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank,
  HandCoins, CreditCard, Clock, Hourglass, PiggyBank as SavingsIcon,
  User, CalendarCheck, Briefcase as JobIcon, TrendingUp as GrowthIcon, ShieldCheck, Handshake, Landmark // Icons for Social Security
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


// --- Main Social Security Calculator Page Component ---
interface SocialSecurityCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const SocialSecurityCalculatorPage: React.FC<SocialSecurityCalculatorPagePageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [currentAnnualIncome, setCurrentAnnualIncome] = useState<number>(1000000); // INR
  const [currentAge, setCurrentAge] = useState<number>(35); // Years
  const [retirementAge, setRetirementAge] = useState<number>(65); // Years
  const [annualIncomeGrowthRate, setAnnualIncomeGrowthRate] = useState<number>(3); // %
  // Simplified benefit percentage - actual SS is more complex (AIME, bend points)
  // For a basic calculator, we can assume a general percentage of average or final income.
  // Let's use a simplified "replacement rate" for demonstration.
  const [benefitReplacementRate, setBenefitReplacementRate] = useState<number>(30); // % of projected final income

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for inputs
  const handleCurrentAnnualIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setCurrentAnnualIncome(Number(value));
  };
  const handleCurrentAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentAge(Number(e.target.value));
  };
  const handleRetirementAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRetirementAge(Number(e.target.value));
  };
  const handleAnnualIncomeGrowthRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnualIncomeGrowthRate(Number(e.target.value));
  };
  const handleBenefitReplacementRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBenefitReplacementRate(Number(e.target.value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Social Security Calculations
  const calculations = useMemo(() => {
    const yearsToRetirement = retirementAge - currentAge;
    let projectedFinalAnnualIncome = currentAnnualIncome;

    if (yearsToRetirement > 0) {
      projectedFinalAnnualIncome = currentAnnualIncome * Math.pow(1 + annualIncomeGrowthRate / 100, yearsToRetirement);
    }

    // This is a highly simplified estimation. Actual Social Security benefits
    // depend on Average Indexed Monthly Earnings (AIME) over 35 highest-earning years
    // and a progressive benefit formula with "bend points".
    // For this calculator, we'll use a direct replacement rate of the projected final income.
    const estimatedAnnualBenefit = projectedFinalAnnualIncome * (benefitReplacementRate / 100);
    const estimatedMonthlyBenefit = estimatedAnnualBenefit / 12;

    return {
      yearsToRetirement: Math.max(0, yearsToRetirement),
      projectedFinalAnnualIncome: Math.round(projectedFinalAnnualIncome),
      estimatedAnnualBenefit: Math.round(estimatedAnnualBenefit),
      estimatedMonthlyBenefit: Math.round(estimatedMonthlyBenefit),
    };
  }, [currentAnnualIncome, currentAge, retirementAge, annualIncomeGrowthRate, benefitReplacementRate]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Social Security Calculator?",
      answer: "A Social Security Calculator is a tool designed to estimate your future Social Security benefits based on your earnings history and planned retirement age. While actual Social Security systems (like those in the US or similar government-backed pension schemes in other countries) have complex formulas, this calculator provides a simplified projection to help you with retirement planning."
    },
    {
      question: "How are Social Security benefits typically calculated?",
      answer: "In many Social Security systems, benefits are based on your lifetime earnings, specifically your highest earning years (e.g., 35 years in the US). These earnings are 'indexed' to account for changes in average wages over time. A formula then applies different percentages to different portions of your 'Average Indexed Monthly Earnings' (AIME) to determine your Primary Insurance Amount (PIA), which is your full retirement age benefit. Our calculator uses a simplified percentage of your projected final income for estimation."
    },
    {
      question: "What is 'Full Retirement Age' (FRA)?",
      answer: "Full Retirement Age (FRA) is the age at which you are entitled to receive 100% of your Social Security benefits. This age varies depending on your birth year. Claiming benefits before your FRA results in a permanent reduction, while delaying benefits past your FRA can result in increased benefits up to a certain age."
    },
    {
      question: "Can I receive benefits if I retire early or delay retirement?",
      answer: "Yes, you can typically start receiving benefits as early as age 62 (in the US, for example), but your monthly benefit will be permanently reduced. Conversely, if you delay claiming benefits past your Full Retirement Age (up to age 70), your monthly benefit will increase for each month you delay. This calculator provides a general estimate for your chosen retirement age."
    },
    {
      question: "Does this calculator account for inflation?",
      answer: "This calculator projects your *nominal* future income and estimated benefits. It does not explicitly adjust the *purchasing power* of those benefits for future inflation. For a complete picture of what your future benefits will be worth in today's money, you should also consider using an inflation calculator."
    },
    {
      question: "What about spousal or survivor benefits?",
      answer: "This calculator focuses solely on individual benefits based on your own earnings record. Many Social Security systems also offer spousal benefits (based on a spouse's record), survivor benefits (for widows, widowers, or children), and disability benefits. These are not included in this simplified calculator's estimation."
    },
    {
      question: "Why is it important to estimate my Social Security benefits?",
      answer: "Estimating your benefits is crucial for retirement planning. Social Security is often a foundational part of retirement income, but it's rarely enough on its own. Knowing your estimated benefit helps you:<ul><li>Determine how much additional savings you'll need.</li><li>Set realistic retirement income goals.</li><li>Understand the impact of different retirement ages on your benefits.</li><li>Make informed decisions about your overall financial strategy.</li></ul>"
    }
  ];

  const tipsForSocialSecurityPlanning = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Understand your Full Retirement Age (FRA) to maximize your benefits." },
    { icon: <PiggyBank className="w-6 h-6 text-blue-500" />, text: "Social Security is a foundation, not your sole retirement income; plan for additional savings." },
    { icon: <Lightbulb className="w-6 h-6 text-yellow-500" />, text: "Consider delaying benefits past FRA if you can, to receive a higher monthly payout." },
    { icon: <TrendingUp className="w-6 h-6 text-purple-500" />, text: "Work at least 35 years if possible, as benefits are based on your highest earning years." },
    { icon: <Wallet className="w-6 h-6 text-orange-500" />, text: "Factor in potential inflation when assessing the future purchasing power of your benefits." },
    { icon: <Clock className="w-6 h-6 text-red-500" />, text: "Regularly review your earnings record for accuracy with the Social Security administration." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Holistic Retirement Planning", description: "Access tools and expert advice to build a comprehensive retirement strategy, integrating Social Security with other savings." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Diverse Investment Options", description: "Explore a wide range of investment products, including mutual funds and fixed deposits, to supplement your retirement income." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Expert Financial Advisory", description: "Connect with certified financial advisors for unbiased guidance on maximizing your retirement income and managing your wealth." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Long-Term Wealth Management", description: "Get support for long-term wealth creation strategies that ensure financial security throughout your retirement." },
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
            Estimate Your Future with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Social Security Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-indigo-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Project your potential Social Security benefits based on your income and retirement age.
            Plan for a secure and comfortable retirement.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Retirement & Social Security Planning"
                openApplyModal={openApplyModal}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Retirement Planning Advice
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Social Security Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-indigo-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-blue-500" /> Social Security Benefit Estimator
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <User className="w-6 h-6 mr-2 text-indigo-600" /> Your Profile
              </h3>

              {/* Current Annual Income */}
              <motion.div variants={itemVariants}>
                <label htmlFor="currentAnnualIncome" className="block text-lg font-semibold text-gray-700 mb-2">
                  Current Annual Income: <span className="text-blue-600">{formatCurrency(currentAnnualIncome)}</span>
                </label>
                <input
                  type="range"
                  id="currentAnnualIncome"
                  min="100000"
                  max="5000000"
                  step="50000"
                  value={currentAnnualIncome}
                  onChange={handleCurrentAnnualIncomeChange}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(currentAnnualIncome)}
                  onChange={handleCurrentAnnualIncomeChange}
                  onBlur={(e) => setCurrentAnnualIncome(Number(e.target.value.replace(/,/g, '')))}
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

              {/* Annual Income Growth Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="annualIncomeGrowthRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Expected Annual Income Growth Rate (%): <span className="text-purple-600">{annualIncomeGrowthRate}%</span>
                </label>
                <input
                  type="range"
                  id="annualIncomeGrowthRate"
                  min="0"
                  max="10"
                  step="0.1"
                  value={annualIncomeGrowthRate}
                  onChange={handleAnnualIncomeGrowthRateChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="number"
                  value={annualIncomeGrowthRate}
                  onChange={handleAnnualIncomeGrowthRateChange}
                  onBlur={(e) => setAnnualIncomeGrowthRate(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  step="0.1"
                />
              </motion.div>

              {/* Benefit Replacement Rate (Simplified) */}
              <motion.div variants={itemVariants}>
                <label htmlFor="benefitReplacementRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Estimated Benefit (% of Projected Final Income): <span className="text-pink-600">{benefitReplacementRate}%</span>
                </label>
                <input
                  type="range"
                  id="benefitReplacementRate"
                  min="10"
                  max="60"
                  step="1"
                  value={benefitReplacementRate}
                  onChange={handleBenefitReplacementRateChange}
                  className="w-full h-2 bg-gradient-to-r from-pink-300 to-pink-500 rounded-lg appearance-none cursor-pointer accent-pink-600"
                />
                <input
                  type="number"
                  value={benefitReplacementRate}
                  onChange={handleBenefitReplacementRateChange}
                  onBlur={(e) => setBenefitReplacementRate(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-pink-500 focus:border-pink-500 transition-all"
                  min="10"
                  max="60"
                />
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-indigo-500 to-blue-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Estimated Social Security Benefit</h3>

              {/* Estimated Annual Benefit */}
              <p className="text-xl text-indigo-100 mb-4">Estimated Annual Benefit:</p>
              <motion.div
                key={calculations.estimatedAnnualBenefit} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
              >
                {formatCurrency(calculations.estimatedAnnualBenefit)}
              </motion.div>

              {/* Estimated Monthly Benefit */}
              <p className="text-xl text-indigo-100 mb-4 mt-8">Estimated Monthly Benefit:</p>
              <motion.div
                key={calculations.estimatedMonthlyBenefit} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
              >
                {formatCurrency(calculations.estimatedMonthlyBenefit)}
              </motion.div>

              <div className="w-full space-y-4 text-lg mt-8">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><User className="w-5 h-5" /> Current Age</span>
                  <span className="font-bold text-white">{currentAge} Years</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><CalendarCheck className="w-5 h-5" /> Retirement Age</span>
                  <span className="font-bold text-white">{retirementAge} Years</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Clock className="w-5 h-5" /> Years Until Retirement</span>
                  <span className="font-bold text-white">{calculations.yearsToRetirement} Years</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><DollarSign className="w-5 h-5" /> Projected Final Annual Income</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.projectedFinalAnnualIncome)}</span>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Social Security Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Social Security Calculator is a financial tool designed to help individuals estimate the amount of benefits they might receive from a government-sponsored social security or pension system upon retirement. While actual calculations by official agencies are complex and based on detailed earnings records, this calculator provides a simplified projection based on your current income, age, and desired retirement age. It serves as a valuable starting point for retirement planning, allowing you to understand how Social Security might contribute to your overall financial security in your golden years.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Social Security Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Current Annual Income:</strong> Input your current gross annual income. This helps in projecting your future earnings, which are a basis for benefits.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Current Age:</strong> Provide your current age in years.</motion.li>
              <motion.li variants={itemVariants}><strong>Choose Desired Retirement Age:</strong> Specify the age at which you plan to retire and begin receiving your Social Security benefits.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Expected Annual Income Growth Rate (%):</strong> Estimate the average percentage by which your income is likely to increase each year until retirement. This helps project your 'final' or average earning potential.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Estimated Benefit (% of Projected Final Income):</strong> This is a simplified input representing the percentage of your projected final income you expect to receive as an annual benefit. Actual Social Security formulas are more complex, but this provides a useful estimate for planning.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Estimated Benefits:</strong> The calculator will instantly display your Estimated Annual Benefit and Estimated Monthly Benefit, along with your projected final annual income at retirement. This gives you a clear picture of your potential retirement income from Social Security.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Social Security Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Retirement Income Projection:</strong> Provides a foundational estimate of your future government-backed retirement income, crucial for overall financial planning.</motion.li>
              <motion.li variants={itemVariants}><strong>Identify Retirement Gaps:</strong> Helps you compare your estimated Social Security benefits with your desired retirement expenses to identify how much more you need to save.</motion.li>
              <motion.li variants={itemVariants}><strong>Informed Claiming Decisions:</strong> While simplified, it illustrates the impact of different retirement ages on your potential benefits, aiding in decisions about when to claim.</motion.li>
              <motion.li variants={itemVariants}><strong>Motivate Additional Savings:</strong> Seeing the projected benefit can highlight the need for supplementary savings and investments to achieve your desired lifestyle.</motion.li>
              <motion.li variants={itemVariants}><strong>Long-Term Financial Strategy:</strong> Integrates an important income source into your broader financial strategy, ensuring a more comprehensive retirement plan.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Social Security Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Social Security:</strong> A government-administered social insurance program providing retirement, disability, and survivor benefits.</motion.p>
              <motion.p variants={itemVariants}><strong>Retirement Age:</strong> The age at which an individual chooses to stop full-time employment and begin receiving retirement benefits.</motion.p>
              <motion.p variants={itemVariants}><strong>Full Retirement Age (FRA):</strong> The age at which you are entitled to receive 100% of your Social Security benefit, based on your birth year.</motion.p>
              <motion.p variants={itemVariants}><strong>Primary Insurance Amount (PIA):</strong> Your basic Social Security benefit before any adjustments for early or delayed claiming. It's based on your Average Indexed Monthly Earnings (AIME).</motion.p>
              <motion.p variants={itemVariants}><strong>Average Indexed Monthly Earnings (AIME):</strong> Your average monthly earnings over your 35 highest-earning years, adjusted for inflation.</motion.p>
              <motion.p variants={itemVariants}><strong>Cost-of-Living Adjustment (COLA):</strong> Annual adjustments made to Social Security and other federal benefits to account for inflation, ensuring purchasing power is maintained.</motion.p>
              <motion.p variants={itemVariants}><strong>Earnings Record:</strong> The official record of your taxed earnings throughout your working life, maintained by the Social Security administration, used to calculate your benefits.</motion.p>
              <motion.p variants={itemVariants}><strong>Retirement Credits (or Quarters of Coverage):</strong> Units of work credit earned by paying Social Security taxes. You need a certain number of credits to qualify for benefits.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Smart Social Security Planning
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForSocialSecurityPlanning.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Retirement & Financial Needs?
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
              Ready to Secure Your Retirement Future?
            </motion.h2>
            <motion.p
              className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart provides comprehensive tools, expert advice, and tailored financial solutions
              to help you achieve your retirement dreams.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Retirement Planning & Social Security Advisory"
                  openApplyModal={openApplyModal}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
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

export default SocialSecurityCalculatorPage;
