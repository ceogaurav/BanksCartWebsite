import React from 'react';
import { CheckCircle, Info, Star, ChevronRight, CreditCard as CardIcon } from 'lucide-react';
import { creditCards } from '../data/creditCards';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CreditCards() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            <Navbar />

            {/* Hero / Header Section */}
            <div className="bg-blue-900 py-12 text-white text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Best Credit Cards in India</h1>
                <p className="text-blue-200 text-lg max-w-2xl mx-auto px-4">
                    Compare & Apply for the best credit cards from top banks. Check your eligibility instantly.
                </p>
            </div>

            <div className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                    {/* Sidebar Filters (Placeholder) */}
                    <aside className="hidden lg:block lg:col-span-1">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                                <CardIcon className="w-5 h-5 text-blue-600" /> Filters
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-sm mb-3">Provider</h4>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> HDFC Bank</label>
                                        <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> SBI Card</label>
                                        <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Axis Bank</label>
                                        <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> ICICI Bank</label>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-sm mb-3">Category</h4>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Lifetime Free</label>
                                        <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Travel</label>
                                        <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Shopping</label>
                                        <label className="flex items-center gap-2"><input type="checkbox" className="rounded" /> Cashback</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Cards List */}
                    <main className="lg:col-span-3 space-y-6">
                        {creditCards.map((card) => (
                            <div key={card.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">

                                {/* Top Band: Best For */}
                                <div className="bg-blue-50 px-6 py-2 border-b border-blue-100 flex items-center gap-2">
                                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                                    <span className="text-xs font-bold text-blue-900 uppercase tracking-wide">Best For: {card.bestFor}</span>
                                </div>

                                <div className="flex flex-col md:flex-row p-6 gap-6">

                                    {/* Left: Image & Rating */}
                                    <div className="flex-shrink-0 flex flex-col items-center justify-center md:w-56 border-r-0 md:border-r border-gray-100 pr-0 md:pr-6">
                                        <div className="relative w-full max-w-[200px] aspect-[1.586] mb-4">
                                            {/* Placeholder Image Logic: Using the URL from data, fallback handled if broken */}
                                            <img
                                                src={card.image}
                                                alt={card.name}
                                                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300 drop-shadow-lg"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://placehold.co/300x190/0f172a/FFF?text=Credit+Card';
                                                }}
                                            />
                                        </div>
                                        <div className="text-center">
                                            <Link to={card.link} className="text-blue-600 text-sm font-medium hover:underline flex items-center justify-center gap-1">
                                                Know More <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Middle: Name & Features */}
                                    <div className="flex-grow">
                                        <h2 className="text-xl font-bold text-gray-900 mb-2">{card.name}</h2>
                                        <div className="mb-4">
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                                {card.provider}
                                            </span>
                                        </div>

                                        <ul className="space-y-3">
                                            {card.features.slice(0, 3).map((feature, idx) => (
                                                <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-600">
                                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Right: Pricing & CTA */}
                                    <div className="flex-shrink-0 md:w-64 flex flex-col justify-center border-l-0 md:border-l border-gray-100 pl-0 md:pl-6 pt-6 md:pt-0 mt-6 md:mt-0 border-t md:border-t-0">
                                        <div className="space-y-4 mb-6">
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-semibold">Joining Fee</p>
                                                <p className="text-lg font-bold text-gray-900">{card.joiningFee}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 uppercase font-semibold">Annual Fee</p>
                                                <p className="text-lg font-bold text-gray-900">{card.annualFee}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg ring ring-blue-600/20 active:scale-[0.98] transition-all">
                                                Check Eligibility
                                            </button>
                                            <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1">
                                                <Info className="w-3 h-3" /> T&C Apply
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </main>
                </div>

            </div>

            <Footer />
        </div>
    );
}
