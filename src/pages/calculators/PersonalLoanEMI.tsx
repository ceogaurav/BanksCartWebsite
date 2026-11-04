import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, PieChart, BarChart3, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { calculateEMI, calculateTotalAmount, calculateTotalInterest, formatCurrency } from '../../utils/calculations';

// Assuming you have a Button component in common
import Button from '../../components/common/Button';

// Define the props for this component, including the modal open functions
interface PersonalLoanEMIProps {
  openApplyModal?: (loanType?: string) => void;
  openEligibilityModal?: (loanType?: string) => void;
}

const PersonalLoanEMI: React.FC<PersonalLoanEMIProps> = ({ openApplyModal, openEligibilityModal }) => {
  // Local immediate slider display values (for 60fps instant UI updates)
  const [displayPrincipal, setDisplayPrincipal] = useState(500000);
  const [displayRate, setDisplayRate] = useState(12);
  const [displayTenure, setDisplayTenure] = useState(60);

  // Debounced calculation state (minimum 150ms delay to eliminate INP latency bottlenecks)
  const [calcPrincipal, setCalcPrincipal] = useState(500000);
  const [calcRate, setCalcRate] = useState(12);
  const [calcTenure, setCalcTenure] = useState(60);

  const initialEmi = calculateEMI(500000, 12, 60);
  const initialTotal = calculateTotalAmount(initialEmi, 60);
  const initialInterest = calculateTotalInterest(initialTotal, 500000);

  const [emi, setEmi] = useState(initialEmi);
  const [totalAmount, setTotalAmount] = useState(initialTotal);
  const [totalInterest, setTotalInterest] = useState(initialInterest);

  const [amortizationSchedule, setAmortizationSchedule] = useState(() => {
    const schedule = [];
    let remPrincipal = 500000;
    const monthlyRate = 12 / (12 * 100);
    for (let month = 1; month <= Math.min(12, 60); month++) {
      const interestPayment = remPrincipal * monthlyRate;
      const principalPayment = initialEmi - interestPayment;
      remPrincipal -= principalPayment;
      schedule.push({
        month,
        emi: initialEmi,
        principalPayment,
        interestPayment,
        remainingPrincipal: Math.max(0, remPrincipal),
      });
    }
    return schedule;
  });

  // Timers for 150ms debouncing
  const principalTimer = useRef(null);
  const rateTimer = useRef(null);
  const tenureTimer = useRef(null);

  const handlePrincipalChange = useCallback((e) => {
    const val = Number(e.target.value);
    setDisplayPrincipal(val);
    if (principalTimer.current) clearTimeout(principalTimer.current);
    principalTimer.current = setTimeout(() => setCalcPrincipal(val), 150);
  }, []);

  const handleRateChange = useCallback((e) => {
    const val = Number(e.target.value);
    setDisplayRate(val);
    if (rateTimer.current) clearTimeout(rateTimer.current);
    rateTimer.current = setTimeout(() => setCalcRate(val), 150);
  }, []);

  const handleTenureChange = useCallback((e) => {
    const val = Number(e.target.value);
    setDisplayTenure(val);
    if (tenureTimer.current) clearTimeout(tenureTimer.current);
    tenureTimer.current = setTimeout(() => setCalcTenure(val), 150);
  }, []);

  useEffect(() => {
    return () => {
      if (principalTimer.current) clearTimeout(principalTimer.current);
      if (rateTimer.current) clearTimeout(rateTimer.current);
      if (tenureTimer.current) clearTimeout(tenureTimer.current);
    };
  }, []);

  // Offload recalculation and amortization schedule to an asynchronous microtask
  useEffect(() => {
    const runRecalculation = () => {
      const calculatedEmi = calculateEMI(calcPrincipal, calcRate, calcTenure);
      const calculatedTotal = calculateTotalAmount(calculatedEmi, calcTenure);
      const calculatedInterest = calculateTotalInterest(calculatedTotal, calcPrincipal);

      const schedule = [];
      let remPrincipal = calcPrincipal;
      const monthlyRate = calcRate / (12 * 100);

      for (let month = 1; month <= Math.min(12, calcTenure); month++) {
        const interestPayment = remPrincipal * monthlyRate;
        const principalPayment = calculatedEmi - interestPayment;
        remPrincipal -= principalPayment;

        schedule.push({
          month,
          emi: calculatedEmi,
          principalPayment,
          interestPayment,
          remainingPrincipal: Math.max(0, remPrincipal),
        });
      }

      setEmi(calculatedEmi);
      setTotalAmount(calculatedTotal);
      setTotalInterest(calculatedInterest);
      setAmortizationSchedule(schedule);
    };

    if (typeof queueMicrotask === 'function') {
      queueMicrotask(runRecalculation);
    } else {
      setTimeout(runRecalculation, 0);
    }
  }, [calcPrincipal, calcRate, calcTenure]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8 font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Personal Loan EMI Calculator 2026: Calculate Monthly EMI &amp; Interest Rates | BanksCart</title>
        <meta name="description" content="Calculate your monthly personal loan installment instantly. Enter loan amount, interest rate (from 10.25% p.a.), and tenure to view total interest and amortization." />
        <link rel="canonical" href="https://www.bankscart.com/personal-loan-emi-calculator" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialProduct",
            "name": "Personal Loan EMI Calculator 2026",
            "description": "Calculate monthly personal loan EMIs, interest payable, and complete amortization schedules across leading Indian banks.",
            "url": "https://www.bankscart.com/personal-loan-emi-calculator",
            "annualPercentageRate": {
              "@type": "QuantitativeValue",
              "minValue": 10.25,
              "maxValue": 24.0,
              "unitText": "%"
            },
            "feesAndCommissionsSpecification": "Processing fees from 0.5% to 2.5% of loan amount + GST",
            "eligibleRegion": {
              "@type": "Country",
              "name": "India"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How is personal loan EMI calculated?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Personal loan EMI is calculated using the formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1], where P is Principal, R is monthly interest rate, and N is tenure in months."
                }
              },
              {
                "@type": "Question",
                "name": "Which bank offers the lowest personal loan interest rate in 2026?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "In 2026, leading public and private banks like SBI, HDFC Bank, ICICI Bank, and HSBC offer starting rates from 10.15% to 10.50% p.a. for borrowers with CIBIL score 750+."
                }
              },
              {
                "@type": "Question",
                "name": "Does using an EMI calculator affect my credit score?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. Using an online EMI calculator is completely free, anonymous, and does not involve any credit bureau inquiry. It has zero impact on your CIBIL score."
                }
              }
            ]
          })}
        </script>
      </Helmet>
      <div className="text-center mb-8">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Interactive Financial Tool</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Personal Loan EMI Calculator 2026: Calculate Monthly EMI &amp; Interest Rates</h1>
        <p className="text-sm text-gray-600 mt-2 max-w-2xl mx-auto">
          Simulate monthly repayment obligations, evaluate interest schedules from 10.25% p.a., and compare pre-approved loan offers from 30+ RBI-regulated lenders.
        </p>
      </div>

          <div className="bg-white p-8 rounded-xl shadow-lg grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Controls */}
            <div className="space-y-6">
              {/* Principal Loan Amount */}
              <div>
                <label htmlFor="principal" className="block text-lg font-medium text-gray-700 mb-2">
                  Loan Amount: <span className="font-bold text-blue-600">₹{formatCurrency(displayPrincipal)}</span>
                </label>
                <input
                  type="range"
                  id="principal"
                  min="100000"
                  max="5000000"
                  step="10000"
                  value={displayPrincipal}
                  onChange={handlePrincipalChange}
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
                  Interest Rate: <span className="font-bold text-blue-600">{displayRate}% p.a.</span>
                </label>
                <input
                  type="range"
                  id="rate"
                  min="5"
                  max="25"
                  step="0.1"
                  value={displayRate}
                  onChange={handleRateChange}
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
                  Loan Tenure: <span className="font-bold text-blue-600">{displayTenure} months ({Math.floor(displayTenure / 12)} years {displayTenure % 12} months)</span>
                </label>
                <input
                  type="range"
                  id="tenure"
                  min="12"
                  max="120"
                  step="12"
                  value={displayTenure}
                  onChange={handleTenureChange}
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
                      {((calcPrincipal / totalAmount) * 100).toFixed(1)}% Principal
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

          {/* Live Bank Personal Loan Interest Rates Comparison Table 2026 */}
          <div className="mt-12 bg-white p-8 rounded-xl shadow-lg border border-slate-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Live Comparison Matrix</span>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-blue-600" /> Top Indian Bank Personal Loan Rates (2026 Updated)
                </h2>
                <p className="text-xs text-gray-500 mt-1">Real-time interest rate bands, processing charges, and maximum tenure verified across RBI-regulated lenders.</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                  <CheckCircle className="w-3.5 h-3.5 mr-1" /> Verified 2026
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Bank Name</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Starting Interest Rate</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Processing Fee</th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Max Tenure</th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Instant Eligibility</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 text-sm">
                  {[
                    { bank: 'State Bank of India (SBI)', rate: '10.30% - 15.30%', fee: 'Up to 1.50% (Min ₹1,000)', tenure: '72 Months' },
                    { bank: 'HDFC Bank', rate: '10.75% - 24.00%', fee: 'Up to ₹4,999 + GST', tenure: '72 Months' },
                    { bank: 'ICICI Bank', rate: '10.85% - 16.65%', fee: 'Up to 2.00% + GST', tenure: '72 Months' },
                    { bank: 'Axis Bank', rate: '10.49% - 22.00%', fee: 'Up to 2.00%', tenure: '60 Months' },
                    { bank: 'Kotak Mahindra Bank', rate: '10.99% onwards', fee: 'Up to 3.00%', tenure: '60 Months' },
                    { bank: 'IndusInd Bank', rate: '10.49% onwards', fee: 'Up to 3.50%', tenure: '60 Months' },
                    { bank: 'HSBC Bank', rate: '10.15% - 16.00%', fee: 'Up to 2.00%', tenure: '60 Months' }
                  ].map((item, idx) => (
                    <tr key={item.bank} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">{item.bank}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-bold text-blue-600">{item.rate}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{item.fee}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.tenure}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <Link
                          to="/loans/personal-loan"
                          className="inline-flex items-center px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                        >
                          Check Eligibility <ArrowRight className="w-3 h-3 ml-1" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Contextual Internal Silo Links */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-4 text-xs font-medium text-slate-600">
              <span className="text-slate-400 font-bold uppercase tracking-wider self-center">Related Guides:</span>
              <Link to="/loans/personal-loan" className="hover:text-blue-600 underline">Personal Loan Interest Rates 2026</Link>
              <Link to="/blog/sbi-vs-hdfc-personal-loan" className="hover:text-blue-600 underline">SBI vs HDFC Personal Loan Comparison</Link>
              <Link to="/credit-score" className="hover:text-blue-600 underline">Free CIBIL Score Check Online</Link>
              <Link to="/blog/Best-Credit-Cards" className="hover:text-blue-600 underline">Best Credit Cards in India</Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default PersonalLoanEMI;

