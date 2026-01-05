import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import { Routes } from '@/lib/routes';
import React, { useEffect } from 'react';

const TermsAndConditions = () => {
    useEffect(() => {
        document.title = 'Terms & Conditions | Auroraa';
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
                        <h1 className="text-4xl font-bold text-white mb-4">Terms & Conditions</h1>
                        <p className="text-gray-400">Last Updated: January 2026</p>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-300">
                        <p className="mb-8">
                            Welcome to <span className="font-semibold text-[#0DB8D3]">Auroraa</span> ("we," "our," or "us"). These Terms & Conditions govern your use of our artist protection platform and AI-safeguarding services. By accessing or using our platform, you agree to these Terms. If you do not agree, please do not use our services.
                        </p>

                        <div className="space-y-8">
                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">1. Services Overview</h2>
                                <p className="mb-4">Auroraa provides artists with tools and services to protect their creative work from unauthorized AI training and usage, including:</p>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>AI-untrainable image processing</li>
                                    <li>Style-theft prevention technology</li>
                                    <li>Digital art protection services</li>
                                    <li>Community platform for artists</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">2. Eligibility</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>You must be at least 18 years old to use our protection services.</li>
                                    <li>By creating an account, you confirm that you are an artist, creator, or have legitimate rights to the content you submit for protection.</li>
                                    <li>You confirm that the information you provide is accurate and up to date.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">3. User Accounts</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>You are responsible for maintaining the confidentiality of your login credentials.</li>
                                    <li>You are responsible for all activity under your account.</li>
                                    <li>You must provide accurate information when creating your account.</li>
                                    <li>One person or entity may maintain only one account.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">4. Content and Artwork Protection</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>You retain full ownership and copyright of all artwork you submit to Auroraa.</li>
                                    <li>Our protection services process your artwork to make it resistant to AI training while maintaining visual integrity.</li>
                                    <li>You grant us a limited license to process your artwork solely for the purpose of providing protection services.</li>
                                    <li>We do not claim ownership of your artwork or use it for any other purposes without your explicit consent.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">5. Prohibited Uses</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Using our services to protect content you do not own or have rights to.</li>
                                    <li>Attempting to reverse-engineer or circumvent our protection technologies.</li>
                                    <li>Submitting content that is illegal, harmful, or violates third-party rights.</li>
                                    <li>Using our platform for any fraudulent or malicious purposes.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">6. Payment and Subscription</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Basic protection services may be offered free of charge.</li>
                                    <li>Premium features require subscription payment as outlined in our pricing.</li>
                                    <li>Payments are processed via secure third-party payment gateways.</li>
                                    <li>Subscription fees are non-refundable except as required by law.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">7. Intellectual Property</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Auroraa's protection technology, algorithms, and platform features are our proprietary intellectual property.</li>
                                    <li>You may not copy, reverse-engineer, or redistribute our technology without permission.</li>
                                    <li>Your artwork remains your property, and we make no ownership claims.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">8. Privacy and Data Protection</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>We respect your privacy and handle your artwork and personal data according to our Privacy Policy.</li>
                                    <li>Processed artwork is not permanently stored unless you choose to save it to your account.</li>
                                    <li>We implement industry-standard security measures to protect your data.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">9. Service Availability</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>We strive to maintain high service availability but do not guarantee 100% uptime.</li>
                                    <li>We may temporarily suspend services for maintenance or updates.</li>
                                    <li>We are not liable for service interruptions or data loss.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">10. Limitation of Liability</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>Our protection services reduce but cannot completely eliminate all risks of AI misuse.</li>
                                    <li>We are not liable for any unauthorized use that occurs despite our protection measures.</li>
                                    <li>Our total liability shall not exceed the amount you paid for our services in the preceding 12 months.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">11. Termination</h2>
                                <ul className="list-disc pl-6 space-y-2">
                                    <li>You may terminate your account at any time through your account settings.</li>
                                    <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
                                    <li>Upon termination, you lose access to protected features and saved artwork.</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-semibold text-white mb-4">12. Governing Law</h2>
                                <p>These Terms are governed by the laws of India. Any disputes shall be resolved in the court of competent jurisdiction.</p>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default TermsAndConditions;
