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
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-amber-50 to-purple-100 text-gray-900 font-sans overflow-x-hidden">
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
                            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <SuccessMessage email={email} />
                            <div className="p-4 border-t border-gray-100 flex justify-end">
                                <button
                                    onClick={() => setShowSuccessPopup(false)}
                                    className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
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
                        className="absolute rounded-full bg-purple-200/20"
                        style={{
                            width: Math.random() * 400 + 100 + 'px',
                            height: Math.random() * 400 + 100 + 'px',
                            left: Math.random() * 100 + '%',
                            top: Math.random() * 100 + '%',
                            filter: 'blur(60px)'
                        }}
                        animate={{
                            x: [0, Math.random() * 200 - 100, 0],
                            y: [0, Math.random() * 200 - 100, 0],
                            opacity: [0.2, 0.4, 0.2],
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
                {/* Aurora Background Effects - Optimized for mobile */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl"
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
                        className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl"
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
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-3xl"
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
                            {/* <motion.div
                                className="inline-flex items-center space-x-3 mb-6 px-6 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-aurora"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Sparkles className="w-5 h-5 text-amber-500" />
                                <span className="text-sm font-medium text-purple-800">Join {waitlistCount.toLocaleString()}+ artists already with us</span>
                            </motion.div> */}

                            <motion.h1
                                variants={fadeInUp}
                                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-900 via-purple-700 to-amber-600 mb-6 leading-tight"
                            >
                                Built for artists.
                                <br />
                                <motion.span
                                    className="text-amber-600"
                                    animate={{
                                        textShadow: [
                                            '0 0 0px rgba(217, 119, 6, 0)',
                                            '0 0 20px rgba(245, 158, 11, 0.5)',
                                            '0 0 0px rgba(217, 119, 6, 0)'
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
                                className="text-xl sm:text-2xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed"
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
                                    className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-amber-400 rounded-xl opacity-30 blur"
                                    animate={{
                                        opacity: [0.2, 0.4, 0.2],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        repeatType: 'reverse',
                                    }}
                                />
                                <div className="relative bg-white/80 backdrop-blur-sm p-1 rounded-xl shadow-xl">
                                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 w-full">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Your email address"
                                            className="flex-1 px-6 py-4 bg-white/90 border border-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-gray-900 placeholder-gray-500 transition-all shadow-inner"
                                            required
                                        />
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="group inline-flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-lg font-semibold rounded-lg shadow-aurora-strong hover:shadow-[0_12px_40px_rgba(245,158,11,0.35)] hover:scale-[1.02] transition-all ease-in-out cursor-pointer"
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
                                                    {/* <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /> */}
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <p className="text-sm text-[#6B7280] mt-4 flex items-center justify-center space-x-2">
                                <Shield className="w-4 h-4 text-purple-500" />
                                <span>Your email is safe with us. No spam, ever.</span>
                            </p>
                        </motion.div>

                        {/*  <motion.div
                            className="flex items-center justify-center space-x-4 pt-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="w-10 h-10 rounded-full bg-white border-2 border-white shadow-md"
                                        style={{
                                            backgroundImage: `url(https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg)`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            zIndex: 5 - i,
                                        }}
                                    />
                                ))}
                            </div>
                             <div className="text-left">
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                                    ))}
                                </div>
                                <p className="text-sm font-medium text-gray-700">Trusted by {waitlistCount.toLocaleString()}+ artists worldwide</p>
                            </div> 
                        </motion.div> */}
                    </motion.div>
                </div>

                <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="text-purple-900/40"
                    >
                        <ChevronDown size={32} />
                    </motion.div>
                </div>

                {/* Floating decorative elements */}
                <AnimatePresence>
                    {isVisible && (
                        <>
                            <motion.div
                                className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-200/30 rounded-full blur-2xl"
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
                                className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-amber-200/20 rounded-full blur-2xl"
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
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-600 to-amber-500 text-white overflow-hidden">
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
                            className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
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
                                className="px-8 py-4 bg-white text-purple-700 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center"
                            >
                                Get Auroraa Protect Now
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </motion.div>

                        <motion.div
                            className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/80"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="flex items-center">
                                <Shield className="w-4 h-4 mr-2 text-amber-300" />
                                <span>No credit card required</span>
                            </div>
                            <div className="hidden sm:block w-px h-4 bg-white/30"></div>
                            <div className="flex items-center">
                                <Sparkles className="w-4 h-4 mr-2 text-amber-300" />
                                <span>Free forever for basic protection</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Auroraa Exists */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id='mission'>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlYmViZWIiIGZpbGwtb3BhY2l0eT0iMC42Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0yIDBjMCAxLjEwNC0uODk2IDItMiAycy0yLS44OTYtMi0yIC44OTYtMiAyLTIgMiAuODk2IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
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
                                className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-6"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                <Shield className="w-4 h-4 mr-2" />
                                Our Mission
                            </motion.span>

                            <motion.h2
                                className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-8 leading-tight"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                Why Auroraa exists
                            </motion.h2>

                            <motion.p
                                className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
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
                                    icon: <Lock className="w-8 h-8 text-purple-600" />,
                                    title: "Protection First",
                                    description: "We put artist protection at the core of everything we build, not as an afterthought."
                                },
                                {
                                    icon: <Users className="w-8 h-8 text-amber-600" />,
                                    title: "Community Power",
                                    description: "Together, we're stronger. Join a community that values and protects your creative work."
                                },
                                {
                                    icon: <Palette className="w-8 h-8 text-purple-600" />,
                                    title: "Creative Freedom",
                                    description: "Focus on what you do best—create—while we handle the protection part."
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-aurora hover:shadow-aurora-strong transition-all duration-300 hover:-translate-y-1"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (index * 0.1) }}
                                >
                                    <div className="w-14 h-14 rounded-xl bg-purple-50 flex items-center justify-center mb-6">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* <motion.div
                            className="mt-16 bg-gradient-to-r from-purple-50 to-amber-50 rounded-2xl p-8 md:p-12 relative overflow-hidden"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl"></div>
                            <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl"></div>

                            <div className="relative z-10 max-w-3xl mx-auto text-center">
                                <Smile className="w-12 h-12 text-amber-500 mx-auto mb-6" />
                                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                                    Join the movement of artists taking back control
                                </h3>
                                <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
                                    Be part of a community that values and protects your creative work. Together, we can build a better future for artists everywhere.
                                </p>
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-amber-500 text-white text-lg font-semibold rounded-lg shadow-aurora-strong hover:shadow-[0_12px_40px_rgba(124,58,237,0.25)] hover:scale-105 transition-all ease-in-out cursor-pointer"
                                >
                                    <span>Join Auroraa</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div> */}
                    </motion.div>
                </div>
            </section>

            {/* Our Commitment    can delete this */}
            {/* <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlYmViZWIiIGZpbGwtb3BhY2l0eT0iMC42Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0yIDBjMCAxLjEwNC0uODk2IDItMiAycy0yLS44OTYtMi0yIC44OTYtMiAyLTIgMiAuODk2IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
                <div className="max-w-6xl mx-auto relative">
                    <div className="text-center mb-16">
                        <motion.span
                            className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Shield className="w-4 h-4 mr-2" />
                            Our Commitment
                        </motion.span>

                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            We're building Auroraa differently
                        </motion.h2>

                        <motion.p
                            className="text-xl text-gray-600 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            Our core principles guide everything we do at Auroraa
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: <Lock className="w-6 h-6 text-purple-600" />,
                                title: "Protection-First",
                                description: "We build with artist protection as our top priority, not an afterthought.",
                                color: "purple"
                            },
                            {
                                icon: <Users className="w-6 h-6 text-amber-600" />,
                                title: "Artist Control",
                                description: "Your work, your rules. Complete control over your creative assets.",
                                color: "amber"
                            },
                            {
                                icon: <Shield className="w-6 h-6 text-purple-600" />,
                                title: "Transparent Practices",
                                description: "No hidden terms. We're building in the open, with artists at every step.",
                                color: "purple"
                            },
                            {
                                icon: <Heart className="w-6 h-6 text-amber-600" />,
                                title: "Community Focused",
                                description: "We're not just building for artists, we're building with them.",
                                color: "amber"
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className={`group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-aurora hover:shadow-aurora-strong transition-all duration-300 hover:-translate-y-1 border-l-4 ${item.color === 'purple' ? 'border-purple-500' : 'border-amber-500'
                                    }`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 + (index * 0.1) }}
                            >
                                <div className={`w-12 h-12 rounded-xl ${item.color === 'purple' ? 'bg-purple-50' : 'bg-amber-50'
                                    } flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>

                                <div className="mt-6 pt-6 border-t border-gray-100 flex items-center">
                                    <span className={`text-sm font-medium ${item.color === 'purple' ? 'text-purple-600' : 'text-amber-600'
                                        }`}>
                                        Learn more →
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="mt-20 bg-gradient-to-r from-purple-600 to-amber-500 rounded-2xl p-8 md:p-12 relative overflow-hidden"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0yIDBjMCAxLjEwNC0uODk2IDItMiAycy0yLS44OTYtMi0yIC44OTYtMiAyLTIgMiAuODk2IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

                        <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                                <Sparkles className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-6">
                                Ready to protect your creative work?
                            </h3>
                            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                                Join thousands of artists who trust Auroraa to safeguard their creations in the digital age.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="group inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-lg shadow-aurora-strong hover:shadow-[0_12px_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all ease-in-out cursor-pointer"
                                >
                                    <span>Get Started</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="group inline-flex items-center justify-center space-x-2 px-8 py-4 bg-transparent border-2 border-white/20 text-white text-lg font-semibold rounded-lg hover:bg-white/10 transition-all ease-in-out cursor-pointer">
                                    <span>Learn More</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section> */}

            {/* Who We're Building For */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden" id='community'>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlYmViZWIiIGZpbGwtb3BhY2l0eT0iMC42Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0yIDBjMCAxLjEwNC0uODk2IDItMiAycy0yLS44OTYtMi0yIC44OTYtMiAyLTIgMiAuODk2IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
                <div className="max-w-6xl mx-auto relative">
                    <div className="text-center mb-16">
                        <motion.span
                            className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Users className="w-4 h-4 mr-2" />
                            Our Community
                        </motion.span>

                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            Who Auroraa is for
                        </motion.h2>

                        <motion.p
                            className="text-xl text-gray-600 max-w-2xl mx-auto"
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
                                icon: <Palette className="w-6 h-6 text-purple-600" />
                            },
                            {
                                title: 'Digital Creators',
                                description: 'Protect your digital art and content in an increasingly copy-paste world.',
                                icon: <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                </svg>
                            },
                            {
                                title: 'Traditional Artists',
                                description: 'Bridge the gap between physical and digital while keeping your work protected.',
                                icon: <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                                </svg>
                            },
                            {
                                title: 'Illustrators',
                                description: 'Keep your illustrations safe while sharing your unique vision with the world.',
                                icon: <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            },
                            {
                                title: 'Painters',
                                description: 'From canvas to digital, ensure your paintings stay uniquely yours.',
                                icon: <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.486M7 17h.01"></path>
                                </svg>
                            },
                            {
                                title: 'Makers & Crafters',
                                description: 'Protect your unique designs and handmade creations in the digital marketplace.',
                                icon: <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                                </svg>
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="group bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-aurora hover:shadow-aurora-strong transition-all duration-300 hover:-translate-y-1 border-t-4 border-purple-500/0 hover:border-purple-500"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * (index % 3) }}
                            >
                                <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center mb-6 group-hover:bg-purple-100 transition-colors">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.description}</p>
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
                        <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                            If you create, you belong here.
                        </p>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-amber-500 text-white text-lg font-semibold rounded-lg shadow-aurora-strong hover:shadow-[0_12px_40px_rgba(124,58,237,0.25)] hover:scale-105 transition-all ease-in-out cursor-pointer"
                        >
                            <span>Join Our Community</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* What We Believe */}
            {/* <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-amber-50 to-purple-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlYmViZWIiIGZpbGwtb3BhY2l0eT0iMC42Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0yIDBjMCAxLjEwNC0uODk2IDItMiAycy0yLS44OTYtMi0yIC44OTYtMiAyLTIgMiAuODk2IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
                <div className="max-w-4xl mx-auto relative">
                    <div className="text-center mb-16">
                        <motion.span
                            className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-6"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <Heart className="w-4 h-4 mr-2" />
                            Our Values
                        </motion.span>

                        <motion.h2
                            className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            What we stand for
                        </motion.h2>

                        <motion.p
                            className="text-xl text-gray-600 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                        >
                            Our core principles that guide everything we do
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-aurora">
                        {[
                            {
                                title: "Artists First",
                                description: "We believe artists should have complete control over how their work is used and shared.",
                                icon: <Palette className="w-5 h-5 text-purple-600" />
                            },
                            {
                                title: "Respect & Protection",
                                description: "Creative work deserves both respect and robust protection in the digital age.",
                                icon: <Shield className="w-5 h-5 text-amber-600" />
                            },
                            {
                                title: "Community Power",
                                description: "We believe in the power of community to uplift and protect artists collectively.",
                                icon: <Users className="w-5 h-5 text-purple-600" />
                            },
                            {
                                title: "Technology as a Tool",
                                description: "Technology should serve artists, not exploit or replace them.",
                                icon: <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start gap-4 p-6 rounded-xl hover:bg-white/50 transition-colors group"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * (index % 2) }}
                            >
                                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <p className="text-gray-600">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="mt-16 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <p className="text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
                            "At Auroraa, we're not just building tools—we're building a movement that puts artists back in control of their creative destiny."
                        </p>
                        <div className="flex items-center justify-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-amber-500"></div>
                            <div className="text-left">
                                <p className="font-medium text-gray-900">Alex Rivera</p>
                                <p className="text-sm text-gray-600">Founder & CEO, Auroraa</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section> */}

            {/* The Future */}
            {/* <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlYmViZWIiIGZpbGwtb3BhY2l0eT0iMC42Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0yIDBjMCAxLjEwNC0uODk2IDItMiAycy0yLS44OTYtMi0yIC44OTYtMiAyLTIgMiAuODk2IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
                <div className="max-w-6xl mx-auto relative">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            className="space-y-8"
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div>
                                <motion.span
                                    className="inline-flex items-center px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-6"
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                    The Future
                                </motion.span>

                                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    Building for the long term
                                </h2>

                                <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-amber-500 rounded-full mb-8"></div>
                            </div>

                            <div className="space-y-6 text-lg text-gray-700">
                                <p>
                                    Auroraa is starting as a community and will grow into an ecosystem — including protection-focused
                                    technology — that helps artists connect, collaborate, and build sustainable creative lives,
                                    without compromising ownership or trust.
                                </p>
                                <p>
                                    We're in this for the long haul, building the foundation for a better creative future, one
                                    that respects and rewards artistic work in the digital age.
                                </p>
                            </div>

                            <div className="pt-4">
                                <button
                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                    className="group inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-amber-500 text-white text-lg font-semibold rounded-lg shadow-aurora-strong hover:shadow-[0_12px_40px_rgba(124,58,237,0.25)] hover:scale-105 transition-all ease-in-out cursor-pointer"
                                >
                                    <span>Join the Movement</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>

                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="relative z-10 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-aurora-strong border border-gray-100">
                                <div className="space-y-6">
                                    {[
                                        {
                                            title: "Community First",
                                            description: "Building a supportive network of artists who uplift each other.",
                                            progress: 90
                                        },
                                        {
                                            title: "Protection Tools",
                                            description: "Developing robust solutions to safeguard creative work.",
                                            progress: 75
                                        },
                                        {
                                            title: "Marketplace",
                                            description: "Creating fair platforms for artists to showcase and sell their work.",
                                            progress: 60
                                        },
                                        {
                                            title: "Education",
                                            description: "Empowering artists with knowledge about their rights and tools.",
                                            progress: 45
                                        }
                                    ].map((item, index) => (
                                        <div key={index} className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-medium text-gray-900">{item.title}</h4>
                                                <span className="text-sm font-medium text-purple-600">{item.progress}%</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2.5">
                                                <motion.div
                                                    className="h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-amber-500"
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${item.progress}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.1 * index }}
                                                />
                                            </div>
                                            <p className="text-sm text-gray-600">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="absolute -z-10 -inset-4">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-amber-500/10 rounded-3xl blur-xl"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-amber-500/5 rounded-3xl"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section> */}

            {/* Final CTA */}
            <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-amber-500">
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
                            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-8"
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
                                className="group inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white text-gray-900 text-lg font-semibold rounded-lg shadow-aurora-strong hover:shadow-[0_12px_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all ease-in-out cursor-pointer"
                            >
                                <span>Join for Free</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            {/* <button className="group inline-flex items-center justify-center space-x-2 px-8 py-4 bg-transparent border-2 border-white/20 text-white text-lg font-semibold rounded-lg hover:bg-white/10 transition-all ease-in-out cursor-pointer">
                                <span>Learn More</span>
                            </button> */}
                        </div>

                        {/* <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/80 text-sm">
                            <div className="flex items-center">
                                <div className="flex -space-x-2 mr-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="w-8 h-8 rounded-full border-2 border-white bg-cover bg-center"
                                            style={{
                                                backgroundImage: `url(https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 50)}.jpg)`,
                                                zIndex: 5 - i,
                                            }}
                                        />
                                    ))}
                                </div>
                                <span>Join {waitlistCount.toLocaleString()}+ artists</span>
                            </div>

                            <div className="hidden sm:block w-px h-6 bg-white/30"></div>

                            <div className="flex items-center">
                                <div className="flex items-center mr-3">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <svg key={i} className="w-4 h-4 text-amber-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                        </svg>
                                    ))}
                                </div>
                                <span>Rated 4.9/5 by artists</span>
                            </div>
                        </div> */}
                    </motion.div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
            </section>

            {/* Footer */}
            <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <Link to='/' className="text-2xl font-bold logo-font bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                                Auroraa
                            </Link>
                            <p className="text-gray-600 mb-6">Empowering artists in the digital age with protection-first technology.</p>
                            <div className="flex space-x-4">
                                {/* {['twitter', 'instagram', 'discord', 'github'].map((social) => (
                                    <a
                                        key={social}
                                        href="#"
                                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-purple-600 hover:shadow-aurora transition-all"
                                        aria-label={social}
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                                        </svg>
                                    </a>
                                ))} */}
                                <div className="mt-4 flex items-center gap-3">
                                    <a
                                        href="https://instagram.com/auroraadotin"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Auroraa on Instagram"
                                        className="inline-flex items-center justify-center rounded-full bg-accent/15 text-foreground hover:bg-accent/25 ring-1 ring-accent/30 w-9 h-9"
                                    >
                                        <Instagram className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="https://www.facebook.com/auroraa.a.social.marketplace.for.art.a"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Auroraa on Facebook"
                                        className="inline-flex items-center justify-center rounded-full bg-accent/15 text-foreground hover:bg-accent/25 ring-1 ring-accent/30 w-9 h-9"
                                    >
                                        <Facebook className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="https://youtube.com/@AuroraaCommunity"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Auroraa on YouTube"
                                        className="inline-flex items-center justify-center rounded-full bg-accent/15 text-foreground hover:bg-accent/25 ring-1 ring-accent/30 w-9 h-9"
                                    >
                                        <Youtube className="w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Product</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link to={Routes.ProtectPage} className="text-gray-600 hover:text-purple-600 transition-colors">Auroraa Protect</Link>
                                </li>
                            </ul>
                        </div>

                        {/* <div>
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Company</h3>
                            <ul className="space-y-3">
                                {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div> */}

                        <div>
                            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Legal</h3>
                            <ul className="space-y-3">
                                <li >
                                    <Link to={`/${Routes.PrivacyPolicyPage}`} className="text-gray-600 hover:text-purple-600 transition-colors">Privacy</Link>
                                </li>
                                <li>
                                    <Link to={`/${Routes.TermsAndConditionsPage}`} className="text-gray-600 hover:text-purple-600 transition-colors">Terms</Link>
                                </li>
                                <li>
                                    {/* <Link to={`/${Routes.PrivacyPolicyPage}`} className="text-gray-600 hover:text-purple-600 transition-colors">GDPR</Link> */}
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-sm text-gray-500 mb-4 md:mb-0">
                            © {new Date().getFullYear()} Auroraa All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <Link to={`/${Routes.PrivacyPolicyPage}`} className="text-sm text-gray-500 hover:text-gray-700">Privacy Policy</Link>
                            <Link to={`/${Routes.TermsAndConditionsPage}`} className="text-sm text-gray-500 hover:text-gray-700">Terms of Service</Link>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            </div>
        </div>
        </>
    );
};

export default AuroraaPage;