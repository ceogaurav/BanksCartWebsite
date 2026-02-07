import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow mb-6">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-blue-700">Calculator Suite</div>
        <div className="space-x-6">
          <Link className="text-gray-700 hover:text-blue-600" to="/calculators">All Calculators</Link>
          <Link className="text-gray-700 hover:text-blue-600" to="/mortgage-calculator">Mortgage</Link>
          <Link className="text-gray-700 hover:text-blue-600" to="/loan-calculator">Loan</Link>
          <Link className="text-gray-700 hover:text-blue-600" to="/emi-calculator">EMI</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
