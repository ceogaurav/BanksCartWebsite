import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Key, ShieldCheck, AlertCircle, Eye, ShieldAlert, Award } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';

const CheckCibilByPanPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Can I check my CIBIL score without a PAN Card?",
      a: "Yes, you can technically check your credit score using other identity documents like Passport, Voter ID, or Aadhaar number, provided they are linked to your loan accounts. However, since the PAN card is the most widely reported identifier by banks to bureaus, checking via PAN card yields the most complete and accurate credit report."
    },
    {
      q: "Is it safe to share my PAN number on BanksCart?",
      a: "Yes. BanksCart uses 256-bit SSL encryption to ensure your data is entirely secure. The PAN card number you input is securely transmitted only to authorized credit bureaus (like Experian and CIBIL) to retrieve your profile. We do not store your PAN card details or misuse them."
    },
    {
      q: "Can an incorrect PAN number fetch a credit report?",
      a: "No. The credit bureau matching algorithm checks if the PAN card number, full name, date of birth, and mobile number match records submitted by lenders. If there is a mismatch, the search will fail and return no record."
    },
    {
      q: "How do I check if someone else is using my PAN card for a loan?",
      a: "By pulling your CIBIL credit report. Under the 'Accounts' section, you will see a list of all active and closed loans or credit cards registered against your PAN. If you spot an unfamiliar account or bank, it indicates unauthorized usage or identity fraud, which should be disputed immediately."
    },
    {
      q: "Will checking my score via PAN trigger a hard inquiry?",
      a: "No. Checks performed by you on credit aggregators like BanksCart are 'Soft Inquiries'. A soft inquiry is simply a validation check and does not impact your credit rating at all, unlike 'Hard Inquiries' initiated by banks during loan processing."
    },
    {
      q: "Why is the score fetched from my PAN different across different sites?",
      a: "Different websites query different credit bureaus (such as CIBIL, Experian, Equifax, or CRIF High Mark). While they all use your PAN to fetch records, each bureau uses its proprietary credit ranking algorithms, resulting in minor score differences of 10-30 points."
    },
    {
      q: "Does a minor name spelling mismatch on my PAN card block score checks?",
      a: "Yes. Bureau matching engines use strict validation protocols. If your name spelling in the bank record does not align with your official PAN registry, the bureau will fail to establish identity and throw a 'No Match Found' error. You will need to rectify spellings with CIBIL first."
    },
    {
      q: "How can I block or freeze my PAN card to prevent fake loan applications?",
      a: "Currently, India does not have a centralized credit lock system like the US. However, you can register for CIBIL's credit monitoring alerts. This triggers instant email and SMS notifications whenever a lender performs a hard inquiry on your PAN, allowing you to intercept fraud instantly."
    },
    {
      q: "Can a duplicate PAN card issue drop my credit rating?",
      a: "Yes. Possessing duplicate PAN cards is illegal under Indian tax laws and leads to fragmented credit reporting. Lenders report histories to different PANs, leading to split credit records, massive administrative errors, and significant score drops."
    },
    {
      q: "What should I do if my PAN card shows a loan default that I cleared?",
      a: "You must procure a 'No Dues Certificate' (NOC) from the lending bank confirming that the loan is paid off in full. Then, you should visit the CIBIL dispute portal to upload this certificate and file an online dispute to update your account status to 'Closed'."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[200px] font-black leading-none select-none">PAN</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              Verification Guide
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight">
              Check CIBIL Score by PAN Card
            </h1>
            <p className="text-emerald-100 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl">
              Learn how your Permanent Account Number (PAN) acts as your absolute credit identifier and verify all active credits recorded under your profile instantly.
            </p>
          </div>
        </div>

        {/* Grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column Content */}
          <div className="lg:col-span-7 space-y-10 text-slate-700">
            
            {/* Introduction Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-teal-600 rounded-full"></span>
                Why is the PAN Card Crucial for Credit bureaus?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                In India, your **Permanent Account Number (PAN)**, issued by the Income Tax Department, serves as a unique financial identifier. Because name spellings can vary or match across millions of individuals, banks rely on PAN numbers to report monthly loan or credit card behaviors to credit bureaus like TransUnion CIBIL, Experian, and Equifax.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                When you initiate a search using your PAN card, the bureau matches this alphanumeric key against their master databases. This ensures you receive *your* exact report, containing only your credit history and omitting reports of namesakes with similar spellings. This alphanumeric composition consists of 5 alphabets, 4 numbers, and 1 ending alphabet, packing specific information regarding card holder classifications (such as individuals, companies, or trusts).
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                By querying your report with a PAN card, you pull the absolute source-of-truth credit registry reported by institutions. Any credit card swiped, personal loan cleared, or EMI delayed is instantly mapped to your PAN, making it the most important document for credit ranking tracking.
              </p>
            </div>

            {/* Checklist of PAN Card CIBIL rules */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Key className="w-5 h-5 text-teal-600" />
                Step-by-Step Check: How to get CIBIL using PAN Card
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Checking your CIBIL score on BanksCart is a simple, highly secure process. Follow these stages to fetch your score in 60 seconds:
              </p>
              <div className="space-y-6 mt-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Enter Valid PAN Alphanumeric Code</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Ensure you input the standard 10-digit PAN format (5 letters, 4 digits, 1 letter). Mismatches in sequence will return matching errors.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Match Full Name Exactly</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      The name inputted must match the name printed on the PAN card. Middle name omissions or initial spelling mismatches can occasionally block bureau matches.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Verify with OTP</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Credit bureaus trigger automated verification against your linked mobile number to ensure no unauthorized third party can read your profile.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparison Matrix of ID verification */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-teal-600" />
                Comparison: PAN vs Other Identity Documents for CIBIL Checks
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                While you can pull reports using other documents, the PAN card remains the gold standard. Here is why:
              </p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="p-3 font-semibold text-slate-700">Identity Document</th>
                      <th className="p-3 font-semibold text-slate-700">Reporting Frequency by Banks</th>
                      <th className="p-3 font-semibold text-slate-700">Matching Accuracy</th>
                      <th className="p-3 font-semibold text-slate-700">Recommended Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-800">PAN Card</td>
                      <td className="p-3 text-slate-600">Extremely High (Mandatory for retail loans)</td>
                      <td className="p-3 text-emerald-600 font-bold">99.9% (Perfect match)</td>
                      <td className="p-3 text-slate-500 font-medium">Primary (Highly Recommended)</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-800">Aadhaar Card</td>
                      <td className="p-3 text-slate-600">High (Linked for KYC validation)</td>
                      <td className="p-3 text-teal-600 font-bold">85% (Subject to KYC links)</td>
                      <td className="p-3 text-slate-500">Secondary verification</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-800">Passport</td>
                      <td className="p-3 text-slate-600">Low (Reported only for NRI/abroad records)</td>
                      <td className="p-3 text-amber-600 font-bold">60% (High mismatch chances)</td>
                      <td className="p-3 text-slate-500">Alternate only</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-800">Voter ID / DL</td>
                      <td className="p-3 text-slate-600">Minimal (Rarely utilized by banks)</td>
                      <td className="p-3 text-rose-600 font-bold">40% (Poor tracking records)</td>
                      <td className="p-3 text-slate-500">Avoid unless no other docs available</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Warnings Table - Identity Theft */}
            <div className="bg-rose-50/50 rounded-2xl border border-rose-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-rose-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600" />
                Red Alert: Check for Identity Fraud on your PAN
              </h3>
              <p className="text-sm text-rose-700 leading-relaxed mb-4">
                Identity thieves frequently target PAN card details to apply for illegal micro-loans, instant consumer loans, or pre-paid credit cards. Since the money is pocketed by fraudsters and the loan remains registered under your PAN, you are left with delayed payments and a tanked credit score. Protect your profile by auditing these warning signs:
              </p>
              <ul className="space-y-3 text-xs text-rose-800 font-medium mt-4">
                <li className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-800">Unknown Lenders showing active loans:</strong>
                    If you spot micro-lending apps or NBFCs showing loans that you never applied for.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-800">Spike in Hard Inquiries:</strong>
                    Frequent credit search queries from banks or card issuers you never visited or authorized.
                  </div>
                </li>
                <li className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-800">Delayed payments reported on closed cards:</strong>
                    Closed credit cards appearing as 'Active' with outstanding dues and delayed payment flags.
                  </div>
                </li>
              </ul>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-teal-600" />
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
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-teal-600' : ''}`} />
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
            <CibilCheckerForm sourcePage="PAN Card CIBIL Check Landing Page" />
          </div>

        </div>

      </div>
    </div>
  );
};

export default CheckCibilByPanPage;
