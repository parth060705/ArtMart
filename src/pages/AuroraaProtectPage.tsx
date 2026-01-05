import React, { useState } from 'react';
import Header from '@/components/common/Header';
import FloatingDecorativeElements from '@/components/common/FloatingDecorativeElements';
import Footer from '@/components/common/Footer';
import HeroSection from '@/components/protect/HeroSection';
import FeaturedSection from '@/components/protect/FeaturedSection';
import CTASection from '@/components/protect/CTASection';

const AuroraaProtectPage = () => {

    const navigationItems = [
        { label: 'Features', href: '#features' },
    ];

    return (
        <div className="min-h-screen bg-[#193546] text-white font-sans overflow-x-hidden">
            <FloatingDecorativeElements />
            <Header navigationItems={navigationItems} />
            <HeroSection />
            <FeaturedSection />
            <CTASection />
            <Footer />
        </div>
    );
};

export default AuroraaProtectPage;