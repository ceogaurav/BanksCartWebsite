import React, { useState, useCallback } from 'react';
import { Calculator, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import { calculateEMI, calculateTotalAmount, calculateTotalInterest, formatCurrency } from '../../utils/calculations';

const PersonalLoanEMI: React.FC = () => {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(60);

  const emi = calculateEMI(principal, rate, tenure);
  const totalAmount = calculateTotalAmount(emi, tenure);
  const totalInterest = calculateTotalInterest(totalAmount, principal);

  const handleSliderChange = useCallback((setter: React.Dispatch<React.SetStateAction<number>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(Number(e.target.value));
    }, []
  );

  // Generate amortization schedule for first 12 months
  const generateAmortizationSchedule = () => {
    const schedule = [];
    let remainingPrincipal = principal;
    const monthlyRate = rate / (12 * 100);

    for (let month = 1; month <= Math.min(12, tenure); month++) {
      const interestPayment = remainingPrincipal * monthlyRate;
      const principalPayment = emi - interestPayment;
      remainingPrincipal -= principalPayment;

      schedule.push({
        month,
        emi,
        principalPayment,
        interestPayment,
        remainingPrincipal: Math.max(0, remainingPrincipal),
      });
    }
    return schedule;
  };

  const amortizationSchedule = generateAmortizationSchedule();

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

export default PersonalLoanEMI;