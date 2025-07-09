import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank,
  HandCoins, CreditCard, Clock, Hourglass, PiggyBank as SavingsIcon, Landmark,
  CalendarCheck, Gift, LifeBuoy, Wallet as AnnuityIcon, TrendingDown as PresentValueIcon, TrendingUp as FutureValueIcon, // Icons for Annuity
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


// --- Main Annuity Calculator Page Component ---
interface AnnuityCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const AnnuityCalculatorPage: React.FC<AnnuityCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [paymentAmount, setPaymentAmount] = useState<number>(10000); // INR per period
  const [annualInterestRate, setAnnualInterestRate] = useState<number>(7); // Annual percentage
  const [totalYears, setTotalYears] = useState<number>(20); // Total duration in years
  const [paymentFrequency, setPaymentFrequency] = useState<'monthly' | 'quarterly' | 'annually'>('monthly');
  const [annuityType, setAnnuityType] = useState<'end_of_period' | 'beginning_of_period'>('end_of_period');

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for inputs
  const handlePaymentAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setPaymentAmount(Number(value));
  };
  const handleAnnualInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnualInterestRate(Number(e.target.value));
  };
  const handleTotalYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTotalYears(Number(e.target.value));
  };
  const handlePaymentFrequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentFrequency(e.target.value as 'monthly' | 'quarterly' | 'annually');
  };
  const handleAnnuityTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAnnuityType(e.target.value as 'end_of_period' | 'beginning_of_period');
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Annuity Calculations
  const calculations = useMemo(() => {
    let paymentsPerYear: number;
    switch (paymentFrequency) {
      case 'monthly':
        paymentsPerYear = 12;
        break;
      case 'quarterly':
        paymentsPerYear = 4;
        break;
      case 'annually':
        paymentsPerYear = 1;
        break;
      default:
        paymentsPerYear = 12; // Default to monthly
    }

    const ratePerPeriod = annualInterestRate / 100 / paymentsPerYear;
    const numberOfPeriods = totalYears * paymentsPerYear;

    let futureValue = 0;
    let presentValue = 0;

    if (ratePerPeriod === 0) {
      // Simple calculation for 0% interest
      futureValue = paymentAmount * numberOfPeriods;
      presentValue = paymentAmount * numberOfPeriods;
    } else {
      // Future Value of Annuity (FVA)
      futureValue = paymentAmount * ((Math.pow(1 + ratePerPeriod, numberOfPeriods) - 1) / ratePerPeriod);
      if (annuityType === 'beginning_of_period') {
        futureValue *= (1 + ratePerPeriod); // Annuity Due adjustment
      }

      // Present Value of Annuity (PVA)
      presentValue = paymentAmount * ((1 - Math.pow(1 + ratePerPeriod, -numberOfPeriods)) / ratePerPeriod);
      if (annuityType === 'beginning_of_period') {
        presentValue *= (1 + ratePerPeriod); // Annuity Due adjustment
      }
    }

    return {
      futureValue: Math.round(futureValue),
      presentValue: Math.round(presentValue),
      numberOfPeriods: numberOfPeriods,
    };
  }, [paymentAmount, annualInterestRate, totalYears, paymentFrequency, annuityType]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is an Annuity?",
      answer: "An annuity is a financial product that pays out a fixed stream of payments to an individual over a specified period, often used as an income stream for retirees. It can be purchased with a lump sum or through a series of payments. Annuities are contracts between you and an insurance company, designed to grow funds and then provide a steady income."
    },
    {
      question: "What is the difference between Future Value and Present Value of an Annuity?",
      answer: "<ul><li><strong>Future Value (FV) of an Annuity:</strong> This is the total value of a series of regular payments at a specific point in the future, assuming a certain interest rate. It tells you how much your annuity will be worth at the end of its accumulation phase.</li><li><strong>Present Value (PV) of an Annuity:</strong> This is the current value of a series of future payments, discounted back to today's terms at a specific interest rate. It tells you how much a future stream of income is worth right now.</li></ul>"
    },
    {
      question: "What is an Ordinary Annuity vs. Annuity Due?",
      answer: "<ul><li><strong>Ordinary Annuity:</strong> Payments are made at the *end* of each period (e.g., end of month, end of year). Most loans and mortgages are ordinary annuities.</li><li><strong>Annuity Due:</strong> Payments are made at the *beginning* of each period (e.g., beginning of month, beginning of year). Rent payments are a common example of an annuity due. Annuities due generally have slightly higher future and present values because each payment earns interest for one extra period.</li></ul>"
    },
    {
      question: "How does the interest rate affect annuity value?",
      answer: "The interest rate (or discount rate) significantly impacts an annuity's value. A higher interest rate will lead to a higher future value (due to more compounding growth) and a lower present value (because future payments are discounted more heavily). Conversely, a lower interest rate results in a lower future value and a higher present value."
    },
    {
      question: "What are annuities typically used for?",
      answer: "Annuities are commonly used for:<ul><li><strong>Retirement Planning:</strong> Providing a guaranteed income stream during retirement.</li><li><strong>Long-Term Savings:</strong> Accumulating funds over time with tax-deferred growth.</li><li><strong>Estate Planning:</strong> Ensuring income for beneficiaries.</li><li><strong>Structured Settlements:</strong> Receiving regular payments from a lawsuit settlement.</li></ul>"
    },
    {
      question: "Are annuities a good investment?",
      answer: "Annuities can be suitable for certain financial goals, especially for individuals seeking guaranteed income in retirement and tax-deferred growth. However, they can be complex, have various fees, and may offer lower returns compared to other investments. Their suitability depends on your individual financial situation, risk tolerance, and retirement goals. Always consult a financial advisor."
    },
    {
      question: "Does this calculator consider taxes or fees?",
      answer: "No, this calculator provides a simplified estimate of annuity values based on the inputs provided. It does not account for any taxes on earnings, surrender charges, administrative fees, or other charges that may be associated with actual annuity products. These factors can significantly impact the net return of an annuity."
    }
  ];

  const tipsForAnnuityPlanning = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Understand the type of annuity (fixed, variable, indexed) and how it aligns with your risk tolerance." },
    { icon: <PiggyBank className="w-6 h-6 text-blue-500" />, text: "Consider the fees and charges associated with any annuity product, as they can erode your returns." },
    { icon: <Lightbulb className="w-6 h-6 text-yellow-500" />, text: "Factor in inflation when estimating future income needs from an annuity." },
    { icon: <TrendingUp className="w-6 h-6 text-purple-500" />, text: "Compare annuity rates and terms from multiple providers before making a decision." },
    { icon: <Wallet className="w-6 h-6 text-orange-500" />, text: "Consult a qualified financial advisor to determine if an annuity fits into your overall retirement strategy." },
    { icon: <Clock className="w-6 h-6 text-red-500" />, text: "Be aware of the liquidity of annuities; funds may be locked in for a period without penalties." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Personalized Retirement Planning", description: "Access tools and expert advice to build a robust retirement strategy, including annuity considerations." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Diverse Investment Options", description: "Explore a wide range of investment products, including those that complement or serve as alternatives to annuities." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Expert Financial Advisory", description: "Connect with certified financial advisors for unbiased guidance on annuities and long-term wealth management." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Comprehensive Financial Solutions", description: "Utilize a full suite of financial calculators and resources to make informed decisions about your future." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Estimate the Value of Your Annuities with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white">
              Annuity Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-purple-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Plan your retirement and future income streams with clear financial projections.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Annuity & Retirement Planning"
                openApplyModal={openApplyModal}
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Retirement Planning Advice
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Annuity Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-purple-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-pink-500" /> Annuity Value Estimator
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <AnnuityIcon className="w-6 h-6 mr-2 text-purple-600" /> Annuity Details
              </h3>

              {/* Payment Amount */}
              <motion.div variants={itemVariants}>
                <label htmlFor="paymentAmount" className="block text-lg font-semibold text-gray-700 mb-2">
                  Payment Amount per Period: <span className="text-blue-600">{formatCurrency(paymentAmount)}</span>
                </label>
                <input
                  type="range"
                  id="paymentAmount"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={paymentAmount}
                  onChange={handlePaymentAmountChange}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(paymentAmount)}
                  onChange={handlePaymentAmountChange}
                  onBlur={(e) => setPaymentAmount(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Annual Interest Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="annualInterestRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Interest Rate (%): <span className="text-teal-600">{annualInterestRate}%</span>
                </label>
                <input
                  type="range"
                  id="annualInterestRate"
                  min="1"
                  max="15"
                  step="0.1"
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

              {/* Total Years */}
              <motion.div variants={itemVariants}>
                <label htmlFor="totalYears" className="block text-lg font-semibold text-gray-700 mb-2">
                  Total Years: <span className="text-orange-600">{totalYears} Years</span>
                </label>
                <input
                  type="range"
                  id="totalYears"
                  min="1"
                  max="50"
                  step="1"
                  value={totalYears}
                  onChange={handleTotalYearsChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="number"
                  value={totalYears}
                  onChange={handleTotalYearsChange}
                  onBlur={(e) => setTotalYears(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  min="1"
                  max="50"
                />
              </motion.div>

              {/* Payment Frequency */}
              <motion.div variants={itemVariants}>
                <label htmlFor="paymentFrequency" className="block text-lg font-semibold text-gray-700 mb-2">
                  Payment Frequency:
                </label>
                <select
                  id="paymentFrequency"
                  value={paymentFrequency}
                  onChange={handlePaymentFrequencyChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="annually">Annually</option>
                </select>
              </motion.div>

              {/* Annuity Type */}
              <motion.div variants={itemVariants}>
                <label htmlFor="annuityType" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annuity Type:
                </label>
                <select
                  id="annuityType"
                  value={annuityType}
                  onChange={handleAnnuityTypeChange}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-800 text-center text-lg focus:ring-pink-500 focus:border-pink-500 transition-all"
                >
                  <option value="end_of_period">Ordinary Annuity (End of Period)</option>
                  <option value="beginning_of_period">Annuity Due (Beginning of Period)</option>
                </select>
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Estimated Annuity Values</h3>

              {/* Future Value */}
              <p className="text-xl text-purple-100 mb-4">Future Value of Annuity:</p>
              <motion.div
                key={calculations.futureValue} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white drop-shadow-lg"
              >
                {formatCurrency(calculations.futureValue)}
              </motion.div>

              {/* Present Value */}
              <p className="text-xl text-purple-100 mb-4 mt-8">Present Value of Annuity:</p>
              <motion.div
                key={calculations.presentValue} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white drop-shadow-lg"
              >
                {formatCurrency(calculations.presentValue)}
              </motion.div>

              <div className="w-full space-y-4 text-lg mt-8">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-purple-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><FutureValueIcon className="w-5 h-5" /> Total Payments Made</span>
                  <span className="font-bold text-white">{formatCurrency(paymentAmount * calculations.numberOfPeriods)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-purple-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><PresentValueIcon className="w-5 h-5" /> Total Interest Earned</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.futureValue - (paymentAmount * calculations.numberOfPeriods))}</span>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is an Annuity Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              An Annuity Calculator is a specialized financial tool that helps you determine the future value (FV) or present value (PV) of a series of equal payments made over a defined period. This is particularly useful for understanding financial products like retirement annuities, structured settlements, or any scenario involving regular contributions or withdrawals that earn interest. By inputting details such as the payment amount, interest rate, total duration, and payment frequency, the calculator provides clear projections of how much your annuity will be worth at a future date, or its equivalent value in today's terms. It's an indispensable tool for long-term financial planning and investment assessment.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Annuity Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Payment Amount per Period:</strong> Input the fixed amount of money that will be paid or received in each period (e.g., monthly, annually).</motion.li>
              <motion.li variants={itemVariants}><strong>Set Annual Interest Rate (%):</strong> Provide the annual interest rate that the annuity is expected to earn or is being discounted by.</motion.li>
              <motion.li variants={itemVariants}><strong>Choose Total Years:</strong> Specify the total number of years over which these payments will be made or received.</motion.li>
              <motion.li variants={itemVariants}><strong>Select Payment Frequency:</strong> Choose how often the payments occur (e.g., Monthly, Quarterly, Annually). This affects the number of periods and the effective interest rate per period.</motion.li>
              <motion.li variants={itemVariants}><strong>Select Annuity Type:</strong> Indicate whether payments are made at the 'End of Period' (Ordinary Annuity) or 'Beginning of Period' (Annuity Due). This small difference can impact the final value due to an extra period of interest earning.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Estimated Annuity Values:</strong> The calculator will instantly display:
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li><strong>Future Value of Annuity:</strong> The total accumulated value of all payments and interest at the end of the annuity term.</li>
                  <li><strong>Present Value of Annuity:</strong> The current lump-sum equivalent of the future stream of payments.</li>
                  <li><strong>Total Payments Made:</strong> The sum of all principal payments without interest.</li>
                  <li><strong>Total Interest Earned:</strong> The total interest accumulated over the annuity's term.</li>
                </ul>
              </motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use an Annuity Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Retirement Income Planning:</strong> Essential for estimating how much income an annuity can provide in retirement or how much you need to save to achieve a desired income stream.</motion.li>
              <motion.li variants={itemVariants}><strong>Investment Assessment:</strong> Helps evaluate the potential returns and current worth of various annuity products or investment strategies involving regular payments.</motion.li>
              <motion.li variants={itemVariants}><strong>Structured Settlement Evaluation:</strong> Useful for determining the present value of future payments from a lawsuit settlement or lottery winnings.</motion.li>
              <motion.li variants={itemVariants}><strong>Financial Goal Setting:</strong> Provides clear targets for savings goals that involve periodic contributions, such as college funds or large purchases.</motion.li>
              <motion.li variants={itemVariants}><strong>Comparative Analysis:</strong> Allows you to compare different annuity options or investment scenarios by seeing their projected future and present values.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Annuity Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Annuity:</strong> A financial contract issued by an insurance company designed to accept and grow funds from an individual and then pay out a stream of payments at a later point in time.</motion.p>
              <motion.p variants={itemVariants}><strong>Payment Amount:</strong> The fixed sum of money paid or received at regular intervals (e.g., monthly, annually).</motion.p>
              <motion.p variants={itemVariants}><strong>Interest Rate:</strong> The rate at which the annuity's value grows or the rate used to discount future payments to their present value.</motion.p>
              <motion.p variants={itemVariants}><strong>Total Years:</strong> The full duration over which annuity payments are made or received.</motion.p>
              <motion.p variants={itemVariants}><strong>Payment Frequency:</strong> How often the payments occur (e.g., monthly, quarterly, annually).</motion.p>
              <motion.p variants={itemVariants}><strong>Ordinary Annuity:</strong> An annuity where payments are made at the end of each period.</motion.p>
              <motion.p variants={itemVariants}><strong>Annuity Due:</strong> An annuity where payments are made at the beginning of each period.</motion.p>
              <motion.p variants={itemVariants}><strong>Future Value (FV):</strong> The value of an asset or cash at a specified date in the future, equivalent in value to a specified sum today.</motion.p>
              <motion.p variants={itemVariants}><strong>Present Value (PV):</strong> The current worth of a future sum of money or stream of cash flows given a specified rate of return.</motion.p>
              <motion.p variants={itemVariants}><strong>Compounding:</strong> The process of generating earnings from previous earnings, leading to exponential growth.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Smart Annuity Planning
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForAnnuityPlanning.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Retirement & Investment Needs?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-purple-600 to-pink-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Secure Your Retirement and Income Streams?
            </motion.h2>
            <motion.p
              className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart provides comprehensive tools, expert advice, and tailored financial solutions
              to help you build a secure and prosperous future.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Retirement & Annuity Advisory"
                  openApplyModal={openApplyModal}
                  className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Get Personalized Advice
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Get Personalized Advice</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default AnnuityCalculatorPage;
