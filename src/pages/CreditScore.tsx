import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import CibilCheckerForm from '../components/common/CibilCheckerForm';
import {
    ShieldCheck,
    TrendingUp,
    CheckCircle2,
    AlertTriangle,
    Lock,
    Sparkles,
    Clock,
    CreditCard,
    ArrowRight,
    ExternalLink,
    FileText,
    PieChart,
    Info,
    ChevronDown,
    ChevronUp,
    RefreshCw,
    Award,
    Zap,
    BarChart3,
    Search,
    HelpCircle,
    Building2,
    Flame
} from 'lucide-react';

export const CreditScore: React.FC = () => {
    // Interactive Score Simulator State
    const [simulatedScore, setSimulatedScore] = useState<number>(750);
    const [faqSearch, setFaqSearch] = useState('');
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    // Calculate Meter Angle & Color Tier strictly adhering to MASTER.md:
    // 300-599: Red (#DC2626)
    // 600-724: Amber (#D97706)
    // 725-799: Blue (#2563EB)
    // 800-900: Emerald (#059669)
    const minScore = 300;
    const maxScore = 900;
    const normalizedScore = Math.min(Math.max(simulatedScore, minScore), maxScore);
    const percent = (normalizedScore - minScore) / (maxScore - minScore); // 0.0 to 1.0
    const angleDeg = percent * 180 - 180; // -180deg (left) to 0deg (right)

    let tierLabel = "Needs Immediate Attention";
    let tierColor = "#DC2626"; // Red
    let tierBadgeClass = "bg-rose-50 text-rose-700 border-rose-200";
    let approvalOdds = "15% - 25%";
    let loanRateEstimate = "18.50% - 24.00% p.a.";
    let sanctionLimit = "Up to ₹2 Lakhs (Secured only)";
    let creditCardTier = "Secured FD-Backed Credit Cards Only";

    if (simulatedScore >= 600 && simulatedScore <= 724) {
        tierLabel = "Fair / Moderate Risk";
        tierColor = "#D97706"; // Amber
        tierBadgeClass = "bg-amber-50 text-amber-700 border-amber-200";
        approvalOdds = "50% - 65%";
        loanRateEstimate = "14.00% - 17.50% p.a.";
        sanctionLimit = "Up to ₹5 Lakhs (Income verification required)";
        creditCardTier = "Entry-Level Cashback Cards (₹25k - ₹50k limit)";
    } else if (simulatedScore >= 725 && simulatedScore <= 799) {
        tierLabel = "Good / Fast-Track Approvals";
        tierColor = "#2563EB"; // Blue
        tierBadgeClass = "bg-blue-50 text-blue-700 border-blue-200";
        approvalOdds = "85% - 92%";
        loanRateEstimate = "10.99% - 13.50% p.a.";
        sanctionLimit = "Up to ₹25 Lakhs (Unsecured instant disbursal)";
        creditCardTier = "Mid-Premium Rewards & Lounge Cards (₹1L - ₹3L limit)";
    } else if (simulatedScore >= 800) {
        tierLabel = "Excellent / Prime Borrower";
        tierColor = "#059669"; // Emerald
        tierBadgeClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
        approvalOdds = "95% - 99%";
        loanRateEstimate = "9.99% - 11.50% p.a. (Zero processing fees)";
        sanctionLimit = "Up to ₹50 Lakhs (Pre-approved instant disbursal)";
        creditCardTier = "Super-Premium Metal & Infinite Cards (₹5L+ limit)";
    }

    // FAQs Dataset
    const faqs = [
        {
            q: "Does checking my CIBIL score on BanksCart reduce or hurt my score?",
            a: "No, absolutely not. Inquiries initiated by you directly through BanksCart are classified as 'Soft Inquiries' (Consumer Disclosed Inquiries). Unlike bank loan applications which count as 'Hard Inquiries', soft checks never deduct points from your CIBIL rating, regardless of how often you check."
        },
        {
            q: "What is the difference between a CIBIL score and an Experian score?",
            a: "TransUnion CIBIL and Experian are both RBI-authorized Credit Information Companies (CICs) in India. Both utilize numerical scores ranging from 300 to 900. While CIBIL is historically favored by traditional public and private sector banks (like SBI and HDFC), Experian is heavily utilized by digital fintechs and NBFCs for instant credit decisions."
        },
        {
            q: "What is a 'Good' CIBIL score to get instant personal loan approval?",
            a: "A CIBIL score of 750 or above is considered the golden benchmark by Indian lenders. Applicants with a 750+ score unlock the lowest interest rates starting from 10.25% p.a., pre-approved instant disbursals, zero collateral requirements, and waiving of administrative processing fees."
        },
        {
            q: "What does 'CIBIL NA' or 'CIBIL NH' mean?",
            a: "A score marked as 'NA' (Not Applicable) or 'NH' (No History) indicates that you do not have sufficient credit activity in the last 24 to 36 months, or you have never taken a loan or credit card before. It is not a negative score; it simply signifies a new-to-credit (NTC) borrower."
        },
        {
            q: "How often do banks update credit data with CIBIL?",
            a: "Per RBI mandate, banks and NBFCs must report borrower repayment data, EMI clearances, credit card balances, and defaults to all 4 credit bureaus at least once every 30 days (usually at month-end). Any credit repair action takes 30 to 45 days to reflect on your refreshed bureau score."
        },
        {
            q: "How can I remove wrong default marks or wrongful settlements from my report?",
            a: "If an account shows as 'Settled' or 'Written Off' erroneously, you can file a formal bureau dispute via BanksCart's Credit Rectification Service. We assist in petitioning the reporting bank's nodal officer to issue an official No Due Certificate (NDC) and submit a correction patch to TransUnion CIBIL."
        },
        {
            q: "How does the Credit Utilization Ratio (CUR) affect my score?",
            a: "Credit Utilization Ratio accounts for 30% of your total CIBIL score. If your combined card limit is ₹1,00,000 and you spend ₹60,000, your CUR is 60%. Lenders view ratios above 30% as credit hunger and risk. Maintaining your card utilization strictly below 30% can boost your score by 20 to 50 points within 3 months."
        },
        {
            q: "Can I get an unsecured personal loan with a CIBIL score below 650?",
            a: "While traditional banks generally reject unsecured applications below 650, specialized NBFCs and digital lenders offer subprime loans at higher interest rates (18% to 26% p.a.) if you have stable monthly salary deposits. Alternatively, applying with a creditworthy co-applicant or opting for a gold loan can guarantee approval."
        }
    ];

    const filteredFaqs = faqs.filter(f =>
        f.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
        f.a.toLowerCase().includes(faqSearch.toLowerCase())
    );

    // Structured Data JSON-LD
    const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.bankscart.com/" },
                    { "@type": "ListItem", "position": 2, "name": "Credit Bureau", "item": "https://www.bankscart.com/credit-score" },
                    { "@type": "ListItem", "position": 3, "name": "Free CIBIL Score", "item": "https://www.bankscart.com/credit-score" }
                ]
            },
            {
                "@type": "FinancialService",
                "name": "BanksCart Free Credit Bureau & CIBIL Check",
                "description": "Check free CIBIL score online with instant bureau report, soft inquiry guarantee, credit score simulator, and pre-approved loan matching.",
                "url": "https://www.bankscart.com/credit-score",
                "serviceType": "Credit Bureau Intelligence",
                "provider": { "@type": "Organization", "name": "BanksCart" }
            },
            {
                "@type": "FAQPage",
                "mainEntity": faqs.map(f => ({
                    "@type": "Question",
                    "name": f.q,
                    "acceptedAnswer": { "@type": "Answer", "text": f.a }
                }))
            }
        ]
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] font-ibm">
            <Helmet>
                <title>Free CIBIL Score Check Online (Instant Bureau Report) | BanksCart</title>
                <meta
                    name="description"
                    content="Check your official CIBIL and Experian credit score online for free on BanksCart. 100% secure soft pull with zero score impact. Get credit health analysis, pre-approved loan offers, and dispute clearing guidance."
                />
                <link rel="canonical" href="https://www.bankscart.com/credit-score" />
                <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
            </Helmet>

            {/* Breadcrumb Navigation */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <Breadcrumb path={["Home", "Credit Bureau", "Free CIBIL Score"]} />
                </div>
            </div>

            {/* ==================== HERO SECTION ==================== */}
            <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white pt-12 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <div className="inline-flex items-center gap-2 bg-[#1E3A8A]/60 border border-[#38BDF8]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#38BDF8] mb-4">
                            <Sparkles className="w-3.5 h-3.5" />
                            Official CIC Bureau Soft-Inquiry Gateway
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                            Check Your Free <span className="text-[#38BDF8]">CIBIL & Credit Score</span> Online
                        </h1>

                        <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                            Access your complete credit health analysis directly from TransUnion CIBIL and Experian. Free lifetime tracking, monthly automated score refreshes, and zero impact on your rating.
                        </p>
                    </div>

                    {/* Trust Badges Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
                            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                            <div>
                                <p className="text-xs font-bold text-white">100% Free Lifetime</p>
                                <p className="text-[10px] text-slate-400">No Hidden Subscriptions</p>
                            </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
                            <Flame className="w-5 h-5 text-amber-400 flex-shrink-0" />
                            <div>
                                <p className="text-xs font-bold text-white">Zero Score Drop</p>
                                <p className="text-[10px] text-slate-400">Classified as Soft Pull</p>
                            </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
                            <RefreshCw className="w-5 h-5 text-[#38BDF8] flex-shrink-0" />
                            <div>
                                <p className="text-xs font-bold text-white">Monthly Refreshes</p>
                                <p className="text-[10px] text-slate-400">Auto Track Improvements</p>
                            </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
                            <Lock className="w-5 h-5 text-purple-400 flex-shrink-0" />
                            <div>
                                <p className="text-xs font-bold text-white">256-Bit SSL Safe</p>
                                <p className="text-[10px] text-slate-400">Bank-Grade Privacy</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== CORE SPLIT GRID ==================== */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                        {/* ==================== LEFT COLUMN: BUREAU SIMULATOR & INTELLIGENCE ==================== */}
                        <div className="lg:col-span-7 space-y-8">
                            {/* Interactive Score Simulator Card */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                                    <div>
                                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
                                            <BarChart3 className="w-3.5 h-3.5" />
                                            Credit Bureau Gauge Simulator
                                        </div>
                                        <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] mt-0.5">
                                            Test Your Score & Loan Approval Odds
                                        </h2>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${tierBadgeClass} self-start sm:self-auto`}>
                                        {tierLabel}
                                    </span>
                                </div>

                                {/* SVG Semi-Circle Radial Gauge adhering strictly to MASTER.md color bands */}
                                <div className="relative w-72 h-44 mx-auto my-4 flex flex-col items-center justify-end">
                                    <svg viewBox="0 0 240 140" className="w-full h-full overflow-visible">
                                        <defs>
                                            {/* Drop shadow for pointer */}
                                            <filter id="gaugeShadow" x="-20%" y="-20%" width="140%" height="140%">
                                                <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" />
                                            </filter>
                                        </defs>

                                        {/* Center: 120, 120. Radius: 95. StrokeWidth: 16 */}
                                        {/* 1. Red Segment: 300 to 599 (180° to 225°) */}
                                        <path
                                            d="M 25 120 A 95 95 0 0 1 52.8 52.8"
                                            fill="none"
                                            stroke="#DC2626"
                                            strokeWidth="16"
                                            strokeLinecap="round"
                                        />

                                        {/* 2. Amber Segment: 600 to 724 (227° to 267°) */}
                                        <path
                                            d="M 56.5 49.5 A 95 95 0 0 1 115 25.1"
                                            fill="none"
                                            stroke="#D97706"
                                            strokeWidth="16"
                                            strokeLinecap="round"
                                        />

                                        {/* 3. Blue Segment: 725 to 799 (273° to 313°) */}
                                        <path
                                            d="M 125 25.1 A 95 95 0 0 1 183.5 49.5"
                                            fill="none"
                                            stroke="#2563EB"
                                            strokeWidth="16"
                                            strokeLinecap="round"
                                        />

                                        {/* 4. Emerald Segment: 800 to 900 (315° to 360°) */}
                                        <path
                                            d="M 187.2 52.8 A 95 95 0 0 1 215 120"
                                            fill="none"
                                            stroke="#059669"
                                            strokeWidth="16"
                                            strokeLinecap="round"
                                        />

                                        {/* Needle Pointer */}
                                        <g transform={`translate(120, 120) rotate(${angleDeg})`} filter="url(#gaugeShadow)">
                                            <path d="M -8 -4 L 80 0 L -8 4 Z" fill="#0F172A" />
                                            <circle cx="0" cy="0" r="9" fill="#0F172A" />
                                            <circle cx="0" cy="0" r="4" fill="#FFFFFF" />
                                        </g>
                                    </svg>

                                    {/* Central Score Readout */}
                                    <div className="text-center mt-1">
                                        <span className="text-4xl font-extrabold text-[#0F172A] tabular-nums tracking-tight">
                                            {simulatedScore}
                                        </span>
                                        <span className="text-xs text-slate-500 block font-semibold">
                                            Out of 900 Points
                                        </span>
                                    </div>
                                </div>

                                {/* Slider for interactive exploration */}
                                <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <div className="flex justify-between items-center text-xs mb-2">
                                        <span className="font-bold text-slate-700">Drag to Test CIBIL Score Impact</span>
                                        <span className="font-bold text-[#1E3A8A] tabular-nums">{simulatedScore} / 900</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="300"
                                        max="900"
                                        step="5"
                                        value={simulatedScore}
                                        onChange={(e) => setSimulatedScore(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                                    />
                                    <div className="flex justify-between text-[10px] font-bold text-slate-500 mt-1">
                                        <span className="text-rose-600">Poor (300)</span>
                                        <span className="text-amber-600">Fair (600)</span>
                                        <span className="text-blue-600">Good (725)</span>
                                        <span className="text-emerald-600">Excellent (800-900)</span>
                                    </div>
                                </div>

                                {/* Dynamic Product Unlock Matrix for this Score */}
                                <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Personal Loan Approval Odds</span>
                                        <span className="font-bold text-[#0F172A] text-sm mt-0.5 block">{approvalOdds}</span>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Typical Interest Rate Offered</span>
                                        <span className="font-bold text-emerald-700 text-sm mt-0.5 block">{loanRateEstimate}</span>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Estimated Sanction Limit</span>
                                        <span className="font-bold text-[#0F172A] text-sm mt-0.5 block">{sanctionLimit}</span>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Credit Card Eligibility</span>
                                        <span className="font-bold text-[#1E3A8A] text-sm mt-0.5 block line-clamp-1">{creditCardTier}</span>
                                    </div>
                                </div>
                            </div>

                            {/* The 5 Core Pillars of CIBIL Score (Weightage Breakdown) */}
                            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm">
                                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-1">
                                    <PieChart className="w-3.5 h-3.5" />
                                    Bureau Scoring Algorithm Breakdown
                                </div>
                                <h3 className="text-xl font-bold text-[#0F172A] mb-2">
                                    The 5 Factors That Determine Your CIBIL Score
                                </h3>
                                <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                                    Credit Information Companies evaluate your financial health based on weighted parameters. Understanding these weights helps you boost your score quickly.
                                </p>

                                <div className="space-y-4">
                                    {[
                                        {
                                            factor: "Payment History",
                                            weight: "35% Weightage",
                                            desc: "Your track record of paying EMIs and credit card bills before the due date. Single 30+ DPD defaults can drop scores significantly.",
                                            color: "bg-emerald-500",
                                            width: "100%"
                                        },
                                        {
                                            factor: "Credit Utilization Ratio (CUR)",
                                            weight: "30% Weightage",
                                            desc: "The percentage of your total revolving credit card limit used. Experts advise maintaining card utilization strictly below 30%.",
                                            color: "bg-blue-600",
                                            width: "85%"
                                        },
                                        {
                                            factor: "Length of Credit History",
                                            weight: "15% Weightage",
                                            desc: "The average age of your oldest credit card or loan accounts. Keeping older accounts active establishes stability.",
                                            color: "bg-indigo-500",
                                            width: "60%"
                                        },
                                        {
                                            factor: "Credit Mix (Secured vs Unsecured)",
                                            weight: "10% Weightage",
                                            desc: "A balanced blend of secured loans (Home, Auto) and unsecured loans (Personal, Credit Cards) demonstrates healthy credit management.",
                                            color: "bg-amber-500",
                                            width: "40%"
                                        },
                                        {
                                            factor: "Recent Inquiries (Credit Hunger)",
                                            weight: "10% Weightage",
                                            desc: "Too many loan applications within 90 days trigger hard inquiries, signalling high financial stress to future lenders.",
                                            color: "bg-purple-500",
                                            width: "30%"
                                        }
                                    ].map((item, idx) => (
                                        <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="font-bold text-sm text-[#0F172A]">{item.factor}</span>
                                                <span className="text-xs font-bold text-[#1E3A8A] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">
                                                    {item.weight}
                                                </span>
                                            </div>
                                            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden my-2">
                                                <div className={`h-full ${item.color} rounded-full`} style={{ width: item.width }}></div>
                                            </div>
                                            <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* ==================== RIGHT COLUMN: STICKY FORM & SECURITY ==================== */}
                        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
                            {/* Embedded Verified CibilCheckerForm */}
                            <div className="bg-white border-2 border-[#1E3A8A]/20 rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 right-0 bg-[#1E3A8A] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl flex items-center gap-1">
                                    <Lock className="w-3 h-3" /> 256-Bit SSL
                                </div>

                                <div className="mb-5">
                                    <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">
                                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                        100% Free • Zero Score Impact
                                    </div>
                                    <h3 className="text-xl font-bold text-[#0F172A]">
                                        Instant CIBIL & Bureau Check
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Enter your official details to fetch your refreshed report in under 60 seconds.
                                    </p>
                                </div>

                                <CibilCheckerForm sourcePage="Credit Score Page Redesign" />

                                <div className="mt-6 pt-5 border-t border-slate-100 space-y-2 text-xs text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                        <span>Soft check logged strictly under 'Self Consumer Inquiry'</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                        <span>Zero spam guarantee — data is never shared with telemarketers</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                        <span>Official partnership via licensed RBI credit bureaus</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== DIAGNOSTIC & RECOVERY ECOSYSTEM ==================== */}
            <section className="py-16 bg-white border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
                            <Zap className="w-3.5 h-3.5" />
                            Credit Health & Grievance Solutions
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                            Specialized Bureau Diagnostic & Recovery Services
                        </h2>
                        <p className="text-sm text-slate-600 mt-2">
                            Struggling with low scores, incorrect defaults, or past settlement remarks? Access official diagnostic tools and legal grievance resolution.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Service 1: CIBIL Report Check */}
                        <div className="bg-[#F8FAFC] border border-teal-200/80 rounded-2xl p-6 hover:shadow-md transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[11px] font-bold text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                        Free Bureau Check
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-teal-600" />
                                </div>
                                <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                                    Official CIBIL Credit Report
                                </h3>
                                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                    Download your exhaustive credit report detailing all active loan accounts, credit card balances, DPD repayment grids, and credit utilization with zero score penalty.
                                </p>
                            </div>
                            <Link
                                to="/cibil-credit-report"
                                className="text-xs font-bold text-teal-700 hover:text-teal-900 inline-flex items-center gap-1 group mt-2"
                            >
                                Access CIBIL Credit Report <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Service 2: Credit Rectification */}
                        <div className="bg-[#F8FAFC] border border-blue-200/80 rounded-2xl p-6 hover:shadow-md transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[11px] font-bold text-[#1E3A8A] bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                        Dispute & Rectification
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-[#1E3A8A]" />
                                </div>
                                <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                                    Credit Score Rectification Service
                                </h3>
                                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                    Identify inaccuracies, wrongful default remarks, identity theft accounts, or outstanding settlement flags. Work with dedicated grievance specialists to petition bank nodal officers.
                                </p>
                            </div>
                            <Link
                                to="/credit-score/credit-rectification-service"
                                className="text-xs font-bold text-[#1E3A8A] hover:text-blue-900 inline-flex items-center gap-1 group mt-2"
                            >
                                Professional Credit Rectification <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>

                        {/* Service 3: Credit Health Audit */}
                        <div className="bg-[#F8FAFC] border border-indigo-200/80 rounded-2xl p-6 hover:shadow-md transition-all flex flex-col justify-between">
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                        360° Health Audit
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-indigo-600" />
                                </div>
                                <h3 className="text-lg font-bold text-[#0F172A] mb-2">
                                    Credit Health Report Services
                                </h3>
                                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                                    Comprehensive 360-degree review of your active trade lines, FOIR debt ratios, repayment trajectories, and personalized step-by-step action plans to achieve a 750+ score.
                                </p>
                            </div>
                            <Link
                                to="/credit-health-report-services"
                                className="text-xs font-bold text-indigo-700 hover:text-indigo-900 inline-flex items-center gap-1 group mt-2"
                            >
                                Detailed Credit Health Report <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== 4 RBI-LICENSED BUREAUS COMPARISON ==================== */}
            <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
                            <Building2 className="w-3.5 h-3.5" />
                            Regulatory Transparency
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                            India's 4 RBI-Authorized Credit Information Companies
                        </h2>
                        <p className="text-sm text-slate-600 mt-2">
                            Under the Credit Information Companies (Regulation) Act, 2005, four credit bureaus operate in India under the supervision of the Reserve Bank of India.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                                        <th className="p-4">Credit Bureau</th>
                                        <th className="p-4">Parent Entity</th>
                                        <th className="p-4">Scoring Range</th>
                                        <th className="p-4">Primary Adoption in India</th>
                                        <th className="p-4">Dispute Turnaround</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                    <tr className="hover:bg-slate-50/50">
                                        <td className="p-4 font-bold text-[#0F172A]">TransUnion CIBIL</td>
                                        <td className="p-4">TransUnion Corp (USA)</td>
                                        <td className="p-4 font-bold tabular-nums text-[#1E3A8A]">300 – 900</td>
                                        <td className="p-4">Public & Private Retail Banks (SBI, HDFC, ICICI, Axis)</td>
                                        <td className="p-4 font-semibold text-emerald-700">30 Calendar Days</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50">
                                        <td className="p-4 font-bold text-[#0F172A]">Experian India</td>
                                        <td className="p-4">Experian plc (UK)</td>
                                        <td className="p-4 font-bold tabular-nums text-[#1E3A8A]">300 – 900</td>
                                        <td className="p-4">Digital Lending Platforms, Fintechs & NBFCs</td>
                                        <td className="p-4 font-semibold text-emerald-700">30 Calendar Days</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50">
                                        <td className="p-4 font-bold text-[#0F172A]">Equifax India</td>
                                        <td className="p-4">Equifax Inc (USA)</td>
                                        <td className="p-4 font-bold tabular-nums text-[#1E3A8A]">300 – 900</td>
                                        <td className="p-4">Microfinance (MFI) & Regional Rural Lenders</td>
                                        <td className="p-4 font-semibold text-emerald-700">30 Calendar Days</td>
                                    </tr>
                                    <tr className="hover:bg-slate-50/50">
                                        <td className="p-4 font-bold text-[#0F172A]">CRIF High Mark</td>
                                        <td className="p-4">CRIF S.p.A. (Italy)</td>
                                        <td className="p-4 font-bold tabular-nums text-[#1E3A8A]">300 – 900</td>
                                        <td className="p-4">Commercial, MSME & Joint Liability Groups (JLG)</td>
                                        <td className="p-4 font-semibold text-emerald-700">30 Calendar Days</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== 4 STEPS TO 750+ PLAYBOOK ==================== */}
            <section className="py-16 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
                            <TrendingUp className="w-3.5 h-3.5" />
                            Credit Score Optimization Guide
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                            How to Rebuild & Boost Your CIBIL Score to 750+
                        </h2>
                        <p className="text-sm text-slate-600 mt-2">
                            Actionable, proven financial steps to repair past credit damage and unlock prime borrowing terms.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                step: "01",
                                title: "Audit for Clerical Errors",
                                desc: "Review your full bureau report for closed accounts erroneously reported open, mismatched PAN numbers, or identity mix-ups."
                            },
                            {
                                step: "02",
                                title: "Cap Utilization at 30%",
                                desc: "Never exhaust your credit card limits. If your limit is ₹1 Lakh, spend no more than ₹30,000, or prepay before statement date."
                            },
                            {
                                step: "03",
                                title: "Never Miss an EMI Date",
                                desc: "Set up National Automated Clearing House (NACH) auto-debits for all active EMIs to maintain a 100% on-time repayment history."
                            },
                            {
                                step: "04",
                                title: "Avoid Multiple Inquiries",
                                desc: "Do not apply for multiple loans within a short window. Space out loan applications by at least 90 days to avoid appearing credit hungry."
                            }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 relative hover:shadow-md transition-all group"
                            >
                                <span className="text-3xl font-extrabold text-slate-300 group-hover:text-[#1E3A8A] transition-colors tabular-nums block mb-2">
                                    {item.step}
                                </span>
                                <h3 className="text-base font-bold text-[#0F172A] mb-2">{item.title}</h3>
                                <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== FAQ ACCORDION SECTION ==================== */}
            <section className="py-16 bg-[#F8FAFC]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
                            <HelpCircle className="w-3.5 h-3.5" />
                            Credit Bureau Advisory
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                            Frequently Asked Questions About Credit Scores
                        </h2>
                        <p className="text-sm text-slate-600 mt-2">
                            Get transparent, authoritative answers regarding CIBIL scores, soft pulls, and dispute rectifications.
                        </p>

                        <div className="mt-6 max-w-md mx-auto relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search credit score questions..."
                                value={faqSearch}
                                onChange={(e) => setFaqSearch(e.target.value)}
                                className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        {filteredFaqs.map((faq, idx) => {
                            const isOpen = openFaqIndex === idx;
                            return (
                                <div
                                    key={idx}
                                    className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm transition-all"
                                >
                                    <button
                                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                                        className="w-full p-4 sm:p-5 text-left font-bold text-sm text-[#0F172A] flex justify-between items-center gap-3 hover:bg-slate-50 transition-colors"
                                    >
                                        <span>{faq.q}</span>
                                        <ChevronDown
                                            className={`w-4 h-4 text-slate-500 transition-transform duration-200 flex-shrink-0 ${
                                                isOpen ? 'transform rotate-180 text-[#1E3A8A]' : ''
                                            }`}
                                        />
                                    </button>
                                    {isOpen && (
                                        <div className="px-5 pb-5 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                                            {faq.a}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CreditScore;
