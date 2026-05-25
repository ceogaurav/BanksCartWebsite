import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Check, AlertOctagon, HelpCircle as HelpIcon, FileSpreadsheet, ShieldAlert, Award } from 'lucide-react';
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
    },
    {
      q: "What is a CIBIL Control Number and where do I find it?",
      a: "The Control Number (CN) is a unique 9-digit number printed at the top-right corner of your official CIBIL report. Every time a bank fetches your score, a fresh CN is generated. You must cite this number when filing a dispute to help CIBIL identify the exact report version."
    },
    {
      q: "Can a bank refuse to correct an error on my report?",
      a: "A bank can only refuse correction if they have valid documented proof that the reported debt or payment delay is legitimate. If they refuse despite you having cleared the dues, you can escalate the matter to the bank's internal principal nodal officer or the RBI Banking Ombudsman."
    },
    {
      q: "Will my CIBIL score increase immediately after a dispute is resolved?",
      a: "Yes. Once the bureau receives corrected logs from the bank, they update your registry within 1-3 business days. If a false delay mark or fraudulent loan account is successfully wiped out, your CIBIL score will rebound upward instantly."
    },
    {
      q: "Can I file multiple disputes simultaneously?",
      a: "Yes. CIBIL's online dispute form allows you to select and dispute multiple fields (such as address spellings, loan balances, and payment history columns) within a single dispute submission."
    },
    {
      q: "What is the Credit Information Companies (CIC) Act and how does it protect me?",
      a: "The CIC Act of 2005 regulates credit reporting in India. It mandates that credit bureaus and banks must ensure data accuracy, protect consumer privacy, and legally resolve all consumer dispute requests within a strict 30-day window."
    },
    {
      q: "How do I dispute a fraudulent loan application inquiry?",
      a: "If your report displays 'Hard Inquiries' that you never authorized, you should contact the respective bank's customer service or grievance desk immediately. Ask them to confirm if an application was submitted under your identity, and request them to trigger a 'withdrawal/correction request' to CIBIL."
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
          <div className="lg:col-span-7 space-y-10 text-slate-700">
            
            {/* Guide intro */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-rose-600 rounded-full"></span>
                Rectify Report Errors to Safeguard Your Score
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Occasionally, due to manual bank entries, operational lags, or technical glitches, lenders submit wrong data to credit bureaus. When a loan account you have already paid off continues to show outstanding dues or late flags, your CIBIL score tanks. This can happen despite you having cleared all dues and obtained the bank's 'No Dues Certificate' (NOC).
              </p>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                By proactively raising a **CIBIL dispute**, you instruct the bureau to verify the discrepancy with the lender. Once verified, the entry is deleted or updated, resulting in an immediate boost to your credit score. Under RBI guidelines and the Credit Information Companies (CIC) Act of 2005, both banks and bureaus are legally mandated to correct errors within a strict 30-day window.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Regularly auditing your credit history on BanksCart helps you spot these errors early. You can then gather bank clearance NOCs and file online disputes, ensuring your rating stays pristine for future loan requests.
              </p>
            </div>

            {/* How to raise a dispute - Step by Step */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-rose-600" />
                Step-by-Step Guide: Filing an Online CIBIL Dispute
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Filing a dispute online is completely free. Here is the detailed step-by-step procedure:
              </p>
              <div className="space-y-6 mt-4">
                
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Download your CIBIL Report</h4>
                    <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                      First, check your report on BanksCart to identify the exact error. Note down the unique 9-digit **Control Number** printed on the top-right corner of the report.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
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
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
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
                  <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-sm flex-shrink-0 mt-0.5">
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

            {/* Table of Dispute Cycle Milestones */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-rose-600" />
                The CIBIL Dispute Lifecycle & Timelines
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                Here is the sequence of events that occurs once you submit an online dispute:
              </p>
              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100">
                      <th className="p-3 font-semibold text-slate-700">Lifecycle Stage</th>
                      <th className="p-3 font-semibold text-slate-700">Process Action</th>
                      <th className="p-3 font-semibold text-slate-700">Turnaround Time (TAT)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-800">1. Dispute Filing</td>
                      <td className="p-3 text-slate-600">User submits the online dispute form citing control numbers.</td>
                      <td className="p-3 text-emerald-600 font-semibold">Immediate (Instant)</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-800">2. Bureau Validation</td>
                      <td className="p-3 text-slate-600">CIBIL audits the dispute and forwards details to the lender bank.</td>
                      <td className="p-3 text-emerald-600 font-semibold">1 - 3 business days</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-800">3. Bank Verification</td>
                      <td className="p-3 text-slate-600">The bank checks internal records to verify or dispute the claim.</td>
                      <td className="p-3 text-emerald-600 font-bold">Up to 15 business days</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="p-3 font-bold text-slate-800">4. Bureau Update</td>
                      <td className="p-3 text-slate-600">CIBIL receives the bank's correction update and alters your profile.</td>
                      <td className="p-3 text-emerald-600 font-semibold">2 - 3 business days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Escalation to RBI Ombudsman */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600" />
                Dispute Delayed? How to Escalate to the RBI Nodal Officer
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                If the reporting bank fails to coordinate or delays resolving your dispute beyond the legal 30-day window, you have strong legal protections under RBI guidelines:
              </p>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs sm:text-sm text-slate-600 space-y-2 leading-relaxed">
                <p><strong>Step A: Contact Nodal Officers:</strong> Obtain the email address of your bank's Principal Nodal Officer (available on the bank's website) and submit a formal grievance citing your dispute ticket.</p>
                <p><strong>Step B: File Complaint on RBI CMS:</strong> If the bank does not reply within 30 days or rejects your request unfairly, visit the RBI Complaint Management System (CMS) portal (`cms.rbi.org.in`) and file a complaint against the bank.</p>
                <p><strong>Step C: Claim Compensations:</strong> Under recent RBI rules, banks can be fined ₹100 per day for delays in correcting credit registry errors past 30 days of filing.</p>
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
