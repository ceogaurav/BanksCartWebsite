import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const InvestorRelations: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Investor Relations</h1>
                <p className="text-slate-500 mb-8">Last updated: February 2026</p>

                <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6 text-slate-700 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">Overview</h2>
                        <p>
                            BanksCart is one of India's leading financial services marketplaces. We are committed to transparency, sustainable growth, and delivering long-term value to our shareholders. Our platform connects millions of customers with a wide range of financial products, driven by technology and data analytics.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">Financial Performance</h2>
                        <p>
                            We have consistently demonstrated robust financial growth, driven by our expanding user base and diversified product portfolio. Our annual reports and quarterly results provide a detailed view of our financial health and operational metrics.
                        </p>
                        <p className="mt-2 text-sm italic text-slate-500">
                            * Detailed financial reports are available for download in our secure investor portal.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">Corporate Governance</h2>
                        <p>
                            We uphold the highest standards of corporate governance, ensuring ethical conduct, accountability, and fairness in all our dealings. Our board comprises experienced leaders who guide the company's strategic direction.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">Investor Contact</h2>
                        <p>
                            For investor queries and grievances, please contact our Investor Relations team:
                        </p>
                        <div className="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                            <p><strong>Email:</strong> investors@bankscart.com</p>
                            <p><strong>Phone:</strong> +91 968 685 9296</p>
                            <p><strong>Address:</strong> Raj Arcade Gb. Palya, Bengaluru, Karnataka 560068, India</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default InvestorRelations;
