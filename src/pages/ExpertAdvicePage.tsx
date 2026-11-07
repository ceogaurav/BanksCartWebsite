import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Phone,
  Mail,
  User,
  BadgeCheck,
  Landmark,
  FileText,
  DollarSign,
  TrendingUp,
  Wallet,
  Building2,
  ChevronDown,
  ExternalLink,
  Award,
  Users,
  Percent,
  Calendar,
  AlertCircle,
  HelpCircle,
  Check,
  Sparkles
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

interface ExpertAdvicePageProps {
  openApplyModal?: (loanType?: string) => void;
}

export default function ExpertAdvicePage({ openApplyModal }: ExpertAdvicePageProps) {
  // Advisory Booking Form states
  const [selectedDomain, setSelectedDomain] = useState('home-loan');
  const [ticketSize, setTicketSize] = useState('2500000');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('morning');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Financial Health Quiz states
  const [foir, setFoir] = useState<'low' | 'med' | 'high'>('low');
  const [cibilScore, setCibilScore] = useState<'high' | 'med' | 'low'>('high');
  const [reserves, setReserves] = useState<'healthy' | 'moderate' | 'scarce'>('healthy');
  const [costlyDebt, setCostlyDebt] = useState<'none' | 'some' | 'high'>('none');

  // Consultation Domains
  const ADVICE_DOMAINS = [
    {
      id: 'home-loan',
      title: 'Home Loan & Balance Transfer',
      desc: 'Save ₹5L–₹15L over loan tenure via rate renegotiation and structural balance transfer.',
      icon: Landmark,
      badge: 'Popular'
    },
    {
      id: 'debt-consolidation',
      title: 'Debt Restructuring & Consolidation',
      desc: 'Combine high-cost 16–24% personal loans and credit cards into a single low-EMI facility.',
      icon: Wallet,
      badge: 'High Impact'
    },
    {
      id: 'cibil-repair',
      title: 'CIBIL Score Dispute & Restoration',
      desc: 'Resolve written-off disputes, rectify erroneous DPD bureau marks, and rebuild score to 750+.',
      icon: TrendingUp,
      badge: 'Credit Health'
    },
    {
      id: 'business-loan',
      title: 'MSME & Working Capital Loans',
      desc: 'Collateral-free CGTMSE loans, overdraft lines, and balance sheet financial structuring.',
      icon: Building2,
      badge: 'Enterprises'
    },
    {
      id: 'tax-optimization',
      title: 'Tax & Capital Gains Shield',
      desc: 'Optimize Section 115BAC vs Old Regime deductions, capital gains set-offs, and 54EC bonds.',
      icon: DollarSign,
      badge: 'Wealth'
    },
    {
      id: 'wealth-retirement',
      title: 'Retirement & Long-Term Corpus',
      desc: 'PPF, NPS, sovereign gold bonds, and senior citizen asset allocation strategies.',
      icon: ShieldCheck,
      badge: 'Retirement'
    }
  ];

  // Verified Senior Advisory Panel
  const ADVISORY_PANEL = [
    {
      name: 'Raghav Singhal',
      credentials: 'FCA, Certified Financial Planner (CFP)',
      role: 'Head of Retail Debt & Tax Architecture',
      experience: '14+ Years in Retail Lending & Tax Optimization',
      specialty: 'Debt Consolidation, New Tax Regime, Capital Gains',
      avatarText: 'RS'
    },
    {
      name: 'Amit Khurana',
      credentials: 'ex-Chief Credit Underwriter (SBI Retail), CFA',
      role: 'Senior Mortgage & Balance Transfer Strategist',
      experience: '18+ Years Banking & Credit Risk Assessment',
      specialty: 'High-Value Home Loans, Balance Transfer, CIBIL Disputes',
      avatarText: 'AK'
    },
    {
      name: 'Neha Kulkarni',
      credentials: 'CS, MBA (Finance), ex-Axis Bank SME Credit',
      role: 'MSME & Working Capital Director',
      experience: '12+ Years Enterprise Debt & Commercial Paper',
      specialty: 'CGTMSE Loans, Machinery Leases, Export Finance',
      avatarText: 'NK'
    },
    {
      name: 'Vikramaditya Rao',
      credentials: 'CFP, Chartered Wealth Manager (CWM)',
      role: 'Personal Financial Health Strategist',
      experience: '15+ Years Comprehensive Wealth Advisory',
      specialty: 'Retirement Corpus, Emergency Reserve Structuring',
      avatarText: 'VR'
    }
  ];

  // Handle Advisory Booking
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      setFormError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setFormError(null);
    setIsSubmitted(true);
  };

  // Calculate Financial Health Score (0 - 100)
  const healthScore = (() => {
    let score = 0;
    if (foir === 'low') score += 25;
    else if (foir === 'med') score += 15;
    else score += 5;

    if (cibilScore === 'high') score += 30;
    else if (cibilScore === 'med') score += 18;
    else score += 5;

    if (reserves === 'healthy') score += 25;
    else if (reserves === 'moderate') score += 15;
    else score += 5;

    if (costlyDebt === 'none') score += 20;
    else if (costlyDebt === 'some') score += 10;
    else score += 0;

    return score;
  })();

  // Schema.org Structured Data
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FinancialService',
        name: 'BanksCart Expert Financial Advisory & Loan Consultation',
        provider: {
          '@type': 'Organization',
          name: 'BanksCart Financial Technologies Pvt Ltd'
        },
        serviceType: 'Certified Loan Advisory & Debt Restructuring',
        description:
          'Unbiased debt restructuring, balance transfer optimization, CIBIL dispute restoration, and financial planning from Certified Financial Planners and ex-credit underwriters.',
        url: 'https://www.bankscart.com/expert-advice'
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.bankscart.com/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Advisory',
            item: 'https://www.bankscart.com/expert-advice'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is the discovery consultation with BanksCart financial experts free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes! Your preliminary 15-minute discovery consultation is completely free of charge. Our advisors conduct an objective audit of your loan interest rates, repayment tenure, and debt-to-income ratio without any obligation.'
            }
          },
          {
            '@type': 'Question',
            name: 'How can an expert help me save money on my existing home loan?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Borrowers whose home loans were booked under older benchmark rates (like MCLR or base rate) frequently pay 0.75% to 1.50% higher interest than active repo-linked lending rates (EBLR). Our specialists structure balance transfers to lower-rate institutions, saving between ₹5 Lakhs and ₹15 Lakhs in interest.'
            }
          },
          {
            '@type': 'Question',
            name: 'Can you help resolve CIBIL disputes and errors?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Our CIBIL restoration advisors assist in identifying erroneous Days Past Due (DPD) reports, wrongful loan ownership marks, and closed accounts still reflecting as active, helping you file formal grievance tickets directly with TransUnion CIBIL and the banking ombudsman.'
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Helmet>
        <title>Certified Financial Consultation & Loan Architecture | BanksCart</title>
        <meta
          name="description"
          content="Connect with certified financial planners (CFP) and ex-bank credit underwriters for unbiased debt restructuring, home loan balance transfers, CIBIL repair, and tax optimization."
        />
        <link rel="canonical" href="https://www.bankscart.com/expert-advice" />
        <meta property="og:title" content="Expert Financial Advice & Loan Architecture - BanksCart" />
        <meta
          property="og:description"
          content="Schedule a 100% free consultation with retail credit and debt restructuring specialists. Compare 30+ lenders."
        />
        <meta property="og:url" content="https://www.bankscart.com/expert-advice" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Advisory', path: '/expert-advice' },
            { label: 'Expert Financial Advice' }
          ]}
        />

        {/* Executive Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              Certified Financial Planners (CFP) & Ex-Bank Credit Underwriters • Unbiased Advice
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              Certified Financial Consultation & Debt Architecture
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              Navigate complex retail loans, home loan balance transfers, CIBIL bureau disputes,
              and tax optimization. Get bank-agnostic strategies backed by verified financial experts.
            </p>

            {/* Value Highlights */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-black text-amber-400">100% Free</div>
                <div className="text-xs text-slate-300 mt-0.5">Initial Discovery Call</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-black text-amber-400">30+ Lenders</div>
                <div className="text-xs text-slate-300 mt-0.5">Compared Side-by-Side</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-black text-amber-400">₹5L–₹15L</div>
                <div className="text-xs text-slate-300 mt-0.5">Avg. Balance Transfer Savings</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-black text-amber-400">Zero Bias</div>
                <div className="text-xs text-slate-300 mt-0.5">Fiduciary Customer Interest</div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Advisory Booking Engine */}
        <div id="book-consultation" className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 text-white p-6 sm:p-8 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-amber-400 block mb-1">
                Direct Scheduling
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                Book a Free 1-on-1 Consultation
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm mt-0.5">
                Select your advisory domain and preferred time slot for a dedicated consultation.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold self-start md:self-auto">
              <Clock className="w-3.5 h-3.5" />
              15-Minute Dedicated Call
            </span>
          </div>

          <div className="p-6 sm:p-10">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4 max-w-lg mx-auto">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">
                  Consultation Successfully Requested!
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Thank you, <strong>{fullName}</strong>. A certified debt and financial architect will reach out to you on <strong>+91 {phone}</strong> during your requested <strong>{preferredSlot}</strong> slot.
                </p>
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl text-xs text-blue-900 text-left space-y-1">
                  <div><strong>Reference ID:</strong> BC-ADV-{Math.floor(100000 + Math.random() * 900000)}</div>
                  <div><strong>Domain:</strong> {ADVICE_DOMAINS.find(d => d.id === selectedDomain)?.title}</div>
                  <div><strong>Ticket Size:</strong> ₹{(Number(ticketSize) / 100000).toFixed(1)} Lakhs</div>
                </div>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-all mt-4"
                >
                  Book Another Consultation
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-8">
                {/* Step 1: Select Domain */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
                    Step 1: Choose Your Advisory Focus Area *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {ADVICE_DOMAINS.map((domain) => {
                      const Icon = domain.icon;
                      const isSelected = selectedDomain === domain.id;

                      return (
                        <div
                          key={domain.id}
                          onClick={() => setSelectedDomain(domain.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50/80 border-blue-600 shadow-md ring-2 ring-blue-500/20'
                              : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isSelected ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-700'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                              {domain.badge}
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-sm leading-snug">{domain.title}</h4>
                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">{domain.desc}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Loan / Portfolio Size Slider */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                      Step 2: Approximate Portfolio / Loan Value
                    </label>
                    <span className="font-mono font-black text-blue-900 text-base">
                      ₹{(Number(ticketSize) / 100000).toFixed(1)} Lakhs
                    </span>
                  </div>
                  <input
                    type="range"
                    min="500000"
                    max="50000000"
                    step="500000"
                    value={ticketSize}
                    onChange={(e) => setTicketSize(e.target.value)}
                    className="w-full accent-blue-900 cursor-pointer h-2 bg-slate-200 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>₹5 Lakhs</span>
                    <span>₹1 Crore</span>
                    <span>₹5 Crores+</span>
                  </div>
                </div>

                {/* Step 3: Contact Information & Preferred Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-slate-500">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="9876543210"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl font-mono text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ramesh@example.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Preferred Time Slot *
                    </label>
                    <select
                      value={preferredSlot}
                      onChange={(e) => setPreferredSlot(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="morning">Morning (10 AM – 1 PM)</option>
                      <option value="afternoon">Afternoon (2 PM – 5 PM)</option>
                      <option value="evening">Evening (6 PM – 8 PM)</option>
                    </select>
                  </div>
                </div>

                {formError && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-slate-500">
                    🔒 Protected under Indian Data Protection (DPDP Act). We never share your data with aggressive third-party telemarketers.
                  </p>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold text-white bg-amber-600 hover:bg-amber-500 transition-all shadow-md text-sm active:scale-95 shrink-0"
                  >
                    <span>Confirm Free Discovery Call</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Interactive Financial Health Scorecard */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-8">
          <div>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              Self-Assessment Tool
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Instant Financial Health Scorecard
            </h2>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Answer 4 quick diagnostic questions to calculate your retail debt vulnerability score before connecting with an advisor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Q1 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                1. Debt-to-Income (FOIR)
              </span>
              <p className="text-xs text-slate-600">What % of your monthly income goes toward EMIs?</p>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'low', label: 'Less than 30% (Healthy)' },
                  { id: 'med', label: '30% – 50% (Moderate)' },
                  { id: 'high', label: 'Above 50% (High Risk)' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setFoir(opt.id as any)}
                    className={`w-full text-left p-2.5 rounded-xl font-semibold transition-all ${
                      foir === opt.id ? 'bg-blue-900 text-white' : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                2. Credit Score (CIBIL)
              </span>
              <p className="text-xs text-slate-600">What is your current bureau score bracket?</p>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'high', label: '750+ (Prime)' },
                  { id: 'med', label: '650 – 749 (Standard)' },
                  { id: 'low', label: 'Below 650 (Subprime)' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setCibilScore(opt.id as any)}
                    className={`w-full text-left p-2.5 rounded-xl font-semibold transition-all ${
                      cibilScore === opt.id ? 'bg-blue-900 text-white' : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q3 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                3. Emergency Reserves
              </span>
              <p className="text-xs text-slate-600">How many months of expenses can your liquid savings cover?</p>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'healthy', label: '6+ Months (Optimal)' },
                  { id: 'moderate', label: '3 – 6 Months (Fair)' },
                  { id: 'scarce', label: 'Less than 3 Months (Vulnerable)' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setReserves(opt.id as any)}
                    className={`w-full text-left p-2.5 rounded-xl font-semibold transition-all ${
                      reserves === opt.id ? 'bg-blue-900 text-white' : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Q4 */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                4. High-Interest Debt
              </span>
              <p className="text-xs text-slate-600">Do you carry revolving credit card or loan balances?</p>
              <div className="space-y-1.5 text-xs">
                {[
                  { id: 'none', label: 'Zero Unsecured Debt' },
                  { id: 'some', label: '1–2 Personal Loans' },
                  { id: 'high', label: 'Revolving Credit Card Balances' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setCostlyDebt(opt.id as any)}
                    className={`w-full text-left p-2.5 rounded-xl font-semibold transition-all ${
                      costlyDebt === opt.id ? 'bg-blue-900 text-white' : 'bg-white border border-slate-200 text-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Health Score Summary Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <div className="text-4xl font-mono font-black text-amber-400">
                  {healthScore}/100
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {healthScore >= 80 ? 'Optimal Financial Resilience' : healthScore >= 55 ? 'Moderate Risk — Restructuring Recommended' : 'High Vulnerability — Urgent Debt Audit Required'}
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {healthScore >= 80
                      ? 'You qualify for lowest prime lending rates (from 8.35% on Home Loans). Focus on wealth accumulation.'
                      : healthScore >= 55
                      ? 'Consolidating high-rate debt can reduce your monthly EMI outflow by up to 35%.'
                      : 'High credit utilization or costly loans are damaging your score. Connect with an advisor to draft a repayment roadmap.'}
                  </p>
                </div>
              </div>
            </div>

            <a
              href="#book-consultation"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shrink-0 flex items-center gap-2"
            >
              <span>Get Customized Audit</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Verified Senior Advisory Panel */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              Fiduciary Professionals
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              BanksCart Senior Advisory Panel
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Our advisory desk is led by credentialed Chartered Accountants, former public sector bank credit heads, and certified wealth managers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ADVISORY_PANEL.map((expert, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-900 text-amber-400 font-bold font-mono text-lg flex items-center justify-center mb-4 shadow-sm">
                    {expert.avatarText}
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{expert.name}</h3>
                  <div className="text-xs font-semibold text-blue-900 mt-0.5">{expert.credentials}</div>
                  <p className="text-xs text-slate-500 mt-2 font-medium">{expert.role}</p>
                  <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-600 space-y-1">
                    <div><strong>Experience:</strong> {expert.experience}</div>
                    <div><strong>Specialty:</strong> {expert.specialty}</div>
                  </div>
                </div>

                <a
                  href="#book-consultation"
                  className="mt-5 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-900 hover:text-white text-slate-800 text-xs font-bold transition-all"
                >
                  <span>Request Meeting</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* 5-Step Advisory Roadmap */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
              Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              The 5-Stage Advisory Framework
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              A transparent, disciplined protocol designed to eliminate high interest, protect creditworthiness, and accelerate debt freedom.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {[
              {
                step: '01',
                title: 'Discovery Audit',
                desc: 'Free 15-minute diagnostic to review active loans, interest rates, and CIBIL status.'
              },
              {
                step: '02',
                title: 'Data & FOIR Analysis',
                desc: 'Calculate exact debt-service ratios, tax implications, and cash-flow leakages.'
              },
              {
                step: '03',
                title: 'Multi-Bank Structuring',
                desc: 'Compare sanction matrices across 30+ RBI-regulated banks and NBFCs.'
              },
              {
                step: '04',
                title: 'Sanction Acceleration',
                desc: 'Dedicated documentation handling for legal, technical, and credit appraisal approvals.'
              },
              {
                step: '05',
                title: 'Post-Disbursal Review',
                desc: 'Ongoing benchmark rate tracking to trigger future downward interest resets.'
              }
            ].map((st, i) => (
              <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="text-2xl font-mono font-black text-amber-600 block">{st.step}</span>
                <h4 className="font-bold text-slate-900 text-sm">{st.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Financial & Debt Advisory FAQ
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Clear answers regarding discovery call costs, bank independence, and debt restructuring guidelines.
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {[
              {
                q: 'Is the discovery consultation with BanksCart financial experts completely free?',
                a: 'Yes! Your initial 15-minute discovery consultation is 100% free with no hidden charges. Our advisors analyze your existing debt profile, compare interest rates across 30+ partner banks, and share customized optimization paths.'
              },
              {
                q: 'How does a Home Loan Balance Transfer save money?',
                a: 'Borrowers whose home loans were disbursed under older benchmark regimes (MCLR or Base Rate) often pay 9.25% to 10.50% interest. By transferring the balance to an External Benchmark Lending Rate (EBLR / Repo-linked) at 8.35% to 8.65%, you can lower your monthly EMI and save between ₹5 Lakhs and ₹15 Lakhs over a 20-year horizon.'
              },
              {
                q: 'What is Debt Consolidation and when is it recommended?',
                a: 'Debt consolidation replaces multiple high-interest debts (credit cards charging 36–42% APR and personal loans charging 14–20%) with a single lower-rate structured loan (such as a Top-up Home Loan or Loan Against Property at 9–10.5%). This reduces your combined monthly outflow, simplifies budgeting, and boosts your CIBIL score.'
              },
              {
                q: 'Can you assist with resolving CIBIL dispute errors?',
                a: 'Yes. Our bureau restoration specialists assist in identifying erroneous Days Past Due (DPD) reports, wrongful loan ownership marks, and closed accounts still reflecting as active, helping you file formal grievance tickets directly with TransUnion CIBIL and the banking ombudsman.'
              },
              {
                q: 'Are BanksCart advisors tied to a single bank?',
                a: 'No. BanksCart operates with strict fiduciary independence. We compare 30+ leading public sector banks, private lenders, and NBFCs (including SBI, HDFC Bank, ICICI Bank, Axis Bank, and Kotak) to secure the most favorable interest rate and tenure for your specific financial profile.'
              }
            ].map((faq, fIdx) => (
              <details
                key={fIdx}
                className="group py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-slate-900 hover:text-blue-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold">
                    {faq.q}
                  </h3>
                  <div className="shrink-0 rounded-full bg-slate-100 group-open:bg-blue-100 p-1.5 text-slate-600 group-open:text-blue-900 transition-colors">
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-open:rotate-180" />
                  </div>
                </summary>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed pr-6">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
