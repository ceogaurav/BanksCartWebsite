import React, { useState, useEffect } from 'react';
import { CheckCircle, Loader2, User, Mail, Phone, Calendar, CreditCard } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Types for Firebase Global configs
declare global {
  const __firebase_config: string | undefined;
  const __app_id: string | undefined;
  const __initial_auth_token: string | undefined;
}

interface CibilCheckerFormProps {
  className?: string;
  sourcePage?: string;
}

const CibilCheckerForm: React.FC<CibilCheckerFormProps> = ({ className = '', sourcePage = 'Credit Score' }) => {
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
        console.error("Firebase authentication error in checker:", error);
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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // PAN Number validation (5 letters, 4 digits, 1 letter)
    if (!panNumber.trim()) {
      newErrors.panNumber = 'PAN Number is required.';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber.toUpperCase())) {
      newErrors.panNumber = 'Invalid PAN format (e.g., ABCDE1234F).';
    }

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';

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
      newErrors.phoneNumber = 'Must be 10 digits.';
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
      setSubmissionError("Setting up secure connection... Please submit in a moment.");
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
        sourcePage: sourcePage
      };

      const cibilCollectionRef = collection(db, `artifacts/${appId}/public/data/cibilScoreChecks`);
      await addDoc(cibilCollectionRef, cibilData);

      setSubmissionSuccess(true);
    } catch (error) {
      console.error("Error submitting CIBIL check request:", error);
      setSubmissionError("Failed to submit request. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionSuccess) {
    return (
      <div className={`bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 text-center ${className}`}>
        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckCircle className="h-10 w-10" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Request Submitted!</h3>
        <p className="text-sm sm:text-base text-slate-600 mb-6 leading-relaxed">
          Awesome! We have received your request. Our credit analysts are pulling your official CIBIL report and will send it to your email and phone within minutes.
        </p>
        <div className="bg-emerald-50/50 rounded-xl p-3 border border-emerald-100 text-xs text-emerald-800 font-medium">
          🔒 Encrypted check via safe bureau portals. Zero impact on CIBIL score.
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 relative ${className}`}>
      <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-1 flex items-center gap-2">
        <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-ping"></span>
        Check Your CIBIL Score
      </h3>
      <p className="text-xs text-slate-500 mb-5">
        ⚡ 60-Second Check • 100% Free • No Impact on Score
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="panNumber" className="block text-xs font-semibold text-slate-700 mb-1">
            PAN CARD NUMBER
          </label>
          <div className="relative">
            <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              id="panNumber"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border ${errors.panNumber ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'} rounded-xl text-sm font-medium transition-all outline-none focus:ring-4`}
              placeholder="ABCDE1234F"
              maxLength={10}
              required
            />
          </div>
          {errors.panNumber && <p className="text-rose-600 text-[11px] mt-1 font-medium">{errors.panNumber}</p>}
        </div>

        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 mb-1">
            FULL NAME (As per PAN Card)
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border ${errors.fullName ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'} rounded-xl text-sm font-medium transition-all outline-none focus:ring-4`}
              placeholder="John Doe"
              required
            />
          </div>
          {errors.fullName && <p className="text-rose-600 text-[11px] mt-1 font-medium">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="dob" className="block text-xs font-semibold text-slate-700 mb-1">
            DATE OF BIRTH
          </label>
          <div className="relative">
            <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border ${errors.dob ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'} rounded-xl text-sm font-medium transition-all outline-none focus:ring-4`}
              required
            />
          </div>
          {errors.dob && <p className="text-rose-600 text-[11px] mt-1 font-medium">{errors.dob}</p>}
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-xs font-semibold text-slate-700 mb-1">
            MOBILE NUMBER
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-semibold select-none">
              +91
            </span>
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
              className={`w-full pl-12 pr-4 py-2.5 bg-slate-50 border ${errors.phoneNumber ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'} rounded-xl text-sm font-medium transition-all outline-none focus:ring-4`}
              placeholder="9876543210"
              maxLength={10}
              required
            />
          </div>
          {errors.phoneNumber && <p className="text-rose-600 text-[11px] mt-1 font-medium">{errors.phoneNumber}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1">
            EMAIL ADDRESS
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border ${errors.email ? 'border-rose-400 focus:ring-rose-200' : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'} rounded-xl text-sm font-medium transition-all outline-none focus:ring-4`}
              placeholder="name@email.com"
              required
            />
          </div>
          {errors.email && <p className="text-rose-600 text-[11px] mt-1 font-medium">{errors.email}</p>}
        </div>

        {submissionError && (
          <p className="text-rose-600 text-center text-xs font-medium bg-rose-50/50 p-2.5 border border-rose-100 rounded-lg">
            {submissionError}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold text-sm shadow-md hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin h-4 w-4" /> Fetching Bureau Record...
            </>
          ) : (
            'CHECK CIBIL SCORE FREE'
          )}
        </button>

        <p className="text-[10px] text-center text-slate-400 font-medium leading-relaxed mt-3">
          By clicking above, you authorize BanksCart to request your credit score from authorized bureaus (Experian/CIBIL). This will not impact your credit score.
        </p>
      </form>
    </div>
  );
};

export default CibilCheckerForm;
