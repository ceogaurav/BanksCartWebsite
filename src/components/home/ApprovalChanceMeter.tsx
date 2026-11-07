import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface EligibilityAdvice {
  status: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  color: string;
  text: string;
  percentage: number;
  advice: string[];
}

interface ApprovalChanceMeterProps {
  openEligibilityModal?: (loanType?: string) => void;
}

export default function ApprovalChanceMeter({ openEligibilityModal }: ApprovalChanceMeterProps) {
  const [cibil, setCibil] = useState<number>(750);
  const [income, setIncome] = useState<number>(45000);
  const [empType, setEmpType] = useState<'salaried' | 'self-employed'>('salaried');

  const rating = useMemo<EligibilityAdvice>(() => {
    if (cibil >= 750) {
      if (income >= 50000) {
        return {
          status: 'Excellent',
          color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
          text: 'Excellent Approval Chance',
          percentage: 95,
          advice: [
            'Eligible for prime interest rates under 10.25% p.a.',
            'Instant pre-approval on premium credit cards',
            'Zero processing fee waivers available from select banks'
          ]
        };
      } else {
        return {
          status: 'Good',
          color: 'text-emerald-700 bg-emerald-50 border-emerald-200',
          text: 'Strong Approval Chance',
          percentage: 85,
          advice: [
            'Highly likely to qualify for standard personal loans',
            'Great eligibility on cashback & rewards credit cards',
            'Submit 3 months salary slips for fast paperless disbursal'
          ]
        };
      }
    } else if (cibil >= 650) {
      if (income >= 35000) {
        return {
          status: 'Good',
          color: 'text-blue-700 bg-blue-50 border-blue-200',
          text: 'Good Approval Chance',
          percentage: 75,
          advice: [
            'Eligible for major banks; compare processing fees closely',
            'Higher loan approval odds when applying with a co-borrower',
            'Maintain a credit card balance utilization below 30%'
          ]
        };
      } else {
        return {
          status: 'Fair',
          color: 'text-amber-800 bg-amber-50 border-amber-200',
          text: 'Moderate Approval Chance',
          percentage: 55,
          advice: [
            'Approval is likely with select NBFC partners',
            'Consider adding a co-applicant to lower interest rate',
            'Avoid making multiple simultaneous hard loan inquiries'
          ]
        };
      }
    } else if (cibil >= 550) {
      return {
        status: 'Fair',
        color: 'text-amber-800 bg-amber-50 border-amber-200',
        text: 'Moderate Approval Chance',
        percentage: 45,
        advice: [
          'NBFC pre-approval checks recommended',
          'Explore loan against property or gold loan alternatives',
          'Clear outstanding overdue payments to boost score quickly'
        ]
      };
    } else {
      return {
        status: 'Poor',
        color: 'text-red-700 bg-red-50 border-red-200',
        text: 'Subprime Risk Profile',
        percentage: 20,
        advice: [
          'Check your credit bureau report to file error disputes',
          'Apply for a fixed deposit backed secured credit card',
          'Utilize BanksCart credit rectification services'
        ]
      };
    }
  }, [cibil, income]);

  const needleRotation = ((cibil - 300) / 600) * 180 - 90;

  return (
    <section className="py-16 sm:py-20 bg-slate-50 font-ibm border-b border-slate-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-900" />
            <span>Underwriting Simulation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Check Your Approval Odds Before Inquiring
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Simulate how Indian banks evaluate your CIBIL score and monthly income tier. 100% soft inquiry with zero score impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* LEFT: Controls */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between shadow-2xs">
            <div>
              {/* Employment Type */}
              <div className="mb-7">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-2.5">
                  Employment Status
                </label>
                <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setEmpType('salaried')}
                    className={`py-2.5 px-4 rounded-lg border transition-all cursor-pointer ${
                      empType === 'salaried'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Salaried Employee
                  </button>
                  <button
                    type="button"
                    onClick={() => setEmpType('self-employed')}
                    className={`py-2.5 px-4 rounded-lg border transition-all cursor-pointer ${
                      empType === 'self-employed'
                        ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    Self-Employed / Business
                  </button>
                </div>
              </div>

              {/* Slider 1: CIBIL Score */}
              <div className="mb-7">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Estimated CIBIL Score
                  </span>
                  <span className="text-base sm:text-lg font-bold text-slate-900 tabular-nums bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded">
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
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900 focus:outline-none"
                  aria-label="CIBIL score slider"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-medium mt-1">
                  <span>300 (Poor)</span>
                  <span>650 (Fair)</span>
                  <span>750 (Prime)</span>
                  <span>900 (Excellent)</span>
                </div>
              </div>

              {/* Slider 2: Monthly Income */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Net Monthly Income
                  </span>
                  <span className="text-base sm:text-lg font-bold text-slate-900 tabular-nums bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded">
                    ₹{income.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="15000"
                  max="250000"
                  step="5000"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900 focus:outline-none"
                  aria-label="Monthly income slider"
                />
                <div className="flex justify-between text-[11px] text-slate-500 font-medium mt-1">
                  <span>₹15,000</span>
                  <span>₹50,000</span>
                  <span>₹1,50,000</span>
                  <span>₹2,50,000+</span>
                </div>
              </div>
            </div>

            {/* Footer notes */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                No Hard Bureau Inquiry
              </span>
              <span>Based on 30+ Lender Risk Models</span>
            </div>
          </div>

          {/* RIGHT: Visual Gauge Card */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl border border-slate-800 p-6 sm:p-7 flex flex-col justify-between items-center text-center">
            <div className="w-full">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded border inline-block mb-4 ${rating.color}`}>
                {rating.status} Profile
              </span>

              {/* SVG Gauge */}
              <div className="relative w-48 h-28 mx-auto mt-2 overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 100 50">
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="url(#gauge-gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="125"
                    strokeDashoffset={125 - (rating.percentage / 100) * 125}
                    className="transition-all duration-500 ease-out"
                  />
                  <defs>
                    <linearGradient id="gauge-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#dc2626" />
                      <stop offset="50%" stopColor="#d97706" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Animated Needle */}
                <motion.div
                  className="absolute bottom-0 left-1/2 w-1 h-14 bg-white origin-bottom -translate-x-1/2 rounded-full"
                  style={{ bottom: '-2px' }}
                  animate={{ rotate: needleRotation }}
                  transition={{ type: 'spring', stiffness: 70, damping: 14 }}
                />
                <div className="absolute bottom-0 left-1/2 w-3.5 h-3.5 bg-white border-2 border-slate-900 rounded-full -translate-x-1/2 translate-y-1/2 z-20" />
              </div>

              {/* Status Header */}
              <h3 className="text-xl font-bold tracking-tight mt-3 mb-1">
                {rating.text}
              </h3>
              <p className="text-xs text-slate-400 font-medium mb-5">
                Approval Probability: <span className="text-emerald-400 font-bold tabular-nums">{rating.percentage}%</span>
              </p>

              {/* Advice Box */}
              <div className="w-full p-4 rounded-lg bg-slate-800/80 border border-slate-700/80 text-left">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
                  Profile Guidance &amp; Insights
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {rating.advice.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct CTA */}
            <div className="w-full mt-6">
              <button
                type="button"
                onClick={() => openEligibilityModal ? openEligibilityModal('Personal Loan') : null}
                className="w-full py-3 px-4 bg-amber-700 hover:bg-amber-800 text-white rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <span>Verify Your Real Pre-Approved Offers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
