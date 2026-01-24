import React from 'react'
import { Link } from 'react-router-dom';
import { Upload, Shield, Lock, Cloud, FileText, Key, Clock, Zap, Eye, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturedSection = () => {
    const features = [
        {
            icon: <Shield className="w-6 h-6 text-[#0DB8D3]" />,
            title: 'AI-Untrainable Protection',
            description: 'Your image is digitally altered at a pixel level so AI models cannot effectively learn or replicate your style.',
            glowColor: 'group-hover:shadow-[0_0_30px_-5px_rgba(13,184,211,0.3)]'
        },
        {
            icon: <Eye className="w-6 h-6 text-[#1B7FDC]" />,
            title: 'Invisible to Humans',
            description: 'Protection is embedded invisibly. Your audience sees your image exactly as you intended, with zero visual distortion.',
            glowColor: 'group-hover:shadow-[0_0_30px_-5px_rgba(27,127,220,0.3)]'
        },
        {
            icon: <CheckCircle2 className="w-6 h-6 text-[#0DB8D3]" />,
            title: 'Visually Identical Output',
            description: 'The protected image maintains professional quality. No grain, no noise, just security.',
            glowColor: 'group-hover:shadow-[0_0_30px_-5px_rgba(13,184,211,0.3)]'
        },
        {
            icon: <Zap className="w-6 h-6 text-[#1B7FDC]" />,
            title: 'Instant Processing',
            description: 'Drag, drop, and done. Our cloud infrastructure processes your high-res files in seconds.',
            glowColor: 'group-hover:shadow-[0_0_30px_-5px_rgba(27,127,220,0.3)]'
        },
        {
            icon: <FileText className="w-6 h-6 text-[#0DB8D3]" />,
            title: 'Style-Theft Prevention',
            description: 'Specifically targets the patterns AI look for, effectively blocking style transfer algorithms.',
            glowColor: 'group-hover:shadow-[0_0_30px_-5px_rgba(13,184,211,0.3)]'
        },
        {
            icon: <Key className="w-6 h-6 text-[#1B7FDC]" />,
            title: 'Privacy-First Architecture',
            description: 'We don\'t train on your work. Files are processed securely and discarded immediately after download.',
            glowColor: 'group-hover:shadow-[0_0_30px_-5px_rgba(27,127,220,0.3)]'
        },
    ]

    return (
        <section id="features" className="relative py-32 px-4 sm:px-6 lg:px-8 bg-[#0A0A0B] overflow-hidden">

            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#1B7FDC]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0DB8D3]/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-gray-300 mb-6"
                    >
                        Why Choose Auroraa
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                    >
                        Powerful Protection <br className="hidden sm:block" /> for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3]">Creators</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                    >
                        Auroraa Protect offers comprehensive security features designed for protecting digital assets (images only for now).
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className={`group bg-[#0f1115]/50 backdrop-blur-xl p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 ${feature.glowColor}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 mb-6 group-hover:scale-110 transition-transform duration-300">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#0DB8D3] transition-colors">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturedSection
