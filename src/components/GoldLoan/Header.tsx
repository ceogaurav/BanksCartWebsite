import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">BC</span>
            </div>
            <span className="text-xl font-bold text-gray-800">BanksCart</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#loans" className="text-gray-600 hover:text-orange-500 transition-colors">Loans</a>
            <a href="#compare" className="text-gray-600 hover:text-orange-500 transition-colors">Compare</a>
            <a href="#calculator" className="text-gray-600 hover:text-orange-500 transition-colors">Calculator</a>
            <a href="#faq" className="text-gray-600 hover:text-orange-500 transition-colors">FAQ</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Phone className="w-4 h-4" />
              <span>1800-123-456</span>
            </div>
            <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105">
              Apply Now
            </button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#loans" className="block px-3 py-2 text-gray-600 hover:text-orange-500">Loans</a>
              <a href="#compare" className="block px-3 py-2 text-gray-600 hover:text-orange-500">Compare</a>
              <a href="#calculator" className="block px-3 py-2 text-gray-600 hover:text-orange-500">Calculator</a>
              <a href="#faq" className="block px-3 py-2 text-gray-600 hover:text-orange-500">FAQ</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;