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
      <section className="md:my-5 mb-3 md:rounded-2xl bg-card ring-1 ring-border p-6">
        <h2 className="text-md font-semibold">Do artists need AI protection?</h2>
        <p className="mt-2 text-foreground/80">
          We are building tool that keeps your art visually safe and protected from AI style theft.
        </p>
        <a
          href="https://app.youform.com/forms/wz18crkh"
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground shadow hover:opacity-95"
        >
          Take the short survey
        </a>
      </section>
      {
        isLoading ? <LoadingSpinner /> : artworks?.map((artwork: Product) => <ArtworkCard key={artwork.id} {...artwork} />)
      }
    </div>
  )
}

export default HomePage