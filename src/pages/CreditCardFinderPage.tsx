import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Breadcrumb from '../components/Breadcrumb';
import {
  CreditCard,
  ArrowLeft,
  ArrowRight,
  Plane,
  Fuel,
  ShoppingBag,
  Sparkles,
  Briefcase,
  CheckCircle,
  RefreshCcw,
  ShieldCheck,
  Award,
  TrendingUp,
  Percent,
  Star,
  Building2,
  Wallet,
  Check,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Lock,
  Info
} from 'lucide-react';

interface CreditCardFinderPageProps {
  openApplyModal?: (loanType?: string) => void;
}

interface MatchedCard {
  id: string;
  name: string;
  bank: string;
  bankLogo: string;
  tag: string;
  rating: number;
  reviewsCount: string;
  joiningFee: string;
  annualFee: string;
  feeWaiver: string;
  rewardRateHighlight: string;
  annualValueFormula: (monthlySpend: number) => number;
  rewards: string[];
  perks: { label: string; value: string }[];
  description: string;
  isTopPick?: boolean;
}

// Multi-Bank Card Database for Recommendations
const ALL_CARDS: Record<string, MatchedCard> = {
  // --- CASHBACK CARDS ---
  sbiCashback: {
    id: 'sbi-cashback',
    name: 'SBI Cashback Credit Card',
    bank: 'SBI Card',
    bankLogo: '/logos/sbi.png',
    tag: 'Best Online Shopping Cashback',
    rating: 4.8,
    reviewsCount: '3,840+',
    joiningFee: '₹999 + GST',
    annualFee: '₹999 + GST',
    feeWaiver: 'Waived on annual spends > ₹2,00,000',
    rewardRateHighlight: '5% Flat Cashback Online',
    annualValueFormula: (monthlySpend: number) => {
      const annualSpend = monthlySpend * 12;
      // 5% cashback on 70% online spends up to monthly cap of ₹5,000 cashback, plus 1% on 30% offline
      const onlineSpend = monthlySpend * 0.7;
      const monthlyCashback = Math.min(onlineSpend * 0.05, 5000) + (monthlySpend * 0.3 * 0.01);
      const grossRewards = Math.round(monthlyCashback * 12);
      const fee = annualSpend >= 200000 ? 0 : 999;
      return grossRewards - fee;
    },
    rewards: [
      '5% flat cashback on all online merchant purchases with no merchant lock-in',
      '1% cashback on offline retail transactions and utility payments',
      'Direct monthly statement credit without reward point expiry hassles'
    ],
    perks: [
      { label: 'Online Cashback', value: '5% Flat' },
      { label: 'Spend Waiver', value: '₹2,00,000' },
      { label: 'Fuel Surcharge', value: '1% Waiver' }
    ],
    description: 'The highest flat cashback card in India with zero merchant restrictions. Cashback gets automatically credited to your statement every month.',
    isTopPick: true
  },
  amazonPayIcici: {
    id: 'amazon-pay-icici',
    name: 'Amazon Pay ICICI Bank Credit Card',
    bank: 'ICICI Bank',
    bankLogo: '/logos/icici.png',
    tag: '100% Lifetime Free (LTF)',
    rating: 4.8,
    reviewsCount: '5,210+',
    joiningFee: '₹0 (Lifetime Free)',
    annualFee: '₹0 (Lifetime Free)',
    feeWaiver: 'Zero spend required — Free Forever',
    rewardRateHighlight: '5% Cashback on Amazon',
    annualValueFormula: (monthlySpend: number) => {
      const amazonSpend = monthlySpend * 0.4 * 0.05; // 5% for Prime
      const partnerSpend = monthlySpend * 0.3 * 0.02; // 2% on partners
      const otherSpend = monthlySpend * 0.3 * 0.01; // 1%
      return Math.round((amazonSpend + partnerSpend + otherSpend) * 12);
    },
    rewards: [
      '5% unlimited cashback on Amazon India for Prime members (3% for non-Prime)',
      '2% cashback on 100+ partner merchants (Swiggy, Uber, Zomato, BookMyShow)',
      'Zero joining and zero annual fee forever with zero maintenance overhead'
    ],
    perks: [
      { label: 'Annual Fee', value: '₹0 Lifetime' },
      { label: 'Amazon Prime', value: '5% Cashback' },
      { label: 'Reward Validity', value: 'Never Expires' }
    ],
    description: 'India\'s most popular lifetime free credit card. Earn uncapped monthly cashback credited directly as Amazon Pay balance.',
    isTopPick: false
  },
  hdfcMillennia: {
    id: 'hdfc-millennia',
    name: 'HDFC Millennia Credit Card',
    bank: 'HDFC Bank',
    bankLogo: '/logos/hdfc.png',
    tag: 'Top E-Commerce Multi-Brand Pick',
    rating: 4.7,
    reviewsCount: '4,150+',
    joiningFee: '₹1,000 + GST',
    annualFee: '₹1,000 + GST',
    feeWaiver: 'Waived on annual spends > ₹1,00,000',
    rewardRateHighlight: '5% CashBack on 10 Top Apps',
    annualValueFormula: (monthlySpend: number) => {
      const annualSpend = monthlySpend * 12;
      const topAppsSpend = monthlySpend * 0.6 * 0.05;
      const otherSpend = monthlySpend * 0.4 * 0.01;
      const milestoneBonus = annualSpend >= 400000 ? 4000 : annualSpend >= 100000 ? 1000 : 0;
      const grossRewards = Math.round((topAppsSpend + otherSpend) * 12) + milestoneBonus;
      const fee = annualSpend >= 100000 ? 0 : 1000;
      return grossRewards - fee;
    },
    rewards: [
      '5% CashBack on Amazon, Flipkart, Myntra, Swiggy, Zomato, Tata CLiQ & Uber',
      '1% CashBack on all other retail expenditures and wallet recharges',
      '₹1,000 gift voucher on achieving quarterly spends of ₹1,00,000'
    ],
    perks: [
      { label: 'Key Merchant Return', value: '5% CashBack' },
      { label: 'Spend Waiver', value: '₹1,00,000' },
      { label: 'Quarterly Milestone', value: '₹1,000 Voucher' }
    ],
    description: 'Specially engineered for digital shoppers. Enjoy 5% CashBack across all leading e-commerce platforms and fast fee waivers.',
    isTopPick: false
  },
  axisAce: {
    id: 'axis-ace',
    name: 'Axis Bank Ace Credit Card',
    bank: 'Axis Bank',
    bankLogo: '/logos/axis.png',
    tag: 'Best for Utility Bills & Groceries',
    rating: 4.7,
    reviewsCount: '2,920+',
    joiningFee: '₹499 + GST',
    annualFee: '₹499 + GST',
    feeWaiver: 'Waived on annual spends > ₹2,00,000',
    rewardRateHighlight: '5% Cashback on GPay Bills',
    annualValueFormula: (monthlySpend: number) => {
      const annualSpend = monthlySpend * 12;
      const gpayBills = Math.min(monthlySpend * 0.25 * 0.05, 500);
      const diningFood = monthlySpend * 0.25 * 0.04;
      const other = monthlySpend * 0.5 * 0.015;
      const grossRewards = Math.round((gpayBills + diningFood + other) * 12);
      const fee = annualSpend >= 200000 ? 0 : 499;
      return grossRewards - fee;
    },
    rewards: [
      '5% flat cashback on electricity, gas, DTH and mobile recharge via Google Pay',
      '4% flat cashback on Swiggy, Zomato, and Ola cab rides',
      '1.5% unlimited flat cashback on all other POS and online transactions'
    ],
    perks: [
      { label: 'Utility Return', value: '5% via GPay' },
      { label: 'Food & Cab Return', value: '4% Flat' },
      { label: 'Base Rate', value: '1.5% Unlimited' }
    ],
    description: 'Unbeatable utility and bill payment rewards with straightforward automatic statement cashback credits.',
    isTopPick: false
  },

  // --- TRAVEL & LOUNGE CARDS ---
  hdfcInfinia: {
    id: 'hdfc-infinia',
    name: 'HDFC Infinia Credit Card Metal Edition',
    bank: 'HDFC Bank',
    bankLogo: '/logos/hdfc.png',
    tag: "India's #1 Luxury Metal Card",
    rating: 4.9,
    reviewsCount: '1,890+',
    joiningFee: '₹12,500 + GST',
    annualFee: '₹12,500 + GST',
    feeWaiver: 'Waived on annual spends > ₹10,00,000',
    rewardRateHighlight: '33.3% Reward Rate via SmartBuy',
    annualValueFormula: (monthlySpend: number) => {
      const annualSpend = monthlySpend * 12;
      // SmartBuy 10X/5X flights/hotels + base 3.3%
      const travelSpends = monthlySpend * 0.3 * 0.333;
      const baseSpends = monthlySpend * 0.7 * 0.033;
      const grossRewards = Math.round((travelSpends + baseSpends) * 12);
      const fee = annualSpend >= 1000000 ? 0 : 12500;
      return grossRewards - fee;
    },
    rewards: [
      'Unlimited Domestic & International airport lounge access for primary and add-on members',
      '1:1 reward points redemption value against airline tickets and luxury hotel stays',
      'Low 2% foreign currency markup fee with complimentary Club Marriott membership'
    ],
    perks: [
      { label: 'Lounge Access', value: 'Unlimited Global' },
      { label: 'SmartBuy Rate', value: 'Up to 33.3%' },
      { label: 'Forex Markup', value: '2.0% Low' }
    ],
    description: 'The pinnacle of luxury financial cards in India. Best-in-class 1:1 points redemption on flight tickets and unconstrained airport lounge comfort.',
    isTopPick: true
  },
  axisAtlas: {
    id: 'axis-atlas',
    name: 'Axis Bank Atlas Credit Card',
    bank: 'Axis Bank',
    bankLogo: '/logos/axis.png',
    tag: 'Best Frequent Flyer Miles Accelerator',
    rating: 4.8,
    reviewsCount: '2,140+',
    joiningFee: '₹5,000 + GST',
    annualFee: '₹5,000 + GST',
    feeWaiver: 'Offset by 5,000 EDGE Miles annual renewal voucher',
    rewardRateHighlight: '5 EDGE Miles per ₹100 on Travel',
    annualValueFormula: (monthlySpend: number) => {
      const flightHotel = (monthlySpend * 0.4 / 100) * 5; // 5 miles per 100
      const other = (monthlySpend * 0.6 / 100) * 2; // 2 miles per 100
      const monthlyMiles = flightHotel + other;
      // 1 EDGE Mile = ₹1 to ₹2 against airline miles (Singapore Airlines, Qatar, Vistara)
      const annualMiles = monthlyMiles * 12 + 5000; // renewal bonus
      const rupeeValue = Math.round(annualMiles * 1.5);
      return rupeeValue - 5000;
    },
    rewards: [
      'Up to 18 Domestic & 12 International Airport Lounge visits per calendar year',
      'Direct transfer of EDGE Miles 1:2 to Singapore Airlines, Qatar Airways, Accor Hotels & ITC',
      'Tier upgrade milestone perks with tier bonuses up to 10,000 EDGE Miles'
    ],
    perks: [
      { label: 'Direct Flight Bookings', value: '5 Miles / ₹100' },
      { label: 'Domestic Lounges', value: 'Up to 18 / Year' },
      { label: 'Miles Transfer Ratio', value: '1:2 Partner Transfer' }
    ],
    description: 'Designed specifically for domestic and international aviation travelers. Transfer miles directly to leading global airlines at stellar conversion ratios.',
    isTopPick: false
  },
  hdfcRegaliaGold: {
    id: 'hdfc-regalia-gold',
    name: 'HDFC Regalia Gold Credit Card',
    bank: 'HDFC Bank',
    bankLogo: '/logos/hdfc.png',
    tag: 'Balanced Premium Travel & Dining',
    rating: 4.7,
    reviewsCount: '3,410+',
    joiningFee: '₹2,500 + GST',
    annualFee: '₹2,500 + GST',
    feeWaiver: 'Waived on annual spends > ₹4,00,000',
    rewardRateHighlight: '12 Domestic + 6 Int. Lounges',
    annualValueFormula: (monthlySpend: number) => {
      const annualSpend = monthlySpend * 12;
      const basePoints = (monthlySpend / 150) * 4;
      const accelerated = (monthlySpend * 0.25 / 150) * 16;
      const annualValuePoints = Math.round((basePoints + accelerated) * 12 * 0.5); // 0.5 value per point
      const milestone = annualSpend >= 500000 ? 5000 : annualSpend >= 150000 ? 1500 : 0;
      const fee = annualSpend >= 400000 ? 0 : 2500;
      return (annualValuePoints + milestone) - fee;
    },
    rewards: [
      '12 complimentary domestic airport lounge visits per year across India',
      '6 international lounge visits via Priority Pass for cardholder & add-on members',
      'Complimentary Club Marriott and MMT Black Elite annual memberships'
    ],
    perks: [
      { label: 'Domestic Lounges', value: '12 / Year' },
      { label: 'International Lounges', value: '6 / Year' },
      { label: 'Spend Waiver', value: '₹4,00,000' }
    ],
    description: 'The golden benchmark for middle-to-senior corporate travelers offering robust lounge access, dining memberships, and milestone flight vouchers.',
    isTopPick: true
  },
  iciciSapphiro: {
    id: 'icici-sapphiro',
    name: 'ICICI Bank Sapphiro Credit Card',
    bank: 'ICICI Bank',
    bankLogo: '/logos/icici.png',
    tag: 'Dual Variant Travel & Golf Platform',
    rating: 4.6,
    reviewsCount: '2,670+',
    joiningFee: '₹6,500 + GST',
    annualFee: '₹3,500 + GST',
    feeWaiver: 'Waived on annual spends > ₹6,00,000',
    rewardRateHighlight: '4 Lounges / Quarter + BOGO Movies',
    annualValueFormula: (monthlySpend: number) => {
      const annualSpend = monthlySpend * 12;
      const rewards = Math.round(annualSpend * 0.022);
      const bogoMovieSavings = 6000; // ₹500/mo BOGO
      const fee = annualSpend >= 600000 ? 0 : 3500;
      return (rewards + bogoMovieSavings) - fee;
    },
    rewards: [
      '4 complimentary domestic airport lounge visits every quarter (16 annually)',
      '2 complimentary international airport lounge visits per year via Dreamfolks',
      'Buy 1 Get 1 free movie ticket up to ₹500 twice a month on BookMyShow'
    ],
    perks: [
      { label: 'Domestic Lounges', value: '4 / Quarter' },
      { label: 'BookMyShow BOGO', value: 'Up to ₹500 x 2' },
      { label: 'Golf Privileges', value: 'Complimentary' }
    ],
    description: 'Comes as a powerful dual-card pack (Mastercard + American Express). Enjoy extensive airport lounge visits and premium weekend lifestyle benefits.',
    isTopPick: false
  },

  // --- FUEL SAVINGS CARDS ---
  sbiBpclOctane: {
    id: 'sbi-bpcl-octane',
    name: 'SBI BPCL Octane Credit Card',
    bank: 'SBI Card',
    bankLogo: '/logos/sbi.png',
    tag: '7.25% Valueback on Bharat Petroleum',
    rating: 4.8,
    reviewsCount: '3,110+',
    joiningFee: '₹1,499 + GST',
    annualFee: '₹1,499 + GST',
    feeWaiver: 'Waived on annual spends > ₹2,00,000',
    rewardRateHighlight: '7.25% Valueback on Fuel',
    annualValueFormula: (monthlySpend: number) => {
      const annualSpend = monthlySpend * 12;
      // 7.25% on fuel up to ₹4,000/mo, 10X on grocery/dining (2.5%), 1% on rest
      const fuelSpend = Math.min(monthlySpend * 0.4, 4000);
      const fuelValue = fuelSpend * 0.0725;
      const otherValue = (monthlySpend - fuelSpend) * 0.015;
      const grossRewards = Math.round((fuelValue + otherValue) * 12);
      const fee = annualSpend >= 200000 ? 0 : 1499;
      return grossRewards - fee;
    },
    rewards: [
      '7.25% total value back (25X reward points + 1% surcharge waiver) at BPCL petrol pumps',
      '10X reward points on grocery, departmental stores, and dining expenditures',
      '4 complimentary domestic airport lounge visits per calendar year'
    ],
    perks: [
      { label: 'BPCL Fuel Savings', value: '7.25% Valueback' },
      { label: 'Airport Lounges', value: '4 Visits / Year' },
      { label: 'Grocery Points', value: '10X Multiplier' }
    ],
    description: 'The highest fuel return credit card in India. Turn everyday petrol and diesel expenses into substantial annual savings and free fuel redemptions.',
    isTopPick: true
  },
  hdfcIndianOil: {
    id: 'hdfc-indianoil',
    name: 'IndianOil HDFC Bank Credit Card',
    bank: 'HDFC Bank',
    bankLogo: '/logos/hdfc.png',
    tag: '5% Valueback on IndianOil Pumps',
    rating: 4.6,
    reviewsCount: '2,480+',
    joiningFee: '₹500 + GST',
    annualFee: '₹500 + GST',
    feeWaiver: 'Waived on annual spends > ₹50,000',
    rewardRateHighlight: '5% Fuel Points (Up to 50L Free)',
    annualValueFormula: (monthlySpend: number) => {
      const annualSpend = monthlySpend * 12;
      const fuelSpend = monthlySpend * 0.4 * 0.05;
      const billSpend = monthlySpend * 0.3 * 0.05;
      const otherSpend = monthlySpend * 0.3 * 0.01;
      const grossRewards = Math.round((fuelSpend + billSpend + otherSpend) * 12);
      const fee = annualSpend >= 50000 ? 0 : 500;
      return grossRewards - fee;
    },
    rewards: [
      '5% of your fuel spends as Fuel Points at IndianOil outlets (earn up to 50 Litres free/yr)',
      '1% fuel surcharge waiver on all transactions between ₹400 and ₹5,000',
      '5% Fuel Points on grocery purchases and utility bill payments'
    ],
    perks: [
      { label: 'Fuel Reward', value: '5% Fuel Points' },
      { label: 'Easy Fee Waiver', value: '₹50,000 Spend' },
      { label: 'Surcharge Waiver', value: '1% Surcharge' }
    ],
    description: 'Low annual fee with an extremely achievable ₹50,000 annual spend waiver. Ideal for regular car and two-wheeler commuters refueling at IndianOil.',
    isTopPick: false
  },
  iciciHpclSuperSaver: {
    id: 'icici-hpcl',
    name: 'ICICI Bank HPCL Super Saver Credit Card',
    bank: 'ICICI Bank',
    bankLogo: '/logos/icici.png',
    tag: '5% Valueback on HPCL Petrol Pumps',
    rating: 4.5,
    reviewsCount: '1,980+',
    joiningFee: '₹500 + GST',
    annualFee: '₹500 + GST',
    feeWaiver: 'Waived on annual spends > ₹1,50,000',
    rewardRateHighlight: '5% Savings via HP Pay',
    annualValueFormula: (monthlySpend: number) => {
      const annualSpend = monthlySpend * 12;
      const fuelSavings = monthlySpend * 0.35 * 0.05;
      const utilitySavings = monthlySpend * 0.25 * 0.05;
      const otherSavings = monthlySpend * 0.4 * 0.01;
      const gross = Math.round((fuelSavings + utilitySavings + otherSavings) * 12);
      const fee = annualSpend >= 150000 ? 0 : 500;
      return gross - fee;
    },
    rewards: [
      '5% total savings (4% cashback + 1% fuel surcharge waiver) on fuel transactions at HPCL pumps',
      'Additional 1.5% cashback as reward points on HP Pay wallet fuel payments',
      '5% reward points on utility, departmental store, and grocery purchases'
    ],
    perks: [
      { label: 'HPCL Fuel Savings', value: '5% Valueback' },
      { label: 'HP Pay Bonus', value: '1.5% Points' },
      { label: 'Utility Rate', value: '5% Points' }
    ],
    description: 'Get continuous 5% fuel savings at over 19,000 HPCL pumps across India with accelerated benefits on grocery and daily utility bills.',
    isTopPick: false
  },
  axisIndianOil: {
    id: 'axis-indianoil',
    name: 'IndianOil Axis Bank Credit Card',
    bank: 'Axis Bank',
    bankLogo: '/logos/axis.png',
    tag: '4% Valueback on IndianOil Outlets',
    rating: 4.5,
    reviewsCount: '1,720+',
    joiningFee: '₹500 + GST',
    annualFee: '₹500 + GST',
    feeWaiver: 'Waived on annual spends > ₹50,000',
    rewardRateHighlight: '20 EDGE Points / ₹100 on Fuel',
    annualValueFormula: (monthlySpend: number) => {
      const annualSpend = monthlySpend * 12;
      const fuelValue = monthlySpend * 0.35 * 0.04;
      const otherValue = monthlySpend * 0.65 * 0.01;
      const gross = Math.round((fuelValue + otherValue) * 12);
      const fee = annualSpend >= 50000 ? 0 : 500;
      return gross - fee;
    },
    rewards: [
      '20 EDGE reward points per ₹100 spent at IndianOil outlets (4% valueback rate)',
      '100% cashback up to ₹250 on your first fuel transaction completed within 30 days',
      '1% fuel surcharge waiver on transactions between ₹400 and ₹4,000'
    ],
    perks: [
      { label: 'IOCL Fuel Points', value: '4% Valueback' },
      { label: 'Welcome Cashback', value: '₹250 First Fuel' },
      { label: 'Annual Spend Waiver', value: '₹50,000' }
    ],
    description: 'A pocket-friendly fuel co-branded credit card offering rapid reward points redemption directly at IOCL pumps.',
    isTopPick: false
  },

  // --- LOW INTEREST / BALANCE TRANSFER CARDS ---
  sbiSimplySave: {
    id: 'sbi-simplysave',
    name: 'SBI SimplySAVE Credit Card',
    bank: 'SBI Card',
    bankLogo: '/logos/sbi.png',
    tag: 'Lowest Balance Transfer EMI & Low APR',
    rating: 4.7,
    reviewsCount: '4,100+',
    joiningFee: '₹499 + GST',
    annualFee: '₹499 + GST',
    feeWaiver: 'Waived on annual spends > ₹1,00,000',
    rewardRateHighlight: '0.75%/mo Balance Transfer EMI',
    annualValueFormula: (monthlySpend: number) => {
      const annualSpend = monthlySpend * 12;
      const diningGrocery = monthlySpend * 0.4 * 0.025; // 10X points
      const other = monthlySpend * 0.6 * 0.01;
      const gross = Math.round((diningGrocery + other) * 12);
      const fee = annualSpend >= 100000 ? 0 : 499;
      return gross - fee;
    },
    rewards: [
      'Balance Transfer on EMI with interest rates starting as low as 0.75% per month',
      'Instant Flexipay facility: convert transactions > ₹2,500 into easy 6 to 24 month EMIs',
      '10X Reward Points on dining, movies, grocery, and supermarket expenditures'
    ],
    perks: [
      { label: 'Balance Transfer', value: 'From 0.75%/mo' },
      { label: 'Flexipay Threshold', value: '₹2,500 Min' },
      { label: 'Offline Spends', value: '10X Points' }
    ],
    description: 'The preferred choice for consolidating high-cost card debts. Transfer outstanding balances from other bank cards at low rates with simple EMI conversion.',
    isTopPick: true
  },
  hdfcMoneybackPlus: {
    id: 'hdfc-moneyback-plus',
    name: 'HDFC MoneyBack+ Credit Card',
    bank: 'HDFC Bank',
    bankLogo: '/logos/hdfc.png',
    tag: 'Instant Low-Cost EasyEMI Facility',
    rating: 4.6,
    reviewsCount: '3,290+',
    joiningFee: '₹500 + GST',
    annualFee: '₹500 + GST',
    feeWaiver: 'Waived on annual spends > ₹50,000',
    rewardRateHighlight: 'EasyEMI at 1.25%/mo + 10X CashPoints',
    annualValueFormula: (monthlySpend: number) => {
      const annualSpend = monthlySpend * 12;
      const partnerSpend = monthlySpend * 0.4 * 0.033; // 10X on Flipkart, Amazon, BigBasket
      const otherSpend = monthlySpend * 0.6 * 0.008;
      const gross = Math.round((partnerSpend + otherSpend) * 12);
      const fee = annualSpend >= 50000 ? 0 : 500;
      return gross - fee;
    },
    rewards: [
      'Instant EasyEMI conversion at 1.25% per month with zero processing paperwork',
      '10X CashPoints on Amazon, Flipkart, BigBasket, Reliance Smart & Swiggy',
      '₹500 gift voucher on achieving quarterly retail spends of ₹50,000'
    ],
    perks: [
      { label: 'EMI Interest', value: '1.25% / Month' },
      { label: 'CashPoints Rate', value: '10X Partner' },
      { label: 'Spend Waiver', value: '₹50,000' }
    ],
    description: 'Effortlessly split unexpected high ticket expenditures into manageable low-interest EMIs while accumulating 10X CashPoints.',
    isTopPick: false
  },
  iciciCoral: {
    id: 'icici-coral',
    name: 'ICICI Bank Coral Credit Card',
    bank: 'ICICI Bank',
    bankLogo: '/logos/icici.png',
    tag: 'Flexible Financing & Zero Prepayment EMI',
    rating: 4.6,
    reviewsCount: '2,750+',
    joiningFee: '₹500 + GST',
    annualFee: '₹500 + GST',
    feeWaiver: 'Waived on annual spends > ₹1,50,000',
    rewardRateHighlight: 'Low Finance Charges & 1 Domestic Lounge',
    annualValueFormula: (monthlySpend: number) => {
      const annualSpend = monthlySpend * 12;
      const rewards = Math.round(annualSpend * 0.018);
      const moviePerks = 3000; // 25% off movies
      const fee = annualSpend >= 150000 ? 0 : 500;
      return (rewards + moviePerks) - fee;
    },
    rewards: [
      'Low monthly finance APR and instant 24x7 EMI conversion via iMobile Pay',
      '1 complimentary domestic airport lounge visit per quarter on spending ₹35,000',
      '25% discount up to ₹100 on purchase of minimum two movie tickets on BookMyShow'
    ],
    perks: [
      { label: 'Finance APR', value: 'Competitive Low' },
      { label: 'Movie Discount', value: '25% Off' },
      { label: 'Domestic Lounge', value: '1 / Quarter' }
    ],
    description: 'A versatile low-cost card packed with flexible loan-on-card facilities, affordable balance transfers, and quarterly airport lounge perks.',
    isTopPick: false
  },
  axisNeo: {
    id: 'axis-neo',
    name: 'Axis Bank Neo Credit Card',
    bank: 'Axis Bank',
    bankLogo: '/logos/axis.png',
    tag: 'Ultra-Low Annual Fee & Fast Micro-EMIs',
    rating: 4.5,
    reviewsCount: '1,630+',
    joiningFee: '₹250 + GST',
    annualFee: '₹250 + GST',
    feeWaiver: 'Waived on annual spends > ₹25,000',
    rewardRateHighlight: '₹250 Fee + 10% Zomato & BookMyShow',
    annualValueFormula: (monthlySpend: number) => {
      const annualSpend = monthlySpend * 12;
      const diningMovie = monthlySpend * 0.3 * 0.05;
      const rest = monthlySpend * 0.7 * 0.01;
      const gross = Math.round((diningMovie + rest) * 12);
      const fee = annualSpend >= 25000 ? 0 : 250;
      return gross - fee;
    },
    rewards: [
      'Convert purchases > ₹2,500 into low interest monthly installments with one click on Axis Mobile',
      '40% off on Zomato delivery and 10% off on BookMyShow movie tickets',
      '5% discount on utility bill payments through Paytm mobile app'
    ],
    perks: [
      { label: 'Lowest Joining Fee', value: '₹250 + GST' },
      { label: 'Zomato Discount', value: '40% Off' },
      { label: 'Spend Waiver', value: '₹25,000' }
    ],
    description: 'An exceptionally accessible entry card with the lowest renewal fee in the market and smooth in-app EMI financing.',
    isTopPick: false
  }
};

// Spending Priority Quiz Options
const SPENDING_PRIORITIES = [
  {
    id: 'cashback',
    label: 'Cashback & Shopping',
    badge: 'Most Popular',
    icon: ShoppingBag,
    summary: 'Utility bills, online shopping (Amazon, Flipkart, Swiggy) with direct statement cashback.',
    bestFor: 'Everyday spenders wanting straight statement credits with zero point-conversion friction.'
  },
  {
    id: 'travel',
    label: 'Travel & Airport Lounge',
    badge: 'Premium Lifestyle',
    icon: Plane,
    summary: 'Complimentary airport lounges (domestic & international), air miles transfer, and hotel perks.',
    bestFor: 'Frequent flyers, corporate executives, and vacationers seeking luxury travel privileges.'
  },
  {
    id: 'fuel',
    label: 'Fuel Savings & Commute',
    badge: 'High Valueback',
    icon: Fuel,
    summary: 'Fuel surcharge waivers and accelerated reward points at IOCL, BPCL, and HPCL outlets.',
    bestFor: 'Daily vehicle commuters, car owners, and fleet operators cutting fuel expenses.'
  },
  {
    id: 'lowInterest',
    label: 'Low Interest / Balance Transfer',
    badge: 'Debt Relief & EMIs',
    icon: Percent,
    summary: 'Lowest finance charges (APR), flexible EMI conversions, and debt consolidation balance transfer.',
    bestFor: 'Borrowers seeking debt consolidation, credit line flexibility, or large planned purchases.'
  }
];

// Monthly Spends Quiz Options
const MONTHLY_SPENDS = [
  {
    id: 'below25k',
    label: 'Below ₹25,000 / month',
    rangeText: 'Annual spends under ₹3,00,000',
    defaultAmount: 18000,
    strategy: 'Best for Lifetime Free (LTF) or starter cards with low annual fee waiver hurdles.'
  },
  {
    id: '25k-50k',
    label: '₹25,000 - ₹50,000 / month',
    rangeText: 'Annual spends ₹3,00,000 - ₹6,00,000',
    defaultAmount: 38000,
    strategy: 'Unlocks full fee waivers across mid-tier 5% cashback and travel cards.'
  },
  {
    id: '50k-100k',
    label: '₹50,000 - ₹1,00,000 / month',
    rangeText: 'Annual spends ₹6,00,000 - ₹12,00,000',
    defaultAmount: 75000,
    strategy: 'Unlocks quarterly milestone vouchers, golf access, and premium airport lounge perks.'
  },
  {
    id: 'above100k',
    label: 'Above ₹1,00,000 / month',
    rangeText: 'Annual spends above ₹12,00,000',
    defaultAmount: 150000,
    strategy: 'Ideal for super-premium metal cards (Infinia, Atlas) with 1:1 air miles and luxury concierge.'
  }
];

// Income / Employment Quiz Options
const EMPLOYMENT_TYPES = [
  {
    id: 'salaried50',
    label: 'Salaried (> ₹50,000 / month)',
    icon: Briefcase,
    category: 'Corporate Professional',
    description: 'Stable salary credits with standard Form 16 documentation and fast bank approval.'
  },
  {
    id: 'salaried100',
    label: 'Salaried (> ₹1,00,000 / month)',
    icon: Award,
    category: 'Senior Corporate / Tech MNC',
    description: 'High corporate income qualifying for premium metal tiers and elevated credit lines.'
  },
  {
    id: 'selfEmployed',
    label: 'Self-Employed Professional',
    icon: Building2,
    category: 'Doctor / CA / Consultant / Architect',
    description: 'ITR-based underwriting with ₹6L+ annual taxable income and custom credit limits.'
  },
  {
    id: 'businessOwner',
    label: 'Business Owner / MSME',
    icon: Wallet,
    category: 'Proprietor / Director / Trader',
    description: 'GST-registered business entity with high monthly commercial expenditures.'
  }
];

export default function CreditCardFinderPage({ openApplyModal }: CreditCardFinderPageProps) {
  // Quiz State
  const [step, setStep] = useState<number>(1);
  const [priority, setPriority] = useState<string>('cashback');
  const [spendTier, setSpendTier] = useState<string>('25k-50k');
  const [employment, setEmployment] = useState<string>('salaried50');

  // Interactive Slider Monthly Spend State on Results Step
  const [customMonthlySpend, setCustomMonthlySpend] = useState<number>(38000);

  // Sync custom spend when spendTier changes
  const handleSpendSelect = (spendId: string) => {
    setSpendTier(spendId);
    const matchedOption = MONTHLY_SPENDS.find(s => s.id === spendId);
    if (matchedOption) {
      setCustomMonthlySpend(matchedOption.defaultAmount);
    }
  };

  const handleNext = () => {
    setStep(prev => Math.min(4, prev + 1));
  };

  const handleBack = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleReset = () => {
    setStep(1);
    setPriority('cashback');
    setSpendTier('25k-50k');
    setEmployment('salaried50');
    setCustomMonthlySpend(38000);
  };

  // Multi-Bank Recommendation Match Engine
  const matchedCards = useMemo<MatchedCard[]>(() => {
    if (priority === 'cashback') {
      if (spendTier === 'below25k') {
        return [ALL_CARDS.amazonPayIcici, ALL_CARDS.axisAce, ALL_CARDS.sbiCashback];
      }
      if (spendTier === 'above100k' || employment === 'salaried100') {
        return [ALL_CARDS.sbiCashback, ALL_CARDS.hdfcMillennia, ALL_CARDS.axisAce];
      }
      return [ALL_CARDS.sbiCashback, ALL_CARDS.hdfcMillennia, ALL_CARDS.amazonPayIcici, ALL_CARDS.axisAce];
    }

    if (priority === 'travel') {
      if (spendTier === 'above100k' || employment === 'salaried100') {
        return [ALL_CARDS.hdfcInfinia, ALL_CARDS.axisAtlas, ALL_CARDS.iciciSapphiro];
      }
      if (spendTier === '50k-100k') {
        return [ALL_CARDS.hdfcRegaliaGold, ALL_CARDS.axisAtlas, ALL_CARDS.iciciSapphiro];
      }
      return [ALL_CARDS.hdfcRegaliaGold, ALL_CARDS.axisAtlas, ALL_CARDS.iciciSapphiro];
    }

    if (priority === 'fuel') {
      return [ALL_CARDS.sbiBpclOctane, ALL_CARDS.hdfcIndianOil, ALL_CARDS.iciciHpclSuperSaver, ALL_CARDS.axisIndianOil];
    }

    if (priority === 'lowInterest') {
      return [ALL_CARDS.sbiSimplySave, ALL_CARDS.hdfcMoneybackPlus, ALL_CARDS.iciciCoral, ALL_CARDS.axisNeo];
    }

    return [ALL_CARDS.sbiCashback, ALL_CARDS.hdfcMillennia, ALL_CARDS.amazonPayIcici];
  }, [priority, spendTier, employment]);

  // Frequently Asked Questions
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const faqs = [
    {
      q: 'Will using the BanksCart Credit Card Finder affect my CIBIL score?',
      a: 'No, not at all. Using our AI Credit Card Finder conducts a soft algorithmic match based entirely on your preferences and stated income. No bureau inquiry is submitted to CIBIL, Experian, or Equifax during the quiz matching phase.'
    },
    {
      q: 'How is the Estimated Annual Net Savings / Value calculated?',
      a: 'Our intelligence engine combines your simulated monthly spends with authentic card reward multipliers (e.g. 5% cashback or 33.3% SmartBuy travel rate), accounts for quarterly milestone vouchers, and subtracts the annual maintenance fee unless your annual spend exceeds the bank\'s fee waiver threshold.'
    },
    {
      q: 'What documents are required to apply for a matched credit card?',
      a: 'Standard Indian banking compliance requires your PAN Card, Aadhaar Card (for instant UIDAI OTP e-KYC), and proof of income (last 3 months bank statements or salary slips for salaried, or latest 2 years ITR computation for self-employed applicants).'
    },
    {
      q: 'How do annual fee waivers work on these credit cards?',
      a: 'Most top Indian credit cards (such as SBI Cashback, HDFC Millennia, or Axis Ace) automatically waive the renewal fee for the upcoming year when your cumulative card spends cross the bank\'s prescribed threshold (e.g. ₹1,00,000 to ₹2,00,000) within the 12-month billing cycle.'
    },
    {
      q: 'Can I apply for multiple cards recommended by the tool?',
      a: 'Yes, you can apply for any recommended card through our direct bank integrations. However, we recommend applying for the single top-matched card first to preserve your credit profile and prevent simultaneous hard inquiries from multiple lenders.'
    }
  ];

  // Structured Data Schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
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
        name: 'Credit Cards',
        item: 'https://www.bankscart.com/cards/credit-cards'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Card Finder',
        item: 'https://www.bankscart.com/cards/credit/finder'
      }
    ]
  };

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'BanksCart Credit Card Finder & Recommender',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    url: 'https://www.bankscart.com/cards/credit/finder',
    description: 'Intelligent multi-bank credit card recommendation engine matching Indian applicants with top cards across HDFC, SBI, ICICI, and Axis based on monthly spend, rewards, airport lounges, and salary.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR'
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };

  const slideVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.2 } }
  };

  return (
    <>
      <Helmet>
        <title>Credit Card Finder: Find the Best Card for Your Spends | BanksCart</title>
        <meta
          name="description"
          content="Use BanksCart's intelligent Credit Card Finder tool to match the best credit cards in India based on your monthly spends, reward preferences, airport lounge requirements, and salary. Compare HDFC, SBI, ICICI, Axis cards with instant paperless application."
        />
        <meta
          name="keywords"
          content="credit card finder, credit card recommender india, best credit cards, hdfc credit cards, sbi cashback card, icici amazon pay card, axis atlas card, airport lounge credit card"
        />
        <link rel="canonical" href="https://www.bankscart.com/cards/credit/finder" />

        {/* OpenGraph */}
        <meta property="og:title" content="Credit Card Finder: Find the Best Card for Your Spends | BanksCart" />
        <meta
          property="og:description"
          content="Use BanksCart's intelligent Credit Card Finder tool to match the best credit cards in India based on your monthly spends, reward preferences, airport lounge requirements, and salary."
        />
        <meta property="og:url" content="https://www.bankscart.com/cards/credit/finder" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Credit Card Finder: Find the Best Card for Your Spends | BanksCart" />
        <meta
          name="twitter:description"
          content="Use BanksCart's intelligent Credit Card Finder tool to match the best credit cards in India based on your monthly spends, reward preferences, and salary."
        />
        <meta name="twitter:image" content="https://www.bankscart.com/favicon-32x32.png" />

        {/* JSON-LD Schemas */}
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(softwareSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-ibm antialiased selection:bg-amber-100 selection:text-amber-900">
        {/* Top Breadcrumb Bar */}
        <div className="bg-slate-900 border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
            <Breadcrumb items={['Home', 'Credit Cards', 'Card Finder']} />
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-slate-900 text-white pt-10 pb-16 border-b border-slate-800 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/60 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI-Powered Credit Card Recommender</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
                Find the Best Credit Card for Your Spends
              </h1>
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
                Answer 3 quick questions about your spending style, monthly budget, and employment to unlock personalized card recommendations across HDFC, SBI, ICICI, and Axis Bank with zero impact on your CIBIL score.
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs text-slate-300">
                <div className="flex items-center gap-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>RBI Direct Scheduled Banks</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Unbiased Algorithm</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50">
                  <Percent className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>0% CIBIL Score Impact</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/60 p-2.5 rounded-lg border border-slate-700/50">
                  <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Free &amp; Secure</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 -mt-6">
          <div className="bg-white rounded-2xl shadow-md border border-slate-200 overflow-hidden">
            {/* Step Header & Progress Tracker */}
            <div className="bg-slate-50 border-b border-slate-200 px-6 sm:px-10 py-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900">
                    <span>Card Matching Wizard</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 font-mono tabular-nums">
                      {step === 4 ? 'Results Ready' : `Step ${step} of 3`}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                    {step === 1 && 'Step 1: Select Your Primary Spending Priority'}
                    {step === 2 && 'Step 2: Choose Your Estimated Monthly Card Spends'}
                    {step === 3 && 'Step 3: Select Your Employment & Income Profile'}
                    {step === 4 && 'Step 4: Your Matched Multi-Bank Recommendations'}
                  </h2>
                </div>

                {step === 4 ? (
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg shadow-sm transition-colors"
                  >
                    <RefreshCcw className="w-3.5 h-3.5 text-blue-900" />
                    <span>Restart Quiz</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    {[1, 2, 3].map(stepNum => (
                      <div
                        key={stepNum}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                          step === stepNum
                            ? 'bg-blue-900 text-white ring-4 ring-blue-100 shadow-sm'
                            : step > stepNum
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {step > stepNum ? <Check className="w-4 h-4" /> : stepNum}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Visual Progress Bar */}
              <div className="w-full bg-slate-200 h-1.5 rounded-full mt-5 overflow-hidden">
                <div
                  className="bg-blue-900 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Quiz Body */}
            <div className="p-6 sm:p-10">
              <AnimatePresence mode="wait">
                {/* STEP 1: SPENDING PRIORITY */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div>
                      <p className="text-slate-600 text-sm sm:text-base">
                        Where do you expect to make the majority of your monthly credit card transactions? Select your main goal to let our engine prioritize cards with the highest returns.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {SPENDING_PRIORITIES.map(option => {
                        const Icon = option.icon;
                        const isSelected = priority === option.id;
                        return (
                          <div
                            key={option.id}
                            onClick={() => {
                              setPriority(option.id);
                            }}
                            className={`relative cursor-pointer p-5 rounded-xl border-2 transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'border-blue-900 bg-blue-50/40 shadow-sm ring-1 ring-blue-900/10'
                                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                            }`}
                          >
                            <div>
                              <div className="flex items-start justify-between mb-3">
                                <div
                                  className={`w-11 h-11 rounded-lg flex items-center justify-center ${
                                    isSelected ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-700'
                                  }`}
                                >
                                  <Icon className="w-6 h-6" />
                                </div>
                                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                                  {option.badge}
                                </span>
                              </div>
                              <h3 className="text-lg font-bold text-slate-900 mb-1.5">{option.label}</h3>
                              <p className="text-xs text-slate-600 leading-relaxed mb-3">{option.summary}</p>
                            </div>

                            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                              <Info className="w-3.5 h-3.5 text-blue-900 shrink-0" />
                              <span>{option.bestFor}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Step Navigation */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                      <div className="text-xs text-slate-500">
                        Selected:{' '}
                        <span className="font-semibold text-slate-900">
                          {SPENDING_PRIORITIES.find(p => p.id === priority)?.label}
                        </span>
                      </div>
                      <button
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-950 text-white font-semibold text-sm rounded-lg shadow-sm transition-all"
                      >
                        <span>Continue to Monthly Spends</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: MONTHLY SPENDS */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div>
                      <p className="text-slate-600 text-sm sm:text-base">
                        What is your estimated total monthly spend across online shopping, utility bills, fuel, groceries, and dining? This determines your eligibility for annual fee waivers and milestone bonuses.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {MONTHLY_SPENDS.map(option => {
                        const isSelected = spendTier === option.id;
                        return (
                          <div
                            key={option.id}
                            onClick={() => handleSpendSelect(option.id)}
                            className={`cursor-pointer p-5 rounded-xl border-2 transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'border-blue-900 bg-blue-50/40 shadow-sm ring-1 ring-blue-900/10'
                                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-blue-900 font-mono">
                                  Monthly Bracket
                                </span>
                                {isSelected && (
                                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                    <Check className="w-3 h-3" /> Selected
                                  </span>
                                )}
                              </div>
                              <h3 className="text-xl font-bold text-slate-900 mb-1 tabular-nums font-mono">
                                {option.label}
                              </h3>
                              <p className="text-xs font-medium text-slate-500 mb-3 font-mono tabular-nums">
                                {option.rangeText}
                              </p>
                            </div>
                            <div className="pt-3 border-t border-slate-100 text-xs text-slate-600 leading-relaxed">
                              {option.strategy}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Step Navigation */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                      <button
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-900 hover:bg-blue-950 text-white font-semibold text-sm rounded-lg shadow-sm transition-all"
                      >
                        <span>Continue to Income Profile</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: EMPLOYMENT & INCOME */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div>
                      <p className="text-slate-600 text-sm sm:text-base">
                        Select your employment type and monthly net salary bracket. Banks evaluate this to determine card tier eligibility (Starter, Premium, or Super-Premium Metal) and credit limits.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {EMPLOYMENT_TYPES.map(option => {
                        const Icon = option.icon;
                        const isSelected = employment === option.id;
                        return (
                          <div
                            key={option.id}
                            onClick={() => setEmployment(option.id)}
                            className={`cursor-pointer p-5 rounded-xl border-2 transition-all flex flex-col justify-between ${
                              isSelected
                                ? 'border-blue-900 bg-blue-50/40 shadow-sm ring-1 ring-blue-900/10'
                                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                            }`}
                          >
                            <div>
                              <div className="flex items-start justify-between mb-3">
                                <div
                                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                    isSelected ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-700'
                                  }`}
                                >
                                  <Icon className="w-5 h-5" />
                                </div>
                                <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                                  {option.category}
                                </span>
                              </div>
                              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">{option.label}</h3>
                              <p className="text-xs text-slate-600 leading-relaxed mb-3">{option.description}</p>
                            </div>
                            <div className="pt-2 text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Instant Eligibility Check Supported</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Step Navigation */}
                    <div className="flex items-center justify-between pt-6 border-t border-slate-200">
                      <button
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>
                      <button
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm rounded-lg shadow-sm transition-all"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>View Matched Cards</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 4: MATCHED RESULTS */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="space-y-8"
                  >
                    {/* Header Summary Banner */}
                    <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>AI Recommendation Algorithm Complete</span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white">
                          Found {matchedCards.length} Top Card Matches for You
                        </h3>
                        <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
                          Matched based on your priority (
                          <span className="text-amber-400 font-semibold">
                            {SPENDING_PRIORITIES.find(p => p.id === priority)?.label}
                          </span>
                          ) and monthly spend of{' '}
                          <span className="text-white font-mono font-semibold tabular-nums">
                            ₹{customMonthlySpend.toLocaleString('en-IN')}
                          </span>
                          .
                        </p>
                      </div>

                      {/* Interactive Spend Slider */}
                      <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700 min-w-[280px]">
                        <div className="flex justify-between items-center text-xs mb-2">
                          <span className="text-slate-400 font-medium">Fine-Tune Monthly Spend:</span>
                          <span className="font-bold text-amber-400 font-mono text-sm tabular-nums">
                            ₹{customMonthlySpend.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <input
                          type="range"
                          min={10000}
                          max={200000}
                          step={5000}
                          value={customMonthlySpend}
                          onChange={e => setCustomMonthlySpend(Number(e.target.value))}
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                        />
                        <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono tabular-nums">
                          <span>₹10,000</span>
                          <span>₹1,00,000</span>
                          <span>₹2,00,000</span>
                        </div>
                      </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="space-y-6">
                      {matchedCards.map((card, idx) => {
                        const estimatedAnnualSavings = card.annualValueFormula(customMonthlySpend);
                        const isPrimary = idx === 0;

                        return (
                          <div
                            key={card.id}
                            className={`rounded-2xl border transition-all ${
                              isPrimary
                                ? 'bg-white border-blue-900 shadow-lg ring-1 ring-blue-900/20'
                                : 'bg-white border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md'
                            }`}
                          >
                            {/* Card Top Strip */}
                            <div
                              className={`px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b ${
                                isPrimary
                                  ? 'bg-blue-950 text-white rounded-t-2xl'
                                  : 'bg-slate-50 text-slate-700 border-slate-200 rounded-t-2xl'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <span
                                  className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                                    isPrimary
                                      ? 'bg-amber-500 text-slate-950'
                                      : 'bg-blue-100 text-blue-900'
                                  }`}
                                >
                                  {card.tag}
                                </span>
                                {isPrimary && (
                                  <span className="text-xs text-amber-300 font-semibold flex items-center gap-1">
                                    <Sparkles className="w-3.5 h-3.5" /> Highest Net Yield
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 text-xs font-semibold">
                                <div className="flex items-center text-amber-400">
                                  <Star className="w-3.5 h-3.5 fill-current" />
                                </div>
                                <span className={isPrimary ? 'text-white' : 'text-slate-900'}>
                                  {card.rating.toFixed(1)}
                                </span>
                                <span className={isPrimary ? 'text-slate-300' : 'text-slate-500'}>
                                  ({card.reviewsCount} borrower reviews)
                                </span>
                              </div>
                            </div>

                            {/* Card Details Body */}
                            <div className="p-6 sm:p-7">
                              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                                {/* Bank Logo & Identity */}
                                <div className="lg:col-span-4">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="w-12 h-12 rounded-lg bg-white border border-slate-200 p-1.5 flex items-center justify-center shrink-0 shadow-sm">
                                      <img
                                        src={card.bankLogo}
                                        alt={card.bank}
                                        className="max-h-full max-w-full object-contain"
                                        onError={e => {
                                          e.currentTarget.style.display = 'none';
                                        }}
                                      />
                                    </div>
                                    <div>
                                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        {card.bank}
                                      </span>
                                      <h4 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                                        {card.name}
                                      </h4>
                                    </div>
                                  </div>

                                  <div className="mt-3 inline-block px-3 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
                                    {card.rewardRateHighlight}
                                  </div>

                                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                                    {card.description}
                                  </p>
                                </div>

                                {/* Fee Matrix */}
                                <div className="lg:col-span-5 bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                                  <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                                    <div>
                                      <span className="text-slate-500 block mb-0.5">Joining Fee</span>
                                      <span className="font-bold text-slate-900 font-mono tabular-nums text-sm">
                                        {card.joiningFee}
                                      </span>
                                    </div>
                                    <div>
                                      <span className="text-slate-500 block mb-0.5">Annual Renewal Fee</span>
                                      <span className="font-bold text-slate-900 font-mono tabular-nums text-sm">
                                        {card.annualFee}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="text-xs text-slate-600 border-t border-slate-200 pt-2.5 flex items-start gap-1.5">
                                    <Info className="w-3.5 h-3.5 text-blue-900 shrink-0 mt-0.5" />
                                    <div>
                                      <span className="font-semibold text-slate-700">Waiver Condition: </span>
                                      <span className="font-mono tabular-nums">{card.feeWaiver}</span>
                                    </div>
                                  </div>

                                  {/* Key Perks Pills */}
                                  <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap gap-2">
                                    {card.perks.map((perk, i) => (
                                      <div
                                        key={i}
                                        className="bg-white border border-slate-200 px-2.5 py-1 rounded text-[11px]"
                                      >
                                        <span className="text-slate-500">{perk.label}: </span>
                                        <span className="font-bold text-slate-800 font-mono tabular-nums">
                                          {perk.value}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Net Value & Apply CTA */}
                                <div className="lg:col-span-3 text-left lg:text-right flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-200 pt-4 lg:pt-0 lg:pl-6">
                                  <div className="mb-4">
                                    <span className="text-xs text-slate-500 font-medium block">
                                      Est. Annual Net Value
                                    </span>
                                    <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">
                                      ₹{estimatedAnnualSavings.toLocaleString('en-IN')}
                                    </div>
                                    <span className="text-[11px] text-slate-400 block mt-0.5">
                                      Net of annual fee &amp; rewards
                                    </span>
                                  </div>

                                  <div className="space-y-2">
                                    {openApplyModal ? (
                                      <button
                                        onClick={() => openApplyModal('Credit Card')}
                                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-bold text-sm rounded-lg shadow-sm transition-all"
                                      >
                                        <CreditCard className="w-4 h-4" />
                                        <span>Apply via BanksCart</span>
                                      </button>
                                    ) : (
                                      <Link
                                        to="/loan-apply"
                                        className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white font-bold text-sm rounded-lg shadow-sm transition-all"
                                      >
                                        <CreditCard className="w-4 h-4" />
                                        <span>Apply via BanksCart</span>
                                      </Link>
                                    )}

                                    <Link
                                      to="/cards/credit-cards"
                                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-blue-900 hover:bg-blue-50 border border-transparent rounded-lg transition-colors"
                                    >
                                      <span>Compare with Other Cards</span>
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                  </div>
                                </div>
                              </div>

                              {/* Highlighted Bullet Points */}
                              <div className="mt-5 pt-4 border-t border-slate-100">
                                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 block">
                                  Key Card Features &amp; Rewards:
                                </span>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                  {card.rewards.map((reward, rIdx) => (
                                    <div
                                      key={rIdx}
                                      className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60"
                                    >
                                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                      <span className="leading-snug">{reward}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Step Navigation & Secondary Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
                      <button
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Adjust Preferences</span>
                      </button>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleReset}
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                        >
                          <RefreshCcw className="w-4 h-4" />
                          <span>Restart Quiz</span>
                        </button>
                        <Link
                          to="/cards/credit-cards"
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors"
                        >
                          <span>Explore All 50+ Cards</span>
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Section: Why Use BanksCart Credit Card Finder */}
          <div className="mt-14">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Institutional Reliability
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                Why Compare Cards on BanksCart?
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                BanksCart provides transparent comparison tools designed to protect borrowers from predatory fees and misleading APR claims.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center mb-4">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5">Unbiased AI Matching</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Recommendations are purely mathematical, prioritizing cards that yield maximum net savings after factoring in annual fees.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5">Direct Scheduled Banks</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direct partner integrations with HDFC, SBI, ICICI, and Axis Bank ensure legitimate card terms and fast e-KYC approvals.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5">Real Fee Transparency</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every card displays full joining fees, annual renewal charges, and exact spend-based waiver rules upfront with zero hidden clauses.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-900 flex items-center justify-center mb-4">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5">Zero CIBIL Score Impact</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Testing various card combinations and reviewing matches does not trigger a hard inquiry on your credit bureau profile.
                </p>
              </div>
            </div>
          </div>

          {/* Section: FAQ Accordion */}
          <div className="mt-14 bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm">
            <div className="max-w-2xl mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                Credit Card Finder &amp; Eligibility FAQs
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Key questions borrowers ask before applying for a new credit card in India.
              </p>
            </div>

            <div className="divide-y divide-slate-200">
              {faqs.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="py-4">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full text-left flex items-center justify-between gap-4 py-1 text-slate-900 font-bold text-base hover:text-blue-900 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-blue-900 shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed pr-6">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Partner Banks Strip */}
          <div className="mt-12 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Direct Issuing Partner Banks
            </span>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-75 grayscale hover:grayscale-0 transition-all">
              <img src="/logos/hdfc.png" alt="HDFC Bank" className="h-6 sm:h-7 object-contain" />
              <img src="/logos/sbi.png" alt="SBI Card" className="h-6 sm:h-7 object-contain" />
              <img src="/logos/icici.png" alt="ICICI Bank" className="h-6 sm:h-7 object-contain" />
              <img src="/logos/axis.png" alt="Axis Bank" className="h-6 sm:h-7 object-contain" />
              <img src="/logos/kotak.png" alt="Kotak Mahindra Bank" className="h-6 sm:h-7 object-contain" />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
