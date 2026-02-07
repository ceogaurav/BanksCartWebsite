import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Search, Shield, Eye, Mail, Phone, Download } from 'lucide-react';
import CreditReportModal from '../../components/admin/CreditReportModal';

// Declare global variable to fix TS error
declare const __app_id: string;

interface UserData {
    id: string;
    fullName?: string;
    email?: string;
    mobileNumber?: string;
    phoneNumber?: string; // Handle both key variations
    dob?: string;
    panNumber?: string;
    credit_score?: string;
    credit_report?: any;
    createdAt?: any; // Can be Firestore Timestamp or string
    timestamp?: any; // Fallback timestamp field
}

const AdminUsersPage: React.FC = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    // Determines collection path
    const appId = typeof __app_id !== 'undefined' ? __app_id : import.meta.env.VITE_FIREBASE_PROJECT_ID || 'default-app-id';

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            let fetchedUsers: UserData[] = [];

            // Attempt 1: Try fetching from 'users' collection (Main DB)
            try {
                const usersRef = collection(db, 'users');
                const userSnapshot = await getDocs(usersRef);
                fetchedUsers = userSnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        ...data,
                        // Normalize fields
                        fullName: data.fullName || data.full_name || data.name || 'Unknown User',
                        mobileNumber: data.mobileNumber || data.phoneNumber || data.mobile || data.phone || '',
                        email: data.email || '',
                        createdAt: data.createdAt || data.timestamp // Ensure we capture the date
                    } as UserData;
                });
            } catch (err) {
                console.warn("Main 'users' access denied. Switching to fallback...");
            }

            // Attempt 2: Fallback to 'cibilScoreChecks' (Admin Accessible Dual-Write)
            if (fetchedUsers.length === 0) {
                try {
                    const cibilRef = collection(db, `artifacts/${appId}/public/data/cibilScoreChecks`);
                    const cibilSnap = await getDocs(cibilRef);
                    
                    const cibilUsers = cibilSnap.docs.map(doc => {
                        const data = doc.data();
                        
                        // --- ROBUST DATA MAPPING ---
                        let name = data.fullName || data.full_name || data.name;
                        let email = data.email || data.email_address;
                        let phone = data.mobileNumber || data.mobile_number || data.phoneNumber || data.phone;
                        let pan = data.panNumber || data.pan_number || data.pan;

                        // Try Extracting from Deep Nested Report (Fallback)
                        if (!name && data.credit_report) {
                            try {
                                const cirData = data.credit_report?.CCRResponse?.CIRReportDataLst?.[0]?.CIRReportData;
                                const personalInfo = cirData?.IDAndContactInfo?.PersonalInfo;
                                const identityInfo = cirData?.IDAndContactInfo?.IdentityInfo;
                                
                                if (personalInfo?.Name?.FullName) name = personalInfo.Name.FullName;
                                if (identityInfo?.PANId?.[0]?.IdNumber) pan = identityInfo.PANId[0].IdNumber;
                            } catch (e) { /* Ignore parsing errors */ }
                        }

                        return {
                            id: doc.id,
                            ...data,
                            fullName: name || 'Report User',
                            email: email || 'No Email',
                            mobileNumber: phone || '',
                            panNumber: pan || '',
                            credit_score: data.credit_score || data.score || '0',
                            createdAt: data.timestamp || data.createdAt // Prioritize timestamp for sorting
                        } as UserData;
                    });

                    fetchedUsers = cibilUsers;
                } catch (err) {
                    console.error("Error fetching fallback users:", err);
                }
            }

            // --- SORTING: Recent Users First ---
            fetchedUsers.sort((a, b) => {
                const getDate = (d: any) => {
                    if (!d) return 0;
                    if (d.seconds) return d.seconds * 1000; // Firestore Timestamp
                    return new Date(d).getTime(); // Date string or object
                };
                return getDate(b.createdAt) - getDate(a.createdAt);
            });

            setUsers(fetchedUsers);
            setLoading(false);
        };

        fetchUsers();
    }, [appId]);

    const handleViewReport = (user: UserData) => {
        setSelectedUser(user);
        setIsReportModalOpen(true);
    };

    // Filter users
    const filteredUsers = users.filter(user =>
        (user.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (user.mobileNumber || '').includes(searchTerm) ||
        (user.panNumber || '').toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Export Functionality
    const handleExport = () => {
        // Define Headers
        const headers = ["User ID", "Full Name", "Email", "Phone Number", "PAN Number", "Credit Score", "Joined Date"];
        
        // Convert Users to CSV Rows
        const rows = filteredUsers.map(user => {
            const dateObj = user.createdAt?.seconds 
                ? new Date(user.createdAt.seconds * 1000) 
                : (user.createdAt ? new Date(user.createdAt) : null);
            
            const dateStr = dateObj ? dateObj.toLocaleDateString() : 'N/A';

            return [
                user.id,
                `"${user.fullName || ''}"`, // Wrap in quotes to handle commas in names
                user.email || '',
                `'${user.mobileNumber || ''}`, // Add tick to force excel to read as string
                user.panNumber || '',
                user.credit_score || 'N/A',
                dateStr
            ].join(",");
        });

        // Combine Header and Rows
        const csvContent = [headers.join(","), ...rows].join("\n");

        // Create Blob and Link
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `bankscart_users_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Mock Score Generation
    const getMockScore = (name: string = '') => {
        const base = 700;
        const variance = (name.length * 7) % 150;
        return base + variance;
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-500 text-sm">View all registered users and access credit reports.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={handleExport}
                        className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-sm font-medium"
                    >
                        <Download className="h-4 w-4" />
                        Export CSV
                    </button>

                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 shadow-sm"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">User Details</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact Info</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">KYC Status (PAN)</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Credit Health</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading users...</td></tr>
                        ) : filteredUsers.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No users found.</td></tr>
                        ) : (
                            filteredUsers.map((user) => {
                                // Use real score if available, else mock
                                const score = user.credit_score ? parseInt(user.credit_score) : getMockScore(user.fullName);
                                const dateObj = user.createdAt?.seconds 
                                    ? new Date(user.createdAt.seconds * 1000) 
                                    : (user.createdAt ? new Date(user.createdAt) : null);

                                return (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                                                    {user.fullName?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">{user.fullName}</div>
                                                    <div className="text-xs text-gray-500">
                                                        {dateObj ? `Joined: ${dateObj.toLocaleDateString()}` : `ID: ${user.id.substring(0, 6)}...`}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Mail className="h-3.5 w-3.5" />
                                                    {user.email}
                                                </div>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Phone className="h-3.5 w-3.5" />
                                                    {user.mobileNumber || 'No Phone'}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.panNumber ? (
                                                <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-mono rounded border border-blue-100">
                                                    {user.panNumber}
                                                </span>
                                            ) : (
                                                <span className="text-gray-400 text-xs italic">Not Provided</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Shield className={`h-4 w-4 ${score >= 750 ? 'text-green-500' : 'text-yellow-500'}`} />
                                                <span className="font-bold text-gray-700">{score}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => handleViewReport(user)}
                                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors text-sm font-medium"
                                            >
                                                <Eye className="h-4 w-4" />
                                                View Report
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>

            {/* Credit Report Modal */}
            <CreditReportModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                userData={selectedUser}
                // Use real score if available, otherwise mock
                score={selectedUser?.credit_score ? parseInt(selectedUser.credit_score) : (selectedUser ? getMockScore(selectedUser.fullName) : 0)}
                // Pass the full user object as apiData since we merged the report into it
                apiData={selectedUser}
            />
        </div>
    );
};

export default AdminUsersPage;
