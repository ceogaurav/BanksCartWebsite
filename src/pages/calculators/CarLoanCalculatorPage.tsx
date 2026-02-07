import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calendar, Calculator, TrendingUp, DollarSign,
  Car, Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, ClipboardCopy, MessageSquare,
  Gauge, Key, Road, CreditCard
} from 'lucide-react';
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


// --- Main Car Loan Calculator Page Component ---
interface CarLoanCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const CarLoanCalculatorPage: React.FC<CarLoanCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [carPrice, setCarPrice] = useState<number>(800000); // Car Price in INR
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // Down Payment in %
  const [interestRate, setInterestRate] = useState<number>(9.5); // Annual Interest Rate in %
  const [loanTenure, setLoanTenure] = useState<number>(5); // Loan Tenure in Years

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for direct input fields (with formatting)
  const handleCarPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setCarPrice(Number(value));
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

  // Memoized Car Loan Calculation
  const calculations = useMemo(() => {
    const P_car = carPrice;
    const DP_percent = downPaymentPercent / 100;
    const R_annual = interestRate / 100; // Annual interest rate as decimal
    const N_years = loanTenure;

    const downPaymentAmount = P_car * DP_percent;
    const loanAmount = P_car - downPaymentAmount;

    const monthlyInterestRate = R_annual / 12; // Monthly interest rate as decimal
    const numberOfPayments = N_years * 12; // Total number of months

    let monthlyEMI = 0; // Principal & Interest
    let totalAmountPayable = 0;
    let totalInterestPayable = 0;

    if (loanAmount > 0 && monthlyInterestRate > 0 && numberOfPayments > 0) {
      monthlyEMI = (loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
                  (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
      totalAmountPayable = monthlyEMI * numberOfPayments;
      totalInterestPayable = totalAmountPayable - loanAmount;
    } else if (loanAmount > 0 && monthlyInterestRate === 0 && numberOfPayments > 0) { // Handle 0% interest rate
      monthlyEMI = loanAmount / numberOfPayments;
      totalAmountPayable = loanAmount;
      totalInterestPayable = 0;
    }

    return {
      downPaymentAmount: Math.round(downPaymentAmount),
      loanAmount: Math.round(loanAmount),
      monthlyEMI: Math.round(monthlyEMI),
      totalAmountPayable: Math.round(totalAmountPayable),
      totalInterestPayable: Math.round(totalInterestPayable),
    };
  }, [carPrice, downPaymentPercent, interestRate, loanTenure]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a car loan calculator and how does it help me?",
      answer: "A car loan calculator helps you estimate your monthly car loan payments. By entering the car's price, your down payment, the interest rate, and the loan tenure, it provides an instant estimate of your Equated Monthly Installment (EMI), helping you budget effectively."
    },
    {
      question: "What is EMI in the context of a car loan?",
      answer: "EMI stands for Equated Monthly Installment. It's a fixed amount you pay to the lender each month until your car loan is fully repaid. Each EMI payment consists of both principal (the actual loan amount) and interest."
    },
    {
      question: "How does the down payment affect my car loan EMI?",
      answer: "A higher down payment means you borrow less money, which directly results in a lower monthly EMI. It also reduces the total interest you pay over the loan's tenure, making the car more affordable in the long run."
    },
    {
      question: "What is the typical loan tenure for a car loan in India?",
      answer: "Car loan tenures in India typically range from 1 year to 7 years (12 to 84 months). Longer tenures lead to lower EMIs but higher total interest, while shorter tenures have higher EMIs but save on overall interest."
    },
    {
      question: "Can I get a 0% interest car loan?",
      answer: "While some dealerships or manufacturers might offer '0% EMI' schemes, these often come with hidden costs like higher ex-showroom prices, larger down payments, or reduced discounts. It's crucial to read the fine print and compare the 'total cost of ownership' with a standard interest loan."
    },
    {
      question: "What documents are needed for a car loan application?",
      answer: "Generally, you'll need identity proof (PAN, Aadhaar), address proof, income proof (salary slips, bank statements, ITR), and vehicle-related documents (proforma invoice, RTO documents). Specific requirements may vary by lender."
    },
    {
      question: "How can I improve my eligibility for a car loan?",
      answer: "Maintain a healthy credit score, ensure a stable income, minimize existing debts, and make a substantial down payment. Having a co-applicant can also boost your eligibility."
    },
    {
      question: "Is it better to get a new car loan or a used car loan?",
      answer: "New car loans typically have lower interest rates and longer tenures. Used car loans often have higher interest rates and shorter tenures due to the higher perceived risk. The best choice depends on your budget, the car's condition, and your financial goals."
    }
  ];

  const tipsForBestCarLoan = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Maintain a strong credit score for better interest rates." },
    { icon: <Search className="w-6 h-6 text-blue-500" />, text: "Compare offers from various banks and financial institutions." },
    { icon: <Wallet className="w-6 h-6 text-yellow-500" />, text: "Make a higher down payment to reduce your loan amount and EMI." },
    { icon: <Calendar className="w-6 h-6 text-purple-500" />, text: "Choose a loan tenure that aligns with your financial comfort." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Factor in additional costs like RTO, insurance, and accessories." },
    { icon: <CreditCard className="w-6 h-6 text-red-500" />, text: "Avoid taking multiple loans simultaneously before applying for a car loan." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Transparent Comparison", description: "Easily compare car loan offers from a wide network of top banks and NBFCs." },
    { icon: <ClipboardCopy className="w-16 h-16 text-green-400" />, title: "Streamlined Process", description: "Experience a quick, paperless, and hassle-free application process online." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Expert Assistance", description: "Receive personalized guidance and support from our loan specialists at every step." },
    { icon: <TrendingUp className="w-16 h-16 text-purple-400" />, title: "Competitive Rates", description: "We help you find the most attractive interest rates and deals available in the market." },
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
            Your Dream Car,{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-lime-300">
              Driven by Smart Calculations.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-red-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Estimate your monthly car loan payments, understand total costs, and drive away with confidence.
            Our calculator provides detailed insights for your next vehicle purchase.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Car Loan"
                openApplyModal={openApplyModal}
                className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Apply for Car Loan Now
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Car Loan Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-red-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-red-600 drop-shadow-md">
            <Car className="inline-block w-9 h-9 mr-3 text-orange-500" /> Calculate Your Car Loan EMI
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Gauge className="w-6 h-6 mr-2 text-orange-600" /> Loan Parameters
              </h3>

              {/* Car Price */}
              <motion.div variants={itemVariants}>
                <label htmlFor="carPrice" className="block text-lg font-semibold text-gray-700 mb-2">
                  Car Price: <span className="text-blue-600">{formatCurrency(carPrice)}</span>
                </label>
                <input
                  type="range"
                  id="carPrice"
                  min="100000"
                  max="5000000"
                  step="10000"
                  value={carPrice}
                  onChange={handleCarPriceChange}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(carPrice)}
                  onChange={handleCarPriceChange}
                  onBlur={(e) => setCarPrice(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Down Payment Percent */}
              <motion.div variants={itemVariants}>
                <label htmlFor="downPaymentPercent" className="block text-lg font-semibold text-gray-700 mb-2">
                  Down Payment: <span className="text-purple-600">{downPaymentPercent}%</span> ({formatCurrency(carPrice * (downPaymentPercent / 100))})
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
                  min="5"
                  max="20"
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
                  min="1"
                  max="7" // Car loans typically max out at 7 years
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
                  min="1"
                  max="7"
                />
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-red-500 to-orange-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Estimated Monthly Payment</h3>
              <motion.div
                key={calculations.monthlyEMI} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-lime-300 drop-shadow-lg"
              >
                {formatCurrency(calculations.monthlyEMI)}
              </motion.div>
              <p className="text-xl text-red-100 mb-8">Equated Monthly Installment (EMI)</p>

              <div className="w-full space-y-4 text-lg">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-red-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Car Price</span>
                  <span className="font-bold text-white">{formatCurrency(carPrice)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-red-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Wallet className="w-5 h-5" /> Down Payment</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.downPaymentAmount)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-red-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><DollarSign className="w-5 h-5" /> Loan Amount</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.loanAmount)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-red-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Total Interest Payable</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalInterestPayable)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-red-700/30 p-3 rounded-lg">
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Car Loan Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A car loan calculator is an indispensable online tool designed to help prospective car buyers estimate their monthly loan payments, total interest paid, and the overall cost of financing a vehicle. By simply inputting key details such as the car's price, your intended down payment, the interest rate offered by lenders, and the desired loan tenure, you can quickly gain a comprehensive financial overview. This tool is crucial for making informed decisions, budgeting effectively, and understanding the financial implications before committing to a car purchase.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Car Loan Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter the Car Price:</strong> Input the ex-showroom price or the on-road price of the car you wish to purchase. This forms the primary basis for your loan calculation.</motion.li>
              <motion.li variants={itemVariants}><strong>Set the Down Payment Percentage:</strong> Adjust the slider or type in the percentage of the car's price you plan to pay upfront. A larger down payment reduces your loan amount and subsequent EMIs.</motion.li>
              <motion.li variants={itemVariants}><strong>Input the Interest Rate:</strong> Enter the annual interest rate quoted by your bank or financial institution. Even a slight difference in interest rates can significantly alter your total payable amount.</motion.li>
              <motion.li variants={itemVariants}><strong>Choose the Loan Tenure:</strong> Select the number of years over which you intend to repay the car loan. Car loan tenures typically range from 1 to 7 years. Longer tenures mean lower EMIs but higher total interest.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Instant Results:</strong> As you modify any of these parameters, the calculator dynamically updates to display your estimated monthly EMI, the total loan amount, the total interest you'll pay, and the overall amount payable for the car.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Car Loan Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Budget Management:</strong> Accurately determine an affordable monthly EMI that fits your financial capacity, preventing over-commitment and ensuring comfortable repayment.</motion.li>
              <motion.li variants={itemVariants}><strong>Compare Loan Options:</strong> Evaluate different loan scenarios by adjusting variables like interest rates and tenures from various lenders. This helps you identify the most cost-effective and suitable car loan for your needs.</motion.li>
              <motion.li variants={itemVariants}><strong>Optimize Savings:</strong> Experiment with higher down payments or shorter tenures to see how you can reduce the total interest paid over the life of your car loan, leading to significant savings.</motion.li>
              <motion.li variants={itemVariants}><strong>Financial Clarity:</strong> Gain a transparent and detailed understanding of your future financial obligations, including the principal amount, total interest, and overall cost of your car, enabling better financial planning.</motion.li>
              <motion.li variants={itemVariants}><strong>Informed Purchase Decisions:</strong> Make confident decisions about your car purchase by having all the necessary financial data readily available. This reduces uncertainty and helps you choose the right car and loan combination.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Car Loan Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Car Price:</strong> The total cost of the vehicle, including ex-showroom price, RTO charges, insurance, and any accessories.</motion.p>
              <motion.p variants={itemVariants}><strong>Down Payment:</strong> The initial lump sum amount you pay upfront towards the car's purchase. It reduces the amount you need to borrow.</motion.p>
              <motion.p variants={itemVariants}><strong>Loan Amount:</strong> The remaining amount after deducting the down payment from the car price, which you borrow from the lender.</motion.p>
              <motion.p variants={itemVariants}><strong>Interest Rate:</strong> The annual percentage charged by the lender on the borrowed amount. This is a key factor influencing your EMI.</motion.p>
              <motion.p variants={itemVariants}><strong>Loan Term (Tenure):</strong> The duration, usually in years or months, over which you will repay the car loan. Longer terms mean lower EMIs but more interest.</motion.p>
              <motion.p variants={itemVariants}><strong>EMI (Equated Monthly Installment):</strong> The fixed amount you pay to the lender each month, covering both principal and interest, until the loan is fully repaid.</motion.p>
              <motion.p variants={itemVariants}><strong>Foreclosure:</strong> Paying off the entire outstanding loan amount before the end of the loan tenure. This can save you a significant amount in interest.</motion.p>
              <motion.p variants={itemVariants}><strong>Pre-payment:</strong> Making additional payments towards the principal amount of your loan, beyond your regular EMI. This helps reduce the principal faster and lowers total interest payable.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Getting the Best Car Loan
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForBestCarLoan.map((tip, index) => (
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
              <Car className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Car Loan?
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-red-500 to-orange-600 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Drive Your Dream Car?
            </motion.h2>
            <motion.p
              className="text-lg text-red-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Take the next step towards owning your ideal vehicle. Apply for a car loan through
              BanksCart and get competitive offers from top lenders, all with seamless digital processing.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Car Loan - Final CTA"
                  openApplyModal={openApplyModal}
                  className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Apply for a Car Loan
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Apply for a Car Loan</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default CarLoanCalculatorPage;
