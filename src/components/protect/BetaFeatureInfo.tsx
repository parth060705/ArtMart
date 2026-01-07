import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, AlertCircle } from 'lucide-react';

const BetaFeatureInfo = () => {
    return (
        <section className="py-24 bg-[#0A0A0B] relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#1B7FDC]/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-[#0f1115]/80 backdrop-blur-2xl border border-white/10 rounded-2xl p-10 shadow-2xl overflow-hidden relative group"
                >
                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
                        <div className="flex items-center gap-4">
                            <div className="px-4 py-1.5 bg-[#0DB8D3]/10 border border-[#0DB8D3]/30 rounded-full flex items-center gap-2">
                                <Sparkles className="w-3.5 h-3.5 text-[#0DB8D3] animate-pulse" />
                                <span className="text-xs font-bold tracking-wider text-[#0DB8D3] uppercase">Beta Feature</span>
                            </div>
                            {/* <span className="text-gray-400 text-sm">Currently available for early access users</span> */}
                        </div>

                        {/* Optional status indicator */}
                        <div className="flex items-center gap-2 text-sm text-green-400/80 bg-green-500/5 px-3 py-1 rounded-lg border border-green-500/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            System Operational
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                        {/* What this does */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0DB8D3]/10 border border-[#0DB8D3]/20 text-[#0DB8D3]">
                                    <Sparkles className="w-4 h-4" />
                                </span>
                                What this does
                            </h3>
                            <ul className="space-y-6">
                                {[
                                    { text: "Embeds invisible protection into your image", desc: "No visual noise, completely seamless." },
                                    { text: "Adds permanent ownership watermark", desc: "Your identity stays with the file." },
                                    { text: "Preserves original visual quality", desc: "100% fidelity to your original art." },
                                    { text: "Optimized for social media sharing", desc: "Survives compression algorithms." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#0DB8D3] shrink-0" />
                                        <div>
                                            <p className="text-gray-200 font-medium">{item.text}</p>
                                            <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* What this doesn't do */}
                        <div className="relative">
                            {/* Vertical divider on desktop */}
                            <div className="hidden md:block absolute -left-6 lg:-left-10 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1B7FDC]/10 border border-[#1B7FDC]/20 text-[#1B7FDC]">
                                    <AlertCircle className="w-4 h-4" />
                                </span>
                                Limitations
                            </h3>
                            <ul className="space-y-6">
                                {[
                                    { text: "Does not add visible watermarks", desc: "Unless you explicitly choose to overlay one." },
                                    { text: "Does not prevent screenshots", desc: "Screen capture technology bypasses file-level protection." },
                                    { text: "Does not block 100% of all AI scrapers", desc: "We are constantly updating to fight new models." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-[#1B7FDC] shrink-0" />
                                        <div>
                                            <p className="text-gray-200 font-medium">{item.text}</p>
                                            <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BetaFeatureInfo;
