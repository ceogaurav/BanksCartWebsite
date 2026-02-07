import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Smartphone } from 'lucide-react';

interface FooterProps {
  openEligibilityModal: (loanType?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ openEligibilityModal }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0F19] text-slate-400 font-sans border-t border-slate-800">
      {/* Top Section: Main Navigation */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Column 1: Logo & About */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/logos/bankscartlogof.jpg" // Ensure this logo looks good on dark bg, or use a white version
                alt="BanksCart"
                className="h-10 w-auto rounded"
              />
            </Link>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider">BANKS CART</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
              <li><Link to="/careers" className="hover:text-blue-400 transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/partners" className="hover:text-blue-400 transition-colors">Partners</Link></li>
            </ul>
          </div>

          {/* Column 2: Group Brands */}
          <div className="space-y-6">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider">GROUP BRANDS</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">PolicyBazaar.com</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">PaisaBazaar.com</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">DocPrime.com</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">QuickFixCars.com</a></li>
            </ul>
          </div>

          {/* Column 3: Legal & Policy */}
          <div className="space-y-6">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider">LEGAL & POLICY</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use" className="hover:text-blue-400 transition-colors">Terms of Use</Link></li>
              <li><Link to="/disclaimer" className="hover:text-blue-400 transition-colors">Disclaimer</Link></li>
              <li><Link to="/grievance" className="hover:text-blue-400 transition-colors">Grievance Redressal</Link></li>
            </ul>
          </div>


          {/* Column 4: Download App */}
          <div className="space-y-6">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider">DOWNLOAD APP</h3>
            <div className="flex flex-col space-y-3">
              <button className="flex items-center gap-3 bg-[#1A1F2E] hover:bg-[#252b40] border border-slate-700 rounded-lg p-3 transition-colors group text-left w-fit min-w-[160px]">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-8 w-auto" />
              </button>
              <button className="flex items-center gap-3 bg-[#1A1F2E] hover:bg-[#252b40] border border-slate-700 rounded-lg p-3 transition-colors group text-left w-fit min-w-[160px]">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-8 w-auto" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Middle Bar: Quick Links & Social */}
      <div className="bg-[#111521] border-t border-slate-800 border-b">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center gap-6 text-xs font-medium">
              <Link to="/investor-relations" className="hover:text-white transition-colors">Investor Relations</Link>
              <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link>
              <Link to="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
              <Link to="/intellectual-policy" className="hover:text-white transition-colors">Intellectual Policy</Link>
              <Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-[#1A1F2E] rounded-full hover:bg-blue-600 hover:text-white transition-all"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-[#1A1F2E] rounded-full hover:bg-blue-400 hover:text-white transition-all"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-[#1A1F2E] rounded-full hover:bg-blue-700 hover:text-white transition-all"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-[#1A1F2E] rounded-full hover:bg-red-600 hover:text-white transition-all"><Youtube className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-[#1A1F2E] rounded-full hover:bg-pink-600 hover:text-white transition-all"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Payment & Security */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* Payment Methods */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-500 uppercase">Supported Payment Methods</h4>
            <div className="flex flex-wrap gap-2">
              <div className="h-8 bg-white rounded px-2 flex items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 w-auto" /></div>
              <div className="h-8 bg-white rounded px-2 flex items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg" alt="Amex" className="h-4 w-auto" /></div>
              <div className="h-8 bg-white rounded px-2 flex items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 w-auto" /></div>
              <div className="h-8 bg-white rounded px-2 flex items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4 w-auto" /></div>
              <div className="h-8 bg-white rounded px-2 flex items-center"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d1/RuPay.svg" alt="Rupay" className="h-4 w-auto" /></div>
            </div>
          </div>

          {/* Security Badges */}
          <div className="space-y-2 lg:text-right">
            <h4 className="text-xs font-semibold text-slate-500 uppercase">Secured By & Certified By</h4>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <div className="bg-white p-1 rounded h-8 flex items-center"><span className="text-xs font-bold text-black px-1">PCI DSS</span></div>
              <div className="bg-white p-1 rounded h-8 flex items-center"><span className="text-xs font-bold text-black px-1">256-BIT SSL</span></div>
              <div className="bg-white p-1 rounded h-8 flex items-center"><span className="text-xs font-bold text-black px-1">ISO 27001</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#05080F] py-4 border-t border-slate-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500">
          <p>CIN No. U74900HR2011PTC044581 © Copyright 2014-{currentYear} BanksCart.com. All Rights Reserved.</p>
          <div className="flex items-center gap-2">
            <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="India" className="h-3 w-auto" />
            <span>Built with Love, Made in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
