import { useProductsList } from "@/hooks/useProductsList";
import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import { useProductSearchContext } from "@/context/ProductSearchContext";
import { Routes } from "@/lib/routes";
import LoadingSpinner from "./LoadingSpinner";

interface IMasonaryFeed {
  className?: string;
  length?: number;
  url?: string;
  data?: Product[] ;
  isLoading?: boolean;
}

export default function MasonryFeed({ className, length, url, data, isLoading }: IMasonaryFeed) {
  const navigate = useNavigate();
  // const { data: products, isLoading } = useProductsList(url || '/artworks')
  const { searchQuery, selectedCategory, selectedLocation, priceRange } = useProductSearchContext();
  // const filteredProducts = data?.filter((prod: Product) => {
  //   const matchesCategory = !selectedCategory || prod.category === selectedCategory;
  //   const matchesLocation = !selectedLocation || prod.location === selectedLocation;
  //   const matchesPrice = (!priceRange[0] || prod.price >= priceRange[0]) &&
  //     (!priceRange[1] || prod.price <= priceRange[1]);
  //   // const matchesSearch = prod.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   // prod.user.toLowerCase().includes(search.toLowerCase()) ||
  //   // prod.caption.toLowerCase().includes(search.toLowerCase());
  //   return matchesCategory && matchesLocation && matchesPrice;
  // });

  return (
    <div className={className}>
      {isLoading ? <div className="min-h-[30vh] flex items-center justify-center"><LoadingSpinner /></div> : data?.length ? data.slice(0, length).map((prod: Product) => (
        <div key={prod.id} className="break-inside-avoid">
          <ProductCard
            {...prod}
            onClick={() => navigate(`/${Routes.ProductDetailPage}/${prod.id}`)}
          />
        </div>
      )) : (
        <div className="col-span-full text-center text-lg text-muted-foreground py-12">No Artworks yet.</div>
      )}
    </div>
  );
}
