import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Sparkles, TrendingUp, AlertCircle, HelpCircle } from 'lucide-react';

interface EligibilityAdvice {
  status: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  color: string;
  text: string;
  percentage: number;
  advice: string[];
}

export default function ApprovalChanceMeter() {
  const [cibil, setCibil] = useState<number>(750);
  const [income, setIncome] = useState<number>(45000);
  const [empType, setEmpType] = useState<'salaried' | 'self-employed'>('salaried');

  const rating = useMemo<EligibilityAdvice>(() => {
    // Basic calculator rules simulating lender risk model
    if (cibil >= 750) {
      if (income >= 50000) {
        return {
          status: 'Excellent',
          color: 'from-emerald-500 to-teal-600',
          text: 'Excellent Approval Chance',
          percentage: 95,
          advice: [
            'Eligible for prime interest rates under 10.25% p.a.',
            'Instant approval check on premium co-branded credit cards',
            'Zero processing fee waivers on selected home loans'
          ]
        };
      } else {
        return {
          status: 'Good',
          color: 'from-green-400 to-emerald-500',
          text: 'Strong Approval Chance',
          percentage: 85,
          advice: [
            'Highly likely to qualify for standard personal loans',
            'Great eligibility on cashback credit cards',
            'Submit 3 months salary slips for instant disbursal'
          ]
        };
      }
    } else if (cibil >= 650) {
      if (income >= 35000) {
        return {
          status: 'Good',
          color: 'from-green-400 to-emerald-500',
          text: 'Good Approval Chance',
          percentage: 75,
          advice: [
            'Eligible for major banks; compare processing fees closely',
            'Strong qualification odds with joint-borrower options',
            'Maintain a low credit card utilization below 30%'
          ]
        };
      } else {
        return {
          status: 'Fair',
          color: 'from-amber-400 to-orange-500',
          text: 'Moderate Approval Chance',
          percentage: 55,
          advice: [
            'Approval is likely with select NBFC partners',
            'Consider adding a co-applicant to lower interest rate',
            'Avoid making multiple simultaneous loan inquiries'
          ]
        };
      }
    } else if (cibil >= 550) {
      return {
        status: 'Fair',
        color: 'from-amber-400 to-orange-500',
        text: 'Moderate Approval Chance',
        percentage: 45,
        advice: [
          'NBFC pre-approval checks recommended',
          'Explore loan against property or gold loan alternatives',
          'Avoid delayed credit card payments to boost score fast'
        ]
      };
    } else {
      return {
        status: 'Poor',
        color: 'from-rose-500 to-red-600',
        text: 'High Risk Profile',
        percentage: 20,
        advice: [
          'We recommend checking credit dispute records for errors',
          'Apply for a secured credit card to begin credit building',
          'Subscribe to Credit Health Pro to raise CIBIL fast'
        ]
      };
    }
  }, [cibil, income]);

  // Calculate needle rotation degrees for half circle (-90 to +90 deg)
  const needleRotation = ((cibil - 300) / 600) * 180 - 90;

  return (
    <section className="py-16 bg-gradient-to-b from-slate-50 to-slate-100/50 font-inter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-xs font-bold uppercase tracking-wider text-blue-600 mb-3">
            <ShieldCheck className="w-4 h-4 text-blue-600 animate-pulse" /> Live Approval Simulator
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Check Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Chance of Approval</span> Instantly
          </h2>
          <p className="text-base text-slate-500">
            See which loan and credit card tiers you qualify for before submitting an official inquiry. Zero credit score impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Sliders & Controls */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-150 p-6 sm:p-8 shadow-xl shadow-slate-100 flex flex-col justify-between">
            <div>
              {/* Emp Type Select */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
                  Employment Status
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setEmpType('salaried')}
                    className={`py-3 px-4 rounded-xl font-bold transition-all border text-sm flex items-center justify-center space-x-2
                      ${empType === 'salaried'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100 ring-2 ring-blue-600/20'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-400 hover:bg-white'}`}
                  >
                    Salaried Employee
                  </button>
                  <button
                    onClick={() => setEmpType('self-employed')}
                    className={`py-3 px-4 rounded-xl font-bold transition-all border text-sm flex items-center justify-center space-x-2
                      ${empType === 'self-employed'
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-100 ring-2 ring-blue-600/20'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-blue-400 hover:bg-white'}`}
                  >
                    Self-Employed / Business
                  </button>
                </div>
              </div>

              {/* Slider 1: CIBIL Score */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                    CIBIL Credit Score
                  </span>
                  <span className="text-2xl font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-xl">
                    {cibil}
                  </span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="900"
                  step="5"
                  value={cibil}
                  onChange={(e) => setCibil(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
                />
                <div className="flex justify-between text-xs text-slate-400 font-semibold mt-2">
                  <span>300 (Poor)</span>
                  <span>650 (Average)</span>
                  <span>750 (Good)</span>
                  <span>900 (Excellent)</span>
                </div>
              </div>

              {/* Slider 2: Monthly Income */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                    Net Monthly Income (INR)
                  </span>
                  <span className="text-2xl font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-xl">
                    ₹{income.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="200000"
                  step="5000"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-none"
                />
                <div className="flex justify-between text-xs text-slate-400 font-semibold mt-2">
                  <span>₹10,000</span>
                  <span>₹50,000</span>
                  <span>₹1,000,000</span>
                  <span>₹2,00,000+</span>
                </div>
              </div>
            </div>

            {/* Simulated Live Match stats */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-slate-500 text-xs sm:text-sm font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                Live Lender Match Rate: <strong className="text-slate-800">42 active NBFCs</strong>
              </span>
              <span className="text-blue-600 font-bold hover:underline cursor-pointer flex items-center">
                Detailed Terms <HelpCircle className="w-4 h-4 ml-1" />
              </span>
            </div>
          </div>

          {/* RIGHT: Visual Gauge and Matching insights */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Visual Gauge Card */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden flex-1 flex flex-col justify-between items-center text-center">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl" />

              <div className="w-full">
                <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-full mb-6 inline-block">
                  Live Eligibility Estimation
                </span>

                {/* SVG Gauge */}
                <div className="relative w-48 h-28 mx-auto mt-4 overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 100 50">
                    {/* Background Track */}
                    <path
                      d="M 10 50 A 40 40 0 0 1 90 50"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    {/* Color Arc representation */}
                    <path
                      d="M 10 50 A 40 40 0 0 1 90 50"
                      fill="none"
                      stroke="url(#gauge-gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="125"
                      strokeDashoffset={125 - (rating.percentage / 100) * 125}
                      className="transition-all duration-700 ease-out"
                    />
                    <defs>
                      <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* SVG Animated Center Pin */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 w-1.5 h-16 bg-white origin-bottom -translate-x-1/2 rounded-full"
                    style={{ bottom: '-4px' }}
                    animate={{ rotate: needleRotation }}
                    transition={{ type: 'spring', stiffness: 60, damping: 12 }}
                  />
                  <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-white border-2 border-slate-900 rounded-full -translate-x-1/2 translate-y-1/2 z-20" />
                </div>

                {/* Status Text */}
                <h3 className="text-xl sm:text-2xl font-black tracking-wide mt-4 mb-1">
                  {rating.text}
                </h3>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-6">
                  Calculated Approval Probability: <span className="text-emerald-400 font-bold">{rating.percentage}%</span>
                </p>
              </div>

              {/* Dynamic recommendation box */}
              <div className="w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-left">
                <h4 className="text-yellow-400 font-bold text-sm mb-2 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" /> Match Advice & Tips:
                </h4>
                <ul className="space-y-2">
                  {rating.advice.map((item, i) => (
                    <li key={i} className="text-xs text-slate-200 leading-relaxed flex items-start">
                      <span className="text-emerald-400 mr-2 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
