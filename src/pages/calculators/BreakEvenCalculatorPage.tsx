import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, TrendingUp as TrendingUpIcon, Landmark
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


// --- Main Break-even Calculator Page Component ---
interface BreakEvenCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const BreakEvenCalculatorPage: React.FC<BreakEvenCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [fixedCosts, setFixedCosts] = useState<number>(500000); // Total Fixed Costs
  const [sellingPricePerUnit, setSellingPricePerUnit] = useState<number>(500); // Selling Price per Unit
  const [variableCostPerUnit, setVariableCostPerUnit] = useState<number>(200); // Variable Cost per Unit

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for direct input fields (with formatting)
  const handleFixedCostsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setFixedCosts(Number(value));
  };

  const handleSellingPricePerUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellingPricePerUnit(Number(e.target.value));
  };

  const handleVariableCostPerUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariableCostPerUnit(Number(e.target.value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Break-even Calculation
  const calculations = useMemo(() => {
    const FC = fixedCosts;
    const SP = sellingPricePerUnit;
    const VC = variableCostPerUnit;

    const contributionMarginPerUnit = SP - VC;
    let breakEvenUnits = 0;
    let breakEvenRevenue = 0;
    let contributionMarginRatio = 0;

    if (contributionMarginPerUnit > 0) {
      breakEvenUnits = FC / contributionMarginPerUnit;
      contributionMarginRatio = (contributionMarginPerUnit / SP) * 100;
      breakEvenRevenue = FC / (contributionMarginPerUnit / SP); // FC / Contribution Margin Ratio (as decimal)
    }

    return {
      contributionMarginPerUnit: Math.round(contributionMarginPerUnit),
      contributionMarginRatio: contributionMarginRatio.toFixed(2),
      breakEvenUnits: Math.ceil(breakEvenUnits), // Round up to cover costs fully
      breakEvenRevenue: Math.round(breakEvenRevenue),
    };
  }, [fixedCosts, sellingPricePerUnit, variableCostPerUnit]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Break-even Calculator?",
      answer: "A Break-even Calculator is a financial tool that helps businesses determine the point at which their total revenues equal their total costs, resulting in zero profit. It helps identify the minimum sales volume (in units or revenue) required to cover all expenses."
    },
    {
      question: "What are Fixed Costs?",
      answer: "Fixed costs are expenses that do not change regardless of the level of production or sales volume. Examples include rent, salaries of administrative staff, insurance premiums, and depreciation of machinery."
    },
    {
      question: "What are Variable Costs?",
      answer: "Variable costs are expenses that directly vary with the level of production or sales volume. Examples include raw materials, direct labor costs per unit, production supplies, and sales commissions."
    },
    {
      question: "What is 'Contribution Margin'?",
      answer: "Contribution Margin is the revenue per unit minus the variable cost per unit. It represents the portion of sales revenue that contributes to covering fixed costs and generating profit. A higher contribution margin is generally better."
    },
    {
      question: "What is 'Contribution Margin Ratio'?",
      answer: "The Contribution Margin Ratio is the contribution margin per unit divided by the selling price per unit, expressed as a percentage. It indicates the percentage of each sale that is available to cover fixed costs and generate profit."
    },
    {
      question: "Why is break-even analysis important for businesses?",
      answer: "Break-even analysis helps businesses understand their financial viability, set realistic sales targets, make informed pricing decisions, evaluate new product launches, and assess the impact of cost changes. It's a fundamental tool for strategic planning."
    },
    {
      question: "Can this calculator be used for services businesses?",
      answer: "Yes, this calculator can be adapted for services businesses. For services, 'units' might refer to hours of service, projects completed, or clients served, and 'variable cost per unit' would be the direct cost associated with delivering that unit of service."
    }
  ];

  const tipsForBusinessPlanning = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Regularly calculate your break-even point, especially with changing costs." },
    { icon: <TrendingDown className="w-6 h-6 text-blue-500" />, text: "Look for ways to reduce fixed and variable costs without compromising quality." },
    { icon: <TrendingUpIcon className="w-6 h-6 text-yellow-500" />, text: "Increase your selling price per unit if market conditions allow, to boost contribution margin." },
    { icon: <BarChart className="w-6 h-6 text-purple-500" />, text: "Analyze different scenarios (e.g., higher rent, lower raw material costs) using the calculator." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Use break-even analysis to set realistic sales targets for your team." },
    { icon: <Briefcase className="w-6 h-6 text-red-500" />, text: "Consider the impact of new product lines or expansion on your break-even point." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Comprehensive Business Tools", description: "Access a wide array of financial calculators and resources for entrepreneurs and SMEs." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Business Advisory", description: "Connect with financial experts for guidance on business planning, funding, and growth." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Funding Solutions", description: "Explore various business loan options to help your venture grow and achieve profitability." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Market Insights", description: "Gain access to valuable market data and trends to inform your business strategies." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Find Your Business's{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Break-even Point.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-indigo-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Calculate the sales required to cover your fixed and variable costs.
            Essential for business planning and financial stability.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Business Planning Inquiry"
                openApplyModal={openApplyModal}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Business Advisory
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Break-even Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-indigo-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-purple-500" /> Break-even Point Analysis
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Briefcase className="w-6 h-6 mr-2 text-indigo-600" /> Your Business Costs & Revenue
              </h3>

              {/* Fixed Costs */}
              <motion.div variants={itemVariants}>
                <label htmlFor="fixedCosts" className="block text-lg font-semibold text-gray-700 mb-2">
                  Total Fixed Costs: <span className="text-blue-600">{formatCurrency(fixedCosts)}</span>
                </label>
                <input
                  type="range"
                  id="fixedCosts"
                  min="100000"
                  max="5000000"
                  step="10000"
                  value={fixedCosts}
                  onChange={handleFixedCostsChange}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(fixedCosts)}
                  onChange={handleFixedCostsChange}
                  onBlur={(e) => setFixedCosts(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Selling Price Per Unit */}
              <motion.div variants={itemVariants}>
                <label htmlFor="sellingPricePerUnit" className="block text-lg font-semibold text-gray-700 mb-2">
                  Selling Price Per Unit: <span className="text-teal-600">{formatCurrency(sellingPricePerUnit)}</span>
                </label>
                <input
                  type="range"
                  id="sellingPricePerUnit"
                  min="10"
                  max="5000"
                  step="10"
                  value={sellingPricePerUnit}
                  onChange={handleSellingPricePerUnitChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="number"
                  value={sellingPricePerUnit}
                  onChange={handleSellingPricePerUnitChange}
                  onBlur={(e) => setSellingPricePerUnit(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  step="1"
                />
              </motion.div>

              {/* Variable Cost Per Unit */}
              <motion.div variants={itemVariants}>
                <label htmlFor="variableCostPerUnit" className="block text-lg font-semibold text-gray-700 mb-2">
                  Variable Cost Per Unit: <span className="text-orange-600">{formatCurrency(variableCostPerUnit)}</span>
                </label>
                <input
                  type="range"
                  id="variableCostPerUnit"
                  min="1"
                  max={sellingPricePerUnit - 1} // Must be less than selling price
                  step="1"
                  value={variableCostPerUnit}
                  onChange={handleVariableCostPerUnitChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="number"
                  value={variableCostPerUnit}
                  onChange={handleVariableCostPerUnitChange}
                  onBlur={(e) => setVariableCostPerUnit(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  min="1"
                  max={sellingPricePerUnit - 1}
                />
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Break-even Point</h3>
              <motion.div
                key={calculations.breakEvenUnits} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
              >
                {calculations.breakEvenUnits} Units
              </motion.div>
              <p className="text-xl text-indigo-100 mb-8">Required Sales Volume</p>

              <div className="w-full space-y-4 text-lg">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Break-even Revenue</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.breakEvenRevenue)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Wallet className="w-5 h-5" /> Fixed Costs</span>
                  <span className="font-bold text-white">{formatCurrency(fixedCosts)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Coins className="w-5 h-5" /> Contribution Margin per Unit</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.contributionMarginPerUnit)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Percent className="w-5 h-5" /> Contribution Margin Ratio</span>
                  <span className="font-bold text-white">{calculations.contributionMarginRatio}%</span>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Break-even Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Break-even Calculator is a fundamental financial tool for any business, whether a startup or an established enterprise. It helps you determine the 'break-even point' – the specific level of sales (either in units sold or total revenue) at which your business's total revenues exactly equal its total costs. At this point, your business is neither making a profit nor incurring a loss. Understanding your break-even point is crucial because it tells you the minimum sales volume you need to achieve just to cover your expenses, providing a critical benchmark for financial viability and strategic planning.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Break-even Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Total Fixed Costs:</strong> Input all your expenses that do not change with production volume, such as rent, insurance, and salaries of permanent staff. This is your baseline cost.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Selling Price Per Unit:</strong> Specify the price at which you sell each individual product or service. This is your per-unit revenue.</motion.li>
              <motion.li variants={itemVariants}><strong>Enter Variable Cost Per Unit:</strong> Provide the cost directly associated with producing one unit of your product or service, such as raw materials and direct labor. This cost varies with each unit produced.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Instant Results:</strong> The calculator will immediately display your Break-even Point in Units (how many items you need to sell) and Break-even Revenue (the total sales value needed). It also shows your Contribution Margin per Unit and Contribution Margin Ratio, offering deeper insights into your profitability structure.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUpIcon className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Break-even Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Assess Business Viability:</strong> Quickly determine if your business model is sustainable by understanding the minimum sales required to avoid losses.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Sales Targets:</strong> Provides a clear, data-driven target for your sales team, motivating them to reach beyond the break-even point for profitability.</motion.li>
              <motion.li variants={itemVariants}><strong>Inform Pricing Strategies:</strong> Helps you evaluate if your current pricing is adequate to cover costs and generate profit, or if adjustments are needed.</motion.li>
              <motion.li variants={itemVariants}><strong>Evaluate New Ventures:</strong> Essential for analyzing the financial feasibility of new product launches, expansion plans, or entirely new business ideas before significant investment.</motion.li>
              <motion.li variants={itemVariants}><strong>Cost Control & Management:</strong> Highlights the impact of changes in fixed or variable costs on your profitability, encouraging effective cost management strategies.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Break-even Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Break-even Point:</strong> The level of sales (in units or revenue) at which total costs equal total revenue, resulting in zero profit or loss.</motion.p>
              <motion.p variants={itemVariants}><strong>Fixed Costs:</strong> Expenses that do not vary with the level of production or sales volume. Examples include rent, insurance, administrative salaries, and property taxes.</motion.p>
              <motion.p variants={itemVariants}><strong>Variable Costs:</strong> Expenses that change in direct proportion to the level of production or sales volume. Examples include raw materials, direct labor, production supplies, and sales commissions.</motion.p>
              <motion.p variants={itemVariants}><strong>Selling Price Per Unit:</strong> The price at which a single unit of a product or service is sold to the customer.</motion.p>
              <motion.p variants={itemVariants}><strong>Variable Cost Per Unit:</strong> The cost incurred to produce one additional unit of a product or service.</motion.p>
              <motion.p variants={itemVariants}><strong>Contribution Margin Per Unit:</strong>{` The amount of revenue per unit that remains after covering variable costs. It contributes towards covering fixed costs and generating profit ($$ \\text{Selling Price Per Unit} - \\text{Variable Cost Per Unit} $$).`}</motion.p>
              <motion.p variants={itemVariants}><strong>Contribution Margin Ratio:</strong>{` The percentage of sales revenue that is available to cover fixed costs and generate profit ($$ \\frac{\\text{Contribution Margin Per Unit}}{\\text{Selling Price Per Unit}} \\times 100 $$).`}</motion.p>
              <motion.p variants={itemVariants}><strong>Total Revenue:</strong>{` The total amount of money generated from sales ($$ \\text{Selling Price Per Unit} \\times \\text{Number of Units Sold} $$).`}</motion.p>
              <motion.p variants={itemVariants}><strong>Total Costs:</strong>{` The sum of fixed costs and total variable costs ($$ \\text{Fixed Costs} + (\\text{Variable Cost Per Unit} \\times \\text{Number of Units Sold}) $$).`}</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Business Planning with Break-even Analysis
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForBusinessPlanning.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Business Needs?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Grow Your Business?
            </motion.h2>
            <motion.p
              className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart offers a range of business financial solutions, from loans to advisory services,
              to help you achieve profitability and sustainable growth.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Business Growth Solutions"
                  openApplyModal={openApplyModal}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Explore Business Solutions
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Explore Business Solutions</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default BreakEvenCalculatorPage;
