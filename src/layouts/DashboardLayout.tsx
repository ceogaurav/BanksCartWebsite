import React, { useState } from 'react';
import Header from '../components/common/Header';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import PartnerApplicationModal from '../components/modals/PartnerApplicationModal';
import CibilScoreCheckModal from '../components/modals/CibilScoreCheckModal';
import LoanApplicationModal from '../components/common/LoanApplicationModal';
import { Menu, X } from 'lucide-react';

interface DashboardLayoutProps {
    children: React.ReactNode;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    onLogout: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, activeTab, setActiveTab, onLogout }) => {
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

    // Modal States
    const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
    const [isCibilModalOpen, setIsCibilModalOpen] = useState(false);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [selectedLoanType, setSelectedLoanType] = useState<string | undefined>(undefined);

    const openApplyModal = (loanType?: string) => {
        setSelectedLoanType(loanType);
        setIsApplyModalOpen(true);
    };

    const handleMobileTabSelect = (tab: string) => {
        setActiveTab(tab);
        setIsMobileSidebarOpen(false);
    }

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
            {/* Sticky Header (z-50) */}
            <div className="fixed top-0 left-0 right-0 z-50 print:hidden">
                <Header
                    openApplyModal={openApplyModal}
                    openEligibilityModal={() => setIsCibilModalOpen(true)}
                    openPartnerModal={() => setIsPartnerModalOpen(true)}
                />
            </div>

            {/* Fixed Sidebar (z-40) - Desktop */}
            <div className="fixed top-16 left-0 bottom-0 w-72 bg-white border-r border-slate-200 z-40 hidden lg:block overflow-y-auto print:hidden">
                <ProfileSidebar
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onLogout={onLogout}
                />
            </div>

            {/* Mobile Sidebar Overlay & Drawer */}
            {isMobileSidebarOpen && (
                <div className="fixed inset-0 z-[60] lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                        onClick={() => setIsMobileSidebarOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="absolute top-0 left-0 bottom-0 w-3/4 max-w-xs bg-white shadow-2xl transform transition-transform duration-300 ease-out">
                        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                            <span className="font-bold text-lg text-slate-800">Dashboard Menu</span>
                            <button
                                onClick={() => setIsMobileSidebarOpen(false)}
                                className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="overflow-y-auto h-full pb-20">
                            <ProfileSidebar
                                activeTab={activeTab}
                                setActiveTab={handleMobileTabSelect}
                                onLogout={onLogout}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <main className="min-h-screen pt-20 lg:pl-72 transition-all duration-300">
                <div className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto">
                    {/* Mobile Sidebar Toggle */}
                    <div className="lg:hidden mb-4 flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100 print:hidden">
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsMobileSidebarOpen(true)}
                                className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                            <span className="font-semibold text-slate-700 capitalize">
                                {activeTab === 'profile' ? 'Dashboard' : activeTab.replace('-', ' ')}
                            </span>
                        </div>
                    </div>

                    {children}
                </div>
            </main>

            {/* Modals */}
            <PartnerApplicationModal
                isOpen={isPartnerModalOpen}
                onClose={() => setIsPartnerModalOpen(false)}
            />
            <CibilScoreCheckModal
                isOpen={isCibilModalOpen}
                onClose={() => setIsCibilModalOpen(false)}
            />
            {/* Assuming LoanApplicationModal exists and follows similar pattern, included for openApplyModal compliance */}
            {/* If LoanApplicationModal is not used by the current Header buttons explicitly, it's still good to have connected for the nav items if they use it later */}
            <LoanApplicationModal
                isOpen={isApplyModalOpen}
                onClose={() => setIsApplyModalOpen(false)}
                initialLoanType={selectedLoanType}
            />
        </div>
    );
};

export default DashboardLayout;
