import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Banknote, CreditCard, Briefcase, Home as HomeIcon, Smartphone,
  RefreshCcw, PiggyBank, GraduationCap, Building, Car,
  ShieldQuestion, BarChart4, Wallet, Zap, TrendingUp, Key,
  FileText, Lightbulb, Receipt, Heart, Umbrella, Shapes, LayoutGrid, MonitorPlay
} from 'lucide-react';

// Design System Aligned Home Components
import HeroSection from '../components/home/HeroSection';
import FeaturedProductCategories from '../components/home/FeaturedProductCategories';
import LoanComparisonSection from '../components/home/LoanComparisonSection';
import HomeEMICalculator from '../components/home/HomeEMICalculator';
import ProductGrid, { ProductItem } from '../components/home/ProductGrid';
import ApprovalChanceMeter from '../components/home/ApprovalChanceMeter';
import HowItWorksSection from '../components/home/HowItWorksSection';
import WhyChooseSection from '../components/home/WhyChooseSection';
import TrustSection from '../components/home/TrustSection';
import FinancialGuidesSection from '../components/home/FinancialGuidesSection';

interface HomeProps {
  openApplyModal: (loanType?: string) => void;
  openEligibilityModal: (loanType?: string) => void;
  openCibilModal: () => void;
}

const Home: React.FC<HomeProps> = ({ openApplyModal, openEligibilityModal, openCibilModal }) => {
  const navigate = useNavigate();

  // 1. Loans and Cards Catalog Data
  const loansAndCardsItems: ProductItem[] = [
    {
      icon: Banknote,
      imageSrc: "/icons/personal_loan.png",
      label: "Personal Loan",
      tag: "Cashback Offer",
      tagColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      onClick: () => navigate('/loans/personal-loan')
    },
    {
      icon: CreditCard,
      imageSrc: "/icons/credit_card.png",
      label: "Credit Cards",
      tag: "₹500 Cashback",
      tagColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      onClick: () => navigate('/cards/credit')
    },
    {
      icon: Briefcase,
      imageSrc: "/icons/business_loan.png",
      label: "Business Loan",
      tag: "Low APR",
      tagColor: "bg-blue-50 text-blue-800 border-blue-200",
      onClick: () => navigate('/loans/business-loan')
    },
    {
      icon: HomeIcon,
      imageSrc: "/icons/home_loan.png",
      label: "Home Loan",
      subLabel: "From 8.35% p.a.",
      onClick: () => navigate('/loans/home-loan')
    },
    {
      icon: Building,
      imageSrc: "/icons/home_loan.png",
      label: "Loan Against Property",
      onClick: () => openApplyModal('Loan Against Property')
    },
    {
      icon: RefreshCcw,
      imageSrc: "/icons/home_loan.png",
      label: "Transfer Home Loan",
      subLabel: "Save on EMI",
      onClick: () => openApplyModal('Home Loan')
    },
    {
      icon: Zap,
      imageSrc: "/icons/personal_loan.png",
      label: "Instant Personal Loan",
      subLabel: "24-Hr Disbursal",
      onClick: () => openApplyModal('Personal Loan')
    },
    {
      icon: Smartphone,
      imageSrc: "/icons/credit_card.png",
      label: "UPI Credit Card",
      subLabel: "Rupay Virtual",
      onClick: () => navigate('/cards/credit')
    },
  ];

  // 2. Credit Score & Bureau Tools
  const creditScoreItems: ProductItem[] = [
    {
      icon: BarChart4,
      imageSrc: "/icons/credit_score.png",
      label: "Credit Score",
      tag: "Free",
      tagColor: "bg-amber-50 text-amber-900 border-amber-200",
      onClick: openCibilModal
    },
    {
      icon: ShieldQuestion,
      imageSrc: "/icons/credit_score.png",
      label: "Credit Health Pro",
      onClick: openCibilModal
    },
    {
      icon: MonitorPlay,
      imageSrc: "/icons/credit_score.png",
      label: "Video Credit Report",
      onClick: openCibilModal
    },
    {
      icon: Wallet,
      imageSrc: "/icons/investment.png",
      label: "PB Money",
      onClick: () => { }
    },
    {
      icon: CreditCard,
      imageSrc: "/icons/credit_card.png",
      label: "Credit Card Bill",
      onClick: () => { }
    },
    {
      icon: Banknote,
      imageSrc: "/icons/personal_loan.png",
      label: "Loan Repayment",
      onClick: () => { }
    },
    {
      icon: Lightbulb,
      imageSrc: "/icons/electricity.png",
      label: "Electricity Bill",
      onClick: () => { }
    },
    {
      icon: LayoutGrid,
      imageSrc: "/icons/business_loan.png",
      label: "Explore More",
      onClick: () => { }
    },
  ];

  // 3. Investment & Insurance Catalog
  const investmentItems: ProductItem[] = [
    {
      icon: TrendingUp,
      imageSrc: "/icons/bonds.png",
      label: "Bonds",
      subLabel: "SEBI Regulated",
      tag: "Invest & Earn",
      tagColor: "bg-blue-50 text-blue-800 border-blue-200",
      onClick: () => navigate('/investment/mutual-funds')
    },
    {
      icon: PiggyBank,
      imageSrc: "/icons/investment.png",
      label: "Fixed Deposits",
      subLabel: "Earn up to 8%",
      tag: "Safe Returns",
      tagColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      onClick: () => navigate('/investment/fixed-deposit')
    },
    {
      icon: BarChart4,
      imageSrc: "/icons/investment.png",
      label: "Market Linked Plans",
      onClick: () => navigate('/investment/more-plans')
    },
    {
      icon: GraduationCap,
      imageSrc: "/icons/bonds.png",
      label: "National Pension Scheme",
      onClick: () => navigate('/investment/more-plans')
    },
    {
      icon: Heart,
      imageSrc: "/icons/health_insurance.png",
      label: "Health Insurance",
      tag: "0% GST*",
      tagColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
      onClick: () => navigate('/insurance/health')
    },
    {
      icon: Umbrella,
      imageSrc: "/icons/term_life.png",
      label: "Term Life Insurance",
      tag: "Tax Saver",
      tagColor: "bg-blue-50 text-blue-800 border-blue-200",
      onClick: () => navigate('/insurance/term-life')
    },
    {
      icon: Car,
      imageSrc: "/icons/car_insurance.png",
      label: "Car Insurance",
      subLabel: "Instant Policy",
      onClick: () => navigate('/insurance/car')
    },
    {
      icon: Shapes,
      imageSrc: "/icons/bonds.png",
      label: "All Insurance Products",
      onClick: () => navigate('/insurance')
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-ibm">
      {/* 1. HERO SECTION */}
      <HeroSection
        openApplyModal={openApplyModal}
        openEligibilityModal={openEligibilityModal}
        openCibilModal={openCibilModal}
      />

      {/* 2. CORE FINANCIAL PRODUCT CATEGORIES */}
      <FeaturedProductCategories
        openApplyModal={openApplyModal}
        openEligibilityModal={openEligibilityModal}
        openCibilModal={openCibilModal}
      />

      {/* 3. MULTI-BANK LOAN COMPARISON MATRIX */}
      <LoanComparisonSection
        openEligibilityModal={openEligibilityModal}
        openApplyModal={openApplyModal}
      />

      {/* 4. INTERACTIVE FINANCIAL CALCULATOR PREVIEW */}
      <HomeEMICalculator openApplyModal={openApplyModal} />

      {/* 5. COMPLETE PRODUCT DIRECTORY GRIDS */}
      <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Comprehensive Financial Marketplace
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Browse our full catalog of retail lending, bureau diagnostics, credit cards, and wealth instruments.
            </p>
          </div>

          <ProductGrid
            title="Retail & Secured Loan Options"
            items={loansAndCardsItems}
            columns={4}
          />
          <ProductGrid
            title="Bureau Scores, Reports & Utilities"
            items={creditScoreItems}
            columns={4}
          />
          <ProductGrid
            title="Fixed Deposits, Investment & Protection"
            items={investmentItems}
            columns={4}
          />
        </div>
      </section>

      {/* 6. APPROVAL CHANCE SIMULATOR */}
      <ApprovalChanceMeter openEligibilityModal={openEligibilityModal} />

      {/* 7. HOW IT WORKS: 4-STEP JOURNEY */}
      <HowItWorksSection openEligibilityModal={openEligibilityModal} />

      {/* 8. WHY BANKSCART: PLATFORM ADVANTAGES */}
      <WhyChooseSection />

      {/* 9. TRUST, COMPLIANCE & BANKING PARTNERS */}
      <TrustSection />

      {/* 10. EDUCATIONAL GUIDES & ADVICE */}
      <FinancialGuidesSection />

      {/* 11. TOPICAL SILO HUBS DIRECTORY */}
      <section className="py-14 sm:py-16 bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-xl p-6 sm:p-8 border border-slate-200 shadow-2xs">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block mb-3">
              Core Financial Hubs &amp; Directories
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
              <a
                href="/loans"
                className="p-5 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all flex flex-col items-center justify-center gap-1 group"
              >
                <span className="text-slate-900 font-bold text-base group-hover:text-blue-900">Loans Marketplace</span>
                <span className="text-xs text-slate-500 font-medium">Personal, Home &amp; Business Loans</span>
                <span className="text-xs text-blue-900 font-bold mt-2">Explore Loans &rarr;</span>
              </a>

              <a
                href="/cards"
                className="p-5 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all flex flex-col items-center justify-center gap-1 group"
              >
                <span className="text-slate-900 font-bold text-base group-hover:text-blue-900">Cards Marketplace</span>
                <span className="text-xs text-slate-500 font-medium">Cashback, Lounge &amp; Zero Annual Fee</span>
                <span className="text-xs text-blue-900 font-bold mt-2">Explore Cards &rarr;</span>
              </a>

              <a
                href="/credit-score"
                className="p-5 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all flex flex-col items-center justify-center gap-1 group"
              >
                <span className="text-slate-900 font-bold text-base group-hover:text-blue-900">Credit Score Hub</span>
                <span className="text-xs text-slate-500 font-medium">Free Official Bureau Report Check</span>
                <span className="text-xs text-blue-900 font-bold mt-2">Check Score &rarr;</span>
              </a>

              <a
                href="/company-registration"
                className="p-5 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all flex flex-col items-center justify-center gap-1 group"
              >
                <span className="text-slate-900 font-bold text-base group-hover:text-blue-900">Corporate &amp; MSME Hub</span>
                <span className="text-xs text-slate-500 font-medium">Incorporation, GST &amp; Working Capital</span>
                <span className="text-xs text-blue-900 font-bold mt-2">Explore Services &rarr;</span>
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-slate-600 font-medium">
                <span className="font-bold text-slate-900 mr-2">Quick Navigation:</span>
                Calculate precise loan amortization schedules or compare top credit cards with zero annual fees.
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <a href="/personal-loan-emi-calculator" className="px-3 py-1.5 bg-white text-slate-700 hover:text-slate-900 rounded font-semibold transition-colors border border-slate-200">
                  Personal Loan EMI Calculator
                </a>
                <a href="/gold-loan-emi-calculator" className="px-3 py-1.5 bg-white text-slate-700 hover:text-slate-900 rounded font-semibold transition-colors border border-slate-200">
                  Gold Loan Calculator
                </a>
                <a href="/blog/Best-Credit-Cards" className="px-3 py-1.5 bg-white text-slate-700 hover:text-slate-900 rounded font-semibold transition-colors border border-slate-200">
                  Best Credit Cards Guide
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <section className="py-14 sm:py-16 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl p-8 sm:p-10 border border-slate-200 shadow-2xs">
            <span className="text-xs font-bold text-blue-900 uppercase tracking-wider block mb-2">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-6">
              Frequently Asked Questions About Loan Eligibility &amp; Applications
            </h2>

            <div className="divide-y divide-slate-100 space-y-4">
              <div className="pt-4">
                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  How does BanksCart compare loan interest rates across Indian banks?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  BanksCart algorithmically analyzes verified interest rate tables, processing fees, and Annual Percentage Rates (APR) across 30+ scheduled commercial banks and RBI-registered NBFCs, matching you with the lowest EMI options based on your income and credit profile.
                </p>
              </div>

              <div className="pt-4">
                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  What is the minimum CIBIL score required for instant loan approval?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A CIBIL credit score of 750 or higher qualifies you for prime interest rates starting at 10.49% p.a. for personal loans and 8.35% p.a. for home loans. Borrowers with scores between 650 and 749 can still access pre-approved loans from select NBFC partners.
                </p>
              </div>

              <div className="pt-4">
                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  Does checking my credit score or loan eligibility on BanksCart impact my CIBIL rating?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  No. All initial loan eligibility queries, EMI simulations, and credit score retrievals on BanksCart execute as soft inquiries, which do not lower your official credit bureau score in any way.
                </p>
              </div>

              <div className="pt-4">
                <h3 className="text-base font-bold text-slate-900 mb-1.5">
                  Are BanksCart comparison and application services free for borrowers?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Yes, BanksCart is 100% free for consumers. We never charge users any processing, application, or consulting fees.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
