import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  BarChart2, 
  ChevronDown, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  HelpCircle, 
  AlertCircle,
  Building2,
  PieChart,
  Briefcase
} from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
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
    }
  ];

  const pageTitle = "CIBIL Score for Personal Loan: Minimum Score, Rates & Slabs | BanksCart";
  const pageDescription = "Check the minimum CIBIL score required for personal loans in India. Understand interest rate slabs (750+ score), underwriting rules, approval criteria, and how to qualify with an average score.";
  const canonicalUrl = "https://bankscart.com/credit-score/cibil-score-for-personal-loan";

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
            "name": "CIBIL Score for Personal Loans",
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
        <Breadcrumb path={["Home", "Credit Score", "CIBIL Score for Personal Loans"]} />

        {/* Hero Section: Institutional Trust Navy / Slate */}
        <section className="bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 rounded-2xl text-white p-6 sm:p-10 shadow-lg border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 rounded-full px-3.5 py-1 text-xs font-semibold text-blue-200 uppercase tracking-wider">
              <BarChart2 className="w-3.5 h-3.5 text-blue-400" />
              Unsecured Lending Guide
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              CIBIL Score for Personal Loan
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Learn the critical credit score tiers required to secure unsecured personal loans with the lowest interest rate approvals and zero collateral.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 750+ Unlocks Prime Rates (10.49%)
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Instant Bureau Underwriting
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400" /> Soft Pull Guaranteed
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
                The Direct Link Between CIBIL and Unsecured Credits
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Unlike home or vehicle loans where lenders retain property collateral, <strong>Personal Loans</strong> are entirely unsecured. Since the lender takes on higher absolute risk, your <strong>CIBIL score</strong> acts as the definitive key. Lenders evaluate your report to determine if you are historically responsible with credit, and whether your debt load is manageable.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                A CIBIL score of <strong>720+</strong> is generally the gateway score to personal loan offers. A score above <strong>750</strong> grants you leverage to bargain for lower interest rates and processing fee waivers. When you apply, the underwriting engine queries your payment logs, credit mixes, and active revolving card balances to decide your ultimate risk grade.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                If your score is average or poor, lenders will classify you as a high-risk borrower. This results in loan rejections, or high interest rates (up to 24%-36% p.a.) coupled with steep administrative charges.
              </p>
            </div>

            {/* Section 2: Personal Loan Approval Metrics Table */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
                Personal Loan Approval Metrics by Credit Score
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Detailed breakdown of loan eligibility, expected interest bands, and documentation rigor across credit tiers:
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                      <th className="p-3 font-bold">CIBIL Score Slabs</th>
                      <th className="p-3 font-bold">Interest Rates (p.a.)</th>
                      <th className="p-3 font-bold">Approval Chances</th>
                      <th className="p-3 font-bold">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-bold text-emerald-700 font-mono tabular-nums">750 - 900</td>
                      <td className="p-3 font-semibold text-slate-900 font-mono tabular-nums">10.49% - 13.99%</td>
                      <td className="p-3 font-medium text-emerald-700">95% (Prime Borrower)</td>
                      <td className="p-3 text-slate-500">Fast approval, zero collateral</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-bold text-teal-700 font-mono tabular-nums">700 - 749</td>
                      <td className="p-3 font-semibold text-slate-900 font-mono tabular-nums">14.00% - 17.99%</td>
                      <td className="p-3 font-medium text-slate-700">75% (Likely Approval)</td>
                      <td className="p-3 text-slate-500">Standard documentation required</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-bold text-amber-700 font-mono tabular-nums">650 - 699</td>
                      <td className="p-3 font-semibold text-slate-900 font-mono tabular-nums">18.00% - 24.00%</td>
                      <td className="p-3 font-medium text-amber-700">40% (Conditional)</td>
                      <td className="p-3 text-slate-500">Requires co-applicant or salary proof</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-bold text-rose-700 font-mono tabular-nums">300 - 649</td>
                      <td className="p-3 font-semibold text-rose-700 font-mono tabular-nums">&gt; 24% or Rejected</td>
                      <td className="p-3 font-medium text-rose-700">Very Low (&lt;10%)</td>
                      <td className="p-3 text-slate-500">High rejection probability</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 3: Underwriting Factors */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
                Additional Factors Lenders Check Beyond CIBIL
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                While a high CIBIL score is crucial, banks also analyze the following underwriting criteria before finalizing personal loans:
              </p>

              <div className="space-y-3 mt-4">
                <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    A
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Employer Classification</h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      Banks categorize companies into Super-A, Category-A, Category-B, and others. Employees of top multinational corporations or government services enjoy lowest risk margins, yielding lower interest rates.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    B
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Debt-to-Income (DTI) Ratio</h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      Measures your total monthly EMI components against your net take-home salary. Lenders prefer DTI ratios strictly below 45%-50% to ensure you are not over-leveraged.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    C
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Employment Stability</h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      Most lenders require a minimum of 2 years of overall work experience, with at least 6 months to 1 year of continuous service with your current employer.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Key Financial Takeaway Callout */}
            <div className="border-l-4 border-[#1E3A8A] bg-blue-50/60 p-5 rounded-r-xl space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-[#1E3A8A]" />
                <span>Approval Tip for Average Scores</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                If your score is between 680 and 720, apply with the bank holding your primary salary account. Relationship longevity and payroll track record frequently grant internal credit policy waivers.
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
                  <p className="text-xs text-slate-500">Instant Pre-Check for Loan Approval</p>
                </div>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-bold">
                  <Lock className="w-3 h-3" /> SSL Secured
                </span>
              </div>

              <CibilCheckerForm sourcePage="Personal Loan CIBIL Landing Page" />
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
                  to="/cibil/how-to-resolve-cibil-dispute"
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-blue-700 transition-colors border border-transparent hover:border-slate-200"
                >
                  <span>Resolve Online CIBIL Disputes</span>
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

export default CibilScoreForPersonalLoanPage;
