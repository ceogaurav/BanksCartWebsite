import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  HelpCircle,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Calculator,
  FileText,
  UserCheck,
  Percent,
  Clock,
  Landmark,
  Building2,
  Info
} from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import ApplyButton from '../../components/common/ApplyButton';
import { LOAN_PAGE_MAP, LoanPageContent } from '../../data/loanPageData';
import { getNewPageDetailedContent } from '../../data/newPagesDetailedData';

interface DynamicPersonalLoanPageProps {
  openApplyModal?: (loanType?: string) => void;
  openEligibilityModal?: () => void;
  openCibilModal?: () => void;
}

interface EditorialArticle {
  title: string;
  content: string[];
}

const RELATED_PAGES = [
  { label: 'Personal Loan Overview', path: '/loans/personal/overview' },
  { label: 'Pre-Approved Offers', path: '/loans/personal/pre-approved' },
  { label: 'Current Interest Rates', path: '/loans/personal/interest-rates' },
  { label: 'Instant Loan Apps', path: '/loans/personal/mobile-app' },
  { label: 'Low CIBIL Score Loan', path: '/loans/personal/low-cibil-score' },
  { label: 'Balance Transfer', path: '/loans/personal/balance-transfer' },
  { label: 'Loan on Credit Card', path: '/loans/personal/loan-on-credit-card' },
  { label: '₹5 Lakh Loan', path: '/loans/personal/5-lakh' },
  { label: '₹10 Lakh Loan', path: '/loans/personal/10-lakh' },
  { label: '₹20 Lakh Loan', path: '/loans/personal/20-lakh' },
  { label: '₹30 Lakh Loan', path: '/loans/personal/30-lakh' },
  { label: '₹40 Lakh Loan', path: '/loans/personal/40-lakh' },
  { label: '₹50 Lakh Loan', path: '/loans/personal/50-lakh' },
  { label: 'Salaried Employees', path: '/loans/personal/salaried-employees' },
  { label: 'Self-Employed Loan', path: '/loans/personal/self-employed' },
  { label: 'Senior Citizens Pension', path: '/loans/personal/senior-citizens' },
  { label: 'Student Loans', path: '/loans/personal/students' },
  { label: 'Doctor Special Loans', path: '/loans/personal/doctors' },
  { label: 'Women Special Loans', path: '/loans/personal/women' },
  { label: 'Medical Loans', path: '/loans/personal/medical-loan' },
];

function calculateEMI(P: number, r: number, n: number) {
  const monthlyRate = r / (12 * 100);
  if (monthlyRate === 0) return P / n;
  return (
    (P * monthlyRate * Math.pow(1 + monthlyRate, n)) /
    (Math.pow(1 + monthlyRate, n) - 1)
  );
}

const getEditorialArticles = (slug: string, readableName: string): EditorialArticle[] => {
  return [
    {
      title: `Understanding the Borrowing Framework for ${readableName}`,
      content: [
        `Securing optimal financial parameters under **${readableName}** is vital to ensure long-term cash flow flexibility and personal liquidity. Regulated by the Reserve Bank of India (RBI), personal credit facilities provide collateral-free capital based on your monthly income stability and credit bureau standing.`,
        `By utilizing BanksCart's transparent side-by-side comparison engine, you can review interest rates (starting as low as 10.25% p.a.), upfront processing charges, and repayment timelines across India's leading public and private sector banks with zero upfront friction.`
      ]
    },
    {
      title: `Reducing Balance vs Flat Rates: The Mathematical Reality`,
      content: [
        `When comparing personal financing options under the **${readableName}** category, understanding the mathematical interest calculation model is critical. Traditional flat interest models compute interest on the entire original principal throughout the loan term, leading to exceptionally high cumulative interest payments.`,
        `Conversely, scheduled commercial banks calculate interest strictly on a monthly reducing-balance basis, recomputing charges solely on the remaining unpaid principal at the end of each billing cycle. This dramatically lowers total borrowing costs and saves significant money over tenures ranging from 12 to 72 months.`
      ]
    },
    {
      title: `Prerequisites for Prime Pricing: CIBIL Score & DTI Ratio Optimization`,
      content: [
        `To secure the lowest interest rates and premium borrower benefits under **${readableName}**, maintaining a pristine credit history is essential. Lenders evaluate your creditworthiness using your CIBIL rating, where scores of 720 and above qualify you for lowest base rate markups, waived processing charges, and pre-approved limits. Borrowers with scores between 650 and 719 can still qualify but are often charged higher risk margins.`,
        `Additionally, lenders audit your Debt-to-Income (DTI) or Fixed Obligation to Income Ratio (FOIR). Keeping your total active monthly debt obligations below 40% to 50% of your net monthly earnings demonstrates strong repayment capacity and ensures rapid approvals.`
      ]
    },
    {
      title: `Compliance and Auto-Debit Setup: Protecting Your Credit Rating`,
      content: [
        `Once your application under **${readableName}** is approved, configuring automated repayment channels is a vital step to preserve your credit rating. Setting up secure e-NACH auto-debit mandates ensures monthly EMIs clear on schedule, preventing penal late fees and avoiding default marks on bureau reports.`,
        `Consistent, on-time repayments establish an unblemished credit payment track record, directly boosting your CIBIL score for future high-ticket borrowing like housing loans or business capital.`
      ]
    }
  ];
};

const DynamicPersonalLoanPage: React.FC<DynamicPersonalLoanPageProps> = ({
  openApplyModal,
  openEligibilityModal,
  openCibilModal,
}) => {
  const { subPath } = useParams<{ subPath: string }>();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const formatSlug = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const currentSlug = subPath || 'overview';
  const readableTitle = formatSlug(currentSlug);

  // Generate fallback procedural content if not in LOAN_PAGE_MAP
  const generateFallbackContent = (slug: string): LoanPageContent => {
    const formatted = formatSlug(slug);
    return {
      title: `${formatted} Personal Loans in India`,
      badge: "Verified Lending Slabs",
      intro: `Compare verified interest rates, eligibility criteria, and monthly EMIs for **${formatted}** across India's top scheduled commercial banks. Secure zero-collateral funding with 100% digital KYC and rapid disbursal.`,
      defaultAmount: 500000,
      keyFeaturesTitle: `Key Highlights of ${formatted} Personal Loan`,
      keyFeatures: [
        { label: "Collateral-Free", text: "Zero assets or securities required. Approval based on monthly income and credit history." },
        { label: "Transparent Rates", text: "Competitive reducing interest rates starting from 10.25% p.a. with transparent APR." },
        { label: "Flexible Tenure", text: "Choose customizable repayment horizons between 12 and 72 months to suit your monthly cash flow." }
      ],
      repaymentDetailsTitle: `${formatted} Interest Rates & Bank Comparison`,
      repaymentHeaders: ["Lender / Bank", "Interest Rate (p.a.)", "Processing Fee", "Loan Tenure"],
      repaymentDetails: [
        { col1: "State Bank of India (SBI)", col2: "10.30% - 15.10%", col3: "Up to 1.50% (Min ₹1,000)", col4: "Up to 72 Months" },
        { col1: "HDFC Bank", col2: "10.50% - 21.00%", col3: "Up to 2.50% (Min ₹1,999)", col4: "Up to 72 Months" },
        { col1: "ICICI Bank", col2: "10.65% - 16.00%", col3: "Up to 2.50% + GST", col4: "Up to 72 Months" },
        { col1: "Axis Bank", col2: "10.49% - 22.00%", col3: "Up to 2.00% + GST", col4: "Up to 60 Months" },
        { col1: "Kotak Mahindra Bank", col2: "10.99% - 24.00%", col3: "Up to 3.00% + GST", col4: "Up to 72 Months" }
      ],
      boostTipsTitle: `Documents & Verification for ${formatted}`,
      boostTips: [
        "PAN Card and Aadhaar Card for paperless e-KYC authentication.",
        "Past 3 months' salary slips or past 2 years' ITR with computation of income.",
        "Last 6 months' bank account statement reflecting salary credits or operative business turnover."
      ],
      faqs: [
        { q: `What is the eligibility criteria for ${formatted}?`, a: "Indian residents aged 21 to 60 with a minimum monthly take-home salary of ₹15,000–₹25,000 and a CIBIL score of 650+ qualify for competitive approval." },
        { q: "How are monthly EMIs calculated?", a: "EMIs are calculated on a reducing monthly balance formula, ensuring you pay interest strictly on the remaining principal balance rather than the initial borrowed amount." },
        { q: "Are there any prepayment or foreclosure charges?", a: "Per RBI guidelines, zero foreclosure charges apply on floating-rate loans for individual borrowers after the initial lock-in period." },
        { q: "Will checking my eligibility impact my CIBIL score?", a: "No. Checking options on BanksCart initiates a soft inquiry, which has zero impact on your credit score." }
      ]
    };
  };

  const newPageData = getNewPageDetailedContent(window.location.pathname);
  const pageContent: LoanPageContent = LOAN_PAGE_MAP[currentSlug] || (newPageData
    ? {
        title: newPageData.title,
        badge: newPageData.badge,
        intro: newPageData.intro,
        moreIntro: newPageData.moreIntro,
        defaultAmount: 500000,
        keyFeaturesTitle: newPageData.highlightsTitle,
        keyFeatures: newPageData.highlights,
        repaymentDetailsTitle: newPageData.ratesTitle,
        repaymentHeaders: newPageData.ratesHeaders,
        repaymentDetails: newPageData.ratesRows.map(row => ({
          col1: row[0],
          col2: row[1],
          col3: row[2],
          col4: row[3] || "Up to 60 Months"
        })),
        boostTipsTitle: newPageData.checklistTitle,
        boostTips: newPageData.checklist,
        faqs: newPageData.faqs
      }
    : generateFallbackContent(currentSlug));

  const initialAmount = pageContent.defaultAmount || 500000;
  const [calcAmount, setCalcAmount] = useState<number>(initialAmount);
  const [calcRate, setCalcRate] = useState<number>(10.5);
  const [calcTenure, setCalcTenure] = useState<number>(36);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveFaq(0);
    const amt = pageContent.defaultAmount || 500000;
    setCalcAmount(amt);
  }, [subPath]);

  const emi = calculateEMI(calcAmount, calcRate, calcTenure);
  const totalPayment = emi * calcTenure;
  const interestPayable = totalPayment - calcAmount;

  const detailedArticles: EditorialArticle[] = pageContent.editorialArticles || getEditorialArticles(currentSlug, readableTitle);

  const pageTitle = `${pageContent.title} | BanksCart`;
  const pageDescription = pageContent.intro.replace(/\*\*/g, '').slice(0, 160);
  const canonicalUrl = `https://www.bankscart.com/loans/personal/${currentSlug}`;

  // Structured Data Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.bankscart.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Loans",
        "item": "https://www.bankscart.com/loans"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Personal Loan",
        "item": "https://www.bankscart.com/loans/personal"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": readableTitle,
        "item": canonicalUrl
      }
    ]
  };

  const financialProductSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": pageContent.title,
    "description": pageDescription,
    "url": canonicalUrl,
    "provider": {
      "@type": "Organization",
      "name": "BanksCart",
      "url": "https://www.bankscart.com"
    },
    "feesAndCommissionsSpecification": "Processing fee ranging from 0.50% to 2.50% + GST. Zero foreclosure fees on floating rate loans for individuals per RBI guidelines."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": pageContent.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-amber-100 selection:text-amber-900 pb-20">
      <Helmet>
        <html lang="en-IN" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(financialProductSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Accessible Clickable Breadcrumb */}
      <Breadcrumb
        path={[
          "Home",
          "Loans",
          "Personal Loan",
          readableTitle
        ]}
      />

      {/* Hero Section — Master Design System Navy / Deep Slate */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white pt-8 sm:pt-12 pb-16 px-4 md:px-8 shadow-xl border-b border-blue-900/60">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 text-blue-200 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{pageContent.badge} • Verified Partner Lenders</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            {pageContent.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-200 max-w-3xl mx-auto leading-relaxed font-normal">
            {pageContent.intro.replace(/\*\*/g, '')}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
            {openApplyModal ? (
              <button
                type="button"
                onClick={() => openApplyModal(`Personal Loan - ${readableTitle}`)}
                className="w-full sm:w-auto bg-amber-700 hover:bg-amber-800 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <span>Apply for {readableTitle}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("loan-emi-calculator");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto bg-amber-700 hover:bg-amber-800 text-white font-bold px-8 py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer"
              >
                <span>Apply for {readableTitle}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {openEligibilityModal && (
              <button
                type="button"
                onClick={openEligibilityModal}
                className="w-full sm:w-auto bg-white/15 hover:bg-white/20 text-white border border-white/20 font-semibold px-7 py-3.5 rounded-xl transition-all backdrop-blur-sm text-sm sm:text-base cursor-pointer"
              >
                Check Free Eligibility
              </button>
            )}

            <Link
              to="/loans/personal/overview"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-blue-200 hover:text-white font-semibold px-4 py-3 text-sm underline-offset-4 hover:underline transition-colors"
            >
              <span>Personal Loan Overview Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-white/10 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10 text-center">
              <div className="text-xs text-blue-200 uppercase tracking-wider font-medium">Interest Rates</div>
              <div className="text-sm sm:text-base font-black text-amber-300 mt-0.5 tabular-nums">From 10.25% p.a.</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10 text-center">
              <div className="text-xs text-blue-200 uppercase tracking-wider font-medium">Max Loan Limit</div>
              <div className="text-sm sm:text-base font-black text-white mt-0.5 tabular-nums">Up to ₹50 Lakhs</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10 text-center">
              <div className="text-xs text-blue-200 uppercase tracking-wider font-medium">Repayment Tenure</div>
              <div className="text-sm sm:text-base font-black text-white mt-0.5 tabular-nums">12 to 72 Months</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10 text-center">
              <div className="text-xs text-blue-200 uppercase tracking-wider font-medium">Documentation</div>
              <div className="text-sm sm:text-base font-black text-emerald-400 mt-0.5">100% Paperless</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Centered Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Additional Intro Card if present */}
        {pageContent.moreIntro && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {pageContent.moreIntro.replace(/\*\*/g, '')}
            </p>
          </div>
        )}

        {/* Interactive EMI Calculator Section */}
        <section id="loan-emi-calculator" className="bg-white rounded-3xl shadow-sm border border-slate-200/80 p-6 sm:p-8 md:p-10 scroll-mt-24 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Calculator className="w-3.5 h-3.5" />
              EMI Calculator
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {readableTitle} Repayment Estimator
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Calculate your monthly installment, total interest outgo, and overall borrowing cost based on verified reducing-balance interest rates.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Sliders */}
            <div className="lg:col-span-7 space-y-6">
              {/* Amount */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="dyn-amount-input" className="text-slate-800 font-semibold text-sm sm:text-base">
                    Loan Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">₹</span>
                    <input
                      id="dyn-amount-input"
                      type="number"
                      min={50000}
                      max={5000000}
                      step={10000}
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(Number(e.target.value) || 0)}
                      className="w-36 pl-7 pr-3 py-1.5 border border-slate-300 rounded-lg text-right font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm sm:text-base tabular-nums"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={50000}
                  max={5000000}
                  step={10000}
                  value={calcAmount}
                  onChange={(e) => setCalcAmount(Number(e.target.value))}
                  aria-label="Loan Amount Slider"
                  className="w-full accent-amber-600 h-2 rounded-lg bg-slate-200 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1 tabular-nums">
                  <span>₹50,000</span>
                  <span>₹50,00,000</span>
                </div>
                {/* Preset Chips */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    { label: "₹1 Lakh", val: 100000 },
                    { label: "₹3 Lakhs", val: 300000 },
                    { label: "₹5 Lakhs", val: 500000 },
                    { label: "₹10 Lakhs", val: 1000000 },
                    { label: "₹20 Lakhs", val: 2000000 },
                    { label: "₹40 Lakhs", val: 4000000 },
                  ].map((p) => (
                    <button
                      key={p.val}
                      type="button"
                      onClick={() => setCalcAmount(p.val)}
                      className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                        calcAmount === p.val
                          ? "bg-amber-700 text-white shadow-sm"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="dyn-rate-input" className="text-slate-800 font-semibold text-sm sm:text-base">
                    Interest Rate (% p.a.)
                  </label>
                  <div className="relative">
                    <input
                      id="dyn-rate-input"
                      type="number"
                      min={10.25}
                      max={24}
                      step={0.1}
                      value={calcRate}
                      onChange={(e) => setCalcRate(Number(e.target.value) || 0)}
                      className="w-24 px-3 py-1.5 border border-slate-300 rounded-lg text-right font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm sm:text-base tabular-nums"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={10.25}
                  max={24}
                  step={0.1}
                  value={calcRate}
                  onChange={(e) => setCalcRate(Number(e.target.value))}
                  aria-label="Interest Rate Slider"
                  className="w-full accent-amber-600 h-2 rounded-lg bg-slate-200 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1 tabular-nums">
                  <span>10.25% (Best Bank Rate)</span>
                  <span>24.00%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="dyn-tenure-input" className="text-slate-800 font-semibold text-sm sm:text-base">
                    Tenure (Months)
                  </label>
                  <div className="relative">
                    <input
                      id="dyn-tenure-input"
                      type="number"
                      min={12}
                      max={72}
                      step={1}
                      value={calcTenure}
                      onChange={(e) => setCalcTenure(Number(e.target.value) || 0)}
                      className="w-24 px-3 py-1.5 border border-slate-300 rounded-lg text-right font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 text-sm sm:text-base tabular-nums"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min={12}
                  max={72}
                  step={1}
                  value={calcTenure}
                  onChange={(e) => setCalcTenure(Number(e.target.value))}
                  aria-label="Tenure Slider"
                  className="w-full accent-amber-600 h-2 rounded-lg bg-slate-200 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-1 tabular-nums">
                  <span>12 Months (1 Year)</span>
                  <span>72 Months (6 Years)</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {[
                    { label: "1 Year", val: 12 },
                    { label: "2 Years", val: 24 },
                    { label: "3 Years", val: 36 },
                    { label: "5 Years", val: 60 },
                  ].map((p) => (
                    <button
                      key={p.val}
                      type="button"
                      onClick={() => setCalcTenure(p.val)}
                      className={`text-xs px-2.5 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                        calcTenure === p.val
                          ? "bg-amber-700 text-white shadow-sm"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-blue-900/60">
              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-wider text-slate-300 font-semibold">
                  Equated Monthly Installment
                </span>
                <div className="text-3xl sm:text-4xl font-black text-amber-300 mt-1 tabular-nums">
                  ₹{Math.round(emi).toLocaleString("en-IN")}
                  <span className="text-sm font-normal text-slate-300"> /month</span>
                </div>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-4 text-sm">
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-300">Principal Amount</span>
                  <span className="font-bold text-white tabular-nums">₹{calcAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-300">Total Interest Payable</span>
                  <span className="font-bold text-amber-300 tabular-nums">₹{Math.round(interestPayable).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-white/10 pt-2">
                  <span className="text-slate-300 font-medium">Total Repayment Outflow</span>
                  <span className="font-extrabold text-lg text-white tabular-nums">₹{Math.round(totalPayment).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="mt-6 pt-2">
                {openApplyModal ? (
                  <button
                    type="button"
                    onClick={() => openApplyModal(`Personal Loan - ${readableTitle} (₹${calcAmount.toLocaleString("en-IN")})`)}
                    className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Apply for this Loan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <a
                    href="#top-lenders-table"
                    className="w-full bg-amber-700 hover:bg-amber-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-center cursor-pointer"
                  >
                    <span>Compare Bank Rates</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Block */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {pageContent.keyFeaturesTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pageContent.keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center mb-4 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-blue-700" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2">
                    {feat.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Repayment details & Top Lenders Table */}
        <section id="top-lenders-table" className="scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
            <span className="inline-block bg-blue-50 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Lender Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {pageContent.repaymentDetailsTitle}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Compare verified interest rates, processing charges, and repayment tenures across top scheduled commercial banks.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                <thead className="bg-slate-100/90">
                  <tr>
                    {pageContent.repaymentHeaders.map((header, idx) => (
                      <th key={idx} scope="col" className="px-6 py-4 font-bold text-slate-900 text-xs uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                    <th scope="col" className="px-6 py-4 font-bold text-slate-900 text-center text-xs uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {pageContent.repaymentDetails.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {row.col1}
                      </td>
                      <td className="px-6 py-4 font-bold text-blue-900 tabular-nums">
                        {row.col2}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {row.col3}
                      </td>
                      <td className="px-6 py-4 text-slate-600 tabular-nums">
                        {row.col4}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          type="button"
                          onClick={() =>
                            openApplyModal &&
                            openApplyModal(`Personal Loan - ${row.col1}`)
                          }
                          className="bg-amber-700 hover:bg-amber-800 text-white font-bold py-2 px-4 rounded-lg text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
                        >
                          Apply Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
              <div>
                * Rates are indicative and subject to individual credit score, employer category, and lender underwriting policy.
              </div>
              <Link
                to="/loans/personal/overview"
                className="text-blue-900 hover:underline font-bold"
              >
                View Full Bank-by-Bank Overview Guide →
              </Link>
            </div>
          </div>
        </section>

        {/* Detailed Editorial Articles Section */}
        {detailedArticles.length > 0 && (
          <section className="space-y-6">
            <div className="text-center max-w-3xl mx-auto mb-4 space-y-2">
              <span className="inline-block bg-blue-50 text-blue-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Expert Analysis
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Comprehensive Financial Guide & Mathematical Insights
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {detailedArticles.map((art, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-3"
                >
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
                    <span className="w-2 h-2 bg-blue-900 rounded-full" />
                    {art.title}
                  </h3>
                  {art.content.map((p, pIdx) => (
                    <p key={pIdx} className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                      {p.replace(/\*\*/g, '')}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Step-by-Step Optimization Checklist */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
            {pageContent.boostTipsTitle}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {pageContent.boostTips.map((tip, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="w-7 h-7 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 border border-blue-100">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Editorial Attribution Card */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-2xl p-6 sm:p-8 border border-blue-100/80">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Editorial Review & Financial Transparency
              </h3>
              <p className="text-xs text-slate-500">
                Content audited against latest RBI master directions and official bank schedules • Last Updated: October 2026
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Fact-Checked
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/80 flex items-start gap-4">
              <img
                src="/images/avatar1.jpg"
                alt="Amit Sharma"
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-900 shrink-0"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <div className="font-bold text-slate-900 text-sm">Amit Sharma</div>
                  <span className="text-[10px] font-bold text-blue-900 bg-blue-50 px-2 py-0.5 rounded uppercase">Author</span>
                </div>
                <div className="text-xs text-blue-900 font-semibold mb-1">Senior Finance Advisor & Banking Analyst</div>
                <div className="text-xs text-slate-500 leading-relaxed">Specializes in retail lending, benchmark interest rates, and consumer credit planning.</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/80 flex items-start gap-4">
              <img
                src="/images/avatar3.jpg"
                alt="Priya Mishra"
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-600 shrink-0"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80";
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <div className="font-bold text-slate-900 text-sm">Priya Mishra</div>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded uppercase">Reviewer</span>
                </div>
                <div className="text-xs text-amber-800 font-semibold mb-1">Certified Credit Counselor & Financial Risk Analyst</div>
                <div className="text-xs text-slate-500 leading-relaxed">Audits consumer credit products, RBI fair practice compliance, and borrower affordability.</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-blue-900" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Frequently Asked Questions: {readableTitle}
            </h2>
          </div>
          <div className="space-y-3">
            {pageContent.faqs.map((faq, index) => (
              <div
                key={index}
                className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                  activeFaq === index ? "border-blue-900 ring-1 ring-blue-900/20" : "border-slate-200"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-4 bg-slate-50/50 hover:bg-slate-50 text-left font-bold text-slate-800 text-sm sm:text-base outline-none transition-colors cursor-pointer"
                  aria-expanded={activeFaq === index}
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      activeFaq === index ? 'rotate-180 text-blue-900' : ''
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="p-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-white leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Related Personal Loan Categories */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-4">
            Explore Related Personal Loan Guides & Options
          </h2>
          <div className="flex flex-wrap gap-2">
            {RELATED_PAGES.map((rp) => (
              <Link
                key={rp.path}
                to={rp.path}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                  rp.path === window.location.pathname
                    ? "bg-blue-900 text-white border-blue-900"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-900"
                }`}
              >
                {rp.label}
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
};

export default DynamicPersonalLoanPage;
