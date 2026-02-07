import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, HandCoins, UserCheck, PiggyBank, Landmark
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


// --- Main Payroll Tax Calculator Page Component ---
interface PayrollTaxCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const PayrollTaxCalculatorPage: React.FC<PayrollTaxCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [grossMonthlySalary, setGrossMonthlySalary] = useState<number>(50000);
  const [pfContributionRate, setPfContributionRate] = useState<number>(12); // EPF contribution rate in %
  const [professionalTaxMonthly, setProfessionalTaxMonthly] = useState<number>(200); // Max professional tax in many states
  const [incomeTaxSlab, setIncomeTaxSlab] = useState<number>(20); // Estimated income tax slab for TDS

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
  const handleGrossMonthlySalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setGrossMonthlySalary(Number(value));
  };

  const handlePfContributionRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPfContributionRate(Number(e.target.value));
  };

  const handleProfessionalTaxMonthlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setProfessionalTaxMonthly(Number(value));
  };

  const handleIncomeTaxSlabChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIncomeTaxSlab(Number(e.target.value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Payroll Tax Calculation
  const calculations = useMemo(() => {
    const grossSalary = grossMonthlySalary;
    const pfRate = pfContributionRate / 100;
    const ptAmount = professionalTaxMonthly;
    const taxSlabRate = incomeTaxSlab / 100;

    // Simplified PF calculation (Employee's contribution)
    const pfContribution = grossSalary * pfRate;

    // Standard Deduction (simplified, usually fixed for salaried)
    const standardDeduction = 50000 / 12; // Approx 50,000 annually, divided by 12 for monthly

    // Taxable Income (very simplified: Gross - PF - PT - Standard Deduction)
    // In reality, many other deductions (80C, 80D, HRA, etc.) apply.
    const annualTaxableIncome = (grossSalary * 12) - (pfContribution * 12) - (ptAmount * 12) - standardDeduction;
    const monthlyTaxableIncome = annualTaxableIncome / 12;

    // Estimated Income Tax (TDS) - very simplified based on a flat slab rate on taxable income
    // This does NOT account for progressive slabs, exemptions, or new/old regime complexities.
    const estimatedIncomeTaxMonthly = Math.max(0, monthlyTaxableIncome * taxSlabRate);

    const totalDeductions = pfContribution + ptAmount + estimatedIncomeTaxMonthly;
    const netMonthlyPay = grossSalary - totalDeductions;

    return {
      pfContribution: Math.round(pfContribution),
      professionalTax: Math.round(ptAmount),
      estimatedIncomeTaxMonthly: Math.round(estimatedIncomeTaxMonthly),
      totalDeductions: Math.round(totalDeductions),
      netMonthlyPay: Math.round(netMonthlyPay),
      annualTaxableIncome: Math.round(annualTaxableIncome),
    };
  }, [grossMonthlySalary, pfContributionRate, professionalTaxMonthly, incomeTaxSlab]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Payroll Tax Calculator?",
      answer: "A Payroll Tax Calculator helps you estimate the various deductions from your gross salary to arrive at your net take-home pay. These deductions typically include Provident Fund (PF), Professional Tax (PT), and Income Tax (TDS), among others. It provides a basic understanding of your salary breakdown."
    },
    {
      question: "What is Gross Salary vs. Net Salary?",
      answer: "Gross Salary is your total salary before any deductions (like taxes, PF, professional tax) are made. Net Salary (or Take-Home Pay) is the amount you receive after all mandatory and voluntary deductions are subtracted from your gross salary."
    },
    {
      question: "What is Provident Fund (PF) in India?",
      answer: "Provident Fund (PF), specifically Employees' Provident Fund (EPF), is a mandatory retirement savings scheme for salaried employees in India. Both the employee and employer contribute a fixed percentage (currently 12% of basic salary + DA) to this fund, which earns interest and can be withdrawn at retirement or under specific conditions."
    },
    {
      question: "What is Professional Tax (PT)?",
      answer: "Professional Tax is a state-level tax levied on individuals earning income from salary or practicing a profession. The rates vary by state, and it is usually a fixed monthly amount, often capped at ₹2,500 per annum."
    },
    {
      question: "What is TDS (Tax Deducted at Source) on salary?",
      answer: "TDS on salary is the Income Tax that your employer deducts from your salary every month and remits to the government on your behalf. The amount of TDS depends on your total estimated annual income and applicable tax slabs, deductions, and exemptions."
    },
    {
      question: "How accurate is this calculator for my exact take-home pay?",
      answer: "This calculator provides a simplified estimate. Actual payroll deductions can be more complex due to various factors like HRA exemption, LTA, other allowances, specific investment declarations (80C, 80D), different tax regimes (old vs. new), and state-specific professional tax rules. For a precise calculation, consult your HR/payroll department or a tax advisor."
    },
    {
      question: "Why do my deductions change throughout the financial year?",
      answer: "Your TDS might change if your income changes, if you submit new investment proofs (e.g., 80C declarations), or if your employer adjusts the projected annual income. Professional tax is usually fixed, and PF changes only if your basic salary changes."
    }
  ];

  const tipsForUnderstandingPaycheck = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Always review your payslip carefully to understand all deductions." },
    { icon: <ReceiptText className="w-6 h-6 text-blue-500" />, text: "Keep track of your investment declarations to optimize your TDS." },
    { icon: <Percent className="w-6 h-6 text-yellow-500" />, text: "Understand the difference between mandatory (PF, PT, TDS) and voluntary deductions." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Plan your annual investments early to maximize tax savings under Section 80C, 80D, etc." },
    { icon: <Briefcase className="w-6 h-6 text-purple-500" />, text: "Familiarize yourself with your company's salary structure and policies." },
    { icon: <UserCheck className="w-6 h-6 text-red-500" />, text: "Consult a tax professional for personalized advice on optimizing your take-home pay." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Comprehensive Financial Tools", description: "Access a wide array of calculators and resources for personal finance and tax planning." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Simplified Tax Understanding", description: "Our tools and articles demystify complex tax concepts and payroll deductions." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Expert Tax Advisory", description: "Connect with certified tax professionals for personalized guidance on income tax and payroll." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Stay Updated on Regulations", description: "Get the latest information on tax laws and financial regulations impacting your salary." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Understand Your Paycheck with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Payroll Tax Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-purple-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Estimate deductions for taxes from your paycheck based on various factors.
            Know your take-home salary and plan your finances better.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Tax Planning Inquiry"
                openApplyModal={openApplyModal}
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Tax Planning Advice
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Payroll Tax Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-purple-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-pink-500" /> Paycheck Deductions Estimator
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Briefcase className="w-6 h-6 mr-2 text-purple-600" /> Your Salary Details
              </h3>

              {/* Gross Monthly Salary */}
              <motion.div variants={itemVariants}>
                <label htmlFor="grossMonthlySalary" className="block text-lg font-semibold text-gray-700 mb-2">
                  Gross Monthly Salary: <span className="text-blue-600">{formatCurrency(grossMonthlySalary)}</span>
                </label>
                <input
                  type="range"
                  id="grossMonthlySalary"
                  min="10000"
                  max="500000"
                  step="1000"
                  value={grossMonthlySalary}
                  onChange={handleGrossMonthlySalaryChange}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(grossMonthlySalary)}
                  onChange={handleGrossMonthlySalaryChange}
                  onBlur={(e) => setGrossMonthlySalary(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* PF Contribution Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="pfContributionRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  EPF Contribution Rate (on Basic + DA): <span className="text-teal-600">{pfContributionRate}%</span>
                </label>
                <input
                  type="range"
                  id="pfContributionRate"
                  min="0"
                  max="12" // Max typical EPF rate
                  step="0.5"
                  value={pfContributionRate}
                  onChange={handlePfContributionRateChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="number"
                  value={pfContributionRate}
                  onChange={handlePfContributionRateChange}
                  onBlur={(e) => setPfContributionRate(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  step="0.1"
                />
              </motion.div>

              {/* Professional Tax Monthly */}
              <motion.div variants={itemVariants}>
                <label htmlFor="professionalTaxMonthly" className="block text-lg font-semibold text-gray-700 mb-2">
                  Professional Tax (Monthly): <span className="text-orange-600">{formatCurrency(professionalTaxMonthly)}</span>
                </label>
                <input
                  type="range"
                  id="professionalTaxMonthly"
                  min="0"
                  max="200" // Max monthly PT is 200-250 in many states (2500/12 approx)
                  step="10"
                  value={professionalTaxMonthly}
                  onChange={handleProfessionalTaxMonthlyChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(professionalTaxMonthly)}
                  onChange={handleProfessionalTaxMonthlyChange}
                  onBlur={(e) => setProfessionalTaxMonthly(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Income Tax Slab */}
              <motion.div variants={itemVariants}>
                <label htmlFor="incomeTaxSlab" className="block text-lg font-semibold text-gray-700 mb-2">
                  Estimated Income Tax Slab (for TDS):
                </label>
                <select
                  id="incomeTaxSlab"
                  value={incomeTaxSlab}
                  onChange={handleIncomeTaxSlabChange}
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-red-500 focus:border-red-500 transition-all bg-white appearance-none"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
                >
                  {taxSlabs.map(slab => (
                    <option key={slab.value} value={slab.value}>{slab.label}</option>
                  ))}
                </select>
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Estimated Net Pay</h3>
              <motion.div
                key={calculations.netMonthlyPay} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
              >
                {formatCurrency(calculations.netMonthlyPay)}
              </motion.div>
              <p className="text-xl text-purple-100 mb-8">Your Take-Home Salary (Monthly)</p>

              <div className="w-full space-y-4 text-lg">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-purple-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Gross Monthly Salary</span>
                  <span className="font-bold text-white">{formatCurrency(grossMonthlySalary)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-purple-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><PiggyBank className="w-5 h-5" /> EPF Contribution</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.pfContribution)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-purple-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Briefcase className="w-5 h-5" /> Professional Tax</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.professionalTax)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-purple-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><ReceiptText className="w-5 h-5" /> Estimated Income Tax (TDS)</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.estimatedIncomeTaxMonthly)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-purple-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><TrendingDown className="w-5 h-5" /> Total Monthly Deductions</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalDeductions)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-purple-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><HandCoins className="w-5 h-5" /> Annual Taxable Income (Approx)</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.annualTaxableIncome)}</span>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Payroll Tax Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Payroll Tax Calculator is a practical tool designed to help salaried individuals understand the various deductions from their gross salary that lead to their net take-home pay. In India, these deductions primarily include contributions to the Employees' Provident Fund (EPF), Professional Tax (PT) (which is state-specific), and Income Tax (Tax Deducted at Source or TDS). While actual payroll calculations can be complex due to various allowances, exemptions, and tax regimes, this calculator provides a simplified estimate, allowing you to get a clearer picture of your monthly income and plan your personal finances more effectively.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Payroll Tax Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Gross Monthly Salary:</strong> Input your total monthly salary before any deductions. This is the starting point for all calculations.</motion.li>
              <motion.li variants={itemVariants}><strong>Set EPF Contribution Rate:</strong> Adjust the percentage of your basic salary + DA that goes towards your Employees' Provident Fund. The standard rate is 12% for both employee and employer.</motion.li>
              <motion.li variants={itemVariants}><strong>Input Professional Tax (Monthly):</strong> Enter the fixed monthly amount deducted as Professional Tax, which varies by state in India. You can find this on your payslip or state's tax regulations.</motion.li>
              <motion.li variants={itemVariants}><strong>Select Estimated Income Tax Slab:</strong> Choose the income tax slab percentage that you believe applies to your taxable income. This helps in estimating the TDS (Tax Deducted at Source) component. Note: This is a simplification; actual TDS depends on various factors and tax planning.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Estimated Net Pay:</strong> The calculator will instantly display your estimated EPF contribution, Professional Tax, estimated Income Tax (TDS), total monthly deductions, and your final net monthly take-home salary. It also provides an approximate annual taxable income.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Payroll Tax Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Understand Your Take-Home Pay:</strong> Get clarity on how your gross salary is reduced by various deductions to arrive at the actual amount you receive.</motion.li>
              <motion.li variants={itemVariants}><strong>Better Budgeting:</strong> Knowing your net monthly income allows for more accurate personal budgeting and financial planning, preventing overspending.</motion.li>
              <motion.li variants={itemVariants}><strong>Identify Discrepancies:</strong> Helps you cross-verify deductions on your payslip, allowing you to identify any potential errors or unexpected changes.</motion.li>
              <motion.li variants={itemVariants}><strong>Tax Planning Insights:</strong> Provides a basic understanding of how different deductions and tax slabs impact your overall tax liability, encouraging proactive tax planning.</motion.li>
              <motion.li variants={itemVariants}><strong>Informed Financial Decisions:</strong> Empowers you with knowledge about your earnings, enabling better decisions regarding savings, investments, and expenses.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Payroll & Tax Terms in India
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Gross Salary:</strong> The total remuneration an employee receives from their employer before any deductions are made. It includes basic pay, allowances, and other benefits.</motion.p>
              <motion.p variants={itemVariants}><strong>Net Salary (Take-Home Pay):</strong> The amount of salary an employee receives after all deductions (taxes, PF, PT, etc.) are subtracted from the gross salary.</motion.p>
              <motion.p variants={itemVariants}><strong>Employees' Provident Fund (EPF):</strong> A mandatory savings scheme for salaried employees in India, where a portion of salary is contributed by both employee and employer for retirement benefits.</motion.p>
              <motion.p variants={itemVariants}><strong>Professional Tax (PT):</strong> A state-level tax levied on individuals earning income from salary or profession. The rates and applicability vary by state.</motion.p>
              <motion.p variants={itemVariants}><strong>Tax Deducted at Source (TDS):</strong> Income Tax that is deducted by the employer from an employee's salary at the time of payment and remitted to the government. It is an advance payment of income tax.</motion.p>
              <motion.p variants={itemVariants}><strong>Income Tax Slab:</strong> The income ranges specified by the Income Tax Department, each taxed at a different percentage rate. Taxable income falls into these slabs to determine tax liability.</motion.p>
              <motion.p variants={itemVariants}><strong>Taxable Income:</strong> The portion of your gross income that is subject to income tax after all applicable deductions and exemptions have been considered.</motion.p>
              <motion.p variants={itemVariants}><strong>Standard Deduction:</strong> A fixed deduction allowed from gross salary income, reducing the taxable income for salaried individuals. (Currently ₹50,000 annually for most salaried individuals).</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Managing Your Payroll & Taxes
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForUnderstandingPaycheck.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Tax & Financial Needs?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-purple-600 to-pink-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Need Expert Tax & Payroll Advice?
            </motion.h2>
            <motion.p
              className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart connects you with certified tax professionals and financial advisors
              to help you navigate complex payroll deductions and optimize your tax planning.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Payroll & Tax Advisory"
                  openApplyModal={openApplyModal}
                  className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Connect with a Tax Advisor
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Connect with a Tax Advisor</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default PayrollTaxCalculatorPage;
