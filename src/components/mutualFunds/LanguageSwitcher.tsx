import React from 'react';

const LanguageSwitcher: React.FC = () => (
  <div className="fixed bottom-6 left-6 z-50 bg-white/80 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-full p-3 shadow-lg flex gap-2 items-center">
    {/* TODO: Add language switch logic */}
    <button className="font-bold text-blue-700 dark:text-white">EN</button>
    <span className="text-gray-400">|</span>
    <button className="font-bold text-blue-700 dark:text-white">HI</button>
  </div>
);

export default LanguageSwitcher;
