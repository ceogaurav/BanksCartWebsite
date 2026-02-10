import React from 'react';
import { Plane, Utensils, Award, ShoppingBag, CreditCard } from 'lucide-react';
import { creditCards } from '../../data/creditCards';

export default function PreApprovedCarousel() {
    // Select a few cards for the carousel
    const carouselCards = creditCards.slice(3, 6);

    return (
        <div className="w-full">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Pre-Approved Credit Cards on Paisabazaar</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {carouselCards.map((card, idx) => (
                    <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow">
                        <div className="flex gap-4 mb-4">
                            <img src={card.image} alt={card.name} className="w-16 h-10 object-contain" />
                            <div>
                                <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-2">{card.name}</h3>
                                <div className="mt-1 inline-block bg-gray-100 px-2 py-0.5 rounded text-[10px] font-medium text-gray-600">
                                    Joining Fee: {card.fees.joining.replace('+ Taxes', '')}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-4">
                            {card.badges.slice(0, 3).map((badge, i) => (
                                <span key={i} className="text-[10px] flex items-center gap-1 font-semibold text-gray-600">
                                    {badge === 'Travel' && <Plane className="w-3 h-3 text-blue-500" />}
                                    {badge === 'Dining' && <Utensils className="w-3 h-3 text-orange-500" />}
                                    {badge === 'Rewards' && <Award className="w-3 h-3 text-yellow-500" />}
                                    {badge === 'Shopping' && <ShoppingBag className="w-3 h-3 text-pink-500" />}
                                    {badge === 'Movies' && <CreditCard className="w-3 h-3 text-purple-500" />}
                                    {badge}
                                </span>
                            ))}
                        </div>

                        <ul className="space-y-2 mb-4 min-h-[60px]">
                            {card.features.slice(0, 2).map((feature, i) => (
                                <li key={i} className="text-xs text-gray-500 leading-snug list-disc list-outside ml-3">
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <div className="flex gap-2">
                             <button className="flex-1 border border-blue-600 text-blue-600 text-xs font-bold py-2 rounded hover:bg-blue-50">
                                Know More
                            </button>
                            <button className="flex-1 bg-blue-600 text-white text-xs font-bold py-2 rounded hover:bg-blue-700">
                                Apply Now
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
