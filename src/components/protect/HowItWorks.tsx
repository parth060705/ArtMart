// import Icon from '../../../components/AppIcon';

import { Mail, Key, Heart, Sparkles, ArrowRight } from "lucide-react";

const HowItWorksSection = () => {
    const steps = [
        {
            id: 1,
            title: 'Join the Waitlist',
            description: 'Sign up with your email to secure your spot in our growing artist community',
            timeline: 'Takes 30 seconds',
            icon: Mail
        },
        {
            id: 2,
            title: 'Get Early Access',
            description: 'Receive exclusive invitation when we launch with priority access to all features',
            timeline: 'Coming soon',
            icon: Key
        },
        {
            id: 3,
            title: 'Protect & Connect',
            description: 'Start using protection tools and connect with fellow artists in our safe community',
            timeline: 'Ongoing support',
            icon: Heart
        }
    ];

    return (
        <section id="how-it-works" className="py-20 px-6 bg-[#F8FAFC]/30">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 text-[#10B981] bg-[#10B981]/20 px-4 py-2 rounded-full text-sm font-medium">
                        <Sparkles size={20} />
                        <span>How it works</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4C1D95]">
                        Three simple steps to join
                    </h2>
                </div>

                <div className="relative">
                    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-[#4C1D95] via-[#7C3AED] to-[#F59E0B] -translate-y-1/2 opacity-20" />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {steps.map((step, index) => (
                            <div key={step.id} className="relative">
                                <div className="bg-card rounded-2xl p-8 shadow-card hover:shadow-cta transition-all duration-300 hover:-translate-y-2">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4C1D95] via-[#7C3AED] to-[#F59E0B] flex items-center justify-center">
                                            <step.icon size={32} className="text-white" />
                                        </div>
                                        <div className="text-6xl font-bold text-[#4C1D95]/10">
                                            {step.id}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold text-[#4C1D95] mb-3">
                                        {step.title}
                                    </h3>

                                    <p className="text-muted-foreground mb-4 leading-relaxed">
                                        {step.description}
                                    </p>

                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4C1D95]/10 text-[#4C1D95] text-sm font-medium">
                                        <step.icon size={16} />
                                        {step.timeline}
                                    </div>
                                </div>

                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-8 w-8 h-8 -translate-y-1/2 z-10">
                                        <ArrowRight size={32} className="text-[#4C1D95]" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;