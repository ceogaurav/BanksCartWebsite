import React from 'react';

const DarkModeToggle: React.FC = () => (
  <button
    className="fixed bottom-6 right-6 z-50 bg-white/80 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full p-3 shadow-lg hover:scale-110 transition"
    aria-label="Toggle dark mode"
    // TODO: Add dark mode toggle logic
  >
    <span role="img" aria-label="dark mode">🌓</span>
  </button>
);

export default DarkModeToggle;
