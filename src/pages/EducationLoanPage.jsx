import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import ApplyButton from '../components/common/ApplyButton';
import {
    GraduationCap,
    CheckCircle2,
    ShieldCheck,
    Sparkles,
    TrendingUp,
    Percent,
    Plane,
    Award,
    Search,
    ChevronDown,
    Building2,
    HelpCircle,
    Info,
    Layers,
    Lock,
    Clock,
    ArrowRight,
    Sliders,
    BookOpen,
    DollarSign,
    FileText,
    Calculator,
    Compass,
    Check,
    Phone,
    Mail,
    Globe2
} from 'lucide-react';

const EducationLoanPage = ({ openApplyModal }) => {
    // Calculator State
    const [loanAmount, setLoanAmount] = useState(2500000); // 25 Lakhs default
    const [interestRate, setInterestRate] = useState(9.25); // 9.25% p.a.
    const [repaymentTenure, setRepaymentTenure] = useState(10); // 10 years repayment
    const [moratoriumYears, setMoratoriumYears] = useState(2); // 2 years course duration

    // Track Filter State for Domestic vs Abroad
    const [studyTrack, setStudyTrack] = useState('abroad'); // 'domestic' or 'abroad'

    // FAQ State
    const [faqSearch, setFaqSearch] = useState('');
    const [openFaqIndex, setOpenFaqIndex] = useState(0);

    // Active Document Tab
    const [activeDocTab, setActiveDocTab] = useState('academic');

    // EMI Calculation (Post-Moratorium Standard Reducing Balance)
    const { monthlyEmi, totalInterest, totalPayment, annualTaxSavings } = useMemo(() => {
        const principal = parseFloat(loanAmount) || 0;
        const annualRate = parseFloat(interestRate) || 0;
        const tenureMonths = parseInt(repaymentTenure, 10) * 12;

        if (principal <= 0 || annualRate <= 0 || tenureMonths <= 0) {
            return { monthlyEmi: 0, totalInterest: 0, totalPayment: 0, annualTaxSavings: 0 };
        }

        const monthlyRate = annualRate / 12 / 100;
        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
            (Math.pow(1 + monthlyRate, tenureMonths) - 1);
        const totalPay = emi * tenureMonths;
        const totalInt = totalPay - principal;

        // Estimated annual 80E tax savings assuming 30% tax bracket on average interest in first year
        const avgFirstYearInterest = principal * (annualRate / 100);
        const taxSaved = Math.round(avgFirstYearInterest * 0.312); // 30% + 4% cess

        return {
            monthlyEmi: Math.round(emi),
            totalInterest: Math.round(totalInt),
            totalPayment: Math.round(totalPay),
            annualTaxSavings: taxSaved
        };
    }, [loanAmount, interestRate, repaymentTenure]);

    // Top Indian Banks for Education Loans Dataset
    const bankComparison = [
        {
            bank: "State Bank of India (SBI)",
            scheme: "Student Loan & Scholar Scheme",
            rate: "8.15% - 9.65%",
            maxAmount: "Up to ₹1.50 Crores",
            collateral: "No collateral up to ₹7.5L (Up to ₹40L for IIT/IIM)",
            tenure: "Up to 15 Years",
            perk: "0.50% interest concession for female students"
        },
        {
            bank: "HDFC Credila",
            scheme: "Specialized Education Loan",
            rate: "9.25% - 12.75%",
            maxAmount: "Up to ₹1.50 Crores+",
            collateral: "Flexible collateral & co-borrower options",
            tenure: "Up to 15 Years",
            perk: "Instant pre-visa sanction letter for abroad studies"
        },
        {
            bank: "Bank of Baroda",
            scheme: "Baroda Scholar (Global)",
            rate: "8.55% - 9.90%",
            maxAmount: "Up to ₹1.50 Crores",
            collateral: "Tangible security above ₹7.5 Lakhs",
            tenure: "Up to 15 Years",
            perk: "Zero margin money requirement for premier world colleges"
        },
        {
            bank: "ICICI Bank",
            scheme: "Education Loan (India & Overseas)",
            rate: "9.50% - 11.75%",
            maxAmount: "Up to ₹1.00 Crore",
            collateral: "Collateral-free up to ₹50L for top 100 institutes",
            tenure: "Up to 12 Years",
            perk: "100% digital sanction based on university offer letter"
        },
        {
            bank: "Axis Bank",
            scheme: "Prime Education Loan",
            rate: "9.75% - 13.00%",
            maxAmount: "Up to ₹75 Lakhs",
            collateral: "Third-party guarantee / property above ₹7.5L",
            tenure: "Up to 15 Years",
            perk: "No prepayment penalties on partial or full closure"
        },
        {
            bank: "Punjab National Bank (PNB)",
            scheme: "PNB Saraswati & Udaan",
            rate: "8.75% - 10.25%",
            maxAmount: "Up to ₹1.00 Crore",
            collateral: "Collateral required for loans above ₹7.5 Lakhs",
            tenure: "Up to 15 Years",
            perk: "Moratorium covers course duration + 1 year"
        },
        {
            bank: "Avanse Financial Services",
            scheme: "Global Education Finance",
            rate: "10.25% - 13.50%",
            maxAmount: "Up to ₹1.25 Crores",
            collateral: "Customized collateral-free options available",
            tenure: "Up to 10 Years",
            perk: "Covers 100% cost of living, visa, and flight tickets"
        }
    ];

    // Comprehensive FAQs Dataset
    const faqs = [
        {
            q: "How does the Moratorium (Repayment Holiday) period work on education loans?",
            a: "The moratorium period is a repayment grace window provided during your studies. It covers your entire Course Duration plus an additional 6 months to 1 year after graduation (or 6 months after securing employment, whichever is earlier). During this period, you are not required to pay the full monthly EMI, though servicing simple interest is encouraged to reduce your post-moratorium debt burden."
        },
        {
            q: "Is collateral security mandatory for education loans above ₹7.5 Lakhs?",
            a: "Per RBI and Indian Banks' Association (IBA) guidelines, tangible collateral (like residential property, commercial real estate, fixed deposits, or sovereign bonds) is normally required for loans exceeding ₹7.5 Lakhs. However, leading public and private banks offer collateral-free loans up to ₹40–₹50 Lakhs for students admitted to premier Indian institutes (like IITs, IIMs, ISB, AIIMS) and top-ranked global universities."
        },
        {
            q: "How does the Section 80E Income Tax deduction benefit work?",
            a: "Under Section 80E of the Indian Income Tax Act, 1961, the individual paying the education loan (either the student or parent co-applicant) can claim a 100% tax deduction on the entire interest paid during the financial year. There is no upper monetary limit on the deductible interest amount, and this deduction can be claimed for up to 8 consecutive assessment years."
        },
        {
            q: "Can I receive an education loan sanction before my final visa or admission letter?",
            a: "Yes. Lenders like HDFC Credila, SBI, and ICICI provide 'Pre-Visa Sanction Letters' or conditional in-principle approvals based on your GRE/GMAT/IELTS scores, academic transcripts, and university application status. This document serves as verifiable financial proof (I-20 financial clearance in the US, CAS in the UK) required to obtain your student visa."
        },
        {
            q: "What expenses are covered under an overseas education loan?",
            a: "Education loans cover 100% of the legitimate Cost of Attendance (COA), including: college tuition and admission fees, university hostel accommodation or off-campus shared rent, meal expenses, examination and laboratory fees, one-time international round-trip airfare, laptop/computer purchases, textbooks, equipment, mandatory student health insurance, and visa processing fees."
        },
        {
            q: "Who is eligible to be a co-applicant on an Indian student loan?",
            a: "A co-applicant is mandatory for most education loans. Primary eligible co-borrowers include parents (father or mother), legal guardians, or spouse. In select cases, earning siblings, paternal/maternal uncles, or first cousins can also act as financial co-signers, provided they have stable verifiable income and a CIBIL score of 700+."
        },
        {
            q: "What is the margin money requirement for education loans?",
            a: "Under standard IBA guidelines: Loans up to ₹4 Lakhs require 0% margin money (100% bank funded). For loans above ₹4 Lakhs, the margin money is typically 5% for studies within India and 15% for studies abroad. However, for top-tier premier institutions, many banks waive margin money completely."
        },
        {
            q: "Can I prepay or foreclose my education loan early without penalty charges?",
            a: "Yes. In accordance with Reserve Bank of India (RBI) consumer protection directives, banks and NBFCs cannot charge any foreclosure or prepayment penalties on floating-rate education loans availed by individual borrowers. You can pay extra amounts or clear the full loan early whenever you have surplus funds."
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
                    { "@type": "ListItem", "position": 2, "name": "Loans", "item": "https://www.bankscart.com/loans" },
                    { "@type": "ListItem", "position": 3, "name": "Education Loan", "item": "https://www.bankscart.com/loans/education" }
                ]
            },
            {
                "@type": "FinancialProduct",
                "name": "BanksCart Education Loan Comparison",
                "description": "Compare student and education loans starting from 8.15% p.a. for studies in India and overseas. 100% tuition, living costs, travel funding and Section 80E tax benefits.",
                "brand": { "@type": "Brand", "name": "BanksCart" },
                "url": "https://www.bankscart.com/loans/education",
                "category": "Education Loan",
                "offers": {
                    "@type": "AggregateOffer",
                    "priceCurrency": "INR",
                    "lowPrice": "8.15",
                    "highPrice": "13.50",
                    "offerCount": "7"
                }
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
                <title>Education Loans in India: Compare Top Bank Rates for India & Abroad | BanksCart</title>
                <meta
                    name="description"
                    content="Compare education loan interest rates from SBI, HDFC Credila, ICICI, Axis & Bank of Baroda starting from 8.15% p.a. Covers 100% tuition, living costs & travel for studies in India and overseas."
                />
                <link rel="canonical" href="https://www.bankscart.com/loans/education" />
                <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
            </Helmet>

            {/* Breadcrumb Navigation */}
            <div className="bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <Breadcrumb path={["Home", "Loans", "Education Loan"]} />
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
                                Official Multi-Bank Student Loan Directory 2026
                            </div>

                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                                Fund Your Global Education with <span className="text-[#38BDF8]">Smart Student Loans</span>
                            </h1>

                            <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                                Compare verified education loan rates starting from 8.15% p.a. for premier universities in India, USA, UK, Canada, Australia & Europe. 100% financing for tuition, living costs, travel & moratorium period support.
                            </p>

                            {/* Trust Highlights Strip */}
                            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
                                    <Globe2 className="w-5 h-5 text-[#38BDF8] flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-bold text-white">Up to ₹1.5 Cr+</p>
                                        <p className="text-[10px] text-slate-400">India & Overseas</p>
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
                                    <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-bold text-white">No Collateral</p>
                                        <p className="text-[10px] text-slate-400">Up to ₹7.5L (₹50L Top)</p>
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
                                    <Percent className="w-5 h-5 text-amber-400 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-bold text-white">Section 80E</p>
                                        <p className="text-[10px] text-slate-400">100% Tax Deduction</p>
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-2.5">
                                    <Clock className="w-5 h-5 text-purple-400 flex-shrink-0" />
                                    <div>
                                        <p className="text-xs font-bold text-white">Moratorium</p>
                                        <p className="text-[10px] text-slate-400">Course + 1 Yr Grace</p>
                                    </div>
                                </div>
                            </div>

                            {/* Fast Action CTAs */}
                            <div className="mt-8 flex flex-wrap gap-3">
                                {openApplyModal ? (
                                    <ApplyButton
                                        loanType="Education Loan"
                                        openApplyModal={openApplyModal}
                                        variant="primary"
                                        className="px-6 py-3 bg-[#A16207] hover:bg-amber-800 text-white rounded-lg font-bold text-sm shadow-md transition-all flex items-center gap-2"
                                    >
                                        Check Pre-Approved Loan <ArrowRight className="w-4 h-4" />
                                    </ApplyButton>
                                ) : (
                                    <a
                                        href="#calculator"
                                        className="px-6 py-3 bg-[#A16207] hover:bg-amber-800 text-white rounded-lg font-bold text-sm shadow-md transition-all flex items-center gap-2"
                                    >
                                        Apply for Education Loan <ArrowRight className="w-4 h-4" />
                                    </a>
                                )}

                                <a
                                    href="#calculator"
                                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-semibold text-sm transition-all flex items-center gap-2"
                                >
                                    Calculate Student EMI <Sliders className="w-4 h-4" />
                                </a>
                            </div>
                        </div>

                        {/* Hero Right Visual: Student Degree Emblem */}
                        <div className="lg:col-span-4 hidden lg:flex justify-center">
                            <div className="bg-gradient-to-tr from-[#1E3A8A] via-[#1E293B] to-[#0F172A] border border-white/20 rounded-2xl p-6 shadow-2xl text-center max-w-xs w-full">
                                <div className="w-16 h-16 bg-[#38BDF8]/20 border border-[#38BDF8]/40 text-[#38BDF8] rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <GraduationCap className="w-9 h-9" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Global University Ready</h3>
                                <p className="text-xs text-slate-300 mt-1">
                                    Over 1,200 recognized universities funded worldwide with fast-track digital approval.
                                </p>
                                <div className="mt-4 pt-4 border-t border-white/10 flex justify-around text-xs">
                                    <div>
                                        <p className="font-bold text-[#38BDF8]">8.15%</p>
                                        <p className="text-[10px] text-slate-400">Min APR</p>
                                    </div>
                                    <div className="w-px h-8 bg-white/10"></div>
                                    <div>
                                        <p className="font-bold text-emerald-400">₹0 Down</p>
                                        <p className="text-[10px] text-slate-400">Premier Inst.</p>
                                    </div>
                                    <div className="w-px h-8 bg-white/10"></div>
                                    <div>
                                        <p className="font-bold text-amber-400">15 Yrs</p>
                                        <p className="text-[10px] text-slate-400">Max Tenure</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== INTERACTIVE EMI & MORATORIUM CALCULATOR ==================== */}
            <section id="calculator" className="py-12 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-br from-slate-50 to-blue-50/40 rounded-2xl border border-slate-200 p-6 sm:p-8">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            {/* Sliders Area */}
                            <div className="lg:col-span-7">
                                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
                                    <Calculator className="w-3.5 h-3.5" />
                                    Student Loan Financial Planner
                                </div>
                                <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                                    Calculate Your Education Loan EMI & Tax Savings
                                </h2>
                                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                                    Plan your repayments considering your course duration, moratorium period, and Section 80E interest tax relief.
                                </p>

                                {/* Slider 1: Loan Amount */}
                                <div className="mt-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-semibold text-slate-600">Total Education Loan Amount</span>
                                        <span className="text-base font-bold text-[#0F172A] tabular-nums">
                                            ₹{loanAmount.toLocaleString('en-IN')}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="100000"
                                        max="15000000"
                                        step="50000"
                                        value={loanAmount}
                                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                                    />
                                    <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                                        <span>₹1 Lakh</span>
                                        <span>₹50 Lakhs</span>
                                        <span>₹1.5 Crores</span>
                                    </div>
                                </div>

                                {/* Slider 2: Interest Rate */}
                                <div className="mt-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-semibold text-slate-600">Interest Rate (% p.a.)</span>
                                        <span className="text-base font-bold text-[#1E3A8A] tabular-nums">
                                            {interestRate}%
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="8.0"
                                        max="15.0"
                                        step="0.05"
                                        value={interestRate}
                                        onChange={(e) => setInterestRate(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                                    />
                                    <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                                        <span>8.0% (Premier Banks)</span>
                                        <span>11.5% (Standard)</span>
                                        <span>15.0% (Subprime)</span>
                                    </div>
                                </div>

                                {/* Slider 3: Repayment Tenure */}
                                <div className="mt-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-semibold text-slate-600">Post-Course Repayment Tenure</span>
                                        <span className="text-base font-bold text-[#0F172A] tabular-nums">
                                            {repaymentTenure} Years ({repaymentTenure * 12} Months)
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="1"
                                        max="15"
                                        step="1"
                                        value={repaymentTenure}
                                        onChange={(e) => setRepaymentTenure(Number(e.target.value))}
                                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                                    />
                                    <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                                        <span>3 Years</span>
                                        <span>8 Years</span>
                                        <span>15 Years (Max)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Summary Card */}
                            <div className="lg:col-span-5">
                                <div className="bg-[#0F172A] text-white rounded-xl p-6 sm:p-7 shadow-lg relative overflow-hidden border border-slate-700">
                                    <p className="text-xs font-bold uppercase tracking-wider text-[#38BDF8]">
                                        Calculated Monthly EMI
                                    </p>
                                    <div className="mt-3 flex items-baseline gap-2">
                                        <span className="text-3xl sm:text-4xl font-extrabold text-white tabular-nums">
                                            ₹{monthlyEmi.toLocaleString('en-IN')}
                                        </span>
                                        <span className="text-xs text-slate-400 font-medium">/ month</span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 mt-1">
                                        Starts after your {moratoriumYears}-year course + 6-month moratorium period.
                                    </p>

                                    <div className="mt-5 pt-4 border-t border-slate-700/80 space-y-2.5 text-xs">
                                        <div className="flex justify-between text-slate-300">
                                            <span>Principal Loan Amount:</span>
                                            <span className="font-bold text-white tabular-nums">₹{loanAmount.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-300">
                                            <span>Total Interest Payable:</span>
                                            <span className="font-bold text-amber-400 tabular-nums">₹{totalInterest.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between text-slate-300">
                                            <span>Total Repayment:</span>
                                            <span className="font-bold text-white tabular-nums">₹{totalPayment.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between text-emerald-400 font-semibold pt-2 border-t border-slate-700/50">
                                            <span>Annual 80E Tax Savings:</span>
                                            <span className="tabular-nums">~₹{annualTaxSavings.toLocaleString('en-IN')} / yr</span>
                                        </div>
                                    </div>

                                    {openApplyModal ? (
                                        <ApplyButton
                                            loanType={`Education Loan - ₹${(loanAmount / 100000).toFixed(1)}L`}
                                            openApplyModal={openApplyModal}
                                            variant="primary"
                                            fullWidth={true}
                                            className="mt-6 py-2.5 bg-[#A16207] hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-all shadow"
                                        >
                                            Apply for This Sanction <ArrowRight className="w-3.5 h-3.5 ml-1" />
                                        </ApplyButton>
                                    ) : (
                                        <button className="mt-6 w-full py-2.5 bg-[#A16207] hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-all shadow">
                                            Apply for This Sanction
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== DOMESTIC VS ABROAD STUDY TRACKS ==================== */}
            <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
                            <Compass className="w-3.5 h-3.5" />
                            Study Track Comparison
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                            Education Loans Tailored for India & Overseas
                        </h2>
                        <p className="text-sm text-slate-600 mt-2">
                            Select your study destination to compare sanction caps, margin requirements, and collateral thresholds.
                        </p>

                        <div className="mt-6 inline-flex p-1 bg-slate-200 rounded-xl">
                            <button
                                onClick={() => setStudyTrack('abroad')}
                                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                                    studyTrack === 'abroad'
                                        ? 'bg-[#1E3A8A] text-white shadow'
                                        : 'text-slate-700 hover:text-slate-900'
                                }`}
                            >
                                Studies Abroad (USA, UK, Canada, Europe)
                            </button>
                            <button
                                onClick={() => setStudyTrack('domestic')}
                                className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
                                    studyTrack === 'domestic'
                                        ? 'bg-[#1E3A8A] text-white shadow'
                                        : 'text-slate-700 hover:text-slate-900'
                                }`}
                            >
                                Studies in India (IIT, IIM, Medical, Private)
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Domestic Card */}
                        <div className={`bg-white rounded-2xl border p-6 sm:p-7 shadow-sm transition-all ${
                            studyTrack === 'domestic' ? 'border-[#1E3A8A] ring-2 ring-[#1E3A8A]/20' : 'border-slate-200'
                        }`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center font-bold">
                                    🇮🇳
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-[#1E3A8A] uppercase tracking-wider">Domestic Track</span>
                                    <h3 className="text-lg font-bold text-[#0F172A]">Higher Education in India</h3>
                                </div>
                            </div>

                            <ul className="space-y-2.5 text-xs text-slate-700 mb-6">
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <span><strong>Sanction Limit:</strong> Up to ₹50 Lakhs for premier institutes; up to ₹20L for others.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <span><strong>Competitive Rates:</strong> 8.15% to 10.50% p.a. based on institute ranking.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <span><strong>Margin Money:</strong> 0% up to ₹4 Lakhs; 5% above ₹4 Lakhs.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <span><strong>Collateral Free:</strong> No security up to ₹7.5 Lakhs (and up to ₹40L for IITs/IIMs).</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <span><strong>Expenses Covered:</strong> 100% of college tuition, hostel fees, textbooks, and laptop.</span>
                                </li>
                            </ul>

                            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-[11px] font-semibold text-slate-500">Fast-track disbursal in 48 hours</span>
                                {openApplyModal && (
                                    <button
                                        onClick={() => openApplyModal('Education Loan - Domestic')}
                                        className="text-xs font-bold text-[#1E3A8A] hover:underline flex items-center gap-1"
                                    >
                                        Apply Domestic &rarr;
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Abroad Card */}
                        <div className={`bg-white rounded-2xl border p-6 sm:p-7 shadow-sm transition-all ${
                            studyTrack === 'abroad' ? 'border-[#1E3A8A] ring-2 ring-[#1E3A8A]/20' : 'border-slate-200'
                        }`}>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                                    🌍
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider">International Track</span>
                                    <h3 className="text-lg font-bold text-[#0F172A]">Overseas Education Loan</h3>
                                </div>
                            </div>

                            <ul className="space-y-2.5 text-xs text-slate-700 mb-6">
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <span><strong>Sanction Limit:</strong> Up to ₹1.50 Crores+ for USA, UK, Canada, Australia & Europe.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <span><strong>Competitive Rates:</strong> 9.25% to 12.50% p.a. with multi-currency options.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <span><strong>Pre-Visa Sanction:</strong> Official letters for US I-20, UK CAS, and German blocked accounts.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <span><strong>Complete Living Costs:</strong> Includes flight tickets, overseas health insurance, rent & food.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <span><strong>Section 80E Deductions:</strong> Full interest deductible from parents' taxable income.</span>
                                </li>
                            </ul>

                            <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                                <span className="text-[11px] font-semibold text-slate-500">Forex card & currency hedging included</span>
                                {openApplyModal && (
                                    <button
                                        onClick={() => openApplyModal('Education Loan - Abroad')}
                                        className="text-xs font-bold text-[#1E3A8A] hover:underline flex items-center gap-1"
                                    >
                                        Apply Overseas &rarr;
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== 7 TOP INDIAN BANKS COMPARISON TABLE ==================== */}
            <section className="py-16 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
                            <Building2 className="w-3.5 h-3.5" />
                            Multi-Bank Directory
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                            Compare Top Education Loan Banks in India 2026
                        </h2>
                        <p className="text-sm text-slate-600 mt-2">
                            Verified interest rates, loan caps, collateral guidelines, and repayment tenures from India's premier public and private lenders.
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-xs text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase">
                                        <th className="p-4">Lending Bank / Institution</th>
                                        <th className="p-4">Interest Rate (% p.a.)</th>
                                        <th className="p-4">Max Loan Limit</th>
                                        <th className="p-4">Collateral Guidelines</th>
                                        <th className="p-4">Max Tenure</th>
                                        <th className="p-4">Special Feature</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-slate-700">
                                    {bankComparison.map((item, idx) => (
                                        <tr key={idx} className="hover:bg-slate-50/50">
                                            <td className="p-4">
                                                <div className="font-bold text-[#0F172A] text-sm">{item.bank}</div>
                                                <div className="text-[11px] text-slate-500">{item.scheme}</div>
                                            </td>
                                            <td className="p-4 font-bold text-emerald-700 text-sm tabular-nums">
                                                {item.rate}
                                            </td>
                                            <td className="p-4 font-bold text-[#0F172A] tabular-nums">
                                                {item.maxAmount}
                                            </td>
                                            <td className="p-4 text-slate-600 text-[11px] max-w-[200px]">
                                                {item.collateral}
                                            </td>
                                            <td className="p-4 text-slate-600 tabular-nums">
                                                {item.tenure}
                                            </td>
                                            <td className="p-4 text-[11px] text-[#1E3A8A] font-semibold">
                                                {item.perk}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== COLLATERAL NORMS & SECTION 80E SECTION ==================== */}
            <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                        {/* Left: Collateral Norms */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
                                <ShieldCheck className="w-3.5 h-3.5" />
                                RBI & IBA Regulatory Norms
                            </div>
                            <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                                Collateral Security Guidelines for Student Loans
                            </h3>
                            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                                Under the Indian Banks' Association Model Educational Loan Scheme, collateral criteria are categorized into 3 standardized tiers:
                            </p>

                            <div className="space-y-4 text-xs">
                                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-[#0F172A]">Up to ₹4.00 Lakhs</span>
                                        <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded text-[10px]">Tier 1: No Security</span>
                                    </div>
                                    <p className="text-slate-600">Zero collateral, zero third-party guarantee. Co-obligation of parent or legal guardian only.</p>
                                </div>

                                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-[#0F172A]">₹4.00 Lakhs to ₹7.50 Lakhs</span>
                                        <span className="bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded text-[10px]">Tier 2: Guarantor</span>
                                    </div>
                                    <p className="text-slate-600">Third-party guarantee or creditworthy co-signer acceptable to the bank. No tangible property pledge.</p>
                                </div>

                                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-[#0F172A]">Above ₹7.50 Lakhs</span>
                                        <span className="bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded text-[10px]">Tier 3: Tangible Collateral</span>
                                    </div>
                                    <p className="text-slate-600">Tangible collateral security (house, flat, commercial plot, Fixed Deposit, or government bonds) + parent co-obligation.</p>
                                </div>
                            </div>

                            <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 mt-4 font-medium">
                                💡 <strong>Premier Institute Exception:</strong> Top 150 colleges (IIT, IIM, ISB, AIIMS) qualify for collateral-free loans up to ₹40–₹50 Lakhs.
                            </p>
                        </div>

                        {/* Right: Section 80E Tax Deduction */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 mb-2">
                                <Percent className="w-3.5 h-3.5" />
                                Income Tax Savings
                            </div>
                            <h3 className="text-xl font-bold text-[#0F172A] mb-3">
                                Section 80E: 100% Tax Deduction on Interest
                            </h3>
                            <p className="text-xs text-slate-600 mb-6 leading-relaxed">
                                Education loans are among India's most tax-advantaged financial products. The entire interest component can be deducted from your taxable income.
                            </p>

                            <div className="space-y-3 text-xs text-slate-700">
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <span><strong>No Upper Cap:</strong> Unlike home loans (₹2 Lakh cap), Section 80E allows 100% deduction on the entire interest paid, without any limit.</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <span><strong>8 Consecutive Assessment Years:</strong> Deduction starts from the year you start repaying interest and continues for up to 8 years.</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <span><strong>Who Can Claim:</strong> Either the student (if earning) or the parent/spouse co-borrower paying the monthly installments.</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                                    <span><strong>Annual Savings Impact:</strong> A student paying ₹2.5 Lakhs in annual interest saves ~₹78,000 every year in the 30% tax bracket.</span>
                                </div>
                            </div>

                            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                                <span className="font-semibold text-slate-500">Applicable on Old Tax Regime</span>
                                <span className="text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                                    Save up to ₹6 Lakhs over 8 Years
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== EXPENSES COVERED (100% FUNDING) ==================== */}
            <section className="py-16 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
                            <DollarSign className="w-3.5 h-3.5" />
                            Comprehensive Cost of Attendance
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                            100% Comprehensive Expense Coverage
                        </h2>
                        <p className="text-sm text-slate-600 mt-2">
                            BanksCart education loans cover not just tuition fees, but all essential living and travel expenses required to complete your degree.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "College Tuition & Admission Fees",
                                desc: "100% of payable academic fees disbursed directly to the college or university bank account."
                            },
                            {
                                title: "Hostel, Rent & Living Expenses",
                                desc: "On-campus dormitory or off-campus verified accommodation rent, food, and monthly living allowances."
                            },
                            {
                                title: "International Round-Trip Airfare",
                                desc: "One-time economy class flight tickets to and from your foreign study destination."
                            },
                            {
                                title: "Laptop, Books & Laboratory Equipment",
                                desc: "Essential study equipment, computers, software licenses, project materials, and textbooks."
                            },
                            {
                                title: "Examination & Library Charges",
                                desc: "Semester examination fees, building fund charges, and university library subscription costs."
                            },
                            {
                                title: "Student Visa & Health Insurance",
                                desc: "Mandatory overseas student health cover (OSHC), travel insurance, and student visa processing fees."
                            }
                        ].map((exp, idx) => (
                            <div key={idx} className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-5 hover:border-blue-200 transition-all">
                                <div className="flex items-start gap-3">
                                    <div className="w-7 h-7 rounded-full bg-blue-100 text-[#1E3A8A] font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                        ✓
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-[#0F172A] mb-1">{exp.title}</h3>
                                        <p className="text-xs text-slate-600 leading-relaxed">{exp.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== 4-STEP APPLICATION PROCESS ==================== */}
            <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
                            <Clock className="w-3.5 h-3.5" />
                            Digital Application Workflow
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                            Get Your Student Loan in 4 Easy Steps
                        </h2>
                        <p className="text-sm text-slate-600 mt-2">
                            Fast-track pre-approvals and zero branch visits with our digital student onboarding portal.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                step: "01",
                                title: "Check University Pre-Approval",
                                desc: "Select your college or university, enter estimated loan requirements, and verify eligibility."
                            },
                            {
                                step: "02",
                                title: "Upload Admission Documents",
                                desc: "Upload admission offer letter, fee structure schedule, and 10th/12th/Degree mark sheets."
                            },
                            {
                                step: "03",
                                title: "Co-Borrower Financial Verification",
                                desc: "Complete paperless digital KYC and bank statement verification for your parent or co-applicant."
                            },
                            {
                                step: "04",
                                title: "Direct University Disbursal",
                                desc: "Receive the official sanction letter for visa processing; funds are remitted directly to the institution."
                            }
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="bg-white border border-slate-200 rounded-2xl p-6 relative hover:shadow-md transition-all group"
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

            {/* ==================== ELIGIBILITY & DOCUMENTATION TABS ==================== */}
            <section className="py-16 bg-white border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-10">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
                            <FileText className="w-3.5 h-3.5" />
                            Application Readiness
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                            Eligibility Criteria & Document Checklist
                        </h2>
                        <p className="text-sm text-slate-600 mt-2">
                            Verify what you and your co-applicant need before initiating your digital application.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
                        {/* Tab Switchers */}
                        <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 pb-4">
                            {[
                                { id: 'academic', label: 'Academic & Admission' },
                                { id: 'kyc', label: 'Student & Co-Applicant KYC' },
                                { id: 'income', label: 'Co-Applicant Income Proofs' },
                                { id: 'collateral', label: 'Collateral Property Proofs' }
                            ].map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveDocTab(tab.id)}
                                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                                        activeDocTab === tab.id
                                            ? 'bg-[#1E3A8A] text-white shadow-sm'
                                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content */}
                        <div className="text-xs text-slate-700 space-y-3">
                            {activeDocTab === 'academic' && (
                                <ul className="space-y-2.5">
                                    <li className="flex items-center gap-2">✓ Official Admission Offer Letter or Bonafide Certificate from University</li>
                                    <li className="flex items-center gap-2">✓ Itemized breakdown of college tuition fees and hostel charges on university letterhead</li>
                                    <li className="flex items-center gap-2">✓ Standard 10th and 12th Class Mark sheets & Passing Certificates</li>
                                    <li className="flex items-center gap-2">✓ Graduation Mark sheets & Degree Certificate (for post-graduate applicants)</li>
                                    <li className="flex items-center gap-2">✓ Entrance Examination Score Card (e.g. JEE, NEET, CAT, GRE, GMAT, TOEFL, IELTS)</li>
                                </ul>
                            )}
                            {activeDocTab === 'kyc' && (
                                <ul className="space-y-2.5">
                                    <li className="flex items-center gap-2">✓ PAN Card copies of both Student Applicant and Co-Applicant</li>
                                    <li className="flex items-center gap-2">✓ Aadhaar Card / Passport copy for Identity and Residence verification</li>
                                    <li className="flex items-center gap-2">✓ Valid Indian Passport (mandatory for students traveling abroad)</li>
                                    <li className="flex items-center gap-2">✓ 2 passport-size photographs of Student and Co-Borrower</li>
                                </ul>
                            )}
                            {activeDocTab === 'income' && (
                                <ul className="space-y-2.5">
                                    <li className="flex items-center gap-2">✓ Salary Slips for the last 3 months (for salaried co-borrowers)</li>
                                    <li className="flex items-center gap-2">✓ Form 16 or Income Tax Returns (ITR) for the last 2 consecutive financial years</li>
                                    <li className="flex items-center gap-2">✓ Bank Account Statements for the last 6 months showing salary or business credits</li>
                                    <li className="flex items-center gap-2">✓ Business registration proof (GST certificate/ITR) for self-employed co-signers</li>
                                </ul>
                            )}
                            {activeDocTab === 'collateral' && (
                                <ul className="space-y-2.5">
                                    <li className="flex items-center gap-2">✓ Original Title Deed / Sale Deed of the pledged property</li>
                                    <li className="flex items-center gap-2">✓ Approved Building Plan / Sanction Map from municipal authority</li>
                                    <li className="flex items-center gap-2">✓ Non-encumbrance certificate (EC) for the last 13–30 years</li>
                                    <li className="flex items-center gap-2">✓ Latest property tax payment receipt and utility bill</li>
                                    <li className="flex items-center gap-2">✓ Fixed Deposit receipt copy (if pledging bank term deposits)</li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ==================== FAQ ACCORDION SECTION ==================== */}
            <section className="py-16 bg-[#F8FAFC] border-b border-slate-200">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E3A8A] mb-2">
                            <HelpCircle className="w-3.5 h-3.5" />
                            Frequently Asked Questions
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
                            Got Questions About Indian Education Loans?
                        </h2>
                        <p className="text-sm text-slate-600 mt-2">
                            Everything you need to know regarding moratoriums, tax deductions, collateral thresholds, and abroad disbursals.
                        </p>

                        <div className="mt-6 max-w-md mx-auto relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search education loan questions..."
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

            {/* ==================== FINAL CONVERSION CTA ==================== */}
            <section className="py-16 bg-gradient-to-b from-[#0F172A] to-[#1E293B] text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-3">
                        Take the Next Step Towards Your Dream College
                    </h2>
                    <p className="text-sm text-slate-300 mb-8 max-w-xl mx-auto leading-relaxed">
                        Join over 50,000+ students who compared rates and secured fast-track approvals through BanksCart. 100% digital, zero upfront fees.
                    </p>

                    {openApplyModal && (
                        <ApplyButton
                            loanType="Education Loan - Final CTA"
                            openApplyModal={openApplyModal}
                            variant="primary"
                            className="px-10 py-4 bg-[#A16207] hover:bg-amber-800 text-white rounded-xl font-bold text-base shadow-xl transition-all inline-flex items-center gap-2"
                        >
                            Start Your Application Now <ArrowRight className="w-5 h-5" />
                        </ApplyButton>
                    )}

                    <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400">
                        <a href="tel:+919686859296" className="flex items-center gap-1.5 hover:text-white transition-colors">
                            <Phone className="w-3.5 h-3.5" /> +91 968 685 9296
                        </a>
                        <a href="mailto:support@bankscart.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                            <Mail className="w-3.5 h-3.5" /> support@bankscart.com
                        </a>
                        <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> RBI-Regulated Lending Partners
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default EducationLoanPage;
