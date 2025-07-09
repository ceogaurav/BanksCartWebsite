import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank,
  ArrowRightLeft, ArrowUpCircle, ArrowDownCircle, Home, Car, Utensils, Zap, BookOpen, HeartPulse, Landmark,
  Film, ShoppingBag, PlusCircle, MinusCircle, CreditCard, PiggyBank as SavingsIcon, Layers
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


// --- Main Budget Calculator Page Component ---
interface BudgetCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const BudgetCalculatorPage: React.FC<BudgetCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [monthlyIncome, setMonthlyIncome] = useState<number>(80000);
  const [expenseCategories, setExpenseCategories] = useState([
    { id: 'housing', name: 'Housing (Rent/EMI)', value: 25000, icon: <Home className="w-5 h-5" /> },
    { id: 'food', name: 'Food & Groceries', value: 15000, icon: <Utensils className="w-5 h-5" /> },
    { id: 'transportation', name: 'Transportation', value: 8000, icon: <Car className="w-5 h-5" /> },
    { id: 'utilities', name: 'Utilities (Electricity, Water, Gas)', value: 5000, icon: <Zap className="w-5 h-5" /> },
    { id: 'debt', name: 'Debt Payments (Loans, Credit Cards)', value: 10000, icon: <CreditCard className="w-5 h-5" /> },
    { id: 'personal', name: 'Personal Care & Shopping', value: 7000, icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'entertainment', name: 'Entertainment & Leisure', value: 5000, icon: <Film className="w-5 h-5" /> },
    { id: 'savings', name: 'Savings & Investments', value: 10000, icon: <SavingsIcon className="w-5 h-5" /> },
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

  // Memoized Budget Calculations
  const calculations = useMemo(() => {
    const totalExpenses = expenseCategories.reduce((sum, category) => sum + category.value, 0);
    const netSavingsOrDeficit = monthlyIncome - totalExpenses;

    const expensePercentages = expenseCategories.map(category => ({
      ...category,
      percentage: monthlyIncome > 0 ? (category.value / monthlyIncome * 100).toFixed(1) : '0.0',
    }));

    return {
      totalExpenses: totalExpenses,
      netSavingsOrDeficit: netSavingsOrDeficit,
      expensePercentages: expensePercentages,
      isSurplus: netSavingsOrDeficit >= 0,
    };
  }, [monthlyIncome, expenseCategories]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Budget Calculator?",
      answer: "A Budget Calculator is a financial tool that helps you create a detailed plan for how you will spend and save your money. It allows you to track your income and categorize your expenses, giving you a clear picture of where your money is going and helping you identify areas for savings or adjustment. This is essential for both personal finance and business financial management."
    },
    {
      question: "Why is budgeting important?",
      answer: "Budgeting is crucial for financial stability and achieving financial goals. It helps you:<ul><li>Gain control over your money.</li><li>Avoid debt or pay off existing debt.</li><li>Build savings for emergencies or future goals (e.g., down payment, retirement).</li><li>Make informed spending decisions.</li><li>Reduce financial stress.</li></ul>"
    },
    {
      question: "What is the '50/30/20 Rule' of budgeting?",
      answer: "The 50/30/20 rule is a popular budgeting guideline:<ul><li><strong>50% of income for Needs:</strong> Essential expenses like housing, utilities, groceries, transportation.</li><li><strong>30% of income for Wants:</strong> Discretionary spending like dining out, entertainment, hobbies, shopping.</li><li><strong>20% of income for Savings & Debt Repayment:</strong> Contributions to savings, investments, and paying off high-interest debt.</li></ul>"
    },
    {
      question: "How often should I update my budget?",
      answer: "It's recommended to review and adjust your budget regularly, ideally monthly or quarterly. Life circumstances, income, and expenses can change, so a flexible budget that adapts to your current situation is most effective."
    },
    {
      question: "What if my expenses exceed my income (a deficit)?",
      answer: "If your budget shows a deficit, it means you are spending more than you earn. This is a critical signal to re-evaluate your spending. You should look for areas to cut discretionary expenses ('wants') first, then consider ways to reduce 'needs' or increase your income."
    },
    {
      question: "Can I use this for business budgeting?",
      answer: "Yes, while the categories here are more consumer-oriented, the principle applies to businesses. You would track business revenues as income and categorize business expenses (e.g., operational costs, marketing, salaries, rent) to understand your business's profitability and cash flow."
    },
    {
      question: "What are 'Fixed' and 'Variable' expenses in a budget?",
      answer: "<ul><li><strong>Fixed Expenses:</strong> Costs that generally stay the same each month, like rent/mortgage, loan EMIs, insurance premiums.</li><li><strong>Variable Expenses:</strong> Costs that fluctuate month-to-month, like groceries, utility bills (can vary with usage), entertainment, and transportation.</li></ul>"
    }
  ];

  const tipsForEffectiveBudgeting = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Track every rupee: Know exactly where your money is going." },
    { icon: <PiggyBank className="w-6 h-6 text-blue-500" />, text: "Set clear financial goals (e.g., emergency fund, down payment, retirement)." },
    { icon: <TrendingDown className="w-6 h-6 text-yellow-500" />, text: "Automate savings and bill payments to stay consistent." },
    { icon: <BarChart className="w-6 h-6 text-purple-500" />, text: "Review your budget regularly and adjust it as your circumstances change." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Differentiate between 'needs' and 'wants' to prioritize spending." },
    { icon: <Wallet className="w-6 h-6 text-red-500" />, text: "Build an emergency fund covering 3-6 months of essential expenses." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Comprehensive Financial Tools", description: "Access a wide array of calculators and resources for personal and business financial planning." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Financial Advisory", description: "Connect with financial experts for personalized guidance on budgeting, savings, and investments." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Smart Investment Options", description: "Explore tailored investment products to help you achieve your financial goals efficiently." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Debt Management Solutions", description: "Find strategies and solutions to manage and reduce your debt effectively." },
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
            Master Your Money with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Budget Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-indigo-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Create and manage personal or business budgets effectively.
            Gain control over your finances and achieve your goals.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Budgeting & Financial Planning Inquiry"
                openApplyModal={openApplyModal}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Financial Planning Advice
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Budget Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-indigo-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-indigo-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-pink-500" /> Personal/Business Budget Planner
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Wallet className="w-6 h-6 mr-2 text-indigo-600" /> Your Monthly Financials
              </h3>

              {/* Monthly Income */}
              <motion.div variants={itemVariants}>
                <label htmlFor="monthlyIncome" className="block text-lg font-semibold text-gray-700 mb-2">
                  Total Monthly Income: <span className="text-green-600">{formatCurrency(monthlyIncome)}</span>
                </label>
                <input
                  type="range"
                  id="monthlyIncome"
                  min="10000"
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
                <ReceiptText className="w-5 h-5 mr-2 text-indigo-600" /> Monthly Expenses
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
            <div className="p-6 bg-gradient-to-br from-indigo-500 to-pink-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Budget Summary</h3>
              <motion.div
                key={calculations.netSavingsOrDeficit} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className={`text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg ${calculations.isSurplus ? 'text-yellow-300' : 'text-red-300'}`}
              >
                {formatCurrency(calculations.netSavingsOrDeficit)}
              </motion.div>
              <p className="text-xl text-indigo-100 mb-8">
                {calculations.isSurplus ? 'Net Monthly Savings' : 'Net Monthly Deficit'}
              </p>

              <div className="w-full space-y-4 text-lg">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><ArrowUpCircle className="w-5 h-5" /> Total Monthly Income</span>
                  <span className="font-bold text-white">{formatCurrency(monthlyIncome)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><ArrowDownCircle className="w-5 h-5" /> Total Monthly Expenses</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalExpenses)}</span>
                </motion.div>
              </div>

              {/* Expense Breakdown */}
              <h4 className="text-xl font-bold text-white mt-8 mb-4">Expense Breakdown:</h4>
              <div className="w-full space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                {calculations.expensePercentages.map((category, index) => (
                  <motion.div key={index} variants={itemVariants} className="bg-indigo-700/20 p-3 rounded-lg text-sm flex justify-between items-center">
                    <span className="flex items-center">
                      {category.icon} <span className="ml-2">{category.name}:</span>
                    </span>
                    <span className="font-bold">{formatCurrency(category.value)} ({category.percentage}%)</span>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Budget Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Budget Calculator is an indispensable financial tool designed to help individuals and businesses gain control over their money. It provides a structured way to outline your expected income and categorize your expenses over a specific period (typically monthly). By inputting these figures, the calculator helps you visualize where your money is coming from and, more importantly, where it is going. This clarity is crucial for identifying areas of overspending, pinpointing opportunities for savings, and ensuring you have enough funds to meet your financial obligations and achieve your long-term goals.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Budget Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Total Monthly Income:</strong> Start by inputting all the money you expect to receive in a month, including salary, freelance income, business revenue, etc.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Monthly Expenses by Category:</strong> Go through each pre-defined expense category (e.g., Housing, Food, Transportation, Utilities, Debt Payments, Savings, Entertainment, Miscellaneous) and enter your estimated spending for that category for the month. Be as realistic as possible.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Budget Summary:</strong> The calculator will instantly show you your Total Monthly Expenses, and most importantly, your Net Monthly Savings or Deficit. It also provides a percentage breakdown of how much of your income is allocated to each expense category, helping you identify areas for adjustment.</motion.li>
              <motion.li variants={itemVariants}><strong>Adjust and Optimize:</strong> If you see a deficit or want to increase your savings, adjust your expense amounts in various categories. Experiment with different scenarios to find a budget that works for you.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Budget Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Financial Clarity:</strong> Provides a clear, organized overview of your financial situation, highlighting where your money comes from and goes.</motion.li>
              <motion.li variants={itemVariants}><strong>Debt Reduction:</strong> Helps identify funds that can be redirected towards paying off high-interest debt faster, saving you money in the long run.</motion.li>
              <motion.li variants={itemVariants}><strong>Increased Savings:</strong> Pinpoints areas where you can cut back on unnecessary spending, freeing up more money for savings and investments.</motion.li>
              <motion.li variants={itemVariants}><strong>Achieve Financial Goals:</strong> Whether it's buying a home, saving for retirement, or funding education, a budget is the roadmap to achieving your financial aspirations.</motion.li>
              <motion.li variants={itemVariants}><strong>Reduced Financial Stress:</strong> By having a plan and understanding your financial limits, you can make informed decisions and reduce anxiety about money.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Budget Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Budget:</strong> A financial plan that estimates future income and expenses over a specific period, typically monthly or annually.</motion.p>
              <motion.p variants={itemVariants}><strong>Income:</strong> All the money you receive from various sources, such as salary, business profits, freelance earnings, investments, or rental income.</motion.p>
              <motion.p variants={itemVariants}><strong>Expenses:</strong> All the money you spend or pay out for goods and services. These can be categorized as fixed or variable.</motion.p>
              <motion.p variants={itemVariants}><strong>Fixed Expenses:</strong> Costs that generally remain constant each month, such as rent/mortgage payments, loan EMIs, and insurance premiums.</motion.p>
              <motion.p variants={itemVariants}><strong>Variable Expenses:</strong> Costs that fluctuate from month to month, such as groceries, utility bills (which can vary with usage), entertainment, and transportation costs.</motion.p>
              <motion.p variants={itemVariants}><strong>Needs:</strong> Essential expenses required for living, such as housing, food, utilities, and transportation to work.</motion.p>
              <motion.p variants={itemVariants}><strong>Wants:</strong> Discretionary expenses that are not essential for survival but improve quality of life, such as dining out, entertainment, vacations, and non-essential shopping.</motion.p>
              <motion.p variants={itemVariants}><strong>Savings:</strong> The portion of income that is not spent and is set aside for future use, such as an emergency fund, retirement, or a down payment on a house.</motion.p>
              <motion.p variants={itemVariants}><strong>Deficit:</strong> Occurs when your total expenses exceed your total income, indicating that you are spending more money than you are earning.</motion.p>
              <motion.p variants={itemVariants}><strong>Surplus:</strong> Occurs when your total income exceeds your total expenses, indicating that you have money left over after all expenditures, which can be used for savings or investments.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Effective Budgeting
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForEffectiveBudgeting.map((tip, index) => (
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
              Ready to Take Control of Your Finances?
            </motion.h2>
            <motion.p
              className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart offers comprehensive financial tools, expert advice, and tailored solutions
              to help you achieve your budgeting, saving, and investment goals.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Financial Control Advisory"
                  openApplyModal={openApplyModal}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
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

export default BudgetCalculatorPage;
