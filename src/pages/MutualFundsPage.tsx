import React from 'react';
// Import all mutual funds page components (to be created in ../components/mutualFunds/)
import HeroSection from '../components/mutualFunds/HeroSection';
import FeaturedProducts from '../components/mutualFunds/FeaturedProducts';
import InvestmentTools from '../components/mutualFunds/InvestmentTools';
import FeaturesBenefits from '../components/mutualFunds/FeaturesBenefits';
import HowItWorks from '../components/mutualFunds/HowItWorks';
import PerformanceDashboard from '../components/mutualFunds/PerformanceDashboard';
import EducationalResources from '../components/mutualFunds/EducationalResources';
import TestimonialsSection from '../components/mutualFunds/TestimonialsSection';
import CTASection from '../components/mutualFunds/CTASection';
import DarkModeToggle from '../components/mutualFunds/DarkModeToggle';
import LanguageSwitcher from '../components/mutualFunds/LanguageSwitcher';

interface MutualFundsPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const MutualFundsPage: React.FC<MutualFundsPageProps> = ({ openApplyModal }) => (
  <div className="font-inter bg-[#F8FAFC] dark:bg-[#1F2937] transition-colors duration-500">
    <DarkModeToggle />
    <LanguageSwitcher />
    <HeroSection openApplyModal={openApplyModal} />
    <FeaturedProducts openApplyModal={openApplyModal} />
    <InvestmentTools openApplyModal={openApplyModal} />
    <FeaturesBenefits openApplyModal={openApplyModal} />
    <HowItWorks openApplyModal={openApplyModal} />
    <PerformanceDashboard openApplyModal={openApplyModal} />
    <EducationalResources openApplyModal={openApplyModal} />
    <TestimonialsSection openApplyModal={openApplyModal} />
    <CTASection openApplyModal={openApplyModal} />
  </div>
);

export default MutualFundsPage;
