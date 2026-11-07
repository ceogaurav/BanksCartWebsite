import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Home,
  Calculator,
  TrendingUp,
  PieChart,
  BarChart3,
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
  Zap,
  Clock,
  Banknote,
  Check
} from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';

interface HomeLoanEMIProps {
  openApplyModal?: (loanType?: string) => void;
  openEligibilityModal?: () => void;
  openCibilModal?: () => void;
}

interface LendersRateRow {
  bank: string;
  rate: string;
  processingFee: string;
  maxAmount: string;
  maxTenure: string;
  highlight: string;
}

const TOP_HOME_LOAN_BANKS: LendersRateRow[] = [
  {
    bank: 'State Bank of India (SBI)',
    rate: '8.40% - 9.15% p.a.',
    processingFee: '0.35% (Min ₹2,000) + GST',
    maxAmount: 'Up to ₹10 Crores',
    maxTenure: 'Up to 30 Years',
    highlight: 'Lowest EBLR benchmark spread + 5 bps concession for women'
  },
  {
    bank: 'HDFC Bank',
    rate: '8.70% - 9.40% p.a.',
    processingFee: '0.50% (Min ₹3,000) + GST',
    maxAmount: 'Up to ₹10 Crores',
    maxTenure: 'Up to 30 Years',
    highlight: 'Instant in-principle digital sanction with zero branch visits'
  },
  {
    bank: 'ICICI Bank',
    rate: '8.75% - 9.50% p.a.',
    processingFee: '0.50% + GST',
    maxAmount: 'Up to ₹10 Crores',
    maxTenure: 'Up to 30 Years',
    highlight: 'Pre-approved home loans with paperless legal verification'
  },
  {
    bank: 'Bank of Baroda',
    rate: '8.45% - 9.30% p.a.',
    processingFee: '0.25% (Min ₹1,500) + GST',
    maxAmount: 'Up to ₹7.5 Crores',
    maxTenure: 'Up to 30 Years',
    highlight: 'Lowest processing fee concessions linked directly to BRLLR'
  },
  {
    bank: 'Axis Bank',
    rate: '8.75% - 9.45% p.a.',
    processingFee: '0.50% (Min ₹2,500) + GST',
    maxAmount: 'Up to ₹5 Crores',
    maxTenure: 'Up to 30 Years',
    highlight: '12-EMI waiver program on clean, on-time repayments'
  },
  {
    bank: 'Kotak Mahindra Bank',
    rate: '8.70% - 9.35% p.a.',
    processingFee: '0.50% + GST',
    maxAmount: 'Up to ₹10 Crores',
    maxTenure: 'Up to 25 Years',
    highlight: 'Fast-track digital processing for high-income professionals'
  },
  {
    bank: 'LIC Housing Finance',
    rate: '8.50% - 9.55% p.a.',
    processingFee: '0.25% - 0.50% + GST',
    maxAmount: 'Up to ₹15 Crores',
    maxTenure: 'Up to 30 Years',
    highlight: 'Flexible underwriting for self-employed and non-metro buyers'
  }
];

const FAQS = [
  {
    q: 'How is a Home Loan EMI calculated in India?',
    a: 'Home loan EMIs in India are computed using the standard reducing-balance amortization formula: E = [P × r × (1+r)ⁿ] / [(1+r)ⁿ – 1], where P is the sanctioned principal loan amount, r is the monthly interest rate (annual rate divided by 12 and 100), and n is the total tenure in months. In the early years, a larger portion of each EMI services interest, while towards the end of the loan tenure, the majority goes toward principal reduction.'
  },
  {
    q: 'How do changes in the RBI Repo Rate affect my Home Loan EMI?',
    a: 'Per RBI guidelines introduced in October 2019, all retail floating-rate home loans sanctioned by scheduled commercial banks must be pegged to an External Benchmark Lending Rate (EBLR), which is usually the RBI Repo Rate. When the RBI raises or cuts the repo rate, banks must adjust your floating interest rate accordingly. Typically, banks increase or decrease the remaining loan tenure rather than changing your monthly EMI, unless you request an EMI restructuring.'
  },
  {
    q: 'What income tax deductions can I claim on my Home Loan EMI?',
    a: 'Under the Indian Income Tax Act, 1961 (Old Tax Regime): 1) Section 24(b) permits a deduction of up to ₹2,00,000 per financial year on interest paid for a self-occupied residential property. 2) Section 80C allows a deduction of up to ₹1,50,000 per financial year for the principal repayment component, stamp duty, and registration charges. Combined, an individual in the 30% tax bracket can save over ₹1,09,200 annually in taxes.'
  },
  {
    q: 'Are there any penalties for prepaying or foreclosing my Home Loan?',
    a: 'No. The Reserve Bank of India (RBI) strictly prohibits commercial banks, housing finance companies (HFCs), and NBFCs from charging any prepayment or foreclosure penalties on floating-rate home loans sanctioned to individual borrowers. You can make lump-sum part-payments or clear your loan entirely with zero penalty.'
  },
  {
    q: 'How does paying 1 extra EMI every year accelerate loan payoff?',
    a: 'Making just 1 additional EMI payment every year directly reduces your principal balance. For example, on a ₹50 Lakh home loan at 8.5% for 20 years (standard EMI ~₹43,391), paying 1 extra EMI each year reduces your total repayment tenure by over 4.5 years and saves you more than ₹8.5 Lakhs in interest outgo!'
  },
  {
    q: 'What is the difference between Pre-EMI and Full EMI?',
    a: 'Pre-EMI applies to under-construction properties where funds are disbursed in tranches. During the building phase, you pay only simple interest on the actual cumulative funds disbursed so far. Full EMI begins only after the complete sanction amount is disbursed upon property completion, consisting of both principal and interest components.'
  },
  {
    q: 'What is the maximum Loan-to-Value (LTV) ratio allowed for home loans in India?',
    a: 'Under RBI regulations: 1) Loans up to ₹30 Lakhs: Maximum LTV is 90% (borrower contributes 10% margin); 2) Loans between ₹30 Lakhs and ₹75 Lakhs: Maximum LTV is 80% (20% margin); 3) Loans above ₹75 Lakhs: Maximum LTV is 75% (25% margin).'
  },
  {
    q: 'Can co-borrowers claim separate Section 24(b) and 80C tax benefits?',
    a: 'Yes. If a home loan is jointly taken by co-owners (e.g., husband and wife) and both contribute to servicing the EMIs, each co-owner can independently claim up to ₹2 Lakhs under Section 24(b) and up to ₹1.5 Lakhs under Section 80C in proportion to their ownership share, effectively doubling the household tax deduction to ₹7 Lakhs per year!'
  }
];

export const HomeLoanEMI: React.FC<HomeLoanEMIProps> = ({
  openApplyModal,
  openEligibilityModal,
  openCibilModal
}) => {
  const navigate = useNavigate();

  // Local immediate slider display values (for 60fps instant UI updates)
  const [displayPrincipal, setDisplayPrincipal] = useState<number>(5000000); // ₹50 Lakhs
  const [displayRate, setDisplayRate] = useState<number>(8.5); // 8.5% p.a.
  const [displayTenure, setDisplayTenure] = useState<number>(240); // 20 years (240 months)

  // Debounced calculation state (150ms delay for INP latency bottlenecks)
  const [calcPrincipal, setCalcPrincipal] = useState<number>(5000000);
  const [calcRate, setCalcRate] = useState<number>(8.5);
  const [calcTenure, setCalcTenure] = useState<number>(240);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Amortization Schedule View: '10years' | 'full'
  const [scheduleView, setScheduleView] = useState<'10years' | 'full'>('10years');

  // Timers for 150ms debouncing
  const principalTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rateTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tenureTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePrincipalChange = useCallback((val: number) => {
    setDisplayPrincipal(val);
    if (principalTimer.current) clearTimeout(principalTimer.current);
    principalTimer.current = setTimeout(() => setCalcPrincipal(val), 150);
  }, []);

  const handleRateChange = useCallback((val: number) => {
    setDisplayRate(val);
    if (rateTimer.current) clearTimeout(rateTimer.current);
    rateTimer.current = setTimeout(() => setCalcRate(val), 150);
  }, []);

  const handleTenureChange = useCallback((val: number) => {
    setDisplayTenure(val);
    if (tenureTimer.current) clearTimeout(tenureTimer.current);
    tenureTimer.current = setTimeout(() => setCalcTenure(val), 150);
  }, []);

  useEffect(() => {
    return () => {
      if (principalTimer.current) clearTimeout(principalTimer.current);
      if (rateTimer.current) clearTimeout(rateTimer.current);
      if (tenureTimer.current) clearTimeout(tenureTimer.current);
    };
  }, []);

  // Standard Reducing Balance Calculation
  const { monthlyEmi, totalPayment, totalInterest, principalPercent, interestPercent, taxBenefits, yearlySchedule, prepaymentStats } =
    useMemo(() => {
      const p = calcPrincipal;
      const r = calcRate / (12 * 100);
      const n = calcTenure;

      if (p <= 0 || n <= 0 || r <= 0) {
        return {
          monthlyEmi: 0,
          totalPayment: 0,
          totalInterest: 0,
          principalPercent: 100,
          interestPercent: 0,
          taxBenefits: { sec80C: 0, sec24b: 0, totalDeduction: 0, annualTaxSaved: 0 },
          yearlySchedule: [],
          prepaymentStats: { tenureSavedYears: 0, interestSaved: 0 }
        };
      }

      const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const roundedEmi = Math.round(emi);
      const totalPay = roundedEmi * n;
      const totalInt = Math.max(0, totalPay - p);

      const pPercent = totalPay > 0 ? Math.round((p / totalPay) * 100) : 100;
      const iPercent = 100 - pPercent;

      // Tax benefits calculation (First Year)
      const firstYearInterest = (totalInt / n) * 12;
      const sec24b = Math.min(200000, firstYearInterest);
      const sec80C = Math.min(150000, p * 0.05);
      const totalDeduction = sec24b + sec80C;
      const annualTaxSaved = Math.round(totalDeduction * 0.312); // 30% bracket + 4% cess

      // Yearly Amortization Schedule
      const schedule = [];
      let remPrincipal = p;
      const totalYears = Math.ceil(n / 12);

      for (let yr = 1; yr <= totalYears; yr++) {
        let yrPrincipal = 0;
        let yrInterest = 0;
        let m = 1;
        const openingBalance = remPrincipal;

        while (m <= 12 && remPrincipal > 0) {
          const intPayment = remPrincipal * r;
          const prPayment = roundedEmi - intPayment;
          yrPrincipal += prPayment;
          yrInterest += intPayment;
          remPrincipal -= prPayment;
          m++;
        }

        const closingBalance = Math.max(0, remPrincipal);
        const paidPercent = Math.min(100, Math.round(((p - closingBalance) / p) * 100));

        schedule.push({
          year: yr,
          openingBalance: Math.round(openingBalance),
          yearlyPrincipal: Math.round(yrPrincipal),
          yearlyInterest: Math.round(yrInterest),
          closingBalance: Math.round(closingBalance),
          paidPercent
        });
      }

      // Prepayment Strategy Math: 1 Extra EMI per year
      const extraEmiAnnual = roundedEmi;
      let prepayPrincipal = p;
      let regularMonths = 0;
      let totalPrepayInterest = 0;

      while (prepayPrincipal > 0 && regularMonths < 360) {
        regularMonths++;
        const intPayment = prepayPrincipal * r;
        totalPrepayInterest += intPayment;
        let prPayment = roundedEmi - intPayment;

        // Apply 1 extra EMI at month 12, 24, 36...
        if (regularMonths % 12 === 0) {
          prPayment += extraEmiAnnual;
        }

        prepayPrincipal -= prPayment;
      }

      const tenureSavedMonths = Math.max(0, n - regularMonths);
      const tenureSavedYears = (tenureSavedMonths / 12).toFixed(1);
      const interestSaved = Math.max(0, totalInt - Math.round(totalPrepayInterest));

      return {
        monthlyEmi: roundedEmi,
        totalPayment: totalPay,
        totalInterest: totalInt,
        principalPercent: pPercent,
        interestPercent: iPercent,
        taxBenefits: {
          sec80C: Math.round(sec80C),
          sec24b: Math.round(sec24b),
          totalDeduction: Math.round(totalDeduction),
          annualTaxSaved
        },
        yearlySchedule: schedule,
        prepaymentStats: {
          tenureSavedYears: Number(tenureSavedYears),
          interestSaved
        }
      };
    }, [calcPrincipal, calcRate, calcTenure]);

  const handleApplyClick = (bankName?: string) => {
    if (openApplyModal) {
      openApplyModal(bankName ? `Home Loan - ${bankName}` : `Home Loan (₹${(calcPrincipal / 100000).toFixed(1)}L)`);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCibilClick = () => {
    if (openCibilModal) {
      openCibilModal();
    } else {
      navigate('/credit-score');
    }
  };

  // Structured Data Schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bankscart.com/' },
      { '@type': 'ListItem', position: 2, name: 'Calculators', item: 'https://www.bankscart.com/calculators' },
      { '@type': 'ListItem', position: 3, name: 'Home Loan EMI Calculator', item: 'https://www.bankscart.com/home-loan-emi-calculator' }
    ]
  };

  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Home Loan EMI Calculator India',
    description: 'Calculate monthly home loan EMIs, 30-year amortization schedule, and Section 24(b) + Section 80C tax deductions on BanksCart.',
    url: 'https://www.bankscart.com/home-loan-emi-calculator',
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
        <title>Home Loan EMI Calculator: Plan EMIs, Prepayments & Tax Benefits | BanksCart</title>
        <meta
          name="description"
          content="Calculate home loan monthly EMI, total interest payable, 30-year amortization schedule, and Section 24(b) & 80C tax benefits. Simulate prepayment savings on BanksCart."
        />
        <link rel="canonical" href="https://www.bankscart.com/home-loan-emi-calculator" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Home Loan EMI Calculator: Plan EMIs, Prepayments & Tax Benefits | BanksCart" />
        <meta
          property="og:description"
          content="Calculate home loan monthly EMI, total interest payable, 30-year amortization schedule, and Section 24(b) & 80C tax benefits. Simulate prepayment savings on BanksCart."
        />
        <meta property="og:url" content="https://www.bankscart.com/home-loan-emi-calculator" />
        <meta property="og:site_name" content="BanksCart" />
        <meta property="og:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Home Loan EMI Calculator: Plan EMIs, Prepayments & Tax Benefits | BanksCart" />
        <meta
          name="twitter:description"
          content="Calculate home loan monthly EMI, total interest payable, 30-year amortization schedule, and Section 24(b) & 80C tax benefits. Simulate prepayment savings on BanksCart."
        />
        <meta name="twitter:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(financialProductSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <Breadcrumb path={['Home', 'Calculators', 'Home Loan EMI Calculator']} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14 mt-4">

        {/* ==================== HERO SECTION ==================== */}
        <header className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl text-white p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden border border-blue-900/60">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-blue-200 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              RBI Repo-Linked Benchmark • 2026 Home Loan Calculator
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Home Loan EMI Calculator: Plan EMIs & Tax Benefits
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              Accurately forecast your monthly Equated Monthly Installment (EMI), cumulative interest obligations, principal amortization curves, and annual Section 24(b) & 80C income tax savings based on current Indian banking benchmark rates.
            </p>

            {/* 4 Key Statistics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2 pb-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">Starting Rate</div>
                <div className="text-lg sm:text-2xl font-black text-amber-300 mt-1 tabular-nums">From 8.40%</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Reducing balance p.a.</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">Maximum Tenure</div>
                <div className="text-lg sm:text-2xl font-black text-white mt-1 tabular-nums">Up to 30 Yrs</div>
                <div className="text-[11px] text-slate-300 mt-0.5">360 monthly installments</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">LTV Funding</div>
                <div className="text-lg sm:text-2xl font-black text-white mt-1 tabular-nums">Up to 90%</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Property value ceiling</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">Tax Shelter</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-400 mt-1 tabular-nums">₹3.5 Lakhs</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Sec 24(b) + 80C annual</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={() => handleApplyClick()}
                className="bg-amber-700 hover:bg-amber-800 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-amber-700/30 transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <span>Apply for Home Loan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                to="/home-loan-compare"
                className="bg-white/15 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer backdrop-blur-sm"
              >
                <Building2 className="w-4 h-4 text-amber-300" />
                <span>Compare Bank Rates</span>
              </Link>
              <button
                type="button"
                onClick={handleCibilClick}
                className="text-blue-200 hover:text-white px-4 py-3.5 text-xs sm:text-sm font-semibold underline-offset-4 hover:underline flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Free CIBIL Score Check</span>
              </button>
            </div>

            {/* Trust Badges Strip */}
            <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-4 sm:gap-8 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Standard Reducing Balance Math
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero Foreclosure Penalty on Floating Rates
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Real-Time 30-Year Amortization Schedule
              </span>
            </div>
          </div>
        </header>

        {/* ==================== THE CALCULATOR WIDGET ==================== */}
        <section aria-labelledby="calculator-tool-heading" className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/80 shadow-sm space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-blue-900 font-bold text-xs tracking-wider uppercase">
              <Calculator className="w-4 h-4 text-blue-700" />
              Real-Time Repayment Simulator
            </div>
            <h2 id="calculator-tool-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Interactive Home Loan Repayment & Tax Engine
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Adjust loan amount, interest rate, and tenure to visualize your monthly installment, interest payout, and annual tax write-offs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Controls: Sliders and Presets */}
            <div className="lg:col-span-7 space-y-6">
              {/* Home Loan Amount Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label htmlFor="principal-slider" className="font-semibold text-slate-800">
                    Home Loan Amount Required
                  </label>
                  <div className="bg-blue-50 text-blue-900 px-3.5 py-1 rounded-lg border border-blue-200 font-bold text-base tabular-nums">
                    ₹{displayPrincipal.toLocaleString('en-IN')}
                  </div>
                </div>
                <input
                  id="principal-slider"
                  type="range"
                  min={500000}
                  max={50000000}
                  step={100000}
                  value={displayPrincipal}
                  onChange={(e) => handlePrincipalChange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
                />
                <div className="flex justify-between text-[11px] text-slate-500 tabular-nums">
                  <span>₹5 Lakhs</span>
                  <span>₹2.5 Crores</span>
                  <span>₹5.0 Crores</span>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[2500000, 4000000, 5000000, 7500000, 10000000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => handlePrincipalChange(preset)}
                      className={`text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        displayPrincipal === preset
                          ? 'bg-blue-900 text-white font-bold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      ₹{(preset / 100000).toFixed(0)} Lakh{preset > 100000 ? 's' : ''}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Rate Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label htmlFor="rate-slider" className="font-semibold text-slate-800">
                    Interest Rate (% per annum)
                  </label>
                  <div className="bg-amber-50 text-amber-900 px-3.5 py-1 rounded-lg border border-amber-200 font-bold text-base tabular-nums">
                    {displayRate.toFixed(2)}%
                  </div>
                </div>
                <input
                  id="rate-slider"
                  type="range"
                  min={6.5}
                  max={15.0}
                  step={0.05}
                  value={displayRate}
                  onChange={(e) => handleRateChange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500 tabular-nums">
                  <span>6.5% (Concessional)</span>
                  <span>8.5% (Standard Market)</span>
                  <span>15.0% (Subprime)</span>
                </div>

                {/* Quick Rate Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { label: '8.40% (SBI Prime)', val: 8.4 },
                    { label: '8.75% (HDFC / ICICI)', val: 8.75 },
                    { label: '9.25% (Standard)', val: 9.25 },
                  ].map((chip) => (
                    <button
                      key={chip.val}
                      type="button"
                      onClick={() => handleRateChange(chip.val)}
                      className={`text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        displayRate === chip.val
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
                    Loan Tenure (Years / Months)
                  </label>
                  <div className="bg-emerald-50 text-emerald-900 px-3.5 py-1 rounded-lg border border-emerald-200 font-bold text-base tabular-nums">
                    {Math.round(displayTenure / 12)} Years ({displayTenure} Months)
                  </div>
                </div>
                <input
                  id="tenure-slider"
                  type="range"
                  min={60}
                  max={360}
                  step={12}
                  value={displayTenure}
                  onChange={(e) => handleTenureChange(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[11px] text-slate-500 tabular-nums">
                  <span>5 Years (60 Mos)</span>
                  <span>20 Years (240 Mos)</span>
                  <span>30 Years (360 Mos)</span>
                </div>

                {/* Quick Tenure Chips */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { label: '10 Years', val: 120 },
                    { label: '15 Years', val: 180 },
                    { label: '20 Years', val: 240 },
                    { label: '25 Years', val: 300 },
                    { label: '30 Years', val: 360 },
                  ].map((chip) => (
                    <button
                      key={chip.val}
                      type="button"
                      onClick={() => handleTenureChange(chip.val)}
                      className={`text-xs px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                        displayTenure === chip.val
                          ? 'bg-emerald-700 text-white font-bold'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Summary Card (Deep Slate) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-blue-900/60 space-y-6">
              <div className="text-center pb-4 border-b border-white/10">
                <span className="text-xs uppercase font-semibold text-slate-300 tracking-wider">
                  Calculated Monthly EMI
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-300 mt-2 tabular-nums">
                  ₹{monthlyEmi.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  For <span className="text-white font-bold tabular-nums">{calcTenure}</span> monthly installments ({Math.round(calcTenure / 12)} Yrs)
                </div>
              </div>

              {/* Visual Split Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-slate-300 font-medium tabular-nums">
                  <span>Principal ({principalPercent}%)</span>
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
                  <span>Principal Borrowed</span>
                  <span className="font-bold text-white tabular-nums">₹{calcPrincipal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-slate-200">
                  <span>Total Interest Payable</span>
                  <span className="font-bold text-amber-300 tabular-nums">₹{totalInterest.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-slate-200">
                  <span>Total Repayment (P + I)</span>
                  <span className="font-black text-white text-base tabular-nums">₹{totalPayment.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 text-emerald-400 font-semibold">
                  <span>Annual Tax Shelter (80C + 24b)</span>
                  <span className="font-bold text-emerald-300 tabular-nums">~₹{taxBenefits.annualTaxSaved.toLocaleString('en-IN')} /yr</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleApplyClick()}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply for this Home Loan</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-400 leading-tight">
                Formula: E = [P × r × (1+r)ⁿ] / [(1+r)ⁿ – 1]. Actual EMI may vary based on bank sanction date and insurance add-ons.
              </p>
            </div>
          </div>
        </section>

        {/* ==================== PREPAYMENT ACCELERATOR WIDGET ==================== */}
        <section aria-labelledby="prepayment-heading" className="bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 rounded-3xl p-6 sm:p-8 lg:p-10 border border-emerald-200/80 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-1">
                <Zap className="w-4 h-4 text-emerald-600" />
                Prepayment Strategy Insight
              </div>
              <h3 id="prepayment-heading" className="text-xl sm:text-2xl font-bold text-slate-900">
                The Power of 1 Extra EMI Payment Per Year
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                By simply making 1 additional EMI payment every 12 months (e.g., using an annual bonus), look at the mathematical savings on your current loan:
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-emerald-200 shadow-sm text-center sm:text-right shrink-0">
              <span className="text-xs uppercase font-semibold text-slate-500 block">Interest You Save</span>
              <span className="text-2xl sm:text-3xl font-black text-emerald-700 tabular-nums">
                ₹{prepaymentStats.interestSaved.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-500 block mt-0.5">
                Closes loan <strong className="text-slate-800">{prepaymentStats.tenureSavedYears} years earlier</strong>!
              </span>
            </div>
          </div>
        </section>

        {/* ==================== YEARLY AMORTIZATION SCHEDULE TABLE ==================== */}
        <section aria-labelledby="amortization-heading" className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 text-blue-900 font-bold text-xs tracking-wider uppercase">
                <BarChart3 className="w-4 h-4 text-blue-700" />
                Complete Repayment Curve
              </div>
              <h2 id="amortization-heading" className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                Year-by-Year Amortization Schedule
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Detailed breakdown of opening balance, principal repayment, interest component, and closing balances.
              </p>
            </div>

            {/* Schedule View Toggle */}
            <div className="inline-flex p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setScheduleView('10years')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  scheduleView === '10years' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                First 10 Years
              </button>
              <button
                type="button"
                onClick={() => setScheduleView('full')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  scheduleView === 'full' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Full Tenure ({Math.round(calcTenure / 12)} Yrs)
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <caption className="sr-only">Annual home loan amortization schedule breakdown</caption>
              <thead>
                <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] sm:text-xs tracking-wider">
                  <th scope="col" className="p-4 sm:p-5">Year</th>
                  <th scope="col" className="p-4 sm:p-5">Opening Balance</th>
                  <th scope="col" className="p-4 sm:p-5">Principal Paid</th>
                  <th scope="col" className="p-4 sm:p-5">Interest Paid</th>
                  <th scope="col" className="p-4 sm:p-5">Closing Balance</th>
                  <th scope="col" className="p-4 sm:p-5 text-right">Loan Cleared</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(scheduleView === '10years' ? yearlySchedule.slice(0, 10) : yearlySchedule).map((row) => (
                  <tr key={row.year} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900 tabular-nums">
                      Year {row.year}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600 tabular-nums">
                      ₹{row.openingBalance.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 sm:p-5 font-semibold text-blue-900 tabular-nums">
                      ₹{row.yearlyPrincipal.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 sm:p-5 font-semibold text-amber-700 tabular-nums">
                      ₹{row.yearlyInterest.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 sm:p-5 font-bold text-slate-800 tabular-nums">
                      ₹{row.closingBalance.toLocaleString('en-IN')}
                    </td>
                    <td className="p-4 sm:p-5 text-right font-black text-emerald-700 tabular-nums">
                      {row.paidPercent}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ==================== TOP LENDERS CURRENT RATES TABLE ==================== */}
        <section aria-labelledby="lenders-heading" className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-blue-900 font-bold text-xs tracking-wider uppercase">
              <Building2 className="w-4 h-4 text-blue-700" />
              Verified Lending Rates
            </div>
            <h2 id="lenders-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Compare Home Loan Interest Rates Across Top Indian Banks
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Review current floating interest rate slabs, administrative fees, and maximum tenure limits from scheduled commercial banks.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <caption className="sr-only">Top Indian home loan interest rates comparison</caption>
              <thead>
                <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] sm:text-xs tracking-wider">
                  <th scope="col" className="p-4 sm:p-5">Bank / Lender</th>
                  <th scope="col" className="p-4 sm:p-5">Interest Rate (p.a.)</th>
                  <th scope="col" className="p-4 sm:p-5">Processing Fee</th>
                  <th scope="col" className="p-4 sm:p-5">Max Tenure</th>
                  <th scope="col" className="p-4 sm:p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TOP_HOME_LOAN_BANKS.map((b, idx) => (
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
                      {b.maxTenure}
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
              Frequently Asked Questions About Home Loan EMIs
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Clear answers regarding reducing calculations, repo adjustments, prepayment rules, and Section 24(b) deductions.
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
            Explore Related Mortgage & Lending Tools on BanksCart
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/home-loan-compare"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="font-bold text-sm text-slate-900 group-hover:text-blue-900 flex items-center justify-between">
                <span>Compare Home Loans</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Side-by-side comparison across SBI, HDFC, ICICI, and Axis Bank.</p>
            </Link>

            <Link
              to="/plot-construction-loan"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="font-bold text-sm text-slate-900 group-hover:text-blue-900 flex items-center justify-between">
                <span>Plot cum Construction Loan</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Finance plot purchase and custom house building with 5-stage milestone drawdowns.</p>
            </Link>

            <Link
              to="/loans/home-loan"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="font-bold text-sm text-slate-900 group-hover:text-blue-900 flex items-center justify-between">
                <span>Home Loan Central Hub</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Explore eligibility criteria, LTV rules, and balance transfer procedures.</p>
            </Link>

            <Link
              to="/credit-score"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="font-bold text-sm text-slate-900 group-hover:text-blue-900 flex items-center justify-between">
                <span>Free CIBIL Credit Check</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Check your credit score for premier 8.40% interest rate eligibility.</p>
            </Link>
          </div>
        </section>

        {/* ==================== FOOTER DISCLAIMER ==================== */}
        <footer className="border-t border-slate-200 pt-8 pb-4 space-y-4 text-xs text-slate-500 leading-relaxed">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-slate-600 pb-3 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-900" />
              <span>Editorial & Mathematical Review by <strong>BanksCart Research & Analytics Team</strong></span>
            </div>
            <div>Last Updated & Rate Audit: October 2026</div>
          </div>

          <p>
            <strong>Calculation & Financial Marketplace Disclaimer:</strong> This Home Loan EMI Calculator uses standard reducing balance compounding formulas. Actual monthly installments, approved interest rates, processing fees, and tax deductions depend on individual credit underwriting, property valuation, employer categorization, and prevailing RBI repo rates. BanksCart (operated by BanksCart Financial Technologies Pvt. Ltd., CIN: U67190DL2024PTC428910) is an independent financial technology comparison marketplace, not an RBI-licensed commercial bank or Housing Finance Company (HFC).
          </p>
        </footer>

      </div>
    </main>
  );
};

export default HomeLoanEMI;
