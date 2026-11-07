import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  CreditCard,
  Banknote,
  ArrowRight,
  Lock,
  Percent,
  CheckCircle2,
  Building2,
  ChevronRight,
  Home as HomeIcon,
  Sparkles,
  Info,
  Calendar,
  Layers,
  Zap,
  TrendingUp
} from 'lucide-react';
import Hero3DCard from './Hero3DCard';
import { 
  calculateEMI, 
  calculateTotalAmount, 
  calculateTotalInterest, 
  formatCurrency 
} from '../../utils/calculations';

interface HeroSectionProps {
  openApplyModal?: (loanType?: string) => void;
  openEligibilityModal?: (loanType?: string) => void;
  openCibilModal?: () => void;
}

export default function HeroSection({
  openApplyModal,
  openEligibilityModal,
  openCibilModal
}: HeroSectionProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'loan' | 'homeloan' | 'cibil' | 'card'>('loan');

  // Personal Loan parameters
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [tenureYears, setTenureYears] = useState<number>(5);

  // Home Loan parameters
  const [homeLoanAmount, setHomeLoanAmount] = useState<number>(3500000);
  const [homeTenureYears, setHomeTenureYears] = useState<number>(20);

  // CIBIL & Credit Card parameters
  const [phone, setPhone] = useState<string>('');
  const [cardCategory, setCardCategory] = useState<string>('cashback');

  // Real-time calculation logic adhering to Rule 9 (No dummy math)
  const personalInterestRate = 10.49; // Indicative Tier-1 personal loan benchmark
  const personalTenureMonths = tenureYears * 12;
  const personalEMI = useMemo(() => {
    return calculateEMI(loanAmount, personalInterestRate, personalTenureMonths);
  }, [loanAmount, personalTenureMonths]);

  const personalTotalRepayment = useMemo(() => {
    return calculateTotalAmount(personalEMI, personalTenureMonths);
  }, [personalEMI, personalTenureMonths]);

  const personalTotalInterest = useMemo(() => {
    return calculateTotalInterest(personalTotalRepayment, loanAmount);
  }, [personalTotalRepayment, loanAmount]);

  // Home Loan Real-time calculation
  const homeInterestRate = 8.35; // SBI/HDFC Repo-linked EBLR benchmark
  const homeTenureMonths = homeTenureYears * 12;
  const homeEMI = useMemo(() => {
    return calculateEMI(homeLoanAmount, homeInterestRate, homeTenureMonths);
  }, [homeLoanAmount, homeTenureMonths]);

  const homeTotalRepayment = useMemo(() => {
    return calculateTotalAmount(homeEMI, homeTenureMonths);
  }, [homeEMI, homeTenureMonths]);

  const homeTotalInterest = useMemo(() => {
    return calculateTotalInterest(homeTotalRepayment, homeLoanAmount);
  }, [homeTotalRepayment, homeLoanAmount]);

  // Handle widget action trigger
  const handleWidgetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'loan') {
      if (openEligibilityModal) {
        openEligibilityModal('Personal Loan');
      } else if (openApplyModal) {
        openApplyModal('Personal Loan');
      } else {
        navigate('/eligibility');
      }
    } else if (activeTab === 'homeloan') {
      if (openEligibilityModal) {
        openEligibilityModal('Home Loan');
      } else if (openApplyModal) {
        openApplyModal('Home Loan');
      } else {
        navigate('/loans/home-loan');
      }
    } else if (activeTab === 'cibil') {
      if (openCibilModal) {
        openCibilModal();
      } else {
        navigate('/credit-score');
      }
    } else if (activeTab === 'card') {
      navigate('/cards/credit');
    }
  };

  // Top Indian partner commercial banks with verified logos
  const partnerBanks = [
    { id: 'sbi', name: 'State Bank of India', logo: '/logos/sbi.png', rate: '8.35%' },
    { id: 'hdfc', name: 'HDFC Bank', logo: '/logos/hdfc.png', rate: '8.50%' },
    { id: 'icici', name: 'ICICI Bank', logo: '/logos/icici.png', rate: '8.55%' },
    { id: 'axis', name: 'Axis Bank', logo: '/logos/axis.png', rate: '8.75%' },
    { id: 'bob', name: 'Bank of Baroda', logo: '/logos/bob.png', rate: '8.40%' },
    { id: 'pnb', name: 'Punjab National Bank', logo: '/logos/pnb.png', rate: '8.40%' },
    { id: 'kotak', name: 'Kotak Mahindra', logo: '/logos/kotak.png', rate: '8.75%' },
    { id: 'tata-capital', name: 'Tata Capital', logo: '/logos/tata.png', rate: '10.99%' },
  ];

  // Quick chips for instant amount selection
  const personalLoanChips = [100000, 300000, 500000, 1000000, 2500000];
  const homeLoanChips = [2500000, 5000000, 7500000, 10000000, 20000000];

  return (
    <section className="relative bg-[#0A0F1D] text-white pt-24 pb-16 lg:pt-28 lg:pb-24 font-ibm overflow-hidden border-b border-slate-800/80">
      {/* 3D Geometric Lighting & Ambient Depth Accents */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-blue-700/15 to-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[420px] h-[420px] bg-gradient-to-tr from-emerald-600/10 to-teal-800/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle Spatial Mesh Grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '48px 48px'
        }}
      />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* LEFT COLUMN: Institutional Authority & Conversion Narrative */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Live Indicator Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-900/90 border border-slate-700/80 rounded-full text-xs font-semibold text-slate-200 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>India&apos;s Independent Multi-Bank Loan Comparison Platform</span>
              <span className="text-[10px] text-amber-400 font-mono font-bold pl-1 border-l border-slate-700">
                RBI 2026
              </span>
            </div>

            {/* High-Impact Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-bold tracking-tight text-white leading-[1.16]">
              Compare Bank Loan Rates &amp; <br className="hidden sm:inline" />
              Apply with <span className="text-amber-400">Guaranteed Transparency</span>
            </h1>

            {/* Subheading with Clear Financial Context */}
            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
              Evaluate verified interest rates, reducing-balance APRs, and processing charges across 30+ RBI-regulated commercial banks. 100% paperless digital onboarding, free bureau diagnostics, and zero hidden margins.
            </p>

            {/* Primary & Secondary Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                type="button"
                onClick={() => openEligibilityModal ? openEligibilityModal('Personal Loan') : navigate('/eligibility')}
                className="px-6 py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-semibold rounded-xl shadow-lg shadow-amber-900/20 hover:shadow-xl hover:shadow-amber-900/30 transition-all duration-200 flex items-center gap-2 group text-sm sm:text-base cursor-pointer"
              >
                <span>Check Instant Eligibility</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('loan-comparison-matrix');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/banks');
                  }
                }}
                className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 font-semibold rounded-xl border border-slate-700 hover:border-slate-600 transition-colors text-sm sm:text-base cursor-pointer flex items-center gap-2"
              >
                <span>Compare Bank Rates</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Core Verification Badges (4 Institutional Pillars) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/90 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span>30+ Scheduled Banks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span>256-Bit SSL Security</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <Percent className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span>Zero Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span>Soft Bureau Inquiry</span>
              </div>
            </div>

            {/* Embedded 3D Card Showcase (Desktop Placement in Left/Middle Flow) */}
            <div className="hidden lg:block pt-3">
              <Hero3DCard 
                activeTab={activeTab}
                loanAmount={activeTab === 'homeloan' ? homeLoanAmount : loanAmount}
                tenureYears={activeTab === 'homeloan' ? homeTenureYears : tenureYears}
                monthlyEMI={activeTab === 'homeloan' ? homeEMI : personalEMI}
                selectedCardCategory={cardCategory}
              />
            </div>

          </div>

          {/* RIGHT COLUMN: Smart Loan Match Experience & EMI Calculator */}
          <div className="lg:col-span-6 w-full">
            <div className="bg-white rounded-2xl p-6 sm:p-7 text-slate-900 shadow-2xl border border-slate-200/90 relative">
              
              {/* Product Selector Navigation Tabs */}
              <div className="grid grid-cols-4 border-b border-slate-200 pb-3 mb-6 gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('loan')}
                  className={`pb-2.5 text-xs sm:text-xs font-semibold border-b-2 text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    activeTab === 'loan'
                      ? 'border-[#1E3A8A] text-[#1E3A8A]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <Banknote className="w-4 h-4" />
                  <span className="truncate">Personal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('homeloan')}
                  className={`pb-2.5 text-xs sm:text-xs font-semibold border-b-2 text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    activeTab === 'homeloan'
                      ? 'border-[#1E3A8A] text-[#1E3A8A]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <HomeIcon className="w-4 h-4" />
                  <span className="truncate">Home Loan</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('cibil')}
                  className={`pb-2.5 text-xs sm:text-xs font-semibold border-b-2 text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    activeTab === 'cibil'
                      ? 'border-[#1E3A8A] text-[#1E3A8A]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span className="truncate">Free CIBIL</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('card')}
                  className={`pb-2.5 text-xs sm:text-xs font-semibold border-b-2 text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                    activeTab === 'card'
                      ? 'border-[#1E3A8A] text-[#1E3A8A]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="truncate">Cards</span>
                </button>
              </div>

              {/* Form Tab Contents */}
              <form onSubmit={handleWidgetSubmit} className="space-y-5">
                <AnimatePresence mode="wait">
                  
                  {/* TAB 1: PERSONAL LOAN CALCULATOR & MATCH */}
                  {activeTab === 'loan' && (
                    <motion.div
                      key="loan"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      {/* Amount Slider Header */}
                      <div className="flex justify-between items-baseline">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Loan Amount Required
                        </label>
                        <span className="text-xl font-extrabold text-slate-900 font-mono tabular-nums">
                          {formatCurrency(loanAmount)}
                        </span>
                      </div>

                      {/* Slider Input */}
                      <input
                        type="range"
                        min="50000"
                        max="4000000"
                        step="25000"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A] focus:outline-none"
                        aria-label="Select loan amount"
                      />

                      {/* Preset Chips */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-semibold">
                        <span className="text-slate-400 text-[10px] uppercase font-bold shrink-0">Quick:</span>
                        {personalLoanChips.map((chipVal) => (
                          <button
                            key={chipVal}
                            type="button"
                            onClick={() => setLoanAmount(chipVal)}
                            className={`px-2 py-1 rounded border transition-colors ${
                              loanAmount === chipVal 
                                ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold' 
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            ₹{chipVal >= 100000 ? `${chipVal / 100000}L` : `${chipVal / 1000}k`}
                          </button>
                        ))}
                      </div>

                      {/* Tenure Selector */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-700">
                          <span>Tenure Horizon</span>
                          <span className="font-mono text-slate-900">{tenureYears} Years ({personalTenureMonths} Months)</span>
                        </div>
                        <div className="grid grid-cols-5 gap-1.5 text-xs font-bold">
                          {[1, 2, 3, 4, 5].map((yr) => (
                            <button
                              key={yr}
                              type="button"
                              onClick={() => setTenureYears(yr)}
                              className={`py-1.5 rounded-lg border text-center transition-all ${
                                tenureYears === yr
                                  ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-xs'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {yr} {yr === 1 ? 'Yr' : 'Yrs'}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Live Calculated Financial Breakdown */}
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/90 space-y-2 text-xs">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                          <div>
                            <span className="text-slate-500 font-medium block text-[11px]">Indicative Interest Rate</span>
                            <span className="text-slate-900 font-bold font-mono">10.49% p.a. (Reducing)</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-500 font-medium block text-[11px]">Calculated Monthly EMI</span>
                            <span className="text-base font-extrabold font-mono text-emerald-700 tabular-nums">
                              {formatCurrency(personalEMI)}<span className="text-xs font-normal text-slate-500">/mo</span>
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-medium">
                          <div>
                            <span>Total Interest: </span>
                            <strong className="text-slate-900 font-mono font-bold tabular-nums">
                              {formatCurrency(personalTotalInterest)}
                            </strong>
                          </div>
                          <div className="text-right">
                            <span>Total Repayment: </span>
                            <strong className="text-slate-900 font-mono font-bold tabular-nums">
                              {formatCurrency(personalTotalRepayment)}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: HOME LOAN CALCULATOR & MATCH */}
                  {activeTab === 'homeloan' && (
                    <motion.div
                      key="homeloan"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      {/* Amount Slider Header */}
                      <div className="flex justify-between items-baseline">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                          Home Loan Amount
                        </label>
                        <span className="text-xl font-extrabold text-slate-900 font-mono tabular-nums">
                          {formatCurrency(homeLoanAmount)}
                        </span>
                      </div>

                      {/* Slider Input */}
                      <input
                        type="range"
                        min="1000000"
                        max="50000000"
                        step="500000"
                        value={homeLoanAmount}
                        onChange={(e) => setHomeLoanAmount(Number(e.target.value))}
                        className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A] focus:outline-none"
                        aria-label="Select home loan amount"
                      />

                      {/* Preset Chips */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-semibold">
                        <span className="text-slate-400 text-[10px] uppercase font-bold shrink-0">Quick:</span>
                        {homeLoanChips.map((chipVal) => (
                          <button
                            key={chipVal}
                            type="button"
                            onClick={() => setHomeLoanAmount(chipVal)}
                            className={`px-2 py-1 rounded border transition-colors ${
                              homeLoanAmount === chipVal 
                                ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold' 
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            ₹{chipVal >= 10000000 ? `${chipVal / 10000000}Cr` : `${chipVal / 100000}L`}
                          </button>
                        ))}
                      </div>

                      {/* Tenure Selector */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-700">
                          <span>Repayment Tenure</span>
                          <span className="font-mono text-slate-900">{homeTenureYears} Years ({homeTenureMonths} Months)</span>
                        </div>
                        <div className="grid grid-cols-5 gap-1.5 text-xs font-bold">
                          {[10, 15, 20, 25, 30].map((yr) => (
                            <button
                              key={yr}
                              type="button"
                              onClick={() => setHomeTenureYears(yr)}
                              className={`py-1.5 rounded-lg border text-center transition-all ${
                                homeTenureYears === yr
                                  ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-xs'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {yr} Yrs
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Live Calculated Financial Breakdown */}
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/90 space-y-2 text-xs">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                          <div>
                            <span className="text-slate-500 font-medium block text-[11px]">Benchmark Repo EBLR</span>
                            <span className="text-slate-900 font-bold font-mono">From 8.35% p.a.</span>
                          </div>
                          <div className="text-right">
                            <span className="text-slate-500 font-medium block text-[11px]">Calculated Monthly EMI</span>
                            <span className="text-base font-extrabold font-mono text-emerald-700 tabular-nums">
                              {formatCurrency(homeEMI)}<span className="text-xs font-normal text-slate-500">/mo</span>
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-medium">
                          <div>
                            <span>Total Interest: </span>
                            <strong className="text-slate-900 font-mono font-bold tabular-nums">
                              {formatCurrency(homeTotalInterest)}
                            </strong>
                          </div>
                          <div className="text-right">
                            <span>Total Repayment: </span>
                            <strong className="text-slate-900 font-mono font-bold tabular-nums">
                              {formatCurrency(homeTotalRepayment)}
                            </strong>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: FREE CIBIL SCORE CHECK */}
                  {activeTab === 'cibil' && (
                    <motion.div
                      key="cibil"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200/80 flex items-center justify-between">
                        <div>
                          <span className="text-xs font-bold text-emerald-900 block">Instant Bureau Diagnostic</span>
                          <span className="text-[11px] text-emerald-700">Official Credit Health Analysis</span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-mono font-bold text-emerald-900 block">300 – 900</span>
                          <span className="text-[10px] text-emerald-700 uppercase font-semibold">CIBIL Scale</span>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="hero-phone-input" className="block text-xs font-semibold text-slate-700 mb-1.5">
                          10-Digit Mobile Number (Linked to Aadhaar/PAN)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-medium">+91</span>
                          <input
                            id="hero-phone-input"
                            type="tel"
                            required
                            placeholder="Enter 10-digit number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Soft inquiry only — Will not lower your credit score</span>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 4: CREDIT CARD SELECTOR */}
                  {activeTab === 'card' && (
                    <motion.div
                      key="card"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.15 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <h3 className="text-sm font-bold text-slate-900">Choose Primary Card Privilege</h3>
                        <p className="text-xs text-slate-600">Filter through 50+ co-branded and bank cards with zero joining fees.</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                        {[
                          { id: 'cashback', label: 'Cashback & Fuel', sub: 'Up to 5% flat' },
                          { id: 'travel', label: 'Travel & Lounge', sub: 'Complimentary visits' },
                          { id: 'rewards', label: 'Reward Points', sub: 'Accelerated multiplier' },
                          { id: 'lifetime-free', label: 'Lifetime Free', sub: 'Zero annual charges' }
                        ].map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setCardCategory(cat.id)}
                            className={`p-3 text-left rounded-lg border transition-all cursor-pointer ${
                              cardCategory === cat.id
                                ? 'border-[#1E3A8A] bg-blue-50/60 text-[#1E3A8A] shadow-xs'
                                : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                            }`}
                          >
                            <span className="block font-bold">{cat.label}</span>
                            <span className="text-[10px] text-slate-500 font-normal">{cat.sub}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Primary Conversion CTA Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-amber-700 hover:bg-amber-800 text-white rounded-xl font-bold text-sm sm:text-base transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
                >
                  <span>
                    {activeTab === 'loan' && 'Check Instant Loan Offers'}
                    {activeTab === 'homeloan' && 'Check Home Loan Eligibility'}
                    {activeTab === 'cibil' && 'Get Free Credit Score & Report'}
                    {activeTab === 'card' && 'View Matching Credit Cards'}
                  </span>
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>

              {/* Security & Regulatory Footnote */}
              <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  Bank-Grade 256-Bit SSL
                </span>
                <span className="font-semibold text-slate-700">RBI Regulated Banks</span>
              </div>
            </div>

            {/* Mobile 3D Card Display */}
            <div className="block lg:hidden mt-6">
              <Hero3DCard 
                activeTab={activeTab}
                loanAmount={activeTab === 'homeloan' ? homeLoanAmount : loanAmount}
                tenureYears={activeTab === 'homeloan' ? homeTenureYears : tenureYears}
                monthlyEMI={activeTab === 'homeloan' ? homeEMI : personalEMI}
                selectedCardCategory={cardCategory}
              />
            </div>
          </div>

        </div>

        {/* BOTTOM PARTNER COMMERCIAL BANKS STRIP WITH VERIFIED LOGOS */}
        <div className="mt-14 pt-8 border-t border-slate-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider text-center sm:text-left">
              Official Lending Partners &amp; Scheduled Commercial Banks
            </p>
            <Link 
              to="/banks" 
              className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center justify-center sm:justify-start gap-1"
            >
              <span>Explore All 22+ Banks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {partnerBanks.map((bank) => (
              <Link
                key={bank.id}
                to={`/bank-details/${bank.id}`}
                className="group flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-800/80 transition-all text-center shadow-xs"
              >
                <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center mb-1.5 group-hover:scale-105 transition-transform">
                  <img
                    src={bank.logo}
                    alt={`${bank.name} logo`}
                    width="28"
                    height="28"
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-200 block truncate max-w-full">
                  {bank.name.replace('State Bank of India', 'SBI').replace('Punjab National Bank', 'PNB')}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono font-medium mt-0.5">
                  From {bank.rate}
                </span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
