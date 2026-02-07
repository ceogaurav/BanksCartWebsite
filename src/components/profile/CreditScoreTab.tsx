import React, { useState, useEffect, useRef } from 'react';
import type { User } from 'firebase/auth'; // <--- FIXED: Added 'type' here
import { doc, updateDoc, collection, addDoc, query, orderBy, limit, getDocs, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { initiateCreditSession, fetchCreditReport } from '../../services/deepvue';
import { loadRazorpay } from '../../utils/razorpay';
import {
    X, Download, ShieldCheck, User as UserIcon, Calendar, MapPin, Phone, Mail, Award,
    AlertTriangle, CheckCircle, Smartphone, Loader2, ChevronRight, TrendingUp, PieChart,
    Archive, Briefcase, HelpCircle, Lightbulb, AlertCircle, Clock, Gift
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import CreditScoreGauge from './CreditScoreGauge';
import MissingDetailsModal from '../modals/MissingDetailsModal';

interface CreditScoreTabProps {
    userData: any;
    user: User;
}

// --- HELPER COMPONENT: The Gauge Chart (Cleaned) ---
const GaugeChart = ({ score }: { score: number }) => {
    // Score Normalization (300 to 900)
    const minScore = 300;
    const maxScore = 900;
    const normalizedScore = Math.min(Math.max(score, minScore), maxScore);
    const percent = (normalizedScore - minScore) / (maxScore - minScore); // 0.0 to 1.0

    // Determine Label & Color
    let label = "Needs Attention";
    let color = "#ef4444"; // Red
    if (score >= 650) { label = "Fair"; color = "#f97316"; } // Orange
    if (score >= 700) { label = "Good"; color = "#eab308"; } // Yellow
    if (score >= 750) { label = "Excellent"; color = "#22c55e"; } // Green

    // Calculate Needle Angle 
    // 0% (Score 300) = -180 deg (9 o'clock)
    // 100% (Score 900) = 0 deg (3 o'clock)
    const angleDeg = (percent * 180) - 180;

    // Calculate "Tip Circle" Position (The yellow ring on the rim)
    // Radius = 85 (matching the arc radius)
    // Center = 100, 100 (matches svg viewbox center)
    const angleRad = (angleDeg * Math.PI) / 180;
    const tipX = 120 + 85 * Math.cos(angleRad); // Updated center 120
    const tipY = 120 + 85 * Math.sin(angleRad); // Updated center 120

    return (
        <div className="relative w-80 h-48 mx-auto mb-4 flex flex-col items-center justify-center">
            <svg viewBox="0 0 240 130" className="w-full h-full overflow-visible">

                {/* --- 1. THE TRACK SEGMENTS (Calculated for Perfect Semi-Circle 180->360) --- */}
                {/* Center: 120,120. Radius: 100. Width: 18. */}

                {/* Red Segment (Poor): 180° to 222° */}
                <path
                    d="M 20 120 A 100 100 0 0 1 45.68 53.05"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="18"
                    strokeLinecap="butt"
                />

                {/* Orange Segment (Fair): 225° to 267° */}
                <path
                    d="M 49.29 49.29 A 100 100 0 0 1 114.78 20.14"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="18"
                    strokeLinecap="butt"
                />

                {/* Yellow Segment (Good): 273° to 315° */}
                <path
                    d="M 125.22 20.14 A 100 100 0 0 1 190.71 49.29"
                    fill="none"
                    stroke="#eab308"
                    strokeWidth="18"
                    strokeLinecap="butt"
                />

                {/* Green Segment (Excellent): 318° to 360° */}
                <path
                    d="M 194.32 53.05 A 100 100 0 0 1 220 120"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="18"
                    strokeLinecap="butt"
                />

                {/* --- 2. THE NEEDLE --- */}
                <g transform={`translate(120, 120) rotate(${angleDeg})`}>
                    {/* Needle Shape: Triangle pointing to the right (0 deg), then rotated */}
                    {/* Tip is at x=75 (slightly inside track), Base is at x=-10 */}
                    <path d="M -10 -4 L 85 0 L -10 4 Z" fill="#1e293b" />
                    <circle cx="0" cy="0" r="8" fill="#1e293b" />
                </g>

                {/* --- 3. THE FLOATING RING (The Key Visual Detail) --- */}
                {/* This circle sits exactly on top of the track at the needle's angle */}
                <circle
                    cx={tipX}
                    cy={tipY}
                    r="6"
                    fill="white"
                    stroke="#eab308"
                    strokeWidth="3"
                    className="shadow-md"
                />

                {/* --- 4. TEXT LABELS --- */}
                <text x="120" y="85" textAnchor="middle" className="text-4xl font-bold fill-slate-800" style={{ fontSize: '42px', fontWeight: '800' }}>
                    {score}
                </text>
                <text x="120" y="110" textAnchor="middle" className="text-sm font-bold uppercase tracking-wider" fill={color}>
                    {label}
                </text>
            </svg>
        </div>
    );
};

const CreditScoreTab: React.FC<CreditScoreTabProps> = ({ userData, user }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [report, setReport] = useState<any>(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeSection, setActiveSection] = useState('score'); // score, insights, history
    const [expandedInsight, setExpandedInsight] = useState<string | null>(null);
    const [isMissingDetailsModalOpen, setIsMissingDetailsModalOpen] = useState(false);

    // Print ref
    const componentRef = useRef<HTMLDivElement>(null);

    // 1. Check for existing report on mount
    useEffect(() => {
        const loadReport = async () => {
            if (user) {
                try {
                    const q = query(
                        collection(db, 'users', user.uid, 'creditReports'),
                        orderBy('timestamp', 'desc'),
                        limit(1)
                    );
                    const querySnapshot = await getDocs(q);
                    if (!querySnapshot.empty) {
                        setReport(querySnapshot.docs[0].data());
                    }
                } catch (err) {
                    console.log("Could not load existing reports:", err);
                }
            }
        };
        loadReport();
    }, [user]);

    // 2. Handle Callback
    useEffect(() => {
        const transactionId = searchParams.get('transaction_id');
        if (transactionId && user) {
            handleFetchReport(transactionId);
        }
    }, [searchParams, user]);

    const handleFetchReport = async (txnId: string) => {
        setLoading(true);
        try {
            console.log("Fetching credit report for txn:", txnId);
            const data = await fetchCreditReport(txnId);

            if (data.code === 200 && data.sub_code === "SUCCESS") {
                const reportData = {
                    ...data.data,
                    timestamp: new Date(),
                    transactionId: txnId
                };

                // 1. Save to User's private subcollection
                try {
                    await addDoc(collection(db, 'users', user.uid, 'creditReports'), reportData);
                    console.log("Saved specific credit report to subcollection.");
                } catch (subErr) {
                    console.error("Failed to save credit report to user subcollection:", subErr);
                }

                // 2. Update User Profile with latest score
                try {
                    await updateDoc(doc(db, 'users', user.uid), {
                        lastCreditCheck: new Date(),
                        latestCreditScore: data.data.credit_score,
                        cibilScore: parseInt(data.data.credit_score) // Ensure consistency
                    });
                    console.log("Updated user profile with new score.");
                } catch (profErr) {
                    console.error("Failed to update user profile summary:", profErr);
                }

                // 3. Save to Admin-Accessible Artifact Collection (Dual-Write)
                try {
                    // Determine App ID for Artifacts Path
                    const localFirebaseConfig = { projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID };
                    let firebaseConfig = localFirebaseConfig;
                    // @ts-ignore
                    if (typeof __firebase_config !== 'undefined' && __firebase_config) {
                        try {
                            // @ts-ignore
                            const canvasConfig = JSON.parse(__firebase_config);
                            firebaseConfig = { ...localFirebaseConfig, ...canvasConfig };
                        } catch (e) { console.error(e); }
                    }
                    // @ts-ignore
                    const appId = typeof __app_id !== 'undefined' ? __app_id : firebaseConfig.projectId || 'default-app-id';

                    const adminVisibleRef = doc(db, `artifacts/${appId}/public/data/cibilScoreChecks`, user.uid);

                    // Merge full report data so Admin View Report works. Also save score.
                    await setDoc(adminVisibleRef, { ...reportData, credit_score: data.data.credit_score }, { merge: true });
                    console.log("Credit report saved to admin collection (cibilScoreChecks).");

                } catch (adminSaveErr) {
                    console.error("Failed to save report for admin:", adminSaveErr);
                }

                // Update UI state regardless of partial write failures
                setReport(reportData);
                setSearchParams({});
                setError(null);
            } else {
                console.error("API returned error:", data);
                setError(data.message || 'Failed to fetch credit report from bureau.');
            }
        } catch (err: any) {
            console.error("Critical error in handleFetchReport:", err);
            setError('Error fetching report. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const [showOffer, setShowOffer] = useState(true);

    const hasAllPrerequisites = () => {
        if (!userData) return false;

        // Required Fields
        const hasBasic = userData.fullName && userData.email && userData.mobileNumber;
        const hasLoan = !!userData.loanType; // Check if loanType exists
        const hasAddress = userData.addressDetails?.city && userData.addressDetails?.pincode;

        const emp = userData.employmentDetails;
        const hasIncome = emp?.monthlyIncome || emp?.turnover; // One of them must exist
        const hasEmpParams = emp?.type && hasIncome;

        return hasBasic && hasLoan && hasAddress && hasEmpParams;
    };

    const handleCheckScore = async () => {
        setError(null);

        // 1. Check Prerequisites
        if (!hasAllPrerequisites()) {
            setIsMissingDetailsModalOpen(true);
            return;
        }

        // 2. Proceed if valid
        setLoading(true);
        try {
            const getRedirectUri = () => {
                const url = new URL(window.location.href);
                if (url.hostname === 'localhost') {
                    url.hostname = '127.0.0.1.nip.io';
                }
                return url.toString();
            };
            const response = await initiateCreditSession({
                redirect_uri: getRedirectUri(),
                full_name: userData.fullName,
                mobile_number: userData.mobileNumber
            });
            if (response.code === 201 && response.data?.redirect_url) {
                window.location.href = response.data.redirect_url;
            } else {
                setError(response.message || "Failed to initiate session");
            }
        } catch (err: any) {
            setError(err.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const handleModalSuccess = () => {
        setIsMissingDetailsModalOpen(false);
        window.location.reload();
    };

    const handleDownload = async () => {
        const res = await loadRazorpay();

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?');
            return;
        }

        // Razorpay Options
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_YourKeyHere', // Replace with real key or Env Var
            amount: 9900, // Amount in paise (9900 = ₹99)
            currency: "INR",
            name: "BanksCart Credit Report",
            description: "Detailed Credit Health Report PDF",
            image: "/images/bankscart_logo_full.png",
            handler: function (response: any) {
                // Payment Success
                // alert(response.razorpay_payment_id);
                // Trigger Download
                window.print();
            },
            prefill: {
                name: userData?.fullName || "User Name",
                email: userData?.email || "user@example.com",
                contact: userData?.mobileNumber || "9999999999"
            },
            notes: {
                address: "BanksCart Corporate Office"
            },
            theme: {
                color: "#2563eb"
            }
        };

        // @ts-ignore
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-gray-100">
                <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
                <p className="text-gray-500">Contacting Credit Bureau...</p>
            </div>
        );
    }

    if (report) {
        // Parsing data for the print view
        const cirData = report?.credit_report?.CCRResponse?.CIRReportDataLst?.[0]?.CIRReportData;
        const personalInfo = cirData?.IDAndContactInfo?.PersonalInfo;
        const identityInfo = cirData?.IDAndContactInfo?.IdentityInfo;
        const addressInfo = cirData?.IDAndContactInfo?.AddressInfo?.[0];
        const accounts = cirData?.RetailAccountDetails || [];

        const displayName = personalInfo?.Name?.FullName || userData?.fullName || 'N/A';
        const displayPan = identityInfo?.PANId?.[0]?.IdNumber || userData?.panNumber || 'N/A';
        const displayDob = personalInfo?.DateOfBirth || userData?.dob || 'N/A';
        const displayScore = report.credit_score || "N/A";

        return (
            <>
                <style>{`
@media print {
    .screen-only { display: none!important; }
    .print-view { display: block!important; }
    header { display: none!important; }
    @page { size: auto; margin: 5mm; }
    body { background: white; -webkit-print-color-adjust: exact; }
}
`}</style>

                {/* 1. Screen View (Interactive Dashboard) */}
                <div className="screen-only bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col md:flex-row min-h-[500px]">
                    <div className="w-full md:w-64 bg-gray-50 border-r border-gray-100 flex flex-col">
                        <div className="p-6 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                                <ShieldCheck className="h-5 w-5 text-blue-600" /> Credit Report
                            </h3>
                        </div>
                        <nav className="flex-1 p-4 space-y-1">
                            <button
                                onClick={() => setActiveSection('score')}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${activeSection === 'score' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                Credit Score <ChevronRight className={`h-4 w-4 ${activeSection === 'score' ? 'opacity-100' : 'opacity-0'}`} />
                            </button>
                            <button
                                onClick={() => setActiveSection('insights')}
                                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${activeSection === 'insights' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                                <span className="flex items-center gap-2">Report Insights</span>
                                <ChevronRight className={`h-4 w-4 ${activeSection === 'insights' ? 'opacity-100' : 'opacity-0'}`} />
                            </button>
                            <button
                                onClick={handleDownload}
                                className="w-full text-center px-4 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-6 active:scale-95"
                            >
                                <Download className="h-4 w-4" /> Download Premium Report
                            </button>
                        </nav>
                    </div>

                    <div className="flex-1 p-6 md:p-8" ref={componentRef}>
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Hey {userData?.fullName?.split(' ')[0] || 'User'}!
                                </h2>
                                <p className="text-gray-500 text-sm mt-1">
                                    Score as of {new Date(report.timestamp?.seconds * 1000 || report.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>
                            </div>
                            <div className="text-right hidden sm:block">
                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Next Report On</span>
                                <div className="font-medium text-gray-700">
                                    {new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </div>
                            </div>
                        </div>

                        {activeSection === 'score' && (
                            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
                                <div className="flex-shrink-0">
                                    <CreditScoreGauge score={parseInt(report.credit_score)} />
                                </div>
                                <div className="flex-1 space-y-6 pt-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">You are doing Great!</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            Your credit score is considered <span className="font-semibold text-green-600">Excellent</span>.
                                            Banks prefer customers with a score above 750. You are likely to get loans at the best interest rates.
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                            <div className="text-blue-600 mb-2"><TrendingUp className="h-5 w-5" /></div>
                                            <div className="text-sm text-gray-500">Payment History</div>
                                            <div className="font-bold text-gray-800">100% On Time</div>
                                        </div>
                                        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                                            <div className="text-purple-600 mb-2"><PieChart className="h-5 w-5" /></div>
                                            <div className="text-sm text-gray-500">Credit Mix</div>
                                            <div className="font-bold text-gray-800">Balanced</div>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-gray-100 flex gap-4">
                                        <button
                                            onClick={handleCheckScore}
                                            className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                                        >
                                            Refresh Score
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeSection === 'insights' && (
                            <div>
                                <h3 className="text-lg font-bold text-gray-800 mb-6">Detailed Insights</h3>
                                <div className="space-y-4">
                                    {(() => {
                                        // Robust Parsing Logic
                                        const cirData = report?.credit_report?.CCRResponse?.CIRReportDataLst?.[0]?.CIRReportData;
                                        const accounts = cirData?.RetailAccountDetails || [];
                                        const enquiries = cirData?.EnquiryDetails || [];

                                        // 1. Payment History
                                        const totalAccounts = accounts.length;
                                        const badAccounts = accounts.filter((a: any) => {
                                            // Check 1: Past Due Amount > 0
                                            const pastDue = parseInt(a.PastDueAmount || '0', 10);
                                            if (pastDue > 0) return true;

                                            // Check 2: Negative Account Status Keywords
                                            const status = (a.AccountStatus || '').toLowerCase();
                                            const badStatuses = ['written off', 'settled', 'suit filed', 'wilful default', 'sold', 'restructured'];
                                            if (badStatuses.some(s => status.includes(s))) return true;

                                            return false;
                                        }).length;
                                        const onTimePct = totalAccounts > 0 ? ((totalAccounts - badAccounts) / totalAccounts * 100).toFixed(0) : 100;

                                        // 2. Age
                                        let oldestDate = new Date();
                                        accounts.forEach((acc: any) => {
                                            if (acc.DateOpened) {
                                                const d = new Date(acc.DateOpened.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")); // Handle DD-MM-YYYY
                                                if (d < oldestDate) oldestDate = d;
                                            }
                                        });
                                        const ageYears = ((new Date().getTime() - oldestDate.getTime()) / (1000 * 60 * 60 * 24 * 365)).toFixed(1);

                                        // 3. Utilisation
                                        const cards = accounts.filter((a: any) => (a.AccountType || '').toLowerCase().includes('card'));
                                        let totalLimit = 0;
                                        let totalBal = 0;
                                        cards.forEach((c: any) => {
                                            totalLimit += parseInt(c.CreditLimit || c.HighCredit || '0', 10);
                                            // Ignore negative balances (refunds/overpayments) for utilization calc
                                            const bal = parseInt(c.Balance || '0', 10);
                                            totalBal += Math.max(0, bal);
                                        });
                                        const util = totalLimit > 0 ? ((totalBal / totalLimit) * 100).toFixed(0) : 0;

                                        const insightsData = [
                                            {
                                                id: 'payment_history',
                                                label: 'Payment History',
                                                value: `${onTimePct}% On Time`,
                                                status: onTimePct === '100' ? 'Excellent' : 'Needs Work',
                                                details: (
                                                    <div className="mt-4 bg-gray-50 p-4 rounded-lg text-sm">
                                                        <p className="mb-2 text-gray-700">You have <strong>{totalAccounts}</strong> credit accounts.</p>
                                                        <p className={`font-semibold ${badAccounts === 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                            {badAccounts === 0 ? "All payments have been made on time." : `You have missed payments on ${badAccounts} accounts.`}
                                                        </p>
                                                    </div>
                                                )
                                            },
                                            {
                                                id: 'utilization',
                                                label: 'Credit Card Utilisation',
                                                value: `${util}%`,
                                                status: parseInt(util as string) < 30 ? 'Excellent' : 'High',
                                                details: (
                                                    <div className="mt-4 bg-gray-50 p-4 rounded-lg text-sm">
                                                        <div className="flex justify-between mb-2">
                                                            <span className="text-gray-600">Total Credit Limit:</span>
                                                            <span className="font-semibold">₹{totalLimit.toLocaleString('en-IN')}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Total Used:</span>
                                                            <span className="font-semibold">₹{totalBal.toLocaleString('en-IN')}</span>
                                                        </div>
                                                        <p className="mt-2 text-xs text-gray-500">Ideally, keep this below 30%.</p>
                                                    </div>
                                                )
                                            },
                                            {
                                                id: 'age',
                                                label: 'Credit Age',
                                                value: `${ageYears === '0.0' ? 'New' : ageYears + ' Yrs'}`,
                                                status: parseFloat(ageYears as string) > 3 ? 'Excellent' : 'Fair',
                                                details: (
                                                    <div className="mt-4 bg-gray-50 p-4 rounded-lg text-sm">
                                                        <p className="text-gray-700">Your oldest credit account was opened on:</p>
                                                        <p className="font-bold text-gray-900 mt-1">{oldestDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                                        <p className="text-xs text-gray-500 mt-2">A longer credit history helps boost your score.</p>
                                                    </div>
                                                )
                                            },
                                            {
                                                id: 'accounts',
                                                label: 'Total Accounts',
                                                value: totalAccounts.toString(),
                                                status: 'Info',
                                                details: (
                                                    <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                                                        <div className="space-y-3">
                                                            {accounts.slice(0, 5).map((acc: any, idx: number) => (
                                                                <div key={idx} className="flex justify-between text-sm border-b border-gray-200 pb-2 last:border-0">
                                                                    <div>
                                                                        <div className="font-medium text-gray-800">{acc.Institution}</div>
                                                                        <div className="text-xs text-gray-500">{acc.AccountType}</div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <div className="font-mono font-medium">₹{parseInt(acc.Balance).toLocaleString('en-IN')}</div>
                                                                        <div className={`text-xs ${acc.AccountStatus === 'Standard' || acc.AccountStatus === 'Active' ? 'text-green-600' : 'text-red-500'}`}>{acc.AccountStatus}</div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            {accounts.length > 5 && <p className="text-xs text-center text-blue-600 cursor-pointer">View all via 'Download Report'</p>}
                                                        </div>
                                                    </div>
                                                )
                                            },
                                            {
                                                id: 'enquiries',
                                                label: 'Recent Enquiries',
                                                value: enquiries.length.toString(),
                                                status: enquiries.length === 0 ? 'Excellent' : 'Fair',
                                                details: (
                                                    <div className="mt-4 bg-gray-50 p-4 rounded-lg text-sm">
                                                        {enquiries.length === 0 ? (
                                                            <p className="text-gray-500">No recent enquiries found.</p>
                                                        ) : (
                                                            <div className="space-y-2">
                                                                {enquiries.map((enq: any, idx: number) => (
                                                                    <div key={idx} className="flex justify-between border-b border-gray-200 pb-2 last:border-0">
                                                                        <span className="font-medium text-gray-700">{enq.Institution}</span>
                                                                        <span className="text-gray-500 text-xs">{enq.DateReported}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                )
                                            }
                                        ];

                                        return insightsData.map((item, i) => (
                                            <div
                                                key={i}
                                                onClick={() => setExpandedInsight(expandedInsight === item.id ? null : item.id)}
                                                className="bg-white border border-gray-200 rounded-xl transition-all cursor-pointer hover:border-blue-300 overflow-hidden"
                                            >
                                                <div className="flex items-center justify-between p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${expandedInsight === item.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-50 text-gray-500'}`}>
                                                            {i + 1}
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-gray-900">{item.label}</div>
                                                            <div className="text-xs text-gray-500">{item.value}</div>
                                                        </div>
                                                    </div>
                                                    <div className={`text-xs font-medium px-3 py-1 rounded-full ${item.status === 'Excellent' || item.status === 'Info' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'}`}>
                                                        {item.status}
                                                    </div>
                                                </div>

                                                {expandedInsight === item.id && (
                                                    <div className="border-t border-gray-100 p-4 animate-fadeIn">
                                                        {item.details}
                                                    </div>
                                                )}
                                            </div>
                                        ));
                                    })()}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* 2. Print View (Exact Replica of Reference Design) */}
                <div className="print-view hidden bg-white mx-auto font-sans text-gray-800">
                    <style>{`
@media print {
    @page { size: A4 portrait; margin: 0; }
    body { -webkit-print-color-adjust: exact; background: white; }
    /* Removed fixed min-height to prevent overflow-induced blank pages */
    .print-page { padding: 40px; box-sizing: border-box; width: 100%; position: relative; } 
    .print-break { break-before: page; }
    .gradient-text { background: linear-gradient(90deg, #d53f8c, #f687b3); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 800; }
    .gauge-arc { stroke-dasharray: 471; stroke-dashoffset: 471; transform-origin: center; transform: rotate(135deg); }
}
`}</style>

                    {/* --- PAGE 1: SCORE DASHBOARD --- */}
                    <div className="print-page flex flex-col items-center">
                        {/* Header */}
                        <div className="w-full flex justify-between items-start mb-12">
                            <img src="/images/bankscart_logo_full.png" alt="BanksCart" className="h-10 object-contain" />
                            <div className="text-right">
                                <h1 className="text-2xl font-bold"><span className="text-indigo-900">CREDIT</span> <span className="text-pink-500">Health Report</span></h1>
                                <div className="text-[10px] text-gray-500 mt-1 font-semibold">
                                    Enquiry Control Number (ECN): 10278648182<br />
                                    Report Date: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </div>
                            </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">Hey {displayName.split(' ')[0]},</h2>
                        <h3 className="text-xl font-bold text-slate-900 mb-8">Here is your Credit Health Report</h3>

                        <p className="text-xs text-blue-400 font-bold tracking-widest uppercase mb-8">POWERED BY Equifax</p>

                        <GaugeChart score={parseInt(displayScore)} />

                        {/* Dynamic Score Insights (PaisaBazaar Style) */}
                        <div className="flex flex-col items-center justify-center mb-8">
                            <div className="bg-slate-100/80 text-slate-600 font-bold px-8 py-2 rounded-full text-xs uppercase tracking-wide mb-8">
                                Report Date : {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>

                            <div className="text-center max-w-lg">
                                {parseInt(displayScore) >= 750 ? (
                                    <>
                                        <h4 className="text-xl font-bold text-blue-900 mb-2">Excellent Work!</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                            Your credit health is in great shape. You are eligible for the best loan and credit card offers.
                                            Keep maintaining your healthy financial habits!
                                        </p>
                                    </>
                                ) : parseInt(displayScore) >= 700 ? (
                                    <>
                                        <h4 className="text-xl font-bold text-blue-900 mb-2">You are doing Good!</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                            Your credit score is good, but there is still room for improvement.
                                            Review your report to see what factors are affecting your score.
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <h4 className="text-xl font-bold text-blue-900 mb-2">You can do better!</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                            Your credit health needs attention. You will be ineligible for most loan and credit card offers.
                                            Check your Credit Health Report & learn to build an excellent score.
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>


                        {/* Score Factors (New Section) */}
                        {cirData?.ScoreDetails?.[0]?.ScoringElements && (
                            <div className="w-full max-w-lg mt-8">
                                <h4 className="text-sm font-bold text-slate-700 mb-4 text-center uppercase tracking-wide">Key Factors affecting your Score</h4>
                                <div className="space-y-3">
                                    {cirData.ScoreDetails[0].ScoringElements.map((factor: any, idx: number) => (
                                        <div key={idx} className="flex items-start gap-3 bg-red-50 p-3 rounded-lg border border-red-100">
                                            <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-bold text-red-800">{factor.Description}</p>
                                                {/* <p className="text-[10px] text-red-600 mt-1">Impact: High</p> */}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>



                    {/* --- PAGE 2: PROFILE DETAILS --- */}
                    <div className="print-page print-break">
                        <div className="w-full flex justify-between items-start mb-8 border-b-2 border-blue-50 pb-4">
                            <img src="/images/bankscart_logo_full.png" alt="BanksCart" className="h-8 object-contain" />
                            <div className="text-right text-[10px] text-gray-500 font-semibold">
                                <span className="text-pink-500 font-bold">Credit Health Report</span>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-slate-800 mb-6">Profile Details</h2>

                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                <UserIcon className="h-3 w-3 mr-1" />
                            </div>
                            <span className="font-bold text-lg text-slate-800">{displayName}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-8 bg-white p-6 rounded-xl border border-gray-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                            <div>
                                <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Gender</p>
                                <p className="text-sm font-bold text-slate-900">MALE</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">Email</p>
                                <p className="text-sm font-bold text-slate-900">{userData?.email || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">DOB</p>
                                <p className="text-sm font-bold text-slate-900">{displayDob}</p>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase text-slate-400 font-bold mb-1">PAN Card Number</p>
                                <p className="text-sm font-bold text-slate-900">{displayPan}</p>
                            </div>
                        </div>

                        <h4 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-2">
                            <Smartphone className="h-4 w-4 text-purple-700" /> Mobile Information
                        </h4>
                        <div className="border border-purple-100 rounded-lg overflow-hidden mb-8">
                            <table className="w-full text-xs">
                                <thead className="bg-purple-700 text-white font-bold">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Mobile Number</th>
                                        <th className="px-4 py-2 text-left">Reported Date</th>
                                        <th className="px-4 py-2 text-left">Type</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {(cirData?.IDAndContactInfo?.PhoneInfo || []).length > 0 ? (
                                        cirData.IDAndContactInfo.PhoneInfo.map((phone: any, idx: number) => (
                                            <tr key={idx} className="border-b border-purple-50 last:border-0 hover:bg-purple-50">
                                                <td className="px-4 py-3 font-semibold text-slate-900">{phone.Number || 'N/A'}</td>
                                                <td className="px-4 py-3 text-slate-600">{phone.ReportedDate || 'N/A'}</td>
                                                <td className="px-4 py-3 text-slate-600">{phone.Type || 'N/A'}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="px-4 py-3 text-slate-500" colSpan={3}>No mobile information found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <h4 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-purple-700" /> Address Information
                        </h4>
                        <div className="border border-purple-100 rounded-lg overflow-hidden mb-8">
                            <table className="w-full text-xs">
                                <thead className="bg-purple-700 text-white font-bold">
                                    <tr>
                                        <th className="px-4 py-2 text-left w-1/2">Address</th>
                                        <th className="px-4 py-2 text-left">State</th>
                                        <th className="px-4 py-2 text-left">Postal Code</th>
                                        <th className="px-4 py-2 text-left">Type</th>
                                        <th className="px-4 py-2 text-left">Reported Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {(cirData?.IDAndContactInfo?.AddressInfo || []).length > 0 ? (
                                        cirData.IDAndContactInfo.AddressInfo.map((addr: any, idx: number) => (
                                            <tr key={idx} className="border-b border-purple-50 last:border-0 hover:bg-purple-50">
                                                <td className="px-4 py-3 text-slate-700 leading-relaxed font-medium">{addr.Address}</td>
                                                <td className="px-4 py-3 text-slate-600">{addr.State || 'N/A'}</td>
                                                <td className="px-4 py-3 text-slate-600">{addr.Postal || 'N/A'}</td>
                                                <td className="px-4 py-3 text-slate-600">{addr.Type || 'Residence'}</td>
                                                <td className="px-4 py-3 text-slate-600">{addr.ReportedDate || 'N/A'}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="px-4 py-3 text-slate-500" colSpan={5}>No address details available.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Email Information Table - Added as requested */}
                        <h4 className="font-bold text-sm text-slate-800 mb-3 flex items-center gap-2">
                            <Mail className="h-4 w-4 text-purple-700" /> Email Address Information
                        </h4>
                        <div className="border border-purple-100 rounded-lg overflow-hidden">
                            <table className="w-full text-xs">
                                <thead className="bg-purple-700 text-white font-bold">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Email ID</th>
                                        <th className="px-4 py-2 text-left">Reported Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {cirData?.IDAndContactInfo?.EmailAddressInfo || cirData?.IDAndContactInfo?.EmailInfo ? (
                                        (cirData.IDAndContactInfo.EmailAddressInfo || cirData.IDAndContactInfo.EmailInfo).map((email: any, idx: number) => (
                                            <tr key={idx} className="border-b border-purple-50 last:border-0 hover:bg-purple-50">
                                                <td className="px-4 py-3 font-semibold text-slate-900">{email.EmailAddress || 'N/A'}</td>
                                                <td className="px-4 py-3 text-slate-600">{email.ReportedDate || 'N/A'}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            {/* Fallback to user data if only one email exists in auth but not report */}
                                            <td className="px-4 py-3 font-semibold text-slate-900">{userData?.email || 'N/A'}</td>
                                            <td className="px-4 py-3 text-slate-600">Current</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>


                    {/* --- PAGE 3: RETAIL ACCOUNTS SUMMARY --- */}
                    <div className="print-page print-break">
                        <div className="w-full flex justify-between items-start mb-8 border-b-2 border-blue-50 pb-4">
                            <img src="/images/bankscart_logo_full.png" alt="BanksCart" className="h-8 object-contain" />
                            <div className="text-right text-[10px] text-gray-500 font-semibold">
                                <span className="text-pink-500 font-bold">Credit Health Report</span>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-purple-800 mb-6">Retail Accounts Summary</h2>

                        {cirData?.RetailAccountsSummary ? (
                            <div className="border border-purple-100 rounded-lg overflow-hidden mb-8">
                                <table className="w-full text-xs">
                                    <thead className="bg-purple-700 text-white font-bold">
                                        <tr>
                                            <th className="px-4 py-3 text-left w-1/2">Detail</th>
                                            <th className="px-4 py-3 text-left">Value</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {[
                                            { label: 'Number of Accounts', key: 'NoOfAccounts' },
                                            { label: 'Number of Active Accounts', key: 'NoOfActiveAccounts' },
                                            { label: 'Number of Write Offs', key: 'NoOfWriteOffs' },
                                            { label: 'Total Past Due', key: 'TotalPastDue' },
                                            { label: 'Most Severe Status Within 24 Months', key: 'MostSevereStatusWithIn24Months' },
                                            { label: 'Single Highest Credit', key: 'SingleHighestCredit' },
                                            { label: 'Single Highest Sanction Amount', key: 'SingleHighestSanctionAmount' },
                                            { label: 'Total High Credit', key: 'TotalHighCredit' },
                                            { label: 'Average Open Balance', key: 'AverageOpenBalance' },
                                            { label: 'Single Highest Balance', key: 'SingleHighestBalance' },
                                            { label: 'Number of Past Due Accounts', key: 'NoOfPastDueAccounts' },
                                            { label: 'Number of Zero Balance Accounts', key: 'NoOfZeroBalanceAccounts' },
                                            { label: 'Recent Account', key: 'RecentAccount' },
                                            { label: 'Oldest Account', key: 'OldestAccount' },
                                            { label: 'Total Balance Amount', key: 'TotalBalanceAmount' },
                                            { label: 'Total Sanction Amount', key: 'TotalSanctionAmount' },
                                            { label: 'Total Credit Limit', key: 'TotalCreditLimit' },
                                            { label: 'Total Monthly Payment Amount', key: 'TotalMonthlyPaymentAmount' },
                                        ].map((item, idx) => (
                                            <tr key={idx} className="border-b border-purple-50 last:border-0 hover:bg-purple-50 odd:bg-purple-50/10">
                                                <td className="px-4 py-3 text-slate-700 font-medium">{item.label}</td>
                                                <td className="px-4 py-3 font-semibold text-slate-900">
                                                    {cirData.RetailAccountsSummary[item.key] !== undefined
                                                        ? cirData.RetailAccountsSummary[item.key]
                                                        : '0'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                                <p>Retail Account Summary not available in this report.</p>
                            </div>
                        )}
                    </div>

                    {/* --- PAGE 4: DETAILED PAYMENT HISTORY --- */}
                    <div className="print-page print-break">
                        <div className="w-full flex justify-between items-start mb-8 border-b-2 border-blue-50 pb-4">
                            <img src="/images/bankscart_logo_full.png" alt="BanksCart" className="h-8 object-contain" />
                            <div className="text-right text-[10px] text-gray-500 font-semibold">
                                <span className="text-pink-500 font-bold">Credit Health Report</span>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-slate-900 mb-4">Payment History</h2>
                        <p className="text-xs text-slate-500 mb-8 leading-relaxed">
                            Missing payments can affect your reputation with lenders. To improve, pay what's owed, set up reminders, and seek creditor help if needed.
                            Monitor your credit report for accuracy, pay on time, and build a positive credit history.
                        </p>

                        <h3 className="text-sm font-bold text-slate-800 mb-6">{accounts.length} Accounts</h3>

                        {accounts.map((acc: any, i: number) => (
                            <div key={i} className="mb-10 last:mb-0">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-8 w-8 bg-red-100 rounded flex items-center justify-center text-red-600 font-bold text-xs">
                                        {acc.Institution?.charAt(0)}
                                    </div>
                                    <h4 className="font-bold text-blue-900 uppercase text-sm">{acc.Institution}</h4>
                                </div>

                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-semibold text-slate-700">Product Type - {acc.AccountType}</span>
                                    <span className="text-xs font-bold text-slate-500">Status: <span className={acc.AccountStatus === 'Closed' ? 'text-slate-500' : 'text-green-600'}>{acc.AccountStatus}</span></span>
                                </div>

                                <div className="grid grid-cols-3 gap-1 bg-slate-50 p-1 rounded-lg border border-slate-200 mb-4 text-[10px]">
                                    {[
                                        { label: 'Account Number', val: acc.AccountNumber || 'N/A' },
                                        { label: 'Institution', val: acc.Institution || 'N/A' },
                                        { label: 'Account Type', val: acc.AccountType || 'N/A' },
                                        { label: 'Ownership Type', val: acc.OwnershipType || 'N/A' },
                                        { label: 'Balance', val: acc.Balance ? `₹${acc.Balance}` : 'N/A' },
                                        { label: 'Past Due Amount', val: acc.PastDueAmount ? `₹${acc.PastDueAmount}` : '0' },
                                        { label: 'Last Payment', val: acc.LastPayment ? `₹${acc.LastPayment}` : 'N/A' },
                                        { label: 'Open', val: acc.Open || 'N/A' },
                                        { label: 'Sanction Amount', val: acc.SanctionAmount ? `₹${acc.SanctionAmount}` : 'N/A' },
                                        { label: 'Last Payment Date', val: acc.LastPaymentDate || 'N/A' },
                                        { label: 'Date Reported', val: acc.DateReported || 'N/A' },
                                        { label: 'Date Opened', val: acc.DateOpened || 'N/A' },
                                        { label: 'Repayment Tenure', val: acc.RepaymentTenure || 'N/A' },
                                        { label: 'Installment Amount', val: acc.InstallmentAmount ? `₹${acc.InstallmentAmount}` : 'N/A' },
                                        { label: 'Term Frequency', val: acc.TermFrequency || 'N/A' },
                                        { label: 'Collateral Type', val: acc.CollateralType || 'N/A' },
                                        { label: 'Account Status', val: acc.AccountStatus || 'N/A' },
                                        { label: 'Source', val: acc.source || 'N/A' },
                                    ].map((field, idx) => (
                                        <div key={idx} className="bg-white p-2 rounded flex flex-col justify-center">
                                            <span className="text-slate-400 font-bold mb-1">{field.label}</span>
                                            <span className="font-bold text-slate-800 truncate">{field.val}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-slate-50/50 rounded-lg p-3 border border-slate-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <h5 className="text-[10px] font-bold text-blue-900">Payment History</h5>
                                        <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-600">Payment Delayed by: 0 days</span>
                                    </div>
                                    <div className="flex items-center justify-between text-[9px] text-slate-400 uppercase font-bold px-2 mb-2">
                                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                                    </div>
                                    <div className="flex items-center justify-between px-2 mb-2">
                                        {Array(12).fill(0).map((_, k) => (
                                            <div key={k} className="h-4 w-4 rounded-full border border-green-500 flex items-center justify-center text-green-600">
                                                <CheckCircle className="h-3 w-3" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- PAGE 5: ENQUIRIES & EMPLOYMENT --- */}
                    <div className="print-page print-break">
                        <div className="w-full flex justify-between items-start mb-8 border-b-2 border-blue-50 pb-4">
                            <img src="/images/bankscart_logo_full.png" alt="BanksCart" className="h-8 object-contain" />
                            <div className="text-right text-[10px] text-gray-500 font-semibold">
                                <span className="text-pink-500 font-bold">Credit Health Report</span>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-slate-900 mb-4">Credit Enquiries</h2>
                        <p className="text-xs text-slate-500 mb-6">
                            Credit enquiries are when lenders checks your credit history. They impact your credit score.
                            Your credit report and score were accessed <b>{(report?.credit_report?.CCRResponse?.CIRReportDataLst?.[0]?.CIRReportData?.EnquiryDetails || []).length} time(s)</b> by prospective lenders.
                        </p>

                        <div className="border border-slate-200 rounded-lg overflow-hidden mb-8">
                            <table className="w-full text-[10px]">
                                <thead className="bg-blue-50 text-blue-900 font-bold uppercase">
                                    <tr>
                                        <th className="px-3 py-3 text-left">Financial Institution</th>
                                        <th className="px-3 py-3 text-left">Product Type</th>
                                        <th className="px-3 py-3 text-left">Reported Date</th>
                                        <th className="px-3 py-3 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    {(report?.credit_report?.CCRResponse?.CIRReportDataLst?.[0]?.CIRReportData?.EnquiryDetails || []).map((enq: any, i: number) => (
                                        <tr key={i}>
                                            <td className="px-3 py-3 font-bold text-slate-800 uppercase">{enq.Institution}</td>
                                            <td className="px-3 py-3 text-slate-600">{enq.EnquiryReason}</td>
                                            <td className="px-3 py-3 text-slate-600">{enq.DateReported}</td>
                                            <td className="px-3 py-3 text-right font-mono font-bold text-slate-800">₹{enq.EnquiryAmount || '0'}</td>
                                        </tr>
                                    ))}
                                    {!(report?.credit_report?.CCRResponse?.CIRReportDataLst?.[0]?.CIRReportData?.EnquiryDetails) && (
                                        <tr><td colSpan={4} className="px-3 py-4 text-center text-slate-400">No enquiries found.</td></tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="bg-blue-50 rounded-lg p-4 flex gap-4 mb-12">
                            <div className="text-blue-500"><Lightbulb className="h-5 w-5" /></div>
                            <div>
                                <h5 className="text-sm font-bold text-blue-900 mb-1">Tip</h5>
                                <p className="text-[10px] text-blue-800 leading-relaxed">
                                    Multiple enquiries in a short time may suggest credit-hungry behavior and riskiness to lenders, potentially harming your creditworthiness.
                                </p>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-slate-900 mb-4">Employment Details</h2>
                        <div className="border border-slate-200 rounded-lg overflow-hidden mb-8">
                            <table className="w-full text-[10px]">
                                <thead className="bg-blue-50 text-blue-900 font-bold uppercase">
                                    <tr>
                                        <th className="px-3 py-3 text-left">Employment Type</th>
                                        <th className="px-3 py-3 text-left">Employer Name</th>
                                        <th className="px-3 py-3 text-right">Monthly Income</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 bg-white">
                                    <tr>
                                        <td className="px-3 py-3 font-bold text-slate-800">{userData?.employmentDetails?.type || 'Salaried'}</td>
                                        <td className="px-3 py-3 text-slate-600 uppercase">
                                            {userData?.employmentDetails?.employerName || userData?.employmentDetails?.businessName || userData?.employmentDetails?.companyName || '-'}
                                        </td>
                                        <td className="px-3 py-3 text-right font-mono font-bold text-slate-800">
                                            ₹{userData?.employmentDetails?.monthlyIncome || '0'}
                                        </td>
                                    </tr>
                                    {report?.credit_report?.CCRResponse?.CIRReportDataLst?.[0]?.CIRReportData?.EmploymentDetails?.map((emp: any, k: number) => (
                                        <tr key={99 + k}>
                                            <td className="px-3 py-3 font-bold text-slate-800">{emp.OccupationCode}</td>
                                            <td className="px-3 py-3 text-slate-600 uppercase">-</td>
                                            <td className="px-3 py-3 text-right font-mono font-bold text-slate-800">{emp.NetAnnualIncome}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* --- PAGE 6: DISPUTE & DISCLAIMER --- */}
                    <div className="print-page print-break">
                        <div className="w-full flex justify-between items-start mb-8 border-b-2 border-blue-50 pb-4">
                            <img src="/images/bankscart_logo_full.png" alt="BanksCart" className="h-8 object-contain" />
                            <div className="text-right text-[10px] text-gray-500 font-semibold">
                                <span className="text-pink-500 font-bold">Credit Health Report</span>
                            </div>
                        </div>

                        <h2 className="text-xl font-bold text-slate-900 mb-6">Raise a Dispute to Equifax</h2>
                        <h4 className="text-xs font-bold text-slate-600 mb-4">Please follow the below-mentioned steps to enter the dispute resolution form on the Equifax portal.</h4>

                        <ul className="list-disc pl-4 space-y-3 text-[10px] text-slate-600 leading-relaxed font-medium">
                            <li><span className="text-blue-600 font-bold underline cursor-pointer">Click Here</span> to raise a Dispute to Equifax.</li>
                            <li>Sign in by entering your <b>Email ID, Personal ID, DOB</b>, and other details, then click <b>Accept & Continue</b>.</li>
                            <li>If you already have an account, click on <b>Login</b> button (present at top right corner) and enter your <b>Username & Password</b>.</li>
                            <li>Enter the OTP sent to your registered <b>Email/Mobile</b> to sign in.</li>
                            <li>Click <b>Go to Dashboard</b>, then select <b>CIBIL Report</b> to view your latest credit report.</li>
                            <li>Scroll down and click <b>Raise a Dispute</b> at the bottom of the page.</li>
                            <li>Click on the <b>Account Section</b> to raise a dispute.</li>
                            <li>Choose the dispute type, click <b>Find Solution</b>, select the account, and click <b>Continue</b>.</li>
                            <li>Enter the correct information in the dispute form and click <b>Continue</b>.</li>
                        </ul>

                        <div className="h-px bg-slate-200 my-12"></div>

                        <h2 className="text-xl font-bold text-slate-900 mb-6">Disclaimer</h2>
                        <p className="text-[10px] text-slate-500 leading-6 text-justify">
                            All information contained in this credit report has been collated by Equifax Limited (Equifax) based on information provided/submitted by its various members ('Members'), as part of periodic data submission and Members are required to ensure accuracy, completeness and veracity of the information submitted. The credit report is generated using the proprietary search and match logic of Equifax. Equifax uses its best efforts to ensure accuracy, completeness and veracity of the information contained in the Report and shall only be liable and / or responsible if any discrepancies are directly attributable to Equifax. The use of this report is governed by the terms and conditions of the Operating Rules for Equifax and its Members.
                            <br /><br />
                            <i>In case of any discrepancy in Personal / Account Information pertaining to Loan Accounts / Credit Cards, concerned Financial Institutions / Credit Card Company (CCC) may also please be contacted for required clarification.</i>
                        </p>

                        <div className="absolute bottom-10 left-0 w-full px-10 flex justify-between text-[10px] text-blue-600 font-bold">
                            <div className="flex items-center gap-1"><span className="text-xl">↑</span> Back to Top</div>
                            <div className="flex items-center gap-1"><span className="text-xl">↑</span> Credit Factors</div>
                        </div>
                    </div>
                </div>
                {/* Loan Offer Popup */}
                {report?.credit_score && showOffer && (
                    <LoanOfferPopup
                        score={parseInt(report.credit_score)}
                        userData={userData}
                        onClose={() => setShowOffer(false)}
                    />
                )}
            </>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center min-h-[400px] flex flex-col items-center justify-center">
            {/* Default View (No Report) */}
            <div className="h-24 w-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <ShieldCheck className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Check Your Free Credit Score</h2>
            <p className="text-gray-500 max-w-lg mx-auto mb-10 text-lg">
                Get a detailed analysis of your credit health, powered by Equifax. <br />
                <span className="text-green-600 font-medium">Safe, Secure & No Impact on Score.</span>
            </p>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 max-w-md w-full flex items-center gap-3 text-left border border-red-100">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm font-medium">{error}</p>
                </div>
            )}

            <button
                onClick={handleCheckScore}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold px-10 py-5 rounded-2xl shadow-xl shadow-blue-200 transition-all hover:scale-105 flex items-center gap-3 text-lg"
            >
                <TrendingUp className="h-6 w-6" />
                Check Free Cibil Score Now
            </button>
            <div className="flex items-center gap-6 mt-8 text-sm text-gray-400">
                <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> Bank Grade Security</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> Instant Report</span>
            </div>

            <MissingDetailsModal
                isOpen={isMissingDetailsModalOpen}
                onClose={() => setIsMissingDetailsModalOpen(false)}
                userData={userData}
                onSuccess={handleModalSuccess}
            />
        </div>
    );
};

// --- HELPER COMPONENT: Loan Offer Popup (Premium/Paisabazaar Style) ---
const LoanOfferPopup = ({ score, userData, onClose }: { score: number, userData: any, onClose: () => void }) => {
    const [step, setStep] = useState<'offer' | 'success'>('offer');
    const [loading, setLoading] = useState(false);

    // Loan Calculation Logic
    // Access nested employmentDetails.monthlyIncome
    const salary = userData?.employmentDetails?.monthlyIncome
        ? parseInt(userData.employmentDetails.monthlyIncome.toString().replace(/,/g, ''))
        : 25000;
    const loanAmount = salary * 25;

    // EMI Calculation (Standard: 10.5% ROI, 60 Months)
    const annualRate = 9.97;
    const monthlyRate = annualRate / 12 / 100;
    const tenureMonths = 60;
    const emi = Math.round((loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1));

    const handleClaim = async () => {
        setLoading(true);
        try {
            const appId = typeof __app_id !== 'undefined' ? __app_id : import.meta.env.VITE_FIREBASE_PROJECT_ID || 'default-app-id';

            await addDoc(collection(db, `artifacts/${appId}/public/data/loanApplications`), {
                fullName: userData?.fullName || 'User',
                email: userData?.email || '',
                phoneNumber: userData?.mobileNumber || '',
                loanType: 'Personal Loan (Pre-Approved)',
                desiredAmount: loanAmount,
                userId: userData?.uid || 'guest',
                timestamp: serverTimestamp(),
                status: 'Pending',
                source: 'Credit Report Popup (Premium)'
            });

            setStep('success');
        } catch (error) {
            console.error("Error claiming offer:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (score <= 690) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300 font-sans">
            {step === 'offer' ? (
                <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden relative animate-in slide-in-from-bottom-5 duration-500">

                    {/* --- Confetti / Celebration Header Pattern --- */}
                    <div className="absolute top-0 left-0 w-full h-32 overflow-hidden pointer-events-none opacity-30">
                        <div className="absolute top-0 left-1/4 w-4 h-4 bg-red-400 rounded-full animate-bounce delay-100"></div>
                        <div className="absolute top-4 left-3/4 w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-300"></div>
                        <div className="absolute top-8 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-700"></div>
                        {/* CSS Radial Gradient for 'Glow' */}
                        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-yellow-100/50 rounded-full blur-3xl"></div>
                    </div>

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <div className="pt-12 pb-8 px-8 text-center relative z-0">

                        {/* --- Icon --- */}
                        <div className="mx-auto w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mb-6 shadow-sm ring-4 ring-yellow-50/50">
                            <Gift className="h-10 w-10 text-yellow-600 drop-shadow-sm" />
                        </div>

                        {/* --- Title --- */}
                        <h2 className="text-2xl font-bold text-slate-800 mb-1 leading-tight">
                            Congratulations! <br /> You are Pre-Approved
                        </h2>
                        <p className="text-sm text-slate-500 font-medium mb-6">
                            Based on your excellent credit score of <span className="text-slate-800 font-bold">{score}</span>
                        </p>

                        {/* --- Amount --- */}
                        <div className="mb-8">
                            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">Pre-Approved Limit</p>
                            <h1 className="text-5xl font-extrabold text-slate-900 tracking-tighter">
                                <span className="text-3xl font-bold align-top text-slate-400 mr-1">₹</span>
                                {loanAmount.toLocaleString('en-IN')}
                            </h1>
                        </div>

                        {/* --- Offer Grid --- */}
                        <div className="grid grid-cols-3 gap-3 mb-8">
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <p className="text-[10px] text-slate-400 font-semibold uppercase mb-1">Interest</p>
                                <p className="text-sm font-bold text-green-600">9.97%</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <p className="text-[10px] text-slate-400 font-semibold uppercase mb-1">Tenure</p>
                                <p className="text-sm font-bold text-slate-700">60 Mo</p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <p className="text-[10px] text-slate-400 font-semibold uppercase mb-1">EMI</p>
                                <p className="text-sm font-bold text-slate-700">₹{emi.toLocaleString('en-IN')}</p>
                            </div>
                        </div>

                        {/* --- CTA --- */}
                        <div className="space-y-4">
                            <button
                                onClick={handleClaim}
                                disabled={loading}
                                className="group relative w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-lg shadow-blue-200 overflow-hidden transform hover:-translate-y-0.5 transition-all active:scale-[0.98]"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <>Claim This Offer <ChevronRight className="h-5 w-5 opacity-80" /></>}
                                </span>
                                {/* Shine Effect */}
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shine_1s_infinite]"></div>
                            </button>

                            <button onClick={onClose} className="text-sm text-slate-400 hover:text-slate-600 font-medium transition-colors">
                                Remind me later
                            </button>
                        </div>
                    </div>

                    {/* --- Trust Badge Footer --- */}
                    <div className="bg-slate-50 border-t border-slate-100 py-3 px-6 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium uppercase tracking-wide">
                        <ShieldCheck className="h-3 w-3 text-slate-400" />
                        <span>Powered by BanksCart • 100% Paperless Process</span>
                    </div>

                </div>
            ) : (
                <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-10 text-center animate-in zoom-in duration-300 relative overflow-hidden">
                    {/* Success Background Decor */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>

                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 ring-4 ring-green-50/50">
                        <CheckCircle className="h-10 w-10 text-green-500" />
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Offer Claimed!</h3>
                    <p className="text-slate-500 mb-8 leading-relaxed">
                        Our executive will connect with you shortly to verify details and disburse <span className="font-bold text-slate-900">₹{loanAmount.toLocaleString('en-IN')}</span>.
                    </p>

                    <button
                        onClick={onClose}
                        className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                    >
                        Back to Report
                    </button>
                </div>
            )}

            {/* Custom Keyframes for Shine Effect (Verify if tailwind config has this, otherwise standard animation class might be needed) */}
            <style>{`
                @keyframes shine {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    );
};

export default CreditScoreTab;
