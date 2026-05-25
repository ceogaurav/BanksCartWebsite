import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Menu,
  X,
  ChevronDown,
  User as UserIcon,
  Smartphone,
  CreditCard,
  TrendingUp,
  BadgeInfo,
  FileText,
  Gauge
} from 'lucide-react';

interface HeaderProps {
  openApplyModal: (loanType?: string) => void;
  openEligibilityModal: (loanType?: string) => void;
  openPartnerModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ openApplyModal, openEligibilityModal, openPartnerModal }) => {
  const { currentUser, openLoginModal, userData } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLoanTab, setActiveLoanTab] = useState<'personal' | 'business' | 'home' | 'other'>('personal');
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  const navigation = [
    {
      name: 'Credit Score',
      href: '/credit-score',
      icon: Gauge,
      submenu: [
        { name: 'Credit Score FREE', href: '/cibil-credit-report' },
        { name: 'CIBIL Score Check by PAN', href: '/cibil/how-to-check-cibil-score-by-pan-card' },
        { name: 'SBI CIBIL Score', href: '/cibil-report/cibil-score-sbi-loans' },
        { name: 'How to Increase CIBIL Score', href: '/credit-report/ways-to-improve-your-cibil-score' },
        { name: 'CIBIL Score for Personal Loan', href: '/credit-score/cibil-score-for-personal-loan' },
        { name: 'Resolve CIBIL Dispute', href: '/cibil/how-to-resolve-cibil-dispute' },
      ]
    },
    {
      name: 'Loans',
      href: '/loans',
      icon: CreditCard,
      submenu: [
        { name: 'Personal Loan', href: '/loans/personal' },
        { name: 'Home Loan', href: '/loans/home' },
        { name: 'Business Loan', href: '/loans/business' },
        { name: 'Education Loan', href: '/loans/education' },
        { name: 'Car Loan', href: '/loans/car' },
        { name: 'Used Car Loan', href: '/loans/used-car' },
      ]
    },
    {
      name: 'Cards',
      href: '/cards',
      icon: CreditCard,
      submenu: [
        { name: 'Credit Cards', href: '/cards/credit' },
        { name: 'Debit Cards', href: '/cards/debit' },
      ]
    },
    {
      name: 'Investment',
      href: '/investment',
      icon: TrendingUp,
      submenu: [
        { name: 'Mutual Funds', href: '/investment/mutual-funds' },
        { name: 'Fixed Deposit', href: '/investment/fixed-deposit' },
      ]
    },
    {
      name: 'Insurance',
      href: '/insurance',
      icon: BadgeInfo,
      submenu: [
        { name: 'Health Insurance', href: '/insurance/health' },
        { name: 'Car Insurance', href: '/insurance/car' },
        { name: 'Term Life', href: '/insurance/term-life' },
      ]
    },
    {
      name: 'Resources',
      href: '/resources',
      icon: FileText,
      submenu: [
        { name: 'Calculators', href: '/calculators' },
        { name: 'Blogs', href: '/blogs-overview-page' },
        { name: 'Expert Advice', href: '/expert-advice' },
        { name: 'Gold Rates', href: '/resources/gold-rates' },
        { name: 'IFSC Finder', href: '/resources/ifsc-finder' },
        { name: 'Pincodes', href: '/resources/pincodes' },
        { name: 'Loan Rates', href: '/resources/loan-rates' },
        { name: 'Aadhar Card', href: '/resources/aadhar-pan' },
        { name: 'PanCard', href: '/resources/PanCard' },
        { name: 'PPF', href: '/resources/ppf' },
        { name: 'Income Tax', href: '/resources/income-tax' },
      ]
    },
  ];

  return (
    <header className="fixed top-0 w-full bg-white border-b border-slate-200 z-50 h-16 shadow-sm transition-all font-sans">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center h-full">
          {/* 1. Logo Section */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-2">
            <img
              src="/logos/bankscartlogof.jpg"
              alt="BanksCart"
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* 2. Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group h-full flex items-center cursor-pointer">
                <div
                  className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-200 ${isActive(item.href) ? 'text-blue-600' : 'text-slate-600 group-hover:text-blue-600'
                    }`}
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180 text-slate-400 group-hover:text-blue-600" />
                  )}
                </div>

                {/* Dropdown Menu */}
                {item.submenu && (
                  item.name === 'Loans' ? (
                    <div className="absolute top-[90%] left-1/2 -translate-x-[40%] w-[840px] bg-white rounded-2xl shadow-2xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50 overflow-hidden">
                      <div className="grid grid-cols-12 min-h-[460px]">
                        {/* Left Sidebar categories */}
                        <div className="col-span-4 bg-slate-50/50 p-4 border-r border-slate-100 flex flex-col gap-2">
                          <button
                            type="button"
                            onMouseEnter={() => setActiveLoanTab('personal')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                              activeLoanTab === 'personal'
                                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 shadow-sm'
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <span className="text-base">💰</span>
                            Personal Loan
                          </button>
                          <button
                            type="button"
                            onMouseEnter={() => setActiveLoanTab('business')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                              activeLoanTab === 'business'
                                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 shadow-sm'
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <span className="text-base">💼</span>
                            Business Loan
                          </button>
                          <button
                            type="button"
                            onMouseEnter={() => setActiveLoanTab('home')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                              activeLoanTab === 'home'
                                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 shadow-sm'
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <span className="text-base">🏠</span>
                            Home Loan
                          </button>
                          <button
                            type="button"
                            onMouseEnter={() => setActiveLoanTab('other')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                              activeLoanTab === 'other'
                                ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600 shadow-sm'
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <span className="text-base">💳</span>
                            Other Loans
                          </button>
                        </div>

                        {/* Right Detail content */}
                        <div className="col-span-8 p-6 bg-white overflow-y-auto">
                          {activeLoanTab === 'personal' && (
                            <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                              <div>
                                <h4 className="font-bold text-xs uppercase tracking-wide text-blue-600 mb-3 flex items-center gap-1.5">
                                  <span>📄</span> Overview
                                </h4>
                                <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                                  <Link to="/loans/personal/overview" className="hover:text-blue-600 transition-colors">Personal Loan</Link>
                                  <Link to="/loans/personal/pre-approved" className="hover:text-blue-600 transition-colors">Pre Approved Personal Loan</Link>
                                  <Link to="/loans/personal/interest-rates" className="hover:text-blue-600 transition-colors">Personal Loan Interest Rates</Link>
                                  <Link to="/loans/personal/mobile-app" className="hover:text-blue-600 transition-colors">Personal Loan APP</Link>
                                  <Link to="/loans/personal/low-cibil-score" className="hover:text-blue-600 transition-colors">Personal Loan Low CIBIL Score</Link>
                                  <Link to="/loans/personal/balance-transfer" className="hover:text-blue-600 transition-colors">Personal Loan Balance Transfer</Link>
                                  <Link to="/loans/personal/loan-on-credit-card" className="hover:text-blue-600 transition-colors">Loan on Credit Card</Link>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-bold text-xs uppercase tracking-wide text-blue-600 mb-3 flex items-center gap-1.5">
                                  <span>💵</span> By Amount
                                </h4>
                                <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                                  <Link to="/loans/personal/5-lakh" className="hover:text-blue-600 transition-colors">5 Lakh Personal Loan</Link>
                                  <Link to="/loans/personal/10-lakh" className="hover:text-blue-600 transition-colors">10 Lakh Personal Loan</Link>
                                  <Link to="/loans/personal/20-lakh" className="hover:text-blue-600 transition-colors">20 Lakh Personal Loan</Link>
                                  <Link to="/loans/personal/30-lakh" className="hover:text-blue-600 transition-colors">30 Lakh Personal Loan</Link>
                                  <Link to="/loans/personal/40-lakh" className="hover:text-blue-600 transition-colors">40 Lakh Personal Loan</Link>
                                  <Link to="/loans/personal/50-lakh" className="hover:text-blue-600 transition-colors">50 Lakh Personal Loan</Link>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-bold text-xs uppercase tracking-wide text-blue-600 mb-3 flex items-center gap-1.5">
                                  <span>👥</span> By Type
                                </h4>
                                <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                                  <Link to="/loans/personal/salaried-employees" className="hover:text-blue-600 transition-colors">Loan for Salaried Employees</Link>
                                  <Link to="/loans/personal/self-employed" className="hover:text-blue-600 transition-colors">Loan for Self Employed</Link>
                                  <Link to="/loans/personal/senior-citizens" className="hover:text-blue-600 transition-colors">Loan For Senior Citizens</Link>
                                  <Link to="/loans/personal/students" className="hover:text-blue-600 transition-colors">Loan for Students</Link>
                                  <Link to="/loans/personal/doctors" className="hover:text-blue-600 transition-colors">Loan for Doctors</Link>
                                  <Link to="/loans/personal/women" className="hover:text-blue-600 transition-colors">Loan for Women</Link>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-bold text-xs uppercase tracking-wide text-blue-600 mb-3 flex items-center gap-1.5">
                                  <span>🎯</span> By Need
                                </h4>
                                <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                                  <Link to="/loans/personal/medical-loan" className="hover:text-blue-600 transition-colors">Medical Loan</Link>
                                  <Link to="/loans/personal/travel-loan" className="hover:text-blue-600 transition-colors">Travel Loan</Link>
                                  <Link to="/loans/personal/debt-consolidation" className="hover:text-blue-600 transition-colors">Debt Consolidation Loan</Link>
                                  <Link to="/loans/personal/wedding-loan" className="hover:text-blue-600 transition-colors">Wedding Loan</Link>
                                  <Link to="/loans/personal/overdraft-loan" className="hover:text-blue-600 transition-colors">Overdraft Loan</Link>
                                  <Link to="/loans/personal/flexi-loan" className="hover:text-blue-600 transition-colors">Flexi Loan</Link>
                                  <Link to="/loans/personal/short-term-loan" className="hover:text-blue-600 transition-colors">Short Term Loan</Link>
                                  <Link to="/loans/personal/term-loan" className="hover:text-blue-600 transition-colors">Term Loan</Link>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeLoanTab === 'business' && (
                            <div className="space-y-6">
                              <h4 className="font-bold text-xs uppercase tracking-wide text-blue-600 mb-3">💼 Business Credit Products</h4>
                              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                                <Link to="/loans/business" className="p-3 border border-slate-100 rounded-xl hover:border-blue-100 hover:text-blue-600 transition-all">Business Loan Overview</Link>
                                <Link to="/loans/business" className="p-3 border border-slate-100 rounded-xl hover:border-blue-100 hover:text-blue-600 transition-all">MSME Secured Lending</Link>
                                <Link to="/loans/business" className="p-3 border border-slate-100 rounded-xl hover:border-blue-100 hover:text-blue-600 transition-all">Equipment & Plant Finance</Link>
                                <Link to="/loans/business" className="p-3 border border-slate-100 rounded-xl hover:border-blue-100 hover:text-blue-600 transition-all">Working Capital Lines</Link>
                              </div>
                            </div>
                          )}

                          {activeLoanTab === 'home' && (
                            <div className="space-y-6">
                              <h4 className="font-bold text-xs uppercase tracking-wide text-blue-600 mb-3">🏠 Home & Housing Finance</h4>
                              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                                <Link to="/loans/home" className="p-3 border border-slate-100 rounded-xl hover:border-blue-100 hover:text-blue-600 transition-all">Home Loan Overview</Link>
                                <Link to="/home-loan-compare" className="p-3 border border-slate-100 rounded-xl hover:border-blue-100 hover:text-blue-600 transition-all">Compare Home Loans</Link>
                                <Link to="/plot-construction-loan" className="p-3 border border-slate-100 rounded-xl hover:border-blue-100 hover:text-blue-600 transition-all">Plot & Construction Loans</Link>
                                <Link to="/home-loan-emi-calculator" className="p-3 border border-slate-100 rounded-xl hover:border-blue-100 hover:text-blue-600 transition-all">Home Loan EMI Calculator</Link>
                              </div>
                            </div>
                          )}

                          {activeLoanTab === 'other' && (
                            <div className="space-y-6">
                              <h4 className="font-bold text-xs uppercase tracking-wide text-blue-600 mb-3">💳 Consumer & Vehicle Loans</h4>
                              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                                <Link to="/loans/education" className="p-3 border border-slate-100 rounded-xl hover:border-blue-100 hover:text-blue-600 transition-all">Education Loan</Link>
                                <Link to="/loans/car" className="p-3 border border-slate-100 rounded-xl hover:border-blue-100 hover:text-blue-600 transition-all">Car Loan</Link>
                                <Link to="/loans/used-car" className="p-3 border border-slate-100 rounded-xl hover:border-blue-100 hover:text-blue-600 transition-all">Used Car Loan</Link>
                                <Link to="/loans/two-wheeler" className="p-3 border border-slate-100 rounded-xl hover:border-blue-100 hover:text-blue-600 transition-all">Two Wheeler Loan</Link>
                                <Link to="/resources/gold-rates" className="p-3 border border-slate-100 rounded-xl hover:border-blue-100 hover:text-blue-600 transition-all">Gold Loan</Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute top-[90%] left-0 w-64 bg-white rounded-lg shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50 p-2">
                      <div className="flex flex-col gap-1">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className="px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-md transition-colors font-medium flex justify-between items-center group/item"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </nav>

          {/* 3. Action Buttons & Profile (Right) */}
          <div className="hidden lg:flex items-center gap-4">

            {/* Become Partner (Secondary) */}
            <div className="relative group">
              <button
                onClick={openPartnerModal}
                className="px-5 py-2.5 text-sm font-medium text-blue-700 bg-white border border-blue-200 rounded-full hover:bg-blue-50 transition-colors"
              >
                Become Partner
              </button>
              {/* Subtle Tooltip/Badge */}
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Earn upto ₹1L
              </span>
            </div>

            {/* Check Eligibility (Primary) */}
            <button
              onClick={() => openEligibilityModal()}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              Check Eligibility
            </button>

            {/* User Profile or Sign In */}
            <div className="pl-2 ml-2 border-l border-gray-200">
              {currentUser ? (
                <div className="relative group/profile">
                  <button className="flex items-center gap-3 p-1 hover:bg-slate-50 rounded-full pr-3 transition-colors border border-transparent hover:border-slate-100 cursor-pointer">
                    <div className="h-9 w-9 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">
                      {userData?.photoURL ? (
                        <img src={userData.photoURL} alt="Profile" className="h-9 w-9 rounded-full object-cover" />
                      ) : (
                        userData?.fullName?.charAt(0) || currentUser?.email?.charAt(0) || 'U'
                      )}
                    </div>
                    <div className="flex flex-col items-start leading-none text-left">
                      <span className="text-sm font-semibold text-slate-700 group-hover/profile:text-blue-700">
                        {userData?.fullName?.split(' ')[0] || currentUser?.displayName?.split(' ')[0] || 'User'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wide">My Account</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover/profile:text-blue-600 transition-transform duration-200 group-hover/profile:rotate-180" />
                  </button>

                  {/* Profile Dropdown */}
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all duration-200 transform translate-y-2 group-hover/profile:translate-y-0 z-50 overflow-hidden">
                    <div className="p-1">
                      <Link to="/profile" className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600 rounded-lg transition-colors">
                        <UserIcon className="w-4 h-4" />
                        My Profile
                      </Link>
                      <hr className="my-1 border-slate-100" />
                      <button
                        onClick={() => {
                          import('../../config/firebase').then(module => module.auth.signOut());
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left"
                      >
                        <span className="w-4 h-4 flex items-center justify-center">🛑</span>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={openLoginModal}
                  className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full transition-colors shadow-sm"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-t border-slate-100 shadow-xl max-h-[calc(100vh-4rem)] overflow-y-auto z-40 animate-in slide-in-from-top-2 duration-200">
          <div className="p-4 space-y-4">

            {/* Mobile Navigation Links */}
            <nav className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name} className="space-y-1">
                  {item.submenu ? (
                    <details className="group/mobile-item">
                      <summary className="flex items-center justify-between px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg cursor-pointer list-none font-medium">
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5 text-slate-400 group-hover/mobile-item:text-blue-600" />
                          {item.name}
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-open/mobile-item:rotate-180" />
                      </summary>
                      <div className="pl-12 pr-4 pb-2 space-y-1">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-2 text-sm text-slate-500 hover:text-blue-600 hover:bg-slate-50 rounded-md transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg font-medium"
                    >
                      <item.icon className="w-5 h-5 text-slate-400" />
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <hr className="border-slate-100" />

            {/* Mobile Actions */}
            <div className="space-y-3 p-2">
              <button
                onClick={() => {
                  openEligibilityModal();
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl active:scale-95 transition-transform"
              >
                <Smartphone className="w-5 h-5" />
                Check Eligibility
              </button>

              <button
                onClick={() => {
                  openPartnerModal();
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-3 text-blue-700 bg-blue-50 font-semibold rounded-xl border border-blue-100 active:scale-95 transition-transform"
              >
                Become Partner
              </button>

              {currentUser ? (
                <div className="pt-2">
                  <div className="flex items-center gap-3 px-2 mb-3">
                    <div className="h-10 w-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-lg">
                      {userData?.fullName?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{userData?.fullName || currentUser.displayName || 'User'}</p>
                      <p className="text-xs text-slate-500 truncate max-w-[200px]">{currentUser.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-4 py-2 border border-slate-200 rounded-lg text-slate-600 font-medium hover:bg-slate-50 mb-2"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={() => {
                      import('../../config/firebase').then(module => module.auth.signOut());
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-center px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded-lg"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    openLoginModal();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 text-slate-700 font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
