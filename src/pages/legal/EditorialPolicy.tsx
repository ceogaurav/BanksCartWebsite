import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  ShieldCheck,
  CheckCircle2,
  FileCheck,
  RefreshCw,
  Scale,
  Users,
  Award,
  AlertCircle,
  Mail,
  Building2,
  Calendar,
  Clock
} from 'lucide-react';

const EditorialPolicy: React.FC = () => {
  const pageTitle = "Editorial Integrity, Rate Verification & Fact-Checking Policy | BanksCart";
  const pageDescription = "Learn how BanksCart verifies loan interest rates, conducts weekly bank audits, maintains 100% editorial independence from lenders, and fact-checks financial guides.";
  const canonicalUrl = "https://www.bankscart.com/editorial-policy";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "description": pageDescription,
    "url": canonicalUrl,
    "publisher": {
      "@type": "Organization",
      "name": "BanksCart",
      "url": "https://www.bankscart.com",
      "logo": "https://www.bankscart.com/favicon-32x32.png"
    }
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
            <ol className="flex items-center space-x-2">
              <li><Link to="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li><span>/</span></li>
              <li className="text-slate-800 font-medium" aria-current="page">Editorial Policy</li>
            </ol>
          </nav>

          {/* Hero Header */}
          <section className="bg-white rounded-2xl p-8 lg:p-12 border border-slate-200 shadow-sm space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider rounded-full border border-blue-200">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Financial YMYL Governance & E-E-A-T Standards</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              BanksCart Editorial Integrity & Fact-Checking Policy
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Because personal loans, mortgages, and credit decisions directly impact your financial well-being (Your Money or Your Life), BanksCart adheres to the highest standards of financial accuracy, author accreditation, and commercial independence.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Effective Date: <strong>January 1, 2026</strong></span>
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Last Audited: <strong className="text-emerald-800">October 31, 2026</strong></span>
              </span>
            </div>
          </section>

          {/* Core Policy Sections */}
          <div className="space-y-8">
            {/* 1. Loan Rate Verification Methodology */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  1. Interest Rate & Fee Verification Methodology
                </h2>
              </div>
              <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
                <p>
                  At BanksCart, interest rates, processing charges, APR ranges, and prepayment terms are never assumed or aggregated blindly. Our financial research desk implements a rigorous multi-stage audit methodology:
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>
                    <strong>Direct Bank Schedule Audits:</strong> Every Monday, our team cross-checks rate cards across 30+ leading scheduled commercial banks and RBI-registered NBFCs against their latest public interest notifications.
                  </li>
                  <li>
                    <strong>RBI Circular Synchronization:</strong> Whenever the Reserve Bank of India adjusts the Repo Rate during Monetary Policy Committee (MPC) meetings, our models update Repo-Linked Lending Rate (RLLR) and Marginal Cost of Funds Based Lending Rate (MCLR) benchmarks within 24 hours.
                  </li>
                  <li>
                    <strong>Total Cost of Borrowing:</strong> We mandate the display of full loan economics, including statutory GST on processing fees, documentation charges, stamp duties, and foreclosure lock-in clauses.
                  </li>
                </ul>
              </div>
            </section>

            {/* 2. Editorial Independence from Commissions */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  2. Strict Editorial Independence from Lending Partners
                </h2>
              </div>
              <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
                <p>
                  BanksCart maintains a strict wall between our commercial business development team and our editorial research team:
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>
                    <strong>No Paid Placement in Organic Rankings:</strong> Lenders cannot pay to rank higher in our objective rate comparison tables or calculator algorithms.
                  </li>
                  <li>
                    <strong>Zero Bias toward High-Commission Products:</strong> If an institutional bank offers a higher payout but has poorer loan terms (higher interest or restrictive pre-closure clauses), our editorial recommendation prioritizes the lower-rate product for the consumer.
                  </li>
                  <li>
                    <strong>Sponsored Disclosures:</strong> Any promotional banners or affiliate partnerships are explicitly identified with clear "Sponsored" tags distinct from editorial content.
                  </li>
                </ul>
              </div>
            </section>

            {/* 3. Author Qualifications & Peer Review System */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  3. Author Qualifications & Peer Review System
                </h2>
              </div>
              <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
                <p>
                  Every educational article, CIBIL guide, and lending comparison published on BanksCart must satisfy our dual-layer peer review system:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-blue-700 uppercase">Layer 1: Verified Author Byline</span>
                    <p className="text-xs text-slate-700">
                      Articles must be drafted by certified professionals (Chartered Accountants, Certified Financial Planners, or finance postgraduates) with transparent author bios and active LinkedIn profiles.
                    </p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-xs font-bold text-emerald-700 uppercase">Layer 2: Senior Fact-Checker Sign-Off</span>
                    <p className="text-xs text-slate-700">
                      Before publication, loan formulas, tax codes, and eligibility parameters are audited by veteran banking officers (ex-SBI/HDFC) or CFA charterholders.
                    </p>
                  </div>
                </div>
                <p className="pt-2">
                  Meet our certified editorial team: <Link to="/author/raghav-singhal" className="text-blue-600 font-semibold hover:underline">Raghav Singhal (FCA, CFP)</Link>, <Link to="/author/amit-khurana" className="text-blue-600 font-semibold hover:underline">Amit Khurana (CFA, ex-SBI)</Link>, and <Link to="/author/neha-verma" className="text-blue-600 font-semibold hover:underline">Neha Verma (CFP)</Link>.
                </p>
              </div>
            </section>

            {/* 4. Clear Dating Conventions */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  4. Transparent Dating Conventions
                </h2>
              </div>
              <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
                <p>
                  Financial guidelines, tax deductions, and bank rate sheets evolve rapidly. To prevent outdated advice:
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>
                    Every article prominently displays both the original <strong>"Published on"</strong> timestamp and the recent <strong>"Last Updated & Fact-Checked"</strong> date.
                  </li>
                  <li>
                    Articles containing loan rates or tax calculations undergo mandatory quarterly re-auditing. If a policy has lapsed (e.g., past PMAY subsidy windows), it is updated or archived immediately.
                  </li>
                </ul>
              </div>
            </section>

            {/* 5. Correction Policy & Public Accountability */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  5. Correction Policy & Reader Submissions
                </h2>
              </div>
              <div className="text-sm text-slate-600 space-y-3 leading-relaxed">
                <p>
                  We are committed to prompt transparency. If an error in an interest rate, bank eligibility mandate, or calculation is identified:
                </p>
                <ul className="space-y-2 list-disc pl-5">
                  <li>
                    <strong>Correction TAT:</strong> Errors are investigated and rectified within 24 business hours of notification.
                  </li>
                  <li>
                    <strong>Revision Note:</strong> Significant corrections include a transparent editor's note at the base of the article explaining the modification.
                  </li>
                  <li>
                    <strong>Submit a Correction:</strong> Readers, banking officers, and consumer advocates can flag inaccuracies directly by emailing our senior editors at <a href="mailto:editorial@bankscart.com" className="text-blue-600 font-medium">editorial@bankscart.com</a> with the subject line <em>"Correction Request"</em>.
                  </li>
                </ul>
              </div>
            </section>

            {/* Mandatory Regulatory Disclosure & Corporate Details */}
            <section className="bg-slate-900 text-slate-300 rounded-2xl p-8 space-y-4">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                Regulatory Disclosure & Corporate Identity
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                BanksCart is an independent digital loan and credit comparison marketplace. BanksCart is not a licensed bank, NBFC, or credit institution, and does not lend money directly. All loan approvals, interest rates, disbursal terms, and credit decisions are made exclusively at the discretion of RBI-regulated banks and NBFC partners. We do not charge borrowers upfront processing fees for loan matching.
              </p>
              <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 space-y-1 font-mono">
                <p><span className="text-slate-200">Legal Entity:</span> BanksCart Financial Technologies Private Limited</p>
                <p><span className="text-slate-200">CIN:</span> U67190DL2024PTC428910</p>
                <p><span className="text-slate-200">Registered Office:</span> Level 4, Statesman House, Barakhamba Road, Connaught Place, New Delhi - 110001, India</p>
                <p><span className="text-slate-200">Customer Helpline:</span> 1800-200-8900 | +91 11 4100 8900 | support@bankscart.com</p>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default EditorialPolicy;
