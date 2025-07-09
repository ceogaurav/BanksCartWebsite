import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  Calculator,
  TrendingUp,
  CreditCard,
  BadgeInfo,
  FileText,
} from 'lucide-react'; // All valid Lucide icons
import Button from './Button'; // Import the Button component

interface HeaderProps {
  openApplyModal: (loanType?: string) => void; // Existing prop for Loan Application Modal
  openEligibilityModal: (loanType?: string) => void; // Existing prop for Eligibility Check Modal
  openPartnerModal: () => void; // NEW: Add openPartnerModal prop
}

const Header: React.FC<HeaderProps> = ({ openApplyModal, openEligibilityModal, openPartnerModal }) => { // NEW: Destructure openPartnerModal
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const mainNav = [
    {
      name: 'Loans',
      href: '/loans',
      icon: CreditCard,
      submenu: [
        { name: 'Personal Loan', href: '/loans/personal' },
        { name: 'Home Loan', href: '/loans/home' },
        { name: 'Business Loan', href: '/loans/business' },
        { name: 'Car Loan', href: '/loans/car' },
        { name: 'Used Car Loan', href: '/loans/used-car' },
        { name: 'Two Wheeler Loan', href: '/loans/two-wheeler' },
        { name: 'Education Loan', href: '/loans/education' },
      ]
    },
    {
      name: 'Investment',
      href: '/investment',
      icon: TrendingUp,
      submenu: [
        { name: 'Fixed Deposit', href: '/investment/fixed-deposit' },
        { name: 'Mutual Funds', href: '/investment/mutual-funds' },
        { name: 'More Plans', href: '/investment/more-plans' },
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
      name: 'Insurance',
      href: '/insurance',
      icon: BadgeInfo,
      submenu: [
        { name: 'Health Insurance', href: '/insurance/health' },
        { name: 'Term Life Insurance', href: '/insurance/term-life' },
        { name: 'Car Insurance', href: '/insurance/car' },
      ]
    },
  ];
  const moreNav = [
    {
      name: 'Investment',
      href: '/investment',
      icon: TrendingUp,
      submenu: [
        { name: 'Fixed Deposit', href: '/investment/fixed-deposit' },
        { name: 'Mutual Funds', href: '/investment/mutual-funds' },
        { name: 'More Plans', href: '/investment/more-plans' },
      ]
    },
    {
      name: 'Resources',
      href: '/resources',
      icon: FileText,
      submenu: [
        { name: 'Calculators', href: '/calculators' },
        { name: 'Gold Rates', href: '/resources/gold-rates' },
        { name: 'Aadhar Card', href: '/resources/aadhar-pan' },
        { name: 'PanCard', href: '/resources/PanCard' },
        { name: 'IFSC Finder', href: '/resources/ifsc-finder' },
        { name: 'Pincodes', href: '/resources/pincodes' },
        { name: 'Loan Rates', href: '/resources/loan-rates' },
        { name: 'PPF', href: '/resources/ppf' },
        { name: 'Income Tax', href: '/resources/income-tax' },
      ]
    },
    {
      name: 'Calculators',
      href: '/calculators',
      icon: Calculator
    },
    {
      name: 'Become Partner',
      href: '/become-partner',
      icon: BadgeInfo
    },
    {
      name: 'Expert Advice',
      href: '/expert-advice',
      icon: BadgeInfo
    },
     {
      name: 'Credit Score',
      href: '/credit-score', // Corrected from '/creditscore.tsx'
      icon: TrendingUp // Reusing TrendingUp, or use CreditCard if preferred
    }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-xl sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/logos/bankscartlogof.jpg"
              alt="BanksCart Logo"
              className="h-14 w-auto rounded-xl shadow-xl group-hover:scale-110 transition-transform border-4 border-white/80"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {/* Main nav always visible */}
            {mainNav.map((item) => {
              const Icon = item.icon;
              if (item.submenu) {
                return (
                  <div key={item.name} className="relative group">
                    <Link
                      to={item.href}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-base font-semibold transition-all duration-200 shadow-sm border-2 border-transparent whitespace-nowrap ${
                        isActive(item.href)
                          ? 'bg-gradient-to-r from-primary-100 via-pink-100 to-secondary-100 text-primary-700 border-primary-300 shadow-lg scale-105'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:scale-105 hover:shadow-md'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                      <svg className="ml-1 h-3 w-3 text-gray-400 group-hover:text-primary-600 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </Link>
                    {/* Animated Dropdown */}
                    <div className="absolute right-full top-0 mt-0 mr-2 min-w-[220px] bg-white/95 shadow-2xl rounded-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:visible invisible transition-all duration-200 z-[60] border border-gray-100 ring-2 ring-primary-100">
                      <ul className="py-2">
                        {item.submenu.map((sub) => (
                          <li key={sub.name}>
                            <Link
                              to={sub.href}
                              className="block px-7 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-primary-100 hover:to-secondary-100 hover:text-primary-700 rounded-xl transition-all duration-150 font-semibold tracking-wide"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-base font-semibold transition-all duration-200 shadow-sm border-2 border-transparent whitespace-nowrap ${
                    isActive(item.href)
                      ? 'bg-gradient-to-r from-primary-100 via-pink-100 to-secondary-100 text-primary-700 border-primary-300 shadow-lg scale-105'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:scale-105 hover:shadow-md'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            {/* More dropdown for secondary nav */}
            <div className="relative group">
              <button
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-base font-semibold transition-all duration-200 shadow-sm border-2 border-transparent whitespace-nowrap text-gray-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:scale-105 hover:shadow-md"
              >
                <BadgeInfo className="h-5 w-5" />
                <span>More</span>
                <svg className="ml-1 h-3 w-3 text-gray-400 group-hover:text-primary-600 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
              <div className="absolute left-0 mt-3 min-w-[220px] bg-white/95 shadow-2xl rounded-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:visible invisible transition-all duration-200 z-50 border border-gray-100 ring-2 ring-primary-100">
                <ul className="py-2">
                  {moreNav.map((item) =>
                    item.submenu ? (
                      <li key={item.name} className="relative group">
                        <span className="flex items-center gap-2 px-7 py-2 text-gray-700 font-semibold tracking-wide cursor-pointer hover:bg-gradient-to-r hover:from-primary-100 hover:to-secondary-100 hover:text-primary-700 rounded-xl transition-all duration-150">
                          <item.icon className="h-5 w-5" />
                          {item.name}
                          <svg className="ml-1 h-3 w-3 text-gray-400 group-hover:text-primary-600 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                        </span>
                        {item.name === 'Resources' ? (
                          <div className="absolute right-full top-0 mt-0 mr-2 min-w-[220px] bg-white/95 shadow-2xl rounded-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:visible invisible transition-all duration-200 z-[60] border border-gray-100 ring-2 ring-primary-100">
                            <ul className="py-2">
                              {item.submenu.map((sub) => (
                                <li key={sub.name}>
                                  <Link
                                    to={sub.href}
                                    className="block px-7 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-primary-100 hover:to-secondary-100 hover:text-primary-700 rounded-xl transition-all duration-150 font-semibold tracking-wide"
                                  >
                                    {sub.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div className="absolute left-full top-0 mt-0 ml-2 min-w-[220px] bg-white/95 shadow-2xl rounded-2xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:visible invisible transition-all duration-200 z-[60] border border-gray-100 ring-2 ring-primary-100">
                            <ul className="py-2">
                              {item.submenu.map((sub) => (
                                <li key={sub.name}>
                                  <Link
                                    to={sub.href}
                                    className="block px-7 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-primary-100 hover:to-secondary-100 hover:text-primary-700 rounded-xl transition-all duration-150 font-semibold tracking-wide"
                                  >
                                    {sub.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </li>
                    ) : (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className="flex items-center gap-2 px-7 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-primary-100 hover:to-secondary-100 hover:text-primary-700 rounded-xl transition-all duration-150 font-semibold tracking-wide"
                        >
                          <item.icon className="h-5 w-5" />
                          {item.name}
                        </Link>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* "Become Partner" Button */}
            <div className="relative flex flex-col items-center">
              <Button
                variant="secondary"
                size="md"
                onClick={openPartnerModal} // NEW: Call openPartnerModal directly
                className="eye-catching-cta"
                style={{ fontWeight: 900 }}
              >
                <span className="drop-shadow">Become Partner</span>
              </Button>
              <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-xs font-semibold text-pink-600 bg-white/90 px-2 py-1 rounded-xl shadow-md border border-pink-200 animate-bounce z-10 whitespace-nowrap" style={{ minWidth: 'max-content' }}>
                Earn upto ₹1 lakh
              </span>
            </div>
            {/* "Check Eligibility" Button */}
            <Button
              variant="primary"
              size="md"
              onClick={() => openEligibilityModal()}
              className="eye-catching-cta"
              style={{ fontWeight: 900 }}
            >
              <span className="drop-shadow">Check Eligibility</span>
            </Button>
          </div>
          <style>
            {`
              @keyframes ctaPulse {
                0% { box-shadow: 0 0 0 0 rgba(236,72,153,0.5), 0 8px 32px 0 rgba(0,0,0,0.18); }
                70% { box-shadow: 0 0 0 12px rgba(236,72,153,0), 0 8px 32px 0 rgba(0,0,0,0.18); }
                100% { box-shadow: 0 0 0 0 rgba(236,72,153,0.5), 0 8px 32px 0 rgba(0,0,0,0.18); }
              }
              @keyframes ctaShine {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
              .eye-catching-cta {
                background: linear-gradient(90deg, #d946ef, #ec4899, #f59e42, #f472b6, #38bdf8, #d946ef);
                background-size: 400% 400%;
                color: #fff;
                padding: 0.5rem 1.5rem;
                border-radius: 1rem;
                font-weight: 900;
                font-size: 1rem;
                box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18);
                border: 2px solid transparent;
                transition: transform 0.2s, box-shadow 0.2s, border 0.2s;
                animation: ctaPulse 1.5s infinite;
                position: relative;
                overflow: hidden;
                z-index: 1;
                display: inline-block;
                margin: 0;
                cursor: pointer;
                background-position: 200% 0;
                animation-name: ctaPulse, ctaShine;
                animation-duration: 1.5s, 3s;
                animation-iteration-count: infinite, infinite;
                animation-timing-function: ease-in-out, linear;
              }
              .eye-catching-cta:hover {
                transform: scale(1.09) rotate(-1deg);
                border-color: #f472b6;
                box-shadow: 0 0 0 8px rgba(236,72,153,0.15), 0 8px 32px 0 rgba(0,0,0,0.22);
              }
              .eye-catching-cta span {
                position: relative;
                z-index: 2;
                text-shadow: 0 2px 8px rgba(0,0,0,0.12);
              }
            `}
          </style>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-2xl text-gray-600 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 border border-gray-200 shadow-md focus:ring-2 focus:ring-primary-200"
            aria-label="Open menu"
          >
            {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white/95 rounded-b-2xl shadow-2xl animate-fadeIn">
            <nav className="flex flex-col gap-2">
              {[...mainNav, ...moreNav].map((item) => {
                const Icon = item.icon;
                if (item.submenu) {
                  return (
                    <div key={item.name} className="mb-2">
                      <button
                        type="button"
                        className="flex items-center gap-3 px-5 py-3 rounded-2xl text-lg font-bold transition-all duration-200 shadow-sm border-2 border-transparent w-full text-left text-gray-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:scale-105 hover:shadow-md"
                        onClick={e => e.currentTarget.nextSibling.classList.toggle('hidden')}
                      >
                        <Icon className="h-6 w-6" />
                        <span>{item.name}</span>
                        <svg className="ml-1 h-3 w-3 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      <ul className="ml-8 mt-1 hidden">
                        {item.submenu.map((sub) => (
                          <li key={sub.name}>
                            <Link
                              to={sub.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="block px-5 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-primary-100 hover:to-secondary-100 hover:text-primary-700 rounded-xl font-semibold tracking-wide"
                            >
                              {sub.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-5 py-3 rounded-2xl text-lg font-bold transition-all duration-200 shadow-sm border-2 border-transparent ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-primary-100 via-pink-100 to-secondary-100 text-primary-700 border-primary-300 shadow-lg scale-105'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 hover:scale-105 hover:shadow-md'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              {/* "Become Partner" Button for mobile */}
              <Button
                variant="secondary"
                size="md"
                className="w-full mt-4"
                onClick={() => { openPartnerModal(); setIsMenuOpen(false); }} // NEW: Call openPartnerModal directly
              >
                Become Partner
              </Button>
              {/* "Check Eligibility" Button for mobile */}
              <Button
                variant="primary"
                size="md"
                className="w-full mt-2"
                onClick={() => { openEligibilityModal(); setIsMenuOpen(false); }}
              >
                Check Eligibility
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
