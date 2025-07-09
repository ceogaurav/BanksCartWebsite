import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank,
  ArrowRightLeft, ArrowUpCircle, ArrowDownCircle, Home, Car, Utensils, Zap, BookOpen, HeartPulse, Landmark,
  Film, ShoppingBag, PlusCircle, MinusCircle, CreditCard, PiggyBank as SavingsIcon, Layers, GraduationCap, Stethoscope
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


// --- Main Expense Calculator Page Component ---
interface ExpenseCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const ExpenseCalculatorPage: React.FC<ExpenseCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [monthlyIncome, setMonthlyIncome] = useState<number>(80000);
  const [expenseCategories, setExpenseCategories] = useState([
    { id: 'housing', name: 'Housing (Rent/EMI)', value: 20000, icon: <Home className="w-5 h-5" /> },
    { id: 'food', name: 'Food & Groceries', value: 12000, icon: <Utensils className="w-5 h-5" /> },
    { id: 'transportation', name: 'Transportation', value: 7000, icon: <Car className="w-5 h-5" /> },
    { id: 'utilities', name: 'Utilities (Electricity, Water, Gas)', value: 4000, icon: <Zap className="w-5 h-5" /> },
    { id: 'debt', name: 'Debt Payments (Loans, Credit Cards)', value: 10000, icon: <CreditCard className="w-5 h-5" /> },
    { id: 'personal', name: 'Personal Care & Shopping', value: 6000, icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'entertainment', name: 'Entertainment & Leisure', value: 4000, icon: <Film className="w-5 h-5" /> },
    { id: 'education', name: 'Education', value: 3000, icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'health', name: 'Health & Medical', value: 2000, icon: <Stethoscope className="w-5 h-5" /> },
    { id: 'miscellaneous', name: 'Miscellaneous', value: 5000, icon: <Layers className="w-5 h-5" /> },
  ]);

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for inputs
  const handleMonthlyIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setMonthlyIncome(Number(value));
  };

  const handleExpenseChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setExpenseCategories(prevCategories =>
      prevCategories.map(cat =>
        cat.id === id ? { ...cat, value: Number(value) } : cat
      )
    );
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Expense Calculations
  const calculations = useMemo(() => {
    const totalExpenses = expenseCategories.reduce((sum, category) => sum + category.value, 0);
    const netSavingsOrDeficit = monthlyIncome - totalExpenses;

    const expenseBreakdown = expenseCategories.map(category => ({
      ...category,
      percentageOfTotal: totalExpenses > 0 ? (category.value / totalExpenses * 100).toFixed(1) : '0.0',
      percentageOfIncome: monthlyIncome > 0 ? (category.value / monthlyIncome * 100).toFixed(1) : '0.0',
    }));

    return {
      totalExpenses: totalExpenses,
      netSavingsOrDeficit: netSavingsOrDeficit,
      expenseBreakdown: expenseBreakdown,
      isSurplus: netSavingsOrDeficit >= 0,
    };
  }, [monthlyIncome, expenseCategories]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is an Expense Calculator?",
      answer: "An Expense Calculator is a tool designed to help you meticulously track and categorize all your monthly spending. By inputting your income and various expense amounts, it provides a clear, organized overview of where your money is going, helping you identify spending patterns, areas for potential savings, and ultimately gain better control over your financial health."
    },
    {
      question: "Why is tracking expenses important?",
      answer: "Tracking expenses is the first step towards effective financial management. It helps you:<ul><li>Understand your spending habits.</li><li>Identify unnecessary expenditures.</li><li>Create a realistic budget.</li><li>Stay out of debt or pay off existing debt faster.</li><li>Allocate funds towards savings and investments.</li><li>Achieve your financial goals.</li></ul>"
    },
    {
      question: "What are common expense categories?",
      answer: "Common expense categories typically include: Housing (rent/EMI), Food & Groceries, Transportation, Utilities (electricity, water, gas), Debt Payments (loans, credit cards), Personal Care & Shopping, Entertainment, Education, Health & Medical, and Miscellaneous (for everything else)."
    },
    {
      question: "How often should I track my expenses?",
      answer: "For best results, track your expenses regularly – ideally daily or weekly. This helps you stay on top of your spending and makes it easier to categorize transactions accurately. Reviewing your overall expenses monthly is crucial for budget adjustments."
    },
    {
      question: "What's the difference between 'needs' and 'wants'?",
      answer: "<ul><li><strong>Needs:</strong> Essential expenses required for survival and basic living, such as housing, food, utilities, and transportation to work.</li><li><strong>Wants:</strong> Discretionary expenses that are not essential but improve quality of life, such as dining out, entertainment, vacations, and non-essential shopping. Differentiating these helps in prioritizing spending.</li></ul>"
    },
    {
      question: "Can I use this for business expenses?",
      answer: "Yes, while the categories here are more consumer-oriented, the principle applies to businesses. You would track business revenues as income and categorize business expenses (e.g., operational costs, marketing, salaries, rent) to understand your business's profitability and cash flow. For detailed business accounting, professional software is recommended."
    },
    {
      question: "How can I reduce my expenses?",
      answer: "To reduce expenses, start by identifying your 'wants' and look for areas to cut back. Negotiate bills, look for cheaper alternatives for services, plan meals to reduce food waste, and review subscriptions you don't use. Small changes can add up significantly over time."
    }
  ];

  const tipsForExpenseTracking = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Automate tracking using banking apps or dedicated expense management tools." },
    { icon: <ReceiptText className="w-6 h-6 text-blue-500" />, text: "Keep all receipts, especially for large or unusual expenses." },
    { icon: <BarChart className="w-6 h-6 text-yellow-500" />, text: "Review your expenses regularly (e.g., weekly or monthly) to stay informed." },
    { icon: <Lightbulb className="w-6 h-6 text-purple-500" />, text: "Set realistic spending limits for each category and try to stick to them." },
    { icon: <Wallet className="w-6 h-6 text-orange-500" />, text: "Identify 'money leaks' – small, frequent expenses that add up over time." },
    { icon: <TrendingDown className="w-6 h-6 text-red-500" />, text: "Prioritize essential expenses before allocating funds to discretionary spending." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Comprehensive Financial Tools", description: "Access a wide array of calculators and resources for personal and business financial planning." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Financial Advisory", description: "Connect with financial experts for personalized guidance on budgeting, savings, and investments." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Smart Investment Options", description: "Explore tailored investment products to help you achieve your financial goals efficiently." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Debt Management Solutions", description: "Find strategies and solutions to manage and reduce your debt effectively." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Track & Categorize Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Monthly Expenses.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-purple-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Estimate cash inflows and outflows for businesses or investments.
            Gain clarity on your liquidity and financial health.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Expense Tracking & Financial Planning Inquiry"
                openApplyModal={openApplyModal}
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Financial Planning Advice
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Expense Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-purple-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-indigo-500" /> Monthly Expense Tracker
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Wallet className="w-6 h-6 mr-2 text-purple-600" /> Your Monthly Financials
              </h3>

              {/* Monthly Income */}
              <motion.div variants={itemVariants}>
                <label htmlFor="monthlyIncome" className="block text-lg font-semibold text-gray-700 mb-2">
                  Total Monthly Income: <span className="text-green-600">{formatCurrency(monthlyIncome)}</span>
                </label>
                <input
                  type="range"
                  id="monthlyIncome"
                  min="0"
                  max="500000"
                  step="1000"
                  value={monthlyIncome}
                  onChange={handleMonthlyIncomeChange}
                  className="w-full h-2 bg-gradient-to-r from-green-300 to-green-500 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(monthlyIncome)}
                  onChange={handleMonthlyIncomeChange}
                  onBlur={(e) => setMonthlyIncome(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-green-500 focus:border-green-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Expense Categories */}
              <h4 className="text-xl font-bold text-gray-800 mb-2 mt-6 flex items-center">
                <ReceiptText className="w-5 h-5 mr-2 text-purple-600" /> Monthly Expenses
              </h4>
              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                {expenseCategories.map((category) => (
                  <motion.div key={category.id} variants={itemVariants} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <label htmlFor={category.id} className="block text-base font-medium text-gray-700 mb-1 flex items-center">
                      {category.icon} <span className="ml-2">{category.name}:</span> <span className="text-red-600 ml-2">{formatCurrency(category.value)}</span>
                    </label>
                    <input
                      type="range"
                      id={category.id}
                      min="0"
                      max="100000"
                      step="500"
                      value={category.value}
                      onChange={(e) => handleExpenseChange(category.id, e)}
                      className="w-full h-2 bg-gradient-to-r from-red-300 to-red-500 rounded-lg appearance-none cursor-pointer accent-red-600"
                    />
                    <input
                      type="text"
                      value={formatNumberWithCommas(category.value)}
                      onChange={(e) => handleExpenseChange(category.id, e)}
                      onBlur={(e) => handleExpenseChange(category.id, e)}
                      className="mt-2 w-full p-2 border border-gray-300 rounded-lg text-gray-800 text-center text-base focus:ring-red-500 focus:border-red-500 transition-all"
                      inputMode="numeric"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Expense Summary</h3>
              <motion.div
                key={calculations.totalExpenses} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg text-red-300"
              >
                {formatCurrency(calculations.totalExpenses)}
              </motion.div>
              <p className="text-xl text-purple-100 mb-8">Total Monthly Expenses</p>

              <div className="w-full space-y-4 text-lg">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-purple-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><ArrowUpCircle className="w-5 h-5" /> Total Monthly Income</span>
                  <span className="font-bold text-white">{formatCurrency(monthlyIncome)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-purple-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><SavingsIcon className="w-5 h-5" /> Net Savings/Deficit</span>
                  <span className={`font-bold ${calculations.isSurplus ? 'text-green-300' : 'text-red-300'}`}>
                    {formatCurrency(calculations.netSavingsOrDeficit)}
                  </span>
                </motion.div>
              </div>

              {/* Expense Breakdown */}
              <h4 className="text-xl font-bold text-white mt-8 mb-4">Expense Breakdown:</h4>
              <div className="w-full space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                {calculations.expenseBreakdown.map((category, index) => (
                  <motion.div key={index} variants={itemVariants} className="bg-purple-700/20 p-3 rounded-lg text-sm flex justify-between items-center">
                    <span className="flex items-center">
                      {category.icon} <span className="ml-2">{category.name}:</span>
                    </span>
                    <span className="font-bold">{formatCurrency(category.value)} ({category.percentageOfIncome}% of Income)</span>
                  </motion.div>
                ))}
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

            /* Custom Scrollbar for expense categories */
            .custom-scrollbar::-webkit-scrollbar {
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is an Expense Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              An Expense Calculator is an indispensable financial tool designed to help individuals and businesses gain precise control over their spending. It provides a structured way to record and categorize all your cash outflows over a specific period, typically on a monthly basis. By inputting your income and then detailing various expense amounts, this calculator helps you visualize exactly where your money is going. This clarity is crucial for identifying areas of overspending, pinpointing opportunities for savings, and ensuring you have enough funds to meet your financial obligations and achieve your long-term financial goals. It's the first step towards building a robust budget and fostering financial discipline.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Expense Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Total Monthly Income:</strong> Begin by inputting your total expected income for the month. This provides context for your spending and helps determine your savings potential.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Monthly Expenses by Category:</strong> Go through each pre-defined expense category (e.g., Housing, Food, Transportation, Utilities, Debt Payments, Personal Care, Entertainment, Education, Health, Miscellaneous) and enter your estimated or actual spending for that category for the month. Be as accurate as possible for the most useful insights.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Expense Summary:</strong> The calculator will instantly tabulate your Total Monthly Expenses. More importantly, it will calculate your Net Savings or Deficit (Income - Total Expenses) and provide a percentage breakdown of how much of your income is allocated to each expense category. This helps you quickly spot areas where you might be overspending.</motion.li>
              <motion.li variants={itemVariants}><strong>Adjust and Optimize:</strong> If your expenses exceed your income, or if you simply want to increase your savings, use the insights from the breakdown to adjust your spending in various categories. Experiment with different amounts to find a sustainable financial plan.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use an Expense Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Achieve Financial Clarity:</strong> Get a crystal-clear picture of your financial inflows and outflows, eliminating guesswork about where your money goes.</motion.li>
              <motion.li variants={itemVariants}><strong>Identify Overspending:</strong> Easily spot categories where you might be spending excessively, allowing you to make informed decisions to cut back.</motion.li>
              <motion.li variants={itemVariants}><strong>Improve Budgeting:</strong> Forms the foundation for creating a realistic and effective budget, ensuring you live within your means and allocate funds wisely.</motion.li>
              <motion.li variants={itemVariants}><strong>Boost Savings & Investments:</strong> By identifying areas to reduce expenses, you can free up more capital to direct towards your savings goals or investment opportunities.</motion.li>
              <motion.li variants={itemVariants}><strong>Reduce Financial Stress:</strong> Gaining control over your expenses and having a clear financial plan can significantly reduce anxiety and stress related to money.</motion.li>
              <motion.li variants={itemVariants}><strong>Support Debt Repayment:</strong> Helps in finding extra funds that can be used to accelerate debt repayment, saving you interest and moving you closer to financial freedom.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Expense Tracking Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Expense:</strong> Money spent or paid out for goods, services, or obligations.</motion.p>
              <motion.p variants={itemVariants}><strong>Income:</strong> All money received from various sources, such as salary, business profits, freelance earnings, or investment returns.</motion.p>
              <motion.p variants={itemVariants}><strong>Expense Category:</strong> A classification used to group similar types of expenditures (e.g., Housing, Food, Transportation).</motion.p>
              <motion.p variants={itemVariants}><strong>Fixed Expenses:</strong> Costs that generally remain constant each month, such as rent/mortgage payments, loan EMIs, and insurance premiums.</motion.p>
              <motion.p variants={itemVariants}><strong>Variable Expenses:</strong> Costs that fluctuate from month to month, such as groceries, utility bills (which can vary with usage), entertainment, and transportation costs.</motion.p>
              <motion.p variants={itemVariants}><strong>Needs:</strong> Essential expenses required for living and basic well-being (e.g., shelter, food, basic healthcare, work transportation).</motion.p>
              <motion.p variants={itemVariants}><strong>Wants:</strong> Discretionary expenses that are not essential for survival but enhance quality of life (e.g., dining out, vacations, new gadgets, hobbies).</motion.p>
              <motion.p variants={itemVariants}><strong>Net Savings/Deficit:</strong> The difference between your total income and total expenses. A positive value indicates savings, while a negative value indicates a deficit.</motion.p>
              <motion.p variants={itemVariants}><strong>Budget:</strong> A financial plan that outlines expected income and expenses over a specific period, often created based on expense tracking data.</motion.p>
              <motion.p variants={itemVariants}><strong>Financial Goal:</strong> A specific objective that requires financial planning and action, such as building an emergency fund, saving for a down payment, or retiring early.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Effective Expense Tracking
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForExpenseTracking.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Financial Journey?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Master Your Expenses?
            </motion.h2>
            <motion.p
              className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart offers comprehensive financial tools, expert advice, and tailored solutions
              to help you track spending, build savings, and achieve financial freedom.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Expense Management Advisory"
                  openApplyModal={openApplyModal}
                  className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Connect with a Financial Advisor
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Connect with a Financial Advisor</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCalculatorPage;
