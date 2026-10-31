import React from "react";
import { Helmet } from "react-helmet-async";
import LoanCard from "../components/loans/LoanCard";
import { Home, User, Briefcase, Car, Bike, GraduationCap } from "lucide-react";

const loanTypes = [
  {
    title: "Personal Loan",
    description: "Quick personal loans for your needs. Minimal documentation, instant disbursal, and low interest.",
    icon: User,
    to: "/loans/personal-loan",
  },
  {
    title: "Home Loan",
    description: "Get the best rates for your dream home. Flexible EMIs, fast approval, and expert support.",
    icon: Home,
    to: "/loans/home-loan",
  },
  {
    title: "Business Loan",
    description: "Empower your business with tailored loans. High limits, flexible tenure, and easy processing.",
    icon: Briefcase,
    to: "/business-loan",
  },
  {
    title: "Car Loan",
    description: "Finance your new car with attractive interest rates and flexible repayment options.",
    icon: Car,
    to: "/loans/car",
  },
  {
    title: "Used Car Loan",
    description: "Get funding for pre-owned cars with quick processing and competitive interest rates.",
    icon: Car,
    to: "/loans/used-car",
  },
  {
    title: "Two Wheeler Loan",
    description: "Hit the road on your new bike with our easy two-wheeler loan solutions.",
    icon: Bike,
    to: "/loans/two-wheeler",
  },
  {
    title: "Education Loan",
    description: "Invest in your future with education loans for studies in India and abroad.",
    icon: GraduationCap,
    to: "/loans/education",
  },
];

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
    }
  ]
};

const LoansOverviewPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-white/60 to-blue-50/80 py-12 px-4 md:px-12">
    <Helmet>
      <title>Compare Bank Loans in India: Personal, Home, Car & Business Loans | BanksCart</title>
      <meta name="description" content="Compare loan interest rates from top Indian banks. Find the lowest EMIs for personal, home, car, and business loans with instant eligibility check." />
      <link rel="canonical" href="https://www.bankscart.com/loans" />
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
    <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center drop-shadow-lg">All Loans Overview</h1>
    <div className="flex flex-wrap gap-8 justify-center items-stretch">
      {loanTypes.map((loan) => (
        <LoanCard key={loan.title} {...loan} />
      ))}
    </div>

    {/* Specialized Commercial & Institutional Lending Hubs */}
    <div className="mt-16 max-w-6xl mx-auto w-full">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-4 text-center">
        Specialized Commercial & Institutional Lending Solutions
      </h2>
      <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8 text-sm">
        Explore dedicated institutional credit facilities, regional MSME financing, and credit score recovery solutions.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <a
          href="/credila-financial-services"
          className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group block"
        >
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">Institutional Credit</span>
          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-base mb-1">
            Credila Financial Services
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            HDFC Credila specialized education and premier institutional loans with customized tenures and tax advantages. Compare <span className="font-semibold text-blue-600 underline">HDFC Credila education loan interest rates</span>.
          </p>
          <span className="text-xs text-blue-600 font-semibold mt-3 inline-block group-hover:underline">HDFC Credila education loan interest rates &rarr;</span>
        </a>

        <a
          href="/business-loan/company-registration-in-delhi"
          className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group block"
        >
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-2">Regional MSME</span>
          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-base mb-1">
            Company Registration in Delhi
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Fast-track corporate incorporation financing, priority MSME credit lines, and working capital in Delhi NCR.
          </p>
          <span className="text-xs text-blue-600 font-semibold mt-3 inline-block group-hover:underline">View Delhi Capital &rarr;</span>
        </a>

        <a
          href="/business-loan/company-registration-in-chennai"
          className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group block"
        >
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider block mb-2">Regional MSME</span>
          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-base mb-1">
            Company Registration in Chennai
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Industrial commercial loans, seed models, and business setup funding for growing enterprises in Tamil Nadu.
          </p>
          <span className="text-xs text-blue-600 font-semibold mt-3 inline-block group-hover:underline">View Chennai Capital &rarr;</span>
        </a>

        <a
          href="/credit-score/credit-rectification-service"
          className="bg-white p-6 rounded-2xl border border-blue-100 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group block"
        >
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block mb-2">Bureau Support</span>
          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-base mb-1">
            Credit Rectification Service
          </h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Dispute erroneous default tags on your CIBIL report and boost credit scores to unlock lower loan interest rates.
          </p>
          <span className="text-xs text-blue-600 font-semibold mt-3 inline-block group-hover:underline">Fix Credit Score &rarr;</span>
        </a>
      </div>

      {/* Standardized Regulatory Disclosure Banner */}
      <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed font-sans space-y-2">
        <div className="flex items-center gap-2 font-bold text-slate-800 uppercase tracking-wider text-[11px]">
          <span>Regulatory Disclosure & Non-Lender Status</span>
        </div>
        <p>
          BanksCart is an independent digital loan and credit comparison marketplace. BanksCart is not a licensed bank, NBFC, or credit institution, and does not lend money directly. All loan approvals, interest rates, disbursal terms, and credit decisions are made exclusively at the discretion of RBI-regulated banks and NBFC partners. We do not charge borrowers upfront processing fees for loan matching.
        </p>
        <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
          <span>BanksCart Financial Technologies Pvt. Ltd. • CIN: U67190DL2024PTC428910</span>
          <a href="/editorial-policy" className="text-blue-600 font-semibold hover:underline">
            Editorial & Verification Standards &rarr;
          </a>
        </div>
      </div>
    </div>
  </div>
);

export default LoansOverviewPage;
