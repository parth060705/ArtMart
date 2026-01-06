import React from 'react'
import { Upload, Shield, Lock, Cloud, FileText, Key, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturedSection = () => {
    const features = [
        {
            icon: <Shield className="w-10 h-10 text-[#0DB8D3]" />,
            title: 'AI-Untrainable Protection',
            description: 'Your artwork is processed so AI models cannot learn or replicate your style.'
        },
        {
            icon: <Shield className="w-10 h-10 text-[#0DB8D3]" />,
            title: 'No Ugly Watermarks',
            description: 'Protection is embedded invisibly — your artwork looks untouched to the human eye.'
        },
        {
            icon: <Lock className="w-10 h-10 text-[#1B7FDC]" />,
            title: 'Visually Identical Output',
            description: 'The protected image looks the same to humans — no visible distortion or quality loss.'
        },
        {
            icon: <Cloud className="w-10 h-10 text-[#0DB8D3]" />,
            title: 'One-Click Upload & Download',
            description: 'Upload your image, wait a few seconds, and download the protected version instantly.'
        },
        {
            icon: <FileText className="w-10 h-10 text-[#1B7FDC]" />,
            title: 'Style-Theft Prevention',
            description: 'Blocks AI systems from extracting style patterns used for cloning or imitation.'
        },
        {
            icon: <Key className="w-10 h-10 text-[#0DB8D3]" />,
            title: 'Privacy-First Processing',
            description: 'Files are processed securely and not stored after protection is applied.'
        },
        {
            icon: <Clock className="w-10 h-10 text-[#1B7FDC]" />,
            title: 'Share-Safe for Social Platforms',
            description: 'The protected image can be posted, shared, or printed while remaining resistant to AI training.'
        }
    ]
    return (
        <section id="features" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0f2533]">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white mb-6">Powerful Protection for Creators</h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Auroraa Protect offers comprehensive security features designed specifically for artists and creators.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-[#193546]/80 backdrop-blur-sm p-8 rounded-2xl border border-[#1B7FDC]/20 hover:border-[#0DB8D3]/40 shadow-lg hover:shadow-[0_8px_30px_rgba(13,184,211,0.2)] transition-all"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#065B98]/20 border border-[#1B7FDC]/30 mb-6">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-300">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FeaturedSection
