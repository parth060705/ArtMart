import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

import { UserProfile } from '@/lib/types';

interface UserProfileResponse {
  id: string;
  username: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  followers: number;
  following: number;
  profileImage: string;
  followersList: UserProfile[];
  followingList: UserProfile[];
}

type UseUserProfileOptions = Omit<UseQueryOptions<UserProfile, Error, UserProfile, ["userProfile"]>, 'queryKey' | 'queryFn'>;

export const useUserProfile = (options: UseUserProfileOptions = {}) => {
  return useQuery({
    queryKey: ["userProfile"] as const,
    queryFn: async () => {
      const { data } = await axiosClient.get("/auth/me");
      // Transform the response to match our UserProfile interface
      return {
        ...data,
        followersList: data.followersList || [],
        followingList: data.followingList || []
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
    ...options,
  });
};
