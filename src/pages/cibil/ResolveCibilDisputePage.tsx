import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Check, AlertOctagon, HelpCircle as HelpIcon } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';

const ResolveCibilDisputePage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What types of errors can be disputed in a CIBIL report?",
      a: "You can raise disputes for: 1) Personal details errors (incorrect name, PAN number, gender, date of birth); 2) Duplicate account errors; 3) Balance or ownership errors (active loans that you never took, or loans showing outstanding despite full payoffs); 4) Payment status errors (incorrectly reported delay flags)."
    },
    {
      q: "How long does it take for CIBIL to resolve a raised dispute?",
      a: "Under RBI guidelines, credit bureaus must resolve disputes and update records within **30 days** of filing. CIBIL contacts the respective bank to verify the data, and updates your profile once the bank sends the corrected confirmation."
    },
    {
      q: "Can I dispute my CIBIL score directly with BanksCart?",
      a: "No. BanksCart compiles and fetches your credit report from official licensed bureaus. We do not edit or own your credit records. To resolve errors, you must raise a formal dispute on TransUnion CIBIL's official online portal or contact the lending bank directly."
    },
    {
      q: "Does filing a dispute cost any money?",
      a: "No. Raising a dispute online with TransUnion CIBIL or other credit bureaus is completely free of charge. You do not need to pay any brokers or third-party advisors."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-rose-700 via-pink-700 to-rose-800 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[200px] font-black leading-none select-none">RESOLVE</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              Dispute Filing Guide
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight">
              How to Resolve CIBIL Dispute
            </h1>
            <p className="text-rose-100 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl">
              Learn the exact steps to rectify incorrect bank data, wipe out false delay marks, and restore your credit ranking.
            </p>
          </div>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Guide intro */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-rose-600 rounded-full"></span>
                Rectify Report Errors to Safeguard Your Score
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Occasionally, due to manual bank entries or technical bugs, lenders submit wrong data to credit bureaus. When an account you have already paid off continues to show outstanding dues or late flags, your CIBIL score tanks.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                By proactively raising a **CIBIL dispute**, you instruct the bureau to verify the discrepancy with the lender. Once verified, the entry is deleted or updated, resulting in an immediate boost to your credit score.
              </p>
            </div>

            {/* How to raise a dispute - Step by Step */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Step-by-Step Guide: Filing an Online CIBIL Dispute</h3>
              <div className="space-y-6">
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Download your CIBIL Report</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      First, check your report on BanksCart to identify the exact error. Note down the unique 9-digit **Control Number** printed on the top of the report.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Visit CIBIL's Official Dispute Portal</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Navigate to CIBIL's official online dispute registration section (`cibil.com/online-dispute-resolution`). Log in using your credentials.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Raise Discrepancy details</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Select the specific account or personal data field displaying error records. Input the correct figures and upload supporting documents (like payment receipts or bank NOC certificates).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Await Resolution (30 Days)</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      The bureau checks details with the reporting bank. Under RBI rules, you will receive an SMS confirmation showing resolution or updates within 30 days.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Warnings Alert Box */}
            <div className="bg-rose-50/50 rounded-2xl border border-rose-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-rose-800 mb-3 flex items-center gap-2">
                <AlertOctagon className="w-5 h-5 text-rose-600" />
                Caution: What you CANNOT dispute
              </h3>
              <p className="text-sm text-rose-700 leading-relaxed mb-4">
                Be aware that disputes can only resolve genuine factual errors or duplicate reporting glitches. You **cannot** dispute:
              </p>
              <ul className="space-y-2 text-xs text-rose-800 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-600 rounded-full"></span>
                  Genuine delayed payments caused by actual delays on your part.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-600 rounded-full"></span>
                  Legitimate inquiries conducted by lenders when you applied for products.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-600 rounded-full"></span>
                  Your actual outstanding loan amounts or credit card limits.
                </li>
              </ul>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpIcon className="w-5 h-5 text-rose-600" />
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
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-rose-700' : ''}`} />
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
            <CibilCheckerForm sourcePage="Resolve Dispute CIBIL Landing Page" />
          </div>

        </div>

      </div>
    </div>
  );
};

export default ResolveCibilDisputePage;
