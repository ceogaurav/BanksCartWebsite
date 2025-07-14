import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, Loader2, AlertTriangle, User, Mail, Phone, Calendar, CreditCard } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

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
  const auth = getAuth(app);

  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  // Authenticate user on component mount
  useEffect(() => {
    const authenticate = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined') {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Firebase authentication error:", error);
        setSubmissionError("Failed to authenticate for submission.");
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(crypto.randomUUID());
      }
      setIsAuthReady(true);
    });

    authenticate();
    return () => unsubscribe();
  }, [auth]);

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

    if (!isAuthReady || !userId) {
      setSubmissionError("Authentication not ready. Please try again in a moment.");
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
        userId: userId,
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
              <CreditCard className="inline-block h-8 w-8 mr-2 text-blue-600" /> Check Your FREE CIBIL Score
            </h2>
            <p className="text-gray-600 text-center mb-6 text-lg font-medium">
              Get your credit score instantly and understand your financial health.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 pb-10">
              <div>
                <label htmlFor="panNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  <CreditCard className="inline-block h-4 w-4 mr-1 text-gray-500" /> PAN Number
                </label>
                <input
                  type="text"
                  id="panNumber"
                  value={panNumber}
                  onChange={(e) => setPanNumber(e.target.value.toUpperCase())} // Convert to uppercase
                  className={`w-full px-4 py-2 border ${errors.panNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="ABCDE1234F"
                  maxLength={10}
                  required
                />
                {errors.panNumber && <p className="text-red-500 text-xs mt-1">{errors.panNumber}</p>}
              </div>

              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="inline-block h-4 w-4 mr-1 text-gray-500" /> Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="John Doe"
                  required
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="inline-block h-4 w-4 mr-1 text-gray-500" /> Date of Birth (YYYY-MM-DD)
                </label>
                <input
                  type="date" // Use type="date" for native date picker
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.dob ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  required
                />
                {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="inline-block h-4 w-4 mr-1 text-gray-500" /> Mobile Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 10) {
                      setPhoneNumber(value);
                    }
                  }}
                  className={`w-full px-4 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="Enter 10 digits"
                  maxLength={10}
                  required
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="inline-block h-4 w-4 mr-1 text-gray-500" /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="you@example.com"
                  required
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {submissionError && (
                <p className="text-red-600 text-center text-sm mt-4">{submissionError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" /> Checking...
                  </>
                ) : (
                  'Get My Free CIBIL Score'
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for your CIBIL score request. Our team will process it and get back to you with your free CIBIL score report shortly.
            </p>
            <button
              onClick={onClose}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CibilScoreCheckModal;
