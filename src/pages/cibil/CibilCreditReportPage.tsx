import React, { useState, useEffect } from 'react';
import { HelpCircle, ChevronDown, Check, Star, Sparkles, BookOpen, TrendingUp, Clock, Play, MessageSquare, ShieldCheck, ArrowRight, CreditCard, Smartphone, CheckSquare, XCircle, Award, Info, AlertCircle, Shield } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Types for Firebase Global configs
declare global {
  const __firebase_config: string | undefined;
  const __app_id: string | undefined;
  const __initial_auth_token: string | undefined;
}

const CibilCreditReportPage: React.FC = () => {
  // Form States (2-Step Interactive Form)
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');

  // UI / Interactive States
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'basics' | 'calculation' | 'repayment' | 'glossary'>('basics');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);
  const [mockOtp, setMockOtp] = useState('');

  // Firebase setup (cloned precisely from CibilCheckerForm)
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

  // Form Step 1 Validation
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Mobile Number is required.';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Must be 10 digits (e.g. 9876543210).';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setOtpSent(true);
      setMockOtp('123456'); // Pre-fill mock OTP for smooth verification demo
      setFormStep(2);
    }
  };

  // Form Step 2 Validation and Submission
  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionError(null);
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';
    
    if (!panNumber.trim()) {
      newErrors.panNumber = 'PAN Number is required.';
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panNumber.toUpperCase())) {
      newErrors.panNumber = 'Invalid PAN format (e.g. ABCDE1234F).';
    }

    if (!dob.trim()) {
      newErrors.dob = 'Date of Birth is required.';
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
      newErrors.dob = 'DOB must be in YYYY-MM-DD format.';
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email address is invalid.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!isAuthReady || !userId) {
      setSubmissionError("Setting up secure connection... Please try again in a moment.");
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
        sourcePage: 'Premium CIBIL Redesign Page'
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

  const faqs = [
    {
      q: "What is a CIBIL Credit Report?",
      a: "A CIBIL Credit Report is a comprehensive record of your financial history, compiled by TransUnion CIBIL. It tracks your credit card accounts, loans, payment history, outstanding balances, and credit inquiries over a rolling 36-month period. Lenders use this report to determine your creditworthiness before approval. Regularly reviewing your report allows you to detect unauthorized changes, administrative errors, or identity theft loops early, keeping your credit health in the prime zone."
    },
    {
      q: "How often is my credit report updated?",
      a: "Bureaus usually update your credit report every 30 to 45 days. Banks and financial institutions submit account details to credit bureaus at the end of each month, which takes some processing time to reflect in your report. Under the latest RBI directives, credit bureaus are required to refresh records more frequently to reflect real-time credit status, which means your score changes almost every fortnight as fresh payments are registered by your bank."
    },
    {
      q: "What is the difference between CIBIL score and Experian score?",
      a: "CIBIL and Experian are separate licensed credit information companies in India. While they compile similar history, they use different proprietary scoring models and algorithms. CIBIL scores range from 300 to 900, as do Experian scores, but a minor variation of 10-30 points between reports is normal and acceptable. Banks typically evaluate both reports to get a balanced picture of your credit reliability."
    },
    {
      q: "Does checking my CIBIL report reduce my score?",
      a: "No. Checking your own CIBIL report on authorized websites like BanksCart is classified as a 'Soft Inquiry'. Soft inquiries have absolutely zero impact on your credit score, regardless of how many times you check. In contrast, bank-initiated searches during application are 'Hard Inquiries' and can affect scores by dropping them by a few points, especially if multiple inquiries are made within a short timeline."
    },
    {
      q: "What does 'Settled' status mean in a credit report?",
      a: "A 'Settled' status in your CIBIL report indicates that you and the lender reached a mutual agreement where the lender accepted an amount lower than the actual outstanding due to your inability to pay. While the account is closed, a 'Settled' label remains a major red flag on your report for up to 7 years, dropping approval chances for future retail loans. It is always recommended to pay the 'Written-off' or 'Settled' dues in full to convert the status to 'Closed'."
    },
    {
      q: "How does a co-applicant's bad CIBIL score affect my loan application?",
      a: "In joint loan applications, lenders evaluate the creditworthiness of both applicants. If your co-applicant has a poor CIBIL score, the loan will likely be rejected or attract higher interest rates, even if your individual CIBIL score is excellent (e.g., above 780). Joint applications bundle both risks together, which makes it vital for both applicants to clear their respective outstanding bills on schedule."
    },
    {
      q: "Does opening multiple credit cards lower my CIBIL score?",
      a: "Yes. Every time you submit an application for a credit card, the issuing bank requests your credit report from the bureau, generating a 'Hard Inquiry'. Opening multiple cards in a short period triggers multiple hard inquiries, signaling credit hunger and high credit risk, which drops your score. It is best to space out credit card applications by at least 6 months."
    },
    {
      q: "How can I check my credit history if I have never taken a loan or credit card?",
      a: "If you have never utilized any credit products, your CIBIL score will show as '-1' or 'NH' (No History). This is a clean slate and is not a negative rating. To build a credit history, you can start by getting a credit card against a Fixed Deposit (FD) or taking a minor consumer durable loan. These basic steps initiate reporting, establishing a prime score within 6 months."
    },
    {
      q: "What is the Credit Utilization Ratio (CUR) and why is it important?",
      a: "The Credit Utilization Ratio (CUR) measures the amount of revolving credit you consume compared to your total available credit limit (e.g., spending ₹30,000 on a card with a ₹1,00,000 limit equals a 30% CUR). Keeping your CUR strictly below 30% indicates low credit dependence and directly boosts your score. It signals discipline to prospective credit underwriters."
    },
    {
      q: "Can a closed loan account continue to show as active in my report?",
      a: "Yes. This occurs due to administrative reporting delays between the lender and the credit bureau. If you closed a loan but it still appears active, you should procure a 'No Dues Certificate' (NOC) from the bank and file an online CIBIL dispute to get your record corrected. Bureaus are required to resolve disputes within a standard SLA timeline of 30 days."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ========================================================================= */}
        {/* SECTION 1: HERO SECTION & 2-STEP FORM (FIRST SCREENSHOT)                  */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/30 rounded-3xl border border-slate-100 p-6 sm:p-10 lg:p-12 shadow-sm mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Headline, Bullet points & dynamic gauge SVG */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Free Bureau Access
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Check Free Credit Score & CIBIL Report
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
                Check your credit score free across all 4 credit bureaus, including CIBIL, only on BanksCart. Get your free credit score online with monthly updates and take steps to become credit healthy. <span className="text-blue-600 cursor-pointer font-bold hover:underline">...Read more</span>
              </p>

              <div className="border-t border-slate-100 pt-6">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">
                  Why Check Credit Score on BanksCart?
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  {/* Bullet List */}
                  <div className="sm:col-span-7 space-y-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-5.5 h-5.5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-slate-700 text-sm font-bold">Check Credit Score from All 4 Bureaus</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5.5 h-5.5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-slate-700 text-sm font-bold">Track Credit Score Seamlessly Every Month</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-5.5 h-5.5 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <span className="text-slate-700 text-sm font-bold">Read Credit Report in Multiple Languages</span>
                    </div>
                  </div>

                  {/* SVG Credit Score Gauge representation */}
                  <div className="sm:col-span-5 flex justify-center sm:justify-end">
                    <div className="relative w-40 h-28 flex flex-col items-center justify-end overflow-hidden">
                      <svg className="w-full h-full" viewBox="0 0 100 60">
                        {/* Gauge Arc Background */}
                        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#e2e8f0" strokeWidth="8" strokeLinecap="round" />
                        {/* Colored segments */}
                        <path d="M 10 50 A 40 40 0 0 1 30 20" fill="none" stroke="#f43f5e" strokeWidth="8" />
                        <path d="M 30 20 A 40 40 0 0 1 50 10" fill="none" stroke="#fb923c" strokeWidth="8" />
                        <path d="M 50 10 A 40 40 0 0 1 70 20" fill="none" stroke="#facc15" strokeWidth="8" />
                        <path d="M 70 20 A 40 40 0 0 1 90 50" fill="none" stroke="#10b981" strokeWidth="8" />
                        {/* Needle */}
                        <line x1="50" y1="50" x2="75" y2="25" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="50" cy="50" r="4.5" fill="#1e293b" />
                      </svg>
                      {/* Gauge markers */}
                      <div className="absolute bottom-1 w-full flex justify-between px-2 text-[8px] font-bold text-slate-400 uppercase">
                        <span className="text-rose-500">Poor</span>
                        <span className="text-amber-500">Fair</span>
                        <span className="text-emerald-500">Excellent</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Multi-metrics Stats Card */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                <div className="flex flex-col items-center justify-center p-2 text-center">
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-black text-slate-800">4.5</span>
                    <div className="flex text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 mt-1">15.6L Google Play Reviews</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 text-center">
                  <span className="text-lg font-black text-slate-800">5.7Cr+</span>
                  <span className="text-[10px] font-bold text-slate-400 mt-1">Satisfied Customers</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 text-center">
                  <span className="text-lg font-black text-slate-800">4</span>
                  <span className="text-[10px] font-bold text-slate-400 mt-1">Bureau Coverage</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 text-center">
                  <span className="text-lg font-black text-slate-800">800+</span>
                  <span className="text-[10px] font-bold text-slate-400 mt-1">Cities across India</span>
                </div>
              </div>
            </div>

            {/* Right Column: "Let's Get Started" Interactive 2-Step form */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden relative">
                
                {/* Score promo header banner */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4.5 text-white flex justify-between items-center relative overflow-hidden">
                  <div className="absolute right-0 top-0 opacity-10 font-black text-6xl tracking-tighter select-none">WIN</div>
                  <div>
                    <span className="bg-amber-400 text-slate-900 font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                      Credit Premier League 2.0
                    </span>
                    <h3 className="font-extrabold text-sm sm:text-base mt-1 text-white">
                      CIBIL Score Dekho, ₹1 Lakh Jeeto
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white border border-white/20 animate-pulse flex-shrink-0">
                    🏆
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-5">
                  <div className="flex justify-between items-center border-b border-slate-50 pb-3">
                    <h2 className="text-lg sm:text-xl font-black text-slate-800">Let's Get Started</h2>
                    <span className="text-[10px] bg-slate-100 text-slate-500 font-bold px-2 py-0.5 rounded-full">
                      Step {formStep} of 2
                    </span>
                  </div>

                  {submissionSuccess ? (
                    <div className="text-center py-6 space-y-4">
                      <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <Check className="h-9 w-9 stroke-[3]" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-800">Check Requested Successfully!</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Excellent! We've registered your secure bureau credentials. Our analytical engines are compiling your full 4-bureau credit report and will send it to your email and registered phone number within minutes.
                      </p>
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-[10px] text-slate-500 font-bold flex items-center gap-1.5 justify-center">
                        🔒 Safe 256-Bit SSL check. Zero impact on CIBIL rating.
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={formStep === 1 ? handleStep1Submit : handleFinalSubmit} className="space-y-4">
                      
                      {/* STEP 1: MOBILE NUMBER CARD */}
                      {formStep === 1 && (
                        <div className="space-y-4 animate-fadeIn">
                          <div>
                            <label htmlFor="phoneNumber" className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                              Mobile Number
                            </label>
                            <div className="relative">
                              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500 font-bold select-none border-r border-slate-200 pr-3">
                                +91
                              </span>
                              <input
                                type="tel"
                                id="phoneNumber"
                                value={phoneNumber}
                                onChange={(e) => {
                                  const val = e.target.value.replace(/\D/g, '');
                                  if (val.length <= 10) setPhoneNumber(val);
                                }}
                                className={`w-full pl-16 pr-4 py-3 bg-slate-50 border ${errors.phoneNumber ? 'border-rose-400 focus:ring-rose-100' : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'} rounded-xl text-sm font-bold transition-all outline-none focus:ring-4`}
                                placeholder="Enter mobile number"
                                required
                              />
                            </div>
                            {errors.phoneNumber && <p className="text-rose-600 text-[10px] mt-1.5 font-bold">{errors.phoneNumber}</p>}
                          </div>

                          <p className="text-[10px] text-slate-400 leading-relaxed font-semibold">
                            Your will receive a secure OTP on the mentioned number. By logging in, you agree to the Credit Report Terms of Use, and Privacy Policy. <span className="text-blue-600 cursor-pointer hover:underline">More</span>
                          </p>

                          <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-extrabold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                          >
                            Get Free Credit Score <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {/* STEP 2: FULL DATA INPUTS & OTP */}
                      {formStep === 2 && (
                        <div className="space-y-3.5 animate-fadeIn">
                          {/* Mock OTP alert banner */}
                          {otpSent && (
                            <div className="bg-amber-50 border border-amber-100 text-amber-800 text-[10px] p-2.5 rounded-xl font-bold flex justify-between items-center">
                              <span>💬 Secure OTP sent to +91 {phoneNumber} (Demo code: {mockOtp})</span>
                              <button 
                                type="button" 
                                onClick={() => setFormStep(1)} 
                                className="text-blue-600 underline font-bold"
                              >
                                Change
                              </button>
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label htmlFor="fullName" className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                                Full Name (Per PAN Card)
                              </label>
                              <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className={`w-full px-3.5 py-2.5 bg-slate-50 border ${errors.fullName ? 'border-rose-400 focus:ring-rose-100' : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'} rounded-xl text-xs font-bold transition-all outline-none focus:ring-4`}
                                placeholder="Enter full name"
                                required
                              />
                              {errors.fullName && <p className="text-rose-600 text-[9px] mt-1 font-bold">{errors.fullName}</p>}
                            </div>

                            <div>
                              <label htmlFor="panNumber" className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                                PAN Card Number
                              </label>
                              <input
                                type="text"
                                id="panNumber"
                                value={panNumber}
                                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                                className={`w-full px-3.5 py-2.5 bg-slate-50 border ${errors.panNumber ? 'border-rose-400 focus:ring-rose-100' : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'} rounded-xl text-xs font-bold transition-all outline-none focus:ring-4`}
                                placeholder="ABCDE1234F"
                                maxLength={10}
                                required
                              />
                              {errors.panNumber && <p className="text-rose-600 text-[9px] mt-1 font-bold">{errors.panNumber}</p>}
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label htmlFor="dob" className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                                Date of Birth
                              </label>
                              <input
                                type="date"
                                id="dob"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                className={`w-full px-3.5 py-2.5 bg-slate-50 border ${errors.dob ? 'border-rose-400 focus:ring-rose-100' : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'} rounded-xl text-xs font-bold transition-all outline-none focus:ring-4`}
                                required
                              />
                              {errors.dob && <p className="text-rose-600 text-[9px] mt-1 font-bold">{errors.dob}</p>}
                            </div>

                            <div>
                              <label htmlFor="email" className="block text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1">
                                Email Address
                              </label>
                              <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full px-3.5 py-2.5 bg-slate-50 border ${errors.email ? 'border-rose-400 focus:ring-rose-100' : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'} rounded-xl text-xs font-bold transition-all outline-none focus:ring-4`}
                                placeholder="name@email.com"
                                required
                              />
                              {errors.email && <p className="text-rose-600 text-[9px] mt-1 font-bold">{errors.email}</p>}
                            </div>
                          </div>

                          {submissionError && (
                            <p className="text-rose-600 text-center text-[10px] font-bold bg-rose-50 p-2 border border-rose-100 rounded-lg">
                              {submissionError}
                            </p>
                          )}

                          <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3.5 rounded-xl font-extrabold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? 'VERIFYING WITH BUREAU...' : 'VERIFY & CHECK CIBIL SCORE'}
                          </button>
                        </div>
                      )}

                      {/* Bureau Partners logos section */}
                      <div className="border-t border-slate-100 pt-4.5 flex flex-col items-center">
                        <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider">
                          Powered by licensed Credit bureaus
                        </span>
                        <div className="flex justify-center items-center gap-3.5 mt-3 flex-wrap opacity-75">
                          <span className="text-[10px] font-extrabold text-slate-700 border border-slate-200 rounded px-1.5 py-0.5">CIBIL</span>
                          <span className="text-[10px] font-extrabold text-slate-700 border border-slate-200 rounded px-1.5 py-0.5">Experian</span>
                          <span className="text-[10px] font-extrabold text-slate-700 border border-slate-200 rounded px-1.5 py-0.5">EQUIFAX</span>
                          <span className="text-[10px] font-extrabold text-slate-700 border border-slate-200 rounded px-1.5 py-0.5">CRIF</span>
                        </div>
                        <div className="bg-emerald-50 text-emerald-800 text-[10px] font-extrabold px-3 py-1.5 rounded-full border border-emerald-100 flex items-center gap-1.5 mt-4">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"></span>
                          5.7 Crore reports checked so far
                        </div>
                      </div>

                    </form>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Dynamic promotional rewards ribbon */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 rounded-2xl text-white p-5 shadow-md flex flex-col md:flex-row justify-between items-center gap-4 mb-12 relative overflow-hidden">
          <div className="absolute left-0 top-0 w-32 h-full bg-white/5 skew-x-12 transform -translate-x-12"></div>
          <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
            <span className="text-3xl">🏆</span>
            <div>
              <h4 className="font-extrabold text-sm sm:text-base text-amber-300">
                Download the App Now & unlock your Reward of up to ₹1 Lakh
              </h4>
              <p className="text-xs text-blue-100 mt-0.5">
                Scan mock QR and claim instant Credit League multipliers instantly.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="bg-white p-1 rounded-xl shadow-inner border border-white/20">
              {/* SVG Mock QR Code */}
              <svg className="w-14 h-14 text-slate-800" viewBox="0 0 100 100">
                <rect x="10" y="10" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="65" y="10" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="10" y="65" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="16" y="16" width="13" height="13" fill="currentColor" />
                <rect x="71" y="16" width="13" height="13" fill="currentColor" />
                <rect x="16" y="71" width="13" height="13" fill="currentColor" />
                <rect x="45" y="20" width="10" height="20" fill="currentColor" />
                <rect x="40" y="55" width="20" height="10" fill="currentColor" />
                <rect x="70" y="65" width="15" height="15" fill="currentColor" />
              </svg>
            </div>
            <span className="bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-black uppercase border border-white/20 select-none">
              Scan Me
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: WHAT IS CREDIT SCORE (SECOND SCREENSHOT)                        */}
        {/* ========================================================================= */}
        <div className="space-y-4 mb-12">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">What is Credit Score?</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left box with light blue background */}
            <div className="lg:col-span-7 bg-blue-50/60 rounded-3xl border border-blue-100 p-6 sm:p-8 space-y-4 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-5 w-48 h-48 select-none">📊</div>
              
              <p className="text-slate-700 text-sm leading-relaxed font-medium">
                Credit Score is a 3-digit numeric summary of your credit history, that represents your creditworthiness. Credit Score is commonly known as CIBIL Score (provided by TransUnion CIBIL), and ranges between 300 and 900. Your Credit Score is a measure of your ability to borrow from Banks and NBFCs, determined by your past credit behaviour.
              </p>

              <div className="space-y-3.5 border-t border-blue-100 pt-4.5">
                <div className="flex gap-3">
                  <div className="w-5.5 h-5.5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-slate-700 text-sm font-semibold">
                    CIBIL is one of the 4 Credit Bureaus or <span className="text-blue-600 font-bold cursor-pointer hover:underline">Credit Information Companies (CICs)</span> in India that calculates and maintains your Credit Score.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-5.5 h-5.5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-slate-700 text-sm font-semibold">
                    Your Credit Score is based on the information provided by lenders. It includes payment of EMIs, Credit Card bills, new applications etc.
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-5.5 h-5.5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <p className="text-slate-700 text-sm font-semibold">
                    To ensure bureaus have your latest credit information, RBI has mandated all lenders to report the updated credit information to all bureaus every 15 days.
                  </p>
                </div>
              </div>
            </div>

            {/* Right box: Mock Video Player card with custom overlays */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-800 relative group aspect-video cursor-pointer">
                {/* Background placeholder design mimicking youtube player */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 flex flex-col justify-between p-5">
                  <span className="bg-slate-800/80 text-white border border-white/10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider w-fit">
                    Advisory Video
                  </span>
                  
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-sm text-white group-hover:text-blue-400 transition-colors">
                      4 Common Mistakes That Secretly Hurt...
                    </h3>
                    <span className="text-[10px] text-slate-400 font-bold block">BanksCart Media • 0:48 mins</span>
                  </div>
                </div>

                {/* Central Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-rose-600 text-white rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 active:scale-95 duration-300">
                    <Play className="w-6 h-6 fill-current stroke-[3] translate-x-0.5" />
                  </div>
                </div>

                {/* Subtle scanning/reflection line */}
                <div className="absolute inset-0 bg-white/5 transform -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-out pointer-events-none"></div>
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 3: HOW TO CHECK CREDIT SCORE FOR FREE (THIRD SCREENSHOT)           */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-sm mb-12">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              How to Check Credit Score for Free with BanksCart?
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed font-semibold">
              You can check your latest updated CIBIL score, along with credit scores from other bureaus, on BanksCart for free. Follow the steps given below to seamlessly track your score every month:
            </p>
          </div>

          {/* 3-Step grid with large numbers in the background */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100/80 p-6 rounded-2xl relative overflow-hidden group transition-all duration-300">
              <span className="absolute -right-4 -bottom-6 text-[110px] font-black text-slate-100/50 leading-none select-none group-hover:text-blue-100/40 transition-colors">
                1
              </span>
              <h4 className="font-extrabold text-slate-800 text-sm mb-2 relative z-10">Enter Your Details</h4>
              <p className="text-slate-500 text-xs leading-relaxed font-semibold relative z-10">
                Go to the <span className="text-blue-600 font-bold cursor-pointer hover:underline">'Credit Score form'</span> fill in your mobile number and other details, and click on 'Get Free Credit Report'.
              </p>
            </div>

            <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100/80 p-6 rounded-2xl relative overflow-hidden group transition-all duration-300">
              <span className="absolute -right-4 -bottom-6 text-[110px] font-black text-slate-100/50 leading-none select-none group-hover:text-blue-100/40 transition-colors">
                2
              </span>
              <h4 className="font-extrabold text-slate-800 text-sm mb-2 relative z-10">Verify Your Mobile Number</h4>
              <p className="text-slate-500 text-xs leading-relaxed font-semibold relative z-10">
                Complete the OTP verification of your mobile number to receive your credit score from multiple credit bureaus, including CIBIL.
              </p>
            </div>

            <div className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100/80 p-6 rounded-2xl relative overflow-hidden group transition-all duration-300">
              <span className="absolute -right-4 -bottom-6 text-[110px] font-black text-slate-100/50 leading-none select-none group-hover:text-blue-100/40 transition-colors">
                3
              </span>
              <h4 className="font-extrabold text-slate-800 text-sm mb-2 relative z-10">Track Your Credit Score</h4>
              <p className="text-slate-500 text-xs leading-relaxed font-semibold relative z-10">
                Your BanksCart account will be created, and your credit score will be updated every month to help you monitor your credit health.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <button
              onClick={() => { setFormStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-8 py-3.5 rounded-xl shadow-md hover:shadow-lg text-sm active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              Get Free Credit Score <ArrowRight className="w-4.5 h-4.5" />
            </button>
            <p className="text-[10px] text-slate-400 font-semibold italic text-center">
              Note: Your credit score is not impacted when you check it on BanksCart or through any credit bureau's platform directly.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 4: COMPARE YOUR CREDIT REPORT (FOURTH SCREENSHOT)                  */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-12">
          
          {/* Exclusively ribbon header */}
          <div className="bg-slate-900 px-6 py-4 flex justify-between items-center text-white relative">
            <div className="absolute right-0 top-0 w-32 h-full bg-amber-400/10 skew-x-12 transform"></div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-slate-900 font-black text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full">
                ★ Exclusively on BanksCart
              </span>
              <h3 className="text-base font-extrabold">Compare your Credit Report across 4 Bureau(s)</h3>
            </div>
            <span className="hidden sm:inline text-xs text-slate-400 font-medium">As of May 2026</span>
          </div>

          {/* Structured comparison table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-4.5 text-xs font-black text-slate-400 uppercase tracking-wider w-[24%]">Bureau</th>
                  <th className="p-4.5 text-center w-[19%]">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-extrabold border border-blue-100">CIBIL</span>
                  </th>
                  <th className="p-4.5 text-center w-[19%]">
                    <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-extrabold border border-teal-100">Experian</span>
                  </th>
                  <th className="p-4.5 text-center w-[19%]">
                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-extrabold border border-indigo-100">EQUIFAX</span>
                  </th>
                  <th className="p-4.5 text-center w-[19%]">
                    <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-extrabold border border-emerald-100">CRIF</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100/70 hover:bg-slate-50/30 transition-colors">
                  <td className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Refresh Date</td>
                  <td className="p-4 text-center font-bold text-slate-800 text-sm">20 Mar '26</td>
                  <td className="p-4 text-center font-bold text-slate-800 text-sm">20 Mar '26</td>
                  <td className="p-4 text-center font-bold text-slate-800 text-sm">20 Mar '26</td>
                  <td className="p-4 text-center font-bold text-slate-800 text-sm">20 Mar '26</td>
                </tr>
                <tr className="border-b border-slate-100/70 hover:bg-slate-50/30 transition-colors">
                  <td className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Score</td>
                  <td className="p-4 text-center">
                    <span className="text-xl font-black text-emerald-600 block">809</span>
                    <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-full">✔ Excellent</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-xl font-black text-teal-600 block">752</span>
                    <span className="text-[9px] font-bold text-teal-500 bg-teal-50 px-1.5 py-0.5 rounded-full">✔ Good</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-xl font-black text-emerald-600 block">855</span>
                    <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-full">✔ Excellent</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-xl font-black text-emerald-600 block">840</span>
                    <span className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-full">✔ Excellent</span>
                  </td>
                </tr>
                <tr className="border-b border-slate-100/70 hover:bg-slate-50/30 transition-colors">
                  <td className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Score Change</td>
                  <td className="p-4 text-center">
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-black px-2 py-0.5 rounded-full inline-flex items-center gap-0.5">
                      ↑ 1
                    </span>
                  </td>
                  <td className="p-4 text-center font-bold text-slate-400 text-sm">-</td>
                  <td className="p-4 text-center font-bold text-slate-400 text-sm">-</td>
                  <td className="p-4 text-center font-bold text-slate-400 text-sm">-</td>
                </tr>
                <tr className="hover:bg-slate-50/30 transition-colors">
                  <td className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">On Time Payments</td>
                  <td className="p-4 text-center font-bold text-slate-400 text-sm">-</td>
                  <td className="p-4 text-center font-bold text-slate-400 text-sm">-</td>
                  <td className="p-4 text-center font-bold text-slate-400 text-sm">-</td>
                  <td className="p-4 text-center font-bold text-slate-400 text-sm">-</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Download full report footer */}
          <div className="bg-blue-50/40 px-6 py-4.5 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xl">💡</span>
              <div>
                <h4 className="font-extrabold text-sm text-slate-800">Credit Score Insights</h4>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">A deeper look into the factors behind your score.</p>
              </div>
            </div>
            <button
              onClick={() => { setFormStep(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-6 py-2.5 rounded-xl shadow-sm text-xs transition-all flex items-center gap-2 cursor-pointer flex-shrink-0"
            >
              Download Full Report <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* SECTION 5: WHY IS CIBIL SCORE IMPORTANT (FIFTH SCREENSHOT)               */}
        {/* ========================================================================= */}
        <div className="space-y-4 mb-12">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">
              Why is CIBIL Score Important?
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed font-semibold max-w-3xl">
              Your credit score is one of the first things that a Bank or NBFC will check while evaluating your loan or credit card application. It shows lenders whether you are reliable or risky in repayment of your EMIs or credit card outstanding.
            </p>
          </div>

          {/* Light purple box with a 6-grid layout (3x2) */}
          <div className="bg-purple-50/40 rounded-3xl border border-purple-100 p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Card 1 */}
              <div className="bg-white rounded-2xl border border-purple-100/50 p-5 space-y-3 shadow-xs hover:shadow transition-shadow">
                <div className="w-10 h-10 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center font-black">
                  📊
                </div>
                <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed">
                  A good CIBIL score helps you access credit without much difficulty.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl border border-purple-100/50 p-5 space-y-3 shadow-xs hover:shadow transition-shadow">
                <div className="w-10 h-10 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center font-black">
                  %
                </div>
                <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed">
                  Many lenders offer lower rate of interest on loans to applicants with a strong credit score.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl border border-purple-100/50 p-5 space-y-3 shadow-xs hover:shadow transition-shadow">
                <div className="w-10 h-10 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center font-black">
                  📈
                </div>
                <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed">
                  The higher your credit score, the more likely lenders are to approve you for new credit.
                </p>
              </div>

              {/* Card 4 */}
              <div className="bg-white rounded-2xl border border-purple-100/50 p-5 space-y-3 shadow-xs hover:shadow transition-shadow">
                <div className="w-10 h-10 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center font-black">
                  📋
                </div>
                <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed">
                  Usually, a CIBIL Score of 760 and above is preferred by lenders for loan or credit card approval.
                </p>
              </div>

              {/* Card 5 */}
              <div className="bg-white rounded-2xl border border-purple-100/50 p-5 space-y-3 shadow-xs hover:shadow transition-shadow">
                <div className="w-10 h-10 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center font-black">
                  💳
                </div>
                <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed">
                  Many Banks and NBFCs also approve applications if the CIBIL score is between 700 and 760.
                </p>
              </div>

              {/* Card 6 */}
              <div className="bg-white rounded-2xl border border-purple-100/50 p-5 space-y-3 shadow-xs hover:shadow transition-shadow">
                <div className="w-10 h-10 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center font-black text-rose-500">
                  ✖
                </div>
                <p className="text-slate-700 text-xs sm:text-sm font-semibold leading-relaxed">
                  If your credit score is low (below 700), most lenders are likely to reject your loan application.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* EXTRA HIGH-DENSITY SEO GUIDES AND TERMINOLOGIES (MINIMUM 3101 WORDS)     */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl border border-slate-100 p-6 sm:p-10 shadow-sm">
          
          <div className="border-b border-slate-100 pb-5 mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
              Comprehensive CIBIL Credit Report & Score Guide (2026)
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 font-semibold leading-relaxed">
              Explore exhaustive, expert-curated analysis of credit metrics, bureau parameters, and repayment protection protocols to optimize your wealth index.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Sidebar navigation for the tabbed content */}
            <div className="lg:col-span-4 space-y-2">
              <button
                onClick={() => setActiveTab('basics')}
                className={`w-full flex justify-between items-center px-4 py-3 rounded-xl text-left text-xs sm:text-sm font-bold border transition-all outline-none ${activeTab === 'basics' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100'}`}
              >
                1. CIBIL Score Fundamentals
                <ArrowRight className={`w-4 h-4 ${activeTab === 'basics' ? 'text-white' : 'text-slate-400'}`} />
              </button>

              <button
                onClick={() => setActiveTab('calculation')}
                className={`w-full flex justify-between items-center px-4 py-3 rounded-xl text-left text-xs sm:text-sm font-bold border transition-all outline-none ${activeTab === 'calculation' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100'}`}
              >
                2. How Score is Calculated
                <ArrowRight className={`w-4 h-4 ${activeTab === 'calculation' ? 'text-white' : 'text-slate-400'}`} />
              </button>

              <button
                onClick={() => setActiveTab('repayment')}
                className={`w-full flex justify-between items-center px-4 py-3 rounded-xl text-left text-xs sm:text-sm font-bold border transition-all outline-none ${activeTab === 'repayment' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100'}`}
              >
                3. Repayment & CIBIL Protection
                <ArrowRight className={`w-4 h-4 ${activeTab === 'repayment' ? 'text-white' : 'text-slate-400'}`} />
              </button>

              <button
                onClick={() => setActiveTab('glossary')}
                className={`w-full flex justify-between items-center px-4 py-3 rounded-xl text-left text-xs sm:text-sm font-bold border transition-all outline-none ${activeTab === 'glossary' ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-100 hover:bg-slate-100'}`}
              >
                4. Glossary of Credit Terms
                <ArrowRight className={`w-4 h-4 ${activeTab === 'glossary' ? 'text-white' : 'text-slate-400'}`} />
              </button>
            </div>

            {/* Content area based on active tab */}
            <div className="lg:col-span-8 bg-slate-50/50 p-6 sm:p-8 border border-slate-100 rounded-2xl space-y-6">
              
              {activeTab === 'basics' && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-base sm:text-lg font-black text-slate-800 border-b border-slate-100 pb-2">
                    CIBIL Score Fundamentals & Core Mechanics
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Understanding the core mechanisms of your CIBIL score is the foundational step toward achieving complete financial autonomy and unlocking the country's most premium retail credit lines. A credit score, in essence, functions as a highly standardized mathematical representation of a consumer's historical borrowing behavior and payment compliance. Compiled systematically by licensed agencies like TransUnion CIBIL, Experian, Equifax, and CRIF High Mark, this three-digit number between 300 and 900 acts as a universal screening metric for underwriting cells at public, private, and non-banking financial institutions. By maintaining a clean payment history and keeping credit card balances under structured bounds, consumers can reliably boost their score into the prime zone (750+), qualifying for concessional floating lending rates.
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Furthermore, the impact of a prime credit history extends far beyond simple loan approvals. Borrowers in the prime 750+ CIBIL bracket enjoy significantly stronger negotiating power when discussing processing fee waivers, loan-to-value (LTV) limits, and the absolute margins added over repo lending rates. In a market governed by floating external benchmarks (such as EBLR or RLLR), even a minor 0.25% reduction in interest margins can translate into savings of lakhs of rupees over long-term home mortgages or business expansion loans. Additionally, premium lifestyle credit cards carrying Zero-Forex markup benefits, complimentary airport lounge passes, and accelerated reward programs are unlocked exclusively for high-score individuals. Timely repayments are not just a legal obligation, but a powerful mechanism to grow personal wealth.
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Additionally, under the latest central regulatory mandates established by the Reserve Bank of India (RBI), commercial lenders are required to report credit transactions and account updates to all active credit bureaus at regular 15-day intervals. This accelerated reporting timeline ensures that your credit report remains a highly accurate, real-time reflection of your financial obligations. It also implies that any missed payment or sudden spike in card balances will reflect on your records almost instantly, dropping your score and potentially triggering automatic credit limit reductions or temporary card locks by other issuers. Continuous vigilance, including monthly self-audits of your credit reports on BanksCart, protects your profile from unauthorized sweeps and technical duplication errors.
                  </p>
                </div>
              )}

              {activeTab === 'calculation' && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-base sm:text-lg font-black text-slate-800 border-b border-slate-100 pb-2">
                    How Your Credit Score is Calculated: Bureau Weightages
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    The mathematical modeling used by credit bureaus to compile your score relies on a structured, multi-dimensional algorithm that evaluates five main segments of your credit history. The single most crucial metric is your **Repayment History**, which commandingly accounts for a massive **35% of the total score computation**. Every timely payment of home loan EMIs, commercial retail lines, and monthly credit card outstanding balances compiles into a clean track record, demonstrating high reliability. Conversely, even a single payment delay exceeding 30 days past due (DPD) triggers a substantial score deduction, pulling your profile out of the prime category and signaling high default risks to underwriting teams.
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    The second most dominant factor is your **Credit Utilization Ratio (CUR)**, which contributes a significant **30% to your credit score**. CUR is calculated by dividing your total revolving outstanding balances by your cumulative approved credit limits. Under strict bureau guidelines, utilizing more than 30% of your approved limits is heavily penalized, as it indicates a high dependency on debt and potential household cash shortages. By executing mid-cycle credit card bill payments or securing limit upgrades without increasing daily discretionary spending, borrowers can keep their CUR in the optimal 10% to 20% range, directly compounding score improvements.
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    The remaining 35% of your score is determined by three variables: **Duration of Credit History (15%)**, **Credit Mix (10%)**, and **Recent Inquiries (10%)**. A longer duration of active, well-managed accounts signals seasoned repayment experience, protecting your score. Having a balanced credit mix of secured loans (like mortgages) and unsecured loans (like credit cards) is also viewed favorably, demonstrating versatility in managing diverse debt structures. Lastly, prospective borrowers must strictly limit the count of recent hard inquiries; submitting multiple loan applications to different lenders in a short timeframe triggers high risk flags, dropping your score instantly as it signals credit hunger.
                  </p>
                </div>
              )}

              {activeTab === 'repayment' && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-base sm:text-lg font-black text-slate-800 border-b border-slate-100 pb-2">
                    Repayment Optimization & CIBIL Bureau Protection
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Protecting your credit score from negative adjustments requires a highly disciplined, proactive management strategy built on modern digital banking automation tools. For active professionals with busy schedules, setting up secure **e-NACH auto-debit mandates** or centralized standing instructions directly linked to their primary payroll accounts is the single most effective way to eliminate late payment risks. Auto-debit systems can be configured to clear either the 'Total Outstanding Amount' or the 'Minimum Amount Due' on the statement due date, guaranteeing absolute compliance with billing calendars, avoiding painful late fee levies, and preserving credit bureau standing completely.
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Additionally, cardholders must navigate the crucial difference between the 'Total Outstanding' and the 'Minimum Due' carefully. While paying only the minimum amount due (usually 5% of the total balance plus applicable taxes) protects you from late fee penalties, it does not prevent daily interest compounding on the remaining unpaid balance. The compounding interest charges on credit cards in India typically range from 3.00% to 3.50% per month (averaging 36.00% to 42.00% per annum). Furthermore, under credit card agreement guidelines, paying only the minimum due immediately cancels your interest-free grace period, causing all subsequent routine swipes to attract daily interest charges from the very date of purchase, triggering rapid debt traps.
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    Lastly, regular monthly audits of your full credit report are vital to protect your financial index from administrative inaccuracies or fraudulent credit applications opened in your name. If you notice discrepancies on your report, such as closed loans marked as 'Active' or incorrect Days Past Due (DPD) codes, you must initiate an official online dispute directly on the TransUnion CIBIL CMS portal. Under statutory RBI timelines, bureaus and reporting banks are legally mandated to verify and resolve all customer-submitted credit report disputes within a maximum window of 30 working days, ensuring your credit health remains uncompromised.
                  </p>
                </div>
              )}

              {activeTab === 'glossary' && (
                <div className="space-y-4 animate-fadeIn">
                  <h3 className="text-base sm:text-lg font-black text-slate-800 border-b border-slate-100 pb-2">
                    Glossary of Core Credit & CIBIL Terminology
                  </h3>
                  <div className="grid grid-cols-1 gap-4 text-xs sm:text-sm">
                    <div className="border border-slate-100 p-3 rounded-xl bg-white">
                      <strong className="text-slate-800 font-bold block">Credit Utilization Ratio (CUR)</strong>
                      <span className="text-slate-500 mt-1 block leading-relaxed">The mathematical percentage of your revolving card balances against your total cumulative approved credit limit. Keep below 30% to maintain prime score standing.</span>
                    </div>
                    <div className="border border-slate-100 p-3 rounded-xl bg-white">
                      <strong className="text-slate-800 font-bold block">Days Past Due (DPD)</strong>
                      <span className="text-slate-500 mt-1 block leading-relaxed">An indicator on your credit report showing the exact count of days your repayment is delayed. A DPD code of '000' is the gold standard for prime borrowers.</span>
                    </div>
                    <div className="border border-slate-100 p-3 rounded-xl bg-white">
                      <strong className="text-slate-800 font-bold block">Hard Inquiry vs. Soft Inquiry</strong>
                      <span className="text-slate-500 mt-1 block leading-relaxed">Hard inquiries occur during bank evaluations and drop scores slightly; soft inquiries occur during self-checks on BanksCart and have zero score impact.</span>
                    </div>
                    <div className="border border-slate-100 p-3 rounded-xl bg-white">
                      <strong className="text-slate-800 font-bold block">No Dues Certificate (NOC)</strong>
                      <span className="text-slate-500 mt-1 block leading-relaxed">A legal document issued by the bank confirming a loan has been paid in full and closed, crucial to resolve open account disputes at credit bureaus.</span>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* ========================================================================= */}
          {/* ACCORDION FAQS SECTION                                                    */}
          {/* ========================================================================= */}
          <div className="border-t border-slate-100 pt-8 mt-8">
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
              <HelpCircle className="w-5.5 h-5.5 text-blue-600" /> Frequently Asked Questions
            </h3>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-slate-100 rounded-2xl overflow-hidden transition-colors">
                  <button
                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                    className="w-full flex justify-between items-center p-5 bg-slate-50/50 hover:bg-slate-50 text-left font-extrabold text-slate-700 text-xs sm:text-sm outline-none transition-all"
                  >
                    {faq.q}
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${activeFaq === index ? 'rotate-180 text-blue-600' : ''}`} />
                  </button>
                  {activeFaq === index && (
                    <div className="p-5 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-white leading-relaxed space-y-2">
                      <p>{faq.a}</p>
                      <p className="text-[10px] text-slate-400 font-semibold italic">
                        * In addition, individuals and corporate clients are highly encouraged to leverage the advanced search tools, financial projection modules, and real-time interest rate calculators available on BanksCart to verify historical trends, evaluate charges side-by-side, and track compliance rules to ensure maximum financial security.
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CibilCreditReportPage;
