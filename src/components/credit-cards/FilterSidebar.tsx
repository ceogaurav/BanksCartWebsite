import React, { useState, useMemo } from 'react';
import { Filter, Check, ChevronDown, ChevronUp } from 'lucide-react';

// --- Types ---
// Adjust these to match your actual Card data structure
interface CardData {
    id: string | number;
    bankName?: string; 
    bank?: string; // specific handling if your data uses 'bank' or 'bankName'
    category?: string;
    categories?: string[]; // Handle cases where a card fits multiple categories
    tags?: string[];
}

interface FilterSidebarProps {
    allCards: CardData[];
    selectedBanks: string[];
    selectedCategories: string[];
    onToggleBank: (bankName: string) => void;
    onToggleCategory: (categoryName: string) => void;
    onClearAll: () => void;
}

export default function FilterSidebar({ 
    allCards = [], 
    selectedBanks, 
    selectedCategories, 
    onToggleBank, 
    onToggleCategory,
    onClearAll 
}: FilterSidebarProps) {
    
    const [showAllBanks, setShowAllBanks] = useState(false);

    // --- Dynamic Data Calculation ---
    // We use useMemo to avoid recalculating this on every render
    const { uniqueBanks, uniqueCategories } = useMemo(() => {
        const bankMap = new Map<string, number>();
        const catMap = new Map<string, number>();

        allCards.forEach(card => {
            // 1. Process Bank Names
            const bankName = card.bankName || card.bank || 'Other';
            bankMap.set(bankName, (bankMap.get(bankName) || 0) + 1);

            // 2. Process Categories (Handles both single string or array of strings)
            const cats = card.categories || (card.category ? [card.category] : []) || (card.tags || []);
            cats.forEach(c => {
                catMap.set(c, (catMap.get(c) || 0) + 1);
            });
        });

        // Convert Maps to sorted arrays
        const sortedBanks = Array.from(bankMap.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count); // Sort by count descending

        const sortedCategories = Array.from(catMap.entries())
            .map(([name, count]) => ({ name, count }))
            .sort((a, b) => b.count - a.count);

        return { uniqueBanks: sortedBanks, uniqueCategories: sortedCategories };
    }, [allCards]);

    // Limit banks shown if not expanded
    const displayedBanks = showAllBanks ? uniqueBanks : uniqueBanks.slice(0, 5);

    const hasActiveFilters = selectedBanks.length > 0 || selectedCategories.length > 0;

    return (
        <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-24 overflow-hidden">

                {/* Header */}
                <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <Filter className="w-4 h-4 text-blue-600" /> Filters
                    </h3>
                    {hasActiveFilters && (
                        <button 
                            onClick={onClearAll}
                            className="text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {/* Banks Filter */}
                <div className="p-5 border-b border-gray-100">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Banks</h4>
                    <div className="space-y-3">
                        {displayedBanks.map((bank) => {
                            const isSelected = selectedBanks.includes(bank.name);
                            return (
                                <label key={bank.name} className="flex items-center justify-between cursor-pointer group select-none">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white group-hover:border-blue-400'}`}>
                                            {isSelected && <Check className="w-3 h-3 text-white" />}
                                            <input 
                                                type="checkbox" 
                                                className="hidden"
                                                checked={isSelected}
                                                onChange={() => onToggleBank(bank.name)} 
                                            />
                                        </div>
                                        <span className={`text-sm transition-colors ${isSelected ? 'text-blue-700 font-medium' : 'text-gray-700 group-hover:text-blue-600'}`}>
                                            {bank.name}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded font-medium">
                                        {bank.count}
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                    
                    {uniqueBanks.length > 5 && (
                        <button 
                            onClick={() => setShowAllBanks(!showAllBanks)}
                            className="flex items-center gap-1 text-xs font-bold text-blue-600 mt-4 hover:underline"
                        >
                            {showAllBanks ? (
                                <>Show Less <ChevronUp className="w-3 h-3" /></>
                            ) : (
                                <>+ Show {uniqueBanks.length - 5} More <ChevronDown className="w-3 h-3" /></>
                            )}
                        </button>
                    )}
                </div>

                {/* Categories Filter */}
                <div className="p-5">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Categories</h4>
                    <div className="space-y-3">
                        {uniqueCategories.map((cat) => {
                             const isSelected = selectedCategories.includes(cat.name);
                             return (
                                <label key={cat.name} className="flex items-center justify-between cursor-pointer group select-none">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white group-hover:border-blue-400'}`}>
                                            {isSelected && <Check className="w-3 h-3 text-white" />}
                                            <input 
                                                type="checkbox" 
                                                className="hidden"
                                                checked={isSelected}
                                                onChange={() => onToggleCategory(cat.name)} 
                                            />
                                        </div>
                                        <span className={`text-sm transition-colors ${isSelected ? 'text-blue-700 font-medium' : 'text-gray-700 group-hover:text-blue-600'}`}>
                                            {cat.name}
                                        </span>
                                    </div>
                                    <span className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded font-medium">
                                        {cat.count}
                                    </span>
                                </label>
                             );
                        })}
                    </div>
                </div>

            </div>
        </div>
    );
}
