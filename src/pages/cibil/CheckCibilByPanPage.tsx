import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Key, ShieldCheck, AlertCircle } from 'lucide-react';
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
          <div className="lg:col-span-7 space-y-10">
            
            {/* Introduction Card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-teal-600 rounded-full"></span>
                Why is the PAN Card Crucial for Credit bureaus?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                In India, your **Permanent Account Number (PAN)**, issued by the Income Tax Department, serves as a unique financial identifier. Because name spellings can vary or match across millions of individuals, banks rely on PAN numbers to report monthly loan or credit card behaviors to credit bureaus like TransUnion CIBIL.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                When you initiate a search using your PAN card, the bureau matches this alphanumeric key against their master databases. This ensures you receive *your* exact report, containing only your credit history and omitting reports of namesakes with similar spellings.
              </p>
            </div>

            {/* Checklist of PAN Card CIBIL rules */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Step-by-Step Check: How to get CIBIL using PAN Card</h3>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Enter Valid PAN Alphanumeric Code</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      Ensure you input the standard 10-digit PAN format (5 letters, 4 digits, 1 letter). Mismatches will return error logs.
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
                      The name inputted must match the name printed on the PAN card. Middle name omissions can occasionally block matches.
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

            {/* Warnings Table - Identity Theft */}
            <div className="bg-rose-50/50 rounded-2xl border border-rose-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-rose-800 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Red Alert: Check for Identity Fraud on your PAN
              </h3>
              <p className="text-sm text-rose-700 leading-relaxed mb-4">
                Identity thieves often target PAN cards to apply for illegal micro-loans or credit cards, leaving unsuspecting citizens with tanked credit scores. Safeguard your profile by identifying the following warning signs:
              </p>
              <ul className="space-y-2 text-xs text-rose-800 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-600 rounded-full"></span>
                  Unknown financial entities showing active loans on your report.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-600 rounded-full"></span>
                  Active credit lines marked as open, despite never executing cards from that bank.
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-rose-600 rounded-full"></span>
                  Hard inquiries from banks you never visited or authorized.
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
