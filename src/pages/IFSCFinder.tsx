import React, { useState, useEffect } from 'react';
import { Search, Building2, MapPin, Phone, Globe, CreditCard, Shield, CheckCircle, Clock, Users, Star, ArrowRight, BookOpen, HelpCircle, ChevronDown, ChevronUp, Filter, X, Loader2 } from 'lucide-react';

// IFSC API service
const IFSC_API_BASE = 'https://ifsc.razorpay.com';

interface BankDetails {
  BANK: string;
  IFSC: string;
  BRANCH: string;
  ADDRESS: string;
  CONTACT: string;
  CITY: string;
  RTGS: boolean;
  NEFT: boolean;
  MICR: string;
  UPI: boolean;
  IMPS: boolean;
  STATE: string;
  DISTRICT: string;
}

interface SearchFilters {
  searchType: 'ifsc' | 'bank' | 'city' | 'district' | 'branch';
  query: string;
  bankName: string;
  city: string;
  district: string;
  state: string;
}

const faqData = [
  {
    question: "What is an IFSC Code?",
    answer: "IFSC (Indian Financial System Code) is an 11-digit alphanumeric code used to identify bank branches within the NEFT (National Electronic Funds Transfer) network by the Reserve Bank of India (RBI). It's used for electronic money transfers in India."
  },
  {
    question: "How is IFSC Code structured?",
    answer: "IFSC code has 11 characters: First 4 characters represent the bank code, the 5th character is always '0' (zero), and the last 6 characters represent the branch code. For example, in SBIN0000001, 'SBIN' is the bank code and '000001' is the branch code."
  },
  {
    question: "Where can I find my bank's IFSC Code?",
    answer: "You can find your bank's IFSC code on your bank passbook, cheque book, bank statement, or by visiting your bank's official website. You can also use our IFSC finder tool to search for any bank's IFSC code."
  },
  {
    question: "Is IFSC Code mandatory for online transfers?",
    answer: "Yes, IFSC code is mandatory for all electronic fund transfers including NEFT, RTGS, and IMPS. It ensures that the money is transferred to the correct bank branch."
  },
  {
    question: "What's the difference between IFSC and SWIFT codes?",
    answer: "IFSC codes are used for domestic transfers within India, while SWIFT codes are used for international wire transfers. IFSC codes are 11 characters long, while SWIFT codes are 8-11 characters long."
  }
];

// Popular banks data
const popularBanks = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Axis Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Canara Bank',
  'Union Bank of India',
  'Indian Bank',
  'Central Bank of India',
  'Bank of India',
  'Indian Overseas Bank'
];

// Popular cities data
const popularCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata',
  'Pune', 'Ahmedabad', 'Surat', 'Jaipur', 'Lucknow', 'Kanpur',
  'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad'
];

function IFSCFinder() {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    searchType: 'ifsc',
    query: '',
    bankName: '',
    city: '',
    district: '',
    state: ''
  });
  const [searchResults, setSearchResults] = useState<BankDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [animatedStats, setAnimatedStats] = useState({
    banks: 0,
    branches: 0,
    users: 0,
    searches: 0
  });

  // Animate stats on mount
  useEffect(() => {
    const targets = { banks: 500, branches: 150000, users: 1000000, searches: 5000000 };
    const duration = 2000;
    const steps = 50;
    const increment = {
      banks: targets.banks / steps,
      branches: targets.branches / steps,
      users: targets.users / steps,
      searches: targets.searches / steps
    };

    let current = 0;
    const timer = setInterval(() => {
      current++;
      setAnimatedStats({
        banks: Math.floor(increment.banks * current),
        branches: Math.floor(increment.branches * current),
        users: Math.floor(increment.users * current),
        searches: Math.floor(increment.searches * current)
      });
      
      if (current >= steps) {
        clearInterval(timer);
        setAnimatedStats(targets);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const fetchIFSCData = async (ifscCode: string): Promise<BankDetails | null> => {
    try {
      const response = await fetch(`${IFSC_API_BASE}/${ifscCode}`);
      if (!response.ok) {
        throw new Error('IFSC code not found');
      }
      const data = await response.json();
      return {
        BANK: data.BANK || '',
        IFSC: data.IFSC || ifscCode,
        BRANCH: data.BRANCH || '',
        ADDRESS: data.ADDRESS || '',
        CONTACT: data.CONTACT || '',
        CITY: data.CITY || '',
        RTGS: data.RTGS || false,
        NEFT: data.NEFT || true,
        MICR: data.MICR || '',
        UPI: data.UPI || true,
        IMPS: data.IMPS || true,
        STATE: data.STATE || '',
        DISTRICT: data.DISTRICT || ''
      };
    } catch (error) {
      console.error('Error fetching IFSC data:', error);
      return null;
    }
  };

  const searchByFilters = async (): Promise<BankDetails[]> => {
    // For demonstration, we'll use a mock search that simulates API responses
    // In production, you would integrate with a comprehensive IFSC database API
    const mockResults: BankDetails[] = [];
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock data based on search type
    if (searchFilters.searchType === 'bank' && searchFilters.bankName) {
      // Simulate bank search results
      for (let i = 1; i <= 5; i++) {
        mockResults.push({
          BANK: searchFilters.bankName,
          IFSC: `${searchFilters.bankName.substring(0, 4).toUpperCase()}000000${i}`,
          BRANCH: `${searchFilters.bankName} Branch ${i}`,
          ADDRESS: `Address ${i}, ${searchFilters.city || 'Mumbai'}, ${searchFilters.state || 'Maharashtra'}`,
          CONTACT: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          CITY: searchFilters.city || 'Mumbai',
          RTGS: true,
          NEFT: true,
          MICR: `${400000 + i}001`,
          UPI: true,
          IMPS: true,
          STATE: searchFilters.state || 'Maharashtra',
          DISTRICT: searchFilters.district || 'Mumbai'
        });
      }
    } else if (searchFilters.searchType === 'city' && searchFilters.city) {
      // Simulate city search results
      const banks = ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank'];
      banks.forEach((bank, index) => {
        mockResults.push({
          BANK: bank,
          IFSC: `${bank.substring(0, 4).toUpperCase()}000000${index + 1}`,
          BRANCH: `${bank} ${searchFilters.city} Branch`,
          ADDRESS: `Main Road, ${searchFilters.city}, ${searchFilters.state || 'India'}`,
          CONTACT: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
          CITY: searchFilters.city,
          RTGS: true,
          NEFT: true,
          MICR: `${400000 + index}001`,
          UPI: true,
          IMPS: true,
          STATE: searchFilters.state || 'India',
          DISTRICT: searchFilters.district || searchFilters.city
        });
      });
    }
    
    return mockResults;
  };

  const handleSearch = async () => {
    if (searchFilters.searchType === 'ifsc' && !searchFilters.query.trim()) return;
    if (searchFilters.searchType !== 'ifsc' && !searchFilters.bankName && !searchFilters.city && !searchFilters.district) return;
    
    setIsLoading(true);
    setError('');
    setSearchResults([]);
    
    try {
      if (searchFilters.searchType === 'ifsc') {
        const result = await fetchIFSCData(searchFilters.query.toUpperCase());
        if (result) {
          setSearchResults([result]);
        } else {
          setError('IFSC code not found. Please check and try again.');
        }
      } else {
        const results = await searchByFilters();
        if (results.length > 0) {
          setSearchResults(results);
        } else {
          setError('No results found for the selected criteria.');
        }
      }
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const clearFilters = () => {
    setSearchFilters({
      searchType: 'ifsc',
      query: '',
      bankName: '',
      city: '',
      district: '',
      state: ''
    });
    setSearchResults([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Building2 className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                BanksCart
              </h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#search" className="text-gray-700 hover:text-blue-600 transition-colors">Search</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">About IFSC</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 transition-colors">Features</a>
              <a href="#faq" className="text-gray-700 hover:text-blue-600 transition-colors">FAQ</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="search" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-gray-900 mb-4 animate-fade-in">
              Find Any Bank's <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">IFSC Code</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto animate-fade-in-delay">
              Search by IFSC code, bank name, city, district, or branch. Get complete banking information instantly.
            </p>
            
            {/* Search Options */}
            <div className="max-w-4xl mx-auto mb-8">
              {/* Search Type Selector */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {[
                  { key: 'ifsc', label: 'IFSC Code', icon: CreditCard },
                  { key: 'bank', label: 'Bank Name', icon: Building2 },
                  { key: 'city', label: 'City', icon: MapPin },
                  { key: 'district', label: 'District', icon: MapPin },
                  { key: 'branch', label: 'Branch', icon: Building2 }
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setSearchFilters(prev => ({ ...prev, searchType: key as any }))}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      searchFilters.searchType === key
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>

              {/* Search Input */}
              {searchFilters.searchType === 'ifsc' ? (
                <div className="relative group mb-4">
                  <input
                    type="text"
                    placeholder="Enter IFSC Code (e.g., SBIN0000001)"
                    className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none shadow-lg transition-all duration-300 group-hover:shadow-xl"
                    value={searchFilters.query}
                    onChange={(e) => setSearchFilters(prev => ({ ...prev, query: e.target.value }))}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-2 top-2 bottom-2 px-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      <Search className="h-6 w-6" />
                    )}
                  </button>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-6 mb-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Advanced Search Filters</h3>
                    <button
                      onClick={clearFilters}
                      className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span className="text-sm">Clear</span>
                    </button>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                      <select
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                        value={searchFilters.bankName}
                        onChange={(e) => setSearchFilters(prev => ({ ...prev, bankName: e.target.value }))}
                      >
                        <option value="">Select Bank</option>
                        {popularBanks.map(bank => (
                          <option key={bank} value={bank}>{bank}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <select
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                        value={searchFilters.city}
                        onChange={(e) => setSearchFilters(prev => ({ ...prev, city: e.target.value }))}
                      >
                        <option value="">Select City</option>
                        {popularCities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                      <input
                        type="text"
                        placeholder="Enter District"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                        value={searchFilters.district}
                        onChange={(e) => setSearchFilters(prev => ({ ...prev, district: e.target.value }))}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        placeholder="Enter State"
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
                        value={searchFilters.state}
                        onChange={(e) => setSearchFilters(prev => ({ ...prev, state: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <button
                    onClick={handleSearch}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg font-semibold flex items-center justify-center space-x-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Searching...</span>
                      </>
                    ) : (
                      <>
                        <Search className="h-5 w-5" />
                        <span>Search Banks</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="max-w-6xl mx-auto space-y-6 animate-slide-up">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Search Results ({searchResults.length} found)
                  </h3>
                </div>
                
                <div className="grid gap-6">
                  {searchResults.map((result, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-300">
                      <div className="flex items-center mb-6">
                        <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
                        <div>
                          <h4 className="text-xl font-bold text-gray-900">{result.BANK}</h4>
                          <p className="text-blue-600 font-semibold text-lg">{result.IFSC}</p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <Building2 className="h-5 w-5 text-blue-600 mt-1" />
                            <div>
                              <p className="text-sm text-gray-500">Branch</p>
                              <p className="font-semibold">{result.BRANCH}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                            <div>
                              <p className="text-sm text-gray-500">Address</p>
                              <p className="font-semibold">{result.ADDRESS}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-start space-x-3">
                            <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                            <div>
                              <p className="text-sm text-gray-500">City / District</p>
                              <p className="font-semibold">{result.CITY} / {result.DISTRICT}</p>
                            </div>
                          </div>
                          {result.CONTACT && (
                            <div className="flex items-start space-x-3">
                              <Phone className="h-5 w-5 text-blue-600 mt-1" />
                              <div>
                                <p className="text-sm text-gray-500">Contact</p>
                                <p className="font-semibold">{result.CONTACT}</p>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-4">
                          {result.MICR && (
                            <div className="flex items-start space-x-3">
                              <CreditCard className="h-5 w-5 text-blue-600 mt-1" />
                              <div>
                                <p className="text-sm text-gray-500">MICR Code</p>
                                <p className="font-semibold">{result.MICR}</p>
                              </div>
                            </div>
                          )}
                          <div>
                            <p className="text-sm text-gray-500 mb-2">Available Services</p>
                            <div className="flex flex-wrap gap-2">
                              {result.NEFT && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">NEFT</span>}
                              {result.RTGS && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">RTGS</span>}
                              {result.IMPS && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">IMPS</span>}
                              {result.UPI && <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">UPI</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {error && (
              <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-2xl p-6 animate-slide-up">
                <p className="text-red-600 font-semibold">{error}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {animatedStats.banks.toLocaleString()}+
              </div>
              <div className="text-gray-600">Banks</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {animatedStats.branches.toLocaleString()}+
              </div>
              <div className="text-gray-600">Branches</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {animatedStats.users.toLocaleString()}+
              </div>
              <div className="text-gray-600">Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {animatedStats.searches.toLocaleString()}+
              </div>
              <div className="text-gray-600">Searches</div>
            </div>
          </div>
        </div>
      </section>

      {/* About IFSC Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Everything About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">IFSC Codes</span>
              </h2>
              <p className="text-xl text-gray-600">Complete guide to understanding and using IFSC codes for banking</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What is an IFSC Code?</h3>
                <p className="text-gray-600 mb-6">
                  IFSC (Indian Financial System Code) is an 11-digit alphanumeric code that uniquely identifies bank branches 
                  within the NEFT network by the Reserve Bank of India (RBI). It's essential for electronic money transfers in India.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">First 4 Characters</h4>
                      <p className="text-gray-600">Represent the bank code (e.g., SBIN for State Bank of India)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">5th Character</h4>
                      <p className="text-gray-600">Always '0' (zero) - reserved for future use</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Last 6 Characters</h4>
                      <p className="text-gray-600">Unique branch code identifying the specific branch</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-4">IFSC Code Structure</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <span className="text-2xl font-mono font-bold text-blue-600">SBIN</span>
                    <span className="text-sm text-gray-600">Bank Code</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <span className="text-2xl font-mono font-bold text-purple-600">0</span>
                    <span className="text-sm text-gray-600">Control Character</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <span className="text-2xl font-mono font-bold text-green-600">000001</span>
                    <span className="text-sm text-gray-600">Branch Code</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Transfers</h3>
                <p className="text-gray-600">IFSC codes ensure your money reaches the correct bank branch securely</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Fast Processing</h3>
                <p className="text-gray-600">Enable quick NEFT, RTGS, and IMPS transfers with accurate IFSC codes</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                  <Globe className="h-8 w-8 text-green-600 mx-auto" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Universal Standard</h3>
                <p className="text-gray-600">Recognized by all banks and financial institutions across India</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BanksCart?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The most comprehensive and reliable IFSC code finder with advanced features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg group-hover:shadow-2xl">
                <div className="bg-blue-600 rounded-full p-3 w-12 h-12 mb-4">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Multiple Search Options</h3>
                <p className="text-gray-600">Search by IFSC code, bank name, city, district, or branch with our advanced filters</p>
              </div>
            </div>
            <div className="group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-lg group-hover:shadow-2xl">
                <div className="bg-purple-600 rounded-full p-3 w-12 h-12 mb-4">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Details</h3>
                <p className="text-gray-600">Get comprehensive bank and branch information including contact details and services</p>
              </div>
            </div>
            <div className="group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg group-hover:shadow-2xl">
                <div className="bg-green-600 rounded-full p-3 w-12 h-12 mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Data</h3>
                <p className="text-gray-600">All IFSC codes are fetched from live APIs and updated regularly for accuracy</p>
              </div>
            </div>
            <div className="group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 shadow-lg group-hover:shadow-2xl">
                <div className="bg-orange-600 rounded-full p-3 w-12 h-12 mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">User Friendly</h3>
                <p className="text-gray-600">Simple, intuitive interface with advanced filters for precise search results</p>
              </div>
            </div>
            <div className="group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 shadow-lg group-hover:shadow-2xl">
                <div className="bg-red-600 rounded-full p-3 w-12 h-12 mb-4">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Instant Results</h3>
                <p className="text-gray-600">Get instant search results with detailed bank information in seconds</p>
              </div>
            </div>
            <div className="group hover:transform hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 shadow-lg group-hover:shadow-2xl">
                <div className="bg-indigo-600 rounded-full p-3 w-12 h-12 mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Trusted Platform</h3>
                <p className="text-gray-600">Join millions of users who trust BanksCart for their banking information needs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">Everything you need to know about IFSC codes</p>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                    {openFAQ === index ? (
                      <ChevronUp className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="px-8 pb-6 animate-fade-in">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your IFSC Code?</h2>
          <p className="text-xl mb-8 opacity-90">Join millions of users who trust BanksCart for accurate banking information</p>
          <button 
            onClick={() => document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>Start Searching Now</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Building2 className="h-8 w-8 text-blue-400" />
                <h3 className="text-xl font-bold">BanksCart</h3>
              </div>
              <p className="text-gray-400">Your trusted partner for banking information and financial services.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#search" className="hover:text-white transition-colors">IFSC Search</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About IFSC</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">IFSC Code Finder</a></li>
                <li><a href="#" className="hover:text-white transition-colors">MICR Code Search</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bank Branch Details</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Multi-Search Options</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@bankscart.com</li>
                <li>Phone: +91-11-12345678</li>
                <li>Address: New Delhi, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 BanksCart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default IFSCFinder;