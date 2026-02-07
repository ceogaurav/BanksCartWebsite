import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../layouts/DashboardLayout'; // The new Layout
import EmploymentDetails from '../components/profile/EmploymentDetails';
import ProductsList from '../components/profile/ProductsList';
import SecuritySettings from '../components/profile/SecuritySettings';
import ApplicationHistory from '../components/profile/ApplicationHistory';
import OffersCarousel from '../components/profile/OffersCarousel';
import CreditScoreTab from '../components/profile/CreditScoreTab';
import AvatarSelectionModal from '../components/modals/AvatarSelectionModal';
import { useSearchParams, Navigate } from 'react-router-dom';
import { auth, db } from '../config/firebase'; // Import db
import { doc, updateDoc, collection, query, orderBy, limit, getDocs } from 'firebase/firestore'; // Import Firestore functions
import { TrendingUp, ShieldCheck, CreditCard, ChevronRight, Camera, Edit2 } from 'lucide-react';
import HelpCenterFAQ from '../components/common/HelpCenterFAQ';

const Profile: React.FC = () => {
    const { currentUser, userParams, loading, userData } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);

    // Tab state synced with URL, default to 'profile'
    const activeTab = searchParams.get('tab') || 'profile';

    const setActiveTab = (tab: string) => {
        setSearchParams({ tab });
    };

    const handleLogout = () => {
        auth.signOut();
    };

    // Calculate Profile Completion
    const calculateCompletion = () => {
        if (!userData) return 0;
        let score = 0;
        const totalWeight = 100;

        // 1. Basic Details (30%)
        if (userData.fullName) score += 10;
        if (userData.email) score += 10;
        if (userData.mobileNumber) score += 10;

        // 2. Address Details (20%)
        if (userData.addressDetails?.city) score += 10;
        if (userData.addressDetails?.pincode) score += 10;

        // 3. Employment Details (30%)
        if (userData.employmentDetails?.type) score += 10;
        if (userData.employmentDetails?.monthlyIncome || userData.employmentDetails?.turnover) score += 10;
        if (userData.employmentDetails?.employerName || userData.employmentDetails?.businessName) score += 10;

        // 4. Loan Preference (20%)
        if (userData.loanType) score += 20;

        return score;
    };

    const completionPercentage = calculateCompletion();

    // Handle Avatar Selection
    const handleAvatarSelect = async (avatarUrl: string) => {
        if (!currentUser) return;
        try {
            const userRef = doc(db, 'users', currentUser.uid);
            await updateDoc(userRef, {
                photoURL: avatarUrl
            });
            // Ideally strictly update local state or re-fetch, but AuthContext listener handles it eventually
            setIsAvatarModalOpen(false);
            window.location.reload(); // Quick refresh to reflect changes if AuthContext doesn't auto-sync deep shallow 
            // (Actually AuthContext should sync, but for immediate UI feedback we can rely on userData update)
        } catch (error) {
            console.error("Error updating avatar:", error);
            alert("Failed to update profile picture.");
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Loading...</div>;
    if (!currentUser) return <Navigate to="/" />;

    // --- Widget: Credit Score Gauge (Real Data) ---
    const CreditScoreWidget = () => {
        const [report, setReport] = useState<any>(null);

        useEffect(() => {
            const loadReport = async () => {
                if (currentUser) {
                    try {
                        const q = query(
                            collection(db, 'users', currentUser.uid, 'creditReports'),
                            orderBy('timestamp', 'desc'),
                            limit(1)
                        );
                        const querySnapshot = await getDocs(q);
                        if (!querySnapshot.empty) {
                            setReport(querySnapshot.docs[0].data());
                        }
                    } catch (err) {
                        console.log("Could not load credit report for widget:", err);
                    }
                }
            };
            loadReport();
        }, [currentUser]);

        const score = report ? parseInt(report.credit_score || 0) : null;
        const lastUpdated = report?.timestamp
            ? new Date(report.timestamp.seconds * 1000).toLocaleDateString()
            : 'Never';

        // Helper to determine color/label
        const getScoreStatus = (s: number) => {
            if (s >= 750) return { label: 'Excellent', color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-500' };
            if (s >= 700) return { label: 'Good', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-500' };
            if (s >= 650) return { label: 'Average', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-500' };
            return { label: 'Low', color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-500' };
        };

        const status = score ? getScoreStatus(score) : { label: 'Unknown', color: 'text-slate-400', bg: 'bg-slate-50', border: 'border-slate-300' };

        return (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 relative overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Credit Score</h3>
                        <p className="text-sm text-slate-500">Last updated: {lastUpdated}</p>
                    </div>
                    <button
                        onClick={() => setActiveTab('credit-score')}
                        className="text-blue-600 text-sm font-medium hover:underline"
                    >
                        View Report
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center py-4">
                    {score ? (
                        <>
                            {/* Visual Gauge */}
                            <div className="relative w-48 h-24 overflow-hidden mb-2">
                                <div className="absolute top-0 left-0 w-full h-48 rounded-full border-[12px] border-slate-100 border-b-0"></div>
                                {/* Simple rotation logic based on score 300-900 range */}
                                <div
                                    className={`absolute top-0 left-0 w-full h-48 rounded-full border-[12px] ${status.border} border-b-0 border-r-transparent border-l-transparent transition-transform duration-1000`}
                                    style={{ transform: `rotate(${((score - 300) / 600) * 180 - 135}deg)` }}
                                ></div>
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                                    <span className={`text-4xl font-bold ${status.color} tracking-tight`}>{score}</span>
                                </div>
                            </div>
                            <p className={`${status.color} font-medium ${status.bg} px-3 py-1 rounded-full text-xs mt-2`}>{status.label}</p>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-32">
                            <p className="text-slate-400 text-sm mb-3">No score available</p>
                            <button
                                onClick={() => setActiveTab('credit-score')}
                                className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Check Now
                            </button>
                        </div>
                    )}
                </div>

                {score && (
                    <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-sm">
                        <span className="text-slate-500">Next check in: 15 Days</span>
                        <button
                            onClick={() => setActiveTab('credit-score')}
                            className="text-blue-600 flex items-center gap-1 cursor-pointer hover:underline"
                        >
                            Improve <TrendingUp className="w-3 h-3" />
                        </button>
                    </div>
                )}
            </div>
        );
    };

    // --- Widget: Profile Completion ---
    const ProfileCompletionWidget = () => (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center gap-4 mb-4">
                <div className="relative group cursor-pointer" onClick={() => setIsAvatarModalOpen(true)}>
                    {userData?.photoURL ? (
                        <img
                            src={userData.photoURL}
                            alt="Profile"
                            className="h-16 w-16 rounded-full object-cover border-2 border-slate-100 group-hover:border-blue-200 transition-colors"
                        />
                    ) : (
                        <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-2xl font-bold border-2 border-slate-100 group-hover:border-blue-200 transition-colors">
                            {userData?.fullName?.charAt(0) || 'U'}
                        </div>
                    )}

                    {/* Camera Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-6 h-6 text-white" />
                    </div>

                    {/* Edit Badge */}
                    <div className="absolute bottom-0 right-0 bg-white border border-gray-200 p-1 rounded-full shadow-sm text-gray-500">
                        <Edit2 className="w-3 h-3" />
                    </div>
                </div>

                <div>
                    <h3 className="text-base font-bold text-slate-800">{userData?.fullName || 'User'}</h3>
                    <p className="text-xs text-slate-500">{currentUser.email}</p>
                </div>
            </div>

            <div className="mb-2 flex justify-between text-xs font-semibold text-slate-600">
                <span>Profile Completion</span>
                <span className={`${completionPercentage === 100 ? 'text-emerald-600' : 'text-blue-600'}`}>
                    {completionPercentage}%
                </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mb-4">
                <div
                    className={`h-2 rounded-full transition-all duration-1000 ease-out ${completionPercentage === 100 ? 'bg-emerald-500' : 'bg-blue-600'}`}
                    style={{ width: `${completionPercentage}%` }}
                ></div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <ShieldCheck className={`w-4 h-4 ${userData?.mobileNumber ? 'text-emerald-500' : 'text-slate-300'}`} />
                    <span className={userData?.mobileNumber ? 'text-slate-700' : 'text-slate-400'}>Mobile Verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <ShieldCheck className={`w-4 h-4 ${currentUser.emailVerified ? 'text-emerald-500' : 'text-slate-300'}`} />
                    <span className={currentUser.emailVerified ? 'text-slate-700' : 'text-slate-400'}>Email Verified</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                    <CreditCard className={`w-4 h-4 ${userData?.employmentDetails?.type ? 'text-emerald-500' : 'text-slate-300'}`} />
                    <span className={userData?.employmentDetails?.type ? 'text-slate-700' : 'text-slate-400'}>Employment Details</span>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="grid grid-cols-12 gap-6 animate-in fade-in duration-500">
                        {/* Top Row Stats */}
                        <div className="col-span-12 lg:col-span-8">
                            <div className="bg-white rounded-xl border border-slate-200 shadow-sm mb-6">
                                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center rounded-t-xl">
                                    <h2 className="font-bold text-slate-800">Employment & Personal Details</h2>
                                    <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded">Read Only</span>
                                </div>
                                <div className="p-6">
                                    <EmploymentDetails userData={userData} user={currentUser} />
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar Widgets */}
                        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                            <ProfileCompletionWidget />
                            <CreditScoreWidget />

                            {/* Promo Card */}
                            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-6 text-white shadow-md">
                                <h3 className="text-lg font-bold mb-2">Pre-Approved Personal Loan</h3>
                                <p className="text-blue-100 text-sm mb-4">Unlock up to ₹10 Lakhs instantly with minimal documentation.</p>
                                <button
                                    onClick={() => setActiveTab('offers')}
                                    className="w-full bg-white text-blue-700 font-semibold py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors"
                                >
                                    Check Offer
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case 'credit-score':
                return <CreditScoreTab userData={userData} user={currentUser} />;
            case 'offers':
                return <OffersCarousel />;
            case 'applications':
                return <ApplicationHistory userId={currentUser.uid} />;
            case 'products':
                return <ProductsList />;
            case 'security':
                return <SecuritySettings user={currentUser} />;
            case 'support':
                return <HelpCenterFAQ />;
            default:
                return <CreditScoreTab userData={userData} user={currentUser} />;
        }
    };

    return (
        <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout}>
            {/* Page Header */}
            <div className="mb-6 print:hidden">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                    {activeTab === 'profile' ? 'My Dashboard' :
                        activeTab === 'credit-score' ? 'Credit Score Analysis' :
                            activeTab === 'offers' ? 'Exclusive Offers' :
                                activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}
                </h1>
                <p className="text-slate-500 text-sm">Welcome back to your financial overview.</p>
            </div>

            {renderContent()}

            <AvatarSelectionModal
                isOpen={isAvatarModalOpen}
                onClose={() => setIsAvatarModalOpen(false)}
                currentAvatar={userData?.photoURL || ''}
                onSelectAvatar={handleAvatarSelect}
            />
        </DashboardLayout>
    );
};

export default Profile;
