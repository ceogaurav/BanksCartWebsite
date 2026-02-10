import React from 'react';
import { Info, ChevronRight, Gift, Plane, ShoppingBag, Utensils, Award, CheckCircle } from 'lucide-react';
import { CreditCard } from '../../data/creditCards';
import { Link } from 'react-router-dom';

interface CreditCardCardProps {
    card: CreditCard;
    isComparing?: boolean;
    onToggleCompare?: (id: string) => void;
}

// Helper for Badge Colors
const getBadgeStyles = (type: string) => {
    switch (type) {
        case 'Travel': return 'bg-sky-50 text-sky-700 border-sky-100';
        case 'Premium': return 'bg-purple-50 text-purple-700 border-purple-100';
        case 'Rewards': return 'bg-amber-50 text-amber-700 border-amber-100';
        case 'Cashback': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
        case 'Fuel': return 'bg-red-50 text-red-700 border-red-100';
        case 'Shopping': return 'bg-pink-50 text-pink-700 border-pink-100';
        default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
};

// Helper for Badge Icons
const getBadgeIcon = (type: string) => {
    switch (type) {
        case 'Travel': return <Plane className="w-3 h-3" />;
        case 'Shopping': return <ShoppingBag className="w-3 h-3" />;
        case 'Dining': return <Utensils className="w-3 h-3" />;
        case 'Premium': return <Award className="w-3 h-3" />;
        default: return null;
    }
};

export default function CreditCardCard({ card, isComparing = false, onToggleCompare }: CreditCardCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden relative group flex flex-col lg:flex-row">
            
            {/* --- Left Column: Image & Compare --- */}
            <div className="p-6 lg:w-72 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-100 bg-gradient-to-b from-gray-50/50 to-white">
                
                {/* Image Container with Fixed Aspect Ratio (Credit Card Standard) */}
                <div className="relative w-full max-w-[240px] aspect-[1.586/1] mb-5 transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-2 filter drop-shadow-md group-hover:drop-shadow-2xl">
                    <img
                        src={card.image}
                        alt={card.name}
                        className="w-full h-full object-contain"
                        loading="lazy"
                        onError={(e) => {
                            // Fallback to a clean placeholder if image fails
                            (e.target as HTMLImageElement).src = 'https://placehold.co/400x250/f1f5f9/94a3b8?text=Card+Image';
                        }}
                    />
                </div>

                {/* Interactive Compare Checkbox */}
                <label 
                    className={`
                        flex items-center gap-2 text-sm px-4 py-2 rounded-full cursor-pointer select-none transition-all
                        ${isComparing ? 'bg-blue-50 text-blue-700 font-bold ring-1 ring-blue-200' : 'text-gray-500 hover:bg-gray-100'}
                    `}
                    onClick={(e) => e.stopPropagation()} // Prevent triggering parent clicks if any
                >
                    <div className="relative flex items-center">
                        <input 
                            type="checkbox" 
                            className="peer sr-only" // Screen reader only, custom visual below
                            checked={isComparing}
                            onChange={() => onToggleCompare && onToggleCompare(card.id)}
                        />
                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isComparing ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'}`}>
                            {isComparing && <CheckCircle className="w-3 h-3 text-white" />}
                        </div>
                    </div>
                    <span>Add to Compare</span>
                </label>
            </div>

            {/* --- Middle Column: Details --- */}
            <div className="flex-1 p-6 lg:border-r border-gray-100 flex flex-col">
                
                {/* Header: Title & Badges */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-blue-700 transition-colors">
                            {card.name}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {card.badges.map((badge, index) => (
                                <span
                                    key={index}
                                    className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide border flex items-center gap-1.5 ${getBadgeStyles(badge)}`}
                                >
                                    {getBadgeIcon(badge)}
                                    {badge}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-4">
                    {card.features.slice(0, 3).map((feature, idx) => ( // Show max 3 features to keep alignment
                        <div key={idx} className="flex items-start gap-3">
                            <div className="mt-1 min-w-[16px]">
                                <Gift className="w-4 h-4 text-blue-500" />
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed">{feature}</p>
                        </div>
                    ))}
                </div>

                {/* Promo Text (Pushed to bottom of this section) */}
                {card.promoText && (
                    <div className="mt-auto inline-flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg max-w-fit">
                        <Gift className="w-3.5 h-3.5 text-blue-600" />
                        <span className="text-xs font-bold text-blue-800">{card.promoText}</span>
                    </div>
                )}
            </div>

            {/* --- Right Column: Fees & Action --- */}
            <div className="lg:w-72 p-6 flex flex-col bg-gray-50/50">
                
                {/* Fees Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 mb-6">
                    {/* Joining Fee */}
                    <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-1 mb-1">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Joining Fee</p>
                            <Info className="w-3 h-3 text-gray-300" />
                        </div>
                        <p className="text-sm font-bold text-gray-900">{card.fees.joining}</p>
                    </div>

                    {/* Annual Fee */}
                    <div className="p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-1 mb-1">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Annual Fee</p>
                        </div>
                        <p className="text-sm font-bold text-gray-900">{card.fees.annual}</p>
                        {card.fees.renewalWaiver && (
                            <p className="text-[10px] text-green-600 font-medium mt-1 leading-tight">
                                {card.fees.renewalWaiver}
                            </p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 mt-auto">
                    <button className="w-full flex items-center justify-center py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold text-sm shadow-lg shadow-blue-200 transition-all active:scale-[0.98]">
                        Check Eligibility <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                    
                    <div className="text-center">
                        <Link 
                            to={card.link || '#'} 
                            className="inline-block text-sm font-semibold text-gray-500 hover:text-blue-600 hover:bg-blue-50 px-4 py-1.5 rounded-full transition-all"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
