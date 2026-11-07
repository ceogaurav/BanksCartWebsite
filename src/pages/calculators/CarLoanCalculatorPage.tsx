import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Car,
  Calculator,
  TrendingUp,
  Wallet,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Info,
  Building2,
  Percent,
  Layers,
  HelpCircle,
  ChevronDown,
  Award,
  Clock,
  Gauge,
  Check
} from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';

interface CarLoanCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
  openEligibilityModal?: () => void;
  openCibilModal?: () => void;
}

interface BankRateItem {
  bank: string;
  rate: string;
  processingFee: string;
  maxAmount: string;
  maxTenure: string;
  highlight: string;
}

const TOP_CAR_LOAN_BANKS: BankRateItem[] = [
  {
    bank: 'State Bank of India (SBI)',
    rate: '8.75% - 9.80% p.a.',
    processingFee: 'Nil to 0.50% + GST',
    maxAmount: 'Up to 90% On-Road Price',
    maxTenure: 'Up to 7 Years',
    highlight: 'Lowest repo-linked markups with zero foreclosure penalties'
  },
  {
    bank: 'HDFC Bank',
    rate: '8.95% - 10.50% p.a.',
    processingFee: '0.50% (Min ₹3,500) + GST',
    maxAmount: 'Up to 100% On-Road Funding',
    maxTenure: 'Up to 7 Years',
    highlight: '10-second instant approval for existing pre-approved account holders'
  },
  {
    bank: 'ICICI Bank',
    rate: '9.00% - 11.00% p.a.',
    processingFee: '0.50% + GST',
    maxAmount: 'Up to 100% Ex-Showroom',
    maxTenure: 'Up to 8 Years',
    highlight: 'Paperless digital sanction with flexible step-up repayment structures'
  },
  {
    bank: 'Bank of Baroda',
    rate: '8.80% - 10.25% p.a.',
    processingFee: '0.25% (Min ₹1,000) + GST',
    maxAmount: 'Up to 90% On-Road Price',
    maxTenure: 'Up to 7 Years',
    highlight: 'Direct linkage to BRLLR benchmark with zero prepayment charges'
  },
  {
    bank: 'Axis Bank',
    rate: '9.10% - 11.50% p.a.',
    processingFee: '0.50% (Min ₹3,500) + GST',
    maxAmount: 'Up to 100% On-Road Price',
    maxTenure: 'Up to 8 Years',
    highlight: 'Special concessions on electric vehicles (EVs) and hybrid models'
  }
];

const FAQS = [
  {
    q: 'How is a Car Loan EMI calculated in India?',
    a: 'Car loan EMIs are computed using the reducing balance method: E = [P × r × (1+r)ⁿ] / [(1+r)ⁿ – 1], where P is the sanctioned loan amount (On-Road Price minus Down Payment), r is the monthly interest rate, and n is the tenure in months. In this model, you pay interest strictly on the outstanding balance rather than the flat original sum, saving substantial money.'
  },
  {
    q: 'What is the ideal down payment percentage for a new car loan?',
    a: 'Financial planners recommend paying at least 15% to 20% of the total on-road price as down payment. A higher down payment reduces your loan principal, lowers your monthly EMI burden, and prevents the risk of becoming "underwater" (owing more on your loan than the depreciated market value of the vehicle).'
  },
  {
    q: 'What is the maximum loan tenure available for car loans in India?',
    a: 'Most premier Indian banks (such as SBI, HDFC, and ICICI) offer repayment tenures ranging from 1 year to 7 years (12 to 84 months), with select institutions offering up to 8 years for electric vehicles or premium luxury segments.'
  },
  {
    q: 'Can I prepay or foreclose my car loan early? Are there penalty charges?',
    a: 'For individual borrowers on floating-rate auto loans, RBI rules mandate zero foreclosure penalties. For fixed-rate car loans, some lenders may levy a foreclosure fee of 2% to 5% + GST if closed before maturity, often with a mandatory 6 to 12 month lock-in period.'
  },
  {
    q: 'What is the difference between On-Road Price and Ex-Showroom Price in auto financing?',
    a: 'Ex-showroom price is the base manufacturing cost of the vehicle plus GST. The on-road price is the final turnkey cost required to legally drive the car on Indian roads, including RTO registration fees, road tax, mandatory motor insurance, FASTag, and municipal charges. Banks typically finance 85% to 100% of on-road prices.'
  },
  {
    q: 'What minimum CIBIL score is required for immediate car loan approval?',
    a: 'A CIBIL credit score of 720 and above qualifies you for the lowest benchmark interest rates (starting ~8.75% p.a.) and rapid paperless approval. Scores between 650 and 719 can still secure approval from private lenders and captive auto NBFCs, though they may require a slightly higher interest rate markup or larger down payment.'
  }
];

export const CarLoanCalculatorPage: React.FC<CarLoanCalculatorPageProps> = ({
  openApplyModal,
  openEligibilityModal,
  openCibilModal
}) => {
  // Calculator States
  const [carPrice, setCarPrice] = useState<number>(1000000); // ₹10 Lakhs
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20); // 20%
  const [interestRate, setInterestRate] = useState<number>(8.85); // 8.85% p.a.
  const [loanTenureYears, setLoanTenureYears] = useState<number>(5); // 5 years

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Financial Calculations
  const { downPaymentAmount, loanAmount, monthlyEmi, totalInterest, totalPayment, principalPercent, interestPercent } =
    useMemo(() => {
      const dp = Math.round(carPrice * (downPaymentPercent / 100));
      const p = Math.max(0, carPrice - dp);
      const r = interestRate / (12 * 100);
      const n = loanTenureYears * 12;

      if (p <= 0 || n <= 0 || r <= 0) {
        return {
          downPaymentAmount: dp,
          loanAmount: p,
          monthlyEmi: 0,
          totalInterest: 0,
          totalPayment: 0,
          principalPercent: 100,
          interestPercent: 0
        };
      }

      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const roundedEmi = Math.round(emi);
      const totalPay = roundedEmi * n;
      const totalInt = Math.max(0, totalPay - p);

      const pPercent = totalPay > 0 ? Math.round((p / totalPay) * 100) : 100;
      const iPercent = 100 - pPercent;

      return {
        downPaymentAmount: dp,
        loanAmount: p,
        monthlyEmi: roundedEmi,
        totalInterest: totalInt,
        totalPayment: totalPay,
        principalPercent: pPercent,
        interestPercent: iPercent
      };
    }, [carPrice, downPaymentPercent, interestRate, loanTenureYears]);

  const handleApplyClick = (bankName?: string) => {
    if (openApplyModal) {
      openApplyModal(bankName ? `Car Loan - ${bankName}` : `Car Loan (₹${(loanAmount / 100000).toFixed(1)}L)`);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Structured Data Schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bankscart.com/' },
      { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.bankscart.com/calculators' },
      { '@type': 'ListItem', position: 3, name: 'Car Loan EMI Calculator', item: 'https://www.bankscart.com/car-loan-calculator' }
    ]
  };

  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Car Loan EMI Calculator India',
    description: 'Calculate monthly car loan EMIs, interest outflow, and total borrowing cost based on current Indian bank interest rates on BanksCart.',
    url: 'https://www.bankscart.com/car-loan-calculator',
    provider: {
      '@type': 'Organization',
      name: 'BanksCart',
      url: 'https://www.bankscart.com'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900 pt-4 sm:pt-6 pb-20">
      <Helmet>
        <html lang="en-IN" />
        <title>Car Loan EMI Calculator: Estimate Monthly Payments & Interest | BanksCart</title>
        <meta
          name="description"
          content="Calculate car loan monthly EMIs, down payments, total interest outgo, and amortization schedule for new & used cars from SBI, HDFC, ICICI, and Axis Bank."
        />
        <link rel="canonical" href="https://www.bankscart.com/car-loan-calculator" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Car Loan EMI Calculator: Estimate Monthly Payments & Interest | BanksCart" />
        <meta
          property="og:description"
          content="Calculate car loan monthly EMIs, down payments, total interest outgo, and amortization schedule for new & used cars from SBI, HDFC, ICICI, and Axis Bank."
        />
        <meta property="og:url" content="https://www.bankscart.com/car-loan-calculator" />
        <meta property="og:site_name" content="BanksCart" />
        <meta property="og:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Car Loan EMI Calculator: Estimate Monthly Payments & Interest | BanksCart" />
        <meta
          name="twitter:description"
          content="Calculate car loan monthly EMIs, down payments, total interest outgo, and amortization schedule for new & used cars from SBI, HDFC, ICICI, and Axis Bank."
        />
        <meta name="twitter:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(financialProductSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Breadcrumb Navigation - Aligned to max-w-7xl */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <Breadcrumb path={['Home', 'Calculators', 'Car Loan EMI Calculator']} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14 mt-4">

        {/* ==================== HERO SECTION ==================== */}
        <header className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl text-white p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden border border-blue-900/60">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-blue-200 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
              <Car className="w-3.5 h-3.5 text-amber-400" />
              Automotive Financing Planner • Verified 2026
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Car Loan EMI Calculator: Estimate Monthly Payments
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              Plan your vehicle purchase with clarity. Calculate your monthly installments, customize down payment ratios, assess total interest obligations, and compare car loan rates across top Indian scheduled banks with zero credit impact.
            </p>

            {/* 4 Key Statistics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2 pb-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">Starting Rates</div>
                <div className="text-lg sm:text-2xl font-black text-amber-300 mt-1 tabular-nums">From 8.75%</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Reducing balance p.a.</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">Loan Tenures</div>
                <div className="text-lg sm:text-2xl font-black text-white mt-1 tabular-nums">Up to 8 Yrs</div>
                <div className="text-[11px] text-slate-300 mt-0.5">12 to 96 Months</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">On-Road Funding</div>
                <div className="text-lg sm:text-2xl font-black text-white mt-1 tabular-nums">Up to 100%</div>
                <div className="text-[11px] text-slate-300 mt-0.5">For prime applicants</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">Disbursal Window</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-400 mt-1">Under 24 Hrs</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Digital KYC verification</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={() => handleApplyClick()}
                className="bg-amber-700 hover:bg-amber-800 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-amber-700/30 transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <span>Apply for Car Loan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/loans/car"
                className="bg-white/15 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer backdrop-blur-sm"
              >
                <Building2 className="w-4 h-4 text-amber-300" />
                <span>Explore Car Loan Guide</span>
              </Link>
              {openCibilModal && (
                <button
                  type="button"
                  onClick={openCibilModal}
                  className="text-blue-200 hover:text-white px-4 py-3.5 text-xs sm:text-sm font-semibold underline-offset-4 hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Free CIBIL Score Check</span>
                </button>
              )}
            </div>

            {/* Trust Badges Strip */}
            <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-4 sm:gap-8 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Covers Ex-Showroom + RTO + Insurance
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero Prepayment Fees on Floating Rates
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Special Concessions for Electric Vehicles
              </span>
            </div>
          </div>
        </header>

        {/* ==================== THE CALCULATOR WIDGET ==================== */}
        <section aria-labelledby="calculator-heading" className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-blue-900 font-bold text-xs tracking-wider uppercase">
              <Calculator className="w-4 h-4 text-blue-700" />
              Real-Time EMI Simulator
            </div>
            <h2 id="calculator-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Interactive Car Loan Calculator
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Adjust your target car budget, down payment share, interest rate, and tenure to discover your exact monthly installment and total financing expense.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Controls: Sliders and Presets */}
            <div className="lg:col-span-7 space-y-6">
              {/* Car On-Road Price Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label htmlFor="price-slider" className="font-semibold text-slate-800">
                    Target On-Road Car Price
                  </label>
                  <div className="bg-blue-50 text-blue-900 px-3.5 py-1 rounded-lg border border-blue-200 font-bold text-base tabular-nums">
                    ₹{carPrice.toLocaleString('en-IN')}
                  </div>
                </div>
                <input
                  id="price-slider"
                  type="range"
                  min={200000}
                  max={10000000}
                  step={25000}
                  value={carPrice}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
                />
                <div className="flex justify-between text-[11px] text-slate-500 tabular-nums">
                  <span>₹2 Lakhs</span>
                  <span>₹50 Lakhs</span>
                  <span>₹1.0 Crore</span>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[500000, 800000, 1200000, 2000000, 4000000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setCarPrice(preset)}
                      className={`text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        carPrice === preset
                          ? 'bg-blue-900 text-white font-bold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      ₹{(preset / 100000).toFixed(0)} Lakh{preset > 100000 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Down Payment Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label htmlFor="dp-slider" className="font-semibold text-slate-800">
                    Down Payment Share ({downPaymentPercent}%)
                  </label>
                  <div className="bg-emerald-50 text-emerald-900 px-3.5 py-1 rounded-lg border border-emerald-200 font-bold text-base tabular-nums">
                    ₹{downPaymentAmount.toLocaleString('en-IN')}
                  </div>
                </div>
                <input
                  id="dp-slider"
                  type="range"
                  min={0}
                  max={60}
                  step={5}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500 tabular-nums">
                  <span>0% (100% Loan)</span>
                  <span>20% (Recommended)</span>
                  <span>60% (High DP)</span>
                </div>
              </div>

              {/* Interest Rate Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label htmlFor="rate-slider" className="font-semibold text-slate-800">
                    Annual Interest Rate (% p.a.)
                  </label>
                  <div className="bg-amber-50 text-amber-900 px-3.5 py-1 rounded-lg border border-amber-200 font-bold text-base tabular-nums">
                    {interestRate.toFixed(2)}%
                  </div>
                </div>
                <input
                  id="rate-slider"
                  type="range"
                  min={7.5}
                  max={16.0}
                  step={0.05}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500 tabular-nums">
                  <span>7.5% (Prime PSU)</span>
                  <span>9.0% (Private Bank)</span>
                  <span>16.0% (Subprime/Used)</span>
                </div>

                {/* Quick Rate Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { label: '8.75% (SBI Prime)', val: 8.75 },
                    { label: '8.95% (HDFC / ICICI)', val: 8.95 },
                    { label: '11.00% (Used Car)', val: 11.0 },
                  ].map((chip) => (
                    <button
                      key={chip.val}
                      type="button"
                      onClick={() => setInterestRate(chip.val)}
                      className={`text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        interestRate === chip.val
                          ? 'bg-amber-700 text-white font-bold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Loan Tenure Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label htmlFor="tenure-slider" className="font-semibold text-slate-800">
                    Repayment Tenure (Years / Months)
                  </label>
                  <div className="bg-purple-50 text-purple-900 px-3.5 py-1 rounded-lg border border-purple-200 font-bold text-base tabular-nums">
                    {loanTenureYears} Years ({loanTenureYears * 12} Months)
                  </div>
                </div>
                <input
                  id="tenure-slider"
                  type="range"
                  min={1}
                  max={8}
                  step={1}
                  value={loanTenureYears}
                  onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500 tabular-nums">
                  <span>1 Year</span>
                  <span>5 Years (Standard)</span>
                  <span>8 Years (Max)</span>
                </div>

                {/* Quick Tenure Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[3, 4, 5, 7, 8].map((yr) => (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setLoanTenureYears(yr)}
                      className={`text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        loanTenureYears === yr
                          ? 'bg-purple-700 text-white font-bold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {yr} Years
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Summary Card (Deep Slate) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-blue-900/60 space-y-6">
              <div className="text-center pb-4 border-b border-white/10">
                <span className="text-xs uppercase font-semibold text-slate-300 tracking-wider">
                  Estimated Monthly EMI
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-300 mt-2 tabular-nums">
                  ₹{monthlyEmi.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  For <span className="text-white font-bold tabular-nums">{loanTenureYears * 12}</span> monthly installments ({loanTenureYears} Yrs)
                </div>
              </div>

              {/* Visual Split Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300 font-medium tabular-nums">
                  <span>Loan Principal ({principalPercent}%)</span>
                  <span>Interest ({interestPercent}%)</span>
                </div>
                <div className="h-3 w-full bg-slate-700 rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${principalPercent}%` }}
                    className="bg-blue-500 h-full transition-all duration-300"
                    title={`Principal: ${principalPercent}%`}
                  />
                  <div
                    style={{ width: `${interestPercent}%` }}
                    className="bg-amber-400 h-full transition-all duration-300"
                    title={`Interest: ${interestPercent}%`}
                  />
                </div>
              </div>

              {/* Financial Metrics Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-slate-200">
                  <span>On-Road Vehicle Price</span>
                  <span className="font-bold text-white tabular-nums">₹{carPrice.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-slate-200">
                  <span>Down Payment Paid</span>
                  <span className="font-bold text-emerald-400 tabular-nums">₹{downPaymentAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-slate-200">
                  <span>Net Loan Principal</span>
                  <span className="font-bold text-white tabular-nums">₹{loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-slate-200">
                  <span>Total Interest Outflow</span>
                  <span className="font-bold text-amber-300 tabular-nums">₹{totalInterest.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 text-slate-200 font-semibold">
                  <span>Total Amount Paid (DP + EMI)</span>
                  <span className="font-black text-white text-base tabular-nums">
                    ₹{(downPaymentAmount + totalPayment).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleApplyClick()}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply for this Car Loan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-400 leading-tight">
                Formula: E = [P × r × (1+r)ⁿ] / [(1+r)ⁿ – 1]. Standard reducing balance math. Final terms subject to credit score and dealer quotes.
              </p>
            </div>
          </div>
        </section>

        {/* ==================== TOP LENDERS CURRENT RATES TABLE ==================== */}
        <section aria-labelledby="lenders-heading" className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-blue-900 font-bold text-xs tracking-wider uppercase">
              <Building2 className="w-4 h-4 text-blue-700" />
              Lender Comparison
            </div>
            <h2 id="lenders-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Compare Car Loan Interest Rates from Top Indian Banks
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Review current floating interest rate slabs, administrative fees, and maximum tenure limits from scheduled commercial banks.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <caption className="sr-only">Top Indian car loan interest rates comparison</caption>
              <thead>
                <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] sm:text-xs tracking-wider">
                  <th scope="col" className="p-4 sm:p-5">Bank / Lender</th>
                  <th scope="col" className="p-4 sm:p-5">Interest Rate (p.a.)</th>
                  <th scope="col" className="p-4 sm:p-5">Processing Fee</th>
                  <th scope="col" className="p-4 sm:p-5">Max Funding</th>
                  <th scope="col" className="p-4 sm:p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TOP_CAR_LOAN_BANKS.map((b, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900">
                      <div>{b.bank}</div>
                      <div className="text-[11px] font-normal text-slate-500 mt-0.5">{b.highlight}</div>
                    </td>
                    <td className="p-4 sm:p-5 font-bold text-blue-900 whitespace-nowrap tabular-nums">
                      {b.rate}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600">
                      {b.processingFee}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600 whitespace-nowrap tabular-nums">
                      {b.maxAmount}
                    </td>
                    <td className="p-4 sm:p-5 text-right">
                      <button
                        type="button"
                        onClick={() => handleApplyClick(b.bank)}
                        className="bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
                      >
                        Check Offer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ==================== FREQUENTLY ASKED QUESTIONS ==================== */}
        <section aria-labelledby="faqs-heading" className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-blue-900 font-bold text-xs tracking-wider uppercase">
              <HelpCircle className="w-4 h-4 text-blue-700" />
              Borrower FAQs
            </div>
            <h2 id="faqs-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions About Car Loans
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Clear answers regarding down payment optimizations, foreclosure rules, on-road funding, and credit score benchmarks.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/40 hover:border-blue-200"
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  aria-expanded={activeFaq === idx}
                  className="w-full flex justify-between items-center p-4 sm:p-5 text-left font-bold text-slate-900 text-sm sm:text-base cursor-pointer gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      activeFaq === idx ? 'rotate-180 text-blue-900' : ''
                    }`}
                  />
                </button>
                {activeFaq === idx && (
                  <div className="p-4 sm:p-5 text-xs sm:text-sm text-slate-600 border-t border-slate-200/80 bg-white leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ==================== CROSS-LINKS HUB ==================== */}
        <section aria-labelledby="crosslinks-heading" className="space-y-4">
          <h2 id="crosslinks-heading" className="text-xl font-bold text-slate-900">
            Explore Related Vehicle & Financing Tools on BanksCart
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/loans/used-car"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="font-bold text-sm text-slate-900 group-hover:text-blue-900 flex items-center justify-between">
                <span>Used Car Loans</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Pre-owned vehicle financing, valuation checklists, and RTO transfers.</p>
            </Link>

            <Link
              to="/loans/two-wheeler"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="font-bold text-sm text-slate-900 group-hover:text-blue-900 flex items-center justify-between">
                <span>Two-Wheeler & Bike Loans</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Instant approvals, up to 100% on-road funding, and PM E-DRIVE subsidies.</p>
            </Link>

            <Link
              to="/loans/car"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="font-bold text-sm text-slate-900 group-hover:text-blue-900 flex items-center justify-between">
                <span>New Car Loans Central Hub</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Compare dealer tie-ups, LTV limits, and fast-track digital approvals.</p>
            </Link>

            <Link
              to="/credit-score"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="font-bold text-sm text-slate-900 group-hover:text-blue-900 flex items-center justify-between">
                <span>Free CIBIL Credit Check</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Check your credit score for prime 8.75% auto loan interest rates.</p>
            </Link>
          </div>
        </section>

        {/* ==================== FOOTER DISCLAIMER ==================== */}
        <footer className="border-t border-slate-200 pt-8 pb-4 space-y-4 text-xs text-slate-500 leading-relaxed">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-slate-600 pb-3 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-900" />
              <span>Editorial & Auto Financing Review by <strong>BanksCart Research Team</strong></span>
            </div>
            <div>Last Updated & Rate Audit: October 2026</div>
          </div>

          <p>
            <strong>Marketplace & Auto Financing Disclaimer:</strong> This Car Loan EMI Calculator uses standard reducing balance compounding formulas. Actual monthly installments, approved interest rates, processing fees, and on-road funding ratios depend on individual credit underwriting, dealer quotes, vehicle model, and prevailing lender policies. BanksCart (operated by BanksCart Financial Technologies Pvt. Ltd., CIN: U67190DL2024PTC428910) is an independent financial technology comparison marketplace, not an RBI-licensed commercial bank or NBFC.
          </p>
        </footer>

      </div>
    </main>
  );
};

export default CarLoanCalculatorPage;
