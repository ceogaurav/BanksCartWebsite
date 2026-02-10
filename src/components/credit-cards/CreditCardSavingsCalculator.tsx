import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, Info, ArrowRight, Wallet, Award, TrendingUp } from 'lucide-react';

// --- REAL WORLD CARD DATA CONFIGURATION ---
const CARDS_DATA = [
    {
        id: 'hdfc-regalia-gold',
        bank: 'HDFC Bank',
        name: 'Regalia Gold Credit Card',
        image: 'https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/04c2c553-6251-469b-980b-22c5457ef47f/Footer/Resource/Learning%20Centre/Pay/Credit%20Card/Regalia%20Gold%20Credit%20Card/Regalia_Gold_Credit_Card_767x530.png',
        fee: 2500,
        rewardStructure: {
            base: 0.013, // ~4 points per 150 (approx 1.33%)
            shopping: 0.05, // 5x on select partners (simplified to 5%)
            travel: 0.026, // 2x on travel portals
            dining: 0.013,
            grocery: 0.013,
            movies: 0.013,
            fuel: 0.01 // Surcharge waiver
        },
        milestones: [
            { threshold: 400000, bonus: 1500 }, // value in rupees
            { threshold: 800000, bonus: 4000 }
        ]
    },
    {
        id: 'sbi-cashback',
        bank: 'SBI Card',
        name: 'SBI Cashback Card',
        image: 'https://www.sbicard.com/sbi-card-en/assets/media/images/personal/credit-cards/visuals/cashback-sbi-card-d.png',
        fee: 999,
        rewardStructure: {
            base: 0.01, // 1% offline
            shopping: 0.05, // 5% online (Assuming shopping slider is online spend)
            travel: 0.05,   // 5% online
            dining: 0.01,
            grocery: 0.01,
            movies: 0.05,   // Online booking
            fuel: 0.01      // Surcharge waiver
        },
        milestones: [
            { threshold: 200000, bonus: 999 } // Fee reversal essentially
        ]
    },
    {
        id: 'axis-ace',
        bank: 'Axis Bank',
        name: 'Axis Ace Credit Card',
        image: 'https://www.axisbank.com/images/default-source/revamp_new/cards/credit-cards/desktop/ace-credit-card.png',
        fee: 499,
        rewardStructure: {
            base: 0.02, // 2% flat
            shopping: 0.02,
            travel: 0.04, // 4% on Ola/Uber/Swiggy/Zomato partners
            dining: 0.04, // 4% on Swiggy/Zomato
            grocery: 0.02,
            movies: 0.02,
            fuel: 0.01
        },
        milestones: []
    }
];

export default function CreditCardSavingsCalculator() {
    const [selectedBank, setSelectedBank] = useState('HDFC Bank');
    const [selectedCardId, setSelectedCardId] = useState(CARDS_DATA[0].id);
    const [term, setTerm] = useState<'Monthly' | 'Annual'>('Monthly');

    // Filter cards based on selected bank
    const availableCards = CARDS_DATA.filter(c => c.bank === selectedBank);

    // Effect to reset card selection when bank changes
    useEffect(() => {
        if (availableCards.length > 0) {
            setSelectedCardId(availableCards[0].id);
        }
    }, [selectedBank]);

    const activeCard = CARDS_DATA.find(c => c.id === selectedCardId) || CARDS_DATA[0];

    // State for sliders (Monthly Spends)
    const [spends, setSpends] = useState({
        shopping: 20000,
        travel: 10000,
        dining: 5000,
        grocery: 8000,
        movies: 1000,
        fuel: 3000,
    });

    const handleSliderChange = (category: keyof typeof spends, value: number) => {
        setSpends(prev => ({ ...prev, [category]: value }));
    };

    // --- REALISTIC CALCULATION ENGINE ---
    const savings = useMemo(() => {
        // 1. Calculate Category Rewards (Monthly)
        let monthlyRewardsValue = 0;
        
        Object.entries(spends).forEach(([category, amount]) => {
            const rate = activeCard.rewardStructure[category as keyof typeof activeCard.rewardStructure] || activeCard.rewardStructure.base;
            monthlyRewardsValue += amount * rate;
        });

        // 2. Annualize
        const annualRewardsValue = monthlyRewardsValue * 12;
        const totalAnnualSpend = Object.values(spends).reduce((a, b) => a + b, 0) * 12;

        // 3. Calculate Milestone Bonuses (Annual only)
        let milestoneBonus = 0;
        activeCard.milestones.forEach(m => {
            if (totalAnnualSpend >= m.threshold) {
                milestoneBonus += m.bonus;
            }
        });

        // 4. Totals
        const totalAnnualBenefit = annualRewardsValue + milestoneBonus;
        const netAnnualBenefit = totalAnnualBenefit - activeCard.fee; // Subtracting Annual Fee
        const netMonthlyBenefit = netAnnualBenefit / 12;

        return {
            monthly: Math.round(netMonthlyBenefit > 0 ? netMonthlyBenefit : 0),
            annual: Math.round(netAnnualBenefit > 0 ? netAnnualBenefit : 0),
            rewardsBreakdown: Math.round(term === 'Monthly' ? monthlyRewardsValue : annualRewardsValue),
            milestoneBreakdown: Math.round(term === 'Monthly' ? milestoneBonus / 12 : milestoneBonus),
            fee: activeCard.fee
        };
    }, [spends, activeCard, term]);

    const maxSpend = 100000;

    return (
        <section className="bg-white py-12 border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Real-Time Savings Calculator</h2>
                    <p className="text-gray-500 mt-2">
                        See exactly how much the <strong>{activeCard.name}</strong> saves you based on your actual spending habits.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col lg:flex-row">

                    {/* Left Panel: Inputs */}
                    <div className="flex-1 p-6 md:p-8 space-y-8">
                        
                        {/* Controls Header */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Customize Your Spends</h3>
                                <p className="text-sm text-gray-400">Adjust sliders to match your monthly expenses</p>
                            </div>
                            
                            <div className="bg-gray-100 p-1 rounded-lg flex items-center text-sm font-medium self-start md:self-auto">
                                <button
                                    onClick={() => setTerm('Monthly')}
                                    className={`px-4 py-1.5 rounded-md transition-all ${term === 'Monthly' ? 'bg-white shadow text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setTerm('Annual')}
                                    className={`px-4 py-1.5 rounded-md transition-all ${term === 'Annual' ? 'bg-white shadow text-blue-600 font-bold' : 'text-gray-500 hover:text-gray-900'}`}
                                >
                                    Annual
                                </button>
                            </div>
                        </div>

                        {/* Bank & Card Selectors */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-blue-50/50 rounded-xl border border-blue-100">
                            <div className="relative">
                                <label className="text-xs text-blue-800 font-bold uppercase mb-2 block tracking-wider">Select Bank</label>
                                <div className="relative">
                                    <select
                                        className="w-full appearance-none border border-blue-200 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium text-gray-700 cursor-pointer hover:border-blue-400 transition-colors"
                                        value={selectedBank}
                                        onChange={(e) => setSelectedBank(e.target.value)}
                                    >
                                        <option value="HDFC Bank">HDFC Bank</option>
                                        <option value="SBI Card">SBI Card</option>
                                        <option value="Axis Bank">Axis Bank</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="relative">
                                <label className="text-xs text-blue-800 font-bold uppercase mb-2 block tracking-wider">Select Card</label>
                                <div className="relative">
                                    <select
                                        className="w-full appearance-none border border-blue-200 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium text-gray-700 cursor-pointer hover:border-blue-400 transition-colors"
                                        value={selectedCardId}
                                        onChange={(e) => setSelectedCardId(e.target.value)}
                                    >
                                        {availableCards.map(card => (
                                            <option key={card.id} value={card.id}>{card.name}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Sliders Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {Object.entries(spends).map(([key, value]) => (
                                <div key={key}>
                                    <div className="flex justify-between items-center mb-2">
                                        <label className="text-sm font-semibold text-gray-700 capitalize flex items-center gap-2">
                                            {key}
                                        </label>
                                        <div className="bg-white border border-gray-200 shadow-sm rounded px-3 py-1 text-sm font-bold text-blue-600">
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
                                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 hover:accent-blue-500 transition-all"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Panel: Result */}
                    <div className="lg:w-[400px] bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white flex flex-col relative overflow-hidden">
                        
                        {/* Decorative BG */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>

                        {/* Card Preview */}
                        <div className="relative z-10 flex flex-col items-center text-center mb-8">
                             <div className="h-48 flex items-center justify-center mb-4 transition-transform duration-500 hover:scale-105">
                                <img
                                    src={activeCard.image}
                                    alt={activeCard.name}
                                    className="max-h-full max-w-full object-contain drop-shadow-2xl rounded-xl"
                                />
                             </div>
                             <h4 className="font-bold text-lg text-white mb-1">{activeCard.name}</h4>
                             <p className="text-slate-400 text-sm">Annual Fee: <span className="text-white">₹{activeCard.fee}</span></p>
                        </div>

                        {/* Savings Display */}
                        <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 mb-6">
                            <p className="text-blue-200 font-medium text-sm mb-1 uppercase tracking-wide">Net {term} Benefit</p>
                            <div className="flex items-baseline gap-1 justify-center">
                                <span className="text-4xl font-bold text-white">₹ {savings.annual.toLocaleString()}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-2">
                                After deducting applicable fees and adding milestone bonuses.
                            </p>
                        </div>

                        {/* Breakdown */}
                        <div className="relative z-10 space-y-3 mb-8">
                            <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                                <span className="text-slate-300 flex items-center gap-2">
                                    <Wallet className="w-4 h-4 text-blue-400" /> Reward Value
                                </span>
                                <span className="font-bold text-white">₹ {savings.rewardsBreakdown.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                                <span className="text-slate-300 flex items-center gap-2">
                                    <Award className="w-4 h-4 text-yellow-400" /> Milestone Bonus
                                </span>
                                <span className="font-bold text-white">₹ {savings.milestoneBreakdown.toLocaleString()}</span>
                            </div>
                            {term === 'Annual' && (
                                <div className="flex justify-between items-center text-sm pt-1">
                                    <span className="text-red-300 flex items-center gap-2">
                                        <TrendingUp className="w-4 h-4" /> Less: Annual Fee
                                    </span>
                                    <span className="font-medium text-red-300">- ₹ {savings.fee.toLocaleString()}</span>
                                </div>
                            )}
                        </div>

                        <button className="relative z-10 mt-auto w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/50 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group">
                            Apply for {activeCard.name} 
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                </div>
            </div>
        </section>
    );
}
