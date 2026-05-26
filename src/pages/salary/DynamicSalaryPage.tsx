import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert, Sparkles, BookOpen, AlertCircle, Info, Landmark, Percent, Award, ShieldCheck, ArrowRight, Play, MessageSquare, TrendingUp, CreditCard } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';

interface SalaryFAQ {
  q: string;
  a: string;
}

interface PayMatrixRow {
  payLevel: string;
  entryPay: string;
  gradePay: string;
  fitmentSalary: string;
  allowances: string;
}

interface EditorialArticle {
  title: string;
  content: string[];
}

const getSalaryDetailedArticles = (slug: string): EditorialArticle[] => {
  const formatSlug = (s: string) => {
    return s
      .split('-')
      .map(word => {
        if (word.toUpperCase() === 'CPC') return 'CPC';
        if (word.toUpperCase() === 'DA') return 'DA';
        if (word.toUpperCase() === 'HRA') return 'HRA';
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };
  const readableName = formatSlug(slug);

  return [
    {
      title: `The Structural Fitment Factor and Wage Harmonization in Government Sectors under ${readableName}`,
      content: [
        `Analyzing public sector wage guidelines under the statutory updates of **${readableName}** is a critical task for central and state government employees, administrative officers, and mortgage planners. The implementation of modern pay commissions represents a landmark effort to standardize and simplify complex grade pay grids. By utilizing a uniform fitment multiplier (standardized at 2.57x for the 7th Pay Commission), the government successfully mapped historical basic salaries directly to a transparent, 18-level pay matrix.`,
        `This unified matrix system eliminates individual grade pay disputes and ensures complete transparency in annual career progressions. Understanding where your career profile lands within these levels is highly essential, as lenders and financial portals use these basic entry salary slabs as primary verification benchmarks when structuring credit approvals.`
      ]
    },
    {
      title: `Allowance Slabs and Inflation Indexing: Reconciling DA Hikes and HRA Allocations`,
      content: [
        `A key pillar of public sector salary grids under **${readableName}** is the dynamic indexing of allowance benefits designed to offset inflationary rises. Chief among these is the Dearness Allowance (DA), which is calculated directly as a percentage of your basic entry pay and revised bi-annually by the cabinet based on the All-India Consumer Price Index (AICPI).`,
        `Simultaneously, the House Rent Allowance (HRA) is structured to offer localized relief, classified neatly by city categories: Metros (Class X at 24% to 27%), major cities (Class Y at 16% to 18%), and smaller municipalities (Class Z at 8% to 9%). To protect real purchasing power, public directives mandate that HRA slabs automatically step up when the active DA threshold crosses 50%, providing necessary cash flow buffers.`
      ]
    },
    {
      title: `Credit Appraisals and Leverage Multipliers for Salaried Personnel`,
      content: [
        `For government employees earning under the **${readableName}** guidelines, holding a verified pay matrix level offers massive leverage when accessing credit markets. Lenders view central and state government salary paychecks as the gold standard of job security and payment reliability. This excellent risk profile translates directly into special low-interest concessions, processing fee waivers, and accelerated biometric clearances.`,
        `By maintaining a debt-to-income balance strictly below 45% (adhering to FOIR guidelines), salaried employees can borrow high-capacity home loans or personal loans with low default probabilities. Comparing your eligibility parameters on BanksCart's calculators ensures you optimize your leverage and secure prime interest rates.`
      ]
    }
  ];
};

interface SalaryPageContent {
  title: string;
  badge: string;
  intro: string;
  moreIntro?: string;
  highlightsTitle: string;
  highlights: { label: string; text: string }[];
  matrixTableTitle?: string;
  matrixTableHeaders?: string[];
  matrixTableRows?: PayMatrixRow[];
  checklistTitle: string;
  checklist: string[];
  faqs: SalaryFAQ[];
}

const SALARY_PAGE_MAP: Record<string, SalaryPageContent> = {
  "7th-pay-commission": {
    title: "7th Pay Commission Pay Matrix: Slabs & Allowances",
    badge: "Official Pay Commission Guides",
    intro: "The **7th Pay Commission** introduced a highly structured, unified **Pay Matrix** for central government employees in India. Replacing the old complicated 'Pay Bands and Grade Pay' system, the matrix provides a transparent grid mapping Level 1 to Level 18 to base entry salaries, dearness allowances (DA), and fitment multipliers.",
    moreIntro: "At BanksCart, we translate complicated salary commission parameters into actionable guidelines. This Pay Commission pay matrix is crucial for calculating revised basic pay, calculating active DA hikes (e.g., matching the latest dynamic slabs), and projecting home loan or personal loan borrowing eligibility based on verified government paycheck levels.",
    highlightsTitle: "Core Highlights of 7th Pay Commission",
    highlights: [
      { label: "Fitment Multiplier Slabs", text: "A standard fitment factor multiplier of 2.57 applied to basic pay across all levels." },
      { label: "Level-Based Structures", text: "Salaries classified neatly into 18 distinct Levels mapping operational to administrative roles." },
      { label: "Dynamic DA Slabs", text: "Dearness Allowance rates hiked consistently based on national inflation changes." }
    ],
    matrixTableTitle: "7th Pay Commission Pay Matrix Slabs (Select Levels)",
    matrixTableHeaders: ["Pay Matrix Level", "Basic Entry Pay", "Grade Pay Equivalence", "Fitment Salary (2.57x)", "Estimated DA & HRA Slabs"],
    matrixTableRows: [
      { payLevel: "Level 1 (Multi-Tasking Staff)", entryPay: "₹18,000", gradePay: "₹1,800", fitmentSalary: "₹46,260", allowances: "DA + HRA (X/Y/Z Cities)" },
      { payLevel: "Level 5 (Accounts / Clerical)", entryPay: "₹29,200", gradePay: "₹2,800", fitmentSalary: "₹75,044", allowances: "DA + HRA (X/Y/Z Cities)" },
      { payLevel: "Level 10 (Gazetted Officers)", entryPay: "₹56,100", gradePay: "₹5,400", fitmentSalary: "₹1,44,177", allowances: "DA + HRA (X/Y/Z Cities)" },
      { payLevel: "Level 14 (Directors / Joint Sec)", entryPay: "₹1,44,200", gradePay: "₹10,000", fitmentSalary: "₹3,70,594", allowances: "DA + HRA (X/Y/Z Cities)" },
      { payLevel: "Level 18 (Cabinet Secretary)", entryPay: "₹2,50,000", gradePay: "Nil (Apex)", fitmentSalary: "₹6,42,500", allowances: "Fixed allowances only" }
    ],
    checklistTitle: "Allowance Slabs & Fitment Rules Checklist",
    checklist: [
      "Fitment factor formula: Fitment salary = Basic Pay in 6th CPC * 2.57 multiplier factor.",
      "House Rent Allowance (HRA): Slabs classified by cities: Class X (24% to 27%), Class Y (16% to 18%), and Class Z (8% to 9%).",
      "Dearness Allowance (DA): Dynamic allowance calculated as a percentage of basic salary, revised bi-annually.",
      "Travel Allowance (TA): Structured monthly travel payouts linked to pay levels and city categories."
    ],
    faqs: [
      { q: "What is the 7th Pay Commission Pay Matrix?", a: "It is a simplified tabular pay grid that replaces old pay bands, letting employees check their pay progression and levels instantly." },
      { q: "What is the fitment factor used in the 7th Pay Commission?", a: "A fitment factor of 2.57 is applied uniformly to calculate the revised basic pay for all central government employees." },
      { q: "How is HRA calculated under the 7th Pay Commission?", a: "HRA is based on city categories: 24% for X cities (metros), 16% for Y cities (urban centers), and 8% for Z cities (rural/small towns). Rates increase automatically when DA crosses 50%." },
      { q: "What is the minimum basic pay under 7th CPC?", a: "The minimum entry-level basic pay for a central government employee is fixed at ₹18,000 per month (Level 1)." },
      { q: "What is the maximum basic pay under 7th CPC?", a: "The maximum basic pay is capped at ₹2,50,000 per month, applicable to the Cabinet Secretary of India (Level 18)." },
      { q: "How often is Dearness Allowance (DA) revised?", a: "DA is revised bi-annually (effective January and July every year) based on the Consumer Price Index (CPI) numbers for industrial workers." },
      { q: "Does pay commission level affect my loan eligibility?", a: "Yes. Lenders look at your pay level and basic pay as solid proof of employment stability, granting government employees special interest concessions." },
      { q: "What is the fitment factor for pensions?", a: "A fitment factor of 2.57 is also used to calculate pensions, ensuring equal hikes for retired government personnel." },
      { q: "What are Level 10 and Level 12 in the pay matrix?", a: "These levels represent gazetted officers and senior administrative personnel, with entry basic salaries starting at ₹56,100 and ₹78,800 respectively." },
      { q: "How do I calculate my gross monthly salary?", a: "Gross Salary = Revised Basic Pay + Active Dearness Allowance (DA) + House Rent Allowance (HRA) + Travel Allowance (TA)." }
    ]
  }
};

const DynamicSalaryPage: React.FC = () => {
  const { subPath } = useParams<{ subPath: string }>();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Dynamic fallback generator to guarantee 100% coverage
  const generateFallbackContent = (slug: string): SalaryPageContent => {
    const readableTitle = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      title: `${readableTitle}: Comprehensive Salary Slabs & Allowances`,
      badge: "Salary & Pay Portals",
      intro: `A **${readableTitle}** guide is critical to understanding pay scales, fitment factors, and allowance rate structures. Pay structures are amended periodically by government commissions to balance macroeconomic indicators.`,
      moreIntro: "At BanksCart, we translate complicated government circulars into simple, actionable, high-density guides. Keeping track of basic pays and active allowances helps verify credit eligibility and maximize loan potentials.",
      highlightsTitle: "Highlights of Salary Commission Slabs",
      highlights: [
        { label: "Standard Fitment Factors", text: "Fitment factor multipliers applied uniformly to base pay levels." },
        { label: "Structured Allowances", text: "Allowances (DA, HRA, TA) adjusted to offset inflationary rises." },
        { label: "Loan Eligibility Boost", text: "Government salary profiles qualify for special low-interest bank offerings." }
      ],
      matrixTableTitle: "Pay Matrix Structure Overview",
      matrixTableHeaders: ["Pay Matrix Level", "Basic Entry Pay", "Fitment Salary", "Allowance Slabs"],
      matrixTableRows: [
        { payLevel: "Level 1 (Entry Band)", entryPay: "₹18,000", gradePay: "₹1,800", fitmentSalary: "₹46,260", allowances: "Standard DA + HRA" },
        { payLevel: "Level 10 (Officer Band)", entryPay: "₹56,100", gradePay: "₹5,400", fitmentSalary: "₹1,44,177", allowances: "Standard DA + HRA" }
      ],
      checklistTitle: "Core Salary Calculations Checklist",
      checklist: [
        "Basic Pay verification: Check your level entry basic pay on the official pay commission table.",
        "Dearness Allowance (DA): Apply the active DA percentage rate to your basic pay.",
        "House Rent Allowance (HRA): Identify your city category (X/Y/Z) to calculate HRA percentages.",
        "Calculate Gross pay: Sum basic pay, active DA, HRA, and travel allowances to get total gross salary."
      ],
      faqs: [
        { q: `What is the significance of the ${readableTitle}?`, a: "It represents a critical regulatory milestone refining national salary structures, allowances rates, and retirement pensions grids." },
        { q: "How does basic pay affect my pension?", a: "Pensions are typically calculated as 50% of the last drawn basic salary, adjusted for active dearness reliefs." }
      ]
    };
  };

  const currentSlug = subPath || 'overview';
  const pageContent = SALARY_PAGE_MAP[currentSlug] || generateFallbackContent(currentSlug);
  const detailedArticles = getSalaryDetailedArticles(currentSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveFaq(null);
  }, [subPath]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Banner section */}
        <div className="bg-gradient-to-r from-cyan-800 via-indigo-900 to-slate-900 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[180px] font-black leading-none select-none">SALARY</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              {pageContent.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight font-sans">
              {pageContent.title}
            </h1>
            <p className="text-slate-200 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl font-medium font-sans">
              {pageContent.intro}
            </p>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Rich Articles, Comparison Tables */}
          <div className="lg:col-span-7 space-y-10 text-slate-700">
            
            {/* More Intro if present */}
            {pageContent.moreIntro && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <p className="text-sm text-slate-650 leading-relaxed font-sans font-medium text-justify">
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
                      <span className="w-1.5 h-6 bg-cyan-600 rounded-full"></span>
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

            {/* Core Features highlights */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-cyan-600 rounded-full"></span>
                {pageContent.highlightsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {pageContent.highlights.map((feat, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-xl p-4 hover:border-cyan-100 hover:bg-cyan-50/10 transition-colors">
                    <h4 className="font-bold text-slate-800 text-sm mb-2">{feat.label}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-sans">{feat.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison table */}
            {pageContent.matrixTableRows && pageContent.matrixTableHeaders && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">{pageContent.matrixTableTitle}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        {pageContent.matrixTableHeaders.map((header, idx) => (
                          <th key={idx} className="p-3 font-semibold text-slate-700">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pageContent.matrixTableRows.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="p-3 font-bold text-slate-800 flex items-center gap-2">
                            <Landmark className="w-4 h-4 text-cyan-600 flex-shrink-0" />
                            {row.payLevel}
                          </td>
                          <td className="p-3 font-semibold text-slate-700">{row.entryPay}</td>
                          <td className="p-3 text-slate-500 font-sans font-medium">{row.gradePay}</td>
                          <td className="p-3 font-bold text-cyan-600">{row.fitmentSalary}</td>
                          <td className="p-3 text-slate-500 font-sans font-medium">{row.allowances}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Step checklist block */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6">{pageContent.checklistTitle}</h3>
              <div className="space-y-4">
                {pageContent.checklist.map((tip, idx) => (
                  <div key={idx} className="flex gap-4 items-start pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className="w-6 h-6 bg-cyan-50 text-cyan-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-semibold font-sans">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro-Innovations panel */}
            <div className="bg-gradient-to-br from-cyan-950 to-indigo-950 rounded-3xl text-white p-6 sm:p-8 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Pay Matrix Innovations
              </h3>
              <p className="text-xs text-cyan-200 mb-6 font-sans">Maximize savings on your routine current bank transactions</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Fits Verification</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Instantly checks fitment formulas linked to government guidelines.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Percent className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Allowance Track</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Reconciles active DA rates with national retail inflation grids.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Play className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Government Loans</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Examines maximum borrow brackets for premium housing loans.</p>
                </div>
              </div>
            </div>

            {/* FAQs Block */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-cyan-600" />
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
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-cyan-600' : ''}`} />
                    </button>
                    {activeFaq === index && (
                      <div className="p-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-white leading-relaxed font-sans">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Cibil lead form */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <CibilCheckerForm sourcePage={`${pageContent.title} Portal`} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default DynamicSalaryPage;
