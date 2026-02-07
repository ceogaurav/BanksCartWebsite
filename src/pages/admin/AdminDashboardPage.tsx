import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { collection, getCountFromServer, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { 
    Users, FileText, Briefcase, TrendingUp, 
    ArrowRight, Activity, Clock, CheckCircle, XCircle, ChevronRight, Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Declare global variable to fix TS error
declare const __app_id: string;

interface RecentLoan {
    id: string;
    fullName: string;
    loanType: string;
    desiredAmount: number;
    status: string;
    timestamp: any;
}

const AdminDashboardPage: React.FC = () => {
    const [stats, setStats] = useState({
        users: 0,
        loans: 0,
        partners: 0,
        pendingLoans: 0
    });
    const [recentLoans, setRecentLoans] = useState<RecentLoan[]>([]);
    const [loading, setLoading] = useState(true);

    // Determine appId for Firestore path
    const appId = typeof __app_id !== 'undefined' ? __app_id : import.meta.env.VITE_FIREBASE_PROJECT_ID || 'default-app-id';

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            
            // --- PART 1: FETCH COUNTS (STATS) ---
            try {
                // 1. Define Paths
                const usersRef = collection(db, 'users');
                const loansPath = `artifacts/${appId}/public/data/loanApplications`;
                const partnersPath = `artifacts/${appId}/public/data/partnerLeads`;
                
                const loansRef = collection(db, loansPath);
                const partnersRef = collection(db, partnersPath);

                console.log(`[AdminDash] Fetching from: ${loansPath}`);

                // 2. Fetch Counts Independently (So one failure doesn't stop others)
                let userCount = 0;
                let loanCount = 0;
                let partnerCount = 0;
                let pendingCount = 0;

                // Users Count Strategy
                try {
                    const snap = await getCountFromServer(usersRef);
                    userCount = snap.data().count;
                } catch (e) {
                    console.warn("[AdminDash] Main 'users' count failed. Trying fallback...");
                    // Fallback: Count CIBIL checks as proxy for users
                    try {
                        const fallbackRef = collection(db, `artifacts/${appId}/public/data/cibilScoreChecks`);
                        const fallbackSnap = await getCountFromServer(fallbackRef);
                        userCount = fallbackSnap.data().count;
                    } catch (e2) { console.error("User count failed completely."); }
                }

                // Loans Count
                try {
                    const snap = await getCountFromServer(loansRef);
                    loanCount = snap.data().count;
                } catch (e) { console.error("Loan count failed:", e); }

                // Partners Count
                try {
                    const snap = await getCountFromServer(partnersRef);
                    partnerCount = snap.data().count;
                } catch (e) { console.error("Partner count failed:", e); }

                // Pending Count
                try {
                    const q = query(loansRef, where("status", "==", "Pending"));
                    const snap = await getCountFromServer(q);
                    pendingCount = snap.data().count;
                } catch (e) { console.error("Pending count failed:", e); }

                setStats({
                    users: userCount,
                    loans: loanCount,
                    partners: partnerCount,
                    pendingLoans: pendingCount
                });

            } catch (err) {
                console.error("Critical error fetching stats:", err);
            }

            // --- PART 2: FETCH RECENT LOANS (SEPARATE TRY/CATCH) ---
            // This often fails if Index is missing, so we isolate it.
            try {
                const loansRef = collection(db, `artifacts/${appId}/public/data/loanApplications`);
                
                // Try with sorting first
                try {
                    const recentQuery = query(loansRef, orderBy("timestamp", "desc"), limit(5));
                    const recentDocs = await getDocs(recentQuery);
                    const recentData = recentDocs.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })) as RecentLoan[];
                    setRecentLoans(recentData);
                } catch (indexError: any) {
                    // Check for "Missing Index" error
                    if (indexError.code === 'failed-precondition') {
                        console.warn("[AdminDash] Missing Index for orderBy. Fetching unsorted as fallback.");
                        console.warn("Create Index Link:", indexError.message); 
                    }
                    
                    // Fallback: Fetch without sort (might not be perfectly recent, but shows data)
                    const fallbackQuery = query(loansRef, limit(5));
                    const fallbackDocs = await getDocs(fallbackQuery);
                    const fallbackData = fallbackDocs.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    })) as RecentLoan[];
                    setRecentLoans(fallbackData);
                }

            } catch (err) {
                console.error("Error fetching recent loans:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [appId]);

    const statCards = [
        { title: "Total Users", count: stats.users, icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { title: "Total Loan Apps", count: stats.loans, icon: FileText, color: "text-indigo-600", bg: "bg-indigo-50" },
        { title: "Partner Leads", count: stats.partners, icon: Briefcase, color: "text-purple-600", bg: "bg-purple-50" },
        { title: "Pending Review", count: stats.pendingLoans, icon: Activity, color: "text-orange-600", bg: "bg-orange-50" },
    ];

    const getStatusBadge = (status: string) => {
        const s = (status || 'pending').toLowerCase();
        if (s.includes('approv') || s === 'success') return <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700"><CheckCircle className="w-3 h-3" /> Approved</span>;
        if (s.includes('reject') || s === 'fail') return <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700"><XCircle className="w-3 h-3" /> Rejected</span>;
        return <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"><Clock className="w-3 h-3" /> Pending</span>;
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <div className="text-sm text-gray-400 bg-white px-3 py-1 rounded-md border border-gray-200 shadow-sm">
                    Last updated: {new Date().toLocaleTimeString()}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-start justify-between hover:shadow-md transition-all">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">{item.title}</p>
                            {loading ? (
                                <div className="h-8 w-16 bg-gray-100 animate-pulse rounded"></div>
                            ) : (
                                <h3 className="text-3xl font-bold text-gray-900">{item.count}</h3>
                            )}
                        </div>
                        <div className={`p-3 rounded-lg ${item.bg}`}>
                            <item.icon className={`h-6 w-6 ${item.color}`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Content Area: Split View */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Left Column: Recent Activity (Takes up 2/3 width) */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50/50">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-blue-600" />
                            Recent Loan Applications
                        </h3>
                        <Link to="/admin/applications" className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                            View All <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    
                    <div className="flex-1 overflow-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-gray-50 text-gray-500 font-medium">
                                <tr>
                                    <th className="px-6 py-3">Applicant</th>
                                    <th className="px-6 py-3">Loan Type</th>
                                    <th className="px-6 py-3">Amount</th>
                                    <th className="px-6 py-3">Status</th>
                                    <th className="px-6 py-3 text-right">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i}><td colSpan={5} className="px-6 py-4"><div className="h-4 bg-gray-100 rounded w-full animate-pulse"></div></td></tr>
                                    ))
                                ) : recentLoans.length === 0 ? (
                                    <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">No recent activity found.</td></tr>
                                ) : (
                                    recentLoans.map((loan) => (
                                        <tr key={loan.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-gray-900">{loan.fullName || 'Unknown'}</td>
                                            <td className="px-6 py-4 text-gray-600">{loan.loanType || 'Personal Loan'}</td>
                                            <td className="px-6 py-4 font-mono">₹{(loan.desiredAmount || 0).toLocaleString('en-IN')}</td>
                                            <td className="px-6 py-4">{getStatusBadge(loan.status)}</td>
                                            <td className="px-6 py-4 text-right text-gray-500">
                                                {loan.timestamp?.seconds 
                                                    ? new Date(loan.timestamp.seconds * 1000).toLocaleDateString('en-IN', {day:'numeric', month:'short'}) 
                                                    : 'Just now'}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Right Column: Quick Actions & System Status (Takes up 1/3 width) */}
                <div className="space-y-6">
                    
                    {/* Quick Actions Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
                        <div className="space-y-3">
                            <Link to="/admin/applications" className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg group-hover:bg-blue-200"><FileText className="h-4 w-4" /></div>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Review Pending Loans</span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500" />
                            </Link>
                            <Link to="/admin/users" className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group">
                                <div className="flex items-center gap-3">
                                    <div className="bg-purple-100 text-purple-600 p-2 rounded-lg group-hover:bg-purple-200"><Users className="h-4 w-4" /></div>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">Manage Users</span>
                                </div>
                                <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-purple-500" />
                            </Link>
                            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all group cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 text-green-600 p-2 rounded-lg group-hover:bg-green-200"><Briefcase className="h-4 w-4" /></div>
                                    <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">Export Partner Leads</span>
                                </div>
                                <DownloadIcon />
                            </div>
                        </div>
                    </div>

                    {/* System Health / Info Card */}
                    <div className="bg-slate-800 rounded-xl shadow-sm p-6 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="font-bold flex items-center gap-2 mb-2">
                                <Shield className="h-5 w-5 text-green-400" /> System Status
                            </h3>
                            <p className="text-slate-300 text-sm mb-4">All systems operational. Firestore connection active.</p>
                            <div className="flex items-center gap-2 text-xs bg-slate-700 w-fit px-3 py-1 rounded-full text-green-400">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                Live
                            </div>
                        </div>
                        {/* Decorative Background Element */}
                        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-slate-700 rounded-full opacity-50 blur-xl"></div>
                    </div>

                </div>
            </div>
        </div>
    );
};

// Simple helper for the download icon to keep code clean
const DownloadIcon = () => (
    <svg className="h-4 w-4 text-gray-400 group-hover:text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

export default AdminDashboardPage;
