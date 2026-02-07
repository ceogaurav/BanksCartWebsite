import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const CreditReportTerms: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen font-inter flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Credit Report Terms of Use</h1>
                    <p className="text-gray-500 text-sm mb-8">Last Updated: December 30, 2025</p>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">1. Authorization to Fetch Credit Information</h2>
                            <p>
                                By submitting your request for a credit report on BanksCart, you explicitly authorize BanksCart and its lending partners to request and receive your credit information from Credit Information Companies (CICs) such as CIBIL, Experian, Equifax, or CRIF High Mark. You understand that this is a "soft inquiry" which does not negatively impact your credit score.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">2. Purpose of Use</h2>
                            <p>
                                Your credit information will be used for the following purposes:
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Displaying your credit score and report analysis to you.</li>
                                    <li>Assessing your eligibility for various credit products (loans, credit cards).</li>
                                    <li>Providing personalized offers and recommendations.</li>
                                    <li>Verifying your identity as part of our rigorous security protocols.</li>
                                </ul>
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">3. Consent to be Contacted</h2>
                            <p>
                                By using this service, you provide your express consent to be contacted by BanksCart or our partnered financial institutions via SMS, Email, WhatsApp, or Voice Call to explain the details of your credit report or discuss relevant financial products, even if you are registered on the DND (Do Not Disturb) registry.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">4. Accuracy of Information</h2>
                            <p>
                                BanksCart fetches data directly from the CICs "as is". We are not responsible for any inaccuracies in the data reported by the credit bureaus. If you find discrepancies, you are advised to raise a dispute directly with the respective bureau or use our support channels for guidance.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">5. Data Privacy & Security</h2>
                            <p>
                                We employ banking-grade security measures (including 256-bit encryption) to protect your sensitive financial data. Your credit report data is not shared with third parties without your explicit consent for a specific loan or card application.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CreditReportTerms;
