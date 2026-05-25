import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckSquare, XCircle, ArrowUpRight } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';

const WaysToImproveCibilPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How long does it take to rebuild or improve my CIBIL score?",
      a: "Rebuilding a credit score is a gradual process. Generally, it takes between 3 to 6 months of disciplined credit behaviors (paying all bills on time, maintaining low card usage, avoiding hard inquiries) to see a significant, positive shift in your CIBIL rating."
    },
    {
      q: "Can a completely zeroed out score be jumped to 750 directly?",
      a: "If you have a 'No History' (-1) profile, you have a blank slate. You can build a 750+ score relatively fast (within 4-5 months) by opening a secured Credit Card against a Fixed Deposit, using it for minor monthly purchases, and clearing the dues before the due date."
    },
    {
      q: "Should I close my older credit cards to improve my score?",
      a: "Absolutely not. Closing older credit cards shortens your active credit history length and reduces your cumulative credit limit. Keeping older accounts active, even with zero balances, increases your credit age average and signals stability to lenders, boosting your score."
    },
    {
      q: "Does paying off settled accounts raise CIBIL scores?",
      a: "Yes. An account marked as 'Settled' or 'Written Off' is a major red flag on your report. Approaching the respective lender, paying the remaining write-off dues, and obtaining a 'No Dues Certificate' allows the bank to update the status to 'Closed/Paid', gradually rising your credit score."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-800 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[200px] font-black leading-none select-none">BOOST</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              Optimization Playbook
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight">
              Ways to Improve CIBIL Score
            </h1>
            <p className="text-violet-100 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl">
              Equip yourself with a highly structured, 6-step blueprint designed to recover and build your credit profile back to prime slabs.
            </p>
          </div>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Introductory block */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-purple-600 rounded-full"></span>
                The Foundation of Credit Score Recovery
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Improving an average or poor credit score requires structural financial discipline rather than immediate fixes. Credit bureaus calculate scores based on cumulative repayment algorithms. When you demonstrate stable, consistent, and low-risk credit behaviors, the scoring engine adjusts your rating upward.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whether your score took a hit due to previous payment defaults, excessive credit usage, or unresolved errors, following these core practices will optimize your score and help you achieve the coveted 750+ mark.
              </p>
            </div>

            {/* Dos and Don'ts comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* DOs Card */}
              <div className="bg-white border border-emerald-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-emerald-800 mb-4 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                  What to Do (Score Boosters)
                </h3>
                <ul className="space-y-4 text-xs sm:text-sm text-slate-600 font-medium">
                  <li className="flex gap-2">
                    <span className="text-emerald-500 font-semibold">✔</span>
                    <div>
                      <strong className="text-slate-800 block">Maintain &lt;30% Credit Usage</strong>
                      Keep monthly card spending strictly below 30% of your maximum credit limits.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500 font-semibold">✔</span>
                    <div>
                      <strong className="text-slate-800 block">Set Auto-Debits for Bills</strong>
                      Ensure you never miss EMI due dates by configuring automatic standing instructions.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500 font-semibold">✔</span>
                    <div>
                      <strong className="text-slate-800 block">Report Errors Promptly</strong>
                      Audit reports monthly to clear incorrect delayed flags via bureau disputes.
                    </div>
                  </li>
                </ul>
              </div>

              {/* DONTs Card */}
              <div className="bg-white border border-rose-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-bold text-rose-800 mb-4 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  What to Avoid (Score Killers)
                </h3>
                <ul className="space-y-4 text-xs sm:text-sm text-slate-600 font-medium">
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-semibold">✖</span>
                    <div>
                      <strong className="text-slate-800 block">Avoid Loan Spams</strong>
                      Never apply for cards/loans with multiple lenders simultaneously (creates hard inquiry spikes).
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-semibold">✖</span>
                    <div>
                      <strong className="text-slate-800 block">Don't Settle Accounts</strong>
                      Avoid accepting 'settlement' offers from banks. Settle in full to obtain a 'Closed' status.
                    </div>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-rose-500 font-semibold">✖</span>
                    <div>
                      <strong className="text-slate-800 block">Closing Older Accounts</strong>
                      Closing active older credit cards truncates your credit history length.
                    </div>
                  </li>
                </ul>
              </div>

            </div>

            {/* Quick Action Plan */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-purple-600" />
                The Secure Way to Build Score: Secured Credit Cards
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                If your score is currently below 600 or you have zero credit history, standard credit cards will likely be rejected. The single most effective path is securing a **Fixed Deposit Credit Card (FD Card)**:
              </p>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs sm:text-sm text-slate-600 space-y-2">
                <p>1. Open a Fixed Deposit (FD) starting from ₹10,000 with a premier bank.</p>
                <p>2. Get an instant, pre-approved credit card with a limit of 80% to 90% of your FD amount.</p>
                <p>3. Use this card to make minor payments (groceries, utilities) and pay the bills in full monthly.</p>
                <p>4. Banks report these consistent payments to CIBIL, establishing an excellent credit score within months.</p>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-purple-600" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-slate-100 rounded-xl overflow-hidden transition-colors">
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full flex justify-between items-center p-4 bg-slate-50/50 hover:bg-slate-50 text-left font-bold text-slate-700 text-sm outline-none transition-colors"
                    >
                      {faq.q}
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-purple-700' : ''}`} />
                    </button>
                    {activeFaq === index && (
                      <div className="p-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-white leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <CibilCheckerForm sourcePage="Ways to Improve CIBIL Landing Page" />
          </div>

        </div>

      </div>
    </div>
  );
};

export default WaysToImproveCibilPage;
