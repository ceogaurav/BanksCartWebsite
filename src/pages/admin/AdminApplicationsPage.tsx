import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { collection, query, getDocs, orderBy, doc, updateDoc, Timestamp, where } from 'firebase/firestore';
import { FileText, Briefcase, CheckCircle, XCircle, Clock, Search, Filter } from 'lucide-react';

interface Application {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    status: string;
    timestamp: Timestamp;
    type: 'Loan' | 'Partner';
    details: any; // Additional details like loanType, amount, city, etc.
}

interface AdminApplicationsPageProps {
    initialFilter?: string;
}

const AdminApplicationsPage: React.FC<AdminApplicationsPageProps> = ({ initialFilter = 'All' }) => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [filter, setFilter] = useState(initialFilter);
    const [loading, setLoading] = useState(true);

    // Status Update Loading State
    const [updatingId, setUpdatingId] = useState<string | null>(null);

    // Determine appId for Firestore path - fallback to hardcoded or env if not global
    const appId = typeof __app_id !== 'undefined' ? __app_id : import.meta.env.VITE_FIREBASE_PROJECT_ID || 'default-app-id';

    const fetchAll = async () => {
        setLoading(true);
        try {
            const loansRef = collection(db, `artifacts/${appId}/public/data/loanApplications`);
            const partnersRef = collection(db, `artifacts/${appId}/public/data/partnerLeads`);

            const loansSnap = await getDocs(query(loansRef, orderBy('timestamp', 'desc')));
            const partnersSnap = await getDocs(query(partnersRef, orderBy('timestamp', 'desc')));

            const loans = loansSnap.docs.map(d => ({
                id: d.id,
                ...d.data(),
                type: 'Loan',
                details: { loanType: d.data().loanType, amount: d.data().desiredAmount }
            })) as Application[];

            const partners = partnersSnap.docs.map(d => ({
                id: d.id,
                ...d.data(),
                type: 'Partner',
                details: { city: d.data().city, age: d.data().age }
            })) as Application[];

            const all = [...loans, ...partners].sort((a, b) => b.timestamp?.seconds - a.timestamp?.seconds);
            setApplications(all);
        } catch (err) {
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, [appId]);

    const handleStatusUpdate = async (id: string, type: string, newStatus: string) => {
        setUpdatingId(id);
        try {
            const collectionName = type === 'Loan' ? 'loanApplications' : 'partnerLeads';
            const docRef = doc(db, `artifacts/${appId}/public/data/${collectionName}`, id);
            await updateDoc(docRef, { status: newStatus });

            // Optimistic update
            setApplications(prev => prev.map(app =>
                app.id === id ? { ...app, status: newStatus } : app
            ));
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };

    const formatDate = (ts: Timestamp) => ts ? new Date(ts.seconds * 1000).toLocaleDateString() : 'N/A';

    const filteredApps = applications.filter(app => {
        if (filter === 'All') return true;
        return app.type === filter;
    });

    const getStatusBadge = (status: string) => {
        const lower = status.toLowerCase();
        let color = 'bg-gray-100 text-gray-800';
        if (lower.includes('pending') || lower.includes('new')) color = 'bg-yellow-100 text-yellow-800';
        if (lower.includes('approved')) color = 'bg-green-100 text-green-800';
        if (lower.includes('rejected')) color = 'bg-red-100 text-red-800';

        return (
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${color}`}>
                {status}
            </span>
        );
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Applications Management</h1>
                <div className="flex bg-white rounded-lg border p-1">
                    {['All', 'Loan', 'Partner'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${filter === f ? 'bg-slate-900 text-white' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Applicant</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Details</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading applications...</td></tr>
                        ) : filteredApps.length === 0 ? (
                            <tr><td colSpan={6} className="px-6 py-8 text-center text-gray-500">No applications found.</td></tr>
                        ) : (
                            filteredApps.map((app) => (
                                <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{app.fullName}</div>
                                        <div className="text-xs text-gray-500">{app.email}</div>
                                        <div className="text-xs text-gray-500">{app.phoneNumber}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {app.type === 'Loan' ? <FileText className="h-4 w-4 text-blue-500" /> : <Briefcase className="h-4 w-4 text-purple-500" />}
                                            <span className="text-sm text-gray-700 font-medium">{app.type}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {app.type === 'Loan' ? (
                                            <>
                                                <span className="block font-medium">{app.details.loanType}</span>
                                                <span>₹{app.details.amount?.toLocaleString()}</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="block">{app.details.city}</span>
                                                <span>Age: {app.details.age}</span>
                                            </>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {formatDate(app.timestamp)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(app.status)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleStatusUpdate(app.id, app.type, 'Approved')}
                                                disabled={updatingId === app.id}
                                                className="p-1 rounded-full text-green-600 hover:bg-green-100 disabled:opacity-50" title="Approve"
                                            >
                                                <CheckCircle className="h-5 w-5" />
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(app.id, app.type, 'Rejected')}
                                                disabled={updatingId === app.id}
                                                className="p-1 rounded-full text-red-600 hover:bg-red-100 disabled:opacity-50" title="Reject"
                                            >
                                                <XCircle className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminApplicationsPage;
