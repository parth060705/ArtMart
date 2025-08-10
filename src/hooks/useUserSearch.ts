import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

interface UserSearchResult {
  id: string;
  username: string;
  profileImage?: string;
  avatar?: string;
}

export const useUserSearch = (searchTerm: string) => {
  return useQuery({
    queryKey: ["userSearch", searchTerm],
    queryFn: async (): Promise<{ data: UserSearchResult[] }> => {
      // Only make the API call if there's a search term
      if (!searchTerm.trim()) {
        return { data: [] }; // Return empty results for empty search
      }
      const { data } = await axiosClient.get(`/search/user?query=${encodeURIComponent(searchTerm)}`);
      return data;
    },
    enabled: !!searchTerm.trim(), // Only enable the query when there's a search term
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  });
};
