import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

export const useUserFollowersList = () => {
  return useQuery({
    queryKey: ["user-followers"],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/users/me/followers`);
      return data;
    },
  });
};
