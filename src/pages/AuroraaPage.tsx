import React from 'react';
import Header from '@/components/common/Header';
import HeroSection from '@/components/auroraaPage/HeroSection';
import WhyAuroraaExists from '@/components/auroraaPage/WhyAuroraaExists';
import CTASection from '@/components/auroraaPage/CTASection';
import WhyAuroraaExist from '@/components/auroraaPage/WhyAuroraaExist';
import FinalCTA from '@/components/auroraaPage/FinalCTA';
import FloatingDecorativeElements from '@/components/common/FloatingDecorativeElements';
import Footer from '@/components/common/Footer';
import FAQSection from '@/components/common/FAQSection';
import { Routes } from '@/lib/routes';

const AuroraaPage = () => {

    const navigationItems = [
        { label: 'Auroraa Protect', href: Routes.ProtectPage },
        { label: 'Mission', href: '#mission' },
        { label: 'Community', href: '#community' },
    ];

    return (
        <>
            <div className="min-h-screen bg-[#0A0A0B] text-white font-sans overflow-x-hidden">
                <Header navigationItems={navigationItems} />
                <FloatingDecorativeElements />
                <HeroSection />
                <CTASection />
                <WhyAuroraaExists />
                <WhyAuroraaExist />
                <FinalCTA />
                <FAQSection />
                <Footer />
            </div>
        </>
    );
};

export default AuroraaPage;