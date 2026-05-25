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
