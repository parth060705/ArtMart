import React from 'react'
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Routes } from '@/lib/routes';

const FinalCTA = () => {
    return (
        <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0A0A0B]">

            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000000]"></div>

            {/* Glowing Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#1B7FDC]/20 via-[#0DB8D3]/20 to-[#1B7FDC]/20 blur-[130px] rounded-full pointer-events-none opacity-60 animate-pulse"></div>

            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/20 mb-8 backdrop-blur-md shadow-2xl">
                        <Sparkles className="w-10 h-10 text-white" />
                    </div>

                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 tracking-tighter leading-none">
                        Be part of the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3]">Auroraa</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-light">
                        Join people who are taking control of their digital assets.
                    </p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center mt-16 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Link
                            to={`/${Routes.ProtectPage}`}
                            className="group inline-flex items-center space-x-2 px-8 py-4 bg-white text-black text-lg font-bold rounded-xl shadow-[0_0_20px_-5px_rgba(255,255,255,0.5)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.6)] hover:scale-105 transition-all ease-in-out cursor-pointer"
                        >
                            Try Auroraa Protect Now
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* <p className="mt-6 text-sm text-gray-500">
                        Limited spots available for early access.
                    </p> */}
                </motion.div>
            </div>
        </section>
    )
}

export default FinalCTA
