export interface Bank {
  id: string;
  name: string;
  logo: string;
  establishedYear: number;
  headquarters: string;
  branches: number;
  website: string;
  customerCare: string;
  rating: number;
  features: string[];
}

export interface LoanRate {
  bankId: string;
  loanType: 'personal' | 'home' | 'business' | 'car' | 'education';
  minRate: number;
  maxRate: number;
  processingFee: string;
  maxAmount: string;
  tenure: string;
  lastUpdated: string;
}

export interface LoanType {
  id: string;
  name: string;
  description: string;
  icon: string;
  minAmount: string;
  maxAmount: string;
  tenure: string;
  features: string[];
}

export interface EligibilityProfile {
  personalDetails: {
    name: string;
    age: number;
    email: string;
    phone: string;
    pincode: string;
  };
  professionalDetails: {
    employmentType: 'salaried' | 'self-employed' | 'business';
    monthlyIncome: number;
    workExperience: number;
    companyName: string;
  };
  financialDetails: {
    existingLoans: number;
    creditScore: number;
    bankingRelation: string[];
  };
}

export interface Application {
  id: string;
  bankName: string;
  loanType: string;
  amount: number;
  status: 'submitted' | 'under-review' | 'approved' | 'rejected' | 'disbursed';
  appliedDate: string;
  lastUpdated: string;
  documents: DocumentStatus[];
  timeline: TimelineEvent[];
}

export interface DocumentStatus {
  name: string;
  status: 'pending' | 'submitted' | 'verified' | 'rejected';
  remarks?: string;
}

export interface TimelineEvent {
  date: string;
  status: string;
  description: string;
  completed: boolean;
}

export interface IFSCBranch {
  ifsc: string;
  bank: string;
  branch: string;
  address: string;
  city: string;
  district: string;
  state: string;
  contact?: string;
}