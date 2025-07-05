import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
// Import all mutual funds page components (to be created in ../components/DebitCardsPage/)
import HeroSection from '../components/DebitCardsPage/HeroSection';
import CardTypesShowcase from '../components/DebitCardsPage/CardTypesShowcase';
import SecurityFeatures from '../components/DebitCardsPage/SecurityFeatures';
import BenefitsRewards from '../components/DebitCardsPage/BenefitsRewards';
import HowItWorks from '../components/DebitCardsPage/HowItWorks';
import ComparisonTable from '../components/DebitCardsPage/ComparisonTable';
import CustomerTestimonials from '../components/DebitCardsPage/CustomerTestimonials';
import FAQSection from '../components/DebitCardsPage/FAQSection';
import FinalCTASection from '../components/DebitCardsPage/FinalCTASection';
import '../components/DebitCardsPage/DebitCards.css';

const DebitCardsPage = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out',
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <div className="debit-cards-page">
      <HeroSection />
      <CardTypesShowcase />
      <SecurityFeatures />
      <BenefitsRewards />
      <HowItWorks />
      <ComparisonTable />
      <CustomerTestimonials />
      <FAQSection />
      <FinalCTASection />
    </div>
  );
};

export default DebitCardsPage;
