import React, { useState, useEffect } from "react";
import ApplyButton from '../components/common/ApplyButton';

// --- Used Car Loan Page ---
const UsedCarLoanPage = ({ openApplyModal, openEligibilityModal, openCibilModal }) => {
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(12.0);
  const [tenure, setTenure] = useState(5);
  const [emiResult, setEmiResult] = useState({ emi: 0, totalInterest: 0, totalAmount: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculateEMI = (e) => {
    if (e) e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => {
      const principal = Number(loanAmount);
      const annualRate = Number(interestRate);
      const years = Number(tenure);
      if (!principal || !annualRate || !years) {
        setEmiResult({ emi: 0, totalInterest: 0, totalAmount: 0 });
        setError("Please enter valid values for all fields.");
        setLoading(false);
        return;
      }
      const n = years * 12;
      const r = annualRate / 12 / 100;
      const emi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalAmount = emi * n;
      const totalInterest = totalAmount - principal;
      setEmiResult({
        emi: Math.round(emi),
        totalInterest: Math.round(totalInterest),
        totalAmount: Math.round(totalAmount),
      });
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    calculateEMI();
    // eslint-disable-next-line
  }, [loanAmount, interestRate, tenure]);

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-['Inter','Poppins',sans-serif] text-[#374151]">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">
              Get Your Dream Car Today with <span className="text-orange-400">Used Car Loan</span>
            </h1>
            <div className="mb-8 space-y-3">
              <div className="flex items-center"><span className="mr-2">✓</span>Interest rates starting from 8.8% p.a.</div>
              <div className="flex items-center"><span className="mr-2">✓</span>Loan amount up to ₹75 Lakhs</div>
              <div className="flex items-center"><span className="mr-2">✓</span>Quick approval in 2 hours</div>
              <div className="flex items-center"><span className="mr-2">✓</span>Minimal documentation required</div>
            </div>
            {/* Replace the existing button with ApplyButton */}
            {openApplyModal && (
              <ApplyButton
                  loanType="Used Car Loan"  // Consistent loan type name
                  openApplyModal={openApplyModal}
                  variant="primary"
                  size="lg"
                  className="bg-[#ff4444] text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-red-600 transition"
              >Get Instant Approval</ApplyButton>
            )}
          </div>
          <div className="bg-white rounded-lg p-8 shadow-xl text-center">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Check Your Loan Eligibility</h3>
            <p className="text-gray-600 mb-6">Get a quick assessment of your eligibility for a used car loan in just a few steps.</p>
            <button
              onClick={() => openEligibilityModal('Used Car Loan')}
              className="bg-[#1e3a8a] text-white w-full py-3 rounded-full font-bold hover:bg-blue-800 transition-colors"
            >
              Check Eligibility Now
            </button>
            <p className="text-xs text-gray-500 mt-3">Checking eligibility will not impact your credit score.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Key Features and Benefits of Used Car Loans</h2>
            <p className="text-xl text-gray-600">Why choose our used car loan for your next vehicle purchase</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition">
              <div className="mb-4 flex justify-center">
                {/* Low EMI SVG */}
                <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="32" cy="32" r="30" fill="#E0F2FE" />
                  <path d="M20 44c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#1e3a8a" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="32" cy="28" r="4" fill="#1e3a8a" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Lower EMIs</h3>
              <p className="text-gray-600">The loan amount for used cars is typically lower compared to new car loans, resulting in affordable monthly EMIs that fit your budget.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition">
              <div className="mb-4 flex justify-center">
                {/* Flexible Tenure SVG */}
                <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="8" y="16" width="48" height="32" rx="8" fill="#FDE68A" />
                  <path d="M16 32h32" stroke="#1e3a8a" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="16" cy="32" r="3" fill="#1e3a8a" />
                  <circle cx="48" cy="32" r="3" fill="#1e3a8a" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Flexible Repayment Tenure</h3>
              <p className="text-gray-600">Choose from repayment tenures up to 7 years, giving you the flexibility to manage your finances effectively.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition">
              <div className="mb-4 flex justify-center">
                {/* 100% Financing SVG */}
                <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="12" y="24" width="40" height="24" rx="8" fill="#BBF7D0" />
                  <path d="M20 36h24" stroke="#1e3a8a" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="20" cy="48" r="3" fill="#1e3a8a" />
                  <circle cx="44" cy="48" r="3" fill="#1e3a8a" />
                  <rect x="24" y="16" width="16" height="8" rx="4" fill="#1e3a8a" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Up to 100% Financing</h3>
              <p className="text-gray-600">Get complete financing for your used car purchase from select banks and NBFCs with minimal down payment.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition">
              <div className="mb-4 flex justify-center">
                {/* Online Process SVG */}
                <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="12" y="16" width="40" height="32" rx="8" fill="#C7D2FE" />
                  <rect x="20" y="24" width="24" height="16" rx="4" fill="#1e3a8a" />
                  <circle cx="32" cy="40" r="2" fill="#C7D2FE" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Simple Online Process</h3>
              <p className="text-gray-600">Apply for your used car loan online with our streamlined digital process that saves time and effort.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition">
              <div className="mb-4 flex justify-center">
                {/* Lower Insurance SVG */}
                <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="32" cy="48" rx="20" ry="8" fill="#FECACA" />
                  <rect x="20" y="20" width="24" height="20" rx="6" fill="#1e3a8a" />
                  <path d="M32 28v8" stroke="#FECACA" strokeWidth="3" strokeLinecap="round"/>
                  <circle cx="32" cy="36" r="2" fill="#FECACA" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Lower Insurance Costs</h3>
              <p className="text-gray-600">Insurance costs and depreciation rates are significantly lower for used cars compared to new vehicles.</p>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition">
              <div className="mb-4 flex justify-center">
                {/* Minimal Paperwork SVG */}
                <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="16" y="12" width="32" height="40" rx="6" fill="#FDE68A" />
                  <rect x="24" y="20" width="16" height="4" rx="2" fill="#1e3a8a" />
                  <rect x="24" y="28" width="16" height="4" rx="2" fill="#1e3a8a" />
                  <rect x="24" y="36" width="10" height="4" rx="2" fill="#1e3a8a" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Minimal Documentation</h3>
              <p className="text-gray-600">Submit minimal paperwork with our simplified documentation process for faster loan approval.</p>
            </div>
          </div>
          <div className="text-center">
            <img src="used-car-loan-infographic.jpg" alt="Used Car Loan Benefits" className="mx-auto max-w-4xl w-full" />
          </div>
        </div>
      </section>

      {/* Lender Comparison Table */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Top Lenders Offering Used Car Loans</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Lender</th>
                  <th className="px-6 py-4 text-left">Interest Rate</th>
                  <th className="px-6 py-4 text-left">Repayment Tenure</th>
                  <th className="px-6 py-4 text-left">Processing Fee</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center"><img src="/images/sbi.png" alt="SBI" className="w-8 h-8 mr-3" /><span className="font-semibold">State Bank of India</span></td>
                  <td className="px-6 py-4">11.75% - 15.25% p.a.</td>
                  <td className="px-6 py-4">5 years (maximum)</td>
                  <td className="px-6 py-4">0.50% of loan amount</td>
                  <td className="px-6 py-4 text-center">
                    {openApplyModal && <ApplyButton loanType="Used Car Loan - State Bank of India" openApplyModal={openApplyModal} variant="primary" size="md" className="bg-[#ff4444] text-white px-4 py-2 rounded-full font-semibold">Apply Now</ApplyButton>}
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center"><img src="/images/tata.png" alt="Tata Capital" className="w-8 h-8 mr-3" /><span className="font-semibold">Tata Capital</span></td>
                  <td className="px-6 py-4">10.75% p.a. onwards</td>
                  <td className="px-6 py-4">1 year to 5 years</td>
                  <td className="px-6 py-4">Up to 3% of loan amount</td>
                  <td className="px-6 py-4 text-center">
                    {openApplyModal && <ApplyButton loanType="Used Car Loan - Tata Capital" openApplyModal={openApplyModal} variant="primary" size="md" className="bg-[#ff4444] text-white px-4 py-2 rounded-full font-semibold">Apply Now</ApplyButton>}
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center"><img src="/images/hdfc.png" alt="HDFC Bank" className="w-8 h-8 mr-3" /><span className="font-semibold">HDFC Bank</span></td>
                  <td className="px-6 py-4">13.75% p.a. onwards</td>
                  <td className="px-6 py-4">7 years</td>
                  <td className="px-6 py-4">Up to 2.5% of loan amount</td>
                  <td className="px-6 py-4 text-center">
                    {openApplyModal && <ApplyButton loanType="Used Car Loan - HDFC Bank" openApplyModal={openApplyModal} variant="primary" size="md" className="bg-[#ff4444] text-white px-4 py-2 rounded-full font-semibold">Apply Now</ApplyButton>}
                  </td>
                </tr>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center"><img src="/images/pnb.png" alt="Punjab National Bank" className="w-8 h-8 mr-3" /><span className="font-semibold">Punjab National Bank</span></td>
                  <td className="px-6 py-4">9.40% p.a. onwards</td>
                  <td className="px-6 py-4">5 years</td>
                  <td className="px-6 py-4">0.50% of loan amount</td>
                  <td className="px-6 py-4 text-center">
                    {openApplyModal && <ApplyButton loanType="Used Car Loan - Punjab National Bank" openApplyModal={openApplyModal} variant="primary" size="md" className="bg-[#ff4444] text-white px-4 py-2 rounded-full font-semibold">Apply Now</ApplyButton>}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center"><img src="/images/axis.png" alt="Axis Bank" className="w-8 h-8 mr-3" /><span className="font-semibold">Axis Bank</span></td>
                  <td className="px-6 py-4">13.55% - 15.80% p.a.</td>
                  <td className="px-6 py-4">5 years</td>
                  <td className="px-6 py-4">Up to 2% of loan amount</td>
                  <td className="px-6 py-4 text-center">
                    {openApplyModal && <ApplyButton loanType="Used Car Loan - Axis Bank" openApplyModal={openApplyModal} variant="primary" size="md" className="bg-[#ff4444] text-white px-4 py-2 rounded-full font-semibold">Apply Now</ApplyButton>}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-center mt-8">
            {openCibilModal && (
              <button onClick={openCibilModal} className="bg-[#1e3a8a] text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-blue-800 transition">Check Your Credit Score for FREE</button>
            )}
          </div>
        </div>
      </section>

      {/* Eligibility Section */}
      <section id="eligibility" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Eligibility Criteria for Used Car Loans</h2>
            <p className="text-xl text-gray-600">Check if you meet the requirements for our used car loan</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {/* Salaried SVG */}
                  <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="16" r="8" fill="#1e3a8a" />
                    <rect x="10" y="28" width="28" height="12" rx="6" fill="#1e3a8a" />
                    <rect x="18" y="36" width="12" height="4" rx="2" fill="#60A5FA" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">Salaried Employees</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start"><div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1"><span className="text-green-600 text-sm">✓</span></div><div><strong className="text-gray-800">Age Limit:</strong><p className="text-gray-600">21-65 years</p></div></div>
                <div className="flex items-start"><div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1"><span className="text-green-600 text-sm">✓</span></div><div><strong className="text-gray-800">Minimum Income:</strong><p className="text-gray-600">At least ₹15,000 per month</p></div></div>
                <div className="flex items-start"><div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1"><span className="text-green-600 text-sm">✓</span></div><div><strong className="text-gray-800">Work Experience:</strong><p className="text-gray-600">Must be working in current organization for at least 1 year</p></div></div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  {/* Self-employed SVG */}
                  <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="16" r="8" fill="#F59E42" />
                    <rect x="10" y="28" width="28" height="12" rx="6" fill="#F59E42" />
                    <rect x="18" y="36" width="12" height="4" rx="2" fill="#fff7ed" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">Self-employed Individuals</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start"><div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1"><span className="text-green-600 text-sm">✓</span></div><div><strong className="text-gray-800">Age Limit:</strong><p className="text-gray-600">25-65 years</p></div></div>
                <div className="flex items-start"><div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1"><span className="text-green-600 text-sm">✓</span></div><div><strong className="text-gray-800">Annual Profit:</strong><p className="text-gray-600">Must make a profit of at least ₹1.5 lakh per year</p></div></div>
                <div className="flex items-start"><div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1"><span className="text-green-600 text-sm">✓</span></div><div><strong className="text-gray-800">Business Experience:</strong><p className="text-gray-600">Must be in the same line of business for at least 3 years</p></div></div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <button
              onClick={() => openEligibilityModal('Used Car Loan')}
              className="bg-[#1e3a8a] text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-blue-800 transition"
            >
              Check Your Eligibility
            </button>
          </div>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <section id="calculator" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Car Loan EMI Calculator</h2>
            <p className="text-xl text-gray-600">Calculate your monthly EMI and plan your budget</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Calculator Inputs */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-6">Loan Details</h3>
              <form onSubmit={calculateEMI} autoComplete="off" aria-label="Used Car Loan EMI Calculator">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount (₹)</label>
                  <input type="range" min={100000} max={7500000} step={10000} value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))} className="slider w-full mb-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹1L</span>
                    <span className="font-semibold text-blue-600">₹{loanAmount.toLocaleString()}</span>
                    <span>₹75L</span>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Interest Rate (% p.a.)</label>
                  <input type="range" min={8.8} max={17} step={0.1} value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="slider w-full mb-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>8.8%</span>
                    <span className="font-semibold text-blue-600">{interestRate}%</span>
                    <span>17%</span>
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loan Tenure (Years)</label>
                  <input type="range" min={1} max={7} value={tenure} onChange={e => setTenure(Number(e.target.value))} className="slider w-full mb-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>1 Year</span>
                    <span className="font-semibold text-blue-600">{tenure} Years</span>
                    <span>7 Years</span>
                  </div>
                </div>
                <button type="submit" className="bg-[#1e3a8a] text-white w-full py-3 rounded-full font-bold mt-4" disabled={loading} aria-busy={loading}>{loading ? 'Calculating...' : 'Calculate EMI'}</button>
                {error && <div className="mt-3 text-red-600 font-semibold text-center animate-pulse">{error}</div>}
              </form>
            </div>
            {/* Results Display */}
            <div>
              <div className="bg-blue-600 text-white rounded-lg p-8 mb-6">
                <h3 className="text-2xl font-semibold mb-6">Your EMI Breakdown</h3>
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold mb-2">₹{emiResult.emi.toLocaleString()}</div>
                  <p className="text-blue-200">Monthly EMI</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-xl font-semibold">₹{emiResult.totalInterest.toLocaleString()}</div>
                    <p className="text-blue-200 text-sm">Total Interest</p>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-semibold">₹{emiResult.totalAmount.toLocaleString()}</div>
                    <p className="text-blue-200 text-sm">Total Amount</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-md">
                <div className="text-center text-gray-500">* Amortization chart coming soon.</div>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Ready to apply with these EMI calculations?</p>
            {openApplyModal && (
              <ApplyButton loanType="Used Car Loan" openApplyModal={openApplyModal} variant="primary" size="xl" className="bg-[#ff4444] text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:bg-red-600 transition">
                  Apply for Loan Now
              </ApplyButton>
            )}
          </div>
        </div>
      </section>

      {/* Documents Required Section */}
      <section id="documents" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Documents Required for Used Car Loans</h2>
            <p className="text-xl text-gray-600">Keep these documents ready for a faster loan approval process</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-center mb-6">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {/* Basic Documents SVG */}
                  <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="8" width="24" height="24" rx="4" fill="#1e3a8a" />
                    <rect x="14" y="14" width="12" height="3" rx="1.5" fill="#60A5FA" />
                    <rect x="14" y="20" width="12" height="3" rx="1.5" fill="#60A5FA" />
                    <rect x="14" y="26" width="8" height="3" rx="1.5" fill="#60A5FA" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Basic Documents</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center"><span className="text-green-600 mr-3">✓</span><span className="text-gray-700">Application form</span></li>
                <li className="flex items-center"><span className="text-green-600 mr-3">✓</span><span className="text-gray-700">Passport-size photographs</span></li>
                <li className="flex items-center"><span className="text-green-600 mr-3">✓</span><span className="text-gray-700">Car valuation report</span></li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-center mb-6">
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {/* Identity Documents SVG */}
                  <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="20" cy="16" r="6" fill="#22C55E" />
                    <rect x="8" y="24" width="24" height="8" rx="4" fill="#22C55E" />
                    <rect x="16" y="28" width="8" height="2" rx="1" fill="#fff" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Identity & Address Proof</h3>
              </div>
              <div className="mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Identity Proof (Any One):</h4>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-blue-600 mr-3">•</span><span className="text-gray-700">Aadhaar Card</span></li>
                  <li className="flex items-center"><span className="text-blue-600 mr-3">•</span><span className="text-gray-700">Passport</span></li>
                  <li className="flex items-center"><span className="text-blue-600 mr-3">•</span><span className="text-gray-700">Driving License</span></li>
                  <li className="flex items-center"><span className="text-blue-600 mr-3">•</span><span className="text-gray-700">Voter's ID</span></li>
                  <li className="flex items-center"><span className="text-blue-600 mr-3">•</span><span className="text-gray-700">PAN Card</span></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Address Proof (Any One):</h4>
                <ul className="space-y-2">
                  <li className="flex items-center"><span className="text-blue-600 mr-3">•</span><span className="text-gray-700">Electricity Bill</span></li>
                  <li className="flex items-center"><span className="text-blue-600 mr-3">•</span><span className="text-gray-700">Aadhaar Card</span></li>
                  <li className="flex items-center"><span className="text-blue-600 mr-3">•</span><span className="text-gray-700">Ration Card</span></li>
                </ul>
              </div>
            </div>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <div className="text-center mb-6">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {/* Income Documents SVG */}
                  <svg className="w-10 h-10" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="8" y="8" width="24" height="24" rx="4" fill="#F59E42" />
                    <rect x="14" y="14" width="12" height="3" rx="1.5" fill="#fff7ed" />
                    <rect x="14" y="20" width="12" height="3" rx="1.5" fill="#fff7ed" />
                    <rect x="14" y="26" width="8" height="3" rx="1.5" fill="#fff7ed" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Income Proof</h3>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center"><span className="text-green-600 mr-3">✓</span><span className="text-gray-700">Salary slips (last 3 months)</span></li>
                <li className="flex items-center"><span className="text-green-600 mr-3">✓</span><span className="text-gray-700">Bank statements (last 6 months)</span></li>
                <li className="flex items-center"><span className="text-green-600 mr-3">✓</span><span className="text-gray-700">IT returns/Form 16</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (optional) */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-8 shadow-md">
              <p className="text-lg text-gray-700 mb-4">“The process was super smooth and I got my loan approved in just a day!”</p>
              <div className="font-semibold text-[#1e3a8a]">Amit S., Mumbai</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 shadow-md">
              <p className="text-lg text-gray-700 mb-4">“Best rates for used car loans. Highly recommended!”</p>
              <div className="font-semibold text-[#1e3a8a]">Priya R., Bangalore</div>
            </div>
            <div className="bg-gray-50 rounded-lg p-8 shadow-md">
              <p className="text-lg text-gray-700 mb-4">“Minimal paperwork and quick disbursal. Great experience.”</p>
              <div className="font-semibold text-[#1e3a8a]">Rahul K., Delhi</div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Apply for a Used Car Loan */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e3a8a] mb-6">How to Apply for a Used Car Loan</h2>
          <ol className="list-decimal pl-6 space-y-3 text-lg text-gray-700">
            <li>Compare offers from multiple banks and NBFCs for the best rates and terms.</li>
            <li>Check your eligibility and keep all required documents ready.</li>
            <li>Apply online through the lender’s website or visit the nearest branch.</li>
            <li>Fill out the application form and upload/submit your documents.</li>
            <li>Wait for verification and approval. Once approved, the loan amount will be disbursed.</li>
          </ol>
        </div>
      </section>

      {/* Important Things to Do When Buying a Used Car */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e3a8a] mb-6">Important Things to Do When Buying a Used Car</h2>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700">
            <li>Check the car’s service history and ensure all maintenance is up to date.</li>
            <li>Verify the car’s registration, insurance, and ownership documents.</li>
            <li>Get the car inspected by a trusted mechanic for any hidden issues.</li>
            <li>Negotiate the price based on the car’s condition and market value.</li>
            <li>Transfer the RC (Registration Certificate) and insurance to your name after purchase.</li>
          </ul>
        </div>
      </section>

      {/* How to Use the Bankscart Car Loan EMI Calculator? */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e3a8a] mb-6">How to Use the Bankscart Car Loan EMI Calculator?</h2>
          <ol className="list-decimal pl-6 space-y-3 text-lg text-gray-700">
            <li>Enter the desired loan amount, interest rate, and tenure in the calculator above.</li>
            <li>Adjust the sliders or input values to see real-time EMI, total interest, and total payment.</li>
            <li>Use the results to plan your budget and choose the best loan offer.</li>
          </ol>
        </div>
      </section>

      {/* Why Choose a Used Car Loan? */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e3a8a] mb-6">Why Choose a Used Car Loan?</h2>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700">
            <li>Lower EMIs and interest rates compared to unsecured loans.</li>
            <li>Flexible repayment tenures up to 7 years.</li>
            <li>Minimal documentation and quick approval process.</li>
            <li>Option to finance up to 100% of the car’s value.</li>
            <li>Improves your credit score with timely repayments.</li>
          </ul>
        </div>
      </section>

      {/* Tips for Availing a Used Car Loan */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e3a8a] mb-6">Tips for Availing a Used Car Loan</h2>
          <ul className="list-disc pl-6 space-y-3 text-lg text-gray-700">
            <li>Maintain a good credit score for better rates and approval chances.</li>
            <li>Opt for a shorter tenure to save on total interest paid.</li>
            <li>Compare processing fees and prepayment charges across lenders.</li>
            <li>Read the loan agreement carefully before signing.</li>
            <li>Make timely EMI payments to avoid penalties and improve your credit profile.</li>
          </ul>
        </div>
      </section>

      {/* FAQs on Used Car Loans */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1e3a8a] mb-6">FAQs on Used Car Loans</h2>
          <div className="space-y-4">
            <details className="bg-gray-50 rounded-lg p-4 shadow">
              <summary className="font-semibold cursor-pointer text-[#1e3a8a]">What is a used car loan?</summary>
              <p className="mt-2 text-gray-700">A used car loan is a financing option that helps you purchase a pre-owned vehicle by paying the amount in EMIs over a fixed tenure.</p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4 shadow">
              <summary className="font-semibold cursor-pointer text-[#1e3a8a]">What is the maximum loan amount I can get for a used car?</summary>
              <p className="mt-2 text-gray-700">You can get up to 80-100% of the car’s value, depending on the lender and your eligibility.</p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4 shadow">
              <summary className="font-semibold cursor-pointer text-[#1e3a8a]">What is the typical tenure for a used car loan?</summary>
              <p className="mt-2 text-gray-700">Tenures usually range from 1 to 7 years for used car loans.</p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4 shadow">
              <summary className="font-semibold cursor-pointer text-[#1e3a8a]">What documents are required?</summary>
              <p className="mt-2 text-gray-700">Common documents include identity proof, address proof, income proof, bank statements, and car-related documents.</p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4 shadow">
              <summary className="font-semibold cursor-pointer text-[#1e3a8a]">Can I prepay or foreclose my used car loan?</summary>
              <p className="mt-2 text-gray-700">Yes, but some lenders may charge a prepayment or foreclosure penalty. Check with your lender for details.</p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4 shadow">
              <summary className="font-semibold cursor-pointer text-[#1e3a8a]">Is a down payment required?</summary>
              <p className="mt-2 text-gray-700">Most lenders require a down payment, but some may offer 100% financing for select customers.</p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4 shadow">
              <summary className="font-semibold cursor-pointer text-[#1e3a8a]">Can I get a used car loan with a low credit score?</summary>
              <p className="mt-2 text-gray-700">It is possible, but you may get a lower loan amount or higher interest rate. Some lenders may reject your application.</p>
            </details>
            <details className="bg-gray-50 rounded-lg p-4 shadow">
              <summary className="font-semibold cursor-pointer text-[#1e3a8a]">How is EMI calculated?</summary>
              <p className="mt-2 text-gray-700">EMI is calculated based on the loan amount, interest rate, and tenure using the reducing balance method. Use the calculator above for quick results.</p>
            </details>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UsedCarLoanPage;
