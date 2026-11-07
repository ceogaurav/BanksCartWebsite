import React, { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface CibilCheckButtonProps {
  openCibilModal?: () => void; // Optional now, as we prefer navigation
}

const CibilCheckButton: React.FC<CibilCheckButtonProps> = ({ openCibilModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { currentUser, openLoginModal } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Simple animation to slide in after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Hide sliding button on CIBIL and credit report pages where score check form is already present,
  // as well as on long-form editorial blogs to preserve reading alignment.
  const isHiddenPage =
    location.pathname.startsWith('/cibil') ||
    location.pathname.startsWith('/credit-') ||
    location.pathname.startsWith('/blog') ||
    location.pathname === '/blogs';

  if (isHiddenPage) {
    return null;
  }

  const handleClick = () => {
    if (currentUser) {
      // If logged in, go to the Credit Score tab in Profile
      navigate('/profile?tab=credit-score');
    } else {
      // If logged out, open Login Modal
      openLoginModal();
    }
  };

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 transform transition-all duration-500 ease-out ${
        isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <button
        onClick={handleClick}
        className="group flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white rounded-full shadow-2xl hover:shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-200 border border-blue-400/30 text-xs sm:text-sm font-bold tracking-wide"
      >
        <span className="p-1 rounded-full bg-emerald-400 text-slate-950 flex items-center justify-center">
          <TrendingUp className="w-3.5 h-3.5" />
        </span>
        <span>Check Free CIBIL Score</span>
        <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
          FREE
        </span>
      </button>
    </div>
  );
};

export default CibilCheckButton;
