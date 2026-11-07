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
import { Calculator, BarChart3, FileText, TrendingUp, ArrowRight, ShieldCheck, Info } from "lucide-react";

function PersonalLoanPage({ openApplyModal, openEligibilityModal }) {
  const pageTitle = "Personal Loan Interest Rates: Compare 30+ Banks & Apply Online | BanksCart";
  const pageDescription = "Compare personal loan interest rates starting from 10.25% p.a. Calculate EMIs, check eligibility across top banks, and apply online with zero physical paperwork.";
  const canonicalUrl = "https://www.bankscart.com/loans/personal-loan";

  // Structured Data Schemas (Preserved & Enhanced)
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
    "@type": "LoanOrCredit",
    "name": "Personal Loans in India: Compare Low Interest Rates & Fast Disbursal",
    "description": pageDescription,
    "url": canonicalUrl,
    "provider": {
      "@type": "FinancialService",
      "name": "BanksCart",
      "url": "https://www.bankscart.com"
    },
    "annualPercentageRate": "10.25% - 24.00%",
    "feesAndCommissionsSpecification": "Processing fee ranging from 0.50% to 2.50% + 18% GST. No foreclosure fee on floating-rate personal loans for individuals per RBI guidelines.",
    "currency": "INR",
    "loanTerm": {
      "@type": "QuantitativeValue",
      "minValue": 12,
      "maxValue": 72,
      "unitCode": "MON"
    },
    "amount": {
      "@type": "MonetaryAmount",
      "currency": "INR",
      "minValue": 25000,
      "maxValue": 5000000
    }
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
    <main className="min-h-screen bg-slate-50 font-ibm text-slate-900 selection:bg-amber-100 selection:text-amber-900">
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

      {/* Accessible Breadcrumb */}
      <Breadcrumb path={["Home", "Loans", "Personal Loan"]} />

      {/* Hero Section */}
      <HeroSection
        openApplyModal={openApplyModal}
        openEligibilityModal={openEligibilityModal}
      />

      {/* Institutional Callout Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center shrink-0">
              <Info className="w-5 h-5 text-slate-800" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm sm:text-base">
                Looking for Detailed Bank-by-Bank Guidelines &amp; Reducing Balance Formulas?
              </div>
              <div className="text-xs text-slate-600">
                Explore bank-by-bank comparative breakdowns, reducing-balance vs flat rate math, and RBI digital lending norms.
              </div>
            </div>
          </div>
          <Link
            to="/loans/personal/overview"
            className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-lg text-xs sm:text-sm transition-colors shadow-sm flex items-center gap-1.5"
          >
            <span>Explore Bank Overview</span>
            <ArrowRight className="w-4 h-4" />
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

        {/* SILO: Popular Personal Loan Planning Tools & Guides */}
        <section className="my-14 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm font-ibm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block">Financial Planning &amp; Analysis</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-950 tracking-tight">Essential Personal Loan Calculators &amp; Bureau Tools</h2>
            </div>
            <Link to="/loans" className="text-xs font-semibold text-slate-700 hover:text-slate-950 inline-flex items-center gap-1">
              All Loan Types <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/personal-loan-emi-calculator"
              className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all group block"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider bg-white border border-slate-200 px-2 py-0.5 rounded">
                  Interactive Tool
                </span>
                <span className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all inline-flex items-center">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              <h3 className="font-bold text-slate-950 text-base group-hover:text-amber-700 transition-colors mb-1.5">
                Personal Loan EMI Calculator
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Calculate your monthly installments, total interest outgo, and complete month-by-month amortization schedule.
              </p>
              <span className="text-xs font-semibold text-amber-700 inline-flex items-center gap-1">
                Open EMI Calculator &rarr;
              </span>
            </Link>

            <Link
              to="/credit-score"
              className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all group block"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider bg-white border border-slate-200 px-2 py-0.5 rounded">
                  Credit Check
                </span>
                <span className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all inline-flex items-center">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              <h3 className="font-bold text-slate-950 text-base group-hover:text-amber-700 transition-colors mb-1.5">
                Free CIBIL Score Check
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Check your real-time CIBIL score online with zero impact on your credit history. Get pre-approved personal loan offers.
              </p>
              <span className="text-xs font-semibold text-amber-700 inline-flex items-center gap-1">
                Check Free Credit Score &rarr;
              </span>
            </Link>

            <Link
              to="/cibil-credit-report"
              className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all group block"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider bg-white border border-slate-200 px-2 py-0.5 rounded">
                  Bureau Analysis
                </span>
                <span className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all inline-flex items-center">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              <h3 className="font-bold text-slate-950 text-base group-hover:text-amber-700 transition-colors mb-1.5">
                Official CIBIL Credit Report
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Review your complete credit history, active loan trade lines, payment track records, and detect unauthorized inquiries.
              </p>
              <span className="text-xs font-semibold text-amber-700 inline-flex items-center gap-1">
                View Full Credit Report &rarr;
              </span>
            </Link>

            <Link
              to="/blog/how-to-improve-cibil-score-fast"
              className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all group block"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider bg-white border border-slate-200 px-2 py-0.5 rounded">
                  Score Advisory
                </span>
                <span className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all inline-flex items-center">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              <h3 className="font-bold text-slate-950 text-base group-hover:text-amber-700 transition-colors mb-1.5">
                How to Improve CIBIL Score Fast
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Proven strategies to rebuild your credit rating from 600 to 750+. Lower credit utilization and optimize repayment cycles.
              </p>
              <span className="text-xs font-semibold text-amber-700 inline-flex items-center gap-1">
                Read Score Improvement Guide &rarr;
              </span>
            </Link>

            <Link
              to="/blog/sbi-vs-hdfc-personal-loan"
              className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all group block"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider bg-white border border-slate-200 px-2 py-0.5 rounded">
                  Lender Comparison
                </span>
                <span className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all inline-flex items-center">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              <h3 className="font-bold text-slate-950 text-base group-hover:text-amber-700 transition-colors mb-1.5">
                SBI vs HDFC Personal Loan: Full 2026 Comparison
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Evaluate interest rate spreads (starting at 10.50%), foreclosure charges, processing fees, and instant disbursal terms.
              </p>
              <span className="text-xs font-semibold text-amber-700 inline-flex items-center gap-1">
                Read SBI vs HDFC Guide &rarr;
              </span>
            </Link>

            <Link
              to="/loans/home-loan"
              className="p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all group block"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider bg-white border border-slate-200 px-2 py-0.5 rounded">
                  Housing Finance
                </span>
                <span className="text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all inline-flex items-center">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
              <h3 className="font-bold text-slate-950 text-base group-hover:text-amber-700 transition-colors mb-1.5">
                Compare Home Loans (From 8.00% p.a.)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Looking for residential property loans or balance transfers? Compare SBI, HDFC, ICICI, and Axis home loans up to 30 years.
              </p>
              <span className="text-xs font-semibold text-amber-700 inline-flex items-center gap-1">
                Compare Home Loans &rarr;
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
