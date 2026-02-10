import React, { useState } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import HeroSection from '../components/credit-cards/HeroSection';
import FilterSidebar from '../components/credit-cards/FilterSidebar';
import CreditCardCard from '../components/credit-cards/CreditCardCard';
import { creditCards } from '../data/creditCards';

// Simple Savings Calculator Component (Inline for now)
const SavingsCalculator = () => {
    const [monthlySpend, setMonthlySpend] = useState(10000);

    return (
        <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-2xl p-8 md:p-12 text-white overflow-hidden relative mt-16">

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-4">Calculate Your Card Savings</h2>
                    <p className="text-blue-200 mb-8">Check how much your credit card helps you save - monthly and annually - with BanksCart's Savings Calculator.</p>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-medium text-blue-100">Monthly Shopping Spend</label>
                                <span className="font-bold">₹{monthlySpend.toLocaleString()}</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="100000" step="1000"
                                value={monthlySpend}
                                onChange={(e) => setMonthlySpend(Number(e.target.value))}
                                className="w-full h-2 bg-blue-700/50 rounded-lg appearance-none cursor-pointer accent-blue-400"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white text-gray-900 p-8 rounded-xl w-full md:w-80 text-center shadow-xl">
                    <p className="text-gray-500 font-medium mb-1">Your Monthly Savings*</p>
                    <p className="text-4xl font-bold text-blue-600 mb-2">₹{(monthlySpend * 0.05).toLocaleString()}</p>
                    <p className="text-xs text-gray-400 mb-6">on monthly spend of ₹{monthlySpend.toLocaleString()}</p>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg">
                        View Best Cards
                    </button>
                </div>
            </div>
        </div>
    );
};

export default function CreditCards() {
    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Navbar />

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
                                <h2 className="text-2xl font-bold text-gray-900">Best Credit Cards in India</h2>
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

                        <SavingsCalculator />

                    </main>
                </div>
            </div>

            <Footer />
        </div>
    );
}
