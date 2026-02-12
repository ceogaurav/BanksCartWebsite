import React, { useState } from 'react';
import { ShieldCheck, UserCheck, Zap, Star } from 'lucide-react';

export default function HeroSection() {
    const [formData, setFormData] = useState({ fullName: '', mobile: '' });

    return (
        <section className="bg-white py-10 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-12 items-start">
                
                {/* Left Content */}
                <div className="flex-1 space-y-6 pt-2">
                    <h1 className="text-4xl font-bold text-gray-900">Credit Cards</h1>
                    <p className="text-gray-600 leading-relaxed text-[15px]">
                        Credit cards come with varied features and benefits tailored to different lifestyles. The key is to choose the one that aligns with your spending preferences. BanksCart makes it simple by bringing 100+ cards in one place for you to compare, check eligibility, apply through a completely digital process, and get instant approval.
                    </p>

                    <div className="space-y-5 pt-2">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-green-50 rounded flex items-center justify-center text-green-600 shrink-0">
                                <Zap className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-base">Compare India's best credit cards</h3>
                                <p className="text-gray-500 text-sm">See cards from top Banks & Issuers</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-orange-50 rounded flex items-center justify-center text-orange-600 shrink-0">
                                <UserCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-base">Choose card matching your lifestyle</h3>
                                <p className="text-gray-500 text-sm">Wide choice of 100+ credit cards</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-yellow-50 rounded flex items-center justify-center text-yellow-600 shrink-0">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-base">Pre-qualified offers, zero docs</h3>
                                <p className="text-gray-500 text-sm">Seamless & digital processes</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 pt-6 mt-4 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                            <div>
                                <div className="flex items-center gap-1">
                                    <span className="bg-gradient-to-r from-orange-400 to-yellow-400 text-transparent bg-clip-text font-bold">Google Play Store</span>
                                </div>
                                <div className="flex text-yellow-400 text-sm mt-0.5">
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current" />
                                    <Star className="w-4 h-4 fill-current text-gray-300" />
                                </div>
                                <div className="flex gap-2 text-xs font-bold text-gray-800 mt-1">
                                    <span>4.5/5</span>
                                    <span className="text-gray-400 font-normal">|</span>
                                    <span>15.5L Reviews</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-10 w-px bg-gray-200"></div>
                        <div>
                            <p className="font-bold text-xl text-gray-900">5cr+</p>
                            <p className="text-xs text-gray-500">Happy Customers</p>
                        </div>
                        <div className="h-10 w-px bg-gray-200"></div>
                        <div>
                            <p className="font-bold text-xl text-gray-900">800+</p>
                            <p className="text-xs text-gray-500">Cities across India</p>
                        </div>
                    </div>
                </div>

                {/* Right Form */}
                <div className="w-full lg:w-[420px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Check Your Credit Card Offers</h2>
                    <form className="space-y-4">
                        <input
                            type="text"
                            placeholder="Full Name (as on your PAN)"
                            className="w-full px-4 py-3 rounded border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm transition-all"
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        />
                        <div className="relative">
                            <label className="absolute -top-2 left-3 bg-white px-1 text-xs text-blue-600 font-medium">Mobile Number</label>
                            <div className="flex border border-blue-500 rounded overflow-hidden">
                                <div className="bg-gray-50 px-3 py-3 border-r border-gray-200 flex items-center gap-2">
                                    <img src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg" alt="India" className="w-5 h-auto shadow-sm" />
                                    <span className="text-sm font-medium text-gray-600">+91</span>
                                </div>
                                <input
                                    type="tel"
                                    placeholder="Enter Mobile Number"
                                    className="flex-1 px-4 py-3 outline-none text-sm"
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                                />
                            </div>
                        </div>
                        <p className="text-xs text-gray-500">This will not impact your Credit Score.</p>

                        <button type="button" className="w-full bg-[#0071eb] hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg transition-colors mt-2">
                            Apply Now {'->'}
                        </button>

                        <p className="text-[10px] text-gray-400 text-center leading-tight pt-2">
                            By submitting this form, you have read and agree to the <a href="#" className="underline text-blue-600">Credit Report Terms of Use</a>, <a href="#" className="underline text-blue-600">Terms of Use</a> & <a href="#" className="underline text-blue-600">Privacy Policy</a>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
