import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useProductsList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data } = await axiosClient.get("/products");
      return data;
    },
  });
};
