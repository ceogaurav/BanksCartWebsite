import React from 'react';
import { SearchBox } from '../components/pincodes/SearchBox';
import { SearchResults } from '../components/pincodes/SearchResults';
import { LoadingSpinner } from '../components/pincodes/LoadingSpinner';
import { ErrorMessage } from '../components/pincodes/ErrorMessage';
import { usePincodeData } from '../components/pincodes/usePincodeData';
import { useSearch } from '../components/pincodes/useSearch';

function PincodesPage() {
  const { data, loading, error } = usePincodeData();
  const {
    query,
    setQuery,
    searchType,
    setSearchType,
    results,
    suggestions,
  } = useSearch(data);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            India Pincode Lookup
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find detailed postal information for any location in India. Search by pincode 
            or location name to get comprehensive postal data instantly.
          </p>
        </div>

        {/* Search Section */}
        <div className="mb-12">
          <SearchBox
            query={query}
            onQueryChange={setQuery}
            searchType={searchType}
            onSearchTypeChange={setSearchType}
            suggestions={suggestions}
            loading={loading}
          />
        </div>

        {/* Content Section */}
        <div className="min-h-[400px]">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message={error} onRetry={handleRetry} />
          ) : (
            <SearchResults
              results={results}
              query={query}
              searchType={searchType}
            />
          )}
        </div>

        {/* Stats Section */}
        {!loading && !error && (
          <div className="mt-16 bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {data.length.toLocaleString()}
                </div>
                <div className="text-gray-600">Total Pincodes</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {new Set(data.map(item => item.state)).size}
                </div>
                <div className="text-gray-600">States & UTs</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {new Set(data.map(item => item.district)).size}
                </div>
                <div className="text-gray-600">Districts</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default PincodesPage;