
import React, { useState, useEffect } from "react";

// --- Dynamic Data ---
const banks = [
  { name: "State Bank of India", rate: "9.10% p.a. onwards", tenure: "Up to 7 years" },
  { name: "Indian Overseas Bank", rate: "8.60% p.a. onwards", tenure: "Up to 7 years" },
  { name: "IDFC First Bank", rate: "9.99% p.a. onwards", tenure: "Up to 10 years" },
  { name: "Jammu and Kashmir Bank", rate: "RLLR + 0.75% p.a. onwards (floating), RLLR + 0.25% p.a. onwards (fixed)", tenure: "Up to 7 years" },
  { name: "Canara Bank", rate: "8.20% p.a. onwards", tenure: "Up to 7 years" },
  { name: "HDFC Bank", rate: "9.40% p.a. onwards (Rack Interest)", tenure: "Up to 7 years" },
  { name: "IndusInd Bank", rate: "8.00% p.a. onwards", tenure: "Up to 5 years" },
  { name: "ICICI Bank", rate: "9.10% p.a. onwards", tenure: "Up to 7 years" },
  { name: "Karur Vysya Bank", rate: "9.25% p.a. onwards", tenure: "Up to 7 years" },
  { name: "South Indian Bank", rate: "8.75% p.a. onwards", tenure: "Up to 7 years" },
  { name: "Kotak Mahindra Bank", rate: "Contact the bank", tenure: "Up to 7 years" },
  { name: "IDBI Bank", rate: "8.65% p.a. onwards (floating), 9.20% p.a. onwards (fixed)", tenure: "Up to 7 years" },
  { name: "Yes Bank", rate: "Contact the bank", tenure: "Up to 8 years" },
  { name: "Karnataka Bank", rate: "8.80% p.a. onwards", tenure: "Up to 7 years" },
  { name: "Federal Bank of India", rate: "9.00% p.a. onwards", tenure: "Up to 7 years" },
  { name: "Equitas Small Finance Bank", rate: "9.00% p.a. onwards", tenure: "Up to 7 years" },
  { name: "Punjab National Bank", rate: "Floating: 8.35% p.a. onwards, Fixed: 9.35% p.a. onwards", tenure: "Up to 7 years" },
  { name: "Union Bank of India", rate: "8.20% p.a. onwards", tenure: "Up to 7 years" },
  { name: "Axis Bank", rate: "9.40% p.a. onwards", tenure: "Up to 7 years" },
  { name: "Bank of Baroda", rate: "Fixed: 8.80% p.a. onwards, Floating: 8.90% p.a. onwards", tenure: "Up to 7 years" },
  { name: "Tamilnad Mercantile Bank", rate: "10.25% p.a. onwards", tenure: "Up to 7 years" },
  { name: "Bank of India", rate: "8.75% p.a. onwards", tenure: "Up to 7 years" },
  { name: "Bank of Maharashtra", rate: "8.20% p.a. onwards", tenure: "Up to 7 years" },
  { name: "Central Bank of India", rate: "8.35% p.a. onwards", tenure: "Up to 7 years" },
  { name: "Indian Bank", rate: "8.25% p.a. onwards", tenure: "Up to 7 years" },
  { name: "UCO Bank", rate: "8.35% p.a. onwards", tenure: "Up to 7 years" },
  { name: "Bandhan Bank", rate: "8.47% p.a. onwards", tenure: "Up to 7 years" },
];

const loanTypes = [
  { title: "New Car Loan", desc: "New car loans can be used to purchase a brand-new car straight out of the showroom. Depending on the bank, the interest rates will vary. Up to 100% of the on-road price of the car may be provided as a loan." },
  { title: "Used Car Loan", desc: "Lenders offer used car loans up to 80-85% of the price of the car at attractive interest rates for a loan tenure up to 5 years. However, certain lenders will offer loans for cars that have been purchased within the last 5 years." },
  { title: "Loan against Car", desc: "When one is in dire need of funds, he or she can pledge his or her old car as collateral in order to obtain sufficient funds to purchase a new car. This is known as Loan against Car. If you have a bad credit score, you can pledge your old car to the bank as collateral to obtain some much-needed funds." },
];

const carLoanTips = [
  "It is vital that you maintain a good credit score when applying for an auto loan. Apart from the loan getting approved quicker, lenders will offer low interest rates if your credit score is good.",
  "No security or collateral is required when availing car loans. The car acts as the security.",
];

const keyComponents = [
  { title: "Monthly Instalments", desc: "The EMI that must be paid every month. EMI consists of interest and principal amount." },
  { title: "Down Payment", desc: "The upfront amount paid when you purchase the car." },
  { title: "Loan Term", desc: "The tenure or duration of the loan. EMIs must be paid for the selected tenure." },
  { title: "Rate of Interest", desc: "The interest rate charged by the lender on the Vehicle loan that has been availed." },
  { title: "Principal Amount", desc: "The amount that is borrowed to buy the car. The principal amount does not include any fees or interest levied by the bank." },
];

const eligibilityCriteria = [
  "The Age of the individual must be between 18 years and 75 years.",
  "Minimum net monthly income of Rs. 20,000.",
  "At least one year of employment with the current employer.",
  "Must be salaried or self-employed, working for a government establishment or a private company.",
];

const documentsRequired = [
  { req: "Identity proof (any of the following)", ind: "Aadhaar, Passport, Driving license, Voters ID card, PAN card" },
  { req: "Address proof (any of the following)", ind: "Aadhaar, Passport, Driving license, Ration card, Utility bills" },
  { req: "Proof of income", ind: "Form 16, Salary slips, if you are salaried, Latest Income Tax Returns, Bank statements going back 6 months" },
];

const checklist = [
  { step: "Application", req: "Compare all offers available", inf: "To find the loan that offers you the highest loan amount and the most affordable interest rate" },
  { step: "Submit Income Proof", req: "Bank Statement (last 6 months) Pay-Slips (last 3 months) IT- Returns (last 2 years)", inf: "Lender wants to establish your ability to repay the loan" },
  { step: "Submit Proof of Address and Identity", req: "PAN Card, Voter's ID, Aadhaar Card, Passport, etc.", inf: "Lender wants to establish your nationality, identity, and permanent address" },
  { step: "Credit History", req: "PAN Card", inf: "Lender wants to check your past credit records and establish if you can be trusted to make regular repayments" },
  { step: "Information About Vehicle", req: "Sales Receipts from the showroom from where the vehicle was purchased", inf: "Lender must confirm that the deal was affected as intended" },
  { step: "Proof of Insurance and Driving License", req: "Copies of the vehicle's Motor Insurance and your Driving License", inf: "Lender must establish that all laws and protocols are followed with regard to the purchased vehicle." },
];

const howToApply = [
  {
    method: "Online",
    steps: [
      "You will need to visit the official website of the lender to apply for a loan.",
      "Select Apply Now under the car loan section.",
      "Enter the relevant details.",
      "The documents can be uploaded.",
      "A customer service representative will call you to process the request.",
    ],
  },
  {
    method: "Offline",
    steps: [
      "You can visit the bank branch and apply for a car loan.",
      "The relevant documents must be submitted.",
      "Once the verification process is completed, the loan will be provided.",
    ],
  },
];

// --- FAQ Data (already dynamic) ---
// ...existing code...

// --- EMI Calculator ---
const CarLoanPage = () => {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(5);
  const [processingFee, setProcessingFee] = useState(1.0);
  const [emiResult, setEmiResult] = useState({ emi: 0, totalInterest: 0, totalAmount: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const calculateEMI = (e) => {
    if (e) e.preventDefault();
    setError("");
    setLoading(true);
    setTimeout(() => { // Simulate async for future API
      const principal = Number(loanAmount);
      const annualRate = Number(interestRate);
      const years = Number(tenure);
      const feePercent = Number(processingFee);
      if (!principal || !annualRate || !years) {
        setEmiResult({ emi: 0, totalInterest: 0, totalAmount: 0 });
        setError("Please enter valid values for all fields.");
        setLoading(false);
        return;
      }
      const n = years * 12;
      const r = annualRate / 12 / 100;
      const emi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalAmount = emi * n + (principal * feePercent / 100);
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
  }, [loanAmount, interestRate, tenure, processingFee]);


  return (
    <div className="min-h-screen bg-[#F8F9FA] py-8 px-4 md:px-12">

    {/* Hero Section */}
    <section className="mt-8 mb-6">
      <div className="text-sm text-gray-500 mb-2">Home &gt; Car Loan</div>
      <h1 className="text-3xl md:text-5xl font-extrabold text-[#2C3E50] mb-4">Car Loan in India 2025</h1>
      <p className="text-lg text-gray-700 mb-6 max-w-2xl">Car Loan - A car loan is a financial agreement that allows you to borrow money to purchase a vehicle, which you repay over time with interest. In India, car loans come with low interest rates and can be repaid over up to 8 years. Some lenders may offer loans covering up to 100% of the car's on-road price.</p>
      <button className="bg-[#E74C3C] text-white rounded-full px-8 py-4 font-bold text-lg shadow-lg animate-pulse transition-colors duration-300 hover:bg-red-600">FREE Credit Score Check Now</button>
    </section>

    {/* Table Section: Car Loan Comparison Table */}
    <section className="my-10 fade-in-section" id="comparison-table">
      <h2 className="text-2xl font-bold text-[#2E86C1] mb-4">Car Loan Comparison Table</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full text-left border-collapse">
          <thead className="bg-[#2E86C1] text-white">
            <tr>
              <th className="py-3 px-4">Name of the Bank</th>
              <th className="py-3 px-4">Interest Rate (p.a.)</th>
              <th className="py-3 px-4">Tenure</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["State Bank of India", "9.10% p.a. onwards", "Up to 7 years"],
              ["Indian Overseas Bank", "8.60% p.a. onwards", "Up to 7 years"],
              ["IDFC First Bank", "9.99% p.a. onwards", "Up to 10 years"],
              ["Jammu and Kashmir Bank", "RLLR + 0.75% p.a. onwards (floating), RLLR + 0.25% p.a. onwards (fixed)", "Up to 7 years"],
              ["Canara Bank", "8.20% p.a. onwards", "Up to 7 years"],
              ["HDFC Bank", "9.40% p.a. onwards (Rack Interest)", "Up to 7 years"],
              ["IndusInd Bank", "8.00% p.a. onwards", "Up to 5 years"],
              ["ICICI Bank", "9.10% p.a. onwards", "Up to 7 years"],
              ["Karur Vysya Bank", "9.25% p.a. onwards", "Up to 7 years"],
              ["South Indian Bank", "8.75% p.a. onwards", "Up to 7 years"],
              ["Kotak Mahindra Bank", "Contact the bank", "Up to 7 years"],
              ["IDBI Bank", "8.65% p.a. onwards (floating), 9.20% p.a. onwards (fixed)", "Up to 7 years"],
              ["Yes Bank", "Contact the bank", "Up to 8 years"],
              ["Karnataka Bank", "8.80% p.a. onwards", "Up to 7 years"],
              ["Federal Bank of India", "9.00% p.a. onwards", "Up to 7 years"],
              ["Equitas Small Finance Bank", "9.00% p.a. onwards", "Up to 7 years"],
              ["Punjab National Bank", "Floating: 8.35% p.a. onwards, Fixed: 9.35% p.a. onwards", "Up to 7 years"],
              ["Union Bank of India", "8.20% p.a. onwards", "Up to 7 years"],
              ["Axis Bank", "9.40% p.a. onwards", "Up to 7 years"],
              ["Bank of Baroda", "Fixed: 8.80% p.a. onwards, Floating: 8.90% p.a. onwards", "Up to 7 years"],
              ["Tamilnad Mercantile Bank", "10.25% p.a. onwards", "Up to 7 years"],
              ["Bank of India", "8.75% p.a. onwards", "Up to 7 years"],
              ["Bank of Maharashtra", "8.20% p.a. onwards", "Up to 7 years"],
              ["Central Bank of India", "8.35% p.a. onwards", "Up to 7 years"],
              ["Indian Bank", "8.25% p.a. onwards", "Up to 7 years"],
              ["UCO Bank", "8.35% p.a. onwards", "Up to 7 years"],
              ["Bandhan Bank", "8.47% p.a. onwards", "Up to 7 years"],
            ].map((row, i) => (
              <tr key={row[0]} className={i % 2 === 0 ? "bg-white hover:bg-blue-50 transition-colors" : "bg-gray-50 hover:bg-blue-50 transition-colors"}>
                <td className="py-2 px-4">{row[0]}</td>
                <td className="py-2 px-4">{row[1]}</td>
                <td className="py-2 px-4">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="mt-6 bg-[#E74C3C] text-white rounded-full px-6 py-3 font-bold shadow-lg animate-pulse hover:bg-red-600 transition-colors duration-300">Check Your Credit Score for FREE</button>
    </section>

    {/* Promotional Section */}
    <section className="my-12 rounded-xl bg-[#2E86C1] text-white flex flex-col md:flex-row items-center gap-8 px-6 py-10 relative overflow-hidden fade-in-section">
      <div className="flex-1 z-10">
        <h2 className="text-3xl font-bold mb-4">Car Loan in India</h2>
        <ul className="list-disc pl-6 space-y-2 text-lg">
          <li>Purchase Without Full Payment</li>
          <li>Finance Entire On-Road Price</li>
          <li>Simple Approval Process</li>
          <li>Lower Rates for High Credit</li>
        </ul>
      </div>
      <div className="flex-1 flex justify-center z-10">
        {/* Simple SVG car illustration with money/documents icon */}
        <svg width="180" height="100" viewBox="0 0 180 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="30" y="60" width="120" height="30" rx="10" fill="#fff"/>
          <rect x="40" y="40" width="100" height="30" rx="8" fill="#f8fafc"/>
          <circle cx="50" cy="90" r="10" fill="#2E86C1" stroke="#fff" strokeWidth="3"/>
          <circle cx="130" cy="90" r="10" fill="#2E86C1" stroke="#fff" strokeWidth="3"/>
          <rect x="120" y="30" width="20" height="15" rx="3" fill="#FFD700"/>
          <rect x="125" y="33" width="10" height="9" rx="2" fill="#fff"/>
          <rect x="60" y="25" width="30" height="12" rx="2" fill="#4ade80"/>
        </svg>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#2E86C1]/80 to-[#2E86C1]/40 pointer-events-none" />
    </section>

    {/* Types of Car Loans Section */}
    <section className="my-12 fade-in-section" id="types-of-car-loans">
      <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Types of Car Loans</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-lg mb-2 text-[#2E86C1]">New Car Loan</h3>
          <p className="text-gray-700">New car loans can be used to purchase a brand-new car straight out of the showroom. Depending on the bank, the interest rates will vary. Up to 100% of the on-road price of the car may be provided as a loan.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-lg mb-2 text-[#2E86C1]">Used Car Loan</h3>
          <p className="text-gray-700">Lenders offer used car loans up to 80-85% of the price of the car at attractive interest rates for a loan tenure up to 5 years. However, certain lenders will offer loans for cars that have been purchased within the last 5 years.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-lg mb-2 text-[#2E86C1]">Loan against Car</h3>
          <p className="text-gray-700">When one is in dire need of funds, he or she can pledge his or her old car as collateral in order to obtain sufficient funds to purchase a new car. This is known as Loan against Car. If you have a bad credit score, you can pledge your old car to the bank as collateral to obtain some much-needed funds.</p>
        </div>
      </div>
      <button className="mt-8 bg-[#E74C3C] text-white rounded-full px-6 py-3 font-bold shadow-lg animate-pulse hover:bg-red-600 transition-colors duration-300">Check Your Credit Score for FREE</button>
    </section>

    {/* Car Loan Tips Section */}
    <section className="my-12 fade-in-section" id="car-loan-tips">
      <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Car Loan Tips: Save Money and Get Approved Faster</h2>
      <div className="bg-white rounded-lg shadow p-6 text-gray-700">
        <ul className="list-disc pl-6 space-y-2">
          <li>It is vital that you maintain a good credit score when applying for an auto loan. Apart from the loan getting approved quicker, lenders will offer low interest rates if your credit score is good.</li>
          <li>No security or collateral is required when availing car loans. The car acts as the security.</li>
        </ul>
      </div>
      <button className="mt-8 bg-[#E74C3C] text-white rounded-full px-6 py-3 font-bold shadow-lg animate-pulse hover:bg-red-600 transition-colors duration-300">Check Your Credit Score for FREE</button>
    </section>

    {/* Key Components of a Car Loan Section */}
    <section className="my-12 fade-in-section" id="key-components">
      <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Key Components of a Car Loan</h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-lg mb-2 text-[#2E86C1]">Monthly Instalments</h3>
          <p className="text-gray-700">The EMI that must be paid every month. EMI consists of interest and principal amount.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-lg mb-2 text-[#2E86C1]">Down Payment</h3>
          <p className="text-gray-700">The upfront amount paid when you purchase the car.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-lg mb-2 text-[#2E86C1]">Loan Term</h3>
          <p className="text-gray-700">The tenure or duration of the loan. EMIs must be paid for the selected tenure.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-lg mb-2 text-[#2E86C1]">Rate of Interest</h3>
          <p className="text-gray-700">The interest rate charged by the lender on the Vehicle loan that has been availed.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-lg mb-2 text-[#2E86C1]">Principal Amount</h3>
          <p className="text-gray-700">The amount that is borrowed to buy the car. The principal amount does not include any fees or interest levied by the bank.</p>
        </div>
      </div>
      <button className="mt-8 bg-[#E74C3C] text-white rounded-full px-6 py-3 font-bold shadow-lg animate-pulse hover:bg-red-600 transition-colors duration-300">Check Your Credit Score for FREE</button>
    </section>

    {/* How to Apply for a Car Loan Section */}
    <section className="my-12 fade-in-section" id="how-to-apply">
      <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">How to Apply for a Car Loan</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-lg mb-2 text-[#2E86C1]">Online</h3>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>You will need to contact to Bankscart, the official website of the lender to apply for a loan.</li>
            <li>Select Apply Now under the car loan section.</li>
            <li>Enter the relevant details.</li>
            <li>The documents can be uploaded.</li>
            <li>A customer service representative will call you to process the request.</li>
          </ol>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-lg mb-2 text-[#2E86C1]">Offline</h3>
          <ol className="list-decimal pl-6 space-y-2 text-gray-700">
            <li>You can visit the bank branch and apply for a car loan.</li>
            <li>The relevant documents must be submitted.</li>
            <li>Once the verification process is completed, the loan will be provided.</li>
          </ol>
        </div>
      </div>
      <button className="mt-8 bg-[#E74C3C] text-white rounded-full px-6 py-3 font-bold shadow-lg animate-pulse hover:bg-red-600 transition-colors duration-300">Check Your Credit Score for FREE</button>
    </section>

    {/* Eligibility Criteria Section */}
    <section className="my-12 fade-in-section" id="eligibility-criteria">
      <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Eligibility Criteria</h2>
      <div className="bg-white rounded-lg shadow p-6 text-gray-700">
        <ol className="list-decimal pl-6 space-y-2">
          <li>The Age of the individual must be between 18 years and 75 years.</li>
          <li>Minimum net monthly income of Rs. 20,000.</li>
          <li>At least one year of employment with the current employer.</li>
          <li>Must be salaried or self-employed, working for a government establishment or a private company.</li>
        </ol>
      </div>
      <button className="mt-8 bg-[#E74C3C] text-white rounded-full px-6 py-3 font-bold shadow-lg animate-pulse hover:bg-red-600 transition-colors duration-300">Check Your Credit Score for FREE</button>
    </section>

    {/* Documents Required Section */}
    <section className="my-12 fade-in-section" id="documents-required">
      <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Documents Required</h2>
      <div className="overflow-x-auto">
        <table className="min-w-[400px] w-full bg-white rounded-lg shadow text-gray-700">
          <thead className="bg-[#2E86C1] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Requirements</th>
              <th className="py-3 px-4 text-left">Individuals</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="py-2 px-4">Identity proof (any of the following)</td>
              <td className="py-2 px-4">Aadhaar, Passport, Driving license, Voters ID card, PAN card</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-2 px-4">Address proof (any of the following)</td>
              <td className="py-2 px-4">Aadhaar, Passport, Driving license, Ration card, Utility bills</td>
            </tr>
            <tr className="bg-white">
              <td className="py-2 px-4">Proof of income</td>
              <td className="py-2 px-4">Form 16, Salary slips, if you are salaried, Latest Income Tax Returns, Bank statements going back 6 months</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="mt-8 bg-[#E74C3C] text-white rounded-full px-6 py-3 font-bold shadow-lg animate-pulse hover:bg-red-600 transition-colors duration-300">Check Your Credit Score for FREE</button>
    </section>

    {/* Checklist Table Section */}
    <section className="my-12 fade-in-section" id="checklist-table">
      <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Checklist Table</h2>
      <div className="overflow-x-auto">
        <table className="min-w-[600px] w-full bg-white rounded-lg shadow text-gray-700">
          <thead className="bg-[#2E86C1] text-white">
            <tr>
              <th className="py-3 px-4 text-left">Steps</th>
              <th className="py-3 px-4 text-left">Requirement</th>
              <th className="py-3 px-4 text-left">Inference</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white">
              <td className="py-2 px-4">Application</td>
              <td className="py-2 px-4">Compare all offers available</td>
              <td className="py-2 px-4">To find the loan that offers you the highest loan amount and the most affordable interest rate</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-2 px-4">Submit Income Proof</td>
              <td className="py-2 px-4">Bank Statement (last 6 months) Pay-Slips (last 3 months) IT- Returns (last 2 years)</td>
              <td className="py-2 px-4">Lender wants to establish your ability to repay the loan</td>
            </tr>
            <tr className="bg-white">
              <td className="py-2 px-4">Submit Proof of Address and Identity</td>
              <td className="py-2 px-4">PAN Card, Voter's ID, Aadhaar Card, Passport, etc.</td>
              <td className="py-2 px-4">Lender wants to establish your nationality, identity, and permanent address</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-2 px-4">Credit History</td>
              <td className="py-2 px-4">PAN Card</td>
              <td className="py-2 px-4">Lender wants to check your past credit records and establish if you can be trusted to make regular repayments</td>
            </tr>
            <tr className="bg-white">
              <td className="py-2 px-4">Information About Vehicle</td>
              <td className="py-2 px-4">Sales Receipts from the showroom from where the vehicle was purchased</td>
              <td className="py-2 px-4">Lender must confirm that the deal was affected as intended</td>
            </tr>
            <tr className="bg-gray-50">
              <td className="py-2 px-4">Proof of Insurance and Driving License</td>
              <td className="py-2 px-4">Copies of the vehicle's Motor Insurance and your Driving License</td>
              <td className="py-2 px-4">Lender must establish that all laws and protocols are followed with regard to the purchased vehicle.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button className="mt-8 bg-[#E74C3C] text-white rounded-full px-6 py-3 font-bold shadow-lg animate-pulse hover:bg-red-600 transition-colors duration-300">Check Your Credit Score for FREE</button>
    </section>

    {/* EMI Calculator Section (Ultra Legend) */}
    <section className="my-12 fade-in-section" id="emi-calculator">
      <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#E74C3C] via-[#F59E42] to-[#2E86C1] mb-8 text-center drop-shadow-lg">Car Loan EMI Calculator 🚗✨</h2>
      <form
        className="relative bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e0e7ef] rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center border-4 border-[#E74C3C]/10"
        onSubmit={calculateEMI}
        autoComplete="off"
        aria-label="Car Loan EMI Calculator"
      >
        {/* Input Section */}
        <div className="flex-1 min-w-[280px] max-w-md w-full">
          <div className="mb-6">
            <label className="block mb-2 font-bold text-[#2E86C1] text-lg">Loan Amount (₹)</label>
            <input
              type="range"
              min={10000}
              max={10000000}
              step={10000}
              value={loanAmount}
              onChange={e => setLoanAmount(Number(e.target.value))}
              className="w-full accent-[#E74C3C] h-2 rounded-lg appearance-none cursor-pointer mb-2"
            />
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>₹10K</span>
              <span>₹1Cr</span>
            </div>
            <input
              type="number"
              className="w-full border-2 border-[#E74C3C]/30 rounded-xl px-4 py-2 text-lg font-semibold focus:ring-2 focus:ring-[#E74C3C] mb-1 bg-white shadow"
              placeholder="e.g. 500000"
              min={10000}
              max={10000000}
              value={loanAmount}
              onChange={e => setLoanAmount(Number(e.target.value))}
              aria-label="Loan Amount"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-bold text-[#2E86C1] text-lg">Interest Rate (% p.a.)</label>
            <input
              type="range"
              min={0}
              max={50}
              step={0.01}
              value={interestRate}
              onChange={e => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#F59E42] h-2 rounded-lg appearance-none cursor-pointer mb-2"
            />
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>0%</span>
              <span>50%</span>
            </div>
            <input
              type="number"
              step="0.01"
              className="w-full border-2 border-[#F59E42]/30 rounded-xl px-4 py-2 text-lg font-semibold focus:ring-2 focus:ring-[#F59E42] mb-1 bg-white shadow"
              placeholder="e.g. 8.5"
              min={0}
              max={50}
              value={interestRate}
              onChange={e => setInterestRate(Number(e.target.value))}
              aria-label="Interest Rate"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-bold text-[#2E86C1] text-lg">Tenure (years)</label>
            <input
              type="range"
              min={1}
              max={8}
              value={tenure}
              onChange={e => setTenure(Number(e.target.value))}
              className="w-full accent-[#2E86C1] h-2 rounded-lg appearance-none cursor-pointer mb-2"
            />
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>1</span>
              <span>8</span>
            </div>
            <input
              type="number"
              className="w-full border-2 border-[#2E86C1]/30 rounded-xl px-4 py-2 text-lg font-semibold focus:ring-2 focus:ring-[#2E86C1] mb-1 bg-white shadow"
              placeholder="e.g. 5"
              min={1}
              max={8}
              value={tenure}
              onChange={e => setTenure(Number(e.target.value))}
              aria-label="Tenure"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-bold text-[#E74C3C] text-lg">Processing Fee (%)</label>
            <input
              type="range"
              min={0}
              max={10}
              step={0.01}
              value={processingFee}
              onChange={e => setProcessingFee(Number(e.target.value))}
              className="w-full accent-[#E74C3C] h-2 rounded-lg appearance-none cursor-pointer mb-2"
            />
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>0%</span>
              <span>10%</span>
            </div>
            <input
              type="number"
              step="0.01"
              className="w-full border-2 border-[#E74C3C]/30 rounded-xl px-4 py-2 text-lg font-semibold focus:ring-2 focus:ring-[#E74C3C] mb-1 bg-white shadow"
              placeholder="e.g. 1.0"
              min={0}
              max={10}
              value={processingFee}
              onChange={e => setProcessingFee(Number(e.target.value))}
              aria-label="Processing Fee"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#E74C3C] via-[#F59E42] to-[#2E86C1] text-white rounded-full px-8 py-4 font-extrabold text-xl shadow-xl hover:scale-105 transition-transform duration-300 mt-4 tracking-wider animate-pulse"
            disabled={loading}
            aria-busy={loading}
          >
            {loading ? 'Calculating...' : 'Calculate EMI'}
          </button>
          {error && <div className="mt-3 text-red-600 font-semibold text-center animate-pulse">{error}</div>}
        </div>
        {/* Results Section */}
        <div className="flex-1 min-w-[280px] max-w-md w-full flex flex-col items-center justify-center">
          <div className="relative bg-gradient-to-br from-[#2E86C1]/10 via-[#F59E42]/10 to-[#E74C3C]/10 rounded-2xl p-8 shadow-xl w-full">
            <h3 className="font-extrabold text-2xl text-[#2E86C1] mb-4 text-center tracking-wide">Results</h3>
            <div className="flex flex-col gap-3 text-lg md:text-xl">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">Monthly EMI</span>
                <span className="font-black text-[#E74C3C] text-2xl md:text-3xl">₹{emiResult.emi.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">Total Interest Payable</span>
                <span className="font-black text-[#F59E42]">₹{emiResult.totalInterest.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">Total Amount Payable</span>
                <span className="font-black text-[#2E86C1]">₹{emiResult.totalAmount.toLocaleString()}</span>
              </div>
            </div>
            <div className="mt-6 text-center text-sm text-gray-500 italic">* Amortization breakdown will appear here in future updates.</div>
            <div className="absolute -top-8 right-4 animate-bounce">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="24" fill="#E74C3C" fillOpacity="0.15"/>
                <path d="M16 32L32 16M32 16H18M32 16V30" stroke="#E74C3C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>
      </form>
      <div className="flex justify-center mt-8">
        <button className="bg-gradient-to-r from-[#E74C3C] via-[#F59E42] to-[#2E86C1] text-white rounded-full px-8 py-4 font-extrabold text-xl shadow-xl hover:scale-105 transition-transform duration-300 animate-pulse tracking-wider">Check Your Credit Score for FREE</button>
      </div>
    </section>

    {/* FAQ Section */}
    <section className="my-12 fade-in-section" id="faq">
      <h2 className="text-2xl font-bold text-[#2C3E50] mb-4">Frequently Asked Questions (FAQs) about Car Loans</h2>
      <FAQAccordion />
      <button className="mt-8 bg-[#E74C3C] text-white rounded-full px-6 py-3 font-bold shadow-lg animate-pulse hover:bg-red-600 transition-colors duration-300">Check Your Credit Score for FREE</button>
    </section>

    {/* Sticky CTA Button */}
    <button className="fixed bottom-6 right-6 bg-[#E74C3C] text-white rounded-full px-6 py-3 font-bold shadow-lg animate-pulse z-50 hover:bg-red-600 transition-colors">Check Your Credit Score for FREE</button>
  </div>
  );
};


const faqData = [
  {
    q: "What is a car loan?",
    a: "A car loan is a secured loan provided by banks or financial institutions to help you purchase a new or used car, which you repay in EMIs over a fixed tenure."
  },
  {
    q: "Who is eligible for a car loan?",
    a: "Eligibility depends on age, income, employment status, credit score, and other criteria set by the lender. Typically, salaried and self-employed individuals aged 18-75 can apply."
  },
  {
    q: "What is the maximum loan amount I can get?",
    a: "You can get up to 100% of the car's on-road price, depending on the lender and your eligibility."
  },
  {
    q: "What is the typical tenure for a car loan?",
    a: "Car loan tenures usually range from 1 to 8 years."
  },
  {
    q: "What is the interest rate for car loans?",
    a: "Interest rates vary by lender, your credit profile, and the type of car. Rates typically start from 8% p.a. onwards."
  },
  {
    q: "Can I get a car loan for a used car?",
    a: "Yes, many banks offer loans for used cars, usually up to 80-85% of the car's value."
  },
  {
    q: "Is a down payment required?",
    a: "Most lenders require a down payment, but some may offer 100% financing for select customers."
  },
  {
    q: "What documents are required for a car loan?",
    a: "Common documents include identity proof, address proof, income proof, bank statements, and car-related documents."
  },
  {
    q: "How is EMI calculated?",
    a: "EMI is calculated based on the loan amount, interest rate, and tenure using the reducing balance method."
  },
  {
    q: "Can I prepay or foreclose my car loan?",
    a: "Yes, but some lenders may charge a prepayment or foreclosure penalty. Check with your lender for details."
  },
  {
    q: "What happens if I miss an EMI payment?",
    a: "Missing an EMI can attract penalties, impact your credit score, and may lead to repossession of the car if defaults continue."
  },
  {
    q: "Can I get a car loan with a low credit score?",
    a: "It is possible, but you may get a lower loan amount or higher interest rate. Some lenders may reject your application."
  },
  {
    q: "Is it better to take a fixed or floating interest rate?",
    a: "Fixed rates offer stability in EMIs, while floating rates may change with market conditions. Choose based on your risk preference."
  },
  {
    q: "Can I transfer my car loan to another bank?",
    a: "Yes, through a balance transfer, you can move your loan to another bank offering better terms."
  },
  {
    q: "Are there tax benefits on car loans?",
    a: "Tax benefits are available only for commercial vehicles or if the car is used for business purposes. Personal car loans do not offer tax benefits."
  },
  {
    q: "How long does it take to get a car loan approved?",
    a: "Approval can be instant to a few days, depending on your profile and document verification."
  },
  {
    q: "Can I get a car loan without income proof?",
    a: "Most lenders require income proof, but some may offer loans against collateral or to select customers."
  },
  {
    q: "What is the processing fee for a car loan?",
    a: "Processing fees vary by lender, typically ranging from 0.5% to 2% of the loan amount."
  },
  {
    q: "What is the minimum CIBIL score required?",
    a: "A CIBIL score of 700+ is generally preferred, but some lenders may approve loans for lower scores with stricter terms."
  },
  {
    q: "Can NRIs apply for car loans in India?",
    a: "Yes, many banks offer car loans to NRIs, subject to specific eligibility and documentation."
  },
  {
    q: "What is hypothecation in a car loan?",
    a: "Hypothecation means the car is pledged as collateral to the lender until the loan is repaid."
  },
  {
    q: "Can I sell my car before repaying the loan?",
    a: "You need to clear the outstanding loan and remove hypothecation before selling the car."
  },
  {
    q: "What is the difference between on-road and ex-showroom price?",
    a: "Ex-showroom price is the car's price at the dealer, while on-road price includes taxes, insurance, and registration. Loans are usually based on the on-road price."
  },
  {
    q: "How do I remove hypothecation after loan closure?",
    a: "After repaying the loan, collect the NOC from the lender and submit it to the RTO to remove hypothecation from your RC."
  }
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div className="space-y-3">
      {faqData.map((item, idx) => (
        <div key={idx} className="border rounded-lg bg-white shadow">
          <button
            className="w-full flex justify-between items-center px-4 py-3 text-left font-semibold text-[#2E86C1] focus:outline-none focus:ring transition-colors duration-200 hover:bg-blue-50"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
            aria-controls={`faq-panel-${idx}`}
          >
            <span>{item.q}</span>
            <svg className={`w-5 h-5 ml-2 transform transition-transform duration-300 ${openIndex === idx ? 'rotate-180' : ''}`} fill="none" stroke="#2E86C1" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <div
            id={`faq-panel-${idx}`}
            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-40 py-2 px-4' : 'max-h-0 py-0 px-4'}`}
            style={{background: openIndex === idx ? '#f0f6fa' : 'white'}}
            aria-hidden={openIndex !== idx}
          >
            <p className="text-gray-700 text-base">{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CarLoanPage;
