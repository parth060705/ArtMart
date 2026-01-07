import { Routes } from '@/lib/routes'
import React from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Facebook, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <div className="relative py-16 px-4 sm:px-6 lg:px-8 bg-[#0f2533] border-t border-[#1B7FDC]/20">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div>
                        <Link to='/' className="text-2xl font-bold logo-font bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                            Auroraa
                        </Link>
                        <p className="text-gray-400 mb-6 mt-3">Empowering artists in the digital age with protection-first technology.</p>
                        <div className="flex space-x-4">
                            <div className="flex items-center gap-3">
                                <a
                                    href="https://instagram.com/auroraadotin"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Auroraa on Instagram"
                                    className="inline-flex items-center justify-center rounded-full bg-[#1B7FDC]/20 text-[#0DB8D3] hover:bg-[#1B7FDC]/30 border border-[#1B7FDC]/30 w-9 h-9 transition-all"
                                >
                                    <Instagram className="w-4 h-4" />
                                </a>
                                <a
                                    href="https://www.facebook.com/auroraa.a.social.marketplace.for.art.a"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Auroraa on Facebook"
                                    className="inline-flex items-center justify-center rounded-full bg-[#1B7FDC]/20 text-[#0DB8D3] hover:bg-[#1B7FDC]/30 border border-[#1B7FDC]/30 w-9 h-9 transition-all"
                                >
                                    <Facebook className="w-4 h-4" />
                                </a>
                                <a
                                    href="https://youtube.com/@AuroraaCommunity"
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="Auroraa on YouTube"
                                    className="inline-flex items-center justify-center rounded-full bg-[#1B7FDC]/20 text-[#0DB8D3] hover:bg-[#1B7FDC]/30 border border-[#1B7FDC]/30 w-9 h-9 transition-all"
                                >
                                    <Youtube className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to={Routes.ProtectPage} className="text-gray-400 hover:text-[#0DB8D3] transition-colors">Auroraa Protect</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h3>
                        <ul className="space-y-3">
                            <li >
                                <Link to={`/${Routes.PrivacyPolicyPage}`} className="text-gray-400 hover:text-[#0DB8D3] transition-colors">Privacy</Link>
                            </li>
                            <li>
                                <Link to={`/${Routes.TermsAndConditionsPage}`} className="text-gray-400 hover:text-[#0DB8D3] transition-colors">Terms</Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-[#1B7FDC]/20 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-400 mb-4 md:mb-0">
                        © {new Date().getFullYear()} Auroraa All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <Link to={`/${Routes.PrivacyPolicyPage}`} className="text-sm text-gray-400 hover:text-gray-300">Privacy Policy</Link>
                        <Link to={`/${Routes.TermsAndConditionsPage}`} className="text-sm text-gray-400 hover:text-gray-300">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
