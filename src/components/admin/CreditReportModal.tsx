import React, { useRef } from 'react';
import { X, Download, ShieldCheck, User, Calendar, MapPin, Phone, Mail, Award, AlertTriangle, CheckCircle, Smartphone } from 'lucide-react';
import { DeepVueCreditReportResponse } from '../../types/creditReport';

interface CreditReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    userData: any;
    score?: number;
    apiData?: DeepVueCreditReportResponse['data']; // Add support for real API data
}

const CreditReportModal: React.FC<CreditReportModalProps> = ({ isOpen, onClose, userData, score: propScore = 750, apiData }) => {
    const printRef = useRef<HTMLDivElement>(null);

    if (!isOpen) return null;

    // --- Data Parsing Logic ---
    // If apiData is present, extracting values from it. Otherwise fall back to props.

    // 1. Score
    const finalScore = apiData
        ? parseInt(apiData.credit_score || "0", 10)
        : propScore;

    // 2. Personal Info
    // API Structure: data.credit_report.CCRResponse.CIRReportDataLst[0].CIRReportData.IDAndContactInfo
    const cirData = apiData?.credit_report?.CCRResponse?.CIRReportDataLst?.[0]?.CIRReportData;
    const personalInfo = cirData?.IDAndContactInfo?.PersonalInfo;
    const identityInfo = cirData?.IDAndContactInfo?.IdentityInfo;
    const addressInfo = cirData?.IDAndContactInfo?.AddressInfo?.[0]; // Taking primary address

    const displayName = personalInfo?.Name?.FullName || userData?.fullName || 'N/A';
    const displayDob = personalInfo?.DateOfBirth || userData?.dob || 'N/A';
    const displayPhone = apiData?.mobile || userData?.phoneNumber || userData?.mobileNumber || 'N/A';
    const displayEmail = userData?.email || 'N/A'; // API doesn't seem to return email in top level
    const displayPan = identityInfo?.PANId?.[0]?.IdNumber || userData?.panNumber || 'N/A';
    const displayAddress = addressInfo ? `${addressInfo.Address}, ${addressInfo.Postal}` : 'Address not available';

    // 3. Accounts
    const accounts = cirData?.RetailAccountDetails || [];

    const handlePrint = () => {
        const printContent = printRef.current;
        if (printContent) {
            const originalContents = document.body.innerHTML;
            document.body.innerHTML = printContent.outerHTML;
            window.print();
            document.body.innerHTML = originalContents;
            window.location.reload();
        }
    };

    // Determine score health
    const getScoreHealth = (s: number) => {
        if (s >= 750) return { color: 'text-green-600', bg: 'bg-green-50', label: 'Excellent', message: 'You have a high probability of loan approval.' };
        if (s >= 700) return { color: 'text-blue-600', bg: 'bg-blue-50', label: 'Good', message: 'You have a good chance of getting approved.' };
        if (s >= 650) return { color: 'text-yellow-600', bg: 'bg-yellow-50', label: 'Fair', message: 'Loan approval may come with higher interest rates.' };
        return { color: 'text-red-600', bg: 'bg-red-50', label: 'Needs Improvement', message: 'Consider improving your credit utilization.' };
    };

    const health = getScoreHealth(finalScore);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999] p-4 font-inter overflow-y-auto">
            <div className="bg-gray-100 rounded-xl shadow-2xl w-full max-w-4xl relative flex flex-col max-h-[90vh]">
                {/* Header Actions */}
                <div className="bg-white p-4 border-b border-gray-200 flex justify-between items-center rounded-t-xl sticky top-0 z-10">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                        <ShieldCheck className="h-6 w-6 text-blue-600" />
                        Credit Report Preview
                    </h2>
                    <div className="flex gap-3">
                        <button
                            onClick={handlePrint}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
                        >
                            <Download className="h-4 w-4" />
                            Download PDF
                        </button>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto p-8" ref={printRef}>
                    <style>{`
                        @media print {
                            .print-header { position: fixed; top: 0; left: 0; width: 100%; background: white; z-index: 1000; padding-bottom: 20px; border-bottom: 2px solid #f1f5f9; }
                            .print-content-spacer { height: 100px; } /* Ensures content starts below header on first page */
                            body { -webkit-print-color-adjust: exact; }
                            /* For subsequent pages, the top margin from browser settings usually handles it, 
                               but fixed pos repeats on every page. */
                        }
                    `}</style>

                    {/* PRINT HEADER (Repears on every page due to fixed pos in print) */}
                    <div className="print-header hidden print:block text-center pt-4">
                        <img src="/images/bankscart_logo_full.png" alt="BanksCart Logo" className="h-16 mx-auto object-contain" />
                    </div>

                    {/* REPORT CONTAINER */}
                    <div className="bg-white max-w-3xl mx-auto p-8 shadow-sm border border-gray-200 min-h-[1000px] relative">
                        {/* Spacer for print header overlap */}
                        <div className="print-content-spacer hidden print:block"></div>

                        {/* Report Header */}
                        <div className="flex justify-between items-start border-b-2 border-slate-800 pb-6 mb-8">
                            <div>
                                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">CIBIL SCORE REPORT</h1>
                                <p className="text-slate-500 text-sm mt-1">Generated by BanksCart</p>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-semibold text-slate-700">Report Date</p>
                                <p className="text-lg font-bold text-slate-900">{new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <p className="text-xs text-slate-400 mt-1">Ref: {Math.random().toString(36).substring(7).toUpperCase()}</p>
                            </div>
                        </div>

                        {/* Score Section */}
                        <div className="bg-slate-50 rounded-2xl p-8 mb-8 border border-slate-100">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div className="flex-1">
                                    <h3 className="text-sm uppercase tracking-wider font-semibold text-slate-500 mb-2">Current CIBIL Score</h3>
                                    <div className="flex items-baseline gap-4">
                                        <span className={`text-6xl font-black ${health.color}`}>{finalScore}</span>
                                        <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide ${health.bg} ${health.color}`}>
                                            {health.label}
                                        </span>
                                    </div>
                                    <p className="text-slate-600 mt-4 leading-relaxed max-w-sm">
                                        {health.message}
                                    </p>
                                </div>

                                {/* SVG Gauge */}
                                <div className="relative w-48 h-48 flex-shrink-0">
                                    <svg className="w-full h-full" viewBox="0 0 100 100">
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            fill="none"
                                            stroke="#e2e8f0"
                                            strokeWidth="10"
                                        />
                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="45"
                                            fill="none"
                                            stroke={finalScore >= 750 ? '#16a34a' : finalScore >= 700 ? '#2563eb' : finalScore >= 650 ? '#ca8a04' : '#dc2626'}
                                            strokeWidth="10"
                                            strokeDasharray="283"
                                            strokeDashoffset={283 - (283 * (finalScore / 900))}
                                            strokeLinecap="round"
                                            transform="rotate(-90 50 50)"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                                        <ShieldCheck className={`h-10 w-10 ${health.color} mb-1`} />
                                        <span className="text-xs font-bold text-slate-400">out of 900</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* User Details Grid */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <User className="h-5 w-5 text-blue-600" />
                                Applicant Details
                            </h3>
                            <div className="grid grid-cols-2 gap-y-6 gap-x-12 border-t border-gray-100 pt-6">
                                <div>
                                    <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">Full Name</label>
                                    <p className="text-base font-medium text-slate-900 uppercase">{displayName}</p>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">PAN Number</label>
                                    <p className="text-base font-medium text-slate-900 font-mono tracking-wide">{displayPan}</p>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">Date of Birth</label>
                                    <p className="text-base font-medium text-slate-900">{displayDob}</p>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">Phone Number</label>
                                    <p className="text-base font-medium text-slate-900">{displayPhone}</p>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">Email Address</label>
                                    <p className="text-base font-medium text-slate-900">{displayEmail}</p>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase text-slate-400 font-semibold mb-1">Address</label>
                                    <p className="text-sm font-medium text-slate-900">{displayAddress}</p>
                                </div>
                            </div>
                        </div>

                        {/* Account Summary */}
                        <div className="mb-8">
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                <Award className="h-5 w-5 text-purple-600" />
                                Account Summary ({accounts.length})
                            </h3>
                            {accounts.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-slate-50 text-slate-500 font-semibold">
                                            <tr>
                                                <th className="px-4 py-3 rounded-l-lg">Institution</th>
                                                <th className="px-4 py-3">Type</th>
                                                <th className="px-4 py-3">Opened</th>
                                                <th className="px-4 py-3">Status</th>
                                                <th className="px-4 py-3 text-right rounded-r-lg">Balance</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-100">
                                            {accounts.map((acc, i) => (
                                                <tr key={i}>
                                                    <td className="px-4 py-3 font-medium text-slate-800">{acc.Institution}</td>
                                                    <td className="px-4 py-3 text-slate-600">{acc.AccountType}</td>
                                                    <td className="px-4 py-3 text-slate-600">{acc.DateOpened}</td>
                                                    <td className="px-4 py-3 flex items-center gap-1">
                                                        {acc.AccountStatus === 'Standard' || acc.AccountStatus === 'Active' ? (
                                                            <span className="text-green-600 flex items-center gap-1"><CheckCircle className="h-3 w-3" /> {acc.AccountStatus}</span>
                                                        ) : (
                                                            <span className="text-slate-500">{acc.AccountStatus}</span>
                                                        )}
                                                    </td>
                                                    <td className="px-4 py-3 text-right font-mono">₹{parseInt(acc.Balance).toLocaleString('en-IN')}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="bg-slate-50 rounded-lg p-6 text-center text-slate-500 text-sm">
                                    No account details found in this report.
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                            <p className="text-xs text-slate-400">
                                This report is confidential and intended for the named recipient only.
                                Data provided by DeepVue Tech.
                            </p>
                            <div className="mt-4 flex items-center justify-center gap-2 text-slate-300 font-bold text-lg">
                                <span>BanksCart</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditReportModal;
