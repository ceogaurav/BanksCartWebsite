import React, { useState, useCallback } from 'react';
import { Receipt, Calculator, TrendingDown, PieChart, FileText } from 'lucide-react';
import { calculateTax, formatCurrency } from '../../utils/calculations';

const IncomeTaxCalculator: React.FC = () => {
  const [income, setIncome] = useState(1000000);
  const [regime, setRegime] = useState<'old' | 'new'>('new');
  const [deductions, setDeductions] = useState({
    section80C: 150000,
    section80D: 25000,
    section24B: 200000,
    section80E: 0,
    section80G: 0,
  });

  const handleSliderChange = useCallback((setter: React.Dispatch<React.SetStateAction<number>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(Number(e.target.value));
    }, []
  );

  const handleDeductionChange = (section: string, value: number) => {
    setDeductions(prev => ({ ...prev, [section]: value }));
  };

  // Calculate tax for both regimes
  const newRegimeTax = calculateTax(income, 'new');
  const oldRegimeTax = calculateTax(income - (regime === 'old' ? Object.values(deductions).reduce((a, b) => a + b, 0) : 0), 'old');
  
  const currentTax = regime === 'new' ? newRegimeTax : oldRegimeTax;
  const taxableIncome = regime === 'new' ? income : income - Object.values(deductions).reduce((a, b) => a + b, 0);
  const effectiveRate = ((currentTax / income) * 100).toFixed(2);
  const marginalRate = income > 1500000 ? 30 : income > 1200000 ? 20 : income > 900000 ? 15 : income > 600000 ? 10 : income > 300000 ? 5 : 0;

  // Tax slabs for new regime
  const newRegimeSlabs = [
    { range: '₹0 - ₹3,00,000', rate: '0%', tax: 0 },
    { range: '₹3,00,001 - ₹6,00,000', rate: '5%', tax: Math.min(15000, Math.max(0, (income - 300000) * 0.05)) },
    { range: '₹6,00,001 - ₹9,00,000', rate: '10%', tax: Math.min(30000, Math.max(0, (income - 600000) * 0.10)) },
    { range: '₹9,00,001 - ₹12,00,000', rate: '15%', tax: Math.min(45000, Math.max(0, (income - 900000) * 0.15)) },
    { range: '₹12,00,001 - ₹15,00,000', rate: '20%', tax: Math.min(60000, Math.max(0, (income - 1200000) * 0.20)) },
    { range: 'Above ₹15,00,000', rate: '30%', tax: Math.max(0, (income - 1500000) * 0.30) },
  ];

  // Tax slabs for old regime
  const oldRegimeSlabs = [
    { range: '₹0 - ₹2,50,000', rate: '0%', tax: 0 },
    { range: '₹2,50,001 - ₹5,00,000', rate: '5%', tax: Math.min(12500, Math.max(0, (taxableIncome - 250000) * 0.05)) },
    { range: '₹5,00,001 - ₹10,00,000', rate: '20%', tax: Math.min(100000, Math.max(0, (taxableIncome - 500000) * 0.20)) },
    { range: 'Above ₹10,00,000', rate: '30%', tax: Math.max(0, (taxableIncome - 1000000) * 0.30) },
  ];

  const currentSlabs = regime === 'new' ? newRegimeSlabs : oldRegimeSlabs;


  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ...existing code... */}
        </div>
      </div>
    </>
  );
};

export default IncomeTaxCalculator;