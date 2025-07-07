import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from 'react-countup';
import ApplyButton from '../components/common/ApplyButton'; // Add this line
// import Swiper from 'swiper'; // For testimonials carousel (add if needed)

// --- Education Loan Page for BanksCart ---
const EducationLoanPage = ({ openApplyModal }) => {
  // Sticky header scroll state
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Header removed as requested

  // --- Back to Top Button ---
  const BackToTop = () => (
    <button
      onClick={() => scrollToSection('hero-section')}
      className={`fixed bottom-8 right-8 z-50 bg-[#2563eb] text-white p-3 rounded-full shadow-lg transition-opacity duration-300 ${showTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      aria-label="Back to Top"
      tabIndex={showTop ? 0 : -1}
    >
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 15l-6-6-6 6"/></svg>
    </button>
  );
  // Calculator State
  const [amount, setAmount] = useState(500000);
  const [tenure, setTenure] = useState(5);
  const [rate, setRate] = useState(8.5);
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  useEffect(() => {
    // Calculate EMI
    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const months = parseInt(tenure * 12);
    if (!principal || !annualRate || !months) {
      setEmi(0); setTotalInterest(0); setTotalPayment(0); return;
    }
    const monthlyRate = annualRate / 12 / 100;
    const emiVal = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPay = emiVal * months;
    const totalInt = totalPay - principal;
    setEmi(emiVal); setTotalInterest(totalInt); setTotalPayment(totalPay);
  }, [amount, rate, tenure]);

  // --- Hero Section ---
  const HeroSection = () => (
    <section id="hero-section" className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] py-16 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold mb-4 font-inter">Fund Your Dreams with Smart Education Loans</h1>
          <h2 className="text-2xl font-medium mb-6 font-poppins">Get instant pre-approval with competitive rates starting from 8.5% APR. Your educational journey starts here.</h2>
          <div className="flex items-center space-x-4 mb-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-[#10b981] to-[#059669] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition"
              onClick={() => {
                const el = document.getElementById('education-loan-calculator');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              aria-label="Scroll to Education Loan Calculator"
            >
              Calculate Your Loan
            </motion.button>
            {openApplyModal && (
              <ApplyButton
                loanType="Education Loan"
                openApplyModal={openApplyModal}
                className="bg-white text-[#2563eb] px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-50 transition"
              >
                Get Pre-Approved Now
              </ApplyButton>
            )}
          </div>
          <div className="flex items-center space-x-6 mt-6">
            <div className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <span className="mr-2">🔒</span> 100% Secure
            </div>
            <div className="flex items-center bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <span className="mr-2">🎓</span> 2 Million+ Students Funded
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center relative">
          {/* Animated Hero Illustration */}
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} className="w-80 h-80 bg-gradient-to-br from-[#10b981] to-[#f59e0b] rounded-3xl flex items-center justify-center shadow-lg">
            {/* SVG illustration of students */}
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="90" cy="170" rx="70" ry="10" fill="#e0e7ef"/>
              <rect x="60" y="80" width="60" height="40" rx="16" fill="#2563eb"/>
              <circle cx="90" cy="70" r="24" fill="#10b981" stroke="#fff" strokeWidth="4"/>
              <rect x="80" y="40" width="20" height="20" rx="6" fill="#fff"/>
              <rect x="110" y="100" width="20" height="8" rx="3" fill="#fff"/>
              <rect x="50" y="100" width="20" height="8" rx="3" fill="#fff"/>
              {/* Graduation cap */}
              <polygon points="90,30 120,40 90,50 60,40" fill="#1f2937"/>
              <rect x="87" y="50" width="6" height="12" fill="#1f2937"/>
              {/* Floating books */}
              <rect x="30" y="120" width="24" height="8" rx="2" fill="#f59e0b"/>
              <rect x="126" y="120" width="24" height="8" rx="2" fill="#f59e0b"/>
            </svg>
          </motion.div>
        </div>
      </div>
    </section>
  );

  // --- Calculator Section ---
  const CalculatorSection = () => (
    <section id="education-loan-calculator" className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-[#2563eb] mb-8 text-center font-inter">See What You Can Afford</h2>
      <div className="max-w-3xl mx-auto bg-[#f9fafb] rounded-xl p-8 shadow-lg">
        <div className="mb-6">
          <label className="block font-semibold mb-2">Loan Amount (₹50,000 - ₹50,00,000)</label>
          <input type="range" min="50000" max="5000000" step="10000" value={amount} onChange={e => setAmount(e.target.value)} className="w-full" />
          <div className="text-right text-sm text-gray-500">₹{parseInt(amount).toLocaleString()}</div>
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Loan Tenure (1-15 years)</label>
          <input type="range" min="1" max="15" value={tenure} onChange={e => setTenure(e.target.value)} className="w-full" />
          <div className="text-right text-sm text-gray-500">{tenure} years</div>
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-2">Interest Rate (% p.a.)</label>
          <input type="number" min="8.5" max="16" step="0.01" value={rate} onChange={e => setRate(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-xs text-gray-500">Monthly EMI</div>
            <div className="text-xl font-bold text-[#10b981]">
              ₹<CountUp end={emi ? Math.round(emi) : 0} duration={0.8} separator="," />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-xs text-gray-500">Total Interest</div>
            <div className="text-xl font-bold text-[#f59e0b]">
              ₹<CountUp end={totalInterest ? Math.round(totalInterest) : 0} duration={0.8} separator="," />
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-xs text-gray-500">Total Payment</div>
            <div className="text-xl font-bold text-[#2563eb]">
              ₹<CountUp end={totalPayment ? Math.round(totalPayment) : 0} duration={0.8} separator="," />
            </div>
          </div>
        </motion.div>
        {openApplyModal && (
          <ApplyButton
            loanType="Education Loan"
            openApplyModal={openApplyModal}
            className="bg-gradient-to-r from-[#10b981] to-[#059669] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition w-full"
          >
            Apply for This Amount
          </ApplyButton>
        )}
      </div>
    </section>
  );

  // --- Features & Benefits Section ---
  const FeaturesSection = () => {
    const features = [
      {
        icon: <motion.span animate={{ rotate: [0, 20, -20, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-block">⚡</motion.span>,
        title: "Lightning Fast Approval",
        text: "Get approval in as little as 24 hours with our AI-powered assessment"
      },
      {
        icon: <motion.span animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-block">%</motion.span>,
        title: "Competitive Rates",
        text: "Starting from 8.5% APR with flexible repayment options"
      },
      {
        icon: <motion.span animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-block">📱</motion.span>,
        title: "100% Digital Process",
        text: "Complete application from home - no branch visits required"
      },
      {
        icon: <motion.span animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="inline-block">🎓</motion.span>,
        title: "Covers Everything",
        text: "Tuition, accommodation, travel, equipment - we've got you covered"
      }
    ];
    return (
      <section id="features-section" className="py-16 bg-[#f9fafb]">
        <h2 className="text-3xl font-bold text-[#2563eb] mb-8 text-center font-inter">Why Choose BanksCart for Education Loans?</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {features.map((f, i) => (
            <motion.div key={i} whileHover={{ y: -8, boxShadow: "0 8px 24px rgba(37,99,235,0.08)" }} className="bg-white rounded-2xl p-8 flex flex-col items-center shadow transition cursor-pointer">
              <div className="text-4xl mb-4">{f.icon}</div>
              <div className="font-bold text-lg mb-2 text-[#1f2937]">{f.title}</div>
              <div className="text-[#6b7280] text-center">{f.text}</div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  };

  // --- Loan Types Section ---
  const LoanTypesSection = () => (
    <section id="loan-types-section" className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-[#2563eb] mb-8 text-center font-inter">Education Loans Tailored for You</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <motion.div whileHover={{ y: -8, boxShadow: "0 8px 24px rgba(16,185,129,0.08)" }} className="bg-[#f9fafb] rounded-2xl p-8 shadow flex flex-col items-start">
          <div className="text-2xl font-bold mb-2 text-[#2563eb]">Domestic Education Loan</div>
          <ul className="text-[#374151] space-y-2">
            <li>For studies within India</li>
            <li>Up to ₹20 Lakhs</li>
            <li>Flexible repayment up to 15 years</li>
            <li>Minimal documentation</li>
          </ul>
        </motion.div>
        <motion.div whileHover={{ y: -8, boxShadow: "0 8px 24px rgba(245,158,11,0.08)" }} className="bg-[#f9fafb] rounded-2xl p-8 shadow flex flex-col items-start">
          <div className="text-2xl font-bold mb-2 text-[#10b981]">International Education Loan</div>
          <ul className="text-[#374151] space-y-2">
            <li>For overseas education</li>
            <li>Up to ₹1 Crore</li>
            <li>Currency hedge options</li>
            <li>Forex card benefits</li>
          </ul>
        </motion.div>
        <motion.div whileHover={{ y: -8, boxShadow: "0 8px 24px rgba(37,99,235,0.08)" }} className="bg-[#f9fafb] rounded-2xl p-8 shadow flex flex-col items-start">
          <div className="text-2xl font-bold mb-2 text-[#f59e0b]">Skill Development Loan</div>
          <ul className="text-[#374151] space-y-2">
            <li>For professional courses</li>
            <li>Quick processing</li>
            <li>Competitive rates</li>
            <li>Career guidance support</li>
          </ul>
        </motion.div>
      </div>
    </section>
  );

  // --- Application Process Section ---
  const ApplicationProcessSection = () => {
    const steps = [
      {
        title: "Apply Online",
        time: "5 minutes",
        desc: "Fill basic details, upload documents",
        icon: "📝"
      },
      {
        title: "Instant Assessment",
        time: "2 hours",
        desc: "AI-powered evaluation, credit score check",
        icon: "🤖"
      },
      {
        title: "Quick Approval",
        time: "24 hours",
        desc: "Document verification, final approval",
        icon: "✅"
      },
      {
        title: "Fund Disbursement",
        time: "48 hours",
        desc: "Direct to institution, track your loan",
        icon: "💸"
      }
    ];
    return (
      <section id="process-section" className="py-16 bg-[#f9fafb]">
        <h2 className="text-3xl font-bold text-[#2563eb] mb-8 text-center font-inter">Simple 4-Step Process</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }} className="flex flex-col items-center bg-white rounded-2xl p-8 shadow w-64 mb-8 md:mb-0">
              <div className="text-4xl mb-4">{step.icon}</div>
              <div className="font-bold text-lg mb-2 text-[#1f2937]">{step.title}</div>
              <div className="text-[#6b7280] mb-2">{step.desc}</div>
              <div className="text-xs text-[#10b981]">{step.time}</div>
            </motion.div>
          ))}
        </div>
      </section>
    );
  };

  // --- Eligibility & Documents Section ---
  const EligibilityDocumentsSection = () => (
    <section id="eligibility-section" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-2xl font-bold text-[#2563eb] mb-4">Eligibility Criteria</h3>
          <ul className="list-disc pl-6 space-y-3 text-lg text-[#374151]">
            <li>Age: 18-35 years</li>
            <li>Indian citizen/NRI</li>
            <li>Admission secured in recognized institution</li>
            <li>Co-applicant with steady income</li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-[#2563eb] mb-4">Required Documents</h3>
          <ul className="list-disc pl-6 space-y-3 text-lg text-[#374151]">
            <li>Admission letter</li>
            <li>Academic transcripts</li>
            <li>Income proof</li>
            <li>Identity & address proof</li>
            <li>Bank statements</li>
          </ul>
        </div>
      </div>
    </section>
  );

  // --- Testimonials Section (Stub) ---
  const TestimonialsSection = () => (
    <section id="testimonials-section" className="py-16 bg-[#f9fafb]">
      <h2 className="text-3xl font-bold text-[#2563eb] mb-8 text-center font-inter">Success Stories from Our Students</h2>
      {/* Swiper carousel or similar can be added here */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {/* Example testimonial */}
        <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-2xl p-8 shadow flex flex-col items-center w-80">
          <img src="/students/student1.jpg" alt="Student" className="w-20 h-20 rounded-full mb-4 border-4 border-[#2563eb]" />
          <div className="text-lg font-semibold mb-2 text-[#1f2937]">Priya S., MBA from IIM</div>
          <div className="text-[#6b7280] mb-2 text-center">“BanksCart made my education dream a reality. The process was smooth and transparent!”</div>
          <div className="flex items-center space-x-1 mb-2">{[...Array(5)].map((_,i)=>(<span key={i}>⭐</span>))}</div>
          <img src="/universities/iim.png" alt="IIM" className="w-12 h-12" />
        </motion.div>
        {/* Add more testimonials as needed */}
      </div>
    </section>
  );

  // --- Interest Rates & Fees Section ---
  const RatesFeesSection = () => (
    <section id="rates-section" className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-[#2563eb] mb-8 text-center font-inter">Transparent Pricing, No Hidden Fees</h2>
      <div className="max-w-4xl mx-auto bg-[#f9fafb] rounded-xl p-8 shadow-lg">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-2 text-[#10b981]">Base Rates</h4>
            <ul className="text-[#374151] space-y-2">
              <li>Starting from 8.5%</li>
              <li>Varies by loan amount, course type, institution ranking, applicant profile</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2 text-[#f59e0b]">Fee Structure</h4>
            <ul className="text-[#374151] space-y-2">
              <li>Processing fee: 0.5% of loan amount <span title="One-time fee for processing your application">ℹ️</span></li>
              <li>Prepayment: No charges after 1 year <span title="You can prepay after 1 year without penalty">ℹ️</span></li>
              <li>Late payment: 2% per month <span title="Charged on overdue EMI">ℹ️</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );

  // --- FAQ Section ---
  const FAQSection = () => {
    const faqs = [
      { q: "What is the maximum loan amount?", a: "Up to ₹1 Crore for international education loans." },
      { q: "How long does approval take?", a: "Approval can be as fast as 24 hours after document verification." },
      { q: "Can I prepay my loan?", a: "Yes, you can prepay after 1 year with no charges." },
      { q: "What if I don't get admission?", a: "Loan disbursal is subject to admission confirmation." },
      { q: "Is collateral required?", a: "For higher amounts, collateral may be required. Many loans up to ₹7.5L are collateral-free." },
      { q: "How is interest calculated?", a: "On reducing balance method." },
      { q: "What about loan moratorium?", a: "You can get a moratorium period during your course and up to 1 year after." },
      { q: "Can parents be co-applicants?", a: "Yes, a parent or guardian is usually required as co-applicant." },
    ];
    const [open, setOpen] = useState(null);
    return (
      <section id="faq-section" className="py-16 bg-[#f9fafb]">
        <h2 className="text-3xl font-bold text-[#2563eb] mb-8 text-center font-inter">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border rounded-lg p-4 bg-white shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)} className="flex items-center w-full text-left focus:outline-none">
                <span className="font-semibold text-lg">{faq.q}</span>
                <span className="ml-auto text-2xl">{open === i ? "-" : "+"}</span>
              </button>
              {open === i && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-gray-700">
                  {faq.a}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  };

  // --- Final CTA Section ---
  const FinalCTASection = () => (
    <section id="final-cta-section" className="py-16 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white text-center relative overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 font-inter">Your Education Journey Starts Here</h2>
        <div className="text-xl mb-8 font-poppins">Join 2 Million+ students who trusted BanksCart for their education dreams</div>
        {openApplyModal && (
          <ApplyButton
            loanType="Education Loan"
            openApplyModal={openApplyModal}
            className="bg-gradient-to-r from-[#10b981] to-[#059669] text-white px-12 py-5 rounded-full font-bold text-2xl shadow-lg transition mb-6"
          >
            Start Your Application
          </ApplyButton>
        )}
        <div className="flex justify-center items-center space-x-6 mt-6">
          <a href="tel:+1800123456" className="flex items-center space-x-2 hover:underline"><span>📞</span> <span>1800-123-456</span></a>
          <a href="https://wa.me/1800123456" className="flex items-center space-x-2 hover:underline"><span>💬</span> <span>WhatsApp</span></a>
          <a href="mailto:support@bankscart.com" className="flex items-center space-x-2 hover:underline"><span>✉️</span> <span>Email</span></a>
        </div>
      </div>
    </section>
  );

  // --- Main Render ---
  return (
    <div className="min-h-screen bg-[#f9fafb] font-inter text-[#1f2937]">
      {/* Header removed as requested */}
      {BackToTop()}
      <div className="pt-20 md:pt-24">
        {HeroSection()}
        {CalculatorSection()}
        {FeaturesSection()}
        {LoanTypesSection()}
        {ApplicationProcessSection()}
        {EligibilityDocumentsSection()}
        {TestimonialsSection()}
        {RatesFeesSection()}
        {FAQSection()}
        {FinalCTASection()}
      </div>
      {/* Footer, trust badges, etc. can be added here */}
    </div>
  );
}

export default EducationLoanPage;
