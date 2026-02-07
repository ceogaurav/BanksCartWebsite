import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calendar, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  PiggyBank, Clock, TrendingDown, Coins
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


// --- Main Compound Interest Calculator Page Component ---
interface CompoundInterestCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const CompoundInterestCalculatorPage: React.FC<CompoundInterestCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [principalAmount, setPrincipalAmount] = useState<number>(100000); // Initial Investment
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(7.0); // Annual Interest Rate in %
  const [compoundingFrequency, setCompoundingFrequency] = useState<number>(12); // Number of times compounded per year (1=Annually, 2=Semi, 4=Quarterly, 12=Monthly, 365=Daily)
  const [investmentTenure, setInvestmentTenure] = useState<number>(10); // Investment Tenure in Years

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for direct input fields (with formatting)
  const handlePrincipalAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setPrincipalAmount(Number(value));
  };

  const handleAnnualInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnualInterestRate(Number(e.target.value));
  };

  const handleCompoundingFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCompoundingFrequency(Number(e.target.value));
  };

  const handleInvestmentTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestmentTenure(Number(e.target.value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Compound Interest Calculation
  const calculations = useMemo(() => {
    const P = principalAmount;
    const r = annualInterestRate / 100; // Annual interest rate as decimal
    const n = compoundingFrequency; // Number of times interest is compounded per year
    const t = investmentTenure; // Number of years

    let futureValue = P;
    let totalInterestEarned = 0;

    if (P > 0 && n > 0 && t > 0) {
      futureValue = P * Math.pow((1 + r / n), (n * t));
      totalInterestEarned = futureValue - P;
    } else if (P > 0 && (n === 0 || t === 0)) { // Edge case: if tenure or compounding is zero, no interest
        futureValue = P;
        totalInterestEarned = 0;
    }


    return {
      futureValue: Math.round(futureValue),
      totalInterestEarned: Math.round(totalInterestEarned),
    };
  }, [principalAmount, annualInterestRate, compoundingFrequency, investmentTenure]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is compound interest and how does it work?",
      answer: "Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods. It's often called 'interest on interest' and can significantly boost your investment growth over time."
    },
    {
      question: "What is the difference between simple and compound interest?",
      answer: "Simple interest is calculated only on the principal amount, while compound interest is calculated on the principal amount and also on the accumulated interest of previous periods. Compound interest leads to faster growth of your money."
    },
    {
      question: "How does compounding frequency affect my returns?",
      answer: "The more frequently interest is compounded (e.g., monthly vs. annually), the faster your money grows, assuming the same annual interest rate. This is because interest starts earning interest sooner."
    },
    {
      question: "What is the ideal investment tenure for compounding?",
      answer: "The longer your investment tenure, the more powerful compounding becomes. Time is a crucial factor in allowing your interest to earn more interest, leading to exponential growth."
    },
    {
      question: "Are there tax implications for compound interest earnings in India?",
      answer: "Yes, interest earned on investments is subject to income tax. The specific tax treatment depends on the investment instrument (e.g., Fixed Deposits, Mutual Funds) and your income tax slab. It's advisable to consult a financial advisor for personalized tax planning."
    },
    {
      question: "Can I use this calculator for recurring deposits (RD) or SIPs?",
      answer: "This calculator is designed for a single lump-sum investment. For recurring deposits or SIPs (Systematic Investment Plans), you would need a different type of calculator that factors in regular contributions over time. However, the principle of compounding still applies."
    },
    {
      question: "What are some common investment options that offer compound interest?",
      answer: "Common options include Fixed Deposits (FDs), Recurring Deposits (RDs), Public Provident Fund (PPF), National Savings Certificates (NSC), certain types of bonds, and various mutual funds (where dividends are reinvested)."
    }
  ];

  const tipsForMaximizingCompounding = [
    { icon: <Clock className="w-6 h-6 text-green-500" />, text: "Start investing early to give your money more time to compound." },
    { icon: <TrendingUp className="w-6 h-6 text-blue-500" />, text: "Invest regularly, even small amounts, to benefit from compounding over time." },
    { icon: <Percent className="w-6 h-6 text-yellow-500" />, text: "Seek investments with higher interest rates, but always consider risk." },
    { icon: <Calendar className="w-6 h-6 text-purple-500" />, text: "Choose higher compounding frequencies (e.g., monthly vs. annually) if available." },
    { icon: <PiggyBank className="w-6 h-6 text-orange-500" />, text: "Reinvest your earnings to ensure all interest compounds." },
    { icon: <Wallet className="w-6 h-6 text-red-500" />, text: "Avoid withdrawing interest or principal prematurely." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Diverse Investment Options", description: "Explore a wide range of investment products that benefit from compounding." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Personalized Financial Planning", description: "Get tailored advice to build an investment portfolio aligned with your goals." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Expert Guidance", description: "Connect with financial advisors to understand compounding strategies and tax implications." },
    { icon: <Coins className="w-16 h-16 text-purple-400" />, title: "Seamless Investment Journey", description: "Invest digitally with ease and track your compounded growth on our platform." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 to-emerald-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-lime-600 to-emerald-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Unleash the Power of{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Compound Interest.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-lime-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Calculate the future value of your investments and the total interest earned over time.
            Watch your money grow exponentially with smart financial planning.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Investment Inquiry"
                openApplyModal={openApplyModal}
                className="bg-white text-lime-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Explore Investment Options
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Compound Interest Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-lime-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-lime-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-emerald-500" /> Compound Interest Calculator
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <PiggyBank className="w-6 h-6 mr-2 text-lime-600" /> Investment Details
              </h3>

              {/* Principal Amount */}
              <motion.div variants={itemVariants}>
                <label htmlFor="principalAmount" className="block text-lg font-semibold text-gray-700 mb-2">
                  Initial Investment (Principal): <span className="text-blue-600">{formatCurrency(principalAmount)}</span>
                </label>
                <input
                  type="range"
                  id="principalAmount"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={principalAmount}
                  onChange={handlePrincipalAmountChange}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(principalAmount)}
                  onChange={handlePrincipalAmountChange}
                  onBlur={(e) => setPrincipalAmount(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Annual Interest Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="annualInterestRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Interest Rate: <span className="text-purple-600">{annualInterestRate.toFixed(2)}%</span>
                </label>
                <input
                  type="range"
                  id="annualInterestRate"
                  min="1"
                  max="20"
                  step="0.05"
                  value={annualInterestRate}
                  onChange={handleAnnualInterestRateChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="number"
                  value={annualInterestRate}
                  onChange={handleAnnualInterestRateChange}
                  onBlur={(e) => setAnnualInterestRate(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  step="0.01"
                />
              </motion.div>

              {/* Investment Tenure */}
              <motion.div variants={itemVariants}>
                <label htmlFor="investmentTenure" className="block text-lg font-semibold text-gray-700 mb-2">
                  Investment Tenure: <span className="text-teal-600">{investmentTenure} Years</span>
                </label>
                <input
                  type="range"
                  id="investmentTenure"
                  min="1"
                  max="30"
                  step="1"
                  value={investmentTenure}
                  onChange={handleInvestmentTenureChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="number"
                  value={investmentTenure}
                  onChange={handleInvestmentTenureChange}
                  onBlur={(e) => setInvestmentTenure(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  min="1"
                  max="30"
                />
              </motion.div>

              {/* Compounding Frequency */}
              <motion.div variants={itemVariants}>
                <label htmlFor="compoundingFrequency" className="block text-lg font-semibold text-gray-700 mb-2">
                  Compounding Frequency:
                </label>
                <select
                  id="compoundingFrequency"
                  value={compoundingFrequency}
                  onChange={handleCompoundingFrequencyChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all bg-white appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                >
                  <option value={1}>Annually</option>
                  <option value={2}>Semi-Annually</option>
                  <option value={4}>Quarterly</option>
                  <option value={12}>Monthly</option>
                  <option value={365}>Daily</option>
                </select>
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-lime-500 to-emerald-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Investment's Future Value</h3>
              <motion.div
                key={calculations.futureValue} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
              >
                {formatCurrency(calculations.futureValue)}
              </motion.div>
              <p className="text-xl text-lime-100 mb-8">Total Value at Maturity</p>

              <div className="w-full space-y-4 text-lg">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-lime-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Initial Principal</span>
                  <span className="font-bold text-white">{formatCurrency(principalAmount)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-lime-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Total Interest Earned</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalInterestEarned)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-lime-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Percent className="w-5 h-5" /> Annual Rate</span>
                  <span className="font-bold text-white">{annualInterestRate.toFixed(2)}%</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-lime-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Clock className="w-5 h-5" /> Investment Period</span>
                  <span className="font-bold text-white">{investmentTenure} Years</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-lime-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Coins className="w-5 h-5" /> Compounding Frequency</span>
                  <span className="font-bold text-white">
                    {compoundingFrequency === 1 ? 'Annually' :
                     compoundingFrequency === 2 ? 'Semi-Annually' :
                     compoundingFrequency === 4 ? 'Quarterly' :
                     compoundingFrequency === 12 ? 'Monthly' : 'Daily'}
                  </span>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Compound Interest Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Compound Interest Calculator is a powerful financial tool that helps you visualize the growth of your investments over time, taking into account the magic of compounding. Unlike simple interest, which is calculated only on the initial principal, compound interest is calculated on the principal amount and also on the accumulated interest from previous periods. This 'interest on interest' effect can significantly accelerate your wealth accumulation, making this calculator indispensable for long-term financial planning, retirement savings, and understanding the true potential of your money.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Compound Interest Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Initial Investment (Principal):</strong> Input the lump sum amount you plan to invest initially. This is the starting point for your compounded growth.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Annual Interest Rate:</strong> Enter the expected annual rate of return on your investment. This rate can be fixed (like FDs) or an average estimate (for market-linked investments).</motion.li>
              <motion.li variants={itemVariants}><strong>Select Compounding Frequency:</strong> Choose how often the interest is calculated and added to your principal. Options usually include Annually, Semi-Annually, Quarterly, Monthly, or Daily. More frequent compounding leads to faster growth.</motion.li>
              <motion.li variants={itemVariants}><strong>Specify Investment Tenure:</strong> Set the number of years you plan to keep your money invested. The longer the tenure, the more pronounced the effect of compounding.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Instant Results:</strong> The calculator will immediately display the projected Future Value of your investment (principal + total interest) and the Total Interest Earned, helping you see the power of compounding in action.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Compound Interest Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Visualize Growth:</strong> Clearly see how your money can grow exponentially over time, motivating you to start investing early and stay invested longer.</motion.li>
              <motion.li variants={itemVariants}><strong>Goal Planning:</strong> Use it to set realistic financial goals, whether it's for retirement, a child's education, or a down payment, by understanding how much you need to invest and for how long.</motion.li>
              <motion.li variants={itemVariants}><strong>Compare Investment Options:</strong> Evaluate different investment products by comparing their potential future values based on varying interest rates and compounding frequencies.</motion.li>
              <motion.li variants={itemVariants}><strong>Understand Impact of Time:</strong> It powerfully demonstrates that time is your greatest ally in compounding, highlighting the benefits of long-term investing.</motion.li>
              <motion.li variants={itemVariants}><strong>Informed Decision Making:</strong> Make smarter financial decisions by understanding the mechanics of compounding and how your choices (like initial investment, rate, and tenure) directly affect your wealth creation.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Compound Interest Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Principal Amount:</strong> The initial sum of money deposited or invested. This is the base on which interest is first calculated.</motion.p>
              <motion.p variants={itemVariants}><strong>Annual Interest Rate:</strong> The percentage rate at which interest is earned annually. This is usually expressed as a percentage (e.g., 7%).</motion.p>
              <motion.p variants={itemVariants}><strong>Compounding Frequency:</strong> How often the accumulated interest is added back to the principal, becoming part of the new principal for the next interest calculation. Common frequencies are annually, semi-annually, quarterly, monthly, or daily.</motion.p>
              <motion.p variants={itemVariants}><strong>Investment Tenure:</strong> The total duration, in years, for which the principal amount is invested and allowed to grow with compound interest.</motion.p>
              <motion.p variants={itemVariants}><strong>Future Value (A):</strong> The total amount of money your investment will be worth at the end of the investment tenure, including both the original principal and all the accumulated compound interest.</motion.p>
              <motion.p variants={itemVariants}><strong>Total Interest Earned:</strong> The total amount of interest accumulated over the investment tenure, calculated as the Future Value minus the Initial Principal.</motion.p>
              <motion.p variants={itemVariants}><strong>Rule of 72:</strong> A quick mental math shortcut to estimate the number of years it takes for an investment to double in value, by dividing 72 by the annual interest rate.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Maximizing Compounded Growth
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForMaximizingCompounding.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Investments?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-lime-50 to-emerald-50 border border-lime-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-lime-600 to-emerald-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Grow Your Wealth?
            </motion.h2>
            <motion.p
              className="text-lg text-lime-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Start your investment journey with BanksCart. Explore tailored investment plans
              and harness the power of compounding for your financial future.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Investment Plan Inquiry"
                  openApplyModal={openApplyModal}
                  className="bg-white text-lime-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Explore Investment Plans
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Explore Investment Plans</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculatorPage;
