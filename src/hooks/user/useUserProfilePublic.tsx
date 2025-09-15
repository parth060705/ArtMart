import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";
import { UserProfile } from "@/lib/types";

export const useGetUserProfilePublic = (userId: string) => {
  return useQuery({
    queryKey: ["userProfilePublic", userId],
    queryFn: async () => {
      const { data } = await axiosClient.get(`/user/${userId}`);
      return data as UserProfile;      
    },
    staleTime: 1000 * 60 * 10, // 10 minutes
    retry: 1,
  });
};
