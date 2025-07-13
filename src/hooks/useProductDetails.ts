import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useProductDetails = (id:string) => {
  return useQuery({
    queryKey: ["productDetails", id],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/artworks/${id}`);
      return data;
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });
};  
