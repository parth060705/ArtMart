import { useState } from 'react';

import FAQSection from '@/components/waitlist/FAQSection';
import Header from '@/components/common/Header';
import HeroSection from '@/components/waitlist/HeroSection';
import HowItWorksSection from '@/components/waitlist/HowItWorks';
import ProblemSection from '@/components/waitlist/ProblemSection';
import ProblemValidation from '@/components/waitlist/ProblemValidation';
import ScrollProgressIndicator from '@/components/waitlist/ScrollProgressIndicator';
import SolutionIntro from '@/components/waitlist/SolutionIntro';
import SolutionSection from '@/components/waitlist/SolutionSection';
import StatsSection from '@/components/waitlist/StatsSection';
import SuccessMessage from '@/components/common/SuccessMessage';
import WaitlistForm from '@/components/waitlist/WaitListForm';
import Footer from '@/components/waitlist/Footer';

// import "../styles/waitList.css"

const WaitListPage = () => {
    const [isFormCompleted, setIsFormCompleted] = useState(false);
    const [userEmail, setUserEmail] = useState('');

    const handleWaitlistSuccess = () => {
        setIsFormCompleted(true);
        const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement;
        if (emailInput) {
            setUserEmail(emailInput.value);
        }
    };

    const scrollToWaitlist = () => {
        const waitlistSection = document.querySelector('#waitlist');
        if (waitlistSection) {
            waitlistSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const navigationItems = [
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'FAQ', href: '#faq' },
        { label: 'Problem', href: '#problem' },
    ];

    return (
        <>
            <ScrollProgressIndicator />
            <Header navigationItems={navigationItems} />
            <main>
                <HeroSection onJoinWaitlist={scrollToWaitlist} />
                <ProblemSection />
                <StatsSection />
                <SolutionIntro />
                <SolutionSection />
                <HowItWorksSection />
                <FAQSection />
                {!isFormCompleted ? (
                    <WaitlistForm onSuccess={handleWaitlistSuccess} />
                ) : (
                    <SuccessMessage email={userEmail} />
                )}
            </main>
            <Footer />
        </>
    );
};

export default WaitListPage