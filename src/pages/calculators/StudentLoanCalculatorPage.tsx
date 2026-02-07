import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calendar, Calculator, TrendingUp, DollarSign,
  GraduationCap, Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, ClipboardCopy, MessageSquare,
  BookOpen, Clock, TrendingDown
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


// --- Main Student Loan Calculator Page Component ---
interface StudentLoanCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const StudentLoanCalculatorPage: React.FC<StudentLoanCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [loanAmount, setLoanAmount] = useState<number>(1000000); // Total Student Loan Amount in INR
  const [interestRate, setInterestRate] = useState<number>(10.0); // Annual Interest Rate in %
  const [loanTenure, setLoanTenure] = useState<number>(10); // Repayment Loan Tenure in Years
  const [gracePeriod, setGracePeriod] = useState<number>(1); // Grace Period in Years (e.g., course duration + 6 months)

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for direct input fields (with formatting)
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setLoanAmount(Number(value));
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(Number(e.target.value));
  };

  const handleLoanTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanTenure(Number(e.target.value));
  };

  const handleGracePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGracePeriod(Number(e.target.value));
  };

  // Memoized Student Loan Calculation
  const calculations = useMemo(() => {
    const P = loanAmount;
    const R_annual = interestRate / 100; // Annual interest rate as decimal
    const R_monthly = R_annual / 12; // Monthly interest rate as decimal
    const N_repayment_months = loanTenure * 12; // Total repayment months

    let monthlyInterestDuringGrace = 0;
    let totalInterestDuringGrace = 0;
    let principalAfterGrace = P;
    let monthlyEMI = 0;
    let totalAmountPayable = 0;
    let totalInterestPayable = 0;

    // Calculate interest during grace period (simple interest usually)
    if (gracePeriod > 0) {
      monthlyInterestDuringGrace = (P * R_annual) / 12; // Simple interest per month
      totalInterestDuringGrace = monthlyInterestDuringGrace * gracePeriod * 12;
      principalAfterGrace = P + totalInterestDuringGrace; // Interest often capitalizes
    }

    // Calculate EMI for the repayment period
    if (principalAfterGrace > 0 && R_monthly > 0 && N_repayment_months > 0) {
      monthlyEMI = (principalAfterGrace * R_monthly * Math.pow(1 + R_monthly, N_repayment_months)) /
                   (Math.pow(1 + R_monthly, N_repayment_months) - 1);
      totalAmountPayable = monthlyEMI * N_repayment_months;
      totalInterestPayable = totalAmountPayable - principalAfterGrace + totalInterestDuringGrace;
    } else if (principalAfterGrace > 0 && R_monthly === 0 && N_repayment_months > 0) { // Handle 0% interest rate
      monthlyEMI = principalAfterGrace / N_repayment_months;
      totalAmountPayable = principalAfterGrace;
      totalInterestPayable = totalInterestDuringGrace;
    }

    return {
      monthlyInterestDuringGrace: Math.round(monthlyInterestDuringGrace),
      totalInterestDuringGrace: Math.round(totalInterestDuringGrace),
      principalAfterGrace: Math.round(principalAfterGrace),
      monthlyEMI: Math.round(monthlyEMI),
      totalAmountPayable: Math.round(totalAmountPayable),
      totalInterestPayable: Math.round(totalInterestPayable),
    };
  }, [loanAmount, interestRate, loanTenure, gracePeriod]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a student loan calculator and how does it help?",
      answer: "A student loan calculator helps you estimate your future monthly payments, total interest, and overall debt for an education loan. By inputting the loan amount, interest rate, and repayment tenure, you can plan your finances effectively and understand the long-term cost of your education."
    },
    {
      question: "What is a grace period in student loans?",
      answer: "A grace period is a duration after your course completion (or sometimes after loan disbursement) during which you are not required to make full EMI payments. Interest might still accrue during this period, which can be simple interest or capitalized into the principal."
    },
    {
      question: "How does the interest rate affect my student loan EMI?",
      answer: "The interest rate is a critical factor. A higher interest rate means a larger portion of your EMI goes towards interest, increasing your total repayment amount. Even small differences in interest rates can lead to significant savings or additional costs over the long term."
    },
    {
      question: "What is the typical repayment tenure for student loans in India?",
      answer: "Student loan repayment tenures in India typically range from 5 to 15 years, starting after the grace period. Longer tenures lead to lower monthly EMIs but higher total interest paid, while shorter tenures result in higher EMIs but less overall interest."
    },
    {
      question: "Are there tax benefits on education loans in India?",
      answer: "Yes, under Section 80E of the Income Tax Act, the interest paid on an education loan is fully deductible from your taxable income. This deduction is available for up to 8 consecutive assessment years or until the interest is fully paid, whichever is earlier."
    },
    {
      question: "What documents are required for a student loan application?",
      answer: "Common documents include identity proof (PAN, Aadhaar), address proof, academic records, admission letter from the institution, income proof of the co-applicant/parent, and collateral documents if applicable. Specific requirements vary by lender."
    },
    {
      question: "Can I get a student loan without collateral?",
      answer: "Yes, many banks and NBFCs offer unsecured (without collateral) education loans, especially for studies at premier institutions or for lower loan amounts. However, these often come with slightly higher interest rates or require a strong co-applicant."
    },
    {
      question: "What is the difference between domestic and international student loans?",
      answer: "Domestic student loans are for studies within India, while international student loans are for studies abroad. International loans often have different eligibility criteria, higher loan amounts, and may require collateral or a strong co-applicant due to higher associated costs."
    }
  ];

  const tipsForBestStudentLoan = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Start early research to compare various lenders and their offerings." },
    { icon: <Search className="w-6 h-6 text-blue-500" />, text: "Maintain a good academic record and credit score (for co-applicant) for better rates." },
    { icon: <Wallet className="w-6 h-6 text-yellow-500" />, text: "Understand the grace period and interest capitalization rules." },
    { icon: <Calendar className="w-6 h-6 text-purple-500" />, text: "Choose a repayment tenure that balances affordability and total interest." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Explore tax benefits under Section 80E to reduce your taxable income." },
    { icon: <TrendingDown className="w-6 h-6 text-red-500" />, text: "Consider partial interest payments during the grace period to reduce future principal." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Extensive Lender Network", description: "Compare student loan offers from a wide range of leading banks and financial institutions." },
    { icon: <ClipboardCopy className="w-16 h-16 text-green-400" />, title: "Simplified Application", description: "Enjoy a fully digital and streamlined application process, saving time and effort." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Expert Guidance", description: "Receive personalized advice and support from our education loan specialists at every step." },
    { icon: <TrendingUp className="w-16 h-16 text-purple-400" />, title: "Competitive Interest Rates", description: "Our platform helps you secure the most attractive interest rates tailored to your profile." },
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
            Invest in Your Future with{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-cyan-300">
              Smart Student Loan Planning.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-indigo-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Calculate monthly payments, interest accruals, and total debt for student loans.
            Plan your education financing with clarity and confidence.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Student Loan"
                openApplyModal={openApplyModal}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Apply for Student Loan Now
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Student Loan Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-indigo-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 drop-shadow-md">
            <GraduationCap className="inline-block w-9 h-9 mr-3 text-purple-500" /> Calculate Your Student Loan EMI
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-indigo-600" /> Loan Parameters
              </h3>

              {/* Loan Amount */}
              <motion.div variants={itemVariants}>
                <label htmlFor="loanAmount" className="block text-lg font-semibold text-gray-700 mb-2">
                  Total Loan Amount: <span className="text-blue-600">{formatCurrency(loanAmount)}</span>
                </label>
                <input
                  type="range"
                  id="loanAmount"
                  min="100000"
                  max="10000000"
                  step="10000"
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

              {/* Interest Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="interestRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Interest Rate: <span className="text-purple-600">{interestRate.toFixed(2)}%</span>
                </label>
                <input
                  type="range"
                  id="interestRate"
                  min="5"
                  max="15"
                  step="0.05"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="number"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  onBlur={(e) => setInterestRate(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  step="0.01"
                />
              </motion.div>

              {/* Repayment Loan Tenure */}
              <motion.div variants={itemVariants}>
                <label htmlFor="loanTenure" className="block text-lg font-semibold text-gray-700 mb-2">
                  Repayment Tenure: <span className="text-teal-600">{loanTenure} Years</span>
                </label>
                <input
                  type="range"
                  id="loanTenure"
                  min="5"
                  max="15" // Student loans typically 5-15 years repayment
                  step="1"
                  value={loanTenure}
                  onChange={handleLoanTenureChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="number"
                  value={loanTenure}
                  onChange={handleLoanTenureChange}
                  onBlur={(e) => setLoanTenure(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  min="5"
                  max="15"
                />
              </motion.div>

              {/* Grace Period */}
              <motion.div variants={itemVariants}>
                <label htmlFor="gracePeriod" className="block text-lg font-semibold text-gray-700 mb-2">
                  Grace Period (before repayment): <span className="text-orange-600">{gracePeriod} Years</span>
                </label>
                <input
                  type="range"
                  id="gracePeriod"
                  min="0"
                  max="5" // Max 5 years for grace period
                  step="1"
                  value={gracePeriod}
                  onChange={handleGracePeriodChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="number"
                  value={gracePeriod}
                  onChange={handleGracePeriodChange}
                  onBlur={(e) => setGracePeriod(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  min="0"
                  max="5"
                />
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Estimated Loan Details</h3>
              <motion.div
                key={calculations.monthlyEMI} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-lime-300 to-cyan-300 drop-shadow-lg"
              >
                {formatCurrency(calculations.monthlyEMI)}
              </motion.div>
              <p className="text-xl text-indigo-100 mb-8">Monthly EMI (After Grace Period)</p>

              <div className="w-full space-y-4 text-lg">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Total Loan Taken</span>
                  <span className="font-bold text-white">{formatCurrency(loanAmount)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Clock className="w-5 h-5" /> Interest During Grace Period</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalInterestDuringGrace)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Wallet className="w-5 h-5" /> Principal After Grace</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.principalAfterGrace)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Total Interest Payable</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalInterestPayable)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><BarChart className="w-5 h-5" /> Total Amount Payable</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalAmountPayable)}</span>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Student Loan Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A student loan calculator is an essential online tool designed to help students and their families plan for the financial aspects of higher education. It enables you to estimate future monthly loan payments, understand the total interest that will accrue, and get a clear picture of the overall debt burden. By inputting key variables such as the principal loan amount, the applicable interest rate, the repayment tenure, and any grace period, you can gain invaluable insights to make informed decisions about financing your education and managing your post-graduation finances effectively. This tool is a cornerstone for responsible financial planning for your academic journey.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Student Loan Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter the Total Loan Amount:</strong> Input the estimated total amount you plan to borrow for your education, covering tuition, living expenses, and other costs.</motion.li>
              <motion.li variants={itemVariants}><strong>Input the Interest Rate:</strong> Enter the annual interest rate offered by your potential lender. Student loan interest rates can vary, so compare offers carefully.</motion.li>
              <motion.li variants={itemVariants}><strong>Choose the Repayment Tenure:</strong> Select the number of years over which you intend to repay the loan after your studies. Longer tenures mean lower EMIs but higher total interest.</motion.li>
              <motion.li variants={itemVariants}><strong>Specify the Grace Period:</strong> This is the period after your course completion (or loan disbursement) before your full EMI payments begin. Interest may still accrue during this time.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Instant Results:</strong> As you adjust any of these parameters, the calculator instantly updates to show your estimated monthly EMI (after the grace period), the interest accrued during the grace period, the principal amount after grace, total interest payable, and the overall amount you'll pay back.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Student Loan Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Financial Planning:</strong> Get a clear roadmap of your financial obligations post-education, allowing you to budget effectively for your future career and lifestyle.</motion.li>
              <motion.li variants={itemVariants}><strong>Loan Comparison:</strong> Easily compare different loan offers by adjusting interest rates and tenures from various banks and institutions, helping you find the most affordable option.</motion.li>
              <motion.li variants={itemVariants}><strong>Interest Savings:</strong> Understand how factors like grace period interest capitalization and repayment tenure impact your total interest burden, enabling you to strategize for maximum savings.</motion.li>
              <motion.li variants={itemVariants}><strong>Debt Management:</strong> Visualize the total debt and monthly payments, empowering you to make proactive decisions about potential pre-payments or refinancing options down the line.</motion.li>
              <motion.li variants={itemVariants}><strong>Informed Decisions:</strong> Gain confidence in your education financing choices by having detailed financial projections at your fingertips, reducing stress and uncertainty.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Student Loan Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Loan Amount:</strong> The total sum of money borrowed to cover educational expenses, including tuition fees, living costs, books, and other related expenditures.</motion.p>
              <motion.p variants={itemVariants}><strong>Interest Rate:</strong> The annual percentage charged by the lender on the outstanding loan principal. This rate can be fixed or floating and significantly impacts your total repayment.</motion.p>
              <motion.p variants={itemVariants}><strong>Loan Tenure (Repayment Period):</strong> The duration, typically in years, over which you are required to repay the entire student loan. This period usually begins after the grace period ends.</motion.p>
              <motion.p variants={itemVariants}><strong>Grace Period (Moratorium Period):</strong> A specified period after your course completion or loan disbursement during which you are not obligated to make full EMI payments. Interest may still accrue and sometimes gets added to the principal.</motion.p>
              <motion.p variants={itemVariants}><strong>EMI (Equated Monthly Installment):</strong> The fixed monthly payment made to the lender during the repayment tenure, covering both the principal and interest components of the loan.</motion.p>
              <motion.p variants={itemVariants}><strong>Co-applicant/Guarantor:</strong> An individual (usually a parent or close relative) who co-signs the loan and is equally responsible for its repayment. Often required for unsecured loans or to improve eligibility.</motion.p>
              <motion.p variants={itemVariants}><strong>Collateral:</strong> An asset (like property or fixed deposit) pledged as security against the loan, typically required for larger loan amounts or for studies abroad.</motion.p>
              <motion.p variants={itemVariants}><strong>Tax Benefits (Section 80E):</strong> A provision under the Indian Income Tax Act that allows deduction of the entire interest paid on an education loan from your taxable income for up to 8 years.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Getting the Best Student Loan
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForBestStudentLoan.map((tip, index) => (
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
              <GraduationCap className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Student Loan?
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Fund Your Education Journey?
            </motion.h2>
            <motion.p
              className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Take the next step towards securing your academic future. Apply for a student loan through
              BanksCart and get competitive offers from top lenders, all with seamless digital processing.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Student Loan - Final CTA"
                  openApplyModal={openApplyModal}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Apply for a Student Loan
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Apply for a Student Loan</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default StudentLoanCalculatorPage;
