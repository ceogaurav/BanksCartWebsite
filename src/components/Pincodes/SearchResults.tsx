import React from 'react';
import { MapPin, Building2, Map, Copy, Check } from 'lucide-react';
import { SearchResult } from '../types/pincode';
import { useState } from 'react';

interface SearchResultsProps {
  results: SearchResult[];
  query: string;
  searchType: 'pincode' | 'location';
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  query,
  searchType,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!query.trim()) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Search className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Start Your Search
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Enter a pincode or location name to find detailed postal information across India.
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <MapPin className="w-8 h-8 text-red-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Results Found
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          We couldn't find any results for "{query}". Please check your spelling or try a different search term.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          Search Results ({results.length})
        </h2>
        <div className="text-sm text-gray-500">
          Showing results for "{query}"
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <div
            key={result.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {result.pincode}
                  </h3>
                  <p className="text-sm text-gray-500">Pincode</p>
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(result.pincode, result.id)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                title="Copy pincode"
              >
                {copiedId === result.id ? (
                  <Check className="w-4 h-4 text-green-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Building2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">
                    {result.post_office_name}
                  </p>
                  <p className="text-sm text-gray-500">Post Office</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Map className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">
                    {result.district}
                  </p>
                  <p className="text-sm text-gray-500">District</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">
                    {result.state}
                  </p>
                  <p className="text-sm text-gray-500">State</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{result.country}</span>
                {result.latitude && result.longitude && (
                  <span>
                    {parseFloat(result.latitude).toFixed(4)}, {parseFloat(result.longitude).toFixed(4)}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {results.length === 50 && (
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">
            Showing first 50 results. Try a more specific search for better results.
          </p>
        </div>
      )}
    </div>
  );
};

const Search = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);