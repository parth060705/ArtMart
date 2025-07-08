import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterSidebar from '@/components/FilterSidebar';
import ProductSearchBar from '@/components/ProductSearchBar';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { useProductsList } from '@/query/hooks/useProductsList';
import { Product } from '@/lib/types';

const ProductListingPage = () => {
  const {data:products} = useProductsList()
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const navigate = useNavigate();

  // Filter logic
  const filteredProducts = products?.filter((prod:Product) => {
    const matchesCategory = !selectedCategory || prod.category === selectedCategory;
    const matchesLocation = !selectedLocation || prod.location === selectedLocation;
    const matchesPrice = (!priceRange[0] || prod.price >= priceRange[0]) &&
      (!priceRange[1] || prod.price <= priceRange[1]);
      const matchesSearch = prod.title.toLowerCase().includes(search.toLowerCase()) 
        // prod.user.toLowerCase().includes(search.toLowerCase()) ||
        // prod.caption.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesLocation && matchesPrice && matchesSearch;
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans" style={{ fontFamily: 'Poppins' }}>
      <div className="w-full mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8 relative">
          <div className="flex-1 flex flex-col gap-6">
            <div className="w-full">
              <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-6 [column-fill:_balance]"><div className="[&>*]:mb-6">
                {filteredProducts?.length ? filteredProducts.map((prod:any) => (
                  <div key={prod.id} className="break-inside-avoid">
                    <ProductCard
                      {...prod}
                      onClick={() => navigate(`/product/${prod.id}`)}
                    />
                  </div>
                )) : (
                  <div className="col-span-full text-center text-lg text-muted-foreground py-12">No products found.</div>
                )}
              </div></div>
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
                  <FilterSidebar
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                  />
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

export default ProductListingPage;
