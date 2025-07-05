import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, HeartPulse, DollarSign, FileText, Zap, Truck, CheckCircle, Clock, Users, Smile, Globe,
  ArrowRight, CreditCard, Award, Verified, Quote, UserCircle2, Headphones, Smartphone, Briefcase,
  ChevronDown, Plus, Minus, Home, User, TrendingUp, Handshake, ClipboardList, // Removed Hospital
  CalendarCheck, Gift, LifeBuoy, Wallet, PiggyBank, CircleCheck, CircleX, Calculator, Info,
  Star, Search, Building2, Scale, ClipboardCopy, MessageSquare, IndianRupee, XCircle, CheckCircle2,
  Percent, TrendingDown, Brain, Activity, Droplets, Stethoscope, BookOpen, Lightbulb, MapPin, Download, Newspaper, Trophy // Added Stethoscope
} from 'lucide-react';

// --- Reusable Motion Variants ---
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

// --- Background Animation Style ---
const BackgroundAnimation = () => (
  <style>{`
    @keyframes blob-slow {
      0% {
        transform: translate(0px, 0px) scale(1);
      }
      33% {
        transform: translate(40px, -60px) scale(1.05);
      }
      66% {
        transform: translate(-30px, 30px) scale(0.95);
      }
      100% {
        transform: translate(0px, 0px) scale(1);
      }
    }
    .animate-blob-slow {
      animation: blob-slow 12s infinite cubic-bezier(0.6, 0.01, 0.3, 0.9);
    }
    .animation-delay-2000 {
      animation-delay: 2s;
    }
    .animation-delay-4000 {
      animation-delay: 4s;
    }
  `}</style>
);

// --- FAQ Item Component ---
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <motion.div
      className="bg-gray-800/50 rounded-xl shadow-lg border border-gray-700 backdrop-blur-md mb-4 overflow-hidden"
      initial={false}
      animate={{
        backgroundColor: isOpen ? 'rgba(31, 41, 55, 0.7)' : 'rgba(31, 41, 55, 0.5)',
        borderColor: isOpen ? '#6366F1' : '#4B5563'
      }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
        onClick={onClick}
      >
        <div className="flex items-center">
          <Info className="w-6 h-6 mr-4 text-blue-400 flex-shrink-0" />
          <h3 className="text-xl font-semibold text-white pr-4">{question}</h3>
        </div>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
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
            <p className="text-gray-300 leading-relaxed text-lg border-t border-gray-700 pt-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Premium Calculator Component ---
const PremiumCalculator = () => {
  const [age, setAge] = useState('');
  const [members, setMembers] = useState('1');
  const [sumInsured, setSumInsured] = useState('500000');
  const [estimatedPremium, setEstimatedPremium] = useState(null);

  const calculatePremium = (e) => {
    e.preventDefault();
    const ageVal = parseInt(age);
    const membersVal = parseInt(members);
    const sumInsuredVal = parseInt(sumInsured);

    if (isNaN(ageVal) || ageVal < 18 || ageVal > 65) {
      setEstimatedPremium("Please enter a valid age (18-65).");
      return;
    }

    // Dummy calculation logic (more complex to simulate real factors)
    let basePremium = 5000; // Base premium for 1 member, 18 years, 1 lakh SI
    
    // Age factor: increases with age
    basePremium += (ageVal - 18) * 150; 

    // Members factor: adds cost per additional member, with slight discount for more members
    if (membersVal > 1) {
      basePremium += (membersVal - 1) * 3000 * (1 - (membersVal * 0.05));
    }

    // Sum Insured factor: increases with coverage amount
    basePremium += (sumInsuredVal / 100000 - 1) * 1000; 

    // Add some random variation for a more "realistic" feel
    basePremium = Math.max(2500, basePremium + (Math.random() * 2000 - 1000)); // Ensure minimum premium

    setEstimatedPremium(`₹ ${Math.round(basePremium).toLocaleString('en-IN')}`);
  };

  return (
    <motion.section
      id="premium-calculator-section" // Added ID for scrolling
      className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-8 drop-shadow-lg">
          Calculate Your{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400">
            Health Premium
          </span>
        </h2>
        <p className="text-lg text-gray-300 mb-10">
          Get an instant estimate for your health insurance premium.
          <br />
          <span className="text-sm text-gray-400 italic">(This is an estimation based on general factors. Actual premiums may vary.)</span>
        </p>

        <motion.form
          onSubmit={calculatePremium}
          className="bg-gray-800/50 rounded-2xl shadow-xl p-8 border border-gray-700 backdrop-blur-md grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={itemVariants}
        >
          <div className="flex flex-col items-start">
            <label htmlFor="age" className="text-gray-300 text-lg font-medium mb-2 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-400" /> Your Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="e.g., 30"
              min="18"
              max="65"
              required
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div className="flex flex-col items-start">
            <label htmlFor="members" className="text-gray-300 text-lg font-medium mb-2 flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-400" /> Family Members
            </label>
            <select
              id="members"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
            >
              <option value="1">1 (Individual)</option>
              <option value="2">2 (Spouse)</option>
              <option value="3">3 (Spouse + 1 Child)</option>
              <option value="4">4 (Spouse + 2 Children)</option>
              <option value="5">5 (Spouse + 3 Children)</option>
            </select>
          </div>

          <div className="md:col-span-2 flex flex-col items-start">
            <label htmlFor="sumInsured" className="text-gray-300 text-lg font-medium mb-2 flex items-center">
              <IndianRupee className="w-5 h-5 mr-2 text-yellow-400" /> Sum Insured (Coverage Amount)
            </label>
            <select
              id="sumInsured"
              value={sumInsured}
              onChange={(e) => setSumInsured(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all appearance-none"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1.5em 1.5em' }}
            >
              <option value="100000">₹ 1,00,000</option>
              <option value="200000">₹ 2,00,000</option>
              <option value="300000">₹ 3,00,000</option>
              <option value="500000">₹ 5,00,000</option>
              <option value="700000">₹ 7,00,000</option>
              <option value="1000000">₹ 10,00,000</option>
              <option value="1500000">₹ 15,00,000</option>
              <option value="2000000">₹ 20,00,000</option>
            </select>
          </div>

          <motion.button
            type="submit"
            className="md:col-span-2 px-8 py-4 rounded-full font-bold text-xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg
                       hover:from-orange-600 hover:to-red-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                       focus:outline-none focus:ring-4 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center gap-3 mt-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Calculator className="w-7 h-7" /> Calculate Premium
          </motion.button>

          {estimatedPremium && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:col-span-2 text-center mt-6 p-4 bg-blue-800/60 rounded-lg border border-blue-700 shadow-md"
            >
              <p className="text-xl font-semibold text-blue-200">Estimated Annual Premium:</p>
              <p className="text-4xl font-extrabold text-white mt-2 flex items-center justify-center">
                {estimatedPremium}
              </p>
            </motion.div>
          )}
        </motion.form>
      </div>
    </motion.section>
  );
};


// --- Main Health Insurance Page Component ---
const BanksCartHealthInsurancePage = () => {
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  // --- Data for Sections ---

  const keyBenefits = [
    { icon: <Search className="w-16 h-16 text-teal-400" />, title: "Compare Top Insurers", description: "Easily compare health plans from India's leading insurance companies on one platform." },
    { icon: <Scale className="w-16 h-16 text-purple-400" />, title: "Unbiased Advice", description: "Get impartial recommendations tailored to your needs, not driven by single insurer targets." },
    { icon: <DollarSign className="w-16 h-16 text-yellow-400" />, title: "Best Price Guarantee", description: "Find the most competitive premiums and exclusive deals available only through BanksCart." },
    { icon: <ClipboardCopy className="w-16 h-16 text-green-400" />, title: "Paperless & Instant", description: "Apply and get your policy issued digitally in minutes, without any cumbersome paperwork." },
    { icon: <MessageSquare className="w-16 h-16 text-red-400" />, title: "Expert Claim Assistance", description: "Our dedicated team helps you navigate the claim process with your chosen insurer, ensuring a smooth experience." },
  ];

  const whyCrucialStats = [
    { icon: <TrendingUp className="w-16 h-16 text-red-400" />, title: "Medical Inflation", value: "14% in India", description: "Healthcare costs are rising rapidly, making insurance a necessity." },
    { icon: <HeartPulse className="w-16 h-16 text-pink-400" />, title: "Cancer Risk", value: "1 in 9 lifetime probability", description: "Protect yourself and your loved ones against critical illnesses." },
    { icon: <Droplets className="w-16 h-16 text-blue-400" />, title: "Vector-borne Diseases", value: "Common & Costly", description: "Dengue, Malaria, etc., can lead to significant hospitalization bills." },
    { icon: <Brain className="w-16 h-16 text-purple-400" />, title: "Mental Health", value: "Growing Concern", description: "Many policies now cover mental health treatments, crucial for holistic well-being." },
    { icon: <Activity className="w-16 h-16 text-orange-400" />, title: "Heart Diseases", value: "Leading Cause of Death", description: "Comprehensive coverage for cardiac procedures and post-care." },
  ];

  const lifeStageNeeds = [
    {
      title: "Budget-Conscious Individuals",
      description: "Looking for essential coverage without breaking the bank. Focus on high sum insured with basic benefits.",
      icon: <PiggyBank className="w-12 h-12 text-yellow-400" />,
      plans: ["Basic Individual Plan", "High Deductible Plans"]
    },
    {
      title: "Healthy & Young Adults (20s-30s)",
      description: "Start early to lock in lower premiums and build No Claim Bonus. Focus on comprehensive coverage for future needs.",
      icon: <User className="w-12 h-12 text-green-400" />,
      plans: ["Individual Plan", "Top-up Plan"]
    },
    {
      title: "Growing Families (30s-40s)",
      description: "Protect your spouse and children under a single policy. Consider maternity benefits and newborn baby cover.",
      icon: <Users className="w-12 h-12 text-blue-400" />,
      plans: ["Family Floater Plan", "Maternity Benefit Rider"]
    },
    {
      title: "Working Professionals & Middle-Aged (40s-50s)",
      description: "Ensure adequate coverage for lifestyle diseases and increasing medical needs. Look for critical illness riders.",
      icon: <Briefcase className="w-12 h-12 text-purple-400" />,
      plans: ["Comprehensive Individual/Family Plan", "Critical Illness Cover"]
    },
    {
      title: "Senior Citizens (60+)",
      description: "Specialized plans with lower waiting periods for pre-existing conditions and domiciliary hospitalization.",
      icon: <LifeBuoy className="w-12 h-12 text-red-400" />,
      plans: ["Senior Citizen Plan", "Super Top-up Plan"]
    }
  ];

  const keyFeatures = [
    { icon: <Clock className="w-16 h-16 text-yellow-400" />, title: "Zero Waiting Period Options", description: "Get covered for certain conditions from day one with select plans." },
    { icon: <Percent className="w-16 h-16 text-green-400" />, title: "100% Claim Settlement", description: "No deductions or copay on claims with specific plans, ensuring full coverage." },
    { icon: <Stethoscope className="w-16 h-16 text-blue-400" />, title: "Cashless Hospitalization", description: "Access 10,500+ network hospitals for cashless treatment across India." }, // Changed icon here
    { icon: <Home className="w-16 h-16 text-purple-400" />, title: "No Room Rent Limits", description: "Choose your preferred room without worrying about sub-limits on rent in many plans." },
    { icon: <CalendarCheck className="w-16 h-16 text-orange-400" />, title: "Pre & Post Hospitalization", description: "Coverage for medical expenses 60 days pre and 120 days post hospitalization." },
    { icon: <Users className="w-16 h-16 text-teal-400" />, title: "Family Floater Plans", description: "Cover up to 10 members under a single policy, simplifying family health management." },
    { icon: <IndianRupee className="w-16 h-16 text-lime-400" />, title: "Tax Benefits (Sec 80D)", description: "Save up to ₹75,000 annually on taxes by investing in health insurance." },
    { icon: <Smartphone className="w-16 h-16 text-cyan-400" />, title: "Digital-First & Paperless", description: "Buy, manage, and claim policies entirely online through our app and web portal." },
    { icon: <TrendingUp className="w-16 h-16 text-pink-400" />, title: "Real-Time Claim Tracking", description: "Monitor your claim status with instant updates via the BanksCart mobile app." },
  ];

  const planComparisonData = [
    {
      feature: "Hospital Bills Coverage",
      banksCart: "Up to Sum Insured",
      competitorA: "Up to Sum Insured",
      competitorB: "Up to Sum Insured"
    },
    {
      feature: "Room Rent Limit",
      banksCart: "No Limit (Many Plans)",
      competitorA: "2% of Sum Insured",
      competitorB: "Single Private AC Room"
    },
    {
      feature: "Waiting Period (Pre-existing)",
      banksCart: "2-4 Years (Some plans 1 Year)",
      competitorA: "3-4 Years",
      competitorB: "4 Years"
    },
    {
      feature: "Copay Clause",
      banksCart: "0% (Many Plans)",
      competitorA: "10-20%",
      competitorB: "15%"
    },
    {
      feature: "Disease-Specific Coverage",
      banksCart: "Extensive",
      competitorA: "Standard",
      competitorB: "Limited"
    },
    {
      feature: "Claim Settlement Ratio (BanksCart Partner Avg.)",
      banksCart: "95%+",
      competitorA: "85-90%",
      competitorB: "90-93%"
    },
    {
      feature: "Sample Premium (₹5L SI, 30-yr old)",
      banksCart: "₹ 5,000 - ₹ 8,000",
      competitorA: "₹ 6,500 - ₹ 9,500",
      competitorB: "₹ 7,000 - ₹ 10,000"
    }
  ];

  const educationalContent = [
    {
      title: "Types of Health Insurance Plans",
      icon: <BookOpen className="w-12 h-12 text-blue-400" />,
      content: [
        { subtitle: "Individual Health Plan:", description: "Covers a single person for medical expenses. Ideal for young adults or those seeking independent coverage." },
        { subtitle: "Family Floater Plan:", description: "Covers multiple family members (e.g., spouse, children) under a single sum insured. Cost-effective for families." },
        { subtitle: "Senior Citizen Health Plan:", description: "Designed for individuals aged 60 and above, often with specific benefits and considerations for age-related ailments." },
        { subtitle: "Critical Illness Cover:", description: "Provides a lump sum payment upon diagnosis of specified critical illnesses (e.g., cancer, heart attack), irrespective of hospitalization." },
        { subtitle: "Group Health Insurance:", description: "Offered by employers to their employees. Provides coverage to a group of people, often with fewer exclusions and lower premiums." },
        { subtitle: "Super Top-up Plan:", description: "Acts as an extension to your existing health insurance. It kicks in once the base policy's sum insured is exhausted, providing additional coverage at a lower cost." }
      ]
    },
    {
      title: "Understanding Waiting Periods",
      icon: <Clock className="w-12 h-12 text-orange-400" />,
      content: [
        { subtitle: "Initial Waiting Period (30 days):", description: "Most policies have a 30-day waiting period from policy inception for all illnesses, except accidental injuries." },
        { subtitle: "Specific Disease Waiting Period (1-4 years):", description: "Certain diseases (e.g., hernia, cataracts, joint replacement) have a waiting period of 1 to 4 years before they are covered." },
        { subtitle: "Pre-existing Disease Waiting Period (2-4 years):", description: "Diseases diagnosed before buying the policy are covered only after a specified waiting period, typically 2 to 4 years." }
      ]
    },
    {
      title: "Ways to Reduce Premiums",
      icon: <PiggyBank className="w-12 h-12 text-lime-400" />,
      content: [
        { subtitle: "Buy Early:", description: "Premiums are lower when you are younger and healthier." },
        { subtitle: "Choose a Higher Deductible/Voluntary Co-pay:", description: "Opting to pay a portion of the claim yourself can reduce premiums." },
        { subtitle: "Opt for a Family Floater:", description: "Often more cost-effective than buying individual policies for each family member." },
        { subtitle: "Stay Healthy:", description: "Some insurers offer discounts for maintaining a healthy lifestyle or undergoing regular health check-ups." },
        { subtitle: "Long-Term Policies:", description: "Buying multi-year policies can sometimes offer discounts." }
      ]
    }
  ];


  const inclusions = [
    { icon: <CheckCircle2 className="w-6 h-6 text-green-400" />, text: "In-patient Hospitalization (24+ hours)" },
    { icon: <CheckCircle2 className="w-6 h-6 text-green-400" />, text: "Pre & Post Hospitalization Expenses" },
    { icon: <CheckCircle2 className="w-6 h-6 text-green-400" />, text: "Day Care Procedures (no 24-hour hospitalization required)" },
    { icon: <CheckCircle2 className="w-6 h-6 text-green-400" />, text: "Ambulance Charges" },
    { icon: <CheckCircle2 className="w-6 h-6 text-green-400" />, text: "Maternity Benefits (as per policy)" },
    { icon: <CheckCircle2 className="w-6 h-6 text-green-400" />, text: "Newborn Baby Cover (as per policy)" },
    { icon: <CheckCircle2 className="w-6 h-6 text-green-400" />, text: "Domiciliary Hospitalization" },
    { icon: <CheckCircle2 className="w-6 h-6 text-green-400" />, text: "Organ Donor Expenses" },
    { icon: <CheckCircle2 className="w-6 h-6 text-green-400" />, text: "Annual Health Check-ups (as per policy)" },
    { icon: <CheckCircle2 className="w-6 h-6 text-green-400" />, text: "No Claim Bonus" },
  ];

  const exclusions = [
    { icon: <XCircle className="w-6 h-6 text-red-400" />, text: "Pre-existing diseases (initial waiting period applies)" },
    { icon: <XCircle className="w-6 h-6 text-red-400" />, text: "Initial waiting period (typically 30 days for new policies)" },
    { icon: <XCircle className="w-6 h-6 text-red-400" />, text: "Specific disease waiting periods (e.g., 2-4 years for certain ailments)" },
    { icon: <XCircle className="w-6 h-6 text-red-400" />, text: "Cosmetic surgery" },
    { icon: <XCircle className="w-6 h-6 text-red-400" />, text: "Self-inflicted injuries" },
    { icon: <XCircle className="w-6 h-6 text-red-400" />, text: "Hazardous activities" },
    { icon: <XCircle className="w-6 h-6 text-red-400" />, text: "Dental treatment (unless due to accident)" },
    { icon: <XCircle className="w-6 h-6 text-red-400" />, text: "Non-allopathic treatments (unless specifically covered)" },
  ];

  const howToBuySteps = [
    {
      stepNumber: "01",
      title: "Get Quote & Compare",
      description: "Enter basic details (age, family, location) to compare personalized health plans from multiple insurance companies.",
      icon: <Calculator className="w-12 h-12 text-blue-400" />
    },
    {
      stepNumber: "02",
      title: "Select Your Plan",
      description: "Review detailed policy features, premiums, and claim settlement ratios. Choose the best plan that fits your needs and budget.",
      icon: <Award className="w-12 h-12 text-green-400" />
    },
    {
      stepNumber: "03",
      title: "Complete Application",
      description: "Fill a simple online application form with personal and health details. Make secure payment directly to your chosen insurance company.",
      icon: <Wallet className="w-12 h-12 text-purple-400" />
    },
    {
      stepNumber: "04",
      title: "Policy Issued",
      description: "Receive policy documents instantly via email directly from the insurer. Access and manage your policy anytime on the BanksCart app.",
      icon: <CalendarCheck className="w-12 h-12 text-orange-400" />
    }
  ];

  const howToClaimSteps = [
    {
      stepNumber: "01",
      title: "Notify BanksCart / Insurer",
      description: "For cashless claims, notify us/insurer 48-72 hours before planned hospitalization or within 24 hours for emergencies.",
      icon: <MessageSquare className="w-12 h-12 text-blue-400" />
    },
    {
      stepNumber: "02",
      title: "Cashless or Reimbursement",
      description: "Opt for cashless at network hospitals or pay upfront and claim reimbursement later with required documents.",
      icon: <Stethoscope className="w-12 h-12 text-green-400" /> // Changed icon here
    },
    {
      stepNumber: "03",
      title: "Submit Documents",
      description: "Our team will guide you on submitting necessary documents (medical reports, bills, discharge summary) to the insurer.",
      icon: <ClipboardList className="w-12 h-12 text-purple-400" />
    },
    {
      stepNumber: "04",
      title: "Claim Settlement",
      description: "We follow up with the insurer to ensure quick processing. Approved claims are settled directly by the insurance company.",
      icon: <IndianRupee className="w-12 h-12 text-orange-400" />
    }
  ];

  const whyChooseUs = [
    { icon: <Building2 className="w-16 h-16 text-blue-400" />, title: "Partners with Top Insurers", description: "Access plans from over 20 leading health insurance companies in India." },
    { icon: <Scale className="w-16 h-16 text-green-400" />, title: "Transparent & Unbiased", description: "We provide clear comparisons and honest advice, putting your needs first." },
    { icon: <Headphones className="w-16 h-16 text-purple-400" />, title: "Dedicated Support", description: "From choosing a plan to claim assistance, our experts are with you every step of the way." },
    { icon: <Smartphone className="w-16 h-16 text-yellow-400" />, title: "Seamless Digital Journey", description: "Compare, buy, and manage your policy effortlessly through our intuitive online platform and app." },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Rina Shah",
      testimonial: "BanksCart made comparing health insurance so easy! I found the perfect plan from a great insurer, and the entire process was digital and quick.",
      rating: 5, verified: true, date: "3 weeks ago", avatarIcon: <UserCircle2 className="w-full h-full text-blue-400" />
    },
    {
      id: 2,
      name: "Kumar Patel",
      testimonial: "Thanks to BanksCart, I easily found a policy with cashless hospitalization. Their platform is very user-friendly, and I appreciate the wide choice of insurers.",
      rating: 5, verified: true, date: "1 month ago", avatarIcon: <Stethoscope className="w-full h-full text-green-400" /> // Changed icon here
    },
    {
      id: 3,
      name: "Sara Khan",
      testimonial: "I compared several health plans, and BanksCart offered the best coverage at a very competitive premium. Plus, their customer service is excellent.",
      rating: 4, verified: true, date: "2 days ago", avatarIcon: <DollarSign className="w-full h-full text-purple-400" />
    },
    {
      id: 4,
      name: "David Lee",
      testimonial: "Filing a claim was surprisingly simple with the BanksCart app. I uploaded documents and received updates quickly. A truly hassle-free experience.",
      rating: 5, verified: true, date: "2 months ago", avatarIcon: <ClipboardList className="w-full h-full text-yellow-400" />
    },
  ];

  const faqs = [
    {
      question: "What is BanksCart's role in health insurance?",
      answer: "BanksCart is an online insurance aggregator and broker. We partner with India's leading health insurance companies to help you compare, choose, and buy the best health insurance policy that fits your needs. We are not an insurance company ourselves."
    },
    {
      question: "How do I choose the right insurance company through BanksCart?",
      answer: "BanksCart provides detailed comparisons of plans from various insurers, highlighting features, premiums, and claim settlement ratios. Our expert advisors are also available to offer unbiased guidance to help you make an informed decision."
    },
    {
      question: "Are the premiums on BanksCart the same as buying directly from an insurer?",
      answer: "Yes, the premiums displayed on BanksCart are the same as those offered by the insurance companies directly. In fact, we often have exclusive deals and discounts, ensuring you get the best possible price."
    },
    {
      question: "What types of medical expenses do policies available on BanksCart cover?",
      answer: "Policies available through BanksCart typically cover a wide range of expenses including hospitalization (room rent, doctor fees, nursing charges), pre and post-hospitalization, day care procedures, ambulance charges, and often include features like no-claim bonus and health check-ups."
    },
    {
      question: "How does BanksCart assist with claims?",
      answer: "While the claim is settled by your chosen insurance company, BanksCart provides dedicated claim assistance. Our team helps you with documentation, follow-ups with the insurer, and ensures a smooth and hassle-free claim experience."
    },
    {
      question: "Can I add my family members to a health insurance policy bought via BanksCart?",
      answer: "Yes, you can choose Family Floater Plans from our partner insurers through BanksCart, allowing you to cover your spouse, children, and sometimes parents under a single policy with a shared sum insured."
    },
    {
      question: "How accurate is the premium calculator?",
      answer: "Our premium calculator provides an instant estimation based on the basic details you provide. While it's designed to be highly indicative, the final premium may vary slightly based on detailed underwriting by the insurer."
    }
  ];

  return (
    <div className="bg-gray-950 font-inter text-white min-h-screen">
      <BackgroundAnimation />

      {/* --- Hero Section --- */}
      <motion.section
        className="relative py-24 px-4 sm:px-6 lg:px-8 text-center overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Background abstract shapes */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Breadcrumbs & Quick Links (Conceptual) */}
          <div className="text-sm text-gray-400 mb-4">
            <a href="/" className="hover:underline">Home</a> &gt; <a href="/insurance" className="hover:underline">Insurance</a> &gt; Health Insurance
          </div>
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 drop-shadow-lg"
            variants={itemVariants}
          >
            Protect Your Future with Health Insurance &{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-400">
              Save up to ₹75,000* in Taxes!
            </span>
          </motion.h1>
          <motion.p
            className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Compare comprehensive health plans from India's top insurers on BanksCart – your trusted partner for unbiased advice and effortless purchase.
          </motion.p>
          <motion.button
            className="px-10 py-5 rounded-full font-bold text-xl bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg
                       hover:from-green-600 hover:to-teal-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                       focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center gap-3 mx-auto"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('premium-calculator-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Calculator className="w-7 h-7" /> Get a Free Quote Today
            <ArrowRight className="w-6 h-6 ml-2" />
          </motion.button>
          {/* Trust Indicators */}
          <motion.div className="mt-8 flex items-center justify-center gap-4 text-gray-300" variants={itemVariants}>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
              <span className="font-semibold text-lg">4.6/5</span>
            </div>
            <span className="text-sm">based on 10,000+ customer reviews</span>
            <Verified className="w-5 h-5 text-green-400" />
            <span className="text-sm">Verified by Google</span>
          </motion.div>
          <p className="text-xs text-gray-500 mt-4">*Tax benefits are subject to change as per income tax laws.</p>
        </div>
      </motion.section>

      {/* --- What is Health Insurance? --- */}
      <motion.section
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-8 drop-shadow-lg">
            What is Health Insurance?
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Health insurance is a financial safety net that covers your medical expenses, ensuring you receive quality healthcare without depleting your savings. It's a contract between you and an insurance company where you pay a regular premium, and in return, the insurer covers specified medical costs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <motion.div className="bg-gray-800/50 rounded-xl shadow-lg p-6 border border-gray-700 backdrop-blur-md" variants={cardVariants}>
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2"><IndianRupee className="w-6 h-6 text-yellow-400" /> Financial Protection</h3>
              <p className="text-gray-300">Safeguards your savings from unexpected high medical bills, allowing you to focus on recovery.</p>
            </motion.div>
            <motion.div className="bg-gray-800/50 rounded-xl shadow-lg p-6 border border-gray-700 backdrop-blur-md" variants={cardVariants}>
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2"><Stethoscope className="w-6 h-6 text-blue-400" /> Access to Quality Healthcare</h3> {/* Changed icon here */}
              <p className="text-gray-300">Ensures you can afford the best medical treatments, hospitals, and specialists when needed.</p>
            </motion.div>
            <motion.div className="bg-gray-800/50 rounded-xl shadow-lg p-6 border border-gray-700 backdrop-blur-md" variants={cardVariants}>
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2"><Percent className="w-6 h-6 text-green-400" /> Tax Benefits</h3>
              <p className="text-gray-300">Enjoy tax deductions on premiums paid under Section 80D of the Income Tax Act.</p>
            </motion.div>
            <motion.div className="bg-gray-800/50 rounded-xl shadow-lg p-6 border border-gray-700 backdrop-blur-md" variants={cardVariants}>
              <h3 className="text-2xl font-bold text-white mb-3 flex items-center gap-2"><LifeBuoy className="w-6 h-6 text-red-400" /> Peace of Mind</h3>
              <p className="text-gray-300">Reduces stress and anxiety about medical emergencies, knowing you're financially covered.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* --- Why Health Insurance is Crucial --- */}
      <motion.section
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-12 drop-shadow-lg">
            Why Health Insurance is Crucial in India
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Medical emergencies are unpredictable and can be financially devastating. Here's why health insurance is no longer an option, but a necessity:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyCrucialStats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-gray-700 backdrop-blur-md
                           transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-500"
                variants={cardVariants}
              >
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-700/40 border border-gray-600 mb-6">
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{stat.title}</h3>
                <p className="text-5xl font-extrabold text-teal-400 mb-3">{stat.value}</p>
                <p className="text-gray-300 text-base leading-relaxed">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- Life Stage-Based Insurance Needs --- */}
      <motion.section
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-12 drop-shadow-lg">
            Health Insurance for Every Life Stage
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Your health needs evolve, and so should your insurance. Find the perfect plan for your current life stage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lifeStageNeeds.map((stage, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-gray-700 backdrop-blur-md
                           transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-purple-500"
                variants={cardVariants}
              >
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-700/40 border border-gray-600 mb-6">
                  {stage.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{stage.title}</h3>
                <p className="text-gray-300 text-base mb-4 leading-relaxed">{stage.description}</p>
                <ul className="text-left w-full space-y-2 mt-auto pt-4 border-t border-gray-700">
                  {stage.plans.map((plan, pIndex) => (
                    <li key={pIndex} className="flex items-center text-gray-300">
                      <ArrowRight className="w-4 h-4 text-orange-400 mr-2 flex-shrink-0" /> {plan}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- Key Features & Benefits --- */}
      <motion.section
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-12 drop-shadow-lg">
            Key Features & Benefits
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Experience unparalleled protection and convenience with health insurance plans available through BanksCart.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-gray-700 backdrop-blur-md
                           transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-500"
                variants={cardVariants}
              >
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-700/40 border border-gray-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300 text-base leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- Plan Comparison Table --- */}
      <motion.section
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-12 drop-shadow-lg">
            BanksCart vs. The Market: A Clear Comparison
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            See how plans available through BanksCart stack up against typical market offerings.
          </p>
          <div className="overflow-x-auto rounded-xl shadow-xl border border-gray-700 backdrop-blur-md">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-base font-medium text-gray-300 uppercase tracking-wider rounded-tl-xl">
                    Feature
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-base font-medium text-teal-400 uppercase tracking-wider">
                    BanksCart (Partner Plans)
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-base font-medium text-gray-300 uppercase tracking-wider">
                    Competitor A (Typical)
                  </th>
                  <th scope="col" className="px-6 py-4 text-center text-base font-medium text-gray-300 uppercase tracking-wider rounded-tr-xl">
                    Competitor B (Typical)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {planComparisonData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-700/50 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-200 text-left">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-teal-300 font-semibold text-center">
                      {row.banksCart}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-300 text-center">
                      {row.competitorA}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-lg text-gray-300 text-center">
                      {row.competitorB}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-400 mt-6 italic">
            *This comparison is illustrative based on general market trends and common policy features. Specific policy terms and conditions may vary.
          </p>
        </div>
      </motion.section>

      {/* --- Educational Content: Types, Waiting Periods, Reduce Premiums --- */}
      <motion.section
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-12 drop-shadow-lg">
            Your Health Insurance Knowledge Hub
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Empower yourself with essential information to make informed health insurance decisions.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {educationalContent.map((section, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 rounded-2xl shadow-xl p-8 border border-gray-700 backdrop-blur-md text-left"
                variants={cardVariants}
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-700/40 border border-gray-600 mb-6">
                  {section.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-300 text-base">
                      <span className="font-semibold text-blue-300">{item.subtitle}</span> {item.description}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- Inclusions & Exclusions Section --- */}
      <motion.section
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-12 drop-shadow-lg">
            What's Covered & What's Not
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Understand the typical coverage and common exclusions across most health insurance policies.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Inclusions */}
            <motion.div
              className="bg-gray-800/50 rounded-2xl shadow-xl p-8 border border-gray-700 backdrop-blur-md"
              variants={cardVariants}
            >
              <h3 className="text-3xl font-bold text-green-400 mb-6 flex items-center justify-center gap-3">
                <CheckCircle2 className="w-8 h-8" /> Inclusions
              </h3>
              <ul className="space-y-4 text-left">
                {inclusions.map((item, index) => (
                  <li key={index} className="flex items-start text-lg text-gray-300">
                    <span className="flex-shrink-0 mt-1 mr-3">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Exclusions */}
            <motion.div
              className="bg-gray-800/50 rounded-2xl shadow-xl p-8 border border-gray-700 backdrop-blur-md"
              variants={cardVariants}
            >
              <h3 className="text-3xl font-bold text-red-400 mb-6 flex items-center justify-center gap-3">
                <XCircle className="w-8 h-8" /> Exclusions
              </h3>
              <ul className="space-y-4 text-left">
                {exclusions.map((item, index) => (
                  <li key={index} className="flex items-start text-lg text-gray-300">
                    <span className="flex-shrink-0 mt-1 mr-3">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* --- How to Buy Health Insurance Section --- */}
      <motion.section
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-16 drop-shadow-lg">
            How to Buy Health Insurance through BanksCart
          </h2>
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howToBuySteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative bg-gray-800/50 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-gray-700 backdrop-blur-md
                           transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-indigo-500"
                variants={cardVariants}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white
                            w-12 h-12 flex items-center justify-center rounded-full font-bold text-xl shadow-lg border-2 border-gray-700">
                  {step.stepNumber}
                </div>
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-700/40 border border-gray-600 mb-6 mt-6">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300 text-base leading-relaxed">{step.description}</p>

                {index < howToBuySteps.length - 1 && (
                  <>
                    <div className="hidden lg:block absolute top-1/2 left-[calc(100%+0.5rem)] w-16 h-1 bg-gray-700 transform -translate-y-1/2"></div>
                    <div className="hidden lg:block absolute top-1/2 left-[calc(100%+4.5rem)] transform -translate-y-1/2 -translate-x-1/2">
                      <ArrowRight className="w-8 h-8 text-gray-500" />
                    </div>
                    <div className="block lg:hidden absolute bottom-0 left-1/2 h-8 w-1 bg-gray-700 transform translate-y-full -translate-x-1/2"></div>
                    <div className="block lg:hidden absolute bottom-0 left-1/2 transform translate-y-[calc(100%+2rem)] -translate-x-1/2">
                      <ArrowRight className="w-8 h-8 text-gray-500 rotate-90" />
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- How to File a Claim Section --- */}
      <motion.section
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-16 drop-shadow-lg">
            How to File a Health Insurance Claim
          </h2>
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howToClaimSteps.map((step, index) => (
              <motion.div
                key={index}
                className="relative bg-gray-800/50 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-gray-700 backdrop-blur-md
                           transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-500"
                variants={cardVariants}
              >
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-green-500 to-teal-500 text-white
                            w-12 h-12 flex items-center justify-center rounded-full font-bold text-xl shadow-lg border-2 border-gray-700">
                  {step.stepNumber}
                </div>
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gray-700/40 border border-gray-600 mb-6 mt-6">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300 text-base leading-relaxed">{step.description}</p>

                {index < howToClaimSteps.length - 1 && (
                  <>
                    <div className="hidden lg:block absolute top-1/2 left-[calc(100%+0.5rem)] w-16 h-1 bg-gray-700 transform -translate-y-1/2"></div>
                    <div className="hidden lg:block absolute top-1/2 left-[calc(100%+4.5rem)] transform -translate-y-1/2 -translate-x-1/2">
                      <ArrowRight className="w-8 h-8 text-gray-500" />
                    </div>
                    <div className="block lg:hidden absolute bottom-0 left-1/2 h-8 w-1 bg-gray-700 transform translate-y-full -translate-x-1/2"></div>
                    <div className="block lg:hidden absolute bottom-0 left-1/2 transform translate-y-[calc(100%+2rem)] -translate-x-1/2">
                      <ArrowRight className="w-8 h-8 text-gray-500 rotate-90" />
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- Why Choose BanksCart Section (Updated for Mediator Role) --- */}
      <motion.section
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-12 drop-shadow-lg">
            The BanksCart Advantage: Your Trusted Partner
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            We're not just a platform; we're your dedicated health insurance guide.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-gray-700 backdrop-blur-md
                           transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-teal-500"
                variants={cardVariants}
              >
                <div className="w-24 h-24 flex items-center justify-center rounded-full bg-gray-700/40 border border-gray-600 mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300 text-base leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- Trust & Transparency Elements --- */}
      <motion.section
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-12 drop-shadow-lg">
            Our Commitment to Trust & Transparency
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            At BanksCart, we believe in clear, honest, and customer-first service.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div className="bg-gray-800/50 rounded-2xl shadow-xl p-8 border border-gray-700 backdrop-blur-md flex flex-col items-center text-center" variants={cardVariants}>
              <IndianRupee className="w-20 h-20 text-yellow-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">No Agent Commission</h3>
              <p className="text-gray-300">We prioritize your savings. Our model focuses on direct-to-customer benefits, not hidden commissions.</p>
            </motion.div>
            <motion.div className="bg-gray-800/50 rounded-2xl shadow-xl p-8 border border-gray-700 backdrop-blur-md flex flex-col items-center text-center" variants={cardVariants}>
              <Percent className="w-20 h-20 text-green-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">High Claim Settlement Ratio</h3>
              <p className="text-gray-300">We partner with insurers known for their strong claim settlement records (average 95%+).</p>
            </motion.div>
            <motion.div className="bg-gray-800/50 rounded-2xl shadow-xl p-8 border border-gray-700 backdrop-blur-md flex flex-col items-center text-center" variants={cardVariants}>
              <MapPin className="w-20 h-20 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Extensive Network Hospitals</h3>
              <p className="text-gray-300">Access cashless treatment at 10,500+ hospitals nationwide. <a href="#" className="text-blue-400 hover:underline">Find a hospital near you</a>.</p>
            </motion.div>
            <motion.div className="bg-gray-800/50 rounded-2xl shadow-xl p-8 border border-gray-700 backdrop-blur-md flex flex-col items-center text-center" variants={cardVariants}>
              <Download className="w-20 h-20 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Download Policy Wording</h3>
              <p className="text-gray-300">Access detailed policy documents before buying. <a href="#" className="text-blue-400 hover:underline">Download sample policy wordings</a>.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* --- Customer Testimonials Section --- */}
      <motion.section
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-16 drop-shadow-lg">
            What Our Policyholders Say About BanksCart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="bg-gray-800/50 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-gray-700 backdrop-blur-md
                           transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-blue-500"
                variants={cardVariants}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center mb-6 shadow-inner border-2 border-gray-600">
                  {testimonial.avatarIcon}
                </div>
                <p className="text-lg font-semibold text-gray-100 mb-4 italic relative">
                  <Quote className="absolute -top-2 -left-4 w-6 h-6 text-gray-500 opacity-60 transform -rotate-12" />
                  "{testimonial.testimonial}"
                  <Quote className="absolute -bottom-2 -right-4 w-6 h-6 text-gray-500 opacity-60 transform rotate-180" />
                </p>
                <div className="flex items-center mb-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
                <p className="text-xl font-bold text-gray-100 mb-1">{testimonial.name}</p>
                <p className="text-sm text-gray-400">{testimonial.date}</p>
                {testimonial.verified && (
                  <span className="flex items-center text-green-400 text-sm font-semibold mt-3 bg-gray-700/40 px-3 py-1 rounded-full border border-green-600">
                    <Verified className="w-4 h-4 mr-1" /> Verified Customer
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- FAQ Section (Updated for Mediator Role) --- */}
      <motion.section
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-16 drop-shadow-lg text-center">
            Frequently Asked{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-teal-400">
              Questions
            </span>
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQIndex === index}
                onClick={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* --- Digital Services & Technology Section --- */}
      <motion.section
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-12 drop-shadow-lg">
            Experience the Future of Insurance with Our Digital Tools
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            BanksCart brings you cutting-edge technology for a seamless and paperless insurance journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div className="bg-gray-800/50 rounded-2xl shadow-xl p-8 border border-gray-700 backdrop-blur-md flex flex-col items-center text-center" variants={cardVariants}>
              <Smartphone className="w-20 h-20 text-teal-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">BanksCart Mobile App</h3>
              <p className="text-gray-300">Manage policies, track claims, and access support on the go. Available on iOS & Android.</p>
              <div className="mt-4 flex gap-4">
                <a href="#" className="text-blue-400 hover:underline">App Store</a>
                <a href="#" className="text-blue-400 hover:underline">Google Play</a>
              </div>
            </motion.div>
            <motion.div className="bg-gray-800/50 rounded-2xl shadow-xl p-8 border border-gray-700 backdrop-blur-md flex flex-col items-center text-center" variants={cardVariants}>
              <Calculator className="w-20 h-20 text-orange-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Online Premium Calculator</h3>
              <p className="text-gray-300">Get instant, accurate premium estimates tailored to your specific needs.</p>
            </motion.div>
            <motion.div className="bg-gray-800/50 rounded-2xl shadow-xl p-8 border border-gray-700 backdrop-blur-md flex flex-col items-center text-center" variants={cardVariants}>
              <ClipboardList className="w-20 h-20 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Digital Document Management</h3>
              <p className="text-gray-300">All your policy documents are securely stored and accessible digitally, anytime.</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* --- Latest News & Media Coverage (Conceptual) --- */}
      <motion.section
        className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-12 drop-shadow-lg">
            BanksCart in the News
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10">
            Stay updated with our latest achievements, media mentions, and industry insights.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div className="bg-gray-800/50 rounded-2xl shadow-xl p-8 border border-gray-700 backdrop-blur-md flex flex-col items-center text-center" variants={cardVariants}>
              <Newspaper className="w-20 h-20 text-blue-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Latest Health Insurance News</h3>
              <p className="text-gray-300">Read our articles on health trends, policy updates, and wellness tips.</p>
              <a href="#" className="mt-4 text-blue-400 hover:underline font-semibold">Read More</a>
            </motion.div>
            <motion.div className="bg-gray-800/50 rounded-2xl shadow-xl p-8 border border-gray-700 backdrop-blur-md flex flex-col items-center text-center" variants={cardVariants}>
              <Trophy className="w-20 h-20 text-yellow-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Awards & Recognition</h3>
              <p className="text-gray-300">Recognized for our innovation and customer-centric approach in the insurance sector.</p>
              <a href="#" className="mt-4 text-blue-400 hover:underline font-semibold">View Awards</a>
            </motion.div>
            <motion.div className="bg-gray-800/50 rounded-2xl shadow-xl p-8 border border-gray-700 backdrop-blur-md flex flex-col items-center text-center" variants={cardVariants}>
              <MessageSquare className="w-20 h-20 text-purple-400 mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">Media Coverage</h3>
              <p className="text-gray-300">See what leading publications are saying about BanksCart.</p>
              <a href="#" className="mt-4 text-blue-400 hover:underline font-semibold">Explore Coverage</a>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* --- Final Call to Action Section --- */}
      <motion.section
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-950 text-white overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-slow animation-delay-2000"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg"
            variants={itemVariants}
          >
            Ready to Secure Your{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
              Health & Future?
            </span>
          </motion.h2>
          <motion.p
            className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Compare plans from India's top insurers and get a personalized quote in minutes with BanksCart.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-6"
            variants={itemVariants}
          >
            <motion.button
              className="px-10 py-5 rounded-full font-bold text-xl bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg
                         hover:from-green-600 hover:to-teal-600 transition-all duration-300 ease-in-out transform hover:-translate-y-1
                         focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 flex items-center justify-center gap-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                document.getElementById('premium-calculator-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Calculator className="w-7 h-7" /> Compare Plans & Get Quote
              <ArrowRight className="w-6 h-6 ml-2" />
            </motion.button>
            <motion.button
              className="px-10 py-5 rounded-full font-bold text-xl bg-transparent border-2 border-gray-500 text-gray-300
                         hover:bg-gray-700 hover:border-gray-700 hover:text-white transition-all duration-300 ease-in-out transform hover:-translate-y-1
                         focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Our Experts
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* --- Footer & Additional Information (Conceptual) --- */}
      <footer className="bg-gray-800 text-gray-400 py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">BanksCart Health Insurance</h3>
            <p className="text-sm">Your trusted partner for health insurance comparison and purchase. We simplify insurance, so you can focus on what matters most.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400">Partner Insurers</a></li>
              <li><a href="#" className="hover:text-blue-400">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400">Sitemap</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Support & Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
              <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-blue-400">Disclaimer</a></li>
              <li><a href="#" className="hover:text-blue-400">IRDAI Public Disclosure</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-gray-700 text-sm text-gray-500">
          &copy; {new Date().getFullYear()} BanksCart. All rights reserved. <br/>
          BanksCart Insurance Brokers Pvt. Ltd. | IRDAI Reg. No. 999
        </div>
      </footer>
    </div>
  );
};

export default BanksCartHealthInsurancePage;
