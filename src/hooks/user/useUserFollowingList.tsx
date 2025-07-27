import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useUserFollowingList = () => {
  return useQuery({
    queryKey: ["user-following"],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/auth/me/following`);
      return data;
    },
  });
};
