import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useGetCartItems = () => {
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/auth/cart");
      return data;      
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });
};
