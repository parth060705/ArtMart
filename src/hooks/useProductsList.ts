import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useProductsList = (endpoint: string) => {
  return useQuery({
    queryKey: ["products", endpoint],
    queryFn: async () => {
      const { data } = await axiosClient.get(endpoint);
      return data;      
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });
};
