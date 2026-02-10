import React from 'react';
import { Info, ChevronRight, Gift, Plane, ShoppingBag, Utensils, Award } from 'lucide-react';
import { CreditCard } from '../../data/creditCards';
import { Link } from 'react-router-dom';

interface CreditCardCardProps {
    card: CreditCard;
}

export default function CreditCardCard({ card }: CreditCardCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden relative group">

            <div className="flex flex-col lg:flex-row">

                {/* Left: Image & Compare */}
                <div className="p-6 lg:w-72 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-100 bg-gray-50/30">
                    <div className="relative w-48 h-32 mb-4 transition-transform duration-300 group-hover:scale-105">
                        <img
                            src={card.image}
                            alt={card.name}
                            className="w-full h-full object-contain drop-shadow-xl"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/300x190/f1f5f9/94a3b8?text=Card';
                            }}
                        />
                    </div>
                    <label className="flex items-center gap-2 text-sm text-gray-500 cursor-pointer select-none hover:text-blue-600 transition-colors">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                        <span className="font-medium">Compare</span>
                    </label>
                </div>

                {/* Middle: Content */}
                <div className="flex-1 p-6 lg:border-r border-gray-100">
                    {/* Header with Title & Bagdes */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">{card.name}</h3>
                            <div className="flex flex-wrap gap-2">
                                {card.badges.map((badge, index) => (
                                    <span
                                        key={index}
                                        className={`
                                            px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border flex items-center gap-1.5
                                            ${badge === 'Travel' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                                badge === 'Premium' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                                    badge === 'Rewards' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                                                        badge === 'Cashback' ? 'bg-green-50 text-green-600 border-green-100' :
                                                            'bg-gray-50 text-gray-600 border-gray-100'}
                                        `}
                                    >
                                        {badge === 'Travel' && <Plane className="w-3 h-3" />}
                                        {badge === 'Shopping' && <ShoppingBag className="w-3 h-3" />}
                                        {badge === 'Dining' && <Utensils className="w-3 h-3" />}
                                        {badge === 'Premium' && <Award className="w-3 h-3" />}
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3">
                        {card.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-3 group/feature">
                                <div className="mt-1 min-w-[16px]">
                                    <Gift className="w-4 h-4 text-amber-500 fill-amber-500/10" />
                                </div>
                                <p className="text-sm text-gray-600 leading-snug group-hover/feature:text-gray-900 transition-colors">{feature}</p>
                            </div>
                        ))}
                    </div>

                    {/* Promo Text if available */}
                    {card.promoText && (
                        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg">
                            <Gift className="w-3.5 h-3.5 text-blue-600" />
                            <span className="text-xs font-semibold text-blue-700">{card.promoText}</span>
                        </div>
                    )}
                </div>

                {/* Right: Fees & CTA */}
                <div className="lg:w-64 p-6 flex flex-col justify-between bg-gray-50/30">
                    <div className="space-y-4 mb-6">
                        {/* Joining Fee */}
                        <div>
                            <div className="flex items-center gap-1 mb-1">
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Joining Fee</p>
                                <Info className="w-3 h-3 text-gray-400 cursor-help" />
                            </div>
                            <p className="text-sm font-bold text-gray-900">{card.fees.joining}</p>
                        </div>

                        {/* Annual Fee */}
                        <div>
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Annual Fee</p>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-gray-900">{card.fees.annual}</span>
                                {card.fees.renewalWaiver && (
                                    <span className="text-[10px] text-green-600 font-medium mt-0.5">{card.fees.renewalWaiver}</span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 mt-auto">
                        <Link to="#" className="w-full flex items-center justify-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm shadow-lg shadow-blue-100 transition-all active:scale-[0.98]">
                            Check Eligibility <ChevronRight className="w-4 h-4 ml-1" />
                        </Link>
                        <div className="text-center">
                            <Link to={card.link} className="text-xs font-semibold text-gray-500 hover:text-blue-600 hover:underline transition-colors decoration-blue-600/30">
                                Read More
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
