import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  ShieldCheck, 
  TrendingUp, 
  Percent, 
  Clock, 
  CheckCircle2, 
  Building2, 
  ChevronRight, 
  ChevronDown, 
  HelpCircle, 
  Calendar,
  Lock,
  FileText,
  BadgePercent,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import ApplyButton from '../components/common/ApplyButton';

interface FixedDepositPageProps {
  openApplyModal?: (loanType?: string) => void;
}

interface BankFDRate {
  bank: string;
  category: 'sfb' | 'private' | 'public' | 'tax-saving';
  categoryLabel: string;
  regularRate: number;
  seniorRate: number;
  tenure: string;
  minDeposit: string;
  highlight?: string;
}

const BANK_FD_RATES: BankFDRate[] = [
  {
    bank: "Unity Small Finance Bank",
    category: "sfb",
    categoryLabel: "Small Finance Bank",
    regularRate: 9.00,
    seniorRate: 9.50,
    tenure: "1001 Days (~2.7 Yrs)",
    minDeposit: "₹1,000",
    highlight: "Highest Rate"
  },
  {
    bank: "Suryoday Small Finance Bank",
    category: "sfb",
    categoryLabel: "Small Finance Bank",
    regularRate: 8.60,
    seniorRate: 9.10,
    tenure: "2 Years 2 Days",
    minDeposit: "₹1,000",
    highlight: "Popular"
  },
  {
    bank: "Equitas Small Finance Bank",
    category: "sfb",
    categoryLabel: "Small Finance Bank",
    regularRate: 8.50,
    seniorRate: 9.00,
    tenure: "888 Days",
    minDeposit: "₹5,000"
  },
  {
    bank: "Kotak Mahindra Bank",
    category: "private",
    categoryLabel: "Private Sector Bank",
    regularRate: 7.40,
    seniorRate: 7.90,
    tenure: "390 Days",
    minDeposit: "₹5,000",
    highlight: "Top Private Bank"
  },
  {
    bank: "HDFC Bank",
    category: "private",
    categoryLabel: "Private Sector Bank",
    regularRate: 7.25,
    seniorRate: 7.75,
    tenure: "18 to 21 Months",
    minDeposit: "₹5,000"
  },
  {
    bank: "ICICI Bank",
    category: "private",
    categoryLabel: "Private Sector Bank",
    regularRate: 7.20,
    seniorRate: 7.75,
    tenure: "15 to 18 Months",
    minDeposit: "₹10,000"
  },
  {
    bank: "State Bank of India (SBI)",
    category: "public",
    categoryLabel: "Public Sector Bank",
    regularRate: 7.10,
    seniorRate: 7.60,
    tenure: "400 Days (Amrit Kalash)",
    minDeposit: "₹1,000",
    highlight: "Sovereign Trust"
  },
  {
    bank: "Bank of Baroda",
    category: "public",
    categoryLabel: "Public Sector Bank",
    regularRate: 7.15,
    seniorRate: 7.65,
    tenure: "399 Days (Tiranga Plus)",
    minDeposit: "₹1,000"
  },
  {
    bank: "Post Office Time Deposit (POTD)",
    category: "tax-saving",
    categoryLabel: "Govt Small Savings",
    regularRate: 7.50,
    seniorRate: 7.50,
    tenure: "5 Years (Sec 80C)",
    minDeposit: "₹1,000",
    highlight: "100% Sovereign Safety"
  }
];

const FixedDepositPage: React.FC<FixedDepositPageProps> = ({ openApplyModal }) => {
  // Calculator State
  const [depositAmount, setDepositAmount] = useState<number>(200000);
  const [tenureYears, setTenureYears] = useState<number>(3);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [isSeniorCitizen, setIsSeniorCitizen] = useState<boolean>(false);
  const [compoundingType, setCompoundingType] = useState<'cumulative' | 'monthly' | 'quarterly'>('cumulative');

  // Table filter state
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'sfb' | 'private' | 'public' | 'tax-saving'>('all');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Quick Amount Presets
  const quickAmounts = [50000, 100000, 200000, 500000, 1000000];

  // Effective rate calculation
  const effectiveRate = useMemo(() => {
    return isSeniorCitizen ? interestRate + 0.5 : interestRate;
  }, [interestRate, isSeniorCitizen]);

  // Calculator computations
  const calculations = useMemo(() => {
    const P = depositAmount;
    const r = effectiveRate / 100;
    const t = tenureYears;

    if (compoundingType === 'cumulative') {
      // Standard Indian bank quarterly compounding
      const n = 4; // Quarterly
      const maturity = P * Math.pow(1 + r / n, n * t);
      const interestEarned = maturity - P;
      return {
        maturity: Math.round(maturity),
        interestEarned: Math.round(interestEarned),
        periodicPayout: null
      };
    } else if (compoundingType === 'monthly') {
      // Monthly payout (simple discounted interest)
      const annualInterest = P * r;
      const monthlyPayout = annualInterest / 12;
      const totalInterest = monthlyPayout * (t * 12);
      return {
        maturity: P,
        interestEarned: Math.round(totalInterest),
        periodicPayout: Math.round(monthlyPayout)
      };
    } else {
      // Quarterly payout
      const annualInterest = P * r;
      const quarterlyPayout = annualInterest / 4;
      const totalInterest = quarterlyPayout * (t * 4);
      return {
        maturity: P,
        interestEarned: Math.round(totalInterest),
        periodicPayout: Math.round(quarterlyPayout)
      };
    }
  }, [depositAmount, effectiveRate, tenureYears, compoundingType]);

  const filteredRates = useMemo(() => {
    if (selectedFilter === 'all') return BANK_FD_RATES;
    return BANK_FD_RATES.filter(b => b.category === selectedFilter);
  }, [selectedFilter]);

  const faqs = [
    {
      q: "Is money in Bank Fixed Deposits 100% safe in India?",
      a: "Yes. All scheduled commercial banks and small finance banks in India are covered under the Deposit Insurance and Credit Guarantee Corporation (DICGC), a 100% subsidiary of the Reserve Bank of India (RBI). Each depositor is insured up to ₹5,00,000 (including principal and interest) per bank across all accounts and branches."
    },
    {
      q: "Can I earn more interest by splitting my deposits across multiple banks?",
      a: "Absolutely. Financial planners recommend the 'FD Laddering & Diversification' strategy. By allocating ₹5 Lakhs each across 3 to 4 different banks (such as SBI, HDFC Bank, and high-yield Small Finance Banks), you enjoy 100% DICGC insurance protection on your entire ₹15 to ₹20 Lakh portfolio while maximizing your average compounding yield up to 8.50% - 9.00%."
    },
    {
      q: "What is the Tax Deducted at Source (TDS) limit on Fixed Deposits?",
      a: "Under Section 194A of the Income Tax Act, banks deduct 10% TDS if your cumulative annual FD interest exceeds ₹40,000 for regular individuals (or ₹50,000 for senior citizens aged 60+). If your total taxable income is below the exemption limit, you can submit Form 15G (for general public) or Form 15H (for senior citizens) at the start of the financial year to prevent TDS deductions entirely."
    },
    {
      q: "What is the penalty for premature withdrawal of a Fixed Deposit?",
      a: "If you close an FD before maturity, banks typically levy a nominal premature withdrawal penalty of 0.50% to 1.00% on the applicable interest rate for the tenure the deposit remained with the bank. Alternatively, you can avail an instant loan or overdraft against your FD up to 90% of the deposit value without breaking the FD."
    },
    {
      q: "How does a 5-Year Tax Saving Fixed Deposit work?",
      a: "A Tax-Saving FD has a mandatory lock-in period of 5 years and qualifies for a tax deduction of up to ₹1,50,000 per financial year under Section 80C (under the Old Tax Regime). Premature withdrawal and loan against deposit are strictly not permitted on tax-saving FDs as per statutory rules."
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-800">
      <Helmet>
        <title>Best Fixed Deposit (FD) Interest Rates 2026: Compare Top Banks | BanksCart</title>
        <meta 
          name="description" 
          content="Compare latest bank Fixed Deposit (FD) interest rates up to 9.50% p.a. for general public and senior citizens. Calculate maturity returns with DICGC ₹5 Lakh RBI safety guarantee." 
        />
        <link rel="canonical" href="https://bankscart.com/investment/fixed-deposit" />
      </Helmet>

      {/* Breadcrumb Navigation */}
      <Breadcrumb path={["Home", "Investments", "Fixed Deposit"]} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide uppercase mb-5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              RBI DICGC Insured up to ₹5 Lakhs
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Compare & Book High-Yield Fixed Deposits (Up to 9.50% p.a.)
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Guaranteed capital protection backed by scheduled commercial banks. Compare 30+ leading public, private, and small finance banks with quarterly compounding, senior citizen rate bonuses, and 100% paperless video KYC.
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3">
                <div className="text-emerald-400 font-mono font-bold text-lg sm:text-xl">Up to 9.50%</div>
                <div className="text-xs text-slate-400 mt-0.5">Top Senior Yield</div>
              </div>
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3">
                <div className="text-amber-400 font-mono font-bold text-lg sm:text-xl">₹5 Lakhs</div>
                <div className="text-xs text-slate-400 mt-0.5">DICGC Insured / Bank</div>
              </div>
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3">
                <div className="text-blue-400 font-mono font-bold text-lg sm:text-xl">Sec 80C</div>
                <div className="text-xs text-slate-400 mt-0.5">Tax Saver Eligible</div>
              </div>
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3">
                <div className="text-purple-400 font-mono font-bold text-lg sm:text-xl">100% Digital</div>
                <div className="text-xs text-slate-400 mt-0.5">Instant Video KYC</div>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  document.getElementById('fd-calculator')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                <Percent className="w-5 h-5" />
                Calculate Maturity Returns
              </button>

              {openApplyModal ? (
                <ApplyButton
                  loanType="Fixed Deposit"
                  openApplyModal={openApplyModal}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all duration-200 flex items-center gap-2"
                >
                  Book Highest Rate FD
                  <ArrowRight className="w-4 h-4" />
                </ApplyButton>
              ) : (
                <button
                  onClick={() => {
                    document.getElementById('rates-matrix')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all duration-200 flex items-center gap-2"
                >
                  View All Rates
                  <ChevronDown className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">

        {/* SECTION 1: Interactive Smart FD Calculator */}
        <section id="fd-calculator" className="scroll-mt-24">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Interactive Precision Engine
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Fixed Deposit Return & Compounding Calculator
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                Simulate quarterly compounded maturity proceeds or monthly interest income payouts based on current Reserve Bank benchmark rate structures.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Calculator Controls */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Deposit Amount */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-700">Deposit Amount</label>
                    <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                      ₹{depositAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="5000000"
                    step="10000"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                  />
                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {quickAmounts.map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setDepositAmount(amt)}
                        className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-colors ${
                          depositAmount === amt
                            ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        ₹{(amt / 100000).toFixed(amt % 100000 === 0 ? 0 : 1)}L
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tenure Selection */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-700">Tenure (Years)</label>
                    <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                      {tenureYears} {tenureYears === 1 ? 'Year' : 'Years'} ({tenureYears * 12} Months)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={tenureYears}
                    onChange={(e) => setTenureYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
                    <span>1 Year</span>
                    <span>3 Years</span>
                    <span>5 Years (Tax Saver)</span>
                    <span>10 Years</span>
                  </div>
                </div>

                {/* Interest Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-700">Interest Rate (p.a.)</label>
                    <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                      {effectiveRate.toFixed(2)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5.0"
                    max="10.0"
                    step="0.05"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
                    <span>5.0%</span>
                    <span>7.25% (Top Private)</span>
                    <span>8.50% (Top SFB)</span>
                    <span>10.0%</span>
                  </div>
                </div>

                {/* Senior Citizen & Compounding Controls */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Senior Citizen Toggle */}
                  <label className="flex items-center gap-3 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={isSeniorCitizen}
                      onChange={(e) => setIsSeniorCitizen(e.target.checked)}
                      className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                    />
                    <div>
                      <span className="text-sm font-semibold text-slate-800">Senior Citizen (Age 60+)</span>
                      <span className="block text-xs text-emerald-600 font-medium">+0.50% extra rate added</span>
                    </div>
                  </label>

                  {/* Compounding Mode */}
                  <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                    <button
                      type="button"
                      onClick={() => setCompoundingType('cumulative')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        compoundingType === 'cumulative'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Cumulative
                    </button>
                    <button
                      type="button"
                      onClick={() => setCompoundingType('monthly')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        compoundingType === 'monthly'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Monthly Payout
                    </button>
                    <button
                      type="button"
                      onClick={() => setCompoundingType('quarterly')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${
                        compoundingType === 'quarterly'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Quarterly Payout
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: Maturity Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#1E3A8A] text-white rounded-2xl p-6 sm:p-8 shadow-md">
                <div className="text-xs uppercase font-semibold text-slate-300 tracking-wider mb-1">
                  {compoundingType === 'cumulative' ? 'Total Maturity Value' : 'Principal at Maturity'}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-white mb-6">
                  ₹{calculations.maturity.toLocaleString('en-IN')}
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Principal Amount:</span>
                    <span className="font-mono font-semibold text-white">
                      ₹{depositAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Total Interest Earned:</span>
                    <span className="font-mono font-semibold text-emerald-400">
                      +₹{calculations.interestEarned.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {calculations.periodicPayout !== null && (
                    <div className="flex justify-between items-center text-sm bg-white/10 p-2.5 rounded-lg border border-white/10">
                      <span className="text-amber-300 font-semibold">
                        {compoundingType === 'monthly' ? 'Monthly Payout:' : 'Quarterly Payout:'}
                      </span>
                      <span className="font-mono font-bold text-amber-300">
                        ₹{calculations.periodicPayout.toLocaleString('en-IN')}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Applied Rate:</span>
                    <span className="font-mono font-semibold text-white">
                      {effectiveRate.toFixed(2)}% p.a.
                    </span>
                  </div>
                </div>

                {/* Progress bar split */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-slate-400 mb-1 font-mono">
                    <span>Principal ({Math.round((depositAmount / (depositAmount + calculations.interestEarned)) * 100)}%)</span>
                    <span>Interest ({Math.round((calculations.interestEarned / (depositAmount + calculations.interestEarned)) * 100)}%)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-blue-400 h-full" 
                      style={{ width: `${(depositAmount / (depositAmount + calculations.interestEarned)) * 100}%` }}
                    />
                    <div 
                      className="bg-emerald-400 h-full" 
                      style={{ width: `${(calculations.interestEarned / (depositAmount + calculations.interestEarned)) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  {openApplyModal ? (
                    <ApplyButton
                      loanType="Fixed Deposit - Calculator"
                      openApplyModal={openApplyModal}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-md text-center block transition-all"
                    >
                      Book FD at This Rate
                    </ApplyButton>
                  ) : (
                    <button
                      onClick={() => {
                        document.getElementById('rates-matrix')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-md text-center block transition-all"
                    >
                      Compare Bank Rates
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Verified Live Bank FD Rates Comparison Matrix */}
        <section id="rates-matrix" className="scroll-mt-24">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-3">
                  <Building2 className="w-3.5 h-3.5" />
                  RBI Scheduled Banks (2026 Active Ledgers)
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Verified Fixed Deposit Interest Rates Matrix
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Updated February 2026. Rates applicable on domestic deposits under ₹2 Crores.
                </p>
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'All Banks' },
                  { key: 'sfb', label: 'Small Finance Banks (9.0%+)' },
                  { key: 'private', label: 'Top Private Banks' },
                  { key: 'public', label: 'Public Sector (SBI/BOB)' },
                  { key: 'tax-saving', label: 'Tax Saving (Sec 80C)' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setSelectedFilter(tab.key as any)}
                    className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all ${
                      selectedFilter === tab.key
                        ? 'bg-[#1E3A8A] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                    <th className="py-3 px-4">Bank & Institution</th>
                    <th className="py-3 px-4">Regular Rate (p.a.)</th>
                    <th className="py-3 px-4">Senior Citizen Rate</th>
                    <th className="py-3 px-4">Peak Tenure</th>
                    <th className="py-3 px-4">Min Deposit</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredRates.map((bank, index) => (
                    <tr key={bank.bank} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{bank.bank}</span>
                          {bank.highlight && (
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                              {bank.highlight}
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-500">{bank.categoryLabel}</span>
                      </td>

                      <td className="py-4 px-4 font-mono font-bold text-slate-900 tabular-nums text-base">
                        {bank.regularRate.toFixed(2)}%
                      </td>

                      <td className="py-4 px-4 font-mono font-bold text-emerald-600 tabular-nums text-base">
                        {bank.seniorRate.toFixed(2)}%
                      </td>

                      <td className="py-4 px-4 text-slate-700 text-xs sm:text-sm">
                        {bank.tenure}
                      </td>

                      <td className="py-4 px-4 font-mono text-slate-600 text-xs sm:text-sm tabular-nums">
                        {bank.minDeposit}
                      </td>

                      <td className="py-4 px-4 text-right">
                        {openApplyModal ? (
                          <ApplyButton
                            loanType={`Fixed Deposit - ${bank.bank}`}
                            openApplyModal={openApplyModal}
                            className="bg-[#1E3A8A] hover:bg-blue-900 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors inline-block"
                          >
                            Book FD
                          </ApplyButton>
                        ) : (
                          <button
                            onClick={() => {
                              document.getElementById('fd-calculator')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="bg-[#1E3A8A] hover:bg-blue-900 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors inline-block"
                          >
                            Calculate
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Regulatory Footer note */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-500 gap-2">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                All deposits up to ₹5,00,000 per depositor per bank insured under DICGC guidelines.
              </span>
              <span>Source: Official Bank Schedules & RBI Rate Database (2026).</span>
            </div>
          </div>
        </section>

        {/* SECTION 3: Fixed Deposit Types */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Types of Fixed Deposits in India
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Select the term structure that matches your liquidity requirements and income tax profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1E3A8A] flex items-center justify-center font-bold mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Cumulative Fixed Deposit</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Interest is compounded quarterly and paid out along with the principal amount upon final maturity. Ideal for long-term compounding and wealth multiplication.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 border-t border-slate-200 pt-3">
                <li className="flex items-center gap-1.5">✓ Maximum compounding yield</li>
                <li className="flex items-center gap-1.5">✓ 1 to 10-year flexible tenures</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Non-Cumulative Regular Income</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Interest is paid out directly into your savings account on a monthly or quarterly cycle. Perfect for senior citizens and retirees seeking predictable cash flow.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 border-t border-slate-200 pt-3">
                <li className="flex items-center gap-1.5">✓ Predictable monthly salary/pension</li>
                <li className="flex items-center gap-1.5">✓ Direct bank account auto-credit</li>
              </ul>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">5-Year Tax-Saving FD (80C)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Enjoys tax deductions of up to ₹1,50,000 annually under Section 80C of the Income Tax Act. Comes with a mandatory 5-year lock-in with zero premature withdrawal.
              </p>
              <ul className="text-xs text-slate-500 space-y-1.5 border-t border-slate-200 pt-3">
                <li className="flex items-center gap-1.5">✓ Save up to ₹46,800 in tax</li>
                <li className="flex items-center gap-1.5">✓ Zero market volatility</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 4: Statutory Compliance & Tax Shield */}
        <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-slate-800">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3">
              <FileText className="w-3.5 h-3.5" />
              Income Tax Act & RBI Statutory Protection
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Understanding Fixed Deposit Taxation & Safety
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              Clear statutory rules governing your deposit interest, TDS thresholds, and central bank guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5">
              <h4 className="text-base font-bold text-amber-400 mb-2">TDS Exemption Limits</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Under Section 194A, banks deduct 10% TDS only if total interest exceeds ₹40,000/year for general depositors, or ₹50,000/year for senior citizens (age 60+).
              </p>
              <span className="text-xs text-slate-400 font-mono">PAN submission mandatory</span>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5">
              <h4 className="text-base font-bold text-emerald-400 mb-2">Form 15G / Form 15H</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If your total annual income is below the taxable threshold, submit self-declaration Form 15G (under 60 yrs) or Form 15H (senior citizens) to stop TDS deductions.
              </p>
              <span className="text-xs text-slate-400 font-mono">Submit in April every year</span>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5">
              <h4 className="text-base font-bold text-blue-400 mb-2">DICGC ₹5 Lakh Insurance</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                The Deposit Insurance and Credit Guarantee Corporation guarantees both principal and accrued interest up to ₹5,00,000 per depositor per bank in case of bank liquidation.
              </p>
              <span className="text-xs text-slate-400 font-mono">100% RBI Subsidiary Shield</span>
            </div>
          </div>
        </section>

        {/* SECTION 5: 4-Step Paperless Booking Process */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              How to Book a Fixed Deposit Online in 4 Steps
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Zero branch visits required. Complete digital onboarding directly verified with bank treasury portals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Compare & Select",
                desc: "Choose your preferred bank, highest yield tenure, and monthly vs cumulative compounding mode on BanksCart."
              },
              {
                step: "02",
                title: "Aadhaar e-KYC",
                desc: "Enter your PAN and 12-digit Aadhaar to complete instant paperless OTP verification in under 60 seconds."
              },
              {
                step: "03",
                title: "NetBanking / UPI",
                desc: "Transfer your deposit amount securely via encrypted UPI or NetBanking directly into the scheduled bank."
              },
              {
                step: "04",
                title: "Instant FD Advice",
                desc: "Receive your official bank Fixed Deposit Advice (FDA) receipt and certificate directly on your registered email."
              }
            ].map((st) => (
              <div key={st.step} className="bg-slate-50 border border-slate-200 rounded-xl p-5 relative">
                <span className="text-3xl font-mono font-extrabold text-[#1E3A8A]/20 block mb-2">
                  {st.step}
                </span>
                <h4 className="text-base font-bold text-slate-900 mb-1.5">{st.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: Frequently Asked Questions Accordion */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              Got Questions?
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions About Bank Fixed Deposits
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
            Ready to Lock in Up to 9.50% Fixed Returns?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8">
            Start investing with as low as ₹1,000. 100% DICGC safety guarantee, zero middleman commissions, and instant digital certificates.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {openApplyModal ? (
              <ApplyButton
                loanType="Fixed Deposit - Final CTA"
                openApplyModal={openApplyModal}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-md transition-all inline-block"
              >
                Book Your Fixed Deposit Now
              </ApplyButton>
            ) : (
              <button
                onClick={() => {
                  document.getElementById('rates-matrix')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-md transition-all inline-block"
              >
                Compare All Bank Rates
              </button>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default FixedDepositPage;
