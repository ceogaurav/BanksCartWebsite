import React from 'react';
import { Scale, ShieldCheck, Heart } from 'lucide-react';

const WhyChooseSection: React.FC = () => {
    return (
        <section className="py-20 bg-transparent">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left title */}
                    <div className="lg:w-1/3">
                        <h2 className="text-3xl font-extrabold text-slate-900 leading-snug">
                            Compare, Choose and Apply for personal credit products on BanksCart
                        </h2>
                        <button className="mt-8 px-6 py-2.5 bg-white border border-blue-600 text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
                            READ MORE
                        </button>
                    </div>

                    {/* Right Grid */}
                    <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div>
                            <div className="w-12 h-12 rounded-lg bg-red-50 flex items-center justify-center mb-4">
                                <Scale className="w-6 h-6 text-red-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Wide Choice</h3>
                            <p className="text-slate-500 leading-relaxed">
                                We have partnerships with large banks, NBFCs and fintech lenders who offer a wide choice of products on our platform.
                            </p>
                        </div>
                        <div>
                            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mb-4">
                                <ShieldCheck className="w-6 h-6 text-green-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Easy Access to Credit</h3>
                            <p className="text-slate-500 leading-relaxed">
                                Our algorithm-based technology provides access to multiple credit offers, ease of comparison and unbiased advice.
                            </p>
                        </div>
                        <div>
                            <div className="w-12 h-12 rounded-lg bg-pink-50 flex items-center justify-center mb-4">
                                <Heart className="w-6 h-6 text-pink-500" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3">Tailor Made for You</h3>
                            <p className="text-slate-500 leading-relaxed">
                                We help you find the best financial products that suit your specific needs and profile perfectly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;
