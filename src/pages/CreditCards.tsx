import React, { useState, useMemo } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroSection from '../components/credit-cards/HeroSection';
import FilterSidebar from '../components/credit-cards/FilterSidebar';
import CreditCardCard from '../components/credit-cards/CreditCardCard';
import CreditCardSavingsCalculator from '../components/credit-cards/CreditCardSavingsCalculator';
import { creditCards } from '../data/creditCards';

export default function CreditCards() {
    // 1. Filter State
    const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // 2. Filter Logic (Apply filters to the full list)
    const filteredCards = useMemo(() => {
        return creditCards.filter(card => {
            // Check Bank Filter
            // Assumes your card data has a 'bankName' property
            if (selectedBanks.length > 0 && !selectedBanks.includes(card.bankName)) {
                return false;
            }
            
            // Check Category Filter
            // Assumes your card data has a 'category' or 'type' property
            // If category is an array: card.categories.some(c => selectedCategories.includes(c))
            // If category is a string: selectedCategories.includes(card.category)
            if (selectedCategories.length > 0) {
                 // Adjust 'card.category' below to match your data structure exactly
                return selectedCategories.includes(card.category); 
            }
            
            return true;
        });
    }, [selectedBanks, selectedCategories]);

    // 3. Dynamic Facets Calculation (Count how many cards exist for each filter)
    const facets = useMemo(() => {
        const banksMap = new Map<string, number>();
        const categoriesMap = new Map<string, number>();

        creditCards.forEach(card => {
            // Count Banks
            banksMap.set(card.bankName, (banksMap.get(card.bankName) || 0) + 1);
            
            // Count Categories (adjust 'card.category' to match your data)
            categoriesMap.set(card.category, (categoriesMap.get(card.category) || 0) + 1);
        });

        return {
            banks: Array.from(banksMap.entries()).map(([name, count]) => ({ name, count })),
            categories: Array.from(categoriesMap.entries()).map(([name, count]) => ({ name, count }))
        };
    }, []);

    // 4. Handlers
    const toggleBank = (bank: string) => {
        setSelectedBanks(prev => 
            prev.includes(bank) ? prev.filter(b => b !== bank) : [...prev, bank]
        );
    };

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev => 
            prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        );
    };

    const clearAllFilters = () => {
        setSelectedBanks([]);
        setSelectedCategories([]);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Header />
            <HeroSection />

            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
                <div className="flex gap-8 items-start">

                    {/* Pass Props to Sidebar */}
                    <FilterSidebar 
                        availableBanks={facets.banks}
                        availableCategories={facets.categories}
                        selectedBanks={selectedBanks}
                        selectedCategories={selectedCategories}
                        onBankChange={toggleBank}
                        onCategoryChange={toggleCategory}
                        onClearAll={clearAllFilters}
                    />

                    <main className="flex-1 min-w-0">
                        {/* Mobile Filter Bar (Optional visual only for now) */}
                        <div className="lg:hidden mb-6 flex gap-2 overflow-x-auto pb-2">
                            <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium whitespace-nowrap">Filter</button>
                            <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium whitespace-nowrap">Sort By</button>
                        </div>

                        {/* Results Header */}
                        <div className="mb-6 flex justify-between items-end">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Best Credit Cards in India</h1>
                                <p className="text-sm text-gray-500 mt-1">
                                    Showing {filteredCards.length} Cards 
                                    {(selectedBanks.length > 0 || selectedCategories.length > 0) && ' (Filtered)'}
                                </p>
                            </div>
                        </div>

                        {/* Cards Grid - Renders Filtered List */}
                        <div className="space-y-6">
                            {filteredCards.length > 0 ? (
                                filteredCards.map((card) => (
                                    <CreditCardCard key={card.id} card={card} />
                                ))
                            ) : (
                                <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                                    <p className="text-gray-500">No cards match your selected filters.</p>
                                    <button onClick={clearAllFilters} className="text-blue-600 font-bold mt-2 hover:underline">Clear Filters</button>
                                </div>
                            )}
                        </div>

                    </main>
                </div>
            </div>

            <CreditCardSavingsCalculator />
            <Footer />
        </div>
    );
}
