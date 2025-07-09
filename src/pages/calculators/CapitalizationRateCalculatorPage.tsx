import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank,
  HandCoins, CreditCard, Clock, Hourglass, PiggyBank as SavingsIcon, Home, Building2, User,
  Shield, Landmark, ReceiptText as TaxIcon, Building, TrendingUp as RoiIcon // Icons for Cap Rate
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


// --- Main Capitalization Rate Calculator Page Component ---
interface CapitalizationRateCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const CapitalizationRateCalculatorPage: React.FC<CapitalizationRateCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [propertyPurchasePrice, setPropertyPurchasePrice] = useState<number>(10000000); // INR
  const [grossRentalIncomeAnnual, setGrossRentalIncomeAnnual] = useState<number>(600000); // INR (e.g., 50k/month * 12)
  const [annualOperatingExpenses, setAnnualOperatingExpenses] = useState<number>(100000); // INR (property tax, insurance, maintenance, etc.)

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for inputs
  const handlePropertyPurchasePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setPropertyPurchasePrice(Number(value));
  };
  const handleGrossRentalIncomeAnnualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setGrossRentalIncomeAnnual(Number(value));
  };
  const handleAnnualOperatingExpensesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setAnnualOperatingExpenses(Number(value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Capitalization Rate Calculations
  const calculations = useMemo(() => {
    const netOperatingIncome = grossRentalIncomeAnnual - annualOperatingExpenses;
    let capRate = 0;
    let isCalculable = true;

    if (propertyPurchasePrice > 0) {
      capRate = (netOperatingIncome / propertyPurchasePrice) * 100;
    } else {
      isCalculable = false; // Cannot divide by zero
    }

    return {
      netOperatingIncome: Math.round(netOperatingIncome),
      capRate: capRate, // Keep decimal for percentage
      isCalculable: isCalculable,
    };
  }, [propertyPurchasePrice, grossRentalIncomeAnnual, annualOperatingExpenses]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is Capitalization Rate (Cap Rate)?",
      answer: "Capitalization Rate, or Cap Rate, is a real estate metric used to estimate the potential rate of return on an investment property. It is calculated by dividing the property's Net Operating Income (NOI) by its current market value or purchase price. A higher cap rate generally indicates a higher potential return, but also potentially higher risk."
    },
    {
      question: "How is Net Operating Income (NOI) calculated?",
      answer: "Net Operating Income (NOI) is the annual income generated by an income-producing property after deducting all operating expenses, but before accounting for mortgage payments, depreciation, or income taxes. The formula is: NOI = Gross Rental Income - Annual Operating Expenses."
    },
    {
      question: "What expenses are included in 'Annual Operating Expenses'?",
      answer: "Annual Operating Expenses typically include: property taxes, landlord's insurance, property management fees, maintenance and repairs (non-capital improvements), utilities (if paid by landlord), and vacancy allowances. It generally excludes mortgage payments (principal and interest), depreciation, and income taxes."
    },
    {
      question: "Why is Cap Rate important for real estate investors?",
      answer: "Cap Rate is a crucial metric for real estate investors because it provides a quick and easy way to:<ul><li><strong>Compare Properties:</strong> Evaluate the relative value and potential return of different investment properties.</li><li><strong>Assess Risk:</strong> A higher cap rate might indicate higher risk, while a lower cap rate might suggest a more stable, lower-risk investment.</li><li><strong>Determine Value:</strong> Investors can use a desired cap rate to estimate a property's value based on its NOI.</li><li><strong>Understand Market Trends:</strong> Changes in average cap rates in a market can indicate shifts in investor sentiment or property values.</li></ul>"
    },
    {
      question: "What is a 'good' Cap Rate?",
      answer: "There's no universal 'good' cap rate, as it varies significantly based on location, property type (residential, commercial), market conditions, and perceived risk. Generally, cap rates for stable, lower-risk properties in prime locations might be lower (e.g., 4-6%), while higher-risk properties or those in developing areas might have higher cap rates (e.g., 8-12%). It's best to compare a property's cap rate to similar properties in the same market."
    },
    {
      question: "Does Cap Rate include mortgage payments?",
      answer: "No, Cap Rate does NOT include mortgage payments (principal or interest). Cap Rate is a 'debt-free' measure of return, meaning it evaluates the property's income-generating ability independently of how it is financed. This allows for a direct comparison of properties regardless of an investor's individual financing structure."
    },
    {
      question: "What are the limitations of Cap Rate?",
      answer: "While useful, Cap Rate has limitations:<ul><li>It doesn't consider the impact of debt financing (mortgage).</li><li>It doesn't account for future cash flow changes, property appreciation, or depreciation.</li><li>It's a snapshot in time and doesn't reflect long-term investment strategy.</li><li>It can be misleading if NOI is not accurately calculated or if expenses are underestimated.</li></ul>"
    }
  ];

  const tipsForRentalPropertyInvestment = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Thoroughly research market rental rates and potential vacancy rates for accurate income projections." },
    { icon: <Coins className="w-6 h-6 text-blue-500" />, text: "Accurately estimate all operating expenses, including unexpected maintenance and repairs." },
    { icon: <Lightbulb className="w-6 h-6 text-yellow-500" />, text: "Compare the cap rate of a potential property to similar properties in the same geographic area." },
    { icon: <Search className="w-6 h-6 text-purple-500" />, text: "Consider the property's location, condition, and potential for appreciation beyond just the cap rate." },
    { icon: <Wallet className="w-6 h-6 text-orange-500" />, text: "Understand that a higher cap rate often implies higher risk, while lower cap rates suggest more stable investments." },
    { icon: <Briefcase className="w-6 h-6 text-red-500" />, text: "Factor in your financing costs (mortgage) separately, as cap rate is a debt-free return metric." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Property Investment Insights", description: "Access tools and resources to analyze potential rental property investments effectively." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Financial Advisory", description: "Connect with certified financial advisors for guidance on real estate investment strategies and financing." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Commercial & Home Loan Solutions", description: "Explore loan options tailored for purchasing investment properties, both residential and commercial." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Market Analysis Support", description: "Gain insights into real estate market trends and property valuations to make informed decisions." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-orange-600 to-amber-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Unlock Rental Property Potential with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white">
              Capitalization Rate Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-orange-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Calculate the return on investment for rental properties.
            Make smarter, data-driven real estate investment decisions.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Real Estate Investment Loan"
                openApplyModal={openApplyModal}
                className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Explore Property Investment Loans
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Capitalization Rate Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-orange-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-amber-500" /> Capitalization Rate Estimator
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Building className="w-6 h-6 mr-2 text-orange-600" /> Property & Income Details
              </h3>

              {/* Property Purchase Price */}
              <motion.div variants={itemVariants}>
                <label htmlFor="propertyPurchasePrice" className="block text-lg font-semibold text-gray-700 mb-2">
                  Property Purchase Price: <span className="text-blue-600">{formatCurrency(propertyPurchasePrice)}</span>
                </label>
                <input
                  type="range"
                  id="propertyPurchasePrice"
                  min="1000000"
                  max="50000000"
                  step="500000"
                  value={propertyPurchasePrice}
                  onChange={handlePropertyPurchasePriceChange}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(propertyPurchasePrice)}
                  onChange={handlePropertyPurchasePriceChange}
                  onBlur={(e) => setPropertyPurchasePrice(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Gross Rental Income (Annual) */}
              <motion.div variants={itemVariants}>
                <label htmlFor="grossRentalIncomeAnnual" className="block text-lg font-semibold text-gray-700 mb-2">
                  Gross Rental Income (Annual): <span className="text-teal-600">{formatCurrency(grossRentalIncomeAnnual)}</span>
                </label>
                <input
                  type="range"
                  id="grossRentalIncomeAnnual"
                  min="0"
                  max="3000000"
                  step="50000"
                  value={grossRentalIncomeAnnual}
                  onChange={handleGrossRentalIncomeAnnualChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(grossRentalIncomeAnnual)}
                  onChange={handleGrossRentalIncomeAnnualChange}
                  onBlur={(e) => setGrossRentalIncomeAnnual(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Annual Operating Expenses */}
              <motion.div variants={itemVariants}>
                <label htmlFor="annualOperatingExpenses" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Operating Expenses: <span className="text-orange-600">{formatCurrency(annualOperatingExpenses)}</span>
                </label>
                <input
                  type="range"
                  id="annualOperatingExpenses"
                  min="0"
                  max="1000000"
                  step="20000"
                  value={annualOperatingExpenses}
                  onChange={handleAnnualOperatingExpensesChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(annualOperatingExpenses)}
                  onChange={handleAnnualOperatingExpensesChange}
                  onBlur={(e) => setAnnualOperatingExpenses(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Investment Insights</h3>

              {calculations.isCalculable ? (
                <>
                  <p className="text-xl text-orange-100 mb-4">Estimated Capitalization Rate:</p>
                  <motion.div
                    key={calculations.capRate} // Key for re-animation on value change
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                    className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-white drop-shadow-lg"
                  >
                    {calculations.capRate.toFixed(2)}%
                  </motion.div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center text-yellow-200 text-xl p-4 bg-red-700/50 rounded-lg mb-8"
                >
                  <ShieldAlert className="inline-block w-8 h-8 mr-3" />
                  Cannot calculate: Property Purchase Price must be greater than zero.
                </motion.div>
              )}

              <div className="w-full space-y-4 text-lg mt-8">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-orange-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><DollarSign className="w-5 h-5" /> Net Operating Income (NOI)</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.netOperatingIncome)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-orange-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Home className="w-5 h-5" /> Property Purchase Price</span>
                  <span className="font-bold text-white">{formatCurrency(propertyPurchasePrice)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-orange-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Gross Rental Income (Annual)</span>
                  <span className="font-bold text-white">{formatCurrency(grossRentalIncomeAnnual)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-orange-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Wallet className="w-5 h-5" /> Annual Operating Expenses</span>
                  <span className="font-bold text-white">{formatCurrency(annualOperatingExpenses)}</span>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Capitalization Rate Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Capitalization Rate (Cap Rate) Calculator is an essential tool for real estate investors, designed to quickly assess the potential rate of return on an income-generating property. It helps you understand how much income a property is expected to generate relative to its purchase price, assuming an all-cash purchase. By inputting the property's purchase price, its annual gross rental income, and its annual operating expenses, the calculator determines the Net Operating Income (NOI) and then calculates the Cap Rate. This metric is widely used to compare the profitability and risk of different investment opportunities in the real estate market, providing a standardized measure of return.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Capitalization Rate Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Property Purchase Price:</strong> Input the total price you paid or expect to pay for the investment property. This is the denominator in the Cap Rate formula.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Gross Rental Income (Annual):</strong> Provide the total annual rental income the property generates or is expected to generate, before any expenses. This includes all rent collected over a year.</motion.li>
              <motion.li variants={itemVariants}><strong>Enter Annual Operating Expenses:</strong> List all yearly expenses associated with operating the property. This typically includes property taxes, insurance, maintenance, property management fees, and utilities (if paid by the landlord). Do NOT include mortgage payments or income taxes here.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Investment Insights:</strong> The calculator will instantly display the calculated Net Operating Income (NOI) and the Capitalization Rate (Cap Rate) as a percentage. This provides a clear metric for evaluating the property's income-generating potential relative to its cost.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Capitalization Rate Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Quick Investment Comparison:</strong> Allows for rapid comparison of different income-producing properties, regardless of their financing structure.</motion.li>
              <motion.li variants={itemVariants}><strong>Assess Property Value:</strong> Helps investors determine if a property's price aligns with its income potential relative to market standards.</motion.li>
              <motion.li variants={itemVariants}><strong>Identify High-Potential Assets:</strong> Pinpoints properties that might offer a higher return on investment based purely on their operating income.</motion.li>
              <motion.li variants={itemVariants}><strong>Understand Market Dynamics:</strong> Provides insight into general market conditions and investor expectations in a specific real estate sector.</motion.li>
              <motion.li variants={itemVariants}><strong>Facilitate Due Diligence:</strong> Serves as a starting point for deeper financial analysis during the property evaluation process.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Capitalization Rate Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Capitalization Rate (Cap Rate):</strong> A ratio used to estimate the return on an investment property, calculated as Net Operating Income divided by the property's purchase price or market value.</motion.p>
              <motion.p variants={itemVariants}><strong>Net Operating Income (NOI):</strong> The annual income generated by an investment property after deducting all operating expenses, but before debt service (mortgage payments), income taxes, and depreciation.</motion.p>
              <motion.p variants={itemVariants}><strong>Gross Rental Income (Annual):</strong> The total potential income from a property if all units were rented at full market value for the entire year, before any vacancies or expenses.</motion.p>
              <motion.p variants={itemVariants}><strong>Annual Operating Expenses:</strong> All costs associated with maintaining and operating a rental property on a yearly basis, excluding debt service and income taxes. Examples include property taxes, insurance, maintenance, and property management fees.</motion.p>
              <motion.p variants={itemVariants}><strong>Property Purchase Price:</strong> The total cost incurred to acquire the investment property.</motion.p>
              <motion.p variants={itemVariants}><strong>Return on Investment (ROI):</strong> A performance measure used to evaluate the efficiency of an investment or compare the efficiency of several different investments. Cap Rate is a specific type of ROI for real estate.</motion.p>
              <motion.p variants={itemVariants}><strong>Vacancy Rate:</strong> The percentage of time a rental property is unoccupied and not generating income. A common deduction from potential gross income when calculating effective gross income.</motion.p>
              <motion.p variants={itemVariants}><strong>Debt Service:</strong> The cash required to cover the repayment of interest and principal on a debt for a particular period. This is NOT included in NOI or Cap Rate calculations.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Analyzing Rental Property Investments
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForRentalPropertyInvestment.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Real Estate Investments?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-orange-600 to-amber-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Invest in Real Estate?
            </motion.h2>
            <motion.p
              className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart provides comprehensive tools, expert advice, and tailored financial solutions
              to help you navigate the world of real estate investment.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Real Estate Investment Financing"
                  openApplyModal={openApplyModal}
                  className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Get Investment Advice
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Get Investment Advice</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default CapitalizationRateCalculatorPage;
