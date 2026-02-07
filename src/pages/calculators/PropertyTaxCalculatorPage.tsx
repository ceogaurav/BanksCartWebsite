import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank,
  HandCoins, CreditCard, Clock, Hourglass, PiggyBank as SavingsIcon, Home, Building2, User,
  Shield, Landmark, ReceiptText as TaxIcon, Building // Icons for property tax
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


// --- Main Property Tax Calculator Page Component ---
interface PropertyTaxCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const PropertyTaxCalculatorPage: React.FC<PropertyTaxCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [homeValue, setHomeValue] = useState<number>(5000000); // INR
  const [annualPropertyTaxRate, setAnnualPropertyTaxRate] = useState<number>(0.5); // % of home value
  const [additionalFixedAnnualTax, setAdditionalFixedAnnualTax] = useState<number>(0); // e.g., cess, fixed charges

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for inputs
  const handleHomeValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setHomeValue(Number(value));
  };
  const handleAnnualPropertyTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnualPropertyTaxRate(Number(e.target.value));
  };
  const handleAdditionalFixedAnnualTaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setAdditionalFixedAnnualTax(Number(value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Property Tax Calculations
  const calculations = useMemo(() => {
    const calculatedPropertyTax = homeValue * (annualPropertyTaxRate / 100);
    const totalAnnualPropertyTax = calculatedPropertyTax + additionalFixedAnnualTax;
    const totalMonthlyPropertyTax = totalAnnualPropertyTax / 12;

    return {
      calculatedPropertyTax: Math.round(calculatedPropertyTax),
      totalAnnualPropertyTax: Math.round(totalAnnualPropertyTax),
      totalMonthlyPropertyTax: Math.round(totalMonthlyPropertyTax),
    };
  }, [homeValue, annualPropertyTaxRate, additionalFixedAnnualTax]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is Property Tax?",
      answer: "Property tax is a direct tax levied by local municipal bodies or governments on real estate (land and buildings) within their jurisdiction. It is a primary source of revenue for local authorities, used to fund public services and infrastructure like roads, sanitation, schools, and parks."
    },
    {
      question: "How is property tax calculated in India?",
      answer: "Property tax calculation in India varies by state and municipality. Common methods include:<ul><li><strong>Annual Rental Value (ARV) System:</strong> Tax is based on the potential rental income of the property.</li><li><strong>Unit Area Value (UAV) System:</strong> Tax is based on the per-unit area value of the property, considering factors like location, type of construction, and usage.</li><li><strong>Capital Value System:</strong> Tax is based on the market value or ready reckoner rate of the property.</li></ul>Our calculator uses a simplified percentage of home value for estimation."
    },
    {
      question: "What factors influence property tax rates?",
      answer: "Property tax rates are influenced by:<ul><li><strong>Location:</strong> Rates vary significantly between cities and even within different zones of the same city.</li><li><strong>Property Type:</strong> Residential, commercial, industrial properties have different rates.</li><li><strong>Usage:</strong> Self-occupied vs. rented properties might have different rates.</li><li><strong>Construction Type:</strong> Pucca vs. semi-pucca structures.</li><li><strong>Age of Property:</strong> Older properties might get depreciation benefits.</li><li><strong>Amenities:</strong> Access to public services can influence rates.</li><li><strong>Local Government Policies:</strong> Municipal bodies set their own rates and rules.</li></ul>"
    },
    {
      question: "Are there any exemptions or rebates on property tax?",
      answer: "Yes, various exemptions and rebates may apply depending on local laws. Common examples include:<ul><li>Properties owned by charitable organizations, religious institutions, or government bodies.</li><li>Properties of freedom fighters or defense personnel.</li><li>Rebates for senior citizens or properties with rainwater harvesting.</li><li>Discounts for timely payment.</li></ul>Always check with your local municipal corporation for specific details."
    },
    {
      question: "When and how is property tax paid?",
      answer: "Property tax is typically paid annually or semi-annually. Payment methods usually include:<ul><li><strong>Online:</strong> Through the official website of the municipal corporation.</li><li><strong>Offline:</strong> At designated bank branches, municipal offices, or citizen service centers.</li></ul>Deadlines vary by city, and late payments can incur penalties."
    },
    {
      question: "What is 'Cess' in property tax?",
      answer: "'Cess' is an additional tax levied by the government for a specific purpose, often alongside the primary property tax. For example, an education cess or a sanitation cess might be added to your property tax bill to fund specific services. Our calculator includes an 'Additional Fixed Annual Tax' field to account for such charges."
    },
    {
      question: "Why is it important to estimate property taxes accurately?",
      answer: "Accurately estimating property taxes is crucial for budgeting your homeownership costs. Property taxes are a significant recurring expense that can impact your overall affordability. Overlooking or underestimating them can lead to financial strain and affect your long-term financial planning for your home."
    }
  ];

  const tipsForPropertyTaxManagement = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Understand your local municipal body's specific property tax rules and calculation methods." },
    { icon: <Clock className="w-6 h-6 text-blue-500" />, text: "Pay your property tax on time to avoid penalties and avail any early payment rebates." },
    { icon: <Lightbulb className="w-6 h-6 text-yellow-500" />, text: "Keep all property documents and previous tax receipts organized for record-keeping." },
    { icon: <Search className="w-6 h-6 text-purple-500" />, text: "Regularly check for any changes in property tax rates or assessment policies in your area." },
    { icon: <Wallet className="w-6 h-6 text-orange-500" />, text: "Budget for property taxes as a recurring annual or semi-annual expense in your financial plan." },
    { icon: <Info className="w-6 h-6 text-red-500" />, text: "Explore if you qualify for any exemptions or rebates, such as for senior citizens or specific property types." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Comprehensive Homeownership Tools", description: "Access a suite of calculators and resources to plan all aspects of your home purchase and ownership." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Financial Advisory", description: "Connect with certified financial advisors for guidance on budgeting for homeownership costs, including taxes." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Home Loan Assistance", description: "Find competitive home loan offers that factor in all your potential housing expenses." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Property Insights", description: "Gain insights into various aspects of property ownership and related financial obligations." },
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
            Estimate Your Home's Annual Cost with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Property Tax Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-indigo-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Get an accurate estimate of property taxes for any location.
            Budget effectively for your homeownership journey.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Home Loan - Property Tax Planning"
                openApplyModal={openApplyModal}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Homeownership Advice
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Property Tax Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-indigo-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600 drop-shadow-md">
            <TaxIcon className="inline-block w-9 h-9 mr-3 text-purple-500" /> Property Tax Estimator
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Building className="w-6 h-6 mr-2 text-indigo-600" /> Property Details
              </h3>

              {/* Home Value */}
              <motion.div variants={itemVariants}>
                <label htmlFor="homeValue" className="block text-lg font-semibold text-gray-700 mb-2">
                  Estimated Home Value: <span className="text-blue-600">{formatCurrency(homeValue)}</span>
                </label>
                <input
                  type="range"
                  id="homeValue"
                  min="1000000"
                  max="20000000"
                  step="100000"
                  value={homeValue}
                  onChange={handleHomeValueChange}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(homeValue)}
                  onChange={handleHomeValueChange}
                  onBlur={(e) => setHomeValue(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Annual Property Tax Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="annualPropertyTaxRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Property Tax Rate (% of Home Value): <span className="text-teal-600">{annualPropertyTaxRate}%</span>
                </label>
                <input
                  type="range"
                  id="annualPropertyTaxRate"
                  min="0"
                  max="2"
                  step="0.01"
                  value={annualPropertyTaxRate}
                  onChange={handleAnnualPropertyTaxRateChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="number"
                  value={annualPropertyTaxRate}
                  onChange={handleAnnualPropertyTaxRateChange}
                  onBlur={(e) => setAnnualPropertyTaxRate(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  step="0.01"
                />
              </motion.div>

              {/* Additional Fixed Annual Tax */}
              <motion.div variants={itemVariants}>
                <label htmlFor="additionalFixedAnnualTax" className="block text-lg font-semibold text-gray-700 mb-2">
                  Additional Fixed Annual Tax (e.g., Cess): <span className="text-orange-600">{formatCurrency(additionalFixedAnnualTax)}</span>
                </label>
                <input
                  type="range"
                  id="additionalFixedAnnualTax"
                  min="0"
                  max="50000"
                  step="1000"
                  value={additionalFixedAnnualTax}
                  onChange={handleAdditionalFixedAnnualTaxChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(additionalFixedAnnualTax)}
                  onChange={handleAdditionalFixedAnnualTaxChange}
                  onBlur={(e) => setAdditionalFixedAnnualTax(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Estimated Property Tax</h3>

              {/* Total Annual Property Tax */}
              <p className="text-xl text-indigo-100 mb-4">Your Estimated Annual Property Tax:</p>
              <motion.div
                key={calculations.totalAnnualPropertyTax} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
              >
                {formatCurrency(calculations.totalAnnualPropertyTax)}
              </motion.div>

              <div className="w-full space-y-4 text-lg mt-8">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Home className="w-5 h-5" /> Home Value</span>
                  <span className="font-bold text-white">{formatCurrency(homeValue)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Percent className="w-5 h-5" /> Annual Property Tax Rate</span>
                  <span className="font-bold text-white">{annualPropertyTaxRate}%</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Tax from Rate</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.calculatedPropertyTax)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><DollarSign className="w-5 h-5" /> Additional Fixed Tax</span>
                  <span className="font-bold text-white">{formatCurrency(additionalFixedAnnualTax)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-indigo-700/30 p-3 rounded-lg border-t border-indigo-500 pt-4 mt-4">
                  <span className="font-medium flex items-center gap-2"><Clock className="w-5 h-5" /> Estimated Monthly Property Tax</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.totalMonthlyPropertyTax)}</span>
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

            .accent-indigo-600::-webkit-slider-thumb { --tw-accent-color: #4F46E5; }
            .accent-indigo-600::-moz-range-thumb { --tw-accent-color: #4F46E5; }

            .accent-pink-600::-webkit-slider-thumb { --tw-accent-color: #EC4899; }
            .accent-pink-600::-moz-range-thumb { --tw-accent-color: #EC4899; }

            .accent-gray-600::-webkit-slider-thumb { --tw-accent-color: #4B5563; }
            .accent-gray-600::-moz-range-thumb { --tw-accent-color: #4B5563; }

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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Property Tax Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Property Tax Calculator is a specialized online tool designed to help homeowners and prospective buyers estimate the annual and monthly property tax obligations for a specific property or location. Property tax is a recurring expense for property owners, levied by local municipal bodies or governments, and is a crucial component of overall homeownership costs. This calculator simplifies the estimation process by allowing you to input key details such as the home's value, the local property tax rate, and any additional fixed annual charges, providing a clear financial projection to aid in budgeting and financial planning.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Property Tax Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Estimated Home Value:</strong> Input the approximate market value of the property for which you want to estimate taxes. This is the base for the tax calculation.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Annual Property Tax Rate (% of Home Value):</strong> Find the annual property tax rate applicable to your specific location. This is usually expressed as a percentage of the property's assessed value. You can often find this on your local municipal corporation's website or previous tax bills.</motion.li>
              <motion.li variants={itemVariants}><strong>Add Additional Fixed Annual Tax (Optional):</strong> If your local municipality levies any additional fixed charges or cess (e.g., sanitation cess, education cess) on an annual basis, enter that amount here. This ensures a more comprehensive estimate.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Estimated Property Tax:</strong> The calculator will instantly display your Estimated Annual Property Tax and the Estimated Monthly Property Tax. It also breaks down the tax derived from the rate and any additional fixed taxes, giving you a clear understanding of your obligations.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Property Tax Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Accurate Budgeting:</strong> Helps you accurately factor in property taxes into your monthly and annual household budget, preventing financial surprises.</motion.li>
              <motion.li variants={itemVariants}><strong>Informed Home Buying:</strong> Allows prospective buyers to understand the true recurring cost of homeownership in different locations before making a purchase decision.</motion.li>
              <motion.li variants={itemVariants}><strong>Financial Planning:</strong> Essential for long-term financial planning, as property taxes are a consistent and often significant expense that needs to be accounted for.</motion.li>
              <motion.li variants={itemVariants}><strong>Comparison Across Locations:</strong> Enables easy comparison of property tax burdens between different cities, states, or localities, aiding in relocation decisions.</motion.li>
              <motion.li variants={itemVariants}><strong>Tax Impact Awareness:</strong> Provides clarity on how changes in property value or tax rates might affect your financial obligations.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Property Tax Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Property Tax:</strong> A tax levied by local governments on real estate, including land and any structures on it. It's a primary source of local revenue.</motion.p>
              <motion.p variants={itemVariants}><strong>Assessed Value:</strong> The value assigned to a property by a public tax assessor for the purpose of calculating property taxes. This may differ from the market value.</motion.p>
              <motion.p variants={itemVariants}><strong>Tax Rate (Mill Rate/Percentage):</strong> The rate at which property is taxed, typically expressed as a percentage of the assessed value or a mill rate (dollars per $1,000 of assessed value).</motion.p>
              <motion.p variants={itemVariants}><strong>Cess:</strong> An additional tax levied by the government for a specific purpose, often collected along with primary taxes like property tax (e.g., education cess, sanitation cess).</motion.p>
              <motion.p variants={itemVariants}><strong>Rebate/Exemption:</strong> A reduction or elimination of property tax liability based on certain criteria, such as age, income, disability, or property usage (e.g., senior citizen rebate).</motion.p>
              <motion.p variants={itemVariants}><strong>Municipal Corporation/Local Body:</strong> The governing authority responsible for levying and collecting property taxes and providing local services.</motion.p>
              <motion.p variants={itemVariants}><strong>PITI:</strong> An acronym for Principal, Interest, Taxes, and Insurance, representing the four main components of a typical monthly mortgage payment. Property tax is the 'T' in PITI.</motion.p>
              <motion.p variants={itemVariants}><strong>Mutation of Property:</strong> The process of transferring the title or ownership of a property from one person to another in the local municipal records. Property tax liability often shifts with mutation.</motion.p>
              <motion.p variants={itemVariants}><strong>Tax Identification Number (TIN/Property ID):</strong> A unique identification number assigned to each property for tax assessment and payment purposes.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Smart Property Tax Management
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForPropertyTaxManagement.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Homeownership Journey?
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
              Ready to Plan Your Homeownership Finances?
            </motion.h2>
            <motion.p
              className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart provides comprehensive tools, expert advice, and tailored financial solutions
              to support every aspect of your homeownership journey.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Homeownership Financial Planning"
                  openApplyModal={openApplyModal}
                  className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Get Personalized Advice
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Get Personalized Advice</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default PropertyTaxCalculatorPage;
