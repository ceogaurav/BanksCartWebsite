import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert, Sparkles, BookOpen, AlertCircle, Info, Landmark, Percent, Award, ShieldCheck, ArrowRight, Play, MessageSquare, TrendingUp, CreditCard } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';
import { INVESTMENT_PAGE_MAP, InvestmentPageContent, InvestmentRecommendRow } from '../../data/investmentPageData';
import { getNewPageDetailedContent } from '../../data/newPagesDetailedData';


interface EditorialArticle {
  title: string;
  content: string[];
}

const getInvestmentDetailedArticles = (categoryType: string, slug: string): EditorialArticle[] => {
  const formatSlug = (s: string) => {
    if (s === 'fd') return 'Fixed Deposit';
    if (s === 'mf' || s === 'mutual-funds') return 'Mutual Funds';
    return s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };
  const readableName = formatSlug(slug);
  const readableCategory = formatSlug(categoryType);

  // If zero-coupon-bonds is selected, load the complete, rich zero-coupon bonds article to match sample!
  if (slug === 'zero-coupon-bonds') {
    return [
      {
        title: "What are Zero Coupon Bonds in India?",
        content: [
          "Zero-coupon bonds (ZCB), as the name suggests, do not pay any coupon interest payments to the bondholders during the active lifecycle of the debt. These bonds are also known as discount bonds as they are issued at a price lower than the face value (or par value) and are repaid in full at face value on their maturity dates. The return to the investor is strictly the difference between the face value of the bond and its purchase price.",
          "For instance, if you purchase a zero-coupon bond in India having a face value of ₹20,000 at a discounted booking price of ₹18,000, then on its maturity date, you will receive the full ₹20,000. The ₹2,000 differential represents your absolute tax-efficient returns on the bond. This guide outlines how zero-coupon bonds work, their benefits, risks, and how they differ from regular coupon-paying bonds."
        ]
      },
      {
        title: "How to Calculate the Yield to Maturity (YTM) of Zero Coupon Bonds?",
        content: [
          "The Yield to Maturity (YTM) represents the annualized rate of return received if an investor purchases a bond and holds it strictly until maturity. For zero-coupon bonds, the formula for YTM calculations is straightforward since there are no periodic coupon receipts to reinvest:",
          "YTM = (FV / PV) ^ (1 / t) - 1. Here, 'FV' represents the future value (face value) of the bond, 'PV' indicates the present value (discounted purchase price) of the bond, and 't' represents the number of compounding periods or years to maturity. By calculating YTM, investors can compare ZCB yields side-by-side with commercial fixed deposits and corporate bonds."
        ]
      },
      {
        title: "Why Invest in Zero Coupon Bonds in India?",
        content: [
          "Compounded Growth: As zero-coupon bonds are issued at a discount and fully redeemed at face value on the maturity date, investors benefit from compounded growth because of no periodic interest payments. Reinvestment risk refers to the possibility of the investor not being able to reinvest coupon payments at a rate equivalent to their current rate of return. Since ZCBs carry zero periodic payouts, all returns compound automatically, eliminating reinvestment risks.",
          "Predictable Returns & Tax Efficiency: These bonds offer a fixed payout on their maturity dates, allowing retail savers to easily align investments with long-term financial goals. Additionally, returns generated from ZCBs are derived solely from capital gains, not interest income. As long-term capital gains (LTCG) on listed bonds are taxed at highly efficient rates of just 12.5%, zero-coupon bonds offer significantly higher post-tax yields than standard FDs for taxpayers in the high 30% slabs."
        ]
      },
      {
        title: "Understanding Risks: Interest Rates, Liquidity, and Credit Ratings",
        content: [
          "Interest Rate & Liquidity Risks: Bond prices are inversely related to market interest rates. If interest rates rise, the value of the zero-coupon bond may fall in the secondary market. However, investors can eliminate this risk completely by holding the bond until maturity. Liquidity risk refers to the difficulty of finding enough buyers on public exchanges if you need early exits.",
          "Credit Risk Mitigation: Credit risk refers to the possibility of the bond issuer defaulting on its final redemption repayments. Before investing, savers should check credit ratings assigned by SEBI-registered rating agencies (like CRISIL, ICRA) to evaluate the creditworthiness of corporate issuances."
        ]
      },
      {
        title: "Zero Coupon Bonds vs Coupon Paying Bonds",
        content: [
          "Interest Payments: ZCBs have no periodic coupon payments, while coupon-paying bonds pay periodic interest (monthly, quarterly, or annually). ZCBs are always issued at a discount to face value, whereas coupon bonds can be issued at face value, discount, or premium.",
          "Reinvestment risk applies heavily on the periodic coupon payments of regular bonds, whereas ZCBs completely bypass this risk by locking in all compounding returns until the final redemption date."
        ]
      },
      {
        title: "Market & Regulation Trends: Corporate Placements & STRIPS",
        content: [
          "Under recent SEBI and CBDT guidelines for 2026, leading public undertakings like NABARD and HUDCO have notified massive zero-coupon bond issues to raise capital for agricultural and infrastructure developments. SEBI now permits issuers to issue zero-coupon bonds in smaller denominations of ₹10,000 on a private placement basis, broadening retail participation in the debt market.",
          "Role of STRIPS: Separate Trading of Registered Interest and Principal of Securities (STRIPS) is a process where the final principal and periodic interest cash flows of standard bonds are separated into individual securities. These separated cash flows are then sold as independent zero-coupon bonds on secondary exchanges, providing highly flexible wealth-building tools."
        ]
      }
    ];
  }

  return [
    {
      title: `Understanding ${readableName} under the ${readableCategory} Asset Class`,
      content: [
        `Securing stable growth and protecting accumulated capital under the broader spectrum of **${readableName}** is vital to ensure long-term wealth compounding. In a dynamically shifting macroeconomic landscape regulated closely by SEBI and the Reserve Bank of India (RBI), retail investors must compare baseline rate matrices carefully before committing capital. Unlike volatile equity shares, ${readableCategory} products provide a structured framework to grow your wealth with balanced risks.`,
        `By utilizing BanksCart's modern side-by-side comparison engine, you can review current annual yields (starting from competitive baseline interest brackets), lock-in tenures, and security credit ratings across India's top public and private sector issuers. This digital onboarding process allows you to configure automated monthly SIPs or lump-sum deposits online with complete transparency.`
      ]
    },
    {
      title: `Compounding and Asset Allocation: Maximizing Long-Term Yields`,
      content: [
        `When allocating capital to **${readableName}**, understanding the difference between simple interest and compounded growth is essential. Standard savings bank accounts struggle to outpace inflation, which is why disciplined compounding is crucial. Debt mutual funds and fixed deposits reinvest interest at regular intervals (typically quarterly), compounding your capital over time.`,
        `For market-linked mutual funds, active portfolio managers distribute assets across diversified baskets of blue-chip stocks and AAA-rated corporate bonds. This broad diversification minimizes single-company default risks, helping savers achieve specific lifecycle milestones (like retirement funds or college admissions) with high predictability.`
      ]
    },
    {
      title: `Strategic Tax Exemptions under Section 80C and 10(10D)`,
      content: [
        `Tax efficiency is a key pillar of professional wealth management. Several government-backed savings plans under the **${readableName}** category qualify for 100% tax deductions of up to ₹1.5 Lakhs annually under Section 80C of the Income Tax Act. More importantly, long-term capital gains on listed bonds and debt securities are taxed at highly efficient rates of just 12.5%, significantly outperforming taxable interest slabs.`,
        `Additionally, specific tax-saving fixed deposits and pension funds qualify for tax-exempt withdrawals at maturity under Section 10(10D), offering high post-tax yields that make them the premier choice for taxpayers in the high income slabs.`
      ]
    }
  ];
};

const DynamicInvestmentPage: React.FC = () => {
  const { type: paramType, subPath } = useParams<{ type: string; subPath: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Extract type from pathname if not provided in params (supports flat URLs)
  let type = paramType;
  if (!type) {
    if (location.pathname.startsWith('/bonds/')) {
      type = 'bonds';
    } else if (location.pathname.startsWith('/mutual-funds/')) {
      type = 'mutual-funds';
    } else {
      type = 'mutual-funds';
    }
  }

  // Helper to convert slug/subPath to a readable title
  const formatSlug = (slug: string) => {
    if (slug === 'fd') return 'Fixed Deposit';
    if (slug === 'mf' || slug === 'mutual-funds') return 'Mutual Funds';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Safe fallback procedural content generator for 100% coverage of all 25 paths
  const generateFallbackContent = (categoryType: string, slug: string): InvestmentPageContent => {
    const readableCategory = formatSlug(categoryType);
    const readableSlug = formatSlug(slug);
    
    let customIntro = `Investing in **${readableSlug}** offers a structured mechanism to compound your hard-earned wealth. Under the broader spectrum of **${readableCategory}** investments, this asset represents a core addition to ensure stable capital growth and secure financial objectives. ${categoryType === 'bonds' && slug === 'zero-coupon-bonds' ? 'Zero-coupon bonds are issued at a discount and redeemed at face value, with returns generated solely from the price differential.' : ''}`;
    
    let keyFeaturesList = [
      { label: "Yield Potential", text: `Secure top-tier market interest or dividend payouts by choosing highly rated ${readableCategory} assets.` },
      { label: "Risk Mitigation", text: "Benefit from structured asset allocations, regulatory safety, and professional fund audits." },
      { label: "Goal Alignment", text: "Select customized horizons ranging from overnight liquidity reserves to long-term retirement corpora." }
    ];

    let recommendList: InvestmentRecommendRow[] = [
      { name: "Aditya Birla Active", issuer: "Aditya Birla Capital", returns: "18.50% p.a.", lockIn: "No Lock-in" },
      { name: "SBI Magnum Balanced", issuer: "State Bank of India", returns: "14.20% p.a.", lockIn: "No Lock-in" },
      { name: "ICICI Prudential Asset", issuer: "ICICI Group", returns: "15.80% p.a.", lockIn: "No Lock-in" },
      { name: "HDFC Hybrid Debt", issuer: "HDFC Fund House", returns: "9.20% p.a.", lockIn: "36 Months" }
    ];

    let checklistList = [
      `Validate credit safety: Prioritize AAA or Government-backed ${readableCategory} platforms to shield your principal.`,
      "Analyze Expense Ratios: Lower operational overheads translate to higher net compounding yields over time.",
      "Track lock-in schedules: Match asset liquidity profiles against your short-term emergency outgos."
    ];

    let customFAQs = [
      { q: `What is ${readableSlug}?`, a: `${readableSlug} represents a premium asset class structured to build wealth, generate fixed income, or leverage equity growth under the ${readableCategory} framework.` },
      { q: "What is the recommended minimum investment tenure?", a: "Conservative debt plans perform optimally over 1 to 3 years. Active equity portfolios are recommended for horizons of 5+ years." },
      { q: "Is there any entry load charged on my investments?", a: "No. SEBI has completely banned entry loads on Indian mutual funds. All deposits are routed at 100% NAV value." },
      { q: "How is my investment interest or dividend taxed?", a: "Taxation depends on the asset class and holding period. Short-term gains are added to tax slabs, while long-term gains enjoy concessional tax rates." },
      { q: "Can I automate monthly investment plans?", a: "Yes. You can configure automatic monthly standing instructions or SIP mandates directly through your net banking portal." },
      { q: "Are my capital investments secure?", a: "Sovereign gold and bank FDs enjoy sovereign guarantees. Corporate debt and mutual funds fluctuate with markets but carry strict SEBI security buffers." },
      { q: "Can I withdraw my money in emergency situations?", a: "Yes, most liquid investments support T+1 working day redemption. Specific tax-saving or locked FDs carry early exit penalties." },
      { q: "How do I monitor my portfolio performance?", a: "You can track your real-time portfolio, NAV growth, and capital statements digitally 24/7 on the BanksCart user dashboard." },
      { q: "What is the compounding frequency?", a: "FDs and corporate deposits compound quarterly. Debt and equity mutual fund values update daily based on index changes." },
      { q: "What is the maximum investment limit?", a: "There is no upper limit on standard fixed deposits or mutual fund schemes. Sovereign gold bonds restrict individuals to 4 kg annually." }
    ];

    // Mapped content overrides based on categories
    if (categoryType === 'bonds') {
      customIntro = `**${readableSlug}** represents a premium debt instrument designed to secure your financial future through highly predictable, periodic interest coupons. Investing in these bonds provides unmatched capital insulation from stock market drops.`;
      keyFeaturesList = [
        { label: "Sovereign Backing", text: "Secure 100% default-free interest payouts by investing in Government of India securities." },
        { label: "Secondary Trading", text: "Listed bonds can be bought or sold easily on public stock exchanges via your demat account." },
        { label: "Regular Cashflows", text: "Receive timely interest payouts directly to your registered bank account semi-annually." }
      ];
      recommendList = [
        { name: "NHAI Tax-Free Bonds", issuer: "Govt Undertaking", returns: "5.50% (Tax Exempt)", lockIn: "10 Years" },
        { name: "Sovereign Gold Bonds", issuer: "Reserve Bank of India", returns: "2.50% + Gold Gain", lockIn: "8 Years" },
        { name: "SIDBI Secured NCDs", issuer: "SIDBI Bank", returns: "7.95% p.a.", lockIn: "36 Months" },
        { name: "REC Corporate Bond", issuer: "Rural Electr. Corp", returns: "8.10% p.a.", lockIn: "60 Months" }
      ];
    } else if (categoryType === 'fd') {
      customIntro = `A **${readableSlug}** is an exceptionally safe financial asset offered by commercial banks to generate locked-in interest rates on your capital. It remains unaffected by benchmark stock indices, making it the most trusted savings tool in India.`;
      keyFeaturesList = [
        { label: "Zero Market Risk", text: "Your interest yield is locked immediately at booking and never declines due to interest rate cuts." },
        { label: "Overdraft Limit", text: "Avail instant credit lines or overdrafts up to 90% of your deposit value to resolve cash needs." },
        { label: "Senior Citizen Concessions", text: "Senior citizens qualify for up to 0.75% additional yields across all tenures." }
      ];
      recommendList = [
        { name: "SBI FD Scheme", issuer: "State Bank of India", returns: "7.00% to 7.50%", lockIn: "12 to 60 Months" },
        { name: "HDFC Regular Deposit", issuer: "HDFC Bank", returns: "7.25% to 7.75%", lockIn: "18 to 36 Months" },
        { name: "Unity SFB Premium", issuer: "Unity Small Finance", returns: "8.50% to 9.00%", lockIn: "1001 Days" },
        { name: "Bajaj Finserv FD", issuer: "Bajaj Finance Ltd", returns: "8.05% to 8.40%", lockIn: "24 to 60 Months" }
      ];
    } else if (categoryType === 'mutual-funds') {
      customIntro = `**${readableSlug}** is a premium pooled investment scheme designed to optimize market equity and debt returns. Managed by certified Fund Managers, this fund offers a smart, diversified route to outpace long-term inflation.`;
      keyFeaturesList = [
        { label: "Broad Diversification", text: "Minimize company-specific crashes by distributing capital across a basket of top stocks." },
        { label: "Direct Plan Savings", text: "Invest in zero-commission Direct plans to compound 1.5% extra returns yearly." },
        { label: "Rupee Cost Averaging", text: "SIP automation continuously buys more units during market dips, lowering average costs." }
      ];
      recommendList = [
        { name: "Quant Active Direct Fund", issuer: "Quant AMC", returns: "24.50% p.a.", lockIn: "No Lock-in" },
        { name: "Parag Parikh Flexi Cap", issuer: "Parag Parikh AMC", returns: "21.20% p.a.", lockIn: "No Lock-in" },
        { name: "SBI Contra Direct Plan", issuer: "SBI Mutual Fund", returns: "22.80% p.a.", lockIn: "No Lock-in" },
        { name: "Canara Robeco Small Cap", issuer: "Canara Robeco AMC", returns: "26.90% p.a.", lockIn: "No Lock-in" }
      ];
    }

    return {
      title: `${readableSlug} Guide`,
      badge: "Premium Investment Hub",
      intro: customIntro,
      keyFeaturesTitle: `${readableSlug} Key Highlights`,
      keyFeatures: keyFeaturesList,
      recommendTitle: `Top Recommended ${readableSlug} Options`,
      recommendHeaders: ["Investment Asset", "Issuing Entity / Bank", "Average Annual Yield", "Lock-in Period"],
      recommendDetails: recommendList,
      checklistTitle: "Investor Action Checklist",
      checklist: checklistList,
      faqs: customFAQs
    };
  };

  const newPageData = getNewPageDetailedContent(location.pathname);

  const pageContent = newPageData ? {
    title: newPageData.title,
    badge: newPageData.badge,
    intro: newPageData.intro,
    moreIntro: newPageData.moreIntro || '',
    keyFeaturesTitle: newPageData.highlightsTitle,
    keyFeatures: newPageData.highlights,
    recommendTitle: newPageData.ratesTitle,
    recommendHeaders: newPageData.ratesHeaders,
    recommendDetails: newPageData.ratesRows.map(row => ({
      name: row[0],
      issuer: row[1],
      returns: row[2],
      lockIn: row[3] || 'No Lock-in'
    })),
    checklistTitle: newPageData.checklistTitle,
    checklist: newPageData.checklist,
    faqs: newPageData.faqs
  } : (INVESTMENT_PAGE_MAP[currentSlug] || generateFallbackContent(type || 'mutual-funds', subPath || 'overview'));

  const detailedArticles = newPageData?.detailedArticles
    ? newPageData.detailedArticles
    : getInvestmentDetailedArticles(type || 'mutual-funds', subPath || 'overview');


  // Scroll to top on path parameter change
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveFaq(null);
  }, [type, subPath]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner header */}
        <div className="bg-gradient-to-r from-indigo-700 via-violet-700 to-indigo-800 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[200px] font-black leading-none select-none">INVEST</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              {pageContent.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight">
              {pageContent.title}
            </h1>
            <p className="text-indigo-100 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl font-medium">
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
                <p className="text-sm text-slate-650 leading-relaxed font-sans font-medium">
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

            {/* Key Features Block */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                {pageContent.keyFeaturesTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {pageContent.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-xl p-4 hover:border-indigo-100 transition-colors">
                    <h4 className="font-bold text-slate-800 text-sm mb-2">{feat.label}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-semibold">{feat.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Investment Comparison Table */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">{pageContent.recommendTitle}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      {pageContent.recommendHeaders.map((header, idx) => (
                        <th key={idx} className="p-3 font-semibold text-slate-700">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pageContent.recommendDetails.map((row, idx) => (
                      <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="p-3 font-bold text-slate-800">{row.name}</td>
                        <td className="p-3 font-semibold text-slate-600">{row.issuer}</td>
                        <td className="p-3 text-emerald-600 font-bold">{row.returns}</td>
                        <td className="p-3 text-slate-500 font-semibold">{row.lockIn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6">{pageContent.checklistTitle}</h3>
              <div className="space-y-4">
                {pageContent.checklist.map((tip, idx) => (
                  <div key={idx} className="flex gap-4 items-start pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-semibold">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech innovations panel */}
            <div className="bg-gradient-to-br from-indigo-950 to-purple-950 rounded-3xl text-white p-6 sm:p-8 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Active Portfolio Management
              </h3>
              <p className="text-xs text-indigo-200 mb-6 font-medium">Verify yields and configure smart investments in seconds</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Play className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">SIP Calculator</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed">Simulate long-term wealth growth based on compounding interest rates.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Yield Comparator</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed">Instantly verify top bank FD interest rates against AAA rated bonds.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Wealth Advisor</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed">Get custom investment options matching your risk limits digitally.</p>
                </div>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
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
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-indigo-600' : ''}`} />
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

export default DynamicInvestmentPage;
