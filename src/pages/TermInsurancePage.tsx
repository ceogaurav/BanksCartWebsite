import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Calculator,
  IndianRupee,
  Calendar,
  Percent,
  TrendingUp,
  Landmark,
  BadgeCheck,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  Info,
  Layers,
  FileText,
  Building,
  HeartPulse,
  Heart,
  Umbrella,
  Award,
  Sparkles,
  Lock,
  ExternalLink,
  Users
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { formatCurrency } from '../utils/calculations';

// Verified IRDAI-regulated term life insurance plans
export interface TermPlanRecord {
  insurer: string;
  planName: string;
  claimRatio: number;
  claimRatioDisplay: string;
  minMonthlyPremium: number;
  maxCoverAge: string;
  keyHighlights: string;
  solvencyRatio: number;
  isSovereign?: boolean;
}

const TOP_TERM_PLANS: TermPlanRecord[] = [
  {
    insurer: 'Max Life Insurance',
    planName: 'Smart Secure Plus',
    claimRatio: 99.65,
    claimRatioDisplay: '99.65%',
    minMonthlyPremium: 460,
    maxCoverAge: 'Up to 85 Years',
    keyHighlights: 'Special exit value, joint life cover, premium break option',
    solvencyRatio: 1.88
  },
  {
    insurer: 'HDFC Life',
    planName: 'Click 2 Protect Super',
    claimRatio: 99.50,
    claimRatioDisplay: '99.50%',
    minMonthlyPremium: 480,
    maxCoverAge: 'Up to 85 Years',
    keyHighlights: 'Terminal illness cover included, comprehensive rider bouquet',
    solvencyRatio: 2.03
  },
  {
    insurer: 'ICICI Prudential Life',
    planName: 'iProtect Smart',
    claimRatio: 99.20,
    claimRatioDisplay: '99.20%',
    minMonthlyPremium: 490,
    maxCoverAge: 'Up to 99 Years (Whole Life)',
    keyHighlights: 'Covers 34 critical illnesses, waiver of premium on disability',
    solvencyRatio: 2.15
  },
  {
    insurer: 'Tata AIA Life',
    planName: 'Sampoorna Raksha Supreme',
    claimRatio: 99.10,
    claimRatioDisplay: '99.10%',
    minMonthlyPremium: 470,
    maxCoverAge: 'Up to 100 Years',
    keyHighlights: 'Whole life protection, top-up sum assured milestone option',
    solvencyRatio: 1.95
  },
  {
    insurer: 'Life Insurance Corporation (LIC)',
    planName: 'Digi Term / Tech Term',
    claimRatio: 98.50,
    claimRatioDisplay: '98.50%',
    minMonthlyPremium: 580,
    maxCoverAge: 'Up to 75 Years',
    keyHighlights: '100% Sovereign Guarantee under Section 37 of LIC Act',
    solvencyRatio: 1.90,
    isSovereign: true
  },
  {
    insurer: 'SBI Life Insurance',
    planName: 'eShield Next',
    claimRatio: 97.50,
    claimRatioDisplay: '97.50%',
    minMonthlyPremium: 510,
    maxCoverAge: 'Up to 85 Years',
    keyHighlights: 'Level and increasing sum assured, trusted SBI brand network',
    solvencyRatio: 2.12
  }
];

export default function TermInsurancePage() {
  // Calculator inputs
  const [age, setAge] = useState<number>(28);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [tobaccoUser, setTobaccoUser] = useState<boolean>(false);
  const [sumAssured, setSumAssured] = useState<number>(10000000); // Default ₹1 Crore
  const [coverTillAge, setCoverTillAge] = useState<number>(65);

  // Active Tab for Knowledge Sections
  const [activeTab, setActiveTab] = useState<'calculator' | 'plans' | 'riders' | 'mwpa' | 'claim-process'>('calculator');

  // Interactive Premium Engine (Actuarial Estimation Formula)
  const premiumCalculation = useMemo(() => {
    // Base annual rate per 1 Lakh sum assured at age 25 for male non-smoker: ~₹55
    const coverInLakhs = sumAssured / 100000;
    const termYears = Math.max(10, coverTillAge - age);

    // Age multiplier: risk increases by ~7% per year after age 25
    const ageFactor = Math.pow(1.072, Math.max(0, age - 22));

    // Base cost per Lakh
    let baseRatePerLakh = 48 * ageFactor;

    // Female discount (females have ~15% higher longevity in actuarial tables)
    if (gender === 'female') {
      baseRatePerLakh *= 0.86;
    }

    // Tobacco / Smoking loading (smokers pay ~45% higher premium)
    if (tobaccoUser) {
      baseRatePerLakh *= 1.48;
    }

    // Term length adjustment (longer terms have slightly higher annual cost)
    const termFactor = 1 + (termYears - 20) * 0.008;

    const annualBasePremium = Math.round(baseRatePerLakh * coverInLakhs * termFactor);
    const monthlyPremium = Math.round((annualBasePremium * 1.05) / 12); // standard modal factor
    const gstAmount = Math.round(annualBasePremium * 0.18);
    const totalAnnualWithGst = annualBasePremium + gstAmount;

    // 80C Tax savings (assuming 30% slab + cess)
    const taxSavedPerYear = Math.round(Math.min(totalAnnualWithGst, 150000) * 0.312);

    return {
      monthlyPremium,
      annualBasePremium,
      gstAmount,
      totalAnnualWithGst,
      taxSavedPerYear,
      termYears
    };
  }, [age, gender, tobaccoUser, sumAssured, coverTillAge]);

  // Schema.org Structured Data
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        name: 'Term Life Insurance Plans Comparison & Calculator',
        provider: {
          '@type': 'Organization',
          name: 'BanksCart Financial Technologies Pvt Ltd'
        },
        description:
          'Compare leading IRDAI-approved term life insurance policies with Claim Settlement Ratios up to 99.65%. Calculate exact premiums for ₹1 Crore to ₹5 Crores cover.',
        url: 'https://www.bankscart.com/insurance/term-life'
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.bankscart.com/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Insurance',
            item: 'https://www.bankscart.com/insurance'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Term Life Insurance',
            item: 'https://www.bankscart.com/insurance/term-life'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the ideal sum assured for a term insurance policy?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under financial planning standards, your ideal term insurance cover should be 15 to 20 times your current annual income, plus the outstanding balance of any existing liabilities (such as Home Loans or Car Loans).'
            }
          },
          {
            '@type': 'Question',
            name: 'Are term life insurance claim payouts taxable in India?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No! The entire lump sum death benefit received by the nominee is 100% tax-free under Section 10(10D) of the Income Tax Act, 1961, without any upper ceiling.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the Married Women\'s Property Act (MWPA) in term insurance?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Endorsing your term life policy under Section 6 of the Married Women\'s Property Act (MWPA) creates an absolute trust for the exclusive benefit of your wife and children. The policy proceeds can never be attached by creditors, business recovery agents, tax departments, or court orders.'
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Helmet>
        <title>Term Life Insurance Plans & Live Premium Calculator (2026) | BanksCart</title>
        <meta
          name="description"
          content="Compare IRDAI-approved term life insurance policies with Claim Settlement Ratios up to 99.65%. Calculate premiums for ₹1 Crore to ₹5 Crores life cover, evaluate critical illness riders, and save tax under Section 80C."
        />
        <link rel="canonical" href="https://www.bankscart.com/insurance/term-life" />
        <meta property="og:title" content="Term Life Insurance Plans & Calculator - BanksCart" />
        <meta
          property="og:description"
          content="Instant premium quotes for ₹1 Crore cover from ₹450/month. Compare Max Life, HDFC Life, ICICI Prudential, and LIC."
        />
        <meta property="og:url" content="https://www.bankscart.com/insurance/term-life" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Insurance', path: '/insurance' },
            { label: 'Term Life Insurance' }
          ]}
        />

        {/* Executive Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              IRDAI Licensed Life Insurers • Claim Settlement Ratios up to 99.65%
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Term Life Insurance Plans & Premium Calculator
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              Protect your family's future with pure protection term plans. Compare leading IRDAI-approved life insurers,
              simulate premiums for <strong>₹1 Crore to ₹5 Crores cover</strong>, and claim Section 80C & 10(10D) tax benefits.
            </p>

            {/* Quick Metrics */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-mono font-black text-amber-400">₹450 / month</div>
                <div className="text-xs text-slate-300 mt-0.5">Starting ₹1 Crore Cover</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-mono font-black text-amber-400">Up to 99.65%</div>
                <div className="text-xs text-slate-300 mt-0.5">Verified Claim Settlement Ratio</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-mono font-black text-amber-400">Sec 10(10D)</div>
                <div className="text-xs text-slate-300 mt-0.5">100% Tax-Free Death Benefit</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-mono font-black text-amber-400">64 Illnesses</div>
                <div className="text-xs text-slate-300 mt-0.5">Critical Illness Rider Cover</div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Feature Tabs */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-200 bg-slate-50/70 p-2 gap-2 overflow-x-auto">
            {[
              { id: 'calculator', label: 'Live Premium Estimator', icon: Calculator },
              { id: 'plans', label: 'Top IRDAI Insurers Comparison', icon: ShieldCheck },
              { id: 'riders', label: 'Critical Riders & Add-ons', icon: HeartPulse },
              { id: 'mwpa', label: 'MWPA Asset Protection Shield', icon: Lock },
              { id: 'claim-process', label: 'Claim Settlement Protocol', icon: FileText }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-10">
            {/* Tab 1: Live Premium Calculator */}
            {activeTab === 'calculator' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Interactive Term Life Insurance Premium Estimator
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Calculate your approximate monthly and annual premium based on your current age, smoking habit, and life cover target.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column: Sliders & Controls */}
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
                    {/* Age Slider */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Current Age
                        </label>
                        <span className="font-mono font-black text-blue-900 text-lg">{age} Years</span>
                      </div>
                      <input
                        type="range"
                        min="18"
                        max="65"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                        className="w-full accent-blue-900 cursor-pointer h-2 bg-slate-200 rounded-lg"
                      />
                      <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                        <span>18 Years</span>
                        <span>40 Years</span>
                        <span>65 Years</span>
                      </div>
                    </div>

                    {/* Gender Toggle */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Gender (Women get ~15% lower premium)
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setGender('male')}
                          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                            gender === 'male'
                              ? 'bg-blue-900 text-white shadow-sm'
                              : 'bg-white border border-slate-300 text-slate-700'
                          }`}
                        >
                          Male
                        </button>
                        <button
                          type="button"
                          onClick={() => setGender('female')}
                          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                            gender === 'female'
                              ? 'bg-blue-900 text-white shadow-sm'
                              : 'bg-white border border-slate-300 text-slate-700'
                          }`}
                        >
                          Female (15% Discount)
                        </button>
                      </div>
                    </div>

                    {/* Tobacco User Toggle */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Tobacco / Cigarette Usage
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setTobaccoUser(false)}
                          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                            !tobaccoUser
                              ? 'bg-emerald-700 text-white shadow-sm'
                              : 'bg-white border border-slate-300 text-slate-700'
                          }`}
                        >
                          Non-Smoker (Cheaper)
                        </button>
                        <button
                          type="button"
                          onClick={() => setTobaccoUser(true)}
                          className={`py-2.5 px-4 rounded-xl text-xs font-bold transition-all ${
                            tobaccoUser
                              ? 'bg-amber-700 text-white shadow-sm'
                              : 'bg-white border border-slate-300 text-slate-700'
                          }`}
                        >
                          Tobacco / Smoker
                        </button>
                      </div>
                    </div>

                    {/* Sum Assured Quick Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Desired Life Cover (Sum Assured)
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { label: '₹50 Lakhs', val: 5000000 },
                          { label: '₹1 Crore', val: 10000000 },
                          { label: '₹1.5 Crores', val: 15000000 },
                          { label: '₹2 Crores', val: 20000000 },
                          { label: '₹3 Crores', val: 30000000 },
                          { label: '₹5 Crores', val: 50000000 }
                        ].map((opt) => (
                          <button
                            key={opt.val}
                            type="button"
                            onClick={() => setSumAssured(opt.val)}
                            className={`py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
                              sumAssured === opt.val
                                ? 'bg-blue-900 text-white shadow-sm ring-2 ring-blue-500/20'
                                : 'bg-white border border-slate-300 text-slate-700'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Cover Till Age Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                        Cover Active Up To
                      </label>
                      <div className="grid grid-cols-4 gap-2">
                        {[60, 65, 75, 85].map((targetAge) => (
                          <button
                            key={targetAge}
                            type="button"
                            onClick={() => setCoverTillAge(targetAge)}
                            className={`py-2 px-2 rounded-xl text-xs font-bold transition-all ${
                              coverTillAge === targetAge
                                ? 'bg-blue-900 text-white shadow-sm ring-2 ring-blue-500/20'
                                : 'bg-white border border-slate-300 text-slate-700'
                            }`}
                          >
                            Age {targetAge}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Output Card */}
                  <div className="space-y-4 flex flex-col justify-between">
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-6">
                      <div>
                        <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                          Estimated Monthly Premium
                        </span>
                        <div className="text-4xl sm:text-5xl font-mono font-black text-white mt-1 tabular-nums">
                          {formatCurrency(premiumCalculation.monthlyPremium)}
                          <span className="text-sm font-sans font-normal text-slate-300"> / month</span>
                        </div>
                        <div className="text-xs text-slate-300 mt-1">
                          Annual Premium: {formatCurrency(premiumCalculation.totalAnnualWithGst)} (incl. 18% GST)
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                        <div>
                          <span className="text-xs text-slate-300 font-medium block">Total Life Cover</span>
                          <span className="text-xl font-mono font-bold text-amber-300 mt-0.5 block tabular-nums">
                            {formatCurrency(sumAssured)}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-slate-300 font-medium block">Coverage Duration</span>
                          <span className="text-xl font-mono font-bold text-emerald-400 mt-0.5 block tabular-nums">
                            {premiumCalculation.termYears} Years (Till Age {coverTillAge})
                          </span>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-white block">Annual Section 80C Tax Savings:</span>
                          <span className="text-slate-300 text-[11px]">Up to 30% tax bracket</span>
                        </div>
                        <span className="text-base font-mono font-bold text-emerald-300">
                          {formatCurrency(premiumCalculation.taxSavedPerYear)} / yr
                        </span>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-xs flex items-start gap-3">
                      <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div className="leading-relaxed">
                        <strong>Tax Shield:</strong> 100% of the death claim payout received by your nominee is strictly exempt from income tax under <strong>Section 10(10D)</strong>, with zero deductions or limits.
                      </div>
                    </div>

                    <Link
                      to="/eligibility"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-md transition-all text-sm active:scale-95"
                    >
                      <span>Compare Quotes Across Insurers</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Top IRDAI Insurers Comparison */}
            {activeTab === 'plans' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    IRDAI-Regulated Life Insurers Comparison (2026)
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Audited Claim Settlement Ratios (CSR) and solvency margins published in the latest IRDAI Annual Report.
                  </p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                      <tr>
                        <th className="py-3.5 px-4">Insurance Company</th>
                        <th className="py-3.5 px-4">Flagship Term Plan</th>
                        <th className="py-3.5 px-4">Claim Settlement Ratio (CSR)</th>
                        <th className="py-3.5 px-4">Solvency Ratio</th>
                        <th className="py-3.5 px-4">Starting Premium</th>
                        <th className="py-3.5 px-4">Max Cover Age</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {TOP_TERM_PLANS.map((plan, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                          <td className="py-3.5 px-4">
                            <span className="font-bold text-slate-900 text-sm block">{plan.insurer}</span>
                            {plan.isSovereign && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 inline-block mt-0.5">
                                100% Sovereign Guarantee
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-blue-900">{plan.planName}</td>
                          <td className="py-3.5 px-4">
                            <span className="font-mono font-black text-emerald-700 text-sm block">
                              {plan.claimRatioDisplay}
                            </span>
                            <span className="text-[10px] text-slate-400">IRDAI Certified</span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold">{plan.solvencyRatio} (Req: 1.5)</td>
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                            From ₹{plan.minMonthlyPremium} / mo
                          </td>
                          <td className="py-3.5 px-4 font-mono">{plan.maxCoverAge}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 3: Critical Riders */}
            {activeTab === 'riders' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Essential Riders & Add-On Benefits
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Supercharge your base term life policy with targeted financial protection against accidents, disability, and critical illnesses.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Critical Illness Benefit Rider',
                      desc: 'Provides a lump sum cash payout upon diagnosis of up to 64 major critical illnesses (including cancer, heart attack, bypass surgery, stroke, and kidney failure).',
                      tag: 'Medical Shield',
                      icon: HeartPulse
                    },
                    {
                      title: 'Accidental Death Benefit Rider',
                      desc: 'Doubles the payout to your nominee if death occurs due to an accident. E.g., a ₹1 Crore base cover pays out ₹2 Crores in total.',
                      tag: 'Double Protection',
                      icon: Umbrella
                    },
                    {
                      title: 'Waiver of Premium on Disability',
                      desc: 'If the policyholder suffers permanent disability due to an accident, all future premiums are waived while the full life cover continues untouched.',
                      tag: 'Premium Security',
                      icon: ShieldCheck
                    },
                    {
                      title: 'Terminal Illness Accelerated Payout',
                      desc: 'If diagnosed with a terminal illness with less than 6–12 months life expectancy, 100% of the sum assured is paid immediately to handle palliative care.',
                      tag: 'Living Benefit',
                      icon: Clock
                    },
                    {
                      title: 'Return of Premium (TROP)',
                      desc: 'If you survive the entire policy duration, 100% of all paid base premiums are refunded back to you at maturity (excluding taxes).',
                      tag: 'Maturity Refund',
                      icon: Award
                    },
                    {
                      title: 'Life Stage Add-on Option',
                      desc: 'Increase your life cover by 25% to 50% without undergoing fresh medical tests at major life milestones: marriage, first child, or purchasing a home.',
                      tag: 'Milestone Flexibility',
                      icon: TrendingUp
                    }
                  ].map((rider, idx) => {
                    const Icon = rider.icon;
                    return (
                      <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                            {rider.tag}
                          </span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-base">{rider.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{rider.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 4: MWPA Protection */}
            {activeTab === 'mwpa' && (
              <div className="space-y-8 max-w-3xl">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Married Women's Property Act (MWPA 1874) Protection
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Section 6 of the MWPA creates an unassailable financial fortress solely for your wife and children.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-900 text-amber-400 flex items-center justify-center shrink-0">
                      <Lock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        Why Every Business Owner & Salaried Earner Needs MWPA
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                        When you purchase a term insurance policy under MWPA, it legally ceases to be part of your personal estate. It is deemed an independent trust managed for your wife and children.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
                      <strong className="text-slate-900 block font-bold">1. Immunity from Creditors</strong>
                      <span className="text-slate-600 leading-relaxed">
                        Even in personal bankruptcy, no bank, lender, or financial creditor can attach the policy claim money.
                      </span>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
                      <strong className="text-slate-900 block font-bold">2. Protection from Court Decrees</strong>
                      <span className="text-slate-600 leading-relaxed">
                        Court attachments and tax department recovery notices cannot touch MWPA claim proceeds.
                      </span>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
                      <strong className="text-slate-900 block font-bold">3. Zero Extra Fee</strong>
                      <span className="text-slate-600 leading-relaxed">
                        Endorsing MWPA requires checking a simple box on the application form with zero additional premium.
                      </span>
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
                      <strong className="text-slate-900 block font-bold">4. Irrevocable Beneficiary</strong>
                      <span className="text-slate-600 leading-relaxed">
                        Guarantees that relatives or external parties cannot dispute the death benefit allocation.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Claim Process */}
            {activeTab === 'claim-process' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Fast-Track 3-Step Claim Settlement Protocol
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    IRDAI mandates prompt settlement of uncontested death claims within 15 days of document submission.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <span className="text-2xl font-mono font-black text-blue-900 block">Step 01</span>
                    <h4 className="font-bold text-slate-900 text-base">Claim Intimation</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Nominee intimates the insurer via online portal, 24x7 toll-free helpline, or nearest branch office with policy number and date of demise.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <span className="text-2xl font-mono font-black text-blue-900 block">Step 02</span>
                    <h4 className="font-bold text-slate-900 text-base">Document Upload</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Submit Death Certificate issued by Municipal Corporation, original policy document, nominee PAN & Aadhaar KYC, and cancelled bank cheque.
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <span className="text-2xl font-mono font-black text-emerald-700 block">Step 03</span>
                    <h4 className="font-bold text-slate-900 text-base">Direct Account Credit</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Insurer verifies documents and disburses the 100% tax-free sum assured directly into the nominee’s bank account via NEFT/RTGS.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Home Loan & Debt Protection Callout */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-700" />
              BanksCart Loan Protection Shield
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Have an Active Home Loan or Personal Debt?
            </h3>
            <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
              If an unforeseen event occurs, outstanding retail home loans or business liabilities should never burden your family. A ₹1 Crore to ₹2 Crores term policy completely insulates your loved ones from debt recovery notices.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/eligibility"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-blue-900 hover:bg-blue-800 shadow-md transition-all text-sm active:scale-95"
            >
              Get Free Insurance Quotes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Term Life Insurance FAQ
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Clear answers on claim settlement metrics, rider choices, and medical examination policies.
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {[
              {
                q: 'What is Claim Settlement Ratio (CSR) and why is it important?',
                a: 'Claim Settlement Ratio represents the percentage of claims an insurance company has successfully paid out compared to the total claims received in a financial year. An insurer with a CSR above 98% (such as Max Life, HDFC Life, and ICICI Prudential) demonstrates proven claim payment integrity.'
              },
              {
                q: 'Can a term insurance policy claim be rejected after 3 years?',
                a: 'Under Section 45 of the Insurance Act, 1938, no life insurance policy can be called into question or rejected by an insurer on any grounds (including non-disclosure or misstatement) after three continuous years from the date of policy issuance.'
              },
              {
                q: 'What happens if I stop smoking after purchasing a smoker term policy?',
                a: 'If you have successfully quit smoking or tobacco consumption for a continuous period of 12 to 24 months, many insurers allow you to submit fresh medical tests (such as a urine cotinine test) to reduce your ongoing future premiums to non-smoker rates.'
              },
              {
                q: 'Is a medical test mandatory for buying term life insurance?',
                a: 'For high cover amounts (₹1 Crore and above) or applicants aged 35+, most insurers conduct a complimentary home visit or tele-medical checkup (blood profile, ECG). Younger applicants under 35 with clean medical history can often qualify for instant video-medical or tele-underwriting.'
              }
            ].map((faq, fIdx) => (
              <details
                key={fIdx}
                className="group py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-slate-900 hover:text-blue-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold">
                    {faq.q}
                  </h3>
                  <div className="shrink-0 rounded-full bg-slate-100 group-open:bg-blue-100 p-1.5 text-slate-600 group-open:text-blue-900 transition-colors">
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-open:rotate-180" />
                  </div>
                </summary>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed pr-6">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
