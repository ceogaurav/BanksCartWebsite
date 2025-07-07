import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages and components
import Home from './pages/Home';
import PersonalLoanPage from './pages/PersonalLoanPage';
import HomeLoanPage from './pages/HomeLoanPage';
import CreditCardsPage from './pages/CreditCardsPage';
import FixedDepositPage from './pages/FixedDepositPage';
import MutualFundsPage from './pages/MutualFundsPage';
import Calculators from './pages/Calculators';
import IFSCFinder from './pages/IFSCFinder';
import IncomeTaxPage from './pages/IncomeTaxPage';
import PPFPage from './pages/PPFPage';
import Eligibility from './pages/Eligibility';
import GoldLoansPage from './pages/GoldLoansPage';
import DebitCardsPage from './pages/DebitCardsPage';
import LoanRates from './pages/LoanRates';
import Status from './pages/Status';
import PanCard from './pages/PanCard';
import PersonalLoanEMI from './pages/calculators/PersonalLoanEMI';
import HomeLoanEMI from './pages/calculators/HomeLoanEMI';
import CarLoanEMI from './pages/calculators/CarLoanEMI';
import IncomeTaxCalculator from './pages/calculators/IncomeTaxCalculator';
import AadharCard from './pages/AadharCard';
import BankDetails from './pages/BankDetails';
import BecomePartnerPage from './pages/BecomePartnerPage';
import BusinessLoanPage from './pages/BusinessLoanPage';
import CarInsurancePage from './pages/CarInsurancePage';
import CarLoanPage from './pages/CarLoanPage';
import EMIcalculatorPage from './pages/EMIcalculatorPage';
import EducationLoanPage from "./pages/EducationLoanPage";
import HealthInsurancePage from './pages/HealthInsurancePage';
import HomeLoanCompare from './pages/HomeLoanCompare';
import HomeLoanEMICalculator from './pages/HomeLoanEMICalculator';
import InvestmentPlansPage from './pages/InvestmentPlansPage';
import LoanCalculatorPage from './pages/LoanCalculatorPage';
import LoansOverviewPage from './pages/LoansOverviewPage';
import MortgageCalculatorPage from './pages/MortgageCalculatorPage';
import PincodesPage from './pages/PincodesPage';
import PlotConstructionLoan from './pages/PlotConstructionLoan';
import TermInsurancePage from './pages/TermInsurancePage';
import TwoWheelerLoanPage from './pages/TwoWheelerLoanPage';
import UsedCarLoanPage from './pages/UsedCarLoanPage';

// Import common components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoanApplicationModal from './components/common/LoanApplicationModal';
import EligibilityCheckModal from './components/common/EligibilityCheckModal';
import PartnerApplicationModal from './components/modals/PartnerApplicationModal';
import CibilCheckButton from './components/common/CibilCheckButton'; // NEW: Import CibilCheckButton
import CibilScoreCheckModal from './components/modals/CibilScoreCheckModal'; // NEW: Import CibilScoreCheckModal

// A simple 404 Not Found component
const NotFound = () => (
  <div className="flex items-center justify-center min-h-[60vh] text-center">
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600">The page you are looking for does not exist.</p>
      <a href="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Go to Home</a>
    </div>
  </div>
);

const App: React.FC = () => {
  // State for Loan Application Modal
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [currentLoanType, setCurrentLoanType] = useState('');

  // State for Eligibility Check Modal
  const [isEligibilityModalOpen, setIsEligibilityModalOpen] = useState(false);
  const [currentEligibilityLoanType, setCurrentEligibilityLoanType] = useState('');

  // State for Partner Application Modal
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);

  // NEW: State for CIBIL Score Check Modal
  const [isCibilModalOpen, setIsCibilModalOpen] = useState(false);

  // Functions to control Loan Application Modal
  const openApplyModal = (loanType: string = '') => {
    setCurrentLoanType(loanType);
    setIsApplyModalOpen(true);
  };

  const closeApplyModal = () => {
    setIsApplyModalOpen(false);
    setCurrentLoanType('');
  };

  // Functions to control Eligibility Check Modal
  const openEligibilityModal = (loanType: string = '') => {
    setCurrentEligibilityLoanType(loanType);
    setIsEligibilityModalOpen(true);
  };

  const closeEligibilityModal = () => {
    setIsEligibilityModalOpen(false);
    setCurrentEligibilityLoanType('');
  };

  // Functions to control Partner Application Modal
  const openPartnerModal = () => {
    setIsPartnerModalOpen(true);
  };

  const closePartnerModal = () => {
    setIsPartnerModalOpen(false);
  };

  // NEW: Functions to control CIBIL Score Check Modal
  const openCibilModal = () => {
    setIsCibilModalOpen(true);
  };

  const closeCibilModal = () => {
    setIsCibilModalOpen(false);
  };

  // useEffect hook to load the Tawk.to chat widget script
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/68688268fd0b7e1914ecc6e9/1ivc3qr19";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white font-inter">
        {/* Header component, visible on all pages, passing modal open functions */}
        <Header
          openApplyModal={openApplyModal}
          openEligibilityModal={openEligibilityModal}
          openPartnerModal={openPartnerModal}
        />
        <main className="flex-grow">
          {/* Routes component renders the first matching Route */}
          <Routes>
            <Route path="/" element={<Home openApplyModal={openApplyModal} />} />
            <Route path="/resources/loan-rates" element={<LoanRates />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/resources/ifsc-finder" element={<IFSCFinder />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/status" element={<Status />} />
            <Route path="/pan-card" element={<PanCard />} />
            <Route path="/resources/aadhar-pan" element={<AadharCard />} />
            <Route path="/MortgageCalculatorPage" element={<MortgageCalculatorPage />} />

            {/* Calculator specific routes */}
            <Route path="/personal-loan-emi-calculator" element={<PersonalLoanEMI />} />
            <Route path="/home-loan-emi-calculator" element={<HomeLoanEMI />} />
            <Route path="/car-loan-emi-calculator" element={<CarLoanEMI />} />
            <Route path="/income-tax-calculator" element={<IncomeTaxCalculator />} />

            {/* Loan product specific routes */}
            <Route path="/plot-construction-loan" element={<PlotConstructionLoan openApplyModal={openApplyModal} />} />
            <Route path="/home-loan-compare" element={<HomeLoanCompare />} />
            <Route path="/loans" element={<LoansOverviewPage />} />
            <Route path="/loans/home" element={<HomeLoanPage openApplyModal={openApplyModal} />} />
            <Route path="/loans/personal" element={<PersonalLoanPage openApplyModal={openApplyModal} />} />
            <Route path="/loans/business" element={<BusinessLoanPage openApplyModal={openApplyModal} />} />
            <Route path="/loans/car" element={<CarLoanPage openApplyModal={openApplyModal} />} />
            <Route path="/loans/used-car" element={<UsedCarLoanPage openApplyModal={openApplyModal} />} />
            <Route path="/loans/two-wheeler" element={<TwoWheelerLoanPage openApplyModal={openApplyModal} />} />
            <Route path="/loans/education" element={<EducationLoanPage openApplyModal={openApplyModal} />} />

            {/* Investment product specific routes */}
            <Route path="/investment/fixed-deposit" element={<FixedDepositPage openApplyModal={openApplyModal} />} />
            <Route path="/investment/mutual-funds" element={<MutualFundsPage openApplyModal={openApplyModal} />} />
            <Route path="/investment/more-plans" element={<InvestmentPlansPage />} />

            {/* Card product specific routes */}
            <Route path="/cards/credit" element={<CreditCardsPage openApplyModal={openApplyModal} />} />
            <Route path="/cards/debit" element={<DebitCardsPage openApplyModal={openApplyModal} />} />

            {/* Insurance product specific routes */}
            <Route path="/insurance/health" element={<HealthInsurancePage />} />
            <Route path="/insurance/car" element={<CarInsurancePage />} />
            <Route path="/insurance/term-life" element={<TermInsurancePage />} />
            <Route path="/resources/gold-rates" element={<GoldLoansPage openApplyModal={openApplyModal} />} />
            <Route path="/resources/pincodes" element={<PincodesPage />} />
            <Route path="/become-partner" element={<BecomePartnerPage openApplyModal={openApplyModal} openPartnerModal={openPartnerModal} />} />
            <Route path="/resources/ppf" element={<PPFPage />} />
            <Route path="/resources/income-tax" element={<IncomeTaxPage />} />
            <Route path="/bank-details" element={<BankDetails />} />

            {/* Catch-all route for any undefined paths (404 Not Found) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {/* Footer component, visible on all pages */}
        <Footer />

        {/* Modals */}
        <LoanApplicationModal
          isOpen={isApplyModalOpen}
          onClose={closeApplyModal}
          initialLoanType={currentLoanType}
        />
        <EligibilityCheckModal
          isOpen={isEligibilityModalOpen}
          onClose={closeEligibilityModal}
          initialLoanType={currentEligibilityLoanType}
        />
        <PartnerApplicationModal
          isOpen={isPartnerModalOpen}
          onClose={closePartnerModal}
        />
        {/* NEW: CIBIL Score Check Modal */}
        <CibilScoreCheckModal
          isOpen={isCibilModalOpen}
          onClose={closeCibilModal}
        />

        {/* NEW: CIBIL Check Sliding Button - Appears on all pages */}
        <CibilCheckButton openCibilModal={openCibilModal} />
      </div>
    </Router>
  );
};

export default App;
