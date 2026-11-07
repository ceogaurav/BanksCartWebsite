import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  ChevronDown, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  HelpCircle, 
  AlertCircle,
  FileText,
  CreditCard,
  PieChart,
  Clock
} from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumb';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';

const WaysToImproveCibilPage: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How fast can I realistically increase my CIBIL score?",
      a: "Credit scores do not jump overnight. Banks report repayment logs to bureaus once every 30 to 45 days. If you immediately pay off high credit card balances to bring utilization under 30%, you can see an upward jump of 30 to 60 points within 1 to 2 reporting cycles. Repairing past defaults or settled accounts takes 6 to 12 months of disciplined on-time payments."
    },
    {
      q: "Does closing old unused credit cards improve my CIBIL score?",
      a: "No, closing old credit cards often damages your score. Closing an old card reduces your overall credit limit (which instantly inflates your Credit Utilization Ratio) and shortens the average age of your credit history. Keep old cards open, make occasional small purchases, and pay them off completely."
    },
    {
      q: "What is the optimal Credit Utilization Ratio (CUR) to aim for?",
      a: "Credit bureaus recommend maintaining your credit card utilization strictly below 30% of your total credit limit. For example, if your total credit limit across all cards is ₹1,00,000, keep your total billing balance below ₹30,000. Prime borrowers who score 800+ routinely maintain utilization under 10% to 15%."
    },
    {
      q: "Can paying off all my debts at once instantly erase a default mark?",
      a: "Paying off overdue balances changes the status from 'Default' to 'Closed' or 'Paid'. While the historical delay marks remain on your report for up to 36 months, an updated clean track record demonstrates to lenders that you have taken corrective responsibility, allowing your score to steadily recover."
    },
    {
      q: "How does a Fixed Deposit (FD) backed credit card help rebuild credit?",
      a: "Secured credit cards (issued against an FD of ₹10,000 to ₹50,000) require no income proof or CIBIL check. The issuing bank reports your monthly repayments to TransUnion CIBIL just like a regular card. Making timely payments on a secured card is the fastest guaranteed method for individuals with poor scores (or no credit history) to rebuild a 750+ score."
    },
    {
      q: "Will taking a small personal loan help improve my credit mix?",
      a: "Yes. Having only credit cards (unsecured revolving debt) can limit your score. Adding an installment loan (like a small personal or consumer durable loan) and paying all EMIs on time diversifies your portfolio, positively contributing 10% to your bureau score calculation."
    }
  ];

  const pageTitle = "10 Proven Ways to Improve CIBIL Score Fast in 2026 | BanksCart";
  const pageDescription = "Learn 10 actionable, expert strategies to improve your CIBIL score from 600 to 750+. Understand credit utilization, dispute rectifications, and timeline milestones.";
  const canonicalUrl = "https://bankscart.com/credit-report/ways-to-improve-your-cibil-score";

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
            "name": "Ways to Improve CIBIL Score",
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
        <Breadcrumb path={["Home", "Credit Score", "Ways to Improve CIBIL Score"]} />

        {/* Hero Section: Institutional Trust Navy / Slate */}
        <section className="bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 rounded-2xl text-white p-6 sm:p-10 shadow-lg border border-slate-800">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 rounded-full px-3.5 py-1 text-xs font-semibold text-blue-200 uppercase tracking-wider">
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              Score Improvement Roadmap
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Ways to Improve CIBIL Score
            </h1>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Actionable, data-backed strategies to elevate your credit score to the prime 750+ tier. Learn the exact algorithmic levers that drive credit score recovery in India.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 30-Day Bureau Refresh Cycles
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> RBI Compliant Strategies
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400" /> Free Score Health Auditing
              </span>
            </div>
          </div>
        </section>

        {/* Two-Column Structured Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column (7 cols): Publication-Grade Unified Article Container */}
          <article className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-10 text-slate-700">
            
            {/* Section 1: The Core Scoring Levers */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
                The 5 Algorithmic Levers of Your CIBIL Score
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Your CIBIL score is a dynamic 3-digit numerical summary (ranging from 300 to 900) calculated by TransUnion CIBIL using a proprietary mathematical algorithm. To improve your score efficiently, you must target the specific weights that lenders look at:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm text-slate-900">1. Repayment Track</span>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono">35% Weight</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Paying 100% of EMIs and card bills before the due date. The single biggest driver of high scores.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm text-slate-900">2. Credit Utilization</span>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-mono">30% Weight</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Keeping card spending strictly under 30% of your approved limits signals healthy spending restraint.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm text-slate-900">3. Credit Vintage</span>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">15% Weight</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    The average age of your oldest active credit card or loan accounts. Older accounts reflect stability.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm text-slate-900">4. Credit Mix & Inquiries</span>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded font-mono">20% Weight</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    A balanced mix of secured (Home/Auto) and unsecured loans, with minimal recent hard loan inquiries.
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2: Actionable Step-by-Step Improvement Plan */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
                Actionable 4-Step Strategy to Reach 750+
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Implement these proven steps in order of priority to systematically boost your credit score:
              </p>

              <div className="space-y-4 mt-4">
                <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Pay Down Revolving Balances Immediately</h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      If your credit cards are at 70% to 90% utilization, pay them down below 30%. Because card balances are reported monthly, reducing utilization produces the fastest 30 to 50 point upward rebound.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Automate 100% of Monthly EMI & Card Bills</h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      Set up automated e-NACH mandates for full monthly card statements (not just the Minimum Amount Due). A single missed payment creates a 30+ DPD mark that takes 24 to 36 months to dilute.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Audit for Bureau Discrepancies & Dispute</h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      Frequently, banks fail to update closed loan records or wrongly attribute another person's late payment to your PAN. Raising an online dispute on CIBIL removes erroneous defaults within 30 days.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Build Positive History with a Secured Card</h3>
                    <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                      If past defaults damaged your score, banks will reject regular cards. Obtain a fixed-deposit (FD) backed credit card. Using 15% of its limit and paying on time rebuilds your score to 750+ within 6 to 9 months.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Recovery Timeline Milestones Table */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <span className="w-1.5 h-6 bg-[#1E3A8A] rounded-full"></span>
                Score Recovery Timeline & Expectations
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Realistic timelines based on credit reporting bureau cycles across India:
              </p>

              <div className="overflow-x-auto rounded-xl border border-slate-200">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-900">
                      <th className="p-3 font-bold">Action Taken</th>
                      <th className="p-3 font-bold">Expected Score Impact</th>
                      <th className="p-3 font-bold">Turnaround Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-semibold text-slate-900">Reducing Card Utilization below 30%</td>
                      <td className="p-3 font-mono tabular-nums text-emerald-700 font-bold">+30 to +55 Points</td>
                      <td className="p-3 text-slate-600 font-medium">30 - 45 Days</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-semibold text-slate-900">Resolving an Erroneous Dispute on CIBIL</td>
                      <td className="p-3 font-mono tabular-nums text-emerald-700 font-bold">+40 to +80 Points</td>
                      <td className="p-3 text-slate-600 font-medium">Within 30 Days (RBI Limit)</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-semibold text-slate-900">Rebuilding after Settled / Written-off Account</td>
                      <td className="p-3 font-mono tabular-nums text-blue-700 font-bold">+70 to +120 Points</td>
                      <td className="p-3 text-slate-600 font-medium">6 - 12 Months</td>
                    </tr>
                    <tr className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 font-semibold text-slate-900">Adding a Secured Card for First-Timers</td>
                      <td className="p-3 font-mono tabular-nums text-blue-700 font-bold">Establishes 750+ Score</td>
                      <td className="p-3 text-slate-600 font-medium">6 Months of Clean Swipes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 4: Key Financial Takeaway Callout */}
            <div className="border-l-4 border-[#1E3A8A] bg-blue-50/60 p-5 rounded-r-xl space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <AlertCircle className="w-4 h-4 text-[#1E3A8A]" />
                <span>Avoid Multiple Hard Inquiries</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                When rejected for a loan, resist applying immediately with other lenders. Every formal loan application triggers a 'Hard Inquiry' that knocks 2 to 5 points off your score. Instead, audit your report on BanksCart (zero impact soft pull) and resolve underlying factors first.
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
                  <p className="text-xs text-slate-500">Track Score Progress • Zero Bureau Impact</p>
                </div>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[11px] font-bold">
                  <Lock className="w-3 h-3" /> SSL Secured
                </span>
              </div>

              <CibilCheckerForm sourcePage="Ways to Improve CIBIL Landing Page" />
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

export default WaysToImproveCibilPage;
