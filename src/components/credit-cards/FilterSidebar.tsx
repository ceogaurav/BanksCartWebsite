import React, { useState } from 'react';
import { Filter, ChevronUp } from 'lucide-react';

interface FilterSidebarProps {
  availableBanks: { name: string; count: number }[];
  availableCategories: { name: string; count: number }[];
  selectedBanks: string[];
  selectedCategories: string[];
  onBankChange: (bank: string) => void;
  onCategoryChange: (category: string) => void;
  onClearAll: () => void;
}

export default function FilterSidebar({
  availableBanks,
  availableCategories,
  selectedBanks,
  selectedCategories,
  onBankChange,
  onCategoryChange,
  onClearAll
}: FilterSidebarProps) {
  const [showAllBanks, setShowAllBanks] = useState(false);

  // Specific categories seen in screenshot (Lounge, Shopping, etc)
  // Ensure the sort matches the visual priority if possible
  const priorityCategories = ['Premium', 'Rewards', 'Lounge Access', 'Shopping', 'Dining', 'Cashback', 'Online Shopping', 'Fuel', 'Lifetime Free', 'Movies'];
  
  // Sort available categories based on priority list
  const sortedCategories = [...availableCategories].sort((a, b) => {
      const idxA = priorityCategories.indexOf(a.name);
      const idxB = priorityCategories.indexOf(b.name);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
  });

  return (
    <div className="hidden lg:block w-64 flex-shrink-0">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 sticky top-24">

        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
            Filters
          </h3>
          <button onClick={onClearAll} className="text-xs font-semibold text-blue-600 hover:text-blue-700">Clear All</button>
        </div>

        {/* Categories Filter (Shown first in screenshot 2) */}
        <div className="p-5 border-b border-gray-100">
           {/* Note: Screenshot shows categories like Premium, Rewards first */}
          <div className="space-y-3">
            {sortedCategories.map((cat, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                  checked={selectedCategories.includes(cat.name)}
                  onChange={() => onCategoryChange(cat.name)}
                />
                <span className="text-sm text-gray-600 group-hover:text-blue-600">{cat.name}</span>
              </label>
            ))}
             <div className="bg-orange-50 text-orange-700 px-2 py-1 text-[10px] rounded inline-flex items-center gap-1 mt-2">
                <span>!</span> Max. 3 selections allowed
            </div>
          </div>
        </div>

        {/* Banks Filter */}
        <div className="p-5">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">provider</h4>
          <div className="space-y-3">
            {(showAllBanks ? availableBanks : availableBanks.slice(0, 5)).map((bank, i) => (
              <label key={i} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4"
                    checked={selectedBanks.includes(bank.name)}
                    onChange={() => onBankChange(bank.name)}
                  />
                  <span className="text-sm text-gray-600">{bank.name}</span>
              </label>
            ))}
            {availableBanks.length > 5 && (
               <button onClick={() => setShowAllBanks(!showAllBanks)} className="text-xs font-bold text-blue-600 mt-2 flex items-center gap-1">
                 {showAllBanks ? 'Show Less' : '+ Show More'}
               </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
