import React from 'react';
import HeroSection from '../components/home/HeroSection';
import InterestRateTicker from '../components/home/InterestRateTicker';
import LoanTypeCards from '../components/home/LoanTypeCards';
import QuickTools from '../components/home/QuickTools';
import CurrentRatesTable from '../components/home/CurrentRatesTable';
import TrustIndicators from '../components/home/TrustIndicators';

interface HomeProps {
  openApplyModal: (loanType?: string) => void;
  openEligibilityModal: (loanType?: string) => void;
}

const Home: React.FC<HomeProps> = ({ openApplyModal, openEligibilityModal }) => {
  return (
    <div className="font-inter">
      <HeroSection openApplyModal={openApplyModal} openEligibilityModal={openEligibilityModal} />
      <InterestRateTicker />
      <LoanTypeCards />
      <QuickTools openEligibilityModal={openEligibilityModal} />
      <CurrentRatesTable />
      <TrustIndicators />
    </div>
  );
};

export default Home;