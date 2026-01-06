import React, { useState } from 'react';
import Header from '@/components/common/Header';
import FloatingDecorativeElements from '@/components/common/FloatingDecorativeElements';
import Footer from '@/components/common/Footer';
import HeroSection from '@/components/protect/HeroSection';
import FeaturedSection from '@/components/protect/FeaturedSection';
import CTASection from '@/components/protect/CTASection';
import HeroSectionWithFileUpload from '@/components/protect/HeroSectionWithFileUpload';
import BetaFeatureInfo from '@/components/protect/BetaFeatureInfo';

const AuroraaProtectPage = () => {

    const navigationItems = [
        { label: 'Features', href: '#features' },
    ];

    return (
        <div className="min-h-screen bg-[#193546] text-white font-sans overflow-x-hidden">
            <FloatingDecorativeElements />
            <Header navigationItems={navigationItems} />
            <HeroSectionWithFileUpload />
            <BetaFeatureInfo />
            {/* <HeroSection /> */}
            <FeaturedSection />
            <CTASection />
            <Footer />
        </div>
    );
};

export default AuroraaProtectPage;