import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Landmark, Sparkles, HelpCircle as HelpIcon } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';

const CibilScoreForPersonalLoanPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Can I get an instant Personal Loan with a CIBIL score of 600?",
      a: "Getting a personal loan with a CIBIL score of 600 from Tier-1 banks (like HDFC, ICICI, SBI) is highly unlikely due to strict risk policies. However, some Non-Banking Financial Companies (NBFCs) and digital lending apps do approve loans at 600, though they charge higher interest rates (up to 24%-36% p.a.) and verify income stabilities very strictly."
    },
    {
      q: "Why is CIBIL score so important for Personal Loans specifically?",
      a: "Personal loans are completely 'unsecured loans', meaning banks have no asset or collateral (like a house or car) to seize if you default. The CIBIL score is therefore the lender's primary gauge of risk. A high score proves that you have historically repaid loans on time, signaling low default risk."
    },
    {
      q: "How can I get a personal loan if I have a low CIBIL score?",
      a: "You can improve your approval chances by: 1) Applying with a co-applicant (like a spouse or parent) who has a high CIBIL score and stable income; 2) Demonstrating a very low Debt-to-Income (DTI) ratio; 3) Applying for a lower loan amount; or 4) Choosing secured alternatives like a Loan against Mutual Funds or Gold Loan."
    },
    {
      q: "What is the perfect CIBIL score for pre-approved personal loans?",
      a: "A CIBIL score of 780 and above, combined with a stable income and a clean banking history, generally triggers pre-approved paperless personal loan offers from top banks, which can be disbursed in as little as 10 seconds."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[200px] font-black leading-none select-none">LOAN</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              Retail Loan Guide
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight">
              CIBIL Score for Personal Loan
            </h1>
            <p className="text-amber-100 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl">
              Learn the critical credit score tiers required to secure unsecured personal loans with the best interest rate approvals.
            </p>
          </div>
        </div>

        {/* Grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Guide Intro */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-amber-600 rounded-full"></span>
                The Direct Link Between CIBIL and Unsecured Credits
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Unlike home or vehicle loans where lenders retain property collateral, **Personal Loans** are entirely unsecured. Since the lender takes on higher absolute risk, your **CIBIL score** acts as the definitive key. Lenders evaluate your report to determine if you are historically responsible with credit, and whether your debt load is manageable.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                A CIBIL score of **720+** is generally the gateway score to personal loan offers. A score above **750** grants you leverage to bargain for lower interest rates and processing fee waivers.
              </p>
            </div>

            {/* Matrix details */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Personal Loan Approval Metrics by Credit Score</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="p-3 font-semibold text-slate-700">CIBIL Score Slabs</th>
                      <th className="p-3 font-semibold text-slate-700">Interest Rates (p.a.)</th>
                      <th className="p-3 font-semibold text-slate-700">Approval Chances</th>
                      <th className="p-3 font-semibold text-slate-700">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-emerald-600">750 - 900</td>
                      <td className="p-3 font-semibold text-slate-800">10.49% - 13.99%</td>
                      <td className="p-3 font-medium text-emerald-700">95% (Prime Borrower)</td>
                      <td className="p-3 text-slate-500">Quick processing, minimal documentation</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-teal-600">700 - 749</td>
                      <td className="p-3 font-semibold text-slate-800">14.00% - 17.99%</td>
                      <td className="p-3 font-medium text-slate-700">75% (Likely Approval)</td>
                      <td className="p-3 text-slate-500">Moderate documentation required</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-amber-600">650 - 699</td>
                      <td className="p-3 font-semibold text-slate-800">18.00% - 24.00%</td>
                      <td className="p-3 font-medium text-amber-700">40% (Conditional)</td>
                      <td className="p-3 text-slate-500">Requires co-applicant or strong salary proof</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-rose-600">300 - 649</td>
                      <td className="p-3 font-semibold text-slate-800">&gt; 24% or Rejected</td>
                      <td className="p-3 font-medium text-rose-700">Very Low (&lt;10%)</td>
                      <td className="p-3 text-slate-500">Subject to high rejection rates</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Tips Box */}
            <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-amber-800 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Tips to get Unsecured Loans with Average Credit Scores
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
                <div className="flex gap-3">
                  <Landmark className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-800">Apply with your Salary Bank Account</strong>
                    Lenders show high leniency and offer better rates to customers who route their monthly paychecks directly through them.
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-base text-amber-600">👥</span>
                  <div>
                    <strong className="block text-slate-800">Add a Co-Borrower</strong>
                    Including a close family relative with excellent credit scores guarantees the loan repayment, reducing bank risk metrics.
                  </div>
                </div>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpIcon className="w-5 h-5 text-amber-600" />
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
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-amber-700' : ''}`} />
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
            <CibilCheckerForm sourcePage="Personal Loan CIBIL Landing Page" />
          </div>

        </div>

      </div>
    </div>
  );
};

export default CibilScoreForPersonalLoanPage;
