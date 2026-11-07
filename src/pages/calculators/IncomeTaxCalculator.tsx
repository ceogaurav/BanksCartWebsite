import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Receipt, Calculator, TrendingDown, ChevronDown, CheckCircle,
  HelpCircle, ArrowRight, ShieldCheck, PieChart, Info, Building2,
  DollarSign, Percent, Award, Sparkles, Check
} from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import { formatCurrency } from '../../utils/calculations';

interface DeductionState {
  section80C: number;
  section80D: number;
  section24b: number;
  nps80CCD: number;
  otherDeductions: number;
}

const IncomeTaxCalculator: React.FC = () => {
  // Input States
  const [grossIncome, setGrossIncome] = useState<number>(1200000);
  const [activeRegime, setActiveRegime] = useState<'new' | 'old' | 'compare'>('compare');
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(null);

  const [deductions, setDeductions] = useState<DeductionState>({
    section80C: 150000,
    section80D: 25000,
    section24b: 0,
    nps80CCD: 50000,
    otherDeductions: 0
  });

  const handleGrossIncomeChange = (val: number) => {
    setGrossIncome(Math.max(0, val));
  };

  const handleDeductionChange = (key: keyof DeductionState, val: number) => {
    setDeductions(prev => ({
      ...prev,
      [key]: Math.max(0, val)
    }));
  };

  // Tax computation logic according to Indian Budget FY 2024-25 / 2025-26
  const calculations = useMemo(() => {
    // 1. New Regime Calculation (FY 2024-25 / FY 2025-26 Section 115BAC)
    const newStdDeduction = 75000;
    const newTaxableIncome = Math.max(0, grossIncome - newStdDeduction);

    let newBaseTax = 0;
    if (newTaxableIncome <= 300000) {
      newBaseTax = 0;
    } else if (newTaxableIncome <= 700000) {
      newBaseTax = (newTaxableIncome - 300000) * 0.05;
    } else if (newTaxableIncome <= 1000000) {
      newBaseTax = (400000 * 0.05) + (newTaxableIncome - 700000) * 0.10;
    } else if (newTaxableIncome <= 1200000) {
      newBaseTax = (400000 * 0.05) + (300000 * 0.10) + (newTaxableIncome - 1000000) * 0.15;
    } else if (newTaxableIncome <= 1500000) {
      newBaseTax = (400000 * 0.05) + (300000 * 0.10) + (200000 * 0.15) + (newTaxableIncome - 1200000) * 0.20;
    } else {
      newBaseTax = (400000 * 0.05) + (300000 * 0.10) + (200000 * 0.15) + (300000 * 0.20) + (newTaxableIncome - 1500000) * 0.30;
    }

    // Section 87A rebate for New Regime (taxable income up to ₹7,00,000 has full tax rebate)
    if (newTaxableIncome <= 700000) {
      newBaseTax = 0;
    }

    const newCess = Math.round(newBaseTax * 0.04);
    const newTotalTax = Math.round(newBaseTax + newCess);
    const newTakeHome = Math.max(0, grossIncome - newTotalTax);

    // 2. Old Regime Calculation
    const oldStdDeduction = 50000;
    const capped80C = Math.min(150000, deductions.section80C);
    const capped80D = Math.min(75000, deductions.section80D);
    const capped24b = Math.min(200000, deductions.section24b);
    const cappedNps = Math.min(50000, deductions.nps80CCD);
    const totalOldDeductions = oldStdDeduction + capped80C + capped80D + capped24b + cappedNps + deductions.otherDeductions;
    const oldTaxableIncome = Math.max(0, grossIncome - totalOldDeductions);

    let oldBaseTax = 0;
    if (oldTaxableIncome <= 250000) {
      oldBaseTax = 0;
    } else if (oldTaxableIncome <= 500000) {
      oldBaseTax = (oldTaxableIncome - 250000) * 0.05;
    } else if (oldTaxableIncome <= 1000000) {
      oldBaseTax = (250000 * 0.05) + (oldTaxableIncome - 500000) * 0.20;
    } else {
      oldBaseTax = (250000 * 0.05) + (500000 * 0.20) + (oldTaxableIncome - 1000000) * 0.30;
    }

    // Section 87A rebate for Old Regime (taxable income up to ₹5,00,000 has full rebate)
    if (oldTaxableIncome <= 500000) {
      oldBaseTax = 0;
    }

    const oldCess = Math.round(oldBaseTax * 0.04);
    const oldTotalTax = Math.round(oldBaseTax + oldCess);
    const oldTakeHome = Math.max(0, grossIncome - oldTotalTax);

    const taxDifference = oldTotalTax - newTotalTax;
    const recommended = taxDifference >= 0 ? 'new' : 'old';
    const netSavings = Math.abs(taxDifference);

    return {
      newTaxableIncome,
      newTotalTax,
      newTakeHome,
      newStdDeduction,
      oldTaxableIncome,
      totalOldDeductions,
      oldTotalTax,
      oldTakeHome,
      oldStdDeduction,
      taxDifference,
      recommended,
      netSavings
    };
  }, [grossIncome, deductions]);

  const faqs = [
    {
      question: "What is the key difference between New and Old Tax Regimes in FY 2025-26?",
      answer: "The New Tax Regime (Section 115BAC) offers lower tax slab rates and a higher standard deduction of ₹75,000, plus zero tax on taxable income up to ₹7,00,000 under Section 87A rebate. However, it foregoes deductions like 80C, 80D, and HRA. The Old Regime has higher slab rates but permits deductions under 80C, 80D, 24(b) home loan interest, NPS, and standard deduction of ₹50,000."
    },
    {
      question: "Is income up to ₹7.75 Lakh completely tax-free under the New Tax Regime?",
      answer: "Yes! Under the New Tax Regime, salaried individuals receive a ₹75,000 standard deduction, reducing gross income of ₹7,75,000 to a taxable income of ₹7,00,000. Under Section 87A, taxable income up to ₹7,00,000 is entitled to a full tax rebate of up to ₹25,000, resulting in zero net tax payable."
    },
    {
      question: "How does a Home Loan help reduce tax under the Old Regime?",
      answer: "Under the Old Tax Regime, you can claim a deduction of up to ₹2,00,000 per year on home loan interest payments under Section 24(b) for a self-occupied property. In addition, principal repayments qualify under Section 80C up to ₹1,50,000. These deductions can significantly lower your taxable income if you have a sizable home loan."
    },
    {
      question: "Can I switch between New and Old Tax Regimes every year?",
      answer: "Salaried individuals with no business income can switch between the New and Old Tax Regimes every financial year when filing their ITR. Individuals with business or professional income can only switch out of the New Regime once in a lifetime."
    },
    {
      question: "What deductions are still allowed under the New Tax Regime?",
      answer: "Under the New Tax Regime, salaried taxpayers are allowed: Standard deduction of ₹75,000, employer contribution to NPS under Section 80CCD(2) up to 14% of basic salary for government and 10% for private sector employees, and transport allowance for persons with disabilities."
    },
    {
      question: "What is the Health and Education Cess?",
      answer: "A mandatory 4% Health and Education Cess is levied on the total income tax payable under both the New and Old Tax Regimes. Our BanksCart calculator automatically computes and displays the cess component."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Income Tax Calculator FY 2025-26 (AY 2026-27) - New vs Old Regime | BanksCart</title>
        <meta
          name="description"
          content="Calculate your Indian Income Tax for FY 2025-26 with BanksCart. Compare New vs Old Tax Regime, Section 80C, 80D, and 24(b) home loan deductions instantly."
        />
        <link rel="canonical" href="https://www.bankscart.com/income-tax-calculator" />
      </Helmet>

      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Calculators', path: '/calculators' },
                { label: 'Income Tax Calculator' }
              ]}
            />
          </div>

          {/* Hero Section */}
          <div className="text-center mb-8 bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#0F172A] text-white p-8 sm:p-10 rounded-2xl shadow-xl border border-slate-700/50">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 text-xs font-semibold uppercase tracking-wider text-blue-200 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> FY 2025-26 (AY 2026-27) Updated
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 tracking-tight">
              Indian Income Tax Calculator: <span className="text-amber-400">New vs Old Regime</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-6 leading-relaxed">
              Compare your exact tax liability under Section 115BAC versus the Old Regime. Factor in Standard Deduction, Section 80C, 80D, Home Loan interest, and NPS to optimize your take-home pay.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
              <div className="bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl">
                <span className="text-xs text-slate-400 block">Zero Tax Threshold</span>
                <span className="text-sm sm:text-base font-bold text-amber-400 font-mono">Up to ₹7.75 Lakh</span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl">
                <span className="text-xs text-slate-400 block">New Std Deduction</span>
                <span className="text-sm sm:text-base font-bold text-emerald-400 font-mono">₹75,000</span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl">
                <span className="text-xs text-slate-400 block">Old 80C Limit</span>
                <span className="text-sm sm:text-base font-bold text-blue-300 font-mono">₹1,50,000</span>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl">
                <span className="text-xs text-slate-400 block">Sec 24(b) Home Loan</span>
                <span className="text-sm sm:text-base font-bold text-amber-300 font-mono">Up to ₹2,00,000</span>
              </div>
            </div>
          </div>

          {/* Recommendation Banner */}
          <div className={`p-4 rounded-xl mb-8 border flex items-center justify-between flex-wrap gap-4 ${
            calculations.recommended === 'new'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : 'bg-blue-50 border-blue-200 text-blue-900'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                calculations.recommended === 'new' ? 'bg-emerald-600' : 'bg-blue-600'
              }`}>
                ✓
              </div>
              <div>
                <p className="font-bold text-base sm:text-lg">
                  {calculations.recommended === 'new'
                    ? `New Tax Regime saves you ${formatCurrency(calculations.netSavings)}!`
                    : `Old Tax Regime saves you ${formatCurrency(calculations.netSavings)} with deductions!`}
                </p>
                <p className="text-xs sm:text-sm text-slate-600">
                  {calculations.recommended === 'new'
                    ? 'Lower tax slab rates and the ₹75,000 standard deduction make the New Regime more beneficial for your profile.'
                    : 'Your high 80C, 80D, or home loan interest deductions make the Old Regime significantly more tax-efficient.'}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Recommended Mode</span>
              <span className="text-base font-extrabold uppercase px-3 py-1 bg-white rounded-lg border border-slate-300 inline-block">
                {calculations.recommended === 'new' ? 'New Tax Regime' : 'Old Tax Regime'}
              </span>
            </div>
          </div>

          {/* Main 2-Column Calculator Box */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 mb-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Form Inputs (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <Receipt className="w-5 h-5 text-[#1E3A8A]" /> Income & Deduction Details
                  </h2>
                  <span className="text-xs text-slate-500 font-medium">All figures in ₹ (INR)</span>
                </div>

                {/* Gross Annual Income */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="grossIncome" className="text-sm font-semibold text-slate-800">
                      Annual Gross Salary / Income
                    </label>
                    <div className="flex items-center">
                      <span className="text-sm text-slate-500 mr-1 font-mono">₹</span>
                      <input
                        type="number"
                        id="grossIncome"
                        value={grossIncome}
                        onChange={(e) => handleGrossIncomeChange(Number(e.target.value))}
                        className="w-36 text-right font-bold text-slate-900 bg-white border border-slate-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-[#1E3A8A] font-mono text-sm shadow-sm"
                        min="0"
                        step="50000"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="300000"
                    max="5000000"
                    step="25000"
                    value={grossIncome}
                    onChange={(e) => handleGrossIncomeChange(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono">
                    <span>₹3 Lakh</span>
                    <span>₹25 Lakh</span>
                    <span>₹50 Lakh</span>
                  </div>
                  {/* Preset quick buttons */}
                  <div className="flex flex-wrap gap-2 mt-3 pt-2 border-t border-slate-200/60">
                    {[600000, 775000, 1000000, 1500000, 2000000, 3000000].map(val => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => handleGrossIncomeChange(val)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-colors font-medium ${
                          grossIncome === val
                            ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        ₹{val / 100000}L
                      </button>
                    ))}
                  </div>
                </div>

                {/* Old Regime Deductions Group */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" /> Deductions (Applicable to Old Regime)
                    </h3>
                    <span className="text-xs text-slate-400">Section 80C, 80D, 24(b)</span>
                  </div>

                  {/* Section 80C */}
                  <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center mb-1.5">
                      <div>
                        <label className="text-sm font-semibold text-slate-800 block">Section 80C Deductions</label>
                        <span className="text-xs text-slate-500">EPF, PPF, ELSS, Life Insurance, Home Loan Principal (Max ₹1.5L)</span>
                      </div>
                      <input
                        type="number"
                        value={deductions.section80C}
                        onChange={(e) => handleDeductionChange('section80C', Number(e.target.value))}
                        className="w-32 text-right font-bold text-slate-900 bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-sm font-mono"
                        min="0"
                        max="150000"
                        step="10000"
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="150000"
                      step="5000"
                      value={deductions.section80C}
                      onChange={(e) => handleDeductionChange('section80C', Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                    />
                  </div>

                  {/* Section 80D */}
                  <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center mb-1.5">
                      <div>
                        <label className="text-sm font-semibold text-slate-800 block">Section 80D Health Insurance</label>
                        <span className="text-xs text-slate-500">Self, family & parents health mediclaim (Max ₹75k)</span>
                      </div>
                      <input
                        type="number"
                        value={deductions.section80D}
                        onChange={(e) => handleDeductionChange('section80D', Number(e.target.value))}
                        className="w-32 text-right font-bold text-slate-900 bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-sm font-mono"
                        min="0"
                        max="75000"
                        step="5000"
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="75000"
                      step="2500"
                      value={deductions.section80D}
                      onChange={(e) => handleDeductionChange('section80D', Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                    />
                  </div>

                  {/* Section 24(b) Home Loan Interest */}
                  <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center mb-1.5">
                      <div>
                        <label className="text-sm font-semibold text-slate-800 block">Section 24(b) Home Loan Interest</label>
                        <span className="text-xs text-slate-500">Interest paid on housing loan for self-occupied property (Max ₹2L)</span>
                      </div>
                      <input
                        type="number"
                        value={deductions.section24b}
                        onChange={(e) => handleDeductionChange('section24b', Number(e.target.value))}
                        className="w-32 text-right font-bold text-slate-900 bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-sm font-mono"
                        min="0"
                        max="200000"
                        step="10000"
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="200000"
                      step="5000"
                      value={deductions.section24b}
                      onChange={(e) => handleDeductionChange('section24b', Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                    />
                  </div>

                  {/* Section 80CCD(1B) NPS */}
                  <div className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-center mb-1.5">
                      <div>
                        <label className="text-sm font-semibold text-slate-800 block">Section 80CCD(1B) NPS</label>
                        <span className="text-xs text-slate-500">Additional voluntary National Pension System contribution (Max ₹50k)</span>
                      </div>
                      <input
                        type="number"
                        value={deductions.nps80CCD}
                        onChange={(e) => handleDeductionChange('nps80CCD', Number(e.target.value))}
                        className="w-32 text-right font-bold text-slate-900 bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-sm font-mono"
                        min="0"
                        max="50000"
                        step="5000"
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="2500"
                      value={deductions.nps80CCD}
                      onChange={(e) => handleDeductionChange('nps80CCD', Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Comparative Results Card (5 cols) */}
              <div className="lg:col-span-5 bg-[#0F172A] text-white rounded-2xl p-6 sm:p-7 shadow-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block">Comparison Analysis</span>
                      <h3 className="text-lg font-bold text-white">FY 2025-26 Tax Payable</h3>
                    </div>
                    <span className="text-xs px-2.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full font-bold">
                      {calculations.recommended === 'new' ? 'New Regime Wins' : 'Old Regime Wins'}
                    </span>
                  </div>

                  {/* Dual Summary Row */}
                  <div className="grid grid-cols-2 gap-3 my-5">
                    {/* New Regime Card */}
                    <div className={`p-4 rounded-xl border ${
                      calculations.recommended === 'new'
                        ? 'bg-blue-950/70 border-blue-500/80 shadow-md ring-1 ring-blue-500'
                        : 'bg-slate-800/60 border-slate-700/60'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-300 font-semibold uppercase">New Regime</span>
                        {calculations.recommended === 'new' && (
                          <span className="text-[10px] bg-emerald-500 text-slate-950 font-bold px-1.5 py-0.5 rounded">BEST</span>
                        )}
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
                        {formatCurrency(calculations.newTotalTax)}
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Net Take-home: {formatCurrency(calculations.newTakeHome)}
                      </span>
                    </div>

                    {/* Old Regime Card */}
                    <div className={`p-4 rounded-xl border ${
                      calculations.recommended === 'old'
                        ? 'bg-blue-950/70 border-blue-500/80 shadow-md ring-1 ring-blue-500'
                        : 'bg-slate-800/60 border-slate-700/60'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-300 font-semibold uppercase">Old Regime</span>
                        {calculations.recommended === 'old' && (
                          <span className="text-[10px] bg-emerald-500 text-slate-950 font-bold px-1.5 py-0.5 rounded">BEST</span>
                        )}
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tabular-nums">
                        {formatCurrency(calculations.oldTotalTax)}
                      </div>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Net Take-home: {formatCurrency(calculations.oldTakeHome)}
                      </span>
                    </div>
                  </div>

                  {/* Breakdown Table */}
                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex justify-between items-center bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl">
                      <span className="text-slate-300">Gross Annual Salary</span>
                      <span className="font-bold text-white font-mono">{formatCurrency(grossIncome)}</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl">
                      <span className="text-slate-300">Standard Deduction</span>
                      <span className="font-bold text-white font-mono">
                        New: ₹75,000 | Old: ₹50,000
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl">
                      <span className="text-slate-300">Old Total Deductions</span>
                      <span className="font-bold text-emerald-400 font-mono">
                        {formatCurrency(calculations.totalOldDeductions)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl">
                      <span className="text-slate-300">Net Taxable Income</span>
                      <span className="font-bold text-white font-mono">
                        New: {formatCurrency(calculations.newTaxableIncome)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-800/80 border border-slate-700/60 p-3 rounded-xl">
                      <span className="text-slate-300">Estimated Annual Tax Difference</span>
                      <span className="font-bold text-amber-400 font-mono">
                        {formatCurrency(calculations.netSavings)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 mt-6">
                  <a
                    href="/loans/home-loan"
                    className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl text-center shadow-lg transition-all"
                  >
                    Save Tax with a Home Loan <ArrowRight className="w-4 h-4" />
                  </a>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    Claim up to ₹2 Lakh interest deduction under Section 24(b).
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Slabs Comparison Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 mb-10">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Calculator className="w-6 h-6 text-[#1E3A8A]" /> FY 2025-26 Tax Slab Slabs Reference
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* New Regime Slabs */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-[#0F172A] text-white p-3.5 font-bold text-sm flex justify-between items-center">
                  <span>New Tax Regime (Section 115BAC)</span>
                  <span className="text-xs bg-emerald-500 text-slate-950 px-2 py-0.5 rounded font-bold">Default</span>
                </div>
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold">
                    <tr>
                      <th className="p-3">Income Slab</th>
                      <th className="p-3 text-right">Tax Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    <tr><td className="p-3 text-slate-700">₹0 to ₹3,00,000</td><td className="p-3 text-right font-bold text-slate-900">Nil</td></tr>
                    <tr><td className="p-3 text-slate-700">₹3,00,001 to ₹7,00,000</td><td className="p-3 text-right font-bold text-slate-900">5%</td></tr>
                    <tr><td className="p-3 text-slate-700">₹7,00,001 to ₹10,00,000</td><td className="p-3 text-right font-bold text-slate-900">10%</td></tr>
                    <tr><td className="p-3 text-slate-700">₹10,00,001 to ₹12,00,000</td><td className="p-3 text-right font-bold text-slate-900">15%</td></tr>
                    <tr><td className="p-3 text-slate-700">₹12,00,001 to ₹15,00,000</td><td className="p-3 text-right font-bold text-slate-900">20%</td></tr>
                    <tr><td className="p-3 text-slate-700">Above ₹15,00,000</td><td className="p-3 text-right font-bold text-slate-900">30%</td></tr>
                  </tbody>
                </table>
              </div>

              {/* Old Regime Slabs */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-[#1E3A8A] text-white p-3.5 font-bold text-sm flex justify-between items-center">
                  <span>Old Tax Regime (With Deductions)</span>
                  <span className="text-xs bg-blue-300 text-blue-950 px-2 py-0.5 rounded font-bold">Optional</span>
                </div>
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 font-semibold">
                    <tr>
                      <th className="p-3">Income Slab</th>
                      <th className="p-3 text-right">Tax Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    <tr><td className="p-3 text-slate-700">₹0 to ₹2,50,000</td><td className="p-3 text-right font-bold text-slate-900">Nil</td></tr>
                    <tr><td className="p-3 text-slate-700">₹2,50,001 to ₹5,00,000</td><td className="p-3 text-right font-bold text-slate-900">5%</td></tr>
                    <tr><td className="p-3 text-slate-700">₹5,00,001 to ₹10,00,000</td><td className="p-3 text-right font-bold text-slate-900">20%</td></tr>
                    <tr><td className="p-3 text-slate-700">Above ₹10,00,000</td><td className="p-3 text-right font-bold text-slate-900">30%</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Why Calculate with BanksCart */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">
              Why Calculate Your Taxes on BanksCart?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-50 text-[#1E3A8A] rounded-xl flex items-center justify-center font-bold mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Updated Union Budget Rules</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Incorporates the revised ₹75,000 standard deduction and Section 87A rebate rules for FY 2025-26.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center font-bold mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Precision Deductions</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Accurately checks limits across Section 80C, 80D health insurance, and 24(b) home loans.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center font-bold mb-4">
                  <PieChart className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Automated Savings Advice</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Instantly flags whether you will save more money switching to the New or sticking to the Old Regime.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center font-bold mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Home Loan Tax Optimization</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Connect your tax planning with top home loans to claim maximum tax relief under Indian IT rules.
                </p>
              </div>
            </div>
          </div>

          {/* FAQs Accordion */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm mb-10">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-[#1E3A8A]" /> Frequently Asked Questions on Indian Income Tax
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFAQIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFAQIndex(isOpen ? null : idx)}
                      className="w-full flex justify-between items-center p-4 text-left font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
                    >
                      <span className="pr-4">{faq.question}</span>
                      <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? 'rotate-180 text-[#1E3A8A]' : ''
                      }`} />
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center p-8 sm:p-10 bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#0F172A] text-white rounded-2xl shadow-xl border border-slate-700/50">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Ready to Maximize Your Tax Savings & Wealth?
            </h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto text-sm sm:text-base">
              Explore BanksCart's low-interest home loans, ELSS mutual funds, and fixed deposits to optimize your wealth portfolio today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/loans/home-loan"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-8 py-3.5 rounded-xl font-bold text-base shadow-lg transition-all"
              >
                Explore Home Loans
              </a>
              <a
                href="/calculators"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold text-base shadow-lg transition-all"
              >
                All Calculators Hub
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default IncomeTaxCalculator;
