import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SearchSection from '../components/Pincodes/SearchSection';
import ResultsSection from '../components/Pincodes/ResultsSection';
import StatsSection from '../components/Pincodes/StatsSection';
import { PincodeData } from '../components/Pincodes/pincodeData';

function PincodesPage() {
  const [searchResults, setSearchResults] = useState<PincodeData[]>([]);

  const handleResultsChange = (results: PincodeData[]) => {
    setSearchResults(results);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50"
    >
      <SearchSection onResultsChange={handleResultsChange} />
      <ResultsSection results={searchResults} />
      <StatsSection />
    </motion.div>
  );
}

export default PincodesPage;