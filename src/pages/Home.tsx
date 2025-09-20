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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans" style={{ fontFamily: 'Poppins' }}>
      <div className="max-auto flex flex-col justify-center items-center w-full">
        {
          isLoading ? <CircularLoader /> : artworks?.map((artwork: Product) => <ArtworkCard key={artwork.id} {...artwork} />)
        }
      </div>
    </div>
  )
}

export default HomePage