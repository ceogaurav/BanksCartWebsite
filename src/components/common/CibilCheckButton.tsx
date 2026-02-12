import React, { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface CibilCheckButtonProps {
  openCibilModal?: () => void; // Optional now, as we prefer navigation
}

const CibilCheckButton: React.FC<CibilCheckButtonProps> = ({ openCibilModal }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { currentUser, openLoginModal } = useAuth();
  const navigate = useNavigate();

  // Simple animation to slide in after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
    // Fixed position, slightly below header, sliding from left
    <div
      className={`hidden md:block fixed top-[80px] left-0 z-30 transform transition-transform duration-1000 ease-out
                  ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}
      style={{ top: '80px' }}
    >
      <button
        onClick={handleClick}
        className="bg-gradient-to-r from-teal-500 to-blue-600 text-white
                   px-4 py-2 rounded-r-lg shadow-lg
                   flex items-center gap-2 text-lg font-bold
                   hover:from-teal-600 hover:to-blue-700 transition-all duration-300
                   transform hover:scale-105 origin-left
                   border-l-4 border-yellow-300 animate-pulse-border"
        style={{
          '--color-1': '#FDE047',
          '--color-2': '#FACC15',
          '--color-3': '#EAB308',
        } as React.CSSProperties}
      >
        <TrendingUp className="h-6 w-6" />
        Bankscart by Venkateswarlu Veguru
      </button>

      {/* Custom CSS for animation */}
      <style>{`
        @keyframes pulse-border {
          0% { border-color: var(--color-1); }
          50% { border-color: var(--color-3); }
          100% { border-color: var(--color-1); }
        }
        .animate-pulse-border {
          animation: pulse-border 2s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default CibilCheckButton;
