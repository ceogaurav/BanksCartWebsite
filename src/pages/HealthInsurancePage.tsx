import React, { useState, useId } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ApplyButton from '../components/common/ApplyButton';
import {
  Shield,
  HeartPulse,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  Building2,
  Users,
  Clock,
  Sparkles,
  Award,
  Stethoscope,
  IndianRupee,
  FileCheck,
  Scale,
  Percent,
  Calculator,
  Lock,
  ArrowRight,
  Star,
  Check,
  Sliders,
  AlertCircle,
  PhoneCall,
  Activity,
  UserCheck
} from 'lucide-react';

interface HealthInsurancePageProps {
  openApplyModal?: (loanType?: string) => void;
}

interface InsurerComparison {
  name: string;
  tagline: string;
  hospitals: string;
  csr: string;
  startingPrice: string;
  keyFeature: string;
  badge?: string;
}

const INSURERS_DATA: InsurerComparison[] = [
  {
    name: "HDFC ERGO Optima Secure",
    tagline: "4X Coverage Multiplier & Zero Deductions",
    hospitals: "12,000+",
    csr: "97.4%",
    startingPrice: "₹550/mo",
    keyFeature: "2X coverage from Day 1, scaling up to 4X without extra premium",
    badge: "Most Popular"
  },
  {
    name: "Star Health Comprehensive",
    tagline: "India's Largest Standalone Health Insurer",
    hospitals: "14,000+",
    csr: "90.2%",
    startingPrice: "₹480/mo",
    keyFeature: "No room rent sub-limits, maternity & newborn coverage included",
    badge: "Widest Network"
  },
  {
    name: "Care Health Supreme",
    tagline: "Unlimited Automatic Sum Insured Recharge",
    hospitals: "11,000+",
    csr: "95.8%",
    startingPrice: "₹490/mo",
    keyFeature: "Unlimited recharge for related & unrelated ailments in the same year"
  },
  {
    name: "Niva Bupa ReAssure 2.0",
    tagline: "AgeLock Technology - Lock Your Premium Age",
    hospitals: "10,000+",
    csr: "92.5%",
    startingPrice: "₹510/mo",
    keyFeature: "Pay entry-age premium until your first paid claim occurs"
  },
  {
    name: "ICICI Lombard Health AdvantEdge",
    tagline: "Guaranteed Zero Copay & Air Ambulance Cover",
    hospitals: "7,500+",
    csr: "96.1%",
    startingPrice: "₹530/mo",
    keyFeature: "Emergency domestic air ambulance cover & complimentary annual checkup"
  }
];

const HealthInsurancePage: React.FC<HealthInsurancePageProps> = ({ openApplyModal }) => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Calculator States
  const [coverageType, setCoverageType] = useState<'individual' | 'family' | 'senior'>('family');
  const [age, setAge] = useState<number>(32);
  const [sumInsured, setSumInsured] = useState<number>(1000000); // 10 Lakhs default
  const [includeCriticalIllness, setIncludeCriticalIllness] = useState<boolean>(true);

  // Dynamic Premium Calculation logic based on actuarial patterns
  const calculateEstimatedPremium = () => {
    let baseAnnual = 4500;

    // Age loading
    if (age <= 25) baseAnnual = 4200;
    else if (age <= 35) baseAnnual = 5400 + (age - 25) * 120;
    else if (age <= 45) baseAnnual = 7200 + (age - 35) * 220;
    else if (age <= 55) baseAnnual = 10500 + (age - 45) * 450;
    else baseAnnual = 16000 + (age - 55) * 750;

    // Coverage multiplier
    if (coverageType === 'family') baseAnnual *= 1.75;
    if (coverageType === 'senior') baseAnnual *= 1.95;

    // Sum Insured multiplier
    const siFactor = sumInsured / 500000;
    baseAnnual += (siFactor - 1) * 1400;

    // Rider
    if (includeCriticalIllness) {
      baseAnnual += 1200;
    }

    const annualTotal = Math.round(baseAnnual);
    const monthlyTotal = Math.round(annualTotal / 12);
    const taxSaving80D = Math.min(25000, Math.round(annualTotal * 0.30));

    return { annualTotal, monthlyTotal, taxSaving80D };
  };

  const { annualTotal, monthlyTotal, taxSaving80D } = calculateEstimatedPremium();

  const handleApply = (planName?: string) => {
    const loanType = planName || `Health Insurance - ${coverageType.toUpperCase()} (₹${(sumInsured / 100000).toFixed(0)}L)`;
    if (openApplyModal) {
      openApplyModal(loanType);
    } else {
      navigate('/loan-apply', { state: { loanType } });
    }
  };

  const faqs = [
    {
      q: "What is cashless hospitalization and how does it work?",
      a: "Cashless hospitalization allows you to get treated at any of our partner network hospitals (over 10,000+ across India) without paying the medical bills from your pocket. The hospital coordinates directly with the Third Party Administrator (TPA) or insurer, who settles approved medical expenses directly with the hospital."
    },
    {
      q: "What is the waiting period for pre-existing diseases (PED)?",
      a: "Pre-existing conditions (such as diabetes, hypertension, or asthma) are covered after a defined waiting period mandated by IRDAI, which typically ranges from 1 to 3 years depending on the policy chosen. Under recent IRDAI reforms, the maximum PED waiting period is capped at 3 years."
    },
    {
      q: "How much tax can I save under Section 80D with health insurance?",
      a: "Under Section 80D of the Income Tax Act, you can claim a deduction of up to ₹25,000 p.a. for premiums paid for yourself, spouse, and dependent children. You can claim an additional deduction of up to ₹50,000 p.a. for premiums paid for senior citizen parents (60+ years), allowing total cumulative tax savings of up to ₹75,000 annually."
    },
    {
      q: "What is the difference between an Individual Health Plan and a Family Floater?",
      a: "An Individual Health Plan provides dedicated sum insured coverage for one person. A Family Floater covers all family members (typically Self, Spouse, and up to 4 children) under a single shared sum insured. Family Floaters are significantly more cost-effective for young families where claims are infrequent."
    },
    {
      q: "What is a 1 Crore Super Top-Up Health Insurance plan?",
      a: "A Super Top-Up plan provides a massive additional safety buffer (such as ₹1 Crore) that activates once your cumulative hospital expenses exceed a chosen deductible limit (e.g. ₹5 Lakhs or ₹10 Lakhs). It costs up to 70% less than a standalone ₹1 Crore base policy, making it an essential safeguard against catastrophic medical events."
    },
    {
      q: "What is Claim Settlement Ratio (CSR) and why is it important?",
      a: "Claim Settlement Ratio represents the percentage of claims settled by an insurance company out of total claims received in a financial year. An insurer with a CSR above 90% indicates a reliable and prompt claim settlement process. All health insurance partners on BanksCart have CSRs exceeding 90%."
    },
    {
      q: "Does BanksCart assist during the claim filing process?",
      a: "Yes. BanksCart provides an end-to-end dedicated Claims Assistance Desk. If you or a loved one requires hospitalization, our claim specialists guide you through TPA documentation, pre-authorization queries, and insurer follow-ups to ensure zero settlement delays."
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
        <title>Health Insurance Plans: Compare Top Policies & Quotes Online - BanksCart</title>
        <meta 
          name="description" 
          content="Compare comprehensive health insurance plans in India from Star Health, HDFC ERGO, Care, Niva Bupa & ICICI Lombard. 10,000+ cashless hospitals & up to ₹75,000 Section 80D tax savings." 
        />
        <link rel="canonical" href="https://bankscart.com/insurance/health" />
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <Breadcrumb path={["Home", "Insurance", "Health Insurance"]} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Section */}
        <section className="bg-slate-900 rounded-3xl text-white p-8 sm:p-12 mb-12 shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute -right-8 -bottom-10 opacity-5 select-none pointer-events-none">
            <span className="text-[220px] font-black text-white leading-none">HEALTH</span>
          </div>

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3.5 py-1 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-5">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              IRDAI Registered Health Insurance Partners
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
              Comprehensive Health Insurance <br />
              <span className="text-amber-400">for You & Your Family</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg mt-4 leading-relaxed font-normal">
              Protect your family from rising medical inflation. Compare India's top health insurance policies with 10,000+ cashless hospitals, instant paperless issuance, and tax savings up to ₹75,000 under Section 80D.
            </p>

            {/* Quick Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono tabular-nums">10,000+</div>
                  <div className="text-[11px] text-slate-400">Cashless Hospitals</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Award className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-mono tabular-nums">98.6%</div>
                  <div className="text-[11px] text-slate-400">Peak Claim Settlement</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <IndianRupee className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Up to ₹75,000</div>
                  <div className="text-[11px] text-slate-400">Sec 80D Tax Saved</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">2 Minutes</div>
                  <div className="text-[11px] text-slate-400">Instant Digital Policy</div>
                </div>
              </div>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap gap-4 mt-8">
              <button
                onClick={() => {
                  const el = document.getElementById('health-premium-calculator');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <Calculator className="w-4 h-4" />
                Calculate Instant Premium
              </button>
              <button
                onClick={() => handleApply()}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-all flex items-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                Speak with Insurance Advisor
              </button>
            </div>
          </div>
        </section>

        {/* Interactive Health Premium Calculator */}
        <section id="health-premium-calculator" className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 mb-12 shadow-sm">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
              <Sliders className="w-3.5 h-3.5" />
              Live Actuarial Calculator
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Estimate Your Health Insurance Premium & Tax Savings
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Tailor your plan parameters below to calculate estimated monthly outgo and tax deductions under Section 80D.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Coverage Type Selector */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
                  Who Are You Insuring?
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'individual', label: 'Individual', sub: '1 Adult' },
                    { id: 'family', label: 'Family Floater', sub: '2 Adults + Kids' },
                    { id: 'senior', label: 'Senior Parents', sub: 'Aged 60+' }
                  ].map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => setCoverageType(tier.id as any)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        coverageType === tier.id
                          ? 'border-blue-700 bg-blue-50/70 ring-1 ring-blue-700'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                      }`}
                    >
                      <span className="font-bold text-slate-900 text-xs sm:text-sm block">{tier.label}</span>
                      <span className="text-[11px] text-slate-500 font-medium block mt-0.5">{tier.sub}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Age Slider */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="health-age-slider" className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Eldest Member's Age
                  </label>
                  <span className="text-sm font-bold text-blue-700 font-mono tabular-nums bg-blue-50 px-2.5 py-0.5 rounded-md">
                    {age} Years
                  </span>
                </div>
                <input
                  id="health-age-slider"
                  type="range"
                  min="18"
                  max="75"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  aria-label="Eldest member age slider"
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-700"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                  <span>18 Yrs</span>
                  <span>35 Yrs</span>
                  <span>50 Yrs</span>
                  <span>75 Yrs</span>
                </div>
              </div>

              {/* Sum Insured Slabs */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
                  Sum Insured (Medical Coverage Amount)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { value: 500000, label: "₹5 Lakhs" },
                    { value: 1000000, label: "₹10 Lakhs" },
                    { value: 2500000, label: "₹25 Lakhs" },
                    { value: 10000000, label: "₹1 Crore" }
                  ].map((si) => (
                    <button
                      key={si.value}
                      type="button"
                      onClick={() => setSumInsured(si.value)}
                      className={`py-2.5 px-3 rounded-xl border text-center font-bold text-xs font-mono transition-all ${
                        sumInsured === si.value
                          ? 'border-blue-700 bg-blue-700 text-white shadow-sm'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {si.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Critical Illness Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                    <HeartPulse className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-xs sm:text-sm block">Critical Illness Rider Cover</span>
                    <span className="text-[11px] text-slate-500">Lump-sum payout upon diagnosis of 32+ critical conditions</span>
                  </div>
                </div>
                <input
                  id="health-critical-illness-toggle"
                  type="checkbox"
                  checked={includeCriticalIllness}
                  onChange={(e) => setIncludeCriticalIllness(e.target.checked)}
                  aria-label="Critical illness rider cover"
                  className="w-5 h-5 rounded text-blue-700 focus:ring-blue-500 cursor-pointer"
                />
              </div>

            </div>

            {/* Calculated Output Card */}
            <div className="lg:col-span-5 bg-slate-900 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20 inline-block">
                Instant Premium Estimate
              </span>

              <div className="pb-6 border-b border-slate-800">
                <span className="text-xs text-slate-400 block font-medium">Starting from as low as</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-4xl sm:text-5xl font-black text-white font-mono tabular-nums">
                    ₹{monthlyTotal.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">/ month</span>
                </div>
                <span className="text-xs text-slate-400 block mt-1.5 font-mono">
                  Annual Cost: ~₹{annualTotal.toLocaleString('en-IN')} + 18% GST
                </span>
              </div>

              {/* Benefits highlight */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Sum Insured Chosen:</span>
                  <span className="font-bold text-white font-mono">₹{(sumInsured / 100000).toFixed(0)} Lakhs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Cashless Network Garages:</span>
                  <span className="font-bold text-emerald-400">10,000+ Hospitals</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Section 80D Tax Saved:</span>
                  <span className="font-bold text-amber-400 font-mono">Up to ₹{taxSaving80D.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleApply(`Health Insurance - ${coverageType.toUpperCase()} (₹${(sumInsured / 100000).toFixed(0)}L)`)}
                className="w-full py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm tracking-wide shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Apply for Policy at this Rate &rarr;
              </button>

              <p className="text-[10px] text-slate-400 text-center leading-normal">
                Final premiums depend on individual medical history, pre-existing conditions, and city tier underwriting.
              </p>
            </div>

          </div>
        </section>

        {/* Top Insurers Comparison Table */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 mb-12 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Compare India's Leading Health Insurance Providers
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Verified data from official IRDAI annual disclosures and public regulatory filings.
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
                  <th className="p-3.5 font-bold">Insurance Provider & Plan</th>
                  <th className="p-3.5 font-bold">Network Hospitals</th>
                  <th className="p-3.5 font-bold">Claim Ratio (CSR)</th>
                  <th className="p-3.5 font-bold">Starting Premium</th>
                  <th className="p-3.5 font-bold">Key Benefit</th>
                  <th className="p-3.5 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {INSURERS_DATA.map((insurer, idx) => (
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
                    <td className="p-3.5 font-bold text-slate-800 font-mono tabular-nums">{insurer.hospitals}</td>
                    <td className="p-3.5 font-bold text-emerald-700 font-mono tabular-nums">{insurer.csr}</td>
                    <td className="p-3.5 font-bold text-slate-900 font-mono tabular-nums">{insurer.startingPrice}</td>
                    <td className="p-3.5 text-slate-600 text-xs leading-relaxed max-w-xs">{insurer.keyFeature}</td>
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

        {/* Plan Types & Life Stage Needs */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 mb-12 shadow-sm">
          <div className="max-w-3xl mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Choose the Right Plan for Your Life Stage
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Select tailored coverage designed for specific life circumstances and financial goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50 hover:border-blue-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Family Floater Plans</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Single policy covering self, spouse, and dependent children under one shared sum insured. Includes maternity, newborn vaccination, and OPD perks.
              </p>
              <div className="text-xs font-semibold text-blue-700">Recommended SI: ₹15L - ₹25L</div>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50 hover:border-blue-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-4">
                <UserCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Senior Citizen Health Plans</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Tailored for parents aged 60+. Features lower waiting periods for pre-existing ailments (hypertension, diabetes), domiciliary hospitalization, and annual checkups.
              </p>
              <div className="text-xs font-semibold text-emerald-700">Recommended SI: ₹10L - ₹20L</div>
            </div>

            <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50 hover:border-blue-200 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">₹1 Crore Super Top-Up Plans</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                High-altitude safety net that activates after your base policy limit is exhausted. Provides ₹1 Crore catastrophic protection at ultra-affordable premiums (starts ~₹250/mo).
              </p>
              <div className="text-xs font-semibold text-purple-700">Deductible: ₹5L - ₹10L</div>
            </div>
          </div>
        </section>

        {/* What's Covered (Inclusions) vs What's Not (Exclusions) */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 mb-12 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-2">
            Coverage Scope: What Is Covered vs What Is Excluded
          </h3>
          <p className="text-sm text-slate-600 mb-8">
            Clear transparency helps prevent unexpected out-of-pocket expenses during claim filing.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Inclusions */}
            <div className="bg-emerald-50/40 border border-emerald-200/80 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-emerald-950 text-base">Standard Inclusions (What's Covered)</h4>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>In-Patient Hospitalization:</strong> Room rent, ICU charges, nursing fees, and doctor consultations for 24+ hr admissions.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Pre & Post Hospitalization:</strong> Medical tests and medications covered up to 60 days before and 180 days after discharge.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Daycare Procedures:</strong> Treatments that require less than 24 hours due to advanced technology (cataracts, dialysis, chemotherapy).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Emergency Road Ambulance:</strong> Ambulance transfer charges covered up to policy limits.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span><strong>AYUSH Treatment:</strong> Hospitalization expenses incurred under Ayurveda, Yoga, Unani, Siddha, and Homeopathy.</span>
                </li>
              </ul>
            </div>

            {/* Exclusions */}
            <div className="bg-rose-50/40 border border-rose-200/80 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="w-5 h-5 text-rose-600" />
                <h4 className="font-bold text-rose-950 text-base">Standard Exclusions (What's Not Covered)</h4>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold mt-0.5 flex-shrink-0">✖</span>
                  <span><strong>Initial 30-Day Waiting Period:</strong> Non-accidental illnesses occurring in the first 30 days of a fresh policy are excluded.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold mt-0.5 flex-shrink-0">✖</span>
                  <span><strong>Cosmetic & Aesthetic Surgery:</strong> Plastic surgery, botox, or aesthetic procedures unless mandated by accidental trauma.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold mt-0.5 flex-shrink-0">✖</span>
                  <span><strong>Self-Inflicted Injuries & Substance Abuse:</strong> Harm resulting from intentional injury or drug/alcohol consumption.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold mt-0.5 flex-shrink-0">✖</span>
                  <span><strong>Dental Treatment (Routine):</strong> Outpatient dental extractions/fillings unless necessitated by accident hospitalization.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-600 font-bold mt-0.5 flex-shrink-0">✖</span>
                  <span><strong>Pre-Existing Conditions in Waiting Window:</strong> Chronic conditions during their active waiting period (1-3 years).</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 80D Tax Breakdown */}
        <section className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl text-white p-8 sm:p-10 mb-12 shadow-xl border border-blue-800">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-md border border-amber-400/20 inline-block mb-2">
              Income Tax Act Benefits
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Save Up to ₹75,000 on Taxes Every Year (Section 80D)
            </h3>
            <p className="text-sm text-blue-200 mt-2">
              Health insurance premiums reduce your taxable income directly under Section 80D. See how your deduction stacks:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-2xl p-5 border border-white/10">
              <span className="text-xs text-blue-200 font-medium">Self + Spouse + Children</span>
              <div className="text-3xl font-black text-amber-400 font-mono mt-2 tabular-nums">Up to ₹25,000</div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Available for individuals under 60 years of age. Includes up to ₹5,000 for preventive health checkups.
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-5 border border-white/10">
              <span className="text-xs text-blue-200 font-medium">Senior Citizen Parents (60+)</span>
              <div className="text-3xl font-black text-emerald-400 font-mono mt-2 tabular-nums">Up to ₹50,000</div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Additional deduction on premiums paid for parents aged 60 or above, helping secure elderly healthcare.
              </p>
            </div>

            <div className="bg-white/10 rounded-2xl p-5 border border-white/10">
              <span className="text-xs text-blue-200 font-medium">Total Maximum Deduction</span>
              <div className="text-3xl font-black text-white font-mono mt-2 tabular-nums">Up to ₹75,000</div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Save up to ₹23,400 in direct cash taxes if you are in the 30% tax bracket by maximizing your health cover.
              </p>
            </div>
          </div>
        </section>

        {/* How to Claim: Cashless in 4 Steps */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 mb-12 shadow-sm">
          <div className="max-w-3xl mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Hassle-Free Cashless Claims in 4 Steps
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Zero out-of-pocket stress when admitted to any of our 10,000+ partner network hospitals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm mb-3">1</div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Intimate Hospitalization</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Notify BanksCart / Insurer 48 hrs before planned admission, or within 24 hrs of emergency care.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm mb-3">2</div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Show Health Card</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Present your digital Health Card and government photo ID at the hospital's Insurance/TPA desk.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm mb-3">3</div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Pre-Authorization</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The hospital submits medical details. The insurer approves initial cashless treatment within 60 minutes.
              </p>
            </div>

            <div className="border border-slate-200 rounded-2xl p-5 bg-slate-50/50">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm mb-3">4</div>
              <h4 className="font-bold text-slate-900 text-sm mb-1.5">Direct Settlement</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                At discharge, the insurer settles all eligible medical bills directly with the hospital. You pay only non-medical items.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs Accordion */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 mb-12 shadow-sm">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-6 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-700" />
            Frequently Asked Questions on Health Insurance
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
              Secure Your Family's Health & Finances Today
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Don't leave your family's future to chance. Get unbiased health policy comparisons and dedicated claims support from BanksCart certified insurance experts.
            </p>
            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => handleApply()}
                className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg transition-all"
              >
                Apply for Health Insurance
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

export default HealthInsurancePage;
