import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Banknote, CreditCard, Briefcase, Home as HomeIcon, Smartphone,
    RefreshCcw, PiggyBank, GraduationCap, Building, Car,
    ShieldQuestion, BarChart4, Wallet, Zap, TrendingUp, Key,
    FileText, Lightbulb, Receipt, Heart, Umbrella, Shapes, LayoutGrid, MonitorPlay
} from 'lucide-react';

// New Components
import HeroSection from '../components/home/HeroSection';
import ProductGrid, { ProductItem } from '../components/home/ProductGrid';
import FeatureBanner from '../components/home/FeatureBanner';
import WhyChooseSection from '../components/home/WhyChooseSection';
import ApprovalChanceMeter from '../components/home/ApprovalChanceMeter';

interface HomeProps {
    openApplyModal: (loanType?: string) => void;
    openEligibilityModal: (loanType?: string) => void;
    openCibilModal: () => void;
}

const Home: React.FC<HomeProps> = ({ openApplyModal, openEligibilityModal, openCibilModal }) => {
    const navigate = useNavigate();

    // 1. Loans and Cards Data
    const loansAndCardsItems: ProductItem[] = [
        {
            icon: Banknote,
            imageSrc: "/icons/personal_loan.png",
            label: "Personal Loan",
            tag: "Cashback Offer",
            tagColor: "bg-green-100 text-green-700",
            onClick: () => navigate('/loans/personal-loan')
        },
        {
            icon: CreditCard,
            imageSrc: "/icons/credit_card.png",
            label: "Credit Cards",
            tag: "₹500 Cashback",
            tagColor: "bg-green-100 text-green-700",
            onClick: () => navigate('/cards/credit')
        },
        {
            icon: Briefcase,
            imageSrc: "/icons/business_loan.png",
            label: "Business Loan",
            tag: "Cashback Offer",
            tagColor: "bg-green-100 text-green-700",
            onClick: () => navigate('/loans/business-loan')
        },
        {
            icon: HomeIcon,
            imageSrc: "/icons/home_loan.png",
            label: "Home Loan",
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
            onClick: () => openApplyModal('Home Loan')
        },
        {
            icon: Zap,
            imageSrc: "/icons/personal_loan.png",
            label: "Instant Personal Loan",
            onClick: () => openApplyModal('Personal Loan')
        },
        {
            icon: Smartphone,
            imageSrc: "/icons/credit_card.png",
            label: "UPI Credit Card",
            onClick: () => navigate('/cards/credit')
        },
    ];

    // 2. Credit Score & Payments
    const creditScoreItems: ProductItem[] = [
        {
            icon: BarChart4,
            imageSrc: "/icons/credit_score.png",
            label: "Credit Score",
            tag: "Free",
            tagColor: "bg-yellow-100 text-yellow-700",
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

    // 3. Investment & Insurance
    const investmentItems: ProductItem[] = [
        {
            icon: TrendingUp,
            imageSrc: "/icons/bonds.png",
            label: "Bonds",
            subLabel: "SEBI Regulated",
            tag: "Invest & Earn",
            onClick: () => navigate('/investment/mutual-funds')
        },
        {
            icon: PiggyBank,
            imageSrc: "/icons/investment.png",
            label: "Fixed Deposits",
            subLabel: "Earn up to 8%",
            tag: "Newly Launched",
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
            tag: "Get 0% GST*",
            onClick: () => navigate('/insurance/health')
        },
        {
            icon: Umbrella,
            imageSrc: "/icons/term_life.png",
            label: "Term Life Insurance",
            tag: "Get 0% GST*",
            onClick: () => navigate('/insurance/term-life')
        },
        {
            icon: Car,
            imageSrc: "/icons/car_insurance.png",
            label: "Car Insurance",
            tag: "Lowest Price",
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
        <div className="min-h-screen bg-transparent pb-20">
            {/* HERO Section */}
            <HeroSection openApplyModal={openApplyModal} openCibilModal={openCibilModal} />

            {/* PRODUCT GRIDS */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
                <ProductGrid title="Compare Lowest Loan Interest Rates from Top Indian Banks" items={loansAndCardsItems} columns={6} />
                <ProductGrid title="Free CIBIL Score Check & Credit Health Assessment" items={creditScoreItems} columns={6} />
                <ProductGrid title="Best Credit Cards in India: Cashbacks, Travel & Rewards" items={investmentItems} columns={6} />
            </div>

            {/* CHANCE OF APPROVAL SIMULATOR */}
            <ApprovalChanceMeter />

            {/* FEATURE BANNERS */}
            <FeatureBanner />

            {/* WHY CHOOSE US */}
            <WhyChooseSection />

            {/* CORE PRODUCT LINKS DIRECTORY */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">Explore Core Financial Services</span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
                  <a href="/loans/personal-loan" className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-bold text-slate-800 hover:text-blue-600 transition-all">
                    Personal Loans
                  </a>
                  <a href="/loans/home-loan" className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-bold text-slate-800 hover:text-blue-600 transition-all">
                    Home Loans
                  </a>
                  <a href="/loans/business-loan" className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-bold text-slate-800 hover:text-blue-600 transition-all">
                    Business Loans
                  </a>
                  <a href="/cards" className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-bold text-slate-800 hover:text-blue-600 transition-all">
                    Credit Cards
                  </a>
                  <a href="/credit-score" className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-bold text-slate-800 hover:text-blue-600 transition-all">
                    Free CIBIL Score
                  </a>
                  <a href="/calculators" className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-xs font-bold text-slate-800 hover:text-blue-600 transition-all">
                    EMI Calculators
                  </a>
                </div>
              </div>
            </section>

            {/* HOMEPAGE FAQ SECTION */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-14">
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-2">Knowledge Base</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
                  Frequently Asked Questions About Loan Eligibility &amp; Applications
                </h2>
                <div className="divide-y divide-slate-100 space-y-4">
                  <div className="pt-4">
                    <h3 className="text-base font-bold text-slate-800 mb-1">How does BanksCart compare loan interest rates across Indian banks?</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">BanksCart algorithmically analyzes verified interest rate tables, processing fees, and Annual Percentage Rates (APR) across 30+ scheduled commercial banks and RBI-registered NBFCs, matching you with the lowest EMI options based on your income and credit profile.</p>
                  </div>
                  <div className="pt-4">
                    <h3 className="text-base font-bold text-slate-800 mb-1">What is the minimum CIBIL score required for instant loan approval?</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">A CIBIL credit score of 750 or higher qualifies you for prime interest rates starting at 10.25% p.a. for personal loans and 8.35% p.a. for home loans. Borrowers with scores between 650 and 749 can still access pre-approved loans from select NBFC partners.</p>
                  </div>
                  <div className="pt-4">
                    <h3 className="text-base font-bold text-slate-800 mb-1">Does checking my credit score or loan eligibility on BanksCart impact my CIBIL rating?</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">No. All initial loan eligibility queries, EMI simulations, and credit score retrievals on BanksCart execute as soft inquiries, which do not lower your official credit bureau score in any way.</p>
                  </div>
                  <div className="pt-4">
                    <h3 className="text-base font-bold text-slate-800 mb-1">Are BanksCart comparison and application services free for borrowers?</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">Yes, BanksCart is 100% free for consumers. We never charge users any processing, application, or consulting fees.</p>
                  </div>
                </div>
              </div>
            </section>

        </div>
    );
};

export default Home;
