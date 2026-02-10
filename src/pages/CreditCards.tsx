import React, { useState, useMemo } from 'react';
import { Wallet } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroSection from '../components/credit-cards/HeroSection';
import FilterSidebar from '../components/credit-cards/FilterSidebar';
import CreditCardCard from '../components/credit-cards/CreditCardCard';
import CreditCardSavingsCalculator from '../components/credit-cards/CreditCardSavingsCalculator';
import PreApprovedCarousel from '../components/credit-cards/PreApprovedCarousel';
import RewardsCalculator from '../components/credit-cards/RewardsCalculator';
import { creditCards } from '../data/creditCards';

export default function CreditCards() {
    // 1. Filter State
    const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    // 2. Filter Logic
    const filteredCards = useMemo(() => {
        return creditCards.filter(card => {
            if (selectedBanks.length > 0 && !selectedBanks.includes(card.bankName)) {
                return false;
            }
            if (selectedCategories.length > 0) {
                // FIX: Added safe check (card.categories || []) to prevent crash
                const currentCardCategories = card.categories || []; 
                const hasCategory = currentCardCategories.some(c => selectedCategories.includes(c));
                if (!hasCategory) return false;
            }
            return true;
        });
    }, [selectedBanks, selectedCategories]);

    // 3. Facets
    const facets = useMemo(() => {
        const banksMap = new Map<string, number>();
        const categoriesMap = new Map<string, number>();

        creditCards.forEach(card => {
            // Count Banks
            if (card.bankName) {
                banksMap.set(card.bankName, (banksMap.get(card.bankName) || 0) + 1);
            }
            
            // FIX: Added safe check (card.categories || []) to prevent crash
            const currentCardCategories = card.categories || [];
            currentCardCategories.forEach(cat => {
                categoriesMap.set(cat, (categoriesMap.get(cat) || 0) + 1);
            });
        });

        return {
            banks: Array.from(banksMap.entries()).map(([name, count]) => ({ name, count })),
            categories: Array.from(categoriesMap.entries()).map(([name, count]) => ({ name, count }))
        };
    }, []);

    const toggleBank = (bank: string) => {
        setSelectedBanks(prev => prev.includes(bank) ? prev.filter(b => b !== bank) : [...prev, bank]);
    };

    const toggleCategory = (category: string) => {
        setSelectedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
    };

    const clearAllFilters = () => {
        setSelectedBanks([]);
        setSelectedCategories([]);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Header />
            <HeroSection />

            {/* Pre-Approved Cards Section */}
            <div className="bg-white border-b border-gray-200 py-10">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                     <PreApprovedCarousel />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
                <div className="flex gap-8 items-start">
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
                        {/* Section Title */}
                        <div className="mb-4">
                            <h1 className="text-2xl font-bold text-gray-900">Best Credit Cards in India</h1>
                        </div>

                        {/* Purple Banner */}
                        <div className="bg-[#48126b] rounded-xl p-4 mb-6 flex items-center justify-between text-white shadow-lg relative overflow-hidden">
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="bg-green-500/20 p-2 rounded-lg">
                                    <Wallet className="w-8 h-8 text-green-400" />
                                </div>
                                <div>
                                    <p className="font-bold text-lg">Apply for a Credit Card & Get <span className="text-yellow-400">₹500 Cashback</span> in PB Wallet*</p>
                                    <p className="text-xs text-purple-200">*PB Wallet is available on the Paisabazaar App</p>
                                </div>
                            </div>
                            <button className="bg-white text-[#48126b] px-6 py-2 rounded font-bold text-sm hover:bg-gray-100 transition-colors z-10">
                                Apply Now {'>'}
                            </button>
                             <div className="absolute right-0 top-0 h-full w-1/3 bg-purple-800/30 skew-x-12"></div>
                        </div>

                        {/* Cards Grid */}
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

                         <div className="mt-8 text-center">
                            <button className="px-8 py-3 bg-white border border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
                                Show More Cards
                            </button>
                        </div>
                    </main>
                </div>
            </div>

            {/* Calculators Section */}
            <div className="bg-white py-12 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-16">
                    <RewardsCalculator />
                    <CreditCardSavingsCalculator />
                </div>
            </div>

            <Footer />
        </div>
    );
}
