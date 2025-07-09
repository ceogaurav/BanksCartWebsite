import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calendar, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  PiggyBank, Clock, Coins, LineChart, HandCoins, TrendingDown, Landmark, Briefcase, ReceiptText
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


// --- Main Stock Investment Calculator Page Component ---
interface StockInvestmentCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const StockInvestmentCalculatorPage: React.FC<StockInvestmentCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [initialInvestment, setInitialInvestment] = useState<number>(100000); // Amount Invested
  const [purchasePricePerShare, setPurchasePricePerShare] = useState<number>(100); // Stock Purchase Price
  const [sellingPricePerShare, setSellingPricePerShare] = useState<number>(150); // Stock Selling Price
  const [annualDividendYield, setAnnualDividendYield] = useState<number>(2.0); // Annual Dividend Yield in %
  const [investmentPeriodYears, setInvestmentPeriodYears] = useState<number>(5); // Investment Period in Years

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for direct input fields (with formatting)
  const handleInitialInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setInitialInvestment(Number(value));
  };

  const handlePurchasePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurchasePricePerShare(Number(e.target.value));
  };

  const handleSellingPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellingPricePerShare(Number(e.target.value));
  };

  const handleAnnualDividendYieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnualDividendYield(Number(e.target.value));
  };

  const handleInvestmentPeriodYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvestmentPeriodYears(Number(e.target.value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Stock Investment Calculation
  const calculations = useMemo(() => {
    const investedAmount = initialInvestment;
    const purchasePrice = purchasePricePerShare;
    const sellingPrice = sellingPricePerShare;
    const dividendYield = annualDividendYield / 100; // as decimal
    const years = investmentPeriodYears;

    let sharesPurchased = 0;
    if (purchasePrice > 0) {
      sharesPurchased = investedAmount / purchasePrice;
    }

    const capitalGain = (sellingPrice - purchasePrice) * sharesPurchased;
    const totalDividends = (investedAmount * dividendYield) * years; // Simplified for calculator, assumes yield on initial investment

    const totalReturnAmount = capitalGain + totalDividends;
    const totalReturnPercentage = (investedAmount > 0) ? (totalReturnAmount / investedAmount) * 100 : 0;

    // Calculate CAGR (Compound Annual Growth Rate)
    let cagr = 0;
    if (investedAmount > 0 && years > 0) {
      const finalValue = investedAmount + totalReturnAmount;
      cagr = (Math.pow(finalValue / investedAmount, 1 / years) - 1) * 100;
    }

    return {
      sharesPurchased: sharesPurchased.toFixed(2), // Keep 2 decimal places for shares
      capitalGain: Math.round(capitalGain),
      totalDividends: Math.round(totalDividends),
      totalReturnAmount: Math.round(totalReturnAmount),
      totalReturnPercentage: totalReturnPercentage.toFixed(2),
      cagr: cagr.toFixed(2),
    };
  }, [initialInvestment, purchasePricePerShare, sellingPricePerShare, annualDividendYield, investmentPeriodYears]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Stock Investment Calculator?",
      answer: "A Stock Investment Calculator helps you estimate the potential returns on your stock investments. By inputting details like the amount invested, purchase price, expected selling price, dividend yield, and investment period, it projects your capital gains, total dividends, and overall returns."
    },
    {
      question: "What is the difference between capital gains and dividends?",
      answer: "Capital gains are profits earned from selling a stock at a higher price than its purchase price. Dividends are a portion of a company's profits distributed to its shareholders, usually paid periodically (e.g., quarterly or annually)."
    },
    {
      question: "What is CAGR (Compound Annual Growth Rate)?",
      answer: "CAGR is the average annual rate at which an investment grows over a specified period longer than one year. It smooths out volatile returns and provides a more accurate picture of an investment's performance than simple average returns."
    },
    {
      question: "Are the projected returns guaranteed?",
      answer: "No, the calculator provides estimates based on your inputs. Actual stock market returns are not guaranteed and are subject to market volatility, company performance, economic conditions, and other factors. This tool is for planning and estimation purposes only."
    },
    {
      question: "How do taxes affect stock investment returns in India?",
      answer: "In India, capital gains from stocks are taxed. Short-term capital gains (STCG) on equity shares (held for less than 1 year) are taxed at 15%. Long-term capital gains (LTCG) on equity shares (held for more than 1 year) are exempt up to ₹1 Lakh per financial year, and 10% on gains exceeding ₹1 Lakh. Dividends are taxed as per your income tax slab."
    },
    {
      question: "What is 'dividend yield'?",
      answer: "Dividend yield is a financial ratio that shows how much a company pays out in dividends each year relative to its stock price. It's calculated as Annual Dividends Per Share / Current Share Price. It represents the return on investment from dividends alone."
    },
    {
      question: "Should I focus on capital gains or dividends for stock investing?",
      answer: "It depends on your investment goals. Growth investors often prioritize capital gains from appreciating stock prices. Income investors might prefer stocks with high dividend yields for regular income. A balanced approach often considers both."
    }
  ];

  const tipsForSmartStockInvesting = [
    { icon: <Clock className="w-6 h-6 text-green-500" />, text: "Invest for the long term to mitigate short-term market volatility." },
    { icon: <Search className="w-6 h-6 text-blue-500" />, text: "Conduct thorough research on companies before investing (fundamentals, management)." },
    { icon: <BarChart className="w-6 h-6 text-yellow-500" />, text: "Diversify your portfolio across different sectors and market caps." },
    { icon: <Percent className="w-6 h-6 text-purple-500" />, text: "Understand your risk tolerance and invest accordingly." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Regularly review your portfolio and rebalance if necessary." },
    { icon: <TrendingDown className="w-6 h-6 text-red-500" />, text: "Avoid emotional decisions; stick to your investment plan." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Comprehensive Investment Platform", description: "Access a wide range of investment options including stocks, mutual funds, and more." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Research & Analytics Tools", description: "Utilize advanced tools and expert insights to make informed investment decisions." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Personalized Advisory Services", description: "Connect with certified financial advisors for tailored investment strategies." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Seamless Trading Experience", description: "Enjoy a user-friendly platform for buying, selling, and managing your stock portfolio." },
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
            Project Your Stock Returns with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Investment Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-teal-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Estimate returns based on stock price, dividends, and the amount invested.
            Make smarter decisions for your equity portfolio.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Stock Investment Inquiry"
                openApplyModal={openApplyModal}
                className="bg-white text-teal-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Explore Stock Investing
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Stock Investment Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-teal-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-teal-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-cyan-500" /> Stock Investment Return Estimator
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <PiggyBank className="w-6 h-6 mr-2 text-teal-600" /> Investment Details
              </h3>

              {/* Initial Investment */}
              <motion.div variants={itemVariants}>
                <label htmlFor="initialInvestment" className="block text-lg font-semibold text-gray-700 mb-2">
                  Amount Invested: <span className="text-blue-600">{formatCurrency(initialInvestment)}</span>
                </label>
                <input
                  type="range"
                  id="initialInvestment"
                  min="1000"
                  max="1000000"
                  step="1000"
                  value={initialInvestment}
                  onChange={handleInitialInvestmentChange}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(initialInvestment)}
                  onChange={handleInitialInvestmentChange}
                  onBlur={(e) => setInitialInvestment(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Purchase Price Per Share */}
              <motion.div variants={itemVariants}>
                <label htmlFor="purchasePricePerShare" className="block text-lg font-semibold text-gray-700 mb-2">
                  Purchase Price per Share: <span className="text-purple-600">₹{purchasePricePerShare.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  id="purchasePricePerShare"
                  min="1"
                  max="5000"
                  step="1"
                  value={purchasePricePerShare}
                  onChange={handlePurchasePriceChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="number"
                  value={purchasePricePerShare}
                  onChange={handlePurchasePriceChange}
                  onBlur={(e) => setPurchasePricePerShare(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  step="0.01"
                />
              </motion.div>

              {/* Selling Price Per Share */}
              <motion.div variants={itemVariants}>
                <label htmlFor="sellingPricePerShare" className="block text-lg font-semibold text-gray-700 mb-2">
                  Expected Selling Price per Share: <span className="text-teal-600">₹{sellingPricePerShare.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  id="sellingPricePerShare"
                  min="1"
                  max="7000"
                  step="1"
                  value={sellingPricePerShare}
                  onChange={handleSellingPriceChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="number"
                  value={sellingPricePerShare}
                  onChange={handleSellingPriceChange}
                  onBlur={(e) => setSellingPricePerShare(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  step="0.01"
                />
              </motion.div>

              {/* Annual Dividend Yield */}
              <motion.div variants={itemVariants}>
                <label htmlFor="annualDividendYield" className="block text-lg font-semibold text-gray-700 mb-2">
                  Average Annual Dividend Yield: <span className="text-orange-600">{annualDividendYield.toFixed(1)}%</span>
                </label>
                <input
                  type="range"
                  id="annualDividendYield"
                  min="0"
                  max="10"
                  step="0.1"
                  value={annualDividendYield}
                  onChange={handleAnnualDividendYieldChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="number"
                  value={annualDividendYield}
                  onChange={handleAnnualDividendYieldChange}
                  onBlur={(e) => setAnnualDividendYield(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  step="0.1"
                />
              </motion.div>

              {/* Investment Period Years */}
              <motion.div variants={itemVariants}>
                <label htmlFor="investmentPeriodYears" className="block text-lg font-semibold text-gray-700 mb-2">
                  Investment Period: <span className="text-red-600">{investmentPeriodYears} Years</span>
                </label>
                <input
                  type="range"
                  id="investmentPeriodYears"
                  min="1"
                  max="30"
                  step="1"
                  value={investmentPeriodYears}
                  onChange={handleInvestmentPeriodYearsChange}
                  className="w-full h-2 bg-gradient-to-r from-red-300 to-red-500 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <input
                  type="number"
                  value={investmentPeriodYears}
                  onChange={handleInvestmentPeriodYearsChange}
                  onBlur={(e) => setInvestmentPeriodYears(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-red-500 focus:border-red-500 transition-all"
                  min="1"
                  max="30"
                />
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-teal-500 to-cyan-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Projected Stock Returns</h3>
              <motion.div
                key={calculations.totalReturnAmount} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
              >
                {formatCurrency(calculations.totalReturnAmount)}
              </motion.div>
              <p className="text-xl text-teal-100 mb-8">Total Estimated Return</p>

              <div className="w-full space-y-4 text-lg">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-teal-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Amount Invested</span>
                  <span className="font-bold text-white">{formatCurrency(initialInvestment)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-teal-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Wallet className="w-5 h-5" /> Shares Purchased</span>
                  <span className="font-bold text-white">{calculations.sharesPurchased} Shares</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-teal-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><TrendingUp className="w-5 h-5" /> Capital Gain/Loss</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.capitalGain)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-teal-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Coins className="w-5 h-5" /> Total Dividends Earned</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalDividends)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-teal-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Percent className="w-5 h-5" /> Total Return (%)</span>
                  <span className="font-bold text-white">{calculations.totalReturnPercentage}%</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-teal-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><BarChart className="w-5 h-5" /> Annualized Return (CAGR)</span>
                  <span className="font-bold text-white">{calculations.cagr}%</span>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Stock Investment Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Stock Investment Calculator is a valuable tool for both aspiring and experienced investors looking to estimate the potential returns from their equity investments. It helps you project how much profit you might make from changes in stock prices (capital gains) and from regular dividend payouts. By inputting your initial investment amount, the purchase price per share, your expected selling price per share, the average annual dividend yield, and your investment period, the calculator provides a clear picture of your potential total return and the Compound Annual Growth Rate (CAGR). This allows for better planning and analysis before making investment decisions in the dynamic stock market.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Stock Investment Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Amount Invested:</strong> Specify the total capital you plan to allocate to this particular stock investment.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Purchase Price per Share:</strong> Enter the price at which you bought (or plan to buy) each share of the stock.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Expected Selling Price per Share:</strong> Provide the anticipated price at which you might sell your shares. This is crucial for calculating capital gains.</motion.li>
              <motion.li variants={itemVariants}><strong>Define Average Annual Dividend Yield:</strong> Input the average percentage of dividend income you expect to receive annually relative to your initial investment. This adds to your total returns.</motion.li>
              <motion.li variants={itemVariants}><strong>Specify Investment Period:</strong> Enter the number of years you intend to hold this investment. Longer periods typically allow for greater compounding and potential returns.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Projections:</strong> The calculator will instantly display the number of shares purchased, your estimated capital gain or loss, total dividends earned, the overall total return (both amount and percentage), and the Compound Annual Growth Rate (CAGR), offering a comprehensive view of your potential investment outcome.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Stock Investment Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Estimate Potential Returns:</strong> Get a clear projection of how much money you could make from both stock price appreciation and dividends, helping you set realistic expectations.</motion.li>
              <motion.li variants={itemVariants}><strong>Compare Scenarios:</strong> Easily test different entry/exit points, dividend yields, and holding periods to understand their impact on your overall profitability.</motion.li>
              <motion.li variants={itemVariants}><strong>Understand True Performance:</strong> The CAGR calculation provides an accurate annualized return, allowing for a fair comparison of different investments over varying timeframes.</motion.li>
              <motion.li variants={itemVariants}><strong>Risk Assessment:</strong> By inputting conservative or optimistic scenarios, you can better understand the range of potential outcomes and assess the risk involved.</motion.li>
              <motion.li variants={itemVariants}><strong>Informed Decision Making:</strong> Equip yourself with data-driven insights to make more strategic and confident decisions about buying, holding, or selling stocks.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Stock Investment Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Initial Investment:</strong> The total amount of capital you allocate to purchase a specific stock.</motion.p>
              <motion.p variants={itemVariants}><strong>Purchase Price per Share:</strong> The price at which you buy a single unit (share) of a company's stock.</motion.p>
              <motion.p variants={itemVariants}><strong>Selling Price per Share:</strong> The price at which you sell a single unit (share) of a company's stock. The difference between this and the purchase price determines capital gain/loss.</motion.p>
              <motion.p variants={itemVariants}><strong>Capital Gain/Loss:</strong> The profit (gain) or loss incurred from selling an investment for more or less than its purchase price.</motion.p>
              <motion.p variants={itemVariants}><strong>Dividend:</strong> A distribution of a portion of a company's earnings, decided by the board of directors, paid to a class of its shareholders. Dividends can be paid in cash or as additional stock.</motion.p>
              <motion.p variants={itemVariants}><strong>Dividend Yield:</strong> A financial ratio that indicates how much a company pays out in dividends each year relative to its stock price. It's calculated as annual dividends per share divided by the share price.</motion.p>
              <motion.p variants={itemVariants}><strong>Total Return:</strong> The overall gain or loss on an investment over a specified period, including both capital gains/losses and any income received (like dividends).</motion.p>
              <motion.p variants={itemVariants}><strong>CAGR (Compound Annual Growth Rate):</strong> The mean annual growth rate of an investment over a specified period longer than one year. It's a smoothed, annualized rate of return.</motion.p>
              <motion.p variants={itemVariants}><strong>Market Volatility:</strong> The degree of variation of a trading price series over time, often measured by the standard deviation of logarithmic returns. High volatility means prices fluctuate rapidly.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Smart Stock Investing
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForSmartStockInvesting.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Stock Investing?
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
              Ready to Invest in the Stock Market?
            </motion.h2>
            <motion.p
              className="text-lg text-teal-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Start your equity investment journey with BanksCart. Access powerful tools,
              expert research, and a seamless trading experience to grow your wealth.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Stock Trading Account Inquiry"
                  openApplyModal={openApplyModal}
                  className="bg-white text-teal-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Open a Demat Account
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Open a Demat Account</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default StockInvestmentCalculatorPage;
