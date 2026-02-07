import React from 'react';
import { Link } from 'react-router-dom';

const SitemapPage: React.FC = () => {

    const sitemapSections = [
        {
            title: "Main",
            links: [
                { name: "Home", href: "/" },
                { name: "About Us", href: "/about" },
                { name: "Contact Us", href: "/contact" },
                { name: "Careers", href: "/careers" },
                { name: "Become a Partner", href: "/become-partner" },
            ]
        },
        {
            title: "Loans",
            links: [
                { name: "Personal Loan", href: "/loans/personal" },
                { name: "Home Loan", href: "/loans/home" },
                { name: "Business Loan", href: "/loans/business" },
                { name: "Car Loan", href: "/loans/car" },
                { name: "Used Car Loan", href: "/loans/used-car" },
                { name: "Education Loan", href: "/loans/education" },
                { name: "Two Wheeler Loan", href: "/loans/two-wheeler" },
            ]
        },
        {
            title: "Credit Cards",
            links: [
                { name: "All Credit Cards", href: "/cards/credit" },
                { name: "Best Credit Cards", href: "/blogs/Best-Credit-Cards" },
            ]
        },
        {
            title: "Investments",
            links: [
                { name: "Fixed Deposit", href: "/investment/fixed-deposit" },
                { name: "Mutual Funds", href: "/investment/mutual-funds" },
                { name: "All Investment Plans", href: "/investment/more-plans" },
            ]
        },
        {
            title: "Resources & Tools",
            links: [
                { name: "Calculators", href: "/calculators" },
                { name: "IFSC Finder", href: "/resources/ifsc-finder" },
                { name: "Gold Rates", href: "/resources/gold-rates" },
                { name: "Income Tax", href: "/resources/income-tax" },
                { name: "PPF", href: "/resources/ppf" },
                { name: "Blogs", href: "/blogs" },
            ]
        },
        {
            title: "Legal",
            links: [
                { name: "Privacy Policy", href: "/privacy-policy" },
                { name: "Terms of Use", href: "/terms-of-use" },
                { name: "Disclaimer", href: "/disclaimer" },
                { name: "Investor Relations", href: "/investor-relations" },
                { name: "Intellectual Policy", href: "/intellectual-policy" },
                { name: "Grievance Redressal", href: "/grievance" },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-8">Sitemap</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sitemapSections.map((section) => (
                        <div key={section.title} className="bg-white rounded-xl shadow-sm p-6">
                            <h2 className="text-xl font-bold text-blue-600 mb-4 border-b border-slate-100 pb-2">{section.title}</h2>
                            <ul className="space-y-2">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.href} className="text-slate-600 hover:text-blue-600 hover:underline transition-colors text-sm">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SitemapPage;
