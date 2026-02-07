import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const TermsOfUse: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen font-inter flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Terms of Use</h1>
                    <p className="text-gray-500 text-sm mb-8">Last Updated: December 30, 2025</p>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <p>
                            Welcome to BanksCart. These terms and conditions outline the rules and regulations for the use of BanksCart's Website and Services.
                        </p>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">1. Acceptance of Terms</h2>
                            <p>
                                By accessing this website we assume you accept these terms and conditions. Do not continue to use BanksCart if you do not agree to take all of the terms and conditions stated on this page.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">2. Intellectual Property Rights</h2>
                            <p>
                                Other than the content you own, under these Terms, BanksCart and/or its licensors own all the intellectual property rights and materials contained in this Website. You are granted limited license only for purposes of viewing the material contained on this Website.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">3. Restrictions</h2>
                            <p>
                                You are specifically restricted from all of the following:
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Publishing any Website material in any other media;</li>
                                    <li>Selling, sublicensing and/or otherwise commercializing any Website material;</li>
                                    <li>Using this Website in any way that is or may be damaging to this Website;</li>
                                    <li>Using this Website contrary to applicable laws and regulations.</li>
                                </ul>
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">4. Limitation of Liability</h2>
                            <p>
                                In no event shall BanksCart, nor any of its officers, directors and employees, be held liable for anything arising out of or in any way connected with your use of this Website whether such liability is under contract.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfUse;
