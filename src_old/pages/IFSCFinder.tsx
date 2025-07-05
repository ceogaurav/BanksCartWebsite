import React, { useState } from 'react';
import { Search, Copy, MapPin, Phone, ExternalLink } from 'lucide-react';

const IFSCFinder: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    const ifscCode = searchTerm.trim().toUpperCase();

    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
      setError('Please enter a valid 11-character IFSC code');
      setResult(null);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);
      if (!res.ok) throw new Error('Invalid IFSC');
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setError('IFSC code not found. Please try another one.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">IFSC Code Finder</h1>
          <p className="text-lg text-gray-600">Find live IFSC code details using Razorpay API</p>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Enter IFSC Code</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="e.g. SBIN0000001"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
        </div>

        {/* Result Section */}
        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {result && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{result.BANK}</h3>
                <p className="text-gray-600 mb-4">{result.BRANCH}</p>

                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-gray-700">IFSC Code:</span>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">{result.IFSC}</code>
                  <button
                    onClick={() => copyToClipboard(result.IFSC)}
                    className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-start space-x-2 mb-3">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-900">{result.ADDRESS}</p>
                    <p className="text-sm text-gray-600">
                      {result.CITY}, {result.DISTRICT}, {result.STATE}
                    </p>
                  </div>
                </div>

                {result.CONTACT && (
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{result.CONTACT}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col space-y-2">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(result.ADDRESS)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-700 transition-colors text-center"
                >
                  Get Directions
                </a>
                <a
                  href={`https://ifsc.razorpay.com/${result.IFSC}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-50 flex items-center justify-center space-x-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>API Link</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IFSCFinder;
