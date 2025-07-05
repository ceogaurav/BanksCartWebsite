export const calculateEMI = (principal: number, rate: number, tenure: number): number => {
  const monthlyRate = rate / (12 * 100);
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
               (Math.pow(1 + monthlyRate, tenure) - 1);
  return Math.round(emi);
};

export const calculateTotalAmount = (emi: number, tenure: number): number => {
  return emi * tenure;
};

export const calculateTotalInterest = (totalAmount: number, principal: number): number => {
  return totalAmount - principal;
};

export const calculateTax = (income: number, regime: 'old' | 'new' = 'new'): number => {
  if (regime === 'new') {
    if (income <= 300000) return 0;
    if (income <= 600000) return (income - 300000) * 0.05;
    if (income <= 900000) return 15000 + (income - 600000) * 0.10;
    if (income <= 1200000) return 45000 + (income - 900000) * 0.15;
    if (income <= 1500000) return 90000 + (income - 1200000) * 0.20;
    return 150000 + (income - 1500000) * 0.30;
  } else {
    if (income <= 250000) return 0;
    if (income <= 500000) return (income - 250000) * 0.05;
    if (income <= 1000000) return 12500 + (income - 500000) * 0.20;
    return 112500 + (income - 1000000) * 0.30;
  }
};

export const calculateFDMaturity = (principal: number, rate: number, tenure: number, frequency: number = 4): number => {
  return principal * Math.pow(1 + (rate / 100) / frequency, frequency * tenure);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-IN').format(num);
};