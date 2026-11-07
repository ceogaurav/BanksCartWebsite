import React from 'react';
import { LucideIcon, ArrowRight } from 'lucide-react';

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
    <div className="mb-12 font-ibm">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2 border-l-4 border-slate-900 pl-3">
          {title}
        </h3>
      </div>

      <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-${columns} gap-4`}>
        {items.map((item, index) => (
          <div
            key={index}
            onClick={item.onClick}
            className="group bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 active:scale-[0.99] transition-all duration-200 cursor-pointer relative flex flex-col items-center justify-between text-center min-h-[150px]"
          >
            {/* Tag Badge */}
            {item.tag && (
              <span className={`absolute top-2 right-2 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${item.tagColor || 'bg-slate-100 text-slate-800'}`}>
                {item.tag}
              </span>
            )}

            {/* Icon / Image */}
            <div className="w-12 h-12 my-2 flex items-center justify-center transition-transform group-hover:scale-105 duration-200">
              {item.imageSrc ? (
                <img
                  src={item.imageSrc}
                  alt={item.label}
                  width="48"
                  height="48"
                  loading="lazy"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              ) : item.icon ? (
                <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-900 transition-colors">
                  <item.icon className="w-5 h-5 text-slate-700 group-hover:text-white transition-colors" />
                </div>
              ) : null}
            </div>

            {/* Title & Description */}
            <div className="w-full">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-blue-900 transition-colors leading-snug">
                {item.label}
              </h4>
              <p className="text-[11px] text-slate-500 font-medium mt-1 leading-snug">
                {item.subLabel || 'Compare & Apply'}
              </p>
            </div>

            {/* Hover Indicator */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity mt-1">
              <ArrowRight className="w-3.5 h-3.5 text-slate-700" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
