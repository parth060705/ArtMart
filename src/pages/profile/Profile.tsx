import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useAuth } from '../../hooks/UseAuth';
import { Link } from 'react-router-dom';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useProductsList } from '@/hooks/useProductsList';
import { Product, User } from '@/lib/types';
import FollowersAndFollowingPopup from '@/components/Followers&FollowingPopup';
import { useUserFollowersList } from '@/hooks/useUserFollowersList';
import { useUserFollowingList } from '@/hooks/useUserFollowingList';
import { Routes } from '@/lib/routes';

const Profile = () => {
  const { data: userProfile } = useUserProfile();
  const { data: products } = useProductsList();
  const { data: followers } = useUserFollowersList();
  const { data: following } = useUserFollowingList();
  const [isFollowersOpen, setIsFollowersOpen] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
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
          <div className='flex gap-2'>
            <Link to={`/profile/${userProfile?.username}/update`}>
              <Button variant="default" className="rounded-full px-6 font-semibold cursor-pointer">Edit Profile</Button>
            </Link>
            <Link to={Routes.UploadProductPage}>
              <Button variant="default" className="rounded-full px-6 font-semibold cursor-pointer">Upload Artwork</Button>
            </Link>
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
        <div className="grid md:gap-8 gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3">
          {products?.map((product: Product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
