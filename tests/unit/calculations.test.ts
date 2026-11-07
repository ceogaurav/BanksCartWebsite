import { describe, it, expect } from 'vitest';
import { calculateEMI, calculateTotalAmount, calculateTotalInterest, calculateTax, formatCurrency } from '../../src/utils/calculations';

describe('BanksCart Financial Calculations Engine', () => {
  it('correctly calculates reducing balance EMI', () => {
    // Principal: ₹10,00,000, Rate: 10.5% p.a., Tenure: 60 months (5 years)
    const emi = calculateEMI(1000000, 10.5, 60);
    expect(emi).toBe(21494);
  });

  it('correctly calculates total amount and total interest', () => {
    const emi = 21494;
    const totalAmount = calculateTotalAmount(emi, 60);
    const totalInterest = calculateTotalInterest(totalAmount, 1000000);
    expect(totalAmount).toBe(1289640);
    expect(totalInterest).toBe(289640);
  });

  it('computes New Tax Regime (Section 115BAC) slabs correctly', () => {
    // ₹10,00,000 taxable income under New Regime
    // Slabs: 0-3L: 0, 3-6L: 15k, 6-9L: 30k, 9-10L: 15k = 60k
    const tax = calculateTax(1000000, 'new');
    expect(tax).toBe(60000);
  });

  it('formats currency in Indian format (₹)', () => {
    expect(formatCurrency(1000000)).toMatch(/₹\s*10,00,000/);
  });
});
