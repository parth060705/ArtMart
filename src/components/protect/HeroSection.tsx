import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { Upload, Shield, Lock, Sparkles, Check } from 'lucide-react';
import SuccessMessage from '../common/SuccessMessage';

const HeroSection = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("entry.1167542943", email);
        await fetch('https://docs.google.com/forms/d/e/1FAIpQLSe2uP0xP2I7TJCBdKy20oYdnghKFqI4cuRZGH8h8pLj3e3J9A/formResponse', {
            method: 'POST',
            mode: "no-cors",
            body: formData,
        });
        setIsSubmitting(false);
        setIsSubmitted(true);
        setShowSuccessPopup(true);
        setEmail('');
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <>
            {showSuccessPopup && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1100] flex items-center justify-center p-4"
                    onClick={() => setShowSuccessPopup(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-[#193546] border border-[#1B7FDC]/30 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <SuccessMessage email={email} />
                        <div className="p-4 border-t border-[#1B7FDC]/20 flex justify-end">
                            <button
                                onClick={() => setShowSuccessPopup(false)}
                                className="px-6 py-2 bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] text-white rounded-lg hover:opacity-90 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto text-center space-y-8"
                    >
                        <motion.div variants={fadeInUp}>
                            <motion.div
                                className="inline-flex items-center space-x-3 mb-6 px-6 py-2 bg-[#065B98]/20 backdrop-blur-sm rounded-full border border-[#1B7FDC]/30"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Sparkles className="w-5 h-5 text-[#0DB8D3]" />
                                <span className="text-sm font-medium text-[#0DB8D3]">Coming Soon</span>
                            </motion.div>

                            <motion.h1
                                variants={fadeInUp}
                                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B7FDC] via-[#0DB8D3] to-[#1B7FDC]">
                                    Your digital assets,
                                </span>
                                <br />
                                <motion.span
                                    className="text-[#0DB8D3]"
                                    animate={{
                                        textShadow: [
                                            '0 0 0px rgba(13, 184, 211, 0)',
                                            '0 0 20px rgba(13, 184, 211, 0.5)',
                                            '0 0 0px rgba(13, 184, 211, 0)'
                                        ]
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        repeatType: 'reverse'
                                    }}
                                >
                                    protected like never before.
                                </motion.span>
                            </motion.h1>

                            <motion.p
                                variants={fadeInUp}
                                className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                            >
                                Auroraa Protect keeps your creative work secure in the AI era.
                            </motion.p>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="relative z-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="relative max-w-2xl mx-auto mt-12">
                                <motion.div
                                    className="absolute -inset-1 bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] rounded-2xl opacity-30 blur"
                                    animate={{
                                        opacity: [0.2, 0.4, 0.2],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        repeatType: 'reverse',
                                    }}
                                />
                                <div id='hero-section' className="relative bg-[#0f2533] backdrop-blur-sm p-1 rounded-2xl shadow-2xl border border-[#1B7FDC]/30">
                                    <div className="p-8 text-center">
                                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#065B98]/30 to-[#1B7FDC]/20 mb-6 border border-[#1B7FDC]/30">
                                            <Lock className="h-12 w-12 text-[#0DB8D3]" />
                                        </div>
                                        <h2 className="text-3xl font-bold text-white mb-4">Secure File Protection</h2>
                                        <p className="text-gray-300 mb-8 max-w-lg mx-auto text-lg">
                                            Your creative work deserves the highest level of security.
                                        </p>

                                        <div className="border-2 border-dashed border-[#1B7FDC]/30 rounded-xl p-8 text-center hover:border-[#0DB8D3]/50 transition-colors bg-[#193546]/50 backdrop-blur-sm">
                                            <Upload className="h-12 w-12 text-[#0DB8D3] mx-auto mb-4" />
                                            <p className="text-lg font-medium text-white mb-2">Coming Soon</p>
                                            <p className="text-gray-400">
                                                We're working hard to bring you the most secure file protection platform.
                                            </p>
                                        </div>

                                        <div className="mt-12">
                                            <p className="text-sm text-gray-400 mb-4">Be the first to know when we launch</p>
                                            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubmit}>
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Your email address"
                                                    className="flex-1 px-6 py-4 bg-[#193546] border border-[#065B98]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B7FDC]/50 text-white placeholder-gray-400 transition-all"
                                                    required
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className="group inline-flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-[0_12px_40px_rgba(13,184,211,0.35)] hover:scale-[1.02] transition-all ease-in-out cursor-pointer"
                                                >
                                                    {isSubmitting ? (
                                                        'Joining...'
                                                    ) : isSubmitted ? (
                                                        <>
                                                            <Check className="w-5 h-5" /> Joined
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>Join for free</span>
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                            <p className="text-sm text-gray-400 mt-4 flex items-center justify-center space-x-2">
                                                <Shield className="w-4 h-4 text-[#0DB8D3]" />
                                                <span>Your email is safe with us. No spam, ever.</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </>
    )
}

export default HeroSection
