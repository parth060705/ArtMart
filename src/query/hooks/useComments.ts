import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useComments = (productId: string) => {
  return useQuery({
    queryKey: ["comments", productId],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/products/${productId}/comments`);
      return data;
    },
  });
};
