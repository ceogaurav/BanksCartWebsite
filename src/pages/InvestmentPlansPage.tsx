import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Target,
  GraduationCap,
  Home,
  Palmtree,
  Shield,
  Plane,
  Briefcase,
  TrendingUp,
  Percent,
  CheckCircle2,
  Sparkles,
  ChevronDown,
  ArrowRight,
  HelpCircle,
  Clock,
  Coins,
  Compass,
  Layers,
  Award
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import ApplyButton from '../components/common/ApplyButton';

interface InvestmentPlansPageProps {
  openApplyModal?: (loanType?: string) => void;
}

interface LifeGoal {
  id: string;
  title: string;
  tagline: string;
  icon: any;
  defaultTarget: number;
  defaultYears: number;
  expectedRate: number;
  allocationEquity: number;
  allocationDebt: number;
  allocationGold: number;
  strategySummary: string;
}

const PRESET_GOALS: LifeGoal[] = [
  {
    id: 'retirement',
    title: 'Retirement & Financial Freedom (FIRE)',
    tagline: 'Build an inflation-shielded corpus for a dignified, independent life.',
    icon: Palmtree,
    defaultTarget: 25000000, // ₹2.5 Crores
    defaultYears: 20,
    expectedRate: 13.0,
    allocationEquity: 70,
    allocationDebt: 25,
    allocationGold: 5,
    strategySummary: 'Long-term equity compounding in Flexi-Cap and Large-Cap funds supplemented by voluntary NPS Tier 1 for additional tax deductions.'
  },
  {
    id: 'child_education',
    title: "Child's Higher Education",
    tagline: 'Fund prestigious college tuition fees in India or abroad without debt.',
    icon: GraduationCap,
    defaultTarget: 5000000, // ₹50 Lakhs
    defaultYears: 12,
    expectedRate: 13.5,
    allocationEquity: 65,
    allocationDebt: 30,
    allocationGold: 5,
    strategySummary: 'Aggressive equity accumulation in early years, progressively de-risking into short-term debt and FDs 2 years prior to matriculation.'
  },
  {
    id: 'dream_home',
    title: 'Dream Home Down Payment',
    tagline: 'Accumulate a substantial 20-30% down payment to minimize home loan EMIs.',
    icon: Home,
    defaultTarget: 3500000, // ₹35 Lakhs
    defaultYears: 7,
    expectedRate: 11.5,
    allocationEquity: 50,
    allocationDebt: 45,
    allocationGold: 5,
    strategySummary: 'Balanced advantage and multi-asset allocation funds to protect capital from market drawdown cycles while maintaining steady capital growth.'
  },
  {
    id: 'emergency_fund',
    title: 'Emergency Contingency Shield',
    tagline: '6 to 12 months of living expenses shielded for sudden medical or job transitions.',
    icon: Shield,
    defaultTarget: 600000, // ₹6 Lakhs
    defaultYears: 2,
    expectedRate: 7.2,
    allocationEquity: 0,
    allocationDebt: 95,
    allocationGold: 5,
    strategySummary: '100% liquid debt funds and high-yield scheduled bank fixed deposits with instant 24/7 ATM/IMPS redemption access.'
  },
  {
    id: 'wealth_growth',
    title: 'Wealth Multiplier & Alpha Growth',
    tagline: 'Aggressively compound discretionary surplus into high-conviction market leaders.',
    icon: TrendingUp,
    defaultTarget: 10000000, // ₹1 Crore
    defaultYears: 10,
    expectedRate: 15.0,
    allocationEquity: 85,
    allocationDebt: 10,
    allocationGold: 5,
    strategySummary: 'High-alpha focus on top-performing Mid-Cap and Small-Cap direct mutual funds combined with diversified index holdings.'
  },
  {
    id: 'lifestyle_travel',
    title: 'Sabbatical & International Travel',
    tagline: 'Fund life-enriching luxury journeys and personal milestones fully paid in cash.',
    icon: Plane,
    defaultTarget: 1500000, // ₹15 Lakhs
    defaultYears: 4,
    expectedRate: 9.5,
    allocationEquity: 35,
    allocationDebt: 60,
    allocationGold: 5,
    strategySummary: 'Conservative hybrid and arbitrage funds delivering post-tax stability with superior yields compared to standard savings accounts.'
  }
];

const InvestmentPlansPage: React.FC<InvestmentPlansPageProps> = ({ openApplyModal }) => {
  // Goal calculator state
  const [selectedGoalId, setSelectedGoalId] = useState<string>('retirement');
  const activeGoal = useMemo(() => {
    return PRESET_GOALS.find(g => g.id === selectedGoalId) || PRESET_GOALS[0];
  }, [selectedGoalId]);

  const [targetCorpus, setTargetCorpus] = useState<number>(activeGoal.defaultTarget);
  const [targetYears, setTargetYears] = useState<number>(activeGoal.defaultYears);
  const [expectedRate, setExpectedRate] = useState<number>(activeGoal.expectedRate);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Sync state when active goal changes
  const handleGoalSelect = (goal: LifeGoal) => {
    setSelectedGoalId(goal.id);
    setTargetCorpus(goal.defaultTarget);
    setTargetYears(goal.defaultYears);
    setExpectedRate(goal.expectedRate);
  };

  // Reverse compounding formula: Calculate monthly SIP required to achieve Future Target
  // FV = P * [((1 + i)^n - 1) / i] * (1 + i)
  // => P = FV / {[((1 + i)^n - 1) / i] * (1 + i)}
  const calculations = useMemo(() => {
    const FV = targetCorpus;
    const t = targetYears;
    const r = expectedRate / 100;
    const n = t * 12;
    const i = r / 12;

    const denominator = ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const requiredMonthlySip = FV / denominator;
    const totalPrincipal = requiredMonthlySip * n;
    const wealthGain = FV - totalPrincipal;

    return {
      monthlySip: Math.max(500, Math.round(requiredMonthlySip)),
      totalInvested: Math.round(totalPrincipal),
      wealthGain: Math.round(wealthGain),
      targetAmount: FV
    };
  }, [targetCorpus, targetYears, expectedRate]);

  const faqs = [
    {
      q: "What is Goal-Based Investing and why is it superior to random savings?",
      a: "Goal-based investing links every single investment to a tangible life milestone (such as a house down payment in 5 years or retirement in 20 years). By giving your money a specific deadline and target amount, you can mathematically determine the exact asset allocation (equity vs debt) required, shielding short-term goals from market crashes while allowing long-term money to compound aggressively."
    },
    {
      q: "How should my asset allocation change as my target date approaches?",
      a: "Financial planners recommend a 'Glide Path' approach. For a 15-year goal, you can maintain 70-80% equity during the first 10 years to maximize growth. When you are 2 to 3 years away from your target date, systematically shift capital via Systematic Transfer Plans (STP) into capital-protected fixed deposits and liquid funds to lock in your accumulated gains safely."
    },
    {
      q: "How do I account for inflation when planning long-term goals like college tuition?",
      a: "Education inflation in India historically runs between 8% to 10% per annum, and healthcare inflation runs around 12%. When setting your target, always inflate today's cost. For example, a college degree costing ₹25 Lakhs today will require approximately ₹50 Lakhs in 12 years at 6% baseline inflation."
    },
    {
      q: "Can I invest in multiple goals through a single BanksCart account?",
      a: "Yes. You can create separate, tagged portfolios for each individual life milestone (e.g., 'Retirement 2045', 'Rohan Education 2038', 'Home Down Payment 2029') within your BanksCart dashboard, tracking progress towards each target independently."
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-800">
      <Helmet>
        <title>Best Investment Plans in India: Goal-Based Financial Planning (2026) | BanksCart</title>
        <meta 
          name="description" 
          content="Discover top investment plans in India for Retirement (FIRE), Child Higher Education, Home Purchase, and Tax Saving. Calculate monthly SIP targets for life milestones." 
        />
        <link rel="canonical" href="https://bankscart.com/investment/more-plans" />
      </Helmet>

      {/* Breadcrumb Navigation */}
      <Breadcrumb path={["Home", "Investments", "Investment Plans"]} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide uppercase mb-5">
              <Target className="w-4 h-4 text-emerald-400" />
              Strategic Wealth Architecture • Life-Stage Planning
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              Goal-Based Investment Plans & Wealth Architecture
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Transform your life milestones into achievable mathematical roadmaps. Whether securing early financial freedom, funding world-class education, or buying your dream home, invest with tailored asset allocation models designed to beat inflation.
            </p>

            {/* Strategic Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3">
                <div className="text-emerald-400 font-mono font-bold text-lg sm:text-xl">Milestone</div>
                <div className="text-xs text-slate-400 mt-0.5">Goal-Driven Roadmaps</div>
              </div>
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3">
                <div className="text-amber-400 font-mono font-bold text-lg sm:text-xl">Asset Mix</div>
                <div className="text-xs text-slate-400 mt-0.5">Equity, Debt & Gold</div>
              </div>
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3">
                <div className="text-blue-400 font-mono font-bold text-lg sm:text-xl">Inflation</div>
                <div className="text-xs text-slate-400 mt-0.5">Beats 7% Depreciation</div>
              </div>
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3">
                <div className="text-purple-400 font-mono font-bold text-lg sm:text-xl">Zero Fee</div>
                <div className="text-xs text-slate-400 mt-0.5">Direct Advisory</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => {
                  document.getElementById('goal-calculator')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all duration-200 flex items-center gap-2"
              >
                <Compass className="w-5 h-5" />
                Calculate Target Goal SIP
              </button>

              {openApplyModal ? (
                <ApplyButton
                  loanType="Investment Plan"
                  openApplyModal={openApplyModal}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all duration-200 flex items-center gap-2"
                >
                  Consult Investment Expert
                  <ArrowRight className="w-4 h-4" />
                </ApplyButton>
              ) : (
                <button
                  onClick={() => {
                    document.getElementById('life-solutions')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all duration-200 flex items-center gap-2"
                >
                  Explore All Plans
                  <ChevronDown className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">

        {/* SECTION 1: Interactive Goal Target SIP Calculator */}
        <section id="goal-calculator" className="scroll-mt-24">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
            <div className="max-w-3xl mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                Reverse Engineering Precision Engine
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Goal-Based Target SIP Calculator
              </h2>
              <p className="text-sm sm:text-base text-slate-600 mt-2">
                Select your life milestone below. Our calculator instantly determines the required monthly investment needed to reach your exact target.
              </p>
            </div>

            {/* Goal Selector Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
              {PRESET_GOALS.map((goal) => {
                const Icon = goal.icon;
                const isSelected = selectedGoalId === goal.id;
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => handleGoalSelect(goal)}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                      isSelected
                        ? 'bg-blue-50/80 border-[#1E3A8A] text-[#1E3A8A] shadow-sm ring-1 ring-[#1E3A8A]'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`w-5 h-5 mb-2 ${isSelected ? 'text-[#1E3A8A]' : 'text-slate-500'}`} />
                    <span className="text-xs font-bold leading-tight line-clamp-2">{goal.title}</span>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Controls Column */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Target Corpus Amount */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-700">Target Corpus Required</label>
                    <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                      ₹{targetCorpus >= 10000000 
                        ? `${(targetCorpus / 10000000).toFixed(2)} Crores` 
                        : `${(targetCorpus / 100000).toFixed(1)} Lakhs`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="50000000"
                    step="500000"
                    value={targetCorpus}
                    onChange={(e) => setTargetCorpus(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
                    <span>₹5 Lakhs</span>
                    <span>₹50 Lakhs</span>
                    <span>₹1 Crore</span>
                    <span>₹2.5 Crores</span>
                    <span>₹5 Crores</span>
                  </div>
                </div>

                {/* Target Timeline */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-700">Timeline to Achieve Goal</label>
                    <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                      {targetYears} Years ({targetYears * 12} Monthly Installments)
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={targetYears}
                    onChange={(e) => setTargetYears(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
                    <span>1 Year</span>
                    <span>5 Years</span>
                    <span>10 Years</span>
                    <span>20 Years</span>
                    <span>30 Years</span>
                  </div>
                </div>

                {/* Expected Return Rate */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-semibold text-slate-700">Assumed Annual Compounding (CAGR)</label>
                    <span className="text-lg font-bold text-slate-900 font-mono tabular-nums">
                      {expectedRate.toFixed(1)}% p.a.
                    </span>
                  </div>
                  <input
                    type="range"
                    min="7.0"
                    max="16.0"
                    step="0.5"
                    value={expectedRate}
                    onChange={(e) => setExpectedRate(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
                    <span>7% (FD/Debt)</span>
                    <span>11% (Balanced Hybrid)</span>
                    <span>13% (Diversified Equity)</span>
                    <span>16% (High Alpha)</span>
                  </div>
                </div>

                {/* Recommended Allocation Bar */}
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    Recommended Asset Mix for {activeGoal.title}
                  </div>
                  <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden flex mb-2">
                    <div className="bg-blue-600 h-full" style={{ width: `${activeGoal.allocationEquity}%` }} />
                    <div className="bg-emerald-500 h-full" style={{ width: `${activeGoal.allocationDebt}%` }} />
                    <div className="bg-amber-400 h-full" style={{ width: `${activeGoal.allocationGold}%` }} />
                  </div>
                  <div className="flex justify-between text-xs text-slate-600 font-medium">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-600 inline-block"></span>Equity ({activeGoal.allocationEquity}%)</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>Debt/FD ({activeGoal.allocationDebt}%)</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>Gold/SGB ({activeGoal.allocationGold}%)</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-3 italic border-t border-slate-200 pt-2">
                    {activeGoal.strategySummary}
                  </p>
                </div>

              </div>

              {/* Result Maturity Card */}
              <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#1E3A8A] text-white rounded-2xl p-6 sm:p-8 shadow-md">
                <div className="text-xs uppercase font-semibold text-slate-300 tracking-wider mb-1">
                  Required Monthly SIP to Achieve Goal
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-emerald-400 mb-2">
                  ₹{calculations.monthlySip.toLocaleString('en-IN')}<span className="text-lg font-sans font-medium text-slate-300">/Month</span>
                </div>
                <div className="text-xs text-slate-300 mb-6">
                  Invested every month for {targetYears} years at {expectedRate}% CAGR
                </div>

                <div className="space-y-4 pt-4 border-t border-white/10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Target Corpus:</span>
                    <span className="font-mono font-bold text-white">
                      ₹{calculations.targetAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Total Capital You Invest:</span>
                    <span className="font-mono font-semibold text-slate-200">
                      ₹{calculations.totalInvested.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-300">Gain from Compounding:</span>
                    <span className="font-mono font-bold text-emerald-400">
                      +₹{calculations.wealthGain.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Progress bar split */}
                <div className="mt-6">
                  <div className="flex justify-between text-xs text-slate-400 mb-1 font-mono">
                    <span>You Put In ({Math.round((calculations.totalInvested / calculations.targetAmount) * 100)}%)</span>
                    <span>Market Returns ({Math.round((calculations.wealthGain / calculations.targetAmount) * 100)}%)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden flex">
                    <div 
                      className="bg-blue-400 h-full" 
                      style={{ width: `${(calculations.totalInvested / calculations.targetAmount) * 100}%` }}
                    />
                    <div 
                      className="bg-emerald-400 h-full" 
                      style={{ width: `${(calculations.wealthGain / calculations.targetAmount) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  {openApplyModal ? (
                    <ApplyButton
                      loanType={`Investment Goal - ${activeGoal.title}`}
                      openApplyModal={openApplyModal}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-md text-center block transition-all"
                    >
                      Start Planning This Goal
                    </ApplyButton>
                  ) : (
                    <button
                      onClick={() => {
                        document.getElementById('life-solutions')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-md text-center block transition-all"
                    >
                      View Suggested Portfolios
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Life-Stage Solutions Grid */}
        <section id="life-solutions" className="scroll-mt-24">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
              <Layers className="w-3.5 h-3.5" />
              Comprehensive Strategies
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Life-Stage Investment Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Explore purpose-built portfolios designed for specific life transitions, time horizons, and liquidity conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRESET_GOALS.map((goal) => {
              const IconComp = goal.icon;
              return (
                <div 
                  key={goal.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center font-bold mb-4">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {goal.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                      {goal.tagline}
                    </p>

                    <div className="space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-600">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Benchmark Horizon:</span>
                        <span className="font-semibold text-slate-800">{goal.defaultYears} Years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Target Range:</span>
                        <span className="font-mono font-semibold text-slate-800">
                          ₹{(goal.defaultTarget / 100000).toFixed(0)} Lakhs+
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Asset Strategy:</span>
                        <span className="font-semibold text-emerald-700">
                          {goal.allocationEquity}% Eq / {goal.allocationDebt}% Debt
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    {openApplyModal ? (
                      <ApplyButton
                        loanType={`Investment Plan - ${goal.title}`}
                        openApplyModal={openApplyModal}
                        className="w-full bg-[#1E3A8A] hover:bg-blue-900 text-white font-semibold text-xs py-2.5 px-4 rounded-xl transition-colors text-center block"
                      >
                        Start Plan
                      </ApplyButton>
                    ) : (
                      <button
                        onClick={() => handleGoalSelect(goal)}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs py-2.5 px-4 rounded-xl transition-colors text-center block"
                      >
                        Simulate in Calculator
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: Asset Allocation Framework by Risk Profile */}
        <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-slate-800">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3">
              <Award className="w-3.5 h-3.5" />
              Risk Profiling Matrix
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Institutional Asset Allocation Models
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              Tailoring equity, fixed income, and sovereign gold weights based on your psychological risk tolerance and time horizon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 uppercase tracking-wider mb-3 inline-block">
                Conservative Profile
              </span>
              <h4 className="text-base font-bold text-white mb-2">Capital Preservation First</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Prioritizes steady regular income and zero principal volatility. Suited for retirees and short horizons under 3 years.
              </p>
              <div className="space-y-1.5 text-xs text-slate-400 font-mono">
                <div>• Debt / Bank FDs: 70% - 80%</div>
                <div>• Large Cap Equities: 15% - 20%</div>
                <div>• Sovereign Gold Bonds: 5%</div>
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 uppercase tracking-wider mb-3 inline-block">
                Moderate Profile
              </span>
              <h4 className="text-base font-bold text-white mb-2">Balanced Growth & Stability</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Balances wealth accumulation with downside cushioning. Ideal for 5 to 10-year targets like home purchases.
              </p>
              <div className="space-y-1.5 text-xs text-slate-400 font-mono">
                <div>• Diversified Equities: 50% - 60%</div>
                <div>• Corporate Bonds / FDs: 30% - 40%</div>
                <div>• Sovereign Gold Bonds: 10%</div>
              </div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 uppercase tracking-wider mb-3 inline-block">
                Aggressive Profile
              </span>
              <h4 className="text-base font-bold text-white mb-2">Maximum Alpha & Compounding</h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Focuses purely on exponential multi-bagger wealth creation over 10+ year horizons like retirement and FIRE.
              </p>
              <div className="space-y-1.5 text-xs text-slate-400 font-mono">
                <div>• Mid & Small Cap Equity: 75% - 85%</div>
                <div>• Emergency Debt Cushion: 10% - 15%</div>
                <div>• Sovereign Gold Bonds: 5%</div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: FAQs */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Goal Planning FAQs
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

        {/* SECTION 5: Final CTA */}
        <section className="bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 text-white rounded-2xl p-8 sm:p-12 text-center border border-slate-800 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Build Your Customized Wealth Plan Today
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8">
            Connect with our certified financial planners or start automated direct SIPs tailored to your exact target dates.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {openApplyModal ? (
              <ApplyButton
                loanType="Investment Plan - Final CTA"
                openApplyModal={openApplyModal}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-md transition-all inline-block"
              >
                Schedule Free Portfolio Consultation
              </ApplyButton>
            ) : (
              <Link
                to="/investment"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-md transition-all inline-block"
              >
                Explore Investment Overview
              </Link>
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default InvestmentPlansPage;
