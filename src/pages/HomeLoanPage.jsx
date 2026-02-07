import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, useAnimation } from "framer-motion";
import { CheckCircle, Users, ArrowRight, Banknote, Shield, UserCheck, Star, TrendingUp, BadgeCheck, Smile, ChevronDown, ChevronUp, Handshake, BookOpen, MoveRight, Home, Loader2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

// Placeholder images for avatars, banks, etc.
const teamAvatars = [
  "/images/avatar1.jpg",
  "/images/avatar2.jpg",
  "/images/avatar3.jpg",
  "/images/avatar4.jpg",
  "/images/avatar5.jpg",
];
const featuredCustomer = {
  name: "Tushar Sahani",
  photo: "/images/tushar.jpg",
  twitter: "@tushaarshna",
  quote: "Bankscart made my home loan journey seamless and stress-free!",
};
const guides = [
  { title: "Home Loan Eligibility Guide", desc: "Understand eligibility criteria and tips.", icon: <BookOpen className="text-blue-500" size={32} /> },
  { title: "Step-by-Step Application", desc: "How to apply for a home loan in India.", icon: <MoveRight className="text-green-500" size={32} /> },
  { title: "Interest Rate Trends", desc: "Latest market rates and trends.", icon: <TrendingUp className="text-amber-500" size={32} /> },
];
const journeyStages = [
  { title: "Getting Started", desc: "6+ months timeline", img: "/images/journey1.svg" },
  { title: "Searching for right home", desc: "3-6 months", img: "/images/journey2.svg" },
  { title: "Making offers", desc: "Less than 3 months", img: "/images/journey3.svg" },
];
const balanceTransferBenefits = [
  { icon: <TrendingUp className="text-blue-500" />, title: "Lower your Interest Rate", desc: "Reduce your EMI burden instantly." },
  { icon: <Banknote className="text-green-500" />, title: "Switch to better banks", desc: "Get better service and offers." },
  { icon: <Star className="text-amber-500" />, title: "Reduce 30 EMIs", desc: "Save years on your home loan." },
  { icon: <BadgeCheck className="text-blue-500" />, title: "Save upto 30 Lakhs", desc: "Maximize your savings." },
];
const faqs = [
  { q: "What is the minimum credit score required for a home loan?", a: "Most banks require a minimum CIBIL score of 700 for home loan approval." },
  { q: "What documents are required for a home loan application?", a: "You typically need ID proof, address proof, income proof, property documents, and bank statements." },
  { q: "Can joint applicants apply for a home loan?", a: "Yes, joint applications are allowed and can increase eligibility." },
  { q: "Does employer type and work experience matter for home loan eligibility?", a: "Yes, stable employment and reputed employer can improve your chances." },
  { q: "How can Bankscart assist in getting a home loan?", a: "We compare offers, negotiate rates, and provide end-to-end support for your home loan journey." },
];
const bankLogos = [
  // Add at least 12 for demo, repeat for 35+ in real
  { name: "Kotak Mahindra", logo: "/images/kotak.png" },
  { name: "HDFC", logo: "/images/hdfc.png" },
  { name: "SBI", logo: "/images/sbi.png" },
  { name: "ICICI Bank", logo: "/images/icici.png" },
  { name: "Axis Bank", logo: "/images/axis.png" },
  { name: "PNB", logo: "/images/pnb.png" },
  { name: "Bajaj Finance", logo: "/images/bajaj.png" },
  { name: "IDFC First", logo: "/images/idfc.png" },
  { name: "Bank of Baroda", logo: "/images/bob.png" },
  { name: "Canara Bank", logo: "/images/canara.png" },
  { name: "Union Bank", logo: "/images/union.png" },
  { name: "LIC HFL", logo: "/images/lic.png" },
];
const partnerBankOffers = [
  {
    name: "Kotak Mahindra",
    logo: "/images/kotak.png",
    maxLoan: "Upto 5cr",
    tenure: "Max 30 Years",
    emi: "₹ 43,867 - ₹ 47,755",
    rate: "8.65% - 9.85%",
    badge: "Popular",
    highlight: true,
    features: ["Quick Disbursal", "Low Processing Fee", "Flexible Tenure"]
  },
  {
    name: "HDFC",
    logo: "/images/hdfc.png",
    maxLoan: "6cr - 10cr",
    tenure: "Max 30 Years",
    emi: "₹ 43,391 - ₹ 47,097",
    rate: "8.50% - 9.65%",
    badge: "Best Seller",
    highlight: false,
    features: ["Doorstep Service", "Attractive Rates", "Digital Process"]
  },
  {
    name: "SBI",
    logo: "/images/sbi.png",
    maxLoan: "Upto 5cr",
    tenure: "Max 30 Years",
    emi: "₹ 41,822 - ₹ 47,261",
    rate: "8.00% - 9.70%",
    badge: "Lowest Rate",
    highlight: false,
    features: ["Government Bank", "Trusted by Millions", "Minimal Documentation"]
  },
  {
    name: "ICICI Bank",
    logo: "/images/icici.png",
    maxLoan: "Upto 7cr",
    tenure: "Max 30 Years",
    emi: "₹ 44,000 - ₹ 48,000",
    rate: "8.70% - 9.90%",
    badge: "Top Choice",
    highlight: false,
    features: ["Fast Approval", "Customizable EMI", "Dedicated Manager"]
  },
];

// Animated Counter
const AnimatedCounter = ({ value, label }) => {
  const [count, setCount] = useState(0);
  React.useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    let totalMilSecDur = 1200;
    let incrementTime = Math.abs(Math.floor(totalMilSecDur / end));
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value]);
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl md:text-4xl font-bold text-blue-600">{count}+</span>
      <span className="text-sm text-gray-500">{label}</span>
    </div>
  );
};

// FAQ Accordion
const FAQAccordion = ({ faqs }) => {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <div key={i} className="bg-[#F8FAFC] rounded-lg p-4 shadow">
          <button
            className="flex w-full justify-between items-center font-semibold text-left text-navy-900 text-base focus:outline-none"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
          >
            {faq.q}
            {open === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={open === i ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {open === i && <div className="text-gray-600 mt-2 text-sm">{faq.a}</div>}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

// Loan Calculator
const LoanCalculator = ({ openApplyModal }) => {
  const [amount, setAmount] = useState(5000000);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(8.5);
  const n = years * 12;
  const monthlyRate = rate / 12 / 100;
  const emi = amount && rate && years
    ? Math.round((amount * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1))
    : 0;
  const totalPayment = emi * n;
  const totalInterest = totalPayment - amount;

  // For pie chart
  const principalPercent = amount / totalPayment * 100;
  const interestPercent = 100 - principalPercent;

  // Reset handler
  const handleReset = () => {
    setAmount(5000000);
    setYears(20);
    setRate(8.5);
  };

  return (
    <motion.div
      className="relative bg-gradient-to-br from-white via-blue-50 to-blue-100/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-2xl mx-auto border border-blue-100 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Decorative gradient blob */}
      <motion.div
        aria-hidden="true"
        className="absolute -top-16 -right-16 w-60 h-60 bg-gradient-to-br from-blue-200/40 via-blue-100/30 to-white rounded-full blur-2xl opacity-60 z-0"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.1 }}
      />
      <div className="relative z-10">
        <h3 className="text-2xl md:text-3xl font-bold text-blue-900 mb-1 text-center">Home Loan EMI Calculator</h3>
        <div className="text-blue-500 text-center mb-8">Estimate your monthly EMI in seconds</div>

        {/* Summary Card */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <div className="flex-1 flex flex-col items-center bg-white/90 rounded-xl shadow p-4 border border-blue-100 hover:shadow-lg transition">
            <Banknote className="text-blue-500 mb-1" size={28} />
            <div className="font-bold text-blue-700 text-lg">₹{amount.toLocaleString()}</div>
            <div className="text-xs text-gray-500">Loan Amount</div>
          </div>
          <div className="flex-1 flex flex-col items-center bg-white/90 rounded-xl shadow p-4 border border-blue-100 hover:shadow-lg transition">
            <TrendingUp className="text-green-500 mb-1" size={28} />
            <div className="font-bold text-green-700 text-lg">{years} Years</div>
            <div className="text-xs text-gray-500">Tenure</div>
          </div>
          <div className="flex-1 flex flex-col items-center bg-white/90 rounded-xl shadow p-4 border border-blue-100 hover:shadow-lg transition">
            <Star className="text-amber-500 mb-1" size={28} />
            <div className="font-bold text-amber-700 text-lg">{rate}%</div>
            <div className="text-xs text-gray-500">Interest Rate</div>
          </div>
        </div>

        {/* Pie Chart Visualization */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
          <div className="flex flex-col items-center">
            <svg width="120" height="120" viewBox="0 0 36 36" className="mb-2">
              <circle cx="18" cy="18" r="16" fill="#f1f5f9" />
              <circle
                cx="18" cy="18" r="16"
                fill="none"
                stroke="#60a5fa"
                strokeWidth="3"
                strokeDasharray={`${principalPercent} ${100 - principalPercent}`}
                strokeDashoffset="25"
                strokeLinecap="round"
              />
              <circle
                cx="18" cy="18" r="16"
                fill="none"
                stroke="#f59e42"
                strokeWidth="3"
                strokeDasharray={`${interestPercent} ${100 - interestPercent}`}
                strokeDashoffset={25 + principalPercent}
                strokeLinecap="round"
              />
            </svg>
            <div className="flex gap-2 text-xs">
              <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 bg-blue-400 rounded-full"></span> Principal</span>
              <span className="flex items-center gap-1"><span className="inline-block w-3 h-3 bg-orange-400 rounded-full"></span> Interest</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Banknote className="text-blue-400" size={18} />
              <span>Principal:</span>
              <span className="font-bold text-blue-700">₹{amount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="text-orange-400" size={18} />
              <span>Total Interest:</span>
              <span className="font-bold text-orange-600">₹{totalInterest.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="text-green-400" size={18} />
              <span>Total Payment:</span>
              <span className="font-bold text-green-700">₹{totalPayment.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Loan Amount */}
        <div className="mb-6 group">
          <label className="block font-semibold mb-2 flex items-center gap-2 text-blue-700">
            <Banknote className="inline-block text-blue-400" size={22} /> Loan Amount (₹)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={1000000}
              max={10000000}
              step={100000}
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
              className="w-full accent-blue-500 h-2 rounded-lg appearance-none cursor-pointer bg-blue-100 transition-all group-hover:scale-105"
            />
            <span className="bg-blue-50 px-3 py-1 rounded-lg font-bold text-blue-700 shadow text-lg min-w-[120px] text-center">₹{amount.toLocaleString()}</span>
          </div>
        </div>
        {/* Tenure */}
        <div className="mb-6 group">
          <label className="block font-semibold mb-2 flex items-center gap-2 text-blue-700">
            <TrendingUp className="inline-block text-blue-400" size={22} /> Tenure (Years)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={1}
              max={30}
              value={years}
              onChange={e => setYears(Number(e.target.value))}
              className="w-full accent-blue-500 h-2 rounded-lg appearance-none cursor-pointer bg-blue-100 transition-all group-hover:scale-105"
            />
            <span className="bg-blue-50 px-3 py-1 rounded-lg font-bold text-blue-700 shadow text-lg min-w-[80px] text-center">{years} Years</span>
          </div>
        </div>
        {/* Interest Rate */}
        <div className="mb-8 group">
          <label className="block font-semibold mb-2 flex items-center gap-2 text-blue-700">
            <Star className="inline-block text-blue-400" size={22} /> Interest Rate (%)
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={7}
              max={12}
              step={0.05}
              value={rate}
              onChange={e => setRate(Number(e.target.value))}
              className="w-full accent-blue-500 h-2 rounded-lg appearance-none cursor-pointer bg-blue-100 transition-all group-hover:scale-105"
            />
            <span className="bg-blue-50 px-3 py-1 rounded-lg font-bold text-blue-700 shadow text-lg min-w-[80px] text-center">{rate}%</span>
          </div>
        </div>

        {/* EMI Result & Actions */}
        <div className="mt-8 text-center flex flex-col items-center gap-4">
          <div className="text-lg font-semibold text-blue-700 mb-2 flex items-center justify-center gap-2">
            <Banknote className="inline-block text-green-400" size={22} /> Estimated EMI
          </div>
          <motion.div
            className="inline-block bg-gradient-to-r from-green-400 via-blue-400 to-blue-600 text-white px-8 py-4 rounded-2xl shadow-2xl text-4xl font-extrabold tracking-tight animate-pulse hover:scale-105 transition-all"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            ₹{emi.toLocaleString()}
          </motion.div>
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            <button
              onClick={handleReset}
              className="px-6 py-2 rounded-lg bg-blue-100 text-blue-700 font-semibold shadow hover:bg-blue-200 transition"
              type="button"
            >
              Reset
            </button>
            <button
              onClick={() => openApplyModal('Home Loan - From Calculator')}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold shadow hover:from-blue-700 hover:to-blue-500 transition flex items-center gap-2"
              type="button"
            >
              <UserCheck size={18} /> Get Expert Advice
            </button>
          </div>
          <div className="text-xs text-gray-500 mt-2">* Results are estimates. For personalized advice, consult our experts.</div>
        </div>
      </div>
    </motion.div>
  );
};

// Lead Form
const LeadForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm();
  const onSubmit = async (data) => {
    await new Promise(r => setTimeout(r, 1200)); // Simulate API
    return true;
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-lg p-6 w-full md:w-96 text-gray-900">
      <h2 className="font-bold text-lg mb-2">Check Eligibility</h2>
      <input {...register("name", { required: true })} className="w-full mb-2 p-2 border rounded" placeholder="Full Name" />
      {errors.name && <div className="text-red-500 text-xs mb-1">Name is required</div>}
      <input {...register("mobile", { required: true, pattern: /^\d{10}$/ })} className="w-full mb-2 p-2 border rounded" placeholder="Mobile Number" />
      {errors.mobile && <div className="text-red-500 text-xs mb-1">Valid mobile required</div>}
      <input {...register("city", { required: true })} className="w-full mb-2 p-2 border rounded" placeholder="City" />
      {errors.city && <div className="text-red-500 text-xs mb-1">City is required</div>}
      <button disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 rounded font-semibold mt-2 flex items-center justify-center gap-2">
        {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : null}
        {isSubmitting ? "Submitting..." : "Get Offers"}
      </button>
      {isSubmitSuccessful && <div className="text-green-600 text-xs mt-2">Thank you! We'll contact you soon.</div>}
      <div className="text-xs text-gray-500 mt-2">No impact on credit score</div>
    </form>
  );
};

const HomeLoanPage = ({ openApplyModal }) => {
  const [showAllBanks, setShowAllBanks] = useState(false);
  const [bankFilter, setBankFilter] = useState("");
  const visibleBanks = showAllBanks ? bankLogos : bankLogos.slice(0, 8);
  // Scroll animation controls
  const controls = useAnimation();

  return (
    <main className="bg-gradient-to-b from-[#F8FAFC] to-white min-h-screen font-sans w-full text-navy-900">

      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-[#1B365D] to-[#2563EB] text-white py-20 px-4 flex flex-col items-center w-full overflow-hidden min-h-[600px]">
        {/* Animated background gradient blob */}
        <motion.div
          aria-hidden="true"
          className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-gradient-to-br from-blue-300/40 via-blue-200/30 to-white rounded-full blur-3xl opacity-70 z-0"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.1 }}
        />
        <div className="absolute inset-0 bg-[url('/images/hero-bg.svg')] bg-cover bg-center opacity-10 pointer-events-none" />
        <div className="max-w-7xl w-full flex flex-col md:flex-row justify-between items-center gap-12 z-10 relative">
          <div className="flex-1 flex flex-col items-start">
            {/* Badge/tagline */}
            <motion.div
              className="mb-3 px-4 py-1 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 text-blue-900 font-semibold text-sm shadow"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <span role="img" aria-label="star">⭐</span> India's Most Trusted Platform
            </motion.div>
            {/* Floating trust badge */}
            <motion.div
              className="absolute -top-8 left-0 md:left-10 flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-blue-100 text-blue-900 font-semibold text-xs z-20 animate-pulse"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <Star className="text-amber-400" size={18} />
              4.9/5 Google Reviews
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-extrabold mb-5 drop-shadow-xl leading-tight relative"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              tabIndex={0}
            >
              <span className="bg-gradient-to-r from-blue-200 via-blue-100 to-white bg-clip-text text-transparent">Unlock Your Dream Home</span>
              <br />
              <span className="inline-block relative">
                with <span className="bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">Easy Home Loans</span>
                <span className="absolute left-0 -bottom-2 w-full h-2 bg-gradient-to-r from-blue-300/60 to-blue-100/60 rounded-full blur-sm opacity-80" />
              </span>
            </motion.h1>
            <motion.p
              className="mb-8 text-lg md:text-xl text-blue-100 max-w-xl"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              Get <span className="font-bold text-white">instant home loan offers</span> from 20+ banks. Compare, choose & apply online. No impact on credit score.
            </motion.p>
            {/* CTA Button */}
            <motion.button
              onClick={() => openApplyModal('Home Loan')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white px-8 py-3 rounded-xl font-bold shadow-xl text-lg mb-8 transition-all focus:outline-none focus:ring-4 focus:ring-blue-300/50"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Get Started
              <ArrowRight className="h-5 w-5 ml-1" />
            </motion.button>
            <div className="flex gap-8 mb-6">
              <AnimatedCounter value={10000} label="Happy Customers" />
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold text-green-400">4.9★</span>
                <span className="text-sm text-blue-100">Google Rating</span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="text-3xl text-amber-400" />
                <span className="text-sm text-blue-100">20+ Banks</span>
              </div>
            </div>
            {/* Animated chevron for scroll cue */}
            <motion.div
              className="hidden md:block mt-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: 1.1, duration: 0.7, repeat: Infinity, repeatType: 'reverse' }}
            >
              <ChevronDown className="mx-auto text-blue-200 animate-bounce" size={32} />
            </motion.div>
          </div>
          {/* LeadForm with glassmorphism and animated glow */}
          <motion.div
            className="relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400/30 to-blue-200/20 blur-2xl opacity-70 rounded-2xl z-0" />
            <div className="relative z-10">
              <div className="backdrop-blur-xl bg-white/70 rounded-xl shadow-2xl p-0">
                <LeadForm />
              </div>
            </div>
          </motion.div>
        </div>
        {/* Decorative floating shape bottom right */}
        <motion.div
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-40 h-40 bg-blue-100 rounded-full blur-2xl opacity-60 z-0"
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.3 }}
        />
        <motion.div initial={{ y: 40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.7 }} className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1B365D] to-transparent pointer-events-none" />
      </section>

      {/* How it works - Enhanced */}
      <section className="relative py-20 w-full bg-gradient-to-br from-white via-blue-50 to-blue-100 overflow-hidden">
        {/* Decorative background blob */}
        <motion.div
          aria-hidden="true"
          className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-gradient-to-br from-blue-200/40 via-blue-100/30 to-white rounded-full blur-3xl opacity-60 z-0"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.1 }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight text-blue-900">How it works?</h2>
          <div className="text-blue-500 font-semibold mb-10 text-lg">Your home loan journey in 3 simple steps</div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 max-w-5xl mx-auto relative z-10">
          {/* Step 1 */}
          <motion.div
            className="flex-1 flex flex-col items-center bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            whileHover={{ scale: 1.04 }}
          >
            <div className="bg-gradient-to-tr from-blue-200 to-blue-400 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <BookOpen className="text-blue-700" size={32} />
            </div>
            <div className="text-2xl font-bold text-blue-900 mb-1">1. Expert Advisory</div>
            <div className="text-gray-600 text-base text-center">Fill out your home loan requirements in less than 2 minutes</div>
          </motion.div>
          {/* Animated connector arrow */}
          <motion.div
            className="hidden md:flex flex-col justify-center items-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <ArrowRight className="text-blue-300" size={36} />
          </motion.div>
          {/* Step 2 */}
          <motion.div
            className="flex-1 flex flex-col items-center bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            whileHover={{ scale: 1.04 }}
          >
            <div className="bg-gradient-to-tr from-blue-200 to-blue-400 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <TrendingUp className="text-blue-700" size={32} />
            </div>
            <div className="text-2xl font-bold text-blue-900 mb-1">2. Compare Top Offers</div>
            <div className="text-gray-600 text-base text-center">Our dedicated loan advisor helps you find the best offers that fit your needs</div>
          </motion.div>
          {/* Animated connector arrow */}
          <motion.div
            className="hidden md:flex flex-col justify-center items-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <ArrowRight className="text-blue-300" size={36} />
          </motion.div>
          {/* Step 3 */}
          <motion.div
            className="flex-1 flex flex-col items-center bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            whileHover={{ scale: 1.04 }}
          >
            <div className="bg-gradient-to-tr from-blue-200 to-blue-400 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
              <UserCheck className="text-blue-700" size={32} />
            </div>
            <div className="text-2xl font-bold text-blue-900 mb-1">3. Seamless Process</div>
            <div className="text-gray-600 text-base text-center">We will assign your personal loan advisor for a delightful home ownership journey</div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-[#F8FAFC] w-full">
        <h2 className="text-2xl font-bold text-center mb-2 tracking-widest text-blue-700">WHY CHOOSE US?</h2>
        <div className="text-center text-3xl md:text-4xl font-bold mb-2">The Bankscart Advantage</div>
        <div className="text-center text-gray-500 mb-8">India's most trusted home loan platform with <span className="text-blue-600 font-semibold">10k+ happy customers</span></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition">
            <Banknote className="text-blue-600 mb-2" size={36} />
            <div className="font-bold text-lg">Lowest Interest Rates</div>
            <div className="text-gray-500 text-sm">Save more with every EMI</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition">
            <Shield className="text-green-600 mb-2" size={36} />
            <div className="font-bold text-lg">Simple & Digital Process</div>
            <div className="text-gray-500 text-sm">Hassle free experience</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition">
            <TrendingUp className="text-amber-500 mb-2" size={36} />
            <div className="font-bold text-lg">Guaranteed Fast Approval</div>
            <div className="text-gray-500 text-sm">Quick disbursals, no delay</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center hover:shadow-lg transition">
            <UserCheck className="text-blue-600 mb-2" size={36} />
            <div className="font-bold text-lg">Lifetime Support</div>
            <div className="text-gray-500 text-sm">Dedicated Home Loan Expert</div>
          </div>
        </div>
      </section>

      {/* Team/Support Section */}
      <section className="py-16 bg-white w-full">
        <h2 className="text-3xl font-bold text-center mb-2">Be a part of the Bankscart Advantage</h2>
        <div className="text-center text-gray-500 mb-8">We handle everything for you</div>
        <div className="flex justify-center gap-4 mb-6">
          {teamAvatars.map((src, i) => (
            <img key={i} src={src} alt="Team Member" className="w-16 h-16 rounded-full border-2 border-blue-200 object-cover" />
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full font-medium"><CheckCircle className="text-green-500" size={20} />Support</div>
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full font-medium"><CheckCircle className="text-blue-500" size={20} />Maximum Funding</div>
          <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full font-medium"><CheckCircle className="text-amber-500" size={20} />Documentation</div>
          <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full font-medium"><CheckCircle className="text-green-500" size={20} />Best Loan Offers</div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#F8FAFC] w-full">
        <h2 className="text-2xl font-bold text-center mb-2 tracking-widest text-blue-700">WHAT PEOPLE THINK ABOUT US</h2>
        <div className="text-center text-3xl md:text-4xl font-bold mb-2">Don't just take our word for it</div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8">
          <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center max-w-md">
            <img src={featuredCustomer.photo} alt={featuredCustomer.name} className="w-20 h-20 rounded-full border-4 border-blue-200 mb-4 object-cover" />
            <div className="font-bold text-lg mb-1">{featuredCustomer.name}</div>
            <div className="text-blue-500 text-sm mb-2">{featuredCustomer.twitter}</div>
            <div className="italic text-gray-700 text-center">“{featuredCustomer.quote}”</div>
          </div>
          <motion.div initial={{ x: 40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.7 }} className="flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
              <Smile className="text-green-500" size={32} />
              <div>
                <div className="font-semibold">Super easy process!</div>
                <div className="text-gray-500 text-sm">I got my home loan approved in 3 days. The team helped at every step.</div>
                <div className="text-xs text-gray-400 mt-1">- Priya S., Mumbai</div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
              <Star className="text-amber-500" size={32} />
              <div>
                <div className="font-semibold">Best rates in the market</div>
                <div className="text-gray-500 text-sm">Compared 10+ banks and got the lowest EMI. Highly recommend!</div>
                <div className="text-xs text-gray-400 mt-1">- Rahul K., Bangalore</div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
              <UserCheck className="text-blue-500" size={32} />
              <div>
                <div className="font-semibold">Great support</div>
                <div className="text-gray-500 text-sm">The expert team answered all my queries and made the process smooth.</div>
                <div className="text-xs text-gray-400 mt-1">- Anjali M., Pune</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="py-16 bg-white w-full">
        <h2 className="text-3xl font-bold text-center mb-2">OUR OFFERINGS</h2>
        <div className="text-center text-gray-500 mb-8">What are you looking for?</div>
        <LoanCalculator openApplyModal={openApplyModal} />
      </section>

      {/* Bank Partners Section */}
      <section className="py-16 bg-[#F8FAFC] w-full">
        <h2 className="text-3xl font-bold text-center mb-2">TOP BANKS, BEST OFFERS</h2>
        <div className="text-center text-gray-500 mb-8">Our Official Partners</div>
        <div className="max-w-5xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Search banks..."
            value={bankFilter}
            onChange={e => setBankFilter(e.target.value)}
            className="w-full md:w-1/2 mx-auto block p-2 border rounded mb-4"
          />
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {visibleBanks.filter(b => b.name.toLowerCase().includes(bankFilter.toLowerCase())).map((bank, i) => (
              <motion.div whileHover={{ scale: 1.05 }} key={i} className="bg-white rounded-lg shadow p-2 flex flex-col items-center transition cursor-pointer">
                <img src={bank.logo} alt={bank.name} className="w-16 h-10 object-contain mb-1" />
                <span className="text-xs font-semibold text-navy-900 text-center">{bank.name}</span>
              </motion.div>
            ))}
          </div>
          {!showAllBanks && (
            <button
              className="mx-auto mt-6 px-8 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition block"
              onClick={() => setShowAllBanks(true)}
            >
              Show More Banks
            </button>
          )}
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {partnerBankOffers.map((bank, i) => (
            <motion.div
              whileHover={{ scale: 1.02 }} key={i}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center justify-between border border-gray-200 transition-all group hover:shadow-2xl hover:border-blue-600 relative cursor-pointer"
              onClick={() => openApplyModal(`Home Loan - ${bank.name}`)}
            >
              <div className="flex-1 flex flex-col md:flex-row items-center gap-4">
                <Home className="text-blue-600" size={32} />
                <span className="text-xl font-bold text-navy-900">{bank.name}</span>
              </div>
              <div className="flex-1 flex flex-col md:flex-row justify-between items-center w-full md:w-auto mt-6 md:mt-0 md:ml-8 gap-4">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-xs text-gray-500">Max Loan Amount</span>
                  <span className="text-lg font-bold text-navy-900">{bank.maxLoan}</span>
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-xs text-gray-500">Max Tenure</span>
                  <span className="text-lg font-bold text-navy-900">{bank.tenure}</span>
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-xs text-gray-500">Monthly EMI</span>
                  <span className="text-lg font-bold text-navy-900">{bank.emi}</span>
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-xs text-gray-500">Rate of Interest</span>
                  <span className="text-lg font-bold text-navy-900">{bank.rate}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Journey Stages Section */}
      <section className="py-16 bg-white w-full">
        <h2 className="text-3xl font-bold text-center mb-2">A one-stop solution for your home loan needs</h2>
        <div className="text-center text-gray-500 mb-8">Whether you're just getting started or ready to make an offer, we're here to help</div>
        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto">
          {journeyStages.map((stage, i) => (
            <motion.div whileHover={{ scale: 1.03 }} key={i} className="bg-[#F8FAFC] rounded-xl shadow p-6 flex flex-col items-center">
              <img src={stage.img} alt={stage.title} className="w-24 h-24 mb-4" />
              <div className="font-bold text-lg mb-1">{stage.title}</div>
              <div className="text-gray-500 text-sm mb-2">{stage.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Guides Section */}
      <section className="py-16 bg-[#F8FAFC] w-full">
        <h2 className="text-3xl font-bold text-center mb-2">Our Top Guides</h2>
        <div className="text-center text-gray-500 mb-8">Learn more about home loan eligibility and explore the application process</div>
        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto">
          {guides.map((guide, i) => (
            <motion.div whileHover={{ scale: 1.04 }} key={i} className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
              {guide.icon}
              <div className="font-bold text-lg mb-1 mt-2">{guide.title}</div>
              <div className="text-gray-500 text-sm mb-2 text-center">{guide.desc}</div>
              <a href="#" className="text-blue-600 font-semibold flex items-center gap-1 hover:underline">Read More <ArrowRight size={16} /></a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Balance Transfer Section */}
      <section className="py-16 bg-white w-full">
        <h2 className="text-3xl font-bold text-center mb-2">What we also do</h2>
        <div className="text-center text-gray-500 mb-8">We help you switch your loan account for better savings</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {balanceTransferBenefits.map((b, i) => (
            <motion.div whileHover={{ scale: 1.04 }} key={i} className="bg-[#F8FAFC] rounded-xl shadow p-6 flex flex-col items-center">
              {b.icon}
              <div className="font-bold text-lg mb-1 mt-2">{b.title}</div>
              <div className="text-gray-500 text-sm mb-2 text-center">{b.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Support/CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-100 to-blue-50 w-full">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto">
          <img src="/images/consultation-hero.svg" alt="Consultation" className="w-64 h-64 object-contain" />
          <div>
            <h2 className="text-3xl font-bold mb-2">Confused About Home Loans? We're Here to HELP!</h2>
            <div className="text-gray-500 mb-4">Get detailed answers to the most frequently asked questions, tailored for your peace of mind.</div>
            <a href="#faq" className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-md flex items-center gap-2 text-lg font-semibold hover:scale-105 transition">Ask a Question <ArrowRight size={20} /></a>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-white w-full">
        <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          <FAQAccordion faqs={faqs} />
        </div>
      </section>
    </main>
  );
}

export default HomeLoanPage;
