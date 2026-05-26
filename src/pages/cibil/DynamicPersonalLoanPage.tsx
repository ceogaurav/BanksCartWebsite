import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert, Sparkles, BookOpen, AlertCircle, Info, Landmark, Percent, Award, ShieldCheck, ArrowRight, Play, MessageSquare, TrendingUp } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';
import { LOAN_PAGE_MAP, LoanPageContent, LoanRepaymentRow } from '../../data/loanPageData';
import { getNewPageDetailedContent } from '../../data/newPagesDetailedData';


interface EditorialArticle {
  title: string;
  content: string[];
}

const getPersonalLoanDetailedArticles = (slug: string): EditorialArticle[] => {
  const formatSlug = (s: string) => s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const readableName = formatSlug(slug);

  return [
    {
      title: `Securing High-Fidelity Capital under the ${readableName} Framework`,
      content: [
        `Securing optimal financial parameters under the broader spectrum of **${readableName}** is vital to ensure long-term cash flow flexibility and personal liquidity. In a dynamically shifting credit landscape regulated closely by the Reserve Bank of India (RBI), retail borrowers must evaluate baseline rate matrices carefully before committing capital. Unlike secured loans that require pledging physical assets (like gold or real estate deeds), unsecured personal credit provides instant financial backup based strictly on your income stability and credit bureau standing.`,
        `By utilizing BanksCart's modern side-by-side comparison engine, you can review interest rates (starting as low as 10.49% p.a.), upfront processing fees, and repayment timelines across India's leading public and private sector banks. This digital onboarding process bypasses tedious physical document loops, allowing you to secure immediate approvals online with zero upfront transaction friction.`
      ]
    },
    {
      title: `Reducing Balance vs Flat Rates: The Mathematical Reality of ${readableName}`,
      content: [
        `When comparing personal financing options under the **${readableName}** category, understanding the mathematical interest calculation model is critical. Traditional flat interest models compute interest based on the entire original loan principal throughout the tenure, leading to exceptionally high cumulative interest payments. Conversely, the reducing balance model recalculates interest monthly or quarterly strictly on the remaining outstanding principal.`,
        `This reducing model dramatically lowers your total cost of borrowing, saving thousands of rupees over a standard 5-year tenure. At BanksCart, we ensure all pre-approved offers are presented using transparent reducing balance metrics, letting you plan monthly budgets and choose convenient tenure options (ranging from 12 to 72 months) with complete clarity.`
      ]
    },
    {
      title: `Prerequisites for Prime Pricing: CIBIL Score & DTI Ratio Optimization`,
      content: [
        `To secure the lowest interest rates and premium borrower benefits under the **${readableName}** catalog, maintaining a pristine credit history is essential. Lenders evaluate your creditworthiness using your CIBIL rating, where scores of 750 and above qualify you for lowest base rate markups, waived processing charges, and pre-approved limits. Borrowers with scores between 600 and 700 can still qualify but are often charged higher risk margins.`,
        `Additionally, lenders audit your Debt-to-Income (DTI) ratio, representing the percentage of your monthly salary routed toward active EMIs. Keeping your DTI ratio below 45% demonstrates high repayment capacities and lowers default risks. Organizing clean bank statements showing zero unpaid direct debits or cheque bounces before submitting your final request guarantees rapid approvals.`
      ]
    },
    {
      title: `Compliance and Auto-Debit Setup: Securing Your Credit Profile`,
      content: [
        `Once your application under **${readableName}** is approved, configuring automated repayment channels is a vital step to preserve your credit rating. Setting up secure e-NACH auto-debit mandates ensures monthly EMIs clear on schedule, preventing daily late fee penalties (often up to 42% p.a.) and avoiding default flags reported to major bureaus.`,
        `Consistent, on-time repayments compile into a positive credit payment history, directly boosting your CIBIL score for future high-ticket borrowing like housing loans or business capital, establishing an ironclad wealth-building cycle.`
      ]
    }
  ];
};

const DynamicPersonalLoanPage: React.FC = () => {
  const { subPath } = useParams<{ subPath: string }>();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Helper to convert slug/subPath to a readable title
  const formatSlug = (slug: string) => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Safe fallback procedural content generator for 100% coverage of all 27 paths
  const generateFallbackContent = (slug: string): LoanPageContent => {
    const readableTitle = formatSlug(slug);
    
    // Custom parameters based on the slug group
    let customIntro = `A ${readableTitle} represents a tailored credit framework designed to help retail customers achieve their specific financial goals under prime conditions. At BanksCart, we compare offerings across major lenders to match your profile with lowest base rates, minimal processing charges, and flexible tenure slabs.`;
    let keyFeaturesList = [
      { label: "High Availability", text: `Secure your approved ${readableTitle} online with instant digital onboarding.` },
      { label: "Competitive Pricing", text: "Link your loan account directly to prime floating base rates, lowering monthly EMI outgo." },
      { label: "Paperless KYC", text: "Complete identity verification entirely online via Aadhaar OTP and digital signature verification." }
    ];
    let repaymentDetailsList: LoanRepaymentRow[] = [
      { col1: "State Bank of India (SBI)", col2: "11.15% - 14.50%", col3: "Up to 1.00%", col4: "Up to 60 Months" },
      { col1: "HDFC Bank", col2: "10.50% - 19.00%", col3: "Up to 1.50%", col4: "Up to 60 Months" },
      { col1: "ICICI Bank", col2: "10.75% - 18.50%", col3: "Up to 2.00%", col4: "Up to 60 Months" },
      { col1: "Axis Bank", col2: "10.49% - 21.00%", col3: "Flat ₹999 to 2%", col4: "Up to 60 Months" }
    ];
    let boostTipsList = [
      `Check eligibility score: Ensure your CIBIL rating is above 720 to secure prime ${readableTitle} pricing.`,
      "Minimize existing debts: Lower your Debt-to-Income (DTI) ratio before submitting your final request.",
      "Submit valid corporate slips: Working for Tier-1 companies qualifies you for special interest concessions."
    ];
    let customFAQs = [
      { q: `What is a ${readableTitle}?`, a: `A ${readableTitle} is a specialized retail credit product custom-designed to address specific funding requirements under structured interest rates.` },
      { q: "What is the minimum CIBIL score required for approval?", a: "Tier-1 banks prefer a CIBIL score of 720 and above. However, registered NBFCs approve loans for scores between 600 and 700 with additional documentation." },
      { q: "How long does it take for the loan amount to get disbursed?", a: "Pre-approved digital applications are disbursed instantly. Standard physical verifications take between 2 to 5 business days." },
      { q: "Are there any foreclosure or prepayment charges?", a: "Yes, standard foreclosure fees range from 2% to 4% of the outstanding principal, unless waived during bank campaigns." },
      { q: "Will checking my eligibility drop my credit score?", a: "No. Checking options on BanksCart initiates a 'Soft Inquiry', which has absolute zero impact on your CIBIL score." },
      { q: "What is the maximum loan limit I can apply for?", a: "Limits vary based on your monthly take-home salary and repayment history, ranging from ₹50,000 up to ₹40 Lakhs." },
      { q: "Do I need to submit physical documents?", a: "No. The entire process is completed online via secure KYC links, Aadhaar OTPs, and bank statement uploads." },
      { q: "What is e-NACH auto-debit?", a: "An automated bank standing instruction configured online to secure your monthly EMI clears on time." },
      { q: "Can I apply with a co-borrower?", a: "Yes. Adding a co-applicant (such as a spouse or parent) with excellent credit ratings reduces bank risk, yielding lower interest rates." },
      { q: "What happens if I delay a monthly payment?", a: "Delaying EMIs triggers late payment charges (up to 42% p.a.) and reports a default flag to bureaus, dropping your CIBIL score." }
    ];

    // Mapped content updates for specific groups
    if (slug.includes('lakh')) {
      customIntro = `Getting a **${readableTitle}** online is now a hassle-free, highly structured process. A loan of this size is ideal for high-ticket personal expenses, major home remodeling, debt consolidation, or premium vehicle upgrades. Lenders evaluate your monthly salary and CIBIL score strictly to determine the maximum loan approvals.`;
      keyFeaturesList = [
        { label: "Pristine Loan Brackets", text: `Secure up to the full ${readableTitle} principal without submitting property or gold collateral.` },
        { label: "Flexible EMI Slabs", text: "Repay comfortably over extended terms ranging from 12 to 72 months." },
        { label: "Lower Base Rates", text: "High-ticket loans qualify for competitive baseline interest rate markups." }
      ];
    } else if (slug.includes('salaried') || slug.includes('self-employed') || slug.includes('doctors') || slug.includes('women')) {
      customIntro = `A **${readableTitle}** is a highly specialized retail credit facility designed to cater to the unique professional parameters and income patterns of individual borrower categories. Lenders leverage customized risk metrics to extend prime pricing and simplified documentation pathways.`;
    } else if (slug.includes('medical') || slug.includes('wedding') || slug.includes('travel') || slug.includes('debt-consolidation')) {
      customIntro = `A **${readableTitle}** is a dedicated personal credit line designed to address immediate funding requirements. Whether managing unexpected healthcare costs, planning your dream wedding, or consolidating high-interest credit card debt into a single low-rate EMI, this loan provides instant credit backup.`;
    }

    return {
      title: readableTitle,
      badge: "Dynamic Loan Catalog",
      intro: customIntro,
      keyFeaturesTitle: `${readableTitle} Core Highlights`,
      keyFeatures: keyFeaturesList,
      repaymentDetailsTitle: `Compare Top Lenders for ${readableTitle}`,
      repaymentHeaders: ["Lender Bank", "Interest Slabs (p.a.)", "Processing Fee Range", "Repayment Tenure"],
      repaymentDetails: repaymentDetailsList,
      boostTipsTitle: "Step-by-Step Optimization Checklist",
      boostTips: boostTipsList,
      faqs: customFAQs
    };
  };

  const currentSlug = subPath || 'overview';
  const newPageData = getNewPageDetailedContent(window.location.pathname);

  const pageContent = newPageData
    ? {
        title: newPageData.title,
        badge: newPageData.badge,
        intro: newPageData.intro,
        moreIntro: newPageData.moreIntro,
        keyFeaturesTitle: newPageData.highlightsTitle,
        keyFeatures: newPageData.highlights,
        repaymentDetailsTitle: newPageData.ratesTitle,
        repaymentHeaders: newPageData.ratesHeaders,
        repaymentDetails: newPageData.ratesRows.map(row => ({
          col1: row[0],
          col2: row[1],
          col3: row[2],
          col4: row[3] || "N/A"
        })),
        boostTipsTitle: newPageData.checklistTitle,
        boostTips: newPageData.checklist,
        faqs: newPageData.faqs
      }
    : (LOAN_PAGE_MAP[currentSlug] || generateFallbackContent(currentSlug));

  const detailedArticles = newPageData?.detailedArticles
    ? newPageData.detailedArticles
    : getPersonalLoanDetailedArticles(currentSlug);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveFaq(null);
  }, [subPath]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[200px] font-black leading-none select-none">LOAN</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              {pageContent.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight">
              {pageContent.title}
            </h1>
            <p className="text-blue-100 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl font-medium">
              {pageContent.intro}
            </p>
          </div>
        </div>

        {/* 2-Column Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Rich Dynamic Content */}
          <div className="lg:col-span-7 space-y-10 text-slate-700">
            
            {/* More Intro if present */}
            {pageContent.moreIntro && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <p className="text-sm text-slate-650 leading-relaxed font-medium font-sans">
                  {pageContent.moreIntro}
                </p>
              </div>
            )}

            {/* Detailed Editorial Sections - Rich Data like the Zero Coupon Bonds Sample */}
            {detailedArticles.length > 0 && (
              <div className="space-y-8">
                {detailedArticles.map((art, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                      {art.title}
                    </h3>
                    {art.content.map((p, pIdx) => (
                      <p key={pIdx} className="text-slate-600 text-sm leading-relaxed font-sans font-medium text-justify">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Key Features Block */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                {pageContent.keyFeaturesTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {pageContent.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-xl p-4 hover:border-blue-100 transition-colors">
                    <h4 className="font-bold text-slate-800 text-sm mb-2">{feat.label}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{feat.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Repayment details and Top Lenders Comparison Table */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">{pageContent.repaymentDetailsTitle}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      {pageContent.repaymentHeaders.map((header, idx) => (
                        <th key={idx} className="p-3 font-semibold text-slate-700">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pageContent.repaymentDetails.map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="p-3 font-bold text-slate-800">{row.col1}</td>
                        <td className="p-3 font-semibold text-slate-600">{row.col2}</td>
                        <td className="p-3 text-slate-500">{row.col3}</td>
                        <td className="p-3 text-slate-500">{row.col4}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Step checklist */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6">{pageContent.boostTipsTitle}</h3>
              <div className="space-y-4">
                {pageContent.boostTips.map((tip, idx) => (
                  <div key={idx} className="flex gap-4 items-start pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-semibold">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech innovations panel */}
            <div className="bg-gradient-to-br from-indigo-900 to-blue-900 rounded-3xl text-white p-6 sm:p-8 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Experience Prime Loan Technologies
              </h3>
              <p className="text-xs text-blue-200 mb-6">Designed to simplify retail borrowing</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Play className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Video Eligibility</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed">Instantly verify your pre-approved brackets in a customized video.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">EMI Optimizer</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed">Simulate different repayment tenures to lock in cheapest outgoes.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">AI Lead Advisor</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed">Resolve all credit queries with our automated banking bot.</p>
                </div>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {pageContent.faqs.map((faq, index) => (
                  <div key={index} className="border border-slate-100 rounded-xl overflow-hidden transition-colors">
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full flex justify-between items-center p-4 bg-slate-50/50 hover:bg-slate-50 text-left font-bold text-slate-700 text-sm outline-none transition-colors"
                    >
                      {faq.q}
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-blue-600' : ''}`} />
                    </button>
                    {activeFaq === index && (
                      <div className="p-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-white leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Quick Apply Lead Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <CibilCheckerForm sourcePage={`${pageContent.title} Landing Page`} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default DynamicPersonalLoanPage;
