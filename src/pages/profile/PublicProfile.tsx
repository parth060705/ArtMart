import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useAuth } from '../../hooks/user/auth/UseAuth';
import { Link, useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/hooks/user/auth/useUserProfile';
import { useProductsList } from '@/hooks/useProductsList';
import { Product, User } from '@/lib/types';
import FollowersAndFollowingPopup from '@/components/Followers&FollowingPopup';
import { useUserFollowersList } from '@/hooks/user/useUserFollowersList';
import { useUserFollowingList } from '@/hooks/user/useUserFollowingList';
import { Routes } from '@/lib/routes';
import MasonryFeed from '@/components/MasonryFeed';
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Edit, MessageCircle, Plus, ShoppingCart, Star, Trophy, Upload } from 'lucide-react';
import { useGetUserProfilePublic } from '@/hooks/user/useUserProfilePublic';
import { useParams } from 'react-router-dom';
import { useUserFollow } from '@/hooks/user/usesUserFollow';
import { useUserUnFollow } from '@/hooks/user/useUserUnFollow';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { usePostArtistReview } from '@/hooks/reviews/usePostArtistReview';
import { useUserIsFollowingCheck } from '@/hooks/user/useUserIsFollowingCheck';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import PostReview from '@/components/PostReview';
import placeholderProfileImage from "@/assets/placeholder-profile-image.jpg"
import LoadingSpinner from '@/components/LoadingSpinner';

const Profile = () => {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth();
    const { userId } = useParams<{ userId: string }>();
    const { data: userProfile } = useGetUserProfilePublic(userId || '');
    const { data: products, isLoading } = useProductsList('/' + userProfile?.id + '/artworks');
    const [rating, setRating] = useState<number>(0);
    const [hoverRating, setHoverRating] = useState<number>(0);
    const [reviewText, setReviewText] = useState<string>('');
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const { data: isFollowingCheck } = useUserIsFollowingCheck(userProfile?.id || '');
    const { mutateAsync: postReview, isPending: isReviewing } = usePostArtistReview(userId || '');
    const { mutate: followUser, isPending: isFollowing } = useUserFollow(userProfile?.id || '');
    const { mutate: unfollowUser, isPending: isUnfollowing } = useUserUnFollow(userProfile?.id || '');

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
                artistId: userProfile?.id || '',
                rating,
                comment: reviewText
            });

            // Reset the form
            setRating(0);
            setReviewText('');
            setIsReviewOpen(false);

            // Show success message or refresh reviews
            toast.success('Review submitted successfully!');
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review');
            setIsReviewOpen(false);
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

    const getRankBgColor = (rank: number) => {
        switch (rank) {
            case 1:
                return 'bg-yellow-500';
            case 2:
                return 'bg-slate-200';
            case 3:
                return 'bg-orange-500';
            default:
                return 'bg-gray-500';
        }
    }

    const handleReviewClick = () => {
        if (!isAuthenticated) {
            toast.error('Please log in to review users');
            return;
        }
        setIsReviewOpen(true);
    }

    const handleChatClick = () => {
        if (!isAuthenticated) {
            toast.error('Please log in to chat with users');
            return;
        }
        navigate(`/chat/${userProfile?.username}`);
    }

    useEffect(() => {
        document.title = 'Profile | Auroraa';
    }, []);

    if (!userProfile) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <>
            <div className="max-w-4xl mx-auto p-1 pt-16 pb-20 md:px-4 md:py-8 mb-20 md:mb-0">
                {/* Profile Banner */}
                <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10 bg-gradient-to-r from-[#d9fdf8] via-[#e3e3fc] to-[#f9efff] rounded-sm shadow-lg p-6 md:p-10 mb-4">
                    <img
                        src={userProfile?.profileImage || placeholderProfileImage}
                        alt={userProfile?.name}
                        className="w-32 h-32 rounded-full border-4 border-[var(--primary)] object-cover shadow-lg -mt-16 md:mt-0"
                    />
                    <div className="flex-1 flex flex-col items-center md:items-start">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-1" style={{ fontFamily: 'Poppins' }}>{userProfile?.name}</h2>
                        <p className="text-gray-600 text-center md:text-left mb-3">{userProfile?.bio}</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                            <div className="flex items-center gap-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-full px-2 py-1">
                                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                                <span className="text-xs font-medium text-amber-800 dark:text-amber-200">
                                    {userProfile?.avgRating ? userProfile.avgRating.toFixed(1) : 0}
                                </span>
                            </div>
                            <Button
                                className='px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer'
                                onClick={handleFollowClick}
                                disabled={isFollowLoading}
                            >
                                {isFollowingCheck?.is_following ? 'Unfollow' : 'Follow'}
                            </Button>
                            <Button
                                variant="outline"
                                className='px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer'
                                onClick={handleReviewClick}
                            >
                                Review Artist
                            </Button>
                            <Button
                                variant="outline"
                                className='px-4 py-1.5 rounded-full text-sm font-medium cursor-pointer'
                                onClick={handleChatClick}
                            >
                                <MessageCircle className="w-4 h-4" />
                                Chat
                            </Button>
                        </div>

                    </div>
                    <div className='absolute top-0 right-0'>
                        <div className={`flex items-center gap-1.5 text-white rounded-bl-sm px-3 py-1 text-xs font-medium ${getRankBgColor(userProfile?.rank || 0)}`}>
                            <Trophy className="w-3.5 h-3.5" />
                            <span>Rank {userProfile?.rank || 'N/A'}</span>
                        </div>
                    </div>
                </div>
                <MasonryFeed
                    length={products?.length}
                    data={products}
                    isLoading={isLoading}
                    className="grid grid-cols-2 md:grid-cols-4 gap-1 w-full"
                />
            </div>
            {/* Review Popup */}
            <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
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
                        showTextArea={true}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Profile;
