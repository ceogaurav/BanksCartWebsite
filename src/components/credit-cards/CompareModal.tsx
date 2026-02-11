import React from 'react';
import { X, Check, Minus, CreditCard as CardIcon } from 'lucide-react';
import { CreditCard } from '../../data/creditCards';

interface CompareModalProps {
    isOpen: boolean;
    onClose: () => void;
    cards: CreditCard[];
}

export default function CompareModal({ isOpen, onClose, cards }: CompareModalProps) {
    if (!isOpen) return null;

    // Features to compare
    const comparisonPoints = [
        { label: 'Joining Fee', key: 'fees.joining' },
        { label: 'Annual Fee', key: 'fees.annual' },
        { label: 'Renewal Waiver', key: 'fees.renewalWaiver' },
        { label: 'Best For', key: 'badges' },
        { label: 'Key Features', key: 'features' },
    ];

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-up">
                
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <CardIcon className="w-6 h-6 text-blue-600" />
                        Compare Cards
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-900"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-auto flex-1 p-6 custom-scrollbar">
                    <div className="min-w-[800px]"> {/* Ensure min width for table scrolling */}
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="p-4 w-48 sticky left-0 bg-white z-10 border-b border-gray-100"></th>
                                    {cards.map((card) => (
                                        <th key={card.id} className="p-4 w-72 align-top border-b border-gray-100 bg-gray-50/30 rounded-t-lg">
                                            <div className="flex flex-col items-center text-center">
                                                <div className="h-24 mb-4 flex items-center justify-center">
                                                    <img src={card.image} alt={card.name} className="max-h-full max-w-full object-contain drop-shadow-md" />
                                                </div>
                                                <h3 className="font-bold text-gray-900 text-sm mb-2 h-10 flex items-center justify-center">{card.name}</h3>
                                                <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors">
                                                    Apply Now
                                                </button>
                                            </div>
                                        </th>
                                    ))}
                                    {/* Fill empty slots if less than 3 cards */}
                                    {[...Array(3 - cards.length)].map((_, i) => (
                                        <th key={i} className="p-4 w-72 align-middle border-b border-gray-100 bg-gray-50/10">
                                            <div className="border-2 border-dashed border-gray-200 rounded-xl h-48 flex flex-col items-center justify-center text-gray-400">
                                                <span className="text-sm font-medium">Add Card</span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {/* Dynamic Rows */}
                                {comparisonPoints.map((point, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4 font-bold text-gray-700 text-sm sticky left-0 bg-white z-10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
                                            {point.label}
                                        </td>
                                        {cards.map((card) => (
                                            <td key={card.id} className="p-4 align-top">
                                                {point.key === 'features' ? (
                                                    <ul className="space-y-2">
                                                        {card.features.map((feature, i) => (
                                                            <li key={i} className="text-xs text-gray-600 flex items-start gap-2">
                                                                <Check className="w-3 h-3 text-green-500 shrink-0 mt-0.5" />
                                                                <span className="leading-snug">{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : point.key === 'badges' ? (
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {card.badges.map((badge, i) => (
                                                            <span key={i} className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded border border-blue-100">
                                                                {badge}
                                                            </span>
                                                        ))}
                                                    </div>
                                                ) : point.key === 'fees.joining' ? (
                                                    <span className="text-sm font-semibold text-gray-900">{card.fees.joining}</span>
                                                ) : point.key === 'fees.annual' ? (
                                                    <span className="text-sm font-semibold text-gray-900">{card.fees.annual}</span>
                                                ) : point.key === 'fees.renewalWaiver' ? (
                                                    <span className="text-xs text-green-600 font-medium">{card.fees.renewalWaiver || <span className="text-gray-400 flex items-center gap-1"><Minus className="w-3 h-3"/> NA</span>}</span>
                                                ) : (
                                                    <span className="text-sm text-gray-600">-</span>
                                                )}
                                            </td>
                                        ))}
                                        {/* Empty Cells */}
                                        {[...Array(3 - cards.length)].map((_, i) => (
                                            <td key={i} className="p-4"></td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
