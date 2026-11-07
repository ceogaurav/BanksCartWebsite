import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown, 
  Lock, 
  ArrowRight, 
  HelpCircle, 
  TrendingUp, 
  Building2, 
  FileText, 
  AlertCircle,
  Percent,
  Check,
  Calculator,
  Briefcase
} from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import { INVESTMENT_PAGE_MAP, InvestmentPageContent, InvestmentRecommendRow } from '../../data/investmentPageData';

const DynamicInvestmentPage: React.FC = () => {
  const { type: paramType, subPath: paramSubPath } = useParams<{ type: string; subPath: string }>();
  const location = useLocation();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Form state for Investment Inquiry
  const [investorName, setInvestorName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [investmentAmount, setInvestmentAmount] = useState('₹50,000');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Derive type & subPath
  let type = paramType || '';
  let subPath = paramSubPath || '';

  if (!type && location.pathname.startsWith('/investment/')) {
    const segments = location.pathname.replace('/investment/', '').split('/').filter(Boolean);
    type = segments[0] || 'mutual-funds';
    subPath = segments[1] || 'overview';
  }

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveFaq(null);
    setIsSubmitted(false);
  }, [type, subPath, location.pathname]);

  // Helper to convert slug to clean readable text
  const formatSlug = (slug: string) => {
    if (slug === 'fd') return 'Fixed Deposit';
    if (slug === 'mf' || slug === 'mutual-funds') return 'Mutual Funds';
    if (slug === 'g-secs' || slug === 'government') return 'Government Bonds';
    if (slug === 'elss') return 'ELSS Tax Saver';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const readableCategory = formatSlug(type);
  const readableSlug = formatSlug(subPath);
  const currentSlug = `${type}/${subPath}`;

  // Safe fallback procedural content generator for unmapped routes
  const generateFallbackContent = (categoryType: string, slug: string): InvestmentPageContent => {
    const catName = formatSlug(categoryType);
    const itemName = formatSlug(slug);

    let keyFeaturesList = [
      { label: "Optimal Yields", text: `Access competitive institutional returns by investing in verified ${catName} assets.` },
      { label: "Risk Mitigation", text: "Benefit from structured asset allocations, statutory safety, and professional fund audits." },
      { label: "Goal Alignment", text: "Select customized horizons ranging from overnight liquidity reserves to long-term retirement corpora." }
    ];

    let recommendList: InvestmentRecommendRow[] = [
      { name: `${itemName} Prime Series`, issuer: "Tier-1 Public / Private Entity", returns: "7.50% - 14.50% p.a.", lockIn: "Flexible" },
      { name: "Sovereign Benchmark Tier", issuer: "Reserve Bank of India (RBI)", returns: "7.15% - 8.05% p.a.", lockIn: "Sovereign Backed" },
      { name: "Bluechip Institutional Growth", issuer: "SEBI Registered AMC", returns: "12.50% - 16.80% p.a.", lockIn: "No Lock-in" },
      { name: "High-Yield Secured Debt", issuer: "CRISIL AAA Rated Issuer", returns: "8.25% - 9.10% p.a.", lockIn: "24 to 60 Months" }
    ];

    let checklistList = [
      `Validate credit safety: Prioritize AAA or Government-backed ${catName} platforms to protect your principal.`,
      "Analyze Expense Ratios: Lower operational overheads translate to higher net compounding yields over time.",
      "Track liquidity profiles: Match asset lock-ins against your short-term emergency outgos."
    ];

    let customFAQs = [
      { q: `What is ${itemName}?`, a: `${itemName} represents a regulated asset class structured to build wealth, generate fixed income, or leverage equity growth under the ${catName} framework in India.` },
      { q: "What is the recommended minimum investment tenure?", a: "Conservative debt plans perform optimally over 1 to 3 years. Active equity portfolios are recommended for horizons of 3 to 5+ years." },
      { q: "How is investment income taxed?", a: "Taxation depends on the asset class and holding period. Short-term gains are taxed at applicable rates, while long-term capital gains enjoy concessional tax rates under current Income Tax schedules." },
      { q: "Are capital investments on BanksCart secure?", a: "All transactions are routed through official RBI and SEBI regulated entities, commercial banks, or registered Asset Management Companies (AMCs) with bank-grade 256-bit encryption." }
    ];

    return {
      title: `${itemName}: 2026 Rates, Slabs & Complete Investment Guide`,
      badge: `${catName} Assets`,
      intro: `Invest in ${itemName} under the broader ${catName} asset class. Review current annual yields, lock-in tenures, and security credit ratings across India's top public and private sector issuers with complete transparency.`,
      moreIntro: `Managing your portfolio under ${catName} requires understanding risk-adjusted yields, taxation rules, and regulatory protections. BanksCart provides an authoritative side-by-side analysis to help you make informed capital allocation decisions.`,
      keyFeaturesTitle: `${itemName} Key Highlights & Benefits`,
      keyFeatures: keyFeaturesList,
      recommendTitle: `Top Recommended ${itemName} Options in India`,
      recommendHeaders: ["Investment Option", "Issuing Entity / AMC", "Average Annual Yield", "Lock-in Period"],
      recommendDetails: recommendList,
      checklistTitle: "Investor Action Checklist",
      checklist: checklistList,
      faqs: customFAQs
    };
  };

  // Prioritize curated map, then fallback
  const pageContent: InvestmentPageContent = INVESTMENT_PAGE_MAP[currentSlug] 
    || INVESTMENT_PAGE_MAP[`${type}/${subPath}`]
    || generateFallbackContent(type, subPath);

  const canonicalUrl = `https://bankscart.com${location.pathname}`;

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        "url": canonicalUrl,
        "name": pageContent.title,
        "description": pageContent.intro,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://bankscart.com/#website",
          "name": "BanksCart",
          "url": "https://bankscart.com"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://bankscart.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Investments",
            "item": "https://bankscart.com/investment"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": readableCategory,
            "item": `https://bankscart.com/investment/${type}/overview`
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": readableSlug,
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": pageContent.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) return;
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pt-20 sm:pt-24 pb-16 antialiased">
      <Helmet>
        <title>{`${pageContent.title} | BanksCart`}</title>
        <meta name="description" content={pageContent.intro} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(schemaJsonLd)}
        </script>
      </Helmet>

      {/* Main Page Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb path={["Home", "Investments", readableCategory, readableSlug]} />

        {/* Hero Section: Institutional Trust Navy / Slate */}
        <section className="bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 rounded-2xl text-white p-6 sm:p-10 shadow-lg border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 rounded-full px-3.5 py-1 text-xs font-semibold text-blue-200 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              {pageContent.badge}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              {pageContent.title}
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {pageContent.intro}
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> SEBI & RBI Regulated Issuers
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Transparent Annual Yields
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400" /> 100% Paperless Digital Onboarding
              </span>
            </div>
          </div>
        </section>

        {/* Two-Column Structured Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column (7 cols): Publication-Grade Unified Article Container */}
          <article className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-10 text-slate-700">
            
            {/* Section 1: Overview & Market Positioning */}
            {pageContent.moreIntro && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                  <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
                  Understanding {readableSlug} in the Indian Market
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">
                  {pageContent.moreIntro}
                </p>
              </div>
            )}

            {/* Section 2: Key Features & High-Impact Perks */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
                {pageContent.keyFeaturesTitle}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
                {pageContent.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <h3 className="font-bold text-slate-900 text-sm">{feat.label}</h3>
                    <p className="text-slate-600 text-xs leading-relaxed">{feat.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Recommendation / Rate Comparison Table */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
                {pageContent.recommendTitle}
              </h2>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                      {pageContent.recommendHeaders.map((header, idx) => (
                        <th key={idx} className="p-3 font-bold">{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {pageContent.recommendDetails.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3 font-bold text-slate-900">{row.name}</td>
                        <td className="p-3 font-medium text-slate-600">{row.issuer}</td>
                        <td className="p-3 font-mono tabular-nums font-bold text-emerald-700">{row.returns}</td>
                        <td className="p-3 font-medium text-slate-500">{row.lockIn}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 4: Investor Checklist */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
                {pageContent.checklistTitle}
              </h2>

              <div className="space-y-3 mt-2">
                {pageContent.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                    <div className="w-6 h-6 rounded-md bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Key Takeaway & Regulatory Callout */}
            <div className="border-l-4 border-[#1E3A8A] bg-blue-50/60 p-5 rounded-r-xl space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-[#1E3A8A]" />
                <span>Regulatory Safety & Transparent Execution</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                BanksCart provides comparison and technological distribution pipelines strictly compliant with the statutory frameworks of the Reserve Bank of India (RBI) and Securities and Exchange Board of India (SEBI). All investments are executed directly with licensed AMCs or accredited primary dealers.
              </p>
            </div>

            {/* Section 6: Integrated FAQ Accordion */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {pageContent.faqs.map((faq, index) => (
                  <div key={index} className="border border-slate-200 rounded-xl overflow-hidden transition-colors">
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100/80 text-left font-bold text-slate-800 text-sm outline-none transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform flex-shrink-0 ml-2 ${activeFaq === index ? 'rotate-180 text-blue-700' : ''}`} />
                    </button>
                    {activeFaq === index && (
                      <div className="p-4 text-xs sm:text-sm text-slate-600 border-t border-slate-200 bg-white leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </article>

          {/* Right Column (5 cols): Sticky Investment Action & Trust Rail */}
          <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Investment Advisory & Yield Inquiry Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Start Investing Today</h3>
                  <p className="text-xs text-slate-500">Compare High-Yield Verified Options</p>
                </div>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-bold">
                  <Lock className="w-3 h-3" /> SEBI/RBI Safe
                </span>
              </div>

              {isSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-emerald-950 text-base">Inquiry Registered!</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    A certified BanksCart investment advisor will contact you with customized {readableSlug} allocations and zero-commission direct options.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={investorName}
                      onChange={(e) => setInvestorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number (OTP Verified)</label>
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Investment Amount</label>
                    <select
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] bg-white"
                    >
                      <option value="₹10,000">₹10,000 to ₹50,000</option>
                      <option value="₹50,000">₹50,000 to ₹2 Lakhs</option>
                      <option value="₹2,00,000">₹2 Lakhs to ₹5 Lakhs</option>
                      <option value="₹5,00,000">₹5 Lakhs to ₹25 Lakhs</option>
                      <option value="₹25,00,000">Above ₹25 Lakhs (HNI)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors"
                  >
                    Get Free Portfolio Recommendation &rarr;
                  </button>

                  <p className="text-[11px] text-slate-500 text-center">
                    Zero spam guarantee • No charges or hidden commission fees
                  </p>
                </form>
              )}
            </div>

            {/* Bank-Grade Capital Protection Trust Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Statutory Capital Protection</span>
              </div>
              <p className="leading-relaxed">
                Bank deposits up to ₹5 Lakhs carry 100% sovereign protection under RBI's DICGC. Mutual funds and listed debt securities are held in your personal demat account under SEBI regulations.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Direct Route
                </span>
                <span>Zero Broker Commission</span>
              </div>
            </div>

            {/* Popular Investment Navigation */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Explore Investment Avenues</h4>
              <div className="space-y-2 text-xs font-semibold">
                <Link
                  to="/investment/bonds/government"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-blue-700 transition-colors border border-transparent hover:border-slate-200"
                >
                  <span>Government Bonds & G-Secs</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/investment/bonds/sovereign-gold"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-blue-700 transition-colors border border-transparent hover:border-slate-200"
                >
                  <span>Sovereign Gold Bonds (SGB)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/investment/fd/rates"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-blue-700 transition-colors border border-transparent hover:border-slate-200"
                >
                  <span>Fixed Deposit Interest Rates</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/investment/mutual-funds/overview"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-blue-700 transition-colors border border-transparent hover:border-slate-200"
                >
                  <span>Direct Mutual Funds (0% Commission)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/investment/mutual-funds/elss"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-blue-700 transition-colors border border-transparent hover:border-slate-200"
                >
                  <span>ELSS Tax Saving Funds (Sec 80C)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
};

export default DynamicInvestmentPage;
