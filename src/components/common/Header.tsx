import React, { useState, useEffect } from 'react';
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
  Gauge,
  Banknote,
  Briefcase,
  Home as HomeIcon,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  LogOut,
  Landmark,
  Coins,
  Calculator,
  Compass,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';

interface HeaderProps {
  openApplyModal: (loanType?: string) => void;
  openEligibilityModal: (loanType?: string) => void;
  openPartnerModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ openApplyModal, openEligibilityModal, openPartnerModal }) => {
  const { currentUser, openLoginModal, userData } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLoanTab, setActiveLoanTab] = useState<'personal' | 'business' | 'home' | 'other'>('personal');
  const location = useLocation();

  // Scroll listener for adaptive glassmorphic elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  // Navigation schema
  const navigation = [
    {
      name: 'Credit Score',
      href: '/credit-score',
      icon: Gauge,
      badge: 'FREE',
      submenu: [
        { name: 'Credit Score FREE Check', href: '/cibil-credit-report', desc: 'Instant bureau score & full PDF report' },
        { name: 'CIBIL Score Check by PAN', href: '/cibil/how-to-check-cibil-score-by-pan-card', desc: '100% verified soft check with zero impact' },
        { name: 'SBI CIBIL Score', href: '/cibil-report/cibil-score-sbi-loans', desc: 'Sanction benchmark for SBI loans' },
        { name: 'How to Increase CIBIL Score', href: '/credit-report/ways-to-improve-your-cibil-score', desc: 'Proven strategies to cross 750+' },
        { name: 'CIBIL Score for Personal Loan', href: '/credit-score/cibil-score-for-personal-loan', desc: 'Minimum score criteria by tier-1 banks' },
        { name: 'Resolve CIBIL Dispute', href: '/cibil/how-to-resolve-cibil-dispute', desc: 'Rectify incorrect bureau defaults online' },
      ]
    },
    {
      name: 'Loans',
      href: '/loans',
      icon: Banknote,
      isLoanMegaMenu: true,
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
      fullName: 'Credit Cards',
      href: '/cards',
      icon: CreditCard,
      isCardsMegaMenu: true,
      submenu: [
        { name: 'Credit Card Overview', href: '/cards/credit/overview', desc: 'Explore 50+ handpicked cards' },
        { name: 'Best Credit Cards 2026', href: '/cards/credit/best-cards', desc: 'Top cashback, travel & reward cards' },
        { name: 'Lifetime Free Credit Cards', href: '/cards/credit/lifetime-free', desc: 'Zero annual fee forever' },
        { name: 'Cashback & Fuel Cards', href: '/cards/credit/cashback', desc: 'Up to 5% savings on spends' },
        { name: 'Airport Lounge Access Cards', href: '/cards/credit/lounge-access', desc: 'Complimentary domestic & intl access' },
        { name: 'Rewards Credit Cards', href: '/cards/credit/rewards', desc: 'Accelerated reward points' },
        { name: 'Rupay UPI Credit Cards', href: '/cards/credit/rupay', desc: 'Link cards directly to UPI' },
        { name: 'Zero Forex Markup Cards', href: '/cards/credit/zero-forex', desc: 'Save on international spends' },
        { name: 'Credit Card Eligibility', href: '/cards/credit/eligibility', desc: 'Check cards matched to your salary' },
      ]
    },
    {
      name: 'Investment',
      href: '/investment',
      icon: TrendingUp,
      isInvestmentMegaMenu: true,
      submenu: [
        // Bonds
        { name: 'Bonds Overview', href: '/investment/bonds/overview' },
        { name: 'Corporate Bonds', href: '/investment/bonds/corporate' },
        { name: 'Government Bonds & G-Secs', href: '/investment/bonds/government' },
        { name: 'Tax Free Bonds', href: '/investment/bonds/tax-free' },
        { name: 'Floating Rate Savings Bonds', href: '/investment/bonds/floating-rate' },
        { name: 'Section 54EC Capital Gain Bonds', href: '/investment/bonds/capital-gain' },
        { name: 'Zero Coupon Bonds', href: '/investment/bonds/zero-coupon' },
        { name: 'How to Invest in Bonds', href: '/investment/bonds/how-to-invest' },
        { name: 'Sovereign Gold Bonds (SGB)', href: '/investment/bonds/sovereign-gold' },
        // Fixed Deposit
        { name: 'Fixed Deposit Interest Rates', href: '/investment/fd/rates' },
        { name: 'Senior Citizen FD Rates', href: '/investment/fd/senior-citizen' },
        { name: 'Loan Against Fixed Deposit', href: '/investment/fd/loan-against-fd' },
        { name: 'FD vs Mutual Funds', href: '/investment/fd/fd-vs-mf' },
        { name: 'FD vs RD', href: '/investment/fd/fd-vs-rd' },
        { name: 'Post Office FD Rates', href: '/investment/fd/post-office-rates' },
        { name: 'Recurring Deposit Guide', href: '/investment/fd/recurring-deposit' },
        // Mutual Funds
        { name: 'Mutual Funds Hub', href: '/investment/mutual-funds/overview' },
        { name: 'Large Cap Mutual Funds', href: '/investment/mutual-funds/large-cap' },
        { name: 'Mid Cap Mutual Funds', href: '/investment/mutual-funds/mid-cap' },
        { name: 'Small Cap Mutual Funds', href: '/investment/mutual-funds/small-cap' },
        { name: 'ELSS Tax Saver Funds', href: '/investment/mutual-funds/elss' },
        { name: 'Mutual Fund Investment Guide', href: '/investment/mutual-funds/investment' },
        { name: 'Systematic Withdrawal Plan (SWP)', href: '/investment/mutual-funds/swp' },
        { name: 'Flexi Cap Funds', href: '/investment/mutual-funds/flexi-cap' },
        { name: 'Liquid Funds', href: '/investment/mutual-funds/liquid' },
      ]
    },
    {
      name: 'Calculators',
      href: '/calculators',
      icon: Calculator,
      isCalcMegaMenu: true,
      submenu: [
        // Investment Calculators
        { name: 'Fixed Deposit Calculator', href: '/calculators/investment/fixed-deposit' },
        { name: 'GST Calculator', href: '/calculators/investment/gst' },
        { name: 'Mutual Fund Calculator', href: '/calculators/investment/mutual-fund' },
        { name: 'NPS Pension Calculator', href: '/calculators/investment/nps' },
        { name: 'Post Office FD Calculator', href: '/calculators/investment/post-office-fd' },
        { name: 'SIP Compounding Calculator', href: '/calculators/investment/sip' },
        // Loan EMI Calculators
        { name: 'Personal Loan EMI Calculator', href: '/calculators/loan/personal-loan-emi' },
        { name: 'Home Loan EMI Calculator', href: '/calculators/loan/home-loan-emi' },
        { name: 'Business Loan EMI Calculator', href: '/calculators/loan/business-loan-emi' },
        { name: 'Loan Against Property EMI', href: '/calculators/loan/loan-against-property-emi' },
        { name: 'Gold Loan EMI Calculator', href: '/calculators/loan/gold-loan-emi' },
        { name: 'Term Loan EMI Calculator', href: '/calculators/loan/term-loan-emi' },
        { name: 'Tractor Loan EMI Calculator', href: '/calculators/loan/tractor-loan-emi' },
        { name: 'Mudra Loan EMI Calculator', href: '/calculators/loan/mudra-loan-emi' },
        // Loan Eligibility Calculators
        { name: 'Personal Loan Eligibility', href: '/calculators/eligibility/personal-loan-eligibility' },
        { name: 'Home Loan Eligibility', href: '/calculators/eligibility/home-loan-eligibility' },
        { name: 'Home Loan Prepayment Savings', href: '/calculators/prepayment/home-loan-prepayment' },
        { name: 'Personal Loan Prepayment', href: '/calculators/prepayment/personal-loan-prepayment' },
      ]
    },
    {
      name: 'Recharge',
      fullName: 'Recharge & Bills',
      href: '/recharge/overview',
      icon: Smartphone,
      submenu: [
        { name: 'Mobile Prepaid Recharge', href: '/recharge/mobile', desc: 'Airtel, Jio, Vi instant recharge' },
        { name: 'Mobile Postpaid Bill', href: '/recharge/postpaid', desc: 'Fast postpaid settlement' },
        { name: 'Electricity Bill Payment', href: '/recharge/electricity', desc: '60+ state discoms supported' },
        { name: 'DTH TV Recharge', href: '/recharge/dth', desc: 'Tata Play, Airtel DTH, Dish TV' },
        { name: 'FASTag Toll Recharge', href: '/recharge/fastag', desc: 'Instant toll balance top-up' },
        { name: 'LPG Gas Booking', href: '/recharge/lpg', desc: 'HP, Indane & Bharat Gas' },
        { name: 'Loan EMI Payment', href: '/recharge/loan-emi', desc: 'Direct NBFC & Bank repayment' },
        { name: 'BBPS Bill Payments Hub', href: '/recharge/overview', desc: 'All utility bills in one place' },
      ]
    },
    {
      name: 'Insurance',
      href: '/insurance',
      icon: BadgeInfo,
      submenu: [
        { name: 'Health Insurance', href: '/insurance/health', desc: '1 Crore cashless hospitalization & OPD' },
        { name: 'Car Insurance', href: '/insurance/car', desc: 'Zero depreciation & instant digital claims' },
        { name: 'Term Life Insurance', href: '/insurance/term-life', desc: 'Pure risk life cover with MWPA protection' },
      ]
    },
    {
      name: 'Resources',
      href: '/resources',
      icon: FileText,
      isResourcesMenu: true,
      submenu: [
        { name: 'All-India Banks Directory (22+ Banks)', href: '/banks', desc: 'SBI, HDFC, ICICI, PNB rates & branches', isHighlight: true },
        { name: 'IFSC & MICR Code Finder', href: '/resources/ifsc-finder', desc: 'Verified 11-digit codes across India' },
        { name: 'Pincodes Directory', href: '/resources/pincodes', desc: 'Search postal circles & branch coverage' },
        { name: 'Loan Interest Rates Directory', href: '/resources/loan-rates', desc: 'Live bank comparison table' },
        { name: 'Gold Rates Today (24K / 22K)', href: '/resources/gold-rates', desc: 'Daily benchmark spot prices' },
        { name: 'Aadhaar-PAN Link Status', href: '/resources/aadhar-pan', desc: 'CBDT compliance check' },
        { name: 'PAN Card Verification', href: '/resources/PanCard', desc: 'Instant NSDL validation' },
        { name: 'Public Provident Fund (PPF)', href: '/resources/ppf', desc: 'Interest rates & tax benefits' },
        { name: 'Income Tax Slabs (FY 2025-26)', href: '/resources/income-tax', desc: 'New vs Old tax comparison' },
        { name: 'Expert Financial Advice', href: '/expert-advice', desc: 'Guidance from certified planners' },
        { name: 'Financial Literacy Blogs', href: '/blog', desc: 'Latest borrowing & investment guides' },
      ]
    },
  ];

  return (
    <header 
      className={`site-header fixed top-0 w-full z-50 transition-all duration-300 font-ibm ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl border-b border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.08)] h-16' 
          : 'bg-white/98 backdrop-blur-lg border-b border-slate-200/70 h-16'
      }`}
    >
      {/* Top Hairline Brand Accent Strip */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#1E3A8A] via-amber-500 to-emerald-500 opacity-90 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 xl:px-4 2xl:px-8 h-full">
        <div className="flex justify-between items-center h-full gap-2 xl:gap-2.5">
          
          {/* 1. BRAND LOGO SECTION */}
          <Link 
            to="/" 
            className="flex-shrink-0 flex items-center gap-2 group transition-transform active:scale-95"
            aria-label="BanksCart Home"
          >
            <img
              src="/logos/bankscartlogof.jpg"
              alt="BanksCart"
              width="140"
              height="34"
              style={{ aspectRatio: "140/34" }}
              className="h-8 xl:h-9 w-auto max-w-[125px] xl:max-w-[135px] 2xl:max-w-[150px] object-contain transition-opacity duration-200 group-hover:opacity-90"
            />
          </Link>

          {/* 2. DESKTOP INTERACTIVE NAVIGATION BAR (Visible on xl: 1280px+) */}
          <nav className="hidden xl:flex items-center gap-0.5 2xl:gap-1.5 h-full">
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <div key={item.name} className="relative group h-full flex items-center">
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1 px-1.5 xl:px-2 2xl:px-2.5 py-1.5 rounded-full text-xs 2xl:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                      active
                        ? 'text-[#1E3A8A] bg-blue-50 font-bold'
                        : 'text-slate-700 hover:text-[#1E3A8A] hover:bg-slate-100/70'
                    }`}
                  >
                    <span className="hidden 2xl:inline">{item.fullName || item.name}</span>
                    <span className="2xl:hidden">{item.name}</span>

                    {item.badge && (
                      <span className="hidden 2xl:inline-block text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 leading-none">
                        {item.badge}
                      </span>
                    )}

                    {item.submenu && (
                      <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-[#1E3A8A] transition-transform duration-200 group-hover:rotate-180 flex-shrink-0" />
                    )}
                  </Link>

                  {/* MEGA MENU: LOANS SPECIALIZED PANEL */}
                  {item.isLoanMegaMenu && item.submenu && (
                    <div className="absolute top-[85%] left-0 w-[780px] 2xl:w-[820px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 overflow-hidden">
                      <div className="grid grid-cols-12">
                        
                        {/* Left Tab Categories */}
                        <div className="col-span-4 bg-slate-50/80 p-3.5 border-r border-slate-100 flex flex-col gap-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 pb-1">
                            Lending Categories
                          </span>
                          
                          <button
                            type="button"
                            onMouseEnter={() => setActiveLoanTab('personal')}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                              activeLoanTab === 'personal'
                                ? 'bg-white text-[#1E3A8A] shadow-xs border border-slate-200/80'
                                : 'text-slate-600 hover:bg-slate-100/70'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Banknote className="w-3.5 h-3.5 text-[#1E3A8A]" />
                              <span>Personal Loan</span>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                              10.49%
                            </span>
                          </button>

                          <button
                            type="button"
                            onMouseEnter={() => setActiveLoanTab('business')}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                              activeLoanTab === 'business'
                                ? 'bg-white text-[#1E3A8A] shadow-xs border border-slate-200/80'
                                : 'text-slate-600 hover:bg-slate-100/70'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Briefcase className="w-3.5 h-3.5 text-[#1E3A8A]" />
                              <span>Business Loan</span>
                            </div>
                            <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-bold">
                              MSME
                            </span>
                          </button>

                          <button
                            type="button"
                            onMouseEnter={() => setActiveLoanTab('home')}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                              activeLoanTab === 'home'
                                ? 'bg-white text-[#1E3A8A] shadow-xs border border-slate-200/80'
                                : 'text-slate-600 hover:bg-slate-100/70'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <HomeIcon className="w-3.5 h-3.5 text-[#1E3A8A]" />
                              <span>Home Loan</span>
                            </div>
                            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                              8.35%
                            </span>
                          </button>

                          <button
                            type="button"
                            onMouseEnter={() => setActiveLoanTab('other')}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold transition-all cursor-pointer ${
                              activeLoanTab === 'other'
                                ? 'bg-white text-[#1E3A8A] shadow-xs border border-slate-200/80'
                                : 'text-slate-600 hover:bg-slate-100/70'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-3.5 h-3.5 text-[#1E3A8A]" />
                              <span>Specialty Credit</span>
                            </div>
                            <span className="text-[10px] text-slate-500 font-medium">
                              Auto / Gold
                            </span>
                          </button>

                          {/* Quick Bottom Anchor to Bank Directory */}
                          <div className="mt-4 pt-3 border-t border-slate-200/60">
                            <Link
                              to="/banks"
                              className="p-2.5 rounded-xl bg-blue-50/80 hover:bg-blue-100/80 text-[#1E3A8A] flex items-center justify-between text-xs font-bold transition-colors"
                            >
                              <span className="flex items-center gap-1.5">
                                <Landmark className="w-3.5 h-3.5" />
                                22+ Bank Directories
                              </span>
                              <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>

                        {/* Right Detail Panel */}
                        <div className="col-span-8 p-5 bg-white flex flex-col justify-between">
                          {activeLoanTab === 'personal' && (
                            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                              <div>
                                <h4 className="font-bold text-xs uppercase tracking-wide text-[#1E3A8A] mb-2.5 flex items-center gap-1.5">
                                  <FileText className="w-3.5 h-3.5" /> Core Personal Products
                                </h4>
                                <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                                  <Link to="/loans/personal/overview" className="hover:text-[#1E3A8A] transition-colors flex items-center justify-between">
                                    <span>Personal Loan Overview</span>
                                    <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1 py-0.2 rounded">Popular</span>
                                  </Link>
                                  <Link to="/loans/personal/pre-approved" className="hover:text-[#1E3A8A] transition-colors">Pre-Approved Personal Loan</Link>
                                  <Link to="/loans/personal/interest-rates" className="hover:text-[#1E3A8A] transition-colors">Interest Rate Comparison</Link>
                                  <Link to="/loans/personal/low-cibil-score" className="hover:text-[#1E3A8A] transition-colors">Low CIBIL Personal Loan</Link>
                                  <Link to="/loans/personal/balance-transfer" className="hover:text-[#1E3A8A] transition-colors">Loan Balance Transfer</Link>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-bold text-xs uppercase tracking-wide text-[#1E3A8A] mb-2.5 flex items-center gap-1.5">
                                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Specific Borrowers
                                </h4>
                                <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                                  <Link to="/loans/personal/salaried" className="hover:text-[#1E3A8A] transition-colors">Personal Loan for Salaried</Link>
                                  <Link to="/loans/personal/self-employed" className="hover:text-[#1E3A8A] transition-colors">Loan for Self Employed</Link>
                                  <Link to="/loans/personal/pensioners" className="hover:text-[#1E3A8A] transition-colors">Pensioner Loan Schemes</Link>
                                  <Link to="/loans/personal/doctors" className="hover:text-[#1E3A8A] transition-colors">Personal Loan for Doctors</Link>
                                  <Link to="/loans/personal/women" className="hover:text-[#1E3A8A] transition-colors">Concessional Rates for Women</Link>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeLoanTab === 'business' && (
                            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                              <div>
                                <h4 className="font-bold text-xs uppercase tracking-wide text-[#1E3A8A] mb-2.5 flex items-center gap-1.5">
                                  <Briefcase className="w-3.5 h-3.5" /> Commercial & MSME
                                </h4>
                                <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                                  <Link to="/business-loan" className="hover:text-[#1E3A8A] transition-colors">Business Loan Overview</Link>
                                  <Link to="/business-loan/collateral-free" className="hover:text-[#1E3A8A] transition-colors">Collateral-Free MSME Credit</Link>
                                  <Link to="/business-loan/msme-scheme" className="hover:text-[#1E3A8A] transition-colors">CGTMSE Government Scheme</Link>
                                  <Link to="/calculators/loan/business-loan-emi" className="hover:text-[#1E3A8A] transition-colors">Business Loan EMI Calculator</Link>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-bold text-xs uppercase tracking-wide text-[#1E3A8A] mb-2.5 flex items-center gap-1.5">
                                  <Building2 className="w-3.5 h-3.5" /> Enterprise Services
                                </h4>
                                <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                                  <Link to="/company-registration" className="hover:text-[#1E3A8A] transition-colors">Pvt Ltd Company Registration</Link>
                                  <Link to="/company-registration/copyright-registration" className="hover:text-[#1E3A8A] transition-colors">Copyright Registration</Link>
                                  <Link to="/business-loan/company-registration-in-delhi" className="hover:text-[#1E3A8A] transition-colors">Company Registration (Delhi)</Link>
                                  <Link to="/business-loan/company-registration-in-bangalore" className="hover:text-[#1E3A8A] transition-colors">Company Registration (BLR)</Link>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeLoanTab === 'home' && (
                            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                              <div>
                                <h4 className="font-bold text-xs uppercase tracking-wide text-[#1E3A8A] mb-2.5 flex items-center gap-1.5">
                                  <HomeIcon className="w-3.5 h-3.5" /> Residential Mortgages
                                </h4>
                                <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                                  <Link to="/loans/home" className="hover:text-[#1E3A8A] transition-colors">Home Loan Overview</Link>
                                  <Link to="/loans/home-loan-balance-transfer" className="hover:text-[#1E3A8A] transition-colors">Home Loan Balance Transfer</Link>
                                  <Link to="/plot-construction-loan" className="hover:text-[#1E3A8A] transition-colors">Plot & Construction Loan</Link>
                                  <Link to="/home-loan-compare" className="hover:text-[#1E3A8A] transition-colors">Compare 30+ Home Loan Rates</Link>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-bold text-xs uppercase tracking-wide text-[#1E3A8A] mb-2.5 flex items-center gap-1.5">
                                  <Calculator className="w-3.5 h-3.5" /> Mortgage Tools
                                </h4>
                                <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                                  <Link to="/calculators/loan/home-loan-emi" className="hover:text-[#1E3A8A] transition-colors">Home Loan EMI Calculator</Link>
                                  <Link to="/calculators/prepayment/home-loan-prepayment" className="hover:text-[#1E3A8A] transition-colors">Prepayment Savings Calculator</Link>
                                  <Link to="/calculators/eligibility/home-loan-eligibility" className="hover:text-[#1E3A8A] transition-colors">Home Loan Eligibility Checker</Link>
                                </div>
                              </div>
                            </div>
                          )}

                          {activeLoanTab === 'other' && (
                            <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                              <div>
                                <h4 className="font-bold text-xs uppercase tracking-wide text-[#1E3A8A] mb-2.5 flex items-center gap-1.5">
                                  <Coins className="w-3.5 h-3.5" /> Secured & Vehicle
                                </h4>
                                <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                                  <Link to="/loans/car" className="hover:text-[#1E3A8A] transition-colors">New Car Loan</Link>
                                  <Link to="/loans/used-car" className="hover:text-[#1E3A8A] transition-colors">Used Car Refinance</Link>
                                  <Link to="/loans/two-wheeler" className="hover:text-[#1E3A8A] transition-colors">Two-Wheeler Loan</Link>
                                  <Link to="/resources/gold-rates" className="hover:text-[#1E3A8A] transition-colors">Gold Loan Rates Today</Link>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-bold text-xs uppercase tracking-wide text-[#1E3A8A] mb-2.5 flex items-center gap-1.5">
                                  <Compass className="w-3.5 h-3.5" /> Higher Studies
                                </h4>
                                <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                                  <Link to="/loans/education" className="hover:text-[#1E3A8A] transition-colors">Education Loan (India & Overseas)</Link>
                                  <Link to="/calculators/loan/gold-loan-emi" className="hover:text-[#1E3A8A] transition-colors">Gold Loan EMI Calculator</Link>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Bottom Matchmaker Banner */}
                          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between bg-blue-50/50 -mx-5 -mb-5 px-5 py-3">
                            <span className="text-[11px] font-semibold text-slate-600">
                              ⚡ Check your personalized approval odds across 30+ lenders in 60 seconds
                            </span>
                            <button
                              type="button"
                              onClick={() => openEligibilityModal()}
                              className="text-xs font-bold text-[#1E3A8A] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              Check Instant Eligibility <ArrowRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* MEGA MENU: CREDIT CARDS */}
                  {item.isCardsMegaMenu && item.submenu && (
                    <div className="absolute top-[85%] left-0 w-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 p-4 overflow-hidden">
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {item.submenu.map((sub: any) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className="p-2 rounded-xl transition-all flex flex-col text-slate-700 hover:bg-slate-50 hover:text-[#1E3A8A]"
                          >
                            <span className="text-xs font-bold">{sub.name}</span>
                            {sub.desc && (
                              <span className="text-[10px] text-slate-400 font-normal leading-tight mt-0.5">
                                {sub.desc}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-[#1E3A8A] bg-amber-50/60 -mx-4 -mb-4 px-4 py-2.5">
                        <span>✨ Zero Joining Fee & 5% Fuel Cashback Offers</span>
                        <Link to="/cards/credit/best-cards" className="font-bold hover:underline flex items-center gap-1">
                          View Cards <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* MEGA MENU: INVESTMENT (3 Columns) */}
                  {item.isInvestmentMegaMenu && item.submenu && (
                    <div className="absolute top-[85%] left-1/2 -translate-x-[35%] w-[840px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 p-5 overflow-hidden">
                      <div className="grid grid-cols-3 gap-6">
                        {/* Bonds */}
                        <div>
                          <h4 className="font-bold text-xs uppercase tracking-wide text-[#1E3A8A] mb-3 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-blue-600" />
                            Government & Bonds
                          </h4>
                          <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                            {item.submenu.slice(0, 9).map((sub) => (
                              <Link key={sub.name} to={sub.href} className="hover:text-[#1E3A8A] transition-colors truncate">
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Fixed Deposits */}
                        <div>
                          <h4 className="font-bold text-xs uppercase tracking-wide text-[#1E3A8A] mb-3 flex items-center gap-1.5">
                            <Landmark className="w-4 h-4 text-amber-600" />
                            Fixed Deposit Slabs
                          </h4>
                          <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                            {item.submenu.slice(9, 16).map((sub) => (
                              <Link key={sub.name} to={sub.href} className="hover:text-[#1E3A8A] transition-colors truncate">
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Mutual Funds */}
                        <div>
                          <h4 className="font-bold text-xs uppercase tracking-wide text-[#1E3A8A] mb-3 flex items-center gap-1.5">
                            <TrendingUp className="w-4 h-4 text-emerald-600" />
                            Mutual Funds (0% Comm)
                          </h4>
                          <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                            {item.submenu.slice(16).map((sub) => (
                              <Link key={sub.name} to={sub.href} className="hover:text-[#1E3A8A] transition-colors truncate">
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* MEGA MENU: CALCULATORS (3 Columns) */}
                  {item.isCalcMegaMenu && item.submenu && (
                    <div className="absolute top-[85%] left-1/2 -translate-x-[45%] w-[840px] bg-white rounded-2xl shadow-2xl border border-slate-200/90 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 p-5 overflow-hidden">
                      <div className="grid grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-bold text-xs uppercase tracking-wide text-[#1E3A8A] mb-3 flex items-center gap-1.5">
                            <TrendingUp className="w-4 h-4 text-blue-600" />
                            Investment Tools
                          </h4>
                          <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                            {item.submenu.slice(0, 6).map((sub) => (
                              <Link key={sub.name} to={sub.href} className="hover:text-[#1E3A8A] transition-colors truncate">
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-xs uppercase tracking-wide text-[#1E3A8A] mb-3 flex items-center gap-1.5">
                            <CreditCard className="w-4 h-4 text-amber-600" />
                            Loan EMI Calculators
                          </h4>
                          <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                            {item.submenu.slice(6, 14).map((sub) => (
                              <Link key={sub.name} to={sub.href} className="hover:text-[#1E3A8A] transition-colors truncate">
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-xs uppercase tracking-wide text-[#1E3A8A] mb-3 flex items-center gap-1.5">
                            <Gauge className="w-4 h-4 text-emerald-600" />
                            Eligibility &amp; Savings
                          </h4>
                          <div className="flex flex-col gap-2 text-xs font-semibold text-slate-600">
                            {item.submenu.slice(14).map((sub) => (
                              <Link key={sub.name} to={sub.href} className="hover:text-[#1E3A8A] transition-colors truncate">
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* STANDARD SUBMENU DROPDOWNS (Credit Score, Recharge, Insurance, Resources) */}
                  {!item.isLoanMegaMenu && !item.isCardsMegaMenu && !item.isInvestmentMegaMenu && !item.isCalcMegaMenu && item.submenu && (
                    <div className={`absolute top-[85%] ${item.isResourcesMenu ? 'right-0 w-[360px]' : 'left-0 w-64'} bg-white rounded-2xl shadow-2xl border border-slate-200/90 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50 p-2.5 overflow-hidden`}>
                      <div className="flex flex-col gap-1 max-h-[420px] overflow-y-auto">
                        {item.submenu.map((sub: any) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className={`p-2 rounded-xl transition-all flex flex-col ${
                              sub.isHighlight 
                                ? 'bg-blue-50/80 text-[#1E3A8A] font-bold border border-blue-200/60'
                                : 'text-slate-700 hover:bg-slate-50 hover:text-[#1E3A8A]'
                            }`}
                          >
                            <span className="text-xs font-semibold">{sub.name}</span>
                            {sub.desc && (
                              <span className="text-[10px] text-slate-400 font-normal leading-tight mt-0.5">
                                {sub.desc}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                </div>
              );
            })}
          </nav>

          {/* 3. RIGHT ACTION CTAS & USER PROFILE (Desktop) */}
          {/* 3. RIGHT ACTION CTAS & USER PROFILE (Desktop) */}
          <div className="hidden xl:flex items-center gap-2 2xl:gap-3 flex-shrink-0">
            
            {/* Become Partner Pill */}
            <div className="relative group">
              <button
                type="button"
                onClick={openPartnerModal}
                className="inline-flex items-center gap-1.5 px-2.5 2xl:px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100/90 hover:bg-slate-200/90 border border-slate-200/80 rounded-full transition-all shadow-2xs whitespace-nowrap active:scale-95 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="hidden 2xl:inline">Become Partner</span>
                <span className="2xl:hidden">Partner</span>
              </button>
              
              {/* Tooltip Badge */}
              <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 bg-slate-900 text-white text-[10px] font-semibold rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                Earn upto ₹1 Lakh/mo
              </span>
            </div>

            {/* Check Eligibility Button (Primary Conversion Gold CTA) */}
            <button
              type="button"
              onClick={() => openEligibilityModal()}
              className="px-3 2xl:px-4 py-1.5 text-xs 2xl:text-sm font-bold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-xl shadow-xs hover:shadow-md transition-all duration-200 whitespace-nowrap flex items-center gap-1.5 group cursor-pointer active:scale-95"
            >
              <span className="hidden 2xl:inline">Check Eligibility</span>
              <span className="2xl:hidden">Eligibility</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>

            {/* User Profile or Sign In */}
            <div className="pl-1 border-l border-slate-200">
              {currentUser ? (
                <div className="relative group/profile">
                  <button className="flex items-center gap-1.5 p-1 hover:bg-slate-50 rounded-full pr-2 transition-colors border border-transparent hover:border-slate-200 cursor-pointer whitespace-nowrap">
                    <div className="h-7 w-7 2xl:h-8 2xl:w-8 bg-blue-100 text-[#1E3A8A] rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                      {userData?.photoURL ? (
                        <img 
                          src={userData.photoURL} 
                          alt="Profile" 
                          width="32" 
                          height="32" 
                          className="h-7 w-7 2xl:h-8 2xl:w-8 rounded-full object-cover" 
                        />
                      ) : (
                        userData?.fullName?.charAt(0) || currentUser?.email?.charAt(0) || 'U'
                      )}
                    </div>
                    <div className="hidden 2xl:flex flex-col items-start leading-none text-left">
                      <span className="text-xs font-bold text-slate-800 group-hover/profile:text-[#1E3A8A]">
                        {userData?.fullName?.split(' ')[0] || currentUser?.displayName?.split(' ')[0] || 'User'}
                      </span>
                      <span className="text-[9px] text-slate-400 font-medium uppercase tracking-wider">Account</span>
                    </div>
                    <ChevronDown className="w-3 h-3 text-slate-400 group-hover/profile:text-[#1E3A8A] transition-transform duration-200 group-hover/profile:rotate-180 flex-shrink-0" />
                  </button>

                  {/* Profile Dropdown */}
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover/profile:opacity-100 group-hover/profile:visible transition-all duration-200 transform translate-y-2 group-hover/profile:translate-y-0 z-50 overflow-hidden">
                    <div className="p-1">
                      <Link to="/profile" className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-[#1E3A8A] rounded-lg transition-colors">
                        <UserIcon className="w-3.5 h-3.5" />
                        My Profile
                      </Link>
                      <hr className="my-1 border-slate-100" />
                      <button
                        onClick={() => {
                          import('../../config/firebase').then(module => module.auth.signOut());
                        }}
                        className="w-full flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-colors text-left cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={openLoginModal}
                  className="text-xs 2xl:text-sm font-semibold text-slate-700 hover:text-[#1E3A8A] hover:bg-slate-100/80 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

          </div>

          {/* 4. TABLET & MOBILE BAR (Under 1280px) */}
          <div className="flex xl:hidden items-center gap-2">
            {/* Quick Check Eligibility CTA on Tablet */}
            <button
              type="button"
              onClick={() => openEligibilityModal()}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-amber-700 hover:bg-amber-800 rounded-lg shadow-xs transition-transform active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <span>Eligibility</span>
              <ArrowRight className="w-3 h-3" />
            </button>

            {/* Quick Sign In or User Initials */}
            {currentUser ? (
              <Link 
                to="/profile"
                className="h-8 w-8 rounded-full bg-blue-100 text-[#1E3A8A] font-bold text-xs flex items-center justify-center border border-blue-200"
                aria-label="User Account"
              >
                {userData?.fullName?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
              </Link>
            ) : (
              <button
                type="button"
                onClick={openLoginModal}
                className="px-2.5 py-1.5 text-[11px] sm:text-xs font-semibold text-[#1E3A8A] bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors whitespace-nowrap cursor-pointer"
              >
                Sign In
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer border border-slate-200/80"
              aria-label="Toggle Navigation Menu"
            >
              {isMenuOpen ? <X className="w-5 h-5 text-slate-800" /> : <Menu className="w-5 h-5 text-slate-800" />}
            </button>
          </div>

        </div>
      </div>

      {/* 5. MOBILE & TABLET DRAWER PANEL */}
      {isMenuOpen && (
        <div className="xl:hidden absolute top-16 left-0 w-full bg-white border-t border-slate-200 shadow-2xl max-h-[calc(100vh-4rem)] overflow-y-auto z-40 animate-in slide-in-from-top-2 duration-200 font-ibm">
          <div className="p-4 space-y-4">
            
            {/* Quick Action Buttons in Mobile Drawer */}
            <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-100">
              <button
                type="button"
                onClick={() => {
                  openEligibilityModal();
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs active:scale-95 transition-transform"
              >
                <span>Check Eligibility</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => {
                  openPartnerModal();
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 px-3 py-2.5 bg-blue-50 text-[#1E3A8A] font-bold text-xs rounded-xl border border-blue-200/80 active:scale-95 transition-transform"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Partner (Earn ₹1L)</span>
              </button>
            </div>

            {/* Quick Bank Directory Banner */}
            <Link
              to="/banks"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center justify-between p-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 rounded-xl text-xs font-bold text-[#1E3A8A]"
            >
              <div className="flex items-center gap-2">
                <Landmark className="w-4 h-4 text-[#1E3A8A]" />
                <span>22+ Scheduled Commercial Banks Directory</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            {/* Mobile Navigation Accordion List */}
            <nav className="space-y-1">
              {navigation.map((item) => (
                <div key={item.name} className="space-y-1">
                  {item.submenu ? (
                    <details className="group/mobile-item">
                      <summary className="flex items-center justify-between px-3.5 py-2.5 text-slate-800 hover:bg-slate-50 rounded-xl cursor-pointer list-none text-xs sm:text-sm font-semibold">
                        <div className="flex items-center gap-2.5">
                          <item.icon className="w-4 h-4 text-slate-400 group-hover/mobile-item:text-[#1E3A8A]" />
                          <span>{item.fullName || item.name}</span>
                          {item.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 leading-none">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <ChevronDown className="w-4 h-4 text-slate-400 transition-transform group-open/mobile-item:rotate-180" />
                      </summary>
                      <div className="pl-10 pr-2 pb-2 space-y-1">
                        {item.submenu.map((sub: any) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`block px-3 py-1.5 text-xs rounded-lg transition-colors ${
                              sub.isHighlight 
                                ? 'font-bold text-[#1E3A8A] bg-blue-50/70' 
                                : 'font-medium text-slate-600 hover:text-[#1E3A8A] hover:bg-slate-50'
                            }`}
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
                      className="flex items-center gap-2.5 px-3.5 py-2.5 text-slate-800 hover:bg-slate-50 rounded-xl text-xs sm:text-sm font-semibold"
                    >
                      <item.icon className="w-4 h-4 text-slate-400" />
                      <span>{item.fullName || item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* User State in Mobile Drawer */}
            <div className="pt-2 border-t border-slate-100">
              {currentUser ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-2 py-1">
                    <div className="h-9 w-9 bg-blue-100 text-[#1E3A8A] rounded-full flex items-center justify-center font-bold text-sm">
                      {userData?.fullName?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-800">{userData?.fullName || currentUser.displayName || 'User'}</p>
                      <p className="text-[10px] text-slate-400 truncate max-w-[200px]">{currentUser.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-4 py-2 text-xs font-bold border border-slate-200 rounded-xl text-slate-700 hover:bg-slate-50"
                  >
                    View Profile
                  </Link>
                  <button
                    onClick={() => {
                      import('../../config/firebase').then(module => module.auth.signOut());
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-center px-4 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    openLoginModal();
                    setIsMenuOpen(false);
                  }}
                  className="w-full px-4 py-2.5 text-xs font-bold text-[#1E3A8A] bg-blue-50/80 border border-blue-200/80 rounded-xl hover:bg-blue-100/80 transition-colors cursor-pointer"
                >
                  Sign In to Account
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
