import React from 'react'
import { motion } from 'framer-motion';
import { Check, ArrowRight, ChevronDown, Sparkles, Shield, Lock, Users, Palette, Smile, Heart, Star, Instagram, Facebook, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Routes } from '@/lib/routes';

const CTASection = () => {
    return (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#065B98] to-[#1B7FDC] text-white overflow-hidden">
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
                        Ready to Protect Your Digital Assets?
                    </motion.h2>

                    <motion.p
                        className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-100"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        Protect your digital assets—starting with images (PDFs, docs, and more coming soon).
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
                            className="px-8 py-4 bg-white text-[#065B98] font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 inline-flex items-center justify-center"
                        >
                            Try Auroraa Protect Now
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Link>
                    </motion.div>

                    <motion.div
                        className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-200"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className="flex items-center">
                            <Shield className="w-4 h-4 mr-2 text-[#0DB8D3]" />
                            <span>No credit card required</span>
                        </div>
                        <div className="hidden sm:block w-px h-4 bg-white/30"></div>
                        <div className="flex items-center">
                            <Sparkles className="w-4 h-4 mr-2 text-[#0DB8D3]" />
                            <span>Free forever for basic protection</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default CTASection
