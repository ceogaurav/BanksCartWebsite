import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert, Sparkles, BookOpen, AlertCircle, Info, Landmark, Percent, Award, ShieldCheck, ArrowRight, Play, MessageSquare, TrendingUp, CreditCard, Smartphone, Zap, Tv, Receipt } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';
import { RECHARGE_PAGE_MAP, RechargePageContent } from '../../data/rechargePageData';

const DynamicRechargePage: React.FC = () => {
  const { subPath } = useParams<{ subPath: string }>();
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Helper to convert slug/subPath to a readable title
  const formatSlug = (slug: string) => {
    if (slug === 'dth') return 'DTH Recharge';
    if (slug === 'lpg') return 'LPG Gas Booking';
    return slug
      .split('-')
      .map(word => {
        if (word.toUpperCase() === 'EMI') return 'EMI';
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };

  // Safe fallback procedural configurations for 100% dynamic paths coverage
  const generateFallbackConfig = (slug: string): RechargePageContent => {
    const readableSlug = formatSlug(slug);
    
    let numLabel = "Consumer/Connection Number";
    let numPlaceholder = "Enter consumer account number";
    let operatorsList = ["National Utility Operator A", "National Utility Operator B", "Regional Power Board C", "Public Service Board D"];
    
    if (slug.includes('mobile') || slug.includes('postpaid')) {
      numLabel = "10-Digit Mobile Number";
      numPlaceholder = "Enter 10-digit mobile number";
      operatorsList = ["Reliance Jio", "Bharti Airtel", "Vodafone Idea (Vi)", "BSNL"];
    } else if (slug.includes('dth')) {
      numLabel = "DTH Subscriber ID / Smart Card Number";
      numPlaceholder = "Enter DTH subscriber ID";
      operatorsList = ["Tata Play (Tata Sky)", "Airtel Digital TV", "Dish TV", "Sun Direct", "Videocon d2h"];
    } else if (slug.includes('gas') || slug.includes('lpg')) {
      numLabel = "LPG Consumer Number / Mobile Number";
      numPlaceholder = "Enter LPG connection details";
      operatorsList = ["Indane Gas", "HP Gas", "Bharat Gas"];
    }

    let customFAQs = [
      { q: `What is a ${readableSlug}?`, a: `A ${readableSlug} portal represents a secure digital gateway built under BanksCart BBPS to settle active utility statements, recharges, or co-branded monthly fees online.` },
      { q: "Is the transaction processed instantly?", a: "Yes. All utility recharges and bill payments are settled in real-time, and credit is cleared immediately." },
      { q: "Do you charge extra convenience fees?", a: "No. BanksCart charges absolutely zero convenience fees or intermediate commissions on standard utility bills." },
      { q: "What should I do if my payment fails?", a: "If money is deducted but the transaction fails, your bank triggers a secure reversal automatically within 2 to 3 business days." },
      { q: "How do I download my payment receipt?", a: "A digital invoice receipt is instantly rendered on-screen after authorization, and a copy is sent directly to your email." },
      { q: "Can I save connection details for future bills?", a: "Yes. Registered users can save consumer numbers in their account dashboard for one-click payments." },
      { q: "Do you support credit card bill payments?", a: "Yes, you can settle national credit card dues securely under the 'Bill Payments' tab." },
      { q: "Is the payment portal regulated?", a: "Yes, our utility gateways comply with the NPCI Bharat Bill Payment System (BBPS) safety standards." },
      { q: "Can I convert large utility payments into EMIs?", a: "Yes. Using a credit card to pay allows you to convert single statements above ₹2,500 into easy EMIs." },
      { q: "What is an automated bill scheduler?", a: "An upcoming feature that automatically notifies you and schedules payments 48 hours before active utility bills reach their due date." }
    ];

    return {
      title: `${readableSlug} Online: Compare & Settle Instantly`,
      badge: "Utility Payments Hub",
      intro: `Pay your **${readableSlug}** online securely at BanksCart. Experience real-time billing logs, zero convenience fees, and automated due date notifications.`,
      numLabel,
      numPlaceholder,
      operators: operatorsList,
      checklistTitle: "Investor Action Checklist",
      checklist: [
        `Select operator: Choose your verified service provider or state utility board.`,
        `Fetch active bill: Enter your connection details to retrieve exact payment details.`,
        "Settle instantly: Complete authorization safely using direct UPI or card networks."
      ],
      faqs: customFAQs
    };
  };

  const currentSlug = subPath || 'overview';
  const config = RECHARGE_PAGE_MAP[currentSlug] || generateFallbackConfig(currentSlug);

  // Real-Time Interactive Payment Mock States
  const [consumerNum, setConsumerNum] = useState<string>('');
  const [operator, setOperator] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [showPinModal, setShowPinModal] = useState<boolean>(false);
  const [paymentPin, setPaymentPin] = useState<string>('');
  const [isPaying, setIsPaying] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [txId, setTxId] = useState<string>('');

  // Settle operators on path changes
  useEffect(() => {
    setConsumerNum('');
    setOperator(config.operators[0]);
    setAmount('');
    setShowPinModal(false);
    setPaymentPin('');
    setIsPaying(false);
    setIsSuccess(false);
    setActiveFaq(null);
    window.scrollTo(0, 0);
  }, [subPath]);

  // Handler for Proceed to Pay
  const handleProceedToPay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consumerNum || !operator || !amount) {
      alert("Please fill in all the payment details first.");
      return;
    }
    setShowPinModal(true);
  };

  // Handler for secure Pin authorization simulation
  const handleAuthorizePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentPin.length < 4) {
      alert("Please enter a valid 4-digit or 6-digit secure UPI Pin.");
      return;
    }
    setShowPinModal(false);
    setIsPaying(true);

    // Simulate secure banking clearance for 1.5 seconds
    setTimeout(() => {
      setIsPaying(false);
      setIsSuccess(true);
      setTxId(`TXN${Math.floor(1000000000 + Math.random() * 9000000000)}`);
    }, 1500);
  };

  // Reset payment states to make another transaction
  const handleMakeAnotherPayment = () => {
    setConsumerNum('');
    setAmount('');
    setPaymentPin('');
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-blue-700 via-sky-700 to-indigo-800 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[200px] font-black leading-none select-none">BILL</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              {config.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight">
              {config.title}
            </h1>
            <p className="text-sky-100 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl font-medium">
              {config.intro}
            </p>
          </div>
        </div>

        {/* Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Payment Mock Portal */}
          <div className="lg:col-span-7 space-y-8">
            
            {!isSuccess && !isPaying && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Receipt className="w-5 h-5 text-blue-600" />
                  Instant Bill Clearance Portal
                </h3>
                
                <form onSubmit={handleProceedToPay} className="space-y-6">
                  
                  {/* Select Operator */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Select Operator / Service Board</label>
                    <select
                      value={operator}
                      onChange={(e) => setOperator(e.target.value)}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 bg-white focus:outline-none focus:border-blue-500 transition-colors"
                    >
                      {config.operators.map((op, idx) => (
                        <option key={idx} value={op}>{op}</option>
                      ))}
                    </select>
                  </div>

                  {/* Consumer / Connection Number */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">{config.numLabel}</label>
                    <input
                      type="text"
                      value={consumerNum}
                      onChange={(e) => setConsumerNum(e.target.value)}
                      placeholder={config.numPlaceholder}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* Payment Amount */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Amount Payable (₹)</label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter billing or recharge amount in ₹"
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:border-blue-500 transition-colors font-mono"
                    />
                  </div>

                  {/* Action Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold hover:shadow-lg active:scale-95 transition-all text-sm flex justify-center items-center gap-2"
                  >
                    Proceed to Pay Outstanding
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </form>
              </div>
            )}

            {/* Simulated Payment Loading State */}
            {isPaying && (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 shadow-sm text-center space-y-6">
                <div className="w-16 h-16 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                <h4 className="text-base font-bold text-slate-700">Authorizing secure transaction...</h4>
                <p className="text-xs text-slate-400 font-medium">Please do not refresh the page or exit the browser window.</p>
              </div>
            )}

            {/* Interactive Transaction Successful Overlay */}
            {isSuccess && (
              <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-md text-center max-w-xl mx-auto space-y-8 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm border border-emerald-100">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-800">Transaction Successful!</h3>
                  <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mt-2">Bill Settle Reference Generated</p>
                </div>

                {/* Receipt Grid */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left space-y-4 text-xs font-semibold text-slate-600 font-mono">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                    <span>Transaction ID</span>
                    <span className="text-slate-800 font-bold">{txId}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                    <span>Service Operator</span>
                    <span className="text-slate-800 font-bold">{operator}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                    <span>Consumer Account</span>
                    <span className="text-slate-800 font-bold">{consumerNum}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 bg-indigo-50/50 rounded-lg px-3">
                    <span className="text-indigo-900 font-bold">Amount Paid</span>
                    <span className="text-indigo-700 text-sm font-black">₹{amount}</span>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleMakeAnotherPayment}
                    className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm active:scale-95 transition-all"
                  >
                    Settle Another Bill
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex-1 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-sm hover:shadow-lg active:scale-95 transition-all"
                  >
                    Print Receipt
                  </button>
                </div>
              </div>
            )}

            {/* Checklist guidelines */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-base font-bold text-slate-800 mb-6">{config.checklistTitle}</h3>
              <div className="space-y-4">
                {config.checklist.map((tip, idx) => (
                  <div key={idx} className="flex gap-4 items-start pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-semibold">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {config.faqs.map((faq, index) => (
                  <div key={index} className="border border-slate-100 rounded-xl overflow-hidden transition-colors">
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full flex justify-between items-center p-4 bg-slate-50/50 hover:bg-slate-50 text-left font-bold text-slate-700 text-sm outline-none transition-colors"
                    >
                      {faq.q}
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-blue-600' : ''}`} />
                    </button>
                    {activeFaq === index && (
                      <div className="p-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-white leading-relaxed font-semibold">
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
            <CibilCheckerForm sourcePage={`${config.title} Payment Page`} />
          </div>

        </div>

      </div>

      {/* Simulated Secure UPI Pin Modal Overlay */}
      {showPinModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-6 animate-in slide-in-from-bottom-4 duration-200">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h4 className="text-base font-black text-slate-800">Secure UPI Pin Required</h4>
              <p className="text-xs text-slate-400 mt-1 font-medium">Verify transaction amount of <span className="font-bold text-slate-700">₹{amount}</span> to proceed.</p>
            </div>

            <form onSubmit={handleAuthorizePayment} className="space-y-4">
              <input
                type="password"
                maxLength={6}
                value={paymentPin}
                onChange={(e) => setPaymentPin(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 4 or 6-digit UPI Pin"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-center text-lg font-bold text-slate-800 tracking-[8px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs active:scale-95 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-xs hover:shadow-lg active:scale-95 transition-all"
                >
                  Submit Pin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default DynamicRechargePage;
