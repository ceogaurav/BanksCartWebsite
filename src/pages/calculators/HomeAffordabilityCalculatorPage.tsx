import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank,
  HandCoins, CreditCard, Clock, Hourglass, PiggyBank as SavingsIcon, Home, Building2, User,
  Shield, Landmark, ReceiptText as TaxIcon, HandCoins as DownPaymentIcon // Icons for home affordability
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


// --- Main Home Affordability Calculator Page Component ---
interface HomeAffordabilityCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const HomeAffordabilityCalculatorPage: React.FC<HomeAffordabilityCalculatorPagePageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [annualIncome, setAnnualIncome] = useState<number>(1200000); // INR
  const [downPayment, setDownPayment] = useState<number>(2000000); // INR
  const [monthlyDebts, setMonthlyDebts] = useState<number>(10000); // INR (car, student loans, etc.)
  const [interestRate, setInterestRate] = useState<number>(7.5); // Annual percentage
  const [loanTermYears, setLoanTermYears] = useState<number>(20); // Years
  const [annualPropertyTaxRate, setAnnualPropertyTaxRate] = useState<number>(0.5); // % of home value
  const [annualHomeInsurance, setAnnualHomeInsurance] = useState<number>(12000); // INR
  const [monthlyHoaFees, setMonthlyHoaFees] = useState<number>(0); // INR

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for inputs
  const handleAnnualIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setAnnualIncome(Number(value));
  };
  const handleDownPaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setDownPayment(Number(value));
  };
  const handleMonthlyDebtsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setMonthlyDebts(Number(value));
  };
  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(Number(e.target.value));
  };
  const handleLoanTermYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanTermYears(Number(e.target.value));
  };
  const handleAnnualPropertyTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnualPropertyTaxRate(Number(e.target.value));
  };
  const handleAnnualHomeInsuranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setAnnualHomeInsurance(Number(value));
  };
  const handleMonthlyHoaFeesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setMonthlyHoaFees(Number(value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Affordability Calculations
  const calculations = useMemo(() => {
    const gmi = annualIncome / 12; // Gross Monthly Income
    const maxTotalPayment = gmi * 0.36; // Max total debt payment (36% DTI rule)

    const monthlyInterestRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;

    const monthlyInsurance = annualHomeInsurance / 12;

    // Calculate P&I Factor for loan amount
    let piFactor: number;
    if (monthlyInterestRate === 0) {
      piFactor = 1 / totalPayments; // Simple division for 0% interest
    } else {
      piFactor = (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    }

    const monthlyTaxRateOnHomeValue = annualPropertyTaxRate / 100 / 12;

    // Remaining capacity for P&I + Property Tax (excluding other debts, insurance, HOA)
    const availableForLoanAndTax = maxTotalPayment - monthlyDebts - monthlyInsurance - monthlyHoaFees;

    let maxLoanAmount = 0;
    let maxAffordableHomePrice = 0;
    let estimatedMonthlyPI = 0;
    let estimatedMonthlyPropertyTax = 0;
    let totalEstimatedMonthlyPayment = 0;

    if (availableForLoanAndTax > 0) {
      // Solve for P (Loan Amount)
      // P * A + (P + downPayment) * B <= availableForLoanAndTax
      // P * (A + B) <= availableForLoanAndTax - downPayment * B
      // P = (availableForLoanAndTax - downPayment * B) / (A + B)
      // Where A = piFactor, B = monthlyTaxRateOnHomeValue

      const denominator = piFactor + monthlyTaxRateOnHomeValue;
      if (denominator > 0) {
        maxLoanAmount = (availableForLoanAndTax - downPayment * monthlyTaxRateOnHomeValue) / denominator;
        maxLoanAmount = Math.max(0, maxLoanAmount); // Ensure non-negative
      }

      maxAffordableHomePrice = maxLoanAmount + downPayment;
      maxAffordableHomePrice = Math.max(0, maxAffordableHomePrice); // Ensure non-negative

      if (maxLoanAmount > 0) {
        estimatedMonthlyPI = maxLoanAmount * piFactor;
      }
      if (maxAffordableHomePrice > 0) {
        estimatedMonthlyPropertyTax = maxAffordableHomePrice * monthlyTaxRateOnHomeValue;
      }

      totalEstimatedMonthlyPayment = estimatedMonthlyPI + estimatedMonthlyPropertyTax + monthlyInsurance + monthlyHoaFees + monthlyDebts;
      // Cap total estimated monthly payment at maxTotalPayment to reflect the DTI limit
      totalEstimatedMonthlyPayment = Math.min(totalEstimatedMonthlyPayment, maxTotalPayment);

    }

    return {
      maxAffordableHomePrice: Math.round(maxAffordableHomePrice),
      maxLoanAmount: Math.round(maxLoanAmount),
      estimatedMonthlyPI: Math.round(estimatedMonthlyPI),
      estimatedMonthlyPropertyTax: Math.round(estimatedMonthlyPropertyTax),
      estimatedMonthlyInsurance: Math.round(monthlyInsurance),
      estimatedMonthlyHoaFees: Math.round(monthlyHoaFees),
      totalEstimatedMonthlyPayment: Math.round(totalEstimatedMonthlyPayment),
      gmi: Math.round(gmi),
      maxTotalPayment: Math.round(maxTotalPayment),
      affordabilityWarning: availableForLoanAndTax <= 0 || maxLoanAmount <= 0
    };
  }, [
    annualIncome, downPayment, monthlyDebts, interestRate, loanTermYears,
    annualPropertyTaxRate, annualHomeInsurance, monthlyHoaFees
  ]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Home Affordability Calculator?",
      answer: "A Home Affordability Calculator is a financial tool that estimates how much house you can realistically afford to buy. It considers your income, existing debts, down payment, and potential mortgage terms (interest rate, loan term), as well as additional homeownership costs like property taxes, home insurance, and HOA fees. This helps you set a realistic budget before you start house hunting."
    },
    {
      question: "What factors determine how much house I can afford?",
      answer: "Key factors include:<ul><li><strong>Income:</strong> Your gross monthly income is the primary determinant.</li><li><strong>Debts:</strong> Existing monthly debt payments (car loans, student loans, credit cards) reduce your borrowing capacity.</li><li><strong>Down Payment:</strong> A larger down payment reduces the loan amount needed and can lower your monthly payments.</li><li><strong>Interest Rate:</strong> A lower interest rate means lower monthly mortgage payments for the same loan amount.</li><li><strong>Loan Term:</strong> Longer terms (e.g., 30 years) mean lower monthly payments but more total interest paid.</li><li><strong>Property Taxes:</strong> Annual taxes based on home value.</li><li><strong>Home Insurance:</strong> Annual cost to insure your home.</li><li><strong>HOA Fees:</strong> Monthly fees for homeowners' associations (if applicable).</li></ul>"
    },
    {
      question: "What is the 'Debt-to-Income (DTI) Ratio'?",
      answer: "The Debt-to-Income (DTI) ratio is a key metric lenders use to assess your ability to manage monthly payments and repay debts. It's calculated by dividing your total monthly debt payments (including the proposed mortgage PITI+HOA) by your gross monthly income. Lenders typically prefer a DTI of 36% or lower, though some may go higher depending on other factors."
    },
    {
      question: "What is PITI?",
      answer: "PITI is an acronym for the four main components of a monthly mortgage payment:<ul><li><strong>Principal:</strong> The portion of your payment that goes towards reducing the loan balance.</li><li><strong>Interest:</strong> The cost of borrowing money from the lender.</li><li><strong>Taxes:</strong> Property taxes, usually collected by the lender and paid to the local government.</li><li><strong>Insurance:</strong> Homeowners insurance premiums, also often collected by the lender.</li></ul>"
    },
    {
      question: "How does my credit score affect affordability?",
      answer: "Your credit score significantly impacts the interest rate you qualify for. A higher credit score typically leads to a lower interest rate, which in turn reduces your monthly mortgage payment and increases the amount of house you can afford. A lower score might result in a higher rate or even make it difficult to qualify for a loan."
    },
    {
      question: "Should I buy the maximum amount the calculator says I can afford?",
      answer: "Not necessarily. The calculator provides a maximum estimate based on lending guidelines. It's often wise to buy less than your maximum affordability to leave room in your budget for unexpected expenses, lifestyle choices, and other financial goals (e.g., savings, investments, travel). Consider your comfort level, not just the lender's limit."
    },
    {
      question: "What are some hidden costs of homeownership?",
      answer: "Beyond PITI and HOA, consider:<ul><li><strong>Maintenance and Repairs:</strong> Unexpected plumbing issues, roof repairs, appliance breakdowns.</li><li><strong>Utilities:</strong> Can be higher than expected, especially in older homes.</li><li><strong>Home Improvements:</strong> Desired upgrades or renovations.</li><li><strong>Closing Costs:</strong> Fees paid at closing (2-5% of loan amount).</li><li><strong>Moving Expenses:</strong> Costs associated with relocating.</li><li><strong>Furnishing/Decorating:</strong> Setting up your new home.</li></ul>"
    }
  ];

  const tipsForHomeAffordability = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Improve your credit score to qualify for better interest rates." },
    { icon: <PiggyBank className="w-6 h-6 text-blue-500" />, text: "Save for a larger down payment to reduce your loan amount and monthly payments." },
    { icon: <TrendingDown className="w-6 h-6 text-yellow-500" />, text: "Reduce or pay off existing debts to lower your debt-to-income ratio." },
    { icon: <Lightbulb className="w-6 h-6 text-purple-500" />, text: "Get pre-approved for a mortgage to understand your actual borrowing power." },
    { icon: <Wallet className="w-6 h-6 text-orange-500" />, text: "Factor in all homeownership costs: PITI, HOA, and potential maintenance." },
    { icon: <Clock className="w-6 h-6 text-red-500" />, text: "Consider a longer loan term for lower monthly payments, but be aware of higher total interest." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Personalized Home Loan Offers", description: "Access tailored home loan products from leading banks based on your affordability." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Mortgage Advisory", description: "Connect with certified mortgage advisors for personalized guidance on home financing." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Compare Loan Rates", description: "Easily compare interest rates and terms from various lenders to find the best deal." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "End-to-End Home Buying Support", description: "From eligibility checks to application assistance, we guide you through every step of your home loan journey." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 font-inter text-gray-800">
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
            Discover Your Dream Home's Price with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Home Affordability Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Estimate how much house you can truly afford based on your financial situation.
            Plan your home-buying journey with confidence.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Home Loan - Affordability Check"
                openApplyModal={openApplyModal}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Home Loan Advice
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Home Affordability Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-blue-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-600 drop-shadow-md">
            <Home className="inline-block w-9 h-9 mr-3 text-indigo-500" /> Estimate Your Home Buying Power
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <User className="w-6 h-6 mr-2 text-blue-600" /> Your Financial Profile
              </h3>

              {/* Annual Income */}
              <motion.div variants={itemVariants}>
                <label htmlFor="annualIncome" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Household Income: <span className="text-purple-600">{formatCurrency(annualIncome)}</span>
                </label>
                <input
                  type="range"
                  id="annualIncome"
                  min="300000"
                  max="5000000"
                  step="50000"
                  value={annualIncome}
                  onChange={handleAnnualIncomeChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(annualIncome)}
                  onChange={handleAnnualIncomeChange}
                  onBlur={(e) => setAnnualIncome(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Down Payment */}
              <motion.div variants={itemVariants}>
                <label htmlFor="downPayment" className="block text-lg font-semibold text-gray-700 mb-2">
                  Available Down Payment: <span className="text-teal-600">{formatCurrency(downPayment)}</span>
                </label>
                <input
                  type="range"
                  id="downPayment"
                  min="0"
                  max="5000000"
                  step="50000"
                  value={downPayment}
                  onChange={handleDownPaymentChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(downPayment)}
                  onChange={handleDownPaymentChange}
                  onBlur={(e) => setDownPayment(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Monthly Debts */}
              <motion.div variants={itemVariants}>
                <label htmlFor="monthlyDebts" className="block text-lg font-semibold text-gray-700 mb-2">
                  Total Monthly Debts (Car, Student, CC Min.): <span className="text-orange-600">{formatCurrency(monthlyDebts)}</span>
                </label>
                <input
                  type="range"
                  id="monthlyDebts"
                  min="0"
                  max="50000"
                  step="1000"
                  value={monthlyDebts}
                  onChange={handleMonthlyDebtsChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(monthlyDebts)}
                  onChange={handleMonthlyDebtsChange}
                  onBlur={(e) => setMonthlyDebts(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              <div className="border-t border-gray-200 pt-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <Building2 className="w-6 h-6 mr-2 text-indigo-600" /> Loan & Property Details
                </h3>
              </div>

              {/* Interest Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="interestRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Expected Mortgage Interest Rate (%): <span className="text-red-600">{interestRate}%</span>
                </label>
                <input
                  type="range"
                  id="interestRate"
                  min="4"
                  max="12"
                  step="0.1"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  className="w-full h-2 bg-gradient-to-r from-red-300 to-red-500 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <input
                  type="number"
                  value={interestRate}
                  onChange={handleInterestRateChange}
                  onBlur={(e) => setInterestRate(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-red-500 focus:border-red-500 transition-all"
                  step="0.1"
                />
              </motion.div>

              {/* Loan Term Years */}
              <motion.div variants={itemVariants}>
                <label htmlFor="loanTermYears" className="block text-lg font-semibold text-gray-700 mb-2">
                  Desired Loan Term (Years): <span className="text-green-600">{loanTermYears} Years</span>
                </label>
                <input
                  type="range"
                  id="loanTermYears"
                  min="5"
                  max="30"
                  step="1"
                  value={loanTermYears}
                  onChange={handleLoanTermYearsChange}
                  className="w-full h-2 bg-gradient-to-r from-green-300 to-green-500 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <input
                  type="number"
                  value={loanTermYears}
                  onChange={handleLoanTermYearsChange}
                  onBlur={(e) => setLoanTermYears(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-green-500 focus:border-green-500 transition-all"
                  min="5"
                  max="30"
                />
              </motion.div>

              {/* Annual Property Tax Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="annualPropertyTaxRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Property Tax Rate (% of Home Value): <span className="text-yellow-600">{annualPropertyTaxRate}%</span>
                </label>
                <input
                  type="range"
                  id="annualPropertyTaxRate"
                  min="0"
                  max="2"
                  step="0.01"
                  value={annualPropertyTaxRate}
                  onChange={handleAnnualPropertyTaxRateChange}
                  className="w-full h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-lg appearance-none cursor-pointer accent-yellow-600"
                />
                <input
                  type="number"
                  value={annualPropertyTaxRate}
                  onChange={handleAnnualPropertyTaxRateChange}
                  onBlur={(e) => setAnnualPropertyTaxRate(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                  step="0.01"
                />
              </motion.div>

              {/* Annual Home Insurance */}
              <motion.div variants={itemVariants}>
                <label htmlFor="annualHomeInsurance" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Home Insurance: <span className="text-pink-600">{formatCurrency(annualHomeInsurance)}</span>
                </label>
                <input
                  type="range"
                  id="annualHomeInsurance"
                  min="0"
                  max="50000"
                  step="1000"
                  value={annualHomeInsurance}
                  onChange={handleAnnualHomeInsuranceChange}
                  className="w-full h-2 bg-gradient-to-r from-pink-300 to-pink-500 rounded-lg appearance-none cursor-pointer accent-pink-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(annualHomeInsurance)}
                  onChange={handleAnnualHomeInsuranceChange}
                  onBlur={(e) => setAnnualHomeInsurance(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-pink-500 focus:border-pink-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Monthly HOA Fees */}
              <motion.div variants={itemVariants}>
                <label htmlFor="monthlyHoaFees" className="block text-lg font-semibold text-gray-700 mb-2">
                  Monthly HOA Fees: <span className="text-gray-600">{formatCurrency(monthlyHoaFees)}</span>
                </label>
                <input
                  type="range"
                  id="monthlyHoaFees"
                  min="0"
                  max="10000"
                  step="100"
                  value={monthlyHoaFees}
                  onChange={handleMonthlyHoaFeesChange}
                  className="w-full h-2 bg-gradient-to-r from-gray-300 to-gray-500 rounded-lg appearance-none cursor-pointer accent-gray-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(monthlyHoaFees)}
                  onChange={handleMonthlyHoaFeesChange}
                  onBlur={(e) => setMonthlyHoaFees(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-gray-500 focus:border-gray-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Estimated Affordability</h3>

              {calculations.affordabilityWarning ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center text-yellow-200 text-xl p-4 bg-red-700/50 rounded-lg mb-8"
                >
                  <ShieldAlert className="inline-block w-8 h-8 mr-3" />
                  Based on your inputs, homeownership may be challenging. Consider adjusting your expectations or financial profile.
                </motion.div>
              ) : (
                <>
                  <p className="text-xl text-blue-100 mb-4">You can likely afford a home up to:</p>
                  <motion.div
                    key={calculations.maxAffordableHomePrice} // Key for re-animation on value change
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                    className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
                  >
                    {formatCurrency(calculations.maxAffordableHomePrice)}
                  </motion.div>
                  <p className="text-xl text-blue-100 mb-8">Estimated Maximum Affordable Home Price</p>
                </>
              )}

              <div className="w-full space-y-4 text-lg mt-8">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><DollarSign className="w-5 h-5" /> Max Loan Amount</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.maxLoanAmount)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><DownPaymentIcon className="w-5 h-5" /> Your Down Payment</span>
                  <span className="font-bold text-white">{formatCurrency(downPayment)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Est. Monthly Mortgage (P&I)</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.estimatedMonthlyPI)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><TaxIcon className="w-5 h-5" /> Est. Monthly Property Tax</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.estimatedMonthlyPropertyTax)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Shield className="w-5 h-5" /> Est. Monthly Home Insurance</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.estimatedMonthlyInsurance)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Building2 className="w-5 h-5" /> Est. Monthly HOA Fees</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.estimatedMonthlyHoaFees)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><CreditCard className="w-5 h-5" /> Other Monthly Debts</span>
                  <span className="font-bold text-white">{formatCurrency(monthlyDebts)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg border-t border-blue-500 pt-4 mt-4">
                  <span className="font-medium flex items-center gap-2"><Wallet className="w-5 h-5" /> Total Est. Monthly Outflow</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalEstimatedMonthlyPayment)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><User className="w-5 h-5" /> Your Gross Monthly Income</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.gmi)}</span>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Home Affordability Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Home Affordability Calculator is a fundamental financial planning tool for anyone considering buying a home. It helps you estimate the maximum home price you can realistically afford based on your unique financial situation. Unlike a simple mortgage calculator that only focuses on loan payments, an affordability calculator takes a holistic view, considering your annual income, existing monthly debts, the down payment you have, and other crucial homeownership costs such as property taxes, home insurance, and potential Homeowners Association (HOA) fees. By providing a clear and personalized budget, it empowers you to search for homes within your financial reach, avoiding the stress of looking at properties you cannot truly afford.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Home Affordability Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Annual Household Income:</strong> Input your total gross annual income. This is the foundation of your affordability calculation.</motion.li>
              <motion.li variants={itemVariants}><strong>Provide Available Down Payment:</strong> Enter the amount of money you have saved and are prepared to put down as a lump sum towards the home purchase. A larger down payment can increase your affordability.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Total Monthly Debts:</strong> Include all your recurring monthly debt payments, such as car loans, student loan payments, and minimum credit card payments. These reduce your capacity for a mortgage.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Expected Mortgage Interest Rate:</strong> Estimate the annual interest rate you anticipate getting on a home loan. Lower rates mean more affordable payments.</motion.li>
              <motion.li variants={itemVariants}><strong>Choose Desired Loan Term (Years):</strong> Select the number of years you want to take to repay the mortgage (e.g., 15, 20, or 30 years). Longer terms typically result in lower monthly payments but higher total interest paid.</motion.li>
              <motion.li variants={itemVariants}><strong>Estimate Annual Property Tax Rate:</strong> Input the approximate annual property tax rate as a percentage of the home's value in your desired location. This is a significant ongoing cost.</motion.li>
              <motion.li variants={itemVariants}><strong>Enter Annual Home Insurance Cost:</strong> Provide an estimate for your yearly home insurance premium. This protects your investment.</motion.li>
              <motion.li variants={itemVariants}><strong>Add Monthly HOA Fees (if applicable):</strong> If the property is part of a Homeowners Association, input the monthly fees. This is an additional recurring cost.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Affordability Estimate:</strong> The calculator will display your estimated maximum affordable home price and a breakdown of the associated monthly costs (P&I, property tax, insurance, HOA, and other debts), giving you a comprehensive view of your potential financial commitment.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Home Affordability Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Realistic Budgeting:</strong> Provides a practical and personalized estimate of what you can afford, preventing you from overextending financially.</motion.li>
              <motion.li variants={itemVariants}><strong>Informed House Hunting:</strong> Narrows down your property search to homes within your financial reach, saving you time and effort.</motion.li>
              <motion.li variants={itemVariants}><strong>Understand Total Costs:</strong> Accounts for more than just the mortgage payment, giving you a full picture of monthly homeownership expenses (PITI + HOA).</motion.li>
              <motion.li variants={itemVariants}><strong>Optimize Financial Profile:</strong> Helps you identify areas where you can improve your financial standing (e.g., reduce debts, save more for down payment) to afford more.</motion.li>
              <motion.li variants={itemVariants}><strong>Reduce Stress:</strong> Entering the home-buying process with a clear understanding of your budget significantly reduces financial anxiety and uncertainty.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Home Affordability Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Annual Household Income:</strong> Your total gross income before taxes from all sources in a year. This is a primary factor in loan qualification.</motion.p>
              <motion.p variants={itemVariants}><strong>Down Payment:</strong> The initial upfront payment made when purchasing a home, typically a percentage of the total home price. A larger down payment means a smaller loan amount.</motion.p>
              <motion.p variants={itemVariants}><strong>Monthly Debts:</strong> Recurring minimum payments on other financial obligations like car loans, student loans, personal loans, and credit cards. These reduce your available income for a mortgage.</motion.p>
              <motion.p variants={itemVariants}><strong>Interest Rate:</strong> The cost of borrowing money for your mortgage, expressed as an annual percentage. A lower interest rate means lower monthly payments.</motion.p>
              <motion.p variants={itemVariants}><strong>Loan Term:</strong> The duration over which you agree to repay your mortgage, typically 15, 20, or 30 years. Longer terms mean lower monthly payments but more total interest paid.</motion.p>
              <motion.p variants={itemVariants}><strong>Property Tax:</strong> Taxes assessed by local government on real estate. These are typically paid annually or semi-annually and can be a significant ongoing cost.</motion.p>
              <motion.p variants={itemVariants}><strong>Home Insurance:</strong> Insurance that protects your home and belongings against damage or loss from perils like fire, theft, or natural disasters. Lenders usually require it.</motion.p>
              <motion.p variants={itemVariants}><strong>HOA Fees (Homeowners Association Fees):</strong> Monthly or annual fees paid by homeowners in certain communities (e.g., apartments, gated communities) to cover maintenance of common areas and amenities.</motion.p>
              <motion.p variants={itemVariants}><strong>PITI:</strong> An acronym for Principal, Interest, Taxes, and Insurance, the four main components of a typical monthly mortgage payment.</motion.p>
              <motion.p variants={itemVariants}><strong>Debt-to-Income (DTI) Ratio:</strong> A percentage that compares your total monthly debt payments to your gross monthly income. Lenders use this to assess your borrowing risk.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Boosting Your Home Affordability
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForHomeAffordability.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Home Loan Journey?
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Find Your Perfect Home?
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart connects you with top lenders and expert advisors to help you secure the best home loan
              and make your homeownership dreams a reality.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Home Loan Application"
                  openApplyModal={openApplyModal}
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Apply for a Home Loan
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Apply for a Home Loan</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default HomeAffordabilityCalculatorPage;
