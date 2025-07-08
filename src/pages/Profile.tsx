import React from 'react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { useAuth } from '../hooks/UseAuth';
import { Link } from 'react-router-dom';
import { useUserProfile } from '@/query/hooks/useUserProfile';
import { useProductsList } from '@/query/hooks/useProductsList';
// import { useUserContext } from '../context/context';

const Profile = () => {
  const { data: userProfile } = useUserProfile();
  const {data:products} = useProductsList()
  console.log(products)

  // Mock uploaded products
  const uploadedProducts = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308',
      caption: 'Sunset #nature #art',
      name: 'Sunset',
      profileImage: userProfile?.profileImage,
      user: userProfile?.name || '',
      description: 'A beautiful sunset.',
      price: '$120',
      likes: 12,
      comments: 3,
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
      caption: 'Forest walk #green #relax',
      name: 'Forest Walk',
      profileImage: userProfile?.profileImage,
      user: userProfile?.name || '',
      description: 'A walk in the forest.',
      price: '$90',
      likes: 8,
      comments: 1,
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca',
      caption: 'City lights #nightlife #urban',
      name: 'City Lights',
      profileImage: userProfile?.profileImage,
      user: userProfile?.name || '',
      description: 'Night cityscape.',
      price: '$150',
      likes: 20,
      comments: 5,
    },
  ];

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
            <Link to="/edit-profile">
              <Button variant="default" className="rounded-full px-6 font-semibold cursor-pointer">Edit Profile</Button>
            </Link>
            <Link to="/upload">
              <Button variant="default" className="rounded-full px-6 font-semibold cursor-pointer">Upload Artwork</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex justify-center md:justify-start gap-10 mb-10">
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold" style={{ fontFamily: 'Poppins' }}>{userProfile?.followers}</span>
          <span className="text-gray-500 text-sm">Followers</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xl font-bold" style={{ fontFamily: 'Poppins' }}>{userProfile?.following}</span>
          <span className="text-gray-500 text-sm">Following</span>
        </div>
      </div>

      {/* Uploaded Products Grid */}
      {/* <div>
        <h3 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Poppins' }}>Uploaded Artworks</h3>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {uploadedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Profile;
