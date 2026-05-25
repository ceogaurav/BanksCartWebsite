import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';

const CibilCreditReportPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is a CIBIL Credit Report?",
      a: "A CIBIL Credit Report is a comprehensive record of your financial history, compiled by TransUnion CIBIL. It tracks your credit card accounts, loans, payment history, outstanding balances, and credit inquiries over a rolling 36-month period. Lenders use this report to determine your creditworthiness before approval."
    },
    {
      q: "How often is my credit report updated?",
      a: "Bureaus usually update your credit report every 30 to 45 days. Banks and financial institutions submit account details to credit bureaus at the end of each month, which takes some processing time to reflect in your report."
    },
    {
      q: "What is the difference between CIBIL score and Experian score?",
      a: "CIBIL and Experian are separate licensed credit information companies in India. While they compile similar history, they use different proprietary scoring models and algorithms. CIBIL scores range from 300 to 900, as do Experian scores, but a minor variation of 10-30 points between reports is normal and acceptable."
    },
    {
      q: "Does checking my CIBIL report reduce my score?",
      a: "No. Checking your own CIBIL report on authorized websites like BanksCart is classified as a 'Soft Inquiry'. Soft inquiries have absolutely zero impact on your credit score, regardless of how many times you check. In contrast, bank-initiated searches during application are 'Hard Inquiries' and can affect scores."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[200px] font-black leading-none select-none">CIBIL</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              Free Bureau Access
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight">
              CIBIL Credit Report Online
            </h1>
            <p className="text-blue-100 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl">
              Download your complete credit bureau history. Spot payment delays, active loan counts, credit utilization ratios, and get custom analytics to improve your credit health.
            </p>
          </div>
        </div>

        {/* 2-Column Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Rich SEO Guide Content */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Guide Introduction */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                What is a Credit Report & Why is it Critical?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                A **CIBIL Credit Report** is essentially your financial report card. It is a consolidated report containing credit history sourced from over 5,000+ banks, credit card providers, and non-banking financial companies (NBFCs) operating across India.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Whenever you apply for a credit card, personal loan, car loan, or home loan, the lender immediately contacts credit bureaus to request your credit report. A high score (typically 750 or above) assures the bank that you have a disciplined repayment record, leading to faster approvals, lower interest rates, and higher loan limits.
              </p>
            </div>

            {/* Comprehensive Table Matrix */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">How Credit Score Brackets Define Your Loan Approval Chances</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="p-3 font-semibold text-slate-700">CIBIL Score</th>
                      <th className="p-3 font-semibold text-slate-700">Grade Rating</th>
                      <th className="p-3 font-semibold text-slate-700">Approval Likelihood</th>
                      <th className="p-3 font-semibold text-slate-700">Impact on Interest Rates</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-emerald-600">750 - 900</td>
                      <td className="p-3"><span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-medium text-xs">Excellent</span></td>
                      <td className="p-3 font-medium text-slate-700">95% (Instant Approval)</td>
                      <td className="p-3 text-slate-500">Lowest rate packages available</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-teal-600">700 - 749</td>
                      <td className="p-3"><span className="bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-medium text-xs">Good</span></td>
                      <td className="p-3 font-medium text-slate-700">80% Approval Chance</td>
                      <td className="p-3 text-slate-500">Standard market interest rates</td>
                    </tr>
                    <tr className="border-b border-slate-100 hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-amber-600">650 - 699</td>
                      <td className="p-3"><span className="bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-medium text-xs">Average</span></td>
                      <td className="p-3 font-medium text-slate-700">50% Approval Chance</td>
                      <td className="p-3 text-slate-500">Higher interest rates; extra collateral required</td>
                    </tr>
                    <tr className="hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-rose-600">300 - 649</td>
                      <td className="p-3"><span className="bg-rose-50 text-rose-700 px-2 py-0.5 rounded font-medium text-xs">Poor</span></td>
                      <td className="p-3 font-medium text-slate-700">Very Low (&lt;10% approval)</td>
                      <td className="p-3 text-slate-500">Highly prone to loan rejection</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Key factors influencing CIBIL score */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Key Components Found inside your CIBIL Report</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                <div className="border border-slate-100 rounded-xl p-4 flex gap-3 hover:border-blue-100 transition-colors">
                  <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Payment History (35%)</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Tracks if you pay bills on time. A single payment delay can drag your rating down significantly.
                    </p>
                  </div>
                </div>

                <div className="border border-slate-100 rounded-xl p-4 flex gap-3 hover:border-blue-100 transition-colors">
                  <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Credit Utilization Ratio (30%)</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Measures how much credit limit you consume. Maintain utilization strictly below 30%.
                    </p>
                  </div>
                </div>

                <div className="border border-slate-100 rounded-xl p-4 flex gap-3 hover:border-blue-100 transition-colors">
                  <div className="w-8 h-8 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Star className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Credit Age & Mix (25%)</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      A healthy mix of secured loans (home/car) and unsecured loans (credit cards) increases trust.
                    </p>
                  </div>
                </div>

                <div className="border border-slate-100 rounded-xl p-4 flex gap-3 hover:border-blue-100 transition-colors">
                  <div className="w-8 h-8 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Recent Hard Inquiries (10%)</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Too many simultaneous loan applications imply desperation, dropping your score.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Detailed Accordion FAQ Section */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
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
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-blue-600' : ''}`} />
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

          {/* Right Column: Sticky Bureau Check Form Widget */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <CibilCheckerForm sourcePage="CIBIL Credit Report Landing Page" />
          </div>

        </div>

      </div>
    </div>
  );
};

export default CibilCreditReportPage;
