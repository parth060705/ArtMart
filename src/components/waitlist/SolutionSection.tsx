'use client';

import { useState } from 'react';
// import AppImage from '@/components/ui/AppImage';
// import Icon from '@/components/ui/AppIcon';
import { CircleCheck, LockKeyhole, Sparkles } from 'lucide-react';
import AppImage from './AppImage';

interface Feature {
    id: number;
    title: string;
    description: string;
    icon: string;
    preview: string;
    previewAlt: string;
    benefits: string[];
}

const SolutionSection = () => {
    const [activeFeature, setActiveFeature] = useState(0);

    const features: Feature[] = [
        {
            id: 1,
            title: 'Style Cloaking',
            description: 'Advanced AI-resistant technology that protects your unique artistic style from being scraped and copied by AI models',
            icon: 'ShieldCheckIcon',
            preview: "https://img.rocket.new/generatedImages/rocket_gen_img_10f1f2b22-1765609463023.png",
            previewAlt: 'Before and after comparison showing artwork with invisible protection layer applied',
            benefits: [
                'Invisible to human viewers',
                'Blocks AI model training',
                'Preserves image quality',
                'Works on all platforms']

        },
        {
            id: 2,
            title: 'Proven Ownership',
            description: 'Blockchain-verified provenance tracking that establishes and maintains your creative ownership permanently',
            icon: 'DocumentCheckIcon',
            preview: "https://img.rocket.new/generatedImages/rocket_gen_img_1b1779ff1-1765047927236.png",
            previewAlt: 'Digital certificate showing blockchain verification with timestamp and artist signature',
            benefits: [
                'Immutable ownership records',
                'Timestamped creation proof',
                'Legal protection support',
                'Portfolio verification']

        },
        {
            id: 3,
            title: 'Artist-First Privacy',
            description: 'Complete control over your data with transparent privacy policies designed specifically for creative professionals',
            icon: 'LockClosedIcon',
            preview: "https://img.rocket.new/generatedImages/rocket_gen_img_11aa497c8-1764837821266.png",
            previewAlt: 'Privacy dashboard interface showing data control settings and sharing permissions',
            benefits: [
                'Zero data selling',
                'Granular sharing controls',
                'Export your data anytime',
                'GDPR compliant']

        }];


    return (
        <section id="solution" className="py-20 md:py-32 bg-[#FEFBFF]">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <div className="inline-flex items-center space-x-2 text-[#10B981] bg-[#10B981]/20 px-4 py-2 rounded-full text-sm font-medium">
                        <Sparkles size={20} />
                        <span>The Solution</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#4C1D95]">
                        Protect Your Art, Own Your Style
                    </h2>
                    <p className="text-lg text-[#6B7280]">
                        Three powerful tools working together to safeguard your creative work in the AI era
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="max-w-6xl mx-auto">
                    {/* <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) =>
            <button
              key={feature.id}
              onClick={() => setActiveFeature(index)}
              className={`text-left bg-surface rounded-xl p-6 border-2 transition-aurora ${
              activeFeature === index ?
              'border-primary shadow-aurora' :
              'border-border hover:border-primary/50'}`
              }>

                <div className="space-y-4">
                  <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl transition-aurora ${
                activeFeature === index ?
                'bg-primary/20' : 'bg-muted'}`
                }>
                    <Icon
                    name={feature.icon as any}
                    size={28}
                    className={activeFeature === index ? 'text-primary' : 'text-muted-foreground'} />

                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </button>
            )}
          </div>  */}

                    {/* Feature Preview */}
                    <div className="bg-[#F8FAFC] rounded-2xl p-6 md:p-8 shadow-[#F8FAFC] border border-[#rgba(124, 58, 237, 0.2)]">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            {/* Preview Image */}
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#F8FAFC]">
                                <AppImage
                                    src={features[activeFeature].preview}
                                    alt={features[activeFeature].previewAlt}
                                    className="w-full h-full object-cover" />

                                <div className="absolute top-4 right-4 text-[#10B981] px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                                    <CircleCheck size={16} />
                                    <span>Protected</span>
                                </div>
                            </div>

                            {/* Benefits List */}
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-[#1F2937] mb-2">
                                        {features[activeFeature].title}
                                    </h3>
                                    <p className="text-[#6B7280]">
                                        {features[activeFeature].description}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {features[activeFeature].benefits.map((benefit, index) =>
                                        <div key={index} className="flex items-start space-x-3">
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#10B981]/20 flex items-center justify-center mt-0.5">
                                                <CircleCheck size={16} className="text-[#10B981]" />
                                            </div>
                                            <span className="text-[#6B7280]">{benefit}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>);

};

export default SolutionSection;