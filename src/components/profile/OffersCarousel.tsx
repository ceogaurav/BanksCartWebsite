import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Download, TrendingUp, Zap, CreditCard, Briefcase, CheckCircle2 } from 'lucide-react';
import PrimaryButton from '../common/PrimaryButton';

const OffersCarousel: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const offers = [
        {
            id: 1,
            tag: 'CREDIT HEALTH REPORT',
            title: 'Analyse your credit profile with Credit Health Report',
            features: [
                'In-Depth Account Level Analysis',
                'Expert Recommendations',
                '100% Digital Process'
            ],
            cta: 'Download Now',
            image: '/images/stickers/credit-report.png',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-100',
            logoAlt: 'BanksCart',
            logo: '/logos/bankscartlogof.jpg'
        },
        {
            id: 2,
            tag: 'BONDS',
            title: 'Get Fixed Returns as High as 13.25% with Bonds',
            features: [
                'Secured Fixed returns up to 13.25%',
                'Interest paid monthly / quarterly',
                'Minimum Investment of ₹1,000'
            ],
            cta: 'Invest Now',
            image: '/images/stickers/bonds.png',
            bgColor: 'bg-indigo-50',
            borderColor: 'border-indigo-100',
            logoAlt: 'BanksCart',
            logo: '/logos/bankscartlogof.jpg'
        },
        {
            id: 3,
            tag: 'INSTANT PERSONAL LOAN',
            title: 'Get a personal loan with Instant Money Transfer',
            features: [
                '100% Digital Process',
                'Upto 50% off on Processing Fees',
                'No Hidden Charges'
            ],
            cta: 'Apply Now',
            image: '/images/stickers/personal-loan.png',
            bgColor: 'bg-sky-50',
            borderColor: 'border-sky-100',
            logoAlt: 'KreditBee',
            logo: null
        },
        {
            id: 4,
            tag: 'CREDIT CARD',
            title: 'Flipkart Axis Bank Mastercard Credit Card',
            features: [
                '5% cashback on Flipkart & Cleartrip',
                '4% cashback on Uber, Swiggy, PVR',
                '7.5% cashback on Myntra'
            ],
            cta: 'Grab Now',
            image: '/images/stickers/credit-card.png',
            bgColor: 'bg-indigo-50',
            borderColor: 'border-indigo-100',
            logoAlt: 'Axis Bank',
            logo: '/logos/axis.png'
        },
        {
            id: 5,
            tag: 'BUSINESS LOAN',
            title: 'Get stress-free business loans up to Rs 1 crore',
            features: [
                'Interest rates as low as 15.5%*',
                'Instant eligibility check',
                'Quick Disbursals'
            ],
            cta: 'Apply Now',
            image: '/images/stickers/business-loan.png',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-100',
            logoAlt: 'BanksCart',
            logo: '/logos/bankscartlogof.jpg'
        }
    ];

    // Auto slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000); // Slide every 5 seconds
        return () => clearInterval(interval);
    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) >= Math.ceil(offers.length / 2) ? 0 : prev + 1);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1) < 0 ? Math.ceil(offers.length / 2) - 1 : prev - 1);
    };

    // Calculate detailed views: we show 2 cards at a time on desktop
    // Logic: Slide 0 shows index 0,1; Slide 1 shows 2,3; Slide 2 shows 4
    const getVisibleOffers = () => {
        const start = currentIndex * 2;
        return offers.slice(start, start + 2);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Tailor Made Offers</h2>
                    <p className="text-gray-500 text-sm mt-1">Handpicked offers just for you</p>
                </div>
                {/* Optional: Add a small header icon here if desired */}
            </div>

            <div className="relative group">
                {/* Cards Container */}
                <div className="flex gap-6 overflow-hidden min-h-[300px]">
                    {getVisibleOffers().map((offer) => (
                        <div
                            key={offer.id}
                            className={`flex-1 rounded-2xl p-6 border ${offer.borderColor} ${offer.bgColor} flex flex-col justify-between transition-all duration-500 animate-fadeIn relative overflow-hidden`}
                        >
                            <div className="flex justify-between items-start z-10 relative">
                                <div className="space-y-4 max-w-[65%]">
                                    <span className="inline-block px-3 py-1 bg-white rounded-md text-xs font-bold text-gray-600 tracking-wider shadow-sm uppercase">
                                        {offer.tag}
                                    </span>
                                    <h3 className="text-lg font-bold text-gray-900 leading-tight">
                                        {offer.title}
                                    </h3>
                                    <ul className="space-y-2">
                                        {offer.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                                <div className="mt-1 h-1.5 w-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="relative h-28 w-28 -mr-2 -mt-2">
                                    <img
                                        src={offer.image}
                                        alt={offer.tag}
                                        className="w-full h-full object-contain drop-shadow-xl hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200/50 z-10 relative">
                                <PrimaryButton variant="card-action">
                                    {offer.cta}
                                </PrimaryButton>
                                {offer.logo ? (
                                    <img src={offer.logo} alt={offer.logoAlt} className="h-8 object-contain" />
                                ) : (
                                    <span className="font-bold text-gray-400 text-sm tracking-wider">
                                        {offer.logoAlt}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}

                    {/* Placeholder if odd number of items and we are at the end, to keep layout stable */}
                    {getVisibleOffers().length === 1 && (
                        <div className="flex-1 rounded-2xl p-6 border border-dashed border-gray-200 flex items-center justify-center text-gray-400 bg-gray-50">
                            More offers coming soon...
                        </div>
                    )}
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-600 transition-all z-10"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 h-10 w-10 bg-white rounded-full shadow-lg border border-gray-100 flex items-center justify-center text-gray-600 hover:text-blue-600 hover:border-blue-600 transition-all z-10"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>

                {/* Dots Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                    {Array.from({ length: Math.ceil(offers.length / 2) }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-2 rounded-full transition-all duration-300 ${currentIndex === idx ? 'w-6 bg-blue-600' : 'w-2 bg-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OffersCarousel;
