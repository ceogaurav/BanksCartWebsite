import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import { 
  HelpCircle, 
  ChevronDown, 
  Check, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  AlertCircle, 
  Clock, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Sliders, 
  Shield, 
  Award, 
  FileCheck, 
  Percent, 
  Building2,
  Lock,
  RefreshCw,
  Sparkle,
  PhoneCall,
  CheckCircle,
  FileText
} from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';

interface ScoreCategory {
  min: number;
  max: number;
  label: string;
  badgeColor: string;
  textColor: string;
  status: string;
  approvalChances: string;
  interestRateImpact: string;
  preApprovedOffers: string;
  recommendation: string;
}

const SCORE_CATEGORIES: ScoreCategory[] = [
  {
    min: 800,
    max: 900,
    label: "Exceptional / Prime",
    badgeColor: "bg-emerald-500",
    textColor: "text-emerald-700",
    status: "Prime Borrower",
    approvalChances: "Very High (99%)",
    interestRateImpact: "Lowest Rates (Save up to 1.5% p.a.)",
    preApprovedOffers: "Instant Pre-approved",
    recommendation: "Maintain your stellar score by continuing timely payments and low utilization."
  },
  {
    min: 750,
    max: 799,
    label: "Very Good",
    badgeColor: "bg-teal-500",
    textColor: "text-teal-700",
    status: "Low Risk",
    approvalChances: "High (90-95%)",
    interestRateImpact: "Competitive Rates",
    preApprovedOffers: "Eligible for Most Cards",
    recommendation: "Pay full credit card balances every month to push into the 800+ tier."
  },
  {
    min: 700,
    max: 749,
    label: "Good",
    badgeColor: "bg-blue-500",
    textColor: "text-blue-700",
    status: "Moderate Risk",
    approvalChances: "Moderate to Good (75-85%)",
    interestRateImpact: "Standard Card & Loan Rates",
    preApprovedOffers: "Standard Processing",
    recommendation: "Reduce credit card utilization to below 30% and clear any pending short-term debts."
  },
  {
    min: 650,
    max: 699,
    label: "Fair / Average",
    badgeColor: "bg-amber-500",
    textColor: "text-amber-700",
    status: "Higher Risk",
    approvalChances: "Conditional (50-60%)",
    interestRateImpact: "Higher Interest Rates",
    preApprovedOffers: "Requires Additional Security",
    recommendation: "Avoid new loan applications. Pay all upcoming EMIs without single-day delays."
  },
  {
    min: 300,
    max: 649,
    label: "Poor / Needs Attention",
    badgeColor: "bg-rose-500",
    textColor: "text-rose-700",
    status: "High Credit Risk",
    approvalChances: "Low (<30%)",
    interestRateImpact: "Rejection or Subprime Rates",
    preApprovedOffers: "No Unsecured Offers",
    recommendation: "Check bureau reports for settled/written-off accounts. Rebuild using an FD-backed credit card."
  }
];

const CibilCreditReportPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [simulatedScore, setSimulatedScore] = useState<number>(765);
  const [selectedBureau, setSelectedBureau] = useState<'CIBIL' | 'Experian' | 'Equifax' | 'CRIF'>('CIBIL');

  // Find active score category for simulation
  const currentCategory = SCORE_CATEGORIES.find(
    cat => simulatedScore >= cat.min && simulatedScore <= cat.max
  ) || SCORE_CATEGORIES[2];

  const faqs = [
    {
      q: "What is a CIBIL Credit Report?",
      a: "A CIBIL Credit Report is an authoritative financial summary compiled by TransUnion CIBIL. It consolidates your 36-month repayment history across credit cards, personal loans, home loans, and retail lines. Banks and NBFCs consult this report to evaluate your risk profile before approving credit."
    },
    {
      q: "Does checking my CIBIL score on BanksCart reduce my score?",
      a: "No, absolutely not. Checking your credit score on BanksCart is classified as a 'Soft Inquiry'. Soft inquiries have 0% impact on your credit score, regardless of how frequently you check. In contrast, bank-initiated loan inquiries are 'Hard Inquiries' that can temporarily shave points off your score."
    },
    {
      q: "How often is my credit report updated?",
      a: "Under Reserve Bank of India (RBI) directives, all member banks and NBFCs report customer repayment data to credit bureaus every 15 days. Your BanksCart dashboard automatically refreshes with official bureau data every month."
    },
    {
      q: "What is the difference between CIBIL, Experian, Equifax, and CRIF High Mark?",
      a: "All four are licensed Credit Information Companies (CICs) authorized by the RBI in India. While they all calculate scores on a 300-900 scale, they use distinct proprietary algorithms. Most public and private banks prioritize TransUnion CIBIL and Experian, but a minor difference of 10-30 points between them is normal."
    },
    {
      q: "What does 'Settled' or 'Written-Off' status mean in my report?",
      a: "A 'Settled' status indicates that the lender waived a portion of your outstanding debt due to your inability to pay. A 'Written-Off' status means the lender gave up on recovering the amount. Both designations remain visible on your bureau report for up to 7 years and severely impede fresh loan approvals until formally rectified."
    },
    {
      q: "What is Credit Utilization Ratio (CUR) and what percentage should I maintain?",
      a: "Credit Utilization Ratio is the percentage of your total available credit card limit that you spend in a billing cycle. For example, spending ₹30,000 on a card with a ₹1,00,000 limit represents a 30% CUR. Keeping your overall CUR strictly under 30% signals disciplined borrowing and rapidly boosts your credit score."
    },
    {
      q: "How can I check my score if I have never taken a loan or credit card?",
      a: "If you have never utilized any formal credit facility, your credit score will reflect as 'NH' (No History) or '-1'. This is a neutral rating, not a negative one. You can build your credit file rapidly by opting for a Fixed Deposit-backed secured credit card and using it for routine purchases."
    },
    {
      q: "Can a closed loan account continue to reflect as active?",
      a: "Yes, clerical reporting lags between financial institutions and bureaus can cause closed accounts to show as open. Procure a formal 'No Dues Certificate' (NOC) from your lender and file an online dispute via BanksCart to eliminate the error within 30 days."
    },
    {
      q: "How does a co-applicant's low CIBIL score affect a joint home loan?",
      a: "In joint loan applications, lenders evaluate both applicants. If a co-applicant has a poor credit rating (e.g. below 650), the application may be declined or attract significantly higher interest margins, even if the primary applicant holds a 780+ CIBIL score."
    },
    {
      q: "How long does it take to improve a low credit score to 750+?",
      a: "With consistent, disciplined habits—paying 100% of dues on time, maintaining CUR below 20%, disputing erroneous negative entries, and avoiding multiple new credit requests—most borrowers observe a 50 to 100 point improvement within 4 to 6 billing cycles."
    }
  ];

  const testimonials = [
    {
      name: "Irfan Sayed",
      location: "Jaipur, Rajasthan",
      date: "May 2026",
      quote: "My CIBIL score had fallen to 610 after an unresolved credit card dispute. Using BanksCart's free bureau tracking and utilization guide, my score jumped to 745 in 5 months. Just approved for a premier home loan at 8.35% p.a.!",
      avatar: "IS",
      scoreChange: "+135 Pts"
    },
    {
      name: "Mohammed Reyaj",
      location: "Pune, Maharashtra",
      date: "April 2026",
      quote: "As an SME business owner, tracking credit across CIBIL and Experian in one place saved me weeks. The transparent factor breakdown helped me optimize my working capital lines seamlessly.",
      avatar: "MR",
      scoreChange: "+80 Pts"
    },
    {
      name: "Sindhu Gowda",
      location: "Bengaluru, Karnataka",
      date: "February 2026",
      quote: "Found an outdated personal loan marked active on CRIF that was closed 2 years ago. BanksCart's rectification guidance resolved the bureau dispute in under 3 weeks. Outstanding service!",
      avatar: "SG",
      scoreChange: "+65 Pts"
    },
    {
      name: "Alok Bansal",
      location: "Gurugram, NCR",
      date: "January 2026",
      quote: "Checked my free CIBIL score, followed the CUR recommendations, and got approved for a lifetime-free airport lounge credit card within minutes. Zero spam and 100% reliable.",
      avatar: "AB",
      scoreChange: "+95 Pts"
    }
  ];

  const bureauData = {
    CIBIL: {
      name: "TransUnion CIBIL",
      established: "2000 (India's First CIC)",
      partnerBanks: "Over 5,000+ Banks & NBFCs",
      scoreRange: "300 - 900",
      sampleScore: 812,
      rating: "Prime Elite",
      refreshCycle: "Every 15-30 Days",
      keyFocus: "Comprehensive loan & credit card repayment tracking, retail & commercial."
    },
    Experian: {
      name: "Experian India",
      established: "2006 (Global Leader)",
      partnerBanks: "3,500+ Financial Institutions",
      scoreRange: "300 - 900",
      sampleScore: 785,
      rating: "Very Good",
      refreshCycle: "Every 15-30 Days",
      keyFocus: "Fintech integrations, digital instant loans, behavioral spending patterns."
    },
    Equifax: {
      name: "Equifax India",
      established: "2010 (Joint Venture)",
      partnerBanks: "2,800+ Institutional Lenders",
      scoreRange: "300 - 900",
      sampleScore: 805,
      rating: "Prime",
      refreshCycle: "Every 15-30 Days",
      keyFocus: "Microfinance, retail credit verification, credit risk scores."
    },
    CRIF: {
      name: "CRIF High Mark",
      established: "2007 (RBI Approved)",
      partnerBanks: "4,000+ Rural & Urban Lenders",
      scoreRange: "300 - 900",
      sampleScore: 820,
      rating: "Prime Elite",
      refreshCycle: "Every 15-30 Days",
      keyFocus: "Deep MSME, rural banking, two-wheeler and micro-lending coverage."
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-20 sm:pt-24 pb-16">
      <Helmet>
        <title>Check Free CIBIL Score Online | 4-Bureau Credit Health Report - BanksCart</title>
        <meta 
          name="description" 
          content="Check your free CIBIL credit score online with zero impact on your rating. Compare TransUnion CIBIL, Experian, Equifax & CRIF scores with monthly auto-refreshes." 
        />
        <link rel="canonical" href="https://bankscart.com/cibil-credit-report" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Breadcrumb path={["Home", "Credit Score", "CIBIL Credit Report"]} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* HERO SECTION WITH INTEGRATED ATF SCORE CHECK FORM */}
        <section id="cibil-hero-form" className="bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 rounded-2xl text-white p-6 sm:p-10 lg:p-12 shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Column: Hero Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-3.5 py-1 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <Sparkle className="w-3.5 h-3.5 text-amber-400" />
                RBI Authorized CIC Bureau Partner
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                Check Free Credit Score & <br />
                <span className="text-amber-400">CIBIL Health Report</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                Access your real-time credit score across all 4 licensed Indian credit bureaus with monthly automated refreshes. 100% safe, verified with OTP, and guaranteed zero impact on your credit rating.
              </p>

              {/* Quick Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">0 Score Impact</div>
                    <div className="text-[11px] text-slate-400">Soft Inquiry</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                    <RefreshCw className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">15-Day Cycle</div>
                    <div className="text-[11px] text-slate-400">RBI Reporting</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">4 Bureaus</div>
                    <div className="text-[11px] text-slate-400">CIBIL + Experian</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">256-Bit SSL</div>
                    <div className="text-[11px] text-slate-400">Bank-Grade Safe</div>
                  </div>
                </div>
              </div>

              {/* Supporting Highlights */}
              <div className="space-y-2 pt-2 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Instant PDF download with full credit account trail & payment track</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Personalized credit card and personal loan eligibility check</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Automated alerts for any dispute or unexpected change in score</span>
                </div>
              </div>
            </div>

            {/* Right Column: Prominent ATF Free Score Checker Form */}
            <div className="lg:col-span-5">
              <CibilCheckerForm 
                sourcePage="CIBIL Credit Report Landing Page" 
                className="shadow-2xl ring-1 ring-slate-100" 
              />
            </div>

          </div>
        </section>

        {/* INTERACTIVE SCORE HEALTH SIMULATOR (FULL-WIDTH BALANCED SECTION) */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Sliders className="w-3.5 h-3.5" />
              Live Score Health Simulator
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Evaluate How Your Score Impacts Approvals & Rates
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Slide to simulate your CIBIL score band and preview real-time interest margins and pre-approved offers across Indian retail banks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
            
            {/* Slider Control (Left 6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Simulated Score</span>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-5xl font-black text-slate-900 font-mono tabular-nums">
                      {simulatedScore}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${currentCategory.badgeColor}`}>
                      {currentCategory.label}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500 block">Classification</span>
                  <span className="text-sm font-bold text-slate-800">{currentCategory.status}</span>
                </div>
              </div>

              <div>
                <input
                  type="range"
                  min="300"
                  max="900"
                  step="5"
                  value={simulatedScore}
                  onChange={(e) => setSimulatedScore(parseInt(e.target.value))}
                  aria-label="Simulated Credit Score Slider"
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
                />
                <div className="flex justify-between text-xs font-bold text-slate-400 mt-2 font-mono">
                  <span>300 (Poor)</span>
                  <span>650 (Fair)</span>
                  <span>750 (Target 750+)</span>
                  <span>900 (Elite)</span>
                </div>
              </div>

              <div className="p-3.5 bg-blue-50 border border-blue-100 rounded-xl text-xs text-blue-900 leading-relaxed flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" />
                <span><strong>BanksCart Tip:</strong> {currentCategory.recommendation}</span>
              </div>
            </div>

            {/* Real-time Outcomes (Right 6 cols) */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="text-xs text-slate-500 block font-medium">Loan Approval Odds</span>
                <span className="text-lg font-bold text-slate-900 mt-1 block">{currentCategory.approvalChances}</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="text-xs text-slate-500 block font-medium">Interest Rate Impact</span>
                <span className="text-lg font-bold text-emerald-700 mt-1 block">{currentCategory.interestRateImpact}</span>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm text-center">
                <span className="text-xs text-slate-500 block font-medium">Pre-Approved Cards</span>
                <span className="text-lg font-bold text-slate-900 mt-1 block">{currentCategory.preApprovedOffers}</span>
              </div>
            </div>

          </div>
        </section>

        {/* 4 LICENSED BUREAUS COMPARISON (FULL-WIDTH BALANCED SECTION) */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                India's 4 Licensed Credit Information Bureaus
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                The Reserve Bank of India (RBI) authorizes four Credit Information Companies (CICs). Compare their parameters:
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg whitespace-nowrap self-start sm:self-auto">
              RBI Mandated CICs
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(Object.keys(bureauData) as Array<keyof typeof bureauData>).map((key) => {
              const b = bureauData[key];
              return (
                <div key={key} className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50 hover:border-blue-200 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
                      <div>
                        <h4 className="font-bold text-slate-900 text-base">{b.name}</h4>
                        <span className="text-[11px] text-slate-500">{b.established}</span>
                      </div>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-mono">
                        {b.sampleScore}
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <span className="text-slate-400 block font-medium">Network Scope:</span>
                        <span className="font-semibold text-slate-800">{b.partnerBanks}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block font-medium">Reporting Cycle:</span>
                        <span className="font-semibold text-slate-800">{b.refreshCycle}</span>
                      </div>
                      <div className="pt-2">
                        <span className="text-slate-400 block font-medium">Primary Focus:</span>
                        <span className="text-slate-600 leading-relaxed block mt-0.5">{b.keyFocus}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* HOW CREDIT BUREAUS CALCULATE YOUR SCORE (FULL-WIDTH BALANCED 5-FACTOR GRID) */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
              How Credit Bureaus Calculate Your Score (Weights)
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Your 3-digit score is determined by an algorithmic evaluation of five key financial factors over a rolling 36-month timeline:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Factor 1 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-base text-slate-900">1. Repayment History</span>
                <span className="text-xs font-bold text-[#1E3A8A] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full font-mono">35% High Impact</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Consistent, on-time payments of credit card balances and loan EMIs build positive momentum. A single 30+ day delay can pull your score down by 40-70 points.
              </p>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                <div className="bg-[#1E3A8A] h-2 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>

            {/* Factor 2 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-base text-slate-900">2. Credit Utilization Ratio</span>
                <span className="text-xs font-bold text-[#1E3A8A] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full font-mono">30% High Impact</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The percentage of revolving limit utilized across all credit cards. Lenders look for utilization under 30% to confirm you are not credit hungry.
              </p>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                <div className="bg-[#1E3A8A] h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>

            {/* Factor 3 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-base text-slate-900">3. Credit Vintage & Age</span>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full font-mono">15% Medium Impact</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                The average age of your active loan and credit card accounts. A long, stable track record with zero default demonstrates established borrower maturity.
              </p>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                <div className="bg-slate-600 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>

            {/* Factor 4 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-base text-slate-900">4. Credit Portfolio Mix</span>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full font-mono">10% Low Impact</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                A balanced portfolio containing secured debt (Home/Auto Loan) and unsecured debt (Credit Cards/Personal Loans) reflects healthy debt management.
              </p>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                <div className="bg-slate-600 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>

            {/* Factor 5 */}
            <div className="p-6 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3 md:col-span-2 lg:col-span-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-base text-slate-900">5. Recent Hard Inquiries</span>
                <span className="text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full font-mono">10% Low Impact</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applying simultaneously with multiple lenders triggers multiple hard inquiries in short intervals, which flags elevated credit desperation to automated scoring engines.
              </p>
              <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                <div className="bg-slate-600 h-2 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>

          </div>
        </section>

        {/* CREDIT SCORE RANGE & LOAN APPROVAL ODDS MATRIX (FULL-WIDTH TABLE) */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Credit Score Range & Approval Matrix
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Review how Indian banks evaluate retail applications based on your 3-digit score:
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-800">
                  <th className="p-3.5 font-bold">Score Range</th>
                  <th className="p-3.5 font-bold">Credit Rating</th>
                  <th className="p-3.5 font-bold">Approval Odds</th>
                  <th className="p-3.5 font-bold">Interest Rate Tier</th>
                  <th className="p-3.5 font-bold text-right">Recommended Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 font-mono tabular-nums">800 - 900</td>
                  <td className="p-3.5 font-semibold text-emerald-700">Exceptional / Prime</td>
                  <td className="p-3.5 text-emerald-700 font-bold">✔ Instant Pre-approval</td>
                  <td className="p-3.5 text-slate-600">Lowest Market Rates (Save 1.5% p.a.)</td>
                  <td className="p-3.5 text-right font-medium text-slate-500">Maintain Habits</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 font-mono tabular-nums">750 - 799</td>
                  <td className="p-3.5 font-semibold text-teal-700">Very Good</td>
                  <td className="p-3.5 text-teal-700 font-bold">✔ Very High (&gt;90%)</td>
                  <td className="p-3.5 text-slate-600">Competitive Prime Rates</td>
                  <td className="p-3.5 text-right font-medium text-slate-500">Aim for 800+</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 font-mono tabular-nums">700 - 749</td>
                  <td className="p-3.5 font-semibold text-blue-700">Good</td>
                  <td className="p-3.5 text-blue-700 font-bold">✔ Good (75-85%)</td>
                  <td className="p-3.5 text-slate-600">Standard Retail Rates</td>
                  <td className="p-3.5 text-right font-medium text-slate-500">Lower Utilization</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 font-mono tabular-nums">650 - 699</td>
                  <td className="p-3.5 font-semibold text-amber-700">Fair / Average</td>
                  <td className="p-3.5 text-amber-700 font-bold">⚠ Conditional (50-60%)</td>
                  <td className="p-3.5 text-slate-600">Higher Margin (+1% to 2%)</td>
                  <td className="p-3.5 text-right font-medium text-amber-700 font-bold">Avoid New Inquiries</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 font-bold text-slate-900 font-mono tabular-nums">300 - 649</td>
                  <td className="p-3.5 font-semibold text-rose-700">Needs Attention</td>
                  <td className="p-3.5 text-rose-700 font-bold">✖ Low (&lt;30%)</td>
                  <td className="p-3.5 text-slate-600">Subprime / Requires Security</td>
                  <td className="p-3.5 text-right font-medium text-rose-700 font-bold">Get Secured FD Card</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 6-STEP ACTIONABLE SCORE IMPROVEMENT PLAN (FULL-WIDTH 3x2 GRID) */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Actionable 6-Step Score Improvement Plan
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Proven habits to elevate your credit score into the prime 750+ tier within 4 to 6 billing cycles:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs mb-3">1</div>
              <h4 className="font-bold text-slate-900 text-sm">Enable Auto-Debit for Full Dues</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Set up e-NACH mandates for 100% of your statement balance instead of paying only the minimum due.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-xs mb-3">2</div>
              <h4 className="font-bold text-slate-900 text-sm">Keep Utilization Below 30%</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                If your limit is ₹1,00,000, keep spends under ₹30,000 or request an authorized limit enhancement.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-xs mb-3">3</div>
              <h4 className="font-bold text-slate-900 text-sm">Don't Close Your Oldest Cards</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Closing an old card shrinks your overall credit age and raises your utilization ratio immediately.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-xs mb-3">4</div>
              <h4 className="font-bold text-slate-900 text-sm">Dispute Bureau Discrepancies</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Look for wrong DPD tags or already-settled loans still showing active, and file a formal bureau dispute.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-xs mb-3">5</div>
              <h4 className="font-bold text-slate-900 text-sm">Space Out Loan Applications</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Wait at least 90 days between credit card or personal loan applications to prevent hard inquiry cascades.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 font-bold flex items-center justify-center text-xs mb-3">6</div>
              <h4 className="font-bold text-slate-900 text-sm">Use an FD-Backed Card if NH</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pledge a small Fixed Deposit (₹10,000 - ₹20,000) to get a secured credit card and build a pristine score from zero.
              </p>
            </div>
          </div>
        </section>

        {/* CRITICAL BUREAU STATUS LABELS EXPLAINED (FULL-WIDTH 4-COLUMN GRID) */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Understanding Critical Status Labels in Your Report
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Watch out for these red-flag terms that severely impact fresh credit approvals:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/40 space-y-2">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider bg-rose-100 px-2 py-0.5 rounded">Severe Red Flag</span>
              <h4 className="font-bold text-slate-900 text-sm">"Settled" Status</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lender accepted a lower amount than actual due. Remains on bureau record for 7 years and drops approval chances.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-rose-200 bg-rose-50/40 space-y-2">
              <span className="text-xs font-bold text-rose-700 uppercase tracking-wider bg-rose-100 px-2 py-0.5 rounded">High Risk</span>
              <h4 className="font-bold text-slate-900 text-sm">"Written-Off"</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Lender deemed debt unrecoverable. Precludes any fresh retail loans until an NOC is secured after full settlement.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-amber-200 bg-amber-50/40 space-y-2">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider bg-amber-100 px-2 py-0.5 rounded">Payment Delay</span>
              <h4 className="font-bold text-slate-900 text-sm">DPD (Days Past Due)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Logs number of days payment was delayed (e.g. 030, 060, 090). A status other than "000" indicates missed deadlines.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-blue-200 bg-blue-50/40 space-y-2">
              <span className="text-xs font-bold text-blue-700 uppercase tracking-wider bg-blue-100 px-2 py-0.5 rounded">Clean Slate</span>
              <h4 className="font-bold text-slate-900 text-sm">"NH" (No History)</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                No past credit lines logged. Not a negative rating; build score quickly with a secured credit card or consumer loan.
              </p>
            </div>
          </div>
        </section>

        {/* VERIFIED BORROWER EXPERIENCES (2x2 GRID) */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Verified Borrower Experiences
              </h3>
              <p className="text-sm text-slate-600 mt-1">Real stories from borrowers who improved their credit standing</p>
            </div>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">4.8/5 Rated Platform</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                        {t.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                        <span className="text-xs text-slate-500">{t.location}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-mono">
                      {t.scoreChange}
                    </span>
                  </div>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="text-xs text-slate-400 font-medium mt-4 pt-3 border-t border-slate-200">
                  Verified Report • {t.date}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS (CENTERED ACCORDION) */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-700" />
              Frequently Asked Questions on CIBIL & Credit Reports
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Clear answers to the most common questions regarding credit scores, soft inquiries, and disputes:
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-4 bg-slate-50/70 hover:bg-slate-50 text-left font-bold text-slate-800 text-xs sm:text-sm transition-colors"
                  aria-expanded={activeFaq === index}
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform flex-shrink-0 ${activeFaq === index ? 'rotate-180 text-blue-700' : ''}`} />
                </button>
                {activeFaq === index && (
                  <div className="p-4 text-xs sm:text-sm text-slate-600 border-t border-slate-200 bg-white leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CALL-TO-ACTION BANNER */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-slate-800">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Ready to Check Your Free Credit Report?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Join over 10 Lakh borrowers who track their credit health across all 4 bureaus on BanksCart. 100% free with zero score impact.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('cibil-hero-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg transition-all"
              >
                Check Free CIBIL Score Now &rarr;
              </button>
              <a
                href="tel:+919686859296"
                className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                Credit Advisory: +91 96868 59296
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default CibilCreditReportPage;
