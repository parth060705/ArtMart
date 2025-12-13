// import Icon from '@/components/ui/AppIcon';

import { CircleCheck, ShareIcon, SparkleIcon } from "lucide-react";

interface SuccessMessageProps {
    email: string;
}

const SuccessMessage = ({ email }: SuccessMessageProps) => {
    const handleShare = async () => {
        const shareData = {
            title: 'Join Auroraa - Protect Your Art from AI',
            text: "I've joined Auroraa's waitlist to protect my art from AI. Join me in building a safer space for artists!",
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    }
    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-50 via-white to-amber-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mx-auto">
                    {/* Success Card */}
                    <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-2xl text-center">
                        {/* Success Icon */}
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#10B981] to-[#10B981]/80 rounded-full mb-6 shadow-2xl">
                            <CircleCheck size={48} className="text-white" />
                        </div>

                        {/* Welcome Message */}
                        <h2 className="text-3xl sm:text-4xl font-bold text-[#4C1D95] mb-4">
                            Welcome to Auroraa!
                        </h2>
                        <p className="text-lg text-[#6B7280] mb-8">
                            You&apos;ve successfully joined our waitlist. We&apos;re excited to have you in our community of protected artists.
                        </p>

                        {/* Email Confirmation */}
                        <div className="p-4 bg-[#F9F9F9] rounded-lg mb-8">
                            <p className="text-sm text-[#6B7280] mb-1">Confirmation sent to:</p>
                            <p className="text-lg font-semibold text-[#4C1D95]">{email}</p>
                        </div>

                        {/* What Happens Next */}
                        <div className="text-left space-y-6 mb-8">
                            <h3 className="text-xl font-bold text-[#4C1D95] text-center mb-4">
                                What Happens Next?
                            </h3>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-[#4C1D95]/10 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-[#4C1D95]">1</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-[#4C1D95] mb-1">Check Your Email</p>
                                    <p className="text-sm text-[#6B7280]">
                                        We&apos;ve sent a confirmation email with your waitlist position and next steps.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-[#7C3AED]/10 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-[#7C3AED]">2</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-[#4C1D95] mb-1">Early Access Invitation</p>
                                    <p className="text-sm text-[#6B7280]">
                                        Within 2-4 weeks, you&apos;ll receive your exclusive early access invitation.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 w-10 h-10 bg-[#F59E0B]/10 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-[#F59E0B]">3</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-[#4C1D95] mb-1">Join the Community</p>
                                    <p className="text-sm text-[#6B7280]">
                                        Get full access to protection tools, forums, and start shaping the platform.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* First Member Benefit Preview */}
                        <div className="p-6 bg-gradient-to-br from-purple-50 to-amber-50 rounded-xl mb-8">
                            <SparkleIcon size={32} className="text-[#4C1D95] mx-auto mb-3" />
                            <h4 className="text-lg font-bold text-[#4C1D95] mb-2">
                                Your First Member Benefit
                            </h4>
                            <p className="text-sm text-[#6B7280]">
                                As an early member, you&apos;ll have voting rights on our first major feature release. Your voice will directly shape how we protect artists.
                            </p>
                        </div>

                        {/* Social Share */}
                        <div className="border-t border-[rgba(124, 58, 237, 0.2)] pt-8">
                            <p className="text-sm text-[#6B7280] mb-4">
                                Help us grow the community and protect more artists
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button onClick={handleShare} className="flex items-center space-x-2 px-4 py-2 bg-[rgba(124, 58, 237, 0.2)] hover:bg-[rgba(124, 58, 237, 0.2)/80] rounded-lg transition-colors">
                                    <ShareIcon size={20} className="text-[#4C1D95]" />
                                    <span className="text-sm font-medium text-[#4C1D95]">Share</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-8 text-center">
                        <p className="text-sm text-[#6B7280]">
                            Questions? Email us at{' '}
                            <a href="mailto:auroraa@auroraa.in" className="text-[#4C1D95] hover:underline">
                                auroraa@auroraa.in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SuccessMessage;