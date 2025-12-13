import { ArrowRightIcon, Ban, Check, CheckCircleIcon, CircleAlert, IterationCw, Lock, Mail, ShieldCheck, Users } from 'lucide-react';
import { useState, useEffect } from 'react';
// import Icon from '@/components/ui/AppIcon';

interface WaitlistFormProps {
    onSuccess: () => void;
}

const WaitlistForm = ({ onSuccess }: WaitlistFormProps) => {
    const [isHydrated, setIsHydrated] = useState(false);
    const [email, setEmail] = useState('');
    const [artisticMedium, setArtisticMedium] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('');
    const [showOptionalFields, setShowOptionalFields] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email.trim()) {
            setError('Please enter your email address');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setShowOptionalFields(true);
    };

    const handleFinalSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append("entry.1167542943", email);
        if (artisticMedium) {
            formData.append("entry.255503934", artisticMedium);
        }
        if (experienceLevel) {
            formData.append("entry.1104521048", experienceLevel);
        } await fetch('https://docs.google.com/forms/d/e/1FAIpQLSe2uP0xP2I7TJCBdKy20oYdnghKFqI4cuRZGH8h8pLj3e3J9A/formResponse', {
            method: 'POST',
            mode: "no-cors",
            body: formData,
        });
        setIsSubmitting(false);
        onSuccess();
    };

    if (!isHydrated) {
        return (
            <section id="waitlist" className="py-16 lg:py-24 bg-gradient-to-br from-purple-50 via-white to-amber-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl mx-auto text-center">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4C1D95] mb-4">
                            Join the Waitlist
                        </h2>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="waitlist" className="py-16 lg:py-24 bg-gradient-to-br from-purple-50 via-white to-amber-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-8 lg:mb-12">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4C1D95] mb-4">
                            Join the Waitlist
                        </h2>
                        <p className="text-lg sm:text-xl text-[#6B7280]">
                            Be among the first artists to access our protective community and tools
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-2xl">
                        {!showOptionalFields ? (
                            <form onSubmit={handleEmailSubmit} className="space-y-6">
                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-[#1F2937] mb-2">
                                        Email Address *
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            name='entry.1167542943'
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="artist@example.com"
                                            className="w-full px-4 py-3 pl-12 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4C1D95] text-[#1F2937]"
                                        />
                                        <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6B7280]" />
                                    </div>
                                    {error && (
                                        <p className="mt-2 text-sm text-[#EF4444] flex items-center space-x-1">
                                            <CircleAlert />
                                            <span>{error}</span>
                                        </p>
                                    )}
                                </div>

                                {/* Privacy Assurance */}
                                <div className="flex items-start space-x-3 p-4 bg-success/10 rounded-lg">
                                    <ShieldCheck size={20} className="text-success flex-shrink-0 mt-0.5" />
                                    <div className="text-sm text-[#1F2937]">
                                        <p className="font-semibold mb-1">Your privacy is protected</p>
                                        <p className="text-[#6B7280]">
                                            We never sell your data or send spam. Unsubscribe anytime with one click.
                                        </p>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-[#F59E0B] text-[#1F2937] text-lg font-semibold rounded-lg shadow-2xl hover:shadow-[0_12px_40px_rgba(245,158,11,0.35)] hover:scale-[1.02] transition-all ease-in-out duration-300"
                                >
                                    <span>Continue</span>
                                    <ArrowRightIcon size={24} />
                                </button>
                            </form>
                        ) : (
                            <form onSubmit={handleFinalSubmit} className="space-y-6">
                                {/* Confirmed Email Display */}
                                <div className="flex items-center space-x-3 p-4 bg-[#10B981]/10 rounded-lg">
                                    {/* <Icon name="CheckCircleIcon" size={24} className="text-success" /> */}
                                    <CheckCircleIcon size={24} className="text-[#10B981]" />
                                    <div>
                                        <p className="text-sm font-semibold text-[#1F2937]">Email Confirmed</p>
                                        <p className="text-sm text-[#6B7280]">{email}</p>
                                    </div>
                                </div>

                                {/* Optional Fields Header */}
                                <div className="text-center py-4">
                                    <p className="text-lg font-semibold text-[#1F2937] mb-2">
                                        Help us serve you better (Optional)
                                    </p>
                                    <p className="text-sm text-[#6B7280]">
                                        This information helps us tailor the platform to your needs
                                    </p>
                                </div>

                                {/* Artistic Medium */}
                                <div>
                                    <label htmlFor="medium" className="block text-sm font-semibold text-[#1F2937] mb-2">
                                        Primary Artistic Medium
                                    </label>
                                    <select
                                        id="medium"
                                        value={artisticMedium}
                                        name='entry.255503934'
                                        onChange={(e) => setArtisticMedium(e.target.value)}
                                        className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] text-[#1F2937]"
                                    >
                                        <option value="">Select your medium</option>
                                        <option value="digital-illustration">Digital Illustration</option>
                                        <option value="concept-art">Concept Art</option>
                                        <option value="graphic-design">Graphic Design</option>
                                        <option value="3d-art">3D Art</option>
                                        <option value="traditional-art">Traditional Art</option>
                                        <option value="photography">Photography</option>
                                        <option value="mixed-media">Mixed Media</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Experience Level */}
                                <div>
                                    <label htmlFor="experience" className="block text-sm font-semibold text-[#1F2937] mb-2">
                                        Experience Level
                                    </label>
                                    <select
                                        id="experience"
                                        value={experienceLevel}
                                        name='entry.1104521048'
                                        onChange={(e) => setExperienceLevel(e.target.value)}
                                        className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C3AED] text-[#1F2937]"
                                    >
                                        <option value="">Select your experience</option>
                                        <option value="beginner">Beginner (0-2 years)</option>
                                        <option value="intermediate">Intermediate (2-5 years)</option>
                                        <option value="advanced">Advanced (5-10 years)</option>
                                        <option value="professional">Professional (10+ years)</option>
                                    </select>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-[#F59E0B] text-[#1F2937] text-lg font-semibold rounded-lg shadow-2xl hover:shadow-[0_12px_40px_rgba(245,158,11,0.35)] hover:scale-[1.02] transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <IterationCw size={24} className="animate-spin" />
                                            <span>Joining...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Join Waitlist</span>
                                            <Check size={24} />
                                        </>
                                    )}
                                </button>

                                {/* Skip Option */}
                                <button
                                    type="submit"
                                    className="w-full text-sm text-[#6B7280] hover:text-[#1F2937] transition-colors"
                                >
                                    Skip and join waitlist
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-8 flex flex-wrap justify-center items-center gap-6">
                        <div className="flex items-center space-x-2 text-sm text-[#6B7280]">
                            <Lock size={16} className="text-success" />
                            <span>Secure</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-[#6B7280]">
                            <Ban size={16} className="text-success" />
                            <span>No Spam Ever</span>
                        </div>
                        {/* <div className="flex items-center space-x-2 text-sm text-[#6B7280]">
                            <Users size={16} className="text-success" />
                            <span>2,847 Artists Joined</span>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WaitlistForm;