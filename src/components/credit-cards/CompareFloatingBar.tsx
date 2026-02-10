import React from 'react';
import { X, Layers } from 'lucide-react';
import { CreditCard } from '../../data/creditCards';

interface CompareFloatingBarProps {
    selectedCards: CreditCard[];
    onRemove: (id: string) => void;
    onClear: () => void;
    onCompareNow: () => void;
}

export default function CompareFloatingBar({ selectedCards, onRemove, onClear, onCompareNow }: CompareFloatingBarProps) {
    if (selectedCards.length === 0) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
                <div className="bg-white border-t border-l border-r border-gray-200 rounded-t-xl shadow-[0_-8px_30px_rgba(0,0,0,0.12)] p-4 flex items-center justify-between">
                    
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-600 p-2 rounded-lg">
                                <Layers className="w-5 h-5 text-white" />
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-sm font-bold text-gray-900">Compare Cards</p>
                                <p className="text-xs text-gray-500">{selectedCards.length} of 3 selected</p>
                            </div>
                        </div>

                        {/* Selected Card Thumbnails */}
                        <div className="flex gap-4">
                            {selectedCards.map((card) => (
                                <div key={card.id} className="relative group">
                                    <div className="w-16 h-10 border border-gray-200 rounded bg-white flex items-center justify-center p-1">
                                        <img src={card.image} alt="" className="w-full h-full object-contain" />
                                    </div>
                                    <button 
                                        onClick={() => onRemove(card.id)}
                                        className="absolute -top-2 -right-2 bg-gray-900 text-white rounded-full p-0.5 hover:bg-red-500 transition-colors shadow-sm"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                            
                            {/* Placeholders for empty slots */}
                            {[...Array(3 - selectedCards.length)].map((_, i) => (
                                <div key={i} className="w-16 h-10 border-2 border-dashed border-gray-200 rounded bg-gray-50 hidden sm:flex items-center justify-center text-xs text-gray-400">
                                    Add
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={onClear}
                            className="text-sm font-medium text-gray-500 hover:text-red-600 transition-colors hidden sm:block"
                        >
                            Remove All
                        </button>
                        <button 
                            onClick={onCompareNow}
                            disabled={selectedCards.length < 2}
                            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-lg font-bold text-sm shadow-lg shadow-blue-200 transition-all"
                        >
                            Compare Now {selectedCards.length >= 2 ? '' : `(${2 - selectedCards.length} more)`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
