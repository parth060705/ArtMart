import { useState } from 'react';
import FilterSidebar from '@/components/FilterSidebar';
import ProductSearchBar from '@/components/ProductSearchBar';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';

const mockProducts = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    caption: 'Sunset vibes! #nature #painting',
    name: 'Sunset Painting',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    user: 'Aarav',
    description: 'Hand-painted acrylic on canvas',
    price: '₹2,499',
    likes: 57,
    comments: 12,
    category: 'Painting',
    location: 'Delhi'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    caption: 'Handmade with love. #craft #doll',
    name: 'Woolen Doll',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    user: 'Meera',
    description: 'Handmade with soft wool',
    price: '₹799',
    likes: 123,
    comments: 34,
    category: 'Textile',
    location: 'Mumbai'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    caption: 'Eco-friendly terracotta craft! #sculpture',
    name: 'Clay Sculpture',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    user: 'Kabir',
    description: 'Eco-friendly terracotta craft',
    price: '₹1,299',
    likes: 88,
    comments: 22,
    category: 'Sculpture',
    location: 'Bangalore'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    caption: 'Decor inspiration for your home. #decor #handmade',
    name: 'Decor Vase',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    user: 'Isha',
    description: 'Handmade ceramic vase',
    price: '₹1,999',
    likes: 64,
    comments: 10,
    category: 'Decor',
    location: 'Delhi'
  },
  // ...more products
];

const PAGE_SIZE = 8;

const ProductListingPage = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [page, setPage] = useState(1);

  // Filter logic
  const filtered = mockProducts.filter(prod => {
    const matchesCategory = !selectedCategory || prod.category === selectedCategory;
    const matchesLocation = !selectedLocation || prod.location === selectedLocation;
    const matchesPrice = (!priceRange[0] || parseInt(prod.price.replace(/\D/g, '')) >= priceRange[0]) &&
      (!priceRange[1] || parseInt(prod.price.replace(/\D/g, '')) <= priceRange[1]);
    const matchesSearch = prod.name.toLowerCase().includes(search.toLowerCase()) ||
      prod.user.toLowerCase().includes(search.toLowerCase()) ||
      prod.caption.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesLocation && matchesPrice && matchesSearch;
  });
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const pageCount = Math.ceil(filtered.length / PAGE_SIZE);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans" style={{ fontFamily: 'Poppins' }}>
      <div className="w-full mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8 relative">
          {/* Sidebar: Desktop */}
          <div className="hidden md:block w-full md:w-64 mb-6 md:mb-0">
            <FilterSidebar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Top bar: Filters button on mobile/tablet */}
            <div className="flex justify-end md:hidden mb-2">
              <Button
                variant="outline"
                className="rounded-full px-6 font-semibold border-[var(--primary)] text-[var(--primary)]"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open filters"
              >
                Filters
              </Button>
            </div>
            {/* Search bar */}
            <div className="mb-4"><ProductSearchBar value={search} onChange={setSearch} /></div>
            {/* Product grid */}

            {/* Sidebar Overlay: Mobile/Tablet */}
            {sidebarOpen && (
              <div className="fixed inset-0 z-50 flex">
                {/* Overlay */}
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setSidebarOpen(false)} aria-label="Close filters" />
                {/* Sidebar panel */}
                <aside className="relative ml-auto w-80 max-w-full h-full bg-[var(--card)] shadow-xl p-6 flex flex-col gap-8 animate-slide-in-right" style={{ fontFamily: 'Poppins' }}>
                  <button
                    className="absolute top-4 right-4 text-2xl font-bold text-[var(--primary)] hover:text-[var(--primary-foreground)]"
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close filters"
                  >
                    ×
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {paginated.length ? paginated.map(prod => (
                <ProductCard key={prod.id} {...prod} />
              )) : (
                <div className="col-span-full text-center text-lg text-muted-foreground py-12">No products found.</div>
              )}
            </div>
            {/* Pagination */}
            {pageCount > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full px-4"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
                {[...Array(pageCount)].map((_, i) => (
                  <Button
                    key={i}
                    size="sm"
                    variant={i + 1 === page ? 'default' : 'outline'}
                    className={`rounded-full px-3 font-semibold ${i + 1 === page ? 'bg-[var(--primary)] text-[var(--primary-foreground)]' : ''}`}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full px-4"
                  disabled={page === pageCount}
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListingPage;
