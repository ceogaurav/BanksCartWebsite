import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank, Landmark,
  HandCoins, CreditCard, Clock, Hourglass, PiggyBank as SavingsIcon, Home, Utensils, Car, Zap, Stethoscope,
  Layers, HeartPulse
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


// --- Main Emergency Fund Calculator Page Component ---
interface EmergencyFundCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const EmergencyFundCalculatorPage: React.FC<EmergencyFundCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [coverageMonths, setCoverageMonths] = useState<number>(6); // Default 6 months
  const [essentialExpenses, setEssentialExpenses] = useState([
    { id: 'housing', name: 'Housing (Rent/Mortgage)', value: 20000, icon: <Home className="w-5 h-5" /> },
    { id: 'food', name: 'Food & Groceries', value: 10000, icon: <Utensils className="w-5 h-5" /> },
    { id: 'utilities', name: 'Utilities (Electricity, Water, Gas)', value: 4000, icon: <Zap className="w-5 h-5" /> },
    { id: 'transportation', name: 'Essential Transportation', value: 5000, icon: <Car className="w-5 h-5" /> },
    { id: 'health', name: 'Health & Medical (Insurance/Basic)', value: 3000, icon: <Stethoscope className="w-5 h-5" /> },
    { id: 'debt', name: 'Minimum Debt Payments (Essential)', value: 8000, icon: <CreditCard className="w-5 h-5" /> },
    { id: 'miscellaneous', name: 'Miscellaneous Essential', value: 2000, icon: <Layers className="w-5 h-5" /> },
  ]);

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for inputs
  const handleCoverageMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoverageMonths(Number(e.target.value));
  };

  const handleExpenseChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setEssentialExpenses(prevCategories =>
      prevCategories.map(cat =>
        cat.id === id ? { ...cat, value: Number(value) } : cat
      )
    );
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Emergency Fund Calculation
  const calculations = useMemo(() => {
    const totalMonthlyEssentialExpenses = essentialExpenses.reduce((sum, category) => sum + category.value, 0);
    const totalEmergencyFundNeeded = totalMonthlyEssentialExpenses * coverageMonths;

    return {
      totalMonthlyEssentialExpenses: totalMonthlyEssentialExpenses,
      totalEmergencyFundNeeded: totalEmergencyFundNeeded,
    };
  }, [coverageMonths, essentialExpenses]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is an Emergency Fund Calculator?",
      answer: "An Emergency Fund Calculator is a financial planning tool that helps you determine the ideal amount of money you should save to cover unexpected financial crises. It typically considers your essential monthly expenses and a desired number of months you want to be covered, providing you with a clear target for your financial safety net."
    },
    {
      question: "Why do I need an emergency fund?",
      answer: "An emergency fund is crucial for financial security. It acts as a buffer against unforeseen events like job loss, medical emergencies, car repairs, or home repairs. Without one, you might be forced to go into debt (e.g., credit cards, high-interest loans) or sell assets to cover unexpected costs, derailing your financial progress."
    },
    {
      question: "How much should I save for my emergency fund?",
      answer: "Most financial experts recommend saving 3 to 6 months' worth of essential living expenses. However, this can vary based on your personal circumstances, job security, number of dependents, and health. Some prefer 9-12 months for greater peace of mind."
    },
    {
      question: "What counts as 'essential expenses' for an emergency fund?",
      answer: "Essential expenses are the absolute minimum costs you need to cover to survive. This typically includes housing (rent/mortgage), basic food, utilities (electricity, water, gas), essential transportation, minimum debt payments, and basic healthcare costs. Discretionary spending like dining out, entertainment, or subscriptions should generally be excluded."
    },
    {
      question: "Where should I keep my emergency fund?",
      answer: "Your emergency fund should be kept in an easily accessible, low-risk account. A high-yield savings account is often recommended because it offers liquidity (easy access) and earns some interest, while keeping the money separate from your everyday spending accounts."
    },
    {
      question: "Should my emergency fund earn interest?",
      answer: "While earning interest is a bonus, the primary goal of an emergency fund is safety and liquidity, not high returns. A high-yield savings account is a good balance, offering some interest without exposing your funds to market volatility. Avoid investing your emergency fund in stocks or other risky assets."
    },
    {
      question: "When should I use my emergency fund?",
      answer: "Only use your emergency fund for true emergencies – unexpected, necessary expenses that you cannot cover with your regular income. Examples include job loss, major unexpected medical bills, urgent home repairs, or significant car repairs that prevent you from working."
    }
  ];

  const tipsForBuildingEmergencyFund = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Set a clear target amount based on your essential expenses and desired coverage." },
    { icon: <PiggyBank className="w-6 h-6 text-blue-500" />, text: "Automate transfers from your checking to your emergency fund savings account each payday." },
    { icon: <TrendingDown className="w-6 h-6 text-yellow-500" />, text: "Cut back on non-essential expenses to free up more cash for your fund." },
    { icon: <Lightbulb className="w-6 h-6 text-purple-500" />, text: "Keep your emergency fund in a separate, easily accessible, high-yield savings account." },
    { icon: <Wallet className="w-6 h-6 text-orange-500" />, text: "Consider selling unused items or taking on a side hustle to boost your savings." },
    { icon: <Clock className="w-6 h-6 text-red-500" />, text: "Be patient and consistent; building a substantial fund takes time and discipline." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "High-Yield Savings Solutions", description: "Explore savings accounts with competitive interest rates to grow your emergency fund faster." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Financial Advisory", description: "Connect with financial advisors for personalized guidance on budgeting and emergency preparedness." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Secure & Accessible Accounts", description: "Find banking products that offer both security and liquidity for your critical emergency savings." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Budgeting Tools & Resources", description: "Utilize our other calculators and guides to identify your essential expenses and optimize your cash flow." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-blue-600 to-green-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Build Your Financial Safety Net with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Emergency Fund Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Estimate how much you need to save to cover unexpected expenses.
            Secure your financial future and gain peace of mind.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Emergency Fund Planning Advisory"
                openApplyModal={openApplyModal}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Financial Planning Advice
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Emergency Fund Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-blue-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-green-500" /> Emergency Fund Estimator
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Wallet className="w-6 h-6 mr-2 text-blue-600" /> Your Essential Expenses
              </h3>

              {/* Desired Coverage Months */}
              <motion.div variants={itemVariants}>
                <label htmlFor="coverageMonths" className="block text-lg font-semibold text-gray-700 mb-2">
                  Desired Coverage: <span className="text-purple-600">{coverageMonths} Months</span>
                </label>
                <input
                  type="range"
                  id="coverageMonths"
                  min="1"
                  max="12"
                  step="1"
                  value={coverageMonths}
                  onChange={handleCoverageMonthsChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="number"
                  value={coverageMonths}
                  onChange={handleCoverageMonthsChange}
                  onBlur={(e) => setCoverageMonths(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  min="1"
                  max="12"
                />
              </motion.div>

              {/* Essential Expense Categories */}
              <h4 className="text-xl font-bold text-gray-800 mb-2 mt-6 flex items-center">
                <ReceiptText className="w-5 h-5 mr-2 text-blue-600" /> Monthly Essential Expenses
              </h4>
              <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                {essentialExpenses.map((category) => (
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
            <div className="p-6 bg-gradient-to-br from-blue-500 to-green-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Emergency Fund Goal</h3>
              <motion.div
                key={calculations.totalEmergencyFundNeeded} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
              >
                {formatCurrency(calculations.totalEmergencyFundNeeded)}
              </motion.div>
              <p className="text-xl text-blue-100 mb-8">Recommended Emergency Fund</p>

              <div className="w-full space-y-4 text-lg mt-8">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Total Monthly Essential Expenses</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalMonthlyEssentialExpenses)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Clock className="w-5 h-5" /> Desired Coverage</span>
                  <span className="font-bold text-white">{coverageMonths} Months</span>
                </motion.div>
              </div>

              {/* Expense Breakdown for Emergency Fund */}
              <h4 className="text-xl font-bold text-white mt-8 mb-4">Essential Expense Breakdown:</h4>
              <div className="w-full space-y-3 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                {essentialExpenses.map((category, index) => (
                  <motion.div key={index} variants={itemVariants} className="bg-blue-700/20 p-3 rounded-lg text-sm flex justify-between items-center">
                    <span className="flex items-center">
                      {category.icon} <span className="ml-2">{category.name}:</span>
                    </span>
                    <span className="font-bold">{formatCurrency(category.value)}</span>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is an Emergency Fund Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              An Emergency Fund Calculator is a vital financial planning tool designed to help you quantify the amount of money you should set aside for unexpected life events. It works by taking into account your essential monthly living expenses and your desired level of financial security (typically expressed in months of coverage). The calculator then provides a clear target figure for your emergency fund, empowering you to build a robust financial safety net that can protect you from unforeseen circumstances like job loss, medical emergencies, or significant home/car repairs without resorting to high-interest debt.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Emergency Fund Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Set Desired Coverage (Months):</strong> Decide how many months of essential expenses you want your emergency fund to cover. Common recommendations range from 3 to 6 months, but some prefer 9 or 12 months for greater security.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Monthly Essential Expenses by Category:</strong> Go through each pre-defined category (e.g., Housing, Food, Utilities, Transportation, Health, Minimum Debt Payments, Miscellaneous Essential) and enter your absolute minimum monthly spending for each. Be realistic and exclude discretionary expenses.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Emergency Fund Goal:</strong> The calculator will instantly display your Total Monthly Essential Expenses and, most importantly, the Total Emergency Fund Needed. This is your target amount to save.</motion.li>
              <motion.li variants={itemVariants}><strong>Plan Your Savings Strategy:</strong> Once you have your target, integrate it into your budget. Look for ways to cut back on non-essential spending or increase your income to build your fund consistently. Consider automating transfers to a separate savings account.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <HeartPulse className="w-8 h-8 mr-3 text-purple-500" /> Why Use an Emergency Fund Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Quantify Your Goal:</strong> Provides a concrete, measurable target for your emergency savings, making the goal feel more achievable.</motion.li>
              <motion.li variants={itemVariants}><strong>Reduce Financial Stress:</strong> Knowing you have a financial safety net significantly reduces anxiety about unexpected expenses and job insecurity.</motion.li>
              <motion.li variants={itemVariants}><strong>Avoid High-Interest Debt:</strong> Prevents you from relying on credit cards or high-interest loans during crises, saving you money and protecting your credit score.</motion.li>
              <motion.li variants={itemVariants}><strong>Protect Your Investments:</strong> Ensures you don't have to sell investments at an inopportune time to cover emergencies, allowing your long-term wealth to grow undisturbed.</motion.li>
              <motion.li variants={itemVariants}><strong>Empower Financial Independence:</strong> An emergency fund is a foundational step towards overall financial stability and freedom, giving you more control over your life choices.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Emergency Fund Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Emergency Fund:</strong> A readily accessible savings account specifically for unexpected financial emergencies, typically covering 3-12 months of essential living expenses.</motion.p>
              <motion.p variants={itemVariants}><strong>Essential Expenses:</strong> Non-negotiable monthly costs required for basic survival, such as housing, food, utilities, and essential transportation. Discretionary spending is excluded.</motion.p>
              <motion.p variants={itemVariants}><strong>Desired Coverage:</strong> The number of months of essential expenses you aim to cover with your emergency fund.</motion.p>
              <motion.p variants={itemVariants}><strong>Liquidity:</strong> The ease with which an asset can be converted into cash without affecting its market price. An emergency fund should be highly liquid.</motion.p>
              <motion.p variants={itemVariants}><strong>Financial Safety Net:</strong> The security provided by an emergency fund, acting as a buffer against unforeseen financial shocks.</motion.p>
              <motion.p variants={itemVariants}><strong>High-Yield Savings Account:</strong> A type of savings account that typically offers a higher interest rate than traditional savings accounts, while still providing easy access to funds.</motion.p>
              <motion.p variants={itemVariants}><strong>Discretionary Spending:</strong> Non-essential expenses that can be cut back or eliminated, such as dining out, entertainment, or luxury purchases.</motion.p>
              <motion.p variants={itemVariants}><strong>Financial Stress:</strong> Anxiety or worry related to one's financial situation, often reduced by having an adequate emergency fund.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Building Your Emergency Fund
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForBuildingEmergencyFund.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Financial Security?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-green-50 border border-blue-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-blue-600 to-green-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Build Your Financial Safety Net?
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart offers comprehensive financial tools, expert advice, and tailored savings products
              to help you build a strong emergency fund and achieve lasting financial security.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Emergency Fund Building Advisory"
                  openApplyModal={openApplyModal}
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Explore Savings Solutions
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Explore Savings Solutions</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default EmergencyFundCalculatorPage;
