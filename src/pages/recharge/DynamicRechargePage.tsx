import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Smartphone, 
  Receipt, 
  Zap, 
  Tv, 
  Car, 
  Flame, 
  CreditCard, 
  ShieldCheck, 
  Wifi, 
  Droplets,
  ChevronDown, 
  Check, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  HelpCircle, 
  Download, 
  Printer, 
  Share2, 
  AlertCircle,
  Copy,
  Building2,
  Clock,
  Sparkles,
  Search,
  ExternalLink,
  RefreshCw,
  Tag
} from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';
import { 
  RECHARGE_PAGE_MAP, 
  RechargePageContent, 
  RechargePlan, 
  INDIAN_TELECOM_CIRCLES, 
  MOBILE_PREPAID_PLANS,
  ELECTRICITY_BILLERS,
  FASTAG_BANKS,
  DTH_OPERATORS,
  LPG_PROVIDERS,
  LOAN_EMI_LENDERS,
  INSURANCE_COMPANIES,
  BROADBAND_OPERATORS,
  WATER_BOARDS
} from '../../data/rechargePageData';

const SERVICE_CATEGORIES = [
  { key: 'mobile', label: 'Mobile Prepaid', icon: Smartphone, path: '/recharge/mobile' },
  { key: 'postpaid', label: 'Mobile Postpaid', icon: Receipt, path: '/recharge/postpaid' },
  { key: 'electricity', label: 'Electricity', icon: Zap, path: '/recharge/electricity' },
  { key: 'dth', label: 'DTH Satellite', icon: Tv, path: '/recharge/dth' },
  { key: 'fastag', label: 'FASTag Toll', icon: Car, path: '/recharge/fastag' },
  { key: 'lpg', label: 'LPG Gas Booking', icon: Flame, path: '/recharge/lpg' },
  { key: 'loan-emi', label: 'Loan EMI', icon: CreditCard, path: '/recharge/loan-emi' },
  { key: 'insurance', label: 'Insurance Premium', icon: ShieldCheck, path: '/recharge/insurance' },
  { key: 'broadband', label: 'Broadband & Fiber', icon: Wifi, path: '/recharge/broadband' },
  { key: 'water', label: 'Municipal Water', icon: Droplets, path: '/recharge/water' },
];

interface VerifiedBillDetails {
  consumerName: string;
  accountNumber: string;
  billNumber: string;
  billDate: string;
  dueDate: string;
  billPeriod: string;
  amount: number;
  convenienceFee: number;
}

const DynamicRechargePage: React.FC = () => {
  const { subPath } = useParams<{ subPath: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // Normalize active service key
  const getActiveKey = (): string => {
    if (!subPath || subPath === 'overview') {
      return location.pathname === '/recharge' || location.pathname === '/recharge/overview' ? 'overview' : 'mobile';
    }
    if (subPath === 'prepaid' || subPath === 'prepaid-mobile-recharge') return 'mobile';
    if (subPath === 'bill-payment' || subPath === 'bills') return 'overview';
    return subPath.toLowerCase();
  };

  const activeKey = getActiveKey();
  const activeContent: RechargePageContent = RECHARGE_PAGE_MAP[activeKey] || RECHARGE_PAGE_MAP['overview'];

  // Form State
  const [consumerNum, setConsumerNum] = useState('');
  const [operator, setOperator] = useState('');
  const [circle, setCircle] = useState(INDIAN_TELECOM_CIRCLES[0]);
  const [selectedState, setSelectedState] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMode, setPaymentMode] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [netBank, setNetBank] = useState('HDFC Bank');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Plan Browser state (for Mobile / DTH)
  const [selectedPlanTab, setSelectedPlanTab] = useState<'Popular' | '5G Unlimited' | 'Long Term' | 'Data Add-on' | 'Talktime'>('Popular');
  const [planSearch, setPlanSearch] = useState('');

  // Bill Fetching State
  const [isFetchingBill, setIsFetchingBill] = useState(false);
  const [fetchedBill, setFetchedBill] = useState<VerifiedBillDetails | null>(null);

  // Payment Execution State
  const [isPaying, setIsPaying] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success'>('form');
  const [txDetails, setTxDetails] = useState<{
    txId: string;
    bbpsRef: string;
    billerApproval: string;
    timestamp: string;
    amount: number;
    consumerId: string;
    consumerName: string;
    billerName: string;
    mode: string;
  } | null>(null);

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Reset or initialize when activeKey changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setConsumerNum('');
    setAmount('');
    setFetchedBill(null);
    setPaymentStep('form');
    setIsPaying(false);
    setActiveFaq(null);
    setAppliedPromo(null);

    // Default operator based on active category
    if (activeKey === 'mobile' || activeKey === 'postpaid') {
      setOperator(activeContent.operators[0] || 'Reliance Jio Prepaid');
    } else if (activeContent.billers && activeContent.billers.length > 0) {
      setOperator(activeContent.billers[0].name);
    } else {
      setOperator(activeContent.operators[0] || '');
    }
  }, [activeKey]);

  // Handle service category tab switch
  const handleCategorySwitch = (targetKey: string, targetPath: string) => {
    navigate(targetPath);
  };

  // Simulated Bill Fetch
  const handleFetchBill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consumerNum || consumerNum.trim().length < 4) {
      alert(`Please enter a valid ${activeContent.numLabel}`);
      return;
    }

    setIsFetchingBill(true);
    setTimeout(() => {
      setIsFetchingBill(false);
      // Realistic simulated customer name and bill details based on consumer number
      const names = ["AMIT VERMA", "PRIYA SHARMA", "RAJESH KUMAR", "SUNITA PATEL", "DEEPAK JOSHI"];
      const seed = Math.abs(consumerNum.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0));
      const simulatedName = names[seed % names.length];
      const simulatedAmount = activeContent.quickAmounts[1] || 1250;

      const dueDateObj = new Date();
      dueDateObj.setDate(dueDateObj.getDate() + 14);
      const dueDateStr = dueDateObj.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

      setFetchedBill({
        consumerName: simulatedName,
        accountNumber: consumerNum.toUpperCase(),
        billNumber: `BILL-${Math.floor(10000000 + Math.random() * 90000000)}`,
        billDate: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        dueDate: dueDateStr,
        billPeriod: "Current Billing Cycle (30 Days)",
        amount: simulatedAmount,
        convenienceFee: 0
      });
      setAmount(simulatedAmount.toString());
    }, 700);
  };

  // Plan Selection for Mobile / DTH
  const handleSelectPlan = (plan: RechargePlan) => {
    setAmount(plan.price.toString());
  };

  // Apply Promo
  const handleApplyPromo = (code: string) => {
    setPromoCode(code);
    setAppliedPromo(code);
  };

  // Payment Execution Simulation
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = parseFloat(amount);
    if (!finalAmount || isNaN(finalAmount) || finalAmount <= 0) {
      alert("Please enter or select a valid payment amount.");
      return;
    }
    if (!consumerNum || consumerNum.trim().length < 4) {
      alert(`Please input a valid ${activeContent.numLabel}`);
      return;
    }

    setPaymentStep('processing');
    setIsPaying(true);

    // Multi-stage BBPS settlement simulation
    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toLocaleDateString('en-IN', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }) + ', ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

      setTxDetails({
        txId: `TXN${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        bbpsRef: `BBPS-IN-${Math.floor(100000000000 + Math.random() * 900000000000)}`,
        billerApproval: `APR-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: timeStr,
        amount: finalAmount,
        consumerId: consumerNum,
        consumerName: fetchedBill ? fetchedBill.consumerName : "VERIFIED CONSUMER",
        billerName: operator || activeContent.title,
        mode: paymentMode === 'upi' ? `UPI (${upiId || 'GPay / PhonePe'})` : paymentMode === 'card' ? 'Debit/Credit Card' : `Net Banking (${netBank})`
      });

      setIsPaying(false);
      setPaymentStep('success');
    }, 1800);
  };

  // Reset payment console
  const handleMakeAnotherPayment = () => {
    setConsumerNum('');
    setAmount('');
    setFetchedBill(null);
    setPaymentStep('form');
    setTxDetails(null);
  };

  // Trigger Print Receipt
  const handlePrintReceipt = () => {
    window.print();
  };

  // Copy Receipt URL / Reference
  const handleCopyReceipt = () => {
    if (!txDetails) return;
    const text = `BanksCart BBPS Payment Verified\nReference: ${txDetails.bbpsRef}\nAmount: ₹${txDetails.amount}\nBiller: ${txDetails.billerName}\nDate: ${txDetails.timestamp}`;
    navigator.clipboard.writeText(text);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2500);
  };

  // Get active operator plans for Mobile Prepaid
  const currentOperatorPlans: RechargePlan[] = 
    activeKey === 'mobile' && MOBILE_PREPAID_PLANS[operator] 
      ? MOBILE_PREPAID_PLANS[operator] 
      : (MOBILE_PREPAID_PLANS["Reliance Jio Prepaid"] || []);

  const filteredPlans = currentOperatorPlans.filter(p => {
    const matchesTab = selectedPlanTab === 'Popular' ? true : p.category === selectedPlanTab;
    const matchesSearch = planSearch === '' 
      || p.price.toString().includes(planSearch) 
      || p.description.toLowerCase().includes(planSearch.toLowerCase())
      || p.perks.toLowerCase().includes(planSearch.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Canonical & SEO Data
  const canonicalUrl = `https://bankscart.com/recharge${activeKey === 'overview' ? '' : `/${activeKey}`}`;
  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        "url": canonicalUrl,
        "name": activeContent.metaTitle,
        "description": activeContent.metaDescription,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://bankscart.com/#website",
          "name": "BanksCart",
          "url": "https://bankscart.com"
        }
      },
      {
        "@type": "Service",
        "name": activeContent.title,
        "serviceType": "Financial & Utility Payment Service",
        "provider": {
          "@type": "Organization",
          "name": "BanksCart",
          "url": "https://bankscart.com"
        },
        "areaServed": "IN",
        "termsOfService": "https://bankscart.com/terms"
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
            "name": "Recharge & Bill Payments",
            "item": "https://bankscart.com/recharge"
          },
          ...(activeKey !== 'overview' ? [{
            "@type": "ListItem",
            "position": 3,
            "name": activeContent.badge,
            "item": canonicalUrl
          }] : [])
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": activeContent.faqs.map(faq => ({
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pt-20 sm:pt-24 pb-16 antialiased text-slate-800">
      <Helmet>
        <title>{activeContent.metaTitle}</title>
        <meta name="description" content={activeContent.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={activeContent.metaTitle} />
        <meta property="og:description" content={activeContent.metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(schemaJsonLd)}
        </script>
      </Helmet>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb path={["Home", "Recharge & Bill Payments", activeKey === 'overview' ? 'Overview' : activeContent.badge]} />

        {/* Hero Section: Institutional Trust Navy / Deep Slate */}
        <section className="bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 rounded-2xl text-white p-6 sm:p-10 shadow-lg border border-slate-800 relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-blue-500/15 border border-blue-400/30 rounded-full px-3.5 py-1 text-xs font-semibold text-blue-200 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              NPCI Bharat BillPay (BBPS) Clearinghouse
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              {activeContent.title}
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              {activeContent.intro}
            </p>

            {/* Trust Indicators */}
            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1 rounded-md border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free Convenience Fee
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1 rounded-md border border-slate-700/60">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant Clearance Receipts
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/60 px-3 py-1 rounded-md border border-slate-700/60">
                <Lock className="w-4 h-4 text-emerald-400" /> 256-Bit SSL Secured Escrow
              </span>
            </div>
          </div>
        </section>

        {/* Service Switcher Category Navigation Bar */}
        <section className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-3 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 min-w-max">
            {SERVICE_CATEGORIES.map((item) => {
              const Icon = item.icon;
              const isActive = activeKey === item.key;
              return (
                <button
                  key={item.key}
                  onClick={() => handleCategorySwitch(item.key, item.path)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#1E3A8A] text-white shadow-md shadow-blue-900/20'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Two-Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Main Action Console (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Payment Console Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
              
              {/* STAGE 1: Form Input */}
              {paymentStep === 'form' && (
                <div className="space-y-6">
                  
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-[#1E3A8A] rounded-full"></span>
                        {activeContent.badge} Console
                      </h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Enter your connection identifiers to process payment instantly.
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                      <Check className="w-3.5 h-3.5" /> BBPS Live
                    </span>
                  </div>

                  <form onSubmit={handleProceedToPayment} className="space-y-5">
                    
                    {/* Operator or Biller Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                        Select Operator / Utility Board
                      </label>
                      <select
                        value={operator}
                        onChange={(e) => setOperator(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-colors"
                      >
                        {activeContent.billers && activeContent.billers.length > 0 ? (
                          activeContent.billers.map((b) => (
                            <option key={b.id} value={b.name}>
                              {b.name} {b.state ? `(${b.state})` : ''}
                            </option>
                          ))
                        ) : (
                          activeContent.operators.map((op, idx) => (
                            <option key={idx} value={op}>{op}</option>
                          ))
                        )}
                      </select>
                    </div>

                    {/* Telecom Circle (Only for Mobile Prepaid) */}
                    {activeKey === 'mobile' && (
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                          Telecom Circle / Region
                        </label>
                        <select
                          value={circle}
                          onChange={(e) => setCircle(e.target.value)}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-colors"
                        >
                          {INDIAN_TELECOM_CIRCLES.map((c, i) => (
                            <option key={i} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* Consumer Identifier / Mobile / CA Number */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                          {activeContent.numLabel}
                        </label>
                        <span className="text-[11px] text-slate-400">
                          {activeContent.numHint}
                        </span>
                      </div>
                      <div className="relative">
                        <input
                          type={activeContent.numType || "text"}
                          value={consumerNum}
                          onChange={(e) => setConsumerNum(e.target.value)}
                          placeholder={activeContent.numPlaceholder}
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-colors uppercase"
                          required
                        />
                        {/* Optional Fetch Bill trigger for utility boards */}
                        {activeKey !== 'mobile' && activeKey !== 'overview' && (
                          <button
                            type="button"
                            onClick={handleFetchBill}
                            disabled={isFetchingBill || consumerNum.length < 3}
                            className="absolute right-2 top-2 bottom-2 px-3.5 bg-[#1E3A8A] text-white text-xs font-bold rounded-lg hover:bg-blue-900 disabled:opacity-40 transition-colors flex items-center gap-1.5"
                          >
                            {isFetchingBill ? (
                              <>
                                <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Fetching...
                              </>
                            ) : (
                              'Fetch Bill'
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Fetched Bill Details Card (If Bill Fetched) */}
                    {fetchedBill && (
                      <div className="p-4 bg-blue-50/60 border border-blue-200 rounded-xl space-y-3">
                        <div className="flex items-center justify-between border-b border-blue-200/60 pb-2">
                          <span className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-1.5">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Verified Biller Statement
                          </span>
                          <span className="text-xs text-blue-700 font-medium">Due: {fetchedBill.dueDate}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-slate-500 block">Consumer Name:</span>
                            <span className="font-bold text-slate-900">{fetchedBill.consumerName}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Account Number:</span>
                            <span className="font-mono font-semibold text-slate-800">{fetchedBill.accountNumber}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Bill Number:</span>
                            <span className="font-mono text-slate-700">{fetchedBill.billNumber}</span>
                          </div>
                          <div>
                            <span className="text-slate-500 block">Bill Period:</span>
                            <span className="text-slate-700">{fetchedBill.billPeriod}</span>
                          </div>
                        </div>
                        <div className="pt-2 border-t border-blue-200/60 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700">Total Billed Amount:</span>
                          <span className="text-lg font-bold font-mono text-[#1E3A8A] tabular-nums">
                            ₹{fetchedBill.amount.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Amount & Quick Chips */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                          Recharge / Payment Amount (₹)
                        </label>
                        <span className="text-xs font-semibold text-emerald-700">
                          0% Convenience Surcharge
                        </span>
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-3 text-slate-400 font-bold text-base">₹</span>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Enter payment amount"
                          className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-base font-bold font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] transition-colors tabular-nums"
                          required
                        />
                      </div>

                      {/* Quick Amount Chips */}
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {activeContent.quickAmounts.map((qVal) => (
                          <button
                            key={qVal}
                            type="button"
                            onClick={() => setAmount(qVal.toString())}
                            className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-colors border ${
                              amount === qVal.toString()
                                ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200/80'
                            }`}
                          >
                            ₹{qVal}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Plan Browser for Mobile Prepaid */}
                    {activeKey === 'mobile' && (
                      <div className="pt-3 border-t border-slate-100 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Browse Tariff Plans for {operator}
                          </h3>
                        </div>

                        {/* Plan Tabs */}
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
                          {(['Popular', '5G Unlimited', 'Long Term', 'Data Add-on', 'Talktime'] as const).map((tab) => (
                            <button
                              key={tab}
                              type="button"
                              onClick={() => setSelectedPlanTab(tab)}
                              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                                selectedPlanTab === tab
                                  ? 'bg-[#1E3A8A] text-white'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {tab}
                            </button>
                          ))}
                        </div>

                        {/* Plan Cards Grid */}
                        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                          {filteredPlans.map((plan) => (
                            <div
                              key={plan.id}
                              onClick={() => handleSelectPlan(plan)}
                              className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between gap-4 ${
                                amount === plan.price.toString()
                                  ? 'border-[#1E3A8A] bg-blue-50/50 shadow-sm'
                                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-sm text-[#1E3A8A]">₹{plan.price}</span>
                                  <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                                    {plan.validity}
                                  </span>
                                  <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                                    {plan.data}
                                  </span>
                                </div>
                                <p className="text-slate-500 text-[11px]">{plan.description}</p>
                                {plan.perks && (
                                  <p className="text-[10px] text-amber-700 font-medium">★ {plan.perks}</p>
                                )}
                              </div>
                              <button
                                type="button"
                                className={`px-3 py-1.5 rounded-lg font-bold text-xs flex-shrink-0 transition-colors ${
                                  amount === plan.price.toString()
                                    ? 'bg-[#1E3A8A] text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-[#1E3A8A] hover:text-white'
                                }`}
                              >
                                {amount === plan.price.toString() ? 'Selected' : 'Select'}
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Payment Mode Selection */}
                    <div className="pt-3 border-t border-slate-100 space-y-3">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                        Select Payment Method
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentMode('upi')}
                          className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                            paymentMode === 'upi'
                              ? 'border-[#1E3A8A] bg-blue-50/60 text-[#1E3A8A]'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          UPI (GPay / PhonePe)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMode('card')}
                          className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                            paymentMode === 'card'
                              ? 'border-[#1E3A8A] bg-blue-50/60 text-[#1E3A8A]'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          Debit / Credit Card
                        </button>
                        <button
                          type="button"
                          onClick={() => setPaymentMode('netbanking')}
                          className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                            paymentMode === 'netbanking'
                              ? 'border-[#1E3A8A] bg-blue-50/60 text-[#1E3A8A]'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          Net Banking
                        </button>
                      </div>

                      {/* Payment Sub-fields */}
                      {paymentMode === 'upi' && (
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Enter UPI VPA ID (Optional / Instant QR)
                          </label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="e.g. mobile@upi or username@okhdfcbank"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#1E3A8A]"
                          />
                        </div>
                      )}

                      {paymentMode === 'card' && (
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            placeholder="Card Number (16-digits)"
                            maxLength={19}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono font-medium"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              placeholder="MM / YY"
                              maxLength={5}
                              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-center"
                            />
                            <input
                              type="password"
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              placeholder="CVV"
                              maxLength={3}
                              className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-center"
                            />
                          </div>
                        </div>
                      )}

                      {paymentMode === 'netbanking' && (
                        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                          <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                            Select Net Banking Gateway
                          </label>
                          <select
                            value={netBank}
                            onChange={(e) => setNetBank(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800"
                          >
                            <option value="HDFC Bank">HDFC Bank</option>
                            <option value="State Bank of India">State Bank of India (SBI)</option>
                            <option value="ICICI Bank">ICICI Bank</option>
                            <option value="Axis Bank">Axis Bank</option>
                            <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                            <option value="Punjab National Bank">Punjab National Bank (PNB)</option>
                            <option value="Bank of Baroda">Bank of Baroda</option>
                          </select>
                        </div>
                      )}
                    </div>

                    {/* Bill Summary Breakdown */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs">
                      <div className="flex justify-between text-slate-600">
                        <span>Bill Amount:</span>
                        <span className="font-mono font-semibold tabular-nums text-slate-900">
                          ₹{amount ? parseFloat(amount).toLocaleString('en-IN') : '0.00'}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>Platform Convenience Fee:</span>
                        <span className="font-mono font-bold text-emerald-600">₹0.00 (FREE)</span>
                      </div>
                      <div className="flex justify-between text-slate-600">
                        <span>BBPS NPCI Processing:</span>
                        <span className="font-mono font-semibold text-slate-500">₹0.00</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                        <span>Total Payable:</span>
                        <span className="font-mono text-lg text-[#1E3A8A] tabular-nums">
                          ₹{amount ? parseFloat(amount).toLocaleString('en-IN') : '0.00'}
                        </span>
                      </div>
                    </div>

                    {/* Submit CTA Button */}
                    <button
                      type="submit"
                      disabled={isPaying || !amount || parseFloat(amount) <= 0 || !consumerNum}
                      className="w-full py-4 bg-amber-600 hover:bg-amber-700 active:scale-[0.99] text-white font-extrabold rounded-xl text-base shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-40"
                    >
                      <span>Proceed to Pay ₹{amount || '0'} Securely</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {/* STAGE 2: Processing Live Clearance Spinner */}
              {paymentStep === 'processing' && (
                <div className="py-16 text-center space-y-6">
                  <div className="relative w-20 h-20 mx-auto">
                    <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-ping opacity-30"></div>
                    <div className="w-20 h-20 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div className="space-y-2 max-w-sm mx-auto">
                    <h3 className="text-xl font-bold text-slate-900">
                      Authorizing with NPCI BBPS...
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Securing 256-bit SSL encrypted connection and validating transaction against official biller clearing switch.
                    </p>
                  </div>
                </div>
              )}

              {/* STAGE 3: Official Digital BBPS Payment Receipt */}
              {paymentStep === 'success' && txDetails && (
                <div className="space-y-6">
                  {/* Success Alert Banner */}
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                      <Check className="w-6 h-6 stroke-[3]" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-emerald-900">
                        Payment Cleared Successfully!
                      </h3>
                      <p className="text-xs text-emerald-700">
                        Official BBPS acknowledgment received. Operator ledger updated.
                      </p>
                    </div>
                  </div>

                  {/* Printable Formal BBPS Receipt Card */}
                  <div id="printable-receipt" className="p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl space-y-5">
                    
                    {/* Receipt Header */}
                    <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                      <div>
                        <div className="text-base font-black text-[#1E3A8A] tracking-tight">
                          BanksCart Bharat BillPay
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500">
                          Official Digital Transaction Receipt
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded">
                          Settled
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {txDetails.timestamp}
                        </div>
                      </div>
                    </div>

                    {/* Paid Amount Callout */}
                    <div className="p-4 bg-white rounded-xl border border-slate-200 text-center">
                      <span className="text-xs text-slate-500 font-medium">Total Amount Paid</span>
                      <div className="text-3xl font-black font-mono text-[#1E3A8A] tabular-nums mt-0.5">
                        ₹{txDetails.amount.toLocaleString('en-IN')}.00
                      </div>
                      <span className="text-[11px] text-emerald-600 font-semibold block mt-1">
                        Convenience Fee Charged: ₹0.00 (Zero Fee Guarantee)
                      </span>
                    </div>

                    {/* Line Item Receipt Matrix */}
                    <div className="divide-y divide-slate-200/80 text-xs">
                      <div className="py-2.5 flex justify-between">
                        <span className="text-slate-500">BBPS Reference ID:</span>
                        <span className="font-mono font-bold text-slate-900">{txDetails.bbpsRef}</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span className="text-slate-500">BanksCart Transaction ID:</span>
                        <span className="font-mono font-semibold text-slate-800">{txDetails.txId}</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span className="text-slate-500">Service Category:</span>
                        <span className="font-semibold text-slate-900">{activeContent.badge}</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span className="text-slate-500">Biller / Operator Name:</span>
                        <span className="font-semibold text-slate-900 text-right">{txDetails.billerName}</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span className="text-slate-500">{activeContent.numLabel}:</span>
                        <span className="font-mono font-bold text-slate-900">{txDetails.consumerId}</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span className="text-slate-500">Consumer Name:</span>
                        <span className="font-bold text-slate-900">{txDetails.consumerName}</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span className="text-slate-500">Payment Channel:</span>
                        <span className="text-slate-700">{txDetails.mode}</span>
                      </div>
                      <div className="py-2.5 flex justify-between">
                        <span className="text-slate-500">NPCI Clearing Approval:</span>
                        <span className="font-mono text-emerald-700 font-semibold">{txDetails.billerApproval}</span>
                      </div>
                    </div>

                    <div className="pt-2 text-[10px] text-slate-400 text-center leading-normal">
                      This is a computer-generated official BBPS receipt under the National Payments Corporation of India (NPCI) clearing guidelines and does not require a physical signature.
                    </div>
                  </div>

                  {/* Receipt Actions */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <button
                      onClick={handlePrintReceipt}
                      className="py-2.5 px-4 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" /> Print / Save PDF
                    </button>
                    <button
                      onClick={handleCopyReceipt}
                      className="py-2.5 px-4 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" /> {copyFeedback ? 'Copied!' : 'Copy Reference'}
                    </button>
                    <button
                      onClick={handleMakeAnotherPayment}
                      className="py-2.5 px-4 bg-blue-50 text-[#1E3A8A] rounded-xl text-xs font-bold hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5 col-span-2 sm:col-span-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> Another Bill
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Checklist: Why Settle through BanksCart BBPS */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#1E3A8A] rounded-full"></span>
                {activeContent.checklistTitle}
              </h3>
              <div className="space-y-3">
                {activeContent.checklist.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </div>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* High-Density Editorial Article Sections (No raw markdown!) */}
            {activeContent.editorialArticles && activeContent.editorialArticles.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6">
                {activeContent.editorialArticles.map((art, idx) => (
                  <div key={idx} className="space-y-3 border-b border-slate-100 last:border-b-0 pb-6 last:pb-0">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {art.title}
                    </h3>
                    {art.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Sidebar Widgets (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* BBPS Official Framework Assurance Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center font-black">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">NPCI BBPS Protection Shield</h3>
                  <span className="text-[11px] text-slate-500">RBI Regulated National Switch</span>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Zero Surcharge Guarantee:</strong> Never pay platform fees or credit card handling surcharges on utility bills.</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Escrow Refund SLA:</strong> In the rare event of network failure, funds return to source accounts in 24–48 hours.</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Official Biller References:</strong> Every receipt includes a unique 16-digit NPCI transaction audit number.</span>
                </div>
              </div>
            </div>

            {/* Exclusive Cashback & Coupon Tokens */}
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <Tag className="w-4 h-4 text-amber-600" />
                Active Cashback & Discount Tokens
              </div>
              <p className="text-xs text-amber-800">
                Apply verified promo tokens to claim instant bill discounts:
              </p>

              <div className="space-y-2">
                <div 
                  onClick={() => handleApplyPromo('BANKSCARTUPI')}
                  className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between cursor-pointer hover:border-amber-400 transition-colors"
                >
                  <div>
                    <span className="font-mono font-bold text-xs text-slate-900 block">BANKSCARTUPI</span>
                    <span className="text-[11px] text-slate-500">Flat ₹25 cashback on first bill payment above ₹200.</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                    appliedPromo === 'BANKSCARTUPI' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {appliedPromo === 'BANKSCARTUPI' ? 'Applied' : 'Apply'}
                  </span>
                </div>

                <div 
                  onClick={() => handleApplyPromo('SAVENOW')}
                  className="p-3 bg-white rounded-xl border border-amber-200 flex items-center justify-between cursor-pointer hover:border-amber-400 transition-colors"
                >
                  <div>
                    <span className="font-mono font-bold text-xs text-slate-900 block">SAVENOW</span>
                    <span className="text-[11px] text-slate-500">100% waiver on processing and utility taxes.</span>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                    appliedPromo === 'SAVENOW' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {appliedPromo === 'SAVENOW' ? 'Applied' : 'Apply'}
                  </span>
                </div>
              </div>
            </div>

            {/* Embedded CIBIL Check Callout (For EMI / Loan Borrowers) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Credit Score Health
                </span>
                <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                  Free Check
                </span>
              </div>
              <h3 className="font-bold text-slate-900 text-sm">
                Paying Loan EMIs or Bills? Verify CIBIL Score Impact
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Timely utility and loan clearances shield your credit score from defaults. Check your official bureau rating instantly with zero score impact.
              </p>
              <Link
                to="/cibil/how-to-check-cibil-score-by-pan-card"
                className="w-full py-2.5 bg-[#1E3A8A] text-white rounded-xl text-xs font-bold hover:bg-blue-900 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Check Credit Score Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* BBPS National Grievance Desk */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Clock className="w-4 h-4 text-blue-600" />
                BBPS Grievance & Dispute Redressal Desk
              </div>
              <p className="text-[11px] leading-relaxed">
                For failed transactions, unauthorized debits, or biller status delays, quote your 16-digit BBPS reference number to the National BBPS Grievance Cell:
              </p>
              <div className="pt-1 flex items-center justify-between text-xs font-mono font-bold text-slate-900">
                <span>National Helpline: 1800-11-2222</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-sans">24/7 Toll-Free</span>
              </div>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions Accordions */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
              {activeContent.badge} Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Clear answers on BBPS clearance times, refund settlement SLAs, and tax receipts.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {activeContent.faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left text-sm sm:text-base font-bold text-slate-900 hover:text-[#1E3A8A] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180 text-[#1E3A8A]' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed pr-6">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default DynamicRechargePage;
