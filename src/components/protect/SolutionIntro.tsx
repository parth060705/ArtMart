// import Icon from '@/components/ui/AppIcon';

import { CircleCheck, FileCheck, LockKeyhole, ShieldCheck, UserIcon } from "lucide-react";

const SolutionIntro = () => {
    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-purple-50 via-white to-amber-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#4C1D95] mb-4">
                            Together, We&apos;re Stronger
                        </h2>
                        <p className="text-lg sm:text-xl text-[#6B7280] max-w-3xl mx-auto">
                            Auroraa isn&apos;t just a platform—it&apos;s a collective response. When artists unite, we create a shield that protects everyone.
                        </p>
                    </div>

                    {/* Visual Illustration */}
                    <div className="relative mb-12">
                        {/* Central Shield */}
                        <div className="flex justify-center mb-8">
                            <div className="relative w-48 h-48 lg:w-64 lg:h-64">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#4C1D95] to-[#7C3AED] rounded-full opacity-20 animate-pulse" />
                                <div className="absolute inset-4 bg-gradient-to-br  from-[#4C1D95] to-[#7C3AED] rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }} />
                                <div className="absolute inset-8 bg-gradient-to-br from-[#4C1D95] to-[#F59E0B] rounded-full flex items-center justify-center shadow-2xl">
                                    <ShieldCheck size={80} className="text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Artist Circles Around Shield */}
                        <div className="relative h-64 lg:h-80">
                            {/* Top Artist */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-aurora mb-2">
                                    {/* <Icon name="UserIcon" size={32} className="text-white" /> */}
                                    <UserIcon size={32} className="text-white" />
                                </div>
                                <div className="w-0.5 h-12 lg:h-16 bg-gradient-to-b from-purple-400 to-transparent" />
                            </div>

                            {/* Right Artist */}
                            <div className="absolute top-1/2 right-8 lg:right-16 transform -translate-y-1/2 flex items-center">
                                <div className="w-12 lg:w-16 h-0.5 bg-gradient-to-l from-amber-400 to-transparent mr-2" />
                                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-aurora">
                                    {/* <Icon name="UserIcon" size={32} className="text-white" /> */}
                                    <UserIcon size={32} className="text-white" />
                                </div>
                            </div>

                            {/* Bottom Artist */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                                <div className="w-0.5 h-12 lg:h-16 bg-gradient-to-t from-purple-400 to-transparent mb-2" />
                                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-purple-500 to-amber-500 flex items-center justify-center shadow-aurora">
                                    {/* <Icon name="UserIcon" size={32} className="text-white" /> */}
                                    <UserIcon size={32} className="text-white" />
                                </div>
                            </div>

                            {/* Left Artist */}
                            <div className="absolute top-1/2 left-8 lg:left-16 transform -translate-y-1/2 flex items-center">
                                <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-gradient-to-br from-purple-400 to-amber-400 flex items-center justify-center shadow-aurora">
                                    {/* <Icon name="UserIcon" size={32} className="text-white" /> */}
                                    <UserIcon size={32} className="text-white" />
                                </div>
                                <div className="w-12 lg:w-16 h-0.5 bg-gradient-to-r from-purple-400 to-transparent ml-2" />
                            </div>
                        </div>
                    </div>

                    {/* Key Messages */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl">
                            {/* <Icon name="UsersIcon" size={40} className="text-primary mx-auto mb-4" /> */}
                            <UserIcon size={40} className="text-[#4C1D95] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-[#1F2937] mb-2">Collective Power</h3>
                            <p className="text-[#6B7280]">
                                Individual artists are vulnerable, but together we create an unbreakable defense.
                            </p>
                        </div>

                        <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl">
                            {/* <Icon name="LockClosedIcon" size={40} className="text-secondary mx-auto mb-4" /> */}
                            {/* <LockClosedIcon size={40} className="text-secondary mx-auto mb-4" /> */}
                            <LockKeyhole size={40} className="text-[#7C3AED] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-[#1F2937] mb-2">AI-Resistant Tools</h3>
                            <p className="text-[#6B7280]">
                                Access techniques and technologies that make your art harder for AI to copy.
                            </p>
                        </div>

                        <div className="text-center p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-2xl">
                            {/* <Icon name="DocumentCheckIcon" size={40} className="text-accent mx-auto mb-4" /> */}
                            <FileCheck size={40} className="text-[#F59E0B] mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-[#1F2937] mb-2">Ownership Proof</h3>
                            <p className="text-[#6B7280]">
                                Establish and protect your creative rights with verifiable ownership records.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SolutionIntro;