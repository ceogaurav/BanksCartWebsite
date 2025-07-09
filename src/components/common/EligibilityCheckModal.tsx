import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, CheckCircle, Loader2, AlertTriangle, User, Mail, Phone, Calendar, MapPin, Briefcase, Building } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

interface EligibilityCheckModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLoanType?: string;
}

// Expanded Mock MCA Company List (IMPORTANT: The data.gov.in API endpoint provided does NOT support
// direct company name search. Reverting to mock data for autocomplete functionality.
// For real-time search, a different API or backend filtering would be needed.)
const mockIndianCompanies = [
  "Reliance Industries Limited",
  "Tata Consultancy Services",
  "HDFC Bank Limited",
  "ICICI Bank Limited",
  "Infosys Limited",
  "Hindustan Unilever Limited",
  "State Bank of India",
  "Bharti Airtel Limited",
  "Axis Bank Limited",
  "Larsen & Toubro Limited",
  "Wipro Limited",
  "Kotak Mahindra Bank Limited",
  "Asian Paints Limited",
  "Maruti Suzuki India Limited",
  "Tech Mahindra Limited",
  "Bajaj Finance Limited",
  "Nestle India Limited",
  "UltraTech Cement Limited",
  "Power Grid Corporation of India Limited",
  "NTPC Limited",
  "Adani Enterprises Limited",
  "JSW Steel Limited",
  "Grasim Industries Limited",
  "Mahindra & Mahindra Limited",
  "IndusInd Bank Limited",
  "Sun Pharmaceutical Industries Limited",
  "Dr. Reddy's Laboratories Limited",
  "Cipla Limited",
  "Eicher Motors Limited",
  "Hero MotoCorp Limited",
  "Britannia Industries Limited",
  "Godrej Consumer Products Limited",
  "Dabur India Limited",
  "Pidilite Industries Limited",
  "TVS Motor Company Limited",
  "Bharat Petroleum Corporation Limited",
  "Indian Oil Corporation Limited",
  "Oil and Natural Gas Corporation Limited",
  "Coal India Limited",
  "GAIL (India) Limited",
  "HCL Technologies Limited",
  "Bajaj Auto Limited",
  "Titan Company Limited",
  "Shree Cement Limited",
  "Divi's Laboratories Limited",
  "Apollo Hospitals Enterprise Limited",
  "DLF Limited",
  "Godrej Properties Limited",
  "Prestige Estates Projects Limited",
  "Sobha Limited",
  "Vedanta Limited",
  "Hindalco Industries Limited",
  "Tata Steel Limited",
  "Jindal Steel & Power Limited",
  "Steel Authority of India Limited",
  "Cement Corporation of India Limited",
  "Ambuja Cements Limited",
  "ACC Limited",
  "Grasim Industries Limited",
  "UltraTech Cement Limited",
  "Shree Cement Limited",
  "Dalmia Bharat Limited",
  "Ramco Cements Limited",
  "JK Cement Limited",
  "Star Cement Limited",
  "Orient Cement Limited",
  "The India Cements Limited",
  "Birla Corporation Limited",
  "HeidelbergCement India Limited",
  "Kesoram Industries Limited",
  "Century Textiles and Industries Limited",
  "Raymond Limited",
  "Arvind Limited",
  "Welspun India Limited",
  "Trident Limited",
  "Himatsingka Seide Limited",
  "Vardhman Textiles Limited",
  "KPR Mill Limited",
  "Page Industries Limited",
  "Lux Industries Limited",
  "Dollar Industries Limited",
  "Rupa & Company Limited",
  "Ashok Leyland Limited",
  "Tata Motors Limited",
  "Mahindra & Mahindra Limited",
  "Maruti Suzuki India Limited",
  "Hero MotoCorp Limited",
  "Bajaj Auto Limited",
  "TVS Motor Company Limited",
  "Eicher Motors Limited",
  "Swaraj Engines Limited",
  "Force Motors Limited",
  "SML Isuzu Limited",
  "Escorts Kubota Limited",
  "VST Tillers Tractors Limited",
  "Greaves Cotton Limited",
  "Cummins India Limited",
  "Bosch Limited",
  "Motherson Sumi Systems Limited",
  "Apollo Tyres Limited",
  "MRF Limited",
  "Ceat Limited",
  "JK Tyre & Industries Limited",
  "Balkrishna Industries Limited",
  "Exide Industries Limited",
  "Amaraja Batteries Limited",
  "Graphite India Limited",
  "HEG Limited",
  "Philips Carbon Black Limited",
  "Rain Industries Limited",
  "Deepak Fertilizers and Petrochemicals Corporation Limited",
  "GSFC Limited",
  "National Fertilizers Limited",
  "Rashtriya Chemicals and Fertilizers Limited",
  "Coromandel International Limited",
  "Zuari Agro Chemicals Limited",
  "Chambal Fertilizers and Chemicals Limited",
  "Mangalore Chemicals & Fertilizers Limited",
  "Paradeep Phosphates Limited",
  "Gujarat Narmada Valley Fertilizers & Chemicals Limited",
  "Gujarat State Fertilizers & Chemicals Limited",
  "Aarti Industries Limited",
  "Deepak Nitrite Limited",
  "Navin Fluorine International Limited",
  "SRF Limited",
  "Fine Organic Industries Limited",
  "Clean Science and Technology Limited",
  "Galaxy Surfactants Limited",
  "Rossari Biotech Limited",
  "Vinati Organics Limited",
  "Balaji Amines Limited",
  "Alkyl Amines Chemicals Limited",
  "Neogen Chemicals Limited",
  "Anupam Rasayan India Limited",
  "Laxmi Organic Industries Limited",
  "Tatva Chintan Pharma Chem Limited",
  "Chemcon Speciality Chemicals Limited",
  "Home First Finance Company India Limited",
  "Aavas Financiers Limited",
  "Can Fin Homes Limited",
  "Repco Home Finance Limited",
  "PNB Housing Finance Limited",
  "LIC Housing Finance Limited",
  "IndiaBulls Housing Finance Limited",
  "GIC Housing Finance Limited",
  "Dewan Housing Finance Corporation Limited", // Note: DHFL is under resolution
  "Muthoot Finance Limited",
  "Manappuram Finance Limited",
  "Shriram Finance Limited",
  "Bajaj Finserv Limited",
  "Cholamandalam Investment and Finance Company Limited",
  "Mahindra & Mahindra Financial Services Limited",
  "Power Finance Corporation Limited",
  "REC Limited",
  "Indian Railway Finance Corporation Limited",
  "National Aluminium Company Limited",
  "Hindustan Copper Limited",
  "NMDC Limited",
  "MOIL Limited",
  "Gujarat Mineral Development Corporation Limited",
  "KIOCL Limited",
  "The Sandur Manganese & Iron Ores Limited",
  "GMDC Limited",
  "Ashapura Minechem Limited",
  "Orient Refractories Limited",
  "Vesuvius India Limited",
  "Graphite India Limited",
  "HEG Limited",
  "Rain Industries Limited",
  "Philips Carbon Black Limited",
  "Himadri Speciality Chemical Limited",
  "Kabra Extrusion Technik Limited",
  "Polyplex Corporation Limited",
  "Uflex Limited",
  "Jindal Poly Films Limited",
  "Cosmo First Limited",
  "Garware Hi-Tech Films Limited",
  "Essel Propack Limited",
  "Huhtamaki India Limited",
  "TCPL Packaging Limited",
  "Manjushree Technopack Limited",
  "Flexituff Ventures International Limited",
  "Xpro India Limited",
  "Bilcare Limited",
  "Mold-Tek Packaging Limited",
  "Time Technoplast Limited",
  "Responsive Industries Limited",
  "Supreme Industries Limited",
  "Finolex Industries Limited",
  "Astral Limited",
  "Prince Pipes and Fittings Limited",
  "APL Apollo Tubes Limited",
  "Jindal Saw Limited",
  "Welspun Corp Limited",
  "Ratnamani Metals & Tubes Limited",
  "Goodluck India Limited",
  "Suraj Limited",
  "Prakash Industries Limited",
  "Jindal Stainless Limited",
  "Jindal Stainless (Hisar) Limited",
  "APL Apollo Tubes Limited",
  "Tata Metaliks Limited",
  "Electrosteel Castings Limited",
  "Jai Balaji Industries Limited",
  "Srikalahasthi Pipes Limited",
  "Manaksia Limited",
  "Mishra Dhatu Nigam Limited",
  "Bharat Forge Limited",
  "Ramkrishna Forgings Limited",
  "MM Forgings Limited",
  "Sona BLW Precision Forgings Limited",
  "Endurance Technologies Limited",
  "Sundram Fasteners Limited",
  "GNA Axles Limited",
  "Talbros Automotive Components Limited",
  "JBM Auto Limited",
  "Munjal Showa Limited",
  "Federal-Mogul Goetze (India) Limited",
  "Rico Auto Industries Limited",
  "Jamna Auto Industries Limited",
  "Lumax Industries Limited",
  "Minda Industries Limited",
  "Varroc Engineering Limited",
  "Suprajit Engineering Limited",
  "Fiem Industries Limited",
  "Spark Minda, Ashok Minda Group",
  "Automotive Axles Limited",
  "WABCO India Limited",
  "Sundaram Clayton Limited",
  "Wheels India Limited",
  "Jay Bharat Maruti Limited",
  "Bharat Seats Limited",
  "Subros Limited",
  "Denso India Limited",
  "Craftsman Automation Limited",
  "Sansera Engineering Limited",
  "Rolex Rings Limited",
  "MTAR Technologies Limited",
  "Data Patterns (India) Limited",
  "Paras Defence and Space Technologies Limited",
  "Mazagon Dock Shipbuilders Limited",
  "Garden Reach Shipbuilders & Engineers Limited",
  "Cochin Shipyard Limited",
  "Hindustan Aeronautics Limited",
  "Bharat Electronics Limited",
  "Bharat Dynamics Limited",
  "BEML Limited",
  "GRSE Limited",
  "Goa Shipyard Limited",
  "Cochin Shipyard Limited",
  "Defence Public Sector Undertakings (DPSUs)",
  "Indian Railways",
  "National Highways Authority of India (NHAI)",
  "Power Grid Corporation of India Limited",
  "NTPC Limited",
  "NHPC Limited",
  "SJVN Limited",
  "THDC India Limited",
  "Power Finance Corporation Limited",
  "REC Limited",
  "Adani Power Limited",
  "Tata Power Company Limited",
  "Reliance Power Limited",
  "Torrent Power Limited",
  "CESC Limited",
  "Jindal Steel & Power Limited",
  "JSW Energy Limited",
  "NLC India Limited",
  "Gujarat State Electricity Corporation Limited",
  "Maharashtra State Power Generation Company Limited",
  "Uttar Pradesh Rajya Vidyut Utpadan Nigam Limited",
  "Madhya Pradesh Power Generating Company Limited",
  "Chhattisgarh State Power Generation Company Limited",
  "Odisha Power Generation Corporation Limited",
  "Damodar Valley Corporation",
  "Neyveli Lignite Corporation of India Limited",
  "Coal India Limited",
  "Singareni Collieries Company Limited",
  "Gujarat Mineral Development Corporation Limited",
  "Reliance Infrastructure Limited",
  "Adani Transmission Limited",
  "Sterlite Power Transmission Limited",
  "Kalpataru Power Transmission Limited",
  "KEC International Limited",
  "Skipper Limited",
  "Voltamp Transformers Limited",
  "Transformers and Rectifiers (India) Limited",
  "GE T&D India Limited",
  "Siemens Limited",
  "ABB India Limited",
  "Schneider Electric Infrastructure Limited",
  "Honeywell Automation India Limited",
  "Thermax Limited",
  "Kirloskar Brothers Limited",
  "Kirloskar Oil Engines Limited",
  "Praj Industries Limited",
  "Ion Exchange (India) Limited",
  "Va Tech Wabag Limited",
  "Jash Engineering Limited",
  "WPIL Limited",
  "Ksb Limited",
  "Grundfos Pumps India Private Limited",
  "Wilo Mather and Platt Pumps Private Limited",
  "Shakti Pumps (India) Limited",
  "Roto Pumps Limited",
  "Hawa Engineers Limited",
  "Kirloskar Pneumatic Company Limited",
  "Elgi Equipments Limited",
  "Ingersoll-Rand (India) Limited",
  "Atlas Copco (India) Limited",
  "Kennametal India Limited",
  "Sandvik Asia Private Limited",
  "Timken India Limited",
  "SKF India Limited",
  "FAG Bearings India Limited",
  "Schaeffler India Limited",
  "NRB Bearings Limited",
  "ABC Bearings Limited",
  "Rollatainers Limited",
  "Ess Dee Aluminium Limited",
  "Hindustan Tin Works Limited",
  "Precision Containeurs Limited",
  "TCPL Packaging Limited",
  "Shree Krishna Paper Mills & Industries Limited",
  "Emami Paper Mills Limited",
  "Seshasayee Paper and Boards Limited",
  "Andhra Paper Limited",
  "West Coast Paper Mills Limited",
  "JK Paper Limited",
  "Orient Paper & Industries Limited",
  "Satia Industries Limited",
  "Genus Paper & Boards Limited",
  "N R Agarwal Industries Limited",
  "Shreyans Industries Limited",
  "Bindal Papers Mills Limited",
  "Rama Paper Mills Limited",
  "Khanna Paper Mills Limited",
  "Century Paper and Board Mills Limited",
  "Tamil Nadu Newsprint and Papers Limited",
  "International Paper APPM Limited",
  "Star Paper Mills Limited",
  "NR Agarwal Industries Limited",
  "Shreyans Industries Limited",
  "Bindal Papers Mills Limited",
  "Rama Paper Mills Limited",
  "Khanna Paper Mills Limited",
  "Century Paper and Board Mills Limited",
  "Tamil Nadu Newsprint and Papers Limited",
  "International Paper APPM Limited",
  "Star Paper Mills Limited"
];


const EligibilityCheckModal: React.FC<EligibilityCheckModalProps> = ({ isOpen, onClose, initialLoanType = '' }) => {
  const [fullName, setFullName] = useState('');
  const [emailUsername, setEmailUsername] = useState('');
  const [emailDomain, setEmailDomain] = useState('gmail.com');
  const [phoneNumberDigits, setPhoneNumberDigits] = useState('');
  const [loanType, setLoanType] = useState(initialLoanType);
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [salary, setSalary] = useState(''); // Changed from 'income' to 'salary' for consistency with previous changes
  const [cibilScore, setCibilScore] = useState('');

  const [employmentType, setEmploymentType] = useState<'salaried' | 'self-employed' | ''>('');
  const [companyName, setCompanyName] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState<string[]>([]);
  const companyInputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [eligibleLoanAmount, setEligibleLoanAmount] = useState<number | null>(null); // Changed from isEligibleForHighLoan
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const navigate = useNavigate();

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
      setSalary(''); // Reset salary
      setCibilScore('');
      setEmploymentType('');
      setCompanyName('');
      setFilteredCompanies([]);
      setErrors({});
      setIsSubmitting(false);
      setSubmissionSuccess(false);
      setEligibleLoanAmount(null); // Reset eligible loan amount
      setSubmissionError(null);
    }
  }, [isOpen, initialLoanType]);

  // Handle company name input and filter suggestions using mock data
  const handleCompanyNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCompanyName(value);
    if (value.length > 2) {
      const filtered = mockIndianCompanies.filter(company =>
        company.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 10);
      setFilteredCompanies(filtered);
    } else {
      setFilteredCompanies([]);
    }
  }, []);

  // Handle click on a suggestion
  const handleSuggestionClick = (company: string) => {
    setCompanyName(company);
    setFilteredCompanies([]);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node) &&
          companyInputRef.current && !companyInputRef.current.contains(event.target as Node)) {
        setFilteredCompanies([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


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
    if (!salary.trim()) { // Validate salary field
      newErrors.salary = 'Monthly Salary is required.';
    } else if (isNaN(Number(salary)) || Number(salary) <= 0) {
      newErrors.salary = 'Monthly Salary must be a positive number.';
    }

    if (!employmentType) {
      newErrors.employmentType = 'Employment Type is required.';
    } else if (employmentType === 'salaried' && !companyName.trim()) {
      newErrors.companyName = 'Company Name is required for salaried individuals.';
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
    setEligibleLoanAmount(null); // Reset eligible loan amount

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
      // Calculate eligible loan amount based on salary (e.g., 4 times monthly salary)
      const calculatedLoanAmount = Number(salary) * 4;
      setEligibleLoanAmount(calculatedLoanAmount);

      const eligibilityData = {
        fullName,
        email: fullEmail,
        phoneNumber: fullPhoneNumber,
        loanType,
        pincode,
        city,
        salary: Number(salary), // Use salary field
        employmentType,
        companyName: employmentType === 'salaried' ? companyName : null,
        cibilScore: cibilScore.trim() === '' ? null : Number(cibilScore),
        eligibleLoanAmount: calculatedLoanAmount, // Store calculated amount
        userId: userId,
        timestamp: serverTimestamp(),
        status: 'Initial Check',
      };

      const eligibilityCollectionRef = collection(db, `artifacts/${appId}/public/data/eligibilityChecks`);
      await addDoc(eligibilityCollectionRef, eligibilityData);

      setSubmissionSuccess(true);
      // Removed the navigate to /eligibility, as the user wanted to see the result in the modal.
      // The modal will now stay open showing the success message and eligible amount.
      // User can close it manually.
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
      {/* Dynamic Background Layer */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animated-gradient-bg"></div>
      </div>

      {/* Modal Content */}
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-lg p-6 sm:p-8 relative z-10 transform transition-all scale-100 opacity-100 max-h-[90vh] overflow-y-auto">
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
            <form onSubmit={handleSubmit} className="space-y-4 pb-20">
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

              {/* Employment Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Briefcase className="inline-block h-4 w-4 mr-1 text-gray-500" /> Employment Type
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="employmentType"
                      value="salaried"
                      checked={employmentType === 'salaried'}
                      onChange={() => setEmploymentType('salaried')}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Salaried</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="employmentType"
                      value="self-employed"
                      checked={employmentType === 'self-employed'}
                      onChange={() => { setEmploymentType('self-employed'); setCompanyName(''); setFilteredCompanies([]); }}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2 text-gray-700">Self-employed</span>
                  </label>
                </div>
                {errors.employmentType && <p className="text-red-500 text-xs mt-1">{errors.employmentType}</p>}
              </div>

              {/* Company Name Field (Conditional) */}
              {employmentType === 'salaried' && (
                <div className="relative">
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                    <Building className="inline-block h-4 w-4 mr-1 text-gray-500" /> Working Company Name
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    ref={companyInputRef}
                    value={companyName}
                    onChange={handleCompanyNameChange}
                    className={`w-full px-4 py-2 border ${errors.companyName ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    placeholder="e.g., Tata Consultancy Services"
                    required
                  />
                  {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
                  {filteredCompanies.length > 0 && (
                    <div ref={suggestionsRef} className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto">
                      {filteredCompanies.map((company, index) => (
                        <div
                          key={index}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-800"
                          onClick={() => handleSuggestionClick(company)}
                        >
                          {company}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Salary (INR)
                </label>
                <input
                  type="number"
                  id="salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className={`w-full px-4 py-2 border ${errors.salary ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                  placeholder="e.g., 50000"
                  min="0"
                  step="1000"
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
                  placeholder="e.g., 750"
                  min="300"
                  max="900"
                />
                {errors.cibilScore && <p className="text-red-500 text-xs mt-1">{errors.cibilScore}</p>}
              </div>

              {submissionError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative flex items-center gap-2" role="alert">
                  <AlertTriangle className="h-5 w-5" />
                  <span className="block sm:inline">{submissionError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5" /> Check Eligibility
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center py-8">
            <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6 animate-bounce" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Eligibility Check Complete!</h2>
            <p className="text-lg text-gray-700 mb-4">
              Thank you for submitting your details. Based on your provided salary,
              your estimated eligible loan amount is:
            </p>
            <p className="text-4xl font-extrabold text-blue-600 mb-6">
              ₹ {eligibleLoanAmount?.toLocaleString('en-IN') || 'N/A'}
            </p>
            <p className="text-md text-gray-600 mb-8">
              Our experts will review your application and get in touch with you shortly to discuss further options and guide you through the process.
            </p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Close
            </button>
          </div>
        )}
      </div>

      {/* Custom CSS for the animated background */}
      <style>{`
        @keyframes moveGradient {
          0% {
            transform: translate(0%, 0%);
          }
          25% {
            transform: translate(-10%, 10%);
          }
          50% {
            transform: translate(-20%, -20%);
          }
          75% {
            transform: translate(10%, -10%);
          }
          100% {
            transform: translate(0%, 0%);
          }
        }

        .animated-gradient-bg {
          position: absolute;
          width: 200%; /* Larger than viewport to allow movement */
          height: 200%;
          top: -50%;
          left: -50%;
          background:
            radial-gradient(circle at 20% 30%, rgba(167, 139, 250, 0.6), transparent 50%), /* Purple */
            radial-gradient(circle at 70% 80%, rgba(244, 114, 182, 0.6), transparent 50%), /* Pink */
            radial-gradient(circle at 90% 10%, rgba(96, 165, 250, 0.6), transparent 50%), /* Blue */
            radial-gradient(circle at 10% 90%, rgba(52, 211, 153, 0.6), transparent 50%); /* Green */
          background-size: 50% 50%;
          animation: moveGradient 30s linear infinite alternate;
          z-index: 0; /* Ensure it's behind the modal content */
        }
      `}</style>
    </div>
  );
};

export default EligibilityCheckModal;
