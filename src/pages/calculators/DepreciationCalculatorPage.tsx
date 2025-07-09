import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank,
  ArrowRightLeft, ArrowUpCircle, ArrowDownCircle, Building2, Landmark, Boxes, Layers
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


// --- Main Depreciation Calculator Page Component ---
interface DepreciationCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const DepreciationCalculatorPage: React.FC<DepreciationCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [assetCost, setAssetCost] = useState<number>(100000);
  const [salvageValue, setSalvageValue] = useState<number>(10000);
  const [usefulLife, setUsefulLife] = useState<number>(5); // In years
  const [depreciationMethod, setDepreciationMethod] = useState<'straightLine' | 'doubleDecliningBalance' | 'sumOfTheYearsDigits'>('straightLine');

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for direct input fields (with formatting)
  const handleAssetCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setAssetCost(Number(value));
  };

  const handleSalvageValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setSalvageValue(Number(value));
  };

  const handleUsefulLifeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsefulLife(Number(e.target.value));
  };

  const handleDepreciationMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepreciationMethod(e.target.value as 'straightLine' | 'doubleDecliningBalance' | 'sumOfTheYearsDigits');
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Depreciation Schedule Calculation
  const depreciationSchedule = useMemo(() => {
    const schedule = [];
    let accumulatedDepreciation = 0;
    let currentBookValue = assetCost;
    const depreciableBase = assetCost - salvageValue;

    if (usefulLife <= 0 || depreciableBase < 0 || assetCost < 0 || salvageValue < 0) {
      return []; // Invalid inputs
    }

    for (let year = 1; year <= usefulLife; year++) {
      let annualDepreciation = 0;

      switch (depreciationMethod) {
        case 'straightLine':
          annualDepreciation = depreciableBase / usefulLife;
          break;
        case 'doubleDecliningBalance':
          const ddbRate = (2 / usefulLife);
          annualDepreciation = currentBookValue * ddbRate;
          // Ensure book value doesn't go below salvage value
          if (currentBookValue - annualDepreciation < salvageValue) {
            annualDepreciation = currentBookValue - salvageValue;
          }
          break;
        case 'sumOfTheYearsDigits':
          const syd = (usefulLife * (usefulLife + 1)) / 2;
          const remainingLife = usefulLife - year + 1;
          annualDepreciation = (remainingLife / syd) * depreciableBase;
          break;
        default:
          break;
      }

      // Ensure depreciation doesn't exceed remaining depreciable amount
      annualDepreciation = Math.min(annualDepreciation, depreciableBase - accumulatedDepreciation);
      // Ensure depreciation is not negative
      annualDepreciation = Math.max(0, annualDepreciation);

      accumulatedDepreciation += annualDepreciation;
      currentBookValue = assetCost - accumulatedDepreciation;

      // Ensure book value does not go below salvage value at the end of useful life
      if (year === usefulLife && currentBookValue < salvageValue) {
        annualDepreciation = annualDepreciation + (currentBookValue - salvageValue); // Adjust last year's depreciation
        currentBookValue = salvageValue;
      } else if (currentBookValue < salvageValue) {
        // For DDB, if it dips below salvage value before end of life, adjust
        annualDepreciation = annualDepreciation + (currentBookValue - salvageValue);
        currentBookValue = salvageValue;
      }

      schedule.push({
        year,
        annualDepreciation: Math.round(annualDepreciation),
        accumulatedDepreciation: Math.round(accumulatedDepreciation),
        bookValue: Math.round(currentBookValue),
      });
    }
    return schedule;
  }, [assetCost, salvageValue, usefulLife, depreciationMethod]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Depreciation Calculator?",
      answer: "A Depreciation Calculator is a tool that helps businesses and individuals estimate how much the value of an asset (like machinery, vehicles, or buildings) decreases over its useful life. It applies different accounting methods to spread the cost of an asset over the periods it is expected to generate revenue, which is important for financial reporting and tax purposes."
    },
    {
      question: "What is 'Depreciation'?",
      answer: "Depreciation is an accounting method of allocating the cost of a tangible asset over its useful life. Instead of expensing the entire cost of an asset in the year it was purchased, depreciation allows a business to expense a portion of the asset's cost each year, reflecting its wear and tear or obsolescence."
    },
    {
      question: "What are 'Asset Cost', 'Salvage Value', and 'Useful Life'?",
      answer: "<ul><li><strong>Asset Cost:</strong> The original purchase price of the asset, plus any costs incurred to get it ready for use (e.g., shipping, installation).</li><li><strong>Salvage Value:</strong> The estimated residual value of an asset at the end of its useful life, after which it is no longer expected to be productive.</li><li><strong>Useful Life:</strong> The estimated period (in years or units of production) over which an asset is expected to be useful to the business.</li></ul>"
    },
    {
      question: "What are the common depreciation methods?",
      answer: "The most common methods include:<ul><li><strong>Straight-Line:</strong> Depreciates the asset by an equal amount each year.</li><li><strong>Declining Balance (e.g., Double Declining Balance):</strong> Depreciates the asset more heavily in its early years and less in later years.</li><li><strong>Sum-of-the-Years' Digits (SYD):</strong> An accelerated method that results in a higher depreciation expense in the early years and a lower expense in later years, but less aggressive than DDB.</li></ul>"
    },
    {
      question: "Why is depreciation important for businesses?",
      answer: "Depreciation is crucial for several reasons:<ul><li><strong>Accurate Financial Reporting:</strong> It matches the expense of using an asset with the revenue it helps generate.</li><li><strong>Tax Benefits:</strong> Depreciation expense reduces a company's taxable income, leading to lower tax payments.</li><li><strong>Asset Valuation:</strong> It helps in determining the book value of an asset over time.</li><li><strong>Capital Planning:</strong> Understanding depreciation helps in planning for asset replacement and capital expenditures.</li></ul>"
    },
    {
      question: "How does depreciation affect my taxes?",
      answer: "Depreciation is a non-cash expense that reduces your business's taxable income. By lowering taxable income, it reduces the amount of income tax your business has to pay. This is why it's often referred to as a 'tax shield'."
    },
    {
      question: "Can I change my depreciation method?",
      answer: "Changing depreciation methods usually requires justification and approval from tax authorities (like the Income Tax Department in India) and must comply with accounting standards. It's not something that can be changed frequently without proper procedure."
    }
  ];

  const tipsForAssetManagement = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Choose the depreciation method that best reflects the asset's usage pattern and tax strategy." },
    { icon: <Factory className="w-6 h-6 text-blue-500" />, text: "Keep accurate records of asset purchases, costs, and any improvements made." },
    { icon: <Timer className="w-6 h-6 text-yellow-500" />, text: "Regularly review the useful life and salvage value estimates of your assets." },
    { icon: <ReceiptText className="w-6 h-6 text-purple-500" />, text: "Understand how depreciation impacts your financial statements and tax liability." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Consult a tax advisor or accountant for complex depreciation scenarios or specific tax planning." },
    { icon: <Wallet className="w-6 h-6 text-red-500" />, text: "Factor in depreciation when planning for future capital expenditures and asset replacement." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Comprehensive Business Tools", description: "Access a wide array of financial calculators and resources for entrepreneurs and SMEs." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Financial Advisory", description: "Connect with financial experts for guidance on asset management, accounting, and tax planning." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Business Loan Solutions", description: "Explore various loan options to acquire new assets or manage working capital efficiently." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Tax Planning Insights", description: "Gain access to valuable information and services to optimize your business's tax strategy." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-indigo-600 to-blue-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Estimate Asset Value with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Depreciation Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-indigo-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Calculate the decline in value of your assets over time using various methods.
            Essential for accounting, tax planning, and financial reporting.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Business Accounting Advisory"
                openApplyModal={openApplyModal}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Accounting Advice
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Depreciation Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-indigo-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-blue-500" /> Asset Depreciation Estimator
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Factory className="w-6 h-6 mr-2 text-indigo-600" /> Asset Details
              </h3>

              {/* Asset Cost */}
              <motion.div variants={itemVariants}>
                <label htmlFor="assetCost" className="block text-lg font-semibold text-gray-700 mb-2">
                  Asset Cost: <span className="text-purple-600">{formatCurrency(assetCost)}</span>
                </label>
                <input
                  type="range"
                  id="assetCost"
                  min="10000"
                  max="10000000"
                  step="10000"
                  value={assetCost}
                  onChange={handleAssetCostChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(assetCost)}
                  onChange={handleAssetCostChange}
                  onBlur={(e) => setAssetCost(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Salvage Value */}
              <motion.div variants={itemVariants}>
                <label htmlFor="salvageValue" className="block text-lg font-semibold text-gray-700 mb-2">
                  Salvage Value (Residual Value): <span className="text-teal-600">{formatCurrency(salvageValue)}</span>
                </label>
                <input
                  type="range"
                  id="salvageValue"
                  min="0"
                  max={assetCost * 0.5} // Max 50% of asset cost
                  step="1000"
                  value={salvageValue}
                  onChange={handleSalvageValueChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(salvageValue)}
                  onChange={handleSalvageValueChange}
                  onBlur={(e) => setSalvageValue(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Useful Life */}
              <motion.div variants={itemVariants}>
                <label htmlFor="usefulLife" className="block text-lg font-semibold text-gray-700 mb-2">
                  Useful Life (Years): <span className="text-orange-600">{usefulLife} Years</span>
                </label>
                <input
                  type="range"
                  id="usefulLife"
                  min="1"
                  max="20"
                  step="1"
                  value={usefulLife}
                  onChange={handleUsefulLifeChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="number"
                  value={usefulLife}
                  onChange={handleUsefulLifeChange}
                  onBlur={(e) => setUsefulLife(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  min="1"
                  max="20"
                />
              </motion.div>

              {/* Depreciation Method */}
              <motion.div variants={itemVariants}>
                <label htmlFor="depreciationMethod" className="block text-lg font-semibold text-gray-700 mb-2">
                  Depreciation Method:
                </label>
                <select
                  id="depreciationMethod"
                  value={depreciationMethod}
                  onChange={handleDepreciationMethodChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-red-500 focus:border-red-500 transition-all bg-white appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                >
                  <option value="straightLine">Straight-Line Method</option>
                  <option value="doubleDecliningBalance">Double Declining Balance Method</option>
                  <option value="sumOfTheYearsDigits">Sum-of-the-Years' Digits Method</option>
                </select>
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Depreciation Schedule</h3>
              <p className="text-xl text-blue-100 mb-8">Asset Cost: {formatCurrency(assetCost)} | Salvage Value: {formatCurrency(salvageValue)}</p>

              <div className="w-full overflow-x-auto">
                <table className="min-w-full bg-blue-700/30 rounded-lg shadow-inner text-sm md:text-base">
                  <thead>
                    <tr className="bg-blue-800/50 text-left">
                      <th className="py-3 px-4 rounded-tl-lg">Year</th>
                      <th className="py-3 px-4">Annual Depreciation</th>
                      <th className="py-3 px-4">Accumulated Depreciation</th>
                      <th className="py-3 px-4 rounded-tr-lg">Book Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {depreciationSchedule.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-4 px-4 text-center text-blue-200">
                          Please enter valid asset details.
                        </td>
                      </tr>
                    ) : (
                      depreciationSchedule.map((data, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`${index % 2 === 0 ? 'bg-blue-700/20' : 'bg-blue-700/10'} hover:bg-blue-700/40 transition-colors`}
                        >
                          <td className="py-3 px-4">{data.year}</td>
                          <td className="py-3 px-4">{formatCurrency(data.annualDepreciation)}</td>
                          <td className="py-3 px-4">{formatCurrency(data.accumulatedDepreciation)}</td>
                          <td className="py-3 px-4">{formatCurrency(data.bookValue)}</td>
                        </motion.tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          {/* Custom CSS for range input thumbs and scrollbar */}
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

            input[type="range"]:active::-webkit-slider-thumb {
              cursor: grabbing;
            }
            input[type="range"]:active::-moz-range-thumb {
              cursor: grabbing;
            }

            /* Custom Scrollbar for tables */
            .custom-scrollbar::-webkit-scrollbar {
              height: 8px;
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.1);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: rgba(255, 255, 255, 0.3);
              border-radius: 10px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: rgba(255, 255, 255, 0.5);
            }
          `}</style>
        </motion.div>

        {/* Informational Sections */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-lg mt-6 space-y-10">
          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Depreciation Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Depreciation Calculator is a crucial financial tool for businesses and individuals who own tangible assets like machinery, vehicles, or buildings. It helps in systematically allocating the cost of an asset over its estimated useful life. Instead of recording the entire cost of an asset as an expense in the year it was purchased, depreciation allows a portion of its cost to be expensed each year. This reflects the asset's wear and tear, obsolescence, or consumption over time. This calculator provides a simple way to compute annual depreciation, accumulated depreciation, and the asset's book value using various standard accounting methods, which is vital for accurate financial reporting, tax compliance, and strategic business planning.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Depreciation Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Asset Cost:</strong> Input the total cost of the asset, including its purchase price and any additional expenses required to get it ready for use (e.g., shipping, installation, customization).</motion.li>
              <motion.li variants={itemVariants}><strong>Input Salvage Value:</strong> Provide the estimated residual value of the asset at the end of its useful life. This is the amount you expect to sell it for, or its scrap value.</motion.li>
              <motion.li variants={itemVariants}><strong>Define Useful Life (Years):</strong> Specify the number of years over which you expect the asset to be productive and generate economic benefits for your business.</motion.li>
              <motion.li variants={itemVariants}><strong>Select Depreciation Method:</strong> Choose the accounting method you wish to use:
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li><strong>Straight-Line Method:</strong> Spreads the depreciation evenly over the asset's useful life.</li>
                  <li><strong>Double Declining Balance Method:</strong> An accelerated method that records more depreciation expense in the early years of an asset's life.</li>
                  <li><strong>Sum-of-the-Years' Digits Method:</strong> Another accelerated method, providing a higher depreciation expense in earlier years.</li>
                </ul>
              </motion.li>
              <motion.li variants={itemVariants}><strong>Review Depreciation Schedule:</strong> The calculator will instantly generate a detailed year-by-year schedule, showing the annual depreciation expense, accumulated depreciation (total depreciation to date), and the asset's book value (cost minus accumulated depreciation) for each year.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingDown className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Depreciation Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Accurate Financial Reporting:</strong> Ensures your financial statements (like the Income Statement and Balance Sheet) accurately reflect the true cost of using assets and their declining value.</motion.li>
              <motion.li variants={itemVariants}><strong>Tax Optimization:</strong> Helps in calculating the correct depreciation expense, which reduces your taxable income and consequently your tax liability, acting as a 'tax shield'.</motion.li>
              <motion.li variants={itemVariants}><strong>Strategic Planning:</strong> Provides insights into the asset's remaining book value, aiding in decisions about asset replacement, upgrades, or disposal.</motion.li>
              <motion.li variants={itemVariants}><strong>Budgeting & Forecasting:</strong> Essential for businesses to accurately forecast expenses and cash flows related to asset ownership and replacement cycles.</motion.li>
              <motion.li variants={itemVariants}><strong>Compliance:</strong> Helps ensure adherence to accounting standards (e.g., Ind AS, IFRS) and tax laws regarding asset valuation and expense recognition.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Depreciation Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Depreciation:</strong> An accounting method of allocating the cost of a tangible asset over its useful life. It reduces the asset's book value on the balance sheet and is recorded as an expense on the income statement.</motion.p>
              <motion.p variants={itemVariants}><strong>Asset Cost:</strong> The total amount spent to acquire an asset and get it ready for its intended use.</motion.p>
              <motion.p variants={itemVariants}><strong>Salvage Value (Residual Value):</strong> The estimated value of an asset at the end of its useful life, after all depreciation has been expensed.</motion.p>
              <motion.p variants={itemVariants}><strong>Useful Life:</strong> The estimated period over which an asset is expected to be used by the business, or the number of units of production it is expected to yield.</motion.p>
              <motion.p variants={itemVariants}><strong>Depreciable Base:</strong>{` The total amount of an asset's cost that can be depreciated. Calculated as $$ \\text{Asset Cost} - \\text{Salvage Value} $$.`}</motion.p>
              <motion.p variants={itemVariants}><strong>Annual Depreciation:</strong> The amount of depreciation expense recorded for an asset in a single year.</motion.p>
              <motion.p variants={itemVariants}><strong>Accumulated Depreciation:</strong> The total amount of depreciation expense that has been recorded for an asset since it was put into service. It is a contra-asset account on the balance sheet.</motion.p>
              <motion.p variants={itemVariants}><strong>Book Value (Carrying Value):</strong>{` The net value of an asset on the balance sheet, calculated as its original cost minus its accumulated depreciation ($$ \\text{Asset Cost} - \\text{Accumulated Depreciation} $$).`}</motion.p>
              <motion.p variants={itemVariants}><strong>Straight-Line Method:</strong> A depreciation method that allocates an equal amount of depreciation expense to each period of an asset's useful life.</motion.p>
              <motion.p variants={itemVariants}><strong>Accelerated Depreciation:</strong> Depreciation methods (like Declining Balance or SYD) that record higher depreciation expenses in the early years of an asset's life and lower expenses in later years.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Effective Asset Management & Depreciation
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForAssetManagement.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Business & Financial Needs?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-indigo-600 to-blue-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Need Expert Accounting & Tax Advice?
            </motion.h2>
            <motion.p
              className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart offers comprehensive financial tools and expert advisory services
              to help you manage your assets, optimize taxes, and ensure accurate financial reporting.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Accounting & Tax Advisory"
                  openApplyModal={openApplyModal}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Connect with an Accountant
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Connect with an Accountant</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default DepreciationCalculatorPage;
