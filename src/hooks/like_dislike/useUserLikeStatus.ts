import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";


export const useUserLikeStatus = (id: string) => { // id is artwork id
  return useQuery({
    queryKey: ["like", id],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/auth/likes/${id}/status`);
      return data;
    },
  });
};
