import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface EligibilityCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLoanType?: string;
}

const EligibilityCheckModal: React.FC<EligibilityCheckModalProps> = ({ isOpen, onClose, initialLoanType = '' }) => {
  const [fullName, setFullName] = useState('');
  const [emailUsername, setEmailUsername] = useState(''); // New state for email username
  const [emailDomain, setEmailDomain] = useState('gmail.com'); // New state for email domain, default to gmail.com
  const [phoneNumberDigits, setPhoneNumberDigits] = useState(''); // New state for 10-digit phone number
  const [loanType, setLoanType] = useState(initialLoanType);
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [income, setIncome] = useState('');
  const [salary, setSalary] = useState(''); // State for Salary
  const [cibilScore, setCibilScore] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [isEligibleForHighLoan, setIsEligibleForHighLoan] = useState(false);
  const [eligibleLoanAmount, setEligibleLoanAmount] = useState<number | null>(null); // State for calculated loan amount
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const navigate = useNavigate();

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
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, // Optional
  };

  let firebaseConfig = localFirebaseConfig;

  // If running in Canvas environment, override with provided config
  if (typeof __firebase_config !== 'undefined' && __firebase_config) {
    try {
      const canvasConfig = JSON.parse(__firebase_config);
      firebaseConfig = { ...localFirebaseConfig, ...canvasConfig };
    } catch (e) {
      console.error("Error parsing __firebase_config:", e);
    }
  }

  // Determine appId for Firestore path
  const appId = typeof __app_id !== 'undefined' ? __app_id : firebaseConfig.projectId || 'default-app-id';

  // Initialize Firebase and Firestore
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

  // Reset form when modal opens or initialLoanType changes
  useEffect(() => {
    if (isOpen) {
      setFullName('');
      setEmailUsername('');
      setEmailDomain('gmail.com');
      setPhoneNumberDigits('');
      setLoanType(initialLoanType);
      setPincode('');
      setCity('');
      setIncome('');
      setSalary(''); // Reset salary
      setCibilScore('');
      setErrors({});
      setIsSubmitting(false);
      setSubmissionSuccess(false);
      setIsEligibleForHighLoan(false);
      setEligibleLoanAmount(null);
      setSubmissionError(null);
    }
  }, [isOpen, initialLoanType]);

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
    if (!pincode.trim()) {
      newErrors.pincode = 'Pincode is required.';
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits.';
    }
    if (!city.trim()) newErrors.city = 'City is required.';
    if (!income.trim()) newErrors.income = 'Income selection is required.';

    if (!salary.trim()) {
      newErrors.salary = 'Salary is required.';
    } else if (isNaN(Number(salary)) || Number(salary) <= 0) {
      newErrors.salary = 'Salary must be a positive number.';
    }

    if (cibilScore.trim() !== '' && (isNaN(Number(cibilScore)) || Number(cibilScore) < 300 || Number(cibilScore) > 900)) {
      newErrors.cibilScore = 'CIBIL Score must be a number between 300 and 900.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);
    setSubmissionSuccess(false);
    setIsEligibleForHighLoan(false);
    setEligibleLoanAmount(null);

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
      const calculatedLoanAmount = Number(salary) * 4;
      setEligibleLoanAmount(calculatedLoanAmount);

      const eligibilityData = {
        fullName,
        email: fullEmail,
        phoneNumber: fullPhoneNumber,
        loanType,
        pincode,
        city,
        income,
        salary: Number(salary),
        cibilScore: cibilScore.trim() === '' ? null : Number(cibilScore),
        eligibleLoanAmount: calculatedLoanAmount,
        userId: userId,
        timestamp: serverTimestamp(),
        status: 'Initial Check',
      };

      const eligibilityCollectionRef = collection(db, `artifacts/${appId}/public/data/eligibilityChecks`);
      await addDoc(eligibilityCollectionRef, eligibilityData);

      if (Number(cibilScore) >= 730 && Number(salary) >= 40000) {
        setIsEligibleForHighLoan(true);
      } else {
        setIsEligibleForHighLoan(false);
      }

      setSubmissionSuccess(true);
    } catch (error) {
      console.error("Error submitting eligibility check:", error);
      setSubmissionError("Failed to submit eligibility check. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999] p-4 font-inter">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 sm:p-8 relative transform transition-all scale-100 opacity-100 max-h-[90vh] overflow-y-auto"> {/* Added max-h-[90vh] and overflow-y-auto */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors rounded-full p-1 hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </button>

        {!submissionSuccess ? (
          <>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">Check Your Eligibility</h2>
            <form onSubmit={handleSubmit} className="space-y-4 pb-20"> {/* Added pb-20 for spacing */}
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
                  Desired Loan Type
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
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  id="pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="e.g., 560068"
                  maxLength={6}
                  required
                />
                {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.city ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="e.g., Bengaluru"
                  required
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
              </div>

              <div>
                <label htmlFor="income" className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Income
                </label>
                <select
                  id="income"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.income ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white`}
                  required
                >
                  <option value="">Select Income Range</option>
                  <option value="Below 1 Lakh">Below ₹1 Lakh</option>
                  <option value="1-2 Lakh">₹1 Lakh - ₹2 Lakh</option>
                  <option value="2-5 Lakh">₹2 Lakh - ₹5 Lakh</option>
                  <option value="5-10 Lakh">₹5 Lakh - ₹10 Lakh</option>
                  <option value="Above 10 Lakh">Above ₹10 Lakh</option>
                </select>
                {errors.income && <p className="text-red-500 text-xs mt-1">{errors.income}</p>}
              </div>

              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Salary (₹)
                </label>
                <input
                  type="number"
                  id="salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.salary ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="e.g., 40000"
                  min="0"
                  required
                />
                {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary}</p>}
              </div>

              <div>
                <label htmlFor="cibilScore" className="block text-sm font-medium text-gray-700 mb-1">
                  CIBIL Score (Optional)
                </label>
                <input
                  type="number"
                  id="cibilScore"
                  value={cibilScore}
                  onChange={(e) => setCibilScore(e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.cibilScore ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="e.g., 750 (300-900)"
                  min="300"
                  max="900"
                />
                {errors.cibilScore && <p className="text-red-500 text-xs mt-1">{errors.cibilScore}</p>}
              </div>

              {submissionError && (
                <p className="text-red-600 text-center text-sm mt-4">{submissionError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white py-3 rounded-lg font-semibold text-lg hover:from-green-600 hover:to-teal-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5" /> Checking...
                  </>
                ) : (
                  'Check Eligibility'
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            {isEligibleForHighLoan ? (
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            ) : (
              <AlertTriangle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
            )}
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {isEligibleForHighLoan ? "Congratulations!" : "Thank You!"}
            </h3>
            <p className="text-gray-600 mb-6">
              {isEligibleForHighLoan && eligibleLoanAmount !== null
                ? `You are eligible for up to ₹${eligibleLoanAmount.toLocaleString('en-IN')} loan! Our team will get back to you shortly.`
                : "Thank you for your submission. Our team will review your details and get back to you."}
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

export default EligibilityCheckModal;
