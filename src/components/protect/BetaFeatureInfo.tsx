import React from 'react';
import { motion } from 'framer-motion';

const BetaFeatureInfo = () => {
    return (
        <section className="py-16 bg-gradient-to-b from-transparent to-[#0f2533]/30">
            <div className="max-w-6xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="bg-[#0f2533]/50 border border-[#1B7FDC]/20 rounded-2xl p-8"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <div className="px-4 py-2 bg-[#0DB8D3]/10 border border-[#0DB8D3]/20 rounded-full">
                            <span className="text-sm font-medium text-[#0DB8D3]">BETA FEATURE</span>
                        </div>
                        <p className="text-gray-400">Currently in testing phase</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* What this does */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="w-3 h-3 bg-[#0DB8D3] rounded-full"></div>
                                What this does
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="text-[#0DB8D3] mt-1 text-lg">•</span>
                                    <span className="text-gray-300">Embeds invisible protection into your image</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#0DB8D3] mt-1 text-lg">•</span>
                                    <span className="text-gray-300">Adds ownership watermark</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#0DB8D3] mt-1 text-lg">•</span>
                                    <span className="text-gray-300">Preserves visual quality</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#0DB8D3] mt-1 text-lg">•</span>
                                    <span className="text-gray-300">Designed for social sharing</span>
                                </li>
                            </ul>
                        </div>

                        {/* What this doesn't do */}
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="w-3 h-3 bg-[#1B7FDC] rounded-full"></div>
                                What this doesn't do
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="text-[#1B7FDC] mt-1 text-lg">•</span>
                                    <span className="text-gray-300">Does not add visible watermarks</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#1B7FDC] mt-1 text-lg">•</span>
                                    <span className="text-gray-300">Does not block screenshots</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-[#1B7FDC] mt-1 text-lg">•</span>
                                    <span className="text-gray-300">Does not guarantee protection against all AI systems (yet)</span>
                                </li>
                                {/* <li className="flex items-start gap-3">
                                    <span className="text-[#1B7FDC] mt-1 text-lg">•</span>
                                    <span className="text-gray-400">Will do in future</span>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BetaFeatureInfo;
