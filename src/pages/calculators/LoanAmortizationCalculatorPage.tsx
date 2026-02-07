import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank,
  HandCoins, CreditCard, Clock, Hourglass, PiggyBank as SavingsIcon, Landmark,
  Table, ScrollText, GitFork, // Icons for amortization
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


// --- Main Loan Amortization Calculator Page Component ---
interface LoanAmortizationCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const LoanAmortizationCalculatorPage: React.FC<LoanAmortizationCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [loanAmount, setLoanAmount] = useState<number>(5000000); // INR
  const [interestRate, setInterestRate] = useState<number>(8); // Annual percentage
  const [loanTermYears, setLoanTermYears] = useState<number>(15); // Years

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for inputs
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setLoanAmount(Number(value));
  };
  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(Number(e.target.value));
  };
  const handleLoanTermYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanTermYears(Number(e.target.value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Amortization Calculations
  const calculations = useMemo(() => {
    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = loanTermYears * 12;

    let monthlyPayment = 0;
    if (monthlyInterestRate === 0) {
      monthlyPayment = loanAmount / numberOfPayments;
    } else {
      monthlyPayment = (loanAmount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    }

    let remainingBalance = loanAmount;
    let totalInterestPaid = 0;
    let totalPrincipalPaid = 0;
    const amortizationSchedule = [];

    for (let i = 1; i <= numberOfPayments; i++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      let principalPayment = monthlyPayment - interestPayment;

      // Adjust last payment to account for rounding errors
      if (i === numberOfPayments) {
        principalPayment = remainingBalance;
        monthlyPayment = principalPayment + interestPayment; // Adjust monthly payment for last month
      }

      remainingBalance -= principalPayment;
      totalInterestPaid += interestPayment;
      totalPrincipalPaid += principalPayment;

      amortizationSchedule.push({
        month: i,
        monthlyPayment: monthlyPayment,
        principalPayment: principalPayment,
        interestPayment: interestPayment,
        remainingBalance: Math.max(0, remainingBalance), // Ensure balance doesn't go negative
      });

      if (remainingBalance <= 0 && i < numberOfPayments) {
        // If paid off early due to rounding, stop
        break;
      }
    }

    return {
      monthlyPayment: monthlyPayment,
      totalInterestPaid: totalInterestPaid,
      totalPrincipalPaid: totalPrincipalPaid,
      totalPaid: totalInterestPaid + loanAmount, // Total paid is principal (loan amount) + total interest
      amortizationSchedule: amortizationSchedule,
    };
  }, [loanAmount, interestRate, loanTermYears]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Loan Amortization Calculator?",
      answer: "A Loan Amortization Calculator is a financial tool that generates a detailed schedule of loan payments over its entire term. It breaks down each payment into its principal and interest components, showing how the allocation changes over time. This helps borrowers understand how much they are paying towards the loan balance versus the cost of borrowing."
    },
    {
      question: "How does loan amortization work?",
      answer: "Amortization is the process of gradually paying off a debt over time through a series of regular payments. In the early stages of a loan (like a mortgage), a larger portion of each payment goes towards interest, and a smaller portion goes towards principal. As the loan matures, the interest portion decreases, and the principal portion increases, until the loan is fully paid off."
    },
    {
      question: "Why is it important to see an amortization schedule?",
      answer: "An amortization schedule provides transparency into your loan repayment. It helps you:<ul><li>Understand the true cost of your loan (total interest paid).</li><li>See how quickly you're building equity (for mortgages).</li><li>Evaluate the impact of making extra payments (which reduces principal faster).</li><li>Plan your finances by knowing the exact breakdown of future payments.</li></ul>"
    },
    {
      question: "What is the difference between principal and interest?",
      answer: "<ul><li><strong>Principal:</strong> This is the original amount of money borrowed from the lender. Each payment reduces this outstanding balance.</li><li><strong>Interest:</strong> This is the cost of borrowing the principal amount, charged by the lender. It's the fee for using their money.</li></ul>In an amortizing loan, your monthly payment covers both a portion of the principal and the accrued interest."
    },
    {
      question: "Can I pay off my loan early?",
      answer: "Yes, making extra payments towards your loan's principal can significantly reduce the total interest paid and shorten the loan term. An amortization calculator can help you visualize these savings. Always check your loan agreement for any prepayment penalties before making large extra payments."
    },
    {
      question: "Does this calculator work for all types of loans?",
      answer: "This calculator is suitable for most fixed-rate, fully amortizing loans, such as home loans, personal loans, and car loans, where payments are made regularly (e.g., monthly) and the interest rate remains constant. It may not be accurate for adjustable-rate mortgages (ARMs), interest-only loans, or loans with irregular payment schedules."
    },
    {
      question: "What is an EMI?",
      answer: "EMI stands for Equated Monthly Installment. It's a fixed payment amount made by a borrower to a lender on a specified date each month. EMIs are used to pay off both the interest and principal components of a loan over a set period. Our calculator helps break down the EMI into its principal and interest parts."
    }
  ];

  const tipsForLoanManagement = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Understand the principal and interest split to see how your payments contribute to debt reduction." },
    { icon: <PiggyBank className="w-6 h-6 text-blue-500" />, text: "Consider making extra principal payments to save on total interest and shorten your loan term." },
    { icon: <Lightbulb className="w-6 h-6 text-yellow-500" />, text: "Review your loan amortization schedule annually to track your progress and financial health." },
    { icon: <TrendingUp className="w-6 h-6 text-purple-500" />, text: "Refinance your loan if interest rates drop significantly, but factor in new closing costs." },
    { icon: <Wallet className="w-6 h-6 text-orange-500" />, text: "Budget for your monthly loan payments, ensuring you can comfortably meet them." },
    { icon: <Clock className="w-6 h-6 text-red-500" />, text: "Be aware of any prepayment penalties before making large lump-sum payments." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Transparent Loan Insights", description: "Access tools that provide clear breakdowns of your loan payments and total costs." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Loan Advisory", description: "Connect with certified financial advisors for personalized guidance on loan management and repayment strategies." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Competitive Loan Offers", description: "Explore a wide range of loan products with transparent terms from leading financial institutions." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Financial Planning Support", description: "Utilize comprehensive resources to plan your finances effectively, including debt management." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-blue-600 to-cyan-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Understand Your Loan Repayment with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Loan Amortization Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            See how your loan payments are split between principal and interest over time.
            Gain full transparency into your debt repayment journey.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Loan Amortization & Planning"
                openApplyModal={openApplyModal}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Explore Loan Options
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Loan Amortization Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-blue-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-cyan-500" /> Loan Payment Breakdown
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <CreditCard className="w-6 h-6 mr-2 text-blue-600" /> Loan Details
              </h3>

              {/* Loan Amount */}
              <motion.div variants={itemVariants}>
                <label htmlFor="loanAmount" className="block text-lg font-semibold text-gray-700 mb-2">
                  Loan Amount: <span className="text-indigo-600">{formatCurrency(loanAmount)}</span>
                </label>
                <input
                  type="range"
                  id="loanAmount"
                  min="100000"
                  max="10000000"
                  step="50000"
                  value={loanAmount}
                  onChange={handleLoanAmountChange}
                  className="w-full h-2 bg-gradient-to-r from-indigo-300 to-indigo-500 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(loanAmount)}
                  onChange={handleLoanAmountChange}
                  onBlur={(e) => setLoanAmount(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Interest Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="interestRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Interest Rate (%): <span className="text-teal-600">{interestRate}%</span>
                </label>
                <input
                  type="range"
                  id="interestRate"
                  min="4"
                  max="20"
                  step="0.1"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="number"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  onBlur={(e) => setInterestRate(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  step="0.1"
                />
              </motion.div>

              {/* Loan Term Years */}
              <motion.div variants={itemVariants}>
                <label htmlFor="loanTermYears" className="block text-lg font-semibold text-gray-700 mb-2">
                  Loan Term (Years): <span className="text-orange-600">{loanTermYears} Years</span>
                </label>
                <input
                  type="range"
                  id="loanTermYears"
                  min="1"
                  max="30"
                  step="1"
                  value={loanTermYears}
                  onChange={handleLoanTermYearsChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="number"
                  value={loanTermYears}
                  onChange={handleLoanTermYearsChange}
                  onBlur={(e) => setLoanTermYears(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  min="1"
                  max="30"
                />
              </motion.div>
            </div>

            {/* Results Summary Section */}
            <div className="p-6 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Summary of Your Loan</h3>

              <p className="text-xl text-blue-100 mb-4">Estimated Monthly Payment:</p>
              <motion.div
                key={calculations.monthlyPayment} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
              >
                {formatCurrency(calculations.monthlyPayment)}
              </motion.div>

              <div className="w-full space-y-4 text-lg mt-8">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><DollarSign className="w-5 h-5" /> Total Principal Paid</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalPrincipalPaid)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Total Interest Paid</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalInterestPaid)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg border-t border-blue-500 pt-4 mt-4">
                  <span className="font-medium flex items-center gap-2"><Wallet className="w-5 h-5" /> Total Amount Paid</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalPaid)}</span>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Amortization Schedule Table */}
          <motion.div
            className="mt-12 bg-gray-50 rounded-2xl shadow-lg p-6 border border-gray-100"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
              <Table className="w-7 h-7 mr-2 text-cyan-600" /> Amortization Schedule
            </h3>
            <div className="overflow-x-auto max-h-96 custom-scrollbar">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 sticky top-0 z-10">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining Balance</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {calculations.amortizationSchedule.map((payment, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02, duration: 0.3 }}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.month}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(payment.monthlyPayment)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(payment.principalPayment)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(payment.interestPayment)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(payment.remainingBalance)}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <style jsx>{`
              .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
                height: 8px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: #f1f1f1;
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 10px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #555;
              }
            `}</style>
          </motion.div>
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

            .accent-cyan-600::-webkit-slider-thumb { --tw-accent-color: #06B6D4; }
            .accent-cyan-600::-moz-range-thumb { --tw-accent-color: #06B6D4; }

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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Loan Amortization Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Loan Amortization Calculator is a powerful financial tool that provides a detailed breakdown of your loan repayment schedule from start to finish. It illustrates how each of your regular payments (often monthly) is divided between paying down the loan's principal balance and covering the interest charges. This calculator allows you to input your loan amount, interest rate, and loan term, and it then generates a comprehensive table, showing for each payment period: the payment number, the amount going towards interest, the amount going towards principal, and the remaining loan balance. This transparency is invaluable for understanding the true cost of your loan and how your debt diminishes over time.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Loan Amortization Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Loan Amount:</strong> Input the total amount of money you have borrowed or plan to borrow.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Annual Interest Rate (%):</strong> Provide the annual interest rate of your loan. This is the cost of borrowing the money.</motion.li>
              <motion.li variants={itemVariants}><strong>Choose Loan Term (Years):</strong> Select the total duration over which you intend to repay the loan, in years.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Amortization Schedule:</strong> The calculator will instantly display:
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li><strong>Estimated Monthly Payment:</strong> The fixed amount you'll pay each month.</li>
                  <li><strong>Total Principal Paid:</strong> The total amount of the original loan balance you will repay.</li>
                  <li><strong>Total Interest Paid:</strong> The total cost of borrowing over the entire loan term.</li>
                  <li><strong>Total Amount Paid:</strong> The sum of total principal and total interest.</li>
                  <li><strong>Detailed Amortization Schedule:</strong> A table showing each payment, its principal and interest breakdown, and the remaining balance after each payment.</li>
                </ul>
              </motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Loan Amortization Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Financial Clarity:</strong> Gain a clear understanding of how your payments are applied, especially the early years when interest dominates.</motion.li>
              <motion.li variants={itemVariants}><strong>Budgeting and Planning:</strong> Helps you budget effectively by knowing the exact monthly outflow and planning for future financial milestones.</motion.li>
              <motion.li variants={itemVariants}><strong>Evaluate Extra Payments:</strong> Visualize the significant impact of making additional principal payments, showing how much interest you can save and how quickly you can pay off the loan.</motion.li>
              <motion.li variants={itemVariants}><strong>Equity Building (for Mortgages):</strong> For home loans, it clearly shows how your equity grows over time as you pay down the principal.</motion.li>
              <motion.li variants={itemVariants}><strong>Refinancing Decisions:</strong> Provides crucial data to help you decide if refinancing your loan would be financially beneficial by comparing new schedules.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Amortization Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Amortization:</strong> The process of gradually paying off a debt over a period of time in regular installments, where each payment covers both principal and interest.</motion.p>
              <motion.p variants={itemVariants}><strong>Principal:</strong> The original amount of money borrowed, or the remaining balance of the loan, on which interest is calculated.</motion.p>
              <motion.p variants={itemVariants}><strong>Interest:</strong> The cost of borrowing money, usually expressed as an annual percentage rate (APR).</motion.p>
              <motion.p variants={itemVariants}><strong>Loan Term:</strong> The total duration (e.g., in years or months) over which the loan is to be repaid.</motion.p>
              <motion.p variants={itemVariants}><strong>Monthly Payment (EMI):</strong> The fixed amount paid by the borrower to the lender each month, covering both principal and interest.</motion.p>
              <motion.p variants={itemVariants}><strong>Amortization Schedule:</strong> A table detailing each periodic loan payment, showing the amount of principal and interest contained in each payment, and the remaining loan balance.</motion.p>
              <motion.p variants={itemVariants}><strong>Equity:</strong> For a mortgage, it's the portion of the property's value that the homeowner owns outright, calculated as the property's market value minus the outstanding loan balance.</motion.p>
              <motion.p variants={itemVariants}><strong>Prepayment Penalty:</strong> A fee charged by some lenders if a borrower pays off their loan early or makes significant extra principal payments beyond the scheduled amount.</motion.p>
              <motion.p variants={itemVariants}><strong>Refinancing:</strong> The process of replacing an existing loan with a new loan, often to secure a lower interest rate, change the loan term, or convert an adjustable-rate loan to a fixed-rate loan.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Smart Loan Repayment
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForLoanManagement.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Loan Needs?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-blue-600 to-cyan-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Manage Your Loans Smarter?
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart provides comprehensive tools, expert advice, and tailored loan solutions
              to help you achieve financial freedom.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Loan Management & Advisory"
                  openApplyModal={openApplyModal}
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Get Personalized Loan Advice
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Get Personalized Loan Advice</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default LoanAmortizationCalculatorPage;
