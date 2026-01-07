import React from 'react'
import { motion } from 'framer-motion';
import { ArrowRight, Users, Palette, Brush, Component, PenTool, Scissors } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Routes } from '@/lib/routes';

const WhyAuroraaExist = () => {
    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A0A0B] relative overflow-hidden" id='community'>

            {/* Background Texture */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-medium mb-6"
                    >
                        <Users className="w-4 h-4 text-[#0DB8D3]" />
                        Who We Are For
                    </motion.div>

                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-white mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        If you create, you belong here.
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-400 max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        We're building Auroraa for every type of creative mind, protecting the future of human expression.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            title: 'Independent Artists',
                            description: 'Take control of your creative career with tools designed for the independent spirit.',
                            icon: <Palette className="w-5 h-5 text-[#0DB8D3]" />
                        },
                        {
                            title: 'Digital Creators',
                            description: 'Protect your digital art and content in an increasingly copy-paste world.',
                            icon: <Component className="w-5 h-5 text-[#1B7FDC]" />
                        },
                        {
                            title: 'Traditional Artists',
                            description: 'Bridge the gap between physical and digital while keeping your work protected.',
                            icon: <Brush className="w-5 h-5 text-[#0DB8D3]" />
                        },
                        {
                            title: 'Illustrators',
                            description: 'Keep your illustrations safe while sharing your unique vision with the world.',
                            icon: <PenTool className="w-5 h-5 text-[#1B7FDC]" />
                        },
                        {
                            title: 'Painters',
                            description: 'From canvas to digital, ensure your paintings stay uniquely yours.',
                            icon: <Brush className="w-5 h-5 text-[#0DB8D3]" />
                        },
                        {
                            title: 'Makers & Crafters',
                            description: 'Protect your unique designs and handmade creations in the digital marketplace.',
                            icon: <Scissors className="w-5 h-5 text-[#1B7FDC]" />
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="group relative bg-[#0f1115] hover:bg-[#14161B] p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-all duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="mt-1 w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-sm text-gray-400 group-hover:text-gray-300">{item.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
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
            </div>
        </section>
    )
}

export default WhyAuroraaExist
