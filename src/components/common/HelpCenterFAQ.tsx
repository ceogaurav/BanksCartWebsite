import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Plus, Minus, ArrowLeft, HelpCircle, Search } from 'lucide-react';

// Define categories to match the requirements
const CATEGORIES = [
    "Credit Score",
    "Account Related",
    "Loan Offers",
    "Security",
    "Report Error"
];

// Define content logic
// In a real app, this could be fetched from an API
const FAQ_DATA = {
    "Credit Score": [
        {
            question: "What is a Credit Score?",
            answer: "A credit score is a 3-digit number (ranging from 300-900) that represents your creditworthiness. It is derived from your credit history, including loan repayments, credit card usage, and tenure of credit. A score above 750 is generally considered excellent."
        },
        {
            question: "Will checking my score on BanksCart lower it?",
            answer: "No, checking your credit score on BanksCart is considered a 'soft inquiry'. Soft inquiries do not impact your credit score. Only 'hard inquiries' made by lenders when you apply for a loan can temporarily dip your score."
        },
        {
            question: "Why hasn't my score been updated?",
            answer: "Credit scores are typically refreshed every 30-45 days by credit bureaus (like CIBIL, Experian). If you recently paid off a debt, it might take a billing cycle for the lender to report it to the bureau and for your score to reflect the change."
        }
    ],
    "Account Related": [
        {
            question: "How do I update my profile information?",
            answer: "You can update your profile information, such as your employment details and address, directly from the 'My Profile' section in your dashboard. For sensitive fields like Email or Mobile, please visit Security Settings."
        },
        {
            question: "Can I delete my account?",
            answer: "Yes, you can request account deletion by contacting our support team via the 'Report Error' or 'Contact Us' section. Please note that this action is irreversible."
        }
    ],
    "Loan Offers": [
        {
            question: "How do I apply for a Personal Loan?",
            answer: "You can apply for a personal loan by navigating to the 'Pre-Approved Offers' tab or clicking on 'Personal Loan' in the products section. Our system matches you with the best lenders based on your credit profile."
        },
        {
            question: "What documents are required?",
            answer: "Typically, you need Proof of Identity (Aadhar/PAN), Proof of Address, and Income Proof (Salary slips or Bank Statements). Some pre-approved offers may require zero documentation."
        }
    ],
    "Security": [
        {
            question: "Is my data safe with BanksCart?",
            answer: "Yes, we use industry-standard encryption (AES-256) to protect your data. We do not share your personal information with third parties without your explicit consent for loan applications."
        }
    ],
    "Report Error": [
        {
            question: "I see an incorrect entry in my credit report.",
            answer: "If you spot an error, such as a loan you didn't take or an incorrect balance, you can raise a dispute directly with the credit bureau (CIBIL/Experian) or let us help you via the 'Dispute Resolution' tool."
        }
    ]
};

const HelpCenterFAQ: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState("Credit Score");
    const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(null);

    // Toggle accordion logic
    const toggleQuestion = (index: number) => {
        setOpenQuestionIndex(openQuestionIndex === index ? null : index);
    };

    // Switch category
    const handleCategoryChange = (category: string) => {
        setActiveCategory(category);
        setOpenQuestionIndex(null); // Reset open question when switching tabs
    };

    const currentQuestions = FAQ_DATA[activeCategory as keyof typeof FAQ_DATA] || [];

    return (
        <div className="w-full max-w-5xl mx-auto font-sans">
            {/* CARD CONTAINER */}
            <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden relative">

                {/* TOP DECORATIVE ELEMENT: Question Mark Icon */}
                <div className="absolute top-0 right-0 p-8 pointer-events-none opacity-20 md:opacity-100">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                        <HelpCircle className="w-8 h-8 text-blue-600" />
                    </div>
                </div>

                {/* HEADER SECTION */}
                <div className="p-10 pb-6 relative z-10">
                    {/* Back Button (Visual only as switching tabs handles navigation usually) */}
                    <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 mb-6 transition-colors group font-medium">
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Back</span>
                    </button>

                    <h1 className="text-3xl font-bold text-slate-900 font-['Playfair_Display'] tracking-tight mb-3">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-slate-600 text-base max-w-xl leading-relaxed">
                        Have questions? We're here to help. Browse through our categories to find the answers you need.
                    </p>
                </div>

                {/* CATEGORY FILTER CHIPS */}
                <div className="px-10 pb-8 border-b border-slate-100">
                    <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
                        {CATEGORIES.map((cat) => {
                            const isActive = activeCategory === cat;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => handleCategoryChange(cat)}
                                    className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${isActive
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200 transform scale-105'
                                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                        }`}
                                >
                                    {cat}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ACCORDION LIST */}
                <div className="px-10 py-6 min-h-[400px]">
                    <div className="space-y-1">
                        {currentQuestions.map((item, index) => {
                            const isOpen = openQuestionIndex === index;
                            return (
                                <div
                                    key={index}
                                    className={`border-b border-slate-100 last:border-0 py-5 transition-all duration-300 ${isOpen ? '' : ''}`}
                                >
                                    <button
                                        onClick={() => toggleQuestion(index)}
                                        className="w-full flex items-start justify-between gap-6 text-left group"
                                    >
                                        <span className={`text-lg font-medium transition-colors duration-200 ${isOpen ? 'text-blue-700' : 'text-slate-700 group-hover:text-blue-700'}`}>
                                            {item.question}
                                        </span>
                                        <div className={`flex-shrink-0 mt-1 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                            {isOpen ? (
                                                <Minus className="w-5 h-5 text-blue-600" />
                                            ) : (
                                                <Plus className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                                            )}
                                        </div>
                                    </button>

                                    {/* Answer Content with smooth height transition simulation */}
                                    <div
                                        className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="text-slate-600 leading-relaxed text-base pr-8">
                                                {item.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {currentQuestions.length === 0 && (
                            <div className="text-center py-16 text-slate-400">
                                <Search className="w-16 h-16 mx-auto mb-4 opacity-10" />
                                <p className="text-lg">No questions found for this category.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* FOOTER CTA */}
                <div className="bg-slate-50/50 border-t border-slate-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <p className="text-sm font-bold text-slate-800 mb-1">Still have questions?</p>
                        <p className="text-sm text-slate-500">Can't find the answer you're looking for? Please chat to our friendly team.</p>
                    </div>
                    <button className="bg-white border border-slate-200 hover:border-blue-400 text-blue-700 text-sm font-bold px-8 py-3 rounded-xl shadow-sm hover:shadow-md transition-all">
                        Get in Touch
                    </button>
                </div>

            </div>
        </div>
    );
};

export default HelpCenterFAQ;
