import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank,
  HandCoins, CreditCard, Clock, Hourglass, PiggyBank as SavingsIcon, MinusCircle, Landmark
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

// Function to calculate debt payoff details iteratively
const calculatePayoff = (
  debt: number,
  annualRate: number,
  monthlyPayment: number
): { months: number; totalInterest: number; totalPaid: number } => {
  if (debt <= 0) {
    return { months: 0, totalInterest: 0, totalPaid: 0 };
  }

  const monthlyInterestRate = annualRate / 100 / 12;
  let remainingDebt = debt;
  let totalPaymentsMade = 0;
  let months = 0;
  const maxMonths = 1200; // Cap at 100 years to prevent infinite loops for too-low payments

  // If monthly payment is less than or equal to the interest on the initial debt, it will never be paid off
  if (monthlyPayment <= (debt * monthlyInterestRate) && monthlyPayment > 0) {
    return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
  }
  if (monthlyPayment <= 0) { // No payment, never pays off
    return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
  }

  while (remainingDebt > 0 && months < maxMonths) {
    months++;
    const interestThisMonth = remainingDebt * monthlyInterestRate;
    
    let principalPaidThisMonth = monthlyPayment - interestThisMonth;

    // If the principal payment is more than what's left of the debt,
    // adjust the payment to exactly clear the debt.
    if (principalPaidThisMonth >= remainingDebt) {
      totalPaymentsMade += remainingDebt + interestThisMonth; // Last payment covers remaining principal + interest
      remainingDebt = 0;
      break; // Debt is paid off
    } else {
      remainingDebt -= principalPaidThisMonth;
      totalPaymentsMade += monthlyPayment;
    }
  }

  // If after maxIterations, debt is still > 0, it means it won't be paid off.
  if (remainingDebt > 0) {
    return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
  }

  const totalInterestPaid = totalPaymentsMade - debt;

  return {
    months: months,
    totalInterest: Math.round(totalInterestPaid),
    totalPaid: Math.round(totalPaymentsMade),
  };
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


// --- Main Debt Payoff Calculator Page Component ---
interface DebtPayoffCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const DebtPayoffCalculatorPage: React.FC<DebtPayoffCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [currentDebtBalance, setCurrentDebtBalance] = useState<number>(500000);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(18); // e.g., for personal loan/credit card
  const [monthlyPayment, setMonthlyPayment] = useState<number>(10000);
  const [additionalMonthlyPayment, setAdditionalMonthlyPayment] = useState<number>(0);

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for inputs
  const handleCurrentDebtBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setCurrentDebtBalance(Number(value));
  };

  const handleAnnualInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnualInterestRate(Number(e.target.value));
  };

  const handleMonthlyPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setMonthlyPayment(Number(value));
  };

  const handleAdditionalMonthlyPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setAdditionalMonthlyPayment(Number(value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Debt Payoff Calculations
  const calculations = useMemo(() => {
    const regularPayoff = calculatePayoff(currentDebtBalance, annualInterestRate, monthlyPayment);
    const acceleratedPayoff = calculatePayoff(currentDebtBalance, annualInterestRate, monthlyPayment + additionalMonthlyPayment);

    // Format months into years and months
    const formatMonths = (totalMonths: number) => {
      if (totalMonths === Infinity) return "Never";
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;
      return `${years} Years, ${months} Months`;
    };

    const interestSaved = (regularPayoff.totalInterest !== Infinity && acceleratedPayoff.totalInterest !== Infinity)
      ? regularPayoff.totalInterest - acceleratedPayoff.totalInterest
      : 0;
    const timeSavedMonths = (regularPayoff.months !== Infinity && acceleratedPayoff.months !== Infinity)
      ? regularPayoff.months - acceleratedPayoff.months
      : 0;

    return {
      regularPayoffTime: formatMonths(regularPayoff.months),
      regularTotalInterest: regularPayoff.totalInterest,
      regularTotalPaid: regularPayoff.totalPaid,
      acceleratedPayoffTime: formatMonths(acceleratedPayoff.months),
      acceleratedTotalInterest: acceleratedPayoff.totalInterest,
      acceleratedTotalPaid: acceleratedPayoff.totalPaid,
      interestSaved: interestSaved,
      timeSavedMonths: timeSavedMonths,
      formatMonths: formatMonths // Pass the formatter for display
    };
  }, [currentDebtBalance, annualInterestRate, monthlyPayment, additionalMonthlyPayment]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Debt Payoff Calculator?",
      answer: "A Debt Payoff Calculator is a financial tool that helps you estimate how long it will take to become debt-free based on your current debt balance, interest rate, and monthly payment. It also shows you how much total interest you will pay and, crucially, how making extra payments can accelerate your payoff and save you money."
    },
    {
      question: "Why is it important to pay off debt faster?",
      answer: "Paying off debt faster saves you a significant amount of money in interest over the long term. It also frees up your monthly cash flow, improves your credit score, reduces financial stress, and allows you to redirect funds towards savings and investments, accelerating your journey to financial freedom."
    },
    {
      question: "What is 'Principal' and 'Interest' in debt repayment?",
      answer: "<ul><li><strong>Principal:</strong> The original amount of money you borrowed or owe. Each payment you make reduces this amount.</li><li><strong>Interest:</strong> The cost of borrowing money, calculated as a percentage of the outstanding principal balance. A portion of each payment goes towards interest.</li></ul>"
    },
    {
      question: "What is the 'Snowball Method' vs. 'Avalanche Method'?",
      answer: "These are two popular debt payoff strategies:<ul><li><strong>Debt Snowball:</strong> Pay minimums on all debts except the smallest one, which you attack with extra payments. Once it's paid off, roll that payment into the next smallest debt. Focuses on psychological wins.</li><li><strong>Debt Avalanche:</strong> Pay minimums on all debts except the one with the highest interest rate, which you attack with extra payments. Once it's paid off, roll that payment into the next highest interest rate debt. Saves the most money in interest.</li></ul>"
    },
    {
      question: "How does the interest rate affect my payoff time?",
      answer: "The interest rate has a significant impact. A higher interest rate means a larger portion of your monthly payment goes towards interest, leaving less to reduce the principal. This extends your payoff time and increases the total interest paid. Conversely, a lower interest rate or making extra payments directly reduces the principal, saving interest and shortening the payoff period."
    },
    {
      question: "Can I use this calculator for all types of debt?",
      answer: "Yes, this calculator can be used for most types of amortizing debt, including personal loans, credit card debt, car loans, and even mortgages (though dedicated mortgage calculators provide more detailed amortization schedules). It works best for fixed-rate debts where payments are consistent."
    },
    {
      question: "What if I can't afford extra payments?",
      answer: "Even small extra payments can make a difference. If extra payments aren't feasible, focus on reducing discretionary spending to free up funds, or consider consolidating high-interest debt into a lower-interest loan if eligible. The goal is to pay more than the minimum whenever possible."
    }
  ];

  const tipsForFasterDebtPayoff = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Make extra payments whenever possible, even small amounts." },
    { icon: <TrendingUp className="w-6 h-6 text-blue-500" />, text: "Prioritize high-interest debts first (Avalanche Method) to save the most money." },
    { icon: <PiggyBank className="w-6 h-6 text-yellow-500" />, text: "Create a budget to identify areas where you can cut expenses and free up cash for debt." },
    { icon: <CreditCard className="w-6 h-6 text-purple-500" />, text: "Consider debt consolidation or balance transfer to a lower interest rate if eligible." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Avoid taking on new debt while actively paying off existing debt." },
    { icon: <Clock className="w-6 h-6 text-red-500" />, text: "Automate your payments to ensure consistency and avoid missed payments." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Personalized Debt Solutions", description: "Access tailored strategies and products to help you manage and reduce your debt effectively." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Financial Advisory", description: "Connect with certified financial advisors for personalized guidance on debt management and financial planning." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Debt Consolidation Options", description: "Explore lower-interest loan options to consolidate high-interest debts and simplify repayment." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Credit Score Improvement", description: "Learn how effective debt management can positively impact your credit score over time." },
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
            Accelerate Your Journey to{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Debt Freedom.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-red-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Determine how long it will take to pay off your debt and how much you can save.
            Plan your path to financial independence.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Debt Management Advisory"
                openApplyModal={openApplyModal}
                className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Debt Management Advice
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Debt Payoff Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-red-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-orange-500" /> Debt Payoff Estimator
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-red-600" /> Your Debt Details
              </h3>

              {/* Current Debt Balance */}
              <motion.div variants={itemVariants}>
                <label htmlFor="currentDebtBalance" className="block text-lg font-semibold text-gray-700 mb-2">
                  Current Debt Balance: <span className="text-blue-600">{formatCurrency(currentDebtBalance)}</span>
                </label>
                <input
                  type="range"
                  id="currentDebtBalance"
                  min="10000"
                  max="5000000"
                  step="10000"
                  value={currentDebtBalance}
                  onChange={handleCurrentDebtBalanceChange}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(currentDebtBalance)}
                  onChange={handleCurrentDebtBalanceChange}
                  onBlur={(e) => setCurrentDebtBalance(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Annual Interest Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="annualInterestRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Interest Rate: <span className="text-teal-600">{annualInterestRate}%</span>
                </label>
                <input
                  type="range"
                  id="annualInterestRate"
                  min="1"
                  max="30"
                  step="0.5"
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
                  step="0.1"
                />
              </motion.div>

              {/* Monthly Payment */}
              <motion.div variants={itemVariants}>
                <label htmlFor="monthlyPayment" className="block text-lg font-semibold text-gray-700 mb-2">
                  Current Monthly Payment: <span className="text-orange-600">{formatCurrency(monthlyPayment)}</span>
                </label>
                <input
                  type="range"
                  id="monthlyPayment"
                  min="1000"
                  max="50000"
                  step="500"
                  value={monthlyPayment}
                  onChange={handleMonthlyPaymentChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(monthlyPayment)}
                  onChange={handleMonthlyPaymentChange}
                  onBlur={(e) => setMonthlyPayment(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Additional Monthly Payment */}
              <motion.div variants={itemVariants}>
                <label htmlFor="additionalMonthlyPayment" className="block text-lg font-semibold text-gray-700 mb-2">
                  Additional Monthly Payment: <span className="text-purple-600">{formatCurrency(additionalMonthlyPayment)}</span>
                </label>
                <input
                  type="range"
                  id="additionalMonthlyPayment"
                  min="0"
                  max="20000"
                  step="100"
                  value={additionalMonthlyPayment}
                  onChange={handleAdditionalMonthlyPaymentChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(additionalMonthlyPayment)}
                  onChange={handleAdditionalMonthlyPaymentChange}
                  onBlur={(e) => setAdditionalMonthlyPayment(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-red-500 to-orange-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Debt Payoff Insights</h3>

              {/* Regular Payoff */}
              <motion.div
                key="regularPayoff"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="w-full bg-red-700/30 p-4 rounded-lg mb-4"
              >
                <p className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                  <Clock className="w-6 h-6" /> Regular Payoff Time:
                </p>
                <p className="text-4xl font-extrabold text-yellow-300 drop-shadow-lg">
                  {calculations.regularPayoffTime}
                </p>
                <p className="text-lg mt-2">Total Interest: {formatCurrency(calculations.regularTotalInterest)}</p>
                <p className="text-lg">Total Paid: {formatCurrency(calculations.regularTotalPaid)}</p>
              </motion.div>

              {/* Accelerated Payoff */}
              {additionalMonthlyPayment > 0 && (
                <motion.div
                  key="acceleratedPayoff"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="w-full bg-orange-700/30 p-4 rounded-lg mb-4 border-2 border-yellow-400"
                >
                  <p className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                    <Hourglass className="w-6 h-6" /> Accelerated Payoff Time:
                  </p>
                  <p className="text-4xl font-extrabold text-yellow-300 drop-shadow-lg">
                    {calculations.acceleratedPayoffTime}
                  </p>
                  <p className="text-lg mt-2">Total Interest: {formatCurrency(calculations.acceleratedTotalInterest)}</p>
                  <p className="text-lg">Total Paid: {formatCurrency(calculations.acceleratedTotalPaid)}</p>
                </motion.div>
              )}

              {/* Savings Summary */}
              {additionalMonthlyPayment > 0 && calculations.interestSaved > 0 && (
                <motion.div
                  key="savingsSummary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="w-full bg-green-700/40 p-4 rounded-lg mt-4"
                >
                  <p className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                    <SavingsIcon className="w-6 h-6" /> Potential Savings:
                  </p>
                  <p className="text-3xl font-extrabold text-white drop-shadow-lg">
                    Interest Saved: {formatCurrency(calculations.interestSaved)}
                  </p>
                  <p className="text-lg mt-2">
                    Time Saved: {calculations.formatMonths(calculations.timeSavedMonths)}
                  </p>
                </motion.div>
              )}

              {/* Edge Case Message */}
              {(calculations.regularPayoffTime === "Never" || calculations.acceleratedPayoffTime === "Never") && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center text-yellow-200 text-base"
                >
                  <MinusCircle className="inline-block w-5 h-5 mr-2" /> Monthly payment is too low and may never pay off the debt.
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Debt Payoff Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Debt Payoff Calculator is a powerful financial tool designed to help you visualize and plan your journey to becoming debt-free. By inputting key details such as your current debt balance, the annual interest rate, and your regular monthly payment, the calculator estimates how long it will take you to pay off the debt completely and the total amount of interest you'll incur. Crucially, it also allows you to experiment with making additional payments, demonstrating how even small extra contributions can significantly reduce your payoff time and save you thousands in interest, empowering you to take control of your financial future.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Debt Payoff Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Current Debt Balance:</strong> Input the total outstanding amount you owe on your loan or credit card. This is your starting point.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Annual Interest Rate:</strong> Enter the annual interest rate charged on your debt. This is crucial as it dictates how much of your payment goes towards interest versus principal.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Current Monthly Payment:</strong> Provide the minimum or regular monthly payment you currently make towards the debt.</motion.li>
              <motion.li variants={itemVariants}><strong>Add Optional Additional Monthly Payment:</strong> This is where you can see the magic! Enter any extra amount you can afford to pay each month. Even a small amount can make a big difference.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Payoff Insights:</strong> The calculator will instantly display two scenarios:
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li><strong>Regular Payoff:</strong> How long it takes and total interest paid with your current payment.</li>
                  <li><strong>Accelerated Payoff:</strong> How much faster you can pay it off and how much interest you save by adding the extra payment.</li>
                </ul>
              </motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Debt Payoff Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Visualize Debt Freedom:</strong> Provides a clear timeline to becoming debt-free, turning an abstract goal into a concrete plan.</motion.li>
              <motion.li variants={itemVariants}><strong>Maximize Interest Savings:</strong> Demonstrates the significant amount of interest you can save by making even small additional payments, motivating you to pay more than the minimum.</motion.li>
              <motion.li variants={itemVariants}><strong>Empower Financial Decisions:</strong> Helps you make informed choices about how to allocate your extra funds – whether to pay off debt or invest – by showing the direct financial impact.</motion.li>
              <motion.li variants={itemVariants}><strong>Reduce Financial Stress:</strong> Having a clear plan to eliminate debt can greatly reduce anxiety and improve your overall financial well-being.</motion.li>
              <motion.li variants={itemVariants}><strong>Improve Credit Score:</strong> Paying off debt faster reduces your credit utilization and demonstrates responsible financial behavior, which can positively impact your credit score.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Debt Payoff Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Debt Balance:</strong> The total outstanding amount of money you currently owe on a loan or credit line.</motion.p>
              <motion.p variants={itemVariants}><strong>Annual Interest Rate:</strong> The percentage charged by the lender on the outstanding debt balance over one year. This is converted to a monthly rate for calculations.</motion.p>
              <motion.p variants={itemVariants}><strong>Monthly Payment:</strong> The fixed amount you pay each month towards your debt. This payment covers both interest and a portion of the principal.</motion.p>
              <motion.p variants={itemVariants}><strong>Additional Payment:</strong> Any extra amount you pay above your regular monthly payment. This extra amount directly reduces the principal, accelerating payoff and saving interest.</motion.p>
              <motion.p variants={itemVariants}><strong>Total Interest Paid:</strong> The cumulative amount of interest paid over the entire life of the debt until it is fully repaid.</motion.p>
              <motion.p variants={itemVariants}><strong>Total Amount Paid:</strong> The sum of the original debt balance and the total interest paid over the life of the debt.</motion.p>
              <motion.p variants={itemVariants}><strong>Payoff Time:</strong> The total duration (in months or years and months) it takes to fully repay the debt.</motion.p>
              <motion.p variants={itemVariants}><strong>Principal:</strong> The original amount of money borrowed or the remaining balance of the loan, excluding interest.</motion.p>
              <motion.p variants={itemVariants}><strong>Amortization:</strong> The process of paying off debt over time through regular payments, where each payment covers both interest and a portion of the principal.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Faster Debt Payoff
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForFasterDebtPayoff.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Debt Management Needs?
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
              Ready to Conquer Your Debt?
            </motion.h2>
            <motion.p
              className="text-lg text-red-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart offers comprehensive financial tools, expert advice, and tailored solutions
              to help you manage debt, consolidate loans, and accelerate your path to financial freedom.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Debt Consolidation & Management"
                  openApplyModal={openApplyModal}
                  className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Explore Debt Solutions
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Explore Debt Solutions</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default DebtPayoffCalculatorPage;
