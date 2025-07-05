import React from 'react';
import Hero from '../components/GoldLoan/Hero';
import GoldLoanTypes from '../components/GoldLoan/GoldLoanTypes';
import BankComparison from '../components/GoldLoan/BankComparison';
import Features from '../components/GoldLoan/Features';
import HowItWorks from '../components/GoldLoan/HowItWorks';
import FAQ from '../components/GoldLoan/FAQ';
import CTA from '../components/GoldLoan/CTA';

function GoldLoansPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      <Hero />
      <GoldLoanTypes />
      <BankComparison />
      <Features />
      <HowItWorks />
      <FAQ />
      <CTA />
    </div>
  );
}

export default GoldLoansPage;