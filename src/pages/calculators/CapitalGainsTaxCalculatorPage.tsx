import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calendar, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Landmark, Briefcase, ReceiptText, TrendingDown, Coins, Building2, TrendingUp as TrendingUpIcon, TrendingDown as TrendingDownIcon, Gavel, Clock
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

// --- Cost Inflation Index (CII) Data (Simplified for demonstration) ---
// In a real application, this would be fetched from a reliable source and updated annually.
const ciiData: { [key: string]: number } = {
  '2001-02': 100, '2002-03': 105, '2003-04': 109, '2004-05': 113, '2005-06': 117,
  '2006-07': 122, '2007-08': 129, '2008-09': 137, '2009-10': 148, '2010-11': 167,
  '2011-12': 184, '2012-13': 200, '2013-14': 220, '2014-15': 240, '2015-16': 254,
  '2016-17': 264, '2017-18': 272, '2018-19': 280, '2019-20': 289, '2020-21': 301,
  '2021-22': 317, '2022-23': 331, '2023-24': 348, '2024-25': 363, '2025-26': 378 // Hypothetical future years
};

// Function to get financial year from a year (e.g., 2023 -> 2023-24)
const getFinancialYear = (year: number): string => {
  if (year < 2001) return ''; // CII data starts from 2001-02
  const currentMonth = new Date().getMonth() + 1; // 1-12
  const currentYear = new Date().getFullYear();

  // If the sale year is the current year, and month is before April, it's previous FY.
  // This logic is simplified for year inputs. For precise calculation, full dates are needed.
  // For simplicity, we'll just use the year as the start of the financial year.
  // E.g., if saleYear is 2025, it's 2025-26 FY.
  // If purchaseYear is 2010, it's 2010-11 FY.
  return `${year}-${String(year + 1).slice(2, 4)}`;
};


// --- Main Capital Gains Tax Calculator Page Component ---
interface CapitalGainsTaxCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const CapitalGainsTaxCalculatorPage: React.FC<CapitalGainsTaxCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [assetType, setAssetType] = useState<'equity' | 'debt' | 'property'>('equity');
  const [purchasePrice, setPurchasePrice] = useState<number>(100000);
  const [sellingPrice, setSellingPrice] = useState<number>(150000);
  const [purchaseYear, setPurchaseYear] = useState<number>(2020);
  const [sellingYear, setSellingYear] = useState<number>(2024);
  const [expenses, setExpenses] = useState<number>(5000); // Brokerage, stamp duty etc.
  const [incomeTaxSlab, setIncomeTaxSlab] = useState<number>(30); // For STCG on non-equity, or LTCG without indexation

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Tax slab options (simplified for example)
  const taxSlabs = [
    { value: 0, label: '0% (Below Taxable Limit)' },
    { value: 5, label: '5%' },
    { value: 10, label: '10%' },
    { value: 15, label: '15%' },
    { value: 20, label: '20%' },
    { value: 30, label: '30%' },
  ];

  // Handlers for direct input fields (with formatting)
  const handleAssetTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAssetType(e.target.value as 'equity' | 'debt' | 'property');
    // Reset years to typical holding periods for new asset type for better UX
    if (e.target.value === 'equity') {
      setPurchaseYear(2023); // Short term for equity
      setSellingYear(2024);
    } else if (e.target.value === 'debt') {
      setPurchaseYear(2020); // Long term for debt
      setSellingYear(2024);
    } else { // property
      setPurchaseYear(2018); // Long term for property
      setSellingYear(2024);
    }
    setPurchasePrice(100000); // Reset price for new asset type
    setSellingPrice(150000);
    setExpenses(5000);
  };

  const handlePurchasePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setPurchasePrice(Number(value));
  };

  const handleSellingPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setSellingPrice(Number(value));
  };

  const handlePurchaseYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPurchaseYear(Number(e.target.value));
  };

  const handleSellingYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellingYear(Number(e.target.value));
  };

  const handleExpensesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setExpenses(Number(value));
  };

  const handleIncomeTaxSlabChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIncomeTaxSlab(Number(e.target.value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Capital Gains Calculation
  const calculations = useMemo(() => {
    const costOfAcquisition = purchasePrice;
    const saleConsideration = sellingPrice;
    const totalExpenses = expenses;
    const holdingPeriodYears = sellingYear - purchaseYear;

    let grossCapitalGain = saleConsideration - costOfAcquisition - totalExpenses;
    let indexedCostOfAcquisition = costOfAcquisition;
    let taxableCapitalGain = grossCapitalGain;
    let capitalGainsTax = 0;
    let holdingPeriodType: 'Short-Term' | 'Long-Term' = 'Short-Term';
    let applicableTaxRate = 0;

    // Determine holding period based on asset type
    let stcgThresholdYears = 0;
    if (assetType === 'equity') stcgThresholdYears = 1; // <= 1 year for STCG
    else if (assetType === 'debt') stcgThresholdYears = 3; // <= 3 years for STCG
    else if (assetType === 'property') stcgThresholdYears = 2; // <= 2 years for STCG

    if (holdingPeriodYears > stcgThresholdYears) {
      holdingPeriodType = 'Long-Term';
    } else if (holdingPeriodYears === stcgThresholdYears) {
      // If holding period is exactly the threshold, it's usually considered long-term if held for > X years
      // For simplicity, let's say > X years means long term, so exactly X years is still short term.
      // This might need fine-tuning with exact rules for edge cases (e.g., 365 days vs 1 year)
      holdingPeriodType = 'Short-Term'; // Default to STCG for exact threshold to be safe
    } else {
      holdingPeriodType = 'Short-Term';
    }


    // Apply tax rules based on asset type and holding period
    if (holdingPeriodType === 'Short-Term') {
      if (assetType === 'equity') {
        applicableTaxRate = 15; // 15% for STCG on equity
      } else {
        applicableTaxRate = incomeTaxSlab; // Taxed as per income tax slab for others
      }
      capitalGainsTax = taxableCapitalGain * (applicableTaxRate / 100);

    } else { // Long-Term Capital Gains
      if (assetType === 'equity') {
        applicableTaxRate = 10; // 10% for LTCG on equity over ₹1 Lakh
        if (taxableCapitalGain > 100000) {
          capitalGainsTax = (taxableCapitalGain - 100000) * (applicableTaxRate / 100);
        } else {
          capitalGainsTax = 0;
        }
      } else { // Debt Mutual Funds, Property
        applicableTaxRate = 20; // 20% with indexation
        const ciiPurchase = ciiData[getFinancialYear(purchaseYear)];
        const ciiSelling = ciiData[getFinancialYear(sellingYear)];

        if (ciiPurchase && ciiSelling && ciiPurchase > 0) {
          indexedCostOfAcquisition = costOfAcquisition * (ciiSelling / ciiPurchase);
          taxableCapitalGain = saleConsideration - indexedCostOfAcquisition - totalExpenses;
          capitalGainsTax = Math.max(0, taxableCapitalGain) * (applicableTaxRate / 100);
        } else {
          // Fallback if CII data is missing or invalid
          taxableCapitalGain = grossCapitalGain; // No indexation applied
          capitalGainsTax = Math.max(0, taxableCapitalGain) * (applicableTaxRate / 100);
          console.warn("CII data missing or invalid for indexation calculation. Using gross capital gain.");
        }
      }
    }

    const effectiveTaxRate = (totalCapitalGain: number, taxOwed: number) => {
      if (totalCapitalGain > 0) {
        return (taxOwed / totalCapitalGain) * 100;
      }
      return 0;
    };

    return {
      holdingPeriodYears: holdingPeriodYears,
      holdingPeriodType: holdingPeriodType,
      grossCapitalGain: Math.round(grossCapitalGain),
      indexedCostOfAcquisition: Math.round(indexedCostOfAcquisition),
      taxableCapitalGain: Math.round(Math.max(0, taxableCapitalGain)), // Ensure non-negative
      capitalGainsTax: Math.round(Math.max(0, capitalGainsTax)), // Ensure non-negative
      applicableTaxRate: applicableTaxRate,
      effectiveTaxRate: effectiveTaxRate(grossCapitalGain, capitalGainsTax).toFixed(2),
    };
  }, [assetType, purchasePrice, sellingPrice, purchaseYear, sellingYear, expenses, incomeTaxSlab]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is Capital Gains Tax?",
      answer: "Capital Gains Tax is a tax levied on the profit earned from the sale of an asset, such as real estate, shares, or mutual funds. This profit is known as a capital gain. The tax rate and rules depend on the type of asset and its holding period (short-term vs. long-term)."
    },
    {
      question: "What is the difference between Short-Term and Long-Term Capital Gains (STCG vs LTCG)?",
      answer: "The distinction depends on the holding period of the asset. For equity shares/funds, holding for 1 year or less results in STCG. For debt funds, it's 3 years or less. For property, it's 2 years or less. Gains held beyond these periods are LTCG. Tax rates and benefits (like indexation) differ significantly."
    },
    {
      question: "What is 'Indexation Benefit' and when does it apply?",
      answer: "Indexation is a benefit that allows you to adjust the cost of acquisition of an asset for inflation. This reduces your taxable capital gain, thereby lowering your tax liability. It is applicable for Long-Term Capital Gains on non-equity assets like debt mutual funds and real estate. It is NOT applicable for equity LTCG in India."
    },
    {
      question: "What is Cost Inflation Index (CII)?",
      answer: "The Cost Inflation Index (CII) is a government-notified index used to adjust the cost of acquisition of an asset for inflation. It helps in calculating the indexed cost of acquisition for LTCG on non-equity assets, ensuring you are taxed only on real gains, not inflationary gains."
    },
    {
      question: "Are there any exemptions or deductions for Capital Gains Tax in India?",
      answer: "Yes, for LTCG on equity shares, gains up to ₹1 Lakh in a financial year are exempt. For LTCG on property, there are exemptions under Section 54, 54F, 54EC if you reinvest the gains in specified assets or properties. It's crucial to consult a tax advisor for specific applicability."
    },
    {
      question: "What expenses can be deducted from capital gains?",
      answer: "Expenses directly related to the acquisition or transfer of the asset can be deducted. This includes brokerage fees, stamp duty, registration charges, legal expenses, and cost of improvements. These deductions reduce your taxable gain."
    },
    {
      question: "Can capital losses be set off against capital gains?",
      answer: "Yes, capital losses can be set off against capital gains. Short-term capital losses can be set off against both STCG and LTCG. Long-term capital losses can only be set off against LTCG. Unadjusted losses can be carried forward for up to 8 assessment years."
    }
  ];

  const tipsForManagingCapitalGainsTax = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Understand the holding period for different asset types to determine STCG/LTCG." },
    { icon: <Calendar className="w-6 h-6 text-blue-500" />, text: "Plan your sales to optimize for long-term capital gains where possible." },
    { icon: <Percent className="w-6 h-6 text-yellow-500" />, text: "Utilize indexation benefit for LTCG on non-equity assets to reduce tax liability." },
    { icon: <ReceiptText className="w-6 h-6 text-purple-500" />, text: "Keep accurate records of all purchase/sale documents and related expenses." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Explore available exemptions (e.g., Section 54, 54F, 54EC) for reinvestment benefits." },
    { icon: <Gavel className="w-6 h-6 text-red-500" />, text: "Consult a tax advisor for complex scenarios or significant gains." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Comprehensive Tax Tools", description: "Access a suite of calculators and resources for accurate tax planning and compliance." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Tax Advisory", description: "Connect with certified tax professionals for personalized guidance on capital gains." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Investment & Tax Integration", description: "Manage your investments and understand their tax implications seamlessly." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Up-to-Date Tax Information", description: "Stay informed with the latest tax laws and regulations affecting your investments." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-pink-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-indigo-600 to-pink-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Calculate Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Capital Gains Tax.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-indigo-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Estimate taxes owed on profits from the sale of investments or assets.
            Plan your financial moves with tax clarity.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Tax Planning Inquiry"
                openApplyModal={openApplyModal}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Tax Planning Advice
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Capital Gains Tax Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-indigo-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-indigo-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-pink-500" /> Capital Gains Tax Estimator
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Briefcase className="w-6 h-6 mr-2 text-indigo-600" /> Asset & Transaction Details
              </h3>

              {/* Asset Type */}
              <motion.div variants={itemVariants}>
                <label htmlFor="assetType" className="block text-lg font-semibold text-gray-700 mb-2">
                  Asset Type:
                </label>
                <select
                  id="assetType"
                  value={assetType}
                  onChange={handleAssetTypeChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all bg-white appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                >
                  <option value="equity">Equity Shares / Equity Mutual Funds</option>
                  <option value="debt">Debt Mutual Funds / Unlisted Shares</option>
                  <option value="property">Real Estate / Property</option>
                </select>
              </motion.div>

              {/* Purchase Price */}
              <motion.div variants={itemVariants}>
                <label htmlFor="purchasePrice" className="block text-lg font-semibold text-gray-700 mb-2">
                  Purchase Price: <span className="text-purple-600">{formatCurrency(purchasePrice)}</span>
                </label>
                <input
                  type="range"
                  id="purchasePrice"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={purchasePrice}
                  onChange={handlePurchasePriceChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(purchasePrice)}
                  onChange={handlePurchasePriceChange}
                  onBlur={(e) => setPurchasePrice(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Selling Price */}
              <motion.div variants={itemVariants}>
                <label htmlFor="sellingPrice" className="block text-lg font-semibold text-gray-700 mb-2">
                  Selling Price: <span className="text-teal-600">{formatCurrency(sellingPrice)}</span>
                </label>
                <input
                  type="range"
                  id="sellingPrice"
                  min="10000"
                  max="15000000"
                  step="10000"
                  value={sellingPrice}
                  onChange={handleSellingPriceChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(sellingPrice)}
                  onChange={handleSellingPriceChange}
                  onBlur={(e) => setSellingPrice(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Purchase Year */}
              <motion.div variants={itemVariants}>
                <label htmlFor="purchaseYear" className="block text-lg font-semibold text-gray-700 mb-2">
                  Purchase Year (FY start): <span className="text-orange-600">{purchaseYear}</span>
                </label>
                <input
                  type="range"
                  id="purchaseYear"
                  min="2001" // CII starts from 2001-02
                  max={sellingYear}
                  step="1"
                  value={purchaseYear}
                  onChange={handlePurchaseYearChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="number"
                  value={purchaseYear}
                  onChange={handlePurchaseYearChange}
                  onBlur={(e) => setPurchaseYear(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  min="2001"
                  max={sellingYear}
                />
              </motion.div>

              {/* Selling Year */}
              <motion.div variants={itemVariants}>
                <label htmlFor="sellingYear" className="block text-lg font-semibold text-gray-700 mb-2">
                  Selling Year (FY start): <span className="text-red-600">{sellingYear}</span>
                </label>
                <input
                  type="range"
                  id="sellingYear"
                  min={purchaseYear}
                  max={new Date().getFullYear() + 1} // Up to next financial year for planning
                  step="1"
                  value={sellingYear}
                  onChange={handleSellingYearChange}
                  className="w-full h-2 bg-gradient-to-r from-red-300 to-red-500 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <input
                  type="number"
                  value={sellingYear}
                  onChange={handleSellingYearChange}
                  onBlur={(e) => setSellingYear(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-red-500 focus:border-red-500 transition-all"
                  min={purchaseYear}
                  max={new Date().getFullYear() + 1}
                />
              </motion.div>

              {/* Expenses */}
              <motion.div variants={itemVariants}>
                <label htmlFor="expenses" className="block text-lg font-semibold text-gray-700 mb-2">
                  Expenses (Brokerage, etc.): <span className="text-green-600">{formatCurrency(expenses)}</span>
                </label>
                <input
                  type="range"
                  id="expenses"
                  min="0"
                  max="100000"
                  step="1000"
                  value={expenses}
                  onChange={handleExpensesChange}
                  className="w-full h-2 bg-gradient-to-r from-green-300 to-green-500 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(expenses)}
                  onChange={handleExpensesChange}
                  onBlur={(e) => setExpenses(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-green-500 focus:border-green-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Income Tax Slab (for STCG on non-equity) */}
              {assetType !== 'equity' && calculations.holdingPeriodType === 'Short-Term' && (
                <motion.div variants={itemVariants}>
                  <label htmlFor="incomeTaxSlab" className="block text-lg font-semibold text-gray-700 mb-2">
                    Your Income Tax Slab (for STCG):
                  </label>
                  <select
                    id="incomeTaxSlab"
                    value={incomeTaxSlab}
                    onChange={handleIncomeTaxSlabChange}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-yellow-500 focus:border-yellow-500 transition-all bg-white appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                  >
                    {taxSlabs.map(slab => (
                      <option key={slab.value} value={slab.value}>{slab.label}</option>
                    ))}
                  </select>
                </motion.div>
              )}
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-indigo-500 to-pink-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Capital Gains Tax Estimate</h3>
              <motion.div
                key={calculations.capitalGainsTax} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
              >
                {formatCurrency(calculations.capitalGainsTax)}
              </motion.div>
              <p className="text-xl text-indigo-100 mb-8">Estimated Tax Owed</p>

              <div className="w-full space-y-4 text-lg">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Clock className="w-5 h-5" /> Holding Period</span>
                  <span className="font-bold text-white">{calculations.holdingPeriodYears} Years ({calculations.holdingPeriodType})</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><TrendingUpIcon className="w-5 h-5" /> Gross Capital Gain</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.grossCapitalGain)}</span>
                </motion.div>
                {calculations.holdingPeriodType === 'Long-Term' && assetType !== 'equity' && (
                  <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                    <span className="font-medium flex items-center gap-2"><Building2 className="w-5 h-5" /> Indexed Cost of Acquisition</span>
                    <span className="font-bold text-white">{formatCurrency(calculations.indexedCostOfAcquisition)}</span>
                  </motion.div>
                )}
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Coins className="w-5 h-5" /> Taxable Capital Gain</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.taxableCapitalGain)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Percent className="w-5 h-5" /> Applicable Tax Rate</span>
                  <span className="font-bold text-white">{calculations.applicableTaxRate}%</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><BarChart className="w-5 h-5" /> Effective Tax Rate</span>
                  <span className="font-bold text-white">{calculations.effectiveTaxRate}%</span>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Capital Gains Tax Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Capital Gains Tax Calculator is an essential financial tool designed to help individuals estimate the tax liability arising from the sale of various assets. When you sell an investment or property for a price higher than its purchase cost, the profit is termed a 'capital gain,' and this gain is subject to tax. This calculator simplifies the complex Indian tax rules by allowing you to input details about your asset type (equity, debt funds, real estate), its purchase and selling prices, the dates of transaction (to determine holding period), and any related expenses. It then applies the relevant Short-Term Capital Gains (STCG) or Long-Term Capital Gains (LTCG) tax rates and provides an estimate of the tax you owe, helping you plan your finances effectively.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Capital Gains Tax Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Select Asset Type:</strong> Choose the category of asset you've sold or plan to sell (e.g., Equity Shares, Debt Mutual Funds, Real Estate). Tax rules vary significantly based on asset type.</motion.li>
              <motion.li variants={itemVariants}><strong>Enter Purchase & Selling Prices:</strong> Input the original cost at which you acquired the asset and the price at which you sold it. The difference forms the basis of your gain or loss.</motion.li>
              <motion.li variants={itemVariants}><strong>Specify Purchase & Selling Years:</strong> Enter the financial years (e.g., 2020 for FY 2020-21) when you bought and sold the asset. This determines the 'holding period' and whether your gain is short-term or long-term.</motion.li>
              <motion.li variants={itemVariants}><strong>Add Expenses:</strong> Include any direct expenses related to the acquisition or transfer of the asset, such as brokerage, stamp duty, or legal fees, as these are deductible.</motion.li>
              <motion.li variants={itemVariants}><strong>Select Income Tax Slab (if applicable):</strong> For certain short-term gains, the tax is based on your regular income tax slab. Choose the relevant slab if prompted.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Tax Estimate:</strong> The calculator will instantly display the holding period type (STCG/LTCG), gross capital gain, indexed cost of acquisition (if applicable), taxable capital gain, the applicable tax rate, and your estimated capital gains tax owed. It also shows the effective tax rate on your gross gain.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUpIcon className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Capital Gains Tax Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Accurate Tax Estimation:</strong> Get a precise estimate of your tax liability before or after selling an asset, preventing surprises during tax filing.</motion.li>
              <motion.li variants={itemVariants}><strong>Strategic Planning:</strong> Helps you plan your asset sales strategically, potentially optimizing for long-term gains or utilizing exemptions to minimize tax outflow.</motion.li>
              <motion.li variants={itemVariants}><strong>Understand Tax Implications:</strong> Gain a clear understanding of how different asset classes and holding periods affect your tax burden, enhancing your financial literacy.</motion.li>
              <motion.li variants={itemVariants}><strong>Maximize Net Returns:</strong> By calculating tax in advance, you can factor it into your investment decisions, aiming for higher after-tax returns.</motion.li>
              <motion.li variants={itemVariants}><strong>Compliance Confidence:</strong> Ensure you are aware of your tax obligations and can correctly report capital gains in your income tax returns, avoiding penalties.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Capital Gains Tax Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Capital Gain:</strong> The profit realized from the sale of a capital asset (e.g., property, shares, mutual funds) for a price higher than its purchase cost.</motion.p>
              <motion.p variants={itemVariants}><strong>Capital Asset:</strong> Any property held by an assessee, whether connected with their business or profession or not. This includes movable and immovable property, shares, bonds, mutual funds, etc.</motion.p>
              <motion.p variants={itemVariants}><strong>Short-Term Capital Gain (STCG):</strong> Profit from the sale of a capital asset held for a short period (defined differently for various asset types, e.g., &le;1 year for equity).</motion.p>
              <motion.p variants={itemVariants}><strong>Long-Term Capital Gain (LTCG):</strong> Profit from the sale of a capital asset held for a longer period (defined differently for various asset types, e.g., &gt;1 year for equity).</motion.p>
              <motion.p variants={itemVariants}><strong>Cost of Acquisition:</strong> The original price at which the asset was purchased, including any expenses incurred for its acquisition.</motion.p>
              <motion.p variants={itemVariants}><strong>Sale Consideration:</strong> The total amount received from the sale of the capital asset.</motion.p>
              <motion.p variants={itemVariants}><strong>Expenses on Transfer:</strong> Costs directly incurred during the sale process, such as brokerage, commission, legal fees, or stamp duty.</motion.p>
              <motion.p variants={itemVariants}><strong>Indexed Cost of Acquisition:</strong> The purchase cost of an asset adjusted for inflation using the Cost Inflation Index (CII). This reduces the taxable long-term capital gain for non-equity assets.</motion.p>
              <motion.p variants={itemVariants}><strong>Cost Inflation Index (CII):</strong> An index notified by the Indian government annually, used to calculate the indexed cost of acquisition for long-term capital gains on non-equity assets.</motion.p>
              <motion.p variants={itemVariants}><strong>Set-off and Carry Forward of Losses:</strong> The ability to adjust capital losses against capital gains in the same financial year, and to carry forward unadjusted losses to future years (up to 8 assessment years) to reduce future capital gains tax.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Managing Capital Gains Tax
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForManagingCapitalGainsTax.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Tax & Investment Planning?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-indigo-50 to-pink-50 border border-indigo-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-indigo-600 to-pink-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Need Expert Assistance with Capital Gains Tax?
            </motion.h2>
            <motion.p
              className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Don't navigate complex tax rules alone. BanksCart connects you with tax experts
              and financial advisors to optimize your capital gains and overall tax planning.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Capital Gains Tax Advisory"
                  openApplyModal={openApplyModal}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Connect with a Tax Expert
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Connect with a Tax Expert</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default CapitalGainsTaxCalculatorPage;
