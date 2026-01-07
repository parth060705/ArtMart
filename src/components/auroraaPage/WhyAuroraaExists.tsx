import React from 'react'
import { motion } from 'framer-motion';
import { Shield, Lock, Users, Palette, Sparkles } from 'lucide-react';

const WhyAuroraaExists = () => {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0B] relative overflow-hidden" id='mission'>

            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1B7FDC]/5 rounded-full blur-[100px] pointer-events-none translate-x-1/2 -translate-y-1/2" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B7FDC]/10 border border-[#1B7FDC]/20 text-[#1B7FDC] text-xs font-semibold uppercase tracking-wider mb-6"
                    >
                        <Shield className="w-3 h-3" />
                        Our Mission
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Why Auroraa Exists
                    </motion.h2>

                    <motion.p
                        className="text-xl text-gray-400 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        We're here to change the way artists are treated in the digital world.
                        Protection shouldn't be a luxury—it's a fundamental right.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <Lock className="w-6 h-6 text-[#0DB8D3]" />,
                            title: "Protection First",
                            description: "We put artist protection at the core of everything we build. It's not an afterthought—it's the foundation."
                        },
                        {
                            icon: <Users className="w-6 h-6 text-[#1B7FDC]" />,
                            title: "Community Power",
                            description: "Together, we're stronger. Join a collective voice that advocates for artist rights and fair treatment."
                        },
                        {
                            icon: <Palette className="w-6 h-6 text-[#0DB8D3]" />,
                            title: "Creative Freedom",
                            description: "Focus on what you do best—create—while we handle the complex security and protection measures."
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="group bg-[#0f1115]/50 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-2 hover:bg-[#0f1115]"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                        >
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                {item.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{item.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyAuroraaExists
