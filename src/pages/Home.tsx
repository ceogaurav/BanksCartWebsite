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
            onClick: () => openApplyModal('Personal Loan')
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
            onClick: () => openApplyModal('Business Loan')
        },
        {
            icon: HomeIcon,
            imageSrc: "/icons/home_loan.png",
            label: "Home Loan",
            onClick: () => openApplyModal('Home Loan')
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
            <HeroSection />

            {/* PRODUCT GRIDS */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
                <ProductGrid title="Loans and Cards" items={loansAndCardsItems} columns={6} />
                <ProductGrid title="Credit Score & Bill Payments" items={creditScoreItems} columns={6} />
                <ProductGrid title="Investment & Insurance Products" items={investmentItems} columns={6} />
            </div>

            {/* FEATURE BANNERS */}
            <FeatureBanner />

            {/* WHY CHOOSE US */}
            <WhyChooseSection />
        </div>
    );
};

export default Home;
