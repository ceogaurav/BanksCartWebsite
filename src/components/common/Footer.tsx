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
                src="/logos/bankscartlogof.jpg"
                alt="BanksCart"
                width="160"
                height="40"
                style={{ aspectRatio: "4/1" }}
                loading="lazy"
                className="h-10 w-auto rounded"
              />
            </Link>
            <h3 className="text-white text-sm font-bold uppercase tracking-wider">BANKS CART</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-blue-400 transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              <li><Link to="/partners" className="hover:text-blue-400 transition-colors">Partners</Link></li>
            </ul>
          </div>

          {/* Column 2: Explore */}
          <div className="space-y-6">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider">EXPLORE</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/blog" className="hover:text-blue-400 transition-colors">Blogs</Link></li>
              <li><Link to="/calculators" className="hover:text-blue-400 transition-colors">Calculators</Link></li>
              <li><Link to="/loans" className="hover:text-blue-400 transition-colors">Loans</Link></li>
              <li><Link to="/cards" className="hover:text-blue-400 transition-colors">Credit Cards</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal & Policy */}
          <div className="space-y-6">
            <h3 className="text-white text-sm font-bold uppercase tracking-wider">LEGAL & POLICY</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use" className="hover:text-blue-400 transition-colors">Terms of Use</Link></li>
              <li><Link to="/editorial-policy" className="hover:text-blue-400 transition-colors">Editorial & Fact-Check Policy</Link></li>
              <li><Link to="/disclaimer" className="hover:text-blue-400 transition-colors">Disclaimer</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Grievance Redressal</Link></li>
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


      {/* High-Value Commercial & Specialized Services Link Cluster */}
      <div className="bg-[#0e1320] border-t border-slate-800/80 py-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-6">
            Popular Commercial Services & Specialised Solutions
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div>
              <h5 className="font-semibold text-white mb-2.5">Credit & Bureau Solutions</h5>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link to="/credit-score/credit-rectification-service" className="hover:text-blue-400 transition-colors">
                    Credit Rectification Service
                  </Link>
                </li>
                <li>
                  <Link to="/credit-health-report-services" className="hover:text-blue-400 transition-colors">
                    Credit Health Report Services
                  </Link>
                </li>
                <li>
                  <Link to="/credit-score" className="hover:text-blue-400 transition-colors">
                    Free CIBIL Score & Analysis
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white mb-2.5">Corporate & Incorporation</h5>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link to="/business-loan/company-registration-in-delhi" className="hover:text-blue-400 transition-colors">
                    Company Registration in Delhi
                  </Link>
                </li>
                <li>
                  <Link to="/business-loan/company-registration-in-chennai" className="hover:text-blue-400 transition-colors">
                    Company Registration in Chennai
                  </Link>
                </li>
                <li>
                  <Link to="/company-registration/copyright-registration" className="hover:text-blue-400 transition-colors">
                    Copyright Registration Online
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white mb-2.5">Specialized & Student Lending</h5>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link to="/credila-financial-services" className="hover:text-blue-400 transition-colors">
                    Credila Financial Services
                  </Link>
                </li>
                <li>
                  <Link to="/loans/education" className="hover:text-blue-400 transition-colors">
                    Education Loans in India & Abroad
                  </Link>
                </li>
                <li>
                  <Link to="/loans/business" className="hover:text-blue-400 transition-colors">
                    Collateral-Free Business Loans
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white mb-2.5">Government & Citizen Portals</h5>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <Link to="/aadhar-card/aadhaar-card-services" className="hover:text-blue-400 transition-colors">
                    Aadhaar card update and verification services
                  </Link>
                </li>
                <li>
                  <Link to="/blog/Sukanya-Samriddhi-Yojana-Guide" className="hover:text-blue-400 transition-colors">
                    Sukanya Samriddhi Yojana (SSY) Guide
                  </Link>
                </li>
                <li>
                  <Link to="/pan-card" className="hover:text-blue-400 transition-colors">
                    PAN Card Verification & Linking
                  </Link>
                </li>
              </ul>
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

      {/* Corporate Footprint & Standardized Regulatory Non-Lender Disclosure */}
      <div className="bg-[#080C16] border-t border-slate-800/80 py-8 text-xs text-slate-400 leading-relaxed font-sans">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="p-4 bg-[#101524] rounded-xl border border-slate-800 space-y-2">
            <h4 className="text-[11px] font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <span>Regulatory Disclosure & Non-Lender Status</span>
            </h4>
            <p className="text-slate-400">
              BanksCart is an independent digital loan and credit comparison marketplace. BanksCart is not a licensed bank, NBFC, or credit institution, and does not lend money directly. All loan approvals, interest rates, disbursal terms, and credit decisions are made exclusively at the discretion of RBI-regulated banks and NBFC partners. We do not charge borrowers upfront processing fees for loan matching.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 text-[11px] text-slate-400 border-t border-slate-800/60">
            <div>
              <span className="text-slate-200 font-semibold block">Registered Legal Entity:</span>
              <span>BanksCart Financial Technologies Pvt. Ltd.</span>
            </div>
            <div>
              <span className="text-slate-200 font-semibold block">Corporate Identity (CIN):</span>
              <span className="font-mono">U67190DL2024PTC428910</span>
            </div>
            <div>
              <span className="text-slate-200 font-semibold block">Registered Office:</span>
              <span>Statesman House, Barakhamba Rd, Connaught Place, New Delhi - 110001</span>
            </div>
            <div>
              <span className="text-slate-200 font-semibold block">Customer Care Helpline:</span>
              <span>1800-200-8900 | +91 11 4100 8900 | support@bankscart.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-[#05080F] py-4 border-t border-slate-900">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500">
          <p> © Copyright 2014-{currentYear} BanksCart.com. All Rights Reserved.</p>
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
