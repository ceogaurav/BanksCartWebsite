import React from 'react';
import HeroSection from '../components/home/HeroSection';
import InterestRateTicker from '../components/home/InterestRateTicker';
import LoanTypeCards from '../components/home/LoanTypeCards';
import QuickTools from '../components/home/QuickTools';
import FeaturedBanks from '../components/home/FeaturedBanks';
import CurrentRatesTable from '../components/home/CurrentRatesTable';
import TrustIndicators from '../components/home/TrustIndicators';

const Home: React.FC = () => {
  return (
    <div className="font-inter">
      <HeroSection />
      <InterestRateTicker />
      <LoanTypeCards />
      <QuickTools />
      <FeaturedBanks />
      <CurrentRatesTable />
      <TrustIndicators />
    </div>
  );
};

export default Home;