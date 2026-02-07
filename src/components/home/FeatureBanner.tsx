import React from 'react';
import { CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

interface BannerProps {
    badge?: string;
    title: string;
    titleSuffix?: string;
    highlight?: string;
    features: string[];
    btnText: string;
    imageSrc: string;
    imageAlt: string;
    delay?: string;
}

const BannerCard: React.FC<BannerProps> = ({ badge, title, titleSuffix, highlight, features, btnText, imageSrc, imageAlt, delay = "0s" }) => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl shadow-lg p-6 flex flex-col justify-between group hover:shadow-xl transition-shadow duration-300">
            {/* Background Texture - Subtle Geometric Shapes */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-10 -mt-10"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-xl -ml-10 -mb-5"></div>

            {/* Content Section */}
            <div className="relative z-10 flex-1">
                {badge && (
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 mb-3">
                        <span className="text-xs font-bold text-white tracking-wide uppercase flex items-center gap-1">
                            {badge}
                        </span>
                    </div>
                )}

                <h3 className="text-2xl font-bold text-white mb-1 leading-tight">
                    {title} <br />
                    {highlight && <span className="text-yellow-400">{highlight}</span>} {titleSuffix}
                </h3>

                <ul className="mt-4 space-y-2 mb-6">
                    {features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-blue-100 text-sm font-medium">
                            <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Bottom Section: Button & Image */}
            <div className="relative z-10 flex items-end justify-between mt-2">
                <button className="bg-white text-blue-900 hover:bg-blue-50 px-5 py-2.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 group-hover:gap-3 shadow-sm">
                    {btnText} <ChevronRight className="w-4 h-4" />
                </button>

                {/* Floating 3D Image */}
                <div
                    className="absolute right-[-10px] bottom-[-10px] w-28 h-28 sm:w-32 sm:h-32 animate-bounce-gentle"
                    style={{ animationDelay: delay }}
                >
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className="w-full h-full object-contain drop-shadow-2xl"
                    />
                </div>
            </div>
        </div>
    );
};

const FeatureBanner: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-yellow-500 fill-yellow-500" /> Premium Offers for You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* 1. Credit Score Banner */}
                <BannerCard
                    badge="Worth ₹1,200"
                    title="Get Credit Score & Report"
                    highlight="Absolutely FREE"
                    features={["Stand a chance to win prizes", "Free Accidental Insurance"]}
                    btnText="Check Now"
                    imageSrc="/icons/credit_score.png"
                    imageAlt="Credit Score 3D Icon"
                    delay="0s"
                />

                {/* 2. Business Loan Banner */}
                <BannerCard
                    badge="Paperless Process"
                    title="Get Business Loan"
                    highlight="up to ₹1 Cr"
                    features={["Interest rates starts @12%", "Detailed Comparison"]}
                    btnText="Apply Now"
                    imageSrc="/icons/business_loan.png"
                    imageAlt="Business Loan 3D Icon"
                    delay="1s"
                />

                {/* 3. Gold Loan Banner */}
                <BannerCard
                    badge="Quick Disbursal"
                    title="Instant Cash against"
                    highlight="Gold"
                    titleSuffix="Online"
                    features={["Step-by-step guide", "Transparent Valuation"]}
                    btnText="Get Cash"
                    imageSrc="/icons/investment.png"
                    imageAlt="Gold Loan 3D Icon"
                    delay="2s"
                />
            </div>
        </div>
    );
};

export default FeatureBanner;
