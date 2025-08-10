import { createContext, useContext, ReactNode, useState, useCallback } from 'react';

type SortOption = 'recent' | 'price-low' | 'price-high' | 'popular';

interface ProductSearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  resetFilters: () => void;
}

const ProductSearchContext = createContext<ProductSearchContextType | undefined>(undefined);

interface ProductSearchProviderProps {
  children: ReactNode;
}

export function ProductSearchProvider({ children }: ProductSearchProviderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<SortOption>('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState('');

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange([0, 10000]);
    setSortBy('recent');
    setCurrentPage(1);
    setSelectedLocation('');
  }, []);

  const value: ProductSearchContextType = {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    resetFilters
  };

  return (
    <ProductSearchContext.Provider value={value}>
      {children}
    </ProductSearchContext.Provider>
  );
}

export function useProductSearchContext() {
  const context = useContext(ProductSearchContext);
  if (context === undefined) {
    throw new Error('useProductSearch must be used within a ProductSearchProvider');
  }
  return context;
}

export default ProductSearchContext;
