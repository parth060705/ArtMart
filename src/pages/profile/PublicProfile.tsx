import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useAuth } from '../../hooks/user/auth/UseAuth';
import { Link } from 'react-router-dom';
import { useUserProfile } from '@/hooks/user/auth/useUserProfile';
import { useProductsList } from '@/hooks/useProductsList';
import { Product, User } from '@/lib/types';
import FollowersAndFollowingPopup from '@/components/Followers&FollowingPopup';
import { useUserFollowersList } from '@/hooks/user/useUserFollowersList';
import { useUserFollowingList } from '@/hooks/user/useUserFollowingList';
import { Routes } from '@/lib/routes';
import MasonryFeed from '@/components/MasonryFeed';
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Edit, Plus, ShoppingCart, Upload } from 'lucide-react';
import { useGetUserProfilePublic } from '@/hooks/user/useUserProfilePublic';
import { useParams } from 'react-router-dom';
import { useUserFollow } from '@/hooks/user/usesUserFollow';
import { useUserUnFollow } from '@/hooks/user/useUserUnFollow';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { usePostArtistReview } from '@/hooks/reviews/usePostArtistReview';
import { useUserIsFollowingCheck } from '@/hooks/user/useUserIsFollowingCheck';
import { ReviewPopup } from '@/components/ReviewPopup';

const Profile = () => {
    const { isAuthenticated } = useAuth();
    const { userId } = useParams<{ userId: string }>();
    const { data: userProfile } = useGetUserProfilePublic(userId || '');
    const { data: products, isLoading } = useProductsList('/' + userId + '/artworks');
    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>('');
    const [isSubmittingReview, setIsSubmittingReview] = useState(false);
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const { data: isFollowingCheck } = useUserIsFollowingCheck(userId || '');
    const { mutateAsync: postReview } = usePostArtistReview(userId || '');
    const { mutate: followUser, isPending: isFollowing } = useUserFollow(userId || '');
    const { mutate: unfollowUser, isPending: isUnfollowing } = useUserUnFollow(userId || '');

    const isFollowLoading = isFollowing || isUnfollowing;

    const handlePostReview = async () => {
        try {
            if (!isAuthenticated) {
                toast.error('Please log in to submit a review');
                return;
            }

            if (!userId) {
                throw new Error('Artist ID is required');
            }
            await postReview({
                artistId: userId,
                rating,
                comment: reviewText
            });

            // Reset the form
            setRating(0);
            setReviewText('');
            setIsSubmittingReview(false);

            // Show success message or refresh reviews
            toast.success('Review submitted successfully!');
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review');
            setIsSubmittingReview(false);
        }
    }

    const handleFollowClick = () => {
        if (!isAuthenticated) {
            toast.error('Please log in to follow users');
            return;
        }
        if (isFollowLoading) return;

        const action = isFollowingCheck?.is_following ? unfollowUser : followUser;
        action(undefined, {
            onError: () => {
                toast.error('Failed to update follow status');
            }
        });
    }

    useEffect(() => {
        document.title = 'Profile | Auroraa';
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-1 pt-8 md:px-4 md:py-8">
            {/* Profile Banner */}
            <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10 bg-gradient-to-r from-purple-100 via-white to-blue-100 rounded-3xl shadow-lg p-6 md:p-10 mb-10">
                <img
                    src={userProfile?.profileImage}
                    alt={userProfile?.name}
                    className="w-32 h-32 rounded-full border-4 border-[var(--primary)] object-cover shadow-lg -mt-16 md:mt-0"
                />
                <div className="flex-1 flex flex-col items-center md:items-start">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-1" style={{ fontFamily: 'Poppins' }}>{userProfile?.name}</h2>
                    <p className="text-gray-600 text-center md:text-left mb-3">{userProfile?.bio}</p>
                    <div className="flex gap-2">
                        <Button
                            className='px-4 py-1.5 rounded-full text-sm font-medium'
                            onClick={handleFollowClick}
                            disabled={isFollowLoading}
                        >
                            {isFollowingCheck?.is_following ? 'Unfollow' : 'Follow'}
                        </Button>
                        <Button
                            variant="outline"
                            className='px-4 py-1.5 rounded-full text-sm font-medium'
                            onClick={() => setIsReviewOpen(true)}
                            disabled={!isAuthenticated}
                        >
                            Review Artist
                        </Button>
                    </div>

                </div>
            </div>

            {/* Review Popup */}
            <ReviewPopup
                isOpen={isReviewOpen}
                onOpenChange={setIsReviewOpen}
                rating={rating}
                setRating={setRating}
                hoverRating={hoverRating}
                setHoverRating={setHoverRating}
                reviewText={reviewText}
                setReviewText={setReviewText}
                isReviewing={isSubmittingReview}
                handlePostReview={handlePostReview}
                showTextArea={false}
            />
            <div className="mt-6">
                <MasonryFeed
                    length={products?.length}
                    data={products}
                    isLoading={isLoading}
                    className="grid grid-cols-2 md:grid-cols-4 gap-1 w-full"
                />
            </div>
        </div>
    );
}

export default Profile;
