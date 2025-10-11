import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import { UserSearchResult } from "@/lib/types";

export const useUserSearch = (searchTerm: string) => {
  return useQuery({
    queryKey: ["userSearch", searchTerm],
    queryFn: async (): Promise<UserSearchResult[]> => {
      // Only make the API call if there's a search term
      if (!searchTerm.trim()) {
        return [];
      }
      const { data } = await axiosClient.get(`/search/user?query=${encodeURIComponent(searchTerm)}`);
      return data;
    },
    enabled: !!searchTerm.trim(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
