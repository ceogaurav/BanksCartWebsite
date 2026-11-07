import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  ChevronDown, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  HelpCircle, 
  BarChart2, 
  AlertCircle,
  FileText
} from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';

const SbiCibilScorePage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What is the minimum CIBIL score required for an SBI Home Loan?",
      a: "State Bank of India (SBI) mandates a minimum CIBIL score of 650 for regular home loan programs. However, to qualify for SBI's lowest home loan interest rates (such as 8.50% p.a.), a score of 750 or higher is required. Applicants with scores between 650 and 749 are charged risk premium markups of 10 to 45 basis points (bps) above the floor rate."
    },
    {
      q: "Can I get an SBI Personal Loan with a CIBIL score of 700?",
      a: "Yes. SBI considers personal loan applications for scores of 700 and above, particularly for salaried corporate employees, defence personnel, and state/central government staff. However, having a score of 750+ provides significant leverage to get instant pre-approved loans with minimal processing fees."
    },
    {
      q: "Does SBI check other credit bureaus besides TransUnion CIBIL?",
      a: "Yes. While TransUnion CIBIL is SBI's primary bureau partner, SBI also pulls reports from Experian, Equifax, or CRIF High Mark to verify cross-institution records, especially for large-ticket MSME and home loans."
    },
    {
      q: "How does an NH or -1 credit score affect SBI loan approval?",
      a: "If you have No History (NH/-1), SBI will not outright reject your application. Instead, SBI underwriters evaluate your monthly salary stability, company categorization (Tier 1 vs Tier 2), bank statement average balance, and job longevity to determine eligibility."
    },
    {
      q: "Why did SBI reject my loan application despite a 760 CIBIL score?",
      a: "Even with a 760 score, SBI may reject loans due to: 1) High Debt-to-Income (DTI) ratio exceeding 50%; 2) Past 'Settled' or 'Written-Off' account status in the last 36 months; 3) Negative remarks on employer tier; or 4) Recent multiple hard inquiries in short succession."
    },
    {
      q: "How soon after improving my score can I reapply for an SBI loan?",
      a: "SBI updates bureau records every 15 to 30 days. It is recommended to wait at least 45 to 60 days after resolving errors or paying off balances before reapplying, ensuring the refreshed score reflects on SBI's underwriting portal."
    }
  ];

  const pageTitle = "SBI CIBIL Score Requirements 2026: Slabs, Rates & Rules | BanksCart";
  const pageDescription = "Check SBI CIBIL score requirements for Home Loans, Personal Loans & Car Loans. Review interest rate slabs, approval chances for 750+ scores, and underwriting rules.";
  const canonicalUrl = "https://bankscart.com/cibil-report/cibil-score-sbi-loans";

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
            "name": "SBI CIBIL Score Requirements",
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
        <Breadcrumb path={["Home", "Credit Score", "SBI CIBIL Score Requirements"]} />

        {/* Hero Section: Institutional Trust Navy / Slate */}
        <section className="bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 rounded-2xl text-white p-6 sm:p-10 shadow-lg border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 rounded-full px-3.5 py-1 text-xs font-semibold text-blue-200 uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              Lender Specific Underwriting Guide
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              SBI CIBIL Score Requirements
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Learn the exact CIBIL score tiers, interest rate markups, and underwriting guidelines applied by State Bank of India across home loans, personal loans, and car loans.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 750+ Unlocks SBI Floor Rates
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> EBLR-Linked Transparency
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
            
            {/* Section 1: SBI Underwriting Overview */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
                How State Bank of India (SBI) Evaluates CIBIL Scores
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                As India's largest public sector lender, State Bank of India (SBI) employs an External Benchmark Lending Rate (EBLR) model strictly coupled with borrower CIBIL score bands. SBI categorizes retail borrowers into transparent risk tiers, rewarding high-score individuals with lower interest margins and waiving administrative processing charges.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                For <strong>Home Loans</strong>, SBI establishes 750 as the benchmark cutoff for prime pricing. Borrowers with scores above 750 receive the lowest EBLR spread. If your score falls between 700 and 749, SBI applies a standard risk markup of 10 to 20 bps. Below 700, stricter underwriting scrutiny is triggered, requiring co-applicants or higher collateral equity margins.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                For <strong>Personal Loans</strong> and express credit, SBI requires consistent repayment history without any '30+ Days Past Due (DPD)' tags in the rolling 24 months. Checking your score in advance ensures you do not trigger hard rejections on SBI's digital lending portals.
              </p>
            </div>

            {/* Section 2: Interest Rate Slabs Table */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
                SBI CIBIL Score Slabs & Expected Interest Rates
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                The table below outlines SBI's credit score tier classifications, approval probabilities, and expected interest rate spreads:
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                      <th className="p-3 font-bold">CIBIL Score Band</th>
                      <th className="p-3 font-bold">Risk Grade</th>
                      <th className="p-3 font-bold">Home Loan Rates (p.a.)</th>
                      <th className="p-3 font-bold">Approval Odds</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-bold text-emerald-700 font-mono tabular-nums">750 - 900</td>
                      <td className="p-3 font-semibold text-emerald-700">Prime (Tier 1)</td>
                      <td className="p-3 font-mono tabular-nums font-bold text-slate-900">8.50% - 8.75%</td>
                      <td className="p-3 text-emerald-700 font-semibold">95% (Fast Track)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-bold text-teal-700 font-mono tabular-nums">700 - 749</td>
                      <td className="p-3 font-semibold text-teal-700">Standard (Tier 2)</td>
                      <td className="p-3 font-mono tabular-nums font-bold text-slate-900">8.75% - 9.05%</td>
                      <td className="p-3 text-slate-700 font-medium">80% (Regular Docs)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-bold text-amber-700 font-mono tabular-nums">650 - 699</td>
                      <td className="p-3 font-semibold text-amber-700">Moderate (Tier 3)</td>
                      <td className="p-3 font-mono tabular-nums font-bold text-slate-900">9.15% - 9.65%</td>
                      <td className="p-3 text-amber-700 font-medium">50% (Requires Scrutiny)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-bold text-rose-700 font-mono tabular-nums">300 - 649</td>
                      <td className="p-3 font-semibold text-rose-700">High Risk</td>
                      <td className="p-3 font-mono tabular-nums text-rose-700 font-bold">&gt; 10.00% / Rejected</td>
                      <td className="p-3 text-rose-700 font-medium">&lt; 15% (Rejection Likely)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 3: Essential Requirements Checklist */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
                Key Factors SBI Checks Beyond the 3-Digit Score
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                SBI's automated risk engine conducts holistic profile evaluations. Keep the following criteria in mind before applying:
              </p>

              <div className="space-y-3 mt-4">
                <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    A
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Debt-to-Income (DTI / FOIR) Ratio</h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      SBI caps Fixed Obligation to Income Ratio (FOIR) at 45% to 55%. If your existing EMIs consume more than half your net monthly income, approval chances drop regardless of a 750 score.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    B
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Zero 'Settled' or 'Written-Off' Flags</h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      SBI automated underwriting immediately flags credit reports bearing settled or written-off labels within the last 36 months, requiring manual branch manager dispensation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    C
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Salary Account Relationship</h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      Customers who maintain their primary salary account with SBI receive special interest rate concessions (typically 5 to 10 bps) and instant processing via YONO.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Key Financial Takeaway Callout */}
            <div className="border-l-4 border-[#1E3A8A] bg-blue-50/60 p-5 rounded-r-xl space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-[#1E3A8A]" />
                <span>Pro Tip for SBI Loan Applicants</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Before applying for an SBI home or personal loan, check your CIBIL score on BanksCart. If your score is around 735-740, taking 30 days to pay down credit card balances can push you over 750, unlocking SBI's lowest interest rate slab and saving thousands in EMI over the loan tenure.
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
                  <p className="text-xs text-slate-500">Instant Pre-Check for SBI Eligibility</p>
                </div>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-bold">
                  <Lock className="w-3 h-3" /> SSL Secured
                </span>
              </div>

              <CibilCheckerForm sourcePage="SBI CIBIL Score Landing Page" />
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

export default SbiCibilScorePage;
