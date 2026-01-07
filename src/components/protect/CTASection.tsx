import React from 'react'
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Routes } from '@/lib/routes';

const CTASection = () => {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0B] overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-20"></div>

            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1B7FDC]/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0DB8D3]/50 to-transparent"></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#1B7FDC]/20 to-[#0DB8D3]/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#0DB8D3] text-sm font-medium mb-8">
                        <Sparkles className="w-4 h-4" />
                        <span>Limited Time Early Access</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                        Ready to Secure Your Art?
                    </h2>

                    <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join the waitlist to get early access to Auroraa Protect and be the first to know when we launch new features.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="#hero-section"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' });
                                // Also try scrolling to top if hero-section logic handles it
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            className="group relative px-8 py-4 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition-all duration-300 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_-10px_rgba(255,255,255,0.5)] overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Join Waitlist
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default CTASection
