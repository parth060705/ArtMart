import React, { useEffect } from 'react';

const PrivacyPolicy = () => {

    useEffect(() => {
        document.title = 'Privacy Policy | Auroraa';
    }, []);

    return (
        <div className="min-h-screen bg-background py-12 pb-24 md:pb-5 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
                    <p className="text-muted-foreground">Last Updated: 21st Oct 2025</p>
                </div>

                <div className="prose prose-lg max-w-none text-foreground">
                    <p className="mb-8">
                        This Privacy Policy explains how <span className="font-semibold">Auroraa</span> collects, uses, and protects your information when you use our social media features.
                    </p>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><span className="font-medium">Account Information:</span> Name, email, phone number, gender, profile details.</li>
                                <li><span className="font-medium">Content:</span> Posts, images, comments, messages.</li>
                                {/* <li><span className="font-medium">E-Commerce Data:</span> Order history, payment details (processed by third parties, not stored by us).</li> */}
                                <li><span className="font-medium">Device & Usage Data:</span> IP address, browser/device type, app usage statistics.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">2. How We Use Information</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>To provide and improve our services.</li>
                                <li>To personalize your feed and product recommendations.</li>
                                {/* <li>To process transactions and facilitate communication between buyers and sellers.</li> */}
                                <li>To enforce our Terms & Conditions.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Sharing of Information</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>With trusted third-party service providers (payment gateways, cloud hosting, analytics).</li>
                                <li>With law enforcement, if required by applicable law.</li>
                                <li>We never sell your personal information to advertisers.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Security</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>We use industry-standard encryption and security measures to protect your data.</li>
                                <li>However, no online service is 100% secure, and we cannot guarantee absolute protection.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Your Rights</h2>
                            <p className="mb-4">Depending on your region, you may have rights to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Access, update, or delete your account information.</li>
                                <li>Opt out of marketing emails.</li>
                                <li>Request data portability (where applicable by law).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Cookies & Tracking</h2>
                            <p>We use cookies and similar technologies to enhance user experience, analyze traffic, and deliver relevant content.</p>
                        </section>

                        {/* <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Children's Privacy</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Social media features are not intended for children under 13.</li>
                                <li>E-commerce features are not intended for children under 18.</li>
                            </ul>
                        </section> */}

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Changes to Policy</h2>
                            <p>We may update this Privacy Policy from time to time. Continued use of the platform after changes constitutes acceptance.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Us</h2>
                            <p>If you have questions, reach us at:</p>
                            <p className="mt-2">
                                <a href="mailto:auroraa@auroraa.in" className="text-primary hover:underline flex items-center">
                                    <span className="mr-2">📧</span> auroraa@auroraa.in
                                </a>
                            </p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
