import React from 'react';
import { Filter } from 'lucide-react';

export default function FilterSidebar() {
    const banks = [
        { name: 'HDFC Bank', count: 12 },
        { name: 'SBI Card', count: 8 },
        { name: 'Axis Bank', count: 6 },
        { name: 'ICICI Bank', count: 9 },
        { name: 'IDFC FIRST Bank', count: 4 },
        { name: 'American Express', count: 3 },
    ];

    const categories = [
        { name: 'Lifetime Free', count: '05' },
        { name: 'Travel', count: 18 },
        { name: 'Premium', count: 12 },
        { name: 'Rewards', count: 24 },
        { name: 'Fuel', count: 6 },
        { name: 'Shopping', count: 15 },
    ];

    return (
        <div className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-24 overflow-hidden">

                {/* Header */}
                <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <Filter className="w-4 h-4" /> Filters
                    </h3>
                    <button className="text-xs font-semibold text-blue-600 hover:text-blue-700">Clear All</button>
                </div>

                {/* Banks Filter */}
                <div className="p-5 border-b border-gray-100">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Banks</h4>
                    <div className="space-y-3">
                        {banks.map((bank, i) => (
                            <label key={i} className="flex items-center justify-between cursor-pointer group">
                                <div className="flex items-center gap-3">
                                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                    <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">{bank.name}</span>
                                </div>
                                {/* <span className="text-xs text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded">{bank.count}</span> */}
                            </label>
                        ))}
                        <button className="text-xs font-bold text-blue-600 mt-2 hover:underline">+ Show More</button>
                    </div>
                </div>

                {/* Categories Filter */}
                <div className="p-5">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Categories</h4>
                    <div className="space-y-3">
                        {categories.map((cat, i) => (
                            <label key={i} className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">{cat.name}</span>
                            </label>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
