import React from 'react';
import { Heart, Github, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-gray-600">Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span className="text-gray-600">for India</span>
          </div>
          
          <div className="flex items-center justify-center space-x-6 mb-4">
            <a
              href="https://github.com/deep5050/indian-pincodes-database"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">Database Source</span>
            </a>
            <div className="flex items-center space-x-2 text-gray-600">
              <Globe className="w-4 h-4" />
              <span className="text-sm">All India Coverage</span>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            <p className="mb-2">
              © 2025 Bankscart. Comprehensive pincode lookup service for India.
            </p>
            <p>
              Data sourced from India Post. Updated regularly for accuracy.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};