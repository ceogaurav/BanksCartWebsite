import React, { useState } from 'react';
import { ArrowRight, Wallet } from 'lucide-react';

export default function RewardsCalculator() {
    const [activeTab, setActiveTab] = useState('reward'); // 'reward' or 'redeem'

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Maximize Benefits on Your Credit Cards</h2>
            <p className="text-gray-500 mb-8">BanksCart's Rewards Calculator and RedeemWise help you track, earn, and redeem rewards smartly.</p>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden flex flex-col lg:flex-row">
                {/* Left Controls */}
                <div className="p-8 lg:w-1/2 flex flex-col justify-center">
                    <div className="flex bg-gray-100 p-1 rounded-lg mb-8 w-fit">
                        <button 
                            onClick={() => setActiveTab('reward')}
                            className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'reward' ? 'bg-white shadow text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Reward Calculator
                        </button>
                        <button 
                            onClick={() => setActiveTab('redeem')}
                            className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'redeem' ? 'bg-blue-600 text-white shadow' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                            Redeemwise Calculator
                        </button>
                    </div>

                    <div className="space-y-4 max-w-md">
                        <select className="w-full p-3 border border-gray-300 rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-100 outline-none">
                            <option>Select Your Bank</option>
                            <option>HDFC Bank</option>
                            <option>SBI Card</option>
                            <option>Axis Bank</option>
                        </select>
                        
                        <select className="w-full p-3 border border-gray-300 rounded-lg text-gray-600 focus:ring-2 focus:ring-blue-100 outline-none">
                            <option>Select Card Variant</option>
                            <option>Regalia Gold</option>
                            <option>Diners Club Black</option>
                        </select>

                        <input 
                            type="number" 
                            placeholder="Enter Your Reward Points"
                            className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-100"
                        />

                        <button className="w-full bg-gray-400 text-white font-bold py-3 rounded-lg mt-4 cursor-not-allowed">
                            Calculate
                        </button>
                    </div>
                </div>

                {/* Right Illustration (Mock from image 5/6) */}
                <div className="bg-blue-50 lg:w-1/2 p-8 flex items-center justify-center relative overflow-hidden">
                    <div className="relative z-10 text-center">
                        <div className="w-64 h-64 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm relative">
                             {/* Floating Icons simulating the image */}
                             <div className="absolute top-4 bg-white p-3 rounded-full shadow-lg"><Wallet className="w-6 h-6 text-blue-500"/></div>
                             <div className="absolute bottom-10 left-4 bg-white p-3 rounded-full shadow-lg"><ArrowRight className="w-6 h-6 text-green-500"/></div>
                             <div className="bg-blue-600 text-white p-6 rounded-xl shadow-xl transform rotate-12">
                                <p className="font-mono text-xs opacity-70">Credit Card</p>
                                <p className="font-bold text-lg mt-2">1234 5678</p>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
