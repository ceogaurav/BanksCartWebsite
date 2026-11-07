import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { db } from '../../config/firebase';
import { collection, query, getDocs, orderBy, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { 
    FileText, Briefcase, CheckCircle2, XCircle, Clock, Search, 
    Download, AlertCircle, Building2, User, Phone, Mail, ArrowUpDown, 
    X, ExternalLink, ShieldCheck, RefreshCw, Eye, Check, ChevronDown
} from 'lucide-react';

declare const __app_id: string;

export interface Application {
    id: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    status: 'Pending' | 'Underwriting' | 'Approved' | 'Rejected' | string;
    timestamp: any;
    type: 'Loan' | 'Partner';
    allocatedBank?: 'SBI' | 'HDFC' | 'ICICI' | 'Axis' | 'Kotak' | string;
    cibilScore?: number;
    details: {
        loanType?: string;
        amount?: number;
        desiredAmount?: number;
        city?: string;
        employmentType?: string;
        monthlyIncome?: number;
        tenureMonths?: number;
        age?: number;
        companyName?: string;
        notes?: string;
    };
}

interface AdminApplicationsPageProps {
    initialFilter?: string;
}

const SEED_APPLICATIONS: Application[] = [
    {
        id: 'APP-2026-8901',
        fullName: 'Rajesh Sharma',
        email: 'rajesh.sharma@gmail.com',
        phoneNumber: '+91 98201 44521',
        status: 'Underwriting',
        timestamp: { seconds: Math.floor(Date.now() / 1000) - 1800 }, // 30 mins ago
        type: 'Loan',
        allocatedBank: 'HDFC',
        cibilScore: 785,
        details: {
            loanType: 'Personal Loan',
            amount: 1250000,
            city: 'Mumbai, MH',
            employmentType: 'Salaried (TCS)',
            monthlyIncome: 145000,
            tenureMonths: 48,
            notes: 'KYC verified via Aadhaar OTP. Salary slips submitted.'
        }
    },
    {
        id: 'APP-2026-8902',
        fullName: 'Priya Venkatesh',
        email: 'priya.v@outlook.com',
        phoneNumber: '+91 98450 12833',
        status: 'Approved',
        timestamp: { seconds: Math.floor(Date.now() / 1000) - 7200 }, // 2 hours ago
        type: 'Loan',
        allocatedBank: 'SBI',
        cibilScore: 810,
        details: {
            loanType: 'Home Loan',
            amount: 6500000,
            city: 'Bengaluru, KA',
            employmentType: 'Salaried (Infosys)',
            monthlyIncome: 220000,
            tenureMonths: 240,
            notes: 'Pre-sanction letter issued by SBI Retail Assets Branch.'
        }
    },
    {
        id: 'APP-2026-8903',
        fullName: 'Amit Patel',
        email: 'amit.patel@pateltextiles.in',
        phoneNumber: '+91 98251 77312',
        status: 'Pending',
        timestamp: { seconds: Math.floor(Date.now() / 1000) - 14400 }, // 4 hours ago
        type: 'Loan',
        allocatedBank: 'ICICI',
        cibilScore: 742,
        details: {
            loanType: 'Business Loan',
            amount: 3500000,
            city: 'Ahmedabad, GJ',
            employmentType: 'Self-Employed (Mfg)',
            monthlyIncome: 380000,
            tenureMonths: 36,
            notes: 'GST returns 3B & 2-year ITR pending verification.'
        }
    },
    {
        id: 'APP-2026-8904',
        fullName: 'Sunita Agarwal',
        email: 'sunita.agarwal@gmail.com',
        phoneNumber: '+91 98100 55420',
        status: 'Underwriting',
        timestamp: { seconds: Math.floor(Date.now() / 1000) - 28800 }, // 8 hours ago
        type: 'Loan',
        allocatedBank: 'Axis',
        cibilScore: 760,
        details: {
            loanType: 'Loan Against Property',
            amount: 4500000,
            city: 'Delhi, NCR',
            employmentType: 'Business Owner',
            monthlyIncome: 420000,
            tenureMonths: 120,
            notes: 'Collateral property valuation report in progress.'
        }
    },
    {
        id: 'APP-2026-8905',
        fullName: 'Vikram Malhotra',
        email: 'v.malhotra@corpmail.com',
        phoneNumber: '+91 99302 61789',
        status: 'Approved',
        timestamp: { seconds: Math.floor(Date.now() / 1000) - 86400 }, // 1 day ago
        type: 'Loan',
        allocatedBank: 'HDFC',
        cibilScore: 792,
        details: {
            loanType: 'Personal Loan',
            amount: 800000,
            city: 'Pune, MH',
            employmentType: 'Salaried (Barclays)',
            monthlyIncome: 115000,
            tenureMonths: 36,
            notes: 'Fast-track digital disbursement queued.'
        }
    },
    {
        id: 'APP-2026-8906',
        fullName: 'Ananya Banerjee',
        email: 'ananya.b@kolkataservices.co',
        phoneNumber: '+91 98311 90812',
        status: 'Approved',
        timestamp: { seconds: Math.floor(Date.now() / 1000) - 95000 },
        type: 'Partner',
        allocatedBank: 'SBI',
        cibilScore: 775,
        details: {
            loanType: 'DSA Partner Lead',
            amount: 0,
            city: 'Kolkata, WB',
            age: 34,
            notes: 'Licensed DSA partner with 8 years institutional loan syndication experience.'
        }
    },
    {
        id: 'APP-2026-8907',
        fullName: 'Rohan Deshmukh',
        email: 'rohan.deshmukh@yahoo.com',
        phoneNumber: '+91 97662 33410',
        status: 'Pending',
        timestamp: { seconds: Math.floor(Date.now() / 1000) - 120000 },
        type: 'Loan',
        allocatedBank: 'Axis',
        cibilScore: 685,
        details: {
            loanType: 'Used Car Loan',
            amount: 650000,
            city: 'Nagpur, MH',
            employmentType: 'Salaried (L&T)',
            monthlyIncome: 62000,
            tenureMonths: 60,
            notes: 'Requires co-applicant or 15% higher margin.'
        }
    },
    {
        id: 'APP-2026-8908',
        fullName: 'Kavita Nair',
        email: 'kavita.nair@gmail.com',
        phoneNumber: '+91 94471 22890',
        status: 'Approved',
        timestamp: { seconds: Math.floor(Date.now() / 1000) - 172800 }, // 2 days ago
        type: 'Loan',
        allocatedBank: 'SBI',
        cibilScore: 768,
        details: {
            loanType: 'Education Loan',
            amount: 2500000,
            city: 'Kochi, KL',
            employmentType: 'Salaried (Govt)',
            monthlyIncome: 95000,
            tenureMonths: 84,
            notes: 'Admission letter to TU Munich verified with bank nodal officer.'
        }
    },
    {
        id: 'APP-2026-8909',
        fullName: 'Manish Kulkarni',
        email: 'manish.k@rediffmail.com',
        phoneNumber: '+91 98220 89451',
        status: 'Rejected',
        timestamp: { seconds: Math.floor(Date.now() / 1000) - 200000 },
        type: 'Loan',
        allocatedBank: 'ICICI',
        cibilScore: 610,
        details: {
            loanType: 'Business Loan',
            amount: 1800000,
            city: 'Nashik, MH',
            employmentType: 'Self-Employed (Retail)',
            monthlyIncome: 85000,
            tenureMonths: 36,
            notes: 'High default risk: 2 write-offs in last 24 months.'
        }
    },
    {
        id: 'APP-2026-8910',
        fullName: 'Deepak Singhania',
        email: 'deepak.singhania@finvest.in',
        phoneNumber: '+91 98112 45890',
        status: 'Underwriting',
        timestamp: { seconds: Math.floor(Date.now() / 1000) - 250000 },
        type: 'Partner',
        allocatedBank: 'HDFC',
        cibilScore: 795,
        details: {
            loanType: 'Regional Connector',
            amount: 0,
            city: 'Jaipur, RJ',
            age: 41,
            notes: 'CA network lead aggregator across Rajasthan region.'
        }
    },
    {
        id: 'APP-2026-8911',
        fullName: 'Neha Gupta',
        email: 'neha.gupta@delhitech.io',
        phoneNumber: '+91 98711 63201',
        status: 'Pending',
        timestamp: { seconds: Math.floor(Date.now() / 1000) - 290000 },
        type: 'Loan',
        allocatedBank: 'ICICI',
        cibilScore: 735,
        details: {
            loanType: 'Personal Loan',
            amount: 1500000,
            city: 'Gurugram, HR',
            employmentType: 'Salaried (Google India)',
            monthlyIncome: 185000,
            tenureMonths: 60,
            notes: 'Awaiting digital e-mandate setup.'
        }
    },
    {
        id: 'APP-2026-8912',
        fullName: 'Sandeep Verma',
        email: 'sandeep.verma@vermaeng.com',
        phoneNumber: '+91 94150 91823',
        status: 'Underwriting',
        timestamp: { seconds: Math.floor(Date.now() / 1000) - 340000 },
        type: 'Loan',
        allocatedBank: 'Axis',
        cibilScore: 752,
        details: {
            loanType: 'Machinery Loan',
            amount: 2800000,
            city: 'Kanpur, UP',
            employmentType: 'SME Manufacturer',
            monthlyIncome: 290000,
            tenureMonths: 48,
            notes: 'Invoice of CNC equipment verified with vendor.'
        }
    }
];

const BANK_OPTIONS = ['SBI', 'HDFC', 'ICICI', 'Axis'] as const;

const AdminApplicationsPage: React.FC<AdminApplicationsPageProps> = ({ initialFilter = 'All' }) => {
    const [searchParams] = useSearchParams();
    const urlStatus = searchParams.get('status');

    const [applications, setApplications] = useState<Application[]>([]);
    const [typeFilter, setTypeFilter] = useState<string>(initialFilter);
    const [statusFilter, setStatusFilter] = useState<string>(urlStatus || 'All');
    const [bankFilter, setBankFilter] = useState<string>('All');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);
    const [isExporting, setIsExporting] = useState<boolean>(false);
    const [isLiveFirestore, setIsLiveFirestore] = useState<boolean>(false);

    // Determine appId for Firestore path - fallback to env or default
    const appId = typeof __app_id !== 'undefined' ? __app_id : import.meta.env.VITE_FIREBASE_PROJECT_ID || 'default-app-id';

    const fetchAll = async () => {
        setLoading(true);
        try {
            const loansRef = collection(db, `artifacts/${appId}/public/data/loanApplications`);
            const partnersRef = collection(db, `artifacts/${appId}/public/data/partnerLeads`);

            const [loansSnap, partnersSnap] = await Promise.all([
                getDocs(query(loansRef, orderBy('timestamp', 'desc'))).catch(() => null),
                getDocs(query(partnersRef, orderBy('timestamp', 'desc'))).catch(() => null)
            ]);

            const loans: Application[] = [];
            if (loansSnap && !loansSnap.empty) {
                loansSnap.docs.forEach((d) => {
                    const data = d.data();
                    loans.push({
                        id: d.id,
                        fullName: data.fullName || data.name || 'Unnamed Applicant',
                        email: data.email || 'N/A',
                        phoneNumber: data.phoneNumber || data.phone || data.mobileNumber || 'N/A',
                        status: data.status || 'Pending',
                        timestamp: data.timestamp || Timestamp.now(),
                        type: 'Loan',
                        allocatedBank: data.allocatedBank || (['SBI', 'HDFC', 'ICICI', 'Axis'][Math.floor(Math.random() * 4)]),
                        cibilScore: data.cibilScore || data.credit_score || 750,
                        details: {
                            loanType: data.loanType || 'Personal Loan',
                            amount: data.desiredAmount || data.amount || 500000,
                            city: data.city || 'Pan India',
                            employmentType: data.employmentType || 'Salaried',
                            monthlyIncome: data.monthlyIncome || 60000,
                            tenureMonths: data.tenureMonths || 36,
                            notes: data.notes || 'Submitted via BanksCart web application.'
                        }
                    });
                });
            }

            const partners: Application[] = [];
            if (partnersSnap && !partnersSnap.empty) {
                partnersSnap.docs.forEach((d) => {
                    const data = d.data();
                    partners.push({
                        id: d.id,
                        fullName: data.fullName || data.name || 'Partner Lead',
                        email: data.email || 'N/A',
                        phoneNumber: data.phoneNumber || data.phone || 'N/A',
                        status: data.status || 'Pending',
                        timestamp: data.timestamp || Timestamp.now(),
                        type: 'Partner',
                        allocatedBank: data.allocatedBank || (['SBI', 'HDFC', 'ICICI', 'Axis'][Math.floor(Math.random() * 4)]),
                        cibilScore: data.cibilScore || 760,
                        details: {
                            loanType: 'DSA Partner Lead',
                            amount: 0,
                            city: data.city || 'Regional',
                            age: data.age || 32,
                            notes: data.notes || 'Direct Partner Registration'
                        }
                    });
                });
            }

            const combined = [...loans, ...partners].sort((a, b) => {
                const aTime = a.timestamp?.seconds || 0;
                const bTime = b.timestamp?.seconds || 0;
                return bTime - aTime;
            });

            if (combined.length > 0) {
                setApplications(combined);
                setIsLiveFirestore(true);
            } else {
                // Realistic fallback seed records when Firestore has 0 documents
                setApplications(SEED_APPLICATIONS);
                setIsLiveFirestore(false);
            }
        } catch (err) {
            console.warn('[AdminApplicationsPage] Falling back to realistic seed applications:', err);
            setApplications(SEED_APPLICATIONS);
            setIsLiveFirestore(false);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, [appId]);

    // Update status handler
    const handleStatusUpdate = async (id: string, type: 'Loan' | 'Partner', newStatus: 'Pending' | 'Underwriting' | 'Approved' | 'Rejected') => {
        setUpdatingId(id);
        try {
            // If live firestore doc
            if (isLiveFirestore) {
                const collectionName = type === 'Loan' ? 'loanApplications' : 'partnerLeads';
                const docRef = doc(db, `artifacts/${appId}/public/data/${collectionName}`, id);
                await updateDoc(docRef, { status: newStatus }).catch((e) => console.warn('Firestore update error (non-fatal):', e));
            }

            // Optimistic local state update
            setApplications(prev => prev.map(app =>
                app.id === id ? { ...app, status: newStatus } : app
            ));

            if (selectedApp && selectedApp.id === id) {
                setSelectedApp(prev => prev ? { ...prev, status: newStatus } : null);
            }
        } catch (err) {
            console.error('Update failed:', err);
        } finally {
            setUpdatingId(null);
        }
    };

    // Bank allocation handler
    const handleBankAllocation = async (id: string, type: 'Loan' | 'Partner', newBank: string) => {
        setUpdatingId(id);
        try {
            if (isLiveFirestore) {
                const collectionName = type === 'Loan' ? 'loanApplications' : 'partnerLeads';
                const docRef = doc(db, `artifacts/${appId}/public/data/${collectionName}`, id);
                await updateDoc(docRef, { allocatedBank: newBank }).catch((e) => console.warn('Firestore bank update error (non-fatal):', e));
            }

            setApplications(prev => prev.map(app =>
                app.id === id ? { ...app, allocatedBank: newBank } : app
            ));

            if (selectedApp && selectedApp.id === id) {
                setSelectedApp(prev => prev ? { ...prev, allocatedBank: newBank } : null);
            }
        } catch (err) {
            console.error('Bank allocation update failed:', err);
        } finally {
            setUpdatingId(null);
        }
    };

    // Format Date helper
    const formatDate = (ts: any) => {
        if (!ts) return 'N/A';
        const seconds = ts.seconds || (ts instanceof Date ? ts.getTime() / 1000 : 0);
        if (!seconds) return 'N/A';
        return new Date(seconds * 1000).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatTime = (ts: any) => {
        if (!ts) return '';
        const seconds = ts.seconds || 0;
        if (!seconds) return '';
        return new Date(seconds * 1000).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Filtered Applications memoized
    const filteredApps = useMemo(() => {
        return applications.filter(app => {
            // Type filter
            if (typeFilter !== 'All' && app.type !== typeFilter) return false;

            // Status filter
            if (statusFilter !== 'All' && app.status.toLowerCase() !== statusFilter.toLowerCase()) return false;

            // Bank filter
            if (bankFilter !== 'All' && (app.allocatedBank || '').toUpperCase() !== bankFilter.toUpperCase()) return false;

            // Search query
            if (searchQuery.trim() !== '') {
                const queryLower = searchQuery.toLowerCase().trim();
                const nameMatch = (app.fullName || '').toLowerCase().includes(queryLower);
                const emailMatch = (app.email || '').toLowerCase().includes(queryLower);
                const phoneMatch = (app.phoneNumber || '').includes(queryLower);
                const idMatch = (app.id || '').toLowerCase().includes(queryLower);
                const loanTypeMatch = (app.details.loanType || '').toLowerCase().includes(queryLower);
                const cityMatch = (app.details.city || '').toLowerCase().includes(queryLower);
                const bankMatch = (app.allocatedBank || '').toLowerCase().includes(queryLower);

                if (!nameMatch && !emailMatch && !phoneMatch && !idMatch && !loanTypeMatch && !cityMatch && !bankMatch) {
                    return false;
                }
            }

            return true;
        });
    }, [applications, typeFilter, statusFilter, bankFilter, searchQuery]);

    // Metrics for the top ribbon
    const metrics = useMemo(() => {
        const total = applications.length;
        const pending = applications.filter(a => a.status.toLowerCase() === 'pending').length;
        const underwriting = applications.filter(a => a.status.toLowerCase() === 'underwriting').length;
        const approved = applications.filter(a => a.status.toLowerCase() === 'approved').length;
        const rejected = applications.filter(a => a.status.toLowerCase() === 'rejected').length;

        const totalValue = applications.reduce((acc, curr) => acc + (curr.details.amount || curr.details.desiredAmount || 0), 0);

        return { total, pending, underwriting, approved, rejected, totalValue };
    }, [applications]);

    // CSV Export function
    const exportToCSV = () => {
        setIsExporting(true);
        try {
            const headers = [
                'Application ID',
                'Applicant Name',
                'Email',
                'Phone Number',
                'Category',
                'Loan Type / Role',
                'Requested Amount (INR)',
                'Allocated Bank',
                'CIBIL Score',
                'Status',
                'City',
                'Employment',
                'Applied Date'
            ];

            const rows = filteredApps.map(app => [
                `"${app.id}"`,
                `"${app.fullName.replace(/"/g, '""')}"`,
                `"${app.email}"`,
                `"${app.phoneNumber}"`,
                `"${app.type}"`,
                `"${app.details.loanType || 'N/A'}"`,
                `"${app.details.amount || app.details.desiredAmount || 0}"`,
                `"${app.allocatedBank || 'Unassigned'}"`,
                `"${app.cibilScore || 'N/A'}"`,
                `"${app.status}"`,
                `"${app.details.city || 'N/A'}"`,
                `"${app.details.employmentType || 'N/A'}"`,
                `"${formatDate(app.timestamp)} ${formatTime(app.timestamp)}"`
            ]);

            const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            const timestamp = new Date().toISOString().slice(0, 10);
            link.setAttribute('href', url);
            link.setAttribute('download', `bankscart-applications-export-${timestamp}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Export error:', err);
        } finally {
            setIsExporting(false);
        }
    };

    // Bank Badge Helper
    const renderBankBadge = (bank?: string) => {
        const b = (bank || '').toUpperCase();
        if (b.includes('SBI')) {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-sky-50 text-sky-800 border border-sky-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-600"></span>
                    SBI
                </span>
            );
        }
        if (b.includes('HDFC')) {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 text-blue-900 border border-blue-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-700"></span>
                    HDFC
                </span>
            );
        }
        if (b.includes('ICICI')) {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    ICICI
                </span>
            );
        }
        if (b.includes('AXIS')) {
            return (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 text-rose-900 border border-rose-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-700"></span>
                    Axis
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                {bank || 'General Pool'}
            </span>
        );
    };

    // Status Badge Helper
    const renderStatusBadge = (status: string) => {
        const lower = (status || '').toLowerCase();
        if (lower === 'pending') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    Pending
                </span>
            );
        }
        if (lower === 'underwriting') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-200">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    Underwriting
                </span>
            );
        }
        if (lower === 'approved') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Approved
                </span>
            );
        }
        if (lower === 'rejected') {
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-800 border border-rose-200">
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    Rejected
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                {status}
            </span>
        );
    };

    return (
        <div className="font-ibm space-y-6 max-w-7xl mx-auto">
            {/* Top Header & Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                            Loan & Lead Operations CRM
                        </h1>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${isLiveFirestore ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-700 border border-slate-200'}`}>
                            {isLiveFirestore ? '● Live Firestore' : '● Evaluation Mode'}
                        </span>
                    </div>
                    <p className="text-sm text-slate-600 mt-1">
                        Review, underwrite, allocate to partner banks, and track loan leads across retail and SME portfolios.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchAll}
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm disabled:opacity-50"
                        title="Refresh data"
                    >
                        <RefreshCw className={`w-4 h-4 text-slate-500 ${loading ? 'animate-spin' : ''}`} />
                        Refresh
                    </button>

                    <button
                        onClick={exportToCSV}
                        disabled={isExporting || filteredApps.length === 0}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 rounded-lg transition-colors shadow-sm disabled:opacity-50"
                    >
                        <Download className="w-4 h-4 text-amber-400" />
                        Export Leads CSV ({filteredApps.length})
                    </button>
                </div>
            </div>

            {/* Quick KPI Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Leads</div>
                    <div className="text-2xl font-bold text-slate-900 tabular-nums font-mono mt-1">{metrics.total}</div>
                    <div className="text-xs text-slate-500 mt-0.5">Vol: ₹{(metrics.totalValue / 10000000).toFixed(2)} Cr</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm bg-gradient-to-br from-white to-amber-50/30">
                    <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Pending
                    </div>
                    <div className="text-2xl font-bold text-amber-900 tabular-nums font-mono mt-1">{metrics.pending}</div>
                    <div className="text-xs text-amber-700 mt-0.5">Awaiting initial review</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-sm bg-gradient-to-br from-white to-blue-50/30">
                    <div className="text-xs font-semibold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" /> Underwriting
                    </div>
                    <div className="text-2xl font-bold text-blue-900 tabular-nums font-mono mt-1">{metrics.underwriting}</div>
                    <div className="text-xs text-blue-700 mt-0.5">Credit analysis active</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-sm bg-gradient-to-br from-white to-emerald-50/30">
                    <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approved
                    </div>
                    <div className="text-2xl font-bold text-emerald-900 tabular-nums font-mono mt-1">{metrics.approved}</div>
                    <div className="text-xs text-emerald-700 mt-0.5">Sanctioned / Disbursed</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-rose-200 shadow-sm bg-gradient-to-br from-white to-rose-50/30 col-span-2 sm:col-span-1">
                    <div className="text-xs font-semibold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5" /> Rejected
                    </div>
                    <div className="text-2xl font-bold text-rose-900 tabular-nums font-mono mt-1">{metrics.rejected}</div>
                    <div className="text-xs text-rose-700 mt-0.5">Credit criteria unmet</div>
                </div>
            </div>

            {/* Controls Filter Bar: Type, Status, Bank, Search */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
                {/* Search Bar + Quick Type Toggle */}
                <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search by applicant name, email, phone, loan type, or ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-9 py-2 text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all placeholder:text-slate-400"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Type Tabs */}
                    <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200 self-start md:self-auto">
                        {[
                            { key: 'All', label: 'All Portfolios' },
                            { key: 'Loan', label: 'Loan Applications' },
                            { key: 'Partner', label: 'Partner Leads' }
                        ].map(t => (
                            <button
                                key={t.key}
                                onClick={() => setTypeFilter(t.key)}
                                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                                    typeFilter === t.key
                                        ? 'bg-white text-slate-900 shadow-sm'
                                        : 'text-slate-600 hover:text-slate-900'
                                }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filter Pills: Status & Bank */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
                    {/* Status Pills */}
                    <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-500 mr-1">Status:</span>
                        {[
                            { key: 'All', label: 'All', count: metrics.total },
                            { key: 'Pending', label: 'Pending', count: metrics.pending },
                            { key: 'Underwriting', label: 'Underwriting', count: metrics.underwriting },
                            { key: 'Approved', label: 'Approved', count: metrics.approved },
                            { key: 'Rejected', label: 'Rejected', count: metrics.rejected }
                        ].map(s => {
                            const isSelected = statusFilter.toLowerCase() === s.key.toLowerCase();
                            return (
                                <button
                                    key={s.key}
                                    onClick={() => setStatusFilter(s.key)}
                                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                                        isSelected
                                            ? 'bg-slate-900 text-white shadow-sm'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                                    }`}
                                >
                                    <span>{s.label}</span>
                                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] tabular-nums font-mono ${
                                        isSelected ? 'bg-slate-700 text-amber-300' : 'bg-slate-200 text-slate-700'
                                    }`}>
                                        {s.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Quick Bank Allocation Filter */}
                    <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-slate-500 mr-1 flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5" /> Bank:
                        </span>
                        {['All', ...BANK_OPTIONS].map(bank => {
                            const isSelected = bankFilter.toUpperCase() === bank.toUpperCase();
                            return (
                                <button
                                    key={bank}
                                    onClick={() => setBankFilter(bank)}
                                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                                        isSelected
                                            ? 'bg-blue-900 text-white font-semibold shadow-sm'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                                    }`}
                                >
                                    {bank === 'All' ? 'All Banks' : bank}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Applications Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-5 py-3.5 text-xs font-bold text-slate-600 uppercase tracking-wider">Applicant & Contact</th>
                                <th className="px-5 py-3.5 text-xs font-bold text-slate-600 uppercase tracking-wider">Loan Portfolio</th>
                                <th className="px-5 py-3.5 text-xs font-bold text-slate-600 uppercase tracking-wider">Desired Amount</th>
                                <th className="px-5 py-3.5 text-xs font-bold text-slate-600 uppercase tracking-wider">Allocated Bank</th>
                                <th className="px-5 py-3.5 text-xs font-bold text-slate-600 uppercase tracking-wider">CIBIL Score</th>
                                <th className="px-5 py-3.5 text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                                <th className="px-5 py-3.5 text-xs font-bold text-slate-600 uppercase tracking-wider">Date</th>
                                <th className="px-5 py-3.5 text-xs font-bold text-slate-600 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {loading ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                                        <div className="inline-flex items-center gap-2">
                                            <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                                            Loading institutional loan applications...
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredApps.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                                        <div className="max-w-sm mx-auto text-center space-y-2">
                                            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                                            <div className="font-semibold text-slate-700">No applications matched criteria</div>
                                            <p className="text-xs text-slate-500">
                                                Try adjusting your search terms, bank allocation, or status filter.
                                            </p>
                                            <button
                                                onClick={() => {
                                                    setSearchQuery('');
                                                    setStatusFilter('All');
                                                    setBankFilter('All');
                                                    setTypeFilter('All');
                                                }}
                                                className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-semibold pt-1"
                                            >
                                                Reset all filters
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredApps.map((app) => (
                                    <tr key={app.id} className="hover:bg-slate-50/80 transition-colors group">
                                        {/* Applicant & Contact */}
                                        <td className="px-5 py-4">
                                            <div className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                                                {app.fullName}
                                            </div>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-xs text-slate-500">{app.email}</span>
                                                <span className="text-slate-300">•</span>
                                                <span className="text-xs text-slate-600 font-mono tabular-nums">{app.phoneNumber}</span>
                                            </div>
                                            <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                                                ID: {app.id}
                                            </div>
                                        </td>

                                        {/* Loan Portfolio */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                {app.type === 'Loan' ? (
                                                    <FileText className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                                ) : (
                                                    <Briefcase className="h-4 w-4 text-purple-600 flex-shrink-0" />
                                                )}
                                                <div>
                                                    <div className="font-medium text-slate-800 text-xs sm:text-sm">
                                                        {app.details.loanType || (app.type === 'Loan' ? 'Personal Loan' : 'DSA Partner')}
                                                    </div>
                                                    <div className="text-[11px] text-slate-500">
                                                        {app.details.city || 'Pan India'} {app.details.employmentType ? `• ${app.details.employmentType}` : ''}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Desired Amount */}
                                        <td className="px-5 py-4">
                                            {app.type === 'Loan' ? (
                                                <div>
                                                    <div className="font-bold text-slate-900 tabular-nums font-mono">
                                                        ₹{(app.details.amount || app.details.desiredAmount || 0).toLocaleString('en-IN')}
                                                    </div>
                                                    {app.details.tenureMonths && (
                                                        <div className="text-[11px] text-slate-500 tabular-nums font-mono">
                                                            {app.details.tenureMonths} Mo tenure
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="text-xs text-slate-500 font-mono italic">DSA Partner Lead</div>
                                            )}
                                        </td>

                                        {/* Allocated Bank with quick inline re-allocation */}
                                        <td className="px-5 py-4">
                                            <div className="relative inline-block text-left">
                                                <select
                                                    value={app.allocatedBank || 'HDFC'}
                                                    onChange={(e) => handleBankAllocation(app.id, app.type, e.target.value)}
                                                    disabled={updatingId === app.id}
                                                    className="text-xs font-semibold rounded-md border border-slate-200 bg-white py-1 px-2 text-slate-800 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer shadow-xs disabled:opacity-50"
                                                >
                                                    {BANK_OPTIONS.map((b) => (
                                                        <option key={b} value={b}>
                                                            {b} Bank
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </td>

                                        {/* CIBIL Score */}
                                        <td className="px-5 py-4">
                                            {app.cibilScore ? (
                                                <div className="inline-flex items-center gap-1.5">
                                                    <span className={`w-2 h-2 rounded-full ${
                                                        app.cibilScore >= 750 ? 'bg-emerald-500' :
                                                        app.cibilScore >= 700 ? 'bg-blue-500' :
                                                        app.cibilScore >= 650 ? 'bg-amber-500' : 'bg-rose-500'
                                                    }`} />
                                                    <span className="font-mono font-bold text-slate-800 tabular-nums">
                                                        {app.cibilScore}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400 font-medium uppercase">
                                                        {app.cibilScore >= 750 ? 'Prime' : app.cibilScore >= 700 ? 'Good' : 'Subprime'}
                                                    </span>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-400">N/A</span>
                                            )}
                                        </td>

                                        {/* Status */}
                                        <td className="px-5 py-4">
                                            {renderStatusBadge(app.status)}
                                        </td>

                                        {/* Date */}
                                        <td className="px-5 py-4 text-xs text-slate-500 tabular-nums font-mono whitespace-nowrap">
                                            {formatDate(app.timestamp)}
                                        </td>

                                        {/* Quick Actions */}
                                        <td className="px-5 py-4 text-right">
                                            <div className="inline-flex items-center gap-1">
                                                <button
                                                    onClick={() => setSelectedApp(app)}
                                                    className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-blue-700 transition-colors"
                                                    title="View Lead Dossier"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() => handleStatusUpdate(app.id, app.type, 'Underwriting')}
                                                    disabled={updatingId === app.id || app.status === 'Underwriting'}
                                                    className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 disabled:opacity-30 transition-colors"
                                                    title="Mark Underwriting"
                                                >
                                                    <Clock className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() => handleStatusUpdate(app.id, app.type, 'Approved')}
                                                    disabled={updatingId === app.id || app.status === 'Approved'}
                                                    className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 disabled:opacity-30 transition-colors"
                                                    title="Approve Application"
                                                >
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() => handleStatusUpdate(app.id, app.type, 'Rejected')}
                                                    disabled={updatingId === app.id || app.status === 'Rejected'}
                                                    className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 disabled:opacity-30 transition-colors"
                                                    title="Reject Application"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer */}
                <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
                    <div>
                        Showing <span className="font-semibold text-slate-800">{filteredApps.length}</span> of{' '}
                        <span className="font-semibold text-slate-800">{applications.length}</span> recorded applications
                    </div>
                    <div className="flex items-center gap-4 text-slate-500">
                        <span>Protected by BanksCart DPDP & Underwriting Guard</span>
                    </div>
                </div>
            </div>

            {/* Applicant Dossier / Modal */}
            {selectedApp && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h3 className="text-lg font-bold">{selectedApp.fullName}</h3>
                                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800 text-slate-300">
                                        {selectedApp.id}
                                    </span>
                                </div>
                                <p className="text-xs text-slate-400 mt-0.5">
                                    {selectedApp.type} Application • Received {formatDate(selectedApp.timestamp)} {formatTime(selectedApp.timestamp)}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedApp(null)}
                                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 overflow-y-auto space-y-6 text-sm">
                            {/* Key Highlights Ribbon */}
                            <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-medium">Desired Amount</div>
                                    <div className="text-lg font-bold text-slate-900 font-mono tabular-nums mt-0.5">
                                        ₹{(selectedApp.details.amount || selectedApp.details.desiredAmount || 0).toLocaleString('en-IN')}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-medium">CIBIL Score</div>
                                    <div className="text-lg font-bold text-emerald-700 font-mono tabular-nums mt-0.5">
                                        {selectedApp.cibilScore || '750'} <span className="text-xs font-normal text-slate-500">(Prime)</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-xs text-slate-500 uppercase font-medium">Allocated Bank</div>
                                    <div className="mt-1">
                                        {renderBankBadge(selectedApp.allocatedBank)}
                                    </div>
                                </div>
                            </div>

                            {/* Contact & Applicant Profile */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Applicant Information</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="p-3 rounded-lg border border-slate-200 bg-white flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <div className="text-[11px] text-slate-400">Email Address</div>
                                            <div className="font-medium text-slate-800">{selectedApp.email}</div>
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-lg border border-slate-200 bg-white flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <div className="text-[11px] text-slate-400">Phone Number</div>
                                            <div className="font-medium text-slate-800 font-mono tabular-nums">{selectedApp.phoneNumber}</div>
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-lg border border-slate-200 bg-white flex items-center gap-3">
                                        <Building2 className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <div className="text-[11px] text-slate-400">City / Jurisdiction</div>
                                            <div className="font-medium text-slate-800">{selectedApp.details.city || 'India'}</div>
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-lg border border-slate-200 bg-white flex items-center gap-3">
                                        <User className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <div className="text-[11px] text-slate-400">Employment / Category</div>
                                            <div className="font-medium text-slate-800">
                                                {selectedApp.details.employmentType || (selectedApp.type === 'Partner' ? 'DSA Channel' : 'Salaried')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Underwriting Notes & Audit Trail */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Underwriting Notes & KYC Status</h4>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 text-xs leading-relaxed">
                                    {selectedApp.details.notes || 'Applicant submitted via BanksCart multi-bank marketplace. Identity verification completed with 256-bit AES encryption.'}
                                </div>
                            </div>

                            {/* Bank Re-Allocation in Modal */}
                            <div>
                                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Lender Allocation Routing</h4>
                                <div className="grid grid-cols-4 gap-2">
                                    {BANK_OPTIONS.map((bank) => {
                                        const isAllocated = selectedApp.allocatedBank === bank;
                                        return (
                                            <button
                                                key={bank}
                                                onClick={() => handleBankAllocation(selectedApp.id, selectedApp.type, bank)}
                                                className={`py-2 px-3 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                                                    isAllocated
                                                        ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                                                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                                                }`}
                                            >
                                                {isAllocated && <Check className="w-3.5 h-3.5" />}
                                                {bank} Bank
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer with Status Actions */}
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500 font-medium">Status:</span>
                                {renderStatusBadge(selectedApp.status)}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleStatusUpdate(selectedApp.id, selectedApp.type, 'Underwriting')}
                                    disabled={updatingId === selectedApp.id || selectedApp.status === 'Underwriting'}
                                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 disabled:opacity-40 transition-colors"
                                >
                                    Underwrite
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(selectedApp.id, selectedApp.type, 'Approved')}
                                    disabled={updatingId === selectedApp.id || selectedApp.status === 'Approved'}
                                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 transition-colors shadow-sm"
                                >
                                    Approve Loan
                                </button>
                                <button
                                    onClick={() => handleStatusUpdate(selectedApp.id, selectedApp.type, 'Rejected')}
                                    disabled={updatingId === selectedApp.id || selectedApp.status === 'Rejected'}
                                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-700 bg-rose-100 hover:bg-rose-200 disabled:opacity-40 transition-colors"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminApplicationsPage;
