import React, { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { User } from 'firebase/auth';
import { Briefcase, Building2, IndianRupee, User as UserIcon, Mail, Phone, MapPin, CreditCard } from 'lucide-react';
import PrimaryButton from '../common/PrimaryButton';
import CustomSelect from '../common/CustomSelect'; // Import new component

interface EmploymentDetailsProps {
    userData: any;
    user: User;
}

const EmploymentDetails: React.FC<EmploymentDetailsProps> = ({ userData, user }) => {
    // State for new fields
    const [fullName, setFullName] = useState(userData?.fullName || user?.displayName || '');
    const [email, setEmail] = useState(userData?.email || user?.email || '');
    const [mobileNumber, setMobileNumber] = useState(userData?.mobileNumber || user?.phoneNumber || '');

    const [loanType, setLoanType] = useState(userData?.loanType || '');
    const [pincode, setPincode] = useState(userData?.addressDetails?.pincode || '');
    const [city, setCity] = useState(userData?.addressDetails?.city || '');

    // Employment State
    const [empType, setEmpType] = useState(userData?.employmentDetails?.type || '');
    const [businessType, setBusinessType] = useState(userData?.employmentDetails?.businessType || '');
    const [businessName, setBusinessName] = useState(userData?.employmentDetails?.businessName || '');
    const [employerName, setEmployerName] = useState(userData?.employmentDetails?.employerName || '');
    const [monthlyIncome, setMonthlyIncome] = useState(userData?.employmentDetails?.monthlyIncome || '');
    const [turnover, setTurnover] = useState(userData?.employmentDetails?.turnover || '');

    const [loading, setLoading] = useState(false);

    // Sync state if userData changes (e.g. initial load)
    useEffect(() => {
        // Always prioritize existing profile data, fallback to auth data
        const displayEmail = userData?.email || user?.email || '';
        const displayName = userData?.fullName || user?.displayName || '';
        const displayPhone = userData?.mobileNumber || user?.phoneNumber || '';

        setFullName(displayName);
        setEmail(displayEmail);
        setMobileNumber(displayPhone);

        if (userData) {
            setLoanType(userData.loanType || '');
            setPincode(userData.addressDetails?.pincode || '');
            setCity(userData.addressDetails?.city || '');

            if (userData.employmentDetails) {
                setEmpType(userData.employmentDetails.type || '');
                setBusinessType(userData.employmentDetails.businessType || '');
                setBusinessName(userData.employmentDetails.businessName || '');
                setEmployerName(userData.employmentDetails.employerName || '');
                setMonthlyIncome(userData.employmentDetails.monthlyIncome || '');
                setTurnover(userData.employmentDetails.turnover || '');
            }
        }
    }, [userData, user]);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const userRef = doc(db, 'users', user.uid);
            await updateDoc(userRef, {
                fullName,
                email, // Note: This doesn't update Auth email, only Firestore record
                mobileNumber,
                loanType,
                addressDetails: {
                    pincode,
                    city
                },
                employmentDetails: {
                    type: empType,
                    // Conditionally save fields based on type to keep DB clean
                    businessType: (empType === 'Self Employed Business' || empType === 'Self Employed Professional') ? businessType : null,
                    businessName: empType === 'Self Employed Professional' ? businessName : null,
                    employerName: empType === 'Salaried' ? employerName : null,
                    monthlyIncome: empType === 'Salaried' ? monthlyIncome : null,
                    turnover: (empType === 'Self Employed Business' || empType === 'Self Employed Professional') ? turnover : null
                },
                updatedAt: new Date()
            });
            alert("Profile Updated Successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to update profile.");
        } finally {
            setLoading(false);
        }
    };

    const loanOptions = [
        'Personal Loan',
        'Home Loan',
        'Business Loan',
        'Car Loan',
        'Education Loan'
    ];

    const employmentOptions = [
        'Salaried',
        'Self Employed Business',
        'Self Employed Professional'
    ];

    const businessTypeOptions = [
        'Proprietor',
        'Partnership Firm',
        'Pvt Ltd company',
        'Director applying as an Individual',
        'Partner applying as an Individual',
        'Others - Business'
    ];

    const professionOptions = [
        'Doctor',
        'Lawyer',
        'Engineer',
        'Architect',
        'Chartered Accountant (CA)',
        'Company Secretary (CS)',
        'Consultant',
        'Other'
    ];


    return (
        <div className="p-0"> {/* Removed card styles for embedding */}
            <div className="flex items-center gap-3 mb-8 border-b border-gray-100 pb-4">
                <UserIcon className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-800">Profile Details</h3>
            </div>

            <div className="space-y-6">
                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Full Name</label>
                        <div className="relative">
                            <UserIcon className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium text-gray-700"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="email"
                                value={email}
                                readOnly
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed font-medium"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm text-gray-500 mb-1">Mobile Number</label>
                    <div className="relative">
                        <Phone className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                        <span className="absolute left-10 top-3.5 text-gray-500 font-medium pl-1 border-r border-gray-300 pr-2 h-5 flex items-center">+91</span>
                        <input
                            type="tel"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                            className="w-full pl-24 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium text-gray-700"
                            placeholder="9876543210"
                            maxLength={10}
                        />
                    </div>
                </div>

                {/* Loan & Location Details */}
                <div>
                    <CustomSelect
                        label="Desired Loan Type"
                        value={loanType}
                        onChange={setLoanType}
                        options={loanOptions}
                        placeholder="Select Loan Type"
                        icon={CreditCard}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">Pincode</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium text-gray-700"
                                placeholder="e.g. 560068"
                                maxLength={6}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-500 mb-1">City</label>
                        <div className="relative">
                            <Building2 className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium text-gray-700"
                                placeholder="e.g. Bengaluru"
                            />
                        </div>
                    </div>
                </div>

                {/* Employment Details Section Divider */}
                <div className="border-t border-gray-100 pt-6 mt-2">
                    <div className="flex items-center gap-2 mb-6">
                        <Briefcase className="h-5 w-5 text-blue-600" />
                        <h4 className="text-lg font-bold text-gray-800">Employment Details</h4>
                    </div>

                    <div>
                        <CustomSelect
                            label="Employment Type"
                            value={empType}
                            onChange={setEmpType}
                            options={employmentOptions}
                            placeholder="Select Employment Type"
                            icon={Briefcase}
                        />
                    </div>

                    {/* Salaried Fields */}
                    {empType === 'Salaried' && (
                        <div className="mt-6 space-y-6 animate-in slide-in-from-top-2 duration-300">
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Employer Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={employerName}
                                    onChange={(e) => setEmployerName(e.target.value)}
                                    placeholder="e.g. Google India Pvt Ltd"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium text-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Net Monthly Income <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <IndianRupee className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={monthlyIncome}
                                        onChange={(e) => setMonthlyIncome(e.target.value)}
                                        placeholder="e.g. 50000"
                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium text-gray-700"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Self Employed Business Fields */}
                    {empType === 'Self Employed Business' && (
                        <div className="mt-6 space-y-6 animate-in slide-in-from-top-2 duration-300">
                            <div>
                                <CustomSelect
                                    label="Business Type"
                                    value={businessType}
                                    onChange={setBusinessType}
                                    options={businessTypeOptions}
                                    placeholder="Select Business Type"
                                    icon={Building2}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Annual Turnover <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <IndianRupee className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={turnover}
                                        onChange={(e) => setTurnover(e.target.value)}
                                        placeholder="e.g. 1000000"
                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium text-gray-700"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Self Employed Professional Fields */}
                    {empType === 'Self Employed Professional' && (
                        <div className="mt-6 space-y-6 animate-in slide-in-from-top-2 duration-300">
                            <div>
                                <CustomSelect
                                    label="Profession"
                                    value={businessType}
                                    onChange={setBusinessType}
                                    options={professionOptions}
                                    placeholder="Select Profession"
                                    icon={Building2}
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Business Name <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    value={businessName}
                                    onChange={(e) => setBusinessName(e.target.value)}
                                    placeholder="e.g. Dr. Smith Clinic / Legal Firm"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium text-gray-700"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-500 mb-1">Gross Annual Receipts <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <IndianRupee className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={turnover}
                                        onChange={(e) => setTurnover(e.target.value)}
                                        placeholder="e.g. 1500000"
                                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 font-medium text-gray-700"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pt-6 flex justify-end"> {/* Right aligned container */}
                        <PrimaryButton
                            onClick={handleUpdate}
                            isLoading={loading}
                            className="w-full sm:w-auto" // Full width on mobile, auto on desktop
                        >
                            Update Profile
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmploymentDetails;
