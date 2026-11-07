import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Building2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Calculator,
  Plus,
  Trash2,
  Scale,
  Percent,
  Layers,
  HelpCircle,
  ChevronDown,
  Award,
  Info,
  Check
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { homeLoanProducts } from '../data/homeLoanProducts';
import { personalLoanProducts } from '../data/personalLoanProducts';
import { businessLoanProducts } from '../data/businessLoanProducts';

const maxBanks = 4;
const minBanks = 2;

const loanTypes = [
  { key: 'home', label: 'Home Loans', badge: 'Mortgage & Housing' },
  { key: 'personal', label: 'Personal Loans', badge: 'Unsecured Credit' },
  { key: 'business', label: 'Business Loans', badge: 'MSME Capital' },
];

const fieldsMap: Record<string, { key: string; label: string; tooltip: string }[]> = {
  home: [
    { key: 'interestRate', label: 'Interest Rate (p.a.)', tooltip: 'Current floating annual interest rate range linked to external benchmark' },
    { key: 'loanTenure', label: 'Maximum Tenure', tooltip: 'Longest permitted repayment horizon for comfortable monthly EMIs' },
    { key: 'ltv', label: 'Loan to Value (LTV)', tooltip: 'Maximum percentage of registered property valuation funded by the bank' },
    { key: 'maxLoanAmount', label: 'Max Sanction Amount', tooltip: 'Upper borrowing ceiling subject to verifiable income and debt ratios' },
    { key: 'ageRange', label: 'Eligible Age Range', tooltip: 'Age bracket at application date through scheduled maturity' },
    { key: 'processingFee', label: 'Processing Fee', tooltip: 'Administrative fee charged by the bank upfront (+ 18% GST)' },
  ],
  personal: [
    { key: 'interestRate', label: 'Interest Rate (p.a.)', tooltip: 'Annual interest rate range under reducing balance model' },
    { key: 'loanTenure', label: 'Loan Tenure', tooltip: 'Maximum repayment duration in months or years' },
    { key: 'maxLoanAmount', label: 'Max Loan Amount', tooltip: 'Maximum unsecured sanction amount' },
    { key: 'ageRange', label: 'Eligible Age Range', tooltip: 'Eligible age parameters for salaried and self-employed applicants' },
    { key: 'processingFee', label: 'Processing Fee', tooltip: 'One-time administrative processing charges' },
  ],
  business: [
    { key: 'interestRate', label: 'Interest Rate (p.a.)', tooltip: 'Commercial lending benchmark rate' },
    { key: 'loanTenure', label: 'Loan Tenure', tooltip: 'Repayment horizon for working capital or machinery loans' },
    { key: 'maxLoanAmount', label: 'Max Loan Amount', tooltip: 'Maximum borrowing line available' },
    { key: 'turnoverReq', label: 'Turnover Requirement', tooltip: 'Minimum annual business turnover demonstrated in audited ITRs' },
    { key: 'processingFee', label: 'Processing Fee', tooltip: 'Bank processing fee plus applicable GST' },
  ],
};

const COMPARE_FAQS = [
  {
    q: 'How do I choose between top home loan lenders in India?',
    a: 'Beyond headline interest rates, evaluate: 1) The spread over the external repo benchmark (EBLR/RLLR); 2) Upfront processing charges and legal valuation expenses; 3) Maximum sanctioned LTV ratio (up to 85%-90% for affordable housing); 4) Concessions for women co-borrowers (usually 0.05% discount); and 5) Turnaround time (TAT) and digitized sanction procedures.'
  },
  {
    q: 'Can I switch my existing home loan to another bank if I find a lower rate?',
    a: 'Yes. Through a Home Loan Balance Transfer, you can transfer your outstanding principal to a lender offering lower interest rates. Since the RBI mandates zero prepayment penalties on individual floating-rate housing loans, you only need to account for nominal processing and legal re-verification fees at the new bank, which are often recovered within a few months through reduced EMIs.'
  },
  {
    q: 'What is the RBI Loan-to-Value (LTV) ceiling on retail home loans?',
    a: 'Under Reserve Bank of India (RBI) prudential guidelines, maximum LTV ratios are tier-based: Up to 90% for loans up to ₹30 Lakhs; Up to 80% for loans between ₹30 Lakhs and ₹75 Lakhs; and Up to 75% for loans exceeding ₹75 Lakhs. Borrowers must fund the remaining percentage as their own margin contribution.'
  },
  {
    q: 'Are processing fees refundable if my loan application is rejected or not availed?',
    a: 'Generally, processing fees cover initial administrative expenses such as CIBIL bureau pulls, legal title searches, and property valuation inspections. Consequently, basic initial administrative fees (typically ₹2,000 to ₹5,000) are non-refundable once technical checks commence. BanksCart itself does not charge any application fee.'
  }
];

function areAllEqual(arr: string[]) {
  return arr.length > 1 && arr.every((v) => v === arr[0]);
}

interface HomeLoanCompareProps {
  openApplyModal?: (loanType?: string) => void;
  openEligibilityModal?: () => void;
  openCibilModal?: () => void;
}

export const HomeLoanCompare: React.FC<HomeLoanCompareProps> = ({
  openApplyModal,
  openEligibilityModal,
  openCibilModal
}) => {
  const [selectedType, setSelectedType] = useState<string>('home');
  // Default to first two banks for instant comparison
  const [selected, setSelected] = useState<(string | null)[]>(['sbi', 'hdfc']);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Choose products based on selectedType
  const products =
    selectedType === 'home'
      ? homeLoanProducts
      : selectedType === 'personal'
      ? personalLoanProducts
      : businessLoanProducts;
  const fields = fieldsMap[selectedType] || fieldsMap.home;

  // Reset selected banks when switching loan type
  useEffect(() => {
    if (products.length >= 2) {
      setSelected([products[0].id, products[1].id]);
    } else {
      setSelected([null, null]);
    }
  }, [selectedType]);

  const handleSelect = (idx: number, value: string) => {
    const updated = [...selected];
    updated[idx] = value || null;
    setSelected(updated);
  };

  const addBank = () => {
    if (selected.length < maxBanks) setSelected([...selected, null]);
  };

  const removeBank = (idx: number) => {
    if (selected.length > minBanks) setSelected(selected.filter((_, i) => i !== idx));
  };

  const selectedProducts = selected.map((id) => products.find((p) => p.id === id));

  // Highlighting identical values
  const getFieldHighlight = (key: string) => {
    const values = selectedProducts.map((p) => (p ? (p[key as keyof typeof p] as string) : ''));
    return areAllEqual(values) ? 'text-emerald-700 font-bold bg-emerald-50/50' : 'text-slate-800';
  };

  const handleApplyClick = (productName?: string) => {
    if (openApplyModal) {
      openApplyModal(productName ? `${productName} Application` : `${selectedType.toUpperCase()} Loan Comparison`);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Structured Data Schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.bankscart.com/' },
      { '@type': 'ListItem', position: 2, name: 'Loans', item: 'https://www.bankscart.com/loans' },
      { '@type': 'ListItem', position: 3, name: 'Home Loan Comparison', item: 'https://www.bankscart.com/home-loan-compare' }
    ]
  };

  const financialProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialProduct',
    name: 'Multi-Bank Loan Comparison Matrix',
    description: 'Compare interest rates, tenure, LTV ratios, and processing fees side-by-side across top Indian banks on BanksCart.',
    url: 'https://www.bankscart.com/home-loan-compare',
    provider: {
      '@type': 'Organization',
      name: 'BanksCart',
      url: 'https://www.bankscart.com'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: COMPARE_FAQS.map(faq => ({
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
        <title>Compare Home Loans in India: Side-by-Side Bank Rates & Terms | BanksCart</title>
        <meta
          name="description"
          content="Compare home loan interest rates, LTV ratios, processing fees, and tenures side-by-side from SBI, HDFC, ICICI, Axis & Tata Capital. Find the lowest EMI on BanksCart."
        />
        <link rel="canonical" href="https://www.bankscart.com/home-loan-compare" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Compare Home Loans in India: Side-by-Side Bank Rates & Terms | BanksCart" />
        <meta
          property="og:description"
          content="Compare home loan interest rates, LTV ratios, processing fees, and tenures side-by-side from SBI, HDFC, ICICI, Axis & Tata Capital. Find the lowest EMI on BanksCart."
        />
        <meta property="og:url" content="https://www.bankscart.com/home-loan-compare" />
        <meta property="og:site_name" content="BanksCart" />
        <meta property="og:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Compare Home Loans in India: Side-by-Side Bank Rates & Terms | BanksCart" />
        <meta
          name="twitter:description"
          content="Compare home loan interest rates, LTV ratios, processing fees, and tenures side-by-side from SBI, HDFC, ICICI, Axis & Tata Capital. Find the lowest EMI on BanksCart."
        />
        <meta name="twitter:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(financialProductSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <Breadcrumb path={['Home', 'Loans', 'Home Loan Compare']} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12 mt-4">

        {/* ==================== HERO & CATEGORY TOGGLE ==================== */}
        <header className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl text-white p-6 sm:p-10 lg:p-12 shadow-xl overflow-hidden border border-blue-900/60">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-blue-200 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase">
              <Scale className="w-3.5 h-3.5 text-amber-400" />
              Side-by-Side Multi-Lender Matrix • Verified 2026
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Compare Loan Offers Across Leading Indian Banks
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              Eliminate borrowing guesswork. Select and evaluate up to 4 scheduled commercial banks side-by-side across interest rates, loan-to-value caps, processing fees, and tenure limits under transparent RBI repo-linked benchmarks.
            </p>

            {/* Category Selector Tabs */}
            <div className="pt-2 flex flex-wrap gap-2.5">
              {loanTypes.map((type) => (
                <button
                  key={type.key}
                  type="button"
                  onClick={() => setSelectedType(type.key)}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    selectedType === type.key
                      ? 'bg-amber-700 text-white shadow-lg ring-2 ring-amber-400/30'
                      : 'bg-white/10 text-slate-200 hover:bg-white/20 border border-white/15'
                  }`}
                >
                  <span>{type.label}</span>
                  <span className="text-[10px] font-normal opacity-75">({type.badge})</span>
                </button>
              ))}
            </div>

            {/* Trust Badges Strip */}
            <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-4 sm:gap-8 text-xs text-slate-300 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Direct EBLR / RLLR Rate Linkage
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero Foreclosure Penalty on Floating Rates
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Unbiased Algorithmic Comparison
              </span>
            </div>
          </div>
        </header>

        {/* ==================== MULTI-BANK COMPARISON MATRIX ==================== */}
        <section aria-labelledby="matrix-heading" className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <h2 id="matrix-heading" className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {loanTypes.find((t) => t.key === selectedType)?.label} Comparison Table
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Comparing {selected.filter(Boolean).length} of {maxBanks} lenders. Choose from the dropdowns below to customize.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {selected.length < maxBanks && (
                <button
                  type="button"
                  onClick={addBank}
                  className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-900 hover:bg-blue-100 border border-blue-200 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Another Bank</span>
                </button>
              )}
            </div>
          </div>

          {/* Responsive Side-by-Side Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-2xs">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <caption className="sr-only">Side-by-side loan terms comparison</caption>
              <thead>
                <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-700">
                  <th scope="col" className="p-4 sm:p-5 w-48 font-bold text-xs uppercase tracking-wider">
                    Feature / Parameter
                  </th>
                  {selected.map((id, idx) => {
                    const prod = products.find((p) => p.id === id);
                    return (
                      <th key={idx} scope="col" className="p-4 sm:p-5 min-w-[200px] text-center border-l border-slate-200">
                        <div className="space-y-2">
                          {/* Bank Logo / Fallback */}
                          <div className="h-10 flex items-center justify-center">
                            {prod?.logo ? (
                              <img
                                src={prod.logo}
                                alt={prod.name}
                                className="h-8 max-w-[120px] object-contain"
                                onError={(e) => {
                                  // Fallback to text initials badge
                                  e.currentTarget.style.display = 'none';
                                }}
                              />
                            ) : (
                              <Building2 className="w-7 h-7 text-blue-900" />
                            )}
                          </div>

                          {/* Bank Dropdown Selector */}
                          <select
                            className="w-full text-xs font-bold border border-slate-300 rounded-lg p-2 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 cursor-pointer shadow-2xs"
                            value={id || ''}
                            onChange={(e) => handleSelect(idx, e.target.value)}
                          >
                            <option value="">-- Select Bank --</option>
                            {products
                              .filter((p) => !selected.includes(p.id) || p.id === id)
                              .map((p) => (
                                <option key={p.id} value={p.id}>
                                  {p.name}
                                </option>
                              ))}
                          </select>

                          {selected.length > minBanks && (
                            <button
                              type="button"
                              onClick={() => removeBank(idx)}
                              className="text-[11px] text-rose-600 hover:text-rose-800 font-semibold inline-flex items-center gap-1 cursor-pointer transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                              <span>Remove</span>
                            </button>
                          )}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {fields.map((field) => (
                  <tr key={field.key} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 sm:p-5 font-bold text-slate-900 bg-slate-50/50">
                      <div>{field.label}</div>
                      <div className="text-[11px] font-normal text-slate-500 mt-0.5">{field.tooltip}</div>
                    </td>
                    {selectedProducts.map((p, idx) => (
                      <td
                        key={idx}
                        className={`p-4 sm:p-5 text-center font-semibold border-l border-slate-100 tabular-nums ${
                          p ? getFieldHighlight(field.key) : 'text-slate-400'
                        }`}
                      >
                        {p ? (p[field.key as keyof typeof p] as string) || 'N/A' : '—'}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Bottom Action Row */}
                <tr className="bg-slate-50/70 border-t border-slate-200">
                  <td className="p-4 sm:p-5 font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Next Action
                  </td>
                  {selectedProducts.map((p, idx) => (
                    <td key={idx} className="p-4 sm:p-5 text-center border-l border-slate-200">
                      {p ? (
                        <button
                          type="button"
                          onClick={() => handleApplyClick(p.name)}
                          className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold text-xs py-2.5 px-3 rounded-lg shadow-sm transition-all cursor-pointer"
                        >
                          Apply for {p.name.split(' ')[0]}
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled
                          className="w-full bg-slate-200 text-slate-400 font-bold text-xs py-2.5 px-3 rounded-lg cursor-not-allowed"
                        >
                          Select Bank
                        </button>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200/60 text-xs text-blue-950 leading-relaxed flex items-start gap-3">
            <Info className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Highlight Indicator:</strong> Parameters highlighted in subtle green indicate matching terms across all selected institutions. Unmatched cells reflect varying risk margins, processing charges, or underwriting criteria.
            </div>
          </div>
        </section>

        {/* ==================== COMPARISON STRATEGY GUIDE ==================== */}
        <section aria-labelledby="guide-heading" className="space-y-6">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h2 id="guide-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              What to Evaluate Beyond Headline Interest Rates
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Smart borrowers consider these 4 critical parameters before signing a mortgage sanction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
                <Percent className="w-5 h-5 text-blue-700" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Benchmark Spread</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Check whether your loan is pegged to the RBI Repo Rate (EBLR). Understand the bank&apos;s spread markup which remains fixed throughout your tenure.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                <Layers className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-bold text-base text-slate-900">LTV Margin Money</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Verify how much out-of-pocket cash you need. RBI permits up to 90% LTV for properties under ₹30L, and 75%-80% for higher valuations.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5 text-amber-700" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Zero Prepayment Penalty</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Ensure your sanction is on floating rates, which guarantees zero prepayment or foreclosure fees per statutory RBI directives.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5 text-purple-700" />
              </div>
              <h3 className="font-bold text-base text-slate-900">Women Concessions</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Adding a female applicant as primary or co-borrower often unlocks an additional 0.05% interest rebate (5 bps) across top lenders.
              </p>
            </div>
          </div>
        </section>

        {/* ==================== FREQUENTLY ASKED QUESTIONS ==================== */}
        <section aria-labelledby="faqs-heading" className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 text-blue-900 font-bold text-xs tracking-wider uppercase">
              <HelpCircle className="w-4 h-4 text-blue-700" />
              Comparison FAQs
            </div>
            <h2 id="faqs-heading" className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions About Multi-Bank Comparison
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Clear answers regarding loan switching, balance transfers, processing fee policies, and LTV rules.
            </p>
          </div>

          <div className="space-y-3">
            {COMPARE_FAQS.map((faq, idx) => (
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
              to="/home-loan-emi-calculator"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="font-bold text-sm text-slate-900 group-hover:text-blue-900 flex items-center justify-between">
                <span>Home Loan EMI Calculator</span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Simulate 30-year monthly installments, principal split, and Section 24(b) tax savings.</p>
            </Link>

            <Link
              to="/plot-construction-loan"
              className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="font-bold text-sm text-slate-900 group-hover:text-blue-900 flex items-center justify-between">
                <span>Plot cum Construction Loans</span>
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
              <span>Editorial & Mortgage Audit by <strong>BanksCart Research Team</strong></span>
            </div>
            <div>Last Updated & Rate Audit: October 2026</div>
          </div>

          <p>
            <strong>Regulatory & Financial Marketplace Disclaimer:</strong> BanksCart (operated by BanksCart Financial Technologies Pvt. Ltd., CIN: U67190DL2024PTC428910) is an independent financial technology comparison platform, not an RBI-licensed commercial bank or Housing Finance Company (HFC). Interest rate quotes, processing fees, sanctioned LTVs, and tenure approvals are at the sole discretion of our regulated partner lenders (including SBI, HDFC Bank, ICICI Bank, Axis Bank, and Tata Capital), determined strictly by the applicant&apos;s credit score, verifiable income, and property legal scrutiny.
          </p>
        </footer>

      </div>
    </main>
  );
};

export default HomeLoanCompare;
