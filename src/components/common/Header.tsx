import { Menu, X, User, LogOut, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { useUserProfile } from '@/hooks/user/auth/useUserProfile';
import { Routes } from '@/lib/routes';
// import Link from 'next/link';
// import Icon from '@/components/ui/AppIcon';

interface HeaderProps {
    navigationItems: any[]
}

const Header = ({ navigationItems }: HeaderProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const { data: userProfile } = useUserProfile();


    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Element;
            if (isProfileOpen && !target.closest('.profile-dropdown')) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isProfileOpen]);

    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsMenuOpen(false);
        }
    };

    const handleLinkClick = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsMenuOpen(false);
        } else {
            // For external routes or when element doesn't exist, use navigate
            window.location.href = href;
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'backdrop-blur-sm shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    {/*<Link to="/" className="flex items-center space-x-2 group">
                         <div className="relative">
                            <svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="transition-aurora group-hover:scale-105"
                            >
                                <defs>
                                    <linearGradient id="aurora-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#4C1D95" />
                                        <stop offset="50%" stopColor="#7C3AED" />
                                        <stop offset="100%" stopColor="#F59E0B" />
                                    </linearGradient>
                                </defs>
                                <circle cx="20" cy="20" r="18" fill="url(#aurora-gradient)" opacity="0.1" />
                                <path
                                    d="M20 8C13.373 8 8 13.373 8 20C8 26.627 13.373 32 20 32C26.627 32 32 26.627 32 20C32 13.373 26.627 8 20 8ZM20 10C25.523 10 30 14.477 30 20C30 25.523 25.523 30 20 30C14.477 30 10 25.523 10 20C10 14.477 14.477 10 20 10Z"
                                    fill="url(#aurora-gradient)"
                                />
                                <path
                                    d="M20 14L22.5 19L28 20L24 24L25 29.5L20 27L15 29.5L16 24L12 20L17.5 19L20 14Z"
                                    fill="url(#aurora-gradient)"
                                />
                            </svg>
                        </div> 
                         <span className="text-xl lg:text-2xl font-bold text-[#4C1D95] group-hover:text-[#7C3AED] transition-aurora">
                            Auroraa Community
                        </span> 
                    </Link> */}
                    <Link to='/' className="text-2xl font-bold logo-font bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                        Auroraa
                    </Link>
                    {/* <Link to='/' className="text-2xl font-bold logo-font bg-gradient-to-r from-[#065B98] via-[#1B7FDC] to-[#0DB8D3] bg-clip-text text-transparent"> 
                        Auroraa
                    </Link> */}

                    <div className='flex gap-4'>
                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navigationItems.map((item) => (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    onClick={() => handleLinkClick(item.href)}
                                    className="text-sm lg:text-base font-medium text-[#fff] hover:text-[#4C1D95] transition-aurora relative group "
                                >
                                    {item.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#4C1D95] group-hover:w-full transition-all duration-300" />
                                </Link>
                            ))}
                        </nav>

                        {/* Profile Section */}
                        {isAuthenticated ? (
                            <div className="relative hidden md:block profile-dropdown">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F8FAFC]/10 transition-colors"
                                    aria-label="Profile menu"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                </button>

                                {/* Profile Dropdown */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-[#193546] border border-[#1B7FDC]/20 rounded-lg shadow-lg z-50">
                                        <div className="p-4 border-b border-[#1B7FDC]/20">
                                            <p className="text-white font-medium">
                                                {userProfile?.name || 'User'}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                {userProfile?.email || 'user@auroraa.com'}
                                            </p>
                                        </div>
                                        <div className="p-2 space-y-1">
                                            {/* <Link
                                                to={`/${Routes.protectVerifyPage}`}
                                                onClick={() => setIsProfileOpen(false)}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                            >
                                                <ShieldCheck className="w-4 h-4 text-[#0DB8D3]" />
                                                <span>Verify Artwork</span>
                                            </Link> */}
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsProfileOpen(false);
                                                }}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-3">
                        {/* Profile Icon for Mobile */}
                        {isAuthenticated && (
                            <div className="relative profile-dropdown">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#F8FAFC]/10 transition-colors"
                                    aria-label="Profile menu"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] rounded-full flex items-center justify-center">
                                        <User className="w-4 h-4 text-white" />
                                    </div>
                                </button>

                                {/* Profile Dropdown for Mobile */}
                                {isProfileOpen && (
                                    <div className="absolute right-0 mt-2 w-64 bg-[#193546] border border-[#1B7FDC]/20 rounded-lg shadow-lg z-50">
                                        <div className="p-4 border-b border-[#1B7FDC]/20">
                                            <p className="text-white font-medium">
                                                {userProfile?.name || 'User'}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                {userProfile?.email || 'user@auroraa.com'}
                                            </p>
                                        </div>
                                        <div className="p-2 space-y-1">
                                            <Link
                                                to={`/${Routes.protectVerifyPage}`}
                                                onClick={() => setIsProfileOpen(false)}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                            >
                                                <ShieldCheck className="w-4 h-4 text-[#0DB8D3]" />
                                                <span>Verify Artwork</span>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsProfileOpen(false);
                                                }}
                                                className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 rounded-lg hover:bg-[#F8FAFC]/10 transition-all duration-300 ease-in-out"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#FEFBFF] border-t border-[rgba(124, 58, 237, 0.2)] shadow-2xl">
                    <nav className="container mx-auto px-4 py-4 space-y-3">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.href}
                                to={item.href}
                                onClick={() => handleLinkClick(item.href)}
                                className="block px-4 py-3 text-base font-medium text-[#1F2937] hover:bg-[#F8FAFC] hover:text-[#4C1D95] rounded-lg transition-all duration-300 ease-in-out"
                            >
                                {item.label}
                            </Link>
                        ))}
                        {/* <a
                        href="#waitlist"
                        onClick={(e) => handleAnchorClick(e, '#waitlist')}
                        className="block w-full px-4 py-3 bg-[#F59E0B] text-[#1F2937] font-semibold text-center rounded-lg shadow-aurora hover:shadow-aurora-strong hover:scale-105 ease-in-out transition-all duration-300"
                    >
                        Join Waitlist
                    </a> */}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;