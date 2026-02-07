import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calendar, Calculator, TrendingUp, DollarSign,
  Home, Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, ClipboardCopy, MessageSquare
} from 'lucide-react'; // Lucide icons
import ApplyButton from '../components/common/ApplyButton'; // Assuming this path is correct

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


// --- Main Mortgage Calculator Page Component ---
interface MortgageCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const MortgageCalculatorPage: React.FC<MortgageCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [homePrice, setHomePrice] = useState<number>(5000000); // Principal Amount in INR
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // Down Payment in %
  const [interestRate, setInterestRate] = useState<number>(8.5); // Annual Interest Rate in %
  const [loanTenure, setLoanTenure] = useState<number>(20); // Loan Tenure in Years

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for direct input fields (with formatting)
  const handleHomePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setHomePrice(Number(value));
  };

  const handleDownPaymentPercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDownPaymentPercent(Number(e.target.value));
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(Number(e.target.value));
  };

  const handleLoanTenureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanTenure(Number(e.target.value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Mortgage Calculation
  const calculations = useMemo(() => {
    const P_home = homePrice;
    const DP_percent = downPaymentPercent / 100;
    const R_annual = interestRate / 100; // Annual interest rate as decimal
    const N_years = loanTenure;

    const downPaymentAmount = P_home * DP_percent;
    const loanAmount = P_home - downPaymentAmount;

    const monthlyInterestRate = R_annual / 12; // Monthly interest rate as decimal
    const numberOfPayments = N_years * 12; // Total number of months

    let monthlyPI = 0; // Principal & Interest
    let totalAmountPayable = 0;
    let totalInterestPayable = 0;

    if (loanAmount > 0 && monthlyInterestRate > 0 && numberOfPayments > 0) {
      monthlyPI = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
                  (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
      totalAmountPayable = monthlyPI * numberOfPayments;
      totalInterestPayable = totalAmountPayable - loanAmount;
    } else if (loanAmount > 0 && monthlyInterestRate === 0 && numberOfPayments > 0) { // Handle 0% interest rate (unlikely for mortgage but good practice)
      monthlyPI = loanAmount / numberOfPayments;
      totalAmountPayable = loanAmount;
      totalInterestPayable = 0;
    }

    return {
      downPaymentAmount: Math.round(downPaymentAmount),
      loanAmount: Math.round(loanAmount),
      monthlyPI: Math.round(monthlyPI),
      totalAmountPayable: Math.round(totalAmountPayable),
      totalInterestPayable: Math.round(totalInterestPayable),
      // Add more details for amortization schedule if needed later
    };
  }, [homePrice, downPaymentPercent, interestRate, loanTenure]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a mortgage calculator and how does it work?",
      answer: "A mortgage calculator is an online tool that helps you estimate your monthly mortgage payments. You input the home price, down payment, interest rate, and loan term, and it calculates your principal and interest payments. Some calculators also include property taxes and home insurance."
    },
    {
      question: "What is EMI in the context of a home loan?",
      answer: "EMI stands for Equated Monthly Installment. It's a fixed payment amount made by a borrower to a lender on a specified date each month. It consists of both principal and interest components, ensuring the loan is fully paid off by the end of the tenure."
    },
    {
      question: "Are property taxes and home insurance included in the calculation?",
      answer: "While this calculator focuses on Principal & Interest (P&I), real-world mortgage payments often include Property Taxes and Home Insurance (PITI). You should factor these additional costs into your budget. Our calculator provides fields for these for a more comprehensive estimate."
    },
    {
      question: "How does the down payment affect my monthly EMI?",
      answer: "A larger down payment reduces the principal loan amount. This directly leads to lower monthly EMIs and less total interest paid over the life of the loan. It also might help you qualify for better interest rates."
    },
    {
      question: "What is the ideal loan tenure for a home loan?",
      answer: "The ideal loan tenure depends on your financial situation. Longer tenures mean lower EMIs but higher total interest paid. Shorter tenures mean higher EMIs but significant savings on total interest. It's a balance between affordability and total cost."
    },
    {
      question: "Can I pre-pay my home loan to reduce interest?",
      answer: "Yes, most home loans allow partial or full pre-payment. Making pre-payments can significantly reduce your total interest burden and shorten your loan tenure. Always check with your lender for specific pre-payment terms and charges."
    },
    {
      question: "What documents are typically required for a home loan application?",
      answer: "Common documents include identity proof (PAN, Aadhaar), address proof, income proof (salary slips, bank statements, ITR), property documents, and bank statements. The exact list can vary by lender and applicant profile."
    },
    {
      question: "How can I improve my eligibility for a home loan?",
      answer: "Maintain a good credit score, ensure stable employment, reduce existing debts, and make a higher down payment. A co-applicant can also improve eligibility."
    }
  ];

  const tipsForBestMortgage = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Improve your credit score to secure lower interest rates." },
    { icon: <Search className="w-6 h-6 text-blue-500" />, text: "Compare offers from multiple banks and financial institutions." },
    { icon: <Wallet className="w-6 h-6 text-yellow-500" />, text: "Aim for a higher down payment (20% or more) to reduce loan burden." },
    { icon: <Calendar className="w-6 h-6 text-purple-500" />, text: "Choose a loan tenure that balances affordability and total interest." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Factor in additional costs like property taxes, insurance, and maintenance." },
    { icon: <BarChart className="w-6 h-6 text-red-500" />, text: "Consider fixed vs. floating interest rates based on market outlook." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Unbiased Comparison", description: "Access and compare home loan offers from a wide range of top lenders." },
    { icon: <ClipboardCopy className="w-16 h-16 text-green-400" />, title: "Paperless Application", description: "Enjoy a fully digital and streamlined application process from start to finish." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Expert Guidance", description: "Get personalized advice and support from our loan specialists at every step." },
    { icon: <TrendingUp className="w-16 h-16 text-purple-400" />, title: "Best Rates Guaranteed", description: "Our platform helps you find the most competitive interest rates available in the market." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Your Dream Home, Calculated.
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Use our comprehensive Mortgage Calculator to estimate your monthly payments,
            total interest, and overall cost of your home loan. Make informed decisions
            about your real estate investments with detailed breakdowns and expert guidance.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Home Loan"
                openApplyModal={openApplyModal}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Apply for Home Loan Now
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Mortgage Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-blue-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-green-500" /> Calculate Your Mortgage EMI
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <DollarSign className="w-6 h-6 mr-2 text-green-600" /> Loan Parameters
              </h3>

              {/* Home Price */}
              <motion.div variants={itemVariants}>
                <label htmlFor="homePrice" className="block text-lg font-semibold text-gray-700 mb-2">
                  Home Price: <span className="text-blue-600">{formatCurrency(homePrice)}</span>
                </label>
                <input
                  type="range"
                  id="homePrice"
                  min="1000000"
                  max="50000000"
                  step="100000"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(homePrice)}
                  onChange={handleHomePriceChange}
                  onBlur={(e) => setHomePrice(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Down Payment Percent */}
              <motion.div variants={itemVariants}>
                <label htmlFor="downPaymentPercent" className="block text-lg font-semibold text-gray-700 mb-2">
                  Down Payment: <span className="text-purple-600">{downPaymentPercent}%</span> ({formatCurrency(homePrice * (downPaymentPercent / 100))})
                </label>
                <input
                  type="range"
                  id="downPaymentPercent"
                  min="0"
                  max="100"
                  step="1"
                  value={downPaymentPercent}
                  onChange={handleDownPaymentPercentChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="number"
                  value={downPaymentPercent}
                  onChange={handleDownPaymentPercentChange}
                  onBlur={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  min="0"
                  max="100"
                />
              </motion.div>

              {/* Interest Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="interestRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Interest Rate: <span className="text-teal-600">{interestRate.toFixed(2)}%</span>
                </label>
                <input
                  type="range"
                  id="interestRate"
                  min="6"
                  max="15"
                  step="0.05"
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
                  step="0.01"
                />
              </motion.div>

              {/* Loan Tenure */}
              <motion.div variants={itemVariants}>
                <label htmlFor="loanTenure" className="block text-lg font-semibold text-gray-700 mb-2">
                  Loan Tenure: <span className="text-orange-600">{loanTenure} Years</span>
                </label>
                <input
                  type="range"
                  id="loanTenure"
                  min="5"
                  max="30"
                  step="1"
                  value={loanTenure}
                  onChange={handleLoanTenureChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="number"
                  value={loanTenure}
                  onChange={handleLoanTenureChange}
                  onBlur={(e) => setLoanTenure(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  min="5"
                  max="30"
                />
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Estimated Monthly Payment</h3>
              <motion.div
                key={calculations.monthlyPI} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
              >
                {formatCurrency(calculations.monthlyPI)}
              </motion.div>
              <p className="text-xl text-blue-100 mb-8">Principal & Interest (P&I)</p>

              <div className="w-full space-y-4 text-lg">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Home Price</span>
                  <span className="font-bold text-white">{formatCurrency(homePrice)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Wallet className="w-5 h-5" /> Down Payment</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.downPaymentAmount)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><DollarSign className="w-5 h-5" /> Loan Amount</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.loanAmount)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Total Interest Payable</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalInterestPayable)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
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

            .accent-purple-600::-webkit-slider-thumb { --tw-accent-color: #7C3AED; }
            .accent-purple-600::-moz-range-thumb { --tw-accent-color: #7C3AED; }

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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Mortgage Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A mortgage calculator is a powerful online tool designed to help homebuyers and homeowners estimate their monthly mortgage payments, total interest paid, and the overall cost of a home loan. By inputting key variables such as home price, down payment percentage, interest rate, and loan term, users can quickly visualize how different scenarios impact their finances. This tool is essential for anyone considering buying a home, refinancing, or simply planning their financial future, offering transparency and control over one of life's biggest investments.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Mortgage Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter the Home Price:</strong> Input the total value of the property you are interested in purchasing. This forms the basis of your loan calculation.</motion.li>
              <motion.li variants={itemVariants}><strong>Set the Down Payment Percentage:</strong> Adjust the slider or type in the percentage of the home price you plan to pay upfront. A higher down payment reduces your principal loan amount.</motion.li>
              <motion.li variants={itemVariants}><strong>Input the Interest Rate:</strong> Enter the annual interest rate offered by your potential lender. Even small changes here can significantly impact your monthly payments.</motion.li>
              <motion.li variants={itemVariants}><strong>Choose the Loan Tenure:</strong> Select the number of years over which you intend to repay the loan. Common terms are 15, 20, or 30 years. Longer terms mean lower monthly payments but more total interest paid.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Instant Results:</strong> As you adjust any of these parameters, the calculator instantly updates to show your estimated monthly principal and interest payment, the total loan amount, total interest payable, and the overall amount you'll pay back.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Mortgage Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Budget Planning:</strong> Gain a clear understanding of your monthly financial commitment, helping you determine how much house you can truly afford without stretching your budget too thin.</motion.li>
              <motion.li variants={itemVariants}><strong>Compare Loan Options:</strong> Easily compare various loan scenarios by adjusting interest rates and tenures from different lenders, empowering you to choose the most favorable terms.</motion.li>
              <motion.li variants={itemVariants}><strong>Optimize Savings:</strong> Experiment with different down payment amounts and loan terms to identify strategies that can significantly reduce the total interest paid over the life of your loan.</motion.li>
              <motion.li variants={itemVariants}><strong>Prepare for Homeownership:</strong> Get a realistic and detailed picture of your future financial obligations, including principal and interest, allowing you to plan effectively.</motion.li>
              <motion.li variants={itemVariants}><strong>Informed Decision Making:</strong> Make confident decisions about your mortgage by having all the financial data at your fingertips, reducing uncertainty and stress.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Mortgage Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Principal:</strong> This is the initial amount of money you borrow from the lender to purchase your home. Your monthly payments gradually reduce this principal amount.</motion.p>
              <motion.p variants={itemVariants}><strong>Interest Rate:</strong> The percentage charged by the lender on the principal amount for the privilege of borrowing money. This is a crucial factor influencing your monthly payments and total loan cost.</motion.p>
              <motion.p variants={itemVariants}><strong>Loan Term (Tenure):</strong> The total length of time, typically in years, over which you agree to repay the loan. Common terms are 15, 20, or 30 years.</motion.p>
              <motion.p variants={itemVariants}><strong>Down Payment:</strong> The initial lump sum payment you make towards the home purchase, which is a percentage of the home's total price. A larger down payment means a smaller loan amount and often more favorable loan terms.</motion.p>
              <motion.p variants={itemVariants}><strong>Amortization:</strong> The process of paying off a loan with a fixed repayment schedule in regular installments over a period of time. Each payment consists of both principal and interest, with the interest portion being higher in the initial years and decreasing over time.</motion.p>
              <motion.p variants={itemVariants}><strong>EMI (Equated Monthly Installment):</strong> The fixed amount of money that a borrower pays to a lender on a specific date of each month. It covers both the interest and a portion of the principal amount.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Getting the Best Mortgage
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForBestMortgage.map((tip, index) => (
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
              <Home className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Home Loan?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Secure Your Home Loan?
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Take the next step towards owning your dream home. Apply for a mortgage loan through
              BanksCart and get competitive offers from top lenders, all with seamless digital processing.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Mortgage Loan - Final CTA"
                  openApplyModal={openApplyModal}
                  className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Apply for a Mortgage Loan
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Apply for a Mortgage Loan</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculatorPage;
