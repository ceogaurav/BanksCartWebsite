import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Building2, X } from 'lucide-react';

interface SearchBoxProps {
  query: string;
  onQueryChange: (query: string) => void;
  searchType: 'pincode' | 'location';
  onSearchTypeChange: (type: 'pincode' | 'location') => void;
  suggestions: string[];
  loading: boolean;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  query,
  onQueryChange,
  searchType,
  onSearchTypeChange,
  suggestions,
  loading,
}) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFocusedIndex(-1);
  }, [suggestions]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (focusedIndex >= 0) {
          onQueryChange(suggestions[focusedIndex]);
          setShowSuggestions(false);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        inputRef.current?.blur();
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    onQueryChange(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const clearSearch = () => {
    onQueryChange('');
    inputRef.current?.focus();
  };

  return (
    <div className="relative max-w-2xl mx-auto">
      {/* Search Type Toggle */}
      <div className="flex bg-gray-100 rounded-lg p-1 mb-4">
        <button
          onClick={() => onSearchTypeChange('pincode')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            searchType === 'pincode'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Search by Pincode</span>
        </button>
        <button
          onClick={() => onSearchTypeChange('location')}
          className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-all ${
            searchType === 'location'
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Search by Location</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            // Delay hiding suggestions to allow clicks
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          onKeyDown={handleKeyDown}
          placeholder={
            searchType === 'pincode'
              ? 'Enter pincode (e.g., 110001)'
              : 'Enter city, district, or state name'
          }
          className="block w-full pl-12 pr-12 py-4 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm transition-all"
          disabled={loading}
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto"
        >
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestionClick(suggestion)}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 ${
                index === focusedIndex ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                {searchType === 'pincode' ? (
                  <MapPin className="w-4 h-4 text-gray-400" />
                ) : (
                  <Building2 className="w-4 h-4 text-gray-400" />
                )}
                <span className="font-medium">{suggestion}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};