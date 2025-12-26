'use client';

import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
// import Icon from '@/components/ui/AppIcon';

interface HeroSectionProps {
    onJoinWaitlist: () => void;
}

const HeroSection = ({ onJoinWaitlist }: HeroSectionProps) => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [waitlistCount, setWaitlistCount] = useState(0);

    useEffect(() => {
        setIsHydrated(true);
        setWaitlistCount(2847);
    }, []);

    if (!isHydrated) {
        return (
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-amber-50 to-purple-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary mb-6">
                        Artists are worried.
                        <br />
                        AI is copying their art.
                    </h1>
                </div>
            </section>
        );
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-purple-50 via-amber-50 to-purple-100">
            {/* Aurora Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Main Headline */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#4C1D95] mb-6 leading-tight">
                        Artists are worried.
                        <br />
                        AI is copying their art.
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl sm:text-2xl lg:text-3xl text-[#6B7280] mb-8 max-w-3xl mx-auto">
                        You&apos;re not alone. Join a community that protects your creativity together.
                    </p>

                    {/* Primary CTA */}
                    <div className="flex flex-col items-center space-y-4 mb-8">
                        <button
                            onClick={onJoinWaitlist}
                            className="group inline-flex items-center space-x-3 px-8 py-4 bg-[#F59E0B] text-[#1F2937] text-lg font-semibold rounded-lg shadow-aurora-strong hover:shadow-[0_12px_40px_rgba(245,158,11,0.35)] hover:scale-105 transition-all ease-in-out cursor-pointer"
                        >
                            <span>Join the Waitlist - It&apos;s Free</span>
                            {/* <Icon name="ArrowRightIcon" size={24} className="group-hover:translate-x-1 transition-transform" /> */}
                        </button>

                        {/* Trust Message */}
                        <p className="text-sm text-[#6B7280] flex items-center space-x-2">
                            {/* <Icon name="ShieldCheckIcon" size={16} className="text-success" /> */}
                            <span>No spam, ever. We respect artists.</span>
                        </p>
                    </div>

                    {/* Early Member Counter */}
                    {/* <div className="inline-flex items-center space-x-3 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-aurora">
                        <div className="flex -space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white" />
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-white" />
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-amber-500 border-2 border-white" />
                        </div>
                        <p className="text-sm font-medium text-foreground">
                            <span className="text-primary font-bold">{waitlistCount.toLocaleString()}</span> artists already joined
                        </p>
                    </div> */}
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                {/* <Icon name="ChevronDownIcon" size={32} className="text-primary opacity-60" /> */}
                <ChevronDown size={32} className="text-[#4C1D95] opacity-60" />
            </div>
        </section>
    );
};

export default HeroSection;