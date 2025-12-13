'use client';

import { useState } from 'react';
import AppImage from './AppImage';
import { CircleCheck, CircleX, HeartIcon, TriangleAlert } from 'lucide-react';
// import AppImage from '@/components/ui/AppImage';
// import Icon from '@/components/ui/AppIcon';

interface ComparisonExample {
    id: number;
    original: string;
    originalAlt: string;
    aiCopy: string;
    aiCopyAlt: string;
    artistName: string;
    styleStolen: string;
}

const ProblemSection = () => {
    const [activeComparison, setActiveComparison] = useState(0);

    const comparisons: ComparisonExample[] = [
        {
            id: 1,
            original: "https://img.rocket.new/generatedImages/rocket_gen_img_14dc41fcb-1764682552822.png",
            originalAlt: 'Original digital artwork showing vibrant fantasy landscape with purple mountains and glowing aurora sky',
            aiCopy: "https://img.rocket.new/generatedImages/rocket_gen_img_106584dfb-1764689812608.png",
            aiCopyAlt: 'AI-generated copy mimicking the same purple mountain landscape style with aurora effects',
            artistName: 'Sarah Chen',
            styleStolen: 'Fantasy Landscape Style'
        },
        {
            id: 2,
            original: "https://img.rocket.new/generatedImages/rocket_gen_img_109117a22-1765255517839.png",
            originalAlt: 'Original character illustration of anime-style girl with blue hair in detailed linework',
            aiCopy: "https://img.rocket.new/generatedImages/rocket_gen_img_1323ac66d-1764695848584.png",
            aiCopyAlt: 'AI-generated character copying the same anime linework style and blue hair aesthetic',
            artistName: 'Marcus Rodriguez',
            styleStolen: 'Character Design Style'
        },
        {
            id: 3,
            original: "https://images.unsplash.com/photo-1711566724211-91feb6009d4b",
            originalAlt: 'Original abstract digital art with flowing geometric patterns in teal and orange',
            aiCopy: "https://img.rocket.new/generatedImages/rocket_gen_img_141e52519-1764707588615.png",
            aiCopyAlt: 'AI-generated abstract art replicating the geometric flow pattern style in similar colors',
            artistName: 'Aisha Patel',
            styleStolen: 'Abstract Pattern Style'
        }];


    const statistics = [
        { value: '2.3M', label: 'Scraping Attempts Blocked', icon: 'ShieldExclamationIcon' },
        { value: '15,847', label: 'Artists Protected', icon: 'UserGroupIcon' },
        { value: '98.7%', label: 'Protection Success Rate', icon: 'CheckBadgeIcon' }];


    return (
        <section className="py-20 md:py-32 bg-gradient-to-b from-[#FEFBFF] to-[#FEFBFF]/30">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-[#EF4444]/10 text-[#EF4444] px-4 py-2 rounded-full text-sm font-medium">
                        {/* <Icon name="ExclamationTriangleIcon" size={20} /> */}
                        <TriangleAlert size={20} />
                        <span>The Problem</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4C1D95]">
                        Your Art is Being Stolen by AI
                    </h2>
                    <p className="text-lg text-[#6B7280]">
                        AI models scrape millions of artworks daily, training on your unique style without permission or compensation
                    </p>
                </div>

                {/* Comparison Viewer */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="bg-[#F8FAFC] rounded-2xl p-6 md:p-8 shadow-[#F8FAFC] border border-[rgba(124, 58, 237, 0.2)]">
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                            {/* Original Artwork */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-[#10B981] flex items-center space-x-2">
                                        <CircleCheck size={20} />
                                        <span>Original Artwork</span>
                                    </span>
                                </div>
                                <div className="relative aspect-square rounded-lg overflow-hidden bg-[#F8FAFC]">
                                    <AppImage
                                        src={comparisons[activeComparison].original}
                                        alt={comparisons[activeComparison].originalAlt}
                                        className="w-full h-full object-cover" />

                                </div>
                            </div>

                            {/* AI Copy */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-[#EF4444] flex items-center space-x-2">
                                        <CircleX size={20} />
                                        <span>AI-Generated Copy</span>
                                    </span>
                                </div>
                                <div className="relative aspect-square rounded-lg overflow-hidden bg-[#F8FAFC]">
                                    <AppImage
                                        src={comparisons[activeComparison].aiCopy}
                                        alt={comparisons[activeComparison].aiCopyAlt}
                                        className="w-full h-full object-cover" />

                                    <div className="absolute inset-0 bg-[#EF4444]/20 backdrop-blur-[2px]" />
                                </div>
                            </div>
                        </div>

                        {/* Comparison Selector */}
                        {/* <div className="flex items-center justify-center space-x-2">
                            {comparisons.map((_, index) =>
                                <button
                                    key={index}
                                    onClick={() => setActiveComparison(index)}
                                    className={`w-2 h-2 rounded-full transition-aurora ${index === activeComparison ?
                                        'bg-primary w-8' : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'}`
                                    }
                                    aria-label={`View comparison ${index + 1}`} />

                            )}
                        </div> */}
                    </div>
                </div>

                {/* Statistics */}
                {/* <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    {statistics.map((stat, index) =>
                        <div
                            key={index}
                            className="bg-surface rounded-xl p-6 text-center space-y-3 border border-border hover:border-primary/50 transition-aurora">

                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/20">
                                <Icon name={stat.icon as any} size={24} className="text-primary" />
                            </div>
                            <div className="text-3xl md:text-4xl font-bold text-foreground">
                                {stat.value}
                            </div>
                            <div className="text-sm text-text-secondary">
                                {stat.label}
                            </div>
                        </div>
                    )}
                </div> */}
                {/* Empathy Message */}
                <div className="mt-12 max-w-2xl mx-auto text-center p-6 rounded-xl">
                    {/* <Icon name="HeartIcon" size={32} className="text-primary mx-auto mb-4" /> */}
                    <HeartIcon size={32} className="text-[#4C1D95] mx-auto mb-4" />
                    <p className="text-lg text-[#1F2937]">
                        We understand your frustration and fear. These feelings are completely valid, and you deserve protection and support.
                    </p>
                </div>
            </div>
        </section>);

};

export default ProblemSection;