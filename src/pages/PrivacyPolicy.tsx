import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { Routes } from '@/lib/routes';
import React, { useEffect } from 'react';

const PrivacyPolicy = () => {

    useEffect(() => {
        document.title = 'Privacy Policy | Auroraa';
    }, []);

    const navigationItems = [
        { label: 'Home', href: '/' },
        { label: 'Auroraa Protect', href: Routes.ProtectPage },
    ];

    return (
        <>
            <Header navigationItems={navigationItems} />
            <div className="min-h-screen bg-[#193546] text-white py-12 pb-24 md:pb-5 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
                        <p className="text-gray-400">Last Updated: January 2026</p>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-300">
                        <p className="mb-8">
                            This Privacy Policy explains how <span className="font-semibold text-[#0DB8D3]">Auroraa</span> collects, uses, and protects your information when you use our artist protection and AI-safeguarding services.
                        </p>

                        <div className="space-y-8">
                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li><span className="font-medium">Account Information:</span> Name, email address, password, and profile details you provide when creating an account.</li>
                                    <li><span className="font-medium">Artwork Data:</span> Images and creative works you submit for protection processing.</li>
                                    <li><span className="font-medium">Usage Data:</span> How you interact with our protection services, features used, and processing history.</li>
                                    <li><span className="font-medium">Device & Technical Data:</span> IP address, browser type, operating system, and device identifiers.</li>
                                    <li><span className="font-medium">Payment Information:</span> Billing details for premium services (processed securely by third-party providers).</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>To provide and operate our AI-protection processing services.</li>
                                    <li>To authenticate users and manage account access.</li>
                                    <li>To communicate with you about service updates, security alerts, and support.</li>
                                    <li>To improve our protection algorithms and service quality.</li>
                                    <li>To process payments for premium features.</li>
                                    <li>To enforce our Terms & Conditions and prevent misuse.</li>
                                    <li>To analyze usage patterns to enhance user experience.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">3. Artwork Processing and Storage</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Your artwork is processed using our proprietary AI-protection technology.</li>
                                    <li>Processed artwork may be temporarily stored during processing.</li>
                                    <li>Original and protected artwork is stored in your account only if you choose to save it.</li>
                                    <li>We do not use your artwork for training AI models or any other purposes without explicit consent.</li>
                                    <li>All artwork is encrypted during transmission and storage.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security and Protection</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>We use industry-standard AES-256 encryption for data protection.</li>
                                    <li>All artwork transmissions are secured with SSL/TLS protocols.</li>
                                    <li>We implement strict access controls and authentication systems.</li>
                                    <li>Regular security audits and vulnerability assessments are conducted.</li>
                                    <li>Your artwork is processed in a secure, isolated environment.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">5. Sharing of Information</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>We never sell your personal information or artwork to third parties.</li>
                                    <li>We share data only with trusted service providers necessary for operation (payment processors, cloud infrastructure).</li>
                                    <li>We may disclose information if required by law or to protect our rights and safety.</li>
                                    <li>Aggregated, anonymized data may be used for analytics and service improvement.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">6. Your Rights and Choices</h2>
                                <p className="mb-4">You have the right to:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Access, view, and download your account information.</li>
                                    <li>Update or correct your personal information.</li>
                                    <li>Delete your account and associated data (except as required for legal compliance).</li>
                                    <li>Request a copy of your data.</li>
                                    <li>Opt out of marketing communications.</li>
                                    <li>Control how your artwork is stored and managed.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">7. Cookies and Tracking Technologies</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>We use essential cookies for platform functionality and security.</li>
                                    <li>Analytics cookies help us understand service usage and improve performance.</li>
                                    <li>Preference cookies remember your settings and customization choices.</li>
                                    <li>You can control cookie settings through your browser preferences.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">8. Data Retention</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Account information is retained while your account is active.</li>
                                    <li>Artwork is retained based on your storage preferences and subscription level.</li>
                                    <li>Temporary processing data is deleted within 30 days.</li>
                                    <li>Legal requirements may require longer retention of certain data.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">9. International Data Transfers</h2>
                                <p>Your data may be processed and stored on secure servers in various countries. We ensure appropriate safeguards are in place for international data transfers in compliance with applicable data protection laws.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">10. Children's Privacy</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Our services are not intended for individuals under 18 years of age.</li>
                                    <li>We do not knowingly collect personal information from minors.</li>
                                    <li>If we become aware of collecting data from a minor, we will delete it promptly.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">11. Changes to This Policy</h2>
                                <p>We may update this Privacy Policy to reflect changes in our practices or legal requirements. We will notify users of significant changes via email or platform notifications. Continued use of our services after changes constitutes acceptance.</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">12. Contact Us</h2>
                                <p>If you have questions about this Privacy Policy or your data rights, please contact us:</p>
                                <p className="mt-2">
                                    <a href="mailto:auroraa@auroraa.in" className="text-[#0DB8D3] hover:underline flex items-center">
                                        <span className="mr-2">📧</span> auroraa@auroraa.in
                                    </a>
                                </p>
                                <p className="mt-4">
                                    For data protection inquiries specific to your region, please include your jurisdiction in your request.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;
