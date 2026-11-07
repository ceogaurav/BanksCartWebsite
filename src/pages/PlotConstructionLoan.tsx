import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Building,
  Home,
  Calculator,
  TrendingUp,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Clock,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  FileText,
  BadgePercent,
  Check,
  Scale,
  Info,
  HelpCircle,
  Award,
  Layers,
  ChevronDown,
  Hammer,
  Banknote,
  Calendar
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import ApplyButton from '../components/common/ApplyButton';

interface PlotConstructionLoanProps {
  openApplyModal?: (loanType?: string) => void;
  openEligibilityModal?: () => void;
  openCibilModal?: () => void;
}

interface BankRateItem {
  bank: string;
  scheme: string;
  rate: string;
  processingFee: string;
  maxAmount: string;
  maxTenure: string;
  constructionWindow: string;
  features: string[];
}

const TOP_PLOT_BANKS: BankRateItem[] = [
  {
    bank: 'State Bank of India (SBI)',
    scheme: 'SBI Realty + Home Construction',
    rate: '8.40% - 9.15% p.a.',
    processingFee: '0.35% (Min ₹2,000) + GST',
    maxAmount: 'Up to ₹10 Crores',
    maxTenure: 'Up to 30 Years',
    constructionWindow: 'Within 5 Years from plot purchase',
    features: ['Direct linkage to SBI EBLR', 'Zero prepayment penalty', 'Special concessions for women borrowers']
  },
  {
    bank: 'HDFC Bank',
    scheme: 'Plot cum Construction Home Loan',
    rate: '8.75% - 9.40% p.a.',
    processingFee: '0.50% (Min ₹3,000) + GST',
    maxAmount: 'Up to ₹10 Crores',
    maxTenure: 'Up to 30 Years',
    constructionWindow: 'Within 3 Years from first disbursal',
    features: ['Digitized staged disbursements', 'Doorstep document pickup', 'Flexible pre-EMI options']
  },
  {
    bank: 'ICICI Bank',
    scheme: 'Land + Residential Construction Loan',
    rate: '8.75% - 9.50% p.a.',
    processingFee: '0.50% + GST',
    maxAmount: 'Up to ₹10 Crores',
    maxTenure: 'Up to 30 Years',
    constructionWindow: 'Within 3 Years',
    features: ['Fast-track technical valuation', 'Online construction progress tracking', 'Instant in-principle sanction']
  },
  {
    bank: 'Bank of Baroda',
    scheme: 'Baroda Home Loan for Land & Construction',
    rate: '8.45% - 9.30% p.a.',
    processingFee: '0.25% (Min ₹1,500) + GST',
    maxAmount: 'Up to ₹7.5 Crores',
    maxTenure: 'Up to 30 Years',
    constructionWindow: 'Within 3 Years',
    features: ['Linked to BRLLR benchmark', 'Concessions for existing salary account holders', 'Free personal accident cover']
  },
  {
    bank: 'Axis Bank',
    scheme: 'Plot Purchase cum Construction Loan',
    rate: '8.85% - 9.60% p.a.',
    processingFee: '0.50% (Min ₹2,500) + GST',
    maxAmount: 'Up to ₹5 Crores',
    maxTenure: 'Up to 25 Years',
    constructionWindow: 'Within 3 Years',
    features: ['12-EMI waiver on regular repayment', 'Structured milestone disbursements', 'Minimal administrative fees']
  },
  {
    bank: 'Kotak Mahindra Bank',
    scheme: 'Composite Plot & Construction Loan',
    rate: '8.70% - 9.40% p.a.',
    processingFee: '0.50% + GST',
    maxAmount: 'Up to ₹10 Crores',
    maxTenure: 'Up to 25 Years',
    constructionWindow: 'Within 4 Years',
    features: ['Dedicated relationship manager', 'Quick legal scrutiny', 'Paperless KYC pipeline']
  },
  {
    bank: 'Punjab National Bank (PNB Housing)',
    scheme: 'PNB Residential Plot cum Construction',
    rate: '8.65% - 9.45% p.a.',
    processingFee: '0.50% + GST',
    maxAmount: 'Up to ₹5 Crores',
    maxTenure: 'Up to 30 Years',
    constructionWindow: 'Within 3 Years',
    features: ['Competitive floating rates', 'Wide non-metro branch reach', 'Customized contractor drawdown schedules']
  }
];

const DISBURSEMENT_STAGES = [
  {
    stage: 'Stage 1: Plot Purchase Disbursal',
    percentage: 'Up to 70% - 80%',
    metric: 'Of Land Cost',
    timeline: 'Day 1 (Closing)',
    description: 'Initial tranche released directly to the land seller upon registered sale deed and clear title certification.',
    requirements: ['Original Registered Sale Deed', '30-year Encumbrance Certificate (EC)', 'Khata/Patta Transfer', 'RERA / Municipal Layout Approval']
  },
  {
    stage: 'Stage 2: Foundation & Plinth Level',
    percentage: '15% - 20%',
    metric: 'Of Construction Estimate',
    timeline: 'Month 2 - 4',
    description: 'Released after excavation, RCC footing, and casting of ground level plinth beams.',
    requirements: ['Sanctioned Architectural Building Plan', 'Commencement Certificate from Local Authority', 'Chartered Engineer Foundation Inspection Report']
  },
  {
    stage: 'Stage 3: Ground & Roof Slabs (Structure)',
    percentage: '30% - 35%',
    metric: 'Of Construction Estimate',
    timeline: 'Month 5 - 10',
    description: 'Tranches disbursed as ground, first, and final roof RCC slabs are poured and external brickwork is completed.',
    requirements: ['Structural Engineer Stage Completion Certificate', 'Photographic Evidence of Cast Slabs', 'Physical Inspection by Bank Technical Officer']
  },
  {
    stage: 'Stage 4: Plastering, Electrical & Plumbing',
    percentage: '20% - 25%',
    metric: 'Of Construction Estimate',
    timeline: 'Month 11 - 15',
    description: 'Disbursed for internal/external plastering, electrical conduit wiring, water piping, and floor screeding.',
    requirements: ['Contractor Expense Summary', 'Material Procurement Receipts', 'Architect Intermediate Assessment']
  },
  {
    stage: 'Stage 5: Final Finishing & Handover',
    percentage: '10% - 15%',
    metric: 'Of Construction Estimate',
    timeline: 'Month 16 - 24',
    description: 'Final retention amount released upon tiling, door/window fitting, painting, and utility connections.',
    requirements: ['Occupancy Certificate (OC) / Completion Certificate', 'Electricity Meter Installation Receipt', 'Final Property Valuation Report']
  }
];

const FAQS = [
  {
    q: 'What is a Plot cum Construction Loan and how does it differ from a pure plot loan?',
    a: 'A pure plot loan only funds the purchase of vacant land and typically carries higher interest rates with shorter tenures (up to 15 years) and zero tax deductions. A Plot cum Construction Loan (Composite Home Loan) is a unified financing facility that funds both the land purchase and the construction of a residential home under residential home loan interest rates (starting from ~8.40% p.a.), offering tenures up to 30 years and full Section 80C and Section 24(b) income tax benefits.'
  },
  {
    q: 'What is the mandatory timeline to start and finish home construction?',
    a: 'Most banks (like SBI, HDFC, and ICICI) mandate that home construction must commence within 1 to 2 years and be fully completed within 3 to 5 years from the date of initial plot loan disbursal. If construction is not completed within this approved window, lenders typically convert the loan into a commercial or plot loan category, triggering higher interest rates and penal markups.'
  },
  {
    q: 'How does interest calculation work during the construction phase (Pre-EMI vs Full EMI)?',
    a: 'During the active construction period (which typically lasts 12 to 24 months), borrowers are usually required to pay only "Pre-EMI interest"—which is simple interest calculated strictly on the actual cumulative funds disbursed so far, not the full sanctioned limit. Full EMI (comprising both principal repayment and interest) begins only after the final construction tranche is disbursed or the construction timeline expires.'
  },
  {
    q: 'Can I purchase any vacant land with a Plot cum Construction Loan?',
    a: 'No. Lenders only finance non-agricultural (NA) residential plots located within municipal corporation limits, urban development authorities (e.g., BDA, DDA, MMRDA, HUDA), or state-sanctioned RERA-registered layouts. Agricultural land, panchayat land without statutory conversion, or plots under legal litigation cannot be financed.'
  },
  {
    q: 'What is the maximum Loan-to-Value (LTV) ratio for plot and construction loans?',
    a: 'Under Reserve Bank of India (RBI) prudential guidelines, the maximum LTV ratio depends on the overall project cost: up to 90% for total costs up to ₹30 Lakhs; up to 80% for costs between ₹30 Lakhs and ₹75 Lakhs; and up to 75% for costs exceeding ₹75 Lakhs. Typically, plot funding is capped at 70%-75% of land registry value, while construction is funded up to 85%-100% of approved contractor estimates within overall ceilings.'
  },
  {
    q: 'Are income tax deductions available on Plot cum Construction loans?',
    a: 'Yes. Once home construction is completed and an Occupancy/Completion certificate is issued, you can claim tax deductions up to ₹2 Lakhs per financial year under Section 24(b) for interest paid, and up to ₹1.5 Lakhs under Section 80C for principal repayment. Interest paid during the construction period can be aggregated and claimed in 5 equal annual installments starting from the year construction finishes.'
  },
  {
    q: 'Are there any prepayment or foreclosure penalties?',
    a: 'No. In accordance with RBI master directives, scheduled commercial banks and housing finance companies cannot levy any prepayment or foreclosure charges on floating-rate housing loans sanctioned to individual borrowers.'
  },
  {
    q: 'What documents are required to secure staged construction disbursements?',
    a: 'For each construction stage, you must submit: an architect or chartered engineer progress certificate certifying the percentage of physical work completed, on-site photographs of the structure, contractor bills or material vouchers, and a signed drawdown request letter.'
  }
];

export const PlotConstructionLoan: React.FC<PlotConstructionLoanProps> = ({
  openApplyModal,
  openEligibilityModal,
  openCibilModal
}) => {
  // Calculator States
  const [plotCost, setPlotCost] = useState<number>(3000000); // ₹30 Lakhs
  const [constructionCost, setConstructionCost] = useState<number>(4000000); // ₹40 Lakhs
  const [interestRate, setInterestRate] = useState<number>(8.5); // 8.5% p.a.
  const [tenureYears, setTenureYears] = useState<number>(20); // 20 years

  // Interactive Tab State: 'overview' | 'lenders' | 'drawdown' | 'eligibility' | 'documents'
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Financial Calculations
  const { totalProjectCost, estimatedLoanAmount, monthlyEmi, totalInterest, totalPayment, preEmiAverage, taxSavings } =
    useMemo(() => {
      const totalProject = plotCost + constructionCost;
      // Typical blended sanction: 75% of plot + 80% of construction
      const estimatedLoan = Math.round(plotCost * 0.75 + constructionCost * 0.8);
      const annualRate = interestRate;
      const tenureMonths = tenureYears * 12;

      if (estimatedLoan <= 0 || annualRate <= 0 || tenureMonths <= 0) {
        return {
          totalProjectCost: totalProject,
          estimatedLoanAmount: 0,
          monthlyEmi: 0,
          totalInterest: 0,
          totalPayment: 0,
          preEmiAverage: 0,
          taxSavings: 0
        };
      }

      const monthlyRate = annualRate / (12 * 100);
      const emi =
        (estimatedLoan * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);
      const totalPay = emi * tenureMonths;
      const totalInt = Math.max(0, totalPay - estimatedLoan);

      // Average Pre-EMI during ~18 months staged construction assuming ~50% average drawdown
      const preEmi = Math.round((estimatedLoan * 0.5 * (annualRate / 100)) / 12);

      // Annual 24(b) + 80C tax shelter estimate
      const annualInterestYear1 = estimatedLoan * (annualRate / 100);
      const sec24b = Math.min(200000, annualInterestYear1);
      const sec80c = Math.min(150000, estimatedLoan * 0.05);
      const taxShelter = Math.round((sec24b + sec80c) * 0.312); // 30% tax bracket + 4% cess

      return {
        totalProjectCost: totalProject,
        estimatedLoanAmount: estimatedLoan,
        monthlyEmi: Math.round(emi),
        totalInterest: Math.round(totalInt),
        totalPayment: Math.round(totalPay),
        preEmiAverage: preEmi,
        taxSavings: taxShelter
      };
    }, [plotCost, constructionCost, interestRate, tenureYears]);

  const handleApplyClick = (bankName?: string) => {
    if (openApplyModal) {
      openApplyModal(bankName ? `Plot & Construction Loan - ${bankName}` : 'Plot cum Construction Loan');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToCalculator = () => {
    const el = document.getElementById('composite-calculator');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Structured Data Schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bankscart.com/' },
      { '@type': 'ListItem', position: 2, name: 'Loans', item: 'https://www.bankscart.com/loans' },
      { '@type': 'ListItem', position: 3, name: 'Plot cum Construction Loan', item: 'https://www.bankscart.com/plot-construction-loan' }
    ]
  };

  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Plot cum Construction Loans in India',
    description: 'Compare composite plot purchase and residential home construction loans starting from 8.40% p.a. Across top banks in India on BanksCart.',
    url: 'https://www.bankscart.com/plot-construction-loan',
    provider: {
      '@type': 'Organization',
      name: 'BanksCart',
      url: 'https://www.bankscart.com'
    },
    feesAndCommissionsSpecification: 'Processing fees starting from 0.25% to 0.50% + GST. Zero foreclosure fees on floating rate term loans per RBI guidelines.'
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
        <title>Plot cum Construction Loan in India: Compare Rates & Disbursal Stages | BanksCart</title>
        <meta
          name="description"
          content="Compare plot purchase cum home construction loans starting from 8.40% p.a. From SBI, HDFC, ICICI & BoB. Fund up to 80% of land & construction costs with staged drawdowns."
        />
        <link rel="canonical" href="https://www.bankscart.com/plot-construction-loan" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Plot cum Construction Loan in India: Compare Rates & Disbursal Stages | BanksCart" />
        <meta
          property="og:description"
          content="Finance your plot purchase and home construction under a single loan. Compare verified rates, stage-wise drawdowns, and tax deductions with BanksCart."
        />
        <meta property="og:url" content="https://www.bankscart.com/plot-construction-loan" />
        <meta property="og:site_name" content="BanksCart" />
        <meta property="og:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Plot cum Construction Loan in India: Compare Rates & Disbursal Stages | BanksCart" />
        <meta
          name="twitter:description"
          content="Finance your plot purchase and home construction under a single loan. Compare verified rates, stage-wise drawdowns, and tax deductions with BanksCart."
        />
        <meta name="twitter:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(financialProductSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <Breadcrumb path={['Home', 'Loans', 'Plot cum Construction Loan']} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-14 mt-4">
        
        {/* ==================== HERO SECTION ==================== */}
        <header className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl text-white p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden border border-blue-900/60">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-blue-200 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Composite Home Loan • RBI & RERA Regulated 2026
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Plot cum Construction Loans: Finance Land & Build Your Dream Home
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              A composite plot purchase and home construction loan empowers you to acquire non-agricultural residential land and fund the architectural construction of your bespoke home under a unified sanction. Benefit from prime residential home loan rates starting from 8.40% p.a., flexible milestone disbursements, pre-EMI interest during building work, and combined tax deductions under Section 24(b) and 80C.
            </p>

            {/* 4 Key Statistics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2 pb-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">Interest Rates</div>
                <div className="text-lg sm:text-2xl font-black text-amber-300 mt-1 tabular-nums">From 8.40%</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Linked to RBI Repo</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">Maximum Amount</div>
                <div className="text-lg sm:text-2xl font-black text-white mt-1 tabular-nums">Up to ₹10 Cr</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Plot + Construction</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">Repayment Tenure</div>
                <div className="text-lg sm:text-2xl font-black text-white mt-1 tabular-nums">Up to 30 Yrs</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Flexible monthly EMIs</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center">
                <div className="text-xs text-blue-200 font-medium uppercase tracking-wider">LTV Funding</div>
                <div className="text-lg sm:text-2xl font-black text-emerald-400 mt-1 tabular-nums">Up to 80%</div>
                <div className="text-[11px] text-slate-300 mt-0.5">Total project cost</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                onClick={() => handleApplyClick()}
                className="bg-amber-700 hover:bg-amber-800 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-amber-700/30 transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <span>Apply for Plot + Construction Loan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={scrollToCalculator}
                className="bg-white/15 hover:bg-white/20 text-white font-semibold px-6 py-3.5 rounded-xl border border-white/20 transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer backdrop-blur-sm"
              >
                <Calculator className="w-4 h-4 text-amber-300" />
                <span>Calculate Stage-wise EMI</span>
              </button>
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
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> RERA / Municipal Sanctioned Layouts
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Pre-EMI Simple Interest During Build
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Section 24(b) & 80C Tax Shelter
              </span>
            </div>
          </div>
        </header>

        {/* ==================== INTERACTIVE CALCULATOR SECTION ==================== */}
        <section
          id="composite-calculator"
          aria-labelledby="calculator-heading"
          className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl border border-blue-900/60 space-y-8"
        >
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-amber-300 font-bold text-xs tracking-wider uppercase">
              <Calculator className="w-4 h-4 text-amber-400" />
              Composite Project Planner
            </div>
            <h2 id="calculator-heading" className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Plot Purchase & Construction EMI Calculator
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Estimate your total project sanction, pre-EMI during construction, full post-construction monthly installments, and cumulative income tax deductions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Controls: Sliders */}
            <div className="lg:col-span-7 space-y-6">
              {/* Plot Cost Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label htmlFor="plot-slider" className="font-semibold text-slate-200">
                    Plot / Land Acquisition Cost
                  </label>
                  <div className="bg-white/10 px-3 py-1 rounded-lg border border-white/20 font-bold text-white text-base tabular-nums">
                    ₹{(plotCost / 100000).toFixed(1)} Lakhs
                  </div>
                </div>
                <input
                  id="plot-slider"
                  type="range"
                  min={1000000}
                  max={20000000}
                  step={200000}
                  value={plotCost}
                  onChange={(e) => setPlotCost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 tabular-nums">
                  <span>₹10 Lakhs</span>
                  <span>₹1.0 Crore</span>
                  <span>₹2.0 Crores</span>
                </div>
              </div>

              {/* Construction Cost Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label htmlFor="construction-slider" className="font-semibold text-slate-200">
                    Architectural Construction Estimate
                  </label>
                  <div className="bg-white/10 px-3 py-1 rounded-lg border border-white/20 font-bold text-amber-300 text-base tabular-nums">
                    ₹{(constructionCost / 100000).toFixed(1)} Lakhs
                  </div>
                </div>
                <input
                  id="construction-slider"
                  type="range"
                  min={1000000}
                  max={30000000}
                  step={200000}
                  value={constructionCost}
                  onChange={(e) => setConstructionCost(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 tabular-nums">
                  <span>₹10 Lakhs</span>
                  <span>₹1.5 Crores</span>
                  <span>₹3.0 Crores</span>
                </div>
              </div>

              {/* Interest Rate Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label htmlFor="rate-slider" className="font-semibold text-slate-200">
                    Interest Rate (% p.a.)
                  </label>
                  <div className="bg-white/10 px-3 py-1 rounded-lg border border-white/20 font-bold text-blue-200 text-base tabular-nums">
                    {interestRate.toFixed(2)}%
                  </div>
                </div>
                <input
                  id="rate-slider"
                  type="range"
                  min={8.0}
                  max={13.0}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 tabular-nums">
                  <span>8.0% (Prime PSU)</span>
                  <span>9.5%</span>
                  <span>13.0% (NBFC)</span>
                </div>
              </div>

              {/* Tenure Control */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <label htmlFor="tenure-slider" className="font-semibold text-slate-200">
                    Repayment Tenure (Years)
                  </label>
                  <div className="bg-white/10 px-3 py-1 rounded-lg border border-white/20 font-bold text-emerald-300 text-base tabular-nums">
                    {tenureYears} Years ({tenureYears * 12} Months)
                  </div>
                </div>
                <input
                  id="tenure-slider"
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[11px] text-slate-400 tabular-nums">
                  <span>5 Years</span>
                  <span>15 Years</span>
                  <span>30 Years (Max)</span>
                </div>
              </div>
            </div>

            {/* Right Summary Card */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/15 space-y-6">
              <div className="text-center pb-4 border-b border-white/10">
                <span className="text-xs uppercase font-semibold text-slate-300 tracking-wider">
                  Post-Construction Monthly EMI
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-300 mt-2 tabular-nums">
                  ₹{monthlyEmi.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Full EMI starts after final construction tranche
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-slate-200">
                  <span>Total Project Budget</span>
                  <span className="font-bold text-white tabular-nums">₹{totalProjectCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-slate-200">
                  <span>Estimated Loan Sanction (~75-80%)</span>
                  <span className="font-bold text-emerald-400 tabular-nums">₹{estimatedLoanAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-slate-200">
                  <span>Average Pre-EMI (During Build)</span>
                  <span className="font-bold text-amber-300 tabular-nums">~₹{preEmiAverage.toLocaleString('en-IN')} /mo</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-white/10 text-slate-200">
                  <span>Total Interest Payable</span>
                  <span className="font-bold text-slate-200 tabular-nums">₹{totalInterest.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 text-emerald-400 font-semibold">
                  <span>Estimated Annual Tax Savings</span>
                  <span className="font-black text-emerald-300 tabular-nums">~₹{taxSavings.toLocaleString('en-IN')} /yr</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleApplyClick()}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Apply for this Loan Structure</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-slate-400 leading-tight">
                * Pre-EMI is simple interest charged strictly on disbursed amounts during construction. Full EMI commences once building completion is verified.
              </p>
            </div>
          </div>
        </section>

        {/* ==================== 5-STAGE DISBURSEMENT ROADMAP ==================== */}
        <section aria-labelledby="milestone-heading" className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-blue-900 font-bold text-xs tracking-wider uppercase">
              <Hammer className="w-4 h-4 text-blue-700" />
              Progressive Construction Financing
            </div>
            <h2 id="milestone-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              5-Stage Milestone Disbursement Schedule
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Unlike outright home purchase loans where 100% of funds are released at registration, plot cum construction loans release funds stage-by-stage as physical construction progresses. Review the standard architect verification milestones below.
            </p>
          </div>

          <div className="space-y-4">
            {DISBURSEMENT_STAGES.map((stage, idx) => (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl p-5 sm:p-6 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3 mb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">{stage.stage}</h3>
                    <p className="text-xs text-slate-500 font-medium">Standard Timeline: {stage.timeline}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-xl sm:text-2xl font-black text-blue-900 tabular-nums">{stage.percentage}</span>
                    <span className="text-xs text-slate-500 block">{stage.metric}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-700 mb-3 leading-relaxed">
                  {stage.description}
                </p>

                <div>
                  <span className="text-xs font-bold text-slate-900 block mb-1.5">Mandatory Verification Documents:</span>
                  <div className="flex flex-wrap gap-2">
                    {stage.requirements.map((req, rIdx) => (
                      <span
                        key={rIdx}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold bg-white text-slate-700 px-3 py-1 rounded-lg border border-slate-200 shadow-2xs"
                      >
                        <Check className="w-3 h-3 text-emerald-600" />
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ==================== TOP LENDERS COMPARISON ==================== */}
        <section aria-labelledby="lenders-heading" className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-blue-900 font-bold text-xs tracking-wider uppercase">
              <Building className="w-4 h-4 text-blue-700" />
              Lender Comparison Matrix
            </div>
            <h2 id="lenders-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Compare Plot cum Construction Loan Interest Rates (2026)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Leading public sector banks, private lenders, and housing finance companies offer customized terms. Compare verified starting interest rates, processing fees, and mandatory construction completion windows.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <caption className="sr-only">Plot cum Construction loan rates and terms comparison across Indian lenders</caption>
              <thead>
                <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px] sm:text-xs tracking-wider">
                  <th scope="col" className="p-4 sm:p-5">Bank / Lender</th>
                  <th scope="col" className="p-4 sm:p-5">Interest Rate (p.a.)</th>
                  <th scope="col" className="p-4 sm:p-5">Processing Fee</th>
                  <th scope="col" className="p-4 sm:p-5">Max Amount</th>
                  <th scope="col" className="p-4 sm:p-5">Construction Window</th>
                  <th scope="col" className="p-4 sm:p-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {TOP_PLOT_BANKS.map((b, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900">
                      <div>{b.bank}</div>
                      <div className="text-[11px] font-normal text-slate-500 mt-0.5">{b.scheme}</div>
                    </td>
                    <td className="p-4 sm:p-5 font-bold text-blue-900 whitespace-nowrap tabular-nums">
                      {b.rate}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600">
                      {b.processingFee}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-800 font-semibold whitespace-nowrap tabular-nums">
                      {b.maxAmount}
                    </td>
                    <td className="p-4 sm:p-5 text-slate-600">
                      {b.constructionWindow}
                    </td>
                    <td className="p-4 sm:p-5 text-right">
                      <button
                        type="button"
                        onClick={() => handleApplyClick(b.bank)}
                        className="bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors shadow-sm cursor-pointer"
                      >
                        Apply Now
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 leading-relaxed flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Construction Timeline Caution:</strong> Most lenders mandate that construction must be completed within 3 to 5 years from initial plot purchase disbursal. Failing to submit an Occupancy Certificate within the approved window can lead to retrospective interest markup to commercial lending rates.
            </div>
          </div>
        </section>

        {/* ==================== ELIGIBILITY & DOCUMENTATION ==================== */}
        <section aria-labelledby="eligibility-heading" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Eligibility Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <CheckCircle2 className="w-5 h-5 text-blue-900" />
              <h3 id="eligibility-heading" className="text-xl font-bold text-slate-900">
                Borrower & Property Eligibility
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Applicant Age:</strong> 21 to 65 years at the time of scheduled loan maturity.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Income Criteria:</strong> Net monthly salary of ₹30,000+ for salaried; 2+ years profitable ITR for self-employed.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Credit Score:</strong> CIBIL score of 720+ preferred for lowest EBLR markups.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Property Nature:</strong> Non-Agricultural (NA) residential plot in approved municipal/RERA layout.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Plan Sanction:</strong> Building blueprint approved by town planning authority with architect cost estimate.</span>
              </li>
            </ul>
          </div>

          {/* Documentation Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileText className="w-5 h-5 text-blue-900" />
              <h3 className="text-xl font-bold text-slate-900">
                Mandatory Documentation Checklist
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>KYC & Income:</strong> PAN, Aadhaar, past 3 months salary slips, 6 months bank statements, Form 16 / ITR.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Land Title Proofs:</strong> Registered Sale Deed, Mother Deed, Khata Certificate, 30-year Encumbrance Certificate (EC).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Approved Building Plan:</strong> Sanctioned architectural blueprint & Commencement Certificate (CC).</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Technical Cost Estimate:</strong> Detailed construction Bill of Quantities (BOQ) certified by a chartered architect/engineer.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>Contractor Agreement:</strong> Civil construction contract outlining completion milestones and payment schedule.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* ==================== FREQUENTLY ASKED QUESTIONS ==================== */}
        <section aria-labelledby="faqs-heading" className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-blue-900 font-bold text-xs tracking-wider uppercase">
              <HelpCircle className="w-4 h-4 text-blue-700" />
              Consumer Guidance
            </div>
            <h2 id="faqs-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions About Plot & Construction Loans
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Key answers regarding pre-EMI interest math, construction deadlines, tax write-offs, and staged drawdowns.
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
            Explore Related Housing & Mortgage Solutions on BanksCart
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/home-loan-emi-calculator"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="font-bold text-sm text-slate-900 group-hover:text-blue-900 flex items-center justify-between">
                <span>Home Loan EMI Calculator</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Full 30-year amortization schedule with tax savings breakdown.</p>
            </Link>

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
              to="/loans/home-loan"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="font-bold text-sm text-slate-900 group-hover:text-blue-900 flex items-center justify-between">
                <span>Home Loans Central Hub</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Complete eligibility guidelines, LTV ceilings, and online pre-approvals.</p>
            </Link>

            <Link
              to="/credit-score"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="font-bold text-sm text-slate-900 group-hover:text-blue-900 flex items-center justify-between">
                <span>Free CIBIL Credit Check</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Check your CIBIL score for prime 8.40% interest rate eligibility.</p>
            </Link>
          </div>
        </section>

        {/* ==================== FOOTER DISCLAIMER ==================== */}
        <footer className="border-t border-slate-200 pt-8 pb-4 space-y-4 text-xs text-slate-500 leading-relaxed">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-slate-600 pb-3 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-900" />
              <span>Editorial & Technical Review by <strong>BanksCart Real Estate & Credit Advisory Group</strong></span>
            </div>
            <div>Last Updated & Rate Audit: October 2026</div>
          </div>

          <p>
            <strong>Marketplace & Lending Disclaimer:</strong> BanksCart (operated by BanksCart Financial Technologies Pvt. Ltd., CIN: U67190DL2024PTC428910) is an independent financial technology distributor and lending comparison marketplace, not an RBI-licensed banking institution or Housing Finance Company (HFC). Credit sanction, stage-wise inspection approval, maximum LTV, and disbursement timelines are at the sole discretion of our regulated partner lenders (such as SBI, HDFC Bank, ICICI Bank, Bank of Baroda, and Axis Bank) subject to borrower creditworthiness, property legal scrutiny, and municipal plan sanctions.
          </p>
        </footer>

      </div>
    </main>
  );
};

export default PlotConstructionLoan;
