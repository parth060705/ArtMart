import { useState } from 'react';
import FilterSidebar from '@/components/FilterSidebar';
import { useProductSearchContext } from '@/context/ProductSearchContext';
import MasonryFeed from '@/components/MasonryFeed';

const ArtworksListingPage = () => {
  const { selectedCategory, selectedLocation, priceRange, setSelectedCategory, setSelectedLocation, setPriceRange } = useProductSearchContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans" style={{ fontFamily: 'Poppins' }}>
      <div className="w-full mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8 relative">
          <div className="flex-1 flex flex-col gap-6">
            <div className="w-full">
              <MasonryFeed className="grid grid-cols-3 md:grid-cols-4 gap-1 w-full" />
            </div>
            {sidebarOpen && (
              <div className="fixed inset-0 z-50 flex">
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setSidebarOpen(false)} aria-label="Close filters" />
                <aside className="relative ml-auto w-80 max-w-full h-full bg-[var(--card)] shadow-xl p-6 flex flex-col gap-8 animate-slide-in-right" style={{ fontFamily: 'Poppins' }}>
                  <button
                    className="absolute top-4 right-4 text-2xl font-bold text-[var(--primary)] hover:text-[var(--primary-foreground)]"
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close filters"
                  >
                    x
                  </button>
                  <div className="flex-1 flex flex-col">
                    <FilterSidebar
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      selectedLocation={selectedLocation}
                      setSelectedLocation={setSelectedLocation}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                    />
                  </div>
                </aside>
                <style>{`
                  @keyframes slide-in-right {
                    0% { transform: translateX(100%); opacity: 0; }
                    100% { transform: translateX(0); opacity: 1; }
                  }
                  .animate-slide-in-right {
                    animation: slide-in-right 0.3s cubic-bezier(.4,0,.2,1) both;
                  }
                `}</style>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworksListingPage;
