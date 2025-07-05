import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Building, Globe, Zap } from 'lucide-react';
import { searchPincodes, PincodeData } from './pincodeData';

interface SearchSectionProps {
  onResultsChange: (results: PincodeData[]) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onResultsChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const popularSearches = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 
    'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
  ];

  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        const results = searchPincodes(searchQuery);
        onResultsChange(results);
        
        // Generate suggestions based on search results
        const newSuggestions = results
          .slice(0, 5)
          .map(result => result.area)
          .filter((area, index, self) => self.indexOf(area) === index);
        setSuggestions(newSuggestions);
        
        setTimeout(() => setIsSearching(false), 300);
      } else {
        onResultsChange([]);
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery, onResultsChange]);

  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-gradient-to-br from-gray-50 to-white py-16"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Text */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Find Any <span className="text-primary-600">Pincode</span> in India
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Search through thousands of pincodes across all states, districts, and cities. 
              Get complete postal information instantly.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div 
            className="relative mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <Search className={`h-6 w-6 transition-colors duration-200 ${
                  isSearching ? 'text-primary-500 animate-pulse' : 'text-gray-400'
                }`} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by pincode, city, district, or area..."
                className="w-full pl-16 pr-6 py-5 text-lg border-2 border-gray-200 rounded-2xl 
                         focus:border-primary-500 focus:ring-4 focus:ring-primary-100 
                         transition-all duration-300 shadow-lg hover:shadow-xl
                         bg-white/80 backdrop-blur-sm"
              />
              {isSearching && (
                <div className="absolute inset-y-0 right-0 pr-6 flex items-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="h-6 w-6 border-2 border-primary-500 border-t-transparent rounded-full"
                  />
                </div>
              )}
            </div>

            {/* Search Suggestions */}
            <AnimatePresence>
              {suggestions.length > 0 && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 z-10"
                >
                  {suggestions.map((suggestion, index) => (
                    <motion.button
                      key={suggestion}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => setSearchQuery(suggestion)}
                      className="w-full text-left px-6 py-3 hover:bg-primary-50 transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
                    >
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-primary-500" />
                        <span className="text-gray-700">{suggestion}</span>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Popular Searches */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <p className="text-gray-600 mb-4 font-medium">Popular Searches:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {popularSearches.map((term, index) => (
                <motion.button
                  key={term}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePopularSearch(term)}
                  className="px-4 py-2 bg-white border-2 border-primary-200 text-primary-700 
                           rounded-full hover:bg-primary-50 hover:border-primary-300 
                           transition-all duration-200 shadow-sm hover:shadow-md
                           font-medium text-sm"
                >
                  {term}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Feature Icons */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            {[
              { icon: Globe, title: 'All States', desc: '28 States & 8 UTs' },
              { icon: Building, title: 'All Districts', desc: '700+ Districts' },
              { icon: MapPin, title: 'All Cities', desc: '4000+ Cities' },
              { icon: Zap, title: 'Instant Search', desc: 'Real-time Results' }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default SearchSection;