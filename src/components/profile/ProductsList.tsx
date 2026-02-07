import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductsList: React.FC = () => {
    const navigate = useNavigate();

    const productCategories = [
        {
            name: 'Loans',
            image: '/images/stickers/personal-loan.png',
            items: [
                { name: 'Personal Loan', href: '/loans/personal' },
                { name: 'Home Loan', href: '/loans/home' },
                { name: 'Business Loan', href: '/loans/business' },
                { name: 'Car Loan', href: '/loans/car' },
                { name: 'Used Car Loan', href: '/loans/used-car' },
                { name: 'Two Wheeler Loan', href: '/loans/two-wheeler' },
                { name: 'Education Loan', href: '/loans/education' }
            ]
        },
        {
            name: 'Investment',
            image: '/images/stickers/investment.png',
            items: [
                { name: 'Fixed Deposit', href: '/investment/fixed-deposit' },
                { name: 'Mutual Funds', href: '/investment/mutual-funds' },
                { name: 'More Plans', href: '/investment/more-plans' }
            ]
        },
        {
            name: 'Cards',
            image: '/images/stickers/credit-card.png',
            items: [
                { name: 'Credit Cards', href: '/cards/credit' },
                { name: 'Debit Cards', href: '/cards/debit' }
            ]
        },
        {
            name: 'Insurance',
            image: '/images/stickers/insurance.png',
            items: [
                { name: 'Health Insurance', href: '/insurance/health' },
                { name: 'Term Life Insurance', href: '/insurance/term-life' },
                { name: 'Car Insurance', href: '/insurance/car' }
            ]
        }
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {productCategories.map((category) => (
                    <div key={category.name} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all overflow-hidden relative">
                        <div className="flex items-center justify-between mb-4 z-10 relative">
                            <div className="flex items-center gap-3">
                                <div className="h-16 w-16 -ml-2">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="w-full h-full object-contain drop-shadow-md"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                            </div>
                        </div>

                        <div className="space-y-2 z-10 relative">
                            {category.items.map((item) => (
                                <div
                                    key={item.name}
                                    onClick={() => navigate(item.href)}
                                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                                >
                                    <span className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors">{item.name}</span>
                                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductsList;
