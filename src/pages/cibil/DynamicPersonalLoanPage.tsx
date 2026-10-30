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
      title: `${formatted}: Compare Rates, EMIs & Eligibility`,
      badge: "Tailored Loan Facility",
      defaultAmount: 500000,
      intro: `A **${formatted}** is a dedicated personal credit facility designed to help borrowers meet specific financial milestones with competitive interest rates and flexible tenures.`,
      moreIntro: `At BanksCart, we compare options across India's top banks and NBFCs, matching your profile with lowest base rates starting from 10.25% p.a., transparent processing charges, and 100% digital onboarding.`,
      keyFeaturesTitle: `${formatted} Core Highlights`,
      keyFeatures: [
        { label: "100% Paperless Process", text: "Complete application online via Aadhaar OTP and instant bank statement verification." },
        { label: "Competitive Benchmark Rates", text: "Link your loan account directly to prime reducing-balance interest rates." },
        { label: "Flexible Repayment", text: "Choose comfortable monthly EMIs across tenures from 12 to 72 months." }
      ],
      repaymentDetailsTitle: `Compare Top Lenders for ${formatted}`,
      repaymentHeaders: ["Lender Bank", "Interest Rate (p.a.)", "Processing Fee", "Maximum Tenure"],
      repaymentDetails: [
        { col1: "State Bank of India (SBI)", col2: "10.30% - 13.60%", col3: "0.50% - 1.00% + GST", col4: "Up to 72 Months" },
        { col1: "HDFC Bank", col2: "10.50% - 14.50%", col3: "Up to 1.50% + GST", col4: "Up to 72 Months" },
        { col1: "ICICI Bank", col2: "10.65% - 14.99%", col3: "Up to 1.50% + GST", col4: "Up to 84 Months" },
        { col1: "Axis Bank", col2: "10.49% - 15.00%", col3: "1.00% - 2.00% + GST", col4: "Up to 84 Months" }
      ],
      boostTipsTitle: "Important Checklist for Fast Approval",
      boostTips: [
        "Check your CIBIL score: A credit rating above 720 unlocks lowest interest rate tiers.",
        "Keep DTI below 45%: Ensure existing EMIs do not exceed half of your net monthly earnings.",
        "Gather digital KYC: Keep your Aadhaar, PAN, and recent bank statements ready."
      ],
      faqs: [
        { q: `What is a ${formatted}?`, a: `A ${formatted} is a specialized unsecured personal loan designed to address specific borrowing needs without requiring collateral.` },
        { q: "What is the minimum CIBIL score required for approval?", a: "Tier-1 banks prefer a CIBIL score of 720 and above. However, registered NBFCs approve loans for scores between 650 and 719 with risk-adjusted interest rates." },
        { q: "How long does it take for loan disbursement?", a: "Pre-approved digital applications are disbursed within minutes. Standard online applications take between 24 and 48 hours." },
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
    <main className="min-h-screen bg-slate-50 selection:bg-teal-100 selection:text-teal-900 font-sans pb-20">
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

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white pt-10 pb-16 px-4 md:px-8 shadow-xl">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-blue-100 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-6 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{pageContent.badge} • Verified Partner Lenders</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            {pageContent.title}
          </h1>

          <p className="text-base sm:text-lg text-blue-100/90 max-w-3xl mx-auto mb-8 leading-relaxed font-normal">
            {pageContent.intro.replace(/\*\*/g, '')}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            {openApplyModal ? (
              <ApplyButton
                loanType={`Personal Loan - ${readableTitle}`}
                openApplyModal={openApplyModal}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-slate-900 font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-teal-500/25 transition-all transform hover:-translate-y-0.5"
              >
                Apply for {readableTitle}
              </ApplyButton>
            ) : (
              <button
                onClick={() => {
                  const el = document.getElementById("loan-emi-calculator");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-teal-400 to-emerald-500 hover:from-teal-500 hover:to-emerald-600 text-slate-900 font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-teal-500/25 transition-all"
              >
                Apply for {readableTitle}
              </button>
            )}

            {openEligibilityModal && (
              <button
                type="button"
                onClick={openEligibilityModal}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-7 py-3.5 rounded-xl transition-all backdrop-blur-sm"
              >
                Check Free Eligibility
              </button>
            )}

            <Link
              to="/loans/personal/overview"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-cyan-300 hover:text-white font-medium px-4 py-3 text-sm underline-offset-4 hover:underline transition-colors"
            >
              <span>Personal Loan Overview Guide</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Key Metrics Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-4 border-t border-white/10 text-left">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-xs text-blue-200">Interest Rates</div>
              <div className="text-sm sm:text-base font-bold text-teal-300">From 10.25% p.a.</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-xs text-blue-200">Max Loan Limit</div>
              <div className="text-sm sm:text-base font-bold text-white">Up to ₹50 Lakhs</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-xs text-blue-200">Repayment Tenure</div>
              <div className="text-sm sm:text-base font-bold text-white">12 to 72 Months</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
              <div className="text-xs text-blue-200">Documentation</div>
              <div className="text-sm sm:text-base font-bold text-white">100% Paperless</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Centered Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        
        {/* Additional Intro Card if present */}
        {pageContent.moreIntro && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-200">
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
              {pageContent.moreIntro.replace(/\*\*/g, '')}
            </p>
          </div>
        )}

        {/* Interactive EMI Calculator Section */}
        <section id="loan-emi-calculator" className="bg-white rounded-3xl shadow-xl border border-blue-100 p-6 sm:p-8 md:p-12 scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block bg-teal-50 text-teal-700 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              EMI Calculator
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {readableTitle} Repayment Estimator
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Calculate your monthly installment, total interest outgo, and overall borrowing cost based on verified reducing-balance interest rates.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Sliders */}
            <div className="lg:col-span-7 space-y-7">
              {/* Amount */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="dyn-amount-input" className="text-gray-800 font-semibold text-sm sm:text-base">
                    Loan Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                    <input
                      id="dyn-amount-input"
                      type="number"
                      min={50000}
                      max={5000000}
                      step={10000}
                      value={calcAmount}
                      onChange={(e) => setCalcAmount(Number(e.target.value) || 0)}
                      className="w-36 pl-7 pr-3 py-1.5 border border-gray-300 rounded-lg text-right font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
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
                  className="w-full accent-teal-600 h-2 rounded-lg bg-gray-200 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
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
                      className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                        calcAmount === p.val
                          ? "bg-teal-600 text-white shadow-sm"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
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
                  <label htmlFor="dyn-rate-input" className="text-gray-800 font-semibold text-sm sm:text-base">
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
                      className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-right font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
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
                  className="w-full accent-teal-600 h-2 rounded-lg bg-gray-200 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>10.25% (Best Bank Rate)</span>
                  <span>24.00%</span>
                </div>
              </div>

              {/* Tenure */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="dyn-tenure-input" className="text-gray-800 font-semibold text-sm sm:text-base">
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
                      className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-right font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
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
                  className="w-full accent-teal-600 h-2 rounded-lg bg-gray-200 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
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
                      className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                        calcTenure === p.val
                          ? "bg-teal-600 text-white shadow-sm"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="text-center mb-6">
                <span className="text-xs uppercase tracking-wider text-teal-300 font-semibold">
                  Equated Monthly Installment
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                  ₹{Math.round(emi).toLocaleString("en-IN")}
                  <span className="text-sm font-normal text-blue-200"> /month</span>
                </div>
              </div>

              <div className="space-y-3 border-t border-white/10 pt-4 text-sm">
                <div className="flex justify-between items-center py-1">
                  <span className="text-blue-200">Principal Amount</span>
                  <span className="font-bold text-white">₹{calcAmount.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-teal-300">Total Interest Payable</span>
                  <span className="font-bold text-teal-300">₹{Math.round(interestPayable).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-t border-white/10 pt-2">
                  <span className="text-blue-200 font-medium">Total Repayment Outflow</span>
                  <span className="font-extrabold text-lg text-white">₹{Math.round(totalPayment).toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="mt-6 pt-2">
                {openApplyModal ? (
                  <button
                    type="button"
                    onClick={() => openApplyModal(`Personal Loan - ${readableTitle} (₹${calcAmount.toLocaleString("en-IN")})`)}
                    className="w-full bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-500 hover:to-emerald-500 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Apply for this Loan</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <a
                    href="#top-lenders-table"
                    className="w-full bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-500 hover:to-emerald-500 text-slate-950 font-bold py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-center"
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {pageContent.keyFeaturesTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pageContent.keyFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:border-teal-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 font-bold">
                    ✓
                  </div>
                  <h3 className="font-bold text-gray-900 text-base mb-2">
                    {feat.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {feat.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Repayment details & Top Lenders Table */}
        <section id="top-lenders-table" className="scroll-mt-24">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="inline-block bg-blue-50 text-blue-700 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
              Lender Comparison
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              {pageContent.repaymentDetailsTitle}
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Compare verified interest rates, processing charges, and repayment tenures across top scheduled commercial banks.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {pageContent.repaymentHeaders.map((header, idx) => (
                      <th key={idx} scope="col" className="px-6 py-4 font-bold text-gray-900">
                        {header}
                      </th>
                    ))}
                    <th scope="col" className="px-6 py-4 font-bold text-gray-900 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pageContent.repaymentDetails.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                      <td className="px-6 py-4 font-bold text-gray-900">
                        {row.col1}
                      </td>
                      <td className="px-6 py-4 font-semibold text-teal-700">
                        {row.col2}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {row.col3}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {row.col4}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          type="button"
                          onClick={() =>
                            openApplyModal &&
                            openApplyModal(`Personal Loan - ${row.col1}`)
                          }
                          className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-xl text-xs sm:text-sm shadow-sm transition-all"
                        >
                          Apply Now
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
              <div>
                * Rates are indicative and subject to individual credit score, employer category, and lender underwriting policy.
              </div>
              <Link
                to="/loans/personal/overview"
                className="text-blue-600 hover:underline font-semibold"
              >
                View Full Bank-by-Bank Overview Guide →
              </Link>
            </div>
          </div>
        </section>

        {/* Detailed Editorial Articles Section */}
        {detailedArticles.length > 0 && (
          <section className="space-y-6">
            <div className="text-center max-w-3xl mx-auto mb-4">
              <span className="inline-block bg-teal-50 text-teal-700 text-xs sm:text-sm font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                Expert Analysis
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Comprehensive Financial Guide & Mathematical Insights
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {detailedArticles.map((art, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm space-y-3"
                >
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
                    <span className="w-2 h-2 bg-teal-500 rounded-full" />
                    {art.title}
                  </h3>
                  {art.content.map((p, pIdx) => (
                    <p key={pIdx} className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {p.replace(/\*\*/g, '')}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Step-by-Step Optimization Checklist */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            {pageContent.boostTipsTitle}
          </h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {pageContent.boostTips.map((tip, idx) => (
              <div key={idx} className="flex gap-3 items-start">
                <div className="w-7 h-7 bg-teal-50 text-teal-700 rounded-full flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 border border-teal-100">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
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
              <h3 className="text-base sm:text-lg font-bold text-gray-900">
                Editorial Review & Financial Transparency
              </h3>
              <p className="text-xs text-gray-500">
                Content audited against latest RBI master directions and official bank schedules • Last Updated: October 2026
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Fact-Checked
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
              <img
                src="/images/avatar1.jpg"
                alt="Amit Sharma"
                className="w-12 h-12 rounded-full object-cover border-2 border-teal-500 shrink-0"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <div className="font-bold text-gray-900 text-sm">Amit Sharma</div>
                  <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded uppercase">Author</span>
                </div>
                <div className="text-xs text-teal-800 font-medium mb-1">Senior Finance Advisor & Banking Analyst</div>
                <div className="text-xs text-gray-500 leading-relaxed">Specializes in retail lending, benchmark interest rates, and consumer credit planning.</div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
              <img
                src="/images/avatar3.jpg"
                alt="Priya Mishra"
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shrink-0"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80";
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <div className="font-bold text-gray-900 text-sm">Priya Mishra</div>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase">Reviewer</span>
                </div>
                <div className="text-xs text-blue-800 font-medium mb-1">Certified Credit Counselor & Financial Risk Analyst</div>
                <div className="text-xs text-gray-500 leading-relaxed">Audits consumer credit products, RBI fair practice compliance, and borrower affordability.</div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQs Accordion */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-teal-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Frequently Asked Questions: {readableTitle}
            </h2>
          </div>
          <div className="space-y-3">
            {pageContent.faqs.map((faq, index) => (
              <div
                key={index}
                className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                  activeFaq === index ? "border-teal-500 ring-1 ring-teal-200" : "border-gray-200"
                }`}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-4 bg-slate-50/50 hover:bg-slate-50 text-left font-bold text-gray-800 text-sm sm:text-base outline-none transition-colors"
                  aria-expanded={activeFaq === index}
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200 ${
                      activeFaq === index ? 'rotate-180 text-teal-600' : ''
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="p-4 text-xs sm:text-sm text-gray-600 border-t border-gray-100 bg-white leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Related Personal Loan Categories */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Explore Related Personal Loan Guides & Options
          </h2>
          <div className="flex flex-wrap gap-2">
            {RELATED_PAGES.map((rp) => (
              <Link
                key={rp.path}
                to={rp.path}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                  rp.path === window.location.pathname
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-slate-50 text-gray-700 border-gray-200 hover:border-teal-400 hover:bg-teal-50 hover:text-teal-900"
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
