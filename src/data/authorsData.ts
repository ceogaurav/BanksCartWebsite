export interface AuthorProfile {
  slug: string;
  name: string;
  role: string;
  credentials: string;
  shortBio: string;
  fullBio: string[];
  experienceYears: number;
  education: string[];
  certifications: string[];
  areasOfExpertise: string[];
  linkedin: string;
  avatar: string;
  articlesCount: number;
  reviewsCount: number;
}

export const AUTHORS_DATA: Record<string, AuthorProfile> = {
  'raghav-singhal': {
    slug: 'raghav-singhal',
    name: 'Raghav Singhal',
    role: 'Lead Financial Analyst & Debt Strategist',
    credentials: 'FCA (Fellow Chartered Accountant) • Certified Financial Planner (CFP)',
    shortBio: 'Fellow Chartered Accountant with 12+ years of retail banking and debt restructuring experience across tier-1 Indian financial institutions.',
    fullBio: [
      'Raghav Singhal is the Lead Financial Analyst and Debt Strategist at BanksCart. With over 12 years of specialized experience in Indian retail banking, credit score algorithms, and mortgage structuring, Raghav oversees financial modeling and editorial research.',
      'Prior to joining BanksCart, Raghav worked as an independent corporate auditor and private wealth consultant, advising high-net-worth individuals and MSMEs on capital optimization and bank debt consolidation.',
      'He is a Fellow Member of the Institute of Chartered Accountants of India (ICAI) and holds the prestigious Certified Financial Planner (CFP) credential from the Financial Planning Standards Board (FPSB India).'
    ],
    experienceYears: 12,
    education: [
      'B.Com (Honours) – Shri Ram College of Commerce (SRCC), University of Delhi',
      'Fellow Chartered Accountant (FCA) – Institute of Chartered Accountants of India (ICAI)',
      'Certified Financial Planner (CFP) – FPSB India'
    ],
    certifications: [
      'ICAI Membership No: 538921 (Active Practice & Audit Record)',
      'Certified Financial Planner (FPSB Certificate No: CFP-IND-44912)',
      'NISM-Series-X-A: Investment Adviser Certification'
    ],
    areasOfExpertise: [
      'Personal Loan & Debt Consolidation',
      'CIBIL Score Rectification & Credit Algorithms',
      'Home Loan Interest Optimization & Balance Transfer',
      'Tax Planning under Sec 80C & Sec 24(b)'
    ],
    linkedin: 'https://www.linkedin.com/in/raghav-singhal-ca-bankscart',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80',
    articlesCount: 48,
    reviewsCount: 112
  },

  'amit-khurana': {
    slug: 'amit-khurana',
    name: 'Amit Khurana',
    role: 'Senior Banking Advisor & Principal Reviewer',
    credentials: 'ex-Chief Manager (Retail Credit, SBI) • CFA Charterholder',
    shortBio: 'Veteran banker with 18+ years leading retail underwriting and risk analysis at State Bank of India and leading private sector banks.',
    fullBio: [
      'Amit Khurana serves as BanksCart’s Principal Financial Reviewer and Senior Banking Advisor. He has spent nearly two decades in core banking, serving as Chief Manager (Retail Assets) at State Bank of India, where he evaluated over ₹3,000 Crores in retail mortgage, auto, and MSME loan portfolios.',
      'Amit is responsible for validating all interest rate comparison tables, EMI amortization calculations, and institutional lender eligibility matrices published across BanksCart to ensure 100% adherence to Reserve Bank of India (RBI) circulars and digital lending norms.',
      'Amit holds a Master of Business Administration in Finance from the Faculty of Management Studies (FMS), Delhi, and is a certified CFA Charterholder from the CFA Institute, USA.'
    ],
    experienceYears: 18,
    education: [
      'MBA (Finance) – Faculty of Management Studies (FMS), University of Delhi',
      'B.Tech (Electrical Engineering) – Delhi Technological University (DTU)',
      'Chartered Financial Analyst (CFA) – CFA Institute, Charlottesville, USA'
    ],
    certifications: [
      'CFA Charterholder (CFA Institute Member #189204)',
      'Certified Associate of the Indian Institute of Bankers (CAIIB)',
      'Moody\'s Analytics: Advanced Commercial Lending & Credit Underwriting'
    ],
    areasOfExpertise: [
      'Retail Credit Risk & Underwriting',
      'RBI Digital Lending Compliance & Fair Practices',
      'Commercial Loan Syndication & MSME Lending',
      'Floating vs Fixed Rate Mortgage Amortization'
    ],
    linkedin: 'https://www.linkedin.com/in/amit-khurana-cfa-bankscart',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400&q=80',
    articlesCount: 32,
    reviewsCount: 185
  },

  'neha-verma': {
    slug: 'neha-verma',
    name: 'Neha Verma',
    role: 'Senior Personal Finance Specialist',
    credentials: 'Certified Financial Planner (CFP) • SEBI-Reg. Research Analyst',
    shortBio: 'Credit card rewards specialist and wealth planner with 9+ years evaluating consumer cards, fixed deposits, and retail banking savings.',
    fullBio: [
      'Neha Verma is a Senior Personal Finance Specialist at BanksCart, specializing in credit card rewards evaluation, fixed-income instruments, and zero-forex financial products.',
      'With 9+ years of analytical experience across leading fintech portals and asset management firms, Neha decrypts the fine print of annual percentage rates (APR), reward redemption ratios, and airport lounge access eligibility for Indian credit cards.',
      'She holds a Master of Commerce from the Delhi School of Economics and is certified by the National Institute of Securities Markets (NISM).'
    ],
    experienceYears: 9,
    education: [
      'M.Com (Finance & Taxation) – Delhi School of Economics (DSE)',
      'B.Com (Hons) – Lady Shri Ram College for Women (LSR)',
      'Certified Financial Planner (CFP) – FPSB India'
    ],
    certifications: [
      'CFP Certification (FPSB India #CFP-IND-51209)',
      'NISM-Series-XV: Research Analyst Certification',
      'NISM-Series-V-A: Mutual Fund Distributors Certification'
    ],
    areasOfExpertise: [
      'Credit Card Reward Matrices & Milestone Analysis',
      'High-Yield Fixed Deposits & Sovereign Gold Bonds',
      'Zero-Forex Travel Cards & International Banking',
      'Women Entrepreneurship Schemes & Startup Funding'
    ],
    linkedin: 'https://www.linkedin.com/in/neha-verma-cfp-bankscart',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80',
    articlesCount: 64,
    reviewsCount: 88
  },

  'priya-sharma': {
    slug: 'priya-sharma',
    name: 'Priya Sharma',
    role: 'Senior Financial Analyst',
    credentials: 'MBA (Finance) • Certified Financial Planner (CFP)',
    shortBio: 'Senior financial analyst specializing in government small savings schemes, Sukanya Samriddhi Yojana (SSY), PPF, and tax-saving investments.',
    fullBio: [
      'Priya Sharma is a Senior Financial Analyst at BanksCart, specializing in sovereign savings schemes, long-term wealth compounding, and retirement instruments.',
      'With over 10 years of experience in personal finance advisory and tax planning, Priya helps Indian families navigate small savings schemes including SSY, PPF, and NPS.',
      'She holds an MBA in Finance and is a Certified Financial Planner (CFP) recognized by FPSB India.'
    ],
    experienceYears: 10,
    education: [
      'MBA (Finance) – Institute of Management Technology (IMT), Ghaziabad',
      'B.Com (Honours) – Hansraj College, University of Delhi',
      'Certified Financial Planner (CFP) – FPSB India'
    ],
    certifications: [
      'Certified Financial Planner (FPSB India #CFP-IND-62891)',
      'NISM-Series-X-A: Investment Adviser Level 1',
      'NSE Academy Certified Market Professional (NCMP)'
    ],
    areasOfExpertise: [
      'Government Small Savings Schemes (SSY, PPF, SCSS)',
      'Section 80C Tax Planning & Exemptions',
      'Long-Term Wealth Planning for Children\'s Education',
      'Sovereign Gold Bonds & Fixed Income'
    ],
    linkedin: 'https://www.linkedin.com/in/priya-sharma-bankscart',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400&q=80',
    articlesCount: 52,
    reviewsCount: 74
  }
};

export const DEFAULT_AUTHOR = AUTHORS_DATA['raghav-singhal'];
export const DEFAULT_REVIEWER = AUTHORS_DATA['amit-khurana'];
