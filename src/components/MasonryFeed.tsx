import ProductCard from "./ProductCard";
import { Product } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import { Routes } from "@/lib/routes";
import LoadingSpinner from "./LoadingSpinner";

interface IMasonaryFeed {
  className?: string;
  length?: number;
  data?: Product[];
  isLoading?: boolean;
  showLikeCount?: boolean;
}

export default function MasonryFeed({ className, length, data, isLoading, showLikeCount }: IMasonaryFeed) {
  const navigate = useNavigate();
  

  return (
    <div className={className}>
      {isLoading ? <div className="min-h-[30vh] flex items-center justify-center"><LoadingSpinner /></div> : data?.length ? data.slice(0, length).map((prod: Product) => (
        <div key={prod.id} className="break-inside-avoid">
          <ProductCard
            {...prod}
            onClick={() => navigate(`/${Routes.ProductDetailPage}/${prod.id}`)}
            showLikeCount={showLikeCount}
          />
        </div>
      )) : (
        <div className="col-span-full text-center text-lg text-muted-foreground py-12">No Artworks yet.</div>
      )}
    </div>
  );
}
