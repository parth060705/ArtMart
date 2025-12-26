// import AppImage from '@/components/ui/AppImage';
// import Icon from '@/components/ui/AppIcon';

import AppImage from "./AppImage";

interface ProblemCard {
    id: number;
    title: string;
    description: string;
    statistic: string;
    image: string;
    alt: string;
    quote: string;
    author: string;
}

const ProblemValidation = () => {
    const problemCards: ProblemCard[] = [
        {
            id: 1,
            title: 'AI Training Without Consent',
            description: 'Your artwork is being used to train AI models without your permission or compensation.',
            statistic: '73% of artists report unauthorized AI training',
            image: "https://images.unsplash.com/photo-1715678077681-e4163401e7a3",
            alt: 'Digital artist working on tablet with stylus creating colorful illustration in modern studio',
            quote: 'I spent years developing my style, and now AI copies it in seconds.',
            author: 'Sarah Chen, Illustrator'
        },
        {
            id: 2,
            title: 'Style Replication',
            description: 'AI systems can replicate your unique artistic style, undermining your creative identity.',
            statistic: '89% feel powerless against AI copying',
            image: "https://images.unsplash.com/photo-1680405690224-bf6299860b85",
            alt: 'Close-up of artist hands painting vibrant abstract artwork with brushes and palette',
            quote: 'My signature style is now available to anyone with a prompt.',
            author: 'Marcus Rodriguez, Digital Artist'
        },
        {
            id: 3,
            title: 'Lost Opportunities',
            description: 'Clients choose AI-generated alternatives over commissioning original work from artists.',
            statistic: '64% report decreased commission requests',
            image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d287beef-1765461742630.png",
            alt: 'Female graphic designer looking concerned while reviewing work on computer screen in home office',
            quote: 'I lost three clients this month to AI-generated art.',
            author: 'Emily Watson, Freelance Designer'
        }];


    return (
        <section id="problem" className="py-16 lg:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="max-w-3xl mx-auto text-center mb-12 lg:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
                        The Problem Is Real
                    </h2>
                    <p className="text-lg sm:text-xl text-muted-foreground">
                        Artists worldwide are facing unprecedented challenges from AI art generation. Your concerns are valid.
                    </p>
                </div>

                {/* Problem Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {problemCards.map((card) =>
                        <div
                            key={card.id}
                            className="group bg-card rounded-xl overflow-hidden shadow-aurora hover:shadow-aurora-strong transition-aurora">

                            {/* Card Image */}
                            <div className="relative h-48 overflow-hidden">
                                <AppImage
                                    src={card.image}
                                    alt={card.alt}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h3 className="text-xl font-bold text-white mb-1">{card.title}</h3>
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 space-y-4">
                                <p className="text-foreground">{card.description}</p>

                                {/* Statistic */}
                                <div className="flex items-center space-x-2 p-3 bg-error/10 rounded-lg">
                                    {/* <Icon name="ExclamationTriangleIcon" size={20} className="text-error flex-shrink-0" /> */}
                                    <p className="text-sm font-semibold text-error">{card.statistic}</p>
                                </div>

                                {/* Artist Quote */}
                                <div className="pt-4 border-t border-border">
                                    <blockquote className="text-sm italic text-muted-foreground mb-2">
                                        &quot;{card.quote}&quot;
                                    </blockquote>
                                    <p className="text-xs font-medium text-foreground">— {card.author}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Empathy Message */}
                <div className="mt-12 max-w-2xl mx-auto text-center p-6 bg-muted/50 rounded-xl">
                    {/* <Icon name="HeartIcon" size={32} className="text-primary mx-auto mb-4" /> */}
                    <p className="text-lg text-foreground">
                        We understand your frustration and fear. These feelings are completely valid, and you deserve protection and support.
                    </p>
                </div>
            </div>
        </section>);

};

export default ProblemValidation;