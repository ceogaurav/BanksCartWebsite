import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert, Sparkles, BookOpen, AlertCircle, Info } from 'lucide-react';
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
    },
    {
      q: "What does 'Settled' status mean in a credit report?",
      a: "A 'Settled' status in your CIBIL report indicates that you and the lender reached a mutual agreement where the lender accepted an amount lower than the actual outstanding due to your inability to pay. While the account is closed, a 'Settled' label remains a major red flag on your report for up to 7 years, dropping approval chances for future retail loans."
    },
    {
      q: "How does a co-applicant's bad CIBIL score affect my loan application?",
      a: "In joint loan applications, lenders evaluate the creditworthiness of both applicants. If your co-applicant has a poor CIBIL score, the loan will likely be rejected or attract higher interest rates, even if your individual CIBIL score is excellent (e.g., above 780)."
    },
    {
      q: "Does opening multiple credit cards lower my CIBIL score?",
      a: "Yes. Every time you submit an application for a credit card, the issuing bank requests your credit report from the bureau, generating a 'Hard Inquiry'. Opening multiple cards in a short period triggers multiple hard inquiries, signaling credit hunger and high credit risk, which drops your score."
    },
    {
      q: "How can I check my credit history if I have never taken a loan or credit card?",
      a: "If you have never utilized any credit products, your CIBIL score will show as '-1' or 'NH' (No History). This is a clean slate and is not a negative rating. To build a credit history, you can start by getting a credit card against a Fixed Deposit (FD) or taking a minor consumer durable loan."
    },
    {
      q: "What is the Credit Utilization Ratio (CUR) and why is it important?",
      a: "The Credit Utilization Ratio (CUR) measures the amount of revolving credit you consume compared to your total available credit limit (e.g., spending ₹30,000 on a card with a ₹1,00,000 limit equals a 30% CUR). Keeping your CUR strictly below 30% indicates low credit dependence and directly boosts your score."
    },
    {
      q: "Can a closed loan account continue to show as active in my report?",
      a: "Yes. This occurs due to administrative reporting delays between the lender and the credit bureau. If you closed a loan but it still appears active, you should procure a 'No Dues Certificate' (NOC) from the bank and file an online CIBIL dispute to get your record corrected."
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
          <div className="lg:col-span-7 space-y-10 text-slate-700">
            
            {/* Guide Introduction */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                What is a Credit Report & Why is it Critical?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                A **CIBIL Credit Report** is essentially your financial report card. It is a consolidated report containing credit history sourced from over 5,000+ banks, credit card providers, and non-banking financial companies (NBFCs) operating across India. This report serves as a detailed record of your borrowing and repayment habits, and is compiled by TransUnion CIBIL, the country's pioneer credit information bureau licensed by the Reserve Bank of India (RBI).
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Whenever you apply for a credit card, personal loan, car loan, or home loan, the lender immediately contacts credit bureaus to request your credit report. A high score (typically 750 or above) assures the bank that you have a disciplined repayment record, leading to faster approvals, lower interest rates, and higher loan limits. On the other hand, a low score indicates a higher default risk, which could lead to loan rejections or exorbitant interest rate markups.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Regularly monitoring your CIBIL report is crucial for maintaining a healthy financial profile. It allows you to check for errors reported by banks, detect identity theft (such as loans opened in your name without authorization), and take corrective measures to rebuild your credit rating.
              </p>
            </div>

            {/* In-Depth: Credit Bureau Types in India */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Understanding Credit Information Bureaus in India
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Many consumers use the term "CIBIL Score" and "Credit Score" interchangeably. However, CIBIL is just one of the licensed credit bureaus operating in India. There are four major credit information companies authorized by the RBI:
              </p>
              <div className="space-y-4 mt-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-bold text-slate-800 text-sm">1. TransUnion CIBIL</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Established in 2000, TransUnion CIBIL is the oldest and most widely used credit bureau in India. Banks and housing finance companies rely heavily on CIBIL reports for retail credit underwriting.
                  </p>
                </div>
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-bold text-slate-800 text-sm">2. Experian</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Experian is a global credit information company with a significant footprint in India. Lenders frequently query Experian scores for credit card underwriting and pre-approved personal loans.
                  </p>
                </div>
                <div className="border-l-4 border-teal-500 pl-4">
                  <h4 className="font-bold text-slate-800 text-sm">3. Equifax</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Equifax compiles detailed consumer and commercial credit registries. It provides lenders with robust fraud detection modules alongside credit ratings.
                  </p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-bold text-slate-800 text-sm">4. CRIF High Mark</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    CRIF High Mark is an Indian credit bureau specializing in microfinance collections, commercial credit segments, and retail lending insights.
                  </p>
                </div>
              </div>
            </div>

            {/* How Credit Score Brackets Define Your Loan Approval Chances */}
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

            {/* Deep-Dive: Anatomy of a CIBIL Report */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-indigo-600" />
                Anatomy of a CIBIL Report: Key Sections Decoded
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                When you download your credit report, it will contain complex financial terminologies. Here is what each section represents in plain English:
              </p>
              <div className="space-y-3 mt-4 text-xs sm:text-sm text-slate-600">
                <p>
                  <strong>1. Control Number (CN):</strong> This is a unique 9-digit number generated by CIBIL every time a bank fetches your credit report. It serves as CIBIL's reference key if you raise disputes against errors.
                </p>
                <p>
                  <strong>2. Personal Information:</strong> Contains your full name, date of birth, gender, PAN number, Passport details, or Aadhaar numbers reported by lenders.
                </p>
                <p>
                  <strong>3. Contact Information:</strong> Lists up to 4 addresses (residence and office), mobile numbers, and email addresses provided during previous loan applications.
                </p>
                <p>
                  <strong>4. Employment Information:</strong> Indicates your occupation (salaried or self-employed) and the monthly/annual income declared during credit requests.
                </p>
                <p>
                  <strong>5. Account Information (Most Critical):</strong> Detailed logs of every active and closed loan or credit card in your name. It displays the lender's name, loan type, open date, loan amount, outstanding balance, credit limit, and a month-on-month payment history matrix for up to 36 months.
                </p>
                <p>
                  <strong>6. Enquiry Information:</strong> Logs of every 'Hard Inquiry' conducted by lenders when you applied for fresh credit.
                </p>
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

            {/* DPD Codes Explained */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600" />
                Decoding CIBIL DPD Codes: What They Represent
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                The **Days Past Due (DPD)** column in the Account Information section represents the number of days you delayed paying a specific installment. Understanding these codes is essential:
              </p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="p-3 font-semibold text-slate-700">DPD Code</th>
                      <th className="p-3 font-semibold text-slate-700">Detailed Meaning</th>
                      <th className="p-3 font-semibold text-slate-700">Impact on Credit Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-800">"000" or "STD"</td>
                      <td className="p-3 text-slate-600">Standard Account. Paid within due dates.</td>
                      <td className="p-3 text-emerald-600 font-semibold">Positive (Boosts Score)</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-800">"030" / "060" / "090"</td>
                      <td className="p-3 text-slate-600">Payment delayed by 30 / 60 / 90 days.</td>
                      <td className="p-3 text-amber-600 font-semibold">Negative (Drops Score)</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-800">"SUB"</td>
                      <td className="p-3 text-slate-600">Substandard Account. Defaulted past 90 days.</td>
                      <td className="p-3 text-rose-600 font-semibold">Severe Drop</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-800">"DBT"</td>
                      <td className="p-3 text-slate-600">Doubtful Account. Unpaid past 12 months.</td>
                      <td className="p-3 text-rose-700 font-bold">Catastrophic Drop</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-800">"LSS"</td>
                      <td className="p-3 text-slate-600">Loss Account. Bank marked loan as unrecoverable.</td>
                      <td className="p-3 text-rose-800 font-black">Permanent Red Flag</td>
                    </tr>
                  </tbody>
                </table>
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
