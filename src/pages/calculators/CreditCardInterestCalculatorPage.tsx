import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  Percent,
  Calculator,
  TrendingUp,
  Clock,
  Hourglass,
  PiggyBank,
  ShieldAlert,
  Sparkles,
  Info,
  ChevronDown,
  CheckCircle,
  Scale,
  Search,
  Landmark,
  ArrowRight,
  ShieldCheck,
  Zap,
  AlertTriangle,
  ReceiptText,
  Calendar,
  Layers,
  HelpCircle,
  IndianRupee,
  Flame,
  ArrowDownRight
} from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ApplyButton from '../../components/common/ApplyButton';
import Breadcrumb from '../../components/Breadcrumb';

ChartJS.register(ArcElement, Tooltip, Legend);

// --- Number & Currency Formatting Helpers ---
const formatCurrency = (value: number | string): string => {
  if (typeof value === 'string') {
    value = parseFloat(value.replace(/,/g, ''));
  }
  if (!isFinite(value) || isNaN(value) || value === null) {
    return '₹ 0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatNumberWithCommas = (value: number | string): string => {
  if (typeof value === 'number') {
    if (!isFinite(value) || isNaN(value)) return '0';
    return value.toLocaleString('en-IN', { maximumFractionDigits: 0 });
  }
  const clean = value.replace(/\D/g, '');
  if (!clean) return '0';
  return Number(clean).toLocaleString('en-IN', { maximumFractionDigits: 0 });
};

const formatMonths = (totalMonths: number): string => {
  if (totalMonths === Infinity || totalMonths > 600) return 'Never (Payment too low)';
  if (totalMonths <= 0) return '0 Months';
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  if (years === 0) return `${months} ${months === 1 ? 'Month' : 'Months'}`;
  if (months === 0) return `${years} ${years === 1 ? 'Year' : 'Years'}`;
  return `${years} ${years === 1 ? 'Yr' : 'Yrs'}, ${months} ${months === 1 ? 'Mo' : 'Mos'}`;
};

// --- Financial Amortization Row Structure ---
interface InterestScheduleRow {
  month: number;
  openingBalance: number;
  payment: number;
  principal: number;
  interest: number;
  gstOnInterest: number;
  closingBalance: number;
}

// --- Mode 1: Payment-Driven Interest Engine ---
const calculateInterestByPayment = (
  balance: number,
  annualRate: number,
  monthlyPayment: number,
  includeGst: boolean = true
): {
  months: number;
  totalInterest: number;
  totalGst: number;
  totalPaid: number;
  schedule: InterestScheduleRow[];
  isPayoffPossible: boolean;
} => {
  if (balance <= 0) {
    return { months: 0, totalInterest: 0, totalGst: 0, totalPaid: 0, schedule: [], isPayoffPossible: true };
  }

  const monthlyRate = annualRate / 100 / 12;
  const initialMonthlyInterest = balance * monthlyRate;

  // If monthly payment doesn't cover initial monthly interest, debt never clears
  if (monthlyPayment <= initialMonthlyInterest || monthlyPayment <= 0) {
    return {
      months: Infinity,
      totalInterest: Infinity,
      totalGst: Infinity,
      totalPaid: Infinity,
      schedule: [],
      isPayoffPossible: false,
    };
  }

  let remaining = balance;
  let totalInterest = 0;
  let totalGst = 0;
  let totalPayments = 0;
  let month = 0;
  const schedule: InterestScheduleRow[] = [];
  const maxMonths = 600;

  while (remaining > 0.01 && month < maxMonths) {
    month++;
    const opening = remaining;
    const interestThisMonth = remaining * monthlyRate;
    const gstThisMonth = includeGst ? interestThisMonth * 0.18 : 0;
    let principalPaid = monthlyPayment - interestThisMonth;
    let actualPayment = monthlyPayment;

    if (principalPaid >= remaining) {
      principalPaid = remaining;
      actualPayment = remaining + interestThisMonth;
      remaining = 0;
    } else {
      remaining -= principalPaid;
    }

    totalInterest += interestThisMonth;
    totalGst += gstThisMonth;
    totalPayments += actualPayment + gstThisMonth;

    schedule.push({
      month,
      openingBalance: Math.round(opening),
      payment: Math.round(actualPayment),
      principal: Math.round(principalPaid),
      interest: Math.round(interestThisMonth),
      gstOnInterest: Math.round(gstThisMonth),
      closingBalance: Math.max(0, Math.round(remaining)),
    });

    if (remaining <= 0) break;
  }

  return {
    months: month,
    totalInterest: Math.round(totalInterest),
    totalGst: Math.round(totalGst),
    totalPaid: Math.round(totalPayments),
    schedule,
    isPayoffPossible: remaining <= 0.01,
  };
};

// --- Mode 2: Tenure-Driven Target Interest Engine ---
const calculateInterestByTenure = (
  balance: number,
  annualRate: number,
  targetMonths: number,
  includeGst: boolean = true
): {
  requiredMonthlyPayment: number;
  totalInterest: number;
  totalGst: number;
  totalPaid: number;
  schedule: InterestScheduleRow[];
} => {
  if (balance <= 0 || targetMonths <= 0) {
    return { requiredMonthlyPayment: 0, totalInterest: 0, totalGst: 0, totalPaid: 0, schedule: [] };
  }

  const monthlyRate = annualRate / 100 / 12;
  const factor = Math.pow(1 + monthlyRate, targetMonths);
  const payment =
    monthlyRate === 0 ? balance / targetMonths : (balance * monthlyRate * factor) / (factor - 1);

  let remaining = balance;
  let totalInterest = 0;
  let totalGst = 0;
  const schedule: InterestScheduleRow[] = [];

  for (let m = 1; m <= targetMonths; m++) {
    const opening = remaining;
    const interestThisMonth = remaining * monthlyRate;
    const gstThisMonth = includeGst ? interestThisMonth * 0.18 : 0;
    let principalPaid = payment - interestThisMonth;
    let actualPayment = payment;

    if (m === targetMonths || principalPaid >= remaining) {
      principalPaid = remaining;
      actualPayment = remaining + interestThisMonth;
      remaining = 0;
    } else {
      remaining -= principalPaid;
    }

    totalInterest += interestThisMonth;
    totalGst += gstThisMonth;

    schedule.push({
      month: m,
      openingBalance: Math.round(opening),
      payment: Math.round(actualPayment),
      principal: Math.round(principalPaid),
      interest: Math.round(interestThisMonth),
      gstOnInterest: Math.round(gstThisMonth),
      closingBalance: Math.max(0, Math.round(remaining)),
    });
  }

  const roundedPayment = Math.round(payment);
  const roundedInterest = Math.round(totalInterest);
  const roundedGst = Math.round(totalGst);

  return {
    requiredMonthlyPayment: roundedPayment,
    totalInterest: roundedInterest,
    totalGst: roundedGst,
    totalPaid: balance + roundedInterest + roundedGst,
    schedule,
  };
};

// Minimum Payment Simulation (MAD = 5% of balance, min ₹500)
const calculateMinimumPaymentSimulation = (
  balance: number,
  annualRate: number
): { months: number; totalInterest: number; totalPaid: number } => {
  if (balance <= 0) return { months: 0, totalInterest: 0, totalPaid: 0 };
  const monthlyRate = annualRate / 100 / 12;
  let remaining = balance;
  let totalPaid = 0;
  let totalInterest = 0;
  let months = 0;
  const maxMonths = 360;

  while (remaining > 50 && months < maxMonths) {
    months++;
    const interest = remaining * monthlyRate;
    totalInterest += interest;
    const minDue = Math.max(500, Math.max(remaining * 0.05, interest + remaining * 0.01));

    if (minDue >= remaining + interest) {
      minDue = remaining + interest;
      totalPaid += minDue;
      remaining = 0;
      break;
    }

    const principalCovered = Math.max(0, minDue - interest);
    remaining -= principalCovered;
    totalPaid += minDue;
  }

  return {
    months: remaining <= 50 ? months : Infinity,
    totalInterest: Math.round(totalInterest),
    totalPaid: Math.round(totalPaid),
  };
};

// --- Framer Motion Animation Variants ---
const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// --- FAQ Item Component ---
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all duration-200 hover:border-slate-300">
      <button
        className="flex justify-between items-center w-full p-5 text-left focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <HelpCircle className="w-5 h-5 text-[#1E3A8A] flex-shrink-0" />
          <h3 className="text-base sm:text-lg font-semibold text-slate-900">{question}</h3>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="px-5 pb-5 pt-1"
          >
            <div
              className="text-slate-600 leading-relaxed text-sm sm:text-base border-t border-slate-100 pt-3"
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Page Component ---
interface CreditCardInterestCalculatorPageProps {
  openApplyModal?: (loanType?: string) => void;
  openEligibilityModal?: (loanType?: string) => void;
}

const CreditCardInterestCalculatorPage: React.FC<CreditCardInterestCalculatorPageProps> = ({
  openApplyModal,
  openEligibilityModal,
}) => {
  // Calculator States
  const [calcMode, setCalcMode] = useState<'byPayment' | 'byTenure'>('byPayment');
  const [balance, setBalance] = useState<number>(100000);
  const [apr, setApr] = useState<number>(42.0); // 3.5% per month - dominant HDFC/SBI/Axis credit card APR
  const [monthlyPayment, setMonthlyPayment] = useState<number>(5000);
  const [targetMonths, setTargetMonths] = useState<number>(12);
  const [includeGst, setIncludeGst] = useState<boolean>(true); // 18% GST mandated on bank finance charges in India
  const [openFAQIndex, setOpenFAQIndex] = useState<number | null>(0);

  // Safe Input Handlers to eliminate NaN completely
  const handleBalanceSlider = (val: number) => {
    setBalance(Math.max(5000, Math.min(2500000, val)));
  };

  const handleBalanceText = (raw: string) => {
    const clean = raw.replace(/\D/g, '');
    setBalance(clean ? parseInt(clean, 10) : 0);
  };

  const handleBalanceBlur = () => {
    setBalance((prev) => Math.max(5000, Math.min(2500000, isNaN(prev) ? 100000 : prev)));
  };

  const handleAprSlider = (val: number) => {
    setApr(Math.max(9.0, Math.min(54.0, val)));
  };

  const handleAprText = (raw: string) => {
    const num = parseFloat(raw);
    setApr(isNaN(num) ? 0 : num);
  };

  const handleAprBlur = () => {
    setApr((prev) => Math.max(9.0, Math.min(54.0, isNaN(prev) ? 42.0 : prev)));
  };

  const handlePaymentSlider = (val: number) => {
    setMonthlyPayment(Math.max(500, Math.min(250000, val)));
  };

  const handlePaymentText = (raw: string) => {
    const clean = raw.replace(/\D/g, '');
    setMonthlyPayment(clean ? parseInt(clean, 10) : 0);
  };

  const handlePaymentBlur = () => {
    setMonthlyPayment((prev) => Math.max(500, Math.min(250000, isNaN(prev) ? 5000 : prev)));
  };

  const handleTenureSlider = (val: number) => {
    setTargetMonths(Math.max(3, Math.min(60, val)));
  };

  const handleTenureText = (raw: string) => {
    const clean = raw.replace(/\D/g, '');
    setTargetMonths(clean ? parseInt(clean, 10) : 0);
  };

  const handleTenureBlur = () => {
    setTargetMonths((prev) => Math.max(3, Math.min(60, isNaN(prev) ? 12 : prev)));
  };

  // Immediate Financial Breakdown Variables
  const monthlyRate = useMemo(() => apr / 100 / 12, [apr]);
  const dailyRate = useMemo(() => apr / 100 / 365, [apr]);
  const dailyInterestCost = useMemo(() => Math.round(balance * dailyRate), [balance, dailyRate]);
  const month1Interest = useMemo(() => Math.round(balance * monthlyRate), [balance, monthlyRate]);
  const month1Gst = useMemo(() => (includeGst ? Math.round(month1Interest * 0.18) : 0), [month1Interest, includeGst]);
  const minimumDue = useMemo(() => Math.max(500, Math.round(balance * 0.05)), [balance]);

  // Main Calculations Engine
  const calculations = useMemo(() => {
    const byPaymentResult = calculateInterestByPayment(balance, apr, monthlyPayment, includeGst);
    const byTenureResult = calculateInterestByTenure(balance, apr, targetMonths, includeGst);
    const minTrap = calculateMinimumPaymentSimulation(balance, apr);

    // Fast-track comparison: paying double the monthly payment or clearing in 6 months
    const fastTrackPayment = Math.max(monthlyPayment * 1.75, month1Interest + 2000);
    const fastTrackResult = calculateInterestByPayment(balance, apr, fastTrackPayment, includeGst);

    // Personal Loan Consolidation Alternative (12% p.a., same tenure)
    const activeTenure =
      calcMode === 'byPayment'
        ? isFinite(byPaymentResult.months)
          ? byPaymentResult.months
          : 24
        : targetMonths;
    const plMonthlyRate = 12 / 100 / 12;
    const plFactor = Math.pow(1 + plMonthlyRate, activeTenure);
    const plEmi = Math.round((balance * plMonthlyRate * plFactor) / (plFactor - 1));
    const plTotalInterest = Math.max(0, plEmi * activeTenure - balance);

    const activeInterest = calcMode === 'byPayment' ? byPaymentResult.totalInterest : byTenureResult.totalInterest;
    const plSavings = isFinite(activeInterest) ? Math.max(0, activeInterest - plTotalInterest) : 0;

    return {
      byPayment: byPaymentResult,
      byTenure: byTenureResult,
      minTrap,
      fastTrack: fastTrackResult,
      fastTrackPayment,
      plEmi,
      plTotalInterest,
      plSavings,
      activeTenure,
    };
  }, [balance, apr, monthlyPayment, targetMonths, includeGst, calcMode, month1Interest]);

  // Active Data based on Current Mode
  const activeData = useMemo(() => {
    if (calcMode === 'byPayment') {
      return {
        totalInterest: calculations.byPayment.totalInterest,
        totalGst: calculations.byPayment.totalGst,
        totalPaid: calculations.byPayment.totalPaid,
        durationMonths: calculations.byPayment.months,
        schedule: calculations.byPayment.schedule,
        isPossible: calculations.byPayment.isPayoffPossible,
      };
    } else {
      return {
        totalInterest: calculations.byTenure.totalInterest,
        totalGst: calculations.byTenure.totalGst,
        totalPaid: calculations.byTenure.totalPaid,
        durationMonths: targetMonths,
        schedule: calculations.byTenure.schedule,
        isPossible: true,
      };
    }
  }, [calcMode, calculations, targetMonths]);

  // Doughnut Chart Data (Principal vs Interest vs GST)
  const chartData = useMemo(() => {
    const interest = isFinite(activeData.totalInterest) ? activeData.totalInterest : 0;
    const gst = isFinite(activeData.totalGst) ? activeData.totalGst : 0;

    if (includeGst && gst > 0) {
      return {
        labels: ['Principal Borrowed', 'Interest to Bank', '18% GST on Interest'],
        datasets: [
          {
            data: [balance, interest, gst],
            backgroundColor: ['#1E3A8A', '#D97706', '#DC2626'], // Trust Blue, Gold, Red Destructive
            hoverBackgroundColor: ['#0F172A', '#A16207', '#B91C1C'],
            borderWidth: 2,
            borderColor: '#FFFFFF',
          },
        ],
      };
    }

    return {
      labels: ['Principal Borrowed', 'Interest to Bank'],
      datasets: [
        {
          data: [balance, interest],
          backgroundColor: ['#1E3A8A', '#D97706'],
          hoverBackgroundColor: ['#0F172A', '#A16207'],
          borderWidth: 2,
          borderColor: '#FFFFFF',
        },
      ],
    };
  }, [balance, activeData, includeGst]);

  // Informational Data
  const faqs = [
    {
      question: 'How is credit card interest calculated by Indian banks?',
      answer:
        'Credit card interest in India is calculated using the <strong>Average Daily Balance (ADB)</strong> method. The bank divides your Annual Percentage Rate (APR) by 365 to establish a Daily Periodic Rate (DPR). This rate is multiplied daily by your outstanding revolving balance and billed at the close of every monthly statement cycle.',
    },
    {
      question: 'Why does BanksCart include 18% GST in credit card interest calculations?',
      answer:
        'Under the Indian Goods and Services Tax (GST) laws, <strong>all bank finance charges and credit card interest attract an 18% GST levy</strong>. Most generic online calculators omit this fee, misleading borrowers. On an annual card interest charge of ₹40,000, you will pay an additional ₹7,200 purely in GST.',
    },
    {
      question: 'What is the standard credit card APR in India?',
      answer:
        'Most major card issuers in India—such as HDFC Bank, SBI Card, ICICI Bank, and Axis Bank—charge revolving interest between <strong>3.0% to 3.75% per month</strong>. This translates to an effective annual APR of <strong>36% to 45% p.a.</strong> Late payment fees and cash advance charges can elevate the effective APR beyond 50% p.a.',
    },
    {
      question: 'What happens to the interest-free grace period if I revolve a balance?',
      answer:
        'If you fail to pay <strong>100% of your total statement balance</strong> on or before the due date, your interest-free grace period (typically 45-50 days) is immediately revoked. Going forward, all new retail transactions begin accruing interest from the very day the swipe occurs.',
    },
    {
      question: 'How does paying only the Minimum Amount Due increase my interest cost?',
      answer:
        'When you make only the 5% minimum payment, nearly 85% to 90% of that payment is consumed by finance charges and GST, leaving barely 1% to 2% to reduce your actual loan principal. This causes the remaining balance to compound exponentially over 15 to 25+ years.',
    },
    {
      question: 'How can I eliminate credit card interest immediately?',
      answer:
        'You have three proven paths: (1) Pay off the total statement balance in full before the grace period ends; (2) Transfer the balance to a 0% introductory balance transfer credit card; or (3) Consolidate the balance using an institutional Personal Loan at <strong>10.5% to 13.5% p.a.</strong>, cutting your interest rate by over two-thirds.',
    },
  ];

  const interestReductionHacks = [
    {
      icon: <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />,
      title: 'Pay In Full Before Due Date',
      desc: 'Clearing 100% of the statement balance completely waives all interest charges and protects your grace period.',
    },
    {
      icon: <Clock className="w-5 h-5 text-[#1E3A8A] flex-shrink-0" />,
      title: 'Make Bi-Weekly Mid-Cycle Payments',
      desc: 'Because interest accrues daily on your Average Daily Balance, paying mid-month immediately suppresses the daily compounding base.',
    },
    {
      icon: <Zap className="w-5 h-5 text-amber-600 flex-shrink-0" />,
      title: 'Opt for Balance Transfer Cards',
      desc: 'Shift high-rate card debt to a 0% or low-APR promotional balance transfer card to pause interest accrual for 3 to 6 months.',
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-purple-600 flex-shrink-0" />,
      title: 'Consolidate with an Unsecured Personal Loan',
      desc: 'Swap an exorbitant 42% credit card APR for a structured 11%-13% personal loan with zero daily compounding.',
    },
  ];

  const whyChooseBanksCart = [
    {
      icon: <Scale className="w-8 h-8 text-[#1E3A8A]" />,
      title: 'Real Indian Banking Logic',
      desc: 'Built specifically for Indian credit cards with 18% GST rules, Daily Periodic Rates, and RBI compliance.',
    },
    {
      icon: <ReceiptText className="w-8 h-8 text-emerald-600" />,
      title: '100% Transparent Numbers',
      desc: 'No hidden assumptions. See exactly how much interest goes to the bank versus statutory government taxes.',
    },
    {
      icon: <Search className="w-8 h-8 text-amber-600" />,
      title: 'Soft CIBIL Rate Checks',
      desc: 'Check personalized debt consolidation and personal loan eligibility without hurting your credit score.',
    },
    {
      icon: <Landmark className="w-8 h-8 text-blue-700" />,
      title: 'Top Tier Partner Banks',
      desc: 'Partnered with SBI, HDFC, ICICI, Axis, Kotak, and 25+ trusted institutional lenders across India.',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* SEO Helmet Metadata */}
      <Helmet>
        <title>Credit Card Interest Calculator 2026: Calculate Daily APR &amp; 18% GST | BanksCart</title>
        <meta
          name="description"
          content="Calculate exact credit card interest, daily finance charges, and mandatory 18% GST in India. Compare payoff scenarios and discover consolidation loan savings with BanksCart."
        />
        <meta
          name="keywords"
          content="credit card interest calculator india, credit card apr calculator, credit card gst on interest, daily periodic rate credit card, credit card debt calculator"
        />
        <link rel="canonical" href="https://www.bankscart.com/credit-card-interest-calculator" />

        {/* OpenGraph */}
        <meta property="og:title" content="Credit Card Interest Calculator 2026 | BanksCart" />
        <meta
          property="og:description"
          content="Calculate the true daily cost of carrying credit card debt. Understand APR, monthly finance charges, and 18% GST on interest."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.bankscart.com/credit-card-interest-calculator" />
        <meta property="og:site_name" content="BanksCart" />
        <meta property="og:image" content="https://www.bankscart.com/images/og-credit-card-interest.png" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Credit Card Interest Calculator 2026 | BanksCart" />
        <meta
          name="twitter:description"
          content="Demystify Indian credit card interest rates, APR compounding, and 18% GST with BanksCart's free financial calculator."
        />

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.bankscart.com/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Calculators',
                item: 'https://www.bankscart.com/calculators',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Credit Card Interest Calculator',
                item: 'https://www.bankscart.com/credit-card-interest-calculator',
              },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'BanksCart Credit Card Interest Calculator',
            url: 'https://www.bankscart.com/credit-card-interest-calculator',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'All',
            browserRequirements: 'Requires JavaScript',
            description:
              'Indian credit card interest calculator featuring daily periodic rate formulas, 18% GST tax breakdown, and tenure-driven target repayment modeling.',
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer.replace(/<[^>]+>/g, ''),
              },
            })),
          })}
        </script>
      </Helmet>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Calculators', path: '/calculators' },
              { label: 'Credit Card Interest Calculator' },
            ]}
          />
        </div>

        {/* Hero Section */}
        <motion.div
          className="bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#0F172A] text-white p-6 sm:p-10 rounded-2xl shadow-xl border border-slate-800 mb-8 text-center sm:text-left"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30 mb-3">
                <Flame className="w-3.5 h-3.5" /> High APR Interest Diagnostic
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Demystify Your Credit Card{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                  Interest &amp; 18% GST.
                </span>
              </h1>
              <p className="mt-3 text-base sm:text-lg text-slate-300 leading-relaxed">
                Uncover the real daily compounding cost of revolving credit card debt in India. Calculate exact
                finance fees, government GST, and explore low-interest loan consolidation alternatives.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              {openApplyModal && (
                <ApplyButton
                  loanType="Personal Loan"
                  openApplyModal={openApplyModal}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3.5 rounded-xl shadow-lg transition-all text-sm text-center"
                >
                  Consolidate at 11% p.a.
                </ApplyButton>
              )}
              {openEligibilityModal && (
                <button
                  type="button"
                  onClick={() => openEligibilityModal('Credit Card')}
                  className="bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold px-6 py-3 rounded-xl transition-all text-sm"
                >
                  Compare 0% Transfer Cards
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Daily Compounding Bleed Indicator Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-center gap-3.5">
            <div className="p-3 bg-red-50 text-red-600 rounded-xl">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">
                Daily Finance Bleed
              </span>
              <span className="text-xl font-bold font-mono tabular-nums text-red-600">
                {formatCurrency(dailyInterestCost)} / day
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                DPR: {(dailyRate * 100).toFixed(4)}% daily
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-center gap-3.5">
            <div className="p-3 bg-amber-50 text-amber-700 rounded-xl">
              <Percent className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">
                Month 1 Finance Charge
              </span>
              <span className="text-xl font-bold font-mono tabular-nums text-slate-900">
                {formatCurrency(month1Interest)}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">
                Monthly Rate: {(monthlyRate * 100).toFixed(2)}%
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm flex items-center gap-3.5">
            <div className="p-3 bg-blue-50 text-[#1E3A8A] rounded-xl">
              <ReceiptText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold block">
                Month 1 GST on Interest (18%)
              </span>
              <span className="text-xl font-bold font-mono tabular-nums text-blue-900">
                {includeGst ? formatCurrency(month1Gst) : 'Excluded'}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">Mandatory bank tax</span>
            </div>
          </div>
        </div>

        {/* Warning if payment is lower than monthly interest in Mode 1 */}
        {calcMode === 'byPayment' && !activeData.isPossible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-red-50 border-l-4 border-red-600 rounded-r-xl flex items-start gap-3 shadow-sm"
          >
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-base font-bold text-red-900">Payment Too Low: Debt Will Accumulate Indefinitely</h2>
              <p className="text-sm text-red-700 mt-1">
                Your planned payment of{' '}
                <span className="font-mono tabular-nums font-bold">{formatCurrency(monthlyPayment)}</span> does not
                even cover month 1 interest charges of{' '}
                <span className="font-mono tabular-nums font-bold">{formatCurrency(month1Interest)}</span>. Increase
                payment to at least{' '}
                <span className="font-mono tabular-nums font-bold">{formatCurrency(month1Interest + 500)}</span> to
                begin reducing your debt.
              </p>
            </div>
          </motion.div>
        )}

        {/* Calculator Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          {/* Left Column: Dual Synchronized Controls (7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-7">
            {/* Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 pb-5 gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#1E3A8A]" /> Credit Card Interest Analyzer
                </h2>
                <p className="text-xs text-slate-500">Select your calculation strategy</p>
              </div>
              <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-1">
                <button
                  type="button"
                  onClick={() => setCalcMode('byPayment')}
                  className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-all ${
                    calcMode === 'byPayment'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Fixed Monthly Payment
                </button>
                <button
                  type="button"
                  onClick={() => setCalcMode('byTenure')}
                  className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-all ${
                    calcMode === 'byTenure'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Target Payoff Months
                </button>
              </div>
            </div>

            {/* Input 1: Credit Card Balance */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label htmlFor="interest-balance-slider" className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-slate-400" /> Outstanding Credit Card Balance
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">₹</span>
                  <input
                    id="interest-balance-text"
                    type="text"
                    inputMode="numeric"
                    value={formatNumberWithCommas(balance)}
                    onChange={(e) => handleBalanceText(e.target.value)}
                    onBlur={handleBalanceBlur}
                    className="w-36 text-right font-mono tabular-nums font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg pl-7 pr-3 py-1.5 focus:bg-white focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] text-sm shadow-inner transition-all"
                  />
                </div>
              </div>
              <input
                id="interest-balance-slider"
                type="range"
                min="10000"
                max="1000000"
                step="5000"
                value={Math.max(10000, Math.min(1000000, balance))}
                onChange={(e) => handleBalanceSlider(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
              />
              <div className="flex flex-wrap gap-2 pt-1">
                {[50000, 100000, 200000, 300000, 500000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setBalance(preset)}
                    className={`text-xs px-2.5 py-1 rounded-md font-mono tabular-nums border transition-all ${
                      balance === preset
                        ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {formatCurrency(preset)}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Annual Interest Rate (APR) */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <div>
                  <label htmlFor="interest-apr-slider" className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                    <Percent className="w-4 h-4 text-slate-400" /> Annual Percentage Rate (APR)
                  </label>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Monthly equivalent: {(apr / 12).toFixed(2)}% per month
                  </p>
                </div>
                <div className="relative">
                  <input
                    id="interest-apr-text"
                    type="number"
                    step="0.5"
                    min="9"
                    max="54"
                    value={apr}
                    onChange={(e) => handleAprText(e.target.value)}
                    onBlur={handleAprBlur}
                    className="w-28 text-right font-mono tabular-nums font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg pl-3 pr-7 py-1.5 focus:bg-white focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] text-sm shadow-inner transition-all"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">%</span>
                </div>
              </div>
              <input
                id="interest-apr-slider"
                type="range"
                min="9"
                max="54"
                step="0.5"
                value={apr}
                onChange={(e) => handleAprSlider(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
              />
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { label: '24% (Low APR)', rate: 24.0 },
                  { label: '36% (Standard 3.0%/mo)', rate: 36.0 },
                  { label: '42% (HDFC/SBI 3.5%/mo)', rate: 42.0 },
                  { label: '48% (Late Tier)', rate: 48.0 },
                ].map((item) => (
                  <button
                    key={item.rate}
                    type="button"
                    onClick={() => setApr(item.rate)}
                    className={`text-xs px-2.5 py-1 rounded-md border font-medium transition-all ${
                      apr === item.rate
                        ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3 (Mode Conditional): Monthly Payment OR Target Months */}
            {calcMode === 'byPayment' ? (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <div>
                    <label htmlFor="interest-payment-slider" className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" /> Planned Fixed Monthly Payment
                    </label>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Min payment required: {formatCurrency(month1Interest + 100)}
                    </p>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">₹</span>
                    <input
                      id="interest-payment-text"
                      type="text"
                      inputMode="numeric"
                      value={formatNumberWithCommas(monthlyPayment)}
                      onChange={(e) => handlePaymentText(e.target.value)}
                      onBlur={handlePaymentBlur}
                      className="w-36 text-right font-mono tabular-nums font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg pl-7 pr-3 py-1.5 focus:bg-white focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] text-sm shadow-inner transition-all"
                    />
                  </div>
                </div>
                <input
                  id="interest-payment-slider"
                  type="range"
                  min="1000"
                  max="50000"
                  step="500"
                  value={Math.max(1000, Math.min(50000, monthlyPayment))}
                  onChange={(e) => handlePaymentSlider(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                />
                <div className="flex flex-wrap gap-2 pt-1 items-center">
                  <button
                    type="button"
                    onClick={() => setMonthlyPayment(minimumDue)}
                    className="text-xs px-2.5 py-1 rounded-md border border-amber-300 bg-amber-50 text-amber-800 font-medium hover:bg-amber-100"
                  >
                    5% Min Due ({formatCurrency(minimumDue)})
                  </button>
                  {[4000, 6000, 8000, 10000, 15000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setMonthlyPayment(preset)}
                      className={`text-xs px-2.5 py-1 rounded-md font-mono tabular-nums border transition-all ${
                        monthlyPayment === preset
                          ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {formatCurrency(preset)}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <div>
                    <label htmlFor="interest-tenure-slider" className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400" /> Target Payoff Horizon
                    </label>
                    <p className="text-xs text-slate-400 mt-0.5">Clear entire debt in specified months</p>
                  </div>
                  <div className="relative">
                    <input
                      id="interest-tenure-text"
                      type="number"
                      min="3"
                      max="60"
                      value={targetMonths}
                      onChange={(e) => handleTenureText(e.target.value)}
                      onBlur={handleTenureBlur}
                      className="w-28 text-right font-mono tabular-nums font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg pl-3 pr-8 py-1.5 focus:bg-white focus:ring-2 focus:ring-[#1E3A8A] focus:border-[#1E3A8A] text-sm shadow-inner transition-all"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">
                      Mo
                    </span>
                  </div>
                </div>
                <input
                  id="interest-tenure-slider"
                  type="range"
                  min="3"
                  max="48"
                  step="1"
                  value={targetMonths}
                  onChange={(e) => handleTenureSlider(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#1E3A8A]"
                />
                <div className="flex flex-wrap gap-2 pt-1">
                  {[6, 12, 18, 24, 36].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setTargetMonths(m)}
                      className={`text-xs px-2.5 py-1 rounded-md font-mono tabular-nums border transition-all ${
                        targetMonths === m
                          ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {m} Months ({Math.round(m / 12 * 10) / 10} Yrs)
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* GST Checkbox Toggle */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <label htmlFor="gst-toggle" className="text-xs font-semibold text-slate-700 flex items-center gap-2 cursor-pointer">
                <input
                  id="gst-toggle"
                  type="checkbox"
                  checked={includeGst}
                  onChange={(e) => setIncludeGst(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1E3A8A] focus:ring-[#1E3A8A] border-slate-300"
                />
                <span>Include Mandatory 18% GST on Interest Charges</span>
              </label>
              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Section 66E Indian Tax Law
              </span>
            </div>
          </div>

          {/* Right Column: Executive Cost Display & Chart (5 Cols) */}
          <div className="lg:col-span-5 bg-[#0F172A] text-white rounded-2xl shadow-xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                  <Hourglass className="w-4 h-4" /> Cost Summary
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {calcMode === 'byPayment' ? 'Payment Strategy' : 'Tenure Strategy'}
                </span>
              </div>

              {/* Main Highlight */}
              <div className="mb-6">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                  {calcMode === 'byPayment' ? 'Estimated Total Interest Paid' : 'Required Monthly Payment'}
                </p>
                <div className="text-3xl sm:text-4xl font-extrabold text-amber-300 font-mono tabular-nums mt-1">
                  {calcMode === 'byPayment'
                    ? formatCurrency(activeData.totalInterest)
                    : formatCurrency(calculations.byTenure.requiredMonthlyPayment)}
                </div>
                <p className="text-xs text-slate-400 font-medium mt-1">
                  {calcMode === 'byPayment'
                    ? `Payoff timeline: ${formatMonths(activeData.durationMonths)}`
                    : `Total interest over ${targetMonths} months: ${formatCurrency(activeData.totalInterest)}`}
                </p>
              </div>

              {/* Interactive Doughnut Chart */}
              <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 mb-6 flex items-center justify-between">
                <div className="w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0">
                  <Doughnut
                    data={chartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: true,
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          callbacks: {
                            label: (ctx) => ` ${ctx.label}: ${formatCurrency(ctx.raw as number)}`,
                          },
                        },
                      },
                      cutout: '68%',
                    }}
                  />
                </div>
                <div className="space-y-2.5 pl-4 flex-1 text-xs">
                  <div>
                    <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1E3A8A] inline-block" />
                      Principal Debt
                    </div>
                    <div className="font-mono tabular-nums font-bold text-white text-sm mt-0.5">
                      {formatCurrency(balance)}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 text-amber-400 font-medium">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#D97706] inline-block" />
                      Finance Charges
                    </div>
                    <div className="font-mono tabular-nums font-bold text-amber-300 text-sm mt-0.5">
                      {formatCurrency(activeData.totalInterest)}
                    </div>
                  </div>
                  {includeGst && activeData.totalGst > 0 && (
                    <div>
                      <div className="flex items-center gap-1.5 text-red-400 font-medium">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
                        18% GST Tax
                      </div>
                      <div className="font-mono tabular-nums font-bold text-red-300 text-sm mt-0.5">
                        {formatCurrency(activeData.totalGst)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Detailed Numbers Breakdown */}
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-400">Total Out-of-Pocket Outflow:</span>
                  <span className="font-mono tabular-nums font-bold text-white">
                    {formatCurrency(activeData.totalPaid)}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-slate-900/60 border border-slate-800/80">
                  <span className="text-slate-400">Interest-to-Principal Ratio:</span>
                  <span className="font-mono tabular-nums font-bold text-amber-400">
                    {Math.round((activeData.totalInterest / balance) * 100)}% of balance
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Apply Button */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              {openApplyModal ? (
                <ApplyButton
                  loanType="Credit Card Balance Transfer"
                  openApplyModal={openApplyModal}
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all text-sm text-center block"
                >
                  Apply for Balance Transfer
                </ApplyButton>
              ) : (
                <button
                  type="button"
                  className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition-all text-sm"
                >
                  Apply for Balance Transfer
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Visual Strategy Comparison Section */}
        <motion.div
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] block mb-1">
              Interactive Interest Scenarios
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Comparing 3 Repayment Velocities
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Observe how dramatically your total interest burden changes between paying minimum amounts versus
              accelerated debt elimination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Scenario 1: Minimum Trap */}
            <div className="rounded-xl border-2 border-red-200 bg-red-50/50 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-red-900 font-bold text-base">
                  <ShieldAlert className="w-5 h-5 text-red-600" /> Minimum Payment (5%)
                </div>
                <p className="text-xs text-red-700 mb-4 leading-relaxed">
                  Paying minimum 5% revolving due each month ({formatCurrency(minimumDue)} initial).
                </p>
                <div className="space-y-3 font-mono tabular-nums text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 text-xs block">Estimated Duration:</span>
                    <span className="text-base font-bold text-red-900">
                      {calculations.minTrap.months === Infinity ? '30+ Years' : formatMonths(calculations.minTrap.months)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Total Interest Paid:</span>
                    <span className="text-base font-bold text-red-700">
                      {formatCurrency(calculations.minTrap.totalInterest)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-red-200 text-xs text-red-800 font-medium">
                ⚠️ The bank collects {Math.round((calculations.minTrap.totalInterest / balance) * 100)}% of principal in interest!
              </div>
            </div>

            {/* Scenario 2: Active Plan */}
            <div className="rounded-xl border-2 border-slate-200 bg-slate-50/70 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-slate-900 font-bold text-base">
                  <Clock className="w-5 h-5 text-[#1E3A8A]" /> Your Selected Plan
                </div>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {calcMode === 'byPayment'
                    ? `Fixed payment of ${formatCurrency(monthlyPayment)}/mo`
                    : `Fixed target duration of ${targetMonths} months`}
                </p>
                <div className="space-y-3 font-mono tabular-nums text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 text-xs block">Estimated Duration:</span>
                    <span className="text-base font-bold text-slate-900">
                      {formatMonths(activeData.durationMonths)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Total Interest Paid:</span>
                    <span className="text-base font-bold text-amber-700">
                      {formatCurrency(activeData.totalInterest)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-700 font-medium">
                Saves {formatCurrency(Math.max(0, calculations.minTrap.totalInterest - activeData.totalInterest))} vs the Minimum Trap
              </div>
            </div>

            {/* Scenario 3: Fast-Track Plan */}
            <div className="rounded-xl border-2 border-emerald-500 bg-emerald-50/50 p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2 text-emerald-950 font-bold text-base">
                  <Zap className="w-5 h-5 text-emerald-600" /> Fast-Track Payoff
                </div>
                <p className="text-xs text-emerald-800 mb-4 leading-relaxed">
                  Aggressive payment of {formatCurrency(calculations.fastTrackPayment)}/mo.
                </p>
                <div className="space-y-3 font-mono tabular-nums text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-500 text-xs block">Estimated Duration:</span>
                    <span className="text-base font-bold text-emerald-900">
                      {formatMonths(calculations.fastTrack.months)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Total Interest Paid:</span>
                    <span className="text-base font-bold text-emerald-700">
                      {formatCurrency(calculations.fastTrack.totalInterest)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-200 text-xs text-emerald-800 font-semibold">
                🏆 Saves {formatCurrency(Math.max(0, activeData.totalInterest - calculations.fastTrack.totalInterest))} more in interest!
              </div>
            </div>
          </div>
        </motion.div>

        {/* Loan Consolidation Arbitrage Card */}
        <motion.div
          className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 mb-10 shadow-lg border border-blue-800"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-2">
              <span className="inline-block text-xs uppercase tracking-wider font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                Fintech Debt Arbitrage
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Slash Interest from {apr}% to 12% with a Personal Loan
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                By refinancing your {formatCurrency(balance)} credit card debt into a 12% bank personal loan for{' '}
                {calculations.activeTenure} months, your monthly EMI would be approximately{' '}
                <span className="font-mono tabular-nums font-bold text-amber-300">{formatCurrency(calculations.plEmi)}/mo</span>,
                cutting total interest to just {formatCurrency(calculations.plTotalInterest)}.
              </p>
              {calculations.plSavings > 0 && (
                <div className="pt-2 text-sm font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> Potential Interest Savings:{' '}
                  <span className="font-mono tabular-nums font-extrabold text-white text-base">
                    {formatCurrency(calculations.plSavings)}
                  </span>
                </div>
              )}
            </div>
            <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
              {openApplyModal && (
                <ApplyButton
                  loanType="Personal Loan"
                  openApplyModal={openApplyModal}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg transition-all text-sm text-center"
                >
                  Apply for Refinancing Loan
                </ApplyButton>
              )}
              {openEligibilityModal && (
                <button
                  type="button"
                  onClick={() => openEligibilityModal('Personal Loan')}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold py-3 px-6 rounded-xl transition-all text-sm text-center"
                >
                  Check Free CIBIL Pre-Approvals
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* 12-Month Amortization & Interest Schedule Table */}
        <motion.div
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-10 overflow-hidden"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] block mb-1">
                Amortization Breakdown
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                12-Month Interest &amp; Principal Accrual Schedule
              </h2>
            </div>
            <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg self-start sm:self-auto">
              Showing First 12 Cycles
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-mono tabular-nums">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200 text-slate-600 font-sans font-semibold">
                  <th className="py-3 px-3">Billing Cycle</th>
                  <th className="py-3 px-3">Opening Balance</th>
                  <th className="py-3 px-3">Payment</th>
                  <th className="py-3 px-3 text-emerald-700">Principal</th>
                  <th className="py-3 px-3 text-amber-700">Interest</th>
                  {includeGst && <th className="py-3 px-3 text-red-700">18% GST</th>}
                  <th className="py-3 px-3">Closing Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeData.schedule.slice(0, 12).map((row) => (
                  <tr key={row.month} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 font-sans font-medium text-slate-800">Month {row.month}</td>
                    <td className="py-2.5 px-3 text-slate-600">{formatCurrency(row.openingBalance)}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{formatCurrency(row.payment)}</td>
                    <td className="py-2.5 px-3 text-emerald-700 font-medium">{formatCurrency(row.principal)}</td>
                    <td className="py-2.5 px-3 text-amber-700 font-medium">{formatCurrency(row.interest)}</td>
                    {includeGst && (
                      <td className="py-2.5 px-3 text-red-700 font-medium">{formatCurrency(row.gstOnInterest)}</td>
                    )}
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{formatCurrency(row.closingBalance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Educational Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-amber-600" /> Strategies to Lower Credit Card Interest
            </h2>
            <div className="space-y-4">
              {interestReductionHacks.map((hack, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100">
                  {hack.icon}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{hack.title}</h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{hack.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <ReceiptText className="w-6 h-6 text-[#1E3A8A]" /> The Mechanics of Credit Card APR
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <p>
                  APR (Annual Percentage Rate) represents the annualized interest rate charged by the bank. However,
                  credit card interest does not charge once a year—it is computed daily using the Daily Periodic Rate:
                </p>
                <div className="p-3 bg-slate-100 rounded-lg font-mono text-xs text-slate-800">
                  DPR = APR ÷ 365 days
                </div>
                <p>
                  Because this daily interest compounds upon previously accrued interest and finance charges, revolving
                  even a modest ₹50,000 balance can cost over ₹20,000 per year when compounded.
                </p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <span className="text-xs font-bold text-emerald-900 block">Pro Fintech Tip:</span>
              <p className="text-xs text-emerald-800 mt-1">
                Always check your credit card statement for the "Payment Due Date" and "Total Amount Due". Never pay
                just the "Minimum Amount Due" if you can avoid it.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic FAQ Section */}
        <motion.div
          className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm mb-10"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E3A8A] block mb-1">
              Knowledge Base
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Credit Card Interest FAQs
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Authoritative answers to everyday credit card interest, APR, and Indian GST questions.
            </p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQIndex === index}
                onClick={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
              />
            ))}
          </div>
        </motion.div>

        {/* Why Choose BanksCart Section */}
        <div className="mb-12">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Why Borrowers Trust BanksCart for Debt Solutions
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Transparent, algorithmic financial comparison engines built specifically for Indian retail consumers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseBanksCart.map((reason, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
              >
                <div className="mb-4 p-3 bg-slate-50 rounded-xl">{reason.icon}</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">{reason.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final Conversion CTA Banner */}
        <motion.div
          className="bg-gradient-to-r from-[#0F172A] via-[#1E3A8A] to-[#0F172A] text-white rounded-2xl p-8 sm:p-12 text-center shadow-xl border border-slate-800"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-3">
            Stop Paying 40%+ Interest on Credit Cards
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Consolidate your high-interest balances into a single low-EMI personal loan or explore zero-cost balance
            transfer cards from India's top banks.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {openApplyModal && (
              <ApplyButton
                loanType="Debt Consolidation"
                openApplyModal={openApplyModal}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all text-base w-full sm:w-auto"
              >
                Apply for Debt Consolidation
              </ApplyButton>
            )}
            {openEligibilityModal && (
              <button
                type="button"
                onClick={() => openEligibilityModal('Personal Loan')}
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold py-3.5 px-8 rounded-xl transition-all text-base w-full sm:w-auto"
              >
                Check Free CIBIL Pre-Approvals
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreditCardInterestCalculatorPage;
