import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank,
  HandCoins, CreditCard, Clock, Hourglass, PiggyBank as SavingsIcon, MinusCircle, Landmark,
  ShieldAlert, Sparkles
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

// Function to calculate credit card payoff details iteratively
const calculateCreditCardPayoff = (
  balance: number,
  annualRate: number,
  monthlyPayment: number
): { months: number; totalInterest: number; totalPaid: number } => {
  if (balance <= 0) {
    return { months: 0, totalInterest: 0, totalPaid: 0 };
  }

  const monthlyInterestRate = annualRate / 100 / 12;
  let remainingBalance = balance;
  let totalPaymentsMade = 0;
  let months = 0;
  const maxMonths = 1200; // Cap at 100 years to prevent infinite loops

  // If monthly payment is less than or equal to the interest on the initial debt, it will never be paid off
  if (monthlyPayment <= (balance * monthlyInterestRate) && monthlyPayment > 0) {
    return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
  }
  if (monthlyPayment <= 0) { // No payment, never pays off
    return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
  }

  while (remainingBalance > 0 && months < maxMonths) {
    months++;
    const interestThisMonth = remainingBalance * monthlyInterestRate;
    
    let principalPaidThisMonth = monthlyPayment - interestThisMonth;

    // If the principal payment is more than what's left of the balance,
    // adjust the payment to exactly clear the debt.
    if (principalPaidThisMonth >= remainingBalance) {
      totalPaymentsMade += remainingBalance + interestThisMonth; // Last payment covers remaining principal + interest
      remainingBalance = 0;
      break; // Debt is paid off
    } else {
      remainingBalance -= principalPaidThisMonth;
      totalPaymentsMade += monthlyPayment;
    }
  }

  // If after maxIterations, debt is still > 0, it means it won't be paid off.
  if (remainingBalance > 0) {
    return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
  }

  const totalInterestPaid = totalPaymentsMade - balance;

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


// --- Main Credit Card Payoff Calculator Page Component ---
interface CreditCardPayoffCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const CreditCardPayoffCalculatorPage: React.FC<CreditCardPayoffCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [creditCardBalance, setCreditCardBalance] = useState<number>(150000);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(24); // Typical credit card APR
  const [monthlyPayment, setMonthlyPayment] = useState<number>(5000);
  const [additionalMonthlyPayment, setAdditionalMonthlyPayment] = useState<number>(0);

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for inputs
  const handleCreditCardBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setCreditCardBalance(Number(value));
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

  // Memoized Credit Card Payoff Calculations
  const calculations = useMemo(() => {
    const regularPayoff = calculateCreditCardPayoff(creditCardBalance, annualInterestRate, monthlyPayment);
    const acceleratedPayoff = calculateCreditCardPayoff(creditCardBalance, annualInterestRate, monthlyPayment + additionalMonthlyPayment);

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
  }, [creditCardBalance, annualInterestRate, monthlyPayment, additionalMonthlyPayment]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Credit Card Payoff Calculator?",
      answer: "A Credit Card Payoff Calculator is a financial tool that helps you determine how long it will take to pay off your credit card balance based on your current balance, interest rate (APR), and monthly payment. It also shows the total interest you'll pay and how making extra payments can significantly reduce your payoff time and save you money."
    },
    {
      question: "Why is it important to pay off credit card debt quickly?",
      answer: "Credit card debt often carries very high interest rates (APRs). Paying it off quickly minimizes the amount of interest you pay over time, frees up your monthly cash flow, improves your credit utilization ratio (which boosts your credit score), and reduces financial stress, allowing you to achieve other financial goals faster."
    },
    {
      question: "What is APR?",
      answer: "APR stands for Annual Percentage Rate. It's the annual rate charged for borrowing money, expressed as a percentage. For credit cards, it includes the interest rate plus any other fees. A higher APR means your debt grows faster if not paid off quickly."
    },
    {
      question: "How do credit card minimum payments work?",
      answer: "Credit card minimum payments are typically a small percentage of your outstanding balance (e.g., 1-3%) plus any accrued interest, or a fixed small amount (e.g., ₹500), whichever is higher. Paying only the minimum can lead to very long payoff times and significantly higher total interest paid due to compounding."
    },
    {
      question: "What strategies can help me pay off credit cards faster?",
      answer: "Popular strategies include:<ul><li><strong>Debt Avalanche:</strong> Focus on paying off the card with the highest APR first while making minimum payments on others. This saves the most money on interest.</li><li><strong>Debt Snowball:</strong> Focus on paying off the smallest balance first while making minimum payments on others. This provides psychological wins and momentum.</li><li><strong>Balance Transfer:</strong> Transfer high-interest balances to a new card with a 0% introductory APR (if eligible and you can pay it off before the intro period ends).</li><li><strong>Debt Consolidation Loan:</strong> Take out a personal loan with a lower interest rate to pay off multiple credit cards.</li></ul>"
    },
    {
      question: "Will paying off my credit card improve my credit score?",
      answer: "Yes, paying off credit card debt can significantly improve your credit score. It reduces your credit utilization ratio (the amount of credit you're using compared to your total available credit), which is a major factor in credit scoring. It also demonstrates responsible financial behavior."
    },
    {
      question: "What if I can only afford the minimum payment?",
      answer: "If you can only afford the minimum, it's crucial to understand the long-term cost. Try to find even a small amount extra to add to your payment. Consider cutting discretionary expenses, finding a side hustle, or exploring options like balance transfers or debt consolidation loans if your credit allows."
    }
  ];

  const tipsForCreditCardPayoff = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Always pay more than the minimum payment, even if it's a small amount." },
    { icon: <TrendingUp className="w-6 h-6 text-blue-500" />, text: "Prioritize cards with the highest APR first (Debt Avalanche method)." },
    { icon: <PiggyBank className="w-6 h-6 text-yellow-500" />, text: "Create a strict budget to free up extra cash specifically for debt repayment." },
    { icon: <CreditCard className="w-6 h-6 text-purple-500" />, text: "Consider a 0% APR balance transfer card if you can pay off the balance before the intro period ends." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Explore debt consolidation loans with lower interest rates to simplify payments." },
    { icon: <Clock className="w-6 h-6 text-red-500" />, text: "Avoid using credit cards while actively paying down your existing balances." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Personalized Debt Solutions", description: "Access tailored strategies and products to help you manage and reduce your credit card debt effectively." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Financial Advisory", description: "Connect with certified financial advisors for personalized guidance on debt management and financial planning." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Debt Consolidation Options", description: "Explore lower-interest personal loans or balance transfer options to consolidate high-interest credit card debt." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Credit Score Improvement", description: "Understand how effective credit card payoff strategies can positively impact your credit score over time." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-pink-600 to-red-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Conquer Your Credit Card Debt with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Payoff Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-pink-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Determine how long it will take to pay off your credit card and how much you can save.
            Accelerate your path to financial freedom.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Credit Card Debt Management"
                openApplyModal={openApplyModal}
                className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Debt Management Advice
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Credit Card Payoff Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-pink-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600 drop-shadow-md">
            <CreditCard className="inline-block w-9 h-9 mr-3 text-red-500" /> Credit Card Payoff Estimator
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <HandCoins className="w-6 h-6 mr-2 text-pink-600" /> Your Credit Card Details
              </h3>

              {/* Credit Card Balance */}
              <motion.div variants={itemVariants}>
                <label htmlFor="creditCardBalance" className="block text-lg font-semibold text-gray-700 mb-2">
                  Credit Card Balance: <span className="text-blue-600">{formatCurrency(creditCardBalance)}</span>
                </label>
                <input
                  type="range"
                  id="creditCardBalance"
                  min="10000"
                  max="1000000"
                  step="10000"
                  value={creditCardBalance}
                  onChange={handleCreditCardBalanceChange}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(creditCardBalance)}
                  onChange={handleCreditCardBalanceChange}
                  onBlur={(e) => setCreditCardBalance(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Annual Interest Rate (APR) */}
              <motion.div variants={itemVariants}>
                <label htmlFor="annualInterestRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Interest Rate (APR): <span className="text-teal-600">{annualInterestRate}%</span>
                </label>
                <input
                  type="range"
                  id="annualInterestRate"
                  min="10"
                  max="40"
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
                  Planned Monthly Payment: <span className="text-orange-600">{formatCurrency(monthlyPayment)}</span>
                </label>
                <input
                  type="range"
                  id="monthlyPayment"
                  min="1000"
                  max="20000"
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
                  max="10000"
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
            <div className="p-6 bg-gradient-to-br from-pink-500 to-red-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Payoff Plan</h3>

              {/* Regular Payoff */}
              <motion.div
                key="regularPayoff"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="w-full bg-pink-700/30 p-4 rounded-lg mb-4"
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
                  className="w-full bg-red-700/30 p-4 rounded-lg mb-4 border-2 border-yellow-400"
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
                  <ShieldAlert className="inline-block w-5 h-5 mr-2" /> Monthly payment is too low and may never pay off the debt.
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Credit Card Payoff Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Credit Card Payoff Calculator is an indispensable online tool designed to help you understand and strategize your path to becoming credit card debt-free. It empowers you by illustrating how your current credit card balance, annual interest rate (APR), and monthly payment interact to determine your payoff timeline and the total interest you'll incur. Crucially, it highlights the significant impact of making additional payments, showing how even a small increase in your monthly contribution can dramatically shorten your payoff period and save you thousands in interest, providing a clear and motivating roadmap to financial freedom.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Credit Card Payoff Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Credit Card Balance:</strong> Input the total outstanding balance on your credit card. This is the starting point of your debt.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Annual Interest Rate (APR):</strong> Enter the Annual Percentage Rate (APR) for your credit card. This is the cost of borrowing and significantly impacts your payoff.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Planned Monthly Payment:</strong> Provide the fixed amount you intend to pay each month towards your credit card debt. This should ideally be more than the minimum payment.</motion.li>
              <motion.li variants={itemVariants}><strong>Add Optional Additional Monthly Payment:</strong> This is where you can see the power of accelerated payments! Enter any extra amount you can afford to add to your monthly payment. Even small amounts can make a big difference.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Payoff Insights:</strong> The calculator will instantly display two scenarios:
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li><strong>Regular Payoff:</strong> How long it takes and total interest paid with your current planned payment.</li>
                  <li><strong>Accelerated Payoff:</strong> How much faster you can pay it off and how much interest you save by adding the extra payment.</li>
                </ul>
              </motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Credit Card Payoff Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Visualize Debt Freedom:</strong> Provides a clear, motivating timeline to becoming debt-free, turning a daunting task into an achievable goal.</motion.li>
              <motion.li variants={itemVariants}><strong>Maximize Interest Savings:</strong> Dramatically illustrates how much interest you can save by making even small additional payments, encouraging smarter financial habits.</motion.li>
              <motion.li variants={itemVariants}><strong>Empower Financial Decisions:</strong> Helps you understand the direct financial impact of your payment strategy, enabling you to make informed choices about debt repayment.</motion.li>
              <motion.li variants={itemVariants}><strong>Improve Credit Score:</strong> Paying off credit card debt faster reduces your credit utilization, a key factor in improving your credit score.</motion.li>
              <motion.li variants={itemVariants}><strong>Reduce Financial Stress:</strong> Having a concrete plan to eliminate high-interest debt can significantly alleviate anxiety and improve your overall financial well-being.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Credit Card Payoff Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Credit Card Balance:</strong> The total amount of money you currently owe on your credit card, including principal and accrued interest.</motion.p>
              <motion.p variants={itemVariants}><strong>APR (Annual Percentage Rate):</strong> The annual interest rate charged on your credit card balance, including any fees. It's the true cost of borrowing on an annual basis.</motion.p>
              <motion.p variants={itemVariants}><strong>Monthly Payment:</strong> The amount you pay each month towards your credit card debt. This includes a portion for interest and a portion for principal.</motion.p>
              <motion.p variants={itemVariants}><strong>Minimum Payment:</strong> The smallest amount you are required to pay each month to keep your account in good standing. Paying only the minimum can lead to very long payoff times.</motion.p>
              <motion.p variants={itemVariants}><strong>Additional Payment:</strong> Any extra amount you pay above your regular or minimum monthly payment. This extra money directly reduces your principal, saving you interest and shortening your payoff time.</motion.p>
              <motion.p variants={itemVariants}><strong>Total Interest Paid:</strong> The cumulative amount of interest you will pay over the entire period until your credit card balance is fully repaid.</motion.p>
              <motion.p variants={itemVariants}><strong>Payoff Time:</strong> The total duration (in months or years and months) it will take to fully repay your credit card debt.</motion.p>
              <motion.p variants={itemVariants}><strong>Credit Utilization Ratio:</strong> The amount of credit you're using compared to your total available credit. A lower ratio (typically below 30%) is better for your credit score.</motion.p>
              <motion.p variants={itemVariants}><strong>Balance Transfer:</strong> Moving debt from one credit card to another, often to take advantage of a lower or 0% introductory APR.</motion.p>
              <motion.p variants={itemVariants}><strong>Debt Consolidation Loan:</strong> A new loan used to pay off multiple existing debts, often at a lower overall interest rate and with a single monthly payment.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Sparkles className="w-8 h-8 mr-3 text-orange-500" /> Tips for Faster Credit Card Payoff
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForCreditCardPayoff.map((tip, index) => (
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
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-pink-50 to-red-50 border border-pink-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-pink-600 to-red-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Eliminate Credit Card Debt?
            </motion.h2>
            <motion.p
              className="text-lg text-pink-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart offers comprehensive financial tools, expert advice, and tailored solutions
              to help you manage credit card debt, consolidate loans, and achieve financial freedom.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Credit Card Debt Solutions"
                  openApplyModal={openApplyModal}
                  className="bg-white text-pink-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
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

export default CreditCardPayoffCalculatorPage;
