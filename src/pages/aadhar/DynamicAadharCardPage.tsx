import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HelpCircle, ChevronDown, Check, Star, ShieldAlert, Sparkles, BookOpen, AlertCircle, Info, Landmark, MapPin, Search, Calendar, ShieldCheck, Download, Eye, Edit, Phone, Mail, Clock } from 'lucide-react';
import CibilCheckerForm from '../../components/common/CibilCheckerForm';
import { AADHAAR_PAGE_MAP, AadharPageContent, generateCityAadharPage } from '../../data/aadharPageData';

interface EditorialArticle {
  title: string;
  content: string[];
}

const getAadharDetailedArticles = (slug: string): EditorialArticle[] => {
  const formatSlug = (s: string) => {
    return s
      .split('-')
      .map(word => {
        if (word.toUpperCase() === 'NRI') return 'NRI';
        if (word.toUpperCase() === 'KYC') return 'KYC';
        if (word.toUpperCase() === 'UIDAI') return 'UIDAI';
        if (word.toUpperCase() === 'PDF') return 'PDF';
        if (word.toUpperCase() === 'XML') return 'XML';
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  };
  const readableName = formatSlug(slug);

  return [
    {
      title: `Strategic Digital Identity and Administrative Frameworks under ${readableName}`,
      content: [
        `Under the statutory mandates of the Unique Identification Authority of India (UIDAI), managing your credentials under **${readableName}** is a critical operational process for individual residents, businesses, and compliance professionals. Aadhaar has evolved from a simple identity proof into the cornerstone of India's digital economy. The Aadhaar Act of 2016 establishes a robust legal framework ensuring that these random 12-digit numbers are securely backed by multi-layered biometric deduplication (10 fingerprints and dual iris scans).`,
        `Linking your primary identity assets across modern financial sectors ensures uninterrupted access to Direct Benefit Transfer (DBT) subsidies, NRE/NRO banking structures, and corporate salary disbursements. By eliminating administrative barriers, BanksCart's UIDAI guide provides residents with clear, step-by-step strategies to verify number authenticity, lock biometrics against unauthorized database lookups, and execute online corrections seamlessly.`
      ]
    },
    {
      title: `Privacy Safeguards & Biometric Locks: Preventing Identity Theft & Frauds`,
      content: [
        `Data security represents the foremost priority within the **${readableName}** infrastructure. To prevent phishing, fraudulent SIM card generation, or unauthorized bank database queries, UIDAI has implemented state-of-the-art cryptographic safeguards. A prime example is the 'Biometric Lock/Unlock' feature, which allows residents to freeze their fingerprint and iris records digitally via the myAadhaar portal.`,
        `When biometrics are locked, any external e-KYC query returns a strict deactivation alert, completely neutralizing potential fraud attempts. Residents can temporarily unlock their biometrics via secure OTP approvals whenever completing physical KYC at bank branches. Additionally, opting for 'Masked Aadhaar' downloads (which hide the first 8 digits) ensures high-grade privacy during hotel check-ins or transport verifications.`
      ]
    },
    {
      title: `Offline Verification Slabs: Harnessing Secure QR Codes & Paperless XML`,
      content: [
        `For institutions and service providers validating identities under the **${readableName}** rules, offline verification modules offer a lightweight, highly secure, and compliant alternative to active database hits. UIDAI provides digitally signed secure QR codes embedded inside every e-Aadhaar PDF. By scanning this QR code via certified offline readers, organizations can instantly verify an applicant's photo, name, date of birth, and address without needing internet access or collecting raw Aadhaar numbers.`,
        `Similarly, the 'Offline Paperless e-KYC' generates an encrypted XML/ZIP file protected by a user-defined 4-digit share code. This secure file format allows residents to share their verified demographic details with complete peace of mind, fully complying with national IT security policies and safeguarding personal data integrity.`
      ]
    }
  ];
};

const DynamicAadharCardPage: React.FC = () => {
  const { subPath } = useParams<{ subPath: string }>();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'download' | 'verify' | 'status' | 'lock'>('download');
  
  // Interactive states for UIDAI simulator tools
  const [aadhaarNum, setAadhaarNum] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [verifySuccess, setVerifySuccess] = useState(false);
  const [statusId, setStatusId] = useState('');
  const [statusChecked, setStatusChecked] = useState(false);
  const [biometricsLocked, setBiometricsLocked] = useState(false);

  const currentSlug = subPath || 'overview';
  
  // Fetch dynamic page contents from map or procedural generator for cities
  const isCityPage = currentSlug.includes('centers-in') || currentSlug.includes('centres-in') || currentSlug.includes('centre-in') || currentSlug.includes('center-in');
  const pageContent = isCityPage 
    ? generateCityAadharPage(currentSlug) 
    : (AADHAAR_PAGE_MAP[currentSlug] || AADHAAR_PAGE_MAP["overview"]);

  const detailedArticles = getAadharDetailedArticles(currentSlug);

  // Scroll to top on route changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveFaq(null);
    setOtpSent(false);
    setVerifySuccess(false);
    setStatusChecked(false);
    setAadhaarNum('');
    setOtpCode('');
    setStatusId('');
  }, [subPath]);

  const handleSendOtp = () => {
    if (aadhaarNum.length !== 12) {
      alert("Please enter a valid 12-digit Aadhaar number.");
      return;
    }
    setOtpSent(true);
    alert("Mock OTP has been sent successfully to your registered mobile number: ******9999.");
  };

  const handleVerifyOtp = () => {
    if (otpCode.length !== 6) {
      alert("Please enter the 6-digit verification code.");
      return;
    }
    setVerifySuccess(true);
  };

  const handleCheckStatus = () => {
    if (statusId.trim() === '') {
      alert("Please enter your URN/EID code.");
      return;
    }
    setStatusChecked(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16 font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Banner section */}
        <div className="bg-gradient-to-r from-slate-800 via-indigo-900 to-slate-900 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-12 translate-y-12">
            <span className="text-[180px] font-black leading-none select-none">UIDAI</span>
          </div>
          <div className="max-w-3xl relative z-10">
            <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
              {pageContent.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-6 tracking-tight leading-tight">
              {pageContent.title}
            </h1>
            <p className="text-slate-200 text-base sm:text-lg mt-4 leading-relaxed max-w-2xl font-medium">
              {pageContent.intro}
            </p>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Interactive Tools & Rich Articles */}
          <div className="lg:col-span-7 space-y-10 text-slate-700">
            
            {/* Interactive UIDAI Simulator Dashboard */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                UIDAI Online Tools Simulation Suite
              </h3>
              <p className="text-xs text-slate-400 mb-6">Complete secure mock transactions entirely online.</p>

              {/* Service Tab Selectors */}
              <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-100 pb-4">
                <button
                  onClick={() => { setActiveTab('download'); setVerifySuccess(false); setOtpSent(false); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'download' ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <Download className="w-4 h-4" /> Download e-Aadhaar
                </button>
                <button
                  onClick={() => { setActiveTab('verify'); setVerifySuccess(false); setOtpSent(false); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'verify' ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" /> Verify Aadhaar
                </button>
                <button
                  onClick={() => { setActiveTab('status'); setStatusChecked(false); }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'status' ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <Clock className="w-4 h-4" /> Check Status
                </button>
                <button
                  onClick={() => setActiveTab('lock')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === 'lock' ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-transparent'
                  }`}
                >
                  <ShieldAlert className="w-4 h-4" /> Lock Biometrics
                </button>
              </div>

              {/* Dynamic Interactive Tab Views */}
              {activeTab === 'download' && (
                <div className="space-y-6">
                  {!verifySuccess ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Aadhaar Number (12 Digits) *</label>
                        <input
                          type="text"
                          maxLength={12}
                          value={aadhaarNum}
                          onChange={(e) => setAadhaarNum(e.target.value.replace(/\D/g, ''))}
                          placeholder="Enter your 12-digit number (e.g. 501234567890)"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm font-semibold"
                        />
                      </div>
                      
                      {otpSent && (
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Enter 6-Digit SMS OTP *</label>
                          <input
                            type="text"
                            maxLength={6}
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                            placeholder="Enter 6-digit mock OTP (e.g. 123456)"
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm font-semibold tracking-widest text-center"
                          />
                        </div>
                      )}

                      {!otpSent ? (
                        <button
                          onClick={handleSendOtp}
                          className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-colors text-sm"
                        >
                          Send OTP
                        </button>
                      ) : (
                        <button
                          onClick={handleVerifyOtp}
                          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md transition-colors text-sm"
                        >
                          Verify & Generate PDF
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center space-y-4">
                      <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                        <Check className="w-6 h-6" />
                      </div>
                      <h4 className="font-bold text-green-800 text-sm">E-Aadhaar PDF Generated Successfully!</h4>
                      <p className="text-xs text-green-600 leading-relaxed max-w-sm mx-auto">
                        Your secure downloaded E-Aadhaar file has been compiled. Use your standard password (4 letters of name in CAPITAL + year of birth) to open the file.
                      </p>
                      <button
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = '#';
                          link.setAttribute('download', 'eAadhaar_Secure.pdf');
                          alert("A secure file download has been initiated in your browser.");
                        }}
                        className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl text-xs transition-colors"
                      >
                        Click to Download eAadhaar.pdf
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'verify' && (
                <div className="space-y-6">
                  {!verifySuccess ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Aadhaar Number to Verify *</label>
                        <input
                          type="text"
                          maxLength={12}
                          value={aadhaarNum}
                          onChange={(e) => setAadhaarNum(e.target.value.replace(/\D/g, ''))}
                          placeholder="Enter 12-digit number (e.g. 501234567890)"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm font-semibold"
                        />
                      </div>
                      <button
                        onClick={() => {
                          if (aadhaarNum.length !== 12) {
                            alert("Please enter a valid 12-digit number.");
                            return;
                          }
                          setVerifySuccess(true);
                        }}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-colors text-sm"
                      >
                        Verify Aadhaar Authenticity
                      </button>
                    </div>
                  ) : (
                    <div className="bg-slate-50 rounded-2xl border border-slate-100 p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">Aadhaar Verification Completed</h4>
                          <p className="text-slate-400 text-xs">Number: {aadhaarNum}</p>
                        </div>
                      </div>
                      <hr className="border-slate-100" />
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="bg-white p-3 rounded-xl border border-slate-100">
                          <span className="text-slate-400 block mb-1">Status</span>
                          <span className="font-bold text-green-600 flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span> Active
                          </span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-100">
                          <span className="text-slate-400 block mb-1">Age Band</span>
                          <span className="font-bold text-slate-700">20 - 30 Years</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-100">
                          <span className="text-slate-400 block mb-1">Gender</span>
                          <span className="font-bold text-slate-700">MALE</span>
                        </div>
                        <div className="bg-white p-3 rounded-xl border border-slate-100">
                          <span className="text-slate-400 block mb-1">State</span>
                          <span className="font-bold text-slate-700">Delhi / Maharashtra</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setVerifySuccess(false)}
                        className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                      >
                        Verify Another Aadhaar
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'status' && (
                <div className="space-y-6">
                  {!statusChecked ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">URN / Enrollment ID (EID) *</label>
                        <input
                          type="text"
                          value={statusId}
                          onChange={(e) => setStatusId(e.target.value)}
                          placeholder="Enter 14-digit URN or 28-digit EID"
                          className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-sm font-semibold"
                        />
                      </div>
                      <button
                        onClick={handleCheckStatus}
                        className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md transition-colors text-sm"
                      >
                        Check Live Status
                      </button>
                    </div>
                  ) : (
                    <div className="bg-indigo-50/50 rounded-2xl border border-indigo-100 p-6 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center">
                          <Clock className="w-5 h-5 animate-pulse" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">URN Request Found</h4>
                          <p className="text-slate-400 text-xs">Request ID: {statusId}</p>
                        </div>
                      </div>
                      <hr className="border-indigo-100" />
                      <div className="p-4 bg-white rounded-xl border border-indigo-100 flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-semibold text-slate-500">Current Status:</span>
                        <span className="font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1 uppercase text-xs tracking-wider animate-pulse">
                          Under Process (UIDAI Verification)
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed text-center">
                        Your demographic update request has been successfully registered at Aadhaar Seva Kendra. The verification queue takes 3 to 7 working days.
                      </p>
                      <button
                        onClick={() => setStatusChecked(false)}
                        className="w-full py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl text-xs transition-colors"
                      >
                        Check Another Status
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'lock' && (
                <div className="space-y-6">
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">Secure Biometric Locker</h4>
                          <p className="text-slate-400 text-xs">Lock your fingerprint logs instantly</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={biometricsLocked}
                          onChange={(e) => {
                            setBiometricsLocked(e.target.checked);
                            alert(`Mock Biometrics have been successfully ${e.target.checked ? "LOCKED" : "UNLOCKED"}. All fingerprint/iris queries are now ${e.target.checked ? "blocked" : "permitted"}.`);
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    <hr className="border-slate-100" />
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Locking your biometrics prevents banks, telecom agencies, or other entities from executing fingerprint or iris e-KYC queries against your Aadhaar record. You can temporarily unlock them instantly whenever you need.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Main Page Article/Details */}
            {pageContent.moreIntro && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <p className="text-sm text-slate-650 leading-relaxed font-sans font-medium text-justify">
                  {pageContent.moreIntro}
                </p>
              </div>
            )}

            {/* Detailed Editorial Sections - Rich Data like the Zero Coupon Bonds Sample */}
            {detailedArticles.length > 0 && (
              <div className="space-y-8">
                {detailedArticles.map((art, idx) => (
                  <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-3">
                      <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                      {art.title}
                    </h3>
                    {art.content.map((p, pIdx) => (
                      <p key={pIdx} className="text-slate-600 text-sm leading-relaxed font-sans font-medium text-justify">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {/* Checklist highlights */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                {pageContent.checklistTitle}
              </h3>
              <div className="space-y-4">
                {pageContent.checklist.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start pb-4 border-b border-slate-50 last:border-0 last:pb-0">
                    <div className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed font-semibold">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Local Centers Table (For City pages) */}
            {pageContent.centers && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                  UIDAI Registered Aadhaar Centers
                </h3>
                <div className="space-y-4">
                  {pageContent.centers.map((center, idx) => (
                    <div key={idx} className="border border-slate-100 rounded-xl p-4 sm:p-6 hover:border-indigo-100 hover:bg-slate-50/30 transition-all space-y-3">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <h4 className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-1.5">
                          <Landmark className="w-4 h-4 text-indigo-600" />
                          {center.name}
                        </h4>
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-full px-2.5 py-0.5">
                          {center.type}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                        {center.address}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs border-t border-slate-50 text-slate-400">
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {center.timing}</span>
                        <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Helpline: {center.contact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Standard uidai fee table if present */}
            {pageContent.tableRows && pageContent.tableHeaders && (
              <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-slate-800 mb-4">{pageContent.tableTitle}</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100">
                        {pageContent.tableHeaders.map((header, idx) => (
                          <th key={idx} className="p-3 font-semibold text-slate-700">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {pageContent.tableRows.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50">
                          <td className="p-3 font-bold text-slate-800">{row[0]}</td>
                          <td className="p-3 font-semibold text-indigo-600">{row[1]}</td>
                          <td className="p-3 text-slate-500">{row[2]}</td>
                          <td className="p-3 text-slate-500">{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* FAQs Accordion Block */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-indigo-600" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                {pageContent.faqs.map((faq, index) => (
                  <div key={index} className="border border-slate-100 rounded-xl overflow-hidden transition-colors">
                    <button
                      onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                      className="w-full flex justify-between items-center p-4 bg-slate-50/50 hover:bg-slate-50 text-left font-bold text-slate-700 text-sm outline-none transition-colors"
                    >
                      {faq.q}
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === index ? 'rotate-180 text-indigo-600' : ''}`} />
                    </button>
                    {activeFaq === index && (
                      <div className="p-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 bg-white leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Cibil Checker Lead Generation Form */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <CibilCheckerForm sourcePage={`${pageContent.title} Portal`} />
          </div>

        </div>

      </div>
    </div>
  );
};

export default DynamicAadharCardPage;
