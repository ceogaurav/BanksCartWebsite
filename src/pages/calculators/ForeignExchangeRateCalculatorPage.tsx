import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank,
  HandCoins, CreditCard, Clock, Hourglass, PiggyBank as SavingsIcon, ArrowRightLeft, Globe,
  RefreshCcw, Banknote, Landmark, Plane, Users // Icons for foreign exchange
} from 'lucide-react'; // Lucide icons
import ApplyButton from '../../components/common/ApplyButton'; // Assuming this path is correct

// --- Helper Functions ---
// Formats a number into currency format (default to 2 decimal places)
const formatCurrency = (value: number | string, currencyCode: string = 'USD'): string => {
  if (typeof value === 'string') {
    value = parseFloat(value.replace(/,/g, '')); // Remove commas for parsing
  }
  if (isNaN(value) || value === null) {
    return '0.00'; // Return a simple 0 for invalid numbers
  }
  try {
    return new Intl.NumberFormat('en-US', { // Using en-US for general currency formatting
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch (error) {
    console.error("Error formatting currency:", error);
    return value.toFixed(2); // Fallback if currency code is invalid
  }
};

// Formats a number to have commas for display in input fields
const formatNumberWithCommas = (value: number | string): string => {
  if (typeof value === 'number') {
    return value.toLocaleString('en-IN', { maximumFractionDigits: 0 }); // Use en-IN for Indian number format
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


// --- Mock Exchange Rates (for demonstration purposes) ---
// In a real application, these would be fetched from a live API.
const exchangeRates: { [key: string]: { [key: string]: number } } = {
  USD: {
    INR: 83.50, EUR: 0.92, GBP: 0.79, JPY: 157.00, AUD: 1.50, CAD: 1.37, CHF: 0.90, CNY: 7.25, SEK: 10.50, NZD: 1.63
  },
  INR: {
    USD: 1 / 83.50, EUR: 1 / 90.00, GBP: 1 / 105.00, JPY: 1 / 0.55, AUD: 1 / 55.00, CAD: 1 / 61.00, CHF: 1 / 93.00, CNY: 1 / 11.50, SEK: 1 / 8.00, NZD: 1 / 51.00
  },
  EUR: {
    USD: 1.08, INR: 90.00, GBP: 0.85, JPY: 170.00, AUD: 1.63, CAD: 1.48, CHF: 0.98, CNY: 7.85, SEK: 11.30, NZD: 1.76
  },
  GBP: {
    USD: 1.27, INR: 105.00, EUR: 1.17, JPY: 198.00, AUD: 1.90, CAD: 1.73, CHF: 1.14, CNY: 9.15, SEK: 13.10, NZD: 2.05
  },
  JPY: {
    USD: 1 / 157.00, INR: 0.55, EUR: 1 / 170.00, GBP: 1 / 198.00, AUD: 1 / 105.00, CAD: 1 / 115.00, CHF: 1 / 175.00, CNY: 1 / 21.00, SEK: 1 / 15.00, NZD: 1 / 100.00
  },
  AUD: {
    USD: 1 / 1.50, INR: 55.00, EUR: 1 / 1.63, GBP: 1 / 1.90, JPY: 105.00, CAD: 0.92, CHF: 0.60, CNY: 4.80, SEK: 6.90, NZD: 1.08
  },
  CAD: {
    USD: 1 / 1.37, INR: 61.00, EUR: 1 / 1.48, GBP: 1 / 1.73, JPY: 115.00, AUD: 1 / 0.92, CHF: 0.66, CNY: 5.25, SEK: 7.55, NZD: 1.18
  },
  CHF: {
    USD: 1 / 0.90, INR: 93.00, EUR: 1 / 0.98, GBP: 1 / 1.14, JPY: 175.00, AUD: 1 / 0.60, CAD: 1 / 0.66, CNY: 8.05, SEK: 11.50, NZD: 1.80
  },
  CNY: {
    USD: 1 / 7.25, INR: 11.50, EUR: 1 / 7.85, GBP: 1 / 9.15, JPY: 21.00, AUD: 1 / 4.80, CAD: 1 / 5.25, CHF: 1 / 8.05, SEK: 1 / 1.45, NZD: 1 / 5.80
  },
  SEK: {
    USD: 1 / 10.50, INR: 8.00, EUR: 1 / 11.30, GBP: 1 / 13.10, JPY: 15.00, AUD: 1 / 6.90, CAD: 1 / 7.55, CHF: 1 / 11.50, CNY: 1.45, NZD: 1 / 6.60
  },
  NZD: {
    USD: 1 / 1.63, INR: 51.00, EUR: 1 / 1.76, GBP: 1 / 2.05, JPY: 100.00, AUD: 1 / 1.08, CAD: 1 / 1.18, CHF: 1 / 1.80, CNY: 5.80, SEK: 6.60
  }
};

const currencies = [
  { code: 'USD', name: 'United States Dollar' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'SEK', name: 'Swedish Krona' },
  { code: 'NZD', name: 'New Zealand Dollar' },
];


// --- Main Foreign Exchange Rate Calculator Page Component ---
interface ForeignExchangeRateCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const ForeignExchangeRateCalculatorPage: React.FC<ForeignExchangeRateCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [amount, setAmount] = useState<number>(1000);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('INR');

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for inputs
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setAmount(Number(value));
  };

  const handleFromCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setToCurrency(e.target.value);
  };

  // Swap currencies
  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Conversion Calculation
  const conversionResult = useMemo(() => {
    if (amount === 0 || !fromCurrency || !toCurrency) {
      return { convertedAmount: 0, rate: 0 };
    }
    if (fromCurrency === toCurrency) {
      return { convertedAmount: amount, rate: 1 };
    }

    const rate = exchangeRates[fromCurrency]?.[toCurrency];
    if (rate) {
      return { convertedAmount: amount * rate, rate: rate };
    } else {
      console.warn(`Direct exchange rate from ${fromCurrency} to ${toCurrency} not found in mock data.`);
      return { convertedAmount: 0, rate: 0 }; // Or handle error appropriately
    }
  }, [amount, fromCurrency, toCurrency]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Foreign Exchange Rate Calculator?",
      answer: "A Foreign Exchange Rate Calculator is an online tool that helps you determine the current value of one currency when converted to another. It's particularly useful for international money transfers, allowing you to see how much the recipient will receive in their local currency based on the prevailing exchange rates."
    },
    {
      question: "How do foreign exchange rates work?",
      answer: "Foreign exchange rates represent the value of one country's currency in terms of another. For instance, if the USD/INR rate is 83.50, it means 1 US Dollar can be exchanged for 83.50 Indian Rupees. These rates are constantly changing due to global economic factors, supply and demand, interest rates, and geopolitical events."
    },
    {
      question: "What influences foreign exchange rate fluctuations?",
      answer: "Key factors include:<ul><li><strong>Interest Rates:</strong> Higher rates can attract foreign capital, strengthening a currency.</li><li><strong>Inflation:</strong> High inflation erodes purchasing power, typically weakening a currency.</li><li><strong>Economic Stability:</strong> Strong and stable economies tend to have stronger currencies.</li><li><strong>Political Stability:</strong> Geopolitical events and political stability can significantly impact investor confidence and currency values.</li><li><strong>Balance of Trade:</strong> Countries with trade surpluses (exporting more than importing) often see their currency strengthen.</li><li><strong>Government Debt:</strong> High government debt can lead to inflation and currency depreciation.</li></ul>"
    },
    {
      question: "Is the rate shown here the exact rate I will get?",
      answer: "This calculator uses pre-defined, approximate exchange rates for demonstration. In real-world international money transfers, the exact rate you receive will depend on the service provider (bank, money transfer service), their fees, and the live market rate at the moment of your transaction. Providers often add a markup to the interbank rate."
    },
    {
      question: "What is the 'mid-market rate'?",
      answer: "The mid-market rate (or interbank rate) is the true exchange rate between two currencies, without any markups or fees applied by banks or money transfer services. It's the midpoint between the 'buy' and 'sell' prices on the global currency market. It's the rate you'll see on financial news sites, but rarely the rate you'll get as a consumer."
    },
    {
      question: "How can I get the best foreign exchange rate for transfers?",
      answer: "To get favorable rates:<ul><li>Compare different money transfer services, not just banks.</li><li>Look for providers with transparent fees and competitive exchange rate markups.</li><li>Consider the timing of your transfer, as rates fluctuate.</li><li>For large sums, negotiate with your bank or a specialized forex broker.</li><li>Avoid last-minute exchanges at airports or physical currency exchange booths, as they often have the worst rates.</li></ul>"
    },
    {
      question: "What is a 'remittance'?",
      answer: "A remittance is a sum of money sent by someone working abroad to their family or dependents in their home country. Foreign exchange rates are crucial for remittances as they determine how much local currency the recipient will receive."
    }
  ];

  const tipsForInternationalTransfers = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Compare exchange rates and fees across multiple providers." },
    { icon: <Plane className="w-6 h-6 text-blue-500" />, text: "Understand the mid-market rate to gauge the fairness of offered rates." },
    { icon: <Clock className="w-6 h-6 text-yellow-500" />, text: "Consider the timing of your transfer, especially for large amounts, as rates fluctuate." },
    { icon: <Users className="w-6 h-6 text-purple-500" />, text: "Look for services with transparent pricing and no hidden charges." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "For recurring transfers, explore options for setting up rate alerts or forward contracts." },
    { icon: <MessageSquare className="w-6 h-6 text-red-500" />, text: "Be aware of daily transfer limits and any local regulations in the recipient country." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Trusted Partner Network", description: "Connect with reliable banks and money transfer services offering competitive forex rates." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Forex Advisory", description: "Get personalized guidance on foreign exchange trends, international payments, and risk management." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Seamless International Transfers", description: "Explore options for fast, secure, and cost-effective international money transfers." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Transparent Fee Structures", description: "We help you find providers who offer clear and upfront information on all fees and charges." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-cyan-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-indigo-600 to-cyan-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Navigate Global Currencies with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Foreign Exchange Rate Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-indigo-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Get current foreign exchange rates for international money transfers.
            Ensure transparency and optimize your global transactions.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Foreign Exchange Services Inquiry"
                openApplyModal={openApplyModal}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Explore Forex Solutions
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Foreign Exchange Rate Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-indigo-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-indigo-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-cyan-500" /> International Money Transfer Estimator
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Banknote className="w-6 h-6 mr-2 text-indigo-600" /> Transfer Details
              </h3>

              {/* Amount */}
              <motion.div variants={itemVariants}>
                <label htmlFor="amount" className="block text-lg font-semibold text-gray-700 mb-2">
                  Amount to Convert:
                </label>
                <input
                  type="text"
                  id="amount"
                  value={formatNumberWithCommas(amount)}
                  onChange={handleAmountChange}
                  onBlur={(e) => setAmount(Number(e.target.value.replace(/,/g, '')))}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* From Currency */}
              <motion.div variants={itemVariants}>
                <label htmlFor="fromCurrency" className="block text-lg font-semibold text-gray-700 mb-2">
                  From Currency:
                </label>
                <select
                  id="fromCurrency"
                  value={fromCurrency}
                  onChange={handleFromCurrencyChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all bg-white appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.name} ({currency.code})
                    </option>
                  ))}
                </select>
              </motion.div>

              {/* Swap Button */}
              <motion.div variants={itemVariants} className="flex justify-center my-4">
                <button
                  onClick={handleSwapCurrencies}
                  className="bg-gray-200 text-gray-700 p-3 rounded-full shadow-md hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                  aria-label="Swap Currencies"
                >
                  <RefreshCcw className="w-6 h-6" />
                </button>
              </motion.div>

              {/* To Currency */}
              <motion.div variants={itemVariants}>
                <label htmlFor="toCurrency" className="block text-lg font-semibold text-gray-700 mb-2">
                  To Currency:
                </label>
                <select
                  id="toCurrency"
                  value={toCurrency}
                  onChange={handleToCurrencyChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all bg-white appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.name} ({currency.code})
                    </option>
                  ))}
                </select>
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-indigo-500 to-cyan-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">You Will Receive</h3>
              <motion.div
                key={conversionResult.convertedAmount} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
              >
                {formatCurrency(conversionResult.convertedAmount, toCurrency)}
              </motion.div>
              <p className="text-xl text-indigo-100 mb-8">
                For {formatCurrency(amount, fromCurrency)}
              </p>

              <div className="w-full space-y-4 text-lg mt-8">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Banknote className="w-5 h-5" /> From Currency</span>
                  <span className="font-bold text-white">{fromCurrency}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Banknote className="w-5 h-5" /> To Currency</span>
                  <span className="font-bold text-white">{toCurrency}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><ArrowRightLeft className="w-5 h-5" /> Exchange Rate</span>
                  <span className="font-bold text-white">
                    1 {fromCurrency} = {conversionResult.rate.toFixed(4)} {toCurrency}
                  </span>
                </motion.div>
              </div>

              {/* Disclaimer for mock data */}
              <p className="text-sm text-yellow-200 mt-8">
                *Exchange rates are for demonstration purposes only and are not live.
                In a real application, live API integration would provide accurate rates.
              </p>
            </div>
          </div>
          {/* Custom CSS for select arrow */}
          <style>{`
            select {
              -webkit-appearance: none;
              -moz-appearance: none;
              appearance: none;
            }
          `}</style>
        </motion.div>

        {/* Informational Sections */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg mt-6 space-y-10">
          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Foreign Exchange Rate Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Foreign Exchange Rate Calculator is a specialized online tool designed to help individuals and businesses understand the value of one currency in terms of another for international money transfers. Unlike a general currency converter that might focus on travel or shopping, this calculator emphasizes the rates relevant for sending or receiving funds across borders. It provides an estimate of how much the recipient will receive in their local currency, based on the prevailing exchange rates, helping to ensure transparency and better financial planning for global transactions, remittances, and international business operations.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Foreign Exchange Rate Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Amount to Convert:</strong> Input the numerical value of the money you plan to send or convert from your original currency.</motion.li>
              <motion.li variants={itemVariants}><strong>Select 'From' Currency:</strong> Choose the currency you are starting with (e.g., USD if you are sending money from the United States).</motion.li>
              <motion.li variants={itemVariants}><strong>Select 'To' Currency:</strong> Choose the target currency into which the money will be converted (e.g., INR if the recipient is in India).</motion.li>
              <motion.li variants={itemVariants}><strong>View Converted Amount:</strong> The calculator will instantly display the estimated amount the recipient will receive in the target currency, along with the specific exchange rate used for the calculation. This helps you understand the value of your transfer.</motion.li>
              <motion.li variants={itemVariants}><strong>Swap Currencies (Optional):</strong> Use the convenient swap button to quickly reverse the 'From' and 'To' currencies, useful for checking conversions in both directions or planning for receiving funds.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Foreign Exchange Rate Calculator for Transfers?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Transparency in Transfers:</strong> Provides a clear estimate of the amount the recipient will receive, helping to avoid surprises and build trust.</motion.li>
              <motion.li variants={itemVariants}><strong>Cost Optimization:</strong> Enables you to compare estimated outcomes from different service providers (if you manually check their rates) to find the most cost-effective transfer option.</motion.li>
              <motion.li variants={itemVariants}><strong>Budgeting for Remittances:</strong> Essential for individuals sending money home, allowing them to plan how much to send to ensure their family receives the desired amount.</motion.li>
              <motion.li variants={itemVariants}><strong>Business Planning:</strong> Helps businesses manage international payments, understand cash flow in different currencies, and mitigate foreign exchange risk.</motion.li>
              <motion.li variants={itemVariants}><strong>Informed Decision Making:</strong> Empowers you with knowledge about current rates, so you can decide the best time to initiate a transfer or which currency to hold.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Foreign Exchange Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Foreign Exchange (Forex):</strong> The global market where currencies are traded. It is the largest financial market in the world.</motion.p>
              <motion.p variants={itemVariants}><strong>Exchange Rate:</strong> The rate at which one currency can be exchanged for another. It's the price of one currency in terms of another.</motion.p>
              <motion.p variants={itemVariants}><strong>Mid-Market Rate:</strong> The true exchange rate, halfway between the buying and selling prices on the interbank market, without any fees or markups.</motion.p>
              <motion.p variants={itemVariants}><strong>Spread:</strong> The difference between the 'buy' (bid) and 'sell' (ask) price of a currency pair. This is how exchange providers make a profit.</motion.p>
              <motion.p variants={itemVariants}><strong>Remittance:</strong> Money sent by a person in one country to support family or friends in another country.</motion.p>
              <motion.p variants={itemVariants}><strong>Spot Rate:</strong> The exchange rate for immediate delivery of a currency, typically within two business days.</motion.p>
              <motion.p variants={itemVariants}><strong>Forward Rate:</strong> An exchange rate agreed upon today for a currency exchange that will take place at a future date.</motion.p>
              <motion.p variants={itemVariants}><strong>Currency Pair:</strong> A quotation of two different currencies, with the value of one currency being quoted against the other (e.g., USD/INR, EUR/GBP).</motion.p>
              <motion.p variants={itemVariants}><strong>Interbank Rate:</strong> The exchange rate at which banks trade currencies with each other. This is usually the best available rate.</motion.p>
              <motion.p variants={itemVariants}><strong>Transaction Fee:</strong> A fixed or percentage-based charge applied by a service provider for processing a money transfer.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Smart International Money Transfers
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForInternationalTransfers.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your International Financial Needs?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-indigo-50 to-cyan-50 border border-indigo-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-indigo-600 to-cyan-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready for Seamless International Transfers?
            </motion.h2>
            <motion.p
              className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart connects you with trusted partners for competitive exchange rates,
              transparent fees, and efficient international money transfer solutions.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="International Money Transfer Services"
                  openApplyModal={openApplyModal}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Explore Transfer Options
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Explore Transfer Options</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default ForeignExchangeRateCalculatorPage;
