import { useEffect } from 'react';
import MasonryFeed from '@/components/MasonryFeed';
import { useProductsList } from '@/hooks/useProductsList';
import LoadingSpinner from '@/components/LoadingSpinner';

const ArtworksListingPage = () => {
  const { data: products, isLoading } = useProductsList('/artworks')

  useEffect(() => {
    document.title = 'Artworks | Auroraa';
  }, []);

  return (
    <div className="p-1 mb-24 md:mb-0">
      {isLoading ? <div className='w-[80vw] h-screen flex items-center justify-center'><LoadingSpinner /></div> : <MasonryFeed data={products} isLoading={isLoading} className="grid grid-cols-2 md:grid-cols-4 gap-1 w-full" />}
    </div>
  );
};

export default ArtworksListingPage;
