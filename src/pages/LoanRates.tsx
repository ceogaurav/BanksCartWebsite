import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Landmark,
  Building2,
  Percent,
  Search,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  CreditCard,
  Calculator,
  Car,
  Home,
  GraduationCap,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Info,
  Clock,
  Layers,
  FileText,
  BadgeCheck,
  ExternalLink
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { formatCurrency } from '../utils/calculations';
import { getBankById } from '../data/banks';

// Comprehensive, verified retail interest rate datasets across 6 loan categories
// Helper to resolve canonical bank id for logos & linking
const getBankIdFromName = (name: string, explicitId?: string): string => {
  if (explicitId) return explicitId;
  const n = name.toLowerCase();
  if (n.includes('sbi') || n.includes('state bank')) return 'sbi';
  if (n.includes('hdfc credila') || n.includes('hdfc')) return 'hdfc';
  if (n.includes('icici')) return 'icici';
  if (n.includes('axis')) return 'axis';
  if (n.includes('kotak')) return 'kotak';
  if (n.includes('baroda')) return 'bob';
  if (n.includes('pnb') || n.includes('punjab')) return 'pnb';
  if (n.includes('indusind')) return 'indusind';
  if (n.includes('idfc')) return 'idfc-first';
  if (n.includes('tata')) return 'tata-capital';
  if (n.includes('muthoot')) return 'muthoot';
  if (n.includes('bajaj')) return 'bajaj-finance';
  if (n.includes('canara')) return 'canara';
  if (n.includes('union')) return 'union-bank';
  if (n.includes('federal')) return 'federal-bank';
  if (n.includes('bandhan')) return 'bandhan-bank';
  if (n.includes('yes bank')) return 'yes-bank';
  if (n.includes('au small') || n.includes('au bank')) return 'au-sfb';
  if (n.includes('rbl')) return 'rbl-bank';
  if (n.includes('central bank')) return 'central-bank';
  if (n.includes('bank of india') || n.includes('boi')) return 'boi';
  if (n.includes('indian bank')) return 'indian-bank';
  return '';
};

export interface BankRateRecord {
  bank: string;
  category: 'personal' | 'home' | 'car' | 'gold' | 'business' | 'education';
  minRate: number;
  maxRate: number;
  rateDisplay: string;
  processingFee: string;
  maxTenure: string;
  maxAmount: string;
  bankType: 'psu' | 'private' | 'nbfc';
  id?: string;
  specialFeature?: string;
}

const ALL_LOAN_RATES: BankRateRecord[] = [
  // --- Personal Loans ---
  {
    bank: 'State Bank of India (SBI)',
    category: 'personal',
    minRate: 10.30,
    maxRate: 15.30,
    rateDisplay: '10.30% – 15.30%',
    processingFee: 'Nil to 1.50% (Max ₹15,000)',
    maxTenure: '7 Years (84 Months)',
    maxAmount: '₹30 Lakhs',
    bankType: 'psu',
    id: 'sbi',
    specialFeature: 'Zero prepayment penalty on floating rate'
  },
  {
    bank: 'HDFC Bank',
    category: 'personal',
    minRate: 10.75,
    maxRate: 21.00,
    rateDisplay: '10.75% – 21.00%',
    processingFee: 'Up to ₹4,999 + GST',
    maxTenure: '6 Years (72 Months)',
    maxAmount: '₹40 Lakhs',
    bankType: 'private',
    id: 'hdfc',
    specialFeature: 'Instant 10-second disbursement for pre-approved'
  },
  {
    bank: 'ICICI Bank',
    category: 'personal',
    minRate: 10.65,
    maxRate: 16.50,
    rateDisplay: '10.65% – 16.50%',
    processingFee: 'Up to 2.00% + GST',
    maxTenure: '6 Years (72 Months)',
    maxAmount: '₹50 Lakhs',
    bankType: 'private',
    id: 'icici',
    specialFeature: '100% paperless digital journey'
  },
  {
    bank: 'Axis Bank',
    category: 'personal',
    minRate: 10.99,
    maxRate: 22.00,
    rateDisplay: '10.99% – 22.00%',
    processingFee: '1.00% – 2.00% + GST',
    maxTenure: '5 Years (60 Months)',
    maxAmount: '₹40 Lakhs',
    bankType: 'private',
    id: 'axis',
    specialFeature: 'Flexible EMI tenure options'
  },
  {
    bank: 'Kotak Mahindra Bank',
    category: 'personal',
    minRate: 10.99,
    maxRate: 24.00,
    rateDisplay: '10.99% – 24.00%',
    processingFee: 'Up to 3.00% + GST',
    maxTenure: '5 Years (60 Months)',
    maxAmount: '₹35 Lakhs',
    bankType: 'private',
    id: 'kotak',
    specialFeature: 'Quick digital approval with Aadhaar e-KYC'
  },
  {
    bank: 'Bank of Baroda',
    category: 'personal',
    minRate: 10.60,
    maxRate: 17.50,
    rateDisplay: '10.60% – 17.50%',
    processingFee: '1.00% to 2.00% (Min ₹1,000)',
    maxTenure: '7 Years (84 Months)',
    maxAmount: '₹20 Lakhs',
    bankType: 'psu',
    specialFeature: 'Attractive rates for defense personnel'
  },
  {
    bank: 'Punjab National Bank (PNB)',
    category: 'personal',
    minRate: 10.40,
    maxRate: 16.95,
    rateDisplay: '10.40% – 16.95%',
    processingFee: '0.35% to 1.00%',
    maxTenure: '6 Years (72 Months)',
    maxAmount: '₹20 Lakhs',
    bankType: 'psu',
    id: 'pnb',
    specialFeature: 'Low processing charges for government employees'
  },
  {
    bank: 'IndusInd Bank',
    category: 'personal',
    minRate: 10.49,
    maxRate: 26.00,
    rateDisplay: '10.49% – 26.00%',
    processingFee: 'Up to 3.50% + GST',
    maxTenure: '5 Years (60 Months)',
    maxAmount: '₹25 Lakhs',
    bankType: 'private',
    specialFeature: 'Flexible partial prepayment options'
  },
  {
    bank: 'IDFC FIRST Bank',
    category: 'personal',
    minRate: 10.75,
    maxRate: 23.99,
    rateDisplay: '10.75% – 23.99%',
    processingFee: 'Up to 2.00% + GST',
    maxTenure: '5 Years (60 Months)',
    maxAmount: '₹1 Crore',
    bankType: 'private',
    specialFeature: 'Zero foreclosure charges after 3 EMIs'
  },
  {
    bank: 'Tata Capital',
    category: 'personal',
    minRate: 11.25,
    maxRate: 24.00,
    rateDisplay: '11.25% – 24.00%',
    processingFee: 'Up to 2.75% + GST',
    maxTenure: '6 Years (72 Months)',
    maxAmount: '₹35 Lakhs',
    bankType: 'nbfc',
    specialFeature: 'Overdraft flexi-loan facility available'
  },

  // --- Home Loans ---
  {
    bank: 'State Bank of India (SBI)',
    category: 'home',
    minRate: 8.35,
    maxRate: 9.65,
    rateDisplay: '8.35% – 9.65%',
    processingFee: 'Nil (Promotional) to 0.35%',
    maxTenure: '30 Years (360 Months)',
    maxAmount: '₹10 Crores+',
    bankType: 'psu',
    id: 'sbi',
    specialFeature: 'EBLR benchmarked to RBI Repo Rate'
  },
  {
    bank: 'HDFC Bank',
    category: 'home',
    minRate: 8.40,
    maxRate: 9.80,
    rateDisplay: '8.40% – 9.80%',
    processingFee: '0.50% of loan (Max ₹3,000 + GST)',
    maxTenure: '30 Years (360 Months)',
    maxAmount: '₹10 Crores+',
    bankType: 'private',
    id: 'hdfc',
    specialFeature: 'Special rate discount for women borrowers'
  },
  {
    bank: 'ICICI Bank',
    category: 'home',
    minRate: 8.45,
    maxRate: 9.75,
    rateDisplay: '8.45% – 9.75%',
    processingFee: '0.50% of loan amount',
    maxTenure: '30 Years (360 Months)',
    maxAmount: '₹10 Crores+',
    bankType: 'private',
    id: 'icici',
    specialFeature: 'Pre-approved instant home loan sanctions'
  },
  {
    bank: 'Bank of Baroda',
    category: 'home',
    minRate: 8.40,
    maxRate: 10.15,
    rateDisplay: '8.40% – 10.15%',
    processingFee: '100% waiver under Baroda Home Loan advantage',
    maxTenure: '30 Years (360 Months)',
    maxAmount: '₹10 Crores',
    bankType: 'psu',
    specialFeature: 'Baroda Home Loan Advantage (Overdraft facility)'
  },
  {
    bank: 'Punjab National Bank (PNB)',
    category: 'home',
    minRate: 8.45,
    maxRate: 10.25,
    rateDisplay: '8.45% – 10.25%',
    processingFee: '0.35% of loan (Max ₹15,000)',
    maxTenure: '30 Years (360 Months)',
    maxAmount: '₹5 Crores',
    bankType: 'psu',
    id: 'pnb',
    specialFeature: 'Low interest rates for high CIBIL scores'
  },
  {
    bank: 'LIC Housing Finance',
    category: 'home',
    minRate: 8.50,
    maxRate: 10.35,
    rateDisplay: '8.50% – 10.35%',
    processingFee: 'Up to ₹15,000 + GST',
    maxTenure: '30 Years (360 Months)',
    maxAmount: '₹15 Crores',
    bankType: 'nbfc',
    specialFeature: 'Special schemes for pensioners and self-employed'
  },

  // --- Car Loans ---
  {
    bank: 'State Bank of India (SBI)',
    category: 'car',
    minRate: 8.70,
    maxRate: 9.80,
    rateDisplay: '8.70% – 9.80%',
    processingFee: 'Nil (Special waiver)',
    maxTenure: '7 Years (84 Months)',
    maxAmount: 'Up to 90% On-Road Price',
    bankType: 'psu',
    id: 'sbi',
    specialFeature: 'Finances on-road price including insurance'
  },
  {
    bank: 'HDFC Bank',
    category: 'car',
    minRate: 8.75,
    maxRate: 10.50,
    rateDisplay: '8.75% – 10.50%',
    processingFee: '0.50% of loan amount',
    maxTenure: '7 Years (84 Months)',
    maxAmount: '100% of Ex-Showroom Price',
    bankType: 'private',
    id: 'hdfc',
    specialFeature: 'Top-up car loan facility available'
  },
  {
    bank: 'ICICI Bank',
    category: 'car',
    minRate: 8.80,
    maxRate: 10.75,
    rateDisplay: '8.80% – 10.75%',
    processingFee: 'Up to ₹8,500 + GST',
    maxTenure: '7 Years (84 Months)',
    maxAmount: '100% On-Road Financing',
    bankType: 'private',
    id: 'icici',
    specialFeature: 'Instant digital sanction for electric vehicles'
  },
  {
    bank: 'Bank of Baroda',
    category: 'car',
    minRate: 8.75,
    maxRate: 10.85,
    rateDisplay: '8.75% – 10.85%',
    processingFee: 'Nil processing fee under Baroda Yoddha',
    maxTenure: '7 Years (84 Months)',
    maxAmount: 'Up to 90% of on-road value',
    bankType: 'psu',
    specialFeature: 'Concessional rates for green/EV vehicles'
  },

  // --- Gold Loans ---
  {
    bank: 'Muthoot Finance',
    category: 'gold',
    minRate: 8.95,
    maxRate: 22.00,
    rateDisplay: '8.95% – 22.00%',
    processingFee: '0.25% to 1.00%',
    maxTenure: '1 Year (Renewable)',
    maxAmount: '₹5 Crores+',
    bankType: 'nbfc',
    specialFeature: 'Disbursement in 15 minutes, maximum LTV'
  },
  {
    bank: 'State Bank of India (SBI)',
    category: 'gold',
    minRate: 8.65,
    maxRate: 9.75,
    rateDisplay: '8.65% – 9.75%',
    processingFee: '0.25% + GST (Min ₹250)',
    maxTenure: '3 Years (36 Months)',
    maxAmount: '₹50 Lakhs',
    bankType: 'psu',
    id: 'sbi',
    specialFeature: 'Lowest interest rates among all gold lenders'
  },
  {
    bank: 'Manappuram Finance',
    category: 'gold',
    minRate: 9.90,
    maxRate: 24.00,
    rateDisplay: '9.90% – 24.00%',
    processingFee: '₹10 to ₹100 nominal fee',
    maxTenure: '1 Year (12 Months)',
    maxAmount: '₹1.5 Crores',
    bankType: 'nbfc',
    specialFeature: 'Doorstep gold loan service available'
  },
  {
    bank: 'HDFC Bank',
    category: 'gold',
    minRate: 9.00,
    maxRate: 16.50,
    rateDisplay: '9.00% – 16.50%',
    processingFee: '1.00% + GST',
    maxTenure: '2 Years (24 Months)',
    maxAmount: '₹50 Lakhs',
    bankType: 'private',
    id: 'hdfc',
    specialFeature: 'Safe locker insurance included free'
  },

  // --- Business Loans ---
  {
    bank: 'State Bank of India (SBI)',
    category: 'business',
    minRate: 9.25,
    maxRate: 14.50,
    rateDisplay: '9.25% – 14.50%',
    processingFee: 'Up to 1.50%',
    maxTenure: '7 Years (84 Months)',
    maxAmount: '₹5 Crores (CGTMSE)',
    bankType: 'psu',
    id: 'sbi',
    specialFeature: 'Collateral-free loans under CGTMSE scheme'
  },
  {
    bank: 'HDFC Bank',
    category: 'business',
    minRate: 11.00,
    maxRate: 18.50,
    rateDisplay: '11.00% – 18.50%',
    processingFee: 'Up to 2.00% + GST',
    maxTenure: '4 Years (48 Months)',
    maxAmount: '₹50 Lakhs (Unsecured)',
    bankType: 'private',
    id: 'hdfc',
    specialFeature: 'Business overdraft line & term loans'
  },
  {
    bank: 'Axis Bank',
    category: 'business',
    minRate: 11.25,
    maxRate: 19.00,
    rateDisplay: '11.25% – 19.00%',
    processingFee: '1.50% to 2.00%',
    maxTenure: '5 Years (60 Months)',
    maxAmount: '₹75 Lakhs',
    bankType: 'private',
    id: 'axis',
    specialFeature: 'Customized working capital solutions'
  },

  // --- Education Loans ---
  {
    bank: 'State Bank of India (SBI)',
    category: 'education',
    minRate: 8.55,
    maxRate: 11.15,
    rateDisplay: '8.55% – 11.15%',
    processingFee: 'Nil for India / ₹10,000 for Abroad',
    maxTenure: '15 Years (Post Moratorium)',
    maxAmount: '₹1.5 Crores',
    bankType: 'psu',
    id: 'sbi',
    specialFeature: '0.50% concession for female students'
  },
  {
    bank: 'HDFC Credila',
    category: 'education',
    minRate: 9.50,
    maxRate: 13.50,
    rateDisplay: '9.50% – 13.50%',
    processingFee: '1.00% to 1.50%',
    maxTenure: '15 Years',
    maxAmount: 'No Upper Limit',
    bankType: 'nbfc',
    specialFeature: 'Dedicated overseas higher education specialist'
  },
  {
    bank: 'Bank of Baroda',
    category: 'education',
    minRate: 8.65,
    maxRate: 11.50,
    rateDisplay: '8.65% – 11.50%',
    processingFee: 'Nil for premier institutions',
    maxTenure: '15 Years',
    maxAmount: '₹1.5 Crores (Baroda Scholar)',
    bankType: 'psu',
    specialFeature: 'Covers 100% of tuition and living expenses'
  }
];

export default function LoanRates() {
  const [selectedCategory, setSelectedCategory] = useState<'personal' | 'home' | 'car' | 'gold' | 'business' | 'education'>('personal');
  const [searchQuery, setSearchQuery] = useState('');
  const [bankTypeFilter, setBankTypeFilter] = useState<'all' | 'psu' | 'private' | 'nbfc'>('all');
  const [sortBy, setSortBy] = useState<'rate-asc' | 'fee-asc' | 'name-asc'>('rate-asc');

  // Quick Calculator Slider state
  const [calcAmount, setCalcAmount] = useState<number>(500000);
  const [calcTenure, setCalcTenure] = useState<number>(60);
  const [calcRate, setCalcRate] = useState<number>(10.5);

  // Calculate live EMI for the quick preview
  const liveEmi = useMemo(() => {
    const monthlyRate = calcRate / (12 * 100);
    const emi =
      (calcAmount * monthlyRate * Math.pow(1 + monthlyRate, calcTenure)) /
      (Math.pow(1 + monthlyRate, calcTenure) - 1);
    const totalAmount = emi * calcTenure;
    const totalInterest = totalAmount - calcAmount;

    return {
      monthlyEmi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest)
    };
  }, [calcAmount, calcTenure, calcRate]);

  // Filtered & Sorted Loan Rates
  const filteredRates = useMemo(() => {
    return ALL_LOAN_RATES.filter((rate) => {
      const matchesCategory = rate.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        rate.bank.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rate.specialFeature?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = bankTypeFilter === 'all' || rate.bankType === bankTypeFilter;
      return matchesCategory && matchesSearch && matchesType;
    }).sort((a, b) => {
      if (sortBy === 'rate-asc') return a.minRate - b.minRate;
      if (sortBy === 'name-asc') return a.bank.localeCompare(b.bank);
      return 0;
    });
  }, [selectedCategory, searchQuery, bankTypeFilter, sortBy]);

  // Schema.org Structured Data
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FinancialProduct',
        name: 'All India Bank Loan Interest Rates Comparison',
        provider: {
          '@type': 'Organization',
          name: 'BanksCart Financial Technologies Pvt Ltd'
        },
        description:
          'Compare official interest rates, processing fees, and loan eligibility across 30+ leading Indian banks for Personal Loans, Home Loans, Car Loans, Gold Loans, and Business Loans.',
        url: 'https://www.bankscart.com/resources/loan-rates'
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.bankscart.com/'
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Resources',
            item: 'https://www.bankscart.com/resources'
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Bank Loan Interest Rates',
            item: 'https://www.bankscart.com/resources/loan-rates'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the lowest home loan interest rate in India currently?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Currently, State Bank of India (SBI), HDFC Bank, and Bank of Baroda offer the lowest home loan interest rates starting from 8.35% to 8.40% p.a. for borrowers with CIBIL scores of 750 and above, linked to the RBI repo rate (EBLR).'
            }
          },
          {
            '@type': 'Question',
            name: 'How does my CIBIL score affect the interest rate offered by banks?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Banks follow risk-based pricing. Borrowers with prime CIBIL scores (750–900) qualify for the lowest tier rates (from 8.35% on Home Loans and 10.30% on Personal Loans). Scores between 650 and 749 attract an interest markup of 0.50% to 2.00%, while scores below 650 may require collateral or a co-applicant.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the difference between EBLR and MCLR interest rates?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'EBLR (External Benchmark Lending Rate) is pegged directly to an external benchmark like the RBI Repo Rate, meaning any repo rate change is passed on to borrowers within 3 months. MCLR (Marginal Cost of Funds based Lending Rate) is calculated internally by each bank based on its operating costs and resets only once a year.'
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Helmet>
        <title>All India Bank Loan Interest Rates Directory (2026) | BanksCart</title>
        <meta
          name="description"
          content="Compare latest interest rates, processing fees, and tenures across Personal Loans, Home Loans, Car Loans, Gold Loans, and Business Loans from 30+ leading Indian banks."
        />
        <link rel="canonical" href="https://www.bankscart.com/resources/loan-rates" />
        <meta property="og:title" content="All India Loan Interest Rates Directory - BanksCart" />
        <meta
          property="og:description"
          content="Live bank loan interest rates comparison across SBI, HDFC, ICICI, Axis, PNB, and Bank of Baroda."
        />
        <meta property="og:url" content="https://www.bankscart.com/resources/loan-rates" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
      </Helmet>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Resources', path: '/resources' },
            { label: 'Loan Rates Directory' }
          ]}
        />

        {/* Executive Hero Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-8 sm:p-12 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-semibold uppercase tracking-wider mb-4">
              <BadgeCheck className="w-4 h-4 text-emerald-400" />
              RBI External Benchmark Lending Rates (EBLR / MCLR) • Updated November 2026
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
              All-India Bank Loan Interest Rates Directory
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              Compare transparent lending schedules across 30+ leading public sector banks, private lenders,
              and housing finance corporations. Inspect processing fees, loan ceilings, and tenure flexibility.
            </p>

            {/* Benchmark Highlights */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-mono font-black text-amber-400">8.35% onwards</div>
                <div className="text-xs text-slate-300 mt-0.5">Home Loans (EBLR)</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-mono font-black text-amber-400">10.30% onwards</div>
                <div className="text-xs text-slate-300 mt-0.5">Personal Loans</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-mono font-black text-amber-400">8.70% onwards</div>
                <div className="text-xs text-slate-300 mt-0.5">Car Loans</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-2xl font-mono font-black text-amber-400">8.65% onwards</div>
                <div className="text-xs text-slate-300 mt-0.5">Gold Loans</div>
              </div>
            </div>
          </div>
        </div>

        {/* Loan Category Selector Tabs */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-200 bg-slate-50/70 p-2 gap-2 overflow-x-auto">
            {[
              { id: 'personal', label: 'Personal Loans', icon: CreditCard, count: '10 Banks' },
              { id: 'home', label: 'Home Loans', icon: Home, count: '6 Banks' },
              { id: 'car', label: 'Car Loans', icon: Car, count: '4 Banks' },
              { id: 'gold', label: 'Gold Loans', icon: Sparkles, count: '4 Lenders' },
              { id: 'business', label: 'Business / MSME', icon: Building2, count: '3 Banks' },
              { id: 'education', label: 'Education Loans', icon: GraduationCap, count: '3 Banks' }
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = selectedCategory === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedCategory(tab.id as any);
                    setSearchQuery('');
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
                    isSelected
                      ? 'bg-blue-900 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-600'}`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="p-6 sm:p-8 space-y-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter bank name or feature..."
                  className="w-full pl-9 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto text-xs">
                {/* Bank Type Filter */}
                <select
                  value={bankTypeFilter}
                  onChange={(e) => setBankTypeFilter(e.target.value as any)}
                  className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="all">All Institution Types</option>
                  <option value="psu">Public Sector Banks (PSUs)</option>
                  <option value="private">Private Sector Banks</option>
                  <option value="nbfc">NBFCs & HFCs</option>
                </select>

                {/* Sort Option */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-700 focus:outline-none"
                >
                  <option value="rate-asc">Lowest Interest Rate First</option>
                  <option value="name-asc">Bank Name (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Interest Rates Comparison Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4">Bank / Lending Partner</th>
                    <th className="py-3.5 px-4">Interest Rate (p.a.)</th>
                    <th className="py-3.5 px-4">Processing Fee</th>
                    <th className="py-3.5 px-4">Max Tenure</th>
                    <th className="py-3.5 px-4">Max Amount</th>
                    <th className="py-3.5 px-4 text-right">Apply & Verify</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredRates.map((row, idx) => {
                    const bankId = getBankIdFromName(row.bank, row.id);
                    const bankInfo = bankId ? getBankById(bankId) : undefined;
                    const logoSrc = bankInfo?.logo || (row.bank.toLowerCase().includes('lic') ? '/logos/lic.png' : null);

                    return (
                      <tr key={`${row.bank}-${idx}`} className="hover:bg-blue-50/50 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            {logoSrc ? (
                              <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 p-0.5 flex items-center justify-center flex-shrink-0 shadow-xs overflow-hidden">
                                <img
                                  src={logoSrc}
                                  alt={`${row.bank} logo`}
                                  className="w-full h-full object-contain"
                                  loading="lazy"
                                />
                              </div>
                            ) : null}
                            <div>
                              <div className="font-bold text-slate-900 text-sm">
                                {bankId ? (
                                  <Link to={`/bank-details/${bankId}`} className="text-blue-900 hover:text-blue-700 hover:underline">
                                    {row.bank}
                                  </Link>
                                ) : (
                                  row.bank
                                )}
                              </div>
                              {row.specialFeature && (
                                <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                                  ✓ {row.specialFeature}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-mono font-black text-blue-900 text-sm block">
                            {row.rateDisplay}
                          </span>
                          <span className="text-[10px] text-slate-400">Floating / Reducing</span>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-medium">{row.processingFee}</td>
                        <td className="py-3.5 px-4 font-mono">{row.maxTenure}</td>
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{row.maxAmount}</td>
                        <td className="py-3.5 px-4 text-right">
                          <Link
                            to="/eligibility"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition-all shadow-sm active:scale-95"
                          >
                            Check Eligibility
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredRates.length === 0 && (
              <div className="p-8 text-center text-slate-500 text-sm">
                No banks match your search filter. Try clearing the search query or selecting 'All Institution Types'.
              </div>
            )}
          </div>
        </div>

        {/* Live Quick EMI Simulator Strip */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest block mb-1">
                Instant Amortization Calculator
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Simulate Monthly EMI Across Any Bank Rate
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Link
                to="/personal-loan-emi-calculator"
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
              >
                Personal Loan Calculator
              </Link>
              <Link
                to="/home-loan-emi-calculator"
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
              >
                Home Loan Calculator
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>Loan Amount</span>
                <span className="font-mono text-blue-900">{formatCurrency(calcAmount)}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="5000000"
                step="50000"
                value={calcAmount}
                onChange={(e) => setCalcAmount(Number(e.target.value))}
                className="w-full accent-blue-900 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>₹50,000</span>
                <span>₹50 Lakhs</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>Tenure (Months)</span>
                <span className="font-mono text-blue-900">{calcTenure} Mos ({(calcTenure / 12).toFixed(1)} Yrs)</span>
              </div>
              <input
                type="range"
                min="12"
                max="120"
                step="6"
                value={calcTenure}
                onChange={(e) => setCalcTenure(Number(e.target.value))}
                className="w-full accent-blue-900 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>1 Year</span>
                <span>10 Years</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-slate-700 mb-1.5">
                <span>Interest Rate (% p.a.)</span>
                <span className="font-mono text-blue-900">{calcRate}%</span>
              </div>
              <input
                type="range"
                min="8"
                max="24"
                step="0.25"
                value={calcRate}
                onChange={(e) => setCalcRate(Number(e.target.value))}
                className="w-full accent-blue-900 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                <span>8%</span>
                <span>24%</span>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="grid grid-cols-3 gap-6 text-center sm:text-left w-full sm:w-auto">
              <div>
                <span className="text-[11px] text-slate-300 block">Monthly EMI</span>
                <span className="text-2xl font-mono font-black text-amber-400">
                  {formatCurrency(liveEmi.monthlyEmi)}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-300 block">Total Interest</span>
                <span className="text-xl font-mono font-bold text-emerald-400">
                  {formatCurrency(liveEmi.totalInterest)}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-300 block">Total Payable</span>
                <span className="text-xl font-mono font-bold text-slate-200">
                  {formatCurrency(liveEmi.totalAmount)}
                </span>
              </div>
            </div>

            <Link
              to="/eligibility"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-all shadow-md shrink-0 active:scale-95 flex items-center gap-2"
            >
              <span>Apply at This Rate</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Credit Score & Rate Impact Matrix */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              Underwriting Guidelines
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              How Your CIBIL Score Governs Loan Interest Rates
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              RBI mandates risk-based loan pricing. Borrowers with higher credit scores unlock the lowest interest brackets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
              <span className="font-mono font-black text-lg text-emerald-800">750 – 900 (Prime)</span>
              <h4 className="font-bold text-slate-900 text-sm">Lowest Market Rates</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Eligible for bottom-tier home loans (8.35%–8.65%) and personal loans (10.30%–11.50%). Instant digital approvals.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
              <span className="font-mono font-black text-lg text-blue-800">700 – 749 (Standard)</span>
              <h4 className="font-bold text-slate-900 text-sm">Standard Slabs</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Approved by most PSU and private banks with a modest 0.25% to 0.75% rate markup.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
              <span className="font-mono font-black text-lg text-amber-800">650 – 699 (Fair)</span>
              <h4 className="font-bold text-slate-900 text-sm">Higher Margin Rates</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Personal loans priced between 14% and 18%. Lenders may request salary slip verifications or co-signers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
              <span className="font-mono font-black text-lg text-rose-800">Below 650 (Subprime)</span>
              <h4 className="font-bold text-slate-900 text-sm">Secured Loans Only</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Unsecured personal loans likely rejected. Borrowers should apply for Gold Loans or FD-backed loans to rebuild credit.
              </p>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 space-y-6">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-1">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Bank Loan Rates & Benchmark Guidelines FAQ
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Clear answers on reducing balance interest, prepayment charges, and repo-rate linked benchmarks.
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {[
              {
                q: 'What is the difference between Fixed and Floating Interest Rates?',
                a: 'A fixed interest rate remains unchanged throughout the loan duration, keeping your EMI constant regardless of market fluctuations. A floating interest rate is tied to an external benchmark (such as the RBI Repo Rate); when the central bank lowers or raises repo rates, your loan interest resets accordingly.'
              },
              {
                q: 'What does a "Reducing Balance" interest rate mean?',
                a: 'In a reducing balance loan, interest is calculated each month only on the remaining principal balance after subtracting your previous principal repayments. In contrast, a flat rate calculates interest on the entire original loan amount for the entire tenure, which costs significantly more.'
              },
              {
                q: 'Can banks charge foreclosure or prepayment fees on retail loans?',
                a: 'As per Reserve Bank of India (RBI) guidelines, banks and NBFCs cannot levy any prepayment or foreclosure penalties on floating-rate term loans sanctioned to individual borrowers (such as Home Loans).'
              },
              {
                q: 'How frequently do EBLR (Repo-Linked) home loans reset?',
                a: 'RBI guidelines mandate that banks must reset interest rates on external benchmark loans at least once every three months whenever the external benchmark (Repo Rate) changes.'
              }
            ].map((faq, fIdx) => (
              <details
                key={fIdx}
                className="group py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-slate-900 hover:text-blue-900 transition-colors">
                  <h3 className="text-base sm:text-lg font-bold">
                    {faq.q}
                  </h3>
                  <div className="shrink-0 rounded-full bg-slate-100 group-open:bg-blue-100 p-1.5 text-slate-600 group-open:text-blue-900 transition-colors">
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-open:rotate-180" />
                  </div>
                </summary>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed pr-6">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
