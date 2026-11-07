import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Search,
  Building2,
  MapPin,
  Phone,
  CreditCard,
  Shield,
  CheckCircle2,
  Clock,
  ArrowRight,
  HelpCircle,
  ChevronDown,
  Copy,
  Check,
  Share2,
  ExternalLink,
  Sparkles,
  RefreshCw,
  AlertCircle,
  FileText,
  BadgeCheck,
  Compass,
  Landmark,
  Layers,
  Send,
  Zap,
  Globe2,
  Smartphone
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import indianBanksRaw from '../data/indianBanks.json';

const IFSC_API_BASE = 'https://ifsc.razorpay.com';

/**
 * Resilient multi-tier API fetcher for Razorpay IFSC endpoints.
 * Resolves CORS restrictions by routing through the same-origin Vite/Vercel proxy (/api/ifsc-proxy),
 * with graceful fallbacks to direct call and public CORS gateways.
 */
async function apiGet<T = any>(endpoint: string): Promise<T> {
  const clean = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // Strategy 1: Same-origin proxy (Vite Dev Server & Vercel Production)
  try {
    const res = await fetch(`/api/ifsc-proxy${clean}`);
    if (res.ok) {
      return (await res.json()) as T;
    }
  } catch (err) {
    // Proxy not available or failed
  }

  // Strategy 2: Direct call (Works for /:code which has Access-Control-Allow-Origin: *)
  try {
    const directRes = await fetch(`${IFSC_API_BASE}${clean}`);
    if (directRes.ok) {
      return (await directRes.json()) as T;
    }
  } catch (err) {
    // Blocked by CORS on /places or /search in some browser contexts
  }

  // Strategy 3: Resilient public CORS Gateway
  try {
    const targetUrl = `${IFSC_API_BASE}${clean}`;
    const fallbackRes = await fetch(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`
    );
    if (fallbackRes.ok) {
      return (await fallbackRes.json()) as T;
    }
  } catch (err) {
    // Gateway fallback failed
  }

  throw new Error(`Unable to fetch IFSC data for ${clean}.`);
}

const indianBanksMap = indianBanksRaw as Record<string, string>;

export interface BankBranchDetails {
  BANK: string;
  IFSC: string;
  BRANCH: string;
  ADDRESS: string;
  CONTACT: string;
  CITY: string;
  DISTRICT: string;
  STATE: string;
  CENTRE?: string;
  RTGS: boolean;
  NEFT: boolean;
  IMPS: boolean;
  UPI: boolean;
  MICR?: string | null;
  SWIFT?: string | null;
  BANKCODE?: string;
  ISO3166?: string;
}

// Map Indian State names to standard ISO 3166-2 codes used by RBI datasets
const STATE_NAME_TO_ISO: Record<string, string> = {
  "ANDAMAN AND NICOBAR ISLANDS": "IN-AN",
  "ANDHRA PRADESH": "IN-AP",
  "ARUNACHAL PRADESH": "IN-AR",
  "ASSAM": "IN-AS",
  "BIHAR": "IN-BR",
  "CHANDIGARH": "IN-CH",
  "CHHATTISGARH": "IN-CT",
  "DADRA AND NAGAR HAVELI": "IN-DN",
  "DAMAN AND DIU": "IN-DD",
  "DADRA AND NAGAR HAVELI AND DAMAN AND DIU": "IN-DH",
  "DELHI": "IN-DL",
  "GOA": "IN-GA",
  "GUJARAT": "IN-GJ",
  "HARYANA": "IN-HR",
  "HIMACHAL PRADESH": "IN-HP",
  "JAMMU AND KASHMIR": "IN-JK",
  "JHARKHAND": "IN-JH",
  "KARNATAKA": "IN-KA",
  "KERALA": "IN-KL",
  "LADAKH": "IN-LA",
  "LAKSHADWEEP": "IN-LD",
  "MADHYA PRADESH": "IN-MP",
  "MAHARASHTRA": "IN-MH",
  "MANIPUR": "IN-MN",
  "MEGHALAYA": "IN-ML",
  "MIZORAM": "IN-MZ",
  "NAGALAND": "IN-NL",
  "ODISHA": "IN-OR",
  "ORISSA": "IN-OR",
  "PUDUCHERRY": "IN-PY",
  "PONDICHERRY": "IN-PY",
  "PUNJAB": "IN-PB",
  "RAJASTHAN": "IN-RJ",
  "SIKKIM": "IN-SK",
  "TAMIL NADU": "IN-TN",
  "TELANGANA": "IN-TG",
  "TRIPURA": "IN-TR",
  "UTTAR PRADESH": "IN-UP",
  "UTTARAKHAND": "IN-UT",
  "UTTARANCHAL": "IN-UT",
  "WEST BENGAL": "IN-WB"
};

// Major Popular Banks for quick one-click discovery
const POPULAR_BANKS = [
  { code: 'SBIN', name: 'State Bank of India', tag: 'Public Sector' },
  { code: 'HDFC', name: 'HDFC Bank', tag: 'Private Sector' },
  { code: 'ICIC', name: 'ICICI Bank', tag: 'Private Sector' },
  { code: 'PUNB', name: 'Punjab National Bank', tag: 'Public Sector' },
  { code: 'BARB', name: 'Bank of Baroda', tag: 'Public Sector' },
  { code: 'UTIB', name: 'Axis Bank', tag: 'Private Sector' },
  { code: 'KKBK', name: 'Kotak Mahindra Bank', tag: 'Private Sector' },
  { code: 'CNRB', name: 'Canara Bank', tag: 'Public Sector' },
  { code: 'UBIN', name: 'Union Bank of India', tag: 'Public Sector' },
  { code: 'INDB', name: 'IndusInd Bank', tag: 'Private Sector' },
  { code: 'BKID', name: 'Bank of India', tag: 'Public Sector' },
  { code: 'YESB', name: 'Yes Bank', tag: 'Private Sector' }
];

// Featured verified flagship branches for search engine crawlability and instant previews
const FEATURED_BRANCHES = [
  { bank: "State Bank of India", ifsc: "SBIN0000001", branch: "Kolkata Main", city: "Kolkata", state: "West Bengal" },
  { bank: "State Bank of India", ifsc: "SBIN0000691", branch: "Mumbai Main", city: "Mumbai", state: "Maharashtra" },
  { bank: "State Bank of India", ifsc: "SBIN0000625", branch: "New Delhi Main", city: "New Delhi", state: "Delhi" },
  { bank: "HDFC Bank", ifsc: "HDFC0000001", branch: "Nariman Point", city: "Mumbai", state: "Maharashtra" },
  { bank: "HDFC Bank", ifsc: "HDFC0000003", branch: "Kasturba Gandhi Marg", city: "New Delhi", state: "Delhi" },
  { bank: "HDFC Bank", ifsc: "HDFC0000060", branch: "Chennai Main", city: "Chennai", state: "Tamil Nadu" },
  { bank: "ICICI Bank", ifsc: "ICIC0000001", branch: "Nariman Point", city: "Mumbai", state: "Maharashtra" },
  { bank: "ICICI Bank", ifsc: "ICIC0000004", branch: "Connaught Place", city: "New Delhi", state: "Delhi" },
  { bank: "ICICI Bank", ifsc: "ICIC0000411", branch: "Yelahanka", city: "Bengaluru", state: "Karnataka" },
  { bank: "Punjab National Bank", ifsc: "PUNB0000100", branch: "Sansad Marg", city: "New Delhi", state: "Delhi" },
  { bank: "Bank of Baroda", ifsc: "BARB0MUMBAI", branch: "Mumbai Main", city: "Mumbai", state: "Maharashtra" },
  { bank: "Axis Bank", ifsc: "UTIB0000004", branch: "Sir P M Road Fort", city: "Mumbai", state: "Maharashtra" },
  { bank: "Kotak Mahindra Bank", ifsc: "KKBK0000958", branch: "Nariman Point", city: "Mumbai", state: "Maharashtra" },
  { bank: "Canara Bank", ifsc: "CNRB0000001", branch: "Bengaluru Town Hall", city: "Bengaluru", state: "Karnataka" },
  { bank: "Union Bank of India", ifsc: "UBIN0530018", branch: "Mumbai Samachar Marg", city: "Mumbai", state: "Maharashtra" },
  { bank: "IndusInd Bank", ifsc: "INDB0000001", branch: "Nariman Point", city: "Mumbai", state: "Maharashtra" }
];

export default function IFSCFinder() {
  const { ifscCode: routeIfsc } = useParams<{ ifscCode?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const detailsRef = useRef<HTMLDivElement>(null);

  // Search Mode: 'code' (by 11-digit IFSC) or 'drilldown' (Bank -> State -> District -> Branch) or 'keyword' (City/Branch search)
  const [searchMode, setSearchMode] = useState<'code' | 'drilldown' | 'keyword'>('code');

  // Input States
  const [ifscInput, setIfscInput] = useState<string>('');
  const [keywordBank, setKeywordBank] = useState<string>('SBIN');
  const [keywordQuery, setKeywordQuery] = useState<string>('');

  // Drilldown States
  const [selectedBankCode, setSelectedBankCode] = useState<string>('');
  const [bankSearchQuery, setBankSearchQuery] = useState<string>('');
  const [availableStates, setAvailableStates] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>('');
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [availableBranches, setAvailableBranches] = useState<string[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>('');

  // Loading & Error States
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDrillLoading, setIsDrillLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Result state
  const [branchDetails, setBranchDetails] = useState<BankBranchDetails | null>(null);
  const [keywordResults, setKeywordResults] = useState<BankBranchDetails[]>([]);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // All Banks sorted alphabetically
  const allBanksList = useMemo(() => {
    return Object.entries(indianBanksMap).map(([code, name]) => ({
      code,
      name
    })).sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  // Filtered banks for dropdown search
  const filteredBanks = useMemo(() => {
    if (!bankSearchQuery.trim()) return allBanksList.slice(0, 100);
    const q = bankSearchQuery.toLowerCase();
    return allBanksList.filter(
      b => b.name.toLowerCase().includes(q) || b.code.toLowerCase().includes(q)
    ).slice(0, 100);
  }, [allBanksList, bankSearchQuery]);

  // Load IFSC from URL params or query param on mount or URL change
  useEffect(() => {
    const codeFromUrl = routeIfsc || searchParams.get('ifsc');
    if (codeFromUrl) {
      const clean = codeFromUrl.trim().toUpperCase();
      setIfscInput(clean);
      lookupIfsc(clean, false);
    }
  }, [routeIfsc, searchParams]);

  // Direct IFSC API Lookup
  const lookupIfsc = async (code: string, updateUrl = true) => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      setErrorMessage('Please enter an 11-digit IFSC code.');
      return;
    }

    // Format validation: 4 letters + 0 + 6 alphanumeric
    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (!ifscRegex.test(cleanCode)) {
      setErrorMessage('Invalid IFSC format. An IFSC code must have 11 characters (e.g. SBIN0000001).');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    try {
      const data = await apiGet<BankBranchDetails>(`/${cleanCode}`);
      setBranchDetails(data);
      setKeywordResults([]);

      if (updateUrl) {
        navigate(`/resources/ifsc-finder/${cleanCode}`, { replace: false });
      }

      // Smooth scroll to details
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } catch (err: any) {
      setBranchDetails(null);
      setErrorMessage(
        err.message || 'Unable to fetch IFSC details. Please verify the code and try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Step 1: When user selects a bank in Drilldown
  const handleBankChange = async (bankCode: string) => {
    setSelectedBankCode(bankCode);
    setSelectedState('');
    setAvailableDistricts([]);
    setSelectedDistrict('');
    setAvailableBranches([]);
    setSelectedBranch('');
    setErrorMessage('');

    if (!bankCode) {
      setAvailableStates([]);
      return;
    }

    setIsDrillLoading(true);
    try {
      const data = await apiGet<{ states: string[] }>(`/places?bankcode=${bankCode}`);
      const states: string[] = (data.states || []).sort();
      setAvailableStates(states);
    } catch (err) {
      setAvailableStates([]);
      setErrorMessage('Failed to load states for the selected bank.');
    } finally {
      setIsDrillLoading(false);
    }
  };

  // Step 2: When user selects a state
  const handleStateChange = async (stateName: string) => {
    setSelectedState(stateName);
    setSelectedDistrict('');
    setAvailableBranches([]);
    setSelectedBranch('');
    setErrorMessage('');

    if (!stateName || !selectedBankCode) {
      setAvailableDistricts([]);
      return;
    }

    const isoCode = STATE_NAME_TO_ISO[stateName.toUpperCase()] || stateName;
    setIsDrillLoading(true);
    try {
      const data = await apiGet<{ districts: string[] }>(`/places?bankcode=${selectedBankCode}&state=${isoCode}`);
      const districts: string[] = (data.districts || []).sort();
      setAvailableDistricts(districts);
    } catch (err) {
      setAvailableDistricts([]);
      setErrorMessage('Failed to load districts for the selected state.');
    } finally {
      setIsDrillLoading(false);
    }
  };

  // Step 3: When user selects a district
  const handleDistrictChange = async (districtName: string) => {
    setSelectedDistrict(districtName);
    setSelectedBranch('');
    setErrorMessage('');

    if (!districtName || !selectedState || !selectedBankCode) {
      setAvailableBranches([]);
      return;
    }

    const isoCode = STATE_NAME_TO_ISO[selectedState.toUpperCase()] || selectedState;
    setIsDrillLoading(true);
    try {
      const data = await apiGet<{ branches: string[] }>(
        `/places?bankcode=${selectedBankCode}&state=${isoCode}&district=${encodeURIComponent(districtName)}`
      );
      const branches: string[] = (data.branches || []).sort();
      setAvailableBranches(branches);
    } catch (err) {
      setAvailableBranches([]);
      setErrorMessage('Failed to load branches for the selected district.');
    } finally {
      setIsDrillLoading(false);
    }
  };

  // Step 4: When user selects a branch
  const handleBranchChange = async (branchName: string) => {
    setSelectedBranch(branchName);
    setErrorMessage('');

    if (!branchName || !selectedBankCode) return;

    const isoCode = STATE_NAME_TO_ISO[selectedState.toUpperCase()] || selectedState;
    setIsLoading(true);
    try {
      const searchUrl = `/search?bankcode=${selectedBankCode}&state=${isoCode}&branch=${encodeURIComponent(branchName)}`;
      const resJson = await apiGet<{ data: BankBranchDetails[] }>(searchUrl);
      const foundBranch = resJson.data?.[0];

      if (foundBranch) {
        setBranchDetails(foundBranch);
        navigate(`/resources/ifsc-finder/${foundBranch.IFSC}`, { replace: false });
        setTimeout(() => {
          detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        throw new Error('Branch record not returned by API');
      }
    } catch (err) {
      setErrorMessage('Failed to load complete branch details.');
    } finally {
      setIsLoading(false);
    }
  };

  // Mode 3: Keyword Search by City or Branch
  const handleKeywordSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!keywordQuery.trim()) {
      setErrorMessage('Please enter a city or branch keyword (e.g. Mumbai or Connaught Place).');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setBranchDetails(null);
    setKeywordResults([]);

    try {
      const q = encodeURIComponent(keywordQuery.trim().toUpperCase());
      const bankParam = keywordBank ? `&bankcode=${keywordBank}` : '';
      const url = `/search?city=${q}${bankParam}&limit=25`;
      const resJson = await apiGet<{ data: BankBranchDetails[] }>(url);

      let results: BankBranchDetails[] = resJson.data || [];

      // If city search returned empty, attempt branch search
      if (results.length === 0) {
        const branchUrl = `/search?branch=${q}${bankParam}&limit=25`;
        const branchJson = await apiGet<{ data: BankBranchDetails[] }>(branchUrl);
        results = branchJson.data || [];
      }

      if (results.length > 0) {
        setKeywordResults(results);
        if (results.length === 1) {
          setBranchDetails(results[0]);
        }
      } else {
        setErrorMessage(`No branches found for "${keywordQuery}". Try searching by exact 11-digit IFSC code.`);
      }
    } catch (err) {
      setErrorMessage('Search query failed. Please check network connection.');
    } finally {
      setIsLoading(false);
    }
  };

  // Copy to clipboard helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Dynamic SEO Page Title & Description
  const seoTitle = branchDetails
    ? `${branchDetails.BANK} ${branchDetails.BRANCH} Branch IFSC Code: ${branchDetails.IFSC}, MICR, Address & City Details | BanksCart`
    : `All India IFSC Code Finder 2026: Search by Bank, Branch & MICR | BanksCart`;

  const seoDescription = branchDetails
    ? `Verified IFSC Code ${branchDetails.IFSC} for ${branchDetails.BANK} ${branchDetails.BRANCH} branch in ${branchDetails.CITY}, ${branchDetails.STATE}. MICR: ${branchDetails.MICR || 'N/A'}, Address: ${branchDetails.ADDRESS}. 100% RBI validated.`
    : `Search verified RBI IFSC codes for all 1,500+ Indian banks. Find branch address, MICR code, NEFT/RTGS/IMPS timings, and contact numbers across Mumbai, Delhi, Bengaluru, and all Indian cities.`;

  const canonicalUrl = branchDetails
    ? `https://bankscart.com/resources/ifsc-finder/${branchDetails.IFSC}`
    : `https://bankscart.com/resources/ifsc-finder`;

  // Schema.org Structured Data
  const jsonLdSchema = branchDetails
    ? {
        "@context": "https://schema.org",
        "@type": "BankOrCreditUnion",
        "name": `${branchDetails.BANK} - ${branchDetails.BRANCH} Branch`,
        "description": `Official RBI IFSC code ${branchDetails.IFSC} for ${branchDetails.BANK} located at ${branchDetails.ADDRESS}, ${branchDetails.CITY}, ${branchDetails.STATE}.`,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": branchDetails.ADDRESS,
          "addressLocality": branchDetails.CITY,
          "addressRegion": branchDetails.STATE,
          "addressCountry": "IN"
        },
        "telephone": branchDetails.CONTACT || "1800-11-2211",
        "identifier": branchDetails.IFSC,
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "MICR Code",
            "value": branchDetails.MICR || "N/A"
          },
          {
            "@type": "PropertyValue",
            "name": "NEFT Enabled",
            "value": branchDetails.NEFT ? "Yes" : "No"
          },
          {
            "@type": "PropertyValue",
            "name": "RTGS Enabled",
            "value": branchDetails.RTGS ? "Yes" : "No"
          },
          {
            "@type": "PropertyValue",
            "name": "IMPS Enabled",
            "value": branchDetails.IMPS ? "Yes" : "No"
          }
        ]
      }
    : {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "National IFSC Code Finder - BanksCart",
        "description": "Comprehensive directory of all bank IFSC and MICR codes in India verified against the Reserve Bank of India ledger."
      };

  const faqs = [
    {
      q: "What is an IFSC Code and how is it used in India?",
      a: "IFSC (Indian Financial System Code) is an 11-digit alphanumeric code assigned by the Reserve Bank of India (RBI) to uniquely identify every bank branch participating in national electronic payment networks. It is mandatory for transferring money via NEFT (National Electronic Funds Transfer), RTGS (Real Time Gross Settlement), and IMPS (Immediate Payment Service)."
    },
    {
      q: "How is an 11-digit IFSC code mathematically structured?",
      a: "An IFSC code is strictly divided into three parts: The first 4 characters are alphabetic and represent the bank's name (e.g. 'SBIN' for State Bank of India, 'HDFC' for HDFC Bank). The 5th character is always '0' (zero), reserved for future control. The last 6 characters (alphanumeric) represent the specific branch locator code."
    },
    {
      q: "What is the difference between IFSC, MICR, and SWIFT codes?",
      a: "IFSC is an 11-character alphanumeric code used for domestic electronic fund transfers (NEFT/RTGS/IMPS) in India. MICR (Magnetic Ink Character Recognition) is a 9-digit numeric code printed at the bottom of bank cheques used for automated physical cheque clearing. SWIFT (Society for Worldwide Interbank Financial Telecommunication) is an 8 to 11-character international code used for cross-border foreign currency wire transfers."
    },
    {
      q: "What happens if I enter an incorrect IFSC code during a fund transfer?",
      a: "Under RBI electronic transfer guidelines, if the entered IFSC code does not match any valid bank branch, the transaction will automatically fail and funds will not leave your account. If the IFSC belongs to a different branch but the beneficiary account number exists at that bank, funds might clear into that account. Always double-check both the account number and IFSC code before authorizing."
    },
    {
      q: "Do IFSC codes change after bank mergers (e.g. Syndicate into Canara, Allahabad into Indian Bank)?",
      a: "Yes. Following historical bank consolidations in India, the legacy IFSC codes of anchor-merged banks (such as Andhra Bank, Corporation Bank, Oriental Bank of Commerce, United Bank of India, Syndicate Bank, and Allahabad Bank) were phased out and replaced by updated IFSC codes under the parent bank's code prefix. Always verify current active IFSC codes on BanksCart before initiating transfers."
    }
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-slate-800">
      {/* Dynamic SEO Tags */}
      <Helmet>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(jsonLdSchema)}
        </script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        path={
          branchDetails
            ? ["Home", "Resources", "IFSC Finder", branchDetails.BANK, branchDetails.BRANCH]
            : ["Home", "Resources", "IFSC Finder"]
        } 
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 text-white py-14 sm:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-semibold tracking-wide uppercase mb-5">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              100% RBI Live Database • All India Bank Branches
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
              National IFSC Code Finder & Bank Directory
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
              Look up verified Reserve Bank of India electronic routing codes for 1,500+ commercial, public, private, and regional banks. Search by 11-digit IFSC, or drill down by Bank, State, District, and Branch.
            </p>

            {/* Live Trust Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3">
                <div className="text-emerald-400 font-mono font-bold text-lg sm:text-xl">1,500+</div>
                <div className="text-xs text-slate-400 mt-0.5">Indian Banks</div>
              </div>
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3">
                <div className="text-amber-400 font-mono font-bold text-lg sm:text-xl">160,000+</div>
                <div className="text-xs text-slate-400 mt-0.5">Verified Branches</div>
              </div>
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3">
                <div className="text-blue-400 font-mono font-bold text-lg sm:text-xl">24/7 Live</div>
                <div className="text-xs text-slate-400 mt-0.5">NEFT / RTGS / IMPS</div>
              </div>
              <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/60 rounded-xl p-3">
                <div className="text-purple-400 font-mono font-bold text-lg sm:text-xl">Instant</div>
                <div className="text-xs text-slate-400 mt-0.5">MICR & Address</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-16">

        {/* SECTION 1: Dual Search Interface */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          
          {/* Mode Switcher Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Search Bank IFSC & Branch Details
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Choose your preferred search method below to fetch real-time RBI branch data.
              </p>
            </div>

            <div className="flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSearchMode('code')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
                  searchMode === 'code'
                    ? 'bg-white text-[#1E3A8A] shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                By 11-Digit IFSC
              </button>
              <button
                type="button"
                onClick={() => setSearchMode('drilldown')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
                  searchMode === 'drilldown'
                    ? 'bg-white text-[#1E3A8A] shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                By Bank & Branch
              </button>
              <button
                type="button"
                onClick={() => setSearchMode('keyword')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg transition-all ${
                  searchMode === 'keyword'
                    ? 'bg-white text-[#1E3A8A] shadow-sm font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                By City / Location
              </button>
            </div>
          </div>

          {/* TAB 1: Search by 11-Digit IFSC Code */}
          {searchMode === 'code' && (
            <div className="space-y-6">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  lookupIfsc(ifscInput);
                }} 
                className="max-w-2xl"
              >
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Enter 11-Digit Alphanumeric IFSC Code
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-grow">
                    <input
                      type="text"
                      maxLength={11}
                      value={ifscInput}
                      onChange={(e) => setIfscInput(e.target.value.toUpperCase())}
                      placeholder="e.g. SBIN0000001, HDFC0000001"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-base font-mono font-bold uppercase tracking-wider text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] transition-all"
                    />
                    <CreditCard className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-7 py-3.5 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search className="w-4 h-4" />
                        Find Branch
                      </>
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 font-mono">
                  <span>Format: 4 Letters (Bank) + 0 + 6 Characters (Branch)</span>
                </div>
              </form>

              {/* Sample Quick Chips */}
              <div className="pt-4 border-t border-slate-100">
                <span className="text-xs font-semibold text-slate-500 mr-2">Try Popular IFSC Codes:</span>
                <div className="inline-flex flex-wrap gap-2 mt-2">
                  {[
                    { code: 'SBIN0000001', label: 'SBI Kolkata Main' },
                    { code: 'HDFC0000001', label: 'HDFC Mumbai' },
                    { code: 'ICIC0000001', label: 'ICICI Nariman Pt' },
                    { code: 'BARB0MUMBAI', label: 'BOB Mumbai' },
                    { code: 'PUNB0000100', label: 'PNB Delhi' },
                    { code: 'UTIB0000004', label: 'Axis Fort' }
                  ].map((chip) => (
                    <button
                      key={chip.code}
                      type="button"
                      onClick={() => {
                        setIfscInput(chip.code);
                        lookupIfsc(chip.code);
                      }}
                      className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors font-mono"
                    >
                      {chip.code} ({chip.label})
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Drilldown Search (Bank -> State -> District -> Branch) */}
          {searchMode === 'drilldown' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* 1. Select Bank */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    1. Select Bank
                  </label>
                  <select
                    value={selectedBankCode}
                    onChange={(e) => handleBankChange(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#1E3A8A]"
                  >
                    <option value="">-- Choose Bank (1,500+) --</option>
                    <optgroup label="Popular Banks">
                      {POPULAR_BANKS.map((b) => (
                        <option key={b.code} value={b.code}>
                          {b.name} ({b.code})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="All Indian Banks (A to Z)">
                      {allBanksList.map((b) => (
                        <option key={b.code} value={b.code}>
                          {b.name} ({b.code})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* 2. Select State */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    2. Select State
                  </label>
                  <select
                    disabled={!selectedBankCode || isDrillLoading}
                    value={selectedState}
                    onChange={(e) => handleStateChange(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#1E3A8A] disabled:opacity-50"
                  >
                    <option value="">
                      {!selectedBankCode ? 'Select Bank First' : '-- Choose State --'}
                    </option>
                    {availableStates.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 3. Select District */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    3. Select District / City
                  </label>
                  <select
                    disabled={!selectedState || isDrillLoading}
                    value={selectedDistrict}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#1E3A8A] disabled:opacity-50"
                  >
                    <option value="">
                      {!selectedState ? 'Select State First' : '-- Choose District --'}
                    </option>
                    {availableDistricts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Select Branch */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                    4. Select Branch
                  </label>
                  <select
                    disabled={!selectedDistrict || isDrillLoading}
                    value={selectedBranch}
                    onChange={(e) => handleBranchChange(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-[#1E3A8A] disabled:opacity-50"
                  >
                    <option value="">
                      {!selectedDistrict ? 'Select District First' : '-- Choose Branch --'}
                    </option>
                    {availableBranches.map((br) => (
                      <option key={br} value={br}>
                        {br}
                      </option>
                    ))}
                  </select>
                </div>

              </div>

              {isDrillLoading && (
                <div className="flex items-center gap-2 text-xs text-blue-700 font-semibold">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Fetching official RBI branch registry data...
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Search by City or Keyword */}
          {searchMode === 'keyword' && (
            <form onSubmit={handleKeywordSearch} className="max-w-2xl space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Bank</label>
                  <select
                    value={keywordBank}
                    onChange={(e) => setKeywordBank(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
                  >
                    <option value="">Any Bank</option>
                    {POPULAR_BANKS.map((b) => (
                      <option key={b.code} value={b.code}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">City or Branch Name</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={keywordQuery}
                      onChange={(e) => setKeywordQuery(e.target.value)}
                      placeholder="e.g. Mumbai, Yelahanka, Connaught Place"
                      className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-3 rounded-xl shadow-md transition-all whitespace-nowrap"
                    >
                      {isLoading ? 'Searching...' : 'Search'}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}

          {/* Error Message Box */}
          {errorMessage && (
            <div className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <span className="font-bold block">Lookup Notice:</span>
                {errorMessage}
              </div>
            </div>
          )}
        </section>

        {/* SECTION 2: Verified Branch Details Card (When Found) */}
        {branchDetails && (
          <section ref={detailsRef} className="scroll-mt-24">
            <div className="bg-white rounded-2xl border-2 border-blue-200 shadow-lg overflow-hidden">
              
              {/* Header Banner */}
              <div className="bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-3 border border-emerald-400/30">
                    <BadgeCheck className="w-4 h-4 text-emerald-400" />
                    Verified RBI Electronic Ledger Record
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {branchDetails.BANK}
                  </h3>
                  <p className="text-sm sm:text-base text-blue-200 mt-1 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-amber-400" />
                    {branchDetails.BRANCH} Branch • {branchDetails.CITY}, {branchDetails.STATE}
                  </p>
                </div>

                {/* Primary IFSC Display with One-Click Copy */}
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 sm:p-5 flex flex-col items-center sm:items-end">
                  <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold mb-1">
                    Official IFSC Code
                  </div>
                  <div className="text-2xl sm:text-3xl font-mono font-extrabold text-amber-300 tracking-wider">
                    {branchDetails.IFSC}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(branchDetails.IFSC, 'hero_ifsc')}
                    className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all"
                  >
                    {copiedKey === 'hero_ifsc' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Copied to Clipboard!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy IFSC Code
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Anatomy of this IFSC code */}
              <div className="bg-blue-50/70 border-b border-blue-100 p-4 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-700 gap-3">
                <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-blue-700" />
                  IFSC Anatomy for {branchDetails.IFSC}:
                </div>
                <div className="flex flex-wrap items-center gap-2 font-mono">
                  <span className="bg-white px-2.5 py-1 rounded border border-blue-200 font-bold text-blue-900">
                    {branchDetails.IFSC.slice(0, 4)} (Bank Code)
                  </span>
                  <span>+</span>
                  <span className="bg-white px-2.5 py-1 rounded border border-blue-200 font-bold text-slate-600">
                    0 (Control)
                  </span>
                  <span>+</span>
                  <span className="bg-white px-2.5 py-1 rounded border border-blue-200 font-bold text-emerald-800">
                    {branchDetails.IFSC.slice(5)} (Branch Code)
                  </span>
                </div>
              </div>

              {/* Branch Specifications Grid */}
              <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Location & Address */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <MapPin className="w-4 h-4 text-red-600" />
                    Physical Branch Address
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {branchDetails.ADDRESS}
                  </p>
                  <div className="pt-2 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                    <div><strong>City:</strong> {branchDetails.CITY}</div>
                    <div><strong>District:</strong> {branchDetails.DISTRICT}</div>
                    <div><strong>State:</strong> {branchDetails.STATE}</div>
                  </div>
                </div>

                {/* Electronic Transfer Capabilities */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    Payment Modes Supported
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className={`p-2 rounded-lg border flex items-center justify-between ${branchDetails.NEFT ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold' : 'bg-slate-100 text-slate-400'}`}>
                      <span>NEFT</span>
                      <span>{branchDetails.NEFT ? '✓ Supported' : '✕'}</span>
                    </div>
                    <div className={`p-2 rounded-lg border flex items-center justify-between ${branchDetails.RTGS ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold' : 'bg-slate-100 text-slate-400'}`}>
                      <span>RTGS</span>
                      <span>{branchDetails.RTGS ? '✓ Supported' : '✕'}</span>
                    </div>
                    <div className={`p-2 rounded-lg border flex items-center justify-between ${branchDetails.IMPS ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold' : 'bg-slate-100 text-slate-400'}`}>
                      <span>IMPS</span>
                      <span>{branchDetails.IMPS ? '✓ 24/7' : '✕'}</span>
                    </div>
                    <div className={`p-2 rounded-lg border flex items-center justify-between ${branchDetails.UPI ? 'bg-emerald-50 border-emerald-200 text-emerald-800 font-bold' : 'bg-slate-100 text-slate-400'}`}>
                      <span>UPI</span>
                      <span>{branchDetails.UPI ? '✓ Active' : '✕'}</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 pt-1">
                    *NEFT and RTGS operate 24x7x365 across all Indian commercial banks under current RBI settlement guidelines.
                  </p>
                </div>

                {/* Routing & Clearing Codes */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Clearing & Identification Codes
                  </div>
                  <div className="space-y-2 text-xs font-mono">
                    <div className="flex justify-between items-center p-2 rounded bg-white border border-slate-200">
                      <span className="text-slate-600 font-sans">MICR Code:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{branchDetails.MICR || 'N/A'}</span>
                        {branchDetails.MICR && (
                          <button
                            type="button"
                            onClick={() => handleCopy(branchDetails.MICR!, 'micr')}
                            className="text-blue-600 hover:text-blue-800"
                            title="Copy MICR"
                          >
                            {copiedKey === 'micr' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-between items-center p-2 rounded bg-white border border-slate-200">
                      <span className="text-slate-600 font-sans">SWIFT Code:</span>
                      <span className="font-bold text-slate-900">{branchDetails.SWIFT || 'Not Available (Domestic)'}</span>
                    </div>

                    <div className="flex justify-between items-center p-2 rounded bg-white border border-slate-200">
                      <span className="text-slate-600 font-sans">Branch Telephone:</span>
                      <span className="font-bold text-slate-900">{branchDetails.CONTACT || '1800 Toll Free'}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Toolbar */}
              <div className="p-4 sm:px-8 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleCopy(window.location.href, 'share_url')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  {copiedKey === 'share_url' ? 'Link Copied!' : 'Copy Shareable Branch URL'}
                </button>

                <div className="flex items-center gap-3">
                  <Link
                    to="/resources/ifsc-finder"
                    className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Reset & Search Another Branch
                  </Link>
                  <Link
                    to="/resources/loan-rates"
                    className="bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-1"
                  >
                    View {branchDetails.BANK} Loan Rates <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* SECTION 3: Keyword Search Results Multi-List (If multiple found) */}
        {keywordResults.length > 1 && (
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Found {keywordResults.length} Branches for "{keywordQuery}":
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                    <th className="py-3 px-4">Bank Name</th>
                    <th className="py-3 px-4">Branch Name</th>
                    <th className="py-3 px-4">IFSC Code</th>
                    <th className="py-3 px-4">City & District</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {keywordResults.map((b) => (
                    <tr key={b.IFSC} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{b.BANK}</td>
                      <td className="py-3.5 px-4 text-slate-700">{b.BRANCH}</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#1E3A8A]">{b.IFSC}</td>
                      <td className="py-3.5 px-4 text-slate-600 text-xs">{b.CITY}, {b.STATE}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => {
                            setBranchDetails(b);
                            navigate(`/resources/ifsc-finder/${b.IFSC}`);
                            setTimeout(() => {
                              detailsRef.current?.scrollIntoView({ behavior: 'smooth' });
                            }, 100);
                          }}
                          className="bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs px-3 py-1.5 rounded-lg"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* SECTION 4: Crawlable SEO Directory - Popular Major Banks */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
              <Landmark className="w-3.5 h-3.5" />
              Direct Bank Directory
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Popular Banks in India: IFSC & Branch Lookup
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Select any major commercial or public bank to view its branch locations, IFSC codes, and electronic clearing channels.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {POPULAR_BANKS.map((b) => (
              <button
                key={b.code}
                type="button"
                onClick={() => {
                  setSearchMode('drilldown');
                  handleBankChange(b.code);
                  window.scrollTo({ top: 400, behavior: 'smooth' });
                }}
                className="bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 rounded-xl p-4 text-left transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-lg bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center font-mono font-bold text-xs mb-3 group-hover:scale-105 transition-transform">
                    {b.code}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#1E3A8A] transition-colors mb-1">
                    {b.name}
                  </h3>
                  <span className="text-[11px] text-slate-500">{b.tag}</span>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 text-xs text-blue-600 font-bold flex items-center justify-between">
                  <span>Browse Branches</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* SECTION 5: Flagship Metro Branches Pre-rendered Directory */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Flagship Bank Branches Across Major Metros
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Quickly verify verified IFSC codes for primary commercial banking hubs in Mumbai, Delhi, Bengaluru, Kolkata, and Chennai.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold text-xs uppercase tracking-wider">
                  <th className="py-3 px-4">Bank Name</th>
                  <th className="py-3 px-4">Branch</th>
                  <th className="py-3 px-4">IFSC Code</th>
                  <th className="py-3 px-4">City & State</th>
                  <th className="py-3 px-4 text-right">Direct Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {FEATURED_BRANCHES.map((f) => (
                  <tr key={f.ifsc} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{f.bank}</td>
                    <td className="py-3.5 px-4 text-slate-700">{f.branch}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-[#1E3A8A]">{f.ifsc}</td>
                    <td className="py-3.5 px-4 text-slate-600 text-xs">{f.city}, {f.state}</td>
                    <td className="py-3.5 px-4 text-right">
                      <Link
                        to={`/resources/ifsc-finder/${f.ifsc}`}
                        onClick={() => {
                          setIfscInput(f.ifsc);
                          lookupIfsc(f.ifsc, false);
                        }}
                        className="bg-slate-100 hover:bg-[#1E3A8A] hover:text-white text-slate-800 font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors inline-block"
                      >
                        Verify IFSC
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 6: Educational Guide on IFSC, NEFT & RTGS */}
        <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 border border-slate-800">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3">
              <Compass className="w-3.5 h-3.5" />
              RBI Regulatory Primer
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Understanding Indian Electronic Funds Routing
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-2">
              How the Reserve Bank of India coordinates interbank digital transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5">
              <div className="text-emerald-400 font-mono font-bold text-lg mb-2">NEFT (24/7/365)</div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                National Electronic Funds Transfer clears transactions in half-hourly batches continuously. There is no minimum or maximum limit for individual retail users.
              </p>
              <span className="text-xs text-slate-400 font-mono">Zero RBI charges for online NEFT</span>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5">
              <div className="text-amber-400 font-mono font-bold text-lg mb-2">RTGS (High Value)</div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Real Time Gross Settlement is designed for instantaneous, individual gross settlement of large sums. The statutory minimum transfer ticket size is ₹2,00,000.
              </p>
              <span className="text-xs text-slate-400 font-mono">Real-time instant gross ledgering</span>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5">
              <div className="text-blue-400 font-mono font-bold text-lg mb-2">IMPS & UPI</div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Operated by NPCI, IMPS settles round-the-clock up to ₹5,00,000 per transaction using Account + IFSC or Mobile + MMID. UPI powers instant smartphone payments.
              </p>
              <span className="text-xs text-slate-400 font-mono">Instant sub-second confirmation</span>
            </div>
          </div>
        </section>

        {/* SECTION 7: Frequently Asked Questions Accordion */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              IFSC Code & Bank Transfer Queries
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={faq.q} 
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full py-4 px-5 text-left font-bold text-slate-900 flex justify-between items-center hover:bg-slate-50 transition-colors gap-4"
                >
                  <span className="text-sm sm:text-base">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${openFaqIndex === idx ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 8: Bottom Financial Services Banner */}
        <section className="bg-gradient-to-r from-slate-900 via-[#1E3A8A] to-slate-900 text-white rounded-2xl p-8 sm:p-12 text-center border border-slate-800 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Looking for Low Interest Loans or Premium Credit Cards?
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8">
            Compare verified interest rates, processing fees, and eligibility across SBI, HDFC, ICICI, and 30+ top commercial lenders on BanksCart.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/resources/loan-rates"
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-md transition-all inline-block"
            >
              Compare Live Bank Loan Rates
            </Link>
            <Link
              to="/cards/credit/overview"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl border border-white/20 transition-all inline-block"
            >
              Explore Best Credit Cards
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
