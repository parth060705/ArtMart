import { PostReviewProps } from '@/lib/types'
import React from 'react'

const PostReview = ({
    rating,
    setRating,
    hoverRating,
    setHoverRating,
    reviewText,
    setReviewText,
    isReviewing,
    handlePostReview,
    showTextArea
}: PostReviewProps) => {
    return (
        <div>
            <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map(star => (
                    <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className={(hoverRating || rating) >= star ? 'text-amber-400' : 'text-gray-400'}
                    >
                        ★
                    </button>
                ))}
            </div>
           {showTextArea && <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
                className="w-full p-2 rounded border bg-[var(--muted)]"
            />}
            <button
                onClick={handlePostReview}
                disabled={isReviewing}
                className="mt-2 px-4 py-1 bg-[var(--primary)] text-white rounded"
            >
                {isReviewing ? 'Submitting...' : 'Submit Review'}
            </button>
        </div>
    )
}

export default PostReview
