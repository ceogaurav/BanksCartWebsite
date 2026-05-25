import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Landmark, Sparkles, HelpCircle as HelpIcon, Landmark as BankIcon, BarChart2 } from 'lucide-react';
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
    },
    {
      q: "Does a high salary compensate for a poor CIBIL score?",
      a: "No. A high salary only proves your 'capacity to pay' (affordability), but a poor CIBIL score indicates a low 'intention to pay' (unreliable payment behavior). Lenders prioritize intention over capacity, which is why even high-earning individuals get rejected if they have score defaults."
    },
    {
      q: "What is the Debt-to-Income (DTI) ratio and how does it affect approvals?",
      a: "The DTI ratio measures your total monthly EMI obligations compared to your net monthly income (e.g., paying ₹25,000 EMI on a ₹50,000 salary equals a 50% DTI). Lenders prefer a DTI strictly below 45%-50% for personal loans. A high DTI indicates over-leverage and triggers rejection, even with a 750 CIBIL score."
    },
    {
      q: "Are pre-approved personal loans guaranteed to get disbursed?",
      a: "No. Pre-approved loans are tentative offers based on a soft-credit check. The final approval and disbursement occur only after the bank validates your KYC documents, salary statements, and performs a final hard inquiry check on your credit bureau profile."
    },
    {
      q: "Does my employer's corporate category affect personal loan approvals?",
      a: "Yes. Banks classify employers into categories (Tier-1/Super-A, Tier-2/Category-B, Tier-3). Salaried individuals working for Tier-1 companies (like Fortune 500 or major MNCs) represent lowest job risk, which qualifies them for faster approvals and lower interest rates."
    },
    {
      q: "Can I get a personal loan if I have an NH/-1 CIBIL score?",
      a: "Yes. If you have no credit history (NH/-1), banks look at bank statements, salary account longevity, and employer tier rankings. Interest rates will likely be standard, and they may require a minimum net monthly salary of ₹25,000-₹30,000."
    },
    {
      q: "How does a previous loan write-off label impact personal loan eligibility?",
      a: "A 'Written-off' or 'Settled' label represents unpaid defaults and is a major warning flag. For personal loans, Tier-1 banks will reject your application instantly. Your only options will be high-interest micro-lending apps or NBFCs until you clear those records."
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
          <div className="lg:col-span-7 space-y-10 text-slate-700">
            
            {/* Guide Intro */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-amber-600 rounded-full"></span>
                The Direct Link Between CIBIL and Unsecured Credits
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Unlike home or vehicle loans where lenders retain property collateral, **Personal Loans** are entirely unsecured. Since the lender takes on higher absolute risk, your **CIBIL score** acts as the definitive key. Lenders evaluate your report to determine if you are historically responsible with credit, and whether your debt load is manageable.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                A CIBIL score of **720+** is generally the gateway score to personal loan offers. A score above **750** grants you leverage to bargain for lower interest rates and processing fee waivers. When you apply, the underwriting engine queries your payment logs, credit mixes, and active revolving card balances to decide your ultimate risk grade.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                If your score is average or poor, lenders will classify you as a high-risk borrower. This results in loan rejections, or high interest rates (up to 24%-36% p.a.) coupled with steep administrative charges.
              </p>
            </div>

            {/* Matrix details */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-amber-600" />
                Personal Loan Approval Metrics by Credit Score
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Here is a detailed breakdown of loan eligibility, expected interest bands, and documentation rigor across credit tiers:
              </p>
              <div className="overflow-x-auto mt-4">
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
                      <td className="p-3 text-slate-500">Standard documentation required</td>
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

            {/* Other Vital Underwriting Criteria */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-amber-600" />
                Additional Factors Lenders Check Beyond CIBIL
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                While a high CIBIL score is crucial, banks also analyze the following underwriting criteria before finalizing personal loans:
              </p>
              <div className="space-y-4 mt-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                    A
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Employer Classification</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Banks categorize companies into Super-A, Category-A, Category-B, and others. Employees of top multinational corporations or government services enjoy lowest risk margins, yielding lower interest rates.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                    B
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Debt-to-Income (DTI) Ratio</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Measures your total monthly EMI components against your net take-home salary. Lenders prefer DTI ratios strictly below 45%-50% to ensure you are not over-leveraged.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-600 flex items-center justify-center flex-shrink-0 font-bold text-xs">
                    C
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Employment Stability</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Most lenders require a minimum of 2 years of overall work experience, with at least 6 months to 1 year of continuous service with your current employer.
                    </p>
                  </div>
                </div>
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
