import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calendar, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  PiggyBank, Clock, Users, ShieldCheck, TrendingDown, Gavel, Landmark, Handshake, Briefcase
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


// --- Main Roth Vs Traditional IRA Calculator Page Component ---
interface RothVsTraditionalIRACalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const RothVsTraditionalIRACalculatorPage: React.FC<RothVsTraditionalIRACalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(65);
  const [annualContribution, setAnnualContribution] = useState<number>(6000); // Max IRA contribution
  const [expectedAnnualReturn, setExpectedAnnualReturn] = useState<number>(7.0); // Annual return
  const [currentTaxBracket, setCurrentTaxBracket] = useState<number>(20); // Pre-retirement tax bracket
  const [retirementTaxBracket, setRetirementTaxBracket] = useState<number>(15); // Post-retirement tax bracket

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Tax bracket options (simplified for example)
  const taxBrackets = [
    { value: 0, label: '0% (No Tax)' },
    { value: 10, label: '10%' },
    { value: 15, label: '15%' },
    { value: 20, label: '20%' },
    { value: 25, label: '25%' },
    { value: 30, label: '30%' },
    { value: 35, label: '35%' },
    { value: 40, label: '40%' },
  ];

  // Handlers for direct input fields (with formatting)
  const handleCurrentAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentAge(Number(e.target.value));
  };

  const handleRetirementAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRetirementAge(Number(e.target.value));
  };

  const handleAnnualContributionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setAnnualContribution(Number(value));
  };

  const handleExpectedAnnualReturnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpectedAnnualReturn(Number(e.target.value));
  };

  const handleCurrentTaxBracketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentTaxBracket(Number(e.target.value));
  };

  const handleRetirementTaxBracketChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRetirementTaxBracket(Number(e.target.value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized IRA Calculations
  const calculations = useMemo(() => {
    const yearsToRetirement = Math.max(0, retirementAge - currentAge);
    const annualContrib = annualContribution;
    const r = expectedAnnualReturn / 100; // Annual return as decimal
    const currentTaxRate = currentTaxBracket / 100;
    const retirementTaxRate = retirementTaxBracket / 100;

    // --- Traditional IRA Calculation ---
    // Contributions are pre-tax, grow tax-deferred
    let traditionalIRA_FV_PreTax = 0;
    if (annualContrib > 0 && r > 0 && yearsToRetirement > 0) {
      traditionalIRA_FV_PreTax = annualContrib * ((Math.pow(1 + r, yearsToRetirement) - 1) / r) * (1 + r); // FV of annuity due
    } else if (annualContrib > 0 && yearsToRetirement > 0) { // 0% return
        traditionalIRA_FV_PreTax = annualContrib * yearsToRetirement;
    }

    // Withdrawals are taxed in retirement
    const traditionalIRA_Net_Retirement_Value = traditionalIRA_FV_PreTax * (1 - retirementTaxRate);
    const traditionalIRA_TaxSavingsToday = annualContrib * currentTaxRate * yearsToRetirement; // Total tax savings from contributions

    // --- Roth IRA Calculation ---
    // Contributions are after-tax, grow tax-free, withdrawals tax-free
    const rothIRA_AfterTaxContribution = annualContrib; // Already after-tax
    let rothIRA_FV_AfterTax = 0;
    if (rothIRA_AfterTaxContribution > 0 && r > 0 && yearsToRetirement > 0) {
      rothIRA_FV_AfterTax = rothIRA_AfterTaxContribution * ((Math.pow(1 + r, yearsToRetirement) - 1) / r) * (1 + r); // FV of annuity due
    } else if (rothIRA_AfterTaxContribution > 0 && yearsToRetirement > 0) { // 0% return
        rothIRA_FV_AfterTax = rothIRA_AfterTaxContribution * yearsToRetirement;
    }

    // Roth withdrawals are tax-free, so FV is the net value
    const rothIRA_Net_Retirement_Value = rothIRA_FV_AfterTax;

    // Total invested amount (actual money out of pocket) for comparison
    const totalInvestedTraditional = annualContrib * yearsToRetirement;
    const totalInvestedRoth = annualContrib * yearsToRetirement;

    return {
      yearsToRetirement: yearsToRetirement,
      traditionalIRA_FV_PreTax: Math.round(traditionalIRA_FV_PreTax),
      traditionalIRA_Net_Retirement_Value: Math.round(traditionalIRA_Net_Retirement_Value),
      traditionalIRA_TaxSavingsToday: Math.round(traditionalIRA_TaxSavingsToday),
      rothIRA_Net_Retirement_Value: Math.round(rothIRA_Net_Retirement_Value),
      totalInvestedTraditional: Math.round(totalInvestedTraditional),
      totalInvestedRoth: Math.round(totalInvestedRoth),
    };
  }, [currentAge, retirementAge, annualContribution, expectedAnnualReturn, currentTaxBracket, retirementTaxBracket]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Roth IRA vs. Traditional IRA Calculator?",
      answer: "This calculator helps you compare the potential long-term financial outcomes of investing in a Roth IRA versus a Traditional IRA. It considers your current and future tax brackets, annual contributions, and expected returns to show which option might provide more after-tax money in retirement."
    },
    {
      question: "What is a Traditional IRA?",
      answer: "A Traditional IRA allows you to contribute pre-tax money, meaning your contributions might be tax-deductible in the year you make them. Your investments grow tax-deferred, and withdrawals in retirement are taxed as ordinary income. It offers a tax break now, but you pay taxes later."
    },
    {
      question: "What is a Roth IRA?",
      answer: "A Roth IRA allows you to contribute after-tax money, meaning your contributions are not tax-deductible. However, your investments grow tax-free, and qualified withdrawals in retirement are completely tax-free. It offers no tax break now, but you get tax-free income later."
    },
    {
      question: "Which IRA is better for me: Roth or Traditional?",
      answer: "The 'better' option depends on your current and future tax situations. If you expect to be in a higher tax bracket in retirement than you are now, a Roth IRA (tax-free withdrawals) might be better. If you expect to be in a lower tax bracket in retirement, a Traditional IRA (tax deduction now) might be more advantageous. This calculator helps illustrate that."
    },
    {
      question: "What are 'tax brackets' in this context?",
      answer: "Tax brackets refer to the different income ranges that are taxed at specific rates. Your 'current tax bracket' is the marginal tax rate you pay on your income today. Your 'retirement tax bracket' is the marginal tax rate you expect to pay on your income during retirement."
    },
    {
      question: "Can I contribute to both a Roth and Traditional IRA?",
      answer: "Yes, you can contribute to both, but your total combined contributions to all IRAs (Roth and Traditional) cannot exceed the annual contribution limit set by the IRS (or equivalent tax authority in your region) for that year."
    },
    {
      question: "What are the contribution limits for IRAs?",
      answer: "Contribution limits are set annually by the IRS and can vary based on your age and income. It's important to check the latest limits for the current tax year."
    }
  ];

  const tipsForChoosingIRA = [
    { icon: <Briefcase className="w-6 h-6 text-green-500" />, text: "If you expect to be in a higher tax bracket in retirement, consider Roth." },
    { icon: <Handshake className="w-6 h-6 text-blue-500" />, text: "If you expect to be in a lower tax bracket in retirement, consider Traditional." },
    { icon: <Clock className="w-6 h-6 text-yellow-500" />, text: "Younger investors often benefit more from Roth due to longer tax-free growth." },
    { icon: <TrendingUp className="w-6 h-6 text-purple-500" />, text: "Consider a mix of both if you're unsure about future tax rates (tax diversification)." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Factor in potential changes in tax laws over your lifetime." },
    { icon: <Users className="w-6 h-6 text-red-500" />, text: "Consult a qualified financial advisor for personalized advice." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Comprehensive Retirement Planning", description: "Access tools and experts for holistic retirement planning, including IRA choices." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Diverse Investment Options", description: "Explore a wide range of investment products suitable for your chosen IRA type." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Expert Advisory Services", description: "Connect with certified financial planners to optimize your retirement strategy." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Tax-Efficient Strategies", description: "Understand and implement tax-saving strategies for your retirement savings." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-green-600 to-emerald-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Roth vs. Traditional IRA:{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Which is Right for You?
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-green-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Compare potential outcomes between Roth and Traditional IRAs to make an informed decision
            for your tax-advantaged retirement savings.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="IRA Investment Inquiry"
                openApplyModal={openApplyModal}
                className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Retirement Planning Advice
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Roth vs. Traditional IRA Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-green-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-green-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-emerald-500" /> Compare Your IRA Options
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <PiggyBank className="w-6 h-6 mr-2 text-green-600" /> Your Financial Profile
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
                  min={currentAge + 5}
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

              {/* Annual Contribution */}
              <motion.div variants={itemVariants}>
                <label htmlFor="annualContribution" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Contribution: <span className="text-teal-600">{formatCurrency(annualContribution)}</span>
                </label>
                <input
                  type="range"
                  id="annualContribution"
                  min="1000"
                  max="100000" // Max typical IRA limit for example
                  step="1000"
                  value={annualContribution}
                  onChange={handleAnnualContributionChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(annualContribution)}
                  onChange={handleAnnualContributionChange}
                  onBlur={(e) => setAnnualContribution(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Expected Annual Return */}
              <motion.div variants={itemVariants}>
                <label htmlFor="expectedAnnualReturn" className="block text-lg font-semibold text-gray-700 mb-2">
                  Expected Annual Return: <span className="text-orange-600">{expectedAnnualReturn.toFixed(1)}%</span>
                </label>
                <input
                  type="range"
                  id="expectedAnnualReturn"
                  min="1"
                  max="15"
                  step="0.1"
                  value={expectedAnnualReturn}
                  onChange={handleExpectedAnnualReturnChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="number"
                  value={expectedAnnualReturn}
                  onChange={handleExpectedAnnualReturnChange}
                  onBlur={(e) => setExpectedAnnualReturn(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  step="0.1"
                />
              </motion.div>

              {/* Current Tax Bracket */}
              <motion.div variants={itemVariants}>
                <label htmlFor="currentTaxBracket" className="block text-lg font-semibold text-gray-700 mb-2">
                  Your Current Tax Bracket:
                </label>
                <select
                  id="currentTaxBracket"
                  value={currentTaxBracket}
                  onChange={handleCurrentTaxBracketChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-red-500 focus:border-red-500 transition-all bg-white appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                >
                  {taxBrackets.map(bracket => (
                    <option key={bracket.value} value={bracket.value}>{bracket.label}</option>
                  ))}
                </select>
              </motion.div>

              {/* Retirement Tax Bracket */}
              <motion.div variants={itemVariants}>
                <label htmlFor="retirementTaxBracket" className="block text-lg font-semibold text-gray-700 mb-2">
                  Expected Retirement Tax Bracket:
                </label>
                <select
                  id="retirementTaxBracket"
                  value={retirementTaxBracket}
                  onChange={handleRetirementTaxBracketChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-green-500 focus:border-green-500 transition-all bg-white appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                >
                  {taxBrackets.map(bracket => (
                    <option key={bracket.value} value={bracket.value}>{bracket.label}</option>
                  ))}
                </select>
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Projected After-Tax Retirement Value</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-6">
                <motion.div
                  key={calculations.traditionalIRA_Net_Retirement_Value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
                  className="bg-green-700/40 p-4 rounded-lg flex flex-col items-center justify-center"
                >
                  <p className="text-lg text-green-100 font-semibold">Traditional IRA</p>
                  <span className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg">
                    {formatCurrency(calculations.traditionalIRA_Net_Retirement_Value)}
                  </span>
                </motion.div>
                <motion.div
                  key={calculations.rothIRA_Net_Retirement_Value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
                  className="bg-emerald-700/40 p-4 rounded-lg flex flex-col items-center justify-center"
                >
                  <p className="text-lg text-emerald-100 font-semibold">Roth IRA</p>
                  <span className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg">
                    {formatCurrency(calculations.rothIRA_Net_Retirement_Value)}
                  </span>
                </motion.div>
              </div>

              <div className="w-full space-y-4 text-lg">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-green-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Total Invested (Out of Pocket)</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalInvestedRoth)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-green-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Clock className="w-5 h-5" /> Years to Retirement</span>
                  <span className="font-bold text-white">{calculations.yearsToRetirement} Years</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-green-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Traditional IRA (Pre-Tax FV)</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.traditionalIRA_FV_PreTax)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-green-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><DollarSign className="w-5 h-5" /> Est. Traditional IRA Tax Savings Today</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.traditionalIRA_TaxSavingsToday)}</span>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Roth IRA vs. Traditional IRA Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              This calculator is a crucial tool for anyone planning for retirement in countries that offer tax-advantaged individual retirement accounts (like IRAs in the US, or similar schemes in other regions). It helps you directly compare the potential after-tax retirement income from two primary types of accounts: Roth and Traditional. By allowing you to input your current and expected future tax brackets, annual contributions, and investment returns, the calculator illustrates which option might be more financially beneficial for your unique situation, helping you make a strategic decision about where to save for retirement.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our IRA Comparison Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Your Current Age & Retirement Age:</strong> Define your investment horizon. The longer you save, the more significant the impact of compounding.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Annual Contribution:</strong> Specify the amount you plan to save annually in your IRA. This should be within the annual contribution limits.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Expected Annual Return:</strong> Estimate the average annual growth rate your investments are likely to achieve within the IRA. Be realistic and consider historical averages for diversified portfolios.</motion.li>
              <motion.li variants={itemVariants}><strong>Choose Current Tax Bracket:</strong> Select your current marginal income tax bracket. This affects the immediate tax benefits of a Traditional IRA.</motion.li>
              <motion.li variants={itemVariants}><strong>Choose Expected Retirement Tax Bracket:</strong> Estimate your marginal income tax bracket in retirement. This is crucial as it determines the tax impact of withdrawals from a Traditional IRA.</motion.li>
              <motion.li variants={itemVariants}><strong>Review After-Tax Values:</strong> The calculator will instantly display the projected after-tax value of your retirement savings for both Roth and Traditional IRAs, allowing for a direct comparison of which strategy yields more net wealth.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use an IRA Comparison Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Optimize Tax Strategy:</strong> Helps you determine whether paying taxes now (Roth) or deferring them until retirement (Traditional) is more advantageous based on your expected tax trajectory.</motion.li>
              <motion.li variants={itemVariants}><strong>Maximize After-Tax Wealth:</strong> Focuses on the net amount you'll actually have available to spend in retirement, providing a clearer picture of your financial independence.</motion.li>
              <motion.li variants={itemVariants}><strong>Informed Decision Making:</strong> Empowers you to make a strategic choice between Roth and Traditional IRAs, which is a cornerstone of effective retirement planning.</motion.li>
              <motion.li variants={itemVariants}><strong>Future-Proofing Your Income:</strong> By considering future tax rates, you can position your retirement income to be as tax-efficient as possible, protecting your purchasing power.</motion.li>
              <motion.li variants={itemVariants}><strong>Educational Insight:</strong> Provides a practical understanding of how different tax treatments impact long-term investment growth, enhancing your financial literacy.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key IRA Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Traditional IRA:</strong> An Individual Retirement Arrangement where contributions may be tax-deductible in the present, investments grow tax-deferred, and withdrawals in retirement are taxed as ordinary income.</motion.p>
              <motion.p variants={itemVariants}><strong>Roth IRA:</strong> An Individual Retirement Arrangement where contributions are made with after-tax money (not tax-deductible), but investments grow tax-free, and qualified withdrawals in retirement are also completely tax-free.</motion.p>
              <motion.p variants={itemVariants}><strong>Tax Bracket:</strong> A range of incomes that are taxed at a specific rate. Your marginal tax bracket is the rate at which your last dollar of income is taxed.</motion.p>
              <motion.p variants={itemVariants}><strong>Tax-Deductible:</strong> An amount that can be subtracted from your gross income to reduce your taxable income, thereby lowering your current tax liability.</motion.p>
              <motion.p variants={itemVariants}><strong>Tax-Deferred:</strong> Investment earnings on which taxes are not paid until the money is withdrawn, typically in retirement. This allows your money to grow faster as taxes aren't reducing your compounding base annually.</motion.p>
              <motion.p variants={itemVariants}><strong>Tax-Free:</strong> Investment earnings and/or withdrawals that are completely exempt from taxation, provided certain conditions are met (e.g., qualified Roth IRA withdrawals).</motion.p>
              <motion.p variants={itemVariants}><strong>Annual Contribution Limit:</strong> The maximum amount of money you are allowed to contribute to an IRA (or similar retirement account) in a given tax year, as set by tax authorities.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Choosing Between Roth and Traditional IRA
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForChoosingIRA.map((tip, index) => (
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
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Optimize Your Retirement Savings?
            </motion.h2>
            <motion.p
              className="text-lg text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Make the smartest choices for your future. BanksCart offers expert guidance
              and a range of investment solutions to help you achieve your retirement goals.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Retirement Tax Strategy"
                  openApplyModal={openApplyModal}
                  className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
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

export default RothVsTraditionalIRACalculatorPage;
