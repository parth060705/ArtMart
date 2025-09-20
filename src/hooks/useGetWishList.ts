import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useWishList = () => {
  return useQuery({
    queryKey: ["wishList"],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/auth/wishlist`);
      return data;
    },
  });
};
