import React from 'react';
import { CreditCard, User, Briefcase, FolderLock, Shield, ClipboardList, LogOut, LayoutDashboard, Sparkles, HelpCircle, LucideIcon } from 'lucide-react';

interface NavItemData {
    id: string;
    label: string;
    icon: LucideIcon;
    badge?: string;
}

interface ProfileSidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onLogout: () => void;
}

const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {

    const mainNav: NavItemData[] = [
        { id: 'profile', label: 'Profile Overview', icon: User },
        { id: 'employment', label: 'Employment & Income', icon: Briefcase },
        { id: 'documents', label: 'KYC Document Locker', icon: FolderLock, badge: 'SECURE' },
        { id: 'applications', label: 'My Applications', icon: ClipboardList },
        { id: 'credit-score', label: 'Credit Health', icon: LayoutDashboard },
        { id: 'offers', label: 'Pre-Approved Offers', icon: Sparkles, badge: 'NEW' },
        { id: 'products', label: 'My Products', icon: CreditCard },
    ];

    const supportNav: NavItemData[] = [
        { id: 'security', label: 'Security & Privacy', icon: Shield },
        { id: 'support', label: 'Help & Concierge', icon: HelpCircle },
    ];

    const NavItem = ({ item }: { item: NavItemData }) => {
        const isActive = activeTab === item.id;
        const Icon = item.icon;

        return (
            <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-5 py-3.5 transition-all duration-200 group relative border-l-4 ${isActive
                        ? 'bg-blue-50 text-[#1E3A8A] border-[#1E3A8A] font-semibold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-transparent font-medium'
                    }`}
            >
                <div className="flex items-center gap-3.5">
                    <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#1E3A8A]' : 'text-slate-400 group-hover:text-slate-700'}`} />
                    <span className="text-sm tracking-tight text-left">{item.label}</span>
                </div>

                {item.badge && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider mx-1 ${
                        item.badge === 'SECURE'
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                        {item.badge}
                    </span>
                )}
            </button>
        );
    }

    return (
        <div className="flex flex-col h-full bg-white font-ibm">
            {/* Header info badge */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Financial Portal</span>
                    <span className="text-xs font-semibold text-slate-900 flex items-center gap-1.5 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        256-Bit Encrypted
                    </span>
                </div>
                <span className="text-[10px] bg-slate-100 text-slate-600 font-mono px-2 py-0.5 rounded border border-slate-200">
                    RBI DPDP
                </span>
            </div>

            {/* Main Navigation Group */}
            <div className="py-4 flex-1 overflow-y-auto">
                <div className="px-5 mb-2.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Financial Hub
                </div>
                <div className="flex flex-col gap-0.5">
                    {mainNav.map(item => <NavItem key={item.id} item={item} />)}
                </div>

                <div className="px-5 mt-6 mb-2.5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Account & Support
                </div>
                <div className="flex flex-col gap-0.5">
                    {supportNav.map(item => <NavItem key={item.id} item={item} />)}
                </div>
            </div>

            {/* Logout Section */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-slate-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors duration-200 font-medium text-sm group"
                >
                    <LogOut className="w-4 h-4 text-slate-400 group-hover:text-red-600 transition-colors" />
                    <span>Sign Out Securely</span>
                </button>
            </div>
        </div>
    );
};

export default ProfileSidebar;
