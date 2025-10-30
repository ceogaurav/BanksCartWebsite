import React, { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react'; // Using TrendingUp for CIBIL icon

interface CibilCheckButtonProps {
  openCibilModal: () => void;
}

const CibilCheckButton: React.FC<CibilCheckButtonProps> = ({ openCibilModal }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Simple animation to slide in after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // Delay before button slides in

    return () => clearTimeout(timer);
  }, []);

  return (
    // Fixed position, slightly below header, sliding from left
    <div
      className={`fixed top-[80px] left-0 z-30 transform transition-transform duration-1000 ease-out
                  ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}
      style={{ top: '80px' }} // Adjust this value if your header height changes
    >
      <button
        onClick={openCibilModal}
        className="bg-gradient-to-r from-teal-500 to-blue-600 text-white
                   px-4 py-2 rounded-r-lg shadow-lg
                   flex items-center gap-2 text-lg font-bold
                   hover:from-teal-600 hover:to-blue-700 transition-all duration-300
                   transform hover:scale-105 origin-left
                   border-l-4 border-yellow-300 animate-pulse-border"
        style={{
          // Custom styles for the pulse-border animation
          '--color-1': '#FDE047', // yellow-300
          '--color-2': '#FACC15', // yellow-400
          '--color-3': '#EAB308', // yellow-500
        } as React.CSSProperties} // Type assertion for custom CSS variables
      >
        <TrendingUp className="h-6 w-6" />
        CHECK FREE CIBIL SCORE
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
