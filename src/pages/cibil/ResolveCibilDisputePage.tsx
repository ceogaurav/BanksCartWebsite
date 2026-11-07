import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Scale, 
  ChevronDown, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  HelpCircle, 
  AlertCircle,
  FileSpreadsheet,
  Clock,
  Award,
  AlertOctagon
} from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
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
      a: "Under RBI guidelines, credit bureaus must resolve disputes and update records within 30 days of filing. CIBIL contacts the respective bank to verify the data, and updates your profile once the bank sends the corrected confirmation."
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
      q: "Will my CIBIL score increase immediately after a dispute is resolved?",
      a: "Yes. Once the bureau receives corrected logs from the bank, they update your registry within 1-3 business days. If a false delay mark or fraudulent loan account is successfully wiped out, your CIBIL score will rebound upward instantly."
    }
  ];

  const pageTitle = "How to Resolve Online CIBIL Disputes (Step-by-Step 2026) | BanksCart";
  const pageDescription = "Step-by-step guide to resolving CIBIL dispute online for free. Learn how to report incorrect loan accounts, remove delayed payment flags, escalate to RBI Ombudsman, and fix credit scores within 30 days.";
  const canonicalUrl = "https://bankscart.com/cibil/how-to-resolve-cibil-dispute";

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": canonicalUrl,
        "url": canonicalUrl,
        "name": pageTitle,
        "description": pageDescription,
        "isPartOf": {
          "@type": "WebSite",
          "@id": "https://bankscart.com/#website",
          "name": "BanksCart",
          "url": "https://bankscart.com"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://bankscart.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Credit Score",
            "item": "https://bankscart.com/credit-score"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Resolve CIBIL Dispute",
            "item": canonicalUrl
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
          "@type": "Question",
          "name": faq.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.a
          }
        }))
      }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pt-20 sm:pt-24 pb-16 antialiased">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(schemaJsonLd)}
        </script>
      </Helmet>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumb path={["Home", "Credit Score", "Resolve CIBIL Dispute"]} />

        {/* Hero Section: Institutional Trust Navy / Slate */}
        <section className="bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 rounded-2xl text-white p-6 sm:p-10 shadow-lg border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 rounded-full px-3.5 py-1 text-xs font-semibold text-blue-200 uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-blue-400" />
              Dispute Filing Guide
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              How to Resolve CIBIL Dispute
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Learn the exact steps to rectify incorrect bank data, wipe out false delay marks, and restore your credit ranking under RBI consumer protection rules.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 30-Day Mandatory RBI Resolution
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free Dispute Filing
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400" /> Zero Score Impact Soft Check
              </span>
            </div>
          </div>
        </section>

        {/* Two-Column Structured Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column (7 cols): Publication-Grade Unified Article Container */}
          <article className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-10 text-slate-700">
            
            {/* Section 1: The Core Mechanism */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
                Rectify Report Errors to Safeguard Your Score
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Occasionally, due to manual bank entries, operational lags, or technical glitches, lenders submit wrong data to credit bureaus. When a loan account you have already paid off continues to show outstanding dues or late flags, your CIBIL score tanks. This can happen despite you having cleared all dues and obtained the bank's 'No Dues Certificate' (NOC).
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                By proactively raising a <strong>CIBIL dispute</strong>, you instruct the bureau to verify the discrepancy with the lender. Once verified, the entry is deleted or updated, resulting in an immediate boost to your credit score. Under RBI guidelines and the Credit Information Companies (CIC) Act of 2005, both banks and bureaus are legally mandated to correct errors within a strict <strong>30-day</strong> window.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Regularly auditing your credit history on BanksCart helps you spot these errors early. You can then gather bank clearance NOCs and file online disputes, ensuring your rating stays pristine for future loan requests.
              </p>
            </div>

            {/* Section 2: Step-by-Step Procedure */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
                Step-by-Step Guide: Filing an Online CIBIL Dispute
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Filing a dispute online is completely free of charge. Follow this official 4-step procedure:
              </p>

              <div className="space-y-4 mt-4">
                <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Download your CIBIL Report</h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      First, check your report on BanksCart to identify the exact error. Note down the unique 9-digit <strong>Control Number</strong> printed on the top-right corner of the report.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Visit CIBIL's Official Dispute Portal</h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      Navigate to CIBIL's official online dispute registration section (`cibil.com/online-dispute-resolution`). Log in using your credentials.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Raise Discrepancy Details</h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      Select the specific account or personal data field displaying error records. Input the correct figures and upload supporting documents (like payment receipts or bank NOC certificates).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Await Resolution (30 Days)</h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      The bureau checks details with the reporting bank. Under RBI rules, you will receive an SMS confirmation showing resolution or updates within 30 days.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Dispute Lifecycle Table */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
                The CIBIL Dispute Lifecycle & Timelines
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Sequence of events that occurs once you submit an online dispute:
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                      <th className="p-3 font-bold">Lifecycle Stage</th>
                      <th className="p-3 font-bold">Process Action</th>
                      <th className="p-3 font-bold">Turnaround Time (TAT)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-semibold text-slate-900">1. Dispute Filing</td>
                      <td className="p-3 text-slate-600">User submits the online dispute form citing control numbers.</td>
                      <td className="p-3 text-emerald-700 font-bold font-mono">Immediate (Instant)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-semibold text-slate-900">2. Bureau Validation</td>
                      <td className="p-3 text-slate-600">CIBIL audits the dispute and forwards details to the lender bank.</td>
                      <td className="p-3 text-emerald-700 font-semibold font-mono">1 - 3 business days</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-semibold text-slate-900">3. Bank Verification</td>
                      <td className="p-3 text-slate-600">The bank checks internal records to verify or dispute the claim.</td>
                      <td className="p-3 text-emerald-700 font-bold font-mono">Up to 15 business days</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-semibold text-slate-900">4. Bureau Update</td>
                      <td className="p-3 text-slate-600">CIBIL receives the bank's correction update and alters your profile.</td>
                      <td className="p-3 text-emerald-700 font-semibold font-mono">2 - 3 business days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 4: Key Financial Takeaway Callout */}
            <div className="border-l-4 border-[#1E3A8A] bg-blue-50/60 p-5 rounded-r-xl space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-[#1E3A8A]" />
                <span>What CANNOT be Disputed</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Disputes only resolve factual errors, incorrect names, or duplicate accounts. Genuine delayed payments, legitimate hard inquiries you authorized, and actual outstanding debt balances cannot be disputed or wiped out.
              </p>
            </div>

            {/* Section 5: Integrated FAQ Accordion */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
                Frequently Asked Questions
              </h2>
              <div className="space-y-3">
                {faqs.map((faq, index) => (
                  <div key={index} className="border border-slate-200 rounded-xl overflow-hidden transition-colors">
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100/80 text-left font-bold text-slate-800 text-sm outline-none transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform flex-shrink-0 ml-2 ${activeFaq === index ? 'rotate-180 text-blue-700' : ''}`} />
                    </button>
                    {activeFaq === index && (
                      <div className="p-4 text-xs sm:text-sm text-slate-600 border-t border-slate-200 bg-white leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </article>

          {/* Right Column (5 cols): Sticky Form & Credibility Rail */}
          <aside className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            
            {/* Embedded Verified CibilCheckerForm */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Check Your CIBIL Score</h3>
                  <p className="text-xs text-slate-500">Spot Discrepancies Early • Zero Impact</p>
                </div>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-bold">
                  <Lock className="w-3 h-3" /> SSL Secured
                </span>
              </div>

              <CibilCheckerForm sourcePage="Resolve Dispute CIBIL Landing Page" />
            </div>

            {/* Bank-Grade Data Protection Trust Box */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Bank-Grade Data Protection</span>
              </div>
              <p className="leading-relaxed">
                Checking your score on BanksCart is classified as a soft inquiry. It never impacts your existing CIBIL rating or alerts lending institutions.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                <span className="flex items-center gap-1 text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% Free Soft Pull
                </span>
                <span>Zero Bureau Score Impact</span>
              </div>
            </div>

            {/* Related Credit Navigation */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Popular Credit Resources</h4>
              <div className="space-y-2 text-xs font-semibold">
                <Link
                  to="/cibil/how-to-check-cibil-score-by-pan-card"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-blue-700 transition-colors border border-transparent hover:border-slate-200"
                >
                  <span>Check CIBIL Score by PAN Card</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/cibil-report/cibil-score-sbi-loans"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-blue-700 transition-colors border border-transparent hover:border-slate-200"
                >
                  <span>SBI Loan CIBIL Score Rules</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/credit-report/ways-to-improve-your-cibil-score"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-blue-700 transition-colors border border-transparent hover:border-slate-200"
                >
                  <span>Ways to Improve CIBIL Score</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link
                  to="/credit-score/cibil-score-for-personal-loan"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-blue-700 transition-colors border border-transparent hover:border-slate-200"
                >
                  <span>CIBIL Score for Personal Loans</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
};

export default ResolveCibilDisputePage;
