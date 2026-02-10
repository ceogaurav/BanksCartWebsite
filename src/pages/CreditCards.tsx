import React, { useState, useMemo } from 'react';
import { Wallet, X } from 'lucide-react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroSection from '../components/credit-cards/HeroSection';
import FilterSidebar from '../components/credit-cards/FilterSidebar';
import CreditCardCard from '../components/credit-cards/CreditCardCard';
import CreditCardSavingsCalculator from '../components/credit-cards/CreditCardSavingsCalculator';
import PreApprovedCarousel from '../components/credit-cards/PreApprovedCarousel';
import RewardsCalculator from '../components/credit-cards/RewardsCalculator';
import CompareFloatingBar from '../components/credit-cards/CompareFloatingBar';
import { creditCards } from '../data/creditCards';

export default function CreditCards() {
    const [selectedBanks, setSelectedBanks] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [compareList, setCompareList] = useState<string[]>([]); // Store IDs
    const [showCompareModal, setShowCompareModal] = useState(false);

    // Filter Logic
    const filteredCards = useMemo(() => {
        return creditCards.filter(card => {
            if (selectedBanks.length > 0 && !selectedBanks.includes(card.bankName)) return false;
            
            if (selectedCategories.length > 0) {
                const cats = card.categories || [];
                const hasCat = cats.some(c => selectedCategories.includes(c));
                if (!hasCat) return false;
            }
            return true;
        });
    }, [selectedBanks, selectedCategories]);

    // Facet Calculation (Fixes Sidebar Counts)
    const facets = useMemo(() => {
        const banksMap = new Map<string, number>();
        const categoriesMap = new Map<string, number>();

        creditCards.forEach(card => {
            if (card.bankName) {
                banksMap.set(card.bankName, (banksMap.get(card.bankName) || 0) + 1);
            }
            const cats = card.categories || [];
            cats.forEach(cat => {
                categoriesMap.set(cat, (categoriesMap.get(cat) || 0) + 1);
            });
        });

        return {
            banks: Array.from(banksMap.entries()).map(([name, count]) => ({ name, count })).sort((a,b) => b.count - a.count),
            categories: Array.from(categoriesMap.entries()).map(([name, count]) => ({ name, count }))
        };
    }, []);

    // Compare Handlers
    const toggleCompare = (id: string) => {
        setCompareList(prev => {
            if (prev.includes(id)) return prev.filter(item => item !== id);
            if (prev.length >= 3) return prev; // Max 3
            return [...prev, id];
        });
    };

    const clearCompare = () => setCompareList([]);

    // Get card objects for the floating bar
    const selectedCardsForCompare = creditCards.filter(c => compareList.includes(c.id));

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
            <Header />
            <HeroSection />

            <div className="bg-white border-b border-gray-200 py-10">
                <div className="max-w-7xl mx-auto px-4 lg:px-8">
                     <PreApprovedCarousel />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
                <div className="flex gap-8 items-start">
                    
                    {/* Pass facets correctly here */}
                    <FilterSidebar 
                        availableBanks={facets.banks}
                        availableCategories={facets.categories}
                        selectedBanks={selectedBanks}
                        selectedCategories={selectedCategories}
                        onBankChange={(bank) => setSelectedBanks(prev => prev.includes(bank) ? prev.filter(b => b!==bank) : [...prev, bank])}
                        onCategoryChange={(cat) => setSelectedCategories(prev => prev.includes(cat) ? prev.filter(c => c!==cat) : [...prev, cat])}
                        onClearAll={() => { setSelectedBanks([]); setSelectedCategories([]); }}
                    />

                    <main className="flex-1 min-w-0">
                        <div className="mb-4 flex items-center justify-between">
                            <h1 className="text-2xl font-bold text-gray-900">Best Credit Cards in India <span className="text-sm font-normal text-gray-500 ml-2">({filteredCards.length} Found)</span></h1>
                        </div>

                        {/* Purple Banner */}
                        <div className="bg-[#48126b] rounded-xl p-5 mb-6 flex flex-col sm:flex-row items-center justify-between text-white shadow-lg relative overflow-hidden gap-4">
                            <div className="relative z-10 flex items-center gap-4">
                                <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm">
                                    <Wallet className="w-6 h-6 text-yellow-400" />
                                </div>
                                <div>
                                    <p className="font-bold text-lg leading-tight">Apply & Get <span className="text-yellow-400">₹500 Cashback</span></p>
                                    <p className="text-xs text-purple-200 opacity-80 mt-1">Limited period offer on select cards*</p>
                                </div>
                            </div>
                            <button className="bg-white text-[#48126b] px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors z-10 whitespace-nowrap shadow-md">
                                Claim Offer
                            </button>
                             <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 pointer-events-none"></div>
                        </div>

                        {/* Cards Grid */}
                        <div className="space-y-6">
                            {filteredCards.map((card) => (
                                <CreditCardCard 
                                    key={card.id} 
                                    card={card} 
                                    onToggleCompare={toggleCompare}
                                    isSelectedForCompare={compareList.includes(card.id)}
                                    disableCompare={compareList.length >= 3}
                                />
                            ))}
                            {filteredCards.length === 0 && (
                                <div className="p-10 text-center bg-white border border-gray-200 rounded-xl">
                                    <p className="text-gray-500">No cards found matching these filters.</p>
                                    <button onClick={() => {setSelectedBanks([]); setSelectedCategories([]);}} className="text-blue-600 font-bold mt-2">Clear All Filters</button>
                                </div>
                            )}
                        </div>
                    </main>
                </div>
            </div>

            <div className="bg-white py-12 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 lg:px-8 space-y-16">
                    <RewardsCalculator />
                    <CreditCardSavingsCalculator />
                </div>
            </div>

            <Footer />

            {/* Floating Bar */}
            <CompareFloatingBar 
                selectedCards={selectedCardsForCompare}
                onRemove={toggleCompare}
                onClear={clearCompare}
                onCompareNow={() => alert('Compare Modal Opening... (Feature to be implemented)')}
            />
        </div>
    );
}
