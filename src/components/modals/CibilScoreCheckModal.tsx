import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, Loader2, AlertTriangle, User, Mail, Phone, Calendar, CreditCard } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext'; // Import useAuth
import CreditReportModal from '../admin/CreditReportModal';
import CustomDatePicker from '../common/CustomDatePicker';

interface CibilScoreCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CibilScoreCheckModal: React.FC<CibilScoreCheckModalProps> = ({ isOpen, onClose }) => {
  // Form States
  const [panNumber, setPanNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState(''); // Date of Birth (YYYY-MM-DD)
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  // UI States
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);

  const { currentUser, setIsOnboardingModalOpen } = useAuth(); // Use AuthContext

  // Firebase setup
  const localFirebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  let firebaseConfig = localFirebaseConfig;
  if (typeof __firebase_config !== 'undefined' && __firebase_config) {
    try {
      const canvasConfig = JSON.parse(__firebase_config);
      firebaseConfig = { ...localFirebaseConfig, ...canvasConfig };
    } catch (e) {
      console.error("Error parsing __firebase_config:", e);
    }
  }

  const appId = typeof __app_id !== 'undefined' ? __app_id : firebaseConfig.projectId || 'default-app-id';

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  // Removed local auth init

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setPanNumber('');
      setFullName('');
      setDob('');
      setPhoneNumber('');
      setEmail('');
      setErrors({});
      setIsSubmitting(false);
      setSubmissionSuccess(false);
      setSubmissionError(null);
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // PAN Number validation (basic: 5 letters, 4 digits, 1 letter)
    if (!panNumber.trim()) {
      newErrors.panNumber = 'PAN Number is required.';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber.toUpperCase())) {
      newErrors.panNumber = 'Invalid PAN Number format (e.g., ABCDE1234F).';
    }

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';

    // DOB validation (basic: YYYY-MM-DD format)
    if (!dob.trim()) {
      newErrors.dob = 'Date of Birth is required.';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
      newErrors.dob = 'DOB must be in YYYY-MM-DD format.';
    } else {
      const dobDate = new Date(dob);
      const today = new Date();
      if (isNaN(dobDate.getTime()) || dobDate > today) {
        newErrors.dob = 'Invalid Date of Birth.';
      }
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Mobile Number is required.';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Mobile Number must be 10 digits.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);
    setSubmissionSuccess(false);

    if (!validateForm()) {
      return;
    }

    if (!currentUser) {
      setSubmissionError("Please log in to check CIBIL score.");
      setIsOnboardingModalOpen(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const cibilData = {
        panNumber: panNumber.toUpperCase(),
        fullName,
        dob,
        phoneNumber,
        email,
        userId: currentUser.uid,
        timestamp: serverTimestamp(),
        status: 'CIBIL Check Request',
      };

      const cibilCollectionRef = collection(db, `artifacts/${appId}/public/data/cibilScoreChecks`);
      await addDoc(cibilCollectionRef, cibilData);

      setSubmissionSuccess(true);
    } catch (error) {
      console.error("Error submitting CIBIL check request:", error);
      setSubmissionError("Failed to submit CIBIL check request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999] p-4 font-inter">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 sm:p-8 relative transform transition-all scale-100 opacity-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors rounded-full p-1 hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        {!submissionSuccess ? (
          <>
            {/* Header */}
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 text-center flex flex-col items-center justify-center gap-2">
              <span className="bg-blue-50 p-3 rounded-full">
                <CreditCard className="h-8 w-8 text-blue-600" />
              </span>
              <span>Check Your FREE CIBIL Score</span>
            </h2>
            <p className="text-gray-500 text-center mb-8 text-base font-medium max-w-sm mx-auto">
              Get your credit score instantly and understand your financial health.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 pb-8">
              <div>
                <label htmlFor="panNumber" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                  PAN Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="panNumber"
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                    className={`block w-full pl-10 pr-3 py-3.5 border ${errors.panNumber ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 sm:text-sm font-medium`}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    required
                  />
                </div>
                {errors.panNumber && <p className="text-red-500 text-xs mt-1 ml-1 font-medium flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {errors.panNumber}</p>}
              </div>

              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3.5 border ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 sm:text-sm font-medium`}
                    placeholder="John Doe"
                    required
                  />
                </div>
                {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="dob" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                  Date of Birth (YYYY-MM-DD)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3.5 border ${errors.dob ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 sm:text-sm font-medium`}
                    required
                  />
                </div>
                {errors.dob && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.dob}</p>}
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 10) setPhoneNumber(value);
                    }}
                    className={`block w-full pl-10 pr-3 py-3.5 border ${errors.phoneNumber ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 sm:text-sm font-medium`}
                    placeholder="Enter 10 digits"
                    maxLength={10}
                    required
                  />
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5 ml-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`block w-full pl-10 pr-3 py-3.5 border ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-gray-50'} rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 sm:text-sm font-medium`}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.email}</p>}
              </div>

              {submissionError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2 text-red-700 text-sm">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <p>{submissionError}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transform hover:-translate-y-0.5 active:translate-y-0"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" /> Processing...
                  </>
                ) : (
                  'Get My Free CIBIL Score'
                )}
              </button>

              <p className="mt-6 text-[11px] text-gray-400 text-center leading-relaxed max-w-xs mx-auto">
                By submitting this form, you agree to the{' '}
                <a href="/credit-report-terms" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">Terms of Use</a> &{' '}
                <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">Privacy Policy</a>.
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for your CIBIL score request. Click below to view your report.
            </p>
            <button
              onClick={() => setShowReportModal(true)}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              View My Report
            </button>
          </div>
        )}
      </div>

      {/* Credit Report Modal Integration */}
      <CreditReportModal
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        userData={{
          fullName,
          panNumber,
          dob,
          phoneNumber,
          email
        }}
        score={785} // Mock score for the preview
      />
    </div >
  );
};

export default CibilScoreCheckModal;