import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank,
  HandCoins, CreditCard, Clock, Hourglass, Sparkles, ShieldAlert, Landmark // Icons for credit card interest
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

// Function to calculate credit card interest and payoff details iteratively
const calculateCreditCardInterest = (
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
  let totalInterestAccrued = 0;
  let months = 0;
  const maxMonths = 1200; // Cap at 100 years to prevent infinite loops for too-low payments

  // Edge case: if monthly payment is less than or equal to the interest on the initial debt, it will never be paid off
  if (monthlyPayment <= (balance * monthlyInterestRate) && monthlyPayment > 0) {
    return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
  }
  if (monthlyPayment <= 0) { // No payment, never pays off
    return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
  }

  while (remainingBalance > 0 && months < maxMonths) {
    months++;
    const interestThisMonth = remainingBalance * monthlyInterestRate;
    totalInterestAccrued += interestThisMonth;

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

  return {
    months: months,
    totalInterest: Math.round(totalInterestAccrued),
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


// --- Main Credit Card Interest Calculator Page Component ---
interface CreditCardInterestCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const CreditCardInterestCalculatorPage: React.FC<CreditCardInterestCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [creditCardBalance, setCreditCardBalance] = useState<number>(100000);
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(20); // Typical credit card APR
  const [monthlyPayment, setMonthlyPayment] = useState<number>(3000);

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

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Credit Card Interest Calculations
  const calculations = useMemo(() => {
    const result = calculateCreditCardInterest(creditCardBalance, annualInterestRate, monthlyPayment);

    // Format months into years and months
    const formatMonths = (totalMonths: number) => {
      if (totalMonths === Infinity) return "Never";
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;
      return `${years} Years, ${months} Months`;
    };

    return {
      payoffTime: formatMonths(result.months),
      totalInterest: result.totalInterest,
      totalPaid: result.totalPaid,
      isPayoffPossible: result.months !== Infinity,
    };
  }, [creditCardBalance, annualInterestRate, monthlyPayment]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Credit Card Interest Calculator?",
      answer: "A Credit Card Interest Calculator is a financial tool that helps you understand the true cost of carrying a balance on your credit card. By inputting your outstanding balance, annual interest rate (APR), and your monthly payment, it estimates the total interest you'll pay and how long it will take to pay off the debt completely."
    },
    {
      question: "How is credit card interest calculated?",
      answer: "Credit card interest is typically calculated daily based on your Average Daily Balance (ADB) and then applied monthly. The Annual Percentage Rate (APR) is divided by 365 (or 360) to get a daily periodic rate, which is then multiplied by your ADB. This daily interest accrues and compounds, meaning you pay interest on previously accrued interest."
    },
    {
      question: "What is APR and why is it so high for credit cards?",
      answer: "APR (Annual Percentage Rate) is the yearly interest rate charged on your credit card balance. Credit card APRs are generally much higher than other types of loans because they are unsecured (no collateral) and carry higher risk for the lender. This high interest rate can make it difficult to pay off balances if only minimum payments are made."
    },
    {
      question: "What is the difference between interest rate and APR?",
      answer: "While often used interchangeably, the interest rate is the percentage charged on the principal. APR, on the other hand, includes the interest rate plus any additional fees or costs associated with the loan, giving you a more comprehensive picture of the annual cost of borrowing."
    },
    {
      question: "How can I reduce the interest I pay on my credit card?",
      answer: "To reduce interest:<ul><li><strong>Pay more than the minimum:</strong> Any extra principal payment directly reduces the balance on which interest is calculated.</li><li><strong>Pay off high-APR cards first:</strong> Focus on the cards with the highest interest rates.</li><li><strong>Balance Transfer:</strong> Transfer balances to a new card with a 0% introductory APR (if eligible and you can pay it off before the intro period ends).</li><li><strong>Debt Consolidation Loan:</strong> Get a personal loan with a lower interest rate to pay off credit cards.</li><li><strong>Negotiate:</strong> Sometimes, calling your credit card company can lead to a lower interest rate.</li></ul>"
    },
    {
      question: "Does paying interest affect my credit score?",
      answer: "Paying interest itself does not directly affect your credit score. However, carrying a high balance on which interest accrues means your credit utilization ratio is likely high, which *does* negatively impact your credit score. Paying down your balance, regardless of how much interest you've paid, will help your score."
    },
    {
      question: "What is the 'grace period' on a credit card?",
      answer: "A grace period is the time between the end of a billing cycle and the payment due date, during which interest is not charged on new purchases. If you pay your entire statement balance by the due date, you won't pay interest on those purchases. However, if you carry a balance, you usually lose your grace period, and interest starts accruing immediately on new purchases."
    }
  ];

  const tipsForManagingCreditCardInterest = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Always pay your credit card bill in full and on time to avoid interest and late fees." },
    { icon: <TrendingUp className="w-6 h-6 text-blue-500" />, text: "If you can't pay in full, aim to pay as much as possible above the minimum payment." },
    { icon: <PiggyBank className="w-6 h-6 text-yellow-500" />, text: "Prioritize paying off cards with the highest APR first to minimize total interest paid." },
    { icon: <CreditCard className="w-6 h-6 text-purple-500" />, text: "Consider a balance transfer to a 0% APR card if you have a good credit score and a plan to pay it off." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Avoid new purchases on cards with outstanding balances to prevent compounding interest." },
    { icon: <Clock className="w-6 h-6 text-red-500" />, text: "Regularly monitor your credit card statements for accuracy and to track interest charges." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Personalized Debt Solutions", description: "Access tailored strategies and products to help you manage and reduce your credit card debt effectively." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Financial Advisory", description: "Connect with certified financial advisors for personalized guidance on debt management and financial planning." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Balance Transfer Options", description: "Explore lower-interest personal loans or balance transfer options to consolidate high-interest credit card debt." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Credit Score Improvement", description: "Understand how effective credit card management can positively impact your credit score over time." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-red-600 to-pink-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Understand the True Cost of Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Credit Card Interest.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-red-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Calculate how much interest you’ll pay on outstanding credit card balances.
            Make informed decisions to save money and become debt-free.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Credit Card Debt Management"
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

        {/* Credit Card Interest Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-red-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-red-600 drop-shadow-md">
            <CreditCard className="inline-block w-9 h-9 mr-3 text-pink-500" /> Credit Card Interest Analyzer
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <HandCoins className="w-6 h-6 mr-2 text-red-600" /> Your Credit Card Details
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
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-pink-500 to-red-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Credit Card Cost</h3>

              {/* Total Interest Paid */}
              <motion.div
                key={calculations.totalInterest} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
              >
                {formatCurrency(calculations.totalInterest)}
              </motion.div>
              <p className="text-xl text-pink-100 mb-8">Estimated Total Interest Paid</p>

              <div className="w-full space-y-4 text-lg mt-8">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-pink-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><CreditCard className="w-5 h-5" /> Credit Card Balance</span>
                  <span className="font-bold text-white">{formatCurrency(creditCardBalance)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-pink-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Percent className="w-5 h-5" /> Annual Interest Rate (APR)</span>
                  <span className="font-bold text-white">{annualInterestRate}%</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-pink-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Monthly Payment</span>
                  <span className="font-bold text-white">{formatCurrency(monthlyPayment)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-pink-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Clock className="w-5 h-5" /> Estimated Payoff Time</span>
                  <span className="font-bold text-white">{calculations.payoffTime}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-pink-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><DollarSign className="w-5 h-5" /> Total Amount Paid</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalPaid)}</span>
                </motion.div>
              </div>

              {/* Edge Case Message */}
              {!calculations.isPayoffPossible && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center text-yellow-200 text-base"
                >
                  <ShieldAlert className="inline-block w-5 h-5 mr-2" /> Your monthly payment is too low and may never pay off the balance.
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Credit Card Interest Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Credit Card Interest Calculator is a crucial financial tool designed to shed light on the often-hidden costs of carrying a balance on your credit cards. It helps you quantify exactly how much interest you'll accrue over time based on your current outstanding balance, the card's Annual Percentage Rate (APR), and your planned monthly payment. By providing a clear projection of both the total interest paid and the estimated payoff timeline, this calculator empowers you to make informed decisions, whether that's increasing your payments to save money or exploring other debt management strategies.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Credit Card Interest Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Credit Card Balance:</strong> Input the total outstanding amount you currently owe on your credit card. This is your starting debt.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Annual Interest Rate (APR):</strong> Enter the Annual Percentage Rate (APR) associated with your credit card. You can usually find this on your credit card statement or agreement.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Planned Monthly Payment:</strong> Provide the fixed amount you intend to pay each month towards your credit card debt. Even if it's just the minimum, input that amount to see the long-term impact.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Credit Card Cost:</strong> The calculator will instantly display the Estimated Total Interest Paid over the life of the debt, the Estimated Payoff Time (in years and months), and the Total Amount Paid (balance + interest). This gives you a comprehensive view of your credit card's true cost.</motion.li>
              <motion.li variants={itemVariants}><strong>Adjust and Optimize:</strong> Experiment with increasing your monthly payment to see how dramatically it can reduce both your payoff time and the total interest you pay. This helps you find an optimal strategy for your budget.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Credit Card Interest Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Uncover Hidden Costs:</strong> Reveals the often-surprising amount of interest you'll pay, motivating you to tackle debt more aggressively.</motion.li>
              <motion.li variants={itemVariants}><strong>Accelerate Payoff:</strong> By showing the impact of increased payments, it encourages strategies that shorten your debt timeline.</motion.li>
              <motion.li variants={itemVariants}><strong>Empower Informed Decisions:</strong> Provides clear data to help you decide whether to prioritize credit card debt, explore balance transfers, or seek debt consolidation.</motion.li>
              <motion.li variants={itemVariants}><strong>Improve Financial Health:</strong> Understanding your interest burden is the first step towards reducing it, freeing up more money for savings and investments.</motion.li>
              <motion.li variants={itemVariants}><strong>Reduce Financial Stress:</strong> Gaining clarity and control over high-interest debt can significantly alleviate anxiety and improve your overall financial well-being.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Credit Card Interest Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Credit Card Balance:</strong> The total amount of money you owe on your credit card at a given time.</motion.p>
              <motion.p variants={itemVariants}><strong>APR (Annual Percentage Rate):</strong> The yearly interest rate charged on your credit card balance, including any fees. It's the total cost of borrowing for a year.</motion.p>
              <motion.p variants={itemVariants}><strong>Monthly Payment:</strong> The amount you pay each month towards your credit card debt, composed of both interest and principal.</motion.p>
              <motion.p variants={itemVariants}><strong>Minimum Payment:</strong> The smallest amount required by your credit card issuer to keep your account in good standing. Paying only this amount leads to slow payoff and high interest.</motion.p>
              <motion.p variants={itemVariants}><strong>Total Interest Paid:</strong> The cumulative sum of all interest charges over the entire period it takes to pay off the credit card balance.</motion.p>
              <motion.p variants={itemVariants}><strong>Payoff Time:</strong> The estimated duration, in years and months, required to fully repay the credit card debt based on your inputs.</motion.p>
              <motion.p variants={itemVariants}><strong>Compound Interest:</strong> Interest calculated on the initial principal and also on the accumulated interest from previous periods, causing debt to grow quickly.</motion.p>
              <motion.p variants={itemVariants}><strong>Credit Utilization Ratio:</strong> The amount of credit you're using compared to your total available credit. A high ratio negatively impacts your credit score.</motion.p>
              <motion.p variants={itemVariants}><strong>Balance Transfer:</strong> Moving debt from one credit card to another, often to a card with a lower or 0% introductory APR.</motion.p>
              <motion.p variants={itemVariants}><strong>Debt Consolidation Loan:</strong> A personal loan taken out to pay off multiple existing debts, typically at a lower overall interest rate and with a single monthly payment.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Sparkles className="w-8 h-8 mr-3 text-orange-500" /> Tips for Managing Credit Card Interest
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForManagingCreditCardInterest.map((tip, index) => (
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
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-red-50 to-pink-50 border border-red-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-red-600 to-pink-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Take Control of Your Credit Card Debt?
            </motion.h2>
            <motion.p
              className="text-lg text-red-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart offers comprehensive financial tools, expert advice, and tailored solutions
              to help you manage credit card debt, reduce interest, and achieve financial freedom.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Credit Card Interest Management"
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

export default CreditCardInterestCalculatorPage;
