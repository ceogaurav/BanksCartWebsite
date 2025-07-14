import { useState, useMemo } from 'react';
import { PincodeData, SearchResult } from '../types/pincode';

export const useSearch = (data: PincodeData[]) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState<'pincode' | 'location'>('pincode');

  const results = useMemo(() => {
    if (!query.trim() || data.length === 0) return [];

    const searchQuery = query.toLowerCase().trim();
    const filtered = data.filter((item) => {
      if (searchType === 'pincode') {
        // Handle both string and number pincode formats
        const pincode = item.pincode?.toString() || '';
        return pincode.includes(searchQuery);
      } else {
        // Handle location search with null checks
        const postOffice = item.post_office_name?.toLowerCase() || '';
        const district = item.district?.toLowerCase() || '';
        const state = item.state?.toLowerCase() || '';
        
        return (
          postOffice.includes(searchQuery) ||
          district.includes(searchQuery) ||
          state.includes(searchQuery)
        );
      }
    });

    // Limit results to prevent performance issues
    return filtered.slice(0, 50).map((item, index) => ({
      ...item,
      id: `${item.pincode}-${index}`,
    })) as SearchResult[];
  }, [data, query, searchType]);

  const suggestions = useMemo(() => {
    if (!query.trim() || data.length === 0) return [];

    const searchQuery = query.toLowerCase().trim();
    const suggestionSet = new Set<string>();

    data.forEach((item) => {
      if (searchType === 'pincode') {
        const pincode = item.pincode?.toString() || '';
        if (pincode.startsWith(searchQuery)) {
          suggestionSet.add(pincode);
        }
      } else {
        const postOffice = item.post_office_name || '';
        const district = item.district || '';
        const state = item.state || '';
        
        if (postOffice.toLowerCase().includes(searchQuery)) {
          suggestionSet.add(postOffice);
        }
        if (district.toLowerCase().includes(searchQuery)) {
          suggestionSet.add(district);
        }
        if (state.toLowerCase().includes(searchQuery)) {
          suggestionSet.add(state);
        }
      }
    });

    return Array.from(suggestionSet).slice(0, 8);
  }, [data, query, searchType]);

  return {
    query,
    setQuery,
    searchType,
    setSearchType,
    results,
    suggestions,
  };
};