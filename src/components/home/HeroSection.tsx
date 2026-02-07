import React, { useState, useEffect } from 'react';
import { Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
// 1. Add these imports
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const HeroSection: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // 2. Initialize hooks
    const navigate = useNavigate();
    const { currentUser, openLoginModal } = useAuth();

    const slides = [
        {
            id: 1,
            title: "Get Credit Score & Report",
            highlight: "Absolutely FREE",
            subtitle: "Worth ₹1,200",
            strikeThrough: true,
            bgClass: "bg-gradient-to-r from-blue-600 to-blue-500",
            highlightColor: "text-yellow-300",
            features: ["Stand a chance to win FREE", "Accidental Insurance & more"],
            buttonText: "Check Your Score Now",
            imageSrc: "/icons/credit_score.png", // Ensure this path exists
            decorIcon: null
        },
        {
            id: 2,
            title: "Get Business Loan",
            highlight: "up to ₹1 Cr",
            subtitle: null,
            bgClass: "bg-gradient-to-r from-slate-900 to-blue-900",
            highlightColor: "text-white",
            features: ["Interest rates starts @12%", "Detailed Comparison"],
            buttonText: "Apply Now",
            imageSrc: "/icons/business_loan.png",
            decorIcon: null
        },
        {
            id: 3,
            title: "Start Investing in Bonds Today",
            highlight: "Earn up to 13.25% p.a.*",
            subtitle: null,
            bgClass: "bg-gradient-to-r from-blue-900 to-blue-700",
            highlightColor: "text-yellow-400 font-bold text-lg mb-2 block",
            features: ["Invest as low as ₹1,000", "Quarterly Interest Payouts", "No Hidden Charges"],
            buttonText: "Invest Now",
            imageSrc: "/icons/bonds.png",
            decorIcon: <Sparkles className="w-40 h-40 text-white opacity-20 absolute -right-4 -bottom-4 rotate-12" />
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const slide = slides[currentSlide];

    // 3. The Logic Handler
    const handleCtaClick = (slideId: number) => {
        // Logic for Credit Score Slide (ID: 1)
        if (slideId === 1) {
            if (currentUser) {
                // If logged in, go to Profile -> Credit Score tab
                navigate('/profile?tab=credit-score');
            } else {
                // If not logged in, open the modal
                openLoginModal();
            }
        } 
        
        // Optional: Logic for other slides
        else if (slideId === 2) {
            navigate('/business-loans'); // Example route
        }
        else if (slideId === 3) {
            navigate('/invest/bonds');   // Example route
        }
    };

    return (
        <div className="relative overflow-hidden bg-transparent pt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

                    {/* Left Content */}
                    <div className="lg:w-1/2 text-center lg:text-left z-10">
                        <div className="inline-flex items-center gap-2 mb-4 bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-sm font-semibold border border-purple-100 animate-pulse">
                            <Sparkles className="w-4 h-4" />
                            <span>New Year Special Offers</span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-800 leading-tight mb-6 mt-2">
                            Celebrate <span className="text-purple-600 font-serif italic relative inline-block">
                                New Year
                                <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-2 -right-4 animate-spin-slow" />
                            </span> with <br className="hidden sm:block" />
                            India's best platform for <br className="hidden sm:block" />
                            <span className="text-blue-600 block mt-1 sm:inline">Loans, Cards & Investments</span>
                        </h1>

                        <p className="text-lg text-slate-500 mb-8 max-w-lg mx-auto lg:mx-0">
                            One stop destination for all your financial needs. Compare and apply for the best products.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">%</div>
                                <div className="text-left">
                                    <p className="text-xs text-slate-500">Interest Rates</p>
                                    <p className="text-sm font-bold text-slate-800">Starting @ 9.97%</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-slate-100">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">₹</div>
                                <div className="text-left">
                                    <p className="text-xs text-slate-500">Loan Amount</p>
                                    <p className="text-sm font-bold text-slate-800">Up to ₹1 Cr.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Banner Carousel */}
                    <div className="lg:w-1/2 w-full relative z-10">
                        <div className={`relative rounded-2xl p-8 sm:p-10 text-white shadow-2xl overflow-hidden transition-all duration-500 group min-h-[320px] flex flex-col justify-center ${slide.bgClass}`}>

                            {/* Background Decor */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                                <div className="flex-1">
                                    {/* Highlights/Subtitle */}
                                    {slide.strikeThrough && (
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-blue-200 line-through text-lg">{slide.subtitle}</span>
                                        </div>
                                    )}
                                    {slide.id === 3 && (
                                        <h3 className={slide.highlightColor}>{slide.highlight}</h3>
                                    )}

                                    {/* Title */}
                                    <h2 className="text-3xl font-bold mb-4 leading-tight">
                                        {slide.title} <br />
                                        <span className={slide.highlightColor}>{slide.id !== 3 ? slide.highlight : ''}</span>
                                    </h2>

                                    {/* Features */}
                                    <ul className="space-y-3 mb-8 text-blue-50 text-sm font-medium">
                                        {slide.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
                                                    <CheckCircle2 className="w-3 h-3 text-white" />
                                                </div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    {/* 4. Update the Button to use the handler */}
                                    <button 
                                        onClick={() => handleCtaClick(slide.id)}
                                        className="bg-white text-blue-900 px-6 py-3 rounded-full font-bold hover:bg-yellow-400 transition-colors flex items-center gap-2 group-hover:gap-3 shadow-lg"
                                    >
                                        {slide.buttonText} <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* 3D Image Asset */}
                                <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0 animate-float hidden sm:block">
                                    <img src={slide.imageSrc} alt="Offer Icon" className="w-full h-full object-contain drop-shadow-xl" />
                                </div>
                            </div>

                            {/* Slide Decor */}
                            {slide.decorIcon}

                            {/* Dots Navigation */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                                {slides.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentSlide(idx)}
                                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-yellow-400 w-6' : 'bg-white/50 hover:bg-white'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HeroSection;
