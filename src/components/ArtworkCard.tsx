import React, { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Bookmark, MoreHorizontal, Send } from 'lucide-react';
import { Product } from '@/lib/types';
import { Link, useNavigate } from "react-router-dom";
import { Routes } from "@/lib/routes";
import { useLikeProduct } from '@/hooks/like_dislike/useLikeProduct';
import { useDisLikeProduct } from '@/hooks/like_dislike/useDislikeProduct';
import { useQueryClient } from '@tanstack/react-query';
import { useUserLikeStatus } from '@/hooks/like_dislike/useUserLikeStatus';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { useSaveArtwork } from '@/hooks/useSaveArtworks';
import { useUnSaveArtworks } from '@/hooks/useUnSaveArtworks';


const ArtworkCard = ({
    images,
    artist,
    title,
    description,
    likes,
    comments,
    // hashtags,
    createdAt,
    how_many_like,
    id,
    isSaved
}: Product) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [likeAnimating, setLikeAnimating] = useState(false);
    const [justOptimisticallyLiked, setJustOptimisticallyLiked] = useState(false);
    const [isLocalLiked, setIsLocalLiked] = useState<boolean>(false);
    const [localLikeCount, setLocalLikeCount] = useState<number>(0);
    const [isLocalSaved, setIsLocalSaved] = useState<boolean>(isSaved || false);
    const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
    const { data: likeStatus } = useUserLikeStatus(id || '');
    const { mutate: likeProduct } = useLikeProduct(id || '');
    const { mutate: dislikeProduct } = useDisLikeProduct(id || '');
    const { mutateAsync: addToSaved, isPending: isWishListPending } = useSaveArtwork(id || '');
    const { mutateAsync: removeFromSaved, isPending: isUnSavePending } = useUnSaveArtworks(id || '');

    useEffect(() => {
        if (!justOptimisticallyLiked) {
            if (likeStatus) setIsLocalLiked(likeStatus.has_liked);
            if (how_many_like?.like_count !== undefined) {
                setLocalLikeCount(how_many_like.like_count);
            }
        }
    }, [likeStatus, how_many_like, justOptimisticallyLiked]);

    const handleLikeButtonClick = () => {
        if (!isAuthenticated) {
            toast.error('Please login to like this artwork');
            return;
        }

        if (likeAnimating) return;
        setLikeAnimating(true);
        setJustOptimisticallyLiked(true);

        const wasLiked = isLocalLiked;
        const prevCount = localLikeCount;
        const newCount = wasLiked ? Math.max(0, prevCount - 1) : prevCount + 1;

        setIsLocalLiked(!wasLiked);
        setLocalLikeCount(newCount);

        queryClient.setQueryData(['like', id], { has_liked: !wasLiked });
        queryClient.setQueryData(['productDetails', id], (old: any) => ({
            ...old,
            how_many_like: { ...old?.how_many_like, like_count: newCount }
        }));

        const mutation = wasLiked ? dislikeProduct : likeProduct;
        mutation(undefined, {
            onError: () => {
                setIsLocalLiked(wasLiked);
                setLocalLikeCount(prevCount);
                toast.error('Failed to update like. Please try again.');
            },
            onSettled: () => {
                setJustOptimisticallyLiked(false);
                queryClient.invalidateQueries({ queryKey: ['productDetails', id] });
                queryClient.invalidateQueries({ queryKey: ['like', id] });
            },
        });
        setLikeAnimating(false);
    };

    const handleSaveButtonClick = () => {
        if (!isAuthenticated) {
            toast.error('Please login to save this artwork');
            return;
        }
        if (isSaveLoading || isUnSavePending) return;

        const wasSaved = isLocalSaved;
        const newSavedState = !wasSaved;

        // Optimistic update
        setIsLocalSaved(newSavedState);
        setIsSaveLoading(true);

        // Call the appropriate mutation based on the current state
        const mutation = wasSaved ? removeFromSaved : addToSaved;

        mutation(undefined, {
            onError: () => {
                // Revert on error
                setIsLocalSaved(wasSaved);
                toast.error(`Failed to ${wasSaved ? 'unsave' : 'save'} artwork. Please try again.`);
            },
            onSuccess: () => {
                toast.success(`Artwork ${wasSaved ? 'removed from' : 'saved to'} your collection`);
            },
            onSettled: () => {
                setIsSaveLoading(false);
                queryClient.invalidateQueries({ queryKey: ['productDetails', id] });
                queryClient.invalidateQueries({ queryKey: ['save', id] });
            },
        });
    };

    return (
        <div className="md:bg-white md:rounded-xl mb-8  overflow-hidden min-w-full md:min-w-[500px] md:max-w-[500px]">
            {/* Header with profile and options */}
            <div className="flex items-center justify-between p-2">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500 p-0.5">
                        <img
                            src={artist.profileImage}
                            alt={artist.username}
                            className="w-full h-full object-cover rounded-full"
                        />
                    </div>
                    <Link to={`${Routes.ProfilePublicPage}/${artist.username}`} className="font-semibold text-gray-800 hover:underline">{artist.username}</Link>
                </div>
                {/* <button className="text-gray-500 hover:text-gray-800">
                    <MoreHorizontal size={20} />
                </button> */}
            </div>

            {/* Artwork Image */}
            <div className="relative w-full aspect-square bg-gray-100 md:min-w-[500px] md:max-w-[500px]" onClick={() => navigate(`/${Routes.ProductDetailPage}/${id}`)}>
                <img
                    src={images[0].url}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                {/* Mobile: Always show title with stronger gradient */}
                <div className="md:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-4 pt-8">
                    <h3 className="text-white text-lg font-bold drop-shadow-lg">{title}</h3>
                </div>
                {/* Desktop: Show on hover with stronger gradient */}
                <div className="hidden md:flex absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 items-end p-6">
                    <h3 className="text-white text-xl font-bold drop-shadow-lg">{title}</h3>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex space-x-4">
                        <button
                            onClick={handleLikeButtonClick}
                            className="flex items-center gap-2"
                        >
                            <Heart
                                className={`w-7 h-7 ${isLocalLiked
                                    ? "fill-red-500 text-red-500"
                                    : "text-[var(--muted-foreground)]"
                                    }`}
                            />
                            <span className="text-lg">{localLikeCount}</span>
                        </button>
                        {/* <button className="p-1.5 text-gray-700 rounded-full hover:bg-gray-100">
                            <MessageCircle size={24} />
                        </button> */}
                        {/* <button className="p-1.5 text-gray-700 rounded-full hover:bg-gray-100">
                            <Send size={24} />
                        </button> */}
                    </div>
                    <Bookmark size={24} className={`w-7 h-7 ${isSaved || isLocalSaved
                        ? "fill-black text-black"
                        : "text-[var(--muted-foreground)]"
                        }`}
                        onClick={handleSaveButtonClick}
                    />
                </div>

                {/* Likes and Description */}
                <div className="space-y-2">
                    <div className="text-gray-800">
                        {description}
                    </div>

                    {/* Hashtags */}
                    {/* <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className="text-blue-600 text-sm hover:underline cursor-pointer"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div> */}

                    {/* Comments */}
                    {comments > 0 && (
                        <button className="text-gray-500 text-sm">
                            View all {comments} comments
                        </button>
                    )}

                    {/* Timestamp */}
                    <p className="text-gray-400 text-xs">
                        {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ArtworkCard;