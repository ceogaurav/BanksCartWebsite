import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Scale,
  Clock,
  ArrowRight,
  HelpCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  FileText,
  UserCheck,
  ShieldCheck,
  BadgeAlert
} from 'lucide-react';

const CreditRectificationPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const pageTitle = "Credit Rectification Service: Dispute Errors & Improve CIBIL Score | BanksCart";
  const pageDescription = "Fix errors on your CIBIL report with expert credit rectification guidance. Resolve wrongful overdue tags, update settlement statuses, and rebuild your credit rating.";
  const canonicalUrl = "https://www.bankscart.com/credit-score/credit-rectification-service";

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Credit Rectification Service",
    "serviceType": "Financial Consulting & Dispute Resolution Guidance",
    "description": pageDescription,
    "url": canonicalUrl,
    "provider": {
      "@type": "Organization",
      "name": "BanksCart",
      "url": "https://www.bankscart.com"
    },
    "areaServed": "IN"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.bankscart.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Credit Score",
        "item": "https://www.bankscart.com/credit-score"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Credit Rectification Service",
        "item": canonicalUrl
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How long does CIBIL take to resolve a formal credit report dispute?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Under RBI guidelines, credit bureaus (CIBIL, Experian, Equifax, CRIF High Mark) and partner lenders must resolve formal disputes and update credit records within 30 calendar days."
        }
      },
      {
        "@type": "Question",
        "name": "Can credit rectification remove legitimate defaults or genuine missed payments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Legitimate defaults or factual missed payments cannot be legally removed. Credit rectification strictly targets clerical inaccuracies, wrongful default tags, identity mismatches, and closed accounts erroneously showing active."
        }
      },
      {
        "@type": "Question",
        "name": "What documents are required to initiate a credit rectification request?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You require your recent credit report containing the unique 9-digit Control Number (ECN), proof of identity (PAN/Aadhaar), and supporting closure documents such as a bank No Dues Certificate (NOC) or payment receipt."
        }
      },
      {
        "@type": "Question",
        "name": "How much can my CIBIL score increase after error rectification?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Once wrongful 'Written-Off' or 90+ DPD default flags are rectified, borrowers frequently witness a 50 to 120 point score rebound within 1 to 2 subsequent bureau refresh cycles."
        }
      }
    ]
  };

  const faqs = [
    {
      q: "How long does CIBIL take to resolve a formal credit report dispute?",
      a: "Under RBI guidelines, credit bureaus (CIBIL, Experian, Equifax, CRIF High Mark) and partner lenders must resolve formal disputes and update credit records within 30 calendar days. If the lender fails to respond within the mandated window, the bureau must either escalate or delete the unverified negative entry."
    },
    {
      q: "Can credit rectification remove legitimate defaults or genuine missed payments?",
      a: "No. Any agency promising to 'erase genuine defaults' is operating an illegal scam. Credit rectification strictly identifies and remedies factual errors, administrative lags, fraudulent loans taken in your name, and wrongful settlement remarks."
    },
    {
      q: "What documents are required to initiate a credit rectification request?",
      a: "You will need a fresh copy of your credit report showing the unique Enquiry Control Number (ECN), your PAN card, Aadhaar card, and documentary evidence from the lender—such as a No Dues Certificate (NOC), account closure statement, or loan settlement letter."
    },
    {
      q: "How much can my CIBIL score increase after error rectification?",
      a: "Depending on the severity of the error, correcting a wrongful 'Written-Off' or 'Days Past Due (DPD)' mark can improve your CIBIL score by 50 to 120 points once the lender reports the updated status in their fortnightly RBI data feed."
    },
    {
      q: "What should I do if the lender rejects my dispute petition?",
      a: "If the commercial lender fails to acknowledge or wrongfully rejects your valid dispute accompanied by an NOC, you can escalate the matter directly to the Principal Nodal Officer of the bank, and subsequently to the RBI Banking Ombudsman (cms.rbi.org.in)."
    }
  ];

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="credit rectification service india, cibil dispute resolution, fix credit score errors, remove overdue tags from cibil, credit repair india" />
        <link rel="canonical" href={canonicalUrl} />

        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify(serviceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><span>/</span></li>
              <li><Link to="/credit-score" className="hover:text-blue-600 transition-colors">Credit Score</Link></li>
              <li><span>/</span></li>
              <li className="text-slate-800 font-medium" aria-current="page">Credit Rectification Service</li>
            </ol>
          </nav>

          {/* Hero Header */}
          <section className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-8 lg:p-14 shadow-xl relative overflow-hidden space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-yellow-300 text-xs font-bold uppercase tracking-wider rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Credit Bureau Dispute &amp; Recovery Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white max-w-4xl">
              Expert Credit Rectification &amp; CIBIL Dispute Resolution Guidance
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
              Identify bureau inaccuracies, challenge wrongful default remarks, resolve administrative reporting delays, and systematically rebuild your creditworthiness under Reserve Bank of India (RBI) consumer protection frameworks.
            </p>

            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/credit-score"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-colors"
              >
                Check Free CIBIL Score
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <Link
                to="/credit-health-report-services"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-colors backdrop-blur-md"
              >
                Detailed Credit Health Report
              </Link>
            </div>
          </section>

          {/* Section 1: What is Credit Rectification */}
          <section className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full">
              <FileCheck className="w-3.5 h-3.5" />
              <span>Core Foundations</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              What is Credit Rectification &amp; How Does It Help Your CIBIL Score?
            </h2>

            <div className="space-y-4 text-slate-600 leading-relaxed text-sm sm:text-base">
              <p>
                <strong>Credit rectification</strong> is the formal, legally sanctioned procedure through which Indian retail borrowers petition credit bureaus—including TransUnion CIBIL, Experian, Equifax, and CRIF High Mark—to correct erroneous, outdated, or fraudulent entries recorded on their credit files.
              </p>
              <p>
                Under Reserve Bank of India (RBI) data reporting mandates, all scheduled commercial banks and NBFCs must submit credit transaction logs on a fortnightly basis. However, due to administrative backlogs, technical synchronization errors, or human clerical mistakes, paid-off loans frequently continue to show as active defaults, severely depressing borrower credit scores.
              </p>
              <p>
                Engaging in structured credit rectification eliminates these unauthorized negative marks, restores your accurate debt profile, and enables you to qualify for prime lending rates (starting from 10.25% on personal loans and 8.35% on home loans).
              </p>
            </div>
          </section>

          {/* Section 2: Common Credit Report Errors */}
          <section className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 text-rose-700 text-xs font-semibold uppercase tracking-wider rounded-full">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Error Identification</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Common Credit Report Errors: Identity Theft, Wrongful Overdue &amp; Outdated Balances
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Over 18% of consumer credit reports in India contain at least one recording discrepancy. Review the most frequent error categories:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
                  <BadgeAlert className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Wrongful Overdue &amp; DPD Tags</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Lenders fail to update payment status despite timely EMI realization, incorrectly logging 30–90+ Days Past Due (DPD) tags that immediately drop your score.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Identity Theft &amp; Mismatched PAN</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Similar names or mistyped PAN numbers result in another borrower’s defaulted credit cards or unserviced loans getting erroneously attached to your credit file.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Outdated Closure &amp; Settlement Remarks</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Loans fully repaid years ago remain marked as "Active" or wrongfully designated as "Settled" / "Written-Off" rather than "Closed" with zero balance.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Step-by-Step CIBIL Online Dispute Resolution Process */}
          <section className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Dispute Protocol</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Step-by-Step CIBIL Online Dispute Resolution Process
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm mx-auto flex items-center justify-center">1</div>
                <h4 className="font-bold text-slate-900 text-sm">Download Credit Report</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Procure your updated multi-bureau report containing the 9-digit Enquiry Control Number (ECN).</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm mx-auto flex items-center justify-center">2</div>
                <h4 className="font-bold text-slate-900 text-sm">Submit Online Petition</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Log in to the bureau dispute portal, select the erroneous trade line, and specify the dispute reason.</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm mx-auto flex items-center justify-center">3</div>
                <h4 className="font-bold text-slate-900 text-sm">Lender Verification</h4>
                <p className="text-xs text-slate-600 leading-relaxed">The bureau forwards the query to the originating bank for verification under 30-day statutory guidelines.</p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-center">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm mx-auto flex items-center justify-center">4</div>
                <h4 className="font-bold text-slate-900 text-sm">Score Recalculation</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Upon lender confirmation, the negative entry is expunged and your CIBIL score is recomputed.</p>
              </div>
            </div>
          </section>

          {/* Section 4: Legitimate Credit Repair vs Illegal Scams */}
          <section className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 lg:p-12 rounded-2xl shadow-lg space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-yellow-300 text-xs font-semibold uppercase tracking-wider rounded-full border border-white/20">
              <Scale className="w-3.5 h-3.5" />
              <span>Consumer Awareness</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Legitimate Credit Repair vs Illegal Score-Fixing Scams: What Borrowers Must Know
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="p-6 rounded-xl bg-white/5 border border-emerald-500/30 space-y-3">
                <h3 className="font-bold text-emerald-400 text-base flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Legitimate Credit Rectification
                </h3>
                <ul className="space-y-2 text-slate-300 text-xs leading-relaxed">
                  <li>• Corrects clerical, administrative, and data transmission errors.</li>
                  <li>• Operates within official RBI-mandated bureau dispute mechanisms.</li>
                  <li>• Requires valid proof of payment, NOCs, or bank account statements.</li>
                  <li>• Emphasizes long-term debt restructuring and credit discipline.</li>
                </ul>
              </div>

              <div className="p-6 rounded-xl bg-white/5 border border-rose-500/30 space-y-3">
                <h3 className="font-bold text-rose-400 text-base flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5" />
                  Illegal Score-Fixing Scams
                </h3>
                <ul className="space-y-2 text-slate-300 text-xs leading-relaxed">
                  <li>• Falsely claims to "permanently delete genuine unpaid defaults".</li>
                  <li>• Demands exorbitant upfront cash fees with "guaranteed 800+ score in 24 hours".</li>
                  <li>• Advises creating fake CPNs or forging identity documents (criminal offense).</li>
                  <li>• Lacks corporate registration, grievance redressal, or legal accountability.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 5: FAQs */}
          <section className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FAQ Guide</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions on Credit Bureau Rectification Timelines
            </h2>

            <div className="divide-y divide-slate-200">
              {faqs.map((faq, index) => (
                <div key={index} className="py-4">
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full flex items-center justify-between text-left text-base font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {activeFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                    )}
                  </button>
                  {activeFaq === index && (
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed font-normal">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default CreditRectificationPage;
