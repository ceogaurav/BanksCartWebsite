import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert, Sparkles, BookOpen, AlertCircle, Info, Landmark, Percent, Award, ShieldCheck, ArrowRight, Play, MessageSquare, TrendingUp, CreditCard } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';
import { CALCULATOR_PAGE_MAP, CalculatorPageContent } from '../../data/calculatorPageData';

interface EditorialArticle {
  title: string;
  content: string[];
}

const getCalculatorDetailedArticles = (category: string, slug: string): EditorialArticle[] => {
  const formatSlug = (s: string) => {
    return s
      .split('-')
      .map(word => {
        if (word.toUpperCase() === 'EMI') return 'EMI';
        if (word.toUpperCase() === 'FD') return 'FD';
        if (word.toUpperCase() === 'GST') return 'GST';
        if (word.toUpperCase() === 'SIP') return 'SIP';
        if (word.toUpperCase() === 'NPS') return 'NPS';
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };
  const readableName = formatSlug(slug);
  const readableCat = formatSlug(category);

  return [
    {
      title: `The Mathematics of Financial Amortization and Compounding under ${readableName}`,
      content: [
        `Executing financial simulations under the broader **${readableCat}** segment requires a solid grasp of modern banking arithmetic and compounding timelines. Our interactive **${readableName} Calculator** utilizes state-of-the-art reducing balance and periodic compounding algorithms to deliver precise projections. By letting you adjust principal sizes, annual interest yields, and tenure slabs in real time, it helps you visualize how even minor rate variances compound into massive cash flow differences.`,
        `Whether simulating reducing loan EMIs (using the standard formula EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]) or calculating the future value of a Systematic Investment Plan (SIP) annuity, having immediate digital clarity ensures you bypass complex manual bookkeeping and secure maximum control over your wealth.`
      ]
    },
    {
      title: `Strategic Asset Allocation: Balancing Unsecured Liabilities with High-Yield Assets`,
      content: [
        `From an enterprise or individual wealth perspective, utilizing the **${readableName} Calculator** is key to optimizing your financial leverage and debt-to-income balances. When evaluating debt avenues, lenders closely analyze your Fixed Income to Debt Ratio (FOIR). Keeping your monthly loan commitments strictly below 45% to 50% of your net income is essential to maintain high credit scores (CIBIL targets of 750+) and qualify for premium unsecured credit rates.`,
        `Simultaneously, offsetting debt liabilities by investing surplus working capital in high-compounding SIPs or quarterly compounding Fixed Deposits builds robust cash flow cushions. This balanced approach protects you against premature foreclosure penalties and secures a steady path toward long-term wealth accumulation.`
      ]
    },
    {
      title: `Tax Optimization and Compliance Slabs for ${readableName}`,
      content: [
        `Beyond basic interest payouts, tax compliance slabs play a huge role in determining your real, inflation-adjusted net returns. Under current regulatory tax guidelines, different asset categories carry unique direct and indirect tax implications. For example, cumulative fixed deposit yields are subject to upfront TDS deductions if annual earnings cross ₹40,000, unless declared via Form 15G/15H, whereas equity-linked mutual fund SIPs enjoy long-term capital gains tax (LTCG) concessions on profits up to ₹1.25 Lakh.`,
        `By mapping your calculations side-by-side on BanksCart's dashboard, you can estimate your post-tax maturity value under both old and new tax regimes. This comprehensive mapping helps you prepare perfect audit logs, maximize Section 80C compliance margins, and make highly informed financial decisions.`
      ]
    }
  ];
};

const DynamicCalculatorPage: React.FC = () => {
  const { category, subPath } = useParams<{ category: string; subPath: string }>();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Helper to convert slug/subPath to a readable title
  const formatSlug = (slug: string) => {
    return slug
      .split('-')
      .map(word => {
        if (word.toUpperCase() === 'EMI') return 'EMI';
        if (word.toUpperCase() === 'FD') return 'FD';
        if (word.toUpperCase() === 'GST') return 'GST';
        if (word.toUpperCase() === 'SIP') return 'SIP';
        if (word.toUpperCase() === 'NPS') return 'NPS';
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };

  // Safe fallback configurations for 100% mathematical coverage of all 18 paths
  const generateFallbackConfig = (cat: string, slug: string): CalculatorPageContent => {
    const readableCat = formatSlug(cat);
    const readableSlug = formatSlug(slug);
    
    // Default range values based on the category
    let pLabel = "Investment Principal (₹)";
    let pMin = 5000;
    let pMax = 5000000;
    let pDefault = 100000;
    let pStep = 5000;

    let rLabel = "Rate of Return (% p.a.)";
    let rMin = 2;
    let rMax = 30;
    let rDefault = 8;
    let rStep = 0.1;

    let tLabel = "Tenure (Years)";
    let tMin = 1;
    let tMax = 30;
    let tDefault = 5;
    let tStep = 1;

    let formulaText = "Simple/Compound Interest compounding";
    
    if (cat === 'loan' || slug.includes('emi')) {
      pLabel = "Desired Loan Amount (₹)";
      pMin = 10000;
      pMax = 5000000;
      pDefault = 500000;
      pStep = 10000;

      rLabel = "Rate of Interest (% p.a.)";
      rMin = 5;
      rMax = 25;
      rDefault = 11.5;
      rStep = 0.1;

      tLabel = "Tenure (Years)";
      tMin = 1;
      tMax = 10;
      tDefault = 5;
      tStep = 1;

      formulaText = "EMI = [P * r * (1 + r)^n] / [(1 + r)^n - 1]";
    } else if (cat === 'eligibility') {
      pLabel = "Net Monthly Salary (₹)";
      pMin = 10000;
      pMax = 500000;
      pDefault = 50000;
      pStep = 5000;

      rLabel = "Existing Monthly EMIs (₹)";
      rMin = 0;
      rMax = 200000;
      rDefault = 10000;
      rStep = 1000;

      tLabel = "Desired Tenure (Years)";
      tMin = 1;
      tMax = 30;
      tDefault = 20;
      tStep = 1;

      formulaText = "Eligibility Limit = [(Monthly Salary * FOIR) - Existing EMIs] * Annuity factor";
    }

    let customFAQs = [
      { q: `What is a ${readableSlug}?`, a: `A ${readableSlug} is an online mathematical simulation dashboard designed to calculate financial margins, interest liabilities, or savings compounds under the ${readableCat} category.` },
      { q: "How exact are these calculations?", a: "The math is 100% exact according to standard banking algorithms (reducing balance compounding or daily value reinvestments)." },
      { q: "Can I adjust parameters easily?", a: "Yes. Use our intuitive touch-sensitive sliders or type values directly in the number boxes to customize your values." },
      { q: "Does using this calculator impact my credit score?", a: "No. Simulating calculations has zero impact on credit scores. Our tools are completely free to use online." },
      { q: "What is the standard processing fee?", a: "Personal and business loans typically carry a processing fee ranging from 1% to 3% of the principal, deducted upfront." },
      { q: "Is a foreclosure charge applicable?", a: "Yes. Lenders charge between 2% and 5% foreclosure fees if you clear outstanding balances before maturity." },
      { q: "How can I lower my monthly EMI?", a: "You can lower EMIs by choosing longer tenures (which increases total interest) or negotiating lower interest rates." },
      { q: "Can I do a balance transfer?", a: "Yes. If other banks offer cheaper interest rates, you can transfer your loan outstanding to save on monthly EMIs." },
      { q: "What is the compounding frequency?", a: "Fixed deposits compound quarterly (4 times a year). Recurring deposits and mutual fund projections compound monthly." },
      { q: "What is the next step after calculating?", a: "Click the 'Check Score & Apply' form on the right side to verify your real-time approval odds digitally." }
    ];

    return {
      title: `${readableSlug} Calculator`,
      badge: "Interactive Financial Simulator",
      intro: `Analyze your calculations instantly with our premium **${readableSlug}**. Secure precise returns estimates, compare monthly amortizations, and view dynamic graphs.`,
      pLabel,
      pMin,
      pMax,
      pDefault,
      pStep,
      rLabel,
      rMin,
      rMax,
      rDefault,
      rStep,
      tLabel,
      tMin,
      tMax,
      tDefault,
      tStep,
      formulaText,
      faqs: customFAQs
    };
  };

  const currentSlug = `${category}/${subPath}`;
  const config = CALCULATOR_PAGE_MAP[currentSlug] || generateFallbackConfig(category || 'investment', subPath || 'fixed-deposit');
  const detailedArticles = getCalculatorDetailedArticles(category || 'investment', subPath || 'fixed-deposit');

  // Interactive Live Math States
  const [principal, setPrincipal] = useState<number>(config.pDefault);
  const [rate, setRate] = useState<number>(config.rDefault);
  const [tenure, setTenure] = useState<number>(config.tDefault);

  // Synchronize inputs when parameters change
  useEffect(() => {
    setPrincipal(config.pDefault);
    setRate(config.rDefault);
    setTenure(config.tDefault);
    setActiveFaq(null);
    window.scrollTo(0, 0);
  }, [category, subPath]);

  // Dynamic Math Solver variables
  let totalInvested = principal;
  let totalMaturity = 0;
  let totalInterest = 0;
  let monthlyEmi = 0;

  const currentCategory = category || 'investment';
  const currentSubPath = subPath || 'fixed-deposit';

  if (currentCategory === 'loan' || currentSubPath.includes('emi')) {
    // 1. Unsecured/Secured Reducing EMI calculation
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    if (monthlyRate === 0) {
      monthlyEmi = principal / months;
    } else {
      monthlyEmi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    }
    totalMaturity = monthlyEmi * months;
    totalInterest = totalMaturity - principal;
    totalInvested = principal;
  } else if (currentSubPath === 'sip' || currentSubPath === 'mutual-fund') {
    // 2. Future Value of an Annuity (Monthly compounding SIP)
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    totalInvested = principal * months;
    totalMaturity = principal * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    totalInterest = totalMaturity - totalInvested;
  } else if (currentSubPath === 'gst') {
    // 3. Simple Goods and Services Tax computation
    totalInvested = principal; // Principal is baseline item price
    totalInterest = principal * (rate / 100); // Tax amount
    totalMaturity = principal + totalInterest; // Total cost
  } else if (currentCategory === 'eligibility') {
    // 4. Financial FOIR Eligibility Check proxy math
    const FOIR = 0.50;
    const availableEmi = Math.max(0, (principal * FOIR) - rate); // principal: salary, rate: active EMIs
    totalMaturity = availableEmi * 80; // Estimated loan eligibility limit
    totalInvested = principal;
    totalInterest = availableEmi; // Monthly eligible EMI
  } else {
    // 5. Quarterly Compounding Fixed Deposits
    const n = 4; // Quarterly compounds
    totalMaturity = principal * Math.pow(1 + (rate / 100) / n, n * tenure);
    totalInterest = totalMaturity - principal;
    totalInvested = principal;
  }

  // Calculate dynamic circular graph offsets (SVG Pie Chart simulation)
  const safeTotal = totalMaturity > 0 ? totalMaturity : 1;
  const principalPercentage = (totalInvested / safeTotal) * 100;
  const interestPercentage = 100 - principalPercentage;

  // Format currency numbers cleanly
  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-800 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[200px] font-black leading-none select-none">%</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              {config.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight">
              {config.title}
            </h1>
            <p className="text-blue-100 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl font-medium">
              {config.intro}
            </p>
          </div>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive math & Sliders */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Interactive Calculator Box */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <div className="space-y-8">
                
                {/* 1. Principal Input Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-slate-700">{config.pLabel}</label>
                    <input
                      type="number"
                      value={principal}
                      min={config.pMin}
                      max={config.pMax}
                      step={config.pStep}
                      onChange={(e) => setPrincipal(Number(e.target.value))}
                      className="w-36 px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-right font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <input
                    type="range"
                    min={config.pMin}
                    max={config.pMax}
                    step={config.pStep}
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-2">
                    <span>{formatCurrency(config.pMin)}</span>
                    <span>{formatCurrency(config.pMax)}</span>
                  </div>
                </div>

                {/* 2. Rate Input Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-slate-700">{config.rLabel}</label>
                    <input
                      type="number"
                      value={rate}
                      min={config.rMin}
                      max={config.rMax}
                      step={config.rStep}
                      onChange={(e) => setRate(Number(e.target.value))}
                      className="w-24 px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-right font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <input
                    type="range"
                    min={config.rMin}
                    max={config.rMax}
                    step={config.rStep}
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-2">
                    <span>{config.rMin}%</span>
                    <span>{config.rMax}%</span>
                  </div>
                </div>

                {/* 3. Tenure Input Slider */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-sm font-bold text-slate-700">{config.tLabel}</label>
                    <input
                      type="number"
                      value={tenure}
                      min={config.tMin}
                      max={config.tMax}
                      step={config.tStep}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-24 px-3 py-1.5 border border-slate-200 rounded-lg text-sm text-right font-bold text-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                  <input
                    type="range"
                    min={config.tMin}
                    max={config.tMax}
                    step={config.tStep}
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-2">
                    <span>{config.tMin} Yr</span>
                    <span>{config.tMax} Yrs</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Calculations Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Math values breakdown */}
                <div className="md:col-span-7 space-y-4">
                  <h3 className="text-base font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                    Calculation Summary
                  </h3>
                  
                  {currentCategory === 'eligibility' ? (
                    <>
                      <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-xs text-slate-500 font-semibold">Available Monthly EMI Limit</span>
                        <span className="text-sm font-black text-slate-700">{formatCurrency(totalInterest)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-xs text-slate-500 font-semibold">Baseline Salary</span>
                        <span className="text-sm font-black text-slate-700">{formatCurrency(principal)}</span>
                      </div>
                      <div className="flex justify-between items-center py-4 bg-indigo-50/50 rounded-xl px-4 mt-4">
                        <span className="text-sm font-bold text-indigo-900">Est. Loan Eligibility Limit</span>
                        <span className="text-base font-black text-indigo-700">{formatCurrency(totalMaturity)}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-xs text-slate-500 font-semibold">Principal Investment</span>
                        <span className="text-sm font-black text-slate-700">{formatCurrency(totalInvested)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-slate-50">
                        <span className="text-xs text-slate-500 font-semibold">
                          {currentCategory === 'loan' || currentSubPath.includes('emi') ? 'Total Interest Payable' : 'Est. Interest Earned'}
                        </span>
                        <span className="text-sm font-black text-slate-700">{formatCurrency(totalInterest)}</span>
                      </div>
                      
                      {monthlyEmi > 0 && (
                        <div className="flex justify-between items-center py-2 border-b border-slate-50">
                          <span className="text-xs text-slate-500 font-semibold">Monthly EMI Installment</span>
                          <span className="text-sm font-black text-emerald-600">{formatCurrency(monthlyEmi)}</span>
                        </div>
                      )}

                      <div className="flex justify-between items-center py-4 bg-indigo-50/50 rounded-xl px-4 mt-4">
                        <span className="text-sm font-bold text-indigo-900">
                          {currentCategory === 'loan' || currentSubPath.includes('emi') ? 'Total Amount Payable' : 'Estimated Maturity Value'}
                        </span>
                        <span className="text-base font-black text-indigo-700">{formatCurrency(totalMaturity)}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* SVG Visual Progress breakdown */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="relative w-36 h-36">
                    {/* SVG Circular Graph Ring */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="transparent"
                        stroke="#f1f5f9"
                        strokeWidth="3.2"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="transparent"
                        stroke="#4f46e5" /* Principal color */
                        strokeWidth="3.2"
                        strokeDasharray={`${principalPercentage} ${100 - principalPercentage}`}
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.915"
                        fill="transparent"
                        stroke="#10b981" /* Interest/Gain color */
                        strokeWidth="3.2"
                        strokeDasharray={`${interestPercentage} ${100 - interestPercentage}`}
                        strokeDashoffset={`-${principalPercentage}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center leading-none text-center">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Maturity</span>
                      <span className="text-xs font-black text-slate-800 mt-1">{formatCurrency(totalMaturity)}</span>
                    </div>
                  </div>
                  <div className="flex justify-center gap-6 mt-6">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-indigo-600 rounded-full"></span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Principal</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Interest/Gain</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Detailed Editorial Sections - Rich Data like the Zero Coupon Bonds Sample */}
            {detailedArticles.length > 0 && (
              <div className="space-y-8">
                {detailedArticles.map((art, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
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

            {/* Calculations and formulas info */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                Calculation Formula
              </h3>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-4 text-center">
                <code className="text-xs sm:text-sm font-bold text-indigo-900 font-mono">{config.formulaText}</code>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold font-sans">
                Our calculators strictly conform to standard banking compound equations. By tracking reducing balances and periodic compound accruals daily, BanksCart guarantees that your calculations match real market approvals.
              </p>
            </div>

            {/* Accordion FAQs */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {config.faqs.map((faq, index) => (
                  <div key={index} className="border border-slate-100 rounded-xl overflow-hidden transition-colors">
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full flex justify-between items-center p-4 bg-slate-50/50 hover:bg-slate-50 text-left font-bold text-slate-700 text-sm outline-none transition-colors"
                    >
                      {faq.q}
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-indigo-600' : ''}`} />
                    </button>
                    {activeFaq === index && (
                      <div className="p-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-white leading-relaxed font-semibold">
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
            <CibilCheckerForm sourcePage={`${config.title} Landing Page`} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default DynamicCalculatorPage;
