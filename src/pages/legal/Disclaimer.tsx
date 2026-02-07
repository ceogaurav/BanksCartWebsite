import React from 'react';

const Disclaimer: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Disclaimer</h1>
                <p className="text-slate-500 mb-8">Last updated: February 2026</p>

                <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6 text-slate-700 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">General Information</h2>
                        <p>
                            The information provided on BanksCart.com is for general informational purposes only. All information on the Site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">Financial Products</h2>
                        <p>
                            BanksCart acts as a connecting platform between customers and financial institutions. We do not grant loans, credit cards, or other financial products directly, nor do we guarantee the approval of any application. Approval is at the sole discretion of the respective banks and financial institutions (NBFCs).
                        </p>
                        <p className="mt-2">
                            Interest rates, processing fees, and other charges are subject to change by the respective financial institutions without prior notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">Third-Party Links</h2>
                        <p>
                            The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">No Professional Advice</h2>
                        <p>
                            The Site cannot and does not contain financial advice. The financial information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Disclaimer;
