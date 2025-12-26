import { Mail, ShieldCheckIcon } from 'lucide-react';
import { useState, useEffect } from 'react';
// import Icon from '@/components/ui/AppIcon';

const Footer = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [currentYear, setCurrentYear] = useState(2025);

    useEffect(() => {
        setIsHydrated(true);
        setCurrentYear(new Date()?.getFullYear());
    }, []);

    if (!isHydrated) {
        return (
            <footer className="bg-gradient-to-br from-[#4C1D95] to-[#7C3AED] text-white py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-sm opacity-80">
                            © 2025 Auroraa Community. Protecting artists, together.
                        </p>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="bg-gradient-to-br from-[#4C1D95] to-[#7C3AED] text-white py-12 lg:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-8">
                        {/* Brand Section */}
                        <div>
                            <div className="flex items-center space-x-2 mb-4">
                                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                    <ShieldCheckIcon size={24} className="text-white" />
                                </div>
                                <span className="text-xl font-bold">Auroraa</span>
                            </div>
                            <p className="text-sm opacity-80 mb-4">
                                Building a safe haven for artists threatened by AI art copying through collective protection and community support.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="#how-it-works" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                                        How It Works
                                    </a>
                                </li>
                                <li>
                                    <a href="#benefits" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                                        Community Benefits
                                    </a>
                                </li>
                                <li>
                                    <a href="#stories" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                                        Our Vision
                                    </a>
                                </li>
                                <li>
                                    <a href="#waitlist" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                                        Join Waitlist
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Contact & Social */}
                        <div>
                            <h3 className="text-lg font-bold mb-4">Stay Connected</h3>
                            <p className="text-sm opacity-80 mb-4">
                                Questions or feedback? We&apos;d love to hear from you.
                            </p>
                            <a
                                href="mailto:auroraa@auroraa.in"
                                className="inline-flex items-center space-x-2 text-sm hover:opacity-80 transition-opacity"
                            >
                                <Mail size={16} />
                                <span>auroraa@auroraa.in</span>
                            </a>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-8 border-t border-white/20">
                        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                            <p className="text-sm opacity-80">
                                © {currentYear} Auroraa Community. Protecting artists, together.
                            </p>
                            <div className="flex items-center space-x-6">
                                <a href="/privacy-policy" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                                    Privacy Policy
                                </a>
                                <a href="/terms-and-conditions" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                                    Terms of Service
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;