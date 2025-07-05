import React, { useEffect } from 'react'; // Import useEffect
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import LoanRates from './pages/LoanRates';
import Eligibility from './pages/Eligibility';
import IFSCFinder from './pages/IFSCFinder';
import Calculators from './pages/Calculators';
import MortgageCalculatorPage from './pages/MortgageCalculatorPage';
import Status from './pages/Status';
import AadharCard from './pages/AadharCard';
import PanCard from './pages/PanCard';
import PersonalLoanEMI from './pages/calculators/PersonalLoanEMI';
import HomeLoanEMI from './pages/calculators/HomeLoanEMI';
import CarLoanEMI from './pages/calculators/CarLoanEMI';
import IncomeTaxCalculator from './pages/calculators/IncomeTaxCalculator';
import PlotConstructionLoan from './pages/PlotConstructionLoan';
import HomeLoanCompare from './pages/HomeLoanCompare';
import LoansOverviewPage from './pages/LoansOverviewPage';
import HomeLoanPage from './pages/HomeLoanPage';
import PersonalLoanPage from './pages/PersonalLoanPage';
import BusinessLoanPage from './pages/BusinessLoanPage';
import CarLoanPage from './pages/CarLoanPage';
import UsedCarLoanPage from './pages/UsedCarLoanPage';
import TwoWheelerLoanPage from './pages/TwoWheelerLoanPage';
import EducationLoanPage from "./pages/EducationLoanPage";
import MutualFundsPage from './pages/MutualFundsPage';
import FixedDepositPage from './pages/FixedDepositPage';
import InvestmentPlansPage from './pages/InvestmentPlansPage';
import CreditCardsPage from './pages/CreditCardsPage';
import DebitCardsPage from './pages/DebitCardsPage';
import BanksCartHealthInsurancePage from './pages/HealthInsurancePage';
import CarInsurancePage from './pages/CarInsurancePage';
import TermInsurancePage from './pages/TermInsurancePage';
import GoldLoansPage from './pages/GoldLoansPage';
import PincodesPage from './pages/PincodesPage';
import BecomePartnerPage from './pages/BecomePartnerPage';
import PPFPage from './pages/PPFPage';
import IncomeTaxPage from './pages/IncomeTaxPage';




// A simple 404 Not Found component (optional, but good practice)
const NotFound = () => (
  <div className="flex items-center justify-center min-h-[60vh] text-center">
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600">The page you are looking for does not exist.</p>
      <a href="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">Go to Home</a>
    </div>
  </div>
);

function App() {
  // useEffect hook to load the Tawk.to chat widget script
  // This will run once when the App component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/68688268fd0b7e1914ecc6e9/1ivc3qr19";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    // Append the script to the document body
    document.body.appendChild(script);

    // Cleanup function: remove the script when the component unmounts
    // This is good practice, though for a root App component, it might not strictly be necessary
    // unless you have complex unmounting logic for the entire app.
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    // BrowserRouter enables client-side routing
    <Router>
      <div className="min-h-screen bg-white font-inter">
        {/* Header component, visible on all pages */}
        <Header />
        <main>
          {/* Routes component renders the first matching Route */}
          <Routes>
            {/* Main navigation routes */}
            <Route path="/" element={<Home />} />
            <Route path="/resources/loan-rates" element={<LoanRates />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/resources/ifsc-finder" element={<IFSCFinder />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/status" element={<Status />} />
            <Route path="/resources/aadhar-pan" element={<AadharCard />} />
            <Route path="/resources/PanCard" element={<PanCard />} />
            <Route path="/MortgageCalculatorPage" element={<MortgageCalculatorPage />} />

            {/* Calculator specific routes */}
            <Route path="/personal-loan-emi-calculator" element={<PersonalLoanEMI />} />
            <Route path="/home-loan-emi-calculator" element={<HomeLoanEMI />} />
            <Route path="/car-loan-emi-calculator" element={<CarLoanEMI />} />
            <Route path="/income-tax-calculator" element={<IncomeTaxCalculator />} />

            {/* Loan product specific routes */}
            <Route path="/plot-construction-loan" element={<PlotConstructionLoan />} />
            <Route path="/home-loan-compare" element={<HomeLoanCompare />} />
            <Route path="/loans" element={<LoansOverviewPage />} />
            <Route path="/loans/home" element={<HomeLoanPage />} />
            <Route path="/loans/personal" element={<PersonalLoanPage />} />
            <Route path="/loans/business" element={<BusinessLoanPage />} />
            <Route path="/loans/car" element={<CarLoanPage />} />
            <Route path="/loans/used-car" element={<UsedCarLoanPage />} />
            <Route path="/loans/two-wheeler" element={<TwoWheelerLoanPage />} />
            <Route path="/loans/education" element={<EducationLoanPage />} />

            {/* Investment product specific routes */}
            <Route path="/investment/fixed-deposit" element={<FixedDepositPage />} />
            <Route path="/investment/mutual-funds" element={<MutualFundsPage />} />
            <Route path="/investment/more-plans" element={<InvestmentPlansPage />} />

            {/* Card product specific routes */}
            <Route path="/cards/credit" element={<CreditCardsPage />} />
            <Route path="/cards/debit" element={<DebitCardsPage />} />

            {/* Insurance product specific routes */}
            <Route path="/insurance/health" element={<BanksCartHealthInsurancePage />} />
            <Route path="/insurance/car" element={<CarInsurancePage />} />
            {/* THIS IS THE ROUTE FOR YOUR TERM INSURANCE PAGE */}
            <Route path="/insurance/term-life" element={<TermInsurancePage />} />
            {/* THIS IS THE ROUTE FOR YOUR GOLD LOANS PAGE */}
            <Route path="/resources/gold-rates" element={<GoldLoansPage />} />
            {/* THIS IS THE ROUTE FOR YOUR PINCODES PAGE */}
            <Route path="/resources/pincodes" element={<PincodesPage />} />
            {/* THIS IS THE ROUTE FOR YOUR BECOME PARTNER PAGE */}
            <Route path="/become-partner" element={<BecomePartnerPage />} />
            <Route path="/resources/ppf" element={<PPFPage />} />
            <Route path="/resources/income-tax" element={<IncomeTaxPage />} />   



            {/* Catch-all route for any undefined paths (404 Not Found) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {/* Footer component, visible on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
