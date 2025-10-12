import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/hooks/user/auth/useUserProfile';
import { useProductsList } from '@/hooks/useProductsList';
import FollowersAndFollowingPopup from '@/components/Followers&FollowingPopup';
import { useUserFollowersList } from '@/hooks/user/useUserFollowersList';
import { useUserFollowingList } from '@/hooks/user/useUserFollowingList';
import { Routes } from '@/lib/routes';
import MasonryFeed from '@/components/MasonryFeed';
import { Settings, Star, Trophy, Circle, Users, UserPlus2 } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useUserReview } from '@/hooks/user/useUserReview';
import ReviewCard from '@/components/ReviewCard';
import placeholderProfileImage from "@/assets/placeholder-profile-image.jpg"

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { data: userProfile } = useUserProfile();
  const { data: products, isLoading } = useProductsList("/auth/artworks/me");
  const { data: followers } = useUserFollowersList();
  const { data: following } = useUserFollowingList();
  const { data: userReviews } = useUserReview()
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);
  const [openReviewPopup, setOpenReviewPopup] = useState(false);
  const [defaultFollowersFollowingTab, setDefaultFollowersFollowingTab] = useState<'followers' | 'following'>('followers');

  useEffect(() => {
    document.title = 'Profile | Auroraa';
  }, []);

  useEffect(() => {
    // Redirect if user is not authenticated
    if (!isAuthenticated) {
      navigate(Routes.AuthLoginPage, {
        state: { from: location },
        replace: true
      });
    }
  }, [isAuthenticated, navigate, location]);

  const handleReviewClick = () => {
    setOpenReviewPopup(true);
  }

  const handleFollowersFollowingClick = (tab: 'followers' | 'following') => {
    setDefaultFollowersFollowingTab(tab);
    setIsFollowersOpen(true);
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

  return (
    <>
      <div className="max-w-4xl mx-auto p-1 pt-16 pb-20 md:px-4 md:py-8 mb-20 md:mb-0">
        {/* Profile Banner */}
        <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10 bg-gradient-to-r from-[#d9fdf8] via-[#e3e3fc] to-[#f9efff] rounded-sm shadow-lg p-6 md:p-10 mb-4">
          <img
            src={userProfile?.profileImage || placeholderProfileImage}
            alt={userProfile?.name}
            className="w-32 h-32 rounded-full border-4 border-[var(--accent)] object-cover shadow-lg -mt-16 md:mt-0"
          />
          <div className="flex-1 flex flex-col items-center md:items-start">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-1" style={{ fontFamily: 'Poppins' }}>{userProfile?.name}</h2>
            <p className="text-gray-600 text-center md:text-left mb-3">{userProfile?.bio}</p>
            <div className='flex flex-wrap justify-center md:justify-start gap-2'>
              <div onClick={handleReviewClick} className="flex items-center gap-1.5 bg-amber-100 dark:bg-amber-900/30 rounded-full px-2 py-1 cursor-pointer">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="text-xs font-medium text-amber-800 dark:text-amber-200">
                  {userProfile?.avgRating ? userProfile.avgRating.toFixed(1) : 'N/A'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-200 rounded-full px-3 py-1 text-xs font-medium">
                <div className="relative w-3.5 h-3.5">
                  <Circle className="absolute w-full h-full text-emerald-200 dark:text-emerald-700" />
                  <Circle className="absolute w-full h-full text-emerald-500" style={{ clipPath: `inset(0 ${100 - (userProfile?.profile_completion || 0)}% 0 0)` }} />
                </div>
                <span>Profile {userProfile?.profile_completion || 0}%</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/70 text-slate-700 dark:text-slate-200 rounded-full px-3 py-1 text-xs font-medium cursor-pointer transition-colors" onClick={() => handleFollowersFollowingClick('followers')}>
                <Users className="w-3.5 h-3.5" />
                <span className="font-medium">{followers?.users?.length || 0}</span>
                <span className="text-slate-500 dark:text-slate-400">Followers</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/70 text-slate-700 dark:text-slate-200 rounded-full px-3 py-1 text-xs font-medium cursor-pointer transition-colors" onClick={() => handleFollowersFollowingClick('following')}>
                <UserPlus2 className="w-3.5 h-3.5" />
                <span className="font-medium">{following?.users?.length || 0}</span>
                <span className="text-slate-500 dark:text-slate-400">Following</span>
              </div>
              <Link to={`${Routes.SettingsPage}`} className='md:hidden'>
                <Button variant="default" className="rounded-full px-6 font-semibold cursor-pointer"><Settings /></Button>
              </Link>
            </div>
          </div>
          <div className='absolute top-0 right-0'>
            <div className={`flex items-center gap-1.5 text-white rounded-bl-sm px-3 py-1 text-xs font-medium ${getRankBgColor(userProfile?.rank || 0)}`}>
              <Trophy className="w-3.5 h-3.5" />
              <span>Rank {userProfile?.rank || 'N/A'}</span>
            </div>
          </div>
        </div>

        {/* Followers Popup */}
        <FollowersAndFollowingPopup
          open={isFollowersOpen}
          onOpenChange={setIsFollowersOpen}
          followers={followers?.users || []}
          following={following?.users || []}
          defaultTab={defaultFollowersFollowingTab}
        />

        {/* Uploaded Products Grid */}
        <MasonryFeed
          length={products?.length}
          data={products}
          isLoading={isLoading}
          url="/auth/artworks/me"
          // className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full"
          className="grid grid-cols-2 md:grid-cols-4 gap-1 w-full"
        />
      </div >
      <Dialog open={openReviewPopup} onOpenChange={setOpenReviewPopup}>
        <DialogContent className="sm:max-w-[425px]">
          {userReviews?.map((review) => (
            <ReviewCard key={review.id} item={review} />
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
