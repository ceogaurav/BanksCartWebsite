import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ChevronDown, 
  Lock, 
  ArrowRight, 
  HelpCircle, 
  FileText, 
  Check, 
  AlertCircle,
  Building2,
  Scale
} from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';

const CheckCibilByPanPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Why is a PAN Card required to check my CIBIL score?",
      a: "The Permanent Account Number (PAN) is a unique 10-digit alphanumeric identifier assigned by the Income Tax Department of India. Indian credit bureaus (TransUnion CIBIL, Experian, Equifax, and CRIF High Mark) use your PAN as the primary master key to map all your active and closed credit cards, personal loans, and home loan accounts accurately without confusion with other individuals of the same name."
    },
    {
      q: "Does checking my CIBIL score via PAN Card lower my credit rating?",
      a: "No. When you check your own credit score on BanksCart using your PAN card, it is registered as a 'Soft Inquiry' or consumer-initiated check. Soft inquiries have zero impact on your CIBIL score. Hard inquiries, which can slightly reduce your score by 2 to 5 points, occur only when a bank or NBFC queries your report after you apply for a new loan or credit card."
    },
    {
      q: "Can I check my CIBIL score without a PAN Card?",
      a: "While credit bureaus technically allow identity checks using Passport, Voter ID, or Aadhaar, the match accuracy drops considerably. In India, banks report monthly credit card and loan repayment logs mapped primarily to the borrower's PAN. Checking without a PAN often returns an 'NH' (No History) status or an incomplete credit profile."
    },
    {
      q: "What does an NH or -1 CIBIL score mean when checking with PAN?",
      a: "An 'NH' (No History) or score of '-1' / '0' means you have no active or historical credit records registered with the credit bureaus in India. This typically happens for first-time credit seekers who have never owned a credit card or taken a formal bank loan. You can build your credit file by opening a fixed-deposit (FD) backed credit card."
    },
    {
      q: "How frequently can I check my CIBIL score using my PAN Card?",
      a: "You can check your CIBIL score as often as you want. Because consumer checks are soft inquiries, checking your score weekly or monthly will never harm your rating. In fact, checking your score every 30 to 45 days is strongly recommended by the RBI to detect erroneous bank entries, fraudulent inquiries, or identity theft early."
    },
    {
      q: "Is my PAN Card number and personal data secure on BanksCart?",
      a: "Yes. BanksCart implements bank-grade 256-bit SSL encryption. We fetch credit scores strictly through official API integrations with licensed Indian credit information bureaus. We never sell your personal data or store sensitive bureau passwords, and every check requires mobile OTP verification."
    }
  ];

  const pageTitle = "Check CIBIL Score by PAN Card Free Online | BanksCart";
  const pageDescription = "Check your official CIBIL credit score using your PAN Card online for free. 100% safe, instant OTP verification, bank-grade encryption, and zero impact on your credit rating.";
  const canonicalUrl = "https://bankscart.com/cibil/how-to-check-cibil-score-by-pan-card";

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
            "name": "Check CIBIL Score by PAN Card",
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
        <Breadcrumb path={["Home", "Credit Score", "Check CIBIL Score by PAN Card"]} />

        {/* Hero Section: Institutional Trust Navy / Slate */}
        <section className="bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 rounded-2xl text-white p-6 sm:p-10 shadow-lg border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 rounded-full px-3.5 py-1 text-xs font-semibold text-blue-200 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              Official CIC Verification Guide
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Check CIBIL Score by PAN Card
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Learn how your Permanent Account Number (PAN) acts as your master credit key across TransUnion CIBIL, Experian, Equifax, and CRIF. Verify your credit profile instantly with zero impact on your score.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free Soft Pull
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Zero Bureau Score Impact
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400" /> Bank-Grade 256-Bit SSL
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
                Why is the PAN Card Crucial for Credit Bureaus?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                In India, your <strong>Permanent Account Number (PAN)</strong>, issued by the Income Tax Department, serves as a unique financial identifier. Because name spellings can vary or match across millions of individuals, banks and NBFCs rely on PAN numbers to report monthly loan or credit card behaviors to licensed credit bureaus like TransUnion CIBIL, Experian, and Equifax.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                When you initiate a search using your PAN card, the bureau matches this alphanumeric key against their master databases. This ensures you receive <em>your</em> exact report, containing only your credit history and omitting records of namesakes with similar spellings. This alphanumeric composition consists of 5 alphabets, 4 numbers, and 1 ending alphabet, packing specific information regarding cardholder status (individuals, companies, or trusts).
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                By querying your report with a PAN card, you pull the absolute source-of-truth credit registry reported by financial institutions. Any credit card swiped, personal loan cleared, or EMI delayed is instantly mapped to your PAN, making it the most important document for credit ranking tracking.
              </p>
            </div>

            {/* Section 2: Step-by-Step Procedure */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
                Step-by-Step Check: How to get CIBIL using PAN Card
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Checking your CIBIL score on BanksCart is a simple, highly secure process. Follow these stages to fetch your score in 60 seconds:
              </p>

              <div className="space-y-4 mt-4">
                <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Enter Valid PAN Alphanumeric Code</h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      Ensure you input the standard 10-digit PAN format (5 letters, 4 digits, 1 letter). Mismatches in sequence will return matching errors.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Match Full Name Exactly</h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      The name inputted must match the name printed on the PAN card. Middle name omissions or initial spelling mismatches can occasionally block bureau matches.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Verify with Mobile OTP</h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      Credit bureaus trigger automated verification against your linked mobile number to ensure no unauthorized third party can read your profile.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Identity Documents Comparison Matrix */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
                Comparison: PAN vs Other Identity Documents for CIBIL Checks
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                While bureaus support querying records using other documents, the PAN card remains the gold standard. Here is why:
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                      <th className="p-3 font-bold">Document Type</th>
                      <th className="p-3 font-bold">Match Accuracy</th>
                      <th className="p-3 font-bold">Risk of Split Profiles</th>
                      <th className="p-3 font-bold">Bureau Preference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-bold text-slate-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" /> PAN Card
                      </td>
                      <td className="p-3 font-semibold text-emerald-700 font-mono">99.8% (Absolute)</td>
                      <td className="p-3 text-emerald-700 font-medium">Near Zero</td>
                      <td className="p-3 text-slate-700 font-semibold">Mandatory Primary Key</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-semibold text-slate-800">Passport</td>
                      <td className="p-3 font-mono text-slate-600">85.0%</td>
                      <td className="p-3 text-amber-700 font-medium">Moderate (Changes upon renewal)</td>
                      <td className="p-3 text-slate-500">Secondary Document</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-semibold text-slate-800">Voter ID</td>
                      <td className="p-3 font-mono text-slate-600">75.0%</td>
                      <td className="p-3 text-amber-700 font-medium">High (State code differences)</td>
                      <td className="p-3 text-slate-500">Optional Fallback</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-semibold text-slate-800">Driving License</td>
                      <td className="p-3 font-mono text-slate-600">70.0%</td>
                      <td className="p-3 text-rose-700 font-medium">High (Varying RTO syntax)</td>
                      <td className="p-3 text-slate-500">Discouraged by Bureaus</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 4: Key Financial Takeaway Callout */}
            <div className="border-l-4 border-[#1E3A8A] bg-blue-50/60 p-5 rounded-r-xl space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-[#1E3A8A]" />
                <span>Important Consumer Protection Guarantee</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Under Reserve Bank of India (RBI) regulations, checking your own credit score using your PAN card is classified as a consumer-initiated soft pull. It never alerts banks, never adds hard inquiries to your profile, and will never lower your CIBIL score.
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
                  <p className="text-xs text-slate-500">60-Second Check • 100% Free • Soft Inquiry</p>
                </div>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-bold">
                  <Lock className="w-3 h-3" /> SSL Secured
                </span>
              </div>

              <CibilCheckerForm sourcePage="PAN Card CIBIL Check Landing Page" />
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
                  to="/cibil/how-to-resolve-cibil-dispute"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-blue-700 transition-colors border border-transparent hover:border-slate-200"
                >
                  <span>Resolve Online CIBIL Disputes</span>
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

export default CheckCibilByPanPage;
