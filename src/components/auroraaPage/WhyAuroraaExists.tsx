import React from 'react'
import { motion } from 'framer-motion';
import { Check, ArrowRight, ChevronDown, Sparkles, Shield, Lock, Users, Palette, Smile, Heart, Star, Instagram, Facebook, Youtube } from 'lucide-react';

const WhyAuroraaExists = () => {
    return (
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
    )
}

export default WhyAuroraaExists
