import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

export interface ProductItem {
    icon?: LucideIcon;
    imageSrc?: string; 
    label: string;
    subLabel?: string;
    tag?: string;
    tagColor?: string; 
    onClick: () => void;
}

interface ProductGridProps {
    title: string;
    items: ProductItem[];
    columns?: 3 | 4 | 5 | 6; 
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, items, columns = 6 }) => {
    return (
        <div className="mb-14 font-inter">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2 border-l-4 border-blue-600 pl-3">
                {title}
            </h3>

            <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-${columns} gap-5`}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        onClick={item.onClick}
                        className="group bg-white rounded-2xl border border-slate-100 p-5 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col items-center justify-center text-center h-44 shadow-sm"
                    >
                        {/* Glow Gradient Highlight (Active on Group Hover) */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

                        {/* Custom Tag Badge */}
                        {item.tag && (
                          <span className={`absolute top-2 right-2 text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm border border-slate-50 ${item.tagColor || 'bg-blue-50 text-blue-700'}`}>
                            {item.tag}
                          </span>
                        )}

                        {/* Interactive Image / Lucide Icon Wrapper */}
                        <div className="w-16 h-16 mb-4 flex items-center justify-center transition-all group-hover:scale-110 duration-300">
                          {item.imageSrc ? (
                            <img src={item.imageSrc} alt={item.label} className="w-full h-full object-contain filter group-hover:brightness-105" />
                          ) : item.icon ? (
                            <div className="w-12 h-12 bg-blue-50/50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all shadow-sm">
                              <item.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                            </div>
                          ) : null}
                        </div>

                        {/* Title & Description Typography */}
                        <h4 className="font-extrabold text-slate-800 text-sm group-hover:text-blue-600 transition-colors leading-tight">{item.label}</h4>
                        {item.subLabel ? (
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide mt-1.5">{item.subLabel}</p>
                        ) : (
                          <p className="text-[10px] text-slate-400 font-medium mt-1 leading-snug">Compare & Apply</p>
                        )}

                        {/* Micro-Interaction Hover Indicator */}
                        <div className="absolute bottom-2 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                          <ArrowRight className="w-4 h-4 text-blue-500" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
