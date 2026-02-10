export interface CreditCard {
    id: string;
    name: string;
    provider: string;
    image: string;
    badges: string[]; // e.g., ["Travel", "Premium", "Rewards"]
    promoText?: string; // e.g., "500 Cashback on application"
    rating: number;
    features: string[]; // detailed features for the list
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
        image: 'https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/04c2c553-6251-469b-980b-22c5457ef47f/Footer/Resource/Learning%20Centre/Pay/Credit%20Card/Regalia%20Gold%20Credit%20Card/Regalia_Gold_Credit_Card_767x530.png',
        badges: ['Travel', 'Shopping', 'Rewards'],
        rating: 4.8,
        features: [
            '5X rewards on Nykaa, Myntra & more',
            'Vouchers up to Rs. 16,000 every year',
            '12 domestic & 6 int. visits per year'
        ],
        fees: {
            joining: '₹2,500 + Taxes',
            annual: '₹2,500 + Taxes',
            renewalWaiver: 'Waived on spends of ₹4 Lakhs'
        },
        link: '#',
    },
    {
        id: 'sbi-cashback',
        name: 'Cashback SBI Card',
        provider: 'SBI Card',
        image: 'https://www.sbicard.com/sbi-card-en/assets/media/images/personal/credit-cards/shopping/cashback-sbi-card/card-face-cashback-sbi-card.png',
        badges: ['Cashback', 'Online Shopping'],
        promoText: '5% Cashback on all online spends',
        rating: 4.7,
        features: [
            '5% cashback on online spends',
            'Up to Rs. 60,000 cashback in a year',
            'Fee waived on Rs. 2 lakh annual spends'
        ],
        fees: {
            joining: '₹999 + Taxes',
            annual: '₹999 + Taxes',
            renewalWaiver: 'Waived on annual spends of ₹2 Lakhs'
        },
        link: '#',
    },
    {
        id: 'axis-flipkart',
        name: 'Flipkart Axis Bank Credit Card',
        provider: 'Axis Bank',
        image: 'https://www.axisbank.com/images/default-source/revamp-new/cards/credit-cards/flipkart-axis-bank-credit-card.png',
        badges: ['Shopping', 'Cashback'],
        promoText: '₹500 Welcome Voucher',
        rating: 4.6,
        features: [
            '5% Unlimited Cashback on Flipkart',
            '4% Cashback on Swiggy, Uber, PVR',
            '4 Complimentary lounge visits/year'
        ],
        fees: {
            joining: '₹500 + Taxes',
            annual: '₹500 + Taxes',
            renewalWaiver: 'Waived on annual spends of ₹3.5 Lakhs'
        },
        link: '#',
    },
    {
        id: 'yes-bank-paisasave',
        name: 'YES BANK Paisabazaar PaisaSave Credit Card',
        provider: 'YES Bank',
        image: 'https://www.yesbank.in/content/dam/yesbank/images/personal-banking/cards/credit-cards/paisasave/paisasave-credit-card.png',
        badges: ['Travel', 'Dining', 'Cashback'],
        promoText: 'Exclusive Co-branded Offer',
        rating: 4.5,
        features: [
            '6% cashback across all travel spends',
            '6% cashback on all dining spends',
            '1% unlimited cashback on UPI transactions'
        ],
        fees: {
            joining: '₹0 + Taxes',
            annual: '₹499 + Taxes',
            renewalWaiver: 'Waived on annual spends of ₹1.5 Lakhs'
        },
        link: '#',
    },
    {
        id: 'idfc-wealth',
        name: 'IDFC FIRST Wealth Credit Card',
        provider: 'IDFC FIRST Bank',
        image: 'https://www.idfcfirstbank.com/content/dam/idfcfirstbank/images/personal-banking/credit-cards/wealth/wealth-card.png',
        badges: ['Premium', 'Lifestyle', 'Travel'],
        rating: 4.9,
        features: [
            'Lifetime Free (No Joining/Annual Fees)',
            'Low Interest Rates starting 9% p.a.',
            '4 Int. & Dom. Lounge visits per quarter'
        ],
        fees: {
            joining: '₹0',
            annual: '₹0',
            renewalWaiver: 'Lifetime Free'
        },
        link: '#',
    },
];
