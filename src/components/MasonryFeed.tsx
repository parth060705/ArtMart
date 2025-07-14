import { useProductsList } from "@/hooks/useProductsList";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import { useProductSearch } from "@/context/ProductSearchContext";
import { Routes } from "@/lib/routes";

export default function MasonryFeed({className, length}: {className?: string, length?: number}) {
  const navigate = useNavigate();
  const { data: products } = useProductsList()
  const { searchQuery, selectedCategory, selectedLocation, priceRange, sortBy, currentPage } = useProductSearch();
  const filteredProducts = products?.filter((prod: Product) => {
    const matchesCategory = !selectedCategory || prod.category === selectedCategory;
    const matchesLocation = !selectedLocation || prod.location === selectedLocation;
    const matchesPrice = (!priceRange[0] || prod.price >= priceRange[0]) &&
      (!priceRange[1] || prod.price <= priceRange[1]);
    const matchesSearch = prod.title.toLowerCase().includes(searchQuery.toLowerCase())
    // prod.user.toLowerCase().includes(search.toLowerCase()) ||
    // prod.caption.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesLocation && matchesPrice && matchesSearch;
  });
  console.log(filteredProducts)
  return (
    <div className={className}>
      {filteredProducts?.length ? filteredProducts.slice(0, length).map((prod: Product, index: number) => (
        <div key={prod.id} className="break-inside-avoid">
          <ProductCard
            {...prod}
            onClick={() => navigate(`/${Routes.ProductDetailPage}/${prod.id}`)}
          />
        </div>
      )) : (
        <div className="col-span-full text-center text-lg text-muted-foreground py-12">No products found.</div>
      )}
    </div>
  );
}
