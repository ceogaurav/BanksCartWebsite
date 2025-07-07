import React from 'react';
import ApplyButton from '../components/common/ApplyButton';
import FDCalculator from '../components/FDCalculator';
import FDLiveCharts from '../components/FDLiveCharts';
import InterestRatesTable from '../components/InterestRatesTable';
import FDTypesSection from '../components/FDTypesSection';
import BenefitsShowcase from '../components/BenefitsShowcase';
import InvestmentProcess from '../components/InvestmentProcess';
import ComparisonSection from '../components/ComparisonSection';
import CustomerTestimonials from '../components/CustomerTestimonials';
import TaxBenefitsSection from '../components/TaxBenefitsSection';
import FAQSection from '../components/FAQSection';
import FinalCTASection from '../components/FinalCTASection';

interface FixedDepositPageProps {
  openApplyModal?: (loanType?: string) => void;
}
// Placeholder for all sections, to be filled in next steps
const FixedDepositPage: React.FC<FixedDepositPageProps> = ({ openApplyModal }) => {
  return (
    <main className="bg-light-blue min-h-screen w-full font-inter">
      {/* 1. Hero Section */}
      <section id="fd-hero" className="w-full min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-tr from-[#1E40AF] to-[#3B82F6] text-white relative overflow-hidden">
        {/* Animated Money Tree Illustration Placeholder */}
        <div className="absolute left-0 right-0 top-0 bottom-0 flex items-center justify-center opacity-60 pointer-events-none select-none">
          {/* TODO: SVG/Canvas animation here */}
        </div>
        <div className="relative z-10 flex flex-col items-center gap-6 py-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center drop-shadow-lg">Grow Your Wealth with Smart Fixed Deposits</h1>
          <p className="text-xl md:text-2xl font-medium text-center max-w-2xl">Enjoy guaranteed returns with industry-leading interest rates starting from <span className="font-bold text-amber-300">7.25% p.a.</span> Your financial security starts here.</p>
          <div className="flex flex-col md:flex-row gap-3 items-center">
            <span className="bg-white/20 rounded-full px-5 py-2 text-lg font-semibold border border-white/30">₹10,000 minimum investment • Up to 10 years tenure • 100% secure</span>
          </div>
          <div className="flex gap-4 mt-6">
            {openApplyModal && (
              <ApplyButton
                loanType="Fixed Deposit"
                openApplyModal={openApplyModal}
                className="bg-gradient-to-r from-[#059669] to-[#10B981] text-white font-poppins text-lg px-8 py-3 rounded-xl font-bold shadow-lg transform transition hover:scale-105 hover:shadow-2xl animate-pulse"
              >
                Calculate Your Returns
              </ApplyButton>
            )}
            {openApplyModal && (
              <ApplyButton
                loanType="Fixed Deposit"
                openApplyModal={openApplyModal}
                className="bg-white text-[#1E40AF] font-poppins text-lg px-8 py-3 rounded-xl font-bold shadow-lg border-2 border-[#1E40AF] hover:bg-blue-50 hover:scale-105 transition"
              >
                Start Investing Today
              </ApplyButton>
            )}
          </div>
          {/* Trust Indicators */}
          <div className="flex flex-col md:flex-row gap-6 mt-8 items-center">
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg font-semibold text-lg"><span className="inline-block w-6 h-6 bg-green-400 rounded-full mr-2"></span>FDIC Insured</span>
            <span className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg font-semibold text-lg"><span className="inline-block w-6 h-6 bg-yellow-400 rounded-full mr-2"></span>5 Million+ Investors Trust Us</span>
          </div>
          {/* Quick Stats Bar */}
          <div className="flex flex-col md:flex-row gap-8 mt-8 items-center">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-poppins font-bold animate-count">7.25% p.a.</span>
              <span className="text-base">Interest Rate</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-poppins font-bold animate-count">₹500+ Crores</span>
              <span className="text-base">Invested</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-poppins font-bold animate-count">99.9%</span>
              <span className="text-base">Customer Satisfaction</span>
            </div>
          </div>
        </div>
      </section>
      {/* 2. Calculator Section */}
      <section className="w-full flex flex-col md:flex-row justify-center items-start gap-8 bg-[#F0F9FF] py-8">
        <div className="w-full md:w-1/2 max-w-2xl mx-auto">
          <FDCalculator LiveChartsComponent={FDLiveCharts} openApplyModal={openApplyModal} />
        </div>
        {/* Standalone live charts removed: charts now appear in calculator results */}
      </section>
      {/* 3. Interest Rates Table Section */}
      <section className="w-full flex justify-center bg-white">
        <div className="w-full max-w-5xl">
          <InterestRatesTable openApplyModal={openApplyModal} />
        </div>
      </section>
      {/* 4. FD Types & Features Section */}
      <section className="w-full flex justify-center bg-[#F0F9FF]">
        <div className="w-full max-w-5xl">
          <FDTypesSection openApplyModal={openApplyModal} />
        </div>
      </section>
      {/* 5. Benefits & Features Showcase */}
      <section className="w-full flex justify-center bg-white">
        <div className="w-full max-w-6xl">
          <BenefitsShowcase openApplyModal={openApplyModal} />
        </div>
      </section>
      {/* 6. Investment Process (Animated Timeline) */}
      <section className="w-full flex justify-center bg-[#F0F9FF]">
        <div className="w-full max-w-5xl">
          <InvestmentProcess openApplyModal={openApplyModal} />
        </div>
      </section>
      {/* 7. Comparison Section */}
      <section className="w-full flex justify-center bg-white">
        <div className="w-full max-w-5xl">
          <ComparisonSection openApplyModal={openApplyModal} />
        </div>
      </section>
      {/* 8. Customer Success Stories & Testimonials */}
      <section className="w-full flex justify-center bg-[#F0F9FF]">
        <div className="w-full max-w-5xl">
          <CustomerTestimonials openApplyModal={openApplyModal} />
        </div>
      </section>
      {/* 9. Tax Benefits & Compliance Section */}
      <section className="w-full flex justify-center bg-white">
        <div className="w-full max-w-5xl">
          <TaxBenefitsSection openApplyModal={openApplyModal} />
        </div>
      </section>
      {/* 10. FAQ Section (Smart Accordion) */}
      <section className="w-full flex justify-center bg-[#F0F9FF]">
        <div className="w-full max-w-5xl">
          <FAQSection openApplyModal={openApplyModal} />
        </div>
      </section>
      {/* 11. Final CTA Section */}
      <section className="w-full flex justify-center bg-gradient-to-tr from-[#1E40AF] via-[#059669] to-[#D97706]">
        <div className="w-full">
          <FinalCTASection openApplyModal={openApplyModal} />
        </div>
      </section>
    </main>
  );
};

export default FixedDepositPage;
