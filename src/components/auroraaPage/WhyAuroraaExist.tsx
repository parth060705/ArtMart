import React from 'react'
import { motion } from 'framer-motion';
import { ArrowRight, Users, Palette } from 'lucide-react';

const WhyAuroraaExist = () => {
    return (
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
    )
}

export default WhyAuroraaExist
