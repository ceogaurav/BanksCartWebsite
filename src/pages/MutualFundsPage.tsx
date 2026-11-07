import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  ShieldCheck,
  Percent,
  Sparkles,
  ChevronDown,
  ArrowRight,
  HelpCircle,
  Award,
  Layers,
  CheckCircle2,
  PieChart,
  Coins,
  Flame,
  Zap,
  ArrowUpRight
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import ApplyButton from '../components/common/ApplyButton';

interface MutualFundsPageProps {
  openApplyModal?: (loanType?: string) => void;
}

interface TopFund {
  name: string;
  amc: string;
  category: 'equity' | 'elss' | 'hybrid' | 'debt';
  categoryLabel: string;
  cagr3Y: string;
  cagr5Y: string;
  ter: string;
  minSip: string;
  rating: number;
  highlight?: string;
  link: string;
}

const TOP_DIRECT_FUNDS: TopFund[] = [
  {
    name: "Parag Parikh Flexi Cap Direct",
    amc: "PPFAS Mutual Fund",
    category: "equity",
    categoryLabel: "Flexi Cap Fund",
    cagr3Y: "19.80%",
    cagr5Y: "21.80%",
    ter: "0.65%",
    minSip: "₹1,000",
    rating: 5,
    highlight: "Top Core Holding",
    link: "/investment/mutual-funds/flexi-cap"
  },
  {
    name: "Nippon India Small Cap Direct",
    amc: "Nippon India AMC",
    category: "equity",
    categoryLabel: "Small Cap Fund",
    cagr3Y: "28.50%",
    cagr5Y: "31.20%",
    ter: "0.68%",
    minSip: "₹1,000",
    rating: 5,
    highlight: "Highest 5Y Alpha",
    link: "/investment/mutual-funds/small-cap"
  },
  {
    name: "HDFC Mid-Cap Opportunities Direct",
    amc: "HDFC Mutual Fund",
    category: "equity",
    categoryLabel: "Mid Cap Fund",
    cagr3Y: "24.20%",
    cagr5Y: "24.60%",
    ter: "0.78%",
    minSip: "₹500",
    rating: 4,
    highlight: "Consistent Performer",
    link: "/investment/mutual-funds/mid-cap"
  },
  {
    name: "ICICI Prudential Bluechip Direct",
    amc: "ICICI Prudential AMC",
    category: "equity",
    categoryLabel: "Large Cap Fund",
    cagr3Y: "16.40%",
    cagr5Y: "16.80%",
    ter: "0.90%",
    minSip: "₹1,000",
    rating: 5,
    highlight: "Bluechip Giant",
    link: "/investment/mutual-funds/large-cap"
  },
  {
    name: "Quant ELSS Tax Saver Direct",
    amc: "Quant Mutual Fund",
    category: "elss",
    categoryLabel: "Tax Saver (ELSS)",
    cagr3Y: "26.40%",
    cagr5Y: "28.40%",
    ter: "0.76%",
    minSip: "₹500",
    rating: 5,
    highlight: "Sec 80C Tax Saver",
    link: "/investment/mutual-funds/elss"
  },
  {
    name: "Mirae Asset ELSS Tax Saver Direct",
    amc: "Mirae Asset AMC",
    category: "elss",
    categoryLabel: "Tax Saver (ELSS)",
    cagr3Y: "17.90%",
    cagr5Y: "18.20%",
    ter: "0.62%",
    minSip: "₹500",
    rating: 4,
    link: "/investment/mutual-funds/elss"
  },
  {
    name: "ICICI Prudential Liquid Direct Plan",
    amc: "ICICI Prudential AMC",
    category: "debt",
    categoryLabel: "Liquid Fund",
    cagr3Y: "6.95%",
    cagr5Y: "7.15%",
    ter: "0.20%",
    minSip: "₹1,000",
    rating: 5,
    highlight: "Instant Redemption",
    link: "/investment/mutual-funds/liquid"
  },
  {
    name: "HDFC Balanced Advantage Direct",
    amc: "HDFC Mutual Fund",
    category: "hybrid",
    categoryLabel: "Balanced Advantage",
    cagr3Y: "18.10%",
    cagr5Y: "18.60%",
    ter: "0.72%",
    minSip: "₹500",
    rating: 5,
    highlight: "Dynamic Allocation",
    link: "/investment/mutual-funds/overview"
  }
];

const MutualFundsPage: React.FC<MutualFundsPageProps> = ({ openApplyModal }) => {
  // Calculator State
  const [calcMode, setCalcMode] = useState<'sip' | 'lumpsum'>('sip');
  const [investmentAmount, setInvestmentAmount] = useState<number>(10000);
  const [expectedReturnRate, setExpectedReturnRate] = useState<number>(13.5);
  const [tenureYears, setTenureYears] = useState<number>(10);

  // Filter state
  const [activeCategory, setActiveCategory] = useState<'all' | 'equity' | 'elss' | 'hybrid' | 'debt'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // SIP presets
  const sipPresets = [1000, 2500, 5000, 10000, 25000];

  // Mathematical computations for wealth growth
  const calculations = useMemo(() => {
    const r = expectedReturnRate / 100;
    const t = tenureYears;

    if (calcMode === 'sip') {
      const P = investmentAmount;
      const n = t * 12; // number of months
      const i = r / 12; // monthly rate
      const fv = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      const totalInvested = P * n;
      const wealthGained = fv - totalInvested;
      const multiplier = (fv / totalInvested).toFixed(1);

      return {
        totalInvested: Math.round(totalInvested),
        wealthGained: Math.round(wealthGained),
        totalMaturity: Math.round(fv),
        multiplier
      };
    } else {
      const P = investmentAmount;
      const fv = P * Math.pow(1 + r, t);
      const wealthGained = fv - P;
      const multiplier = (fv / P).toFixed(1);

      return {
        totalInvested: Math.round(P),
        wealthGained: Math.round(wealthGained),
        totalMaturity: Math.round(fv),
        multiplier
      };
    }
  }, [calcMode, investmentAmount, expectedReturnRate, tenureYears]);

  const filteredFunds = useMemo(() => {
    if (activeCategory === 'all') return TOP_DIRECT_FUNDS;
    return TOP_DIRECT_FUNDS.filter(f => f.category === activeCategory);
  }, [activeCategory]);

  const faqs = [
    {
      q: "What is the difference between Direct and Regular Mutual Funds?",
      a: "Direct plans are bought directly from the Asset Management Company (AMC) without any intermediary broker or distributor. Regular plans include recurring trail commissions (typically 0.75% to 1.50% every year) paid out of your investment to distributors. Direct plans have a lower Total Expense Ratio (TER), allowing 100% of your gains to compound directly in your folio."
    },
    {
      q: "How are Mutual Fund capital gains taxed in India under Budget 2024?",
      a: "For Equity Mutual Funds (investing >65% in domestic equities): Long-Term Capital Gains (held for >12 months) are taxed at 12.5% on annual gains exceeding ₹1.25 Lakh. Short-Term Capital Gains (held for <12 months) are taxed at 20%. For Debt Mutual Funds purchased after April 1, 2023, all capital gains are added to your income and taxed at your regular slab rates."
    },
    {
      q: "Can I stop or pause my SIP anytime without penalty?",
      a: "Yes. Mutual fund SIPs offer 100% flexibility. You can pause your SIP for up to 3 to 6 months, modify the monthly installment amount, or cancel the auto-debit mandate anytime through your BanksCart dashboard without paying any penalties or cancellation fees."
    },
    {
      q: "What is an ELSS Mutual Fund and how does it save tax?",
      a: "Equity Linked Savings Schemes (ELSS) are diversified equity mutual funds eligible for income tax deduction under Section 80C of the Income Tax Act up to ₹1,50,000 per financial year (under the Old Tax Regime). ELSS features the shortest lock-in period of just 3 years among all Section 80C instruments (compared to 5 years for Tax-Saving FDs and 15 years for PPF)."
    },
    {
      q: "Is my money safe when investing in Mutual Funds through BanksCart?",
      a: "Yes. Mutual funds in India are strictly regulated by the Securities and Exchange Board of India (SEBI) and the Association of Mutual Funds in India (AMFI). All investor capital is held directly by independent SEBI-registered custodians (such as Deutsche Bank, ICICI Bank, or HDFC Bank) and registered with AMCs (via CAMS/KFintech). Even if any platform ceases operations, your mutual fund units remain completely safe and accessible directly via AMC portals."
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-800">
      <Helmet>
        <title>Best Direct Mutual Funds 2026: 0% Commission SIP & Lump Sum | BanksCart</title>
        <meta 
          name="description" 
          content="Invest in 2,500+ direct mutual funds with zero distributor commission fees. Compare top-ranked Large Cap, Flexi Cap, Mid Cap, and ELSS Tax Saver funds with live SIP compounding calculator." 
        />
        <link rel="canonical" href="https://bankscart.com/investment/mutual-funds" />
      </Helmet>

      {/* Breadcrumb Navigation */}
      <Breadcrumb path={["Home", "Investments", "Mutual Funds"]} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide uppercase mb-5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              SEBI Regulated AMCs • 0% Commission Direct Plans
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Invest in Zero Commission Direct Mutual Funds
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Bypass middleman distributor commissions and keep an extra 1.0% to 1.5% compounding annually in your portfolio. Invest in 2,500+ mutual fund schemes from top AMCs with 100% paperless digital onboarding in under 5 minutes.
            </p>

            {/* Key Value Statistics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3">
                <div className="text-emerald-400 font-mono font-bold text-lg sm:text-xl">0% Fees</div>
                <div className="text-xs text-slate-400 mt-0.5">Zero Commission</div>
              </div>
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3">
                <div className="text-amber-400 font-mono font-bold text-lg sm:text-xl">+1.5% p.a.</div>
                <div className="text-xs text-slate-400 mt-0.5">Extra Direct Returns</div>
              </div>
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3">
                <div className="text-blue-400 font-mono font-bold text-lg sm:text-xl">2,500+</div>
                <div className="text-xs text-slate-400 mt-0.5">Approved Funds</div>
              </div>
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3">
                <div className="text-purple-400 font-mono font-bold text-lg sm:text-xl">₹500/Mo</div>
                <div className="text-xs text-slate-400 mt-0.5">Start SIP Easily</div>
              </div>
            </div>

            {/* Hero CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  document.getElementById('sip-calculator')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                <TrendingUp className="w-5 h-5" />
                Calculate SIP Wealth Growth
              </button>

              {openApplyModal ? (
                <ApplyButton
                  loanType="Mutual Fund"
                  openApplyModal={openApplyModal}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all duration-200 flex items-center gap-2"
                >
                  Start Direct SIP Online
                  <ArrowRight className="w-4 h-4" />
                </ApplyButton>
              ) : (
                <button
                  onClick={() => {
                    document.getElementById('top-funds')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all duration-200 flex items-center gap-2"
                >
                  Explore Top Funds
                  <ChevronDown className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">

        {/* SECTION 1: Interactive SIP & Lumpsum Calculator */}
        <section id="sip-calculator" className="scroll-mt-24">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Precision Compounding Engine
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                SIP & Lumpsum Wealth Compounding Calculator
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                See the exponential power of compounding. Small monthly investments grow into substantial life-changing wealth over time.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Controls Column */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Mode Selector */}
                <div className="flex bg-slate-100 p-1 rounded-xl max-w-xs text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setCalcMode('sip')}
                    className={`flex-1 py-2 rounded-lg transition-all ${
                      calcMode === 'sip'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Monthly SIP
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalcMode('lumpsum')}
                    className={`flex-1 py-2 rounded-lg transition-all ${
                      calcMode === 'lumpsum'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    One-Time Lump Sum
                  </button>
                </div>

                {/* Investment Amount */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-700">
                      {calcMode === 'sip' ? 'Monthly SIP Amount' : 'One-Time Lump Sum Amount'}
                    </label>
                    <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                      ₹{investmentAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={calcMode === 'sip' ? 500 : 5000}
                    max={calcMode === 'sip' ? 100000 : 2000000}
                    step={calcMode === 'sip' ? 500 : 5000}
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                  />
                  {calcMode === 'sip' && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {sipPresets.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setInvestmentAmount(amt)}
                          className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                            investmentAmount === amt
                              ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          ₹{amt.toLocaleString('en-IN')}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Expected Return Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-700">Expected Annual Return (CAGR)</label>
                    <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                      {expectedReturnRate.toFixed(1)}% p.a.
                    </span>
                  </div>
                  <input
                    type="range"
                    min="8.0"
                    max="22.0"
                    step="0.5"
                    value={expectedReturnRate}
                    onChange={(e) => setExpectedReturnRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
                    <span>8% (Debt/Liquid)</span>
                    <span>12% (Large Cap)</span>
                    <span>14% (Flexi/Mid)</span>
                    <span>18%+ (Small Cap)</span>
                  </div>
                </div>

                {/* Investment Horizon */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-700">Time Horizon (Years)</label>
                    <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                      {tenureYears} Years ({tenureYears * 12} Installments)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
                    <span>1 Yr</span>
                    <span>5 Yrs</span>
                    <span>10 Yrs</span>
                    <span>20 Yrs</span>
                    <span>30 Yrs</span>
                  </div>
                </div>

              </div>

              {/* Maturity Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#1E3A8A] text-white rounded-2xl p-6 sm:p-8 shadow-md">
                <div className="text-xs uppercase font-semibold text-slate-300 tracking-wider mb-1">
                  Expected Future Value (Corpus)
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-white mb-2">
                  ₹{calculations.totalMaturity.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-emerald-400 font-semibold mb-6 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  Grows by {calculations.multiplier}x your total invested capital
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Total Invested:</span>
                    <span className="font-mono font-semibold text-white">
                      ₹{calculations.totalInvested.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Estimated Wealth Gain:</span>
                    <span className="font-mono font-semibold text-emerald-400">
                      +₹{calculations.wealthGained.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Return Rate:</span>
                    <span className="font-mono font-semibold text-white">
                      {expectedReturnRate.toFixed(1)}% p.a.
                    </span>
                  </div>
                </div>

                {/* Progress bar split */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-slate-400 mb-1 font-mono">
                    <span>Invested ({Math.round((calculations.totalInvested / calculations.totalMaturity) * 100)}%)</span>
                    <span>Gain ({Math.round((calculations.wealthGained / calculations.totalMaturity) * 100)}%)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-blue-400 h-full" 
                      style={{ width: `${(calculations.totalInvested / calculations.totalMaturity) * 100}%` }}
                    />
                    <div 
                      className="bg-emerald-400 h-full" 
                      style={{ width: `${(calculations.wealthGained / calculations.totalMaturity) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  {openApplyModal ? (
                    <ApplyButton
                      loanType="Mutual Fund - SIP Calculator"
                      openApplyModal={openApplyModal}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-md text-center block transition-all"
                    >
                      Start SIP with This Plan
                    </ApplyButton>
                  ) : (
                    <button
                      onClick={() => {
                        document.getElementById('top-funds')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-md text-center block transition-all"
                    >
                      Explore Matching Schemes
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Why Direct Plans Win (The 1.5% Compounding Reality) */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3">
              <Coins className="w-3.5 h-3.5" />
              The Mathematical Direct Advantage
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              The Real Cost of Regular Plans: See the ₹28+ Lakhs Difference
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Distributor commissions of 1% to 1.5% may seem small initially, but compounding over 15 to 25 years diverts millions of rupees out of your retirement corpus.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Investment Period</th>
                  <th className="py-3 px-4">Total Amount Invested</th>
                  <th className="py-3 px-4">Regular Plan (12% CAGR)</th>
                  <th className="py-3 px-4">Direct Plan (13.5% CAGR)</th>
                  <th className="py-3 px-4 font-bold text-emerald-700">Extra Wealth Kept (Direct)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium font-mono tabular-nums text-xs sm:text-sm">
                <tr className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-4 font-sans font-semibold text-slate-900">10 Years</td>
                  <td className="py-3.5 px-4 text-slate-600">₹12,00,000</td>
                  <td className="py-3.5 px-4 text-slate-700">₹23,23,000</td>
                  <td className="py-3.5 px-4 text-slate-900 font-bold">₹25,68,000</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">+₹2,45,000 More</td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-4 font-sans font-semibold text-slate-900">15 Years</td>
                  <td className="py-3.5 px-4 text-slate-600">₹18,00,000</td>
                  <td className="py-3.5 px-4 text-slate-700">₹50,45,000</td>
                  <td className="py-3.5 px-4 text-slate-900 font-bold">₹59,57,000</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">+₹9,12,000 More</td>
                </tr>
                <tr className="hover:bg-slate-50/60 bg-emerald-50/30">
                  <td className="py-3.5 px-4 font-sans font-semibold text-slate-900">20 Years</td>
                  <td className="py-3.5 px-4 text-slate-600">₹24,00,000</td>
                  <td className="py-3.5 px-4 text-slate-700">₹99,91,000</td>
                  <td className="py-3.5 px-4 text-slate-900 font-bold">₹1,28,31,000</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">+₹28,40,000 More</td>
                </tr>
                <tr className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-4 font-sans font-semibold text-slate-900">25 Years</td>
                  <td className="py-3.5 px-4 text-slate-600">₹30,00,000</td>
                  <td className="py-3.5 px-4 text-slate-700">₹1,89,76,000</td>
                  <td className="py-3.5 px-4 text-slate-900 font-bold">₹2,62,26,000</td>
                  <td className="py-3.5 px-4 text-emerald-600 font-bold">+₹72,50,000 More</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-xs text-slate-500">
            *Simulation assumes a standard ₹10,000 monthly SIP compounding over specified horizons comparing 12.0% Regular Plan vs 13.5% Direct Plan net CAGR.
          </div>
        </section>

        {/* SECTION 3: Curated Category Deep Dives */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Explore Mutual Fund Categories
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Browse curated fund categories designed for specific risk appetites, holding horizons, and tax optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Flexi Cap Funds",
                desc: "Dynamic stock allocation across large, mid, and small cap companies without SEBI limits. True all-weather equity.",
                icon: Layers,
                link: "/investment/mutual-funds/flexi-cap",
                tag: "Core Portfolio",
                cagr: "18% - 24% CAGR"
              },
              {
                title: "Large Cap Funds",
                desc: "Invests in India's top 100 established market leaders with solid balance sheets and high stability during crashes.",
                icon: ShieldCheck,
                link: "/investment/mutual-funds/large-cap",
                tag: "Low Equity Risk",
                cagr: "14% - 17% CAGR"
              },
              {
                title: "Mid Cap Funds",
                desc: "Emerging mid-sized companies (101-250 rank) with high growth velocity. Ideal for 5+ year wealth builders.",
                icon: TrendingUp,
                link: "/investment/mutual-funds/mid-cap",
                tag: "High Alpha Growth",
                cagr: "20% - 26% CAGR"
              },
              {
                title: "Small Cap Funds",
                desc: "High-conviction innovative small enterprises with potential to become multi-baggers over 7+ year market cycles.",
                icon: Flame,
                link: "/investment/mutual-funds/small-cap",
                tag: "Maximum Compounding",
                cagr: "24% - 32% CAGR"
              },
              {
                title: "ELSS Tax Saver Funds",
                desc: "Save up to ₹46,800 annually under Section 80C. Shortest 3-year lock-in among all government tax instruments.",
                icon: Award,
                link: "/investment/mutual-funds/elss",
                tag: "Sec 80C Benefit",
                cagr: "18% - 28% CAGR"
              },
              {
                title: "Liquid & Overnight Funds",
                desc: "Zero exit load after 7 days, 6.75% - 7.15% yields, and instant redemption up to ₹50,000 in seconds. Premier emergency fund.",
                icon: Zap,
                link: "/investment/mutual-funds/liquid",
                tag: "Emergency Parking",
                cagr: "6.8% - 7.2% Yield"
              }
            ].map((cat) => {
              const IconComp = cat.icon;
              return (
                <Link
                  key={cat.title}
                  to={cat.link}
                  className="group bg-slate-50 hover:bg-blue-50/40 border border-slate-200 hover:border-blue-300 rounded-xl p-6 transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1E3A8A] flex items-center justify-center group-hover:scale-105 transition-transform">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                        {cat.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1E3A8A] transition-colors mb-2">
                      {cat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs">
                    <span className="font-mono font-semibold text-emerald-700">{cat.cagr}</span>
                    <span className="text-blue-600 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                      View Schemes <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: Top-Ranked Direct Funds Live Matrix */}
        <section id="top-funds" className="scroll-mt-24">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
                  <Award className="w-3.5 h-3.5" />
                  Top Ranked Performance (2026 Data)
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Premier Direct Mutual Funds in India
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Evaluated on rolling returns, Sortino ratio, fund manager tenure, and low expense ratios.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'All Funds' },
                  { key: 'equity', label: 'Equity / Growth' },
                  { key: 'elss', label: 'ELSS Tax Saver' },
                  { key: 'hybrid', label: 'Hybrid / Balanced' },
                  { key: 'debt', label: 'Liquid / Debt' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveCategory(tab.key as any)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      activeCategory === tab.key
                        ? 'bg-[#1E3A8A] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Funds Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                    <th className="py-3 px-4">Scheme & AMC</th>
                    <th className="py-3 px-4">3-Yr CAGR</th>
                    <th className="py-3 px-4">5-Yr CAGR</th>
                    <th className="py-3 px-4">Expense Ratio (TER)</th>
                    <th className="py-3 px-4">Min Monthly SIP</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredFunds.map((fund) => (
                    <tr key={fund.name} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Link 
                            to={fund.link} 
                            className="font-bold text-slate-900 hover:text-blue-700 transition-colors"
                          >
                            {fund.name}
                          </Link>
                          {fund.highlight && (
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                              {fund.highlight}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500">{fund.amc} • {fund.categoryLabel}</span>
                      </td>

                      <td className="py-4 px-4 font-mono font-bold text-slate-800 tabular-nums">
                        {fund.cagr3Y}
                      </td>

                      <td className="py-4 px-4 font-mono font-bold text-emerald-600 tabular-nums text-base">
                        {fund.cagr5Y}
                      </td>

                      <td className="py-4 px-4 font-mono text-slate-600 text-xs sm:text-sm tabular-nums">
                        {fund.ter}
                      </td>

                      <td className="py-4 px-4 font-mono text-slate-700 text-xs sm:text-sm tabular-nums">
                        {fund.minSip}
                      </td>

                      <td className="py-4 px-4 text-right">
                        {openApplyModal ? (
                          <ApplyButton
                            loanType={`Mutual Fund - ${fund.name}`}
                            openApplyModal={openApplyModal}
                            className="bg-[#1E3A8A] hover:bg-blue-900 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors inline-block"
                          >
                            Invest Direct
                          </ApplyButton>
                        ) : (
                          <Link
                            to={fund.link}
                            className="bg-[#1E3A8A] hover:bg-blue-900 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors inline-block"
                          >
                            Details
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                All funds direct growth plans. Mutual fund investments are subject to market risks. Read all scheme related documents carefully.
              </span>
              <span>Source: AMFI & Value Research India (2026).</span>
            </div>
          </div>
        </section>

        {/* SECTION 5: How Rupee Cost Averaging Works */}
        <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-slate-800">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3">
              <TrendingUp className="w-3.5 h-3.5" />
              Rupee Cost Averaging Mechanics
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Why SIPs Turn Market Volatility into Wealth
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              You never need to time the market. Monthly SIPs automatically exploit price dips.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5">
              <div className="text-amber-400 font-mono font-bold text-lg mb-2">When Markets Drop</div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Your fixed monthly SIP installment buys significantly more mutual fund units at discounted NAVs, averaging down your cumulative acquisition cost.
              </p>
              <span className="text-xs text-emerald-400 font-mono">Accumulate Cheap Units</span>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5">
              <div className="text-blue-400 font-mono font-bold text-lg mb-2">When Markets Rise</div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Your existing portfolio of accumulated units accelerates in valuation, multiplying net compounding profits during market bull cycles.
              </p>
              <span className="text-xs text-blue-400 font-mono">Accelerate Portfolio Growth</span>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5">
              <div className="text-emerald-400 font-mono font-bold text-lg mb-2">Automated Discipline</div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Automated e-NACH auto-debits remove fear and greed from investing, building a seamless habit of regular monthly wealth compounding.
              </p>
              <span className="text-xs text-slate-400 font-mono">Zero Emotional Bias</span>
            </div>
          </div>
        </section>

        {/* SECTION 6: Frequently Asked Questions */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Mutual Fund Investment FAQs
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={faq.q} 
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full py-4 px-5 text-left font-bold text-slate-900 flex justify-between items-center hover:bg-slate-50 transition-colors gap-4"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${openFaqIndex === idx ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 7: Bottom CTA Banner */}
        <section className="bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 text-white rounded-2xl p-8 sm:p-12 text-center border border-slate-800 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Start Your Direct SIP Journey with ₹500 Today
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8">
            Join thousands of Indian investors compounding wealth with 0% distributor commissions. Paperless KYC in under 5 minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {openApplyModal ? (
              <ApplyButton
                loanType="Mutual Fund - Final CTA"
                openApplyModal={openApplyModal}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-md transition-all inline-block"
              >
                Start Direct SIP Online
              </ApplyButton>
            ) : (
              <button
                onClick={() => {
                  document.getElementById('top-funds')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-md transition-all inline-block"
              >
                Explore Top Direct Funds
              </button>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default MutualFundsPage;
