import React from 'react';
import { ShieldCheck, UserCheck, Zap, Download } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="bg-white py-12 border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-12 items-start">

                {/* Left Content */}
                <div className="flex-1 space-y-8">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Credit Cards</h1>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Credit cards come with varied features and benefits tailored to different lifestyles.
                            The key is to choose the one that aligns with your spending preferences.
                            BanksCart makes it simple by bringing 100+ cards in one place for you to compare,
                            check eligibility, apply through a completely digital process, and get instant approval.
                        </p>
                    </div>

                    <div className="grid gap-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                                <Zap className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Compare India's best credit cards</h3>
                                <p className="text-gray-500">See cards from top Banks & Issuers</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                                <UserCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Choose card matching your lifestyle</h3>
                                <p className="text-gray-500">Wide choice of 100+ credit cards</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Pre-qualified offers, zero docs</h3>
                                <p className="text-gray-500">Seamless & digital processes</p>
                            </div>
                        </div>
                    </div>

                    {/* Stats / Trust Badges */}
                    <div className="flex items-center gap-8 pt-6 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-1.5 rounded text-xs font-bold">
                                4.5/5
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-semibold">Google Play Store</p>
                                <div className="flex text-yellow-400 text-xs gap-0.5">
                                    {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                                </div>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div>
                            <p className="font-bold text-xl text-gray-900">5cr+</p>
                            <p className="text-xs text-gray-500">Happy Customers</p>
                        </div>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div>
                            <p className="font-bold text-xl text-gray-900">800+</p>
                            <p className="text-xs text-gray-500">Cities across India</p>
                        </div>
                    </div>
                </div>

                {/* Right Form Card */}
                <div className="w-full lg:w-[450px] bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sticky top-24">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Check Your Credit Card Offers</h2>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="As on your PAN Card"
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                            <div className="relative">
                                <span className="absolute left-4 top-3.5 text-gray-500 font-medium">+91</span>
                                <input
                                    type="tel"
                                    placeholder="Enter Mobile Number"
                                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">This will not impact your Credit Score.</p>
                        </div>

                        <button type="button" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
                            Apply Now {'->'}
                        </button>

                        <p className="text-[10px] text-gray-400 text-center leading-tight">
                            By submitting this form, you agree to our <a href="#" className="underline">Terms of Use</a> & <a href="#" className="underline">Privacy Policy</a>
                        </p>
                    </form>
                </div>

            </div>
        </section>
    );
}
