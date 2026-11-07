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
  PiggyBank,
  Lock,
  ExternalLink
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { formatCurrency } from '../utils/calculations';

interface PPFPageProps {
  openApplyModal?: (loanType?: string) => void;
}

export default function PPFPage({ openApplyModal }: PPFPageProps) {
  // Calculator inputs
  const [contributionMode, setContributionMode] = useState<'yearly' | 'monthly'>('yearly');
  const [depositAmount, setDepositAmount] = useState<number>(150000);
  const [tenureYears, setTenureYears] = useState<number>(15);
  const [depositTiming, setDepositTiming] = useState<'before-5th' | 'after-5th'>('before-5th');

  // Official Current PPF Interest Rate (Ministry of Finance)
  const PPF_ANNUAL_RATE = 7.1;

  // Maximum and minimum deposit boundaries
  const maxDeposit = contributionMode === 'yearly' ? 150000 : 12500;
  const minDeposit = contributionMode === 'yearly' ? 500 : 500;

  // Exact PPF Compounding Calculation & Year-by-Year Schedule
  const calculationResults = useMemo(() => {
    const rate = PPF_ANNUAL_RATE / 100;
    const schedule: Array<{
      year: number;
      openingBalance: number;
      deposit: number;
      interestEarned: number;
      closingBalance: number;
      loanAvailable: number;
      withdrawalAvailable: number;
    }> = [];

    let currentBalance = 0;
    let totalInvested = 0;

    for (let yr = 1; yr <= tenureYears; yr++) {
      const opening = currentBalance;
      let annualDeposit = 0;
      let interestForYear = 0;

      if (contributionMode === 'yearly') {
        annualDeposit = depositAmount;
        totalInvested += annualDeposit;

        // If deposited on or before 5th of April, interest is earned for full 12 months
        if (depositTiming === 'before-5th') {
          interestForYear = Math.round((opening + annualDeposit) * rate);
        } else {
          // If deposited after 5th of April, interest is earned on opening balance for full year, and deposit earns for 11 months
          interestForYear = Math.round(opening * rate + annualDeposit * (rate * (11 / 12)));
        }
      } else {
        // Monthly deposit
        const monthly = depositAmount;
        annualDeposit = monthly * 12;
        totalInvested += annualDeposit;

        if (depositTiming === 'before-5th') {
          // Monthly deposit on or before 5th of each month
          // Balance at start of month i earns interest for (13 - i) months
          let monthlyInterestSum = 0;
          let runningMonthBal = opening;
          for (let m = 1; m <= 12; m++) {
            runningMonthBal += monthly;
            monthlyInterestSum += runningMonthBal * (rate / 12);
          }
          interestForYear = Math.round(monthlyInterestSum);
        } else {
          // Deposited after 5th: each month's deposit earns interest from next month
          let monthlyInterestSum = 0;
          let runningMonthBal = opening;
          for (let m = 1; m <= 12; m++) {
            monthlyInterestSum += runningMonthBal * (rate / 12);
            runningMonthBal += monthly;
          }
          interestForYear = Math.round(monthlyInterestSum);
        }
      }

      currentBalance = opening + annualDeposit + interestForYear;

      // Loan Facility: Available from Year 3 to 6
      // Up to 25% of balance at the end of the second preceding year
      let loanAllowed = 0;
      if (yr >= 3 && yr <= 6 && yr - 3 >= 0 && schedule[yr - 3]) {
        loanAllowed = Math.round(schedule[yr - 3].closingBalance * 0.25);
      }

      // Partial Withdrawal: Available from Year 7 onwards
      // Up to 50% of balance at the end of 4th preceding year or previous year, whichever is lower
      let withdrawalAllowed = 0;
      if (yr >= 7) {
        const bal4thPreceding = yr - 5 >= 0 && schedule[yr - 5] ? schedule[yr - 5].closingBalance : 0;
        const balPreceding = schedule[yr - 2] ? schedule[yr - 2].closingBalance : 0;
        withdrawalAllowed = Math.round(Math.min(bal4thPreceding, balPreceding) * 0.5);
      }

      schedule.push({
        year: yr,
        openingBalance: Math.round(opening),
        deposit: Math.round(annualDeposit),
        interestEarned: interestForYear,
        closingBalance: Math.round(currentBalance),
        loanAvailable: loanAllowed,
        withdrawalAvailable: withdrawalAllowed
      });
    }

    const totalInterest = currentBalance - totalInvested;
    // Section 80C tax saved (assuming highest 30% slab on max ₹1.5L annual deposit)
    const annualCapped = Math.min(contributionMode === 'yearly' ? depositAmount : depositAmount * 12, 150000);
    const taxSavedPerYear = annualCapped * 0.312; // 30% + 4% cess
    const totalTaxSaved = taxSavedPerYear * tenureYears;

    return {
      totalInvested: Math.round(totalInvested),
      totalInterest: Math.round(totalInterest),
      maturityCorpus: Math.round(currentBalance),
      totalTaxSaved: Math.round(totalTaxSaved),
      schedule
    };
  }, [contributionMode, depositAmount, tenureYears, depositTiming]);

  // Schema.org Structured Data
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FinancialProduct',
        name: 'Public Provident Fund (PPF)',
        provider: {
          '@type': 'GovernmentOrganization',
          name: 'Ministry of Finance, Government of India'
        },
        interestRate: 7.1,
        annualPercentageRate: 7.1,
        description:
          'Sovereign-backed small savings scheme in India offering 7.1% per annum compound interest with EEE tax exemption under Section 80C.',
        url: 'https://www.bankscart.com/resources/ppf'
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
            name: 'PPF Calculator & Scheme Directory',
            item: 'https://www.bankscart.com/resources/ppf'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the current PPF interest rate in 2026?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The official PPF interest rate is 7.1% per annum, compounded annually and backed by a 100% sovereign guarantee from the Ministry of Finance, Government of India.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the EEE tax status of PPF?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'PPF enjoys Exempt-Exempt-Exempt (EEE) status: (1) Investment up to ₹1.5 Lakhs per year is tax-deductible under Section 80C; (2) Annual interest accrued is 100% tax-free; (3) The entire lump sum maturity corpus is completely tax-free under Section 10(11).'
            }
          },
          {
            '@type': 'Question',
            name: 'Can I take a loan against my PPF balance?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! You can avail a loan against your PPF account from the 3rd to the 6th financial year. The loan amount can be up to 25% of the balance at the end of the second preceding financial year, charged at an interest rate of 1% per annum above the prevailing PPF rate (effectively 8.1% p.a.).'
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Helmet>
        <title>Public Provident Fund (PPF) Calculator & Scheme Directory (2026) | BanksCart</title>
        <meta
          name="description"
          content="Calculate PPF compound interest at 7.1% p.a., simulate year-by-year maturity corpus up to 30 years, check loan-against-PPF limits, and maximize Section 80C EEE tax savings."
        />
        <link rel="canonical" href="https://www.bankscart.com/resources/ppf" />
        <meta property="og:title" content="PPF Calculator & Complete Scheme Directory - BanksCart" />
        <meta
          property="og:description"
          content="Accurate compound interest calculation, partial withdrawal tables, loan facility, and comparison with ELSS and FDs."
        />
        <meta property="og:url" content="https://www.bankscart.com/resources/ppf" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Resources', path: '/resources' },
            { label: 'PPF Calculator' }
          ]}
        />

        {/* Executive Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              Government of India • Ministry of Finance Sovereign Guarantee
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Public Provident Fund (PPF) Scheme & Calculator
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              Simulate guaranteed compound maturity returns at the official <strong>7.1% p.a.</strong> interest rate.
              Review year-by-year withdrawal ceilings, loan entitlements, and Section 80C Exempt-Exempt-Exempt (EEE) status.
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-mono font-black text-amber-400">7.10% p.a.</div>
                <div className="text-xs text-slate-300 mt-0.5">Current Rate (Compounded Yearly)</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-mono font-black text-amber-400">EEE Status</div>
                <div className="text-xs text-slate-300 mt-0.5">100% Tax-Free Deposit & Returns</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-mono font-black text-amber-400">₹500 – ₹1.5L</div>
                <div className="text-xs text-slate-300 mt-0.5">Annual Contribution Limits</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-mono font-black text-amber-400">15 to 30 Yrs</div>
                <div className="text-xs text-slate-300 mt-0.5">Tenure with 5-Year Extension Blocks</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Interactive PPF Calculation Engine */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 text-white p-6 sm:p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block mb-1">
                Compound Growth Simulator
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                Live PPF Wealth Calculator (FY 2025–26 & FY 2026–27)
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-0.5">
                Calculates compound interest using official India Post & bank compounding rules.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold self-start md:self-auto">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Sovereign Safety
            </span>
          </div>

          <div className="p-6 sm:p-10 space-y-8">
            {/* Input Controls */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Sliders & Controls */}
              <div className="space-y-6 bg-slate-50 p-6 rounded-2xl border border-slate-200">
                {/* Contribution Mode Toggle */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Contribution Frequency
                  </label>
                  <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-200/80 rounded-xl">
                    <button
                      type="button"
                      onClick={() => {
                        setContributionMode('yearly');
                        setDepositAmount(150000);
                      }}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                        contributionMode === 'yearly'
                          ? 'bg-blue-900 text-white shadow-sm'
                          : 'text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      Yearly Lump Sum (₹500 – ₹1.5L)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setContributionMode('monthly');
                        setDepositAmount(12500);
                      }}
                      className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                        contributionMode === 'monthly'
                          ? 'bg-blue-900 text-white shadow-sm'
                          : 'text-slate-700 hover:text-slate-900'
                      }`}
                    >
                      Monthly Deposit (₹500 – ₹12.5k)
                    </button>
                  </div>
                </div>

                {/* Deposit Amount Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      {contributionMode === 'yearly' ? 'Annual Contribution' : 'Monthly Contribution'}
                    </label>
                    <span className="font-mono font-black text-blue-900 text-lg">
                      {formatCurrency(depositAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={minDeposit}
                    max={maxDeposit}
                    step={contributionMode === 'yearly' ? 500 : 100}
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(Number(e.target.value))}
                    className="w-full accent-blue-900 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>{formatCurrency(minDeposit)}</span>
                    <span>{formatCurrency(maxDeposit / 2)}</span>
                    <span>{formatCurrency(maxDeposit)}</span>
                  </div>
                </div>

                {/* Tenure Selector */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Investment Tenure (Base 15 Years + 5-Year Extension Blocks)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 20, 25, 30].map((yrs) => (
                      <button
                        key={yrs}
                        type="button"
                        onClick={() => setTenureYears(yrs)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all ${
                          tenureYears === yrs
                            ? 'bg-blue-900 text-white shadow-sm ring-2 ring-blue-500/20'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {yrs} Years {yrs > 15 ? `(+${yrs - 15})` : ''}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Deposit Timing */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Deposit Date within Month / Year
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDepositTiming('before-5th')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        depositTiming === 'before-5th'
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">On or Before 5th of Month</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Earns interest for full month</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDepositTiming('after-5th')}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        depositTiming === 'after-5th'
                          ? 'bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-500/20'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold">After 5th of Month</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Interest starts next month</div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Column: Live Output Cards */}
              <div className="space-y-4 flex flex-col justify-between">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-900 via-indigo-950 to-slate-900 text-white shadow-xl space-y-6">
                  <div>
                    <span className="text-xs uppercase font-bold tracking-wider text-amber-400">
                      Maturity Value ({tenureYears} Years @ 7.1%)
                    </span>
                    <div className="text-3xl sm:text-5xl font-mono font-black text-white mt-1 tabular-nums">
                      {formatCurrency(calculationResults.maturityCorpus)}
                    </div>
                    <div className="text-xs text-slate-300 mt-1">
                      100% Tax-Free under Section 10(11) of Income Tax Act
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div>
                      <span className="text-xs text-slate-300 font-medium block">Total Deposit</span>
                      <span className="text-xl font-mono font-bold text-amber-300 mt-0.5 block tabular-nums">
                        {formatCurrency(calculationResults.totalInvested)}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-slate-300 font-medium block">Total Interest Earned</span>
                      <span className="text-xl font-mono font-bold text-emerald-400 mt-0.5 block tabular-nums">
                        {formatCurrency(calculationResults.totalInterest)}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">Estimated 80C Tax Savings:</span>
                      <span className="text-slate-300 text-[11px]">Across {tenureYears} years in 30% slab</span>
                    </div>
                    <span className="text-base font-mono font-bold text-emerald-300">
                      {formatCurrency(calculationResults.totalTaxSaved)}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong>Compounding Pro-Tip:</strong> Always deposit your annual PPF contribution between <strong>April 1st and April 5th</strong>. This ensures your deposit earns compound interest for the entire 12 months of the financial year, adding tens of thousands of rupees to your final maturity corpus.
                  </div>
                </div>
              </div>
            </div>

            {/* Year-by-Year Growth Amortization Table */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  Year-by-Year Amortization Schedule & Entitlements
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  Showing complete {tenureYears}-year compounding projection
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/80 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Financial Year</th>
                      <th className="py-3 px-4">Opening Bal (₹)</th>
                      <th className="py-3 px-4">Deposit (₹)</th>
                      <th className="py-3 px-4">Interest Earned (₹)</th>
                      <th className="py-3 px-4">Closing Bal (₹)</th>
                      <th className="py-3 px-4">Loan Eligibility (₹)</th>
                      <th className="py-3 px-4">Withdrawal Limit (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                    {calculationResults.schedule.map((row) => (
                      <tr key={row.year} className="hover:bg-blue-50/50 transition-colors">
                        <td className="py-2.5 px-4 font-bold text-slate-900 font-sans">
                          Year {row.year}
                        </td>
                        <td className="py-2.5 px-4 tabular-nums">{row.openingBalance.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-4 text-blue-900 font-bold tabular-nums">
                          {row.deposit.toLocaleString('en-IN')}
                        </td>
                        <td className="py-2.5 px-4 text-emerald-700 font-bold tabular-nums">
                          +{row.interestEarned.toLocaleString('en-IN')}
                        </td>
                        <td className="py-2.5 px-4 font-bold text-slate-900 tabular-nums">
                          {row.closingBalance.toLocaleString('en-IN')}
                        </td>
                        <td className="py-2.5 px-4">
                          {row.loanAvailable > 0 ? (
                            <span className="text-amber-800 font-semibold tabular-nums">
                              {row.loanAvailable.toLocaleString('en-IN')}
                            </span>
                          ) : (
                            <span className="text-slate-400 font-sans text-[11px]">—</span>
                          )}
                        </td>
                        <td className="py-2.5 px-4">
                          {row.withdrawalAvailable > 0 ? (
                            <span className="text-purple-800 font-semibold tabular-nums">
                              {row.withdrawalAvailable.toLocaleString('en-IN')}
                            </span>
                          ) : (
                            <span className="text-slate-400 font-sans text-[11px]">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Head-to-Head Comparison Table: PPF vs Alternatives */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              Investment Alternatives
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              PPF vs Other Tax-Saving Investment Instruments
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Compare returns, liquidity, risk levels, and sovereign backing across popular Section 80C options.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Scheme</th>
                  <th className="py-3 px-4">Expected Returns</th>
                  <th className="py-3 px-4">Lock-in Period</th>
                  <th className="py-3 px-4">Risk Profile</th>
                  <th className="py-3 px-4">Tax Status</th>
                  <th className="py-3 px-4">Sovereign Backing</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="bg-blue-50/60 font-semibold">
                  <td className="py-3 px-4 font-bold text-blue-900">Public Provident Fund (PPF)</td>
                  <td className="py-3 px-4 text-emerald-700 font-mono font-bold">7.10% Fixed</td>
                  <td className="py-3 px-4">15 Years</td>
                  <td className="py-3 px-4">Zero Risk</td>
                  <td className="py-3 px-4 text-emerald-800 font-bold">EEE (100% Tax-Free)</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">100% Sovereign</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">ELSS Mutual Funds</td>
                  <td className="py-3 px-4 font-mono">12% – 15% (Market Linked)</td>
                  <td className="py-3 px-4">3 Years</td>
                  <td className="py-3 px-4">High (Equity)</td>
                  <td className="py-3 px-4">LTCG Tax @ 12.5%</td>
                  <td className="py-3 px-4 text-slate-400">None (Market)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">5-Year Bank Tax Saver FD</td>
                  <td className="py-3 px-4 font-mono">6.50% – 7.25% Fixed</td>
                  <td className="py-3 px-4">5 Years</td>
                  <td className="py-3 px-4">Low</td>
                  <td className="py-3 px-4">Interest is Taxable</td>
                  <td className="py-3 px-4">DICGC up to ₹5L</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">Sukanya Samriddhi Yojana (SSY)</td>
                  <td className="py-3 px-4 text-emerald-700 font-mono font-bold">8.20% Fixed</td>
                  <td className="py-3 px-4">21 Yrs (Girl Child)</td>
                  <td className="py-3 px-4">Zero Risk</td>
                  <td className="py-3 px-4 text-emerald-800 font-bold">EEE (100% Tax-Free)</td>
                  <td className="py-3 px-4 text-emerald-700 font-bold">100% Sovereign</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-slate-900">National Pension Scheme (NPS)</td>
                  <td className="py-3 px-4 font-mono">9% – 12% (Market Linked)</td>
                  <td className="py-3 px-4">Till Age 60</td>
                  <td className="py-3 px-4">Moderate</td>
                  <td className="py-3 px-4">60% Tax-Free, 40% Annuity</td>
                  <td className="py-3 px-4 text-blue-700">PFRDA Regulated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Open a PPF Account Online */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              Account Activation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How to Open a PPF Account Online via Top Banks
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Authorized public and private sector banks offer instantaneous online PPF account opening via netbanking and mobile apps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                bank: 'State Bank of India (SBI)',
                steps: 'Log in to SBI YONO or Netbanking > e-Services > Open PPF Account. Instant authorization via Aadhaar OTP.',
                icon: Landmark
              },
              {
                bank: 'HDFC Bank',
                steps: 'Open NetBanking > Accounts > Public Provident Fund > Apply Online. Transfer funds instantly from savings.',
                icon: Building
              },
              {
                bank: 'ICICI Bank',
                steps: 'Log in to iMobile Pay > Invest & Insure > PPF Account. Link Aadhaar for immediate electronic account passbook.',
                icon: PiggyBank
              },
              {
                bank: 'Punjab National Bank (PNB)',
                steps: 'PNB ONE App > Services > Government Schemes > PPF. Available for both existing customers and minors.',
                icon: Landmark
              },
              {
                bank: 'Axis Bank',
                steps: 'Axis Mobile App > Explore Products > Investments > PPF. Set up auto-debit standing instruction before 5th.',
                icon: Building
              },
              {
                bank: 'India Post Office',
                steps: 'Visit local Head/Sub Post Office or use India Post Payments Bank (IPPB) App for seamless mobile deposits.',
                icon: ShieldCheck
              }
            ].map((b, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                  <b.icon className="w-4 h-4 shrink-0" />
                  <span>{b.bank}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{b.steps}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Public Provident Fund (PPF) FAQ
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Clarifications on loan eligibility, 5-year extension options, and premature closure rules.
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {[
              {
                q: 'What is the maximum amount I can deposit in a PPF account per financial year?',
                a: 'The maximum statutory deposit limit is ₹1,50,000 per financial year across all accounts in your name (including accounts opened on behalf of a minor child). Deposits exceeding ₹1.5 Lakhs will not earn any interest and are not eligible for Section 80C tax deduction.'
              },
              {
                q: 'Can a PPF account be extended beyond the 15-year maturity period?',
                a: 'Yes! After 15 years, you can extend your PPF account indefinitely in blocks of 5 years. You have two options: (1) Extension with contributions (continue depositing up to ₹1.5L/year for 80C deduction); or (2) Extension without contributions (your full corpus continues earning 7.1% tax-free interest, and you are allowed one withdrawal per financial year).'
              },
              {
                q: 'How does the loan against PPF facility operate?',
                a: 'You can apply for a loan against your PPF balance between the 3rd and 6th financial year. The loan amount is capped at 25% of the credit balance at the end of the second preceding financial year. Interest is charged at only 1% p.a. above the prevailing PPF rate (effectively 8.1% p.a.), repayable in 36 monthly installments.'
              },
              {
                q: 'Can NRIs open a new PPF account?',
                a: 'No. Non-Resident Indians (NRIs) cannot open a new PPF account. However, if a resident Indian opened a PPF account and subsequently became an NRI, the account can continue earning interest until its original 15-year maturity on a non-repatriation basis, but cannot be extended further.'
              },
              {
                q: 'Can a PPF account be attached by courts for loan or debt recovery?',
                a: 'No! Under Section 15 of the Government Savings Promotion Act, a PPF account cannot be attached by any court of law in respect of any debt or liability incurred by the account holder. This offers unique wealth protection for entrepreneurs and professionals.'
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
