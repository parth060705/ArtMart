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


const Profile = () => {
    const {isAuthenticated} = useAuth();
    const { userId } = useParams<{ userId: string }>();
    const { data: userProfile } = useGetUserProfilePublic(userId || '');
    const { data: products, isLoading } = useProductsList("/artworks/" + userId || '');
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [isFollowLoading, setIsFollowLoading] = useState<boolean>(false);
    const { mutate: followUser } = useUserFollow(userId || '');
    const { mutate: unfollowUser } = useUserUnFollow(userId || '');

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
                    <Button
                        className='px-4 py-1.5 rounded-full text-sm font-medium'
                        onClick={() => {
                            if (!isAuthenticated) {
                                toast.error('Please log in to follow users');
                                return;
                            }
                            if (isFollowLoading) return;
                            setIsFollowLoading(true);
                            const action = isFollowing ? unfollowUser : followUser;
                            action(undefined, {
                                onSuccess: () => {
                                    setIsFollowing(!isFollowing);
                                    setIsFollowLoading(false);
                                },
                                onError: () => {
                                    setIsFollowLoading(false);
                                    toast.error('Failed to update follow status');
                                }
                            });
                        }}
                        disabled={isFollowLoading}
                    >
                        {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                </div>
            </div>

            {/* Uploaded Products Grid */}
            <div>
                <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Poppins' }}>Uploaded Artworks</h3>
                <MasonryFeed
                    length={products?.length}
                    data={products}
                    isLoading={isLoading}
                    className="grid grid-cols-2 md:grid-cols-4 gap-1 w-full"
                />
            </div>
        </div>
    );
};

export default Profile;
