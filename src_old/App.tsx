import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import LoanRates from './pages/LoanRates';
import Eligibility from './pages/Eligibility';
import IFSCFinder from './pages/IFSCFinder';
import Calculators from './pages/Calculators';
import Status from './pages/Status';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-inter">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loan-rates" element={<LoanRates />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/ifsc-finder" element={<IFSCFinder />} />
            <Route path="/calculators" element={<Calculators />} />
            <Route path="/status" element={<Status />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;