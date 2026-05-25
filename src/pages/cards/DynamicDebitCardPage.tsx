import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert, Sparkles, BookOpen, AlertCircle, Info, Landmark, Percent, Award, ShieldCheck, ArrowRight, Play, MessageSquare, TrendingUp, CreditCard } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';

interface CardFAQ {
  q: string;
  a: string;
}

interface DebitCardCompareRow {
  cardName: string;
  bankName: string;
  annualFee: string;
  cashback: string;
  loungeAccess: string;
  keyFeature: string;
}

interface DebitCardPageContent {
  title: string;
  badge: string;
  intro: string;
  moreIntro?: string;
  featuresTitle: string;
  features: { label: string; text: string }[];
  compareTableTitle?: string;
  compareTableHeaders?: string[];
  compareTableRows?: DebitCardCompareRow[];
  checklistTitle: string;
  checklist: string[];
  faqs: CardFAQ[];
}

const DEBIT_CARD_PAGE_MAP: Record<string, DebitCardPageContent> = {
  "best-cashback-debit-cards": {
    title: "Best Cashback Debit Cards in India: Annual Fees & Rewards",
    badge: "Direct Moneyback Cards",
    intro: "While credit cards are traditionally favored for cashback, several leading Indian banks now offer high-yielding **Cashback Debit Cards**. These cards let you earn direct monetary cash rewards on daily transactions, online shopping, utility bill payments, and dining without standard revolving debt interest charges.",
    moreIntro: "At BanksCart, we analyze banking card suites side-by-side. The best cashback debit cards offer up to 1% to 5% direct reward returns, coupled with quarterly airport lounge access limits, free movie vouchers, and comprehensive accidental insurance coverages.",
    featuresTitle: "Key Advantages of Cashback Debit Cards",
    features: [
      { label: "Zero Debt Overdraft", text: "Spend directly from your active savings account without building unpaid card balances." },
      { label: "High Rewards Yield", text: "Secure direct monthly cashback up to ₹500 to ₹1,000 based on select transaction caps." },
      { label: "Lounge Access Perks", text: "Enjoy complimentary domestic airport lounge access by swiping your active card." }
    ],
    compareTableTitle: "Compare Top Cashback Debit Cards in India 2026",
    compareTableHeaders: ["Debit Card Model", "Issuing Bank", "Annual Maintenance Fee", "Cashback Slab Slabs", "Lounge Access (Quarter)", "Key Perk"],
    compareTableRows: [
      { cardName: "HDFC Millennia Debit Card", bankName: "HDFC Bank", annualFee: "₹500 + GST", cashback: "5% on PayZapp, 2.5% on Shopping, 1% on Wallet", loungeAccess: "1 Complimentary", keyFeature: "Up to ₹4,800 cashback annually" },
      { cardName: "ICICI Coral Debit Card", bankName: "ICICI Bank", annualFee: "₹599 + GST", cashback: "Earn up to 4x Rewards points per ₹200 spent", loungeAccess: "1 Complimentary", keyFeature: "25% off on BookMyShow (2 tickets/month)" },
      { cardName: "SBI Platinum Debit Card", bankName: "State Bank of India", annualFee: "₹250 + GST", cashback: "1 Point per ₹200 spent (Direct Cash Option)", loungeAccess: "Not Available", keyFeature: "High daily cash withdrawal limit of ₹1 Lakh" },
      { cardName: "Axis Liberty Debit Card", bankName: "Axis Bank", annualFee: "₹300 + GST", cashback: "Flat 5% cashback on weekend spends", loungeAccess: "1 Complimentary", keyFeature: "Quarterly Liberty voucher rewards" }
    ],
    checklistTitle: "Eligibility & Document checklist for Card Issuance",
    checklist: [
      "Open Prime Savings Account: Debit cards are linked directly to active savings bank accounts.",
      "Submit KYC Documents: Aadhaar card and PAN card details must be fully updated in the bank database.",
      "Check Minimum Balance: Maintain the required Average Monthly Balance (AMB) based on your account tier.",
      "Order Online: Request card upgrades instantly via NetBanking apps or official customer service desks."
    ],
    faqs: [
      { q: "How does a cashback debit card work?", a: "When you swipe or use the card online, the issuing bank tracks transaction categories and credits equivalent cashback rewards to your savings account or reward wallet monthly." },
      { q: "Is the cashback credited as real money?", a: "Yes, on cards like the HDFC Millennia, rewards can be directly redeemed as cash credits back into your linked savings bank account." },
      { q: "Are annual fees high for rewards debit cards?", a: "Annual fees are highly affordable, typically ranging between ₹150 and ₹599 + GST, which is easily offset by the cashback earned." },
      { q: "Can I get free airport lounge access with a debit card?", a: "Yes. Premium Rupay and Visa Platinum debit cards (like HDFC Millennia or Axis Liberty) offer 1 complimentary domestic airport lounge access per calendar quarter." },
      { q: "What is the daily withdrawal limit for these cards?", a: "Most premium cashback cards offer daily ATM cash withdrawal limits between ₹50,000 and ₹1,00,000, and online shopping limits up to ₹3 Lakhs to ₹5 Lakhs." },
      { q: "Do debit card reward points expire?", a: "Yes, typically reward points are valid for 1 to 3 years, after which they expire if not redeemed." },
      { q: "What is a wallet reload cashback?", a: "Some cards (like HDFC Millennia) offer 1% cashback when you reload digital wallets (like PayTM or Amazon Pay) using the debit card." },
      { q: "Are transaction charges waived at fuel stations?", a: "Yes. Most cards offer a 1% fuel surcharge waiver for spends between ₹400 and ₹4,000 at all national petrol pumps." },
      { q: "Does checking debit card eligibility affect my CIBIL score?", a: "No. Debit cards are linked to your own savings account funds and do not involve credit checks, meaning there is zero impact on your CIBIL score." },
      { q: "How can I upgrade my existing simple card to a cashback card?", a: "Log in to your bank's NetBanking portal, go to 'Cards' > 'Debit Cards' > 'Upgrade/Re-issue', and select the premium cashback card variant." }
    ]
  }
};

const DynamicDebitCardPage: React.FC = () => {
  const { subPath } = useParams<{ subPath: string }>();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Dynamic fallback generator to handle any sub-path dynamically
  const generateFallbackContent = (slug: string): DebitCardPageContent => {
    const readableTitle = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      title: `${readableTitle}: Compare Premium Bank Debit Cards`,
      badge: "Debit & ATM Card Guides",
      intro: `A **${readableTitle}** is a highly optimized banking card linked directly to your savings bank account. These cards let you manage cash transactions safely while earning reward points, airport lounge entries, and fuel waivers.`,
      moreIntro: "At BanksCart, we simplify banking decisions by comparing active debit cards side-by-side. Opting for a premium card matches your spending habits with lowest annual costs and highest cashbacks.",
      featuresTitle: "Highlights of Premium Debit Products",
      features: [
        { label: "Immediate Liquidity", text: "Access cash instantly at millions of ATMs nationwide under secure PIN codes." },
        { label: "Purchase Rewards", text: "Earn valuable reward points on every merchant swipe, redeemable for shopping vouchers." },
        { label: "Built-In Insurance", text: "Enjoy complimentary personal accident insurance and purchase protection covers automatically." }
      ],
      compareTableTitle: "Compare Top Debit Card Offerings",
      compareTableHeaders: ["Debit Card Model", "Issuing Bank", "Annual Maintenance Fee", "Reward Points Ratio", "Lounge Access (Quarter)"],
      compareTableRows: [
        { cardName: "Premium Visa Platinum", bankName: "Top Indian Banks", annualFee: "₹150 to ₹250 p.a.", cashback: "1 Point per ₹200 spent", loungeAccess: "Not Available", keyFeature: "Basic insurance coverages" },
        { cardName: "Signature / World Mastercard", bankName: "Private Sector Banks", annualFee: "₹500 to ₹750 p.a.", cashback: "2 Points per ₹150 spent", loungeAccess: "1 to 2 Complimentary", keyFeature: "High ATM limits, concierge services" }
      ],
      checklistTitle: "Core Application checklist",
      checklist: [
        "Open Savings Account: Keep a valid, fully KYC-verified savings account with your chosen bank.",
        "Link Active Mobile: Link your current phone number to authorize transaction OTP alerts.",
        "Submit Card Choice: Select your preferred card network (Visa, Mastercard, or Rupay) on the upgrade form.",
        "Accept Slabs & Fees: Pay the nominal annual card fee (deducted automatically from your account balance)."
      ],
      faqs: [
        { q: `What is the significance of a ${readableTitle}?`, a: "It provides secure physical and digital payment access, helping you shop online and withdraw cash without credit interest structures." },
        { q: "What is the difference between Visa, Mastercard, and Rupay?", a: "Visa and Mastercard are global payment networks. Rupay is India's domestic payment network, offering lower transaction fees and special localized utility discounts." }
      ]
    };
  };

  const currentSlug = subPath || 'overview';
  const pageContent = DEBIT_CARD_PAGE_MAP[currentSlug] || generateFallbackContent(currentSlug);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveFaq(null);
  }, [subPath]);

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Banner section */}
        <div className="bg-gradient-to-r from-emerald-800 via-indigo-900 to-slate-900 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[180px] font-black leading-none select-none">DEBIT</span>
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
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {pageContent.moreIntro}
                </p>
              </div>
            )}

            {/* Core Features highlights */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-emerald-600 rounded-full"></span>
                {pageContent.featuresTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {pageContent.features.map((feat, idx) => (
                  <div key={idx} className="border border-slate-100 rounded-xl p-4 hover:border-emerald-100 hover:bg-emerald-50/10 transition-colors">
                    <h4 className="font-bold text-slate-800 text-sm mb-2">{feat.label}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed font-sans">{feat.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison table */}
            {pageContent.compareTableRows && pageContent.compareTableHeaders && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">{pageContent.compareTableTitle}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        {pageContent.compareTableHeaders.map((header, idx) => (
                          <th key={idx} className="p-3 font-semibold text-slate-700">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pageContent.compareTableRows.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="p-3 font-bold text-slate-800 flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            {row.cardName}
                          </td>
                          <td className="p-3 font-semibold text-slate-700">{row.bankName}</td>
                          <td className="p-3 font-bold text-emerald-600">{row.annualFee}</td>
                          <td className="p-3 text-slate-500 font-sans font-medium">{row.cashback}</td>
                          <td className="p-3 text-slate-500 font-sans font-medium">{row.loungeAccess}</td>
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
                    <div className="w-6 h-6 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-semibold font-sans">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro-Innovations panel */}
            <div className="bg-gradient-to-br from-emerald-950 to-indigo-950 rounded-3xl text-white p-6 sm:p-8 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Smart Card Innovations
              </h3>
              <p className="text-xs text-emerald-200 mb-6 font-sans">Maximize savings on your routine current bank transactions</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Security Controls</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Instantly toggle active international swipes on your mobile app.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Percent className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Merchant Discounts</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Earn exclusive shopping vouchers linked directly to your card network.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
                  <div className="w-10 h-10 bg-white/10 text-white rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Play className="w-5 h-5 text-amber-400" />
                  </div>
                  <h4 className="font-bold text-white text-sm">Contactless NFC</h4>
                  <p className="text-slate-300 text-xs mt-2 leading-relaxed font-sans font-medium">Fast touch-and-pay clearances for billing values under ₹5,000.</p>
                </div>
              </div>
            </div>

            {/* FAQs Block */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
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
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-emerald-600' : ''}`} />
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

export default DynamicDebitCardPage;
