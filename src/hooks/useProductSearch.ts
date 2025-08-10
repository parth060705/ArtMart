import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useProductSearch = (searchTerm: string) => {
  return useQuery({
    queryKey: ["productSearch", searchTerm],
    queryFn: async () => {
      // Only make the API call if there's a search term
      if (!searchTerm.trim()) {
        return { data: [] }; // Return empty results for empty search
      }
      const { data } = await axiosClient.get(`/artworks/search?query=${encodeURIComponent(searchTerm)}`);
      return data;
    },
    enabled: !!searchTerm.trim(), // Only enable the query when there's a search term
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
