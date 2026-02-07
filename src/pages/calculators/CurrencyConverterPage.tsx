import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank,
  HandCoins, CreditCard, Clock, Hourglass, PiggyBank as SavingsIcon, ArrowRightLeft, Globe,
  RefreshCcw, Banknote, Landmark // Icons for currency converter
} from 'lucide-react'; // Lucide icons
import ApplyButton from '../../components/common/ApplyButton'; // Assuming this path is correct

// --- Helper Functions ---
// Formats a number into INR currency format (default for display, can be adapted)
const formatCurrency = (value: number | string, currencyCode: string = 'INR'): string => {
  if (typeof value === 'string') {
    value = parseFloat(value.replace(/,/g, '')); // Remove commas for parsing
  }
  if (isNaN(value) || value === null) {
    return '0'; // Return a simple 0 for invalid numbers
  }
  try {
    return new Intl.NumberFormat('en-IN', {
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


// --- Main Currency Converter Page Component ---
interface CurrencyConverterPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const CurrencyConverterPage: React.FC<CurrencyConverterPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [amount, setAmount] = useState<number>(100);
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
  const convertedAmount = useMemo(() => {
    if (amount === 0 || !fromCurrency || !toCurrency) {
      return 0;
    }
    if (fromCurrency === toCurrency) {
      return amount;
    }

    const rate = exchangeRates[fromCurrency]?.[toCurrency];
    if (rate) {
      return amount * rate;
    } else {
      // Handle cases where direct conversion is not available (e.g., cross-currency via USD)
      // For simplicity, this mock data assumes direct rates. In a real API, you might convert A->USD->B
      console.warn(`Direct exchange rate from ${fromCurrency} to ${toCurrency} not found in mock data.`);
      return 0; // Or handle error appropriately
    }
  }, [amount, fromCurrency, toCurrency]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Currency Converter?",
      answer: "A Currency Converter is a tool that allows you to determine the equivalent value of one currency in another, based on current exchange rates. It's essential for travelers, international businesses, investors, and anyone dealing with foreign transactions."
    },
    {
      question: "How do exchange rates work?",
      answer: "An exchange rate is the value of one currency for the purpose of conversion to another. For example, if 1 USD = 83.50 INR, it means one US Dollar can be exchanged for 83.50 Indian Rupees. Rates fluctuate constantly due to market forces like supply and demand, economic indicators, and geopolitical events."
    },
    {
      question: "What causes currency exchange rates to fluctuate?",
      answer: "Currency exchange rates are influenced by many factors, including:<ul><li><strong>Interest Rates:</strong> Higher rates can attract foreign investment, strengthening a currency.</li><li><strong>Inflation:</strong> Higher inflation can weaken a currency's purchasing power.</li><li><strong>Economic Performance:</strong> Strong economic growth typically strengthens a currency.</li><li><strong>Political Stability:</strong> Instability can lead to currency depreciation.</li><li><strong>Balance of Trade:</strong> A country exporting more than it imports tends to have a stronger currency.</li><li><strong>Speculation:</strong> Traders buying or selling currencies can influence short-term rates.</li></ul>"
    },
    {
      question: "Is the exchange rate always the same everywhere?",
      answer: "No. While there's a global interbank rate, the rates offered to consumers by banks, currency exchange bureaus, and online services will include a markup or fee. These rates can vary significantly, so it's wise to compare before converting large amounts."
    },
    {
      question: "What is the difference between 'Buy Rate' and 'Sell Rate'?",
      answer: "When you exchange currency:<ul><li><strong>Buy Rate:</strong> The rate at which the bank/bureau will *buy* foreign currency from you (i.e., give you local currency).</li><li><strong>Sell Rate:</strong> The rate at which the bank/bureau will *sell* foreign currency to you (i.e., take your local currency).</li></ul>The 'sell rate' is always higher than the 'buy rate' from the perspective of the customer, as this difference is the profit margin for the exchange service."
    },
    {
      question: "Does this calculator use live exchange rates?",
      answer: "This demonstration calculator uses pre-defined, approximate exchange rates for functionality. In a real-world application, it would integrate with a live exchange rate API to provide real-time, accurate conversion based on constantly updating market data."
    },
    {
      question: "What are some tips for getting the best exchange rate?",
      answer: "<ul><li>Compare rates from different providers (banks, online services, local exchange houses).</li><li>Avoid exchanging currency at airports or hotels, as their rates are often less favorable.</li><li>Consider using a travel credit card with no foreign transaction fees.</li><li>Withdraw local currency from ATMs using a debit card with low or no foreign ATM fees.</li><li>Exchange larger amounts at once to potentially get better rates.</li></ul>"
    }
  ];

  const tipsForCurrencyExchange = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Always compare exchange rates from multiple sources before converting." },
    { icon: <Banknote className="w-6 h-6 text-blue-500" />, text: "Avoid exchanging large sums at airports or hotels, as rates are usually poor." },
    { icon: <CreditCard className="w-6 h-6 text-yellow-500" />, text: "Use credit/debit cards with no foreign transaction fees for purchases abroad." },
    { icon: <Clock className="w-6 h-6 text-purple-500" />, text: "Monitor exchange rate trends if you have flexibility in when to convert." },
    { icon: <Globe className="w-6 h-6 text-orange-500" />, text: "Understand local currency regulations and import/export limits." },
    { icon: <MessageSquare className="w-6 h-6 text-red-500" />, text: "Consider using a multi-currency travel card for convenience and better rates." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Trusted Financial Tools", description: "Access reliable calculators and resources for all your financial planning needs, including currency conversion." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "International Banking Solutions", description: "Explore services for international money transfers, foreign currency accounts, and travel cards." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Expert Forex Advisory", description: "Connect with financial experts for guidance on foreign exchange markets and international transactions." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Competitive Rates & Fees", description: "Discover partners offering transparent and competitive exchange rates for your international needs." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-teal-600 to-cyan-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Seamlessly Convert Currencies with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Currency Converter.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-teal-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Get instant conversions for global currencies using up-to-date exchange rates.
            Perfect for travelers, businesses, and investors.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="International Banking Services"
                openApplyModal={openApplyModal}
                className="bg-white text-teal-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Explore International Services
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Currency Converter Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-teal-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-teal-600 drop-shadow-md">
            <Globe className="inline-block w-9 h-9 mr-3 text-cyan-500" /> Global Currency Exchange
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Banknote className="w-6 h-6 mr-2 text-teal-600" /> Conversion Details
              </h3>

              {/* Amount */}
              <motion.div variants={itemVariants}>
                <label htmlFor="amount" className="block text-lg font-semibold text-gray-700 mb-2">
                  Amount:
                </label>
                <input
                  type="text"
                  id="amount"
                  value={formatNumberWithCommas(amount)}
                  onChange={handleAmountChange}
                  onBlur={(e) => setAmount(Number(e.target.value.replace(/,/g, '')))}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
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
            <div className="p-6 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Converted Amount</h3>
              <motion.div
                key={convertedAmount} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
              >
                {formatCurrency(convertedAmount, toCurrency)}
              </motion.div>
              <p className="text-xl text-teal-100 mb-8">
                {formatCurrency(amount, fromCurrency)} is equal to...
              </p>

              <div className="w-full space-y-4 text-lg mt-8">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-teal-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Banknote className="w-5 h-5" /> From Currency</span>
                  <span className="font-bold text-white">{fromCurrency}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-teal-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Banknote className="w-5 h-5" /> To Currency</span>
                  <span className="font-bold text-white">{toCurrency}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-teal-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><ArrowRightLeft className="w-5 h-5" /> Exchange Rate</span>
                  <span className="font-bold text-white">
                    1 {fromCurrency} = {formatCurrency(exchangeRates[fromCurrency]?.[toCurrency] || 0, toCurrency)}
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Currency Converter?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Currency Converter is an online tool or application that allows users to convert a specified amount from one currency to its equivalent value in another currency. It uses current or historical exchange rates to perform this conversion. This tool is invaluable for a wide range of users, including international travelers planning their budgets, businesses conducting cross-border transactions, investors monitoring global markets, and individuals sending or receiving money internationally. By providing instant conversion, it helps users understand the real value of their money in different economic contexts.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Currency Converter
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Amount:</strong> Input the numerical value of the money you wish to convert.</motion.li>
              <motion.li variants={itemVariants}><strong>Select 'From' Currency:</strong> Choose the original currency from which you want to convert (e.g., USD, INR, EUR).</motion.li>
              <motion.li variants={itemVariants}><strong>Select 'To' Currency:</strong> Choose the target currency into which you want to convert (e.g., INR, USD, GBP).</motion.li>
              <motion.li variants={itemVariants}><strong>View Converted Amount:</strong> The calculator will instantly display the equivalent value in the 'To' currency based on the current exchange rates. You can also see the direct exchange rate used for the conversion.</motion.li>
              <motion.li variants={itemVariants}><strong>Swap Currencies (Optional):</strong> Use the swap button to quickly reverse the 'From' and 'To' currencies, useful for checking conversions in both directions.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Currency Converter?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Travel Planning:</strong> Helps travelers budget effectively, understand local prices, and avoid overspending abroad.</motion.li>
              <motion.li variants={itemVariants}><strong>International Business:</strong> Facilitates accurate pricing, invoicing, and financial reporting for businesses operating across borders.</motion.li>
              <motion.li variants={itemVariants}><strong>Investment Decisions:</strong> Allows investors to assess the value of foreign assets and understand the impact of currency fluctuations on their portfolios.</motion.li>
              <motion.li variants={itemVariants}><strong>Online Shopping:</strong> Enables consumers to quickly convert prices when shopping from international e-commerce sites, ensuring they know the true cost.</motion.li>
              <motion.li variants={itemVariants}><strong>Remittances:</strong> Provides transparency for individuals sending or receiving money internationally, helping them understand the exact amount that will be received after conversion.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Currency Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Currency:</strong> A system of money in general use in a particular country.</motion.p>
              <motion.p variants={itemVariants}><strong>Exchange Rate:</strong> The value of one currency in terms of another currency (e.g., 1 USD = 83.50 INR).</motion.p>
              <motion.p variants={itemVariants}><strong>Forex (Foreign Exchange):</strong> The global decentralized or over-the-counter market for the trading of currencies.</motion.p>
              <motion.p variants={itemVariants}><strong>Spot Rate:</strong> The current exchange rate at which a currency can be bought or sold for immediate delivery.</motion.p>
              <motion.p variants={itemVariants}><strong>Bid Price:</strong> The price at which a market maker or dealer is willing to buy a currency pair.</motion.p>
              <motion.p variants={itemVariants}><strong>Ask Price:</strong> The price at which a market maker or dealer is willing to sell a currency pair.</motion.p>
              <motion.p variants={itemVariants}><strong>Spread:</strong> The difference between the bid and ask price, representing the profit margin for the currency exchange provider.</motion.p>
              <motion.p variants={itemVariants}><strong>Currency Pair:</strong> A quotation of two different currencies, with the value of one currency being quoted against the other (e.g., USD/INR).</motion.p>
              <motion.p variants={itemVariants}><strong>Volatility:</strong> The degree of variation of a trading price over time. High volatility means rapid and significant price changes.</motion.p>
              <motion.p variants={itemVariants}><strong>Remittance:</strong> A sum of money sent, especially by mail, in payment for goods or services or as a gift.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Smart Currency Exchange
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForCurrencyExchange.map((tip, index) => (
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
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-teal-600 to-cyan-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Need Reliable International Financial Services?
            </motion.h2>
            <motion.p
              className="text-lg text-teal-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart connects you with trusted partners for competitive exchange rates,
              seamless international transfers, and expert forex advisory.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Foreign Exchange Services"
                  openApplyModal={openApplyModal}
                  className="bg-white text-teal-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Explore Forex Solutions
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Explore Forex Solutions</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverterPage;
