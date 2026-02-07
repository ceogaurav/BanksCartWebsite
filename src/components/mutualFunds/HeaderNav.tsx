import React, { useEffect, useRef, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { gsap } from 'gsap';



const HeaderNav: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const dropdownRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const skipLinkRef = useRef<HTMLAnchorElement>(null);
  const [liveMsg, setLiveMsg] = useState('');

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    AOS.init({ once: true, duration: prefersReducedMotion ? 0 : 800, disable: prefersReducedMotion });
    if (headerRef.current && !prefersReducedMotion) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, []);

  // Keyboard navigation for dropdowns
  const handleDropdownKey = (e: React.KeyboardEvent, name: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setDropdownOpen(dropdownOpen === name ? null : name);
      setLiveMsg(dropdownOpen === name ? `${name === 'mutual' ? 'Mutual Funds' : 'Tools & Calculators'} menu closed` : `${name === 'mutual' ? 'Mutual Funds' : 'Tools & Calculators'} menu opened`);
    } else if (e.key === 'Escape') {
      setDropdownOpen(null);
      setLiveMsg(`${name === 'mutual' ? 'Mutual Funds' : 'Tools & Calculators'} menu closed`);
      // Move focus back to button
      const idx = name === 'mutual' ? 0 : 1;
      dropdownRefs.current[idx]?.focus();
    }
  };

  // Trap focus in mobile menu when open
  useEffect(() => {
    if (!mobileOpen || !mobileMenuRef.current) return;
    const menu = mobileMenuRef.current;
    const focusable = menu.querySelectorAll<HTMLElement>('a, button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (!focusable || focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      } else if (e.key === 'Escape') {
        setMobileOpen(false);
        setLiveMsg('Mobile menu closed');
      }
    };
    menu.addEventListener('keydown', handleKey);
    setTimeout(() => first.focus(), 0);
    return () => menu.removeEventListener('keydown', handleKey);
  }, [mobileOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    const close = (e: MouseEvent) => setDropdownOpen(null);
    if (dropdownOpen) document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [dropdownOpen]);

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        ref={skipLinkRef}
        className="sr-only focus:not-sr-only absolute top-2 left-2 z-[100] bg-blue-800 text-white px-4 py-2 rounded shadow-lg"
        tabIndex={0}
      >
        Skip to main content
      </a>
      {/* Live region for screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">{liveMsg}</div>
      <header
        ref={headerRef}
        className="sticky top-0 z-50 bg-white/70 backdrop-blur-md shadow-md transition-all duration-300"
        data-aos="fade-down"
        role="banner"
        aria-label="Main site header"
      >
        {/* Logo, Navigation, Login/Register, Search, Hamburger for mobile */}
        <nav
          className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3"
          role="navigation"
          aria-label="Main navigation"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-blue-800 tracking-tight">BanksCart</span>
          </div>
          {/* ...Navigation menu, dropdowns, buttons, hamburger... */}
          <div className="hidden md:flex gap-6 items-center">
            <a href="#" className="hover:text-blue-600 font-semibold transition focus:outline-blue-700">Home</a>
            <div className="relative group">
              <button
                ref={el => (dropdownRefs.current[0] = el)}
                className="hover:text-blue-600 font-semibold transition flex items-center gap-1 focus:outline-blue-700"
                aria-haspopup="menu"
                aria-expanded={dropdownOpen === 'mutual' ? 'true' : 'false'}
                aria-controls="mutual-dropdown"
                onClick={() => setDropdownOpen(dropdownOpen === 'mutual' ? null : 'mutual')}
                onKeyDown={e => handleDropdownKey(e, 'mutual')}
                tabIndex={0}
              >
                Mutual Funds <span aria-hidden="true">▼</span>
              </button>
              <div
                id="mutual-dropdown"
                className={`absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg transition-all duration-200 ${dropdownOpen === 'mutual' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                role="menu"
                aria-label="Mutual Funds submenu"
              >
                <a href="#" className="block px-4 py-2 hover:bg-blue-50" tabIndex={dropdownOpen === 'mutual' ? 0 : -1} role="menuitem">Equity Funds</a>
                <a href="#" className="block px-4 py-2 hover:bg-blue-50" tabIndex={dropdownOpen === 'mutual' ? 0 : -1} role="menuitem">Debt Funds</a>
                <a href="#" className="block px-4 py-2 hover:bg-blue-50" tabIndex={dropdownOpen === 'mutual' ? 0 : -1} role="menuitem">Hybrid Funds</a>
                <a href="#" className="block px-4 py-2 hover:bg-blue-50" tabIndex={dropdownOpen === 'mutual' ? 0 : -1} role="menuitem">Tax Saving Funds</a>
              </div>
            </div>
            <div className="relative group">
              <button
                ref={el => (dropdownRefs.current[1] = el)}
                className="hover:text-blue-600 font-semibold transition flex items-center gap-1 focus:outline-blue-700"
                aria-haspopup="menu"
                aria-expanded={dropdownOpen === 'tools' ? 'true' : 'false'}
                aria-controls="tools-dropdown"
                onClick={() => setDropdownOpen(dropdownOpen === 'tools' ? null : 'tools')}
                onKeyDown={e => handleDropdownKey(e, 'tools')}
                tabIndex={0}
              >
                Tools & Calculators <span aria-hidden="true">▼</span>
              </button>
              <div
                id="tools-dropdown"
                className={`absolute left-0 mt-2 w-56 bg-white rounded-lg shadow-lg transition-all duration-200 ${dropdownOpen === 'tools' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                role="menu"
                aria-label="Tools & Calculators submenu"
              >
                <a href="#" className="block px-4 py-2 hover:bg-blue-50" tabIndex={dropdownOpen === 'tools' ? 0 : -1} role="menuitem">SIP Calculator</a>
                <a href="#" className="block px-4 py-2 hover:bg-blue-50" tabIndex={dropdownOpen === 'tools' ? 0 : -1} role="menuitem">Lumpsum Calculator</a>
                <a href="#" className="block px-4 py-2 hover:bg-blue-50" tabIndex={dropdownOpen === 'tools' ? 0 : -1} role="menuitem">Goal Calculator</a>
                <a href="#" className="block px-4 py-2 hover:bg-blue-50" tabIndex={dropdownOpen === 'tools' ? 0 : -1} role="menuitem">Tax Calculator</a>
              </div>
            </div>
            <a href="#" className="hover:text-blue-600 font-semibold transition focus:outline-blue-700">Research & Analysis</a>
            <a href="#" className="hover:text-blue-600 font-semibold transition focus:outline-blue-700">Portfolio Tracker</a>
            <a href="#" className="hover:text-blue-600 font-semibold transition focus:outline-blue-700">Education Center</a>
            <a href="#" className="hover:text-blue-600 font-semibold transition focus:outline-blue-700">About Us</a>
            <a href="#" className="hover:text-blue-600 font-semibold transition focus:outline-blue-700">Contact</a>
          </div>
          <div className="flex gap-2 items-center">
            <button className="px-4 py-1 rounded-lg bg-blue-700 text-white font-bold hover:bg-blue-800 transition focus:outline-blue-700">Login</button>
            <button className="px-4 py-1 rounded-lg border border-blue-700 text-blue-700 font-bold hover:bg-blue-50 transition focus:outline-blue-700">Register</button>
            <button className="ml-2 p-2 rounded-full hover:bg-blue-100 transition focus:outline-blue-700" aria-label="Search">
              <span role="img" aria-label="search">🔍</span>
            </button>
            {/* Hamburger for mobile */}
            <button
              className="md:hidden ml-2 p-2 rounded-full hover:bg-blue-100 transition focus:outline-blue-700"
              onClick={() => {
                setMobileOpen((v) => !v);
                setLiveMsg(!mobileOpen ? 'Mobile menu opened' : 'Mobile menu closed');
              }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-controls="mobile-menu"
              aria-expanded={mobileOpen ? 'true' : 'false'}
            >
              <span role="img" aria-label="menu">☰</span>
            </button>
          </div>
        </nav>
        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden fixed inset-0 bg-black/40 z-50"
            onClick={() => {
              setMobileOpen(false);
              setLiveMsg('Mobile menu closed');
            }}
            aria-modal="true"
            role="dialog"
            tabIndex={-1}
            aria-label="Mobile menu overlay"
          >
            <div
              ref={mobileMenuRef}
              id="mobile-menu"
              className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-6 animate-slide-in flex flex-col gap-4"
              onClick={e => e.stopPropagation()}
              role="menu"
              aria-label="Mobile navigation menu"
            >
              <button className="self-end mb-4 text-2xl" onClick={() => { setMobileOpen(false); setLiveMsg('Mobile menu closed'); }} aria-label="Close menu">×</button>
              <a href="#" className="font-semibold text-blue-800 hover:text-blue-600 focus:outline-blue-700" role="menuitem">Home</a>
              <div>
                <span className="block font-semibold text-blue-800 mb-1">Mutual Funds</span>
                <a href="#" className="block px-2 py-1 hover:bg-blue-50 rounded focus:outline-blue-700" role="menuitem">Equity Funds</a>
                <a href="#" className="block px-2 py-1 hover:bg-blue-50 rounded focus:outline-blue-700" role="menuitem">Debt Funds</a>
                <a href="#" className="block px-2 py-1 hover:bg-blue-50 rounded focus:outline-blue-700" role="menuitem">Hybrid Funds</a>
                <a href="#" className="block px-2 py-1 hover:bg-blue-50 rounded focus:outline-blue-700" role="menuitem">Tax Saving Funds</a>
              </div>
              <div>
                <span className="block font-semibold text-blue-800 mb-1">Tools & Calculators</span>
                <a href="#" className="block px-2 py-1 hover:bg-blue-50 rounded focus:outline-blue-700" role="menuitem">SIP Calculator</a>
                <a href="#" className="block px-2 py-1 hover:bg-blue-50 rounded focus:outline-blue-700" role="menuitem">Lumpsum Calculator</a>
                <a href="#" className="block px-2 py-1 hover:bg-blue-50 rounded focus:outline-blue-700" role="menuitem">Goal Calculator</a>
                <a href="#" className="block px-2 py-1 hover:bg-blue-50 rounded focus:outline-blue-700" role="menuitem">Tax Calculator</a>
              </div>
              <a href="#" className="font-semibold text-blue-800 hover:text-blue-600 focus:outline-blue-700" role="menuitem">Research & Analysis</a>
              <a href="#" className="font-semibold text-blue-800 hover:text-blue-600 focus:outline-blue-700" role="menuitem">Portfolio Tracker</a>
              <a href="#" className="font-semibold text-blue-800 hover:text-blue-600 focus:outline-blue-700" role="menuitem">Education Center</a>
              <a href="#" className="font-semibold text-blue-800 hover:text-blue-600 focus:outline-blue-700" role="menuitem">About Us</a>
              <a href="#" className="font-semibold text-blue-800 hover:text-blue-600 focus:outline-blue-700" role="menuitem">Contact</a>
              <div className="flex gap-2 mt-4">
                <button className="px-4 py-1 rounded-lg bg-blue-700 text-white font-bold hover:bg-blue-800 transition focus:outline-blue-700">Login</button>
                <button className="px-4 py-1 rounded-lg border border-blue-700 text-blue-700 font-bold hover:bg-blue-50 transition focus:outline-blue-700">Register</button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default HeaderNav;
