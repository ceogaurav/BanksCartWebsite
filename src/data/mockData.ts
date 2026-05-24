export const loanRates = [
  // Personal Loans
  { bankId: 'hdfc', loanType: 'personal', minRate: 10.5, maxRate: 21.0, processingFee: '0.5% - 2.5%', maxAmount: '₹40 Lakh', tenure: '1-7 years', lastUpdated: '2026-04-15' },
  { bankId: 'icici', loanType: 'personal', minRate: 10.75, maxRate: 22.0, processingFee: '0.5% - 3.0%', maxAmount: '₹35 Lakh', tenure: '1-7 years', lastUpdated: '2026-04-15' },
  { bankId: 'axis', loanType: 'personal', minRate: 11.0, maxRate: 22.5, processingFee: '1.0% - 3.0%', maxAmount: '₹30 Lakh', tenure: '1-6 years', lastUpdated: '2026-04-15' },
  { bankId: 'sbi', loanType: 'personal', minRate: 11.15, maxRate: 17.5, processingFee: '0.35% - 1.0%', maxAmount: '₹20 Lakh', tenure: '1-6 years', lastUpdated: '2026-04-15' },
  { bankId: 'kotak', loanType: 'personal', minRate: 10.25, maxRate: 20.0, processingFee: '0.5% - 2.5%', maxAmount: '₹25 Lakh', tenure: '1-7 years', lastUpdated: '2026-04-15' },
  { bankId: 'pnb', loanType: 'personal', minRate: 11.25, maxRate: 18.0, processingFee: '0.5% - 2.0%', maxAmount: '₹15 Lakh', tenure: '1-5 years', lastUpdated: '2026-04-15' },
  
  // Home Loans
  { bankId: 'sbi', loanType: 'home', minRate: 8.4, maxRate: 9.8, processingFee: '0.35%', maxAmount: '₹10 Crore', tenure: '5-30 years', lastUpdated: '2026-04-15' },
  { bankId: 'hdfc', loanType: 'home', minRate: 8.5, maxRate: 10.0, processingFee: '0.5%', maxAmount: '₹10 Crore', tenure: '5-30 years', lastUpdated: '2026-04-15' },
  { bankId: 'icici', loanType: 'home', minRate: 8.6, maxRate: 9.95, processingFee: '0.5%', maxAmount: '₹10 Crore', tenure: '5-30 years', lastUpdated: '2026-04-15' },
  { bankId: 'axis', loanType: 'home', minRate: 8.75, maxRate: 10.1, processingFee: '0.5%', maxAmount: '₹5 Crore', tenure: '5-30 years', lastUpdated: '2026-04-15' },
  { bankId: 'kotak', loanType: 'home', minRate: 8.6, maxRate: 9.9, processingFee: '0.5%', maxAmount: '₹10 Crore', tenure: '5-30 years', lastUpdated: '2026-04-15' },
  { bankId: 'pnb', loanType: 'home', minRate: 8.55, maxRate: 9.75, processingFee: '0.35%', maxAmount: '₹5 Crore', tenure: '5-30 years', lastUpdated: '2026-04-15' },
  
  // Business Loans
  { bankId: 'hdfc', loanType: 'business', minRate: 11.0, maxRate: 18.5, processingFee: '1.0% - 2.5%', maxAmount: '₹75 Lakh', tenure: '1-5 years', lastUpdated: '2026-04-15' },
  { bankId: 'icici', loanType: 'business', minRate: 11.25, maxRate: 19.0, processingFee: '1.0% - 3.0%', maxAmount: '₹50 Lakh', tenure: '1-5 years', lastUpdated: '2026-04-15' },
  { bankId: 'axis', loanType: 'business', minRate: 11.5, maxRate: 19.5, processingFee: '1.0% - 3.0%', maxAmount: '₹75 Lakh', tenure: '1-5 years', lastUpdated: '2026-04-15' },
  { bankId: 'sbi', loanType: 'business', minRate: 10.75, maxRate: 16.5, processingFee: '0.5% - 1.5%', maxAmount: '₹1 Crore', tenure: '1-7 years', lastUpdated: '2026-04-15' },
  { bankId: 'kotak', loanType: 'business', minRate: 10.5, maxRate: 17.5, processingFee: '1.0% - 2.5%', maxAmount: '₹30 Lakh', tenure: '1-5 years', lastUpdated: '2026-04-15' },
  
  // Car Loans
  { bankId: 'sbi', loanType: 'car', minRate: 8.9, maxRate: 10.5, processingFee: '0.25%', maxAmount: '₹50 Lakh', tenure: '1-7 years', lastUpdated: '2026-04-15' },
  { bankId: 'hdfc', loanType: 'car', minRate: 8.95, maxRate: 11.0, processingFee: '0.5%', maxAmount: '₹75 Lakh', tenure: '1-7 years', lastUpdated: '2026-04-15' },
  { bankId: 'icici', loanType: 'car', minRate: 9.25, maxRate: 11.5, processingFee: '0.5%', maxAmount: '₹75 Lakh', tenure: '1-7 years', lastUpdated: '2026-04-15' },
  { bankId: 'axis', loanType: 'car', minRate: 9.1, maxRate: 11.25, processingFee: '0.5%', maxAmount: '₹60 Lakh', tenure: '1-7 years', lastUpdated: '2026-04-15' },
  { bankId: 'pnb', loanType: 'car', minRate: 9.05, maxRate: 10.75, processingFee: '0.25%', maxAmount: '₹40 Lakh', tenure: '1-7 years', lastUpdated: '2026-04-15' },

  // Education Loans
  { bankId: 'sbi', loanType: 'education', minRate: 8.55, maxRate: 11.25, processingFee: 'Nil', maxAmount: '₹1.5 Crore', tenure: '5-15 years', lastUpdated: '2026-04-15' },
  { bankId: 'hdfc', loanType: 'education', minRate: 9.55, maxRate: 12.5, processingFee: '1.0%', maxAmount: '₹1 Crore', tenure: '5-15 years', lastUpdated: '2026-04-15' },
  { bankId: 'icici', loanType: 'education', minRate: 9.5, maxRate: 12.0, processingFee: '1.0%', maxAmount: '₹1 Crore', tenure: '5-15 years', lastUpdated: '2026-04-15' },
];