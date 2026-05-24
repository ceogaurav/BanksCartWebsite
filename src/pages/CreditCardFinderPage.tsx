import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard, ArrowLeft, ArrowRight, Gift, Plane, Zap, IndianRupee,
  ShoppingBag, Flame, Sparkles, Briefcase, HelpCircle, CheckCircle, RefreshCcw
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CardRecommendation {
  name: string;
  bank: string;
  rating: number;
  fee: string;
  rewards: string[];
  description: string;
}

const RECOMMENDATIONS: Record<string, CardRecommendation> = {
  premiumTravel: {
    name: "Diners Club Black / Infinia",
    bank: "HDFC Bank",
    rating: 4.9,
    fee: "₹10,000/year (Waved on spends > ₹8 Lakhs)",
    rewards: [
      "Unlimited International & Domestic lounge access",
      "5X Reward points on travel and dining",
      "Complimentary golf rounds at premium courses"
    ],
    description: "The ultimate card for high-net-worth individuals and frequent flyers looking for premium luxury rewards."
  },
  flatCashback: {
    name: "ACE Credit Card",
    bank: "Axis Bank",
    rating: 4.8,
    fee: "₹499/year (Waved on spends > ₹2 Lakhs)",
    rewards: [
      "5% flat cashback on utility bills via Google Pay",
      "4% flat cashback on Swiggy, Zomato, and Ola",
      "1.5% unlimited flat cashback on all other transactions"
    ],
    description: "The highest flat cashback reward rate in the Indian market, ideal for regular utility bill payments."
  },
  commuteSavings: {
    name: "IndianOil Credit Card",
    bank: "HDFC Bank",
    rating: 4.6,
    fee: "₹500/year (Waved on spends > ₹50k)",
    rewards: [
      "5% reward points on fuel purchases at IOCL outlets",
      "1% fuel surcharge waiver up to ₹250 per month",
      "Complimentary annual fee waiver on budget spend"
    ],
    description: "Perfect for daily commuters looking to hedge against rising fuel prices and maximize fuel savings."
  },
  allRounder: {
    name: "Cashback Credit Card",
    bank: "SBI Card",
    rating: 4.7,
    fee: "₹999/year (Waved on spends > ₹2 Lakhs)",
    rewards: [
      "5% cashback on all online purchases without merchant caps",
      "1% cashback on all offline expenditures",
      "Zero joining fee promotional offers"
    ],
    description: "A highly versatile card providing flat 5% cashback on almost all online platforms with zero merchant restrictions."
  }
};

export default function CreditCardFinderPage({ openApplyModal }: { openApplyModal?: (loanType?: string) => void }) {
  const [step, setStep] = useState<number>(1);
  const [category, setCategory] = useState<string>('');
  const [spend, setSpend] = useState<string>('');
  const [income, setIncome] = useState<string>('');

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleReset = () => {
    setStep(1);
    setCategory('');
    setSpend('');
    setIncome('');
  };

  const matchedCard = React.useMemo(() => {
    if (spend === 'high' && category === 'travel') {
      return RECOMMENDATIONS.premiumTravel;
    }
    if (category === 'fuel') {
      return RECOMMENDATIONS.commuteSavings;
    }
    if (category === 'cashback' || spend === 'low') {
      return RECOMMENDATIONS.flatCashback;
    }
    return RECOMMENDATIONS.allRounder;
  }, [category, spend]);

  const slideVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.4 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 py-12 px-4 md:px-8 font-inter pt-24 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-2xl p-8 border border-purple-100 min-h-[500px] flex flex-col justify-between relative overflow-hidden">
        
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 -translate-y-8 translate-x-8" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 translate-y-8 -translate-x-8" />

        <div className="relative z-10">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <span className="text-sm font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
              Card Matcher
            </span>
            {step < 4 && (
              <span className="text-sm font-semibold text-gray-400">
                Step {step} of 3
              </span>
            )}
          </div>

          {/* Progress Bar */}
          {step < 4 && (
            <div className="w-full h-1.5 bg-gray-100 rounded-full mb-8 overflow-hidden">
              <div 
                className="h-full bg-purple-600 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            
            {/* STEP 1: Rewards Priority */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 flex items-center">
                  <Gift className="w-8 h-8 mr-3 text-purple-600" /> What's your spending style?
                </h2>
                <p className="text-gray-500 mb-6 text-sm">Select the primary reward category you want to maximize.</p>

                <div className="space-y-3">
                  {[
                    { id: 'travel', label: 'Travel & Lounge Access', icon: Plane, desc: 'Frequent flights, hotel stays, and international markup' },
                    { id: 'cashback', label: 'Cashback & Utility Bills', icon: Zap, desc: 'Utility payments, online grocery, and mobile recharges' },
                    { id: 'shopping', label: 'Shopping & Dining discounts', icon: ShoppingBag, desc: 'E-commerce deals, dining privileges, and merchant cashback' },
                    { id: 'fuel', label: 'Fuel Surcharge Waivers', icon: Flame, desc: 'Daily vehicle commutes and fuel spending rewards' }
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => { setCategory(option.id); handleNext(); }}
                      className={`w-full p-4 text-left rounded-2xl border transition-all flex items-center space-x-4
                                  ${category === option.id 
                                    ? 'border-purple-600 bg-purple-50/50 shadow-md ring-1 ring-purple-600' 
                                    : 'border-gray-200 hover:border-purple-400 hover:bg-gray-50'}`}
                    >
                      <option.icon className="w-6 h-6 text-purple-600" />
                      <div>
                        <div className="font-bold text-gray-800 text-base">{option.label}</div>
                        <div className="text-xs text-gray-500">{option.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 2: Monthly Spend */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 flex items-center">
                  <IndianRupee className="w-8 h-8 mr-3 text-purple-600" /> Estimated Monthly Spend
                </h2>
                <p className="text-gray-500 mb-6 text-sm">Choose the bracket that closest represents your monthly credit transactions.</p>

                <div className="space-y-3">
                  {[
                    { id: 'low', label: 'Under ₹15,000', desc: 'Entry-level or LTF cards are generally the best value' },
                    { id: 'mid', label: '₹15,000 - ₹50,000', desc: 'Cashback and utility waiver cards yield maximum return' },
                    { id: 'high', label: 'Above ₹50,000', desc: 'Premium luxury cards with heavy milestone benefits' }
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => { setSpend(option.id); handleNext(); }}
                      className={`w-full p-4 text-left rounded-2xl border transition-all flex items-center space-x-4
                                  ${spend === option.id 
                                    ? 'border-purple-600 bg-purple-50/50 shadow-md ring-1 ring-purple-600' 
                                    : 'border-gray-200 hover:border-purple-400 hover:bg-gray-50'}`}
                    >
                      <IndianRupee className="w-6 h-6 text-purple-600" />
                      <div>
                        <div className="font-bold text-gray-800 text-base">{option.label}</div>
                        <div className="text-xs text-gray-500">{option.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 3: Income Bracket */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 flex items-center">
                  <Briefcase className="w-8 h-8 mr-3 text-purple-600" /> What's your employment type?
                </h2>
                <p className="text-gray-500 mb-6 text-sm">Helps us check matching bank eligibility criteria for faster approvals.</p>

                <div className="space-y-3">
                  {[
                    { id: 'salaried', label: 'Salaried Professional', desc: 'Receive a stable monthly salary check from an employer' },
                    { id: 'self-employed', label: 'Self-Employed / Business', desc: 'Business owner, freelancer, merchant, or independent consultant' }
                  ].map(option => (
                    <button
                      key={option.id}
                      onClick={() => { setIncome(option.id); handleNext(); }}
                      className={`w-full p-4 text-left rounded-2xl border transition-all flex items-center space-x-4
                                  ${income === option.id 
                                    ? 'border-purple-600 bg-purple-50/50 shadow-md ring-1 ring-purple-600' 
                                    : 'border-gray-200 hover:border-purple-400 hover:bg-gray-50'}`}
                    >
                      <Briefcase className="w-6 h-6 text-purple-600" />
                      <div>
                        <div className="font-bold text-gray-800 text-base">{option.label}</div>
                        <div className="text-xs text-gray-500">{option.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 4: Results */}
            {step === 4 && (
              <motion.div
                key="step4"
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-center"
              >
                <Sparkles className="w-12 h-12 text-yellow-500 mx-auto mb-4 animate-bounce" />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2">
                  Your Perfect Match Found!
                </h2>
                <p className="text-gray-500 mb-6 text-sm">Based on your spending profile, here is the highest-yielding card.</p>

                {/* Recommended Card Info Panel */}
                <div className="p-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-3xl shadow-xl text-left mb-6 border border-indigo-400">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-yellow-300 bg-yellow-400/20 px-2 py-0.5 rounded-full">
                      Match Rating: {matchedCard.rating} / 5
                    </span>
                    <span className="text-sm font-semibold">{matchedCard.bank}</span>
                  </div>
                  <h3 className="text-2xl font-extrabold mb-1">{matchedCard.name}</h3>
                  <p className="text-xs text-purple-200 mb-4">{matchedCard.fee}</p>
                  
                  <div className="h-px bg-white/20 mb-4" />
                  
                  <h4 className="font-bold text-sm text-yellow-300 mb-2 flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2" /> Top Benefits
                  </h4>
                  <ul className="space-y-2 mb-4">
                    {matchedCard.rewards.map((reward, i) => (
                      <li key={i} className="text-xs text-purple-100 leading-relaxed flex items-start">
                        <span className="mr-2 text-yellow-400">•</span>
                        <span>{reward}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <p className="text-xs text-purple-100 italic leading-relaxed">
                    {matchedCard.description}
                  </p>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleReset}
                    className="flex-1 border border-purple-600 text-purple-600 py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-purple-50 transition-colors"
                  >
                    <RefreshCcw className="w-5 h-5" />
                    <span>Restart</span>
                  </button>
                  {openApplyModal ? (
                    <button
                      onClick={() => openApplyModal(matchedCard.name)}
                      className="flex-1 bg-purple-600 text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-purple-700 transition-colors"
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Apply Online</span>
                    </button>
                  ) : (
                    <Link
                      to="/loan-apply"
                      className="flex-grow bg-purple-600 text-white py-3 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-purple-700 transition-colors"
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>Apply Online</span>
                    </Link>
                  )}
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* Footer Navigation Buttons */}
        {step < 4 && (
          <div className="flex justify-between items-center mt-8 border-t border-gray-100 pt-6">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="text-gray-500 hover:text-purple-600 font-semibold flex items-center space-x-1"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
            ) : (
              <div /> // Spacer
            )}
            
            {/* Skip Option / Info */}
            <div className="text-xs text-gray-400 flex items-center">
              <HelpCircle className="w-4 h-4 mr-1 text-gray-300" /> Safe & Secure
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
