import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Loading Pincode Database
      </h3>
      <p className="text-gray-600 text-center max-w-md">
        We're fetching the latest pincode data from our database. This may take a few moments...
      </p>
    </div>
  );
};