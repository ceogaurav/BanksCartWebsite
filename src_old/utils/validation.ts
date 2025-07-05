export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const validatePAN = (pan: string): boolean => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
};

export const validatePincode = (pincode: string): boolean => {
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(pincode);
};

export const validateAge = (age: number): boolean => {
  return age >= 18 && age <= 70;
};

export const validateIncome = (income: number): boolean => {
  return income > 0 && income <= 10000000;
};

export const validateLoanAmount = (amount: number, loanType: string): boolean => {
  const limits = {
    personal: { min: 50000, max: 4000000 },
    home: { min: 500000, max: 100000000 },
    business: { min: 100000, max: 7500000 },
    car: { min: 100000, max: 15000000 },
    education: { min: 50000, max: 15000000 },
  };
  
  const limit = limits[loanType as keyof typeof limits];
  return limit ? amount >= limit.min && amount <= limit.max : false;
};