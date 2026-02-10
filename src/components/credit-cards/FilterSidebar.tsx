import React, { useState } from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

// Define the shape of a filter option (e.g., { name: 'HDFC', count: 5 })
interface FilterOption {
  name: string;
  count: number;
}

interface FilterSidebarProps {
  // The available options to display
  availableBanks: FilterOption[];
  availableCategories: FilterOption[];

  // The currently selected items
  selectedBanks: string[];
  selectedCategories: string[];

  // Functions to update the parent state
  onBankChange: (bankName: string) => void;
  onCategoryChange: (categoryName: string) => void;
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

  // Logic to show only first 5 banks or all of them
  const displayedBanks = showAllBanks ? availableBanks : availableBanks.slice(0, 5);

  const hasActiveFilters = selectedBanks.length > 0 || selectedCategories.length > 0;

  return (
    <div className="hidden lg:block w-72 flex-shrink-0">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-24 overflow-hidden">

        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Filter className="w-4 h-4" /> Filters
          </h3>
          <button 
            onClick={onClearAll}
            disabled={!hasActiveFilters}
            className={`text-xs font-semibold ${hasActiveFilters ? 'text-blue-600 hover:text-blue-700 cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
          >
            Clear All
          </button>
        </div>

        {/* Banks Filter */}
        <div className="p-5 border-b border-gray-100">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Banks</h4>
          <div className="space-y-3">
            {displayedBanks.map((bank, i) => (
              <label key={i} className="flex items-center justify-between cursor-pointer group">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    checked={selectedBanks.includes(bank.name)}
                    onChange={() => onBankChange(bank.name)}
                  />
                  <span className={`text-sm transition-colors ${selectedBanks.includes(bank.name) ? 'text-blue-700 font-medium' : 'text-gray-700 group-hover:text-blue-600'}`}>
                    {bank.name}
                  </span>
                </div>
                <span className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded font-mono">
                  {bank.count}
                </span>
              </label>
            ))}
            
            {availableBanks.length > 5 && (
              <button 
                onClick={() => setShowAllBanks(!showAllBanks)}
                className="text-xs font-bold text-blue-600 mt-2 hover:underline flex items-center gap-1"
              >
                {showAllBanks ? (
                    <>Show Less <ChevronUp className="w-3 h-3" /></>
                ) : (
                    <>+ Show {availableBanks.length - 5} More</>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Categories Filter */}
        <div className="p-5">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Categories</h4>
          <div className="space-y-3">
            {availableCategories.map((cat, i) => (
              <label key={i} className="flex items-center justify-between gap-3 cursor-pointer group">
                <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedCategories.includes(cat.name)}
                      onChange={() => onCategoryChange(cat.name)}
                    />
                    <span className={`text-sm transition-colors ${selectedCategories.includes(cat.name) ? 'text-blue-700 font-medium' : 'text-gray-700 group-hover:text-blue-600'}`}>
                      {cat.name}
                    </span>
                </div>
                <span className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded font-mono">
                  {cat.count}
                </span>
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
