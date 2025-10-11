import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import PostReview from './PostReview';
import { PostReviewProps } from '@/lib/types';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { Link } from 'react-router-dom';

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
    const { isAuthenticated } = useAuth();
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] space-y-4">
                <h3 className="text-lg font-medium">Review Artist</h3>
                {!isAuthenticated ? (
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600 mb-2">Log in to leave a review</p>
                        <Link
                            to="/login"
                            className="text-sm font-medium text-blue-600 hover:underline"
                        >
                            Log In
                        </Link>
                    </div>
                ) : (
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
                )}
            </DialogContent>
        </Dialog>
    );
}
