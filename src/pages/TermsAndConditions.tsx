import React, { useEffect } from 'react';

const TermsAndConditions = () => {
    useEffect(() => {
        document.title = 'Terms & Conditions | Auroraa';
    }, []);

    return (
        <div className="min-h-screen bg-background py-12 pb-24 md:pb-5 px-4 sm:px-6 lg:px-8">

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Terms & Conditions</h1>
                    <p className="text-muted-foreground">Last Updated: 21st Oct 2025</p>
                </div>

                <div className="prose prose-lg max-w-none text-foreground">
                    <p className="mb-8">
                        Welcome to <span className="font-semibold">Auroraa</span> ("we," "our," or "us"). These Terms & Conditions govern your use of our platform, for social networking features . By accessing or using our app/website, you agree to these Terms. If you do not agree, please do not use our services.
                    </p>

                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Eligibility</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                {/* <li>You must be at least 13 years old to use the social media features, and at least 18 years old to use e-commerce features (such as buying/selling products).</li> */}
                                <li>By creating an account, you confirm that the information you provide is accurate and up to date.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">2. User Accounts</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                                <li>You are responsible for all activity under your account.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Social Media Use</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>You may share posts, images, videos, and other content ("User Content").</li>
                                <li>You retain ownership of your content, but grant us a non-exclusive, worldwide license to display and distribute it within the platform.</li>
                                <li>Prohibited content includes hate speech, harassment, nudity, explicit sexual content, fake information, or any illegal activity.</li>
                            </ul>
                        </section>

                        {/* <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">4. E-Commerce Services</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Buyers and sellers are solely responsible for transactions conducted through the platform.</li>
                                <li>We act as an intermediary and are not liable for product quality, delivery delays, or disputes.</li>
                                <li>Refunds, returns, and cancellations are subject to seller policies unless otherwise mandated by applicable law.</li>
                            </ul>
                        </section> */}

                        {/* <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Payments</h2>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Payments are processed via third-party gateways.</li>
                                <li>You agree to comply with their terms in addition to ours.</li>
                                <li>We are not responsible for failed or delayed transactions due to external providers.</li>
                            </ul>
                        </section> */}

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Intellectual Property</h2>
                            <p>All content, logos, designs, and features of the platform are our intellectual property and may not be copied or distributed without permission.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Termination</h2>
                            <p>We reserve the right to suspend or terminate accounts that violate these Terms or engage in harmful behavior.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
                            <p>We are not liable for indirect, incidental, or consequential damages arising from your use of the platform.</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Governing Law</h2>
                            <p>These Terms are governed by the laws of India. Any disputes shall be resolved in the court of competent jurisdiction.</p>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
