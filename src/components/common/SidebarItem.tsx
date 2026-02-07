import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
    id: string;
    label: string;
    icon: LucideIcon;
    isActive: boolean;
    onClick: () => void;
    badge?: number | string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ id, label, icon: Icon, isActive, onClick, badge }) => {
    return (
        <button
            onClick={onClick}
            className={`group relative w-full flex items-center justify-between px-4 py-3.5 mb-2 rounded-lg transition-all duration-200 ${isActive
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
        >
            {/* Active Background Indicator is handled by bg-blue-50 on the container */}

            <div className="flex items-center gap-3.5">
                <Icon className={`w-5 h-5 transition-colors duration-200 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-900'}`} />
                <span className={`text-sm tracking-wide transition-colors ${isActive ? 'font-medium' : 'font-normal'}`}>{label}</span>
            </div>

            {badge && (
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full transition-colors ${isActive ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200 group-hover:text-gray-700'
                    }`}>
                    {badge}
                </span>
            )}
        </button>
    );
};

export default SidebarItem;
