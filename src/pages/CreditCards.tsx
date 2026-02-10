import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import HeroSection from '../components/credit-cards/HeroSection';
import FilterSidebar from '../components/credit-cards/FilterSidebar';
import CreditCardCard from '../components/credit-cards/CreditCardCard';
import CreditCardSavingsCalculator from '../components/credit-cards/CreditCardSavingsCalculator';
import { creditCards } from '../data/creditCards';

export function CreditCards() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Header />

            <HeroSection />

            <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
                <div className="flex gap-8 items-start">

                    <FilterSidebar />

                    <main className="flex-1 min-w-0">

                        {/* Sort/Filter Bar for Mobile */}
                        <div className="lg:hidden mb-6 flex gap-2 overflow-x-auto pb-2">
                            <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium whitespace-nowrap">Filter</button>
                            <button className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium whitespace-nowrap">Sort By</button>
                        </div>

                        {/* Section Title */}
                        <div className="mb-6 flex justify-between items-end">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Best Credit Cards in India</h1>
                                <p className="text-sm text-gray-500 mt-1">Showing {creditCards.length} Cards</p>
                            </div>
                        </div>

                        {/* Cards Grid */}
                        <div className="space-y-6">
                            {creditCards.map((card) => (
                                <CreditCardCard key={card.id} card={card} />
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="mt-8 text-center">
                            <button className="px-6 py-3 border border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
                                Show More Cards
                            </button>
                        </div>

                    </main>
                </div>
            </div>

            <CreditCardSavingsCalculator />

            <Footer />
        </div>
    );
}
