import ArtworkCard from '@/components/ArtworkCard';
import MasonryFeed from '@/components/MasonryFeed'
import { useProductsList } from '@/hooks/useProductsList';
import { useUserProfile } from '@/hooks/user/auth/useUserProfile';
import { Product } from '@/lib/types';
import React from 'react'
import CircularLoader from '@/components/CircularLoader';

const HomePage = () => {
  const { data: userProfile } = useUserProfile();
  const { data: artworks, isLoading } = useProductsList(userProfile ? '/auth/homefeed' : '/artworks')
  return (
    <div className="flex flex-col items-center py-2">
      {
        isLoading ? <CircularLoader /> : artworks?.map((artwork: Product) => <ArtworkCard key={artwork.id} {...artwork} />)
      }
    </div>
  )
}

export default HomePage