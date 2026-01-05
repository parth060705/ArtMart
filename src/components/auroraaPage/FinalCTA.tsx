import React from 'react'
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const FinalCTA = () => {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-r from-[#065B98] via-[#1B7FDC] to-[#0DB8D3]">
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTR6bS0yIDBjMCAxLjEwNC0uODk2IDItMiAycy0yLS44OTYtMi0yIC44OTYtMiAyLTIgMiAuODk2IDIgMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-10"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent"></div>
                <div className="absolute -right-1/4 -top-1/4 w-1/2 h-full bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
            </div>

            <div className="max-w-5xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-8 border border-white/20"
                        animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 10, -10, 0]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut'
                        }}
                    >
                        <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
                        Be part of the Auroraa
                    </h2>

                    <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Join thousands of artists who are taking control of their creative future.
                        Be among the first to experience the next chapter of digital art protection.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="group inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white text-[#065B98] text-lg font-semibold rounded-lg shadow-lg hover:shadow-[0_12px_40px_rgba(255,255,255,0.3)] hover:scale-105 transition-all ease-in-out cursor-pointer"
                        >
                            <span>Join for Free</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f2533] to-transparent"></div>
        </section>
    )
}

export default FinalCTA
