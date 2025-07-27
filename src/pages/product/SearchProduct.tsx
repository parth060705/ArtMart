import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";
import { useProductSearch } from "@/context/ProductSearchContext";
import { useUserSearch } from "@/hooks/useUserSearch";
import { useProductSearch as useProductSearchHook } from "@/hooks/useProductSearch";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
}

interface User {
  id: string;
  username: string;
  profileImage: string;
}

const SearchProduct = () => {
  const { searchQuery } = useProductSearch();
  const searchProducts = useProductSearchHook();
  const searchUsers = useUserSearch();

  const [productResults, setProductResults] = useState<Product[]>([]);
  const [userResults, setUserResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const search = async () => {
      if (!searchQuery) {
        setProductResults([]);
        setUserResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        // Search for products
        const productsData = await searchProducts.mutateAsync(searchQuery);
        setProductResults(productsData?.data || []);

        // Search for users
        const usersData = await searchUsers.mutateAsync(searchQuery);
        setUserResults(usersData?.data || []);
      } catch (err) {
        console.error("Search failed:", err);
        setError("Failed to fetch search results. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      search();
    }, 500); // Debounce search by 500ms

    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

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

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <section className="container mx-auto py-6">
      <Tabs defaultValue="products" className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-3 bg-[var(--muted)] rounded-xl p-1">
            <TabsTrigger
              value="products"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[var(--primary)] rounded-lg text-sm font-medium transition-all"
            >
              Products
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[var(--primary)] rounded-lg text-sm font-medium transition-all"
            >
              Users
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Products Tab */}
        <TabsContent value="products" className="mt-6">
          {productResults.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {productResults.map((product: Product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No products found.</p>
          )}
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="mt-6">
          {userResults.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {userResults.map((user) => (
                <div
                  key={user.id}
                  className="flex flex-col items-center gap-3 p-4 border rounded-lg hover:shadow-sm transition-shadow"
                >
                  <img
                    src={user.profileImage}
                    alt={user.username}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <span className="font-medium">{user.username}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No users found.</p>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default SearchProduct;
