import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  followers?: number;
  following?: number;
}

type UseUserProfileOptions = Omit<UseQueryOptions<UserProfile, Error, UserProfile, ["userProfile"]>, 'queryKey' | 'queryFn'>;

export const useUserProfile = (options: UseUserProfileOptions = {}) => {
  return useQuery({
    queryKey: ["userProfile"] as const,
    queryFn: async () => {
      const { data } = await axiosClient.get("/me");
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    ...options,
  });
};
