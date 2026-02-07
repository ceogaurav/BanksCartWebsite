import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Loader2, IndianRupee, ShieldCheck } from 'lucide-react';
import { db } from '../../config/firebase';
import { useAuth } from '../../context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import CustomSelect from './CustomSelect';

interface LoanApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLoanType?: string;
}

const LoanApplicationModal: React.FC<LoanApplicationModalProps> = ({ isOpen, onClose, initialLoanType = '' }) => {
  const { currentUser, openLoginModal } = useAuth();

  // State
  const [fullName, setFullName] = useState('');
  // Unified email state instead of split
  const [email, setEmail] = useState('');
  // Simplify phone to just digits, +91 is visual
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loanType, setLoanType] = useState(initialLoanType);
  const [desiredAmount, setDesiredAmount] = useState('');

  // UI States
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const appId = typeof __app_id !== 'undefined' ? __app_id : import.meta.env.VITE_FIREBASE_PROJECT_ID || 'default-app-id';

  // Loan Type Options for CustomSelect
  const loanOptions = [
    { value: 'Personal Loan', label: 'Personal Loan' },
    { value: 'Home Loan', label: 'Home Loan' },
    { value: 'Car Loan', label: 'Car Loan' },
    { value: 'Education Loan', label: 'Education Loan' },
    { value: 'Business Loan', label: 'Business Loan' },
    { value: 'Gold Loan', label: 'Gold Loan' },
    { value: 'Property Loan', label: 'Loan Against Property' },
    { value: 'Other', label: 'Other' },
  ];

  // Pre-fill / Reset Logic
  useEffect(() => {
    if (isOpen) {
      if (currentUser) {
        setFullName(currentUser.displayName || '');
        setEmail(currentUser.email || '');
        setPhoneNumber(currentUser.phoneNumber?.replace('+91', '') || '');
      } else {
        setFullName('');
        setEmail('');
        setPhoneNumber('');
      }
      setLoanType(initialLoanType);
      setDesiredAmount('');
      setErrors({});
      setIsSubmitting(false);
      setSubmissionSuccess(false);
      setSubmissionError(null);
    }
  }, [isOpen, currentUser, initialLoanType]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';

    const emailRegex = /\S+@\S+\.\S+/;
    if (!email.trim() || !emailRegex.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!phoneNumber.trim() || phoneNumber.length !== 10) {
      newErrors.phoneNumber = 'Enter a valid 10-digit number.';
    }

    if (!loanType) newErrors.loanType = 'Please select a loan type.';

    if (!desiredAmount || isNaN(Number(desiredAmount)) || Number(desiredAmount) <= 0) {
      newErrors.desiredAmount = 'Please enter a valid amount.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);

    if (!validateForm()) return;

    if (!currentUser) {
      setSubmissionError("Please log in to submit your application.");
      openLoginModal();
      return;
    }

    setIsSubmitting(true);
    try {
      const applicationData = {
        fullName,
        email,
        phoneNumber: `+91${phoneNumber}`,
        loanType,
        desiredAmount: Number(desiredAmount),
        userId: currentUser.uid,
        timestamp: serverTimestamp(),
        status: 'Pending',
      };

      const applicationsCollectionRef = collection(db, `artifacts/${appId}/public/data/loanApplications`);
      await addDoc(applicationsCollectionRef, applicationData);

      setSubmissionSuccess(true);
    } catch (error) {
      console.error("Error submitting loan application:", error);
      setSubmissionError("Failed to submit application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 font-sans animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl relative overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-start bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Apply for a Loan</h2>
            <p className="text-sm text-gray-500 mt-1">Fill in the details below to get started with your application.</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto">
          {!submissionSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`w-full px-4 py-3 bg-white border ${errors.fullName ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-gray-800 placeholder-gray-400`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-3 bg-white border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-gray-800 placeholder-gray-400`}
                    placeholder="john.doe@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                  <div className={`flex bg-white border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-200'} rounded-lg overflow-hidden focus-within:ring-4 focus-within:ring-blue-500/10 focus-within:border-blue-500 transition-all`}>
                    <div className="bg-gray-50 px-3 border-r border-gray-200 flex items-center text-gray-500 text-sm font-medium select-none">
                      +91
                    </div>
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        if (val.length <= 10) setPhoneNumber(val);
                      }}
                      className="flex-1 px-4 py-3 outline-none text-gray-800 placeholder-gray-400"
                      placeholder="98765 43210"
                    />
                  </div>
                  {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                </div>

                {/* Loan Type */}
                <div>
                  <CustomSelect
                    label="Loan Type"
                    value={loanType}
                    onChange={setLoanType}
                    options={loanOptions}
                    placeholder="Select Loan Type"
                    className={errors.loanType ? "border-red-500" : ""}
                  />
                  {errors.loanType && <p className="text-red-500 text-xs mt-1">{errors.loanType}</p>}
                </div>
              </div>

              {/* Desired Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Desired Amount</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <IndianRupee className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={desiredAmount}
                    onChange={(e) => setDesiredAmount(e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 bg-white border ${errors.desiredAmount ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-gray-800 placeholder-gray-400`}
                    placeholder="5,00,000"
                  />
                </div>
                {errors.desiredAmount && <p className="text-red-500 text-xs mt-1">{errors.desiredAmount}</p>}
              </div>

              {submissionError && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> {submissionError}
                </div>
              )}

              {/* Footer Actions */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : 'Submit Application'}
                </button>

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-cool-gray-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span className="text-slate-500">Your information is encrypted and secure.</span>
                </div>
              </div>
            </form>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="h-10 w-10" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
              <p className="text-gray-500 mb-8 max-w-sm">
                Thank you for choosing us. Our team will review your application and get back to you within 24 hours.
              </p>
              <button
                onClick={onClose}
                className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanApplicationModal;