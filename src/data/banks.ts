export interface BankLoanSlab {
  type: 'personal' | 'home' | 'car' | 'business' | 'gold' | 'education';
  name: string;
  minRate: number;
  maxRate: number;
  processingFee: string;
  maxAmount: string;
  tenure: string;
  benchmark: string;
}

export interface BankFDSlab {
  tenure: string;
  regularRate: number;
  seniorRate: number;
}

export interface BankInfo {
  id: string;
  aliases?: string[];
  name: string;
  shortName: string;
  type: 'Public Sector (PSU)' | 'Private Sector' | 'Small Finance Bank' | 'Leading NBFC/HFC' | 'Co-operative Bank';
  logoText: string;
  logo: string;
  establishedYear: number;
  headquarters: string;
  branches: number;
  atms: number;
  website: string;
  netBankingUrl?: string;
  customerCare: string;
  tollFree: string;
  email: string;
  rating: number;
  ifscPrefix: string;
  tagline: string;
  features: string[];
  savingsRate: string;
  loanRates: BankLoanSlab[];
  fdSlabs: BankFDSlab[];
  overview: string;
}

export const banks: BankInfo[] = [
  // 1. STATE BANK OF INDIA
  {
    id: 'sbi',
    aliases: ['state-bank-of-india', 'sbi-bank'],
    name: 'State Bank of India',
    shortName: 'SBI',
    type: 'Public Sector (PSU)',
    logoText: 'SBI',
    logo: '/logos/sbi.png',
    establishedYear: 1955,
    headquarters: 'Mumbai, Maharashtra',
    branches: 22405,
    atms: 65000,
    website: 'https://sbi.co.in',
    netBankingUrl: 'https://onlinesbi.sbi',
    customerCare: '1800-1234 / 1800-2100',
    tollFree: '1800-11-2211',
    email: 'customercare@sbi.co.in',
    rating: 4.6,
    ifscPrefix: 'SBIN',
    tagline: 'The Banker to Every Indian',
    savingsRate: '2.70% - 3.00% p.a.',
    features: [
      'Largest retail bank in India with 22,000+ branches',
      'Lowest home loan interest rates starting from 8.35% (EBLR linked)',
      '100% sovereign government backing per SBI Act, 1955',
      'Unified YONO mobile banking ecosystem'
    ],
    overview: 'State Bank of India (SBI) is a Fortune 500 public sector banking and financial services statutory body. With an asset base exceeding ₹55 lakh crores and commanding a 25% market share in total domestic loans, SBI is the anchor of the Indian financial ecosystem.',
    loanRates: [
      { type: 'home', name: 'SBI Regular Home Loan', minRate: 8.35, maxRate: 9.65, processingFee: '0.17% (Min ₹1,000, Max ₹10,000)', maxAmount: '₹10 Crores', tenure: 'Up to 30 Years', benchmark: 'EBLR (8.15% + Spread)' },
      { type: 'personal', name: 'SBI Xpress Credit Personal Loan', minRate: 10.30, maxRate: 15.30, processingFee: 'Nil to 1.50%', maxAmount: '₹30 Lakhs', tenure: 'Up to 7 Years', benchmark: '2-Year MCLR Linked' },
      { type: 'car', name: 'SBI Auto Loan (New Car)', minRate: 8.70, maxRate: 9.80, processingFee: 'Nil (Festive Waiver)', maxAmount: '90% On-road value', tenure: 'Up to 7 Years', benchmark: '1-Year MCLR' },
      { type: 'business', name: 'SBI SME E-Mudra Loan', minRate: 9.95, maxRate: 14.50, processingFee: '0.50% above ₹50,000', maxAmount: '₹10 Lakhs (Mudra)', tenure: 'Up to 5 Years', benchmark: 'EBLR Linked' },
      { type: 'gold', name: 'SBI Personal Gold Loan', minRate: 8.65, maxRate: 9.75, processingFee: '0.25% (Min ₹250)', maxAmount: '₹50 Lakhs', tenure: 'Up to 3 Years', benchmark: '1-Year MCLR' },
      { type: 'education', name: 'SBI Scholar / Global Ed-vantage', minRate: 8.15, maxRate: 10.15, processingFee: 'Nil (India) / ₹10,000 (Abroad)', maxAmount: '₹1.5 Crores', tenure: 'Up to 15 Years', benchmark: 'EBLR' }
    ],
    fdSlabs: [
      { tenure: '7 to 45 Days', regularRate: 3.50, seniorRate: 4.00 },
      { tenure: '46 to 179 Days', regularRate: 5.50, seniorRate: 6.00 },
      { tenure: '180 to 210 Days', regularRate: 6.25, seniorRate: 6.75 },
      { tenure: '211 Days to < 1 Year', regularRate: 6.50, seniorRate: 7.00 },
      { tenure: '1 Year to < 2 Years', regularRate: 6.80, seniorRate: 7.30 },
      { tenure: '400 Days (Amrit Vrishti)', regularRate: 7.25, seniorRate: 7.75 },
      { tenure: '2 Years to < 3 Years', regularRate: 7.00, seniorRate: 7.50 },
      { tenure: '5 Years to 10 Years', regularRate: 6.50, seniorRate: 7.50 }
    ]
  },

  // 2. HDFC BANK
  {
    id: 'hdfc',
    aliases: ['hdfc-bank'],
    name: 'HDFC Bank',
    shortName: 'HDFC',
    type: 'Private Sector',
    logoText: 'HDFC',
    logo: '/logos/hdfc.png',
    establishedYear: 1994,
    headquarters: 'Mumbai, Maharashtra',
    branches: 8778,
    atms: 20900,
    website: 'https://www.hdfcbank.com',
    netBankingUrl: 'https://netbanking.hdfcbank.com',
    customerCare: '1800-202-6161 / 1860-267-6161',
    tollFree: '1800-1600',
    email: 'support@hdfcbank.com',
    rating: 4.7,
    ifscPrefix: 'HDFC',
    tagline: 'We Understand Your World',
    savingsRate: '3.00% - 3.50% p.a.',
    features: [
      'Largest private sector bank in India post-merger with HDFC Ltd',
      'Instant 10-second personal loan disbursal for pre-approved customers',
      'Market leader in premium credit cards and merchant acquiring',
      'Advanced digital net banking and PayZapp ecosystem'
    ],
    overview: 'HDFC Bank is India’s largest private sector bank by assets and market capitalization. Following its historic mega-merger with parent housing lender HDFC Ltd in 2023, it commands an extensive balance sheet with leadership in mortgages, retail loans, and digital cards.',
    loanRates: [
      { type: 'home', name: 'HDFC Reach / Standard Home Loan', minRate: 8.50, maxRate: 9.85, processingFee: '0.50% (Min ₹3,000)', maxAmount: '₹10 Crores', tenure: 'Up to 30 Years', benchmark: 'EBLR / Repo Linked' },
      { type: 'personal', name: 'HDFC Insta Personal Loan', minRate: 10.75, maxRate: 21.00, processingFee: 'Up to ₹4,999 + GST', maxAmount: '₹40 Lakhs', tenure: 'Up to 6 Years', benchmark: 'Policy Benchmark' },
      { type: 'car', name: 'HDFC Custom-fit Car Loan', minRate: 8.85, maxRate: 10.50, processingFee: '0.50% of loan amount', maxAmount: '100% On-road funding', tenure: 'Up to 7 Years', benchmark: '1-Year MCLR' },
      { type: 'business', name: 'HDFC Business Growth Loan', minRate: 11.25, maxRate: 18.50, processingFee: 'Up to 2.00% + GST', maxAmount: '₹75 Lakhs (Unsecured)', tenure: 'Up to 4 Years', benchmark: 'MCLR' },
      { type: 'gold', name: 'HDFC Sampoorna Gold Loan', minRate: 9.25, maxRate: 14.50, processingFee: '1.00% + GST', maxAmount: '₹25 Lakhs', tenure: 'Up to 2 Years', benchmark: 'Monthly Reducing' },
      { type: 'education', name: 'HDFC Credila Education Loan', minRate: 9.55, maxRate: 12.50, processingFee: '1.00% of loan amount', maxAmount: 'No Upper Limit', tenure: 'Up to 15 Years', benchmark: 'Repo Linked' }
    ],
    fdSlabs: [
      { tenure: '7 to 29 Days', regularRate: 3.00, seniorRate: 3.50 },
      { tenure: '30 to 89 Days', regularRate: 4.50, seniorRate: 5.00 },
      { tenure: '90 to 179 Days', regularRate: 5.75, seniorRate: 6.25 },
      { tenure: '180 Days to < 1 Year', regularRate: 6.60, seniorRate: 7.10 },
      { tenure: '1 Year to < 15 Months', regularRate: 7.10, seniorRate: 7.60 },
      { tenure: '15 Months to < 18 Months', regularRate: 7.25, seniorRate: 7.75 },
      { tenure: '18 Months to < 21 Months', regularRate: 7.25, seniorRate: 7.75 },
      { tenure: '21 Months to 2 Years', regularRate: 7.00, seniorRate: 7.50 },
      { tenure: '5 Years to 10 Years', regularRate: 7.00, seniorRate: 7.75 }
    ]
  },

  // 3. ICICI BANK
  {
    id: 'icici',
    aliases: ['icici-bank'],
    name: 'ICICI Bank',
    shortName: 'ICICI',
    type: 'Private Sector',
    logoText: 'ICICI',
    logo: '/logos/icici.png',
    establishedYear: 1994,
    headquarters: 'Mumbai, Maharashtra',
    branches: 6523,
    atms: 17100,
    website: 'https://www.icicibank.com',
    netBankingUrl: 'https://infinity.icicibank.com',
    customerCare: '1800-1080',
    tollFree: '1800-103-8181',
    email: 'customer.care@icicibank.com',
    rating: 4.6,
    ifscPrefix: 'ICIC',
    tagline: 'Hum Hai Na, Khayal Aapka',
    savingsRate: '3.00% - 3.50% p.a.',
    features: [
      'Second-largest private sector bank with best-in-class digital innovation',
      'iMobile Pay app with 400+ instant banking features',
      'Paperless e-KYC digital pre-approved mortgages and car loans',
      'Pioneer of contactless credit cards and API banking in India'
    ],
    overview: 'ICICI Bank is a leading private sector bank in India, offering a diversified portfolio of financial services including retail lending, corporate finance, insurance, venture capital, and asset management.',
    loanRates: [
      { type: 'home', name: 'ICICI Express Home Loan', minRate: 8.55, maxRate: 9.80, processingFee: '0.50% + GST', maxAmount: '₹10 Crores', tenure: 'Up to 30 Years', benchmark: 'EBLR Linked' },
      { type: 'personal', name: 'ICICI Pre-approved Personal Loan', minRate: 10.65, maxRate: 16.50, processingFee: 'Up to 2.00% + GST', maxAmount: '₹50 Lakhs', tenure: 'Up to 6 Years', benchmark: 'Policy Rate' },
      { type: 'car', name: 'ICICI Drive-Away Car Loan', minRate: 8.90, maxRate: 10.65, processingFee: '0.50% + GST', maxAmount: '100% On-road funding', tenure: 'Up to 7 Years', benchmark: 'MCLR Linked' },
      { type: 'business', name: 'ICICI Business Instalment Loan', minRate: 11.50, maxRate: 18.00, processingFee: '2.00% + GST', maxAmount: '₹50 Lakhs (Collateral Free)', tenure: 'Up to 5 Years', benchmark: 'EBLR' },
      { type: 'gold', name: 'ICICI Instant Gold Loan', minRate: 9.00, maxRate: 13.50, processingFee: '1.00% + GST', maxAmount: '₹35 Lakhs', tenure: 'Up to 2 Years', benchmark: 'Monthly Reducing' },
      { type: 'education', name: 'ICICI I-Study International', minRate: 9.50, maxRate: 12.00, processingFee: '1.00% + GST', maxAmount: '₹1 Crore', tenure: 'Up to 15 Years', benchmark: 'Repo Linked' }
    ],
    fdSlabs: [
      { tenure: '7 to 29 Days', regularRate: 3.00, seniorRate: 3.50 },
      { tenure: '30 to 90 Days', regularRate: 4.75, seniorRate: 5.25 },
      { tenure: '91 to 184 Days', regularRate: 5.75, seniorRate: 6.25 },
      { tenure: '185 to 289 Days', regularRate: 6.60, seniorRate: 7.10 },
      { tenure: '1 Year to < 15 Months', regularRate: 7.10, seniorRate: 7.60 },
      { tenure: '15 Months to < 2 Years', regularRate: 7.25, seniorRate: 7.75 },
      { tenure: '2 Years to 3 Years', regularRate: 7.00, seniorRate: 7.50 },
      { tenure: '5 Years to 10 Years', regularRate: 7.00, seniorRate: 7.50 }
    ]
  },

  // 4. PUNJAB NATIONAL BANK
  {
    id: 'pnb',
    aliases: ['punjab-national-bank'],
    name: 'Punjab National Bank',
    shortName: 'PNB',
    type: 'Public Sector (PSU)',
    logoText: 'PNB',
    logo: '/logos/pnb.png',
    establishedYear: 1894,
    headquarters: 'New Delhi, Delhi',
    branches: 10088,
    atms: 12500,
    website: 'https://www.pnbindia.in',
    netBankingUrl: 'https://netpnb.com',
    customerCare: '1800-180-2222 / 1800-103-2222',
    tollFree: '1800-1800',
    email: 'care@pnb.co.in',
    rating: 4.2,
    ifscPrefix: 'PUNB',
    tagline: 'The Name You Can Bank Upon',
    savingsRate: '2.70% - 3.00% p.a.',
    features: [
      'Second-largest public sector bank in India post-merger with Oriental Bank of Commerce & United Bank',
      'Extensive semi-urban and rural branch coverage nationwide',
      'Competitive government employee personal loan and pensioner concessions',
      'PNB ONE unified digital mobile banking app'
    ],
    overview: 'Punjab National Bank is an Indian public sector bank and financial services company headquartered in New Delhi. Founded by Lala Lajpat Rai in 1894, PNB is India’s oldest operating public sector commercial bank with over 10,000 physical branches.',
    loanRates: [
      { type: 'home', name: 'PNB Max-Saver Home Loan', minRate: 8.40, maxRate: 9.75, processingFee: '0.35% (Max ₹15,000)', maxAmount: '₹5 Crores', tenure: 'Up to 30 Years', benchmark: 'RLLR Linked' },
      { type: 'personal', name: 'PNB Sahayog Personal Loan', minRate: 10.40, maxRate: 16.95, processingFee: '0.35% to 1.00%', maxAmount: '₹20 Lakhs', tenure: 'Up to 6 Years', benchmark: 'RLLR Linked' },
      { type: 'car', name: 'PNB Saarthi Car Loan', minRate: 8.75, maxRate: 9.85, processingFee: '0.25% (Min ₹1,000)', maxAmount: '85% On-road cost', tenure: 'Up to 7 Years', benchmark: '1-Year MCLR' },
      { type: 'business', name: 'PNB Vyapar MSME Loan', minRate: 9.85, maxRate: 14.00, processingFee: '0.50% + GST', maxAmount: '₹5 Crores', tenure: 'Up to 7 Years', benchmark: 'RLLR' },
      { type: 'gold', name: 'PNB Gold Loan Scheme', minRate: 8.70, maxRate: 9.90, processingFee: '0.25% (Max ₹1,500)', maxAmount: '₹25 Lakhs', tenure: 'Up to 2 Years', benchmark: 'RLLR' },
      { type: 'education', name: 'PNB Saraswati Education Loan', minRate: 8.55, maxRate: 10.75, processingFee: 'Nil', maxAmount: '₹1.5 Crores', tenure: 'Up to 15 Years', benchmark: 'RLLR' }
    ],
    fdSlabs: [
      { tenure: '7 to 45 Days', regularRate: 3.50, seniorRate: 4.00 },
      { tenure: '46 to 179 Days', regularRate: 5.50, seniorRate: 6.00 },
      { tenure: '180 to 270 Days', regularRate: 6.00, seniorRate: 6.50 },
      { tenure: '271 Days to < 1 Year', regularRate: 6.25, seniorRate: 6.75 },
      { tenure: '1 Year', regularRate: 6.80, seniorRate: 7.30 },
      { tenure: '400 Days Special', regularRate: 7.25, seniorRate: 7.75 },
      { tenure: '2 Years to 3 Years', regularRate: 7.00, seniorRate: 7.50 },
      { tenure: '5 Years to 10 Years', regularRate: 6.50, seniorRate: 7.30 }
    ]
  },

  // 5. BANK OF BARODA
  {
    id: 'bob',
    aliases: ['bank-of-baroda', 'bob-bank'],
    name: 'Bank of Baroda',
    shortName: 'BOB',
    type: 'Public Sector (PSU)',
    logoText: 'BOB',
    logo: '/logos/bob.png',
    establishedYear: 1908,
    headquarters: 'Vadodara, Gujarat',
    branches: 8200,
    atms: 11000,
    website: 'https://www.bankofbaroda.in',
    netBankingUrl: 'https://www.bobibanking.com',
    customerCare: '1800-5700 / 1800-5000',
    tollFree: '1800-258-4455',
    email: 'customercare@bankofbaroda.com',
    rating: 4.4,
    ifscPrefix: 'BARB',
    tagline: 'India’s International Bank',
    savingsRate: '2.75% - 3.35% p.a.',
    features: [
      'Third-largest public sector bank following merger with Vijaya Bank & Dena Bank',
      'Competitive repo-linked Baroda Home Loan from 8.40% p.a.',
      'Global footprint with operations across 17 countries',
      'bob World mobile application for seamless retail banking'
    ],
    overview: 'Bank of Baroda is an Indian state-owned international banking and financial services company founded by the Maharaja of Baroda, Sayajirao Gaekwad III, in 1908. Known for its strong corporate governance and overseas branch presence.',
    loanRates: [
      { type: 'home', name: 'Baroda Home Loan', minRate: 8.40, maxRate: 10.60, processingFee: 'Nil (Under Special Campaign)', maxAmount: '₹10 Crores', tenure: 'Up to 30 Years', benchmark: 'BRLLR (Repo + Spread)' },
      { type: 'personal', name: 'Baroda Personal Loan', minRate: 10.60, maxRate: 17.50, processingFee: '1.00% to 2.00% (Min ₹1,000)', maxAmount: '₹20 Lakhs', tenure: 'Up to 7 Years', benchmark: 'BRLLR Linked' },
      { type: 'car', name: 'Baroda Auto Loan', minRate: 8.75, maxRate: 10.85, processingFee: '0.25% to 0.50%', maxAmount: '90% On-road price', tenure: 'Up to 7 Years', benchmark: '1-Year MCLR' },
      { type: 'business', name: 'Baroda Vidyut / MSME Yoddha', minRate: 9.75, maxRate: 13.85, processingFee: '0.50% + GST', maxAmount: '₹5 Crores', tenure: 'Up to 7 Years', benchmark: 'BRLLR' },
      { type: 'gold', name: 'Baroda Gold Loan', minRate: 8.85, maxRate: 9.85, processingFee: '0.25% (Min ₹500)', maxAmount: '₹25 Lakhs', tenure: 'Up to 2 Years', benchmark: 'BRLLR' },
      { type: 'education', name: 'Baroda Scholar International', minRate: 8.55, maxRate: 10.50, processingFee: 'Nil (India) / 1.00% (Abroad)', maxAmount: '₹1.5 Crores', tenure: 'Up to 15 Years', benchmark: 'BRLLR' }
    ],
    fdSlabs: [
      { tenure: '7 to 45 Days', regularRate: 4.25, seniorRate: 4.75 },
      { tenure: '46 to 180 Days', regularRate: 5.50, seniorRate: 6.00 },
      { tenure: '181 to 270 Days', regularRate: 6.15, seniorRate: 6.65 },
      { tenure: '271 Days to < 1 Year', regularRate: 6.25, seniorRate: 6.75 },
      { tenure: '1 Year to < 2 Years', regularRate: 6.85, seniorRate: 7.35 },
      { tenure: '399 Days (Baroda Tiranga Plus)', regularRate: 7.15, seniorRate: 7.65 },
      { tenure: '2 Years to 3 Years', regularRate: 7.15, seniorRate: 7.65 },
      { tenure: '5 Years to 10 Years', regularRate: 6.50, seniorRate: 7.50 }
    ]
  },

  // 6. AXIS BANK
  {
    id: 'axis',
    aliases: ['axis-bank'],
    name: 'Axis Bank',
    shortName: 'Axis',
    type: 'Private Sector',
    logoText: 'AXIS',
    logo: '/logos/axis.png',
    establishedYear: 1993,
    headquarters: 'Mumbai, Maharashtra',
    branches: 5377,
    atms: 15900,
    website: 'https://www.axisbank.com',
    netBankingUrl: 'https://omni.axisbank.co.in',
    customerCare: '1860-419-5555 / 1860-500-5555',
    tollFree: '1800-419-5577',
    email: 'customer.service@axisbank.com',
    rating: 4.5,
    ifscPrefix: 'UTIB',
    tagline: 'Badhti Ka Naam Zindagi',
    savingsRate: '3.00% - 3.50% p.a.',
    features: [
      'Third-largest private sector bank following integration of Citibank India retail business',
      'Industry-leading reward credit cards (Magnus, Atlas, Ace, Airtel Axis)',
      'Instant 24x7 digital 100% paperless home loan approvals',
      'Axis Mobile app with comprehensive financial wellness tracker'
    ],
    overview: 'Axis Bank is one of the premier private sector banks in India, offering the entire spectrum of financial services to customer segments covering Large and Mid-Corporates, MSME, Agriculture and Retail Businesses.',
    loanRates: [
      { type: 'home', name: 'Axis Shubh Aarambh / Super Saver', minRate: 8.75, maxRate: 10.15, processingFee: 'Up to 1.00% (Min ₹10,000)', maxAmount: '₹10 Crores', tenure: 'Up to 30 Years', benchmark: 'Repo Linked' },
      { type: 'personal', name: 'Axis 24x7 Instant Personal Loan', minRate: 10.99, maxRate: 22.00, processingFee: '1.00% to 2.00% + GST', maxAmount: '₹40 Lakhs', tenure: 'Up to 5 Years', benchmark: 'Policy Benchmark' },
      { type: 'car', name: 'Axis DriveOn Car Loan', minRate: 8.95, maxRate: 11.20, processingFee: 'Up to ₹4,500 + GST', maxAmount: '100% On-road price', tenure: 'Up to 7 Years', benchmark: 'MCLR' },
      { type: 'business', name: 'Axis Samruddhi MSME Loan', minRate: 11.45, maxRate: 18.50, processingFee: '1.50% to 2.00%', maxAmount: '₹75 Lakhs', tenure: 'Up to 5 Years', benchmark: 'EBLR' },
      { type: 'gold', name: 'Axis Express Gold Loan', minRate: 9.30, maxRate: 14.00, processingFee: '0.75% + GST', maxAmount: '₹25 Lakhs', tenure: 'Up to 3 Years', benchmark: 'Reducing' },
      { type: 'education', name: 'Axis Prime Higher Education Loan', minRate: 9.70, maxRate: 12.50, processingFee: '1.00% + GST', maxAmount: '₹75 Lakhs', tenure: 'Up to 15 Years', benchmark: 'Repo' }
    ],
    fdSlabs: [
      { tenure: '7 to 29 Days', regularRate: 3.00, seniorRate: 3.50 },
      { tenure: '30 to 89 Days', regularRate: 4.50, seniorRate: 5.00 },
      { tenure: '90 to 179 Days', regularRate: 5.50, seniorRate: 6.00 },
      { tenure: '180 to 269 Days', regularRate: 6.00, seniorRate: 6.50 },
      { tenure: '1 Year to < 15 Months', regularRate: 6.70, seniorRate: 7.20 },
      { tenure: '15 Months to < 18 Months', regularRate: 7.10, seniorRate: 7.60 },
      { tenure: '18 Months to < 2 Years', regularRate: 7.10, seniorRate: 7.60 },
      { tenure: '5 Years to 10 Years', regularRate: 7.00, seniorRate: 7.75 }
    ]
  },

  // 7. KOTAK MAHINDRA BANK
  {
    id: 'kotak',
    aliases: ['kotak-bank', 'kotak-mahindra-bank'],
    name: 'Kotak Mahindra Bank',
    shortName: 'Kotak',
    type: 'Private Sector',
    logoText: 'KOTAK',
    logo: '/logos/kotak.png',
    establishedYear: 1985,
    headquarters: 'Mumbai, Maharashtra',
    branches: 1780,
    atms: 2960,
    website: 'https://www.kotak.com',
    netBankingUrl: 'https://netbanking.kotak.com',
    customerCare: '1860-266-2666',
    tollFree: '1800-274-0110',
    email: 'service.bank@kotak.com',
    rating: 4.5,
    ifscPrefix: 'KKBK',
    tagline: 'Let’s Make Money Simple',
    savingsRate: '3.50% - 4.00% p.a.',
    features: [
      'Pioneer of Kotak 811 instant zero-balance digital savings accounts',
      'Ultra-competitive home loan interest rates starting from 8.60% p.a.',
      'Strong wealth management and private banking credentials',
      'Zero balance non-maintenance penalty on flagship 811 accounts'
    ],
    overview: 'Kotak Mahindra Bank is one of India’s foremost private sector banking institutions. Commencing in 1985 as an NBFC, Kotak became the first financial company in India to convert into a commercial bank in 2003.',
    loanRates: [
      { type: 'home', name: 'Kotak Digi Home Loan', minRate: 8.60, maxRate: 9.80, processingFee: '0.50% (Max ₹10,000)', maxAmount: '₹10 Crores', tenure: 'Up to 30 Years', benchmark: 'EBLR Linked' },
      { type: 'personal', name: 'Kotak Instant Personal Loan', minRate: 10.99, maxRate: 24.00, processingFee: 'Up to 3.00% + GST', maxAmount: '₹35 Lakhs', tenure: 'Up to 5 Years', benchmark: 'Policy Rate' },
      { type: 'car', name: 'Kotak Car Finance', minRate: 8.90, maxRate: 11.00, processingFee: 'Up to ₹4,000 + GST', maxAmount: '90% On-road price', tenure: 'Up to 7 Years', benchmark: 'MCLR' },
      { type: 'business', name: 'Kotak Business Power', minRate: 11.25, maxRate: 17.50, processingFee: 'Up to 2.00% + GST', maxAmount: '₹50 Lakhs', tenure: 'Up to 5 Years', benchmark: 'EBLR' },
      { type: 'gold', name: 'Kotak Gold Loan', minRate: 9.50, maxRate: 14.50, processingFee: '1.00% + GST', maxAmount: '₹25 Lakhs', tenure: 'Up to 2 Years', benchmark: 'Reducing' },
      { type: 'education', name: 'Kotak Higher Education Loan', minRate: 9.60, maxRate: 12.00, processingFee: '1.00% + GST', maxAmount: '₹50 Lakhs', tenure: 'Up to 15 Years', benchmark: 'Repo' }
    ],
    fdSlabs: [
      { tenure: '7 to 30 Days', regularRate: 2.75, seniorRate: 3.25 },
      { tenure: '31 to 90 Days', regularRate: 3.50, seniorRate: 4.00 },
      { tenure: '91 to 179 Days', regularRate: 4.50, seniorRate: 5.00 },
      { tenure: '180 to 270 Days', regularRate: 6.00, seniorRate: 6.50 },
      { tenure: '364 Days', regularRate: 6.50, seniorRate: 7.00 },
      { tenure: '390 Days (Special)', regularRate: 7.15, seniorRate: 7.65 },
      { tenure: '2 Years to < 3 Years', regularRate: 7.10, seniorRate: 7.60 },
      { tenure: '5 Years to 10 Years', regularRate: 6.20, seniorRate: 6.70 }
    ]
  },

  // 8. CANARA BANK
  {
    id: 'canara',
    aliases: ['canara-bank'],
    name: 'Canara Bank',
    shortName: 'Canara',
    type: 'Public Sector (PSU)',
    logoText: 'CANARA',
    logo: '/logos/canara.png',
    establishedYear: 1906,
    headquarters: 'Bengaluru, Karnataka',
    branches: 9700,
    atms: 10700,
    website: 'https://www.canarabank.com',
    netBankingUrl: 'https://netbanking.canarabank.in',
    customerCare: '1800-425-0018 / 1800-103-0018',
    tollFree: '1800-425-1122',
    email: 'hodits@canarabank.com',
    rating: 4.3,
    ifscPrefix: 'CNRB',
    tagline: 'Together We Can',
    savingsRate: '2.90% - 3.20% p.a.',
    features: [
      'Fourth-largest public sector bank following merger with Syndicate Bank',
      'Strong retail presence across South, West, and Central India',
      'Canara ai1 unified super mobile banking app with 250+ features',
      'Aggressive low-interest car loans and domestic education loans'
    ],
    overview: 'Canara Bank is one of the largest public sector commercial banks in India. Established in Mangalore by Ammembal Subba Rao Pai in 1906, the bank was nationalized in 1969 and operates a sprawling network of 9,700+ branches.',
    loanRates: [
      { type: 'home', name: 'Canara Housing Loan', minRate: 8.40, maxRate: 10.75, processingFee: '0.50% (Min ₹1,500, Max ₹10,000)', maxAmount: '₹5 Crores', tenure: 'Up to 30 Years', benchmark: 'RLLR Linked' },
      { type: 'personal', name: 'Canara Budget Personal Loan', minRate: 10.65, maxRate: 15.50, processingFee: '0.50% + GST', maxAmount: '₹20 Lakhs', tenure: 'Up to 7 Years', benchmark: 'RLLR' },
      { type: 'car', name: 'Canara Vehicle Loan', minRate: 8.70, maxRate: 10.25, processingFee: '0.25% (Min ₹1,000)', maxAmount: '90% On-road value', tenure: 'Up to 7 Years', benchmark: '1-Year MCLR' },
      { type: 'business', name: 'Canara MSME Suvidha', minRate: 9.80, maxRate: 13.90, processingFee: '0.50% + GST', maxAmount: '₹5 Crores', tenure: 'Up to 7 Years', benchmark: 'RLLR' },
      { type: 'gold', name: 'Canara Swarna Gold Loan', minRate: 8.65, maxRate: 9.60, processingFee: '0.20% (Min ₹250)', maxAmount: '₹35 Lakhs', tenure: 'Up to 2 Years', benchmark: 'RLLR' },
      { type: 'education', name: 'Canara Vidya Tur / Global', minRate: 8.50, maxRate: 10.30, processingFee: 'Nil', maxAmount: '₹1.5 Crores', tenure: 'Up to 15 Years', benchmark: 'RLLR' }
    ],
    fdSlabs: [
      { tenure: '7 to 45 Days', regularRate: 4.00, seniorRate: 4.50 },
      { tenure: '46 to 179 Days', regularRate: 5.25, seniorRate: 5.75 },
      { tenure: '180 to 269 Days', regularRate: 6.15, seniorRate: 6.65 },
      { tenure: '270 Days to < 1 Year', regularRate: 6.25, seniorRate: 6.75 },
      { tenure: '1 Year to < 2 Years', regularRate: 6.85, seniorRate: 7.35 },
      { tenure: '444 Days Special', regularRate: 7.25, seniorRate: 7.75 },
      { tenure: '2 Years to 3 Years', regularRate: 6.85, seniorRate: 7.35 },
      { tenure: '5 Years to 10 Years', regularRate: 6.70, seniorRate: 7.20 }
    ]
  },

  // 9. UNION BANK OF INDIA
  {
    id: 'union-bank',
    aliases: ['union-bank-of-india', 'andhra-bank', 'corporation-bank'],
    name: 'Union Bank of India',
    shortName: 'Union Bank',
    type: 'Public Sector (PSU)',
    logoText: 'UNION',
    logo: '/logos/union.png',
    establishedYear: 1919,
    headquarters: 'Mumbai, Maharashtra',
    branches: 8580,
    atms: 10100,
    website: 'https://www.unionbankofindia.co.in',
    netBankingUrl: 'https://www.unionbankonline.co.in',
    customerCare: '1800-22-2244 / 1800-208-2244',
    tollFree: '1800-425-1515',
    email: 'customercare@unionbankofindia.bank',
    rating: 4.3,
    ifscPrefix: 'UBIN',
    tagline: 'Good People to Bank With',
    savingsRate: '2.75% - 3.10% p.a.',
    features: [
      'Fifth-largest public sector bank post-amalgamation of Andhra Bank & Corporation Bank',
      'Inaugurated by Mahatma Gandhi in 1919 as a national economic institution',
      'Vyom unified mobile app with digital micro-loans and gold credit lines',
      'Zero processing fee promotions on festive home loans'
    ],
    overview: 'Union Bank of India is one of the leading public sector banks of the country with its corporate headquarters in Mumbai. With more than 8,500 branches, the bank caters to over 150 million customers nationwide.',
    loanRates: [
      { type: 'home', name: 'Union Awas / Home Loan', minRate: 8.35, maxRate: 10.75, processingFee: '0.50% (Max ₹15,000)', maxAmount: 'No Upper Limit', tenure: 'Up to 30 Years', benchmark: 'EBLR Linked' },
      { type: 'personal', name: 'Union Miles / Personal Loan', minRate: 10.75, maxRate: 15.40, processingFee: '0.50% to 1.00%', maxAmount: '₹15 Lakhs', tenure: 'Up to 5 Years', benchmark: 'EBLR' },
      { type: 'car', name: 'Union Miles Auto Loan', minRate: 8.70, maxRate: 10.45, processingFee: 'Nil (Special campaign)', maxAmount: '85% On-road price', tenure: 'Up to 7 Years', benchmark: '1-Year MCLR' },
      { type: 'business', name: 'Union Mudra & MSME Suvidha', minRate: 9.60, maxRate: 13.75, processingFee: '0.50% + GST', maxAmount: '₹5 Crores', tenure: 'Up to 7 Years', benchmark: 'EBLR' },
      { type: 'gold', name: 'Union Gold Loan Scheme', minRate: 8.65, maxRate: 9.65, processingFee: 'Nil up to ₹5 Lakhs', maxAmount: '₹25 Lakhs', tenure: 'Up to 2 Years', benchmark: 'EBLR' },
      { type: 'education', name: 'Union Pragati Education Loan', minRate: 8.50, maxRate: 10.45, processingFee: 'Nil', maxAmount: '₹1.5 Crores', tenure: 'Up to 15 Years', benchmark: 'EBLR' }
    ],
    fdSlabs: [
      { tenure: '7 to 45 Days', regularRate: 3.50, seniorRate: 4.00 },
      { tenure: '46 to 179 Days', regularRate: 4.50, seniorRate: 5.00 },
      { tenure: '180 to 332 Days', regularRate: 6.25, seniorRate: 6.75 },
      { tenure: '333 Days Special', regularRate: 7.15, seniorRate: 7.65 },
      { tenure: '1 Year to < 2 Years', regularRate: 6.75, seniorRate: 7.25 },
      { tenure: '2 Years to 3 Years', regularRate: 7.00, seniorRate: 7.50 },
      { tenure: '5 Years to 10 Years', regularRate: 6.50, seniorRate: 7.00 }
    ]
  },

  // 10. INDUSIND BANK
  {
    id: 'indusind',
    aliases: ['indusind-bank'],
    name: 'IndusInd Bank',
    shortName: 'IndusInd',
    type: 'Private Sector',
    logoText: 'INDUSIND',
    logo: '/logos/indusind.svg',
    establishedYear: 1994,
    headquarters: 'Pune, Maharashtra',
    branches: 2900,
    atms: 2950,
    website: 'https://www.indusind.com',
    netBankingUrl: 'https://indusnet.indusind.com',
    customerCare: '1860-267-7777 / 1860-500-5004',
    tollFree: '1800-102-3333',
    email: 'reachus@indusind.com',
    rating: 4.3,
    ifscPrefix: 'INDB',
    tagline: 'We Make You Feel Richer',
    savingsRate: '3.50% - 6.75% p.a.',
    features: [
      'One of India’s top high-yield private banks with savings interest up to 6.75%',
      'Market leadership in commercial vehicle and two-wheeler financing',
      'IndusMobile app featuring fingerprint biometric login and Video KYC',
      'Pioneer of interactive display credit cards with button selection'
    ],
    overview: 'IndusInd Bank is a universal private sector commercial bank in India. Driven by state-of-the-art technology, IndusInd is renowned for customer-centric services, vehicle finance leadership, and innovative wealth accounts.',
    loanRates: [
      { type: 'home', name: 'Indus Home Loan', minRate: 8.75, maxRate: 10.50, processingFee: '1.00% + GST', maxAmount: '₹5 Crores', tenure: 'Up to 30 Years', benchmark: 'EBLR' },
      { type: 'personal', name: 'IndusInd Instant Personal Loan', minRate: 10.49, maxRate: 26.00, processingFee: 'Up to 3.50% + GST', maxAmount: '₹25 Lakhs', tenure: 'Up to 5 Years', benchmark: 'Internal Benchmark' },
      { type: 'car', name: 'IndusInd Auto Finance', minRate: 9.15, maxRate: 12.50, processingFee: '1.00% + GST', maxAmount: '100% On-road value', tenure: 'Up to 7 Years', benchmark: 'MCLR' },
      { type: 'business', name: 'IndusInd Business Loan', minRate: 12.00, maxRate: 19.50, processingFee: '2.00% + GST', maxAmount: '₹50 Lakhs', tenure: 'Up to 4 Years', benchmark: 'EBLR' },
      { type: 'gold', name: 'IndusInd Swarna Loan', minRate: 9.75, maxRate: 15.00, processingFee: '1.00% + GST', maxAmount: '₹20 Lakhs', tenure: 'Up to 2 Years', benchmark: 'Monthly' },
      { type: 'education', name: 'IndusInd Career Loan', minRate: 9.85, maxRate: 13.00, processingFee: '1.00% + GST', maxAmount: '₹40 Lakhs', tenure: 'Up to 10 Years', benchmark: 'Repo' }
    ],
    fdSlabs: [
      { tenure: '7 to 30 Days', regularRate: 3.50, seniorRate: 4.00 },
      { tenure: '31 to 90 Days', regularRate: 4.75, seniorRate: 5.25 },
      { tenure: '91 to 180 Days', regularRate: 5.85, seniorRate: 6.35 },
      { tenure: '181 to 364 Days', regularRate: 6.75, seniorRate: 7.25 },
      { tenure: '1 Year to < 2 Years', regularRate: 7.75, seniorRate: 8.25 },
      { tenure: '2 Years to 3 Years', regularRate: 7.25, seniorRate: 7.75 },
      { tenure: '5 Years to 10 Years', regularRate: 7.00, seniorRate: 7.50 }
    ]
  },

  // 11. IDFC FIRST BANK
  {
    id: 'idfc-first',
    aliases: ['idfc', 'idfc-first-bank'],
    name: 'IDFC FIRST Bank',
    shortName: 'IDFC FIRST',
    type: 'Private Sector',
    logoText: 'IDFC FIRST',
    logo: '/logos/idfc.png',
    establishedYear: 2018,
    headquarters: 'Mumbai, Maharashtra',
    branches: 940,
    atms: 1050,
    website: 'https://www.idfcfirstbank.com',
    netBankingUrl: 'https://my.idfcfirstbank.com',
    customerCare: '1800-10-888',
    tollFree: '1800-419-4332',
    email: 'banker@idfcfirstbank.com',
    rating: 4.6,
    ifscPrefix: 'IDFB',
    tagline: 'Always You First',
    savingsRate: '3.00% - 7.00% p.a.',
    features: [
      'High-yield monthly interest credit on savings accounts (up to 7.00%)',
      'Zero fee on 28 essential banking services (IMPS, ATM, Cheque book)',
      'Lifetime free credit cards with dynamic APR starting from 9% p.a.',
      'Paperless instant loan approval with zero foreclosure charges after 3 EMIs'
    ],
    overview: 'IDFC FIRST Bank was formed through the merger of IDFC Bank and Capital First in 2018. Led by V. Vaidyanathan, it has emerged as a premier customer-first retail bank known for monthly interest compounding, transparent pricing, and rapid digital scaling.',
    loanRates: [
      { type: 'home', name: 'IDFC FIRST Home Suvidha', minRate: 8.85, maxRate: 10.50, processingFee: 'Up to ₹5,000 + GST', maxAmount: '₹5 Crores', tenure: 'Up to 30 Years', benchmark: 'EBLR' },
      { type: 'personal', name: 'IDFC FIRST Instant Personal Loan', minRate: 10.75, maxRate: 23.99, processingFee: 'Up to 2.00% + GST', maxAmount: '₹1 Crore', tenure: 'Up to 5 Years', benchmark: 'Policy Rate' },
      { type: 'car', name: 'IDFC FIRST Pre-owned & New Auto', minRate: 9.25, maxRate: 13.00, processingFee: '1.00% + GST', maxAmount: '100% On-road value', tenure: 'Up to 7 Years', benchmark: 'MCLR' },
      { type: 'business', name: 'IDFC FIRST Vyapar Loan', minRate: 12.00, maxRate: 19.00, processingFee: '1.50% to 2.00%', maxAmount: '₹1 Crore (Collateral Free)', tenure: 'Up to 5 Years', benchmark: 'EBLR' },
      { type: 'gold', name: 'IDFC FIRST Swarna Suraksha', minRate: 9.49, maxRate: 14.50, processingFee: '0.50% + GST', maxAmount: '₹25 Lakhs', tenure: 'Up to 2 Years', benchmark: 'Monthly' },
      { type: 'education', name: 'IDFC FIRST Global Scholar', minRate: 9.50, maxRate: 12.75, processingFee: '1.00% + GST', maxAmount: '₹75 Lakhs', tenure: 'Up to 12 Years', benchmark: 'Repo' }
    ],
    fdSlabs: [
      { tenure: '7 to 29 Days', regularRate: 3.50, seniorRate: 4.00 },
      { tenure: '30 to 90 Days', regularRate: 4.50, seniorRate: 5.00 },
      { tenure: '91 to 180 Days', regularRate: 5.75, seniorRate: 6.25 },
      { tenure: '181 to 364 Days', regularRate: 6.50, seniorRate: 7.00 },
      { tenure: '1 Year to 499 Days', regularRate: 7.75, seniorRate: 8.25 },
      { tenure: '500 Days Special', regularRate: 7.90, seniorRate: 8.40 },
      { tenure: '2 Years to 3 Years', regularRate: 7.25, seniorRate: 7.75 },
      { tenure: '5 Years to 10 Years', regularRate: 7.00, seniorRate: 7.50 }
    ]
  },

  // 12. BANK OF INDIA
  {
    id: 'boi',
    aliases: ['bank-of-india'],
    name: 'Bank of India',
    shortName: 'BOI',
    type: 'Public Sector (PSU)',
    logoText: 'BOI',
    logo: '/logos/boi.svg',
    establishedYear: 1906,
    headquarters: 'Mumbai, Maharashtra',
    branches: 5120,
    atms: 5550,
    website: 'https://bankofindia.co.in',
    netBankingUrl: 'https://starconnectcbs.bankofindia.com',
    customerCare: '1800-103-1906 / 1800-220-229',
    tollFree: '1800-220-088',
    email: 'boi.callcentre@bankofindia.co.in',
    rating: 4.2,
    ifscPrefix: 'BKID',
    tagline: 'Relationship Beyond Banking',
    savingsRate: '2.75% - 2.90% p.a.',
    features: [
      'Pioneer founder member of SWIFT in India with strong foreign branch exchange',
      'Affordable Star Home Loan schemes with concession for women borrowers',
      'Omni-channel BOI Omni Neo mobile banking suite',
      'Robust rural, agri-financing, and MSME credit operations'
    ],
    overview: 'Bank of India is an Indian public sector bank headquartered in Bandra Kurla Complex, Mumbai. Founded in 1906 by prominent businessmen, it was nationalized in 1969 and has grown into one of the key government-owned commercial banks.',
    loanRates: [
      { type: 'home', name: 'BOI Star Home Loan', minRate: 8.40, maxRate: 10.85, processingFee: '0.25% (Min ₹1,500, Max ₹20,000)', maxAmount: '₹5 Crores', tenure: 'Up to 30 Years', benchmark: 'RBLR Linked' },
      { type: 'personal', name: 'BOI Star Personal Loan', minRate: 10.35, maxRate: 15.85, processingFee: '0.50% to 1.00%', maxAmount: '₹20 Lakhs', tenure: 'Up to 6 Years', benchmark: 'RBLR' },
      { type: 'car', name: 'BOI Star Vehicle Loan', minRate: 8.75, maxRate: 10.50, processingFee: '0.25% (Min ₹1,000)', maxAmount: '85% On-road value', tenure: 'Up to 7 Years', benchmark: 'MCLR' },
      { type: 'business', name: 'BOI Star MSME Suvidha', minRate: 9.75, maxRate: 14.10, processingFee: '0.50% + GST', maxAmount: '₹5 Crores', tenure: 'Up to 7 Years', benchmark: 'RBLR' },
      { type: 'gold', name: 'BOI Star Gold Loan', minRate: 8.70, maxRate: 9.70, processingFee: 'Nil up to ₹5 Lakhs', maxAmount: '₹25 Lakhs', tenure: 'Up to 2 Years', benchmark: 'RBLR' },
      { type: 'education', name: 'BOI Star Vidya Tur', minRate: 8.55, maxRate: 10.55, processingFee: 'Nil', maxAmount: '₹1.5 Crores', tenure: 'Up to 15 Years', benchmark: 'RBLR' }
    ],
    fdSlabs: [
      { tenure: '7 to 45 Days', regularRate: 3.00, seniorRate: 3.50 },
      { tenure: '46 to 179 Days', regularRate: 4.50, seniorRate: 5.00 },
      { tenure: '180 to 269 Days', regularRate: 6.00, seniorRate: 6.50 },
      { tenure: '1 Year', regularRate: 6.50, seniorRate: 7.00 },
      { tenure: '666 Days Super Special', regularRate: 7.30, seniorRate: 7.80 },
      { tenure: '2 Years to 3 Years', regularRate: 6.75, seniorRate: 7.25 },
      { tenure: '5 Years to 10 Years', regularRate: 6.00, seniorRate: 6.50 }
    ]
  },

  // 13. INDIAN BANK
  {
    id: 'indian-bank',
    aliases: ['allahabad-bank'],
    name: 'Indian Bank',
    shortName: 'Indian Bank',
    type: 'Public Sector (PSU)',
    logoText: 'INDIAN BANK',
    logo: '/logos/indian-bank.svg',
    establishedYear: 1907,
    headquarters: 'Chennai, Tamil Nadu',
    branches: 5800,
    atms: 4900,
    website: 'https://www.indianbank.in',
    netBankingUrl: 'https://www.indianbank.net.in',
    customerCare: '1800-425-00000',
    tollFree: '1800-425-4422',
    email: 'customercomplaints@indianbank.co.in',
    rating: 4.2,
    ifscPrefix: 'IDIB',
    tagline: 'Your Tech-Friendly Bank',
    savingsRate: '2.75% - 2.90% p.a.',
    features: [
      'Seventh-largest public sector bank post-merger with historic Allahabad Bank',
      'Strong retail stronghold across Tamil Nadu, Uttar Pradesh, and West Bengal',
      'IndOASIS mobile application for 24/7 instant banking',
      'High-yield Ind Supreme 300 & 400 Days term deposit products'
    ],
    overview: 'Indian Bank is an Indian public sector financial services company established in 1907 and headquartered in Chennai. Following its successful merger with Allahabad Bank in 2020, it operates nearly 6,000 branches nationwide.',
    loanRates: [
      { type: 'home', name: 'IB Home Advantage', minRate: 8.40, maxRate: 10.45, processingFee: '0.40% (Max ₹10,000)', maxAmount: '₹5 Crores', tenure: 'Up to 30 Years', benchmark: 'EBLR' },
      { type: 'personal', name: 'IB Personal Loan', minRate: 10.45, maxRate: 15.50, processingFee: '0.50% to 1.00%', maxAmount: '₹20 Lakhs', tenure: 'Up to 6 Years', benchmark: 'EBLR' },
      { type: 'car', name: 'IB Vehicle Loan', minRate: 8.75, maxRate: 10.25, processingFee: '0.25%', maxAmount: '90% On-road price', tenure: 'Up to 7 Years', benchmark: 'MCLR' },
      { type: 'business', name: 'IB MSME Pragati', minRate: 9.80, maxRate: 14.00, processingFee: '0.50% + GST', maxAmount: '₹5 Crores', tenure: 'Up to 7 Years', benchmark: 'EBLR' },
      { type: 'gold', name: 'IB Jewel Loan', minRate: 8.75, maxRate: 9.75, processingFee: '0.25%', maxAmount: '₹25 Lakhs', tenure: 'Up to 2 Years', benchmark: 'EBLR' },
      { type: 'education', name: 'IB Vidya Tur', minRate: 8.55, maxRate: 10.40, processingFee: 'Nil', maxAmount: '₹1.5 Crores', tenure: 'Up to 15 Years', benchmark: 'EBLR' }
    ],
    fdSlabs: [
      { tenure: '7 to 45 Days', regularRate: 2.80, seniorRate: 3.30 },
      { tenure: '46 to 179 Days', regularRate: 4.25, seniorRate: 4.75 },
      { tenure: '180 to 269 Days', regularRate: 5.75, seniorRate: 6.25 },
      { tenure: '1 Year', regularRate: 6.10, seniorRate: 6.60 },
      { tenure: '400 Days (Ind Super)', regularRate: 7.30, seniorRate: 7.80 },
      { tenure: '2 Years to 3 Years', regularRate: 6.70, seniorRate: 7.20 },
      { tenure: '5 Years to 10 Years', regularRate: 6.25, seniorRate: 6.75 }
    ]
  },

  // 14. CENTRAL BANK OF INDIA
  {
    id: 'central-bank',
    aliases: ['central-bank-of-india'],
    name: 'Central Bank of India',
    shortName: 'Central Bank',
    type: 'Public Sector (PSU)',
    logoText: 'CBI',
    logo: '/logos/central-bank.svg',
    establishedYear: 1911,
    headquarters: 'Mumbai, Maharashtra',
    branches: 4500,
    atms: 3800,
    website: 'https://www.centralbankofindia.co.in',
    netBankingUrl: 'https://www.centralbank.net.in',
    customerCare: '1800-22-1911 / 1800-202-1911',
    tollFree: '1800-22-1911',
    email: 'complaints@centralbank.co.in',
    rating: 4.1,
    ifscPrefix: 'CBIN',
    tagline: 'Build a Better Life Around Us',
    savingsRate: '2.75% - 2.90% p.a.',
    features: [
      'Pioneer swadeshi bank founded by Sir Sorabji Pochkhanawala in 1911',
      'Cent Home Loan schemes with zero prepayment penalty',
      'Cent Mobile banking app with biometric authentication',
      'Extensive semi-urban agricultural and self-help group financial presence'
    ],
    overview: 'Central Bank of India is a state-owned bank in India. Historically known as the first Indian commercial bank which was wholly owned and managed by Indians, it commands over 4,500 branches across the country.',
    loanRates: [
      { type: 'home', name: 'Cent Home Loan', minRate: 8.45, maxRate: 10.60, processingFee: '0.50% (Max ₹10,000)', maxAmount: '₹5 Crores', tenure: 'Up to 30 Years', benchmark: 'RBLR Linked' },
      { type: 'personal', name: 'Cent Personal Loan', minRate: 10.50, maxRate: 15.75, processingFee: '0.50% to 1.00%', maxAmount: '₹15 Lakhs', tenure: 'Up to 5 Years', benchmark: 'RBLR' },
      { type: 'car', name: 'Cent Vehicle Finance', minRate: 8.80, maxRate: 10.45, processingFee: '0.25%', maxAmount: '85% On-road cost', tenure: 'Up to 7 Years', benchmark: 'MCLR' },
      { type: 'business', name: 'Cent MSME Vyapar', minRate: 9.85, maxRate: 14.15, processingFee: '0.50% + GST', maxAmount: '₹5 Crores', tenure: 'Up to 7 Years', benchmark: 'RBLR' },
      { type: 'gold', name: 'Cent Gold Loan', minRate: 8.80, maxRate: 9.85, processingFee: 'Nil up to ₹5 Lakhs', maxAmount: '₹20 Lakhs', tenure: 'Up to 2 Years', benchmark: 'RBLR' },
      { type: 'education', name: 'Cent Vidyarthi', minRate: 8.60, maxRate: 10.50, processingFee: 'Nil', maxAmount: '₹1.5 Crores', tenure: 'Up to 15 Years', benchmark: 'RBLR' }
    ],
    fdSlabs: [
      { tenure: '7 to 45 Days', regularRate: 3.50, seniorRate: 4.00 },
      { tenure: '46 to 179 Days', regularRate: 4.50, seniorRate: 5.00 },
      { tenure: '180 to 364 Days', regularRate: 5.75, seniorRate: 6.25 },
      { tenure: '1 Year to < 2 Years', regularRate: 6.75, seniorRate: 7.25 },
      { tenure: '444 Days Special', regularRate: 7.10, seniorRate: 7.60 },
      { tenure: '2 Years to 3 Years', regularRate: 6.75, seniorRate: 7.25 },
      { tenure: '5 Years to 10 Years', regularRate: 6.25, seniorRate: 6.75 }
    ]
  },

  // 15. FEDERAL BANK
  {
    id: 'federal-bank',
    aliases: ['federal-bank'],
    name: 'Federal Bank',
    shortName: 'Federal',
    type: 'Private Sector',
    logoText: 'FEDERAL',
    logo: '/logos/federal.svg',
    establishedYear: 1931,
    headquarters: 'Aluva, Kochi, Kerala',
    branches: 1440,
    atms: 1980,
    website: 'https://www.federalbank.co.in',
    netBankingUrl: 'https://www.fednetbank.com',
    customerCare: '1800-425-1199 / 1800-420-1199',
    tollFree: '1800-425-1199',
    email: 'contact@federalbank.co.in',
    rating: 4.5,
    ifscPrefix: 'FDRL',
    tagline: 'Your Perfect Banking Partner',
    savingsRate: '3.00% - 6.00% p.a.',
    features: [
      'Pioneer of digital neo-banking fintech partnerships (Fi Money, Jupiter)',
      'Over 18% share of India’s personal inward NRI foreign remittances',
      'FedMobile application with frictionless digital gold loans and micro FDs',
      'Top-tier green housing finance with instant sanction letters'
    ],
    overview: 'Federal Bank is a premier private commercial bank in India. Headquartered in Aluva, Kochi, the bank has pioneered digital partnerships, innovative remittance corridors, and rapid digital consumer lending.',
    loanRates: [
      { type: 'home', name: 'Federal Housing Loan', minRate: 8.80, maxRate: 10.35, processingFee: '0.50% (Max ₹10,000)', maxAmount: '₹5 Crores', tenure: 'Up to 30 Years', benchmark: 'EBLR' },
      { type: 'personal', name: 'Federal Instant Personal Loan', minRate: 11.25, maxRate: 17.50, processingFee: '1.00% to 2.00%', maxAmount: '₹25 Lakhs', tenure: 'Up to 5 Years', benchmark: 'Policy Rate' },
      { type: 'car', name: 'Federal Drive Smart', minRate: 9.15, maxRate: 10.85, processingFee: '0.50%', maxAmount: '90% On-road price', tenure: 'Up to 7 Years', benchmark: 'MCLR' },
      { type: 'business', name: 'Federal Sanjeevani MSME', minRate: 11.50, maxRate: 16.50, processingFee: '1.00% + GST', maxAmount: '₹1 Crore', tenure: 'Up to 5 Years', benchmark: 'EBLR' },
      { type: 'gold', name: 'Federal Digi Gold Loan', minRate: 9.20, maxRate: 13.50, processingFee: '0.50%', maxAmount: '₹35 Lakhs', tenure: 'Up to 2 Years', benchmark: 'Monthly' },
      { type: 'education', name: 'Federal Special Vidya', minRate: 9.75, maxRate: 12.00, processingFee: '1.00%', maxAmount: '₹1 Crore', tenure: 'Up to 15 Years', benchmark: 'Repo' }
    ],
    fdSlabs: [
      { tenure: '7 to 29 Days', regularRate: 3.00, seniorRate: 3.50 },
      { tenure: '30 to 89 Days', regularRate: 4.25, seniorRate: 4.75 },
      { tenure: '90 to 180 Days', regularRate: 5.50, seniorRate: 6.00 },
      { tenure: '181 to 332 Days', regularRate: 6.50, seniorRate: 7.00 },
      { tenure: '333 Days Special', regularRate: 7.10, seniorRate: 7.60 },
      { tenure: '400 Days Special', regularRate: 7.40, seniorRate: 7.90 },
      { tenure: '2 Years to 3 Years', regularRate: 7.00, seniorRate: 7.50 },
      { tenure: '5 Years to 10 Years', regularRate: 6.60, seniorRate: 7.25 }
    ]
  },

  // 16. BANDHAN BANK
  {
    id: 'bandhan-bank',
    aliases: ['bandhan-bank'],
    name: 'Bandhan Bank',
    shortName: 'Bandhan',
    type: 'Private Sector',
    logoText: 'BANDHAN',
    logo: '/logos/bandhan.svg',
    establishedYear: 2015,
    headquarters: 'Kolkata, West Bengal',
    branches: 1640,
    atms: 4500,
    website: 'https://bandhanbank.com',
    netBankingUrl: 'https://netbanking.bandhanbank.com',
    customerCare: '1800-258-8181',
    tollFree: '1800-258-8181',
    email: 'customercare@bandhanbank.com',
    rating: 4.2,
    ifscPrefix: 'BDBL',
    tagline: 'Aapka Bhala, Sabki Bhalai',
    savingsRate: '3.00% - 6.50% p.a.',
    features: [
      'Leading microfinance-to-universal commercial banking transformation in India',
      'High-yield retail fixed deposits up to 8.35% for senior citizens',
      'Affordable housing loans (Suraksha Housing) for semi-urban families',
      'Deep rural network across East and North-East India'
    ],
    overview: 'Bandhan Bank is an Indian banking and financial services company headquartered in Kolkata. It started in 2001 as a micro-finance institution and received an in-principle approval from the RBI in 2014 to operate as a full-fledged universal commercial bank.',
    loanRates: [
      { type: 'home', name: 'Bandhan Suraksha Home Loan', minRate: 8.95, maxRate: 11.50, processingFee: '1.00% + GST', maxAmount: '₹3 Crores', tenure: 'Up to 30 Years', benchmark: 'EBLR' },
      { type: 'personal', name: 'Bandhan Instant Cash Loan', minRate: 11.50, maxRate: 21.00, processingFee: '1.50% to 3.00%', maxAmount: '₹20 Lakhs', tenure: 'Up to 5 Years', benchmark: 'Internal' },
      { type: 'car', name: 'Bandhan Auto Loan', minRate: 9.35, maxRate: 11.75, processingFee: '0.75%', maxAmount: '85% On-road value', tenure: 'Up to 7 Years', benchmark: 'MCLR' },
      { type: 'business', name: 'Bandhan Srishti Enterprise Loan', minRate: 12.50, maxRate: 18.50, processingFee: '1.50% to 2.50%', maxAmount: '₹50 Lakhs', tenure: 'Up to 4 Years', benchmark: 'EBLR' },
      { type: 'gold', name: 'Bandhan Gold Loan', minRate: 9.60, maxRate: 14.00, processingFee: '0.50%', maxAmount: '₹20 Lakhs', tenure: 'Up to 2 Years', benchmark: 'Monthly' },
      { type: 'education', name: 'Bandhan Vidya Jyoti', minRate: 9.85, maxRate: 12.50, processingFee: '1.00%', maxAmount: '₹40 Lakhs', tenure: 'Up to 10 Years', benchmark: 'Repo' }
    ],
    fdSlabs: [
      { tenure: '7 to 30 Days', regularRate: 3.00, seniorRate: 3.75 },
      { tenure: '31 to 90 Days', regularRate: 4.50, seniorRate: 5.25 },
      { tenure: '91 to 180 Days', regularRate: 5.50, seniorRate: 6.25 },
      { tenure: '181 to 364 Days', regularRate: 6.75, seniorRate: 7.50 },
      { tenure: '1 Year', regularRate: 7.25, seniorRate: 7.75 },
      { tenure: '500 Days Special', regularRate: 7.85, seniorRate: 8.35 },
      { tenure: '2 Years to 3 Years', regularRate: 7.25, seniorRate: 7.75 },
      { tenure: '5 Years to 10 Years', regularRate: 5.85, seniorRate: 6.60 }
    ]
  },

  // 17. YES BANK
  {
    id: 'yes-bank',
    aliases: ['yes-bank'],
    name: 'YES Bank',
    shortName: 'YES Bank',
    type: 'Private Sector',
    logoText: 'YES BANK',
    logo: '/logos/yes-bank.svg',
    establishedYear: 2004,
    headquarters: 'Mumbai, Maharashtra',
    branches: 1240,
    atms: 1350,
    website: 'https://www.yesbank.in',
    netBankingUrl: 'https://netbanking.yesbank.co.in',
    customerCare: '1800-1200 / 1800-103-1212',
    tollFree: '1800-1200',
    email: 'yestouch@yesbank.in',
    rating: 4.3,
    ifscPrefix: 'YESB',
    tagline: 'Life Ko Banao Rich',
    savingsRate: '3.00% - 6.50% p.a.',
    features: [
      'Pioneer of UPI transaction handling, powering PhonePe & Google Pay merchant volumes',
      'iris by YES BANK modern mobile banking app with 100+ digital features',
      'Specialized commercial trade finance and international treasury services',
      'Competitive interest rates on retail home loans and gold overdrafts'
    ],
    overview: 'YES Bank is an Indian private sector bank founded by Rana Kapoor and Ashok Kapur in 2004. Operating under an RBI-led reconstruction consortium in 2020 backed by SBI, it has stabilized into a tech-forward retail commercial bank.',
    loanRates: [
      { type: 'home', name: 'YES Khushi Home Loan', minRate: 8.90, maxRate: 10.75, processingFee: '1.00% (Min ₹10,000)', maxAmount: '₹5 Crores', tenure: 'Up to 30 Years', benchmark: 'EBLR' },
      { type: 'personal', name: 'YES Instant Personal Loan', minRate: 10.99, maxRate: 21.50, processingFee: 'Up to 2.50% + GST', maxAmount: '₹40 Lakhs', tenure: 'Up to 5 Years', benchmark: 'Policy Rate' },
      { type: 'car', name: 'YES Drive Car Loan', minRate: 9.10, maxRate: 11.50, processingFee: '0.50%', maxAmount: '90% On-road cost', tenure: 'Up to 7 Years', benchmark: 'MCLR' },
      { type: 'business', name: 'YES Sambhav MSME Loan', minRate: 11.75, maxRate: 18.00, processingFee: '1.50% to 2.00%', maxAmount: '₹50 Lakhs', tenure: 'Up to 4 Years', benchmark: 'EBLR' },
      { type: 'gold', name: 'YES Gold Loan', minRate: 9.40, maxRate: 14.50, processingFee: '0.75%', maxAmount: '₹25 Lakhs', tenure: 'Up to 2 Years', benchmark: 'Monthly' },
      { type: 'education', name: 'YES Shiksha Higher Study', minRate: 9.75, maxRate: 12.50, processingFee: '1.00%', maxAmount: '₹50 Lakhs', tenure: 'Up to 12 Years', benchmark: 'Repo' }
    ],
    fdSlabs: [
      { tenure: '7 to 30 Days', regularRate: 3.25, seniorRate: 3.75 },
      { tenure: '31 to 90 Days', regularRate: 4.50, seniorRate: 5.00 },
      { tenure: '91 to 180 Days', regularRate: 5.75, seniorRate: 6.25 },
      { tenure: '181 to 364 Days', regularRate: 6.50, seniorRate: 7.00 },
      { tenure: '1 Year to < 18 Months', regularRate: 7.25, seniorRate: 7.75 },
      { tenure: '18 Months Special', regularRate: 7.75, seniorRate: 8.25 },
      { tenure: '2 Years to 3 Years', regularRate: 7.25, seniorRate: 7.75 },
      { tenure: '5 Years to 10 Years', regularRate: 7.00, seniorRate: 7.75 }
    ]
  },

  // 18. AU SMALL FINANCE BANK
  {
    id: 'au-sfb',
    aliases: ['au-small-finance-bank'],
    name: 'AU Small Finance Bank',
    shortName: 'AU Bank',
    type: 'Small Finance Bank',
    logoText: 'AU BANK',
    logo: '/logos/au-sfb.svg',
    establishedYear: 1996,
    headquarters: 'Jaipur, Rajasthan',
    branches: 1040,
    atms: 850,
    website: 'https://www.aubank.in',
    netBankingUrl: 'https://netbanking.aubank.in',
    customerCare: '1800-1200-1300',
    tollFree: '1800-1200-1300',
    email: 'customercare@aubank.in',
    rating: 4.6,
    ifscPrefix: 'AUBL',
    tagline: 'Badlaav Humse Hai',
    savingsRate: '3.50% - 7.25% p.a.',
    features: [
      'Largest Small Finance Bank in India with high-yield savings interest up to 7.25%',
      'AU 0101 next-generation video banking portal (open account from home)',
      'Flagship customizable credit cards (Zenith, Vetta, Altura, Lit)',
      'Monthly interest payout options across all fixed deposits'
    ],
    overview: 'AU Small Finance Bank is an Indian scheduled commercial bank founded as vehicle finance company AU Financiers in 1996. After receiving its banking license in 2017, AU Bank transformed into India’s largest and fastest-growing small finance bank.',
    loanRates: [
      { type: 'home', name: 'AU Awaas Home Loan', minRate: 8.95, maxRate: 11.25, processingFee: '1.00% to 2.00%', maxAmount: '₹3 Crores', tenure: 'Up to 30 Years', benchmark: 'EBLR' },
      { type: 'personal', name: 'AU Express Personal Loan', minRate: 11.50, maxRate: 23.00, processingFee: '1.50% to 3.00%', maxAmount: '₹15 Lakhs', tenure: 'Up to 5 Years', benchmark: 'Policy Benchmark' },
      { type: 'car', name: 'AU Wheels Auto Loan', minRate: 9.25, maxRate: 12.00, processingFee: '1.00%', maxAmount: '100% Ex-showroom', tenure: 'Up to 7 Years', benchmark: 'MCLR' },
      { type: 'business', name: 'AU Udyog Business Loan', minRate: 12.00, maxRate: 18.50, processingFee: '1.50% to 2.50%', maxAmount: '₹50 Lakhs', tenure: 'Up to 5 Years', benchmark: 'EBLR' },
      { type: 'gold', name: 'AU Gold Loan', minRate: 9.40, maxRate: 14.50, processingFee: '0.50%', maxAmount: '₹20 Lakhs', tenure: 'Up to 2 Years', benchmark: 'Monthly' },
      { type: 'education', name: 'AU Vidya Higher Education', minRate: 9.85, maxRate: 12.75, processingFee: '1.00%', maxAmount: '₹40 Lakhs', tenure: 'Up to 10 Years', benchmark: 'Repo' }
    ],
    fdSlabs: [
      { tenure: '7 to 30 Days', regularRate: 3.75, seniorRate: 4.25 },
      { tenure: '31 to 90 Days', regularRate: 4.25, seniorRate: 4.75 },
      { tenure: '91 to 180 Days', regularRate: 5.50, seniorRate: 6.00 },
      { tenure: '181 to 364 Days', regularRate: 6.75, seniorRate: 7.25 },
      { tenure: '1 Year to < 18 Months', regularRate: 7.60, seniorRate: 8.10 },
      { tenure: '18 Months Special', regularRate: 8.00, seniorRate: 8.50 },
      { tenure: '24 Months to 36 Months', regularRate: 7.50, seniorRate: 8.00 },
      { tenure: '5 Years to 10 Years', regularRate: 7.25, seniorRate: 7.75 }
    ]
  },

  // 19. RBL BANK
  {
    id: 'rbl-bank',
    aliases: ['rbl-bank', 'ratnakar-bank'],
    name: 'RBL Bank',
    shortName: 'RBL',
    type: 'Private Sector',
    logoText: 'RBL',
    logo: '/logos/rbl.svg',
    establishedYear: 1943,
    headquarters: 'Mumbai, Maharashtra',
    branches: 530,
    atms: 420,
    website: 'https://www.rblbank.com',
    netBankingUrl: 'https://online.rblbank.com',
    customerCare: '1800-120-616161 / 022-61156300',
    tollFree: '1800-120-616161',
    email: 'customercare@rblbank.com',
    rating: 4.2,
    ifscPrefix: 'RATN',
    tagline: 'Apno Ka Bank',
    savingsRate: '3.50% - 7.50% p.a.',
    features: [
      'High savings account interest yields up to 7.50% on eligible balance tiers',
      'Strong co-branded credit cards ecosystem (Bajaj Finserv RBL SuperCard, Zomato)',
      'MoBank 2.0 app with frictionless Video KYC and digital Fixed Deposit booking',
      'Competitive small-ticket business loans and micro-banking services'
    ],
    overview: 'RBL Bank (formerly Ratnakar Bank) is an Indian private sector bank headquartered in Mumbai. Founded in Kolhapur in 1943, RBL has evolved into a full-service modern commercial bank with a specialty in credit cards and retail liabilities.',
    loanRates: [
      { type: 'home', name: 'RBL Affordable Home Loan', minRate: 8.90, maxRate: 11.00, processingFee: '1.00% + GST', maxAmount: '₹3 Crores', tenure: 'Up to 30 Years', benchmark: 'EBLR' },
      { type: 'personal', name: 'RBL Instant Personal Loan', minRate: 11.25, maxRate: 23.00, processingFee: 'Up to 3.00% + GST', maxAmount: '₹20 Lakhs', tenure: 'Up to 5 Years', benchmark: 'Internal Rate' },
      { type: 'car', name: 'RBL Auto Loan', minRate: 9.35, maxRate: 11.90, processingFee: '0.75%', maxAmount: '85% On-road value', tenure: 'Up to 7 Years', benchmark: 'MCLR' },
      { type: 'business', name: 'RBL Business Growth Capital', minRate: 12.25, maxRate: 18.50, processingFee: '2.00% + GST', maxAmount: '₹50 Lakhs', tenure: 'Up to 4 Years', benchmark: 'EBLR' },
      { type: 'gold', name: 'RBL Swarna Loan', minRate: 9.50, maxRate: 14.50, processingFee: '0.50%', maxAmount: '₹20 Lakhs', tenure: 'Up to 2 Years', benchmark: 'Monthly' },
      { type: 'education', name: 'RBL Higher Education', minRate: 9.85, maxRate: 12.50, processingFee: '1.00%', maxAmount: '₹30 Lakhs', tenure: 'Up to 10 Years', benchmark: 'Repo' }
    ],
    fdSlabs: [
      { tenure: '7 to 30 Days', regularRate: 3.50, seniorRate: 4.00 },
      { tenure: '31 to 90 Days', regularRate: 4.00, seniorRate: 4.50 },
      { tenure: '91 to 180 Days', regularRate: 4.75, seniorRate: 5.25 },
      { tenure: '181 to 364 Days', regularRate: 6.50, seniorRate: 7.00 },
      { tenure: '1 Year to < 15 Months', regularRate: 7.50, seniorRate: 8.00 },
      { tenure: '15 Months to < 24 Months', regularRate: 8.00, seniorRate: 8.50 },
      { tenure: '24 Months to < 36 Months', regularRate: 7.50, seniorRate: 8.00 },
      { tenure: '5 Years to 10 Years', regularRate: 7.10, seniorRate: 7.60 }
    ]
  },

  // 20. BAJAJ FINANCE LIMITED (LEADING NBFC)
  {
    id: 'bajaj-finance',
    aliases: ['bajaj-finserv'],
    name: 'Bajaj Finance Limited',
    shortName: 'Bajaj Finance',
    type: 'Leading NBFC/HFC',
    logoText: 'BAJAJ',
    logo: '/logos/bajaj.png',
    establishedYear: 1987,
    headquarters: 'Pune, Maharashtra',
    branches: 4000,
    atms: 0,
    website: 'https://www.bajajfinserv.in',
    netBankingUrl: 'https://customer-portal.bajajfinserv.in',
    customerCare: '020-7112-4000',
    tollFree: '1800-103-3535',
    email: 'wecare@bajajfinserv.in',
    rating: 4.5,
    ifscPrefix: 'BFL',
    tagline: 'Life. Simplified.',
    savingsRate: 'Fixed Deposit up to 8.85% p.a.',
    features: [
      'India’s largest non-banking financial company (NBFC) with 80+ million customers',
      'No-cost EMI financing across 1.5 lakh electronics and lifestyle partner stores',
      'Instant Flexi-loan facility with interest charged only on utilized balance',
      'CRISIL AAA and ICRA AAA highest-safety rated corporate fixed deposits'
    ],
    overview: 'Bajaj Finance Limited, a subsidiary of Bajaj Finserv, is one of India’s most diversified and profitable non-banking financial conglomerates. It commands dominance in consumer durable financing, lifestyle personal loans, SME capital, and AAA-rated fixed deposits.',
    loanRates: [
      { type: 'personal', name: 'Bajaj Flexi Personal Loan', minRate: 11.00, maxRate: 24.00, processingFee: 'Up to 3.93% + GST', maxAmount: '₹40 Lakhs', tenure: 'Up to 8 Years', benchmark: 'Internal Policy' },
      { type: 'home', name: 'Bajaj Housing Finance Home Loan', minRate: 8.50, maxRate: 10.50, processingFee: '0.25% to 0.50%', maxAmount: '₹15 Crores', tenure: 'Up to 32 Years', benchmark: 'Repo Linked' },
      { type: 'business', name: 'Bajaj MSME Working Capital', minRate: 12.00, maxRate: 20.00, processingFee: 'Up to 3.00%', maxAmount: '₹80 Lakhs', tenure: 'Up to 8 Years', benchmark: 'Internal' },
      { type: 'gold', name: 'Bajaj Finance Gold Loan', minRate: 9.50, maxRate: 15.00, processingFee: 'Nil to 0.50%', maxAmount: '₹2 Crores', tenure: 'Up to 2 Years', benchmark: 'Monthly' },
      { type: 'car', name: 'Bajaj Used Car & Refinance', minRate: 9.99, maxRate: 14.50, processingFee: '1.50%', maxAmount: '100% Valuation', tenure: 'Up to 6 Years', benchmark: 'Reducing' },
      { type: 'education', name: 'Bajaj Higher Education Credit', minRate: 10.50, maxRate: 13.50, processingFee: '1.50%', maxAmount: '₹50 Lakhs', tenure: 'Up to 10 Years', benchmark: 'Fixed/Floating' }
    ],
    fdSlabs: [
      { tenure: '12 to 23 Months', regularRate: 7.40, seniorRate: 7.65 },
      { tenure: '24 to 35 Months', regularRate: 7.80, seniorRate: 8.05 },
      { tenure: '36 to 60 Months', regularRate: 8.10, seniorRate: 8.35 },
      { tenure: '42 Months (Special)', regularRate: 8.60, seniorRate: 8.85 }
    ]
  },

  // 21. TATA CAPITAL FINANCIAL SERVICES
  {
    id: 'tata-capital',
    aliases: ['tata-capital'],
    name: 'Tata Capital Financial Services',
    shortName: 'Tata Capital',
    type: 'Leading NBFC/HFC',
    logoText: 'TATA CAPITAL',
    logo: '/logos/tata.png',
    establishedYear: 2007,
    headquarters: 'Mumbai, Maharashtra',
    branches: 700,
    atms: 0,
    website: 'https://www.tatacapital.com',
    netBankingUrl: 'https://retailonline.tatacapital.com',
    customerCare: '1860-267-6060',
    tollFree: '1800-209-6060',
    email: 'contactus@tatacapital.com',
    rating: 4.6,
    ifscPrefix: 'TCFL',
    tagline: 'Count On Us',
    savingsRate: 'Corporate FD up to 8.10% p.a.',
    features: [
      'Flagship financial services arm of the globally trusted Tata Group',
      'Overdraft flexi-loan facility with prepayment allowed anytime at 0% penalty',
      'Quick digital personal loans sanctioned via online e-Mandates',
      'Transparent home loan and affordable housing financing options'
    ],
    overview: 'Tata Capital Limited is a subsidiary of Tata Sons Limited. As a holistic financial powerhouse, Tata Capital provides retail personal loans, mortgages, business loans, clean energy finance, and wealth management services.',
    loanRates: [
      { type: 'personal', name: 'Tata Capital Express Personal Loan', minRate: 10.99, maxRate: 22.00, processingFee: 'Up to 2.75% + GST', maxAmount: '₹35 Lakhs', tenure: 'Up to 6 Years', benchmark: 'Policy Rate' },
      { type: 'home', name: 'Tata Capital Home Loan', minRate: 8.60, maxRate: 10.50, processingFee: '0.50% (Max ₹10,000)', maxAmount: '₹5 Crores', tenure: 'Up to 30 Years', benchmark: 'Repo Linked' },
      { type: 'business', name: 'Tata Capital SME Growth Loan', minRate: 11.50, maxRate: 18.00, processingFee: 'Up to 2.00%', maxAmount: '₹75 Lakhs', tenure: 'Up to 5 Years', benchmark: 'Policy Rate' },
      { type: 'car', name: 'Tata Capital Pre-owned Car Loan', minRate: 9.50, maxRate: 13.50, processingFee: '1.00%', maxAmount: '90% Valuation', tenure: 'Up to 6 Years', benchmark: 'MCLR' },
      { type: 'gold', name: 'Tata Capital Gold Loan', minRate: 9.25, maxRate: 14.00, processingFee: '0.50%', maxAmount: '₹25 Lakhs', tenure: 'Up to 2 Years', benchmark: 'Monthly' },
      { type: 'education', name: 'Tata Capital Study Abroad', minRate: 9.75, maxRate: 12.50, processingFee: '1.00%', maxAmount: '₹50 Lakhs', tenure: 'Up to 10 Years', benchmark: 'Repo' }
    ],
    fdSlabs: [
      { tenure: '12 Months', regularRate: 7.25, seniorRate: 7.50 },
      { tenure: '24 Months', regularRate: 7.60, seniorRate: 7.85 },
      { tenure: '36 Months', regularRate: 7.85, seniorRate: 8.10 },
      { tenure: '60 Months', regularRate: 7.75, seniorRate: 8.00 }
    ]
  },

  // 22. MUTHOOT FINANCE
  {
    id: 'muthoot',
    aliases: ['muthoot-finance'],
    name: 'Muthoot Finance Limited',
    shortName: 'Muthoot',
    type: 'Leading NBFC/HFC',
    logoText: 'MUTHOOT',
    logo: '/logos/muthoot.svg',
    establishedYear: 1887,
    headquarters: 'Kochi, Kerala',
    branches: 5800,
    atms: 0,
    website: 'https://www.muthootfinance.com',
    netBankingUrl: 'https://online.muthootfinance.com',
    customerCare: '1800-313-1212',
    tollFree: '1800-313-1212',
    email: 'mails@muthootgroup.com',
    rating: 4.5,
    ifscPrefix: 'MUTH',
    tagline: 'Taking Care of Your Dreams',
    savingsRate: 'NCD / Gold FD up to 8.25% p.a.',
    features: [
      'Largest gold financing company in the world holding over 180 tonnes of gold jewelry',
      'Instant 5-minute gold loan disbursal with minimal documentation',
      'Over 5,800 physical branch counters spread across India and overseas',
      'Muthoot Online app with 24x7 interest payment and partial release requests'
    ],
    overview: 'Muthoot Finance is India’s largest gold loan NBFC. Established in Kerala in 1887, the flagship company of the Muthoot Group serves over 200,000 retail customers daily with secured gold credit, housing loans, and foreign exchange.',
    loanRates: [
      { type: 'gold', name: 'Muthoot Ultimate Gold Loan', minRate: 8.50, maxRate: 18.00, processingFee: '0.25% (Min ₹100)', maxAmount: 'No Upper Limit', tenure: 'Up to 3 Years', benchmark: 'Monthly Compounding' },
      { type: 'home', name: 'Muthoot Homefin Housing Loan', minRate: 9.25, maxRate: 12.50, processingFee: '1.00% + GST', maxAmount: '₹50 Lakhs', tenure: 'Up to 25 Years', benchmark: 'Repo Linked' },
      { type: 'personal', name: 'Muthoot Instant Personal Loan', minRate: 12.00, maxRate: 22.00, processingFee: 'Up to 3.00%', maxAmount: '₹10 Lakhs', tenure: 'Up to 4 Years', benchmark: 'Policy' },
      { type: 'business', name: 'Muthoot MSME Secured Capital', minRate: 11.50, maxRate: 16.50, processingFee: '1.50%', maxAmount: '₹1 Crore', tenure: 'Up to 5 Years', benchmark: 'Policy' },
      { type: 'car', name: 'Muthoot Commercial Vehicle Finance', minRate: 10.50, maxRate: 14.50, processingFee: '1.00%', maxAmount: '85% Value', tenure: 'Up to 5 Years', benchmark: 'Reducing' },
      { type: 'education', name: 'Muthoot Student Abroad Loan', minRate: 10.00, maxRate: 13.00, processingFee: '1.00%', maxAmount: '₹30 Lakhs', tenure: 'Up to 7 Years', benchmark: 'Internal' }
    ],
    fdSlabs: [
      { tenure: '12 Months', regularRate: 7.25, seniorRate: 7.75 },
      { tenure: '24 Months', regularRate: 7.75, seniorRate: 8.25 },
      { tenure: '36 Months', regularRate: 8.00, seniorRate: 8.50 },
      { tenure: '60 Months', regularRate: 8.00, seniorRate: 8.50 }
    ]
  }
];

export const getBankById = (idOrAlias: string): BankInfo | undefined => {
  if (!idOrAlias) return undefined;
  const lower = idOrAlias.toLowerCase();
  return banks.find(b => b.id.toLowerCase() === lower || (b.aliases && b.aliases.some(a => a.toLowerCase() === lower)));
};
