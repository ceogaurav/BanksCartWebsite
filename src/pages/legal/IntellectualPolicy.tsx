import React from 'react';

const IntellectualPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-50 pt-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Intellectual Property Policy</h1>
                <p className="text-slate-500 mb-8">Last updated: February 2026</p>

                <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6 text-slate-700 leading-relaxed">
                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">Copyright Ownership</h2>
                        <p>
                            All content included on BanksCart.com, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software, is the property of BanksCart or its content suppliers and is protected by Indian and international copyright laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">Trademarks</h2>
                        <p>
                            "BanksCart", the BanksCart logo, and other marks indicated on our site are trademarks of BanksCart. Our graphics, logos, page headers, button icons, scripts, and service names are trademarks or trade dress of BanksCart. These trademarks and trade dress may not be used in connection with any product or service that is not BanksCart's, in any manner that is likely to cause confusion among customers, or in any manner that disparages or discredits BanksCart.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">User License</h2>
                        <p>
                            BanksCart grants you a limited license to access and make personal use of this site and not to download (other than page caching) or modify it, or any portion of it, except with express written consent of BanksCart. This license does not include any resale or commercial use of this site or its contents.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-slate-900 mb-3">Copyright Complaints</h2>
                        <p>
                            BanksCart respects the intellectual property of others. If you believe that your work has been copied in a way that constitutes copyright infringement, please contact our legal team at legal@bankscart.com.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default IntellectualPolicy;
