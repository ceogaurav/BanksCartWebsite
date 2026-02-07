import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Loader2, User, Mail, Phone, MapPin, Building2, Briefcase, IndianRupee, CreditCard } from 'lucide-react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase'; // Adjust path if needed
import { useAuth } from '../../context/AuthContext'; // Adjust path
import CustomSelect from '../common/CustomSelect'; // Adjust path

interface MissingDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    userData: any;
    onSuccess: () => void; // Triggered after successful save
}

const MissingDetailsModal: React.FC<MissingDetailsModalProps> = ({ isOpen, onClose, userData, onSuccess }) => {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);

    // State for all potential missing fields
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [loanType, setLoanType] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [empType, setEmpType] = useState('');
    const [income, setIncome] = useState(''); // Monthly Income OR Turnover based on type

    // Identify which fields are actually missing to conditionally render
    const [missingFields, setMissingFields] = useState<string[]>([]);

    useEffect(() => {
        if (isOpen) {
            const data = userData || {};
            const missing = [];

            // Check top-level fields
            if (!data.fullName) missing.push('fullName');
            if (!data.email) missing.push('email');
            if (!data.mobileNumber) missing.push('mobileNumber');
            if (!data.loanType) missing.push('loanType');

            // Check nested objects safely
            if (!data.addressDetails?.pincode) missing.push('pincode');
            if (!data.addressDetails?.city) missing.push('city');
            if (!data.employmentDetails?.type) missing.push('empType');

            // Income check
            const incomeVal = data.employmentDetails?.monthlyIncome || data.employmentDetails?.turnover;
            if (!incomeVal) missing.push('income');

            setMissingFields(missing);

            // Pre-fill existing data to avoid re-typing
            setFullName(data.fullName || currentUser?.displayName || '');
            setEmail(data.email || currentUser?.email || '');
            setMobileNumber(data.mobileNumber || currentUser?.phoneNumber?.replace('+91', '') || '');
            setLoanType(data.loanType || '');
            setPincode(data.addressDetails?.pincode || '');
            setCity(data.addressDetails?.city || '');
            setEmpType(data.employmentDetails?.type || '');
            setIncome(data.employmentDetails?.monthlyIncome || data.employmentDetails?.turnover || '');
        }
    }, [isOpen, userData, currentUser]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) return;
        setLoading(true);

        try {
            const userRef = doc(db, 'users', currentUser.uid);

            // Construct update object - verify we don't overwrite existing good data if possible, 
            // but here we rely on the state being pre-filled with existing data if it was there.

            const updates: any = {};

            // Top level
            if (missingFields.includes('fullName')) updates.fullName = fullName;
            if (missingFields.includes('email')) updates.email = email;
            if (missingFields.includes('mobileNumber')) updates.mobileNumber = mobileNumber;
            if (missingFields.includes('loanType')) updates.loanType = loanType;

            // Address
            if (missingFields.includes('pincode') || missingFields.includes('city')) {
                updates.addressDetails = {
                    ...userData?.addressDetails, // Keep other existing address fields
                    pincode: pincode,
                    city: city
                };
            }

            // Employment
            if (missingFields.includes('empType') || missingFields.includes('income')) {
                const isSalaried = empType === 'Salaried';
                updates.employmentDetails = {
                    ...userData?.employmentDetails,
                    type: empType,
                    monthlyIncome: isSalaried ? income : null,
                    turnover: !isSalaried ? income : null, // Store as turnover if business
                };
            }

            updates.updatedAt = new Date(); // Good practice

            await updateDoc(userRef, updates);

            onSuccess(); // Close and proceed
        } catch (error) {
            console.error("Error saving missing details:", error);
            // Optionally show error state
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    // Options
    const loanOptions = ['Personal Loan', 'Home Loan', 'Business Loan', 'Car Loan', 'Education Loan'];
    const empOptions = ['Salaried', 'Self Employed Business', 'Self Employed Professional'];

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 font-sans animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Complete Your Profile</h3>
                        <p className="text-xs text-gray-500">Few details missing for Credit Score check.</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-200">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Personal */}
                        {missingFields.includes('fullName') && (
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
                                <div className="relative mt-1">
                                    <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none border-gray-200" placeholder="Your Name" required />
                                </div>
                            </div>
                        )}

                        {missingFields.includes('email') && (
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                                <div className="relative mt-1">
                                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none border-gray-200" placeholder="Email Address" required />
                                </div>
                            </div>
                        )}

                        {missingFields.includes('mobileNumber') && (
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase">Phone</label>
                                <div className="relative mt-1">
                                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <span className="absolute left-8 top-2.5 text-xs font-medium text-gray-500">+91</span>
                                    <input type="tel" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} className="w-full pl-14 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none border-gray-200" placeholder="Mobile Number" required maxLength={10} />
                                </div>
                            </div>
                        )}

                        {/* Loan Type */}
                        {missingFields.includes('loanType') && (
                            <CustomSelect
                                label="Desired Loan Type"
                                value={loanType}
                                onChange={setLoanType}
                                options={loanOptions.map(o => ({ value: o, label: o }))}
                                placeholder="Select Loan"
                                icon={CreditCard}
                            />
                        )}

                        {/* Address */}
                        {(missingFields.includes('pincode') || missingFields.includes('city')) && (
                            <div className="grid grid-cols-2 gap-3">
                                {missingFields.includes('pincode') && (
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase">Pincode</label>
                                        <div className="relative mt-1">
                                            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                            <input type="text" value={pincode} onChange={e => setPincode(e.target.value)} className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none border-gray-200" placeholder="Pincode" required maxLength={6} />
                                        </div>
                                    </div>
                                )}
                                {missingFields.includes('city') && (
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase">City</label>
                                        <div className="relative mt-1">
                                            <Building2 className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                            <input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none border-gray-200" placeholder="City" required />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Employment */}
                        {(missingFields.includes('empType') || missingFields.includes('income')) && (
                            <>
                                <CustomSelect
                                    label="Employment Type"
                                    value={empType}
                                    onChange={setEmpType}
                                    options={empOptions.map(o => ({ value: o, label: o }))}
                                    placeholder="Select Type"
                                    icon={Briefcase}
                                />

                                <div>
                                    <label className="text-xs font-semibold text-gray-500 uppercase">
                                        {empType === 'Salaried' ? 'Monthly Salary' : 'Annual Turnover'}
                                    </label>
                                    <div className="relative mt-1">
                                        <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                        <input type="number" value={income} onChange={e => setIncome(e.target.value)} className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none border-gray-200" placeholder={empType === 'Salaried' ? "e.g. 50000" : "e.g. 500000"} required />
                                    </div>
                                </div>
                            </>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.99] flex items-center justify-center gap-2 mt-4"
                        >
                            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Save & Continue'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MissingDetailsModal;
