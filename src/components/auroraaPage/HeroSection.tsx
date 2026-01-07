import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Shield, ArrowRight } from 'lucide-react';
import SuccessMessage from '@/components/common/SuccessMessage';
import { Link } from 'react-router-dom';
import { Routes } from '@/lib/routes';

const HeroSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState('');
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

    return (
        <>
            {/* Success Popup */}
            <AnimatePresence>
                {showSuccessPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[1100] flex items-center justify-center p-4"
                        onClick={() => setShowSuccessPopup(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-[#0f1115] border border-white/10 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-8">
                                <SuccessMessage email={email} />
                                <button
                                    onClick={() => setShowSuccessPopup(false)}
                                    className="mt-6 w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0B]">
                {/* Background Effects */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0A0A0B] via-transparent to-[#0A0A0B] pointer-events-none"></div>

                    {/* Animated Orbs */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#1B7FDC]/20 rounded-full blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#0DB8D3]/15 rounded-full blur-[120px]"
                    />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl mx-auto text-center space-y-10"
                    >
                        {/* Pill */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mx-auto backdrop-blur-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-[#0DB8D3] animate-pulse"></span>
                            Building the Future of Digital Art
                        </motion.div>

                        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.05]">
                            Built for artists. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B7FDC] via-[#0DB8D3] to-[#1B7FDC] animate-gradient bg-[length:200%_auto]">
                                In the AI age.
                            </span>
                        </h1>

                        <p className="text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
                            Auroraa is focused on building a better future where creativity is respected, ownership matters, and artists feel safe sharing their work.
                        </p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Link
                                to={`/${Routes.ProtectPage}`}
                                className="px-8 py-4 bg-white text-[#065B98] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center"
                            >
                                Try Auroraa Protect Now
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </motion.div>

                        <div className="max-w-md mx-auto relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

                            {/* <form onSubmit={handleSubmit} className="relative flex p-2 bg-[#0f1115]/80 backdrop-blur-xl border border-white/10 rounded-xl">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email address"
                                    className="flex-1 px-4 bg-transparent border-none text-white placeholder-gray-500 focus:outline-none text-lg" // removed focus ring for cleaner look
                                    required
                                />
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                    ) : isSubmitted ? (
                                        <Check className="w-5 h-5" />
                                    ) : (
                                        <>
                                            Join Waitlist <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </button>
                            </form> */}
                        </div>

                        <div className="flex items-center justify-center gap-8 text-sm text-gray-500 pt-4">
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-[#0DB8D3]" />
                                <span>Spam-free Guarantee</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-gray-800" />
                            <div className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-[#0DB8D3]" />
                                <span>Early Access Priority</span>
                            </div>
                        </div>

                    </motion.div>
                </div>

                <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10 text-white/20 animate-bounce">
                    <ChevronDown size={32} />
                </div>
            </section>
        </>
    )
}

export default HeroSection
