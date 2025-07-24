import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useCommentsList = (id: string) => {
  return useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/artworks/${id}/comments`);
      return data;
    },
  });
};
