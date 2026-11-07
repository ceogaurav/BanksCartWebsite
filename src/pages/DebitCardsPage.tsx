import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Breadcrumb from '../components/Breadcrumb';
import ApplyButton from '../components/common/ApplyButton';
import {
  CreditCard,
  ShieldCheck,
  Lock,
  Smartphone,
  Plane,
  ArrowRight,
  Search,
  Check,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Sparkles,
  SlidersHorizontal,
  Info,
  X,
  CheckCircle2,
  AlertCircle,
  Award,
  Globe,
  Star,
  Sliders
} from 'lucide-react';

interface DebitCardsPageProps {
  openApplyModal?: (loanType?: string) => void;
  openEligibilityModal?: (loanType?: string) => void;
}

interface DebitCardItem {
  id: string;
  name: string;
  bankName: string;
  bankCode: string;
  network: 'RuPay' | 'Visa' | 'Mastercard' | 'RuPay / Visa / Mastercard' | 'Mastercard / RuPay';
  categories: string[];
  atmLimit: number;
  atmLimitDisplay: string;
  posLimit: number;
  posLimitDisplay: string;
  loungeAccess: string;
  loungeAccessDetail: string;
  annualFee: number;
  annualFeeDisplay: string;
  issuanceFee: string;
  forexMarkup: string;
  rating: number;
  reviewsCount: number;
  tag?: string;
  highlights: string[];
  perks: {
    insurance: string;
    cashback: string;
    upi: string;
  };
}

// Categories for filtering
const CATEGORIES = [
  { id: 'all', label: 'All Cards', icon: CreditCard },
  { id: 'rupay', label: 'RuPay UPI Linkage', icon: Smartphone },
  { id: 'lounge', label: 'Airport Lounge Access', icon: Plane },
  { id: 'forex', label: 'Zero Forex Mark-up', icon: Globe },
  { id: 'premium', label: 'High ATM & POS Limits', icon: Award },
];

// Verified Debit Cards Dataset across India's Leading Banks
const DEBIT_CARDS: DebitCardItem[] = [
  {
    id: 'sbi-global',
    name: 'SBI Global International Debit Card',
    bankName: 'State Bank of India',
    bankCode: 'SBI',
    network: 'RuPay / Visa / Mastercard',
    categories: ['all', 'rupay', 'premium'],
    atmLimit: 40000,
    atmLimitDisplay: '₹40,000',
    posLimit: 75000,
    posLimitDisplay: '₹75,000',
    loungeAccess: 'Not Included',
    loungeAccessDetail: 'Standard domestic card without complimentary airport lounge access.',
    annualFee: 125,
    annualFeeDisplay: '₹125 + 18% GST',
    issuanceFee: 'Nil',
    forexMarkup: '3.50% + GST',
    rating: 4.6,
    reviewsCount: 3840,
    tag: 'India’s Most Popular',
    highlights: [
      'Instant RuPay UPI linkage on BHIM, PhonePe, Google Pay & Paytm',
      '1 SBI Rewardz Point per ₹200 spent on shopping, dining & fuel',
      'Contactless tap-and-pay enabled for transactions up to ₹5,000 without PIN',
      'Accepted across 50,000+ SBI ATMs and millions of merchant POS terminals'
    ],
    perks: {
      insurance: 'Complimentary lost card liability coverage from time of reporting',
      cashback: 'SBI Rewardz points redeemable on recharge, flights and vouchers',
      upi: '100% interoperable with all UPI apps and BHIM QR codes'
    }
  },
  {
    id: 'hdfc-easyshop-platinum',
    name: 'HDFC EasyShop Platinum Debit Card',
    bankName: 'HDFC Bank',
    bankCode: 'HDFC',
    network: 'Visa',
    categories: ['all', 'lounge', 'premium'],
    atmLimit: 100000,
    atmLimitDisplay: '₹1,00,000',
    posLimit: 500000,
    posLimitDisplay: '₹5,00,000',
    loungeAccess: '2 Visits / Quarter',
    loungeAccessDetail: '2 complimentary domestic airport lounge visits per calendar quarter (spend ₹5,000 in prev. quarter).',
    annualFee: 750,
    annualFeeDisplay: '₹750 + 18% GST (Waived for Preferred & Imperia)',
    issuanceFee: 'Nil',
    forexMarkup: '3.50% + GST',
    rating: 4.8,
    reviewsCount: 2950,
    tag: 'Best for Cashbacks & Travel',
    highlights: [
      '1% cashback on telecom, utilities, grocery & supermarket spends (up to ₹750/month)',
      'High daily ATM cash withdrawal limit of ₹1 Lakh & POS limit of ₹5 Lakh',
      '₹10 Lakh complimentary accidental death insurance cover',
      'Fuel surcharge reversal at authorized BPCL, IOCL & HPCL outlets'
    ],
    perks: {
      insurance: '₹10 Lakh Accidental Death & ₹1 Crore International Air Accident Cover',
      cashback: 'Flat 1% cashback credited directly into linked savings account',
      upi: 'Full UPI linkage supported via HDFC PayZapp, PhonePe and GPay'
    }
  },
  {
    id: 'icici-coral-debit',
    name: 'ICICI Bank Coral Debit Card',
    bankName: 'ICICI Bank',
    bankCode: 'ICICI',
    network: 'Mastercard / RuPay',
    categories: ['all', 'lounge', 'rupay'],
    atmLimit: 100000,
    atmLimitDisplay: '₹1,00,000',
    posLimit: 300000,
    posLimitDisplay: '₹3,00,000',
    loungeAccess: '2 Visits / Quarter',
    loungeAccessDetail: '2 complimentary domestic airport lounge visits per quarter (subject to ₹3,000 previous quarter spends).',
    annualFee: 599,
    annualFeeDisplay: '₹599 + 18% GST (Waived for Wealth Banking)',
    issuanceFee: 'Nil',
    forexMarkup: '3.50% + GST',
    rating: 4.7,
    reviewsCount: 2180,
    tag: 'Best for Movies & Dining',
    highlights: [
      '25% discount on BookMyShow movie tickets (up to ₹150 twice per month)',
      '2 ICICI Reward Points per ₹200 spent domestically; 4 points on international spends',
      'Complimentary personal air accident insurance up to ₹20 Lakh',
      'RuPay variant available with direct UPI account linkage'
    ],
    perks: {
      insurance: '₹20 Lakh Air Accident & ₹5 Lakh Personal Accidental Death cover',
      cashback: 'Culinary Treats program with minimum 15% discount at 2,500+ restaurants',
      upi: 'Instant RuPay variant linking on iMobile and all UPI platforms'
    }
  },
  {
    id: 'axis-burgundy-debit',
    name: 'Axis Bank Burgundy Debit Card',
    bankName: 'Axis Bank',
    bankCode: 'Axis',
    network: 'Mastercard',
    categories: ['all', 'lounge', 'forex', 'premium'],
    atmLimit: 300000,
    atmLimitDisplay: '₹3,00,000',
    posLimit: 600000,
    posLimitDisplay: '₹6,00,000',
    loungeAccess: 'Complimentary Unlimited',
    loungeAccessDetail: 'Unlimited domestic and international airport lounge access + 2 complimentary guest visits.',
    annualFee: 0,
    annualFeeDisplay: 'Nil (Exclusive to Burgundy Account Holders)',
    issuanceFee: 'Nil',
    forexMarkup: '0% (Zero Forex Markup)',
    rating: 4.9,
    reviewsCount: 1420,
    tag: 'Ultra-Premium Zero Forex',
    highlights: [
      '0% foreign currency markup on all international shopping POS and ATM withdrawals',
      'Highest daily withdrawal limit in India: ₹3 Lakh cash ATM & ₹6 Lakh POS transactions',
      'Buy 1 Get 1 free movie tickets on BookMyShow (up to ₹500 discount per ticket, 4 times/mo)',
      'Complimentary golf games and certification lessons across championship clubs in India'
    ],
    perks: {
      insurance: '₹1 Crore Personal Air Accident & baggage delay cover up to ₹60,000',
      cashback: '3 EDGE REWARD Points per ₹200 spent, redeemable on luxury stays',
      upi: 'Seamless integration with Axis Mobile and all major UPI handles'
    }
  },
  {
    id: 'bob-rupay-platinum',
    name: 'Bank of Baroda RuPay Platinum Debit Card',
    bankName: 'Bank of Baroda',
    bankCode: 'BOB',
    network: 'RuPay',
    categories: ['all', 'rupay', 'lounge'],
    atmLimit: 50000,
    atmLimitDisplay: '₹50,000',
    posLimit: 100000,
    posLimitDisplay: '₹1,00,000',
    loungeAccess: '2 Visits / Year',
    loungeAccessDetail: '2 complimentary domestic airport lounge visits per calendar year across participating lounges.',
    annualFee: 250,
    annualFeeDisplay: '₹250 + 18% GST',
    issuanceFee: 'Nil',
    forexMarkup: '3.00% + GST',
    rating: 4.5,
    reviewsCount: 1840,
    tag: 'Best RuPay Value Card',
    highlights: [
      '5% cashback on utility bill payments (electricity, gas, municipal taxes up to ₹50/month)',
      'Seamless RuPay UPI binding for peer-to-merchant and QR code payments',
      'Complimentary Accidental Death / Permanent Total Disability cover up to ₹2,00,000 by NPCI',
      'Exclusive RuPay dining, grocery, and travel vouchers through NPCI partners'
    ],
    perks: {
      insurance: '₹2,00,000 NPCI Accidental Death / Disability Insurance included free',
      cashback: '5% utility cashback credited to savings account every month',
      upi: 'Native RuPay architecture designed for instant high-speed UPI routing'
    }
  },
  {
    id: 'kotak-privy-league',
    name: 'Kotak Privy League Signature Debit Card',
    bankName: 'Kotak Mahindra Bank',
    bankCode: 'Kotak',
    network: 'Visa',
    categories: ['all', 'lounge', 'premium'],
    atmLimit: 150000,
    atmLimitDisplay: '₹1,50,000',
    posLimit: 350000,
    posLimitDisplay: '₹3,50,000',
    loungeAccess: '2 Visits / Quarter',
    loungeAccessDetail: '2 complimentary domestic airport lounge visits per calendar quarter with Priority Pass option.',
    annualFee: 0,
    annualFeeDisplay: 'Nil (With Privy League Accounts)',
    issuanceFee: 'Nil',
    forexMarkup: '3.50% + GST',
    rating: 4.7,
    reviewsCount: 1390,
    tag: 'Free Unlimited ATM Access',
    highlights: [
      'Unlimited free domestic ATM cash withdrawals across all bank ATMs in India',
      'High daily ATM cash limit of ₹1.5 Lakh & POS spend limit of ₹3.5 Lakh',
      'Lost card liability insurance coverage up to ₹3,50,000',
      'Fuel surcharge waiver on petrol pumps up to ₹30,000 monthly transactions'
    ],
    perks: {
      insurance: '₹3.5 Lakh Lost Card Liability & ₹15 Lakh Personal Accident Insurance',
      cashback: 'Kotak Everyday Rewards convertible to air miles or retail shopping gift cards',
      upi: 'High-speed UPI transactions with Kotak 811 and external UPI applications'
    }
  },
  {
    id: 'fi-money-federal',
    name: 'Fi Money Federal Bank Debit Card',
    bankName: 'Federal Bank & Fi',
    bankCode: 'Federal',
    network: 'Visa',
    categories: ['all', 'forex', 'rupay'],
    atmLimit: 50000,
    atmLimitDisplay: '₹50,000',
    posLimit: 200000,
    posLimitDisplay: '₹2,00,000',
    loungeAccess: '1 Visit / Quarter',
    loungeAccessDetail: '1 complimentary domestic airport lounge visit per quarter on Infinite/Salary plan.',
    annualFee: 199,
    annualFeeDisplay: '₹199 + GST (Waived on ₹25,000 balance)',
    issuanceFee: 'Nil',
    forexMarkup: '0% (On Infinite Plan)',
    rating: 4.6,
    reviewsCount: 1980,
    tag: 'Best Digital Banking Card',
    highlights: [
      'Zero forex markup on international card swipes and overseas online payments',
      'Smart automated FIT Rules for round-up savings on every debit card transaction',
      'In-app card freeze, international toggle, and dynamic contactless limit adjustments',
      'Zero ATM fee on Federal Bank network and 5 free transactions across all other ATMs'
    ],
    perks: {
      insurance: '₹5,00,000 personal accidental cover backed by Federal Bank',
      cashback: 'FIT coins on every spend redeemable for gold and branded merchant vouchers',
      upi: 'Instant UPI ID created upon account setup with biometric security'
    }
  },
  {
    id: 'pnb-rupay-select',
    name: 'PNB RuPay Select Debit Card',
    bankName: 'Punjab National Bank',
    bankCode: 'PNB',
    network: 'RuPay',
    categories: ['all', 'rupay', 'lounge', 'premium'],
    atmLimit: 100000,
    atmLimitDisplay: '₹1,00,000',
    posLimit: 300000,
    posLimitDisplay: '₹3,00,000',
    loungeAccess: '2 Dom / Qtr + 2 Int / Yr',
    loungeAccessDetail: '2 complimentary domestic lounge visits per quarter + 2 complimentary international lounge visits per year.',
    annualFee: 500,
    annualFeeDisplay: '₹500 + 18% GST',
    issuanceFee: 'Nil',
    forexMarkup: '3.00% + GST',
    rating: 4.6,
    reviewsCount: 1670,
    tag: 'Premium Wellness & Lounges',
    highlights: [
      'Comprehensive health package: free annual preventive checkups, gym access and spa vouchers',
      'Complimentary golf games and practice sessions at certified Indian golf courses',
      '₹10 Lakh accidental insurance cover and ₹50,000 baggage delay cover',
      'Full RuPay UPI 2.0 integration for seamless scan-and-pay across all UPI merchants'
    ],
    perks: {
      insurance: '₹10,00,000 Accidental Death and Permanent Disability Insurance cover',
      cashback: 'RuPay Select dining, concierge and curated e-commerce discounts',
      upi: '100% interoperable on all Bharat QR and UPI payment handles'
    }
  }
];

// ATM & POS Limits Data across Major Indian Banks
const ATM_LIMIT_GUIDE = [
  {
    bank: 'State Bank of India (SBI)',
    card: 'SBI Global International (RuPay/Visa)',
    dailyAtm: '₹40,000',
    otherBankAtmPerTx: '₹10,000',
    posLimit: '₹75,000',
    freeAtmMetro: '3 Free / Month',
    freeAtmNonMetro: '5 Free / Month',
    chargePostFree: '₹21 + GST (Cash) | ₹8 + GST (Non-Financial)',
    contactlessLimit: '₹5,000 without PIN'
  },
  {
    bank: 'HDFC Bank',
    card: 'EasyShop Platinum Debit Card',
    dailyAtm: '₹1,00,000',
    otherBankAtmPerTx: '₹10,000',
    posLimit: '₹5,00,000',
    freeAtmMetro: '3 Free / Month',
    freeAtmNonMetro: '5 Free / Month',
    chargePostFree: '₹21 + GST (Cash) | ₹8.50 + GST (Non-Financial)',
    contactlessLimit: '₹5,000 without PIN'
  },
  {
    bank: 'ICICI Bank',
    card: 'Coral Debit Card / Titanium',
    dailyAtm: '₹1,00,000',
    otherBankAtmPerTx: '₹10,000',
    posLimit: '₹3,00,000',
    freeAtmMetro: '3 Free / Month',
    freeAtmNonMetro: '5 Free / Month',
    chargePostFree: '₹21 + GST (Cash) | ₹8.50 + GST (Non-Financial)',
    contactlessLimit: '₹5,000 without PIN'
  },
  {
    bank: 'Axis Bank',
    card: 'Burgundy / Priority Debit Card',
    dailyAtm: '₹3,00,000',
    otherBankAtmPerTx: '₹10,000',
    posLimit: '₹6,00,000',
    freeAtmMetro: 'Unlimited Free (Burgundy) / 3-5 Standard',
    freeAtmNonMetro: 'Unlimited Free (Burgundy) / 5 Standard',
    chargePostFree: '₹21 + GST (Cash) | ₹10 + GST (Non-Financial)',
    contactlessLimit: '₹5,000 without PIN'
  },
  {
    bank: 'Bank of Baroda',
    card: 'RuPay Platinum / Classic',
    dailyAtm: '₹50,000',
    otherBankAtmPerTx: '₹10,000',
    posLimit: '₹1,00,000',
    freeAtmMetro: '3 Free / Month',
    freeAtmNonMetro: '5 Free / Month',
    chargePostFree: '₹21 + GST (Cash) | ₹8 + GST (Non-Financial)',
    contactlessLimit: '₹5,000 without PIN'
  },
  {
    bank: 'Kotak Mahindra Bank',
    card: 'Privy League Signature',
    dailyAtm: '₹1,50,000',
    otherBankAtmPerTx: '₹10,000',
    posLimit: '₹3,50,000',
    freeAtmMetro: 'Unlimited Free (Privy) / 3 Standard',
    freeAtmNonMetro: 'Unlimited Free (Privy) / 5 Standard',
    chargePostFree: '₹21 + GST (Cash) | ₹8.50 + GST (Non-Financial)',
    contactlessLimit: '₹5,000 without PIN'
  },
  {
    bank: 'Punjab National Bank (PNB)',
    card: 'RuPay Select Debit Card',
    dailyAtm: '₹1,00,000',
    otherBankAtmPerTx: '₹10,000',
    posLimit: '₹3,00,000',
    freeAtmMetro: '3 Free / Month',
    freeAtmNonMetro: '5 Free / Month',
    chargePostFree: '₹21 + GST (Cash) | ₹9 + GST (Non-Financial)',
    contactlessLimit: '₹5,000 without PIN'
  }
];

// Comprehensive Verified Debit Cards FAQ
const FAQS = [
  {
    q: "How do I generate or reset my Debit Card Green PIN?",
    a: "You can generate or reset your Debit Card Green PIN instantly through 4 official channels: (1) At any of your bank's ATMs: Select 'PIN Generation' or 'Green PIN', enter your registered mobile number and account number, and verify the 6-digit OTP sent to your phone to create your new 4-digit PIN. (2) Mobile Banking App: Navigate to 'Cards' > 'Debit Card Services' > 'Set/Reset PIN' and authenticate with MPIN or Biometrics. (3) Internet Banking: Log in, head to 'Cards' > 'Debit Cards' > 'Change PIN', verify with OTP. (4) Bank SMS Banking: Send a designated SMS format (e.g., 'PIN <last 4 digits>' to the bank's toll-free number) to trigger an instant OTP."
  },
  {
    q: "How can I increase or modify my daily ATM withdrawal and POS limits?",
    a: "Under the Reserve Bank of India (RBI) 2020 Card Safety Directives, every cardholder has complete freedom to adjust their ATM and POS spending limits 24/7. Simply open your bank's mobile banking app (e.g., YONO SBI, HDFC MobileBanking, iMobile Pay, Axis Mobile), go to 'Debit Card Settings' or 'Manage Limits', select 'Domestic Usage', and use the slider to set your custom daily ATM and E-commerce/POS limits within the bank's maximum allowed threshold. Changes take effect instantly without visiting a branch."
  },
  {
    q: "What is the RBI 3-Day Zero Liability rule for fraudulent debit card transactions?",
    a: "As per RBI Circular DBR.No.Leg.BC.78/09.07.005/2017-18, if an unauthorized electronic debit card transaction occurs due to contributory fraud, negligence, or deficiency by the bank (or a third-party breach where the fault lies neither with the bank nor the customer), you have ZERO liability provided you notify your bank within 3 working days of receiving the transaction alert. The bank must reverse and shadow-credit the disputed amount to your account within 10 working days of reporting. If reported between 4 to 7 working days, customer liability is capped between ₹5,000 and ₹10,000 depending on account type."
  },
  {
    q: "How do I activate international transactions on my Indian debit card?",
    a: "By RBI mandate, all newly issued Indian debit cards have international usage and contactless NFC disabled by default to protect customer funds. To activate international transactions: (1) Log in to your bank's Mobile Banking App or Net Banking portal. (2) Go to 'Debit Card Controls' or 'Manage Card Usage'. (3) Toggle 'International Usage' to ON. (4) Set a safe daily international spending limit. (5) Authenticate the change via OTP. You can switch international usage back OFF at any time when not traveling."
  },
  {
    q: "Can I link my RuPay debit card to UPI apps like Google Pay, PhonePe, or Paytm?",
    a: "Yes! All RuPay debit cards issued by Indian banks can be linked directly to any UPI application. Open Google Pay, PhonePe, Paytm, or BHIM, select 'Add Bank Account' or 'Add RuPay Card', verify your registered mobile number via SIM SMS, select your bank, and enter the last 6 digits and expiry date of your RuPay debit card. You will then set a 4 or 6-digit UPI PIN to make instant payments directly from your linked savings account."
  },
  {
    q: "How do airport lounge visits work on debit cards, and what are the spend criteria?",
    a: "Many premium debit cards (such as HDFC EasyShop Platinum, ICICI Coral, Axis Burgundy, and PNB RuPay Select) provide complimentary domestic airport lounge access. However, leading banks now apply a quarterly spend threshold (e.g., spending ₹5,000 in the previous calendar quarter on HDFC EasyShop Platinum, or ₹3,000 on ICICI Coral) to qualify for complimentary visits in the subsequent quarter. At the airport lounge reception, present your physical debit card; an authorization charge of ₹2 (Visa/Mastercard) or ₹25 (RuPay) will be swiped and immediately refunded to validate entry."
  },
  {
    q: "What are the charges for ATM cash withdrawals after exceeding the free monthly quota?",
    a: "Under RBI guidelines, bank account holders receive 5 free financial and non-financial transactions per month at their own bank ATMs. At other bank ATMs, customers receive 3 free transactions per month in 6 metro cities (Mumbai, New Delhi, Kolkata, Chennai, Bengaluru, and Hyderabad) and 5 free transactions in non-metro locations. Once you exceed this quota, the maximum interchange fee that banks can charge is capped at ₹21 + applicable GST per financial withdrawal, and up to ₹8.50 + GST for non-financial transactions (balance inquiry or mini-statement)."
  },
  {
    q: "What should I do immediately if my debit card is swallowed by an ATM machine or stolen?",
    a: "Follow these 3 immediate steps: (1) Instantly block the card using your mobile banking app: open the app, tap 'Block Card' or 'Temporary Freeze'. (2) Send the emergency card block SMS from your registered phone number (e.g., 'BLOCK <last 4 digits>' to your bank's short code) or call the 24/7 toll-free customer care line immediately. (3) If swallowed by an ATM machine due to technical timeout or power failure, note down the ATM Machine ID, branch address, date, and exact timestamp. Contact the parent branch to retrieve or request a new replacement chip card with a fresh PIN."
  }
];

const DebitCardsPage: React.FC<DebitCardsPageProps> = ({ openApplyModal, openEligibilityModal }) => {
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedBank, setSelectedBank] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'atm-high' | 'fee-low'>('popular');

  // Comparison Drawer State (up to 3 cards)
  const [compareList, setCompareList] = useState<string[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqFilterQuery, setFaqFilterQuery] = useState<string>('');

  // Interactive Card Selector State
  const [cashNeed, setCashNeed] = useState<number>(50000);
  const [needsLounge, setNeedsLounge] = useState<boolean>(false);
  const [needsUpi, setNeedsUpi] = useState<boolean>(true);

  // Unique banks list for filter
  const uniqueBanks = useMemo(() => {
    const banks = new Set<string>();
    DEBIT_CARDS.forEach(card => banks.add(card.bankName));
    return Array.from(banks).sort();
  }, []);

  // Filtered and Sorted Cards
  const filteredCards = useMemo(() => {
    return DEBIT_CARDS.filter(card => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = card.name.toLowerCase().includes(q);
        const matchesBank = card.bankName.toLowerCase().includes(q);
        const matchesNetwork = card.network.toLowerCase().includes(q);
        const matchesPerk = card.highlights.some(h => h.toLowerCase().includes(q));
        if (!matchesName && !matchesBank && !matchesNetwork && !matchesPerk) {
          return false;
        }
      }

      // Category Filter
      if (selectedCategory !== 'all') {
        if (!card.categories.includes(selectedCategory)) {
          return false;
        }
      }

      // Bank Filter
      if (selectedBank !== 'all') {
        if (card.bankName !== selectedBank) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'atm-high') {
        return b.atmLimit - a.atmLimit;
      }
      if (sortBy === 'fee-low') {
        return a.annualFee - b.annualFee;
      }
      // default 'popular': highest rating & reviews
      return (b.rating * b.reviewsCount) - (a.rating * a.reviewsCount);
    });
  }, [selectedCategory, selectedBank, searchQuery, sortBy]);

  // Comparison toggle
  const toggleCompare = (cardId: string) => {
    setCompareList(prev => {
      if (prev.includes(cardId)) {
        return prev.filter(id => id !== cardId);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 debit cards simultaneously.');
        return prev;
      }
      return [...prev, cardId];
    });
  };

  const comparedCards = useMemo(() => {
    return DEBIT_CARDS.filter(card => compareList.includes(card.id));
  }, [compareList]);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    if (!faqFilterQuery.trim()) return FAQS;
    const q = faqFilterQuery.toLowerCase();
    return FAQS.filter(f => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q));
  }, [faqFilterQuery]);

  // Recommended Card from Interactive Selector
  const recommendedCard = useMemo(() => {
    let matches = DEBIT_CARDS.filter(c => c.atmLimit >= cashNeed);
    if (needsLounge) {
      matches = matches.filter(c => c.categories.includes('lounge'));
    }
    if (needsUpi) {
      matches = matches.filter(c => c.categories.includes('rupay') || c.network.includes('RuPay'));
    }
    if (matches.length > 0) {
      return matches[0];
    }
    // Fallback to highest ATM limit card
    return DEBIT_CARDS.find(c => c.id === 'hdfc-easyshop-platinum') || DEBIT_CARDS[0];
  }, [cashNeed, needsLounge, needsUpi]);

  const handleApplyClick = (cardName: string) => {
    if (openApplyModal) {
      openApplyModal(`Debit Card - ${cardName}`);
    } else if (openEligibilityModal) {
      openEligibilityModal('Debit Card');
    }
  };

  const handleGeneralEligibility = () => {
    if (openEligibilityModal) {
      openEligibilityModal('Debit Card');
    } else if (openApplyModal) {
      openApplyModal('Debit Card');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* 1. SEO Head Metadata */}
      <Helmet>
        <title>Compare Best Debit Cards in India: Lounge Access, ATM Limits & Offers | BanksCart</title>
        <link rel="canonical" href="https://www.bankscart.com/cards/debit" />
        <meta
          name="description"
          content="Compare India's best debit cards from SBI, HDFC, ICICI, Axis & Bank of Baroda. Check airport lounge access, daily ATM & POS limits, RuPay UPI linkage, and zero fraud liability."
        />
        <meta
          name="keywords"
          content="debit card, best debit cards India, rupay debit card upi, airport lounge access debit card, atm withdrawal limit, hdfc easyshop platinum, sbi global debit card, icici coral debit card, axis burgundy debit card"
        />
        {/* OpenGraph Metadata */}
        <meta property="og:title" content="Compare Best Debit Cards in India: Lounge Access, ATM Limits & Offers | BanksCart" />
        <meta
          property="og:description"
          content="Discover top Indian bank debit cards with complimentary lounge access, high ATM withdrawal limits, contactless NFC, and RuPay UPI integration."
        />
        <meta property="og:url" content="https://www.bankscart.com/cards/debit" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="BanksCart" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Best Debit Cards in India 2026 - Limits & Lounge Access | BanksCart" />
        <meta
          name="twitter:description"
          content="Compare daily cash limits, lounge visits, AMF charges & reward structures across India's leading banks."
        />
        {/* JSON-LD Schemas */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://www.bankscart.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Cards",
                "item": "https://www.bankscart.com/cards"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Debit Cards",
                "item": "https://www.bankscart.com/cards/debit"
              }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialProduct",
            "name": "Indian Bank Debit Cards Comparison Platform",
            "description": "Compare daily ATM withdrawal limits, POS limits, airport lounge access, and RuPay UPI linkage across India's top banks including SBI, HDFC, ICICI, Axis, and Bank of Baroda.",
            "provider": {
              "@type": "FinancialService",
              "name": "BanksCart",
              "url": "https://www.bankscart.com"
            },
            "feesAndCommissionsSpecification": "Annual maintenance charges vary from ₹0 to ₹750 + GST depending on issuing bank tier.",
            "url": "https://www.bankscart.com/cards/debit"
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": FAQS.map(faq => ({
              "@type": "Question",
              "name": faq.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.a
              }
            }))
          })}
        </script>
      </Helmet>

      {/* 2. Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <Breadcrumb path={['Home', 'Cards', 'Debit Cards']} />
        </div>
      </div>

      {/* 3. Institutional Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden py-14 lg:py-20 border-b border-slate-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
        
        {/* Soft Accent Glows matching BanksCart Trust Blue & Slate */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-900/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-amber-400 text-xs font-semibold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Verified Bank Marketplace 2026
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Compare Best Debit Cards in India:{' '}
                <span className="text-amber-400">ATM Limits, Lounges & RuPay UPI</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Unlock daily ATM withdrawal limits up to <span className="text-white font-semibold font-mono tabular-nums">₹3,00,000</span>, complimentary airport lounge visits, zero forex markup, and direct RuPay UPI linkage. All backed by the RBI 3-day zero liability protection mandate.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#comparison-matrix"
                  className="px-6 py-3.5 bg-[#A16207] hover:bg-[#854D0E] text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 group text-sm"
                >
                  Compare Debit Cards
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <button
                  type="button"
                  onClick={handleGeneralEligibility}
                  className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 font-semibold rounded-lg shadow-sm transition-all text-sm flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Check Bank Account Eligibility
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>RBI Zero Fraud Liability</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Smartphone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>RuPay UPI 2.0 Linking</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Plane className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Airport Lounge Access</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Lock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>₹5 Lakh DICGC Insured</span>
                </div>
              </div>
            </div>

            {/* Right Hero Card Visual: Realistic Institutional Card Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-sm sm:max-w-md">
                {/* Visual Glassmorphic Card Container */}
                <div className="relative rounded-2xl bg-gradient-to-tr from-slate-900 via-blue-950 to-slate-800 p-6 sm:p-7 border border-slate-700 shadow-2xl text-white">
                  <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-600/20 border border-amber-500/30 flex items-center justify-center font-bold text-amber-400 text-xs">
                        BC
                      </div>
                      <span className="font-bold tracking-tight text-sm text-slate-100">BanksCart Institutional Guide</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-950 text-emerald-400 border border-emerald-800">
                      RBI Compliant
                    </span>
                  </div>

                  {/* Highlights Grid */}
                  <div className="mt-5 space-y-4">
                    <div className="flex items-center justify-between py-2 border-b border-slate-800 text-xs">
                      <span className="text-slate-400">Domestic ATM Limits</span>
                      <span className="font-mono tabular-nums font-semibold text-white">₹40,000 – ₹3,00,000 / day</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-slate-800 text-xs">
                      <span className="text-slate-400">Online / POS Spend Cap</span>
                      <span className="font-mono tabular-nums font-semibold text-white">₹1,00,000 – ₹6,00,000 / day</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-slate-800 text-xs">
                      <span className="text-slate-400">Airport Lounge Privileges</span>
                      <span className="font-mono tabular-nums font-semibold text-amber-400">Up to 8 Visits / Year</span>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-slate-800 text-xs">
                      <span className="text-slate-400">Contactless Tap-and-Pay</span>
                      <span className="font-mono tabular-nums font-semibold text-emerald-400">₹5,000 Without PIN</span>
                    </div>

                    <div className="flex items-center justify-between py-2 text-xs">
                      <span className="text-slate-400">UPI Linkage Speed</span>
                      <span className="font-semibold text-emerald-400">Instant (RuPay & Bharat QR)</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span>Deposit Security</span>
                    <span className="text-white font-medium flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      100% Backed by Bank Solvency
                    </span>
                  </div>
                </div>

                {/* Decorative floating stats pill */}
                <div className="absolute -bottom-4 -left-4 bg-white text-slate-900 px-4 py-2 rounded-xl shadow-lg border border-slate-200 hidden sm:flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">Fraud Protection</div>
                    <div className="text-xs font-bold text-slate-900">Zero Liability (3-Day RBI)</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Interactive Card Selector / Limit Matcher Tool */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 uppercase tracking-wider mb-1">
                  <Sliders className="w-3.5 h-3.5" />
                  Smart Recommendation Engine
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Find the Right Debit Card for Your Cash & Travel Needs
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Customize your desired daily withdrawal and perk preferences to match top institutional debit cards.
                </p>
              </div>

              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Live Product Data
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6">
              {/* Controls */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="daily-cash-slider" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                      Daily ATM Cash Requirement
                    </label>
                    <span className="text-base font-bold font-mono tabular-nums text-slate-900 bg-white px-2.5 py-1 rounded border border-slate-200 shadow-sm">
                      ₹{cashNeed.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <input
                    id="daily-cash-slider"
                    type="range"
                    min="20000"
                    max="300000"
                    step="10000"
                    value={cashNeed}
                    onChange={(e) => setCashNeed(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#A16207]"
                  />
                  <div className="flex justify-between text-[11px] text-slate-500 font-mono tabular-nums mt-1">
                    <span>₹20,000</span>
                    <span>₹1,00,000</span>
                    <span>₹2,00,000</span>
                    <span>₹3,00,000</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div
                    onClick={() => setNeedsLounge(!needsLounge)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      needsLounge
                        ? 'bg-blue-50/70 border-blue-900/30 text-blue-950 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border text-xs ${
                      needsLounge ? 'bg-blue-900 border-blue-900 text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {needsLounge && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Airport Lounge Access</div>
                      <div className="text-xs text-slate-500 mt-0.5">Complimentary quarterly domestic lounge visits</div>
                    </div>
                  </div>

                  <div
                    onClick={() => setNeedsUpi(!needsUpi)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      needsUpi
                        ? 'bg-amber-50/70 border-amber-600/30 text-amber-950 shadow-sm'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border text-xs ${
                      needsUpi ? 'bg-[#A16207] border-amber-700 text-white' : 'border-slate-300 bg-white'
                    }`}>
                      {needsUpi && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">RuPay UPI Integration</div>
                      <div className="text-xs text-slate-500 mt-0.5">Direct linking on Google Pay, PhonePe & Paytm</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommended Match Result Tile */}
              <div className="md:col-span-5">
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Best Matched Debit Card
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      {recommendedCard.bankName}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">
                      {recommendedCard.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {recommendedCard.network}
                      </span>
                      <span className="text-xs font-bold font-mono tabular-nums text-emerald-700 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                        {recommendedCard.rating} ({recommendedCard.reviewsCount})
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-500 block">Daily ATM Cash</span>
                      <span className="font-mono tabular-nums font-bold text-slate-900 text-sm">
                        {recommendedCard.atmLimitDisplay}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Lounge Privileges</span>
                      <span className="font-bold text-blue-900 text-sm">
                        {recommendedCard.loungeAccess}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {recommendedCard.highlights[0]}
                  </p>

                  <div className="pt-1">
                    {openApplyModal ? (
                      <ApplyButton
                        loanType={`Debit Card - ${recommendedCard.name}`}
                        openApplyModal={openApplyModal}
                        variant="primary"
                        fullWidth={true}
                        className="py-2.5 bg-[#A16207] hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                      >
                        Apply for {recommendedCard.bankCode} Card <ArrowRight className="w-3.5 h-3.5" />
                      </ApplyButton>
                    ) : (
                      <button
                        onClick={() => handleApplyClick(recommendedCard.name)}
                        className="w-full py-2.5 bg-[#A16207] hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                      >
                        Apply for {recommendedCard.bankCode} Card <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Main Comparison Matrix & Listing Section */}
      <section id="comparison-matrix" className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold tracking-wider text-blue-900 uppercase">
                Multi-Bank Comparison Matrix
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Compare Top Indian Debit Cards 2026
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-2xl">
                Real ATM withdrawal quotas, annual maintenance charges, airport lounge access terms, and reward privileges across India’s leading public and private banks.
              </p>
            </div>

            {/* Quick Count & Active Compare Badge */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono tabular-nums text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-sm">
                Showing <strong className="text-slate-900 font-bold">{filteredCards.length}</strong> of {DEBIT_CARDS.length} Cards
              </span>

              {compareList.length > 0 && (
                <button
                  onClick={() => setIsCompareModalOpen(true)}
                  className="px-3.5 py-1.5 bg-blue-900 text-white text-xs font-bold rounded-lg shadow hover:bg-blue-800 transition-all flex items-center gap-1.5 animate-pulse"
                >
                  Compare ({compareList.length}) Selected <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Filter Bar */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm mb-8 space-y-4">
            
            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-100 scrollbar-none">
              {CATEGORIES.map(cat => {
                const IconComponent = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Search, Bank Filter & Sort Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
              {/* Search input */}
              <div className="sm:col-span-5 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search by card name, bank or feature..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900 placeholder-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Bank Filter dropdown */}
              <div className="sm:col-span-4">
                <select
                  value={selectedBank}
                  onChange={(e) => setSelectedBank(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-800"
                >
                  <option value="all">All Issuing Banks</option>
                  {uniqueBanks.map(bank => (
                    <option key={bank} value={bank}>{bank}</option>
                  ))}
                </select>
              </div>

              {/* Sort by dropdown */}
              <div className="sm:col-span-3">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'popular' | 'atm-high' | 'fee-low')}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-800"
                >
                  <option value="popular">Sort: Most Popular</option>
                  <option value="atm-high">Sort: Highest ATM Limit</option>
                  <option value="fee-low">Sort: Lowest Annual Fee</option>
                </select>
              </div>
            </div>

          </div>

          {/* Cards Grid */}
          {filteredCards.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-900">No debit cards matched your filter criteria</h3>
              <p className="text-xs text-slate-500 mt-1">Try resetting the category filter or clearing your search term.</p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedBank('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCards.map((card) => {
                const isCompared = compareList.includes(card.id);
                return (
                  <div
                    key={card.id}
                    className="bg-white rounded-2xl border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                  >
                    {/* Top Card Header */}
                    <div className="p-5 pb-4 border-b border-slate-100">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                          {card.bankName}
                        </span>

                        {card.tag && (
                          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                            {card.tag}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                        {card.name}
                      </h3>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                          {card.network}
                        </span>
                        <span className="text-[11px] font-bold font-mono tabular-nums text-emerald-700 flex items-center gap-1">
                          <Star className="w-3 h-3 fill-emerald-600 text-emerald-600" />
                          {card.rating}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          ({card.reviewsCount} reviews)
                        </span>
                      </div>
                    </div>

                    {/* Financial Specs Matrix Grid (Tabular Nums) */}
                    <div className="p-5 bg-slate-50/60 border-b border-slate-100 grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-[11px] text-slate-500 block">Daily Domestic ATM</span>
                        <span className="font-mono tabular-nums font-bold text-slate-900 text-sm">
                          {card.atmLimitDisplay}
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-500 block">Daily POS / E-com</span>
                        <span className="font-mono tabular-nums font-bold text-slate-900 text-sm">
                          {card.posLimitDisplay}
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-500 block">Airport Lounge</span>
                        <span className="font-bold text-blue-900">
                          {card.loungeAccess}
                        </span>
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-500 block">Annual Fee (AMF)</span>
                        <span className="font-mono tabular-nums font-semibold text-slate-800">
                          {card.annualFeeDisplay}
                        </span>
                      </div>
                    </div>

                    {/* Features & Highlights */}
                    <div className="p-5 flex-1 space-y-3">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Key Advantages
                      </div>
                      <ul className="space-y-2 text-xs text-slate-600">
                        {card.highlights.slice(0, 3).map((hl, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 flex-shrink-0" />
                            <span className="leading-relaxed">{hl}</span>
                          </li>
                        ))}
                      </ul>

                      {card.categories.includes('rupay') && (
                        <div className="mt-3 p-2 rounded-lg bg-emerald-50/80 border border-emerald-200/60 text-[11px] text-emerald-800 flex items-center gap-1.5">
                          <Smartphone className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>RuPay UPI: 1-Click Link on PhonePe & GPay</span>
                        </div>
                      )}
                    </div>

                    {/* Card Footer Actions */}
                    <div className="p-5 pt-3 bg-white border-t border-slate-100 space-y-2.5">
                      <div className="grid grid-cols-2 gap-2">
                        {openApplyModal ? (
                          <ApplyButton
                            loanType={`Debit Card - ${card.name}`}
                            openApplyModal={openApplyModal}
                            variant="primary"
                            fullWidth={true}
                            className="py-2.5 bg-[#A16207] hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1"
                          >
                            Apply Now
                          </ApplyButton>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleApplyClick(card.name)}
                            className="py-2.5 bg-[#A16207] hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1"
                          >
                            Apply Now
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => toggleCompare(card.id)}
                          className={`py-2.5 rounded-lg text-xs font-semibold border transition-all flex items-center justify-center gap-1 ${
                            isCompared
                              ? 'bg-blue-50 border-blue-900 text-blue-900 font-bold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          {isCompared ? (
                            <>
                              <Check className="w-3.5 h-3.5" /> Added to Compare
                            </>
                          ) : (
                            '+ Compare'
                          )}
                        </button>
                      </div>

                      <p className="text-[10px] text-center text-slate-400">
                        Zero Joining Fee • 100% Online Paperless Verification
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

        </div>
      </section>

      {/* 6. Daily ATM & POS Withdrawal Limit Guide (Across Indian Banks) */}
      <section className="py-14 bg-white border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold tracking-wider text-blue-900 uppercase">
              Regulatory Banking Reference
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Indian Bank Daily ATM & POS Limit Benchmark Guide
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Authorized daily cash withdrawal ceilings, POS merchant limits, and monthly free ATM transaction quotas under RBI regulations.
            </p>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white border-b border-slate-800">
                  <th className="p-3.5 font-semibold">Bank & Typical Variant</th>
                  <th className="p-3.5 font-semibold">Self-ATM Daily Cash</th>
                  <th className="p-3.5 font-semibold">Other Bank ATM (per tx)</th>
                  <th className="p-3.5 font-semibold">Daily POS / E-com</th>
                  <th className="p-3.5 font-semibold">Free Monthly ATMs (Metro)</th>
                  <th className="p-3.5 font-semibold">Free Monthly ATMs (Non-Metro)</th>
                  <th className="p-3.5 font-semibold">Charges Exceeding Quota</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {ATM_LIMIT_GUIDE.map((row, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{row.bank}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">{row.card}</div>
                    </td>
                    <td className="p-3.5 font-mono tabular-nums font-bold text-slate-900">
                      {row.dailyAtm}
                    </td>
                    <td className="p-3.5 font-mono tabular-nums text-slate-700">
                      {row.otherBankAtmPerTx}
                    </td>
                    <td className="p-3.5 font-mono tabular-nums font-semibold text-slate-900">
                      {row.posLimit}
                    </td>
                    <td className="p-3.5 font-mono tabular-nums text-slate-700">
                      {row.freeAtmMetro}
                    </td>
                    <td className="p-3.5 font-mono tabular-nums text-slate-700">
                      {row.freeAtmNonMetro}
                    </td>
                    <td className="p-3.5 font-mono tabular-nums text-[11px] text-slate-600">
                      {row.chargePostFree}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-900 flex-shrink-0" />
              <span>
                <strong>Metro Cities defined by RBI:</strong> Mumbai, New Delhi, Kolkata, Chennai, Bengaluru, and Hyderabad.
              </span>
            </div>
            <div className="text-[11px] text-slate-500 font-mono tabular-nums">
              Contactless NFC limit capped at ₹5,000 without PIN per transaction.
            </div>
          </div>

        </div>
      </section>

      {/* 7. RBI 3-Day Zero Liability Regulatory Framework & Security */}
      <section className="py-14 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold tracking-wider text-emerald-700 uppercase bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
              Customer Protection Mandate
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
              RBI 3-Day Zero Liability Fraud Protection Framework
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Under RBI Circular DBR.No.Leg.BC.78/09.07.005/2017-18, customers are legally safeguarded against unauthorized electronic debit card transactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* 0 to 3 Working Days */}
            <div className="bg-white rounded-2xl border-2 border-emerald-500/40 p-6 shadow-sm relative">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono tabular-nums text-sm flex items-center justify-center mb-4">
                0-3
              </div>
              <span className="inline-block text-xs font-bold text-emerald-700 uppercase tracking-wide bg-emerald-50 px-2 py-0.5 rounded mb-2">
                Within 3 Working Days
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Zero Customer Liability</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If an unauthorized electronic transaction occurs and you notify the issuing bank within 3 working days of receiving the SMS/email alert, your liability is <strong className="text-emerald-700">ZERO</strong>. The full disputed amount must be credited back to your account within 10 working days.
              </p>
            </div>

            {/* 4 to 7 Working Days */}
            <div className="bg-white rounded-2xl border border-amber-300 p-6 shadow-sm relative">
              <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 font-bold font-mono tabular-nums text-sm flex items-center justify-center mb-4">
                4-7
              </div>
              <span className="inline-block text-xs font-bold text-amber-800 uppercase tracking-wide bg-amber-50 px-2 py-0.5 rounded mb-2">
                4 to 7 Working Days
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Limited Capped Liability</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If the delay in reporting is between 4 and 7 working days, your liability is strictly capped by RBI: maximum <span className="font-mono tabular-nums font-bold">₹5,000</span> for basic accounts, and maximum <span className="font-mono tabular-nums font-bold">₹10,000</span> for regular savings accounts with balance up to ₹5 Lakh.
              </p>
            </div>

            {/* Beyond 7 Days */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm relative">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold font-mono tabular-nums text-sm flex items-center justify-center mb-4">
                7+
              </div>
              <span className="inline-block text-xs font-bold text-slate-600 uppercase tracking-wide bg-slate-100 px-2 py-0.5 rounded mb-2">
                Beyond 7 Working Days
              </span>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Bank Board Policy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                If the fraudulent debit transaction is reported after 7 working days, customer liability is settled according to the individual bank's board-approved regulatory policy, subject to Ombudsman escalation.
              </p>
            </div>
          </div>

          {/* 4 Pillars of Card Security Controls */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-6">
              Mandatory In-App Safety Features on Every Indian Debit Card
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
                  <Smartphone className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900">Instant Switch ON / OFF</h4>
                <p className="text-slate-600 leading-relaxed">
                  Toggle domestic ATM, POS, and online e-commerce transactions independently with 1-tap in your mobile banking app.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
                  <SlidersHorizontal className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900">Custom Limit Setting</h4>
                <p className="text-slate-600 leading-relaxed">
                  Reduce your daily ATM cash or POS limit to any arbitrary lower amount (e.g., ₹10,000) to protect your principal balance.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
                  <Lock className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900">Tokenization Standard</h4>
                <p className="text-slate-600 leading-relaxed">
                  Merchants never store your real 16-digit card number. A dynamic RBI token prevents database compromise risks.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900">₹5 Lakh DICGC Guarantee</h4>
                <p className="text-slate-600 leading-relaxed">
                  All savings deposits accessed by debit cards are insured up to ₹5,00,000 per depositor per bank by the RBI subsidiary DICGC.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. Comprehensive FAQ Section (Accordion with Search) */}
      <section className="py-14 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-8">
            <span className="text-xs font-bold tracking-wider text-blue-900 uppercase">
              Frequently Asked Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Indian Debit Cards: PIN, Limits, Fraud & Lounges
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Clear, verified answers according to RBI norms and official bank guidelines.
            </p>

            {/* Quick FAQ Search */}
            <div className="mt-4 max-w-md mx-auto relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search debit card questions..."
                value={faqFilterQuery}
                onChange={(e) => setFaqFilterQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 text-slate-900"
              />
              {faqFilterQuery && (
                <button
                  onClick={() => setFaqFilterQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-xl border transition-all ${
                    isOpen ? 'bg-slate-50 border-slate-300 shadow-sm' : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="flex justify-between items-center w-full p-4 sm:p-5 text-left focus:outline-none gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-blue-900 flex-shrink-0" />
                      <span className="text-sm sm:text-base font-bold text-slate-900">{faq.q}</span>
                    </div>
                    <div className="flex-shrink-0 text-slate-400">
                      {isOpen ? <ChevronUp className="w-5 h-5 text-slate-600" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 mt-1">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 9. Final High-Trust Institutional Conversion Banner */}
      <section className="bg-slate-900 text-white py-14 lg:py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/10 text-amber-400 border border-amber-400/20">
              Upgrade Your Banking Power
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
              Ready to Upgrade to High-Limit Debit Cards & Airport Lounges?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Compare 8+ leading debit cards from SBI, HDFC, ICICI, Axis and Bank of Baroda. Unlock zero forex markup, quarterly lounge access, and direct RuPay UPI linkage in under 3 minutes.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => handleApplyClick('Institutional Upgrade')}
                className="px-6 py-3.5 bg-[#A16207] hover:bg-[#854D0E] text-white font-semibold rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 group text-sm"
              >
                Apply for Recommended Debit Card
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={handleGeneralEligibility}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-100 font-semibold rounded-lg shadow-sm transition-all text-sm flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Check Savings Account Eligibility
              </button>
            </div>

            <div className="pt-6 flex flex-wrap justify-center items-center gap-6 text-xs text-slate-400 border-t border-slate-800/80">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> 100% Free Comparison
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> No Hidden Fees
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Zero CIBIL Impact for Debit Applications
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Side-by-Side Card Comparison Modal / Slide-Out */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Side-by-Side Debit Card Comparison ({comparedCards.length} Cards)
                </h3>
                <p className="text-xs text-slate-500">
                  Direct evaluation of limits, lounge access, and charges.
                </p>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Comparison Table Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1">
              {comparedCards.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-xs text-slate-500">No cards selected for comparison.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200">
                        <th className="p-3 font-semibold text-slate-500 w-1/4">Feature / Card</th>
                        {comparedCards.map(c => (
                          <th key={c.id} className="p-3 font-bold text-slate-900 text-sm">
                            <div className="text-xs text-blue-900 font-medium">{c.bankName}</div>
                            <div>{c.name}</div>
                            <span className="text-[11px] font-normal text-slate-500">{c.network}</span>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Daily ATM Cash Limit</td>
                        {comparedCards.map(c => (
                          <td key={c.id} className="p-3 font-mono tabular-nums font-bold text-slate-900">
                            {c.atmLimitDisplay}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Daily Online / POS Limit</td>
                        {comparedCards.map(c => (
                          <td key={c.id} className="p-3 font-mono tabular-nums font-bold text-slate-900">
                            {c.posLimitDisplay}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Airport Lounge Access</td>
                        {comparedCards.map(c => (
                          <td key={c.id} className="p-3 font-bold text-blue-900">
                            {c.loungeAccess}
                            <div className="text-[10px] text-slate-500 font-normal mt-0.5">{c.loungeAccessDetail}</div>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Annual Maintenance Fee</td>
                        {comparedCards.map(c => (
                          <td key={c.id} className="p-3 font-mono tabular-nums text-slate-800">
                            {c.annualFeeDisplay}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Forex Markup</td>
                        {comparedCards.map(c => (
                          <td key={c.id} className="p-3 font-mono tabular-nums text-slate-800">
                            {c.forexMarkup}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">RuPay UPI Integration</td>
                        {comparedCards.map(c => (
                          <td key={c.id} className="p-3">
                            {c.categories.includes('rupay') ? (
                              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                                <CheckCircle2 className="w-3.5 h-3.5" /> Supported
                              </span>
                            ) : (
                              <span className="text-slate-500">Standard Card</span>
                            )}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Primary Cashback / Perk</td>
                        {comparedCards.map(c => (
                          <td key={c.id} className="p-3 text-[11px] text-slate-600 leading-snug">
                            {c.highlights[0]}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold text-slate-600 bg-slate-50/50">Action</td>
                        {comparedCards.map(c => (
                          <td key={c.id} className="p-3">
                            <button
                              onClick={() => {
                                setIsCompareModalOpen(false);
                                handleApplyClick(c.name);
                              }}
                              className="w-full py-2 bg-[#A16207] hover:bg-amber-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                            >
                              Apply
                            </button>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => setCompareList([])}
                className="text-xs text-red-600 font-semibold hover:underline"
              >
                Clear All Selected
              </button>

              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800"
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Compare Bar (Bottom of screen when cards are selected) */}
      {compareList.length > 0 && !isCompareModalOpen && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900 text-white px-5 py-3 rounded-full shadow-2xl border border-slate-700 flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs">
            <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-900 font-mono font-bold flex items-center justify-center text-[11px]">
              {compareList.length}
            </span>
            <span className="font-semibold text-slate-200">
              Cards ready for side-by-side comparison
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-3.5 py-1.5 bg-[#A16207] hover:bg-amber-800 text-white text-xs font-bold rounded-full transition-all flex items-center gap-1 shadow-sm"
            >
              Compare Now <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setCompareList([])}
              className="p-1 rounded-full text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default DebitCardsPage;
