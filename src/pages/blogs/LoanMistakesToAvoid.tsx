import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumb';
import { AuthorByline } from '../../components/blog/AuthorByline';
import {
  AlertTriangle,
  CheckCircle2,
  Percent,
  Clock,
  ShieldCheck,
  Building,
  HelpCircle,
  FileCheck2,
  TrendingDown,
  Scale
} from 'lucide-react';

export default function LoanMistakesToAvoid() {
  const canonicalUrl = "https://www.bankscart.com/blog/Loan-Mistakes-To-Avoid";
  const articleTitle = "Top 10 Costly Mistakes to Avoid When Taking a Loan in India (2026)";
  const articleDesc = "Avoid major retail borrowing pitfalls: flat vs reducing interest tricks, hard inquiry traps, ignoring APRs, speculative borrowing risks, and foreclosure penalty clauses.";

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
      "name": "Raghav Singhal",
      "jobTitle": "Lead Financial Analyst & Debt Strategist",
      "url": "https://www.bankscart.com/author/raghav-singhal"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BanksCart",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.bankscart.com/assets/images/bankscart-logo.png"
      }
    },
    "datePublished": "2026-01-23T09:00:00+05:30",
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
        "name": "Loan Mistakes to Avoid",
        "item": canonicalUrl
      }
    ]
  };

  const mistakes = [
    {
      num: "01",
      title: "Falling for 'Flat Rate' vs. 'Reducing Balance' Tricks",
      desc: "A lender advertising a '6% Flat Rate' sounds much cheaper than an '11% Reducing Rate'. In reality, a 6% flat interest equates to roughly 11.2% reducing rate because you pay interest on the full initial loan even after repaying principal!",
      fix: "Always insist on seeing the Reducing Balance APR on the official Key Fact Statement (KFS)."
    },
    {
      num: "02",
      title: "Multiple Applications Across Different Banks in the Same Week",
      desc: "Each direct application creates a hard bureau inquiry. Four hard inquiries in 5 days can tank your score by 20 to 35 points and brand you as credit-desperate.",
      fix: "Use independent soft-search comparison portals like BanksCart to check pre-approval before formal login."
    },
    {
      num: "03",
      title: "Ignoring the Annual Percentage Rate (APR)",
      desc: "Lenders often advertise attractive nominal rates while charging 2.5% processing fees, legal verification charges, stamp fees, and mandatory insurance premiums.",
      fix: "Review the single-page KFS mandate to compare true total borrowing cost via APR."
    },
    {
      num: "04",
      title: "Borrowing Beyond Your 40% FOIR Comfort Zone",
      desc: "When monthly EMIs exceed 40% of net monthly income, even a temporary medical issue or delayed appraisal can lead to bounced auto-debit payments.",
      fix: "Ensure all cumulative debt repayments stay below 40% of take-home pay."
    },
    {
      num: "05",
      title: "Taking Personal Loans to Invest in Stocks or Crypto",
      desc: "Leveraging unsecured debt with 12%-18% fixed interest to invest in volatile capital markets is one of the quickest routes to severe financial distress.",
      fix: "Only borrow for essential capital investments or emergency liquidity; never for speculative trading."
    },
    {
      num: "06",
      title: "Overlooking Foreclosure and Part-Payment Penalties",
      desc: "While floating-rate retail loans carry 0% foreclosure penalties, fixed-rate loans often charge 2% to 4% exit fees if you pay off the balance early.",
      fix: "Confirm zero prepayment charges on your sanction letter before signing."
    },
    {
      num: "07",
      title: "Letting NACH / e-Mandate Auto-Debits Bounce",
      desc: "A single bounced ECS/NACH debit incurs both bank bounce charges (₹450 to ₹600 + GST) and immediate DPD reporting to CIBIL.",
      fix: "Maintain a 10-day buffer in your loan repayment bank account before the scheduled EMI deduction date."
    },
    {
      num: "08",
      title: "Accepting Bundled Single-Premium Loan Protection Uncritically",
      desc: "Banks often deduct ₹20,000 to ₹50,000 upfront for credit life insurance, adding it to your loan balance where it accrues interest for years.",
      fix: "Compare standalone term insurance policies which offer 5x higher coverage at lower annual costs."
    },
    {
      num: "09",
      title: "Failing to Collect the No Dues Certificate (NDC)",
      desc: "After paying the last EMI, borrowers often forget to obtain the NDC. Months later, an unclosed account marker can prevent approval for a future home loan.",
      fix: "Collect the formal NDC, loan closure letter, and verify that CIBIL status shows 'Closed' within 45 days."
    },
    {
      num: "10",
      title: "Borrowing from Unregistered Loan Apps on Social Media",
      desc: "Unauthorized apps charging 100%+ APR, extortionist daily fees, and requesting access to phone contacts operate illegally outside RBI oversight.",
      fix: "Only transact with RBI-registered Scheduled Commercial Banks or approved NBFCs."
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
        <Breadcrumb path={["Home", "Blog", "Loan Mistakes to Avoid"]} />
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Header */}
        <header className="space-y-4 border-b border-slate-200 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-rose-700">
            <span className="bg-rose-50 border border-rose-200 px-3 py-1 rounded-full">
              Borrower Protection Guide
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-mono">Updated November 2026</span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">14 min read</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Top 10 Costly Mistakes to Avoid When Taking a Loan in India (2026)
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Borrowing smartly can help fund major milestones, but minor traps in loan terms, rate calculation methods, or credit inquiries can cost lakhs in unnecessary interest. Here is how to safeguard your wealth.
          </p>

          <AuthorByline authorSlug="raghav-singhal" />
        </header>

        {/* 10 Mistakes Cards */}
        <div className="space-y-6">
          {mistakes.map((m) => (
            <section
              key={m.num}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-3"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-rose-600 bg-rose-50 px-3 py-1 rounded-lg border border-rose-200 font-mono">
                  Mistake #{m.num}
                </span>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  {m.title}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                {m.desc}
              </p>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-2 text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong>How to Protect Yourself:</strong> {m.fix}
                </div>
              </div>
            </section>
          ))}
        </div>

        {/* CTA Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-800 text-center space-y-4">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block">
            Smart Borrowing Hub
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Compare Transparent Loans with Zero Hidden Charges
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Compare genuine reducing interest rates, verify official APRs, and view complete amortization schedules across India's leading banks.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <Link
              to="/loans/personal/overview"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all"
            >
              Compare Verified Loan Offers &rarr;
            </Link>
            <Link
              to="/calculators/loan/personal-loan-emi"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all"
            >
              Calculate Reducing Rate EMI
            </Link>
          </div>
        </div>

        {/* Regulatory Disclosure */}
        <div className="p-6 bg-slate-100 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed space-y-2 font-sans">
          <div className="flex items-center gap-2 text-slate-800 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-blue-700" />
            <span>Consumer Protection Notice</span>
          </div>
          <p>
            BanksCart advocates 100% adherence to Reserve Bank of India Fair Practices Code and Digital Lending Guidelines. All loan terms, interest calculations, and fee schedules displayed on BanksCart reflect verified lender disclosures.
          </p>
        </div>
      </article>
    </div>
  );
}
