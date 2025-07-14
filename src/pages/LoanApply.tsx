import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Removed modal-specific props (isOpen, onClose)
interface LoanApplyPageProps {
  initialLoanType?: string; // Optional: to pre-fill loan type if coming from a specific page
}

const LoanApplyPage: React.FC<LoanApplyPageProps> = ({ initialLoanType = '' }) => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate hook

  // Determine the initial loan type from navigation state, then from prop
  const loanTypeFromState = location.state?.loanType || initialLoanType;

  const [fullName, setFullName] = useState('');
  const [emailUsername, setEmailUsername] = useState('');
  const [emailDomain, setEmailDomain] = useState('gmail.com');
  const [phoneNumberDigits, setPhoneNumberDigits] = useState('');
  const [loanType, setLoanType] = useState(loanTypeFromState);
  const [desiredAmount, setDesiredAmount] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Common email domains
  const emailDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'aol.com', 'protonmail.com', 'zohomail.com', 'icloud.com', 'custom'];

  // Firebase setup (using global variables provided by Canvas for deployment, or .env for local)
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

  // Reset form on initial mount or when initialLoanType changes (for direct page access)
  useEffect(() => {
    setFullName('');
    setEmailUsername('');
    setEmailDomain('gmail.com');
    setPhoneNumberDigits('');
    setLoanType(loanTypeFromState); // Set from prop or state
    setDesiredAmount('');
    setErrors({});
    setIsSubmitting(false);
    setSubmissionSuccess(false);
    setSubmissionError(null);
  }, [loanTypeFromState]); // Depend on loanTypeFromState to reset when navigating with new type

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';

    const fullEmail = `${emailUsername}@${emailDomain === 'custom' ? (document.getElementById('customEmailDomain') as HTMLInputElement)?.value : emailDomain}`;
    if (!emailUsername.trim()) {
      newErrors.emailUsername = 'Email username is required.';
    } else if (emailDomain === 'custom' && !(document.getElementById('customEmailDomain') as HTMLInputElement)?.value.trim()) {
      newErrors.emailDomain = 'Custom domain is required.';
    } else if (!/\S+@\S+\.\S+/.test(fullEmail)) {
      newErrors.email = 'Email address is invalid.';
    }

    if (!phoneNumberDigits.trim()) {
      newErrors.phoneNumber = 'Phone Number is required.';
    } else if (!/^\d{10}$/.test(phoneNumberDigits)) {
      newErrors.phoneNumber = 'Phone Number must be 10 digits.';
    }

    if (!loanType.trim()) newErrors.loanType = 'Loan Type is required.';
    if (!desiredAmount.trim()) {
      newErrors.desiredAmount = 'Desired Amount is required.';
    } else if (isNaN(Number(desiredAmount)) || Number(desiredAmount) <= 0) {
      newErrors.desiredAmount = 'Desired Amount must be a positive number.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);
    setSubmissionSuccess(false);

    const fullEmail = `${emailUsername}@${emailDomain === 'custom' ? (document.getElementById('customEmailDomain') as HTMLInputElement)?.value : emailDomain}`;
    const fullPhoneNumber = `+91${phoneNumberDigits}`;

    if (!validateForm()) {
      return;
    }

    if (!isAuthReady || !userId) {
      setSubmissionError("Authentication not ready. Please try again in a moment.");
      return;
    }

    setIsSubmitting(true);
    try {
      const applicationData = {
        fullName,
        email: fullEmail,
        phoneNumber: fullPhoneNumber,
        loanType,
        desiredAmount: Number(desiredAmount),
        userId: userId,
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

  return (
    // Adjusted styling for a full page, using min-h-[calc(100vh-80px)] to account for header/footer
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 flex items-center justify-center p-4 font-inter">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 sm:p-8 relative transform transition-all scale-100 opacity-100">
        {/* Removed the close button as it's a page, not a modal */}

        {!submissionSuccess ? (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">Apply for a Loan</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
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
                <label htmlFor="emailUsername" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="flex rounded-lg shadow-sm">
                  <input
                    type="text"
                    id="emailUsername"
                    value={emailUsername}
                    onChange={(e) => setEmailUsername(e.target.value)}
                    className={`flex-1 px-4 py-2 border ${errors.emailUsername || errors.email ? 'border-red-500' : 'border-gray-300'} rounded-l-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    placeholder="yourname"
                    required
                  />
                  <span className="inline-flex items-center px-2 text-gray-500 border-y border-gray-300 bg-gray-50 text-sm">@</span>
                  <select
                    id="emailDomain"
                    value={emailDomain}
                    onChange={(e) => setEmailDomain(e.target.value)}
                    className={`px-3 py-2 border ${errors.emailDomain || errors.email ? 'border-red-500' : 'border-gray-300'} rounded-r-lg focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-sm`}
                    required
                  >
                    {emailDomains.map(domain => (
                      <option key={domain} value={domain}>{domain}</option>
                    ))}
                  </select>
                </div>
                {emailDomain === 'custom' && (
                  <input
                    type="text"
                    id="customEmailDomain"
                    placeholder="enter custom domain (e.g., yourcompany.com)"
                    className={`w-full px-4 py-2 mt-2 border ${errors.emailDomain || errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    onBlur={(e) => {
                      if (emailDomain === 'custom') {
                        validateForm();
                      }
                    }}
                    required
                  />
                )}
                {(errors.emailUsername || errors.emailDomain || errors.email) && <p className="text-red-500 text-xs mt-1">{(errors.emailUsername || errors.emailDomain || errors.email)}</p>}
              </div>

              <div>
                <label htmlFor="phoneNumberDigits" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="flex rounded-lg shadow-sm">
                  <span className="inline-flex items-center px-4 py-2 text-gray-500 border border-gray-300 rounded-l-lg bg-gray-50 text-sm font-semibold">
                    +91
                  </span>
                  <input
                    type="tel"
                    id="phoneNumberDigits"
                    value={phoneNumberDigits}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 10) {
                        setPhoneNumberDigits(value);
                      }
                    }}
                    className={`flex-1 px-4 py-2 border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} rounded-r-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    placeholder="Enter 10 digits"
                    maxLength={10}
                    required
                  />
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label htmlFor="loanType" className="block text-sm font-medium text-gray-700 mb-1">
                  Loan Type
                </label>
                <select
                  id="loanType"
                  value={loanType}
                  onChange={(e) => setLoanType(e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.loanType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white`}
                  required
                >
                  <option value="">Select Loan Type</option>
                  <option value="Personal Loan">Personal Loan</option>
                  <option value="Home Loan">Home Loan</option>
                  <option value="Car Loan">Car Loan</option>
                  <option value="Education Loan">Education Loan</option>
                  <option value="Business Loan">Business Loan</option>
                  <option value="Gold Loan">Gold Loan</option>
                  <option value="Property Loan">Loan Against Property</option>
                  <option value="Other">Other</option>
                </select>
                {errors.loanType && <p className="text-red-500 text-xs mt-1">{errors.loanType}</p>}
              </div>

              <div>
                <label htmlFor="desiredAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  Desired Amount (₹)
                </label>
                <input
                  type="number"
                  id="desiredAmount"
                  value={desiredAmount}
                  onChange={(e) => setDesiredAmount(e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.desiredAmount ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="e.g., 500000"
                  min="1"
                  required
                />
                {errors.desiredAmount && <p className="text-red-500 text-xs mt-1">{errors.desiredAmount}</p>}
              </div>

              {submissionError && (
                <p className="text-red-600 text-center text-sm mt-4">{submissionError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" /> Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for your application. Our team will review it and get back to you shortly.
            </p>
            <button
              onClick={() => navigate('/')} // Redirect to home page after submission
              className="bg-blue-500 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              Go to Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanApplyPage;
