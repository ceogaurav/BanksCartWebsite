import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Calculator,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
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
  DollarSign,
  ExternalLink,
  Sparkles,
  Award,
  Wallet,
  Building
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { formatCurrency } from '../utils/calculations';

interface IncomeTaxPageProps {
  openApplyModal?: (loanType?: string) => void;
}

export default function IncomeTaxPage({ openApplyModal }: IncomeTaxPageProps) {
  // Calculator inputs
  const [grossIncome, setGrossIncome] = useState<number>(1200000);
  const [isSalaried, setIsSalaried] = useState<boolean>(true);

  // Old Regime Deduction inputs
  const [sec80C, setSec80C] = useState<number>(150000); // Max 1.5L
  const [sec80D, setSec80D] = useState<number>(25000); // Health insurance self & family
  const [sec24b, setSec24b] = useState<number>(200000); // Home loan interest (max 2L)
  const [sec80CCD1B, setSec80CCD1B] = useState<number>(50000); // NPS additional 50k
  const [hraExemption, setHraExemption] = useState<number>(0);

  // Active Tab for Reference Sections
  const [activeTab, setActiveTab] = useState<'comparator' | 'slabs' | 'deductions' | 'itr-guide' | 'advance-tax'>('comparator');

  // Interactive Tax Computation
  const taxComparison = useMemo(() => {
    // 1. New Tax Regime (Section 115BAC)
    const newStdDeduction = isSalaried ? 75000 : 0;
    const newTaxableIncome = Math.max(0, grossIncome - newStdDeduction);

    let newBaseTax = 0;
    if (newTaxableIncome <= 300000) {
      newBaseTax = 0;
    } else if (newTaxableIncome <= 700000) {
      newBaseTax = (newTaxableIncome - 300000) * 0.05;
    } else if (newTaxableIncome <= 1000000) {
      newBaseTax = 20000 + (newTaxableIncome - 700000) * 0.10;
    } else if (newTaxableIncome <= 1200000) {
      newBaseTax = 50000 + (newTaxableIncome - 1000000) * 0.15;
    } else if (newTaxableIncome <= 1500000) {
      newBaseTax = 80000 + (newTaxableIncome - 1200000) * 0.20;
    } else {
      newBaseTax = 140000 + (newTaxableIncome - 1500000) * 0.30;
    }

    // Section 87A rebate under New Regime: full rebate if taxable income <= 7,00,000 (Tax = 0)
    let newRebate87A = 0;
    if (newTaxableIncome <= 700000) {
      newRebate87A = newBaseTax;
    }

    const newTaxAfterRebate = Math.max(0, newBaseTax - newRebate87A);
    const newCess = Math.round(newTaxAfterRebate * 0.04);
    const totalNewTax = Math.round(newTaxAfterRebate + newCess);

    // 2. Old Tax Regime
    const oldStdDeduction = isSalaried ? 50000 : 0;
    const capped80C = Math.min(sec80C, 150000);
    const capped80D = Math.min(sec80D, 100000);
    const capped24b = Math.min(sec24b, 200000);
    const capped80CCD = Math.min(sec80CCD1B, 50000);

    const totalOldDeductions =
      oldStdDeduction + capped80C + capped80D + capped24b + capped80CCD + hraExemption;
    const oldTaxableIncome = Math.max(0, grossIncome - totalOldDeductions);

    let oldBaseTax = 0;
    if (oldTaxableIncome <= 250000) {
      oldBaseTax = 0;
    } else if (oldTaxableIncome <= 500000) {
      oldBaseTax = (oldTaxableIncome - 250000) * 0.05;
    } else if (oldTaxableIncome <= 1000000) {
      oldBaseTax = 12500 + (oldTaxableIncome - 500000) * 0.20;
    } else {
      oldBaseTax = 112500 + (oldTaxableIncome - 1000000) * 0.30;
    }

    // Section 87A rebate under Old Regime: full rebate up to ₹12,500 if taxable income <= 5,00,000
    let oldRebate87A = 0;
    if (oldTaxableIncome <= 500000) {
      oldRebate87A = Math.min(oldBaseTax, 12500);
    }

    const oldTaxAfterRebate = Math.max(0, oldBaseTax - oldRebate87A);
    const oldCess = Math.round(oldTaxAfterRebate * 0.04);
    const totalOldTax = Math.round(oldTaxAfterRebate + oldCess);

    const diff = totalOldTax - totalNewTax;
    const betterRegime = diff > 0 ? 'new' : diff < 0 ? 'old' : 'equal';
    const absoluteDiff = Math.abs(diff);

    return {
      newTaxableIncome: Math.round(newTaxableIncome),
      totalNewTax,
      newStdDeduction,
      newCess,
      newBaseTax: Math.round(newBaseTax),
      newRebate87A: Math.round(newRebate87A),

      oldTaxableIncome: Math.round(oldTaxableIncome),
      totalOldTax,
      totalOldDeductions: Math.round(totalOldDeductions),
      oldCess,
      oldBaseTax: Math.round(oldBaseTax),
      oldRebate87A: Math.round(oldRebate87A),

      betterRegime,
      absoluteDiff
    };
  }, [grossIncome, isSalaried, sec80C, sec80D, sec24b, sec80CCD1B, hraExemption]);

  // Schema.org Structured Data
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'GovernmentService',
        name: 'Income Tax Guide & Live Tax Regime Comparator',
        provider: {
          '@type': 'GovernmentOrganization',
          name: 'Central Board of Direct Taxes (CBDT), Income Tax Department'
        },
        serviceType: 'Income Tax Assessment & Regime Comparison',
        description:
          'Compare New Tax Regime (Section 115BAC) with Old Tax Regime, evaluate standard deduction of ₹75,000, Section 87A rebate, and Chapter VI-A deductions.',
        url: 'https://www.bankscart.com/resources/income-tax'
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
            name: 'Resources',
            item: 'https://www.bankscart.com/resources'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Income Tax Guide',
            item: 'https://www.bankscart.com/resources/income-tax'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the revised Standard Deduction under the New Tax Regime in 2026?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The standard deduction for salaried employees and pensioners under the New Tax Regime (Section 115BAC) is ₹75,000 (increased from ₹50,000 in the Finance Act).'
            }
          },
          {
            '@type': 'Question',
            name: 'At what income level is tax zero under the New Tax Regime?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For salaried employees, gross income up to ₹7,75,000 pays ZERO TAX under the New Tax Regime. This consists of ₹75,000 standard deduction + ₹7,00,000 taxable limit eligible for 100% tax rebate under Section 87A.'
            }
          },
          {
            '@type': 'Question',
            name: 'How does a Home Loan save income tax?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under the Old Tax Regime, a home loan offers dual tax deductions: up to ₹1,50,000 for principal repayment under Section 80C, and up to ₹2,00,000 for interest repayment under Section 24(b), allowing up to ₹3,50,000 in total deductions.'
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Helmet>
        <title>Income Tax Guide & Live Tax Regime Comparator (2026) | BanksCart</title>
        <meta
          name="description"
          content="Compare New Tax Regime (Section 115BAC) vs Old Tax Regime, simulate ₹75,000 standard deduction, Section 87A zero-tax rebate up to ₹7.75 Lakhs, and Chapter VI-A deductions."
        />
        <link rel="canonical" href="https://www.bankscart.com/resources/income-tax" />
        <meta property="og:title" content="Income Tax Guide & Live Regime Comparator - BanksCart" />
        <meta
          property="og:description"
          content="Instant comparison between New and Old tax regimes for FY 2025-26 & FY 2026-27. Accurate slabs, ITR guidelines, and advance tax dates."
        />
        <meta property="og:url" content="https://www.bankscart.com/resources/income-tax" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Resources', path: '/resources' },
            { label: 'Income Tax Guide & Regime Comparator' }
          ]}
        />

        {/* Executive Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              CBDT • Income Tax Act 1961 • Updated for FY 2025–26 & FY 2026–27
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Income Tax Guide & Regime Comparator
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              Simulate your tax liability side-by-side under the <strong>New Tax Regime (Section 115BAC)</strong> and
              the <strong>Old Tax Regime</strong>. Evaluate the ₹75,000 standard deduction, Section 87A rebate, and Chapter VI-A deductions.
            </p>

            {/* Quick Metrics */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-mono font-black text-amber-400">₹7,75,000</div>
                <div className="text-xs text-slate-300 mt-0.5">Zero-Tax Threshold (Salaried)</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-mono font-black text-amber-400">₹75,000</div>
                <div className="text-xs text-slate-300 mt-0.5">New Regime Standard Deduction</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-mono font-black text-amber-400">Sec 115BAC</div>
                <div className="text-xs text-slate-300 mt-0.5">Default Statutory Tax Regime</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-mono font-black text-amber-400">Up to ₹3.5L</div>
                <div className="text-xs text-slate-300 mt-0.5">Home Loan Tax Shield (Old Regime)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-200 bg-slate-50/70 p-2 gap-2 overflow-x-auto">
            {[
              { id: 'comparator', label: 'Live Tax Regime Comparator', icon: Calculator },
              { id: 'slabs', label: 'FY 2025–26 & FY 2026–27 Tax Slabs', icon: Layers },
              { id: 'deductions', label: 'Deductions Directory (80C, 80D, 24b)', icon: FileText },
              { id: 'itr-guide', label: 'Which ITR Form to File?', icon: CheckCircle2 },
              { id: 'advance-tax', label: 'Advance Tax Due Dates & Penalties', icon: Calendar }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
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
            {/* Tab 1: Live Regime Comparator */}
            {activeTab === 'comparator' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Interactive Tax Calculator: New Regime vs Old Regime
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Enter your annual gross income and active deductions to see which tax regime saves you more money.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column: Sliders & Deductions Inputs */}
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-6">
                    {/* Gross Income Slider */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Annual Gross Salary / Income
                        </label>
                        <span className="font-mono font-black text-blue-900 text-lg">
                          {formatCurrency(grossIncome)}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="300000"
                        max="5000000"
                        step="50000"
                        value={grossIncome}
                        onChange={(e) => setGrossIncome(Number(e.target.value))}
                        className="w-full accent-blue-900 cursor-pointer h-2 bg-slate-200 rounded-lg"
                      />
                      <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                        <span>₹3 Lakhs</span>
                        <span>₹25 Lakhs</span>
                        <span>₹50 Lakhs</span>
                      </div>
                    </div>

                    {/* Salaried Toggle */}
                    <div className="flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">Salaried Individual / Pensioner</span>
                        <span className="text-[11px] text-slate-500">
                          Eligible for ₹75,000 standard deduction (New) / ₹50,000 (Old)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsSalaried(!isSalaried)}
                        className={`w-12 h-6 rounded-full transition-colors relative ${
                          isSalaried ? 'bg-blue-900' : 'bg-slate-300'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
                            isSalaried ? 'right-1' : 'left-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Old Regime Deductions Section */}
                    <div className="space-y-4 pt-2 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                          Old Regime Deductions
                        </span>
                        <span className="text-[11px] text-slate-500">
                          Total: {formatCurrency(taxComparison.totalOldDeductions)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div>
                          <label className="block text-slate-600 font-semibold mb-1">
                            Section 80C (PPF, EPF, ELSS, Life Ins)
                          </label>
                          <input
                            type="number"
                            max={150000}
                            value={sec80C}
                            onChange={(e) => setSec80C(Number(e.target.value))}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1">
                            Section 80D (Health Insurance)
                          </label>
                          <input
                            type="number"
                            value={sec80D}
                            onChange={(e) => setSec80D(Number(e.target.value))}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1">
                            Section 24(b) (Home Loan Interest)
                          </label>
                          <input
                            type="number"
                            max={200000}
                            value={sec24b}
                            onChange={(e) => setSec24b(Number(e.target.value))}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                          />
                        </div>

                        <div>
                          <label className="block text-slate-600 font-semibold mb-1">
                            Section 80CCD(1B) (NPS Extra ₹50k)
                          </label>
                          <input
                            type="number"
                            max={50000}
                            value={sec80CCD1B}
                            onChange={(e) => setSec80CCD1B(Number(e.target.value))}
                            className="w-full p-2.5 bg-white border border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Comparison Card & Verdict */}
                  <div className="space-y-4 flex flex-col justify-between">
                    {/* Recommendation Verdict Card */}
                    <div
                      className={`p-5 rounded-2xl border ${
                        taxComparison.betterRegime === 'new'
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                          : taxComparison.betterRegime === 'old'
                          ? 'bg-blue-50 border-blue-300 text-blue-950'
                          : 'bg-slate-100 border-slate-300 text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-sm">
                        <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
                        <span>
                          {taxComparison.betterRegime === 'new'
                            ? `New Tax Regime Saves You ${formatCurrency(taxComparison.absoluteDiff)}!`
                            : taxComparison.betterRegime === 'old'
                            ? `Old Tax Regime Saves You ${formatCurrency(taxComparison.absoluteDiff)}!`
                            : 'Both Regimes Result in Equal Tax Liability!'}
                        </span>
                      </div>
                      <p className="text-xs mt-1 leading-relaxed">
                        {taxComparison.betterRegime === 'new'
                          ? 'Thanks to lower tax slabs and the ₹75,000 standard deduction, the New Regime provides maximum take-home salary without requiring investments.'
                          : 'Your extensive deductions (Home Loan interest, Section 80C, 80D, NPS) outweigh the New Regime slab benefits. Opt for the Old Regime when filing your ITR.'}
                      </p>
                    </div>

                    {/* Side-by-Side Breakdown Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* New Regime Card */}
                      <div className={`p-5 rounded-2xl border ${taxComparison.betterRegime === 'new' ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-slate-900 text-sm">New Regime (115BAC)</span>
                          {taxComparison.betterRegime === 'new' && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                              Recommended
                            </span>
                          )}
                        </div>
                        <div className="text-2xl font-mono font-black text-slate-900 mt-2">
                          {formatCurrency(taxComparison.totalNewTax)}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">Total Tax Payable (incl. Cess)</div>

                        <div className="mt-4 pt-4 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
                          <div className="flex justify-between">
                            <span>Standard Deduction:</span>
                            <span className="font-mono font-semibold">{formatCurrency(taxComparison.newStdDeduction)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxable Income:</span>
                            <span className="font-mono font-semibold">{formatCurrency(taxComparison.newTaxableIncome)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Section 87A Rebate:</span>
                            <span className="font-mono text-emerald-700 font-bold">-{formatCurrency(taxComparison.newRebate87A)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>4% Health & Ed Cess:</span>
                            <span className="font-mono font-semibold">{formatCurrency(taxComparison.newCess)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Old Regime Card */}
                      <div className={`p-5 rounded-2xl border ${taxComparison.betterRegime === 'old' ? 'bg-white border-blue-500 shadow-md ring-2 ring-blue-500/20' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-slate-900 text-sm">Old Tax Regime</span>
                          {taxComparison.betterRegime === 'old' && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                              Recommended
                            </span>
                          )}
                        </div>
                        <div className="text-2xl font-mono font-black text-slate-900 mt-2">
                          {formatCurrency(taxComparison.totalOldTax)}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">Total Tax Payable (incl. Cess)</div>

                        <div className="mt-4 pt-4 border-t border-slate-200 space-y-1.5 text-xs text-slate-600">
                          <div className="flex justify-between">
                            <span>Total Deductions:</span>
                            <span className="font-mono font-semibold">{formatCurrency(taxComparison.totalOldDeductions)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Taxable Income:</span>
                            <span className="font-mono font-semibold">{formatCurrency(taxComparison.oldTaxableIncome)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Section 87A Rebate:</span>
                            <span className="font-mono text-emerald-700 font-bold">-{formatCurrency(taxComparison.oldRebate87A)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>4% Health & Ed Cess:</span>
                            <span className="font-mono font-semibold">{formatCurrency(taxComparison.oldCess)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Direct e-Filing Action */}
                    <div className="pt-2">
                      <a
                        href="https://eportal.incometax.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-blue-900 hover:bg-blue-800 shadow-md transition-all text-xs sm:text-sm group"
                      >
                        <span>File ITR on Income Tax Department Portal</span>
                        <ExternalLink className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Slabs & Rates */}
            {activeTab === 'slabs' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Official Tax Slabs for FY 2025–26 & FY 2026–27
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Statutory tax brackets under Section 115BAC (Default New Tax Regime) vs the Old Tax Regime.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* New Regime Slabs */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">New Tax Regime (Section 115BAC)</h3>
                        <span className="text-xs text-emerald-700 font-semibold">Standard Deduction: ₹75,000</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        Default System
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100 text-xs">
                      <div className="py-2.5 flex justify-between items-center">
                        <span>Up to ₹3,00,000</span>
                        <span className="font-mono font-bold text-emerald-700">Nil (0%)</span>
                      </div>
                      <div className="py-2.5 flex justify-between items-center">
                        <span>₹3,00,001 to ₹7,00,000</span>
                        <span className="font-mono font-bold text-slate-900">5% (Full 87A Rebate)</span>
                      </div>
                      <div className="py-2.5 flex justify-between items-center">
                        <span>₹7,00,001 to ₹10,00,000</span>
                        <span className="font-mono font-bold text-slate-900">10%</span>
                      </div>
                      <div className="py-2.5 flex justify-between items-center">
                        <span>₹10,00,001 to ₹12,00,000</span>
                        <span className="font-mono font-bold text-slate-900">15%</span>
                      </div>
                      <div className="py-2.5 flex justify-between items-center">
                        <span>₹12,00,001 to ₹15,00,000</span>
                        <span className="font-mono font-bold text-slate-900">20%</span>
                      </div>
                      <div className="py-2.5 flex justify-between items-center">
                        <span>Above ₹15,00,000</span>
                        <span className="font-mono font-bold text-slate-900">30%</span>
                      </div>
                    </div>

                    <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-xs">
                      <strong>Zero-Tax Rule:</strong> Gross income up to ₹7,75,000 for salaried individuals is completely tax-free under Section 87A!
                    </div>
                  </div>

                  {/* Old Regime Slabs */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">Old Tax Regime (Optional)</h3>
                        <span className="text-xs text-blue-700 font-semibold">Standard Deduction: ₹50,000</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        Requires Opt-Out
                      </span>
                    </div>

                    <div className="divide-y divide-slate-100 text-xs">
                      <div className="py-2.5 flex justify-between items-center">
                        <span>Up to ₹2,50,000</span>
                        <span className="font-mono font-bold text-emerald-700">Nil (0%)</span>
                      </div>
                      <div className="py-2.5 flex justify-between items-center">
                        <span>₹2,50,001 to ₹5,00,000</span>
                        <span className="font-mono font-bold text-slate-900">5% (Full 87A Rebate)</span>
                      </div>
                      <div className="py-2.5 flex justify-between items-center">
                        <span>₹5,00,001 to ₹10,00,000</span>
                        <span className="font-mono font-bold text-slate-900">20%</span>
                      </div>
                      <div className="py-2.5 flex justify-between items-center">
                        <span>Above ₹10,00,000</span>
                        <span className="font-mono font-bold text-slate-900">30%</span>
                      </div>
                    </div>

                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-900 text-xs">
                      <strong>Senior Citizen Slabs:</strong> Basic exemption limit is ₹3,00,000 for senior citizens (age 60–79) and ₹5,00,000 for super seniors (age 80+).
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Deductions Directory */}
            {activeTab === 'deductions' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Comprehensive Chapter VI-A Deductions Directory
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Allowable tax deductions under the Old Tax Regime to lower your taxable salary.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      sec: 'Section 80C',
                      limit: '₹1,50,000',
                      title: 'Life Insurance, PPF, EPF, ELSS, Tuition Fees',
                      desc: 'Deduction for investments in PPF, employee provident fund, tax-saving ELSS funds, national savings certificates, and children’s tuition fees.'
                    },
                    {
                      sec: 'Section 24(b)',
                      limit: '₹2,00,000',
                      title: 'Home Loan Interest on Self-Occupied House',
                      desc: 'Deduct up to ₹2 Lakhs in interest paid towards home loans for self-occupied residential property. No upper cap for rented property.'
                    },
                    {
                      sec: 'Section 80D',
                      limit: '₹25,000 – ₹1,00,000',
                      title: 'Health Insurance Premiums & Checkups',
                      desc: 'Up to ₹25,000 for self/family (₹50,000 if senior citizen) plus additional ₹25,000/₹50,000 for parents. Includes ₹5,000 preventive checkup.'
                    },
                    {
                      sec: 'Section 80CCD(1B)',
                      limit: '₹50,000',
                      title: 'National Pension Scheme (NPS) Contribution',
                      desc: 'Exclusive additional deduction over and above the Section 80C limit of ₹1.5 Lakhs for voluntary deposits into Tier-1 NPS accounts.'
                    },
                    {
                      sec: 'Section 80E',
                      limit: 'No Upper Limit',
                      title: 'Interest on Higher Education Loans',
                      desc: 'Full deduction for interest paid on education loans taken for higher studies of self, spouse, or children for up to 8 consecutive years.'
                    },
                    {
                      sec: 'Section 80TTA / 80TTB',
                      limit: '₹10,000 / ₹50,000',
                      title: 'Savings Bank & Fixed Deposit Interest',
                      desc: 'Section 80TTA allows up to ₹10,000 on savings accounts for individuals. Section 80TTB allows up to ₹50,000 on all deposits for senior citizens.'
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-xs px-2.5 py-1 rounded-md bg-blue-100 text-blue-900">
                          {item.sec}
                        </span>
                        <span className="text-xs font-mono font-bold text-emerald-700">
                          Max: {item.limit}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mt-2">{item.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: ITR Guide */}
            {activeTab === 'itr-guide' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Which ITR Form Should You File?
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Filing the wrong ITR form leads to defective return notices under Section 139(9). Find your exact form below.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      form: 'ITR-1 (Sahaj)',
                      forWhom: 'Salaried Residents up to ₹50 Lakhs',
                      criteria: 'Individuals having income from Salary, one House Property, and other sources (interest). Not for company directors or unlisted equity holders.'
                    },
                    {
                      form: 'ITR-2',
                      forWhom: 'Individuals with Capital Gains & Multiple Properties',
                      criteria: 'For individuals and HUFs having income from capital gains (stocks, mutual funds, property sale), more than one house, or foreign income/assets.'
                    },
                    {
                      form: 'ITR-3',
                      forWhom: 'Business & Professional Income',
                      criteria: 'For individuals and HUFs having proprietary business turnover, consulting professions, or partnership income.'
                    },
                    {
                      form: 'ITR-4 (Sugam)',
                      forWhom: 'Presumptive Taxation Schemes',
                      criteria: 'For resident individuals, HUFs, and firms having presumptive business turnover under Section 44AD, 44ADA (professionals), or 44AE.'
                    }
                  ].map((form, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                      <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block">
                        {form.form}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm">{form.forWhom}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{form.criteria}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 5: Advance Tax Schedule */}
            {activeTab === 'advance-tax' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                    Advance Tax Schedule & Late Filing Penalties
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    If your net income tax liability after TDS exceeds ₹10,000, you are statutorily required to pay advance tax in 4 quarterly installments.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  {[
                    { quarter: '1st Installment', date: 'On or before 15th June', amt: '15% of estimated net tax' },
                    { quarter: '2nd Installment', date: 'On or before 15th September', amt: '45% of estimated net tax' },
                    { quarter: '3rd Installment', date: 'On or before 15th December', amt: '75% of estimated net tax' },
                    { quarter: '4th Installment', date: 'On or before 15th March', amt: '100% of estimated net tax' }
                  ].map((inst, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-xs font-bold text-blue-900 block">{inst.quarter}</span>
                      <h4 className="font-bold text-slate-900 text-sm">{inst.date}</h4>
                      <p className="text-xs text-slate-600 font-mono mt-1">{inst.amt}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-rose-50 rounded-2xl border border-rose-200 p-6 space-y-2">
                  <h4 className="font-bold text-rose-900 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600" />
                    Penalties for Delayed Payment or Non-Filing
                  </h4>
                  <ul className="text-xs text-rose-800 space-y-1 leading-relaxed">
                    <li>• <strong>Section 234A:</strong> 1% per month simple interest on delayed ITR filing beyond the July 31st due date.</li>
                    <li>• <strong>Section 234B & 234C:</strong> 1% per month interest for default or deferment of quarterly advance tax installments.</li>
                    <li>• <strong>Section 234F:</strong> Late filing fee of ₹5,000 (reduced to ₹1,000 if total taxable income is below ₹5 Lakhs).</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Loan & Home Loan Interest Tax Shield Integration */}
        <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold">
              <Building className="w-4 h-4 text-blue-700" />
              BanksCart Home Loan Tax Architecture
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Save Up to ₹1,09,200 Every Year on Home Loan Taxes
            </h3>
            <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
              Did you know that taking a Home Loan lets you claim up to ₹3,50,000 in deductions across Section 80C and Section 24(b)? That translates into over ₹1 Lakh in direct tax savings every single year for borrowers in the 30% slab.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link
              to="/eligibility"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-blue-900 hover:bg-blue-800 shadow-md transition-all text-sm active:scale-95"
            >
              Check Home Loan Rates
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
              Indian Income Tax & Regime FAQ
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Expert answers to common queries regarding regime selection, rebate applicability, and standard deductions.
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {[
              {
                q: 'Can I switch between the New Tax Regime and Old Tax Regime every year?',
                a: 'Salaried individuals with no business or professional income can switch between the New Tax Regime and Old Tax Regime each financial year while filing their ITR on the e-Filing portal. However, taxpayers having business or professional income can switch only once in a lifetime.'
              },
              {
                q: 'What is the Section 87A rebate and who qualifies?',
                a: 'Under the New Tax Regime, resident individuals with taxable income up to ₹7,00,000 receive a 100% tax rebate under Section 87A (making the net tax liability zero). Under the Old Tax Regime, the 87A rebate is capped at ₹12,500 for taxable income up to ₹5,00,000.'
              },
              {
                q: 'Is HRA (House Rent Allowance) exemption available in the New Tax Regime?',
                a: 'No. HRA exemption under Section 10(13A) is not available under the New Tax Regime. To claim HRA deduction, you must opt for the Old Tax Regime.'
              },
              {
                q: 'What is the penalty for not filing an Income Tax Return by July 31st?',
                a: 'Filing after the July 31st deadline attracts a late filing fee under Section 234F: ₹5,000 for income above ₹5 Lakhs, or ₹1,000 for income below ₹5 Lakhs. In addition, interest at 1% per month is charged on any unpaid tax balance under Section 234A.'
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
