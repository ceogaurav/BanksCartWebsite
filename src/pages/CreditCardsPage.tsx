import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ApplyButton from '../components/common/ApplyButton';
import { creditCards, CreditCard } from '../data/creditCards';
import {
    CreditCard as CardIcon,
    CheckCircle2,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    Percent,
    Plane,
    Award,
    Search,
    SlidersHorizontal,
    ArrowUpDown,
    ChevronDown,
    ChevronUp,
    X,
    Gift,
    ExternalLink,
    Fuel,
    ShoppingBag,
    Zap,
    Building2,
    HelpCircle,
    Info,
    Layers,
    Lock,
    Clock,
    ArrowRight,
    Sliders,
    Star,
    Wallet
} from 'lucide-react';

interface CreditCardsPageProps {
    openApplyModal?: (loanType?: string) => void;
}

// Category filter definitions
const CATEGORIES = [
    { id: 'all', label: 'All Cards', icon: Layers },
    { id: 'Lifetime Free', label: 'Lifetime Free', icon: Sparkles },
    { id: 'Cashback', label: 'Cashback', icon: Percent },
    { id: 'Travel', label: 'Travel & Lounge', icon: Plane },
    { id: 'Rewards', label: 'Rewards', icon: Award },
    { id: 'Fuel', label: 'Fuel Savings', icon: Fuel },
    { id: 'Shopping', label: 'Shopping & Dining', icon: ShoppingBag },
    { id: 'Premium', label: 'Premium & Metal', icon: Star },
];

// Fee Tier Filters
const FEE_TIERS = [
    { id: 'all', label: 'All Annual Fees' },
    { id: 'free', label: 'Lifetime Free (₹0)' },
    { id: 'under1k', label: 'Under ₹1,000 / year' },
    { id: 'mid', label: '₹1,000 - ₹5,000 / year' },
    { id: 'premium', label: 'Above ₹5,000 / year' },
];

export const CreditCardsPage: React.FC<CreditCardsPageProps> = ({ openApplyModal }) => {
    // Search and Filter States
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedBank, setSelectedBank] = useState('all');
    const [selectedFeeTier, setSelectedFeeTier] = useState('all');
    const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'fee-low' | 'fee-high'>('popular');

    // Comparison Drawer State (Up to 3 cards)
    const [compareList, setCompareList] = useState<string[]>([]);
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

    // Rewards Calculator State
    const [monthlySpend, setMonthlySpend] = useState<number>(35000);
    const [activeSpendCategory, setActiveSpendCategory] = useState<'shopping' | 'travel' | 'dining' | 'fuel'>('shopping');

    // FAQ State
    const [faqSearch, setFaqSearch] = useState('');
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

    // Extract unique issuing banks dynamically from dataset
    const uniqueBanks = useMemo(() => {
        const banks = new Set<string>();
        creditCards.forEach(c => {
            if (c.bankName) banks.add(c.bankName);
            else if (c.provider) banks.add(c.provider);
        });
        return Array.from(banks).sort();
    }, []);

    // Filter and Sort Cards Logic
    const filteredCards = useMemo(() => {
        return creditCards.filter(card => {
            // Search Query
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase();
                const nameMatch = card.name.toLowerCase().includes(q);
                const bankMatch = (card.bankName || card.provider || '').toLowerCase().includes(q);
                const perkMatch = (card.features || []).some(f => f.toLowerCase().includes(q));
                const badgeMatch = (card.badges || []).some(b => b.toLowerCase().includes(q));
                if (!nameMatch && !bankMatch && !perkMatch && !badgeMatch) return false;
            }

            // Category Filter
            if (selectedCategory !== 'all') {
                const cats = card.categories || [card.category];
                if (!cats.some(c => c.toLowerCase() === selectedCategory.toLowerCase())) {
                    return false;
                }
            }

            // Bank Filter
            if (selectedBank !== 'all') {
                const cardBank = card.bankName || card.provider;
                if (cardBank !== selectedBank) return false;
            }

            // Fee Tier Filter
            if (selectedFeeTier !== 'all') {
                const feeText = card.fees?.annual || '';
                const isLtf = feeText.toLowerCase().includes('free') || feeText.toLowerCase().includes('zero') || feeText === '₹0';
                
                // Parse numeric value if present
                const numMatch = feeText.replace(/,/g, '').match(/\d+/);
                const feeNum = numMatch ? parseInt(numMatch[0], 10) : 0;

                if (selectedFeeTier === 'free' && !isLtf) return false;
                if (selectedFeeTier === 'under1k' && (isLtf || feeNum >= 1000)) return false;
                if (selectedFeeTier === 'mid' && (feeNum < 1000 || feeNum > 5000)) return false;
                if (selectedFeeTier === 'premium' && feeNum <= 5000) return false;
            }

            return true;
        }).sort((a, b) => {
            if (sortBy === 'rating') {
                return (b.rating || 0) - (a.rating || 0);
            }
            if (sortBy === 'fee-low') {
                const getFee = (card: CreditCard) => {
                    const text = card.fees?.annual || '';
                    if (text.toLowerCase().includes('free')) return 0;
                    const m = text.replace(/,/g, '').match(/\d+/);
                    return m ? parseInt(m[0], 10) : 99999;
                };
                return getFee(a) - getFee(b);
            }
            if (sortBy === 'fee-high') {
                const getFee = (card: CreditCard) => {
                    const text = card.fees?.annual || '';
                    if (text.toLowerCase().includes('free')) return 0;
                    const m = text.replace(/,/g, '').match(/\d+/);
                    return m ? parseInt(m[0], 10) : 0;
                };
                return getFee(b) - getFee(a);
            }
            // default 'popular': highest rating first, with priority to cards having promoText
            return (b.promoText ? 1 : 0) - (a.promoText ? 1 : 0) || (b.rating || 0) - (a.rating || 0);
        });
    }, [searchQuery, selectedCategory, selectedBank, selectedFeeTier, sortBy]);

    // Comparison Drawer Handlers
    const toggleCompare = (cardId: string) => {
        setCompareList(prev => {
            if (prev.includes(cardId)) {
                return prev.filter(id => id !== cardId);
            }
            if (prev.length >= 3) {
                alert('You can compare a maximum of 3 credit cards simultaneously.');
                return prev;
            }
            return [...prev, cardId];
        });
    };

    const clearCompare = () => setCompareList([]);

    const comparedCards = useMemo(() => {
        return creditCards.filter(c => compareList.includes(c.id));
    }, [compareList]);

    // Estimated Annual Rewards Calculation based on Monthly Spend
    const calculatedAnnualSavings = useMemo(() => {
        const annualSpend = monthlySpend * 12;
        // Conservative 3.5% baseline rewards multiplier with category weightings
        let rate = 0.035;
        if (activeSpendCategory === 'travel') rate = 0.052;
        if (activeSpendCategory === 'dining') rate = 0.045;
        if (activeSpendCategory === 'fuel') rate = 0.025;
        return Math.round(annualSpend * rate);
    }, [monthlySpend, activeSpendCategory]);

    // FAQs Dataset
    const faqs = [
        {
            q: "What is the minimum CIBIL score required for credit card approval?",
            a: "Most Indian banks (such as HDFC, SBI, ICICI, and Axis) prefer a CIBIL score of 720 to 750+ for instant unsecured credit card approvals. However, applicants with credit scores between 650 and 720 can qualify for entry-level or cashback cards with verified income proof, while individuals with zero score can opt for fixed-deposit-backed secured credit cards."
        },
        {
            q: "What does 'Lifetime Free (LTF)' credit card mean?",
            a: "A Lifetime Free (LTF) credit card has ₹0 Joining Fee and ₹0 Annual/Renewal Fee forever, with no minimum annual spend conditions required to waive the fee. You only pay for goods and services you purchase, interest if you carry a rollover balance, or foreign exchange charges if spent abroad."
        },
        {
            q: "How does the annual fee waiver work on credit cards?",
            a: "Many mid-range and premium credit cards waive the subsequent year's renewal fee if your cumulative card spends exceed a specified threshold (e.g., spending ₹1 Lakh or ₹4 Lakhs in a card anniversary year). The fee is either automatically not billed or reversed in your next statement upon reaching the spend milestone."
        },
        {
            q: "Does applying for multiple credit cards hurt my credit score?",
            a: "Submitting multiple direct applications to different lenders in a short span triggers multiple 'hard inquiries', which can temporarily drop your CIBIL rating by 5 to 15 points. At BanksCart, our comparison and pre-approval tools use 100% soft inquiries with zero impact on your CIBIL score."
        },
        {
            q: "What is an interest-free grace period and how do I avoid interest charges?",
            a: "The interest-free period is typically 20 to 50 days between your purchase date and the payment due date. If you pay your 'Total Amount Due' in full on or before the due date, no interest is charged. If you pay only the 'Minimum Amount Due (MAD)', interest ranging from 36% to 44% APR is levied from the date of each purchase."
        },
        {
            q: "What are Foreign Currency (Forex) markup fees?",
            a: "Standard Indian credit cards charge a 3.5% + GST markup fee on transactions conducted in foreign currencies or on international websites. However, premium travel cards (such as HDFC Infinia, Axis Atlas, or IDFC Club Vistara) offer discounted forex markup rates ranging from 0% to 2%."
        },
        {
            q: "Can college students or freelancers get a credit card without salary slips?",
            a: "Yes. Students and non-salaried individuals can obtain a secured credit card backed by a bank Fixed Deposit (FD) starting from ₹10,000, without any income proof or salary slips. Alternatively, you can apply for an add-on card linked to an immediate family member's primary credit card account."
        },
        {
            q: "How do credit card reward points convert to real value or air miles?",
            a: "Reward point valuation varies by issuer and card tier. On basic rewards cards, 1 Reward Point typically equals ₹0.20 to ₹0.25. On super-premium travel cards like HDFC Infinia or Diners Black, 1 Reward Point equals up to ₹1.00 when redeemed for flights, hotel stays, or partner airline air miles (e.g., Singapore Airlines, Vistara, or Club ITC)."
        }
    ];

    const filteredFaqs = faqs.filter(faq =>
        faq.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
        faq.a.toLowerCase().includes(faqSearch.toLowerCase())
    );

    // Structured Data JSON-LD
    const jsonLdData = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.bankscart.com/" },
                    { "@type": "ListItem", "position": 2, "name": "Cards", "item": "https://www.bankscart.com/cards/credit-cards" },
                    { "@type": "ListItem", "position": 3, "name": "Credit Cards", "item": "https://www.bankscart.com/cards/credit-cards" }
                ]
            },
            {
                "@type": "FinancialProduct",
                "name": "BanksCart Credit Card Marketplace",
                "description": "Compare 50+ credit cards from India's leading banks including HDFC, SBI, ICICI, Axis and Amex. Check lifetime free, travel lounge, cashback and fuel cards.",
                "brand": { "@type": "Brand", "name": "BanksCart" },
                "url": "https://www.bankscart.com/cards/credit-cards",
                "category": "Credit Card"
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
                <title>Best Credit Cards in India 2026 – Compare 50+ Top Cards | BanksCart</title>
                <meta
                    name="description"
                    content="Compare 50+ best credit cards in India from HDFC, SBI, ICICI, Axis, Amex. Check lifetime-free, cashback, airport lounge access & fuel cards with 100% free eligibility check."
                />
                <link rel="canonical" href="https://www.bankscart.com/cards/credit-cards" />
                <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
            </Helmet>

            {/* Breadcrumb Navigation */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <Breadcrumb path={["Home", "Cards", "Credit Cards"]} />
                </div>
            </div>

            {/* ==================== HERO SECTION ==================== */}
            <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white pt-12 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                        <div className="lg:col-span-8">
                            <div className="inline-flex items-center gap-2 bg-[#1E3A8A]/60 border border-[#38BDF8]/30 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#38BDF8] mb-4">
                                <Sparkles className="w-3.5 h-3.5" />
                                Official Multi-Bank Comparison Directory 2026
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                                Compare 50+ Top Indian Credit Cards. <span className="text-[#38BDF8]">100% Free.</span>
                            </h1>

                            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                                Discover verified reward multipliers, unlimited airport lounge access, and lifetime-free credit cards. Check your pre-approved eligibility digitally with zero CIBIL score impact.
                            </p>

                            {/* Trust Pill Highlights */}
                            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
                                    <ShieldCheck className="w-5 h-5 text-[#38BDF8] flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-bold text-white">20+ Issuers</p>
                                        <p className="text-[10px] text-slate-400">RBI Regulated</p>
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-bold text-white">Zero Score Drop</p>
                                        <p className="text-[10px] text-slate-400">100% Soft Pull</p>
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
                                    <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-bold text-white">Lifetime Free</p>
                                        <p className="text-[10px] text-slate-400">₹0 Annual Fee</p>
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
                                    <Lock className="w-5 h-5 text-purple-400 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-bold text-white">256-Bit SSL</p>
                                        <p className="text-[10px] text-slate-400">Bank-Grade Privacy</p>
                                    </div>
                                </div>
                            </div>

                            {/* Fast Action CTAs */}
                            <div className="mt-8 flex flex-wrap gap-3">
                                <a
                                    href="#directory"
                                    className="px-6 py-3 bg-[#A16207] hover:bg-amber-800 text-white rounded-lg font-bold text-sm shadow-md transition-all flex items-center gap-2"
                                >
                                    Browse All Cards <ChevronDown className="w-4 h-4" />
                                </a>
                                <a
                                    href="#rewards-calculator"
                                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-semibold text-sm transition-all flex items-center gap-2"
                                >
                                    Calculate Annual Rewards <Sliders className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* Hero Visual Card Stack */}
                        <div className="lg:col-span-4 hidden lg:flex justify-center">
                            <div className="relative w-72 h-44">
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#1E3A8A] to-[#3B82F6] rounded-2xl shadow-2xl p-5 border border-white/20 transform -rotate-6 transition-transform hover:-rotate-3">
                                    <div className="flex justify-between items-start text-white">
                                        <span className="text-xs font-bold tracking-widest uppercase">BanksCart Prime</span>
                                        <span className="text-xs font-bold">VISA Platinum</span>
                                    </div>
                                    <div className="w-9 h-7 bg-amber-400/80 rounded mt-6"></div>
                                    <div className="mt-4 flex justify-between items-center text-white">
                                        <span className="text-xs tracking-widest font-mono">•••• 8829</span>
                                        <span className="text-[11px] font-bold text-emerald-300">5% Cashback</span>
                                    </div>
                                </div>

                                <div className="absolute inset-0 bg-gradient-to-tr from-[#0F172A] via-[#1E293B] to-[#334155] rounded-2xl shadow-2xl p-5 border border-amber-500/30 transform rotate-3 hover:rotate-6 transition-transform">
                                    <div className="flex justify-between items-start text-white">
                                        <span className="text-xs font-bold tracking-widest uppercase text-amber-400">Metal Edition</span>
                                        <span className="text-xs font-bold text-slate-300">Infinite</span>
                                    </div>
                                    <div className="w-9 h-7 bg-gradient-to-br from-amber-300 to-amber-600 rounded mt-6"></div>
                                    <div className="mt-4 flex justify-between items-center text-white">
                                        <span className="text-xs tracking-widest font-mono">•••• 4192</span>
                                        <span className="text-[11px] font-bold text-amber-300">Unlimited Lounge</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== REWARDS & SAVINGS CALCULATOR ==================== */}
            <section id="rewards-calculator" className="py-12 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl border border-slate-200 p-6 sm:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-7">
                                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
                                    <SlidersHorizontal className="w-3.5 h-3.5" />
                                    Interactive Rewards Forecaster
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                                    Estimate Your Annual Credit Card Savings
                                </h2>
                                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                                    Select your primary spending category and monthly card usage to see how much real cashback and reward value you can earn in a year.
                                </p>

                                {/* Category Selector Buttons */}
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {[
                                        { id: 'shopping', label: 'Online Shopping', icon: ShoppingBag },
                                        { id: 'travel', label: 'Flights & Hotels', icon: Plane },
                                        { id: 'dining', label: 'Dining & Food', icon: Star },
                                        { id: 'fuel', label: 'Fuel & Daily Commute', icon: Fuel },
                                    ].map(cat => {
                                        const Icon = cat.icon;
                                        const isActive = activeSpendCategory === cat.id;
                                        return (
                                            <button
                                                key={cat.id}
                                                onClick={() => setActiveSpendCategory(cat.id as any)}
                                                className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                                                    isActive
                                                        ? 'bg-[#1E3A8A] text-white shadow-sm'
                                                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                                                }`}
                                            >
                                                <Icon className="w-3.5 h-3.5" />
                                                {cat.label}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Spend Slider */}
                                <div className="mt-6 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-semibold text-slate-600">Monthly Card Spend</span>
                                        <span className="text-lg font-bold text-[#0F172A] tabular-nums">
                                            ₹{monthlySpend.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="5000"
                                        max="200000"
                                        step="5000"
                                        value={monthlySpend}
                                        onChange={(e) => setMonthlySpend(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                                    />
                                    <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                                        <span>₹5,000 / mo</span>
                                        <span>₹1,00,000 / mo</span>
                                        <span>₹2,00,000 / mo</span>
                                    </div>
                                </div>
                            </div>

                            {/* Annual Value Card */}
                            <div className="lg:col-span-5">
                                <div className="bg-[#0F172A] text-white rounded-xl p-6 sm:p-7 shadow-lg relative overflow-hidden border border-slate-700">
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Gift className="w-32 h-32" />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                                        Calculated Annual Value Back
                                    </p>
                                    <div className="mt-3 flex items-baseline gap-2">
                                        <span className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
                                            ₹{calculatedAnnualSavings.toLocaleString('en-IN')}
                                        </span>
                                        <span className="text-xs text-emerald-400 font-semibold">/ year</span>
                                    </div>
                                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                                        Includes direct merchant cashbacks, milestone bonus vouchers, and domestic lounge access valuations.
                                    </p>

                                    <div className="mt-5 pt-4 border-t border-slate-700/80 space-y-2 text-xs">
                                        <div className="flex justify-between text-slate-300">
                                            <span>Annual Spend Volume:</span>
                                            <span className="font-bold text-white tabular-nums">₹{(monthlySpend * 12).toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-300">
                                            <span>Net Reward Rate:</span>
                                            <span className="font-bold text-emerald-400">
                                                {activeSpendCategory === 'travel' ? '5.2% Accelerated' : activeSpendCategory === 'dining' ? '4.5%' : activeSpendCategory === 'fuel' ? '2.5% Surcharge Free' : '3.5% Flat'}
                                            </span>
                                        </div>
                                    </div>

                                    {openApplyModal && (
                                        <button
                                            onClick={() => openApplyModal('Credit Card - Recommendation')}
                                            className="mt-6 w-full py-2.5 bg-[#A16207] hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow"
                                        >
                                            Get Recommended Card Matches <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== DIRECTORY & FILTERS SECTION ==================== */}
            <section id="directory" className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                        <div>
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-1">
                                <Award className="w-3.5 h-3.5" />
                                Verified Indian Card Directory
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                                Browse Best Credit Cards ({filteredCards.length} Cards Found)
                            </h2>
                            <p className="text-xs sm:text-sm text-slate-600 mt-1">
                                Filter by your preferred bank, annual fee tier, or reward perks like unlimited airport lounge access.
                            </p>
                        </div>

                        {/* Search and Sort controls */}
                        <div className="flex flex-wrap items-center gap-3">
                            <div className="relative min-w-[220px]">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    placeholder="Search card or perk..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-[#1E3A8A] focus:outline-none"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                    >
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                )}
                            </div>

                            <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs">
                                <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value as any)}
                                    className="bg-transparent text-xs font-semibold text-slate-700 focus:outline-none cursor-pointer"
                                >
                                    <option value="popular">Sort: Most Popular</option>
                                    <option value="rating">Sort: Highest Rated</option>
                                    <option value="fee-low">Annual Fee: Low to High</option>
                                    <option value="fee-high">Annual Fee: High to Low</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Category Pill Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
                        {CATEGORIES.map(cat => {
                            const Icon = cat.icon;
                            const isSelected = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all flex-shrink-0 ${
                                        isSelected
                                            ? 'bg-[#1E3A8A] text-white shadow-sm'
                                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                                    }`}
                                >
                                    <Icon className="w-3.5 h-3.5" />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Secondary Filters: Bank and Fee Tier */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3.5 mb-8 flex flex-wrap items-center justify-between gap-3 shadow-sm">
                        <div className="flex flex-wrap items-center gap-3">
                            <span className="text-xs font-bold text-slate-700">Filter By:</span>
                            
                            {/* Bank Dropdown */}
                            <select
                                value={selectedBank}
                                onChange={(e) => setSelectedBank(e.target.value)}
                                className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 focus:ring-1 focus:ring-[#1E3A8A] focus:outline-none"
                            >
                                <option value="all">All Issuing Banks ({uniqueBanks.length})</option>
                                {uniqueBanks.map(bank => (
                                    <option key={bank} value={bank}>{bank}</option>
                                ))}
                            </select>

                            {/* Fee Tier Dropdown */}
                            <select
                                value={selectedFeeTier}
                                onChange={(e) => setSelectedFeeTier(e.target.value)}
                                className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-700 focus:ring-1 focus:ring-[#1E3A8A] focus:outline-none"
                            >
                                {FEE_TIERS.map(f => (
                                    <option key={f.id} value={f.id}>{f.label}</option>
                                ))}
                            </select>

                            {(selectedCategory !== 'all' || selectedBank !== 'all' || selectedFeeTier !== 'all' || searchQuery) && (
                                <button
                                    onClick={() => {
                                        setSelectedCategory('all');
                                        setSelectedBank('all');
                                        setSelectedFeeTier('all');
                                        setSearchQuery('');
                                    }}
                                    className="text-xs font-semibold text-rose-600 hover:text-rose-800 underline ml-2"
                                >
                                    Reset Filters
                                </button>
                            )}
                        </div>

                        <div className="text-xs text-slate-500 font-medium">
                            Comparing: <span className="font-bold text-[#1E3A8A]">{compareList.length}/3</span> cards selected
                        </div>
                    </div>

                    {/* Credit Card Grid */}
                    {filteredCards.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-xl mx-auto shadow-sm">
                            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Search className="w-6 h-6" />
                            </div>
                            <h3 className="text-base font-bold text-slate-800">No matching credit cards found</h3>
                            <p className="text-xs text-slate-500 mt-1">
                                Try resetting your search query or adjusting your category and fee filters.
                            </p>
                            <button
                                onClick={() => {
                                    setSelectedCategory('all');
                                    setSelectedBank('all');
                                    setSelectedFeeTier('all');
                                    setSearchQuery('');
                                }}
                                className="mt-4 px-4 py-2 bg-[#1E3A8A] text-white rounded-lg text-xs font-bold hover:bg-blue-900"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredCards.map((card) => {
                                const isCompared = compareList.includes(card.id);
                                return (
                                    <div
                                        key={card.id}
                                        className={`bg-white rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md ${
                                            isCompared
                                                ? 'border-[#1E3A8A] ring-2 ring-[#1E3A8A]/20'
                                                : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        {/* Card Top: Badges & Issuer */}
                                        <div className="p-5 pb-3">
                                            <div className="flex justify-between items-start gap-2 mb-3">
                                                <div>
                                                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                                                        {card.bankName || card.provider}
                                                    </span>
                                                    <h3 className="text-base font-bold text-[#0F172A] leading-snug mt-0.5">
                                                        {card.name}
                                                    </h3>
                                                </div>
                                                {card.rating && (
                                                    <div className="bg-amber-50 border border-amber-200 text-amber-800 px-2 py-0.5 rounded text-[11px] font-bold flex items-center gap-1 flex-shrink-0">
                                                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                                                        {card.rating}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Card Mockup Visual or Image */}
                                            <div className="relative w-full h-36 bg-gradient-to-tr from-slate-900 to-slate-800 rounded-xl p-4 text-white overflow-hidden my-3 shadow-inner flex flex-col justify-between">
                                                {card.image && !card.image.includes('placehold.co') ? (
                                                    <img
                                                        src={card.image}
                                                        alt={card.name}
                                                        className="absolute inset-0 w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-300"
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).style.display = 'none';
                                                        }}
                                                    />
                                                ) : null}
                                                <div className="relative z-10 flex justify-between items-center text-xs">
                                                    <span className="font-bold tracking-wider text-slate-200 uppercase text-[10px]">
                                                        {card.bankName || 'BANKSCART'}
                                                    </span>
                                                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded">
                                                        {card.category}
                                                    </span>
                                                </div>
                                                <div className="relative z-10 mt-auto">
                                                    <div className="w-7 h-5 bg-amber-400/80 rounded mb-1.5"></div>
                                                    <div className="text-[11px] tracking-widest font-mono text-slate-300">
                                                        •••• •••• •••• 5042
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Badges strip */}
                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {(card.badges || []).slice(0, 3).map((badge, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="bg-blue-50 text-[#1E3A8A] border border-blue-100 text-[10px] font-bold px-2 py-0.5 rounded-full"
                                                    >
                                                        {badge}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Key Perks Bullets */}
                                            <div className="space-y-1.5 text-xs text-slate-600 mb-4 min-h-[72px]">
                                                {(card.features || []).slice(0, 3).map((feat, idx) => (
                                                    <div key={idx} className="flex items-start gap-1.5">
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                                                        <span className="line-clamp-2">{feat}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Promo / Welcome Gift Badge */}
                                            {card.promoText && (
                                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 flex items-center gap-1.5 text-[11px] font-semibold text-amber-900 mb-2">
                                                    <Gift className="w-3.5 h-3.5 text-[#A16207] flex-shrink-0" />
                                                    <span className="truncate">{card.promoText}</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Card Bottom: Fees & Action Buttons */}
                                        <div className="p-5 pt-3 bg-slate-50 border-t border-slate-100">
                                            <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                                                <div className="bg-white p-2 rounded-lg border border-slate-200">
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase">Joining Fee</p>
                                                    <p className="font-bold text-[#0F172A] tabular-nums mt-0.5">
                                                        {card.fees?.joining || '₹0'}
                                                    </p>
                                                </div>
                                                <div className="bg-white p-2 rounded-lg border border-slate-200">
                                                    <p className="text-[10px] font-bold text-slate-500 uppercase">Annual Fee</p>
                                                    <p className="font-bold text-[#0F172A] tabular-nums mt-0.5">
                                                        {card.fees?.annual || '₹0'}
                                                    </p>
                                                </div>
                                            </div>

                                            {card.fees?.renewalWaiver && (
                                                <p className="text-[10px] text-emerald-700 font-semibold mb-3 line-clamp-1">
                                                    ✓ {card.fees.renewalWaiver}
                                                </p>
                                            )}

                                            <div className="space-y-2">
                                                {openApplyModal ? (
                                                    <ApplyButton
                                                        loanType={`Credit Card - ${card.name}`}
                                                        openApplyModal={openApplyModal}
                                                        variant="primary"
                                                        fullWidth={true}
                                                        className="py-2.5 bg-[#A16207] hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                                                    >
                                                        Apply Now
                                                    </ApplyButton>
                                                ) : (
                                                    <button
                                                        className="w-full py-2.5 bg-[#A16207] hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                                                    >
                                                        Apply Now
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => toggleCompare(card.id)}
                                                    className={`w-full py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                                                        isCompared
                                                            ? 'bg-[#1E3A8A] text-white'
                                                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
                                                    }`}
                                                >
                                                    {isCompared ? (
                                                        <>✓ Added to Compare</>
                                                    ) : (
                                                        <>+ Add to Compare</>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* ==================== STICKY COMPARISON DOCK ==================== */}
            {compareList.length > 0 && (
                <div className="fixed bottom-0 inset-x-0 bg-white border-t-2 border-[#1E3A8A] shadow-2xl z-40 py-3.5 px-4 sm:px-6">
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-bold text-[#0F172A] hidden sm:inline">
                                Compare Cards ({compareList.length}/3):
                            </span>
                            <div className="flex items-center gap-2">
                                {comparedCards.map(c => (
                                    <div
                                        key={c.id}
                                        className="bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800 flex items-center gap-1.5"
                                    >
                                        <span className="truncate max-w-[140px]">{c.name}</span>
                                        <button
                                            onClick={() => toggleCompare(c.id)}
                                            className="text-slate-400 hover:text-slate-700"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={clearCompare}
                                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-semibold"
                            >
                                Clear All
                            </button>
                            <button
                                onClick={() => setIsCompareModalOpen(true)}
                                className="px-5 py-2 bg-[#1E3A8A] hover:bg-blue-900 text-white rounded-lg text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                            >
                                Compare Selected ({compareList.length}) <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ==================== COMPARISON MODAL ==================== */}
            {isCompareModalOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
                        <div className="sticky top-0 bg-white p-5 border-b border-slate-200 flex justify-between items-center z-10">
                            <div>
                                <h3 className="text-xl font-bold text-[#0F172A]">Side-by-Side Credit Card Comparison</h3>
                                <p className="text-xs text-slate-500 mt-0.5">Evaluating {comparedCards.length} credit cards across fees, rewards & lounge privileges</p>
                            </div>
                            <button
                                onClick={() => setIsCompareModalOpen(false)}
                                className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-200 bg-slate-50">
                                            <th className="p-3 font-bold text-slate-500 uppercase w-48">Feature / Metric</th>
                                            {comparedCards.map(c => (
                                                <th key={c.id} className="p-3 font-bold text-[#0F172A] text-sm">
                                                    {c.name}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr>
                                            <td className="p-3 font-bold text-slate-600 bg-slate-50/50">Issuing Bank</td>
                                            {comparedCards.map(c => (
                                                <td key={c.id} className="p-3 font-semibold text-slate-800">
                                                    {c.bankName || c.provider}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-bold text-slate-600 bg-slate-50/50">Primary Category</td>
                                            {comparedCards.map(c => (
                                                <td key={c.id} className="p-3 text-slate-700">
                                                    <span className="bg-blue-50 text-[#1E3A8A] font-bold px-2 py-0.5 rounded">
                                                        {c.category}
                                                    </span>
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-bold text-slate-600 bg-slate-50/50">Joining Fee</td>
                                            {comparedCards.map(c => (
                                                <td key={c.id} className="p-3 font-bold text-[#0F172A] tabular-nums">
                                                    {c.fees?.joining || '₹0'}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-bold text-slate-600 bg-slate-50/50">Annual Renewal Fee</td>
                                            {comparedCards.map(c => (
                                                <td key={c.id} className="p-3 font-bold text-[#0F172A] tabular-nums">
                                                    {c.fees?.annual || '₹0'}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-bold text-slate-600 bg-slate-50/50">Fee Waiver Milestone</td>
                                            {comparedCards.map(c => (
                                                <td key={c.id} className="p-3 text-emerald-700 font-medium">
                                                    {c.fees?.renewalWaiver || 'No waiver condition'}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-bold text-slate-600 bg-slate-50/50">Key Highlight Benefits</td>
                                            {comparedCards.map(c => (
                                                <td key={c.id} className="p-3 space-y-1">
                                                    {(c.features || []).map((f, i) => (
                                                        <div key={i} className="flex items-start gap-1 text-[11px] text-slate-600">
                                                            <CheckCircle2 className="w-3 h-3 text-emerald-600 flex-shrink-0 mt-0.5" />
                                                            <span>{f}</span>
                                                        </div>
                                                    ))}
                                                </td>
                                            ))}
                                        </tr>
                                        <tr>
                                            <td className="p-3 font-bold text-slate-600 bg-slate-50/50">Action</td>
                                            {comparedCards.map(c => (
                                                <td key={c.id} className="p-3">
                                                    {openApplyModal ? (
                                                        <ApplyButton
                                                            loanType={`Credit Card - ${c.name}`}
                                                            openApplyModal={openApplyModal}
                                                            variant="primary"
                                                            fullWidth={true}
                                                            className="py-2 bg-[#A16207] hover:bg-amber-800 text-white rounded-lg text-xs font-bold"
                                                            onClick={() => setIsCompareModalOpen(false)}
                                                        >
                                                            Apply Now
                                                        </ApplyButton>
                                                    ) : (
                                                        <button className="w-full py-2 bg-[#A16207] hover:bg-amber-800 text-white rounded-lg text-xs font-bold">
                                                            Apply Now
                                                        </button>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ==================== 4-STEP APPLICATION PROCESS ==================== */}
            <section className="py-16 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
                            <Clock className="w-3.5 h-3.5" />
                            100% Paperless Digital Journey
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                            Apply for Your Credit Card in 4 Simple Steps
                        </h2>
                        <p className="text-sm text-slate-600 mt-2">
                            From instant online comparison to doorstep card dispatch, enjoy a seamless digital onboarding experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                step: "01",
                                title: "Compare & Select",
                                desc: "Choose from 50+ curated cards based on your lifestyle, rewards preference, and annual fee budget."
                            },
                            {
                                step: "02",
                                title: "Instant Soft Eligibility",
                                desc: "Provide basic PAN details to verify pre-approved bank limits with zero impact on your CIBIL rating."
                            },
                            {
                                step: "03",
                                title: "Digital Video KYC",
                                desc: "Complete paperless Aadhaar OTP verification and a quick 2-minute video KYC with the issuing bank."
                            },
                            {
                                step: "04",
                                title: "Virtual & Physical Card",
                                desc: "Generate an instant virtual card for online purchases; receive your embossed physical card in 3–5 days."
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

            {/* ==================== TYPES OF CREDIT CARDS GUIDE ==================== */}
            <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
                            <Layers className="w-3.5 h-3.5" />
                            Comprehensive Card Directory Guide
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                            Explore Different Types of Credit Cards in India
                        </h2>
                        <p className="text-sm text-slate-600 mt-2">
                            Identify the card category specifically engineered to optimize your spending patterns and lifestyle.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Cashback Credit Cards",
                                icon: Percent,
                                color: "text-emerald-600",
                                idealFor: "Everyday utility bills, online shopping, and groceries",
                                keyFeature: "Direct statement credits from 1.5% to 5% without point devaluation",
                                example: "HDFC Millennia, SBI Cashback, Axis Ace"
                            },
                            {
                                title: "Travel & Airport Lounge Cards",
                                icon: Plane,
                                color: "text-blue-600",
                                idealFor: "Frequent domestic flyers, international tourists & business travelers",
                                keyFeature: "Unlimited domestic & international lounge access, low forex markup (0%–2%)",
                                example: "HDFC Infinia, Axis Atlas, Regalia Gold"
                            },
                            {
                                title: "Lifetime Free Credit Cards",
                                icon: Sparkles,
                                color: "text-purple-600",
                                idealFor: "First-time applicants, low spenders, and CIBIL score builders",
                                keyFeature: "Zero joining fee and zero annual renewal fee for life",
                                example: "ICICI Amazon Pay, IDFC FIRST Classic, Federal Scapia"
                            },
                            {
                                title: "Fuel Surcharge Waiver Cards",
                                icon: Fuel,
                                color: "text-amber-600",
                                idealFor: "Daily vehicle commuters and interstate highway drivers",
                                keyFeature: "1% to 5% savings on fuel transactions at BPCL, IOCL, and HPCL bunks",
                                example: "SBI BPCL Octane, ICICI HPCL Super Saver"
                            },
                            {
                                title: "Premium Metal Edition Cards",
                                icon: Star,
                                color: "text-amber-700",
                                idealFor: "High-net-worth individuals, luxury hotel guests & golf enthusiasts",
                                keyFeature: "Crafted in solid metal, 24/7 dedicated concierge, ITC hotel memberships",
                                example: "HDFC Diners Black Metal, Amex Platinum, Axis Magnus"
                            },
                            {
                                title: "Business & Corporate Cards",
                                icon: Building2,
                                color: "text-indigo-600",
                                idealFor: "SME proprietors, startups, GST filings & vendor payments",
                                keyFeature: "Higher credit limits, 51-day credit window, itemized tax deduction tracking",
                                example: "HDFC Business Regalia, SBI Card PRIME Corporate"
                            }
                        ].map((type, idx) => {
                            const Icon = type.icon;
                            return (
                                <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                                            <Icon className={`w-5 h-5 ${type.color}`} />
                                        </div>
                                        <h3 className="text-base font-bold text-[#0F172A]">{type.title}</h3>
                                    </div>
                                    <div className="space-y-2 text-xs">
                                        <div>
                                            <span className="font-bold text-slate-700">Best For: </span>
                                            <span className="text-slate-600">{type.idealFor}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-slate-700">Key Feature: </span>
                                            <span className="text-slate-600">{type.keyFeature}</span>
                                        </div>
                                        <div className="pt-2 border-t border-slate-100 text-[11px] text-[#1E3A8A] font-semibold">
                                            Popular: {type.example}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ==================== 6 GOLDEN HABITS SECTION ==================== */}
            <section className="py-16 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Credit Bureau Advisory
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                            6 Smart Habits to Maximize Your Credit Card
                        </h2>
                        <p className="text-sm text-slate-600 mt-2">
                            Avoid debt traps and maximize reward value while building a stellar 750+ CIBIL score.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Pay Total Amount Due Always",
                                desc: "Never settle for Minimum Amount Due (MAD). Carrying unpaid balances attracts heavy interest charges ranging between 36% to 44% APR from the purchase date."
                            },
                            {
                                title: "Keep Credit Utilization Under 30%",
                                desc: "If your card limit is ₹1,00,000, avoid spending more than ₹30,000. Higher credit utilization signals credit distress and drags your CIBIL rating downward."
                            },
                            {
                                title: "Leverage the 50-Day Interest-Free Window",
                                desc: "Schedule large purchases right after your statement generation date. This gives you up to 50 days of interest-free liquidity before payment is due."
                            },
                            {
                                title: "Redeem Reward Points Before Expiry",
                                desc: "Most reward points have a validity of 2 to 3 years. Track your point balances quarterly and convert them to vouchers, air miles, or statement credit."
                            },
                            {
                                title: "Never Withdraw ATM Cash on Credit Cards",
                                desc: "Cash advances incur an upfront fee of 2.5% to 3% plus immediate daily interest from day one without any interest-free grace window."
                            },
                            {
                                title: "Monitor Monthly Statements for Discrepancies",
                                desc: "Review statements for unrecognized auto-subscriptions or fraudulent charges. Raise unauthorized transaction disputes within 3 days for zero liability."
                            }
                        ].map((habit, idx) => (
                            <div key={idx} className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-5 hover:border-blue-200 transition-all">
                                <div className="flex items-start gap-3">
                                    <div className="w-7 h-7 rounded-full bg-blue-100 text-[#1E3A8A] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                        {idx + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-[#0F172A] mb-1">{habit.title}</h3>
                                        <p className="text-xs text-slate-600 leading-relaxed">{habit.desc}</p>
                                    </div>
                                </div>
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
                            Frequently Asked Questions
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                            Got Questions About Indian Credit Cards?
                        </h2>
                        <p className="text-sm text-slate-600 mt-2">
                            Everything you need to know about eligibility, fees, CIBIL score requirements, and billing cycles.
                        </p>

                        <div className="mt-6 max-w-md mx-auto relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search credit card questions..."
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

export default CreditCardsPage;
