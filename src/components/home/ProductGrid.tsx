import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

export interface ProductItem {
    icon?: LucideIcon;
    imageSrc?: string; // NEW: Support for custom images
    label: string;
    subLabel?: string;
    tag?: string;
    tagColor?: string; // e.g., 'bg-green-100 text-green-700'
    onClick: () => void;
}

interface ProductGridProps {
    title: string;
    items: ProductItem[];
    columns?: 3 | 4 | 5 | 6; // Control grid density
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, items, columns = 6 }) => {
    return (
        <div className="mb-12">
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                {title}
            </h3>

            <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-${columns} gap-4`}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        onClick={item.onClick}
                        className="group bg-white rounded-xl border border-slate-100 p-4 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden text-center flex flex-col items-center justify-center h-40"
                    >
                        {/* Tag */}
                        {item.tag && (
                            <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${item.tagColor || 'bg-blue-100 text-blue-700'}`}>
                                {item.tag}
                            </span>
                        )}

                        {/* Icon with hover effect */}
                        <div className="w-16 h-16 mb-4 flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                            {item.imageSrc ? (
                                <img src={item.imageSrc} alt={item.label} className="w-full h-full object-contain drop-shadow-sm" />
                            ) : item.icon ? (
                                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                                    <item.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                                </div>
                            ) : null}
                        </div>

                        {/* Labels */}
                        <h4 className="font-semibold text-slate-700 text-sm group-hover:text-blue-700">{item.label}</h4>
                        {item.subLabel && (
                            <p className="text-xs text-slate-400 mt-1">{item.subLabel}</p>
                        )}

                        {/* Hover Arrow (optional subtle hint) */}
                        <div className="opacity-0 group-hover:opacity-100 absolute bottom-2 transition-opacity">
                            <ArrowRight className="w-3 h-3 text-blue-400" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
