import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert, Sparkles, BookOpen, AlertCircle, Info, Landmark, Percent, Award, ShieldCheck, ArrowRight, Play, MessageSquare, TrendingUp, CreditCard } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';
import { CARD_PAGE_MAP, CardPageContent, CardRecommendRow } from '../../data/cardPageData';

const DynamicCreditCardPage: React.FC = () => {
  const { subPath } = useParams<{ subPath: string }>();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Helper to convert slug/subPath to a readable title
  const formatSlug = (slug: string) => {
    if (slug === 'rupay') return 'Rupay Credit Cards';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Safe fallback procedural content generator for 100% coverage of all 17 paths
  const generateFallbackContent = (slug: string): CardPageContent => {
    const readableTitle = formatSlug(slug);
    
    // Custom parameters based on the slug group
    let customIntro = `A ${readableTitle} represents a premium payment tool designed to offer cardholders maximal reward leverage, high convenience, and robust spending protections. At BanksCart, we compare card features across prime networks to secure your perfect card match.`;
    let keyFeaturesList = [
      { label: "Prime Rewards", text: `Earn accelerated reward points or cashbacks on every ${readableTitle} spend.` },
      { label: "Welcome Privileges", text: "Secure high-value shopping vouchers, co-branded tokens, and airline miles on card activation." },
      { label: "CIBIL Score Boost", text: "Report consistent on-time payment logs directly to Indian credit bureaus monthly." }
    ];
    let recommendList: CardRecommendRow[] = [
      { name: "Axis Bank Select", bank: "Axis Bank", fees: "₹3,000 + GST", benefit: "Airport lounge access & complimentary golf rounds" },
      { name: "HDFC Regalia Gold", bank: "HDFC Bank", fees: "₹2,500 + GST", benefit: "Club Vistara membership & hotel vouchers" },
      { name: "SBI Card Prime", bank: "State Bank of India", fees: "₹2,999 + GST", benefit: "Accelerated utility & department store rewards" },
      { name: "ICICI Coral Card", bank: "ICICI Bank", fees: "₹499 + GST", benefit: "Complimentary movie tickets & dining discounts" }
    ];
    let checklistList = [
      `Check score requirements: A CIBIL rating above 700 is preferred for secured ${readableTitle} approvals.`,
      "Understand fee waivers: Compare active joining fees against annual spending milestones.",
      "Track interest margins: Ensure you clear full statement totals monthly to bypass revolving interest outgos."
    ];
    let customFAQs = [
      { q: `What is a ${readableTitle}?`, a: `A ${readableTitle} is a specialized credit card segment engineered to maximize rewards, cashbacks, or category savings for cardholders.` },
      { q: "What is the minimum CIBIL score required for approval?", a: "Tier-1 card issuers prefer a CIBIL score of 700 and above. However, FD-backed secured cards require no past credit history." },
      { q: "Is there any joining fee for new card accounts?", a: "Joining fees vary by tier, ranging from nil (Lifetime Free) to ₹4,999 for luxury travel card segments." },
      { q: "How long does digital card setup take?", a: "Virtual credit cards are approved and generated online instantly. Physical plastic cards are delivered in 3 to 7 business days." },
      { q: "Does checking card options drop my CIBIL rating?", a: "No. Checking eligibility on BanksCart triggers only a 'Soft Inquiry', which has zero impact on credit scores." },
      { q: "What is the standard interest-free grace period?", a: "Most card issuers offer between 45 to 50 days of interest-free credit from the start of the billing cycle." },
      { q: "Can I convert large card transactions into EMIs?", a: "Yes. Most banks allow you to convert single transaction logs above ₹2,500 into easy monthly EMIs via mobile apps." },
      { q: "What is e-NACH card mandate?", a: "An automated bank standing instruction configured online to secure your monthly card statement clears on time." },
      { q: "Can I upgrade my card to a premium tier later?", a: "Yes. Based on consistent high monthly card spendings and on-time payments, banks will offer card upgrades." },
      { q: "What happens if I make only the minimum due payment?", a: "Paying only the minimum due avoids late payment fees but triggers high rollover interest charges (up to 42% p.a.) on the remaining balance." }
    ];

    // Mapped content updates for specific groups
    if (slug === 'rupay') {
      customIntro = `**Rupay Credit Cards** have emerged as the fastest-growing card segment in India due to their revolutionary linkage with the Unified Payments Interface (UPI). Cardholders can link their Rupay credit card directly to UPI apps (like BHIM, GPay, PhonePe) to scan merchant QR codes and execute credit payments directly from their card lines.`;
      keyFeaturesList = [
        { label: "Seamless UPI Linkage", text: "Link your card to UPI apps and pay at local merchant shops directly from your credit line." },
        { label: "Zero Merchant Fees", text: "UPI transactions below ₹2,000 on Rupay credit cards attract zero merchant discount rates (MDR)." },
        { label: "Domestic Rewards", text: "Earn fuel waivers, utility rewards, and shopping points on all UPI scans." }
      ];
      recommendList = [
        { name: "SBI Rupay SimplyClick", bank: "State Bank of India", fees: "₹499 + GST", benefit: "Flat 10X reward points on online merchant partners" },
        { name: "HDFC Tata Neu Plus", bank: "HDFC Bank", fees: "₹499 + GST", benefit: "Flat 2% NeuCoins on Tata brand shopping scans" },
        { name: "Axis Indian Oil Rupay", bank: "Axis Bank", fees: "₹500 + GST", benefit: "Complimentary fuel surcharge waivers" },
        { name: "ICICI Coral Rupay", bank: "ICICI Bank", fees: "₹500 + GST", benefit: "BookMyShow discounts & railway lounge access" }
      ];
      customFAQs[0].a = "Rupay Credit Cards are domestic Indian credit cards developed by the National Payments Corporation of India (NPCI) that support direct UPI linkage for QR payments.";
      customFAQs[2].q = "How do I link my Rupay Credit Card to GPay or PhonePe?";
      customFAQs[2].a = "Go to your UPI app's profile page, select 'Add Credit Card', choose your issuing bank, and verify your card using OTP. You can then set a 6-digit UPI PIN to scan and pay instantly.";
    } else if (slug === 'secured') {
      customIntro = `**Secured Credit Cards** are credit cards issued by banks against a Fixed Deposit (FD) pledged by the borrower. These cards serve as the single most effective tool to build a credit score from scratch or repair damaged CIBIL ratings without income proofs or salary slips.`;
      keyFeaturesList = [
        { label: "100% Guaranteed Approval", text: "Approved instantly against your FD without salary slips, IT returns, or credit history checks." },
        { label: "High Limits (80-90%)", text: "Secure credit card limits ranging from 80% to 90% of your pledged FD amount." },
        { label: "FD Interest Earned", text: "Your pledged Fixed Deposit continues to earn standard bank interest while you use the card." }
      ];
    } else if (slug.includes('cashback') || slug.includes('rewards') || slug.includes('free') || slug.includes('lounge')) {
      customIntro = `A **${readableTitle}** is a specialized credit card designed to maximize your savings. Whether you want to earn direct statement cashbacks on utility spending, accumulate high-value rewards for luxury vouchers, bypass annual renewal fees, or enjoy complimentary airport lounge accesses, this card offers maximum value.`;
    }

    return {
      title: readableTitle,
      badge: "Dynamic Card Catalog",
      intro: customIntro,
      keyFeaturesTitle: `${readableTitle} Core Highlights`,
      keyFeatures: keyFeaturesList,
      recommendTitle: `Compare Top Recommended ${readableTitle}`,
      recommendHeaders: ["Recommended Card", "Issuing Bank", "Annual Renewal Fee", "Key Highlight Benefit"],
      recommendDetails: recommendList,
      checklistTitle: "Step-by-Step Application Checklist",
      checklist: checklistList,
      faqs: customFAQs
    };
  };

  const currentSlug = subPath || 'overview';
  const pageContent = CARD_PAGE_MAP[currentSlug] || generateFallbackContent(currentSlug);

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
            <span className="text-[200px] font-black leading-none select-none">CARD</span>
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
                <p className="text-sm text-slate-600 leading-relaxed">
                  {pageContent.moreIntro}
                </p>
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

            {/* Top Cards Comparison Table */}
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
                        <td className="p-3 font-semibold text-slate-600">{row.bank}</td>
                        <td className="p-3 text-slate-500 font-bold">{row.fees}</td>
                        <td className="p-3 text-slate-500 font-medium">{row.benefit}</td>
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
                Experience Prime Card Technologies
              </h3>
              <p className="text-xs text-blue-200 mb-6 font-medium">Simplify payment tracking and card approvals</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Play className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Reward Optimizer</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed">Calculate exact rewards or cashbacks cleared on your daily transaction logs.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Card Sizer</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed">Instantly verify compatible credit card limits based on your score bracket.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">AI Card Advisor</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed">Compare premium cards dynamically to find your perfect lifestyle match.</p>
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

export default DynamicCreditCardPage;
