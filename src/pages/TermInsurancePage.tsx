import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Helper Data (Could be fetched from an API in a real app) ---
const NAV_LINKS = [
  { name: 'Features', href: '#features' },
  { name: 'Benefits', href: '#benefits' },
  { name: 'How It Works', href: '#how-it-works' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact Us', href: '#contact' },
];

const FEATURES_DATA = [
  {
    icon: 'ShieldCheck', // Lucide icon name
    title: 'Comprehensive Coverage Options',
    description: 'Basic Term Life, TROP, Critical Illness, Accidental Death, Disability, Terminal Illness.',
  },
  {
    icon: 'Wallet', // Lucide icon name
    title: 'Flexible Premium Payment',
    description: 'Monthly, Quarterly, Half-yearly, Annual, Limited Pay, Single Premium with online discounts.',
  },
  {
    icon: 'Sparkles', // Lucide icon name
    title: 'Tax Benefits',
    description: 'Save tax under Section 80C and get tax-free death benefits under Section 10(10D).',
  },
  {
    icon: 'Handshake', // Lucide icon name
    title: 'Seamless Claim Support',
    description: 'Dedicated assistance for a 100% smooth and hassle-free claim settlement process.',
  },
];

const FINANCIAL_BENEFITS_DATA = [
  {
    icon: 'Users',
    title: 'Income Replacement for Family',
    description: 'Ensures your family maintains their lifestyle even in your absence.',
  },
  {
    icon: 'Banknote',
    title: 'Debt & Loan Coverage',
    description: 'Protects your family from outstanding debts like home loans, car loans, etc.',
  },
  {
    icon: 'GraduationCap',
    title: "Children's Education Funding",
    description: 'Guarantees funds for your children\'s higher education, no matter what.',
  },
  {
    icon: 'LineChart',
    title: "Spouse's Financial Independence",
    description: 'Provides a financial cushion for your spouse to manage expenses and investments.',
  },
  {
    icon: 'Home',
    title: 'Asset Protection',
    description: 'Safeguards your assets from being sold off to cover liabilities.',
  },
  {
    icon: 'Coffin',
    title: 'Funeral & Final Expense Coverage',
    description: 'Covers immediate post-demise expenses, easing the burden on your family.',
  },
];

const TAX_BENEFITS_DATA = [
  {
    icon: 'IndianRupee',
    title: 'Section 80C Deduction',
    description: 'Save up to ₹1.5 lakh on your taxable income by investing in term insurance premiums.',
  },
  {
    icon: 'CheckCircle',
    title: 'Tax-free Death Benefit (Section 10(10D))',
    description: 'The lump sum received by your nominee is completely tax-free.',
  },
];

const COMPARISON_PLANS_DATA = [
  {
    name: 'BanksCart Secure Life',
    coverage: '₹1 Crore', // Use string for display
    coverageValue: 10000000, // Numeric value for filtering/sorting
    premiumRange: '₹450 - ₹1200',
    minPremium: 450, // Numeric value for filtering
    maxPremium: 1200,
    policyTerm: '10-40 years',
    minPolicyTerm: 10,
    maxPolicyTerm: 40,
    riders: 'ADR, CIR, TPD',
    claimRatio: '99.2%',
    claimRatioValue: 99.2,
    paymentTerms: 'Regular Pay',
  },
  {
    name: 'BanksCart FlexiProtect',
    coverage: '₹2 Crore',
    coverageValue: 20000000,
    premiumRange: '₹800 - ₹2500',
    minPremium: 800,
    maxPremium: 2500,
    policyTerm: '15-35 years',
    minPolicyTerm: 15,
    maxPolicyTerm: 35,
    riders: 'ADR, CIR, TPD, TROP',
    claimRatio: '98.5%',
    claimRatioValue: 98.5,
    paymentTerms: 'Regular Pay, Limited Pay (10, 15 years)',
  },
  {
    name: 'BanksCart Elite Cover',
    coverage: '₹5 Crore',
    coverageValue: 50000000,
    premiumRange: '₹1800 - ₹5000',
    minPremium: 1800,
    maxPremium: 5000,
    policyTerm: '20-30 years',
    minPolicyTerm: 20,
    maxPolicyTerm: 30,
    riders: 'All Available',
    claimRatio: '99.0%',
    claimRatioValue: 99.0,
    paymentTerms: 'Regular Pay, Single Pay',
  },
];

// New Data for Banks Comparison Table
const BANKS_COMPARISON_DATA = [
  {
    name: 'State Bank of India',
    homeLoanRate: '8.50%',
    personalLoanRate: '10.25%',
    termInsurancePartners: 'SBI Life',
    digitalBankingRating: 4.2,
    customerServiceRating: 3.8,
    minBalance: '₹3,000',
    keyFeatures: 'Largest network, Government bank',
  },
  {
    name: 'HDFC Bank',
    homeLoanRate: '8.70%',
    personalLoanRate: '10.75%',
    termInsurancePartners: 'HDFC Life',
    digitalBankingRating: 4.7,
    customerServiceRating: 4.5,
    minBalance: '₹10,000',
    keyFeatures: 'Excellent digital services, Private sector leader',
  },
  {
    name: 'ICICI Bank',
    homeLoanRate: '8.65%',
    personalLoanRate: '10.50%',
    termInsurancePartners: 'ICICI Prudential Life',
    digitalBankingRating: 4.5,
    customerServiceRating: 4.3,
    minBalance: '₹5,000',
    keyFeatures: 'Strong online presence, Wide product range',
  },
  {
    name: 'Axis Bank',
    homeLoanRate: '8.80%',
    personalLoanRate: '11.00%',
    termInsurancePartners: 'Max Life, Bajaj Allianz Life',
    digitalBankingRating: 4.3,
    customerServiceRating: 4.0,
    minBalance: '₹12,000',
    keyFeatures: 'Good customer support, Diverse offerings',
  },
  {
    name: 'Kotak Mahindra Bank',
    homeLoanRate: '8.90%',
    personalLoanRate: '11.25%',
    termInsurancePartners: 'Kotak Life',
    digitalBankingRating: 4.6,
    customerServiceRating: 4.4,
    minBalance: '₹10,000',
    keyFeatures: 'Premium banking experience, High interest savings',
  },
];

const HOW_IT_WORKS_STEPS = [
  {
    stepNum: 1,
    title: 'Calculate Your Premium Online',
    description: 'Use our interactive calculator to find the ideal coverage and premium for your needs.',
  },
  {
    stepNum: 2,
    title: 'Fill Application Form with Accurate Details',
    description: 'Provide necessary personal and financial information securely online.',
  },
  {
    stepNum: 3,
    title: 'Complete Medical Tests (if required)',
    description: 'Some policies may require a basic medical check-up; we\'ll guide you through it.',
  },
  {
    stepNum: 4,
    title: 'Review and Submit Documents',
    description: 'Upload required KYC and income documents easily through our secure portal.',
  },
  {
    stepNum: 5,
    title: 'Pay Premium and Get Policy',
    description: 'Make your payment online and receive your policy document digitally.',
  },
  {
    stepNum: 6,
    title: 'Enjoy Comprehensive Coverage',
    description: 'Rest easy knowing your family\'s financial future is secured with BanksCart.',
  },
];

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Priya Sharma',
    location: 'Bengaluru',
    photo: 'https://placehold.co/80x80/60A5FA/FFFFFF/png?text=PS', // Tailwind primary-400
    rating: 5,
    quote: "BanksCart made buying term insurance incredibly easy. The online process was smooth, and their claim support is truly 100%. Highly recommended!",
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    location: 'Mumbai',
    photo: 'https://placehold.co/80x80/3B82F6/FFFFFF/png?text=RK', // Tailwind primary-500
    rating: 4.5,
    quote: "I compared multiple plans on BanksCart and found the best one for my family. The premium calculator was spot on, and the guidance from their advisors was excellent.",
  },
  {
    id: 3,
    name: 'Anjali Singh',
    location: 'Delhi',
    photo: 'https://placehold.co/80x80/2563EB/FFFFFF/png?text=AS', // Tailwind primary-600
    rating: 5,
    quote: "Securing my children's education was my priority. BanksCart offered a tailored plan with critical illness cover that fit my budget perfectly.",
  },
];

const FAQ_DATA = [
  {
    question: 'What is term insurance?',
    answer: 'Term insurance is a type of life insurance that provides coverage for a specific period (the "term"). If the insured person dies during the term, the death benefit is paid to the nominee. It is the purest form of life insurance, designed solely for financial protection.',
  },
  {
    question: 'How much coverage do I need?',
    answer: 'The ideal coverage depends on various factors like your income, dependents, existing loans, future financial goals (e.g., child\'s education, marriage), and inflation. A common rule of thumb is 10-15 times your annual income, but it\'s best to use our calculator or consult an expert.',
  },
  {
    question: 'What factors affect premium?',
    answer: 'Premiums are influenced by age, gender, health (medical history), smoking habits, lifestyle, policy term, sum assured, and selected riders. Generally, the younger and healthier you are, the lower your premium.',
  },
  {
    question: 'How to calculate the right sum assured?',
    answer: 'Consider your annual expenses, outstanding debts, future financial needs of your dependents (education, marriage), and inflation to determine an adequate sum assured. Our calculator and experts can help.',
  },
  {
    question: 'What are riders and their benefits?',
    answer: 'Riders are optional add-ons to your term insurance policy that provide additional coverage for specific events, such as accidental death, critical illness, or disability. They enhance your policy\'s protection.',
  },
  {
    question: 'What is covered and not covered?',
    answer: 'Term insurance primarily covers death due to natural causes, accidents, or illnesses. It typically does not cover death due to suicide within the first year of policy issuance, criminal activities, or pre-existing conditions not disclosed.',
  },
  {
    question: 'How to file a claim?',
    answer: 'To file a claim, your nominee needs to inform the insurer, submit the death certificate, policy document, and other required KYC documents. BanksCart provides dedicated claim settlement support to guide your nominee through the process.',
  },
  {
    question: 'Tax implications and benefits',
    answer: 'Premiums paid for term insurance are eligible for deduction under Section 80C of the Income Tax Act, up to ₹1.5 lakh. The death benefit received by the nominee is generally tax-free under Section 10(10D).',
  },
];

// --- Common Components ---

// Icon component using Lucide React (will be rendered via `createIcons()`)
const Icon = ({ name, className = 'w-6 h-6' }) => (
  <i data-lucide={name} className={className}></i>
);

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="flex flex-col items-center justify-center py-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
    <p className="mt-2 text-gray-600 text-sm">Calculating...</p>
  </div>
);

// Custom Alert/Message Box Component (replaces browser's alert)
const MessageBox = ({ message, type, onClose }) => {
  const bgColor = type === 'error' ? 'bg-red-100 border-red-400 text-red-700' : type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-blue-100 border-blue-400 text-blue-700';
  const icon = type === 'error' ? 'XCircle' : type === 'success' ? 'CheckCircle' : 'Info';

  // Allows closing with Escape key
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 p-4`}
      onKeyDown={handleKeyDown}
      onClick={onClose} // Close on overlay click
      tabIndex={-1} // Make div focusable
      role="dialog"
      aria-modal="true"
    >
      <div className={`relative bg-white rounded-lg shadow-xl p-6 max-w-sm w-full border ${bgColor}`} onClick={e => e.stopPropagation()}> {/* Prevent click from bubbling to overlay */}
        <div className="flex items-center mb-4">
          <Icon name={icon} className={`w-6 h-6 mr-3 ${type === 'error' ? 'text-red-500' : type === 'success' ? 'text-green-500' : 'text-blue-500'}`} />
          <div className="font-semibold text-lg">{message}</div> {/* Use div for message to allow ReactNode */}
        </div>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
          aria-label="Close message"
          tabIndex={0}
        >
          <Icon name="X" className="w-6 h-6" /> {/* Increased size */}
        </button>
      </div>
    </div>
  );
};


// Trust Badges Component
const TrustBadges = () => {
  return (
    <section className="py-12 bg-primary-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 bg-white rounded-xl shadow-md transition-transform transform hover:scale-105">
            <h3 className="text-3xl font-extrabold text-primary-600">2 Lakh+</h3>
            <p className="mt-2 text-gray-600">Families Protected</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md transition-transform transform hover:scale-105">
            <h3 className="text-3xl font-extrabold text-primary-600">₹5,000 Cr+</h3>
            <p className="mt-2 text-gray-600">Life Cover Assured</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md transition-transform transform hover:scale-105">
            <h3 className="text-3xl font-extrabold text-primary-600">99.2%</h3>
            <p className="mt-2 text-gray-600">Claim Settlement Ratio</p>
          </div>
          <div className="p-6 bg-white rounded-xl shadow-md transition-transform transform hover:scale-105">
            <h3 className="text-3xl font-extrabold text-primary-600">4.9/5</h3>
            <p className="mt-2 text-gray-600">Customer Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Hero Section Components ---
const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20 md:py-32 overflow-hidden">
      {/* Abstract shapes for background dynamics */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute w-64 h-64 bg-white opacity-10 rounded-full -top-16 -left-16 animate-pulse-slow"></div>
        <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full -bottom-32 -right-32 animate-pulse-slow delay-200"></div>
        <div className="absolute w-48 h-48 bg-white opacity-10 rounded-full top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-pulse-slow delay-400"></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 animate-fadeInUp">
          Secure Your Family's Future with <span className="text-primary-200">BanksCart Term Insurance</span>
        </h1>
        <p className="text-lg md:text-xl subheadline mb-8 opacity-90 animate-fadeInUp delay-200">
          ₹1 Crore Life Cover Starting from ₹450/month with 100% Claim Settlement Support
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fadeInUp delay-400">
          <a href="#premium-calculator" className="btn-primary-large group">
            Get Your Quote in 2 Minutes
            <Icon name="ArrowRight" className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
          <a href="#comparison-table" className="btn-secondary-large group">
            Compare Plans
            <Icon name="ExternalLink" className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

const PremiumCalculator = () => {
  const [userInputs, setUserInputs] = useState({
    age: '',
    gender: '',
    income: '',
    coverage: '',
    smoker: false,
    term: ''
  });
  const [premium, setPremium] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [messageBox, setMessageBox] = useState(null); // For custom message box

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserInputs(prevInputs => ({
      ...prevInputs,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing again
    setError(null);
  };

  const validateInputs = () => {
    const { age, gender, income, coverage, term } = userInputs;
    if (!age || !gender || !income || !coverage || !term) {
      setMessageBox({ message: "Please fill in all required fields to calculate your premium.", type: "error" });
      return false;
    }
    if (parseInt(age) < 18 || parseInt(age) > 65) {
      setMessageBox({ message: "Age must be between 18 and 65.", type: "error" });
      return false;
    }
    if (parseInt(term) < 10 || parseInt(term) > 40) {
      setMessageBox({ message: "Policy term must be between 10 and 40 years.", type: "error" });
      return false;
    }
    return true;
  };

  const calculatePremium = async () => {
    if (!validateInputs()) {
      return;
    }

    setLoading(true);
    setError(null);
    setPremium(null); // Clear previous premium
    try {
      // Simulate API call to backend for real-time calculation
      const response = await new Promise(resolve => setTimeout(() => {
        let calculatedPremium = 0;
        const baseCostPerLakh = 50; // Base cost per lakh coverage
        const ageFactor = 1.5;      // Factor for age
        const smokerAddon = 0.7;    // Additional cost for smokers
        const termFactor = 0.1;     // Factor for policy term

        const age = parseInt(userInputs.age);
        const coverage = parseInt(userInputs.coverage);
        const term = parseInt(userInputs.term);

        if (age && coverage && term) {
          calculatedPremium = (coverage / 100000) * baseCostPerLakh;
          calculatedPremium += (age * ageFactor);
          calculatedPremium += (term * termFactor); // Add term into calculation
          if (userInputs.smoker) {
            calculatedPremium += (coverage / 100000) * smokerAddon;
          }
          // Adjust based on gender (e.g., females often have lower premiums)
          if (userInputs.gender === 'female') {
            calculatedPremium *= 0.9; // 10% discount for females
          }
        }
        resolve({ success: true, premium: Math.max(450, calculatedPremium) }); // Minimum premium of 450
      }, 1200)); // Increased timeout for better loading visualization

      if (response.success) {
        setPremium(response.premium);
      } else {
        setError("Could not calculate premium. Please try again.");
      }
    } catch (err) {
      setError("An error occurred while calculating premium.");
      console.error("Premium calculation API error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Recalculate premium whenever inputs change and all are filled
  useEffect(() => {
    if (userInputs.age && userInputs.gender && userInputs.income && userInputs.coverage && userInputs.term) {
      calculatePremium();
    } else {
      setPremium(null);
    }
  }, [userInputs.age, userInputs.gender, userInputs.income, userInputs.coverage, userInputs.smoker, userInputs.term]);


  return (
    <section id="premium-calculator" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-4xl mx-auto border border-gray-200">
          <h3 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Get Your Personalized Term Insurance Quote</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="flex flex-col">
              <label htmlFor="age" className="text-sm font-medium text-gray-700 mb-1">Your Age:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={userInputs.age}
                onChange={handleChange}
                min="18"
                max="65"
                placeholder="e.g., 30"
                className="form-input"
                aria-label="Your Age"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="gender" className="text-sm font-medium text-gray-700 mb-1">Gender:</label>
              <select id="gender" name="gender" value={userInputs.gender} onChange={handleChange} className="form-select" aria-label="Gender" required>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="income" className="text-sm font-medium text-gray-700 mb-1">Annual Income:</label>
              <select id="income" name="income" value={userInputs.income} onChange={handleChange} className="form-select" aria-label="Annual Income" required>
                <option value="">Select</option>
                <option value="below5l">Below ₹5 Lakh</option>
                <option value="5-10l">₹5 - ₹10 Lakh</option>
                <option value="10-20l">₹10 - ₹20 Lakh</option>
                <option value="above20l">Above ₹20 Lakh</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="coverage" className="text-sm font-medium text-gray-700 mb-1">Coverage Amount (₹):</label>
              <select id="coverage" name="coverage" value={userInputs.coverage} onChange={handleChange} className="form-select" aria-label="Coverage Amount" required>
                <option value="">Select</option>
                <option value="2500000">₹25 Lakh</option>
                <option value="5000000">₹50 Lakh</option>
                <option value="10000000">₹1 Crore</option>
                <option value="20000000">₹2 Crore</option>
                <option value="50000000">₹5 Crore</option>
                <option value="100000000">₹10 Crore</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="term" className="text-sm font-medium text-gray-700 mb-1">Policy Term (Years):</label>
              <input
                type="number"
                id="term"
                name="term"
                value={userInputs.term}
                onChange={handleChange}
                min="10"
                max="40"
                placeholder="e.g., 30"
                className="form-input"
                aria-label="Policy Term"
                required
              />
            </div>
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                id="smoker"
                name="smoker"
                checked={userInputs.smoker}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-primary-600 rounded focus:ring-primary-500"
                aria-label="Are you a smoker?"
              />
              <label htmlFor="smoker" className="ml-2 text-sm font-medium text-gray-700">Are you a smoker?</label>
            </div>
          </div>

          <div className="premium-result-area text-center pt-8 border-t border-gray-200">
            {loading && <LoadingSpinner />}
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            {premium !== null && !loading && !error && (
              <div className="inline-block bg-primary-50 px-6 py-4 rounded-xl shadow-inner animate-pulseOnce">
                <h4 className="text-xl font-semibold text-gray-700 mb-2">Estimated Monthly Premium:</h4>
                <p className="text-4xl font-extrabold text-primary-700">
                  ₹{premium.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-2">*Premium is indicative and may vary based on underwriting.</p>
              </div>
            )}
            <button
              onClick={calculatePremium}
              disabled={loading || !userInputs.age || !userInputs.gender || !userInputs.income || !userInputs.coverage || !userInputs.term}
              className="btn-primary-large mt-8 w-full sm:w-auto"
            >
              Calculate My Premium
            </button>
          </div>
        </div>
      </div>
      {messageBox && (
        <MessageBox
          message={messageBox.message}
          type={messageBox.type}
          onClose={() => setMessageBox(null)}
        />
      )}
    </section>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="mb-4 text-primary-500">
        <Icon name={icon} className="w-12 h-12" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

// Feature Grid Component
const FeatureGrid = ({ features }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Key Features of BanksCart Term Insurance</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
        ))}
      </div>
    </div>
  );
};

// Benefit Card Component
const BenefitCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="mb-4 text-secondary-500">
        <Icon name={icon} className="w-12 h-12" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

// Benefits List Component
const BenefitsList = ({ financialBenefits, taxBenefits }) => {
  return (
    <section id="benefits" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Key Benefits of BanksCart Term Insurance</h2>

        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">Financial Security Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {financialBenefits.map((benefit, index) => (
            <BenefitCard key={`fin-${index}`} icon={benefit.icon} title={benefit.title} description={benefit.description} />
          ))}
        </div>

        <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">Tax Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {taxBenefits.map((benefit, index) => (
            <BenefitCard key={`tax-${index}`} icon={benefit.icon} title={benefit.title} description={benefit.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Insurance Comparison Table Component
const ComparisonTable = ({ plans }) => {
  const tableRef = useRef(null);
  const [messageBox, setMessageBox] = useState(null);
  const [filters, setFilters] = useState({
    minCoverage: '',
    maxPremium: '',
    policyTerm: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredPlans = plans.filter(plan => {
    const minCoverage = filters.minCoverage ? parseInt(filters.minCoverage) : 0;
    const maxPremium = filters.maxPremium ? parseInt(filters.maxPremium) : Infinity;
    const policyTerm = filters.policyTerm ? parseInt(filters.policyTerm) : 0;

    return (
      plan.coverageValue >= minCoverage &&
      plan.minPremium <= maxPremium &&
      plan.maxPremium >= maxPremium && // Check if max premium of plan is greater than or equal to filter
      (policyTerm === 0 || (plan.minPolicyTerm <= policyTerm && plan.maxPolicyTerm >= policyTerm))
    );
  });

  const handleExportPdf = () => {
    if (tableRef.current && window.html2pdf) {
      setMessageBox({ message: "Generating PDF...", type: "info" });
      window.html2pdf().from(tableRef.current).save('BanksCart_Term_Insurance_Comparison.pdf')
        .then(() => {
          setMessageBox({ message: "PDF generated successfully!", type: "success" });
        })
        .catch(error => {
          console.error("PDF generation failed:", error);
          setMessageBox({ message: "Failed to generate PDF.", type: "error" });
        });
    } else {
      setMessageBox({ message: "PDF generation library not loaded. Please try again.", type: "error" });
    }
  };

  const handleShareComparison = async () => {
    const shareData = {
      title: 'BanksCart Term Insurance Comparison',
      text: 'Check out these term insurance plans on BanksCart!',
      url: window.location.href, // Shares the current page URL
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setMessageBox({ message: "Comparison shared successfully!", type: "success" });
      } else {
        // Fallback for browsers that don't support Web Share API
        await navigator.clipboard.writeText(shareData.url);
        setMessageBox({ message: "Link copied to clipboard! You can paste it to share.", type: "info" });
      }
    } catch (err) {
      console.error('Error sharing:', err);
      setMessageBox({ message: "Failed to share comparison.", type: "error" });
    }
  };

  return (
    <section id="comparison-table" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Compare Term Insurance Plans</h2>
        <div className="comparison-filters bg-gray-100 p-6 rounded-xl shadow-inner mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="filterCoverage" className="block text-sm font-medium text-gray-700 mb-1">Min. Coverage (₹):</label>
            <select
              id="filterCoverage"
              name="minCoverage"
              value={filters.minCoverage}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="">All</option>
              <option value="2500000">₹25 Lakh</option>
              <option value="5000000">₹50 Lakh</option>
              <option value="10000000">₹1 Crore</option>
              <option value="20000000">₹2 Crore</option>
              <option value="50000000">₹5 Crore</option>
            </select>
          </div>
          <div>
            <label htmlFor="filterPremium" className="block text-sm font-medium text-gray-700 mb-1">Max. Monthly Premium (₹):</label>
            <select
              id="filterPremium"
              name="maxPremium"
              value={filters.maxPremium}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="">All</option>
              <option value="500">₹500</option>
              <option value="1000">₹1000</option>
              <option value="2000">₹2000</option>
              <option value="3000">₹3000</option>
              <option value="5000">₹5000</option>
            </select>
          </div>
          <div>
            <label htmlFor="filterTerm" className="block text-sm font-medium text-gray-700 mb-1">Policy Term (Years):</label>
            <select
              id="filterTerm"
              name="policyTerm"
              value={filters.policyTerm}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="">All</option>
              <option value="10">10 Years</option>
              <option value="20">20 Years</option>
              <option value="30">30 Years</option>
              <option value="40">40 Years</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200" ref={tableRef}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-tl-xl">Plan Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Coverage Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Monthly Premium Range (approx.)</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Policy Term</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Key Riders</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Claim Settlement Ratio</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-tr-xl">Payment Terms</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPlans.length > 0 ? (
                filteredPlans.map((plan, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{plan.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plan.coverage}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plan.premiumRange}/month</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plan.policyTerm}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plan.riders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plan.claimRatio}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{plan.paymentTerms}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No plans match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <button onClick={handleExportPdf} className="btn-secondary-large group">
            Export as PDF
            <Icon name="Download" className="ml-2 w-5 h-5 transition-transform group-hover:translate-y-1" />
          </button>
          <button onClick={handleShareComparison} className="btn-secondary-large group">
            Share Comparison
            <Icon name="Share2" className="ml-2 w-5 h-5 transition-transform group-hover:translate-y-1" />
          </button>
        </div>
      </div>
      {messageBox && (
        <MessageBox
          message={messageBox.message}
          type={messageBox.type}
          onClose={() => setMessageBox(null)}
        />
      )}
    </section>
  );
};

// New Banks Comparison Table Component
const BanksComparisonTable = ({ banks }) => {
  const tableRef = useRef(null);
  const [messageBox, setMessageBox] = useState(null);
  const [filters, setFilters] = useState({
    minHomeLoanRate: '',
    minDigitalRating: '',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredBanks = banks.filter(bank => {
    const minHomeLoanRate = filters.minHomeLoanRate ? parseFloat(filters.minHomeLoanRate) : 0;
    const minDigitalRating = filters.minDigitalRating ? parseFloat(filters.minDigitalRating) : 0;

    const bankHomeLoanRate = parseFloat(bank.homeLoanRate.replace('%', ''));
    const bankDigitalRating = bank.digitalBankingRating;

    return (
      bankHomeLoanRate >= minHomeLoanRate &&
      bankDigitalRating >= minDigitalRating
    );
  });

  const handleExportPdf = () => {
    if (tableRef.current && window.html2pdf) {
      setMessageBox({ message: "Generating PDF...", type: "info" });
      window.html2pdf().from(tableRef.current).save('BanksCart_Banks_Comparison.pdf')
        .then(() => {
          setMessageBox({ message: "PDF generated successfully!", type: "success" });
        })
        .catch(error => {
          console.error("PDF generation failed:", error);
          setMessageBox({ message: "Failed to generate PDF.", type: "error" });
        });
    } else {
      setMessageBox({ message: "PDF generation library not loaded. Please try again.", type: "error" });
    }
  };

  const handleShareComparison = async () => {
    const shareData = {
      title: 'BanksCart Banks Comparison',
      text: 'Check out this comparison of top banks on BanksCart!',
      url: window.location.href, // Shares the current page URL
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setMessageBox({ message: "Comparison shared successfully!", type: "success" });
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setMessageBox({ message: "Link copied to clipboard! You can paste it to share.", type: "info" });
      }
    } catch (err) {
      console.error('Error sharing:', err);
      setMessageBox({ message: "Failed to share comparison.", type: "error" });
    }
  };

  return (
    <section id="banks-comparison-table" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Compare Top Banks & Their Offerings</h2>
        <div className="comparison-filters bg-gray-100 p-6 rounded-xl shadow-inner mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="filterHomeLoanRate" className="block text-sm font-medium text-gray-700 mb-1">Min. Home Loan Rate (%):</label>
            <select
              id="filterHomeLoanRate"
              name="minHomeLoanRate"
              value={filters.minHomeLoanRate}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="">All</option>
              <option value="8.5">8.5%</option>
              <option value="8.7">8.7%</option>
              <option value="8.9">8.9%</option>
            </select>
          </div>
          <div>
            <label htmlFor="filterDigitalRating" className="block text-sm font-medium text-gray-700 mb-1">Min. Digital Banking Rating:</label>
            <select
              id="filterDigitalRating"
              name="minDigitalRating"
              value={filters.minDigitalRating}
              onChange={handleFilterChange}
              className="form-select"
            >
              <option value="">All</option>
              <option value="3.5">3.5 Stars</option>
              <option value="4.0">4.0 Stars</option>
              <option value="4.5">4.5 Stars</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200" ref={tableRef}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-tl-xl">Bank Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Home Loan Rate</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Personal Loan Rate</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Term Insurance Partners</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Digital Banking Rating</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Customer Service Rating</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider rounded-tr-xl">Key Features</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBanks.length > 0 ? (
                filteredBanks.map((bank, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{bank.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{bank.homeLoanRate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{bank.personalLoanRate}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{bank.termInsurancePartners}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{bank.digitalBankingRating} <Icon name="Star" className="w-4 h-4 inline-block text-yellow-400 fill-yellow-400" /></td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{bank.customerServiceRating} <Icon name="Star" className="w-4 h-4 inline-block text-yellow-400 fill-yellow-400" /></td>
                    <td className="px-6 py-4 text-sm text-gray-700">{bank.keyFeatures}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No banks match your filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <button onClick={handleExportPdf} className="btn-secondary-large group">
            Export as PDF
            <Icon name="Download" className="ml-2 w-5 h-5 transition-transform group-hover:translate-y-1" />
          </button>
          <button onClick={handleShareComparison} className="btn-secondary-large group">
            Share Comparison
            <Icon name="Share2" className="ml-2 w-5 h-5 transition-transform group-hover:translate-y-1" />
          </button>
        </div>
      </div>
      {messageBox && (
        <MessageBox
          message={messageBox.message}
          type={messageBox.type}
          onClose={() => setMessageBox(null)}
        />
      )}
    </section>
  );
};


// Process Step Component
const ProcessStep = ({ stepNum, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 text-2xl font-bold mb-4 border-4 border-primary-200">
        {stepNum}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

// How It Works Section
const HowItWorks = ({ steps }) => {
  return (
    <section id="how-it-works" className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">How BanksCart Term Insurance Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              stepNum={step.stepNum}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ name, location, photo, rating, quote }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center mb-6">
        <img src={photo} alt={name} className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-primary-300 shadow-sm" onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/80x80/6B7280/FFFFFF?text=${name.split(' ').map(n => n[0]).join('')}` }} />
        <div>
          <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{location}</p>
          <div className="flex items-center mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon
                key={i}
                name="Star"
                className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            {rating % 1 !== 0 && (
              <Icon name="StarHalf" className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            )}
          </div>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed italic">"{quote}"</p>
    </div>
  );
};

// Testimonials Section
const Testimonials = ({ testimonialsData }) => {
  return (
    <section id="testimonials" className="py-16 bg-primary-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsData.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              location={testimonial.location}
              photo={testimonial.photo}
              rating={testimonial.rating}
              quote={testimonial.quote}
            />
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            Read more customer reviews on{' '}
            <a href="#reviews" className="text-primary-600 hover:underline font-medium">Google Reviews</a> and{' '}
            <a href="#reviews" className="text-primary-600 hover:underline font-medium">Trustpilot</a>
          </p>
        </div>
      </div>
    </section>
  );
};

// FAQ Item Component (Accordion)
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen ? `${contentRef.current.scrollHeight}px` : '0px';
    }
  }, [isOpen]);

  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 text-left text-lg font-medium text-gray-800 hover:text-primary-600 transition-colors duration-200 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${question.replace(/\s/g, '-')}`}
      >
        {question}
        <Icon name={isOpen ? 'Minus' : 'Plus'} className="w-5 h-5 text-gray-500 transition-transform duration-300 transform" />
      </button>
      <div
        ref={contentRef}
        id={`faq-answer-${question.replace(/\s/g, '-')}`}
        className="overflow-hidden transition-all duration-300 ease-in-out text-gray-600 pb-4"
        style={{ maxHeight: 0 }}
      >
        <p className="pr-4">{answer}</p>
      </div>
    </div>
  );
};

// FAQ Section
const FAQSection = ({ faqData }) => {
  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Call To Action Component
const CallToAction = ({ openApplyModal, navigate }) => {
  const [messageBox, setMessageBox] = useState(null);

  const handleApplyNowClick = () => {
    // Prioritize navigation if available, otherwise use modal
    if (navigate) {
      navigate('/loan-apply', { state: { loanType: 'Term Insurance' } });
      return;
    }

    // Fallback to modal if navigate is not available
    if (openApplyModal) {
      openApplyModal('Term Insurance');
    } else {
      setMessageBox({
        message: "The 'Apply Now' feature is currently unavailable. Please contact support.",
        type: "error"
      });
    }
  };

  const handleTalkToExpertClick = () => {
    setMessageBox({
      message: (
        <>
          <p className="mb-2">Our experts are ready to assist you!</p>
          <p><strong>Phone:</strong> +91 968 685 9296</p>
          <p><strong>Email:</strong> support@bankscart.com</p>
          <p className="text-sm mt-2 text-gray-500">Available Mon-Fri, 9 AM - 6 PM IST</p>
        </>
      ),
      type: "info"
    });
  };

  return (
    <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20 text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Ready to Secure Your Family's Future?</h2>
        <p className="text-lg md:text-xl opacity-90 mb-10">Get a personalized quote in minutes or talk to our experts for guidance.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button onClick={handleApplyNowClick} className="btn-white-outline-large group">
            Apply Now
            <Icon name="Send" className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button onClick={handleTalkToExpertClick} className="btn-white-outline-large group">
            Talk to an Expert
            <Icon name="Phone" className="ml-2 w-5 h-5 transition-transform group-hover:rotate-6" />
          </button>
        </div>
      </div>
      {messageBox && (
        <MessageBox
          message={messageBox.message}
          type={messageBox.type}
          onClose={() => setMessageBox(null)}
        />
      )}
    </section>
  );
};

interface TermInsurancePageProps {
  openApplyModal?: (loanType?: string) => void;
}

// --- Main Term Insurance Page Component (Everything consolidated here) ---
const TermInsurancePage: React.FC<TermInsurancePageProps> = ({ openApplyModal }) => {
  const navigate = useNavigate();

  // Load Tailwind CSS, Lucide React Icons, and html2pdf from CDN
  const CDN_IMPORTS_AND_CONFIG = `
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            fontFamily: {
              inter: ['Inter', 'sans-serif'],
            },
            colors: {
              primary: {
                50: '#eff6ff',
                100: '#dbeafe',
                200: '#bfdbfe',
                300: '#93c5fd',
                400: '#60a5fa',
                500: '#3b82f6', // Base blue
                600: '#2563eb', // Darker blue for hover
                700: '#1d4ed8',
                800: '#1e40af',
                900: '#1e3a8a',
              },
              secondary: {
                50: '#eef2ff',
                100: '#e0e7ff',
                200: '#c7d2fe',
                300: '#a5b4fc',
                400: '#818cf8',
                500: '#6366f1', // Base indigo
                600: '#4f46e5', // Darker indigo
                700: '#4338ca',
                800: '#3730a3',
                900: '#312e81',
              },
              gray: {
                50: '#f9fafb',
                100: '#f3f4f6',
                200: '#e5e7eb',
                300: '#d1d5db',
                400: '#9ca3af',
                500: '#6b7280',
                600: '#4b5563',
                700: '#374151',
                800: '#1f2937',
                900: '#111827',
              },
              success: '#22c55e', // green-500
              info: '#0ea5e9',    // sky-500
            },
            keyframes: {
              fadeInUp: {
                '0%': { opacity: '0', transform: 'translateY(20px)' },
                '100%': { opacity: '1', transform: 'translateY(0)' },
              },
              pulseOnce: {
                '0%, 100%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.03)' },
              },
              zoomIn: {
                '0%': { transform: 'scale(0.9)', opacity: '0' },
                '100%': { transform: 'scale(1)', opacity: '1' },
              },
            },
            animation: {
              fadeInUp: 'fadeInUp 0.5s ease-out forwards',
              pulseOnce: 'pulseOnce 0.5s ease-in-out',
              zoomIn: 'zoomIn 0.3s ease-out forwards',
            }
          },
        },
      }
    </script>
    <script src="https://unpkg.com/lucide-react@latest/dist/umd/lucide-react.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
  `;

  // Inject CDN scripts into the document head
  useEffect(() => {
    const head = document.querySelector('head');
    if (head && !head.querySelector('#tailwind-lucide-cdn')) {
      const div = document.createElement('div');
      div.id = 'tailwind-lucide-cdn';
      div.innerHTML = CDN_IMPORTS_AND_CONFIG;
      head.appendChild(div);
      // Initialize Lucide icons after scripts are loaded
      const checkLucide = setInterval(() => {
        if (window.lucide && window.lucide.createIcons) {
          window.lucide.createIcons();
          clearInterval(checkLucide);
        }
      }, 100);
    }
  }, []);

  // Custom Tailwind CSS classes for buttons and form inputs
  const customStyles = `
    .btn-primary {
      @apply bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-primary-700 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 flex items-center justify-center;
    }
    .btn-primary-large {
      @apply bg-primary-600 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:bg-primary-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 flex items-center justify-center;
    }
    .btn-secondary {
      @apply bg-transparent text-primary-600 border-2 border-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 flex items-center justify-center;
    }
    .btn-secondary-large {
      @apply bg-transparent text-primary-600 border-2 border-primary-600 px-8 py-4 rounded-xl text-lg font-bold hover:bg-primary-600 hover:text-white transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-opacity-75 flex items-center justify-center;
    }
    .btn-white-outline-large {
      @apply bg-white bg-opacity-20 text-white border-2 border-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-white hover:text-primary-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75 flex items-center justify-center;
    }
    .form-input, .form-select {
      @apply w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200;
    }
    .form-checkbox {
      @apply h-5 w-5 text-primary-600 rounded border-gray-300 focus:ring-primary-500;
    }
    /* Custom animations */
    @keyframes pulse-slow {
      0%, 100% { transform: scale(1); opacity: 0.1; }
      50% { transform: scale(1.1); opacity: 0.2; }
    }
    .animate-pulse-slow {
      animation: pulse-slow 6s infinite ease-in-out;
    }
    @keyframes zoomIn {
      0% { transform: scale(0.9); opacity: 0; }
      100% { transform: scale(1); opacity: 1; }
    }
    .animate-zoomIn {
      animation: zoomIn 0.3s ease-out forwards;
    }
  `;

  // Inject custom styles into the document head
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = customStyles;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);


  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 antialiased">
      {/* Header removed as per user request */}

      <main>
        <HeroSection />
        <PremiumCalculator />
        <TrustBadges />

        <section id="features" className="py-16 bg-white">
          <FeatureGrid features={FEATURES_DATA} />
        </section>

        <BenefitsList financialBenefits={FINANCIAL_BENEFITS_DATA} taxBenefits={TAX_BENEFITS_DATA} />

        {/* Existing Insurance Comparison Table */}
        <ComparisonTable plans={COMPARISON_PLANS_DATA} />

        {/* New Banks Comparison Table */}
        <BanksComparisonTable banks={BANKS_COMPARISON_DATA} />

        <HowItWorks steps={HOW_IT_WORKS_STEPS} />

        <Testimonials testimonialsData={TESTIMONIALS_DATA} />

        <FAQSection faqData={FAQ_DATA} />

        <CallToAction openApplyModal={openApplyModal} navigate={navigate} />
      </main>

      {/* Footer removed as per user request */}

      {/* Sticky CTA */}
      <a
        href="#premium-calculator"
        className="fixed bottom-6 right-6 bg-primary-600 text-white px-6 py-3 rounded-full shadow-lg text-lg font-bold hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 z-40 flex items-center justify-center group"
        aria-label="Get a quick quote for term insurance"
      >
        Get Quote
        <Icon name="Calculator" className="ml-2 w-6 h-6 transition-transform group-hover:rotate-12" />
      </a>
    </div>
  );
};

export default TermInsurancePage;
