import { LoanRate, Application, IFSCBranch } from '../types';

export const loanRates: LoanRate[] = [
  // Personal Loans
  { bankId: 'hdfc', loanType: 'personal', minRate: 10.5, maxRate: 21.0, processingFee: '0.5% - 2.5%', maxAmount: '₹40 Lakh', tenure: '1-7 years', lastUpdated: '2024-01-15' },
  { bankId: 'icici', loanType: 'personal', minRate: 10.75, maxRate: 22.0, processingFee: '0.5% - 3.0%', maxAmount: '₹35 Lakh', tenure: '1-7 years', lastUpdated: '2024-01-15' },
  { bankId: 'axis', loanType: 'personal', minRate: 11.0, maxRate: 22.5, processingFee: '1.0% - 3.0%', maxAmount: '₹30 Lakh', tenure: '1-6 years', lastUpdated: '2024-01-15' },
  { bankId: 'sbi', loanType: 'personal', minRate: 11.5, maxRate: 17.5, processingFee: '0.35% - 1.0%', maxAmount: '₹20 Lakh', tenure: '1-6 years', lastUpdated: '2024-01-15' },
  { bankId: 'kotak', loanType: 'personal', minRate: 10.25, maxRate: 20.0, processingFee: '0.5% - 2.5%', maxAmount: '₹25 Lakh', tenure: '1-7 years', lastUpdated: '2024-01-15' },
  
  // Home Loans
  { bankId: 'sbi', loanType: 'home', minRate: 8.5, maxRate: 9.8, processingFee: '0.35%', maxAmount: '₹10 Crore', tenure: '5-30 years', lastUpdated: '2024-01-15' },
  { bankId: 'hdfc', loanType: 'home', minRate: 8.75, maxRate: 10.0, processingFee: '0.5%', maxAmount: '₹10 Crore', tenure: '5-30 years', lastUpdated: '2024-01-15' },
  { bankId: 'icici', loanType: 'home', minRate: 8.7, maxRate: 9.95, processingFee: '0.5%', maxAmount: '₹10 Crore', tenure: '5-30 years', lastUpdated: '2024-01-15' },
  { bankId: 'axis', loanType: 'home', minRate: 8.8, maxRate: 10.1, processingFee: '0.5%', maxAmount: '₹5 Crore', tenure: '5-30 years', lastUpdated: '2024-01-15' },
  { bankId: 'kotak', loanType: 'home', minRate: 8.6, maxRate: 9.9, processingFee: '0.5%', maxAmount: '₹10 Crore', tenure: '5-30 years', lastUpdated: '2024-01-15' },
  
  // Business Loans
  { bankId: 'hdfc', loanType: 'business', minRate: 11.0, maxRate: 18.5, processingFee: '1.0% - 2.5%', maxAmount: '₹75 Lakh', tenure: '1-5 years', lastUpdated: '2024-01-15' },
  { bankId: 'icici', loanType: 'business', minRate: 11.25, maxRate: 19.0, processingFee: '1.0% - 3.0%', maxAmount: '₹50 Lakh', tenure: '1-5 years', lastUpdated: '2024-01-15' },
  { bankId: 'axis', loanType: 'business', minRate: 11.5, maxRate: 19.5, processingFee: '1.0% - 3.0%', maxAmount: '₹75 Lakh', tenure: '1-5 years', lastUpdated: '2024-01-15' },
  { bankId: 'sbi', loanType: 'business', minRate: 10.75, maxRate: 16.5, processingFee: '0.5% - 1.5%', maxAmount: '₹1 Crore', tenure: '1-7 years', lastUpdated: '2024-01-15' },
  { bankId: 'kotak', loanType: 'business', minRate: 10.5, maxRate: 17.5, processingFee: '1.0% - 2.5%', maxAmount: '₹30 Lakh', tenure: '1-5 years', lastUpdated: '2024-01-15' },
];

export const sampleApplications: Application[] = [
  {
    id: 'APP001',
    bankName: 'HDFC Bank',
    loanType: 'Personal Loan',
    amount: 500000,
    status: 'under-review',
    appliedDate: '2024-01-10',
    lastUpdated: '2024-01-15',
    documents: [
      { name: 'PAN Card', status: 'verified' },
      { name: 'Aadhaar Card', status: 'verified' },
      { name: 'Salary Slips', status: 'submitted' },
      { name: 'Bank Statements', status: 'pending' },
    ],
    timeline: [
      { date: '2024-01-10', status: 'Application Submitted', description: 'Your loan application has been received', completed: true },
      { date: '2024-01-12', status: 'Document Verification', description: 'Documents are being verified', completed: true },
      { date: '2024-01-15', status: 'Credit Assessment', description: 'Credit score and eligibility being assessed', completed: false },
      { date: '', status: 'Approval Decision', description: 'Final approval decision pending', completed: false },
    ],
  },
];

export const sampleIFSCData: IFSCBranch[] = [
  {
    ifsc: 'SBIN0000001',
    bank: 'State Bank of India',
    branch: 'New Delhi Main Branch',
    address: '11, Sansad Marg, New Delhi',
    city: 'New Delhi',
    district: 'New Delhi',
    state: 'Delhi',
    contact: '011-23345000',
  },
  {
    ifsc: 'HDFC0000001',
    bank: 'HDFC Bank',
    branch: 'Mumbai - Fort Branch',
    address: 'Ground Floor, Tulsiani Chambers, 212, Backbay Reclamation, Nariman Point, Mumbai',
    city: 'Mumbai',
    district: 'Mumbai',
    state: 'Maharashtra',
    contact: '022-66316600',
  },
  {
    ifsc: 'ICIC0000001',
    bank: 'ICICI Bank',
    branch: 'Mumbai - Bandra Kurla Complex',
    address: 'ICICI Bank Tower, Near Cyberabad, Bandra Kurla Complex, Mumbai',
    city: 'Mumbai',
    district: 'Mumbai',
    state: 'Maharashtra',
    contact: '022-26535000',
  },
];