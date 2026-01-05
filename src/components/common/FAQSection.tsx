import { ChevronDown, FileQuestion, Search, } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
    id: number;
    question: string;
    answer: string;
    category: string;
}

const FAQSection = () => {
    const [openFAQ, setOpenFAQ] = useState<number | null>(0);
    const [searchQuery, setSearchQuery] = useState('');

    const faqs: FAQItem[] = [
        {
            id: 1,
            question: 'How does the AI-resistant cloaking technology work?',
            answer: 'Our cloaking technology adds imperceptible modifications to your artwork that are invisible to human viewers but disrupt AI model training. The protection layer prevents AI systems from accurately learning and replicating your unique artistic style while maintaining 100% visual quality for human audiences.',
            category: 'Protection'
        },
        {
            id: 2,
            question: 'Will the protection affect the quality of my artwork?',
            answer: 'No. The cloaking layer is completely invisible to human eyes and does not compress or degrade your image quality. Your artwork will look exactly the same to viewers, collectors, and clients. The protection only affects how AI models perceive and process the image data.',
            category: 'Protection'
        },
        {
            id: 3,
            question: 'Can I use protected artwork on social media and portfolio sites?',
            answer: 'Yes! Protected artwork can be shared anywhere you normally share your art - Instagram, ArtStation, Behance, Twitter, your personal website, and more. The protection travels with your image file and works across all platforms.',
            category: 'Usage'
        },
        {
            id: 4,
            question: 'What happens to my data and artwork files?',
            answer: 'We never sell your data or artwork. Your files are encrypted during upload and processing. You maintain full ownership and can download or delete your work at any time.',
            category: 'Privacy'
        },
        // {
        //     id: 5,
        //     question: 'How does blockchain ownership verification work?',
        //     answer: 'When you protect your artwork, we create an immutable timestamp record on the blockchain that proves you created the work at a specific date and time. This provides legal evidence of ownership and creation date that cannot be altered or disputed.',
        //     category: 'Ownership'
        // },
        {
            id: 6,
            question: 'Is there a limit to how many artworks I can protect?',
            answer: 'During the beta period, early access members will receive generous protection limits. We will announce specific tier details before the official launch. Our goal is to make protection accessible to all artists regardless of their output volume.',
            category: 'Usage'
        },
        {
            id: 7,
            question: 'What file formats are supported?',
            answer: 'We support JPG or JPEG file format for now. Support for other file format will be added soon.',
            category: 'Technical'
        },
        {
            id: 8,
            question: 'Can AI still see my protected artwork?',
            answer: 'AI models can see the image but cannot accurately learn or replicate your style from it. The cloaking creates confusion in the training process, making it impossible for AI to extract and reproduce your unique artistic characteristics.',
            category: 'Protection'
        }
    ];

    const filteredFAQs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const categories = Array.from(new Set(faqs.map(faq => faq.category)));

    return (
        <section id="faq" className="py-20 md:py-32 bg-gradient-to-b from-[#193546] to-[#0f2533]">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <div className="inline-flex items-center space-x-2 bg-[#0DB8D3]/10 text-[#0DB8D3] px-4 py-2 rounded-full text-sm font-medium">
                        <FileQuestion />
                        <span>FAQ</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                        Your Questions Answered
                    </h2>
                    <p className="text-lg text-gray-400">
                        Everything you need to know about protecting your artwork from AI
                    </p>
                </div>

                {/* FAQ List */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {filteredFAQs.length > 0 ? (
                        filteredFAQs.map((faq) => (
                            <div
                                key={faq.id}
                                className="bg-[#0f2533] rounded-xl border border-[#1B7FDC]/20 overflow-hidden transition-all ease-in-out duration-300 hover:border-[#0DB8D3]/40"
                            >
                                <button
                                    onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                                    className="w-full px-6 py-5 flex items-start justify-between text-left"
                                >
                                    <div className="flex-1 pr-4">
                                        <div className="flex items-center space-x-2 mb-2">
                                            <span className="text-xs font-medium text-[#0DB8D3] bg-[#0DB8D3]/10 px-2 py-1 rounded">
                                                {faq.category}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">
                                            {faq.question}
                                        </h3>
                                    </div>
                                    <ChevronDown size={24} className={`flex-shrink-0 text-gray-400 transition-transform duration-300 ${openFAQ === faq.id ? 'rotate-180' : ''
                                        }`} />
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ${openFAQ === faq.id ? 'max-h-96' : 'max-h-0'
                                        }`}
                                >
                                    <div className="px-6 pb-5 pt-2">
                                        <p className="text-gray-400 leading-relaxed">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <Search size={48} className="text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-400">
                                No questions found matching &quot;{searchQuery}&quot;
                            </p>
                        </div>
                    )}
                </div>

                {/* Category Filter */}
                {/* <div className="max-w-4xl mx-auto mt-8">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        <span className="text-sm text-[#6B7280]">Filter by:</span>
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => {
                                    const firstInCategory = faqs.find(faq => faq.category === category);
                                    if (firstInCategory) setOpenFAQ(firstInCategory.id);
                                }}
                                className="text-sm px-3 py-1 rounded-full bg-[#F8FAFC] border border-[#rgba(124, 58, 237, 0.2)] hover:border-[#rgba(124, 58, 237, 0.2)] text-[#rgba(124, 58, 237, 0.2)] transition-all ease-in-out duration-300 hover:bg-[#rgba(124, 58, 237, 0.2)]"
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div> */}
            </div>
        </section>
    );
};

export default FAQSection;