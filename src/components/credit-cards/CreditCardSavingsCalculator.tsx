import React, { useState, useMemo } from 'react';
import { ChevronDown, Info, ArrowRight } from 'lucide-react';

export default function CreditCardSavingsCalculator() {
    const [selectedBank, setSelectedBank] = useState('HDFC Bank');
    const [selectedCard, setSelectedCard] = useState('HDFC TravelOne Credit Card');
    const [term, setTerm] = useState<'Monthly' | 'Annual'>('Monthly');

    // State for sliders (Monthly Spends)
    const [spends, setSpends] = useState({
        shopping: 10000,
        travel: 10000,
        dining: 10000,
        grocery: 10000,
        movies: 3000,
        fuel: 10000,
    });

    // Mock calculation logic
    const savings = useMemo(() => {
        const totalSpend = Object.values(spends).reduce((a, b) => a + b, 0);

        // Base savings logic (mock)
        const baseRewardRate = 0.02; // 2% average
        const bonusRewardRate = 0.03; // 3% bonus on specific categories

        let totalSavings = 0;

        // Apply detailed logic based on "selectedCard" (mocked for now)
        totalSavings += spends.shopping * (selectedCard.includes('Shopping') ? 0.05 : baseRewardRate);
        totalSavings += spends.travel * (selectedCard.includes('Travel') ? 0.05 : baseRewardRate);
        totalSavings += spends.dining * (selectedCard.includes('Dining') ? 0.05 : baseRewardRate);
        totalSavings += spends.grocery * 0.01; // 1% usually
        totalSavings += spends.movies * 0.05; // 5% usually
        totalSavings += spends.fuel * 0.01; // 1% surcharge waiver etc.

        const monthlySavings = Math.round(totalSavings);
        const annualSavings = monthlySavings * 12;

        return {
            monthly: monthlySavings,
            annual: annualSavings,
            spendRewards: Math.round(monthlySavings * 0.4), // Mock breakdown
            additionalIncentives: Math.round(monthlySavings * 0.6), // Mock breakdown
        };
    }, [spends, selectedCard]);

    const handleSliderChange = (category: keyof typeof spends, value: number) => {
        setSpends(prev => ({ ...prev, [category]: value }));
    };

    const maxSpend = 100000; // Max allowed per slider

    return (
        <section className="bg-white py-12 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Credit Card Savings Calculator</h2>
                    <p className="text-gray-500 mt-2">
                        Check how much your credit card helps you save - monthly and annually - with BanksCart's Savings Calculator.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col lg:flex-row">

                    {/* Left Panel: Inputs */}
                    <div className="flex-1 p-8 space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold text-gray-900 text-pink-500">Calculate Your <span className="text-pink-600">Card Savings</span></h3>
                            <div className="bg-gray-100 p-1 rounded-lg flex items-center text-sm font-medium">
                                <button
                                    onClick={() => setTerm('Monthly')}
                                    className={`px-4 py-1.5 rounded-md transition-all ${term === 'Monthly' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setTerm('Annual')}
                                    className={`px-4 py-1.5 rounded-md transition-all ${term === 'Annual' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    Annual
                                </button>
                            </div>
                        </div>

                        {/* Bank & Card Selectors */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="relative">
                                <label className="text-xs text-gray-500 font-semibold uppercase mb-1 block">Select Your Bank</label>
                                <div className="relative">
                                    <select
                                        className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        value={selectedBank}
                                        onChange={(e) => setSelectedBank(e.target.value)}
                                    >
                                        <option>HDFC Bank</option>
                                        <option>SBI Card</option>
                                        <option>Axis Bank</option>
                                        <option>ICICI Bank</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="relative">
                                <label className="text-xs text-gray-500 font-semibold uppercase mb-1 block">Select Card Variant</label>
                                <div className="relative">
                                    <select
                                        className="w-full appearance-none border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                        value={selectedCard}
                                        onChange={(e) => setSelectedCard(e.target.value)}
                                    >
                                        <option>HDFC TravelOne Credit Card</option>
                                        <option>HDFC Regalia Gold</option>
                                        <option>HDFC Millennia</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Sliders Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {Object.entries(spends).map(([key, value]) => (
                                <div key={key}>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-medium text-gray-700 capitalize">{key}</label>
                                        <div className="bg-gray-50 border border-gray-200 rounded px-2 py-1 text-sm font-semibold text-gray-900">
                                            ₹ {value.toLocaleString()}
                                        </div>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max={maxSpend}
                                        step="500"
                                        value={value}
                                        onChange={(e) => handleSliderChange(key as keyof typeof spends, Number(e.target.value))}
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                    />
                                    <div className="flex justify-between text-[10px] text-gray-400 mt-1 font-medium">
                                        <span>₹0</span>
                                        <span>₹{maxSpend.toLocaleString()}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel: Result */}
                    <div className="lg:w-96 bg-blue-50/50 p-8 border-l border-gray-100 flex flex-col items-center text-center relative">
                        {/* Card Image (Mock) */}
                        <div className="mb-6 relative group">
                            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-500"></div>
                            <img
                                src="https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/04c2c553-6251-469b-980b-22c5457ef47f/Footer/Resource/Learning%20Centre/Pay/Credit%20Card/Regalia%20Gold%20Credit%20Card/Regalia_Gold_Credit_Card_767x530.png"
                                alt="Selected Card"
                                className="w-40 relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-300"
                            />
                        </div>

                        <p className="text-gray-500 font-medium mb-1">Your {term} Savings*</p>
                        <p className="text-4xl font-bold text-pink-600 mb-2">
                            ₹ {(term === 'Monthly' ? savings.monthly : savings.annual).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400 mb-8">
                            on {term.toLowerCase()} spend of ₹ {Object.values(spends).reduce((a, b) => a + b, 0).toLocaleString()}
                        </p>

                        <div className="w-full space-y-3 bg-white p-4 rounded-xl border border-gray-100 mb-6">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600">Spend Rewards</span>
                                <span className="font-bold text-gray-900">₹ {savings.spendRewards.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600 flex items-center gap-1">
                                    Additional Incentives <Info className="w-3 h-3 text-gray-400" />
                                </span>
                                <span className="font-bold text-gray-900">₹ {savings.additionalIncentives.toLocaleString()}</span>
                            </div>
                        </div>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg shadow-lg shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                            Apply Now <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
