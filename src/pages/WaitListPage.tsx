import { useState } from 'react';

import FAQSection from '@/components/protect/FAQSection';
import Header from '@/components/protect/Header';
import HeroSection from '@/components/protect/HeroSection';
import HowItWorksSection from '@/components/protect/HowItWorks';
import ProblemSection from '@/components/protect/ProblemSection';
import ProblemValidation from '@/components/protect/ProblemValidation';
import ScrollProgressIndicator from '@/components/protect/ScrollProgressIndicator';
import SolutionIntro from '@/components/protect/SolutionIntro';
import SolutionSection from '@/components/protect/SolutionSection';
import StatsSection from '@/components/protect/StatsSection';
import SuccessMessage from '@/components/protect/SuccessMessage';
import WaitlistForm from '@/components/protect/WaitListForm';
import Footer from '@/components/protect/Footer';

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