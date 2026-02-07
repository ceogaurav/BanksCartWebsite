import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calendar, Calculator, TrendingUp, DollarSign,
  Zap, Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Hourglass, AlertTriangle, TrendingDown
} from 'lucide-react'; // Lucide icons
import ApplyButton from '../../components/common/ApplyButton';

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


// --- Main Payday Loan Calculator Page Component ---
interface PaydayLoanCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const PaydayLoanCalculatorPage: React.FC<PaydayLoanCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [loanAmount, setLoanAmount] = useState<number>(10000); // Principal Payday Loan Amount in INR
  const [loanTermDays, setLoanTermDays] = useState<number>(15); // Loan Term in Days
  const [feePer100, setFeePer100] = useState<number>(15); // Fee per ₹100 borrowed
  const [isFeePercentage, setIsFeePercentage] = useState<boolean>(false); // True for percentage, false for per ₹100

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for direct input fields (with formatting)
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setLoanAmount(Number(value));
  };

  const handleLoanTermDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanTermDays(Number(e.target.value));
  };

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeePer100(Number(e.target.value));
  };

  // Memoized Payday Loan Calculation
  const calculations = useMemo(() => {
    const P = loanAmount;
    const T_days = loanTermDays;
    const FeeRate = feePer100;

    let totalFee = 0;
    if (isFeePercentage) {
      totalFee = P * (FeeRate / 100);
    } else {
      totalFee = (P / 100) * FeeRate;
    }

    const totalRepayment = P + totalFee;

    // Calculate APR (Annual Percentage Rate)
    // APR = ((Fee / Principal) / (Loan Term in Days)) * 365 * 100
    let effectiveAPR = 0;
    if (P > 0 && T_days > 0) {
      effectiveAPR = ((totalFee / P) / T_days) * 365 * 100;
    }

    return {
      totalFee: Math.round(totalFee),
      totalRepayment: Math.round(totalRepayment),
      effectiveAPR: parseFloat(effectiveAPR.toFixed(2)), // Keep 2 decimal places for APR
    };
  }, [loanAmount, loanTermDays, feePer100, isFeePercentage]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a payday loan and how does it work?",
      answer: "A payday loan is a small, short-term, unsecured loan, typically due on your next payday. They are designed to provide quick cash for emergencies but come with very high fees and interest rates, often leading to a cycle of debt if not repaid promptly."
    },
    {
      question: "Why are payday loans considered high-cost?",
      answer: "Payday loans have extremely high Annual Percentage Rates (APRs) because their fees are applied over a very short loan term (e.g., 15-30 days). A fee of ₹15 per ₹100 borrowed for two weeks translates to an APR of over 300-400%, far higher than traditional loans."
    },
    {
      question: "What is a rollover or renewal of a payday loan?",
      answer: "A rollover or renewal occurs when you cannot repay the payday loan on its due date, so you pay an additional fee to extend the loan term. This is a common trap that significantly increases the total cost and can lead to a debt spiral."
    },
    {
      question: "What are the alternatives to payday loans?",
      answer: "Consider alternatives like personal loans from banks, credit union loans, asking for an advance from your employer, borrowing from family/friends, using a credit card (if interest is lower), or seeking assistance from local charities. These options usually have much lower costs."
    },
    {
      question: "What are the risks of not repaying a payday loan?",
      answer: "Failure to repay can lead to additional fees, late charges, damage to your credit score, aggressive collection practices, and potential legal action. The high costs can quickly accumulate, making it very difficult to escape the debt."
    },
    {
      question: "Are payday loans legal in India?",
      answer: "While the concept of 'payday loans' as seen in some Western countries isn't explicitly regulated under a specific law in India, some online lenders operate in a similar short-term, high-interest space. It's crucial to verify the lender's legitimacy and RBI registration."
    },
    {
      question: "How can I avoid needing a payday loan?",
      answer: "Building an emergency fund, creating a budget, cutting unnecessary expenses, and exploring credit counseling services can help you avoid the need for high-cost short-term loans. Financial planning is key to long-term stability."
    }
  ];

  const tipsForManagingPaydayLoans = [
    { icon: <AlertTriangle className="w-6 h-6 text-red-500" />, text: "Understand the full cost, especially the APR, before borrowing." },
    { icon: <Wallet className="w-6 h-6 text-yellow-500" />, text: "Prioritize repayment to avoid rollovers and escalating fees." },
    { icon: <TrendingDown className="w-6 h-6 text-green-500" />, text: "Explore all alternatives first; traditional loans are usually cheaper." },
    { icon: <Hourglass className="w-6 h-6 text-blue-500" />, text: "Borrow only what you absolutely need for a genuine emergency." },
    { icon: <CheckCircle className="w-6 h-6 text-purple-500" />, text: "Read the loan agreement carefully, understanding all terms and conditions." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Build an emergency fund to avoid relying on high-cost loans in the future." },
  ];

  const banksCartApproach = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Transparent Cost Analysis", description: "Our calculator helps you see the real cost of short-term loans, including high APRs." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Explore Safer Alternatives", description: "We guide you towards more affordable and sustainable financial solutions." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Financial Literacy Resources", description: "Access articles and tools to improve your financial health and avoid debt traps." },
    { icon: <CheckCircle className="w-16 h-16 text-purple-400" />, title: "Responsible Borrowing", description: "We advocate for responsible lending and borrowing practices for your long-term well-being." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-gray-700 to-gray-900 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Understand the True Cost of{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Payday Loans.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-gray-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Calculate the full cost, including fees and interest, and explore responsible short-term borrowing options.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Short-Term Loan Inquiry"
                openApplyModal={openApplyModal}
                className="bg-amber-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-amber-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50"
              >
                Explore Short-Term Options
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Payday Loan Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-amber-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-orange-500" /> Payday Loan Cost Calculator
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Zap className="w-6 h-6 mr-2 text-red-600" /> Loan Parameters
              </h3>

              {/* Loan Amount */}
              <motion.div variants={itemVariants}>
                <label htmlFor="loanAmount" className="block text-lg font-semibold text-gray-700 mb-2">
                  Loan Amount: <span className="text-blue-600">{formatCurrency(loanAmount)}</span>
                </label>
                <input
                  type="range"
                  id="loanAmount"
                  min="1000"
                  max="50000"
                  step="500"
                  value={loanAmount}
                  onChange={handleLoanAmountChange}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(loanAmount)}
                  onChange={handleLoanAmountChange}
                  onBlur={(e) => setLoanAmount(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Loan Term in Days */}
              <motion.div variants={itemVariants}>
                <label htmlFor="loanTermDays" className="block text-lg font-semibold text-gray-700 mb-2">
                  Loan Term: <span className="text-purple-600">{loanTermDays} Days</span>
                </label>
                <input
                  type="range"
                  id="loanTermDays"
                  min="7"
                  max="60" // Payday loans typically short term, up to 60 days
                  step="1"
                  value={loanTermDays}
                  onChange={handleLoanTermDaysChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="number"
                  value={loanTermDays}
                  onChange={handleLoanTermDaysChange}
                  onBlur={(e) => setLoanTermDays(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  min="7"
                  max="60"
                />
              </motion.div>

              {/* Fee Structure */}
              <motion.div variants={itemVariants}>
                <label htmlFor="feeInput" className="block text-lg font-semibold text-gray-700 mb-2">
                  Fee: <span className="text-teal-600">{feePer100}{isFeePercentage ? '%' : ' per ₹100'}</span>
                </label>
                <input
                  type="range"
                  id="feeInput"
                  min={isFeePercentage ? "5" : "5"} // Min 5% or ₹5 per ₹100
                  max={isFeePercentage ? "30" : "25"} // Max 30% or ₹25 per ₹100
                  step={isFeePercentage ? "0.5" : "0.5"}
                  value={feePer100}
                  onChange={handleFeeChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <div className="flex items-center mt-3">
                  <input
                    type="number"
                    value={feePer100}
                    onChange={handleFeeChange}
                    onBlur={(e) => setFeePer100(Number(e.target.value))}
                    className="flex-grow p-3 border border-gray-300 rounded-l-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                    min={isFeePercentage ? 5 : 5}
                    max={isFeePercentage ? 30 : 25}
                    step={0.1}
                  />
                  <button
                    onClick={() => {
                      setIsFeePercentage(!isFeePercentage);
                      // Reset fee value to a reasonable default when toggling type
                      setFeePer100(isFeePercentage ? 15 : 15); // If was %, set to 15 per 100, else 15%
                    }}
                    className="p-3 bg-teal-600 text-white rounded-r-lg font-semibold hover:bg-teal-700 transition-colors flex items-center gap-1"
                  >
                    <Percent className="w-5 h-5" /> {isFeePercentage ? '%' : '₹/₹100'}
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-red-500 to-orange-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Payday Loan Cost</h3>
              <motion.div
                key={calculations.totalRepayment} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-lime-300 drop-shadow-lg"
              >
                {formatCurrency(calculations.totalRepayment)}
              </motion.div>
              <p className="text-xl text-red-100 mb-8">Total Repayment Amount</p>

              <div className="w-full space-y-4 text-lg">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-red-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Loan Principal</span>
                  <span className="font-bold text-white">{formatCurrency(loanAmount)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-red-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><DollarSign className="w-5 h-5" /> Total Fees</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalFee)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-red-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Percent className="w-5 h-5" /> Effective Annual Rate (APR)</span>
                  <span className="font-bold text-white">{calculations.effectiveAPR}%</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-red-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Hourglass className="w-5 h-5" /> Loan Term</span>
                  <span className="font-bold text-white">{loanTermDays} Days</span>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Payday Loan Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A payday loan calculator is a vital tool for anyone considering a short-term, high-cost loan. Unlike traditional loan calculators that focus on monthly EMIs, this tool helps you understand the total cost of a payday loan, including all fees and the extremely high Annual Percentage Rate (APR). By inputting the loan amount, the loan term in days, and the fee structure, you can see exactly how much you'll need to repay and the effective interest rate, which is often significantly higher than standard loans. This transparency is crucial for making informed decisions and avoiding potential debt traps.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Payday Loan Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter the Loan Amount:</strong> Input the principal amount you intend to borrow. Payday loans are typically for smaller sums.</motion.li>
              <motion.li variants={itemVariants}><strong>Set the Loan Term:</strong> Specify the duration of the loan in days. Payday loans are short-term, usually ranging from a few days to a few weeks, often tied to your next salary date.</motion.li>
              <motion.li variants={itemVariants}><strong>Input the Fee Structure:</strong> Enter the fee charged by the lender. This can be a fixed amount per ₹100 borrowed or a percentage of the loan amount. Our calculator allows you to toggle between these options.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Instant Results:</strong> The calculator will immediately display the total fees you will pay, the total amount you need to repay (principal + fees), and, most importantly, the effective Annual Percentage Rate (APR). This APR is often surprisingly high due to the short loan term.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Payday Loan Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Full Cost Transparency:</strong> Unlike simple interest rates, the calculator reveals the true, often shocking, Annual Percentage Rate (APR), helping you understand the actual cost of borrowing for a short period.</motion.li>
              <motion.li variants={itemVariants}><strong>Avoid Debt Traps:</strong> By clearly seeing the high cost and short repayment window, you can make more informed decisions and potentially avoid the cycle of re-borrowing or 'rolling over' loans.</motion.li>
              <motion.li variants={itemVariants}><strong>Explore Alternatives:</strong> Understanding the high cost encourages you to seek out and compare more affordable financial solutions for your short-term needs.</motion.li>
              <motion.li variants={itemVariants}><strong>Budgeting Aid:</strong> Knowing the exact repayment amount and due date helps you plan your finances precisely to ensure timely repayment and avoid late fees.</motion.li>
              <motion.li variants={itemVariants}><strong>Empowered Decision Making:</strong> With clear data on hand, you are better equipped to decide if a payday loan is truly your only option or if a more sustainable solution exists.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Payday Loan Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Principal:</strong> The initial amount of money you borrow. For a payday loan, this is typically a small sum.</motion.p>
              <motion.p variants={itemVariants}><strong>Fee:</strong> The primary cost of a payday loan, often a flat fee per ₹100 borrowed or a percentage of the loan amount. This is charged upfront or added to the repayment sum.</motion.p>
              <motion.p variants={itemVariants}><strong>Loan Term:</strong> The short duration for which the loan is granted, usually ranging from 7 to 60 days, often coinciding with your next salary payment date.</motion.p>
              <motion.p variants={itemVariants}><strong>Total Repayment Amount:</strong> The sum of the principal loan amount plus all fees and interest that you must repay on the due date.</motion.p>
              <motion.p variants={itemVariants}><strong>APR (Annual Percentage Rate):</strong> The true annual cost of a loan, expressed as a percentage. For payday loans, the APR is exceptionally high due to the short repayment period, reflecting the actual borrowing cost.</motion.p>
              <motion.p variants={itemVariants}><strong>Rollover/Renewal:</strong> Extending the due date of a payday loan, usually by paying an additional fee. This significantly increases the total cost and can lead to a debt cycle.</motion.p>
              <motion.p variants={itemVariants}><strong>Debt Trap:</strong> A situation where a borrower is unable to repay a loan due to high interest rates or fees, leading them to take out new loans to pay off old ones, creating a continuous cycle of debt.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="w-8 h-8 mr-3 text-red-500" /> Tips for Managing Payday Loans & Alternatives
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForManagingPaydayLoans.map((tip, index) => (
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

          {/* BanksCart's Approach Section */}
          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> BanksCart's Approach to Short-Term Financial Needs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {banksCartApproach.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-gray-50 to-amber-50 border border-amber-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-gray-700 to-gray-900 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Need Short-Term Funds? Explore Responsible Options.
            </motion.h2>
            <motion.p
              className="text-lg text-gray-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart helps you understand the implications of short-term loans and guides you towards
              safer, more sustainable financial solutions for your immediate needs.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Short-Term Loan Alternatives"
                  openApplyModal={openApplyModal}
                  className="bg-amber-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-amber-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-amber-300 focus:ring-opacity-50"
                >
                  Connect with a Financial Advisor
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Connect with a Financial Advisor</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default PaydayLoanCalculatorPage;
