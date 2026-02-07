export interface PincodeData {
  pincode: string;
  post_office_name: string;
  district: string;
  state: string;
  country: string;
  latitude?: string;
  longitude?: string;
}

export interface SearchResult extends PincodeData {
  id: string;
}