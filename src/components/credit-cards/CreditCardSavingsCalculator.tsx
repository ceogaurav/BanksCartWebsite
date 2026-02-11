import React, { useState, useMemo } from 'react';
import { Calculator, PieChart, IndianRupee, CreditCard as CardIcon } from 'lucide-react';
import { creditCards } from '../../data/creditCards';

export default function CreditCardSavingsCalculator() {
    // State for selected card and spending categories
    const [selectedCardId, setSelectedCardId] = useState<string>(creditCards[0].id);
    const [spends, setSpends] = useState({
        online: 15000,
        travel: 5000,
        dining: 5000,
        fuel: 3000,
        other: 10000
    });

    // Get the full object of the selected card
    const selectedCard = useMemo(() => 
        creditCards.find(c => c.id === selectedCardId) || creditCards[0], 
    [selectedCardId]);

    // Calculate Savings Logic based on Card ID
    const savings = useMemo(() => {
        let totalSavings = 0;
        const { online, travel, dining, fuel, other } = spends;

        // Custom Logic for specific cards based on their real features
        switch (selectedCard.id) {
            case 'sbi-cashback':
                // 5% on online, 1% on others
                totalSavings = (online * 0.05) + ((travel + dining + fuel + other) * 0.01);
                break;
            case 'axis-flipkart':
                // 5% on Flipkart (assuming online is Flipkart for sim), 4% on Partners (dining), 1.5% base
                totalSavings = (online * 0.05) + (dining * 0.04) + ((travel + fuel + other) * 0.015);
                break;
            case 'icici-amazon-pay':
                // 5% Amazon (online), 1% base
                totalSavings = (online * 0.05) + ((travel + dining + fuel + other) * 0.01);
                break;
            case 'hdfc-regalia-gold':
                // Approx 4 Reward Points per 150 (approx 1.3%), 5X on select online (approx 6.5%)
                // Simplified: 2% avg on online, 1.3% base
                totalSavings = (online * 0.02) + ((travel + dining + fuel + other) * 0.0133);
                break;
            case 'idfc-wealth':
                // Dynamic interest savings + reward points (approx 1.5% avg)
                totalSavings = (online + travel + dining + fuel + other) * 0.015;
                break;
            case 'amex-platinum-travel':
                // Milestone heavy. Approx 6-8% return if milestones met.
                // Conservative estimate: 3% on travel, 1% others
                totalSavings = (travel * 0.05) + ((online + dining + fuel + other) * 0.01);
                break;
            case 'bpcl-sbi':
                // 7.25% on Fuel, 1% others
                totalSavings = (fuel * 0.0725) + ((online + travel + dining + other) * 0.01);
                break;
            default:
                // Generic 1% cashback fallback
                totalSavings = (online + travel + dining + fuel + other) * 0.01;
        }

        return Math.round(totalSavings);
    }, [selectedCardId, spends]);

    const totalMonthlySpend = Object.values(spends).reduce((a, b) => a + b, 0);
    const annualSavings = savings * 12;

    const handleSpendChange = (category: keyof typeof spends, value: number) => {
        setSpends(prev => ({ ...prev, [category]: value }));
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-[#48126b] p-6 text-white flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <Calculator className="w-6 h-6 text-yellow-400" /> 
                        Credit Card Savings Calculator
                    </h2>
                    <p className="text-purple-200 text-sm mt-1">Calculate how much you can save with the right card</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row">
                {/* Left: Inputs */}
                <div className="p-8 lg:w-3/5 space-y-8">
                    
                    {/* Card Selector */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Select a Credit Card</label>
                        <div className="relative">
                            <select 
                                value={selectedCardId}
                                onChange={(e) => setSelectedCardId(e.target.value)}
                                className="w-full p-4 pl-12 bg-gray-50 border border-gray-200 rounded-xl appearance-none font-medium text-gray-700 outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                            >
                                {creditCards.map(card => (
                                    <option key={card.id} value={card.id}>{card.name}</option>
                                ))}
                            </select>
                            <CardIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        </div>
                    </div>

                    {/* Sliders */}
                    <div className="space-y-6">
                        <h3 className="font-bold text-gray-900 border-b pb-2">Monthly Spends</h3>
                        
                        {[
                            { label: 'Online Shopping', key: 'online', max: 100000, color: 'accent-blue-600' },
                            { label: 'Travel & Commute', key: 'travel', max: 50000, color: 'accent-purple-600' },
                            { label: 'Dining & Movies', key: 'dining', max: 50000, color: 'accent-orange-500' },
                            { label: 'Fuel', key: 'fuel', max: 20000, color: 'accent-red-500' },
                            { label: 'Other Spends', key: 'other', max: 50000, color: 'accent-gray-500' }
                        ].map((item) => (
                            <div key={item.key}>
                                <div className="flex justify-between mb-2 text-sm">
                                    <span className="text-gray-600 font-medium">{item.label}</span>
                                    <span className="font-bold text-gray-900">₹{spends[item.key as keyof typeof spends].toLocaleString()}</span>
                                </div>
                                <input 
                                    type="range"
                                    min="0"
                                    max={item.max}
                                    step="500"
                                    value={spends[item.key as keyof typeof spends]}
                                    onChange={(e) => handleSpendChange(item.key as keyof typeof spends, Number(e.target.value))}
                                    className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer ${item.color}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Results */}
                <div className="lg:w-2/5 bg-gray-50 p-8 flex flex-col justify-center border-l border-gray-100 relative overflow-hidden">
                    {/* Background Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl -mr-20 -mt-20 opacity-50"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-100 rounded-full blur-3xl -ml-20 -mb-20 opacity-50"></div>

                    <div className="relative z-10 text-center">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-6 inline-block w-full max-w-xs mx-auto transform hover:scale-105 transition-transform duration-300">
                            <img src={selectedCard.image} alt={selectedCard.name} className="h-32 object-contain mx-auto mb-4" />
                            <h4 className="font-bold text-gray-800 text-sm line-clamp-1">{selectedCard.name}</h4>
                            <div className="mt-2 inline-block bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded">
                                {selectedCard.provider}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">Estimated Annual Savings</p>
                                <p className="text-4xl font-extrabold text-green-600 flex items-center justify-center gap-1 mt-1">
                                    <IndianRupee className="w-8 h-8" />
                                    {annualSavings.toLocaleString()}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="bg-white p-3 rounded-lg border border-gray-200">
                                    <p className="text-xs text-gray-500">Monthly Savings</p>
                                    <p className="font-bold text-gray-900 text-lg">₹{savings.toLocaleString()}</p>
                                </div>
                                <div className="bg-white p-3 rounded-lg border border-gray-200">
                                    <p className="text-xs text-gray-500">Effective Return</p>
                                    <p className="font-bold text-blue-600 text-lg">
                                        {totalMonthlySpend > 0 ? ((savings / totalMonthlySpend) * 100).toFixed(2) : 0}%
                                    </p>
                                </div>
                            </div>
                            
                            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all">
                                Apply for this Card
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
