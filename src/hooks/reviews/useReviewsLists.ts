import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useReviewsList = (id: string) => {
  return useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/reviews/artwork/${id}`);
      return data;
    },
  });
};
