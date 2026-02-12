export interface CreditCard {
    id: string;
    name: string;
    provider: string; // Used for Bank Filter
    bankName: string; // Added for consistency with filter logic
    category: string; // Main category for display
    categories: string[]; // Multiple categories for filtering
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
    // ==================== HDFC BANK CARDS ====================
    {
        id: 'hdfc-infinia-metal',
        name: 'HDFC Infinia Credit Card Metal Edition',
        provider: 'HDFC Bank',
        bankName: 'HDFC Bank',
        category: 'Premium',
        categories: ['Premium', 'Travel', 'Rewards', 'Dining', 'Shopping', 'Metal'],
        image: 'https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/04c2c553-6251-469b-980b-22c5457ef47f/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Cards/Infinia/Infinia-Metal-Edition-Credit-Card-264x167.png',
        badges: ['Invite Only', 'Metal', 'Unlimited Lounge'],
        promoText: '12,500 Reward Points on Joining',
        rating: 5.0,
        features: [
            'Unlimited Domestic & International Lounge Access (Primary + Add-on)',
            '3.3% Default Reward Rate (Up to 33% on SmartBuy)',
            ' ITC Hotel Buffet 1+1 & Club Marriott Membership'
        ],
        fees: {
            joining: '₹12,500 + GST',
            annual: '₹12,500 + GST',
            renewalWaiver: 'Waived on spending ₹10 Lakhs in a year'
        },
        link: '/credit-cards/hdfc-infinia',
    },
    {
        id: 'hdfc-diners-black-metal',
        name: 'HDFC Diners Club Black Metal Edition',
        provider: 'HDFC Bank',
        bankName: 'HDFC Bank',
        category: 'Premium',
        categories: ['Premium', 'Travel', 'Dining', 'Rewards', 'Metal'],
        image: 'https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/22649f87-0941-4560-8456-231367098748/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Cards/Diners%20Club%20Black/Diners-Club-Black-Metal-Edition-Credit-Card-264x167.png',
        badges: ['Global Acceptance', 'Unlimited Lounge'],
        rating: 4.9,
        features: [
            'Unlimited Airport Lounge Access globally',
            'Up to 10X Reward Points on SmartBuy',
            'Complimentary Annual Memberships: Amazon Prime, Swiggy One (on spend)'
        ],
        fees: {
            joining: '₹10,000 + GST',
            annual: '₹10,000 + GST',
            renewalWaiver: 'Waived on spending ₹5 Lakhs in a year'
        },
        link: '/credit-cards/hdfc-diners-black',
    },
    {
        id: 'hdfc-regalia-gold',
        name: 'HDFC Regalia Gold Credit Card',
        provider: 'HDFC Bank',
        bankName: 'HDFC Bank',
        category: 'Travel',
        categories: ['Travel', 'Rewards', 'Shopping', 'Lounge Access'],
        image: 'https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/04c2c553-6251-469b-980b-22c5457ef47f/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Cards/Regalia%20Gold%20Credit%20Card/Regalia_Gold_Credit_Card_767x530.png',
        badges: ['Travel', 'Rewards', 'Best Seller'],
        rating: 4.8,
        features: [
            '5X Rewards on Nykaa, Myntra, M&S & Reliance Digital',
            '12 Complimentary Airport Lounge Access (India) + 6 International',
            'Club Vistara Silver & MMT Black Elite Membership'
        ],
        fees: {
            joining: '₹2,500 + GST',
            annual: '₹2,500 + GST',
            renewalWaiver: 'Waived on spending ₹4 Lakhs in a year'
        },
        link: '/credit-cards/hdfc-regalia-gold',
    },
    {
        id: 'hdfc-millennia',
        name: 'HDFC Millennia Credit Card',
        provider: 'HDFC Bank',
        bankName: 'HDFC Bank',
        category: 'Cashback',
        categories: ['Cashback', 'Shopping', 'Dining', 'Millennials'],
        image: 'https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/ef2bb403-39aa-46ae-aa45-bcd1ac8a538b/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Cards/Millennia%20Credit%20Card/Millennia-Credit-Card-264x167.png',
        badges: ['Cashback', 'Popular'],
        promoText: '5% Cashback on Amazon, Flipkart',
        rating: 4.6,
        features: [
            '5% Cashback on Amazon, Flipkart, BookMyShow, Cult.fit, Swiggy',
            '1% Cashback on all other spends (including Wallet loads)',
            '₹1000 Gift Voucher on spending ₹1 Lakh per quarter'
        ],
        fees: {
            joining: '₹1,000 + GST',
            annual: '₹1,000 + GST',
            renewalWaiver: 'Waived on spending ₹1 Lakh in a year'
        },
        link: '/credit-cards/hdfc-millennia',
    },
    {
        id: 'swiggy-hdfc',
        name: 'Swiggy HDFC Bank Credit Card',
        provider: 'HDFC Bank',
        bankName: 'HDFC Bank',
        category: 'Dining',
        categories: ['Dining', 'Shopping', 'Cashback', 'Co-Branded'],
        image: 'https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/a3d132c4-2396-4198-8441-2b0e62057393/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Cards/Swiggy%20HDFC%20Bank%20Credit%20Card/Swiggy_Credit_Card_264x167.png',
        badges: ['Dining', 'Foodie'],
        promoText: '10% Cashback on Food',
        rating: 4.7,
        features: [
            '10% Cashback on Swiggy (Food, Instamart, Dineout)',
            '5% Cashback on Amazon, Flipkart, Myntra, Meesho & more',
            '3 Months Swiggy One Membership Complimentary'
        ],
        fees: {
            joining: '₹500 + GST',
            annual: '₹500 + GST',
            renewalWaiver: 'Waived on spending ₹2 Lakhs in a year'
        },
        link: '/credit-cards/swiggy-hdfc',
    },
    {
        id: 'tata-neu-infinity',
        name: 'Tata Neu Infinity HDFC Bank Credit Card',
        provider: 'HDFC Bank',
        bankName: 'HDFC Bank',
        category: 'Shopping',
        categories: ['Shopping', 'UPI', 'Rewards', 'Travel'],
        image: 'https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/22649f87-0941-4560-8456-231367098748/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Cards/Tata%20Neu%20Infinity/Tata-Neu-Infinity-Credit-Card-264x167.png',
        badges: ['UPI Ready', 'Tata Ecosystem'],
        rating: 4.5,
        features: [
            '10% NeuCoins on Tata Neu App',
            '1.5% NeuCoins on UPI spends',
            '8 Domestic & 4 International Lounge Access per year'
        ],
        fees: {
            joining: '₹1,499 + GST',
            annual: '₹1,499 + GST',
            renewalWaiver: 'Waived on spending ₹3 Lakhs in a year'
        },
        link: '/credit-cards/tata-neu-infinity',
    },
    {
        id: 'hdfc-moneyback-plus',
        name: 'HDFC MoneyBack+ Credit Card',
        provider: 'HDFC Bank',
        bankName: 'HDFC Bank',
        category: 'Shopping',
        categories: ['Shopping', 'Rewards', 'Beginner'],
        image: 'https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/04c2c553-6251-469b-980b-22c5457ef47f/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Cards/MoneyBack%20Plus/MoneyBack-Plus-264x167.png',
        badges: ['Beginner Friendly', 'Shopping'],
        rating: 4.2,
        features: [
            '10X CashPoints on Amazon, Flipkart, Swiggy, BigBasket',
            '5X CashPoints on EMI spends at merchant locations',
            '₹500 Gift Voucher on spends of ₹50,000 per quarter'
        ],
        fees: {
            joining: '₹500 + GST',
            annual: '₹500 + GST',
            renewalWaiver: 'Waived on spending ₹50,000 in a year'
        },
        link: '/credit-cards/hdfc-moneyback-plus',
    },
    {
        id: 'hdfc-freedom',
        name: 'HDFC Freedom Credit Card',
        provider: 'HDFC Bank',
        bankName: 'HDFC Bank',
        category: 'Rewards',
        categories: ['Rewards', 'Beginner', 'Dining'],
        image: 'https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/04c2c553-6251-469b-980b-22c5457ef47f/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Cards/Freedom/Freedom-Card-264x167.png',
        badges: ['Entry Level'],
        rating: 4.0,
        features: [
            '10X CashPoints on BigBasket, BookMyShow, OYO, Swiggy & Uber',
            '1% Fuel Surcharge Waiver',
            'Low Interest Rate on Revolving Credit (0.99% for first 90 days)'
        ],
        fees: {
            joining: '₹500 + GST',
            annual: '₹500 + GST',
            renewalWaiver: 'Waived on spending ₹50,000 in a year'
        },
        link: '/credit-cards/hdfc-freedom',
    },
    {
        id: 'hdfc-indianoil',
        name: 'IndianOil HDFC Bank Credit Card',
        provider: 'HDFC Bank',
        bankName: 'HDFC Bank',
        category: 'Fuel',
        categories: ['Fuel', 'Rewards'],
        image: 'https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/04c2c553-6251-469b-980b-22c5457ef47f/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Cards/IndianOil%20HDFC%20Bank/IndianOil-HDFC-Bank-Credit-Card-264x167.png',
        badges: ['Fuel Saver'],
        promoText: 'Earn up to 50 Liters Free Fuel',
        rating: 4.3,
        features: [
            'Earn 5% of your spends as Fuel Points at IndianOil outlets',
            '5% Fuel Points on Groceries and Bill Payments',
            '1% Fuel Surcharge Waiver'
        ],
        fees: {
            joining: '₹500 + GST',
            annual: '₹500 + GST',
            renewalWaiver: 'Waived on spending ₹50,000 in a year'
        },
        link: '/credit-cards/hdfc-indianoil',
    },

    // ==================== AXIS BANK CARDS ====================
    {
        id: 'axis-magnus',
        name: 'Axis Bank Magnus Credit Card',
        provider: 'Axis Bank',
        bankName: 'Axis Bank',
        category: 'Premium',
        categories: ['Premium', 'Travel', 'Rewards', 'Dining'],
        image: 'https://www.axisbank.com/images/default-source/revamp-new/cards/credit-cards/magnus-credit-card.png',
        badges: ['Luxury', 'Travel'],
        rating: 4.8,
        features: [
            'Unlimited Domestic & International Lounge Access',
            'Up to 12% Rewards on Travel & Shopping via Grab Deals',
            '24x7 Dedicated Concierge & Airport Meet & Greet'
        ],
        fees: {
            joining: '₹12,500 + GST',
            annual: '₹12,500 + GST',
            renewalWaiver: 'Waived on spending ₹25 Lakhs in a year'
        },
        link: '/credit-cards/axis-magnus',
    },
    {
        id: 'axis-atlas',
        name: 'Axis Bank Atlas Credit Card',
        provider: 'Axis Bank',
        bankName: 'Axis Bank',
        category: 'Travel',
        categories: ['Travel', 'Rewards', 'Miles'],
        image: 'https://www.axisbank.com/images/default-source/revamp-new/cards/credit-cards/atlas-credit-card.png',
        badges: ['Frequent Flyer', 'Miles'],
        promoText: '5000 EDGE Miles Welcome Benefit',
        rating: 4.7,
        features: [
            '5 EDGE Miles per ₹100 spent on Travel',
            'Tier based benefits (Silver, Gold, Platinum)',
            'Instant Transfer to 20+ Airline & Hotel Loyalty Partners'
        ],
        fees: {
            joining: '₹5,000 + GST',
            annual: '₹5,000 + GST',
            renewalWaiver: 'Waived on spending ₹25 Lakhs (for Platinum Tier)'
        },
        link: '/credit-cards/axis-atlas',
    },
    {
        id: 'axis-vistara-infinite',
        name: 'Axis Bank Vistara Infinite Credit Card',
        provider: 'Axis Bank',
        bankName: 'Axis Bank',
        category: 'Travel',
        categories: ['Travel', 'Co-Branded', 'Premium'],
        image: 'https://www.axisbank.com/images/default-source/revamp-new/cards/credit-cards/vistara-infinite-credit-card.png',
        badges: ['Business Class', 'Airline'],
        rating: 4.9,
        features: [
            'Complimentary Business Class Ticket on Joining',
            'Club Vistara Gold Membership',
            '6 CV Points per ₹200 spent'
        ],
        fees: {
            joining: '₹10,000 + GST',
            annual: '₹10,000 + GST',
            renewalWaiver: 'Not Applicable'
        },
        link: '/credit-cards/axis-vistara-infinite',
    },
    {
        id: 'axis-ace',
        name: 'Axis Bank Ace Credit Card',
        provider: 'Axis Bank',
        bankName: 'Axis Bank',
        category: 'Cashback',
        categories: ['Cashback', 'Utility Bills', 'Dining', 'Shopping'],
        image: 'https://www.axisbank.com/images/default-source/revamp-new/cards/credit-cards/axis-bank-ace-credit-card.png',
        badges: ['Best for Utilities', 'Cashback'],
        promoText: '5% Cashback on Bill Payments',
        rating: 4.8,
        features: [
            '5% Cashback on Bill Payments via Google Pay',
            '4% Cashback on Swiggy, Zomato & Ola',
            '1.5% Unlimited Cashback on all other spends'
        ],
        fees: {
            joining: '₹499 + GST',
            annual: '₹499 + GST',
            renewalWaiver: 'Waived on spending ₹2 Lakhs in a year'
        },
        link: '/credit-cards/axis-ace',
    },
    {
        id: 'axis-flipkart',
        name: 'Flipkart Axis Bank Credit Card',
        provider: 'Axis Bank',
        bankName: 'Axis Bank',
        category: 'Shopping',
        categories: ['Shopping', 'Cashback', 'Co-Branded'],
        image: 'https://www.axisbank.com/images/default-source/revamp-new/cards/credit-cards/flipkart-axis-bank-credit-card.png',
        badges: ['Most Popular', 'Shopping'],
        rating: 4.7,
        features: [
            '5% Unlimited Cashback on Flipkart',
            '4% Cashback on Swiggy, Uber, PVR & Cure.fit',
            '4 Complimentary lounge visits per year'
        ],
        fees: {
            joining: '₹500 + GST',
            annual: '₹500 + GST',
            renewalWaiver: 'Waived on spending ₹3.5 Lakhs in a year'
        },
        link: '/credit-cards/axis-flipkart',
    },
    {
        id: 'axis-airtel',
        name: 'Airtel Axis Bank Credit Card',
        provider: 'Axis Bank',
        bankName: 'Axis Bank',
        category: 'Cashback',
        categories: ['Cashback', 'Utility Bills', 'Co-Branded'],
        image: 'https://www.axisbank.com/images/default-source/revamp-new/cards/credit-cards/airtel-axis-bank-credit-card.png',
        badges: ['Telecom', 'Utilities'],
        rating: 4.6,
        features: [
            '25% Cashback on Airtel Mobile, Broadband, WiFi & DTH bills',
            '10% Cashback on Swiggy, Zomato & BigBasket',
            '10% Cashback on Utility Bill payments via Airtel Thanks App'
        ],
        fees: {
            joining: '₹500 + GST',
            annual: '₹500 + GST',
            renewalWaiver: 'Waived on spending ₹2 Lakhs in a year'
        },
        link: '/credit-cards/axis-airtel',
    },
    {
        id: 'axis-my-zone',
        name: 'Axis Bank MY ZONE Credit Card',
        provider: 'Axis Bank',
        bankName: 'Axis Bank',
        category: 'Movies',
        categories: ['Movies', 'Dining', 'Shopping', 'Beginner'],
        image: 'https://www.axisbank.com/images/default-source/revamp-new/cards/credit-cards/my-zone-credit-card.png',
        badges: ['Gen Z', 'Movies', 'Lifetime Free Option'],
        promoText: 'Buy 1 Get 1 on Movies',
        rating: 4.3,
        features: [
            'Buy 1 Get 1 Free on Movie Tickets via Paytm Movies (up to ₹200)',
            'Flat ₹120 off on Swiggy (Twice a month)',
            'Complimentary SonyLiv Premium Annual Subscription'
        ],
        fees: {
            joining: '₹500 + GST',
            annual: '₹500 + GST',
            renewalWaiver: 'Waived on spending ₹2 Lakhs in a year' // Note: Often offered LTF
        },
        link: '/credit-cards/axis-my-zone',
    },
    {
        id: 'axis-neo',
        name: 'Axis Bank Neo Credit Card',
        provider: 'Axis Bank',
        bankName: 'Axis Bank',
        category: 'Shopping',
        categories: ['Shopping', 'Dining', 'Beginner'],
        image: 'https://www.axisbank.com/images/default-source/revamp-new/cards/credit-cards/neo-credit-card.png',
        badges: ['Entry Level', 'Shopping'],
        rating: 4.1,
        features: [
            '40% off on Zomato, 10% off on Blinkit',
            '5% off on Utility Bill payments via Amazon Pay',
            '10% off on Myntra (min spend ₹500)'
        ],
        fees: {
            joining: '₹250 + GST',
            annual: '₹250 + GST',
            renewalWaiver: 'Waived on spending ₹2.5 Lakhs in a year'
        },
        link: '/credit-cards/axis-neo',
    },
    {
        id: 'axis-select',
        name: 'Axis Bank Select Credit Card',
        provider: 'Axis Bank',
        bankName: 'Axis Bank',
        category: 'Shopping',
        categories: ['Shopping', 'Lifestyle', 'Rewards'],
        image: 'https://www.axisbank.com/images/default-source/revamp-new/cards/credit-cards/select-credit-card.png',
        badges: ['Lifestyle', 'Online Shopping'],
        rating: 4.4,
        features: [
            'Flat ₹200 off on BigBasket per month',
            'Flat ₹200 off on Swiggy per month',
            'Complimentary Priority Pass Membership'
        ],
        fees: {
            joining: '₹3,000 + GST',
            annual: '₹3,000 + GST',
            renewalWaiver: 'Waived on spending ₹6 Lakhs in a year'
        },
        link: '/credit-cards/axis-select',
    },
    {
        id: 'axis-indianoil',
        name: 'IndianOil Axis Bank Credit Card',
        provider: 'Axis Bank',
        bankName: 'Axis Bank',
        category: 'Fuel',
        categories: ['Fuel', 'Rewards'],
        image: 'https://www.axisbank.com/images/default-source/revamp-new/cards/credit-cards/indianoil-axis-bank-credit-card.png',
        badges: ['Fuel Saver'],
        promoText: '4% Value Back on Fuel',
        rating: 4.2,
        features: [
            '4% Value back on Fuel spends at IndianOil outlets',
            '1% Value back on Online Shopping',
            '1% Fuel Surcharge Waiver'
        ],
        fees: {
            joining: '₹500 + GST',
            annual: '₹500 + GST',
            renewalWaiver: 'Waived on spending ₹50,000 in a year'
        },
        link: '/credit-cards/axis-indianoil',
    }
];
