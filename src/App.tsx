import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import LoginModal from './components/auth/LoginModal';
import OnboardingModal from './components/auth/OnboardingModal';

// Admin Imports
import AdminLayout from './layouts/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminApplicationsPage from './pages/admin/AdminApplicationsPage';
import AdminUsersPage from './pages/admin/AdminUsersPage'; // Import AdminUsersPage
import AdminGuard from './components/auth/AdminGuard';

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
import EducationLoanPage from "./pages/EducationLoanPage";
import HealthInsurancePage from './pages/HealthInsurancePage';
import HomeLoanCompare from './pages/HomeLoanCompare';
import InvestmentPlansPage from './pages/InvestmentPlansPage';
import LoansOverviewPage from './pages/LoansOverviewPage';
import InsuranceOverviewPage from './pages/InsuranceOverviewPage';
import CardsOverviewPage from './pages/CardsOverviewPage';
import InvestmentsOverviewPage from './pages/InvestmentsOverviewPage';
import MortgageCalculatorPage from './pages/MortgageCalculatorPage';
import PincodesPage from './pages/PincodesPage';
import PlotConstructionLoan from './pages/PlotConstructionLoan';
import TermInsurancePage from './pages/TermInsurancePage';
import TwoWheelerLoanPage from './pages/TwoWheelerLoanPage';
import UsedCarLoanPage from './pages/UsedCarLoanPage';
import CreditScore from './pages/CreditScore';
import ExpertAdvicePage from './pages/ExpertAdvicePage';
import BlogsOverviewPage from './pages/BlogsOverviewPage';
import WhatIsCibilScore from './pages/blogs/WhatIsCibilScore';
import BestCreditCards from './pages/blogs/BestCreditCards';
import BusinessLoanGuide from './pages/blogs/BusinessLoanGuide';
import FixedDepositGuide from './pages/blogs/FixedDepositGuide';
import HomeLoanGuide from './pages/blogs/HomeLoanGuide';
import InvestmentPlansGuide from './pages/blogs/InvestmentPlansGuide';
import LoanEligibilityTricks from './pages/blogs/LoanEligibilityTricks';
import SecuredUnsecuredGuide from './pages/blogs/SecuredUnsecuredGuide';
import GoldVsPersonalLoan from './pages/blogs/GoldVsPersonalLoan';
import HealthInsuranceBlog from './pages/blogs/HealthInsuranceBlog';
import CarLoanInterestRates from './pages/blogs/CarLoanInterestRates';
import CardShowdown from './pages/blogs/CardShowdown';
import TaxSavingGuide from './pages/blogs/TaxSavingGuide';
import EMIExplained from './pages/blogs/EMIExplained';
import LoanMistakesToAvoid from './pages/blogs/LoanMistakesToAvoid';
import RisingInterestRates from './pages/blogs/RisingInterestRates';
import DigitalBanks from './pages/blogs/DigitalBanks';
import WealthBuildingStrategies from './pages/blogs/WealthBuildingStrategies';
import BestPersonalLoanApps from './pages/blogs/BestPersonalLoanApps';
import LoanVsCardLoan from './pages/blogs/LoanVsCardLoan';
import NoCIBILLoanTricks from './pages/blogs/NoCIBILLoanTricks';
import PersonalLoanRates from './pages/blogs/PersonalLoanRates';
import LoanEligibilityTrick from './pages/blogs/LoanEligibilityTrick';
import PersonalLoanBalanceTransfer from './pages/blogs/PersonalLoanBalanceTransfer';
import HomeLoanComparison from './pages/blogs/HomeLoanComparison';
import LowSalaryHomeLoanGuide from './pages/blogs/LowSalaryHomeLoanGuide';
import HomeLoanMistakes from './pages/blogs/HomeLoanMistakes';
import PMAY from './pages/blogs/PMAY';
import RentVsBuy2026 from './pages/blogs/RentVsBuy2026';
import StartupLoanBlueprint from './pages/blogs/StartupLoanBlueprint';
import MSMELoanWithoutCollateral from './pages/blogs/MSMELoanWithoutCollateral';
import BusinessLoanEligibility from './pages/blogs/BusinessLoanEligibility';
import VehicleFinancingGuide from './pages/blogs/VehicleFinancingGuide';
import CarLoanRates2026 from './pages/blogs/CarLoanRates2026';
import UsedCarLoanGuide from './pages/blogs/UsedCarLoanGuide';
import BikeLoanEligibility from './pages/blogs/BikeLoanEligibility';
import CarLoan100PercentFinance from './pages/blogs/CarLoan100PercentFinance';

// Legal Pages imports
import BlogPost from './pages/blogs/BlogPost';
import CreditReportTerms from './pages/legal/CreditReportTerms';
import TermsOfUse from './pages/legal/TermsOfUse';
import PrivacyPolicy from './pages/legal/PrivacyPolicy';
import BlogList from './pages/BlogList';

// CIBIL Landing Pages Imports
import CibilCreditReportPage from './pages/cibil/CibilCreditReportPage';
import CheckCibilByPanPage from './pages/cibil/CheckCibilByPanPage';
import SbiCibilScorePage from './pages/cibil/SbiCibilScorePage';
import WaysToImproveCibilPage from './pages/cibil/WaysToImproveCibilPage';
import CibilScoreForPersonalLoanPage from './pages/cibil/CibilScoreForPersonalLoanPage';
import ResolveCibilDisputePage from './pages/cibil/ResolveCibilDisputePage';
import DynamicPersonalLoanPage from './pages/cibil/DynamicPersonalLoanPage';
import InvestorRelations from './pages/legal/InvestorRelations';
import Disclaimer from './pages/legal/Disclaimer';
import IntellectualPolicy from './pages/legal/IntellectualPolicy';
import SitemapPage from './pages/SitemapPage';
import CreditCards from './pages/CreditCards';
import DynamicCreditCardPage from './pages/cards/DynamicCreditCardPage';
import DynamicInvestmentPage from './pages/investment/DynamicInvestmentPage';
import DynamicCalculatorPage from './pages/calculators/DynamicCalculatorPage';
import DynamicRechargePage from './pages/recharge/DynamicRechargePage';
import DynamicAadharCardPage from './pages/aadhar/DynamicAadharCardPage';
import DynamicBusinessLoanPage from './pages/business/DynamicBusinessLoanPage';
import DynamicTaxPage from './pages/tax/DynamicTaxPage';
import DynamicDebitCardPage from './pages/cards/DynamicDebitCardPage';
import DynamicSalaryPage from './pages/salary/DynamicSalaryPage';
import DynamicAbhyudayaBankPage from './pages/banking/DynamicAbhyudayaBankPage';
import DynamicAdityaBirlaPage from './pages/aditya-birla/DynamicAdityaBirlaPage';
import DynamicGeneralBankingPage from './pages/banking/DynamicGeneralBankingPage';
import FinancialDirectory from './pages/FinancialDirectory';
import DynamicHealthInsurancePage from './pages/insurance/DynamicHealthInsurancePage';
import DynamicAegonLifePage from './pages/insurance/DynamicAegonLifePage';



// Import common components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LoanApplicationModal from './components/common/LoanApplicationModal';
import EligibilityCheckModal from './components/common/EligibilityCheckModal';
import PartnerApplicationModal from './components/modals/PartnerApplicationModal';
import CibilCheckButton from './components/common/CibilCheckButton';
import CibilScoreCheckModal from './components/modals/CibilScoreCheckModal';
import LoanApplyPage from './pages/LoanApply';
import ChristmasThemeWrapper from './components/common/ChristmasThemeWrapper';
import SEOManager from './components/common/SEOManager';

// Import the CalculatorPages
import CarLoanCalculatorPage from './pages/calculators/CarLoanCalculatorPage';
import StudentLoanCalculatorPage from './pages/calculators/StudentLoanCalculatorPage';
import PaydayLoanCalculatorPage from './pages/calculators/PaydayLoanCalculatorPage';
import CompoundInterestCalculatorPage from './pages/calculators/CompoundInterestCalculatorPage';
import InvestmentGrowthCalculatorPage from './pages/calculators/InvestmentGrowthCalculatorPage';
import RetirementSavingsCalculatorPage from './pages/calculators/RetirementSavingsCalculatorPage';
import RothVsTraditionalIRACalculatorPage from './pages/calculators/RothVsTraditionalIRACalculatorPage';
import StockInvestmentCalculatorPage from './pages/calculators/StockInvestmentCalculatorPage';
import CapitalGainsTaxCalculatorPage from './pages/calculators/CapitalGainsTaxCalculatorPage';
import SalesTaxCalculatorPage from './pages/calculators/SalesTaxCalculatorPage';
import PayrollTaxCalculatorPage from './pages/calculators/PayrollTaxCalculatorPage';
import BreakEvenCalculatorPage from './pages/calculators/BreakEvenCalculatorPage';
import NetPresentValueCalculatorPage from './pages/calculators/NetPresentValueCalculatorPage';
import InternalRateOfReturnCalculatorPage from './pages/calculators/InternalRateOfReturnCalculatorPage';
import CashFlowCalculatorPage from './pages/calculators/CashFlowCalculatorPage';
import DepreciationCalculatorPage from './pages/calculators/DepreciationCalculatorPage';
import BudgetCalculatorPage from './pages/calculators/BudgetCalculatorPage';
import ExpenseCalculatorPage from './pages/calculators/ExpenseCalculatorPage';
import DebtPayoffCalculatorPage from './pages/calculators/DebtPayoffCalculatorPage';
import SavingsGoalCalculatorPage from './pages/calculators/SavingsGoalCalculatorPage';
import EmergencyFundCalculatorPage from './pages/calculators/EmergencyFundCalculatorPage';
import BalanceTransferCalculatorPage from './pages/calculators/BalanceTransferCalculatorPage';
import CreditCardInterestCalculatorPage from './pages/calculators/CreditCardInterestCalculatorPage';
import CreditCardPayoffCalculatorPage from './pages/calculators/CreditCardPayoffCalculatorPage';
import ForeignExchangeRateCalculatorPage from './pages/calculators/ForeignExchangeRateCalculatorPage';
import CurrencyConverterPage from './pages/calculators/CurrencyConverterPage';
import CollegeSavingsCalculatorPage from './pages/calculators/CollegeSavingsCalculatorPage';
import HomeAffordabilityCalculatorPage from './pages/calculators/HomeAffordabilityCalculatorPage';
import RentVsBuyCalculatorPage from './pages/calculators/RentVsBuyCalculatorPage';
import PropertyTaxCalculatorPage from './pages/calculators/PropertyTaxCalculatorPage';
import CapitalizationRateCalculatorPage from './pages/calculators/CapitalizationRateCalculatorPage';
import InflationCalculatorPage from './pages/calculators/InflationCalculatorPage';
import LoanAmortizationCalculatorPage from './pages/calculators/LoanAmortizationCalculatorPage';
import AnnuityCalculatorPage from './pages/calculators/AnnuityCalculatorPage';
import PensionCalculatorPage from './pages/calculators/PensionCalculatorPage';
import SocialSecurityCalculatorPage from './pages/calculators/SocialSecurityCalculatorPage';
import SSYCalculatorPage from './pages/calculators/SSYCalculatorPage';
import SukanyaSamriddhiYojanaGuide from './pages/blogs/SukanyaSamriddhiYojanaGuide';
import CreditCardFinderPage from './pages/CreditCardFinderPage';


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
    <AuthProvider>
      <Router>
        <SEOManager />
        <LoginModal />
        <OnboardingModal />
        <ChristmasThemeWrapper>
          <div className="flex flex-col min-h-screen font-inter bg-transparent">
            {/* Header component, visible on all pages, passing modal open functions */}
            <div className="print:hidden">
              <Header
                openApplyModal={openApplyModal}
                openEligibilityModal={openEligibilityModal}
                openPartnerModal={openPartnerModal}
              />
            </div>
            <main className="flex-grow">
              {/* Routes component renders the first matching Route */}
              <Routes>
                {/* Public Routes */}
                {/* <Route path="/login" element={<Login />} /> Login is now a modal */}

                {/* Protected Route */}
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />

                {/* Admin Routes */}
                <Route path="/admin" element={
                  <AdminGuard>
                    <AdminLayout />
                  </AdminGuard>
                }>
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="applications" element={<AdminApplicationsPage />} />
                  <Route path="partners" element={<AdminApplicationsPage initialFilter="Partner" />} />
                  <Route path="users" element={<AdminUsersPage />} />
                </Route>

                <Route path="/" element={<Home openApplyModal={openApplyModal} openEligibilityModal={openEligibilityModal} openCibilModal={openCibilModal} />} />
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
                <Route path="/home-loan-compare" element={<HomeLoanCompare openApplyModal={openApplyModal} />} />
                <Route path="/loans" element={<LoansOverviewPage />} />              <Route path="/insurance" element={<InsuranceOverviewPage />} /> {/* NEW: Route for the Insurance e */}
                <Route path="/investment" element={<InvestmentsOverviewPage />} /> {/* NEW: Route for the Investments e */}
                <Route path="/cards" element={<CardsOverviewPage />} /> {/* NEW: Route for the Cards e */}
                <Route path="/loans/home" element={<HomeLoanPage openApplyModal={openApplyModal} />} />
                <Route path="/loans/personal" element={<PersonalLoanPage openApplyModal={openApplyModal} openEligibilityModal={openEligibilityModal} />} />
                <Route path="/loans/business" element={<BusinessLoanPage openApplyModal={openApplyModal} />} />
                <Route path="/loans/car" element={<CarLoanPage openApplyModal={openApplyModal} />} />
                <Route path="/loans/used-car" element={<UsedCarLoanPage openApplyModal={openApplyModal} openEligibilityModal={openEligibilityModal} openCibilModal={openCibilModal} />} />
                <Route path="/loans/two-wheeler" element={<TwoWheelerLoanPage openApplyModal={openApplyModal} openCibilModal={openCibilModal} />} />
                <Route path="/loans/education" element={<EducationLoanPage openApplyModal={openApplyModal} />} />

                {/* Investment product specific routes */}
                <Route path="/investment/fixed-deposit" element={<FixedDepositPage openApplyModal={openApplyModal} />} />
                <Route path="/investment/mutual-funds" element={<MutualFundsPage openApplyModal={openApplyModal} />} />
                <Route path="/investment/more-plans" element={<InvestmentPlansPage openApplyModal={openApplyModal} />} />

                {/* Card product specific routes */}
                <Route path="/cards/credit" element={<CreditCardsPage openApplyModal={openApplyModal} />} />
                <Route path="/cards/debit" element={<DebitCardsPage openApplyModal={openApplyModal} />} />
                <Route path="/credit-score" element={<CreditScore />} />
                <Route path="/cibil-credit-report" element={<CibilCreditReportPage />} />
                <Route path="/cibil/how-to-check-cibil-score-by-pan-card" element={<CheckCibilByPanPage />} />
                <Route path="/cibil-report/cibil-score-sbi-loans" element={<SbiCibilScorePage />} />
                <Route path="/credit-report/ways-to-improve-your-cibil-score" element={<WaysToImproveCibilPage />} />
                <Route path="/credit-score/cibil-score-for-personal-loan" element={<CibilScoreForPersonalLoanPage />} />
                <Route path="/cibil/how-to-resolve-cibil-dispute" element={<ResolveCibilDisputePage />} />
                <Route path="/loans/personal/:subPath" element={<DynamicPersonalLoanPage />} />
                <Route path="/cards/credit/:subPath" element={<DynamicCreditCardPage />} />
                <Route path="/investment/:type/:subPath" element={<DynamicInvestmentPage />} />
                <Route path="/calculators/:category/:subPath" element={<DynamicCalculatorPage />} />
                <Route path="/recharge/:subPath" element={<DynamicRechargePage />} />
                <Route path="/aadhar-card" element={<DynamicAadharCardPage />} />
                <Route path="/aadhar-card/:subPath" element={<DynamicAadharCardPage />} />
                <Route path="/business-loan/:subPath" element={<DynamicBusinessLoanPage />} />
                <Route path="/tax/:subPath" element={<DynamicTaxPage />} />
                <Route path="/debit-card/:subPath" element={<DynamicDebitCardPage />} />
                <Route path="/salary/:subPath" element={<DynamicSalaryPage />} />
                <Route path="/bonds/:subPath" element={<DynamicInvestmentPage />} />
                <Route path="/mutual-funds/:subPath" element={<DynamicInvestmentPage />} />
                <Route path="/personal-loan/:subPath" element={<DynamicPersonalLoanPage />} />
                <Route path="/credit-card/:subPath" element={<DynamicCreditCardPage />} />
                <Route path="/hdfc-bank/:subPath" element={<DynamicCreditCardPage />} />
                <Route path="/cibil/:subPath" element={<DynamicPersonalLoanPage />} />
                <Route path="/6-key-insights-know-pre-approved-personal-loans" element={<DynamicPersonalLoanPage />} />
                <Route path="/expert-advice" element={<ExpertAdvicePage openApplyModal={openApplyModal} />} />

                {/* Abhyudaya Bank Routes */}
                <Route path="/abhyudaya-co-operative-bank" element={<DynamicAbhyudayaBankPage />} />
                <Route path="/abhyudaya-co-operative-bank/:subPath" element={<DynamicAbhyudayaBankPage />} />
                <Route path="/banking/abhyudaya-bank-net-banking" element={<DynamicAbhyudayaBankPage />} />
                <Route path="/banking/abhyudaya-bank-timings" element={<DynamicAbhyudayaBankPage />} />

                {/* Aditya Birla Routes */}
                <Route path="/aditya-birla" element={<DynamicAdityaBirlaPage />} />
                <Route path="/aditya-birla/:subPath" element={<DynamicAdityaBirlaPage />} />
                <Route path="/aditya-birla-sun-life-pension-plans/:subPath" element={<DynamicAdityaBirlaPage />} />
                <Route path="/aditya-birla-activ-health" element={<DynamicAdityaBirlaPage />} />
                <Route path="/absli-wealth-max-plan" element={<DynamicAdityaBirlaPage />} />
                <Route path="/wealth-secure-plan" element={<DynamicAdityaBirlaPage />} />
                <Route path="/protector-plus" element={<DynamicAdityaBirlaPage />} />
                <Route path="/au-small-finance-bank/aditya-birla-finance-au-credit-cards" element={<DynamicAdityaBirlaPage />} />

                {/* Adani Capital, Housing, General Banking, Aaykar Setu & Aadhar Housing */}
                <Route path="/business-loan/adani-capital" element={<DynamicGeneralBankingPage />} />
                <Route path="/home-loan/adani-housing-finance" element={<DynamicGeneralBankingPage />} />
                <Route path="/icici-bank/adani-one-credit-cards" element={<DynamicGeneralBankingPage />} />
                <Route path="/icici-bank/adani-one-signature-credit-card" element={<DynamicGeneralBankingPage />} />
                <Route path="/credit-card/add-on-card" element={<DynamicGeneralBankingPage />} />
                <Route path="/money-transfer/account-to-account-money-transfer" element={<DynamicGeneralBankingPage />} />
                <Route path="/banking/accounts-payable" element={<DynamicGeneralBankingPage />} />
                <Route path="/mutual-funds/aditya-birla-amc-launches-aditya-birla-sun-life-psu-equity-fund" element={<DynamicGeneralBankingPage />} />
                <Route path="/tax/aaykar-setu-income-tax-mobile-app" element={<DynamicGeneralBankingPage />} />
                <Route path="/home-loan/aadhar-housing-finance-ltd" element={<DynamicGeneralBankingPage />} />
                <Route path="/home-loan/aadhar-housing-finance-home-loan-customer-care-number" element={<DynamicGeneralBankingPage />} />

                {/* Group Health & Chronic Disease Insurance Routes */}
                <Route path="/group-active-health" element={<DynamicHealthInsurancePage />} />
                <Route path="/group-activ-secure" element={<DynamicHealthInsurancePage />} />
                <Route path="/group-health-insurance" element={<DynamicHealthInsurancePage />} />
                <Route path="/health-insurance-asthma" element={<DynamicHealthInsurancePage />} />
                <Route path="/health-insurance-diabetes" element={<DynamicHealthInsurancePage />} />
                <Route path="/health-insurance-high-blood-pressure" element={<DynamicHealthInsurancePage />} />
                <Route path="/health-insurance-high-cholesterol" element={<DynamicHealthInsurancePage />} />
                <Route path="/login-and-registration-process" element={<DynamicHealthInsurancePage />} />

                {/* Aegon Life Insurance Routes */}
                <Route path="/aegon-life-child-plans" element={<DynamicAegonLifePage />} />
                <Route path="/aegon-life-customer-care" element={<DynamicAegonLifePage />} />
                <Route path="/life-easy-protect-insurance-plan" element={<DynamicAegonLifePage />} />
                <Route path="/future-protect-insurance-plan" element={<DynamicAegonLifePage />} />
                <Route path="/future-protect-plus-insurance-plan" element={<DynamicAegonLifePage />} />
                <Route path="/aegon-life-guaranteed-growth-insurance-plan" element={<DynamicAegonLifePage />} />
                <Route path="/aegon-life-iguarantee-insurance" element={<DynamicAegonLifePage />} />
                <Route path="/imaximize-insurance-plan" element={<DynamicAegonLifePage />} />
                <Route path="/imaximize-single-premium-insurance-plan" element={<DynamicAegonLifePage />} />
                <Route path="/rising-star-insurance-plan" element={<DynamicAegonLifePage />} />
                <Route path="/pension-plans" element={<DynamicAegonLifePage />} />
                <Route path="/term-insurance-plans" element={<DynamicAegonLifePage />} />

                {/* Additional Dynamic general pathways */}
                <Route path="/loan-against-securities/mutual-funds/aditya-birla-finance" element={<DynamicGeneralBankingPage />} />
                <Route path="/sbi-bank/adtiya-birla-sbi-cards" element={<DynamicGeneralBankingPage />} />
                <Route path="/sbi-bank/aditya-birla-sbi-card-select" element={<DynamicGeneralBankingPage />} />
                <Route path="/promotion-councils/apparel-export-promotion-council-aepc" element={<DynamicGeneralBankingPage />} />
                <Route path="/gold-loan/:subPath" element={<DynamicGeneralBankingPage />} />
                <Route path="/saving-schemes/:subPath" element={<DynamicGeneralBankingPage />} />

                {/* Specific exact paths for high-quality data rendering */}
                <Route path="/mutual-funds/aditya-birla-sun-life-flexi-cap-fund-regular-plan-growth" element={<DynamicGeneralBankingPage />} />
                <Route path="/mutual-funds/aditya-birla-sun-life-mf-launches-nfo-nifty-next-50-etf" element={<DynamicGeneralBankingPage />} />
                <Route path="/mutual-funds/aditya-birla-sun-life-midcap-fund-regular-plan-growth" element={<DynamicGeneralBankingPage />} />
                <Route path="/mutual-funds/aditya-birla-sun-life-multi-cap-fund-regular-plan-growth" element={<DynamicGeneralBankingPage />} />
                <Route path="/mutual-funds/aditya-birla-sun-life-mutual-fund-announces-bal-bhavishya-yojna-nfo" element={<DynamicGeneralBankingPage />} />
                <Route path="/mutual-funds/birla-sun-life-mutual-fund" element={<DynamicGeneralBankingPage />} />
                <Route path="/mutual-funds/aditya-birla-sun-life-psu-equity-fund-regular-plan-growth" element={<DynamicGeneralBankingPage />} />
                <Route path="/mutual-funds/aditya-birla-sun-life-small-cap-fund-regular-plan-growth" element={<DynamicGeneralBankingPage />} />
                <Route path="/personal-loan/aditya-birla-finance-limited-marriage-loan" element={<DynamicGeneralBankingPage />} />
                <Route path="/personal-loan/aditya-birla-finance-limited-personal-loan-foreclosure-charges" element={<DynamicGeneralBankingPage />} />
                <Route path="/personal-loan/agriculture-loan" element={<DynamicGeneralBankingPage />} />
                <Route path="/personal-loan/agriculture-loan-interest-rates" element={<DynamicGeneralBankingPage />} />
                <Route path="/business-loan/agarbatti-making-business" element={<DynamicGeneralBankingPage />} />
                <Route path="/business-loan/agriculture-business-plan" element={<DynamicGeneralBankingPage />} />
                <Route path="/tax/advance-tax" element={<DynamicGeneralBankingPage />} />
                <Route path="/credit-card/advantages-and-disadvantages-of-credit-card" element={<DynamicGeneralBankingPage />} />
                <Route path="/aditya-birla-sun-life-pension-plans" element={<DynamicGeneralBankingPage />} />

                {/* Financial Directories */}
                <Route path="/pages-directory" element={<FinancialDirectory />} />
                <Route path="/financial-directory" element={<FinancialDirectory />} />

                {/* Insurance product specific routes */}
                <Route path="/insurance/health" element={<HealthInsurancePage />} />
                <Route path="/insurance/car" element={<CarInsurancePage />} />
                <Route path="/insurance/term-life" element={<TermInsurancePage />} />
                <Route path="/resources/gold-rates" element={<GoldLoansPage openApplyModal={openApplyModal} openEligibilityModal={openEligibilityModal} />} />
                <Route path="/resources/pincodes" element={<PincodesPage />} />
                <Route path="/become-partner" element={<BecomePartnerPage openApplyModal={openApplyModal} openPartnerModal={openPartnerModal} />} />
                <Route path="/resources/ppf" element={<PPFPage openApplyModal={openApplyModal} />} />
                <Route path="/resources/income-tax" element={<IncomeTaxPage openApplyModal={openApplyModal} />} />
                <Route path="/bank-details/:bankId" element={<BankDetails openEligibilityModal={openEligibilityModal} />} />
                <Route path="/loan-apply" element={<LoanApplyPage />} />
                <Route path="/blog" element={<BlogList />} />

                {/* NEW: Routes for the Calculator Pages (assuming they are in src/pages/calculators/) */}
                <Route path="/car-loan-calculator" element={<CarLoanCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/student-loan-calculator" element={<StudentLoanCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/payday-loan-calculator" element={<PaydayLoanCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/compound-interest-calculator" element={<CompoundInterestCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/investment-growth-calculator" element={<InvestmentGrowthCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/retirement-calculator" element={<RetirementSavingsCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/roth-vs-trad-calculator" element={<RothVsTraditionalIRACalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/stock-calculator" element={<StockInvestmentCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/capital-gains-calculator" element={<CapitalGainsTaxCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/sales-tax-calculator" element={<SalesTaxCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/payroll-tax-calculator" element={<PayrollTaxCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/break-even-calculator" element={<BreakEvenCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/npv-calculator" element={<NetPresentValueCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/irr-calculator" element={<InternalRateOfReturnCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/cash-flow-calculator" element={<CashFlowCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/depreciation-calculator" element={<DepreciationCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/budget-calculator" element={<BudgetCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/expense-calculator" element={<ExpenseCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/debt-payoff-calculator" element={<DebtPayoffCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/savings-goal-calculator" element={<SavingsGoalCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/emergency-fund-calculator" element={<EmergencyFundCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/balance-transfer-calculator" element={<BalanceTransferCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/credit-card-interest-calculator" element={<CreditCardInterestCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/credit-card-payoff-calculator" element={<CreditCardPayoffCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/foreign-exchange-rate-calculator" element={<ForeignExchangeRateCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/currency-converter" element={<CurrencyConverterPage openApplyModal={openApplyModal} />} />
                <Route path="/college-savings-calculator" element={<CollegeSavingsCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/home-affordability-calculator" element={<HomeAffordabilityCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/rent-vs-buy-calculator" element={<RentVsBuyCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/property-tax-calculator" element={<PropertyTaxCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/caprate-calculator" element={<CapitalizationRateCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/inflation-calculator" element={<InflationCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/amortization-calculator" element={<LoanAmortizationCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/annuity-calculator" element={<AnnuityCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/pension-calculator" element={<PensionCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/social-security-calculator" element={<SocialSecurityCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/ssy-calculator" element={<SSYCalculatorPage openApplyModal={openApplyModal} />} />
                <Route path="/credit-card-finder" element={<CreditCardFinderPage openApplyModal={openApplyModal} />} />
                <Route path="/blogs-overview-page" element={<BlogsOverviewPage openApplyModal={openApplyModal} />} />
                <Route path="/blogs" element={<BlogsOverviewPage openApplyModal={openApplyModal} />} />
                <Route path="/blogs/what-is-cibil-score" element={<WhatIsCibilScore />} />
                <Route path="/blogs/Best-Credit-Cards" element={<BestCreditCards />} />
                <Route path="/blogs/Business-Loan-Guide" element={<BusinessLoanGuide />} />
                <Route path="/blogs/Fixed-Deposit-Guide" element={<FixedDepositGuide />} />
                <Route path="/blogs/Home-Loan-Guide" element={<HomeLoanGuide />} />
                <Route path="/blogs/Investment-Plans-Guide" element={<InvestmentPlansGuide openApplyModal={openApplyModal} />} />
                <Route path="/blogs/Sukanya-Samriddhi-Yojana-Guide" element={<SukanyaSamriddhiYojanaGuide />} />
                <Route path="/blogs/Loan-Eligibility-Tricks" element={<LoanEligibilityTricks />} />
                <Route path="/blogs/Secured-Unsecured-Guide" element={<SecuredUnsecuredGuide />} />
                <Route path="/blogs/Gold-Vs-Personal-Loan" element={<GoldVsPersonalLoan />} />
                <Route path="/blogs/Health-Insurance-Blog" element={<HealthInsuranceBlog />} />
                <Route path="/blogs/Car-Loan-Interest-Rates" element={<CarLoanInterestRates />} />
                <Route path="/blogs/Card-Showdown" element={<CardShowdown />} />
                <Route path="/blogs/Tax-Saving-Guide" element={<TaxSavingGuide />} />
                <Route path="/blogs/EMI-Explained" element={<EMIExplained />} />
                <Route path="/blogs/Loan-Mistakes-To-Avoid" element={<LoanMistakesToAvoid />} />
                <Route path="/blogs/Rising-Interest-Rates" element={<RisingInterestRates />} />
                <Route path="/blogs/Digital-Banks" element={<DigitalBanks />} />
                <Route path="/blogs/Wealth-Building-Strategies" element={<WealthBuildingStrategies />} />
                <Route path="/blogs/Best-Personal-Loan-Apps" element={<BestPersonalLoanApps />} />
                <Route path="/blogs/Loan-Vs-Card-Loan" element={<LoanVsCardLoan />} />
                <Route path="/blogs/No-CIBIL-Loan-Tricks" element={<NoCIBILLoanTricks />} />
                <Route path="/blogs/Personal-Loan-Rates" element={<PersonalLoanRates />} />
                <Route path="/blogs/Loan-Eligibility-Trick" element={<LoanEligibilityTrick />} />
                <Route path="/blogs/Personal-Loan-Balance-Transfer" element={<PersonalLoanBalanceTransfer />} />
                <Route path="/blogs/Home-Loan-Comparison" element={<HomeLoanComparison />} />
                <Route path="/blogs/Low-Salary-Home-Loan-Guide" element={<LowSalaryHomeLoanGuide />} />
                <Route path="/blogs/Home-Loan-Mistakes" element={<HomeLoanMistakes />} />
                <Route path="/blogs/PMAY" element={<PMAY />} />
                <Route path="/blogs/Rent-Vs-Buy-2026" element={<RentVsBuy2026 />} />
                <Route path="/blogs/Startup-Loan-Blueprint" element={<StartupLoanBlueprint />} />
                <Route path="/blogs/MSME-Loan-Without-Collateral" element={<MSMELoanWithoutCollateral />} />
                <Route path="/blogs/Business-Loan-Eligibility" element={<BusinessLoanEligibility />} />
                <Route path="/blogs/Vehicle-Financing-Guide" element={<VehicleFinancingGuide />} />
                <Route path="/blogs/Car-Loan-Rates-2026" element={<CarLoanRates2026 />} />
                <Route path="/blogs/Used-Car-Loan-Guide" element={<UsedCarLoanGuide />} />
                <Route path="/blogs/Bike-Loan-Eligibility" element={<BikeLoanEligibility />} />
                <Route path="/blogs/Car-Loan-100-Percent-Finance" element={<CarLoan100PercentFinance />} />

                {/* Dynamic Blog Route */}
                <Route path="/blog/:slug" element={<BlogPost />} />

                {/* Legal Pages */}
                <Route path="/credit-report-terms" element={<CreditReportTerms />} />
                <Route path="/terms-of-use" element={<TermsOfUse />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/investor-relations" element={<InvestorRelations />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/intellectual-policy" element={<IntellectualPolicy />} />
                <Route path="/sitemap" element={<SitemapPage />} />

                {/* Financial Products */}
                <Route path="/credit-cards" element={<CreditCards />} />

                {/* Catch-all route for any undefined paths (404 Not Found) */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            {/* Footer component, visible on all pages */}
            <div className="print:hidden">
              <Footer openEligibilityModal={openEligibilityModal} />
            </div>

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
            <div className="print:hidden">
              <CibilCheckButton openCibilModal={openCibilModal} />
            </div>
          </div>
        </ChristmasThemeWrapper>
      </Router>
    </AuthProvider>
  );
};

export default App;
