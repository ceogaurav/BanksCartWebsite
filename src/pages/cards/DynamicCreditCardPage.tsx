import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../../components/Breadcrumb';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  HelpCircle, 
  ChevronDown, 
  Check, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  BookOpen, 
  AlertCircle, 
  Info, 
  Landmark, 
  Percent, 
  Award, 
  ArrowRight, 
  Play, 
  MessageSquare, 
  TrendingUp, 
  CreditCard,
  CheckCircle2,
  Lock,
  Zap,
  Gift,
  Plane,
  Fuel,
  Wallet,
  PhoneCall
} from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';
import { CARD_PAGE_MAP, CardPageContent, CardRecommendRow } from '../../data/cardPageData';
import { getNewPageDetailedContent } from '../../data/newPagesDetailedData';

interface EditorialArticle {
  title: string;
  content: string[];
}

const getCreditCardDetailedArticles = (slug: string): EditorialArticle[] => {
  const formatSlug = (s: string) => {
    if (s === 'rupay') return 'Rupay Credit Cards';
    return s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };
  const readableName = formatSlug(slug);

  return [
    {
      title: `Maximizing Purchases: Value Optimization Slabs under ${readableName}`,
      content: [
        `Utilizing a premier financial instrument like **${readableName}** is the most effective method to optimize transaction leverage and capture accelerated rewards. Regulated under Reserve Bank of India (RBI) guidelines, Indian card issuers offer specialized reward tiers spanning everyday groceries, fine dining, utility bill payments, and international travel.`,
        `Through BanksCart's side-by-side comparison engine, cardholders can evaluate annual maintenance charges, joining welcome vouchers (often worth ₹2,500 to ₹10,000 in hotel stays or gift cards), and fee waiver milestones. This ensures your card choice perfectly matches your spending patterns, turning routine expenses into rich compounding benefits.`
      ]
    },
    {
      title: `The UPI Multiplier: How Rupay & Digital Scans Accelerate Rewards`,
      content: [
        `For cardholders operating under **${readableName}** variants (especially NPCI Rupay card models), direct integration with the Unified Payments Interface (UPI) represents a major operational breakthrough. Traditionally, credit cards could only be swiped at physical PoS machines or keyed into web payment gateways.`,
        `Rupay cards link directly into popular UPI apps (Google Pay, PhonePe, Paytm, BHIM). You can scan any merchant QR code to execute credit line payments instantly, enjoying up to 50 days of interest-free credit on routine grocery runs, dining, and retail purchases.`
      ]
    },
    {
      title: `Understanding Credit Utilization and APR: Protecting Your CIBIL Score`,
      content: [
        `While credit cards under **${readableName}** provide robust financial liquidity, maintaining disciplined repayment habits is critical to protect your credit bureau standing. Banks charge an Annual Percentage Rate (APR) ranging between 36% and 42% p.a. on revolving unpaid statement totals, which is the most expensive debt class.`,
        `Consistently paying only the 'Minimum Due Amount' triggers high rollover interest charges on your entire balance. Setting up e-NACH auto-debits to clear full statements monthly, while maintaining a Credit Utilization Ratio (CUR) below 30%, guarantees steady CIBIL score growth.`
      ]
    }
  ];
};

interface DynamicCreditCardPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const DynamicCreditCardPage: React.FC<DynamicCreditCardPageProps> = ({ openApplyModal }) => {
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

  // Safe fallback procedural content generator for 100% coverage
  const generateFallbackContent = (slug: string): CardPageContent => {
    let readableTitle = formatSlug(slug);
    
    let customIntro = `A ${readableTitle} represents a premier payment tool engineered to provide cardholders with maximum rewards, superior convenience, and robust fraud protection. At BanksCart, we compare features across India's top banking networks to find your ideal card match.`;
    let keyFeaturesList = [
      { label: "Prime Rewards", text: `Earn accelerated reward points or cashbacks on every ${readableTitle} purchase.` },
      { label: "Welcome Privileges", text: "Secure high-value shopping vouchers, co-branded reward miles, and dining benefits on activation." },
      { label: "CIBIL Score Boost", text: "Report consistent on-time payment track records directly to Indian credit bureaus monthly." }
    ];
    let recommendList: CardRecommendRow[] = [
      { name: "HDFC Regalia Gold", bank: "HDFC Bank", fees: "₹2,500 + GST", benefit: "Complimentary Club Vistara & Lounge access" },
      { name: "ICICI Amazon Pay", bank: "ICICI Bank", fees: "Lifetime Free", benefit: "Flat 5% unlimited cashback for Prime members" },
      { name: "Axis Bank Ace", bank: "Axis Bank", fees: "₹499 + GST", benefit: "Flat 2% cashback on all offline spends & Google Pay" },
      { name: "SBI Card ELITE", bank: "State Bank of India", fees: "₹4,999 + GST", benefit: "Free movie tickets & luxury travel vouchers" }
    ];
    let checklistList = [
      `Check score requirements: A CIBIL rating above 700 is preferred for standard ${readableTitle} approvals.`,
      "Understand fee waivers: Compare active joining fees against annual spending milestones for waivers.",
      "Track interest margins: Ensure you clear full statement balances monthly to avoid 36-42% revolving APR."
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

    if (slug === 'rupay') {
      customIntro = `**Rupay Credit Cards** have emerged as the fastest-growing card segment in India due to direct linkage with the Unified Payments Interface (UPI). Cardholders can link their Rupay credit card directly to UPI apps (BHIM, Google Pay, PhonePe, Paytm) to scan merchant QR codes and execute credit payments directly from their card lines.`;
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
    } else if (slug === 'secured') {
      customIntro = `**Secured Credit Cards** are credit cards issued by banks against a Fixed Deposit (FD) pledged by the borrower. These cards serve as the single most effective tool to build a credit score from scratch or repair damaged CIBIL ratings without income proofs or salary slips.`;
      keyFeaturesList = [
        { label: "100% Guaranteed Approval", text: "Approved instantly against your FD without salary slips, IT returns, or credit history checks." },
        { label: "High Limits (80-90%)", text: "Secure credit card limits ranging from 80% to 90% of your pledged FD amount." },
        { label: "FD Interest Earned", text: "Your pledged Fixed Deposit continues to earn standard bank interest while you use the card." }
      ];
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
  const newPageData = getNewPageDetailedContent(window.location.pathname);

  const pageContent: CardPageContent = newPageData
    ? {
        title: newPageData.title,
        badge: newPageData.badge,
        intro: newPageData.intro,
        moreIntro: newPageData.moreIntro,
        keyFeaturesTitle: newPageData.highlightsTitle,
        keyFeatures: newPageData.highlights,
        recommendTitle: newPageData.ratesTitle,
        recommendHeaders: newPageData.ratesHeaders,
        recommendDetails: newPageData.ratesRows.map((row: string[]) => ({
          name: row[0],
          bank: row[1],
          fees: row[2],
          benefit: row[3] || "N/A"
        })),
        checklistTitle: newPageData.checklistTitle,
        checklist: newPageData.checklist,
        faqs: newPageData.faqs
      }
    : (CARD_PAGE_MAP[currentSlug] || generateFallbackContent(currentSlug));

  const detailedArticles = newPageData?.detailedArticles
    ? newPageData.detailedArticles
    : getCreditCardDetailedArticles(currentSlug);

  // Scroll to top on slug change
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveFaq(null);
  }, [subPath]);

  // Quick categories for sub-navigation
  const categoryPills = [
    { label: "All Cards", path: "/cards/credit/overview", icon: CreditCard },
    { label: "Lifetime Free", path: "/cards/credit/lifetime-free", icon: Gift },
    { label: "Cashback Cards", path: "/cards/credit/cashback", icon: Percent },
    { label: "Lounge Access", path: "/cards/credit/lounge", icon: Plane },
    { label: "Fuel Cards", path: "/cards/credit/fuel", icon: Fuel },
    { label: "Rupay UPI", path: "/cards/credit/rupay", icon: Zap },
    { label: "Secured / FD", path: "/cards/credit/secured", icon: Wallet }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": pageContent.faqs.map(f => ({
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
        <title>{`${pageContent.title} | Compare & Apply Online - BanksCart`}</title>
        <meta 
          name="description" 
          content={`Compare top ${pageContent.title} in India. Check eligibility, annual fees, reward structures, and apply 100% digitally on BanksCart.`} 
        />
        <link rel="canonical" href={`https://bankscart.com/cards/credit/${currentSlug}`} />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Breadcrumb path={["Home", "Credit Cards", pageContent.title || "Overview"]} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* HERO SECTION WITH INTEGRATED ELIGIBILITY CHECK FORM */}
        <section id="card-hero-form" className="bg-slate-900 rounded-3xl text-white p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute -right-8 -bottom-10 opacity-5 select-none pointer-events-none">
            <span className="text-[220px] font-black text-white leading-none">CARD</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Column: Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-3.5 py-1 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {pageContent.badge || "Verified Bank Offers 2026"}
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                {pageContent.title}
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                {pageContent.intro}
              </p>

              {/* Quick Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">100% Paperless</div>
                    <div className="text-[11px] text-slate-400">Digital KYC</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                    <Landmark className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Top 15+ Banks</div>
                    <div className="text-[11px] text-slate-400">HDFC, SBI, ICICI</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                    <Percent className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Up to 50 Days</div>
                    <div className="text-[11px] text-slate-400">0% Interest Credit</div>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Soft Inquiry</div>
                    <div className="text-[11px] text-slate-400">0 Score Impact</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Embedded Card Eligibility Form */}
            <div className="lg:col-span-5">
              <CibilCheckerForm 
                sourcePage={`${pageContent.title} Landing Page`} 
                className="shadow-2xl ring-1 ring-slate-100" 
              />
            </div>

          </div>
        </section>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoryPills.map((pill, idx) => {
            const Icon = pill.icon;
            const isActive = window.location.pathname === pill.path;
            return (
              <Link
                key={idx}
                to={pill.path}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-blue-700 text-white border-blue-700 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                {pill.label}
              </Link>
            );
          })}
        </div>

        {/* More Intro if present */}
        {pageContent.moreIntro && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {pageContent.moreIntro}
            </p>
          </div>
        )}

        {/* TOP CARDS COMPARISON TABLE (FULL-WIDTH SECTION) */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-blue-700" />
                {pageContent.recommendTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Showing vetted Indian cards with annual maintenance fees, issuing banks, and primary features.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg whitespace-nowrap self-start sm:self-auto">
              Updated: Q1 2026
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-800">
                  {pageContent.recommendHeaders.map((header, idx) => (
                    <th key={idx} className="p-3.5 font-bold">{header}</th>
                  ))}
                  <th className="p-3.5 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {pageContent.recommendDetails.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900">{row.name}</td>
                    <td className="p-3.5 font-semibold text-slate-600">{row.bank}</td>
                    <td className="p-3.5 font-bold text-slate-800 font-mono tabular-nums">{row.fees}</td>
                    <td className="p-3.5 text-slate-600 text-xs leading-relaxed max-w-sm">{row.benefit}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => {
                          const formEl = document.getElementById('card-hero-form');
                          if (formEl) {
                            formEl.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-colors whitespace-nowrap shadow-sm"
                      >
                        Check Eligibility
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* KEY HIGHLIGHTS (3-COLUMN BALANCED GRID) */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Award className="w-6 h-6 text-blue-700" />
              {pageContent.keyFeaturesTitle}
            </h3>
            <p className="text-sm text-slate-600 mt-1">Core advantages of this credit card segment</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pageContent.keyFeatures.map((feat, idx) => (
              <div key={idx} className="border border-slate-200 rounded-2xl p-6 hover:border-blue-200 transition-colors bg-slate-50/50">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm mb-4">
                  {idx + 1}
                </div>
                <h4 className="font-bold text-slate-900 text-base mb-2">{feat.label}</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{feat.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ELIGIBILITY & DOCUMENTATION CHECKLIST (2 BALANCED COLUMNS) */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              Credit Card Eligibility & Required Documents
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Standard eligibility parameters across leading Indian retail banks:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-base">Salaried Individuals</h4>
              <ul className="space-y-2 text-slate-600 list-disc list-inside">
                <li>Age: 21 to 60 years</li>
                <li>Min Net Monthly Income: ₹25,000/month</li>
                <li>Employment Vintage: 6+ months in current organization</li>
                <li>CIBIL Score: 700+ preferred (or FD-secured)</li>
                <li>Documents: Last 3 months salary slips + Form 16 + PAN & Aadhaar</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="font-bold text-slate-900 text-base">Self-Employed / Business Owners</h4>
              <ul className="space-y-2 text-slate-600 list-disc list-inside">
                <li>Age: 21 to 65 years</li>
                <li>Annual ITR: Minimum ₹4.5 Lakhs p.a.</li>
                <li>Business Vintage: 2+ continuous operating years</li>
                <li>CIBIL Score: 720+ preferred</li>
                <li>Documents: Latest 2 years ITR with computation + 6 months bank statement</li>
              </ul>
            </div>
          </div>
        </section>

        {/* DETAILED EDITORIAL ARTICLES (FULL-WIDTH ACCESSIBLE CARDS) */}
        {detailedArticles.length > 0 && (
          <div className="space-y-6">
            {detailedArticles.map((art, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-3 border-b border-slate-100 pb-4">
                  <span className="w-1.5 h-6 bg-blue-700 rounded-full"></span>
                  {art.title}
                </h3>
                {art.content.map((p, pIdx) => (
                  <p key={pIdx} className="text-slate-600 text-xs sm:text-sm leading-relaxed text-justify font-normal">
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* STEP-BY-STEP CHECKLIST (BALANCED FULL-WIDTH SECTION) */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-blue-700" />
              {pageContent.checklistTitle}
            </h3>
            <p className="text-sm text-slate-600 mt-1">Key checklist items before submitting your application</p>
          </div>

          <div className="space-y-3">
            {pageContent.checklist.map((tip, idx) => (
              <div key={idx} className="flex gap-4 items-start p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQS ACCORDION (CENTERED ACCORDION) */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-blue-700" />
              Frequently Asked Questions
            </h3>
            <p className="text-sm text-slate-600 mt-1">Get immediate clarity on annual fees, grace periods, and rewards</p>
          </div>

          <div className="space-y-3">
            {pageContent.faqs.map((faq, index) => (
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
              Ready to Find Your Ideal Credit Card?
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Compare pre-approved card offers with 100% digital KYC and zero score impact on BanksCart.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => {
                  const el = document.getElementById('card-hero-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg transition-all"
              >
                Check Card Eligibility Now &rarr;
              </button>
              <a
                href="tel:+919686859296"
                className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                Call +91 96868 59296
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default DynamicCreditCardPage;
