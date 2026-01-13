import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ThumbsDown, Send, MessageSquare } from 'lucide-react';

interface FeedbackCardProps {
    onFeedbackSubmit: (rating: 'positive' | 'negative', comment: string) => void;
    className?: string;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ onFeedbackSubmit, className = '' }) => {
    const [rating, setRating] = useState<'positive' | 'negative' | null>(null);
    const [comment, setComment] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = () => {
        if (rating) {
            onFeedbackSubmit(rating, comment);
            setIsSubmitted(true);
        }
    };

    if (isSubmitted) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`bg-[#0f1115]/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl text-center ${className}`}
            >
                <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Send className="w-6 h-6" />
                </div>
                <h3 className="text-white font-semibold text-lg">Thank You!</h3>
                <p className="text-gray-400 text-sm">Your feedback helps us improve.</p>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-[#0f1115]/90 backdrop-blur-xl border border-white/10 p-6 rounded-2xl ${className}`}
        >
            <h3 className="text-white font-semibold text-lg mb-4 text-center">How was your experience?</h3>

            <div className="flex justify-center gap-4 mb-6">
                <button
                    onClick={() => setRating('positive')}
                    className={`p-4 rounded-xl border transition-all duration-300 group ${rating === 'positive'
                        ? 'bg-green-500/20 border-green-500 text-green-500'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                >
                    <ThumbsUp className={`w-8 h-8 ${rating === 'positive' ? 'fill-current' : ''}`} />
                </button>
                <button
                    onClick={() => setRating('negative')}
                    className={`p-4 rounded-xl border transition-all duration-300 group ${rating === 'negative'
                        ? 'bg-red-500/20 border-red-500 text-red-500'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white'
                        }`}
                >
                    <ThumbsDown className={`w-8 h-8 ${rating === 'negative' ? 'fill-current' : ''}`} />
                </button>
            </div>

            <AnimatePresence>
                {rating && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 overflow-hidden"
                    >
                        <div className="relative">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Tell us more about your experience... (optional)"
                                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#0DB8D3] focus:ring-1 focus:ring-[#0DB8D3] resize-none h-24 text-sm"
                            />
                            <MessageSquare className="absolute right-3 top-3 w-4 h-4 text-gray-600 pointer-events-none" />
                        </div>

                        <button
                            onClick={handleSubmit}
                            className="w-full py-3 bg-gradient-to-r from-[#1B7FDC] to-[#0DB8D3] hover:from-[#156abc] hover:to-[#0aa3bb] text-white font-semibold rounded-xl shadow-lg hover:shadow-[#0DB8D3]/20 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <span>Submit Feedback</span>
                            <Send className="w-4 h-4" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default FeedbackCard;
