import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IndianRupee, Percent, Calculator, TrendingUp, DollarSign,
  Wallet, BarChart, Lightbulb, Info, ChevronDown, CheckCircle, Search, Scale, MessageSquare,
  ReceiptText, Tag, ShoppingBag, Landmark, Briefcase, TrendingDown
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


// --- Main Sales Tax Calculator Page Component ---
interface SalesTaxCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const SalesTaxCalculatorPage: React.FC<SalesTaxCalculatorPageProps> = ({ openApplyModal }) => {
  // Calculator States
  const [productPrice, setProductPrice] = useState<number>(1000); // Base Price of Product
  const [salesTaxRate, setSalesTaxRate] = useState<number>(18); // Sales Tax Rate (e.g., GST) in %

  // FAQ state
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  // Handlers for direct input fields (with formatting)
  const handleProductPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setProductPrice(Number(value));
  };

  const handleSalesTaxRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSalesTaxRate(Number(e.target.value));
  };

  // Toggle FAQ
  const toggleFAQ = (index: number) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  // Memoized Sales Tax Calculation
  const calculations = useMemo(() => {
    const basePrice = productPrice;
    const taxRate = salesTaxRate / 100; // as decimal

    const salesTaxAmount = basePrice * taxRate;
    const finalPrice = basePrice + salesTaxAmount;

    return {
      salesTaxAmount: Math.round(salesTaxAmount),
      finalPrice: Math.round(finalPrice),
    };
  }, [productPrice, salesTaxRate]);

  // Data for informational sections
  const faqs = [
    {
      question: "What is a Sales Tax Calculator (GST Calculator)?",
      answer: "A Sales Tax Calculator, often referred to as a GST Calculator in India, is a tool that helps you determine the final price of a product or service by adding the applicable sales tax (GST) to its base price. It also shows you the amount of tax being charged separately."
    },
    {
      question: "What is GST in India?",
      answer: "GST stands for Goods and Services Tax. It is a comprehensive, multi-stage, destination-based tax levied on every value addition. It has replaced multiple indirect taxes in India, aiming to simplify the tax structure and create a common national market."
    },
    {
      question: "What are the different GST rates in India?",
      answer: "In India, GST is levied at various rates depending on the type of goods and services. Common rates are 0% (for essential goods/services), 5%, 12%, 18%, and 28% (for luxury or demerit goods/services)."
    },
    {
      question: "How does the 'final price' differ from the 'product price'?",
      answer: "The 'product price' (or base price) is the cost of the good or service before any taxes are added. The 'final price' is the total amount you pay, which includes the product price plus the applicable sales tax (GST)."
    },
    {
      question: "Why is it important to calculate sales tax?",
      answer: "Calculating sales tax helps consumers understand the true cost of their purchases and allows businesses to accurately price their products and comply with tax regulations. It ensures transparency in transactions."
    },
    {
      question: "Can this calculator be used for both adding and removing GST?",
      answer: "This calculator is primarily designed to add GST to a base price. To remove GST from a final price (e.g., if you have an MRP and want to find the base price), you would need a different calculation: Base Price = Final Price / (1 + Tax Rate/100)."
    },
    {
      question: "What is Input Tax Credit (ITC) under GST?",
      answer: "Input Tax Credit (ITC) is a mechanism under GST that allows businesses to claim credit for the GST paid on the purchase of goods or services used for their business. This avoids the cascading effect of taxes (tax on tax)."
    }
  ];

  const tipsForUnderstandingGST = [
    { icon: <CheckCircle className="w-6 h-6 text-green-500" />, text: "Always check the applicable GST rate for the goods/services you are buying." },
    { icon: <ReceiptText className="w-6 h-6 text-blue-500" />, text: "Insist on a proper GST invoice for all your purchases, especially for businesses." },
    { icon: <Percent className="w-6 h-6 text-yellow-500" />, text: "Understand that GST is a consumption tax, ultimately borne by the end consumer." },
    { icon: <Lightbulb className="w-6 h-6 text-orange-500" />, text: "Be aware of different GST components: CGST, SGST/UGST, and IGST." },
    { icon: <Tag className="w-6 h-6 text-purple-500" />, text: "For businesses, understand Input Tax Credit (ITC) to optimize tax outflow." },
    { icon: <TrendingDown className="w-6 h-6 text-red-500" />, text: "Report any discrepancies or overcharging of GST to relevant authorities." },
  ];

  const whyUseBanksCart = [
    { icon: <Scale className="w-16 h-16 text-teal-400" />, title: "Comprehensive Financial Tools", description: "Access a wide array of calculators and resources for personal and business finance." },
    { icon: <Search className="w-16 h-16 text-green-400" />, title: "Simplified Tax Understanding", description: "Our tools and articles demystify complex tax concepts like GST for everyone." },
    { icon: <MessageSquare className="w-16 h-16 text-blue-400" />, title: "Expert Tax Advisory", description: "Connect with certified tax professionals for personalized guidance on GST and other taxes." },
    { icon: <Landmark className="w-16 h-16 text-purple-400" />, title: "Stay Updated on Regulations", description: "Get the latest information on tax laws and financial regulations impacting your transactions." },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8 font-inter text-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12 bg-gradient-to-r from-blue-600 to-cyan-700 text-white p-8 rounded-3xl shadow-xl"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg"
            variants={itemVariants}
          >
            Calculate Your Product's{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300">
              Final Price with GST.
            </span>
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Calculate the final price of a product or service including the applicable Goods and Services Tax (GST).
            Understand the true cost of your purchases.
          </motion.p>
          <motion.div variants={itemVariants}>
            {openApplyModal && (
              <ApplyButton
                loanType="Financial Planning Inquiry"
                openApplyModal={openApplyModal}
                className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                           hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                           focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                Explore Financial Tools
              </ApplyButton>
            )}
          </motion.div>
        </motion.div>

        {/* Sales Tax Calculator Section */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 w-full border border-blue-100 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 to-blue-600 drop-shadow-md">
            <Calculator className="inline-block w-9 h-9 mr-3 text-cyan-500" /> GST (Sales Tax) Calculator
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Input Controls Section */}
            <div className="space-y-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <ShoppingBag className="w-6 h-6 mr-2 text-blue-600" /> Product Details
              </h3>

              {/* Product Price */}
              <motion.div variants={itemVariants}>
                <label htmlFor="productPrice" className="block text-lg font-semibold text-gray-700 mb-2">
                  Product Price (Base Amount): <span className="text-purple-600">{formatCurrency(productPrice)}</span>
                </label>
                <input
                  type="range"
                  id="productPrice"
                  min="100"
                  max="100000"
                  step="100"
                  value={productPrice}
                  onChange={handleProductPriceChange}
                  className="w-full h-2 bg-gradient-to-r from-purple-300 to-purple-500 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <input
                  type="text"
                  value={formatNumberWithCommas(productPrice)}
                  onChange={handleProductPriceChange}
                  onBlur={(e) => setProductPrice(Number(e.target.value.replace(/,/g, '')))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-purple-500 focus:border-purple-500 transition-all"
                  inputMode="numeric"
                />
              </motion.div>

              {/* Sales Tax Rate (GST Rate) */}
              <motion.div variants={itemVariants}>
                <label htmlFor="salesTaxRate" className="block text-lg font-semibold text-gray-700 mb-2">
                  Applicable GST Rate: <span className="text-teal-600">{salesTaxRate}%</span>
                </label>
                <input
                  type="range"
                  id="salesTaxRate"
                  min="0"
                  max="28" // Max GST rate in India
                  step="0.5"
                  value={salesTaxRate}
                  onChange={handleSalesTaxRateChange}
                  className="w-full h-2 bg-gradient-to-r from-teal-300 to-teal-500 rounded-lg appearance-none cursor-pointer accent-teal-600"
                />
                <input
                  type="number"
                  value={salesTaxRate}
                  onChange={handleSalesTaxRateChange}
                  onBlur={(e) => setSalesTaxRate(Number(e.target.value))}
                  className="mt-3 w-full p-3 border border-gray-300 rounded-lg text-gray-800 text-center text-lg focus:ring-teal-500 focus:border-teal-500 transition-all"
                  step="0.1"
                />
              </motion.div>
            </div>

            {/* Results Display Section */}
            <div className="p-6 bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-2xl shadow-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">Your Final Price</h3>
              <motion.div
                key={calculations.finalPrice} // Key for re-animation on value change
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', damping: 20, stiffness: 300 }}
                className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 drop-shadow-lg"
              >
                {formatCurrency(calculations.finalPrice)}
              </motion.div>
              <p className="text-xl text-blue-100 mb-8">Total Amount Payable</p>

              <div className="w-full space-y-4 text-lg">
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><IndianRupee className="w-5 h-5" /> Product Base Price</span>
                  <span className="font-bold text-white">{formatCurrency(productPrice)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Tag className="w-5 h-5" /> GST Amount</span>
                  <span className="font-bold text-white">{formatCurrency(calculations.salesTaxAmount)}</span>
                </motion.div>
                <motion.div variants={itemVariants} className="flex justify-between items-center bg-blue-700/30 p-3 rounded-lg">
                  <span className="font-medium flex items-center gap-2"><Percent className="w-5 h-5" /> GST Rate Applied</span>
                  <span className="font-bold text-white">{salesTaxRate}%</span>
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
              <Lightbulb className="w-8 h-8 mr-3 text-yellow-500" /> What is a Sales Tax Calculator (GST Calculator)?
            </h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 leading-relaxed">
              A Sales Tax Calculator, specifically a Goods and Services Tax (GST) Calculator in the Indian context, is a straightforward yet powerful tool designed to help consumers and businesses understand the total cost of a product or service. In India, GST is an indirect tax levied on most goods and services. This calculator allows you to input the base price of an item and the applicable GST rate to instantly determine the exact GST amount and the final price you will pay. It brings transparency to your purchases and aids in accurate financial planning, whether you're a consumer budgeting for expenses or a business pricing your offerings.
            </motion.p>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Calculator className="w-8 h-8 mr-3 text-green-500" /> How to Use Our GST (Sales Tax) Calculator
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Enter Product Price (Base Amount):</strong> Input the cost of the product or service before any taxes are added. This is often the price displayed before the final checkout.</motion.li>
              <motion.li variants={itemVariants}><strong>Set Applicable GST Rate:</strong> Choose the Goods and Services Tax (GST) rate that applies to your specific product or service. Common GST rates in India include 5%, 12%, 18%, and 28%.</motion.li>
              <motion.li variants={itemVariants}><strong>Review Instant Results:</strong> The calculator will immediately display the calculated GST Amount (the tax component) and the Final Price (the total amount you need to pay, including GST). This helps you understand the breakdown of the cost.</motion.li>
            </ol>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-8 h-8 mr-3 text-purple-500" /> Why Use a Sales Tax (GST) Calculator?
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              <motion.li variants={itemVariants}><strong>Price Transparency:</strong> Get a clear understanding of how much tax you are paying on any product or service, ensuring there are no hidden costs.</motion.li>
              <motion.li variants={itemVariants}><strong>Accurate Budgeting:</strong> Helps you budget effectively for your purchases by knowing the exact final amount you need to spend, including taxes.</motion.li>
              <motion.li variants={itemVariants}><strong>Business Pricing:</strong> For businesses, it's crucial for accurately setting selling prices, ensuring profitability while complying with tax regulations.</motion.li>
              <motion.li variants={itemVariants}><strong>Invoice Verification:</strong> Allows you to quickly verify the GST amount charged on an invoice, ensuring you are not overcharged or undercharged.</motion.li>
              <motion.li variants={itemVariants}><strong>Financial Literacy:</strong> Enhances your understanding of indirect taxes like GST and their impact on everyday transactions, making you a more informed consumer or business owner.</motion.li>
            </ul>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-8 h-8 mr-3 text-blue-500" /> Understanding Key GST (Sales Tax) Terms in India
            </h2>
            <div className="space-y-4 text-lg text-gray-700">
              <motion.p variants={itemVariants}><strong>Goods and Services Tax (GST):</strong> A consumption tax levied on the supply of goods and services in India. It is a multi-stage, destination-based tax system.</motion.p>
              <motion.p variants={itemVariants}><strong>Base Price (Taxable Value):</strong> The original price of a good or service before any taxes are applied. GST is calculated on this amount.</motion.p>
              <motion.p variants={itemVariants}><strong>GST Rate:</strong> The percentage at which GST is levied on specific goods or services, determined by the government (e.g., 5%, 12%, 18%, 28%).</motion.p>
              <motion.p variants={itemVariants}><strong>GST Amount:</strong> The actual tax amount calculated by applying the GST rate to the base price.</motion.p>
              <motion.p variants={itemVariants}><strong>Final Price (MRP):</strong> The Maximum Retail Price, which is the total price including all taxes, that a consumer pays for a product or service.</motion.p>
              <motion.p variants={itemVariants}><strong>CGST (Central Goods and Services Tax):</strong> The portion of GST collected by the Central Government on intra-state (within a state) supplies.</motion.p>
              <motion.p variants={itemVariants}><strong>SGST (State Goods and Services Tax):</strong> The portion of GST collected by the State Government on intra-state supplies.</motion.p>
              <motion.p variants={itemVariants}><strong>UGST (Union Territory Goods and Services Tax):</strong> Equivalent to SGST, but for Union Territories without a legislature.</motion.p>
              <motion.p variants={itemVariants}><strong>IGST (Integrated Goods and Services Tax):</strong> The GST levied on inter-state (between states) supplies and on imports. It is collected by the Central Government.</motion.p>
              <motion.p variants={itemVariants}><strong>Input Tax Credit (ITC):</strong> A mechanism that allows businesses to reduce their tax liability by claiming credit for the GST paid on inputs (purchases) used in their business operations.</motion.p>
            </div>
          </motion.section>

          <motion.section variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-8 h-8 mr-3 text-orange-500" /> Tips for Understanding GST
            </h2>
            <ul className="list-disc list-inside space-y-3 text-lg text-gray-700">
              {tipsForUnderstandingGST.map((tip, index) => (
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
              <Scale className="w-8 h-8 mr-3 text-teal-500" /> Why Choose BanksCart for Your Financial Needs?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyUseBanksCart.map((reason, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center text-center p-6 rounded-xl shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100"
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
            className="text-center mt-12 p-8 bg-gradient-to-r from-blue-600 to-cyan-700 rounded-2xl shadow-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white mb-4 drop-shadow-lg"
              variants={itemVariants}
            >
              Need More Financial Clarity?
            </motion.h2>
            <motion.p
              className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              BanksCart provides a suite of financial tools and expert advice to help you
              manage your money, understand taxes, and plan for a secure future.
            </motion.p>
            <motion.div variants={itemVariants}>
              {openApplyModal ? (
                <ApplyButton
                  loanType="General Financial Inquiry"
                  openApplyModal={openApplyModal}
                  className="bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg
                             hover:bg-gray-100 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                             focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
                >
                  Explore All Financial Tools
                </ApplyButton>
              ) : (
                <button className="bg-gray-400 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-not-allowed" disabled>Explore All Financial Tools</button>
              )}
            </motion.div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default SalesTaxCalculatorPage;
