import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import PostReview from './PostReview';
import { PostReviewProps } from '@/lib/types';

interface ReviewPopupProps extends PostReviewProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export function ReviewPopup({
    isOpen,
    onOpenChange,
    rating,
    setRating,
    hoverRating,
    setHoverRating,
    reviewText,
    setReviewText,
    isReviewing,
    handlePostReview,
    showTextArea
}: ReviewPopupProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] space-y-4">
                <h3 className="text-lg font-medium">Review Artist</h3>
                <PostReview
                    rating={rating}
                    setRating={setRating}
                    hoverRating={hoverRating}
                    setHoverRating={setHoverRating}
                    reviewText={reviewText}
                    setReviewText={setReviewText}
                    isReviewing={isReviewing}
                    handlePostReview={handlePostReview}
                    showTextArea={showTextArea} 
                />
            </DialogContent>
        </Dialog>
    );
}
