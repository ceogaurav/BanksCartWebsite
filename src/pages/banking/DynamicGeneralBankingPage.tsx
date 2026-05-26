import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert, Sparkles, BookOpen, AlertCircle, Info, Landmark, Percent, Award, ShieldCheck, ArrowRight, Play, MessageSquare, TrendingUp, CreditCard, Send, Pocket } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';
import { GENERAL_BANKING_PAGE_MAP, BankingPageContent } from '../../data/generalBankingPageData';
import { getNewPageDetailedContent } from '../../data/newPagesDetailedData';


interface EditorialArticle {
  title: string;
  content: string[];
}

const getBankingDetailedArticles = (slug: string, content: BankingPageContent): EditorialArticle[] => {
  const formatSlug = (s: string) => s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const readableName = formatSlug(slug);
  
  return [
    {
      title: `Understanding ${content.badge || readableName} in India's Capital Markets`,
      content: [
        `Securing optimal financial parameters under the broader spectrum of **${readableName}** is vital to ensure long-term wealth compounding and business liquidity. In a dynamically shifting credit landscape regulated closely by the Reserve Bank of India (RBI) and SEBI, retail borrowers and small-scale entrepreneurs must evaluate baseline rate matrices carefully before committing capital. ${content.intro}`,
        `Modern commercial banking systems are structured to deliver rapid digital credit clearances while maintaining high solvency metrics. By comparing different interest rates, processing fees, and payment horizons side-by-side on BanksCart, you can align your investments with your personal or business cash flow requirements seamlessly.`
      ]
    },
    {
      title: `Key Advantages and Compounding Growth Potential`,
      content: [
        `When investing or borrowing under these financial portals, several key factors come into play. Standard savings or fixed-yield tools struggle to counter inflation, which is why active capital management is crucial. ${content.moreIntro || 'By leveraging structured credit structures, collateral-free loans, and subsidized interest schemes, individuals and micro-enterprises can multiply their yields and manage outstanding liabilities safely.'}`,
        `For investment schemes, interest compounds dynamically, while debt products utilize reducing balance models. This guarantees that your monthly EMI or asset yield operates with the highest capital efficiency, protecting your hard-earned wealth from inflation traps.`
      ]
    },
    {
      title: `Strategic Tax Exemptions & Regulatory Trends (2026)`,
      content: [
        `Tax planning is a core pillar of capital management. Most government-backed savings plans qualify for high tax exemptions of up to ₹1.5 Lakhs under Section 80C, while maturity returns remain 100% tax-free under Section 10(10D). For listed commercial bonds and securities, long-term capital gains (LTCG) are taxed at highly efficient rates of just 12.5%.`,
        `Furthermore, recent SEBI and CBDT guidelines for 2026 have introduced smaller denominations (as low as ₹10,000 for private corporate bonds) to encourage retail participation in the debt market, offering unparalleled security and flexible exit options for retail investors.`
      ]
    }
  ];
};

const DynamicGeneralBankingPage: React.FC = () => {
  const { subPath } = useParams<{ subPath: string }>();
  const location = useLocation();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Resolve current slug from parameters or location pathnames (for flat routes)
  let currentSlug = subPath || '';
  
  // Custom overrides for specific paths
  if (location.pathname.includes('loan-against-securities/mutual-funds/aditya-birla-finance')) {
    currentSlug = 'aditya-birla-finance-securities';
  } else if (location.pathname.includes('adtiya-birla-sbi-cards')) {
    currentSlug = 'aditya-birla-sbi-cards';
  } else if (location.pathname.includes('/gold-loan/agriculture')) {
    currentSlug = 'agriculture-gold-loan';
  } else if (!currentSlug || !GENERAL_BANKING_PAGE_MAP[currentSlug]) {
    // Try to find a matching key from the path
    const matchingKey = Object.keys(GENERAL_BANKING_PAGE_MAP).find(key => 
      location.pathname.includes(key)
    );
    currentSlug = matchingKey || 'accounts-payable';
  }

  const newPageData = getNewPageDetailedContent(location.pathname);

  const pageContent = newPageData
    ? {
        title: newPageData.title,
        badge: newPageData.badge,
        intro: newPageData.intro,
        moreIntro: newPageData.moreIntro,
        highlightsTitle: newPageData.highlightsTitle,
        highlights: newPageData.highlights,
        ratesTitle: newPageData.ratesTitle,
        ratesHeaders: newPageData.ratesHeaders,
        ratesRows: newPageData.ratesRows,
        checklistTitle: newPageData.checklistTitle,
        checklist: newPageData.checklist,
        faqs: newPageData.faqs
      }
    : (GENERAL_BANKING_PAGE_MAP[currentSlug] || GENERAL_BANKING_PAGE_MAP['accounts-payable']);

  const detailedArticles = newPageData?.detailedArticles
    ? newPageData.detailedArticles
    : getBankingDetailedArticles(currentSlug, pageContent);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveFaq(null);
  }, [subPath, location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Section with Slate Blue and Dark Gold Theme */}
        <div className="bg-gradient-to-r from-slate-800 via-indigo-950 to-slate-900 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[180px] font-black leading-none select-none">FINANCE</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              {pageContent.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight">
              {pageContent.title}
            </h1>
            <p className="text-slate-200 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl font-medium font-sans">
              {pageContent.intro}
            </p>
          </div>
        </div>

        {/* 2-Column responsive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Rich Articles, Comparison Tables */}
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
                      <span className="w-1.5 h-6 bg-slate-700 rounded-full"></span>
                      {art.title}
                    </h3>
                    {art.content.map((p, pIdx) => (
                      <p key={pIdx} className="text-slate-650 text-sm leading-relaxed font-sans font-medium text-justify">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Core Highlights highlights */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-slate-700 rounded-full"></span>
                {pageContent.highlightsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {pageContent.highlights.map((feat, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-xl p-4 hover:border-slate-300 hover:bg-slate-500/5 transition-colors">
                    <h4 className="font-bold text-slate-800 text-sm mb-2">{feat.label}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{feat.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison table */}
            {pageContent.ratesRows && pageContent.ratesHeaders && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">{pageContent.ratesTitle}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        {pageContent.ratesHeaders.map((header, idx) => (
                          <th key={idx} className="p-3 font-semibold text-slate-700">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pageContent.ratesRows.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="p-3 font-bold text-slate-800 flex items-center gap-2">
                            <Landmark className="w-4 h-4 text-indigo-700 flex-shrink-0" />
                            {row[0]}
                          </td>
                          <td className="p-3 font-semibold text-indigo-700">{row[1]}</td>
                          <td className="p-3 text-slate-500">{row[2]}</td>
                          {row[3] && <td className="p-3 text-slate-500">{row[3]}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Interactive Simulation Dashboard */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 rounded-3xl text-white p-6 sm:p-8 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Modern Capital Management Systems
              </h3>
              <p className="text-xs text-slate-300 mb-6 font-sans">Simulate active financial transaction protocols securely online</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Send className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Real-Time Transfer</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Instant A2A secure payments via IMPS/UPI</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Pocket className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Pocket Tools</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Tax calculators & e-filing support tools</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Limit Locks</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Customizable transaction locks prevent frauds</p>
                </div>
              </div>
            </div>

            {/* FAQs Accordion Block */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-700" />
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
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-indigo-700' : ''}`} />
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

export default DynamicGeneralBankingPage;
