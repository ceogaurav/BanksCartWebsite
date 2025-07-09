import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank,
  HandCoins, CreditCard, Clock, Hourglass, PiggyBank as SavingsIcon, Goal, CalendarCheck, Landmark,
  GraduationCap, BookOpen, User
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


// --- Main College Savings Calculator Page Component ---
interface CollegeSavingsCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const CollegeSavingsCalculatorPage: React.FC<CollegeSavingsCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [currentChildAge, setCurrentChildAge] = useState<number>(0); // In years
  const [collegeStartAge, setCollegeStartAge] = useState<number>(18); // In years
  const [yearsInCollege, setYearsInCollege] = useState<number>(4); // In years
  const [currentAnnualCollegeCost, setCurrentAnnualCollegeCost] = useState<number>(300000); // INR
  const [collegeInflationRate, setCollegeInflationRate] = useState<number>(5); // Annual percentage
  const [currentCollegeSavings, setCurrentCollegeSavings] = useState<number>(0);
  const [annualReturnOnSavings, setAnnualReturnOnSavings] = useState<number>(7); // Annual percentage

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for inputs
  const handleCurrentChildAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentChildAge(Number(e.target.value));
  };

  const handleCollegeStartAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollegeStartAge(Number(e.target.value));
  };

  const handleYearsInCollegeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYearsInCollege(Number(e.target.value));
  };

  const handleCurrentAnnualCollegeCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setCurrentAnnualCollegeCost(Number(value));
  };

  const handleCollegeInflationRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollegeInflationRate(Number(e.target.value));
  };

  const handleCurrentCollegeSavingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setCurrentCollegeSavings(Number(value));
  };

  const handleAnnualReturnOnSavingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnualReturnOnSavings(Number(e.target.value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized College Savings Calculations
  const calculations = useMemo(() => {
    const yearsUntilCollege = Math.max(0, collegeStartAge - currentChildAge);
    const monthlyReturnRate = annualReturnOnSavings / 100 / 12;
    const monthlyInflationRate = collegeInflationRate / 100 / 12; // For compounding annual inflation monthly

    // 1. Calculate Future Annual College Costs for each year of college
    let totalFutureCollegeCost = 0;
    const futureAnnualCosts: { year: number; cost: number }[] = [];

    for (let i = 0; i < yearsInCollege; i++) {
      // Cost for the first year of college (when child is collegeStartAge)
      // then inflated for subsequent years of college
      const costForThisCollegeYear = currentAnnualCollegeCost * Math.pow(1 + collegeInflationRate / 100, yearsUntilCollege + i);
      totalFutureCollegeCost += costForThisCollegeYear;
      futureAnnualCosts.push({ year: i + 1, cost: Math.round(costForThisCollegeYear) });
    }

    // 2. Calculate Future Value of Current Savings
    const futureValueOfCurrentSavings = currentCollegeSavings * Math.pow(1 + annualReturnOnSavings / 100, yearsUntilCollege);

    // 3. Amount still needed from future monthly contributions
    let amountNeededFromContributions = totalFutureCollegeCost - futureValueOfCurrentSavings;
    amountNeededFromContributions = Math.max(0, amountNeededFromContributions); // Cannot be negative

    // 4. Calculate Monthly Savings Needed
    let monthlySavingsNeeded = 0;
    let totalContributions = 0;
    let totalInterestEarned = 0;

    const totalSavingMonths = yearsUntilCollege * 12;

    if (amountNeededFromContributions > 0 && totalSavingMonths > 0) {
      if (monthlyReturnRate === 0) {
        // Simple calculation if no interest
        monthlySavingsNeeded = amountNeededFromContributions / totalSavingMonths;
      } else {
        // PMT formula for Future Value of an Ordinary Annuity
        // PMT = FV * i / ((1 + i)^n - 1)
        monthlySavingsNeeded = (amountNeededFromContributions * monthlyReturnRate) / (Math.pow(1 + monthlyReturnRate, totalSavingMonths) - 1);
      }
      totalContributions = monthlySavingsNeeded * totalSavingMonths;
      totalInterestEarned = totalFutureCollegeCost - currentCollegeSavings - totalContributions;
    } else if (amountNeededFromContributions === 0) {
      // Goal already met or exceeded by current savings
      monthlySavingsNeeded = 0;
      totalContributions = 0;
      totalInterestEarned = totalFutureCollegeCost - currentCollegeSavings;
    }

    // Ensure non-negative and round for display
    monthlySavingsNeeded = Math.round(Math.max(0, monthlySavingsNeeded));
    totalContributions = Math.round(Math.max(0, totalContributions));
    totalInterestEarned = Math.round(Math.max(0, totalInterestEarned));

    return {
      yearsUntilCollege,
      totalFutureCollegeCost: Math.round(totalFutureCollegeCost),
      futureValueOfCurrentSavings: Math.round(futureValueOfCurrentSavings),
      amountNeededFromContributions: Math.round(amountNeededFromContributions),
      monthlySavingsNeeded,
      totalContributions,
      totalInterestEarned,
      futureAnnualCosts,
      isGoalMet: amountNeededFromContributions <= 0
    };
  }, [currentChildAge, collegeStartAge, yearsInCollege, currentAnnualCollegeCost, collegeInflationRate, currentCollegeSavings, annualReturnOnSavings]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a College Savings Calculator?",
      answer: "A College Savings Calculator is a financial planning tool designed to help parents and guardians estimate the future cost of college education and determine how much they need to save regularly to meet that goal. It considers factors like the child's age, expected college start date, college inflation, and investment returns to provide a clear savings roadmap."
    },
    {
      question: "Why is it important to save for college early?",
      answer: "Starting early allows you to leverage the power of compound interest. Your money has more time to grow, meaning you'll need to save less each month from your own pocket to reach your goal. It also gives you flexibility to adjust your savings plan if circumstances change."
    },
    {
      question: "What is 'College Inflation Rate'?",
      answer: "The college inflation rate is the rate at which college tuition and related expenses are expected to increase each year. College costs typically rise faster than general inflation, so it's crucial to factor this into your savings plan to ensure your money keeps pace with future expenses."
    },
    {
      question: "What types of expenses does college cost include?",
      answer: "College costs typically include:<ul><li><strong>Tuition and Fees:</strong> The primary cost for academic instruction.</li><li><strong>Room and Board:</strong> Living expenses if the student resides on campus.</li><li><strong>Books and Supplies:</strong> Costs for textbooks, notebooks, and other academic materials.</li><li><strong>Personal Expenses:</strong> Money for daily needs, entertainment, and miscellaneous items.</li><li><strong>Transportation:</strong> Costs for commuting or traveling to and from college.</li></ul>"
    },
    {
      question: "What are the best ways to save for college in India?",
      answer: "Popular options in India include:<ul><li><strong>Public Provident Fund (PPF):</strong> Tax-efficient, long-term savings with guaranteed returns.</li><li><strong>Sukanya Samriddhi Yojana (SSY):</strong> Specifically designed for a girl child's education and marriage, offering high interest and tax benefits.</li><li><strong>Mutual Funds (Equity/Debt):</strong> Can offer higher returns over the long term but involve market risk.</li><li><strong>Fixed Deposits (FDs):</strong> Lower risk, fixed returns, suitable for shorter-term goals or a portion of savings.</li><li><strong>Child Plans (Insurance):</strong> Combination of insurance and investment, but often have higher charges.</li></ul>"
    },
    {
      question: "What if I can't save the recommended monthly amount?",
      answer: "If the calculated monthly savings are too high, consider:<ul><li>Extending your savings timeline.</li><li>Adjusting your college cost expectations (e.g., considering a less expensive college).</li><li>Exploring options for scholarships or education loans later.</li><li>Finding ways to increase your income or reduce other expenses to free up more funds for college savings.</li></ul>"
    },
    {
      question: "Does this calculator consider scholarships or financial aid?",
      answer: "No, this calculator focuses on the total cost and the savings required from your end. Scholarships, grants, and financial aid are external factors that can reduce the net cost you need to cover, but they are uncertain and should ideally be considered as a bonus rather than a guaranteed part of your core savings plan."
    }
  ];

  const tipsForCollegeSavings = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Start saving as early as possible to maximize compound interest." },
    { icon: <PiggyBank className="w-6 h-6 text-blue-500" />, text: "Automate your monthly contributions to ensure consistency." },
    { icon: <TrendingUp className="w-6 h-6 text-yellow-500" />, text: "Consider diversified investments that align with your risk tolerance and time horizon." },
    { icon: <Lightbulb className="w-6 h-6 text-purple-500" />, text: "Factor in college inflation to ensure your savings keep pace with rising costs." },
    { icon: <BookOpen className="w-6 h-6 text-orange-500" />, text: "Research various savings instruments like SSY, PPF, and mutual funds." },
    { icon: <CalendarCheck className="w-6 h-6 text-red-500" />, text: "Review your savings plan annually and adjust as your child grows and costs change." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Personalized Savings Plans", description: "Access tailored strategies and products to help you achieve your unique college savings goals." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Financial Advisory", description: "Connect with certified financial advisors for personalized guidance on education planning and investments." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Education Loan Solutions", description: "Explore various education loan options to bridge any funding gaps for higher studies." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Investment Opportunities", description: "Discover a range of investment products, including mutual funds and FDs, to grow your college corpus." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Plan for Their Future with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              College Savings Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-indigo-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Estimate how much money you need to save for college education.
            Secure their academic journey with smart planning.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="College Savings Planning Advisory"
                openApplyModal={openApplyModal}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Education Planning Advice
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* College Savings Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-indigo-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 drop-shadow-md">
            <GraduationCap className="inline-block w-9 h-9 mr-3 text-purple-500" /> College Education Fund Planner
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <User className="w-6 h-6 mr-2 text-indigo-600" /> Child & College Details
              </h3>

              {/* Current Age of Child */}
              <motion.div variants={itemVariants}>
                <label htmlFor="currentChildAge" className="block text-lg font-semibold text-gray-700 mb-2">
                  Current Age of Child: <span className="text-blue-600">{currentChildAge} Years</span>
                </label>
                <input
                  type="range"
                  id="currentChildAge"
                  min="0"
                  max="17"
                  step="1"
                  value={currentChildAge}
                  onChange={handleCurrentChildAgeChange}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="number"
                  value={currentChildAge}
                  onChange={handleCurrentChildAgeChange}
                  onBlur={(e) => setCurrentChildAge(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  min="0"
                  max="17"
                />
              </motion.div>

              {/* College Start Age */}
              <motion.div variants={itemVariants}>
                <label htmlFor="collegeStartAge" className="block text-lg font-semibold text-gray-700 mb-2">
                  College Start Age: <span className="text-teal-600">{collegeStartAge} Years</span>
                </label>
                <input
                  type="range"
                  id="collegeStartAge"
                  min="18"
                  max="25"
                  step="1"
                  value={collegeStartAge}
                  onChange={handleCollegeStartAgeChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="number"
                  value={collegeStartAge}
                  onChange={handleCollegeStartAgeChange}
                  onBlur={(e) => setCollegeStartAge(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  min="18"
                  max="25"
                />
              </motion.div>

              {/* Years in College */}
              <motion.div variants={itemVariants}>
                <label htmlFor="yearsInCollege" className="block text-lg font-semibold text-gray-700 mb-2">
                  Years in College: <span className="text-orange-600">{yearsInCollege} Years</span>
                </label>
                <input
                  type="range"
                  id="yearsInCollege"
                  min="1"
                  max="6"
                  step="1"
                  value={yearsInCollege}
                  onChange={handleYearsInCollegeChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="number"
                  value={yearsInCollege}
                  onChange={handleYearsInCollegeChange}
                  onBlur={(e) => setYearsInCollege(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  min="1"
                  max="6"
                />
              </motion.div>

              {/* Current Annual College Cost */}
              <motion.div variants={itemVariants}>
                <label htmlFor="currentAnnualCollegeCost" className="block text-lg font-semibold text-gray-700 mb-2">
                  Current Annual College Cost: <span className="text-red-600">{formatCurrency(currentAnnualCollegeCost)}</span>
                </label>
                <input
                  type="range"
                  id="currentAnnualCollegeCost"
                  min="50000"
                  max="2000000"
                  step="10000"
                  value={currentAnnualCollegeCost}
                  onChange={handleCurrentAnnualCollegeCostChange}
                  className="w-full h-2 bg-gradient-to-r from-red-300 to-red-500 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(currentAnnualCollegeCost)}
                  onChange={handleCurrentAnnualCollegeCostChange}
                  onBlur={(e) => setCurrentAnnualCollegeCost(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-red-500 focus:border-red-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* College Inflation Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="collegeInflationRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Expected Annual College Inflation Rate (%): <span className="text-purple-600">{collegeInflationRate}%</span>
                </label>
                <input
                  type="range"
                  id="collegeInflationRate"
                  min="0"
                  max="10"
                  step="0.1"
                  value={collegeInflationRate}
                  onChange={handleCollegeInflationRateChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="number"
                  value={collegeInflationRate}
                  onChange={handleCollegeInflationRateChange}
                  onBlur={(e) => setCollegeInflationRate(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  step="0.1"
                />
              </motion.div>

              {/* Current College Savings */}
              <motion.div variants={itemVariants}>
                <label htmlFor="currentCollegeSavings" className="block text-lg font-semibold text-gray-700 mb-2">
                  Current College Savings: <span className="text-green-600">{formatCurrency(currentCollegeSavings)}</span>
                </label>
                <input
                  type="range"
                  id="currentCollegeSavings"
                  min="0"
                  max="5000000"
                  step="10000"
                  value={currentCollegeSavings}
                  onChange={handleCurrentCollegeSavingsChange}
                  className="w-full h-2 bg-gradient-to-r from-green-300 to-green-500 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(currentCollegeSavings)}
                  onChange={handleCurrentCollegeSavingsChange}
                  onBlur={(e) => setCurrentCollegeSavings(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-green-500 focus:border-green-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Annual Return on Savings */}
              <motion.div variants={itemVariants}>
                <label htmlFor="annualReturnOnSavings" className="block text-lg font-semibold text-gray-700 mb-2">
                  Expected Annual Return on Savings (%): <span className="text-indigo-600">{annualReturnOnSavings}%</span>
                </label>
                <input
                  type="range"
                  id="annualReturnOnSavings"
                  min="0"
                  max="15"
                  step="0.1"
                  value={annualReturnOnSavings}
                  onChange={handleAnnualReturnOnSavingsChange}
                  className="w-full h-2 bg-gradient-to-r from-indigo-300 to-indigo-500 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <input
                  type="number"
                  value={annualReturnOnSavings}
                  onChange={handleAnnualReturnOnSavingsChange}
                  onBlur={(e) => setAnnualReturnOnSavings(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  step="0.1"
                />
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your College Savings Plan</h3>
              <p className="text-xl text-indigo-100 mb-8">Years Until College: {calculations.yearsUntilCollege} Years</p>

              <motion.div
                key={calculations.monthlySavingsNeeded} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
              >
                {formatCurrency(calculations.monthlySavingsNeeded)} / Month
              </motion.div>
              <p className="text-xl text-indigo-100 mb-8">Required Monthly Savings</p>

              <div className="w-full space-y-4 text-lg mt-8">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><DollarSign className="w-5 h-5" /> Total Future College Cost</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalFutureCollegeCost)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><SavingsIcon className="w-5 h-5" /> Future Value of Current Savings</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.futureValueOfCurrentSavings)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Total Contributions Needed</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalContributions)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Percent className="w-5 h-5" /> Total Interest Earned</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalInterestEarned)}</span>
                </motion.div>
              </div>

              {/* Annual College Cost Breakdown */}
              <h4 className="text-xl font-bold text-white mt-8 mb-4">Projected Annual College Costs:</h4>
              <div className="w-full space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                {calculations.futureAnnualCosts.map((costData, index) => (
                  <motion.div key={index} variants={itemVariants} className="bg-indigo-700/20 p-3 rounded-lg text-sm flex justify-between items-center">
                    <span>Year {costData.year} of College:</span>
                    <span className="font-bold">{formatCurrency(costData.cost)}</span>
                  </motion.div>
                ))}
              </div>

              {/* Message if goal already met */}
              {calculations.isGoalMet && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center text-yellow-200 text-base"
                >
                  <CheckCircle className="inline-block w-5 h-5 mr-2" /> Your current savings are projected to meet or exceed your college goal!
                </motion.div>
              )}
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

            /* Custom Scrollbar for expense categories */
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a College Savings Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A College Savings Calculator is an essential financial planning tool designed to help parents and guardians prepare for the ever-increasing costs of higher education. It goes beyond simply estimating current tuition fees by factoring in crucial variables such as the child's current age, the projected college start age, the duration of the college program, the current annual college costs, and, critically, the expected annual inflation rate for college expenses. Additionally, it considers any existing savings and your anticipated investment returns to calculate the precise monthly amount you need to save to reach your future college funding goal. This comprehensive approach provides a realistic and actionable roadmap for securing your child's academic future.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our College Savings Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Current Age of Child:</strong> Input your child's current age. This helps determine the number of years you have until they start college.</motion.li>
              <motion.li variants={itemVariants}><strong>Set College Start Age:</strong> Specify the age at which you expect your child to begin their college education (e.g., 18 years).</motion.li>
              <motion.li variants={itemVariants}><strong>Define Years in College:</strong> Indicate the total number of years the college program is expected to last (e.g., 4 years for a bachelor's degree).</motion.li>
              <motion.li variants={itemVariants}><strong>Input Current Annual College Cost:</strong> Enter the estimated cost of one year of college tuition and living expenses *today*. This is your baseline.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Expected Annual College Inflation Rate (%):</strong> College costs typically rise faster than general inflation. Input an realistic annual percentage increase for college expenses to get an accurate future cost projection.</motion.li>
              <motion.li variants={itemVariants}><strong>Enter Current College Savings:</strong> If you've already started saving, input the amount you currently have set aside for college. This amount will also grow with interest.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Expected Annual Return on Savings (%):</strong> Estimate the average annual interest rate or investment return you expect to earn on your college savings fund. Higher returns can reduce your required monthly contributions.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Savings Plan:</strong> The calculator will instantly display the Total Future College Cost, the Future Value of your Current Savings, and most importantly, the Monthly Savings Needed to reach your goal. It also shows the breakdown of projected annual college costs and total interest earned.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a College Savings Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Realistic Cost Projection:</strong> Accounts for college inflation, providing a more accurate estimate of future expenses than simply multiplying current costs.</motion.li>
              <motion.li variants={itemVariants}><strong>Clear Savings Target:</strong> Breaks down a large future cost into manageable monthly savings amounts, making the goal less daunting.</motion.li>
              <motion.li variants={itemVariants}><strong>Leverage Compound Interest:</strong> Highlights how starting early and earning returns on your savings can significantly reduce your personal contribution burden.</motion.li>
              <motion.li variants={itemVariants}><strong>Informed Investment Decisions:</strong> Helps you understand the impact of different investment returns on your savings plan, guiding your choice of savings vehicles.</motion.li>
              <motion.li variants={itemVariants}><strong>Reduce Financial Stress:</strong> Having a concrete plan for college funding can alleviate anxiety and provide peace of mind about your child's future education.</motion.li>
              <motion.li variants={itemVariants}><strong>Proactive Planning:</strong> Enables you to identify potential shortfalls early, giving you time to adjust your savings strategy, explore scholarships, or consider education loans.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key College Savings Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>College Cost:</strong> The total expenses associated with attending college, including tuition, fees, room, board, books, supplies, and personal expenses.</motion.p>
              <motion.p variants={itemVariants}><strong>College Inflation Rate:</strong> The annual rate at which the cost of college education is expected to increase. This is typically higher than general inflation.</motion.p>
              <motion.p variants={itemVariants}><strong>Future Value:</strong> The value of an asset or cash at a specified date in the future, considering a given rate of return or inflation.</motion.p>
              <motion.p variants={itemVariants}><strong>Compound Interest:</strong> Interest calculated on the initial principal and also on the accumulated interest from previous periods, leading to exponential growth of savings.</motion.p>
              <motion.p variants={itemVariants}><strong>Time Horizon:</strong> The total number of years available for saving until the college education begins.</motion.p>
              <motion.p variants={itemVariants}><strong>Monthly Savings:</strong> The regular amount of money you need to contribute each month to reach your college savings goal.</motion.p>
              <motion.p variants={itemVariants}><strong>Total Contributions:</strong> The sum of all your personal monthly savings payments over the entire time horizon.</motion.p>
              <motion.p variants={itemVariants}><strong>Total Interest Earned:</strong> The cumulative amount of interest your college savings are projected to generate through investment returns.</motion.p>
              <motion.p variants={itemVariants}><strong>Education Loan:</strong> Financial assistance provided to students or parents to cover educational expenses, typically repaid after the completion of studies.</motion.p>
              <motion.p variants={itemVariants}><strong>Scholarship/Grant:</strong> Financial aid that does not need to be repaid, awarded based on merit, need, or other criteria.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Effective College Savings
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForCollegeSavings.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Education Funding Needs?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Secure Their Educational Future?
            </motion.h2>
            <motion.p
              className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart offers comprehensive financial tools, expert advice, and tailored savings and education loan solutions
              to help you fund your child's higher education with confidence.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Education Savings & Loan Advisory"
                  openApplyModal={openApplyModal}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Explore Education Solutions
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Explore Education Solutions</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default CollegeSavingsCalculatorPage;
