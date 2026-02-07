import { useState, useEffect } from 'react';
import { PincodeData } from '../types/pincode';
import pincodeData from '../data/pincodes.json';

export const usePincodeData = () => {
  const [data, setData] = useState<PincodeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // First try to use local data
        if (pincodeData && Array.isArray(pincodeData) && pincodeData.length > 0) {
          setData(pincodeData as PincodeData[]);
          setError(null);
          setLoading(false);
          return;
        }
        
        // Fallback to external API if local data is empty
        const urls = [
          'https://raw.githubusercontent.com/deep5050/indian-pincodes-database/7d8dff175e328d95b3aff6d3c643a99cb758ed7e/data.json',
          'https://raw.githubusercontent.com/deep5050/indian-pincodes-database/master/data.json',
          'https://raw.githubusercontent.com/deep5050/indian-pincodes-database/main/data.json'
        ];
        
        let response;
        
        for (const url of urls) {
          try {
            response = await fetch(url);
            if (response.ok) {
              break;
            }
          } catch (err) {
            console.log('Failed to fetch from:', url);
          }
        }
        
        if (!response || !response.ok) {
          throw new Error(`Failed to fetch pincode data. Please paste the database into src/data/pincodes.json`);
        }
        
        const jsonData = await response.json();
        
        // Handle different data structures
        let processedData = [];
        
        if (Array.isArray(jsonData)) {
          processedData = jsonData;
        } else if (jsonData && typeof jsonData === 'object') {
          // If it's an object, try to find the array of pincode data
          if (jsonData.data && Array.isArray(jsonData.data)) {
            processedData = jsonData.data;
          } else if (jsonData.pincodes && Array.isArray(jsonData.pincodes)) {
            processedData = jsonData.pincodes;
          } else {
            // Convert object values to array if they contain pincode data
            const values = Object.values(jsonData);
            if (values.length > 0 && Array.isArray(values[0])) {
              processedData = values[0];
            } else {
              // Try to convert the object itself to an array
              processedData = Object.values(jsonData).filter(item => 
                item && typeof item === 'object' && ('pincode' in item || 'Pincode' in item)
              );
            }
          }
        }
        
        if (processedData.length === 0) {
          throw new Error('No valid pincode data found in the response');
        }
        
        // Normalize field names to match our interface
        const normalizedData = processedData.map((item: any) => ({
          pincode: item.pincode || item.Pincode || item.PIN || item.pin || '',
          post_office_name: item.post_office_name || item.PostOfficeName || item.office_name || item.name || '',
          district: item.district || item.District || item.DISTRICT || '',
          state: item.state || item.State || item.STATE || '',
          country: item.country || item.Country || 'India',
          latitude: item.latitude || item.Latitude || item.lat || '',
          longitude: item.longitude || item.Longitude || item.lng || item.lon || ''
        }));
        
        setData(normalizedData);
        setError(null);
      } catch (err) {
        console.error('Error loading pincode data:', err);
        setError(err instanceof Error ? err.message : 'An error occurred while loading data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
};