import React from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="bg-gray-50 min-h-screen font-inter flex flex-col">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Privacy Policy</h1>
                    <p className="text-gray-500 text-sm mb-8">Last Updated: December 30, 2025</p>

                    <div className="space-y-6 text-gray-700 leading-relaxed">
                        <p>
                            At BanksCart, accessible from www.bankscart.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by BanksCart and how we use it.
                        </p>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">1. Information We Collect</h2>
                            <p>
                                The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information. This usually includes Name, Email, Phone Number, PAN, and Income details necessary to provide financial services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">2. How We Use Your Information</h2>
                            <p>
                                We use the information we collect in various ways, including to:
                                <ul className="list-disc pl-5 mt-2 space-y-1">
                                    <li>Provide, operate, and maintain our website</li>
                                    <li>Improve, personalize, and expand our website</li>
                                    <li>Understand and analyze how you use our website</li>
                                    <li>Develop new products, services, features, and functionality</li>
                                    <li>Communicate with you, either directly or through one of our partners, for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
                                </ul>
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">3. Log Files and Cookies</h2>
                            <p>
                                BanksCart follows a standard procedure of using log files and cookies to optimize user experience and analyze trends. These are standard industry practices used by all hosting companies and hosting services' analytics.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">4. Third Party Privacy Policies</h2>
                            <p>
                                BanksCart's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.
                            </p>
                        </section>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
