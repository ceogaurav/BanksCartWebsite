import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, Loader2, AlertTriangle, User, Mail, Phone, Calendar, MapPin, DollarSign, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

interface PartnerApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  openPartnerModal?: () => void; // Optional if needed
}

const PartnerApplicationModal: React.FC<PartnerApplicationModalProps> = ({ isOpen, onClose }) => {
  // Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');

  // UI States
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Countdown Timer State
  const initialTimerMinutes = 5;
  const [timeLeft, setTimeLeft] = useState(initialTimerMinutes * 60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const navigate = useNavigate();
  const { currentUser, setIsOnboardingModalOpen } = useAuth(); // Use AuthContext

  // Firebase setup (keeping local init for Firestore for now to match pattern, 
  // ideally should be a shared module)
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

  // Initialize Firebase (Firestore only needed here as Auth is via context)
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  // Reset form and timer when modal opens
  useEffect(() => {
    if (isOpen) {
      setFullName('');
      setEmail('');
      setPhoneNumber('');
      setAge('');
      setCity('');
      setErrors({});
      setIsSubmitting(false);
      setSubmissionSuccess(false);
      setSubmissionError(null);

      // Start/Reset countdown timer
      setTimeLeft(initialTimerMinutes * 60);
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      // Clear interval when modal closes
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => { // Cleanup on component unmount
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isOpen]);

  // Format time for display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid.';
    }
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone Number is required.';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone Number must be 10 digits.';
    }
    if (!age.trim()) {
      newErrors.age = 'Age is required.';
    } else {
      const ageNum = Number(age);
      if (isNaN(ageNum) || ageNum < 18 || ageNum > 100) {
        newErrors.age = 'Age must be a number between 18 and 100.';
      }
    }
    if (!city.trim()) newErrors.city = 'City is required.';

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
      // If not logged in, prompt login (using OnboardingModal for now as a proxy or just error)
      // Better: Just show error asking to login
      setSubmissionError("Please log in to submit an application.");
      setIsOnboardingModalOpen(true); // Open login/onboarding
      return;
    }

    setIsSubmitting(true);
    try {
      const partnerData = {
        fullName,
        email,
        phoneNumber,
        age: Number(age),
        city,
        userId: currentUser.uid, // Use currentUser.uid
        timestamp: serverTimestamp(),
        status: 'New Partner Lead',
      };

      const partnerCollectionRef = collection(db, `artifacts/${appId}/public/data/partnerLeads`);
      await addDoc(partnerCollectionRef, partnerData);

      setSubmissionSuccess(true);
      // Stop the timer on successful submission
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // NEW: Redirect to BecomePartnerPage after a short delay
      setTimeout(() => {
        onClose(); // Close the modal
        navigate('/become-partner'); // Redirect to the BecomePartnerPage
      }, 2000); // Wait for 2 seconds to show success message
    } catch (error) {
      console.error("Error submitting partner application:", error);
      setSubmissionError("Failed to submit application. Please try again.");
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
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">Become a BanksCart Partner!</h2>

            {/* Eye-catching content */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-md mb-6 text-center animate-pulse-once">
              <DollarSign className="inline-block h-6 w-6 mr-2 animate-bounce-in" />
              <span className="font-bold text-xl sm:text-2xl">Earn Up To ₹200,000 Per Month!</span>
              <p className="text-sm mt-1">Join our growing network of successful partners.</p>
            </div>

            {/* Countdown Timer */}
            {timeLeft > 0 && (
              <div className="flex items-center justify-center bg-red-100 text-red-700 border border-red-300 rounded-lg p-3 mb-6 font-semibold text-lg animate-fade-in">
                <Clock className="h-5 w-5 mr-2" /> Hurry Up! Offer Ends In: <span className="ml-2 font-bold text-red-800">{formatTime(timeLeft)}</span>
              </div>
            )}
            {timeLeft === 0 && (
              <div className="flex items-center justify-center bg-gray-100 text-gray-600 border border-gray-300 rounded-lg p-3 mb-6 font-semibold text-lg animate-fade-in">
                Time's Up! Don't miss the next opportunity.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 pb-10">
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
                  placeholder="e.g., 9876543210"
                  maxLength={10}
                  required
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="inline-block h-4 w-4 mr-1 text-gray-500" /> Age
                </label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.age ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="e.g., 30"
                  min="18"
                  max="100"
                  required
                />
                {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="inline-block h-4 w-4 mr-1 text-gray-500" /> City
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

              {submissionError && (
                <p className="text-red-600 text-center text-sm mt-4">{submissionError}</p>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 rounded-lg font-semibold text-lg hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg flex items-center justify-center gap-2"
                disabled={isSubmitting || timeLeft === 0}
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
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Received!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for your interest in partnering with BanksCart. We have received your application and will review it shortly. You will now be redirected to our partner page for more information.
            </p>
            {/* Removed the manual close button as it will redirect automatically */}
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerApplicationModal;