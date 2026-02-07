import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank,
  HandCoins, CreditCard, Clock, Hourglass, PiggyBank as SavingsIcon, MinusCircle, Landmark,
  ArrowRightLeft, BadgePercent, ShieldAlert, Sparkles
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

// Function to calculate payoff details iteratively
const calculatePayoff = (
  balance: number,
  annualRate: number,
  monthlyPayment: number,
  promotionalPeriodMonths: number = 0, // For balance transfer specific calculations
  promotionalRate: number = 0 // For balance transfer specific calculations
): { months: number; totalInterest: number; totalPaid: number } => {
  if (balance <= 0) {
    return { months: 0, totalInterest: 0, totalPaid: 0 };
  }

  let remainingBalance = balance;
  let totalPaymentsMade = 0;
  let totalInterestAccrued = 0;
  let months = 0;
  const maxMonths = 1200; // Cap at 100 years to prevent infinite loops

  // Determine the effective monthly rate based on promotional period
  const getMonthlyRate = (currentMonth: number): number => {
    if (promotionalPeriodMonths > 0 && currentMonth <= promotionalPeriodMonths) {
      return promotionalRate / 100 / 12;
    }
    return annualRate / 100 / 12;
  };

  // If monthly payment is less than or equal to the initial interest, it will never be paid off
  if (monthlyPayment <= (balance * getMonthlyRate(1)) && monthlyPayment > 0) {
    return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
  }
  if (monthlyPayment <= 0) { // No payment, never pays off
    return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
  }

  while (remainingBalance > 0 && months < maxMonths) {
    months++;
    const currentMonthlyRate = getMonthlyRate(months);
    const interestThisMonth = remainingBalance * currentMonthlyRate;
    totalInterestAccrued += interestThisMonth;

    let principalPaidThisMonth = monthlyPayment - interestThisMonth;

    if (principalPaidThisMonth >= remainingBalance) {
      totalPaymentsMade += remainingBalance + interestThisMonth; // Last payment covers remaining principal + interest
      remainingBalance = 0;
      break; // Debt is paid off
    } else {
      remainingBalance -= principalPaidThisMonth;
      totalPaymentsMade += monthlyPayment;
    }
  }

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


// --- Main Balance Transfer Calculator Page Component ---
interface BalanceTransferCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const BalanceTransferCalculatorPage: React.FC<BalanceTransferCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States - Current Card
  const [currentBalance, setCurrentBalance] = useState<number>(200000);
  const [currentApr, setCurrentApr] = useState<number>(28); // Current credit card APR
  const [currentMonthlyPayment, setCurrentMonthlyPayment] = useState<number>(8000);

  // Calculator States - Balance Transfer Offer
  const [transferAmount, setTransferAmount] = useState<number>(200000); // Amount to transfer
  const [promoApr, setPromoApr] = useState<number>(0); // Promotional APR (e.g., 0%)
  const [promoPeriodMonths, setPromoPeriodMonths] = useState<number>(12); // Promotional period in months
  const [transferFeePercent, setTransferFeePercent] = useState<number>(3); // Balance transfer fee as percentage
  const [postPromoApr, setPostPromoApr] = useState<number>(20); // APR after promotional period

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for inputs
  const handleCurrentBalanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setCurrentBalance(Number(value));
    setTransferAmount(Number(value)); // Update transfer amount when current balance changes
  };
  const handleCurrentAprChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentApr(Number(e.target.value));
  };
  const handleCurrentMonthlyPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setCurrentMonthlyPayment(Number(value));
  };
  const handleTransferAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setTransferAmount(Number(value));
  };
  const handlePromoAprChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoApr(Number(e.target.value));
  };
  const handlePromoPeriodMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromoPeriodMonths(Number(e.target.value));
  };
  const handleTransferFeePercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTransferFeePercent(Number(e.target.value));
  };
  const handlePostPromoAprChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostPromoApr(Number(e.target.value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Calculations
  const calculations = useMemo(() => {
    // Format months into years and months
    const formatMonths = (totalMonths: number) => {
      if (totalMonths === Infinity) return "Never";
      const years = Math.floor(totalMonths / 12);
      const months = totalMonths % 12;
      return `${years} Years, ${months} Months`;
    };

    // Scenario 1: Keep current card
    const currentCardResult = calculatePayoff(currentBalance, currentApr, currentMonthlyPayment);

    // Scenario 2: With Balance Transfer
    const transferFeeAmount = transferAmount * (transferFeePercent / 100);
    const effectiveTransferBalance = transferAmount + transferFeeAmount;

    // Calculate payoff for the transferred amount considering promo period
    let transferredBalanceRemaining = effectiveTransferBalance;
    let transferredTotalInterest = 0;
    let transferredTotalPayments = 0;
    let transferredMonths = 0;
    const maxMonths = 1200; // Cap to prevent infinite loops

    while (transferredBalanceRemaining > 0 && transferredMonths < maxMonths) {
      transferredMonths++;
      const currentMonthlyRate = (transferredMonths <= promoPeriodMonths)
        ? promoApr / 100 / 12
        : postPromoApr / 100 / 12;

      const interestThisMonth = transferredBalanceRemaining * currentMonthlyRate;
      transferredTotalInterest += interestThisMonth;

      let principalPaidThisMonth = currentMonthlyPayment - interestThisMonth;

      if (principalPaidThisMonth >= transferredBalanceRemaining) {
        transferredTotalPayments += transferredBalanceRemaining + interestThisMonth;
        transferredBalanceRemaining = 0;
        break;
      } else {
        transferredBalanceRemaining -= principalPaidThisMonth;
        transferredTotalPayments += currentMonthlyPayment;
      }
    }

    if (transferredBalanceRemaining > 0) {
      transferredMonths = Infinity;
      transferredTotalInterest = Infinity;
      transferredTotalPayments = Infinity;
    } else {
      transferredTotalInterest = Math.round(transferredTotalInterest);
      transferredTotalPayments = Math.round(transferredTotalPayments);
    }

    const totalSavings = (currentCardResult.totalInterest !== Infinity && transferredTotalInterest !== Infinity)
      ? currentCardResult.totalInterest - transferredTotalInterest
      : 0;
    const timeSavedMonths = (currentCardResult.months !== Infinity && transferredMonths !== Infinity)
      ? currentCardResult.months - transferredMonths
      : 0;

    return {
      currentCardPayoffTime: formatMonths(currentCardResult.months),
      currentCardTotalInterest: currentCardResult.totalInterest,
      currentCardTotalPaid: currentCardResult.totalPaid,
      transferredPayoffTime: formatMonths(transferredMonths),
      transferredTotalInterest: transferredTotalInterest,
      transferredTotalPaid: transferredTotalPayments,
      transferFeeAmount: Math.round(transferFeeAmount),
      totalSavings: Math.round(totalSavings),
      timeSaved: formatMonths(timeSavedMonths),
      isCurrentPayoffPossible: currentCardResult.months !== Infinity,
      isTransferPayoffPossible: transferredMonths !== Infinity,
    };
  }, [
    currentBalance, currentApr, currentMonthlyPayment,
    transferAmount, promoApr, promoPeriodMonths, transferFeePercent, postPromoApr
  ]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Balance Transfer Calculator?",
      answer: "A Balance Transfer Calculator is a financial tool that helps you evaluate the potential savings and payoff time if you transfer your existing high-interest credit card debt to a new credit card with a lower, often promotional 0% or low, interest rate. It compares your current debt scenario with the balance transfer offer, including any fees, to show the financial benefits."
    },
    {
      question: "How does a balance transfer work?",
      answer: "A balance transfer involves moving debt from one or more credit cards (or other high-interest accounts) to a new credit card, typically one offering a promotional low or 0% APR for a set period. The goal is to pay off the transferred balance during this introductory period, saving significantly on interest charges. A balance transfer fee (usually 3-5% of the transferred amount) is common."
    },
    {
      question: "Who is a balance transfer suitable for?",
      answer: "Balance transfers are best for individuals with:<ul><li>Good credit scores (to qualify for the best offers).</li><li>A clear plan to pay off the transferred balance before the promotional period ends.</li><li>Manageable debt that can realistically be paid off within the introductory period.</li><li>Discipline to avoid accumulating new debt on the old or new card.</li></ul>"
    },
    {
      question: "What are the common fees associated with balance transfers?",
      answer: "The most common fee is the **balance transfer fee**, typically 3% to 5% of the amount transferred. Some cards may also charge an annual fee. It's crucial to factor these fees into your calculations, as they can sometimes offset the interest savings, especially for smaller balances or shorter promotional periods."
    },
    {
      question: "What happens if I don't pay off the balance before the promotional period ends?",
      answer: "If you don't pay off the transferred balance by the end of the promotional period, the remaining balance will revert to the standard (and often much higher) APR. In some cases, especially with deferred interest offers, interest can be retroactively applied from the original transfer date, leading to a significant unexpected cost. Always read the terms carefully!"
    },
    {
      question: "Will a balance transfer affect my credit score?",
      answer: "A balance transfer can have both short-term and long-term effects. Initially, a hard inquiry for the new card and a new account opening might slightly lower your score. However, in the long term, if you successfully pay down debt and reduce your credit utilization ratio, your credit score is likely to improve significantly."
    },
    {
      question: "What are some alternatives to a balance transfer?",
      answer: "Alternatives include:<ul><li><strong>Debt Consolidation Loan:</strong> A personal loan with a fixed, lower interest rate to pay off multiple debts.</li><li><strong>Debt Management Plan:</strong> Working with a credit counseling agency to negotiate lower interest rates and a structured payment plan.</li><li><strong>Debt Snowball/Avalanche:</strong> Self-managed strategies to pay off debt systematically.</li><li><strong>Negotiating with Creditors:</strong> Sometimes, credit card companies might offer a lower interest rate if you call and explain your situation.</li></ul>"
    }
  ];

  const tipsForSuccessfulBalanceTransfer = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Ensure you can pay off the transferred balance before the promotional APR expires." },
    { icon: <BadgePercent className="w-6 h-6 text-blue-500" />, text: "Calculate the balance transfer fee and ensure the savings outweigh this cost." },
    { icon: <PiggyBank className="w-6 h-6 text-yellow-500" />, text: "Avoid making new purchases on the balance transfer card during the promotional period." },
    { icon: <CreditCard className="w-6 h-6 text-purple-500" />, text: "Close old credit card accounts strategically after transfer, but keep some open for credit history." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Set up automatic payments for the new card to avoid missing payments and losing the promo rate." },
    { icon: <Clock className="w-6 h-6 text-red-500" />, text: "Monitor your credit score before and after the transfer to track its impact." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Compare Top Offers", description: "Access and compare the best balance transfer credit card offers from leading banks." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Debt Advisory", description: "Connect with certified financial advisors for personalized guidance on debt consolidation strategies." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Personal Loan Alternatives", description: "Explore lower-interest personal loans as an alternative to balance transfers for debt consolidation." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Credit Score Insights", description: "Understand how balance transfers and debt management impact your credit score and financial health." },
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
            Maximize Your Savings with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Balance Transfer Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Determine how much you can save by transferring your high-interest credit card debt.
            Find your path to faster debt freedom.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Balance Transfer & Debt Consolidation"
                openApplyModal={openApplyModal}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Explore Balance Transfer Offers
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Balance Transfer Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-blue-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-purple-500" /> Balance Transfer Savings Estimator
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-blue-600" /> Your Debt & Offer Details
              </h3>

              {/* Current Credit Card Balance */}
              <motion.div variants={itemVariants}>
                <label htmlFor="currentBalance" className="block text-lg font-semibold text-gray-700 mb-2">
                  Current Credit Card Balance: <span className="text-indigo-600">{formatCurrency(currentBalance)}</span>
                </label>
                <input
                  type="range"
                  id="currentBalance"
                  min="50000"
                  max="1000000"
                  step="10000"
                  value={currentBalance}
                  onChange={handleCurrentBalanceChange}
                  className="w-full h-2 bg-gradient-to-r from-indigo-300 to-indigo-500 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(currentBalance)}
                  onChange={handleCurrentBalanceChange}
                  onBlur={(e) => setCurrentBalance(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Current APR */}
              <motion.div variants={itemVariants}>
                <label htmlFor="currentApr" className="block text-lg font-semibold text-gray-700 mb-2">
                  Current APR (%): <span className="text-teal-600">{currentApr}%</span>
                </label>
                <input
                  type="range"
                  id="currentApr"
                  min="15"
                  max="35"
                  step="0.5"
                  value={currentApr}
                  onChange={handleCurrentAprChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="number"
                  value={currentApr}
                  onChange={handleCurrentAprChange}
                  onBlur={(e) => setCurrentApr(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  step="0.1"
                />
              </motion.div>

              {/* Current Monthly Payment */}
              <motion.div variants={itemVariants}>
                <label htmlFor="currentMonthlyPayment" className="block text-lg font-semibold text-gray-700 mb-2">
                  Planned Monthly Payment: <span className="text-orange-600">{formatCurrency(currentMonthlyPayment)}</span>
                </label>
                <input
                  type="range"
                  id="currentMonthlyPayment"
                  min="1000"
                  max="20000"
                  step="500"
                  value={currentMonthlyPayment}
                  onChange={handleCurrentMonthlyPaymentChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(currentMonthlyPayment)}
                  onChange={handleCurrentMonthlyPaymentChange}
                  onBlur={(e) => setCurrentMonthlyPayment(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              <div className="border-t border-gray-200 pt-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <ArrowRightLeft className="w-6 h-6 mr-2 text-purple-600" /> Balance Transfer Offer
                </h3>
              </div>

              {/* Transfer Amount */}
              <motion.div variants={itemVariants}>
                <label htmlFor="transferAmount" className="block text-lg font-semibold text-gray-700 mb-2">
                  Amount to Transfer: <span className="text-red-600">{formatCurrency(transferAmount)}</span>
                </label>
                <input
                  type="range"
                  id="transferAmount"
                  min="0"
                  max={currentBalance}
                  step="10000"
                  value={transferAmount}
                  onChange={handleTransferAmountChange}
                  className="w-full h-2 bg-gradient-to-r from-red-300 to-red-500 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(transferAmount)}
                  onChange={handleTransferAmountChange}
                  onBlur={(e) => setTransferAmount(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-red-500 focus:border-red-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Promotional APR */}
              <motion.div variants={itemVariants}>
                <label htmlFor="promoApr" className="block text-lg font-semibold text-gray-700 mb-2">
                  Promotional APR (%): <span className="text-green-600">{promoApr}%</span>
                </label>
                <input
                  type="range"
                  id="promoApr"
                  min="0"
                  max="10"
                  step="0.1"
                  value={promoApr}
                  onChange={handlePromoAprChange}
                  className="w-full h-2 bg-gradient-to-r from-green-300 to-green-500 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <input
                  type="number"
                  value={promoApr}
                  onChange={handlePromoAprChange}
                  onBlur={(e) => setPromoApr(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-green-500 focus:border-green-500 transition-all"
                  step="0.1"
                />
              </motion.div>

              {/* Promotional Period (Months) */}
              <motion.div variants={itemVariants}>
                <label htmlFor="promoPeriodMonths" className="block text-lg font-semibold text-gray-700 mb-2">
                  Promotional Period (Months): <span className="text-yellow-600">{promoPeriodMonths} Months</span>
                </label>
                <input
                  type="range"
                  id="promoPeriodMonths"
                  min="0"
                  max="24"
                  step="1"
                  value={promoPeriodMonths}
                  onChange={handlePromoPeriodMonthsChange}
                  className="w-full h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-lg appearance-none cursor-pointer accent-yellow-600"
                />
                <input
                  type="number"
                  value={promoPeriodMonths}
                  onChange={handlePromoPeriodMonthsChange}
                  onBlur={(e) => setPromoPeriodMonths(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                  min="0"
                  max="24"
                />
              </motion.div>

              {/* Balance Transfer Fee (%) */}
              <motion.div variants={itemVariants}>
                <label htmlFor="transferFeePercent" className="block text-lg font-semibold text-gray-700 mb-2">
                  Balance Transfer Fee (%): <span className="text-pink-600">{transferFeePercent}%</span>
                </label>
                <input
                  type="range"
                  id="transferFeePercent"
                  min="0"
                  max="5"
                  step="0.1"
                  value={transferFeePercent}
                  onChange={handleTransferFeePercentChange}
                  className="w-full h-2 bg-gradient-to-r from-pink-300 to-pink-500 rounded-lg appearance-none cursor-pointer accent-pink-600"
                />
                <input
                  type="number"
                  value={transferFeePercent}
                  onChange={handleTransferFeePercentChange}
                  onBlur={(e) => setTransferFeePercent(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-pink-500 focus:border-pink-500 transition-all"
                  step="0.1"
                />
              </motion.div>

              {/* Post-Promotional APR */}
              <motion.div variants={itemVariants}>
                <label htmlFor="postPromoApr" className="block text-lg font-semibold text-gray-700 mb-2">
                  Post-Promotional APR (%): <span className="text-gray-600">{postPromoApr}%</span>
                </label>
                <input
                  type="range"
                  id="postPromoApr"
                  min="15"
                  max="35"
                  step="0.5"
                  value={postPromoApr}
                  onChange={handlePostPromoAprChange}
                  className="w-full h-2 bg-gradient-to-r from-gray-300 to-gray-500 rounded-lg appearance-none cursor-pointer accent-gray-600"
                />
                <input
                  type="number"
                  value={postPromoApr}
                  onChange={handlePostPromoAprChange}
                  onBlur={(e) => setPostPromoApr(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-gray-500 focus:border-gray-500 transition-all"
                  step="0.1"
                />
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Savings Comparison</h3>

              {/* Current Card Scenario */}
              <motion.div
                key="currentCard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="w-full bg-blue-700/30 p-4 rounded-lg mb-4"
              >
                <p className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                  <CreditCard className="w-6 h-6" /> Current Card Payoff:
                </p>
                <p className="text-4xl font-extrabold text-yellow-300 drop-shadow-lg">
                  {calculations.currentCardPayoffTime}
                </p>
                <p className="text-lg mt-2">Total Interest: {formatCurrency(calculations.currentCardTotalInterest)}</p>
                <p className="text-lg">Total Paid: {formatCurrency(calculations.currentCardTotalPaid)}</p>
              </motion.div>

              {/* Balance Transfer Scenario */}
              <motion.div
                key="balanceTransfer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full bg-purple-700/30 p-4 rounded-lg mb-4 border-2 border-yellow-400"
              >
                <p className="text-xl font-semibold mb-2 flex items-center justify-center gap-2">
                  <ArrowRightLeft className="w-6 h-6" /> With Balance Transfer:
                </p>
                <p className="text-4xl font-extrabold text-yellow-300 drop-shadow-lg">
                  {calculations.transferredPayoffTime}
                </p>
                <p className="text-lg mt-2">Total Interest: {formatCurrency(calculations.transferredTotalInterest)}</p>
                <p className="text-lg">Total Paid: {formatCurrency(calculations.transferredTotalPaid)}</p>
                <p className="text-sm mt-2 text-purple-100">Transfer Fee: {formatCurrency(calculations.transferFeeAmount)}</p>
              </motion.div>

              {/* Savings Summary */}
              {(calculations.totalSavings > 0) && (
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
                    Interest Saved: {formatCurrency(calculations.totalSavings)}
                  </p>
                  <p className="text-lg mt-2">
                    Time Saved: {calculations.timeSaved}
                  </p>
                </motion.div>
              )}

              {/* Edge Case Messages */}
              {(!calculations.isCurrentPayoffPossible || !calculations.isTransferPayoffPossible) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center text-yellow-200 text-base"
                >
                  <ShieldAlert className="inline-block w-5 h-5 mr-2" /> Monthly payment is too low and may never pay off the debt in one or both scenarios.
                </motion.div>
              )}
               {(calculations.totalSavings <= 0 && calculations.isCurrentPayoffPossible && calculations.isTransferPayoffPossible) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-center text-yellow-200 text-base"
                >
                  <Info className="inline-block w-5 h-5 mr-2" /> A balance transfer may not save you money with these terms.
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

            .accent-pink-600::-webkit-slider-thumb { --tw-accent-color: #EC4899; }
            .accent-pink-600::-moz-range-thumb { --tw-accent-color: #EC4899; }

            .accent-gray-600::-webkit-slider-thumb { --tw-accent-color: #4B5563; }
            .accent-gray-600::-moz-range-thumb { --tw-accent-color: #4B5563; }

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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Balance Transfer Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Balance Transfer Calculator is a specialized financial tool designed to help you analyze the potential benefits of moving high-interest credit card debt to a new credit card, typically one offering a promotional 0% or low Annual Percentage Rate (APR) for a limited period. This calculator allows you to compare your current debt repayment scenario with a potential balance transfer scenario, taking into account factors like the transfer amount, promotional APR, promotional period, and any balance transfer fees. It provides a clear picture of how much interest you could save and how quickly you might become debt-free by utilizing such an offer, empowering you to make an informed decision about managing your credit card debt.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Balance Transfer Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Input Current Credit Card Details:</strong> Enter your current outstanding credit card balance, its Annual Percentage Rate (APR), and your current monthly payment. This establishes your baseline scenario.</motion.li>
              <motion.li variants={itemVariants}><strong>Enter Balance Transfer Offer Details:</strong> Provide information about the balance transfer offer you're considering. This includes the amount you wish to transfer, the promotional APR (e.g., 0%), the length of the promotional period in months, the balance transfer fee percentage, and the APR that will apply after the promotional period ends.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Savings Comparison:</strong> The calculator will instantly display a side-by-side comparison. You'll see the estimated payoff time and total interest paid for your current card versus the same metrics if you utilize the balance transfer offer. It will also highlight your potential interest savings and time saved.</motion.li>
              <motion.li variants={itemVariants}><strong>Adjust and Optimize:</strong> Experiment with different monthly payment amounts on the transferred balance to see how quickly you can pay it off within the promotional period. Adjust the transfer amount or other offer details to find the most beneficial scenario for your financial situation.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Balance Transfer Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Quantify Potential Savings:</strong> Clearly shows the exact amount of interest you could save by making a balance transfer, providing strong motivation for debt reduction.</motion.li>
              <motion.li variants={itemVariants}><strong>Compare Scenarios:</strong> Allows for a direct comparison between keeping your current high-interest debt and leveraging a lower-interest transfer, helping you make an informed decision.</motion.li>
              <motion.li variants={itemVariants}><strong>Plan for Payoff:</strong> Helps you strategize how much you need to pay each month to clear the transferred balance before the promotional rate expires, maximizing your benefits.</motion.li>
              <motion.li variants={itemVariants}><strong>Understand True Costs:</strong> Factors in balance transfer fees, giving you a realistic understanding of the total cost of the transfer, not just the interest rate.</motion.li>
              <motion.li variants={itemVariants}><strong>Reduce Financial Stress:</strong> Gaining clarity and a clear plan to tackle high-interest debt can significantly alleviate anxiety and improve your overall financial well-being.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Balance Transfer Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Balance Transfer:</strong> The process of moving debt from one credit account (usually a high-interest credit card) to another, often to a new credit card with a lower or 0% introductory APR.</motion.p>
              <motion.p variants={itemVariants}><strong>Promotional APR:</strong> A temporary, low or 0% Annual Percentage Rate offered on transferred balances for a specific period (the promotional period).</motion.p>
              <motion.p variants={itemVariants}><strong>Promotional Period:</strong> The duration (in months) during which the special promotional APR applies to the transferred balance. After this period, the interest rate reverts to the standard APR.</motion.p>
              <motion.p variants={itemVariants}><strong>Balance Transfer Fee:</strong> A one-time fee, typically a percentage (e.g., 3% to 5%) of the amount transferred, charged by the new credit card issuer.</motion.p>
              <motion.p variants={itemVariants}><strong>Post-Promotional APR:</strong> The standard Annual Percentage Rate that will apply to any remaining balance after the promotional period ends.</motion.p>
              <motion.p variants={itemVariants}><strong>Credit Utilization Ratio:</strong> The amount of credit you're using compared to your total available credit. A balance transfer can initially impact this, but paying down the transferred balance improves it.</motion.p>
              <motion.p variants={itemVariants}><strong>Debt Consolidation:</strong> Combining multiple debts into a single, often lower-interest, payment, which a balance transfer can facilitate.</motion.p>
              <motion.p variants={itemVariants}><strong>Deferred Interest:</strong> A tricky term where interest is not charged during the promotional period, but if the balance isn't paid in full, interest from the original transfer date can be retroactively applied.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Sparkles className="w-8 h-8 mr-3 text-orange-500" /> Tips for a Successful Balance Transfer
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForSuccessfulBalanceTransfer.map((tip, index) => (
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
              Ready to Save on Your Credit Card Debt?
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart helps you find the best balance transfer offers and debt consolidation solutions
              to accelerate your journey to financial freedom.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Balance Transfer & Debt Solutions"
                  openApplyModal={openApplyModal}
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
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

export default BalanceTransferCalculatorPage;
