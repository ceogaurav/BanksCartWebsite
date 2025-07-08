import React from 'react';
import Hero from '../components/GoldLoan/Hero';
import GoldLoanTypes from '../components/GoldLoan/GoldLoanTypes';
import BankComparison from '../components/GoldLoan/BankComparison';
import Features from '../components/GoldLoan/Features';
import HowItWorks from '../components/GoldLoan/HowItWorks';
import FAQ from '../components/GoldLoan/FAQ';
import CTA from '../components/GoldLoan/CTA';

interface GoldLoansPageProps {
  openApplyModal?: (loanType?: string) => void;
}

const GoldLoansPage: React.FC<GoldLoansPageProps> = ({ openApplyModal }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Hero openApplyModal={openApplyModal} />
      <GoldLoanTypes openApplyModal={openApplyModal} />
      <BankComparison openApplyModal={openApplyModal} />
      <Features openApplyModal={openApplyModal} />
      <HowItWorks openApplyModal={openApplyModal} />
      <FAQ openApplyModal={openApplyModal} />
      <CTA openApplyModal={openApplyModal} />
    </div>
  );
}

export default GoldLoansPage;