import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert, Sparkles, BookOpen, AlertCircle, Info, Landmark, Percent, Award, ShieldCheck, ArrowRight, Play, MessageSquare, TrendingUp, CreditCard } from 'lucide-react';
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
        `Utilizing a premium payment tool like **${readableName}** is the single most effective method to optimize your daily transaction parameters and secure high-value cashbacks. Under the broader credit cards spectrum regulated by the Reserve Bank of India (RBI), banks offer tailored reward systems mapping out shopping categories, luxury dining, utility payments, and global travels.`,
        `By utilizing BanksCart's side-by-side card comparators, you can evaluate annual maintenance charges, joining welcome vouchers (often up to ₹5,000 in shopping vouchers or airline miles), and reward tiers side-by-side. This ensures your card choice perfectly matches your spending patterns, turning routine expenses into rich compounding benefits.`
      ]
    },
    {
      title: `The UPI Multiplier: How Rupay & Digital Scans Accelerate Rewards`,
      content: [
        `For cardholders operating under **${readableName}** variants (especially NPCI Rupay card models), direct integration with the Unified Payments Interface (UPI) represents a massive operational boost. Traditionally, credit cards could only be swiped at physical PoS terminals or keyed in on websites, incurring merchant discount rates (MDR).`,
        `Rupay cards completely bypass this by linking directly to popular UPI apps (GPay, PhonePe, BHIM). Cardholders can scan any local merchant QR code to execute credit line payments instantly, enjoying up to 50 days of interest-free credit on routine grocery runs and local merchant spending.`
      ]
    },
    {
      title: `Understanding Credit utilization and APR: Protecting Your CIBIL Bureau Trail`,
      content: [
        `While credit cards under **${readableName}** provide robust liquid leverage, maintaining disciplined repayment habits is critical to protect your credit bureau standing. Banks charge an Annual Percentage Rate (APR) ranging between 36% and 42% p.a. on revolving unpaid statement totals, which is the most expensive debt class.`,
        `Consistently paying only the 'Minimum Due Amount' triggers massive interest rolls on your remaining balance. Setting up e-NACH auto-debits to pay statements in full, and maintaining a Credit Utilization Ratio (CUR) below 30% of your total limit, guarantees steady credit score growth.`
      ]
    }
  ];
};

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
    let readableTitle = formatSlug(slug);
    
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
    } else if (slug.includes('amex') || slug.includes('american-express')) {
      let amexTitle = "American Express Credit Cards";
      let amexIntro = "American Express (Amex) represents the pinnacle of premium card networks worldwide, offering unmatched luxury, world-class Membership Rewards points, and dedicated concierge support desks. Known for elite travel vouchers and unique partner promotions, Amex cards elevate cardholders' lifestyles.";
      let features = [
        { label: "Accelerated Membership Rewards", text: "Earn flexible Membership Rewards (MR) points that never expire, redeemable for flights, hotels, and the 18/24 Karat Gold Collection." },
        { label: "Elite Airport Lounges", text: "Enjoy access to premium domestic lounges and ultra-exclusive Centurion lounges worldwide." },
        { label: "Amex Offers program", text: "Save thousands annually via curated dining, shopping, and lodging cashback deals activated inside the app." }
      ];
      let recs = [
        { name: "Amex Platinum Travel", bank: "American Express", fees: "₹5,000 + GST", benefit: "Get 40,000 bonus MR points + ₹10,000 Taj voucher on milestones" },
        { name: "Amex Gold Card", bank: "American Express", fees: "₹1,000 + GST", benefit: "Earn 5X MR points on Reward Multiplier + monthly bonus points" },
        { name: "Amex SmartEarn Card", bank: "American Express", fees: "₹495 + GST", benefit: "10X points on Zomato, Flipkart, Uber, and major spend platforms" },
        { name: "Amex Membership Rewards Card", bank: "American Express", fees: "₹1,500 + GST", benefit: "1,000 bonus points monthly for executing 4 swipes above ₹1,000" }
      ];
      let checklist = [
        "Verify eligibility criteria: Salaried applicants require a minimum income of ₹6 Lakhs p.a. (₹3 Lakhs p.a. for select student/LTF slots).",
        "Check pin generation: Generate secure 4-digit PINs instantly via the online Amex portal or Amex Mobile App.",
        "Track billing cycles: Bills are generated monthly with a standard 15 to 20-day interest-free grace window."
      ];
      let faqs = [
        { q: "What are Membership Rewards points?", a: "Membership Rewards (MR) points are Amex's high-value reward currency. They never expire and can be transferred to leading airlines (Vistara, British Airways) and hotel programs (Marriott Bonvoy, Hilton)." },
        { q: "How do I resolve Amex credit card grievances?", a: "Amex operates an direct escalation desk. Disputes are addressed within a strict 30-day resolution timeline. Grievances can be escalated directly to the Nodal Officer in Gurgaon or online." },
        { q: "Is Amex widely accepted in India?", a: "Yes. Amex acceptance has expanded rapidly across both large corporate retail chains and online e-commerce platforms (Amazon, Flipkart, Swiggy) utilizing secure e-mandates." }
      ];

      if (slug.includes('gold')) {
        amexTitle = "American Express Gold Card";
        amexIntro = "The **American Express Gold Card** is Amex's iconic charge card, offering unmatched reward multipliers and premium lifestyle advantages. Charge cards have no pre-set spending limits, giving you absolute purchasing flexibility.";
      } else if (slug.includes('platinum-card')) {
        amexTitle = "American Express Platinum Card";
        amexIntro = "The **American Express Platinum Card** represents the absolute pinnacle of metal credit cards, offering unlimited Centurion lounge entries, Taj vouchers worth ₹45,000, 24/7 global concierge desks, and elite hotel statuses.";
        recs = [
          { name: "Amex Platinum Metal Card", bank: "American Express", fees: "₹60,000 + GST", benefit: "Centurion lounge access, elite hotel statuses & Taj vouchers" }
        ];
      } else if (slug.includes('platinum-travel')) {
        amexTitle = "American Express Platinum Travel Credit Card";
        amexIntro = "The **American Express Platinum Travel Credit Card** is a milestone-based card designed to make your vacations rewarding. By hitting spend targets, you can secure free domestic flights and Taj hotel stays.";
      } else if (slug.includes('smartearn')) {
        amexTitle = "American Express SmartEarn Credit Card";
        amexIntro = "The **American Express SmartEarn Credit Card** is Amex's entry-level credit card, custom-designed for millennial shoppers to earn massive reward multipliers on their daily online spendings.";
      } else if (slug.includes('membership-rewards')) {
        amexTitle = "American Express Membership Rewards Credit Card (MRCC)";
        amexIntro = "The **American Express Membership Rewards Credit Card (MRCC)** is one of the most popular cards in India for monthly compounding rewards, offering recurring bonus points for routine swipes.";
      } else if (slug.includes('pin-generation')) {
        amexTitle = "Amex Credit Card PIN Generation & Setup Guide";
        amexIntro = "Secure your premium card account by activating your card and generating your transaction PIN. RBI mandates require credit card PIN setup to execute physical POS merchant swipes.";
      } else if (slug.includes('grievance') || slug.includes('escalation')) {
        amexTitle = "Amex Grievance Redressal & Escalation Matrix";
        amexIntro = "American Express is committed to world-class service. If you encounter card disputes, billing errors, or fraud leaks, Amex provides a transparent escalation matrix to resolve complaints immediately.";
      } else if (slug.includes('eligibility')) {
        amexTitle = "American Express Credit Card Eligibility & Document Check";
        amexIntro = "Verify Amex's credit and income criteria before submitting your application. A strong CIBIL score of 750+ and a stable annual income are preferred for seamless approvals.";
      } else if (slug.includes('bill-payment')) {
        amexTitle = "Amex Credit Card Bill Payment Channels & Slabs";
        amexIntro = "Pay your monthly American Express statements easily. Amex supports multiple payment avenues, including UPI, net banking, NACH auto-debits, and NEFT clearances.";
      } else if (slug.includes('reward-points')) {
        amexTitle = "American Express Membership Rewards Points Catalog";
        amexIntro = "Explore how to maximize and redeem your Amex Membership Rewards points. Learn about point transfers, 18/24 Karat gold collection options, and online travel bookings.";
      }

      customIntro = amexIntro;
      keyFeaturesList = features;
      recommendList = recs;
      checklistList = checklist;
      customFAQs = faqs;
      readableTitle = amexTitle;

    } else if (slug.includes('air-india-sbi')) {
      let cardTitle = "Air India SBI Credit Card";
      let cardIntro = "The **Air India SBI Credit Card** (available in Platinum and Signature variants) is the ultimate travel card for frequent flyers. Developed in co-branding with State Bank of India and Air India, it offers massive welcome air miles and unmatched reward multipliers on airline ticket purchases.";
      let recs = [
        { name: "Air India SBI Signature", bank: "SBI Card", fees: "₹4,999 + GST", benefit: "Get 20,000 reward miles + 30 Reward Points per ₹100 spent on Air India tickets" },
        { name: "Air India SBI Platinum", bank: "SBI Card", fees: "₹1,499 + GST", benefit: "Get 5,000 reward miles + 15 Reward Points per ₹100 spent on Air India tickets" }
      ];
      let features = [
        { label: "Accelerated Flying Miles", text: "Convert card reward points directly into Air India Flying Returns miles on a flat 1:1 ratio." },
        { label: "Complimentary Lounge access", text: "Enjoy multiple free domestic and international airport lounge visits every calendar year." },
        { label: "Supermile Milestones", text: "Earn up to 100,000 bonus Air India supermiles annually on hitting key milestone spend levels." }
      ];
      let checklist = [
        "Link your Air India Frequent Flyer ID: Ensure your Flying Returns account number is mapped to your card to receive reward miles.",
        "Calculate annual fee offsets: Signature welcomes you with 20,000 miles (worth ₹20,000), completely offsetting the annual fee.",
        "Track base spendings: Card yields 4 base reward points per ₹100 on standard retail purchases."
      ];
      let faqs = [
        { q: "How can I redeem my Air India SBI card reward points?", a: "Points are converted monthly into Air India Flying Returns miles on a 1:1 ratio. You can redeem these miles online for free domestic or international airline tickets." },
        { q: "What is the primary difference between Platinum and Signature variants?", a: "The Signature card offers higher welcome miles (20,000 vs 5,000), higher reward points on Air India tickets (30 vs 15 per ₹100), and international lounge access via Priority Pass." }
      ];

      if (slug.includes('signature')) {
        cardTitle = "Air India SBI Signature Credit Card";
        cardIntro = "Step into a world of luxury travel with the **Air India SBI Signature Credit Card**. Crafted for high-flying corporate executives, this card delivers an elite 20,000 welcome miles and unmatched 30X rewards on Air India flight bookings.";
      } else if (slug.includes('platinum')) {
        cardTitle = "Air India SBI Platinum Credit Card";
        cardIntro = "The **Air India SBI Platinum Credit Card** offers the perfect balance of premium travel rewards and affordable annual fees, welcoming you with 5,000 Flying Returns miles and 15X ticket purchase rewards.";
      }

      customIntro = cardIntro;
      keyFeaturesList = features;
      recommendList = recs;
      checklistList = checklist;
      customFAQs = faqs;
      readableTitle = cardTitle;

    } else if (slug.includes('airtel-axis')) {
      readableTitle = "Airtel Axis Bank Credit Card";
      customIntro = "The **Airtel Axis Bank Credit Card** is widely regarded as one of the best cashback credit cards in India. Designed to deliver massive savings on utility recharges and lifestyle spending, it offers unmatched monthly cashback percentages directly credited to your statement.";
      keyFeaturesList = [
        { label: "25% Cashback on Utilities", text: "Get an outstanding 25% cashback on Airtel mobile, broadband, and DTH bill payments via the Airtel Thanks App." },
        { label: "10% Lifestyle Cashbacks", text: "Enjoy 10% cashback on online spending partners: Zomato, Swiggy, and BigBasket." },
        { label: "Complimentary Lounge visits", text: "Access premium domestic airport lounges free of charge 4 times every calendar year." }
      ];
      recommendList = [
        { name: "Airtel Axis Credit Card", bank: "Axis Bank", fees: "₹500 + GST", benefit: "25% cashback on Airtel bills + 10% on Zomato/Swiggy/BigBasket" }
      ];
      checklistList = [
        "Download the Airtel Thanks App: All 25% utility cashbacks are tracked and processed strictly for payments made via the Thanks App.",
        "Check monthly cashback caps: Utility cashbacks are capped at ₹300 per month; food/grocery cashbacks are capped at ₹500 per month.",
        "Track general spends: Card yields a flat 1% cashback on all general retail spends with zero caps."
      ];
      customFAQs = [
        { q: "Is the Airtel Axis Credit Card lifetime free?", a: "No. The card has a joining and annual fee of ₹500 + GST. However, the annual fee is completely waived if card spends exceed ₹2 Lakhs in the card year." },
        { q: "How is the card cashback credited?", a: "The accumulated cashback is automatically credited directly into your next month's credit card statement as a reduction in outstanding balance." }
      ];

    } else if (slug.includes('amplifi') || slug.includes('federal') || slug.includes('fi-federal')) {
      readableTitle = "Amplifi Fi Federal Credit Card";
      customIntro = "The **Amplifi Fi Federal Credit Card** is a premium co-branded card designed in partnership with Fi Money and Federal Bank. Engineered for tech-savvy millennial savers, it offers a digital-first interface, unlimited cashback multipliers (Fi-Coins), and zero forex markups.";
      keyFeaturesList = [
        { label: "Unlimited 3% Fi-Coins", text: "Earn up to 3% cashback value in Fi-Coins on all online merchant purchases." },
        { label: "Zero Forex Markup", text: "Pay zero foreign exchange markup charges on international swipes, saving up to 3.5% on overseas trips." },
        { label: "Lounge & Movie Offers", text: "Enjoy complimentary domestic airport lounge access and BookMyShow ticket discounts." }
      ];
      recommendList = [
        { name: "Fi Federal Credit Card", bank: "Federal Bank", fees: "₹2,000 (Waived)", benefit: "Zero forex markup + unlimited Fi-Coins cashback on all swipes" }
      ];
      checklistList = [
        "Install the Fi Money App: Manage your credit card, track spends, and redeem Fi-Coins instantly via the sleek digital app.",
        "Track joining fee waivers: The joining fee is completely waived if you are a pre-approved Fi user or open an account against a deposit.",
        "Redeem coins easily: Convert accumulated Fi-Coins online for direct cash vouchers, brand discounts, or gold tokens."
      ];
      customFAQs = [
        { q: "What is zero forex markup?", a: "Standard cards charge a markup fee of 3.5% + taxes on international payments. The Fi Federal card waives this fee, enabling cost-effective overseas shopping and online subscriptions." },
        { q: "How do I redeem Fi-Coins?", a: "You can redeem Fi-Coins inside the Fi app for cash directly credited to your savings account, or choose from a wide range of top brand vouchers." }
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

  const pageContent = newPageData
    ? {
        title: newPageData.title,
        badge: newPageData.badge,
        intro: newPageData.intro,
        moreIntro: newPageData.moreIntro,
        keyFeaturesTitle: newPageData.highlightsTitle,
        keyFeatures: newPageData.highlights,
        recommendTitle: newPageData.ratesTitle,
        recommendHeaders: newPageData.ratesHeaders,
        recommendDetails: newPageData.ratesRows.map(row => ({
          col1: row[0],
          col2: row[1],
          col3: row[2],
          col4: row[3] || "N/A"
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
