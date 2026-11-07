import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Banknote,
  Home as HomeIcon,
  Briefcase,
  CreditCard,
  Calculator,
  Gauge,
  ArrowRight,
  ShieldCheck,
  Landmark,
  Lock,
  Award,
  ChevronDown,
  Sparkles,
  Smartphone,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
  Phone,
  Mail,
  MapPin,
  CheckCircle2
} from 'lucide-react';

interface FooterProps {
  openEligibilityModal: (loanType?: string) => void;
  openApplyModal?: (loanType?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ openEligibilityModal }) => {
  const currentYear = new Date().getFullYear();
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  // Lending Spectrum Links with Live Indicators
  const loanProducts = [
    { name: 'Personal Loan for Salaried', href: '/loans/personal/salaried', badge: '10.49%' },
    { name: 'Personal Loan for Self Employed', href: '/loans/personal/self-employed' },
    { name: 'Pre-Approved Personal Loan', href: '/loans/personal/pre-approved' },
    { name: 'Home Loan & Balance Transfer', href: '/loans/home', badge: '8.35%' },
    { name: 'Collateral-Free MSME Loan', href: '/loans/business', badge: 'MSME' },
    { name: 'Curated Credit Cards 2026', href: '/cards', badge: '0 Fee' },
    { name: 'Education Loan (India & Abroad)', href: '/loans/education' },
    { name: 'Car Loan & Refinance', href: '/loans/car' },
    { name: 'Gold Loan Interest Benchmark', href: '/resources/gold-rates' },
    { name: 'All-India Banks Directory (22+ Banks)', href: '/banks', isHighlight: true },
  ];

  // Decision & Calculator Tools
  const calculatorTools = [
    { name: 'Personal Loan EMI Calculator', href: '/calculators/loan/personal-loan-emi' },
    { name: 'Home Loan EMI Calculator', href: '/calculators/loan/home-loan-emi' },
    { name: 'Home Loan Prepayment Savings', href: '/calculators/prepayment/home-loan-prepayment' },
    { name: 'Personal Loan Eligibility Calculator', href: '/calculators/eligibility/personal-loan-eligibility' },
    { name: 'Fixed Deposit Slabs Calculator', href: '/calculators/investment/fixed-deposit' },
    { name: 'SIP Compounding Calculator', href: '/calculators/investment/sip' },
    { name: 'Verified IFSC & MICR Finder', href: '/resources/ifsc-finder' },
    { name: 'Postal Pincodes Directory', href: '/resources/pincodes' },
    { name: 'Financial Literacy & Credit Blog', href: '/blog' },
  ];

  // Legal & Compliance Links
  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Use', href: '/terms-of-use' },
    { name: 'Editorial Policy', href: '/editorial-policy' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Credit Report Terms', href: '/credit-report-terms' },
    { name: 'Intellectual Property', href: '/intellectual-policy' },
    { name: 'Investor Relations', href: '/investor-relations' },
    { name: 'Grievance Redressal', href: '/contact' },
    { name: 'Sitemap', href: '/sitemap' },
  ];

  return (
    <footer className="relative bg-[#080C16] text-slate-400 font-ibm overflow-hidden border-t border-slate-800/80">
      
      {/* Top Hairline Brand Accent Strip */}
      <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#1E3A8A] via-amber-500 to-emerald-500 opacity-90 pointer-events-none" />

      {/* =========================================================================
          TIER 1: HIGH-IMPACT PRE-FOOTER CLOSING SECTION
          "Your Financial Journey Deserves Better Choices."
         ========================================================================= */}
      <section className="relative pt-12 pb-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 overflow-hidden bg-gradient-to-b from-[#0B101D] to-[#080C16]">
        {/* Subtle Radial Ambient Lighting */}
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[680px] h-[280px] bg-[#1E3A8A]/15 blur-[100px] rounded-full pointer-events-none" />
        
        {/* Oversized Brand Typography Watermark */}
        <div 
          aria-hidden="true" 
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[60px] sm:text-[110px] lg:text-[150px] font-black tracking-tighter text-slate-800/15 select-none pointer-events-none whitespace-nowrap"
        >
          BANKSCART
        </div>

        <div className="relative max-w-[1400px] mx-auto text-center">
          {/* Micro Trust Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-blue-950/60 border border-blue-800/50 text-[#60A5FA] text-xs font-semibold mb-3.5 shadow-xs backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>The BanksCart Financial Trust Experience</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          {/* Main Editorial Headline */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto mb-2.5">
            Your Financial Journey Deserves{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
              Better Choices.
            </span>
          </h2>

          {/* Supporting Statement */}
          <p className="text-xs sm:text-sm lg:text-base text-slate-300 max-w-2xl mx-auto mb-6 font-normal leading-relaxed">
            Compare financial products, explore your options and make informed financial decisions with BanksCart.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-3.5 max-w-md mx-auto">
            <Link
              to="/loans"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group active:scale-95"
            >
              <span>Explore Financial Products</span>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </Link>

            <button
              type="button"
              onClick={() => openEligibilityModal()}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-amber-700 hover:bg-amber-800 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2 group active:scale-95 cursor-pointer"
            >
              <span>Check Loan Eligibility</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>


      {/* =========================================================================
          TIER 2: UNIFIED 4-COLUMN PRODUCT, TOOLS & APP INTELLIGENCE GRID
         ========================================================================= */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8">

          {/* -------------------------------------------------------------------
              COLUMN 1 (3 COLS): BRAND IDENTITY, PILLARS & SOCIALS
             ------------------------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-4">
            <Link to="/" className="inline-block group transition-transform active:scale-95" aria-label="BanksCart Home">
              <img
                src="/logos/bankscartlogof.jpg"
                alt="BanksCart"
                width="140"
                height="34"
                style={{ aspectRatio: "140/34" }}
                className="h-8 w-auto max-w-[140px] object-contain rounded"
              />
            </Link>

            <p className="text-xs text-slate-300 leading-relaxed">
              India’s independent multi-bank loan comparison platform. Partnered with 30+ scheduled commercial banks and RBI-regulated NBFCs for transparent, zero-margin borrowing.
            </p>

            {/* 4 Micro Trust Badges */}
            <div className="grid grid-cols-2 gap-1.5 text-[11px] text-slate-300">
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-[#0E1424] border border-slate-800/80">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span className="truncate">Zero Upfront Fees</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-[#0E1424] border border-slate-800/80">
                <Lock className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span className="truncate">256-Bit SSL</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-[#0E1424] border border-slate-800/80">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                <span className="truncate">Soft Inquiry Only</span>
              </div>
              <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-[#0E1424] border border-slate-800/80">
                <Landmark className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                <span className="truncate">RBI NBFC Partners</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-1">
              <div className="flex items-center gap-2">
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="BanksCart Facebook"
                  className="p-1.5 bg-[#0F1626] border border-slate-800 rounded-lg hover:border-blue-500 hover:text-white transition-all text-slate-400 cursor-pointer"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="BanksCart Twitter"
                  className="p-1.5 bg-[#0F1626] border border-slate-800 rounded-lg hover:border-sky-500 hover:text-white transition-all text-slate-400 cursor-pointer"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="BanksCart LinkedIn"
                  className="p-1.5 bg-[#0F1626] border border-slate-800 rounded-lg hover:border-blue-600 hover:text-white transition-all text-slate-400 cursor-pointer"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://youtube.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="BanksCart YouTube"
                  className="p-1.5 bg-[#0F1626] border border-slate-800 rounded-lg hover:border-red-600 hover:text-white transition-all text-slate-400 cursor-pointer"
                >
                  <Youtube className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="BanksCart Instagram"
                  className="p-1.5 bg-[#0F1626] border border-slate-800 rounded-lg hover:border-pink-500 hover:text-white transition-all text-slate-400 cursor-pointer"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Corporate Mini Links */}
            <div className="pt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs font-semibold text-slate-400">
              <Link to="/about-us" className="hover:text-amber-400 transition-colors">About Us</Link>
              <Link to="/careers" className="hover:text-amber-400 transition-colors">Careers</Link>
              <Link to="/contact" className="hover:text-amber-400 transition-colors">Contact Us</Link>
              <Link to="/partners" className="hover:text-amber-400 transition-colors">Partner With Us</Link>
            </div>
          </div>

          {/* -------------------------------------------------------------------
              COLUMN 2 (3 COLS): EXPLORE FINANCIAL PRODUCTS
             ------------------------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-3">
            {/* Desktop Header */}
            <div className="hidden md:flex items-center gap-1.5 pb-2 border-b border-slate-800">
              <Banknote className="w-3.5 h-3.5 text-blue-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Financial Products
              </h3>
            </div>

            {/* Mobile Accordion Header */}
            <button
              type="button"
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="md:hidden w-full flex items-center justify-between pb-2 border-b border-slate-800 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <Banknote className="w-3.5 h-3.5 text-blue-400" />
                <span>Financial Products</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileProductsOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Navigation List */}
            <ul className={`space-y-2 text-xs font-medium ${mobileProductsOpen ? 'block' : 'hidden md:block'}`}>
              {loanProducts.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`group inline-flex items-center justify-between w-full py-0.5 transition-colors relative ${
                      item.isHighlight 
                        ? 'text-amber-400 font-bold hover:text-amber-300' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span className="relative truncate pr-2">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-300" />
                    </span>
                    {item.badge && (
                      <span className="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 flex-shrink-0">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* -------------------------------------------------------------------
              COLUMN 3 (3 COLS): FINANCIAL CALCULATORS & ADVISORY
             ------------------------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-3">
            {/* Desktop Header */}
            <div className="hidden md:flex items-center gap-1.5 pb-2 border-b border-slate-800">
              <Calculator className="w-3.5 h-3.5 text-amber-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Calculators &amp; Tools
              </h3>
            </div>

            {/* Mobile Accordion Header */}
            <button
              type="button"
              onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
              className="md:hidden w-full flex items-center justify-between pb-2 border-b border-slate-800 text-left text-xs font-bold text-white uppercase tracking-wider cursor-pointer"
            >
              <div className="flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-amber-400" />
                <span>Calculators &amp; Decision Tools</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileToolsOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Navigation List */}
            <ul className={`space-y-2 text-xs font-medium ${mobileToolsOpen ? 'block' : 'hidden md:block'}`}>
              {calculatorTools.map((tool) => (
                <li key={tool.name}>
                  <Link
                    to={tool.href}
                    className="group inline-flex items-center justify-between w-full py-0.5 text-slate-400 hover:text-white transition-colors relative"
                  >
                    <span className="relative truncate pr-2">
                      {tool.name}
                      <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[1px] bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-300" />
                    </span>
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* -------------------------------------------------------------------
              COLUMN 4 (3 COLS): APP COMPANION & HELPLINE HUB
             ------------------------------------------------------------------- */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center gap-1.5 pb-2 border-b border-slate-800">
              <Smartphone className="w-3.5 h-3.5 text-blue-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Take BanksCart With You
              </h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Check loan eligibility on the go, track EMI schedules, and monitor your CIBIL bureau score with monthly refresh alerts.
            </p>

            {/* App Badges */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2">
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-2 rounded-xl bg-[#0D121F] hover:bg-[#141C30] border border-slate-800 hover:border-slate-600 transition-all group shadow-2xs active:scale-95"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play Store"
                  width="130"
                  height="36"
                  className="h-6 w-auto object-contain"
                />
              </a>

              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-2 rounded-xl bg-[#0D121F] hover:bg-[#141C30] border border-slate-800 hover:border-slate-600 transition-all group shadow-2xs active:scale-95"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                  alt="Apple App Store"
                  width="115"
                  height="36"
                  className="h-6 w-auto object-contain"
                />
              </a>
            </div>

            {/* Customer Care Helpline Card */}
            <div className="p-3 rounded-xl bg-[#0D121F] border border-slate-800 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-white font-semibold">
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Customer Care Helpline</span>
              </div>
              <p className="text-slate-300 font-mono text-[11px]">
                <a href="tel:18002008900" className="hover:text-amber-400 transition-colors">1800-200-8900</a> | <a href="tel:+911141008900" className="hover:text-amber-400 transition-colors">+91 11 4100 8900</a>
              </p>
              <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <Mail className="w-3 h-3 text-slate-500" />
                <a href="mailto:support@bankscart.com" className="hover:text-amber-400 transition-colors truncate">
                  support@bankscart.com
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* =========================================================================
          TIER 3: CONSOLIDATED TRUST, REGULATORY DISCLOSURE & LEGAL FOUNDATION
         ========================================================================= */}
      <section className="border-t border-slate-800/80 bg-[#060910] text-xs text-slate-400">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
          
          {/* Row 1: Payment Rails & Security Standards */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-5 border-b border-slate-800/60">
            {/* Payment Rails */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                Supported Rails:
              </span>
              <div className="h-6 bg-white rounded px-2 flex items-center shadow-xs">
                <svg className="h-2.5 w-auto" viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.124 1.258L12.556 15.228H8.258L4.998 3.518C4.802 2.76 4.636 2.476 4.048 2.146C3.072 1.622 1.488 1.134 0.1 0.826L0.218 0.32H7.272C8.172 0.32 8.972 0.916 9.172 1.956L10.912 11.234L15.198 0.32H19.124V1.258ZM35.918 10.364C35.938 6.42 30.404 6.204 30.444 4.444C30.464 3.908 30.984 3.336 32.124 3.184C32.684 3.11 34.244 3.05 35.938 3.834L36.618 0.69C35.698 0.354 34.518 0.04 33.018 0.04C28.998 0.04 26.158 2.18 26.138 5.24C26.118 7.508 28.158 8.768 29.718 9.532C31.318 10.316 31.858 10.816 31.858 11.516C31.838 12.592 30.558 13.064 29.378 13.084C27.318 13.104 26.118 12.532 25.178 12.096L24.478 15.356C25.478 15.816 27.278 16.216 29.138 16.236C33.398 16.236 36.178 14.136 36.198 10.876L35.918 10.364ZM46.618 15.228H50.398L47.098 0.32H43.598C42.818 0.32 42.158 0.772 41.858 1.492L35.758 15.228H39.878L40.698 12.968H45.718L46.198 15.228H46.618ZM41.838 9.848L43.918 4.148L45.118 9.848H41.838ZM25.078 0.32L21.878 15.228H18.018L21.218 0.32H25.078Z" fill="#1A1F71"/>
                </svg>
              </div>
              <div className="h-6 bg-white rounded px-2 flex items-center shadow-xs">
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-3.5 w-auto" />
              </div>
              <div className="h-6 bg-white rounded px-2 flex items-center shadow-xs">
                <img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay.svg" alt="RuPay" className="h-3 w-auto" />
              </div>
              <div className="h-6 bg-white rounded px-2 flex items-center shadow-xs">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-3 w-auto" />
              </div>
              <div className="h-6 bg-white rounded px-2 flex items-center shadow-xs">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-3 w-auto" />
              </div>
            </div>

            {/* Security Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="px-2 py-0.5 rounded bg-[#0E1528] border border-slate-800 text-[10px] font-bold text-slate-300 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5 text-emerald-400" />
                <span>256-Bit SSL</span>
              </div>
              <div className="px-2 py-0.5 rounded bg-[#0E1528] border border-slate-800 text-[10px] font-bold text-slate-300 flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-blue-400" />
                <span>ISO 27001</span>
              </div>
              <div className="px-2 py-0.5 rounded bg-[#0E1528] border border-slate-800 text-[10px] font-bold text-slate-300 flex items-center gap-1">
                <Award className="w-2.5 h-2.5 text-amber-400" />
                <span>PCI DSS</span>
              </div>
              <div className="px-2 py-0.5 rounded bg-[#0E1528] border border-slate-800 text-[10px] font-bold text-slate-300 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                <span>DPDP Act 2023</span>
              </div>
            </div>
          </div>

          {/* Row 2: Regulatory Non-Lender Notice & Corporate Footprint */}
          <div className="space-y-3">
            <div className="p-3.5 sm:p-4 bg-[#0C111E] rounded-xl border border-slate-800 space-y-1.5">
              <div className="flex items-center gap-2 text-[11px] font-bold text-slate-200 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Regulatory Disclosure &amp; Non-Lender Status</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                BanksCart is an independent digital loan and credit comparison marketplace. BanksCart is not a licensed bank, NBFC, or credit institution, and does not lend money directly. All loan approvals, interest rates, disbursal terms, and credit decisions are made exclusively at the discretion of RBI-regulated banks and NBFC partners. We do not charge borrowers upfront processing fees for loan matching.
              </p>
            </div>

            {/* Corporate Identification Strip */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 text-[11px] text-slate-400 pt-1">
              <div>
                <span className="text-slate-300 font-semibold">Legal Entity: </span>
                <span>BanksCart Financial Technologies Pvt. Ltd.</span>
              </div>
              <div>
                <span className="text-slate-300 font-semibold">CIN: </span>
                <span className="font-mono text-slate-200">U67190DL2024PTC428910</span>
              </div>
              <div>
                <span className="text-slate-300 font-semibold">Registered Office: </span>
                <span>Statesman House, Barakhamba Rd, Connaught Place, New Delhi - 110001</span>
              </div>
            </div>
          </div>

          {/* Row 3: Legal Navigation & Copyright */}
          <div className="flex flex-col xl:flex-row justify-between items-center gap-3.5 pt-4 pb-16 sm:pb-8 lg:pb-4 border-t border-slate-800/80 text-[11px]">
            <nav aria-label="Legal and Policy" className="flex flex-wrap justify-center xl:justify-start pl-0 sm:pl-52 xl:pl-52 gap-x-4 gap-y-1.5 text-slate-400 font-medium">
              {legalLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.href} 
                  className="hover:text-amber-400 transition-colors whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3 text-[10px] text-slate-500 whitespace-nowrap">
              <p>© 2014–{currentYear} BanksCart.com. All Rights Reserved.</p>
              <span>•</span>
              <div className="flex items-center gap-1.5 text-slate-400">
                <img
                  src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                  alt="India"
                  width="14"
                  height="10"
                  className="h-2 w-auto"
                />
                <span>Built with Pride in India</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </footer>
  );
};

export default Footer;
