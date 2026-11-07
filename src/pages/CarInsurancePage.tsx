import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ApplyButton from '../components/common/ApplyButton';
import {
  Car,
  Shield,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  Building2,
  Clock,
  Sparkles,
  Award,
  IndianRupee,
  FileCheck,
  Percent,
  Calculator,
  Lock,
  ArrowRight,
  Star,
  Check,
  Sliders,
  PhoneCall,
  Wrench,
  Fuel,
  AlertTriangle,
  RotateCcw,
  Zap
} from 'lucide-react';

interface CarInsurancePageProps {
  openApplyModal?: (loanType?: string) => void;
}

interface InsurerRow {
  name: string;
  tagline: string;
  garages: string;
  csr: string;
  startingPrice: string;
  keyBenefit: string;
  badge?: string;
}

const CAR_INSURERS: InsurerRow[] = [
  {
    name: "HDFC ERGO Car Insurance",
    tagline: "Overnight Repair Service & 2.5 Min Claim Approval",
    garages: "8,500+",
    csr: "91.2%",
    startingPrice: "₹2,094/yr",
    keyBenefit: "Zero paperwork, self-inspection video claims via mobile app",
    badge: "Top Choice"
  },
  {
    name: "ICICI Lombard Motor",
    tagline: "InstaSpect Digital Survey & High Cashless Garage Density",
    garages: "7,800+",
    csr: "89.5%",
    startingPrice: "₹2,094/yr",
    keyBenefit: "Digital instant claims settlement within 30 minutes for minor damages",
    badge: "Fast Settlement"
  },
  {
    name: "Tata AIG Auto Secure",
    tagline: "Comprehensive Add-On Bundles with Free Key Replacement",
    garages: "6,500+",
    csr: "86.8%",
    startingPrice: "₹2,094/yr",
    keyBenefit: "High customer satisfaction rating, emergency fuel delivery & RSA",
  },
  {
    name: "Bajaj Allianz DriveSmart",
    tagline: "Motor On-The-Spot Claim Settlement",
    garages: "6,000+",
    csr: "88.0%",
    startingPrice: "₹2,094/yr",
    keyBenefit: "Immediate surveyor allocation, 24/7 spot assistance across national highways",
  },
  {
    name: "Reliance General Motor",
    tagline: "Affordable Comprehensive Coverage for Indian Metros",
    garages: "5,000+",
    csr: "84.5%",
    startingPrice: "₹2,094/yr",
    keyBenefit: "Free pickup and drop facility for repair at select cashless garages",
  }
];

const CarInsurancePage: React.FC<CarInsurancePageProps> = ({ openApplyModal }) => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Quick Hero Form States
  const [carNumber, setCarNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [cityRto, setCityRto] = useState('');

  // Interactive Calculator States
  const [carAgeGroup, setCarAgeGroup] = useState<'new' | '1-2' | '3-5' | '5+'>('1-2');
  const [idvValue, setIdvValue] = useState<number>(600000); // 6 Lakhs default
  const [ncbPercentage, setNcbPercentage] = useState<number>(25); // 25% default
  const [zeroDep, setZeroDep] = useState<boolean>(true);
  const [engineProtect, setEngineProtect] = useState<boolean>(true);
  const [rsa, setRsa] = useState<boolean>(true);

  // Dynamic Car Insurance Premium Logic
  const calculateCarPremium = () => {
    // IRDAI Mandated Third Party (TP) base rate for private cars (1000cc - 1500cc)
    const thirdPartyBase = 3416;

    // Own Damage (OD) base tariff rate (approx 2.8% to 3.2% of IDV depending on age)
    let odRate = 0.031;
    if (carAgeGroup === 'new') odRate = 0.033;
    if (carAgeGroup === '3-5') odRate = 0.029;
    if (carAgeGroup === '5+') odRate = 0.027;

    const baseOwnDamage = Math.round(idvValue * odRate);

    // NCB discount applies strictly to Own Damage (OD)
    const ncbDiscount = Math.round((baseOwnDamage * ncbPercentage) / 100);
    const netOwnDamage = Math.max(1200, baseOwnDamage - ncbDiscount);

    // Add-on calculations
    let addOnsTotal = 0;
    if (zeroDep) addOnsTotal += Math.round(idvValue * 0.009); // Zero Dep ~0.9% of IDV
    if (engineProtect) addOnsTotal += Math.round(idvValue * 0.0035); // Engine Protect ~0.35%
    if (rsa) addOnsTotal += 499; // Standard RSA add-on

    const netPremium = netOwnDamage + thirdPartyBase + addOnsTotal;
    const gst18 = Math.round(netPremium * 0.18);
    const totalPayable = netPremium + gst18;

    return {
      baseOwnDamage,
      ncbDiscount,
      netOwnDamage,
      thirdPartyBase,
      addOnsTotal,
      gst18,
      totalPayable
    };
  };

  const calculated = calculateCarPremium();

  const handleApply = (planName?: string) => {
    const loanType = planName || `Car Insurance - IDV ₹${(idvValue / 100000).toFixed(1)}L (NCB ${ncbPercentage}%)`;
    if (openApplyModal) {
      openApplyModal(loanType);
    } else {
      navigate('/loan-apply', { state: { loanType } });
    }
  };

  const handleQuickQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const details = carNumber ? `Car Reg: ${carNumber.toUpperCase()}` : 'Quick Quote';
    handleApply(`Car Insurance - ${details}`);
  };

  const faqs = [
    {
      q: "What is the difference between Comprehensive and Third-Party car insurance?",
      a: "Third-Party insurance is mandatory by law under the Motor Vehicles Act, 1988, covering damages, injury, or death to external third parties. It does not cover your own car. Comprehensive car insurance covers both third-party liabilities and damages to your own vehicle caused by accidents, fire, theft, floods, and natural calamities."
    },
    {
      q: "What is Insured Declared Value (IDV) and how is it calculated?",
      a: "IDV is the maximum sum insured payable by the insurer in case of total loss (theft or damage beyond repair). It represents the manufacturer's selling price of the vehicle minus IRDAI-mandated depreciation slabs based on the car's age (e.g. 5% for up to 6 months, 20% for 1-2 years, up to 50% for 4-5 years)."
    },
    {
      q: "How does the No Claim Bonus (NCB) work and can I transfer it?",
      a: "NCB is a reward discount given by insurers on the Own Damage premium for every consecutive claim-free year, scaling from 20% in Year 1 up to a maximum of 50% in Year 5. Crucially, NCB belongs to the car owner, not the vehicle. You can obtain an NCB Retention Certificate to transfer your full discount to a brand-new car."
    },
    {
      q: "Why is Zero Depreciation (Bumper-to-Bumper) add-on essential?",
      a: "In standard car claims, insurers deduct up to 50% depreciation on plastic, rubber, and glass parts, and up to 30% on metal components. With a Zero Depreciation add-on, the insurer pays the complete replacement cost of all parts without any depreciation deductions, saving you thousands in out-of-pocket expenses."
    },
    {
      q: "What is a Cashless Garage Network?",
      a: "A network of automobile repair centers partnering directly with your insurance company (over 5,000+ garages on BanksCart). When you repair your vehicle at a network garage, the insurer pays the repair bill directly to the garage. You only pay the mandatory compulsory deductible (usually ₹1,000 for private cars below 1500cc)."
    },
    {
      q: "Can I renew an expired car insurance policy without physical inspection?",
      a: "Yes. For policies expired within 90 days, you can renew digitally on BanksCart by conducting a quick 2-minute self-inspection video or photo upload via your smartphone, eliminating the need to wait for a physical surveyor."
    },
    {
      q: "Does car insurance cover water damage to the engine during monsoons?",
      a: "Standard comprehensive policies exclude engine damage caused by hydrostatic lock (cranking an engine submerged in floodwaters). To ensure complete coverage against water ingression and oil leakage, you must opt for the Engine & Gearbox Protection add-on."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-20 sm:pt-24 pb-16">
      <Helmet>
        <title>Car Insurance Online: Compare Quotes & Renew Instantly - BanksCart</title>
        <meta 
          name="description" 
          content="Compare car insurance quotes online from HDFC ERGO, ICICI Lombard, Tata AIG & Bajaj Allianz. Up to 50% NCB discount, 5,000+ cashless garages & instant 2-minute policy issuance." 
        />
        <link rel="canonical" href="https://bankscart.com/insurance/car" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Breadcrumb path={["Home", "Insurance", "Car Insurance"]} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Section */}
        <section className="bg-slate-900 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute -right-8 -bottom-10 opacity-5 select-none pointer-events-none">
            <span className="text-[220px] font-black text-white leading-none">AUTO</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Hero Pitch */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-3.5 py-1 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <Shield className="w-3.5 h-3.5 text-amber-400" />
                IRDAI Authorized Motor Insurance Aggregator
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
                Compare & Save Up to 50% on <br />
                <span className="text-amber-400">Car Insurance Online</span>
              </h1>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-normal">
                Protect your vehicle with top insurers in India. Enjoy cashless repairs at 5,000+ network garages, instant NCB transfer, zero paperwork, and 2-minute digital policy issuance.
              </p>

              {/* Quick Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800">
                <div>
                  <div className="text-xs font-bold text-white font-mono tabular-nums">5,000+</div>
                  <div className="text-[11px] text-slate-400">Cashless Garages</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono tabular-nums">Up to 50%</div>
                  <div className="text-[11px] text-slate-400">NCB Discount</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">2 Minutes</div>
                  <div className="text-[11px] text-slate-400">Instant Policy</div>
                </div>
                <div>
                  <div className="text-xs font-bold text-white">24/7 Roadside</div>
                  <div className="text-[11px] text-slate-400">Assistance (RSA)</div>
                </div>
              </div>
            </div>

            {/* Right Quick Quote Card */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-100">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
                <div>
                  <h3 className="font-bold text-base text-slate-900">Instant Quote in 2 Minutes</h3>
                  <p className="text-xs text-slate-500">Save up to ₹8,000 on policy renewals</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Car className="w-5 h-5" />
                </div>
              </div>

              <form onSubmit={handleQuickQuoteSubmit} className="space-y-4">
                <div>
                  <label htmlFor="hero-car-reg-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Car Registration Number
                  </label>
                  <input
                    id="hero-car-reg-input"
                    type="text"
                    value={carNumber}
                    onChange={(e) => setCarNumber(e.target.value.toUpperCase())}
                    placeholder="e.g. DL-01-AB-1234 or MH-02-CD-5678"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-mono text-sm uppercase focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">Brand new car? Enter your city/RTO below</span>
                </div>

                <div>
                  <label htmlFor="hero-mobile-input" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mobile Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-slate-300 bg-slate-50 text-slate-500 text-xs font-bold font-mono">
                      +91
                    </span>
                    <input
                      id="hero-mobile-input"
                      type="tel"
                      maxLength={10}
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 10-digit mobile"
                      required
                      className="w-full px-3.5 py-2.5 rounded-r-xl border border-slate-300 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <Calculator className="w-4 h-4" />
                  View Personalized Quotes &rarr;
                </button>
              </form>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Zero Spam Promise
                </span>
                <span className="flex items-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  Free Claims Support
                </span>
              </div>
            </div>

          </div>
        </section>

        {/* Interactive Car Premium & IDV Calculator */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 mb-12 shadow-sm">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Sliders className="w-3.5 h-3.5" />
              Live Motor Tariff Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Car Insurance Premium & NCB Calculator
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Adjust vehicle IDV, claim-free bonus slabs, and critical add-ons to preview exact annual premiums with zero surprises.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Vehicle Age Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
                  Vehicle Age Category
                </label>
                <div className="grid grid-cols-4 gap-2.5">
                  {[
                    { id: 'new', label: 'Brand New' },
                    { id: '1-2', label: '1 - 2 Years' },
                    { id: '3-5', label: '3 - 5 Years' },
                    { id: '5+', label: 'Over 5 Yrs' }
                  ].map((ageItem) => (
                    <button
                      key={ageItem.id}
                      type="button"
                      onClick={() => setCarAgeGroup(ageItem.id as any)}
                      className={`py-2.5 px-2 rounded-xl border text-center font-bold text-xs transition-all ${
                        carAgeGroup === ageItem.id
                          ? 'border-blue-700 bg-blue-50 text-blue-800 ring-1 ring-blue-700'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {ageItem.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* IDV Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="car-idv-slider" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Insured Declared Value (IDV)
                  </label>
                  <span className="text-sm font-bold text-blue-700 font-mono tabular-nums bg-blue-50 px-2.5 py-0.5 rounded-md">
                    ₹{(idvValue / 100000).toFixed(2)} Lakhs
                  </span>
                </div>
                <input
                  id="car-idv-slider"
                  type="range"
                  min="200000"
                  max="2500000"
                  step="50000"
                  value={idvValue}
                  onChange={(e) => setIdvValue(parseInt(e.target.value))}
                  aria-label="Insured Declared Value Slider"
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                  <span>₹2 Lakhs</span>
                  <span>₹10 Lakhs</span>
                  <span>₹18 Lakhs</span>
                  <span>₹25 Lakhs</span>
                </div>
              </div>

              {/* NCB Slabs Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
                  Existing No Claim Bonus (NCB) Discount Slab
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { slab: 0, label: "0%" },
                    { slab: 20, label: "20%" },
                    { slab: 25, label: "25%" },
                    { slab: 35, label: "35%" },
                    { slab: 50, label: "50% (Max)" }
                  ].map((ncbItem) => (
                    <button
                      key={ncbItem.slab}
                      type="button"
                      onClick={() => setNcbPercentage(ncbItem.slab)}
                      className={`py-2 px-1 rounded-xl border text-center font-bold text-xs font-mono transition-all ${
                        ncbPercentage === ncbItem.slab
                          ? 'border-emerald-600 bg-emerald-600 text-white shadow-sm'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {ncbItem.label}
                    </button>
                  ))}
                </div>
                <span className="text-[11px] text-slate-500 mt-1.5 block">
                  Applicable discount on Own Damage premium for consecutive claim-free policy years.
                </span>
              </div>

              {/* Add-On Toggles */}
              <div className="space-y-2.5 pt-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                  Select Recommended Add-On Covers
                </label>

                {/* Zero Dep */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                      ZD
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm block">Zero Depreciation Cover (Bumper to Bumper)</span>
                      <span className="text-[11px] text-slate-500">100% claim on plastic, rubber & metal components</span>
                    </div>
                  </div>
                  <input
                    id="car-zero-dep-toggle"
                    type="checkbox"
                    checked={zeroDep}
                    onChange={(e) => setZeroDep(e.target.checked)}
                    aria-label="Zero depreciation cover"
                    className="w-5 h-5 rounded text-blue-700 focus:ring-blue-500 cursor-pointer"
                  />
                </div>

                {/* Engine Protect */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                      EP
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm block">Engine & Gearbox Protection</span>
                      <span className="text-[11px] text-slate-500">Safeguards against hydrostatic lock and water ingression in rains</span>
                    </div>
                  </div>
                  <input
                    id="car-engine-protect-toggle"
                    type="checkbox"
                    checked={engineProtect}
                    onChange={(e) => setEngineProtect(e.target.checked)}
                    aria-label="Engine and gearbox protection"
                    className="w-5 h-5 rounded text-blue-700 focus:ring-blue-500 cursor-pointer"
                  />
                </div>

                {/* RSA */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      RSA
                    </div>
                    <div>
                      <span className="font-bold text-slate-900 text-xs sm:text-sm block">24/7 Roadside Assistance (RSA)</span>
                      <span className="text-[11px] text-slate-500">Emergency towing, flat tyre repair, emergency fuel & battery jumpstart</span>
                    </div>
                  </div>
                  <input
                    id="car-rsa-toggle"
                    type="checkbox"
                    checked={rsa}
                    onChange={(e) => setRsa(e.target.checked)}
                    aria-label="24/7 roadside assistance"
                    className="w-5 h-5 rounded text-blue-700 focus:ring-blue-500 cursor-pointer"
                  />
                </div>
              </div>

            </div>

            {/* Calculated Output Card */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20 inline-block">
                Transparent Tariff Breakdown
              </span>

              <div className="pb-6 border-b border-slate-800">
                <span className="text-xs text-slate-400 block font-medium">Net Annual Premium (inc. 18% GST)</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono tabular-nums">
                    ₹{calculated.totalPayable.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">/ year</span>
                </div>
                <span className="text-xs text-emerald-400 font-medium block mt-1.5 font-mono">
                  ✔ You save ₹{calculated.ncbDiscount.toLocaleString('en-IN')} with {ncbPercentage}% NCB discount
                </span>
              </div>

              {/* Itemized Calculation */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Base Own Damage (OD):</span>
                  <span className="font-bold text-white font-mono tabular-nums">₹{calculated.baseOwnDamage.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400 font-medium">NCB Discount ({ncbPercentage}%):</span>
                  <span className="font-bold text-emerald-400 font-mono tabular-nums">-₹{calculated.ncbDiscount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Third-Party Cover (IRDAI Mandatory):</span>
                  <span className="font-bold text-white font-mono tabular-nums">₹{calculated.thirdPartyBase.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Selected Add-on Covers:</span>
                  <span className="font-bold text-white font-mono tabular-nums">₹{calculated.addOnsTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Goods & Service Tax (18% GST):</span>
                  <span className="font-bold text-slate-300 font-mono tabular-nums">₹{calculated.gst18.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleApply()}
                className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Apply for Policy at this Rate &rarr;
              </button>

              <p className="text-[10px] text-slate-400 text-center leading-normal">
                Compulsory deductible of ₹1,000 applies per accident claim under IRDAI guidelines.
              </p>
            </div>

          </div>
        </section>

        {/* Top Motor Insurers Comparison Table */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 mb-12 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Compare Top Car Insurance Companies in India
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Verified figures from official IRDAI public disclosures and authorized network garage directories.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg whitespace-nowrap self-start sm:self-auto">
              Updated: Q1 2026
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-800">
                  <th className="p-3.5 font-bold">Insurance Provider & Feature</th>
                  <th className="p-3.5 font-bold">Cashless Garages</th>
                  <th className="p-3.5 font-bold">Settlement Ratio (CSR)</th>
                  <th className="p-3.5 font-bold">Starting Price</th>
                  <th className="p-3.5 font-bold">Key Benefit</th>
                  <th className="p-3.5 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CAR_INSURERS.map((insurer, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                        {insurer.name}
                        {insurer.badge && (
                          <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
                            {insurer.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 font-normal block mt-0.5">{insurer.tagline}</span>
                    </td>
                    <td className="p-3.5 font-bold text-slate-800 font-mono tabular-nums">{insurer.garages}</td>
                    <td className="p-3.5 font-bold text-emerald-700 font-mono tabular-nums">{insurer.csr}</td>
                    <td className="p-3.5 font-bold text-slate-900 font-mono tabular-nums">{insurer.startingPrice}</td>
                    <td className="p-3.5 text-slate-600 text-xs leading-relaxed max-w-xs">{insurer.keyBenefit}</td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleApply(insurer.name)}
                        className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs transition-colors whitespace-nowrap shadow-sm"
                      >
                        Get Quote
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 4 Types of Motor Insurance */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 mb-12 shadow-sm">
          <div className="max-w-3xl mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Types of Motor Insurance Policies
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Understand the legal requirements and scope of protection under each car insurance category.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 hover:border-blue-200 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Third-Party Liability</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Mandatory under Indian law. Covers death, physical injury, and property damage caused to external third parties.
              </p>
              <span className="text-[11px] font-bold text-blue-700 font-mono">Rates fixed by IRDAI</span>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 hover:border-blue-200 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                <Car className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Comprehensive Cover</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                All-in-one protection covering third-party liability plus own damage from accidents, fires, theft, and natural floods.
              </p>
              <span className="text-[11px] font-bold text-emerald-700 font-mono">Most Recommended</span>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 hover:border-blue-200 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold mb-3">
                <Wrench className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Standalone Own Damage</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                For vehicle owners who already hold an active multi-year third-party cover and require annual protection for their own car.
              </p>
              <span className="text-[11px] font-bold text-amber-700 font-mono">Flexible Renewal</span>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50 hover:border-blue-200 transition-colors">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Zero Depreciation Cover</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Premium bumper-to-bumper protection where zero depreciation is deducted on plastic, metal, and glass parts during claims.
              </p>
              <span className="text-[11px] font-bold text-purple-700 font-mono">Best for Cars &lt; 5 Yrs</span>
            </div>
          </div>
        </section>

        {/* Must-Have Add-On Covers Grid */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 mb-12 shadow-sm">
          <div className="max-w-3xl mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Essential Car Insurance Add-On Covers
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Customize your policy to protect against specific road and weather hazards:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-700" />
                Zero Depreciation (Bumper to Bumper)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Guarantees complete compensation for vehicle parts without deducting depreciation value for age or materials.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-600" />
                Engine & Gearbox Protection
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Covers repair costs arising from hydrostatic lock, water ingression, and lubricating oil leakage during monsoon floods.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-emerald-600" />
                Return to Invoice (RTI) Cover
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                In the event of total loss or theft, RTI pays the original purchase invoice value of the vehicle, including road tax and registration charges.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Wrench className="w-4 h-4 text-purple-600" />
                24/7 Roadside Assistance (RSA)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Instant highway towing, emergency fuel delivery, puncture repairs, battery jumpstarts, and on-spot minor mechanical assistance.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-rose-600" />
                Consumables Cover
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Covers the cost of consumables such as engine oil, nuts, bolts, screws, grease, AC gas, and washers that standard policies exclude.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-2">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-600" />
                Key Replacement Cover
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Reimburses the cost of replacing modern electronic smart keys and reprogramming vehicle lock transmitters when lost or stolen.
              </p>
            </div>
          </div>
        </section>

        {/* No Claim Bonus (NCB) Guide Table */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 mb-12 shadow-xl border border-slate-800">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block mb-2">
              Reward for Safe Driving
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              No Claim Bonus (NCB) Slabs & Transfer Guide
            </h3>
            <p className="text-sm text-slate-300 mt-2">
              Every year you drive without making an insurance claim, your discount on Own Damage premium escalates:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            <div className="bg-white/10 rounded-xl p-4 border border-white/10">
              <span className="text-xs text-slate-400 block font-medium">1st Year Clean</span>
              <div className="text-2xl font-black text-white font-mono mt-1 tabular-nums">20% Off</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/10">
              <span className="text-xs text-slate-400 block font-medium">2nd Year Clean</span>
              <div className="text-2xl font-black text-white font-mono mt-1 tabular-nums">25% Off</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/10">
              <span className="text-xs text-slate-400 block font-medium">3rd Year Clean</span>
              <div className="text-2xl font-black text-white font-mono mt-1 tabular-nums">35% Off</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/10">
              <span className="text-xs text-slate-400 block font-medium">4th Year Clean</span>
              <div className="text-2xl font-black text-white font-mono mt-1 tabular-nums">45% Off</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 border border-white/10 col-span-2 sm:col-span-1">
              <span className="text-xs text-amber-400 block font-bold">5th Year (Max)</span>
              <div className="text-2xl font-black text-amber-400 font-mono mt-1 tabular-nums">50% Off</div>
            </div>
          </div>

          <p className="text-xs text-slate-400 mt-6 leading-relaxed">
            <strong>Pro Tip:</strong> When selling your old car, preserve your NCB with an NCB Retention Certificate. You can apply your 50% discount to your new car purchase, saving up to ₹25,000 on its first policy.
          </p>
        </section>

        {/* Cashless Claim Process: 4 Steps */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 mb-12 shadow-sm">
          <div className="max-w-3xl mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Cashless Claim Settlement in 4 Simple Steps
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Get back on the road quickly with seamless repair coordination across 5,000+ network garages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm mb-3">1</div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Intimate the Claim</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Notify BanksCart / Insurer toll-free or upload incident photos directly through the insurer's mobile app.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm mb-3">2</div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Towing to Garage</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Avail complimentary RSA towing to the nearest authorized cashless network garage.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm mb-3">3</div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Digital Video Survey</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                A certified surveyor inspects the vehicle via digital video link, approving repairs within 3 hours.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm mb-3">4</div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Drive Away Repaired</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The insurer settles the repair bill directly with the garage. You pay only the compulsory deductible.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs Accordion */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 mb-12 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-700" />
            Frequently Asked Questions on Car Insurance
          </h3>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex justify-between items-center p-4 bg-slate-50/70 hover:bg-slate-50 text-left font-bold text-slate-800 text-xs sm:text-sm transition-colors"
                  aria-expanded={activeFaq === index}
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform flex-shrink-0 ${activeFaq === index ? 'rotate-180 text-blue-700' : ''}`} />
                </button>
                {activeFaq === index && (
                  <div className="p-4 text-xs sm:text-sm text-slate-600 border-t border-slate-200 bg-white leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA Banner */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden border border-slate-800">
          <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Drive with 100% Peace of Mind Today
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Renew in 2 minutes or switch to top-tier motor protection with guaranteed cashless garage support across India.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleApply()}
                className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg transition-all"
              >
                Get Instant Car Quote
              </button>
              <a
                href="tel:+919686859296"
                className="px-8 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                Call +91 96868 59296
              </a>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default CarInsurancePage;
