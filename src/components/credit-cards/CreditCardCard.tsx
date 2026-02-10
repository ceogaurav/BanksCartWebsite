import React from 'react';
import { CheckCircle, Info, ChevronRight, Gift } from 'lucide-react';
import { CreditCard } from '../../data/creditCards';
import { Link } from 'react-router-dom';

interface CreditCardCardProps {
    card: CreditCard;
}

export default function CreditCardCard({ card }: CreditCardCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden relative group">

            {/* Top Right Badges */}
            <div className="absolute top-4 right-4 flex gap-2">
                {card.badges.map((badge, index) => (
                    <span
                        key={index}
                        className={`
                px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1
                ${badge === 'Travel' ? 'bg-blue-50 text-blue-600' :
                                badge === 'Premium' ? 'bg-purple-50 text-purple-600' :
                                    badge === 'Rewards' ? 'bg-amber-50 text-amber-600' :
                                        'bg-gray-100 text-gray-600'}
            `}
                    >
                        {/* Simple icon logic based on badge name */}
                        {badge === 'Travel' && '✈️'}
                        {badge === 'Shopping' && '🛍️'}
                        {badge === 'Dining' && '🍽️'}
                        {badge}
                    </span>
                ))}
            </div>

            <div className="flex flex-col md:flex-row">

                {/* Left: Image */}
                <div className="p-6 md:w-64 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50">
                    <div className="relative w-40 h-24 mb-4 transition-transform duration-300 group-hover:scale-105">
                        <img
                            src={card.image}
                            alt={card.name}
                            className="w-full h-full object-contain drop-shadow-lg"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/300x190/f1f5f9/94a3b8?text=Card';
                            }}
                        />
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span>Compare</span>
                        </label>
                    </div>
                </div>

                {/* Middle: Content */}
                <div className="flex-1 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-1 pr-24">{card.name}</h3>
                    {card.promoText && (
                        <p className="text-xs text-blue-600 font-semibold mb-4 flex items-center gap-1 bg-blue-50 w-fit px-2 py-1 rounded">
                            <Gift className="w-3 h-3" /> {card.promoText}
                        </p>
                    )}

                    <div className="space-y-3 mt-4">
                        {card.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2.5">
                                <div className="mt-1 min-w-[16px]">
                                    {idx === 0 ? (
                                        <Gift className="w-4 h-4 text-amber-500" />
                                    ) : (
                                        <CheckCircle className="w-4 h-4 text-green-500/80" />
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 leading-snug">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Fees & CTA */}
                <div className="md:w-72 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100 bg-gray-50/30">
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-baseline md:block">
                            <p className="text-xs text-gray-500 font-semibold uppercase">Joining Fee</p>
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-bold text-gray-900">{card.fees.joining}</span>
                                <Info className="w-3 h-3 text-gray-400 cursor-help" />
                            </div>
                        </div>
                        <div className="flex justify-between items-baseline md:block">
                            <p className="text-xs text-gray-500 font-semibold uppercase">Annual Fee</p>
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-bold text-gray-900">{card.fees.annual}</span>
                            </div>
                            {card.fees.renewalWaiver && (
                                <p className="text-[10px] text-green-600 mt-0.5">{card.fees.renewalWaiver}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <Link to="#" className="w-full flex items-center justify-center py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm shadow-md shadow-blue-100 transition-all">
                            Check Eligibility <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                        <div className="text-center">
                            <Link to={card.link} className="text-xs font-semibold text-blue-600 hover:underline">
                                Read More
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
