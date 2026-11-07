import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Search,
  MapPin,
  Mail,
  Building2,
  Navigation,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Truck,
  Info,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  Sparkles,
  Share2,
  Compass,
  CreditCard,
  Layers,
  Landmark,
  CheckCircle2,
  PackageCheck,
  Send,
  HelpCircle,
  Clock,
  Phone,
  ArrowRight,
  Filter,
  RefreshCw,
  BadgeCheck
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

const POSTAL_API_BASE = 'https://api.postalpincode.in';

export interface PostOfficeRecord {
  Name: string;
  Description: string | null;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  Block: string;
  State: string;
  Country: string;
  Pincode: string;
}

/**
 * Resilient multi-tier API fetcher for India Post endpoints.
 * Resolves CORS restrictions by routing through the same-origin Vite/Vercel proxy (/api/pincode-proxy),
 * with graceful fallbacks to direct call and public CORS gateways.
 */
async function fetchPostalApi(endpoint: string): Promise<PostOfficeRecord[] | null> {
  const clean = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

  // Strategy 1: Same-origin proxy (Vite Dev Server & Vercel Production)
  try {
    const res = await fetch(`/api/pincode-proxy${clean}`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data[0]?.Status === 'Success' && Array.isArray(data[0]?.PostOffice)) {
        return data[0].PostOffice;
      }
    }
  } catch (err) {
    // Proxy not available or failed
  }

  // Strategy 2: Direct call to api.postalpincode.in
  try {
    const directRes = await fetch(`${POSTAL_API_BASE}${clean}`);
    if (directRes.ok) {
      const data = await directRes.json();
      if (Array.isArray(data) && data[0]?.Status === 'Success' && Array.isArray(data[0]?.PostOffice)) {
        return data[0].PostOffice;
      }
    }
  } catch (err) {
    // Blocked by CORS in certain browser environments
  }

  // Strategy 3: Resilient public CORS Gateway
  try {
    const targetUrl = `${POSTAL_API_BASE}${clean}`;
    const fallbackRes = await fetch(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`
    );
    if (fallbackRes.ok) {
      const data = await fallbackRes.json();
      if (Array.isArray(data) && data[0]?.Status === 'Success' && Array.isArray(data[0]?.PostOffice)) {
        return data[0].PostOffice;
      }
    }
  } catch (err) {
    // Gateway fallback failed
  }

  return null;
}

// Curated flagship metropolitan post offices for instantaneous zero-latency preview
const FLAGSHIP_POSTAL_HUBS: Record<string, PostOfficeRecord> = {
  '110001': {
    Name: 'New Delhi GPO',
    Description: null,
    BranchType: 'Head Post Office',
    DeliveryStatus: 'Delivery',
    Circle: 'Delhi',
    District: 'New Delhi',
    Division: 'New Delhi GPO',
    Region: 'Delhi HQ',
    Block: 'New Delhi',
    State: 'Delhi',
    Country: 'India',
    Pincode: '110001'
  },
  '400001': {
    Name: 'Mumbai GPO',
    Description: null,
    BranchType: 'Head Post Office',
    DeliveryStatus: 'Delivery',
    Circle: 'Maharashtra',
    District: 'Mumbai',
    Division: 'Mumbai GPO',
    Region: 'Mumbai HQ',
    Block: 'Mumbai City',
    State: 'Maharashtra',
    Country: 'India',
    Pincode: '400001'
  },
  '560001': {
    Name: 'Bengaluru GPO',
    Description: null,
    BranchType: 'Head Post Office',
    DeliveryStatus: 'Delivery',
    Circle: 'Karnataka',
    District: 'Bangalore',
    Division: 'Bangalore GPO',
    Region: 'Bangalore HQ',
    Block: 'Bangalore North',
    State: 'Karnataka',
    Country: 'India',
    Pincode: '560001'
  },
  '700001': {
    Name: 'Kolkata GPO',
    Description: null,
    BranchType: 'Head Post Office',
    DeliveryStatus: 'Delivery',
    Circle: 'West Bengal',
    District: 'Kolkata',
    Division: 'Kolkata GPO',
    Region: 'Kolkata HQ',
    Block: 'Kolkata',
    State: 'West Bengal',
    Country: 'India',
    Pincode: '700001'
  },
  '600001': {
    Name: 'Chennai GPO',
    Description: null,
    BranchType: 'Head Post Office',
    DeliveryStatus: 'Delivery',
    Circle: 'Tamil Nadu',
    District: 'Chennai',
    Division: 'Chennai City Central',
    Region: 'Chennai HQ',
    Block: 'Chennai',
    State: 'Tamil Nadu',
    Country: 'India',
    Pincode: '600001'
  },
  '500001': {
    Name: 'Hyderabad GPO',
    Description: null,
    BranchType: 'Head Post Office',
    DeliveryStatus: 'Delivery',
    Circle: 'Telangana',
    District: 'Hyderabad',
    Division: 'Hyderabad City',
    Region: 'Hyderabad HQ',
    Block: 'Hyderabad',
    State: 'Telangana',
    Country: 'India',
    Pincode: '500001'
  },
  '380001': {
    Name: 'Ahmedabad GPO',
    Description: null,
    BranchType: 'Head Post Office',
    DeliveryStatus: 'Delivery',
    Circle: 'Gujarat',
    District: 'Ahmedabad',
    Division: 'Ahmedabad City',
    Region: 'Ahmedabad HQ',
    Block: 'Ahmedabad',
    State: 'Gujarat',
    Country: 'India',
    Pincode: '380001'
  },
  '411001': {
    Name: 'Pune Head Post Office',
    Description: null,
    BranchType: 'Head Post Office',
    DeliveryStatus: 'Delivery',
    Circle: 'Maharashtra',
    District: 'Pune',
    Division: 'Pune City East',
    Region: 'Pune HQ',
    Block: 'Pune City',
    State: 'Maharashtra',
    Country: 'India',
    Pincode: '411001'
  },
  '302001': {
    Name: 'Jaipur GPO',
    Description: null,
    BranchType: 'Head Post Office',
    DeliveryStatus: 'Delivery',
    Circle: 'Rajasthan',
    District: 'Jaipur',
    Division: 'Jaipur City',
    Region: 'Jaipur HQ',
    Block: 'Jaipur',
    State: 'Rajasthan',
    Country: 'India',
    Pincode: '302001'
  },
  '226001': {
    Name: 'Lucknow GPO',
    Description: null,
    BranchType: 'Head Post Office',
    DeliveryStatus: 'Delivery',
    Circle: 'Uttar Pradesh',
    District: 'Lucknow',
    Division: 'Lucknow City',
    Region: 'Lucknow HQ',
    Block: 'Lucknow',
    State: 'Uttar Pradesh',
    Country: 'India',
    Pincode: '226001'
  },
  '800001': {
    Name: 'Patna GPO',
    Description: null,
    BranchType: 'Head Post Office',
    DeliveryStatus: 'Delivery',
    Circle: 'Bihar',
    District: 'Patna',
    Division: 'Patna GPO',
    Region: 'Patna HQ',
    Block: 'Patna',
    State: 'Bihar',
    Country: 'India',
    Pincode: '800001'
  },
  '160017': {
    Name: 'Chandigarh GPO',
    Description: null,
    BranchType: 'Head Post Office',
    DeliveryStatus: 'Delivery',
    Circle: 'Punjab',
    District: 'Chandigarh',
    Division: 'Chandigarh',
    Region: 'Punjab HQ',
    Block: 'Sector 17',
    State: 'Chandigarh',
    Country: 'India',
    Pincode: '160017'
  },
  '462001': {
    Name: 'Bhopal GPO',
    Description: null,
    BranchType: 'Head Post Office',
    DeliveryStatus: 'Delivery',
    Circle: 'Madhya Pradesh',
    District: 'Bhopal',
    Division: 'Bhopal City',
    Region: 'Bhopal HQ',
    Block: 'Bhopal',
    State: 'Madhya Pradesh',
    Country: 'India',
    Pincode: '462001'
  },
  '781001': {
    Name: 'Guwahati GPO',
    Description: null,
    BranchType: 'Head Post Office',
    DeliveryStatus: 'Delivery',
    Circle: 'Assam',
    District: 'Kamrup',
    Division: 'Guwahati',
    Region: 'Assam HQ',
    Block: 'Guwahati',
    State: 'Assam',
    Country: 'India',
    Pincode: '781001'
  },
  '682011': {
    Name: 'Ernakulam Head Post Office',
    Description: null,
    BranchType: 'Head Post Office',
    DeliveryStatus: 'Delivery',
    Circle: 'Kerala',
    District: 'Ernakulam',
    Division: 'Ernakulam',
    Region: 'Central Kerala',
    Block: 'Kochi',
    State: 'Kerala',
    Country: 'India',
    Pincode: '682011'
  },
  '201301': {
    Name: 'Noida Sector 1 Sub Post Office',
    Description: null,
    BranchType: 'Sub Post Office',
    DeliveryStatus: 'Delivery',
    Circle: 'Uttar Pradesh',
    District: 'Gautam Buddha Nagar',
    Division: 'Ghaziabad',
    Region: 'Bareilly',
    Block: 'Noida',
    State: 'Uttar Pradesh',
    Country: 'India',
    Pincode: '201301'
  }
};

// 9 Postal Zones of India specifications
const POSTAL_ZONES = [
  {
    zone: 1,
    name: 'Northern Zone (1)',
    states: ['Delhi', 'Haryana', 'Punjab', 'Himachal Pradesh', 'Jammu & Kashmir', 'Ladakh', 'Chandigarh'],
    pinPrefix: '11 - 19',
    description: 'Covers National Capital Region, Northern plains, and Himalayan union territories.'
  },
  {
    zone: 2,
    name: 'Northern Zone (2)',
    states: ['Uttar Pradesh', 'Uttarakhand'],
    pinPrefix: '20 - 28',
    description: 'Encompasses Uttar Pradesh and Uttarakhand state circles.'
  },
  {
    zone: 3,
    name: 'Western Zone (1)',
    states: ['Rajasthan', 'Gujarat', 'Daman & Diu', 'Dadra & Nagar Haveli'],
    pinPrefix: '30 - 39',
    description: 'Western industrial belt covering Rajasthan and Gujarat circles.'
  },
  {
    zone: 4,
    name: 'Western Zone (2)',
    states: ['Maharashtra', 'Goa', 'Madhya Pradesh', 'Chhattisgarh'],
    pinPrefix: '40 - 49',
    description: 'Commercial hub covering Maharashtra, Goa, and central states.'
  },
  {
    zone: 5,
    name: 'Southern Zone (1)',
    states: ['Andhra Pradesh', 'Telangana', 'Karnataka'],
    pinPrefix: '50 - 59',
    description: 'Deccan plateau, tech corridors of Bengaluru and Hyderabad.'
  },
  {
    zone: 6,
    name: 'Southern Zone (2)',
    states: ['Tamil Nadu', 'Kerala', 'Puducherry', 'Lakshadweep'],
    pinPrefix: '60 - 69',
    description: 'Southern tip spanning Tamil Nadu, Kerala, and island territories.'
  },
  {
    zone: 7,
    name: 'Eastern Zone (1)',
    states: ['West Bengal', 'Odisha', 'Arunachal Pradesh', 'Assam', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Tripura', 'Sikkim', 'Andaman & Nicobar'],
    pinPrefix: '70 - 79',
    description: 'Eastern coastal states and the Seven Sister north-eastern circles.'
  },
  {
    zone: 8,
    name: 'Eastern Zone (2)',
    states: ['Bihar', 'Jharkhand'],
    pinPrefix: '80 - 85',
    description: 'Gangetic belt covering Bihar and Jharkhand postal divisions.'
  },
  {
    zone: 9,
    name: 'Special Functional Zone',
    states: ['Army Postal Service (APS)', 'Field Post Office (FPO)'],
    pinPrefix: '90 - 99',
    description: 'Dedicated functional postal network for Indian Armed Forces personnel.'
  }
];

export default function PincodesPage() {
  const { pincode: routePincode } = useParams<{ pincode?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Search modes: 'pincode' | 'location'
  const [activeTab, setActiveTab] = useState<'pincode' | 'location'>('pincode');
  const [pincodeQuery, setPincodeQuery] = useState('');
  const [locationQuery, setLocationQuery] = useState('');

  // Location search results & debounce state
  const [isSearchingLocation, setIsSearchingLocation] = useState(false);
  const [locationResults, setLocationResults] = useState<PostOfficeRecord[]>([]);

  // Active loaded PIN post offices
  const [currentPin, setCurrentPin] = useState<string>('110001');
  const [postOffices, setPostOffices] = useState<PostOfficeRecord[]>([FLAGSHIP_POSTAL_HUBS['110001']]);
  const [selectedOfficeIndex, setSelectedOfficeIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // Filter for post offices under selected pincode
  const [officeFilter, setOfficeFilter] = useState<'all' | 'delivery' | 'ho' | 'so' | 'bo'>('all');
  const [officeSearchTerm, setOfficeSearchTerm] = useState('');

  // Copy toast state
  const [copiedPin, setCopiedPin] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Active Zone Accordion
  const [openZone, setOpenZone] = useState<number | null>(null);

  // Selected post office record
  const selectedOffice = postOffices[selectedOfficeIndex] || postOffices[0] || FLAGSHIP_POSTAL_HUBS['110001'];

  // 1. Initial Load / Route synchronization
  useEffect(() => {
    const targetPin = routePincode || searchParams.get('pincode') || '110001';
    const cleanPin = targetPin.replace(/\D/g, '').slice(0, 6);

    if (cleanPin.length === 6) {
      setPincodeQuery(cleanPin);
      loadPincodeData(cleanPin);
    }
  }, [routePincode, searchParams]);

  // Load postal data for a 6-digit PIN code
  const loadPincodeData = async (pin: string) => {
    if (!/^[1-9][0-9]{5}$/.test(pin)) {
      setApiError('Please enter a valid 6-digit Indian PIN code starting with digits 1-9.');
      return;
    }

    setIsLoading(true);
    setApiError(null);

    // If we have flagship data for this pin, render it immediately
    if (FLAGSHIP_POSTAL_HUBS[pin]) {
      setPostOffices([FLAGSHIP_POSTAL_HUBS[pin]]);
      setCurrentPin(pin);
      setSelectedOfficeIndex(0);
    }

    try {
      const records = await fetchPostalApi(`/pincode/${pin}`);
      if (records && records.length > 0) {
        setPostOffices(records);
        setCurrentPin(pin);
        setSelectedOfficeIndex(0);
        setApiError(null);
      } else if (!FLAGSHIP_POSTAL_HUBS[pin]) {
        setApiError(`No official post offices found for PIN Code ${pin}. Please verify the 6 digits.`);
      }
    } catch (err: any) {
      if (!FLAGSHIP_POSTAL_HUBS[pin]) {
        setApiError('Unable to fetch live postal records at this moment. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Search by PIN
  const handlePincodeSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = pincodeQuery.replace(/\D/g, '').slice(0, 6);
    if (clean.length === 6) {
      navigate(`/resources/pincodes/${clean}`);
      loadPincodeData(clean);
    } else {
      setApiError('Please enter a valid 6-digit PIN code.');
    }
  };

  // Handle Location Search (debounce)
  useEffect(() => {
    if (activeTab !== 'location') return;
    const trimmed = locationQuery.trim();
    if (trimmed.length < 3) {
      setLocationResults([]);
      setIsSearchingLocation(false);
      return;
    }

    setIsSearchingLocation(true);
    const timer = setTimeout(async () => {
      try {
        const records = await fetchPostalApi(`/postoffice/${encodeURIComponent(trimmed)}`);
        if (records && Array.isArray(records)) {
          setLocationResults(records.slice(0, 30)); // Show top 30
        } else {
          setLocationResults([]);
        }
      } catch (err) {
        setLocationResults([]);
      } finally {
        setIsSearchingLocation(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [locationQuery, activeTab]);

  // Select a post office from location results
  const handleSelectLocationItem = (item: PostOfficeRecord) => {
    navigate(`/resources/pincodes/${item.Pincode}`);
    setPincodeQuery(item.Pincode);
    loadPincodeData(item.Pincode);
    setActiveTab('pincode');
    setLocationResults([]);
  };

  // Filtered post offices under the current PIN
  const filteredOffices = useMemo(() => {
    return postOffices.filter((office) => {
      const matchesFilter =
        officeFilter === 'all'
          ? true
          : officeFilter === 'delivery'
          ? office.DeliveryStatus?.toLowerCase() === 'delivery'
          : officeFilter === 'ho'
          ? office.BranchType?.toLowerCase().includes('head')
          : officeFilter === 'so'
          ? office.BranchType?.toLowerCase().includes('sub')
          : officeFilter === 'bo'
          ? office.BranchType?.toLowerCase().includes('branch')
          : true;

      const matchesSearch =
        officeSearchTerm.trim() === '' ||
        office.Name.toLowerCase().includes(officeSearchTerm.toLowerCase()) ||
        office.District.toLowerCase().includes(officeSearchTerm.toLowerCase()) ||
        office.Division.toLowerCase().includes(officeSearchTerm.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [postOffices, officeFilter, officeSearchTerm]);

  // Copy PIN code to clipboard
  const copyPinToClipboard = (pin: string) => {
    navigator.clipboard.writeText(pin);
    setCopiedPin(true);
    setTimeout(() => setCopiedPin(false), 2200);
  };

  // Copy Full Postal Address
  const copyFullAddress = () => {
    if (!selectedOffice) return;
    const text = `${selectedOffice.Name} ${selectedOffice.BranchType}, ${selectedOffice.District}, ${selectedOffice.State} - ${selectedOffice.Pincode}, India`;
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2200);
  };

  // Zone breakdown of current PIN code
  const zoneInfo = useMemo(() => {
    const firstDigit = parseInt(currentPin.charAt(0), 10);
    const subDigit = currentPin.charAt(1);
    const sortingDistrict = currentPin.slice(0, 3);
    const deliveryOfficeNum = currentPin.slice(3);

    const zoneObj = POSTAL_ZONES.find((z) => z.zone === firstDigit) || POSTAL_ZONES[0];

    return {
      firstDigit,
      subDigit,
      sortingDistrict,
      deliveryOfficeNum,
      zoneName: zoneObj.name,
      states: zoneObj.states.join(', ')
    };
  }, [currentPin]);

  // Schema.org Structured Data
  const jsonLdData = useMemo(() => {
    if (!selectedOffice) return null;

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'PostalAddress',
          '@id': `https://www.bankscart.com/resources/pincodes/${selectedOffice.Pincode}#address`,
          postalCode: selectedOffice.Pincode,
          addressLocality: selectedOffice.District,
          addressRegion: selectedOffice.State,
          addressCountry: 'IN',
          streetAddress: `${selectedOffice.Name} (${selectedOffice.BranchType})`
        },
        {
          '@type': 'Place',
          name: `${selectedOffice.Name} Post Office (${selectedOffice.Pincode})`,
          address: {
            '@type': 'PostalAddress',
            postalCode: selectedOffice.Pincode,
            addressLocality: selectedOffice.District,
            addressRegion: selectedOffice.State,
            addressCountry: 'IN'
          }
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://www.bankscart.com/'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Resources',
              item: 'https://www.bankscart.com/resources'
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: 'India Pincode Directory',
              item: 'https://www.bankscart.com/resources/pincodes'
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: `${selectedOffice.Pincode} - ${selectedOffice.Name}`,
              item: `https://www.bankscart.com/resources/pincodes/${selectedOffice.Pincode}`
            }
          ]
        },
        {
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: `What is the PIN code of ${selectedOffice.Name} in ${selectedOffice.District}?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `The PIN code of ${selectedOffice.Name} (${selectedOffice.BranchType}) in ${selectedOffice.District}, ${selectedOffice.State} is ${selectedOffice.Pincode}. It operates under the ${selectedOffice.Circle} Postal Circle and ${selectedOffice.Division} Division.`
              }
            },
            {
              '@type': 'Question',
              name: `Is ${selectedOffice.Name} (${selectedOffice.Pincode}) a Delivery or Non-Delivery post office?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `${selectedOffice.Name} is designated as a ${selectedOffice.DeliveryStatus} post office. Delivery post offices handle final customer dispatch and doorstep delivery of Speed Post, registered letters, parcels, and credit card/banking kits.`
              }
            },
            {
              '@type': 'Question',
              name: `How do Indian PIN codes work?`,
              acceptedAnswer: {
                '@type': 'Answer',
                text: `Indian Postal Index Numbers (PIN codes) are 6 digits long. Digit 1 identifies the National Postal Zone; Digit 2 identifies the sub-zone/state; Digit 3 identifies the sorting district; and Digits 4-6 designate the specific delivery post office.`
              }
            }
          ]
        }
      ]
    };
  }, [selectedOffice]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Dynamic SEO Meta via Helmet */}
      <Helmet>
        <title>
          {selectedOffice
            ? `${selectedOffice.Pincode} PIN Code - ${selectedOffice.Name}, ${selectedOffice.District}, ${selectedOffice.State} Post Office | BanksCart`
            : 'All India Pincode Directory & Post Office Finder | BanksCart'}
        </title>
        <meta
          name="description"
          content={
            selectedOffice
              ? `Check official postal details for PIN Code ${selectedOffice.Pincode} (${selectedOffice.Name}, ${selectedOffice.District}, ${selectedOffice.State}). Delivery status, branch type (${selectedOffice.BranchType}), circle (${selectedOffice.Circle}), division, and financial serviceability.`
              : 'Find complete postal information for 154,000+ post offices in India. Search by 6-digit PIN code, post office name, district, or city with official India Post data.'
          }
        />
        <link
          rel="canonical"
          href={`https://www.bankscart.com/resources/pincodes${currentPin ? `/${currentPin}` : ''}`}
        />
        <meta property="og:title" content={`${selectedOffice?.Pincode || 'India'} PIN Code Directory - BanksCart`} />
        <meta
          property="og:description"
          content={`Instant verified postal lookup for ${selectedOffice?.Name || 'all post offices in India'}. Postal circles, delivery status, and banking verification.`}
        />
        <meta property="og:url" content={`https://www.bankscart.com/resources/pincodes/${currentPin}`} />
        <meta property="og:type" content="website" />
        {jsonLdData && (
          <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
        )}
      </Helmet>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Resources', path: '/resources' },
            { label: 'India Pincode Directory', path: '/resources/pincodes' },
            ...(currentPin ? [{ label: `${currentPin} (${selectedOffice?.Name || 'Details'})` }] : [])
          ]}
        />

        {/* Hero Banner Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              Official India Post Directory • 154,000+ Verified Post Offices
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              All-India Pincode Directory & Post Office Finder
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              Search, verify, and inspect 6-digit Postal Index Numbers (PIN codes), delivery capabilities,
              sorting hubs, and postal circles across all 28 Indian States and 8 Union Territories.
            </p>

            {/* Quick Metro Pincode Jump Chips */}
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-slate-300">
              <span className="font-semibold text-amber-400 uppercase tracking-wider">Top Hubs:</span>
              {[
                { label: 'Delhi 110001', pin: '110001' },
                { label: 'Mumbai 400001', pin: '400001' },
                { label: 'Bengaluru 560001', pin: '560001' },
                { label: 'Kolkata 700001', pin: '700001' },
                { label: 'Chennai 600001', pin: '600001' },
                { label: 'Hyderabad 500001', pin: '500001' },
                { label: 'Pune 411001', pin: '411001' },
                { label: 'Ahmedabad 380001', pin: '380001' }
              ].map((metro) => (
                <button
                  key={metro.pin}
                  onClick={() => {
                    navigate(`/resources/pincodes/${metro.pin}`);
                    setPincodeQuery(metro.pin);
                    loadPincodeData(metro.pin);
                  }}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    currentPin === metro.pin
                      ? 'bg-amber-500 text-slate-950 font-bold border-amber-400 shadow-md'
                      : 'bg-white/10 text-slate-200 border-white/15 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {metro.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dual Mode Interactive Search Box */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50/70 p-2 gap-2">
            <button
              onClick={() => setActiveTab('pincode')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'pincode'
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <MapPin className="w-4 h-4" />
              Search by 6-Digit PIN Code
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`flex-1 py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                activeTab === 'location'
                  ? 'bg-blue-900 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Search by Post Office / Locality / City
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === 'pincode' ? (
              /* Tab 1: Search by 6-Digit PIN */
              <form onSubmit={handlePincodeSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                      <Search className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      value={pincodeQuery}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setPincodeQuery(val);
                        if (val.length === 6) {
                          navigate(`/resources/pincodes/${val}`);
                          loadPincodeData(val);
                        }
                      }}
                      placeholder="Enter 6-digit PIN code (e.g. 110001, 400050, 560034)"
                      className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 font-mono text-lg font-medium tracking-wider placeholder:font-sans placeholder:tracking-normal placeholder:text-slate-400"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading || pincodeQuery.length !== 6}
                    className="inline-flex items-center justify-center px-8 py-3.5 rounded-xl font-bold text-white bg-amber-600 hover:bg-amber-500 active:scale-[0.98] transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-base gap-2"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        Fetching...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        Search Pincode
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-500">
                  Tip: Entering any 6-digit postal code automatically queries official India Post records and updates the linkable URL.
                </p>
              </form>
            ) : (
              /* Tab 2: Search by Location Name / Branch */
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    value={locationQuery}
                    onChange={(e) => setLocationQuery(e.target.value)}
                    placeholder="Search by area or post office name (e.g. Bandra, Connaught Place, Whitefield, Salt Lake)"
                    className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-slate-900 text-base placeholder:text-slate-400"
                  />
                  {isSearchingLocation && (
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                      <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                    </div>
                  )}
                </div>

                {/* Location Autocomplete Results List */}
                {locationResults.length > 0 && (
                  <div className="max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-lg divide-y divide-slate-100">
                    {locationResults.map((item, idx) => (
                      <div
                        key={`${item.Name}-${item.Pincode}-${idx}`}
                        onClick={() => handleSelectLocationItem(item)}
                        className="p-3.5 hover:bg-blue-50/60 cursor-pointer transition-colors flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 truncate flex items-center gap-2">
                            <span>{item.Name}</span>
                            <span className="text-xs font-normal px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                              {item.BranchType}
                            </span>
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            {item.District}, {item.State} • Circle: {item.Circle}
                          </p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              item.DeliveryStatus?.toLowerCase() === 'delivery'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {item.DeliveryStatus}
                          </span>
                          <span className="text-sm font-mono font-bold text-blue-900 bg-blue-100/70 px-3 py-1 rounded-lg">
                            {item.Pincode}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {locationQuery.trim().length >= 3 && !isSearchingLocation && locationResults.length === 0 && (
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-sm flex items-center gap-2">
                    <Info className="w-4 h-4 shrink-0" />
                    No post offices found matching "{locationQuery}". Try searching by major district name or exact 6-digit PIN code.
                  </div>
                )}
              </div>
            )}

            {/* Error Message */}
            {apiError && (
              <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-center gap-3">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                <p className="font-medium">{apiError}</p>
              </div>
            )}
          </div>
        </div>

        {/* Post Office Verification Result Section */}
        {selectedOffice && (
          <div className="space-y-8">
            {/* Primary Result Card */}
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Header Bar */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-800">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified India Post Record
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedOffice.DeliveryStatus?.toLowerCase() === 'delivery'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                          : 'bg-slate-700 text-slate-300 border border-slate-600'
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5" />
                      {selectedOffice.DeliveryStatus} Post Office
                    </span>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30 text-xs font-semibold">
                      <Landmark className="w-3.5 h-3.5" />
                      {selectedOffice.BranchType}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {selectedOffice.Name} Post Office
                  </h2>
                  <p className="text-slate-300 text-sm sm:text-base mt-1 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                    {selectedOffice.District}, {selectedOffice.State} • Circle: {selectedOffice.Circle}
                  </p>
                </div>

                {/* Big PIN Code Display */}
                <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-5 sm:p-6 text-center md:text-right shrink-0">
                  <div className="text-xs uppercase font-bold tracking-widest text-slate-400 mb-1">
                    Postal Index Number
                  </div>
                  <div className="text-4xl sm:text-5xl font-mono font-black text-amber-400 tracking-wider tabular-nums">
                    {selectedOffice.Pincode}
                  </div>
                  <div className="mt-3 flex items-center justify-center md:justify-end gap-2">
                    <button
                      onClick={() => copyPinToClipboard(selectedOffice.Pincode)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-white transition-all active:scale-95"
                    >
                      {copiedPin ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          PIN Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy PIN
                        </>
                      )}
                    </button>
                    <button
                      onClick={copyFullAddress}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-xs font-semibold text-white transition-all active:scale-95"
                    >
                      {copiedAddress ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          Address Copied!
                        </>
                      ) : (
                        <>
                          <Share2 className="w-3.5 h-3.5" />
                          Copy Address
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Postal Hierarchy Breakdown Grid */}
              <div className="p-6 sm:p-8 space-y-8">
                <div>
                  <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-blue-600" />
                    Administrative & Postal Jurisdiction
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 font-medium block">Post Office Name</span>
                      <span className="text-sm font-bold text-slate-900 mt-0.5 block truncate">
                        {selectedOffice.Name}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 font-medium block">Branch Type</span>
                      <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                        {selectedOffice.BranchType}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 font-medium block">Delivery Status</span>
                      <span
                        className={`text-sm font-bold mt-0.5 block ${
                          selectedOffice.DeliveryStatus?.toLowerCase() === 'delivery'
                            ? 'text-emerald-700'
                            : 'text-amber-700'
                        }`}
                      >
                        {selectedOffice.DeliveryStatus}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 font-medium block">Postal Circle</span>
                      <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                        {selectedOffice.Circle} Circle
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 font-medium block">Postal Division</span>
                      <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                        {selectedOffice.Division}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 font-medium block">Postal Region</span>
                      <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                        {selectedOffice.Region || 'Headquarters'}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 font-medium block">Revenue District</span>
                      <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                        {selectedOffice.District}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 font-medium block">Taluk / Tehsil / Block</span>
                      <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                        {selectedOffice.Block || selectedOffice.District}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 font-medium block">State / Union Territory</span>
                      <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                        {selectedOffice.State}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 font-medium block">Country</span>
                      <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                        {selectedOffice.Country || 'India'}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 font-medium block">National Postal Zone</span>
                      <span className="text-sm font-bold text-slate-900 mt-0.5 block">
                        Zone {zoneInfo.firstDigit} ({zoneInfo.zoneName})
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 font-medium block">Sorting Sub-District</span>
                      <span className="text-sm font-mono font-bold text-blue-900 mt-0.5 block">
                        Code {zoneInfo.sortingDistrict}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 6-Digit PIN Structure Breakdown Banner */}
                <div className="rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 shadow-md border border-blue-800">
                  <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Compass className="w-4 h-4" />
                    How PIN Code {selectedOffice.Pincode} is Structured
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-2">
                    <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                      <div className="text-2xl font-mono font-bold text-amber-400">
                        {currentPin.charAt(0)}
                      </div>
                      <div className="text-xs font-semibold text-slate-200 mt-1">Digit 1: National Zone</div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        Zone {zoneInfo.firstDigit} ({zoneInfo.zoneName.replace(/\s*\(.*?\)/, '')})
                      </div>
                    </div>

                    <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                      <div className="text-2xl font-mono font-bold text-amber-400">
                        {currentPin.charAt(1)}
                      </div>
                      <div className="text-xs font-semibold text-slate-200 mt-1">Digit 2: Sub-Zone / State</div>
                      <div className="text-xs text-slate-400 mt-0.5">{selectedOffice.Circle} Postal Circle</div>
                    </div>

                    <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                      <div className="text-2xl font-mono font-bold text-amber-400">
                        {currentPin.charAt(2)}
                      </div>
                      <div className="text-xs font-semibold text-slate-200 mt-1">Digit 3: Sorting District</div>
                      <div className="text-xs text-slate-400 mt-0.5">{selectedOffice.Division} Sorting Hub</div>
                    </div>

                    <div className="bg-white/10 p-3.5 rounded-xl border border-white/10">
                      <div className="text-2xl font-mono font-bold text-amber-400">
                        {currentPin.slice(3)}
                      </div>
                      <div className="text-xs font-semibold text-slate-200 mt-1">Digits 4-6: Delivery Office</div>
                      <div className="text-xs text-slate-400 mt-0.5">{selectedOffice.Name} Office Code</div>
                    </div>
                  </div>
                </div>

                {/* Available Postal & Financial Services */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <PackageCheck className="w-4 h-4 text-emerald-600" />
                    Key Postal Services Supported
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                    {[
                      { title: 'Speed Post (EMS)', desc: 'High-speed tracked courier' },
                      { title: 'Registered Post', desc: 'Secure signature delivery' },
                      { title: 'Cash on Delivery', desc: 'E-commerce COD collection' },
                      { title: 'POSB Savings', desc: 'PPF, Sukanya & Term Deposits' },
                      { title: 'Aadhaar Seva', desc: 'Biometric update & enrollment' },
                      { title: 'Postal Life (PLI)', desc: 'Government life insurance' }
                    ].map((srv, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{srv.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">{srv.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financial Verification & Loan Eligibility CTA */}
                <div className="rounded-2xl bg-amber-500/10 border border-amber-300/40 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-amber-700" />
                      Applying for Loans or Credit Cards in PIN Code {selectedOffice.Pincode}?
                    </h4>
                    <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                      Banks and NBFCs require an exact 6-digit PIN code for physical address verification,
                      credit risk underwriting, and plastic card courier dispatch. Check eligible pre-approved offers for this pincode.
                    </p>
                  </div>
                  <Link
                    to="/eligibility"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm transition-all shadow-md shrink-0 active:scale-95"
                  >
                    Check Loan Eligibility
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Multiple Post Offices under Same Pincode Section */}
            {postOffices.length > 1 && (
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <Landmark className="w-5 h-5 text-blue-600" />
                      All Post Offices Under PIN Code {currentPin}
                    </h3>
                    <p className="text-sm text-slate-500 mt-0.5">
                      Showing {filteredOffices.length} of {postOffices.length} post offices serving this 6-digit postal zone.
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <button
                      onClick={() => setOfficeFilter('all')}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                        officeFilter === 'all'
                          ? 'bg-blue-900 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      All ({postOffices.length})
                    </button>
                    <button
                      onClick={() => setOfficeFilter('delivery')}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                        officeFilter === 'delivery'
                          ? 'bg-emerald-700 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Delivery Only (
                      {postOffices.filter((p) => p.DeliveryStatus?.toLowerCase() === 'delivery').length})
                    </button>
                    <button
                      onClick={() => setOfficeFilter('ho')}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                        officeFilter === 'ho'
                          ? 'bg-purple-700 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Head Offices (HO)
                    </button>
                    <button
                      onClick={() => setOfficeFilter('so')}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                        officeFilter === 'so'
                          ? 'bg-blue-700 text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Sub Offices (SO)
                    </button>
                  </div>
                </div>

                {/* Sub-search filter for office names */}
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={officeSearchTerm}
                    onChange={(e) => setOfficeSearchTerm(e.target.value)}
                    placeholder="Filter post offices by name, block or division..."
                    className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                {/* Grid of Post Offices under this PIN */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredOffices.map((office, idx) => {
                    const originalIndex = postOffices.findIndex((p) => p.Name === office.Name);
                    const isSelected = originalIndex === selectedOfficeIndex;

                    return (
                      <div
                        key={`${office.Name}-${idx}`}
                        onClick={() => setSelectedOfficeIndex(originalIndex >= 0 ? originalIndex : 0)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-500 shadow-md ring-2 ring-blue-500/20'
                            : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm leading-snug">
                              {office.Name}
                            </h4>
                            <p className="text-xs text-slate-500 mt-0.5">{office.BranchType}</p>
                          </div>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                              office.DeliveryStatus?.toLowerCase() === 'delivery'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {office.DeliveryStatus}
                          </span>
                        </div>

                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                          <span>{office.Division}</span>
                          <span className="font-bold text-blue-900 flex items-center gap-1">
                            {isSelected ? 'Active View' : 'Inspect Details'}
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 9 Postal Zones of India Interactive Explorer */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              National Postal Geography
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              The 9 Postal Zones of India
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              India Post segments the entire nation into 8 geographical civilian postal zones and 1 functional
              zone reserved exclusively for the Army Postal Service. The first digit of any PIN code identifies its primary zone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {POSTAL_ZONES.map((zone) => {
              const isSelectedZone = zone.zone === zoneInfo.firstDigit;
              const isExpanded = openZone === zone.zone;

              return (
                <div
                  key={zone.zone}
                  onClick={() => setOpenZone(isExpanded ? null : zone.zone)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelectedZone
                      ? 'bg-gradient-to-br from-blue-900 to-slate-900 text-white border-blue-700 shadow-lg'
                      : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                        isSelectedZone ? 'bg-amber-400 text-slate-950' : 'bg-blue-100 text-blue-900'
                      }`}
                    >
                      Prefix {zone.pinPrefix}
                    </span>
                    <span className="text-xs font-semibold opacity-75">
                      {isSelectedZone ? 'Current Zone' : `Zone ${zone.zone}`}
                    </span>
                  </div>

                  <h3 className={`text-base font-bold mt-3 ${isSelectedZone ? 'text-white' : 'text-slate-900'}`}>
                    {zone.name}
                  </h3>
                  <p className={`text-xs mt-1 leading-relaxed ${isSelectedZone ? 'text-slate-300' : 'text-slate-500'}`}>
                    {zone.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-200/20 text-xs">
                    <span className="font-semibold block mb-1">Circles Covered:</span>
                    <p className={`line-clamp-2 ${isSelectedZone ? 'text-slate-200' : 'text-slate-600'}`}>
                      {zone.states.join(', ')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Directory of Flagship State Capitals & Metros */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
              Fast Postal Index Lookup
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Major Metropolitan & State Capital Postal Hubs
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Instant access to General Post Offices (GPOs) and Head Offices (HOs) across prominent Indian state capitals and economic corridors.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(FLAGSHIP_POSTAL_HUBS).map(([pin, hub]) => (
              <button
                key={pin}
                onClick={() => {
                  navigate(`/resources/pincodes/${pin}`);
                  setPincodeQuery(pin);
                  loadPincodeData(pin);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className={`p-4 rounded-2xl border text-left transition-all group ${
                  currentPin === pin
                    ? 'bg-blue-900 text-white border-blue-800 shadow-md ring-2 ring-blue-500/30'
                    : 'bg-slate-50 hover:bg-blue-50/70 border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`font-mono font-bold text-base ${
                      currentPin === pin ? 'text-amber-400' : 'text-blue-950 group-hover:text-blue-600'
                    }`}
                  >
                    {pin}
                  </span>
                  <ArrowRight
                    className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-1 ${
                      currentPin === pin ? 'text-amber-400' : 'text-slate-400'
                    }`}
                  />
                </div>
                <div
                  className={`font-bold text-sm mt-1 truncate ${
                    currentPin === pin ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {hub.Name.replace(' Head Post Office', ' HO').replace(' General Post Office', ' GPO')}
                </div>
                <div
                  className={`text-xs mt-0.5 truncate ${
                    currentPin === pin ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {hub.District}, {hub.State}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Educational Content & Guides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center mb-4">
                <Navigation className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Understanding Indian PIN Codes
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Introduced on August 15, 1972 by Shriram Bhikaji Velankar, the 6-digit Postal Index Number (PIN)
                eliminated mail confusion caused by duplicate town names, diverse languages, and handwritten address ambiguities.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-blue-900 flex items-center gap-1">
              <span>National Standard 6-Digit System</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-900 flex items-center justify-center mb-4">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Delivery vs Non-Delivery Offices
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A <strong>Delivery Office</strong> conducts physical beat deliveries to doorsteps and handles Speed Post, registered letters, and parcel dispatches. A <strong>Non-Delivery Office</strong> serves solely administrative, transit, or counter booking functions.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-emerald-800 flex items-center gap-1">
              <span>Essential for Courier & Logistics</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-4">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                PIN Codes & Credit Verification
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Banks map financial serviceability by postal boundary. If your residential or business PIN code is outside a lender's operational geo-radius or listed as high risk, credit card delivery and loan physical verification can be rejected.
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-semibold text-amber-900 flex items-center gap-1">
              <span>Critical for Bank KYC Compliance</span>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions (FAQ) Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Indian Postal Index Numbers (PIN Codes) FAQ
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Everything you need to know about post office designations, PIN anatomy, delivery mechanisms, and banking KYC.
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {[
              {
                q: 'What is a PIN Code in India and how many digits does it have?',
                a: 'A PIN (Postal Index Number) code is an official 6-digit postal code system introduced by India Post on 15 August 1972. It uniquely identifies postal zones, sub-zones, sorting districts, and specific delivery post offices across the country.'
              },
              {
                q: 'What do the 6 digits in an Indian PIN code represent?',
                a: 'The first digit represents the National Postal Zone (1-9). The second digit represents the sub-zone or State circle. The third digit identifies the revenue/sorting district. The final three digits (4th, 5th, and 6th) specify the individual delivery post office that services the locality.'
              },
              {
                q: 'What is the difference between a Head Post Office (HO), Sub Post Office (SO), and Branch Post Office (BO)?',
                a: 'A Head Post Office (HO) is the principal administrative and accounting postal center in a district. A Sub Post Office (SO) is a fully functional urban or suburban post office subordinate to a Head Office. A Branch Post Office (BO) operates primarily in rural villages and smaller towns, offering essential postal and savings bank services with limited daily working hours.'
              },
              {
                q: 'Why are some post offices marked as "Non-Delivery"?',
                a: 'Non-Delivery post offices do not send out postmen to deliver mail to residential or commercial addresses. Instead, they handle counter transactions (booking Speed Post, registered letters, selling stamps) or administrative sorting. Deliveries for that area are completed by an adjacent parent delivery post office.'
              },
              {
                q: 'Can multiple post offices have the exact same 6-digit PIN code?',
                a: 'Yes! A single 6-digit PIN code frequently covers several post offices within the same urban or commercial precinct. For example, PIN Code 110001 in New Delhi covers over 20 post offices including New Delhi GPO, Connaught Place SO, Janpath SO, Parliament House SO, and Supreme Court SO.'
              },
              {
                q: 'What is Postal Zone 9 in India?',
                a: 'Zone 9 is not a geographical state or territory; it is the dedicated functional postal zone reserved exclusively for the Army Postal Service (APS) and Field Post Offices (FPO), ensuring secure and confidential postal communication for Indian Armed Forces personnel stationed across the country.'
              },
              {
                q: 'Why do banks and credit card issuers require an accurate PIN code?',
                a: 'Financial institutions (HDFC, SBI, ICICI, Axis) utilize PIN codes to determine geographical serviceability for doorstep KYC verification, home loan property valuation, and secure courier dispatch of plastic EMV credit/debit cards and cheque books via India Post Speed Post or courier partners.'
              }
            ].map((faq, fIdx) => (
              <details
                key={fIdx}
                className="group py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-slate-900 hover:text-blue-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold">
                    {faq.q}
                  </h3>
                  <div className="shrink-0 rounded-full bg-slate-100 group-open:bg-blue-100 p-1.5 text-slate-600 group-open:text-blue-900 transition-colors">
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-open:rotate-180" />
                  </div>
                </summary>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed pr-6">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
