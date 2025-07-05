

import React, { useState } from "react";
import { useState as useLocalState, useEffect } from "react";
import { motion } from "framer-motion";
// import AOS from 'aos'; // Uncomment if you want to use AOS for scroll animations
// import 'aos/dist/aos.css';

// --- Two Wheeler Loan Page for bankscart ---
function TwoWheelerLoanPage() {
  // useEffect(() => { AOS.init({ duration: 800 }); }, []); // Uncomment if using AOS
  return (
    <div className="min-h-screen bg-[#f8f9fa] font-['Open Sans','Roboto','Lato',sans-serif] text-[#343A40]">
      {/* Header removed as requested */}

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#eaf3fb] to-[#d1f2eb] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-4 text-[#2C3E50]">Two-Wheeler Loan</h1>
            <h2 className="text-2xl font-medium mb-4 text-[#2C3E50]">What is a Two-Wheeler Loan?</h2>
            <p className="text-lg text-[#374151] mb-6">A Two-Wheeler Loan Helps You Buy Motorcycles or Scooters with Easy EMIs. While Some Banks Offer Full Financing, Others Provide Partial Coverage of the Vehicle's Road Price.</p>
            <div className="bg-[#FFC107] text-[#2C3E50] font-semibold px-4 py-2 rounded mb-6 inline-block">Updated On - 01 Jul 2025</div>
            <div className="flex items-center space-x-4 mt-4">
              <button className="bg-[#ff4444] text-white rounded-full px-6 py-3 font-bold text-lg shadow-lg hover:bg-red-600 transition flex items-center">
                FREE Credit Score <span className="ml-2">Check Now &gt;&gt;</span>
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            {/* Placeholder for Hero Image */}
            <div className="w-80 h-80 bg-gradient-to-br from-[#20B2AA] to-[#4682B4] rounded-3xl flex items-center justify-center shadow-lg">
              <svg width="140" height="100" viewBox="0 0 140 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="70" cy="90" rx="60" ry="10" fill="#b2dfdb"/>
                <rect x="30" y="40" width="80" height="30" rx="12" fill="#4A90E2"/>
                <circle cx="45" cy="75" r="15" fill="#FF6B35" stroke="#2C3E50" strokeWidth="4"/>
                <circle cx="95" cy="75" r="15" fill="#FF6B35" stroke="#2C3E50" strokeWidth="4"/>
                <rect x="60" y="30" width="20" height="20" rx="6" fill="#fff"/>
                <rect x="80" y="50" width="20" height="8" rx="3" fill="#fff"/>
                <rect x="40" y="50" width="20" height="8" rx="3" fill="#fff"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED LOAN COMPARISON TABLE */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-[#2C3E50] mb-8 text-center">Two-Wheeler Loan Interest Rates for All Banks</h2>
        <LoanComparisonTable />
      </section>

      {/* 4. PROMOTIONAL BANNER SECTION */}
      <PromotionalBanner />

      {/* 5. BANK-SPECIFIC LOAN SECTIONS */}
      <section className="py-16 bg-[#f8f9fa]">
        <h2 className="text-3xl font-bold text-[#2C3E50] mb-8 text-center">Bank-Specific Two-Wheeler Loan Options</h2>
        <BankLoanSections />
      </section>

      {/* 7. DETAILED CONTENT SECTIONS: Eligibility & Documents */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-[#2C3E50] mb-8 text-center">Eligibility Criteria & Documents Required</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <EligibilityTable />
          <DocumentsTable />
        </div>
      </section>

      {/* 8. ADVANTAGES SECTION */}
      <section className="py-16 bg-[#eaf3fb]">
        <h2 className="text-3xl font-bold text-[#2C3E50] mb-8 text-center">Advantages of Two-Wheeler Loans</h2>
        <AdvantagesSection />
      </section>

      {/* 9. EMI CALCULATOR SECTION (Upgraded) */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-[#2C3E50] mb-8 text-center">Two-Wheeler Loan EMI Calculator</h2>
        <EMICalculatorV2 />
      </section>

      {/* 10. TIPS & GUIDELINES SECTIONS */}
      <section className="py-16 bg-[#f8f9fa]">
        <h2 className="text-3xl font-bold text-[#2C3E50] mb-8 text-center">Application Tips & Do's and Don'ts</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ApplicationTips />
          <DosAndDontsTable />
        </div>
      </section>

      {/* 11. FAQ SECTION */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-[#2C3E50] mb-8 text-center">Frequently Asked Questions</h2>
        <FAQSection />
      </section>

      {/* Application Tips & Do's and Don'ts */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Application Tips</h2>
            <ol className="list-decimal pl-6 space-y-3 text-lg text-[#374151]">
              <li>Research well before applying</li>
              <li>Check eligibility criteria</li>
              <li>Compare interest rates</li>
              <li>Submit required documents</li>
              <li>Track your application status</li>
            </ol>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Do's and Don'ts</h2>
            <table className="w-full text-left border border-gray-200 rounded-lg">
              <thead className="bg-[#eaf3fb]">
                <tr>
                  <th className="px-4 py-3 font-semibold">Do's</th>
                  <th className="px-4 py-3 font-semibold">Don'ts</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="px-4 py-2">Maintain a good credit score</td>
                  <td className="px-4 py-2">Don't provide false information</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Compare offers from multiple banks</td>
                  <td className="px-4 py-2">Don't ignore terms and conditions</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Read the fine print</td>
                  <td className="px-4 py-2">Don't miss EMI payments</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>


      {/* Footer removed as requested */}
    </div>
  );
}


// --- 3. FEATURED LOAN COMPARISON TABLE ---
function LoanComparisonTable() {
  // Table data and sorting logic here
  // ... (stub for brevity)
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      {/* Table with sorting, hover, and logos */}
      <table className="min-w-full text-sm text-left border border-gray-200">
        <thead className="bg-[#eaf3fb]">
          <tr>
            <th className="px-4 py-3 font-semibold cursor-pointer">TWL Banks</th>
            <th className="px-4 py-3 font-semibold cursor-pointer">Interest Rate</th>
            <th className="px-4 py-3 font-semibold cursor-pointer">Loan Amount</th>
            <th className="px-4 py-3 font-semibold cursor-pointer">Processing Fees</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {/* Example row, repeat for each bank */}
          <tr className="hover:bg-blue-50 transition">
            <td className="px-4 py-2 flex items-center space-x-2">
              <img src="/logos/axis.png" alt="Axis Bank" className="w-6 h-6 rounded-full hover:scale-110 transition-transform" />
              <span>Axis Bank</span>
            </td>
            <td className="px-4 py-2">10.75% p.a. onwards</td>
            <td className="px-4 py-2">Rs.25,001 onwards</td>
            <td className="px-4 py-2">From 0.5% of loan amount</td>
          </tr>
          <tr className="hover:bg-blue-50 transition">
            <td className="px-4 py-2 flex items-center space-x-2">
              <img src="/logos/pnb.png" alt="Punjab National Bank" className="w-6 h-6 rounded-full hover:scale-110 transition-transform" />
              <span>Punjab National Bank</span>
            </td>
            <td className="px-4 py-2">11.15% p.a. onwards</td>
            <td className="px-4 py-2">Rs.1.50 lakh to Rs.10 lakh</td>
            <td className="px-4 py-2">Contact the bank</td>
          </tr>
          <tr className="hover:bg-blue-50 transition">
            <td className="px-4 py-2 flex items-center space-x-2">
              <img src="/logos/union.png" alt="Union Bank of India" className="w-6 h-6 rounded-full hover:scale-110 transition-transform" />
              <span>Union Bank of India</span>
            </td>
            <td className="px-4 py-2">12.15% p.a. onwards</td>
            <td className="px-4 py-2">Up to Rs.10 lakh</td>
            <td className="px-4 py-2">Contact the bank</td>
          </tr>
          <tr className="hover:bg-blue-50 transition">
            <td className="px-4 py-2 flex items-center space-x-2">
              <img src="/logos/hdfc.png" alt="HDFC Bank" className="w-6 h-6 rounded-full hover:scale-110 transition-transform" />
              <span>HDFC Bank</span>
            </td>
            <td className="px-4 py-2">14.50% p.a. onwards</td>
            <td className="px-4 py-2">Contact the bank</td>
            <td className="px-4 py-2">2.5% of the loan amount</td>
          </tr>
          <tr className="hover:bg-blue-50 transition">
            <td className="px-4 py-2 flex items-center space-x-2">
              <img src="/logos/sbi.png" alt="State Bank of India" className="w-6 h-6 rounded-full hover:scale-110 transition-transform" />
              <span>State Bank of India</span>
            </td>
            <td className="px-4 py-2">12.80% p.a. onwards</td>
            <td className="px-4 py-2">Rs.20,000 to Rs.25 lakh</td>
            <td className="px-4 py-2">2.00% of loan amount + GST</td>
          </tr>
          <tr className="hover:bg-blue-50 transition">
            <td className="px-4 py-2 flex items-center space-x-2">
              <img src="/logos/jana.png" alt="Jana Small Finance Bank" className="w-6 h-6 rounded-full hover:scale-110 transition-transform" />
              <span>Jana Small Finance Bank</span>
            </td>
            <td className="px-4 py-2">Contact the bank</td>
            <td className="px-4 py-2">Up to Rs.3.50 lakh</td>
            <td className="px-4 py-2">Up to 5%</td>
          </tr>
          {/* Add more banks as needed */}
        </tbody>
      </table>
    </div>
  );
}

// --- 4. PROMOTIONAL BANNER SECTION ---
function PromotionalBanner() {
  return (
    <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative py-12 px-6 md:px-16 mb-12 rounded-3xl overflow-hidden bg-gradient-to-r from-[#20B2AA] to-[#4682B4] flex flex-col md:flex-row items-center justify-between shadow-xl">
      <div className="flex-1 z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get Your Two-Wheeler Loan</h2>
        <ul className="space-y-3 mb-8">
          <li className="flex items-center text-white text-lg"><span className="mr-2 text-green-200">✓</span>Lowest Interest Rates</li>
          <li className="flex items-center text-white text-lg"><span className="mr-2 text-green-200">✓</span>Flexible EMIs</li>
          <li className="flex items-center text-white text-lg"><span className="mr-2 text-green-200">✓</span>Minimal Documentation</li>
          <li className="flex items-center text-white text-lg"><span className="mr-2 text-green-200">✓</span>Fast Loan Disbursement</li>
          <li className="flex items-center text-white text-lg"><span className="mr-2 text-green-200">✓</span>No Hidden Charges</li>
        </ul>
        <motion.button whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(32,178,170,0.3)" }} className="bg-white text-[#20B2AA] font-bold px-8 py-4 rounded-full shadow-lg text-xl transition mb-4 animate-pulse">Apply Now</motion.button>
        <div className="flex items-center mt-4">
        </div>
      </div>
      <div className="flex-1 flex justify-center items-center z-10 mt-8 md:mt-0">
        {/* Scooter Icon with arrows and pulse animation */}
        <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="w-48 h-48 bg-white bg-opacity-20 rounded-full flex items-center justify-center relative">
          {/* Replace with SVG or image as needed */}
          <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="60" cy="70" rx="50" ry="8" fill="#b2dfdb"/>
            <rect x="25" y="30" width="70" height="25" rx="10" fill="#4A90E2"/>
            <circle cx="40" cy="55" r="12" fill="#FF6B35" stroke="#2C3E50" strokeWidth="3"/>
            <circle cx="80" cy="55" r="12" fill="#FF6B35" stroke="#2C3E50" strokeWidth="3"/>
            <rect x="55" y="20" width="15" height="15" rx="5" fill="#fff"/>
            <rect x="70" y="40" width="15" height="6" rx="2" fill="#fff"/>
            <rect x="35" y="40" width="15" height="6" rx="2" fill="#fff"/>
            {/* Arrows for movement */}
            <polyline points="100,60 110,50 100,40" fill="none" stroke="#fff" strokeWidth="3" markerEnd="url(#arrowhead)"/>
            <defs>
              <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
                <path d="M0,0 L0,6 L6,3 z" fill="#fff" />
              </marker>
            </defs>
          </svg>
        </motion.div>
      </div>
    </motion.section>
  );
}

// --- 5. BANK-SPECIFIC LOAN SECTIONS ---
function BankLoanSections() {
  // Use state to manage expanded/collapsed sections
  const [open, setOpen] = useLocalState(null);
  const banks = [
    {
      name: "State Bank of India",
      logo: "/logos/sbi.png",
      color: "#2C3E50",
      features: [
        "Get loans for both regular two-wheelers and superbikes",
        "Minimum income is Rs.12,500",
        "Minimum loan amount Rs.20,000",
        "Repayment tenure up to 3 years"
      ],
      cta: true
    },
    {
      name: "HDFC Bank",
      logo: "/logos/hdfc.png",
      color: "#004C8F",
      features: [
        "Attractive interest rates",
        "Flexible repayment options",
        "Minimal documentation",
        "Quick disbursal"
      ],
      cta: true
    },
    {
      name: "Punjab National Bank",
      logo: "/logos/pnb.png",
      color: "#800000",
      features: [
        "Loan up to Rs.10 lakh",
        "Competitive interest rates",
        "Easy eligibility criteria"
      ],
      cta: false
    },
    {
      name: "Union Bank of India",
      logo: "/logos/union.png",
      color: "#D2232A",
      features: [
        "Loan up to Rs.10 lakh",
        "Attractive interest rates",
        "Flexible tenure"
      ],
      cta: false
    },
    {
      name: "Axis Bank",
      logo: "/logos/axis.png",
      color: "#A0204C",
      features: [
        "Loan from Rs.25,001 onwards",
        "Quick approval",
        "Minimal processing fees"
      ],
      cta: false
    },
    {
      name: "Jana Small Finance Bank",
      logo: "/logos/jana.png",
      color: "#1B75BC",
      features: [
        "Loan up to Rs.3.5 lakh",
        "Flexible repayment",
        "Up to 5% processing fee"
      ],
      cta: false
    },
    // Add more banks as needed
  ];
  return (
    <div className="space-y-6">
      {banks.map((bank, idx) => (
        <div key={bank.name} className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-4 transition hover:shadow-lg" style={{ borderLeft: `6px solid ${bank.color}` }}>
          <img src={bank.logo} alt={bank.name} className="w-14 h-14 rounded-full object-contain mr-4 hover:scale-110 transition-transform" />
          <div className="flex-1">
            <button onClick={() => setOpen(open === idx ? null : idx)} className="flex items-center w-full text-left focus:outline-none">
              <span className="text-2xl font-bold mr-2" style={{ color: bank.color }}>{bank.name}</span>
              <span className="ml-auto text-xl">{open === idx ? "-" : "+"}</span>
            </button>
            {open === idx && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
                <ul className="space-y-2">
                  {bank.features.map((f, i) => (
                    <li key={i} className="flex items-center text-lg"><span className="text-blue-500 mr-2">✔</span>{f}</li>
                  ))}
                </ul>
                {bank.cta && (
                  <div className="mt-4">
                    <button className="inline-flex items-center bg-[#20B2AA] text-white px-4 py-2 rounded-full font-semibold shadow hover:shadow-lg transition animate-pulse">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                      Check Your Free Credit Score Now
                    </button>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// --- 7. ELIGIBILITY TABLE ---
function EligibilityTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
        <thead className="bg-[#eaf3fb]">
          <tr>
            <th className="px-4 py-3 font-semibold">Requirements</th>
            <th className="px-4 py-3 font-semibold">Salaried Individuals</th>
            <th className="px-4 py-3 font-semibold">Self-employed</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr><td className="px-4 py-2">Age</td><td className="px-4 py-2">Min 21, Max 65-70 years</td><td className="px-4 py-2">Min 21, Max 65-70 years</td></tr>
          <tr><td className="px-4 py-2">Monthly Income</td><td className="px-4 py-2">Rs.7,000</td><td className="px-4 py-2">Rs.6,000</td></tr>
          <tr><td className="px-4 py-2">Credit Score</td><td className="px-4 py-2">Above 750</td><td className="px-4 py-2">Above 750</td></tr>
          <tr><td className="px-4 py-2">Loan Amount</td><td className="px-4 py-2">Up to 100% vehicle value</td><td className="px-4 py-2">Up to 100% vehicle value</td></tr>
          <tr><td className="px-4 py-2">Residential Stability</td><td className="px-4 py-2">1 year at current address</td><td className="px-4 py-2">1 year at current address</td></tr>
          <tr><td className="px-4 py-2">Work Experience</td><td className="px-4 py-2">At least 1 year</td><td className="px-4 py-2">At least 1 year</td></tr>
        </tbody>
      </table>
    </div>
  );
}

// --- 7. DOCUMENTS TABLE ---
function DocumentsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
        <thead className="bg-[#eaf3fb]">
          <tr>
            <th className="px-4 py-3 font-semibold">Particulars</th>
            <th className="px-4 py-3 font-semibold">Salaried</th>
            <th className="px-4 py-3 font-semibold">Self-employed</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr><td className="px-4 py-2">Identity Proof</td><td className="px-4 py-2">PAN, Voter ID, Passport, Driving License</td><td className="px-4 py-2">PAN, Voter ID, Passport, Driving License</td></tr>
          <tr><td className="px-4 py-2">Address Proof</td><td className="px-4 py-2">Utility bills, Passport</td><td className="px-4 py-2">Utility bills, Passport</td></tr>
          <tr><td className="px-4 py-2">Income Proof</td><td className="px-4 py-2">Salary slips, IT returns, Bank statements</td><td className="px-4 py-2">Bank statements, IT returns, Financial statements</td></tr>
        </tbody>
      </table>
    </div>
  );
}

// --- 8. ADVANTAGES SECTION ---
function AdvantagesSection() {
  const advantages = [
    { icon: "💸", text: "Get funds for dream bike purchase" },
    { icon: "🤝", text: "Use guarantor/co-applicant options" },
    { icon: "🏍️", text: "Superbike financing available" },
    { icon: "📉", text: "Affordable interest rates" },
    { icon: "🔄", text: "Flexible repayment periods" },
    { icon: "📈", text: "Build credit history through timely EMIs" },
  ];
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {advantages.map((adv, i) => (
        <div key={i} className="flex flex-col items-center bg-white rounded-full shadow-lg p-6 w-48 h-48 justify-center hover:scale-105 transition-transform">
          <div className="text-5xl mb-4">{adv.icon}</div>
          <div className="text-lg text-center font-semibold text-[#2C3E50]">{adv.text}</div>
        </div>
      ))}
    </div>
  );
}

// --- 9. EMI CALCULATOR SECTION (Upgraded) ---
function EMICalculatorV2() {
  const [amount, setAmount] = useLocalState(50000);
  const [rate, setRate] = useLocalState(12.5);
  const [tenure, setTenure] = useLocalState(36);
  const [emi, setEmi] = useLocalState(0);
  const [totalInterest, setTotalInterest] = useLocalState(0);
  const [totalPayment, setTotalPayment] = useLocalState(0);
  useEffect(() => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const months = parseInt(tenure);
    if (!principal || !annualRate || !months) {
      setEmi(0); setTotalInterest(0); setTotalPayment(0); return;
    }
    const monthlyRate = annualRate / 12 / 100;
    const emiVal = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPay = emiVal * months;
    const totalInt = totalPay - principal;
    setEmi(emiVal); setTotalInterest(totalInt); setTotalPayment(totalPay);
  }, [amount, rate, tenure]);
  return (
    <div className="bg-[#f8f9fa] rounded-xl p-8 shadow-lg max-w-2xl mx-auto">
      <div className="mb-6">
        <label className="block font-semibold mb-2">Loan Amount (₹20,000 - ₹10,00,000)</label>
        <input type="range" min="20000" max="1000000" step="1000" value={amount} onChange={e => setAmount(e.target.value)} className="w-full" />
        <div className="text-right text-sm text-gray-500">₹{parseInt(amount).toLocaleString()}</div>
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Interest Rate (% p.a.)</label>
        <input type="number" min="5" max="40" step="0.01" value={rate} onChange={e => setRate(e.target.value)} className="w-full border rounded px-3 py-2" />
      </div>
      <div className="mb-6">
        <label className="block font-semibold mb-2">Tenure (months, 12-60)</label>
        <input type="range" min="12" max="60" value={tenure} onChange={e => setTenure(e.target.value)} className="w-full" />
        <div className="text-right text-sm text-gray-500">{tenure} months</div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-xs text-gray-500">EMI</div>
          <div className="text-xl font-bold text-[#20B2AA]">₹{emi ? emi.toLocaleString(undefined, { maximumFractionDigits: 0 }) : 0}</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-xs text-gray-500">Total Interest</div>
          <div className="text-xl font-bold text-[#FF6B35]">₹{totalInterest ? totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 }) : 0}</div>
        </div>
        <div className="bg-white rounded-lg p-4 text-center">
          <div className="text-xs text-gray-500">Total Payment</div>
          <div className="text-xl font-bold text-[#2C3E50]">₹{totalPayment ? totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 }) : 0}</div>
        </div>
      </div>
      {/* Amortization Table and Graph (stub) */}
      <div className="mt-8">
        <div className="font-semibold mb-2">Amortization Table & Graph</div>
        <div className="text-gray-400 text-sm">(Graphical representation coming soon)</div>
      </div>
    </div>
  );
}

// --- 10. APPLICATION TIPS ---
function ApplicationTips() {
  const tips = [
    { text: "Research well before applying", color: "bg-blue-100" },
    { text: "Check eligibility criteria", color: "bg-green-100" },
    { text: "Compare interest rates", color: "bg-yellow-100" },
    { text: "Submit required documents", color: "bg-purple-100" },
    { text: "Track your application status", color: "bg-pink-100" },
  ];
  const [checked, setChecked] = useLocalState(Array(tips.length).fill(false));
  return (
    <ol className="list-decimal pl-6 space-y-3 text-lg">
      {tips.map((tip, i) => (
        <li key={i} className={`flex items-center p-2 rounded-lg ${tip.color} transition-all`}>
          <input type="checkbox" checked={checked[i]} onChange={() => setChecked(checked.map((c, idx) => idx === i ? !c : c))} className="mr-2" />
          <span>{tip.text}</span>
        </li>
      ))}
    </ol>
  );
}

// --- 10. DO'S AND DON'TS TABLE ---
function DosAndDontsTable() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border border-gray-200 rounded-lg">
        <thead className="bg-[#eaf3fb]">
          <tr>
            <th className="px-4 py-3 font-semibold">Do's</th>
            <th className="px-4 py-3 font-semibold">Don'ts</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          <tr><td className="px-4 py-2">Research well before applying</td><td className="px-4 py-2">Don't apply for multiple loans simultaneously</td></tr>
          <tr><td className="px-4 py-2">Check eligibility criteria</td><td className="px-4 py-2">Don't apply for attractive welcome gifts only</td></tr>
          <tr><td className="px-4 py-2">Compare interest rates</td><td className="px-4 py-2">Don't skip reading application forms</td></tr>
          <tr><td className="px-4 py-2">Submit required documents</td><td className="px-4 py-2">Don't sign without reading terms</td></tr>
        </tbody>
      </table>
    </div>
  );
}

// --- 11. FAQ SECTION ---
function FAQSection() {
  const [open, setOpen] = useLocalState(null);
  const faqs = [
    { q: "Who is eligible for a two-wheeler loan?", a: "Salaried and self-employed individuals meeting age, income, and credit score criteria." },
    { q: "What documents are required?", a: "Identity, address, and income proof as per bank policy." },
    { q: "How is the EMI calculated?", a: "Based on loan amount, interest rate, and tenure using the reducing balance method." },
    { q: "Can I prepay my loan?", a: "Most banks allow prepayment with or without charges. Check with your lender." },
    { q: "What is the minimum credit score required?", a: "Usually 750 or above." },
    // Add more FAQs as needed
  ];
  const [search, setSearch] = useLocalState("");
  const filteredFaqs = faqs.filter(f => f.q.toLowerCase().includes(search.toLowerCase()));
  const [votes, setVotes] = useLocalState(Array(faqs.length).fill(null));
  return (
    <div className="max-w-2xl mx-auto">
      <input type="text" placeholder="Search FAQs..." value={search} onChange={e => setSearch(e.target.value)} className="w-full mb-4 px-4 py-2 border rounded" />
      <div className="space-y-4">
        {filteredFaqs.map((faq, i) => (
          <div key={i} className="border rounded-lg p-4 bg-[#f8f9fa] shadow-sm">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex items-center w-full text-left focus:outline-none">
              <span className="font-semibold text-lg">{faq.q}</span>
              <span className="ml-auto text-2xl">{open === i ? "-" : "+"}</span>
            </button>
            {open === i && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-gray-700">
                {faq.a}
                <div className="mt-4 flex items-center space-x-2 text-sm">
                  <span>Was this helpful?</span>
                  <button onClick={() => setVotes(votes.map((v, idx) => idx === i ? true : v))} className={`px-2 py-1 rounded ${votes[i] === true ? 'bg-green-200' : 'bg-gray-200'}`}>Yes</button>
                  <button onClick={() => setVotes(votes.map((v, idx) => idx === i ? false : v))} className={`px-2 py-1 rounded ${votes[i] === false ? 'bg-red-200' : 'bg-gray-200'}`}>No</button>
                </div>
              </motion.div>
            )}
          </div>
        ))}
        {filteredFaqs.length === 0 && <div className="text-gray-400 text-center">No FAQs found.</div>}
      </div>
    </div>
  );
}

export default TwoWheelerLoanPage;
