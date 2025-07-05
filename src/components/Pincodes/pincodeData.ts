export interface PincodeData {
  pincode: string;
  state: string;
  district: string;
  city: string;
  area: string;
  type: 'Delivery' | 'Sub Office' | 'Head Office' | 'Branch Office';
}

export const pincodeDatabase: PincodeData[] = [
  // Delhi
  { pincode: '110001', state: 'Delhi', district: 'Central Delhi', city: 'New Delhi', area: 'Connaught Place', type: 'Head Office' },
  { pincode: '110002', state: 'Delhi', district: 'Central Delhi', city: 'New Delhi', area: 'Darya Ganj', type: 'Sub Office' },
  { pincode: '110003', state: 'Delhi', district: 'Central Delhi', city: 'New Delhi', area: 'Kashmere Gate', type: 'Sub Office' },
  { pincode: '110004', state: 'Delhi', district: 'Central Delhi', city: 'New Delhi', area: 'Rashtrapati Bhawan', type: 'Sub Office' },
  { pincode: '110005', state: 'Delhi', district: 'Central Delhi', city: 'New Delhi', area: 'Karol Bagh', type: 'Head Office' },
  { pincode: '110006', state: 'Delhi', district: 'Central Delhi', city: 'New Delhi', area: 'Ramnagar', type: 'Sub Office' },
  { pincode: '110007', state: 'Delhi', district: 'Central Delhi', city: 'New Delhi', area: 'Gole Market', type: 'Sub Office' },
  { pincode: '110008', state: 'Delhi', district: 'Central Delhi', city: 'New Delhi', area: 'Paharganj', type: 'Sub Office' },
  { pincode: '110009', state: 'Delhi', district: 'Central Delhi', city: 'New Delhi', area: 'Minto Road', type: 'Sub Office' },
  { pincode: '110010', state: 'Delhi', district: 'Central Delhi', city: 'New Delhi', area: 'Jhandewalan', type: 'Sub Office' },
  
  // Mumbai
  { pincode: '400001', state: 'Maharashtra', district: 'Mumbai City', city: 'Mumbai', area: 'Fort', type: 'Head Office' },
  { pincode: '400002', state: 'Maharashtra', district: 'Mumbai City', city: 'Mumbai', area: 'Kalbadevi', type: 'Sub Office' },
  { pincode: '400003', state: 'Maharashtra', district: 'Mumbai City', city: 'Mumbai', area: 'Masjid Bunder', type: 'Sub Office' },
  { pincode: '400004', state: 'Maharashtra', district: 'Mumbai City', city: 'Mumbai', area: 'Girgaon', type: 'Sub Office' },
  { pincode: '400005', state: 'Maharashtra', district: 'Mumbai City', city: 'Mumbai', area: 'Ballard Estate', type: 'Sub Office' },
  { pincode: '400006', state: 'Maharashtra', district: 'Mumbai City', city: 'Mumbai', area: 'Malabar Hill', type: 'Sub Office' },
  { pincode: '400007', state: 'Maharashtra', district: 'Mumbai City', city: 'Mumbai', area: 'Grant Road', type: 'Sub Office' },
  { pincode: '400008', state: 'Maharashtra', district: 'Mumbai City', city: 'Mumbai', area: 'Tardeo', type: 'Sub Office' },
  { pincode: '400009', state: 'Maharashtra', district: 'Mumbai City', city: 'Mumbai', area: 'Mazgaon', type: 'Sub Office' },
  { pincode: '400010', state: 'Maharashtra', district: 'Mumbai City', city: 'Mumbai', area: 'Dockyard Road', type: 'Sub Office' },
  
  // Bangalore
  { pincode: '560001', state: 'Karnataka', district: 'Bangalore Urban', city: 'Bangalore', area: 'Chickpet', type: 'Head Office' },
  { pincode: '560002', state: 'Karnataka', district: 'Bangalore Urban', city: 'Bangalore', area: 'Bangalore City', type: 'Sub Office' },
  { pincode: '560003', state: 'Karnataka', district: 'Bangalore Urban', city: 'Bangalore', area: 'Dravidanagar', type: 'Sub Office' },
  { pincode: '560004', state: 'Karnataka', district: 'Bangalore Urban', city: 'Bangalore', area: 'Gavipuram', type: 'Sub Office' },
  { pincode: '560005', state: 'Karnataka', district: 'Bangalore Urban', city: 'Bangalore', area: 'Nagarathpet', type: 'Sub Office' },
  { pincode: '560006', state: 'Karnataka', district: 'Bangalore Urban', city: 'Bangalore', area: 'Chamrajpet', type: 'Sub Office' },
  { pincode: '560007', state: 'Karnataka', district: 'Bangalore Urban', city: 'Bangalore', area: 'Krishnarajapuram', type: 'Sub Office' },
  { pincode: '560008', state: 'Karnataka', district: 'Bangalore Urban', city: 'Bangalore', area: 'Malleshwaram', type: 'Sub Office' },
  { pincode: '560009', state: 'Karnataka', district: 'Bangalore Urban', city: 'Bangalore', area: 'Rajajinagar', type: 'Sub Office' },
  { pincode: '560010', state: 'Karnataka', district: 'Bangalore Urban', city: 'Bangalore', area: 'Dommlur', type: 'Sub Office' },
  
  // Chennai
  { pincode: '600001', state: 'Tamil Nadu', district: 'Chennai', city: 'Chennai', area: 'Parrys', type: 'Head Office' },
  { pincode: '600002', state: 'Tamil Nadu', district: 'Chennai', city: 'Chennai', area: 'Anna Salai', type: 'Sub Office' },
  { pincode: '600003', state: 'Tamil Nadu', district: 'Chennai', city: 'Chennai', area: 'Chintadripet', type: 'Sub Office' },
  { pincode: '600004', state: 'Tamil Nadu', district: 'Chennai', city: 'Chennai', area: 'Mylapore', type: 'Sub Office' },
  { pincode: '600005', state: 'Tamil Nadu', district: 'Chennai', city: 'Chennai', area: 'Triplicane', type: 'Sub Office' },
  { pincode: '600006', state: 'Tamil Nadu', district: 'Chennai', city: 'Chennai', area: 'Chepauk', type: 'Sub Office' },
  { pincode: '600007', state: 'Tamil Nadu', district: 'Chennai', city: 'Chennai', area: 'Vepery', type: 'Sub Office' },
  { pincode: '600008', state: 'Tamil Nadu', district: 'Chennai', city: 'Chennai', area: 'Egmore', type: 'Sub Office' },
  { pincode: '600009', state: 'Tamil Nadu', district: 'Chennai', city: 'Chennai', area: 'Purasawalkam', type: 'Sub Office' },
  { pincode: '600010', state: 'Tamil Nadu', district: 'Chennai', city: 'Chennai', area: 'Kilpauk', type: 'Sub Office' },
  
  // Kolkata
  { pincode: '700001', state: 'West Bengal', district: 'Kolkata', city: 'Kolkata', area: 'Dalhousie', type: 'Head Office' },
  { pincode: '700002', state: 'West Bengal', district: 'Kolkata', city: 'Kolkata', area: 'Burrabazar', type: 'Sub Office' },
  { pincode: '700003', state: 'West Bengal', district: 'Kolkata', city: 'Kolkata', area: 'Bowbazar', type: 'Sub Office' },
  { pincode: '700004', state: 'West Bengal', district: 'Kolkata', city: 'Kolkata', area: 'Bara Bazar', type: 'Sub Office' },
  { pincode: '700005', state: 'West Bengal', district: 'Kolkata', city: 'Kolkata', area: 'Alipore', type: 'Sub Office' },
  { pincode: '700006', state: 'West Bengal', district: 'Kolkata', city: 'Kolkata', area: 'Ballygunge', type: 'Sub Office' },
  { pincode: '700007', state: 'West Bengal', district: 'Kolkata', city: 'Kolkata', area: 'Bhowanipore', type: 'Sub Office' },
  { pincode: '700008', state: 'West Bengal', district: 'Kolkata', city: 'Kolkata', area: 'Gariahat', type: 'Sub Office' },
  { pincode: '700009', state: 'West Bengal', district: 'Kolkata', city: 'Kolkata', area: 'Lake Market', type: 'Sub Office' },
  { pincode: '700010', state: 'West Bengal', district: 'Kolkata', city: 'Kolkata', area: 'New Alipore', type: 'Sub Office' },
  
  // Hyderabad
  { pincode: '500001', state: 'Telangana', district: 'Hyderabad', city: 'Hyderabad', area: 'Afzal Gunj', type: 'Head Office' },
  { pincode: '500002', state: 'Telangana', district: 'Hyderabad', city: 'Hyderabad', area: 'Nampally', type: 'Sub Office' },
  { pincode: '500003', state: 'Telangana', district: 'Hyderabad', city: 'Hyderabad', area: 'Kachiguda', type: 'Sub Office' },
  { pincode: '500004', state: 'Telangana', district: 'Hyderabad', city: 'Hyderabad', area: 'Sultan Bazar', type: 'Sub Office' },
  { pincode: '500005', state: 'Telangana', district: 'Hyderabad', city: 'Hyderabad', area: 'Secunderabad', type: 'Sub Office' },
  { pincode: '500006', state: 'Telangana', district: 'Hyderabad', city: 'Hyderabad', area: 'Himayatnagar', type: 'Sub Office' },
  { pincode: '500007', state: 'Telangana', district: 'Hyderabad', city: 'Hyderabad', area: 'Ameerpet', type: 'Sub Office' },
  { pincode: '500008', state: 'Telangana', district: 'Hyderabad', city: 'Hyderabad', area: 'Somajiguda', type: 'Sub Office' },
  { pincode: '500009', state: 'Telangana', district: 'Hyderabad', city: 'Hyderabad', area: 'Begumpet', type: 'Sub Office' },
  { pincode: '500010', state: 'Telangana', district: 'Hyderabad', city: 'Hyderabad', area: 'Domalguda', type: 'Sub Office' },
  
  // Pune
  { pincode: '411001', state: 'Maharashtra', district: 'Pune', city: 'Pune', area: 'Pune City', type: 'Head Office' },
  { pincode: '411002', state: 'Maharashtra', district: 'Pune', city: 'Pune', area: 'Ganeshpeth', type: 'Sub Office' },
  { pincode: '411003', state: 'Maharashtra', district: 'Pune', city: 'Pune', area: 'Pune Cantonment', type: 'Sub Office' },
  { pincode: '411004', state: 'Maharashtra', district: 'Pune', city: 'Pune', area: 'Pune University', type: 'Sub Office' },
  { pincode: '411005', state: 'Maharashtra', district: 'Pune', city: 'Pune', area: 'Shivajinagar', type: 'Sub Office' },
  { pincode: '411006', state: 'Maharashtra', district: 'Pune', city: 'Pune', area: 'Badshahpur', type: 'Sub Office' },
  { pincode: '411007', state: 'Maharashtra', district: 'Pune', city: 'Pune', area: 'Aundh', type: 'Sub Office' },
  { pincode: '411008', state: 'Maharashtra', district: 'Pune', city: 'Pune', area: 'Shivaji Nagar', type: 'Sub Office' },
  { pincode: '411009', state: 'Maharashtra', district: 'Pune', city: 'Pune', area: 'Model Colony', type: 'Sub Office' },
  { pincode: '411010', state: 'Maharashtra', district: 'Pune', city: 'Pune', area: 'Gultekdi', type: 'Sub Office' },
  
  // Ahmedabad
  { pincode: '380001', state: 'Gujarat', district: 'Ahmedabad', city: 'Ahmedabad', area: 'Ellis Bridge', type: 'Head Office' },
  { pincode: '380002', state: 'Gujarat', district: 'Ahmedabad', city: 'Ahmedabad', area: 'Lal Darwaja', type: 'Sub Office' },
  { pincode: '380003', state: 'Gujarat', district: 'Ahmedabad', city: 'Ahmedabad', area: 'Maninagar', type: 'Sub Office' },
  { pincode: '380004', state: 'Gujarat', district: 'Ahmedabad', city: 'Ahmedabad', area: 'Navrangpura', type: 'Sub Office' },
  { pincode: '380005', state: 'Gujarat', district: 'Ahmedabad', city: 'Ahmedabad', area: 'Raikhad', type: 'Sub Office' },
  { pincode: '380006', state: 'Gujarat', district: 'Ahmedabad', city: 'Ahmedabad', area: 'Narol', type: 'Sub Office' },
  { pincode: '380007', state: 'Gujarat', district: 'Ahmedabad', city: 'Ahmedabad', area: 'Paldi', type: 'Sub Office' },
  { pincode: '380008', state: 'Gujarat', district: 'Ahmedabad', city: 'Ahmedabad', area: 'Vastrapur', type: 'Sub Office' },
  { pincode: '380009', state: 'Gujarat', district: 'Ahmedabad', city: 'Ahmedabad', area: 'Ambawadi', type: 'Sub Office' },
  { pincode: '380010', state: 'Gujarat', district: 'Ahmedabad', city: 'Ahmedabad', area: 'Usmanpura', type: 'Sub Office' },
  
  // Jaipur
  { pincode: '302001', state: 'Rajasthan', district: 'Jaipur', city: 'Jaipur', area: 'Jaipur City', type: 'Head Office' },
  { pincode: '302002', state: 'Rajasthan', district: 'Jaipur', city: 'Jaipur', area: 'Johari Bazar', type: 'Sub Office' },
  { pincode: '302003', state: 'Rajasthan', district: 'Jaipur', city: 'Jaipur', area: 'Sanganer', type: 'Sub Office' },
  { pincode: '302004', state: 'Rajasthan', district: 'Jaipur', city: 'Jaipur', area: 'Civil Lines', type: 'Sub Office' },
  { pincode: '302005', state: 'Rajasthan', district: 'Jaipur', city: 'Jaipur', area: 'Ridmalsar', type: 'Sub Office' },
  { pincode: '302006', state: 'Rajasthan', district: 'Jaipur', city: 'Jaipur', area: 'Malviya Nagar', type: 'Sub Office' },
  { pincode: '302007', state: 'Rajasthan', district: 'Jaipur', city: 'Jaipur', area: 'Shyam Nagar', type: 'Sub Office' },
  { pincode: '302008', state: 'Rajasthan', district: 'Jaipur', city: 'Jaipur', area: 'Bapu Nagar', type: 'Sub Office' },
  { pincode: '302009', state: 'Rajasthan', district: 'Jaipur', city: 'Jaipur', area: 'Gopalpura', type: 'Sub Office' },
  { pincode: '302010', state: 'Rajasthan', district: 'Jaipur', city: 'Jaipur', area: 'Jhotwara', type: 'Sub Office' },
  
  // Lucknow
  { pincode: '226001', state: 'Uttar Pradesh', district: 'Lucknow', city: 'Lucknow', area: 'Hazratganj', type: 'Head Office' },
  { pincode: '226002', state: 'Uttar Pradesh', district: 'Lucknow', city: 'Lucknow', area: 'Aminabad', type: 'Sub Office' },
  { pincode: '226003', state: 'Uttar Pradesh', district: 'Lucknow', city: 'Lucknow', area: 'Alambagh', type: 'Sub Office' },
  { pincode: '226004', state: 'Uttar Pradesh', district: 'Lucknow', city: 'Lucknow', area: 'Chowk', type: 'Sub Office' },
  { pincode: '226005', state: 'Uttar Pradesh', district: 'Lucknow', city: 'Lucknow', area: 'Thakurganj', type: 'Sub Office' },
  { pincode: '226006', state: 'Uttar Pradesh', district: 'Lucknow', city: 'Lucknow', area: 'Mahanagar', type: 'Sub Office' },
  { pincode: '226007', state: 'Uttar Pradesh', district: 'Lucknow', city: 'Lucknow', area: 'Rajajipuram', type: 'Sub Office' },
  { pincode: '226008', state: 'Uttar Pradesh', district: 'Lucknow', city: 'Lucknow', area: 'Indira Nagar', type: 'Sub Office' },
  { pincode: '226009', state: 'Uttar Pradesh', district: 'Lucknow', city: 'Lucknow', area: 'Aliganj', type: 'Sub Office' },
  { pincode: '226010', state: 'Uttar Pradesh', district: 'Lucknow', city: 'Lucknow', area: 'Gomti Nagar', type: 'Sub Office' },
];

export const getUniqueStates = (): string[] => {
  return [...new Set(pincodeDatabase.map(item => item.state))].sort();
};

export const getDistrictsByState = (state: string): string[] => {
  return [...new Set(pincodeDatabase.filter(item => item.state === state).map(item => item.district))].sort();
};

export const getCitiesByDistrict = (state: string, district: string): string[] => {
  return [...new Set(pincodeDatabase.filter(item => item.state === state && item.district === district).map(item => item.city))].sort();
};

export const searchPincodes = (query: string): PincodeData[] => {
  const searchTerm = query.toLowerCase().trim();
  if (!searchTerm) return [];
  
  return pincodeDatabase.filter(item => 
    item.pincode.includes(searchTerm) ||
    item.state.toLowerCase().includes(searchTerm) ||
    item.district.toLowerCase().includes(searchTerm) ||
    item.city.toLowerCase().includes(searchTerm) ||
    item.area.toLowerCase().includes(searchTerm)
  ).slice(0, 20); // Limit results for performance
};