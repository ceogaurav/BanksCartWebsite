import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import HeroSection from "../components/loans/HeroSection";
import EmiCalculator from "../components/loans/EmiCalculator";
import LoanOffersGrid from "../components/loans/LoanOffersGrid";
import WhyChooseUs from "../components/loans/WhyChooseUs";
import AuthorReviewerSection from "../components/loans/AuthorReviewerSection";
import EligibilityTable from "../components/loans/EligibilityTable";
import DocumentsTable from "../components/loans/DocumentsTable";
import FeesChargesTable from "../components/loans/FeesChargesTable";
import ApplicationSteps from "../components/loans/ApplicationSteps";
import LoanTypesBenefits from "../components/loans/LoanTypesBenefits";
import TrustIndicators from "../components/loans/TrustIndicators";
import PreApprovedOffersTable from "../components/loans/PreApprovedOffersTable";
import InfoSections from "../components/loans/InfoSections";
import FaqSection from "../components/loans/FaqSection";

function PersonalLoanPage({ openApplyModal, openEligibilityModal }) {
  const pageTitle = "Personal Loan Interest Rates: Compare 30+ Banks & Apply Online | BanksCart";
  const pageDescription = "Compare personal loan interest rates starting from 10.25% p.a. Calculate EMIs, check eligibility across top banks, and apply online with zero physical paperwork.";
  const canonicalUrl = "https://www.bankscart.com/loans/personal-loan";

  // Structured Data Schemas
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
        "name": "Loans",
        "item": "https://www.bankscart.com/loans"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Personal Loan",
        "item": canonicalUrl
      }
    ]
  };

  const financialProductSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "Personal Loans in India",
    "description": pageDescription,
    "url": canonicalUrl,
    "provider": {
      "@type": "Organization",
      "name": "BanksCart",
      "url": "https://www.bankscart.com"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR"
    },
    "feesAndCommissionsSpecification": "Processing fee ranging from 0.50% to 2.50% + 18% GST. No foreclosure fee on floating-rate personal loans for individuals per RBI guidelines."
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the maximum personal loan amount I can get in India?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most leading Indian banks and NBFCs sanction personal loans up to ₹40 Lakhs to ₹50 Lakhs for eligible salaried individuals. The exact approved amount is determined by your net monthly take-home salary, employer categorization, existing debt obligations (FOIR), and credit score."
        }
      },
      {
        "@type": "Question",
        "name": "How are personal loan interest rates calculated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Scheduled commercial banks calculate interest on a monthly reducing-balance basis. Under this method, interest is charged only on the outstanding principal at the end of each monthly cycle, not on the original sanctioned loan amount. Rates typically range from 10.25% to 24.00% p.a. depending on your risk profile."
        }
      },
      {
        "@type": "Question",
        "name": "What is the minimum CIBIL score required for a personal loan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A CIBIL score of 720 or higher is generally considered ideal by major banks to qualify for prime interest rates and fast digital approval. While applicants with scores between 650 and 719 can still secure approval from select NBFCs, they may be charged higher processing fees and risk-adjusted interest margins."
        }
      },
      {
        "@type": "Question",
        "name": "Can I prepay or foreclose my personal loan before the tenure ends?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Per Reserve Bank of India (RBI) regulations, banks and NBFCs cannot charge any foreclosure fees or prepayment penalties on floating-rate term loans sanctioned to individual borrowers. For fixed-rate personal loans, lenders may levy a nominal foreclosure charge (typically 2% to 4% + GST) after an initial lock-in period of 6 to 12 months."
        }
      },
      {
        "@type": "Question",
        "name": "What documents are required to apply for a personal loan online?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Online digital applications typically require your PAN card, Aadhaar card (for DigiLocker e-KYC), last 3 months' salary slips, and latest 6 months' bank statements in PDF format or verified through NetBanking Account Aggregator."
        }
      },
      {
        "@type": "Question",
        "name": "How does applying through BanksCart affect my credit score?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Checking your eligibility, comparing quotes, and calculating EMIs on BanksCart involves only a soft credit check, which has zero negative impact on your CIBIL score. A formal credit inquiry (hard pull) is only triggered when you formally select a lender and consent to proceed with final loan underwriting."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-teal-100 selection:text-teal-900">
      <Helmet>
        <html lang="en-IN" />
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(financialProductSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Accessible Clickable Breadcrumb */}
      <Breadcrumb path={["Home", "Loans", "Personal Loan"]} />

      {/* Hero Section */}
      <HeroSection
        openApplyModal={openApplyModal}
        openEligibilityModal={openEligibilityModal}
      />

      {/* Cross-Link Callout Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-gradient-to-r from-blue-50 via-teal-50 to-indigo-50 border border-teal-200/60 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-gray-900 text-sm sm:text-base">
                Looking for Detailed Lender Guides & Mathematical Breakdown?
              </div>
              <div className="text-xs text-gray-600">
                Explore comprehensive bank-by-bank comparison tables, reducing-balance vs flat rate formulas, and RBI guidelines.
              </div>
            </div>
          </div>
          <Link
            to="/loans/personal/overview"
            className="shrink-0 bg-white hover:bg-teal-50 text-teal-800 border border-teal-300 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>Explore Personal Loan Overview</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Centered responsive container for all page components */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <EmiCalculator openApplyModal={openApplyModal} />
        <LoanOffersGrid
          openApplyModal={openApplyModal}
          openEligibilityModal={openEligibilityModal}
        />
        <WhyChooseUs />
        <AuthorReviewerSection />
        <EligibilityTable openEligibilityModal={openEligibilityModal} />
        <DocumentsTable />
        <FeesChargesTable />
        <ApplicationSteps openApplyModal={openApplyModal} />
        <LoanTypesBenefits />
        <TrustIndicators />
        <PreApprovedOffersTable openApplyModal={openApplyModal} />

        {/* SILO 1: Popular Personal Loan Tools & Comparison Guides */}
        <section className="my-10 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Financial Planning & Analysis</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Essential Personal Loan Tools & Expert Comparisons</h2>
            </div>
            <Link to="/loans" className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
              All Loan Types &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/personal-loan-emi-calculator"
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all group block"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold text-blue-700 uppercase tracking-wider bg-blue-100/80 px-2.5 py-1 rounded-md">Interactive Calculator</span>
                <span className="text-blue-600 text-xs font-bold group-hover:translate-x-1 transition-transform inline-flex items-center">&rarr;</span>
              </div>
              <h3 className="font-bold text-slate-900 text-lg group-hover:text-blue-600 transition-colors mb-2">
                Personal Loan EMI Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Calculate your monthly repayment installments, total interest outgo, and complete month-by-month amortization schedule before applying with banks.
              </p>
              <span className="text-xs font-bold text-blue-600 inline-flex items-center gap-1">
                Open Personal Loan EMI Calculator &rarr;
              </span>
            </Link>

            <Link
              to="/blog/sbi-vs-hdfc-personal-loan"
              className="p-6 rounded-2xl bg-gradient-to-br from-teal-50 to-emerald-50/50 border border-teal-100 hover:border-teal-300 hover:shadow-md transition-all group block"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-extrabold text-teal-700 uppercase tracking-wider bg-teal-100/80 px-2.5 py-1 rounded-md">Expert Comparison</span>
                <span className="text-teal-600 text-xs font-bold group-hover:translate-x-1 transition-transform inline-flex items-center">&rarr;</span>
              </div>
              <h3 className="font-bold text-slate-900 text-lg group-hover:text-teal-700 transition-colors mb-2">
                SBI vs HDFC Personal Loan: Full 2026 Comparison
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Evaluate interest rate spreads (starting at 10.50%), foreclosure charges, processing fees, and 10-second instant disbursal eligibility between SBI and HDFC.
              </p>
              <span className="text-xs font-bold text-teal-700 inline-flex items-center gap-1">
                Read SBI vs HDFC Guide &rarr;
              </span>
            </Link>
          </div>
        </section>

        <InfoSections />
        <FaqSection />
      </div>
    </main>
  );
}

export default PersonalLoanPage;
