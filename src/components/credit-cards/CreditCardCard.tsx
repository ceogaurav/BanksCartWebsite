import React from 'react';
import { Info, ChevronRight, Gift, Plane, ShoppingBag, Utensils, Award, CreditCard as CardIcon } from 'lucide-react';
import { CreditCard } from '../../data/creditCards';
import { Link } from 'react-router-dom';

interface CreditCardCardProps {
    card: CreditCard;
    onToggleCompare: (id: string) => void;
    isSelectedForCompare: boolean;
    disableCompare: boolean;
}

export default function CreditCardCard({ card, onToggleCompare, isSelectedForCompare, disableCompare }: CreditCardCardProps) {
    return (
        <div className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden relative group 
            ${isSelectedForCompare ? 'border-blue-500 ring-1 ring-blue-500 shadow-md' : 'border-gray-200 shadow-sm hover:shadow-xl hover:border-blue-200'}`}>

            <div className="flex flex-col lg:flex-row">

                {/* Left: Image & Compare */}
                <div className="p-6 lg:w-72 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
                    <div className="relative w-full max-w-[200px] h-[120px] mb-4 transition-transform duration-300 group-hover:scale-105">
                        <img
                            src={card.image}
                            alt={card.name}
                            className="w-full h-full object-contain drop-shadow-lg"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/300x190/f1f5f9/94a3b8?text=Card+Image';
                            }}
                        />
                    </div>
                    
                    {/* Compare Checkbox */}
                    <label className={`flex items-center gap-2 text-sm cursor-pointer select-none transition-colors 
                        ${disableCompare && !isSelectedForCompare ? 'opacity-50 cursor-not-allowed text-gray-400' : 'text-gray-500 hover:text-blue-600'}`}>
                        <input 
                            type="checkbox" 
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer disabled:cursor-not-allowed" 
                            checked={isSelectedForCompare}
                            onChange={() => onToggleCompare(card.id)}
                            disabled={disableCompare && !isSelectedForCompare}
                        />
                        <span className={`font-medium ${isSelectedForCompare ? 'text-blue-700' : ''}`}>
                            {isSelectedForCompare ? 'Added to Compare' : 'Add to Compare'}
                        </span>
                    </label>
                </div>

                {/* Middle: Content */}
                <div className="flex-1 p-6 lg:border-r border-gray-100">
                    {/* Header with Title & Badges */}
                    <div className="flex flex-col gap-3 mb-4">
                        <div className="flex justify-between items-start">
                             <div>
                                <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors">
                                    {card.name}
                                </h3>
                             </div>
                             {/* Rating Badge */}
                             {card.rating && (
                                 <div className="bg-green-50 text-green-700 border border-green-100 text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                                    <span>★</span> {card.rating}
                                 </div>
                             )}
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {(card.badges || []).map((badge, index) => (
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
                                    {badge}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2.5 mb-4">
                        {(card.features || []).slice(0, 3).map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2.5">
                                <div className="mt-1.5 min-w-[6px] h-[6px] rounded-full bg-blue-500"></div>
                                <p className="text-sm text-gray-600 leading-snug">{feature}</p>
                            </div>
                        ))}
                    </div>

                    {/* Promo Text */}
                    {card.promoText && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-100 rounded-lg">
                            <Gift className="w-3.5 h-3.5 text-indigo-600" />
                            <span className="text-xs font-semibold text-indigo-700">{card.promoText}</span>
                        </div>
                    )}
                </div>

                {/* Right: Fees & CTA */}
                <div className="lg:w-64 p-6 flex flex-col justify-between bg-gray-50/30 lg:bg-transparent">
                    <div className="space-y-4 mb-6">
                        {/* Fees */}
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:gap-4">
                            <div>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Joining Fee</p>
                                <p className="text-sm font-bold text-gray-900">{card.fees.joining}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-1">Annual Fee</p>
                                <p className="text-sm font-bold text-gray-900">{card.fees.annual}</p>
                                {card.fees.renewalWaiver && (
                                    <p className="text-[10px] text-green-600 font-medium mt-0.5 leading-tight">{card.fees.renewalWaiver}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 mt-auto">
                        <button className="w-full flex items-center justify-center py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm shadow-lg shadow-blue-100 transition-all active:scale-[0.98]">
                            Check Eligibility <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                        <div className="text-center">
                            <Link to={card.link || '#'} className="text-xs font-semibold text-gray-500 hover:text-blue-600 hover:underline transition-colors">
                                View Details
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
