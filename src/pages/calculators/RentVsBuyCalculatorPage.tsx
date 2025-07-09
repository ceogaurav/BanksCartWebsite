import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  Briefcase, ReceiptText, TrendingDown, Coins, Factory, Timer, LineChart, Target, PiggyBank,
  HandCoins, CreditCard, Clock, Hourglass, PiggyBank as SavingsIcon, Home, Building2, User,
  Shield, Landmark, ReceiptText as TaxIcon, HandCoins as DownPaymentIcon,
  ArrowRightLeft, Building, TrendingDown as RentDown, TrendingUp as BuyUp // Icons for rent vs. buy
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


// --- Main Rent vs. Buy Calculator Page Component ---
interface RentVsBuyCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const RentVsBuyCalculatorPage: React.FC<RentVsBuyCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [comparisonPeriodYears, setComparisonPeriodYears] = useState<number>(7); // Years for comparison

  // Renting Side Inputs
  const [monthlyRent, setMonthlyRent] = useState<number>(25000); // INR
  const [annualRentIncrease, setAnnualRentIncrease] = useState<number>(3); // %
  const [rentersInsuranceAnnual, setRentersInsuranceAnnual] = useState<number>(3000); // INR
  const [rentSavingsInvestmentReturn, setRentSavingsInvestmentReturn] = useState<number>(7); // Annual %

  // Buying Side Inputs
  const [homePrice, setHomePrice] = useState<number>(5000000); // INR
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // %
  const [mortgageInterestRate, setMortgageInterestRate] = useState<number>(7.5); // %
  const [loanTermYears, setLoanTermYears] = useState<number>(20); // Years
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(0.5); // % of home value
  const [homeInsuranceAnnual, setHomeInsuranceAnnual] = useState<number>(12000); // INR
  const [hoaMonthly, setHoaMonthly] = useState<number>(0); // INR
  const [closingCostsPercent, setClosingCostsPercent] = useState<number>(2); // % of home price
  const [maintenanceAnnualPercent, setMaintenanceAnnualPercent] = useState<number>(1); // % of home value
  const [homeAppreciationAnnual, setHomeAppreciationAnnual] = useState<number>(4); // %

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for inputs
  const handleComparisonPeriodYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComparisonPeriodYears(Number(e.target.value));
  };
  const handleMonthlyRentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setMonthlyRent(Number(value));
  };
  const handleAnnualRentIncreaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnnualRentIncrease(Number(e.target.value));
  };
  const handleRentersInsuranceAnnualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setRentersInsuranceAnnual(Number(value));
  };
  const handleRentSavingsInvestmentReturnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRentSavingsInvestmentReturn(Number(e.target.value));
  };
  const handleHomePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setHomePrice(Number(value));
  };
  const handleDownPaymentPercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDownPaymentPercent(Number(e.target.value));
  };
  const handleMortgageInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMortgageInterestRate(Number(e.target.value));
  };
  const handleLoanTermYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoanTermYears(Number(e.target.value));
  };
  const handlePropertyTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyTaxRate(Number(e.target.value));
  };
  const handleHomeInsuranceAnnualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setHomeInsuranceAnnual(Number(value));
  };
  const handleHoaMonthlyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setHoaMonthly(Number(value));
  };
  const handleClosingCostsPercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClosingCostsPercent(Number(e.target.value));
  };
  const handleMaintenanceAnnualPercentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaintenanceAnnualPercent(Number(e.target.value));
  };
  const handleHomeAppreciationAnnualChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHomeAppreciationAnnual(Number(e.target.value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Calculations
  const calculations = useMemo(() => {
    // --- Buying Scenario Calculations ---
    const downPaymentAmount = homePrice * (downPaymentPercent / 100);
    const loanAmount = homePrice - downPaymentAmount;
    const closingCostsAmount = homePrice * (closingCostsPercent / 100);

    const monthlyMortgageRate = mortgageInterestRate / 100 / 12;
    const numPaymentsTotalLoan = loanTermYears * 12;

    let monthlyPI: number;
    if (monthlyMortgageRate === 0) {
      monthlyPI = loanAmount / numPaymentsTotalLoan; // Simple division for 0% interest
    } else {
      monthlyPI = (loanAmount * monthlyMortgageRate) / (1 - Math.pow(1 + monthlyMortgageRate, -numPaymentsTotalLoan));
    }

    let totalInterestPaidBuying = 0;
    let totalPropertyTaxPaid = 0;
    let totalHomeInsurancePaid = 0;
    let totalHOAPaid = 0;
    let totalMaintenancePaid = 0;
    let principalPaidBuying = 0;
    let remainingLoanBalance = loanAmount;

    // Simulate payments over the comparison period
    for (let month = 1; month <= comparisonPeriodYears * 12; month++) {
      const currentHomeValueForTaxesAndMaintenance = homePrice * Math.pow(1 + homeAppreciationAnnual / 100, (month - 1) / 12);
      
      const interestThisMonth = remainingLoanBalance * monthlyMortgageRate;
      const principalThisMonth = monthlyPI - interestThisMonth;

      totalInterestPaidBuying += interestThisMonth;
      principalPaidBuying += principalThisMonth;
      remainingLoanBalance = Math.max(0, remainingLoanBalance - principalThisMonth); // Ensure balance doesn't go negative

      totalPropertyTaxPaid += currentHomeValueForTaxesAndMaintenance * (propertyTaxRate / 100 / 12);
      totalHomeInsurancePaid += homeInsuranceAnnual / 12;
      totalHOAPaid += hoaMonthly;
      totalMaintenancePaid += currentHomeValueForTaxesAndMaintenance * (maintenanceAnnualPercent / 100 / 12);
    }

    const finalHomeValue = homePrice * Math.pow(1 + homeAppreciationAnnual / 100, comparisonPeriodYears);

    // Net Wealth for Buying: Final Asset Value (Home) - Remaining Debt - Total Costs
    const netWealthBuying = finalHomeValue - remainingLoanBalance - (downPaymentAmount + closingCostsAmount + totalInterestPaidBuying + totalPropertyTaxPaid + totalHomeInsurancePaid + totalHOAPaid + totalMaintenancePaid);

    // --- Renting Scenario Calculations ---
    let totalRentPaid = 0;
    let currentMonthlyRentAdjusted = monthlyRent;

    // Calculate total rent paid over the period with annual increase
    for (let month = 1; month <= comparisonPeriodYears * 12; month++) {
      totalRentPaid += currentMonthlyRentAdjusted;
      if (month % 12 === 0) { // Apply annual increase
        currentMonthlyRentAdjusted *= (1 + annualRentIncrease / 100);
      }
    }

    const totalRentersInsurancePaid = rentersInsuranceAnnual * comparisonPeriodYears;

    // Calculate future value of the money not spent on buying (initial outlays)
    const initialInvestableAmount = downPaymentAmount + closingCostsAmount;
    const futureValueInitialInvestment = initialInvestableAmount * Math.pow(1 + rentSavingsInvestmentReturn / 100, comparisonPeriodYears);

    // Net Wealth for Renting: Future Value of Saved Funds (initial + difference in monthly housing costs)
    // For simplicity, let's assume the 'saved' money is just the initial investable amount.
    // A more complex model would compare monthly housing costs (PITI+HOA+Maint vs Rent+Insurance) and invest the difference.
    // For this calculator, we'll focus on the initial investment opportunity.
    const netWealthRenting = futureValueInitialInvestment - totalRentPaid - totalRentersInsurancePaid;

    // --- Comparison ---
    const financialDifference = netWealthBuying - netWealthRenting; // Positive means buying is better

    return {
      downPaymentAmount: Math.round(downPaymentAmount),
      closingCostsAmount: Math.round(closingCostsAmount),
      monthlyPI: Math.round(monthlyPI),
      totalInterestPaidBuying: Math.round(totalInterestPaidBuying),
      totalPropertyTaxPaid: Math.round(totalPropertyTaxPaid),
      totalHomeInsurancePaid: Math.round(totalHomeInsurancePaid),
      totalHOAPaid: Math.round(totalHOAPaid),
      totalMaintenancePaid: Math.round(totalMaintenancePaid),
      finalHomeValue: Math.round(finalHomeValue),
      remainingLoanBalance: Math.round(remainingLoanBalance),
      netWealthBuying: Math.round(netWealthBuying),

      totalRentPaid: Math.round(totalRentPaid),
      totalRentersInsurancePaid: Math.round(totalRentersInsurancePaid),
      futureValueInitialInvestment: Math.round(futureValueInitialInvestment),
      netWealthRenting: Math.round(netWealthRenting),

      financialDifference: Math.round(financialDifference),
      buyingIsBetter: financialDifference > 0,
    };
  }, [
    comparisonPeriodYears, monthlyRent, annualRentIncrease, rentersInsuranceAnnual, rentSavingsInvestmentReturn,
    homePrice, downPaymentPercent, mortgageInterestRate, loanTermYears, propertyTaxRate,
    homeInsuranceAnnual, hoaMonthly, closingCostsPercent, maintenanceAnnualPercent, homeAppreciationAnnual
  ]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Rent vs. Buy Calculator?",
      answer: "A Rent vs. Buy Calculator is a financial tool that helps you compare the long-term costs and financial outcomes of renting a home versus buying one. It considers various expenses associated with both options, such as rent, mortgage payments, property taxes, insurance, maintenance, and also factors in potential home appreciation and investment returns on saved funds, to give you a clearer picture of which option might be more financially beneficial over a chosen period."
    },
    {
      question: "What factors does this calculator consider?",
      answer: "This calculator takes into account:<ul><li><strong>Renting:</strong> Monthly rent, annual rent increase, renter's insurance, and investment returns on money saved by not buying.</li><li><strong>Buying:</strong> Home price, down payment, mortgage interest rate and term, property taxes, home insurance, HOA fees, closing costs, annual maintenance, and home appreciation.</li></ul>"
    },
    {
      question: "What is 'Net Wealth' in this context?",
      answer: "Net wealth, in this calculator, represents your estimated financial position at the end of the comparison period for each scenario. For buying, it considers the final value of the home, minus the remaining mortgage and all associated costs. For renting, it considers the future value of your initial savings (that would have been used for a down payment/closing costs) minus all rent and insurance costs. A higher net wealth indicates a better financial outcome."
    },
    {
      question: "What is 'Opportunity Cost' in the Renting scenario?",
      answer: "Opportunity cost refers to the potential benefits an individual misses out on when choosing one alternative over another. In the renting scenario, the money you save by not making a down payment or paying closing costs can be invested. The calculator estimates the future value of this invested money, representing the opportunity cost of not buying a home and gaining equity."
    },
    {
      question: "Does buying always make more financial sense than renting?",
      answer: "Not always. While buying can build equity and offer tax benefits, it comes with significant upfront costs (down payment, closing costs) and ongoing responsibilities (maintenance, property taxes). Renting offers flexibility and fewer responsibilities. The better option depends on your financial situation, market conditions, expected duration in the home, and personal preferences. This calculator helps you analyze the numbers for your specific situation."
    },
    {
      question: "What is a 'break-even point'?",
      answer: "The break-even point in a rent vs. buy analysis is the point in time (number of years) when the total financial cost of buying a home equals the total financial cost of renting. Before this point, renting might be cheaper; after this point, buying typically becomes more financially advantageous due to equity build-up and appreciation. This calculator doesn't explicitly calculate the break-even point, but it helps you see the financial difference over a set period."
    },
    {
      question: "What are some non-financial factors to consider?",
      answer: "Beyond the numbers, consider:<ul><li><strong>Flexibility:</strong> Renting offers more flexibility for relocation.</li><li><strong>Responsibility:</strong> Homeowners are responsible for all maintenance and repairs.</li><li><strong>Lifestyle:</strong> Homeownership involves more time and effort.</li><li><strong>Community:</strong> Buying often leads to a greater sense of community and stability.</li><li><strong>Market Conditions:</strong> Local housing market trends (appreciation, rental demand).</li><li><strong>Personal Goals:</strong> Your long-term life plans and priorities.</li></ul>"
    }
  ];

  const tipsForDecisionMaking = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Consider your expected duration in the home; buying often makes more sense for longer stays." },
    { icon: <PiggyBank className="w-6 h-6 text-blue-500" />, text: "Factor in all costs: for buying (PITI, maintenance, closing) and for renting (rent, insurance, opportunity cost)." },
    { icon: <TrendingUp className="w-6 h-6 text-yellow-500" />, text: "Research local market trends for rent increases and home appreciation rates." },
    { icon: <Lightbulb className="w-6 h-6 text-purple-500" />, text: "Don't just look at monthly payments; consider the total financial impact over several years." },
    { icon: <Wallet className="w-6 h-6 text-orange-500" />, text: "Assess your financial stability and emergency fund before committing to homeownership." },
    { icon: <Clock className="w-6 h-6 text-red-500" />, text: "Think about lifestyle preferences: do you want the responsibilities of homeownership or the flexibility of renting?" },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Personalized Home Loan Offers", description: "Access tailored home loan products from leading banks based on your affordability." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Expert Mortgage Advisory", description: "Connect with certified mortgage advisors for personalized guidance on home financing." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Investment Planning", description: "Explore investment opportunities for your savings, whether you choose to rent or buy." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Comprehensive Financial Tools", description: "Utilize a suite of calculators and resources to make informed decisions about your financial future." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-green-600 to-teal-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Rent or Buy? Make the Smart Choice with Our{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Rent vs. Buy Calculator.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-green-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Compare the financial costs and benefits of renting versus buying a home over time.
            Plan your housing future with confidence.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Home Loan or Investment Advisory"
                openApplyModal={openApplyModal}
                className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Get Housing Financial Advice
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Rent vs. Buy Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-green-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-green-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-teal-500" /> Housing Financial Comparison
          </h2>

          <div className="mb-8">
            <label htmlFor="comparisonPeriodYears" className="block text-lg font-semibold text-gray-700 mb-2 text-center">
              Comparison Period: <span className="text-purple-600">{comparisonPeriodYears} Years</span>
            </label>
            <input
              type="range"
              id="comparisonPeriodYears"
              min="1"
              max="15"
              step="1"
              value={comparisonPeriodYears}
              onChange={handleComparisonPeriodYearsChange}
              className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <input
              type="number"
              value={comparisonPeriodYears}
              onChange={handleComparisonPeriodYearsChange}
              onBlur={(e) => setComparisonPeriodYears(Number(e.target.value))}
              className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
              min="1"
              max="15"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Renting Side Inputs */}
            <div className="space-y-8 p-4 bg-blue-50 rounded-2xl border border-blue-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Building className="w-6 h-6 mr-2 text-blue-600" /> Renting Scenario
              </h3>

              {/* Monthly Rent */}
              <motion.div variants={itemVariants}>
                <label htmlFor="monthlyRent" className="block text-lg font-semibold text-gray-700 mb-2">
                  Current Monthly Rent: <span className="text-indigo-600">{formatCurrency(monthlyRent)}</span>
                </label>
                <input
                  type="range"
                  id="monthlyRent"
                  min="5000"
                  max="100000"
                  step="1000"
                  value={monthlyRent}
                  onChange={handleMonthlyRentChange}
                  className="w-full h-2 bg-gradient-to-r from-indigo-300 to-indigo-500 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(monthlyRent)}
                  onChange={handleMonthlyRentChange}
                  onBlur={(e) => setMonthlyRent(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Annual Rent Increase */}
              <motion.div variants={itemVariants}>
                <label htmlFor="annualRentIncrease" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Rent Increase (%): <span className="text-teal-600">{annualRentIncrease}%</span>
                </label>
                <input
                  type="range"
                  id="annualRentIncrease"
                  min="0"
                  max="10"
                  step="0.1"
                  value={annualRentIncrease}
                  onChange={handleAnnualRentIncreaseChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="number"
                  value={annualRentIncrease}
                  onChange={handleAnnualRentIncreaseChange}
                  onBlur={(e) => setAnnualRentIncrease(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  step="0.1"
                />
              </motion.div>

              {/* Renter's Insurance Annual */}
              <motion.div variants={itemVariants}>
                <label htmlFor="rentersInsuranceAnnual" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Renter's Insurance: <span className="text-orange-600">{formatCurrency(rentersInsuranceAnnual)}</span>
                </label>
                <input
                  type="range"
                  id="rentersInsuranceAnnual"
                  min="0"
                  max="10000"
                  step="500"
                  value={rentersInsuranceAnnual}
                  onChange={handleRentersInsuranceAnnualChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(rentersInsuranceAnnual)}
                  onChange={handleRentersInsuranceAnnualChange}
                  onBlur={(e) => setRentersInsuranceAnnual(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Rent Savings Investment Return */}
              <motion.div variants={itemVariants}>
                <label htmlFor="rentSavingsInvestmentReturn" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Investment Return on Saved Funds (%): <span className="text-purple-600">{rentSavingsInvestmentReturn}%</span>
                </label>
                <input
                  type="range"
                  id="rentSavingsInvestmentReturn"
                  min="0"
                  max="15"
                  step="0.1"
                  value={rentSavingsInvestmentReturn}
                  onChange={handleRentSavingsInvestmentReturnChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="number"
                  value={rentSavingsInvestmentReturn}
                  onChange={handleRentSavingsInvestmentReturnChange}
                  onBlur={(e) => setRentSavingsInvestmentReturn(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  step="0.1"
                />
              </motion.div>
            </div>

            {/* Buying Side Inputs */}
            <div className="space-y-8 p-4 bg-green-50 rounded-2xl border border-green-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Home className="w-6 h-6 mr-2 text-green-600" /> Buying Scenario
              </h3>

              {/* Home Price */}
              <motion.div variants={itemVariants}>
                <label htmlFor="homePrice" className="block text-lg font-semibold text-gray-700 mb-2">
                  Estimated Home Price: <span className="text-red-600">{formatCurrency(homePrice)}</span>
                </label>
                <input
                  type="range"
                  id="homePrice"
                  min="1000000"
                  max="20000000"
                  step="100000"
                  value={homePrice}
                  onChange={handleHomePriceChange}
                  className="w-full h-2 bg-gradient-to-r from-red-300 to-red-500 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(homePrice)}
                  onChange={handleHomePriceChange}
                  onBlur={(e) => setHomePrice(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-red-500 focus:border-red-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Down Payment Percent */}
              <motion.div variants={itemVariants}>
                <label htmlFor="downPaymentPercent" className="block text-lg font-semibold text-gray-700 mb-2">
                  Down Payment (%): <span className="text-green-600">{downPaymentPercent}%</span>
                </label>
                <input
                  type="range"
                  id="downPaymentPercent"
                  min="0"
                  max="50"
                  step="1"
                  value={downPaymentPercent}
                  onChange={handleDownPaymentPercentChange}
                  className="w-full h-2 bg-gradient-to-r from-green-300 to-green-500 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <input
                  type="number"
                  value={downPaymentPercent}
                  onChange={handleDownPaymentPercentChange}
                  onBlur={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-green-500 focus:border-green-500 transition-all"
                  min="0"
                  max="50"
                />
              </motion.div>

              {/* Mortgage Interest Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="mortgageInterestRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Mortgage Interest Rate (%): <span className="text-yellow-600">{mortgageInterestRate}%</span>
                </label>
                <input
                  type="range"
                  id="mortgageInterestRate"
                  min="4"
                  max="12"
                  step="0.1"
                  value={mortgageInterestRate}
                  onChange={handleMortgageInterestRateChange}
                  className="w-full h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-lg appearance-none cursor-pointer accent-yellow-600"
                />
                <input
                  type="number"
                  value={mortgageInterestRate}
                  onChange={handleMortgageInterestRateChange}
                  onBlur={(e) => setMortgageInterestRate(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-yellow-500 focus:border-yellow-500 transition-all"
                  step="0.1"
                />
              </motion.div>

              {/* Loan Term Years */}
              <motion.div variants={itemVariants}>
                <label htmlFor="loanTermYears" className="block text-lg font-semibold text-gray-700 mb-2">
                  Loan Term (Years): <span className="text-pink-600">{loanTermYears} Years</span>
                </label>
                <input
                  type="range"
                  id="loanTermYears"
                  min="5"
                  max="30"
                  step="1"
                  value={loanTermYears}
                  onChange={handleLoanTermYearsChange}
                  className="w-full h-2 bg-gradient-to-r from-pink-300 to-pink-500 rounded-lg appearance-none cursor-pointer accent-pink-600"
                />
                <input
                  type="number"
                  value={loanTermYears}
                  onChange={handleLoanTermYearsChange}
                  onBlur={(e) => setLoanTermYears(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-pink-500 focus:border-pink-500 transition-all"
                  min="5"
                  max="30"
                />
              </motion.div>

              {/* Property Tax Rate */}
              <motion.div variants={itemVariants}>
                <label htmlFor="propertyTaxRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Property Tax Rate (% of Home Value): <span className="text-gray-600">{propertyTaxRate}%</span>
                </label>
                <input
                  type="range"
                  id="propertyTaxRate"
                  min="0"
                  max="2"
                  step="0.01"
                  value={propertyTaxRate}
                  onChange={handlePropertyTaxRateChange}
                  className="w-full h-2 bg-gradient-to-r from-gray-300 to-gray-500 rounded-lg appearance-none cursor-pointer accent-gray-600"
                />
                <input
                  type="number"
                  value={propertyTaxRate}
                  onChange={handlePropertyTaxRateChange}
                  onBlur={(e) => setPropertyTaxRate(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-gray-500 focus:border-gray-500 transition-all"
                  step="0.01"
                />
              </motion.div>

              {/* Home Insurance Annual */}
              <motion.div variants={itemVariants}>
                <label htmlFor="homeInsuranceAnnual" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Home Insurance: <span className="text-blue-600">{formatCurrency(homeInsuranceAnnual)}</span>
                </label>
                <input
                  type="range"
                  id="homeInsuranceAnnual"
                  min="0"
                  max="50000"
                  step="1000"
                  value={homeInsuranceAnnual}
                  onChange={handleHomeInsuranceAnnualChange}
                  className="w-full h-2 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(homeInsuranceAnnual)}
                  onChange={handleHomeInsuranceAnnualChange}
                  onBlur={(e) => setHomeInsuranceAnnual(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-blue-500 focus:border-blue-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* HOA Monthly */}
              <motion.div variants={itemVariants}>
                <label htmlFor="hoaMonthly" className="block text-lg font-semibold text-gray-700 mb-2">
                  Monthly HOA Fees: <span className="text-purple-600">{formatCurrency(hoaMonthly)}</span>
                </label>
                <input
                  type="range"
                  id="hoaMonthly"
                  min="0"
                  max="10000"
                  step="100"
                  value={hoaMonthly}
                  onChange={handleHoaMonthlyChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(hoaMonthly)}
                  onChange={handleHoaMonthlyChange}
                  onBlur={(e) => setHoaMonthly(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Closing Costs Percent */}
              <motion.div variants={itemVariants}>
                <label htmlFor="closingCostsPercent" className="block text-lg font-semibold text-gray-700 mb-2">
                  Closing Costs (% of Home Price): <span className="text-teal-600">{closingCostsPercent}%</span>
                </label>
                <input
                  type="range"
                  id="closingCostsPercent"
                  min="0"
                  max="5"
                  step="0.1"
                  value={closingCostsPercent}
                  onChange={handleClosingCostsPercentChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="number"
                  value={closingCostsPercent}
                  onChange={handleClosingCostsPercentChange}
                  onBlur={(e) => setClosingCostsPercent(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  step="0.1"
                />
              </motion.div>

              {/* Maintenance Annual Percent */}
              <motion.div variants={itemVariants}>
                <label htmlFor="maintenanceAnnualPercent" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Maintenance (% of Home Value): <span className="text-orange-600">{maintenanceAnnualPercent}%</span>
                </label>
                <input
                  type="range"
                  id="maintenanceAnnualPercent"
                  min="0"
                  max="2"
                  step="0.1"
                  value={maintenanceAnnualPercent}
                  onChange={handleMaintenanceAnnualPercentChange}
                  className="w-full h-2 bg-gradient-to-r from-orange-300 to-orange-500 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
                <input
                  type="number"
                  value={maintenanceAnnualPercent}
                  onChange={handleMaintenanceAnnualPercentChange}
                  onBlur={(e) => setMaintenanceAnnualPercent(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-orange-500 focus:border-orange-500 transition-all"
                  step="0.1"
                />
              </motion.div>

              {/* Home Appreciation Annual */}
              <motion.div variants={itemVariants}>
                <label htmlFor="homeAppreciationAnnual" className="block text-lg font-semibold text-gray-700 mb-2">
                  Annual Home Appreciation (%): <span className="text-pink-600">{homeAppreciationAnnual}%</span>
                </label>
                <input
                  type="range"
                  id="homeAppreciationAnnual"
                  min="0"
                  max="10"
                  step="0.1"
                  value={homeAppreciationAnnual}
                  onChange={handleHomeAppreciationAnnualChange}
                  className="w-full h-2 bg-gradient-to-r from-pink-300 to-pink-500 rounded-lg appearance-none cursor-pointer accent-pink-600"
                />
                <input
                  type="number"
                  value={homeAppreciationAnnual}
                  onChange={handleHomeAppreciationAnnualChange}
                  onBlur={(e) => setHomeAppreciationAnnual(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-pink-500 focus:border-pink-500 transition-all"
                  step="0.1"
                />
              </motion.div>
            </div>
          </div>

          {/* Results Display Section */}
          <div className="mt-12 p-6 bg-gradient-to-br from-green-500 to-teal-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6">Net Financial Position After {comparisonPeriodYears} Years</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
              {/* Renting Results */}
              <motion.div
                key="rentingResults"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-blue-700/40 p-6 rounded-lg flex flex-col items-center justify-center"
              >
                <Building className="w-12 h-12 mb-4 text-blue-300" />
                <p className="text-xl font-semibold mb-2">If you Rent:</p>
                <p className="text-4xl font-extrabold text-yellow-300 drop-shadow-lg">
                  {formatCurrency(calculations.netWealthRenting)}
                </p>
                <p className="text-lg mt-2 text-blue-100">Estimated Net Wealth</p>
                <div className="w-full text-left text-sm mt-4 space-y-2">
                  <p>Total Rent Paid: {formatCurrency(calculations.totalRentPaid)}</p>
                  <p>Total Renter's Insurance: {formatCurrency(calculations.totalRentersInsurancePaid)}</p>
                  <p>Future Value of Initial Investment: {formatCurrency(calculations.futureValueInitialInvestment)}</p>
                </div>
              </motion.div>

              {/* Buying Results */}
              <motion.div
                key="buyingResults"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-green-700/40 p-6 rounded-lg flex flex-col items-center justify-center"
              >
                <Home className="w-12 h-12 mb-4 text-green-300" />
                <p className="text-xl font-semibold mb-2">If you Buy:</p>
                <p className="text-4xl font-extrabold text-yellow-300 drop-shadow-lg">
                  {formatCurrency(calculations.netWealthBuying)}
                </p>
                <p className="text-lg mt-2 text-green-100">Estimated Net Wealth</p>
                <div className="w-full text-left text-sm mt-4 space-y-2">
                  <p>Final Home Value: {formatCurrency(calculations.finalHomeValue)}</p>
                  <p>Remaining Loan Balance: {formatCurrency(calculations.remainingLoanBalance)}</p>
                  <p>Total Interest Paid: {formatCurrency(calculations.totalInterestPaidBuying)}</p>
                  <p>Total Property Tax: {formatCurrency(calculations.totalPropertyTaxPaid)}</p>
                  <p>Total Home Insurance: {formatCurrency(calculations.totalHomeInsurancePaid)}</p>
                  <p>Total HOA Fees: {formatCurrency(calculations.totalHOAPaid)}</p>
                  <p>Total Maintenance: {formatCurrency(calculations.totalMaintenancePaid)}</p>
                  <p>Initial Outlays (DP + Closing): {formatCurrency(calculations.downPaymentAmount + calculations.closingCostsAmount)}</p>
                </div>
              </motion.div>
            </div>

            {/* Overall Difference */}
            <motion.div
              key="difference"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`mt-8 p-6 rounded-lg w-full max-w-2xl ${calculations.buyingIsBetter ? 'bg-green-800/60' : 'bg-red-800/60'}`}
            >
              <p className="text-xl font-semibold mb-2 flex items-center justify-center gap-3">
                {calculations.buyingIsBetter ? <BuyUp className="w-8 h-8 text-white" /> : <RentDown className="w-8 h-8 text-white" />}
                Net Financial Difference:
              </p>
              <p className="text-4xl font-extrabold text-white drop-shadow-lg">
                {formatCurrency(Math.abs(calculations.financialDifference))}
              </p>
              <p className="text-lg mt-2">
                {calculations.buyingIsBetter
                  ? `Buying is estimated to be better by this amount over ${comparisonPeriodYears} years.`
                  : `Renting is estimated to be better by this amount over ${comparisonPeriodYears} years.`}
              </p>
            </motion.div>

            {/* Important Note */}
            <p className="text-sm text-yellow-200 mt-8">
              *This calculation provides an estimate of net financial position. It does not account for potential tax benefits, transaction costs upon selling a home, or the emotional/lifestyle aspects of each choice. Always consult a financial advisor for personalized guidance.
            </p>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Rent vs. Buy Calculator?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Rent vs. Buy Calculator is a sophisticated financial planning tool designed to help you make one of the most significant financial decisions of your life: whether to rent or buy a home. It goes beyond simply comparing monthly rent to a mortgage payment by incorporating a wide array of costs and financial benefits for both scenarios over a specified period. For renting, it considers escalating rent, renter's insurance, and the potential investment returns on the money you save by not buying. For buying, it accounts for the home price, down payment, mortgage interest, property taxes, home insurance, HOA fees, closing costs, ongoing maintenance, and crucially, potential home appreciation. By providing a comprehensive comparison of the net financial position, it helps you understand which option is more advantageous for your unique circumstances and financial goals.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our Rent vs. Buy Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Set Comparison Period:</strong> Choose the number of years over which you want to compare renting versus buying (e.g., 5, 7, 10 years). This is crucial for long-term analysis.</motion.li>
              <motion.li variants={itemVariants}><strong>Enter Renting Scenario Details:</strong>
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li><strong>Current Monthly Rent:</strong> Your current rent payment.</li>
                  <li><strong>Annual Rent Increase (%):</strong> The expected percentage increase in rent each year.</li>
                  <li><strong>Annual Renter's Insurance:</strong> The yearly cost of insuring your belongings as a renter.</li>
                  <li><strong>Annual Investment Return on Saved Funds (%):</strong> The average annual return you expect to earn if you invest the money you save by not buying (e.e., down payment, closing costs).</li>
                </ul>
              </motion.li>
              <motion.li variants={itemVariants}><strong>Input Buying Scenario Details:</strong>
                <ul className="list-disc list-inside ml-6 mt-2">
                  <li><strong>Estimated Home Price:</strong> The approximate price of the home you're considering.</li>
                  <li><strong>Down Payment (%):</strong> The percentage of the home price you'll pay upfront.</li>
                  <li><strong>Mortgage Interest Rate (%):</strong> Your expected annual interest rate on the home loan.</li>
                  <li><strong>Loan Term (Years):</strong> The duration of your mortgage (e.g., 15, 20, 30 years).</li>
                  <li><strong>Annual Property Tax Rate (% of Home Value):</strong> The yearly property tax rate in your area.</li>
                  <li><strong>Annual Home Insurance:</strong> The yearly cost to insure the home itself.</li>
                  <li><strong>Monthly HOA Fees:</strong> Any monthly fees for Homeowners Associations (if applicable).</li>
                  <li><strong>Closing Costs (% of Home Price):</strong> One-time fees paid when you finalize the home purchase.</li>
                  <li><strong>Annual Maintenance (% of Home Value):</strong> The estimated yearly cost for home repairs and upkeep.</li>
                  <li><strong>Annual Home Appreciation (%):</strong> The expected percentage increase in your home's value each year.</li>
                </ul>
              </motion.li>
              <motion.li variants={itemVariants}><strong>Review Your Financial Comparison:</strong> The calculator will display the estimated 'Net Financial Position' for both renting and buying after the specified comparison period. It will also show the overall financial difference, indicating which option is estimated to be more financially advantageous for you.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Rent vs. Buy Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Comprehensive Financial Analysis:</strong> Goes beyond simple monthly payments to include all major costs and potential benefits for both options.</motion.li>
              <motion.li variants={itemVariants}><strong>Informed Decision-Making:</strong> Provides clear, data-driven insights to help you make a financially sound choice about your housing.</motion.li>
              <motion.li variants={itemVariants}><strong>Long-Term Perspective:</strong> Evaluates outcomes over several years, crucial for understanding the true financial impact of each decision.</motion.li>
              <motion.li variants={itemVariants}><strong>Quantify Opportunity Costs:</strong> Highlights the financial benefit of investing money saved by renting, a factor often overlooked.</motion.li>
              <motion.li variants={itemVariants}><strong>Personalized Insights:</strong> Tailors the comparison to your specific financial inputs and market expectations, making the results highly relevant to you.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key Rent vs. Buy Terms
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Net Financial Position:</strong> The estimated total value of your assets minus your liabilities (and accumulated costs) at the end of the comparison period for each scenario.</motion.p>
              <motion.p variants={itemVariants}><strong>Opportunity Cost:</strong> The value of the next best alternative that you give up when making a choice. In this context, it's the potential investment earnings on money not used for a down payment or closing costs.</motion.p>
              <motion.p variants={itemVariants}><strong>Home Appreciation:</strong> The increase in the market value of a home over time.</motion.p>
              <motion.p variants={itemVariants}><strong>Equity:</strong> The portion of your home that you truly own. It's the market value of your home minus your outstanding mortgage balance.</motion.p>
              <motion.p variants={itemVariants}><strong>PITI:</strong> An acronym for Principal, Interest, Taxes, and Insurance – the four main components of a typical monthly mortgage payment.</motion.p>
              <motion.p variants={itemVariants}><strong>Closing Costs:</strong> Various fees and expenses paid by the buyer and seller at the closing of a real estate transaction, typically 2-5% of the loan amount or home price.</motion.p>
              <motion.p variants={itemVariants}><strong>Property Taxes:</strong> Taxes assessed by local governments on real estate, usually calculated as a percentage of the home's assessed value.</motion.p>
              <motion.p variants={itemVariants}><strong>Homeowners Insurance:</strong> Insurance that protects the homeowner against losses and damages to the property and its contents.</motion.p>
              <motion.p variants={itemVariants}><strong>HOA Fees (Homeowners Association Fees):</strong> Regular fees paid by homeowners in certain communities to cover maintenance and amenities of common areas.</motion.p>
              <motion.p variants={itemVariants}><strong>Renter's Insurance:</strong> Insurance that protects a renter's personal property within the rented residence and provides liability coverage.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Making Your Housing Decision
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForDecisionMaking.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Housing & Financial Needs?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-green-50 to-teal-50 border border-green-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Ready to Make Your Housing Decision?
            </motion.h2>
            <motion.p
              className="text-lg text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart provides comprehensive tools, expert advice, and tailored financial solutions
              to support your housing goals, whether you choose to rent or buy.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="Housing Financial Planning"
                  openApplyModal={openApplyModal}
                  className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
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

export default RentVsBuyCalculatorPage;
