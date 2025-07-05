import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Building2, Globe, Mail, Copy, Check } from 'lucide-react';
import { PincodeData } from './pincodeData';

interface ResultsSectionProps {
  results: PincodeData[];
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ results }) => {
  const [copiedPincode, setCopiedPincode] = React.useState<string | null>(null);

  const copyToClipboard = async (pincode: string) => {
    try {
      await navigator.clipboard.writeText(pincode);
      setCopiedPincode(pincode);
      setTimeout(() => setCopiedPincode(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Head Office': return 'bg-green-100 text-green-800 border-green-200';
      case 'Sub Office': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Branch Office': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <MapPin className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          No Results Found
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Your search did not match any pincodes. Please try a different search term.
        </p>
      </div>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="py-12 bg-gray-50"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Search Results ({results.length})
          </h3>
          <p className="text-gray-600">
            Found {results.length} matching pincode{results.length !== 1 ? 's' : ''}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {results.map((result, index) => (
              <motion.div
                key={`${result.pincode}-${index}`}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50, scale: 0.9 }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  y: -5, 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  {/* Pincode Header */}
                  <div className="flex items-center justify-between mb-4">
                    <motion.div 
                      className="flex items-center space-x-3"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="bg-primary-100 p-2 rounded-lg">
                        <Mail className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-primary-600">
                          {result.pincode}
                        </h4>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(result.type)}`}>
                          {result.type}
                        </span>
                      </div>
                    </motion.div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => copyToClipboard(result.pincode)}
                      className="p-2 rounded-lg bg-gray-100 hover:bg-primary-100 transition-colors duration-200"
                      title="Copy pincode"
                    >
                      {copiedPincode === result.pincode ? (
                        <Check className="h-4 w-4 text-green-600" />
                      ) : (
                        <Copy className="h-4 w-4 text-gray-600" />
                      )}
                    </motion.button>
                  </div>

                  {/* Location Details */}
                  <div className="space-y-3">
                    <motion.div 
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <MapPin className="h-4 w-4 text-red-500 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-gray-900">{result.area}</p>
                        <p className="text-sm text-gray-600">{result.city}</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      <Building2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">{result.district}</p>
                        <p className="text-sm text-gray-600">District</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      <Globe className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">{result.state}</p>
                        <p className="text-sm text-gray-600">State</p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Address Format */}
                  <motion.div 
                    className="mt-4 p-3 bg-gray-50 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <p className="text-xs text-gray-500 mb-1">Complete Address Format:</p>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {result.area}, {result.city}, {result.district}, {result.state} - {result.pincode}
                    </p>
                  </motion.div>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-primary-600/5 opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {results.length >= 20 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 p-4 bg-primary-50 rounded-lg"
          >
            <p className="text-primary-700">
              Showing first 20 results. Try a more specific search for better results.
            </p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default ResultsSection;