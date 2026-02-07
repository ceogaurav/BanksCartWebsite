import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs, orderBy, Timestamp } from 'firebase/firestore';
import { FileText, Briefcase, Calendar, CheckCircle, XCircle, Clock, Loader2, AlertCircle } from 'lucide-react';

interface ApplicationHistoryProps {
    userId: string;
}

interface LoanApplication {
    id: string;
    loanType: string;
    desiredAmount: number;
    status: string;
    timestamp: Timestamp;
    [key: string]: any;
}

interface PartnerApplication {
    id: string;
    city: string;
    status: string;
    timestamp: Timestamp;
    [key: string]: any;
}

const ApplicationHistory: React.FC<ApplicationHistoryProps> = ({ userId }) => {
    const [activeTab, setActiveTab] = useState<'loans' | 'partner'>('loans');
    const [loans, setLoans] = useState<LoanApplication[]>([]);
    const [partners, setPartners] = useState<PartnerApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const appId = import.meta.env.VITE_FIREBASE_PROJECT_ID || 'default-app-id';

    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            setError('');
            try {
                // Fetch Loans
                const loansRef = collection(db, `artifacts/${appId}/public/data/loanApplications`);
                const loansQuery = query(loansRef, where("userId", "==", userId), orderBy("timestamp", "desc"));
                const loansSnapshot = await getDocs(loansQuery);
                const loansData = loansSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as LoanApplication));
                setLoans(loansData);

                // Fetch Partner Apps
                const partnersRef = collection(db, `artifacts/${appId}/public/data/partnerLeads`);
                const partnersQuery = query(partnersRef, where("userId", "==", userId), orderBy("timestamp", "desc"));
                const partnersSnapshot = await getDocs(partnersQuery);
                const partnersData = partnersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as PartnerApplication));
                setPartners(partnersData);

            } catch (err) {
                console.error("Error fetching applications:", err);
                // Fallback for index errors (if composite index missing, though simple queries usually work)
                setError("Could not load applications. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchApplications();
        }
    }, [userId, appId]);

    const getStatusColor = (status: string) => {
        const lower = status.toLowerCase();
        if (lower.includes('approved')) return 'bg-green-100 text-green-700';
        if (lower.includes('rejected') || lower.includes('declined')) return 'bg-red-100 text-red-700';
        return 'bg-yellow-100 text-yellow-700';
    };

    const getStatusIcon = (status: string) => {
        const lower = status.toLowerCase();
        if (lower.includes('approved')) return <CheckCircle className="h-4 w-4" />;
        if (lower.includes('rejected') || lower.includes('declined')) return <XCircle className="h-4 w-4" />;
        return <Clock className="h-4 w-4" />;
    };

    const formatDate = (timestamp: Timestamp) => {
        if (!timestamp) return 'N/A';
        return new Date(timestamp.seconds * 1000).toLocaleDateString();
    };

    const renderEmptyState = (type: string) => (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <div className="mx-auto h-12 w-12 text-gray-400 mb-3 bg-white rounded-full flex items-center justify-center shadow-sm">
                {type === 'loans' ? <FileText className="h-6 w-6" /> : <Briefcase className="h-6 w-6" />}
            </div>
            <h3 className="text-lg font-medium text-gray-900">No {type === 'loans' ? 'Loan' : 'Partner'} Applications</h3>
            <p className="text-gray-500 text-sm mt-1">You haven't submitted any {type === 'loans' ? 'loan' : 'partner'} applications yet.</p>
        </div>
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                {error}
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('loans')}
                    className={`pb-3 px-4 text-sm font-medium transition-colors relative ${activeTab === 'loans' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <FileText className="inline-block w-4 h-4 mr-2" />
                    Loan Applications
                    {activeTab === 'loans' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full"></div>}
                </button>
                <button
                    onClick={() => setActiveTab('partner')}
                    className={`pb-3 px-4 text-sm font-medium transition-colors relative ${activeTab === 'partner' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Briefcase className="inline-block w-4 h-4 mr-2" />
                    Partner Applications
                    {activeTab === 'partner' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full"></div>}
                </button>
            </div>

            <div className="space-y-4">
                {activeTab === 'loans' ? (
                    loans.length > 0 ? (
                        loans.map((app) => (
                            <div key={app.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">{app.loanType}</h4>
                                        <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                                            <Calendar className="h-3.5 w-3.5" /> Applied on {formatDate(app.timestamp)}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${getStatusColor(app.status)}`}>
                                        {getStatusIcon(app.status)}
                                        {app.status}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg">
                                    <span className="text-gray-600">Desired Amount:</span>
                                    <span className="font-semibold text-gray-900">₹{app.desiredAmount?.toLocaleString()}</span>
                                </div>
                            </div>
                        ))
                    ) : renderEmptyState('loans')
                ) : (
                    partners.length > 0 ? (
                        partners.map((app) => (
                            <div key={app.id} className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-lg">Partner Application</h4>
                                        <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                                            <Calendar className="h-3.5 w-3.5" /> Applied on {formatDate(app.timestamp)}
                                        </p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${getStatusColor(app.status)}`}>
                                        {getStatusIcon(app.status)}
                                        {app.status}
                                    </span>
                                </div>
                                <div className="grid grid-cols-2 gap-3 text-sm bg-gray-50 p-3 rounded-lg">
                                    <div>
                                        <span className="block text-gray-500 text-xs">City</span>
                                        <span className="font-medium text-gray-900">{app.city}</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500 text-xs">Full Name</span>
                                        <span className="font-medium text-gray-900">{app.fullName}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : renderEmptyState('partner')
                )}
            </div>
        </div>
    );
};

export default ApplicationHistory;
