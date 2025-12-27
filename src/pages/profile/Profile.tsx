import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUserProfile } from '@/hooks/user/auth/useUserProfile';
import { useProductsList } from '@/hooks/useProductsList';
import FollowersAndFollowingPopup from '@/components/Followers&FollowingPopup';
import { useUserFollowersList } from '@/hooks/user/useUserFollowersList';
import { useUserFollowingList } from '@/hooks/user/useUserFollowingList';
import { Routes } from '@/lib/routes';
import MasonryFeed from '@/components/MasonryFeed';
import { Settings, Star, Trophy } from 'lucide-react';
import { useAuth } from '@/hooks/user/auth/UseAuth';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useUserReview } from '@/hooks/user/useUserReview';
import ReviewCard from '@/components/ReviewCard';
import placeholderProfileImage from '@/assets/placeholder-profile-image.jpg';
import LoadingSpinner from '@/components/LoadingSpinner';

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const { data: userProfile } = useUserProfile();
  const { data: products, isLoading } = useProductsList(
    '/auth/artworks/me',
    'get-user-artworks'
  );
  const { data: followers } = useUserFollowersList();
  const { data: following } = useUserFollowingList();
  const { data: userReviews } = useUserReview();

  const [isFollowersOpen, setIsFollowersOpen] = useState(false);
  const [defaultFollowersFollowingTab, setDefaultFollowersFollowingTab] =
    useState<'followers' | 'following'>('followers');
  const [openReviewPopup, setOpenReviewPopup] = useState(false);

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
  };

  useEffect(() => {
    document.title = 'Profile | Auroraa';
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(Routes.AuthLoginPage, { state: { from: location }, replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  if (!userProfile) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {/* ================= FIXED HERO BACKGROUND ================= */}
      <div className="fixed top-0 left-0 h-[100vh] w-full z-0">
        <img
          src={userProfile.profileImage || placeholderProfileImage}
          alt={userProfile.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* ================= SCROLLING CONTENT ================= */}
      <div className="relative z-10">
        {/* HERO INFO (SCROLLS) */}
        <div className="min-h-[70vh] flex flex-col justify-end px-6 pb-8 text-white gap-4 max-w-5xl mx-auto">
          {/* Settings */}
          <div className="absolute top-4 right-4 z-20">
            <Link to="/settings">
              <Button size="icon" variant="secondary" className="rounded-full text-white bg-white/25">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="flex gap-4 items-center">
            <img
              src={userProfile.profileImage || placeholderProfileImage}
              className="w-20 h-20 rounded-full object-cover border"
            />
            <div>
              <h1 className="text-2xl font-bold">{userProfile.name}</h1>
              <p className="text-sm text-white/80">
                {userProfile.location || 'No location added yet'}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6 text-center">
            <div
              className="cursor-pointer"
              onClick={() => {
                setDefaultFollowersFollowingTab('followers');
                setIsFollowersOpen(true);
              }}
            >
              <p className="text-lg font-semibold">{followers?.users?.length || 0}</p>
              <p className="text-xs text-white/70">Followers</p>
            </div>

            <div
              className="cursor-pointer"
              onClick={() => {
                setDefaultFollowersFollowingTab('following');
                setIsFollowersOpen(true);
              }}
            >
              <p className="text-lg font-semibold">{following?.users?.length || 0}</p>
              <p className="text-xs text-white/70">Following</p>
            </div>

            <div className="cursor-pointer" onClick={() => setOpenReviewPopup(true)}>
              <p className="text-lg font-semibold flex items-center gap-1 justify-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {userProfile.avgRating?.toFixed(1) || '0.0'}
              </p>
              <p className="text-xs text-white/70">Rating</p>
            </div>

            <div
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded ${getRankBgColor(
                userProfile.rank || 0
              )}`}
            >
              <Trophy className="w-3.5 h-3.5" />
              Rank {userProfile.rank || 'N/A'}
            </div>
          </div>

          {/* Bio */}
          <div>
            <p className="text-xs text-white/70">Bio</p>
            <p className="text-xs max-w-md">
              {userProfile.bio || 'No bio added yet'}
            </p>
          </div>
        </div>

        {/* ================= FEED ================= */}
        {/* <div className="bg-background pt-6"> */}
          <div className="max-w-5xl mx-auto px-2 md:px-0">
            <MasonryFeed
              length={products?.length}
              data={products}
              isLoading={isLoading}
              className="grid grid-cols-2 md:grid-cols-4 gap-2"
              showLikeCount
            />
          </div>
        {/* </div> */}
      </div>

      {/* ================= MODALS ================= */}
      <FollowersAndFollowingPopup
        open={isFollowersOpen}
        onOpenChange={setIsFollowersOpen}
        followers={followers?.users || []}
        following={following?.users || []}
        defaultTab={defaultFollowersFollowingTab}
      />

      <Dialog open={openReviewPopup} onOpenChange={setOpenReviewPopup}>
        <DialogContent className="sm:max-w-[425px]">
          {userReviews?.map((review) => (
            <ReviewCard
              key={review.id}
              item={review}
              handleRedirectToProfile={() =>
                navigate(`/profile/${review.reviewer.username}`)
              }
            />
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Profile;
