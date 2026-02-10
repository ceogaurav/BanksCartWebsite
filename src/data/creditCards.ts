export interface CreditCard {
    id: string;
    name: string;
    provider: string; // Used for Bank Filter
    category: string; // Used for Category Filter
    image: string;
    badges: string[]; 
    promoText?: string; 
    rating: number;
    features: string[]; 
    fees: {
        joining: string;
        annual: string;
        renewalWaiver?: string;
    };
    link: string;
}

export const creditCards: CreditCard[] = [
    {
        id: 'hdfc-regalia-gold',
        name: 'HDFC Regalia Gold Credit Card',
        provider: 'HDFC Bank',
        category: 'Travel',
        image: 'https://www.hdfc.bank.in/content/dam/hdfcbankpws/in/en/personal-banking/calculators/regalia-gold-loan-calculator/facie-regalia-gold.png',
        badges: ['Travel', 'Rewards', 'Lounge Access'],
        rating: 4.8,
        features: [
            '5X rewards on Nykaa, Myntra, M&S & Reliance Digital',
            'Complimentary Club Vistara Silver Tier & MMT Black Elite',
            '12 complimentary airport lounge access annually'
        ],
        fees: {
            joining: '₹2,500 + GST',
            annual: '₹2,500 + GST',
            renewalWaiver: 'Waived on spending ₹4 Lakhs in a year'
        },
        link: '/credit-cards/hdfc-regalia-gold',
    },
    {
        id: 'sbi-cashback',
        name: 'Cashback SBI Card',
        provider: 'SBI Card',
        category: 'Shopping',
        image: 'https://www.sbicard.com/sbi-card-en/assets/media/images/personal/credit-cards/network-card-images/240759_SBI_Cashback_139-x-218px-01.png',
        badges: ['Cashback', 'Online Shopping'],
        promoText: '5% Cashback on all online spends',
        rating: 4.7,
        features: [
            '5% Cashback on every online spend without merchant restriction',
            '1% Cashback on offline spends',
            'Zero joining fee (Limited Period Offer)'
        ],
        fees: {
            joining: '₹999 + GST',
            annual: '₹999 + GST',
            renewalWaiver: 'Waived on annual spends of ₹2 Lakhs'
        },
        link: '/credit-cards/sbi-cashback',
    },
    {
        id: 'axis-flipkart',
        name: 'Flipkart Axis Bank Credit Card',
        provider: 'Axis Bank',
        category: 'Shopping',
        image: 'https://www.paisabazaar.com/wp-content/uploads/2017/10/Flipkart-Axis-Bank-Credit-Card.jpg',
        badges: ['Shopping', 'Co-Branded', 'Cashback'],
        promoText: '₹1,100 Welcome Benefits',
        rating: 4.6,
        features: [
            '5% Unlimited Cashback on Flipkart',
            '4% Cashback on Swiggy, Uber, PVR & Curefit',
            '4 Complimentary lounge visits per year'
        ],
        fees: {
            joining: '₹500 + GST',
            annual: '₹500 + GST',
            renewalWaiver: 'Waived on annual spends of ₹3.5 Lakhs'
        },
        link: '/credit-cards/axis-flipkart',
    },
    {
        id: 'icici-amazon-pay',
        name: 'Amazon Pay ICICI Credit Card',
        provider: 'ICICI Bank',
        category: 'Lifetime Free',
        image: 'https://www.icicibank.com/content/dam/icicibank/india/managed-assets/images/personal-banking/cards/credit-cards/amazon-pay-credit-card-new-image.png',
        badges: ['Lifetime Free', 'Shopping', 'Rewards'],
        promoText: 'No Cost EMI availability',
        rating: 4.9,
        features: [
            '5% Cashback for Prime members on Amazon',
            '3% Cashback for Non-Prime members',
            'Lifetime Free credit card with no hidden charges'
        ],
        fees: {
            joining: '₹0',
            annual: '₹0',
            renewalWaiver: 'Lifetime Free'
        },
        link: '/credit-cards/icici-amazon',
    },
    {
        id: 'idfc-wealth',
        name: 'IDFC FIRST Wealth Credit Card',
        provider: 'IDFC FIRST Bank',
        category: 'Premium',
        image: 'https://www.idfcfirstbank.com/content/dam/idfcfirstbank/images/personal-banking/credit-cards/wealth/wealth-card.png',
        badges: ['Premium', 'Lifetime Free', 'Travel'],
        rating: 4.9,
        features: [
            'Lifetime Free (No Joining/Annual Fees)',
            'Low Interest Rates starting 0.75% per month',
            '4 International & Domestic Lounge visits per quarter'
        ],
        fees: {
            joining: '₹0',
            annual: '₹0',
            renewalWaiver: 'Lifetime Free'
        },
        link: '/credit-cards/idfc-wealth',
    },
    {
        id: 'amex-platinum-travel',
        name: 'American Express Platinum Travel',
        provider: 'American Express',
        category: 'Travel',
        image: 'https://www.americanexpress.com/content/dam/amex/in/legal/consumer-cards/platinum-travel-credit-card/platinum-travel-card-art-480x304.png',
        badges: ['Premium', 'Travel', 'Milestone Rewards'],
        promoText: 'Bonus 10,000 Points',
        rating: 4.8,
        features: [
            'Spend ₹4 Lakhs & get benefits worth ₹15,000+',
            '8 complimentary lounge visits per year',
            'Taj Voucher worth ₹10,000 on milestones'
        ],
        fees: {
            joining: '₹3,500 + GST',
            annual: '₹5,000 + GST',
            renewalWaiver: 'Not Applicable'
        },
        link: '/credit-cards/amex-platinum',
    },
    {
        id: 'bpcl-sbi',
        name: 'BPCL SBI Card Octane',
        provider: 'SBI Card',
        category: 'Fuel',
        image: 'https://www.sbicard.com/sbi-card-en/assets/media/images/personal/credit-cards/travel-and-fuel/bpcl-sbi-card-octane/card-face-bpcl-sbi-card-octane.png',
        badges: ['Fuel', 'Rewards'],
        rating: 4.5,
        features: [
            '7.25% Value back on Fuel at BPCL pumps',
            '6.25% + 1% Surcharge Waiver',
            '4 Turbo Reward Points on every ₹100 spent'
        ],
        fees: {
            joining: '₹1,499 + GST',
            annual: '₹1,499 + GST',
            renewalWaiver: 'Waived on annual spends of ₹2 Lakhs'
        },
        link: '/credit-cards/bpcl-sbi',
    }
];
