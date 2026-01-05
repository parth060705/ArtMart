import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown, Shield } from 'lucide-react';
import SuccessMessage from '@/components/common/SuccessMessage';

const HeroSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [waitlistCount] = useState(2847);
    const [email, setEmail] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

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
            </AnimatePresence>
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Aurora Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
                        initial={{ scale: 1, opacity: 0.3 }}
                        animate={{
                            scale: 1.1,
                            opacity: 0.5,
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                        }}
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: 'translateZ(0)',
                            willChange: 'transform, opacity',
                            background: 'radial-gradient(circle, rgba(27, 127, 220, 0.3), transparent)'
                        }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
                        initial={{ scale: 0.9, opacity: 0.2 }}
                        animate={{
                            scale: 1,
                            opacity: 0.4,
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                            delay: 1
                        }}
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: 'translateZ(0)',
                            willChange: 'transform, opacity',
                            background: 'radial-gradient(circle, rgba(13, 184, 211, 0.3), transparent)'
                        }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
                        initial={{ scale: 1, opacity: 0.1 }}
                        animate={{
                            scale: 1.2,
                            opacity: 0.3,
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut',
                            delay: 2
                        }}
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: 'translateZ(0)',
                            willChange: 'transform, opacity',
                            background: 'radial-gradient(circle, rgba(6, 91, 152, 0.2), transparent)'
                        }}
                    />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="max-w-4xl mx-auto text-center space-y-8"
                    >
                        <motion.div variants={fadeInUp}>
                            <motion.h1
                                variants={fadeInUp}
                                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold mb-6 leading-tight"
                            >
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B7FDC] via-[#0DB8D3] to-[#1B7FDC]">
                                    Built for artists.
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
                                    In the AI age.
                                </motion.span>
                            </motion.h1>

                            <motion.p
                                variants={fadeInUp}
                                className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
                            >
                                Auroraa is focused on building a better future for artists where creativity is respected, ownership matters, and artists feel safe sharing their work.
                            </motion.p>
                        </motion.div>

                        <motion.div
                            variants={fadeInUp}
                            className="relative z-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <div className="relative max-w-md mx-auto">
                                <motion.div
                                    className="absolute -inset-1 bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] rounded-xl opacity-30 blur"
                                    animate={{
                                        opacity: [0.2, 0.4, 0.2],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        repeatType: 'reverse',
                                    }}
                                />
                                <div className="relative bg-[#0f2533] backdrop-blur-sm p-1 rounded-xl shadow-xl border border-[#1B7FDC]/30">
                                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
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
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 mt-4 flex items-center justify-center space-x-2">
                                <Shield className="w-4 h-4 text-[#0DB8D3]" />
                                <span>Your email is safe with us. No spam, ever.</span>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-[#0DB8D3]/60"
                    >
                        <ChevronDown size={32} />
                    </motion.div>
                </div>

                {/* Floating decorative elements */}
                <AnimatePresence>
                    {isVisible && (
                        <>
                            <motion.div
                                className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full blur-2xl"
                                style={{ background: 'radial-gradient(circle, rgba(27, 127, 220, 0.2), transparent)' }}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{
                                    opacity: [0.1, 0.3, 0.1],
                                    scale: [1, 1.2, 1],
                                    x: [0, 20, 0],
                                    y: [0, -20, 0]
                                }}
                                transition={{
                                    duration: 8,
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                    ease: 'easeInOut',
                                }}
                            />
                            <motion.div
                                className="absolute bottom-1/3 right-1/4 w-40 h-40 rounded-full blur-2xl"
                                style={{ background: 'radial-gradient(circle, rgba(13, 184, 211, 0.15), transparent)' }}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{
                                    opacity: [0.1, 0.3, 0.1],
                                    scale: [0.8, 1, 0.8],
                                    x: [0, -30, 0],
                                    y: [0, 30, 0]
                                }}
                                transition={{
                                    duration: 10,
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                    ease: 'easeInOut',
                                    delay: 1
                                }}
                            />
                        </>
                    )}
                </AnimatePresence>
            </section>
        </>
    )
}

export default HeroSection
