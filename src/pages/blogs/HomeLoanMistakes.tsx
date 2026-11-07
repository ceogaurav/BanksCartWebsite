import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  AlertTriangle,
  XCircle,
  CheckCircle2,
  ShieldCheck,
  Scale,
  DollarSign,
  FileText,
  Clock,
  Building,
  HelpCircle,
  TrendingDown
} from 'lucide-react';

export default function HomeLoanMistakes() {
  const canonicalUrl = "https://www.bankscart.com/blog/Home-Loan-Mistakes";
  const articleTitle = "Top 10 Costly Mistakes to Avoid When Applying for a Home Loan in India (2026)";
  const articleDesc = "Avoid major mortgage mistakes: discover how to protect your CIBIL score, calculate real FOIR, verify RERA compliance, manage down payments, and save lakhs on interest.";

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "headline": articleTitle,
    "description": articleDesc,
    "image": "https://www.bankscart.com/assets/images/bankscart-logo.png",
    "author": {
      "@type": "Person",
      "name": "Amit Khurana",
      "jobTitle": "Senior Banking Advisor & Principal Reviewer",
      "url": "https://www.bankscart.com/author/amit-khurana"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BanksCart",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.bankscart.com/assets/images/bankscart-logo.png"
      }
    },
    "datePublished": "2026-01-10T09:00:00+05:30",
    "dateModified": "2026-11-06T10:00:00+05:30"
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
        "name": "Blog",
        "item": "https://www.bankscart.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Home Loan Mistakes",
        "item": canonicalUrl
      }
    ]
  };

  const mistakesList = [
    {
      num: "01",
      title: "Applying Without Checking Your CIBIL Report First",
      desc: "Applying with a score below 750 or uncorrected reporting errors often leads to rejection or higher risk-tier pricing (up to 0.75% higher interest, costing ₹6+ Lakhs over a 20-year loan).",
      fix: "Download your free official CIR report at least 3 months in advance and rectify overdue status markers."
    },
    {
      num: "02",
      title: "Miscalculating FOIR (Fixed Obligation to Income Ratio)",
      desc: "Borrowers frequently assume lenders approve loans if EMI is 50% of salary, forgetting that existing credit card minimums, car loans, and consumer EMIs are subtracted first.",
      fix: "Keep all monthly debt obligations under 40% of net income before submitting loan documents."
    },
    {
      num: "03",
      title: "Forgetting Ancillary Costs (Stamp Duty & Registration)",
      desc: "Lenders only finance 75% to 90% of the property value. Stamp duty (5-7%), registration (1%), GST on under-construction units (5%), and interior fit-out must be paid out-of-pocket in cash.",
      fix: "Budget an extra 10% to 15% above the agreement value for mandatory government taxes and legal charges."
    },
    {
      num: "04",
      title: "Making Simultaneous Multiple Loan Applications",
      desc: "Applying to 5 banks simultaneously triggers 5 hard inquiries within days. Underwriting algorithms flag this as 'credit-hungry desperation', potentially downgrading your risk tier.",
      fix: "Compare offers via soft-inquiry digital marketplaces like BanksCart before submitting formal login files."
    },
    {
      num: "05",
      title: "Wiping Out Your Entire Emergency Fund for Down Payment",
      desc: "Pouring every single rupee of savings into the down payment leaves you vulnerable to sudden medical emergencies, job transitions, or unexpected property maintenance costs.",
      fix: "Always maintain at least 6 months of living expenses and EMIs in liquid fixed deposits or savings accounts."
    },
    {
      num: "06",
      title: "Overlooking RERA Approval & Clear Title Deeds",
      desc: "Investing in a project without RERA registration or clear 30-year mother deed title documentation will cause bank legal verification to fail, forfeiting your booking token.",
      fix: "Always obtain the RERA registration number and encumbrance certificate (EC) before paying earnest money."
    },
    {
      num: "07",
      title: "Blindly Accepting Lender-Bundled Single-Premium Insurance",
      desc: "Banks often bundle expensive single-premium loan protection policies into the loan principal, charging interest on the insurance premium for the entire 20-year loan term.",
      fix: "Opt for a standalone pure term life insurance policy assigned to the lender; it provides better coverage at a fraction of the cost."
    },
    {
      num: "08",
      title: "Adding Co-Borrowers with Compromised Credit Histories",
      desc: "Adding a spouse or parent who has past default tags, settlements, or CIBIL scores below 680 can drag down an otherwise healthy application.",
      fix: "Audit all prospective co-applicants' CIBIL reports before adding them to the mortgage application."
    },
    {
      num: "09",
      title: "Ignoring Prepayment Penalties & Reset Clauses",
      desc: "While floating rate home loans to individuals carry 0% foreclosure charges by RBI mandate, fixed-rate loans or loans to business entities often carry hefty 2% to 4% exit penalties.",
      fix: "Verify floating repo-linked benchmark terms (EBLR/RLLR) and ensure zero penalties on early principal prepayments."
    },
    {
      num: "10",
      title: "Not Negotiating Processing Fees and Legal Valuation Charges",
      desc: "Borrowers often pay 0.50% to 1.00% processing fees unnecessarily. During festive quarters, tier-1 public and private banks frequently waive or cap processing fees.",
      fix: "Ask for a processing fee waiver or flat fee cap (e.g., ₹5,000 to ₹10,000) prior to sanction letter execution."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pt-20 sm:pt-24 pb-16">
      <Helmet>
        <title>{`${articleTitle} | BanksCart`}</title>
        <meta name="description" content={articleDesc} />
        <link rel="canonical" href={canonicalUrl} />
        <script type="application/ld+json">
          {JSON.stringify(blogPostingSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Breadcrumb path={["Home", "Blog", "Home Loan Mistakes"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-rose-700">
            <span className="bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
              Risk Mitigation Guide
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">14 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Top 10 Costly Mistakes to Avoid When Applying for a Home Loan
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A home loan is usually the largest financial liability of a borrower's life. Even minor oversights in FOIR calculations, CIBIL inquiry timing, or property title checks can cost hundreds of thousands in unnecessary interest or lead to summary loan rejection.
          </p>

          <AuthorByline authorSlug="amit-khurana" />
        </header>

        {/* 10 Mistakes Grid */}
        <div className="space-y-6">
          {mistakesList.map((item) => (
            <section
              key={item.num}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-lg border border-rose-200 font-mono">
                  Mistake #{item.num}
                </span>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {item.title}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {item.desc}
              </p>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-2 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>How to Protect Yourself:</strong> {item.fix}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* Financial Conversion Callout */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Pre-Approval Check
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Ready to Apply Without Costly Surprises?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Check your verified eligibility across top Indian banks, compare repo-linked rates, and calculate exact monthly EMIs before locking your sanction.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/loans/home/overview"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Compare Live Home Loan Rates &rarr;
            </Link>
            <Link
              to="/home-loan-emi-calculator"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Calculate Home Loan EMI
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Regulatory Notice & Lending Disclaimer</span>
          </div>
          <p>
            BanksCart is an independent digital loan marketplace. All loan applications are subjected to individual lender credit policies, legal searches, and technical property valuations. Borrowers are advised to read sanction terms and loan agreements thoroughly before execution.
          </p>
        </div>
      </article>
    </div>
  );
}
