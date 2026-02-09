export interface CreditCard {
    id: string;
    name: string;
    provider: string;
    image: string;
    bestFor: string;
    rating: number;
    features: string[];
    joiningFee: string;
    annualFee: string;
    rewards: string;
    link: string;
}

export const creditCards: CreditCard[] = [
    {
        id: 'hdfc-regalia-gold',
        name: 'HDFC Bank Regalia Gold Credit Card',
        provider: 'HDFC Bank',
        image: 'https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/04c2c553-6251-469b-980b-22c5457ef47f/Footer/Resource/Learning%20Centre/Pay/Credit%20Card/Regalia%20Gold%20Credit%20Card/Regalia_Gold_Credit_Card_767x530.png',
        bestFor: 'Travel & Lifestyle',
        rating: 4.8,
        features: [
            'Complimentary Club Vistara Silver Tier and MMT Black Elite membership',
            '5X Reward Points at Marks & Spencer, Myntra, Nykaa, Reliance Digital',
            '12 Complimentary Airport Lounge Access within India and 6 outside India',
            'Flight vouchers worth ₹5000 on annual spends of ₹5 Lakhs',
        ],
        joiningFee: '₹2,500 + GST',
        annualFee: '₹2,500 + GST (Waived on spending ₹4 Lakhs)',
        rewards: '4 Reward Points per ₹150 spent',
        link: '#',
    },
    {
        id: 'sbi-simplyclick',
        name: 'SBI SimplyCLICK Credit Card',
        provider: 'SBI Card',
        image: 'https://www.sbicard.com/sbi-card-en/assets/media/images/personal/credit-cards/shopping/simplyclick-sbi-card/card-face-simplyclick-sbi-card.png',
        bestFor: 'Online Shopping',
        rating: 4.5,
        features: [
            '10X Reward Points on online spends with exclusive partners (Amazon, Apollo247, BookMyShow, Cleartrip, EazyDiner, Lenskart & Netmeds)',
            '5X Reward Points on all other online spends',
            'Amazon Gift Card worth ₹500 on joining',
            'Annual Fee Reversal on annual spends of ₹1 Lakh',
        ],
        joiningFee: '₹499 + GST',
        annualFee: '₹499 + GST',
        rewards: '1 RP = ₹0.25',
        link: '#',
    },
    {
        id: 'axis-flipkart',
        name: 'Flipkart Axis Bank Credit Card',
        provider: 'Axis Bank',
        image: 'https://www.axisbank.com/images/default-source/revamp-new/cards/credit-cards/flipkart-axis-bank-credit-card.png',
        bestFor: 'Cashback',
        rating: 4.7,
        features: [
            '5% Unlimited Cashback on Flipkart',
            '4% Unlimited Cashback on Preferred Merchants (Swiggy, Uber, PVR, etc.)',
            '1.5% Unlimited Cashback on all other categories',
            '4 Complimentary lounge visits per year at domestic airports',
        ],
        joiningFee: '₹500 + GST',
        annualFee: '₹500 + GST (Waived on spending ₹3.5 Lakhs)',
        rewards: 'Direct Cashback',
        link: '#',
    },
    {
        id: 'icici-coral',
        name: 'ICICI Bank Coral Credit Card',
        provider: 'ICICI Bank',
        image: 'https://www.icicibank.com/content/dam/icicibank/india/managed-assets/images/personal-banking/cards/credit-cards/coral-card/coral-contactless-card-new.png',
        bestFor: 'Movies & Dining',
        rating: 4.2,
        features: [
            '2 Complimentary Movie Tickets every month on BookMyShow',
            'One complimentary railway lounge access per quarter',
            'One complimentary domestic airport lounge access per quarter',
            'Up to 10,000 payback points every anniversary year',
        ],
        joiningFee: '₹500 + GST',
        annualFee: '₹500 + GST',
        rewards: '2 Payback Points per ₹100',
        link: '#',
    },
    {
        id: 'idfc-wealth',
        name: 'IDFC FIRST Wealth Credit Card',
        provider: 'IDFC FIRST Bank',
        image: 'https://www.idfcfirstbank.com/content/dam/idfcfirstbank/images/personal-banking/credit-cards/wealth/wealth-card.png',
        bestFor: 'Premium Lifestyle',
        rating: 4.9,
        features: [
            'Lifetime Free Credit Card (No Joining or Annual Fees)',
            'Super Premium Card with minimum credit limit of ₹5 Lakhs',
            '4 Complimentary domestic & international airport lounge visits per quarter',
            'Buy 1 Get 1 Free on movie tickets up to ₹500',
        ],
        joiningFee: 'Nil',
        annualFee: 'Nil',
        rewards: '10X Reward Points on incremental spends',
        link: '#',
    },
];
