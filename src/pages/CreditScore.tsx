import React from 'react';
import { ShieldCheck, Flame, TrendingUp, Sparkles } from 'lucide-react';
import CibilCheckerForm from '../components/common/CibilCheckerForm';

const CreditScore: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 text-xs text-blue-700 font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Official Credit Bureau Integration
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight leading-tight">
            Check Your Free <span className="text-blue-600">CIBIL & Credit Score</span> Online
          </h1>
          <p className="text-base sm:text-lg text-slate-500 mt-4 leading-relaxed">
            Get an exhaustive credit analysis report directly from CIBIL and Experian. Free lifetime tracking with monthly automated score refreshes.
          </p>
        </div>

        {/* Dynamic Split Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start max-w-6xl mx-auto">
          {/* Left Column: Visual Highlights */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-slate-100 shadow-md rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                Why check your score on BanksCart?
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">100% Secure & Private</h3>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Your details are encrypted and safe. We never share your credit logs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Zero Score Impact</h3>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Checks performed are classified as "soft pulls" and do not drop your rating.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Monthly Auto Refreshes</h3>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Score is updated every month so you can track improvements in real-time.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-base">🎁</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Custom Pre-Approved Offers</h3>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Get matched with tailored loan options based on your score bracket.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Visual Credit Score Brackets info */}
            <div className="bg-white border border-slate-100 shadow-md rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Understanding Your CIBIL Score Ranges</h3>
              <div className="space-y-3.5">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-emerald-600 uppercase tracking-wide">Excellent (750 - 900)</span>
                    <span className="text-slate-500">Super fast approvals & lowest interest rates</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-teal-600 uppercase tracking-wide">Good (700 - 749)</span>
                    <span className="text-slate-500">Very likely approval for most credit cards & loans</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-teal-500 h-full rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-amber-600 uppercase tracking-wide">Fair (650 - 699)</span>
                    <span className="text-slate-500">Moderate interest rates; approvals require collateral/proofs</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: '60%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-rose-600 uppercase tracking-wide">Poor (300 - 649)</span>
                    <span className="text-slate-500">Difficult to get approvals; high rate of rejection</span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: '35%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Reusable Interactive Checker Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <CibilCheckerForm sourcePage="Credit Score Page" />
          </div>
        
        {/* Additional Credit Bureau Recovery & Diagnostic Services */}
        <div className="mt-12 max-w-6xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm">
            <div className="max-w-2xl mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
                Specialized Credit Bureau Diagnostic & Recovery Services
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
                Struggling with low scores or incorrect bureau entries? Take action with verified credit health audits and dispute handling.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl border border-blue-100 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-300 transition-all block">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Dispute & Recovery</span>
                  <span className="text-blue-600 text-xs font-semibold">&rarr;</span>
                </div>
                <h3 className="font-bold text-slate-800 text-base mb-1">
                  Credit Rectification Service
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Identify inaccuracies, wrongful default remarks, or identity mismatch errors in your credit file. Work with specialized grievance officers to file formal dispute petitions and access <a href="/credit-score/credit-rectification-service" className="text-blue-600 font-bold underline hover:text-blue-800">professional credit score rectification</a>.
                </p>
                <a
                  href="/credit-score/credit-rectification-service"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 underline inline-flex items-center"
                >
                  professional credit score rectification &rarr;
                </a>
              </div>

              <div className="p-5 rounded-xl border border-indigo-100 bg-indigo-50/50 hover:bg-indigo-50 hover:border-indigo-300 transition-all block">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wider">In-Depth Audit</span>
                  <span className="text-indigo-600 text-xs font-semibold">&rarr;</span>
                </div>
                <h3 className="font-bold text-slate-800 text-base mb-1">
                  Credit Health Report Services
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Detailed 360-degree review of your active trade lines, repayment history, FOIR ratios, and credit exposure. Access your <a href="/credit-health-report-services" className="text-indigo-600 font-bold underline hover:text-indigo-800">detailed credit health report</a> with custom action plans to reach a 750+ score.
                </p>
                <a
                  href="/credit-health-report-services"
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 underline inline-flex items-center"
                >
                  detailed credit health report &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default CreditScore;
