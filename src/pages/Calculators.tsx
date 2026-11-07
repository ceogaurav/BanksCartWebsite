import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import {
  Calculator,
  PiggyBank,
  Receipt,
  TrendingUp,
  Percent,
  Home,
  CreditCard,
  Wallet,
  DollarSign,
  BarChart2,
  BookOpen,
  Car,
  Coins,
  ShieldCheck,
  Building2,
  Sparkles,
  Search,
  ArrowRight,
  Briefcase,
  HelpCircle,
  Sliders,
  CheckCircle2,
  Clock,
  Layers
} from 'lucide-react';

interface CalculatorItem {
  id: string;
  name: string;
  category: string;
  icon: React.ElementType;
  description: string;
  route: string;
  badge?: string;
}

export const Calculators: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Interactive Live Calculator Preset in Hero
  const [activeLiveCalc, setActiveLiveCalc] = useState<'home' | 'personal' | 'car' | 'sip'>('home');
  const [liveAmount, setLiveAmount] = useState<number>(4000000);
  const [liveRate, setLiveRate] = useState<number>(8.5);
  const [liveTenure, setLiveTenure] = useState<number>(20);

  // Switch Live Calculator presets
  const handleLiveTypeChange = (type: 'home' | 'personal' | 'car' | 'sip') => {
    setActiveLiveCalc(type);
    if (type === 'home') {
      setLiveAmount(4000000);
      setLiveRate(8.5);
      setLiveTenure(20);
    } else if (type === 'personal') {
      setLiveAmount(500000);
      setLiveRate(11.5);
      setLiveTenure(3);
    } else if (type === 'car') {
      setLiveAmount(800000);
      setLiveRate(8.95);
      setLiveTenure(5);
    } else if (type === 'sip') {
      setLiveAmount(10000); // monthly investment
      setLiveRate(12.0); // expected return
      setLiveTenure(10); // years
    }
  };

  // Compute Live Calculator output
  const liveResults = useMemo(() => {
    if (activeLiveCalc === 'sip') {
      const p = liveAmount;
      const i = liveRate / 12 / 100;
      const n = liveTenure * 12;
      const totalInvested = p * n;
      const futureValue = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      const returns = futureValue - totalInvested;
      return {
        primaryLabel: 'Expected Maturity Amount',
        primaryVal: Math.round(futureValue),
        sub1Label: 'Total Amount Invested',
        sub1Val: Math.round(totalInvested),
        sub2Label: 'Est. Wealth Gain',
        sub2Val: Math.round(returns)
      };
    } else {
      const p = liveAmount;
      const r = liveRate / 12 / 100;
      const n = liveTenure * 12;
      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayment = emi * n;
      const totalInterest = totalPayment - p;
      return {
        primaryLabel: 'Monthly EMI Payable',
        primaryVal: Math.round(emi),
        sub1Label: 'Principal Loan Amount',
        sub1Val: Math.round(p),
        sub2Label: 'Total Interest Payable',
        sub2Val: Math.round(totalInterest)
      };
    }
  }, [activeLiveCalc, liveAmount, liveRate, liveTenure]);

  // Master Indian Financial Calculators Catalog
  const allCalculators: CalculatorItem[] = [
    // 1. Loan & EMI Calculators
    {
      id: 'home-loan-emi',
      name: 'Home Loan EMI Calculator',
      category: 'loans',
      icon: Home,
      description: 'Calculate monthly home loan EMIs, interest amortization, and PMAY subsidy savings.',
      route: '/home-loan-emi-calculator',
      badge: 'Popular'
    },
    {
      id: 'personal-loan-emi',
      name: 'Personal Loan EMI Calculator',
      category: 'loans',
      icon: Wallet,
      description: 'Estimate monthly installments, total interest, and reducing balance schedules.',
      route: '/personal-loan-emi-calculator',
      badge: 'High Intent'
    },
    {
      id: 'car-loan-emi',
      name: 'Car Loan EMI Calculator',
      category: 'loans',
      icon: Car,
      description: 'Plan monthly payments for new and used cars with on-road down payments.',
      route: '/car-loan-calculator',
      badge: 'Auto'
    },
    {
      id: 'education-loan-emi',
      name: 'Education Loan Calculator',
      category: 'loans',
      icon: BookOpen,
      description: 'Calculate post-moratorium EMIs and Section 80E tax deduction benefits.',
      route: '/student-loan-calculator',
      badge: 'Tax Saver'
    },
    {
      id: 'gold-loan-emi',
      name: 'Gold Loan EMI Calculator',
      category: 'loans',
      icon: Coins,
      description: 'Compute monthly interest payments and per-gram gold valuation advances.',
      route: '/gold-loan-emi-calculator',
      badge: 'Instant'
    },
    {
      id: 'loan-amortization',
      name: 'Loan Amortization Schedule',
      category: 'loans',
      icon: BarChart2,
      description: 'View month-by-month and year-by-year principal vs. interest breakdown.',
      route: '/amortization-calculator',
      badge: 'Amortization'
    },
    {
      id: 'home-affordability',
      name: 'Home Affordability Calculator',
      category: 'loans',
      icon: Home,
      description: 'Find out the maximum property cost and loan amount you qualify for.',
      route: '/home-affordability-calculator',
      badge: 'Eligibility'
    },
    {
      id: 'rent-vs-buy',
      name: 'Rent vs. Buy Calculator',
      category: 'loans',
      icon: Building2,
      description: 'Compare financial outcomes of renting a house versus buying with a home loan.',
      route: '/rent-vs-buy-calculator',
      badge: 'Analysis'
    },

    // 2. Investment & Wealth Calculators
    {
      id: 'compound-interest',
      name: 'Compound Interest Calculator',
      category: 'investments',
      icon: Percent,
      description: 'Calculate compounding returns on monthly, quarterly, or annual investments.',
      route: '/compound-interest-calculator',
      badge: 'Wealth'
    },
    {
      id: 'investment-growth',
      name: 'Investment Growth Calculator',
      category: 'investments',
      icon: TrendingUp,
      description: 'Project portfolio maturity value at expected annual rates of return.',
      route: '/investment-growth-calculator',
      badge: 'Forecaster'
    },
    {
      id: 'savings-goal',
      name: 'Savings Goal Calculator',
      category: 'investments',
      icon: PiggyBank,
      description: 'Determine required monthly savings to achieve target financial milestones.',
      route: '/savings-goal-calculator'
    },
    {
      id: 'emergency-fund',
      name: 'Emergency Fund Calculator',
      category: 'investments',
      icon: ShieldCheck,
      description: 'Calculate ideal contingency reserves based on 6 to 12 months of expenses.',
      route: '/emergency-fund-calculator'
    },
    {
      id: 'stock-investment',
      name: 'Stock Investment Calculator',
      category: 'investments',
      icon: DollarSign,
      description: 'Estimate returns based on equity price appreciation, dividends, and horizon.',
      route: '/stock-calculator'
    },
    {
      id: 'college-savings',
      name: 'Child Education / College Fund',
      category: 'investments',
      icon: BookOpen,
      description: 'Plan savings needed for higher education taking education inflation into account.',
      route: '/college-savings-calculator'
    },
    {
      id: 'inflation-impact',
      name: 'Inflation Impact Calculator',
      category: 'investments',
      icon: TrendingUp,
      description: 'Estimate how inflation erodes purchasing power of your money over time.',
      route: '/inflation-calculator'
    },

    // 3. Tax & Retirement Calculators
    {
      id: 'income-tax',
      name: 'Income Tax Calculator (FY 2025-26)',
      category: 'tax',
      icon: Receipt,
      description: 'Compare tax liabilities between Old and New Tax Regimes with deductions.',
      route: '/income-tax-calculator',
      badge: 'Old vs New'
    },
    {
      id: 'capital-gains-tax',
      name: 'Capital Gains Tax Calculator',
      category: 'tax',
      icon: TrendingUp,
      description: 'Calculate LTCG and STCG taxes on equity shares, mutual funds, and real estate.',
      route: '/capital-gains-calculator'
    },
    {
      id: 'sales-tax',
      name: 'GST & Sales Tax Calculator',
      category: 'tax',
      icon: PiggyBank,
      description: 'Calculate GST inclusive and exclusive prices across 5%, 12%, 18%, and 28% slabs.',
      route: '/sales-tax-calculator'
    },
    {
      id: 'payroll-tax',
      name: 'Payroll & Salary Take-Home',
      category: 'tax',
      icon: Wallet,
      description: 'Calculate net in-hand salary after Provident Fund (PF), Professional Tax & TDS.',
      route: '/payroll-tax-calculator'
    },
    {
      id: 'retirement-planner',
      name: 'Retirement Corpus Planner',
      category: 'tax',
      icon: PiggyBank,
      description: 'Estimate the total retirement nest egg required to sustain your lifestyle.',
      route: '/retirement-calculator',
      badge: 'Pensions'
    },
    {
      id: 'pension-annuity',
      name: 'Pension & Annuity Calculator',
      category: 'tax',
      icon: Receipt,
      description: 'Calculate guaranteed monthly annuity payouts from insurance or NPS.',
      route: '/annuity-calculator'
    },

    // 4. Credit Card & Debt Calculators
    {
      id: 'credit-card-payoff',
      name: 'Credit Card Payoff Calculator',
      category: 'cards',
      icon: CreditCard,
      description: 'Find out how long it will take to eliminate revolving credit card debt.',
      route: '/credit-card-payoff-calculator',
      badge: 'Debt Relief'
    },
    {
      id: 'credit-card-interest',
      name: 'Credit Card Interest Calculator',
      category: 'cards',
      icon: Percent,
      description: 'Calculate finance charges levied on outstanding balances at 36% to 42% APR.',
      route: '/credit-card-interest-calculator'
    },
    {
      id: 'balance-transfer',
      name: 'Balance Transfer Calculator',
      category: 'cards',
      icon: BarChart2,
      description: 'Determine exact interest savings by transferring high-cost debt to a lower APR card.',
      route: '/balance-transfer-calculator'
    },
    {
      id: 'debt-snowball',
      name: 'Debt Payoff & Consolidation',
      category: 'cards',
      icon: Wallet,
      description: 'Prioritize debt repayments using the Avalanche or Snowball strategy.',
      route: '/debt-payoff-calculator'
    },

    // 5. Business & Commercial Calculators
    {
      id: 'break-even',
      name: 'Break-Even Sales Calculator',
      category: 'business',
      icon: BarChart2,
      description: 'Calculate the minimum unit sales required to cover fixed and variable business costs.',
      route: '/break-even-calculator',
      badge: 'MSME'
    },
    {
      id: 'npv-calculator',
      name: 'Net Present Value (NPV)',
      category: 'business',
      icon: TrendingUp,
      description: 'Assess profitability of capital investment projects discounting future cash flows.',
      route: '/npv-calculator'
    },
    {
      id: 'irr-calculator',
      name: 'Internal Rate of Return (IRR)',
      category: 'business',
      icon: Percent,
      description: 'Calculate the annualized rate of earnings on capital expenditure and ventures.',
      route: '/irr-calculator'
    },
    {
      id: 'cash-flow',
      name: 'Business Cash Flow Estimator',
      category: 'business',
      icon: DollarSign,
      description: 'Forecast working capital inflows and outflows to prevent liquidity crunches.',
      route: '/cash-flow-calculator'
    },
    {
      id: 'asset-depreciation',
      name: 'Asset Depreciation Calculator',
      category: 'business',
      icon: BarChart2,
      description: 'Estimate straight-line and WDV depreciation for income tax deduction purposes.',
      route: '/depreciation-calculator'
    },

    // 6. Currency & International
    {
      id: 'currency-converter',
      name: 'Live Currency Converter',
      category: 'forex',
      icon: DollarSign,
      description: 'Convert INR against USD, EUR, GBP, AED, and 150+ international currencies.',
      route: '/currency-converter',
      badge: 'Live Forex'
    },
    {
      id: 'forex-markup',
      name: 'Foreign Exchange Markup Calculator',
      category: 'forex',
      icon: TrendingUp,
      description: 'Compare bank vs. card forex markups on overseas remittances and spends.',
      route: '/foreign-exchange-rate-calculator'
    }
  ];

  // Filtered Calculators
  const filteredCalculators = useMemo(() => {
    return allCalculators.filter((calc) => {
      // Category Match
      if (selectedCategory !== 'all' && calc.category !== selectedCategory) {
        return false;
      }
      // Search Match
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const nameMatch = calc.name.toLowerCase().includes(q);
        const descMatch = calc.description.toLowerCase().includes(q);
        const badgeMatch = (calc.badge || '').toLowerCase().includes(q);
        if (!nameMatch && !descMatch && !badgeMatch) return false;
      }
      return true;
    });
  }, [allCalculators, selectedCategory, searchQuery]);

  // Structured Data JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bankscart.com/' },
          { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.bankscart.com/calculators' }
        ]
      },
      {
        '@type': 'FinancialService',
        name: 'BanksCart Financial Calculators Hub',
        description: 'Comprehensive suite of Indian financial calculators: Home loan EMI, Personal loan EMI, SIP wealth, Income tax, GST, and business valuation tools.',
        url: 'https://www.bankscart.com/calculators'
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-ibm">
      <Helmet>
        <title>Financial Calculators India: Loan EMI, SIP, Income Tax & GST | BanksCart</title>
        <meta
          name="description"
          content="Explore 40+ free Indian financial calculators on BanksCart: Home loan EMI, personal loan EMI, car loan, SIP wealth, income tax (old vs new), GST, and retirement planning tools."
        />
        <link rel="canonical" href="https://www.bankscart.com/calculators" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumb path={['Home', 'Calculators']} />
        </div>
      </div>

      {/* ==================== HERO SECTION ==================== */}
      <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white pt-12 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 bg-[#1E3A8A]/60 border border-[#38BDF8]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#38BDF8] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Comprehensive Indian Financial Engines 2026
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Interactive <span className="text-[#38BDF8]">Financial Calculators</span>
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Plan loans, investments, taxes, and business cash flows with mathematical precision. 100% free, bank-accurate reducing balance formulas tailored to Indian financial benchmarks.
            </p>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto mb-12">
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
              <Calculator className="w-5 h-5 text-[#38BDF8] flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">40+ Calculators</p>
                <p className="text-[10px] text-slate-400">Complete Financial Suite</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
              <Percent className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">RBI Compliant</p>
                <p className="text-[10px] text-slate-400">Reducing Balance Math</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
              <Receipt className="w-5 h-5 text-amber-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">FY 2025-26 Tax</p>
                <p className="text-[10px] text-slate-400">Old vs New Regime</p>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <div>
                <p className="text-xs font-bold text-white">100% Free</p>
                <p className="text-[10px] text-slate-400">No Sign-Up Required</p>
              </div>
            </div>
          </div>

          {/* ==================== FLAGSHIP EMBEDDED LIVE CALCULATOR WIDGET ==================== */}
          <div className="bg-white text-[#0F172A] rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
              <div>
                <div className="text-[11px] font-bold text-[#1E3A8A] uppercase tracking-wider">Quick Calculation Engine</div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F172A]">Test Live Payments &amp; Growth</h3>
              </div>

              {/* Preset Selector */}
              <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                {[
                  { id: 'home', label: 'Home Loan' },
                  { id: 'personal', label: 'Personal Loan' },
                  { id: 'car', label: 'Car Loan' },
                  { id: 'sip', label: 'SIP Wealth' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleLiveTypeChange(item.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      activeLiveCalc === item.id
                        ? 'bg-[#1E3A8A] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Sliders Area */}
              <div className="lg:col-span-7 space-y-4">
                {/* Amount Slider */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-semibold text-slate-600">
                      {activeLiveCalc === 'sip' ? 'Monthly SIP Investment' : 'Total Loan Amount'}
                    </span>
                    <span className="font-bold text-[#0F172A] text-sm tabular-nums">
                      ₹{liveAmount.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={activeLiveCalc === 'sip' ? 500 : activeLiveCalc === 'personal' ? 50000 : 200000}
                    max={activeLiveCalc === 'sip' ? 100000 : activeLiveCalc === 'personal' ? 4000000 : 20000000}
                    step={activeLiveCalc === 'sip' ? 500 : 25000}
                    value={liveAmount}
                    onChange={(e) => setLiveAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>{activeLiveCalc === 'sip' ? '₹500 / mo' : '₹50,000'}</span>
                    <span>{activeLiveCalc === 'sip' ? '₹1 Lakh / mo' : '₹2 Crores'}</span>
                  </div>
                </div>

                {/* Rate Slider */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-semibold text-slate-600">
                      {activeLiveCalc === 'sip' ? 'Expected Annual Return' : 'Interest Rate (% p.a.)'}
                    </span>
                    <span className="font-bold text-[#1E3A8A] text-sm tabular-nums">{liveRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="5.0"
                    max="24.0"
                    step="0.1"
                    value={liveRate}
                    onChange={(e) => setLiveRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>5.0%</span>
                    <span>14.0%</span>
                    <span>24.0%</span>
                  </div>
                </div>

                {/* Tenure Slider */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-semibold text-slate-600">Tenure</span>
                    <span className="font-bold text-[#0F172A] text-sm tabular-nums">
                      {liveTenure} Years ({liveTenure * 12} Months)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max={activeLiveCalc === 'home' ? 30 : 15}
                    step="1"
                    value={liveTenure}
                    onChange={(e) => setLiveTenure(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>1 Year</span>
                    <span>{activeLiveCalc === 'home' ? '30 Years' : '15 Years'}</span>
                  </div>
                </div>
              </div>

              {/* Result Summary */}
              <div className="lg:col-span-5 bg-[#0F172A] text-white rounded-xl p-6 border border-slate-700 shadow-md">
                <span className="text-[11px] font-bold text-[#38BDF8] uppercase tracking-wider">
                  {liveResults.primaryLabel}
                </span>
                <div className="mt-2 text-3xl font-extrabold text-white tabular-nums">
                  ₹{liveResults.primaryVal.toLocaleString('en-IN')}
                  {activeLiveCalc !== 'sip' && <span className="text-xs text-slate-400 font-normal"> / month</span>}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-700 space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>{liveResults.sub1Label}:</span>
                    <span className="font-bold text-white tabular-nums">₹{liveResults.sub1Val.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>{liveResults.sub2Label}:</span>
                    <span className="font-bold text-emerald-400 tabular-nums">₹{liveResults.sub2Val.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Link
                  to={activeLiveCalc === 'home' ? '/home-loan-emi-calculator' : activeLiveCalc === 'personal' ? '/personal-loan-emi-calculator' : activeLiveCalc === 'car' ? '/car-loan-calculator' : '/investment-growth-calculator'}
                  className="mt-6 w-full py-2.5 bg-[#A16207] hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow"
                >
                  Open Dedicated Calculator <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CALCULATORS DIRECTORY GRID ==================== */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Bar & Search */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-1">
                <Layers className="w-3.5 h-3.5" />
                Complete Financial Directory
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                Browse All Calculators ({filteredCalculators.length} Tools Available)
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Filter by category or search by calculator name, financial formula, or use case.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search calculator (e.g. EMI, Tax, GST)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none shadow-sm"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none">
            {[
              { id: 'all', label: 'All Calculators' },
              { id: 'loans', label: 'Loan & EMI' },
              { id: 'investments', label: 'Investments & Wealth' },
              { id: 'tax', label: 'Income Tax & GST' },
              { id: 'cards', label: 'Cards & Debt' },
              { id: 'business', label: 'Business & MSME' },
              { id: 'forex', label: 'Currency & Forex' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex-shrink-0 ${
                  selectedCategory === tab.id
                    ? 'bg-[#1E3A8A] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Calculator Tiles Grid */}
          {filteredCalculators.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto shadow-sm">
              <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-800">No matching calculator found</h3>
              <p className="text-xs text-slate-500 mt-1">Try searching with a broader term or reset the category filter.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-4 py-2 bg-[#1E3A8A] text-white rounded-lg text-xs font-bold hover:bg-blue-900"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCalculators.map((calc) => {
                const Icon = calc.icon;
                return (
                  <Link
                    key={calc.id}
                    to={calc.route}
                    className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-blue-50 text-[#1E3A8A] rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                          <Icon className="w-6 h-6" />
                        </div>
                        {calc.badge && (
                          <span className="text-[10px] font-bold text-[#1E3A8A] bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {calc.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#1E3A8A] transition-colors mb-2">
                        {calc.name}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed mb-6">
                        {calc.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#1E3A8A]">
                      <span>Open Calculator</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ==================== MATHEMATICAL ACCURACY & FORMULAS GUIDE ==================== */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Transparent Fiduciary Standards
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Underlying Mathematical Formulas &amp; Methodology
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every calculator on BanksCart adheres strictly to Reserve Bank of India (RBI) compounding guidelines and transparent financial algorithms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6">
              <h3 className="text-base font-bold text-[#0F172A] mb-2">Reducing Balance EMI Formula</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Calculates true amortization where interest is charged strictly on the declining principal balance each month.
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-[11px] text-[#1E3A8A]">
                EMI = P × r × (1 + r)ⁿ / [(1 + r)ⁿ - 1]
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6">
              <h3 className="text-base font-bold text-[#0F172A] mb-2">Compound Interest &amp; SIP Wealth</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Projects regular monthly recurring investments growing with monthly compounding interest.
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-[11px] text-emerald-700">
                M = P × [((1 + i)ⁿ - 1) / i] × (1 + i)
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6">
              <h3 className="text-base font-bold text-[#0F172A] mb-2">Income Tax &amp; Surcharge Math</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Evaluates slab-wise marginal tax rates, 87A rebate, standard deduction (₹75,000 in FY 2025-26), and health cess.
              </p>
              <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-[11px] text-amber-800">
                Tax = Slab Total - 87A + 4% Health/Edu Cess
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ ACCORDION ==================== */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Frequently Asked Questions About Financial Calculations
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Learn how bank calculations work, why EMIs differ between lenders, and how to optimize your debt.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: 'How accurate are the EMI calculations on BanksCart?',
                a: 'BanksCart calculators use standard reducing-balance actuarial formulas identical to the core banking software utilized by SBI, HDFC, and ICICI. Minor differences in final quotes may arise only from one-time processing charges, statutory stamp duties, or initial broken-period interest.'
              },
              {
                q: 'What is the difference between Flat Interest Rate and Reducing Balance Rate?',
                a: 'A flat interest rate charges interest on your full original principal throughout the loan tenure, which effectively doubles your true borrowing cost. Reducing balance interest is charged only on the remaining unpaid principal each month, saving thousands of rupees. All BanksCart calculators use reducing balance.'
              },
              {
                q: 'Can I calculate pre-payment savings on my home or personal loan?',
                a: 'Yes. Our specialized Loan Amortization and Prepayment calculators allow you to model part-prepayments (lump sum or annual percentage increases) to see exactly how many years you can shave off your loan and how much interest you save.'
              },
              {
                q: 'Are the tax calculators updated for the latest Union Budget?',
                a: 'Yes. Our Income Tax Calculator incorporates the latest Union Budget provisions for FY 2025-26 (AY 2026-27), including the revised standard deduction of ₹75,000 under the New Tax Regime and updated slab thresholds.'
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm p-5">
                <h3 className="font-bold text-sm text-[#0F172A] mb-2">{faq.q}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Calculators;
