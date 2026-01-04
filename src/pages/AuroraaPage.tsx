import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ChevronDown, Sparkles, Shield, Lock, Users, Palette, Smile, Heart, Star, Instagram, Facebook, Youtube } from 'lucide-react';
import Header from '@/components/protect/Header';
import { Link } from 'react-router-dom';
import { Routes } from '@/lib/routes';
import SuccessMessage from '@/components/protect/SuccessMessage';

const AuroraaPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [waitlistCount] = useState(2847);

    useEffect(() => {
        setIsVisible(true);
    }, []);

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

    // Animation variants
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

    const navigationItems = [
        { label: 'Mission', href: '#mission' },
        { label: 'Community', href: '#community' },
    ];

    return (
        <>
            <div className="min-h-screen bg-[#193546] text-white font-sans overflow-x-hidden">
            <Header navigationItems={navigationItems} />
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
            {/* Floating decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full"
                        style={{
                            width: Math.random() * 400 + 100 + 'px',
                            height: Math.random() * 400 + 100 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                            background: `radial-gradient(circle, ${
                                i % 3 === 0 ? 'rgba(6, 91, 152, 0.15)' : 
                                i % 3 === 1 ? 'rgba(27, 127, 220, 0.15)' : 
                                'rgba(13, 184, 211, 0.15)'
                            }, transparent)`,
                            filter: 'blur(60px)'
                        }}
                        animate={{
                            x: [0, Math.random() * 200 - 100, 0],
                            y: [0, Math.random() * 200 - 100, 0],
                            opacity: [0.15, 0.3, 0.15],
                        }}
                        transition={{
                            duration: Math.random() * 10 + 10,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut'
                        }}
                    />
                ))}
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Aurora Background Effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl"
                        style={{ background: 'radial-gradient(circle, rgba(27, 127, 220, 0.3), transparent)' }}
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
                            willChange: 'transform, opacity'
                        }}
                    />
                    <motion.div
                        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl"
                        style={{ background: 'radial-gradient(circle, rgba(13, 184, 211, 0.3), transparent)' }}
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
                            willChange: 'transform, opacity'
                        }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl"
                        style={{ background: 'radial-gradient(circle, rgba(6, 91, 152, 0.2), transparent)' }}
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
                            willChange: 'transform, opacity'
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

            {/* CTA Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#065B98] to-[#1B7FDC] text-white overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHJlY3Qgd2lkdGg9IjUwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ3aGl0ZSIgb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center">
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            Ready to Protect Your Art?
                        </motion.h2>

                        <motion.p
                            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-100"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Join thousands of artists who trust Auroraa Protect to safeguard their creative work.
                        </motion.p>

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
                                Get Auroraa Protect Now
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </motion.div>

                        <motion.div
                            className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-200"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="flex items-center">
                                <Shield className="w-4 h-4 mr-2 text-[#0DB8D3]" />
                                <span>No credit card required</span>
                            </div>
                            <div className="hidden sm:block w-px h-4 bg-white/30"></div>
                            <div className="flex items-center">
                                <Sparkles className="w-4 h-4 mr-2 text-[#0DB8D3]" />
                                <span>Free forever for basic protection</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Auroraa Exists */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#0f2533]" id='mission'>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxQjdGREMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00em0tMiAwYzAgMS4xMDQtLjg5NiAyLTIgMnMtMi0uODk2LTItMiAuODk2LTIgMi0yIDIgLjg5NiAyIDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
                <div className="max-w-6xl mx-auto relative">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12"
                    >
                        <div className="text-center max-w-3xl mx-auto">
                            <motion.span
                                className="inline-flex items-center px-4 py-2 rounded-full bg-[#1B7FDC]/20 text-[#0DB8D3] text-sm font-medium mb-6 border border-[#1B7FDC]/30"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <Shield className="w-4 h-4 mr-2" />
                                Our Mission
                            </motion.span>

                            <motion.h2
                                className="text-4xl md:text-5xl font-bold text-center text-white mb-8 leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                Why Auroraa exists
                            </motion.h2>

                            <motion.p
                                className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                We're here to change the way artists are treated in the digital world
                            </motion.p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: <Lock className="w-8 h-8 text-[#0DB8D3]" />,
                                    title: "Protection First",
                                    description: "We put artist protection at the core of everything we build, not as an afterthought."
                                },
                                {
                                    icon: <Users className="w-8 h-8 text-[#1B7FDC]" />,
                                    title: "Community Power",
                                    description: "Together, we're stronger. Join a community that values and protects your creative work."
                                },
                                {
                                    icon: <Palette className="w-8 h-8 text-[#0DB8D3]" />,
                                    title: "Creative Freedom",
                                    description: "Focus on what you do best—create—while we handle the protection part."
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-[#193546]/80 backdrop-blur-sm p-8 rounded-2xl border border-[#1B7FDC]/20 hover:border-[#0DB8D3]/40 shadow-lg hover:shadow-[0_8px_30px_rgba(13,184,211,0.2)] transition-all duration-300 hover:-translate-y-1"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                >
                                    <div className="w-14 h-14 rounded-xl bg-[#065B98]/20 border border-[#1B7FDC]/30 flex items-center justify-center mb-6">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Who We're Building For */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#193546] relative overflow-hidden" id='community'>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxQjdGREMiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMi4yMDktMS43OTEtNC00LTRzLTQgMS43OTEtNCA0IDEuNzkxIDQgNCA0IDQtMS43OTEgNC00em0tMiAwYzAgMS4xMDQtLjg5NiAyLTIgMnMtMi0uODk2LTItMiAuODk2LTIgMi0yIDIgLjg5NiAyIDJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
                <div className="max-w-6xl mx-auto relative">
                    <div className="text-center mb-16">
                        <motion.span
                            className="inline-flex items-center px-4 py-2 rounded-full bg-[#1B7FDC]/20 text-[#0DB8D3] text-sm font-medium mb-6 border border-[#1B7FDC]/30"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Users className="w-4 h-4 mr-2" />
                            Our Community
                        </motion.span>

                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-center text-white mb-6 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            Who Auroraa is for
                        </motion.h2>

                        <motion.p
                            className="text-xl text-gray-300 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            We're building Auroraa for every type of creative mind
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {[
                            {
                                title: 'Independent Artists',
                                description: 'Take control of your creative career with tools designed for the independent spirit.',
                                icon: <Palette className="w-6 h-6 text-[#0DB8D3]" />
                            },
                            {
                                title: 'Digital Creators',
                                description: 'Protect your digital art and content in an increasingly copy-paste world.',
                                icon: <svg className="w-6 h-6 text-[#1B7FDC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            },
                            {
                                title: 'Traditional Artists',
                                description: 'Bridge the gap between physical and digital while keeping your work protected.',
                                icon: <svg className="w-6 h-6 text-[#0DB8D3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                </svg>
                            },
                            {
                                title: 'Illustrators',
                                description: 'Keep your illustrations safe while sharing your unique vision with the world.',
                                icon: <svg className="w-6 h-6 text-[#1B7FDC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            },
                            {
                                title: 'Painters',
                                description: 'From canvas to digital, ensure your paintings stay uniquely yours.',
                                icon: <svg className="w-6 h-6 text-[#0DB8D3]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.486M7 17h.01"></path>
                                </svg>
                            },
                            {
                                title: 'Makers & Crafters',
                                description: 'Protect your unique designs and handmade creations in the digital marketplace.',
                                icon: <svg className="w-6 h-6 text-[#1B7FDC]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                </svg>
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="group bg-[#0f2533]/80 backdrop-blur-sm p-8 rounded-2xl border border-[#1B7FDC]/20 hover:border-[#0DB8D3]/40 shadow-lg hover:shadow-[0_8px_30px_rgba(13,184,211,0.2)] transition-all duration-300 hover:-translate-y-1"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * (index % 3) }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#065B98]/20 border border-[#1B7FDC]/30 flex items-center justify-center mb-6 group-hover:bg-[#065B98]/30 transition-colors">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{item.description}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="mt-20 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <p className="text-2xl md:text-3xl font-bold text-white mb-8">
                            If you create, you belong here.
                        </p>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-[0_12px_40px_rgba(13,184,211,0.35)] hover:scale-105 transition-all ease-in-out cursor-pointer"
                        >
                            <span>Join Our Community</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-[#065B98] via-[#1B7FDC] to-[#0DB8D3]">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0yIDBjMCAxLjEwNC0uODk2IDItMiAycy0yLS44OTYtMi0yIC44OTYtMiAyLTIgMiAuODk2IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent"></div>
                    <div className="absolute -right-1/4 -top-1/4 w-1/2 h-full bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
                </div>

                <div className="max-w-5xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <motion.div
                            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-8 border border-white/20"
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 10, -10, 0]
                            }}
                            transition={{
                                duration: 8,
                                repeat: Infinity,
                                repeatType: 'reverse',
                                ease: 'easeInOut'
                            }}
                        >
                            <Sparkles className="w-8 h-8 text-white" />
                        </motion.div>

                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                            Be part of the Auroraa
                        </h2>

                        <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
                            Join thousands of artists who are taking control of their creative future.
                            Be among the first to experience the next chapter of digital art protection.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="group inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white text-[#065B98] text-lg font-semibold rounded-lg shadow-lg hover:shadow-[0_12px_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all ease-in-out cursor-pointer"
                            >
                                <span>Join for Free</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f2533] to-transparent"></div>
            </section>

            {/* Footer */}
            <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#0f2533] border-t border-[#1B7FDC]/20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <Link to='/' className="text-2xl font-bold logo-font bg-gradient-to-r from-[#1B7FDC] via-[#0DB8D3] to-[#1B7FDC] bg-clip-text text-transparent">
                                Auroraa
                            </Link>
                            <p className="text-gray-400 mb-6 mt-3">Empowering artists in the digital age with protection-first technology.</p>
                            <div className="flex space-x-4">
                                <div className="flex items-center gap-3">
                                    <a
                                        href="https://instagram.com/auroraadotin"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Auroraa on Instagram"
                                        className="inline-flex items-center justify-center rounded-full bg-[#1B7FDC]/20 text-[#0DB8D3] hover:bg-[#1B7FDC]/30 border border-[#1B7FDC]/30 w-9 h-9 transition-all"
                                    >
                                        <Instagram className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="https://www.facebook.com/auroraa.a.social.marketplace.for.art.a"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Auroraa on Facebook"
                                        className="inline-flex items-center justify-center rounded-full bg-[#1B7FDC]/20 text-[#0DB8D3] hover:bg-[#1B7FDC]/30 border border-[#1B7FDC]/30 w-9 h-9 transition-all"
                                    >
                                        <Facebook className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="https://youtube.com/@AuroraaCommunity"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Auroraa on YouTube"
                                        className="inline-flex items-center justify-center rounded-full bg-[#1B7FDC]/20 text-[#0DB8D3] hover:bg-[#1B7FDC]/30 border border-[#1B7FDC]/30 w-9 h-9 transition-all"
                                    >
                                        <Youtube className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link to={Routes.ProtectPage} className="text-gray-400 hover:text-[#0DB8D3] transition-colors">Auroraa Protect</Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
                            <ul className="space-y-3">
                                <li >
                                    <Link to={`/${Routes.PrivacyPolicyPage}`} className="text-gray-400 hover:text-[#0DB8D3] transition-colors">Privacy</Link>
                                </li>
                                <li>
                                    <Link to={`/${Routes.TermsAndConditionsPage}`} className="text-gray-400 hover:text-[#0DB8D3] transition-colors">Terms</Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-[#1B7FDC]/20 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-400 mb-4 md:mb-0">
                            © {new Date().getFullYear()} Auroraa All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link to={`/${Routes.PrivacyPolicyPage}`} className="text-sm text-gray-400 hover:text-gray-300">Privacy Policy</Link>
                            <Link to={`/${Routes.TermsAndConditionsPage}`} className="text-sm text-gray-400 hover:text-gray-300">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default AuroraaPage;