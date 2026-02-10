import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

interface FilterOption {
  name: string;
  count: number;
}

interface FilterSidebarProps {
  availableBanks: FilterOption[];
  availableCategories: FilterOption[];
  selectedBanks: string[];
  selectedCategories: string[];
  onBankChange: (bank: string) => void;
  onCategoryChange: (category: string) => void;
  onClearAll: () => void;
}

export default function FilterSidebar({
  availableBanks = [],
  availableCategories = [],
  selectedBanks,
  selectedCategories,
  onBankChange,
  onCategoryChange,
  onClearAll
}: FilterSidebarProps) {
  const [showAllBanks, setShowAllBanks] = useState(false);

  // Define priority order for categories to match design
  const categoryOrder = ['Premium', 'Rewards', 'Lounge Access', 'Shopping', 'Dining', 'Cashback', 'Online Shopping', 'Fuel', 'Lifetime Free', 'Travel', 'Movies'];

  // Sort available categories based on defined order
  const sortedCategories = [...availableCategories].sort((a, b) => {
      const idxA = categoryOrder.indexOf(a.name);
      const idxB = categoryOrder.indexOf(b.name);
      // If not found in priority list, push to bottom
      return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
  });

  return (
    <div className="hidden lg:block w-64 flex-shrink-0">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-24">

        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 rounded-t-xl">
          <h3 className="font-bold text-gray-900 flex items-center gap-2 text-base">
            <Filter className="w-4 h-4" /> Filters
          </h3>
          {(selectedBanks.length > 0 || selectedCategories.length > 0) && (
             <button onClick={onClearAll} className="text-xs font-bold text-blue-600 hover:text-blue-700">
                Clear All
             </button>
          )}
        </div>

        {/* Categories Filter */}
        <div className="p-5 border-b border-gray-100">
           <div className="flex justify-between items-center mb-3">
             <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Categories</h4>
           </div>
          
           <div className="space-y-2.5">
            {sortedCategories.map((cat, i) => (
              <label key={i} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                      checked={selectedCategories.includes(cat.name)}
                      onChange={() => onCategoryChange(cat.name)}
                    />
                    <span className={`text-sm transition-colors ${selectedCategories.includes(cat.name) ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-blue-600'}`}>
                        {cat.name}
                    </span>
                </div>
                <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-full">
                    {cat.count}
                </span>
              </label>
            ))}
          </div>
           {/* Warning Note */}
           <div className="bg-orange-50 border border-orange-100 text-orange-700 px-3 py-2 text-[10px] rounded-lg inline-flex items-center gap-1.5 mt-4 w-full">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0"></div>
                Max. 3 selections allowed
            </div>
        </div>

        {/* Banks Filter */}
        <div className="p-5">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Provider</h4>
          <div className="space-y-2.5">
            {(showAllBanks ? availableBanks : availableBanks.slice(0, 5)).map((bank, i) => (
              <label key={i} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <input 
                        type="checkbox" 
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                        checked={selectedBanks.includes(bank.name)}
                        onChange={() => onBankChange(bank.name)}
                    />
                    <span className={`text-sm transition-colors ${selectedBanks.includes(bank.name) ? 'text-gray-900 font-medium' : 'text-gray-600 group-hover:text-blue-600'}`}>
                        {bank.name}
                    </span>
                  </div>
                  <span className="text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-full">
                    {bank.count}
                  </span>
              </label>
            ))}
            
            {availableBanks.length > 5 && (
               <button onClick={() => setShowAllBanks(!showAllBanks)} className="text-xs font-bold text-blue-600 mt-2 flex items-center gap-1 hover:underline">
                 {showAllBanks ? 'Show Less' : `+ Show ${availableBanks.length - 5} More`}
               </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
