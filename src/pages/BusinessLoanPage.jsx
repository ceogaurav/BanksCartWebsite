import React, { useState, useEffect } from "react";
// Import icons and animation libraries as needed
import { Menu, X, Briefcase, CreditCard, Home, Shield, Trophy, Star, Banknote, Lock, Unlock, TrendingUp, Calendar, Phone, FileText, CheckCircle, Users, Settings, PieChart, Mail } from "lucide-react";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Move style/font injection into a custom hook for best practice
function useBusinessLoanPageAssets() {
  useEffect(() => {
    // Google Fonts
    if (typeof document !== 'undefined' && !document.getElementById('google-fonts')) {
      const link = document.createElement('link');
      link.id = 'google-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Poppins:wght@700&display=swap';
      document.head.appendChild(link);
    }
    // CSS Animations
    if (typeof document !== 'undefined' && !document.getElementById('blp-style')) {
      const style = `
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&family=Poppins:wght@700&display=swap');
.font-poppins { font-family: 'Poppins', sans-serif; }
.font-opensans { font-family: 'Open Sans', sans-serif; }
.slide-in-left { animation: slideInLeft 0.8s both; }
.slide-in-right { animation: slideInRight 0.8s both; }
.slide-in-bottom { animation: slideInBottom 0.8s both; }
.slide-in-top { animation: slideInTop 0.8s both; }
@keyframes slideInLeft { from { transform: translateX(-100px); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes slideInRight { from { transform: translateX(100px); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes slideInBottom { from { transform: translateY(50px); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes slideInTop { from { transform: translateY(-50px); opacity: 0; } to { transform: none; opacity: 1; } }
.card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
.card-hover:hover { transform: translateY(-10px); box-shadow: 0 10px 25px rgba(0,0,0,0.15); }
.btn-primary { transition: all 0.3s ease; }
.btn-primary:hover { transform: scale(1.05); box-shadow: 0 5px 15px rgba(0,0,0,0.2); }
`;
      const styleTag = document.createElement('style');
      styleTag.id = 'blp-style';
      styleTag.innerHTML = style;
      document.head.appendChild(styleTag);
    }
  }, []);
}

const BusinessLoanPage = () => {
  useBusinessLoanPageAssets();
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);
  const navItems = [
    { label: 'Cards', icon: <CreditCard size={18} />, dropdown: ['Credit Cards', 'Debit Cards', 'Prepaid Cards'] },
    { label: 'Loans', icon: <Briefcase size={18} />, dropdown: ['Personal Loans', 'Business Loans', 'Home Loans'] },
    { label: 'Investments', icon: <TrendingUp size={18} />, dropdown: ['Mutual Funds', 'Stocks', 'Bonds'] },
    { label: 'Insurance', icon: <Shield size={18} />, dropdown: ['Health', 'Life', 'Vehicle'] },
  ];
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white/60 to-blue-50/80">
      <nav className="text-sm text-gray-500 py-2 px-4 md:px-12">
        Home &gt; <span className="text-blue-700 font-medium">Business Loan</span>
      </nav>
      <section className="relative flex flex-col items-center justify-center py-12 md:py-20 bg-gradient-to-br from-white/60 to-blue-50/80 overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Business Loan</h1>
        <h2 className="text-lg md:text-2xl text-gray-700 mb-2 text-center max-w-2xl">A business loan is financial assistance provided to small businesses and entrepreneurs to meet their capital requirements. These loans are used to fund various aspects of the business, like expansion, growth, and other business activities.</h2>
        <p className="text-gray-600 mb-6 text-center max-w-2xl">In India, a lot of leading banks offer business loans to entrepreneurs and businessmen at competitive rates of interest. Read on to know more about the business loans offered in India.</p>
        <button className="btn-primary bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow-lg animate-bounce hover:scale-105 transition">FREE Credit Score - Check Now</button>
        {/* Floating animated icons, background shapes, etc. */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {/* Add animated SVGs or Lottie here */}
        </div>
      </section>
      <section className="py-12 bg-white">
        <h3 className="text-2xl font-bold text-center mb-8">Key Benefits of Business Loans</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* Animated cards for each benefit */}
          <div className="card-hover p-6 bg-blue-50 rounded-lg shadow slide-in-left">
            {/* Icon */}
            <div className="mb-4">💰</div>
            <div className="font-semibold mb-2">Easy Access to Funds</div>
            <div className="text-gray-600 text-sm">Applying for a business loan gives easy access to funds at a competitive rate of interest for business expansion and growth.</div>
          </div>
          <div className="card-hover p-6 bg-blue-50 rounded-lg shadow slide-in-bottom">
            <div className="mb-4">🔄</div>
            <div className="font-semibold mb-2">Improved Cash Flow</div>
            <div className="text-gray-600 text-sm">Getting a business loan improves the cash flow in the business. This ensures smooth day-to-day operations, allowing for timely payment of suppliers, salaries, and other operational expenses.</div>
          </div>
          <div className="card-hover p-6 bg-blue-50 rounded-lg shadow slide-in-right">
            <div className="mb-4">🧾</div>
            <div className="font-semibold mb-2">Tax Benefits</div>
            <div className="text-gray-600 text-sm">The interest paid on a business loan often comes with tax benefits as a business expense. This can reduce your taxable income, potentially lowering your overall tax liability.</div>
          </div>
          <div className="card-hover p-6 bg-blue-50 rounded-lg shadow slide-in-top">
            <div className="mb-4">🛡️</div>
            <div className="font-semibold mb-2">No Ownership Dilution</div>
            <div className="text-gray-600 text-sm">A business loan allows you to retain complete ownership and control over your business decisions and future profits. You only repay the borrowed amount with interest.</div>
          </div>
        </div>
      </section>
      <section className="py-12 bg-gradient-to-r from-blue-50 to-white">
        <h3 className="text-2xl font-bold text-center mb-8">How Business Loans Work</h3>
        <div className="flex flex-col items-center justify-center">
          {/* Modern animated stepper/infographic */}
          <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-4xl">
            {/* Stepper */}
            <div className="flex flex-row md:flex-col gap-6 md:gap-8 items-center md:items-start">
              {/* Step 1 */}
              <div className="flex flex-col items-center group">
                <Users className="w-10 h-10 text-blue-600 bg-blue-100 rounded-full p-2 group-hover:bg-blue-600 group-hover:text-white transition" />
                <div className="mt-2 font-semibold text-gray-700">Apply Online</div>
                <div className="text-xs text-gray-500 text-center max-w-[120px]">Fill out a simple application form with your business details.</div>
              </div>
              {/* Connector */}
              <div className="hidden md:block w-1 h-8 bg-blue-200 mx-auto" />
              {/* Step 2 */}
              <div className="flex flex-col items-center group">
                <FileText className="w-10 h-10 text-blue-600 bg-blue-100 rounded-full p-2 group-hover:bg-blue-600 group-hover:text-white transition" />
                <div className="mt-2 font-semibold text-gray-700">Document Verification</div>
                <div className="text-xs text-gray-500 text-center max-w-[120px]">Upload KYC, financials, and business documents for verification.</div>
              </div>
              <div className="hidden md:block w-1 h-8 bg-blue-200 mx-auto" />
              {/* Step 3 */}
              <div className="flex flex-col items-center group">
                <Settings className="w-10 h-10 text-blue-600 bg-blue-100 rounded-full p-2 group-hover:bg-blue-600 group-hover:text-white transition" />
                <div className="mt-2 font-semibold text-gray-700">Processing & Approval</div>
                <div className="text-xs text-gray-500 text-center max-w-[120px]">Bank reviews your application and processes the loan.</div>
              </div>
              <div className="hidden md:block w-1 h-8 bg-blue-200 mx-auto" />
              {/* Step 4 */}
              <div className="flex flex-col items-center group">
                <Banknote className="w-10 h-10 text-blue-600 bg-blue-100 rounded-full p-2 group-hover:bg-blue-600 group-hover:text-white transition" />
                <div className="mt-2 font-semibold text-gray-700">Disbursal</div>
                <div className="text-xs text-gray-500 text-center max-w-[120px]">Funds are credited directly to your business account.</div>
              </div>
            </div>
            {/* Animated infographic/visual */}
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-72 h-72 md:w-80 md:h-80">
                {/* Animated circle background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-100 via-blue-50 to-white animate-pulse-slow" />
                {/* Central icon */}
                <Briefcase className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 text-blue-500 drop-shadow-lg" />
                {/* Decorative floating icons */}
                <CreditCard className="absolute left-4 top-8 w-8 h-8 text-orange-400 animate-float" />
                <PieChart className="absolute right-6 top-16 w-8 h-8 text-green-500 animate-float2" />
                <Calendar className="absolute left-10 bottom-8 w-8 h-8 text-purple-400 animate-float3" />
                <CheckCircle className="absolute right-8 bottom-10 w-8 h-8 text-blue-400 animate-float4" />
              </div>
            </div>
          </div>
        </div>
        {/* Custom keyframes for floating icons */}
        <style>{`
          @keyframes float { 0% { transform: translateY(0); } 50% { transform: translateY(-12px); } 100% { transform: translateY(0); } }
          @keyframes float2 { 0% { transform: translateY(0); } 50% { transform: translateY(10px); } 100% { transform: translateY(0); } }
          @keyframes float3 { 0% { transform: translateX(0); } 50% { transform: translateX(-10px); } 100% { transform: translateX(0); } }
          @keyframes float4 { 0% { transform: translateX(0); } 50% { transform: translateX(10px); } 100% { transform: translateX(0); } }
          .animate-float { animation: float 3s ease-in-out infinite; }
          .animate-float2 { animation: float2 2.5s ease-in-out infinite; }
          .animate-float3 { animation: float3 3.2s ease-in-out infinite; }
          .animate-float4 { animation: float4 2.8s ease-in-out infinite; }
          .animate-pulse-slow { animation: pulse 4s cubic-bezier(.4,0,.6,1) infinite; }
          @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
        `}</style>
      </section>
      <section className="py-12 bg-white">
        <h3 className="text-2xl font-bold text-center mb-8">Business Loan Interest Rates by Top Banks in India</h3>
        <div className="overflow-x-auto max-w-4xl mx-auto">
          <table className="min-w-full bg-white border rounded-lg shadow-lg">
            <thead>
              <tr className="bg-blue-100 text-blue-900 text-base">
                <th className="py-3 px-4 text-left">Lender</th>
                <th className="py-3 px-4 text-left">Interest Rate <span className="text-xs text-gray-400" title="Indicative range, may vary">ⓘ</span></th>
                <th className="py-3 px-4 text-left">Loan Amount</th>
                <th className="py-3 px-4 text-left">Loan Tenure</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-blue-50 transition slide-in-left group">
                <td className="py-3 px-4 flex items-center gap-2 font-semibold">
                  <img src="/images/hdfc.png" alt="HDFC Bank" className="w-7 h-7 rounded shadow-sm" />
                  HDFC Bank
                </td>
                <td className="py-3 px-4">10.75% - 22.50% p.a.</td>
                <td className="py-3 px-4">Rs.50,000 to Rs.50 lakh</td>
                <td className="py-3 px-4">12-48 months</td>
              </tr>
              <tr className="hover:bg-blue-50 transition slide-in-bottom group">
                <td className="py-3 px-4 flex items-center gap-2 font-semibold">
                  <img src="/images/iifl.png" alt="IIFL" className="w-7 h-7 rounded shadow-sm" />
                  IIFL
                </td>
                <td className="py-3 px-4">Up to 36% p.a.</td>
                <td className="py-3 px-4">Rs.1 lakh to Rs.50 lakh</td>
                <td className="py-3 px-4">12-60 months</td>
              </tr>
              <tr className="hover:bg-blue-50 transition slide-in-right group">
                <td className="py-3 px-4 flex items-center gap-2 font-semibold">
                  <img src="/images/piramal.png" alt="Piramal Capital" className="w-7 h-7 rounded shadow-sm bg-white" />
                  Piramal Capital
                </td>
                <td className="py-3 px-4">16% - 25% p.a.</td>
                <td className="py-3 px-4">Rs.5 lakh to Rs.30 lakh</td>
                <td className="py-3 px-4">Up to 10 years</td>
              </tr>
              <tr className="hover:bg-blue-50 transition slide-in-top group">
                <td className="py-3 px-4 flex items-center gap-2 font-semibold">
                  <img src="/images/poonawalla.png" alt="Poonawalla Fincorp" className="w-7 h-7 rounded shadow-sm bg-white" />
                  Poonawalla Fincorp
                </td>
                <td className="py-3 px-4">15% p.a. onwards</td>
                <td className="py-3 px-4">Up to Rs.75 lakh</td>
                <td className="py-3 px-4">Up to 48 months</td>
              </tr>
              <tr className="hover:bg-blue-50 transition group">
                <td className="py-3 px-4 flex items-center gap-2 font-semibold">
                  <img src="/images/kotak.png" alt="Kotak Mahindra Bank" className="w-7 h-7 rounded shadow-sm bg-white" />
                  Kotak Mahindra Bank
                </td>
                <td className="py-3 px-4" title="Contact bank for latest rates">Contact bank</td>
                <td className="py-3 px-4">Up to Rs.1 crore</td>
                <td className="py-3 px-4">Up to 48 months</td>
              </tr>
            </tbody>
          </table>
          <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full"></span> Rates and terms are indicative. Please check with the respective bank for the latest details.
          </div>
        </div>
      </section>
      <section className="py-12 bg-blue-50">
        <h3 className="text-2xl font-bold text-center mb-4">Why Choose Us?</h3>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 text-lg">Empowering your business with transparent, fast, and reliable loan solutions. Discover why thousands of entrepreneurs trust us for their financial growth.</p>
        {/* Highlight stats row */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-10">
          <div className="flex items-center gap-2 bg-white rounded-lg shadow px-6 py-3 card-hover">
            <Shield className="text-blue-600 w-7 h-7" />
            <span className="font-semibold text-lg">India's Most Trusted Platform</span>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-lg shadow px-6 py-3 card-hover">
            <Trophy className="text-orange-500 w-7 h-7" />
            <span className="font-semibold text-lg">10+ Years of Excellence</span>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-lg shadow px-6 py-3 card-hover">
            <Star className="text-yellow-400 w-7 h-7" />
            <span className="font-semibold text-lg">4.8/5 Customer Reviews</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="card-hover p-6 bg-white rounded-lg shadow flex flex-col items-center text-center animate__animated animate__fadeInUp" style={{ animationDelay: '0.1s' }}>
            <Banknote className="w-10 h-10 text-blue-500 mb-3" />
            <div className="font-semibold mb-2">20+ Partner Banks/NBFCs</div>
            <div className="text-gray-500 text-sm">Wide network for best offers</div>
          </div>
          <div className="card-hover p-6 bg-white rounded-lg shadow flex flex-col items-center text-center animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
            <Unlock className="w-10 h-10 text-green-500 mb-3" />
            <div className="font-semibold mb-2">Secured & Unsecured Options</div>
            <div className="text-gray-500 text-sm">Flexible collateral choices</div>
          </div>
          <div className="card-hover p-6 bg-white rounded-lg shadow flex flex-col items-center text-center animate__animated animate__fadeInUp" style={{ animationDelay: '0.3s' }}>
            <TrendingUp className="w-10 h-10 text-orange-500 mb-3" />
            <div className="font-semibold mb-2">Working Capital & Top-Up Loans</div>
            <div className="text-gray-500 text-sm">Boost your business growth</div>
          </div>
          <div className="card-hover p-6 bg-white rounded-lg shadow flex flex-col items-center text-center animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
            <Calendar className="w-10 h-10 text-purple-500 mb-3" />
            <div className="font-semibold mb-2">Flexible Tenure Up to 4 Years</div>
            <div className="text-gray-500 text-sm">Repayment on your terms</div>
          </div>
        </div>
        {/* Animate.css CDN for fadeInUp effect */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
      </section>
      <section className="py-12 bg-white">
        <h3 className="text-2xl font-bold text-center mb-4">How to Apply for a Business Loan</h3>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 text-lg">Applying for a business loan is simple and quick. Just follow these easy steps to get started on your funding journey.</p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-12">
          {/* Animated stepper */}
          <div className="flex flex-col gap-6 w-full max-w-md">
            {/* Step 1 */}
            <div className="flex items-center gap-4 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold text-lg border-2 border-blue-400">1</div>
              <div className="flex items-center gap-2 text-lg font-medium"><Phone className="w-6 h-6 text-blue-500" /> Enter mobile number</div>
            </div>
            {/* Step 2 */}
            <div className="flex items-center gap-4 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold text-lg border-2 border-blue-400">2</div>
              <div className="flex items-center gap-2 text-lg font-medium"><Shield className="w-6 h-6 text-green-500" /> OTP verification</div>
            </div>
            {/* Step 3 */}
            <div className="flex items-center gap-4 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold text-lg border-2 border-blue-400">3</div>
              <div className="flex items-center gap-2 text-lg font-medium"><FileText className="w-6 h-6 text-orange-500" /> Provide personal details</div>
            </div>
            {/* Step 4 */}
            <div className="flex items-center gap-4 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold text-lg border-2 border-blue-400">4</div>
              <div className="flex items-center gap-2 text-lg font-medium"><Banknote className="w-6 h-6 text-purple-500" /> Select bank account</div>
            </div>
            {/* Step 5 */}
            <div className="flex items-center gap-4 animate__animated animate__fadeInLeft" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold text-lg border-2 border-blue-400">5</div>
              <div className="flex items-center gap-2 text-lg font-medium"><CheckCircle className="w-6 h-6 text-blue-400" /> Compare offers and apply</div>
            </div>
          </div>
          {/* Modern progress bar with step indicators */}
          <div className="flex flex-col items-center gap-4 mt-10 md:mt-0">
            <div className="relative w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all" style={{ width: '80%' }}></div>
              {/* Step dots */}
              <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-2">
                {[1,2,3,4,5].map((n, i) => (
                  <div key={n} className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold ${i < 4 ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-blue-300 text-blue-500'}`}>{n}</div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center mt-2">
              <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 shadow-sm animate__animated animate__fadeInUp">
                <CheckCircle className="w-5 h-5 text-green-500 animate-bounce" />
                <span className="font-semibold text-blue-700">You're just 5 steps away from your business loan!</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-2">You're just 5 steps away from your business loan!</div>
          </div>
        </div>
        {/* Animate.css CDN for fadeInLeft effect */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
      </section>
      <section className="py-12 bg-blue-50">
        <h3 className="text-2xl font-bold text-center mb-8">Types of Business Loans</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="card-hover p-6 bg-white rounded-lg shadow flex flex-col items-center text-center animate__animated animate__fadeInUp" style={{ animationDelay: '0.1s' }}>
            <Briefcase className="w-9 h-9 text-blue-600 mb-2" />
            <div className="font-semibold mb-1">Term Loans</div>
            <div className="text-gray-500 text-xs">Fixed repayment schedule for business expansion or asset purchase.</div>
          </div>
          <div className="card-hover p-6 bg-white rounded-lg shadow flex flex-col items-center text-center animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
            <PieChart className="w-9 h-9 text-green-500 mb-2" />
            <div className="font-semibold mb-1">Working Capital Loan</div>
            <div className="text-gray-500 text-xs">Short-term funding to manage daily business operations.</div>
          </div>
          <div className="card-hover p-6 bg-white rounded-lg shadow flex flex-col items-center text-center animate__animated animate__fadeInUp" style={{ animationDelay: '0.3s' }}>
            <Users className="w-9 h-9 text-orange-500 mb-2" />
            <div className="font-semibold mb-1">Small Business Loans</div>
            <div className="text-gray-500 text-xs">Tailored for MSMEs and startups to fuel growth.</div>
          </div>
          <div className="card-hover p-6 bg-white rounded-lg shadow flex flex-col items-center text-center animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
            <CreditCard className="w-9 h-9 text-purple-500 mb-2" />
            <div className="font-semibold mb-1">Line of Credit</div>
            <div className="text-gray-500 text-xs">Flexible borrowing up to a set limit, pay interest only on what you use.</div>
          </div>
          <div className="card-hover p-6 bg-white rounded-lg shadow flex flex-col items-center text-center animate__animated animate__fadeInUp" style={{ animationDelay: '0.5s' }}>
            <Unlock className="w-9 h-9 text-blue-400 mb-2" />
            <div className="font-semibold mb-1">Unsecured Term Loans</div>
            <div className="text-gray-500 text-xs">No collateral required, quick approval for eligible businesses.</div>
          </div>
          <div className="card-hover p-6 bg-white rounded-lg shadow flex flex-col items-center text-center animate__animated animate__fadeInUp" style={{ animationDelay: '0.6s' }}>
            <Lock className="w-9 h-9 text-red-500 mb-2" />
            <div className="font-semibold mb-1">Secured Term Loans</div>
            <div className="text-gray-500 text-xs">Backed by collateral, often with lower interest rates.</div>
          </div>
          <div className="card-hover p-6 bg-white rounded-lg shadow flex flex-col items-center text-center animate__animated animate__fadeInUp" style={{ animationDelay: '0.7s' }}>
            <FileText className="w-9 h-9 text-yellow-500 mb-2" />
            <div className="font-semibold mb-1">Professional Loans</div>
            <div className="text-gray-500 text-xs">For doctors, CAs, and professionals to grow their practice.</div>
          </div>
          <div className="card-hover p-6 bg-white rounded-lg shadow flex flex-col items-center text-center animate__animated animate__fadeInUp" style={{ animationDelay: '0.8s' }}>
            <Settings className="w-9 h-9 text-teal-500 mb-2" />
            <div className="font-semibold mb-1">Machinery Finance</div>
            <div className="text-gray-500 text-xs">Finance for purchasing or upgrading business equipment.</div>
          </div>
        </div>
        {/* Animate.css CDN for fadeInUp effect */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
      </section>
      <section className="py-12 bg-white">
        <h3 className="text-2xl font-bold text-center mb-8">Business Loan EMI Calculator</h3>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Interactive EMI Calculator Widget */}
          <EMICalculator />
          {/* Pie chart or eligibility meter */}
          <div className="w-64 h-64 bg-white rounded-full shadow flex items-center justify-center">
            <EMIPieChart />
          </div>
        </div>
      </section>
      <section className="py-12 bg-blue-50">
        <h3 className="text-2xl font-bold text-center mb-8">Quick Apply for Business Loan</h3>
        <div className="flex justify-center">
          <MultiStepBusinessLoanForm />
        </div>
      </section>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Floating chat button */}
        <button className="bg-blue-700 text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center text-3xl animate-bounce">💬</button>
      </div>
    </div>
  );
};

function EMICalculator() {
  const [amount, setAmount] = React.useState(500000);
  const [rate, setRate] = React.useState(15);
  const [tenure, setTenure] = React.useState(36);

  // EMI calculation
  const r = rate / 12 / 100;
  const n = tenure;
  const emi = amount && rate && tenure
    ? Math.round((amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1))
    : 0;
  const total = emi * n;
  const interest = total - amount;

  // For Pie Chart
  window.__emiPie = { principal: amount, interest };

  return (
    <div className="w-80 bg-blue-50 p-6 rounded-lg shadow flex flex-col gap-4 animate__animated animate__fadeInLeft">
      <div className="font-semibold text-lg mb-2 text-blue-700">EMI Calculator</div>
      <label className="text-sm font-medium">Loan Amount (₹)</label>
      <input type="range" min="50000" max="5000000" step="10000" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full accent-blue-500" />
      <div className="flex justify-between text-xs text-gray-500 mb-2"><span>50K</span><span>50L</span></div>
      <input type="number" min="50000" max="5000000" step="10000" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full mb-2 p-2 rounded border" />
      <label className="text-sm font-medium">Interest Rate (% p.a.)</label>
      <input type="range" min="8" max="36" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full accent-orange-500" />
      <div className="flex justify-between text-xs text-gray-500 mb-2"><span>8%</span><span>36%</span></div>
      <input type="number" min="8" max="36" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full mb-2 p-2 rounded border" />
      <label className="text-sm font-medium">Tenure (months)</label>
      <input type="range" min="12" max="84" step="1" value={tenure} onChange={e => setTenure(Number(e.target.value))} className="w-full accent-green-500" />
      <div className="flex justify-between text-xs text-gray-500 mb-2"><span>12</span><span>84</span></div>
      <input type="number" min="12" max="84" step="1" value={tenure} onChange={e => setTenure(Number(e.target.value))} className="w-full mb-2 p-2 rounded border" />
      <div className="mt-4 p-3 bg-white rounded shadow text-center">
        <div className="text-xs text-gray-500">Estimated EMI</div>
        <div className="text-2xl font-bold text-blue-700">₹{emi.toLocaleString()}</div>
        <div className="text-xs text-gray-500 mt-1">Total Interest: <span className="text-orange-500 font-semibold">₹{interest.toLocaleString()}</span></div>
        <div className="text-xs text-gray-500">Total Payment: <span className="text-green-600 font-semibold">₹{total.toLocaleString()}</span></div>
      </div>
    </div>
  );
}

function EMIPieChart() {
  // Get values from window.__emiPie (set by EMICalculator)
  const [pie, setPie] = React.useState({ principal: 500000, interest: 0 });
  React.useEffect(() => {
    const handler = () => setPie({ ...(window.__emiPie || { principal: 500000, interest: 0 }) });
    window.addEventListener('input', handler);
    return () => window.removeEventListener('input', handler);
  }, []);
  const total = pie.principal + pie.interest;
  const percent = total ? (pie.interest / total) * 100 : 0;
  // Pie chart SVG
  const r = 90, c = 2 * Math.PI * r;
  const interestStroke = (percent / 100) * c;
  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <circle cx="100" cy="100" r={r} fill="#f3f4f6" />
      <circle
        cx="100" cy="100" r={r}
        fill="none"
        stroke="#f59e42"
        strokeWidth="18"
        strokeDasharray={`${interestStroke} ${c - interestStroke}`}
        strokeDashoffset={c * 0.25}
        style={{ transition: 'stroke-dasharray 0.6s' }}
      />
      <text x="100" y="90" textAnchor="middle" fontSize="1.2em" fill="#2563eb" fontWeight="bold">EMI</text>
      <text x="100" y="115" textAnchor="middle" fontSize="1.5em" fill="#2563eb" fontWeight="bold">₹{(pie.principal + pie.interest) ? Math.round((pie.principal + pie.interest) / (pie.principal ? (pie.principal + pie.interest) / pie.principal : 1)) : 0}</text>
      <text x="100" y="140" textAnchor="middle" fontSize="0.9em" fill="#f59e42">Interest</text>
      <text x="100" y="155" textAnchor="middle" fontSize="0.9em" fill="#2563eb">Principal</text>
    </svg>
  );
}

// Multi-step form component for Quick Apply
function MultiStepBusinessLoanForm() {
  const steps = [
    {
      label: 'Your Name',
      icon: <Users className="w-6 h-6 text-blue-500" />,
      field: 'name',
      placeholder: 'Enter your full name',
      type: 'text',
      validate: v => v.trim().length > 2 || 'Name is required',
    },
    {
      label: 'Mobile Number',
      icon: <Phone className="w-6 h-6 text-green-500" />,
      field: 'mobile',
      placeholder: '10-digit mobile number',
      type: 'tel',
      validate: v => /^\d{10}$/.test(v) || 'Enter a valid 10-digit mobile',
    },
    {
      label: 'Email',
      icon: <Mail className="w-6 h-6 text-orange-500" />,
      field: 'email',
      placeholder: 'Enter your email address',
      type: 'email',
      validate: v => /.+@.+\..+/.test(v) || 'Enter a valid email',
    },
    {
      label: 'Business Details',
      icon: <Briefcase className="w-6 h-6 text-purple-500" />,
      field: 'business',
      placeholder: 'Business name/type',
      type: 'text',
      validate: v => v.trim().length > 2 || 'Business details required',
    },
    {
      label: 'Review & Submit',
      icon: <CheckCircle className="w-6 h-6 text-blue-600" />,
      field: 'review',
    },
  ];
  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState({ name: '', mobile: '', email: '', business: '' });
  const [error, setError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleNext = () => {
    if (step < steps.length - 1) {
      const s = steps[step];
      if (s.validate) {
        const valid = s.validate(form[s.field]);
        if (valid !== true) {
          setError(valid);
          return;
        }
      }
      setError('');
      setStep(step + 1);
    } else if (step === steps.length - 1) {
      setSubmitting(true);
      setTimeout(() => {
        setSubmitting(false);
        setSuccess(true);
      }, 1200);
    }
  };
  const handleBack = () => {
    if (step > 0) {
      setError('');
      setStep(step - 1);
    }
  };
  const handleChange = e => {
    setForm({ ...form, [steps[step].field]: e.target.value });
    setError('');
  };

  if (success) {
    return (
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-md flex flex-col items-center animate__animated animate__fadeInUp">
        <CheckCircle className="w-14 h-14 text-green-500 mb-4 animate-bounce" />
        <div className="text-xl font-bold mb-2 text-blue-700">Application Submitted!</div>
        <div className="text-gray-600 mb-4 text-center">Thank you for applying. Our team will contact you soon to discuss your business loan options.</div>
        <button className="btn-primary bg-orange-500 text-white px-6 py-2 rounded mt-2" onClick={() => { setStep(0); setForm({ name: '', mobile: '', email: '', business: '' }); setSuccess(false); }}>Apply Again</button>
      </div>
    );
  }

  return (
    <form className="bg-white p-8 rounded-lg shadow w-full max-w-md animate__animated animate__fadeInUp" onSubmit={e => { e.preventDefault(); handleNext(); }}>
      {/* Progress bar */}
      <div className="flex items-center justify-center mb-6">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center">
            <div className={`rounded-full border-2 flex items-center justify-center w-8 h-8 text-lg font-bold transition-all duration-300 ${i < step ? 'bg-blue-500 border-blue-500 text-white' : i === step ? 'bg-white border-orange-400 text-orange-500' : 'bg-gray-100 border-gray-300 text-gray-400'}`}>{s.icon}</div>
            {i < steps.length - 1 && <div className={`w-8 h-1 ${i < step ? 'bg-blue-500' : 'bg-gray-200'} mx-1 rounded`}></div>}
          </div>
        ))}
      </div>
      {/* Step content */}
      <div className="mb-6 min-h-[60px]">
        {step < steps.length - 1 ? (
          <div className="flex flex-col gap-2 animate__animated animate__fadeInRight">
            <label className="font-semibold text-gray-700 mb-1">{steps[step].label}</label>
            <input
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-base"
              type={steps[step].type}
              placeholder={steps[step].placeholder}
              value={form[steps[step].field]}
              onChange={handleChange}
              autoFocus
            />
            {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
          </div>
        ) : (
          <div className="animate__animated animate__fadeInRight">
            <div className="font-semibold text-gray-700 mb-2">Review your details:</div>
            <div className="bg-blue-50 rounded p-3 mb-2"><b>Name:</b> {form.name}</div>
            <div className="bg-blue-50 rounded p-3 mb-2"><b>Mobile:</b> {form.mobile}</div>
            <div className="bg-blue-50 rounded p-3 mb-2"><b>Email:</b> {form.email}</div>
            <div className="bg-blue-50 rounded p-3 mb-2"><b>Business:</b> {form.business}</div>
          </div>
        )}
      </div>
      {/* Navigation buttons */}
      <div className="flex justify-between items-center mt-4">
        <button type="button" className="text-blue-500 font-semibold px-4 py-2 rounded hover:underline disabled:opacity-50" onClick={handleBack} disabled={step === 0 || submitting}>Back</button>
        <button type="submit" className="btn-primary bg-orange-500 text-white px-6 py-2 rounded shadow disabled:opacity-50 flex items-center gap-2" disabled={submitting}>
          {submitting ? <span className="animate-spin mr-2">⏳</span> : null}
          {step < steps.length - 1 ? 'Next' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default BusinessLoanPage;
