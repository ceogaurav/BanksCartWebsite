import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  openEligibilityModal: (loanType?: string) => void;
}

const Footer: React.FC<FooterProps> = ({ openEligibilityModal }) => {
  const quickLinks = [
    { name: 'Personal Loan', href: '/loans/personal' },
    { name: 'Home Loan', href: '/loans/home' },
    { name: 'Credit Cards', href: '/cards/credit' },
    { name: 'Fixed Deposit', href: '/investment/fixed-deposit' },
    { name: 'Mutual Funds', href: '/investment/mutual-funds' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Disclaimer', href: '/disclaimer' },
    { name: 'Grievance Redressal', href: '/grievance' },
  ];

  const resources = [
    { name: 'Calculators', href: '/calculators' },
    { name: 'IFSC Finder', href: '/resources/ifsc-finder' },
    { name: 'Income Tax', href: '/resources/income-tax' },
    { name: 'PPF', href: '/resources/ppf' },
    { name: 'Gold Rates', href: '/resources/gold-rates' },
    { name: 'Check Eligibility', action: () => openEligibilityModal() },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              {/* Updated Logo: Using the provided path from the public folder */}
              <img
                src="/logos/bankscartlogof.jpg" // Relative path for public assets
                alt="BanksCart Logo"
                className="h-10 w-auto rounded-lg" // Adjust height/width as needed for your logo
              />
              {/* Removed the Building2 icon and text 'BanksCart' as they are replaced by the image logo */}
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              India's leading loan comparison platform. Compare interest rates from top banks and
              apply for loans with instant eligibility check and quick approval.
            </p>
            <div className="flex space-x-4">
              {/* Updated Social Media URLs */}
              <a href="https://www.facebook.com/profile.php?id=61577799593188" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="https://x.com/BANKSCART124005" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/bankscart/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.threads.com/@bankscart" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700 transition-colors">
                <Linkedin className="h-5 w-5" /> {/* Using Linkedin icon for Threads link as requested, assuming visual preference */}
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Popular Products</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Tools & Resources</h3>
            <ul className="space-y-3">
              {resources.map((link) => (
                link.href ? (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ) : (
                  <li key={link.name}>
                    <button onClick={link.action} className="text-gray-300 hover:text-blue-400 transition-colors text-sm text-left w-full">
                      {link.name}
                    </button>
                  </li>
                )
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact & Legal</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" /> {/* Changed to a specific blue shade for consistency */}
                <a href="tel:+919686859296" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">+91 968 685 9296</a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" /> {/* Changed to a specific blue shade for consistency */}
                <a href="mailto:support@bankscart.com" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">support@bankscart.com</a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5" /> {/* Changed to a specific blue shade for consistency */}
                <address className="text-gray-300 text-sm not-italic">
                  Raj Arcade Gb. Palya<br />
                  Bengaluru, Karnataka 560068<br />
                  India
                </address>
              </div>
            </div>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors text-xs"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2017 - {new Date().getFullYear()} BanksCart. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm">
              Licensed financial services comparison platform
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
