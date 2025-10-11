import ArtworkCard from '@/components/ArtworkCard';
import MasonryFeed from '@/components/MasonryFeed'
import { useProductsList } from '@/hooks/useProductsList';
import { useUserProfile } from '@/hooks/user/auth/useUserProfile';
import { Product } from '@/lib/types';
import React, { useEffect } from 'react'
import LoadingSpinner from '@/components/LoadingSpinner';

const HomePage = () => {
  const { data: userProfile } = useUserProfile();
  const { data: artworks, isLoading } = useProductsList(userProfile ? '/auth/homefeed' : '/artworks')

  useEffect(() => {
    document.title = 'Home | Auroraa';
  }, []);

  return (
    <div className="flex flex-col items-center py-2 mb-20 md:mb-0">
      {
        isLoading ? <LoadingSpinner /> : artworks?.map((artwork: Product) => <ArtworkCard key={artwork.id} {...artwork} />)
      }
    </div>
  )
}

export default HomePage