import React, { useState, useCallback } from 'react';
import { Calculator, TrendingUp, PieChart, BarChart3 } from 'lucide-react';
import { calculateEMI, calculateTotalAmount, calculateTotalInterest, formatCurrency } from '../../utils/calculations';

// Assuming you have a Button component in common
import Button from '../../components/common/Button';

// Define the props for this component, including the modal open functions
interface PersonalLoanEMIProps {
  openApplyModal?: (loanType?: string) => void;
  openEligibilityModal?: (loanType?: string) => void;
}

const PersonalLoanEMI: React.FC<PersonalLoanEMIProps> = ({ openApplyModal, openEligibilityModal }) => {
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
      <div className="min-h-screen bg-gray-50 py-8 font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">Personal Loan EMI Calculator</h1>

          <div className="bg-white p-8 rounded-xl shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Controls */}
            <div className="space-y-6">
              {/* Principal Loan Amount */}
              <div>
                <label htmlFor="principal" className="block text-lg font-medium text-gray-700 mb-2">
                  Loan Amount: <span className="font-bold text-blue-600">₹{formatCurrency(principal)}</span>
                </label>
                <input
                  type="range"
                  id="principal"
                  min="100000"
                  max="5000000"
                  step="10000"
                  value={principal}
                  onChange={handleSliderChange(setPrincipal)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>₹1 Lakh</span>
                  <span>₹50 Lakh</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div>
                <label htmlFor="rate" className="block text-lg font-medium text-gray-700 mb-2">
                  Interest Rate: <span className="font-bold text-blue-600">{rate}% p.a.</span>
                </label>
                <input
                  type="range"
                  id="rate"
                  min="5"
                  max="25"
                  step="0.1"
                  value={rate}
                  onChange={handleSliderChange(setRate)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>5%</span>
                  <span>25%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div>
                <label htmlFor="tenure" className="block text-lg font-medium text-gray-700 mb-2">
                  Loan Tenure: <span className="font-bold text-blue-600">{tenure} months ({Math.floor(tenure / 12)} years {tenure % 12} months)</span>
                </label>
                <input
                  type="range"
                  id="tenure"
                  min="12"
                  max="120"
                  step="12"
                  value={tenure}
                  onChange={handleSliderChange(setTenure)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>1 Year</span>
                  <span>10 Years</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                {openApplyModal && (
                  <Button
                    onClick={() => openApplyModal('Personal Loan')}
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Apply for Personal Loan
                  </Button>
                )}
                {openEligibilityModal && (
                  <Button
                    onClick={() => openEligibilityModal('Personal Loan')}
                    variant="secondary"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Check Eligibility
                  </Button>
                )}
              </div>
            </div>

            {/* EMI Details and Summary */}
            <div className="bg-blue-50 p-6 rounded-xl shadow-inner space-y-4">
              <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                <Calculator className="h-7 w-7" /> EMI Details
              </h2>
              <div className="flex justify-between items-center py-2 border-b border-blue-200">
                <span className="text-gray-700 text-lg">Monthly EMI:</span>
                <span className="text-blue-700 text-2xl font-bold">₹{formatCurrency(emi)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-blue-200">
                <span className="text-gray-700 text-lg">Total Amount Payable:</span>
                <span className="text-blue-700 text-xl font-bold">₹{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-700 text-lg">Total Interest Payable:</span>
                <span className="text-red-600 text-xl font-bold">₹{formatCurrency(totalInterest)}</span>
              </div>

              {/* Simple Chart Placeholder */}
              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <PieChart className="h-6 w-6" /> Payment Breakdown
                </h3>
                <div className="relative h-48 w-48 mx-auto">
                  {/* This would ideally be a Chart.js or Recharts component */}
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-blue-200">
                    <div className="w-3/4 h-3/4 bg-white rounded-full flex items-center justify-center text-blue-800 font-bold text-lg">
                      {((principal / totalAmount) * 100).toFixed(1)}% Principal
                    </div>
                    {/* Simple visual representation of interest */}
                    <div className="absolute inset-0 rounded-full border-[24px] border-solid border-red-300"
                         style={{
                           clipPath: `polygon(50% 0%, 50% 50%, 100% ${50 + (totalInterest / totalAmount) * 50}%, 100% 0%)` // Crude representation
                         }}
                    ></div>
                  </div>
                </div>
                <p className="text-center text-gray-600 text-sm mt-2">
                  Approximate breakdown of your loan payments.
                </p>
              </div>
            </div>
          </div>

          {/* Amortization Schedule */}
          <div className="mt-12 bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="h-7 w-7" /> Amortization Schedule (First 12 Months)
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMI (₹)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Principal (₹)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest (₹)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining (₹)</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {amortizationSchedule.map((row) => (
                    <tr key={row.month}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.month}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(row.emi)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">{formatCurrency(row.principalPayment)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">{formatCurrency(row.interestPayment)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{formatCurrency(row.remainingPrincipal)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {tenure > 12 && (
              <p className="text-center text-gray-600 text-sm mt-4">
                ... and so on for {tenure - 12} more months.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalLoanEMI;
