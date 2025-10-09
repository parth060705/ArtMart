import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useUserProfile } from '@/hooks/user/auth/useUserProfile';
import { useProductsList } from '@/hooks/useProductsList';
import FollowersAndFollowingPopup from '@/components/Followers&FollowingPopup';
import { useUserFollowersList } from '@/hooks/user/useUserFollowersList';
import { useUserFollowingList } from '@/hooks/user/useUserFollowingList';
import { Routes } from '@/lib/routes';
import MasonryFeed from '@/components/MasonryFeed';
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { Edit, Plus, ShoppingCart } from 'lucide-react';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/user/auth/UseAuth';

const Profile = () => {
  const { logout } = useAuth();
  const { data: userProfile } = useUserProfile();
  const { data: products, isLoading } = useProductsList("/auth/artworks/me");
  const { data: followers } = useUserFollowersList();
  const { data: following } = useUserFollowingList();
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully!');
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };

  useEffect(() => {
    document.title = 'Profile | Auroraa';
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-1 pt-16 pb-20 md:px-4 md:py-8">
      {/* Profile Banner */}
      <div className="relative flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10 bg-gradient-to-r from-[#b3f7e6] via-[#b7baf4] to-[#f0d7fb] rounded-3xl shadow-lg p-6 md:p-10 mb-10">
        <img
          src={userProfile?.profileImage}
          alt={userProfile?.name}
          className="w-32 h-32 rounded-full border-4 border-[var(--primary)] object-cover shadow-lg -mt-16 md:mt-0"
        />
        <div className="flex-1 flex flex-col items-center md:items-start">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-1" style={{ fontFamily: 'Poppins' }}>{userProfile?.name}</h2>
          <p className="text-gray-600 text-center md:text-left mb-3">{userProfile?.bio}</p>
          <div className='flex gap-2'>
            <Link to={`/me/profile/${userProfile?.username}/update`}>
              <Button variant="default" className="rounded-full px-6 font-semibold cursor-pointer"><Edit /></Button>
            </Link>
            <Link to={`/${Routes.UploadProductPage}`}>
              <Button variant="default" className="rounded-full px-6 font-semibold cursor-pointer"><Plus /></Button>
            </Link>
            {/* <Link to={`/${Routes.CartPage}`}>
              <Button variant="default" className="rounded-full px-6 font-semibold cursor-pointer"><ShoppingCart /></Button>
            </Link> */}
            <Button
              variant="ghost"
              className="bg-red-600 text-white rounded-full px-3 font-semibold cursor-pointer md:hidden"
              onClick={handleLogout}
            >
              Log Out
            </Button>
            <ThemeSwitcher />

          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex justify-center md:justify-start gap-10 mb-10">
        <div className="flex flex-col items-center cursor-pointer" onClick={() => setIsFollowersOpen(true)}>
          <span className="text-xl font-bold" style={{ fontFamily: 'Poppins' }}>{followers?.users?.length}</span>
          <span className="text-gray-500 text-sm">Followers</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => setIsFollowersOpen(true)}>
          <span className="text-xl font-bold" style={{ fontFamily: 'Poppins' }}>{following?.users?.length}</span>
          <span className="text-gray-500 text-sm">Following</span>
        </div>
      </div>

      {/* Followers Popup */}
      <FollowersAndFollowingPopup
        open={isFollowersOpen}
        onOpenChange={setIsFollowersOpen}
        followers={followers?.users || []}
        following={following?.users || []}
      />

      {/* Uploaded Products Grid */}
      <div>
        <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Poppins' }}>Uploaded Artworks</h3>
        <MasonryFeed
          length={products?.length}
          data={products}
          isLoading={isLoading}
          url="/auth/artworks/me"
          // className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full"
          className="grid grid-cols-2 md:grid-cols-4 gap-1 w-full"
        />
      </div>
    </div>
  );
};

export default Profile;
