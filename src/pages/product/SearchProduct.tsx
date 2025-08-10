import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";
import { useProductSearchContext } from "@/context/ProductSearchContext";
import { useUserSearch } from "@/hooks/useUserSearch";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductSearch } from "@/hooks/useProductSearch";
import { Link, useNavigate } from "react-router-dom";
import { Product } from "@/lib/types";
import { useDebounce } from "@/hooks/useDebounce";
import { Routes } from "@/lib/routes";

interface User {
  id: string;
  username: string;
  profileImage?: string;
  avatar?: string;
}

const SearchProduct = () => {
  const { searchQuery } = useProductSearchContext();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const navigate = useNavigate();
  
  const {
    data: productsData,
    isLoading: isLoadingProducts,
    isError: hasProductsError,
  } = useProductSearch(debouncedSearchQuery);
  
  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError: hasUsersError,
  } = useUserSearch(debouncedSearchQuery);

  console.log(productsData)
  console.log(usersData)

  const isLoading = isLoadingProducts || isLoadingUsers;
  const hasError = hasProductsError || hasUsersError;
  const productResults: Product[] = productsData?.map((product: any) => ({
    ...product,
    id: String(product.id),
    price: Number(product.price)
  })) || [];
  
  const userResults: User[] = (usersData?.map((user: any) => ({
    ...user,
    id: String(user.id),
    profileImage: user.profileImage || user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=random`
  })) || []);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="container mx-auto py-8 text-center text-red-500">
        Failed to load search results. Please try again later.
      </div>
    );
  }

  return (
    <section className="container mx-auto py-6">
      <Tabs defaultValue="products" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-max grid-cols-2 bg-[var(--muted)] rounded-xl p-1">
            <TabsTrigger
              value="products"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[var(--primary)] rounded-lg text-sm font-medium transition-all"
            >
              Products
            </TabsTrigger>
            <TabsTrigger
              value="artists"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[var(--primary)] rounded-lg text-sm font-medium transition-all"
            >
              Artists
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Products Tab */}
        <TabsContent value="products" className="mt-6">
          {productResults.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {productResults.map((product: Product) => (
                <ProductCard 
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  description={product.description}
                  images={product.images}
                  price={product.price}
                  category={product.category}
                  artist={{
                    username: product.artist?.username || 'Unknown Artist',
                    profileImage: product.artist?.profileImage || ''
                  }}
                  likes={product.likes || 0}
                  comments={product.comments || 0}
                  isSold={product.isSold || false}
                  artistid={product.artistid || ''}
                  location={product.location || ''}
                  createdAt={product.createdAt || new Date().toISOString()}
                  onClick={() => navigate(`/${Routes.ProductDetailPage}/${product.id}`)}
                />
              ))}
            </div>
          ) : searchQuery ? (
            <p className="text-center text-muted-foreground">No products found.</p>
          ) : (
            <p className="text-center text-muted-foreground">Search for products by title or description</p>
          )}
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="artists" className="space-y-4">
          {userResults.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {userResults.map((user: User) => (
                <Link 
                  key={user.id}
                  to={`/profile/${user.username}`}
                  className="flex flex-col items-center p-6 space-y-3 transition-colors border rounded-lg hover:bg-accent/50"
                >
                  <div className="relative w-20 h-20 overflow-hidden rounded-full bg-muted">
                    <img
                      src={user.profileImage}
                      alt={user.username}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=random`;
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <h4 className="font-medium">{user.username}</h4>
                    <p className="text-sm text-muted-foreground">View Profile</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : searchQuery ? (
            <p className="text-center text-muted-foreground">No artists found.</p>
          ) : (
            <p className="text-center text-muted-foreground">Search for artists by username</p>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default SearchProduct;
