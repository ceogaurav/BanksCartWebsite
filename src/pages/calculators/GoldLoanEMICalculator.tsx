import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Coins, Calculator, TrendingUp, ShieldCheck, CheckCircle, ArrowRight, HelpCircle, Info, Landmark } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';

const GoldLoanEMICalculator: React.FC = () => {
  // Calculation inputs
  const [calcMode, setCalcMode] = useState<'amount' | 'weight'>('amount');
  const [loanAmount, setLoanAmount] = useState<number>(300000);
  const [goldWeight, setGoldWeight] = useState<number>(60); // in grams
  const [carat, setCarat] = useState<number>(22); // 18, 22, 24
  const [interestRate, setInterestRate] = useState<number>(9.5); // % p.a.
  const [tenureMonths, setTenureMonths] = useState<number>(12); // months
  const [repaymentScheme, setRepaymentScheme] = useState<'emi' | 'bullet' | 'interest_only'>('emi');

  // Benchmark Gold Market Price per gram (2026 benchmark)
  const goldPricePerGram = useMemo(() => {
    switch (carat) {
      case 24: return 7800;
      case 22: return 7150;
      case 18: return 5850;
      default: return 7150;
    }
  }, [carat]);

  // Max LTV allowed by RBI is 75%
  const maxLtvPerGram = Math.round(goldPricePerGram * 0.75);

  // Computed Loan Principal
  const principal = useMemo(() => {
    if (calcMode === 'weight') {
      return goldWeight * maxLtvPerGram;
    }
    return loanAmount;
  }, [calcMode, goldWeight, maxLtvPerGram, loanAmount]);

  // Required Gold Weight when amount mode is selected
  const requiredWeight = useMemo(() => {
    return Math.ceil(loanAmount / maxLtvPerGram);
  }, [loanAmount, maxLtvPerGram]);

  // EMI & Interest Calculations
  const { monthlyEmi, totalInterest, totalAmount } = useMemo(() => {
    const P = principal;
    const r = interestRate / (12 * 100);
    const n = tenureMonths;

    if (repaymentScheme === 'emi') {
      const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = emi * n;
      const interest = total - P;
      return {
        monthlyEmi: Math.round(emi),
        totalInterest: Math.round(interest),
        totalAmount: Math.round(total)
      };
    } else if (repaymentScheme === 'interest_only') {
      const monthlyInt = Math.round(P * r);
      const interest = monthlyInt * n;
      return {
        monthlyEmi: monthlyInt,
        totalInterest: interest,
        totalAmount: P + interest
      };
    } else {
      // Bullet Repayment: simple interest accrued monthly, paid at maturity
      const interest = Math.round(P * (interestRate / 100) * (n / 12));
      return {
        monthlyEmi: 0,
        totalInterest: interest,
        totalAmount: P + interest
      };
    }
  }, [principal, interestRate, tenureMonths, repaymentScheme]);

  const lenders = [
    { name: 'State Bank of India (SBI)', rate: '8.75% - 9.80%', ltv: 'Up to 75%', fee: '0.25% (Min ₹250)', tenure: '36 Months' },
    { name: 'Muthoot Finance', rate: '9.90% onwards', ltv: 'Up to 75%', fee: '0.25% - 1.00%', tenure: '36 Months' },
    { name: 'HDFC Bank Gold Loan', rate: '9.30% - 16.00%', ltv: 'Up to 75%', fee: '1.00% + GST', tenure: '24 Months' },
    { name: 'Manappuram Finance', rate: '9.90% onwards', ltv: 'Up to 75%', fee: '₹10 - 1.50%', tenure: '12 Months' },
    { name: 'ICICI Bank Gold Loan', rate: '9.15% - 15.50%', ltv: 'Up to 75%', fee: '1.00% + GST', tenure: '12 Months' },
    { name: 'Axis Bank Gold Loan', rate: '9.25% - 14.50%', ltv: 'Up to 75%', fee: '0.75% + GST', tenure: '36 Months' }
  ];

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      <Helmet>
        <title>Gold Loan EMI Calculator 2026: Calculate Gold Loan Rate &amp; Per Gram Value | BanksCart</title>
        <meta name="description" content="Free Gold Loan EMI Calculator 2026. Calculate per-gram gold loan eligibility, monthly EMI, LTV limit (75% RBI cap), and compare gold loan rates from SBI, Muthoot, and HDFC." />
        <link rel="canonical" href="https://www.bankscart.com/gold-loan-emi-calculator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialProduct",
            "name": "Gold Loan EMI Calculator",
            "description": "Calculate gold loan per gram valuation, monthly EMI, interest rates, and loan-to-value limits under RBI guidelines.",
            "url": "https://www.bankscart.com/gold-loan-emi-calculator",
            "annualPercentageRate": {
              "@type": "QuantitativeValue",
              "minValue": 8.75,
              "maxValue": 18.0,
              "unitText": "%"
            },
            "feesAndCommissionsSpecification": "Processing fee 0.25% to 1.50% + GST. Valuation charges may apply.",
            "eligibleRegion": {
              "@type": "Country",
              "name": "India"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How is gold loan EMI calculated in India?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Gold loan EMI is calculated using standard reducing balance interest or bullet repayment options based on the RBI-approved Loan-to-Value (LTV) ratio of up to 75% of market gold value."
                }
              },
              {
                "@type": "Question",
                "name": "What is the maximum loan amount per gram of gold in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "For 22 Karat gold, lenders offer approximately ₹5,300 to ₹5,850 per gram in 2026, strictly adhering to the 75% RBI statutory LTV ceiling."
                }
              },
              {
                "@type": "Question",
                "name": "Which bank or NBFC offers the lowest gold loan interest rate?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Public sector banks like SBI offer starting rates from 8.75% p.a., while specialized gold NBFCs like Muthoot Finance and Manappuram provide fast 30-minute disbursal starting from 9.90% p.a."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Accessible Clickable Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <Breadcrumb path={["Home", "Calculators", "Gold Loan EMI Calculator"]} />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Hero Headline */}
        <section className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200">
            <Coins className="w-3.5 h-3.5 mr-1.5 text-amber-600" /> 2026 Edition: RBI 75% LTV Compliant
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Gold Loan EMI Calculator
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Instantly evaluate your per-gram loan eligibility, simulate monthly interest repayments, and contrast competitive gold loan schemes across 15+ top Indian banks and NBFCs.
          </p>
        </section>

        {/* Interactive Calculator Container */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Mode Switcher */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl">
              <button
                type="button"
                onClick={() => setCalcMode('amount')}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  calcMode === 'amount'
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Calculate by Loan Amount
              </button>
              <button
                type="button"
                onClick={() => setCalcMode('weight')}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all ${
                  calcMode === 'weight'
                    ? 'bg-white text-blue-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Calculate by Gold Weight (g)
              </button>
            </div>

            {/* Input 1: Amount or Weight */}
            {calcMode === 'amount' ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-medium">
                  <label htmlFor="loanAmount" className="text-slate-700">Desired Loan Amount</label>
                  <span className="text-lg font-bold text-blue-900">₹{formatINR(loanAmount)}</span>
                </div>
                <input
                  id="loanAmount"
                  type="range"
                  min="20000"
                  max="5000000"
                  step="10000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>₹20,000</span>
                  <span>₹25 Lakhs</span>
                  <span>₹50 Lakhs</span>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-medium">
                  <label htmlFor="goldWeight" className="text-slate-700">Net Gold Weight (Grams)</label>
                  <span className="text-lg font-bold text-amber-700">{goldWeight} g</span>
                </div>
                <input
                  id="goldWeight"
                  type="range"
                  min="5"
                  max="500"
                  step="1"
                  value={goldWeight}
                  onChange={(e) => setGoldWeight(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>5 g</span>
                  <span>250 g</span>
                  <span>500 g</span>
                </div>
              </div>
            )}

            {/* Gold Carat Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 block">Gold Purity (Carat)</label>
              <div className="grid grid-cols-3 gap-3">
                {[18, 22, 24].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCarat(c)}
                    className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                      carat === c
                        ? 'border-amber-500 bg-amber-50/70 text-amber-900 shadow-sm'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {c} Karat ({c === 24 ? '99.9%' : c === 22 ? '91.6%' : '75.0%'})
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Current Valuation: ₹{formatINR(goldPricePerGram)}/g (Max 75% LTV: <strong>₹{formatINR(maxLtvPerGram)}/g</strong>)
              </p>
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <label htmlFor="interestRate" className="text-slate-700">Interest Rate (% p.a.)</label>
                <span className="text-lg font-bold text-blue-900">{interestRate}%</span>
              </div>
              <input
                id="interestRate"
                type="range"
                min="7.5"
                max="18.0"
                step="0.1"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>7.5% (PSU Banks)</span>
                <span>12.0%</span>
                <span>18.0% (Fast NBFC)</span>
              </div>
            </div>

            {/* Tenure */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-medium">
                <label htmlFor="tenureMonths" className="text-slate-700">Loan Tenure</label>
                <span className="text-lg font-bold text-blue-900">{tenureMonths} Months</span>
              </div>
              <input
                id="tenureMonths"
                type="range"
                min="3"
                max="36"
                step="1"
                value={tenureMonths}
                onChange={(e) => setTenureMonths(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>3 Months</span>
                <span>12 Months (Standard)</span>
                <span>36 Months</span>
              </div>
            </div>

            {/* Repayment Scheme */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 block">Repayment Mechanism</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: 'emi', label: 'Monthly EMI', desc: 'Principal + Interest' },
                  { id: 'interest_only', label: 'Monthly Interest', desc: 'Principal at end' },
                  { id: 'bullet', label: 'Bullet Repayment', desc: 'Total at maturity' }
                ].map((scheme) => (
                  <button
                    key={scheme.id}
                    type="button"
                    onClick={() => setRepaymentScheme(scheme.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      repaymentScheme === scheme.id
                        ? 'border-blue-600 bg-blue-50/50 ring-1 ring-blue-600'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{scheme.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{scheme.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Summary Column (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-md">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">Loan Estimate Summary</span>
              <div className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                {repaymentScheme === 'bullet' ? '₹0' : `₹${formatINR(monthlyEmi)}`}
                <span className="text-sm font-normal text-slate-300 block mt-1">
                  {repaymentScheme === 'bullet' ? 'Accrued Monthly Interest' : 'Estimated Monthly Payment'}
                </span>
              </div>
            </div>

            <div className="space-y-3.5 border-t border-white/10 pt-4 text-xs sm:text-sm">
              <div className="flex justify-between py-1">
                <span className="text-slate-300">Sanctioned Principal:</span>
                <span className="font-bold text-white">₹{formatINR(principal)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-300">Total Interest Payable:</span>
                <span className="font-bold text-amber-300">₹{formatINR(totalInterest)}</span>
              </div>
              <div className="flex justify-between py-1 border-t border-white/10 pt-2 font-bold text-base">
                <span className="text-slate-200">Total Repayable:</span>
                <span className="text-emerald-400">₹{formatINR(totalAmount)}</span>
              </div>
              <div className="flex justify-between py-2 px-3 bg-white/5 rounded-xl border border-white/10 text-xs">
                <span className="text-slate-300">Gold Collateral Required:</span>
                <span className="font-bold text-amber-300">
                  {calcMode === 'weight' ? `${goldWeight} g (${carat}K)` : `~${requiredWeight} g (${carat}K)`}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/loans/personal-loan"
                className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-sm shadow-md transition-all group"
              >
                Apply for Gold Loan Offers
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-[11px] text-center text-slate-400 mt-2">100% digital matching. Free doorstep valuation available.</p>
            </div>
          </div>
        </div>

        {/* Live Bank Rates Comparison Table */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Top Lenders 2026</span>
              <h2 className="text-2xl font-bold text-slate-900">Top Indian Gold Loan Rates &amp; Per-Gram Limits</h2>
            </div>
            <span className="text-xs px-3 py-1 bg-green-50 text-green-700 font-semibold rounded-full border border-green-200 self-start">
              Updated November 2026
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-xs font-bold text-slate-700 uppercase">
                <tr>
                  <th className="px-6 py-3 text-left">Lender Name</th>
                  <th className="px-6 py-3 text-left">Interest Rate (p.a.)</th>
                  <th className="px-6 py-3 text-left">Max LTV Cap</th>
                  <th className="px-6 py-3 text-left">Processing Charges</th>
                  <th className="px-6 py-3 text-left">Max Tenure</th>
                  <th className="px-6 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {lenders.map((l, i) => (
                  <tr key={l.name} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-6 py-4 font-semibold text-slate-900">{l.name}</td>
                    <td className="px-6 py-4 font-bold text-blue-600">{l.rate}</td>
                    <td className="px-6 py-4 text-slate-600">{l.ltv}</td>
                    <td className="px-6 py-4 text-slate-600">{l.fee}</td>
                    <td className="px-6 py-4 text-slate-700">{l.tenure}</td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        to="/loans/personal-loan"
                        className="inline-flex items-center px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                      >
                        Check Eligibility
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Contextual Internal Silo Anchor Links */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-wrap gap-4 text-xs font-medium text-slate-600">
          <span className="text-slate-400 font-bold uppercase tracking-wider self-center">Related Financial Calculators:</span>
          <Link to="/personal-loan-emi-calculator" className="hover:text-blue-600 underline">Personal Loan EMI Calculator</Link>
          <Link to="/home-loan-emi-calculator" className="hover:text-blue-600 underline">Home Loan EMI Calculator</Link>
          <Link to="/ssy-calculator" className="hover:text-blue-600 underline">Sukanya Samriddhi Yojana Calculator</Link>
          <Link to="/credit-score" className="hover:text-blue-600 underline">Check Free CIBIL Score Online</Link>
          <Link to="/blogs/Best-Credit-Cards" className="hover:text-blue-600 underline">Best Credit Cards in India</Link>
        </section>
      </main>
    </div>
  );
};

export default GoldLoanEMICalculator;
