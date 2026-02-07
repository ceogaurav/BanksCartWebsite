import React from 'react';
import { CreditCard, User, FileText, Tag, Shield, ClipboardList, LogOut, LayoutDashboard, Settings } from 'lucide-react';

interface ProfileSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onLogout: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {

    const mainNav = [
        { id: 'profile', label: 'My Profile', icon: User },
        { id: 'credit-score', label: 'Credit Score', icon: LayoutDashboard },
        { id: 'applications', label: 'My Applications', icon: ClipboardList },
        { id: 'offers', label: 'Pre-Approved Offers', icon: Tag, badge: 'NEW' },
        { id: 'products', label: 'My Products', icon: CreditCard },
    ];

    const supportNav = [
        { id: 'security', label: 'Security Settings', icon: Shield },
        { id: 'support', label: 'Support', icon: Settings },
    ];

    const NavItem = ({ item }: { item: any }) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;

        return (
            <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-6 py-4 transition-all duration-200 group relative border-l-4 ${isActive
                        ? 'bg-blue-50 text-blue-700 border-blue-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600 border-transparent'
                    }`}
            >
                <div className="flex items-center gap-4">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'}`} />
                    <span className={`text-sm tracking-wide ${isActive ? 'font-semibold' : 'font-medium'}`}>{item.label}</span>
                </div>

                {item.badge && (
                    <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mx-2">
                        {item.badge}
                    </span>
                )}
            </button>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white font-sans">
            {/* Main Navigation Group */}
            <div className="py-6 flex-1">
                <div className="px-6 mb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Dashboard
                </div>
                <div className="flex flex-col gap-1">
                    {mainNav.map(item => <NavItem key={item.id} item={item} />)}
                </div>

                <div className="px-6 mt-8 mb-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Account
                </div>
                <div className="flex flex-col gap-1">
                    {supportNav.map(item => <NavItem key={item.id} item={item} />)}
                </div>
            </div>

            {/* Logout Section */}
            <div className="p-4 border-t border-slate-100">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-6 py-3 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200 font-medium text-sm"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                </button>
            </div>
        </div>
    );
};

export default ProfileSidebar;
