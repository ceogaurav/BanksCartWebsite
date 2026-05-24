import React, { useState } from 'react';
import { Sparkles, CreditCard, Shield, Landmark, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface HeroSectionProps {
  openApplyModal?: (loanType?: string) => void;
  openCibilModal?: () => void;
}

export default function HeroSection({ openApplyModal, openCibilModal }: HeroSectionProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'card' | 'cibil' | 'loan'>('cibil');
  
  // Widget Form States
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [cardCategory, setCardCategory] = useState<string>('cashback');
  const [phone, setPhone] = useState<string>('');

  const handleCheckerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'cibil') {
      if (openCibilModal) openCibilModal();
    } else if (activeTab === 'card') {
      navigate('/credit-card-finder');
    } else if (activeTab === 'loan') {
      if (openApplyModal) openApplyModal('Personal Loan');
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white pt-24 pb-20 font-inter">
      {/* Background Decorative Blur Blobs */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-3xl -translate-y-12 translate-x-12 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-pink-500/5 rounded-full blur-3xl translate-y-12 -translate-x-12 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* LEFT: Premium Value Propositions */}
          <div className="lg:w-1/2 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-yellow-300">
              <Sparkles className="w-4 h-4 text-yellow-400 animate-spin-slow" /> India's No. 1 Comparison Hub
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
              Simplify Your <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-yellow-300">
                Financial Decisions
              </span>
            </h1>
            
            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">
              Compare personal loans, premium credit cards, fixed deposits, and check your credit score absolutely free. We match you with 40+ leading lenders for the best interest rates.
            </p>

            {/* Live Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-yellow-400">40+</div>
                <div className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold tracking-wider">Partner Banks</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-yellow-400">2.5 Cr+</div>
                <div className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold tracking-wider">Happy Customers</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl sm:text-3xl font-black text-yellow-400">0%</div>
                <div className="text-[10px] sm:text-xs text-slate-400 uppercase font-bold tracking-wider">Hidden Charges</div>
              </div>
            </div>

            {/* Trust List */}
            <ul className="space-y-2.5 pt-2 text-xs sm:text-sm font-medium text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-yellow-400 flex-shrink-0" />
                <span>Pre-Approved Offers with direct bank integrations</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-yellow-400 flex-shrink-0" />
                <span>Safe, secure, and 256-bit encrypted data handling</span>
              </li>
            </ul>
          </div>

          {/* RIGHT: High-Converting Interactive Widget */}
          <div className="lg:w-[480px] w-full">
            <div className="bg-white rounded-3xl p-6 sm:p-8 text-slate-900 shadow-2xl border border-slate-100 flex flex-col justify-between min-h-[420px] relative">
              {/* Subtle top indicator glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-b-full" />

              <div>
                {/* Form Tabs */}
                <div className="flex border-b border-slate-100 pb-3 mb-6 gap-2">
                  <button
                    onClick={() => setActiveTab('cibil')}
                    className={`flex-1 pb-2 font-black text-xs sm:text-sm tracking-wide border-b-2 text-center transition-all flex flex-col items-center gap-1
                      ${activeTab === 'cibil'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                  >
                    <Shield className="w-4 h-4" />
                    <span>Free CIBIL</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('card')}
                    className={`flex-1 pb-2 font-black text-xs sm:text-sm tracking-wide border-b-2 text-center transition-all flex flex-col items-center gap-1
                      ${activeTab === 'card'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Credit Card</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('loan')}
                    className={`flex-1 pb-2 font-black text-xs sm:text-sm tracking-wide border-b-2 text-center transition-all flex flex-col items-center gap-1
                      ${activeTab === 'loan'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-slate-400 hover:text-slate-600'}`}
                  >
                    <Landmark className="w-4 h-4" />
                    <span>Personal Loan</span>
                  </button>
                </div>

                {/* Form Content */}
                <form onSubmit={handleCheckerSubmit} className="space-y-5">
                  <AnimatePresence mode="wait">
                    
                    {/* TAB 1: CIBIL CHECKER */}
                    {activeTab === 'cibil' && (
                      <motion.div
                        key="cibil"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="space-y-1">
                          <h3 className="text-lg font-black text-slate-800">Check Score Instantly</h3>
                          <p className="text-xs text-slate-400 font-medium">Verify credit history directly from Credit Information Bureau.</p>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1">Mobile Number</label>
                            <input
                              type="tel"
                              required
                              placeholder="Enter 10-digit mobile number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 text-slate-800 font-bold text-sm bg-slate-50"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* TAB 2: CREDIT CARD MATCH */}
                    {activeTab === 'card' && (
                      <motion.div
                        key="card"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="space-y-1">
                          <h3 className="text-lg font-black text-slate-800">Credit Card Matcher</h3>
                          <p className="text-xs text-slate-400 font-medium">Match spending styles with high reward plastic cards.</p>
                        </div>
                        <div>
                          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-2">Primary Spending Area</label>
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              { id: 'cashback', label: '⚡ Cashback' },
                              { id: 'travel', label: '✈️ Travel' },
                              { id: 'fuel', label: '⛽ Fuel' },
                              { id: 'shopping', label: '🛍️ Shopping' }
                            ].map(cat => (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => setCardCategory(cat.id)}
                                className={`p-3 text-left rounded-xl border text-xs font-bold transition-colors
                                  ${cardCategory === cat.id
                                    ? 'border-blue-600 bg-blue-50 text-blue-700'
                                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                              >
                                {cat.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* TAB 3: PERSONAL LOAN */}
                    {activeTab === 'loan' && (
                      <motion.div
                        key="loan"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4"
                      >
                        <div className="space-y-1">
                          <h3 className="text-lg font-black text-slate-800">Compare Personal Loans</h3>
                          <p className="text-xs text-slate-400 font-medium">Select required cash brackets for immediate eligibility matching.</p>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500">Loan Amount Required</label>
                            <span className="text-sm font-black text-blue-600">₹{loanAmount.toLocaleString('en-IN')}</span>
                          </div>
                          <input
                            type="range"
                            min="50000"
                            max="1500000"
                            step="25000"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
                          />
                          <div className="flex justify-between text-[9px] text-slate-400 font-bold mt-1">
                            <span>₹50,000</span>
                            <span>₹15,00,000</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                  </AnimatePresence>

                  {/* Primary CTA Submit */}
                  <button
                    type="submit"
                    className="w-full py-4 px-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl font-black text-sm tracking-wide shadow-lg shadow-pink-200 active:scale-[0.98] transition-all hover:from-pink-600 hover:to-rose-700 flex items-center justify-center gap-2 group mt-6"
                  >
                    <span>
                      {activeTab === 'cibil' && 'Check Free Credit Score'}
                      {activeTab === 'card' && 'Find Matching Credit Cards'}
                      {activeTab === 'loan' && 'Check Instant Loan Eligibility'}
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>

                </form>
              </div>

              {/* Secure Footer Badge */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <span className="inline-block text-emerald-500 font-bold">✓</span> SSL Secured Comparisons
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
