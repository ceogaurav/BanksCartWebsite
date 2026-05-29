import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert, Sparkles, BookOpen, AlertCircle, Info, TrendingUp, Award, Clock, FileText, CheckSquare, XCircle, Play, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';

const CibilCreditReportPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedBureau, setSelectedBureau] = useState<'CIBIL' | 'Experian' | 'CRIF' | 'Equifax'>('CIBIL');

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

  const testimonials = [
    {
      name: "Mr. Irfan Sayed",
      location: "Rajasthan",
      date: "May 1, 2026",
      quote: "My credit score was roughly 600. Using the credit building guidelines on BanksCart, my credit score has successfully improved to 700 within months. Highly satisfied with their advisory services!",
      avatar: "IS"
    },
    {
      name: "Mr. Mohammed Reyaj",
      location: "Maharashtra",
      date: "Apr 28, 2026",
      quote: "I am a businessman, and the requirement for money often arises. Money lending apps affected my CIBIL score. Using BanksCart, in just a month my score started to improve.",
      avatar: "MR"
    },
    {
      name: "Sindhu Gowda",
      location: "Karnataka",
      date: "Jan 16, 2026",
      quote: "Excellent support for CIBIL report download. The walkthrough team was extremely patient, knowledgeable, and resolved my dispute query within minutes. Highly recommended!",
      avatar: "SG"
    },
    {
      name: "Alok Bansal",
      location: "Delhi NCR",
      date: "Aug 19, 2025",
      quote: "Score improve hone ke baad yahi se premium credit card apply kiya aur instantly approve ho gaya. Seamless experience, very fast and trusted!",
      avatar: "AB"
    }
  ];

  const articles = [
    {
      title: "How to Manage Multiple Loans Without Hurting Your Credit Score",
      author: "Neha Singh",
      date: "18 May 2026",
      avatar: "N"
    },
    {
      title: "How Can Students Build Their Credit Scores Without Income Proof?",
      author: "Bharti",
      date: "18 May 2026",
      avatar: "B"
    },
    {
      title: "How Self-Employed Can Build Credit Score Fast",
      author: "Rupanshi Thapa",
      date: "12 May 2026",
      avatar: "R"
    },
    {
      title: "How Credit Utilization Ratio Works and What Percentage to Maintain",
      author: "Sushmita Mishra",
      date: "12 May 2026",
      avatar: "S"
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
              Check Free Credit Score & CIBIL Report
            </h1>
            <p className="text-blue-100 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl font-medium">
              Check your credit score free across all credit bureaus, including CIBIL, only on BanksCart. Get your free credit score online with monthly updates and take steps to become credit healthy.
            </p>
            
            {/* Bureau logos & checklist */}
            <div className="mt-8 flex flex-wrap gap-6 items-center border-t border-white/10 pt-6">
              <span className="text-xs text-blue-200 uppercase tracking-wider font-bold">Supported Bureaus:</span>
              <div className="flex gap-4 flex-wrap">
                <span className="bg-white/15 px-3 py-1 rounded-full text-xs font-semibold">TransUnion CIBIL</span>
                <span className="bg-white/15 px-3 py-1 rounded-full text-xs font-semibold">Experian</span>
                <span className="bg-white/15 px-3 py-1 rounded-full text-xs font-semibold">Equifax</span>
                <span className="bg-white/15 px-3 py-1 rounded-full text-xs font-semibold">CRIF High Mark</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-Column Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Rich SEO Guide Content */}
          <div className="lg:col-span-7 space-y-10 text-slate-700">
            
            {/* Checklist Why check on bankscart */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5.5 h-5.5 text-blue-600" />
                Why Check Credit Score on BanksCart?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">4 Bureaus Coverage</h3>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">Check CIBIL, Experian, Equifax, and CRIF scores all in one place.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Monthly Updates</h3>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">Track your score monthly with automated bureau refreshes.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">Zero Score Impact</h3>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">Soft pull queries ensure checking doesn't drop your rating.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* What is Credit Score? */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full"></span>
                What is a Credit Score?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                A **Credit Score** is a 3-digit numeric summary of your credit history, that represents your creditworthiness. Credit Score is commonly known as **CIBIL Score** (provided by TransUnion CIBIL), and ranges between **300 and 900**. Your Credit Score is a measure of your ability to borrow from Banks and NBFCs, determined by your past credit behaviour.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                CIBIL is one of the 4 Credit Bureaus or Credit Information Companies (CICs) in India that calculates and maintains your Credit Score. Your Credit Score is based on the information provided by lenders. It includes payment of EMIs, Credit Card bills, new applications etc.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                To ensure bureaus have your latest credit information, RBI has mandated all lenders to report the updated credit information to all bureaus every 15 days.
              </p>
            </div>

            {/* How to Check Credit Score for Free */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Clock className="w-5.5 h-5.5 text-blue-600" />
                How to Check Credit Score for Free with BanksCart?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mx-auto mb-3">1</div>
                  <h4 className="font-bold text-slate-800 text-sm">Enter Details</h4>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed">Fill in your mobile number and other basic details in the score form.</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mx-auto mb-3">2</div>
                  <h4 className="font-bold text-slate-800 text-sm">Verify OTP</h4>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed">Complete OTP verification of your mobile number to establish identity.</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-center">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm mx-auto mb-3">3</div>
                  <h4 className="font-bold text-slate-800 text-sm">Track Score</h4>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed">Your account will refresh every month so you can track credit health easily.</p>
                </div>
              </div>
            </div>

            {/* Interactive Multi-Bureau Score Comparison Grid */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl text-white p-6 sm:p-8 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Compare your Credit Report across 4 Bureau(s)
              </h3>
              <p className="text-xs text-slate-400 mb-6">Exclusively modeled on Prime borrower reports</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">CIBIL</span>
                  <div className="text-3xl font-black text-emerald-400 mt-2">809</div>
                  <span className="text-[10px] text-emerald-300 font-semibold block mt-1">✔ Excellent</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Experian</span>
                  <div className="text-3xl font-black text-teal-400 mt-2">752</div>
                  <span className="text-[10px] text-teal-300 font-semibold block mt-1">✔ Good</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Equifax</span>
                  <div className="text-3xl font-black text-emerald-400 mt-2">855</div>
                  <span className="text-[10px] text-emerald-300 font-semibold block mt-1">✔ Excellent</span>
                </div>
                <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">CRIF</span>
                  <div className="text-3xl font-black text-emerald-400 mt-2">840</div>
                  <span className="text-[10px] text-emerald-300 font-semibold block mt-1">✔ Excellent</span>
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-3 border border-white/10 text-[10px] text-slate-300 font-medium mt-5 text-center">
                🕒 Refresh Cycle: Updated every 15 days under RBI mandates.
              </div>
            </div>

            {/* Why is CIBIL Score Important */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-2">Why is CIBIL Score Important?</h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Your credit score is one of the first things that a Bank or NBFC will check while evaluating your loan or credit card application. It shows lenders whether you are reliable or risky in repayment of your EMIs or credit card outstanding.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 items-start pb-4 border-b border-slate-50">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold">%</div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Lower Interest Rates</h4>
                    <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">Many lenders offer lower rate of interest on loans to applicants with a strong credit score (above 750).</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start pb-4 border-b border-slate-50">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold">✔</div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Higher Loan Limits</h4>
                    <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">The higher your credit score, the more likely lenders are to approve you for larger credit limits.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 font-bold">📄</div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Quick Processing</h4>
                    <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">CIBIL Scores of 760 and above trigger pre-approved paperless offers cleared within seconds.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reasons for a low credit score */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Reasons for a Low Credit Score</h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">Some of the main factors that can lower your CIBIL score significantly are:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm font-semibold">
                <div className="bg-rose-50/50 p-4 border border-rose-100 rounded-xl flex gap-3 text-rose-800">
                  <span className="text-rose-600">✖</span>
                  Missed or late payments of credit cards and loan EMIs
                </div>
                <div className="bg-rose-50/50 p-4 border border-rose-100 rounded-xl flex gap-3 text-rose-800">
                  <span className="text-rose-600">✖</span>
                  Maxing out limits regularly (High Credit Utilisation Ratio)
                </div>
                <div className="bg-rose-50/50 p-4 border border-rose-100 rounded-xl flex gap-3 text-rose-800">
                  <span className="text-rose-600">✖</span>
                  Errors in your credit report or bureau duplicate logs
                </div>
                <div className="bg-rose-50/50 p-4 border border-rose-100 rounded-xl flex gap-3 text-rose-800">
                  <span className="text-rose-600">✖</span>
                  Too many simultaneous hard inquiries from multiple banks
                </div>
              </div>
            </div>

            {/* Interactive Credit Score Range and Meaning Table */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-2">Credit Score Range and Meaning</h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                Your credit score ranges from 300 to 900, where the score closer to 900 is considered better for credit approval.
              </p>
              
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="p-3 font-semibold text-slate-700">Score Range</th>
                      <th className="p-3 font-semibold text-slate-700">Creditworthiness</th>
                      <th className="p-3 font-semibold text-slate-700">Chances of Approval</th>
                      <th className="p-3 font-semibold text-slate-700">Pre-approved Offers</th>
                      <th className="p-3 font-semibold text-slate-700">Action Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-800">801 - 900</td>
                      <td className="p-3 font-medium text-emerald-600">✔ Yes</td>
                      <td className="p-3 font-medium text-emerald-600">✔ Yes</td>
                      <td className="p-3 font-medium text-emerald-600">✔ Yes</td>
                      <td className="p-3 text-slate-400">✖ No</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-800">761 - 800</td>
                      <td className="p-3 font-medium text-emerald-600">✔ Yes</td>
                      <td className="p-3 font-medium text-emerald-600">✔ Yes</td>
                      <td className="p-3 font-medium text-emerald-600">✔ Yes</td>
                      <td className="p-3 text-amber-600 font-semibold">⚠ Attention</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-800">701 - 760</td>
                      <td className="p-3 text-amber-600 font-semibold">⚠ Attention</td>
                      <td className="p-3 text-amber-600 font-semibold">⚠ Attention</td>
                      <td className="p-3 text-amber-600 font-semibold">⚠ Attention</td>
                      <td className="p-3 text-amber-600 font-semibold">⚠ Attention</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-800">601 - 700</td>
                      <td className="p-3 text-rose-600 font-bold">✖ No</td>
                      <td className="p-3 text-amber-600 font-semibold">⚠ Attention</td>
                      <td className="p-3 text-rose-600 font-bold">✖ No</td>
                      <td className="p-3 font-medium text-emerald-600">✔ Yes</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-800">300 - 600</td>
                      <td className="p-3 text-rose-600 font-bold">✖ No</td>
                      <td className="p-3 text-rose-600 font-bold">✖ No</td>
                      <td className="p-3 text-rose-600 font-bold">✖ No</td>
                      <td className="p-3 font-medium text-emerald-600">✔ Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* How is Credit Score Calculated */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-5.5 h-5.5 text-blue-600" />
                How is Credit Score Calculated?
              </h3>
              <p className="text-sm text-slate-500 mb-6 leading-relaxed font-medium">
                Your credit score depends on several factors that the credit bureaus take into consideration. These factors depict your past credit behaviour:
              </p>
              
              <div className="space-y-4">
                <div className="border border-slate-100 p-4 rounded-xl">
                  <strong className="text-slate-800 text-sm block">Repayment History (High Impact - 35%)</strong>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">Timely payments boost your score, whereas defaulting on EMIs or card bills severely drops it.</p>
                </div>
                <div className="border border-slate-100 p-4 rounded-xl">
                  <strong className="text-slate-800 text-sm block">Credit Utilization (Moderate Impact - 30%)</strong>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">The ratio of limit spent. Maintain strictly below 30% of your maximum revolving bounds.</p>
                </div>
                <div className="border border-slate-100 p-4 rounded-xl">
                  <strong className="text-slate-800 text-sm block">Duration of Credit History (Moderate Impact - 25%)</strong>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">Age of credit history. A longer stable repayment period signals reliability.</p>
                </div>
                <div className="border border-slate-100 p-4 rounded-xl">
                  <strong className="text-slate-800 text-sm block">Recent Hard Inquiries & Credit Mix (10%)</strong>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">Spike in simultaneous applications dropped scores; balanced credit mix improves ratings.</p>
                </div>
              </div>
            </div>

            {/* Technology Innovations Preview */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Sparkles className="w-5.5 h-5.5 text-blue-600" />
                Innovative Technology led Credit Health Tools
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border border-slate-100 p-5 rounded-2xl text-center group hover:border-blue-100 transition-colors">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Play className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">Video Credit Report</h4>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed">Your credit report explained in a personalized, easy video.</p>
                </div>
                <div className="border border-slate-100 p-5 rounded-2xl text-center group hover:border-blue-100 transition-colors">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">Score Predictor</h4>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed">See how various payment actions will impact your score.</p>
                </div>
                <div className="border border-slate-100 p-5 rounded-2xl text-center group hover:border-blue-100 transition-colors">
                  <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">PB Assist AI</h4>
                  <p className="text-slate-500 text-xs mt-2 leading-relaxed">Get deep, automated credit tips from our trained AI advisor.</p>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                What Our Customers Say
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((t, idx) => (
                  <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 bg-blue-100 text-blue-700 font-bold rounded-full flex items-center justify-center text-xs">
                        {t.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-800 text-xs">{t.name}</h4>
                        <span className="text-[10px] text-slate-400 font-semibold">{t.location} • {t.date}</span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed font-medium italic">
                      "{t.quote}"
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Credit Score Articles */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Credit Score Articles & Guides</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {articles.map((art, idx) => (
                  <div key={idx} className="border border-slate-100 p-4 rounded-xl hover:border-blue-100 transition-colors cursor-pointer flex justify-between items-center group">
                    <div>
                      <h4 className="font-bold text-slate-800 text-xs group-hover:text-blue-600 transition-colors leading-relaxed">
                        {art.title}
                      </h4>
                      <div className="flex gap-2 text-[10px] text-slate-400 font-semibold mt-2">
                        <span>By {art.author}</span>
                        <span>•</span>
                        <span>{art.date}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* FAQs */}
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
